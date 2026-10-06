import fs from 'fs';
import path from 'path';

// 1. Patch api/index.js for /api/student/bonus-apostilas
const apiFile = path.resolve('api/index.js');
let apiContent = fs.readFileSync(apiFile, 'utf8').replace(/\r\n/g, '\n');

// Find app.get("/api/student/bonus-apostilas", ...)
const bonusEndpointRegex = /app\.get\("\/api\/student\/bonus-apostilas"[\s\S]*?res\.json\(bonuses\);\s*\}\);/;

const cleanBonusEndpoint = `app.get("/api/student/bonus-apostilas", requireActiveStudent, (req, res) => {
  const { enrollment, user } = authenticate(req);
  const db2 = getDb();
  const isAdmin = user?.role === "admin";
  const bonuses = db2.bonusApostilas.map((b) => {
    const requiredModule = b.requiredModule || (b.number === 1 || b.number === 2 ? 3 : 6);
    const timeline = calculateModuleTimeline(requiredModule, enrollment);
    const defaultPages = b.number === 1 ? 30 : (b.number === 3 ? 27 : 29);
    const canonicalPdf = b.number === 1
      ? '/materiais/cinelab-bonus-01-glossario-planos.pdf'
      : (b.number === 3 ? '/materiais/cinelab-bonus-03-analise-filmica.pdf' : '/materiais/cinelab-bonus-02-glossario-roteiro.pdf');
    const canonicalTitle = b.number === 1
      ? 'Glossário Completo de Planos'
      : (b.number === 3 ? 'Método de Análise Fílmica em 6 Camadas' : 'Glossário Completo de Roteiro');
    const safePdf = (!b.pdfUrl || b.pdfUrl.includes('1791222') || b.pdfUrl.includes('uploads/apostilas') || b.pdfUrl.includes('1790684'))
      ? canonicalPdf
      : b.pdfUrl;
    const safePages = (b.pagesCount && b.pagesCount !== 4 && b.pagesCount !== 24 && b.pagesCount !== 96 && b.pagesCount !== 104) ? b.pagesCount : defaultPages;
    return {
      ...b,
      title: b.title && !b.title.includes('Pitching') ? b.title : canonicalTitle,
      isUnlocked: true,
      status: "available",
      unlockDate: timeline.startDate.toISOString(),
      startDate: timeline.startDate.toISOString(),
      requiredModule,
      summary: b.summary || b.description,
      description: b.description || b.summary,
      pagesCount: safePages,
      totalPages: safePages,
      code: \`APOSTILA BÔNUS 0\${b.number}\`,
      pdfUrl: safePdf,
      extraVideos: (b.extraVideos && b.extraVideos.length > 0 ? b.extraVideos : initExtraVideosForApostila(b, b.title)).map((v) => ({
        ...v,
        isUnlocked: true,
        videoUrl: v.videoUrl,
        unlockDate: timeline.startDate.toISOString()
      }))
    };
  });
  res.json(bonuses);
});`;

if (bonusEndpointRegex.test(apiContent)) {
  apiContent = apiContent.replace(bonusEndpointRegex, cleanBonusEndpoint);
  fs.writeFileSync(apiFile, apiContent, 'utf8');
  console.log('✓ Successfully patched /api/student/bonus-apostilas in api/index.js');
} else {
  console.warn('Could not match bonusEndpointRegex in api/index.js');
}

