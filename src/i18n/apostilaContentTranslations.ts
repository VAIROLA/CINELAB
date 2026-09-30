import { Language } from './translations.js';
import { ApostilaSection, ApostilaQuizQuestion } from '../types/index.js';

export interface TranslatedSection {
  title: string;
  subtitle?: string;
  content: string;
  tonyNotes?: string;
}

export const APOSTILA_SECTION_TRANSLATIONS: Record<
  number,
  Record<Language, TranslatedSection[]>
> = {
  1: {
    pt: [
      {
        title: '1. O que é Cinema e o que é Audiovisual?',
        subtitle: 'A natureza espaço-temporal da imagem em movimento',
        content: `O cinema não é mera reprodução da realidade; é uma construção deliberada de sentido no tempo e no espaço. Enquanto o teatro se ancora na presença física do ator em um palco contínuo onde o espectador escolhe para onde olhar, o cinema opera através da seleção óptica do diretor: o enquadramento determina o que existe e o que é excluído da experiência visual.\n\nAudiovisual é o amálgama indissociável entre luz projetada e ondas sonoras. A imagem atrai a razão e a atenção focal; o som atua diretamente no sistema límbico, gerando sensação de espaço, tensão e verossimilhança sem que o espectador perceba o artifício.`,
        tonyNotes: 'Em cinema, cada milímetro do enquadramento é uma escolha moral e estética. Nunca posicione a câmera ao acaso.',
      },
      {
        title: '2. Escalas de Planos e a Gramática dos Enquadramentos',
        subtitle: 'A relação de proximidade entre a câmera e o sujeito dramático',
        content: `A escala de planos estabelece a distância psicológica entre a plateia e o personagem:\n• Grande Plano Geral (GPG): O ambiente domina completamente a figura humana. Comunica solidão, vastidão ou opressão do cenário.\n• Plano Geral (PG): O sujeito aparece de corpo inteiro integrado ao ambiente. Situa espacialmente a ação.\n• Plano Americano (PA): Enquadra da altura do joelho até a cabeça (nascido nos westerns para exibir o coldre dos revólveres).\n• Plano Médio (PM): Da cintura para cima. O plano do diálogo clássico e da interação social.\n• Primeiro Plano (PP / Close-Up): Do peito ou ombros para cima. Foco nas expressões faciais e emoções íntimas.\n• Plano Detalhe (PD): Isola um objeto ou elemento específico (um bilhete, um olho, um gatilho).`,
        tonyNotes: 'O close-up é a maior arma do cinema. Se você usa close-up o tempo todo, ele perde o poder de impacto.',
      },
      {
        title: '3. A Cadeia de Produção Cinematográfica',
        subtitle: 'Da pré-produção à finalização',
        content: `Todo projeto audiovisual atravessa três etapas fundamentais:\n1. Pré-Produção: Roteiro definitivo, decupagem técnica, casting, reconhecimento de locações, ordem do dia e cronograma.\n2. Produção (Filmagem): A execução no set, registro de imagem e áudio direto, respeito aos horários e condução artística.\n3. Pós-Produção: Montagem, desenho de som, mixagem, tratamento de cor (grading) e masterização.`,
        tonyNotes: 'Uma hora gasta na pré-produção economiza três horas de atraso no set de filmagem.',
      },
    ],
    en: [
      {
        title: '1. What is Cinema and What is Audiovisual?',
        subtitle: 'The spatio-temporal nature of moving images',
        content: `Cinema is not a mere reproduction of reality; it is a deliberate construction of meaning across space and time. While theater anchors itself in the physical presence of actors upon a continuous stage where the audience freely directs their gaze, cinema operates through the director's optical selection: the frame dictates precisely what exists and what is excluded from visual consciousness.\n\nAudiovisual is the inseparable synthesis of projected light and sound waves. Image commands conscious focus; sound acts directly upon the limbic system, creating spatial truth, visceral suspense, and cinematic immersion.`,
        tonyNotes: 'In filmmaking, every millimeter inside the frame is a moral and aesthetic choice. Never place the camera randomly.',
      },
      {
        title: '2. Shot Scale and the Grammar of Framing',
        subtitle: 'The psychological proximity between the lens and the dramatic subject',
        content: `Shot scale governs emotional distance between audience and character:\n• Extreme Long Shot (ELS): Landscape completely dwarfs the human subject. Conveys isolation, scale, or environmental dominance.\n• Long Shot (LS): Full human figure visible within the surrounding setting. Establishes geography and physical action.\n• Medium Long Shot (MLS / American Shot): Knee-up framing (originated in classic westerns to display gun holsters).\n• Medium Shot (MS): Waist-up framing. The staple of classical dialogue and interpersonal dynamics.\n• Close-Up (CU): Head and shoulders. Direct conduit to emotional intensity and internal thought.\n• Extreme Close-Up / Detail (ECU): Isolates a specific critical object (a letter, an eye, a trembling trigger).`,
        tonyNotes: 'The close-up is cinema\'s most powerful weapon. If you use it constantly, it loses its emotional punch.',
      },
      {
        title: '3. The Filmmaking Production Pipeline',
        subtitle: 'From pre-production to delivery',
        content: `Every cinematic production navigates three core stages:\n1. Pre-Production: Locked screenplay, shot breakdown (découpage), casting, location scouting, call sheets, and budgeting.\n2. Production (Principal Photography): Set execution, dual-system sound recording, schedule discipline, and actor direction.\n3. Post-Production: Picture edit, sound design, foley, scoring, color grading, and master delivery.`,
        tonyNotes: 'One hour invested in thorough pre-production saves three hours of panic and delays on set.',
      },
    ],
    es: [
      {
        title: '1. ¿Qué es el Cine y qué es lo Audiovisual?',
        subtitle: 'La naturaleza espacio-temporal de la imagen en movimiento',
        content: `El cine no es una mera reproducción de la realidad; es una construcción deliberada de sentido en el tiempo y el espacio. Mientras que el teatro se apoya en la presencia física de los actores en un escenario continuo donde el espectador decide libremente adónde mirar, el cine opera a través de la selección óptica del director: el encuadre define lo que existe y lo que queda excluido de la experiencia visual.\n\nLo audiovisual es la unión indisoluble entre la luz proyectada y las ondas sonoras. La imagen capta la atención consciente; el sonido actúa directamente en el sistema emocional, generando sensación de espacio y credibilidad dramática.`,
        tonyNotes: 'En el cine, cada milímetro del encuadre es una decisión moral y estética. Jamás coloques la cámara al azar.',
      },
      {
        title: '2. Escalas de Planos y Gramática de Encuadre',
        subtitle: 'La proximidad psicológica entre la lente y el sujeto dramático',
        content: `La escala de planos establece la distancia emocional entre el espectador y el personaje:\n• Gran Plano General (GPG): El entorno domina por completo al sujeto. Expresa soledad, inmensidad o vulnerabilidad.\n• Plano General (PG): El personaje aparece de cuerpo entero dentro del escenario, situando con claridad la acción.\n• Plano Americano (PA): Encuadre de las rodillas hacia arriba (nacido en el western clásico para mostrar las cartucheras).\n• Plano Medio (PM): De la cintura hacia arriba. Plano clásico de conversación y relación entre personajes.\n• Primer Plano (Close-Up): Del pecho o los hombros hacia arriba. Foco en la emoción íntima y el pensamiento del actor.\n• Plano Detalle (PD): Aísla un objeto clave para la trama (una carta, un reloj, una mirada, un gatillo).`,
        tonyNotes: 'El primer plano es el arma más potente del cine. Si lo usas todo el tiempo, pierde su fuerza de impacto.',
      },
      {
        title: '3. Las Etapas de la Producción Cinematográfica',
        subtitle: 'De la preproducción al master final',
        content: `Todo proyecto cinematográfico atraviesa tres etapas fundamentales:\n1. Preproducción: Guion definitivo, desglose técnico de planos (découpage), casting, scouting de locaciones y plan de rodaje.\n2. Producción (Rodaje): Ejecución en set, registro de imagen y sonido directo, disciplina de horarios y dirección de actores.\n3. Posproducción: Montaje, diseño sonoro, mezcla, corrección de color (grading) y masterización final.`,
        tonyNotes: 'Una hora invertida en preproducción ahorra tres horas de retraso y caos en el set de rodaje.',
      },
    ],
    fr: [
      {
        title: '1. Qu\'est-ce que le Cinéma et l\'Audiovisuel ?',
        subtitle: 'La nature spatio-temporelle de l\'image en mouvement',
        content: `Le cinéma n\'est pas une simple reproduction du réel ; c\'est une construction délibérée de sens dans l\'espace et le temps. Alors que le théâtre repose sur la présence physique des comédiens sur une scène continue où le spectateur choisit où porter son regard, le cinéma opère par la sélection optique du cinéaste : le cadre décide souverainement de ce qui existe et de ce qui est exclu.\n\nL\'audiovisuel est la synthèse indissociable de la lumière projetée et des vibrations sonores. L\'image capte l\'attention rationnelle ; le son agit directement sur l\'inconscient, créant l\'immersion spatiale et la vérité dramatique.`,
        tonyNotes: 'Au cinéma, chaque millimètre du cadre est un choix moral et esthétique. Ne posez jamais la caméra au hasard.',
      },
      {
        title: '2. Échelle des Plans et Grammaire du Cadrage',
        subtitle: 'La proximité psychologique entre l\'objectif et le sujet',
        content: `L\'échelle des plans règle la distance affective entre le spectateur et le protagoniste :\n• Très Grand Plan d\'Ensemble (TGPE) : L\'espace domine totalement la silhouette humaine. Évoque l\'isolement ou la démesure.\n• Plan d\'Ensemble (PE) : Le sujet apparaît en pied dans son environnement. Situe précisément la géographie du lieu.\n• Plan Américain (PA) : Cadre à mi-cuisse (créé dans le western pour garder le pistolet visible à l\'image).\n• Plan Moyen (PM) : De la taille à la tête. Le plan par excellence du dialogue et de la confrontation.\n• Gros Plan (GP) : Poitrine ou épaules vers le haut. Révélateur d\'intimité, de trouble et d\'émotion pure.\n• Plan Détail (PD) : Isole un objet précis indispensable à la narration (une lettre, une clé, un œil).`,
        tonyNotes: 'Le gros plan est la munition la plus puissante du cinéma. Si vous l\'utilisez sans arrêt, il perd tout son pouvoir.',
      },
      {
        title: '3. La Chaîne de Production Cinématographique',
        subtitle: 'De la pré-production à la finalisation',
        content: `Toute création cinématographique s\'articule autour de trois temps forts :\n1. Pré-production : Scénario verrouillé, découpage technique, casting, repérages, plan de travail et budget.\n2. Production (Tournage) : Prises de vue et son direct sur le plateau, gestion du temps et direction d\'acteurs.\n3. Post-production : Montage image, mixage et design sonore, étalonnage colorimétrique et master final.`,
        tonyNotes: 'Une heure consacrée à la pré-production évite trois heures de retard coûteux sur le plateau.',
      },
    ],
  },
  2: {
    pt: [
      {
        title: '1. A Evolução da Sétima Arte',
        subtitle: 'Do cinematógrafo dos Irmãos Lumière à revolução sonora',
        content: `O nascimento do cinema (1895) fundou-se na atração documental (Lumière) e na fantasia mágica do ilusionismo (Méliès). O cinema mudo desenvolveu uma sofisticação visual inigualável, onde a pantomima dos atores e os cartazes de texto exigiam composições gráficas de extrema força.\n\nCom a chegada do som sincronizado em 1927 (The Jazz Singer), o cinema sofreu uma profunda transformação: as câmeras tornaram-se inicialmente estáticas devido aos pesados blimps antirruído, até que a técnica recuperou a mobilidade nos anos 1930 com os movimentos de grua e travelling.`,
        tonyNotes: 'Estude o cinema silencioso: nele reside a essência mais pura da composição e da narrativa por imagens.',
      },
      {
        title: '2. As Seis Camadas de Análise Fílmica CINELAB',
        subtitle: 'O método definitivo para dissecar qualquer obra audiovisual',
        content: `Para analisar um filme com profundidade crítica, desmonte a obra em suas 6 camadas constitutivas:\n1. Camada Narrativa: O arco dramático, a premissa temática, a estrutura em atos e os pontos de virada.\n2. Camada de Personagem: Motivação primordial, fraqueza interna, arco de transformação e subtexto das relações.\n3. Camada Espacial: A cenografia, a escolha das locações, a claustrofobia ou amplitude do mundo físico.\n4. Camada de Imagem (Fotografia): A paleta de cores, temperatura da luz, contraste, lentes e profundidade de campo.\n5. Camada de Som: O desenho de som, diálogos, ruídos diegéticos (internos à história), música extradiegética e silêncio.\n6. Camada de Montagem: O ritmo dos cortes, duração média dos planos, elipses temporais e justaposição de sentidos.`,
        tonyNotes: 'Quando você analisa um filme nessas seis camadas, você deixa de ser um mero consumidor e passa a pensar como realizador.',
      },
    ],
    en: [
      {
        title: '1. The Evolution of the Seventh Art',
        subtitle: 'From the Lumière Brothers cinematograph to the sound revolution',
        content: `The birth of cinema (1895) was established upon documentary reality (Lumière) and magical illusionism (Méliès). Silent cinema attained unmatched visual sophistication, where actors' mime and title cards demanded visually arresting compositions.\n\nWith synchronized sound in 1927 (The Jazz Singer), cinema underwent a profound revolution: cameras initially became static inside soundproof blimps, until 1930s engineering restored camera mobility through cranes and dollies.`,
        tonyNotes: 'Study silent cinema: therein lies the purest essence of spatial composition and visual storytelling.',
      },
      {
        title: '2. The CINELAB 6-Layer Film Analysis Method',
        subtitle: 'The definitive framework to dissect any cinematic masterpiece',
        content: `To analyze a film with directorial depth, deconstruct the work across its 6 structural layers:\n1. Narrative Layer: Dramatic arc, thematic premise, three-act structure, and narrative turning points.\n2. Character Layer: Core motivation, internal flaw, transformative arc, and relational subtext.\n3. Spatial Layer: Production design, location psychology, claustrophobia vs. expanse of the world.\n4. Visual / Cinematography Layer: Color palette, lighting ratios, contrast, focal length, and depth of field.\n5. Sound Design Layer: Dialogue fidelity, diegetic Foley, non-diegetic scoring, and intentional silence.\n6. Editing Layer: Pacing, average shot length, temporal ellipses, and montage juxtaposition.`,
        tonyNotes: 'When analyzing films through these six layers, you stop being a passive consumer and start thinking like a film director.',
      },
    ],
    es: [
      {
        title: '1. La Evolución del Séptimo Arte',
        subtitle: 'Del cinematógrafo de los Hermanos Lumière a la revolución sonora',
        content: `El nacimiento del cine (1895) se cimentó en la atracción documental (Lumière) y la ilusión mágica (Méliès). El cine mudo alcanzó una sofisticación visual irrepetible, donde la pantomima y los intertítulos exigían una fuerza gráfica extraordinaria.\n\nCon la llegada del sonido sincronizado en 1927 (The Jazz Singer), las cámaras quedaron inicialmente inmovilizadas en cabinas insonorizadas, hasta que la tecnología recuperó el movimiento en los años 30 mediante grúas y travellings.`,
        tonyNotes: 'Estudia el cine mudo: en él reside la esencia más pura de la composición y la narración visual.',
      },
      {
        title: '2. Las Seis Capas de Análisis Fílmico CINELAB',
        subtitle: 'El método integral para diseccionar cualquier obra audiovisual',
        content: `Para analizar una película con profundidad de director, descompón la obra en sus 6 capas esenciales:\n1. Capa Narrativa: Arco dramático, premisa temática, estructura en tres actos y puntos de giro.\n2. Capa de Personaje: Motivación central, herida emocional, arco de transformación y subtexto.\n3. Capa Espacial: Escenografía, psicología de locaciones, opresión o amplitud del entorno.\n4. Capa Fotográfica: Paleta cromática, relación de contraste, lentes y profundidad de campo.\n5. Capa Sonora: Diálogo, ruidos diegéticos (foley), banda sonora extradiegética y el uso del silencio.\n6. Capa de Montaje: Ritmo de corte, duración de planos, elipsis temporales y yuxtaposición.`,
        tonyNotes: 'Cuando analizas una película en estas seis capas, dejas de ser un espectador pasivo y empiezas a pensar como cineasta.',
      },
    ],
    fr: [
      {
        title: '1. L\'Évolution du Septième Art',
        subtitle: 'Du cinématographe des Frères Lumière à la révolution du parlant',
        content: `La naissance du cinéma (1895) repose sur l\'enregistrement du réel (Lumière) et l\'illusionnisme féerique (Méliès). Le cinéma muet a développé une force plastique insurpassable où la pantomime et les cartons de texte exigeaient des cadrages d\'une rigueur absolue.\n\nL\'avènement du son synchronisé en 1927 (Le Chanteur de Jazz) figea d\'abord les caméras dans des caissons insonorisés, avant que les années 1930 ne redonnent à l\'optique sa liberté de mouvement grâce aux grues et travellings.`,
        tonyNotes: 'Étudiez le cinéma muet : c\'est là que réside l\'essence la plus pure de la mise en scène et du récit par l\'image.',
      },
      {
        title: '2. La Méthode des Six Couches d\'Analyse Filmique CINELAB',
        subtitle: 'La grille méthodologique pour disséquer toute œuvre cinématographique',
        content: `Pour analyser un film avec le regard du réalisateur, décomposez-le en six couches fondamentales :\n1. Couche Narrative : Arc dramatique, prémisse thématique, découpage en actes et nœuds dramatiques.\n2. Couche des Personnages : Motivation motrice, faille intime, trajectoire d\'évolution et sous-texte.\n3. Couche Spatiale : Décor, scénographie, symbolique des lieux et géométrie du plateau.\n4. Couche Image (Photographie) : Palette chromatique, température, ratios de contraste, focales et profondeur de champ.\n5. Couche Sonore : Netteté des dialogues, bruits diégétiques, musique extradiégétique et silence dramatique.\n6. Couche Montage : Cadence des coupes, durée moyenne des plans, ellipses et collision de sens.`,
        tonyNotes: 'Lorsque vous disséquez un film à travers ces six couches, vous cessez d\'être un simple spectateur pour devenir un véritable cinéaste.',
      },
    ],
  },
  3: {
    pt: [
      {
        title: '1. Da Ideia ao Roteiro: Estrutura em Três Atos',
        subtitle: 'O esqueleto dramático e a progressão do conflito',
        content: `Um roteiro não é literatura; é um manual de instruções para uma equipe técnica e artística. A estrutura em 3 atos organiza o tempo dramático:\n• Ato I (Apresentação): Apresentação do protagonista, mundo ordinário, incidente incitante e primeiro ponto de virada (Plot Point 1).\n• Ato II (Confronto): Obstáculos progressivos, ponto central (Midpoint), crise e momento de maior desespero (All Hope is Lost).\n• Ato III (Resolução): Clímax decisivo e nova realidade transformada.`,
        tonyNotes: 'Sem conflito não há drama. Toda cena deve conter duas vontades opostas em choque.',
      },
      {
        title: '2. Formatação Padrão Master Scenes',
        subtitle: 'Cabeçalho de cena, ação e diálogos com subtexto',
        content: `O padrão da indústria exige precisão:\n1. Cabeçalho de Cena (Slugline): INT. ou EXT. / LOCAÇÃO / DIA ou NOITE.\n2. Linhas de Ação: Escritas no presente do indicativo, descrevendo apenas o que a câmera pode filmar e o microfone pode gravar.\n3. Nome do Personagem: Centralizado em caixa alta antes da fala.\n4. Diálogo e Subtexto: O que o personagem quer versus o que ele realmente diz.`,
        tonyNotes: 'Roteiro é 90% reescrita. Corte tudo o que for redundante.',
      },
    ],
    en: [
      {
        title: '1. From Idea to Screenplay: Three-Act Structure',
        subtitle: 'The dramatic skeleton and the escalation of conflict',
        content: `A screenplay is not literature; it is a blueprint for visual execution. The classic three-act structure organizes emotional momentum:\n• Act I (Setup): Ordinary world, character flaw, inciting incident, and Plot Point 1.\n• Act II (Confrontation): Escalating hurdles, Midpoint stake-shift, and dark night of the soul.\n• Act III (Resolution): The final climax and the transformed new reality.`,
        tonyNotes: 'Without conflict, drama dies. Every scene must feature opposing wills in direct collision.',
      },
      {
        title: '2. Industry Standard Master Scenes Formatting',
        subtitle: 'Sluglines, action lines, and subtextual dialogue',
        content: `Industry formatting demands visual discipline:\n1. Slugline: INT. or EXT. / LOCATION / DAY or NIGHT.\n2. Action Lines: Written in active present tense, describing strictly what is audible and visible on screen.\n3. Character Names: Centered uppercase preceding dialogue.\n4. Dialogue & Subtext: The chasm between what characters want and what they articulate.`,
        tonyNotes: 'Screenwriting is 90% ruthless rewriting. Cut every word that does not advance story or reveal character.',
      },
    ],
    es: [
      {
        title: '1. De la Idea al Guion: Estructura en Tres Actos',
        subtitle: 'El andamiaje dramático y la progresión del conflicto',
        content: `El guion es la partitura técnica del filme. La estructura clásica de 3 actos articula el viaje dramático:\n• Acto I (Planteamiento): Mundo ordinario, incidente detonador y primer punto de giro.\n• Acto II (Confrontación): Obstáculos crecientes, punto medio, crisis y noche oscura del alma.\n• Acto III (Resolución): Clímax decisivo y nuevo equilibrio transformado.`,
        tonyNotes: 'Sin conflicto no hay drama. Cada escena debe contener voluntades opuestas enfrentadas.',
      },
      {
        title: '2. Formato Estándar Master Scenes',
        subtitle: 'Encabezados de escena, acción y diálogos con subtexto',
        content: `El estándar internacional de guion exige precisión visual:\n1. Encabezado (Slugline): INT. / EXT. - LOCALIZACIÓN - DÍA / NOCHE.\n2. Líneas de Acción: En presente de indicativo, redactando exclusivamente lo filmable y audible.\n3. Nombres de Personaje: Centrados en mayúsculas antes de cada parlamento.\n4. Diálogo y Subtexto: La distancia entre el deseo profundo del personaje y sus palabras.`,
        tonyNotes: 'Escribir guion es reescribir. Elimina todo elemento que no impulse el conflicto.',
      },
    ],
    fr: [
      {
        title: '1. De l\'Idée au Scénario : Structure en Trois Actes',
        subtitle: 'L\'armature dramatique et l\'intensification du conflit',
        content: `Un scénario est un plan architectural destiné au tournage. La structure classique en trois actes régit l\'arc émotionnel :\n• Acte I (Exposition) : Monde ordinaire, élément déclencheur et premier nœud dramatique (Plot Point 1).\n• Acte II (Confrontation) : Épreuves ascendantes, point médian (Midpoint), crise et nuit obscure de l\'âme.\n• Acte III (Résolution) : Climax irrémédiable et nouvel équilibre métamorphosé.`,
        tonyNotes: 'Sans conflit, point de cinéma. Chaque séquence doit faire s\'affronter deux désirs inconciliables.',
      },
      {
        title: '2. La Mise en Page aux Normes Master Scenes',
        subtitle: 'En-têtes de séquence, didascalies d\'action et dialogue avec sous-texte',
        content: `La convention professionnelle internationale impose une rigueur absolue :\n1. En-tête (Slugline) : INT. ou EXT. / DÉCOR / JOUR ou NUIT.\n2. Description d\'action : Écrite au présent de l\'indicatif, limitant le texte à ce qui est strictement visible et audible.\n3. Noms des personnages : Centrés en majuscules au-dessus de chaque réplique.\n4. Dialogue et sous-texte : La tension entre ce que le protagoniste éprouve et ce qu\'il verbalise.`,
        tonyNotes: 'L\'écriture de scénario est avant tout une réécriture acharnée. Retranchez tout verbiage superflu.',
      },
    ],
  },
  4: {
    pt: [
      {
        title: '1. A Visão do Diretor e a Mise-en-Scène',
        subtitle: 'A regência visual de todos os elementos na cena',
        content: `Mise-en-scène é a organização de tudo o que está diante da câmera: atores, cenografia, iluminação, figurino e o movimento dos corpos no espaço. O diretor não é quem faz tudo, mas quem unifica todas as decisões em direção ao mesmo propósito dramático.`,
        tonyNotes: 'Se o diretor não sabe exatamente o que a cena significa, a equipe inteira filmará no escuro.',
      },
      {
        title: '2. Direção de Atores: Verbos de Ação e Subtexto',
        subtitle: 'Como guiar o elenco sem impor adjetivos emocionais',
        content: `Nunca dirija um ator com adjetivos ('fique mais triste', 'seja mais bravo'). Atores respondem a verbos de ação ('humilhar', 'seduzir', 'suplicar', 'proteger'). O subtexto dita o comportamento físico enquanto o diálogo cumpre a convenção social.`,
        tonyNotes: 'Dê ao ator um objetivo concreto e deixe a emoção emergir organicamente da ação.',
      },
    ],
    en: [
      {
        title: '1. The Director\'s Vision and Mise-en-Scène',
        subtitle: 'Orchestrating visual narrative within the physical frame',
        content: `Mise-en-scène encompasses everything situated before the lens: blocking, production design, wardrobe, lighting temperature, and the expressive choreography of bodies across space. The director ensures every creative department serves a unified emotional narrative.`,
        tonyNotes: 'If the director does not grasp the core emotional truth of a scene, the entire crew shoots in the dark.',
      },
      {
        title: '2. Directing Actors: Action Verbs and Active Subtext',
        subtitle: 'Guiding dramatic performances without prescribing emotional adjectives',
        content: `Never direct actors using static adjectives ('be angrier', 'look sadder'). Actors thrive on playable transitive verbs ('to seduce', 'to intimidate', 'to beg', 'to disarm'). Dramatic subtext fuels physical behavior while spoken lines obey superficial social decorum.`,
        tonyNotes: 'Give the actor an active objective and allow the emotion to ignite naturally from the struggle.',
      },
    ],
    es: [
      {
        title: '1. La Visión del Director y la Puesta en Escena',
        subtitle: 'La armonización de los elementos visibles en el encuadre',
        content: `La puesta en escena (mise-en-scène) es la disposición armónica de todo lo que ocurre ante la cámara: escenografía, vestuario, iluminación y el movimiento coreográfico de los actores. El director sintetiza las decisiones de cada departamento bajo una visión dramática indivisible.`,
        tonyNotes: 'Si el director desconoce el propósito ético y dramático de la escena, el equipo rueda a ciegas.',
      },
      {
        title: '2. Dirección de Actores: Verbos de Acción y Subtexto',
        subtitle: 'Conducir al elenco mediante objetivos activos y no adjetivos estériles',
        content: `Evita dirigir con adjetivos inertes ('sé más alegre', 'pon cara de enfado'). Los actores crean interpretaciones memorables a partir de verbos de acción ('desarmar', 'acorralar', 'suplicar', 'seducir'). El subtexto orienta el cuerpo mientras las palabras disimulan la intención.`,
        tonyNotes: 'Otorga al actor un objetivo claro y tangible: la emoción auténtica brotará de la acción.',
      },
    ],
    fr: [
      {
        title: '1. La Vision du Cinéaste et la Mise en Scène',
        subtitle: 'L\'orchestration de l\'espace, des corps et de la lumière',
        content: `La mise en scène est l\'art d\'agencer tout ce qui prend vie devant l\'objectif : déplacement des comédiens, décor, accessoires, costumes et intensité lumineuse. Le réalisateur n\'est pas un exécutant, mais le garant de la cohérence sensible de l\'œuvre.`,
        tonyNotes: 'Si le réalisateur ignore l\'enjeu viscéral d\'un plan, l\'équipe entière filme à l\'aveuglette.',
      },
      {
        title: '2. La Direction d\'Acteurs : Verbes d\'Action et Sous-Texte',
        subtitle: 'Guider le jeu par des intentions actives plutôt que des adjectifs futiles',
        content: `Ne donnez jamais d\'indications psychologiques figées ('sois plus triste', 'fais l\'énervé'). Dirigez toujours par des verbes d\'action concrets ('provoquer', 'charmer', 'soumettre', 'supplier'). Le sous-texte dicte la tension corporelle tandis que la réplique masque l\'angoisse.`,
        tonyNotes: 'Donnez à l\'acteur un obstacle et une intention nette : l\'émotion surgira spontanément.',
      },
    ],
  },
  5: {
    pt: [
      {
        title: '1. A Fotografia Cinematográfica e a Iluminação',
        subtitle: 'Desenhar com sombras e esculpir o espaço dramático',
        content: `A direção de fotografia não visa apenas gerar imagens bonitas, mas criar atmosfera e significado. O esquema básico de 3 pontos (Luz Principal, Luz de Preenchimento e Luz de Contorno/Backlight) é o ponto de partida para controlar o contraste e o clima da cena.`,
        tonyNotes: 'A sombra é tão importante quanto a luz. É na sombra que mora o mistério e a tridimensionalidade.',
      },
    ],
    en: [
      {
        title: '1. Cinematography and Lighting Design',
        subtitle: 'Painting with shadows and sculpting dramatic space',
        content: `Cinematography is not merely capturing pretty pictures; it is visual dramaturgy. The foundational three-point lighting system (Key Light, Fill Light, and Backlight/Rim) serves as the baseline to calibrate contrast ratios, mood, and psychological depth.`,
        tonyNotes: 'Shadows are as vital as light. It is in the shadow where cinematic mystery and texture truly reside.',
      },
    ],
    es: [
      {
        title: '1. Dirección de Fotografía e Iluminación',
        subtitle: 'Pintar con sombras y esculpir el espacio dramático',
        content: `La fotografía cinematográfica es dramaturgia visual, no simple adorno técnico. El esquema clásico de tres puntos (Luz Principal, Luz de Relleno y Contraluz) constituye la base para dominar las relaciones de contraste y la atmósfera dramática.`,
        tonyNotes: 'La sombra es tan esencial como la luz. En la sombra habita el misterio y el volumen de la imagen.',
      },
    ],
    fr: [
      {
        title: '1. Direction de la Photographie et Éclairage',
        subtitle: 'Sculpter l\'espace dramatique par l\'ombre et la lumière',
        content: `L\'art de la photographie de cinéma ne réside pas dans la simple esthétique, mais dans la dramaturgie optique. Le schéma fondamental en trois points (Lumière Clé, Débouchage et Contre-jour) est le socle pour sculpter les contrastes et instaurer l\'atmosphère émotionnelle.`,
        tonyNotes: 'L\'ombre est tout aussi éloquente que la lumière. C\'est au cœur de l\'obscurité que naît le relief cinématique.',
      },
    ],
  },
  6: {
    pt: [
      {
        title: '1. O Desenho de Som e a Captação Direta',
        subtitle: 'A dimensão invisível da imersão cinematográfica',
        content: `O público perdoa uma fotografia modesta, mas jamais tolera um áudio inteligível ou ruidoso. O som direto limpo, somado aos efeitos de Foley, ambiência sonora e trilha original, constrói 50% da experiência cinematográfica.`,
        tonyNotes: 'Ouça o set antes de rodar. Silencie geladeiras, ares-condicionados e ruídos externos.',
      },
    ],
    en: [
      {
        title: '1. Sound Design and Production Audio',
        subtitle: 'The invisible dimension of cinematic immersion',
        content: `Audiences will forgive a modest camera sensor, but will instantly reject muffled or distorted audio. Pristine production dialogue, complemented by Foley textures, spatial room tone, and subtle score, accounts for half of the visceral cinema experience.`,
        tonyNotes: 'Always listen to the room acoustic before calling action. Eliminate refrigerators and ambient hums.',
      },
    ],
    es: [
      {
        title: '1. Diseño Sonoro y Grabación Directa',
        subtitle: 'La dimensión invisible de la inmersión cinematográfica',
        content: `El espectador perdona una cámara accesible, pero jamás un sonido distorsionado o ininteligible. Un audio directo nítido, enriquecido con foley, ambientes espaciales y banda sonora, conforma la mitad de la experiencia sensorial del filme.`,
        tonyNotes: 'Escucha el set antes de filmar. Desconecta aires acondicionados y neutraliza ruidos molestos.',
      },
    ],
    fr: [
      {
        title: '1. Conception Sonore et Prise de Son Directe',
        subtitle: 'La dimension invisible de l\'immersion filmique',
        content: `Le public pardonne volontiers une caméra modeste, mais rejette instantanément un son parasité ou inintelligible. Une prise de son directe irréprochable, sublimée par les bruitages (foley), ambiances spatiales et musique de fosse, compose la moitié du choc cinématographique.`,
        tonyNotes: 'Écoutez le plateau avant chaque prise. Coupez réfrigérateurs et cliquetis parasites.',
      },
    ],
  },
  7: {
    pt: [
      {
        title: '1. Montagem: A Reescrita Final do Filme',
        subtitle: 'Ritmo, elipses e a construção de sentido pelo corte',
        content: `A montagem é onde o filme nasce pela terceira e última vez. O Efeito Kuleshov demonstra que a justaposição de dois planos gera um terceiro sentido inexistente em cada plano isolado. O ritmo do corte dita os batimentos cardíacos da plateia.`,
        tonyNotes: 'Corte sempre por uma razão dramática, e nunca apenas porque o tempo passou.',
      },
    ],
    en: [
      {
        title: '1. Film Editing: The Final Rewrite',
        subtitle: 'Rhythm, temporal ellipses, and meaning created through juxtaposition',
        content: `The editing room is where the film is reborn for the final time. The Kuleshov Effect proves that joining two shots produces a psychological collision greater than the sum of its parts. Cutting rhythm directly dictates the audience\'s heartbeat.`,
        tonyNotes: 'Only cut when emotion or visual information demands it; never cut aimlessly.',
      },
    ],
    es: [
      {
        title: '1. Montaje Cinematográfico: La Reescritura Definitiva',
        subtitle: 'Ritmo, elipsis temporales y la generación de sentido por el corte',
        content: `En la sala de montaje el filme experimenta su encarnación final. El Efecto Kuleshov confirma que yuxtaponer dos encuadres genera una emoción invisible en cada plano por separado. El ritmo de los cortes conduce el pulso del espectador.`,
        tonyNotes: 'Corta únicamente cuando el pulso dramático lo reclame; jamás por mero capricho cronológico.',
      },
    ],
    fr: [
      {
        title: '1. Le Montage : La Réécriture Ultime du Film',
        subtitle: 'Cadence, ellipses temporelles et jaillissement du sens par la coupe',
        content: `La table de montage est le lieu où le film renaît pour la troisième et dernière fois. L\'Effet Koulechov prouve que la juxtaposition de deux plans engendre un sens inédit. Le tempo de la coupe régule le souffle et l\'émotion du spectateur.`,
        tonyNotes: 'Ne coupez que si l\'émotion ou une impérieuse nécessité narrative vous y oblige.',
      },
    ],
  },
  8: {
    pt: [
      {
        title: '1. Produção Executiva e Gestão no Set',
        subtitle: 'Cronogramas, liderança ética e viabilidade real',
        content: `Produzir é viabilizar artisticamente um sonho com responsabilidade financeira e respeito humano. A elaboração da Ordem do Dia (Call Sheet), respeito às pausas de alimentação e segurança da equipe são deveres inegociáveis do produtor.`,
        tonyNotes: 'Um set alegre e pontual produz filmes extraordinários. Trate sua equipe com generosidade e respeito.',
      },
    ],
    en: [
      {
        title: '1. Line Producing and Set Discipline',
        subtitle: 'Call sheets, crew safety, ethical leadership, and schedule execution',
        content: `Producing means turning artistic vision into physical reality through disciplined financial stewardship and humane leadership. Issuing timely call sheets, adhering to turnaround times, and safeguarding crew well-being are non-negotiable standards.`,
        tonyNotes: 'A well-fed, respected, and punctual crew produces visual miracles. Lead with integrity.',
      },
    ],
    es: [
      {
        title: '1. Producción Ejecutiva y Liderazgo en Set',
        subtitle: 'Órdenes de rodaje, presupuesto responsable y seguridad de equipo',
        content: `Producir es hacer viable un sueño artístico con rigor presupuestario y respeto ético hacia las personas. El plan de rodaje (Call Sheet), el respeto a los descansos y la seguridad física del equipo son responsabilidades sagradas.`,
        tonyNotes: 'Un equipo motivado, bien alimentado y respetado rueda obras maestras.',
      },
    ],
    fr: [
      {
        title: '1. Production Exécutive et Organisation de Plateau',
        subtitle: 'Feuilles de service, sécurité de l\'équipe et rigueur budgétaire',
        content: `Produire consiste à donner corps à une vision artistique avec rectitude financière et humanité. L\'élaboration minutieuse de la feuille de service (Call Sheet), le respect scrupuleux des temps de repos et la sécurité de chacun sont des prérequis absolus.`,
        tonyNotes: 'Une équipe respectée, bien nourrie et ponctuelle accomplit des prouesses sur le plateau.',
      },
    ],
  },
  9: {
    pt: [
      {
        title: '1. Distribuição, Festivais e Carreira Audiovisual',
        subtitle: 'Estratégias de lançamento, press-kit e janelas de exibição',
        content: `O filme não termina na exportação do master. O circuito de festivais exige estratégia: seleção assertiva de eventos, confecção de cartazes e teasers de alto impacto, inscrições organizadas (FilmFreeway) e construção de networking profissional.`,
        tonyNotes: 'Não envie seu filme para festivais aleatoriamente. Estude a linha curatorial de cada mostra.',
      },
    ],
    en: [
      {
        title: '1. Distribution, Festivals, and Career Strategy',
        subtitle: 'Festival strategy, press kits, and premiere marketing',
        content: `A movie is not complete upon final rendering. The festival circuit requires targeted strategy: curatorial research, compelling one-sheets, teaser trailers, systematic submissions (FilmFreeway), and international networking.`,
        tonyNotes: 'Never submit blindly. Carefully analyze the programmer identity and catalogue of every festival.',
      },
    ],
    es: [
      {
        title: '1. Distribución, Festivais y Carrera Cinematográfica',
        subtitle: 'Estrategias de estreno, press-kit y circuito de muestras internacionales',
        content: `La obra no culmina con el render final. El recorrido por festivales demanda estrategia: selección curatorial afinada, póster y teaser de impacto, inscripciones metódicas (FilmFreeway) y creación de vínculos profesionales duraderos.`,
        tonyNotes: 'No envíes tu película a ciegas. Estudia con detenimiento la línea editorial de cada certamen.',
      },
    ],
    fr: [
      {
        title: '1. Distribution, Festivals et Stratégie de Carrière',
        subtitle: 'Circuits de diffusion, dossiers de presse et fenêtres d\'exploitation',
        content: `Le voyage du film commence au master final. Le circuit des festivals exige une méthode rigoureuse : ciblage des sélections, affiches saisissantes, bandes-annonces percutantes, inscriptions coordonnées (FilmFreeway) et réseau professionnel.`,
        tonyNotes: 'Ne soumettez pas au hasard. Examinez attentivement la ligne éditoriale de chaque festival.',
      },
    ],
  },
  10: {
    pt: [
      {
        title: '1. O Curta-Metragem Final e a Mostra CineLab',
        subtitle: 'A síntese de todas as etapas e o nascimento do realizador',
        content: `A realização do seu curta-metragem (1 a 5 minutos) consolida o aprendizado dos 10 módulos. Da ideia ao roteiro, da filmagem à edição, você agora domina as ferramentas práticas para expressar sua voz no cinema contemporâneo.`,
        tonyNotes: 'Parabéns pela jornada! O cinema não é uma profissão; é um modo de contemplar e transformar o mundo.',
      },
    ],
    en: [
      {
        title: '1. The Capstone Short Film and CineLab Showcase',
        subtitle: 'Synthesizing knowledge into an authentic directorial voice',
        content: `Crafting your capstone short film (1 to 5 minutes) crowns your comprehensive journey across all 10 modules. From concept to script, production to edit, you now command the fundamental language to share your vision with the global cinema landscape.`,
        tonyNotes: 'Congratulations on this milestone! Cinema is not merely a technical craft; it is a profound way of experiencing the human condition.',
      },
    ],
    es: [
      {
        title: '1. El Cortometraje Final y la Muestra CineLab',
        subtitle: 'La síntesis de todas las etapas y el nacimiento del realizador',
        content: `La realización de tu cortometraje final (1 a 5 minutos) consolida la maestría de los 10 módulos. De la idea al guion, del rodaje al montaje, dominas ya las herramientas fundamentales para plasmar tu propia voz cinematográfica.`,
        tonyNotes: '¡Enhorabuena por este gran logro! El cine no es solo un oficio; es una forma de sentir y transformar la realidad.',
      },
    ],
    fr: [
      {
        title: '1. Le Court-Métrage de Fin d\'Études et la Projection CineLab',
        subtitle: 'L\'aboutissement de la formation et l\'affirmation du réalisateur',
        content: `La réalisation de votre court-métrage (1 à 5 minutes) concrétise l\'apprentissage des 10 modules. De l\'étincelle initiale au scénario, du tournage au montage final, vous maîtrisez désormais les leviers pour exprimer votre regard sur le monde.`,
        tonyNotes: 'Félicitations pour cette trajectoire ! Le cinéma est bien plus qu\'une technique ; c\'est un art d\'habiter poétiquement le monde.',
      },
    ],
  },
};

