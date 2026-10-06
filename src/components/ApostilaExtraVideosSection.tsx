import React, { useState } from 'react';
import { Apostila, BonusApostila, ApostilaExtraVideo } from '../types/index.js';
import { api } from '../services/api.js';
import { resolveApostilaExtraVideos } from '../data/canonicalExtraVideos.js';
import { useLanguage } from '../i18n/LanguageContext.js';
import { EXTRA_VIDEOS_UI_TRANSLATIONS, getTranslatedExtraVideo } from '../i18n/extraVideosTranslations.js';
import {
  Film,
  Play,
  Upload,
  CheckCircle2,
  Clock,
  Sparkles,
  Trash2,
  Edit3,
  ExternalLink,
  Loader2,
  AlertCircle,
  X,
  Video,
  Shield,
  Check,
  Youtube,
  Link as LinkIcon,
  PlayCircle,
  RefreshCw,
  Timer,
  MessageSquare,
  FileEdit,
} from 'lucide-react';

interface ApostilaExtraVideosSectionProps {
  apostila: Apostila | BonusApostila;
  isAdmin?: boolean;
  onApostilaUpdated?: (updatedApostila: any) => void;
  titlePrefix?: string;
}

// Utilitário para extrair ID de vídeo do YouTube em qualquer formato
export function extractYoutubeId(url?: string): string | null {
  if (!url || typeof url !== 'string') return null;
  const trimmed = url.trim();
  const match = trimmed.match(
    /(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=|shorts\/))([\w-]{11})/
  );
  return match ? match[1] : null;
}

// Utilitário para formatar no padrão estrito de Cinema: Horas, Minutos e Segundos (ex: 01h 24m 30s)
export function formatHms(hours: number, minutes: number, seconds: number): string {
  const pad = (n: number) => String(Math.max(0, Math.floor(n || 0))).padStart(2, '0');
  const hh = Math.max(0, Math.floor(hours || 0));
  const mm = Math.max(0, Math.min(59, Math.floor(minutes || 0)));
  const ss = Math.max(0, Math.min(59, Math.floor(seconds || 0)));
  return `${pad(hh)}h ${pad(mm)}m ${pad(ss)}s`;
}

// Utilitário para formatar como Timecode Digital clássico (ex: 01:24:30)
export function formatHmsTimecode(hours: number, minutes: number, seconds: number): string {
  const pad = (n: number) => String(Math.max(0, Math.floor(n || 0))).padStart(2, '0');
  const hh = Math.max(0, Math.floor(hours || 0));
  const mm = Math.max(0, Math.min(59, Math.floor(minutes || 0)));
  const ss = Math.max(0, Math.min(59, Math.floor(seconds || 0)));
  return `${pad(hh)}:${pad(mm)}:${pad(ss)}`;
}

// Utilitário para extrair horas, minutos e segundos de qualquer objeto ApostilaExtraVideo
export function parseHmsFromVideo(video?: ApostilaExtraVideo | null): { hours: number; minutes: number; seconds: number } {
  if (!video) return { hours: 0, minutes: 18, seconds: 0 };

  if (video.durationHours !== undefined || video.durationSeconds !== undefined) {
    return {
      hours: Number(video.durationHours) || 0,
      minutes: Number(video.durationMinutes) || 0,
      seconds: Number(video.durationSeconds) || 0,
    };
  }

  // Tenta extrair da string de label se houver formato "01h 20m 30s" ou "18 min"
  if (video.durationLabel) {
    const hmsRegex = /(?:(\d+)\s*h(?:oras?)?)?\s*(?:(\d+)\s*m(?:in(?:utos?)?)?)?\s*(?:(\d+)\s*s(?:eg(?:undos?)?)?)?/i;
    const match = video.durationLabel.match(hmsRegex);
    if (match && (match[1] || match[2] || match[3])) {
      const h = match[1] ? parseInt(match[1], 10) : 0;
      const m = match[2] ? parseInt(match[2], 10) : 0;
      const s = match[3] ? parseInt(match[3], 10) : 0;
      if (h > 0 || m > 0 || s > 0) {
        return { hours: h, minutes: m, seconds: s };
      }
    }

    const colonMatch = video.durationLabel.match(/(\d+):(\d+)(?::(\d+))?/);
    if (colonMatch) {
      if (colonMatch[3]) {
        return {
          hours: parseInt(colonMatch[1], 10),
          minutes: parseInt(colonMatch[2], 10),
          seconds: parseInt(colonMatch[3], 10),
        };
      } else {
        return {
          hours: 0,
          minutes: parseInt(colonMatch[1], 10),
          seconds: parseInt(colonMatch[2], 10),
        };
      }
    }
  }

  const mins = Number(video.durationMinutes) || (video.slot === 1 ? 18 : 24);
  return {
    hours: Math.floor(mins / 60),
    minutes: mins % 60,
    seconds: 0,
  };
}