// 2. Patch server/db.ts
const dbFile = path.resolve('server/db.ts');
if (fs.existsSync(dbFile)) {
  let dbCode = fs.readFileSync(dbFile, 'utf8').replace(/\r\n/g, '\n');

  const sanitizeAposCode = `if (cloudState.apostilas && Array.isArray(cloudState.apostilas)) {
              const realPages: Record<number, number> = { 1: 8, 2: 52, 3: 4, 4: 4, 5: 6, 6: 4, 7: 4, 8: 4, 9: 4, 10: 4 };
              db.apostilas = cloudState.apostilas.map((a: any) => {
                const mod = a.moduleId || a.number || 1;
                const pad = mod < 10 ? '0' + mod : '' + mod;
                const canonicalPdf = \`/materiais/cinelab-apostila-\${pad}.pdf\`;
                const isCorrupted = !a.pdfUrl || a.pdfUrl.includes('1790444') || a.pdfUrl.includes('1790684') || a.pdfUrl.includes('1790652');
                const pages = realPages[mod] || a.pagesCount || a.totalPages || 4;
                return {
                  ...a,
                  pdfUrl: isCorrupted ? canonicalPdf : a.pdfUrl,
                  pagesCount: pages,
                  totalPages: pages,
                };
              });
            }
            if (cloudState.bonusApostilas && Array.isArray(cloudState.bonusApostilas)) {
              db.bonusApostilas = cloudState.bonusApostilas.map((b: any) => {
                const defaultPages = b.number === 1 ? 30 : (b.number === 3 ? 27 : 29);
                const canonicalPdf = b.number === 1
                  ? '/materiais/cinelab-bonus-01-glossario-planos.pdf'
                  : (b.number === 3 ? '/materiais/cinelab-bonus-03-analise-filmica.pdf' : '/materiais/cinelab-bonus-02-glossario-roteiro.pdf');
                const canonicalTitle = b.number === 1
                  ? 'Glossário Completo de Planos'
                  : (b.number === 3 ? 'Método de Análise Fílmica em 6 Camadas' : 'Glossário Completo de Roteiro');
                const safePdf = (!b.pdfUrl || b.pdfUrl.includes('1791222') || b.pdfUrl.includes('uploads/apostilas') || b.pdfUrl.includes('1790684'))
                  ? canonicalPdf
                  : b.pdfUrl;
                const safePages = (b.pagesCount && b.pagesCount !== 4 && b.pagesCount !== 24 && b.pagesCount !== 96 && b.pagesCount !== 104) ? b.pagesCount : defaultPages;
                return {
                  ...b,
                  title: b.title && !b.title.includes('Pitching') ? b.title : canonicalTitle,
                  pdfUrl: safePdf,
                  pagesCount: safePages,
                  totalPages: safePages,
                  isUnlocked: true,
                };
              });
            }`;

  const oldAposHydration = `if (cloudState.apostilas && Array.isArray(cloudState.apostilas)) db.apostilas = cloudState.apostilas;\n            if (cloudState.bonusApostilas && Array.isArray(cloudState.bonusApostilas)) db.bonusApostilas = cloudState.bonusApostilas;`;

  if (dbCode.includes(oldAposHydration)) {
    dbCode = dbCode.split(oldAposHydration).join(sanitizeAposCode);
    fs.writeFileSync(dbFile, dbCode, 'utf8');
    console.log('✓ Successfully patched initSupabaseData hydration in server/db.ts');
  } else {
    console.warn('Could not find oldAposHydration in server/db.ts');
  }
}

