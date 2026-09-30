import React from 'react';
import {
  Film,
  Sparkles,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Video,
  Clapperboard,
  Award,
  Zap,
  Tag,
  Clock,
  QrCode,
  CreditCard,
} from 'lucide-react';
import { CourseSettings } from '../types/index.js';
import { useLanguage } from '../i18n/LanguageContext.js';

interface CourseBannerPromoProps {
  onNavigate: (route: string) => void;
  settings?: CourseSettings | null;
  className?: string;
}

export const CourseBannerPromo: React.FC<CourseBannerPromoProps> = ({
  onNavigate,
  settings,
  className = '',
}) => {
  const { t, language } = useLanguage();
  const price = settings?.coursePrice || 1000.00;
  const originalPrice = settings?.coursePriceOriginal || 2000.00;
  const maxInstallments = settings?.maxInstallments || 12;
  const installmentValue = (price / maxInstallments).toFixed(2);
  const diffSavings = (originalPrice - price).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  const allTexts = {
    pt: {
      headlineMain1: 'CURSO DE ',
      headlineMain2: 'CINEMA & ',
      headlineMain3: 'AUDIOVISUAL',
      directorRole: 'Diretor Acadêmico, Roteirista & Realizador Audiovisual',
      cineasta: '🎬 CINEASTA',
      diretor: '🪑 DIRETOR',
      produtor: '🎥 PRODUTOR',
      quinzenal: '10 Módulos com Dias Contados (90 Dias)',
      apostilasBonus: '10 Apostilas + 3 Bônus',
      masterclasses: 'Masterclasses em Vídeo',
      cert180: 'Certificado 180h',
      limitedPromo: 'PROMOÇÃO POR TEMPO LIMITADO!',
      marketVal: 'VALOR DE MERCADO:',
      byOnly: 'POR APENAS',
      cash: 'à vista',
      installments: `ou em até ${maxInstallments}x de R$ ${installmentValue.replace('.', ',')} no cartão`,
      savings: `Economia real de R$ ${diffSavings} na sua formação profissional!`,
      check1: 'Acesso completo à plataforma de ensino por 3 meses',
      check2: '10 Apostilas exclusivas para leitura online + 3 bônus',
      check3: 'Avaliações formativas por etapa e feedback pedagógico',
      check4: 'Certificado profissional de 180h com validação pública',
      ctaBtn: 'QUERO MEU CURSO AGORA!',
      pix: 'PIX Instantâneo',
      cards: 'Até 12x no Cartão',
      secure: '100% Seguro',
      f1Title: '100% ONLINE',
      f1Desc: 'Estude no seu ritmo, quando e onde quiser',
      f2Title: 'ACESSO IMEDIATO',
      f2Desc: 'Comece hoje mesmo após a confirmação',
      f3Title: 'PARA INICIANTES',
      f3Desc: 'Do absoluto zero até a direção de set',
      f4Title: 'APRENDA NA PRÁTICA',
      f4Desc: 'Teoria sólida + exercícios + curta-metragem',
      f5Title: 'CERTIFICADO 180H',
      f5Desc: 'Válido nacionalmente com autenticação',
      quote: '🎬 "TRANSFORME IDEIAS EM IMAGENS. HISTÓRIAS EM EMOÇÕES. SONHOS EM CINEMA!"',
    },
    en: {
      headlineMain1: 'COURSE IN ',
      headlineMain2: 'CINEMA & ',
      headlineMain3: 'AUDIOVISUAL',
      directorRole: 'Academic Director, Screenwriter & Filmmaker',
      cineasta: '🎬 FILMMAKER',
      diretor: '🪑 DIRECTOR',
      produtor: '🎥 PRODUCER',
      quinzenal: '10 Counted-Day Modules (90 Days)',
      apostilasBonus: '10 Handouts + 3 Bonuses',
      masterclasses: 'Video Masterclasses',
      cert180: '180h Certificate',
      limitedPromo: 'LIMITED TIME PROMOTION!',
      marketVal: 'MARKET VALUE:',
      byOnly: 'FOR ONLY',
      cash: 'single payment',
      installments: `or in up to ${maxInstallments}x card installments`,
      savings: `Real savings of $${Math.round(originalPrice - price)} on your professional training!`,
      check1: 'Full 3-month access to the learning platform',
      check2: '10 Exclusive handouts for online reading + 3 bonuses',
      check3: 'Step-by-step evaluations and pedagogical feedback',
      check4: 'Professional 180h certificate with public validation',
      ctaBtn: 'GET MY COURSE NOW!',
      pix: 'Instant Wire / Transfer',
      cards: 'Up to 12x Installments',
      secure: '100% Secure',
      f1Title: '100% ONLINE',
      f1Desc: 'Study at your own pace, anytime and anywhere',
      f2Title: 'INSTANT ACCESS',
      f2Desc: 'Start right after enrollment confirmation',
      f3Title: 'FOR BEGINNERS',
      f3Desc: 'From ground zero to film set directing',
      f4Title: 'PRACTICAL LEARNING',
      f4Desc: 'Solid theory + exercises + short film',
      f5Title: '180H CERTIFICATE',
      f5Desc: 'Nationally valid with public verification',
      quote: '🎬 "TRANSFORM IDEAS INTO IMAGES. STORIES INTO EMOTIONS. DREAMS INTO CINEMA!"',
    },
    es: {
      headlineMain1: 'CURSO DE ',
      headlineMain2: 'CINE Y ',
      headlineMain3: 'AUDIOVISUAL',
      directorRole: 'Director Académico, Guionista y Realizador Audiovisual',
      cineasta: '🎬 CINEASTA',
      diretor: '🪑 DIRECTOR',
      produtor: '🎥 PRODUCTOR',
      quinzenal: '10 Módulos con Días Contados (90 Días)',
      apostilasBonus: '10 Manuales + 3 Bonos',
      masterclasses: 'Masterclasses en Video',
      cert180: 'Certificado 180h',
      limitedPromo: '¡PROMOCIÓN POR TIEMPO LIMITADO!',
      marketVal: 'VALOR DE MERCADO:',
      byOnly: 'POR TAN SOLO',
      cash: 'de contado',
      installments: `o hasta en ${maxInstallments} cuotas con tarjeta`,
      savings: `¡Ahorro real de ${(originalPrice - price).toLocaleString('es-ES', { minimumFractionDigits: 2 })} en tu formación profesional!`,
      check1: 'Acceso completo a la plataforma educativa por 3 meses',
      check2: '10 Manuales exclusivos para lectura online + 3 bonos',
      check3: 'Evaluaciones progresivas y retroalimentación docente',
      check4: 'Certificado profesional de 180h con validación pública',
      ctaBtn: '¡QUIERO MI CURSO AHORA!',
      pix: 'Pago Instantáneo',
      cards: 'Hasta 12 Cuotas',
      secure: '100% Seguro',
      f1Title: '100% EN LÍNEA',
      f1Desc: 'Estudia a tu ritmo, donde y cuando quieras',
      f2Title: 'ACCESO INMEDIATO',
      f2Desc: 'Comienza hoy mismo tras confirmar tu inscripción',
      f3Title: 'PARA PRINCIPIANTES',
      f3Desc: 'Desde cero absoluto hasta dirigir en el set',
      f4Title: 'APRENDE EN LA PRÁCTICA',
      f4Desc: 'Teoría sólida + ejercicios + cortometraje',
      f5Title: 'CERTIFICADO 180H',
      f5Desc: 'Válido con autenticación oficial verificable',
      quote: '🎬 "¡TRANSFORMA IDEAS EN IMÁGENES. HISTORIAS EN EMOCIONES. SUEÑOS EN CINE!"',
    },
    fr: {
      headlineMain1: 'COURS DE ',
      headlineMain2: 'CINÉMA & ',
      headlineMain3: 'AUDIOVISUEL',
      directorRole: 'Directeur Académique, Scénariste & Réalisateur Audiovisuel',
      cineasta: '🎬 CINÉASTE',
      diretor: '🪑 RÉALISATEUR',
      produtor: '🎥 PRODUCTEUR',
      quinzenal: '10 Modules à Jours Comptés (90 Jours)',
      apostilasBonus: '10 Fascicules + 3 Bonus',
      masterclasses: 'Masterclasses Vidéo',
      cert180: 'Certificat 180h',
      limitedPromo: 'PROMOTION À DURÉE LIMITÉE !',
      marketVal: 'VALEUR MARCHANDE :',
      byOnly: 'POUR SEULEMENT',
      cash: 'au comptant',
      installments: `ou jusqu'à ${maxInstallments} mensualités par carte`,
      savings: `Économie réelle de ${(originalPrice - price).toLocaleString('fr-FR', { minimumFractionDigits: 2 })} € sur votre formation !`,
      check1: 'Accès complet à la plateforme d\'apprentissage pour 3 mois',
      check2: '10 Fascicules exclusifs en lecture en ligne + 3 bonus',
      check3: 'Évaluations formatives et retours pédagogiques',
      check4: 'Certificat professionnel de 180h avec validation publique',
      ctaBtn: 'JE VEUX MON COURS !',
      pix: 'Paiement / Virement Immédiat',
      cards: 'Jusqu\'à 12x par Carte',
      secure: '100% Sécurisé',
      f1Title: '100% EN LIGNE',
      f1Desc: 'Étudiez à votre rythme, où et quand vous voulez',
      f2Title: 'ACCÈS IMMÉDIAT',
      f2Desc: 'Démarrez dès la confirmation de votre inscription',
      f3Title: 'POUR DÉBUTANTS',
      f3Desc: 'De zéro jusqu\'à la réalisation sur le plateau',
      f4Title: 'APPRENTISSAGE PRATIQUE',
      f4Desc: 'Théorie solide + exercices + court-métrage',
      f5Title: 'CERTIFICAT 180H',
      f5Desc: 'Reconnu avec code d\'authentification publique',
      quote: '🎬 « TRANSFORMEZ LES IDÉES EN IMAGES. LES HISTOIRES EN ÉMOTIONS. LES RÊVES EN CINÉMA ! »',
    },
  };
  const texts = allTexts[language] || allTexts.pt;

  return (
    <div
      id="cinelab-5-banner-promo"
      className={`relative overflow-hidden rounded-3xl bg-[#090b10] border-2 border-amber-500/40 shadow-2xl shadow-black/80 ${className}`}
    >
      {/* Cinematic Studio Backdrop with Ambient Warm Lights */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-900/15 rounded-full blur-3xl pointer-events-none" />

      {/* Top Banner Ribbon */}
      <div className="bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 text-neutral-950 px-4 py-2 text-center flex items-center justify-between font-black uppercase text-xs tracking-wider shadow-md">
        <div className="flex items-center gap-2">
          <Clapperboard className="w-4 h-4 fill-neutral-950" />
          <span>{t('banner.ribbonCourse')}</span>
        </div>
        <div className="hidden sm:flex items-center gap-3 font-mono text-[11px] font-bold">
          <span>{t('banner.ribbonDuration')}</span>
          <span>{t('banner.ribbonModules')}</span>
          <span>{t('banner.ribbonCert')}</span>
        </div>
        <div className="flex items-center gap-1.5 bg-neutral-950 text-amber-400 px-2.5 py-0.5 rounded-full text-[10px] font-mono">
          <Zap className="w-3 h-3 fill-amber-400" />
          <span>{t('banner.ribbonOpen')}</span>
        </div>
      </div>

      {/* Main Banner Content */}
      <div className="p-6 sm:p-10 lg:p-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Typography & Professor Cineasta Tony de Luc & Benefits */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Tagline / Subtitle */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-900 border border-amber-500/30 text-amber-400 text-xs font-mono font-semibold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>{t('banner.tagline')}</span>
            </div>

            {/* Colossal Cinema Headline */}
            <div>
              <h2 className="text-4xl sm:text-6xl lg:text-7xl font-display font-black tracking-tight leading-[0.95] text-white">
                {texts.headlineMain1} <br />
                <span className="text-white drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]">{texts.headlineMain2}</span>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 drop-shadow-[0_4px_16px_rgba(245,158,11,0.5)]">
                  {texts.headlineMain3}
                </span>
              </h2>
              <p className="text-sm sm:text-base text-amber-200/90 font-mono font-bold tracking-wide mt-3 uppercase">
                {t('banner.headlineSubtitle')}
              </p>
            </div>

            {/* Professor Cineasta Tony de Luc Card */}
            <div className="p-4 sm:p-5 rounded-2xl bg-neutral-900/90 border border-neutral-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xl">
              <div className="flex items-center gap-3.5">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-neutral-800 to-neutral-950 border-2 border-amber-500/60 p-0.5 flex items-center justify-center shrink-0 shadow-lg relative overflow-hidden">
                  <Film className="w-7 h-7 text-amber-400" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                </div>
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-400 block">
                    {t('banner.instructorRole')}
                  </span>
                  <h3 className="text-base sm:text-lg font-display font-black text-white">
                    {t('banner.instructorName')}
                  </h3>
                  <p className="text-xs text-amber-400/90 font-medium">
                    {texts.directorRole}
                  </p>
                </div>
              </div>

              {/* Badges do Professor */}
              <div className="flex flex-wrap sm:flex-col gap-1.5 text-[10px] font-mono shrink-0">
                <span className="px-2 py-0.5 rounded bg-neutral-800 text-amber-300 border border-neutral-700 flex items-center gap-1 font-bold">
                  {texts.cineasta}
                </span>
                <span className="px-2 py-0.5 rounded bg-neutral-800 text-amber-300 border border-neutral-700 flex items-center gap-1 font-bold">
                  {texts.diretor}
                </span>
                <span className="px-2 py-0.5 rounded bg-neutral-800 text-amber-300 border border-neutral-700 flex items-center gap-1 font-bold">
                  {texts.produtor}
                </span>
              </div>
            </div>

            {/* 35mm Film Roll Strip Graphic */}
            <div className="relative py-2 bg-neutral-950 rounded-xl border border-neutral-800/80 px-3 flex items-center justify-between overflow-x-auto gap-3 text-[11px] font-mono text-neutral-300">
              <div className="flex items-center gap-1 shrink-0 opacity-40">
                <div className="w-1.5 h-2 bg-neutral-600 rounded-sm" />
                <div className="w-1.5 h-2 bg-neutral-600 rounded-sm" />
              </div>
              <div className="flex items-center gap-6 shrink-0 py-1">
                <span className="flex items-center gap-1 text-white">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" /> {texts.quinzenal}
                </span>
                <span className="flex items-center gap-1 text-white">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" /> {texts.apostilasBonus}
                </span>
                <span className="flex items-center gap-1 text-white">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" /> {texts.masterclasses}
                </span>
                <span className="flex items-center gap-1 text-white">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" /> {texts.cert180}
                </span>
              </div>
              <div className="flex items-center gap-1 shrink-0 opacity-40">
                <div className="w-1.5 h-2 bg-neutral-600 rounded-sm" />
                <div className="w-1.5 h-2 bg-neutral-600 rounded-sm" />
              </div>
            </div>

          </div>

          {/* Right Column: Promotional Price Box */}
          <div className="lg:col-span-5">
            <div className="relative rounded-3xl bg-gradient-to-b from-neutral-900 via-neutral-950 to-[#0d0f14] border-2 border-amber-400 p-6 sm:p-8 shadow-2xl shadow-amber-500/10 text-center">
              
              {/* Flash Stamp Banner */}
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-5 py-1 rounded-full bg-gradient-to-r from-red-600 via-red-500 to-red-600 text-white text-[11px] sm:text-xs font-black uppercase tracking-widest shadow-lg shadow-red-600/40 border border-red-400 animate-pulse flex items-center gap-1.5 whitespace-nowrap">
                <Tag className="w-3.5 h-3.5" />
                <span>{texts.limitedPromo}</span>
              </div>

              {/* Price Content */}
              <div className="pt-4 pb-6 border-b border-neutral-800/80 space-y-2">
                {/* Market Price (Old) */}
                <div className="flex items-center justify-center gap-2">
                  <span className="text-xs text-neutral-400 font-mono">{texts.marketVal}</span>
                  <span className="text-base sm:text-lg text-red-400/90 line-through font-bold font-mono">
                    R$ {originalPrice.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </span>
                </div>

                {/* "POR APENAS" label */}
                <div className="text-xs sm:text-sm font-black uppercase tracking-widest text-amber-400 font-mono">
                  {texts.byOnly}
                </div>

                {/* Promotional Price */}
                <div className="flex items-baseline justify-center gap-1">
                  <span className="text-2xl sm:text-3xl font-display font-extrabold text-amber-400">R$</span>
                  <span className="text-5xl sm:text-6xl font-display font-black text-white tracking-tight drop-shadow-[0_2px_12px_rgba(255,255,255,0.2)]">
                    {Math.floor(price).toLocaleString('pt-BR')}<span className="text-3xl sm:text-4xl text-amber-300">,{(price % 1).toFixed(2).slice(2) || '00'}</span>
                  </span>
                  <span className="text-xs text-neutral-400 font-mono ml-1">{texts.cash}</span>
                </div>

                {/* Installment Badge */}
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-300 font-mono text-xs font-bold">
                  <CreditCard className="w-3.5 h-3.5" />
                  <span>{texts.installments}</span>
                </div>

                <p className="text-[11px] text-neutral-400 pt-1">
                  {texts.savings}
                </p>
              </div>

              {/* Core Deliverables Checklist */}
              <div className="py-5 space-y-2 text-xs text-neutral-300 text-left">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>{texts.check1}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>{texts.check2}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>{texts.check3}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>{texts.check4}</span>
                </div>
              </div>

              {/* Primary Call to Action Button */}
              <div className="space-y-3 pt-2">
                <button
                  onClick={() => onNavigate('matricula')}
                  className="w-full py-4 px-6 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-400 hover:from-amber-300 hover:to-amber-400 text-neutral-950 font-black uppercase tracking-wider text-sm sm:text-base rounded-2xl shadow-xl shadow-amber-500/25 hover:shadow-amber-500/40 transition-all cursor-pointer flex items-center justify-center gap-2 group active:scale-98"
                  id="cinelab-5-cta-button"
                >
                  <span>{texts.ctaBtn}</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform" />
                </button>

                {/* Instant Access & Payment Guarantee Icons */}
                <div className="flex items-center justify-center gap-4 text-[10.5px] font-mono text-neutral-400 pt-1">
                  <span className="flex items-center gap-1 text-emerald-400">
                    <QrCode className="w-3.5 h-3.5" /> {texts.pix}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1 text-amber-300">
                    <CreditCard className="w-3.5 h-3.5" /> {texts.cards}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1 text-blue-300">
                    <ShieldCheck className="w-3.5 h-3.5" /> {texts.secure}
                  </span>
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* Feature Grid Bar */}
        <div className="mt-10 pt-8 border-t border-neutral-800/80 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 text-left">
          <div className="p-3.5 rounded-xl bg-neutral-900/60 border border-neutral-800">
            <span className="block text-xs font-mono font-bold text-amber-400">{texts.f1Title}</span>
            <span className="text-[11px] text-neutral-400">{texts.f1Desc}</span>
          </div>

          <div className="p-3.5 rounded-xl bg-neutral-900/60 border border-neutral-800">
            <span className="block text-xs font-mono font-bold text-amber-400">{texts.f2Title}</span>
            <span className="text-[11px] text-neutral-400">{texts.f2Desc}</span>
          </div>

          <div className="p-3.5 rounded-xl bg-neutral-900/60 border border-neutral-800">
            <span className="block text-xs font-mono font-bold text-amber-400">{texts.f3Title}</span>
            <span className="text-[11px] text-neutral-400">{texts.f3Desc}</span>
          </div>

          <div className="p-3.5 rounded-xl bg-neutral-900/60 border border-neutral-800">
            <span className="block text-xs font-mono font-bold text-amber-400">{texts.f4Title}</span>
            <span className="text-[11px] text-neutral-400">{texts.f4Desc}</span>
          </div>

          <div className="p-3.5 rounded-xl bg-neutral-900/60 border border-neutral-800 col-span-2 sm:col-span-1">
            <span className="block text-xs font-mono font-bold text-amber-400">{texts.f5Title}</span>
            <span className="text-[11px] text-neutral-400">{texts.f5Desc}</span>
          </div>
        </div>

      </div>

      {/* Bottom Cinematic Quote Strip */}
      <div className="bg-amber-500/10 border-t border-amber-500/30 px-4 py-3 text-center">
        <p className="text-xs sm:text-sm font-mono font-bold text-amber-300 tracking-wider uppercase">
          {texts.quote}
        </p>
      </div>
    </div>
  );
};
