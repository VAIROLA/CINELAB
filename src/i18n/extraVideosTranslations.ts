import { Language } from './translations.js';
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
}

export const EXTRA_VIDEOS_UI_TRANSLATIONS: Record<Language, ExtraVideosUiTranslations> = {
  pt: {
    sectionTitle: 'Vídeos Extras de Estudo',
    sectionSubtitle: '2 Aulas Práticas & Análises Fílmicas Integradas',
    sectionBadge: '2 VÍDEOS EXTRAS',
    slot1Badge: 'VÍDEO EXTRA 01 • ESTUDO PRÁTICO',
    slot2Badge: 'VÍDEO EXTRA 02 • ANÁLISE COMPLEMENTAR',
    durationLabel: 'Duração:',
    watchOnYoutube: 'Assistir no YouTube',
    integratedPlayer: 'Reprodutor Integrado',
    cinemaQuality: '1080p Cinema HD',
    professorNotesTitle: 'Orientação do Professor & Orientação ao Aluno:',
    emptySlotTitle: (slot: number) => `Local 0${slot} reservado para Vídeo Extra`,
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
    quickEditBtn: 'Trocar / Escrever',
    syncGithubBtn: 'Sincronizar com Nuvem / Mobile',
    syncingGithubBtn: 'Sincronizando...',
    successSync: 'Vídeos extras sincronizados com sucesso!',
  },
  en: {
    sectionTitle: 'Extra Study Videos',
    sectionSubtitle: '2 Practical Masterclasses & Film Analysis Case Studies',
    sectionBadge: '2 EXTRA VIDEOS',
    slot1Badge: 'EXTRA VIDEO 01 • PRACTICAL STUDY',
    slot2Badge: 'EXTRA VIDEO 02 • COMPLEMENTARY ANALYSIS',
    durationLabel: 'Duration:',
    watchOnYoutube: 'Watch on YouTube',
    integratedPlayer: 'Integrated Player',
    cinemaQuality: '1080p Cinema HD',
    professorNotesTitle: "Professor's Guidance & Student Study Guidelines:",
    emptySlotTitle: (slot: number) => `Slot 0${slot} reserved for Extra Study Video`,
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
    quickEditBtn: 'Edit / Write',
    syncGithubBtn: 'Sync with Cloud / Mobile',
    syncingGithubBtn: 'Syncing...',
    successSync: 'Extra study videos synchronized successfully!',
  },
  es: {
    sectionTitle: 'Videos Extras de Estudio',
    sectionSubtitle: '2 Clases Prácticas y Análisis Fílmicos Integrados',
    sectionBadge: '2 VIDEOS EXTRAS',
    slot1Badge: 'VIDEO EXTRA 01 • ESTUDIO PRÁCTICO',
    slot2Badge: 'VIDEO EXTRA 02 • ANÁLISIS COMPLEMENTARIO',
    durationLabel: 'Duración:',
    watchOnYoutube: 'Ver en YouTube',
    integratedPlayer: 'Reproductor Integrado',
    cinemaQuality: '1080p Cinema HD',
    professorNotesTitle: 'Orientación del Profesor y Guía para el Estudiante:',
    emptySlotTitle: (slot: number) => `Espacio 0${slot} reservado para Video Extra`,
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
    quickEditBtn: 'Cambiar / Escribir',
    syncGithubBtn: 'Sincronizar con Nube / Móvil',
    syncingGithubBtn: 'Sincronizando...',
    successSync: '¡Videos extras sincronizados con éxito!',
  },
  fr: {
    sectionTitle: 'Vidéos Extras d\'Étude',
    sectionSubtitle: '2 Cours Pratiques & Études de Cas d\'Analyse Filmique',
    sectionBadge: '2 VIDÉOS EXTRAS',
    slot1Badge: 'VIDÉO EXTRA 01 • ÉTUDE PRATIQUE',
    slot2Badge: 'VIDÉO EXTRA 02 • ANALYSE COMPLÉMENTAIRE',
    durationLabel: 'Durée :',
    watchOnYoutube: 'Regarder sur YouTube',
    integratedPlayer: 'Lecteur Intégré',
    cinemaQuality: '1080p Cinéma HD',
    professorNotesTitle: 'Conseils du Professeur & Guide d\'Étude pour l\'Élève :',
    emptySlotTitle: (slot: number) => `Emplacement 0${slot} réservé pour Vidéo Extra`,
    emptySlotAdminDesc: 'Choisissez de téléverser un fichier vidéo (MP4) ou de lier directement via YouTube.',
    emptySlotStudentDesc: 'Cette vidéo d\'étude est en cours de préparation par l\'équipe pédagogique de CINELAB.',
    uploadFileBtn: 'Téléverser un Fichier (MP4)',
    uploadYoutubeBtn: 'Lier via YouTube',
    editNotesTitle: 'Rédiger les Conseils du Professeur & Guide pour l\'Élève :',
    notesPlaceholder: 'Rédigez ici les conseils de mise en scène du Professeur Tony de Luc pour cette vidéo...',
    notesHelpText: 'Ce texte apparaîtra surligné en doré pour tous les étudiants visionnant cette vidéo.',
    cancelBtn: 'Annuler',
    saveNotesBtn: 'Enregistrer les Conseils',
    savingBtn: 'Enregistrement...',
    editDetailsBtn: 'Modifier les Détails de la Vidéo',
    quickEditBtn: 'Modifier / Écrire',
    syncGithubBtn: 'Synchroniser avec le Cloud / Mobile',
    syncingGithubBtn: 'Synchronisation...',
    successSync: 'Vidéos extras synchronisées avec succès !',
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
        description: "Observe principalmente:\nexpressão • gestos • atuação • enquadramento • montagem • ritmo • emoção • narrativa visual.",
        professorNotes: "“Ao assistir a este filme, tente compreender a história antes mesmo de pensar nas palavras. Observe o rosto, o corpo e os gestos dos personagens. Perceba como Chaplin utiliza enquadramentos, montagem, ritmo e atuação para fazer você rir, se emocionar e compreender o que está acontecendo. Preste atenção também à relação entre os personagens e à maneira como cada imagem ajuda a contar a história. Pergunte a si mesmo: eu conseguiria entender essa cena apenas olhando para as imagens?”",
      },
      {
        title: "Vídeo Extra 02: Introdução ao Cinema e à Linguagem Audiovisual - TEMPOS MODERNOS - M- 1.2",
        description: "Observe:\nmovimento • montagem • ritmo • som • máquinas • enquadramento • atuação • significado.\n\n“Durante esta atividade, você não deve assistir aos filmes apenas como espectador. Assista como um futuro cineasta. Observe onde a câmera está, o que aparece dentro do quadro, como os personagens se movimentam, como as imagens são organizadas e como cada escolha interfere naquilo que você sente e compreende. Não existe apenas uma maneira de assistir a um filme. Existe a maneira de quem assiste e existe a maneira de quem aprende a fazer cinema.”",
        professorNotes: "“Neste filme, observe como o cinema utiliza imagens, movimentos, montagem e sons para transmitir ideias. Preste atenção às máquinas, aos trabalhadores, aos movimentos repetitivos e ao ritmo da fábrica. Observe como Chaplin coloca o personagem dentro desse ambiente e como a montagem cria relações entre pessoas e máquinas. Perceba também quando o som aparece e qual função ele exerce. Pergunte a si mesmo: como uma imagem pode transmitir uma ideia sem precisar explicá-la através de palavras?”",
      },
    ],
    en: [
      {
        title: "Extra Video 01: Introduction to Cinema & Visual Language - THE KID - M- 1.1",
        description: "Focus on:\nfacial expression • gesture • physical performance • shot framing • editing • rhythm • emotional beats • visual narrative.",
        professorNotes: "“When watching this film, try to understand the narrative before even considering dialogue. Observe the face, body language, and gestures of the characters. Notice how Chaplin harnesses framing, cutting rhythm, and acting to make you laugh, feel moved, and comprehend every story beat. Ask yourself: could I follow this scene purely through images?”",
      },
      {
        title: "Extra Video 02: Introduction to Cinema & Visual Language - MODERN TIMES - M- 1.2",
        description: "Observe:\nmovement • editing montage • tempo • sound design • machines • framing • performance • subtext.\n\n“Watch not merely as an audience member, but as a future director. Note camera placement, what enters the frame, and how visual choices sculpt what you feel.”",
        professorNotes: "“In this film, examine how cinema synthesizes imagery, physical motion, editing, and sound to transmit sociopolitical themes. Notice the machines, factory cadence, and how montage correlates people to gears. How does an image articulate an idea without requiring verbal exposition?”",
      },
    ],
    es: [
      {
        title: "Video Extra 01: Introducción al Cine y Lenguaje Audiovisual - EL CHICO (THE KID) - M- 1.1",
        description: "Observa principalmente:\nexpresión facial • gestos • actuación física • encuadre • montaje • ritmo • emoción • narrativa visual.",
        professorNotes: "“Al ver esta película, intenta comprender la historia antes de pensar en las palabras. Observa el rostro, cuerpo y gestos de los personajes. Nota cómo Chaplin utiliza el encuadre, el ritmo de corte y la actuación para conmover y hacer reír. Pregúntate: ¿podría entender esta escena únicamente a través de las imágenes?”",
      },
      {
        title: "Video Extra 02: Introducción al Cine y Lenguaje Audiovisual - TIEMPOS MODERNOS - M- 1.2",
        description: "Observa:\nmovimiento • montaje • ritmo • sonido • máquinas • encuadre • actuación • significado.\n\n“Mira esta obra como un futuro realizador cinematográfico. Presta atención a dónde se sitúa la cámara y cómo cada encuadre construye la narrativa visual.”",
        professorNotes: "“En esta película, observa cómo el cine utiliza imágenes, movimiento, montaje y sonido para transmitir ideas complejas. Presta atención al ritmo fabril y a la relación dialéctica entre el individuo y las máquinas.”",
      },
    ],
    fr: [
      {
        title: "Vidéo Extra 01 : Introduction au Cinéma & Langage Audiovisuel - LE GAMIN (THE KID) - M- 1.1",
        description: "Observez principalement :\nexpression du visage • gestuelle • jeu d'acteur • cadrage • découpage • rythme • émotion • narration visuelle.",
        professorNotes: "« En regardant ce film, essayez de comprendre le récit par la pure puissance de l'image. Observez comment Chaplin orchestre le cadre, le découpage et le rythme pour faire rire et émouvoir sans un mot parlé. »",
      },
      {
        title: "Vidéo Extra 02 : Introduction au Cinéma & Langage Audiovisuel - LES TEMPS MODERNES - M- 1.2",
        description: "Observez :\nmouvement • montage • cadence • conception sonore • machines • cadrage • mise en scène • sens dramatique.",
        professorNotes: "« Regardez ce chef-d'œuvre avec l'œil d'un réalisateur. Observez comment la caméra et le montage créent des analogies percutantes entre les ouvriers et les engrenages. »",
      },
    ],
  },
  'mod-2': {
    pt: [
      {
        title: "Vídeo Extra 01: História do Cinema - CHEGADA DO TREM - M- 2.1",
        description: "Observe principalmente:\ncâmera • espaço • profundidade • movimento • realidade • enquadramento • pessoas • acontecimento.",
        professorNotes: "“Ao assistir a este filme, não procure uma história complexa. Observe o acontecimento. Perceba como a câmera registra um momento real, como as pessoas entram e saem do enquadramento e como o movimento da locomotiva cria uma sensação de profundidade e dinamismo. Lembre-se de que, para os primeiros espectadores, aquilo não era apenas uma imagem: era a própria ilusão da vida em movimento projetada em uma tela.”",
      },
      {
        title: "Vídeo Extra 02: História do Cinema - LE VOYAGE DANS LA LUNE - M- 2.2",
        description: "Observe:\nA cenografia • atuação • figurino • ilusionismo • efeitos especiais • cortes • fantasia • composição visual.",
        professorNotes: "“Neste filme, observe como Georges Méliès transforma elementos do teatro, do ilusionismo e da fantasia em linguagem cinematográfica. Preste atenção ao uso dos truques de câmera, como a parada de cena para criar desaparecimentos e transformações. Perceba como cada plano funciona como um pequeno palco onde tudo é desenhado, pintado e coreografado para estimular a imaginação do espectador.”",
      },
    ],
    en: [
      {
        title: "Extra Video 01: Film History - ARRIVAL OF A TRAIN (LUMIÈRE) - M- 2.1",
        description: "Observe mainly:\ncamera angle • space • deep focus • diagonal motion • recorded reality • framing • public reaction.",
        professorNotes: "“Do not seek a complex plot here; observe the sheer event. Note how the diagonal staging creates an illusion of immense depth and physical dynamism, shocking audiences of 1895.”",
      },
      {
        title: "Extra Video 02: Film History - A TRIP TO THE MOON (MÉLIÈS) - M- 2.2",
        description: "Observe:\nset design • theatrical staging • stop-motion substitution trick • in-camera illusions • fantasy mise-en-scène.",
        professorNotes: "“Notice how Georges Méliès adapts illusionism into cinema, inventing stop-motion substitutions and tableau choreography that transformed cinema from documentary into imaginative spectacle.”",
      },
    ],
    es: [
      {
        title: "Video Extra 01: Historia del Cine - LLEGADA DEL TREN (LUMIÈRE) - M- 2.1",
        description: "Observa principalmente:\nángulo de cámara • espacio • profundidad de campo • movimiento diagonal • encuadre • acontecimiento histórico.",
        professorNotes: "“Observa la composición en diagonal de los hermanos Lumière. Para el público pionero, este registro representó el nacimiento del asombro ante la ilusión de vida proyectada.”",
      },
      {
        title: "Video Extra 02: Historia del Cine - VIAJE A LA LUNA (MÉLIÈS) - M- 2.2",
        description: "Observa:\nescenografía pintada • efectos ópticos • corte por sustitución • fantasía • composición teatral en cuadro fijo.",
        professorNotes: "“Méliès transformó el cine en arte de la imaginación. Observa cómo cada encuadre funciona como un retablo coreografiado y repleto de trucajes visuales pioneros.”",
      },
    ],
    fr: [
      {
        title: "Vidéo Extra 01 : Histoire du Cinéma - L'ARRIVÉE D'UN TRAIN (LUMIÈRE) - M- 2.1",
        description: "Observez principalement :\naxe de caméra • profondeur de champ • perspective diagonale • mouvement • réalisme brut • foule en mouvement.",
        professorNotes: "« Observez la force de la diagonale des frères Lumière : la locomotive surgit du fond du plan pour créer une illusion spatiale et cinétique vertigineuse. »",
      },
      {
        title: "Vidéo Extra 02 : Histoire du Cinéma - LE VOYAGE DANS LA LUNE (MÉLIÈS) - M- 2.2",
        description: "Observez :\ndécors peints à la main • trucages à l'arrêt de caméra • féerie • mise en scène théâtrale • illusionnisme cinématographique.",
        professorNotes: "« Méliès libère le cinéma du réalisme pour fonder le spectacle féerique. Chaque plan est un tableau vivant où naissent les premiers trucages d'effets spéciaux. »",
      },
    ],
  },
  'mod-3': {
    pt: [
      {
        title: "Vídeo Extra 01: Roteiro e Criação de Personagens - À PROCURA DA FELICIDADE - M- 3.1",
        description: "Observe:\nProtagonista • Objetivo urgente • Obstáculos progressivos • Pontos de virada • Subtexto e vulnerabilidade • Motivação dramática.",
        professorNotes: "“Ao assistir a este filme, observe como o roteirista constrói um objetivo claro e urgente, e como os obstáculos se tornam cada vez mais difíceis. O bom roteiro nasce da tensão constante entre o desejo do personagem e as dificuldades da realidade.”",
      },
      {
        title: "Vídeo Extra 02: Roteiro e Criação de Personagens - O AUTO DA COMPADECIDA - M- 3.2",
        description: "Observe:\nDualidade dos protagonistas (João Grilo e Chicó) • Inteligência versus ingenuidade • Ritmo do diálogo • Humor e sobrevivência • Arquitetura de esquetes interligadas.",
        professorNotes: "“Observe como os personagens são construídos através de suas dualidades complementares. O aluno deve aprender como caracterizar personagens com vozes próprias, objetivos imediatos e sobrevivência através da inteligência e do diálogo.”",
      },
    ],
    en: [
      {
        title: "Extra Video 01: Screenwriting & Character Arc - THE PURSUIT OF HAPPYNESS - M- 3.1",
        description: "Focus on:\nProtagonist motivation • Urgent dramatic goal • Escalating obstacles • Major plot turns • Subtext & emotional vulnerability.",
        professorNotes: "“Examine how the script constructs high emotional stakes and an uncompromising ticking clock. Dramatic tension emerges directly from the friction between character ambition and harsh circumstance.”",
      },
      {
        title: "Extra Video 02: Screenwriting & Character Arc - A DOG'S WILL - M- 3.2",
        description: "Focus on:\nProtagonist duality • Witty survival instincts • Dialogue rhythm • Regional storytelling • Dramatic reversals.",
        professorNotes: "“Observe how complementary dual protagonists bring rhythm to comedic and dramatic beats. Notice how dialogue serves as both a weapon and a survival mechanism.”",
      },
    ],
    es: [
      {
        title: "Video Extra 01: Guion y Construcción de Personajes - EN BUSCA DE LA FELICIDAD - M- 3.1",
        description: "Observa:\nObjetivo urgente del protagonista • Obstáculos crecientes • Puntos de giro • Subtexto • Motivación inquebrantable.",
        professorNotes: "“Analiza cómo el guionista mantiene la tensión dramática a través de metas claras y apuestas emocionales al límite.”",
      },
      {
        title: "Video Extra 02: Guion y Construcción de Personajes - EL AUTO DE LA COMPADECIDA - M- 3.2",
        description: "Observa:\nDualidad de personajes complementarios • Picardía y humor • Ritmo del diálogo • Arquetipos y cultura popular.",
        professorNotes: "“Presta atención a la fuerza del diálogo y cómo cada personaje revela su visión del mundo a través de su propia cadencia verbal.”",
      },
    ],
    fr: [
      {
        title: "Vidéo Extra 01 : Scénario & Écriture de Personnages - À LA RECHERCHE DU BONHEUR - M- 3.1",
        description: "Observez :\nObjectif vital du protagoniste • Escalade des obstacles • Points de bascule • Sous-texte • Résilience dramatique.",
        professorNotes: "« Observez la construction d'une trajectoire dramatique tendue où chaque victoire est immédiatement menacée par un nouvel enjeu réaliste. »",
      },
      {
        title: "Vidéo Extra 02 : Scénario & Écriture de Personnages - LE TESTAMENT DU CHIEN - M- 3.2",
        description: "Observez :\nDualité clownesque et dramaturgie populaire • Rythme des répliques • Débrouillardise • Ironie et satire sociale.",
        professorNotes: "« Étudiez comment le dialogue devient l'arme principale des personnages pour déjouer les pièges du destin avec verve et truculence. »",
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
  modNum: number,
  slot: number
): ApostilaExtraVideo {
  if (lang === 'pt') return video;

  const key = `mod-${modNum}`;
  const pair = CANONICAL_VIDEOS_TRANSLATIONS[key]?.[lang];
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
