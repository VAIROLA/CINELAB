import React, { useEffect, useState } from 'react';
import { api } from '../services/api.js';
import { Certificate, User, Enrollment } from '../types/index.js';
import { Logo } from '../components/Logo.js';
import { useLanguage } from '../i18n/LanguageContext.js';
import {
  Award,
  CheckCircle2,
  AlertCircle,
  Download,
  Printer,
  ShieldCheck,
  Calendar,
  Clock,
  ExternalLink,
} from 'lucide-react';

interface CertificateViewProps {
  isLoggedIn: boolean;
  onNavigate: (route: string, params?: any) => void;
  user: User | null;
  enrollment: Enrollment | null;
}

export const CertificateView: React.FC<CertificateViewProps> = ({
  isLoggedIn,
  onNavigate,
  user,
  enrollment,
}) => {
  const { language } = useLanguage();
  const [certData, setCertData] = useState<{
    certificate: Certificate | null;
    isEligible: boolean;
    unmetCriteria: string[];
    averageGrade: number;
  } | null>(null);
  const [loading, setLoading] = useState(true);

  const tCert = {
    pt: {
      restrictedTitle: 'Certificado Oficial CINELAB',
      restrictedDesc: 'Área restrita a alunos matriculados no curso. Faça login para consultar seu status de certificação.',
      enrollBtn: 'Matricule-se no Curso',
      badge: 'Diploma Profissional',
      title: 'Certificado de Conclusão',
      desc: 'Documento oficial com carga horária de 180 horas e autenticação pública por código verificável.',
      verifyingCriteria: 'Verificando critérios acadêmicos do aluno...',
      inProgressTitle: 'Certificação em Andamento',
      inProgressDesc: 'Seu certificado será emitido automaticamente assim que todos os critérios forem cumpridos.',
      checklistTitle: 'Checklist de Requisitos Obrigatórios:',
      backDashboard: 'Voltar ao Painel do Aluno',
      completeEvals: 'Completar Avaliações',
      registeredBadge: 'CERTIFICADO OFICIAL EMITIDO E REGISTRADO',
      printBtn: 'Imprimir / Salvar PDF',
      validateBtn: 'Ver na Validação Pública',
      republicLine: 'REPÚBLICA FEDERATIVA DO BRASIL • EDUCAÇÃO AUDIOVISUAL',
      cinelabSub: 'CINELAB – CINEMA & AUDIOVISUAL',
      diplomaTitle: 'CERTIFICADO DE CONCLUSÃO',
      facultyConfer: 'O corpo docente do CINELAB confere o presente certificado a:',
      forHavingCompleted: 'Por haver concluído com aproveitamento pedagógico e média final',
      courseOf: 'o curso de formação profissional em',
      courseName: 'Cinema & Audiovisual',
      taughtOver: ', ministrado ao longo de 3 meses em 10 etapas formativas (90 dias), totalizando a carga horária de',
      workloadVal: '180 horas',
      generalCoord: 'Coordenação Geral • Diretor',
      officialBadge: 'OFICIAL',
      dateLabel: 'Data:',
      codeLabel: 'CÓDIGO:',
      validationNote: 'Validação online no sistema oficial CINELAB',
    },
    en: {
      restrictedTitle: 'CINELAB Official Certificate',
      restrictedDesc: 'Restricted area for enrolled students. Please log in to check your certification status.',
      enrollBtn: 'Enroll in Course',
      badge: 'Professional Diploma',
      title: 'Certificate of Completion',
      desc: 'Official diploma with 180-hour workload and public verification via registered cryptographic code.',
      verifyingCriteria: 'Checking student academic criteria...',
      inProgressTitle: 'Certification in Progress',
      inProgressDesc: 'Your certificate will be generated automatically once all graduation requirements are met.',
      checklistTitle: 'Mandatory Graduation Requirements Checklist:',
      backDashboard: 'Return to Student Dashboard',
      completeEvals: 'Complete Assessments',
      registeredBadge: 'OFFICIAL CERTIFICATE ISSUED & REGISTERED',
      printBtn: 'Print / Save as PDF',
      validateBtn: 'View Public Verification',
      republicLine: 'FEDERATIVE REPUBLIC OF BRAZIL • AUDIOVISUAL EDUCATION',
      cinelabSub: 'CINELAB – CINEMA & AUDIOVISUAL',
      diplomaTitle: 'CERTIFICATE OF COMPLETION',
      facultyConfer: 'The faculty of CINELAB proudly confers this certificate to:',
      forHavingCompleted: 'For having successfully completed with academic excellence and a final grade of',
      courseOf: 'the professional training program in',
      courseName: 'Cinema & Audiovisual Filmmaking',
      taughtOver: ', delivered over 3 months across 10 modular stages (90 days), amounting to a total certified workload of',
      workloadVal: '180 hours',
      generalCoord: 'General Academic Coordination • Director',
      officialBadge: 'OFFICIAL',
      dateLabel: 'Date:',
      codeLabel: 'CODE:',
      validationNote: 'Online validation in official CINELAB registry',
    },
    es: {
      restrictedTitle: 'Certificado Oficial CINELAB',
      restrictedDesc: 'Área reservada a alumnos matriculados. Inicie sesión para consultar su estado de certificación.',
      enrollBtn: 'Matricularse en el Curso',
      badge: 'Diploma Profesional',
      title: 'Certificado de Finalización',
      desc: 'Documento oficial con 180 horas de carga horaria y validación pública mediante código verificable.',
      verifyingCriteria: 'Verificando requisitos académicos del alumno...',
      inProgressTitle: 'Certificación en Curso',
      inProgressDesc: 'Su certificado se emitirá automáticamente una vez cumplidos todos los requisitos académicos.',
      checklistTitle: 'Lista de Requisitos Obligatorios:',
      backDashboard: 'Volver al Panel del Alumno',
      completeEvals: 'Completar Evaluaciones',
      registeredBadge: 'CERTIFICADO OFICIAL EMITIDO Y REGISTRADO',
      printBtn: 'Imprimir / Guardar PDF',
      validateBtn: 'Ver Validación Pública',
      republicLine: 'REPÚBLICA FEDERATIVA DE BRASIL • EDUCACIÓN AUDIOVISUAL',
      cinelabSub: 'CINELAB – CINE Y AUDIOVISUAL',
      diplomaTitle: 'CERTIFICADO DE FINALIZACIÓN',
      facultyConfer: 'El claustro académico de CINELAB otorga el presente certificado a:',
      forHavingCompleted: 'Por haber completado con aprovechamiento pedagógico y promedio final de',
      courseOf: 'el programa de formación profesional en',
      courseName: 'Cine y Realización Audiovisual',
      taughtOver: ', impartido a lo largo de 3 meses en 10 etapas formativas (90 días), con una carga horaria total de',
      workloadVal: '180 horas',
      generalCoord: 'Coordinación General • Director',
      officialBadge: 'OFICIAL',
      dateLabel: 'Fecha:',
      codeLabel: 'CÓDIGO:',
      validationNote: 'Validación online en el registro oficial CINELAB',
    },
    fr: {
      restrictedTitle: 'Certificat Officiel CINELAB',
      restrictedDesc: 'Espace réservé aux étudiants inscrits. Connectez-vous pour consulter votre statut de certification.',
      enrollBtn: 'S\'inscrire au Cours',
      badge: 'Diplôme Professionnel',
      title: 'Certificat de Réussite',
      desc: 'Document officiel certifiant un volume de 180 heures avec authentification publique vérifiable.',
      verifyingCriteria: 'Vérification des critères académiques...',
      inProgressTitle: 'Certification en Cours',
      inProgressDesc: 'Votre certificat sera délivré automatiquement dès validation de l\'ensemble des critères.',
      checklistTitle: 'Liste des Critères Obligatoires de Diplomation :',
      backDashboard: 'Retour à l\'Espace Étudiant',
      completeEvals: 'Compléter les Évaluations',
      registeredBadge: 'CERTIFICAT OFFICIEL DÉLIVRÉ ET ENREGISTRÉ',
      printBtn: 'Imprimer / Sauvegarder en PDF',
      validateBtn: 'Voir l\'Authentification Publique',
      republicLine: 'RÉPUBLIQUE FÉDÉRATIVE DU BRÉSIL • FORMATION AUDIOVISUELLE',
      cinelabSub: 'CINELAB – CINÉMA & AUDIOVISUEL',
      diplomaTitle: 'CERTIFICAT DE RÉUSSITE',
      facultyConfer: 'Le corps professoral de CINELAB décerne le présent certificat à :',
      forHavingCompleted: 'Pour avoir validé avec succès l\'ensemble des modules avec une moyenne finale de',
      courseOf: 'la formation professionnelle en',
      courseName: 'Cinéma & Réalisation Audiovisuelle',
      taughtOver: ', dispensée sur 3 mois en 10 étapes formatives (90 jours), totalisant un volume horaire de',
      workloadVal: '180 heures',
      generalCoord: 'Coordination Générale • Directeur',
      officialBadge: 'OFFICIEL',
      dateLabel: 'Date :',
      codeLabel: 'CODE :',
      validationNote: 'Validation en ligne sur le registre officiel CINELAB',
    },
  }[language] || {
    restrictedTitle: 'Certificado Oficial CINELAB',
    restrictedDesc: 'Área restrita a alunos matriculados no curso. Faça login para consultar seu status de certificação.',
    enrollBtn: 'Matricule-se no Curso',
    badge: 'Diploma Profissional',
    title: 'Certificado de Conclusão',
    desc: 'Documento oficial com carga horária de 180 horas e autenticação pública por código verificável.',
    verifyingCriteria: 'Verificando critérios acadêmicos do aluno...',
    inProgressTitle: 'Certificação em Andamento',
    inProgressDesc: 'Seu certificado será emitido automaticamente assim que todos os critérios forem cumpridos.',
    checklistTitle: 'Checklist de Requisitos Obrigatórios:',
    backDashboard: 'Voltar ao Painel do Aluno',
    completeEvals: 'Completar Avaliações',
    registeredBadge: 'CERTIFICADO OFICIAL EMITIDO E REGISTRADO',
    printBtn: 'Imprimir / Salvar PDF',
    validateBtn: 'Ver na Validação Pública',
    republicLine: 'REPÚBLICA FEDERATIVA DO BRASIL • EDUCAÇÃO AUDIOVISUAL',
    cinelabSub: 'CINELAB – CINEMA & AUDIOVISUAL',
    diplomaTitle: 'CERTIFICADO DE CONCLUSÃO',
    facultyConfer: 'O corpo docente do CINELAB confere o presente certificado a:',
    forHavingCompleted: 'Por haver concluído com aproveitamento pedagógico e média final',
    courseOf: 'o curso de formação profissional em',
    courseName: 'Cinema & Audiovisual',
    taughtOver: ', ministrado ao longo de 3 meses em 10 etapas formativas (90 dias), totalizando a carga horária de',
    workloadVal: '180 horas',
    generalCoord: 'Coordenação Geral • Diretor',
    officialBadge: 'OFICIAL',
    dateLabel: 'Data:',
    codeLabel: 'CÓDIGO:',
    validationNote: 'Validação online no sistema oficial CINELAB',
  };

  useEffect(() => {
    if (isLoggedIn) {
      loadCert();
    } else {
      setLoading(false);
    }
  }, [isLoggedIn]);

  const loadCert = async () => {
    try {
      setLoading(true);
      const data = await api.getStudentCertificate();
      setCertData(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const localizeCriterion = (crit: string) => {
    if (language === 'pt') return crit;
    const mediaMatch = crit.match(/([\d\.]+)[^\d]+([\d\.]+)/);
    if (crit.toLowerCase().includes('média') || crit.toLowerCase().includes('media')) {
      const minG = mediaMatch ? mediaMatch[1] : '6.0';
      const curG = mediaMatch ? mediaMatch[2] : '0.0';
      if (language === 'en') return `Achieve a grade point average equal to or greater than ${minG} (your GPA: ${curG}).`;
      if (language === 'es') return `Alcanzar un promedio igual o superior a ${minG} (tu promedio: ${curG}).`;
      if (language === 'fr') return `Obtenir une moyenne égale ou supérieure à ${minG} (votre moyenne : ${curG}).`;
    }
    const evalMatch = crit.match(/(\d+)\/10/);
    if (evalMatch) {
      const count = evalMatch[1];
      if (language === 'en') return `Complete all 10 course assessments (${count}/10 completed).`;
      if (language === 'es') return `Completar las 10 evaluaciones del curso (${count}/10 realizadas).`;
      if (language === 'fr') return `Valider les 10 évaluations du cours (${count}/10 complétées).`;
    }
    if (crit.includes('cronograma') || crit.includes('etapas')) {
      if (language === 'en') return 'Complete the 10-stage curriculum timeline (3 months).';
      if (language === 'es') return 'Completar el cronograma de las 10 etapas (3 meses).';
      if (language === 'fr') return 'Terminer le calendrier des 10 étapes (3 mois).';
    }
    return crit;
  };

  const formatDate = (isoString?: string) => {
    const locale = language === 'en' ? 'en-US' : language === 'es' ? 'es-ES' : language === 'fr' ? 'fr-FR' : 'pt-BR';
    if (!isoString) return new Date().toLocaleDateString(locale);
    try {
      return new Date(isoString).toLocaleDateString(locale, {
        day: '2-digit',
        month: 'long',
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
          <Award className="w-12 h-12 text-amber-400 mx-auto" />
          <h2 className="text-xl font-bold text-white">{tCert.restrictedTitle}</h2>
          <p className="text-xs text-neutral-400 leading-relaxed">
            {tCert.restrictedDesc}
          </p>
          <button
            onClick={() => onNavigate('matricula')}
            className="px-6 py-2.5 bg-amber-500 text-neutral-950 font-bold uppercase rounded-lg text-xs cursor-pointer hover:bg-amber-400 transition-colors"
          >
            {tCert.enrollBtn}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12 text-neutral-200 space-y-10">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3 print:hidden">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-mono font-medium uppercase tracking-wider">
          <Award className="w-3.5 h-3.5" /> {tCert.badge}
        </div>
        <h1 className="text-3xl sm:text-4xl font-display font-extrabold text-white">
          {tCert.title}
        </h1>
        <p className="text-xs sm:text-sm text-neutral-300">
          {tCert.desc}
        </p>
      </div>

      {loading ? (
        <div className="py-20 text-center text-neutral-500 font-mono text-xs print:hidden">
          {tCert.verifyingCriteria}
        </div>
      ) : certData && !certData.isEligible && !certData.certificate ? (
        /* Criteria Unmet Box */
        <div className="max-w-2xl mx-auto p-8 rounded-3xl bg-neutral-900 border border-neutral-800 space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400">
              <Clock className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">
                {tCert.inProgressTitle}
              </h3>
              <p className="text-xs text-neutral-400">
                {tCert.inProgressDesc}
              </p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800 space-y-3 text-xs">
            <span className="font-mono font-bold text-neutral-400 text-[11px] uppercase tracking-wider">
              {tCert.checklistTitle}
            </span>
            <div className="space-y-2">
              {certData.unmetCriteria.map((crit, i) => (
                <div key={i} className="flex items-center gap-2.5 text-amber-300">
                  <div className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0" />
                  <span>{localizeCriterion(crit)}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => onNavigate('minha-area')}
              className="w-full py-3 bg-neutral-800 hover:bg-neutral-700 text-white rounded-xl text-xs font-semibold cursor-pointer"
            >
              {tCert.backDashboard}
            </button>
            <button
              onClick={() => onNavigate('avaliacoes')}
              className="w-full py-3 bg-amber-500 hover:bg-amber-400 text-neutral-950 rounded-xl text-xs font-bold uppercase cursor-pointer"
            >
              {tCert.completeEvals}
            </button>
          </div>
        </div>
      ) : certData?.certificate ? (
        /* The Full High-Resolution Printable Certificate */
        <div className="space-y-6">
          {/* Action Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-neutral-900 border border-neutral-800 print:hidden">
            <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 font-bold">
              <CheckCircle2 className="w-4 h-4" />
              <span>{tCert.registeredBadge}</span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => window.print()}
                className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-neutral-950 text-xs font-bold uppercase flex items-center gap-1.5 cursor-pointer shadow-md shadow-amber-500/20"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>{tCert.printBtn}</span>
              </button>
              <button
                onClick={() =>
                  onNavigate('validar-certificado', {
                    code: certData.certificate?.validationCode,
                  })
                }
                className="px-4 py-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs font-medium flex items-center gap-1.5 cursor-pointer"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                <span>{tCert.validateBtn}</span>
              </button>
            </div>
          </div>

          {/* Certificate Canvas / Diploma Layout */}
          <div
            id="certificate-print-area"
            className="relative p-4 sm:p-14 rounded-3xl bg-[#0b0d12] border-4 border-double border-amber-500/50 shadow-2xl text-center space-y-6 sm:space-y-8 print:border-neutral-900 print:bg-white print:text-neutral-950 overflow-hidden"
          >
            {/* Guilloche / Film watermark texture backdrop */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none flex items-center justify-center">
              <Award className="w-[500px] h-[500px] text-amber-500" />
            </div>

            {/* Micro header */}
            <div className="space-y-1">
              <div className="text-[11px] font-mono tracking-[0.35em] uppercase text-amber-400 font-bold print:text-amber-800">
                {tCert.republicLine}
              </div>
              <h2 className="text-2xl sm:text-3xl font-display font-extrabold tracking-widest text-white print:text-neutral-950">
                {tCert.cinelabSub}
              </h2>
              <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-amber-500 to-transparent mx-auto mt-2" />
            </div>

            {/* Diploma Title */}
            <div className="space-y-2">
              <h1 className="text-xl sm:text-2xl font-serif tracking-widest uppercase text-amber-300 font-bold print:text-neutral-900">
                {tCert.diplomaTitle}
              </h1>
              <p className="text-xs sm:text-sm text-neutral-400 print:text-neutral-600 italic">
                {tCert.facultyConfer}
              </p>
            </div>

            {/* Student Name */}
            <div className="py-2 border-b-2 border-amber-500/40 max-w-xl mx-auto print:border-neutral-400">
              <span className="text-2xl sm:text-4xl font-display font-extrabold text-white tracking-wide print:text-neutral-950">
                {certData.certificate.studentName}
              </span>
            </div>

            {/* Attestation Text */}
            <p className="text-xs sm:text-sm text-neutral-300 print:text-neutral-700 leading-relaxed max-w-2xl mx-auto font-sans">
              {tCert.forHavingCompleted}{' '}
              <strong className="text-amber-400 print:text-neutral-950">
                {certData.certificate.finalAverage.toFixed(1)} / 10.0
              </strong>{' '}
              {tCert.courseOf}{' '}
              <strong className="text-white print:text-neutral-950 uppercase font-semibold">
                {tCert.courseName}
              </strong>
              {tCert.taughtOver}{' '}
              <strong className="text-white print:text-neutral-950">{tCert.workloadVal}</strong>.
            </p>

            {/* Signatures & Seal */}
            <div className="pt-8 border-t border-neutral-800 print:border-neutral-300 grid grid-cols-1 sm:grid-cols-3 gap-6 items-end">
              {/* Director Signature */}
              <div className="text-center space-y-1">
                <div className="font-serif italic text-base text-amber-300 print:text-neutral-800">
                  {certData.certificate.directorName}
                </div>
                <div className="w-36 h-0.5 bg-neutral-700 print:bg-neutral-400 mx-auto" />
                <div className="text-[10px] font-mono text-neutral-400 print:text-neutral-600 uppercase">
                  {tCert.generalCoord}
                </div>
              </div>

              {/* Gold Official Stamp */}
              <div className="flex justify-center">
                <div className="w-20 h-20 rounded-full border-2 border-amber-500/80 p-1 flex items-center justify-center bg-amber-500/10 print:border-amber-700">
                  <div className="w-full h-full rounded-full border border-dashed border-amber-400 flex flex-col items-center justify-center text-[9px] font-mono font-bold text-amber-400 uppercase print:text-amber-800">
                    <span>CINELAB</span>
                    <Award className="w-4 h-4 my-0.5" />
                    <span>{tCert.officialBadge}</span>
                  </div>
                </div>
              </div>

              {/* Validation & Date */}
              <div className="text-center sm:text-right space-y-1 font-mono text-[11px] text-neutral-400 print:text-neutral-600">
                <div>{tCert.dateLabel} {formatDate(certData.certificate.issuedAt)}</div>
                <div className="text-amber-400 print:text-neutral-900 font-bold text-xs">
                  {tCert.codeLabel} {certData.certificate.validationCode}
                </div>
                <div className="text-[9px] text-neutral-500">
                  {tCert.validationNote}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};
