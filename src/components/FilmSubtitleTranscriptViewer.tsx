import React, { useState, useEffect, useMemo } from 'react';
import {
  Subtitles,
  MessageSquare,
  Sparkles,
  BookOpen,
  Copy,
  Check,
  ChevronDown,
  ChevronUp,
  Play,
  Pause,
  ChevronLeft,
  ChevronRight,
  Type,
} from 'lucide-react';
import { filmSceneTranscripts, FilmSceneTranscript } from '../data/filmSceneTranscripts';

export interface FilmSubtitleTranscriptViewerProps {
  filmId: string;
  selectedSubtitle: 'pt' | 'en' | 'es' | 'fr' | 'off';
  onSelectSubtitle: (lang: 'pt' | 'en' | 'es' | 'fr' | 'off') => void;
  studentLanguage?: string;
  filmTitle?: string;
  isStreaming?: boolean;
  streamingPlatform?: string;
  currentOption?: {
    id: string;
    label: string;
    isStreaming?: boolean;
    platformName?: string;
    type?: string;
    url?: string;
  };
  activeLineIndex?: number;
  setActiveLineIndex?: (idx: number | ((prev: number) => number)) => void;
  isAutoPlay?: boolean;
  setIsAutoPlay?: (auto: boolean | ((prev: boolean) => boolean)) => void;
  compact?: boolean;
}

