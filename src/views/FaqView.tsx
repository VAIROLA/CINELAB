import React from 'react';
import { HelpCircle, ArrowRight } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext.js';

interface FaqViewProps {
  onNavigate: (route: string) => void;
}

export const FaqView: React.FC<FaqViewProps> = ({ onNavigate }) => {
  const { language } = useLanguage();

  const data = {
    pt: {
      badge: 'Dúvidas Frequentes',
      title: 'Perguntas Frequentes (FAQ)',
      subtitle: 'Tudo o que você precisa saber sobre o funcionamento do curso, cronograma de 3 meses, avaliações e certificação.',
      stillQuestions: 'Ainda tem dúvidas sobre o CINELAB?',
      stillQuestionsDesc: 'Nossa equipe pedagógica está à disposição para esclarecer qualquer ponto do cronograma.',
      contactBtn: 'Falar com a Coordenação',
      categories: [
        {
          title: 'Estrutura & Metodologia',
          items: [
            {
              q: 'Qual a duração total do curso?',
              a: 'O curso tem duração total de 3 meses (90 dias) e é distribuído em 10 etapas formativas progressivas. A primeira etapa é de introdução em 1 semana (7 dias), e os módulos seguintes são distribuídos entre 8 e 10 dias conforme a densidade de cada matéria técnica e prática.',
            },
            {
              q: 'Por que não posso avançar para a próxima apostila antes do prazo programado?',
              a: 'A regra soberana do CINELAB respeita a maturação de cada matéria: tempo necessário para assistir aos filmes recomendados da Cinemateca, ler os textos de apoio, realizar os exercícios práticos de set e responder à avaliação. Adiantar conteúdos superficialmente prejudica a formação.',
            },
            {
              q: 'Preciso ter equipamento profissional (câmera de cinema) para fazer o curso?',
              a: 'Não. Você pode iniciar seus exercícios utilizando até mesmo a câmera do seu smartphone. O foco central do CINELAB é a linguagem, o enquadramento, a iluminação, a decupagem e a direção de cena.',
            },
          ],
        },
        {
          title: 'Avaliações & Certificação',
          items: [
            {
              q: 'Quando as avaliações são liberadas?',
              a: 'A avaliação online de cada módulo é liberada no sistema na reta final de cada etapa (2 a 3 dias antes do término programado daquele módulo).',
            },
            {
              q: 'Qual a nota mínima para aprovação e certificado?',
              a: 'O aluno deve atingir média final igual ou superior a 7.0 (em escala de 0 a 10) no conjunto das avaliações do curso.',
            },
            {
              q: 'O certificado é reconhecido pelo mercado?',
              a: 'Sim, o certificado possui carga horária de 180 horas, código único de autenticação e página pública de validação oficial para produtoras e editais.',
            },
          ],
        },
        {
          title: 'Matrícula & Pagamento',
          items: [
            {
              q: 'Quais são as formas de pagamento?',
              a: 'Você pode pagar via PIX à vista ou no Cartão de Crédito em até 12 parcelas. O acesso é ativado imediatamente após a confirmação.',
            },
            {
              q: 'Onde encontro meu comprovante e número de matrícula?',
              a: 'O comprovante é enviado para seu e-mail cadastrado e fica gravado permanentemente na sua Área do Aluno com o código CNL-2026-XXXX.',
            },
          ],
        },
      ],
    },
    en: {
      badge: 'Common Questions',
      title: 'Frequently Asked Questions (FAQ)',
      subtitle: 'Everything you need to know about how the course works, the 3-month schedule, evaluations, and certification.',
      stillQuestions: 'Still have questions about CINELAB?',
      stillQuestionsDesc: 'Our pedagogical team is available to clarify any aspect of the study timeline and course mechanics.',
      contactBtn: 'Contact Course Coordination',
      categories: [
        {
          title: 'Structure & Methodology',
          items: [
            {
              q: 'What is the total duration of the course?',
              a: 'The course lasts 3 months (90 days) distributed across 10 progressive formative stages. Stage 1 is a 1-week introduction (7 days), and following modules span 8 to 10 days according to the technical and artistic complexity of the subject matter.',
            },
            {
              q: 'Why cannot I advance to the next handout before the programmed date?',
              a: 'CINELAB\'s sovereign calendar rule honors proper artistic maturation: time needed to watch recommended films in the Cinemateca, read supplementary texts, execute hands-on camera exercises, and take the exam. Skipping ahead damages educational depth.',
            },
            {
              q: 'Do I need high-end professional cinema cameras to take the course?',
              a: 'No. You can start shooting exercises using even your smartphone camera. The core essence of CINELAB is cinematic language, visual framing, lighting control, shot breakdowns, and scene direction.',
            },
          ],
        },
        {
          title: 'Evaluations & Certification',
          items: [
            {
              q: 'When are the stage evaluations unlocked?',
              a: 'The online evaluation for each module unlocks in the system during the final stretch of each stage (2 to 3 days prior to the stage\'s scheduled completion).',
            },
            {
              q: 'What is the minimum grade required for passing and certification?',
              a: 'Students must achieve an overall course grade average of 7.0 or higher (on a 0 to 10 scale) across all modular assessments.',
            },
            {
              q: 'Is the certificate officially recognized?',
              a: 'Yes, the certificate certifies 180 hours of rigorous training, includes a tamper-proof cryptographic validation code, and features a public online registry page for production studios and grant applications.',
            },
          ],
        },
        {
          title: 'Enrollment & Payment',
          items: [
            {
              q: 'What payment methods are supported?',
              a: 'You can complete payment via instant transfer (PIX/wire) or credit card in up to 12 interest-free installments. Account access is activated immediately upon payment verification.',
            },
            {
              q: 'Where can I find my enrollment receipt and ID?',
              a: 'Receipts are delivered to your registered email address and permanently accessible inside your Student Portal under registration code CNL-2026-XXXX.',
            },
          ],
        },
      ],
    },
    es: {
      badge: 'Dudas Frecuentes',
      title: 'Preguntas Frecuentes (FAQ)',
      subtitle: 'Todo lo que necesitas saber sobre el funcionamiento del curso, calendario de 3 meses, evaluaciones y certificación.',
      stillQuestions: '¿Aún tienes dudas sobre CINELAB?',
      stillQuestionsDesc: 'Nuestro equipo pedagógico está a tu disposición para aclarar cualquier aspecto del cronograma.',
      contactBtn: 'Contactar a la Coordinación',
      categories: [
        {
          title: 'Estructura y Metodología',
          items: [
            {
              q: '¿Cuál es la duración total del curso?',
              a: 'El curso dura un total de 3 meses (90 días) repartidos en 10 etapas formativas progresivas. La primera etapa es de introducción de 1 semana (7 días), y los siguientes módulos se distribuyen entre 8 y 10 días según su densidad técnica.',
            },
            {
              q: '¿Por qué no puedo adelantar el siguiente manual antes de la fecha?',
              a: 'La regla soberana de CINELAB respeta la asimilación del lenguaje fílmico: tiempo necesario para ver las películas de la Cinemateca, estudiar los textos, grabar las prácticas y realizar la evaluación.',
            },
            {
              q: '¿Necesito equipo cinematográfico profesional para tomar el curso?',
              a: 'No. Puedes iniciar tus prácticas incluso con la cámara de tu smartphone. El objetivo de CINELAB es el dominio del lenguaje visual, el encuadre, la luz, el decupaje y la dirección actoral.',
            },
          ],
        },
        {
          title: 'Evaluaciones y Certificación',
          items: [
            {
              q: '¿Cuándo se liberan las evaluaciones?',
              a: 'La evaluación en línea se activa en la recta final de cada etapa (de 2 a 3 días antes del cierre del módulo respectivo).',
            },
            {
              q: '¿Cuál es la calificación mínima de aprobación?',
              a: 'El alumno debe alcanzar un promedio final igual o superior a 7.0 (en escala de 0 a 10) en las evaluaciones del curso.',
            },
            {
              q: '¿El certificado cuenta con validación oficial?',
              a: 'Sí, acredita 180 horas lectivas, incluye código de autenticación único y página pública de validación para productoras y festivales.',
            },
          ],
        },
        {
          title: 'Matrícula y Pago',
          items: [
            {
              q: '¿Cuáles son los métodos de pago aceptados?',
              a: 'Puedes abonar de contado o con tarjeta de crédito en hasta 12 cuotas. El acceso al curso se activa de forma inmediata tras la confirmación.',
            },
            {
              q: '¿Dónde encuentro mi número de matrícula y comprobante?',
              a: 'Llega directamente a tu correo registrado y permanece disponible en tu Área del Alumno bajo el identificador CNL-2026-XXXX.',
            },
          ],
        },
      ],
    },
    fr: {
      badge: 'Questions Fréquentes',
      title: 'Foire Aux Questions (FAQ)',
      subtitle: 'Tout ce que vous devez savoir sur le fonctionnement du cours, le calendrier de 3 mois, les examens et la certification.',
      stillQuestions: 'Vous avez encore des questions sur CINELAB ?',
      stillQuestionsDesc: 'Notre équipe pédagogique est à votre disposition pour vous renseigner sur tous les détails du programme.',
      contactBtn: 'Contacter la Coordination',
      categories: [
        {
          title: 'Structure & Méthodologie',
          items: [
            {
              q: 'Quelle est la durée totale de la formation ?',
              a: 'La formation dure 3 mois (90 jours) répartis sur 10 étapes formatives progressives. L\'étape 1 correspond à 1 semaine d\'introduction (7 jours), et les modules suivants s\'étendent sur 8 à 10 jours selon leur densité technique et artistique.',
            },
            {
              q: 'Pourquoi ne puis-je pas débloquer le fascicule suivant à l\'avance ?',
              a: 'La règle souveraine de CINELAB impose le respect de l\'assimilation pédagogique : le temps d\'analyser les films de la Cinémathèque, d\'approfondir les lectures, de réaliser les travaux pratiques et de passer l\'examen.',
            },
            {
              q: 'Faut-il posséder du matériel de tournage professionnel ?',
              a: 'Non. Vous pouvez réaliser vos exercices avec la caméra de votre smartphone. Le cœur de l\'apprentissage porte sur la grammaire visuelle, le cadre, la lumière, le découpage et la direction d\'acteurs.',
            },
          ],
        },
        {
          title: 'Examens & Certification',
          items: [
            {
              q: 'Quand les examens sont-ils mis en ligne ?',
              a: 'L\'évaluation en ligne de chaque module s\'active en fin d\'étape (2 à 3 jours avant l\'échéance du module en cours).',
            },
            {
              q: 'Quelle note minimale est requise pour obtenir le certificat ?',
              a: 'L\'étudiant doit obtenir une moyenne générale égale ou supérieure à 7,0/10 sur l\'ensemble des évaluations du cursus.',
            },
            {
              q: 'Le certificat est-il officiellement reconnu ?',
              a: 'Oui, il certifie 180 heures de formation, intègre un code cryptographique unique et dispose d\'une page officielle de vérification publique pour les productions et diffuseurs.',
            },
          ],
        },
        {
          title: 'Inscription & Paiement',
          items: [
            {
              q: 'Quels sont les modes de règlement ?',
              a: 'Vous pouvez régler au comptant ou par carte bancaire en plusieurs mensualités. Vos accès sont activés immédiatement après validation.',
            },
            {
              q: 'Où retrouver mon reçu et mon numéro de matricule ?',
              a: 'Ils sont transmis à votre adresse e-mail et restent consultables en permanence sur votre Espace Étudiant sous le matricule CNL-2026-XXXX.',
            },
          ],
        },
      ],
    },
  };

  const cur = data[language] || data.pt;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12 text-neutral-200 space-y-12">
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-mono font-medium uppercase tracking-wider">
          <HelpCircle className="w-3.5 h-3.5" /> {cur.badge}
        </div>
        <h1 className="text-3xl sm:text-4xl font-display font-extrabold text-white">
          {cur.title}
        </h1>
        <p className="text-xs sm:text-sm text-neutral-300">
          {cur.subtitle}
        </p>
      </div>

      <div className="space-y-10">
        {cur.categories.map((cat, i) => (
          <div key={i} className="space-y-4">
            <h2 className="text-base font-bold font-display text-white border-b border-neutral-800 pb-2">
              {cat.title}
            </h2>
            <div className="space-y-3">
              {cat.items.map((item, j) => (
                <div key={j} className="p-5 rounded-2xl bg-neutral-900 border border-neutral-800 space-y-2">
                  <h3 className="text-sm font-bold text-white flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                    {item.q}
                  </h3>
                  <p className="text-xs text-neutral-300 leading-relaxed pl-3.5">
                    {item.a}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="text-center p-8 rounded-3xl bg-neutral-900 border border-neutral-800 space-y-4">
        <h3 className="text-lg font-bold text-white">{cur.stillQuestions}</h3>
        <p className="text-xs text-neutral-400 max-w-md mx-auto">
          {cur.stillQuestionsDesc}
        </p>
        <button
          onClick={() => onNavigate('contato')}
          className="px-6 py-2.5 bg-neutral-800 hover:bg-neutral-700 text-white rounded-xl text-xs font-semibold cursor-pointer transition-colors"
        >
          {cur.contactBtn}
        </button>
      </div>
    </div>
  );
};
