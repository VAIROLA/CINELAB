import React, { useState } from 'react';
import { useLanguage } from '../i18n/LanguageContext.js';
import { CRITICAL_READING_ESSAYS, ReadingEssay } from '../data/criticalEssays.js';
import { ModuleReading } from '../types/index.js';
import {
  BookOpen,
  X,
  Clock,
  User,
  Quote,
  Sparkles,
  CheckCircle2,
  BookmarkCheck,
  Award,
  ChevronRight,
  ExternalLink,
  Layers,
  Copy,
  Check,
  ShieldCheck,
  Share2,
} from 'lucide-react';

interface ReadingReaderModalProps {
  reading: ModuleReading;
  isOpen: boolean;
  onClose: () => void;
  onNavigateToModule?: (moduleId: number) => void;
}

export const ReadingReaderModal: React.FC<ReadingReaderModalProps> = ({
  reading,
  isOpen,
  onClose,
  onNavigateToModule,
}) => {
  const { language, getReadingTranslation } = useLanguage();
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [activeSectionIndex, setActiveSectionIndex] = useState(0);

  if (!isOpen || !reading) return null;

  const tReading = getReadingTranslation(reading);
  const essay: ReadingEssay | undefined =
    CRITICAL_READING_ESSAYS[reading.id] ||
    CRITICAL_READING_ESSAYS[`read-${reading.moduleId}`];

  const effectiveTitle = tReading.title || reading.title;
  const effectiveAuthor = tReading.author || reading.author;
  const effectiveChapter =
    tReading.suggestedChapter || reading.pagesOrChapter || essay?.suggestedChapter || 'Capítulos Selecionados';
  const effectiveSummary = tReading.summary || reading.summary;
  const effectiveWhyRead = tReading.whyRead || reading.whyRead;

  const handleCopyQuote = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(id);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="w-full max-w-4xl max-h-[92vh] bg-[#0c0d12] border border-neutral-800 rounded-3xl shadow-2xl flex flex-col overflow-hidden text-neutral-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* MODAL HEADER */}
        <div className="p-5 sm:p-6 bg-gradient-to-r from-neutral-950 via-[#13151f] to-neutral-950 border-b border-neutral-800 flex items-center justify-between gap-4 shrink-0">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
              <BookOpen className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2 text-[11px] font-mono">
                <span className="text-amber-400 font-bold uppercase tracking-wider">
                  CINELAB • BIBLIOTECA CRÍTICA
                </span>
                <span className="text-neutral-600">•</span>
                <span className="text-neutral-400">ETAPA 0{reading.moduleId}</span>
              </div>
              <h2 className="text-lg sm:text-xl font-bold text-white font-display truncate">
                {effectiveTitle}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {onNavigateToModule && (
              <button
                onClick={() => {
                  onClose();
                  onNavigateToModule(reading.moduleId);
                }}
                className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-xs font-mono text-neutral-300 border border-neutral-800 hover:text-white transition-all cursor-pointer"
                title="Ver o módulo didático correspondente"
              >
                <span>Ver Módulo 0{reading.moduleId}</span>
                <ChevronRight className="w-3.5 h-3.5 text-amber-400" />
              </button>
            )}
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-neutral-400 hover:text-white hover:bg-neutral-800/80 transition-colors cursor-pointer"
              title="Fechar leitura"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* METADATA STRIP */}
        <div className="px-6 py-3 bg-neutral-950/70 border-b border-neutral-800/80 flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
          <div className="flex flex-wrap items-center gap-4 text-neutral-400">
            <span className="flex items-center gap-1.5 text-amber-300 font-semibold">
              <User className="w-3.5 h-3.5 text-amber-400" />
              <span>{effectiveAuthor}</span>
              {essay?.year && <span className="text-neutral-500 font-normal">({essay.year})</span>}
            </span>
            <span className="text-neutral-600">•</span>
            <span className="flex items-center gap-1.5 text-neutral-300">
              <BookmarkCheck className="w-3.5 h-3.5 text-amber-400" />
              <span>{effectiveChapter}</span>
            </span>
          </div>

          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-neutral-900 border border-neutral-800 text-neutral-300 text-[11px]">
              <Clock className="w-3.5 h-3.5 text-amber-400" />
              <span>~{essay?.estimatedMinutes || reading.estimatedMinutes || 45} min de estudo</span>
            </span>
            <span className="flex items-center gap-1 text-emerald-400 text-[11px]">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Texto Integral Liberado</span>
            </span>
          </div>
        </div>

        {/* SCROLLABLE BODY */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-8 leading-relaxed">
          {/* PROFESSOR TONY DE LUC INTRODUCTORY DIRECTIVE */}
          <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-br from-amber-950/30 via-neutral-900/90 to-neutral-950 border-l-4 border-amber-500 border-t border-r border-b border-neutral-800/80 space-y-3 relative overflow-hidden">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-amber-400 uppercase tracking-wide">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>DIRETRIZ DO PROFESSOR CINEASTA (TONY DE LUC):</span>
              </div>
              <button
                onClick={() =>
                  handleCopyQuote(
                    essay?.tonyDeLucCommentary || effectiveWhyRead,
                    'tony-quote'
                  )
                }
                className="text-[11px] font-mono text-neutral-400 hover:text-amber-300 flex items-center gap-1 cursor-pointer transition-colors"
                title="Copiar diretriz"
              >
                {copiedKey === 'tony-quote' ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400">Copiado</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copiar</span>
                  </>
                )}
              </button>
            </div>
            <p className="text-sm sm:text-base text-amber-100 font-serif italic leading-relaxed">
              "{essay?.tonyDeLucCommentary || effectiveWhyRead}"
            </p>
          </div>

          {/* CRITICAL OVERVIEW & WHY READ */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 sm:p-5 rounded-2xl bg-neutral-900/70 border border-neutral-800 space-y-2">
              <h4 className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                <Quote className="w-3.5 h-3.5" />
                <span>Resumo Crítico da Obra:</span>
              </h4>
              <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
                {effectiveSummary}
              </p>
            </div>

            <div className="p-4 sm:p-5 rounded-2xl bg-neutral-900/70 border border-neutral-800 space-y-2">
              <h4 className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Por Que o Realizador Deve Ler:</span>
              </h4>
              <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
                {effectiveWhyRead}
              </p>
            </div>
          </div>

          {/* SECTIONS / CHAPTER ESSAYS */}
          {essay && essay.sections && essay.sections.length > 0 && (
            <div className="space-y-6 pt-2">
              <div className="border-b border-neutral-800 pb-2 flex items-center justify-between">
                <h3 className="text-base sm:text-lg font-bold text-white font-display flex items-center gap-2">
                  <Layers className="w-4 h-4 text-amber-400" />
                  <span>Ensaio Teórico e Conceitos Fundamentais</span>
                </h3>
                <span className="text-xs font-mono text-neutral-500">
                  {essay.sections.length} Tópicos Centrais
                </span>
              </div>

              <div className="space-y-6">
                {essay.sections.map((sec, idx) => (
                  <article
                    key={idx}
                    className="p-5 sm:p-7 rounded-2xl bg-neutral-900/50 border border-neutral-800/80 space-y-4 hover:border-neutral-700 transition-colors"
                  >
                    <div>
                      <h4 className="text-base sm:text-lg font-bold text-white font-display">
                        {sec.title}
                      </h4>
                      {sec.subtitle && (
                        <p className="text-xs text-amber-300/80 font-mono mt-0.5">
                          {sec.subtitle}
                        </p>
                      )}
                    </div>

                    <div className="space-y-3 text-xs sm:text-sm text-neutral-300 leading-relaxed">
                      {sec.paragraphs.map((p, pIdx) => (
                        <p key={pIdx}>{p}</p>
                      ))}
                    </div>

                    {sec.keyTakeaway && (
                      <div className="p-3.5 rounded-xl bg-amber-500/10 border-l-2 border-amber-400 text-xs text-amber-200 font-mono flex items-start gap-2">
                        <Sparkles className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                        <div>
                          <strong className="block text-amber-400 uppercase text-[10px] tracking-wider mb-0.5">
                            Conclusão do Realizador:
                          </strong>
                          <span>{sec.keyTakeaway}</span>
                        </div>
                      </div>
                    )}
                  </article>
                ))}
              </div>
            </div>
          )}

          {/* PRACTICAL EXERCISE */}
          {essay && essay.practicalExercise && (
            <div className="p-6 rounded-2xl bg-neutral-950 border border-neutral-800 space-y-3">
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-amber-400 uppercase tracking-wider">
                <Award className="w-4 h-4" />
                <span>EXERCÍCIO PRÁTICO DE FIXAÇÃO DESTA LEITURA</span>
              </div>
              <h4 className="text-base font-bold text-white font-display">
                {essay.practicalExercise.title}
              </h4>
              <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed bg-neutral-900/80 p-4 rounded-xl border border-neutral-800">
                {essay.practicalExercise.instructions}
              </p>
            </div>
          )}
        </div>

        {/* MODAL FOOTER */}
        <div className="p-4 sm:p-5 bg-neutral-950 border-t border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0 text-xs font-mono">
          <span className="text-neutral-400 flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-amber-400" />
            <span>Biblioteca Pedagógica Oficial CINELAB • Acesso irrestrito aos matriculados</span>
          </span>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            {onNavigateToModule && (
              <button
                onClick={() => {
                  onClose();
                  onNavigateToModule(reading.moduleId);
                }}
                className="flex-1 sm:flex-none px-4 py-2 bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold rounded-xl transition-all cursor-pointer shadow-md shadow-amber-500/20 text-center"
              >
                Abrir Módulo 0{reading.moduleId} Completo
              </button>
            )}
            <button
              onClick={onClose}
              className="px-4 py-2 bg-neutral-800 hover:bg-neutral-700 text-neutral-200 font-bold rounded-xl transition-all cursor-pointer"
            >
              Fechar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
