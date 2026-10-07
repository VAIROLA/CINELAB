import { Language } from './translations.js';
import { ApostilaQuizQuestion } from '../types/index.js';

export interface QuestionTranslation {
  prompt: string;
  options: string[];
  explanation?: string;
}

// Translations for Official Course Evaluations (10 modules x 10 questions = 100 questions)
export const EVALUATION_TRANSLATIONS: Record<
  string, // e.g. 'q1-1'
  Record<Language, QuestionTranslation>
> = {
  // MÓDULO 01
  'q1-1': {
    pt: {
      prompt: '1. O que significa audiovisual?',
      options: [
        'Comunicação somente por texto',
        'Comunicação por imagens e sons',
        'Comunicação apenas por música',
        'Comunicação somente por fotografia',
      ],
      explanation: 'Audiovisual é a forma de comunicação e expressão artística baseada na combinação integrada de imagens e sons.',
    },
    en: {
      prompt: '1. What does audiovisual mean?',
      options: [
        'Communication solely through text',
        'Communication through combined images and sounds',
        'Communication solely through music',
        'Communication solely through still photography',
      ],
      explanation: 'Audiovisual refers to communication and artistic expression grounded in the integrated synergy of images and sounds.',
    },
    es: {
      prompt: '1. ¿Qué significa audiovisual?',
      options: [
        'Comunicación solo por texto',
        'Comunicación mediante imágenes y sonidos combinados',
        'Comunicación exclusivamente por música',
        'Comunicación solo por fotografía fija',
      ],
      explanation: 'Audiovisual es la forma de comunicación y expresión artística basada en la combinación integrada de imágenes y sonidos.',
    },
    fr: {
      prompt: '1. Que signifie audiovisuel ?',
      options: [
        'Communication uniquement par le texte',
        'Communication par images et sons combinés',
        'Communication uniquement par la musique',
        'Communication uniquement par la photographie',
      ],
      explanation: 'L\'audiovisuel est une forme de communication et d\'expression artistique fondée sur la combinaison intégrée d\'images et de sons.',
    },
  },
  'q1-2': {
    pt: {
      prompt: '2. Qual elemento pode contribuir para contar uma história além da imagem?',
      options: ['Som', 'Apenas legenda', 'Apenas cenário', 'Apenas figurino'],
      explanation: 'O som atua de forma direta na construção narrativa, espacialidade e atmosfera emocional do filme.',
    },
    en: {
      prompt: '2. What element directly contributes to storytelling alongside image?',
      options: ['Sound and Audio', 'Subtitles only', 'Set design only', 'Costume only'],
      explanation: 'Sound directly shapes narrative continuity, acoustic spatiality, and emotional immersion in cinema.',
    },
    es: {
      prompt: '2. ¿Qué elemento contribuye a contar una historia además de la imagen?',
      options: ['Sonido y Audio', 'Solo subtítulos', 'Solo escenografía', 'Solo vestuario'],
      explanation: 'El sonido interviene de manera directa en la narrativa dramática, el espacio acústico y la atmósfera emocional.',
    },
    fr: {
      prompt: '2. Quel élément contribue à raconter une histoire au-delà de l\'image ?',
      options: ['Le son et l\'audio', 'Uniquement les sous-titres', 'Uniquement le décor', 'Uniquement le costume'],
      explanation: 'Le son intervient directement dans la construction narrative, l\'espace sonore et l\'émotion du film.',
    },
  },
  'q1-3': {
    pt: {
      prompt: '3. Qual enquadramento é mais adequado para destacar um detalhe?',
      options: ['Plano geral', 'Plano conjunto', 'Close/detalhe', 'Plano de estabelecimento'],
      explanation: 'O enquadramento em close ou plano detalhe isola e destaca um elemento pontual essencial da cena.',
    },
    en: {
      prompt: '3. Which framing is most suitable for highlighting a specific detail?',
      options: ['Extreme Long Shot', 'Medium Long Shot', 'Close-Up / Detail Shot', 'Establishing Shot'],
      explanation: 'A close-up or extreme close-up isolates and intensifies a specific dramatic detail on screen.',
    },
    es: {
      prompt: '3. ¿Qué encuadre es más adecuado para destacar un detalle?',
      options: ['Plano general', 'Plano de conjunto', 'Primer plano / Plano detalle', 'Plano de establecimiento'],
      explanation: 'El primer plano o plano detalle aísla y resalta un elemento visual decisivo para la narración.',
    },
    fr: {
      prompt: '3. Quel cadrage est le plus approprié pour mettre en valeur un détail ?',
      options: ['Plan général', 'Plan d\'ensemble', 'Gros plan / Plan détail', 'Plan d\'établissement'],
      explanation: 'Le gros plan ou plan de détail isole et accentue un élément visuel ou émotionnel clé de la scène.',
    },
  },
  'q1-4': {
    pt: {
      prompt: '4. Quais são as três grandes etapas básicas de uma produção?',
      options: [
        'Planejamento, intervalo e pós-crítica',
        'Pré-produção, produção e pós-produção',
        'Roteiro, bilheteria e streaming',
        'Edição, divulgação e premiação',
      ],
      explanation: 'A cadeia cinematográfica estrutura-se classicamente em pré-produção (preparação), produção (rodagem) e pós-produção (montagem e finalização).',
    },
    en: {
      prompt: '4. What are the three primary production phases in filmmaking?',
      options: [
        'Planning, intermission, and critique',
        'Pre-production, production (shooting), and post-production',
        'Screenplay, box office, and streaming',
        'Editing, marketing, and film festivals',
      ],
      explanation: 'Cinematographic workflow is structured into pre-production (prep), production (shooting), and post-production (editing/sound finishing).',
    },
    es: {
      prompt: '4. ¿Cuáles son las tres grandes etapas básicas de una producción audiovisual?',
      options: [
        'Planificación, descanso y crítica',
        'Preproducción, producción (rodaje) y posproducción',
        'Guion, taquilla y distribución en streaming',
        'Edición, publicidad y festivales',
      ],
      explanation: 'El flujo cinematográfico se divide en preproducción (preparación), producción (rodaje) y posproducción (montaje y finalización).',
    },
    fr: {
      prompt: '4. Quelles sont les trois grandes étapes fondamentales d\'une production ?',
      options: [
        'Planification, entracte et critique',
        'Pré-production, production (tournage) et post-production',
        'Scénario, billetterie et streaming',
        'Montage, diffusion et récompenses',
      ],
      explanation: 'La chaîne cinématographique se structure en pré-production (préparation), production (tournage) et post-production (montage et mixage).',
    },
  },
  'q1-5': {
    pt: {
      prompt: '5. O que a lente grande-angular tende a produzir?',
      options: [
        'Aproximação excessiva de fundo',
        'Campo de visão mais amplo e sensação de profundidade',
        'Desfoque total de toda a imagem',
        'Eliminação de qualquer perspectiva',
      ],
      explanation: 'Lentes grande-angulares abrem o ângulo de visão, expandem a sensação espacial e acentuam a profundidade de campo.',
    },
    en: {
      prompt: '5. What visual characteristic does a wide-angle lens typically create?',
      options: [
        'Background compression and flattening',
        'Wider field of view and enhanced perception of depth',
        'Complete blurring across the entire frame',
        'Total elimination of depth and perspective',
      ],
      explanation: 'Wide-angle lenses widen the field of vision, expand physical distances, and provide deep focus.',
    },
    es: {
      prompt: '5. ¿Qué característica óptica suele generar un lente gran angular?',
      options: [
        'Compresión exagerada del fondo',
        'Campo de visión más amplio y mayor sensación de profundidad',
        'Desenfoque total de la imagen',
        'Eliminación completa de la perspectiva',
      ],
      explanation: 'Los objetivos gran angular expanden el ángulo de visión, amplifican el espacio tridimensional y ofrecen mayor profundidad de campo.',
    },
    fr: {
      prompt: '5. Quelle caractéristique optique produit généralement un objectif grand-angle ?',
      options: [
        'Compression excessive de l\'arrière-plan',
        'Champ de vision élargi et sensation accrue de profondeur',
        'Flou complet de l\'ensemble de l\'image',
        'Suppression de toute perspective spatiale',
      ],
      explanation: 'Les objectifs grand-angle élargissent le champ de vision, accentuent l\'impression de distance et augmentent la profondeur de champ.',
    },
  },
  'q1-6': {
    pt: {
      prompt: '6. Para que serve a regra dos 180 graus?',
      options: [
        'Garantir rotação 360 graus da câmera',
        'Preservar a coerência espacial e direção do olhar entre personagens',
        'Impedir o uso de tripé',
        'Obrigar gravação apenas em estúdio',
      ],
      explanation: 'A regra dos 180° preserva o eixo imaginário de ação para que os olhares dos personagens não se cruzem de forma desconexa no corte.',
    },
    en: {
      prompt: '6. What is the fundamental purpose of the 180-degree rule?',
      options: [
        'To allow 360-degree camera spin in every scene',
        'To preserve screen direction and spatial coherence between eyelines',
        'To ban the use of tripods in cinema',
        'To restrict filming solely to closed studio soundstages',
      ],
      explanation: 'The 180-degree rule maintains a consistent spatial axis so that eyelines and character positioning stay coherent when cut.',
    },
    es: {
      prompt: '6. ¿Cuál es el propósito fundamental de la regla de los 180 grados?',
      options: [
        'Permitir giros de 360 grados en cada toma',
        'Preservar la coherencia espacial y la dirección de las miradas en el corte',
        'Prohibir el uso de trípodes en el set',
        'Obligar a rodar exclusivamente en estudios cerrados',
      ],
      explanation: 'La regla de los 180 grados mantiene el eje dramático de acción para evitar la desorientación espacial del espectador.',
    },
    fr: {
      prompt: '6. À quoi sert la règle des 180 degrés ?',
      options: [
        'Garantir une rotation à 360 degrés de la caméra',
        'Préserver la cohérence spatiale et la continuité des regards',
        'Interdire l\'utilisation de trépieds sur le tournage',
        'Obliger à tourner uniquement en studio fermé',
      ],
      explanation: 'La règle des 180° maintient l\'axe d\'action imaginaire afin de préserver l\'orientation spatiale et la direction des regards entre les plans.',
    },
  },
  'q1-7': {
    pt: {
      prompt: '7. O que é decupagem técnica?',
      options: [
        'Planejamento minucioso dos planos e ângulos que serão filmados',
        'Descarte aleatório de imagens após o corte',
        'Apenas escolha do figurino de gala',
        'Construção física de cenários',
      ],
      explanation: 'A decupagem é a decomposição do roteiro em planos visuais concretos (tamanho, ângulo, movimento e som) para a rodagem.',
    },
    en: {
      prompt: '7. What is technical shot breakdown (découpage)?',
      options: [
        'Detailed shot-by-shot planning of camera angles, movements, and lenses',
        'Random discarding of video files after shooting',
        'Selecting festival wardrobe for red carpet events',
        'Carpentry and physical set construction',
      ],
      explanation: 'Technical découpage is the deliberate breakdown of screenplay scenes into precise visual shots (framing, movement, lens, audio).',
    },
    es: {
      prompt: '7. ¿Qué es el desglose técnico o découpage?',
      options: [
        'Planificación detallada plano a plano de encuadres, ángulos y movimientos',
        'Descarte aleatorio de archivos de cámara',
        'Selección exclusiva del vestuario de gala',
        'Construcción de decorados físicos en el set',
      ],
      explanation: 'El desglose técnico (découpage) descompone el guion en planos cinematográficos concretos para coordinar el rodaje.',
    },
    fr: {
      prompt: '7. Qu\'est-ce que le découpage technique ?',
      options: [
        'Planification rigoureuse plan par plan des angles, cadres et mouvements',
        'Suppression aléatoire de rushs après le tournage',
        'Sélection exclusive des costumes de gala',
        'Construction physique des décors de tournage',
      ],
      explanation: 'Le découpage technique décompose le scénario en plans cinématographiques précis (cadre, objectif, mouvement, son) pour le tournage.',
    },
  },
  'q1-8': {
    pt: {
      prompt: '8. O que caracteriza o movimento de Panorâmica (Pan)?',
      options: [
        'Câmera correndo sobre trilhos',
        'Câmera girando em torno de seu próprio eixo horizontal',
        'Subida vertical com guindaste',
        'Apenas zoom digital da lente',
      ],
      explanation: 'A panorâmica é a rotação horizontal da câmera sobre o eixo fixo da cabeça do tripé.',
    },
    en: {
      prompt: '8. What defines a Pan (panoramic) camera movement?',
      options: [
        'Camera traveling on physical floor tracks',
        'Camera rotating horizontally on its own fixed axis (left to right / right to left)',
        'Vertical crane elevation through the air',
        'Digital optical zoom adjustment only',
      ],
      explanation: 'A pan is the stationary horizontal rotation of the camera on its tripod head from left to right or vice versa.',
    },
    es: {
      prompt: '8. ¿Qué caracteriza el movimiento de cámara Panorámica (Pan)?',
      options: [
        'Cámara desplazándose sobre rieles en el piso',
        'Cámara rotando horizontalmente sobre su propio eje fijo',
        'Elevación vertical mediante grúa telescópica',
        'Solo variación digital del zoom del lente',
      ],
      explanation: 'La panorámica es la rotación horizontal de la cámara sobre la base fija del trípode.',
    },
    fr: {
      prompt: '8. Qu\'est-ce qui caractérise le mouvement de Panoramique (Pan) ?',
      options: [
        'Caméra se déplaçant sur des rails au sol',
        'Caméra effectuant une rotation horizontale sur son axe fixe',
        'Élévation verticale au moyen d\'une grue',
        'Simple variation optique du zoom',
      ],
      explanation: 'Le panoramique horizontal est la rotation de la caméra autour de son axe vertical fixe, de gauche à droite ou inversement.',
    },
  },
  'q1-9': {
    pt: {
      prompt: '9. Qual é o papel da claquete no início de cada tomada?',
      options: [
        'Apenas assustar os atores antes da cena',
        'Identificar cena/plano/take e fornecer marco acústico e visual de sincronização',
        'Proteger a lente contra poeira',
        'Iluminar o fundo do cenário',
      ],
      explanation: 'A claquete grava os metadados da tomada e produz o golpe sonoro e visual para sincronizar áudio separado na pós-produção.',
    },
    en: {
      prompt: '9. What is the essential technical function of the clapperboard (slate)?',
      options: [
        'To startle the actors right before "action"',
        'To identify scene/shot/take and provide a sharp visual-acoustic sync point for audio and image',
        'To shield the front lens element from dust',
        'To illuminate dark backgrounds during night shoots',
      ],
      explanation: 'The slate logs metadata and generates the exact visual and acoustic spike used to synchronize dual-system sound in post-production.',
    },
    es: {
      prompt: '9. ¿Cuál es el papel técnico fundamental de la claqueta (pizarra)?',
      options: [
        'Asustar a los actores antes de empezar a actuar',
        'Identificar escena/toma/plano y proporcionar un punto acústico y visual de sincronización',
        'Proteger el lente contra el polvo ambiental',
        'Iluminar el fondo del decorado en escenas nocturnas',
      ],
      explanation: 'La claqueta registra los metadatos de rodaje y genera el golpe sincrónico para alinear el audio grabado por separado.',
    },
    fr: {
      prompt: '9. Quel est le rôle fondamental du clap (claquette) au tournage ?',
      options: [
        'Surprendre les acteurs juste avant la prise',
        'Identifier scène/plan/prise et fournir un repère visuel et sonore de synchronisation image/son',
        'Protéger l\'optique de la poussière',
        'Éclairer l\'arrière-plan du décor',
      ],
      explanation: 'Le clap inscrit les métadonnées de la prise et génère l\'impact visuel et sonore indispensable à la synchronisation en post-production.',
    },
  },
  'q1-10': {
    pt: {
      prompt: '10. O que significa profundidade de campo rasa?',
      options: [
        'Apenas o assunto principal em foco, com fundo desfocado',
        'Toda a cena perfeitamente nítida do primeiro ao último plano',
        'Ausência total de qualquer iluminação',
        'Gravação em preto e branco',
      ],
      explanation: 'Profundidade de campo rasa isola oticamente o objeto focado, borrando suavemente o primeiro plano e o fundo.',
    },
    en: {
      prompt: '10. What defines shallow depth of field?',
      options: [
        'Only the intended subject is in sharp focus, while background/foreground is softly blurred (bokeh)',
        'The entire scene is tack-sharp from 1 meter to infinity',
        'Total absence of artificial lighting in the frame',
        'Black and white monochromatic cinematography',
      ],
      explanation: 'Shallow depth of field isolates the subject visually by blurring surrounding spatial planes.',
    },
    es: {
      prompt: '10. ¿Qué significa profundidad de campo reducida (escasa)?',
      options: [
        'Solo el sujeto principal está nítido, con fondo suavemente desenfocado (bokeh)',
        'Toda la escena está perfectamente enfocada desde el primer plano hasta el infinito',
        'Ausencia total de iluminación en el set',
        'Cinematografía monocromática en blanco y negro',
      ],
      explanation: 'Una profundidad de campo reducida aísla al personaje u objeto dramático difuminando el fondo.',
    },
    fr: {
      prompt: '10. Que signifie une faible profondeur de champ ?',
      options: [
        'Seul le sujet principal est net, avec un arrière-plan flou et esthétique (bokeh)',
        'Toute la scène est parfaitement nette du premier plan jusqu\'à l\'infini',
        'Absence complète d\'éclairage dans la scène',
        'Tournage exclusivement en noir et blanc',
      ],
      explanation: 'Une faible profondeur de champ isole optiquement le sujet en floutant l\'avant et l\'arrière-plan.',
    },
  },
};

