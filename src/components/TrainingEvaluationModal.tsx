import React, { useState, useEffect } from 'react';
import {
  X,
  Sparkles,
  CheckCircle2,
  XCircle,
  AlertCircle,
  RotateCcw,
  BookOpen,
  ArrowRight,
  HelpCircle,
  FileCheck2,
  Award,
  ChevronRight,
  Check,
} from 'lucide-react';
import { Apostila, BonusApostila, ApostilaQuizQuestion } from '../types/index.js';
import { useLanguage } from '../i18n/LanguageContext.js';
import { getTrainingQuestionsForModule } from '../i18n/evaluationTranslations.js';

interface TrainingEvaluationModalProps {
  isOpen: boolean;
  onClose: () => void;
  apostila: Apostila | BonusApostila | null;
  etapaNumber: number;
  onOpenPdfReader?: () => void;
  onNavigateToOfficial?: (moduleId: number) => void;
}

export const TrainingEvaluationModal: React.FC<TrainingEvaluationModalProps> = ({
  isOpen,
  onClose,
  apostila,
  etapaNumber,
  onOpenPdfReader,
  onNavigateToOfficial,
}) => {
  const { language } = useLanguage();
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [confirmedQuestions, setConfirmedQuestions] = useState<Record<string, boolean>>({});
  const [showResults, setShowResults] = useState<boolean>(false);

  // Localization dictionary
  const tModal = {
    pt: {
      badge: `AVALIAÇÃO DE TREINAMENTO • ETAPA 0${etapaNumber}`,
      questionsCount: 'Questões de Fixação Prática',
      desc: 'Este simulado serve para testar sua compreensão dos conceitos centrais da apostila. Gabarito com justificativas didáticas imediatas. Não afeta a nota oficial, você pode refazer quantas vezes desejar.',
      progress: 'Progresso:',
      answered: 'respondidas',
      scoreResult: 'Resultado do Treinamento:',
      hits: 'acertos',
      excellent: 'Excelente desempenho! Você assimilou os pontos determinantes da apostila e está muito bem preparado para a avaliação oficial da etapa (nota de aprovação: 6.0).',
      good: 'Bom exercício! Revise os comentários pedagógicos abaixo e releia os capítulos da apostila para reforçar a fixação antes da prova oficial.',
      retry: 'Refazer Treinamento',
      openPdf: 'Abrir no Leitor Canvas',
      goToOfficial: 'Ir para Avaliação Oficial',
      correct: 'Correto',
      incorrect: 'Incorreto',
      verifyAnswer: 'Verificar Resposta',
      directorComment: 'Comentário Técnico do Diretor Tony de Luc:',
      completedNotice: '✓ Treinamento concluído e registrado!',
      instructions: 'Responda as questões e clique em Finalizar para ver o gabarito geral.',
      finishBtn: 'Finalizar e Ver Gabarito Completo',
      closeBtn: 'Fechar',
    },
    en: {
      badge: `TRAINING ASSESSMENT • STAGE 0${etapaNumber}`,
      questionsCount: 'Practical Drill Questions',
      desc: 'This practice drill tests your understanding of core handout concepts. Includes immediate pedagogical feedback. Does not impact your official transcript, practice as many times as you like.',
      progress: 'Progress:',
      answered: 'answered',
      scoreResult: 'Training Result:',
      hits: 'correct',
      excellent: 'Outstanding performance! You have mastered key concepts and are well prepared for the official stage assessment (passing threshold: 6.0).',
      good: 'Good effort! Review the director\'s pedagogical notes below and revisit handout chapters before taking the official exam.',
      retry: 'Retake Training',
      openPdf: 'Open in Canvas Reader',
      goToOfficial: 'Go to Official Assessment',
      correct: 'Correct',
      incorrect: 'Incorrect',
      verifyAnswer: 'Check Answer',
      directorComment: 'Director Tony de Luc\'s Technical Feedback:',
      completedNotice: '✓ Training drill completed and recorded!',
      instructions: 'Answer the questions and click Finish to reveal the master answer key.',
      finishBtn: 'Finish & View Complete Answer Key',
      closeBtn: 'Close',
    },
    es: {
      badge: `EVALUACIÓN DE ENTRENAMIENTO • ETAPA 0${etapaNumber}`,
      questionsCount: 'Preguntas de Fijación Práctica',
      desc: 'Este simulacro evalúa tu comprensión de los conceptos clave del manual. Solucionario con explicaciones didácticas inmediatas. No afecta la nota oficial, repítelo cuantas veces quieras.',
      progress: 'Progreso:',
      answered: 'respondidas',
      scoreResult: 'Resultado del Entrenamiento:',
      hits: 'aciertos',
      excellent: '¡Excelente desempeño! Asimilaste los puntos determinantes del manual y estás listo para la evaluación oficial de la etapa (nota de aprobación: 6.0).',
      good: '¡Buen ejercicio! Revisa los comentarios pedagógicos abajo y relee los capítulos del manual para reforzar los conceptos.',
      retry: 'Repetir Entrenamiento',
      openPdf: 'Abrir en Lector Canvas',
      goToOfficial: 'Ir a la Evaluación Oficial',
      correct: 'Correcto',
      incorrect: 'Incorrecto',
      verifyAnswer: 'Verificar Respuesta',
      directorComment: 'Comentario Técnico del Director Tony de Luc:',
      completedNotice: '✓ ¡Entrenamiento completado y registrado!',
      instructions: 'Responde las preguntas y pulsa en Finalizar para ver el solucionario completo.',
      finishBtn: 'Finalizar y Ver Solucionario Completo',
      closeBtn: 'Cerrar',
    },
    fr: {
      badge: `ÉVALUATION D'ENTRAÎNEMENT • ÉTAPE 0${etapaNumber}`,
      questionsCount: 'Questions d\'Entraînement Pratique',
      desc: 'Ce quiz permet de vérifier l\'assimilation des concepts clés du fascicule. Corrigé détaillé avec explications didactiques immédiates. Sans incidence sur votre moyenne officielle.',
      progress: 'Progression :',
      answered: 'répondues',
      scoreResult: 'Résultat de l\'Entraînement :',
      hits: 'bonnes réponses',
      excellent: 'Excellente performance ! Vous maîtrisez les fondamentaux du fascicule et êtes prêt pour l\'évaluation officielle de l\'étape (moyenne minimale : 6.0).',
      good: 'Bon travail ! Consultez les retours pédagogiques ci-dessous et relisez les sections du fascicule avant de passer l\'épreuve officielle.',
      retry: 'Recommencer l\'Entraînement',
      openPdf: 'Ouvrir dans le Lecteur Canvas',
      goToOfficial: 'Aller à l\'Évaluation Officielle',
      correct: 'Correct',
      incorrect: 'Incorrect',
      verifyAnswer: 'Vérifier la Réponse',
      directorComment: 'Commentaire Technique du Réalisateur Tony de Luc :',
      completedNotice: '✓ Entraînement terminé et enregistré !',
      instructions: 'Répondez aux questions et cliquez sur Terminer pour afficher le corrigé complet.',
      finishBtn: 'Terminer et Voir le Corrigé Complet',
      closeBtn: 'Fermer',
    },
  }[language];

  if (!isOpen || !apostila) return null;

  // Resolve questions for language
  const localizedQuestions = getTrainingQuestionsForModule(etapaNumber, language);
  const questions = localizedQuestions.map((q, idx) => ({
    ...q,
    id: q.id || `train-${etapaNumber}-${idx + 1}`,
    questionNumber: q.questionNumber || idx + 1,
    prompt: q.prompt || q.question || `Questão de fixação ${idx + 1}`,
    correctOptionIndex:
      typeof q.correctOptionIndex === 'number'
        ? q.correctOptionIndex
        : typeof q.correctAnswerIndex === 'number'
        ? q.correctAnswerIndex
        : 0,
  }));

  const totalQuestions = questions.length;
  const answeredCount = Object.keys(selectedAnswers).length;

  let correctCount = 0;
  questions.forEach((q) => {
    if (selectedAnswers[q.id] === q.correctOptionIndex) {
      correctCount++;
    }
  });

  const percentage = totalQuestions > 0 ? Math.round((correctCount / totalQuestions) * 100) : 0;

  const handleSelectOption = (questionId: string, optionIndex: number) => {
    if (confirmedQuestions[questionId] || showResults) return;
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionId]: optionIndex,
    }));
  };

  const handleConfirmQuestion = (questionId: string) => {
    if (selectedAnswers[questionId] === undefined) return;
    setConfirmedQuestions((prev) => ({
      ...prev,
      [questionId]: true,
    }));
  };

  const handleFinishTraining = () => {
    const allConfirmed: Record<string, boolean> = {};
    questions.forEach((q) => {
      allConfirmed[q.id] = true;
    });
    setConfirmedQuestions(allConfirmed);
    setShowResults(true);

    try {
      const stored = localStorage.getItem('cinelab_training_evaluations');
      const data = stored ? JSON.parse(stored) : {};
      data[`etapa_${etapaNumber}`] = {
        etapaNumber,
        apostilaId: apostila.id,
        score: correctCount,
        total: totalQuestions,
        percentage,
        completedAt: new Date().toISOString(),
      };
      localStorage.setItem('cinelab_training_evaluations', JSON.stringify(data));
    } catch (e) {
      console.warn('Failed to save training progress to localStorage:', e);
    }
  };

  const handleResetTraining = () => {
    setSelectedAnswers({});
    setConfirmedQuestions({});
    setShowResults(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto animate-fadeIn">
      <div className="relative w-full max-w-3xl my-8 bg-neutral-900 border border-neutral-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* MODAL HEADER */}
        <div className="p-5 sm:p-6 bg-gradient-to-r from-neutral-900 via-neutral-900 to-amber-950/30 border-b border-neutral-800 flex items-start justify-between gap-4 shrink-0">
          <div className="space-y-1.5">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                {tModal.badge}
              </span>
              <span className="text-xs text-neutral-400 font-mono">
                {totalQuestions} {tModal.questionsCount}
              </span>
            </div>
            <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">
              {apostila.title}
            </h2>
            <p className="text-xs text-neutral-300 leading-relaxed max-w-xl">
              {tModal.desc}
            </p>
          </div>

          <button
            onClick={onClose}
            aria-label="Fechar"
            className="p-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-400 hover:text-white transition-colors cursor-pointer shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* PROGRESS BAR */}
        <div className="bg-neutral-950 px-6 py-2.5 border-b border-neutral-800/80 flex items-center justify-between text-xs font-mono text-neutral-400 shrink-0">
          <div className="flex items-center gap-2">
            <span>{tModal.progress}</span>
            <span className="text-amber-400 font-bold">
              {answeredCount} / {totalQuestions} {tModal.answered}
            </span>
          </div>
          <div className="w-36 h-2 bg-neutral-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-amber-500 transition-all duration-300"
              style={{ width: `${totalQuestions > 0 ? (answeredCount / totalQuestions) * 100 : 0}%` }}
            />
          </div>
        </div>

        {/* QUESTIONS BODY */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-6">
          {/* RESULTS BANNER (IF FINISHED) */}
          {showResults && (
            <div
              className={`p-5 rounded-2xl border text-center space-y-3 ${
                percentage >= 60
                  ? 'bg-emerald-950/30 border-emerald-800/50 text-emerald-300'
                  : 'bg-amber-950/30 border-amber-800/50 text-amber-300'
              }`}
            >
              <div className="inline-flex p-3 rounded-full bg-neutral-900 border border-neutral-700 shadow-inner">
                {percentage >= 60 ? (
                  <Award className="w-8 h-8 text-emerald-400" />
                ) : (
                  <HelpCircle className="w-8 h-8 text-amber-400" />
                )}
              </div>
              <div>
                <h3 className="text-base font-bold text-white">
                  {tModal.scoreResult} {correctCount} / {totalQuestions} {tModal.hits} ({percentage}%)
                </h3>
                <p className="text-xs text-neutral-300 mt-1 max-w-md mx-auto leading-relaxed">
                  {percentage >= 60 ? tModal.excellent : tModal.good}
                </p>
              </div>
              <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                <button
                  onClick={handleResetTraining}
                  className="px-4 py-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  {tModal.retry}
                </button>
                {onOpenPdfReader && (
                  <button
                    onClick={() => {
                      onClose();
                      onOpenPdfReader();
                    }}
                    className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-neutral-950 text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-colors shadow"
                  >
                    <BookOpen className="w-3.5 h-3.5" />
                    {tModal.openPdf}
                  </button>
                )}
                {onNavigateToOfficial && (
                  <button
                    onClick={() => {
                      onClose();
                      onNavigateToOfficial(etapaNumber);
                    }}
                    className="px-4 py-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-amber-300 border border-amber-500/30 text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-colors"
                  >
                    <span>{tModal.goToOfficial}</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>
          )}

          {/* QUESTIONS LIST */}
          {questions.map((q, idx) => {
            const isSelected = selectedAnswers[q.id] !== undefined;
            const chosenIndex = selectedAnswers[q.id];
            const isConfirmed = confirmedQuestions[q.id] || showResults;
            const isCorrect = chosenIndex === q.correctOptionIndex;

            return (
              <div
                key={q.id}
                className={`p-5 rounded-2xl border transition-all ${
                  isConfirmed
                    ? isCorrect
                      ? 'bg-emerald-950/15 border-emerald-800/40'
                      : 'bg-rose-950/15 border-rose-800/40'
                    : isSelected
                    ? 'bg-neutral-900 border-amber-500/40'
                    : 'bg-neutral-900/60 border-neutral-800'
                }`}
              >
                {/* Question Prompt */}
                <div className="flex items-start gap-3 mb-4">
                  <span className="px-2.5 py-1 rounded-lg bg-neutral-800 text-amber-400 text-xs font-mono font-bold shrink-0">
                    Q{idx + 1}
                  </span>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-white leading-relaxed">
                      {q.prompt}
                    </p>
                  </div>
                  {isConfirmed && (
                    <div className="shrink-0">
                      {isCorrect ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded text-xs font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">
                          <CheckCircle2 className="w-3.5 h-3.5" /> {tModal.correct}
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded text-xs font-bold bg-rose-500/20 text-rose-400 border border-rose-500/40">
                          <XCircle className="w-3.5 h-3.5" /> {tModal.incorrect}
                        </span>
                      )}
                    </div>
                  )}
                </div>

                {/* Options */}
                <div className="space-y-2.5">
                  {q.options.map((option, optIdx) => {
                    const isOptionSelected = chosenIndex === optIdx;
                    const isOptionCorrect = optIdx === q.correctOptionIndex;

                    let optionStyle =
                      'bg-neutral-950/60 border-neutral-800 text-neutral-300 hover:border-neutral-700 hover:bg-neutral-900';

                    if (isConfirmed) {
                      if (isOptionCorrect) {
                        optionStyle =
                          'bg-emerald-950/40 border-emerald-600 text-emerald-200 font-semibold shadow-sm';
                      } else if (isOptionSelected && !isCorrect) {
                        optionStyle =
                          'bg-rose-950/40 border-rose-600 text-rose-200 font-semibold line-through opacity-80';
                      } else {
                        optionStyle = 'bg-neutral-950/40 border-neutral-900 text-neutral-500 opacity-60';
                      }
                    } else if (isOptionSelected) {
                      optionStyle =
                        'bg-amber-500/15 border-amber-500 text-amber-200 font-medium shadow-sm';
                    }

                    const optionLetter = String.fromCharCode(65 + optIdx);

                    return (
                      <button
                        key={optIdx}
                        type="button"
                        onClick={() => handleSelectOption(q.id, optIdx)}
                        disabled={isConfirmed}
                        className={`w-full p-3.5 rounded-xl border text-left text-xs flex items-start gap-3 transition-all cursor-pointer disabled:cursor-default ${optionStyle}`}
                      >
                        <span
                          className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-mono font-bold shrink-0 mt-0.5 border ${
                            isConfirmed && isOptionCorrect
                              ? 'bg-emerald-500 border-emerald-400 text-neutral-950'
                              : isOptionSelected
                              ? 'bg-amber-500 border-amber-400 text-neutral-950'
                              : 'bg-neutral-900 border-neutral-700 text-neutral-400'
                          }`}
                        >
                          {isConfirmed && isOptionCorrect ? (
                            <Check className="w-3 h-3 stroke-[3]" />
                          ) : (
                            optionLetter
                          )}
                        </span>
                        <span className="flex-1 leading-relaxed">{option}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Instant Check Button */}
                {isSelected && !isConfirmed && (
                  <div className="mt-3 flex justify-end">
                    <button
                      type="button"
                      onClick={() => handleConfirmQuestion(q.id)}
                      className="px-3.5 py-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-amber-300 text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-colors border border-neutral-700 active:scale-98"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" />
                      {tModal.verifyAnswer}
                    </button>
                  </div>
                )}

                {/* Pedagogical Explanation */}
                {isConfirmed && q.explanation && (
                  <div className="mt-3.5 p-3 rounded-xl bg-neutral-950/80 border border-neutral-800 space-y-1 text-xs">
                    <div className="flex items-center gap-1.5 text-amber-400 font-mono font-bold text-[11px]">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>{tModal.directorComment}</span>
                    </div>
                    <p className="text-neutral-300 leading-relaxed italic pl-5">
                      "{q.explanation}"
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* MODAL FOOTER */}
        <div className="p-4 sm:p-5 bg-neutral-950 border-t border-neutral-800 flex flex-wrap items-center justify-between gap-3 shrink-0">
          <div className="text-xs text-neutral-400 font-mono">
            {showResults ? (
              <span className="text-emerald-400 font-bold">
                {tModal.completedNotice}
              </span>
            ) : (
              <span>{tModal.instructions}</span>
            )}
          </div>

          <div className="flex items-center gap-2">
            {!showResults ? (
              <button
                type="button"
                onClick={handleFinishTraining}
                disabled={answeredCount === 0}
                className="px-5 py-2.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 disabled:opacity-40 disabled:hover:from-amber-500 disabled:hover:to-amber-600 text-neutral-950 rounded-xl text-xs font-bold flex items-center gap-2 cursor-pointer transition-all shadow-md active:scale-98"
              >
                <FileCheck2 className="w-4 h-4" />
                <span>{tModal.finishBtn}</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={onClose}
                className="px-5 py-2.5 bg-neutral-800 hover:bg-neutral-700 text-white rounded-xl text-xs font-bold cursor-pointer transition-colors"
              >
                {tModal.closeBtn}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