export function getTranslatedApostilaSections(
  fallbackSections: ApostilaSection[],
  moduleId: number,
  lang: Language
): ApostilaSection[] {
  if (lang === 'pt' || !fallbackSections) return fallbackSections;

  const translatedList = APOSTILA_SECTION_TRANSLATIONS[moduleId]?.[lang];
  if (!translatedList || translatedList.length === 0) return fallbackSections;

  return fallbackSections.map((sec, idx) => {
    const tSec = translatedList[idx] || translatedList[0];
    return {
      ...sec,
      title: tSec.title || sec.title,
      subtitle: tSec.subtitle || sec.subtitle,
      content: tSec.content || sec.content,
      contentMarkdown: tSec.content || sec.contentMarkdown,
      tonyNotes: tSec.tonyNotes || sec.tonyNotes,
      keyTakeaway: tSec.tonyNotes || sec.keyTakeaway,
    };
  });
}

// -------------------------------------------------------------
// FOLDERS & SUB-FOLDERS SYSTEM (Pastas e Sub-pastas Didáticas)
// -------------------------------------------------------------
export interface CourseFileItem {
  id: string;
  name: string;
  type: 'pdf' | 'eval' | 'video' | 'reading' | 'doc';
  sizeOrPages: string;
  description: string;
  status: 'available' | 'locked';
  moduleId?: number;
  actionRoute?: string;
  actionParam?: any;
}

