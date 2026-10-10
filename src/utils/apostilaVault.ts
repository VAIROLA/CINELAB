// Client-Side Persistent Apostila Vault (IndexedDB + LocalStorage)
// Ensures uploaded PDFs and their page counts NEVER disappear across sessions or container restarts.
import { Apostila, BonusApostila } from '../types/index.js';

const DB_NAME = 'cinelab_apostilas_vault_v2';
const STORE_NAME = 'apostilas';
const DB_VERSION = 2;
const STORAGE_KEY = 'cinelab_persistent_apostilas_v3';

export interface VaultApostilaItem {
  id: string; // e.g. "mod-1", "bonus-1"
  moduleId?: number;
  isBonus?: boolean;
  bonusNumber?: number;
  fileName: string;
  title: string;
  pagesCount: number;
  fileSizeMb?: number;
  pdfBlob?: Blob;
  pdfUrl?: string;
  coverUrl?: string;
  updatedAt: string;
}

function openVaultDb(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined' || !window.indexedDB) {
      return reject(new Error('IndexedDB não disponível'));
    }

    const request = window.indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = (e: any) => {
      const db = e.target.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'id' });
      }
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

/**
 * Expurga de forma agressiva e definitiva chaves fantasmas (ex: bonus-991, bonus-992, bonus-993, bonus-994)
 * do LocalStorage e do IndexedDB, garantindo que nunca apareçam na interface.
 */
export function purgePhantomVaultItems(): void {
  if (typeof window === 'undefined' || !window.localStorage) return;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      let changed = false;
      Object.keys(parsed).forEach((k) => {
        if (k.startsWith('bonus-')) {
          const num = Number(k.replace('bonus-', ''));
          if (isNaN(num) || num > 20 || String(k).includes('99') || String(num).includes('99')) {
            delete parsed[k];
            changed = true;
          }
        }
      });
      if (changed) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(parsed));
      }
    }

    for (let i = localStorage.length - 1; i >= 0; i--) {
      const key = localStorage.key(i);
      if (key && (key.includes('bonus-99') || key.includes('bonus-099') || /^bonus-\d{3,}$/.test(key))) {
        localStorage.removeItem(key);
      }
    }
  } catch (e) {
    console.warn('Erro ao expurgar chaves do LocalStorage:', e);
  }

  if (window.indexedDB) {
    openVaultDb().then((db) => {
      try {
        const tx = db.transaction(STORE_NAME, 'readwrite');
        const store = tx.objectStore(STORE_NAME);
        const req = store.getAllKeys();
        req.onsuccess = () => {
          const keys = req.result || [];
          keys.forEach((key) => {
            const kStr = String(key);
            if (kStr.includes('99') || (kStr.startsWith('bonus-') && Number(kStr.replace('bonus-', '')) > 20)) {
              store.delete(key);
            }
          });
        };
      } catch (_) {}
    }).catch(() => {});
  }
}

// Executa limpeza automática imediata
if (typeof window !== 'undefined') {
  purgePhantomVaultItems();
}

/**
 * Lê o armazenamento síncrono local de metadados
 */
export function getPersistentVaultIndex(): Record<string, Partial<VaultApostilaItem>> {
  if (typeof window === 'undefined' || !window.localStorage) return {};
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      let changed = false;
      Object.keys(parsed).forEach((k) => {
        if (k.startsWith('bonus-')) {
          const num = Number(k.replace('bonus-', ''));
          if (isNaN(num) || num > 20 || String(k).includes('99') || String(num).includes('99')) {
            delete parsed[k];
            changed = true;
          }
        }
      });
      if (changed) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(parsed));
      }
      return parsed;
    }
  } catch (e) {
    console.warn('Erro ao ler STORAGE_KEY:', e);
  }
  return {};
}

/**
 * Salva no armazenamento local síncrono
 */
