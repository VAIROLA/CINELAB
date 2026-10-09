import React, { useState, useEffect } from 'react';
import { CourseSettings, CourseModule } from '../types/index.js';
import { api } from '../services/api.js';
import { CourseBannerPromo } from '../components/CourseBannerPromo.js';
import { WelcomeMessageSection } from '../components/WelcomeMessageSection.js';
import { useLanguage } from '../i18n/LanguageContext.js';
import {
  Film,
  Award,
  BookOpen,
  PlayCircle,
  Calendar,
  CheckCircle2,
  Lock,
  ArrowRight,
  ShieldCheck,
  Video,
  Clapperboard,
  Tv,
  Layers,
  HelpCircle,
  Sparkles,
  CreditCard,
  QrCode,
  Clock,
  ChevronRight,
  User as UserIcon,
  Star,
} from 'lucide-react';

interface HomeViewProps {
  onNavigate: (route: string) => void;
  onOpenAuth: () => void;
  settings?: CourseSettings | null;
  modules?: CourseModule[];
  isLoggedIn?: boolean;
  isAdmin?: boolean;
}

export const HomeView: React.FC<HomeViewProps> = ({
  onNavigate,
  onOpenAuth,
  settings,
  modules = [],
  isAdmin = false,
}) => {
  const { t, getModuleTranslation, language } = useLanguage();
  const [localSettings, setLocalSettings] = useState<CourseSettings | null>(settings || null);
  const [localModules, setLocalModules] = useState<CourseModule[]>(modules || []);

  useEffect(() => {
    if (settings) setLocalSettings(settings);
  }, [settings]);

  useEffect(() => {
    if (modules && modules.length > 0) {
      setLocalModules(modules);
    } else if (localModules.length === 0) {
      api.getPublicCourseInfo()
        .then((res) => {
          if (res.settings) setLocalSettings(res.settings);
          if (res.modules && res.modules.length > 0) setLocalModules(res.modules);
        })
        .catch((err) => {
          console.error('Erro ao buscar dados públicos na Home:', err);
        });
    }
  }, [modules]);

  const currentSettings = localSettings || settings;
  const currentModules = (localModules && localModules.length > 0) ? localModules : (modules || []);

  const price = currentSettings?.coursePrice || 1000.00;
  const originalPrice = currentSettings?.coursePriceOriginal || 2000.00;
  const maxInstallments = currentSettings?.maxInstallments || 12;
  const installmentValue = (price / maxInstallments).toFixed(2);

  const learningPillars = [
    {
      icon: Film,
      title: t('home.pillar1Title'),
      desc: t('home.pillar1Desc'),
    },
    {
      icon: Layers,
      title: t('home.pillar2Title'),
      desc: t('home.pillar2Desc'),
    },
    {
      icon: Clapperboard,
      title: t('home.pillar3Title'),
      desc: t('home.pillar3Desc'),
    },
    {
      icon: Video,
      title: t('home.pillar4Title'),
      desc: t('home.pillar4Desc'),
    },
    {
      icon: Tv,
      title: t('home.pillar5Title'),
      desc: t('home.pillar5Desc'),
    },
    {
      icon: PlayCircle,
      title: t('home.pillar6Title'),
      desc: t('home.pillar6Desc'),
    },
  ];

  const targetAudiences = [
    {
      title: t('home.aud1Title'),
      desc: t('home.aud1Desc'),
    },
    {
      title: t('home.aud2Title'),
      desc: t('home.aud2Desc'),
    },
    {
      title: t('home.aud3Title'),
      desc: t('home.aud3Desc'),
    },
    {
      title: t('home.aud4Title'),
      desc: t('home.aud4Desc'),
    },
  ];

  const faqs = [
    {
      q: {
        pt: 'Qual é a duração total do curso?',
        en: 'What is the total duration of the course?',
        es: '¿Cuál es la duración total del curso?',
        fr: 'Quelle est la durée totale du cours ?',
      }[language] || 'Qual é a duração total do curso?',
      a: {
        pt: 'O curso possui duração total de 3 meses (90 dias de formação contínua), distribuídos em 10 etapas pedagógicas calibradas por conteúdo mais as 3 apostilas bônus.',
        en: 'The course has a total duration of 3 months (90 days of continuous training), distributed across 10 pedagogical stages calibrated by content plus 3 bonus handouts.',
        es: 'El curso tiene una duración total de 3 meses (90 días de formación continua), distribuidos en 10 etapas pedagógicas más los 3 manuales bono.',
        fr: 'Le cours a une durée totale de 3 mois (90 jours de formation continue), répartis en 10 étapes pédagogiques plus 3 fascicules bonus.',
      }[language] || 'O curso possui duração total de 3 meses...',
    },
    {
      q: {
        pt: 'Posso adiantar as aulas e terminar o curso antes de 3 meses?',
        en: 'Can I rush through lessons and finish the course before 3 months?',
        es: '¿Puedo adelantar las clases y terminar el curso antes de 3 meses?',
        fr: 'Puis-je avancer les cours et terminer avant 3 mois ?',
      }[language] || 'Posso adiantar as aulas e terminar o curso antes de 3 meses?',
      a: {
        pt: 'Não. Uma das regras fundamentais do CINELAB é o respeito absoluto ao cronograma pedagógico. Mesmo que você conclua a leitura e os exercícios da Apostila 01 em 3 dias, a Apostila 02 só será liberada na data programada. Esse tempo de imersão é essencial para assistir aos filmes recomendados, ler os capítulos indicados, executar as pesquisas e consolidar o aprendizado.',
        en: 'No. One of CINELAB\'s fundamental rules is absolute respect for the pedagogical timeline. Even if you finish Handout 01 in 3 days, Handout 02 only unlocks on its scheduled date. This immersion period is vital to watch recommended films, read book chapters, and consolidate mastery.',
        es: 'No. Una de las reglas fundamentales de CINELAB es el respeto al cronograma pedagógico. Aunque termines el Manual 01 en 3 días, el Manual 02 solo se habilitará en la fecha programada. Este tiempo es indispensable para asimilar la materia.',
        fr: 'Non. L\'une des règles fondamentales de CINELAB est le respect strict du calendrier pédagogique. Même si vous finissez le Fascicule 01 en 3 jours, le Fascicule 02 ne sera débloqué qu\'à la date prévue. Ce temps est indispensable à l\'assimilation.',
      }[language] || 'Não...',
    },
    {
      q: {
        pt: 'Quando a avaliação de cada etapa é liberada?',
        en: 'When is each stage\'s evaluation released?',
        es: '¿Cuándo se habilita la evaluación de cada etapa?',
        fr: 'Quand l\'évaluation de chaque étape est-elle accessible ?',
      }[language] || 'Quando a avaliação de cada etapa é liberada?',
      a: {
        pt: 'A avaliação online de cada módulo é liberada automaticamente no sistema 2 a 3 dias antes do encerramento oficial daquela etapa, permitindo que o aluno conclua seus estudos e teste seus conhecimentos com tranquilidade.',
        en: 'The online evaluation for each module is automatically opened 2 to 3 days before the stage conclusion, allowing you to complete studies and test your knowledge calmly.',
        es: 'La evaluación online de cada módulo se libera automáticamente 2 a 3 días antes del cierre de esa etapa, permitiendo al alumno repasar con tranquilidad.',
        fr: 'L\'évaluation en ligne de chaque module est ouverte automatiquement 2 à 3 jours avant la fin de l\'étape pour vous permettre de tester vos acquis sereinement.',
      }[language] || 'A avaliação...',
    },
    {
      q: {
        pt: 'Como funciona o Certificado de Conclusão?',
        en: 'How does the Certificate of Completion work?',
        es: '¿Cómo funciona el Certificado de Finalización?',
        fr: 'Comment fonctionne le Certificat de Réussite ?',
      }[language] || 'Como funciona o Certificado de Conclusão?',
      a: {
        pt: 'O certificado oficial CINELAB (180h) é emitido após a conclusão de todas as 10 etapas e aprovação nas avaliações com nota média superior a 6.0. O documento possui código verificável online na página pública de validação.',
        en: 'The official CINELAB certificate (180h) is awarded after completing all 10 stages with an average grade above 6.0. It includes a verifiable code on the public validation portal.',
        es: 'El certificado oficial CINELAB (180h) se emite tras completar las 10 etapas con promedio superior a 6.0. Posee código verificable en la página pública.',
        fr: 'Le certificat officiel CINELAB (180h) est délivré après validation des 10 étapes avec une moyenne supérieure à 6.0. Il comporte un code vérifiable en ligne.',
      }[language] || 'O certificado...',
    },
    {
      q: {
        pt: 'Quais são as formas de pagamento disponíveis?',
        en: 'What payment methods are accepted?',
        es: '¿Cuáles son las formas de pago disponibles?',
        fr: 'Quels sont les modes de paiement acceptés ?',
      }[language] || 'Quais são as formas de pagamento disponíveis?',
      a: {
        pt: 'Você pode realizar o pagamento via PIX (com chave e QR Code instantâneo) ou Cartão de Crédito em até 12 parcelas fixas com liberação automática da matrícula.',
        en: 'You can pay via instant PIX/wire or credit card in up to 12 installments with instant automated enrollment release.',
        es: 'Puedes abonar mediante transferencia instantánea o tarjeta de crédito en hasta 12 cuotas con activación automática de matrícula.',
        fr: 'Vous pouvez régler par virement immédiat ou carte bancaire jusqu\'à 12 mensualités avec activation immédiate de l\'inscription.',
      }[language] || 'Você pode...',
    },
  ];

  return (
    <div className="min-h-screen text-neutral-200 w-full max-w-full overflow-x-hidden">
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden pt-12 pb-20 lg:pt-20 lg:pb-28 border-b border-neutral-800">
        {/* Cinematic Backdrop Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-amber-600/10 blur-[130px] pointer-events-none rounded-full" />

        {/* 35mm Perforations Border Visual Motif */}
        <div className="absolute inset-x-0 top-0 h-2 bg-gradient-to-r from-neutral-950 via-neutral-900 to-neutral-950 flex justify-around opacity-40">
          {Array.from({ length: 30 }).map((_, i) => (
            <div key={i} className="w-1.5 h-1.5 bg-neutral-700 rounded-sm" />
          ))}
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center max-w-4xl mx-auto">
            {/* Clapperboard Stage Label */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-neutral-900/90 border border-amber-500/30 text-amber-300 text-xs font-mono font-medium uppercase tracking-wider mb-6 shadow-inner">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
              <span>{t('home.stageBadge')}</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-2xl xs:text-3xl sm:text-5xl lg:text-6xl font-display font-extrabold text-white tracking-tight leading-[1.1] mb-6 break-words">
              {t('home.heroTitle1')}{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-amber-500">
                {t('home.heroTitle2')}
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-neutral-300 leading-relaxed mb-8 max-w-3xl mx-auto font-sans font-normal">
              {t('home.heroSubtitle')}
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
              <button
                onClick={() => onNavigate('matricula')}
                className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-neutral-950 text-sm font-extrabold uppercase tracking-wider rounded-xl shadow-xl shadow-amber-500/20 hover:shadow-amber-500/30 transition-all cursor-pointer flex items-center justify-center gap-2 group active:scale-98"
                id="hero-matricula-cta"
              >
                <span>{t('home.enrollBtn')}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => onNavigate('curso')}
                className="w-full sm:w-auto px-7 py-4 bg-neutral-900/90 hover:bg-neutral-800 text-neutral-200 hover:text-white border border-neutral-700 hover:border-neutral-600 text-sm font-semibold rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <Film className="w-4 h-4 text-amber-400" />
                <span>{t('home.courseBtn')}</span>
              </button>

              <button
                onClick={() => onNavigate('tutor-ia')}
                className="w-full sm:w-auto px-6 py-4 bg-gradient-to-r from-purple-900/60 to-purple-800/60 hover:from-purple-800/80 hover:to-purple-700/80 text-purple-100 hover:text-white border border-purple-400/50 text-sm font-semibold rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(168,85,247,0.25)]"
                id="hero-tutor-cta"
              >
                <Sparkles className="w-4 h-4 text-amber-300 animate-pulse" />
                <span>Tutor IA (Tire Dúvidas)</span>
              </button>
            </div>

            {/* Quick Metrics Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 border-t border-neutral-800/80 text-left">
              <div className="p-3.5 rounded-xl bg-neutral-900/50 border border-neutral-800/80">
                <span className="block text-2xl font-display font-bold text-amber-400">{t('home.metricDuration')}</span>
                <span className="text-xs text-neutral-400">{t('home.metricDurationLabel')}</span>
              </div>
              <div className="p-3.5 rounded-xl bg-neutral-900/50 border border-neutral-800/80">
                <span className="block text-2xl font-display font-bold text-white">{t('home.metricHandouts')}</span>
                <span className="text-xs text-neutral-400">{t('home.metricHandoutsLabel')}</span>
              </div>
              <div className="p-3.5 rounded-xl bg-neutral-900/50 border border-neutral-800/80">
                <span className="block text-2xl font-display font-bold text-white">{t('home.metricSchedule')}</span>
                <span className="text-xs text-neutral-400">{t('home.metricScheduleLabel')}</span>
              </div>
              <div className="p-3.5 rounded-xl bg-neutral-900/50 border border-neutral-800/80">
                <span className="block text-2xl font-display font-bold text-amber-400">{t('home.metricWorkload')}</span>
                <span className="text-xs text-neutral-400">{t('home.metricWorkloadLabel')}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BANNER OFICIAL DO CURSO COM OS VALORES */}
      <section className="py-12 sm:py-16 bg-[#07080a] border-b border-neutral-800" id="banner-promocional">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <CourseBannerPromo
            onNavigate={onNavigate}
            settings={currentSettings}
          />
        </div>
      </section>

      {/* MENSAGEM E VÍDEO DE BOAS-VINDAS AOS NOVOS ALUNOS (PROFESSOR TONY DE LUC) */}
      <WelcomeMessageSection
        settings={currentSettings}
        onNavigate={onNavigate}
        isAdmin={isAdmin}
        onSettingsUpdated={(newSettings) => setLocalSettings(newSettings)}
      />

      {/* 2. APRESENTAÇÃO DO CINELAB */}
      <section className="py-16 lg:py-24 bg-[#0a0b0e] border-b border-neutral-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold uppercase tracking-widest text-amber-400">
                <Sparkles className="w-3.5 h-3.5" /> {t('home.labBadge')}
              </div>
              <h2 className="text-2xl sm:text-4xl font-display font-bold text-white leading-tight">
                {t('home.labTitle')}
              </h2>
              <p className="text-sm text-neutral-300 leading-relaxed">
                {t('home.labP1')}
              </p>
              <p className="text-sm text-neutral-400 leading-relaxed">
                {t('home.labP2')}
              </p>

              <div className="space-y-3 pt-2">
                <div className="flex items-start gap-3">
                  <div className="p-1 rounded bg-amber-500/20 text-amber-400 mt-0.5">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white">{t('home.labFeature1Title')}</h4>
                    <p className="text-xs text-neutral-400">{t('home.labFeature1Desc')}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-1 rounded bg-amber-500/20 text-amber-400 mt-0.5">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white">{t('home.labFeature2Title')}</h4>
                    <p className="text-xs text-neutral-400">{t('home.labFeature2Desc')}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Coleção Completa de Apostilas Didáticas */}
            <div className="lg:col-span-6 relative flex flex-col justify-center">
              <div
                onClick={() => onNavigate('apostilas')}
                className="group relative rounded-2xl overflow-hidden border border-amber-500/30 bg-neutral-900/90 shadow-2xl transition-all duration-300 hover:border-amber-500/60 hover:shadow-amber-500/10 hover:shadow-2xl cursor-pointer"
                title="Clique para conhecer as apostilas completas do curso CINELAB"
              >
                <div className="relative overflow-hidden bg-neutral-950">
                  <img
                    src="/images/apostilas-colecao-completa.jpg"
                    alt="Coleção Completa de Apostilas Didáticas CINELAB - 10 Módulos Oficiais do Professor Tony de Luc"
                    className="w-full h-auto object-contain transition-transform duration-500 group-hover:scale-[1.02]"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center pb-4">
                    <span className="px-3.5 py-1.5 rounded-lg bg-amber-500 text-neutral-950 font-mono text-xs font-bold shadow-lg flex items-center gap-1.5">
                      <BookOpen className="w-3.5 h-3.5" />
                      <span>{t('nav.apostilas') || 'Explorar Apostilas'}</span>
                    </span>
                  </div>
                </div>

                <div className="p-4 sm:p-5 bg-gradient-to-b from-neutral-900/95 to-neutral-950 border-t border-neutral-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-amber-500 text-neutral-950 font-bold uppercase tracking-wider">
                        {t('home.labSetTag')}
                      </span>
                      <span className="text-xs font-mono text-amber-400 font-semibold">
                        {t('home.labSetLens')}
                      </span>
                    </div>
                    <h3 className="text-sm font-bold font-display text-white">
                      {t('home.labSetTitle')}
                    </h3>
                    <p className="text-xs text-neutral-300 mt-1 leading-relaxed">
                      {t('home.labSetDesc')}
                    </p>
                  </div>
                  <div className="shrink-0 self-start sm:self-center">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-neutral-800 group-hover:bg-amber-500 group-hover:text-neutral-950 text-neutral-200 text-xs font-mono font-bold transition">
                      <span>{t('nav.apostilas') || 'Apostilas'}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. O QUE O ALUNO APRENDERÁ */}
      <section className="py-16 lg:py-24 border-b border-neutral-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-mono uppercase tracking-widest text-amber-400 font-semibold">
              {t('home.pillarsBadge')}
            </span>
            <h2 className="text-2xl sm:text-4xl font-display font-bold text-white mt-2 mb-4">
              {t('home.pillarsTitle')}
            </h2>
            <p className="text-sm text-neutral-400">
              {t('home.pillarsSubtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {learningPillars.map((p, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-neutral-900/40 border border-neutral-800 hover:border-amber-500/40 transition-all hover:-translate-y-0.5 group"
              >
                <div className="w-10 h-10 rounded-xl bg-neutral-800/80 border border-neutral-700 flex items-center justify-center text-amber-400 mb-4 group-hover:bg-amber-500/10 group-hover:border-amber-500/50 transition-colors">
                  <p.icon className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-white mb-2">{p.title}</h3>
                <p className="text-xs text-neutral-400 leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. COMO FUNCIONA: A REGRA FUNDAMENTAL DO CRONOGRAMA */}
      <section className="py-16 lg:py-24 bg-[#0a0b0e] border-b border-neutral-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-5 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-mono font-medium">
                <Clock className="w-3.5 h-3.5" /> {t('home.scheduleBadge')}
              </div>
              <h2 className="text-2xl sm:text-4xl font-display font-bold text-white leading-tight">
                {t('home.scheduleTitle')}
              </h2>
              <div className="p-4 rounded-xl bg-amber-950/20 border border-amber-800/40 text-xs text-amber-200 leading-relaxed">
                <strong className="block text-amber-300 font-bold mb-1">{t('home.scheduleRuleBadge')}</strong>
                {t('home.scheduleRuleText')}
              </div>
              <p className="text-xs text-neutral-400 leading-relaxed">
                {t('home.scheduleIntro')}
              </p>
              <ul className="space-y-2 text-xs text-neutral-300">
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                  {t('home.scheduleTask1')}
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                  {t('home.scheduleTask2')}
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                  {t('home.scheduleTask3')}
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                  {t('home.scheduleTask4')}
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                  {t('home.scheduleTask5')}
                </li>
              </ul>
            </div>

            {/* Step-by-Step Schedule Diagram */}
            <div className="lg:col-span-7 bg-neutral-900/60 border border-neutral-800 rounded-2xl p-6 sm:p-8 space-y-6">
              <h3 className="text-sm font-bold font-mono uppercase tracking-wider text-neutral-200 flex items-center justify-between border-b border-neutral-800 pb-3">
                <span>{t('home.scheduleCycleHeader')}</span>
                <span className="text-amber-400 text-xs">{t('home.scheduleCycleSub')}</span>
              </h3>

              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-neutral-800/40 border border-neutral-700/60 flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-emerald-500/20 text-emerald-400 font-mono text-xs font-bold shrink-0 text-center min-w-[70px]">
                    <div className="leading-tight">{language === 'en' ? 'DAY 01' : language === 'es' ? 'DÍA 01' : language === 'fr' ? 'JOUR 01' : 'DIA 01'}</div>
                    <div className="text-[9px] uppercase tracking-wider text-emerald-400/80 mt-0.5">{language === 'en' ? 'START' : language === 'es' ? 'INICIO' : language === 'fr' ? 'DÉBUT' : 'INÍCIO'}</div>
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white">{t('home.scheduleDay1Title')}</h4>
                    <p className="text-[11px] text-neutral-400 mt-0.5 leading-relaxed">
                      {t('home.scheduleDay1Desc')}
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-neutral-800/40 border border-neutral-700/60 flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-amber-500/20 text-amber-400 font-mono text-xs font-bold shrink-0 text-center min-w-[70px]">
                    <div className="leading-tight">{language === 'en' ? 'DAYS 02+' : language === 'es' ? 'DÍAS 02+' : language === 'fr' ? 'JOURS 02+' : 'DIAS 02+'}</div>
                    <div className="text-[9px] uppercase tracking-wider text-amber-400/80 mt-0.5">{language === 'en' ? 'IMMERSION' : language === 'es' ? 'ESTUDIO' : language === 'fr' ? 'ÉTUDE' : 'IMERSÃO'}</div>
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white">{t('home.scheduleDay210Title')}</h4>
                    <p className="text-[11px] text-neutral-400 mt-0.5 leading-relaxed">
                      {t('home.scheduleDay210Desc')}
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-amber-950/30 border border-amber-800/50 flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-amber-500 text-neutral-950 font-mono text-xs font-bold shrink-0 text-center min-w-[70px]">
                    <div className="leading-tight">{language === 'en' ? '-2/3 DAYS' : language === 'es' ? '-2/3 DÍAS' : language === 'fr' ? '-2/3 JOURS' : '2 A 3 DIAS'}</div>
                    <div className="text-[9px] uppercase tracking-wider font-extrabold mt-0.5">{language === 'en' ? 'BEFORE END' : language === 'es' ? 'ANTES FIN' : language === 'fr' ? 'AVANT FIN' : 'ANTES DO FIM'}</div>
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-amber-200">{t('home.scheduleDay11Title')}</h4>
                    <p className="text-[11px] text-amber-200/90 mt-0.5 leading-relaxed">
                      {t('home.scheduleDay11Desc')}
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-neutral-800/40 border border-neutral-700/60 flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-neutral-700 text-neutral-300 font-mono text-xs font-bold shrink-0 text-center min-w-[70px]">
                    <div className="leading-tight">{language === 'en' ? '7-10 DAYS' : language === 'es' ? '7-10 DÍAS' : language === 'fr' ? '7-10 JOURS' : '7 A 10 DIAS'}</div>
                    <div className="text-[9px] uppercase tracking-wider text-neutral-400 mt-0.5">{language === 'en' ? 'STAGE END' : language === 'es' ? 'FIN ETAPA' : language === 'fr' ? 'FIN ÉTAPE' : 'FIM ETAPA'}</div>
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white">{t('home.scheduleDay15Title')}</h4>
                    <p className="text-[11px] text-neutral-400 mt-0.5 leading-relaxed">
                      {t('home.scheduleDay15Desc')}
                    </p>
                  </div>
                </div>
              </div>

              {/* Module Distribution Table by Counted Days */}
              <div className="pt-4 border-t border-neutral-800/80 space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-xs">
                  <span className="font-mono font-medium text-neutral-300">
                    {language === 'en' ? 'Distribution of the 10 Stages (90 Days Total):' :
                     language === 'es' ? 'Distribución de las 10 Etapas (90 Días en Total):' :
                     language === 'fr' ? 'Répartition des 10 Étapes (90 Jours au Total) :' :
                     'Distribuição das 10 Etapas por Dias Contados (90 Dias):'}
                  </span>
                  <span className="text-amber-400 font-bold font-mono text-[11px]">
                    {language === 'en' ? '180h Certificate' : 'Certificado 180h'}
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px] font-mono">
                  <div className="p-2.5 rounded-xl bg-neutral-800/60 border border-neutral-700/60">
                    <div className="text-amber-400 font-bold">Módulo 01</div>
                    <div className="text-neutral-200 font-medium">7 dias contados</div>
                    <div className="text-[10px] text-emerald-400 mt-0.5">Avaliação: Dia 5</div>
                  </div>
                  <div className="p-2.5 rounded-xl bg-neutral-800/60 border border-neutral-700/60">
                    <div className="text-amber-400 font-bold">Módulos 02 e 06</div>
                    <div className="text-neutral-200 font-medium">8 dias contados</div>
                    <div className="text-[10px] text-emerald-400 mt-0.5">Avaliação: Dia 6</div>
                  </div>
                  <div className="p-2.5 rounded-xl bg-neutral-800/60 border border-neutral-700/60">
                    <div className="text-amber-400 font-bold">Módulos 04, 08 e 09</div>
                    <div className="text-neutral-200 font-medium">9 dias contados</div>
                    <div className="text-[10px] text-emerald-400 mt-0.5">Avaliação: Dia 7</div>
                  </div>
                  <div className="p-2.5 rounded-xl bg-neutral-800/60 border border-neutral-700/60">
                    <div className="text-amber-400 font-bold">Módulos 03, 05, 07, 10</div>
                    <div className="text-neutral-200 font-medium">10 dias contados</div>
                    <div className="text-[10px] text-emerald-400 mt-0.5">Avaliação: Dia 7</div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-1 text-[11px] text-neutral-400">
                  <p>
                    {language === 'en' ? 'Each stage has an active real-time countdown timer calibrated by content density.' :
                     language === 'es' ? 'Cada etapa cuenta con un cronómetro activo en tiempo real calibrado por contenido.' :
                     language === 'fr' ? 'Chaque étape possède un compte à rebours actif calibré selon la densité du contenu.' :
                     'Cada etapa possui cronômetro ativo em tempo real calibrado pela densidade do conteúdo.'}
                  </p>
                  <button
                    onClick={() => onNavigate('metodologia')}
                    className="text-xs text-amber-400 hover:text-amber-300 font-semibold underline underline-offset-4 cursor-pointer shrink-0"
                  >
                    {language === 'en' ? 'Explore Methodology →' : language === 'es' ? 'Ver Metodología →' : language === 'fr' ? 'Découvrir la Méthodologie →' : 'Ver Metodologia Completa →'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. AS 10 APOSTILAS PRINCIPAIS + 3 BÔNUS */}
      <section className="py-16 lg:py-24 border-b border-neutral-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-amber-400 font-semibold">
                {t('home.handoutsBadge')}
              </span>
              <h2 className="text-2xl sm:text-4xl font-display font-bold text-white mt-1">
                {t('home.handoutsTitle')}
              </h2>
              <p className="text-xs text-neutral-400 mt-1 max-w-xl">
                {t('home.handoutsSubtitle')}
              </p>
            </div>

            <button
              onClick={() => onNavigate('apostilas')}
              className="px-4 py-2 rounded-lg bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 text-xs font-semibold text-neutral-200 hover:text-white flex items-center gap-2 cursor-pointer w-fit"
            >
              <BookOpen className="w-3.5 h-3.5 text-amber-400" />
              <span>{t('home.handoutsBtn')}</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {(currentModules || []).slice(0, 8).map((m) => {
              const trans = getModuleTranslation(m.id);
              return (
                <div
                  key={m.id}
                  onClick={() => onNavigate('apostilas')}
                  className="p-4 rounded-xl bg-neutral-900/50 border border-neutral-800 hover:border-neutral-700 transition-all cursor-pointer group"
                >
                  <div className="flex items-center justify-between text-[11px] font-mono mb-2">
                    <span className="text-amber-400 font-bold">
                      {language === 'en' ? `HANDOUT 0${m.number}` : language === 'es' ? `MANUAL 0${m.number}` : language === 'fr' ? `FASCICULE 0${m.number}` : `APOSTILA 0${m.number}`}
                    </span>
                    <span className="text-neutral-400 font-mono text-[10px] px-1.5 py-0.5 rounded bg-neutral-800 border border-neutral-700/60">
                      {(m.durationDays || (m.number === 1 ? 7 : (m.number === 3 || m.number === 5 || m.number === 7 || m.number === 10 ? 10 : (m.number === 2 || m.number === 6 ? 8 : 9))))} {language === 'pt' ? 'dias' : language === 'en' ? 'days' : language === 'es' ? 'días' : 'jours'}
                    </span>
                  </div>
                  <h3 className="text-xs font-bold text-white group-hover:text-amber-300 transition-colors line-clamp-1 mb-1">
                    {trans.title || m.title}
                  </h3>
                  <p className="text-[11px] text-neutral-400 line-clamp-2 leading-relaxed">
                    {trans.subtitle || m.subtitle}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Bonus callout banner */}
          <div className="mt-8 p-6 rounded-2xl bg-gradient-to-r from-amber-950/30 via-neutral-900 to-amber-950/20 border border-amber-800/40 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 shrink-0">
                <Sparkles className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-amber-400 font-bold">
                  {t('home.bonusBadge')}
                </span>
                <h3 className="text-sm font-bold text-white">{t('home.bonusTitle')}</h3>
                <p className="text-xs text-neutral-300 mt-0.5">
                  {t('home.bonusSubtitle')}
                </p>
              </div>
            </div>

            <button
              onClick={() => onNavigate('matricula')}
              className="px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-neutral-950 text-xs font-bold uppercase rounded-lg shrink-0 transition-colors cursor-pointer"
            >
              {t('home.bonusBtn')}
            </button>
          </div>
        </div>
      </section>

      {/* 6. PARA QUEM É O CURSO */}
      <section className="py-16 lg:py-24 bg-[#0a0b0e] border-b border-neutral-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-mono uppercase tracking-widest text-amber-400 font-semibold">
              {t('home.audienceBadge')}
            </span>
            <h2 className="text-2xl sm:text-4xl font-display font-bold text-white mt-2 mb-4">
              {t('home.audienceTitle')}
            </h2>
            <p className="text-sm text-neutral-400">
              {t('home.audienceSubtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {targetAudiences.map((item, i) => (
              <div
                key={i}
                className="p-6 rounded-2xl bg-neutral-900/60 border border-neutral-800/90 flex gap-4 items-start"
              >
                <div className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-400 flex items-center justify-center font-mono font-bold text-xs shrink-0 mt-0.5">
                  0{i + 1}
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white mb-1.5">{item.title}</h3>
                  <p className="text-xs text-neutral-400 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. CERTIFICADO CINELAB & VALIDAÇÃO PÚBLICA */}
      <section className="py-16 lg:py-24 border-b border-neutral-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold uppercase tracking-widest text-amber-400">
                <Award className="w-3.5 h-3.5" /> {t('home.certBadge')}
              </div>
              <h2 className="text-2xl sm:text-4xl font-display font-bold text-white leading-tight">
                {t('home.certTitle')}
              </h2>
              <p className="text-sm text-neutral-300 leading-relaxed">
                {t('home.certSubtitle')}
              </p>
              <div className="space-y-2 text-xs text-neutral-400">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>{t('home.certItem1')}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>{t('home.certItem2')}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>{t('home.certItem3')}</span>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => onNavigate('validar-certificado')}
                  className="px-4 py-2.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 text-xs font-semibold text-amber-400 hover:text-amber-300 flex items-center gap-2 cursor-pointer"
                >
                  <ShieldCheck className="w-4 h-4" />
                  <span>{t('home.certBtn')}</span>
                </button>
              </div>
            </div>

            {/* Certificate Preview Mockup */}
            <div className="lg:col-span-6">
              <div className="relative p-6 sm:p-8 rounded-2xl bg-neutral-900 border-2 border-amber-500/30 shadow-2xl space-y-6 text-center">
                <div className="border border-neutral-700/60 p-6 rounded-xl bg-[#0e1017]">
                  <div className="text-[10px] font-mono tracking-[0.3em] uppercase text-amber-400 font-bold mb-1">
                    {language === 'en'
                      ? 'FEDERATIVE REPUBLIC OF BRAZIL • E-LEARNING PLATFORM'
                      : language === 'es'
                      ? 'REPÚBLICA FEDERATIVA DEL BRASIL • PLATAFORMA EAD'
                      : language === 'fr'
                      ? 'RÉPUBLIQUE FÉDÉRATIVE DU BRÉSIL • PLATEFORME EAD'
                      : 'REPÚBLICA FEDERATIVA DO BRASIL • PLATAFORMA EAD'}
                  </div>
                  <h3 className="text-xl font-display font-extrabold text-white">
                    CINELAB – CINEMA & AUDIOVISUAL
                  </h3>
                  <div className="w-16 h-0.5 bg-amber-500 mx-auto my-3" />
                  <p className="text-xs text-neutral-400 uppercase tracking-widest mb-4">
                    {language === 'en'
                      ? 'PROFESSIONAL DIPLOMA & CERTIFICATE'
                      : language === 'es'
                      ? 'CERTIFICADO DE FORMACIÓN PROFESIONAL'
                      : language === 'fr'
                      ? 'CERTIFICAT DE FORMATION PROFESSIONNELLE'
                      : 'CERTIFICADO DE FORMAÇÃO PROFISSIONAL'}
                  </p>
                  <p className="text-xs text-neutral-300 leading-relaxed max-w-md mx-auto">
                    {language === 'en' ? (
                      <>
                        We certify that the student has successfully completed the vocational training in{' '}
                        <strong>Cinema & Filmmaking Realization</strong>, with a total workload of <strong>180 hours</strong>.
                      </>
                    ) : language === 'es' ? (
                      <>
                        Certificamos que el estudiante concluyó con aprovechamiento el curso de formación en{' '}
                        <strong>Cinema y Realización Audiovisual</strong>, con carga horaria total de <strong>180 horas</strong>.
                      </>
                    ) : language === 'fr' ? (
                      <>
                        Nous certifions que l'étudiant a complété avec succès la formation professionnelle en{' '}
                        <strong>Cinéma & Réalisation Audiovisuelle</strong>, d'une durée totale de <strong>180 heures</strong>.
                      </>
                    ) : (
                      <>
                        Certificamos que o aluno concluiu com aproveitamento o curso de formação em{' '}
                        <strong>Cinema & Realização Audiovisual</strong>, com carga horária total de <strong>180 horas</strong>.
                      </>
                    )}
                  </p>
                  <div className="mt-6 pt-4 border-t border-neutral-800 flex items-center justify-between text-[11px] font-mono text-neutral-500">
                    <span>{language === 'en' ? 'Validation:' : language === 'es' ? 'Validación:' : language === 'fr' ? 'Validation :' : 'Validação:'} CNL-CERT-DEMO-2026</span>
                    <span className="text-emerald-400 font-bold">
                      {language === 'en' ? 'AUTHENTICATED' : language === 'es' ? 'AUTENTICADO' : language === 'fr' ? 'AUTHENTIFIÉ' : 'AUTENTICADO'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. PLANO, VALOR E MATRÍCULA */}
      <section className="py-16 lg:py-24 bg-[#0a0b0e] border-b border-neutral-800" id="secao-matricula">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <span className="text-xs font-mono uppercase tracking-widest text-amber-400 font-semibold">
              {t('home.pricingBadge')}
            </span>
            <h2 className="text-2xl sm:text-4xl font-display font-bold text-white mt-1 mb-3">
              {t('home.pricingTitle')}
            </h2>
            <p className="text-xs sm:text-sm text-neutral-400">
              {t('home.pricingSubtitle')}
            </p>
          </div>

          <div className="max-w-lg mx-auto bg-neutral-900 border-2 border-amber-500/40 rounded-3xl p-6 sm:p-8 shadow-2xl relative">
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-amber-500 text-neutral-950 text-xs font-bold uppercase tracking-wider font-mono">
              {t('home.pricingClassBadge')}
            </div>

            <div className="text-center pb-6 border-b border-neutral-800">
              <span className="text-xs text-red-400 font-mono line-through font-bold">
                De R$ {originalPrice.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} (Valor de Mercado)
              </span>
              <div className="flex items-baseline justify-center gap-1.5 mt-1 flex-wrap">
                <span className="text-xs font-black uppercase tracking-wider text-amber-400 font-mono">{t('home.pricingBy')}</span>
                <span className="text-3xl sm:text-5xl font-display font-extrabold text-amber-400 break-words">
                  R$ {price.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
                <span className="text-xs text-neutral-400">{t('home.pricingCash')}</span>
              </div>
              <p className="text-xs text-amber-300 font-mono mt-1.5 font-bold">
                {t('home.pricingInstallments')}
              </p>
              <div className="mt-2 inline-block px-2.5 py-0.5 rounded bg-red-950/80 border border-red-800 text-red-300 text-[10px] font-mono font-bold uppercase">
                {t('home.pricingPromoTag')}
              </div>
            </div>

            <div className="py-6 space-y-3 text-xs text-neutral-300">
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                <span>{t('home.pricingItem1')}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                <span>{t('home.pricingItem2')}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                <span>{t('home.pricingItem3')}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                <span>{t('home.pricingItem4')}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                <span>{t('home.pricingItem5')}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                <span>{t('home.pricingItem6')}</span>
              </div>
            </div>

            <div className="pt-2 flex flex-col gap-3">
              <button
                onClick={() => onNavigate('matricula')}
                className="w-full py-4 bg-amber-500 hover:bg-amber-400 text-neutral-950 font-extrabold uppercase tracking-wider text-sm rounded-xl shadow-lg shadow-amber-500/20 transition-all cursor-pointer flex items-center justify-center gap-2 active:scale-98"
                id="pricing-matricula-cta"
              >
                <span>{t('home.pricingBtn')}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center gap-4 text-[11px] text-neutral-400 pt-2 font-mono">
                <span className="flex items-center gap-1">
                  <QrCode className="w-3.5 h-3.5 text-emerald-400" /> {t('home.pricingPix')}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <CreditCard className="w-3.5 h-3.5 text-amber-400" /> {t('home.pricingCard')}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 9. FAQ */}
      <section className="py-16 lg:py-24 border-b border-neutral-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-xs font-mono uppercase tracking-widest text-amber-400 font-semibold">
              {t('home.faqBadge')}
            </span>
            <h2 className="text-2xl sm:text-4xl font-display font-bold text-white mt-1">
              {t('home.faqTitle')}
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((f, i) => (
              <div key={i} className="p-5 rounded-xl bg-neutral-900/50 border border-neutral-800">
                <h3 className="text-sm font-bold text-white mb-2 flex items-center gap-2">
                  <HelpCircle className="w-4 h-4 text-amber-400 shrink-0" />
                  {f.q}
                </h3>
                <p className="text-xs text-neutral-300 leading-relaxed pl-6">{f.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 10. BOTTOM BANNER CTA */}
      <section className="py-16 bg-gradient-to-b from-neutral-900/40 to-[#08090b]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-6">
          <h2 className="text-2xl sm:text-4xl font-display font-extrabold text-white">
            {t('home.ctaTitle')}
          </h2>
          <p className="text-xs sm:text-sm text-neutral-400 max-w-xl mx-auto">
            {t('home.ctaSubtitle')}
          </p>
          <div className="pt-2">
            <button
              onClick={() => onNavigate('matricula')}
              className="px-8 py-4 bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold uppercase tracking-wider text-sm rounded-xl shadow-xl shadow-amber-500/20 transition-all cursor-pointer"
            >
              {t('home.ctaBtn')}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