export interface CourseSubFolder {
  id: string;
  name: string;
  slug: string;
  description: string;
  itemCount: number;
  iconType: 'book' | 'award' | 'film' | 'file' | 'check';
  files: CourseFileItem[];
}

export interface CourseFolderCategory {
  id: string;
  name: string;
  slug: string;
  description: string;
  subFolders: CourseSubFolder[];
}

export function getFolderHierarchy(lang: Language): CourseFolderCategory[] {
  const isPt = lang === 'pt';
  const isEn = lang === 'en';
  const isEs = lang === 'es';
  const isFr = lang === 'fr';

  return [
    {
      id: 'cat-apostilas',
      name: isPt
        ? 'Pastas de Apostilas & Manuais Técnicos'
        : isEn
        ? 'Handouts & Technical Manuals Folders'
        : isEs
        ? 'Carpetas de Manuales y Guías Técnicas'
        : 'Dossiers des Fascicules & Manuels Techniques',
      slug: 'apostilas',
      description: isPt
        ? 'Todo o material didático oficial em PDF protegido e ementas divididas por módulos'
        : isEn
        ? 'All official protected course reading materials and syllabus divided by modules'
        : isEs
        ? 'Todo el material didáctico oficial en PDF protegido y programas temáticos'
        : 'Tout le matériel didactique officiel en PDF sécurisé et programmes thématiques',
      subFolders: [
        {
          id: 'sub-apostilas-oficiais',
          name: isPt
            ? 'Sub-pasta: 10 Apostilas Oficiais do Curso (Módulos 01 a 10)'
            : isEn
            ? 'Sub-folder: 10 Official Course Handouts (Modules 01 to 10)'
            : isEs
            ? 'Sub-carpeta: 10 Manuales Oficiales del Curso (Módulos 01 al 10)'
            : 'Sous-dossier : 10 Fascicules Officiels du Cours (Modules 01 à 10)',
          slug: 'oficiais',
          description: isPt ? 'Volumes didáticos de formação integral em realização cinematográfica com leitura protegida online'
            : isEn ? 'Comprehensive professional film directing training volumes with protected online reader'
            : isEs ? 'Volúmenes completos de formación en dirección cinematográfica con lector protegido online'
            : 'Volumes complets de formation à la réalisation cinématographique avec lecteur protégé en ligne',
          itemCount: 10,
          iconType: 'book',
          files: Array.from({ length: 10 }).map((_, i) => {
            const modNum = i + 1;
            return {
              id: `file-apostila-${modNum}`,
              name: isPt
                ? `Apostila Técnica 0${modNum} — CINELAB Oficial.pdf`
                : isEn
                ? `Technical Handout 0${modNum} — CINELAB Official.pdf`
                : isEs
                ? `Manual Técnico 0${modNum} — CINELAB Oficial.pdf`
                : `Fascicule Technique 0${modNum} — CINELAB Officiel.pdf`,
              type: 'pdf',
              sizeOrPages: (() => {
                const realPages = modNum === 1 ? 8 : (modNum === 5 ? 6 : 4);
                return isPt ? `${realPages} páginas • Leitor Canvas` : (isEs ? `${realPages} páginas • Lector Canvas` : (isFr ? `${realPages} pages • Lecteur Canvas` : `${realPages} pages • Canvas Reader`));
              })(),
              description: isPt
                ? `Material didático oficial da Etapa 0${modNum} com decupagens, esquemas e exercícios de fixação.`
                : isEn
                ? `Official study material for Stage 0${modNum} with camera setups, diagrams, and comprehension drills.`
                : isEs
                ? `Material didáctico oficial de la Etapa 0${modNum} con encuadres técnicos y ejercicios.`
                : `Matériel didactique officiel de l'Étape 0${modNum} avec découpages et schémas techniques.`,
              status: 'available',
              moduleId: modNum,
              actionRoute: 'apostilas',
              actionParam: { openModuleId: modNum },
            };
          }),
        },
        {
          id: 'sub-apostilas-bonus',
          name: isPt
            ? 'Sub-pasta: Apostilas Bônus & Guias de Consulta Rápida'
            : isEn
            ? 'Sub-folder: Bonus Handouts & Quick Reference Guides'
            : isEs
            ? 'Sub-carpeta: Manuales Bônus y Guías de Referencia Rápida'
            : 'Sous-dossier : Fascicules Bonus & Guides de Référence Rapide',
          slug: 'bonus',
          description: isPt
            ? 'Guias complementares de consulta permanente no set de filmagem e na sala de roteiro'
            : isEn
            ? 'Permanent on-set reference guides and screenwriting toolkits'
            : isEs
            ? 'Guías de consulta permanente para el rodaje y el cuarto de guionistas'
            : 'Guides de consultation permanente sur le plateau de tournage et d\'écriture',
          itemCount: 2,
          iconType: 'book',
          files: [
            {
              id: 'file-bonus-1',
              name: isPt
                ? 'Bônus 01: Glossário Ilustrado de Escala de Planos & Lentes.pdf'
                : isEn
                ? 'Bonus 01: Illustrated Glossary of Shot Scales & Cinema Lenses.pdf'
                : isEs
                ? 'Bônus 01: Glosario Ilustrado de Escala de Planos y Lentes.pdf'
                : 'Bonus 01: Glossaire Illustré des Échelles de Plans & Objectifs.pdf',
              type: 'pdf',
              sizeOrPages: isPt ? '30 páginas • Leitor Canvas' : '30 pages • Canvas Reader',
              description: isPt
                ? 'Catálogo visual de planos, ângulos e distâncias focais para consulta do diretor e diretor de fotografia.'
                : isEn
                ? 'Visual catalog of shot sizes, angles, and focal lengths for director and DP reference.'
                : isEs
                ? 'Catálogo visual de planos, ángulos y distancias focales para directores y DF.'
                : 'Catalogue visuel des plans, angles et focales pour réalisateurs et chefs opérateurs.',
              status: 'available',
              moduleId: 1,
              actionRoute: 'apostilas',
              actionParam: { openBonusId: 'bonus-1' },
            },
            {
              id: 'file-bonus-2',
              name: isPt
                ? 'Bônus 02: Guia Prático de Roteiro e Estrutura Dramática.pdf'
                : isEn
                ? 'Bonus 02: Screenwriting Practical Guide & Dramatic Architecture.pdf'
                : isEs
                ? 'Bônus 02: Guía Práctica de Guion y Arquitectura Dramática.pdf'
                : 'Bonus 02: Guide Pratique d\'Écriture et Architecture Dramatique.pdf',
              type: 'pdf',
              sizeOrPages: isPt ? '29 páginas • Leitor Canvas' : '29 pages • Canvas Reader',
              description: isPt
                ? 'Modelos profissionais de escaleta, arcos de transformação, diálogos cinematográficos e formatação padrão.'
                : isEn
                ? 'Industry standard beat sheets, character arcs, cinematic dialogue tips, and script formatting.'
                : isEs
                ? 'Plantillas profesionales de escaleta, arcos de personajes y formateo internacional de guion.'
                : 'Modèles professionnels de séquencier, arcs dramatiques et mise en page standard de scénario.',
              status: 'available',
              moduleId: 3,
              actionRoute: 'apostilas',
              actionParam: { openBonusId: 'bonus-2' },
            },
          ],
        },
      ],
    },
    {
      id: 'cat-avaliacoes',
      name: isPt
        ? 'Pastas de Avaliações & Treinamento'
        : isEn
        ? 'Assessments & Training Folders'
        : isEs
        ? 'Carpetas de Evaluaciones y Entrenamiento'
        : 'Dossiers des Évaluations & Entraînements',
      slug: 'avaliacoes',
      description: isPt
        ? 'Instrumentos de verificação pedagógica, nota mínima de aprovação 6.0 e simulados interativos'
        : isEn
        ? 'Academic evaluation tools, 6.0 minimum passing threshold, and interactive training quizzes'
        : isEs
        ? 'Instrumentos de evaluación académica, nota mínima 6.0 y simulacros interactivos'
        : 'Outils d\'évaluation pédagogique, note minimale 6.0 et quiz d\'entraînement interactifs',
      subFolders: [
        {
          id: 'sub-avaliacoes-oficiais',
          name: isPt
            ? 'Sub-pasta: Provas Oficiais do Curso (Módulos 01 a 10)'
            : isEn
            ? 'Sub-folder: Official Course Exams (Modules 01 to 10)'
            : isEs
            ? 'Sub-carpeta: Exámenes Oficiales del Curso (Módulos 01 al 10)'
            : 'Sous-dossier : Épreuves Officielles du Cours (Modules 01 à 10)',
          slug: 'provas-oficiais',
          description: isPt
            ? '10 questões objetivas por etapa • Nota mínima 6.0 para certificação'
            : isEn
            ? '10 objective questions per module • Minimum passing grade 6.0 for certificate'
            : isEs
            ? '10 preguntas objetivas por etapa • Nota mínima 6.0 para certificación'
            : '10 questions objectives par étape • Note minimale 6.0 pour le certificat',
          itemCount: 10,
          iconType: 'check',
          files: Array.from({ length: 10 }).map((_, i) => {
            const modNum = i + 1;
            return {
              id: `eval-oficial-${modNum}`,
              name: isPt
                ? `Prova Oficial do Módulo 0${modNum} (10 Questões • Média >= 6.0)`
                : isEn
                ? `Official Exam for Module 0${modNum} (10 Questions • Passing >= 6.0)`
                : isEs
                ? `Examen Oficial del Módulo 0${modNum} (10 Preguntas • Nota >= 6.0)`
                : `Épreuve Officielle du Module 0${modNum} (10 Questions • Moyenne >= 6.0)`,
              type: 'eval',
              sizeOrPages: isPt ? '10 Questões • 10.0 pts' : '10 Questions • 10.0 pts',
              description: isPt
                ? `Avaliação curricular do Módulo 0${modNum}. Resultado imediato e cômputo da média final de certificação.`
                : isEn
                ? `Curricular assessment for Module 0${modNum}. Instant grading toward your graduation average.`
                : isEs
                ? `Evaluación curricular del Módulo 0${modNum}. Calificación inmediata hacia el promedio final.`
                : `Évaluation officielle du Module 0${modNum}. Correction instantanée pour la moyenne de certification.`,
              status: modNum <= 2 ? 'available' : 'locked',
              moduleId: modNum,
              actionRoute: 'avaliacoes',
              actionParam: { moduleId: modNum },
            };
          }),
        },
        {
          id: 'sub-treinamento-simulados',
          name: isPt
            ? 'Sub-pasta: Avaliações Práticas de Treinamento (Sem Penalidade)'
            : isEn
            ? 'Sub-folder: Practical Training Quizzes (No Penalty Drills)'
            : isEs
            ? 'Sub-carpeta: Evaluaciones Prácticas de Entrenamiento'
            : 'Sous-dossier : Évaluations Pratiques d\'Entraînement',
          slug: 'treinamentos',
          description: isPt
            ? 'Simulados ao lado de cada apostila para testar conhecimentos antes da prova oficial'
            : isEn
            ? 'Interactive drills adjacent to each handout to consolidate knowledge before taking the official exam'
            : isEs
            ? 'Simulacros interactivos junto a cada manual para reforzar conceptos sin afectar calificaciones'
            : 'Quiz interactifs à côté de chaque fascicule pour s\'entraîner sans pénalité de note',
          itemCount: 10,
          iconType: 'check',
          files: Array.from({ length: 10 }).map((_, i) => {
            const modNum = i + 1;
            return {
              id: `training-drill-${modNum}`,
              name: isPt
                ? `Simulado de Treinamento da Etapa 0${modNum} (Comentado pelo Prof. Tony de Luc)`
                : isEn
                ? `Training Drill for Stage 0${modNum} (With Commentary by Prof. Tony de Luc)`
                : isEs
                ? `Simulacro de Entrenamiento Etapa 0${modNum} (Comentarios del Prof. Tony de Luc)`
                : `Entraînement Pratique Étape 0${modNum} (Commenté par le Prof. Tony de Luc)`,
              type: 'eval',
              sizeOrPages: isPt ? 'Prática Interativa • Sem Nota' : 'Interactive Drill • No Penalty',
              description: isPt
                ? `Responda quantas vezes desejar e receba explicações didáticas imediatas sobre a gramática do cinema.`
                : isEn
                ? `Practice as many times as you like and receive instant pedagogical explanations from the director.`
                : isEs
                ? `Practica cuantas veces quieras y recibe explicaciones didácticas inmediatas del director.`
                : `Répétez autant que souhaité et recevez les explications didactiques immédiates du réalisateur.`,
              status: 'available',
              moduleId: modNum,
              actionRoute: 'apostilas',
              actionParam: { openTrainingModal: modNum },
            };
          }),
        },
      ],
    },
    {
      id: 'cat-recursos',
      name: isPt
        ? 'Pastas de Cinemateca & Biblioteca do Realizador'
        : isEn
        ? 'Film Library & Director\'s Reading Vault Folders'
        : isEs
        ? 'Carpetas de Cinemateca y Biblioteca del Realizador'
        : 'Dossiers de la Cinémathèque & Bibliothèque du Réalisateur',
      slug: 'recursos',
      description: isPt
        ? 'Filmografia comentada, decupagens de obras-primas e leituras bibliográficas obrigatórias'
        : isEn
        ? 'Curated filmography, masterpiece scene analyses, and essential film bibliography'
        : isEs
        ? 'Filmografía comentada, análisis de planos y lecturas bibliográficas fundamentales'
        : 'Filmographie commentée, analyses de scènes et lectures obligatoires du cinéaste',
      subFolders: [
        {
          id: 'sub-cinemateca',
          name: isPt
            ? 'Sub-pasta: Cinemateca & Fichas Técnicas dos Filmes'
            : isEn
            ? 'Sub-folder: Film Library & Curated Film Factsheets'
            : isEs
            ? 'Sub-carpeta: Cinemateca y Fichas Técnicas de Películas'
            : 'Sous-dossier : Cinémathèque & Fiches Techniques de Films',
          slug: 'cinemateca',
          description: isPt
            ? 'Obras cinematográficas para observação orientada com olhar crítico de direção'
            : isEn
            ? 'Essential films for guided directing breakdown and cinematography analysis'
            : isEs
            ? 'Películas indispensables para observación guiada con mirada de realizador'
            : 'Films indispensables pour une observation guidée et analytique de la mise en scène',
          itemCount: 10,
          iconType: 'film',
          files: Array.from({ length: 10 }).map((_, i) => {
            const modNum = i + 1;
            return {
              id: `film-file-${modNum}`,
              name: isPt
                ? `Ficha Crítica & Roteiro de Observação do Filme da Etapa 0${modNum}`
                : isEn
                ? `Critical Analysis & Observation Sheet for Film in Stage 0${modNum}`
                : isEs
                ? `Ficha Crítica y Guía de Observación de la Película Etapa 0${modNum}`
                : `Fiche Critique & Guide de Visionnage du Film de l'Étape 0${modNum}`,
              type: 'video',
              sizeOrPages: isPt ? 'Ficha Técnica + Player Oficial' : 'Factsheet + Official Streaming',
              description: isPt
                ? `Análise em 6 camadas: enquadramento, iluminação, som, decupagem, atuação e montagem.`
                : isEn
                ? '6-layer film analysis: framing, lighting, acoustic design, blocking, performance, and montage.'
                : isEs
                ? 'Análisis fílmico en 6 capas: encuadre, iluminación, sonido, actuación y montaje.'
                : 'Analyse filmique en 6 strates : cadre, lumière, son, découpage, jeu et montage.',
              status: 'available',
              moduleId: modNum,
              actionRoute: 'filmes-leituras',
              actionParam: { tab: 'filmes', moduleId: modNum },
            };
          }),
        },
        {
          id: 'sub-leituras',
          name: isPt
            ? 'Sub-pasta: Biblioteca & Leituras Obrigatórias'
            : isEn
            ? 'Sub-folder: Library & Mandatory Readings'
            : isEs
            ? 'Sub-carpeta: Biblioteca y Lecturas Obligatorias'
            : 'Sous-dossier : Bibliothèque & Lectures Obligatoires',
          slug: 'leituras',
          description: isPt
            ? 'Textos seminais, livros clássicos de cinema e artigos teóricos recomendados'
            : isEn
            ? 'Seminal film theory essays, directing books, and aesthetic treatises'
            : isEs
            ? 'Ensayos teóricos, libros clásicos de dirección y gramática audiovisual'
            : 'Essais théoriques, livres classiques de réalisation et grammaire audiovisuelle',
          itemCount: 10,
          iconType: 'file',
          files: Array.from({ length: 10 }).map((_, i) => {
            const modNum = i + 1;
            return {
              id: `reading-file-${modNum}`,
              name: isPt
                ? `Leitura Teórica Recomendada da Etapa 0${modNum}`
                : isEn
                ? `Theoretical Reading Assignment for Stage 0${modNum}`
                : isEs
                ? `Lectura Teórica Recomendada de la Etapa 0${modNum}`
                : `Lecture Théorique Recommandée de l'Étape 0${modNum}`,
              type: 'reading',
              sizeOrPages: isPt ? 'Leitura Crítica Online' : 'Critical Reading Online',
              description: isPt
                ? `Fundamentação teórica e reflexões estéticas para enriquecer a visão autoral do aluno.`
                : isEn
                ? 'Theoretical grounding and aesthetic reflections to strengthen authorial creative voice.'
                : isEs
                ? 'Fundamentos teóricos y reflexiones estéticas para consolidar la voz autoral del cineasta.'
                : 'Fondements théoriques et réflexions esthétiques pour enrichir le regard d\'auteur de l\'élève.',
              status: 'available',
              moduleId: modNum,
              actionRoute: 'filmes-leituras',
              actionParam: { tab: 'leituras', moduleId: modNum },
            };
          }),
        },
      ],
    },
    {
      id: 'cat-secretaria',
      name: isPt
        ? 'Pasta de Secretaria & Certificação'
        : isEn
        ? 'Academic Office & Certification Folder'
        : isEs
        ? 'Carpeta de Secretaría y Certificación'
        : 'Dossier du Secrétariat & Certification',
      slug: 'secretaria',
      description: isPt
        ? 'Controle de frequência, histórico acadêmico, média de aprovação (mínimo 6.0) e emissão de diploma'
        : isEn
        ? 'Student tracking, academic transcript, passing grade (min 6.0), and diploma issuance'
        : isEs
        ? 'Historial académico, control de notas (mínimo 6.0) y emisión del certificado oficial'
        : 'Relevé académique, moyenne de passage (min 6.0) et délivrance du certificat officiel',
      subFolders: [
        {
          id: 'sub-documentos',
          name: isPt
            ? 'Sub-pasta: Certificado Oficial & Autenticação Digital'
            : isEn
            ? 'Sub-folder: Official Certificate & Digital Verification'
            : isEs
            ? 'Sub-carpeta: Certificado Oficial y Autenticación Digital'
            : 'Sous-dossier : Certificat Officiel & Authentification Numérique',
          slug: 'documentos',
          description: isPt
            ? 'Diploma de 180 horas reconhecido pelo mercado, emitido com QR Code e chave criptográfica única'
            : isEn
            ? 'Industry recognized 180-hour diploma issued with verifiable QR Code and cryptographic key'
            : isEs
            ? 'Diploma de 180 horas con código QR verificable y clave criptográfica única'
            : 'Diplôme officiel de 180 heures avec QR Code vérifiable et clé cryptographique unique',
          itemCount: 2,
          iconType: 'award',
          files: [
            {
              id: 'file-cert-180h',
              name: isPt
                ? 'Certificado Profissional de Conclusão (180h • Média >= 6.0).pdf'
                : isEn
                ? 'Professional Certificate of Completion (180h • Grade >= 6.0).pdf'
                : isEs
                ? 'Certificado Profesional de Graduación (180h • Nota >= 6.0).pdf'
                : 'Certificat Professionnel d\'Aptitude (180h • Moyenne >= 6.0).pdf',
              type: 'doc',
              sizeOrPages: isPt ? 'Documento Oficial 180 Horas' : 'Official 180-Hour Document',
              description: isPt
                ? 'Critério: Concluir as 10 avaliações e atingir média igual ou superior a 6.0.'
                : isEn
                ? 'Criteria: Complete all 10 assessments and achieve an average grade of 6.0 or higher.'
                : isEs
                ? 'Criterio: Completar las 10 evaluaciones y alcanzar un promedio igual o superior a 6.0.'
                : 'Critère : Valider les 10 évaluations et obtenir une moyenne égale ou supérieure à 6.0.',
              status: 'available',
              actionRoute: 'certificado',
            },
            {
              id: 'file-cert-validation',
              name: isPt
                ? 'Portal de Validação Pública de Autenticidade do Certificado'
                : isEn
                ? 'Public Certificate Authenticity Verification Portal'
                : isEs
                ? 'Portal de Validación Pública de Autenticidad del Certificado'
                : 'Portail de Vérification Publique d\'Authenticité du Certificat',
              type: 'doc',
              sizeOrPages: isPt ? 'Validador Online Instantâneo' : 'Instant Online Verification',
              description: isPt
                ? 'Permite a produtoras, canais de TV e festivais validar a veracidade do diploma emitido pelo CINELAB.'
                : isEn
                ? 'Allows production companies, studios, and film festivals to verify diploma authenticity instantly.'
                : isEs
                ? 'Permite a productoras y festivales verificar la autenticidad del diploma expedido por CINELAB.'
                : 'Permet aux sociétés de production et festivals de vérifier l\'authenticité du certificat en ligne.',
              status: 'available',
              actionRoute: 'validar-certificado',
            },
          ],
        },
      ],
    },
  ];
}
