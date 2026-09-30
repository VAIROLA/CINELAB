import { Language } from './translations.js';

export interface FilmTranslation {
  title: string;
  originalTitle?: string;
  synopsis: string;
  whyWatch: string;
  whatToObserve?: string;
  observationActivity?: string;
  audioTrackLabel?: string;
  badge?: string;
}

export interface ReadingTranslation {
  title: string;
  author?: string;
  suggestedChapter?: string;
  summary?: string;
  whyRead: string;
}

export const FILM_TRANSLATIONS: Record<string, Record<Language, FilmTranslation>> = {
  'film-1': {
    pt: {
      title: 'Ilha das Flores',
      originalTitle: 'Ilha das Flores',
      synopsis: 'Um tomate é plantado, colhido, vendido no supermercado, apodrece e é jogado no lixo da Ilha das Flores, em Porto Alegre. Lá, crianças e mulheres disputam o que os porcos rejeitaram. Uma reflexão contundente e irônica sobre o sistema capitalista e a dignidade humana.',
      whyWatch: 'Considerado pela ABRACCINE o maior curta-metragem brasileiro de todos os tempos. Uma obra-prima da montagem e da relação entre texto e imagem.',
      whatToObserve: 'Observe como imagem, narração, som e montagem constroem a narrativa satírica e política através de cortes rápidos de arquivo e narração enciclopédica.',
      observationActivity: 'Anote como o diretor utiliza o conceito de "tomate" para conectar biologia, economia, desigualdade social e dignidade humana em apenas 13 minutos.',
      audioTrackLabel: '🇧🇷 Áudio Original em Português',
    },
    en: {
      title: 'Isle of Flowers (Ilha das Flores)',
      originalTitle: 'Ilha das Flores',
      synopsis: 'A tomato is planted, harvested, sold at a supermarket, rots, and is discarded in the dump of Isle of Flowers in Porto Alegre. There, poor women and children salvage what pigs have rejected. A powerful and biting satire on capitalism, economic inequality, and human dignity.',
      whyWatch: 'Voted by Brazilian film critics (ABRACCINE) as the greatest Brazilian short film of all time. A masterpiece of editing, voice-over irony, and cinematic juxtaposition.',
      whatToObserve: 'Observe how archival footage, documentary realism, fast-paced montage, and encyclopedic narration combine to deliver devastating social criticism.',
      observationActivity: 'Note how the director uses the simple concept of a "tomato" to bridge biology, currency, supply chains, poverty, and human rights in just 13 minutes.',
      audioTrackLabel: '🇧🇷 Original Portuguese Audio (Subtitles Available)',
    },
    es: {
      title: 'Isla de las Flores (Ilha das Flores)',
      originalTitle: 'Ilha das Flores',
      synopsis: 'Un tomate se siembra, se cosecha, se vende en un supermercado, se pudre y termina en el vertedero de la Isla de las Flores en Porto Alegre. Allí, mujeres y niños pobres compiten por lo que los cerdos han rechazado. Una sátira mordaz sobre el capitalismo y la dignidad humana.',
      whyWatch: 'Considerado por la crítica cinematográfica brasileña como el mejor cortometraje nacional de todos los tiempos. Una obra cumbre del montaje y del ensayo fílmico.',
      whatToObserve: 'Analiza cómo la imagen, la voz en off enciclopédica, el ritmo y el montaje construyen una sátira política demoledora con material de archivo.',
      observationActivity: 'Apunta cómo el director parte de un tomate para enlazar biología, libre comercio, deshumanización y desigualdad social en 13 minutos.',
      audioTrackLabel: '🇧🇷 Audio Original en Portugués',
    },
    fr: {
      title: 'L\'Île aux Fleurs (Ilha das Flores)',
      originalTitle: 'Ilha das Flores',
      synopsis: 'Une tomate est cultivée, récoltée, vendue dans un supermarché, pourrit et finit dans la décharge de l\'Île aux Fleurs à Porto Alegre. Là-bas, des femmes et des enfants démunis trient ce que les porcs ont délaissé. Un essai satirique poignant sur le capitalisme et la condition humaine.',
      whyWatch: 'Élu meilleur court-métrage brésilien de tous les temps. Un chef-d\'œuvre absolu du montage cinématographique et du dialogue entre texte et image.',
      whatToObserve: 'Observez comment images d\'archives, voix off encyclopédique, ruptures de ton et découpage composent une critique sociale percutante.',
      observationActivity: 'Analysez comment le réalisateur utilise le prétexte d\'une tomate pour relier biologie, économie de marché et dignité humaine en seulement 13 minutes.',
      audioTrackLabel: '🇧🇷 Audio Original en Portugais',
    },
  },
  'film-2': {
    pt: {
      title: 'O Encouraçado Potemkin (Battleship Potemkin)',
      originalTitle: 'Bronenosets Potyomkin (Battleship Potemkin)',
      synopsis: 'Em 1905, marinheiros do encouraçado russo Potemkin rebelam-se contra os oficiais tirânicos que os forçam a comer carne podre. O motim incendeia a cidade portuária de Odessa, onde o exército czarista reprime brutalmente a população civil na monumental escadaria.',
      whyWatch: 'A obra fundadora da montagem cinematográfica moderna. O nascimento das teorias de justaposição, choque de ideias e ritmo visual.',
      whatToObserve: 'Montagem, duração dos planos e construção de ritmo. Observe a famosa sequência da Escadaria de Odessa dissecando-a nas 6 camadas de análise fílmica.',
      observationActivity: 'Identifique a dilatação do tempo cinematográfico: como uma descida que levaria 2 minutos no mundo real é estendida para mais de 7 minutos na montagem.',
      audioTrackLabel: '🎼 Cinema Mudo • Trilha Sonora Orquestral',
    },
    en: {
      title: 'Battleship Potemkin',
      originalTitle: 'Bronenosets Potyomkin (Battleship Potemkin)',
      synopsis: 'In 1905, sailors aboard the Russian battleship Potemkin mutiny against tyrannical officers who force them to eat maggot-infested meat. The uprising sparks solidarity across the port city of Odessa, leading to the Tsarist army\'s ruthless massacre on the monumental steps.',
      whyWatch: 'The seminal masterpiece of modern film montage. The birthplace of dialectical juxtaposition, intellectual shock cuts, and visual rhythm.',
      whatToObserve: 'Montage theory in practice: shot lengths, geometric vectors, and emotional pacing. Dissect the world-famous Odessa Steps sequence across its editing layers.',
      observationActivity: 'Examine temporal elongation: observe how a stairway descent that would take 2 real-time minutes is expanded into over 7 suspenseful minutes in the edit.',
      audioTrackLabel: '🎼 Silent Cinema • Orchestral Score',
    },
    es: {
      title: 'El Acorazado Potemkin',
      originalTitle: 'Bronenosets Potyomkin',
      synopsis: 'En 1905, los marineros del acorazado Potemkin se amotinan contra los oficiales zaristas por las condiciones inhumanas y la comida putrefacta. El motín desata el apoyo popular en el puerto de Odesa, donde las tropas imperiales reprimen salvajemente a la multitud civil en la escalinata.',
      whyWatch: 'La obra fundacional del montaje cinematográfico contemporáneo. El nacimiento de las teorías de choque visual, ritmo métrico y dramaturgia del plano.',
      whatToObserve: 'El ritmo del montaje y la composición gráfica de los encuadres. Observa la mítica secuencia de la escalinata de Odesa y la contraposición de fuerzas.',
      observationActivity: 'Identifica la dilatación del tiempo fílmico: cómo una bajada que duraría 2 minutos en la realidad se expande a más de 7 minutos mediante el corte.',
      audioTrackLabel: '🎼 Cine Mudo • Banda Sonora Orquestal',
    },
    fr: {
      title: 'Le Cuirassé Potemkine',
      originalTitle: 'Bronenosets Potyomkin',
      synopsis: 'En 1905, les marins du cuirassé Potemkine se révoltent contre les officiers tsaristes à la suite d\'une ration de viande avariée. L\'insurrection gagne la ville portuaire d\'Odessa, où l\'armée tsariste réprime impitoyablement la foule réunie sur le grand escalier.',
      whyWatch: 'L\'œuvre fondatrice du montage moderne au cinéma. La naissance du montage intellectuel, du choc dialectique des plans et du rythme visuel.',
      whatToObserve: 'La théorie du montage en action : durées des plans, contrastes de mouvements et dramaturgie visuelle dans la célèbre séquence de l\'Escalier d\'Odessa.',
      observationActivity: 'Analysez la dilatation du temps filmique : observez comment une descente d\'escalier de 2 minutes réelles s\'étire sur plus de 7 minutes au montage.',
      audioTrackLabel: '🎼 Cinéma Muet • Partition Orchestrale',
    },
  },
  'film-3': {
    pt: {
      title: 'O Sanduíche',
      originalTitle: 'O Sanduíche',
      synopsis: 'Dois casais em apartamentos idênticos e momentos temporais entrelaçados discutem o fim de seus relacionamentos em torno de um sanduíche. Uma aula impecável sobre decupagem, texto, subtexto e unidade de espaço dramático.',
      whyWatch: 'Aula magistral de unidade de espaço, tempo, diálogos com subtexto denso e decupagem impecável em padrão de roteiro.',
      whatToObserve: 'Diálogos cruzados, revelação gradual de informações ocultas e economia de elementos cênicos. A comida como catalisador de tensões amorosas.',
      observationActivity: 'Mapeie o subtexto na conversa dos dois casais: como o que eles dizem superficialmente diverge do conflito real que os consome internamente.',
      audioTrackLabel: '🇧🇷 Áudio Original em Português',
    },
    en: {
      title: 'The Sandwich (O Sanduíche)',
      originalTitle: 'O Sanduíche',
      synopsis: 'Two couples in identical apartments, their timelines subtly intertwined, dissect the demise of their romantic relationships over a sandwich. A masterclass in screenwriting economy, subtext, and single-location scene staging.',
      whyWatch: 'An extraordinary study in unity of time and space, razor-sharp dialogue with dense subtext, and precise script breakdown.',
      whatToObserve: 'Parallel conversations, gradual disclosure of hidden emotional stakes, and minimalist prop usage. Food as a psychological catalyst.',
      observationActivity: 'Map the dramatic subtext: analyze how polite surface conversations mask the deep existential grievances between the characters.',
      audioTrackLabel: '🇧🇷 Original Portuguese Audio',
    },
    es: {
      title: 'El Sándwich (O Sanduíche)',
      originalTitle: 'O Sanduíche',
      synopsis: 'Dos parejas en departamentos idénticos, con tiempos entrelazados, debaten el final de sus relaciones en torno a un sándwich. Una lección magistral de guion, subtexto y unidad espacial.',
      whyWatch: 'Clase magistral de dramaturgia en espacio cerrado, diálogos cargados de subtexto y desglose técnico impecable.',
      whatToObserve: 'Diálogos cruzados, revelación paulatina de secretos y economía de recursos escénicos. El sándwich como detonante dramático.',
      observationActivity: 'Mapea el subtexto: cómo las palabras amables ocultan el resentimiento y el desmoronamiento de la pareja.',
      audioTrackLabel: '🇧🇷 Audio Original en Portugués',
    },
    fr: {
      title: 'Le Sandwich (O Sanduíche)',
      originalTitle: 'O Sanduíche',
      synopsis: 'Deux couples dans des appartements identiques, aux temporalités entrelacées, discutent de la fin de leur relation autour d\'un sandwich. Une leçon remarquable d\'écriture de scénario, de sous-texte et d\'unité de lieu.',
      whyWatch: 'Une démonstration magistrale d\'unité spatiale, de précision dialoguée et de découpage technique rigoureux.',
      whatToObserve: 'Le croisement des dialogues, la révélation progressive des non-dits et l\'économie des accessoires comme moteurs de tension dramatique.',
      observationActivity: 'Repérez le sous-texte : analysez comment les échanges superficiels dissimulent l\'angoisse et la rupture amoureuse.',
      audioTrackLabel: '🇧🇷 Audio Original en Portugais',
    },
  },
  'film-4': {
    pt: {
      title: 'Dona Cristina Perdeu a Memória',
      originalTitle: 'Dona Cristina Perdeu a Memória',
      synopsis: 'Um menino de 8 anos faz amizade com uma senhora idosa vizinha que sofre de perda de memória. Juntos, trocam objetos, histórias inventadas e constroem um vínculo afetuoso inesquecível. Um estudo comovente sobre direção de atores mirins e seniores.',
      whyWatch: 'Uma aula de direção sensível de atores, com interação íntima entre um ator mirim estreante e uma atriz sênior consagrada.',
      whatToObserve: 'O tom das atuações, as pausas, a modulação de voz, os olhares de cumplicidade e a sutileza na movimentação dos corpos em cena.',
      observationActivity: 'Observe como a diretora trabalha os primeiros planos para registrar o nascimento da amizade e a troca de memórias sem cair no melodrama fácil.',
      audioTrackLabel: '🇧🇷 Áudio Original em Português',
    },
    en: {
      title: 'Dona Cristina Lost Her Memory',
      originalTitle: 'Dona Cristina Perdeu a Memória',
      synopsis: 'An eight-year-old boy befriends an elderly neighbor experiencing memory loss. Together, they trade everyday artifacts, fabricate playful stories, and forge a tender intergenerational bond. A touching study in directing child and senior actors.',
      whyWatch: 'A masterclass in sensitive actor direction, capturing delicate human interaction between an untrained child performer and a seasoned veteran.',
      whatToObserve: 'Naturalistic vocal cadence, expressive silences, blocking, and non-verbal intimacy between the two central performers.',
      observationActivity: 'Analyze close-up camera choices that tenderly portray memory exchange and authentic emotional connection without falling into easy melodrama.',
      audioTrackLabel: '🇧🇷 Original Portuguese Audio',
    },
    es: {
      title: 'Doña Cristina Perdió la Memoria',
      originalTitle: 'Dona Cristina Perdeu a Memória',
      synopsis: 'Un niño de 8 años se hace amigo de una anciana vecina con problemas de memoria. Juntos intercambian objetos, inventan recuerdos y crean una complicidad entrañable. Una lección magistral de dirección de actores infantiles y de tercera edad.',
      whyWatch: 'Clase de dirección sensible de actores: la química orgánica entre un niño debutante y una actriz consagrada.',
      whatToObserve: 'El tempo actoral, las miradas, las pausas elocuentes y el uso respetuoso del primer plano.',
      observationActivity: 'Examina cómo la cámara registra el nacimiento del afecto y el valor de la memoria afectiva sin recurrir a golpes bajos.',
      audioTrackLabel: '🇧🇷 Audio Original en Portugués',
    },
    fr: {
      title: 'Dona Cristina a Perdu la Mémoire',
      originalTitle: 'Dona Cristina Perdeu a Memória',
      synopsis: 'Un garçonnet de 8 ans se lie d\'amitié avec sa vieille voisine qui perd la mémoire. Ensemble, ils échangent des objets insolites, inventent des souvenirs et tissent une complicité bouleversante. Un modèle de direction d\'acteurs enfants et seniors.',
      whyWatch: 'Une leçon de direction d\'acteurs tout en finesse et pudeur, explorant la rencontre intime entre deux générations.',
      whatToObserve: 'Le naturel des répliques, le silence habité, les regards complices et la justesse des cadres en plan rapproché.',
      observationActivity: 'Observez comment le cadrage met en valeur l\'écoute et la transmission de mémoire sans jamais sombrer dans le mélodrame facile.',
      audioTrackLabel: '🇧🇷 Audio Original en Portugais',
    },
  },
  'film-5': {
    pt: {
      title: 'A Noite dos Mortos-Vivos (Night of the Living Dead) – Versão Dublada',
      originalTitle: 'Night of the Living Dead (Dublagem Clássica em Português)',
      synopsis: 'Um grupo de estranhos busca refúgio em uma casa isolada na Pensilvânia rural cercada por mortos-vivos canibais. À medida que o cerco aperta, os conflitos internos entre os sobreviventes mostram-se mais mortais que as criaturas no exterior.',
      whyWatch: 'Obra-prima do cinema independente mundial com DUBLAGEM COMPLETA EM PORTUGUÊS. Realizada com orçamento ultrarreduzido em película 35mm P&B, é uma autêntica aula de Direção de Fotografia, alto contraste, luz e sombra (chiaroscuro) e iluminação de set prática.',
      whatToObserve: 'A iluminação de alto contraste no ambiente fechado da casa; como luzes diretas de tungstênio desenham sombras expressionistas nos rostos; os ângulos dramáticos de câmera e a profundidade de campo obtida sem equipamentos milionários.',
      observationActivity: 'Analise a cena em que os personagens protegem as portas e janelas: descreva como a luz corta a penumbra do cômodo e cria tensão psicológica sem necessidade de refletores sofisticados.',
      audioTrackLabel: '🎙️ Filme Completo Dublado em Português (HD)',
    },
    en: {
      title: 'Night of the Living Dead (Dubbed Version)',
      originalTitle: 'Night of the Living Dead',
      synopsis: 'A ragtag group of strangers barricades inside a rural Pennsylvania farmhouse besieged by reanimated, flesh-eating ghouls. As terror escalates outside, claustrophobia and racial/social friction inside prove just as fatal.',
      whyWatch: 'A landmark independent film masterpiece featuring FULL DUBBING. Produced on a shoestring budget in high-contrast 35mm black & white, it serves as the ultimate masterclass in low-budget cinematography, chiaroscuro lighting, and practical staging.',
      whatToObserve: 'Expressionistic chiaroscuro lighting, harsh tungsten single-source setups, dramatic low camera angles, and high depth of field crafted without expensive gear.',
      observationActivity: 'Analyze the window-barricading sequence: examine how single-source rim lights slice through darkness to heighten psychological dread.',
      audioTrackLabel: '🎙️ Full Feature Dubbed in Portuguese (HD)',
    },
    es: {
      title: 'La Noche de los Muertos Vivientes (Versión Doblada)',
      originalTitle: 'Night of the Living Dead',
      synopsis: 'Un grupo dispar de personas se refugia en una granja abandonada asediada por zombis caníbales. Encerrados en la oscuridad, las tensiones internas y el pánico resultan tan letales como la amenaza exterior.',
      whyWatch: 'Hito fundacional del cine independiente con DOBLAJE COMPLETO. Rodada con presupuesto ínfimo en película blanco y negro de 35mm, es una lección maestra de iluminación chiaroscuro, fotografía de alto contraste y puesta en escena económica.',
      whatToObserve: 'La iluminación de alto contraste, las sombras expresionistas sobre los rostros, los ángulos picados y contrapicados y la profundidad de campo artesanal.',
      observationActivity: 'Examina la escena en que aseguran puertas y ventanas: describe cómo la luz corta la penumbra y crea tensión pura con recursos mínimos.',
      audioTrackLabel: '🎙️ Película Completa Doblada al Portugués (HD)',
    },
    fr: {
      title: 'La Nuit des Morts-Vivants (Version Doublée)',
      originalTitle: 'Night of the Living Dead',
      synopsis: 'Plusieurs personnes trouvent refuge dans une ferme isolée de Pennsylvanie cernée par des morts-vivants anthropophages. À l\'intérieur, l\'angoisse et les rivalités s\'avèrent aussi destructrices que les monstres au-dehors.',
      whyWatch: 'Chef-d\'œuvre du cinéma indépendant avec DOUBLAGE INTÉGRAL. Réalisé avec un micro-budget en 35mm noir et blanc, ce film est une leçon magistrale de direction de la photographie, de clair-obscur expressionniste et de mise en scène pratique.',
      whatToObserve: 'Le contraste dramatique des lumières tungstène, les ombres projetées sur les murs en bois et la profondeur de champ sans matériel coûteux.',
      observationActivity: 'Analysez la séquence de barricade : observez comment la lumière découpe l\'obscurité pour susciter une angoisse claustrophobe saisissante.',
      audioTrackLabel: '🎙️ Film Intégral Doublé en Portugais (HD)',
    },
  },
  'film-6': {
    pt: {
      title: 'Stalker',
      originalTitle: 'Stalker',
      synopsis: 'Um guia clandestino (Stalker) conduz um Escritor cético e um Físico desiludido através de uma terra proibida conhecida como a Zona, no centro da qual existe um Quarto lendário onde os desejos mais íntimos e secretos são realizados.',
      whyWatch: 'A maior referência mundial em desenho de som, ruídos de ambiente (soundscape), sintetizadores analógicos e o poder transcendental do silêncio.',
      whatToObserve: 'Silêncio, ambiente da Zona, ruídos mecânicos ritmados das vagonetas nos trilhos, água gotejando e o espaço acústico em camadas.',
      observationActivity: 'Identifique 3 momentos em que o som antecipa o perigo ou a presença de algo sobrenatural antes que a câmera ou a imagem revelem o evento.',
      audioTrackLabel: '💬 Legendado em Português (PT-BR)',
    },
    en: {
      title: 'Stalker',
      originalTitle: 'Stalker',
      synopsis: 'A clandestine guide known as the Stalker leads a disillusioned Writer and a melancholic Scientist through the hazardous, surreal terrain of the Zone, seeking a rumored Room said to fulfill one\'s deepest subconscious desires.',
      whyWatch: 'The ultimate world benchmark for cinematic sound design, ambient soundscapes, analog synthesis, and the metaphysical potency of acoustic space and silence.',
      whatToObserve: 'The acoustic anatomy of the Zone: rhythmic rail car vibrations, dripping water, synthesized drones, and the delicate tension between sound and silence.',
      observationActivity: 'Pinpoint 3 instances where off-screen audio design introduces threat or supernatural presence before the camera visually reveals it.',
      audioTrackLabel: '💬 Subtitled in Portuguese (PT-BR)',
    },
    es: {
      title: 'Stalker',
      originalTitle: 'Stalker',
      synopsis: 'Un guía clandestino (el Stalker) conduce a un Escritor escéptico y a un Científico taciturno a través de la misteriosa Zona, en cuyo centro se rumorea que existe una Habitación donde se cumplen los deseos más ocultos del alma humana.',
      whyWatch: 'El mayor referente mundial de diseño de sonido cinematográfico, paisaje sonoro ambiental, ruidos diegéticos y el poder místico del silencio.',
      whatToObserve: 'El ambiente sonoro de la Zona, el traqueteo hipnótico de las vagonetas, el goteo constante y la espacialidad acústica tridimensional.',
      observationActivity: 'Localiza 3 momentos en que el sonido anuncia un peligro o fenómeno metafísico antes de que aparezca en la imagen.',
      audioTrackLabel: '💬 Subtitulada en Portugués (PT-BR)',
    },
    fr: {
      title: 'Stalker',
      originalTitle: 'Stalker',
      synopsis: 'Un passeur clandestin, le Stalker, guide un Écrivain désabusé et un Scientifique tourmenté à travers les pièges de la Zone, territoire mystérieux abritant une Chambre secrète réputée exaucer les vœux les plus enfouis de l\'être humain.',
      whyWatch: 'La référence absolue du design sonore cinématographique, du paysage acoustique (soundscape), des synthétiseurs atmosphériques et du silence méditatif.',
      whatToObserve: 'La matière acoustique de la Zone : le roulement métallique de la draisine, l\'écho des gouttes d\'eau et la spatialisation immersive du hors-champ.',
      observationActivity: 'Identifiez 3 moments où le travail sonore suggère un danger invisible ou une présence surnaturelle bien avant que l\'image ne le dévoile.',
      audioTrackLabel: '💬 Sous-titré en Portugais (PT-BR)',
    },
  },
  'film-7': {
    pt: {
      title: 'O Encouraçado Potemkin – Cena da Escadaria de Odessa',
      originalTitle: 'Bronenosets Potyomkin – Odessa Steps Sequence',
      synopsis: 'A icônica sequência da repressão militar czarista descendo em linha implacável contra o povo na escadaria monumental de Odessa. Do terror popular ao carrinho de bebê que desce desgovernado pelos degraus.',
      whyWatch: 'A sequência de montagem mais estudada nas escolas de cinema de todo o mundo. A teoria do corte métrico, rítmico e intelectual em ação.',
      whatToObserve: 'Montagem rítmica acelerada, contraste de direção de movimento (soldados descendo vs povo subindo), cortes de detalhe e o carrinho de bebê descendo.',
      observationActivity: 'Analise como a alternância entre planos gerais dos degraus e closes da mãe desesperada gera comoção imediata e sensação de impotência.',
      audioTrackLabel: '🎼 Cinema Mudo • Trilha Sonora Orquestral',
    },
    en: {
      title: 'Battleship Potemkin – The Odessa Steps Scene',
      originalTitle: 'Bronenosets Potyomkin – Odessa Steps Sequence',
      synopsis: 'The legendary massacre sequence where Tsarist Cossack soldiers march relentlessly down the massive Odessa steps, firing on civilians. Highlights include the tragic descent of the runaway baby carriage.',
      whyWatch: 'The most dissected editing sequence in film school history worldwide. Soviet montage theory (metric, rhythmic, tonal, and intellectual) in pure kinetic form.',
      whatToObserve: 'Rapid montage acceleration, vector opposition (soldiers marching down vs. civilians fleeing upward), macro vs. micro close-ups, and the baby carriage kinetic motion.',
      observationActivity: 'Analyze how cutting between vast geometric wide shots and poignant close-ups generates unbearable tension and profound empathy.',
      audioTrackLabel: '🎼 Silent Film • Orchestral Score',
    },
    es: {
      title: 'El Acorazado Potemkin – La Escalinata de Odesa',
      originalTitle: 'Bronenosets Potyomkin – Escena de la Escalinata',
      synopsis: 'La mítica escena de la represión zarista bajando implacable contra la multitud indefensa en la escalinata monumental de Odesa, culminando con el descenso del cochecito de bebé.',
      whyWatch: 'La secuencia de montaje más estudiada en las escuelas de cine del planeta. Pura teoría del montaje rítmico, tonal y dialéctico.',
      whatToObserve: 'Contraste de vectores de movimiento, cortes de detalle angustiantes y el ritmo acelerado del descenso.',
      observationActivity: 'Estudia cómo la alternancia de planos generales del gentío con primeros planos desgarradores despierta indignación y compasión instantáneas.',
      audioTrackLabel: '🎼 Cine Mudo • Banda Sonora Orquestal',
    },
    fr: {
      title: 'Le Cuirassé Potemkine – La Scène des Escaliers d\'Odessa',
      originalTitle: 'Bronenosets Potyomkin – Séquence de l\'Escalier d\'Odessa',
      synopsis: 'La célèbre scène du massacre de la population d\'Odessa sur les marches de l\'escalier monumental par les soldats du Tsar, culminant avec la chute tragique du landau.',
      whyWatch: 'La séquence de découpage la plus célèbre de l\'histoire du cinéma. Mise en pratique magistrale des principes de montage rythmique, métrique et émotionnel.',
      whatToObserve: 'L\'opposition dynamique des directions de mouvement, le découpage en rafale et la gestion de la panique collective par le gros plan.',
      observationActivity: 'Analysez comment l\'alternance de plans d\'ensemble géométriques et de visages horrifiés intensifie la tragédie humaine.',
      audioTrackLabel: '🎼 Cinéma Muet • Partition Orchestrale',
    },
  },
  'film-8': {
    pt: {
      title: 'Bastidores & Making Of de Produção Audiovisual Profissional',
      originalTitle: 'Dinâmica de um Set de Filmagem Profissional',
      synopsis: 'Imersão completa no funcionamento diário de um set de filmagem profissional: a distribuição das funções da equipe técnica, hierarquia de produção, cronograma de gravação e resolução de imprevistos.',
      whyWatch: 'Visualizar a mecânica de um set de verdade: a relação entre assistente de direção, continuísta, fotógrafo, maquinária, som direto e atores.',
      whatToObserve: 'A hierarquia respeitosa no set, o controle da ordem do dia, os testes de luz antes da chamada dos atores e a resolução ágil de imprevistos climáticos.',
      observationActivity: 'Aponte três situações em que a organização da produção executiva evitou desperdício de tempo e assegurou o cronograma da diária.',
      audioTrackLabel: '🇧🇷 Áudio Original em Português',
    },
    en: {
      title: 'Behind the Scenes & Professional Film Production Making-Of',
      originalTitle: 'Dinâmica de um Set de Filmagem Profissional',
      synopsis: 'A comprehensive, realistic behind-the-scenes walkthrough of an active professional film set: crew hierarchy, department interactions, call sheet discipline, lighting setups, and production troubleshooting.',
      whyWatch: 'Understand the authentic workflow of a real film set: the vital cooperation between director, 1st AD, script supervisor, DP, gaffer, sound mixer, and cast.',
      whatToObserve: 'On-set protocol, call sheet timekeeping, rehearsals, lighting tests before talent arrival, and rapid troubleshooting of unforeseen issues.',
      observationActivity: 'Identify three critical moments where executive planning and clear department communication saved time and kept the shooting schedule on track.',
      audioTrackLabel: '🇧🇷 Original Portuguese Audio',
    },
    es: {
      title: 'Detrás de Cámaras y Making Of de Producción Audiovisual Profesional',
      originalTitle: 'Dinámica de un Set de Rodaje Profesional',
      synopsis: 'Inmersión integral en el trabajo cotidiano de un set de filmación profesional: jerarquías técnicas, departamentos, hoja de llamado y solución rápida de contingencias.',
      whyWatch: 'Comprender la dinámica real de un rodaje: la relación entre director, asistente de dirección, continuista, director de foto, sonido directo y actores.',
      whatToObserve: 'La disciplina en el set, el manejo de tiempos según la orden del día y la coordinación de cámara e iluminación.',
      observationActivity: 'Señala tres situaciones en las que la planificación de producción evitó pérdidas de tiempo y preservó el cronograma de rodaje.',
      audioTrackLabel: '🇧🇷 Audio Original en Portugués',
    },
    fr: {
      title: 'Dans les Coulisses et Making-Of de Production Audiovisuelle Professionnelle',
      originalTitle: 'Dynamique d\'un Plateau de Tournage Professionnel',
      synopsis: 'Immersion complète dans les rouages d\'un plateau de tournage professionnel : hiérarchie technique, rôles d\'équipe, feuille de service et gestion des imprévus de production.',
      whyWatch: 'Observer la mécanique d\'un véritable tournage : la synergie entre réalisateur, premier assistant, scripte, chef opérateur, machinerie et comédiens.',
      whatToObserve: 'La rigueur des horaires, les répétitions de cadre et d\'éclairage avant la venue des comédiens et la communication inter-équipes.',
      observationActivity: 'Relevez trois exemples où la préparation méticuleuse de la production a permis de respecter la feuille de service quotidienne.',
      audioTrackLabel: '🇧🇷 Audio Original en Portugais',
    },
  },
  'film-9': {
    pt: {
      title: 'Recife Frio',
      originalTitle: 'Recife Frio (Cold Tropics)',
      synopsis: 'Um misterioso fenômeno meteorológico faz nevar pela primeira vez na história na ensolarada cidade tropical do Recife. Gravado sob a estética de um telejornal internacional investigativo, o filme retrata o impacto cultural, social e arquitetônico da mudança climática repentina.',
      whyWatch: 'Um dos curtas mais premiados da história do cinema brasileiro recente (mais de 50 prêmios). Aula de falso documentário e divulgação mercadológica.',
      whatToObserve: 'A estética de telejornalismo estrangeiro cobrindo uma tragédia bizarra, a força da premissa cômica e dramática, o cartaz icônico e a circulação em festivais.',
      observationActivity: 'Identifique como a logline ("Uma mudança climática sem explicação faz nevar no Recife tropical") gerou interesse imediato de festivais no mundo inteiro.',
      audioTrackLabel: '🇧🇷 Áudio Original em Português',
    },
    en: {
      title: 'Cold Tropics (Recife Frio)',
      originalTitle: 'Recife Frio',
      synopsis: 'An inexplicable meteorological event brings freezing temperatures and snow to the historically sweltering, tropical coastal city of Recife, Brazil. Formatted as an international television documentary, the film dissects the cultural, economic, and architectural fallout.',
      whyWatch: 'One of the most acclaimed and awarded shorts in modern Brazilian cinema (50+ awards worldwide). A masterclass in mockumentary tone, world-building, and high-concept festival positioning.',
      whatToObserve: 'The journalistic mockumentary style, deadpan humor intertwined with social critique, arresting visual gags, and festival marketing appeal.',
      observationActivity: 'Analyze how the high-concept logline ("Sudden climate change causes snow in tropical Recife") sparked viral interest across international film festivals.',
      audioTrackLabel: '🇧🇷 Original Portuguese Audio (Subtitles Available)',
    },
    es: {
      title: 'Recife Frío (Recife Frio)',
      originalTitle: 'Recife Frio',
      synopsis: 'Un fenómeno meteorológico insólito provoca nevadas en la calurosa ciudad tropical de Recife. Filmada con el formato de un reportaje televisivo extranjero, la obra aborda con ironía los cambios sociales y urbanos.',
      whyWatch: 'Uno de los cortometrajes más galardonados del cine brasileño contemporáneo (+50 premios). Modelo de falso documental y estrategia de festivales.',
      whatToObserve: 'El tono paródico de telediario internacional, la originalidad de la premisa y la crítica social bajo una apariencia fantástica.',
      observationActivity: 'Identifica cómo la potente logline atrajo la atención inmediata de programadores de festivales internacionales.',
      audioTrackLabel: '🇧🇷 Audio Original en Portugués',
    },
    fr: {
      title: 'Recife Froid (Recife Frio)',
      originalTitle: 'Recife Frio',
      synopsis: 'Une vague de froid sans précédent fait neiger sur la ville tropicale de Recife. Conçu sous la forme d\'un reportage télévisé étranger, le film explore avec une ironie mordante les bouleversements culturels et sociaux engendrés.',
      whyWatch: 'L\'un des courts-métrages les plus primés de l\'histoire récente du cinéma brésilien (+50 prix). Une référence de faux documentaire et de stratégie en festival.',
      whatToObserve: 'Le style faux documentaire, la rigueur de la parodie journalistique et la satire sociale percutante dissimulée sous l\'absurde.',
      observationActivity: 'Analysez comment le concept percutant ("De la neige dans les tropiques brésiliens") a séduit les programmateurs de festivals du monde entier.',
      audioTrackLabel: '🇧🇷 Audio Original en Portugais',
    },
  },
  'film-10': {
    pt: {
      title: 'Mostra de Curtas-Metragens Independentes: Meu Amigo Nietzsche & Três Minutos',
      originalTitle: 'Mostra Curatorial de Cinema Independente',
      synopsis: 'Curadoria especial reunindo duas joias premiadas do cinema independente brasileiro: "Meu Amigo Nietzsche" (de Fáuston da Silva), sobre um menino da periferia que descobre a filosofia em um lixão, e "Três Minutos" (de Ana Luiza Azevedo), premiado em Cannes.',
      whyWatch: 'Grandes obras premiadas do cinema independente brasileiro, selecionadas pela coordenação pedagógica como referências de linguagem, economia de recursos e potência narrativa para inspirar o seu Projeto Final.',
      whatToObserve: 'A capacidade de emocionar em poucos minutos sem necessidade de efeitos caros; a precisão do corte, a iluminação expressiva e a verdade da atuação.',
      observationActivity: 'Compare seu próprio projeto final com os curtas exibidos, avaliando clareza de proposta, qualidade de som e intensidade da narrativa.',
      audioTrackLabel: '🇧🇷 Áudio Original em Português',
    },
    en: {
      title: 'Independent Short Film Showcase: My Friend Nietzsche & Three Minutes',
      originalTitle: 'Curated Independent Cinema Showcase',
      synopsis: 'A curated double-feature showcasing celebrated Brazilian independent cinema: "My Friend Nietzsche" (dir. Fáuston da Silva), following a favela boy who discovers philosophy at a junkyard, and "Three Minutes" (dir. Ana Luiza Azevedo), an official Cannes selection.',
      whyWatch: 'Award-winning benchmark independent short films, selected by our academic faculty as reference studies in narrative concision, resourceful production, and poetic visual staging for your Capstone Final Project.',
      whatToObserve: 'Narrative economy, emotional resonance achieved without costly CGI, truthful naturalistic acting, and crisp edit choices.',
      observationActivity: 'Benchmark your own final project against these shorts, evaluating thematic clarity, acoustic quality, and emotional focus.',
      audioTrackLabel: '🇧🇷 Original Portuguese Audio',
    },
    es: {
      title: 'Muestra de Cortometrajes Independientes: Mi Amigo Nietzsche y Tres Minutos',
      originalTitle: 'Muestra Curatorial de Cine Independiente',
      synopsis: 'Selección curatorial de dos cortometrajes galardonados: "Mi Amigo Nietzsche", sobre un niño humilde que descubre la filosofía en un vertedero, y "Tres Minutos", seleccionado en el Festival de Cannes.',
      whyWatch: 'Obras de referencia del cine independiente para inspirar tu Proyecto Final: economía de producción, hondura narrativa y lenguaje poético.',
      whatToObserve: 'La fuerza de los diálogos, la autenticidad actoral y el montaje preciso que emociona en pocos minutos.',
      observationActivity: 'Compara tu proyecto final con los cortometrajes presentados, analizando la concisión y la potencia de la historia.',
      audioTrackLabel: '🇧🇷 Audio Original en Portugués',
    },
    fr: {
      title: 'Festival de Courts-Métrages Indépendants : Mon Ami Nietzsche & Trois Minutes',
      originalTitle: 'Sélection Curiosité Cinéma Indépendant',
      synopsis: 'Double programme célébrant le cinéma indépendant brésilien : "Mon Ami Nietzsche", l\'histoire d\'un enfant défavorisé découvrant la philosophie, et "Trois Minutes", sélectionné au Festival de Cannes.',
      whyWatch: 'Deux œuvres couronnées en festivals, sélectionnées par l\'équipe pédagogique pour guider et inspirer la réalisation de votre Projet Final.',
      whatToObserve: 'L\'intensité émotionnelle créée avec des moyens modestes, la justesse du jeu d\'acteur et la précision du rythme.',
      observationActivity: 'Mettez votre projet de fin d\'études en perspective avec ces films, en évaluant la clarté dramatique et la qualité sonore.',
      audioTrackLabel: '🇧🇷 Audio Original en Portugais',
    },
  },
  'film-bonus-noite-americana': {
    pt: {
      title: 'A Noite Americana (La Nuit Américaine)',
      originalTitle: 'La Nuit Américaine (Day for Night)',
      synopsis: 'Uma declaração de amor apaixonada ao ofício de fazer cinema. Em Nice, uma equipe reúne-se nos estúdios Victorine para rodar um melodrama. Acompanhamos crises, romances, desafios técnicos e a obstinação do diretor para concluir o filme. Vencedor do Oscar de Melhor Filme Estrangeiro.',
      whyWatch: 'O filme definitivo sobre o cotidiano de um set de filmagem real. Mostra os bastidores da produção: o estresse do cronograma, as relações humanas complexas e a clássica técnica da "Noite Americana" (Day for Night).',
      whatToObserve: 'A técnica de filmar com filtros de dia-por-noite, a liderança do diretor Ferrand (o próprio Truffaut), e a solução inventiva de problemas de set.',
      observationActivity: 'Anote como François Truffaut equilibra a dimensão técnica com a gestão emocional da equipe em produções cinematográficas.',
      audioTrackLabel: '💬 Legendado em Português (PT-BR)',
      badge: 'BÔNUS EXTRA • CLÁSSICO DO SET DE FILMAGEM',
    },
    en: {
      title: 'Day for Night (La Nuit Américaine)',
      originalTitle: 'La Nuit Américaine',
      synopsis: 'A passionate love letter to filmmaking. At the Victorine Studios in Nice, a movie crew gathers to shoot a melodrama. Amid personal scandals, nervous breakdowns, technical crises, and budget deadlines, director Ferrand struggles to bring the film to completion. Winner of the Academy Award for Best Foreign Language Film.',
      whyWatch: 'The definitive cinematic portrait of behind-the-scenes movie production. Demonstrates set hierarchy, psychological crew dynamics, and the classic optical technique of "Day for Night" (using lens filters and underexposure to simulate night during daytime).',
      whatToObserve: 'The optical demonstration of day-for-night lens filters, Truffaut\'s on-set directing demeanor, and resourceful problem solving.',
      observationActivity: 'Reflect on Truffaut\'s famous aphorism: "Shooting a movie is like a stagecoach ride in the Wild West: at first you hope for a great journey, then you just hope to reach your destination."',
      audioTrackLabel: '💬 Subtitled in Portuguese (French Original)',
      badge: 'EXTRA BONUS • CINEMA ON CINEMA CLASSIC',
    },
    es: {
      title: 'La Noche Americana (La Nuit Américaine)',
      originalTitle: 'La Nuit Américaine',
      synopsis: 'Una apasionada declaración de amor al cine. En los míticos estudios Victorine de Niza, un equipo rueda un melodrama enfrentándose a celos, accidentes, problemas de presupuesto y desvaríos artísticos. Ganadora del Óscar a la Mejor Película Extranjera.',
      whyWatch: 'El gran clásico sobre la vida en un rodaje. Enseña cómo funciona la maquinaria de un set, el manejo del estrés y la técnica óptica del "día por noche".',
      whatToObserve: 'La aplicación de filtros para convertir la luz del sol en noche, la resolución práctica de imprevistos y el liderazgo del director Ferrand.',
      observationActivity: 'Analiza cómo la pasión por el cine supera las dificultades cotidianas del rodaje.',
      audioTrackLabel: '💬 Subtitulada en Portugués',
      badge: 'BONUS EXTRA • CLÁSICO DEL RODAJE',
    },
    fr: {
      title: 'La Nuit Américaine',
      originalTitle: 'La Nuit Américaine (Day for Night)',
      synopsis: 'Une déclaration d\'amour passionnée au 7ème art. Aux studios de la Victorine à Nice, une équipe tourne un mélodrame. Entre caprices de vedettes, drames sentimentaux et angoisses de production, le réalisateur Ferrand s\'efforce de mener son film à terme. Oscar du Meilleur Film Étranger.',
      whyWatch: 'Le film culte absolu sur les coulisses d\'un tournage. Une immersion vibrante dans la vie d\'équipe et une explication magistrale de la technique de la nuit américaine.',
      whatToObserve: 'L\'utilisation de filtres pour tourner de jour une scène de nuit, le rôle pivot du premier assistant et la gestion des crises sur le plateau.',
      observationActivity: 'Commentez la célèbre maxime de Truffaut : "Faire un film, c\'est comme une traversée en diligence : d\'abord on espère un beau voyage, puis on espère seulement arriver à destination."',
      audioTrackLabel: '🇫🇷 Audio Original en Français',
      badge: 'BONUS SPÉCIAL • CHEF-D\'ŒUVRE DU CINÉMA',
    },
  },
  'film-extra-heroi': {
    pt: {
      title: 'Herói (Hero)',
      originalTitle: 'Yīngxióng (Hero - Com Jet Li)',
      synopsis: 'Na China antiga, um espadachim relata ao Rei como derrotou os maiores guerreiros do império. Inspirado na estrutura de Rashomon, a mesma história é recontada sob perspectivas divergentes — cada uma dominada por uma cor primária arrebatadora (vermelho, azul, branco, verde e preto).',
      whyWatch: 'O maior clássico contemporâneo de Direção de Fotografia e Teoria das Cores no cinema. Realizado por Zhang Yimou e Christopher Doyle, é uma masterclass sobre paletas monocromáticas e dramaturgia cromática.',
      whatToObserve: 'O significado de cada cor: vermelho para paixão/ciúme; azul para verdade/sabedoria; branco para luto; verde para memórias; preto para o poder imperial.',
      observationActivity: 'Analise como a direção de fotografia e a temperatura de cor alteram totalmente a emoção da mesma cena quando ela é recontada em cores diferentes.',
      audioTrackLabel: '💬 Legendado em Português (PT-BR)',
      badge: 'VÍDEO EXTRA • MASTERCLASS EM FOTOGRAFIA & COR',
    },
    en: {
      title: 'Hero (Yīngxióng)',
      originalTitle: 'Yīngxióng (Hero)',
      synopsis: 'In ancient China during the Warring States period, a nameless warrior recounts to the King of Qin how he defeated the empire\'s legendary assassins. Borrowing the narrative structure of Rashomon, the story is retold through contrasting viewpoints—each bathed in a breathtaking primary color (Red, Blue, White, Green, and Black).',
      whyWatch: 'The pinnacle of contemporary cinematography and chromatic storytelling. Directed by Zhang Yimou and shot by legendary DP Christopher Doyle, it is a masterclass in monochrome palettes and lighting under rain and water reflections.',
      whatToObserve: 'Doyle\'s chromatic symbolism: Red for jealous passion; Blue for rational truth; White for grief; Green for peace; Black for autocratic order.',
      observationActivity: 'Observe how shifting color temperature and lighting schemes completely transform the emotional subtext of the exact same narrative event.',
      audioTrackLabel: '💬 Subtitled in Portuguese (Original Audio)',
      badge: 'EXTRA VIDEO • MASTERCLASS IN COLOR & LIGHTING',
    },
    es: {
      title: 'Héroe (Hero)',
      originalTitle: 'Yīngxióng',
      synopsis: 'En la antigua China, un espadachín sin nombre narra ante el Rey cómo venció a los asesinos más temidos. Siguiendo la estructura de Rashomon, los mismos hechos son relatados desde distintos puntos de vista, cada uno con una paleta cromática dominante.',
      whyWatch: 'La gran obra maestra de la dirección de fotografía y la psicología del color. Una lección inolvidable de Christopher Doyle y Zhang Yimou.',
      whatToObserve: 'El valor simbólico del rojo, azul, blanco, verde y negro en la iluminación y el vestuario de cada secuencia.',
      observationActivity: 'Compara cómo cambia la atmósfera emocional al alterar radicalmente la temperatura de color de la misma escena.',
      audioTrackLabel: '💬 Subtitulada en Portugués',
      badge: 'VÍDEO EXTRA • MASTERCLASS EN COLOR Y FOTOGRAFÍA',
    },
    fr: {
      title: 'Hero (Yīngxióng)',
      originalTitle: 'Yīngxióng (Hero)',
      synopsis: 'Dans la Chine ancienne des Royaumes Combattants, un guerrier anonyme raconte au Roi de Qin comment il a vaincu ses pires ennemis. À la manière de Rashômon, le même récit se déploie sous des perspectives divergentes, sublimées chacune par une couleur dominante (Rouge, Bleu, Blanc, Vert, Noir).',
      whyWatch: 'Le chef-d\'œuvre absolu de la direction de la photographie et de la théorie des couleurs au cinéma. Réalisé par Zhang Yimou et éclairé par Christopher Doyle.',
      whatToObserve: 'La grammaire chromatique : le rouge pour la passion destructrice, le bleu pour la sagesse, le blanc pour le deuil et le vert pour l\'innocence.',
      observationActivity: 'Analysez comment l\'étalonnage et la dominante de couleur modifient du tout au tout la signification dramatique d\'un même combat.',
      audioTrackLabel: '💬 Sous-titré en Portugais (Version Intégrale)',
      badge: 'VIDÉO BONUS • MASTERCLASS ÉCLAIRAGE ET COULEUR',
    },
  },
  'film-extra-heroi-cores': {
    pt: {
      title: 'Herói: As 5 Variações Cromáticas de Christopher Doyle',
      originalTitle: 'Hero (2002) - Chromatic Variations & Color Grammar',
      synopsis: 'Estudo audiovisual focado na gramática das cores do filme Herói (2002): o duelo no bosque com as folhas que sangram do amarelo para o vermelho escarlate, a defesa da escola de caligrafia em verde límpido e o combate na chuva.',
      whyWatch: 'Compreender na prática como grandes diretores de fotografia utilizam o círculo cromático e filtros ópticos para guiar as emoções do público.',
      whatToObserve: 'As transições sutis entre matizes quentes e frios e o contraste tonal entre figurinos e cenários naturais.',
      observationActivity: 'Escolha duas cores da paleta de Herói e planeje como utilizá-las de forma intencional no seu próprio curta-metragem.',
      audioTrackLabel: '💬 Legendado em Português (PT-BR)',
      badge: 'VÍDEO EXTRA • VARIAÇÃO CROMÁTICA & TEORIA DAS CORES',
    },
    en: {
      title: 'Hero: Christopher Doyle\'s 5 Chromatic Variations',
      originalTitle: 'Hero (2002) - Chromatic Variations & Color Grammar',
      synopsis: 'Visual analysis exploring the intentional color theory of Hero (2002): the forest leaves duel shifting from golden yellow to blood scarlet, the calligraphic green sanctuary, and the high-shutter duel in rain.',
      whyWatch: 'Learn how elite directors of photography harness chromatic color theory and natural light to dictate audience psychology and drama.',
      whatToObserve: 'The optical harmony between wardrobe, architectural production design, and precise camera color grading.',
      observationActivity: 'Pick two contrasting color hues and plan how to apply them to symbolize conflict in your own upcoming short film.',
      audioTrackLabel: '💬 Subtitled in Portuguese',
      badge: 'EXTRA VIDEO • COLOR THEORY & CHROMATIC VARIATION',
    },
    es: {
      title: 'Héroe: Las 5 Variaciones Cromáticas de Christopher Doyle',
      originalTitle: 'Hero (2002) - Variaciones Cromáticas',
      synopsis: 'Análisis visual sobre la gramática de colores en Héroe: el combate en el bosque de hojas rojas, la defensa de la caligrafía en verde y la lucha bajo la lluvia en plata y negro.',
      whyWatch: 'Comprende el uso dramático de la teoría del color y cómo la luz moldea la narrativa cinematográfica.',
      whatToObserve: 'La correspondencia entre el diseño de producción, el vestuario y la psicología de los personajes.',
      observationActivity: 'Diseña una paleta de dos colores para tu propio cortometraje aplicando las lecciones de Doyle.',
      audioTrackLabel: '💬 Subtitulada en Portugués',
      badge: 'VÍDEO EXTRA • TEORÍA DEL COLOR EN EL CINE',
    },
    fr: {
      title: 'Hero : Les 5 Variations Chromatiques de Christopher Doyle',
      originalTitle: 'Hero (2002) - Variations Chromatiques',
      synopsis: 'Étude visuelle dédiée à la grammaire des couleurs dans Hero : le duel dans la forêt aux feuilles rougeoyantes, le sanctuaire vert émeraude et le duel sous la pluie.',
      whyWatch: 'Comprendre comment la direction photo emploie la roue chromatique pour manipuler la perception émotionnelle du spectateur.',
      whatToObserve: 'Le dialogue entre décors naturels, costumes monochromes et étalonnage minutieux.',
      observationActivity: 'Définissez deux couleurs motrices pour votre propre court-métrage en justifiant leur signification dramatique.',
      audioTrackLabel: '💬 Sous-titré en Portugais',
      badge: 'VIDÉO BONUS • THÉORIE DES COULEURS ET PHOTO',
    },
  },
};