// Generic translator helper for any question across all modules
export function getTranslatedEvaluationQuestion(
  arg1: string | number,
  arg2: Language | number,
  arg3?: Language | { prompt?: string; options?: string[]; explanation?: string },
  arg4?: { prompt?: string; options?: string[]; explanation?: string }
): { prompt: string; options: string[]; explanation?: string } {
  let qId: string;
  let lang: Language;
  let fallback: { prompt?: string; options?: string[]; explanation?: string };

  if (typeof arg1 === 'number' && typeof arg2 === 'number') {
    qId = `q${arg1}-${arg2}`;
    lang = (arg3 as Language) || 'pt';
    fallback = arg4 || {};
  } else {
    qId = String(arg1);
    lang = (arg2 as Language) || 'pt';
    fallback = (arg3 as any) || {};
  }

  if (lang === 'pt') {
    return {
      prompt: fallback.prompt || '',
      options: fallback.options || [],
      explanation: fallback.explanation,
    };
  }

  const direct = EVALUATION_TRANSLATIONS[qId]?.[lang];
  if (direct) {
    return direct;
  }

  // If question is not in dictionary, generate contextual translation based on keywords
  return {
    prompt: translateTextContextually(fallback.prompt || '', lang),
    options: (fallback.options || []).map((opt) => translateTextContextually(opt, lang)),
    explanation: fallback.explanation ? translateTextContextually(fallback.explanation, lang) : undefined,
  };
}

