import React, { useEffect, useState } from 'react';
import { api } from '../services/api.js';
import { CourseModule } from '../types/index.js';
import { useLanguage } from '../i18n/LanguageContext.js';
import {
  CheckCircle2,
  Film,
  BookOpen,
  Clapperboard,
  Sparkles,
  Lock,
  Unlock,
  AlertCircle,
  ExternalLink,
} from 'lucide-react';

interface ActivitiesViewProps {
  isLoggedIn: boolean;
  onNavigate: (route: string) => void;
  initialModuleId?: number;
}

export const ActivitiesView: React.FC<ActivitiesViewProps> = ({
  isLoggedIn,
  onNavigate,
  initialModuleId = 1,
}) => {
  const { t } = useLanguage();
  const [modules, setModules] = useState<CourseModule[]>([]);
  const [selectedModuleId, setSelectedModuleId] = useState<number>(initialModuleId);
  const [moduleDetail, setModuleDetail] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [togglingId, setTogglingId] = useState<string | null>(null);

  useEffect(() => {
    loadModules();
  }, [isLoggedIn]);

  useEffect(() => {
    if (selectedModuleId) {
      loadModuleDetail(selectedModuleId);
    }
  }, [selectedModuleId, isLoggedIn]);

  const loadModules = async () => {
    try {
      if (isLoggedIn) {
        const data = await api.getStudentModules();
        setModules(data);
        const active = data.find((m) => m.status === 'available') || data[0];
        if (active) setSelectedModuleId(active.id);
      } else {
        const info = await api.getPublicCourseInfo();
        setModules(info.modules);
        setSelectedModuleId(1);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const loadModuleDetail = async (id: number) => {
    try {
      setLoading(true);
      if (isLoggedIn) {
        const data = await api.getStudentModuleDetail(id);
        setModuleDetail(data);
      } else {
        setModuleDetail({
          module: modules.find((m) => m.id === id) || { id, number: id, title: 'Linguagem Cinematográfica' },
          activities: [
            {
              id: 'demo-1',
              type: 'film',
              title: 'Cidadão Kane (Citizen Kane, 1941)',
              description: 'Dir. Orson Welles • Fotografia: Gregg Toland.',
              instructions: 'Observe a profundidade de campo extrema, tetos visíveis nos cenários e cortes temporais inovadores.',
              completed: false,
            },
            {
              id: 'demo-2',
              type: 'book',
              title: 'A Sentido do Cinema (Sergei Eisenstein)',
              description: 'Leitura dos Capítulos 1 e 2.',
              instructions: 'Reflita sobre a colisão de planos e a montagem intelectual.',
              completed: false,
            },
            {
              id: 'demo-3',
              type: 'exercise',
              title: 'Decupagem de Cena em 5 Planos',
              description: 'Escolha uma sequência de diálogo curta e desenhe a planta baixa com a posição da câmera.',
              instructions: 'Garanta a manutenção do eixo dos 180 graus para não quebrar a continuidade.',
              completed: false,
            },
          ],
        });
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleActivity = async (activityId: string) => {
    if (!isLoggedIn) {
      onNavigate('matricula');
      return;
    }

    try {
      setTogglingId(activityId);
      const res = await api.toggleActivity(activityId);
      setModuleDetail((prev: any) => {
        if (!prev) return prev;
        return {
          ...prev,
          activities: prev.activities.map((a: any) =>
            a.id === activityId ? { ...a, completed: res.completed } : a
          ),
        };
      });
    } catch (err) {
      console.error(err);
    } finally {
      setTogglingId(null);
    }
  };

  const currentModule = modules.find((m) => m.id === selectedModuleId);
  const isLocked = currentModule?.status === 'locked';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-neutral-200 space-y-10">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-mono font-medium uppercase tracking-wider">
          <Clapperboard className="w-3.5 h-3.5" /> {t('activities.badge')}
        </div>
        <h1 className="text-3xl sm:text-4xl font-display font-extrabold text-white">
          {t('activities.title')}
        </h1>
        <p className="text-xs sm:text-sm text-neutral-300">
          {t('activities.subtitle')}
        </p>
      </div>

      {/* Module Selector Pill Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {modules.map((m) => {
          const isSel = m.id === selectedModuleId;
          const locked = m.status === 'locked';
          return (
            <button
              key={m.id}
              onClick={() => setSelectedModuleId(m.id)}
              className={`px-3.5 py-2 rounded-xl text-xs font-mono whitespace-nowrap transition-all flex items-center gap-2 cursor-pointer border ${
                isSel
                  ? 'bg-amber-500 text-neutral-950 font-bold border-amber-400 shadow-md shadow-amber-500/20'
                  : locked
                  ? 'bg-neutral-900/40 text-neutral-500 border-neutral-800'
                  : 'bg-neutral-900 text-neutral-300 border-neutral-700 hover:bg-neutral-800'
              }`}
            >
              <span>{t('activities.modulePrefix')}{m.number}</span>
              {locked ? <Lock className="w-2.5 h-2.5" /> : <Unlock className="w-2.5 h-2.5" />}
            </button>
          );
        })}
      </div>

      {/* Module Details & Activities */}
      {isLocked ? (
        <div className="p-12 rounded-3xl bg-neutral-900 border border-neutral-800 text-center space-y-4">
          <Lock className="w-12 h-12 text-neutral-500 mx-auto" />
          <h2 className="text-xl font-bold text-white">{t('activities.lockedTitle')}</h2>
          <p className="text-xs text-neutral-400 max-w-md mx-auto">
            {t('activities.lockedDesc')}
          </p>
        </div>
      ) : loading ? (
        <div className="py-16 text-center text-neutral-500 font-mono text-xs">
          {t('activities.loading')}
        </div>
      ) : (
        <div className="space-y-8">
          {/* Module Banner */}
          <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-neutral-900 via-[#12141c] to-neutral-900 border border-neutral-800 space-y-2">
            <span className="text-xs font-mono text-amber-400 font-bold">
              {t('activities.stagePrefix')}{currentModule?.number}
            </span>
            <h2 className="text-xl sm:text-2xl font-display font-bold text-white">
              {currentModule?.title}
            </h2>
            <p className="text-xs text-neutral-300 leading-relaxed max-w-3xl">
              {currentModule?.summary}
            </p>
          </div>

          {/* Activities List */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {moduleDetail?.activities?.map((act: any) => {
              const isCompleted = !!act.completed;
              const isFilm = act.type === 'film';
              const isBook = act.type === 'book';

              return (
                <div
                  key={act.id}
                  className={`p-6 rounded-2xl border transition-all flex flex-col justify-between ${
                    isCompleted
                      ? 'bg-emerald-950/15 border-emerald-800/60 shadow-lg'
                      : 'bg-neutral-900/60 border-neutral-800 hover:border-neutral-700'
                  }`}
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span className="inline-flex items-center gap-1.5 text-amber-400 font-bold">
                        {isFilm && <Film className="w-4 h-4" />}
                        {isBook && <BookOpen className="w-4 h-4" />}
                        {!isFilm && !isBook && <Clapperboard className="w-4 h-4" />}
                        {isFilm ? t('activities.filmSuggested') : isBook ? t('activities.bookSuggested') : t('activities.setPractice')}
                      </span>
                      {isCompleted && (
                        <span className="text-[10px] font-bold text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800">
                          {t('activities.completed')}
                        </span>
                      )}
                    </div>

                    <h3 className="text-base font-bold text-white">{act.title}</h3>
                    <p className="text-xs text-amber-300/90 font-mono">{act.description}</p>
                    <p className="text-xs text-neutral-400 leading-relaxed">{act.instructions}</p>
                  </div>

                  <div className="pt-6 border-t border-neutral-800/80 mt-4">
                    <button
                      disabled={togglingId === act.id}
                      onClick={() => handleToggleActivity(act.id)}
                      className={`w-full py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                        isCompleted
                          ? 'bg-emerald-950/60 hover:bg-emerald-900/60 text-emerald-300 border border-emerald-700/60'
                          : 'bg-neutral-800 hover:bg-amber-500 hover:text-neutral-950 text-neutral-200'
                      }`}
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      <span>{isCompleted ? t('activities.unmarkCompleted') : t('activities.markCompleted')}</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