export const READING_TRANSLATIONS: Record<string, Record<Language, ReadingTranslation>> = {
  'read-1': {
    pt: {
      title: 'A Linguagem do Cinema',
      author: 'Marcel Martin',
      suggestedChapter: 'Capítulos 1 e 2: A Unidade Fílmica e a Expressão pelo Enquadramento',
      summary: 'Estudo seminal dos elementos constitutivos da narrativa cinematográfica: enquadramentos, movimentos de câmera e articulação dos planos como linguagem visual.',
      whyRead: 'O livro de referência absoluta sobre a gramática do cinema e a passagem do plano como documento para o plano como obra de arte.',
    },
    en: {
      title: 'The Language of Film',
      author: 'Marcel Martin',
      suggestedChapter: 'Chapters 1 & 2: The Film Unit and Expression Through Framing',
      summary: 'Seminal investigation of the core elements of film narrative: framing scales, camera movements, and the articulation of shots as visual language.',
      whyRead: 'The essential classic text on film grammar and the historical evolution from the shot as record to the shot as artistic expression.',
    },
    es: {
      title: 'El Lenguaje del Cine',
      author: 'Marcel Martin',
      suggestedChapter: 'Capítulos 1 y 2: La Unidad Fílmica y la Expresión a través del Encuadre',
      summary: 'Estudio fundamental de los elementos constitutivos del lenguaje cinematográfico: escalas de planos, movimientos de cámara y articulación dramática.',
      whyRead: 'El libro de referencia indispensable sobre gramática cinematográfica y la evolución artística del plano.',
    },
    fr: {
      title: 'Le Langage Cinématographique',
      author: 'Marcel Martin',
      suggestedChapter: 'Chapitres 1 et 2 : L\'Unité Filmique et l\'Expression par le Cadrage',
      summary: 'Étude fondamentale des éléments constitutifs du récit cinématographique : échelles de plans, mouvements d\'appareil et articulation visuelle.',
      whyRead: 'L\'ouvrage de référence incontournable sur la grammaire du cinéma et l\'émergence du plan comme geste esthétique.',
    },
  },
  'read-2': {
    pt: {
      title: 'A Forma do Filme',
      author: 'Sergei Eisenstein',
      suggestedChapter: 'A Estrutura do Filme e os Métodos de Montagem',
      summary: 'Obra clássica sobre a teoria do conflito visual e as cinco categorias de montagem dialética concebidas pelo mestre soviético.',
      whyRead: 'Escrito pelo próprio gênio russo, ensina a montagem métrica, rítmica, tonal, sobretonal e intelectual que revolucionou a história das telas.',
    },
    en: {
      title: 'Film Form: Essays in Film Theory',
      author: 'Sergei Eisenstein',
      suggestedChapter: 'Methods of Montage and The Cinematic Principle',
      summary: 'Classic treatise exploring visual collision theory and the five categories of dialectical montage conceived by the Soviet master.',
      whyRead: 'Penned by the Soviet visionary himself, detailing metric, rhythmic, tonal, overtonal, and intellectual montage that transformed cinema.',
    },
    es: {
      title: 'La Forma del Cine',
      author: 'Sergei Eisenstein',
      suggestedChapter: 'Los Métodos del Montaje y la Estructura Cinematográfica',
      summary: 'Tratado clásico sobre el conflicto visual y las cinco categorías del montaje dialéctico formuladas por el maestro soviético.',
      whyRead: 'Escrito por el gran maestro soviético, explica el montaje métrico, rítmico, tonal y dialéctico que revolucionó el séptimo arte.',
    },
    fr: {
      title: 'Le Film : Sa Forme / Son Sens',
      author: 'Sergeï Eisenstein',
      suggestedChapter: 'Les Méthodes de Montage et la Structure Filmique',
      summary: 'Traité classique explorant le conflit visuel et les cinq formes de montage dialectique conçues par le maître soviétique.',
      whyRead: 'Rédigé par le maître soviétique, ce livre théorise le montage métrique, rythmique, tonal et intellectuel.',
    },
  },
  'read-3': {
    pt: {
      title: 'Manual do Roteiro (Screenplay)',
      author: 'Syd Field',
      suggestedChapter: 'O Paradigma dos Três Atos e os Pontos de Virada',
      summary: 'O guia fundamental da dramaturgia clássica em três atos: premissa, plot points, arcos de transformação e resolução dramática.',
      whyRead: 'A bíblia da estrutura dramática no cinema mundial. Como arquitetar a espinha dorsal de uma narrativa sem que ela perca ritmo ou fôlego.',
    },
    en: {
      title: 'Screenplay: The Foundations of Screenwriting',
      author: 'Syd Field',
      suggestedChapter: 'The Three-Act Paradigm and Plot Points',
      summary: 'The standard manual of classical three-act dramatic structure: setup, plot points, character arcs, and narrative resolution.',
      whyRead: 'The cornerstone handbook on dramatic structure in narrative cinema, teaching how to architect compelling story spines with relentless momentum.',
    },
    es: {
      title: 'El Manual del Guion (Screenplay)',
      author: 'Syd Field',
      suggestedChapter: 'El Paradigma de Tres Actos y los Puntos de Giro',
      summary: 'El manual de referencia sobre la estructura dramática clásica en tres actos: planteamiento, puntos de giro, arcos y resolución.',
      whyRead: 'El texto clásico por excelencia sobre estructura dramática, puntos de giro y construcción de personajes.',
    },
    fr: {
      title: 'Scénario : Les Principes Fondamentaux de l\'Écriture',
      author: 'Syd Field',
      suggestedChapter: 'Le Paradigme en Trois Actes et les Nœuds Dramatiques',
      summary: 'Le manuel fondamental de dramaturgie classique en trois actes : exposition, nœuds d\'action, arcs de personnages et résolution.',
      whyRead: 'La référence mondiale de la dramaturgie cinématographique et de la structuration rigoureuse d\'un récit captivant.',
    },
  },
  'read-4': {
    pt: {
      title: 'A Preparação do Ator',
      author: 'Constantin Stanislavski',
      suggestedChapter: 'A Ação, a Memória Afetiva e o "Se Mágico"',
      summary: 'Metodologia de interpretação realista baseada na ação física, verdade psicológica interior e memória emocional para cinema e teatro.',
      whyRead: 'O fundamento de todo método de interpretação cinematográfica moderna: verdade cênica, intenção interna e subtexto inabalável.',
    },
    en: {
      title: 'An Actor Prepares',
      author: 'Konstantin Stanislavski',
      suggestedChapter: 'Action, Emotional Memory, and the "Magic If"',
      summary: 'Realist performance methodology grounded in physical action, internal psychological truth, and emotional memory for screen and stage.',
      whyRead: 'The foundational bedrock of modern screen acting: psychological truth, internal motivation, and authentic subtext.',
    },
    es: {
      title: 'El Trabajo del Actor sobre Sí Mismo',
      author: 'Konstantin Stanislavski',
      suggestedChapter: 'La Acción, la Memoria Afectiva y el "Si Mágico"',
      summary: 'Metodología actoral realista basada en la acción física, la verdad psicológica interna y la memoria afectiva para cine y teatro.',
      whyRead: 'El fundamento de la actuación contemporánea: verdad escénica, intenciones dramáticas profundas y subtexto orgánico.',
    },
    fr: {
      title: 'La Formation de l\'Acteur',
      author: 'Constantin Stanislavski',
      suggestedChapter: 'L\'Action, la Mémoire Émotionnelle et le "Si Magique"',
      summary: 'Méthodologie du jeu réaliste fondée sur l\'action physique, la vérité psychologique intérieure et la mémoire sensorielle.',
      whyRead: 'Le socle incontournable du jeu d\'acteur moderne : vérité émotionnelle, justesse du regard et incarnation sincère.',
    },
  },
  'read-5': {
    pt: {
      title: 'A Cinematografia e a Iluminação de Cinema',
      author: 'Blain Brown',
      suggestedChapter: 'Iluminação de Três Pontos, Chiaroscuro e Paletas de Cores',
      summary: 'Guia completo de cinematografia, esquemas de iluminação, escolha de lentes, sensometria e psicologia cromática no set.',
      whyRead: 'Manual técnico e estético fundamental para todo diretor e fotógrafo que deseja esculpir a luz com precisão artística.',
    },
    en: {
      title: 'Cinematography: Theory and Practice',
      author: 'Blain Brown',
      suggestedChapter: 'Three-Point Lighting, Chiaroscuro, and Visual Color Palettes',
      summary: 'Comprehensive textbook on cinematography, lighting setups, optics selection, exposure control, and chromatic psychology on set.',
      whyRead: 'The essential practical bible for directors and cinematographers seeking to master lighting control, contrast ratios, and optical mood.',
    },
    es: {
      title: 'Cinematografía: Teoría y Práctica',
      author: 'Blain Brown',
      suggestedChapter: 'Iluminación a Tres Puntos, Chiaroscuro y Paletas Cromáticas',
      summary: 'Guía exhaustiva sobre cinematografía, esquemas de iluminación, ópticas, control de exposición y psicología del color en rodaje.',
      whyRead: 'Manual técnico y estético indispensable para directores y fotógrafos que buscan esculpir la luz con rigor artístico.',
    },
    fr: {
      title: 'La Lumière au Cinéma : Théorie et Pratique',
      author: 'Blain Brown',
      suggestedChapter: 'L\'Éclairage Trois Points, le Clair-Obscur et les Palettes de Couleur',
      summary: 'Manuel complet de direction de la photographie, schémas d\'éclairage, choix des objectifs et psychologie de la couleur sur le plateau.',
      whyRead: 'Le guide technique et esthétique par excellence pour apprendre à sculpter la lumière avec maîtrise et intention dramatique.',
    },
  },
  'read-6': {
    pt: {
      title: 'A Arte do Som no Cinema',
      author: 'Michel Chion',
      suggestedChapter: 'Audiovisualização, Som Acusmático e o Valor Acrescentado',
      summary: 'Análise aprofundada da relação estética entre som e imagem: valores agregados, espaço acústico e narrativa invisível.',
      whyRead: 'A maior obra já escrita sobre a escuta no cinema. Como o desenho sonoro transforma o significado psicológico das imagens.',
    },
    en: {
      title: 'Audio-Vision: Sound on Screen',
      author: 'Michel Chion',
      suggestedChapter: 'Audiovision, Acousmatic Sound, and Added Value',
      summary: 'In-depth analysis of the aesthetic interplay between sound and image: added value, acoustic space, and invisible narrative.',
      whyRead: 'The seminal treatise on film sound aesthetics, demonstrating how acoustic design fundamentally transforms image perception.',
    },
    es: {
      title: 'La Audio-Visión: Introducción a un Análisis Conjunto',
      author: 'Michel Chion',
      suggestedChapter: 'La Audiovisión, el Sonido Acusmático y el Valor Añadido',
      summary: 'Análisis profundo sobre la relación sensorial entre sonido e imagen: valor añadido, fuera de campo sonoro y narrativa acusmática.',
      whyRead: 'La obra cumbre sobre la escucha cinematográfica y cómo la banda sonora redefine la experiencia sensorial del espectador.',
    },
    fr: {
      title: 'L\'Audio-Vision : Son et Image au Cinéma',
      author: 'Michel Chion',
      suggestedChapter: 'L\'Audio-Vision, le Son Acousmatique et la Valeur Ajoutée',
      summary: 'Analyse approfondie du lien esthétique entre son et image : valeur ajoutée, hors-champ sonore et récit acousmatique.',
      whyRead: 'L\'ouvrage théorique majeur sur l\'acoustique au cinéma : comment le son enrichit, contredit ou transcende l\'image visible.',
    },
  },
  'read-7': {
    pt: {
      title: 'Num Piscar de Olhos (In the Blink of an Eye)',
      author: 'Walter Murch',
      suggestedChapter: 'A Regra dos Seis Critérios para o Corte Perfeito',
      summary: 'Reflexão prática sobre o ritmo da montagem, critérios de corte e a relação entre piscada humana e transição cinematográfica.',
      whyRead: 'Escrito pelo lendário montador de Apocalypse Now e O Poderoso Chefão. Revela os segredos emocionais por trás do corte cinematográfico.',
    },
    en: {
      title: 'In the Blink of an Eye: A Perspective on Film Editing',
      author: 'Walter Murch',
      suggestedChapter: 'The Rule of Six Criteria for the Ideal Cut',
      summary: 'Practical reflections on editing rhythm, cutting criteria, and the physiological connection between the human blink and cinematic cut.',
      whyRead: 'Written by the legendary editor of Apocalypse Now and The Godfather. Unveils the emotional and cognitive mechanics behind every cut.',
    },
    es: {
      title: 'En el Momento del Parpadeo (In the Blink of an Eye)',
      author: 'Walter Murch',
      suggestedChapter: 'La Regla de los Seis Criterios del Corte',
      summary: 'Reflexiones fundamentales sobre el ritmo del montaje, criterios de corte y la analogía del parpadeo humano en la transición visual.',
      whyRead: 'Escrito por el mítico montador de Apocalypse Now y El Padrino. Una joya sobre el pulso intuitivo y psicológico del corte.',
    },
    fr: {
      title: 'En un Clin d\'Œil : Perspectives sur le Montage',
      author: 'Walter Murch',
      suggestedChapter: 'La Règle des Six Critères pour la Coupe Parfaite',
      summary: 'Réflexions fondamentales sur le rythme du montage, les critères de coupe et le lien organique entre le clignement de l\'œil et le raccord.',
      whyRead: 'Écrit par le légendaire monteur d\'Apocalypse Now et du Parrain. Il dévoile les secrets de respiration et d\'émotion du raccord.',
    },
  },
  'read-8': {
    pt: {
      title: 'A Dinâmica do Set de Filmagem',
      author: 'David Mamet',
      suggestedChapter: 'Sobre a Direção de Filme: Decupagem e Controle do Set',
      summary: 'Ensaios práticos sobre a decupagem precisa, storyboard e liderança do diretor no set para manter a história em primeiro plano.',
      whyRead: 'Abordagem direta e sem floreios sobre como comandar uma equipe de cinema e manter a integridade visual da história.',
    },
    en: {
      title: 'On Directing Film',
      author: 'David Mamet',
      suggestedChapter: 'Storyboarding, Shot Lists, and Set Command',
      summary: 'Crisp pragmatic essays on shot breakdown, storyboarding, and directorial set leadership to keep the narrative front and center.',
      whyRead: 'A brutally clear, practical guide on commanding a film crew, crafting shot lists, and preserving narrative directness.',
    },
    es: {
      title: 'Sobre la Dirección Cinematográfica',
      author: 'David Mamet',
      suggestedChapter: 'La Planificación de Planos y el Control en Set',
      summary: 'Ensayos directos sobre el decupaje minucioso, guion técnico y liderazgo en el rodaje para preservar la claridad dramática.',
      whyRead: 'Guía directa y contundente sobre cómo liderar un equipo de filmación y mantener la tensión dramática plano a plano.',
    },
    fr: {
      title: 'De la Réalisation : Principes de Mise en Scène',
      author: 'David Mamet',
      suggestedChapter: 'Découpage, Liste de Plans et Autorité sur le Plateau',
      summary: 'Essais percutants sur le découpage technique, le storyboard et la direction d\'équipe pour préserver la netteté narrative.',
      whyRead: 'Un guide d\'une clarté redoutable pour apprendre à diriger une équipe avec précision et concision narrative.',
    },
  },
  'read-9': {
    pt: {
      title: 'Produção Executiva para Cinema e TV',
      author: 'Eve Light Honthaner',
      suggestedChapter: 'Orçamentos, Ordens do Dia e Viabilidade Financeira',
      summary: 'Manual detalhado de produção executiva, planilhas orçamentárias, cronogramas de rodagem e contratos audiovisuais.',
      whyRead: 'O guia definitivo para transformar ideias artísticas em produções audiovisuais executadas dentro do orçamento e da lei.',
    },
    en: {
      title: 'The Complete Film Production Handbook',
      author: 'Eve Light Honthaner',
      suggestedChapter: 'Budgeting, Call Sheets, and Legal Releases',
      summary: 'Detailed handbook covering executive production, line-item budgeting, shooting schedules, logistics, and legal clearances.',
      whyRead: 'The industry-standard production manual for turning creative vision into executed film realities on schedule and on budget.',
    },
    es: {
      title: 'Manual Completo de Producción Cinematográfica',
      author: 'Eve Light Honthaner',
      suggestedChapter: 'Presupuestos, Órdenes de Rodaje y Viabilidad Legal',
      summary: 'Manual integral de producción ejecutiva, presupuestos desglosados, planes de rodaje y gestión legal cinematográfica.',
      whyRead: 'La guía de referencia para organizar una producción audiovisual profesional con rigor financiero y contractual.',
    },
    fr: {
      title: 'Le Guide Pratique de la Production Cinématographique',
      author: 'Eve Light Honthaner',
      suggestedChapter: 'Budgets Prévisionnels, Feuilles de Service et Droit Audiovisuel',
      summary: 'Manuel exhaustif de production exécutive, budgets prévisionnels, plans de travail et aspects juridiques de tournage.',
      whyRead: 'L\'ouvrage indispensable pour planifier et structurer une production de court ou long-métrage en respectant devis et calendrier.',
    },
  },
  'read-10': {
    pt: {
      title: 'A Realização do Filme: Do Roteiro à Tela',
      author: 'Sidney Lumet',
      suggestedChapter: 'Fazendo Filmes: O Trabalho com Todos os Departamentos',
      summary: 'Memórias e lições de set de um mestre de cinema: ensaios com atores, trabalho com câmeras e a montagem como escultura temporal.',
      whyRead: 'Um dos maiores diretores da história de Hollywood compartilha sua vasta experiência conduzindo projetos cinematográficos inesquecíveis.',
    },
    en: {
      title: 'Making Movies',
      author: 'Sidney Lumet',
      suggestedChapter: 'The Entire Collaborative Journey from Script to Final Cut',
      summary: 'Masterclass memoirs from a Hollywood titan: rehearsing actors, lens selection, lens height, and pacing the narrative cut.',
      whyRead: 'One of American cinema\'s supreme directors shares invaluable insights on leading every department to craft iconic masterpieces.',
    },
    es: {
      title: 'Así se Hacen las Películas',
      author: 'Sidney Lumet',
      suggestedChapter: 'El Recorrido Completo: Del Guion a la Sala de Cine',
      summary: 'Memorias y lecciones directas de un maestro: dirección de actores, relaciones de lente, encuadre y el oficio cinematográfico.',
      whyRead: 'El legendario director de 12 Hombres en Pugna y Tarde de Perros comparte su sabiduría sobre cómo orquestar todos los oficios del cine.',
    },
    fr: {
      title: 'Faire un Film',
      author: 'Sidney Lumet',
      suggestedChapter: 'Le Cheminement Créatif : Du Scénario à l\'Écran',
      summary: 'Mémoires et leçons concrètes d\'un maître du cinéma : répétitions d\'acteurs, choix d\'objectifs et orchestration de tous les corps de métier.',
      whyRead: 'Le légendaire réalisateur de 12 Hommes en Colère livre une réflexion lumineuse sur chaque étape de fabrication d\'un film.',
    },
  },
};

