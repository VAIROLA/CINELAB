import fs from 'fs';

function patchFile(filePath) {
  if (!fs.existsSync(filePath)) return;
  let code = fs.readFileSync(filePath, 'utf8');
  code = code.replace(/\r\n/g, '\n');

  // 1. In /api/course/public-info:
  const oldPublicApos = `    bonusModulesCount: db2.bonusApostilas.length,
    apostilas: db2.apostilas.map((a) => ({
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
      extraVideos: a.extraVideos && a.extraVideos.length > 0 ? a.extraVideos : initExtraVideosForApostila(a, a.title)
    })),
    bonusApostilas: db2.bonusApostilas.map((b) => {
      const requiredModule = b.requiredModule || (b.number === 1 || b.number === 2 ? 3 : 6);
      const timeline = calculateModuleTimeline(requiredModule);
      const isUnlocked = timeline.status !== "locked";
      return {
        ...b,
        requiredModule,
        isUnlocked,
        status: isUnlocked ? "available" : "locked",
        unlockDate: timeline.startDate.toISOString(),
        startDate: timeline.startDate.toISOString(),
        pagesCount: b.pagesCount && b.pagesCount !== 4 && b.pagesCount !== 24 ? b.pagesCount : (b.number === 1 ? 30 : (b.number === 3 ? 27 : 29)),
        totalPages: b.totalPages && b.totalPages !== 4 && b.totalPages !== 24 ? b.totalPages : (b.number === 1 ? 30 : (b.number === 3 ? 27 : 29)),
        extraVideos: b.extraVideos && b.extraVideos.length > 0 ? b.extraVideos : initExtraVideosForApostila(b, b.title)
      };
    }),
    now: now.toISOString()`;

  const newPublicApos = `    bonusModulesCount: db2.bonusApostilas.length,
    apostilas: db2.apostilas.map((a) => {
      const mod = a.moduleId || a.number || 1;
      const pad = mod < 10 ? '0' + mod : '' + mod;
      const canonicalPdf = \`/materiais/cinelab-apostila-\${pad}.pdf\`;
      const isCorrupted = !a.pdfUrl || a.pdfUrl.includes('1790444') || a.pdfUrl.includes('1790684') || a.pdfUrl.includes('1790652');
      const safePdf = isCorrupted ? canonicalPdf : a.pdfUrl;
      const realPages = { 1: 8, 2: 52, 3: 4, 4: 4, 5: 6, 6: 4, 7: 4, 8: 4, 9: 4, 10: 4 };
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
        extraVideos: a.extraVideos && a.extraVideos.length > 0 ? a.extraVideos : initExtraVideosForApostila(a, a.title)
      };
    }),
    bonusApostilas: db2.bonusApostilas.map((b) => {
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
        status: "available",
        unlockDate: timeline.startDate.toISOString(),
        startDate: timeline.startDate.toISOString(),
        pagesCount: safePages,
        totalPages: safePages,
        pdfUrl: safePdf,
        extraVideos: b.extraVideos && b.extraVideos.length > 0 ? b.extraVideos : initExtraVideosForApostila(b, b.title)
      };
    }),
    now: now.toISOString()`;

  if (code.includes(oldPublicApos)) {
    code = code.replace(oldPublicApos, newPublicApos);
    console.log(`✓ Replaced public-info in ${filePath}`);
  } else {
    console.warn(`Could not find oldPublicApos in ${filePath}`);
  }

  // 2. In /api/student/bonus-apostilas:
  const oldStudentBonus = `app.get("/api/student/bonus-apostilas", requireActiveStudent, (req, res) => {
  const { enrollment, user } = authenticate(req);
  const db2 = getDb();
  const isAdmin = user?.role === "admin";
  const bonuses = db2.bonusApostilas.map((b) => {
    const requiredModule = b.requiredModule || (b.number === 1 || b.number === 2 ? 3 : 6);
    const timeline = calculateModuleTimeline(requiredModule, enrollment);
    const isUnlocked = timeline.status !== "locked" || isAdmin;
    return {
      ...b,
      isUnlocked,
      status: isUnlocked ? "available" : "locked",
      unlockDate: timeline.startDate.toISOString(),
      startDate: timeline.startDate.toISOString(),
      requiredModule,
      summary: b.summary || b.description,
      description: b.description || b.summary,
      pagesCount: b.pagesCount && b.pagesCount !== 4 && b.pagesCount !== 24 ? b.pagesCount : (b.number === 1 ? 30 : (b.number === 3 ? 27 : 29)),
      totalPages: b.totalPages && b.totalPages !== 4 && b.totalPages !== 24 ? b.totalPages : (b.number === 1 ? 30 : (b.number === 3 ? 27 : 29)),
      code: \`APOSTILA BÔNUS 0\${b.number}\`,
      pdfUrl: isUnlocked ? b.pdfUrl : "",`;

  const newStudentBonus = `app.get("/api/student/bonus-apostilas", requireActiveStudent, (req, res) => {
  const { enrollment, user } = authenticate(req);
  const db2 = getDb();
  const isAdmin = user?.role === "admin";
  const bonuses = db2.bonusApostilas.map((b) => {
    const requiredModule = b.requiredModule || (b.number === 1 || b.number === 2 ? 3 : 6);
    const timeline = calculateModuleTimeline(requiredModule, enrollment);
    const isUnlocked = true; // Bonus apostilas are always unlocked for enrolled students and admin
    const defaultPages = b.number === 1 ? 30 : (b.number === 3 ? 27 : 29);
    const canonicalPdf = b.number === 1
      ? '/materiais/cinelab-bonus-01-glossario-planos.pdf'
      : (b.number === 3 ? '/materiais/cinelab-bonus-03-analise-filmica.pdf' : '/materiais/cinelab-bonus-02-glossario-roteiro.pdf');
    const safePdf = (!b.pdfUrl || b.pdfUrl.includes('1791222') || b.pdfUrl.includes('uploads/apostilas')) ? canonicalPdf : b.pdfUrl;
    return {
      ...b,
      isUnlocked: true,
      status: "available",
      unlockDate: timeline.startDate.toISOString(),
      startDate: timeline.startDate.toISOString(),
      requiredModule,
      summary: b.summary || b.description,
      description: b.description || b.summary,
      pagesCount: b.pagesCount && b.pagesCount !== 4 && b.pagesCount !== 24 ? b.pagesCount : defaultPages,
      totalPages: b.totalPages && b.totalPages !== 4 && b.totalPages !== 24 ? b.totalPages : defaultPages,
      code: \`APOSTILA BÔNUS 0\${b.number}\`,
      pdfUrl: safePdf,`;

  if (code.includes(oldStudentBonus)) {
    code = code.replace(oldStudentBonus, newStudentBonus);
    console.log(`✓ Replaced /api/student/bonus-apostilas in ${filePath}`);
  } else {
    console.warn(`Could not find oldStudentBonus in ${filePath}`);
  }

  // 3. In /api/student/apostilas:
  const oldStudentApos = `app.get("/api/student/apostilas", requireActiveStudent, (req, res) => {
  const { enrollment, user } = authenticate(req);
  const db2 = getDb();
  const isAdmin = user?.role === "admin";
  const apostilas = db2.apostilas.map((a) => {
    const timeline = calculateModuleTimeline(a.moduleId, enrollment);
    const isUnlocked = timeline.status !== "locked" || isAdmin;
    return {
      ...a,
      isUnlocked,
      pdfUrl: isUnlocked ? a.pdfUrl : "",`;

  const newStudentApos = `app.get("/api/student/apostilas", requireActiveStudent, (req, res) => {
  const { enrollment, user } = authenticate(req);
  const db2 = getDb();
  const isAdmin = user?.role === "admin";
  const realPages = { 1: 8, 2: 52, 3: 4, 4: 4, 5: 6, 6: 4, 7: 4, 8: 4, 9: 4, 10: 4 };
  const apostilas = db2.apostilas.map((a) => {
    const mod = a.moduleId || a.number || 1;
    const pad = mod < 10 ? '0' + mod : '' + mod;
    const canonicalPdf = \`/materiais/cinelab-apostila-\${pad}.pdf\`;
    const isCorrupted = !a.pdfUrl || a.pdfUrl.includes('1790444') || a.pdfUrl.includes('1790684') || a.pdfUrl.includes('1790652');
    const safePdf = isCorrupted ? canonicalPdf : a.pdfUrl;
    const timeline = calculateModuleTimeline(a.moduleId, enrollment);
    const isUnlocked = timeline.status !== "locked" || isAdmin;
    const pages = realPages[mod] || a.pagesCount || a.totalPages || 4;
    return {
      ...a,
      pagesCount: pages,
      totalPages: pages,
      isUnlocked,
      pdfUrl: isUnlocked ? safePdf : "",`;

  if (code.includes(oldStudentApos)) {
    code = code.replace(oldStudentApos, newStudentApos);
    console.log(`✓ Replaced /api/student/apostilas in ${filePath}`);
  } else {
    console.warn(`Could not find oldStudentApos in ${filePath}`);
  }

  // 4. In initSupabaseData
  const oldHydrate = `            if (cloudState.apostilas && Array.isArray(cloudState.apostilas)) db.apostilas = cloudState.apostilas;
            if (cloudState.bonusApostilas && Array.isArray(cloudState.bonusApostilas)) db.bonusApostilas = cloudState.bonusApostilas;`;

  const newHydrate = `            if (cloudState.apostilas && Array.isArray(cloudState.apostilas)) {
              const realPages = { 1: 8, 2: 52, 3: 4, 4: 4, 5: 6, 6: 4, 7: 4, 8: 4, 9: 4, 10: 4 };
              db.apostilas = cloudState.apostilas.map(a => {
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
              db.bonusApostilas = cloudState.bonusApostilas.map(b => {
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

  if (code.includes(oldHydrate)) {
    code = code.replace(oldHydrate, newHydrate);
    console.log(`✓ Replaced initSupabaseData hydration in ${filePath}`);
  } else {
    console.warn(`Could not find oldHydrate in ${filePath}`);
  }

  fs.writeFileSync(filePath, code, 'utf8');
}

patchFile('api/index.js');
console.log('Finished patching api/index.js');
