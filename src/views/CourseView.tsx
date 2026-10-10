import React, { useState, useEffect } from 'react';
import { CourseModule, CourseSettings } from '../types/index.js';
import { api } from '../services/api.js';
import { CourseBannerPromo } from '../components/CourseBannerPromo.js';
import { useLanguage } from '../i18n/LanguageContext.js';
import {
  Film,
  Calendar,
  BookOpen,
  Sparkles,
  ArrowRight,
  Clock,
  Award,
} from 'lucide-react';

interface CourseViewProps {
  modules?: CourseModule[];
  settings?: CourseSettings | null;
  onNavigate: (route: string) => void;
  isLoggedIn?: boolean;
}

export const CourseView: React.FC<CourseViewProps> = ({
  modules = [],
  settings,
  onNavigate,
}) => {
  const { t, getModuleTranslation, language } = useLanguage();
  const [localModules, setLocalModules] = useState<CourseModule[]>(modules || []);
  const [totalHandoutPages, setTotalHandoutPages] = useState<number>(159);
  const [bonusApostilas, setBonusApostilas] = useState<any[]>([]);

  useEffect(() => {
    if (modules && modules.length > 0) {
      setLocalModules(modules);
    }

    api.getPublicCourseInfo()
      .then((res) => {
        if (res.modules && res.modules.length > 0 && (!modules || modules.length === 0)) {
          setLocalModules(res.modules);
        }
        if (res.bonusApostilas && res.bonusApostilas.length > 0) {
          setBonusApostilas(res.bonusApostilas);
        }
        const aposPages = (res.apostilas || []).reduce(
          (sum: number, a: any) => sum + (Number(a.totalPages) || Number(a.pagesCount) || 0),
          0
        );
        const bonusPages = (res.bonusApostilas || []).reduce(
          (sum: number, b: any) => sum + (Number(b.totalPages) || Number(b.pagesCount) || 0),
          0
        );
        const total = (aposPages || 64) + (bonusPages || 122);
        if (total > 0) {
          setTotalHandoutPages(total);
        }
      })
      .catch((err) => {
        console.error('Erro ao buscar dados do curso:', err);
      });
  }, [modules]);

  const currentModules = (localModules && localModules.length > 0) ? localModules : (modules || []);
  const bonusCount = bonusApostilas && bonusApostilas.length > 0 ? bonusApostilas.length : 4;

  const i18n = {
    pt: {
      badge: 'Grade Curricular Completa',
      title: 'Formação em Cinema & Audiovisual',
      subtitle: `Uma formação profunda de 3 meses (90 dias) estruturada em 10 etapas pedagógicas e ${bonusCount} apostilas bônus. Do conceito dramatúrgico à tela grande.`,
      card1Title: 'Duração: 3 Meses',
      card1Desc: 'Distribuídos em 10 etapas formativas (90 dias) calibradas pelo volume de conteúdo, garantindo tempo real de reflexão, leitura e pesquisa.',
      card2Title: `10 Apostilas + ${bonusCount} Bônus`,
      card2Desc: `Mais de ${totalHandoutPages} páginas de conteúdo autoral e análise de mestre do cinema.`,
      card3Title: '180 Horas com Certificado',
      card3Desc: 'Avaliações contínuas por etapa e emissão de certificado profissional com código verificável nacionalmente por produtoras.',
      stagesTitle: 'As 10 Etapas da Formação Cinematográfica',
      stagesBadge: 'Cronograma Progressivo',
      stagePrefix: 'ETAPA 0',
      durationLabel: 'Duração:',
      pedagogicalObj: 'OBJETIVO PEDAGÓGICO:',
      directorObj: 'OBJETIVOS DO REALIZADOR:',
      handoutBtn: 'Apostila 0',
      videoBtn: 'Vídeo da Etapa',
      bonusBadge: 'Módulos Complementares',
      bonusTitle: `${bonusCount} Apostilas Bônus Especiais`,
      bonus1Title: 'Glossário Completo de Planos',
      bonus1Desc: 'Guia permanente de consulta técnica para decupagem cinematográfica, escalas de planos e movimentos de câmera.',
      bonus2Title: 'Glossário Completo de Roteiro',
      bonus2Desc: 'Guia permanente de consulta dramatúrgica: da criação de premissa, storyline e sinopse à escaleta e roteiro final.',
      bonus3Title: 'Método de Análise Fílmica em 6 Camadas',
      bonus3Desc: 'Metodologia exclusiva de decupagem e análise técnica em 6 dimensões cinematográficas para realizadores.',
      bonus4Title: 'História do Cinema - Complemento',
      bonus4Desc: 'Guia histórico completo da evolução da linguagem cinematográfica, dos primórdios à era digital contemporânea.',
    },
    en: {
      badge: 'Full Curriculum Syllabus',
      title: 'Filmmaking & Audiovisual Training',
      subtitle: `An in-depth 3-month (90-day) training structured into 10 pedagogical stages and ${bonusCount} bonus handouts. From dramatic conception to the silver screen.`,
      card1Title: 'Duration: 3 Months',
      card1Desc: 'Spread across 10 formative stages (90 days) calibrated by technical volume, ensuring ample time for reflection, screening, and set research.',
      card2Title: `10 Handouts + ${bonusCount} Bonuses`,
      card2Desc: `Over ${totalHandoutPages} pages of original coursework and cinema master analysis.`,
      card3Title: '180 Hours with Certificate',
      card3Desc: 'Continuous modular assessments and an official professional certificate with public verification for studios and film boards.',
      stagesTitle: 'The 10 Stages of Cinema Formation',
      stagesBadge: 'Progressive Schedule',
      stagePrefix: 'STAGE 0',
      durationLabel: 'Duration:',
      pedagogicalObj: 'PEDAGOGICAL OBJECTIVE:',
      directorObj: 'DIRECTOR\'S GOALS:',
      handoutBtn: 'Handout 0',
      videoBtn: 'Stage Video',
      bonusBadge: 'Complementary Modules',
      bonusTitle: `${bonusCount} Special Bonus Handouts`,
      bonus1Title: 'Complete Shot Glossary',
      bonus1Desc: 'Permanent technical reference guide for cinematic coverage, shot scales, and camera movements.',
      bonus2Title: 'Complete Screenwriting Glossary',
      bonus2Desc: 'Permanent dramaturgical reference: from premise, storyline, and synopsis to beat sheet and final script.',
      bonus3Title: '6-Layer Film Analysis Method',
      bonus3Desc: 'Exclusive method for breaking down films across 6 cinematic dimensions as a filmmaker.',
      bonus4Title: 'History of Cinema - Complement',
      bonus4Desc: 'Comprehensive historical guide from the origins of silent cinema to the contemporary digital age.',
    },
    es: {
      badge: 'Plan de Estudios Completo',
      title: 'Formación en Cine y Audiovisual',
      subtitle: `Una formación intensiva de 3 meses (90 días) estructurada en 10 etapas pedagógicas y ${bonusCount} manuales bonus. Del concepto dramatúrgico a la gran pantalla.`,
      card1Title: 'Duración: 3 Meses',
      card1Desc: 'Distribuidos en 10 etapas formativas (90 días) calibradas según la densidad del contenido, garantizando tiempo real de asimilación.',
      card2Title: `10 Manuales + ${bonusCount} Bonus`,
      card2Desc: `Más de ${totalHandoutPages} páginas de contenido autoral y análisis de maestros del cine.`,
      card3Title: '180 Horas con Certificado',
      card3Desc: 'Evaluaciones progresivas por etapa y titulación profesional con validación pública para productoras y convocatorias.',
      stagesTitle: 'Las 10 Etapas de la Formación Cinematográfica',
      stagesBadge: 'Cronograma Progresivo',
      stagePrefix: 'ETAPA 0',
      durationLabel: 'Duración:',
      pedagogicalObj: 'OBJETIVO PEDAGÓGICO:',
      directorObj: 'OBJETIVOS DEL REALIZADOR:',
      handoutBtn: 'Manual 0',
      videoBtn: 'Video de la Etapa',
      bonusBadge: 'Módulos Complementarios',
      bonusTitle: `${bonusCount} Manuales Bonus Especiales`,
      bonus1Title: 'Glosario Completo de Planos',
      bonus1Desc: 'Guia permanente de consulta técnica para decupaje cinematográfico, escalas de planos e movimentos de cámara.',
      bonus2Title: 'Glosario Completo de Guion',
      bonus2Desc: 'Guía permanente de consulta dramatúrgica: desde la premisa, storyline y sinopsis hasta la escaleta y guion final.',
      bonus3Title: 'Método de Análisis Fílmico en 6 Capas',
      bonus3Desc: 'Metodología analítica en 6 dimensiones para desarmar cualquier obra cinematográfica.',
      bonus4Title: 'Historia del Cine - Complemento',
      bonus4Desc: 'Guía histórica completa desde los orígenes del cine mudo hasta la era digital contemporánea.',
    },
    fr: {
      badge: 'Programme Pédagogique Complet',
      title: 'Formation en Cinéma & Audiovisuel',
      subtitle: `Un enseignement approfondi de 3 mois (90 jours) structuré en 10 étapes pédagogiques et ${bonusCount} fascicules bonus. De l'écriture du scénario à la projection.`,
      card1Title: 'Durée : 3 Mois',
      card1Desc: 'Répartis sur 10 étapes formatives (90 jours) adaptées à la densité des cours, offrant un temps réel de recul, de visionnage et de pratique.',
      card2Title: `10 Fascicules + ${bonusCount} Bonus`,
      card2Desc: `Plus de ${totalHandoutPages} pages de cours exclusifs et d'analyses de maîtres du cinéma.`,
      card3Title: '180 Heures Certifiées',
      card3Desc: 'Évaluations continues par module et certificat professionnel avec code cryptographique vérifiable en ligne.',
      stagesTitle: 'Les 10 Étapes de la Formation Cinématographique',
      stagesBadge: 'Calendrier Progressif',
      stagePrefix: 'ÉTAPE 0',
      durationLabel: 'Durée :',
      pedagogicalObj: 'OBJECTIF PÉDAGOGIQUE :',
      directorObj: 'OBJECTIFS DU RÉALISATEUR :',
      handoutBtn: 'Fascicule 0',
      videoBtn: 'Vidéo de l\'Étape',
      bonusBadge: 'Modules Complémentaires',
      bonusTitle: `${bonusCount} Fascicules Bonus Spéciaux`,
      bonus1Title: 'Glossaire Complet des Plans',
      bonus1Desc: 'Guide permanent de consultation technique pour le découpage, les échelles de plans et mouvements de caméra.',
      bonus2Title: 'Glossaire Complet du Scénario',
      bonus2Desc: 'Guide permanent de dramaturgie : de l\'idée, storyline et synopsis au séquencier et scénario final.',
      bonus3Title: 'Méthode d\'Analyse Filmique en 6 Couches',
      bonus3Desc: 'Méthodologie d\'analyse et de découpage en 6 dimensions pour disséquer toute œuvre audiovisuelle.',
      bonus4Title: 'Histoire du Cinéma - Complément',
      bonus4Desc: 'Guide historique complet des origines du cinéma muet à l\'ère numérique contemporaine.',
    },
  };

  const cur = i18n[language] || i18n.pt;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-neutral-200">
      {/* Header Banner */}
      <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-mono font-medium uppercase tracking-wider">
          <Film className="w-3.5 h-3.5" /> {cur.badge}
        </div>
        <h1 className="text-3xl sm:text-5xl font-display font-extrabold text-white tracking-tight">
          {cur.title}
        </h1>
        <p className="text-sm sm:text-base text-neutral-300 leading-relaxed">
          {cur.subtitle}
        </p>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
        <div className="p-6 rounded-2xl bg-neutral-900/60 border border-neutral-800">
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center mb-3">
            <Clock className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-white mb-1">{cur.card1Title}</h3>
          <p className="text-xs text-neutral-400 leading-relaxed">
            {cur.card1Desc}
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-neutral-900/60 border border-neutral-800">
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center mb-3">
            <BookOpen className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-white mb-1">{cur.card2Title}</h3>
          <p className="text-xs text-neutral-400 leading-relaxed">
            {cur.card2Desc}
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-neutral-900/60 border border-neutral-800">
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center mb-3">
            <Award className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-white mb-1">{cur.card3Title}</h3>
          <p className="text-xs text-neutral-400 leading-relaxed">
            {cur.card3Desc}
          </p>
        </div>
      </div>

      {/* Detailed Syllabus of 10 Modules */}
      <div className="space-y-6 mb-16">
        <div className="border-b border-neutral-800 pb-4 flex items-center justify-between">
          <h2 className="text-xl sm:text-2xl font-display font-bold text-white">
            {cur.stagesTitle}
          </h2>
          <span className="text-xs font-mono text-amber-400">{cur.stagesBadge}</span>
        </div>

        <div className="space-y-4">
          {(currentModules || []).map((m) => {
            const trans = getModuleTranslation(m.number || m.id);
            const displayTitle = trans.title || m.title;
            const displaySubtitle = trans.subtitle || m.subtitle;
            const displaySummary = trans.summary || m.summary;

            const durationText = m.durationLabel || (
              m.durationDays ? `${m.durationDays} ${language === 'pt' ? 'dias' : language === 'en' ? 'days' : language === 'es' ? 'días' : 'jours'}` :
              m.number === 1 ? (language === 'pt' ? '1 semana' : language === 'en' ? '1 week' : language === 'es' ? '1 semana' : '1 semaine') :
              `9-10 ${language === 'pt' ? 'dias' : language === 'en' ? 'days' : language === 'es' ? 'días' : 'jours'}`
            );

            const modNum = m.number || m.id;
            const pad = modNum < 10 ? '0' + modNum : '' + modNum;
            const coverPath = `/images/covers/apostila-${pad}.jpg`;

            return (
              <div
                key={m.id}
                className="p-6 rounded-2xl bg-neutral-900/40 border border-neutral-800/80 hover:border-amber-500/40 transition-all flex flex-col md:flex-row md:items-center justify-between gap-6"
              >
                <div className="flex flex-col sm:flex-row gap-5 items-start flex-1">
                  {/* Capa Oficial da Apostila do Módulo */}
                  <div
                    onClick={() => onNavigate('apostilas')}
                    className="w-24 sm:w-28 md:w-32 shrink-0 aspect-[1/1.4] rounded-xl overflow-hidden border border-neutral-700/80 bg-neutral-950 shadow-lg cursor-pointer group/cover relative"
                    title={`Ver Apostila 0${modNum}`}
                  >
                    <img
                      src={coverPath}
                      alt={`Capa da Apostila ${pad}`}
                      className="w-full h-full object-cover group-hover/cover:scale-105 transition-transform duration-300"
                      loading="lazy"
                      onError={(e) => {
                        if (e.currentTarget.src !== coverPath && !e.currentTarget.src.endsWith(coverPath)) {
                          e.currentTarget.src = coverPath;
                        }
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover/cover:opacity-100 transition-opacity flex items-end justify-center pb-2">
                      <span className="text-[10px] font-mono text-amber-300 font-bold flex items-center gap-1">
                        <BookOpen className="w-3 h-3" />
                        <span>Ver Apostila</span>
                      </span>
                    </div>
                  </div>

                  <div className="space-y-2 max-w-2xl flex-1">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-amber-500/20 text-amber-400 border border-amber-500/30">
                        {cur.stagePrefix}{m.number}
                      </span>
                      <span className="text-xs text-neutral-500 font-mono">{cur.durationLabel} {durationText}</span>
                    </div>
                    <h3 className="text-base sm:text-lg font-bold text-white">{displayTitle}</h3>
                    <p className="text-xs font-medium text-amber-300/80">{displaySubtitle}</p>
                    <p className="text-xs text-neutral-400 leading-relaxed">{displaySummary}</p>
                    {m.pedagogicalObjective && (
                      <div className="pt-2 text-xs text-neutral-300">
                        <span className="font-mono text-amber-400 text-[11px] font-bold block">{cur.pedagogicalObj}</span>
                        {m.pedagogicalObjective}
                      </div>
                    )}
                    {m.directorObjectives && m.directorObjectives.length > 0 && (
                      <div className="pt-1 text-xs text-neutral-400">
                        <span className="font-mono text-emerald-400 text-[11px] font-bold block">{cur.directorObj}</span>
                        <ul className="list-disc list-inside space-y-0.5">
                          {m.directorObjectives.map((obj, oIdx) => (
                            <li key={oIdx}>{obj}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>

                <div className="shrink-0 flex flex-col sm:flex-row md:flex-col gap-2">
                  <button
                    onClick={() => onNavigate('apostilas')}
                    className="px-4 py-2 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-xs text-neutral-200 hover:text-white flex items-center justify-center gap-1.5 cursor-pointer font-medium transition-colors"
                  >
                    <BookOpen className="w-3.5 h-3.5 text-amber-400" />
                    <span>{cur.handoutBtn}{m.number}</span>
                  </button>
                  <button
                    onClick={() => onNavigate('videos')}
                    className="px-4 py-2 rounded-lg bg-neutral-800/60 hover:bg-neutral-700 text-xs text-neutral-300 hover:text-white flex items-center justify-center gap-1.5 cursor-pointer transition-colors"
                  >
                    <Film className="w-3.5 h-3.5 text-amber-400" />
                    <span>{cur.videoBtn}</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bonus Section */}
      <div className="p-8 rounded-3xl bg-neutral-900 border border-amber-500/30 mb-16 space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] font-mono uppercase tracking-widest text-amber-400 font-bold">
              {cur.bonusBadge}
            </span>
            <h3 className="text-lg font-bold text-white">{cur.bonusTitle}</h3>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {(bonusApostilas && bonusApostilas.length > 0 ? bonusApostilas : [
            {
              number: 1,
              title: cur.bonus1Title,
              pagesCount: 30,
              description: cur.bonus1Desc,
            },
            {
              number: 2,
              title: cur.bonus2Title,
              pagesCount: 29,
              description: cur.bonus2Desc,
            },
            {
              number: 3,
              title: cur.bonus3Title,
              pagesCount: 27,
              description: cur.bonus3Desc,
            },
            {
              number: 4,
              title: cur.bonus4Title,
              pagesCount: 36,
              description: cur.bonus4Desc,
            },
          ]).map((b: any) => {
            const bNum = b.number || 1;
            const pad = bNum < 10 ? '0' + bNum : '' + bNum;
            const pages = b.pagesCount || b.totalPages || (bNum === 1 ? 30 : (bNum === 2 ? 29 : (bNum === 3 ? 27 : 36)));
            const tag = language === 'en'
              ? `BONUS HANDOUT ${pad} (${pages} PAGES)`
              : language === 'es'
              ? `MANUAL BONUS ${pad} (${pages} PÁGINAS)`
              : language === 'fr'
              ? `FASCICULE BONUS ${pad} (${pages} PAGES)`
              : `APOSTILA BÔNUS ${pad} (${pages} PÁGINAS)`;
            return (
              <div key={b.id || bNum} className="p-5 rounded-xl bg-neutral-800/40 border border-neutral-700/60 space-y-2 flex flex-col justify-between">
                <div>
                  <span className="text-xs font-mono font-bold text-amber-400">{tag}</span>
                  <h4 className="text-sm font-bold text-white mt-1">{b.title}</h4>
                  <p className="text-xs text-neutral-400 leading-relaxed mt-1">
                    {b.description || b.summary}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Banner Oficial do Curso com Valores Promocionais (CINELAB 5) */}
      <div className="mb-16">
        <CourseBannerPromo
          onNavigate={onNavigate}
          settings={settings}
        />
      </div>
    </div>
  );
};
