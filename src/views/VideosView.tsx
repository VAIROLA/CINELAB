import React, { useEffect, useState } from 'react';
import { api } from '../services/api.js';
import { VideoLesson } from '../types/index.js';
import {
  Film,
  PlayCircle,
  Lock,
  Unlock,
  Clock,
  User as UserIcon,
  CheckCircle2,
  Sparkles,
  Upload,
  Loader2,
  ExternalLink,
  Image as ImageIcon,
  Subtitles,
  Headphones,
  Volume2,
  BookOpen,
} from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext.js';
import { parseVideoEmbed } from '../utils/videoUtils.js';
import { MASTERCLASS_STAGE_TRANSLATIONS } from '../i18n/masterclassTranslations.js';

interface VideosViewProps {
  isLoggedIn: boolean;
  isAdmin?: boolean;
  onNavigate: (route: string) => void;
}

export const VideosView: React.FC<VideosViewProps> = ({
  isLoggedIn,
  isAdmin,
  onNavigate,
}) => {
  const { language, getModuleTranslation } = useLanguage();
  const [videoSubLang, setVideoSubLang] = useState<'pt' | 'en' | 'es' | 'fr'>(language);
  useEffect(() => { setVideoSubLang(language); }, [language]);
  const [videos, setVideos] = useState<(VideoLesson & { isUnlocked: boolean; unlockDate: string })[]>([]);
  const [activeVideo, setActiveVideo] = useState<(VideoLesson & { isUnlocked: boolean; unlockDate: string }) | null>(null);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadingCover, setUploadingCover] = useState(false);
  const [uploadCoverProgress, setUploadCoverProgress] = useState(0);
  const [uploadMessage, setUploadMessage] = useState<string | null>(null);

  const i18nDict = {
    pt: {
      badge: 'Masterclasses Exclusivas',
      title: 'Vídeos & Aulas do Curso',
      subtitle: 'Apresentações técnicas de cada etapa ministradas pelo diretor e Professor Cineasta Tony de Luc, conectando a teoria da apostila à rotina de set.',
      accessNotice: 'As masterclasses em vídeo das 10 etapas são de acesso exclusivo para alunos matriculados.',
      videoLocked: 'Vídeo Bloqueado pelo Cronograma',
      visitorLockedTitle: 'Conteúdo Exclusivo para Alunos',
      visitorLockedDesc: 'As masterclasses em vídeo das 10 etapas do curso estão disponíveis exclusivamente para alunos matriculados.',
      enrollCta: 'Matricular-se para Acessar',
      willUnlock: (num: number, date: string) => `Este vídeo será liberado no desbloqueio da Etapa 0${num} em ${date}.`,
      stageLabel: (num: number) => `ETAPA 0${num}`,
      minutes: 'minutos',
      unlocked: 'LIBERADO',
      locked: 'BLOQUEADO',
      profNotesTitle: 'Notas do Professor Cineasta Tony de Luc:',
      adminUploadTitle: 'Subir Novo Vídeo para esta Etapa do Computador',
      adminUploadDesc: 'Você pode trocar o vídeo desta aula enviando um arquivo MP4/WebM diretamente do seu computador.',
      adminChooseFile: 'Escolher Arquivo do PC',
      adminUploading: 'Subindo',
      uploadSuccess: (name: string) => `Vídeo subido com sucesso! (${name})`,
      playlistTitle: 'Grade de Vídeos (10 Módulos)',
      available: '✓ Disponível',
      noHtml5: 'Seu navegador não suporta reprodução de vídeo HTML5.',
      selectValidVideo: 'Por favor, selecione um arquivo de vídeo válido (MP4, WebM, MOV, MKV, AVI).',
      uploadError: 'Erro no upload:',
    },
    en: {
      badge: 'Exclusive Masterclasses',
      title: 'Course Videos & Masterclasses',
      subtitle: 'Technical filmmaking lectures for each stage taught by director Tony de Luc, connecting handout theory to professional on-set reality.',
      accessNotice: 'Masterclass videos across all 10 stages are exclusive to enrolled students.',
      videoLocked: 'Video Locked by Pedagogical Schedule',
      visitorLockedTitle: 'Exclusive Content for Enrolled Students',
      visitorLockedDesc: 'Masterclass videos for all 10 stages of the course are available exclusively to enrolled students.',
      enrollCta: 'Enroll Now to Access',
      willUnlock: (num: number, date: string) => `This video will unlock with Stage 0${num} on ${date}.`,
      stageLabel: (num: number) => `STAGE 0${num}`,
      minutes: 'minutes',
      unlocked: 'UNLOCKED',
      locked: 'LOCKED',
      profNotesTitle: 'Filmmaker Professor Tony de Luc Notes:',
      adminUploadTitle: 'Upload New Video for this Stage from Computer',
      adminUploadDesc: 'Replace the video for this lecture by uploading an MP4/WebM file directly from your computer.',
      adminChooseFile: 'Choose File from PC',
      adminUploading: 'Uploading',
      uploadSuccess: (name: string) => `Video successfully uploaded! (${name})`,
      playlistTitle: 'Video Schedule (10 Modules)',
      available: '✓ Available',
      noHtml5: 'Your browser does not support HTML5 video playback.',
      selectValidVideo: 'Please select a valid video file (MP4, WebM, MOV, MKV, AVI).',
      uploadError: 'Upload error:',
    },
    es: {
      badge: 'Masterclasses Exclusivas',
      title: 'Videos y Clases del Curso',
      subtitle: 'Presentaciones técnicas de cada etapa impartidas por el director Tony de Luc, conectando la teoría del manual a la práctica de rodaje.',
      accessNotice: 'Las clases magistrales en video de las 10 etapas son de acceso exclusivo para alumnos matriculados.',
      videoLocked: 'Video Bloqueado por el Cronograma',
      visitorLockedTitle: 'Contenido Exclusivo para Alumnos',
      visitorLockedDesc: 'Las clases magistrales en video de las 10 etapas del curso están disponibles exclusivamente para alumnos matriculados.',
      enrollCta: 'Matricularse para Acceder',
      willUnlock: (num: number, date: string) => `Este video estará disponible al desbloquear la Etapa 0${num} el ${date}.`,
      stageLabel: (num: number) => `ETAPA 0${num}`,
      minutes: 'minutos',
      unlocked: 'LIBERADO',
      locked: 'BLOQUEADO',
      profNotesTitle: 'Notas del Director Tony de Luc:',
      adminUploadTitle: 'Subir Nuevo Video para esta Etapa desde la Computadora',
      adminUploadDesc: 'Puedes cambiar el video de esta clase enviando un archivo MP4/WebM directamente desde tu equipo.',
      adminChooseFile: 'Elegir Archivo de la PC',
      adminUploading: 'Subiendo',
      uploadSuccess: (name: string) => `¡Video subido con éxito! (${name})`,
      playlistTitle: 'Programa de Videos (10 Módulos)',
      available: '✓ Disponible',
      noHtml5: 'Tu navegador no soporta reproducción de video HTML5.',
      selectValidVideo: 'Por favor, selecciona un archivo de video válido (MP4, WebM, MOV, MKV, AVI).',
      uploadError: 'Error al subir:',
    },
    fr: {
      badge: 'Masterclasses Exclusives',
      title: 'Vidéos & Cours de la Formation',
      subtitle: 'Présentations techniques de chaque étape dispensées par le réalisateur Tony de Luc, reliant la théorie du fascicule à la réalité du plateau.',
      accessNotice: 'Les masterclasses vidéo des 10 étapes sont réservées exclusivement aux étudiants inscrits.',
      videoLocked: 'Vidéo Bloquée par le Calendrier Pédagogique',
      visitorLockedTitle: 'Contenu Exclusif pour les Étudiants',
      visitorLockedDesc: 'Les masterclasses vidéo des 10 étapes de la formation sont accessibles exclusivement aux étudiants inscrits.',
      enrollCta: "S'inscrire pour Accéder",
      willUnlock: (num: number, date: string) => `Cette vidéo sera débloquée avec l'Étape 0${num} le ${date}.`,
      stageLabel: (num: number) => `ÉTAPE 0${num}`,
      minutes: 'minutes',
      unlocked: 'DÉBLOQUÉ',
      locked: 'BLOQUÉ',
      profNotesTitle: 'Notes du Réalisateur Tony de Luc :',
      adminUploadTitle: 'Téléverser une Nouvelle Vidéo pour cette Étape depuis le PC',
      adminUploadDesc: 'Vous pouvez remplacer la vidéo de ce cours en téléversant un fichier MP4/WebM depuis votre ordinateur.',
      adminChooseFile: 'Choisir le Fichier du PC',
      adminUploading: 'Téléversement',
      uploadSuccess: (name: string) => `Vidéo téléversée avec succès ! (${name})`,
      playlistTitle: 'Programme Vidéo (10 Modules)',
      available: '✓ Disponible',
      noHtml5: 'Votre navigateur ne prend pas en charge la lecture vidéo HTML5.',
      selectValidVideo: 'Veuillez sélectionner un fichier vidéo valide (MP4, WebM, MOV, MKV, AVI).',
      uploadError: 'Erreur de téléversement :',
    },
  };

  const cur = i18nDict[language] || i18nDict.pt;

  useEffect(() => {
    loadVideos();
  }, [isLoggedIn]);

  const handleUploadActiveVideo = async (file: File) => {
    if (!file || !activeVideo) return;
    const isVideo = file.type.startsWith('video/') || /\.(mp4|webm|mov|mkv|avi|m4v)$/i.test(file.name);
    if (!isVideo) {
      alert(cur.selectValidVideo);
      return;
    }

    try {
      setUploading(true);
      setUploadProgress(0);
      setUploadMessage(null);

      const result = await api.uploadVideoFile(file, {
        moduleId: activeVideo.moduleId,
        title: activeVideo.title,
        description: activeVideo.description,
        onProgress: (percent) => setUploadProgress(percent),
      });

      setUploadMessage(cur.uploadSuccess(file.name));
      setTimeout(() => setUploadMessage(null), 5000);

      // Refresh videos
      await loadVideos();
      setActiveVideo((prev) => (prev ? { ...prev, videoUrl: result.fileUrl } : null));
    } catch (err: any) {
      console.error(err);
      alert(cur.uploadError + ' ' + (err.message || 'Upload error'));
    } finally {
      setUploading(false);
      setUploadProgress(0);
    }
  };

  const handleUploadActiveCover = async (file: File) => {
    if (!file || !activeVideo) return;
    const isImage = file.type.startsWith('image/') || /\.(jpe?g|png|webp|svg|gif|avif|bmp)$/i.test(file.name);
    if (!isImage) {
      alert('Por favor, selecione um arquivo de imagem válido (JPG, PNG, WebP).');
      return;
    }

    try {
      setUploadingCover(true);
      setUploadCoverProgress(0);
      setUploadMessage(null);

      const res = await api.uploadImageFile(file, (pct) => setUploadCoverProgress(pct));
      if (res && res.fileUrl) {
        await api.updateAdminVideo(activeVideo.id, {
          thumbnailUrl: res.fileUrl,
        });
        setActiveVideo((prev) => (prev ? { ...prev, thumbnailUrl: res.fileUrl } : null));
        setUploadMessage(`Capa da aula da Etapa 0${activeVideo.moduleId} atualizada com sucesso!`);
        setTimeout(() => setUploadMessage(null), 5000);
        await loadVideos();
      }
    } catch (err: any) {
      console.error(err);
      alert('Erro ao subir imagem de capa: ' + (err.message || 'Erro no upload'));
    } finally {
      setUploadingCover(false);
      setUploadCoverProgress(0);
    }
  };

  const loadVideos = async () => {
    try {
      setLoading(true);
      if (isLoggedIn) {
        const data = await api.getStudentVideos();
        setVideos(data);
        const firstUnlocked = data.find((v) => v.isUnlocked) || data[0];
        setActiveVideo(firstUnlocked);
      } else {
        const info = await api.getPublicCourseInfo();
        const mapped: any[] = info.modules.map((m) => ({
          id: `vid-${m.id}`,
          moduleId: m.id,
          title: `Masterclass 0${m.number}: ${m.title}`,
          description: `Apresentação técnica detalhada pelo Professor Cineasta Tony de Luc sobre os princípios de ${m.title.toLowerCase()}.`,
          videoUrl: '',
          durationMinutes: 45 + m.number * 5,
          thumbnailUrl: `https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=800&q=80`,
          professorNotes: 'Acesso às orientações pedagógicas e masterclasses em vídeo exclusivo para alunos matriculados.',
          isUnlocked: false,
          unlockDate: m.startDate || '',
        }));
        setVideos(mapped);
        setActiveVideo(mapped[0]);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (isoString?: string) => {
    if (!isoString) return '';
    try {
      const locale = language === 'en' ? 'en-US' : language === 'es' ? 'es-ES' : language === 'fr' ? 'fr-FR' : 'pt-BR';
      return new Date(isoString).toLocaleDateString(locale, {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      });
    } catch {
      return isoString;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-neutral-200 space-y-10">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-mono font-medium uppercase tracking-wider">
          <Film className="w-3.5 h-3.5" /> {cur.badge}
        </div>
        <h1 className="text-3xl sm:text-4xl font-display font-extrabold text-white">
          {cur.title}
        </h1>
        <p className="text-xs sm:text-sm text-neutral-300">
          {cur.subtitle}
        </p>

        {!isLoggedIn && (
          <div className="p-3.5 rounded-xl bg-amber-950/30 border border-amber-800/40 text-xs text-amber-200 max-w-lg mx-auto mt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
            <span>{cur.accessNotice}</span>
            <button
              onClick={() => onNavigate('matricula')}
              className="shrink-0 px-3.5 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer"
            >
              {cur.enrollCta}
            </button>
          </div>
        )}
      </div>

      {/* Main Video Player Showcase */}
      {activeVideo && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Player */}
          <div className="lg:col-span-8 bg-neutral-900 border border-neutral-800 rounded-3xl overflow-hidden shadow-2xl">
            {activeVideo.isUnlocked && (() => {
              const embed = parseVideoEmbed(activeVideo.videoUrl);
              return (
                <div className="px-5 py-3 bg-neutral-950 border-b border-neutral-800 flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-3 flex-wrap">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                      <span className="text-neutral-400 font-mono text-[11px]">Player:</span>
                      <span className="font-semibold text-white text-[11px]">{embed?.platformLabel || 'Vídeo Online'}</span>
                    </div>
                    <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-amber-500/10 border border-amber-500/20 text-amber-300 font-mono text-[11px]">
                      <Headphones className="w-3.5 h-3.5 text-amber-400" />
                      <span>Áudio Estúdio HD 1080p</span>
                    </div>
                  </div>

                  {/* Multilingual Subtitle & Translation Selector */}
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-neutral-400 font-mono text-[11px] flex items-center gap-1">
                      <Subtitles className="w-3.5 h-3.5 text-amber-400" />
                      Legenda / Idioma:
                    </span>
                    <div className="inline-flex rounded-lg bg-neutral-900 border border-neutral-800 p-0.5">
                      {(['pt', 'en', 'es', 'fr'] as const).map((lang) => {
                        const labels = {
                          pt: { flag: '🇧🇷', label: 'PT' },
                          en: { flag: '🇺🇸', label: 'EN' },
                          es: { flag: '🇪🇸', label: 'ES' },
                          fr: { flag: '🇫🇷', label: 'FR' },
                        };
                        const isSelected = videoSubLang === lang;
                        return (
                          <button
                            key={lang}
                            type="button"
                            onClick={() => setVideoSubLang(lang)}
                            className={`px-2.5 py-1 rounded-md text-xs font-bold transition-all cursor-pointer flex items-center gap-1 ${
                              isSelected
                                ? 'bg-amber-500 text-neutral-950 shadow-md font-mono'
                                : 'text-neutral-400 hover:text-white hover:bg-neutral-800'
                            }`}
                            title={`Ativar legendas e tradução em ${lang.toUpperCase()}`}
                          >
                            <span>{labels[lang].flag}</span>
                            <span>{labels[lang].label}</span>
                          </button>
                        );
                      })}
                    </div>

                    {embed?.externalWatchUrl && (
                      <a
                        href={embed.externalWatchUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-amber-300 hover:text-amber-200 transition font-mono text-[11px] font-medium ml-1"
                      >
                        <ExternalLink className="w-3 h-3" />
                        Aba Externa
                      </a>
                    )}
                  </div>
                </div>
              );
            })()}

            <div className="relative aspect-video bg-black flex items-center justify-center">
              {activeVideo.isUnlocked ? (() => {
                const embed = parseVideoEmbed(activeVideo.videoUrl);
                if (embed && (embed.type === 'youtube' || embed.type === 'vimeo' || embed.type === 'archive')) {
                  return (
                    <iframe
                      key={`${activeVideo.id}-${videoSubLang}`}
                      src={
                        embed.type === 'youtube'
                          ? `${embed.embedUrl}${embed.embedUrl.includes('?') ? '&' : '?'}rel=0&enablejsapi=1&cc_load_policy=1&hl=${videoSubLang}&cc_lang_pref=${videoSubLang}&vq=hd1080&high_res=1`
                          : embed.embedUrl
                      }
                      title={activeVideo.title}
                      className="w-full h-full border-0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; speaker-selection"
                      referrerPolicy="strict-origin-when-cross-origin"
                      allowFullScreen
                    />
                  );
                }
                return (
                  <video
                    controls
                    playsInline
                    preload="auto"
                    className="w-full h-full object-contain"
                    poster={activeVideo.thumbnailUrl}
                    src={embed?.embedUrl || activeVideo.videoUrl}
                  >
                    <source src={embed?.embedUrl || activeVideo.videoUrl} type="video/mp4" />
                    {cur.noHtml5}
                  </video>
                );
              })() : (
                <div className="text-center p-6 space-y-4">
                  <div className="w-14 h-14 rounded-full bg-neutral-800 border border-neutral-700 flex items-center justify-center text-amber-400 mx-auto shadow-lg shadow-black/40">
                    <Lock className="w-7 h-7" />
                  </div>
                  <div className="space-y-1.5">
                    <h3 className="text-base font-bold text-white">
                      {!isLoggedIn ? cur.visitorLockedTitle : cur.videoLocked}
                    </h3>
                    <p className="text-xs text-neutral-400 max-w-sm mx-auto font-mono">
                      {!isLoggedIn
                        ? cur.visitorLockedDesc
                        : cur.willUnlock(activeVideo.moduleId, formatDate(activeVideo.unlockDate))}
                    </p>
                  </div>
                  {!isLoggedIn && (
                    <div className="pt-2">
                      <button
                        onClick={() => onNavigate('matricula')}
                        className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-neutral-950 font-bold text-xs uppercase tracking-wider transition-all shadow-lg shadow-amber-500/20 cursor-pointer"
                      >
                        {cur.enrollCta}
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className="p-6 sm:p-8 space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded bg-amber-500/20 text-amber-400 font-mono text-xs font-bold">
                    {cur.stageLabel(activeVideo.moduleId)}
                  </span>
                  <span className="flex items-center gap-1 text-xs text-neutral-400 font-mono">
                    <Clock className="w-3.5 h-3.5" /> {activeVideo.durationMinutes} {cur.minutes}
                  </span>
                </div>
                <span
                  className={`text-[11px] font-mono font-bold px-2 py-0.5 rounded ${
                    activeVideo.isUnlocked
                      ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                      : 'bg-neutral-800 text-neutral-400'
                  }`}
                >
                  {activeVideo.isUnlocked ? cur.unlocked : cur.locked}
                </span>
              </div>

              {(() => {
                const modTrans = getModuleTranslation(activeVideo.moduleId);
                const translatedTitle = modTrans.title
                  ? `${language === 'pt' ? 'Masterclass' : language === 'fr' ? 'Masterclasse' : 'Masterclass'} 0${activeVideo.moduleId}: ${modTrans.title}`
                  : activeVideo.title;
                const translatedDesc = modTrans.subtitle || activeVideo.description;
                return (
                  <>
                    <h2 className="text-xl sm:text-2xl font-display font-bold text-white">
                      {translatedTitle}
                    </h2>
                    <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
                      {translatedDesc}
                    </p>
                  </>
                );
              })()}

              {activeVideo.professorNotes && (
                <div className="p-4 rounded-xl bg-[#12141c] border border-neutral-800 space-y-1.5">
                  <div className="flex items-center gap-2 text-xs font-mono font-bold text-amber-400">
                    <UserIcon className="w-3.5 h-3.5" />
                    <span>{cur.profNotesTitle}</span>
                  </div>
                  <p className="text-xs text-neutral-400 italic leading-relaxed">
                    "{activeVideo.professorNotes}"
                  </p>
                </div>
              )}

              {/* Pedagogical Translation & Masterclass Directing Directives */}
              {(() => {
                const trans = MASTERCLASS_STAGE_TRANSLATIONS[activeVideo.moduleId]?.[videoSubLang];
                if (!trans) return null;
                return (
                  <div className="p-5 rounded-2xl bg-neutral-950/80 border border-neutral-800 space-y-4">
                    <div className="flex items-center justify-between flex-wrap gap-2 pb-3 border-b border-neutral-800">
                      <div className="flex items-center gap-2">
                        <BookOpen className="w-4 h-4 text-amber-400" />
                        <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-amber-300">
                          {videoSubLang === 'pt' && 'Tradução Pedagógica & Decupagem da Aula'}
                          {videoSubLang === 'en' && 'Pedagogical Translation & Lecture Breakdown'}
                          {videoSubLang === 'es' && 'Traducción Pedagógica y Desglose de la Clase'}
                          {videoSubLang === 'fr' && 'Traduction Pédagogique & Découpage de la Masterclasse'}
                        </h4>
                      </div>
                      <span className="text-[11px] font-mono text-neutral-400">
                        {videoSubLang === 'pt' && '🇧🇷 Português'}
                        {videoSubLang === 'en' && '🇺🇸 English'}
                        {videoSubLang === 'es' && '🇪🇸 Español'}
                        {videoSubLang === 'fr' && '🇫🇷 Français'}
                      </span>
                    </div>

                    <div className="space-y-2">
                      <h5 className="text-sm font-bold text-white">{trans.stageTitle}</h5>
                      <p className="text-xs text-neutral-300 leading-relaxed">{trans.lectureSummary}</p>
                    </div>

                    <div className="p-3.5 rounded-xl bg-neutral-900 border border-neutral-800 space-y-1.5">
                      <div className="text-[11px] font-mono font-bold text-amber-400 uppercase tracking-wider">
                        {videoSubLang === 'pt' && 'Citação do Diretor Tony de Luc:'}
                        {videoSubLang === 'en' && 'Director Tony de Luc Quote:'}
                        {videoSubLang === 'es' && 'Cita del Director Tony de Luc:'}
                        {videoSubLang === 'fr' && 'Citation du Réalisateur Tony de Luc :'}
                      </div>
                      <p className="text-xs italic text-neutral-300">"{trans.tonyQuote}"</p>
                    </div>

                    <div className="space-y-2">
                      <div className="text-[11px] font-mono font-bold text-neutral-400 uppercase tracking-wider">
                        {videoSubLang === 'pt' && 'Regras Práticas de Direção & Decupagem:'}
                        {videoSubLang === 'en' && 'Practical Directing & Framing Directives:'}
                        {videoSubLang === 'es' && 'Reglas Prácticas de Dirección y Planificación:'}
                        {videoSubLang === 'fr' && 'Règles Pratiques de Réalisation & Découpage :'}
                      </div>
                      <ul className="space-y-1.5 text-xs text-neutral-300">
                        {trans.keyDirectingRules.map((rule, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <span className="text-amber-400 font-bold font-mono">0{idx + 1}.</span>
                            <span>{rule}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="pt-2 border-t border-neutral-800/60 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-[11px] text-neutral-400 font-mono">
                      <span className="text-amber-400/90">{trans.handoutConnection}</span>
                      <span className="flex items-center gap-1 text-emerald-400">
                        <Volume2 className="w-3 h-3" />
                        {trans.audioNotice}
                      </span>
                    </div>
                  </div>
                );
              })()}

              {/* Opção de subir vídeo para esta aula (Admin / Diretor) */}
              {isAdmin && (
                <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-1.5 text-xs font-bold text-amber-300 font-sans">
                      <Upload className="w-4 h-4 text-amber-400" />
                      <span>{cur.adminUploadTitle}</span>
                    </div>
                    <p className="text-[11px] text-neutral-400 mt-0.5">
                      {cur.adminUploadDesc}
                    </p>
                  </div>

                  <label className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-xs rounded-xl cursor-pointer flex items-center justify-center gap-1.5 transition-colors shrink-0 shadow-md">
                    {uploading ? (
                      <>
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        <span>{cur.adminUploading} {uploadProgress}%...</span>
                      </>
                    ) : (
                      <>
                        <Upload className="w-3.5 h-3.5" />
                        <span>{cur.adminChooseFile}</span>
                      </>
                    )}
                    <input
                      type="file"
                      accept="video/mp4,video/webm,video/quicktime,video/x-matroska,video/*"
                      disabled={uploading}
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) handleUploadActiveVideo(file);
                      }}
                      className="hidden"
                    />
                  </label>
                </div>
              )}

              {/* Opção de subir capa da aula (Admin / Diretor) */}
              {isAdmin && activeVideo && (
                <div className="p-4 rounded-xl bg-neutral-900 border border-neutral-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    {/* Thumbnail Preview */}
                    <div className="w-16 h-10 rounded-lg overflow-hidden bg-black border border-neutral-700 shrink-0 relative">
                      <img
                        src={activeVideo.thumbnailUrl || '/images/cinelab-cover.jpg'}
                        alt="Capa da Aula"
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = '/images/cinelab-cover.jpg';
                        }}
                      />
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5 text-xs font-bold text-white font-sans">
                        <ImageIcon className="w-4 h-4 text-amber-400" />
                        <span>Subir Capa / Poster desta Videoaula do Computador</span>
                      </div>
                      <p className="text-[11px] text-neutral-400 mt-0.5">
                        Altere a capa desta aula enviando uma imagem (JPG, PNG, WebP) direto da sua máquina
                      </p>
                    </div>
                  </div>

                  <label className="px-4 py-2 bg-neutral-800 hover:bg-neutral-700 border border-neutral-700 text-amber-300 hover:text-white font-bold text-xs rounded-xl cursor-pointer flex items-center justify-center gap-1.5 transition-colors shrink-0 shadow-sm">
                    {uploadingCover ? (
                      <>
                        <Loader2 className="w-3.5 h-3.5 animate-spin text-amber-400" />
                        <span>Subindo {uploadCoverProgress}%...</span>
                      </>
                    ) : (
                      <>
                        <Upload className="w-3.5 h-3.5 text-amber-400" />
                        <span>Escolher Imagem de Capa</span>
                      </>
                    )}
                    <input
                      type="file"
                      accept="image/jpeg,image/png,image/webp,image/avif,image/gif"
                      disabled={uploadingCover}
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) handleUploadActiveCover(file);
                      }}
                      className="hidden"
                    />
                  </label>
                </div>
              )}

              {uploadMessage && (
                <div className="p-3 rounded-xl bg-emerald-950/80 border border-emerald-800 text-emerald-300 text-xs flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>{uploadMessage}</span>
                </div>
              )}
            </div>
          </div>

          {/* Right Video Playlist */}
          <div className="lg:col-span-4 bg-neutral-900/80 border border-neutral-800 rounded-3xl p-5 space-y-4">
            <h3 className="text-sm font-bold font-mono uppercase tracking-wider text-neutral-200 border-b border-neutral-800 pb-3 flex items-center justify-between">
              <span>{cur.playlistTitle}</span>
              <Film className="w-4 h-4 text-amber-400" />
            </h3>

            <div className="space-y-2.5 max-h-[600px] overflow-y-auto pr-1">
              {videos.map((v) => {
                const isCurrent = activeVideo.id === v.id;
                const modTrans = getModuleTranslation(v.moduleId);
                const displayTitle = modTrans.title
                  ? `${language === 'pt' ? 'Módulo' : language === 'fr' ? 'Module' : 'Module'} 0${v.moduleId}: ${modTrans.title}`
                  : v.title;
                return (
                  <button
                    key={v.id}
                    onClick={() => setActiveVideo(v)}
                    className={`w-full text-left p-3 rounded-xl border transition-all flex items-start gap-3 cursor-pointer ${
                      isCurrent
                        ? 'bg-amber-950/40 border-amber-500/80 ring-1 ring-amber-500/50'
                        : 'bg-neutral-800/40 border-neutral-700/60 hover:border-neutral-600'
                    }`}
                  >
                    <div className="relative w-16 h-12 rounded-lg bg-neutral-950 overflow-hidden shrink-0 flex items-center justify-center">
                      <img
                        src={v.thumbnailUrl}
                        alt={v.title}
                        className="w-full h-full object-cover opacity-60"
                      />
                      <div className="absolute inset-0 flex items-center justify-center">
                        {v.isUnlocked ? (
                          <PlayCircle className="w-5 h-5 text-amber-400" />
                        ) : (
                          <Lock className="w-4 h-4 text-neutral-400" />
                        )}
                      </div>
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between text-[10px] font-mono text-neutral-400 mb-0.5">
                        <span className="text-amber-400 font-bold">M0{v.moduleId}</span>
                        <span>{v.durationMinutes}m</span>
                      </div>
                      <h4 className="text-xs font-bold text-white truncate leading-snug">
                        {displayTitle}
                      </h4>
                      <p className="text-[10px] font-mono text-neutral-500 mt-1">
                        {v.isUnlocked ? cur.available : `🔒 ${formatDate(v.unlockDate) || cur.locked}`}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
