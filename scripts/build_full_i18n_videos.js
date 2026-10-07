import fs from 'fs';
import path from 'path';

const content = `import { Language } from './translations.js';
import { ApostilaExtraVideo } from '../types/index.js';

export interface ExtraVideosUiTranslations {
  sectionTitle: string;
  sectionSubtitle: string;
  sectionBadge: string;
  slot1Badge: string;
  slot2Badge: string;
  durationLabel: string;
  watchOnYoutube: string;
  integratedPlayer: string;
  cinemaQuality: string;
  professorNotesTitle: string;
  emptySlotTitle: (slot: number) => string;
  emptySlotAdminDesc: string;
  emptySlotStudentDesc: string;
  uploadFileBtn: string;
  uploadYoutubeBtn: string;
  editNotesTitle: string;
  notesPlaceholder: string;
  notesHelpText: string;
  cancelBtn: string;
  saveNotesBtn: string;
  savingBtn: string;
  editDetailsBtn: string;
  quickEditBtn: string;
  syncGithubBtn: string;
  syncingGithubBtn: string;
  successSync: string;
  readyBadge: string;
  pendingBadge: string;
  emptyNotesAdmin: string;
  emptyNotesStudent: string;
}

export const EXTRA_VIDEOS_UI_TRANSLATIONS: Record<Language, ExtraVideosUiTranslations> = {
  pt: {
    sectionTitle: 'Vídeos Extras de Estudo',
    sectionSubtitle: '2 Aulas Práticas & Análises Fílmicas Integradas',
    sectionBadge: '2 VÍDEOS EXTRAS',
    slot1Badge: 'LOCAL 01 • VÍDEO EXTRA DE ESTUDO',
    slot2Badge: 'LOCAL 02 • VÍDEO EXTRA DE ESTUDO',
    durationLabel: 'Duração:',
    watchOnYoutube: 'Assistir no YouTube',
    integratedPlayer: 'Reprodutor Integrado',
    cinemaQuality: '1080p Cinema HD',
    professorNotesTitle: 'ORIENTAÇÃO DO PROFESSOR & ORIENTAÇÃO AO ALUNO:',
    emptySlotTitle: (slot: number) => \`Local 0\${slot} reservado para Vídeo Extra\`,
    emptySlotAdminDesc: 'Escolha se deseja subir um arquivo de vídeo do seu computador (MP4) ou vincular diretamente pelo YouTube.',
    emptySlotStudentDesc: 'Este vídeo de estudo extra está sendo preparado pela equipe pedagógica do CINELAB.',
    uploadFileBtn: 'Subir Arquivo (MP4)',
    uploadYoutubeBtn: 'Vincular pelo YouTube',
    editNotesTitle: 'Escrever Orientação do Professor & Orientação ao Aluno:',
    notesPlaceholder: 'Escreva aqui a orientação personalizada do Professor Tony de Luc para este vídeo (ex: dicas de decupagem, o que prestar atenção, exercícios práticos)...',
    notesHelpText: 'Este texto aparecerá com destaque dourado para todos os alunos que assistirem a este vídeo.',
    cancelBtn: 'Cancelar',
    saveNotesBtn: 'Salvar Orientação',
    savingBtn: 'Salvando...',
    editDetailsBtn: 'Editar Detalhes do Vídeo',
    quickEditBtn: 'Trocar / Escrever Texto',
    syncGithubBtn: 'Sincronizar com Nuvem / Mobile',
    syncingGithubBtn: 'Sincronizando...',
    successSync: 'Vídeos extras sincronizados com sucesso!',
    readyBadge: 'PRONTO',
    pendingBadge: 'EM ABERTO',
    emptyNotesAdmin: 'Nenhuma orientação cadastrada ainda. Clique no botão "Trocar / Escrever Texto" acima para escrever as orientações para os alunos.',
    emptyNotesStudent: 'Assista a esta aula complementar e aplique os conceitos em seu projeto cinematográfico.',
  },
  en: {
    sectionTitle: 'Extra Study Videos',
    sectionSubtitle: '2 Practical Masterclasses & Film Analysis Case Studies',
    sectionBadge: '2 EXTRA VIDEOS',
    slot1Badge: 'SLOT 01 • EXTRA STUDY VIDEO',
    slot2Badge: 'SLOT 02 • EXTRA STUDY VIDEO',
    durationLabel: 'Duration:',
    watchOnYoutube: 'Watch on YouTube',
    integratedPlayer: 'Integrated Player',
    cinemaQuality: '1080p Cinema HD',
    professorNotesTitle: "PROFESSOR'S GUIDANCE & STUDENT STUDY GUIDELINES:",
    emptySlotTitle: (slot: number) => \`Slot 0\${slot} reserved for Extra Study Video\`,
    emptySlotAdminDesc: 'Choose whether to upload a video file from your computer (MP4) or link directly via YouTube.',
    emptySlotStudentDesc: 'This extra study video is being prepared by the CINELAB pedagogical team.',
    uploadFileBtn: 'Upload Video File (MP4)',
    uploadYoutubeBtn: 'Link via YouTube',
    editNotesTitle: "Write Professor's Guidance & Student Study Guidelines:",
    notesPlaceholder: 'Write personalized directing advice from Professor Tony de Luc for this video...',
    notesHelpText: 'This guidance will be highlighted in gold for all students watching this video.',
    cancelBtn: 'Cancel',
    saveNotesBtn: 'Save Guidance',
    savingBtn: 'Saving...',
    editDetailsBtn: 'Edit Video Details',
    quickEditBtn: 'Edit / Write Guidance',
    syncGithubBtn: 'Sync with Cloud / Mobile',
    syncingGithubBtn: 'Syncing...',
    successSync: 'Extra study videos synchronized successfully!',
    readyBadge: 'READY',
    pendingBadge: 'PENDING',
    emptyNotesAdmin: 'No guidance registered yet. Click the "Edit / Write Guidance" button above to write study advice for students.',
    emptyNotesStudent: 'Watch this complementary masterclass and apply these directing concepts to your film project.',
  },
  es: {
    sectionTitle: 'Videos Extras de Estudio',
    sectionSubtitle: '2 Clases Prácticas y Análisis Fílmicos Integrados',
    sectionBadge: '2 VIDEOS EXTRAS',
    slot1Badge: 'ESPACIO 01 • VIDEO EXTRA DE ESTUDIO',
    slot2Badge: 'ESPACIO 02 • VIDEO EXTRA DE ESTUDIO',
    durationLabel: 'Duración:',
    watchOnYoutube: 'Ver en YouTube',
    integratedPlayer: 'Reproductor Integrado',
    cinemaQuality: '1080p Cinema HD',
    professorNotesTitle: 'ORIENTACIÓN DEL PROFESOR Y GUÍA PARA EL ESTUDIANTE:',
    emptySlotTitle: (slot: number) => \`Espacio 0\${slot} reservado para Video Extra\`,
    emptySlotAdminDesc: 'Elige si deseas subir un archivo de video desde tu computadora (MP4) o enlazarlo desde YouTube.',
    emptySlotStudentDesc: 'Este video de estudio complementario está siendo preparado por el equipo pedagógico de CINELAB.',
    uploadFileBtn: 'Subir Archivo (MP4)',
    uploadYoutubeBtn: 'Enlazar por YouTube',
    editNotesTitle: 'Escribir Orientación del Profesor y Guía para el Estudiante:',
    notesPlaceholder: 'Escribe aquí la orientación personalizada del Profesor Tony de Luc para este video...',
    notesHelpText: 'Este texto aparecerá destacado en dorado para todos los alumnos que vean este video.',
    cancelBtn: 'Cancelar',
    saveNotesBtn: 'Guardar Orientación',
    savingBtn: 'Guardando...',
    editDetailsBtn: 'Editar Detalles del Video',
    quickEditBtn: 'Cambiar / Escribir Texto',
    syncGithubBtn: 'Sincronizar con Nube / Móvil',
    syncingGithubBtn: 'Sincronizando...',
    successSync: '¡Videos extras sincronizados con éxito!',
    readyBadge: 'LISTO',
    pendingBadge: 'PENDIENTE',
    emptyNotesAdmin: 'Ninguna orientación registrada aún. Haz clic en el botón "Cambiar / Escribir Texto" arriba para escribir la guía para los estudiantes.',
    emptyNotesStudent: 'Mira esta clase complementaria y aplica los conceptos en tu proyecto cinematográfico.',
  },
  fr: {
    sectionTitle: "Vidéos Extras d'Étude",
    sectionSubtitle: "2 Cours Pratiques & Études de Cas d'Analyse Filmique",
    sectionBadge: '2 VIDÉOS EXTRAS',
    slot1Badge: "EMPLACEMENT 01 • VIDÉO EXTRA D'ÉTUDE",
    slot2Badge: "EMPLACEMENT 02 • VIDÉO EXTRA D'ÉTUDE",
    durationLabel: 'Durée :',
    watchOnYoutube: 'Regarder sur YouTube',
    integratedPlayer: 'Lecteur Intégré',
    cinemaQuality: '1080p Cinéma HD',
    professorNotesTitle: "CONSEILS DU PROFESSEUR & GUIDE D'ÉTUDE POUR L'ÉLÈVE :",
    emptySlotTitle: (slot: number) => \`Emplacement 0\${slot} réservé pour Vidéo Extra\`,
    emptySlotAdminDesc: 'Choisissez de téléverser un fichier vidéo (MP4) ou de lier directement via YouTube.',
    emptySlotStudentDesc: "Cette vidéo d'étude est en cours de préparation par l'équipe pédagogique de CINELAB.",
    uploadFileBtn: 'Téléverser un Fichier (MP4)',
    uploadYoutubeBtn: 'Lier via YouTube',
    editNotesTitle: "Rédiger les Conseils du Professeur & Guide pour l'Élève :",
    notesPlaceholder: 'Rédigez ici les conseils de mise en scène du Professeur Tony de Luc pour cette vidéo...',
    notesHelpText: 'Ce texte apparaîtra surligné en doré pour tous les étudiants visionnant cette vidéo.',
    cancelBtn: 'Annuler',
    saveNotesBtn: 'Enregistrer les Conseils',
    savingBtn: 'Enregistrement...',
    editDetailsBtn: 'Modifier les Détails de la Vidéo',
    quickEditBtn: 'Modifier / Rédiger les Conseils',
    syncGithubBtn: 'Synchroniser avec le Cloud / Mobile',
    syncingGithubBtn: 'Synchronisation...',
    successSync: 'Vidéos extras synchronisées avec succès !',
    readyBadge: 'PRÊT',
    pendingBadge: 'EN ATTENTE',
    emptyNotesAdmin: 'Aucune orientation enregistrée pour le moment. Cliquez sur le bouton "Modifier / Rédiger les Conseils" ci-dessus pour rédiger les consignes pour les étudiants.',
    emptyNotesStudent: 'Regardez ce cours complémentaire et appliquez les concepts à votre projet cinématographique.',
  },
};

export interface CanonicalVideoTranslationItem {
  title: string;
  description: string;
  professorNotes: string;
}

export const CANONICAL_VIDEOS_TRANSLATIONS: Record<string, Record<Language, [CanonicalVideoTranslationItem, CanonicalVideoTranslationItem]>> = {
  'mod-1': {
    pt: [
      {
        title: "Vídeo Extra 01: Introdução ao Cinema e à Linguagem Audiovisual - O GAROTO - M- 1.1",
        description: "Observe principalmente:\\nexpressão • gestos • atuação • enquadramento • montagem • ritmo • emoção • narrativa visual.",
        professorNotes: "“Ao assistir a este filme, tente compreender a história antes mesmo de pensar nas palavras. Observe o rosto, o corpo e os gestos dos personagens. Perceba como Chaplin utiliza enquadramentos, montagem, ritmo e atuação para fazer você rir, se emocionar e compreender o que está acontecendo. Preste atenção também à relação entre os personagens e à maneira como cada imagem ajuda a contar a história. Pergunte a si mesmo: eu conseguiria entender essa cena apenas olhando para as imagens?”",
      },
      {
        title: "Vídeo Extra 02: Introdução ao Cinema e à Linguagem Audiovisual - TEMPOS MODERNOS - M- 1.2",
        description: "observe:\\nmovimento • montagem • ritmo • som • máquinas • enquadramento • atuação • significado.\\n\\n“Durante esta atividade, você não deve assistir aos filmes apenas como espectador. Assista como um futuro cineasta. Observe onde a câmera está, o que aparece dentro do quadro, como os personagens se movimentam, como as imagens são organizadas e como cada escolha interfere naquilo que você sente e compreende. Não existe apenas uma maneira de assistir a um filme. Existe a maneira de quem assiste e existe a maneira de quem aprende a fazer cinema.”",
        professorNotes: "“Neste filme, observe como o cinema utiliza imagens, movimentos, montagem e sons para transmitir ideias. Preste atenção às máquinas, aos trabalhadores, aos movimentos repetitivos e ao ritmo da fábrica. Observe como Chaplin coloca o personagem dentro desse ambiente e como a montagem cria relações entre pessoas e máquinas. Perceba também quando o som aparece e qual função ele exerce. Pergunte a si mesmo: como uma imagem pode transmitir uma ideia sem precisar explicá-la através de palavras?”",
      },
    ],
    en: [
      {
        title: "Extra Video 01: Introduction to Cinema & Visual Language - THE KID - M- 1.1",
        description: "Focus on:\\nfacial expression • gesture • physical performance • shot framing • editing • rhythm • emotional beats • visual narrative.",
        professorNotes: "“When watching this film, try to understand the narrative before even considering dialogue. Observe the face, body language, and gestures of the characters. Notice how Chaplin harnesses framing, cutting rhythm, and acting to make you laugh, feel moved, and comprehend every story beat. Ask yourself: could I follow this scene purely through images?”",
      },
      {
        title: "Extra Video 02: Introduction to Cinema & Visual Language - MODERN TIMES - M- 1.2",
        description: "Observe:\\nmovement • editing montage • tempo • sound design • machines • framing • performance • subtext.\\n\\n“Watch not merely as an audience member, but as a future director. Note camera placement, what enters the frame, and how visual choices sculpt what you feel.”",
        professorNotes: "“In this film, examine how cinema synthesizes imagery, physical motion, editing, and sound to transmit sociopolitical themes. Notice the machines, factory cadence, and how montage correlates people to gears. How does an image articulate an idea without requiring verbal exposition?”",
      },
    ],
    es: [
      {
        title: "Video Extra 01: Introducción al Cine y Lenguaje Audiovisual - EL CHICO (THE KID) - M- 1.1",
        description: "Observa principalmente:\\nexpresión facial • gestos • actuación física • encuadre • montaje • ritmo • emoción • narrativa visual.",
        professorNotes: "“Al ver esta película, intenta comprender la historia antes de pensar en las palabras. Observa el rostro, cuerpo y gestos de los personajes. Nota cómo Chaplin utiliza el encuadre, el ritmo de corte y la actuación para conmover y hacer reír. Pregúntate: ¿podría entender esta escena únicamente a través de las imágenes?”",
      },
      {
        title: "Video Extra 02: Introducción al Cine y Lenguaje Audiovisual - TIEMPOS MODERNOS - M- 1.2",
        description: "Observa:\\nmovimiento • montaje • ritmo • sonido • máquinas • encuadre • actuación • significado.\\n\\n“Mira esta obra como un futuro realizador cinematográfico. Presta atención a dónde se sitúa la cámara y cómo cada encuadre construye la narrativa visual.”",
        professorNotes: "“En esta película, observa cómo el cine utiliza imágenes, movimiento, montaje y sonido para transmitir ideas complejas. Presta atención al ritmo fabril y a la relación dialéctica entre el individuo y las máquinas.”",
      },
    ],
    fr: [
      {
        title: "Vidéo Extra 01 : Introduction au Cinéma & Langage Audiovisuel - LE GAMIN (THE KID) - M- 1.1",
        description: "Observez principalement :\\nexpression du visage • gestuelle • jeu d'acteur • cadrage • découpage • rythme • émotion • narration visuelle.",
        professorNotes: "« En regardant ce film, essayez de comprendre le récit par la pure puissance de l'image. Observez comment Chaplin orchestre le cadre, le découpage et le rythme pour faire rire et émouvoir sans un mot parlé. »",
      },
      {
        title: "Vidéo Extra 02 : Introduction au Cinéma & Langage Audiovisuel - LES TEMPS MODERNES - M- 1.2",
        description: "Observez :\\nmouvement • montage • cadence • conception sonore • machines • cadrage • mise en scène • sens dramatique.",
        professorNotes: "« Regardez ce chef-d'œuvre avec l'œil d'un réalisateur. Observez comment la caméra et le montage créent des analogies percutantes entre les ouvriers et les engrenages. »",
      },
    ],
  },
  'mod-2': {
    pt: [
      {
        title: "Vídeo Extra 01: História do Cinema - CHEGADA DO TREM - M- 2.1",
        description: "Observe principalmente:\\ncâmera • espaço • profundidade • movimento • realidade • enquadramento • pessoas • acontecimento.",
        professorNotes: "“Ao assistir a este filme, não procure uma história complexa. Observe o acontecimento. Perceba como a câmera registra um momento real, como as pessoas entram e saem do enquadramento e como o movimento da locomotiva cria uma sensação de profundidade e dinamismo. Lembre-se de que, para os primeiros espectadores, aquilo não era apenas uma imagem: era a própria ilusão da vida em movimento projetada em uma tela.”",
      },
      {
        title: "Vídeo Extra 02: História do Cinema - LE VOYAGE DANS LA LUNE - M- 2.2",
        description: "Observe:\\nA cenografia • atuação • figurino • ilusionismo • efeitos especiais • cortes • fantasia • composição visual.",
        professorNotes: "“Neste filme, observe como Georges Méliès transforma elementos do teatro, do ilusionismo e da fantasia em linguagem cinematográfica. Preste atenção ao uso dos truques de câmera, como a parada de cena para criar desaparecimentos e transformações. Perceba como cada plano funciona como um pequeno palco onde tudo é desenhado, pintado e coreografado para estimular a imaginação do espectador.”",
      },
    ],
    en: [
      {
        title: "Extra Video 01: Film History - ARRIVAL OF A TRAIN (LUMIÈRE) - M- 2.1",
        description: "Focus on:\\ncamera placement • dynamic depth • diagonal motion • historical reality • spatial framing • public reaction.",
        professorNotes: "“Do not seek an intricate story; witness the visual miracle. Observe the diagonal composition creating dramatic perspective, and realize that for 1895 spectators, this was the breathtaking birth of moving life upon a screen.”",
      },
      {
        title: "Extra Video 02: Film History - A TRIP TO THE MOON (MÉLIÈS) - M- 2.2",
        description: "Focus on:\\nscenography • theatrical acting • stage illusionism • in-camera stop substitution • sci-fi fantasy • visual composition.",
        professorNotes: "“Witness how Georges Méliès forged cinematic artifice. Observe jump cuts used as magical transformations and hand-painted sets structured as theatrical prosceniums to ignite audience wonder.”",
      },
    ],
    es: [
      {
        title: "Video Extra 01: Historia del Cine - LA LLEGADA DEL TREN - M- 2.1",
        description: "Observa:\\ncámara • profundidad espacial • perspectiva diagonal • realidad documental • composición del plano.",
        professorNotes: "“Observa el acontecimiento histórico: la locomotora avanzando en diagonal hacia el objetivo creando una sobrecogedora ilusión de profundidad y realismo para los primeros espectadores.”",
      },
      {
        title: "Video Extra 02: Historia del Cine - VIAJE A LA LUNA - M- 2.2",
        description: "Observa:\\nescenografía fantástica • trucos de cámara • cortes por sustitución • puesta en escena mágica • ilusión teatral.",
        professorNotes: "“Observa cómo Méliès inventa los efectos especiales cinematográficos mediante trucos de parada y decorados pintados a mano, transformando la realidad en fábula poética.”",
      },
    ],
    fr: [
      {
        title: "Vidéo Extra 01 : Histoire du Cinéma - L'ARRIVÉE D'UN TRAIN EN GARE (LUMIÈRE) - M- 2.1",
        description: "Observez :\\ncadrage diagonal • profondeur de champ • restitution du réel • mouvement cinétique • saisissement du public.",
        professorNotes: "« Observez la diagonale saisissante de la locomotive entrant en gare : c'est l'acte de naissance du cinéma où l'illusion du mouvement bouleverse à jamais la perception humaine. »",
      },
      {
        title: "Vidéo Extra 02 : Histoire du Cinéma - LE VOYAGE DANS LA LUNE (MÉLIÈS) - M- 2.2",
        description: "Observez :\\ndécors peints • trucages par substitution • féerie • illusionnisme théâtral • poésie visuelle.",
        professorNotes: "« Admirez comment Georges Méliès invente la fiction et le trucage par arrêt de caméra. Chaque tableau est un chef-d'œuvre de prestidigitation au service du rêve cosmique. »",
      },
    ],
  },
  'mod-3': {
    pt: [
      {
        title: "Vídeo Extra 01: Roteiro e Criação de Personagens - À PROCURA DA FELICIDADE - M- 3.1",
        description: "Observe:\\nProtagonista • Objetivo urgente • Conflito crescente • Ponto de virada • Subtexto • Motivação inabalável.",
        professorNotes: "“Ao assistir a este filme, observe como o roteirista constrói um objetivo claro e urgente, e como os obstáculos se tornam cada vez mais difíceis. O bom roteiro nasce dessa tensão constante entre o desejo do personagem e as dificuldades da realidade.”",
      },
      {
        title: "Vídeo Extra 02: Roteiro e Criação de Personagens - O AUTO DA COMPADECIDA - M- 3.2",
        description: "Observe:\\nDualidade dos personagens • Esperteza e humor • Ritmo dos diálogos • Cultura regional • Conflitos dramáticos.",
        professorNotes: "“Ao assistir a este filme, observe como os personagens são construídos através de suas dualidades. João Grilo e Chicó possuem personalidades muito diferentes, mas complementares através da inteligência e do diálogo.”",
      },
    ],
    en: [
      {
        title: "Extra Video 01: Screenwriting & Character Arc - THE PURSUIT OF HAPPYNESS - M- 3.1",
        description: "Focus on:\\nProtagonist motivation • Urgent dramatic goal • Escalating obstacles • Major plot turns • Subtext & emotional vulnerability.",
        professorNotes: "“Examine how the script constructs high emotional stakes and an uncompromising ticking clock. Dramatic tension emerges directly from the friction between character ambition and harsh circumstance.”",
      },
      {
        title: "Extra Video 02: Screenwriting & Character Arc - A DOG'S WILL - M- 3.2",
        description: "Focus on:\\nProtagonist duality • Witty survival instincts • Dialogue rhythm • Regional storytelling • Dramatic reversals.",
        professorNotes: "“Observe how complementary dual protagonists bring rhythm to comedic and dramatic beats. Notice how dialogue serves as both a weapon and a survival mechanism.”",
      },
    ],
    es: [
      {
        title: "Video Extra 01: Guion y Construcción de Personajes - EN BUSCA DE LA FELICIDAD - M- 3.1",
        description: "Observa:\\nObjetivo urgente del protagonista • Obstáculos crecientes • Puntos de giro • Subtexto • Motivación inquebrantable.",
        professorNotes: "“Analiza cómo el guionista mantiene la tensión dramática a través de metas claras y apuestas emocionales al límite.”",
      },
      {
        title: "Video Extra 02: Guion y Construcción de Personajes - EL AUTO DE LA COMPADECIDA - M- 3.2",
        description: "Observa:\\nDualidad de personajes complementarios • Picardía y humor • Ritmo del diálogo • Arquetipos y cultura popular.",
        professorNotes: "“Presta atención a la fuerza del diálogo y cómo cada personaje revela su visión del mundo a través de su propia cadencia verbal.”",
      },
    ],
    fr: [
      {
        title: "Vidéo Extra 01 : Scénario & Écriture de Personnages - À LA RECHERCHE DU BONHEUR - M- 3.1",
        description: "Observez :\\nObjectif vital du protagoniste • Escalade des obstacles • Points de bascule • Sous-texte • Résilience dramatique.",
        professorNotes: "« Observez la construction d'une trajectoire dramatique tendue où chaque victoire est immédiatement menacée par un nouvel enjeu réaliste. »",
      },
      {
        title: "Vidéo Extra 02 : Scénario & Écriture de Personnages - LE TESTAMENT DU CHIEN - M- 3.2",
        description: "Observez :\\nDualité clownesque et dramaturgie populaire • Rythme des répliques • Débrouillardise • Ironie et satire sociale.",
        professorNotes: "« Étudiez comment le dialogue devient l'arme principale des personnages pour déjouer les pièges du destin avec verve et truculence. »",
      },
    ],
  },
  'mod-4': {
    pt: [
      {
        title: "Vídeo Extra 01: Direção e Direção de Atores - O PAGADOR DE PROMESSAS - M- 4.1",
        description: "Observe a construção dos personagens, tom de voz, expressão corporal, silêncios, conflito e ocupação do espaço cênico.",
        professorNotes: "“Dirigir atores não significa dizer o que eles devem falar. O diretor precisa construir uma situação na qual o ator compreenda o objetivo do personagem e consiga expressá-lo organicamente.”",
      },
      {
        title: "Vídeo Extra 02: Direção e Direção de Atores - CENTRAL DO BRASIL - M- 4.2",
        description: "Observe a naturalidade da interpretação, a relação entre atores experientes e estreantes, silêncios e locações reais.",
        professorNotes: "“Observe a sutileza na relação entre Dora e Josué. Pequenos gestos e hesitações revelam muito mais do que longos diálogos expositivos.”",
      },
    ],
    en: [
      {
        title: "Extra Video 01: Directing Actors & Staging - THE GIVEN WORD - M- 4.1",
        description: "Focus on character construction, vocal cadence, physical posture, pauses, dramatic friction, and blocking.",
        professorNotes: "“Directing actors is about creating dramatic circumstances where the actor internalizes motivation and reacts authentically to physical stakes.”",
      },
      {
        title: "Extra Video 02: Directing Actors & Staging - CENTRAL STATION - M- 4.2",
        description: "Focus on organic performance, non-professional casting synergy, subtle subtext, glances, and authentic locations.",
        professorNotes: "“Notice how silence and micro-expressions carry the emotional weight between Dora and Josué, delivering profound emotional depth without over-explaining.”",
      },
    ],
    es: [
      {
        title: "Video Extra 01: Dirección y Dirección de Actores - EL PAGADOR DE PROMESAS - M- 4.1",
        description: "Observa la construcción de personajes, tono vocal, expresión corporal, silencios y tensión dramática en escena.",
        professorNotes: "“Dirigir actores consiste en guiar la motivación íntima para que la interpretación brote con verdad y potencia orgánica.”",
      },
      {
        title: "Video Extra 02: Dirección y Dirección de Actores - ESTACIÓN CENTRAL - M- 4.2",
        description: "Observa la naturalidad actoral, la química entre veteranos y noveles, miradas y rodaje en escenarios reales.",
        professorNotes: "“Presta atención a cómo los silencios compartidos revelan la paulatina transformación afectiva de los protagonistas.”",
      },
    ],
    fr: [
      {
        title: "Vidéo Extra 01 : Direction d'Acteurs & Mise en Scène - LA PAROLE DONNÉE - M- 4.1",
        description: "Observez l'incarnation des personnages, l'intonation, la posture corporelle, les silences et la gestion de l'espace.",
        professorNotes: "« Diriger des acteurs consiste à bâtir un univers émotionnel où chaque réaction corporelle découle naturellement des enjeux scéniques. »",
      },
      {
        title: "Vidéo Extra 02 : Direction d'Acteurs & Mise en Scène - CENTRAL DO BRASIL - M- 4.2",
        description: "Observez le naturel du jeu, la complicité entre actrice émérite et jeune novice, la pudeur des sentiments.",
        professorNotes: "« Remarquez la puissance des regards retenus et des hésitations qui expriment l'évolution subtile du lien entre Dora et Josué. »",
      },
    ],
  },
  'mod-5': {
    pt: [
      {
        title: "Vídeo Extra 01: Fotografia, Câmera e Iluminação - O GABINETE DO DR. CALIGARI - M- 5.1",
        description: "Observe enquadramento, sombras duras, geometria distorcida, contraste e atmosfera expressionista.",
        professorNotes: "“A fotografia cinematográfica não serve apenas para deixar a imagem bonita: ela constrói tensão, desequilíbrio e personalidade visual na narrativa.”",
      },
      {
        title: "Vídeo Extra 02: Fotografia, Câmera e Iluminação - A NOITE DOS MORTOS-VIVOS - M- 5.2",
        description: "Observe iluminação em alto contraste, planos fechados, luz diegética e economia inteligente de recursos.",
        professorNotes: "“Uma iluminação de baixo orçamento, quando bem pensada, torna-se uma ferramenta artística poderosa para gerar medo, claustrofobia e realismo.”",
      },
    ],
    en: [
      {
        title: "Extra Video 01: Cinematography & Lighting - THE CABINET OF DR. CALIGARI - M- 5.1",
        description: "Focus on framing, hard shadow lines, distorted geometry, chiaroscuro contrast, and expressionist atmosphere.",
        professorNotes: "“Cinematography is far more than pretty imagery: lighting and distortion externalize the psychological instability of the story.”",
      },
      {
        title: "Extra Video 02: Cinematography & Lighting - NIGHT OF THE LIVING DEAD - M- 5.2",
        description: "Focus on high-contrast B&W lighting, close-ups, practical light sources, and inventive low-budget techniques.",
        professorNotes: "“Notice how resourceful low-budget lighting creates unrelenting dread, claustrophobia, and raw cinematic realism.”",
      },
    ],
    es: [
      {
        title: "Video Extra 01: Fotografía, Cámara e Iluminación - EL GABINETE DEL DR. CALIGARI - M- 5.1",
        description: "Observa el encuadre expresionista, sombras pronunciadas, geometrías deformadas y contrastes visuales.",
        professorNotes: "“La fotografía cinematográfica construye estados psicológicos: sombras y distorsiones reflejan la locura interna del relato.”",
      },
      {
        title: "Video Extra 02: Fotografía, Cámara e Iluminación - LA NOCHE DE LOS MUERTOS VIVIENTES - M- 5.2",
        description: "Observa el alto contraste en blanco y negro, primeros planos asfixiantes y luces diegéticas prácticas.",
        professorNotes: "“La iluminación austera pero precisa se convierte en un arma dramática formidable para transmitir tensión claustrofóbica.”",
      },
    ],
    fr: [
      {
        title: "Vidéo Extra 01 : Image, Cadre & Lumière - LE CABINET DU DR. CALIGARI - M- 5.1",
        description: "Observez le cadrage expressionniste, les ombres tranchées, la perspective faussée et le clair-obscur graphique.",
        professorNotes: "« La photographie cinématographique traduit l'angoisse mentale des personnages à travers les distorsions d'ombre et de lumière. »",
      },
      {
        title: "Vidéo Extra 02 : Image, Cadre & Lumière - LA NUIT DES MORTS-VIVANTS - M- 5.2",
        description: "Observez le noir et blanc contrasté, les gros plans anxiogènes et l'utilisation ingénieuse d'éclairages pratiques.",
        professorNotes: "« Observez comment un éclairage modeste mais maîtrisé engendre une terreur viscérale et un réalisme percutant. »",
      },
    ],
  },
  'mod-6': {
    pt: [
      {
        title: "Vídeo Extra 01: Som e Trilha Sonora - O HOMEM QUE COPIAVA - M- 6.1",
        description: "Observe narração interna, sons cotidianos, foley, pausas reflexivas e integração entre trilha e imagem.",
        professorNotes: "“O som no cinema não serve apenas para acompanhar a imagem: ele revela pensamentos, memórias e ironias que a imagem não mostra.”",
      },
      {
        title: "Vídeo Extra 02: Som e Trilha Sonora - O SOM AO REDOR - M- 6.2",
        description: "Observe som ambiente, camadas sonoras fora de campo, ruídos cotidianos e construção de tensão pelo áudio.",
        professorNotes: "“O espaço cinematográfico também é construído pelo ouvido. Uma cena não precisa mostrar tudo para fazer o espectador pressentir o perigo.”",
      },
    ],
    en: [
      {
        title: "Extra Video 01: Sound Design & Score - THE MAN WHO COPIED - M- 6.1",
        description: "Focus on voiceover narration, atmospheric room tone, foley, acoustic rhythms, and musical irony.",
        professorNotes: "“Sound design in cinema does not merely accompany visuals: it expresses internal psychology and unspoken irony.”",
      },
      {
        title: "Extra Video 02: Sound Design & Score - NEIGHBORING SOUNDS - M- 6.2",
        description: "Focus on diegetic off-screen sound, ambient urban textures, subtle domestic tension, and immersive acoustic space.",
        professorNotes: "“Cinematic space is equally shaped by the ear. Off-screen audio can generate unbearable suspense without showing the threat.”",
      },
    ],
    es: [
      {
        title: "Video Extra 01: Sonido y Banda Sonora - EL HOMBRE QUE COPIABA - M- 6.1",
        description: "Observa la voz en off, sonidos cotidianos, foley y la sincronía entre ritmo sonoro e imagen.",
        professorNotes: "“El diseño sonoro desvela pensamientos íntimos y matices irónicos que la imagen sola no podría transmitir.”",
      },
      {
        title: "Video Extra 02: Sonido y Banda Sonora - EL SONIDO ALREDEDOR - M- 6.2",
        description: "Observa el sonido ambiente, ruidos fuera de campo, microtensiones cotidianas y espacialidad acústica.",
        professorNotes: "“El espacio fílmico se construye también a través del oído: un ruido lejano puede sembrar inquietud constante.”",
      },
    ],
    fr: [
      {
        title: "Vidéo Extra 01 : Son & Musique de Film - L'HOMME QUI PHOTOCOPIAIT - M- 6.1",
        description: "Observez la voix off subjective, les bruitages foley, les silences et l'adéquation du rythme sonore.",
        professorNotes: "« Le son au cinéma complète l'image en révélant les pensées secrètes et l'ironie sous-jacente du personnage. »",
      },
      {
        title: "Vidéo Extra 02 : Son & Musique de Film - LES BRUITS DE RECIFE - M- 6.2",
        description: "Observez les bruits hors-champ, la texture sonore urbaine, les sons du quotidien et la montée de la tension.",
        professorNotes: "« L'espace cinématographique s'écoute autant qu'il se regarde : une atmosphère sonore subtile installe le malaise sans artifice. »",
      },
    ],
  },
  'mod-7': {
    pt: [
      {
        title: "Vídeo Extra 01: Montagem e Pós-Produção - A GREVE - M- 7.1",
        description: "Observe cortes de atração, montagem paralela, justaposição metafórica, ritmo e associação dialética de imagens.",
        professorNotes: "“Montar é construir uma narrativa através da relação entre planos. A montagem cria ideias que nenhum plano possui isoladamente.”",
      },
      {
        title: "Vídeo Extra 02: Montagem e Pós-Produção - A GENERAL - M- 7.2",
        description: "Observe continuidade espacial, direção de movimento nos eixos, cortes no movimento e precisão do timing cômico.",
        professorNotes: "“A montagem clássica assegura clareza de ação e guia a atenção da plateia com rigor cirúrgico nas sequências de perseguição.”",
      },
    ],
    en: [
      {
        title: "Extra Video 01: Film Editing & Post-Production - STRIKE (EISENSTEIN) - M- 7.1",
        description: "Focus on intellectual montage, associative juxtaposition, graphic collision, tempo, and ideological visual metaphor.",
        professorNotes: "“Editing is the creation of meaning through the clash of adjacent frames. Collision generates concepts unreachable by isolated shots.”",
      },
      {
        title: "Extra Video 02: Film Editing & Post-Production - THE GENERAL (KEATON) - M- 7.2",
        description: "Focus on continuous spatial geography, match on action, directional screen axis, and razor-sharp comic timing.",
        professorNotes: "“Masterful continuity editing guarantees unbroken spatial awareness and fluid propulsion during complex kinetic stunts.”",
      },
    ],
    es: [
      {
        title: "Video Extra 01: Montaje y Posproducción - LA HUELGA (EISENSTEIN) - M- 7.1",
        description: "Observa el montaje de atracciones, choque de planos, metáforas visuales y ritmo dialéctico.",
        professorNotes: "“Editar no es solo unir escenas; es suscitar ideas y emociones nuevas mediante la yuxtaposición poética e intelectual.”",
      },
      {
        title: "Video Extra 02: Montaje y Posproducción - EL MAQUINISTA DE LA GENERAL - M- 7.2",
        description: "Observa el raccord de movimiento, claridad espacial, eje de acción y precisión del timing cómico.",
        professorNotes: "“El montaje invisible guía el ojo del público en medio de trepidantes persecuciones sin perder jamás la coherencia espacial.”",
      },
    ],
    fr: [
      {
        title: "Vidéo Extra 01 : Montage & Post-Production - LA GRÈVE (EISENSTEIN) - M- 7.1",
        description: "Observez le montage des attractions, la collision de plans, la métaphore filmique et la cadence révolutionnaire.",
        professorNotes: "« Monter, c'est susciter une étincelle de sens par le rapprochement de deux plans qu'aucun n'exprimait seul. »",
      },
      {
        title: "Vidéo Extra 02 : Montage & Post-Production - LE MÉCANICIEN DE LA « GENERAL » - M- 7.2",
        description: "Observez la continuité de l'axe, le raccord dans le mouvement, la lisibilité spatiale et le sens du timing comique.",
        professorNotes: "« Étudiez la rigueur géométrique du découpage qui rend chaque péripétie ferroviaire d'une fluidité exemplaire. »",
      },
    ],
  },
  'mod-8': {
    pt: [
      {
        title: "Vídeo Extra 01: Produção Executiva e Planejamento - BAILE PERFUMADO - M- 8.1",
        description: "Observe logística de filmagem externa, figurinos de época, gestão de locações e dimensão orçamentária.",
        professorNotes: "“A produção executiva transforma ideias artísticas em operações concretas, organizando recursos, pessoas, tempo e logística.”",
      },
      {
        title: "Vídeo Extra 02: Produção Executiva e Planejamento - CINEMA, ASPIRINAS E URUBUS - M- 8.2",
        description: "Observe planejamento de filmagem itinerante, transporte de equipe, continuidade em locações extremas e orçamento.",
        professorNotes: "“O olhar do produtor investiga o que foi necessário estruturar por trás das câmeras para viabilizar cada plano filmado.”",
      },
    ],
    en: [
      {
        title: "Extra Video 01: Executive Producing & Logistics - BAILE PERFUMADO - M- 8.1",
        description: "Focus on period production design, remote location logistics, costuming, scheduling, and budget allocation.",
        professorNotes: "“Executive producing transforms creative vision into disciplined execution, coordinating personnel, assets, schedules, and cash flow.”",
      },
      {
        title: "Extra Video 02: Executive Producing & Logistics - CINEMA, ASPIRINS AND VULTURES - M- 8.2",
        description: "Focus on road-movie logistics, remote crew transport, natural climate variables, and realistic contingency planning.",
        professorNotes: "“A true producer sees beyond the lens: evaluate what logistics and equipment were required to capture that scene in the wilderness.”",
      },
    ],
    es: [
      {
        title: "Video Extra 01: Producción Ejecutiva y Planificación - BAILE PERFUMADO - M- 8.1",
        description: "Observa la logística de rodaje en exteriores, ambientación de época, permisos y optimización presupuestaria.",
        professorNotes: "“La labor del productor convierte un concepto artístico en viabilidad financiera, coordinando equipo, tiempo y recursos.”",
      },
      {
        title: "Video Extra 02: Producción Ejecutiva y Planificación - CINEMA, ASPIRINAS Y BUITRES - M- 8.2",
        description: "Observa la producción itinerante, traslados en zonas remotas, condiciones climáticas y desglose de producción.",
        professorNotes: "“Aprende a desglosar una escena: ¿cuánto equipo y logística hicieron falta para filmar este plano bajo el sol del desierto?”",
      },
    ],
    fr: [
      {
        title: "Vidéo Extra 01 : Production Exécutive & Organisation - BAILE PERFUMADO - M- 8.1",
        description: "Observez la logistique d'époque, le repérage en extérieur, la régie générale et la planification budgétaire.",
        professorNotes: "« Le producteur exécutif matérialise la vision artistique en coordonnant les moyens financiers, humains et logistiques. »",
      },
      {
        title: "Vidéo Extra 02 : Production Exécutive & Organisation - CINÉMA, ASPIRINES ET VAUTOURS - M- 8.2",
        description: "Observez le tournage nomade, la gestion des déplacements en milieu hostile et l'anticipation des contraintes matérielles.",
        professorNotes: "« Développez l'œil du producteur : anticipez tout ce qui a dû être organisé en coulisses pour rendre chaque image possible. »",
      },
    ],
  },
  'mod-9': {
    pt: [
      {
        title: "Vídeo Extra 01: Distribuição, Festivais e Mercado Audiovisual - QUE HORAS ELA VOLTA? - M- 9.1",
        description: "Observe estratégia de festivais internacionais, apelo de mercado global, janelas de exibição e circulação cultural.",
        professorNotes: "“Produzir um bom filme é apenas metade da jornada. Saber posicioná-lo em festivais e mercados abre portas em escala mundial.”",
      },
      {
        title: "Vídeo Extra 02: Distribuição, Festivais e Mercado Audiovisual - COMO FUNCIONA A DISTRIBUIÇÃO (Insight) - M- 9.2",
        description: "Observe materiais promocionais, trailer, relação com distribuidoras, estratégia de lançamento e retorno comercial.",
        professorNotes: "“O realizador inteligente planeja a distribuição desde o desenvolvimento do roteiro, alinhando público-alvo e modelo de negócio.”",
      },
    ],
    en: [
      {
        title: "Extra Video 01: Distribution, Film Festivals & Market - THE SECOND MOTHER - M- 9.1",
        description: "Focus on international festival circuits, global audience crossover, release windows, and cultural resonance.",
        professorNotes: "“Crafting a compelling film is only the first chapter. Navigating premiere festivals and sales agents is what unlocks global audiences.”",
      },
      {
        title: "Extra Video 02: Distribution, Film Festivals & Market - HOW FILM DISTRIBUTION WORKS - M- 9.2",
        description: "Focus on distributor partnerships, marketing collateral, release strategies, and windowing agreements.",
        professorNotes: "“A savvy director envisions distribution from day one: identify your audience and theatrical or streaming trajectory early.”",
      },
    ],
    es: [
      {
        title: "Video Extra 01: Distribución, Festivales y Mercado - UNA SEGUNDA MADRE - M- 9.1",
        description: "Observa la trayectoria en festivales internacionales, resonancia universal, ventanas de exhibición y ventas.",
        professorNotes: "“Hacer una buena película es solo el primer paso: planear su circuito de exhibición internacional es clave para su trascendencia.”",
      },
      {
        title: "Video Extra 02: Distribución, Festivales y Mercado - CÓMO FUNCIONA LA DISTRIBUCIÓN - M- 9.2",
        description: "Observa la relación con distribuidores, preparación de trailers y materiales de venta y estrategias de estreno.",
        professorNotes: "“El realizador contemporáneo debe pensar en el modelo de distribución desde las fases tempranas de la escritura.”",
      },
    ],
    fr: [
      {
        title: "Vidéo Extra 01 : Distribution, Festivals & Marché - UNE SECONDE MÈRE - M- 9.1",
        description: "Observez le parcours en festivals de catégorie A, l'universalité du propos, les fenêtres d'exploitation et ventes internationales.",
        professorNotes: "« La réussite d'un film repose autant sur son authenticité que sur son positionnement stratégique sur le marché mondial. »",
      },
      {
        title: "Vidéo Extra 02 : Distribution, Festivals & Marché - COMMENT FONCTIONNE LA DISTRIBUTION - M- 9.2",
        description: "Observez les relations avec les distributeurs, l'élaboration du matériel promotionnel et le calendrier de sortie.",
        professorNotes: "« Pensez la diffusion dès le développement du projet : anticipez la rencontre entre l'œuvre et son public cible. »",
      },
    ],
  },
  'mod-10': {
    pt: [
      {
        title: "Vídeo Extra 01: Projeto Final - NAPO (Curta-Metragem) - M- 10.1",
        description: "Observe síntese narrativa, ausência de diálogos falados, força da direção de arte, trilha sonora e clímax emocional.",
        professorNotes: "“Neste projeto de conclusão, analise como todas as etapas do aprendizado cinematográfico convergem para criar uma narrativa pura e comovente.”",
      },
      {
        title: "Vídeo Extra 02: Projeto Final - HOJE EU QUERO VOLTAR SOZINHO (Curta-Metragem) - M- 10.2",
        description: "Observe direção de atores intimista, naturalidade dramática, eficiência de produção e repercussão mundial.",
        professorNotes: "“Um curta-metragem focado em conflitos humanos genuínos e executado com rigor técnico pode alcançar consagração internacional.”",
      },
    ],
    en: [
      {
        title: "Extra Video 01: Graduation Short Film - NAPO - M- 10.1",
        description: "Focus on visual storytelling without spoken dialogue, musical synthesis, art direction, and emotional climax.",
        professorNotes: "“Analyze how all disciplines of filmmaking unite to forge a poignant cinematic experience driven purely by image and sound.”",
      },
      {
        title: "Extra Video 02: Graduation Short Film - THE WAY HE LOOKS (SHORT) - M- 10.2",
        description: "Focus on intimate actor direction, natural pacing, production economy, and international festival acclaim.",
        professorNotes: "“Notice how genuine human resonance combined with clear directing craft creates a short film that touched audiences across the globe.”",
      },
    ],
    es: [
      {
        title: "Video Extra 01: Proyecto Final - NAPO (Cortometraje) - M- 10.1",
        description: "Observa la narrativa visual sin diálogos verbales, dirección de arte, banda sonora y culminación emocional.",
        professorNotes: "“Comprueba cómo todas las herramientas del lenguaje cinematográfico confluyen para forjar una historia inolvidable.”",
      },
      {
        title: "Video Extra 02: Proyecto Final - HOY QUIERO VOLVER SOLITO (Corto) - M- 10.2",
        description: "Observa la dirección actoral intimista, verosimilitud de las interpretaciones y economía eficaz de recursos.",
        professorNotes: "“Un cortometraje auténtico apoyado en una puesta en escena rigurosa tiene el poder de trascender fronteras culturales.”",
      },
    ],
    fr: [
      {
        title: "Vidéo Extra 01 : Projet de Fin d'Études - NAPO (Court-Métrage) - M- 10.1",
        description: "Observez la narration visuelle pure sans dialogue, l'alchimie sonore, la direction artistique et l'émotion finale.",
        professorNotes: "« Constatez l'aboutissement de toutes les compétences de réalisation : l'image et le son suffisent à toucher le cœur du spectateur. »",
      },
      {
        title: "Vidéo Extra 02 : Projet de Fin d'Études - AU PREMIER REGARD (Court-Métrage) - M- 10.2",
        description: "Observez la finesse du jeu d'acteurs, la douceur du cadre, l'économie de moyens et le rayonnement international.",
        professorNotes: "« Une histoire humaine sincère portée par une mise en scène délicate possède une portée cinématographique universelle. »",
      },
    ],
  },
  'bonus-1': {
    pt: [
      {
        title: "Vídeo Extra 01: Glossário de Planos - DECOUPAGEM E ENQUADRAMENTO PRÁTICO - B- 1.1",
        description: "Observe a escala de planos, planos gerais, médios, primeiros planos e movimentos de câmera no set.",
        professorNotes: "“Consulte este material complementar para dominar o vocabulário técnico de planos e guiar sua equipe com precisão visual.”",
      },
      {
        title: "Vídeo Extra 02: Glossário de Planos - MOVIMENTOS DE CÂMERA E LINGUAGEM - B- 1.2",
        description: "Observe panorâmicas, travellings, dolly shots e planos-sequência para dinamizar a cena.",
        professorNotes: "“Cada movimento de câmera deve ter uma motivação dramática: mova a câmera apenas quando a história exigir.”",
      },
    ],
    en: [
      {
        title: "Extra Video 01: Shot Scale Glossary - PRACTICAL DÉCOUPAGE & FRAMING - B- 1.1",
        description: "Focus on wide shots, medium shots, close-ups, extreme details, and camera axes on set.",
        professorNotes: "“Use this reference masterclass to master the technical taxonomy of shots and direct your cinematographer with clarity.”",
      },
      {
        title: "Extra Video 02: Shot Scale Glossary - CAMERA MOVEMENT & VISUAL SYNTAX - B- 1.2",
        description: "Focus on pans, tilts, tracking shots, dolly moves, and long takes that elevate scene rhythm.",
        professorNotes: "“Every camera movement must carry psychological intent: move the frame only when the emotion of the character commands it.”",
      },
    ],
    es: [
      {
        title: "Video Extra 01: Glosario de Planos - DECOUPAJE Y ENCUADRE PRÁCTICO - B- 1.1",
        description: "Observa planos generales, planos medios, primeros planos y ejes de cámara en el set.",
        professorNotes: "“Domina la escala técnica de planos para comunicarte con precisión inequívoca con tu director de fotografía.”",
      },
      {
        title: "Video Extra 02: Glosario de Planos - MOVIMIENTOS DE CÁMARA Y LENGUAJE - B- 1.2",
        description: "Observa panorámicas, travellings, planos secuencia y dinamismo visual en el rodaje.",
        professorNotes: "“Todo movimiento de cámara requiere justificación narrativa: la cámara acompaña la emoción íntima de la escena.”",
      },
    ],
    fr: [
      {
        title: "Vidéo Extra 01 : Glossaire des Plans - DÉCOUPAGE TECHNIQUE & CADRAGE - B- 1.1",
        description: "Observez les plans larges, plans moyens, gros plans, inserts et respect de la ligne d'axe.",
        professorNotes: "« Maîtrisez l'échelle des plans pour dialoguer avec exactitude avec votre chef opérateur sur le plateau. »",
      },
      {
        title: "Vidéo Extra 02 : Glossaire des Plans - MOUVEMENTS D'APPAREIL & GRAMMAIRE - B- 1.2",
        description: "Observez panoramiques, travellings, plans-séquences et respiration cinétique du cadre.",
        professorNotes: "« Tout déplacement de caméra doit avoir un dessein dramatique : bougez l'appareil uniquement lorsque l'action l'exige. »",
      },
    ],
  },
  'bonus-2': {
    pt: [
      {
        title: "Vídeo Extra 01: Glossário de Roteiro - ESTRUTURA DRAMÁTICA E PREMISSA - B- 2.1",
        description: "Observe a construção de loglines, argumentos, pontos de virada e a jornada transformadora do protagonista.",
        professorNotes: "“Utilize este guia para afiar seus diálogos e estruturar tramas sólidas com premissas dramáticas irresistíveis.”",
      },
      {
        title: "Vídeo Extra 02: Glossário de Roteiro - CONFLITO, SUBTEXTO E DIÁLOGOS - B- 2.2",
        description: "Observe como criar subtexto nas entrelinhas e evitar falas expositivas nas cenas.",
        professorNotes: "“Bons roteiros revelam intenções através de ações e reações, e nunca entregando todas as respostas mastigadas.”",
      },
    ],
    en: [
      {
        title: "Extra Video 01: Screenplay Glossary - DRAMATIC STRUCTURE & PREMISE - B- 2.1",
        description: "Focus on loglines, character arcs, incisive dramatic beats, and pivotal plot points.",
        professorNotes: "“Use this companion reference to sharpen dialogue and engineer resilient screenplays with unforgettable character stakes.”",
      },
      {
        title: "Extra Video 02: Screenplay Glossary - CONFLICT, SUBTEXT & DIALOGUE - B- 2.2",
        description: "Focus on subtext beneath dialogue, subtle tension, and eliminating expositional lines.",
        professorNotes: "“Compelling scripts dramatize conflict through action and subtext rather than explanatory speeches.”",
      },
    ],
    es: [
      {
        title: "Video Extra 01: Glosario de Guion - ESTRUCTURA DRAMÁTICA Y PREMISA - B- 2.1",
        description: "Observa la elaboración de premisas, puntos de giro, arcos de personajes y ritmo de la historia.",
        professorNotes: "“Aplica este compendio para construir guiones de impacto con personajes tridimensionales y objetivos urgentes.”",
      },
      {
        title: "Video Extra 02: Glosario de Guion - CONFLICTO, SUBTEXTO Y DIÁLOGOS - B- 2.2",
        description: "Observa cómo dotar de subtexto a las conversaciones evitando parlamentos redundantes.",
        professorNotes: "“El mejor diálogo cinematográfico es aquel que esconde la verdadera intención bajo una aparente charla cotidiana.”",
      },
    ],
    fr: [
      {
        title: "Vidéo Extra 01 : Glossaire du Scénario - STRUCTURE DRAMATIQUE & PRÉMISSE - B- 2.1",
        description: "Observez la construction de loglines, les nœuds dramatiques, les points de bascule et l'arc relationnel.",
        professorNotes: "« Appuyez-vous sur ce glossaire pour charpenter vos récits avec rigueur et créer des protagonistes mémorables. »",
      },
      {
        title: "Vidéo Extra 02 : Glossaire du Scénario - CONFLIT, SOUS-TEXTE & DIALOGUES - B- 2.2",
        description: "Observez l'art du non-dit, la tension sous-jacente et l'éradication des répliques purement explicatives.",
        professorNotes: "« Les dialogues percutants laissent deviner les sentiments profonds sans jamais les énoncer lourdement. »",
      },
    ],
  },
  'bonus-3': {
    pt: [
      {
        title: "Vídeo Extra 01: Análise Fílmica em 6 Camadas - NARRATIVA E PERSONAGEM - B- 3.1",
        description: "Observe a decupagem analítica em 6 camadas: desconstrução de cena, arquétipos, espaço e fotografia.",
        professorNotes: "“Aprenda a dissecar obras consagradas camada por camada para extrair lições práticas de direção para suas próprias criações.”",
      },
      {
        title: "Vídeo Extra 02: Análise Fílmica em 6 Camadas - ESPAÇO, SOM E MONTAGEM - B- 3.2",
        description: "Observe como som, montagem e espaço convergem para criar significados profundos na tela.",
        professorNotes: "“Analise como um cineasta: examine como cada escolha estética altera a percepção do espectador.”",
      },
    ],
    en: [
      {
        title: "Extra Video 01: 6-Layer Film Analysis - NARRATIVE & CHARACTER - B- 3.1",
        description: "Focus on 6-tier analytic methodology: scene deconstruction, character archetype, space, and cinematography.",
        professorNotes: "“Dissect cinematic masterpieces layer by layer to extract masterclass directing lessons for your personal films.”",
      },
      {
        title: "Extra Video 02: 6-Layer Film Analysis - SPACE, SOUND & EDITING - B- 3.2",
        description: "Focus on how acoustic geography, kinetic cutting, and architectural space converge into deeper meaning.",
        professorNotes: "“Watch as a filmmaker: inspect how aesthetic choices deliberately steer audience empathy.”",
      },
    ],
    es: [
      {
        title: "Video Extra 01: Análisis Fílmico en 6 Capas - NARRATIVA Y PERSONAJE - B- 3.1",
        description: "Observa la metodología en 6 capas: narrativa, caracterización, encuadre, iluminación y espacio.",
        professorNotes: "“Desmonta obras maestras capa por capa para incorporar recursos profesionales a tus propios rodajes.”",
      },
      {
        title: "Video Extra 02: Análisis Fílmico en 6 Capas - ESPACIO, SONIDO Y MONTAJE - B- 3.2",
        description: "Observa la sinergia entre espacio físico, diseño sonoro y ritmo de montaje para generar significado.",
        professorNotes: "“Analiza como un creador: observa cómo cada detalle formal condiciona la emoción del espectador.”",
      },
    ],
    fr: [
      {
        title: "Vidéo Extra 01 : Analyse Filmique en 6 Couches - RÉCIT & PERSONNAGE - B- 3.1",
        description: "Observez la méthode en 6 strates : dramaturgie, profil psychologique, cadre, lumière et mise en scène.",
        professorNotes: "« Démontez les grands films strate par strate pour en extraire des leçons de mise en scène immédiatement applicables. »",
      },
      {
        title: "Vidéo Extra 02 : Analyse Filmique en 6 Couches - ESPACE, SON & MONTAGE - B- 3.2",
        description: "Observez comment l'architecture sonore, le découpage et le cadre s'unissent pour magnifier le sens de la scène.",
        professorNotes: "« Analysez en réalisateur : découvrez comment chaque choix formel oriente subtilement le regard du spectateur. »",
      },
    ],
  },
};

/**
 * Translates an extra video object based on current UI language.
 */
export function getTranslatedExtraVideo(
  video: ApostilaExtraVideo,
  lang: Language,
  modKey: string | number,
  slot: number
): ApostilaExtraVideo {
  if (lang === 'pt') return video;

  let key = typeof modKey === 'string' ? modKey : \`mod-\${modKey}\`;
  if (!key.startsWith('mod-') && !key.startsWith('bonus-')) {
    key = \`mod-\${key}\`;
  }

  const pair = CANONICAL_VIDEOS_TRANSLATIONS[key]?.[lang] ||
               (key.startsWith('bonus-') ? CANONICAL_VIDEOS_TRANSLATIONS[\`mod-\${key.replace('bonus-', '')}\`]?.[lang] : null);
  if (!pair) return video;

  const canonTrans = slot === 1 ? pair[0] : pair[1];
  if (!canonTrans) return video;

  return {
    ...video,
    title: canonTrans.title || video.title,
    description: canonTrans.description || video.description,
    professorNotes: canonTrans.professorNotes || video.professorNotes,
  };
}
`;

fs.writeFileSync(path.resolve('src/i18n/extraVideosTranslations.ts'), content, 'utf8');
console.log('✓ Successfully wrote complete src/i18n/extraVideosTranslations.ts');
