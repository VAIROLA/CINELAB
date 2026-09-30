import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2, Clock, User, ArrowRight, ExternalLink } from 'lucide-react';
import { CourseSettings } from '../types/index.js';
import { useLanguage } from '../i18n/LanguageContext.js';

interface ContactViewProps {
  settings?: CourseSettings | null;
  onNavigate?: (route: string) => void;
}

export const ContactView: React.FC<ContactViewProps> = ({ settings, onNavigate }) => {
  const { language } = useLanguage();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('Dúvida sobre o Curso');
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);

  const contactEmail = settings?.contactEmail || 'tonydeluc@tv-diversidade.com';
  const contactPhone = settings?.contactPhone || '+55 (21) 96672-5240';
  const supportHours = settings?.supportHours || 'Segunda a Sexta, das 09h às 19h (Atendimento Humanizado)';
  const supportResponse = settings?.supportResponseTime || 'Resposta em até 24 horas úteis';
  const contactAddress = settings?.contactAddress || settings?.companyAddress || 'Rio de Janeiro, RJ • Plataforma Digital Nacional';
  const directorName = settings?.tonyName || settings?.directorName || 'Professor Cineasta Tony de Luc';
  const defaultRoles = {
    pt: 'Diretor Geral & Coordenador Acadêmico',
    en: 'General Director & Academic Coordinator',
    es: 'Director General y Coordinador Académico',
    fr: 'Directeur Général & Coordinateur Pédagogique',
  };
  const directorRole = settings?.tonyRole || settings?.directorRole || defaultRoles[language] || defaultRoles.pt;
  const photoUrl =
    settings?.tonyPhotoUrl ||
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1000&q=80';

  const rawWa = settings?.whatsappNumber || contactPhone;
  const cleanWa = rawWa.replace(/\D/g, '');
  const waMsg = encodeURIComponent(
    settings?.whatsappDefaultMessage || 'Olá Tony de Luc, gostaria de tirar dúvidas sobre o CINELAB.'
  );

  const i18n = {
    pt: {
      badge: 'Atendimento & Suporte',
      title: 'Fale com o CINELAB',
      subtitle: 'Entre em contato com a coordenação acadêmica do Professor Tony de Luc ou com o suporte da plataforma.',
      channelsTitle: 'Canais Oficiais de Atendimento',
      officialEmail: 'E-mail Oficial:',
      phoneTitle: 'WhatsApp & Atendimento Telefônico:',
      waBtn: 'Conversar pelo WhatsApp',
      headquarters: 'Sede & Coordenação Geral:',
      responseTime: 'Prazo de Retorno:',
      tonyQuestion: 'Deseja conhecer a biografia, premiações, feitos, currículo e a filmografia completa do Diretor?',
      tonyBtn: 'Ver Perfil Completo de Tony de Luc',
      successMsg: 'Mensagem enviada com sucesso! Nossa equipe retornará em até 24h úteis.',
      fullName: 'Nome Completo',
      yourEmail: 'Seu E-mail',
      subject: 'Assunto',
      yourMessage: 'Mensagem',
      msgPlaceholder: 'Como podemos te ajudar?',
      sendBtn: 'Enviar Mensagem para a Coordenação',
      subjects: [
        'Dúvida sobre o Curso',
        'Suporte Técnico na Plataforma',
        'Matrícula e Pagamento PIX',
        'Falar com o Professor Tony de Luc',
        'Parcerias e Festivais',
      ],
    },
    en: {
      badge: 'Support & Assistance',
      title: 'Contact CINELAB',
      subtitle: 'Get in touch with Professor Tony de Luc\'s academic coordination or platform support.',
      channelsTitle: 'Official Contact Channels',
      officialEmail: 'Official E-mail:',
      phoneTitle: 'WhatsApp & Phone Inquiries:',
      waBtn: 'Chat on WhatsApp',
      headquarters: 'Headquarters & Coordination:',
      responseTime: 'Response Timeline:',
      tonyQuestion: 'Interested in the Director\'s biography, awards, curriculum, and complete filmography?',
      tonyBtn: 'View Full Tony de Luc Profile',
      successMsg: 'Message sent successfully! Our team will respond within 24 business hours.',
      fullName: 'Full Name',
      yourEmail: 'Your E-mail',
      subject: 'Subject',
      yourMessage: 'Message',
      msgPlaceholder: 'How can we help you?',
      sendBtn: 'Send Message to Coordination',
      subjects: [
        'Questions about the Course',
        'Technical Platform Support',
        'Enrollment & Payment',
        'Speak with Professor Tony de Luc',
        'Partnerships & Film Festivals',
      ],
    },
    es: {
      badge: 'Atención y Soporte',
      title: 'Contacta a CINELAB',
      subtitle: 'Comunícate con la coordinación académica del Profesor Tony de Luc o con soporte técnico.',
      channelsTitle: 'Canales Oficiales de Contacto',
      officialEmail: 'Correo Oficial:',
      phoneTitle: 'WhatsApp y Atención Telefónica:',
      waBtn: 'Chatear por WhatsApp',
      headquarters: 'Sede y Coordinación General:',
      responseTime: 'Tiempo de Respuesta:',
      tonyQuestion: '¿Deseas conocer la biografía, premios, trayectoria y filmografía completa del Director?',
      tonyBtn: 'Ver Perfil Completo de Tony de Luc',
      successMsg: '¡Mensaje enviado con éxito! Nuestro equipo responderá en un plazo máximo de 24 horas hábiles.',
      fullName: 'Nombre Completo',
      yourEmail: 'Tu Correo Electrónico',
      subject: 'Asunto',
      yourMessage: 'Mensaje',
      msgPlaceholder: '¿Cómo podemos ayudarte?',
      sendBtn: 'Enviar Mensaje a la Coordinación',
      subjects: [
        'Dudas sobre el Curso',
        'Soporte Técnico en la Plataforma',
        'Matrícula y Formas de Pago',
        'Hablar con el Profesor Tony de Luc',
        'Alianzas y Festivales de Cine',
      ],
    },
    fr: {
      badge: 'Assistance & Support',
      title: 'Contacter CINELAB',
      subtitle: 'Contactez la coordination académique du Professeur Tony de Luc ou le support de la plateforme.',
      channelsTitle: 'Canaux Officiels de Communication',
      officialEmail: 'Courriel Officiel :',
      phoneTitle: 'WhatsApp & Téléphone :',
      waBtn: 'Discuter sur WhatsApp',
      headquarters: 'Siège & Coordination Générale :',
      responseTime: 'Délai de Réponse :',
      tonyQuestion: 'Vous souhaitez découvrir la biographie, les récompenses et la filmographie complète du Réalisateur ?',
      tonyBtn: 'Consulter la Biographie de Tony de Luc',
      successMsg: 'Message envoyé avec succès ! Notre équipe vous répondra sous 24h ouvrées.',
      fullName: 'Nom Complet',
      yourEmail: 'Votre Adresse E-mail',
      subject: 'Objet',
      yourMessage: 'Message',
      msgPlaceholder: 'Comment pouvons-nous vous aider ?',
      sendBtn: 'Transmettre à la Coordination',
      subjects: [
        'Questions sur la Formation',
        'Assistance Technique sur la Plateforme',
        'Inscription et Modalités de Paiement',
        'Échanger avec le Professeur Tony de Luc',
        'Partenariats et Festivals',
      ],
    },
  };

  const tView = i18n[language] || i18n.pt;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setName('');
    setEmail('');
    setMessage('');
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12 text-neutral-200 space-y-12">
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-mono font-medium uppercase tracking-wider">
          <Mail className="w-3.5 h-3.5" /> {tView.badge}
        </div>
        <h1 className="text-3xl sm:text-4xl font-display font-extrabold text-white">
          {tView.title}
        </h1>
        <p className="text-xs sm:text-sm text-neutral-300">
          {tView.subtitle}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Info Column */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-6 rounded-3xl bg-neutral-900 border border-neutral-800 space-y-6">
            <h3 className="text-base font-bold font-display text-white border-b border-neutral-800 pb-3">
              {tView.channelsTitle}
            </h3>

            <div className="space-y-5 text-xs">
              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-white">{tView.officialEmail}</strong>
                  <a
                    href={`mailto:${contactEmail}`}
                    className="text-neutral-400 hover:text-amber-400 font-mono transition-colors"
                  >
                    {contactEmail}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <strong className="block text-white">{tView.phoneTitle}</strong>
                  <span className="text-neutral-300 font-mono block">{contactPhone}</span>
                  <div className="text-[11px] text-neutral-400 flex items-center gap-1">
                    <Clock className="w-3 h-3 text-amber-500" />
                    <span>{supportHours}</span>
                  </div>
                  {cleanWa && (
                    <a
                      href={`https://wa.me/${cleanWa}?text=${waMsg}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 mt-2 rounded-xl bg-emerald-950/80 hover:bg-emerald-900 border border-emerald-700 text-emerald-300 font-mono text-[11px] font-semibold transition-colors"
                    >
                      <span>{tView.waBtn}</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-white">{tView.headquarters}</strong>
                  <span className="text-neutral-400">{contactAddress}</span>
                </div>
              </div>

              <div className="pt-2 border-t border-neutral-800 text-[11px] text-neutral-400">
                <span className="text-amber-400 font-mono font-semibold">{tView.responseTime}</span>{' '}
                {supportResponse}
              </div>
            </div>
          </div>

          {/* Director Card Link */}
          <div className="p-6 rounded-3xl bg-neutral-900/90 border border-neutral-800 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-amber-500 shrink-0">
                <img
                  src={photoUrl}
                  alt={directorName}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h4 className="text-sm font-bold font-display text-white">{directorName}</h4>
                <p className="text-[11px] font-mono text-amber-400/90">{directorRole}</p>
              </div>
            </div>
            <p className="text-xs text-neutral-400 leading-relaxed">
              {tView.tonyQuestion}
            </p>
            {onNavigate && (
              <button
                onClick={() => onNavigate('tony-de-luc')}
                className="w-full py-2.5 px-4 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-amber-300 hover:text-white border border-neutral-700 text-xs font-mono font-medium flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <User className="w-3.5 h-3.5 text-amber-400" />
                <span>{tView.tonyBtn}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Form Column */}
        <div className="lg:col-span-7">
          <div className="p-8 rounded-3xl bg-neutral-900 border border-neutral-800 shadow-xl space-y-6">
            {sent && (
              <div className="p-4 rounded-xl bg-emerald-950/60 border border-emerald-800 text-emerald-300 text-xs flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>{tView.successMsg}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-mono text-neutral-400 mb-1">{tView.fullName}</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Seu nome"
                  className="w-full px-4 py-2.5 bg-neutral-950 border border-neutral-700 rounded-xl text-white text-xs focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-neutral-400 mb-1">{tView.yourEmail}</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="exemplo@email.com"
                  className="w-full px-4 py-2.5 bg-neutral-950 border border-neutral-700 rounded-xl text-white text-xs focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-neutral-400 mb-1">{tView.subject}</label>
                <select
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full px-4 py-2.5 bg-neutral-950 border border-neutral-700 rounded-xl text-white text-xs focus:outline-none focus:border-amber-500"
                >
                  {tView.subjects.map((sub, idx) => (
                    <option key={idx} value={sub}>{sub}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-mono text-neutral-400 mb-1">{tView.yourMessage}</label>
                <textarea
                  rows={4}
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder={tView.msgPlaceholder}
                  className="w-full p-4 bg-neutral-950 border border-neutral-700 rounded-xl text-white text-xs focus:outline-none focus:border-amber-500"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold uppercase rounded-xl text-xs transition-all cursor-pointer flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 active:scale-98"
              >
                <Send className="w-4 h-4" />
                <span>{tView.sendBtn}</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
