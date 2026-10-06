import fs from 'fs';

let code = fs.readFileSync('src/utils/apostilaVault.ts', 'utf8');
code = code.replace(/\r\n/g, '\n');

// 1. Upgrade getMergedApostilasWithVault
const oldAposFunction = `export function getMergedApostilasWithVault(serverApostilas: Apostila[]): Apostila[] {
  if (!Array.isArray(serverApostilas)) return serverApostilas;
  const vault = getPersistentVaultIndex();

  return serverApostilas.map((apos) => {
    const key = \`mod-\${apos.moduleId}\`;
    const local = vault[key];
    if (!local) return apos;

    // Fallback to real canonical pages if not explicitly customized
    const canonicalPages = apos.moduleId === 1 ? 8 : (apos.moduleId === 5 ? 6 : 4);
    const pages = (local.pagesCount && local.pagesCount > 0) ? local.pagesCount : (apos.pagesCount || apos.totalPages || canonicalPages);

    // Auto-heal duplicate module 1 title on module 2 or other modules in client vault
    const isCorruptedTitle = apos.moduleId !== 1 && local.title === 'Introdução ao Cinema e à Linguagem Audiovisual';
    const effectiveTitle = isCorruptedTitle
      ? (apos.moduleId === 2 ? 'História do Cinema' : apos.title)
      : (local.title || apos.title);

    if (isCorruptedTitle && vault[key]) {
      vault[key].title = effectiveTitle;
      savePersistentVaultIndex(vault);
    }

    return {
      ...apos,
      title: effectiveTitle,
      pagesCount: pages,
      totalPages: pages,
      pdfUrl: local.pdfUrl || apos.pdfUrl,
      fileSizeMb: local.fileSizeMb || apos.fileSizeMb,
    };
  });
}`;

const newAposFunction = `export function getMergedApostilasWithVault(serverApostilas: Apostila[]): Apostila[] {
  if (!Array.isArray(serverApostilas)) return serverApostilas;
  const vault = getPersistentVaultIndex();
  let vaultNeedsSave = false;

  const res = serverApostilas.map((apos) => {
    const modNum = apos.moduleId || apos.number || 1;
    const key = \`mod-\${modNum}\`;
    const local = vault[key];
    const pad = modNum < 10 ? '0' + modNum : '' + modNum;
    const canonicalPdf = \`/materiais/cinelab-apostila-\${pad}.pdf\`;
    const canonicalPages = modNum === 1 ? 8 : (modNum === 2 ? 52 : (modNum === 5 ? 6 : 4));

    if (!local) {
      return {
        ...apos,
        pagesCount: apos.pagesCount && apos.pagesCount > 0 ? apos.pagesCount : canonicalPages,
        totalPages: apos.totalPages && apos.totalPages > 0 ? apos.totalPages : canonicalPages,
        pdfUrl: apos.pdfUrl && !apos.pdfUrl.includes('1790444') && !apos.pdfUrl.includes('1790684') && !apos.pdfUrl.includes('1790652') ? apos.pdfUrl : canonicalPdf,
      };
    }

    // Auto-heal duplicate module 1 title on module 2 or other modules in client vault
    const isCorruptedTitle = modNum !== 1 && local.title === 'Introdução ao Cinema e à Linguagem Audiovisual';
    const effectiveTitle = isCorruptedTitle
      ? (modNum === 2 ? 'História do Cinema' : apos.title)
      : (local.title || apos.title);

    const isCorruptedFile =
      local.pdfUrl &&
      (
        local.pdfUrl.includes('1790444') ||
        local.pdfUrl.includes('1790684') ||
        local.pdfUrl.includes('1790652')
      );

    if ((isCorruptedTitle || isCorruptedFile) && vault[key]) {
      vault[key] = {
        ...vault[key],
        title: effectiveTitle,
        pdfUrl: canonicalPdf,
        pagesCount: canonicalPages,
      };
      vaultNeedsSave = true;
    }

    const pages = (local.pagesCount && local.pagesCount > 0 && !isCorruptedFile) ? local.pagesCount : canonicalPages;
    const effectivePdf = isCorruptedFile ? canonicalPdf : (local.pdfUrl || apos.pdfUrl || canonicalPdf);

    return {
      ...apos,
      title: effectiveTitle,
      pagesCount: pages,
      totalPages: pages,
      pdfUrl: effectivePdf,
      fileSizeMb: local.fileSizeMb || apos.fileSizeMb,
    };
  });

  if (vaultNeedsSave) {
    savePersistentVaultIndex(vault);
  }

  return res;
}`;

if (code.includes(oldAposFunction)) {
  code = code.replace(oldAposFunction, newAposFunction);
  console.log('✓ getMergedApostilasWithVault updated');
} else {
  console.warn('Could not match oldAposFunction');
}

// 2. Ensure getMergedBonusWithVault cleans up any old upload URLs and keeps isUnlocked: true
const oldCheck = `    const isOutdatedLocal =
      local &&
      (
        !local.title ||
        (b.number === 3 && local.title.includes('Roteiro')) ||
        local.title.includes('Pitching') ||
        local.title.includes('Guerrilha') ||
        local.title.includes('Bíblia de Série') ||
        local.title.includes('Nova Apostila') ||
        local.pagesCount === 4 ||
        local.pagesCount === 24 ||
        local.pagesCount === 35 ||
        local.pagesCount === 40 ||
        local.pagesCount === 96 ||
        local.pagesCount === 104
      );`;

const newCheck = `    const isOutdatedLocal =
      local &&
      (
        !local.title ||
        (b.number === 3 && local.title.includes('Roteiro')) ||
        local.title.includes('Pitching') ||
        local.title.includes('Guerrilha') ||
        local.title.includes('Bíblia de Série') ||
        local.title.includes('Nova Apostila') ||
        local.pagesCount === 4 ||
        local.pagesCount === 24 ||
        local.pagesCount === 35 ||
        local.pagesCount === 40 ||
        local.pagesCount === 96 ||
        local.pagesCount === 104 ||
        (local.pdfUrl && (local.pdfUrl.includes('1791222') || local.pdfUrl.includes('uploads/apostilas') || local.pdfUrl.includes('1790684')))
      );`;

if (code.includes(oldCheck)) {
  code = code.replace(oldCheck, newCheck);
  console.log('✓ isOutdatedLocal check updated in getMergedBonusWithVault');
} else {
  console.warn('Could not match oldCheck');
}

fs.writeFileSync('src/utils/apostilaVault.ts', code, 'utf8');
console.log('Done fixing apostilaVault.ts');
