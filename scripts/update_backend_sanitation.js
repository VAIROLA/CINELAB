import fs from 'fs';

['api/index.js', 'server.ts'].forEach(filePath => {
  if (!fs.existsSync(filePath)) return;
  let code = fs.readFileSync(filePath, 'utf8');

  // Ensure public-info returns canonical PDF URLs and pages
  const oldPublicApos = `apostilas: db2.apostilas.map((a) => ({
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
    })),`;

  const newPublicApos = `apostilas: db2.apostilas.map((a) => {
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
    }),`;

  if (code.includes(oldPublicApos)) {
    code = code.replace(oldPublicApos, newPublicApos);
    console.log(`✓ Updated public-info apostilas in ${filePath}`);
  }

  // Ensure initSupabaseData cleans up legacy 6KB files and missing bonus URLs
  const oldHydrate = `if (cloudState.apostilas && Array.isArray(cloudState.apostilas)) db.apostilas = cloudState.apostilas;
            if (cloudState.bonusApostilas && Array.isArray(cloudState.bonusApostilas)) db.bonusApostilas = cloudState.bonusApostilas;`;

  const newHydrate = `if (cloudState.apostilas && Array.isArray(cloudState.apostilas)) {
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
    console.log(`✓ Updated initSupabaseData sanitation in ${filePath}`);
  }

  fs.writeFileSync(filePath, code, 'utf8');
});

console.log('Done backend updates');