// 3. Patch server.ts
const serverFile = path.resolve('server.ts');
if (fs.existsSync(serverFile)) {
  let serverCode = fs.readFileSync(serverFile, 'utf8').replace(/\r\n/g, '\n');

  // Replace bonus-apostilas in server.ts
  const serverBonusRegex = /app\.get\('\/api\/student\/bonus-apostilas'[\s\S]*?res\.json\(bonuses\);\s*\}\);/;
  const serverCleanBonus = `app.get('/api/student/bonus-apostilas', requireActiveStudent, (req: Request, res: Response) => {
  const { enrollment, user } = authenticate(req);
  const db = getDb();
  const isAdmin = user?.role === 'admin';

  const bonuses = db.bonusApostilas.map((b) => {
    const requiredModule = b.requiredModule || (b.number === 1 || b.number === 2 ? 3 : 6);
    const timeline = calculateModuleTimeline(requiredModule, enrollment);
    const defaultPages = b.number === 1 ? 30 : (b.number === 3 ? 27 : 29);
    const canonicalPdf = b.number === 1
      ? '/materiais/cinelab-bonus-01-glossario-planos.pdf'
      : (b.number === 3 ? '/materiais/cinelab-bonus-03-analise-filmica.pdf' : '/materiais/cinelab-bonus-02-glossario-roteiro.pdf');
    const canonicalTitle = b.number === 1
      ? 'Glossário Completo de Planos'
      : (b.number === 3 ? 'Método de Análise Fílmica em 6 Camadas' : 'Glossário Completo de Roteiro');
    const safePdf = (!b.pdfUrl || b.pdfUrl.includes('1791222') || b.pdfUrl.includes('uploads/apostilas') || b.pdfUrl.includes('1790684'))
      ? canonicalPdf
      : b.pdfUrl;
    const safePages = (b.pagesCount && b.pagesCount !== 4 && b.pagesCount !== 24 && b.pagesCount !== 96 && b.pagesCount !== 104) ? b.pagesCount : defaultPages;

    return {
      ...b,
      title: b.title && !b.title.includes('Pitching') ? b.title : canonicalTitle,
      isUnlocked: true,
      status: 'available' as const,
      unlockDate: timeline.startDate.toISOString(),
      startDate: timeline.startDate.toISOString(),
      requiredModule,
      summary: b.summary || b.description,
      description: b.description || b.summary,
      pagesCount: safePages,
      totalPages: safePages,
      code: \`APOSTILA BÔNUS 0\${b.number}\`,
      pdfUrl: safePdf,
      extraVideos: (b.extraVideos && b.extraVideos.length > 0 ? b.extraVideos : initExtraVideosForApostila(b, b.title)).map((v: any) => ({
        ...v,
        isUnlocked: true,
        videoUrl: v.videoUrl,
        unlockDate: timeline.startDate.toISOString(),
      })),
    };
  });

  res.json(bonuses);
});`;

  if (serverBonusRegex.test(serverCode)) {
    serverCode = serverCode.replace(serverBonusRegex, serverCleanBonus);
    console.log('✓ Successfully patched /api/student/bonus-apostilas in server.ts');
  }

  // Replace /api/student/apostilas in server.ts
  const serverAposRegex = /app\.get\('\/api\/student\/apostilas'[\s\S]*?res\.json\(apostilas\);\s*\}\);/;
  const serverCleanApos = `app.get('/api/student/apostilas', requireActiveStudent, (req: Request, res: Response) => {
  const { enrollment, user } = authenticate(req);
  const db = getDb();
  const isAdmin = user?.role === 'admin';
  const realPages: Record<number, number> = { 1: 8, 2: 52, 3: 4, 4: 4, 5: 6, 6: 4, 7: 4, 8: 4, 9: 4, 10: 4 };

  const apostilas = db.apostilas.map((a) => {
    const mod = a.moduleId || a.number || 1;
    const pad = mod < 10 ? '0' + mod : '' + mod;
    const canonicalPdf = \`/materiais/cinelab-apostila-\${pad}.pdf\`;
    const isCorrupted = !a.pdfUrl || a.pdfUrl.includes('1790444') || a.pdfUrl.includes('1790684') || a.pdfUrl.includes('1790652');
    const safePdf = isCorrupted ? canonicalPdf : a.pdfUrl;
    const timeline = calculateModuleTimeline(a.moduleId, enrollment);
    const isUnlocked = timeline.status !== 'locked' || isAdmin;
    const pages = realPages[mod] || a.pagesCount || a.totalPages || 4;

    return {
      ...a,
      pagesCount: pages,
      totalPages: pages,
      isUnlocked,
      pdfUrl: isUnlocked ? safePdf : '',
      unlockDate: timeline.startDate.toISOString(),
      startDate: timeline.startDate.toISOString(),
      endDate: timeline.endDate.toISOString(),
      evalUnlockDate: timeline.evalUnlockDate.toISOString(),
      isEvalUnlocked: timeline.isEvalUnlocked,
      status: isAdmin && timeline.status === 'locked' ? ('available' as const) : timeline.status,
      durationDays: timeline.durationDays,
      durationLabel: timeline.durationLabel,
      evalLeadDays: timeline.evalLeadDays,
      daysRemaining: timeline.daysRemainingToUnlock,
      hoursRemaining: timeline.hoursRemainingToUnlock,
      extraVideos: (a.extraVideos && a.extraVideos.length > 0 ? a.extraVideos : initExtraVideosForApostila(a, a.title)).map((v: any) => ({
        ...v,
        isUnlocked,
        videoUrl: isUnlocked ? v.videoUrl : '',
        unlockDate: timeline.startDate.toISOString(),
      })),
    };
  });

  res.json(apostilas);
});`;

  if (serverAposRegex.test(serverCode)) {
    serverCode = serverCode.replace(serverAposRegex, serverCleanApos);
    console.log('✓ Successfully patched /api/student/apostilas in server.ts');
  }

  // Replace /api/course/public-info in server.ts
  const oldServerPublicInfo = `    bonusModulesCount: db.bonusApostilas.length,
    apostilas: db.apostilas.map((a) => ({
      id: a.id,
      moduleId: a.moduleId,
      number: a.number,
      title: a.title,
      description: a.description,
      summary: a.summary || a.description,
      pagesCount: a.pagesCount || a.totalPages || 30,
      totalPages: a.totalPages || a.pagesCount || 30,
      pdfUrl: a.pdfUrl,
      coverUrl: a.coverUrl,
      fileSizeMb: a.fileSizeMb,
      isUnlocked: true,
      status: "available",
      extraVideos: a.extraVideos && a.extraVideos.length > 0 ? a.extraVideos : initExtraVideosForApostila(a, a.title),
    })),
    bonusApostilas: db.bonusApostilas.map((b) => {
      const requiredModule = b.requiredModule || (b.number === 1 || b.number === 2 ? 3 : 6);
      const timeline = calculateModuleTimeline(requiredModule);
      const isUnlocked = timeline.status !== 'locked';
      return {
        ...b,
        requiredModule,
        isUnlocked,
        status: isUnlocked ? 'available' : 'locked',
        unlockDate: timeline.startDate.toISOString(),
        startDate: timeline.startDate.toISOString(),
        pagesCount: b.pagesCount && b.pagesCount !== 4 && b.pagesCount !== 24 ? b.pagesCount : (b.number === 1 ? 30 : (b.number === 3 ? 27 : 29)),
        totalPages: b.totalPages && b.totalPages !== 4 && b.totalPages !== 24 ? b.totalPages : (b.number === 1 ? 30 : (b.number === 3 ? 27 : 29)),
        extraVideos: b.extraVideos && b.extraVideos.length > 0 ? b.extraVideos : initExtraVideosForApostila(b, b.title),
      };
    }),`;

  const newServerPublicInfo = `    bonusModulesCount: db.bonusApostilas.length,
    apostilas: db.apostilas.map((a) => {
      const mod = a.moduleId || a.number || 1;
      const pad = mod < 10 ? '0' + mod : '' + mod;
      const canonicalPdf = \`/materiais/cinelab-apostila-\${pad}.pdf\`;
      const isCorrupted = !a.pdfUrl || a.pdfUrl.includes('1790444') || a.pdfUrl.includes('1790684') || a.pdfUrl.includes('1790652');
      const safePdf = isCorrupted ? canonicalPdf : a.pdfUrl;
      const realPages: Record<number, number> = { 1: 8, 2: 52, 3: 4, 4: 4, 5: 6, 6: 4, 7: 4, 8: 4, 9: 4, 10: 4 };
      const pages = realPages[mod] || a.pagesCount || a.totalPages || 4;
      return {
        id: a.id,
        moduleId: a.moduleId,
        number: a.number,
        title: a.title,
        description: a.description,
        summary: a.summary || a.description,
        pagesCount: pages,
        totalPages: pages,
        pdfUrl: safePdf,
        coverUrl: a.coverUrl,
        fileSizeMb: a.fileSizeMb,
        isUnlocked: true,
        status: "available",
        extraVideos: a.extraVideos && a.extraVideos.length > 0 ? a.extraVideos : initExtraVideosForApostila(a, a.title),
      };
    }),
    bonusApostilas: db.bonusApostilas.map((b) => {
      const requiredModule = b.requiredModule || (b.number === 1 || b.number === 2 ? 3 : 6);
      const timeline = calculateModuleTimeline(requiredModule);
      const defaultPages = b.number === 1 ? 30 : (b.number === 3 ? 27 : 29);
      const canonicalPdf = b.number === 1
        ? '/materiais/cinelab-bonus-01-glossario-planos.pdf'
        : (b.number === 3 ? '/materiais/cinelab-bonus-03-analise-filmica.pdf' : '/materiais/cinelab-bonus-02-glossario-roteiro.pdf');
      const canonicalTitle = b.number === 1
        ? 'Glossário Completo de Planos'
        : (b.number === 3 ? 'Método de Análise Fílmica em 6 Camadas' : 'Glossário Completo de Roteiro');
      const safePdf = (!b.pdfUrl || b.pdfUrl.includes('1791222') || b.pdfUrl.includes('uploads/apostilas') || b.pdfUrl.includes('1790684'))
        ? canonicalPdf
        : b.pdfUrl;
      const safePages = (b.pagesCount && b.pagesCount !== 4 && b.pagesCount !== 24 && b.pagesCount !== 96 && b.pagesCount !== 104) ? b.pagesCount : defaultPages;
      return {
        ...b,
        title: b.title && !b.title.includes('Pitching') ? b.title : canonicalTitle,
        requiredModule,
        isUnlocked: true,
        status: 'available',
        unlockDate: timeline.startDate.toISOString(),
        startDate: timeline.startDate.toISOString(),
        pagesCount: safePages,
        totalPages: safePages,
        pdfUrl: safePdf,
        extraVideos: b.extraVideos && b.extraVideos.length > 0 ? b.extraVideos : initExtraVideosForApostila(b, b.title),
      };
    }),`;

  if (serverCode.includes(oldServerPublicInfo)) {
    serverCode = serverCode.replace(oldServerPublicInfo, newServerPublicInfo);
    console.log('✓ Successfully patched /api/course/public-info in server.ts');
  }

  fs.writeFileSync(serverFile, serverCode, 'utf8');
}
