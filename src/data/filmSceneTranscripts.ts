// Transcrições e Legendas Pedagógicas Multilíngues CINELAB
// Permite aos alunos acompanhar os diálogos originais e traduzidos (PT, EN, ES, FR)
// com observações de direção de cena, decupagem e encenação.

export interface SceneTranscriptLine {
  id: string;
  time: string;
  speaker: string;
  originalLang: string;
  textOriginal: string;
  text: {
    pt: string;
    en: string;
    es: string;
    fr: string;
  };
  cinematicNote?: {
    pt: string;
    en: string;
    es: string;
    fr: string;
  };
}

export interface FilmSceneTranscript {
  filmId: string;
  sceneTitle: {
    pt: string;
    en: string;
    es: string;
    fr: string;
  };
  contextNote: {
    pt: string;
    en: string;
    es: string;
    fr: string;
  };
  lines: SceneTranscriptLine[];
}

export const filmSceneTranscripts: Record<string, FilmSceneTranscript> = {
  'film-bonus-noite-americana': {
    filmId: 'film-bonus-noite-americana',
    sceneTitle: {
      pt: 'Cena Antológica: "O Que é um Diretor?" (François Truffaut no papel de Ferrand)',
      en: 'Iconic Scene: "What is a Director?" (François Truffaut as Ferrand)',
      es: 'Escena Antológica: "¿Qué es un Director?" (François Truffaut como Ferrand)',
      fr: 'Scène Anthologique : « Qu\'est-ce qu\'un metteur en scène ? » (François Truffaut / Ferrand)',
    },
    contextNote: {
      pt: 'Nesta cena clássica nos estúdios Victorine em Nice, o diretor Ferrand (interpretado pelo próprio François Truffaut) enfrenta a sobrecarga de decisões contínuas de um set de filmagem real, articulando a mais célebre definição sobre o ofício da direção no cinema moderno.',
      en: 'In this classic scene at Victorine Studios in Nice, director Ferrand (played by François Truffaut himself) faces the intense decision-making pressure of a real film set, delivering the most famous definition of film directing in modern cinema.',
      es: 'En esta escena clásica en los estudios Victorine de Niza, el director Ferrand (encarnado por François Truffaut) enfrenta la avalancha de decisiones de un set de rodaje real, articulando la definición más célebre de la dirección cinematográfica.',
      fr: 'Dans cette séquence culte aux studios de la Victorine à Nice, le réalisateur Ferrand (incarné par Truffaut lui-même) fait face au vertige des décisions quotidiennes sur le plateau, formulant la plus belle métaphore du cinéma.',
    },
    lines: [
      {
        id: 'na-1',
        time: '00:04',
        speaker: 'Joëlle (Assistente de Direção)',
        originalLang: 'fr',
        textOriginal: 'Monsieur Ferrand, nous avons reçu les épreuves du laboratoire ce matin...',
        text: {
          pt: 'Sr. Ferrand, recebemos as cópias do laboratório esta manhã. E temos a questão do gato para a tomada do apartamento...',
          en: 'Mr. Ferrand, the lab dailies arrived this morning. And we still have the issue of the cat for the apartment setup...',
          es: 'Sr. Ferrand, llegaron las copias del laboratorio esta mañana. Y tenemos el asunto del gato para la toma del departamento...',
          fr: 'Monsieur Ferrand, nous avons reçu les épreuves du laboratoire ce matin. Et il y a le problème du chat pour le décor de l\'appartement...',
        },
        cinematicNote: {
          pt: 'Observe o ritmo da decupagem: a assistente de direção atua como amortecedor prático entre a máquina produtiva e a concentração do diretor.',
          en: 'Note the editing pace: the assistant director acts as an operational buffer between production demands and the director\'s focus.',
          es: 'Observe el ritmo: la asistente de dirección sirve de amortiguador entre la logística de producción y la concentración del director.',
          fr: 'Notez le découpage : l\'assistante de direction fait le lien vital entre l\'intendance et la vision de l\'auteur.',
        },
      },
      {
        id: 'na-2',
        time: '00:18',
        speaker: 'Ferrand / François Truffaut (O Diretor)',
        originalLang: 'fr',
        textOriginal: 'Qu\'est-ce qu\'un metteur en scène ? Un metteur en scène, c\'est quelqu\'un à qui on pose tout le temps des questions...',
        text: {
          pt: 'O que é um diretor de cinema? Um diretor de cinema é alguém a quem fazem perguntas o tempo todo... sobre tudo...',
          en: 'What is a film director? A film director is someone who is asked questions all the time... about everything...',
          es: '¿Qué es un director de cine? Un director es alguien a quien le hacen preguntas todo el tiempo... sobre todo...',
          fr: 'Qu\'est-ce qu\'un metteur en scène ? Un metteur en scène, c\'est quelqu\'un à qui on pose tout le temps des questions... sur tout...',
        },
        cinematicNote: {
          pt: 'Voz em off introspectiva / monólogo interior: Truffaut quebra a quarta parede metafórica revelando a solidão do comando criativo.',
          en: 'Introspective voice-over / interior monologue: Truffaut reveals the profound solitude of artistic command.',
          es: 'Voz en off introspectiva: Truffaut revela la soledad del liderazgo creativo en el set.',
          fr: 'Voix-off intimiste : Truffaut partage la solitude absolue du metteur en scène face au doute.',
        },
      },
      {
        id: 'na-3',
        time: '00:32',
        speaker: 'Ferrand / François Truffaut',
        originalLang: 'fr',
        textOriginal: 'Parfois il a les respostas, parfois non... Est-ce qu\'on met le filtre bleu ? Est-ce que la nuit américaine doit être dense ?',
        text: {
          pt: 'Às vezes ele tem as respostas, às vezes não... Devemos filmar com filtro azul? A Noite Americana (dia-por-noite) deve ser mais densa? A atriz deve chorar ou segurar as lágrimas?',
          en: 'Sometimes he has the answers, sometimes not... Should we use the blue filter? Should the day-for-night look denser? Should the actress weep or hold back her tears?',
          es: 'A veces tiene las respuestas, a veces no... ¿Usamos el filtro azul? ¿La noche americana debe ser más densa? ¿La actriz debe llorar o contener las lágrimas?',
          fr: 'Parfois il a les réponses, parfois non... Doit-on mettre le filtre bleu ? La nuit américaine doit-elle être dense ? L\'actrice doit-elle pleurer ou retenir ses larmes ?',
        },
        cinematicNote: {
          pt: 'Explicação direta da técnica título do filme: "Noite Americana" (Day for Night) é a filtragem óptica sob sol intenso para emular luar.',
          en: 'Direct explanation of the film\'s title technique: "Day for Night" is optical filtration and underexposure to simulate moonlight.',
          es: 'Explicación de la técnica del título: "Noche Americana" es el uso de filtros ópticos bajo sol para simular luz de luna.',
          fr: 'Explication directe du titre : la « Nuit Américaine » est l\'usage de filtres optiques et de sous-exposition pour simuler la nuit en plein jour.',
        },
      },
      {
        id: 'na-4',
        time: '00:55',
        speaker: 'Ferrand / François Truffaut',
        originalLang: 'fr',
        textOriginal: 'Faire un film, c\'est exactement comme un voyage en diligence dans le Far West : au début, on espère faire un beau voyage...',
        text: {
          pt: 'Fazer um filme é exatamente como uma viagem de diligência no Velho Oeste: no começo esperamos fazer uma bela viagem...',
          en: 'Making a film is exactly like a stagecoach journey in the Wild West: at first, you hope for a wonderful trip...',
          es: 'Hacer una película es exactamente como un viaje en diligencia en el Lejano Oeste: al comienzo esperamos hacer un gran viaje...',
          fr: 'Faire un film, c\'est exactement comme un voyage en diligence dans le Far West : au début, on espère faire un beau voyage...',
        },
        cinematicNote: {
          pt: 'A mais famosa citação da história dos manuais de cinema sobre a diferença entre o planejamento ideal e a contingência real.',
          en: 'The most cited aphorism in film literature regarding the tension between artistic vision and practical reality.',
          es: 'La cita más célebre sobre la tensión entre el ideal concebido en el guion y las contingencias del rodaje.',
          fr: 'L\'aphorisme légendaire résumant l\'épreuve physique et mentale de la production de film.',
        },
      },
      {
        id: 'na-5',
        time: '01:10',
        speaker: 'Ferrand / François Truffaut',
        originalLang: 'fr',
        textOriginal: '... et puis très vite, on se demande seulement si on va arriver à destination.',
        text: {
          pt: '... e logo depois, passamos a desejar apenas chegar ao destino sãos e salvos com o filme pronto.',
          en: '... and then very quickly, you just wonder if you will reach your destination alive with the movie wrapped.',
          es: '... y muy pronto, solo nos preguntamos si lograremos llegar a destino sanos y salvos con la película terminada.',
          fr: '... et puis très vite, on se demande seulement si on va arriver à destination.',
        },
        cinematicNote: {
          pt: 'Plano geral do estúdio em movimento: a câmera recua revelando os refletores, os maquinistas e os cabos no chão.',
          en: 'Studio wide shot in motion: camera pulls back to reveal light fixtures, grips, and cables across the studio floor.',
          es: 'Plano general del estudio en movimiento: la cámara retrocede revelando luces, tramoyistas y cables.',
          fr: 'Plan d\'ensemble du plateau en mouvement : la caméra recule pour dévoiler les projecteurs, machinos et câbles au sol.',
        },
      },
      {
        id: 'na-6',
        time: '01:30',
        speaker: 'Ferrand / François Truffaut',
        originalLang: 'fr',
        textOriginal: 'Je sais bien qu\'il y a des gens qui trouvent que le cinéma est futile. Mais les films sont plus harmonieux que la vie.',
        text: {
          pt: 'Eu sei bem que há pessoas que acham o cinema algo fútil. Mas os filmes são mais harmoniosos do que a vida.',
          en: 'I know very well that some people find cinema frivolous. But movies are more harmonious than life.',
          es: 'Sé muy bien que hay personas que consideran el cine algo fútil. Pero las películas son más armoniosas que la vida.',
          fr: 'Je sais bien qu\'il y a des gens qui trouvent que le cinéma est futile. Mais les films sont plus harmonieux que la vie.',
        },
        cinematicNote: {
          pt: 'O manifesto estético de Truffaut: no filme, cada segundo tem propósito dramático através do corte invisível.',
          en: 'Truffaut\'s aesthetic manifesto: inside cinema, every second has dramatic meaning through the invisible cut.',
          es: 'El manifiesto estético de Truffaut: en el cine, cada segundo adquiere significado dramático a través del corte.',
          fr: 'Le crédo artistique de François Truffaut : le cinéma transcende le désordre du réel par le rythme et le montage.',
        },
      },
      {
        id: 'na-7',
        time: '01:50',
        speaker: 'Ferrand / François Truffaut',
        originalLang: 'fr',
        textOriginal: 'Il n\'y a pas d\'embouteillages dans les films, il n\'y a pas de temps morts. Les films avancent comme des trains dans la nuit.',
        text: {
          pt: 'Não há engarrafamentos nos filmes, não há tempos mortos. Os filmes avançam como trens na noite. E pessoas como você e eu fomos feitas para sermos felizes fazendo cinema.',
          en: 'There are no traffic jams in movies, no dead times. Movies glide forward like trains through the night. And people like you and me were made to be happy making movies.',
          es: 'No hay embotellamientos en las películas, no hay tiempos muertos. Las películas avanzan como trenes en la noche. Y personas como tú y yo fuimos hechas para ser felices haciendo cine.',
          fr: 'Il n\'y a pas d\'embouteillages dans les films, il n\'y a pas de temps morts. Les films avancent comme des trains dans la nuit. Et les gens comme vous et moi sont faits pour être heureux dans le travail de faire des films.',
        },
        cinematicNote: {
          pt: 'Entrada majestosa da trilha sonora composta por Georges Delerue ("Grand Choral"): um dos momentos mais celebrados do cinema mundial.',
          en: 'Majestic orchestral entrance of Georges Delerue\'s score ("Grand Choral"): one of the crowning moments in film history.',
          es: 'Entrada orquestal de la partitura de Georges Delerue ("Grand Choral"): uno de los momentos cumbres de la historia del cine.',
          fr: 'Entrée triomphale de la musique originale de Georges Delerue (« Grand Choral ») : apogée lyrique du cinéma mondial.',
        },
      },
    ],
  },
  'film-1': {
    filmId: 'film-1',
    sceneTitle: {
      pt: 'Monólogo de Abertura: A Lógica do Polegar Opositor e da Moeda (Ilha das Flores - Jorge Furtado)',
      en: 'Opening Monologue: The Logic of the Opposable Thumb and Currency (Isle of Flowers)',
      es: 'Monólogo de Apertura: La Lógica del Pulgar Oponible y la Moneda (Isla de las Flores)',
      fr: 'Monologue d\'Ouverture : La Logique du Pouce Opposable et de la Monnaie (L\'Île aux Fleurs)',
    },
    contextNote: {
      pt: 'Obra-prima do curta-metragem brasileiro. A montagem acelerada associa definições enciclopédicas a um discurso irônico e contundente sobre a desigualdade social extrema.',
      en: 'Masterpiece of Brazilian short filmmaking. Rapid montage pairs encyclopedic dictionary definitions with devastating irony on extreme human inequality.',
      es: 'Obra maestra del cortometraje brasileño. El montaje acelerado combina definiciones enciclopédicas con una sátira implacável sobre la desigualdad.',
      fr: 'Chef-d\'œuvre du court-métrage brésilien. Le montage effréné croise définitions didactiques et satire percutante de la misère humaine.',
    },
    lines: [
      {
        id: 'if-1',
        time: '00:08',
        speaker: 'Narrador (Paulo José)',
        originalLang: 'pt',
        textOriginal: 'Caminhamos sobre a terra. O planeta Terra é redondo em quase toda a sua superfície...',
        text: {
          pt: 'Caminhamos sobre a terra. O planeta Terra é redondo em quase toda a sua superfície. Em Porto Alegre vive o Sr. Suzuki...',
          en: 'We walk on the Earth. Planet Earth is round on almost its entire surface. In Porto Alegre lives Mr. Suzuki...',
          es: 'Caminamos sobre la tierra. El planeta Tierra es redondo en casi toda su superficie. En Porto Alegre vive el Sr. Suzuki...',
          fr: 'Nous marchons sur la terre. La planète Terre est ronde sur presque toute sa surface. À Porto Alegre vit M. Suzuki...',
        },
        cinematicNote: {
          pt: 'Voz over documental neutra e objetiva que estabelece a premissa pseudo-científica da decupagem.',
          en: 'Neutral, clinical documentary voice-over establishing the pseudo-scientific editing rhythm.',
          es: 'Voz en off documental neutra que instaura la premisa científica del relato.',
          fr: 'Voix-off documentaire clinique qui pose les fondations du découpage encyclopédique.',
        },
      },
      {
        id: 'if-2',
        time: '00:35',
        speaker: 'Narrador (Paulo José)',
        originalLang: 'pt',
        textOriginal: 'O que difere os seres humanos dos outros animais? O telencéfalo altamente desenvolvido e o polegar opositor.',
        text: {
          pt: 'O que difere os seres humanos dos outros animais? Duas características essenciais: o telencéfalo altamente desenvolvido e o polegar opositor.',
          en: 'What distinguishes human beings from other animals? Two core traits: the highly developed telencephalon and the opposable thumb.',
          es: '¿Qué diferencia a los seres humanos de otros animales? Dos características esenciales: el telencéfalo muy desarrollado y el pulgar oponible.',
          fr: 'Qu\'est-ce qui distingue l\'être humain des autres animaux ? Deux traits fondamentaux : le télencéphale très développé et le pouce opposable.',
        },
        cinematicNote: {
          pt: 'Corte rápido para ilustrações anatômicas: montagem de choque pedagógica.',
          en: 'Fast cut to anatomical medical plates: intellectual shock montage.',
          es: 'Corte rápido a láminas anatómicas: montaje de choque intelectual.',
          fr: 'Coupe rapide sur planches anatomiques : montage de choc pédagogique.',
        },
      },
      {
        id: 'if-3',
        time: '01:15',
        speaker: 'Narrador (Paulo José)',
        originalLang: 'pt',
        textOriginal: 'O polegar opositor permite o movimento de pinça com os outros dedos, possibilitando a manipulação de ferramentas e dinheiro.',
        text: {
          pt: 'O polegar opositor permite o movimento de pinça, possibilitando segurar instrumentos, plantar tomates e trocar papéis chamados dinheiro.',
          en: 'The opposable thumb allows precision pinch movement, enabling humans to hold tools, plant tomatoes, and exchange paper called money.',
          es: 'El pulgar oponible permite el movimiento de pinza, haciendo posible sostener herramientas, cultivar tomates e intercambiar dinero.',
          fr: 'Le pouce opposable permet la préhension de précision, rendant possible l\'usage d\'outils, la culture de tomates et l\'échange de monnaie.',
        },
        cinematicNote: {
          pt: 'Uso de repetição rítmica e associações semióticas diretas.',
          en: 'Use of rhythmic repetition and immediate semiotic associations.',
          es: 'Uso de repetición rítmica y asociaciones semióticas.',
          fr: 'Répétition rythmée et associations sémiotiques percutantes.',
        },
      },
      {
        id: 'if-4',
        time: '02:10',
        speaker: 'Narrador (Paulo José)',
        originalLang: 'pt',
        textOriginal: 'O que coloca os seres humanos depois dos porcos na ordem do lixo da Ilha das Flores não é a falta de telencéfalo...',
        text: {
          pt: 'O que coloca os seres humanos depois dos porcos na fila do lixo da Ilha das Flores não é a ausência de telencéfalo ou de polegar opositor: é não ter dinheiro nem dono.',
          en: 'What places human beings after pigs in the garbage hierarchy of Isle of Flowers is neither the lack of a telencephalon nor opposable thumbs: it is having neither money nor an owner.',
          es: 'Lo que ubica a los seres humanos después de los cerdos en la basura de Isla de las Flores no es la falta de cerebro: es no tener dinero ni dueño.',
          fr: 'Ce qui place les êtres humains après les porcs dans la décharge de l\'Île aux Fleurs n\'est ni l\'absence de télencéphale ni de pouce : c\'est de n\'avoir ni argent ni propriétaire.',
        },
        cinematicNote: {
          pt: 'Clímax dramático: a música orquestral cessa e a crueza da imagem documental impacta o espectador.',
          en: 'Dramatic climax: the buoyant music abruptly cuts out, leaving the viewer face to face with raw documentary reality.',
          es: 'Clímax dramático: la música cesa en seco y la crudeza del documento golpea al espectador.',
          fr: 'Acmé dramatique : la musique se tait brutalement face à la violence documentaire brute.',
        },
      },
    ],
  },
  'film-2': {
    filmId: 'film-2',
    sceneTitle: {
      pt: 'A Escadaria de Odessa: Montagem Métrica e Rítmica (O Encouraçado Potemkin - Sergei Eisenstein)',
      en: 'The Odessa Steps: Metric and Rhythmic Montage (Battleship Potemkin)',
      es: 'La Escalinata de Odesa: Montaje Métrico y Rítmico (El Acorazado Potemkin)',
      fr: 'L\'Escalier d\'Odessa : Montage Métrique et Rythmique (Le Cuirassé Potemkine)',
    },
    contextNote: {
      pt: 'A sequência mais influente da história da montagem cinematográfica. Eisenstein dilata o tempo real da descida dos degraus através de 150 planos curtos de alta intensidade visual.',
      en: 'The most influential sequence in the history of film editing. Eisenstein dilates temporal duration through over 150 rapid, high-impact shots.',
      es: 'La secuencia más influyente del montaje clásico. Eisenstein dilata el tiempo real a través de más de 150 planos de alto impacto visual.',
      fr: 'La séquence la plus célèbre de l\'histoire du cinéma. Eisenstein étire le temps réel de la descente grâce à 150 plans à haute tension.',
    },
    lines: [
      {
        id: 'pot-1',
        time: '00:15',
        speaker: 'Intertítulo Histórico',
        originalLang: 'ru',
        textOriginal: 'И вдруг... сапоги солдат зашагали по ступеням!',
        text: {
          pt: 'E de repente... as botas dos soldados marcharam inexoravelmente sobre os degraus da escadaria!',
          en: 'And suddenly... the soldiers\' boots marched relentlessly down the marble steps!',
          es: '¡Y de pronto... las botas de los soldados marcharon inexorablemente por los escalones!',
          fr: 'Et soudain... les bottes des soldats se mirent à marteler les marches de l\'escalier !',
        },
        cinematicNote: {
          pt: 'Montagem métrica: o ritmo dos cortes acelera à medida que o perigo se aproxima da multidão pacífica.',
          en: 'Metric montage: cutting tempo accelerates as impending violence advances upon the peaceful crowd.',
          es: 'Montaje métrico: el tempo de corte se acelera ante el avance de la guardia imperial.',
          fr: 'Montage métrique : la cadence de coupe s\'accélère à mesure que le danger se rapproche.',
        },
      },
      {
        id: 'pot-2',
        time: '00:45',
        speaker: 'Mãe com a Criança Ferida',
        originalLang: 'ru',
        textOriginal: 'Посмотрите на него! Мой мальчик ранен! Не стреляйте!',
        text: {
          pt: 'Olhem para ele! Meu menino está gravemente ferido! Pelo amor de Deus, não disparem contra nós!',
          en: 'Look at him! My boy is gravely wounded! For the love of God, do not fire upon us!',
          es: '¡Mírenlo! ¡Mi hijo está gravemente herido! ¡Por piedad, no disparen contra nosotros!',
          fr: 'Regardez-le ! Mon enfant est blessé ! Pour l\'amour de Dieu, ne tirez pas sur nous !',
        },
        cinematicNote: {
          pt: 'Plano-detalhe dramático que estabelece o contraponto emocional contra a frieza mecânica dos fuzis.',
          en: 'Dramatic close-up contrasting human vulnerability with the mechanical geometry of imperial rifles.',
          es: 'Primer plano dramático en contrapunto con la geometría rígida de los fusiles.',
          fr: 'Gros plan tragique en contrepoint émotionnel face à l\'alignement froid des fusils.',
        },
      },
      {
        id: 'pot-3',
        time: '01:25',
        speaker: 'O Carrinho de Bebê Desgovernado',
        originalLang: 'ru',
        textOriginal: 'Коляска с младенцем покатилась вниз по ступеням...',
        text: {
          pt: 'A jovem mãe é atingida... o carrinho de bebê desliza sem controle pelos degraus da escadaria!',
          en: 'The young mother falls... the baby carriage rolls uncontrollably down the endless staircase!',
          es: 'La madre cae abatida... ¡el cochecito de bebé rueda sin control por los interminables escalones!',
          fr: 'La mère s\'effondre... le landau d\'enfant dévale l\'escalier hors de tout contrôle !',
        },
        cinematicNote: {
          pt: 'Montagem rítmica alternada entre os olhos aterrorizados da multidão e as rodas oscilantes do carrinho.',
          en: 'Rhythmic cross-cutting between the horrified eyes of onlookers and the wobbling wheels of the pram.',
          es: 'Montaje rítmico alternado entre las miradas de terror y las ruedas vacilantes del cochecito.',
          fr: 'Montage rythmique alterné entre les regards horrifiés et les roues cahotantes du landau.',
        },
      },
    ],
  },
  'film-7': {
    filmId: 'film-7',
    sceneTitle: {
      pt: 'A Escadaria de Odessa em 4K Remasterizada (O Encouraçado Potemkin)',
      en: 'The Odessa Steps 4K Remastered (Battleship Potemkin)',
      es: 'La Escalinata de Odesa en 4K (El Acorazado Potemkin)',
      fr: 'L\'Escalier d\'Odessa Restauré en 4K (Le Cuirassé Potemkine)',
    },
    contextNote: {
      pt: 'Estudo aprofundado dos 5 tipos de montagem concebidos por Eisenstein: métrica, rítmica, tonal, sobretonal e intelectual.',
      en: 'In-depth study of Eisenstein\'s 5 methods of montage: metric, rhythmic, tonal, overtonal, and intellectual.',
      es: 'Estudio de los 5 métodos de montaje según Eisenstein: métrico, rítmico, tonal, armónico e intelectual.',
      fr: 'Étude des 5 méthodes de montage d\'Eisenstein : métrique, rythmique, tonale, harmonique et intellectuelle.',
    },
    lines: [
      {
        id: 'pot7-1',
        time: '00:20',
        speaker: 'Eisenstein (Nota de Direção)',
        originalLang: 'ru',
        textOriginal: 'Монтаж — это столкновение двух кадров, рождающее новый смысл.',
        text: {
          pt: 'A montagem cinematográfica não é a mera soma de dois planos, mas a colisão dialética que gera uma nova ideia na mente do espectador.',
          en: 'Montage is not merely linking consecutive frames, but the dialectical collision of two shots producing an entirely new idea.',
          es: 'El montaje no es la simple suma de planos, sino la colisión dialéctica que engendra una idea inédita en el espectador.',
          fr: 'Le montage n\'est pas la simple suite de deux plans, mais leur collision dialectique qui engendre une idée nouvelle chez le spectateur.',
        },
        cinematicNote: {
          pt: 'Princípio do corte intelectual: tese + antítese = síntese conceitual no cérebro do público.',
          en: 'Principle of intellectual montage: thesis + antithesis = conceptual synthesis in the viewer\'s mind.',
          es: 'Principio del corte intelectual: tesis + antítesis = síntesis conceptual en la mente del espectador.',
          fr: 'Principe du montage intellectuel : thèse + antithèse = synthèse conceptuelle.',
        },
      },
    ],
  },
  'film-3': {
    filmId: 'film-3',
    sceneTitle: {
      pt: 'Cena da Discussão na Cozinha: A Tensão Dramática dos Diálogos (O Sanduíche - Jorge Furtado)',
      en: 'Kitchen Argument Scene: Dramatic Dialogue Tension (The Sandwich)',
      es: 'Escena de la Discusión en la Cocina: Tensión Dramática (El Sándwich)',
      fr: 'Scène de Dispute dans la Cuisine : Tension Dramatique des Dialogues (Le Sandwich)',
    },
    contextNote: {
      pt: 'Construção cômica e melancólica sobre o término de um relacionamento. A ação física de montar um sanduíche serve de espelho para as queixas do casal.',
      en: 'Comic and bittersweet study of romantic dissolution. Preparing a sandwich becomes the physical metaphor for the couple\'s unraveling bond.',
      es: 'Estudio cómico y melancólico sobre el fin de una relación. La preparación física del sándwich sirve de metáfora a los reclamos.',
      fr: 'Chronique tragi-comique d\'une rupture amoureuse. La confection méticuleuse du sandwich reflète l\'usure du couple.',
    },
    lines: [
      {
        id: 'sand-1',
        time: '00:15',
        speaker: 'Ele',
        originalLang: 'pt',
        textOriginal: 'Por que você está me olhando desse jeito? O que foi que eu fiz agora?',
        text: {
          pt: 'Por que você está me olhando desse jeito? O que foi que eu fiz de errado agora?',
          en: 'Why are you staring at me like that? What did I do wrong this time?',
          es: '¿Por qué me estás mirando de esa manera? ¿Qué hice mal ahora?',
          fr: 'Pourquoi me regardes-tu comme ça ? Qu\'est-ce que j\'ai encore fait de mal ?',
        },
        cinematicNote: {
          pt: 'Ação em primeiro plano (cortar o pão) enquanto o subtexto emocional transborda nos olhares.',
          en: 'Foreground domestic action (slicing bread) while the emotional subtext simmers across their gazes.',
          es: 'Acción física en primer término mientras el subtexto emocional desborda en las miradas.',
          fr: 'Action quotidienne au premier plan tandis que le sous-texte émotionnel explose en silences.',
        },
      },
      {
        id: 'sand-2',
        time: '00:45',
        speaker: 'Ela',
        originalLang: 'pt',
        textOriginal: 'Você não fez nada. Esse é exatamente o ponto: você nunca faz nada.',
        text: {
          pt: 'Você não fez nada. Esse é exatamente o ponto: você nunca toma uma atitude.',
          en: 'You didn\'t do anything. That is precisely the point: you never take a stand on anything.',
          es: 'No hiciste nada. Ese es precisamente el problema: nunca tomas una decisión.',
          fr: 'Tu n\'as rien fait. C\'est exactement cela le problème : tu ne prends jamais aucune initiative.',
        },
        cinematicNote: {
          pt: 'Câmera fixa em plano médio: o enquadramento claustrofóbico aprisiona os dois personagens no mesmo espaço.',
          en: 'Locked medium shot: claustrophobic framing confines both characters within their shared dilemma.',
          es: 'Plano medio estático: el encuadre cerrado atrapa a ambos personajes en la misma tensión.',
          fr: 'Plan moyen fixe : le cadre serré piège les deux personnages dans leur impasse conjugale.',
        },
      },
    ],
  },
  'film-4': {
    filmId: 'film-4',
    sceneTitle: {
      pt: 'O Diálogo das Memórias Perdidas (Dona Cristina Perdeu a Memória - Ana Luiza Azevedo)',
      en: 'The Lost Memories Dialogue (Dona Cristina Lost Her Memory)',
      es: 'El Diálogo de las Memorias Perdidas (Doña Cristina Perdió la Memoria)',
      fr: 'Le Dialogue des Mémoires Perdues (Dona Cristina a Perdu la Mémoire)',
    },
    contextNote: {
      pt: 'Sensibilidade poética e direção de atores. A interação afetuosa entre a idosa Cristina e o jovem Antônio transforma a perda cognitiva em poesia visual.',
      en: 'Poetic sensitivity and masterful actor direction. The tender dialogue between elderly Cristina and young Antônio transmutes cognitive decline into visual poetry.',
      es: 'Sensibilidad poética y dirección de actores. La complicidad entre la anciana y el niño transforma la fragilidad de la memoria en poesía.',
      fr: 'Sensibilité poétique et pureté du jeu d\'acteurs. La tendre complicité entre la vieille dame et l\'enfant sublime la mémoire qui s\'efface.',
    },
    lines: [
      {
        id: 'cris-1',
        time: '00:20',
        speaker: 'Antônio (O Menino)',
        originalLang: 'pt',
        textOriginal: 'Dona Cristina, a senhora lembra de mim? Eu sou o Antônio, seu vizinho.',
        text: {
          pt: 'Dona Cristina, a senhora lembra de mim? Eu sou o Antônio, seu vizinho do terceiro andar.',
          en: 'Dona Cristina, do you remember who I am? I\'m Antônio, your third-floor neighbor.',
          es: 'Doña Cristina, ¿se acuerda de mí? Soy Antônio, su vecino del tercer piso.',
          fr: 'Dona Cristina, vous vous souvenez de moi ? Je suis Antônio, votre voisin du troisième.',
        },
        cinematicNote: {
          pt: 'Luz natural suave de janela conferindo calor e intimidade aos primeiros planos.',
          en: 'Soft natural window light lending warmth and emotional intimacy to the close-ups.',
          es: 'Luz suave de ventana que otorga calidez e intimidad al primer plano.',
          fr: 'Douce lumière naturelle venant de la fenêtre, créant une intimité bienveillante.',
        },
      },
      {
        id: 'cris-2',
        time: '00:50',
        speaker: 'Dona Cristina',
        originalLang: 'pt',
        textOriginal: 'Eu me lembro de tantas histórias, meu querido... mas algumas escapam como passarinhos.',
        text: {
          pt: 'Eu me lembro de tantas histórias, meu querido... mas às vezes as lembranças fogem como passarinhos pela janela.',
          en: 'I remember so many stories, my dear... but sometimes memories fly away like little birds through the window.',
          es: 'Recuerdo tantas historias, cariño... pero a veces los recuerdos se escapan como pajaritos por la ventana.',
          fr: 'Je me souviens de tant d\'histoires, mon chéri... mais parfois mes souvenirs s\'envolent comme des moineaux par la fenêtre.',
        },
        cinematicNote: {
          pt: 'Expressão tocante e uso de objetos afetivos como fotografias antigas e caixas de botões.',
          en: 'Evocative performance supported by sentimental props like weathered photographs and button boxes.',
          es: 'Actuación conmovedora y empleo de utilería afectiva: fotografías antiguas y botones.',
          fr: 'Jeu bouleversant appuyé par des objets fétiches : vieilles photos jaunies et boîte à boutons.',
        },
      },
    ],
  },
  'film-5': {
    filmId: 'film-5',
    sceneTitle: {
      pt: 'Abertura no Cemitério: "Eles Estão Vindo Te Pegar, Barbara!" (A Noite dos Mortos-Vivos - George Romero)',
      en: 'Cemetery Opening: "They\'re Coming to Get You, Barbara!" (Night of the Living Dead)',
      es: 'Apertura en el Cementerio: "¡Vienen por ti, Barbara!" (La Noche de los Muertos Vivientes)',
      fr: 'Ouverture au Cimetière : « Ils viennent te chercher, Barbara ! » (La Nuit des Morts-Vivants)',
    },
    contextNote: {
      pt: 'O marco fundador do terror moderno independente (1968). A atmosfera lúgubre em preto e branco combinada à quebra das convenções cinematográficas clássicas.',
      en: 'The seminal foundation of modern independent horror (1968). Stark black-and-white cinematography shattering classical Hollywood horror conventions.',
      es: 'La piedra fundacional del terror moderno independiente (1968). El blanco y negro austero dinamita las reglas del cine clásico.',
      fr: 'L\'acte de naissance du cinéma d\'horreur moderne indépendant (1968). Le noir et blanc brut balaie les conventions hollywoodiennes.',
    },
    lines: [
      {
        id: 'notld-1',
        time: '00:25',
        speaker: 'Johnny',
        originalLang: 'en',
        textOriginal: 'Why did we have to come all this way just to put flowers on a grave?',
        text: {
          pt: 'Por que nós tínhamos que dirigir até tão longe só para colocar flores que ninguém vai ver?',
          en: 'Why did we have to drive all this way just to put flowers on a grave that nobody visits?',
          es: '¿Por qué tuvimos que conducir tan lejos solo para poner flores en una tumba que nadie visita?',
          fr: 'Pourquoi a-t-il fallu faire toute cette route juste pour poser des fleurs que personne ne verra ?',
        },
        cinematicNote: {
          pt: 'Enquadramentos angulares e planos holandeses discretos que insinuam desestabilização iminente.',
          en: 'Subtle low-angle Dutch tilts hinting at imminent psychological and physical collapse.',
          es: 'Planos holandeses discretos que anticipan la desestabilización física y moral.',
          fr: 'Plans légèrement débullés annonçant le basculement imminent du monde ordinaire dans le cauchemar.',
        },
      },
      {
        id: 'notld-2',
        time: '01:05',
        speaker: 'Johnny',
        originalLang: 'en',
        textOriginal: 'They\'re coming to get you, Barbara! Look, there comes one of them now!',
        text: {
          pt: 'Eles estão vindo te pegar, Barbara! Olhe lá... lá vem um deles agora mesmo!',
          en: 'They\'re coming to get you, Barbara! Look... there comes one of them right now!',
          es: '¡Vienen a atraparte, Barbara! ¡Mira allá... allí viene uno de ellos ahora mismo!',
          fr: 'Ils viennent te chercher, Barbara ! Regarde... en voilà un qui arrive droit sur toi !',
        },
        cinematicNote: {
          pt: 'A mais famosa fala de abertura do cinema de horror: a troça infantil transforma-se instantaneamente em tragédia real.',
          en: 'The most iconic opening line in horror history: juvenile teasing instantly turns into lethal dread.',
          es: 'La frase más legendaria del cine de terror: la burla infantil se transmuta en horror real.',
          fr: 'La réplique inaugurale culte du cinéma de genre : la plaisanterie puérile vire brutalement au cauchemar.',
        },
      },
    ],
  },
  'film-6': {
    filmId: 'film-6',
    sceneTitle: {
      pt: 'Cena da Entrada na Zona: O Silêncio e a Passagem Temporal (Stalker, 1979 - Andrei Tarkovsky)',
      en: 'Entering The Zone Scene: Silence and Temporal Sculpting (Stalker)',
      es: 'Escena de Entrada a la Zona: El Silencio y la Escultura del Tiempo (Stalker)',
      fr: 'Scène de l\'Entrée dans la Zone : Silence et Sculpture du Temps (Stalker)',
    },
    contextNote: {
      pt: 'Transição cromática radical: o filme sai da paleta monocromática sépia do mundo opressivo da cidade e entra no exuberante verde-dourado da Zona. O silêncio e o som das rodas do vagão nos trilhos marcam a passagem do tempo escultórico.',
      en: 'Radical chromatic transition: the film shifts from the oppressive sepia monochrome of the city into the lush green-gold of the Zone. The rhythmic click of the train wheels marks Tarkovsky\'s sculpting in time.',
      es: 'Transición cromática radical: la película pasa del sepia monocromático de la ciudad al verde dorado de la Zona. El traqueteo del vagón esculpe el tiempo en pantalla.',
      fr: 'Transition chromatique majeure : passage du sépia oppressif de la ville au vert luxuriant et mystique de la Zone. Le claquement des rails incarne le cinéma comme sculpture du temps.',
    },
    lines: [
      {
        id: 'st-1',
        time: '00:30',
        speaker: 'Stalker (Alexander Kaidanovsky)',
        originalLang: 'ru',
        textOriginal: 'Вот мы и дома... Здесь нельзя торопиться.',
        text: {
          pt: 'Enfim chegamos... Aqui não se pode ter pressa. A Zona não tolera passos impensados.',
          en: 'Here we are at last... You cannot hurry here. The Zone tolerates no reckless steps.',
          es: 'Por fin llegamos... Aquí no se puede tener prisa. La Zona no tolera pasos imprudentes.',
          fr: 'Nous y voilà enfin... Ici, impossible de se presser. La Zone ne tolère aucune précipitation.',
        },
        cinematicNote: {
          pt: 'Tempo escultórico de Tarkovsky: planos longos de mais de 3 minutos sem corte para dilatar a percepção da gravidade temporal.',
          en: 'Tarkovsky\'s sculpting in time: long takes over 3 minutes with zero cuts to expand the viewer\'s temporal perception.',
          es: 'Esculpir en el tiempo según Tarkovsky: tomas continuas de más de 3 minutos para dilatar la percepción temporal.',
          fr: 'Sculpter le temps selon Tarkovski : plans-séquences étirés pour immerger le spectateur dans la réalité de la durée.',
        },
      },
      {
        id: 'st-2',
        time: '01:15',
        speaker: 'O Escritor (Anatoly Solonitsyn)',
        originalLang: 'ru',
        textOriginal: 'И что же, здесь действительно сбываются самые сокровенные желания?',
        text: {
          pt: 'E é verdade que lá dentro os desejos mais profundos e inconfessáveis se realizam?',
          en: 'And is it true that in there, one\'s most profound and unconfessed desires truly come to life?',
          es: '¿Y es verdad que allí dentro los deseos más recónditos e inconfesables se hacen realidad?',
          fr: 'Et est-il vrai que là-bas, les désirs les plus secrets et inavouables se réalisent vraiment ?',
        },
        cinematicNote: {
          pt: 'Contraste entre a dúvida cínica do intelectual moderno e a fé devocional do guia.',
          en: 'Tension between the modern intellectual\'s cynicism and the guide\'s quasi-religious devotion.',
          es: 'Contraste entre el escepticismo del intelectual y la fe devocional del guía.',
          fr: 'Conflit philosophique entre l\'ironie de l\'intellectuel et la ferveur quasi-religieuse du Stalker.',
        },
      },
    ],
  },
  'film-8': {
    filmId: 'film-8',
    sceneTitle: {
      pt: 'A Dinâmica de Comando no Set de Filmagem: Da Claquete à Ação (AvMakers & Geração Cinema)',
      en: 'Film Set Command Hierarchy: From Slate to Action (Professional Production Dynamics)',
      es: 'La Dinámica de Mando en el Set de Rodaje: De la Claqueta a la Acción',
      fr: 'La Dynamique de Commandement sur le Plateau : Du Clap au Moteur (Régie et Plateau)',
    },
    contextNote: {
      pt: 'Estudo prático do protocolo sonoro e operacional em um set profissional. As funções do 1º Assistente de Direção, Som Direto, Fotografia e Diretor de Cena.',
      en: 'Practical study of communication protocols on a professional soundstage. Roles of the 1st AD, Sound Mixer, DP, and Director.',
      es: 'Estudio de los protocolos de comunicación en un set profesional: roles del 1er Asistente, Sonido Directo y Fotografía.',
      fr: 'Étude des protocoles stricts de plateau de tournage : rôles du premier assistant, de l\'ingénieur du son et du chef opérateur.',
    },
    lines: [
      {
        id: 'set-1',
        time: '00:15',
        speaker: '1º Assistente de Direção (1st AD)',
        originalLang: 'pt',
        textOriginal: 'Atenção equipe: silêncio total no estúdio! Rodando som!',
        text: {
          pt: 'Atenção equipe: silêncio total no estúdio! Rodando som!',
          en: 'Attention crew: total silence on stage! Roll sound!',
          es: '¡Atención equipo: silencio total en el estudio! ¡Rueda sonido!',
          fr: 'Attention tout le monde : silence absolu sur le plateau ! Ça tourne au son !',
        },
        cinematicNote: {
          pt: 'O 1º AD comanda o ritmo do set, garantindo segurança e disciplina temporal.',
          en: 'The 1st AD orchestrates floor discipline, ensuring schedule adherence and crew safety.',
          es: 'El 1er Asistente marca el ritmo de rodaje, garantizando disciplina operativa.',
          fr: 'Le premier assistant donne le tempo et garantit la discipline impérative sur le plateau.',
        },
      },
      {
        id: 'set-2',
        time: '00:40',
        speaker: 'Técnico de Som & Câmera',
        originalLang: 'pt',
        textOriginal: 'Som gravando... Câmera rodando... Claquete cena 14 tomada 1!',
        text: {
          pt: 'Som gravando... Câmera rodando... Claquete: Cena 14, Tomada 1... CLAC!',
          en: 'Sound speeds... Camera rolls... Slate: Scene 14, Take 1... MARK!',
          es: '¡Sonido graba... Cámara rueda... Claqueta: Escena 14, Toma 1... CLAC!',
          fr: 'Le son tourne... La caméra tourne... Clap : Scène 14, Prise 1... CLAC !',
        },
        cinematicNote: {
          pt: 'A claquete sincroniza o código de tempo sonoro e visual para a pós-produção.',
          en: 'The clapperboard provides audiovisual synchronization marks for picture and dialogue edit.',
          es: 'La claqueta brinda la referencia audiovisual para sincronización en montaje.',
          fr: 'Le clap fournit le repère audiovisuel indispensable pour la post-production.',
        },
      },
      {
        id: 'set-3',
        time: '01:05',
        speaker: 'Diretor de Cena',
        originalLang: 'pt',
        textOriginal: 'Concentração dos atores... e... AÇÃO!',
        text: {
          pt: 'Concentração... e... AÇÃO!',
          en: 'Settle in... and... ACTION!',
          es: '¡Concentración... y... ACCIÓN!',
          fr: 'Action !',
        },
        cinematicNote: {
          pt: 'Somente o Diretor pronuncia a palavra "AÇÃO" para deflagrar a energia dramática.',
          en: 'Only the Director calls "ACTION" to unleash the dramatic energy of the cast.',
          es: 'Solo el Director pronuncia la palabra "ACCIÓN" para desatar la energía dramática.',
          fr: 'Seul le réalisateur prononce le mot magique pour lancer l\'émotion des comédiens.',
        },
      },
    ],
  },
  'film-9': {
    filmId: 'film-9',
    sceneTitle: {
      pt: 'O Clima Tropical Congelado: Crônica Social no Falso Documentário (Recife Frio - Kleber Mendonça Filho)',
      en: 'The Frozen Tropics: Social Satire in Mockumentary (Cold Tropics)',
      es: 'El Clima Tropical Congelado: Sátira Social en Mockumentary (Recife Frío)',
      fr: 'Les Tropiques Glacés : Satire Sociale en Faux-Documentaire (Recife Froid)',
    },
    contextNote: {
      pt: 'Distopia meteorológica e sátira urbana. A queda abrupta das temperaturas em uma metrópole tropical revela fissuras de classe e a estranheza do cotidiano.',
      en: 'Meteorological dystopia and urban satire. Sudden freezing temperatures in a tropical metropolis expose class fissures and existential estrangement.',
      es: 'Distopía meteorológica y sátira urbana. El frío súbito en el trópico desvela fracturas sociales.',
      fr: 'Dystopie météorologique et satire percutante. La vague de froid soudaine à Recife révèle les clivages sociaux.',
    },
    lines: [
      {
        id: 'rf-1',
        time: '00:25',
        speaker: 'Repórter de Notícias',
        originalLang: 'pt',
        textOriginal: 'A temperatura nesta manhã de janeiro em Boa Viagem despencou para cinco graus negativos.',
        text: {
          pt: 'A temperatura nesta manhã de janeiro na praia de Boa Viagem despencou inexplicavelmente para cinco graus negativos.',
          en: 'The temperature this January morning along Boa Viagem beach plummeted unexpectedly to minus five degrees.',
          es: 'La temperatura esta mañana de enero en la playa cayó inexplicablemente a cinco bajo cero.',
          fr: 'La température ce matin sur la plage de Boa Viagem a chuté de façon inexplicable à moins cinq degrés.',
        },
        cinematicNote: {
          pt: 'Ironia visual: planos da praia tropical coberta de neblina e transeuntes com casacos pesados de esqui.',
          en: 'Visual irony: tropical coastlines draped in thick mist and residents donning heavy ski parkas.',
          es: 'Ironía visual: costa tropical envuelta en neblina y transeúntes con abrigos de esquí.',
          fr: 'Ironie visuelle : plage de cartes postales noyée de brume glacée et anoraks de ski.',
        },
      },
    ],
  },
  'film-10': {
    filmId: 'film-10',
    sceneTitle: {
      pt: 'A Descoberta de Nietzsche no Lixão (Meu Amigo Nietzsche - Dir. Fáuston da Silva)',
      en: 'Discovering Nietzsche in the Wasteland (My Friend Nietzsche)',
      es: 'El Hallazgo de Nietzsche en el Basurero (Mi Amigo Nietzsche)',
      fr: 'La Découverte de Nietzsche dans la Décharge (Mon Ami Nietzsche)',
    },
    contextNote: {
      pt: 'O poder transformador da leitura em uma comunidade periférica. O menino Lucas encontra "Assim Falou Zaratustra" e desestabiliza a escola e a família.',
      en: 'The subversive power of literature in a marginalized periphery. Young Lucas finds "Thus Spoke Zarathustra" in a landfill, transforming his entire world.',
      es: 'El poder emancipador de la lectura en la periferia. Un niño encuentra a Nietzsche y revoluciona su entorno.',
      fr: 'Le pouvoir émancipateur de la pensée philosophique. Un enfant des favelas trouve Nietzsche et bouscule tout son entourage.',
    },
    lines: [
      {
        id: 'nietz-1',
        time: '00:20',
        speaker: 'Lucas (O Menino)',
        originalLang: 'pt',
        textOriginal: 'Que livro é esse aqui com esse nome esquisito? As-sim Fa-lou Za-ra-tus-tra...',
        text: {
          pt: 'Que livro é esse aqui com esse nome esquisito? As-sim Fa-lou Za-ra-tus-tra... de um tal de Friedrich Nietzsche...',
          en: 'What kind of book is this with such a strange title? Thus Spoke Zarathustra... by someone named Friedrich Nietzsche...',
          es: '¿Qué clase de libro es este con un nombre tan raro? Así Habló Zaratustra... de un tal Friedrich Nietzsche...',
          fr: 'Quel est ce livre au titre si étrange ? Ainsi Parlait Zarathoustra... d\'un certain Friedrich Nietzsche...',
        },
        cinematicNote: {
          pt: 'O livro surge como elemento mágico no lixão: iluminação dourada e quebra de expectativas de gênero.',
          en: 'The discarded philosophy book appears almost magical: warm golden light breaking narrative conventions.',
          es: 'El libro surge como objeto mágico entre los desechos: luz dorada y ruptura de tópicos.',
          fr: 'Le livre philosophique surgit comme un trésor : lumière dorée et poésie urbaine.',
        },
      },
      {
        id: 'nietz-2',
        time: '01:05',
        speaker: 'Lucas Lendo para a Mãe',
        originalLang: 'pt',
        textOriginal: 'O homem é uma corda estendida entre o animal e o além-do-homem...',
        text: {
          pt: 'Mãe, escuta o que está escrito aqui: "O ser humano é uma corda estendida entre o animal e o além-do-humano — uma corda sobre um abismo."',
          en: 'Mom, listen to what it says here: "Man is a rope stretched between the animal and the overman — a rope over an abyss."',
          es: 'Mamá, escucha lo que dice aquí: "El hombre es una cuerda tendida entre la bestia y el superhombre: una cuerda sobre el abismo."',
          fr: 'Maman, écoute ce qui est écrit : « L\'homme est une corde tendue entre la bête et le surhomme — une corde sur un abîme. »',
        },
        cinematicNote: {
          pt: 'O close-up no rosto da mãe retrata o assombro e o despertar da imaginação crítica.',
          en: 'Close-up on the mother\'s face capturing wonder and the spark of intellectual awakening.',
          es: 'Primer plano de la madre captando el asombro y el despertar del pensamiento crítico.',
          fr: 'Gros plan sur le visage de la mère, saisissant l\'éveil et l\'émotion de la découverte.',
        },
      },
    ],
  },
  'film-extra-heroi': {
    filmId: 'film-extra-heroi',
    sceneTitle: {
      pt: 'O Duelo na Chuva: A Música e a Lâmina (Herói - Dir. Zhang Yimou / Fotografia Christopher Doyle)',
      en: 'The Duel in the Rain: Sound and Swordplay (Hero - Dir. Zhang Yimou)',
      es: 'El Duelo en la Lluvia: El Sonido y la Espada (Héroe - Dir. Zhang Yimou)',
      fr: 'Le Duel sous la Pluie : Musique et Lame Silencieuse (Hero - Zhang Yimou)',
    },
    contextNote: {
      pt: 'A mais perfeita fusão entre som, cor e coreografia marcial. O duelo entre Sem-Nome (Jet Li) e Céu (Donnie Yen) se desenrola primeiro no plano mental guiado pelo instrumento tradicional Guqin.',
      en: 'Flawless synergy of sound design, color palette, and wuxia choreography. The duel unfolds first in mental premonition guided by the ancient Guqin zither.',
      es: 'Sublime fusión entre diseño sonoro, color y combate de artes marciales. El duelo ocurre primero en la mente al compás del Guqin.',
      fr: 'Fusion magistrale entre son, chromatisme et chorégraphie martiale. Le combat se joue d\'abord en pensée au son du Guqin.',
    },
    lines: [
      {
        id: 'hero-1',
        time: '00:30',
        speaker: 'Céu (Donnie Yen)',
        originalLang: 'zh',
        textOriginal: '你是为了我的剑而来，还是为了秦王的悬赏？',
        text: {
          pt: 'Você veio aqui pela minha lança ou pela recompensa oferecida pelo Rei de Qin?',
          en: 'Did you come here for my spear, or for the bounty offered by the King of Qin?',
          es: '¿Has venido por mi lanza o por la recompensa ofrecida por el Rey de Qin?',
          fr: 'Es-tu venu pour ma lance, ou pour la prime promise par le Roi de Qin ?',
        },
        cinematicNote: {
          pt: 'A chuva goteja em câmera lenta (120 fps): o tempo é dilatado para intensificar a percepção sensorial.',
          en: 'Rain falling at 120 fps in ultra slow-motion: dilation of physical time for sensorial hyper-focus.',
          es: 'Lluvia en cámara lenta extrema: dilatación temporal para agudizar la percepción sensorial.',
          fr: 'Pluie filmée à 120 images/seconde : le temps ralentit pour démultiplier la tension.',
        },
      },
      {
        id: 'hero-2',
        time: '01:10',
        speaker: 'Sem-Nome (Jet Li)',
        originalLang: 'zh',
        textOriginal: '在真正交锋之前，剑客的心早已在琴声中过招。',
        text: {
          pt: 'Antes do primeiro golpe de espada, mestres de esgrima já combateram mil vezes nas notas do instrumento.',
          en: 'Before the swords even clash, true masters have already crossed blades a thousand times in the music.',
          es: 'Antes de chocar las espadas, los verdaderos maestros ya han cruzado filos mil veces en la melodía.',
          fr: 'Avant même le premier choc des lames, les maîtres ont déjà croisé le fer mille fois au rythme de la musique.',
        },
        cinematicNote: {
          pt: 'Conceito oriental de Wu Wei e a caligrafia chinesa como matriz do movimento cinematográfico.',
          en: 'Taoist concept of Wu Wei and Chinese calligraphy as the kinetic matrix of cinematic staging.',
          es: 'Filosofía del Wu Wei y caligrafía como raíz del movimiento coreográfico en pantalla.',
          fr: 'Le Wu Wei et la calligraphie chinoise comme matrice poétique du mouvement au cinéma.',
        },
      },
    ],
  },
  'film-extra-heroi-cores': {
    filmId: 'film-extra-heroi-cores',
    sceneTitle: {
      pt: 'As 5 Variações Cromáticas: A Cor como Linguagem Narrativa (Herói - Christopher Doyle)',
      en: 'The 5 Chromatic Variations: Color as Narrative Language (Hero - Christopher Doyle)',
      es: 'Las 5 Variaciones Cromáticas: El Color como Narrativa (Héroe)',
      fr: 'Les 5 Variations Chromatiques : La Couleur comme Langage Dramatique (Hero)',
    },
    contextNote: {
      pt: 'Christopher Doyle e Zhang Yimou utilizam cinco cores dominantes (Vermelho, Azul, Branco, Verde e Preto) para contar a mesma história sob cinco perspectivas psicológicas distintas.',
      en: 'Christopher Doyle and Zhang Yimou utilize five dominant color palettes (Red, Blue, White, Green, and Black) to depict differing emotional truths of the same tale.',
      es: 'Cinco paletas cromáticas fundamentales (Rojo, Azul, Blanco, Verde y Negro) para narrar la verdad desde cinco prismas emocionales.',
      fr: 'Cinq palettes chromatiques majeures (Rouge, Bleu, Blanc, Vert, Noir) pour explorer les facettes psychologiques de la vérité.',
    },
    lines: [
      {
        id: 'heroc-1',
        time: '00:20',
        speaker: 'Christopher Doyle (Diretor de Fotografia)',
        originalLang: 'en',
        textOriginal: 'Color is not decoration in cinema; color is emotion, temperature, and deception.',
        text: {
          pt: 'A cor no cinema não é mero adorno visual: a cor é emoção pura, temperatura psicológica e revelação dramática.',
          en: 'Color in cinema is not decoration; color is raw emotion, psychological temperature, and dramatic revelation.',
          es: 'El color en el cine no es decoración: el color es emoción, temperatura anímica y verdad dramática.',
          fr: 'Au cinéma, la couleur n\'est pas un décor : la couleur est émotion brute, température psychologique et vérité.',
        },
        cinematicNote: {
          pt: 'A paleta vermelha simboliza o ciúme cego e a paixão destrutiva no bosque de folhas de outono.',
          en: 'The blazing red palette embodies blind jealousy and destructive romantic passion amidst swirling autumn leaves.',
          es: 'La paleta roja simboliza los celos ciegos y la pasión desbordada en el bosque otoñal.',
          fr: 'La palette rouge incandescent incarne la jalousie aveugle et la passion dévorante sous les feuilles d\'or.',
        },
      },
    ],
  },
};