export const ApostilaExtraVideosSection: React.FC<ApostilaExtraVideosSectionProps> = ({
  apostila,
  isAdmin = false,
  onApostilaUpdated,
  titlePrefix,
}) => {
  const { language } = useLanguage();
  const tUi = EXTRA_VIDEOS_UI_TRANSLATIONS[language] || EXTRA_VIDEOS_UI_TRANSLATIONS.pt;
  const modNumber = (apostila as any)?.moduleId || (apostila as any)?.number || 1;
  const [uploadingSlot, setUploadingSlot] = useState<number | null>(null);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [editingSlot, setEditingSlot] = useState<number | null>(null);
  const [youtubeSlot, setYoutubeSlot] = useState<number | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  // Edição direta inline de "Orientação do Professor Tony de Luc"
  const [editingNotesSlot, setEditingNotesSlot] = useState<number | null>(null);
  const [notesText, setNotesText] = useState<string>('');
  const [isSavingNotes, setIsSavingNotes] = useState<boolean>(false);

  // Form state para Edição Geral (com Horas, Minutos, Segundos e Orientação)
  const [formTitle, setFormTitle] = useState('');
  const [formDescription, setFormDescription] = useState('');
  const [formVideoUrl, setFormVideoUrl] = useState('');
  const [formHours, setFormHours] = useState(0);
  const [formMinutes, setFormMinutes] = useState(18);
  const [formSeconds, setFormSeconds] = useState(0);
  const [formProfessorNotes, setFormProfessorNotes] = useState('');

  // Form state específico para YouTube (com Horas, Minutos, Segundos e Orientação)
  const [ytUrl, setYtUrl] = useState('');
  const [ytTitle, setYtTitle] = useState('');
  const [ytDescription, setYtDescription] = useState('');
  const [ytHours, setYtHours] = useState(0);
  const [ytMinutes, setYtMinutes] = useState(18);
  const [ytSeconds, setYtSeconds] = useState(0);
  const [ytProfessorNotes, setYtProfessorNotes] = useState('');
  const [isSavingYoutube, setIsSavingYoutube] = useState(false);

  // Sincronização manual com GitHub / Vercel para persistência no mobile
  const [isSyncingGithub, setIsSyncingGithub] = useState(false);

  const handleSyncGithub = async () => {
    try {
      setIsSyncingGithub(true);
      setErrorMsg(null);
      const res = await api.syncToGithub();
      setSuccessMsg(res.message || 'Dados sincronizados com o GitHub e enviados para deploy na Vercel!');
      setTimeout(() => setSuccessMsg(null), 6000);
    } catch (err: any) {
      setErrorMsg(err.message || 'Erro ao sincronizar com GitHub');
    } finally {
      setIsSyncingGithub(false);
    }
  };

  const rawExtraVideos = (apostila as any)?.extraVideos || [];

  // Helper to recognize and eliminate fake canned phrases
  const isCannedPhrase = (text?: string): boolean => {
    if (!text || typeof text !== "string") return false;
    const canned = [
      "Assista com atenção antes de responder ao quiz e à avaliação de treinamento.",
      "Aplicação prática e orientações de direção do cinema profissional.",
      "Assista com atenção aos detalhes do enquadramento e da linguagem cinematográfica.",
      "Demonstração de resolução de problemas no set e técnicas de direção.",
    ];
    return canned.includes(text.trim());
  };

  const getSlotStorageKey = (aposId: string | number, slotNum: number) =>
    `cinelab_extra_video_${aposId}_slot_${slotNum}`;

  const loadSlotFromStorage = (aposId: string | number, slotNum: number): Partial<ApostilaExtraVideo> | null => {
    try {
      const data = localStorage.getItem(getSlotStorageKey(aposId, slotNum));
      if (!data) return null;
      return JSON.parse(data);
    } catch {
      return null;
    }
  };

  const saveSlotToStorage = (aposId: string | number, slotNum: number, video: Partial<ApostilaExtraVideo>) => {
    try {
      localStorage.setItem(getSlotStorageKey(aposId, slotNum), JSON.stringify(video));
      if (video.professorNotes !== undefined) {
        localStorage.setItem(`cinelab_notes_${aposId}_${slotNum}`, video.professorNotes);
      }
    } catch {}
  };

  const getLocalNotes = (slotNum: number): string => {
    try {
      return localStorage.getItem(`cinelab_notes_${apostila.id}_${slotNum}`) || "";
    } catch {
      return "";
    }
  };

  const saveLocalNotes = (slotNum: number, text: string) => {
    try {
      localStorage.setItem(`cinelab_notes_${apostila.id}_${slotNum}`, text);
    } catch {}
  };

  // Resolução canônica de vídeos extras para todos os módulos (M- 1.1 até M- 10.2 e Bônus)
  const [resolvedSlot1, resolvedSlot2] = resolveApostilaExtraVideos(apostila, rawExtraVideos);

  const localNote1 = getLocalNotes(1);
  const localNote2 = getLocalNotes(2);
  const storedSlot1 = loadSlotFromStorage(apostila.id, 1);
  const storedSlot2 = loadSlotFromStorage(apostila.id, 2);

  const slot1: ApostilaExtraVideo = {
    ...resolvedSlot1,
    title: (storedSlot1?.title && !storedSlot1.title.includes('Módulo 0')) ? storedSlot1.title : resolvedSlot1.title,
    description: storedSlot1?.description || resolvedSlot1.description,
    videoUrl: storedSlot1?.videoUrl || resolvedSlot1.videoUrl,
    thumbnailUrl: storedSlot1?.thumbnailUrl || resolvedSlot1.thumbnailUrl,
    durationHours: storedSlot1?.durationHours ?? resolvedSlot1.durationHours,
    durationMinutes: storedSlot1?.durationMinutes ?? resolvedSlot1.durationMinutes,
    durationSeconds: storedSlot1?.durationSeconds ?? resolvedSlot1.durationSeconds,
    durationLabel: storedSlot1?.durationLabel || resolvedSlot1.durationLabel,
    professorNotes:
      (localNote1 && localNote1.trim() !== "" && !isCannedPhrase(localNote1))
        ? localNote1
        : (storedSlot1?.professorNotes && storedSlot1.professorNotes.trim() !== "" && !isCannedPhrase(storedSlot1.professorNotes))
        ? storedSlot1.professorNotes
        : resolvedSlot1.professorNotes,
  };

  const slot2: ApostilaExtraVideo = {
    ...resolvedSlot2,
    title: (storedSlot2?.title && !storedSlot2.title.includes('Módulo 0')) ? storedSlot2.title : resolvedSlot2.title,
    description: storedSlot2?.description || resolvedSlot2.description,
    videoUrl: storedSlot2?.videoUrl || resolvedSlot2.videoUrl,
    thumbnailUrl: storedSlot2?.thumbnailUrl || resolvedSlot2.thumbnailUrl,
    durationHours: storedSlot2?.durationHours ?? resolvedSlot2.durationHours,
    durationMinutes: storedSlot2?.durationMinutes ?? resolvedSlot2.durationMinutes,
    durationSeconds: storedSlot2?.durationSeconds ?? resolvedSlot2.durationSeconds,
    durationLabel: storedSlot2?.durationLabel || resolvedSlot2.durationLabel,
    professorNotes:
      (localNote2 && localNote2.trim() !== "" && !isCannedPhrase(localNote2))
        ? localNote2
        : (storedSlot2?.professorNotes && storedSlot2.professorNotes.trim() !== "" && !isCannedPhrase(storedSlot2.professorNotes))
        ? storedSlot2.professorNotes
        : resolvedSlot2.professorNotes,
  };

  const translatedSlot1 = getTranslatedExtraVideo(slot1, language, modNumber, 1);
  const translatedSlot2 = getTranslatedExtraVideo(slot2, language, modNumber, 2);
  const extraVideos = [translatedSlot1, translatedSlot2];

  // Blindagem de mesclagem para impedir que salvar Slot 1 apague Slot 2 e vice-versa
  const mergeSlotsSafely = (
    savedSlotNum: 1 | 2,
    savedVideo: ApostilaExtraVideo,
    serverVideos?: ApostilaExtraVideo[]
  ): ApostilaExtraVideo[] => {
    const otherSlotNum: 1 | 2 = savedSlotNum === 1 ? 2 : 1;
    const currentOther = extraVideos.find((v) => v.slot === otherSlotNum);
    const serverOther = serverVideos?.find((v) => v.slot === otherSlotNum);
    const storedOther = loadSlotFromStorage(apostila.id, otherSlotNum);

    // O slot salvo é SEMPRE o novo savedVideo e já é garantido no storage
    saveSlotToStorage(apostila.id, savedSlotNum, savedVideo);

    // Para o outro slot: NUNCA permitir que seja apagado ou limpo!
    let preservedOther: ApostilaExtraVideo;
    if (serverOther && serverOther.videoUrl && serverOther.videoUrl.trim() !== '') {
      preservedOther = {
        ...currentOther,
        ...serverOther,
        professorNotes: serverOther.professorNotes || currentOther?.professorNotes || (storedOther?.professorNotes as string) || '',
      };
    } else if (currentOther && (currentOther.videoUrl || currentOther.professorNotes)) {
      preservedOther = {
        ...currentOther,
        professorNotes: currentOther.professorNotes || (storedOther?.professorNotes as string) || '',
      };
    } else if (storedOther && (storedOther.videoUrl || storedOther.professorNotes)) {
      preservedOther = {
        ...(currentOther || {}),
        ...storedOther,
      } as ApostilaExtraVideo;
    } else {
      preservedOther = serverOther || currentOther!;
    }

    if (preservedOther) {
      saveSlotToStorage(apostila.id, otherSlotNum, preservedOther);
    }

    return savedSlotNum === 1 ? [savedVideo, preservedOther] : [preservedOther, savedVideo];
  };

  // Abertura do Modal de Edição Geral
  const handleStartEdit = (video: ApostilaExtraVideo) => {
    setEditingSlot(video.slot);
    setYoutubeSlot(null);
    setEditingNotesSlot(null);
    setFormTitle(video.title || `Vídeo Extra 0${video.slot}: Estudo de Caso`);
    setFormDescription(video.description || '');
    setFormVideoUrl(video.videoUrl || '');
    setFormProfessorNotes(video.professorNotes || '');

    const { hours, minutes, seconds } = parseHmsFromVideo(video);
    setFormHours(hours);
    setFormMinutes(minutes);
    setFormSeconds(seconds);

    setErrorMsg(null);
    setSuccessMsg(null);
  };

  // Abertura do Modal / Aba Direta do YouTube
  const handleOpenYoutubeModal = (video: ApostilaExtraVideo) => {
    setYoutubeSlot(video.slot);
    setEditingSlot(null);
    setEditingNotesSlot(null);
    const isYt = Boolean(extractYoutubeId(video.videoUrl));
    setYtUrl(isYt ? video.videoUrl : '');
    setYtTitle(video.title || `Vídeo Extra 0${video.slot}: Estudo Dirigido – ${apostila.title}`);
    setYtDescription(
      video.description ||
        `Análise técnica e estudo dirigido para aprofundar os conceitos teóricos desta apostila com o Diretor Tony de Luc.`
    );
    setYtProfessorNotes(video.professorNotes || '');

    const { hours, minutes, seconds } = parseHmsFromVideo(video);
    setYtHours(hours);
    setYtMinutes(minutes);
    setYtSeconds(seconds);

    setErrorMsg(null);
    setSuccessMsg(null);
  };

  // Salvar Vídeo do YouTube com Horas, Minutos, Segundos e Orientação do Professor
  const handleSaveYoutubeVideo = async (slot: 1 | 2) => {
    const trimmedUrl = ytUrl.trim();
    const ytId = extractYoutubeId(trimmedUrl);

    if (!trimmedUrl) {
      setErrorMsg('Por favor, cole a URL do vídeo do YouTube.');
      return;
    }

    if (!ytId) {
      setErrorMsg(
        'URL inválida do YouTube. Insira um link válido (ex: https://www.youtube.com/watch?v=... ou https://youtu.be/...)'
      );
      return;
    }

    try {
      setIsSavingYoutube(true);
      setErrorMsg(null);

      const canonicalYtUrl = `https://www.youtube.com/watch?v=${ytId}`;
      const thumbUrl = `https://img.youtube.com/vi/${ytId}/hqdefault.jpg`;

      const safeH = Math.max(0, Math.floor(ytHours || 0));
      const safeM = Math.max(0, Math.min(59, Math.floor(ytMinutes || 0)));
      const safeS = Math.max(0, Math.min(59, Math.floor(ytSeconds || 0)));
      const totalSecs = safeH * 3600 + safeM * 60 + safeS;
      const formattedLabel = formatHms(safeH, safeM, safeS);

      const otherSlotNum: 1 | 2 = slot === 1 ? 2 : 1;
      const otherSlotData = extraVideos.find((v) => v.slot === otherSlotNum);

      const payloadVideo: ApostilaExtraVideo = {
        id: `ev-${apostila.id}-slot-${slot}`,
        slot,
        title: ytTitle.trim() || `Vídeo Extra 0${slot}: Estudo Dirigido – YouTube`,
        description: ytDescription.trim(),
        videoUrl: canonicalYtUrl,
        thumbnailUrl: thumbUrl,
        durationHours: safeH,
        durationMinutes: safeM,
        durationSeconds: safeS,
        totalDurationSeconds: totalSecs,
        durationLabel: formattedLabel,
        professorNotes: ytProfessorNotes.trim(),
        uploadedAt: new Date().toISOString(),
      };

      const res = await api.updateApostilaExtraVideo(apostila.id, slot, {
        title: payloadVideo.title,
        description: payloadVideo.description,
        videoUrl: payloadVideo.videoUrl,
        thumbnailUrl: payloadVideo.thumbnailUrl,
        durationHours: safeH,
        durationMinutes: safeM,
        durationSeconds: safeS,
        totalDurationSeconds: totalSecs,
        durationLabel: formattedLabel,
        professorNotes: payloadVideo.professorNotes,
        otherSlotData,
      });

      const safeVideos = mergeSlotsSafely(slot, res.extraVideo || payloadVideo, res.extraVideos);

      if (onApostilaUpdated) {
        onApostilaUpdated(res.apostila ? { ...res.apostila, extraVideos: safeVideos } : { ...apostila, extraVideos: safeVideos });
      }

      saveLocalNotes(slot, ytProfessorNotes.trim());
      setSuccessMsg(`Vídeo do YouTube vinculado ao Local 0${slot} com sucesso!`);
      setYoutubeSlot(null);
      setTimeout(() => setSuccessMsg(null), 4000);
    } catch (err: any) {
      setErrorMsg(err.message || 'Erro ao vincular vídeo do YouTube.');
    } finally {
      setIsSavingYoutube(false);
    }
  };

  // Salvar Metadados da Edição Geral com Horas, Minutos, Segundos e Orientação do Professor
  const handleSaveMeta = async (slot: 1 | 2) => {
    try {
      setErrorMsg(null);
      const trimmedUrl = formVideoUrl.trim();
      const ytId = extractYoutubeId(trimmedUrl);

      const safeH = Math.max(0, Math.floor(formHours || 0));
      const safeM = Math.max(0, Math.min(59, Math.floor(formMinutes || 0)));
      const safeS = Math.max(0, Math.min(59, Math.floor(formSeconds || 0)));
      const totalSecs = safeH * 3600 + safeM * 60 + safeS;
      const formattedLabel = formatHms(safeH, safeM, safeS);

      let thumb: string | undefined = undefined;
      if (ytId) {
        thumb = `https://img.youtube.com/vi/${ytId}/hqdefault.jpg`;
      }

      const otherSlotNum: 1 | 2 = slot === 1 ? 2 : 1;
      const otherSlotData = extraVideos.find((v) => v.slot === otherSlotNum);

      const payloadVideo: ApostilaExtraVideo = {
        id: `ev-${apostila.id}-slot-${slot}`,
        slot,
        title: formTitle.trim(),
        description: formDescription.trim(),
        videoUrl: trimmedUrl,
        thumbnailUrl: thumb,
        durationHours: safeH,
        durationMinutes: safeM,
        durationSeconds: safeS,
        totalDurationSeconds: totalSecs,
        durationLabel: formattedLabel,
        professorNotes: formProfessorNotes.trim(),
        uploadedAt: new Date().toISOString(),
      };

      const res = await api.updateApostilaExtraVideo(apostila.id, slot, {
        title: payloadVideo.title,
        description: payloadVideo.description,
        videoUrl: payloadVideo.videoUrl,
        thumbnailUrl: payloadVideo.thumbnailUrl,
        durationHours: safeH,
        durationMinutes: safeM,
        durationSeconds: safeS,
        totalDurationSeconds: totalSecs,
        durationLabel: formattedLabel,
        professorNotes: payloadVideo.professorNotes,
        otherSlotData,
      });

      const safeVideos = mergeSlotsSafely(slot, res.extraVideo || payloadVideo, res.extraVideos);

      if (onApostilaUpdated) {
        onApostilaUpdated(res.apostila ? { ...res.apostila, extraVideos: safeVideos } : { ...apostila, extraVideos: safeVideos });
      }

      saveLocalNotes(slot, formProfessorNotes.trim());
      setSuccessMsg(`Informações do Vídeo Extra 0${slot} salvas com sucesso!`);
      setEditingSlot(null);
      setTimeout(() => setSuccessMsg(null), 4000);
    } catch (err: any) {
      setErrorMsg(err.message || 'Erro ao salvar vídeo extra.');
    }
  };

  // Salvar Exclusivamente a Orientação do Professor Tony de Luc (Edição Rápida Direta)
  const handleSaveProfessorNotesDirect = async (slot: 1 | 2) => {
    try {
      setIsSavingNotes(true);
      setErrorMsg(null);

      const otherSlotNum: 1 | 2 = slot === 1 ? 2 : 1;
      const otherSlotData = extraVideos.find((v) => v.slot === otherSlotNum);
      const currentSlotData = extraVideos.find((v) => v.slot === slot);

      const res = await api.updateApostilaExtraVideo(apostila.id, slot, {
        professorNotes: notesText.trim(),
        otherSlotData,
      });

      const updatedThisSlot: ApostilaExtraVideo = {
        ...(currentSlotData || {}),
        slot,
        professorNotes: notesText.trim(),
      } as ApostilaExtraVideo;

      const safeVideos = mergeSlotsSafely(slot, res.extraVideo || updatedThisSlot, res.extraVideos);

      if (onApostilaUpdated) {
        onApostilaUpdated(res.apostila ? { ...res.apostila, extraVideos: safeVideos } : { ...apostila, extraVideos: safeVideos });
      }

      saveLocalNotes(slot, notesText.trim());
      setSuccessMsg(`Orientação do Professor Tony de Luc do Local 0${slot} atualizada com sucesso!`);
      setEditingNotesSlot(null);
      setTimeout(() => setSuccessMsg(null), 4000);
    } catch (err: any) {
      setErrorMsg(err.message || 'Erro ao salvar orientação do professor.');
    } finally {
      setIsSavingNotes(false);
    }
  };

  // Detecta a duração exata do arquivo MP4 selecionado pelo usuário
  const detectVideoFileDuration = (file: File): Promise<{ hours: number; minutes: number; seconds: number }> => {
    return new Promise((resolve) => {
      try {
        const videoElement = document.createElement('video');
        videoElement.preload = 'metadata';
        videoElement.onloadedmetadata = () => {
          window.URL.revokeObjectURL(videoElement.src);
          const durationSec = Math.round(videoElement.duration);
          if (!isNaN(durationSec) && durationSec > 0) {
            const h = Math.floor(durationSec / 3600);
            const m = Math.floor((durationSec % 3600) / 60);
            const s = durationSec % 60;
            resolve({ hours: h, minutes: m, seconds: s });
          } else {
            resolve({ hours: 0, minutes: 18, seconds: 0 });
          }
        };
        videoElement.onerror = () => resolve({ hours: 0, minutes: 18, seconds: 0 });
        videoElement.src = URL.createObjectURL(file);
      } catch {
        resolve({ hours: 0, minutes: 18, seconds: 0 });
      }
    });
  };

  // Upload Direto de Arquivo do Computador
  const handleUploadFile = async (slot: 1 | 2, file: File) => {
    try {
      setErrorMsg(null);
      setUploadingSlot(slot);
      setUploadProgress(0);

      const otherSlotNum: 1 | 2 = slot === 1 ? 2 : 1;
      const otherSlotData = extraVideos.find((v) => v.slot === otherSlotNum);
      const currentVid = extraVideos.find((v) => v.slot === slot);
      const parsed = parseHmsFromVideo(currentVid);

      // Detecta tempo exato do arquivo de vídeo se possível
      const detectedTime = await detectVideoFileDuration(file);
      const finalH = detectedTime.hours > 0 || detectedTime.seconds > 0 ? detectedTime.hours : parsed.hours;
      const finalM = detectedTime.minutes > 0 ? detectedTime.minutes : parsed.minutes;
      const finalS = detectedTime.seconds > 0 ? detectedTime.seconds : parsed.seconds;
      const finalLabel = formatHms(finalH, finalM, finalS);

      const res = await api.uploadApostilaExtraVideo(apostila.id, slot, file, {
        title: currentVid?.title || `Vídeo Extra 0${slot}: Estudo Dirigido`,
        description: currentVid?.description,
        durationHours: finalH,
        durationMinutes: finalM,
        durationSeconds: finalS,
        durationLabel: finalLabel,
        professorNotes: currentVid?.professorNotes,
        otherSlotData,
        onProgress: (p) => setUploadProgress(p),
      });

      const safeVideos = mergeSlotsSafely(slot, res.extraVideo, res.extraVideos);

      if (onApostilaUpdated) {
        onApostilaUpdated(res.apostila ? { ...res.apostila, extraVideos: safeVideos } : { ...apostila, extraVideos: safeVideos });
      }
      setSuccessMsg(`Arquivo de vídeo para o Local 0${slot} subido com sucesso! (${finalLabel})`);
      setTimeout(() => setSuccessMsg(null), 4000);
    } catch (err: any) {
      setErrorMsg(err.message || 'Erro no upload do vídeo extra.');
    } finally {
      setUploadingSlot(null);
      setUploadProgress(0);
    }
  };

  // Remover Vídeo de um Slot
  const handleDeleteVideo = async (slot: 1 | 2) => {
    if (!confirm(`Deseja remover o vídeo associado ao Local 0${slot} desta apostila?`)) {
      return;
    }
    try {
      setErrorMsg(null);
      const otherSlotNum: 1 | 2 = slot === 1 ? 2 : 1;
      const otherSlotData = extraVideos.find((v) => v.slot === otherSlotNum);

      localStorage.removeItem(getSlotStorageKey(apostila.id, slot));
      localStorage.removeItem(`cinelab_notes_${apostila.id}_${slot}`);

      const res = await api.deleteApostilaExtraVideo(apostila.id, slot);

      const safeVideos: ApostilaExtraVideo[] = slot === 1
        ? [res.extraVideos?.find((v: any) => v.slot === 1) || { ...extraVideos[0], videoUrl: '' }, otherSlotData!]
        : [otherSlotData!, res.extraVideos?.find((v: any) => v.slot === 2) || { ...extraVideos[1], videoUrl: '' }];

      if (onApostilaUpdated) {
        onApostilaUpdated(res.apostila ? { ...res.apostila, extraVideos: safeVideos } : { ...apostila, extraVideos: safeVideos });
      }
      setSuccessMsg(`Vídeo do Local 0${slot} removido.`);
      setTimeout(() => setSuccessMsg(null), 4000);
    } catch (err: any) {
      setErrorMsg(err.message || 'Erro ao remover vídeo.');
    }
  };

  const isExternalEmbed = (url?: string) => {
    if (!url) return false;
    return Boolean(extractYoutubeId(url)) || url.includes('vimeo.com');
  };

  const getEmbedUrl = (url: string) => {
    const ytId = extractYoutubeId(url);
    if (ytId) {
      return `https://www.youtube.com/embed/${ytId}?rel=0&playsinline=1&enablejsapi=1`;
    }
    if (url.includes('vimeo.com/')) {
      const vimeoId = url.split('vimeo.com/')[1]?.split('?')[0];
      return `https://player.vimeo.com/video/${vimeoId}`;
    }
    return url;
  };

  const detectedModalYtId = extractYoutubeId(ytUrl);

  return (
    <div className="space-y-6 pt-1">
      {/* Header Informativo com Destaque de 2 Locais, YouTube e Formato de Duração em Horas, Minutos e Segundos */}
      <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-amber-950/40 via-neutral-900 to-neutral-900 border border-amber-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-lg">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 shrink-0 shadow-inner">
            <Film className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center flex-wrap gap-2">
              <h2 className="text-sm sm:text-base font-bold text-white font-display">
                {tUi.sectionTitle}
              </h2>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40">
                {tUi.sectionBadge}
              </span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-red-950/80 text-red-300 border border-red-500/40 flex items-center gap-1">
                <Youtube className="w-3 h-3 text-red-400" />
                YOUTUBE &amp; ARQUIVO MP4
              </span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-amber-500/10 text-amber-400 border border-amber-500/30 flex items-center gap-1">
                <Timer className="w-3 h-3 text-amber-400" />
                HORA, MINUTOS E SEGUNDOS
              </span>
            </div>
            <p className="text-xs text-neutral-300 mt-0.5 leading-relaxed">
              Material didático complementar em vídeo com análises práticas, decupagens e{' '}
              <strong className="text-amber-300">Orientações do Professor Tony de Luc editáveis</strong>.
            </p>
          </div>
        </div>

        {isAdmin && (
          <div className="flex items-center gap-2 flex-wrap">
            <div className="flex items-center gap-2 font-mono text-[11px] text-amber-400 bg-neutral-950/80 px-3 py-1.5 rounded-xl border border-neutral-800 shrink-0">
              <Shield className="w-3.5 h-3.5" />
              <span>Modo Administrador: Edição Livre</span>
            </div>
          </div>
        )}
      </div>

      {/* Alertas de Sucesso ou Erro */}
      {successMsg && (
        <div className="p-3.5 rounded-xl bg-emerald-950/60 border border-emerald-500/50 text-emerald-200 text-xs flex items-center gap-2 font-mono animate-fadeIn">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{successMsg}</span>
        </div>
      )}

      {errorMsg && (
        <div className="p-3.5 rounded-xl bg-red-950/60 border border-red-500/50 text-red-200 text-xs flex items-center gap-2 font-mono animate-fadeIn">
          <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* Grid com os DOIS LOCAIS EXCLUSIVOS DE VÍDEO EXTRA */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {extraVideos.map((video) => {
          const slot = video.slot as 1 | 2;
          const hasVideo = Boolean(video.videoUrl && video.videoUrl.trim() !== '');
          const isUploading = uploadingSlot === slot;
          const isEditing = editingSlot === slot;
          const isYoutubeActive = youtubeSlot === slot;
          const isNotesEditing = editingNotesSlot === slot;
          const isYt = Boolean(extractYoutubeId(video.videoUrl));
          const ytVideoId = extractYoutubeId(video.videoUrl);

          // Extração estruturada de Horas, Minutos e Segundos
          const { hours, minutes, seconds } = parseHmsFromVideo(video);
          const durationHmsLabel =
            video.durationLabel && (video.durationLabel.includes('h') || video.durationLabel.includes('s'))
              ? video.durationLabel
              : formatHms(hours, minutes, seconds);
          const timecodeLabel = formatHmsTimecode(hours, minutes, seconds);

          return (
            <div
              key={`extra-video-slot-${slot}`}
              className="p-5 sm:p-6 rounded-3xl bg-[#0d0f17] border-2 border-neutral-800 hover:border-amber-500/50 transition-all flex flex-col justify-between space-y-4 shadow-xl"
            >
              <div className="space-y-3.5">
                {/* Cabeçalho do Local de Estudo com Badge Preciso de Horas, Minutos e Segundos */}
                <div className="flex items-center justify-between text-xs font-mono flex-wrap gap-2">
                  <span className="px-2.5 py-1 rounded-lg bg-gradient-to-r from-amber-500/20 to-yellow-500/10 text-amber-300 font-bold border border-amber-500/40 flex items-center gap-1.5 shadow-sm">
                    <Film className="w-3.5 h-3.5 text-amber-400" />
                    <span>{slot === 1 ? tUi.slot1Badge : tUi.slot2Badge}</span>
                  </span>

                  <div className="flex items-center gap-1.5 flex-wrap">
                    {hasVideo ? (
                      <>
                        {isYt ? (
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-red-950/80 text-red-300 border border-red-800 flex items-center gap-1">
                            <Youtube className="w-3 h-3 text-red-400" />
                            YOUTUBE
                          </span>
                        ) : (
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-950/80 text-blue-300 border border-blue-800 flex items-center gap-1">
                            <PlayCircle className="w-3 h-3 text-blue-400" />
                            MP4 / VÍDEO
                          </span>
                        )}
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-950/60 text-emerald-300 border border-emerald-800 flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                          PRONTO
                        </span>
                      </>
                    ) : (
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-neutral-900 text-neutral-400 border border-neutral-800 flex items-center gap-1">
                        <Clock className="w-3 h-3 text-neutral-400" />
                        EM ABERTO
                      </span>
                    )}

                    {/* Badge Oficial com Horas, Minutos e Segundos */}
                    <span
                      className="px-2.5 py-0.5 rounded text-[10px] sm:text-[11px] font-bold bg-neutral-900 text-amber-300 border border-neutral-800 flex items-center gap-1.5 shadow-inner"
                      title={`Duração oficial: ${durationHmsLabel} (Timecode: ${timecodeLabel})`}
                    >
                      <Timer className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                      <span className="font-mono tracking-tight">{durationHmsLabel}</span>
                    </span>
                  </div>
                </div>

                {/* Título & Descrição do Vídeo */}
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-white font-display leading-snug">
                    {video.title || (slot === 1 ? 'Vídeo Extra 01: Estudo Dirigido' : 'Vídeo Extra 02: Estudo de Caso')}
                  </h3>
                  <p className="text-xs text-neutral-300 leading-relaxed mt-1 line-clamp-2">
                    {video.description ||
                      'Conteúdo complementar em vídeo gravado pelo Diretor Tony de Luc para aprofundar os estudos desta apostila.'}
                  </p>
                </div>

                {/* Área de Reprodução do Vídeo */}
                {hasVideo ? (
                  <div className="relative aspect-video rounded-2xl overflow-hidden bg-black border border-neutral-800 shadow-2xl group">
                    {isExternalEmbed(video.videoUrl) ? (
                      <iframe
                        src={getEmbedUrl(video.videoUrl)}
                        title={video.title}
                        className="w-full h-full border-0"
                        style={{ minHeight: '180px', width: '100%', height: '100%' }}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen"
                        allowFullScreen
                        referrerPolicy="no-referrer-when-downgrade"
                        loading="lazy"
                      />
                    ) : (
                      <video
                        src={video.videoUrl}
                        controls
                        controlsList="nodownload"
                        preload="metadata"
                        poster={video.thumbnailUrl || '/images/cinelab-cover.jpg'}
                        className="w-full h-full object-contain bg-black"
                      />
                    )}

                    <div className="absolute top-2.5 right-2.5 pointer-events-none flex items-center gap-1.5">
                      {isYt && (
                        <span className="px-2 py-0.5 rounded bg-red-950/80 backdrop-blur-md border border-red-700 text-[10px] font-mono text-red-300 font-bold flex items-center gap-1">
                          <Youtube className="w-3 h-3 text-red-400" />
                          YouTube
                        </span>
                      )}
                      <span className="px-2 py-0.5 rounded bg-black/70 backdrop-blur-md border border-neutral-700 text-[10px] font-mono text-amber-300 font-bold flex items-center gap-1">
                        <Clock className="w-3 h-3 text-amber-400" />
                        {timecodeLabel}
                      </span>
                      <span className="px-2 py-0.5 rounded bg-black/70 backdrop-blur-md border border-neutral-700 text-[10px] font-mono text-amber-300 font-bold">
                        1080p
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className="aspect-video rounded-2xl bg-neutral-950/80 border-2 border-dashed border-neutral-800 flex flex-col items-center justify-center p-6 text-center space-y-3">
                    <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
                      <Video className="w-6 h-6 text-amber-400/80" />
                    </div>
                    <div>
                      <h4 className="text-xs sm:text-sm font-bold text-white">
                        {tUi.emptySlotTitle(slot)}
                      </h4>
                      <p className="text-[11px] text-neutral-400 max-w-sm mx-auto mt-0.5">
                        {isAdmin ? tUi.emptySlotAdminDesc : tUi.emptySlotStudentDesc}
                      </p>
                    </div>

                    {isAdmin && (
                      <div className="flex flex-wrap items-center justify-center gap-2 pt-1">
                        <label className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-neutral-950 text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 shadow">
                          <Upload className="w-3.5 h-3.5" />
                          <span>{tUi.uploadFileBtn}</span>
                          <input
                            type="file"
                            accept="video/mp4,video/webm,video/mov,video/*"
                            disabled={isUploading}
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) handleUploadFile(slot, file);
                            }}
                            className="hidden"
                          />
                        </label>

                        <button
                          type="button"
                          onClick={() => handleOpenYoutubeModal(video)}
                          className="px-3.5 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 shadow"
                        >
                          <Youtube className="w-3.5 h-3.5" />
                          <span>{tUi.uploadYoutubeBtn}</span>
                        </button>
                      </div>
                    )}
                  </div>
                )}

                {/* ========================================================================= */}
                {/* ORIENTAÇÃO DO PROFESSOR TONY DE LUC (EXIBIÇÃO & EDIÇÃO DIRETA / INLINE) */}
                {/* ========================================================================= */}
                {isNotesEditing ? (
                  <div className="p-4 rounded-2xl bg-neutral-900 border-2 border-amber-500/60 space-y-3 animate-fadeIn shadow-2xl">
                    <div className="flex items-center justify-between border-b border-neutral-800 pb-2">
                      <strong className="font-mono text-xs text-amber-300 uppercase tracking-wider flex items-center gap-2">
                        <FileEdit className="w-4 h-4 text-amber-400" />
                        Escrever {tUi.professorNotesTitle}
                      </strong>
                      <button
                        type="button"
                        onClick={() => setEditingNotesSlot(null)}
                        className="text-neutral-400 hover:text-white transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>

                    <div>
                      <textarea
                        value={notesText}
                        onChange={(e) => setNotesText(e.target.value)}
                        rows={3}
                        placeholder={tUi.notesPlaceholder}
                        className="w-full p-3 bg-neutral-950 border border-neutral-700 focus:border-amber-500 rounded-xl text-xs text-white placeholder-neutral-500 focus:outline-none font-sans leading-relaxed"
                        autoFocus
                      />
                      <span className="text-[10px] text-neutral-400 font-mono mt-1 block">
                        {tUi.notesHelpText}
                      </span>
                    </div>

                    <div className="flex items-center justify-end gap-2 pt-1 border-t border-neutral-800">
                      <button
                        type="button"
                        onClick={() => setEditingNotesSlot(null)}
                        disabled={isSavingNotes}
                        className="px-3.5 py-1.5 bg-neutral-800 hover:bg-neutral-700 text-neutral-300 rounded-xl text-xs font-bold transition-colors cursor-pointer"
                      >
                        {tUi.cancelBtn}
                      </button>
                      <button
                        type="button"
                        onClick={() => handleSaveProfessorNotesDirect(slot)}
                        disabled={isSavingNotes}
                        className="px-4 py-1.5 bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold rounded-xl text-xs transition-all cursor-pointer flex items-center gap-1.5 shadow"
                      >
                        {isSavingNotes ? (
                          <>
                            <Loader2 className="w-3.5 h-3.5 animate-spin" />
                            <span>{tUi.savingBtn}</span>
                          </>
                        ) : (
                          <>
                            <Check className="w-3.5 h-3.5" />
                            <span>{tUi.saveNotesBtn}</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="p-3.5 rounded-2xl bg-amber-950/25 border border-amber-500/30 text-xs text-amber-200/90 leading-relaxed font-sans relative group">
                    <div className="flex items-center justify-between gap-2 mb-1.5">
                      <strong className="font-mono text-[10.5px] sm:text-xs text-amber-400 uppercase tracking-wider flex items-center gap-1.5 font-bold">
                        <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                        {tUi.professorNotesTitle}
                      </strong>

                      {/* Botão de Trocar e Escrever para o Administrador */}
                      {isAdmin && (
                        <button
                          type="button"
                          onClick={() => {
                            setEditingNotesSlot(slot);
                            setNotesText(video.professorNotes || '');
                          }}
                          className="px-2.5 py-1 rounded-lg bg-amber-500/20 hover:bg-amber-500/40 text-amber-300 border border-amber-500/40 text-[10px] font-mono font-bold flex items-center gap-1.5 transition-all cursor-pointer shadow-sm active:scale-95"
                          title="Clique para trocar ou escrever a Orientação do Professor Tony de Luc"
                        >
                          <Edit3 className="w-3 h-3 text-amber-400" />
                          <span>Trocar / Escrever Texto</span>
                        </button>
                      )}
                    </div>

                    <p className="whitespace-pre-line text-neutral-200 text-xs leading-relaxed">
                      {video.professorNotes || (
                        <span className="italic text-neutral-400">
                          {isAdmin
                            ? 'Nenhuma orientação cadastrada ainda. Clique no botão "Trocar / Escrever Texto" acima para escrever as orientações para os alunos.'
                            : 'Assista a esta aula complementar e aplique os conceitos em seu projeto cinematográfico.'}
                        </span>
                      )}
                    </p>
                  </div>
                )}
              </div>

              {/* PAINEL DEDICADO DO YOUTUBE (COM HORA, MINUTOS E SEGUNDOS + ORIENTAÇÃO DO PROFESSOR) */}
              {isYoutubeActive && (
                <div className="p-4 sm:p-5 rounded-2xl bg-neutral-900 border-2 border-red-500/50 space-y-3.5 animate-fadeIn shadow-2xl">
                  <div className="flex items-center justify-between border-b border-neutral-800 pb-2.5">
                    <span className="text-xs font-bold text-white font-mono flex items-center gap-2">
                      <div className="w-6 h-6 rounded-lg bg-red-600 flex items-center justify-center text-white">
                        <Youtube className="w-3.5 h-3.5" />
                      </div>
                      Vincular Vídeo do YouTube • Local 0{slot}
                    </span>
                    <button
                      type="button"
                      onClick={() => setYoutubeSlot(null)}
                      className="text-neutral-400 hover:text-white transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <label className="block text-[11px] text-neutral-300 mb-1 font-mono font-bold flex items-center justify-between">
                        <span>Cole a URL ou Link do Vídeo no YouTube:</span>
                        <span className="text-[10px] text-red-400 font-normal">Obrigatório</span>
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          value={ytUrl}
                          onChange={(e) => setYtUrl(e.target.value)}
                          placeholder="https://www.youtube.com/watch?v=... ou https://youtu.be/..."
                          className="w-full px-3.5 py-2.5 bg-neutral-950 border border-neutral-700 focus:border-red-500 rounded-xl text-xs text-white placeholder-neutral-500 focus:outline-none font-mono"
                          autoFocus
                        />
                        {detectedModalYtId && (
                          <div className="absolute right-2.5 top-2.5 px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-700 text-[10px] font-mono font-bold flex items-center gap-1">
                            <Check className="w-3 h-3" />
                            ID: {detectedModalYtId}
                          </div>
                        )}
                      </div>
                      <p className="text-[10px] text-neutral-400 mt-1 font-mono">
                        Suporta links padrão (watch?v=), links curtos (youtu.be/), Shorts e Embeds.
                      </p>
                    </div>

                    {/* Preview Instantâneo do YouTube se URL for válida */}
                    {detectedModalYtId && (
                      <div className="p-3 rounded-xl bg-neutral-950 border border-neutral-800 flex items-center gap-3">
                        <img
                          src={`https://img.youtube.com/vi/${detectedModalYtId}/hqdefault.jpg`}
                          alt="Thumbnail YouTube"
                          className="w-24 h-14 object-cover rounded-lg border border-neutral-700 shrink-0"
                        />
                        <div className="min-w-0 flex-1">
                          <span className="text-[10px] font-mono text-emerald-400 font-bold flex items-center gap-1">
                            <CheckCircle2 className="w-3 h-3" /> Vídeo do YouTube Detectado
                          </span>
                          <p className="text-xs text-white font-bold truncate mt-0.5">
                            {ytTitle || `Vídeo Extra 0${slot}`}
                          </p>
                          <a
                            href={`https://www.youtube.com/watch?v=${detectedModalYtId}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[10px] text-red-400 hover:underline flex items-center gap-1 mt-0.5"
                          >
                            Abrir no YouTube para testar <ExternalLink className="w-2.5 h-2.5" />
                          </a>
                        </div>
                      </div>
                    )}

                    <div>
                      <label className="block text-[11px] text-neutral-400 mb-1 font-mono">
                        Título do Vídeo Extra:
                      </label>
                      <input
                        type="text"
                        value={ytTitle}
                        onChange={(e) => setYtTitle(e.target.value)}
                        placeholder="Ex: Análise Prática de Cena"
                        className="w-full px-3 py-2 bg-neutral-950 border border-neutral-700 focus:border-red-500 rounded-lg text-xs text-white focus:outline-none"
                      />
                    </div>

                    {/* SELETOR PRECISO DE HORA, MINUTOS E SEGUNDOS */}
                    <div className="p-3 rounded-xl bg-neutral-950 border border-neutral-800 space-y-2">
                      <div className="flex items-center justify-between">
                        <label className="text-[11px] text-neutral-300 font-mono font-bold flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5 text-amber-400" />
                          <span>Duração do Vídeo (Hora, Minutos e Segundos):</span>
                        </label>
                        <span className="text-[11px] font-mono font-bold text-amber-300 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/30">
                          {formatHms(ytHours, ytMinutes, ytSeconds)}
                        </span>
                      </div>

                      <div className="grid grid-cols-3 gap-2 text-center">
                        <div>
                          <label className="block text-[10px] text-neutral-400 font-mono mb-1">
                            Horas (h)
                          </label>
                          <input
                            type="number"
                            min="0"
                            max="23"
                            value={ytHours}
                            onChange={(e) => setYtHours(Math.max(0, parseInt(e.target.value) || 0))}
                            placeholder="00"
                            className="w-full px-2 py-1.5 bg-neutral-900 border border-neutral-700 focus:border-red-500 rounded-lg text-xs text-white font-mono text-center focus:outline-none"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] text-neutral-400 font-mono mb-1">
                            Minutos (m)
                          </label>
                          <input
                            type="number"
                            min="0"
                            max="59"
                            value={ytMinutes}
                            onChange={(e) => setYtMinutes(Math.max(0, Math.min(59, parseInt(e.target.value) || 0)))}
                            placeholder="18"
                            className="w-full px-2 py-1.5 bg-neutral-900 border border-neutral-700 focus:border-red-500 rounded-lg text-xs text-white font-mono text-center focus:outline-none"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] text-neutral-400 font-mono mb-1">
                            Segundos (s)
                          </label>
                          <input
                            type="number"
                            min="0"
                            max="59"
                            value={ytSeconds}
                            onChange={(e) => setYtSeconds(Math.max(0, Math.min(59, parseInt(e.target.value) || 0)))}
                            placeholder="00"
                            className="w-full px-2 py-1.5 bg-neutral-900 border border-neutral-700 focus:border-red-500 rounded-lg text-xs text-white font-mono text-center focus:outline-none"
                          />
                        </div>
                      </div>

                      {/* Atalhos rápidos de duração */}
                      <div className="flex items-center gap-1.5 pt-1 flex-wrap">
                        <span className="text-[10px] text-neutral-500 font-mono">Atalhos:</span>
                        {[
                          { l: '10m 00s', h: 0, m: 10, s: 0 },
                          { l: '18m 00s', h: 0, m: 18, s: 0 },
                          { l: '24m 30s', h: 0, m: 24, s: 30 },
                          { l: '45m 00s', h: 0, m: 45, s: 0 },
                          { l: '01h 15m 00s', h: 1, m: 15, s: 0 },
                        ].map((btn) => (
                          <button
                            key={btn.l}
                            type="button"
                            onClick={() => {
                              setYtHours(btn.h);
                              setYtMinutes(btn.m);
                              setYtSeconds(btn.s);
                            }}
                            className="px-2 py-0.5 rounded bg-neutral-800 hover:bg-neutral-700 text-neutral-300 text-[10px] font-mono transition-colors cursor-pointer"
                          >
                            {btn.l}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] text-neutral-400 mb-1 font-mono">
                        Descrição / O que os alunos devem observar:
                      </label>
                      <textarea
                        value={ytDescription}
                        onChange={(e) => setYtDescription(e.target.value)}
                        rows={2}
                        placeholder="Orientações gerais de estudo cinematográfico para esta videoaula..."
                        className="w-full px-3 py-2 bg-neutral-950 border border-neutral-700 focus:border-red-500 rounded-lg text-xs text-white focus:outline-none"
                      />
                    </div>

                    {/* CAMPO DE ORIENTAÇÃO DO PROFESSOR TONY DE LUC NO MODAL YOUTUBE */}
                    <div className="p-3 rounded-xl bg-neutral-950 border border-amber-500/30 space-y-1.5">
                      <label className="block text-[11px] text-amber-300 font-mono font-bold flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                        Orientação do Professor Tony de Luc (Escreva e Altere Aqui):
                      </label>
                      <textarea
                        value={ytProfessorNotes}
                        onChange={(e) => setYtProfessorNotes(e.target.value)}
                        rows={2}
                        placeholder="Orientações práticas e dicas do Professor Tony de Luc para este vídeo..."
                        className="w-full px-3 py-2 bg-neutral-900 border border-neutral-700 focus:border-amber-500 rounded-lg text-xs text-white focus:outline-none"
                      />
                    </div>

                    <div className="flex items-center justify-end gap-2 pt-2 border-t border-neutral-800">
                      <button
                        type="button"
                        onClick={() => setYoutubeSlot(null)}
                        disabled={isSavingYoutube}
                        className="px-3.5 py-2 bg-neutral-800 hover:bg-neutral-700 text-neutral-300 rounded-xl text-xs font-bold transition-colors cursor-pointer"
                      >
                        Cancelar
                      </button>
                      <button
                        type="button"
                        onClick={() => handleSaveYoutubeVideo(slot)}
                        disabled={isSavingYoutube || !detectedModalYtId}
                        className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 shadow ${
                          isSavingYoutube || !detectedModalYtId
                            ? 'bg-neutral-800 text-neutral-500 cursor-not-allowed'
                            : 'bg-red-600 hover:bg-red-500 text-white active:scale-95'
                        }`}
                      >
                        {isSavingYoutube ? (
                          <>
                            <Loader2 className="w-3.5 h-3.5 animate-spin" />
                            <span>Salvando...</span>
                          </>
                        ) : (
                          <>
                            <Youtube className="w-3.5 h-3.5" />
                            <span>Salvar Vídeo do YouTube</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Formulário Inline de Edição Geral (COM HORA, MINUTOS E SEGUNDOS + ORIENTAÇÃO DO PROFESSOR) */}
              {isEditing && (
                <div className="p-4 sm:p-5 rounded-2xl bg-neutral-900 border border-neutral-700 space-y-3 pt-3">
                  <div className="flex items-center justify-between border-b border-neutral-800 pb-2">
                    <span className="text-xs font-bold text-white font-mono flex items-center gap-1.5">
                      <Edit3 className="w-3.5 h-3.5 text-amber-400" />
                      Editar Informações &amp; Duração do Local 0{slot}
                    </span>
                    <button
                      type="button"
                      onClick={() => setEditingSlot(null)}
                      className="text-neutral-400 hover:text-white transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="space-y-2.5">
                    <div>
                      <label className="block text-[11px] text-neutral-400 mb-0.5 font-mono">
                        Título do Vídeo Extra:
                      </label>
                      <input
                        type="text"
                        value={formTitle}
                        onChange={(e) => setFormTitle(e.target.value)}
                        placeholder="Ex: Análise Dirigida da Cena Clássica"
                        className="w-full px-3 py-1.5 bg-neutral-950 border border-neutral-700 rounded-lg text-xs text-white focus:border-amber-500 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] text-neutral-400 mb-0.5 font-mono">
                        Descrição Pedagógica / O que observar:
                      </label>
                      <textarea
                        value={formDescription}
                        onChange={(e) => setFormDescription(e.target.value)}
                        rows={2}
                        placeholder="Orientações gerais de estudo para os alunos..."
                        className="w-full px-3 py-1.5 bg-neutral-950 border border-neutral-700 rounded-lg text-xs text-white focus:border-amber-500 focus:outline-none"
                      />
                    </div>

                    {/* CAMPO DE ORIENTAÇÃO DO PROFESSOR TONY DE LUC NO FORMULÁRIO GERAL */}
                    <div className="p-3 rounded-xl bg-neutral-950 border border-amber-500/30 space-y-1.5">
                      <label className="block text-[11px] text-amber-300 font-mono font-bold flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                        Orientação do Professor Tony de Luc (Escreva e Altere Aqui):
                      </label>
                      <textarea
                        value={formProfessorNotes}
                        onChange={(e) => setFormProfessorNotes(e.target.value)}
                        rows={3}
                        placeholder="Escreva as instruções, análise de planos ou dicas específicas do Professor Tony de Luc..."
                        className="w-full px-3 py-2 bg-neutral-900 border border-neutral-700 focus:border-amber-500 rounded-lg text-xs text-white focus:outline-none leading-relaxed"
                      />
                      <span className="text-[10px] text-neutral-500 font-mono block">
                        Este texto é exibido em destaque no card do vídeo para orientação dos alunos.
                      </span>
                    </div>

                    <div>
                      <label className="block text-[11px] text-neutral-400 mb-0.5 font-mono">
                        Link Externo ou YouTube:
                      </label>
                      <input
                        type="text"
                        value={formVideoUrl}
                        onChange={(e) => setFormVideoUrl(e.target.value)}
                        placeholder="https://youtu.be/... ou /uploads/..."
                        className="w-full px-3 py-1.5 bg-neutral-950 border border-neutral-700 rounded-lg text-xs text-white focus:border-amber-500 focus:outline-none"
                      />
                    </div>

                    {/* SELETOR PRECISO DE HORA, MINUTOS E SEGUNDOS NA EDIÇÃO GERAL */}
                    <div className="p-3 rounded-xl bg-neutral-950 border border-neutral-800 space-y-2">
                      <div className="flex items-center justify-between">
                        <label className="text-[11px] text-neutral-300 font-mono font-bold flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5 text-amber-400" />
                          <span>Duração do Vídeo (Hora, Minutos e Segundos):</span>
                        </label>
                        <span className="text-[11px] font-mono font-bold text-amber-300 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/30">
                          {formatHms(formHours, formMinutes, formSeconds)}
                        </span>
                      </div>

                      <div className="grid grid-cols-3 gap-2 text-center">
                        <div>
                          <label className="block text-[10px] text-neutral-400 font-mono mb-1">
                            Horas (h)
                          </label>
                          <input
                            type="number"
                            min="0"
                            max="23"
                            value={formHours}
                            onChange={(e) => setFormHours(Math.max(0, parseInt(e.target.value) || 0))}
                            placeholder="00"
                            className="w-full px-2 py-1.5 bg-neutral-900 border border-neutral-700 focus:border-amber-500 rounded-lg text-xs text-white font-mono text-center focus:outline-none"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] text-neutral-400 font-mono mb-1">
                            Minutos (m)
                          </label>
                          <input
                            type="number"
                            min="0"
                            max="59"
                            value={formMinutes}
                            onChange={(e) => setFormMinutes(Math.max(0, Math.min(59, parseInt(e.target.value) || 0)))}
                            placeholder="18"
                            className="w-full px-2 py-1.5 bg-neutral-900 border border-neutral-700 focus:border-amber-500 rounded-lg text-xs text-white font-mono text-center focus:outline-none"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] text-neutral-400 font-mono mb-1">
                            Segundos (s)
                          </label>
                          <input
                            type="number"
                            min="0"
                            max="59"
                            value={formSeconds}
                            onChange={(e) => setFormSeconds(Math.max(0, Math.min(59, parseInt(e.target.value) || 0)))}
                            placeholder="00"
                            className="w-full px-2 py-1.5 bg-neutral-900 border border-neutral-700 focus:border-amber-500 rounded-lg text-xs text-white font-mono text-center focus:outline-none"
                          />
                        </div>
                      </div>

                      {/* Atalhos rápidos de duração */}
                      <div className="flex items-center gap-1.5 pt-1 flex-wrap">
                        <span className="text-[10px] text-neutral-500 font-mono">Atalhos:</span>
                        {[
                          { l: '10m 00s', h: 0, m: 10, s: 0 },
                          { l: '18m 00s', h: 0, m: 18, s: 0 },
                          { l: '24m 30s', h: 0, m: 24, s: 30 },
                          { l: '45m 00s', h: 0, m: 45, s: 0 },
                          { l: '01h 15m 00s', h: 1, m: 15, s: 0 },
                        ].map((btn) => (
                          <button
                            key={btn.l}
                            type="button"
                            onClick={() => {
                              setFormHours(btn.h);
                              setFormMinutes(btn.m);
                              setFormSeconds(btn.s);
                            }}
                            className="px-2 py-0.5 rounded bg-neutral-800 hover:bg-neutral-700 text-neutral-300 text-[10px] font-mono transition-colors cursor-pointer"
                          >
                            {btn.l}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center justify-end gap-2 pt-2">
                      <button
                        type="button"
                        onClick={() => setEditingSlot(null)}
                        className="px-3 py-1.5 bg-neutral-800 hover:bg-neutral-700 text-neutral-300 rounded-lg text-xs font-bold transition-colors cursor-pointer"
                      >
                        Cancelar
                      </button>
                      <button
                        type="button"
                        onClick={() => handleSaveMeta(slot)}
                        className="px-4 py-1.5 bg-amber-500 hover:bg-amber-400 text-neutral-950 rounded-lg text-xs font-bold transition-colors cursor-pointer flex items-center gap-1 shadow"
                      >
                        <Check className="w-3.5 h-3.5" />
                        Salvar Informações &amp; Duração
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Barra de Progresso de Upload de Arquivo */}
              {isUploading && (
                <div className="space-y-1.5 p-3 rounded-xl bg-neutral-950 border border-neutral-800">
                  <div className="flex items-center justify-between text-xs font-mono text-amber-300">
                    <span className="flex items-center gap-1.5">
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      Subindo arquivo de vídeo para Local 0{slot}...
                    </span>
                    <span className="font-bold">{uploadProgress}%</span>
                  </div>
                  <div className="w-full h-2 bg-neutral-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-amber-500 to-yellow-300 transition-all duration-300"
                      style={{ width: `${uploadProgress}%` }}
                    />
                  </div>
                </div>
              )}

              {/* Botões de Ação para o Usuário / Admin */}
              <div className="pt-2 border-t border-neutral-800 flex flex-wrap items-center gap-2 justify-between">
                {isAdmin ? (
                  <>
                    {/* Botão de Upload de Arquivo MP4 */}
                    <label
                      className={`flex-1 min-w-[130px] py-2.5 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow ${
                        isUploading
                          ? 'bg-neutral-800 text-neutral-500 cursor-not-allowed'
                          : 'bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-neutral-950 active:scale-95'
                      }`}
                    >
                      <Upload className="w-3.5 h-3.5" />
                      <span>{hasVideo && !isYt ? 'Substituir Arquivo' : 'Subir Arquivo (MP4)'}</span>
                      <input
                        type="file"
                        accept="video/mp4,video/webm,video/mov,video/quicktime,video/*"
                        disabled={isUploading}
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) handleUploadFile(slot, file);
                        }}
                        className="hidden"
                      />
                    </label>

                    {/* Botão Destaque do YouTube */}
                    <button
                      type="button"
                      onClick={() => handleOpenYoutubeModal(video)}
                      disabled={isUploading}
                      className="py-2.5 px-3 rounded-xl text-xs font-bold bg-red-600 hover:bg-red-500 text-white transition-all cursor-pointer flex items-center gap-1.5 shadow"
                      title="Subir ou vincular vídeo pelo YouTube e definir Horas, Minutos e Segundos"
                    >
                      <Youtube className="w-3.5 h-3.5" />
                      <span>{isYt ? 'Editar YouTube' : 'Subir p/ YouTube'}</span>
                    </button>

                    {/* Botão Editar Dados & Duração */}
                    <button
                      type="button"
                      onClick={() => handleStartEdit(video)}
                      disabled={isUploading}
                      className="py-2.5 px-3 rounded-xl text-xs font-bold bg-neutral-800 hover:bg-neutral-700 text-neutral-300 border border-neutral-700 hover:border-amber-500/50 transition-all cursor-pointer flex items-center gap-1.5"
                      title="Editar título, descrição, orientação do professor e duração"
                    >
                      <Edit3 className="w-3.5 h-3.5 text-amber-400" />
                      <span>Editar</span>
                    </button>

                    {/* Link Externo se for YouTube */}
                    {isYt && ytVideoId && (
                      <a
                        href={`https://www.youtube.com/watch?v=${ytVideoId}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="py-2.5 px-2.5 rounded-xl text-xs font-bold bg-neutral-900 hover:bg-neutral-800 text-red-400 border border-neutral-800 transition-all cursor-pointer flex items-center gap-1"
                        title="Ver diretamente no YouTube"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    )}

                    {/* Botão Remover */}
                    {hasVideo && (
                      <button
                        type="button"
                        onClick={() => handleDeleteVideo(slot)}
                        disabled={isUploading}
                        className="py-2.5 px-2.5 rounded-xl text-xs font-bold bg-neutral-900 hover:bg-red-950/60 text-red-400 border border-neutral-800 hover:border-red-500/50 transition-all cursor-pointer flex items-center gap-1.5"
                        title="Remover vídeo deste local"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </>
                ) : (
                  <div className="w-full flex items-center justify-between text-xs font-mono text-neutral-400 flex-wrap gap-2">
                    <span className="flex items-center gap-1 text-amber-400 font-semibold">
                      <Sparkles className="w-3.5 h-3.5" />
                      Estudo Dirigido CINELAB
                    </span>
                    <div className="flex items-center gap-2">
                      {isYt && (
                        <span className="text-red-400 flex items-center gap-1 font-bold">
                          <Youtube className="w-3.5 h-3.5" /> YouTube
                        </span>
                      )}
                      <span className="text-amber-300 font-mono font-bold flex items-center gap-1">
                        <Timer className="w-3 h-3 text-amber-400" />
                        {durationHmsLabel}
                      </span>
                      <span>• HD 1080p</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