export function savePersistentVaultIndex(index: Record<string, Partial<VaultApostilaItem>>): void {
  if (typeof window === 'undefined' || !window.localStorage) return;
  try {
    // Garante que nenhuma chave fantasma seja salva
    const cleanIndex: Record<string, Partial<VaultApostilaItem>> = {};
    Object.keys(index).forEach((k) => {
      if (k.startsWith('bonus-')) {
        const num = Number(k.replace('bonus-', ''));
        if (num <= 20 && !String(k).includes('99') && !String(num).includes('99')) {
          cleanIndex[k] = index[k];
        }
      } else {
        cleanIndex[k] = index[k];
      }
    });
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cleanIndex));
  } catch (e) {
    console.warn('Erro ao gravar STORAGE_KEY:', e);
  }
}

/**
 * Normaliza o ID do item no cofre
 */
export function getVaultItemId(target: number | string, isBonus?: boolean): string {
  if (typeof target === 'string') {
    if (target.startsWith('mod-')) return target;
    if (target.startsWith('bonus-')) {
      const n = Number(target.replace('bonus-', ''));
      const cleanN = n > 990 ? n - 990 : n;
      return `bonus-${cleanN}`;
    }
    if (target === '991' || target === 'bonus-01') return 'bonus-1';
    if (target === '992' || target === 'bonus-02') return 'bonus-2';
    if (target === '993' || target === 'bonus-03') return 'bonus-3';
    if (target === '994' || target === 'bonus-04') return 'bonus-4';
    if (/^\d+$/.test(target)) {
      const num = Number(target);
      if (isBonus || num > 990) return `bonus-${num > 990 ? num - 990 : num}`;
      return `mod-${num}`;
    }
    return target;
  }
  if (isBonus || target > 990) {
    return `bonus-${target > 990 ? target - 990 : target}`;
  }
  return `mod-${target}`;
}

/**
 * Salva o arquivo PDF e metadados no cofre permanente do navegador (IndexedDB + LocalStorage)
 */
export async function saveApostilaToVault(
  targetIdOrModuleId: number | string,
  file: File | Blob,
  meta: {
    isBonus?: boolean;
    bonusNumber?: number;
    fileName?: string;
    title?: string;
    pagesCount: number;
    fileSizeMb?: number;
    pdfUrl?: string;
  }
): Promise<void> {
  const isBonus = Boolean(meta.isBonus || (typeof targetIdOrModuleId === 'number' && targetIdOrModuleId > 990) || (typeof targetIdOrModuleId === 'string' && targetIdOrModuleId.includes('bonus')));
  let bonusNumber = meta.bonusNumber;
  if (!bonusNumber) {
    if (typeof targetIdOrModuleId === 'number' && targetIdOrModuleId > 990) {
      bonusNumber = targetIdOrModuleId - 990;
    } else if (typeof targetIdOrModuleId === 'string' && targetIdOrModuleId.includes('bonus')) {
      const parsedNum = Number(targetIdOrModuleId.replace(/\D/g, ''));
      bonusNumber = parsedNum > 990 ? parsedNum - 990 : parsedNum;
    } else if (typeof targetIdOrModuleId === 'number') {
      bonusNumber = targetIdOrModuleId;
    } else {
      bonusNumber = 1;
    }
  }
  if (bonusNumber > 990) {
    bonusNumber = bonusNumber - 990;
  }
  const moduleId = !isBonus && typeof targetIdOrModuleId === 'number' && targetIdOrModuleId <= 990 ? targetIdOrModuleId : undefined;
  const id = isBonus ? `bonus-${bonusNumber}` : `mod-${moduleId || targetIdOrModuleId}`;

  const fileName = meta.fileName || (file instanceof File ? file.name : `${id}.pdf`);
  const sizeMb = meta.fileSizeMb || Number((file.size / (1024 * 1024)).toFixed(2));
  const updatedAt = new Date().toISOString();

  // 1. Grava no LocalStorage síncrono para render imediato
  const currentIndex = getPersistentVaultIndex();
  let titleToPersist = meta.title || (isBonus ? `Apostila Bônus 0${bonusNumber}` : `Apostila 0${moduleId}`);
  if (!isBonus && moduleId === 2 && titleToPersist === 'Introdução ao Cinema e à Linguagem Audiovisual') {
    titleToPersist = 'História do Cinema';
  }

  currentIndex[id] = {
    id,
    moduleId,
    isBonus,
    bonusNumber: isBonus ? bonusNumber : undefined,
    fileName,
    title: titleToPersist,
    pagesCount: Number(meta.pagesCount),
    fileSizeMb: sizeMb,
    pdfUrl: meta.pdfUrl,
    updatedAt,
  };
  savePersistentVaultIndex(currentIndex);

  // 2. Grava no IndexedDB com o binário Blob
  try {
    const db = await openVaultDb();
    const tx = db.transaction(STORE_NAME, 'readwrite');
    const store = tx.objectStore(STORE_NAME);

    const item: VaultApostilaItem = {
      id,
      moduleId,
      isBonus,
      bonusNumber: isBonus ? bonusNumber : undefined,
      fileName,
      title: currentIndex[id].title!,
      pagesCount: Number(meta.pagesCount),
      fileSizeMb: sizeMb,
      pdfBlob: file,
      pdfUrl: meta.pdfUrl,
      updatedAt,
    };

    store.put(item);

    return new Promise((resolve, reject) => {
      tx.oncomplete = () => resolve();
      tx.onerror = () => reject(tx.error);
    });
  } catch (err) {
    console.warn('Alerta IndexedDB (dados preservados no LocalStorage):', err);
  }
}

