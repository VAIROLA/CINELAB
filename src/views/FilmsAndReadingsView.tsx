import React, { useEffect, useState, useCallback } from 'react';
import { api } from '../services/api.js';
import { ModuleFilm, ModuleReading } from '../types/index.js';
import {
  Film,
  BookOpen,
  Clock,
  ExternalLink,
  Lock,
  Unlock,
  Sparkles,
  Play,
  Copy,
  Check,
  Edit3,
  X,
  Tv,
  Eye,
  Info,
  Save,
  Compass,
  Volume2,
  Languages,
  Subtitles,
  Globe,
} from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext.js';
import { FilmSubtitleTranscriptViewer } from '../components/FilmSubtitleTranscriptViewer.js';
import { ReadingReaderModal } from '../components/ReadingReaderModal.js';
import { parseVideoEmbed } from '../utils/videoUtils.js';

interface FilmsAndReadingsViewProps {
  onNavigate: (route: string, params?: any) => void;
  isLoggedIn: boolean;
  isAdmin?: boolean;
  currentUser?: any;
  initialTab?: 'films' | 'readings';
  initialModuleId?: number;
}

export const FilmsAndReadingsView: React.FC<FilmsAndReadingsViewProps> = ({
  onNavigate,
  isLoggedIn,
  isAdmin = false,
  currentUser,
  initialTab = 'films',
  initialModuleId,
}) => {
  const { language, getFilmTranslation, getReadingTranslation } = useLanguage();
  const [films, setFilms] = useState<(ModuleFilm & { isUnlocked?: boolean; unlockDate?: string })[]>([]);
  const [readings, setReadings] = useState<(ModuleReading & { isUnlocked?: boolean; unlockDate?: string })[]>([]);
  const [activeTab, setActiveTab] = useState<'films' | 'readings'>(initialTab);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (initialTab) {
      setActiveTab(initialTab);
    }
  }, [initialTab]);

  useEffect(() => {
    if (readings.length > 0 && initialModuleId && activeTab === readings) {
      const match = readings.find((r) => r.moduleId === initialModuleId);
      if (match) {
        setActiveReadingModal(match);
      }
    }
  }, [readings, initialModuleId, activeTab]);

  // Copy URL state
  const [copiedUrl, setCopiedUrl] = useState<string | null>(null);

  // Active Critical Reading Modal state
  const [activeReadingModal, setActiveReadingModal] = useState<ModuleReading | null>(null);

  // Integrated Cinema Player Modal
  const [playingFilm, setPlayingFilm] = useState<ModuleFilm | null>(null);
  const [activeVideoSource, setActiveVideoSource] = useState<'watch' | 'streaming'>('watch');
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [selectedSubtitle, setSelectedSubtitle] = useState<'pt' | 'en' | 'es' | 'fr' | 'off'>('pt');
  const [modalLineIndex, setModalLineIndex] = useState(0);
  const [isModalAutoPlay, setIsModalAutoPlay] = useState(true);

  // Inline on-screen player state (allows expanding the video player right inside the card on screen)
  const [inlinePlayerFilmId, setInlinePlayerFilmId] = useState<string | null>(null);
  const [inlineSelectedOptions, setInlineSelectedOptions] = useState<Record<string, string>>({});
  const [inlineSelectedSubtitles, setInlineSelectedSubtitles] = useState<Record<string, 'pt' | 'en' | 'es' | 'fr' | 'off'>>({});
  const [inlineLineIndices, setInlineLineIndices] = useState<Record<string, number>>({});
  const [inlineAutoPlays, setInlineAutoPlays] = useState<Record<string, boolean>>({});

  const setInlineLineIndex = useCallback((filmId: string, val: number | ((prev: number) => number)) => {
    setInlineLineIndices((prev) => ({
      ...prev,
      [filmId]: typeof val === 'function' ? val(prev[filmId] || 0) : val,
    }));
  }, []);

  const setInlineAutoPlay = useCallback((filmId: string, val: boolean | ((prev: boolean) => boolean)) => {
    setInlineAutoPlays((prev) => ({
      ...prev,
      [filmId]: typeof val === 'function' ? val(prev[filmId] ?? true) : val,
    }));
  }, []);

  const setInlineSelectedSubtitle = useCallback((filmId: string, sub: 'pt' | 'en' | 'es' | 'fr' | 'off') => {
    setInlineSelectedSubtitles((prev) => ({ ...prev, [filmId]: sub }));
  }, []);

  const isFilmUnlocked = useCallback((film: ModuleFilm) => {
    if (isAdmin) return true;
    if (film.isBonus || film.moduleId === 0) return true;
    if (!isLoggedIn) return false;
    return film.isUnlocked ?? true;
  }, [isAdmin, isLoggedIn]);

  const toggleInlinePlayer = (film: ModuleFilm) => {
    if (!isFilmUnlocked(film)) {
      if (!isLoggedIn) onNavigate('matricula');
      return;
    }
    if (inlinePlayerFilmId === film.id) {
      setInlinePlayerFilmId(null);
    } else {
      setInlinePlayerFilmId(film.id);
      if (!inlineSelectedOptions[film.id]) {
        const initialOpt = film.videoOptions?.find((o) => !o.isStreaming && getEmbedInfo(o.url)?.isEmbeddable)
          || film.videoOptions?.find((o) => !o.isStreaming)
          || film.videoOptions?.[0];
        if (initialOpt) {
          setInlineSelectedOptions((prev) => ({ ...prev, [film.id]: initialOpt.id }));
        }
      }
      if (!inlineSelectedSubtitles[film.id]) {
        const subLang = language === 'en' ? 'en' : language === 'es' ? 'es' : language === 'fr' ? 'fr' : 'pt';
        setInlineSelectedSubtitles((prev) => ({ ...prev, [film.id]: subLang }));
      }
    }
  };

  // Open film modal with preconfigured student language subtitle
  const handleOpenFilmModal = (film: ModuleFilm) => {
    if (!isFilmUnlocked(film)) {
      if (!isLoggedIn) onNavigate('matricula');
      return;
    }
    setPlayingFilm(film);
    setActiveVideoSource('watch');
    const initialOpt = film.videoOptions?.find((o) => !o.isStreaming && getEmbedInfo(o.url)?.isEmbeddable)
      || film.videoOptions?.find((o) => !o.isStreaming)
      || film.videoOptions?.[0];
    setSelectedOptionId(initialOpt?.id || null);
    setModalLineIndex(0);
    setIsModalAutoPlay(true);
    if (language === 'en') {
      setSelectedSubtitle('en');
    } else if (language === 'es') {
      setSelectedSubtitle('es');
    } else if (language === 'fr') {
      setSelectedSubtitle('fr');
    } else {
      setSelectedSubtitle('pt');
    }
  };

  // Admin Editing Modal
  const [editingFilm, setEditingFilm] = useState<ModuleFilm | null>(null);
  const [filmFilter, setFilmFilter] = useState<'all' | 'curriculum' | 'bonus' | 'dublado'>('all');
  const [editForm, setEditForm] = useState<{
    title: string;
    originalTitle: string;
    director: string;
    year: number | string;
    duration: string;
    platform: string;
    watchUrl: string;
    synopsis: string;
    whyWatch: string;
    whatToObserve: string;
    observationActivity: string;
  }>({
    title: '',
    originalTitle: '',
    director: '',
    year: '',
    duration: '',
    platform: '',
    watchUrl: '',
    synopsis: '',
    whyWatch: '',
    whatToObserve: '',
    observationActivity: '',
  });
  const [savingEdit, setSavingEdit] = useState(false);
  const [editSuccessMessage, setEditSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    loadContent();
  }, [isLoggedIn]);

  const loadContent = async () => {
    try {
      setLoading(true);
      const [fRes, rRes] = await Promise.all([
        api.getStudentFilms().catch(() => []),
        api.getStudentReadings().catch(() => []),
      ]);
      setFilms(fRes);
      setReadings(rRes);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (isoString?: string) => {
    if (!isoString) return '';
    try {
      return new Date(isoString).toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      });
    } catch {
      return isoString;
    }
  };

  const handleCopyUrl = (url: string) => {
    navigator.clipboard.writeText(url);
    setCopiedUrl(url);
    setTimeout(() => {
      setCopiedUrl(null);
    }, 2500);
  };

  // Helper to extract embeddable video URL (YouTube, Vimeo, Archive.org, direct)
  const getEmbedInfo = (url?: string, subLang?: string) => {
    return parseVideoEmbed(url, subLang);
  };

  const handleOpenEditModal = (film: ModuleFilm) => {
    setEditingFilm(film);
    setEditSuccessMessage(null);
    setEditForm({
      title: film.title || '',
      originalTitle: film.originalTitle || '',
      director: film.director || '',
      year: film.year || '',
      duration: film.duration || (film.durationMinutes ? `${film.durationMinutes} min` : ''),
      platform: film.platform || film.streamingPlatform || 'YouTube Oficial',
      watchUrl: film.watchUrl || film.streamingUrl || '',
      synopsis: film.synopsis || '',
      whyWatch: film.whyWatch || '',
      whatToObserve: film.whatToObserve || '',
      observationActivity: film.observationActivity || '',
    });
  };

  const handleSaveFilmEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingFilm) return;

    try {
      setSavingEdit(true);
      const identifier =
        (editingFilm.isBonus || editingFilm.moduleId === 0) && editingFilm.id
          ? editingFilm.id
          : editingFilm.moduleId;
      const res = await api.updateAdminFilm(identifier, {
        title: editForm.title,
        originalTitle: editForm.originalTitle,
        director: editForm.director,
        year: editForm.year,
        duration: editForm.duration,
        platform: editForm.platform,
        streamingPlatform: editForm.platform,
        watchUrl: editForm.watchUrl,
        streamingUrl: editForm.watchUrl,
        synopsis: editForm.synopsis,
        whyWatch: editForm.whyWatch,
        whatToObserve: editForm.whatToObserve,
        observationActivity: editForm.observationActivity,
      });

      if (res.success) {
        setEditSuccessMessage('Dados e URL do vídeo atualizados com sucesso!');
        // Update local state
        setFilms((prev) =>
          prev.map((f) =>
            (editingFilm.id && f.id === editingFilm.id) ||
            (editingFilm.moduleId > 0 && f.moduleId === editingFilm.moduleId)
              ? {
                  ...f,
                  ...res.film,
                  watchUrl: editForm.watchUrl,
                  streamingUrl: editForm.watchUrl,
                  platform: editForm.platform,
                  streamingPlatform: editForm.platform,
                }
              : f
          )
        );
        setTimeout(() => {
          setEditingFilm(null);
          setEditSuccessMessage(null);
        }, 1200);
      }
    } catch (err: any) {
      alert(err?.message || 'Erro ao salvar alterações do filme.');
    } finally {
      setSavingEdit(false);
    }
  };

  const tFR = {
    pt: {
      badge: 'Cinemateca & Biblioteca Crítica',
      title: 'Filmes Recomendados & Leituras Obrigatórias',
      desc: 'Cada uma das 10 etapas do CINELAB possui 1 filme essencial com a URL oficial para assistir ao vídeo decupado pelo professor Tony de Luc e 1 leitura crítica fundamental.',
      lookingForTony: 'Procurando os filmes dirigidos por',
      viewDirectorFilmo: 'Ver Filmografia do Diretor →',
      tabFilms: 'Cinemateca',
      tabReadings: '10 Leituras Obrigatórias',
      loading: 'Carregando acervo pedagógico e URLs dos filmes do CINELAB...',
      allFilms: 'Todos os Filmes',
      courseModules: '10 Módulos do Curso',
      dubbedFilter: '🎙️ Dublados / Áudio PT-BR',
      bonusFilter: '⭐ Vídeos Extras & Bônus',
      filmsCount: 'filmes com indicações de vídeos',
      highlightBonus: 'DESTAQUE CINEMATECA • VÍDEO EXTRA',
      extraPhoto: 'Vídeo Extra de Fotografia & Iluminação (Módulo 05)',
      extraDirect: 'Complemento Especial de Direção & Set (Módulo 08)',
      direction: 'Direção',
      immediateAccess: 'Acesso Imediato ao Vídeo',
      integratedPlayer: 'Player Integrado na Tela',
      watchIndicated: 'Assistir ao Vídeo Indicado',
      studyModule5: 'Estudar com Decupagem no Módulo 05 (Fotografia) →',
      studyModule8: 'Estudar com Decupagem no Módulo 08 (Set) →',
      modulePrefix: 'MÓDULO',
      bonusBadge: 'BÔNUS EXTRA',
      unlocked: 'Liberado',
      unlockedAt: 'Liberado em:',
      editVideo: 'Editar Vídeo',
      originalTitleLabel: 'Título original:',
      audioDubbed: '🎙️ Filme Completo Dublado em Português',
      audioOriginalPt: '🇧🇷 Áudio Original em Português',
      audioSilent: '🎼 Cinema Mudo • Trilha Sonora Orquestral',
      audioSubtitled: '💬 Legendado em Português',
      synopsisTitle: 'Sinopse da Obra:',
      whyWatchTitle: 'Por que o aluno deve assistir:',
      observeTitle: 'O que observar na cena:',
      videoBlockTitle: 'Vídeo Indicado do Módulo',
      watchVideoBtn: 'Assistir ao Vídeo',
      urlInConfig: 'URL do vídeo em configuração pelo corpo docente.',
      viewModule5: 'Ver Módulo 05 (Fotografia)',
      viewModule8: 'Ver Módulo 08 (Set)',
      viewFullModule: 'Ver Módulo Completo',
      readingSummaryTitle: 'Resumo Crítico da Obra:',
      whyReadTitle: 'Por que o realizador deve ler:',
      accessReadingBtn: 'Acessar Leitura',
      viewInModuleBtn: 'Ver no Módulo →',
      optionsStudyTitle: 'Opções de Estudo / Cenas / Streaming Oficial:',
      langBarTitle: 'Acessibilidade Multilíngue (Dublagem & Legendas):',
      audioTrackTitle: 'Áudio / Versão:',
      subtitlesTitle: 'Legendas na sua Língua (CC):',
      subtitlesNotice: 'O player integrado carrega as legendas automaticamente na língua escolhida. Você também pode clicar no botão [CC] do vídeo para personalizar.',
      subtitlesOff: 'Sem Legenda',
      studentLang: 'Língua do Aluno',
      availableDubbedLabel: 'Dublagem:',
      availableSubtitlesLabel: 'Legendas:',
      subtitlesCcActive: 'Legendas ativadas em:',
      locked: 'Bloqueado',
      filmNoticeVisitor: 'Acesso à Cinemateca: os 10 filmes dos módulos são exclusivos para alunos matriculados. Os 3 Vídeos Extras & Bônus estão liberados para acesso público.',
      filmVisitorLockedTitle: 'Filme Exclusivo para Alunos Matriculados',
      filmVisitorLockedDesc: 'O filme analítico deste módulo e suas orientações pedagógicas são de acesso exclusivo aos alunos matriculados no CINELAB.',
      filmLockedScheduleTitle: 'Filme Bloqueado pelo Cronograma',
      filmUnlockScheduleDesc: 'Disponível conforme o calendário pedagógico em:',
      filmLockedGenericDesc: 'Conteúdo programado para liberação conforme o calendário pedagógico.',
      enrollToWatchCta: 'Fazer Matrícula para Assistir',
    },
    en: {
      badge: 'Film Archive & Critical Library',
      title: 'Recommended Films & Mandatory Readings',
      desc: 'Each of the 10 stages of CINELAB includes 1 essential film with an official stream link curated by Director Tony de Luc, along with 1 fundamental critical reading.',
      lookingForTony: 'Looking for films directed by',
      viewDirectorFilmo: 'View Director Filmography →',
      tabFilms: 'Film Archive',
      tabReadings: '10 Mandatory Readings',
      loading: 'Loading CINELAB pedagogical archive and film links...',
      allFilms: 'All Films',
      courseModules: '10 Course Modules',
      dubbedFilter: '🎙️ Dubbed / PT Audio',
      bonusFilter: '⭐ Bonus & Masterclass Videos',
      filmsCount: 'films with video links',
      highlightBonus: 'FEATURED ARCHIVE • BONUS VIDEO',
      extraPhoto: 'Extra Video: Cinematography & Lighting (Module 05)',
      extraDirect: 'Special Directing & On-Set Masterclass (Module 08)',
      direction: 'Director',
      immediateAccess: 'Instant Video Access',
      integratedPlayer: 'Integrated On-Screen Player',
      watchIndicated: 'Watch Recommended Video',
      studyModule5: 'Study Breakdown in Module 05 (Cinematography) →',
      studyModule8: 'Study Breakdown in Module 08 (Set Directing) →',
      modulePrefix: 'MODULE',
      bonusBadge: 'EXTRA BONUS',
      unlocked: 'Unlocked',
      unlockedAt: 'Unlocks on:',
      editVideo: 'Edit Video',
      originalTitleLabel: 'Original title:',
      audioDubbed: '🎙️ Full Film Dubbed in Portuguese',
      audioOriginalPt: '🇧🇷 Original Portuguese Audio',
      audioSilent: '🎼 Silent Film • Orchestral Score',
      audioSubtitled: '💬 Subtitled in Portuguese',
      synopsisTitle: 'Film Synopsis:',
      whyWatchTitle: 'Why the student should watch:',
      observeTitle: 'What to observe in the breakdown:',
      videoBlockTitle: 'Recommended Stage Video',
      watchVideoBtn: 'Watch Video',
      urlInConfig: 'Video URL being configured by academic staff.',
      viewModule5: 'View Module 05 (Cinematography)',
      viewModule8: 'View Module 08 (Set)',
      viewFullModule: 'View Full Module',
      readingSummaryTitle: 'Critical Summary:',
      whyReadTitle: 'Why the filmmaker must read:',
      accessReadingBtn: 'Access Reading',
      viewInModuleBtn: 'View in Module →',
      optionsStudyTitle: 'Study Options / Scenes / Official Streaming:',
      langBarTitle: 'Multilingual Accessibility (Dubbing & Subtitles):',
      audioTrackTitle: 'Audio / Version:',
      subtitlesTitle: 'Subtitles in your Language (CC):',
      subtitlesNotice: 'The integrated player automatically loads subtitles in your selected language. You can also click the [CC] button on the video.',
      subtitlesOff: 'No Subtitles',
      studentLang: 'Student Language',
      availableDubbedLabel: 'Dubbing:',
      availableSubtitlesLabel: 'Subtitles:',
      subtitlesCcActive: 'Subtitles active in:',
      locked: 'Locked',
      filmNoticeVisitor: 'Film Archive Access: The 10 module films are exclusive to enrolled students. The 3 Extra & Bonus Videos are available for preview.',
      filmVisitorLockedTitle: 'Exclusive Film for Enrolled Students',
      filmVisitorLockedDesc: 'This module’s recommended film and set directions are exclusive to enrolled CINELAB students.',
      filmLockedScheduleTitle: 'Film Locked by Pedagogical Schedule',
      filmUnlockScheduleDesc: 'Available according to pedagogical schedule on:',
      filmLockedGenericDesc: 'Content scheduled for release per the pedagogical timeline.',
      enrollToWatchCta: 'Enroll Now to Watch',
    },
    es: {
      badge: 'Cinemateca y Biblioteca Crítica',
      title: 'Películas Recomendadas y Lecturas Obligatorias',
      desc: 'Cada una de las 10 etapas de CINELAB cuenta con 1 película esencial con enlace de visionado curado por el director Tony de Luc y 1 lectura crítica fundamental.',
      lookingForTony: '¿Buscas las películas dirigidas por',
      viewDirectorFilmo: 'Ver Filmografía del Director →',
      tabFilms: 'Cinemateca',
      tabReadings: '10 Lecturas Obligatorias',
      loading: 'Cargando acervo pedagógico y enlaces de películas...',
      allFilms: 'Todas las Películas',
      courseModules: '10 Módulos del Curso',
      dubbedFilter: '🎙️ Dobladas / Audio PT',
      bonusFilter: '⭐ Videos Extras y Bonus',
      filmsCount: 'películas con enlaces',
      highlightBonus: 'DESTACADO CINEMATECA • VIDEO EXTRA',
      extraPhoto: 'Video Extra de Fotografía e Iluminación (Módulo 05)',
      extraDirect: 'Complemento Especial de Dirección y Rodaje (Módulo 08)',
      direction: 'Dirección',
      immediateAccess: 'Acceso Inmediato al Video',
      integratedPlayer: 'Reproductor Integrado en Pantalla',
      watchIndicated: 'Ver Video Recomendado',
      studyModule5: 'Estudiar con Análisis en Módulo 05 (Fotografía) →',
      studyModule8: 'Estudiar con Análisis en Módulo 08 (Rodaje) →',
      modulePrefix: 'MÓDULO',
      bonusBadge: 'BONO EXTRA',
      unlocked: 'Desbloqueado',
      unlockedAt: 'Disponible el:',
      editVideo: 'Editar Video',
      originalTitleLabel: 'Título original:',
      audioDubbed: '🎙️ Película Completa Doblada en Portugués',
      audioOriginalPt: '🇧🇷 Audio Original en Portugués',
      audioSilent: '🎼 Cine Mudo • Banda Sonora Orquestal',
      audioSubtitled: '💬 Subtitulado en Portugués',
      synopsisTitle: 'Sinopsis de la Obra:',
      whyWatchTitle: 'Por qué el estudiante debe verla:',
      observeTitle: 'Qué observar en el plano:',
      videoBlockTitle: 'Video Recomendado del Módulo',
      watchVideoBtn: 'Ver Video',
      urlInConfig: 'URL del video en configuración por el cuerpo docente.',
      viewModule5: 'Ver Módulo 05 (Fotografía)',
      viewModule8: 'Ver Módulo 08 (Rodaje)',
      viewFullModule: 'Ver Módulo Completo',
      readingSummaryTitle: 'Resumen Crítico de la Obra:',
      whyReadTitle: 'Por qué el realizador debe leer:',
      accessReadingBtn: 'Acceder a la Lectura',
      viewInModuleBtn: 'Ver en el Módulo →',
      optionsStudyTitle: 'Opciones de Estudio / Escenas / Streaming Oficial:',
      langBarTitle: 'Accesibilidad Multilingüe (Doblaje y Subtítulos):',
      audioTrackTitle: 'Audio / Versión:',
      subtitlesTitle: 'Subtítulos en tu Idioma (CC):',
      subtitlesNotice: 'El reproductor integrado carga automáticamente subtítulos en tu idioma. También puedes hacer clic en el botón [CC] del video.',
      subtitlesOff: 'Sin Subtítulos',
      studentLang: 'Idioma del Estudiante',
      availableDubbedLabel: 'Doblaje:',
      availableSubtitlesLabel: 'Subtítulos:',
      subtitlesCcActive: 'Subtítulos activos en:',
      locked: 'Bloqueado',
      filmNoticeVisitor: 'Acceso a la Cinemateca: Las 10 películas de los módulos son exclusivas para alumnos matriculados. Los 3 Videos Extras y Bonus están disponibles para acceso público.',
      filmVisitorLockedTitle: 'Película Exclusiva para Alumnos Matriculados',
      filmVisitorLockedDesc: 'La película recomendada de este módulo y sus orientaciones son de acceso exclusivo para alumnos matriculados en CINELAB.',
      filmLockedScheduleTitle: 'Película Bloqueada por el Cronograma',
      filmUnlockScheduleDesc: 'Disponible según el calendario pedagógico el:',
      filmLockedGenericDesc: 'Contenido programado para liberación según el calendario pedagógico.',
      enrollToWatchCta: 'Matricularse para Ver',
    },
    fr: {
      badge: 'Cinémathèque & Bibliothèque Critique',
      title: 'Films Recommandés & Lectures Obligatoires',
      desc: 'Chacune des 10 étapes du CINELAB propose 1 film essentiel avec lien officiel sélectionné par le directeur Tony de Luc et 1 lecture critique fondamentale.',
      lookingForTony: 'Vous recherchez les films réalisés par',
      viewDirectorFilmo: 'Voir la Filmographie du Réalisateur →',
      tabFilms: 'Cinémathèque',
      tabReadings: '10 Lectures Obligatoires',
      loading: 'Chargement de la cinémathèque pédagogique du CINELAB...',
      allFilms: 'Tous les Films',
      courseModules: '10 Modules du Cours',
      dubbedFilter: '🎙️ Doublés / Audio PT',
      bonusFilter: '⭐ Vidéos Bonus & Masterclasses',
      filmsCount: 'films avec liens vidéo',
      highlightBonus: 'COUP DE CŒUR CINÉMATHÈQUE • VIDÉO BONUS',
      extraPhoto: 'Vidéo Bonus Photographie & Lumière (Module 05)',
      extraDirect: 'Complément Spécial Réalisation & Plateau (Module 08)',
      direction: 'Réalisation',
      immediateAccess: 'Accès Immédiat à la Vidéo',
      integratedPlayer: 'Lecteur Intégré à l\'Écran',
      watchIndicated: 'Regarder la Vidéo Sélectionnée',
      studyModule5: 'Étudier avec Découpage au Module 05 (Photo) →',
      studyModule8: 'Étudier avec Découpage au Module 08 (Plateau) →',
      modulePrefix: 'MODULE',
      bonusBadge: 'BONUS SUPPLÉMENTAIRE',
      unlocked: 'Débloqué',
      unlockedAt: 'Débloqué le :',
      editVideo: 'Modifier la Vidéo',
      originalTitleLabel: 'Titre original :',
      audioDubbed: '🎙️ Film Complet Doublé en Portugais',
      audioOriginalPt: '🇧🇷 Audio Original en Portugais',
      audioSilent: '🎼 Cinéma Muet • Bande Sonore Orchestrale',
      audioSubtitled: '💬 Sous-titré en Portugais',
      synopsisTitle: 'Synopsis de l\'Œuvre :',
      whyWatchTitle: 'Pourquoi l\'étudiant doit visionner :',
      observeTitle: 'Ce qu\'il faut observer au découpage :',
      videoBlockTitle: 'Vidéo Recommandée du Module',
      watchVideoBtn: 'Visionner la Vidéo',
      urlInConfig: 'URL de la vidéo en configuration pédagogique.',
      viewModule5: 'Voir Module 05 (Photographie)',
      viewModule8: 'Voir Module 08 (Plateau)',
      viewFullModule: 'Voir le Module Complet',
      readingSummaryTitle: 'Résumé Critique de l\'Œuvre :',
      whyReadTitle: 'Pourquoi le réalisateur doit lire :',
      accessReadingBtn: 'Accéder à la Lecture',
      viewInModuleBtn: 'Voir dans le Module →',
      optionsStudyTitle: 'Options d\'Étude / Scènes / Streaming Officiel :',
      langBarTitle: 'Accessibilité Multilingue (Doublage & Sous-titres) :',
      audioTrackTitle: 'Audio / Version :',
      subtitlesTitle: 'Sous-titres dans votre Langue (CC) :',
      subtitlesNotice: 'Le lecteur intégré charge automatiquement les sous-titres dans votre langue. Vous pouvez également basculer le bouton [CC] de la vidéo.',
      subtitlesOff: 'Sans Sous-titres',
      studentLang: 'Langue de l\'Étudiant',
      availableDubbedLabel: 'Doublage :',
      availableSubtitlesLabel: 'Sous-titres :',
      subtitlesCcActive: 'Sous-titres activés en :',
      locked: 'Bloqué',
      filmNoticeVisitor: 'Accès à la Cinémathèque : Les 10 films des modules sont réservés aux étudiants inscrits. Les 3 Vidéos Bonus sont en libre accès pour démonstration.',
      filmVisitorLockedTitle: 'Film Réservé aux Étudiants Inscrits',
      filmVisitorLockedDesc: 'Le film recommandé de ce module et ses indications de plateau sont réservés aux étudiants inscrits au CINELAB.',
      filmLockedScheduleTitle: 'Film Bloqué par le Calendrier Pédagogique',
      filmUnlockScheduleDesc: 'Disponible selon le calendrier pédagogique le :',
      filmLockedGenericDesc: 'Contenu programmé selon le calendrier pédagogique.',
      enrollToWatchCta: "S'inscrire pour Visionner",
    },
  }[language] || {
    badge: 'Cinemateca & Biblioteca Crítica',
    title: 'Filmes Recomendados & Leituras Obrigatórias',
    desc: 'Cada uma das 10 etapas do CINELAB possui 1 filme essencial com a URL oficial para assistir ao vídeo decupado pelo professor Tony de Luc e 1 leitura crítica fundamental.',
    lookingForTony: 'Procurando os filmes dirigidos por',
    viewDirectorFilmo: 'Ver Filmografia do Diretor →',
    tabFilms: 'Cinemateca',
    tabReadings: '10 Leituras Obrigatórias',
    loading: 'Carregando acervo pedagógico e URLs dos filmes do CINELAB...',
    allFilms: 'Todos os Filmes',
    courseModules: '10 Módulos do Curso',
    dubbedFilter: '🎙️ Dublados / Áudio PT-BR',
    bonusFilter: '⭐ Vídeos Extras & Bônus',
    filmsCount: 'filmes com indicações de vídeos',
    highlightBonus: 'DESTAQUE CINEMATECA • VÍDEO EXTRA',
    extraPhoto: 'Vídeo Extra de Fotografia & Iluminação (Módulo 05)',
    extraDirect: 'Complemento Especial de Direção & Set (Módulo 08)',
    direction: 'Direção',
    immediateAccess: 'Acesso Imediato ao Vídeo',
    integratedPlayer: 'Player Integrado na Tela',
    watchIndicated: 'Assistir ao Vídeo Indicado',
    studyModule5: 'Estudar com Decupagem no Módulo 05 (Fotografia) →',
    studyModule8: 'Estudar com Decupagem no Módulo 08 (Set) →',
    modulePrefix: 'MÓDULO',
    bonusBadge: 'BÔNUS EXTRA',
    unlocked: 'Liberado',
    unlockedAt: 'Liberado em:',
    editVideo: 'Editar Vídeo',
    originalTitleLabel: 'Título original:',
    audioDubbed: '🎙️ Filme Completo Dublado em Português',
    audioOriginalPt: '🇧🇷 Áudio Original em Português',
    audioSilent: '🎼 Cinema Mudo • Trilha Sonora Orquestral',
    audioSubtitled: '💬 Legendado em Português',
    synopsisTitle: 'Sinopse da Obra:',
    whyWatchTitle: 'Por que o aluno deve assistir:',
    observeTitle: 'O que observar na cena:',
    videoBlockTitle: 'Vídeo Indicado do Módulo',
    watchVideoBtn: 'Assistir ao Vídeo',
    urlInConfig: 'URL do vídeo em configuração pelo corpo docente.',
    viewModule5: 'Ver Módulo 05 (Fotografia)',
    viewModule8: 'Ver Módulo 08 (Set)',
    viewFullModule: 'Ver Módulo Completo',
    readingSummaryTitle: 'Resumo Crítico da Obra:',
    whyReadTitle: 'Por que o realizador deve ler:',
    accessReadingBtn: 'Acessar Leitura',
    viewInModuleBtn: 'Ver no Módulo →',
    optionsStudyTitle: 'Opções de Estudo / Cenas / Streaming Oficial:',
    langBarTitle: 'Acessibilidade Multilíngue (Dublagem & Legendas):',
    audioTrackTitle: 'Áudio / Versão:',
    subtitlesTitle: 'Legendas na sua Língua (CC):',
    subtitlesNotice: 'O player integrado carrega as legendas automaticamente na língua escolhida. Você também pode clicar no botão [CC] do vídeo para personalizar.',
    subtitlesOff: 'Sem Legenda',
    studentLang: 'Língua do Aluno',
    availableDubbedLabel: 'Dublagem:',
    availableSubtitlesLabel: 'Legendas:',
    subtitlesCcActive: 'Legendas ativadas em:',
    locked: 'Bloqueado',
    filmNoticeVisitor: 'Acesso à Cinemateca: os 10 filmes dos módulos são exclusivos para alunos matriculados. Os 3 Vídeos Extras & Bônus estão liberados para acesso público.',
    filmVisitorLockedTitle: 'Filme Exclusivo para Alunos Matriculados',
    filmVisitorLockedDesc: 'O filme analítico deste módulo e suas orientações pedagógicas são de acesso exclusivo aos alunos matriculados no CINELAB.',
    filmLockedScheduleTitle: 'Filme Bloqueado pelo Cronograma',
    filmUnlockScheduleDesc: 'Disponível conforme o calendário pedagógico em:',
    filmLockedGenericDesc: 'Conteúdo programado para liberação conforme o calendário pedagógico.',
    enrollToWatchCta: 'Fazer Matrícula para Assistir',
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 text-neutral-200 space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-mono font-medium uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5" /> {tFR.badge}
        </div>
        <h1 className="text-3xl sm:text-4xl font-display font-extrabold text-white">
          {tFR.title}
        </h1>
        <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
          {tFR.desc}
        </p>

        {/* Quick link banner to Director's Filmography */}
        <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 max-w-xl mx-auto flex items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-amber-300">
            <Film className="w-4 h-4 text-amber-400 shrink-0" />
            <span className="text-neutral-200">
              {tFR.lookingForTony} <strong>Tony de Luc</strong>?
            </span>
          </div>
          <button
            onClick={() => onNavigate('filmografia')}
            className="px-3 py-1 rounded-lg bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-[11px] font-mono shrink-0 transition-colors cursor-pointer"
          >
            {tFR.viewDirectorFilmo}
          </button>
        </div>

        {!isLoggedIn && (
          <div className="p-3.5 rounded-xl bg-amber-950/30 border border-amber-800/40 text-xs text-amber-200 max-w-2xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 mt-3">
            <div className="flex items-center gap-2 text-left">
              <Lock className="w-4 h-4 text-amber-400 shrink-0" />
              <span>{tFR.filmNoticeVisitor}</span>
            </div>
            <button
              onClick={() => onNavigate('matricula')}
              className="shrink-0 px-3.5 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer shadow-md shadow-amber-500/20"
            >
              {tFR.enrollToWatchCta}
            </button>
          </div>
        )}
      </div>

      {/* Tabs */}
      <div className="flex justify-center">
        <div className="p-1.5 rounded-2xl bg-neutral-900 border border-neutral-800 flex items-center gap-2">
          <button
            onClick={() => setActiveTab('films')}
            className={`px-5 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer ${
              activeTab === 'films'
                ? 'bg-amber-500 text-neutral-950 font-bold shadow-md shadow-amber-500/20'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            <Film className="w-4 h-4" />
            <span>{tFR.tabFilms} ({films.length})</span>
          </button>
          <button
            onClick={() => setActiveTab('readings')}
            className={`px-5 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer ${
              activeTab === 'readings'
                ? 'bg-amber-500 text-neutral-950 font-bold shadow-md shadow-amber-500/20'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>{tFR.tabReadings}</span>
          </button>
        </div>
      </div>

      {loading ? (
        <div className="py-20 text-center text-neutral-500 font-mono text-xs">
          {tFR.loading}
        </div>
      ) : activeTab === 'films' ? (
        <div className="space-y-6">
          {/* Sub-filtros e Destaque */}
          {(() => {
            const bonusFilmsList = films.filter((f) => f.isBonus || f.moduleId === 0);
            const dubbedOrPtFilmsList = films.filter(
              (f) => f.audioTrack === 'dublado_pt' || f.audioTrack === 'original_pt' || f.title.toLowerCase().includes('dublad')
            );
            const displayedFilms = films.filter((f) => {
              if (filmFilter === 'curriculum') return !f.isBonus && f.moduleId > 0;
              if (filmFilter === 'bonus') return f.isBonus || f.moduleId === 0;
              if (filmFilter === 'dublado') {
                return f.audioTrack === 'dublado_pt' || f.audioTrack === 'original_pt' || f.title.toLowerCase().includes('dublad');
              }
              return true;
            });

            return (
              <>
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div className="flex flex-wrap items-center gap-2">
                    <button
                      onClick={() => setFilmFilter('all')}
                      className={`px-3.5 py-1.5 rounded-xl text-xs font-mono font-semibold transition-all cursor-pointer ${
                        filmFilter === 'all'
                          ? 'bg-amber-500 text-neutral-950 font-bold shadow'
                          : 'bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white'
                      }`}
                    >
                      {tFR.allFilms} ({films.length})
                    </button>
                    <button
                      onClick={() => setFilmFilter('curriculum')}
                      className={`px-3.5 py-1.5 rounded-xl text-xs font-mono font-semibold transition-all cursor-pointer ${
                        filmFilter === 'curriculum'
                          ? 'bg-amber-500 text-neutral-950 font-bold shadow'
                          : 'bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white'
                      }`}
                    >
                      {tFR.courseModules}
                    </button>
                    <button
                      onClick={() => setFilmFilter('dublado')}
                      className={`px-3.5 py-1.5 rounded-xl text-xs font-mono font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                        filmFilter === 'dublado'
                          ? 'bg-cyan-500 text-neutral-950 font-bold shadow'
                          : 'bg-neutral-900 border border-cyan-500/30 text-cyan-300 hover:bg-neutral-800'
                      }`}
                    >
                      <Volume2 className="w-3.5 h-3.5 text-cyan-400" />
                      <span>{tFR.dubbedFilter} ({dubbedOrPtFilmsList.length})</span>
                    </button>
                    <button
                      onClick={() => setFilmFilter('bonus')}
                      className={`px-3.5 py-1.5 rounded-xl text-xs font-mono font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                        filmFilter === 'bonus'
                          ? 'bg-amber-500 text-neutral-950 font-bold shadow'
                          : 'bg-neutral-900 border border-amber-500/30 text-amber-300 hover:bg-neutral-800'
                      }`}
                    >
                      <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                      <span>{tFR.bonusFilter} ({bonusFilmsList.length})</span>
                    </button>
                  </div>

                  <span className="text-xs font-mono text-neutral-500">
                    {displayedFilms.length} {tFR.filmsCount}
                  </span>
                </div>

                {/* Banner de Destaque da Cinemateca para Vídeos Extras & Bônus */}
                {filmFilter !== 'curriculum' && bonusFilmsList.length > 0 && (
                  <div className="space-y-4">
                    {bonusFilmsList.map((bFilm) => {
                      const tbFilm = getFilmTranslation(bFilm);
                      return (
                      <div
                        key={bFilm.id}
                        className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-neutral-900 via-neutral-900 to-amber-950/30 border-2 border-amber-500/40 shadow-2xl relative overflow-hidden space-y-4"
                      >
                        <div className="absolute -top-12 -right-12 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="px-3 py-1 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 font-mono text-xs font-bold flex items-center gap-1.5">
                              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                              <span>{tbFilm.badge || bFilm.badge || tFR.highlightBonus}</span>
                            </span>
                            {(tbFilm.audioTrackLabel || bFilm.audioTrackLabel) && (
                              <span className="px-2.5 py-0.5 rounded-full bg-cyan-950/70 border border-cyan-500/40 text-cyan-300 font-mono text-xs font-semibold flex items-center gap-1">
                                <Volume2 className="w-3 h-3 text-cyan-400" />
                                <span>{tbFilm.audioTrackLabel || bFilm.audioTrackLabel}</span>
                              </span>
                            )}
                          </div>
                          <span className="text-xs font-mono text-amber-400 font-semibold">
                            {bFilm.relatedModuleId === 5 ? tFR.extraPhoto : tFR.extraDirect}
                          </span>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-2">
                          <div className="lg:col-span-2 space-y-2">
                            <h3 className="text-2xl sm:text-3xl font-bold text-white font-display">
                              {tbFilm.title}
                              {bFilm.originalTitle && bFilm.originalTitle !== tbFilm.title && (
                                <span className="text-neutral-400 font-normal text-lg sm:text-xl ml-2 italic">
                                  ({bFilm.originalTitle})
                                </span>
                              )}
                            </h3>
                            <p className="text-xs font-mono text-amber-300">
                              {tFR.direction}: {bFilm.director} • {bFilm.year} • {bFilm.country || 'China / Hong Kong'} • {bFilm.duration || `${bFilm.durationMinutes || 99} min`}
                            </p>
                            <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed pt-1">
                              {tbFilm.whyWatch || bFilm.whyWatch}
                            </p>
                          </div>

                          <div className="flex flex-col justify-between p-4 rounded-2xl bg-neutral-950/80 border border-neutral-800 space-y-3">
                            <div>
                              <span className="text-[11px] font-mono text-neutral-400 block uppercase font-bold mb-1">
                                {tFR.immediateAccess}
                              </span>
                              <span className="text-xs text-white font-medium block">
                                {bFilm.platform || bFilm.streamingPlatform || 'YouTube'}
                              </span>
                            </div>

                            {/* Inline player for Bonus Film */}
                            {(() => {
                              const isBonusInline = inlinePlayerFilmId === bFilm.id;
                              if (!isBonusInline) return null;

                              const chosenOpt = bFilm.videoOptions?.find(
                                (opt) => opt.id === (inlineSelectedOptions[bFilm.id] || bFilm.videoOptions?.[0]?.id)
                              );
                              const currentUrl = chosenOpt?.url || bFilm.watchUrl || bFilm.streamingUrl || '';
                              const currentSub = inlineSelectedSubtitles[bFilm.id] || (language === 'en' ? 'en' : language === 'es' ? 'es' : language === 'fr' ? 'fr' : 'pt');

                              let effectiveUrl = currentUrl;
                              let bEmbed = getEmbedInfo(effectiveUrl, currentSub);
                              if (!bEmbed || !bEmbed.isEmbeddable) {
                                const playable = bFilm.videoOptions?.find((o) => !o.isStreaming && getEmbedInfo(o.url)?.isEmbeddable);
                                if (playable) {
                                  effectiveUrl = playable.url;
                                  bEmbed = getEmbedInfo(effectiveUrl, currentSub);
                                } else if (bFilm.watchUrl && getEmbedInfo(bFilm.watchUrl)?.isEmbeddable) {
                                  effectiveUrl = bFilm.watchUrl;
                                  bEmbed = getEmbedInfo(effectiveUrl, currentSub);
                                }
                              }

                              return (
                                <div className="space-y-2 pt-2 border-t border-neutral-800 animate-fadeIn">
                                  <div className="rounded-t-2xl overflow-hidden border border-neutral-800 bg-black aspect-video w-full shadow-2xl relative">
                                    {bEmbed && (bEmbed.type === 'youtube' || bEmbed.type === 'vimeo' || bEmbed.type === 'archive') ? (
                                      <iframe
                                        key={`${bEmbed.embedUrl}-${currentSub}`}
                                        src={bEmbed.embedUrl}
                                        title={bFilm.title}
                                        className="w-full h-full border-0"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                        allowFullScreen
                                      />
                                    ) : (
                                      <video
                                        src={bEmbed?.embedUrl || effectiveUrl}
                                        controls
                                        playsInline
                                        className="w-full h-full object-contain"
                                      >
                                        Seu navegador não suporta a tag de vídeo HTML5.
                                      </video>
                                    )}
                                  </div>

                                  {/* Subtitles directly attached to player */}
                                  <FilmSubtitleTranscriptViewer
                                    filmId={bFilm.id}
                                    selectedSubtitle={currentSub}
                                    onSelectSubtitle={(sub) => setInlineSelectedSubtitle(bFilm.id, sub)}
                                    studentLanguage={language}
                                    filmTitle={bFilm.title}
                                    currentOption={chosenOpt}
                                    activeLineIndex={inlineLineIndices[bFilm.id] || 0}
                                    setActiveLineIndex={(val) => setInlineLineIndex(bFilm.id, val)}
                                    isAutoPlay={inlineAutoPlays[bFilm.id] ?? true}
                                    setIsAutoPlay={(val) => setInlineAutoPlay(bFilm.id, val)}
                                    compact={true}
                                  />

                                  <div className="flex items-center justify-end pt-1">
                                    <button
                                      type="button"
                                      onClick={() => handleOpenFilmModal(bFilm)}
                                      className="px-2.5 py-1 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-mono font-bold flex items-center gap-1 cursor-pointer transition-colors"
                                    >
                                      <Sparkles className="w-3 h-3 text-amber-400" />
                                      <span>Modo Cinema / Roteiro Completo ↗</span>
                                    </button>
                                  </div>
                                </div>
                              );
                            })()}

                            <div className="space-y-2">
                              {(() => {
                                const isBonusInline = inlinePlayerFilmId === bFilm.id;
                                const hasPlayable = getEmbedInfo(bFilm.watchUrl || bFilm.streamingUrl || bFilm.videoOptions?.[0]?.url || '');
                                if (!hasPlayable) return null;

                                return (
                                  <button
                                    type="button"
                                    onClick={() => toggleInlinePlayer(bFilm)}
                                    className={`w-full py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-colors cursor-pointer border ${
                                      isBonusInline
                                        ? 'bg-neutral-800 hover:bg-neutral-700 text-amber-300 border-neutral-700'
                                        : 'bg-amber-500 hover:bg-amber-400 text-neutral-950 border-amber-500 shadow-md shadow-amber-500/20'
                                    }`}
                                  >
                                    <Tv className="w-3.5 h-3.5" />
                                    <span>{isBonusInline ? 'Ocultar Player na Tela' : tFR.integratedPlayer}</span>
                                  </button>
                                );
                              })()}

                              <button
                                type="button"
                                onClick={() => handleOpenFilmModal(bFilm)}
                                className="w-full py-1.5 bg-neutral-900 hover:bg-neutral-800 text-neutral-300 hover:text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer border border-neutral-800"
                              >
                                <Play className="w-3 h-3 text-amber-400" />
                                <span>Modo Cinema / Janela Cheia</span>
                              </button>

                              {(bFilm.watchUrl || bFilm.streamingUrl) && (
                                <a
                                  href={bFilm.watchUrl || bFilm.streamingUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="w-full py-1.5 bg-neutral-800 hover:bg-neutral-700 text-neutral-300 hover:text-white rounded-xl text-xs font-medium flex items-center justify-center gap-1.5 transition-colors cursor-pointer border border-neutral-700"
                                >
                                  <span>{tFR.watchIndicated}</span>
                                  <ExternalLink className="w-3 h-3 text-amber-400" />
                                </a>
                              )}
                              <button
                                onClick={() =>
                                  onNavigate('modulo-detalhe', { moduleId: bFilm.relatedModuleId || 5 })
                                }
                                className="w-full py-1.5 text-neutral-400 hover:text-amber-300 text-xs font-mono transition-colors text-center cursor-pointer"
                              >
                                {bFilm.relatedModuleId === 5 ? tFR.studyModule5 : tFR.studyModule8}
                              </button>
                            </div>
                          </div>
                        </div>
                        </div>
                      );
                    })}
                  </div>
                )}

                {/* Grid dos Filmes */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {displayedFilms.map((film) => {
                    const tFilm = getFilmTranslation(film);
                    const isUnlocked = isFilmUnlocked(film);
                    const videoUrl = film.watchUrl || film.streamingUrl || '';
                    const platformName = film.platform || film.streamingPlatform || 'Online / YouTube';
                    const embed = getEmbedInfo(videoUrl);

                    return (
                      <div
                        key={film.id}
                        className={`p-6 rounded-3xl border transition-all flex flex-col justify-between ${
                          isUnlocked
                            ? 'bg-neutral-900/90 border-neutral-800 hover:border-neutral-700 shadow-xl shadow-black/40'
                            : 'bg-neutral-950 border-neutral-900 opacity-80'
                        } ${film.isBonus || film.moduleId === 0 ? 'border-amber-500/30 ring-1 ring-amber-500/20' : ''}`}
                      >
                        <div className="space-y-4">
                          {/* Badge & Unlock info */}
                          <div className="flex items-center justify-between text-xs font-mono">
                            {film.isBonus || film.moduleId === 0 ? (
                              <span className="px-2.5 py-1 rounded bg-amber-500/20 text-amber-300 border border-amber-500/40 font-bold flex items-center gap-1.5">
                                <Sparkles className="w-3 h-3 text-amber-400" />
                                <span>{tFilm.badge || film.badge || tFR.bonusBadge}</span>
                              </span>
                            ) : (
                              <span className="px-2.5 py-1 rounded bg-amber-500/10 text-amber-400 border border-amber-500/30 font-bold">
                                {tFR.modulePrefix} 0{film.moduleId}
                              </span>
                            )}

                    <div className="flex items-center gap-2">
                      {isAdmin && (
                        <button
                          onClick={() => handleOpenEditModal(film)}
                          className="px-2 py-0.5 rounded bg-neutral-800 hover:bg-neutral-700 text-amber-400 text-[11px] font-mono flex items-center gap-1 border border-neutral-700 transition-colors cursor-pointer"
                          title="Editar URL e dados do filme deste módulo"
                        >
                          <Edit3 className="w-3 h-3" />
                          <span>{tFR.editVideo}</span>
                        </button>
                      )}

                      {isUnlocked ? (
                        <span className="text-emerald-400 flex items-center gap-1">
                          <Unlock className="w-3.5 h-3.5" /> {tFR.unlocked}
                        </span>
                      ) : (
                        <span className="text-amber-500 font-bold flex items-center gap-1 font-mono">
                          <Lock className="w-3.5 h-3.5" /> {!isLoggedIn ? (tFR.locked || 'Bloqueado') : (film.unlockDate ? `${tFR.unlockedAt} ${formatDate(film.unlockDate)}` : (tFR.locked || 'Bloqueado'))}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Film Main Info */}
                  <div>
                    <h3 className="text-xl font-bold text-white font-display leading-tight">{tFilm.title}</h3>
                    {film.originalTitle && film.originalTitle !== tFilm.title && (
                      <p className="text-xs text-neutral-400 italic">{tFR.originalTitleLabel} {film.originalTitle}</p>
                    )}
                    <p className="text-xs font-mono text-amber-300 mt-1">
                      {film.director} • {film.year} • {film.duration || `${film.durationMinutes || 90} min`}
                    </p>

                    {/* Audio & Subtitles Accessibility Badges */}
                    <div className="mt-2.5 flex flex-wrap gap-2 items-center">
                      {(tFilm.audioTrackLabel || film.audioTrackLabel || film.audioTrack) && (
                        <span
                          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-mono font-semibold border ${
                            film.audioTrack === 'dublado_pt'
                              ? 'bg-cyan-950/70 border-cyan-500/50 text-cyan-300 shadow-sm shadow-cyan-950/50'
                              : film.audioTrack === 'original_pt'
                              ? 'bg-emerald-950/70 border-emerald-500/50 text-emerald-300'
                              : film.audioTrack === 'mudo'
                              ? 'bg-amber-950/70 border-amber-500/50 text-amber-300'
                              : 'bg-purple-950/70 border-purple-500/50 text-purple-300'
                          }`}
                        >
                          <Volume2 className="w-3.5 h-3.5 shrink-0" />
                          <span>
                            {tFilm.audioTrackLabel ||
                              film.audioTrackLabel ||
                              (film.audioTrack === 'dublado_pt'
                                ? tFR.audioDubbed
                                : film.audioTrack === 'original_pt'
                                ? tFR.audioOriginalPt
                                : film.audioTrack === 'mudo'
                                ? tFR.audioSilent
                                : tFR.audioSubtitled)}
                          </span>
                        </span>
                      )}

                      {/* Multilingual Subtitles Available Badge */}
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-mono font-semibold bg-neutral-900 border border-neutral-700/80 text-neutral-300">
                        <Subtitles className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                        <span>{tFR.availableSubtitlesLabel}</span>
                        <span className="text-purple-300 font-bold">
                          {film.availableSubtitles && film.availableSubtitles.length > 0
                            ? film.availableSubtitles.map((s) => s.toUpperCase()).join(' • ')
                            : 'PT • EN • ES • FR'}
                        </span>
                      </span>
                    </div>
                  </div>

                  {/* Synopsis */}
                  <div>
                    <span className="text-[11px] font-mono text-neutral-400 block uppercase font-medium">
                      {tFR.synopsisTitle}
                    </span>
                    <p className="text-xs text-neutral-300 leading-relaxed line-clamp-3">{tFilm.synopsis || film.synopsis}</p>
                  </div>

                  {/* Pedagogical Guidance */}
                  <div className="p-3.5 rounded-xl bg-amber-950/20 border-l-2 border-amber-500 text-xs text-amber-100 space-y-1">
                    <strong className="block text-amber-400 font-bold font-mono text-[11px]">
                      {tFR.whyWatchTitle}
                    </strong>
                    <p className="leading-relaxed">{tFilm.whyWatch || film.whyWatch}</p>
                  </div>

                  {/* Observation note if present */}
                  {(tFilm.whatToObserve || film.whatToObserve) && (
                    <div className="p-3 rounded-xl bg-neutral-950 border border-neutral-800/80 text-xs text-neutral-300 space-y-1">
                      <div className="flex items-center gap-1.5 text-neutral-400 font-mono text-[11px]">
                        <Eye className="w-3.5 h-3.5 text-amber-400" />
                        <span className="font-semibold text-neutral-300">{tFR.observeTitle}</span>
                      </div>
                      <p className="text-[11px] text-neutral-400 leading-relaxed">{tFilm.whatToObserve || film.whatToObserve}</p>
                    </div>
                  )}

                  {/* VIDEO URL & STREAMING BLOCK - PLAYER INTEGRADO NA TELA E MODO CINEMA */}
                  <div className="p-4 rounded-2xl bg-neutral-950/90 border border-neutral-800 space-y-3">
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-1.5 text-xs text-amber-400 font-mono font-bold">
                        <Tv className="w-3.5 h-3.5" />
                        <span>{tFR.videoBlockTitle}</span>
                      </div>
                      <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-neutral-900 border border-neutral-800 text-neutral-300">
                        {platformName}
                      </span>
                    </div>

                    {isUnlocked ? (
                      <>
                        {/* PLAYER INTEGRADO DIRETAMENTE NA TELA */}
                        {(() => {
                          const isInlineOpen = inlinePlayerFilmId === film.id;
                          if (!isInlineOpen) return null;

                          const chosenInlineOpt = film.videoOptions?.find(
                            (opt) => opt.id === (inlineSelectedOptions[film.id] || film.videoOptions?.[0]?.id)
                          );
                          const currentInlineUrl = chosenInlineOpt
                            ? chosenInlineOpt.url
                            : (film.watchUrl || film.streamingUrl || '');
                          const currentInlineSub = inlineSelectedSubtitles[film.id] || (language === 'en' ? 'en' : language === 'es' ? 'es' : language === 'fr' ? 'fr' : 'pt');

                          let effectiveInlineUrl = currentInlineUrl;
                          let inlineEmbed = getEmbedInfo(effectiveInlineUrl, currentInlineSub);

                          if (!inlineEmbed || !inlineEmbed.isEmbeddable) {
                            const playableOpt = film.videoOptions?.find((o) => !o.isStreaming && getEmbedInfo(o.url)?.isEmbeddable);
                            if (playableOpt) {
                              effectiveInlineUrl = playableOpt.url;
                              inlineEmbed = getEmbedInfo(effectiveInlineUrl, currentInlineSub);
                            } else if (film.watchUrl && getEmbedInfo(film.watchUrl)?.isEmbeddable) {
                              effectiveInlineUrl = film.watchUrl;
                              inlineEmbed = getEmbedInfo(effectiveInlineUrl, currentInlineSub);
                            }
                          }

                          return (
                            <div className="space-y-3 pt-2 animate-fadeIn border-t border-neutral-800">
                              {/* Streaming banner if applicable */}
                              {chosenInlineOpt?.isStreaming && (
                                <div className="p-2.5 rounded-xl bg-cyan-950/70 border border-cyan-500/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs">
                                  <div className="flex items-center gap-1.5 text-cyan-300">
                                    <Tv className="w-3.5 h-3.5 shrink-0" />
                                    <span>Longa no {chosenInlineOpt.platformName || 'Streaming'}. Reproduzindo cena didática abaixo:</span>
                                  </div>
                                  <a
                                    href={chosenInlineOpt.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="px-2.5 py-1 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-neutral-950 font-bold text-[11px] shrink-0"
                                  >
                                    Abrir no {chosenInlineOpt.platformName}
                                  </a>
                                </div>
                              )}

                              {/* 16:9 Video Container */}
                              <div className="rounded-t-2xl overflow-hidden border border-neutral-800 bg-black aspect-video w-full shadow-2xl relative">
                                {inlineEmbed && (inlineEmbed.type === 'youtube' || inlineEmbed.type === 'vimeo' || inlineEmbed.type === 'archive') ? (
                                  <iframe
                                    key={`${inlineEmbed.embedUrl}-${currentInlineSub}`}
                                    src={inlineEmbed.embedUrl}
                                    title={film.title}
                                    className="w-full h-full border-0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                    allowFullScreen
                                  />
                                ) : (
                                  <video
                                    src={inlineEmbed?.embedUrl || effectiveInlineUrl}
                                    controls
                                    playsInline
                                    className="w-full h-full object-contain"
                                  >
                                    Seu navegador não suporta a tag de vídeo HTML5.
                                  </video>
                                )}
                              </div>

                              {/* Subtitles directly attached to the bottom edge of the player */}
                              <FilmSubtitleTranscriptViewer
                                filmId={film.id}
                                selectedSubtitle={currentInlineSub}
                                onSelectSubtitle={(sub) => setInlineSelectedSubtitle(film.id, sub)}
                                studentLanguage={language}
                                filmTitle={film.title}
                                currentOption={chosenInlineOpt}
                                activeLineIndex={inlineLineIndices[film.id] || 0}
                                setActiveLineIndex={(val) => setInlineLineIndex(film.id, val)}
                                isAutoPlay={inlineAutoPlays[film.id] ?? true}
                                setIsAutoPlay={(val) => setInlineAutoPlay(film.id, val)}
                                compact={true}
                              />

                              {/* Options selector if multiple */}
                              {film.videoOptions && film.videoOptions.length > 1 && (
                                <div className="space-y-1.5 pt-1">
                                  <span className="text-[10px] font-mono text-neutral-400 uppercase font-bold">Opções de Estudo / Cenas:</span>
                                  <div className="flex flex-wrap gap-1.5">
                                    {film.videoOptions.map((opt) => {
                                      const isSelected = (inlineSelectedOptions[film.id] || film.videoOptions?.[0]?.id) === opt.id;
                                      return (
                                        <button
                                          key={opt.id}
                                          type="button"
                                          onClick={() => setInlineSelectedOptions((prev) => ({ ...prev, [film.id]: opt.id }))}
                                          className={`px-2.5 py-1 rounded-lg text-[11px] font-mono transition-colors cursor-pointer flex items-center gap-1 ${
                                            isSelected
                                              ? 'bg-amber-500 text-neutral-950 font-bold shadow'
                                              : 'bg-neutral-900 hover:bg-neutral-800 text-neutral-300 border border-neutral-800'
                                          }`}
                                        >
                                          <span>{opt.label}</span>
                                        </button>
                                      );
                                    })}
                                  </div>
                                </div>
                              )}

                              {/* Cinema Mode Fullscreen Expansion Button */}
                              <div className="flex items-center justify-end pt-1">
                                <button
                                  type="button"
                                  onClick={() => handleOpenFilmModal(film)}
                                  className="px-3 py-1.5 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-mono font-bold flex items-center gap-1.5 cursor-pointer transition-colors"
                                  title="Abrir no Modo Cinema com decupagem e roteiro sincronizado"
                                >
                                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                                  <span>Modo Cinema / Roteiro Completo ↗</span>
                                </button>
                              </div>
                            </div>
                          );
                        })()}

                        {videoUrl ? (
                          <div className="space-y-2">
                            {/* URL display row */}
                            <div className="flex items-center gap-2 p-2 rounded-xl bg-neutral-900/90 border border-neutral-800 font-mono text-[11px] text-neutral-300">
                              <span className="text-amber-500 shrink-0 font-bold">URL:</span>
                              <span className="truncate flex-1 select-all text-neutral-200">{videoUrl}</span>
                              <button
                                type="button"
                                onClick={() => handleCopyUrl(videoUrl)}
                                className="p-1 rounded hover:bg-neutral-800 text-neutral-400 hover:text-amber-400 transition-colors cursor-pointer shrink-0"
                                title="Copiar URL do vídeo"
                              >
                                {copiedUrl === videoUrl ? (
                                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                                ) : (
                                  <Copy className="w-3.5 h-3.5" />
                                )}
                              </button>
                            </div>

                            {/* Action buttons */}
                            <div className="flex flex-wrap items-center gap-2 pt-1">
                              <button
                                type="button"
                                onClick={() => toggleInlinePlayer(film)}
                                className={`flex-1 min-w-[140px] px-3.5 py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer text-center ${
                                  inlinePlayerFilmId === film.id
                                    ? 'bg-neutral-800 hover:bg-neutral-700 text-amber-300 border border-neutral-700 shadow-md'
                                    : 'bg-amber-500 hover:bg-amber-400 text-neutral-950 shadow-md shadow-amber-500/20'
                                }`}
                              >
                                <Play className={`w-3.5 h-3.5 ${inlinePlayerFilmId === film.id ? 'text-amber-400' : 'fill-current'}`} />
                                <span>{inlinePlayerFilmId === film.id ? 'Ocultar Player' : tFR.integratedPlayer}</span>
                              </button>

                              <button
                                type="button"
                                onClick={() => handleOpenFilmModal(film)}
                                className="px-3.5 py-2.5 bg-neutral-800 hover:bg-neutral-700 text-neutral-200 hover:text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer border border-neutral-700"
                                title="Abrir no Modo Cinema com Decupagem e Roteiro"
                              >
                                <Tv className="w-3.5 h-3.5 text-amber-400" />
                                <span className="hidden sm:inline">Modo Cinema</span>
                              </button>

                              <a
                                href={videoUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-3 py-2.5 bg-neutral-900 hover:bg-neutral-800 text-neutral-300 hover:text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer border border-neutral-800"
                                title="Abrir em Nova Aba"
                              >
                                <ExternalLink className="w-3.5 h-3.5 text-amber-400" />
                                <span className="hidden sm:inline">Nova Aba</span>
                              </a>
                            </div>
                          </div>
                        ) : (
                          <div className="p-2.5 rounded-xl bg-neutral-900 text-center text-xs text-neutral-500 font-mono">
                            {tFR.urlInConfig}
                          </div>
                        )}
                      </>
                    ) : (
                      <div className="p-5 rounded-2xl bg-neutral-900/60 border border-neutral-800 text-center space-y-3">
                        <div className="w-12 h-12 rounded-full bg-neutral-900 border border-neutral-700/80 flex items-center justify-center text-amber-400 mx-auto shadow-md">
                          <Lock className="w-6 h-6" />
                        </div>
                        <div className="space-y-1">
                          <h4 className="text-xs font-bold text-white font-mono uppercase tracking-wide">
                            {!isLoggedIn ? tFR.filmVisitorLockedTitle : tFR.filmLockedScheduleTitle}
                          </h4>
                          <p className="text-[11px] text-neutral-400 max-w-sm mx-auto leading-relaxed">
                            {!isLoggedIn
                              ? tFR.filmVisitorLockedDesc
                              : film.unlockDate
                              ? `${tFR.filmUnlockScheduleDesc} ${formatDate(film.unlockDate)}.`
                              : tFR.filmLockedGenericDesc}
                          </p>
                        </div>
                        {!isLoggedIn && (
                          <div className="pt-1">
                            <button
                              type="button"
                              onClick={() => onNavigate('matricula')}
                              className="inline-flex items-center gap-2 px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-xs uppercase tracking-wider transition-all shadow-md shadow-amber-500/20 cursor-pointer"
                            >
                              {tFR.enrollToWatchCta}
                            </button>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                {/* Footer link to Module */}
                <div className="pt-4 border-t border-neutral-800/80 mt-4 flex items-center justify-between text-xs font-mono">
                  <span className="text-neutral-500">
                    {film.isBonus || film.moduleId === 0
                      ? film.relatedModuleId === 5
                        ? tFR.extraPhoto
                        : tFR.extraDirect
                      : `${tFR.modulePrefix || 'Módulo'} 0${film.moduleId}`}
                  </span>
                  <button
                    onClick={() =>
                      onNavigate('modulo-detalhe', {
                        moduleId: film.relatedModuleId || (film.moduleId > 0 ? film.moduleId : 5),
                      })
                    }
                    className="text-amber-400 hover:text-amber-300 font-bold flex items-center gap-1 cursor-pointer transition-colors"
                  >
                    <span>
                      {film.isBonus || film.moduleId === 0
                        ? film.relatedModuleId === 5
                          ? tFR.viewModule5
                          : tFR.viewModule8
                        : tFR.viewFullModule}
                    </span>
                    <span>→</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </>
    );
  })()}
</div>
) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {readings.map((reading) => {
            const tReading = getReadingTranslation(reading);
            const isUnlocked = reading.isUnlocked ?? true;

            return (
              <div
                key={reading.id}
                className={`p-6 rounded-3xl border transition-all flex flex-col justify-between ${
                  isUnlocked
                    ? 'bg-neutral-900/90 border-neutral-800 hover:border-neutral-700 shadow-xl shadow-black/40'
                    : 'bg-neutral-950 border-neutral-900 opacity-60'
                }`}
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="px-2.5 py-1 rounded bg-amber-500/10 text-amber-400 border border-amber-500/30 font-bold">
                      {tFR.modulePrefix} 0{reading.moduleId}
                    </span>
                    <span className="text-neutral-400 flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-amber-400" /> ~{reading.estimatedMinutes || 45} min
                    </span>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-white font-display">{tReading.title || reading.title}</h3>
                    <p className="text-xs text-amber-300 font-medium">{tReading.author || reading.author}</p>
                    {(tReading.suggestedChapter || reading.pagesOrChapter) && (
                      <span className="inline-block mt-1 text-[11px] font-mono px-2 py-0.5 rounded bg-neutral-950 text-neutral-400 border border-neutral-800">
                        {tReading.suggestedChapter || reading.pagesOrChapter}
                      </span>
                    )}
                  </div>

                  <div>
                    <span className="text-[11px] font-mono text-neutral-400 block uppercase font-medium">
                      {tFR.readingSummaryTitle}
                    </span>
                    <p className="text-xs text-neutral-300 leading-relaxed line-clamp-3">{tReading.summary || reading.summary}</p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-amber-950/20 border-l-2 border-amber-500 text-xs text-amber-100 space-y-1">
                    <strong className="block text-amber-400 font-bold font-mono text-[11px]">
                      {tFR.whyReadTitle}
                    </strong>
                    <p className="leading-relaxed">{tReading.whyRead || reading.whyRead}</p>
                  </div>
                </div>

                <div className="pt-4 border-t border-neutral-800 mt-4 flex items-center justify-between gap-2">
                  <span className="text-[11px] font-mono text-neutral-400 truncate">
                    {reading.bookOrArticle || 'Texto Crítico de Cinema'}
                  </span>
                  {isUnlocked ? (
                    <button
                      type="button"
                      onClick={() => setActiveReadingModal(reading)}
                      className="px-3.5 py-1.5 bg-amber-500 hover:bg-amber-400 text-neutral-950 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all shadow-md shadow-amber-500/10 cursor-pointer shrink-0 active:scale-95"
                      title="Abrir leitura obrigatória comentada na plataforma"
                    >
                      <BookOpen className="w-3.5 h-3.5" />
                      <span>{tFR.accessReadingBtn}</span>
                    </button>
                  ) : (
                    <button
                      onClick={() => onNavigate('modulo-detalhe', { moduleId: reading.moduleId })}
                      className="text-xs text-neutral-400 hover:text-white font-mono"
                    >
                      {tFR.viewInModuleBtn}
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL: PLAYER DE CINEMA INTEGRADO (ASSISTIR AO VÍDEO NO PRÓPRIO CINELAB)  */}
      {/* ========================================================================= */}
      {playingFilm && (() => {
        const tPlay = getFilmTranslation(playingFilm);
        return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-black/90 backdrop-blur-md animate-fadeIn">
          <div className="w-full max-w-4xl bg-neutral-950 border border-neutral-800 rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[94vh]">
            {/* Modal Header - Fixed at Top */}
            <div className="p-4 sm:p-5 border-b border-neutral-800 flex items-center justify-between bg-neutral-900/90 shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
                  <Play className="w-4 h-4 fill-current" />
                </div>
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-[10px] font-mono uppercase text-amber-400 font-bold">
                      {playingFilm.isBonus || playingFilm.moduleId === 0
                        ? (tPlay.badge || playingFilm.badge || 'BÔNUS EXTRA')
                        : `Cinemateca • Módulo 0${playingFilm.moduleId}`}
                    </span>
                    {(() => {
                      const chosenOpt = playingFilm.videoOptions?.find(
                        (opt) => opt.id === (selectedOptionId || playingFilm.videoOptions?.[0]?.id)
                      );
                      const displayDur = chosenOpt?.duration || playingFilm.duration;
                      if (!displayDur) return null;
                      return (
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-semibold border border-amber-500/30">
                          ⏱️ {displayDur}
                        </span>
                      );
                    })()}
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-white font-display">
                    {tPlay.title || playingFilm.title}
                  </h3>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setPlayingFilm(null)}
                className="p-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-300 hover:text-white transition-colors cursor-pointer shrink-0"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body - Fully Scrollable Container */}
            <div className="flex-1 overflow-y-auto min-h-0">
              {/* Video Player Area */}
              {(() => {
                const chosenOpt = playingFilm.videoOptions?.find(
                  (opt) => opt.id === (selectedOptionId || playingFilm.videoOptions?.[0]?.id)
                );
                const currentUrl = chosenOpt
                  ? chosenOpt.url
                  : (activeVideoSource === 'streaming' && playingFilm.streamingUrl
                      ? playingFilm.streamingUrl
                      : (playingFilm.watchUrl || playingFilm.streamingUrl));
                const isStreaming = chosenOpt?.isStreaming || false;

                let effectiveUrl = currentUrl;
                let embed = getEmbedInfo(effectiveUrl, selectedSubtitle);

                // If currently selected option has no embed or isn't embeddable, resolve to first playable option or watchUrl
                if (!embed || !embed.isEmbeddable) {
                  const playableOpt = playingFilm.videoOptions?.find((o) => !o.isStreaming && getEmbedInfo(o.url)?.isEmbeddable);
                  if (playableOpt) {
                    effectiveUrl = playableOpt.url;
                    embed = getEmbedInfo(effectiveUrl, selectedSubtitle);
                  } else if (playingFilm.watchUrl && getEmbedInfo(playingFilm.watchUrl)?.isEmbeddable) {
                    effectiveUrl = playingFilm.watchUrl;
                    embed = getEmbedInfo(effectiveUrl, selectedSubtitle);
                  }
                }

                return (
                  <div>
                    {/* Source and Direct Link Header */}
                    <div className="px-4 py-2 bg-neutral-900 border-b border-neutral-800 flex items-center justify-between flex-wrap gap-2 text-xs">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                        <span className="text-neutral-400 font-mono text-[11px]">Fonte de Reprodução:</span>
                        <span className="font-semibold text-white text-[11px]">
                          {chosenOpt?.platformName || (effectiveUrl?.includes('youtube') ? 'YouTube HD' : 'Acervo Digital')}
                        </span>
                      </div>
                      {effectiveUrl && (
                        <a
                          href={effectiveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-amber-300 hover:text-amber-200 transition font-mono text-[11px] font-medium"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                          Abrir em Nova Aba
                        </a>
                      )}
                    </div>

                    {/* Streaming Notice Banner when active */}
                    {isStreaming && (
                      <div className="px-4 py-3 bg-gradient-to-r from-neutral-950 via-cyan-950/60 to-neutral-950 border-b border-cyan-500/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
                        <div className="flex items-center gap-2">
                          <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse shrink-0" />
                          <div>
                            <span className="font-semibold text-white">Longa-Metragem no {chosenOpt?.platformName || 'Streaming Oficial'}:</span>
                            <span className="text-neutral-300 ml-1.5 hidden sm:inline">Disponível em catálogo comercial ({chosenOpt?.duration || '116 min'}). Player integrado abaixo executando cena em estudo:</span>
                          </div>
                        </div>
                        <a
                          href={currentUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-neutral-950 font-bold text-xs font-mono transition-all shrink-0 cursor-pointer shadow-md shadow-cyan-500/20"
                        >
                          <span>Abrir no {chosenOpt?.platformName || 'Streaming'}</span>
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      </div>
                    )}

                    {/* 16:9 Video Player Screen */}
                    <div className="bg-black relative aspect-video w-full flex items-center justify-center group overflow-hidden border-b border-neutral-800">
                      {embed && (embed.type === 'youtube' || embed.type === 'vimeo' || embed.type === 'archive') ? (
                        <div className="relative w-full h-full">
                          <iframe
                            key={`${embed.embedUrl}-${selectedSubtitle}`}
                            src={embed.embedUrl}
                            title={playingFilm.title}
                            className="w-full h-full border-0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowFullScreen
                          />
                        </div>
                      ) : embed && embed.type === 'direct' ? (
                        <div className="relative w-full h-full">
                          <video
                            src={embed.embedUrl || effectiveUrl}
                            controls
                            playsInline
                            className="w-full h-full object-contain"
                          >
                            Seu navegador não suporta a tag de vídeo HTML5.
                          </video>
                        </div>
                      ) : (
                        <div className="text-center p-8 space-y-4 max-w-md">
                          <div className="w-12 h-12 rounded-2xl bg-neutral-800 flex items-center justify-center mx-auto text-amber-400">
                            <Tv className="w-6 h-6" />
                          </div>
                          <div>
                            <h4 className="text-white font-bold text-sm">Transmissão em Plataforma Externa</h4>
                            <p className="text-xs text-neutral-400 mt-1">Este conteúdo é hospedado em catálogo comercial com proteção DRM. Clique para abrir diretamente na plataforma oficial:</p>
                          </div>
                          <a
                            href={currentUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-xs shadow-lg transition-colors cursor-pointer"
                          >
                            <Play className="w-4 h-4 fill-current" />
                            <span>Abrir Filme na Plataforma</span>
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })()}

              {/* Multilingual Pedagogical Subtitle & Transcript Viewer DIRECTLY UNDER THE VIDEO */}
              {(() => {
                const chosenOpt = playingFilm.videoOptions?.find(
                  (opt) => opt.id === (selectedOptionId || playingFilm.videoOptions?.[0]?.id)
                );
                const isStreaming = chosenOpt?.isStreaming || false;

                return (
                  <div className="p-3 sm:p-4 bg-neutral-950 border-b border-neutral-800">
                    <FilmSubtitleTranscriptViewer
                      filmId={playingFilm.id}
                      selectedSubtitle={selectedSubtitle}
                      onSelectSubtitle={setSelectedSubtitle}
                      studentLanguage={language}
                      filmTitle={playingFilm.title}
                      isStreaming={isStreaming}
                      streamingPlatform={chosenOpt?.platformName || playingFilm.streamingPlatform}
                      currentOption={chosenOpt}
                      activeLineIndex={modalLineIndex}
                      setActiveLineIndex={setModalLineIndex}
                      isAutoPlay={isModalAutoPlay}
                      setIsAutoPlay={setIsModalAutoPlay}
                    />
                  </div>
                );
              })()}

              {/* Server / Stream / Video Option Selector Bar */}
              {playingFilm.videoOptions && playingFilm.videoOptions.length > 0 ? (
                <div className="px-4 py-2.5 bg-neutral-900 border-b border-neutral-800 flex flex-wrap items-center justify-between gap-2 text-xs font-mono">
                  <span className="text-neutral-400 text-[11px] flex items-center gap-1.5 font-semibold">
                    <Tv className="w-3.5 h-3.5 text-amber-400" />
                    <span>Opções de Estudo / Cenas / Streaming Oficial:</span>
                  </span>
                  <div className="flex flex-wrap items-center gap-2">
                    {playingFilm.videoOptions.map((opt) => {
                      const isSelected = (selectedOptionId || playingFilm.videoOptions?.[0]?.id) === opt.id;
                      return (
                        <button
                          key={opt.id}
                          type="button"
                          onClick={() => setSelectedOptionId(opt.id)}
                          className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors cursor-pointer flex items-center gap-1.5 ${
                            isSelected
                              ? 'bg-amber-500 text-neutral-950 font-bold shadow'
                              : 'bg-neutral-800 text-neutral-300 hover:text-white'
                          }`}
                        >
                          <span>{opt.label}</span>
                          {opt.badge && (
                            <span
                              className={`text-[10px] px-1.5 py-0.2 rounded font-mono ${
                                opt.isStreaming ? 'bg-cyan-950 text-cyan-300 border border-cyan-800' : 'bg-neutral-900 text-amber-300'
                              }`}
                            >
                              {opt.badge}
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ) : Boolean(
                playingFilm.watchUrl &&
                playingFilm.streamingUrl &&
                playingFilm.watchUrl !== playingFilm.streamingUrl
              ) ? (
                <div className="px-4 py-2.5 bg-neutral-900 border-b border-neutral-800 flex flex-wrap items-center justify-between gap-2 text-xs font-mono">
                  <span className="text-neutral-400 text-[11px] flex items-center gap-1.5 font-semibold">
                    <Tv className="w-3.5 h-3.5 text-amber-400" />
                    <span>Opções de Servidor / Transmissão:</span>
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setActiveVideoSource('watch')}
                      className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                        activeVideoSource === 'watch'
                          ? 'bg-amber-500 text-neutral-950 font-bold shadow'
                          : 'bg-neutral-800 text-neutral-300 hover:text-white'
                      }`}
                    >
                      Servidor 1 ({playingFilm.platform?.split('/')[0]?.trim() || 'Principal'})
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveVideoSource('streaming')}
                      className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                        activeVideoSource === 'streaming'
                          ? 'bg-amber-500 text-neutral-950 font-bold shadow'
                          : 'bg-neutral-800 text-neutral-300 hover:text-white'
                      }`}
                    >
                      Servidor 2 ({playingFilm.streamingPlatform?.split('/')[0]?.trim() || 'Alternativo'})
                    </button>
                  </div>
                </div>
              ) : null}

              {/* Audio Track Info Bar */}
              <div className="px-4 py-3 bg-neutral-950 border-b border-neutral-800 flex flex-wrap items-center justify-between gap-3 text-xs">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-neutral-400 font-mono text-[11px] flex items-center gap-1.5 font-semibold">
                    <Volume2 className="w-3.5 h-3.5 text-cyan-400" />
                    <span>{tFR.audioTrackTitle}</span>
                  </span>

                  {playingFilm.videoOptions && playingFilm.videoOptions.some((o) => o.audioLang || o.isDubbed) ? (
                    <div className="flex flex-wrap items-center gap-1.5">
                      {playingFilm.videoOptions.map((opt) => {
                        const isCurrentOpt = (selectedOptionId || playingFilm.videoOptions?.[0]?.id) === opt.id;
                        return (
                          <button
                            key={opt.id}
                            type="button"
                            onClick={() => setSelectedOptionId(opt.id)}
                            className={`px-2.5 py-1 rounded-md text-[11px] font-mono transition-all cursor-pointer flex items-center gap-1 ${
                              isCurrentOpt
                                ? 'bg-cyan-500 text-neutral-950 font-bold shadow-sm'
                                : 'bg-neutral-800 text-neutral-300 hover:text-white hover:bg-neutral-700'
                            }`}
                          >
                            <span>{opt.isDubbed ? '🎙️ Dublado' : '🔊 Original'}</span>
                            {opt.audioLang && <span className="opacity-80">({opt.audioLang.toUpperCase()})</span>}
                          </button>
                        );
                      })}
                    </div>
                  ) : (
                    <span className="px-2.5 py-1 rounded-md bg-neutral-900 border border-neutral-800 text-cyan-300 font-mono text-[11px] font-semibold flex items-center gap-1">
                      <span>
                        {playingFilm.audioTrack === 'dublado_pt'
                          ? '🎙️ Dublado em Português (PT-BR)'
                          : playingFilm.audioTrack === 'original_pt'
                          ? '🇧🇷 Áudio Original em Português'
                          : playingFilm.audioTrack === 'mudo'
                          ? '🎼 Cinema Mudo • Trilha Sonora'
                          : '🔊 Áudio Original Estrangeiro'}
                      </span>
                    </span>
                  )}
                </div>
              </div>

              {/* Modal Bottom / Pedagogical Insights */}
              <div className="p-4 sm:p-6 space-y-4 bg-neutral-900/50">
                <div className="flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
                  <div className="flex flex-wrap items-center gap-2 text-neutral-400">
                    <span>
                      Direção: <strong className="text-white">{playingFilm.director}</strong> • {playingFilm.year}
                    </span>
                    {(() => {
                      const chosenOpt = playingFilm.videoOptions?.find(
                        (opt) => opt.id === (selectedOptionId || playingFilm.videoOptions?.[0]?.id)
                      );
                      if (chosenOpt?.duration) {
                        return (
                          <span className="px-2 py-0.5 rounded bg-amber-500/10 text-amber-300 font-mono text-[11px] border border-amber-500/30">
                            ⏱️ Cena em reprodução: <strong>{chosenOpt.duration}</strong>
                          </span>
                        );
                      }
                      if (playingFilm.duration) {
                        return (
                          <span className="px-2 py-0.5 rounded bg-neutral-800 text-neutral-300 font-mono text-[11px] border border-neutral-700">
                            ⏱️ {playingFilm.duration}
                          </span>
                        );
                      }
                      return null;
                    })()}
                  </div>

                  <div className="flex items-center gap-2">
                    {(() => {
                      const chosenOpt = playingFilm.videoOptions?.find(
                        (opt) => opt.id === (selectedOptionId || playingFilm.videoOptions?.[0]?.id)
                      );
                      const currentUrl = chosenOpt
                        ? chosenOpt.url
                        : (activeVideoSource === 'streaming' && playingFilm.streamingUrl
                            ? playingFilm.streamingUrl
                            : (playingFilm.watchUrl || playingFilm.streamingUrl));
                      const isStreaming = chosenOpt?.isStreaming || false;

                      return (
                        <a
                          href={currentUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`px-3 py-1.5 rounded-xl font-bold flex items-center gap-1.5 transition-colors text-xs cursor-pointer ${
                            isStreaming
                              ? 'bg-cyan-500 hover:bg-cyan-400 text-neutral-950 shadow-md shadow-cyan-500/20'
                              : 'bg-amber-500 hover:bg-amber-400 text-neutral-950 shadow-md shadow-amber-500/20'
                          }`}
                        >
                          <span>{isStreaming ? `Abrir no ${chosenOpt?.platformName}` : 'Abrir no Exibidor Oficial'}</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      );
                    })()}
                  </div>
                </div>

                {(playingFilm.id === 'film-extra-heroi' || playingFilm.id === 'film-extra-heroi-cores') && (
                  <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-xs text-amber-200 leading-relaxed space-y-1.5">
                    <strong className="block text-amber-400 font-bold font-mono text-[11px] flex items-center gap-1.5">
                      <span>💡</span>
                      <span>Apostila 05 (Direção de Fotografia) • Cenas de Variação de Cores em Herói:</span>
                    </strong>
                    <p className="text-neutral-300">
                      Utilize o seletor de opções acima do player para alternar entre as cenas. Cada clipe possui duração própria individual: a <strong>Paleta Vermelha</strong> (4:33 min), a <strong>Paleta Verde</strong> (3:45 min), o <strong>Duelo na Chuva</strong> (7:08 min), o <strong>Vídeo-Ensaio Analítico</strong> (14:21 min) e as <strong>Transições Cromáticas</strong> (5:14 min). A estimativa global de ~37 a 45 min refere-se ao conjunto completo de todas as cenas e materiais de estudo somados.
                    </p>
                  </div>
                )}

                {(tPlay.whyWatch || playingFilm.whyWatch) && (
                  <div className="p-3.5 rounded-xl bg-amber-950/20 border-l-2 border-amber-500 text-xs text-amber-100 space-y-1">
                    <strong className="block text-amber-400 font-bold font-mono text-[11px]">
                      {tFR.whyWatchTitle}
                    </strong>
                    <p className="leading-relaxed">{tPlay.whyWatch || playingFilm.whyWatch}</p>
                  </div>
                )}

                {(tPlay.whatToObserve || playingFilm.whatToObserve) && (
                  <div className="p-3.5 rounded-xl bg-neutral-950 border border-neutral-800 text-xs text-neutral-300 space-y-1">
                    <strong className="block text-amber-400 font-bold font-mono text-[11px]">
                      {tFR.observeTitle}
                    </strong>
                    <p className="leading-relaxed text-neutral-400 text-xs">{tPlay.whatToObserve || playingFilm.whatToObserve}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        );
      })()}

      {/* ========================================================================= */}
      {/* MODAL DE EDIÇÃO: CONFIGURAR URL E INFORMAÇÕES DO FILME (ADMINISTRADOR)     */}
      {/* ========================================================================= */}
      {editingFilm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-fadeIn">
          <div className="w-full max-w-2xl bg-neutral-900 border border-neutral-800 rounded-3xl overflow-hidden shadow-2xl max-h-[92vh] flex flex-col">
            <div className="p-5 border-b border-neutral-800 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
                  <Edit3 className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white font-display">
                    Editar Filme do Módulo 0{editingFilm.moduleId}
                  </h3>
                  <p className="text-xs text-neutral-400">
                    Altere a URL do vídeo, plataforma de exibição e ficha técnica.
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setEditingFilm(null)}
                className="p-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveFilmEdit} className="p-6 overflow-y-auto space-y-4 text-xs">
              {editSuccessMessage && (
                <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-mono text-xs flex items-center gap-2">
                  <Check className="w-4 h-4" />
                  <span>{editSuccessMessage}</span>
                </div>
              )}

              {/* URL PRINCIPAL DO VÍDEO */}
              <div className="p-4 rounded-2xl bg-amber-500/5 border border-amber-500/30 space-y-2">
                <label className="block text-amber-400 font-mono font-bold">
                  * URL do Vídeo (YouTube, Vimeo, ou Link Direto):
                </label>
                <input
                  type="url"
                  required
                  value={editForm.watchUrl}
                  onChange={(e) => setEditForm({ ...editForm, watchUrl: e.target.value })}
                  placeholder="https://www.youtube.com/watch?v=..."
                  className="w-full px-3.5 py-2.5 bg-neutral-950 border border-neutral-700 rounded-xl text-white font-mono focus:border-amber-500 focus:outline-none text-xs"
                />
                <p className="text-[11px] text-neutral-400">
                  Insira o link oficial do filme no YouTube, Vimeo ou exibidor. Os alunos terão acesso a este link e poderão assistir no player ou abrir em nova aba.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-neutral-400 font-mono mb-1">Plataforma / Canal de Exibição:</label>
                  <input
                    type="text"
                    value={editForm.platform}
                    onChange={(e) => setEditForm({ ...editForm, platform: e.target.value })}
                    placeholder="Ex: YouTube Oficial / Porta Curtas"
                    className="w-full px-3.5 py-2.5 bg-neutral-950 border border-neutral-700 rounded-xl text-white focus:border-amber-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-neutral-400 font-mono mb-1">Duração do Filme:</label>
                  <input
                    type="text"
                    value={editForm.duration}
                    onChange={(e) => setEditForm({ ...editForm, duration: e.target.value })}
                    placeholder="Ex: 15 min"
                    className="w-full px-3.5 py-2.5 bg-neutral-950 border border-neutral-700 rounded-xl text-white focus:border-amber-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-neutral-400 font-mono mb-1">Título do Filme:</label>
                  <input
                    type="text"
                    required
                    value={editForm.title}
                    onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-neutral-950 border border-neutral-700 rounded-xl text-white focus:border-amber-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-neutral-400 font-mono mb-1">Diretor(a):</label>
                  <input
                    type="text"
                    required
                    value={editForm.director}
                    onChange={(e) => setEditForm({ ...editForm, director: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-neutral-950 border border-neutral-700 rounded-xl text-white focus:border-amber-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-neutral-400 font-mono mb-1">Sinopse da Obra:</label>
                <textarea
                  rows={2}
                  value={editForm.synopsis}
                  onChange={(e) => setEditForm({ ...editForm, synopsis: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-neutral-950 border border-neutral-700 rounded-xl text-white focus:border-amber-500 focus:outline-none resize-none"
                />
              </div>

              <div>
                <label className="block text-neutral-400 font-mono mb-1">Por que o aluno deve assistir:</label>
                <textarea
                  rows={2}
                  value={editForm.whyWatch}
                  onChange={(e) => setEditForm({ ...editForm, whyWatch: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-neutral-950 border border-neutral-700 rounded-xl text-white focus:border-amber-500 focus:outline-none resize-none"
                />
              </div>

              <div>
                <label className="block text-neutral-400 font-mono mb-1">O que observar na cena / decupagem:</label>
                <textarea
                  rows={2}
                  value={editForm.whatToObserve}
                  onChange={(e) => setEditForm({ ...editForm, whatToObserve: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-neutral-950 border border-neutral-700 rounded-xl text-white focus:border-amber-500 focus:outline-none resize-none"
                />
              </div>

              <div className="pt-4 border-t border-neutral-800 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setEditingFilm(null)}
                  className="px-4 py-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-300 font-mono text-xs cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={savingEdit}
                  className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer disabled:opacity-50"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>{savingEdit ? 'Salvando...' : 'Salvar Alterações'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: LEITURA OBRIGATÓRIA INTEGRAL DA BIBLIOTECA */}
      {activeReadingModal && (
        <ReadingReaderModal
          reading={activeReadingModal}
          isOpen={!!activeReadingModal}
          onClose={() => setActiveReadingModal(null)}
          onNavigateToModule={(modId) => onNavigate('modulo-detalhe', { moduleId: modId })}
        />
      )}
    </div>
  );
};
