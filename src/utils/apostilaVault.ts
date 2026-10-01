// Client-Side Persistent Apostila Vault (IndexedDB + LocalStorage)
// Ensures uploaded PDFs and their page counts NEVER disappear across sessions or container restarts.
import { Apostila, BonusApostila, ApostilaExtraVideo } from '../types/index.js';

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
  extraVideos?: ApostilaExtraVideo[];
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
 * Lê o armazenamento síncrono local de metadados
 */
export function getPersistentVaultIndex(): Record<string, Partial<VaultApostilaItem>> {
  if (typeof window === 'undefined' || !window.localStorage) return {};
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      return JSON.parse(raw);
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
    localStorage.setItem(STORAGE_KEY, JSON.stringify(index));
  } catch (e) {
    console.warn('Erro ao gravar STORAGE_KEY:', e);
  }
}

/**
 * Normaliza o ID do item no cofre
 */
export function getVaultItemId(target: number | string, isBonus?: boolean): string {
  if (typeof target === 'string') {
    if (target.startsWith('mod-') || target.startsWith('bonus-')) return target;
    if (target === '991' || target === 'bonus-01') return 'bonus-1';
    if (target === '992' || target === 'bonus-02') return 'bonus-2';
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
  const isBonus = meta.isBonus || (typeof targetIdOrModuleId === 'number' && targetIdOrModuleId > 990);
  const bonusNumber = meta.bonusNumber || (typeof targetIdOrModuleId === 'number' && targetIdOrModuleId > 990 ? targetIdOrModuleId - 990 : 1);
  const moduleId = !isBonus && typeof targetIdOrModuleId === 'number' ? targetIdOrModuleId : undefined;
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
    fileSizeMb?: number;
  }
): Promise<void> {
  const isBonus = meta.isBonus || (typeof targetIdOrModuleId === 'number' && targetIdOrModuleId > 990);
  const bonusNumber = meta.bonusNumber || (typeof targetIdOrModuleId === 'number' && targetIdOrModuleId > 990 ? targetIdOrModuleId - 990 : 1);
  const moduleId = !isBonus && typeof targetIdOrModuleId === 'number' ? targetIdOrModuleId : undefined;
  const id = isBonus ? `bonus-${bonusNumber}` : `mod-${moduleId || targetIdOrModuleId}`;

  const currentIndex = getPersistentVaultIndex();
  const existing = currentIndex[id] || { id, moduleId, isBonus, bonusNumber };

  currentIndex[id] = {
    ...existing,
    title: meta.title !== undefined ? meta.title : existing.title,
    pagesCount: meta.pagesCount !== undefined && Number(meta.pagesCount) > 0 ? Number(meta.pagesCount) : existing.pagesCount,
    pdfUrl: meta.pdfUrl !== undefined ? meta.pdfUrl : existing.pdfUrl,
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
  if (item && item.pdfBlob) {
    // Rejeita blobs corrompidos ou incompletos menores que 50KB gerados em uploads anteriores
    if (item.pdfBlob.size < 50000) {
      return null;
    }
    return URL.createObjectURL(item.pdfBlob);
  }
  return null;
}

/**
 * Formata duração no padrão de cinema oficial: horas, minutos e segundos
 */
export function formatHms(hours: number, minutes: number, seconds: number): string {
  const pad = (n: number) => String(Math.max(0, Math.floor(n || 0))).padStart(2, '0');
  const hh = Math.max(0, Math.floor(hours || 0));
  const mm = Math.max(0, Math.min(59, Math.floor(minutes || 0)));
  const ss = Math.max(0, Math.min(59, Math.floor(seconds || 0)));
  return `${pad(hh)}h ${pad(mm)}m ${pad(ss)}s`;
}

/**
 * Mescla de forma inteligente dois arrays de extraVideos garantindo que NENHUM dado personalizado seja perdido.
 * Se o slot 1 foi preenchido e o slot 2 está sendo editado, o slot 1 permanece 100% preservado e vice-versa.
 */
export function mergeExtraVideosList(
  baseVideos?: ApostilaExtraVideo[] | null,
  incomingVideos?: ApostilaExtraVideo[] | null
): ApostilaExtraVideo[] {
  const base = Array.isArray(baseVideos) ? baseVideos : [];
  const incoming = Array.isArray(incomingVideos) ? incomingVideos : [];

  const slots = [1, 2] as const;
  return slots.map((slotNum) => {
    const b = base.find((v) => v.slot === slotNum);
    const inc = incoming.find((v) => v.slot === slotNum);

    if (!b && !inc) {
      return {
        id: `ev-slot-${slotNum}`,
        slot: slotNum,
        title: slotNum === 1 ? 'Vídeo Extra 01: Estudo Dirigido' : 'Vídeo Extra 02: Estudo de Caso',
        description: '',
        videoUrl: '',
        thumbnailUrl: '',
        durationHours: 0,
        durationMinutes: slotNum === 1 ? 18 : 24,
        durationSeconds: 0,
        totalDurationSeconds: (slotNum === 1 ? 18 : 24) * 60,
        durationLabel: slotNum === 1 ? '00h 18m 00s' : '00h 24m 00s',
        professorNotes: '',
        uploadedAt: new Date().toISOString(),
      };
    }

    if (!b) return inc!;
    if (!inc) return b!;

    // Detecção de vídeo real vs placeholder genérico
    const isIncRealVideo = Boolean(inc.videoUrl && inc.videoUrl.trim() !== '' && inc.videoUrl !== '/videos/cinelab-intro-apresentacao.mp4');
    const isBRealVideo = Boolean(b.videoUrl && b.videoUrl.trim() !== '' && b.videoUrl !== '/videos/cinelab-intro-apresentacao.mp4');

    let resolvedVideoUrl = '';
    if (isIncRealVideo) {
      resolvedVideoUrl = inc.videoUrl!;
    } else if (isBRealVideo) {
      resolvedVideoUrl = b.videoUrl!;
    } else {
      resolvedVideoUrl = inc.videoUrl || b.videoUrl || '';
    }

    // Detecção de títulos genéricos de fallback
    const isGenericTitle = (t?: string) => {
      if (!t || !t.trim()) return true;
      const s = t.trim();
      return (
        s === 'Vídeo Extra 01' ||
        s === 'Vídeo Extra 02' ||
        s === 'Vídeo Extra 01: Estudo Dirigido' ||
        s === 'Vídeo Extra 02: Estudo de Caso' ||
        s === 'Vídeo Extra 01: Estudo Complementar' ||
        s === 'Vídeo Extra 02: Estudo Complementar' ||
        s.startsWith('Vídeo Extra 01: Estudo Dirigido & Análise Prática – Módulo') ||
        s.startsWith('Vídeo Extra 02: Estudo de Caso & Exercício Técnico – Módulo') ||
        s.startsWith('Vídeo Extra 01: Estudo Dirigido & Análise Prática – Apostila') ||
        s.startsWith('Vídeo Extra 02: Estudo de Caso & Exercício Técnico – Apostila') ||
        s.startsWith('Vídeo Extra 01: Estudo Dirigido – Apostila') ||
        s.startsWith('Vídeo Extra 02: Estudo de Caso – Apostila')
      );
    };

    let resolvedTitle = inc.title || b.title || `Vídeo Extra 0${slotNum}`;
    const incTitleGeneric = isGenericTitle(inc.title);
    const bTitleGeneric = isGenericTitle(b.title);
    if (!incTitleGeneric) {
      resolvedTitle = inc.title!;
    } else if (!bTitleGeneric) {
      resolvedTitle = b.title!;
    }

    // Detecção estrita de descrições genéricas padrão
    const genericDescriptions = [
      'conteúdo complementar em vídeo.',
      'análise comentada passo a passo para aprofundar o conteúdo desta apostila.',
      'exercício prático e demonstração das regras de linguagem audiovisual do cinelab.',
      'análise técnica e decupagem comentada pelo professor cineasta tony de luc para aprofundar os conceitos teóricos desta apostila.',
      'demonstração em set de filmagem com resolução prática de problemas de decupagem e linguagem cinematográfica.',
      'aprofundamento técnico dos conceitos fundamentais da apostila com análise de decupagem comentada pelo professor tony de luc.',
      'exercício prático de aplicação em set de filmagem com demonstração passo a passo da metodologia do cinelab.',
      'análise técnica e estudo dirigido para aprofundar os conceitos teóricos desta apostila com o diretor tony de luc.',
    ];
    const isGenericDesc = (d?: string) => {
      if (!d || !d.trim()) return true;
      return genericDescriptions.includes(d.trim().toLowerCase());
    };

    let resolvedDesc = inc.description || b.description || '';
    const incDescGeneric = isGenericDesc(inc.description);
    const bDescGeneric = isGenericDesc(b.description);
    if (!incDescGeneric) {
      resolvedDesc = inc.description!;
    } else if (!bDescGeneric) {
      resolvedDesc = b.description!;
    }

    // Detecção de notas do professor
    const cannedNotes = [
      'assista com atenção antes de responder ao quiz e à avaliação de treinamento.',
      'aplicação prática e orientações de direção do cinema profissional.',
      'assista com atenção aos detalhes do enquadramento e da linguagem cinematográfica.',
      'demonstração de resolução de problemas no set e técnicas de direção.',
    ];
    const isCannedNote = (n?: string) => {
      if (!n || !n.trim()) return true;
      return cannedNotes.includes(n.trim().toLowerCase());
    };

    let resolvedNotes = '';
    const incNoteCanned = isCannedNote(inc.professorNotes);
    const bNoteCanned = isCannedNote(b.professorNotes);
    if (inc.professorNotes !== undefined && !incNoteCanned) {
      resolvedNotes = inc.professorNotes.trim();
    } else if (b.professorNotes !== undefined && !bNoteCanned) {
      resolvedNotes = b.professorNotes.trim();
    } else if (inc.professorNotes !== undefined) {
      resolvedNotes = inc.professorNotes.trim();
    } else {
      resolvedNotes = b.professorNotes || '';
    }

    const resolvedThumb = (isIncRealVideo && inc.thumbnailUrl)
      ? inc.thumbnailUrl
      : (b.thumbnailUrl || inc.thumbnailUrl || '');

    const hours = inc.durationHours !== undefined ? inc.durationHours : (b.durationHours ?? 0);
    const minutes = inc.durationMinutes !== undefined ? inc.durationMinutes : (b.durationMinutes ?? (slotNum === 1 ? 18 : 24));
    const seconds = inc.durationSeconds !== undefined ? inc.durationSeconds : (b.durationSeconds ?? 0);
    const totalSecs = (hours * 3600) + (minutes * 60) + seconds;
    const durationLabel = inc.durationLabel || b.durationLabel || formatHms(hours, minutes, seconds);

    return {
      id: inc.id || b.id || `ev-slot-${slotNum}`,
      slot: slotNum,
      title: resolvedTitle,
      description: resolvedDesc,
      videoUrl: resolvedVideoUrl,
      thumbnailUrl: resolvedThumb,
      durationHours: hours,
      durationMinutes: minutes,
      durationSeconds: seconds,
      totalDurationSeconds: totalSecs,
      durationLabel,
      professorNotes: resolvedNotes,
      uploadedAt: inc.uploadedAt || b.uploadedAt || new Date().toISOString(),
    };
  });
}

/**
 * Salva e persiste os 2 Vídeos Extras de Estudo no cofre permanente do navegador (LocalStorage + IndexedDB).
 * Garante que ambos os slots persistam de forma 100% independente e nunca se apaguem.
 */
export async function saveApostilaExtraVideosToVault(
  targetIdOrModuleId: number | string,
  extraVideos: ApostilaExtraVideo[],
  isBonus?: boolean
): Promise<void> {
  const id = getVaultItemId(targetIdOrModuleId, isBonus);
  const rawIdStr = String(targetIdOrModuleId);
  const currentIndex = getPersistentVaultIndex();
  const existing = currentIndex[id] || { id };

  // Grava chaves síncronas dedicadas no localStorage para resiliência máxima
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      const dataStr = JSON.stringify(extraVideos);
      localStorage.setItem(`cinelab_extra_videos_v2_${id}`, dataStr);
      localStorage.setItem(`cinelab_extra_videos_v2_${rawIdStr}`, dataStr);
      if (rawIdStr.startsWith('apostila-')) {
        const numPart = rawIdStr.replace('apostila-', '');
        localStorage.setItem(`cinelab_extra_videos_v2_${numPart}`, dataStr);
      }
    }
  } catch (e) {
    console.warn('Erro ao salvar no localStorage direto:', e);
  }

  currentIndex[id] = {
    ...existing,
    extraVideos,
    updatedAt: new Date().toISOString(),
  };
  savePersistentVaultIndex(currentIndex);

  try {
    const db = await openVaultDb();
    const tx = db.transaction(STORE_NAME, 'readwrite');
    const store = tx.objectStore(STORE_NAME);
    const req = store.get(id);
    req.onsuccess = () => {
      const item = req.result || { id };
      item.extraVideos = extraVideos;
      item.updatedAt = new Date().toISOString();
      store.put(item);
    };
  } catch (err) {
    console.warn('saveApostilaExtraVideosToVault IndexedDB warning:', err);
  }
}