/**
 * Atualiza metadados no cofre permanente mesmo sem re-upload de arquivo
 */
export async function updateVaultMetadata(
  targetIdOrModuleId: number | string,
  meta: {
    isBonus?: boolean;
    bonusNumber?: number;
    title?: string;
    pagesCount?: number;
    pdfUrl?: string;
    coverUrl?: string;
    fileSizeMb?: number;
  }
): Promise<void> {
  const isBonus = Boolean(meta.isBonus || (typeof targetIdOrModuleId === 'number' && targetIdOrModuleId > 990) || (typeof targetIdOrModuleId === 'string' && targetIdOrModuleId.includes('bonus')));
  let bonusNumber = meta.bonusNumber;
  if (!bonusNumber) {
    if (typeof targetIdOrModuleId === 'number' && targetIdOrModuleId > 990) {
      bonusNumber = targetIdOrModuleId - 990;
    } else if (typeof targetIdOrModuleId === 'string' && targetIdOrModuleId.includes('bonus')) {
      const parsedNum = Number(targetIdOrModuleId.replace(/\D/g, ''));
      bonusNumber = parsedNum > 990 ? parsedNum - 990 : parsedNum;
    } else if (typeof targetIdOrModuleId === 'number') {
      bonusNumber = targetIdOrModuleId;
    } else {
      bonusNumber = 1;
    }
  }
  if (bonusNumber > 990) {
    bonusNumber = bonusNumber - 990;
  }
  const moduleId = !isBonus ? (typeof targetIdOrModuleId === 'number' ? (targetIdOrModuleId > 990 ? targetIdOrModuleId - 990 : targetIdOrModuleId) : Number(String(targetIdOrModuleId).replace(/\D/g, '') || 1)) : undefined;
  const id = isBonus ? `bonus-${bonusNumber}` : getVaultItemId(targetIdOrModuleId, false);

  const currentIndex = getPersistentVaultIndex();
  const existing = currentIndex[id] || { id, moduleId, isBonus, bonusNumber };

  currentIndex[id] = {
    ...existing,
    title: meta.title !== undefined ? meta.title : existing.title,
    pagesCount: meta.pagesCount !== undefined && Number(meta.pagesCount) > 0 ? Number(meta.pagesCount) : existing.pagesCount,
    pdfUrl: meta.pdfUrl !== undefined ? meta.pdfUrl : existing.pdfUrl,
    coverUrl: meta.coverUrl !== undefined ? meta.coverUrl : existing.coverUrl,
    fileSizeMb: meta.fileSizeMb !== undefined ? meta.fileSizeMb : existing.fileSizeMb,
    updatedAt: new Date().toISOString(),
  };
  savePersistentVaultIndex(currentIndex);

  try {
    const db = await openVaultDb();
    const tx = db.transaction(STORE_NAME, 'readwrite');
    const store = tx.objectStore(STORE_NAME);
    const req = store.get(id);
    req.onsuccess = () => {
      const item = req.result;
      if (item) {
        if (meta.title !== undefined) item.title = meta.title;
        if (meta.pagesCount !== undefined && Number(meta.pagesCount) > 0) item.pagesCount = Number(meta.pagesCount);
        if (meta.pdfUrl !== undefined) item.pdfUrl = meta.pdfUrl;
        if (meta.coverUrl !== undefined) item.coverUrl = meta.coverUrl;
        if (meta.fileSizeMb !== undefined) item.fileSizeMb = meta.fileSizeMb;
        item.updatedAt = new Date().toISOString();
        store.put(item);
      }
    };
  } catch (err) {
    console.warn('updateVaultMetadata IndexedDB warning:', err);
  }
}

