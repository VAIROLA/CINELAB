import React, { useState, useEffect } from 'react';
import { CourseSettings, CourseModule } from '../types/index.js';
import { api } from '../services/api.js';
import {
  Calendar,
  Lock,
  ArrowRight,
} from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext.js';

interface MethodologyViewProps {
  settings?: CourseSettings | null;
  modules?: CourseModule[];
  onNavigate: (route: string) => void;
  isLoggedIn?: boolean;
}

export const MethodologyView: React.FC<MethodologyViewProps> = ({
  settings,
  modules = [],
  onNavigate,
}) => {
  const { t, language, getModuleTranslation } = useLanguage();
  const [localModules, setLocalModules] = useState<CourseModule[]>(modules || []);

  useEffect(() => {
    if (modules && modules.length > 0) {
      setLocalModules(modules);
    } else if (localModules.length === 0) {
      api.getPublicCourseInfo()
        .then((res) => {
          if (res.modules && res.modules.length > 0) setLocalModules(res.modules);
        })
        .catch((err) => {
          console.error('Erro ao buscar dados do cronograma:', err);
        });
    }
  }, [modules]);

  const currentModules = (localModules && localModules.length > 0) ? localModules : (modules || []);

  const content = {
    pt: {
      badge: 'Metodologia Pedagógica',
      title: 'Cronograma de 3 Meses (90 Dias)',
      subtitle: 'Distribuição pedagógica calibrada pela densidade de cada conteúdo: 1 semana para a introdução (Módulo 01) e períodos de 8 a 10 dias para as etapas de roteiro, direção, luz, som, montagem e projeto final.',
      ruleBadge: 'REGRA FUNDAMENTAL E SOBERANA',
      ruleTitle: 'O Calendário é Soberano: Sem Antecipações Automáticas',
      ruleText: 'Mesmo que você conclua a leitura da Apostila 01 em poucos dias, o sistema NÃO permitirá o acesso à Apostila 02 antes da data programada (ao final do período pedagógico de 7 dias do módulo).',
      whyTitle: 'Por que esse bloqueio existe?',
      whyText: 'Fazer cinema requer maturidade de olhar. O intervalo programado é desenhado para assistir aos filmes recomendados da Cinemateca, ler os textos indicados e realizar a prática de set.',
      whenTitle: 'Quando a avaliação abre?',
      whenText: 'Liberada automaticamente 2 a 3 dias antes do encerramento de cada módulo, para que o aluno tenha tempo hábil de responder e consolidar sua nota.',
      valTitle: 'Validação no Servidor',
      valText: 'As regras de liberação são validadas no backend. Nenhum usuário ou script consegue acessar conteúdos futuros antes do horário exato de desbloqueio.',
      routineTitle: 'A Rotina de Estudos do Aluno CINELAB',
      routineSubtitle: 'Veja como você deve organizar seu tempo de estudo ao longo do ciclo de cada etapa.',
      r1Title: 'Vídeo & Apostila',
      r1Desc: 'Nos primeiros dias da etapa, assista à Masterclass introdutória do professor e realize uma primeira leitura técnica da apostila do módulo.',
      r2Title: 'Filmes & Leituras',
      r2Desc: 'Assista às obras cinematográficas indicadas no CINELAB Player, prestando atenção à decupagem e mise-en-scène, e consulte os textos complementares.',
      r3Title: 'Exercício Prático',
      r3Desc: 'Execute o exercício prático proposto (ex: decupagem técnica, desenho de luz, gravação de som direto ou montagem) e marque como concluído.',
      r4Title: 'Avaliação Online',
      r4Desc: 'Na reta final da etapa, a avaliação online é liberada. Responda com atenção e visualize sua nota calculada instantaneamente no painel.',
      timelineTitle: 'Cronograma Calibrado das 10 Etapas',
      timelineSubtitle: 'Total de 90 dias de imersão (3 meses exatos) • 180 horas de formação',
      progressiveBadge: 'Liberação Progressiva',
      modulePrefix: 'MÓDULO 0',
      evalLabel: 'Avaliação:',
      evalLead: 'dias antes do fim',
      finalStretch: 'Reta final',
      cta: 'COMEÇAR MINHA FORMAÇÃO COM ESSE CRONOGRAMA',
    },
    en: {
      badge: 'Pedagogical Methodology',
      title: '3-Month Schedule (90 Days)',
      subtitle: 'Calibrated distribution based on technical density: 1 week for introduction (Module 01) and periods of 8 to 10 days for screenwriting, directing, cinematography, audio, editing, and final project.',
      ruleBadge: 'FUNDAMENTAL AND SOVEREIGN RULE',
      ruleTitle: 'The Calendar is Sovereign: No Early Unlocking',
      ruleText: 'Even if you complete reading Handout 01 in just a few days, the system will NOT grant access to Handout 02 before the programmed date (at the end of the module\'s 7-day period).',
      whyTitle: 'Why does this lock exist?',
      whyText: 'Filmmaking demands mature reflection. The scheduled interval is crafted so you can analyze cinema masterpieces in the Cinemateca, read recommended references, and practice camera set work.',
      whenTitle: 'When does the evaluation unlock?',
      whenText: 'Automatically unlocked 2 to 3 days before the end of each module, allowing ample time to reflect, submit answers, and receive grading.',
      valTitle: 'Server-Side Verification',
      valText: 'Unlock timelines are securely enforced by the server backend. No script or client bypass can unlock future modules ahead of the official release time.',
      routineTitle: 'The CINELAB Student Study Routine',
      routineSubtitle: 'How to effectively pace and structure your coursework throughout each stage cycle.',
      r1Title: 'Video & Handout',
      r1Desc: 'During the first days, watch the introductory masterclass and conduct an initial technical reading of the module handout.',
      r2Title: 'Films & Readings',
      r2Desc: 'Screen recommended movies on the CINELAB Player, analyzing camera angles and mise-en-scène, while exploring assigned readings.',
      r3Title: 'Practical Exercise',
      r3Desc: 'Execute the hands-on exercise (e.g. shot breakdown, lighting setup, direct sound recording, or scene montage) and track your completion.',
      r4Title: 'Online Evaluation',
      r4Desc: 'During the final stretch of the stage, the assessment opens. Complete questions thoughtfully and see your grade instantly in your portal.',
      timelineTitle: 'Calibrated Schedule of the 10 Stages',
      timelineSubtitle: 'Total of 90 days of immersive training (exact 3 months) • 180 training hours',
      progressiveBadge: 'Progressive Unlocking',
      modulePrefix: 'MODULE 0',
      evalLabel: 'Assessment:',
      evalLead: 'days before stage end',
      finalStretch: 'Final stretch',
      cta: 'START MY TRAINING WITH THIS SCHEDULE',
    },
    es: {
      badge: 'Metodología Pedagógica',
      title: 'Cronograma de 3 Meses (90 Días)',
      subtitle: 'Distribución pedagógica calibrada según la densidad técnica: 1 semana para introducción (Módulo 01) y periodos de 8 a 10 días para guion, dirección, iluminación, sonido, montaje y proyecto final.',
      ruleBadge: 'REGLA FUNDAMENTAL Y SOBERANA',
      ruleTitle: 'El Calendario es Soberano: Sin Desbloqueos Anticipados',
      ruleText: 'Aunque termines de estudiar el Manual 01 en pocos días, el sistema NO permitirá el acceso al Manual 02 antes de la fecha programada (al término de los 7 días correspondientes).',
      whyTitle: '¿Por qué existe este bloqueo?',
      whyText: 'Hacer cine exige maduración de la mirada. El intervalo está diseñado para ver las obras recomendadas en la Cinemateca, profundizar en lecturas y rodar prácticas.',
      whenTitle: '¿Cuándo se habilita la evaluación?',
      whenText: 'Se habilita automáticamente de 2 a 3 días antes de finalizar cada módulo, garantizando tiempo oportuno para responder y registrar la calificación.',
      valTitle: 'Validación en Servidor',
      valText: 'Las reglas de cronograma se validan en el backend. Ningún usuario puede adelantar contenidos antes de la fecha y hora exactas de liberación.',
      routineTitle: 'La Rutina de Estudio del Alumno CINELAB',
      routineSubtitle: 'Conoce cómo organizar tus horas de estudio a lo largo del ciclo de cada etapa.',
      r1Title: 'Video y Manual',
      r1Desc: 'En los primeros días de la etapa, mira la Masterclass del profesor y realiza una lectura técnica exhaustiva del manual didáctico.',
      r2Title: 'Películas y Lecturas',
      r2Desc: 'Visualiza las películas asignadas en el CINELAB Player, analizando decupaje y puesta en escena, y profundiza en los textos de apoyo.',
      r3Title: 'Ejercicio Práctico',
      r3Desc: 'Realiza el ejercicio técnico propuesto (ej: desglose de planos, esquema de luz, registro sonoro o edición) y márcalo como completado.',
      r4Title: 'Evaluación en Línea',
      r4Desc: 'En la recta final de la etapa se habilita el cuestionario evaluativo. Responde con calma y revisa tu nota instantáneamente en el panel.',
      timelineTitle: 'Cronograma Calibrado de las 10 Etapas',
      timelineSubtitle: 'Total de 90 días de inmersión (3 meses exactos) • 180 horas de formación',
      progressiveBadge: 'Liberación Progresiva',
      modulePrefix: 'MÓDULO 0',
      evalLabel: 'Evaluación:',
      evalLead: 'días antes del cierre',
      finalStretch: 'Recta final',
      cta: 'COMENZAR MI FORMACIÓN CON ESTE CRONOGRAMA',
    },
    fr: {
      badge: 'Méthodologie Pédagogique',
      title: 'Calendrier de 3 Mois (90 Jours)',
      subtitle: 'Distribution pédagogique adaptée à la densité technique : 1 semaine d\'introduction (Module 01) puis des périodes de 8 à 10 jours pour le scénario, la réalisation, l\'éclairage, le son, le montage et le projet de fin d\'études.',
      ruleBadge: 'RÈGLE FONDAMENTALE ET SOUVERAINE',
      ruleTitle: 'Le Calendrier est Souverain : Aucun Déblocage Anticipé',
      ruleText: 'Même si vous terminez la lecture du Fascicule 01 en quelques jours, la plateforme NE donnera PAS accès au Fascicule 02 avant la date programmée (à la fin de la période de 7 jours).',
      whyTitle: 'Pourquoi ce verrouillage ?',
      whyText: 'Faire du cinéma demande du recul et de la maturité. L\'intervalle planifié sert à visionner les œuvres recommandées de la Cinémathèque, approfondir les écrits et réaliser les exercices pratiques.',
      whenTitle: 'Quand l\'évaluation s\'ouvre-t-elle ?',
      whenText: 'Accessible automatiquement 2 à 3 jours avant la fin de chaque module, afin que l\'étudiant dispose de tout le temps nécessaire pour répondre.',
      valTitle: 'Validation Côté Serveur',
      valText: 'Les règles de progression sont strictement vérifiées par le backend. Aucun accès anticipé n\'est possible avant l\'heure officielle de déblocage.',
      routineTitle: 'La Routine d\'Étude de l\'Étudiant CINELAB',
      routineSubtitle: 'Comment organiser votre temps de travail tout au long de chaque étape.',
      r1Title: 'Vidéo & Fascicule',
      r1Desc: 'Les premiers jours, visionnez la Masterclass du professeur et commencez l\'étude technique du fascicule de cours.',
      r2Title: 'Films & Lectures',
      r2Desc: 'Regardez les œuvres recommandées sur le CINELAB Player en observant le découpage et la mise en scène, puis consultez les textes de référence.',
      r3Title: 'Exercice Pratique',
      r3Desc: 'Effectuez l\'exercice pratique demandé (découpage technique, plan d\'éclairage, prise de son ou montage) et validez votre avancement.',
      r4Title: 'Évaluation en Ligne',
      r4Desc: 'En fin d\'étape, l\'évaluation s\'active. Répondez avec soin et consultez immédiatement votre note sur votre espace.',
      timelineTitle: 'Calendrier Calibré des 10 Étapes',
      timelineSubtitle: '90 jours d\'immersion totale (3 mois complets) • 180 heures d\'enseignement',
      progressiveBadge: 'Déblocage Progressif',
      modulePrefix: 'MODULE 0',
      evalLabel: 'Évaluation :',
      evalLead: 'jours avant la clôture',
      finalStretch: 'Dernière ligne droite',
      cta: 'COMMENCER MA FORMATION SELON CE CALENDRIER',
    },
  }[language] || {
    badge: 'Metodologia Pedagógica',
    title: 'Cronograma de 3 Meses (90 Dias)',
    subtitle: 'Distribuição pedagógica calibrada pela densidade de cada conteúdo: 1 semana para a introdução (Módulo 01) e períodos de 8 a 10 dias para as etapas de roteiro, direção, luz, som, montagem e projeto final.',
    ruleBadge: 'REGRA FUNDAMENTAL E SOBERANA',
    ruleTitle: 'O Calendário é Soberano: Sem Antecipações Automáticas',
    ruleText: 'Mesmo que você conclua a leitura da Apostila 01 em poucos dias, o sistema NÃO permitirá o acesso à Apostila 02 antes da data programada (ao final do período pedagógico de 7 dias do módulo).',
    whyTitle: 'Por que esse bloqueio existe?',
    whyText: 'Fazer cinema requer maturidade de olhar. O intervalo programado é desenhado para assistir aos filmes recomendados da Cinemateca, ler os textos indicados e realizar a prática de set.',
    whenTitle: 'Quando a avaliação abre?',
    whenText: 'Liberada automaticamente 2 a 3 dias antes do encerramento de cada módulo, para que o aluno tenha tempo hábil de responder e consolidar sua nota.',
    valTitle: 'Validação no Servidor',
    valText: 'As regras de liberação são validadas no backend. Nenhum usuário ou script consegue acessar conteúdos futuros antes do horário exato de desbloqueio.',
    routineTitle: 'A Rotina de Estudos do Aluno CINELAB',
    routineSubtitle: 'Veja como você deve organizar seu tempo de estudo ao longo do ciclo de cada etapa.',
    r1Title: 'Vídeo & Apostila',
    r1Desc: 'Nos primeiros dias da etapa, assista à Masterclass introdutória do professor e realize uma primeira leitura técnica da apostila do módulo.',
    r2Title: 'Filmes & Leituras',
    r2Desc: 'Assista às obras cinematográficas indicadas no CINELAB Player, prestando atenção à decupagem e mise-en-scène, e consulte os textos complementares.',
    r3Title: 'Exercício Prático',
    r3Desc: 'Execute o exercício prático proposto (ex: decupagem técnica, desenho de luz, gravação de som direto ou montagem) e marque como concluído.',
    r4Title: 'Avaliação Online',
    r4Desc: 'Na reta final da etapa, a avaliação online é liberada. Responda com atenção e visualize sua nota calculada instantaneamente no painel.',
    timelineTitle: 'Cronograma Calibrado das 10 Etapas',
    timelineSubtitle: 'Total de 90 dias de imersão (3 meses exatos) • 180 horas de formação',
    progressiveBadge: 'Liberação Progressiva',
    modulePrefix: 'MÓDULO 0',
    evalLabel: 'Avaliação:',
    evalLead: 'dias antes do fim',
    finalStretch: 'Reta final',
    cta: 'COMEÇAR MINHA FORMAÇÃO COM ESSE CRONOGRAMA',
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-neutral-200">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-mono font-medium uppercase tracking-wider">
          <Calendar className="w-3.5 h-3.5" /> {content.badge}
        </div>
        <h1 className="text-3xl sm:text-5xl font-display font-extrabold text-white tracking-tight">
          {content.title}
        </h1>
        <p className="text-sm sm:text-base text-neutral-300 leading-relaxed">
          {content.subtitle}
        </p>
      </div>

      {/* Sovereign Calendar Rule Highlight */}
      <div className="p-6 sm:p-8 rounded-3xl bg-neutral-900 border-2 border-amber-500/40 shadow-2xl mb-16 space-y-6">
        <div className="flex items-start gap-4">
          <div className="p-3 rounded-2xl bg-amber-500/20 text-amber-400 shrink-0">
            <Lock className="w-6 h-6" />
          </div>
          <div className="space-y-2">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-400">
              {content.ruleBadge}
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              {content.ruleTitle}
            </h2>
            <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
              {content.ruleText}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-neutral-800 text-xs">
          <div className="p-4 rounded-xl bg-neutral-800/40 border border-neutral-700/60">
            <h4 className="font-bold text-white mb-1">{content.whyTitle}</h4>
            <p className="text-neutral-400 leading-relaxed">
              {content.whyText}
            </p>
          </div>
          <div className="p-4 rounded-xl bg-neutral-800/40 border border-neutral-700/60">
            <h4 className="font-bold text-white mb-1">{content.whenTitle}</h4>
            <p className="text-neutral-400 leading-relaxed">
              {content.whenText}
            </p>
          </div>
          <div className="p-4 rounded-xl bg-neutral-800/40 border border-neutral-700/60">
            <h4 className="font-bold text-white mb-1">{content.valTitle}</h4>
            <p className="text-neutral-400 leading-relaxed">
              {content.valText}
            </p>
          </div>
        </div>
      </div>

      {/* The Routine Breakdown */}
      <div className="space-y-8 mb-16">
        <div className="text-center max-w-2xl mx-auto">
          <h3 className="text-xl sm:text-3xl font-display font-bold text-white">
            {content.routineTitle}
          </h3>
          <p className="text-xs text-neutral-400 mt-2">
            {content.routineSubtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="p-6 rounded-2xl bg-neutral-900/50 border border-neutral-800 space-y-3">
            <div className="w-9 h-9 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center font-mono font-bold text-xs">
              01
            </div>
            <h4 className="text-sm font-bold text-white">{content.r1Title}</h4>
            <p className="text-xs text-neutral-400 leading-relaxed">
              {content.r1Desc}
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-neutral-900/50 border border-neutral-800 space-y-3">
            <div className="w-9 h-9 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center font-mono font-bold text-xs">
              02
            </div>
            <h4 className="text-sm font-bold text-white">{content.r2Title}</h4>
            <p className="text-xs text-neutral-400 leading-relaxed">
              {content.r2Desc}
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-neutral-900/50 border border-neutral-800 space-y-3">
            <div className="w-9 h-9 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center font-mono font-bold text-xs">
              03
            </div>
            <h4 className="text-sm font-bold text-white">{content.r3Title}</h4>
            <p className="text-xs text-neutral-400 leading-relaxed">
              {content.r3Desc}
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-neutral-900/50 border border-neutral-800 space-y-3">
            <div className="w-9 h-9 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center font-mono font-bold text-xs">
              04
            </div>
            <h4 className="text-sm font-bold text-white">{content.r4Title}</h4>
            <p className="text-xs text-neutral-400 leading-relaxed">
              {content.r4Desc}
            </p>
          </div>
        </div>
      </div>

      {/* Interactive Timeline Preview */}
      <div className="p-8 rounded-3xl bg-neutral-900/60 border border-neutral-800 space-y-6 mb-16">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-800 pb-4">
          <div>
            <h3 className="text-lg font-bold text-white font-display">{content.timelineTitle}</h3>
            <p className="text-xs text-neutral-400">{content.timelineSubtitle}</p>
          </div>
          <span className="text-xs font-mono px-3 py-1 rounded bg-amber-500/10 text-amber-400 border border-amber-500/30">
            {content.progressiveBadge}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 text-xs">
          {(currentModules || []).map((m) => {
            const modTrans = getModuleTranslation(m.number);
            const displayTitle = modTrans.title || m.title;
            const displaySubtitle = modTrans.subtitle || m.subtitle;

            return (
              <div key={m.id} className="p-4 rounded-xl bg-neutral-800/40 border border-neutral-700/60 space-y-2">
                <div className="flex items-center justify-between font-mono text-[10px]">
                  <span className="text-amber-400 font-bold">{content.modulePrefix}{m.number}</span>
                  <span className="text-amber-300 font-semibold">
                    {m.durationLabel || (m.durationDays ? `${m.durationDays} ${language === 'pt' ? 'dias' : language === 'en' ? 'days' : language === 'es' ? 'días' : 'jours'}` : (m.number === 1 ? (language === 'pt' ? '1 semana' : language === 'en' ? '1 week' : language === 'es' ? '1 semana' : '1 semaine') : `9 ${language === 'pt' ? 'dias' : language === 'en' ? 'days' : language === 'es' ? 'días' : 'jours'}`))}
                  </span>
                </div>
                <h4 className="font-bold text-white line-clamp-1">{displayTitle}</h4>
                <p className="text-[11px] text-neutral-400 line-clamp-2">{displaySubtitle}</p>
                <div className="pt-2 border-t border-neutral-700/50 text-[10px] text-neutral-400 font-mono flex items-center justify-between">
                  <span>{content.evalLabel}</span>
                  <span className="text-amber-400/90">
                    {m.evalLeadDays ? `${m.evalLeadDays} ${content.evalLead}` : content.finalStretch}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* CTA */}
      <div className="text-center">
        <button
          onClick={() => onNavigate('matricula')}
          className="px-8 py-4 bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold uppercase tracking-wider text-sm rounded-xl shadow-lg shadow-amber-500/20 cursor-pointer inline-flex items-center gap-2 transition-all hover:scale-105 active:scale-95"
        >
          <span>{content.cta}</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