/**
 * Lê os vídeos extras persistentes para uma determinada apostila do cofre local
 */
export function getPersistentExtraVideos(targetIdOrModuleId: number | string, isBonus?: boolean): ApostilaExtraVideo[] | null {
  if (typeof window === 'undefined' || !window.localStorage) return null;
  const id = getVaultItemId(targetIdOrModuleId, isBonus);
  const rawIdStr = String(targetIdOrModuleId);
  try {
    const direct1 = localStorage.getItem(`cinelab_extra_videos_v2_${id}`);
    if (direct1) {
      const parsed = JSON.parse(direct1);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
    const direct2 = localStorage.getItem(`cinelab_extra_videos_v2_${rawIdStr}`);
    if (direct2) {
      const parsed = JSON.parse(direct2);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
    if (rawIdStr.startsWith('apostila-')) {
      const numPart = rawIdStr.replace('apostila-', '');
      const direct3 = localStorage.getItem(`cinelab_extra_videos_v2_${numPart}`);
      if (direct3) {
        const parsed = JSON.parse(direct3);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    }
  } catch {}

  const vault = getPersistentVaultIndex();
  const item = vault[id];
  if (item && Array.isArray(item.extraVideos) && item.extraVideos.length > 0) {
    return item.extraVideos;
  }
  return null;
}

/**
 * Mescla a lista de apostilas do servidor com os dados persistentes locais do usuário
 * Garante que títulos editados, páginas, uploads e VÍDEOS EXTRAS NUNCA sejam revertidos na UI
 */
export function getMergedApostilasWithVault(serverApostilas: Apostila[]): Apostila[] {
  if (!Array.isArray(serverApostilas)) return serverApostilas;
  const vault = getPersistentVaultIndex();

  const canonicalPagesMap: Record<number, number> = {
    1: 8,
    2: 52,
    3: 7,
    4: 6,
    5: 6,
    6: 6,
    7: 6,
    8: 6,
    9: 6,
    10: 6,
  };

  return serverApostilas.map((apos) => {
    const key = `mod-${apos.moduleId}`;
    const local = vault[key];

    const realCanonicalPages = canonicalPagesMap[apos.moduleId] || 6;
    const isOutdatedPages = !local?.pagesCount || local.pagesCount === 4 || local.pagesCount === 35 || local.pagesCount === 40;
    const pages = (!isOutdatedPages && local && local.pagesCount > 0) ? local.pagesCount : (apos.pagesCount || realCanonicalPages);

    // Auto-heal duplicate module 1 title on module 2 or other modules in client vault
    const isCorruptedTitle = apos.moduleId !== 1 && local?.title === 'Introdução ao Cinema e à Linguagem Audiovisual';
    const effectiveTitle = isCorruptedTitle
      ? (apos.moduleId === 2 ? 'História do Cinema' : apos.title)
      : (local?.title || apos.title);

    // Auto-heal pdfUrl se apontar para upload corrompido de 6KB (1790444 ou 1790684)
    const rawPdfUrl = local?.pdfUrl || apos.pdfUrl || '';
    const numStr = apos.moduleId < 10 ? `0${apos.moduleId}` : `${apos.moduleId}`;
    const canonicalPdfUrl = `/materiais/cinelab-apostila-${numStr}.pdf`;
    const isCorruptedPdf = !rawPdfUrl || rawPdfUrl.includes('1790444') || rawPdfUrl.includes('1790684');
    const effectivePdfUrl = isCorruptedPdf ? canonicalPdfUrl : rawPdfUrl;

    if ((isCorruptedTitle || isCorruptedPdf || isOutdatedPages) && vault[key]) {
      if (isCorruptedTitle) vault[key].title = effectiveTitle;
      if (isCorruptedPdf) vault[key].pdfUrl = effectivePdfUrl;
      if (isOutdatedPages) vault[key].pagesCount = pages;
      savePersistentVaultIndex(vault);
    }

    // Mescla vídeos extras locais com os do servidor
    const localVideos = getPersistentExtraVideos(apos.id || apos.moduleId, false) || (local as any)?.extraVideos;
    const effectiveExtraVideos = mergeExtraVideosList(apos.extraVideos, localVideos);

    return {
      ...apos,
      title: effectiveTitle,
      pagesCount: pages,
      totalPages: pages,
      pdfUrl: effectivePdfUrl,
      fileSizeMb: local?.fileSizeMb || apos.fileSizeMb,
      extraVideos: effectiveExtraVideos,
    };
  });
}

/**
 * Mescla a lista de apostilas bônus do servidor com os dados persistentes locais
 */
export function getMergedBonusWithVault(serverBonus: BonusApostila[]): BonusApostila[] {
  if (!Array.isArray(serverBonus)) return serverBonus;
  const vault = getPersistentVaultIndex();

  let vaultNeedsSave = false;

  const result = serverBonus.map((b) => {
    const key = `bonus-${b.number}`;
    const local = vault[key];
    const defaultPages = b.number === 1 ? 30 : 29;
    const canonicalTitle = b.number === 1 ? 'Glossário Completo de Planos' : 'Glossário Completo de Roteiro';
    const canonicalSubtitle = b.number === 1 
      ? 'Guia Permanente de Consulta Técnica e Decupagem Cinematográfica'
      : 'Guia Permanente de Consulta Dramatúrgica e Estruturação de Histórias';
    const canonicalSummary = b.number === 1
      ? 'Guia permanente de consulta técnica para decupagem cinematográfica, escalas de planos e movimentos de câmera.'
      : 'Guia permanente de consulta dramatúrgica: da criação de premissa, storyline e sinopse à escaleta e roteiro final.';

    const isOutdatedLocal =
      local &&
      (
        !local.title ||
        local.title.includes('Pitching') ||
        local.title.includes('Guerrilha') ||
        local.title.includes('Bíblia de Série') ||
        local.title.includes('Nova Apostila') ||
        local.pagesCount === 35 ||
        local.pagesCount === 40 ||
        local.pagesCount === 96 ||
        local.pagesCount === 104
      );

    if (isOutdatedLocal && vault[key]) {
      vault[key] = {
        ...vault[key],
        title: canonicalTitle,
        pagesCount: defaultPages,
      };
      vaultNeedsSave = true;
    }

    const isOutdatedServer =
      !b.title ||
      b.title.includes('Pitching') ||
      b.title.includes('Guerrilha') ||
      b.title.includes('Bíblia de Série') ||
      b.title.includes('Nova Apostila') ||
      b.pagesCount === 35 ||
      b.pagesCount === 40 ||
      b.pagesCount === 96 ||
      b.pagesCount === 104;

    const title = (!isOutdatedLocal && local?.title) ? local.title : ((!isOutdatedServer && b.title) ? b.title : canonicalTitle);
    const summary = (!isOutdatedLocal && (local as any)?.summary) ? (local as any).summary : ((!isOutdatedServer && (b.summary || b.description)) ? (b.summary || b.description) : canonicalSummary);

    let pages = defaultPages;
    if (!isOutdatedLocal && local?.pagesCount && local.pagesCount > 0 && local.pagesCount !== 96 && local.pagesCount !== 104) {
      pages = local.pagesCount;
    } else if (!isOutdatedServer && (b.pagesCount || b.totalPages)) {
      const p = b.pagesCount || b.totalPages;
      pages = (p !== 96 && p !== 104) ? p : defaultPages;
    }

    const localBonusVideos = getPersistentExtraVideos(b.id || b.number, true) || (local as any)?.extraVideos;
    const canonicalBonusUrl =
      b.number === 1
        ? '/materiais/cinelab-bonus-01-glossario-planos.pdf'
        : b.number === 2
        ? '/materiais/cinelab-bonus-02-glossario-roteiro.pdf'
        : '/materiais/cinelab-bonus-03-analise-filmica.pdf';
    const rawBonusUrl = local?.pdfUrl || b.pdfUrl || '';
    const isCorruptedBonusUrl = !rawBonusUrl || rawBonusUrl.includes('1790444') || rawBonusUrl.includes('1790684');
    const effectiveBonusPdfUrl = isCorruptedBonusUrl ? canonicalBonusUrl : rawBonusUrl;

    const effectiveBonusExtraVideos = mergeExtraVideosList(b.extraVideos, localBonusVideos);

    return {
      ...b,
      title,
      subtitle: b.subtitle || canonicalSubtitle,
      summary,
      description: summary,
      pagesCount: pages,
      totalPages: pages,
      pdfUrl: effectiveBonusPdfUrl,
      fileSizeMb: local?.fileSizeMb || b.fileSizeMb,
      extraVideos: effectiveBonusExtraVideos,
    };
  });

  if (vaultNeedsSave) {
    savePersistentVaultIndex(vault);
  }

  return result;
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