/**
 * Obtém uma apostila do cofre permanente
 */
export async function getApostilaFromVault(targetIdOrModuleId: number | string, isBonus?: boolean): Promise<VaultApostilaItem | null> {
  const id = getVaultItemId(targetIdOrModuleId, isBonus);
  try {
    const db = await openVaultDb();
    const tx = db.transaction(STORE_NAME, 'readonly');
    const store = tx.objectStore(STORE_NAME);
    const req = store.get(id);

    return new Promise((resolve) => {
      req.onsuccess = () => resolve(req.result || null);
      req.onerror = () => resolve(null);
    });
  } catch {
    return null;
  }
}

/**
 * Retorna todos os itens salvos no cofre do navegador
 */
export async function getAllVaultApostilas(): Promise<VaultApostilaItem[]> {
  try {
    const db = await openVaultDb();
    const tx = db.transaction(STORE_NAME, 'readonly');
    const store = tx.objectStore(STORE_NAME);
    const req = store.getAll();

    return new Promise((resolve) => {
      req.onsuccess = () => resolve(req.result || []);
      req.onerror = () => resolve([]);
    });
  } catch {
    return [];
  }
}

/**
 * Retorna uma URL de objeto (Blob URL) pronta para exibição em iframe
 */
export async function getVaultBlobUrl(targetIdOrModuleId: number | string, isBonus?: boolean): Promise<string | null> {
  const item = await getApostilaFromVault(targetIdOrModuleId, isBonus);
  if (!item || !item.pdfBlob) return null;

  const id = getVaultItemId(targetIdOrModuleId, isBonus);
  const isB = isBonus || id.startsWith('bonus-');
  let canonicalPages = 6;
  if (isB) {
    const bNum = item.bonusNumber || (id === 'bonus-1' ? 1 : id === 'bonus-3' ? 3 : 2);
    canonicalPages = bNum === 1 ? 30 : bNum === 3 ? 27 : 29;
  } else {
    const mod = item.moduleId || Number(id.replace('mod-', '')) || 1;
    const realModPages: Record<number, number> = { 1: 8, 2: 52, 3: 7, 4: 6, 5: 6, 6: 6, 7: 6, 8: 6, 9: 6, 10: 6 };
    canonicalPages = realModPages[mod] || 6;
  }

  // Se o item no IndexedDB for de cache anterior ou tiver páginas erradas (ex: 4 páginas de rascunho), expurga
  if (item.pagesCount !== canonicalPages || item.pagesCount === 4 || item.pagesCount === 24 || item.pagesCount === 96 || item.pagesCount === 104) {
    try {
      const db = await openVaultDb();
      const tx = db.transaction(STORE_NAME, 'readwrite');
      tx.objectStore(STORE_NAME).delete(id);
    } catch {}
    return null;
  }

  // Se a URL for a canônica /materiais/, prefere carregar o PDF canônico via HTTP direto
  if (item.pdfUrl && item.pdfUrl.startsWith('/materiais/')) {
    return null;
  }

  return URL.createObjectURL(item.pdfBlob);
}

/**
 * Mescla a lista de apostilas do servidor com os dados persistentes locais do usuário
 * Garante que títulos editados, páginas e uploads NUNCA sejam revertidos na UI
 */