/**
 * Returns translated film metadata based on the film object and chosen language.
 * Falls back cleanly to Portuguese or provided object properties.
 */
export function getFilmTranslation(
  film: {
    id?: string;
    moduleId?: number;
    title?: string;
    originalTitle?: string;
    synopsis?: string;
    whyWatch?: string;
    whatToObserve?: string;
    observationActivity?: string;
    audioTrackLabel?: string;
    badge?: string;
  } | null | undefined,
  lang: Language = 'pt'
): {
  title: string;
  originalTitle?: string;
  synopsis: string;
  whyWatch: string;
  whatToObserve: string;
  observationActivity: string;
  audioTrackLabel?: string;
  badge?: string;
} {
  if (!film) {
    return {
      title: '',
      synopsis: '',
      whyWatch: '',
      whatToObserve: '',
      observationActivity: '',
    };
  }

  // Look up by id or module
  const key = film.id || (film.moduleId ? `film-${film.moduleId}` : '');
  const entry = FILM_TRANSLATIONS[key];

  if (entry && entry[lang]) {
    const t = entry[lang];
    return {
      title: t.title || film.title || '',
      originalTitle: t.originalTitle || film.originalTitle,
      synopsis: t.synopsis || film.synopsis || '',
      whyWatch: t.whyWatch || film.whyWatch || '',
      whatToObserve: t.whatToObserve || film.whatToObserve || '',
      observationActivity: t.observationActivity || film.observationActivity || '',
      audioTrackLabel: t.audioTrackLabel || film.audioTrackLabel,
      badge: t.badge || film.badge,
    };
  }

  // If language is Portuguese or fallback, return film object or entry.pt
  if (entry && entry.pt) {
    const t = entry.pt;
    return {
      title: film.title || t.title,
      originalTitle: film.originalTitle || t.originalTitle,
      synopsis: film.synopsis || t.synopsis,
      whyWatch: film.whyWatch || t.whyWatch,
      whatToObserve: film.whatToObserve || t.whatToObserve,
      observationActivity: film.observationActivity || t.observationActivity,
      audioTrackLabel: film.audioTrackLabel || t.audioTrackLabel,
      badge: film.badge || t.badge,
    };
  }

  return {
    title: film.title || '',
    originalTitle: film.originalTitle,
    synopsis: film.synopsis || '',
    whyWatch: film.whyWatch || '',
    whatToObserve: film.whatToObserve || '',
    observationActivity: film.observationActivity || '',
    audioTrackLabel: film.audioTrackLabel,
    badge: film.badge,
  };
}

