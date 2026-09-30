import React, { useState, useEffect } from 'react';
import { api } from '../services/api.js';
import { Certificate } from '../types/index.js';
import { useLanguage } from '../i18n/LanguageContext.js';
import {
  ShieldCheck,
  Search,
  CheckCircle2,
  XCircle,
  Award,
  Calendar,
  Clock,
  User as UserIcon,
} from 'lucide-react';

interface CertificateValidationViewProps {
  initialCode?: string;
  onNavigate: (route: string) => void;
}

export const CertificateValidationView: React.FC<CertificateValidationViewProps> = ({
  initialCode = '',
  onNavigate,
}) => {
  const { language } = useLanguage();
  const [code, setCode] = useState(initialCode);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{
    valid: boolean;
    certificate?: Certificate;
    message?: string;
  } | null>(null);

  const tVal = {
    pt: {
      badge: 'Autenticidade Pública',
      title: 'Validador de Certificados CINELAB',
      desc: 'Serviço público oficial de verificação de autenticidade para produtoras, comissões de editais, festivais e instituições.',
      inputLabel: 'Digite o Código do Certificado:',
      placeholder: 'ex: CNL-CERT-8910-4821',
      verifying: 'Verificando...',
      verifyBtn: 'Verificar',
      testQuestion: 'Deseja testar um código existente?',
      useDemoCode: 'Usar Código Demo',
      validBadge: 'CERTIFICADO VÁLIDO E AUTÊNTICO',
      confirmedTitle: 'Registro Confirmado no Sistema CINELAB',
      studentName: 'NOME DO DIPLOMADO:',
      training: 'FORMAÇÃO PROFISSIONAL:',
      trainingVal: 'Cinema & Realização Audiovisual',
      workload: 'CARGA HORÁRIA:',
      hours: '180 Horas',
      finalAverage: 'MÉDIA GERAL FINAL:',
      issuedAt: 'DATA DA EMISSÃO:',
      regCode: 'CÓDIGO DE REGISTRO:',
      disclaimer: 'Este certificado confere pleno cumprimento do programa acadêmico, incluindo as 10 etapas formativas (90 dias), aprovação nas avaliações teóricas e práticas, e cumprimento das atividades curriculares sob coordenação do Professor Cineasta Tony de Luc.',
      notFoundTitle: 'Certificado Não Encontrado',
      notFoundDesc: 'O código digitado não corresponde a nenhum certificado válido emitido pelo CINELAB.',
      errorConnect: 'Erro ao conectar ao validador.',
    },
    en: {
      badge: 'Public Authenticity',
      title: 'CINELAB Certificate Validator',
      desc: 'Official public authenticity verification service for production companies, festival committees, grants, and cultural institutions.',
      inputLabel: 'Enter Certificate Verification Code:',
      placeholder: 'e.g.: CNL-CERT-8910-4821',
      verifying: 'Verifying...',
      verifyBtn: 'Verify',
      testQuestion: 'Want to test an existing code?',
      useDemoCode: 'Use Demo Code',
      validBadge: 'VALID & AUTHENTIC CERTIFICATE',
      confirmedTitle: 'Confirmed Record in CINELAB Academic System',
      studentName: 'GRADUATE NAME:',
      training: 'PROFESSIONAL PROGRAM:',
      trainingVal: 'Cinema & Audiovisual Filmmaking',
      workload: 'PROGRAM WORKLOAD:',
      hours: '180 Hours',
      finalAverage: 'FINAL AVERAGE GRADE:',
      issuedAt: 'DATE OF ISSUANCE:',
      regCode: 'REGISTRATION CODE:',
      disclaimer: 'This certificate confirms full completion of the academic program, including all 10 formative stages (90 days), passing grades in theoretical and practical examinations, and fulfillment of curriculum assignments under the direction of Filmmaker Tony de Luc.',
      notFoundTitle: 'Certificate Not Found',
      notFoundDesc: 'The entered code does not match any valid certificate issued by CINELAB.',
      errorConnect: 'Error connecting to validation service.',
    },
    es: {
      badge: 'Autenticidad Pública',
      title: 'Validador de Certificados CINELAB',
      desc: 'Servicio público oficial de verificación de autenticidad para productoras, festivales, fondos concursables e instituciones.',
      inputLabel: 'Ingrese el Código del Certificado:',
      placeholder: 'ej.: CNL-CERT-8910-4821',
      verifying: 'Verificando...',
      verifyBtn: 'Verificar',
      testQuestion: '¿Desea probar un código existente?',
      useDemoCode: 'Usar Código Demo',
      validBadge: 'CERTIFICADO VÁLIDO Y AUTÉNTICO',
      confirmedTitle: 'Registro Confirmado en el Sistema CINELAB',
      studentName: 'NOMBRE DEL GRADUADO:',
      training: 'FORMACIÓN PROFESIONAL:',
      trainingVal: 'Cine y Realización Audiovisual',
      workload: 'CARGA HORARIA:',
      hours: '180 Horas',
      finalAverage: 'PROMEDIO FINAL:',
      issuedAt: 'FECHA DE EMISIÓN:',
      regCode: 'CÓDIGO DE REGISTRO:',
      disclaimer: 'Este certificado acredita el cumplimiento total del programa académico, incluidas las 10 etapas formativas (90 días), la aprobación de exámenes teóricos y prácticos, y la realización de actividades curriculares bajo la coordinación del Cineasta Tony de Luc.',
      notFoundTitle: 'Certificado No Encontrado',
      notFoundDesc: 'El código ingresado no corresponde a ningún certificado válido emitido por CINELAB.',
      errorConnect: 'Error al conectar con el servicio de validación.',
    },
    fr: {
      badge: 'Authenticité Publique',
      title: 'Vérificateur de Certificats CINELAB',
      desc: 'Service public officiel de vérification d\'authenticité destiné aux sociétés de production, comités de festivals et institutions.',
      inputLabel: 'Entrez le Code du Certificat :',
      placeholder: 'ex. : CNL-CERT-8910-4821',
      verifying: 'Vérification...',
      verifyBtn: 'Vérifier',
      testQuestion: 'Vous souhaitez tester un code existant ?',
      useDemoCode: 'Utiliser le Code Démo',
      validBadge: 'CERTIFICAT VALIDE ET AUTHENTIQUE',
      confirmedTitle: 'Enregistrement Confirmé dans le Système CINELAB',
      studentName: 'NOM DU DIPLÔMÉ :',
      training: 'FORMATION PROFESSIONNELLE :',
      trainingVal: 'Cinéma & Réalisation Audiovisuelle',
      workload: 'VOLUME HORAIRE :',
      hours: '180 Heures',
      finalAverage: 'MOYENNE GÉNÉRALE FINALE :',
      issuedAt: 'DATE DE DÉLIVRANCE :',
      regCode: 'CODE D\'ENREGISTREMENT :',
      disclaimer: 'Ce certificat atteste de la validation intégrale du programme académique, comprenant les 10 étapes formatives (90 jours), la réussite aux évaluations théoriques et pratiques sous la direction du Cinéaste Tony de Luc.',
      notFoundTitle: 'Certificat Non Trouvé',
      notFoundDesc: 'Le code saisi ne correspond à aucun certificat valide délivré par CINELAB.',
      errorConnect: 'Erreur lors de la connexion au validateur.',
    },
  }[language] || {
    badge: 'Autenticidade Pública',
    title: 'Validador de Certificados CINELAB',
    desc: 'Serviço público oficial de verificação de autenticidade para produtoras, comissões de editais, festivais e instituições.',
    inputLabel: 'Digite o Código do Certificado:',
    placeholder: 'ex: CNL-CERT-8910-4821',
    verifying: 'Verificando...',
    verifyBtn: 'Verificar',
    testQuestion: 'Deseja testar um código existente?',
    useDemoCode: 'Usar Código Demo',
    validBadge: 'CERTIFICADO VÁLIDO E AUTÊNTICO',
    confirmedTitle: 'Registro Confirmado no Sistema CINELAB',
    studentName: 'NOME DO DIPLOMADO:',
    training: 'FORMAÇÃO PROFISSIONAL:',
    trainingVal: 'Cinema & Realização Audiovisual',
    workload: 'CARGA HORÁRIA:',
    hours: '180 Horas',
    finalAverage: 'MÉDIA GERAL FINAL:',
    issuedAt: 'DATA DA EMISSÃO:',
    regCode: 'CÓDIGO DE REGISTRO:',
    disclaimer: 'Este certificado confere pleno cumprimento do programa acadêmico, incluindo as 10 etapas formativas (90 dias), aprovação nas avaliações teóricas e práticas, e cumprimento das atividades curriculares sob coordenação do Professor Cineasta Tony de Luc.',
    notFoundTitle: 'Certificado Não Encontrado',
    notFoundDesc: 'O código digitado não corresponde a nenhum certificado válido emitido pelo CINELAB.',
    errorConnect: 'Erro ao conectar ao validador.',
  };

  useEffect(() => {
    if (initialCode) {
      handleValidate(initialCode);
    }
  }, [initialCode]);

  const handleValidate = async (searchCode?: string) => {
    const query = (searchCode || code).trim();
    if (!query) return;

    try {
      setLoading(true);
      const res = await api.validateCertificate(query);
      setResult(res);
    } catch (err: any) {
      setResult({
        valid: false,
        message: err.message || tVal.errorConnect,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDemoTest = () => {
    const demoCode = 'CNL-CERT-8910-4821';
    setCode(demoCode);
    handleValidate(demoCode);
  };

  const formatDate = (isoString?: string) => {
    if (!isoString) return '';
    try {
      const locale = language === 'en' ? 'en-US' : language === 'es' ? 'es-ES' : language === 'fr' ? 'fr-FR' : 'pt-BR';
      return new Date(isoString).toLocaleDateString(locale, {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
      });
    } catch {
      return isoString;
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 text-neutral-200 space-y-10">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-mono font-medium uppercase tracking-wider">
          <ShieldCheck className="w-3.5 h-3.5" /> {tVal.badge}
        </div>
        <h1 className="text-3xl sm:text-4xl font-display font-extrabold text-white">
          {tVal.title}
        </h1>
        <p className="text-xs sm:text-sm text-neutral-300">
          {tVal.desc}
        </p>
      </div>

      {/* Search Input Box */}
      <div className="max-w-xl mx-auto bg-neutral-900 border border-neutral-800 rounded-3xl p-6 sm:p-8 space-y-4 shadow-xl">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleValidate();
          }}
          className="space-y-3"
        >
          <label className="block text-xs font-mono uppercase tracking-wider text-neutral-400">
            {tVal.inputLabel}
          </label>
          <div className="flex items-center gap-2">
            <input
              type="text"
              required
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder={tVal.placeholder}
              className="w-full px-4 py-3 bg-neutral-950 border border-neutral-700 rounded-xl text-white font-mono text-sm uppercase focus:outline-none focus:border-amber-500"
            />
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-3 bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold uppercase text-xs rounded-xl transition-all cursor-pointer shrink-0"
            >
              {loading ? tVal.verifying : tVal.verifyBtn}
            </button>
          </div>
        </form>

        <div className="pt-2 border-t border-neutral-800/80 flex items-center justify-between text-[11px] text-neutral-400 font-mono">
          <span>{tVal.testQuestion}</span>
          <button
            type="button"
            onClick={handleDemoTest}
            className="text-amber-400 hover:underline cursor-pointer font-bold"
          >
            {tVal.useDemoCode}
          </button>
        </div>
      </div>

      {/* Validation Result Box */}
      {result && (
        <div className="max-w-2xl mx-auto animate-fadeIn">
          {result.valid && result.certificate ? (
            <div className="p-8 rounded-3xl bg-neutral-900 border-2 border-emerald-500/60 shadow-2xl space-y-6">
              <div className="flex items-center gap-4 border-b border-neutral-800 pb-6">
                <div className="w-14 h-14 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <div>
                  <span className="text-xs font-mono font-bold uppercase text-emerald-400">
                    {tVal.validBadge}
                  </span>
                  <h3 className="text-xl font-bold font-display text-white">
                    {tVal.confirmedTitle}
                  </h3>
                </div>
              </div>

              <div className="space-y-3 font-mono text-xs">
                <div className="flex items-center justify-between p-3 rounded-xl bg-neutral-950 border border-neutral-800">
                  <span className="text-neutral-400">{tVal.studentName}</span>
                  <span className="text-white font-bold font-sans text-sm">
                    {result.certificate.studentName}
                  </span>
                </div>

                <div className="flex items-center justify-between p-3 rounded-xl bg-neutral-950 border border-neutral-800">
                  <span className="text-neutral-400">{tVal.training}</span>
                  <span className="text-amber-400 font-bold">
                    {tVal.trainingVal}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="p-3 rounded-xl bg-neutral-950 border border-neutral-800">
                    <span className="text-neutral-400 block mb-0.5">{tVal.workload}</span>
                    <span className="text-white font-bold">{tVal.hours}</span>
                  </div>
                  <div className="p-3 rounded-xl bg-neutral-950 border border-neutral-800">
                    <span className="text-neutral-400 block mb-0.5">{tVal.finalAverage}</span>
                    <span className="text-emerald-400 font-bold">
                      {result.certificate.finalAverage.toFixed(1)} / 10.0
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 rounded-xl bg-neutral-950 border border-neutral-800">
                  <span className="text-neutral-400">{tVal.issuedAt}</span>
                  <span className="text-white">{formatDate(result.certificate.issuedAt)}</span>
                </div>

                <div className="flex items-center justify-between p-3 rounded-xl bg-neutral-950 border border-neutral-800">
                  <span className="text-neutral-400">{tVal.regCode}</span>
                  <span className="text-amber-400 font-bold">
                    {result.certificate.validationCode}
                  </span>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-800/40 text-xs text-emerald-200 leading-relaxed font-sans">
                {tVal.disclaimer}
              </div>
            </div>
          ) : (
            <div className="p-8 rounded-3xl bg-neutral-900 border-2 border-red-800/60 shadow-2xl text-center space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-red-500/20 text-red-400 flex items-center justify-center mx-auto">
                <XCircle className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white">{tVal.notFoundTitle}</h3>
              <p className="text-xs text-neutral-400 max-w-md mx-auto">
                {result.message || tVal.notFoundDesc}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
