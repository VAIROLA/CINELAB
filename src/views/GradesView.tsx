import React, { useEffect, useState } from 'react';
import { api } from '../services/api.js';
import { StudentGradeRecord } from '../types/index.js';
import { useLanguage } from '../i18n/LanguageContext.js';
import {
  FileCheck,
  Award,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  Sparkles,
} from 'lucide-react';

interface GradesViewProps {
  isLoggedIn: boolean;
  onNavigate: (route: string, params?: any) => void;
}

export const GradesView: React.FC<GradesViewProps> = ({
  isLoggedIn,
  onNavigate,
}) => {
  const { t, language } = useLanguage();
  const [gradesData, setGradesData] = useState<{
    grades: StudentGradeRecord[];
    courseAverage: number;
    minPassingGrade: number;
    totalCompleted: number;
    totalEvaluations: number;
  } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isLoggedIn) {
      loadGrades();
    } else {
      setLoading(false);
    }
  }, [isLoggedIn]);

  const loadGrades = async () => {
    try {
      setLoading(true);
      const data = await api.getStudentGrades();
      setGradesData(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
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
          <h2 className="text-xl font-bold text-white">{t('grades.notLoggedInTitle')}</h2>
          <p className="text-xs text-neutral-400">
            {t('grades.notLoggedInDesc')}
          </p>
          <button
            onClick={() => onNavigate('matricula')}
            className="px-6 py-2.5 bg-amber-500 text-neutral-950 font-bold uppercase rounded-lg text-xs"
          >
            {t('grades.enrollBtn')}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12 text-neutral-200 space-y-10">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-mono font-medium uppercase tracking-wider">
          <Award className="w-3.5 h-3.5" /> {t('grades.badge')}
        </div>
        <h1 className="text-3xl sm:text-4xl font-display font-extrabold text-white">
          {t('grades.title')}
        </h1>
        <p className="text-xs sm:text-sm text-neutral-300">
          {t('grades.subtitle')}
        </p>
      </div>

      {loading ? (
        <div className="py-20 text-center text-neutral-500 font-mono text-xs">
          {t('grades.loading')}
        </div>
      ) : gradesData ? (
        <div className="space-y-8">
          {/* Top KPI Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 font-mono">
            <div className="p-6 rounded-2xl bg-neutral-900 border border-neutral-800 space-y-1">
              <span className="text-xs text-neutral-400">{t('grades.courseAverage')}:</span>
              <div className="text-3xl font-bold font-display text-amber-400">
                {gradesData.courseAverage.toFixed(1)}{' '}
                <span className="text-xs font-normal text-neutral-400 font-mono">/ 10.0</span>
              </div>
              <span className="text-[11px] text-neutral-500 block">
                {t('grades.minForCert')}: {gradesData.minPassingGrade.toFixed(1)}
              </span>
            </div>

            <div className="p-6 rounded-2xl bg-neutral-900 border border-neutral-800 space-y-1">
              <span className="text-xs text-neutral-400">{t('grades.evalsCompleted')}:</span>
              <div className="text-3xl font-bold font-display text-white">
                {gradesData.totalCompleted}{' '}
                <span className="text-xs font-normal text-neutral-400 font-mono">
                  {t('grades.ofTotal')} {gradesData.totalEvaluations}
                </span>
              </div>
              <span className="text-[11px] text-emerald-400 block">
                {t('grades.evalProgress')}
              </span>
            </div>

            <div className="p-6 rounded-2xl bg-neutral-900 border border-neutral-800 space-y-1">
              <span className="text-xs text-neutral-400">{t('grades.certStatus')}:</span>
              <div
                className={`text-xl font-bold font-display mt-1 ${
                  gradesData.courseAverage >= gradesData.minPassingGrade &&
                  gradesData.totalCompleted === gradesData.totalEvaluations
                    ? 'text-emerald-400'
                    : 'text-amber-400'
                }`}
              >
                {gradesData.courseAverage >= gradesData.minPassingGrade &&
                gradesData.totalCompleted === gradesData.totalEvaluations
                  ? t('grades.approvedAndCertified')
                  : t('grades.inProgress')}
              </div>
              <span className="text-[11px] text-neutral-400 block font-sans">
                {gradesData.courseAverage >= 7.0 ? t('grades.averageWithin') : t('grades.averageBelow')}
              </span>
            </div>
          </div>

          {/* Grades Table */}
          <div className="bg-neutral-900 border border-neutral-800 rounded-3xl overflow-hidden shadow-xl">
            <div className="p-5 border-b border-neutral-800 flex items-center justify-between">
              <h2 className="text-sm font-bold font-display text-white">
                {t('grades.tableTitle')}
              </h2>
              <span className="text-xs font-mono text-neutral-400">{t('grades.tableSubtitle')}</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-neutral-950/60 font-mono text-neutral-400 border-b border-neutral-800 text-[11px]">
                  <tr>
                    <th className="p-4">{t('grades.thModule')}</th>
                    <th className="p-4">{t('grades.thTitle')}</th>
                    <th className="p-4">{t('grades.thGrade')}</th>
                    <th className="p-4">{t('grades.thStatus')}</th>
                    <th className="p-4">{t('grades.thDate')}</th>
                    <th className="p-4 text-right">{t('grades.thAction')}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-800 font-mono">
                  {gradesData.grades.map((g) => (
                    <tr key={g.moduleId} className="hover:bg-neutral-800/30 transition-colors">
                      <td className="p-4 font-bold text-amber-400">
                        M0{g.moduleNumber}
                      </td>
                      <td className="p-4 font-sans font-medium text-white">
                        {g.moduleTitle}
                      </td>
                      <td className="p-4">
                        {g.grade !== null ? (
                          <span
                            className={`font-bold text-sm ${
                              g.grade >= 7.0 ? 'text-emerald-400' : 'text-amber-400'
                            }`}
                          >
                            {g.grade.toFixed(1)}
                          </span>
                        ) : (
                          <span className="text-neutral-500">—</span>
                        )}
                      </td>
                      <td className="p-4">
                        {g.status === 'approved' && (
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-950 text-emerald-400 border border-emerald-800">
                            {t('grades.statusApproved')}
                          </span>
                        )}
                        {g.status === 'in_progress' && (
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-950 text-amber-400 border border-amber-800">
                            {t('grades.statusInAnalysis')}
                          </span>
                        )}
                        {g.status === 'pending' && (
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-neutral-800 text-neutral-400">
                            {t('grades.statusPending')}
                          </span>
                        )}
                      </td>
                      <td className="p-4 text-neutral-400 text-[11px]">
                        {g.submittedAt ? formatDate(g.submittedAt) : t('grades.awaitingSubmission')}
                      </td>
                      <td className="p-4 text-right">
                        <button
                          onClick={() =>
                            onNavigate('avaliacoes', { moduleId: g.moduleId })
                          }
                          className="px-3 py-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-200 hover:text-white text-xs font-sans cursor-pointer"
                        >
                          {t('grades.viewEvaluation')}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};