/**
 * Returns translated reading metadata based on reading object and chosen language.
 */
export function getReadingTranslation(
  reading: {
    id?: string;
    moduleId?: number;
    title?: string;
    author?: string;
    suggestedChapter?: string;
    summary?: string;
    whyRead?: string;
  } | null | undefined,
  lang: Language = 'pt'
): {
  title: string;
  author: string;
  suggestedChapter: string;
  summary: string;
  whyRead: string;
} {
  if (!reading) {
    return {
      title: '',
      author: '',
      suggestedChapter: '',
      summary: '',
      whyRead: '',
    };
  }

  const key = reading.id || (reading.moduleId ? `read-${reading.moduleId}` : '');
  const entry = READING_TRANSLATIONS[key];

  if (entry && entry[lang]) {
    const t = entry[lang];
    return {
      title: t.title || reading.title || '',
      author: t.author || reading.author || '',
      suggestedChapter: t.suggestedChapter || reading.suggestedChapter || '',
      summary: t.summary || entry.pt?.summary || reading.summary || '',
      whyRead: t.whyRead || reading.whyRead || '',
    };
  }

  if (entry && entry.pt) {
    const t = entry.pt;
    return {
      title: reading.title || t.title,
      author: reading.author || t.author,
      suggestedChapter: reading.suggestedChapter || t.suggestedChapter,
      summary: t.summary || reading.summary || '',
      whyRead: reading.whyRead || t.whyRead,
    };
  }

  return {
    title: reading.title || '',
    author: reading.author || '',
    suggestedChapter: reading.suggestedChapter || '',
    summary: reading.summary || '',
    whyRead: reading.whyRead || '',
  };
}
