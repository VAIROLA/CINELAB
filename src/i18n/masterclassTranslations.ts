/**
 * Masterclass Translations for CINELAB Stages 1 to 10
 * Provides multi-language synthesis, pedagogical subtitles, and directing guidance
 * in Portuguese, English, Spanish, and French.
 */

export interface MasterclassStageTranslation {
  stageTitle: string;
  stageSubtitle: string;
  lectureSummary: string;
  tonyQuote: string;
  keyDirectingRules: string[];
  handoutConnection: string;
  audioNotice: string;
}

export const MASTERCLASS_STAGE_TRANSLATIONS: Record<number, Record<'pt' | 'en' | 'es' | 'fr', MasterclassStageTranslation>> = {
  1: {
    pt: {
      stageTitle: 'Etapa 01 – A Linguagem Audiovisual e o Olhar do Cineasta',
      stageSubtitle: 'A menor unidade dramática do cinema: o plano, a escala e a intenção narrativa.',
      lectureSummary: 'O Professor Cineasta Tony de Luc introduz os fundamentos essenciais da formação. Você aprenderá como o cinema difere de todas as outras artes, por que o enquadramento nunca é inocente e como a escolha entre um Plano Geral e um Close-up altera dramaticamente o peso moral da cena.',
      tonyQuote: 'O cinema não nasce de câmeras caras. O cinema nasce da verdade do seu olhar e da precisão com que você escolhe onde cortar.',
      keyDirectingRules: [
        'A escala de plano dita a proximidade psicológica do espectador com o personagem.',
        'Respeite o eixo de ação de 180° para manter a orientação espacial do público.',
        'Cada corte deve responder a uma necessidade emocional, e nunca a um mero capricho visual.'
      ],
      handoutConnection: 'Consulte as páginas 12 a 38 da Apostila 01 para diagramas de set e decupagem completa da Ilha das Flores.',
      audioNotice: 'Áudio original captado em estúdio acústico CINELAB. Para máxima fidelidade sonora, utilize fones estéreo.'
    },
    en: {
      stageTitle: 'Stage 01 – Audiovisual Language & The Director’s Vision',
      stageSubtitle: 'The core dramatic unit of cinema: the shot, frame scale, and narrative intent.',
      lectureSummary: 'Professor Tony de Luc introduces the core pillars of filmmaking. Discover why cinema differs from literature and theater, why framing is always a moral choice, and how transitioning from Wide Shot to Close-up completely shifts audience empathy.',
      tonyQuote: 'Cinema does not stem from expensive gear. It is born from authentic vision and the discipline of knowing exactly where to cut.',
      keyDirectingRules: [
        'Shot scale establishes emotional and psychological proximity to the protagonist.',
        'Always maintain the 180-degree axis to preserve coherent screen direction.',
        'Every cut must serve an emotional urgency, never purely cosmetic styling.'
      ],
      handoutConnection: 'Refer to pages 12–38 of Handout 01 for full set schematics and the breakdown of Isle of Flowers.',
      audioNotice: 'Original studio-recorded audio. Use stereo headphones for optimal acoustic fidelity.'
    },
    es: {
      stageTitle: 'Etapa 01 – El Lenguaje Audiovisual y la Mirada del Cineasta',
      stageSubtitle: 'La unidad dramática fundamental del cine: el plano, la escala y la intención narrativa.',
      lectureSummary: 'El profesor y cineasta Tony de Luc presenta los fundamentos de la formación. Aprenderá en qué se distingue el cine de las demás artes, por qué el encuadre nunca es neutro y cómo la escala de plano transforma la empatía del espectador.',
      tonyQuote: 'El cine no depende de equipos costosos; nace de la verdad de tu mirada y de la precisión con la que decides encuadrar y cortar.',
      keyDirectingRules: [
        'La escala de plano define la proximidad emocional entre espectador y personaje.',
        'Respete el eje de 180 grados para garantizar una orientación espacial diáfana.',
        'Cada corte debe obedecer a una necesidad dramática inaplazable.'
      ],
      handoutConnection: 'Consulte las páginas 12 a 38 del Manual 01 para ver esquemas de planta y el análisis de Isla de las Flores.',
      audioNotice: 'Audio original de estudio CINELAB. Use auriculares para apreciar cada matiz sonoro.'
    },
    fr: {
      stageTitle: 'Étape 01 – Le Langage Audiovisuel et le Regard du Cinéaste',
      stageSubtitle: 'La cellule dramatique première du cinéma : le plan, l’échelle et l’intention de mise en scène.',
      lectureSummary: 'Le cinéaste Tony de Luc pose les fondements de la formation. Vous découvrirez ce qui distingue le cinéma du théâtre, pourquoi le cadrage est toujours un parti pris éthique et comment le passage du plan large au gros plan bouleverse l’impact de la scène.',
      tonyQuote: 'Le cinéma ne naît pas de caméras onéreuses, mais de la justesse de votre regard et de la rigueur de vos choix de découpage.',
      keyDirectingRules: [
        'L’échelle des plans gouverne la proximité psychologique avec le personnage.',
        'Respectez la règle des 180° pour assurer la continuité spatiale du regard.',
        'Chaque raccord doit répondre à une nécessité dramatique profonde.'
      ],
      handoutConnection: 'Consultez les pages 12 à 38 du Fascicule 01 pour les plans d’implantation et l’analyse de L’Île aux Fleurs.',
      audioNotice: 'Son original enregistré en studio CINELAB. Écouteurs recommandés pour une clarté optimale.'
    }
  },
  2: {
    pt: {
      stageTitle: 'Etapa 02 – As Raízes do Cinema e a Análise Fílmica em 6 Camadas',
      stageSubtitle: 'História do cinema, evolução da linguagem e dissecação técnica plano a plano.',
      lectureSummary: 'Nesta masterclass, Tony de Luc demonstra a metodologia proprietária das 6 Camadas de Análise Fílmica: Roteiro & Premissa, Direção & Mise-en-scène, Fotografia & Iluminação, Desenho de Som & Trilha, Montagem & Ritmo, e Subtexto & Significado.',
      tonyQuote: 'Não assista a um filme como consumidor passivo. Desmonte a cena como um relojoeiro para entender cada engrenagem dramática.',
      keyDirectingRules: [
        'Analise como a montagem dialética de Eisenstein cria sentido pelo choque entre planos.',
        'Identifique o ponto de virada (plot point) e como ele é sustentado visualmente.',
        'Aprenda a ler a iluminação como manifestação psicológica do conflito.'
      ],
      handoutConnection: 'Apostila 02 (páginas 20 a 55) traz o guia prático passo a passo das 6 camadas com estudo de Potemkin.',
      audioNotice: 'Gravação em alta fidelidade com isolamento acústico profissional.'
    },
    en: {
      stageTitle: 'Stage 02 – Cinema Roots & 6-Layer Film Analysis',
      stageSubtitle: 'Film history, visual grammar evolution, and methodical shot-by-shot dissection.',
      lectureSummary: 'Tony de Luc unpacks the 6-Layer Film Analysis Framework: Screenplay & Premise, Directing & Staging, Cinematography & Light, Sound Design & Score, Editing & Rhythm, and Subtext & Theme.',
      tonyQuote: 'Never watch a film as a passive spectator. Disassemble the scene like a master watchmaker to uncover every narrative gear.',
      keyDirectingRules: [
        'Observe how dialectical montage sparks intellectual concepts across cuts.',
        'Trace how plot points are reinforced through spatial blocking.',
        'Read camera lighting as psychological manifestations of internal conflict.'
      ],
      handoutConnection: 'Handout 02 (pages 20–55) contains the step-by-step 6-layer protocol with Potemkin case study.',
      audioNotice: 'High-fidelity audio recording with professional vocal mastering.'
    },
    es: {
      stageTitle: 'Etapa 02 – Raíces del Cine y Análisis Fílmico en 6 Capas',
      stageSubtitle: 'Historia del cine, gramática visual y disección técnica plano a plano.',
      lectureSummary: 'Tony de Luc demuestra el método de las 6 Capas: Guion, Puesta en Escena, Fotografía, Sonido, Montaje y Subtexto.',
      tonyQuote: 'No mires una película como simple consumidor. Desmonta la escena como un relojero para dominar su mecanismo.',
      keyDirectingRules: [
        'Examine cómo el montaje dialéctico genera conceptos a través del choque de planos.',
        'Detecte cómo los giros dramáticos se traducen en el encuadre.',
        'Interprete la iluminación como metáfora del estado interior del personaje.'
      ],
      handoutConnection: 'Manual 02 (páginas 20 a 55) con el protocolo completo y estudio de Potemkin.',
      audioNotice: 'Audio de alta fidelidad con masterización de voz en estudio.'
    },
    fr: {
      stageTitle: 'Étape 02 – Racines du Cinéma et Analyse Filmique en 6 Couches',
      stageSubtitle: 'Histoire du 7e art, syntaxe cinématographique et dissection plan par plan.',
      lectureSummary: 'Tony de Luc détaille la méthode des 6 couches : Scénario, Mise en scène, Photographie, Son, Montage et Sous-texte.',
      tonyQuote: 'Ne regardez plus les films en simple spectateur. Démontez la scène comme une horloge pour en maîtriser les rouages.',
      keyDirectingRules: [
        'Analysez le montage dialectique créant le sens par le choc des plans.',
        'Observez comment les pivots dramatiques s’inscrivent dans l’espace.',
        'Déchiffrez l’éclairage comme miroir des tourments intérieurs.'
      ],
      handoutConnection: 'Fascicule 02 (pages 20 à 55) avec guide d’analyse et cas pratique Potemkine.',
      audioNotice: 'Son haute fidélité avec traitement acoustique professionnel.'
    }
  },
  3: {
    pt: {
      stageTitle: 'Etapa 03 – O Coração do Roteiro: Conflito, Subtexto e Personagem',
      stageSubtitle: 'Premissa dramática, formato internacional Master Scenes e escaleta profissional.',
      lectureSummary: 'Como transformar uma faísca criativa em um roteiro executável. Tony de Luc disseca as três dimensões do personagem, a regra de ouro do subtexto (o que o personagem diz versus o que ele realmente quer) e a formatação profissional padrão indústria.',
      tonyQuote: 'Um bom diálogo não explica o que o personagem sente; ele esconde o que o personagem quer até que o silêncio revele a verdade.',
      keyDirectingRules: [
        'Ação dramática é comportamento sob pressão, não discurso.',
        'Use o formato Master Scenes: cabeçalho, ação visual no presente e diálogo enxuto.',
        'Apresente o conflito nos primeiros minutos do curta-metragem.'
      ],
      handoutConnection: 'Apostila 03 e Bônus 01 (Glossário de Planos) e Bônus 02 (Glossário de Roteiro) liberados para download.',
      audioNotice: 'Áudio estúdio masterizado. Recomenda-se volume moderado com fones.'
    },
    en: {
      stageTitle: 'Stage 03 – The Heart of the Script: Conflict, Subtext & Character',
      stageSubtitle: 'Dramatic premise, international Master Scenes layout, and professional beat sheet.',
      lectureSummary: 'Translating creative inspiration into a shootable script. Tony de Luc deconstructs character depth, subtext principles, and industry standard screenwriting syntax.',
      tonyQuote: 'Great dialogue never explains emotions; it conceals desires until silence reveals the raw truth.',
      keyDirectingRules: [
        'Dramatic action is behavior under pressure, never mere talk.',
        'Master Scenes format: sluglines, active visual action lines, and lean dialogue.',
        'Establish core dramatic conflict in the opening minutes of your short.'
      ],
      handoutConnection: 'Handout 03 plus Bonus 01 (Shot Glossary) & Bonus 02 (Script Glossary) ready in student area.',
      audioNotice: 'Mastered studio audio. Moderate volume with headphones recommended.'
    },
    es: {
      stageTitle: 'Etapa 03 – El Corazón del Guion: Conflicto, Subtexto y Personaje',
      stageSubtitle: 'Premisa dramática, formato internacional Master Scenes y escaleta.',
      lectureSummary: 'Construcción de personajes tridimensionales, el arte del subtexto y la disciplina del formato profesional.',
      tonyQuote: 'El buen diálogo no explica lo que siente el personaje; oculta lo que desea hasta que el silencio revela la verdad.',
      keyDirectingRules: [
        'La acción dramática es conducta bajo presión, no palabrería.',
        'Formato Master Scenes: encabezados, acción en presente y diálogo depurado.',
        'Plantee el conflicto central desde los primeros compases.'
      ],
      handoutConnection: 'Manual 03 y Bonos 01 y 02 (Glosarios) disponibles para consulta vitalicia.',
      audioNotice: 'Sonido estéreo de alta fidelidad optimizado para escucha clara.'
    },
    fr: {
      stageTitle: 'Étape 03 – Le Cœur du Scénario : Conflit, Sous-texte et Personnage',
      stageSubtitle: 'Prémisse dramatique, mise en page Master Scenes et séquencier de tournage.',
      lectureSummary: 'De l’idée brute au script tournable. Tony de Luc enseigne la construction des personnages et la force du non-dit.',
      tonyQuote: 'Le bon dialogue n’explique pas les sentiments ; il dissimule les désirs jusqu’à ce que le silence révèle la vérité.',
      keyDirectingRules: [
        'L’action dramatique est un comportement sous tension, non un discours.',
        'Norme Master Scenes : intitulés clairs, description au présent et dialogues épurés.',
        'Introduisez le nœud dramatique dès les premières minutes.'
      ],
      handoutConnection: 'Fascicule 03 et Bonus 01 & 02 (Glossaires) téléchargeables dans votre espace.',
      audioNotice: 'Prise de son studio haute clarté. Casque stéréo conseillé.'
    }
  },
  4: {
    pt: {
      stageTitle: 'Etapa 04 – A Liderança do Diretor e a Condução Sensível de Atores',
      stageSubtitle: 'Mise-en-scène, decupagem com intenção e comunicação autêntica no set.',
      lectureSummary: 'O diretor como maestro do set. Tony de Luc aborda ensaios sem engessar os atores, verbos de ação para orientar o elenco e a elaboração do plano de filmagem.',
      tonyQuote: 'Dirigir ator não é pedir para ele chorar ou rir; é dar a ele uma ação física inegociável e um segredo para guardar.',
      keyDirectingRules: [
        'Nunca dê orientações de resultado ao ator; trabalhe com objetivos e obstáculos.',
        'Mise-en-scène é a coreografia de corpos no espaço sob a ótica da lente.',
        'A decupagem deve servir à atuação, nunca sufocá-la com tecnicismo.'
      ],
      handoutConnection: 'Apostila 04 (páginas 15 a 48) detalha planilhas de decupagem e tabelas de ensaio.',
      audioNotice: 'Gravação original em estúdio com masterização dinâmica.'
    },
    en: {
      stageTitle: 'Stage 04 – Directorial Leadership & Directing Actors with Sensitivity',
      stageSubtitle: 'Staging, intentional shot design, and collaborative communication on set.',
      lectureSummary: 'The director as set orchestrator. Tony de Luc shares techniques for natural rehearsals, actionable directing verbs, and shooting schedules.',
      tonyQuote: 'Directing actors is not demanding tears or laughter; it is giving them an undeniable physical action and a secret to protect.',
      keyDirectingRules: [
        'Never direct for results; communicate through active objectives and hurdles.',
        'Mise-en-scène is the choreography of bodies in space captured by the lens.',
        'Shot breakdowns must support actor performance, never constrain it.'
      ],
      handoutConnection: 'Handout 04 (pages 15–48) provides shot lists and rehearsal sheets.',
      audioNotice: 'Clean studio audio with dynamic mastering.'
    },
    es: {
      stageTitle: 'Etapa 04 – Liderazgo del Director y Conducción de Actores',
      stageSubtitle: 'Puesta en escena, desglose con intención y comunicación en el set.',
      lectureSummary: 'El oficio de dirigir: ensayos orgánicos, verbos de acción y planificación de rodaje.',
      tonyQuote: 'Dirigir a un actor no es pedirle que llore o ría; es darle una acción física concreta y un secreto que guardar.',
      keyDirectingRules: [
        'Evite dar órdenes de resultado; trabaje con metas y resistencias.',
        'La puesta en escena es la danza de los cuerpos ante la cámara.',
        'El desglose técnico debe arropar la actuación.'
      ],
      handoutConnection: 'Manual 04 (páginas 15 a 48) con modelos de desglose de escena.',
      audioNotice: 'Audio de estudio masterizado en alta fidelidad.'
    },
    fr: {
      stageTitle: 'Étape 04 – Leadership du Réalisateur et Direction d’Acteurs',
      stageSubtitle: 'Mise en scène, découpage intentionnel et justesse sur le plateau.',
      lectureSummary: 'Le metteur en scène sur le plateau : répétitions vivantes, verbes d’action et plans de tournage.',
      tonyQuote: 'Diriger un acteur, ce n’est pas lui demander de pleurer ; c’est lui donner une action physique impérieuse et un secret à garder.',
      keyDirectingRules: [
        'Ne dirigez jamais au résultat ; définissez intentions et obstacles.',
        'La mise en scène est une chorégraphie des corps orchestrée pour l’objectif.',
        'Le découpage doit magnifier le jeu d’acteur sans l’étouffer.'
      ],
      handoutConnection: 'Fascicule 04 (pages 15 à 48) avec fiches de découpage technique.',
      audioNotice: 'Prise de son studio claire et chaleureuse.'
    }
  },
  5: {
    pt: {
      stageTitle: 'Etapa 05 – Pintar com a Luz: Óptica, Contraste e Fotografia',
      stageSubtitle: 'Direção de fotografia, esquemas de 3 pontos, luz natural e escolha de lentes.',
      lectureSummary: 'Tony de Luc e a pintura com a luz. Como a sombra constrói o volume e a tridimensionalidade, a temperatura de cor e a profundidade de campo como ferramentas narrativas.',
      tonyQuote: 'Quem ilumina tudo elimina o mistério. A fotografia cinematográfica nasce da sombra e da textura da penumbra.',
      keyDirectingRules: [
        'Construa primeiro a luz principal (Key), depois o preenchimento (Fill) e o contra-luz (Backlight).',
        'Lentes teleobjetivas achatam os planos; grandes angulares amplificam o ambiente.',
        'Use luz rebatida e difusores para suavizar o contraste em cenas intimistas.'
      ],
      handoutConnection: 'Apostila 05 traz esquemas fotográficos em planta baixa com marcação de refletores.',
      audioNotice: 'Áudio com espectro de frequências estéreo completo.'
    },
    en: {
      stageTitle: 'Stage 05 – Painting with Light: Optics, Contrast & Cinematography',
      stageSubtitle: 'Cinematography direction, 3-point lighting setups, natural light, and lens selection.',
      lectureSummary: 'Tony de Luc on shaping images with light. How shadows sculpt dimensionality, color temperature, and depth of field as storytelling devices.',
      tonyQuote: 'Lighting everything kills mystery. Cinematic photography is born from shadow and the sculpted edge of darkness.',
      keyDirectingRules: [
        'Set your Key light first, adjust Fill ratio, then shape depth with Backlight.',
        'Telephoto compresses space; wide angles emphasize environmental tension.',
        'Use bounce boards and diffusion for authentic, natural skin tones.'
      ],
      handoutConnection: 'Handout 05 provides overhead lighting floor plans with fixture marks.',
      audioNotice: 'Full-spectrum stereo audio recording.'
    },
    es: {
      stageTitle: 'Etapa 05 – Pintar con la Luz: Óptica, Contraste y Fotografía',
      stageSubtitle: 'Dirección de fotografía, esquema de 3 puntos, luz natural y lentes.',
      lectureSummary: 'Escultura de la luz, el valor dramático de las sombras y el manejo de la profundidad de campo.',
      tonyQuote: 'Iluminarlo todo destruye el misterio. La cinematografía nace de la sombra y del claroscuro.',
      keyDirectingRules: [
        'Defina la luz principal (Key), gradúe el relleno (Fill) y separe con el contraluz.',
        'Lentes teleobjetivo comprimen; los angulares expanden el escenario.',
        'Rebotes y difusores generan texturas creíbles y cinematográficas.'
      ],
      handoutConnection: 'Manual 05 con diagramas de iluminación en planta cenital.',
      audioNotice: 'Audio estéreo de amplio rango dinámico.'
    },
    fr: {
      stageTitle: 'Étape 05 – Peindre avec la Lumière : Optique, Contraste et Cadre',
      stageSubtitle: 'Direction photo, éclairage 3 points, lumière naturelle et choix des focales.',
      lectureSummary: 'Façonner l’image par la lumière. Le rôle de la pénombre, température de couleur et focales au service du récit.',
      tonyQuote: 'Tout éclairer anéantit le mystère. La photographie de cinéma naît de l’ombre et de la matière des noirs.',
      keyDirectingRules: [
        'Installez la lumière principale (Key), équilibrez le débouchage (Fill) et détachez au contre-jour.',
        'Les longues focales écrasent l’espace ; les grands angles amplifient la tension.',
        'Privilégiez la lumière réfléchie et diffuse pour préserver le naturel.'
      ],
      handoutConnection: 'Fascicule 05 avec plans de feux et schémas d’éclairage détaillés.',
      audioNotice: 'Son studio équilibré à haute dynamique.'
    }
  },
  6: {
    pt: {
      stageTitle: 'Etapa 06 – O Invisível que Emociona: Captação e Desenho de Som',
      stageSubtitle: 'Microfonação no set, ruídos de sala (Foley), ambiência e mixagem cinematográfica.',
      lectureSummary: 'Tony de Luc revela por que 50% da experiência cinematográfica é o som. Como posicionar o boom para captar a verdade da voz, o perigo de ruídos parasitas e a construção de paisagens sonoras imersivas.',
      tonyQuote: 'O público perdoa uma imagem granulada; mas nunca perdoa um som inaudível ou abafado. O som é a alma invisível do cinema.',
      keyDirectingRules: [
        'Grave sempre 60 segundos de som direto da sala (room tone) antes de desmontar o set.',
        'O microfone de lapela garante clareza; o microfone boom garante profundidade espacial.',
        'O desenho de som deve sugerir o que está fora de quadro (espaço extracampo).'
      ],
      handoutConnection: 'Apostila 06 detalha microfonação de set e fluxos de mixagem com Pro Tools e DaVinci Fairlight.',
      audioNotice: 'Atenção especial nesta aula aos exemplos de equalização e acústica.'
    },
    en: {
      stageTitle: 'Stage 06 – The Invisible Emotion: Sound Recording & Sound Design',
      stageSubtitle: 'On-set mic placement, Foley art, room acoustics, and cinematic mix balance.',
      lectureSummary: 'Tony de Luc demonstrates why sound represents 50% of the film experience. Boom positioning, room tone capture, and constructing immersive soundscapes.',
      tonyQuote: 'Audiences forgive grainy images; they never forgive muddy or unintelligible sound. Sound is the invisible soul of cinema.',
      keyDirectingRules: [
        'Always record 60 seconds of silent room tone before wrapping a location.',
        'Lavaliers ensure verbal clarity; boom mics preserve organic acoustic depth.',
        'Sound design breathes life into what lies beyond the edges of the frame.'
      ],
      handoutConnection: 'Handout 06 covers set audio chains and mixing workflows in DaVinci Fairlight.',
      audioNotice: 'Pay special acoustic attention to the frequency comparisons demonstrated.'
    },
    es: {
      stageTitle: 'Etapa 06 – Lo Invisible que Conmueve: Sonido Directo y Sonorización',
      stageSubtitle: 'Microfonía en set, efectos de sala (Foley), ambiente y mezcla fílmica.',
      lectureSummary: 'La importancia capital del sonido: colocación de cañón (boom), eliminación de ruidos y atmósferas envolventes.',
      tonyQuote: 'El público tolera una imagen con grano, pero jamás un sonido ininteligible. El sonido es el alma invisible de la película.',
      keyDirectingRules: [
        'Grabe siempre un minuto de sonido ambiente del espacio (room tone).',
        'El micrófono de solapa da nitidez; el boom aporta aire y volumen espacial.',
        'El diseño de sonido debe evocar lo que sucede fuera de campo.'
      ],
      handoutConnection: 'Manual 06 con diagramas de captura y técnicas de mezcla sonora.',
      audioNotice: 'Escuche con auriculares para notar las variaciones de acústica de set.'
    },
    fr: {
      stageTitle: 'Étape 06 – L’Invisible qui Émeut : Prise de Son et Sound Design',
      stageSubtitle: 'Perche sur le plateau, bruitage (Foley), ambiance et mixage multicanal.',
      lectureSummary: 'Pourquoi le son constitue 50 % du film. Placement de la perche, son direct, room tone et création d’univers acoustiques.',
      tonyQuote: 'Le spectateur pardonne une image imparfaite ; il ne pardonne jamais un son étouffé. Le son est l’âme invisible du cinéma.',
      keyDirectingRules: [
        'Enregistrez systématiquement une minute de son seul (room tone) à chaque décor.',
        'Les micros cravate assurent l’intelligibilité ; la perche capture la vérité spatiale.',
        'Le sound design doit faire vivre tout ce qui se passe hors-champ.'
      ],
      handoutConnection: 'Fascicule 06 avec chaînes d’enregistrement et workflows Fairlight.',
      audioNotice: 'Écoute au casque vivement recommandée pour ce module.'
    }
  },
  7: {
    pt: {
      stageTitle: 'Etapa 07 – A Escultura do Tempo: A Arte da Montagem e Ritmo',
      stageSubtitle: 'Teoria da montagem, efeito Kuleshov, ritmo dramático e corte invisível.',
      lectureSummary: 'Tony de Luc conduz a dissecação do ritmo cinematográfico. Como o corte contrai ou dilata o tempo, cortes no movimento e a preservação da cadência emocional.',
      tonyQuote: 'A montagem é onde o filme renasce pela terceira vez. É a respiração secreta que comanda o coração de quem assiste.',
      keyDirectingRules: [
        'Corte no movimento da ação para tornar a transição invisível aos olhos.',
        'Varie a duração dos planos para criar dinamismo rítmico.',
        'Não corte cedo demais: deixe o plano respirar quando a verdade emocional assim exigir.'
      ],
      handoutConnection: 'Apostila 07 detalha técnicas de montagem paralela, alternada e montagem métrica.',
      audioNotice: 'Exemplos com áudio sincronizado e cortes em continuidade.'
    },
    en: {
      stageTitle: 'Stage 07 – Sculpting in Time: The Craft of Editing & Pacing',
      stageSubtitle: 'Montage theory, Kuleshov effect, dramatic pacing, and invisible continuity cuts.',
      lectureSummary: 'Tony de Luc unpacks the editorial architecture of film. Compressing and dilating time, cutting on action, and honoring emotional cadence.',
      tonyQuote: 'Editing is where the film is reborn for the third time. It is the secret rhythm that governs the viewer’s heartbeat.',
      keyDirectingRules: [
        'Cut on action movement to render transitions invisible to the viewer.',
        'Vary shot durations to build dramatic accelerations and pauses.',
        'Never cut too quickly: let the shot breathe when human truth resonates.'
      ],
      handoutConnection: 'Handout 07 details parallel editing, cross-cutting, and metric montage.',
      audioNotice: 'Synchronized edit demonstrations with matched studio audio.'
    },
    es: {
      stageTitle: 'Etapa 07 – Esculpir el Tiempo: El Arte del Montaje y el Ritmo',
      stageSubtitle: 'Teoría del montaje, efecto Kuleshov, ritmo dramático y corte en continuidad.',
      lectureSummary: 'El montaje como tercera escritura del film: dilatación temporal, corte en acción y respiración dramática.',
      tonyQuote: 'El montaje es donde la película renace por tercera vez. Es la respiración que guía los latidos del espectador.',
      keyDirectingRules: [
        'Corte en el movimiento para lograr transiciones invisibles.',
        'Alterne la duración de los planos para modular el pulso dramático.',
        'Deje respirar el encuadre cuando la emoción lo demande.'
      ],
      handoutConnection: 'Manual 07 con análisis pormenorizado del montaje métrico y rítmico.',
      audioNotice: 'Ejemplos con sonido de edición sincronizado.'
    },
    fr: {
      stageTitle: 'Étape 07 – Sculpter le Temps : L’Art du Montage et du Rythme',
      stageSubtitle: 'Théorie du montage, effet Koulechov, tempo dramatique et raccord dans le mouvement.',
      lectureSummary: 'La troisième écriture du film : contraction et dilatation du temps, raccords invisibles et tempo émotionnel.',
      tonyQuote: 'Le montage est le lieu où le film renaît pour la troisième fois. C’est la respiration secrète qui dicte le pouls du spectateur.',
      keyDirectingRules: [
        'Coupez dans le mouvement pour rendre le raccord imperceptible.',
        'Variez la durée des plans pour insuffler une pulsation vivante.',
        'Laissez le plan respirer quand la vérité du regard l’exige.'
      ],
      handoutConnection: 'Fascicule 07 avec décryptage du montage alterné et parallèle.',
      audioNotice: 'Démonstrations de raccords avec mixage son calé à l’image.'
    }
  },
  8: {
    pt: {
      stageTitle: 'Etapa 08 – A Alma Visual: Direção de Arte, Paleta e Figurino',
      stageSubtitle: 'Cenografia, psicologia das cores, caracterização de época e texturas de cena.',
      lectureSummary: 'A construção do universo visual. Tony de Luc demonstra como a escolha das cores, objetos cênicos e figurinos revelam a biografia oculta dos personagens sem precisar de falas.',
      tonyQuote: 'A direção de arte fala quando os personagens calam. Cada detalhe na parede conta de onde o personagem veio.',
      keyDirectingRules: [
        'Defina uma paleta cromática dominante com 1 a 2 cores de acento dramático.',
        'Cuidado com o excesso de objetos: no cinema, menos elementos com maior significado é sempre melhor.',
        'O figurino deve parecer vivido e habitado pelo personagem, nunca recém-saído da loja.'
      ],
      handoutConnection: 'Apostila 08 traz guias de cartelas de cores e decupagem de arte em longas premiados.',
      audioNotice: 'Áudio masterizado com clareza vocal cristalina.'
    },
    en: {
      stageTitle: 'Stage 08 – The Visual Soul: Production Design, Palette & Wardrobe',
      stageSubtitle: 'Set dressing, color psychology, period characterization, and tactile textures.',
      lectureSummary: 'Building the visual universe. Tony de Luc shows how color choices, props, and costumes communicate backstories without a single line of expository dialogue.',
      tonyQuote: 'Production design speaks when characters fall silent. Every mark on the wall tells where they came from.',
      keyDirectingRules: [
        'Define a coherent color palette with 1 to 2 deliberate accent colors.',
        'Avoid cluttered frames: fewer, deeply meaningful props carry vastly more weight.',
        'Costumes must look lived-in and weathered by the character’s history.'
      ],
      handoutConnection: 'Handout 08 contains color theory moodboards and art department call sheets.',
      audioNotice: 'Mastered vocal audio with crystal-clear dynamic presence.'
    },
    es: {
      stageTitle: 'Etapa 08 – El Alma Visual: Dirección de Arte, Paleta y Vestuario',
      stageSubtitle: 'Escenografía, psicología del color, caracterización y texturas.',
      lectureSummary: 'Creación del universo escénico: paletas cromáticas, atrezo y diseño de vestuario con intención dramática.',
      tonyQuote: 'La dirección de arte habla cuando los personajes callan. Cada detalle en el decorado revela su historia.',
      keyDirectingRules: [
        'Establezca una paleta cromática rectora con colores de acento emocional.',
        'Evite la sobrecarga: la sobriedad con significado potencia el impacto visual.',
        'El vestuario debe reflejar la vida cotidiana del personaje.'
      ],
      handoutConnection: 'Manual 08 con guías de paletas y desglose de arte profesional.',
      audioNotice: 'Sonido estéreo balanceado en estudio.'
    },
    fr: {
      stageTitle: 'Étape 08 – L’Âme Visuelle : Direction Artistique, Décors et Costumes',
      stageSubtitle: 'Scénographie, psychologie des couleurs, patine et texture des décors.',
      lectureSummary: 'Bâtir un univers cinématographique tangible : couleurs, accessoires et costumes révélateurs du passé intime des personnages.',
      tonyQuote: 'La direction artistique s’exprime quand les personnages se taisent. Chaque matière à l’écran raconte leur vérité.',
      keyDirectingRules: [
        'Définissez une harmonie de couleurs stricte avec des touches d’accentuation choisies.',
        'Évitez la surcharge : la pureté des lignes renforce l’autorité du cadre.',
        'Les costumes doivent porter l’usure et le vécu des personnages.'
      ],
      handoutConnection: 'Fascicule 08 avec nuanciers de couleurs et fiches de repérage décor.',
      audioNotice: 'Prise de son studio claire et dynamique.'
    }
  },
  9: {
    pt: {
      stageTitle: 'Etapa 09 – O Motor da Realização: Produção Executiva e Leis de Fomento',
      stageSubtitle: 'Planilhas orçamentárias, ordem do dia, cronogramas de set e editais de cinema.',
      lectureSummary: 'Transformando a arte em viabilidade concreta. Tony de Luc ensina como planejar um orçamento realista, estruturar a ordem do dia para não estourar horas no set e inscrever projetos em editais e leis de incentivo.',
      tonyQuote: 'O produtor competente protege a visão artística do diretor da tirania do tempo e do dinheiro.',
      keyDirectingRules: [
        'Um minuto de tela em média consome de 1 a 2 horas reais de filmagem.',
        'Nunca inicie as filmagens sem contratos e termos de autorização de imagem e voz assinados.',
        'A ordem do dia (call sheet) deve ser clara, antecipada e rigorosamente cumprida.'
      ],
      handoutConnection: 'Apostila 09 traz planilhas orçamentárias editáveis e modelos de ordem do dia profissional.',
      audioNotice: 'Gravação clara com orientação prática passo a passo.'
    },
    en: {
      stageTitle: 'Stage 09 – The Production Engine: Producing, Budgets & Film Grants',
      stageSubtitle: 'Budget sheets, call sheets, production timelines, and public financing mechanisms.',
      lectureSummary: 'Transforming artistic vision into concrete production reality. Tony de Luc breaks down budgeting, efficient set schedules, release forms, and film funding applications.',
      tonyQuote: 'A skilled producer shields the director’s artistic vision from the tyranny of limited time and budget.',
      keyDirectingRules: [
        'One finished screen minute typically requires 1 to 2 hours of actual set time.',
        'Never roll cameras without signed release and location agreements in hand.',
        'Call sheets must be clear, sent well in advance, and honored strictly.'
      ],
      handoutConnection: 'Handout 09 includes editable budget spreadsheets and industry call sheet templates.',
      audioNotice: 'Crisp studio audio detailing concrete production processes.'
    },
    es: {
      stageTitle: 'Etapa 09 – El Motor de la Realización: Producción Ejecutiva y Financiación',
      stageSubtitle: 'Presupuestos, orden de rodaje, cronogramas y fondos de fomento.',
      lectureSummary: 'Viabilidad de la obra: presupuestos, orden del día para optimizar horas de set y presentación a convocatorias.',
      tonyQuote: 'El productor talentoso blinda la visión del director frente a la tiranía del tiempo y los recursos.',
      keyDirectingRules: [
        'Un minuto de metraje útil exige de 1 a 2 horas efectivas de rodaje.',
        'Asegure cesiones de derechos de imagen y sonido antes de encender la cámara.',
        'La orden de rodaje (call sheet) es la brújula inviolable del set.'
      ],
      handoutConnection: 'Manual 09 con plantillas de presupuesto y contratos tipo.',
      audioNotice: 'Audio de alta claridad pedagógica.'
    },
    fr: {
      stageTitle: 'Étape 09 – Le Moteur de la Production : Financement, Devis et Feuille de Service',
      stageSubtitle: 'Budgets prévisionnels, dépouillement, feuilles de service et guichets de subvention.',
      lectureSummary: 'Donner corps à l’ambition artistique. Budgétisation, optimisation des journées de tournage et constitution de dossiers de production.',
      tonyQuote: 'Un bon producteur protège la vision artistique du réalisateur de la tyrannie du temps et des contraintes matérielles.',
      keyDirectingRules: [
        'Une minute de film monté requiert entre 1 et 2 heures de tournage effectif.',
        'Ne tournez jamais sans autorisations de droit à l’image et de lieu signées.',
        'La feuille de service doit être précise, transmise la veille et scrupuleusement respectée.'
      ],
      handoutConnection: 'Fascicule 09 avec modèles de feuilles de service et tableaux budgétaires.',
      audioNotice: 'Enregistrement vocal soigné et direct.'
    }
  },
  10: {
    pt: {
      stageTitle: 'Etapa 10 – O Encontro com o Público: Distribuição, Festivais e Conclusão',
      stageSubtitle: 'Estratégia de festivais de cinema, pitch profissional, mercado e formatura.',
      lectureSummary: 'A reta final da formação CINELAB. Tony de Luc orienta como inscrever curtas em festivais internacionais (Cannes, Berlim, Gramado), preparar o trailer, o press kit e dar os primeiros passos sólidos no mercado audiovisual.',
      tonyQuote: 'O filme só existe de verdade quando encontra os olhos do espectador no escuro da sala de cinema. Parabéns pela jornada!',
      keyDirectingRules: [
        'Mapeie festivais alinhados à temática e linguagem estética do seu filme.',
        'Elabore um teaser enxuto de 60 segundos com o clímax visual do curta.',
        'Seu portfólio e o certificado CINELAB de 180 horas comprovam sua qualificação técnica.'
      ],
      handoutConnection: 'Apostila 10 detalha listas de festivais com prazos e o guia de emissão do seu Certificado.',
      audioNotice: 'Masterclass de encerramento em áudio comemorativo de estúdio.'
    },
    en: {
      stageTitle: 'Stage 10 – Connecting with the World: Festivals, Distribution & Graduation',
      stageSubtitle: 'Film festival circuit strategies, industry pitch, portfolio, and course graduation.',
      lectureSummary: 'The grand finale of CINELAB. Tony de Luc guides you through submitting your films to festivals (Cannes, Berlin, Clermont-Ferrand), creating teasers, press kits, and entering the industry.',
      tonyQuote: 'A film only truly exists when it meets the audience’s gaze in the sacred darkness of the cinema. Congratulations on your journey!',
      keyDirectingRules: [
        'Target film festivals that celebrate the specific genre and aesthetic of your short.',
        'Craft a captivating 60-second teaser showcasing peak cinematic tension.',
        'Your CINELAB 180h Certificate validates your professional directorial proficiency.'
      ],
      handoutConnection: 'Handout 10 includes festival directories and graduation certificate protocols.',
      audioNotice: 'Grand finale lecture with commemorative studio acoustic mastering.'
    },
    es: {
      stageTitle: 'Etapa 10 – El Encuentro con el Público: Festivales, Distribución y Graduación',
      stageSubtitle: 'Ruta de festivales, preparación de press kits, mercado y titulación.',
      lectureSummary: 'Cierre de la formación: estrategia de festivais internacionales, montaje de tráiler y salida al mercado profesional.',
      tonyQuote: 'La película solo vive cuando se proyecta ante los ojos del público en la penumbra de la sala. ¡Felicidades por tu formación!',
      keyDirectingRules: [
        'Seleccione certámenes acordes al perfil estético y temático de su obra.',
        'Elabore un adelanto de 60 segundos con la máxima intensidad visual.',
        'Su certificado CINELAB de 180 horas acredita su competencia directiva.'
      ],
      handoutConnection: 'Manual 10 con guía de festivales y emisión de certificado oficial.',
      audioNotice: 'Audio de clausura en máxima fidelidad.'
    },
    fr: {
      stageTitle: 'Étape 10 – La Rencontre avec le Public : Festivals, Marché et Diplôme',
      stageSubtitle: 'Stratégie de diffusion en festivals, dossier de presse, pitch et remise du diplôme.',
      lectureSummary: 'L’apothéose de la formation CINELAB. Comment inscrire votre film en festival (Cannes, Clermont-Ferrand), préparer la bande-annonce et intégrer le milieu professionnel.',
      tonyQuote: 'Le film n’existe pleinement que lorsqu’il rencontre le regard des spectateurs dans l’obscurité de la salle. Félicitations pour votre parcours !',
      keyDirectingRules: [
        'Ciblez les festivals en affinité avec la singularité stylistique de votre court-métrage.',
        'Montez un teaser percutant de 60 secondes condensant la force visuelle du film.',
        'Votre certification CINELAB 180h atteste de vos compétences de réalisateur.'
      ],
      handoutConnection: 'Fascicule 10 avec carnet d’adresses des festivals et modalités de diplôme.',
      audioNotice: 'Enregistrement de clôture masterisé pour une expérience commémorative.'
    }
  }
};