export const FilmSubtitleTranscriptViewer: React.FC<FilmSubtitleTranscriptViewerProps> = ({
  filmId,
  selectedSubtitle,
  onSelectSubtitle,
  studentLanguage = 'pt',
  filmTitle,
  isStreaming,
  streamingPlatform,
  currentOption,
  activeLineIndex: externalActiveLineIndex,
  setActiveLineIndex: externalSetActiveLineIndex,
  isAutoPlay: externalIsAutoPlay,
  setIsAutoPlay: externalSetIsAutoPlay,
  compact = false,
}) => {
  const [internalActiveLineIndex, setInternalActiveLineIndex] = useState(0);
  const [internalIsAutoPlay, setInternalIsAutoPlay] = useState(true);
  const [timerProgress, setTimerProgress] = useState(0);
  const [copiedLineId, setCopiedLineId] = useState<string | null>(null);
  const [isFullScriptExpanded, setIsFullScriptExpanded] = useState(false);
  const [fontSize, setFontSize] = useState<'normal' | 'large'>('normal');

  const activeLineIndex = externalActiveLineIndex !== undefined ? externalActiveLineIndex : internalActiveLineIndex;
  const setActiveLineIndex = externalSetActiveLineIndex || setInternalActiveLineIndex;
  const isAutoPlay = externalIsAutoPlay !== undefined ? externalIsAutoPlay : internalIsAutoPlay;
  const setIsAutoPlay = externalSetIsAutoPlay || setInternalIsAutoPlay;

  // Resolve transcript or comprehensive fallback so EVERY film has working subtitles
  const transcript: FilmSceneTranscript = useMemo(() => {
    const rawTranscript = filmSceneTranscripts[filmId];
    if (rawTranscript) return rawTranscript;

    return {
    filmId,
    sceneTitle: {
      pt: `Decupagem e Estudo de Cena: ${filmTitle || 'Cena Didática'}`,
      en: `Scene Breakdown & Study: ${filmTitle || 'Study Scene'}`,
      es: `Desglose y Estudio de Escena: ${filmTitle || 'Escena de Estudio'}`,
      fr: `Découpage et Analyse de Scène : ${filmTitle || 'Scène d\'Étude'}`,
    },
    contextNote: {
      pt: 'Acompanhe a encenação, a composição fotográfica dos planos, o ritmo da montagem e os diálogos desta obra cinematográfica.',
      en: 'Follow the staging, photographic composition, editing rhythm, and dialogue of this cinematic work.',
      es: 'Siga la puesta en escena, composición fotográfica, ritmo de montaje y diálogos de esta obra.',
      fr: 'Suivez la mise en scène, la composition photographique, le rythme du montage et les dialogues.',
    },
    lines: [
      {
        id: `${filmId}-cue-1`,
        time: '00:05',
        speaker: 'Direção de Fotografia & Enquadramento',
        originalLang: 'pt',
        textOriginal: 'Abertura do plano com atenção à iluminação dramática e profundidade de campo.',
        text: {
          pt: 'Abertura do plano com atenção à iluminação dramática, profundidade de campo e foco seletivo no sujeito principal.',
          en: 'Opening frame highlighting dramatic lighting, depth of field, and selective focus on the primary subject.',
          es: 'Apertura del encuadre destacando iluminación dramática, profundidad de campo y foco selectivo.',
          fr: 'Ouverture du cadre mettant en valeur l\'éclairage dramatique, la profondeur de champ et le point sélectif.',
        },
        cinematicNote: {
          pt: 'Observe como o enquadramento guia o olhar do espectador para o elemento de maior peso narrativo.',
          en: 'Notice how the frame guides the viewer\'s eye to the element carrying narrative weight.',
          es: 'Observe cómo el encuadre guía la mirada hacia el elemento con mayor peso dramático.',
          fr: 'Remarquez comment le cadre guide le regard vers l\'élément de tension narrative.',
        },
      },
      {
        id: `${filmId}-cue-2`,
        time: '00:35',
        speaker: 'Montagem & Ritmo Dramático',
        originalLang: 'pt',
        textOriginal: 'Corte e transição temporal entre escalas de plano.',
        text: {
          pt: 'Corte e transição temporal: aceleração da cadência dramática através de cortes precisos e planos de detalhe.',
          en: 'Cut and temporal pacing: dramatic cadence accelerates through precise cuts and detail inserts.',
          es: 'Corte y ritmo temporal: la cadencia dramática se acelera mediante cortes ágiles y planos detalle.',
          fr: 'Coupe et tempo dramatique : accélération de la cadence par des raccords vifs et plans serrés.',
        },
        cinematicNote: {
          pt: 'A montagem constrói a tensão interna da cena sem a necessidade de diálogos expositivos.',
          en: 'The editing constructs internal scene tension without relying on expository dialogue.',
          es: 'El montaje construye la tensión interna de la escena prescindiendo de diálogo expositivo.',
          fr: 'Le montage bâtit la tension interne de la séquence sans recourir aux dialogues explicatifs.',
        },
      },
      {
        id: `${filmId}-cue-3`,
        time: '01:10',
        speaker: 'Desenho de Som & Atuação',
        originalLang: 'pt',
        textOriginal: 'Construção sonora imersiva e inflexão vocal dos personagens.',
        text: {
          pt: 'Diálogo e ambiência sonora: repare como a trilha recua para dar destaque absoluto à expressividade vocal dos atores.',
          en: 'Dialogue and soundscape: observe how the score retreats to give absolute prominence to vocal inflection.',
          es: 'Diálogo y ambiente sonoro: note cómo la música cede espacio para resaltar la inflexión vocal de los actores.',
          fr: 'Dialogue et ambiance sonore : remarquez comment la musique s\'efface pour faire briller le jeu vocal des acteurs.',
        },
        cinematicNote: {
          pt: 'O silêncio ou atenuação da trilha sonora atua como amplificador da verdade dramática.',
          en: 'Silence or volume attenuation acts as an amplifier of dramatic truth.',
          es: 'El silencio o atenuación musical funciona como amplificador de la verdad dramática.',
          fr: 'Le silence ou l\'atténuation musicale sert d\'amplificateur de vérité dramatique.',
        },
      },
    ],
    };
  }, [filmId, filmTitle]);

  const langKey = selectedSubtitle === 'off' ? (studentLanguage as 'pt' | 'en' | 'es' | 'fr') || 'pt' : selectedSubtitle;

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard?.writeText(text);
    setCopiedLineId(id);
    setTimeout(() => setCopiedLineId(null), 2000);
  };

  // Live auto-advance timer with smooth progress indicator
  useEffect(() => {
    if (!isAutoPlay || selectedSubtitle === 'off' || !transcript || transcript.lines.length <= 1) {
      setTimerProgress(0);
      return;
    }

    const durationMs = 6000;
    const intervalMs = 100;
    const step = (intervalMs / durationMs) * 100;
    let accumulated = 0;
    setTimerProgress(0);

    const interval = setInterval(() => {
      accumulated += step;
      if (accumulated >= 100) {
        accumulated = 0;
        setTimerProgress(0);
        // Call setActiveLineIndex outside of any setState updater
        setActiveLineIndex((cur) => (cur < transcript.lines.length - 1 ? cur + 1 : 0));
      } else {
        setTimerProgress(accumulated);
      }
    }, intervalMs);

    return () => clearInterval(interval);
  }, [isAutoPlay, selectedSubtitle, activeLineIndex, transcript, setActiveLineIndex]);

  // When active line is manually changed, reset progress
  const handleNextLine = () => {
    setTimerProgress(0);
    setActiveLineIndex((prev) => (prev < transcript.lines.length - 1 ? prev + 1 : 0));
  };

  const handlePrevLine = () => {
    setTimerProgress(0);
    setActiveLineIndex((prev) => (prev > 0 ? prev - 1 : transcript.lines.length - 1));
  };

  // If subtitles are turned off, show an elegant, compact 1-click re-activation strip
  if (selectedSubtitle === 'off') {
    return (
      <div className="bg-neutral-950/95 border border-neutral-800 rounded-b-2xl p-3 flex flex-wrap items-center justify-between gap-2.5 text-xs font-mono shadow-md">
        <div className="flex items-center gap-2 text-neutral-400">
          <Subtitles className="w-4 h-4 text-neutral-500" />
          <span className="text-neutral-300 text-[11px] font-semibold">
            Legendas Desativadas na Aba do Filme:
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-1.5">
          <span className="text-[10px] text-neutral-500 mr-1 hidden sm:inline">Ativar em:</span>
          {[
            { code: 'pt' as const, label: '🇧🇷 PT', name: 'Português' },
            { code: 'en' as const, label: '🇺🇸 EN', name: 'English' },
            { code: 'es' as const, label: '🇪🇸 ES', name: 'Español' },
            { code: 'fr' as const, label: '🇫🇷 FR', name: 'Français' },
          ].map((lang) => (
            <button
              key={lang.code}
              type="button"
              onClick={() => onSelectSubtitle(lang.code)}
              className="px-2.5 py-1 rounded-lg bg-neutral-800 hover:bg-purple-600 text-neutral-200 hover:text-white text-[11px] font-mono font-bold transition-all cursor-pointer shadow"
              title={`Ativar legendas em ${lang.name}`}
            >
              {lang.label}
            </button>
          ))}
        </div>
      </div>
    );
  }

  const safeIndex = Math.min(Math.max(activeLineIndex, 0), transcript.lines.length - 1);
  const currentLine = transcript.lines[safeIndex] || transcript.lines[0];
  const activeLineText = currentLine.text[langKey] || currentLine.text.pt;

  // COMPACT DOCKED MODE: Sits right below or attached to the 16:9 video container
  if (compact) {
    return (
      <div className="bg-neutral-950 border border-t-0 border-purple-500/40 rounded-b-2xl overflow-hidden shadow-2xl animate-fadeIn space-y-0 relative">
        {/* Top Control Bar: Speaker, Timecode, Navigation, and Language Switcher */}
        <div className="px-3 py-2 sm:px-4 sm:py-2.5 bg-neutral-900/95 border-b border-neutral-800/80 flex flex-wrap items-center justify-between gap-2 text-xs font-mono">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse shrink-0" />
            <span className="px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 border border-purple-500/30 text-[10px] font-bold">
              ⏱️ {currentLine.time}
            </span>
            <span className="text-amber-400 font-bold text-xs">
              {currentLine.speaker}
            </span>
            <span className="text-[10px] text-neutral-400 hidden sm:inline">
              ({safeIndex + 1}/{transcript.lines.length})
            </span>
          </div>

          <div className="flex items-center gap-1.5 flex-wrap">
            {/* Auto-advance toggle button */}
            <button
              type="button"
              onClick={() => setIsAutoPlay((prev) => !prev)}
              className={`px-2 py-0.5 rounded-lg text-[10px] font-mono transition-colors flex items-center gap-1 cursor-pointer ${
                isAutoPlay
                  ? 'bg-amber-500 text-neutral-950 font-bold shadow'
                  : 'bg-neutral-800 text-neutral-300 hover:text-white'
              }`}
              title={isAutoPlay ? 'Pausar avanço automático' : 'Iniciar avanço automático de legendas'}
            >
              {isAutoPlay ? <Pause className="w-2.5 h-2.5 fill-current" /> : <Play className="w-2.5 h-2.5 fill-current" />}
              <span>{isAutoPlay ? 'Auto (6s)' : 'Manual'}</span>
            </button>

            {/* Prev/Next buttons */}
            <button
              type="button"
              onClick={handlePrevLine}
              className="p-1 rounded bg-neutral-800 hover:bg-neutral-700 text-neutral-200 cursor-pointer"
              title="Fala anterior"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={handleNextLine}
              className="p-1 rounded bg-neutral-800 hover:bg-neutral-700 text-neutral-200 cursor-pointer"
              title="Próxima fala"
            >
              <ChevronRight className="w-3.5 h-3.5" />
            </button>

            {/* Language Switcher Pills */}
            <div className="flex items-center gap-0.5 bg-neutral-950/80 p-0.5 rounded-lg border border-neutral-800">
              {[
                { code: 'pt' as const, label: '🇧🇷 PT' },
                { code: 'en' as const, label: '🇺🇸 EN' },
                { code: 'es' as const, label: '🇪🇸 ES' },
                { code: 'fr' as const, label: '🇫🇷 FR' },
              ].map((lang) => (
                <button
                  key={lang.code}
                  type="button"
                  onClick={() => onSelectSubtitle(lang.code)}
                  className={`px-1.5 py-0.5 rounded text-[10px] font-mono font-bold transition-all cursor-pointer ${
                    selectedSubtitle === lang.code
                      ? 'bg-purple-600 text-white shadow'
                      : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  {lang.label}
                </button>
              ))}
              <button
                type="button"
                onClick={() => onSelectSubtitle('off')}
                className="px-1 py-0.5 rounded text-[10px] text-neutral-500 hover:text-red-400 cursor-pointer"
                title="Desativar legendas"
              >
                ✕
              </button>
            </div>
          </div>
        </div>

        {/* The Subtitle Dialogue: Large, High-Contrast Cinema Style */}
        <div className="p-3 sm:p-4 bg-black/90 space-y-2">
          <div className="flex items-start gap-2.5">
            <MessageSquare className="w-4 h-4 text-amber-400 shrink-0 mt-1" />
            <div className="space-y-1 w-full">
              <p className="text-amber-100 sm:text-base text-xs font-sans font-medium leading-relaxed break-words">
                "{activeLineText}"
              </p>

              {langKey !== currentLine.originalLang && currentLine.textOriginal && (
                <p className="text-[11px] text-neutral-400 italic font-serif">
                  <span className="not-italic font-mono uppercase text-[9px] text-neutral-500 mr-1">
                    Original ({currentLine.originalLang}):
                  </span>
                  "{currentLine.textOriginal}"
                </p>
              )}
            </div>
          </div>

          {currentLine.cinematicNote && (
            <div className="mt-1.5 p-2 rounded-lg bg-cyan-950/40 border border-cyan-500/20 text-[11px] text-cyan-200 flex items-start gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
              <p className="leading-snug">
                <strong className="text-cyan-300 font-mono text-[10px] uppercase mr-1">Decupagem:</strong>
                {currentLine.cinematicNote[langKey] || currentLine.cinematicNote.pt}
              </p>
            </div>
          )}
        </div>

        {/* Live Auto-Advance Progress Bar */}
        {isAutoPlay && (
          <div className="w-full h-1 bg-neutral-900 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-purple-500 to-amber-400 transition-all duration-100 ease-linear"
              style={{ width: `${timerProgress}%` }}
            />
          </div>
        )}
      </div>
    );
  }

  // FULL MODE: Used in Cinema Modal and Module Detail View
  return (
    <div className="bg-neutral-950 border border-purple-500/40 rounded-2xl overflow-hidden shadow-2xl space-y-0 animate-fadeIn">
      {/* 1. Header Bar with Language Switcher & Controls */}
      <div className="p-3 sm:p-4 bg-gradient-to-r from-purple-950/80 via-neutral-900 to-neutral-950 border-b border-neutral-800 flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-purple-600/30 border border-purple-500/40 text-purple-300 flex items-center justify-center shrink-0 shadow-lg shadow-purple-900/30">
            <Subtitles className="w-4 h-4" />
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs sm:text-sm font-bold text-white font-mono flex items-center gap-2">
                <span>Roteiro & Legenda Didática Sincronizada</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/40 font-bold uppercase">
                  {langKey.toUpperCase()}
                </span>
              </span>
            </div>
            <p className="text-[11px] sm:text-xs text-neutral-300 mt-0.5 leading-snug">
              {transcript.sceneTitle[langKey] || transcript.sceneTitle.pt}
            </p>
          </div>
        </div>

        {/* Language selector buttons */}
        <div className="flex flex-wrap items-center gap-2 self-start md:self-center">
          <span className="text-[11px] font-mono text-neutral-400 hidden sm:inline">Idioma:</span>
          <div className="flex items-center gap-1 bg-neutral-900/90 p-1 rounded-xl border border-neutral-800">
            {[
              { code: 'pt' as const, label: '🇧🇷 PT', name: 'Português' },
              { code: 'en' as const, label: '🇺🇸 EN', name: 'English' },
              { code: 'es' as const, label: '🇪🇸 ES', name: 'Español' },
              { code: 'fr' as const, label: '🇫🇷 FR', name: 'Français' },
            ].map((lang) => (
              <button
                key={lang.code}
                type="button"
                onClick={() => onSelectSubtitle(lang.code)}
                className={`px-2 py-1 rounded-lg text-xs font-mono transition-all cursor-pointer ${
                  selectedSubtitle === lang.code
                    ? 'bg-purple-600 text-white font-bold shadow-md shadow-purple-950'
                    : 'text-neutral-400 hover:text-white hover:bg-neutral-800'
                }`}
                title={`Traduzir diálogos para ${lang.name}`}
              >
                {lang.label}
              </button>
            ))}
            <button
              type="button"
              onClick={() => onSelectSubtitle('off')}
              className="px-2 py-1 rounded-lg text-xs font-mono text-neutral-500 hover:text-red-400 hover:bg-neutral-800 cursor-pointer"
              title="Ocultar legendas"
            >
              🔕 Off
            </button>
          </div>

          <button
            type="button"
            onClick={() => setFontSize((prev) => (prev === 'normal' ? 'large' : 'normal'))}
            className="p-1.5 rounded-xl bg-neutral-900 border border-neutral-800 hover:bg-neutral-800 text-neutral-300 text-xs font-mono transition-colors cursor-pointer"
            title="Ajustar tamanho da fonte da legenda"
          >
            <Type className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 2. ACTIVE DIALOGUE DISPLAY CARD (PROMINENT, CINEMA-GRADE, DIRECTLY UNDER VIDEO) */}
      <div className="p-4 sm:p-5 bg-gradient-to-b from-neutral-900/95 to-neutral-950 border-b border-neutral-800 space-y-3">
        {/* Meta, Navigation and Progress */}
        <div className="flex flex-wrap items-center justify-between gap-2.5 text-xs font-mono border-b border-neutral-800/80 pb-2.5">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-lg bg-purple-500/20 text-purple-300 border border-purple-500/30 text-xs font-bold font-mono">
              ⏱️ {currentLine.time}
            </span>
            <span className="text-amber-400 font-bold text-xs sm:text-sm">
              {currentLine.speaker}
            </span>
            <span className="text-[11px] text-neutral-400">
              (Fala {safeIndex + 1} de {transcript.lines.length})
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            {/* Auto-advance toggle */}
            <button
              type="button"
              onClick={() => setIsAutoPlay((prev) => !prev)}
              className={`px-3 py-1 rounded-lg text-xs font-mono transition-colors flex items-center gap-1.5 cursor-pointer ${
                isAutoPlay
                  ? 'bg-amber-500 text-neutral-950 font-bold shadow'
                  : 'bg-neutral-800 text-neutral-300 hover:text-white'
              }`}
              title={isAutoPlay ? 'Pausar avanço automático' : 'Ativar avanço automático (avança a cada 6 segundos)'}
            >
              {isAutoPlay ? <Pause className="w-3 h-3 fill-current" /> : <Play className="w-3 h-3 fill-current" />}
              <span>{isAutoPlay ? 'Avanço Automático Ativo (6s)' : 'Avanço Manual'}</span>
            </button>

            {/* Previous speech */}
            <button
              type="button"
              onClick={handlePrevLine}
              className="p-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-200 transition-colors cursor-pointer"
              title="Fala anterior"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            {/* Next speech */}
            <button
              type="button"
              onClick={handleNextLine}
              className="p-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-200 transition-colors cursor-pointer"
              title="Próxima fala"
            >
              <ChevronRight className="w-4 h-4" />
            </button>

            {/* Copy button */}
            <button
              type="button"
              onClick={() => handleCopy(currentLine.id, activeLineText)}
              className="p-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-300 transition-colors cursor-pointer"
              title="Copiar diálogo"
            >
              {copiedLineId === currentLine.id ? (
                <Check className="w-4 h-4 text-emerald-400" />
              ) : (
                <Copy className="w-4 h-4" />
              )}
            </button>
          </div>
        </div>

        {/* FULL DIALOGUE TEXT */}
        <div className="bg-black/90 rounded-2xl p-4 sm:p-5 border border-neutral-800/90 shadow-inner space-y-3">
          <div className="flex items-start gap-3">
            <MessageSquare className="w-5 h-5 text-amber-400 shrink-0 mt-1" />
            <div className="space-y-2 w-full">
              <p
                className={`text-amber-100 font-medium leading-relaxed break-words whitespace-normal ${
                  fontSize === 'large' ? 'text-lg sm:text-xl font-display' : 'text-sm sm:text-base font-sans'
                }`}
              >
                "{activeLineText}"
              </p>

              {langKey !== currentLine.originalLang && currentLine.textOriginal && (
                <p className="text-xs text-neutral-400 italic font-serif pt-1 border-t border-neutral-800/80">
                  <strong className="text-neutral-300 not-italic font-mono text-[11px] uppercase mr-1">
                    Original ({currentLine.originalLang}):
                  </strong>
                  "{currentLine.textOriginal}"
                </p>
              )}
            </div>
          </div>

          {currentLine.cinematicNote && (
            <div className="p-3 rounded-xl bg-cyan-950/40 border border-cyan-500/30 text-xs text-cyan-200 flex items-start gap-2.5">
              <Sparkles className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
              <div>
                <strong className="font-mono text-[11px] text-cyan-300 uppercase tracking-wide block mb-0.5">
                  🎬 Análise de Decupagem & Direção:
                </strong>
                <p className="leading-relaxed text-neutral-200">
                  {currentLine.cinematicNote[langKey] || currentLine.cinematicNote.pt}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Live Auto-Advance Progress Bar */}
        {isAutoPlay && (
          <div className="w-full h-1.5 bg-neutral-900 rounded-full overflow-hidden mt-2">
            <div
              className="h-full bg-gradient-to-r from-purple-500 via-amber-400 to-emerald-400 transition-all duration-100 ease-linear rounded-full"
              style={{ width: `${timerProgress}%` }}
            />
          </div>
        )}
      </div>

      {/* 3. Pedagogical Context & Full Script Expander */}
      <div className="p-3 sm:p-4 bg-neutral-950 space-y-3">
        {/* Scene context overview */}
        <div className="p-3 rounded-xl bg-purple-950/30 border border-purple-500/20 text-xs text-neutral-300 flex items-start gap-2.5">
          <BookOpen className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
          <div className="space-y-0.5">
            <span className="font-mono font-semibold text-purple-300 text-xs block">
              Contexto Pedagógico da Cena:
            </span>
            <p className="leading-relaxed text-neutral-300 text-xs">
              {transcript.contextNote[langKey] || transcript.contextNote.pt}
            </p>
          </div>
        </div>

        {/* Toggle full script */}
        <div className="flex items-center justify-between pt-1">
          <button
            type="button"
            onClick={() => setIsFullScriptExpanded(!isFullScriptExpanded)}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-neutral-200 text-xs font-mono font-semibold border border-neutral-800 transition-colors cursor-pointer"
          >
            <span>
              {isFullScriptExpanded
                ? 'Recolher Roteiro Completo'
                : `Ver Roteiro Completo da Cena (${transcript.lines.length} Falas Anotadas)`}
            </span>
            {isFullScriptExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>

          <span className="text-[11px] text-neutral-500 font-mono hidden sm:inline">
            Clique em qualquer fala do roteiro para selecioná-la
          </span>
        </div>

        {/* Full Script List (Expanded) */}
        {isFullScriptExpanded && (
          <div className="space-y-2.5 pt-2 max-h-[400px] overflow-y-auto pr-1">
            {transcript.lines.map((line, idx) => {
              const isSelected = idx === safeIndex;
              const lineText = line.text[langKey] || line.text.pt;

              return (
                <div
                  key={line.id}
                  onClick={() => {
                    setTimerProgress(0);
                    setActiveLineIndex(idx);
                  }}
                  className={`p-3 sm:p-4 rounded-xl border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-purple-950/50 border-purple-500/80 ring-1 ring-purple-500/50 shadow-lg'
                      : 'bg-neutral-900/60 border-neutral-800 hover:bg-neutral-900 hover:border-neutral-700'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 mb-1.5 text-xs font-mono">
                    <div className="flex items-center gap-2">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          isSelected ? 'bg-purple-600 text-white' : 'bg-neutral-800 text-purple-300'
                        }`}
                      >
                        ⏱️ {line.time}
                      </span>
                      <strong className="text-amber-300 text-xs">{line.speaker}</strong>
                    </div>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleCopy(line.id, lineText);
                      }}
                      className="text-neutral-500 hover:text-neutral-200 transition-colors p-1"
                      title="Copiar diálogo"
                    >
                      {copiedLineId === line.id ? (
                        <Check className="w-4 h-4 text-emerald-400" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </button>
                  </div>

                  <p className="text-white text-xs sm:text-sm font-medium leading-relaxed break-words whitespace-normal">
                    "{lineText}"
                  </p>

                  {langKey !== line.originalLang && line.textOriginal && (
                    <p className="text-[11px] text-neutral-400 italic mt-1 font-serif">
                      Original ({line.originalLang.toUpperCase()}): "{line.textOriginal}"
                    </p>
                  )}

                  {line.cinematicNote && (
                    <div className="mt-2 pt-1.5 border-t border-neutral-800/80 flex items-start gap-1.5 text-[11px] text-cyan-300/90 font-mono">
                      <Sparkles className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                      <span className="leading-relaxed">{line.cinematicNote[langKey] || line.cinematicNote.pt}</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