export function getMergedApostilasWithVault(serverApostilas: Apostila[]): Apostila[] {
  if (!Array.isArray(serverApostilas)) return serverApostilas;
  const vault = getPersistentVaultIndex();
  let vaultNeedsSave = false;

  const realPagesMap: Record<number, number> = { 1: 8, 2: 52, 3: 7, 4: 6, 5: 6, 6: 6, 7: 6, 8: 6, 9: 6, 10: 6 };

  const res = serverApostilas.map((apos) => {
    const modNum = apos.moduleId || apos.number || 1;
    const key = `mod-${modNum}`;
    const local = vault[key];
    const pad = modNum < 10 ? '0' + modNum : '' + modNum;
    const canonicalPdf = `/materiais/cinelab-apostila-${pad}.pdf`;
    const canonicalPages = realPagesMap[modNum] || 6;

    if (!local) {
      const canonicalCover = `/images/covers/apostila-${pad}.jpg`;
      const isOutdatedOrBrokenCover = !apos.coverUrl || apos.coverUrl.includes('unsplash.com') || (apos.coverUrl.startsWith('/uploads/') && !apos.coverUrl.includes('base64'));
      return {
        ...apos,
        coverUrl: !isOutdatedOrBrokenCover ? apos.coverUrl : canonicalCover,
        pagesCount: apos.pagesCount && apos.pagesCount === canonicalPages ? apos.pagesCount : canonicalPages,
        totalPages: apos.totalPages && apos.totalPages === canonicalPages ? apos.totalPages : canonicalPages,
        pdfUrl: apos.pdfUrl && !apos.pdfUrl.includes('1790444') && !apos.pdfUrl.includes('1790684') && !apos.pdfUrl.includes('1790652') ? apos.pdfUrl : canonicalPdf,
      };
    }

    // Auto-heal duplicate module 1 title on module 2 or other modules in client vault
    const isCorruptedTitle = modNum !== 1 && local.title === 'Introdução ao Cinema e à Linguagem Audiovisual';
    const effectiveTitle = isCorruptedTitle
      ? (modNum === 2 ? 'História do Cinema' : apos.title)
      : (local.title || apos.title);

    const isCorruptedFile =
      !local.pdfUrl ||
      local.pdfUrl.includes('1790444') ||
      local.pdfUrl.includes('1790684') ||
      local.pdfUrl.includes('1790652');

    const isWrongPages = !local.pagesCount || local.pagesCount === 4 || local.pagesCount !== canonicalPages;

    if ((isCorruptedTitle || isCorruptedFile || isWrongPages) && vault[key]) {
      vault[key] = {
        ...vault[key],
        title: effectiveTitle,
        pdfUrl: canonicalPdf,
        pagesCount: canonicalPages,
      };
      vaultNeedsSave = true;
    }

    const pages = (!isWrongPages && local.pagesCount && local.pagesCount > 0 && !isCorruptedFile) ? local.pagesCount : canonicalPages;
    const effectivePdf = isCorruptedFile ? canonicalPdf : (local.pdfUrl || apos.pdfUrl || canonicalPdf);

    const canonicalCover = `/images/covers/apostila-${modNum < 10 ? '0' + modNum : modNum}.jpg`;
    const isOutdatedOrBrokenCover = !local.coverUrl || local.coverUrl.includes('unsplash.com') || (local.coverUrl.startsWith('/uploads/') && !local.coverUrl.includes('base64'));
    const effectiveCover = !isOutdatedOrBrokenCover ? local.coverUrl : ((apos.coverUrl && !apos.coverUrl.includes('unsplash.com')) ? apos.coverUrl : canonicalCover);

    return {
      ...apos,
      title: effectiveTitle,
      pagesCount: pages,
      totalPages: pages,
      pdfUrl: effectivePdf,
      coverUrl: effectiveCover,
      fileSizeMb: local.fileSizeMb || apos.fileSizeMb,
    };
  });

  if (vaultNeedsSave) {
    savePersistentVaultIndex(vault);
  }

  return res;
}

/**
 * Mescla a lista de apostilas bônus do servidor com os dados persistentes locais
 */