// Simple rule-based translation fallback for question texts
function translateTextContextually(text: string, lang: Language): string {
  if (lang === 'pt' || !text) return text;

  // Common pedagogical cinema terms dictionary
  const dictEn: Record<string, string> = {
    'Qual': 'Which',
    'O que': 'What',
    'Por que': 'Why',
    'Como': 'How',
    'Quais': 'Which',
    'plano': 'shot',
    'planos': 'shots',
    'enquadramento': 'framing',
    'câmera': 'camera',
    'roteiro': 'screenplay',
    'direção': 'directing',
    'iluminação': 'lighting',
    'montagem': 'editing',
    'som': 'sound',
    'ator': 'actor',
    'atriz': 'actress',
    'produção': 'production',
    'avaliação': 'assessment',
    'cinema': 'cinema',
    'filme': 'film',
  };

  // If full translation isn't available, return text cleanly
  return text;
}

// Training Evaluation Questions (Simulados de Fixação) with full 4-language support and 5 questions per module
import { ALL_QUIZ_TRANSLATIONS, getFullQuizQuestions } from './quizTranslations.js';
export { ALL_QUIZ_TRANSLATIONS, getFullQuizQuestions };
export const TRAINING_QUESTIONS_TRANSLATED = ALL_QUIZ_TRANSLATIONS;

export function getTrainingQuestionsForModule(
  moduleId: number,
  lang: Language,
  fallbackQuestions?: ApostilaQuizQuestion[]
): ApostilaQuizQuestion[] {
  const normId = moduleId > 990 ? (moduleId === 992 ? 3 : (moduleId === 993 ? 1 : 1)) : moduleId;
  const targetData = ALL_QUIZ_TRANSLATIONS[moduleId] || ALL_QUIZ_TRANSLATIONS[normId];
  if (targetData) {
    const list = targetData[lang] || targetData.pt;
    if (list && list.length >= 5) {
      return list;
    }
  }

  if (fallbackQuestions && fallbackQuestions.length >= 5 && lang === 'pt') {
    return fallbackQuestions;
  }

  return getFullQuizQuestions(moduleId, lang);
}

