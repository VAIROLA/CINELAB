import React, { useEffect, useState } from 'react';
import { api } from '../services/api.js';
import { User, Enrollment, CourseModule, BonusApostila } from '../types/index.js';
import { useLanguage } from '../i18n/LanguageContext.js';
import {
  GraduationCap,
  Calendar,
  Clock,
  CheckCircle2,
  Lock,
  Unlock,
  BookOpen,
  Film,
  Award,
  FileCheck,
  ArrowRight,
  Sparkles,
  AlertCircle,
  HelpCircle,
} from 'lucide-react';

interface StudentAreaViewProps {
  onNavigate: (route: string, params?: any) => void;
  user: User;
  enrollment: Enrollment | null;
}

export const StudentAreaView: React.FC<StudentAreaViewProps> = ({
  onNavigate,
  user,
  enrollment,
}) => {
  const { t, language } = useLanguage();
  const [loading, setLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState<{
    now: string;
    currentModuleId: number;
    progressPercentage: number;
    completedModulesCount: number;
    totalModulesCount: number;
    nextUnlockDate: string | null;
    nextEvalUnlockDate: string | null;
    modules: CourseModule[];
    bonusApostilas: (BonusApostila & { isUnlocked: boolean; unlockDate: string })[];
    evaluationsCount: number;
    averageGrade: number;
    completedActivitiesCount: number;
    certificateEligible: boolean;
    certificateUnmetCriteria: string[];
  } | null>(null);
  const [errorMessage, setErrorMessage] = useState('');

  const loadDashboard = async () => {
    try {
      setLoading(true);
      const data = await api.getStudentDashboard();
      setDashboardData(data);
    } catch (err: any) {
      setErrorMessage(err.message || 'Falha ao carregar painel do aluno.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDashboard();
  }, []);

  const formatDate = (isoString?: string | null) => {
    if (!isoString) return t('studentArea.soon');
    try {
      const d = new Date(isoString);
      const locale = language === 'en' ? 'en-US' : language === 'fr' ? 'fr-FR' : language === 'es' ? 'es-ES' : 'pt-BR';
      return d.toLocaleDateString(locale, {
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

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center text-neutral-400">
        <div className="w-10 h-10 border-2 border-amber-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="font-mono text-xs">{t('studentArea.syncing')}</p>
      </div>
    );
  }

  if (errorMessage || !dashboardData) {
    return (
      <div className="max-w-xl mx-auto px-4 py-16 text-center text-neutral-200">
        <div className="p-6 rounded-2xl bg-neutral-900 border border-red-800/60 space-y-4">
          <AlertCircle className="w-10 h-10 text-red-400 mx-auto" />
          <h2 className="text-lg font-bold text-white">{t('studentArea.restrictedArea')}</h2>
          <p className="text-xs text-neutral-400">{errorMessage || t('studentArea.pendingEnrollment')}</p>
          <button
            onClick={() => onNavigate('matricula')}
            className="px-6 py-2.5 bg-amber-500 text-neutral-950 font-bold text-xs rounded-lg uppercase"
          >
            {t('studentArea.enrollAction')}
          </button>
        </div>
      </div>
    );
  }

  const currentModule = dashboardData.modules.find((m) => m.id === dashboardData.currentModuleId) || dashboardData.modules[0];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 text-neutral-200 space-y-8 animate-fadeIn">
      {/* 1. GREETING & ENROLLMENT BANNER */}
      <div className="relative overflow-hidden p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#12141c] via-neutral-900 to-[#12141c] border border-neutral-800 shadow-2xl">
        <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
          <Film className="w-64 h-64 text-amber-500" />
        </div>

        <div className="relative z-10 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-mono font-semibold">
            <GraduationCap className="w-3.5 h-3.5" /> {t('studentArea.portalBadge')}
          </div>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-4xl font-display font-extrabold text-white">
                {t('studentArea.greeting')}, {user.name.split(' ')[0]}!
              </h1>
              <p className="text-xs sm:text-sm text-neutral-300 mt-1">
                {t('studentArea.welcomeTo')} <strong className="text-amber-400">CINELAB – Cinema & Audiovisual</strong>.
              </p>
            </div>

            {/* Matrícula & Status Chips */}
            <div className="flex flex-wrap items-center gap-2.5 font-mono text-xs">
              <div className="px-3 py-1.5 rounded-xl bg-neutral-900/90 border border-neutral-700/80">
                <span className="text-neutral-400 text-[11px] block">{t('studentArea.enrollmentLabel')}:</span>
                <span className="text-amber-400 font-bold tracking-wider">
                  {enrollment?.enrollmentNumber || 'CNL-2026-4819'}
                </span>
              </div>
              <div className="px-3 py-1.5 rounded-xl bg-emerald-950/40 border border-emerald-800/60">
                <span className="text-neutral-400 text-[11px] block">{t('studentArea.statusLabel')}:</span>
                <span className="text-emerald-400 font-bold">{t('studentArea.activeStatus')}</span>
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="pt-2 space-y-1.5">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-neutral-400">{t('studentArea.progressLabel')}:</span>
              <span className="text-amber-400 font-bold">{dashboardData.progressPercentage}%</span>
            </div>
            <div className="w-full h-2.5 rounded-full bg-neutral-800 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-amber-500 to-amber-400 transition-all duration-700"
                style={{ width: `${dashboardData.progressPercentage}%` }}
              />
            </div>
            <div className="flex items-center justify-between text-[11px] text-neutral-500 font-mono">
              <span>{dashboardData.completedModulesCount} {t('studentArea.modulesCompleted').replace('{total}', String(dashboardData.totalModulesCount))}</span>
              <span>{t('studentArea.currentAverage')}: <strong className="text-white">{dashboardData.averageGrade.toFixed(1)}</strong> / 10</span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. CALENDAR SOVEREIGNTY STATUS WIDGET */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono">
        <div className="p-4 rounded-2xl bg-neutral-900/60 border border-neutral-800">
          <div className="flex items-center justify-between text-xs text-neutral-400 mb-1">
            <span>{t('studentArea.currentStageTitle')}:</span>
            <Unlock className="w-3.5 h-3.5 text-emerald-400" />
          </div>
          <p className="text-sm font-bold text-white truncate font-sans">
            M0{currentModule?.number}: {currentModule?.title}
          </p>
          <span className="text-[11px] text-emerald-400 font-semibold block mt-1">
            {t('studentArea.stageInProgress')}
          </span>
        </div>

        <div className="p-4 rounded-2xl bg-neutral-900/60 border border-neutral-800">
          <div className="flex items-center justify-between text-xs text-neutral-400 mb-1">
            <span>{t('studentArea.nextReleaseTitle')}:</span>
            <Clock className="w-3.5 h-3.5 text-amber-400" />
          </div>
          <p className="text-sm font-bold text-amber-300">
            {formatDate(dashboardData.nextUnlockDate)}
          </p>
          <span className="text-[11px] text-neutral-400 block mt-1">
            {t('studentArea.unlockPrefix')} 0{(currentModule?.number || 1) + 1}
          </span>
        </div>

        <div className="p-4 rounded-2xl bg-neutral-900/60 border border-neutral-800">
          <div className="flex items-center justify-between text-xs text-neutral-400 mb-1">
            <span>{t('studentArea.stageEvalTitle')}:</span>
            <FileCheck className="w-3.5 h-3.5 text-amber-400" />
          </div>
          <p className="text-sm font-bold text-white">
            {formatDate(dashboardData.nextEvalUnlockDate)}
          </p>
          <span className="text-[11px] text-neutral-400 block mt-1">
            {t('studentArea.evalNotice')}
          </span>
        </div>
      </div>

      {/* 3. INTERACTIVE MODULE TIMELINE (M01 ✓, M02 🔓, M03 🔒...) */}
      <div className="p-6 sm:p-8 rounded-3xl bg-neutral-900/70 border border-neutral-800 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-800 pb-4">
          <div>
            <h2 className="text-lg font-bold text-white font-display">
              {t('studentArea.timelineTitle')}
            </h2>
            <p className="text-xs text-neutral-400">
              {t('studentArea.timelineSubtitle')}
            </p>
          </div>
          <div className="flex items-center gap-4 text-xs font-mono">
            <span className="flex items-center gap-1 text-emerald-400">
              <CheckCircle2 className="w-3.5 h-3.5" /> {t('studentArea.legendCompleted')}
            </span>
            <span className="flex items-center gap-1 text-amber-400">
              <Unlock className="w-3.5 h-3.5" /> {t('studentArea.legendAvailable')}
            </span>
            <span className="flex items-center gap-1 text-neutral-500">
              <Lock className="w-3.5 h-3.5" /> {t('studentArea.legendLocked')}
            </span>
          </div>
        </div>

        {/* Timeline Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-5 lg:grid-cols-10 gap-2.5">
          {dashboardData.modules.map((m) => {
            const isCompleted = m.status === 'completed';
            const isAvailable = m.status === 'available';
            const isLocked = m.status === 'locked';

            return (
              <button
                key={m.id}
                disabled={isLocked}
                onClick={() => onNavigate('modulo-detalhe', { moduleId: m.id })}
                className={`p-3 rounded-xl border text-left transition-all flex flex-col justify-between h-28 relative cursor-pointer ${
                  isCompleted
                    ? 'bg-emerald-950/20 border-emerald-800/60 hover:border-emerald-500/80 text-emerald-300'
                    : isAvailable
                    ? 'bg-amber-950/30 border-amber-500/80 shadow-lg shadow-amber-500/10 text-amber-300 ring-1 ring-amber-500/50'
                    : 'bg-neutral-900/40 border-neutral-800 text-neutral-500 opacity-60 cursor-not-allowed'
                }`}
              >
                <div className="flex items-center justify-between font-mono text-[10px]">
                  <span>M0{m.number}</span>
                  {isCompleted && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />}
                  {isAvailable && <Unlock className="w-3.5 h-3.5 text-amber-400" />}
                  {isLocked && <Lock className="w-3 h-3 text-neutral-600" />}
                </div>

                <div>
                  <h4 className="text-[11px] font-bold line-clamp-2 leading-tight text-white">
                    {m.title}
                  </h4>
                </div>

                <div className="text-[9px] font-mono truncate">
                  {isCompleted ? t('studentArea.completedBadge') : isAvailable ? t('studentArea.openNowBadge') : `🔒 ${formatDate(m.unlockDate).split(' ')[0]}`}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* 4. FAST SHORTCUT ACTION GRID */}
      <div className="space-y-4">
        <h2 className="text-base font-bold text-white font-display">
          {t('studentArea.shortcutsTitle')}
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Apostilas */}
          <div
            onClick={() => onNavigate('apostilas')}
            className="p-5 rounded-2xl bg-neutral-900/60 border border-neutral-800 hover:border-amber-500/50 transition-all cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center mb-3 group-hover:bg-amber-500/20 transition-colors">
              <BookOpen className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-white group-hover:text-amber-300 transition-colors flex items-center justify-between">
              <span>{t('studentArea.myApostilas')}</span>
              <ArrowRight className="w-4 h-4 text-neutral-500 group-hover:translate-x-1 transition-transform" />
            </h3>
            <p className="text-xs text-neutral-400 mt-1">
              {t('studentArea.myApostilasDesc')}
            </p>
          </div>

          {/* Filmes e Leituras Recomendadas */}
          <div
            onClick={() => onNavigate('filmes-leituras')}
            className="p-5 rounded-2xl bg-neutral-900/60 border border-neutral-800 hover:border-amber-500/50 transition-all cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center mb-3 group-hover:bg-amber-500/20 transition-colors">
              <Film className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-white group-hover:text-amber-300 transition-colors flex items-center justify-between">
              <span>{t('studentArea.filmsAndReadings')}</span>
              <ArrowRight className="w-4 h-4 text-neutral-500 group-hover:translate-x-1 transition-transform" />
            </h3>
            <p className="text-xs text-neutral-400 mt-1">
              {t('studentArea.filmsAndReadingsDesc')}
            </p>
          </div>

          {/* Masterclasses em Vídeo */}
          <div
            onClick={() => onNavigate('videos')}
            className="p-5 rounded-2xl bg-neutral-900/60 border border-neutral-800 hover:border-amber-500/50 transition-all cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center mb-3 group-hover:bg-amber-500/20 transition-colors">
              <Film className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-white group-hover:text-amber-300 transition-colors flex items-center justify-between">
              <span>{t('studentArea.videosTitle')}</span>
              <ArrowRight className="w-4 h-4 text-neutral-500 group-hover:translate-x-1 transition-transform" />
            </h3>
            <p className="text-xs text-neutral-400 mt-1">
              {t('studentArea.videosDesc')}
            </p>
          </div>

          {/* Atividades e Pesquisas */}
          <div
            onClick={() => onNavigate('atividades')}
            className="p-5 rounded-2xl bg-neutral-900/60 border border-neutral-800 hover:border-amber-500/50 transition-all cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center mb-3 group-hover:bg-amber-500/20 transition-colors">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-white group-hover:text-amber-300 transition-colors flex items-center justify-between">
              <span>{t('studentArea.activitiesTitle')}</span>
              <ArrowRight className="w-4 h-4 text-neutral-500 group-hover:translate-x-1 transition-transform" />
            </h3>
            <p className="text-xs text-neutral-400 mt-1">
              {t('studentArea.activitiesDesc')}
            </p>
          </div>

          {/* CineTutor IA - Tire suas Dúvidas */}
          <div
            onClick={() => onNavigate('tutor-ia')}
            className="p-5 rounded-2xl bg-gradient-to-br from-[#1d0638]/70 to-[#120424]/80 border border-purple-500/40 hover:border-amber-400/70 hover:shadow-[0_0_20px_rgba(168,85,247,0.25)] transition-all cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl bg-purple-500/20 text-amber-300 flex items-center justify-center mb-3 group-hover:bg-purple-500/30 transition-colors border border-purple-400/40">
              <Sparkles className="w-5 h-5 text-amber-400 animate-pulse" />
            </div>
            <h3 className="text-sm font-bold text-white group-hover:text-amber-300 transition-colors flex items-center justify-between">
              <span>CineTutor IA</span>
              <ArrowRight className="w-4 h-4 text-purple-400 group-hover:translate-x-1 transition-transform" />
            </h3>
            <p className="text-xs text-purple-200/70 mt-1">
              Tire dúvidas 24h sobre roteiro, decupagem, fotografia e os 10 módulos.
            </p>
          </div>

          {/* Avaliações */}
          <div
            onClick={() => onNavigate('avaliacoes')}
            className="p-5 rounded-2xl bg-neutral-900/60 border border-neutral-800 hover:border-amber-500/50 transition-all cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center mb-3 group-hover:bg-amber-500/20 transition-colors">
              <FileCheck className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-white group-hover:text-amber-300 transition-colors flex items-center justify-between">
              <span>{t('studentArea.evaluationsTitle')}</span>
              <ArrowRight className="w-4 h-4 text-neutral-500 group-hover:translate-x-1 transition-transform" />
            </h3>
            <p className="text-xs text-neutral-400 mt-1">
              {t('studentArea.evaluationsDesc')}
            </p>
          </div>

          {/* Notas */}
          <div
            onClick={() => onNavigate('notas')}
            className="p-5 rounded-2xl bg-neutral-900/60 border border-neutral-800 hover:border-amber-500/50 transition-all cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center mb-3 group-hover:bg-amber-500/20 transition-colors">
              <FileCheck className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-white group-hover:text-amber-300 transition-colors flex items-center justify-between">
              <span>{t('studentArea.gradesTitle')}</span>
              <ArrowRight className="w-4 h-4 text-neutral-500 group-hover:translate-x-1 transition-transform" />
            </h3>
            <p className="text-xs text-neutral-400 mt-1">
              {t('studentArea.gradesDesc')}
            </p>
          </div>

          {/* Certificado */}
          <div
            onClick={() => onNavigate('certificado')}
            className="p-5 rounded-2xl bg-neutral-900/60 border border-neutral-800 hover:border-amber-500/50 transition-all cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center mb-3 group-hover:bg-amber-500/20 transition-colors">
              <Award className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-white group-hover:text-amber-300 transition-colors flex items-center justify-between">
              <span>{t('studentArea.certificateTitle')}</span>
              <ArrowRight className="w-4 h-4 text-neutral-500 group-hover:translate-x-1 transition-transform" />
            </h3>
            <p className="text-xs text-neutral-400 mt-1">
              {t('studentArea.certificateDesc')}
            </p>
          </div>
        </div>
      </div>

      {/* 5. BONUS APOSTILAS BANNER */}
      {dashboardData.bonusApostilas && dashboardData.bonusApostilas.length > 0 && (
        <div className="p-6 rounded-2xl bg-neutral-900/50 border border-amber-500/30 space-y-4">
          <div className="flex items-center gap-2 text-xs font-mono text-amber-400 font-bold uppercase">
            <Sparkles className="w-4 h-4" /> {t('studentArea.bonusTitle')}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {dashboardData.bonusApostilas.map((b) => (
              <div
                key={b.id}
                onClick={() => onNavigate('apostilas')}
                className="p-4 rounded-xl bg-neutral-800/40 border border-neutral-700/60 hover:border-amber-500/40 transition-colors cursor-pointer flex items-center justify-between"
              >
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-[10px] font-mono text-amber-400 font-bold">{b.code || `${t('studentArea.bonusPrefix')}${b.number}`}</span>
                    <span className="text-[10px] font-mono text-amber-300 bg-neutral-900/90 px-2 py-0.5 rounded border border-neutral-700 font-bold flex items-center gap-1">
                      {(b.pagesCount && b.pagesCount !== 96 && b.pagesCount !== 104 ? b.pagesCount : (b.totalPages && b.totalPages !== 96 && b.totalPages !== 104 ? b.totalPages : (b.number === 1 ? 30 : 29)))} {t('studentArea.pagesCount')}
                    </span>
                  </div>
                  <h4 className="text-xs sm:text-sm font-bold text-white mt-1 font-sans">{b.title}</h4>
                </div>
                <BookOpen className="w-4 h-4 text-amber-400 shrink-0 ml-2" />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