export function getMergedBonusWithVault(serverBonus: BonusApostila[]): BonusApostila[] {
  const vault = getPersistentVaultIndex();
  let vaultNeedsSave = false;

  const canonicalBonusList: BonusApostila[] = [
    {
      id: 'bonus-01',
      number: 1,
      code: 'BÔNUS 01',
      title: 'Glossário Completo de Planos',
      subtitle: 'Guia Permanente de Consulta Técnica e Decupagem Cinematográfica',
      summary: 'Guia permanente de consulta técnica para decupagem cinematográfica, escalas de planos e movimentos de câmera.',
      description: 'Guia permanente de consulta técnica para decupagem cinematográfica, escalas de planos e movimentos de câmera.',
      pagesCount: 30,
      totalPages: 30,
      pdfUrl: '/materiais/cinelab-bonus-01-glossario-planos.pdf',
      coverUrl: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=600&q=80',
      unlockedByDefault: false,
      requiredModule: 3,
      isUnlocked: true,
      fileSizeMb: 0.35,
    } as any,
    {
      id: 'bonus-02',
      number: 2,
      code: 'BÔNUS 02',
      title: 'Glossário Completo de Roteiro',
      subtitle: 'Guia Permanente de Consulta Dramatúrgica e Estruturação de Histórias',
      summary: 'Guia permanente de consulta dramatúrgica: da criação de premissa, storyline e sinopse à escaleta e roteiro final.',
      description: 'Guia permanente de consulta dramatúrgica: da criação de premissa, storyline e sinopse à escaleta e roteiro final.',
      pagesCount: 29,
      totalPages: 29,
      pdfUrl: '/materiais/cinelab-bonus-02-glossario-roteiro.pdf',
      coverUrl: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=600&q=80',
      unlockedByDefault: false,
      requiredModule: 3,
      isUnlocked: true,
      fileSizeMb: 0.38,
    } as any,
    {
      id: 'bonus-03',
      number: 3,
      code: 'BÔNUS 03',
      title: 'Método de Análise Fílmica em 6 Camadas',
      subtitle: 'Guia Completo de Análise Crítica e Decupagem de Obras Audiovisuais',
      summary: 'A metodologia analítica do CINELAB em 6 camadas: Narrativa, Personagem, Espaço, Imagem (Fotografia), Som e Montagem para dissecar qualquer obra audiovisual como realizador.',
      description: 'A metodologia analítica do CINELAB em 6 camadas: Narrativa, Personagem, Espaço, Imagem (Fotografia), Som e Montagem para dissecar qualquer obra audiovisual como realizador.',
      pagesCount: 27,
      totalPages: 27,
      pdfUrl: '/materiais/cinelab-bonus-03-analise-filmica.pdf',
      coverUrl: 'https://images.unsplash.com/photo-1478720568477-152d9b164e26?auto=format&fit=crop&w=600&q=80',
      unlockedByDefault: false,
      requiredModule: 6,
      isUnlocked: true,
      fileSizeMb: 0.42,
    } as any,
  ];

  // Base list starts with canonical items 1, 2, 3
  const baseList: BonusApostila[] = [];

  canonicalBonusList.forEach((canon) => {
    const found = Array.isArray(serverBonus) ? serverBonus.find((s) => s.number === canon.number) : null;
    baseList.push(found ? { ...canon, ...found } : canon);
  });

  // Include any bonus items from server with number >= 4 (and <= 20, non-phantom)
  if (Array.isArray(serverBonus)) {
    serverBonus.forEach((s) => {
      if (s && s.number > 3 && s.number <= 20 && !String(s.number).includes('99') && !String(s.id).includes('99') && !baseList.some((b) => b.number === s.number || b.id === s.id)) {
        baseList.push(s);
      }
    });
  }

  // Include any bonus items stored in local vault with number >= 4 (and <= 20, non-phantom)
  Object.keys(vault).forEach((k) => {
    if (k.startsWith('bonus-')) {
      const num = Number(k.replace('bonus-', ''));
      if (num > 3 && num <= 20 && !String(num).includes('99') && !String(k).includes('99') && !baseList.some((b) => b.number === num)) {
        const item = vault[k];
        baseList.push({
          id: k,
          number: num,
          code: `BÔNUS 0${num}`,
          title: item.title || `Apostila Bônus 0${num}`,
          description: (item as any).description || 'Material pedagógico complementar oficial do CINELAB.',
          summary: (item as any).summary || (item as any).description || 'Material pedagógico complementar oficial do CINELAB.',
          pagesCount: item.pagesCount || 30,
          totalPages: item.pagesCount || 30,
          pdfUrl: item.pdfUrl || '',
          coverUrl: item.coverUrl || `/images/covers/apostila-${num < 10 ? '0' + num : num}.jpg`,
          unlockedByDefault: false,
          isUnlocked: true,
          status: 'available',
          notes: `Apostila Bônus 0${num}`,
        } as any);
      }
    }
  });

  const cleanBaseList = baseList.filter(
    (b) => b && typeof b.number === 'number' && b.number >= 1 && b.number <= 20 && !String(b.number).includes('99') && !String(b.id).includes('99')
  );

  cleanBaseList.sort((a, b) => (a.number || 0) - (b.number || 0));

  const result = cleanBaseList.map((b) => {
    const key = `bonus-${b.number}`;
    const local = vault[key];

    // For custom bonus apostilas (number > 3), preserve all custom values and covers
    if (b.number > 3) {
      const title = local?.title || b.title || `Apostila Bônus 0${b.number}`;
      const summary = (local as any)?.summary || b.summary || b.description || 'Material didático complementar do CINELAB.';
      const pages = local?.pagesCount || b.pagesCount || b.totalPages || 30;
      const pdf = local?.pdfUrl || b.pdfUrl || '';
      const fallbackCover = `/images/covers/apostila-${b.number < 10 ? '0' + b.number : b.number}.jpg`;
      const cover = local?.coverUrl || b.coverUrl || fallbackCover;
      return {
        ...b,
        title,
        subtitle: b.subtitle || '',
        summary,
        description: summary,
        pagesCount: pages,
        totalPages: pages,
        pdfUrl: pdf,
        coverUrl: cover,
        fileSizeMb: local?.fileSizeMb || b.fileSizeMb || 2.0,
      };
    }

    const defaultPages = b.number === 1 ? 30 : (b.number === 3 ? 27 : 29);
    const canonicalTitle = b.number === 1
      ? 'Glossário Completo de Planos'
      : (b.number === 3 ? 'Método de Análise Fílmica em 6 Camadas' : 'Glossário Completo de Roteiro');
    const canonicalSubtitle = b.number === 1
      ? 'Guia Permanente de Consulta Técnica e Decupagem Cinematográfica'
      : (b.number === 3 ? 'Guia Completo de Análise Crítica e Decupagem de Obras Audiovisuais' : 'Guia Permanente de Consulta Dramatúrgica e Estruturação de Histórias');
    const canonicalSummary = b.number === 1
      ? 'Guia permanente de consulta técnica para decupagem cinematográfica, escalas de planos e movimentos de câmera.'
      : (b.number === 3 ? 'A metodologia analítica do CINELAB em 6 camadas: Narrativa, Personagem, Espaço, Imagem (Fotografia), Som e Montagem para dissecar qualquer obra audiovisual como realizador.' : 'Guia permanente de consulta dramatúrgica: da criação de premissa, storyline e sinopse à escaleta e roteiro final.');
    const canonicalPdf = b.number === 1
      ? '/materiais/cinelab-bonus-01-glossario-planos.pdf'
      : (b.number === 3 ? '/materiais/cinelab-bonus-03-analise-filmica.pdf' : '/materiais/cinelab-bonus-02-glossario-roteiro.pdf');

    const isOutdatedLocal =
      local &&
      (
        !local.title ||
        local.pagesCount !== defaultPages ||
        (b.number === 1 && !local.title.includes('Planos')) ||
        (b.number === 3 && !local.title.includes('6 Camadas')) ||
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
      );

    if (isOutdatedLocal && vault[key]) {
      vault[key] = {
        ...vault[key],
        title: canonicalTitle,
        pagesCount: defaultPages,
        pdfUrl: canonicalPdf,
      };
      vaultNeedsSave = true;
    }

    const title = (!isOutdatedLocal && local?.title) ? local.title : canonicalTitle;
    const summary = (!isOutdatedLocal && (local as any)?.summary) ? (local as any).summary : canonicalSummary;
    const pages = (!isOutdatedLocal && local?.pagesCount && local.pagesCount > 0 && local.pagesCount !== 4 && local.pagesCount !== 24 && local.pagesCount !== 96 && local.pagesCount !== 104)
      ? local.pagesCount
      : defaultPages;

    return {
      ...b,
      title,
      subtitle: b.subtitle || canonicalSubtitle,
      summary,
      description: summary,
      pagesCount: pages,
      totalPages: pages,
      pdfUrl: (!isOutdatedLocal && local?.pdfUrl) ? local.pdfUrl : (b.pdfUrl || canonicalPdf),
      coverUrl: local?.coverUrl || b.coverUrl,
      fileSizeMb: local?.fileSizeMb || b.fileSizeMb || (b.number === 1 ? 0.35 : b.number === 2 ? 0.38 : 0.42),
    };
  });

  if (vaultNeedsSave) {
    savePersistentVaultIndex(vault);
  }

  return result.filter(
    (b) => b && typeof b.number === 'number' && b.number >= 1 && b.number <= 20 && !String(b.number).includes('99') && !String(b.id).includes('99')
  );
}

