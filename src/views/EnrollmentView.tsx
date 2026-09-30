import React, { useState } from 'react';
import { CourseSettings, User, Enrollment } from '../types/index.js';
import { api, setAuthToken } from '../services/api.js';
import {
  CreditCard,
  QrCode,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  User as UserIcon,
  Copy,
  Sparkles,
  AlertCircle,
  ExternalLink,
} from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext.js';

interface EnrollmentViewProps {
  settings?: CourseSettings | null;
  onEnrollmentSuccess?: (user: User, enrollment: Enrollment) => void;
  onNavigate: (route: string) => void;
  currentUser?: User | null;
  user?: User | null;
  onOpenAuth?: (mode: 'login' | 'register') => void;
}

export const EnrollmentView: React.FC<EnrollmentViewProps> = ({
  settings,
  onEnrollmentSuccess,
  onNavigate,
  currentUser,
  user,
}) => {
  const { language } = useLanguage();
  const activeUser = currentUser || user || null;
  const price = settings?.coursePrice || 1000.00;
  const originalPrice = settings?.coursePriceOriginal || 2000.00;
  const maxInstallments = settings?.maxInstallments || 12;

  // Form states
  const [name, setName] = useState(activeUser?.name || '');
  const [email, setEmail] = useState(activeUser?.email || '');
  const [phone, setPhone] = useState(activeUser?.phone || '');
  const [document, setDocument] = useState(activeUser?.document || '');
  const [password, setPassword] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'pix' | 'credit_card' | 'debit_card'>('pix');
  const [installments, setInstallments] = useState(1);

  // Card mock fields (never stored in DB)
  const [cardNumber, setCardNumber] = useState('');
  const [cardHolder, setCardHolder] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');

  const [loading, setLoading] = useState(false);
  const [copiedPix, setCopiedPix] = useState(false);
  const [copiedPayload, setCopiedPayload] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successResult, setSuccessResult] = useState<{
    enrollmentNumber: string;
    message: string;
  } | null>(null);

  const pixKey = settings?.pixKey || 'financeiro@cinelab.edu.br';

  const i18n = {
    pt: {
      badge: 'Matrícula Online Integrada',
      title: 'Inscrição no Curso CINELAB',
      subtitle: 'Preencha seus dados para criar sua conta de aluno e escolha a forma de pagamento segura. A liberação do conteúdo ocorre imediatamente após a confirmação.',
      studentInfoTitle: '1. Dados do Aluno para a Matrícula',
      fullName: 'Nome Completo *',
      fullNamePlaceholder: 'Nome e Sobrenome para o Certificado',
      email: 'E-mail Cadastrado *',
      emailPlaceholder: 'seuemail@exemplo.com (para acesso ao curso)',
      phone: 'Telefone / WhatsApp *',
      phonePlaceholder: '(11) 98765-4321',
      document: 'CPF / Identificação Oficial *',
      documentPlaceholder: '000.000.000-00',
      passwordDefined: 'Senha de Acesso (já definida)',
      passwordCreate: 'Criar Senha de Acesso *',
      passwordPlaceholderDefined: '•••••••• (Sua senha atual permanecerá)',
      passwordPlaceholderCreate: 'Mínimo de 6 caracteres',
      passwordHint: 'Você usará este e-mail e senha para entrar no CINELAB após o pagamento.',
      paymentSectionTitle: '2. Pagamento do Curso',
      marketValue: 'Valor de Mercado:',
      specialDiscount: 'Desconto Especial (Promoção):',
      handoutsIncluded: '10 Apostilas Online + 3 Bônus',
      certificateIncluded: 'Certificado Oficial 180h',
      included: 'Incluso',
      promotionalPrice: 'Por Apenas:',
      pixTab: 'PIX Instantâneo',
      cardTab: 'Cartão (até 12x)',
      scanQr: 'Escaneie o QR Code no app do seu banco',
      pixKeyLabel: 'Chave PIX (E-mail):',
      copy: 'Copiar',
      copied: 'Copiado!',
      pixPayloadLabel: 'Código PIX Copia e Cola:',
      copyCode: 'Copiar Código',
      beneficiary: 'Beneficiário:',
      account: 'Conta:',
      installmentsLabel: 'Parcelamento',
      inCash: 'à vista',
      installmentOption: 'parcelado',
      cardNumberLabel: 'Número do Cartão',
      cardHolderLabel: 'Nome Impresso no Cartão',
      cardExpiryLabel: 'Validade',
      cvvLabel: 'CVV',
      cardSecureNotice: 'Checkout criptografado e tokenizado. Seus dados de cartão não são salvos em nosso banco.',
      submitBtnProcessing: 'Processando Matrícula...',
      submitBtn: 'Confirmar Matrícula & Ativar Acesso',
      successApproved: 'PAGAMENTO APROVADO • ACESSO ATIVADO',
      successTitle: 'MATRÍCULA CONFIRMADA COM SUCESSO!',
      successSubtitle: 'Seja muito bem-vindo ao CINELAB – Cinema & Audiovisual. Sua jornada de formação começou.',
      enrollmentNumLabel: 'NÚMERO DA MATRÍCULA:',
      statusLabel: 'STATUS:',
      statusActive: 'MATRÍCULA ATIVA',
      module1Label: 'MÓDULO 01:',
      module1Unlocked: 'LIBERADO IMEDIATAMENTE',
      emailReceiptLabel: 'RECIBO POR E-MAIL:',
      receiptNote: 'Enviamos o comprovante completo para seu e-mail cadastrado. Por questões de segurança, nenhuma senha é exibida em texto aberto.',
      gotoStudentArea: 'ACESSAR MINHA ÁREA DO ALUNO',
    },
    en: {
      badge: 'Integrated Online Enrollment',
      title: 'Enrollment in the CINELAB Course',
      subtitle: 'Complete your information to set up your student account and select a secure payment method. Content access is granted immediately after confirmation.',
      studentInfoTitle: '1. Student Registration Details',
      fullName: 'Full Name *',
      fullNamePlaceholder: 'Full name as it should appear on your Certificate',
      email: 'Email Address *',
      emailPlaceholder: 'youremail@example.com (for course access)',
      phone: 'Phone / WhatsApp *',
      phonePlaceholder: '+1 (555) 012-3456',
      document: 'National ID / Tax ID *',
      documentPlaceholder: 'Official Identification',
      passwordDefined: 'Account Password (already defined)',
      passwordCreate: 'Create Account Password *',
      passwordPlaceholderDefined: '•••••••• (Your current password will remain)',
      passwordPlaceholderCreate: 'Minimum 6 characters',
      passwordHint: 'You will use this email and password to log in to CINELAB after payment.',
      paymentSectionTitle: '2. Course Payment',
      marketValue: 'Market Value:',
      specialDiscount: 'Special Promotional Discount:',
      handoutsIncluded: '10 Online Handouts + 3 Bonus Units',
      certificateIncluded: 'Official 180-Hour Certificate',
      included: 'Included',
      promotionalPrice: 'Promotional Total Due:',
      pixTab: 'Instant Wire / PIX',
      cardTab: 'Credit Card (up to 12x)',
      scanQr: 'Scan QR code in your banking app',
      pixKeyLabel: 'Instant Payment Key (Email):',
      copy: 'Copy',
      copied: 'Copied!',
      pixPayloadLabel: 'Copy & Paste Transfer Code:',
      copyCode: 'Copy Code',
      beneficiary: 'Beneficiary:',
      account: 'Account:',
      installmentsLabel: 'Installment Plan',
      inCash: 'single payment',
      installmentOption: 'installments',
      cardNumberLabel: 'Card Number',
      cardHolderLabel: 'Cardholder Name',
      cardExpiryLabel: 'Expiry Date',
      cvvLabel: 'CVV / CVC',
      cardSecureNotice: 'Encrypted, tokenized checkout. Full card information is never saved in our database.',
      submitBtnProcessing: 'Processing Enrollment...',
      submitBtn: 'Confirm Enrollment & Activate Access',
      successApproved: 'PAYMENT APPROVED • ACCESS ACTIVATED',
      successTitle: 'ENROLLMENT SUCCESSFULLY CONFIRMED!',
      successSubtitle: 'Welcome to CINELAB – Cinema & Audiovisual. Your professional filmmaking journey starts now.',
      enrollmentNumLabel: 'ENROLLMENT ID:',
      statusLabel: 'STATUS:',
      statusActive: 'ACTIVE ENROLLMENT',
      module1Label: 'MODULE 01:',
      module1Unlocked: 'UNLOCKED IMMEDIATELY',
      emailReceiptLabel: 'RECEIPT BY EMAIL:',
      receiptNote: 'A detailed confirmation receipt was delivered to your registered email. For privacy, your password is never shown.',
      gotoStudentArea: 'ACCESS MY STUDENT PORTAL',
    },
    es: {
      badge: 'Matrícula en Línea Integrada',
      title: 'Inscripción en el Curso CINELAB',
      subtitle: 'Completa tus datos para crear tu cuenta de alumno y elige tu medio de pago seguro. El acceso a los contenidos se activa de forma inmediata.',
      studentInfoTitle: '1. Datos del Alumno para la Matrícula',
      fullName: 'Nombre Completo *',
      fullNamePlaceholder: 'Nombre y apellido como aparecerán en el Certificado',
      email: 'Correo Electrónico *',
      emailPlaceholder: 'tucorreo@ejemplo.com (para acceso al curso)',
      phone: 'Teléfono / WhatsApp *',
      phonePlaceholder: '+34 600 000 000',
      document: 'Documento de Identidad / DNI *',
      documentPlaceholder: 'Número de Identificación',
      passwordDefined: 'Contraseña (ya establecida)',
      passwordCreate: 'Crear Contraseña de Acceso *',
      passwordPlaceholderDefined: '•••••••• (Tu contraseña actual se mantendrá)',
      passwordPlaceholderCreate: 'Mínimo 6 caracteres',
      passwordHint: 'Utilizarás este correo y contraseña para acceder a CINELAB tras abonar.',
      paymentSectionTitle: '2. Pago del Curso',
      marketValue: 'Precio Oficial de Mercado:',
      specialDiscount: 'Descuento Especial Promocional:',
      handoutsIncluded: '10 Manuales Online + 3 Módulos Bonus',
      certificateIncluded: 'Certificado Oficial 180 Horas',
      included: 'Incluido',
      promotionalPrice: 'Importe Promocional a Pagar:',
      pixTab: 'Transferencia Inmediata',
      cardTab: 'Tarjeta (hasta 12 cuotas)',
      scanQr: 'Escanea el código QR desde tu app bancaria',
      pixKeyLabel: 'Clave de Transferencia (Email):',
      copy: 'Copiar',
      copied: '¡Copiado!',
      pixPayloadLabel: 'Código Copia y Pega:',
      copyCode: 'Copiar Código',
      beneficiary: 'Beneficiario:',
      account: 'Cuenta:',
      installmentsLabel: 'Plan de Cuotas',
      inCash: 'pago único',
      installmentOption: 'en cuotas',
      cardNumberLabel: 'Número de Tarjeta',
      cardHolderLabel: 'Titular de la Tarjeta',
      cardExpiryLabel: 'Vencimiento',
      cvvLabel: 'CVV / CVC',
      cardSecureNotice: 'Pasarela de pago cifrada y tokenizada. Los datos sensibles de tu tarjeta jamás se guardan en el servidor.',
      submitBtnProcessing: 'Procesando Matrícula...',
      submitBtn: 'Confirmar Matrícula y Activar Acceso',
      successApproved: 'PAGO APROBADO • ACCESO ACTIVADO',
      successTitle: '¡MATRÍCULA CONFIRMADA CON ÉXITO!',
      successSubtitle: 'Te damos la bienvenida a CINELAB – Cine y Audiovisual. Tu formación cinematográfica comienza hoy.',
      enrollmentNumLabel: 'NÚMERO DE MATRÍCULA:',
      statusLabel: 'ESTADO:',
      statusActive: 'MATRÍCULA ACTIVA',
      module1Label: 'MÓDULO 01:',
      module1Unlocked: 'HABILITADO DE INMEDIATO',
      emailReceiptLabel: 'COMPROBANTE POR CORREO:',
      receiptNote: 'Hemos enviado el comprobante oficial a tu correo electrónico. Por seguridad, no se muestran contraseñas.',
      gotoStudentArea: 'ENTRAR A MI ÁREA DE ALUMNO',
    },
    fr: {
      badge: 'Inscription en Ligne Intégrée',
      title: 'Inscription à la Formation CINELAB',
      subtitle: 'Renseignez vos informations personnelles pour créer votre compte étudiant et choisissez un mode de paiement sécurisé.',
      studentInfoTitle: '1. Informations de l\'Étudiant',
      fullName: 'Nom et Prénom *',
      fullNamePlaceholder: 'Nom complet pour votre Certificat',
      email: 'Adresse E-mail *',
      emailPlaceholder: 'votreemail@exemple.com (pour l\'accès)',
      phone: 'Téléphone / WhatsApp *',
      phonePlaceholder: '+33 6 00 00 00 00',
      document: 'Pièce d\'Identité / N° Fiscal *',
      documentPlaceholder: 'Numéro d\'identification officielle',
      passwordDefined: 'Mot de Passe (déjà configuré)',
      passwordCreate: 'Créer un Mot de Passe *',
      passwordPlaceholderDefined: '•••••••• (Votre mot de passe actuel restera actif)',
      passwordPlaceholderCreate: 'Minimum 6 caractères',
      passwordHint: 'Vous utiliserez cet e-mail et ce mot de passe pour vous connecter à CINELAB.',
      paymentSectionTitle: '2. Règlement de la Formation',
      marketValue: 'Tarif Standard Marché :',
      specialDiscount: 'Remise Promotionnelle :',
      handoutsIncluded: '10 Fascicules Numériques + 3 Bonus',
      certificateIncluded: 'Certificat Officiel 180h',
      included: 'Inclus',
      promotionalPrice: 'Tarif Promotionnel Appliqué :',
      pixTab: 'Virement Immédiat',
      cardTab: 'Carte Bancaire (jusqu\'à 12x)',
      scanQr: 'Scannez le QR Code dans votre application bancaire',
      pixKeyLabel: 'Clé de Transfert (E-mail) :',
      copy: 'Copier',
      copied: 'Copié !',
      pixPayloadLabel: 'Code Copier-Coller :',
      copyCode: 'Copier le Code',
      beneficiary: 'Bénéficiaire :',
      account: 'Compte :',
      installmentsLabel: 'Échéancier',
      inCash: 'au comptant',
      installmentOption: 'mensualités',
      cardNumberLabel: 'Numéro de Carte',
      cardHolderLabel: 'Nom du Porteur',
      cardExpiryLabel: 'Date d\'Expiration',
      cvvLabel: 'Cryptogramme (CVV)',
      cardSecureNotice: 'Paiement chiffré et sécurisé. Vos coordonnées bancaires ne sont jamais conservées sur nos serveurs.',
      submitBtnProcessing: 'Traitement de l\'Inscription...',
      submitBtn: 'Valider l\'Inscription & Activer l\'Accès',
      successApproved: 'PAIEMENT APPROUVÉ • ACCÈS ACTIVÉ',
      successTitle: 'INSCRIPTION CONFIRMÉE AVEC SUCCÈS !',
      successSubtitle: 'Bienvenue à CINELAB – Cinéma & Audiovisuel. Votre aventure cinématographique commence maintenant.',
      enrollmentNumLabel: 'MATRICULE ÉTUDIANT :',
      statusLabel: 'STATUT :',
      statusActive: 'INSCRIPTION ACTIVE',
      module1Label: 'MODULE 01 :',
      module1Unlocked: 'ACCESSIBLE IMMÉDIATEMENT',
      emailReceiptLabel: 'REÇU PAR E-MAIL :',
      receiptNote: 'Le justificatif complet vous a été transmis par courriel. Par sécurité, aucun mot de passe n\'apparaît en clair.',
      gotoStudentArea: 'ACCÉDER À MON ESPACE ÉTUDIANT',
    },
  };

  const cur = i18n[language] || i18n.pt;

  const handleCopyPix = () => {
    navigator.clipboard.writeText(pixKey);
    setCopiedPix(true);
    setTimeout(() => setCopiedPix(false), 2500);
  };

  const handleCopyPayload = () => {
    if (settings?.pixPayload) {
      navigator.clipboard.writeText(settings.pixPayload);
      setCopiedPayload(true);
      setTimeout(() => setCopiedPayload(false), 2500);
    }
  };

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setLoading(true);

    try {
      const res = await api.checkout({
        name,
        email,
        phone,
        document,
        password: password || 'aluno123',
        paymentMethod,
        installments: paymentMethod === 'credit_card' ? installments : 1,
        cardData:
          paymentMethod === 'credit_card'
            ? {
                number: cardNumber,
                holder: cardHolder,
                expiry: cardExpiry,
                cvv: cardCvv,
              }
            : undefined,
      });

      setAuthToken(res.token);
      setSuccessResult({
        enrollmentNumber: res.enrollment.enrollmentNumber,
        message: res.message,
      });
      if (onEnrollmentSuccess) {
        onEnrollmentSuccess(res.user, res.enrollment);
      }
    } catch (err: any) {
      setErrorMessage(err.message || 'Falha ao processar matrícula.');
    } finally {
      setLoading(false);
    }
  };

  if (successResult) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center animate-fadeIn text-neutral-200">
        <div className="p-8 sm:p-10 rounded-3xl bg-neutral-900 border-2 border-amber-500/50 shadow-2xl space-y-6">
          <div className="w-16 h-16 rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-8 h-8" />
          </div>

          <div>
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-emerald-400">
              {cur.successApproved}
            </span>
            <h1 className="text-2xl sm:text-3xl font-display font-extrabold text-white mt-1">
              {cur.successTitle}
            </h1>
            <p className="text-xs sm:text-sm text-neutral-300 mt-2">
              {cur.successSubtitle}
            </p>
          </div>

          {/* Student Badge */}
          <div className="p-6 rounded-2xl bg-[#0e1017] border border-neutral-800 text-left space-y-3 font-mono">
            <div className="flex items-center justify-between border-b border-neutral-800 pb-2 text-xs">
              <span className="text-neutral-400">{cur.enrollmentNumLabel}</span>
              <span className="text-amber-400 font-bold text-sm tracking-wider">
                {successResult.enrollmentNumber}
              </span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-neutral-400">{cur.statusLabel}</span>
              <span className="text-emerald-400 font-bold">{cur.statusActive}</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-neutral-400">{cur.module1Label}</span>
              <span className="text-white font-semibold">{cur.module1Unlocked}</span>
            </div>
            <div className="flex items-center justify-between text-xs pt-1 border-t border-neutral-800/80">
              <span className="text-neutral-500 text-[11px]">{cur.emailReceiptLabel}</span>
              <span className="text-neutral-300 text-[11px]">{email}</span>
            </div>
          </div>

          <p className="text-xs text-neutral-400 leading-relaxed max-w-md mx-auto">
            {cur.receiptNote}
          </p>

          <div className="pt-2">
            <button
              onClick={() => onNavigate('minha-area')}
              className="w-full py-4 bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold uppercase tracking-wider text-sm rounded-xl shadow-lg shadow-amber-500/20 transition-all cursor-pointer flex items-center justify-center gap-2 active:scale-98"
              id="goto-student-area-btn"
            >
              <span>{cur.gotoStudentArea}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 text-neutral-200">
      <div className="text-center max-w-2xl mx-auto mb-10 space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-mono font-medium uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5" /> {cur.badge}
        </div>
        <h1 className="text-3xl sm:text-4xl font-display font-extrabold text-white">
          {cur.title}
        </h1>
        <p className="text-xs sm:text-sm text-neutral-400">
          {cur.subtitle}
        </p>
      </div>

      {errorMessage && (
        <div className="mb-6 p-4 rounded-xl bg-red-950/50 border border-red-800/60 text-red-300 text-xs flex items-center gap-3">
          <AlertCircle className="w-5 h-5 shrink-0 text-red-400" />
          <span>{errorMessage}</span>
        </div>
      )}

      <form onSubmit={handleCheckout} className="space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left: Student Information */}
          <div className="lg:col-span-7 bg-neutral-900/70 border border-neutral-800 rounded-3xl p-6 sm:p-8 space-y-6">
            <h2 className="text-base font-bold text-white font-display flex items-center gap-2 border-b border-neutral-800 pb-3">
              <UserIcon className="w-4 h-4 text-amber-400" />
              {cur.studentInfoTitle}
            </h2>

            <div className="space-y-4 text-xs">
              <div>
                <label className="block text-neutral-400 mb-1 font-medium">{cur.fullName}</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={cur.fullNamePlaceholder}
                  className="w-full px-3.5 py-2.5 bg-neutral-900 border border-neutral-700 rounded-xl text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-neutral-400 mb-1 font-medium">{cur.email}</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={cur.emailPlaceholder}
                  className="w-full px-3.5 py-2.5 bg-neutral-900 border border-neutral-700 rounded-xl text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-neutral-400 mb-1 font-medium">{cur.phone}</label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder={cur.phonePlaceholder}
                    className="w-full px-3.5 py-2.5 bg-neutral-900 border border-neutral-700 rounded-xl text-white focus:outline-none focus:border-amber-500"
                  />
                </div>
                <div>
                  <label className="block text-neutral-400 mb-1 font-medium">{cur.document}</label>
                  <input
                    type="text"
                    required
                    value={document}
                    onChange={(e) => setDocument(e.target.value)}
                    placeholder={cur.documentPlaceholder}
                    className="w-full px-3.5 py-2.5 bg-neutral-900 border border-neutral-700 rounded-xl text-white focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-neutral-400 mb-1 font-medium">
                  {currentUser ? cur.passwordDefined : cur.passwordCreate}
                </label>
                <input
                  type="password"
                  required={!currentUser}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder={currentUser ? cur.passwordPlaceholderDefined : cur.passwordPlaceholderCreate}
                  className="w-full px-3.5 py-2.5 bg-neutral-900 border border-neutral-700 rounded-xl text-white focus:outline-none focus:border-amber-500"
                />
                <span className="text-[11px] text-neutral-500 mt-1 block">
                  {cur.passwordHint}
                </span>
              </div>
            </div>
          </div>

          {/* Right: Payment Method & Order Summary */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-neutral-900/70 border border-neutral-800 rounded-3xl p-6 sm:p-8 space-y-6">
              <h2 className="text-base font-bold text-white font-display flex items-center gap-2 border-b border-neutral-800 pb-3">
                <CreditCard className="w-4 h-4 text-amber-400" />
                {cur.paymentSectionTitle}
              </h2>

              {/* Course summary badge */}
              <div className="p-4 rounded-xl bg-[#0e1017] border border-neutral-800 text-xs space-y-2">
                <div className="flex items-center justify-between text-neutral-400">
                  <span>{cur.marketValue}</span>
                  <span className="text-neutral-500 line-through font-mono">
                    R$ {originalPrice.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </span>
                </div>
                <div className="flex items-center justify-between text-emerald-400 font-medium">
                  <span>{cur.specialDiscount}</span>
                  <span className="font-mono font-bold">
                    - R$ {(originalPrice - price).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </span>
                </div>
                <div className="flex items-center justify-between text-neutral-400">
                  <span>{cur.handoutsIncluded}</span>
                  <span className="text-emerald-400 font-mono">{cur.included}</span>
                </div>
                <div className="flex items-center justify-between text-neutral-400">
                  <span>{cur.certificateIncluded}</span>
                  <span className="text-emerald-400 font-mono">{cur.included}</span>
                </div>
                <div className="border-t border-neutral-800 pt-2 flex items-center justify-between font-bold text-white text-sm">
                  <span className="text-amber-300 font-mono uppercase tracking-wider">{cur.promotionalPrice}</span>
                  <span className="text-amber-400 text-lg font-display font-extrabold">
                    R$ {price.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </span>
                </div>
              </div>

              {/* Payment selector tabs */}
              <div className="grid grid-cols-2 gap-2 text-xs font-semibold">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('pix')}
                  className={`py-2.5 px-3 rounded-xl border flex items-center justify-center gap-2 cursor-pointer transition-all ${
                    paymentMethod === 'pix'
                      ? 'bg-amber-500 text-neutral-950 border-amber-400 font-bold shadow-md shadow-amber-500/20'
                      : 'bg-neutral-900 text-neutral-300 border-neutral-700 hover:bg-neutral-800'
                  }`}
                >
                  <QrCode className="w-4 h-4" />
                  <span>{cur.pixTab}</span>
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentMethod('credit_card')}
                  className={`py-2.5 px-3 rounded-xl border flex items-center justify-center gap-2 cursor-pointer transition-all ${
                    paymentMethod === 'credit_card'
                      ? 'bg-amber-500 text-neutral-950 border-amber-400 font-bold shadow-md shadow-amber-500/20'
                      : 'bg-neutral-900 text-neutral-300 border-neutral-700 hover:bg-neutral-800'
                  }`}
                >
                  <CreditCard className="w-4 h-4" />
                  <span>{cur.cardTab}</span>
                </button>
              </div>

              {/* PIX details view */}
              {paymentMethod === 'pix' && (
                <div className="p-4 rounded-2xl bg-neutral-900 border border-neutral-700/80 space-y-4 text-xs animate-fadeIn">
                  <div className="text-center space-y-2">
                    <div className="w-44 h-44 bg-white p-2.5 rounded-2xl mx-auto flex items-center justify-center shadow-xl border border-neutral-200">
                      {settings?.pixQrCodeUrl ? (
                        <img
                          src={settings.pixQrCodeUrl}
                          alt="QR Code PIX CINELAB"
                          className="w-full h-full object-contain rounded-lg"
                        />
                      ) : (
                        <img
                          src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(
                            settings?.pixPayload || pixKey
                          )}`}
                          alt="QR Code PIX CINELAB"
                          className="w-full h-full object-contain"
                        />
                      )}
                    </div>
                    <span className="text-[11px] text-neutral-400 block font-mono">
                      {cur.scanQr}
                    </span>
                  </div>

                  {/* PIX Key copy box */}
                  <div className="space-y-1">
                    <label className="text-[11px] text-neutral-400 font-medium">{cur.pixKeyLabel}</label>
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        readOnly
                        value={pixKey}
                        className="w-full px-3 py-2 bg-neutral-950 border border-neutral-700 rounded-lg text-amber-300 font-mono text-xs focus:outline-none"
                      />
                      <button
                        type="button"
                        onClick={handleCopyPix}
                        className="px-3 py-2 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-200 hover:text-white border border-neutral-700 shrink-0 flex items-center gap-1.5 cursor-pointer text-xs transition-colors"
                      >
                        <Copy className="w-3.5 h-3.5" />
                        <span>{copiedPix ? cur.copied : cur.copy}</span>
                      </button>
                    </div>
                  </div>

                  {/* PIX Copia e Cola */}
                  {settings?.pixPayload && (
                    <div className="space-y-1">
                      <label className="text-[11px] text-neutral-400 font-medium">{cur.pixPayloadLabel}</label>
                      <div className="flex items-center gap-2">
                        <input
                          type="text"
                          readOnly
                          value={settings.pixPayload}
                          className="w-full px-3 py-2 bg-neutral-950 border border-neutral-700 rounded-lg text-neutral-300 font-mono text-xs focus:outline-none truncate"
                        />
                        <button
                          type="button"
                          onClick={handleCopyPayload}
                          className="px-3 py-2 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 shrink-0 flex items-center gap-1.5 cursor-pointer text-xs font-semibold transition-colors"
                        >
                          <Copy className="w-3.5 h-3.5" />
                          <span>{copiedPayload ? cur.copied : cur.copyCode}</span>
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Bank info */}
                  <div className="p-3 rounded-lg bg-neutral-950 text-[11px] font-mono text-neutral-400 space-y-1">
                    <div>{cur.beneficiary} {settings?.pixBeneficiary || 'CINELAB Formação Audiovisual Ltda'}</div>
                    <div>{cur.account} {settings?.pixBank || 'Banco Inter (077)'}</div>
                  </div>
                </div>
              )}

              {/* Credit Card form view */}
              {paymentMethod === 'credit_card' && (
                <div className="p-4 rounded-2xl bg-neutral-900 border border-neutral-700/80 space-y-3.5 text-xs animate-fadeIn">
                  {settings?.cardPaymentLink && (
                    <div className="p-3.5 rounded-xl bg-gradient-to-r from-emerald-950/70 to-neutral-900 border border-emerald-500/40 space-y-2 mb-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-white flex items-center gap-1.5">
                          <CreditCard className="w-3.5 h-3.5 text-emerald-400" />
                          <span>Pagar com Cartão no PagBank Oficial</span>
                        </span>
                        <span className="text-[10px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-2 py-0.5 rounded-full font-mono">
                          100% Seguro
                        </span>
                      </div>
                      <p className="text-[11px] text-neutral-300 leading-relaxed">
                        Prefere pagar com cartão de crédito diretamente pelo ambiente seguro do PagBank? Clique no botão abaixo:
                      </p>
                      <a
                        href={settings.cardPaymentLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full py-2.5 px-4 bg-emerald-500 hover:bg-emerald-400 text-neutral-950 font-bold uppercase rounded-xl text-xs transition-all flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20"
                      >
                        <span>Abrir Pagamento PagBank (Até 12x)</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  )}

                  <div>
                    <label className="block text-neutral-400 mb-1">{cur.installmentsLabel}</label>
                    <select
                      value={installments}
                      onChange={(e) => setInstallments(Number(e.target.value))}
                      className="w-full px-3 py-2 bg-neutral-950 border border-neutral-700 rounded-lg text-white text-xs focus:outline-none focus:border-amber-500"
                    >
                      {Array.from({ length: maxInstallments }, (_, i) => i + 1).map((n) => {
                        const val = (price / n).toFixed(2).replace('.', ',');
                        return (
                          <option key={n} value={n}>
                            {n === 1
                              ? `1x de R$ ${val} (${cur.inCash})`
                              : `${n}x de R$ ${val} (${cur.installmentOption})`}
                          </option>
                        );
                      })}
                    </select>
                  </div>

                  <div>
                    <label className="block text-neutral-400 mb-1">{cur.cardNumberLabel}</label>
                    <input
                      type="text"
                      required={paymentMethod === 'credit_card'}
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      placeholder="4000 1234 5678 9010"
                      maxLength={19}
                      className="w-full px-3 py-2 bg-neutral-950 border border-neutral-700 rounded-lg text-white font-mono text-xs focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block text-neutral-400 mb-1">{cur.cardHolderLabel}</label>
                    <input
                      type="text"
                      required={paymentMethod === 'credit_card'}
                      value={cardHolder}
                      onChange={(e) => setCardHolder(e.target.value)}
                      placeholder="NOME COMO NO CARTÃO"
                      className="w-full px-3 py-2 bg-neutral-950 border border-neutral-700 rounded-lg text-white uppercase text-xs focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-neutral-400 mb-1">{cur.cardExpiryLabel}</label>
                      <input
                        type="text"
                        required={paymentMethod === 'credit_card'}
                        value={cardExpiry}
                        onChange={(e) => setCardExpiry(e.target.value)}
                        placeholder="MM/AA"
                        maxLength={5}
                        className="w-full px-3 py-2 bg-neutral-950 border border-neutral-700 rounded-lg text-white font-mono text-xs focus:outline-none focus:border-amber-500"
                      />
                    </div>
                    <div>
                      <label className="block text-neutral-400 mb-1">{cur.cvvLabel}</label>
                      <input
                        type="password"
                        required={paymentMethod === 'credit_card'}
                        value={cardCvv}
                        onChange={(e) => setCardCvv(e.target.value)}
                        placeholder="123"
                        maxLength={4}
                        className="w-full px-3 py-2 bg-neutral-950 border border-neutral-700 rounded-lg text-white font-mono text-xs focus:outline-none focus:border-amber-500"
                      />
                    </div>
                  </div>

                  <div className="text-[10px] text-neutral-500 flex items-center gap-1.5 pt-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                    <span>{cur.cardSecureNotice}</span>
                  </div>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 bg-amber-500 hover:bg-amber-400 disabled:opacity-50 text-neutral-950 font-extrabold uppercase tracking-wider text-xs sm:text-sm rounded-xl shadow-lg shadow-amber-500/20 transition-all cursor-pointer flex items-center justify-center gap-2 active:scale-98"
                id="submit-payment-btn"
              >
                {loading ? cur.submitBtnProcessing : cur.submitBtn}
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};
