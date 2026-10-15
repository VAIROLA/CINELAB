import React from 'react';
import { Logo } from './Logo.js';
import { CourseSettings } from '../types/index.js';
import {
  Film,
  Award,
  BookOpen,
  Mail,
  Phone,
  ShieldCheck,
  Calendar,
  Lock,
  User,
  Clock,
  MapPin,
  MessageCircle,
  Sparkles,
  GraduationCap,
  Clapperboard,
  Facebook,
} from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext.js';

interface FooterProps {
  onNavigate: (route: string) => void;
  settings?: CourseSettings | null;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, settings }) => {
  const { t, language } = useLanguage();
  const currentYear = new Date().getFullYear();

  const localizedAbout = {
    pt: 'Escola e laboratório de formação profissional em Cinema e Realização Audiovisual. Metodologia de imersão de 3 meses (90 dias), 10 apostilas didáticas com cronograma progressivo, masterclasses exclusivas, avaliações contínuas e certificação reconhecida pelo mercado.',
    en: 'Professional training school and laboratory in Cinema and Audiovisual Filmmaking. 3-month (90 days) immersion methodology, 10 pedagogical handouts with progressive scheduling, exclusive masterclasses, ongoing evaluations, and recognized certification.',
    es: 'Escuela y laboratorio de formación profesional en Cine y Realización Audiovisual. Metodología de inmersión de 3 meses (90 días), 10 manuales didácticos con cronograma progresivo, masterclasses exclusivas, evaluaciones continuas y certificación profesional.',
    fr: 'École et laboratoire de formation professionnelle en Cinéma et Réalisation Audiovisuelle. Méthodologie d\'immersion de 3 mois (90 jours), 10 fascicules pédagogiques avec calendrier progressif, masterclasses exclusives, évaluations continues et certification professionnelle.',
  };

  const localizedLabels = {
    pt: {
      officialBadge: 'Plataforma EAD Oficial',
      workloadBadge: '180h Carga Horária',
      navTitle: 'Navegação',
      courseNav: 'O Curso de Cinema',
      tonyNav: 'Professor Tony de Luc (Bio & Filmografia)',
      methodNav: 'Cronograma por Dias Contados',
      handoutsNav: 'As 10 Apostilas + 4 Bônus',
      evalNav: 'Sistema de Avaliações',
      certNav: 'Validar Certificado',
      tutorNav: 'CineTutor IA (Tire Dúvidas)',
      areaTitle: 'Área do Aluno & Acesso',
      studentPanel: 'Painel do Aluno (Minha Área)',
      enrollNow: 'Faça sua Matrícula (Turma Aberta)',
      contactSupport: 'Central de Contato & Suporte',
      faqNav: 'Perguntas Frequentes (FAQ)',
      adminNav: 'Acesso Administrativo (Painel)',
      contactTitle: 'Contato & Suporte',
      academicCoord: 'Coordenação Acadêmica:',
      directorRole: 'Diretor Acadêmico & Cineasta',
      copyright: `© ${currentYear} CINELAB – Cinema & Audiovisual. Todos os direitos reservados.`,
      disclaimer: 'Regras pedagógicas validadas por cronograma • Certificação Profissional',
    },
    en: {
      officialBadge: 'Official Online Platform',
      workloadBadge: '180h Workload',
      navTitle: 'Navigation',
      courseNav: 'The Filmmaking Course',
      tonyNav: 'Professor Tony de Luc (Bio & Filmography)',
      methodNav: 'Counted-Days Schedule',
      handoutsNav: 'The 10 Handouts + 4 Bonuses',
      evalNav: 'Evaluation System',
      certNav: 'Validate Certificate',
      tutorNav: 'CineTutor AI (Q&A / Mentor)',
      areaTitle: 'Student Area & Access',
      studentPanel: 'Student Portal (My Area)',
      enrollNow: 'Enroll Now (Enrollment Open)',
      contactSupport: 'Contact & Support Center',
      faqNav: 'Frequently Asked Questions (FAQ)',
      adminNav: 'Administrative Access (Portal)',
      contactTitle: 'Contact & Support',
      academicCoord: 'Academic Coordination:',
      directorRole: 'Academic Director & Filmmaker',
      copyright: `© ${currentYear} CINELAB – Cinema & Audiovisual. All rights reserved.`,
      disclaimer: 'Pedagogical progression validated by schedule • Professional Certification',
    },
    es: {
      officialBadge: 'Plataforma Online Oficial',
      workloadBadge: '180h Carga Lectiva',
      navTitle: 'Navegación',
      courseNav: 'El Curso de Cine',
      tonyNav: 'Profesor Tony de Luc (Biografía y Filmografía)',
      methodNav: 'Cronograma por Días Contados',
      handoutsNav: 'Los 10 Manuales + 4 Bonos',
      evalNav: 'Sistema de Evaluaciones',
      certNav: 'Validar Certificado',
      tutorNav: 'CineTutor IA (Consultas)',
      areaTitle: 'Área del Alumno y Acceso',
      studentPanel: 'Portal del Alumno (Mi Área)',
      enrollNow: 'Inscríbete Ahora (Matrícula Abierta)',
      contactSupport: 'Centro de Contacto y Soporte',
      faqNav: 'Preguntas Frequentes (FAQ)',
      adminNav: 'Acceso Administrativo (Panel)',
      contactTitle: 'Contacto y Soporte',
      academicCoord: 'Coordinación Académica:',
      directorRole: 'Director Académico y Cineasta',
      copyright: `© ${currentYear} CINELAB – Cine y Audiovisual. Todos los derechos reservados.`,
      disclaimer: 'Progresión pedagógica validada por cronograma • Certificación Profesional',
    },
    fr: {
      officialBadge: 'Plateforme en Ligne Officielle',
      workloadBadge: 'Volume Horaire de 180h',
      navTitle: 'Navigation',
      courseNav: 'La Formation Cinéma',
      tonyNav: 'Professeur Tony de Luc (Bio & Filmographie)',
      methodNav: 'Calendrier par Jours Comptés',
      handoutsNav: 'Les 10 Fascicules + 4 Bonus',
      evalNav: 'Système d\'Évaluation',
      certNav: 'Vérifier un Certificat',
      tutorNav: 'CineTutor IA (Questions & Réponses)',
      areaTitle: 'Espace Étudiant & Accès',
      studentPanel: 'Espace Étudiant (Mon Compte)',
      enrollNow: 'Inscrivez-vous (Inscriptions Ouvertes)',
      contactSupport: 'Support & Assistance',
      faqNav: 'Foire Aux Questions (FAQ)',
      adminNav: 'Accès Administration',
      contactTitle: 'Contact & Support',
      academicCoord: 'Direction Pédagogique :',
      directorRole: 'Directeur Académique & Cinéaste',
      copyright: `© ${currentYear} CINELAB – Cinéma & Audiovisuel. Tous droits réservés.`,
      disclaimer: 'Progression pédagogique validée par calendrier • Certification Professionnelle',
    },
  }[language] || {
    officialBadge: 'Plataforma EAD Oficial',
    workloadBadge: '180h Carga Horária',
    navTitle: 'Navegação',
    courseNav: 'O Curso de Cinema',
    tonyNav: 'Professor Tony de Luc (Bio & Filmografia)',
    methodNav: 'Cronograma por Dias Contados',
    handoutsNav: 'As 10 Apostilas + 4 Bônus',
    evalNav: 'Sistema de Avaliações',
    certNav: 'Validar Certificado',
    tutorNav: 'CineTutor IA (Tire Dúvidas)',
    areaTitle: 'Área do Aluno & Acesso',
    studentPanel: 'Painel do Aluno (Minha Área)',
    enrollNow: 'Faça sua Matrícula (Turma Aberta)',
    contactSupport: 'Central de Contato & Suporte',
    faqNav: 'Perguntas Frequentes (FAQ)',
    adminNav: 'Acesso Administrativo (Painel)',
    contactTitle: 'Contato & Suporte',
    academicCoord: 'Coordenação Acadêmica:',
    directorRole: 'Diretor Acadêmico & Cineasta',
    copyright: `© ${currentYear} CINELAB – Cinema & Audiovisual. Todos os direitos reservados.`,
    disclaimer: 'Regras pedagógicas validadas por cronograma • Certificação Profissional',
  };

  const localizedSupportHours: Record<string, string> = {
    pt: settings?.supportHours || 'Segunda a Sexta, das 09h às 17h (Atendimento Direto da Coordenação)',
    en: 'Monday to Friday, 9am to 5pm (Direct Academic Support)',
    es: 'Lunes a Viernes, de 09:00 a 17:00 (Atención Directa)',
    fr: 'Du Lundi au Vendredi, de 9h à 17h (Assistance Pédagogique)',
  };

  const localizedAddress: Record<string, string> = {
    pt: settings?.companyAddress || settings?.contactAddress || 'Rio de Janeiro, RJ • Plataforma Digital Nacional',
    en: 'Rio de Janeiro, Brazil • National & Global Digital Platform',
    es: 'Río de Janeiro, Brasil • Plataforma Digital Nacional e Internacional',
    fr: 'Rio de Janeiro, Brésil • Plateforme Numérique Nationale & Internationale',
  };

  const localizedDirectorRole: Record<string, string> = {
    pt: settings?.tonyRole || settings?.directorRole || 'Cineasta, Diretor de Fotografia, Produtor, Ator, Jornalista & Fundador do CINELAB',
    en: 'Filmmaker, Director of Photography, Producer, Actor, Journalist & Founder of CINELAB',
    es: 'Cineasta, Director de Fotografía, Productor, Actor, Periodista y Fundador de CINELAB',
    fr: 'Cinéaste, Directeur de la Photographie, Producteur, Acteur, Journaliste & Fondateur de CINELAB',
  };

  const defaultAbout = localizedAbout[language] || localizedAbout.pt;
  const defaultCopyright = localizedLabels.copyright;
  const defaultDisclaimer = localizedLabels.disclaimer;

  const statsTexts = {
    pt: {
      tag: 'CINELAB • AUTORIDADE, HISTÓRIA & FORMAÇÃO',
      studentsTitle: '+800',
      studentsLabel: 'Alunos e Cineastas Formados',
      studentsDesc: 'Turmas e oficinas pelo RJ, SP, MG, BA e AM',
      expTitle: '+20 Anos',
      expLabel: 'Trajetória no Cinema & Magistério',
      expDesc: 'Direção, roteiro e produção audiovisual',
      workloadTitle: '180h',
      workloadLabel: 'Formação Reconhecida',
      workloadDesc: 'Certificado com autenticação pública',
      liveBadge: 'Matrículas Abertas',
    },
    en: {
      tag: 'CINELAB • AUTHORITY, HISTORY & EDUCATION',
      studentsTitle: '+800',
      studentsLabel: 'Trained Filmmakers & Students',
      studentsDesc: 'Workshops & film courses across Brazil (RJ, SP, MG, BA, AM)',
      expTitle: '+20 Years',
      expLabel: 'Filmmaking & Teaching Career',
      expDesc: 'Directing, screenwriting & film production',
      workloadTitle: '180h',
      workloadLabel: 'Recognized Workload',
      workloadDesc: 'Publicly authenticated certificate',
      liveBadge: 'Enrollment Open',
    },
    es: {
      tag: 'CINELAB • AUTORIDAD, HISTORIA Y FORMACIÓN',
      studentsTitle: '+800',
      studentsLabel: 'Cineastas y Alumnos Graduados',
      studentsDesc: 'Talleres y cursos por diversos estados de Brasil',
      expTitle: '+20 Años',
      expLabel: 'Trayectoria en Cine y Docencia',
      expDesc: 'Dirección, guion y producción audiovisual',
      workloadTitle: '180h',
      workloadLabel: 'Formación Reconhecida',
      workloadDesc: 'Certificado con validación pública',
      liveBadge: 'Inscripciones Abiertas',
    },
    fr: {
      tag: 'CINELAB • AUTORITÉ, HISTOIRE & FORMATION',
      studentsTitle: '+800',
      studentsLabel: 'Cinéastes et Étudiants Formés',
      studentsDesc: 'Ateliers et cours dans plusieurs régions du Brésil',
      expTitle: '+20 Ans',
      expLabel: 'Carrière Cinématographique & Enseignement',
      expDesc: 'Réalisation, scénario et production audiovisuelle',
      workloadTitle: '180h',
      workloadLabel: 'Formation Reconnue',
      workloadDesc: 'Certificat avec validation publique',
      liveBadge: 'Inscriptions Ouvertes',
    },
  }[language] || {
    tag: 'CINELAB • AUTORIDADE, HISTÓRIA & FORMAÇÃO',
    studentsTitle: '+800',
    studentsLabel: 'Alunos e Cineastas Formados',
    studentsDesc: 'Turmas e oficinas pelo RJ, SP, MG, BA e AM',
    expTitle: '+20 Anos',
    expLabel: 'Trajetória no Cinema & Magistério',
    expDesc: 'Direção, roteiro e produção audiovisual',
    workloadTitle: '180h',
    workloadLabel: 'Formação Reconhecida',
    workloadDesc: 'Certificado com validação pública',
    liveBadge: 'Matrículas Abertas',
  };

  // Format clean whatsapp number for wa.me link
  const rawWa = settings?.whatsappNumber || settings?.contactPhone || '+55 (11) 98765-4321';
  const cleanWa = rawWa.replace(/\D/g, '');
  const waMsg = encodeURIComponent(
    settings?.whatsappDefaultMessage || 'Olá Tony de Luc, gostaria de tirar dúvidas sobre o CINELAB.'
  );

  return (
    <footer className="bg-[#08090b] border-t border-neutral-800 text-neutral-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand Col */}
          <div className="space-y-4 max-w-full overflow-hidden">
            <div className="block pb-2 max-w-[210px]">
              <Logo
                customUrl={settings?.logoUrl}
                size="sm"
                className="max-w-[190px] sm:max-w-[210px] h-auto"
                onClick={() => onNavigate('inicio')}
              />
            </div>
            <p className="text-neutral-400 text-xs leading-relaxed max-w-sm">
              {language === 'pt' ? (settings?.footerAboutText || defaultAbout) : defaultAbout}
            </p>
            <div className="flex flex-wrap items-center gap-3 text-neutral-500 pt-2">
              <span className="flex items-center gap-1 text-[11px] font-mono text-amber-400/80">
                <ShieldCheck className="w-3.5 h-3.5 text-amber-500" />
                <span>{language === 'pt' ? (settings?.footerOfficialBadge || localizedLabels.officialBadge) : localizedLabels.officialBadge}</span>
              </span>
              <span>•</span>
              <span className="text-[11px] font-mono text-neutral-400">
                {language === 'pt' ? '180h Carga Horária' : (localizedLabels?.workloadBadge || '180h Workload')}
              </span>
            </div>

            {/* Social media channels */}
            <div className="flex flex-wrap items-center gap-2 pt-2">
              <a
                href={settings?.facebookUrl || 'https://www.facebook.com'}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-neutral-300 hover:text-blue-400 hover:border-blue-500/50 transition-colors flex items-center gap-1.5 shadow-sm"
                title="Facebook Oficial CINELAB"
              >
                <Facebook className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                <span className="text-[11px] font-mono font-medium">Facebook</span>
              </a>

              {settings?.instagramUrl && (
                <a
                  href={settings.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-neutral-400 hover:text-pink-400 hover:border-pink-500/50 transition-colors flex items-center gap-1.5"
                  title="Instagram Oficial"
                >
                  <span className="text-[11px] font-mono font-medium">Instagram</span>
                </a>
              )}
              {settings?.youtubeUrl && (
                <a
                  href={settings.youtubeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-neutral-400 hover:text-red-400 hover:border-red-500/50 transition-colors flex items-center gap-1.5"
                  title="Canal YouTube"
                >
                  <span className="text-[11px] font-mono font-medium">YouTube</span>
                </a>
              )}
              {settings?.vimeoUrl && (
                <a
                  href={settings.vimeoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-neutral-400 hover:text-blue-400 hover:border-blue-500/50 transition-colors flex items-center gap-1.5"
                  title="Vimeo"
                >
                  <span className="text-[11px] font-mono font-medium">Vimeo</span>
                </a>
              )}
            </div>
          </div>

          {/* Quick Nav */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-neutral-200 mb-4 font-mono">
              {localizedLabels.navTitle}
            </h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => onNavigate('curso')}
                  className="hover:text-amber-400 transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <Film className="w-3 h-3 text-amber-500" /> {localizedLabels.courseNav}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('tony-de-luc')}
                  className="hover:text-amber-400 transition-colors flex items-center gap-1.5 cursor-pointer font-medium text-amber-300/90"
                >
                  <User className="w-3 h-3 text-amber-400" /> {localizedLabels.tonyNav}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('metodologia')}
                  className="hover:text-amber-400 transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <Calendar className="w-3 h-3 text-amber-500" /> {localizedLabels.methodNav}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('apostilas')}
                  className="hover:text-amber-400 transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <BookOpen className="w-3 h-3 text-amber-500" /> {localizedLabels.handoutsNav}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('avaliacoes')}
                  className="hover:text-amber-400 transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <Award className="w-3 h-3 text-amber-500" /> {localizedLabels.evalNav}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('tutor-ia')}
                  className="hover:text-amber-400 transition-colors flex items-center gap-1.5 cursor-pointer text-amber-300/90 font-medium"
                >
                  <Sparkles className="w-3 h-3 text-amber-400" /> {localizedLabels.tutorNav}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('validar-certificado')}
                  className="hover:text-amber-400 transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <ShieldCheck className="w-3 h-3 text-amber-500" /> {localizedLabels.certNav}
                </button>
              </li>
            </ul>
          </div>

          {/* Student & Security */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-neutral-200 mb-4 font-mono">
              {localizedLabels.areaTitle}
            </h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => onNavigate('minha-area')}
                  className="hover:text-amber-400 transition-colors cursor-pointer"
                >
                  {localizedLabels.studentPanel}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('matricula')}
                  className="text-amber-400 font-semibold hover:underline cursor-pointer"
                >
                  {localizedLabels.enrollNow}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('contato')}
                  className="hover:text-amber-400 transition-colors cursor-pointer"
                >
                  {localizedLabels.contactSupport}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('faq')}
                  className="hover:text-amber-400 transition-colors cursor-pointer"
                >
                  {localizedLabels.faqNav}
                </button>
              </li>
            </ul>
          </div>

          {/* Contact & Legal */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-neutral-200 mb-4 font-mono">
              {localizedLabels.contactTitle}
            </h4>
            <ul className="space-y-2.5">
              <li className="flex items-center gap-2 text-neutral-300">
                <Mail className="w-4 h-4 text-amber-500 shrink-0" />
                <span className="font-mono text-[11px]">{settings?.contactEmail || 'cinelab.ecole@gmail.com'}</span>
              </li>
              <li className="flex items-center gap-2 text-neutral-300">
                <Phone className="w-4 h-4 text-amber-500 shrink-0" />
                <a
                  href={`https://wa.me/${cleanWa}?text=${waMsg}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-[11px] hover:text-amber-400 transition-colors flex items-center gap-1"
                >
                  <span>{settings?.contactPhone || '+55 (21) 96672-5240'}</span>
                  <MessageCircle className="w-3 h-3 text-emerald-400" />
                </a>
              </li>
              <li className="flex items-center gap-2 text-neutral-400 text-[11px]">
                <Clock className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                <span>{language === 'pt' ? (settings?.supportHours || localizedSupportHours.pt) : (localizedSupportHours[language] || localizedSupportHours.en)}</span>
              </li>
              <li className="flex items-center gap-2 text-neutral-400 text-[11px]">
                <MapPin className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                <span>{language === 'pt' ? (settings?.companyAddress || settings?.contactAddress || localizedAddress.pt) : (localizedAddress[language] || localizedAddress.en)}</span>
              </li>
              <li className="pt-2 text-[11px] text-neutral-400 leading-normal border-t border-neutral-900">
                {localizedLabels.academicCoord}{' '}
                <button
                  onClick={() => onNavigate('tony-de-luc')}
                  className="text-amber-400/90 font-medium hover:underline inline"
                >
                  {settings?.tonyName || settings?.directorName || 'Professor Cineasta Tony de Luc'}
                </button>{' '}
                ({language === 'pt' ? (settings?.tonyRole || settings?.directorRole || localizedDirectorRole.pt) : (localizedDirectorRole[language] || localizedDirectorRole.en)})
              </li>
            </ul>
          </div>
        </div>

        {/* Faixa de Impacto: CINELAB • Autoridade, História & Formação */}
        <div className="my-8 p-4 sm:p-6 rounded-2xl bg-gradient-to-r from-[#170530]/90 via-[#260a4e]/90 to-[#170530]/90 border border-purple-500/40 shadow-[0_0_30px_rgba(168,85,247,0.2)] backdrop-blur-md">
          <div className="flex flex-col md:flex-row items-center justify-between gap-3 pb-4 border-b border-purple-900/60 text-center md:text-left">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_10px_rgba(52,211,153,0.8)]" />
              <span className="text-[11px] font-mono uppercase tracking-widest text-purple-200 font-bold">
                {statsTexts.tag}
              </span>
            </div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/60 text-[10.5px] font-mono text-emerald-300 shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
              <span className="font-bold">{statsTexts.liveBadge}</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
            {/* 1. Alunos e Cineastas Formados */}
            <div className="p-3.5 rounded-xl bg-purple-950/40 border border-purple-500/30 flex items-center gap-3.5 shadow-inner">
              <div className="w-12 h-12 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center shrink-0 shadow-md">
                <GraduationCap className="w-6 h-6 text-amber-400" />
              </div>
              <div className="min-w-0">
                <div className="text-xl sm:text-2xl font-black font-display text-amber-300 drop-shadow-[0_0_10px_rgba(251,191,36,0.3)]">
                  {statsTexts.studentsTitle}
                </div>
                <div className="text-xs font-bold text-white truncate">
                  {statsTexts.studentsLabel}
                </div>
                <div className="text-[10px] text-purple-300/80 font-mono leading-tight line-clamp-2">
                  {statsTexts.studentsDesc}
                </div>
              </div>
            </div>

            {/* 2. Trajetória no Cinema & Magistério (+20 Anos) */}
            <div className="p-3.5 rounded-xl bg-purple-950/40 border border-purple-500/30 flex items-center gap-3.5 shadow-inner">
              <div className="w-12 h-12 rounded-xl bg-purple-500/20 border border-purple-400/50 flex items-center justify-center shrink-0 shadow-md">
                <Clapperboard className="w-6 h-6 text-purple-300" />
              </div>
              <div className="min-w-0">
                <div className="text-xl sm:text-2xl font-black font-display text-fuchsia-300 drop-shadow-[0_0_10px_rgba(217,70,239,0.4)]">
                  {statsTexts.expTitle}
                </div>
                <div className="text-xs font-bold text-white truncate">
                  {statsTexts.expLabel}
                </div>
                <div className="text-[10px] text-purple-300/80 font-mono leading-tight line-clamp-2">
                  {statsTexts.expDesc}
                </div>
              </div>
            </div>

            {/* 3. Carga Horária & Certificação */}
            <div className="p-3.5 rounded-xl bg-purple-950/40 border border-purple-500/30 flex items-center gap-3.5 shadow-inner">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center shrink-0 shadow-md">
                <Award className="w-6 h-6 text-emerald-400" />
              </div>
              <div className="min-w-0">
                <div className="text-xl sm:text-2xl font-black font-display text-emerald-300 drop-shadow-[0_0_10px_rgba(52,211,153,0.3)]">
                  {statsTexts.workloadTitle}
                </div>
                <div className="text-xs font-bold text-white truncate">
                  {statsTexts.workloadLabel}
                </div>
                <div className="text-[10px] text-purple-300/80 font-mono leading-tight line-clamp-2">
                  {statsTexts.workloadDesc}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom copyright & disclaimer */}
        <div className="border-t border-neutral-800/80 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-neutral-500">
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-center sm:text-left">
            <p>{language === 'pt' ? (settings?.footerCopyright || defaultCopyright) : defaultCopyright}</p>
          </div>
          <div className="flex items-center gap-4 text-center sm:text-right">
            <span>{language === 'pt' ? (settings?.footerDisclaimer || defaultDisclaimer) : defaultDisclaimer}</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
