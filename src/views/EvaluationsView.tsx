import React, { useEffect, useState } from 'react';
import { api } from '../services/api.js';
import { ModuleEvaluation, EvaluationSubmission, CourseModule } from '../types/index.js';
import { useLanguage } from '../i18n/LanguageContext.js';
import { getTranslatedEvaluationQuestion } from '../i18n/evaluationTranslations.js';
import {
  FileCheck,
  Lock,
  Unlock,
  CheckCircle2,
  Clock,
  ArrowRight,
  AlertCircle,
  HelpCircle,
  Award,
} from 'lucide-react';

interface EvaluationsViewProps {
  isLoggedIn: boolean;
  onNavigate: (route: string) => void;
  initialModuleId?: number;
}

export const EvaluationsView: React.FC<EvaluationsViewProps> = ({
  isLoggedIn,
  onNavigate,
  initialModuleId = 1,
}) => {
  const { t, language } = useLanguage();
  const [modules, setModules] = useState<CourseModule[]>([]);
  const [selectedModuleId, setSelectedModuleId] = useState<number>(initialModuleId);
  const [evaluationData, setEvaluationData] = useState<{
    evaluation: ModuleEvaluation;
    submission: EvaluationSubmission | null;
    isUnlocked: boolean;
  } | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [answers, setAnswers] = useState<
    Record<string, { selectedOptionIndex?: number; discursiveText?: string }>
  >({});

  useEffect(() => {
    loadModules();
  }, [isLoggedIn]);

  useEffect(() => {
    if (selectedModuleId && isLoggedIn) {
      loadEvaluation(selectedModuleId);
    }
  }, [selectedModuleId, isLoggedIn]);

  const loadModules = async () => {
    try {
      if (isLoggedIn) {
        const mods = await api.getStudentModules();
        setModules(mods);
        if (initialModuleId && mods.some((m) => m.id === initialModuleId)) {
          setSelectedModuleId(initialModuleId);
        } else {
          const active = mods.find((m) => m.status === 'available') || mods[0];
          if (active) setSelectedModuleId(active.id);
        }
      } else {
        const info = await api.getPublicCourseInfo();
        setModules(info.modules);
        if (initialModuleId && info.modules.some((m) => m.id === initialModuleId)) {
          setSelectedModuleId(initialModuleId);
        } else {
          setSelectedModuleId(1);
        }
      }
    } catch (err) {
      console.error(err);
    }
  };

  const loadEvaluation = async (moduleId: number) => {
    try {
      setLoading(true);
      setErrorMessage('');
      const data = await api.getStudentEvaluation(moduleId);
      setEvaluationData(data);

      // Pre-fill answers if already submitted
      if (data.submission && data.submission.answers) {
        const existing: any = {};
        if (Array.isArray(data.submission.answers)) {
          (data.submission.answers as any[]).forEach((ans: any) => {
            existing[ans.questionId] = {
              selectedOptionIndex: ans.selectedOptionIndex,
              discursiveText: ans.discursiveText,
            };
          });
        } else {
          Object.entries(data.submission.answers).forEach(([qId, ans]: [string, any]) => {
            existing[qId] = {
              selectedOptionIndex: ans.selectedOptionIndex,
              discursiveText: ans.discursiveText,
            };
          });
        }
        setAnswers(existing);
      } else {
        setAnswers({});
      }
    } catch (err: any) {
      setErrorMessage(err.message || 'Falha ao carregar avaliação.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!evaluationData) return;

    try {
      setSubmitting(true);
      setErrorMessage('');
      const res = await api.submitEvaluation(selectedModuleId, answers);
      setEvaluationData((prev) => (prev ? { ...prev, submission: res.submission } : null));
    } catch (err: any) {
      setErrorMessage(err.message || 'Erro ao submeter avaliação.');
    } finally {
      setSubmitting(false);
    }
  };

  const formatDate = (isoString?: string) => {
    if (!isoString) return '';
    try {
      const locale = language === 'en' ? 'en-US' : language === 'fr' ? 'fr-FR' : language === 'es' ? 'es-ES' : 'pt-BR';
      return new Date(isoString).toLocaleDateString(locale, {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
    } catch {
      return isoString;
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="max-w-xl mx-auto px-4 py-20 text-center text-neutral-200">
        <div className="p-8 rounded-3xl bg-neutral-900 border border-neutral-800 space-y-4">
          <FileCheck className="w-12 h-12 text-amber-400 mx-auto" />
          <h2 className="text-xl font-bold text-white">{t('evaluations.notLoggedInTitle')}</h2>
          <p className="text-xs text-neutral-400 leading-relaxed">
            {t('evaluations.notLoggedInDesc')}
          </p>
          <button
            onClick={() => onNavigate('matricula')}
            className="px-6 py-3 bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold uppercase rounded-xl text-xs"
          >
            {t('evaluations.enrollBtn')}
          </button>
        </div>
      </div>
    );
  }

  const currentModule = modules.find((m) => m.id === selectedModuleId);
  const isSubmissionDone = !!evaluationData?.submission;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 text-neutral-200 space-y-10">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-mono font-medium uppercase tracking-wider">
          <FileCheck className="w-3.5 h-3.5" /> {t('evaluations.badge')}
        </div>
        <h1 className="text-3xl sm:text-4xl font-display font-extrabold text-white">
          {t('evaluations.title')}
        </h1>
        <p className="text-xs sm:text-sm text-neutral-300">
          {t('evaluations.subtitle')}
        </p>
      </div>

      {/* Module Selector */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {modules.map((m) => {
          const isSel = m.id === selectedModuleId;
          return (
            <button
              key={m.id}
              onClick={() => setSelectedModuleId(m.id)}
              className={`px-4 py-2 rounded-xl text-xs font-mono whitespace-nowrap transition-all flex items-center gap-2 cursor-pointer border ${
                isSel
                  ? 'bg-amber-500 text-neutral-950 font-bold border-amber-400 shadow-md shadow-amber-500/20'
                  : 'bg-neutral-900 text-neutral-300 border-neutral-700 hover:bg-neutral-800'
              }`}
            >
              <span>{t('evaluations.modulePrefix')}{m.number}</span>
            </button>
          );
        })}
      </div>

      {loading ? (
        <div className="py-20 text-center text-neutral-500 font-mono text-xs">
          {t('evaluations.loading')}
        </div>
      ) : errorMessage ? (
        <div className="p-8 rounded-3xl bg-neutral-900 border border-neutral-800 text-center space-y-4">
          <Lock className="w-10 h-10 text-amber-400 mx-auto" />
          <h3 className="text-lg font-bold text-white">{t('evaluations.lockedTitle')}</h3>
          <p className="text-xs text-neutral-400 max-w-md mx-auto leading-relaxed">
            {errorMessage}
          </p>
        </div>
      ) : evaluationData ? (
        <div className="space-y-8">
          {/* Status / Result Card */}
          {isSubmissionDone && evaluationData.submission && (
            <div className="p-6 sm:p-8 rounded-3xl bg-neutral-900 border-2 border-emerald-500/50 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-800 pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                    <Award className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-xs font-mono text-emerald-400 font-bold">
                      {t('evaluations.completed')}
                    </span>
                    <h3 className="text-lg font-bold text-white">
                      {t('evaluations.finalScore')}: {(evaluationData.submission.totalScore || 0).toFixed(1)} / 10.0
                    </h3>
                  </div>
                </div>

                <div className="text-right font-mono text-xs">
                  <span
                    className={`inline-block px-3 py-1 rounded-full font-bold ${
                      (evaluationData.submission.totalScore || 0) >= 6.0
                        ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                        : 'bg-amber-950 text-amber-300 border border-amber-800'
                    }`}
                  >
                    {(evaluationData.submission.totalScore || 0) >= 6.0 ? t('evaluations.approved') : t('evaluations.inRecovery')}
                  </span>
                  <div className="text-neutral-500 text-[10px] mt-1">
                    {t('evaluations.submittedAt')}: {formatDate(evaluationData.submission.submittedAt)}
                  </div>
                </div>
              </div>

              {evaluationData.submission.teacherGeneralFeedback && (
                <div className="p-4 rounded-xl bg-[#12141c] border border-neutral-800 text-xs space-y-1">
                  <span className="font-mono font-bold text-amber-400">
                    {t('evaluations.teacherFeedback')}:
                  </span>
                  <p className="text-neutral-300 italic">
                    "{evaluationData.submission.teacherGeneralFeedback}"
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Questions Form */}
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="space-y-6">
              {evaluationData.evaluation.questions.map((q, qIndex) => {
                const isObjective = q.type === 'multiple_choice' || q.type === 'true_false';
                const currentAnswer = answers[q.id] || {};
                const submissionAns = Array.isArray(evaluationData.submission?.answers)
                  ? (evaluationData.submission?.answers as any[])?.find((a: any) => a.questionId === q.id)
                  : evaluationData.submission?.answers?.[q.id];

                // Dynamically translate question prompt, options and explanation according to language
                const tQ = getTranslatedEvaluationQuestion(selectedModuleId, qIndex + 1, language, q);
                const displayPrompt = tQ.prompt || q.prompt || (q as any).statement;
                const displayOptions = tQ.options || q.options;
                const displayExplanation = tQ.explanation || q.explanation;

                return (
                  <div
                    key={q.id}
                    className="p-6 sm:p-8 rounded-3xl bg-neutral-900/70 border border-neutral-800 space-y-4"
                  >
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span className="text-amber-400 font-bold">{t('evaluations.questionPrefix')}{qIndex + 1}</span>
                      <span className="text-neutral-400">{t('evaluations.weight')}: {q.weight} pts</span>
                    </div>

                    <h3 className="text-sm sm:text-base font-bold text-white leading-relaxed">
                      {displayPrompt}
                    </h3>

                    {/* Objective Options */}
                    {isObjective && displayOptions && (
                      <div className="space-y-2.5 pt-2">
                        {displayOptions.map((opt, optIndex) => {
                          const isSelected = currentAnswer.selectedOptionIndex === optIndex;
                          const isCorrect = q.correctOptionIndex === optIndex;
                          const showCorrection = isSubmissionDone;

                          return (
                            <label
                              key={optIndex}
                              className={`p-3.5 rounded-xl border flex items-center gap-3 cursor-pointer transition-all ${
                                showCorrection && isCorrect
                                  ? 'bg-emerald-950/40 border-emerald-500 text-emerald-200'
                                  : showCorrection && isSelected && !isCorrect
                                  ? 'bg-red-950/40 border-red-500 text-red-200'
                                  : isSelected
                                  ? 'bg-amber-500/10 border-amber-500/80 text-white'
                                  : 'bg-neutral-800/40 border-neutral-700/60 hover:border-neutral-600 text-neutral-300'
                              } ${isSubmissionDone ? 'pointer-events-none' : ''}`}
                            >
                              <input
                                type="radio"
                                name={`question-${q.id}`}
                                disabled={isSubmissionDone}
                                checked={isSelected}
                                onChange={() =>
                                  setAnswers((prev) => ({
                                    ...prev,
                                    [q.id]: { selectedOptionIndex: optIndex },
                                  }))
                                }
                                className="text-amber-500 focus:ring-amber-500"
                              />
                              <span className="text-xs sm:text-sm">{opt}</span>
                            </label>
                          );
                        })}
                      </div>
                    )}

                    {/* Discursive Textarea */}
                    {q.type === 'discursive' && (
                      <div className="space-y-2 pt-2">
                        <textarea
                          rows={4}
                          disabled={isSubmissionDone}
                          value={currentAnswer.discursiveText || ''}
                          onChange={(e) =>
                            setAnswers((prev) => ({
                              ...prev,
                              [q.id]: { discursiveText: e.target.value },
                            }))
                          }
                          placeholder={t('evaluations.discursivePlaceholder')}
                          className="w-full p-4 bg-neutral-950 border border-neutral-700 rounded-xl text-white text-xs sm:text-sm focus:outline-none focus:border-amber-500 disabled:opacity-80"
                        />
                        {isSubmissionDone && submissionAns && (
                          <div className="p-3 rounded-lg bg-neutral-950 border border-neutral-800 text-xs font-mono text-neutral-400 flex items-center justify-between">
                            <span>{t('evaluations.gradeAwarded')}:</span>
                            <span className="text-amber-400 font-bold">
                              {submissionAns.scoreAwarded !== undefined
                                ? `${submissionAns.scoreAwarded} / ${q.weight}`
                                : t('evaluations.inAnalysis')}
                            </span>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Explanation after submission */}
                    {isSubmissionDone && displayExplanation && (
                      <div className="p-4 rounded-xl bg-neutral-950/80 border border-neutral-800 text-xs text-neutral-400 space-y-1">
                        <strong className="text-amber-400 font-mono block">{t('evaluations.explanation')}:</strong>
                        <p>{displayExplanation}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Submit Action */}
            {!isSubmissionDone && (
              <div className="pt-4">
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-4 bg-amber-500 hover:bg-amber-400 disabled:opacity-50 text-neutral-950 font-extrabold uppercase tracking-wider text-sm rounded-xl shadow-lg shadow-amber-500/20 transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  {submitting ? t('evaluations.submitting') : t('evaluations.submitBtn')}
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </form>
        </div>
      ) : null}
    </div>
  );
};