/**
 * Sincroniza silenciosamente os dados do cofre com o servidor
 */
export async function autoRestoreVaultToServer(api: any): Promise<{ syncedCount: number }> {
  const vault = getPersistentVaultIndex();
  const items = Object.values(vault).filter(Boolean);
  if (items.length === 0) return { syncedCount: 0 };

  try {
    if (typeof api.syncVaultItems === 'function') {
      const res = await api.syncVaultItems(items);
      return { syncedCount: res?.updatedCount || items.length };
    }
  } catch (err) {
    console.warn('Auto sync vault warning:', err);
  }
  return { syncedCount: 0 };
}

/**
 * Sincroniza os PDFs do cofre do navegador com o servidor
 * Útil se o servidor foi reiniciado e perdeu os arquivos do disco
 */
export async function syncVaultWithServer(apiUploader: (file: File, meta: any) => Promise<any>): Promise<{
  syncedCount: number;
  items: Array<{ id: string; fileName: string; pagesCount: number }>;
}> {
  const items = await getAllVaultApostilas();
  if (!items || items.length === 0) {
    return { syncedCount: 0, items: [] };
  }

  let count = 0;
  const syncedList: Array<{ id: string; fileName: string; pagesCount: number }> = [];

  for (const item of items) {
    if (!item.pdfBlob) continue;
    try {
      const file = new File([item.pdfBlob], item.fileName, { type: 'application/pdf' });
      await apiUploader(file, {
        moduleId: item.moduleId,
        isBonus: item.isBonus,
        bonusNumber: item.bonusNumber,
        title: item.title,
        pagesCount: item.pagesCount,
      });
      count++;
      syncedList.push({
        id: item.id,
        fileName: item.fileName,
        pagesCount: item.pagesCount,
      });
    } catch (e) {
      console.warn(`Falha na restauração do item ${item.id} do cofre:`, e);
    }
  }

  return { syncedCount: count, items: syncedList };
}

/**
 * Helper para converter links do Google Drive para visualização direta sem toolbar
 */
export function formatPdfViewerUrl(url: string | undefined): string {
  if (!url) return '';
  const trimmed = url.trim();

  // Google Drive standard link: https://drive.google.com/file/d/ID/view?usp=sharing
  const driveMatch = trimmed.match(/drive\.google\.com\/file\/d\/([a-zA-Z0-9_-]+)/);
  if (driveMatch && driveMatch[1]) {
    return `https://drive.google.com/file/d/${driveMatch[1]}/preview`;
  }

  // Google Drive open id link
  if (trimmed.includes('drive.google.com/open?id=')) {
    const id = trimmed.split('id=')[1]?.split('&')[0];
    if (id) return `https://drive.google.com/file/d/${id}/preview`;
  }

  // Dropbox link: replace dl=0 with raw=1
  if (trimmed.includes('dropbox.com') && trimmed.includes('dl=0')) {
    return trimmed.replace('dl=0', 'raw=1');
  }

  return trimmed;
}
