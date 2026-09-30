export interface EssaySection {
  title: string;
  subtitle?: string;
  paragraphs: string[];
  keyTakeaway?: string;
}

export interface ReadingEssay {
  id: string;
  moduleId: number;
  bookTitle: string;
  originalTitle?: string;
  author: string;
  year?: string;
  suggestedChapter: string;
  estimatedMinutes: number;
  sections: EssaySection[];
  practicalExercise: {
    title: string;
    instructions: string;
  };
  tonyDeLucCommentary: string;
}

export const CRITICAL_READING_ESSAYS: Record<string, ReadingEssay> = {
  'read-1': {
    id: 'read-1',
    moduleId: 1,
    bookTitle: 'A Linguagem do Cinema',
    originalTitle: 'Le Langage Cinématographique',
    author: 'Marcel Martin',
    year: '1955',
    suggestedChapter: 'Capítulos 1 e 2: A Unidade Fílmica e a Expressão pelo Enquadramento',
    estimatedMinutes: 45,
    tonyDeLucCommentary:
      'Marcel Martin realizou o trabalho definitivo de dissecação da gramática do cinema. Ele nos lembra que a câmera não é um olho neutro que registra o mundo passivamente, mas um instrumento de pensamento e dramaturgia. Ao escolher um Plano Médio em vez de um Primeiro Plano, o realizador está fazendo uma escolha moral e narrativa. Todo cineasta precisa dominar essas definições antes de quebrá-las.',
    sections: [
      {
        title: '1. O Plano como Unidade Dialética e Morfológica',
        paragraphs: [
          'Para Marcel Martin, o cinema atinge a condição de arte autônoma no momento exato em que transcende a reprodução mecânica da realidade — característica do cinematógrafo primitivo — para adotar uma linguagem articulada por planos.',
          'O plano não é apenas um fragmento espacial recortado pela janela ótica da lente; é a célula motriz da dramaturgia cinematográfica. Cada enquadramento carrega três dimensões indissociáveis: a dimensão física (o que está contido no quadro), a dimensão estética (como as massas, luzes e linhas de força se organizam) e a dimensão psicológica (qual o impacto afetivo produzido no espectador).',
          'Martin divide a evolução da gramática fílmica em dois grandes períodos: a fase primitiva (onde a cena teatral prevalecia e o espectador assistia imóvel) e a fase da linguagem madura (onde a câmera se move, fragmenta o espaço e orienta a atenção do olhar).',
        ],
        keyTakeaway: 'O enquadramento é o ato fundador da autoria: selecionar o que fica dentro do quadro implica excluir deliberadamente todo o resto do universo.',
      },
      {
        title: '2. A Escala dos Planos e a Proximidade Emocional',
        paragraphs: [
          'A escala de planos concebida no livro organiza a relação de proximidade entre o ser humano e o cenário. Martin delineia com precisão cirúrgica as funções de cada recorte:',
          '• Planos Gerais (PG / PE): Estabelecem a geografia espacial, a solidão ou a pequeneza do indivíduo perante o cosmos ou a cidade. A figura humana é engolida pelo ambiente envolvente.',
          '• Plano Médio e Plano Americano (PM / PA): O território do diálogo e da interação social. Permitem que a postura corporal e a gestualidade dos personagens conduzam a energia dramática da cena.',
          '• Primeiro Plano e Plano Detalhe (PP / PD): A invenção mais revolucionária do cinema. Ao isolar o rosto ou um objeto, o cineasta mergulha na intimidade da alma humana, transformando um piscar de olhos ou o tremor de um lábio em um terremoto dramático.',
        ],
        keyTakeaway: 'A transição entre planos gerais e planos fechados constrói a dinâmica de respiração e tensão do filme.',
      },
      {
        title: '3. Os Ângulos da Câmera e as Relações de Poder',
        paragraphs: [
          'Martin aprofunda as implicações psicológicas da angulação da câmera em relação ao sujeito em cena.',
          'O ângulo normal, no nível dos olhos, convida à empatia e à identificação direta com o personagem. Por outro lado, o plongée (câmera alta olhando para baixo) subjuga a figura retratada, evocando impotência, fragilidade ou esmagamento existencial.',
          'O contra-plongée (câmera baixa apontada para cima) amplifica a estatura, conferindo sensação de monumentalidade, autoritarismo, ameaça ou heroísmo. O cineasta consciente jamais usa esses ângulos como mero ornamento decorativo; cada inclinação é uma declaração dramática.',
        ],
        keyTakeaway: 'Nunca enquadre em plongée ou contra-plongée sem uma necessidade dramática justificável no roteiro.',
      },
    ],
    practicalExercise: {
      title: 'Laboratório de Decupagem: Três Escalas de Emoção',
      instructions:
        'Escolha uma cena silenciosa de 1 minuto em sua mente ou em um filme de sua preferência. Escreva a decupagem em 3 planos consecutivos justificando teoricamente a escolha segundo Marcel Martin: (1) Plano de Estabelecimento/Geografia, (2) Plano de Ação Interpessoal, e (3) Plano de Revelação Psicológica.',
    },
  },

  'read-2': {
    id: 'read-2',
    moduleId: 2,
    bookTitle: 'A Forma do Filme',
    originalTitle: 'Film Form: Essays in Film Theory',
    author: 'Sergei Eisenstein',
    year: '1949',
    suggestedChapter: 'A Estrutura do Filme e os Métodos de Montagem',
    estimatedMinutes: 50,
    tonyDeLucCommentary:
      'Eisenstein transformou a montagem de uma simples ferramenta de união de película em uma usina de conceitos. Sua ideia de que dois planos colidindo produzem uma terceira ideia inexistente nos planos isolados é o coração de toda a linguagem cinematográfica moderna. Estudar Eisenstein é aprender a pensar o ritmo e a potência intelectual do corte.',
    sections: [
      {
        title: '1. O Princípio Dialético do Cinema',
        paragraphs: [
          'Em A Forma do Filme, Sergei Eisenstein refuta categoricamente a visão mecanicista de que a montagem seria apenas a colagem linear de planos em sequência temporal.',
          'Para o mestre soviético, a essência do cinema é o conflito dialético (tese contra antítese gerando uma síntese inédita). Cada corte é uma colisão entre duas forças visuais: choque de linhas gráficas, choque de volumes de luz e sombra, choque de escalas temporais ou velocidades de movimento.',
          'Da fricção gerada pelo choque de dois planos adjacentes (A e B), nasce na mente do espectador um terceiro conceito (C), que não pertencia nem a A nem a B individualmente.',
        ],
        keyTakeaway: 'A montagem não é a soma de planos (1 + 1 = 2), mas uma multiplicação conceitual onde 1 + 1 resulta em uma nova ideia revolucionária.',
      },
      {
        title: '2. As Cinco Categorias de Montagem Eisensteiniana',
        paragraphs: [
          'Eisenstein categoriza os métodos de montagem em cinco níveis progressivos de sofisticação:',
          '1. Montagem Métrica: O corte ocorre baseado puramente na extensão física dos fotogramas ou no tempo em segundos, como um metrônomo rígido.',
          '2. Montagem Rítmica: O corte é determinado pelo movimento interno do quadro (o passo dos soldados, a velocidade de uma roda, o fluir da água).',
          '3. Montagem Tonal: Os cortes são orientados pelo tom emocional e sensorial (iluminação, texturas, vibrações de sombra, atmosfera gráfica dominante).',
          '4. Montagem Sobretonal: A fusão sinfônica e simultânea das três primeiras modalidades, gerando ressonâncias sutis no espectador.',
          '5. Montagem Intelectual: A colisão de imagens metafóricas para transmitir conceitos filosóficos ou sociopolíticos abstratos (como a célebre analogia da degola do boi associada ao massacre de operários em A Greve).',
        ],
        keyTakeaway: 'Dominar as cinco categorias permite ao realizador alternar entre a pura adrenalina física e o estímulo reflexivo profundo do público.',
      },
      {
        title: '3. A Escadaria de Odessa e a Dilatação do Tempo',
        paragraphs: [
          'Na histórica sequência da Escadaria de Odessa em O Encouraçado Potemkin, Eisenstein demonstra como a montagem é capaz de desconstruir o tempo físico real para criar um tempo psicológico hiperbólico.',
          'A descida da tropa czarista sobre a população indefesa dura na tela muito mais tempo do que levaria na física real. A fragmentação rítmica dos planos — os fuzis, as botas marchando, o carrinho de bebê descendo desgovernado os degraus — potencializa o terror e a comoção até o ápice.',
        ],
        keyTakeaway: 'O tempo no cinema é elástico: o realizador tem o poder de comprimir horas em segundos ou esticar dez segundos em minutos de angústia insuportável.',
      },
    ],
    practicalExercise: {
      title: 'Laboratório de Montagem Intelectual',
      instructions:
        'Conceba mentalmente uma colisão entre dois planos sem fala para expressar a ideia de "Ganância Corporativa" ou "Solidão Urbana". Descreva detalhadamente o Plano A (o sujeito) e o Plano B (o elemento de contraste) e explique como a junção cria a síntese pretendida.',
    },
  },

  'read-3': {
    id: 'read-3',
    moduleId: 3,
    bookTitle: 'Manual do Roteiro (Screenplay)',
    originalTitle: 'Screenplay: The Foundations of Screenwriting',
    author: 'Syd Field',
    year: '1979',
    suggestedChapter: 'O Paradigma dos Três Atos e os Pontos de Virada',
    estimatedMinutes: 45,
    tonyDeLucCommentary:
      'Syd Field foi o arquiteto da dramaturgia contemporânea. Sua estrutura em três atos não é uma fórmula que aprisiona, mas um mapa de navegação que impede que sua história afunde em um segundo ato tedioso. Se o seu roteiro está desmoronando, quase certamente é porque o Ponto de Virada 1 ou o Ponto Central (Midpoint) falharam.',
    sections: [
      {
        title: '1. O Paradigma Clássico dos Três Atos',
        paragraphs: [
          'Syd Field estabeleceu que todo longa ou curta-metragem dramático de sucesso obedece a uma arquitetura orgânica tripartite: Apresentação (Ato I), Confronto (Ato II) e Resolução (Ato III).',
          '• Ato I (Apresentação / Setup): Ocupa aproximadamente 25% da narrativa. É onde o mundo comum é estabelecido, o protagonista é apresentado em suas rotinas e carências, e o Incidente Incitante desestabiliza seu equilíbrio.',
          '• Ato II (Confronto): Ocupa 50% do roteiro. É a arena da batalha, onde o protagonista enfrenta obstáculos crescentes em busca do seu objetivo superando crises internas e antagonismos externos.',
          '• Ato III (Resolução): Os 25% finais. O clímax incontornável onde o conflito principal é levado ao extremo e resolvido, seguido pela nova ordem de equilíbrio.',
        ],
        keyTakeaway: 'O roteiro é um castelo arquitetado em alicerces invisíveis. Sem uma estrutura rígida, os melhores diálogos desmoronam.',
      },
      {
        title: '2. Plot Points: Os Pontos de Virada Decisivos',
        paragraphs: [
          'O conceito central cunhado por Field é o Plot Point (Ponto de Virada): um evento, incidente ou revelação que "engancha" a narrativa e a arremessa em uma direção completamente diferente.',
          'O Plot Point I ocorre no fim do Ato I: o protagonista toma uma decisão irreversível e cruza o limiar para o desconhecido. Ele não pode mais voltar ao seu mundo anterior.',
          'O Plot Point II encerra o Ato II: após a crise máxima (a "noite escura da alma"), o protagonista obtém a última peça de informação ou determinação emocional para confrontar o antagonista no clímax final.',
        ],
        keyTakeaway: 'Os Plot Points são momentos de não-retorno. Toda boa história queima suas pontes para trás.',
      },
      {
        title: '3. A Construção da Necessidade Dramática do Personagem',
        paragraphs: [
          'Para Field, uma trama é tão forte quanto a clareza da "necessidade dramática" do seu protagonista. O que ele deseja acima de tudo? O que acontecerá se ele falhar?',
          'Personagens passivos que apenas sofrem ações externas sem tomar iniciativas destroem a energia do roteiro. O protagonista deve ser o motor ativo que move os conflitos.',
        ],
        keyTakeaway: 'Personagem é ação. As escolhas difíceis sob pressão revelam quem o personagem é de verdade, não suas palavras bonitas.',
      },
    ],
    practicalExercise: {
      title: 'Estruturação da Escaleta em Três Pontos',
      instructions:
        'Para a ideia do seu curta-metragem no CINELAB, defina em três frases concisas: (1) O Incidente Incitante que perturba a vida do personagem, (2) O Ponto de Virada 1 onde ele aceita o desafio sem retorno, e (3) O Clímax onde o conflito central explode.',
    },
  },

  'read-4': {
    id: 'read-4',
    moduleId: 4,
    bookTitle: 'A Preparação do Ator',
    originalTitle: 'An Actor Prepares',
    author: 'Constantin Stanislavski',
    year: '1936',
    suggestedChapter: 'Ação Física, Objetivo e Memória Afetiva',
    estimatedMinutes: 45,
    tonyDeLucCommentary:
      'Muitos diretores iniciantes cometem o erro grave de dar comandos de resultado aos atores, como "chore mais" ou "fique com mais raiva". Stanislavski nos ensina que a emoção é consequência da ação física e da verdade interior. Como diretor, seu papel é fornecer ao ator o "se mágico" e circunstâncias dadas precisas para que a verdade brote espontaneamente diante da câmera.',
    sections: [
      {
        title: '1. O "Se Mágico" e as Circunstâncias Dadas',
        paragraphs: [
          'O cerne do Sistema Stanislavski repousa na recusa do artifício e do maneirismo teatral postiço. Em seu lugar, introduz o conceito do "Se Mágico" (Magic If).',
          'O ator não precisa acreditar que é de fato um príncipe dinamarquês ou um assassino; ele precisa se perguntar com rigor absoluto: "Se eu estivesse exatamente nesta situação, com este passado e com esta urgência, o que eu faria?".',
          'As Circunstâncias Dadas compreendem todo o contexto imaginado pelo autor e pelo diretor: a época histórica, o frio na sala, a dívida financeira pendente, a noite mal dormida. Quanto mais ricas as circunstâncias, mais crível e orgânica se torna a atuação.',
        ],
        keyTakeaway: 'O diretor não cobra sentimentos do ator; ele alimenta o ator com circunstâncias físicas e psicológicas tangíveis.',
      },
      {
        title: '2. A Ação Física e o Superobjetivo',
        paragraphs: [
          'Stanislavski demonstra que todo personagem em cada instante de cena está perseguindo um Objetivo claro (uma ação física concreta dirigida ao outro personagem).',
          'O Superobjetivo é a espinha dorsal de toda a trajetória do personagem na obra completa. Cada cena contém pequenos objetivos subordinados que convergem para esse anseio vital.',
          'Se o ator compreende sua ação física concreta (ex: "humilhar o oponente", "suplicar perdão", "descobrir um segredo escondido"), a emoção correspondente surge com naturalidade, sem necessidade de histeria interpretativa.',
        ],
        keyTakeaway: 'Dirija os atores através de verbos ativos e transitivos, nunca por adjetivos qualificativos.',
      },
      {
        title: '3. A Memória Afetiva e a Comunicação Orgânica',
        paragraphs: [
          'A memória afetiva é o reservatório de vivências sensoriais e emocionais do próprio intérprete, resgatadas por associação para alimentar a vibração interna da cena.',
          'Em frente à câmera de cinema, que capta até a dilatação da pupila, qualquer falsidade é imediatamente amplificada na tela grande. O trabalho com o elenco no set exige um ambiente de confiança, respeito e escuta ativa mútua.',
        ],
        keyTakeaway: 'A câmera de cinema é um detector de mentiras. Se o ator não estiver sentindo de verdade, o plano estará morto.',
      },
    ],
    practicalExercise: {
      title: 'Direção por Verbos Ativos',
      instructions:
        'Escreva 3 alternativas de direcionamento para um ator que precisa parecer desconfiado em cena. Substitua a orientação abstrata "Fique mais desconfiado" por 3 verbos ativos e físicos (Ex: "Investigue a hesitação nas palavras dele", "Procure nos olhos dele onde está a mentira").',
    },
  },

  'read-5': {
    id: 'read-5',
    moduleId: 5,
    bookTitle: 'Iluminação no Cinema: A Arte de Pintar com a Luz',
    originalTitle: 'Painting with Light',
    author: 'John Alton',
    year: '1949',
    suggestedChapter: 'O Mistério das Sombras e o Desenho Clássico de Luz',
    estimatedMinutes: 45,
    tonyDeLucCommentary:
      'John Alton foi o pioneiro que tirou a iluminação do conformismo industrial e a transformou em pura poesia dramática nos clássicos do Film Noir. Seu livro é uma bíblia de bom senso prático: luz boa não é a luz mais cara, mas a luz que esconde tanto quanto revela. As sombras criam o mistério e a terceira dimensão nas telas planas do cinema.',
    sections: [
      {
        title: '1. A Luz como Elemento Dramático e Não Mero Suporte Técnico',
        paragraphs: [
          'John Alton inicia sua obra quebrando o paradigma tecnicista dos estúdios: iluminar não é tornar o espaço visível para a película registrar; iluminar é esculpir sentimentos e guiar a atenção da plateia.',
          'Uma cena plenamente iluminada sem sombras é plana, estéril e desinteressante. É a interação entre as zonas de alta luz e os recantos de penumbra que confere volume, profundidade, textura e tensão psicológica à imagem.',
        ],
        keyTakeaway: 'A iluminação cinematográfica é a arte das sombras, e não da luz. É na escuridão calculada que reside a atmosfera do filme.',
      },
      {
        title: '2. A Anatomia do Sistema Clássico de Três Pontos',
        paragraphs: [
          'Alton detalha com maestria as três fontes capitais da cinematografia clássica:',
          '• Luz Principal (Key Light): Define o lado iluminado dominante do sujeito, a direção da luz e a modelagem do rosto (como o triângulo de Rembrandt na bochecha oposta).',
          '• Luz de Preenchimento (Fill Light): Suaviza o contraste das sombras sem criar novas sombras concorrentes, controlando a razão de contraste (Contrast Ratio).',
          '• Luz de Fundo / Contraluz (Backlight ou Kicker): Descola os ombros e a silhueta do personagem do fundo escuro, garantindo tridimensionalidade e separação espacial.',
        ],
        keyTakeaway: 'Mesmo ao subverter a luz acadêmica em projetos modernos de cinema guerrilha, você precisa dominar o equilíbrio das três fontes para tomar decisões conscientes.',
      },
      {
        title: '3. A Temperatura de Cor e a Psicologia das Cores',
        paragraphs: [
          'Alton discute o diálogo entre a qualidade da luz (dura vs suave) e sua coloração cromática. A luz dura projeta sombras nítidas e gráficas, ideal para o conflito, a claustrofobia ou a dureza urbana.',
          'A luz suave, difundida por sedas ou rebatida em paredes foscas, envolve o rosto com transições aveludadas, evocando melancolia, afeto e intimismo.',
        ],
        keyTakeaway: 'A qualidade da fonte (tamanho relativo da fonte luminosa em relação ao sujeito) dita o rigor da textura dramática da cena.',
      },
    ],
    practicalExercise: {
      title: 'Plano de Luz para um Diálogo Intimista',
      instructions:
        'Desenhe ou descreva em palavras o mapa de luz para uma cena noturna de suspense em uma sala: onde posicionar a Key Light, que fonte motivada ela simula (abajur, janela lunar, fresta de porta), e como você usará o contraluz para descolar o ator da parede de fundo.',
    },
  },

  'read-6': {
    id: 'read-6',
    moduleId: 6,
    bookTitle: 'A Audiovisualidade: Som e Imagem no Cinema',
    originalTitle: "L'Audio-Vision : Son et Image au Cinéma",
    author: 'Michel Chion',
    year: '1990',
    suggestedChapter: 'O Áudio-Logo, o Ponto de Escuta e o Efeito Acousmático',
    estimatedMinutes: 45,
    tonyDeLucCommentary:
      'Chion desmantelou para sempre a ilusão de que o cinema é uma arte puramente visual acompanhada por um fundo sonoro. O som transforma retroativamente o que você pensa estar vendo. O espectador comum acredita que a emoção veio do plano do ator, quando muitas vezes foi uma modulação sutil de frequências no foley ou no drone sonoro que gerou o calafrio.',
    sections: [
      {
        title: '1. O Valor Agregado (Added Value)',
        paragraphs: [
          'Michel Chion define o conceito fundamental de Valor Agregado como o enriquecimento expressivo e informativo que o som transmite a uma imagem, fazendo com que o espectador acredite ingenuamente que aquela informação foi percebida puramente através dos olhos.',
          'Um golpe seco de soco em um filme de ação, se assistido no mudo, parece um toque desajeitado entre dublês; quando acompanhado pelo estalo grave e visceral no áudio, a imagem passa a "doer" visualmente.',
        ],
        keyTakeaway: 'O som não ilustra a imagem; ele a fecunda e transforma radicalmente seu significado semântico e emocional.',
      },
      {
        title: '2. O Som Acusmático e o Fora-de-Campo',
        paragraphs: [
          'Chion recupera o termo "acusmático" dos discípulos de Pitágoras para designar o som que ouvimos sem ver sua causa geradora na tela.',
          'O som acusmático é o recurso supremo para expandir o universo ficcional para além das quatro bordas do enquadramento. Passos rangendo no andar de cima, sirenes distantes, um sussurro indistinto nas sombras — tudo isso ativa a imaginação aterrorizada ou curiosa da plateia sem gastar um centavo em cenografia.',
        ],
        keyTakeaway: 'O fora-de-campo sonoro é a maior arma de produção do cinema independente: o mundo além da câmera existe pelo som.',
      },
      {
        title: '3. A Escuta Causal, Semântica e Reduzida',
        paragraphs: [
          'O autor distingue três posturas de escuta fundamentais para o desenhista de som e o diretor:',
          '• Escuta Causal: Busca identificar a fonte física do ruído (de onde vem o som?).',
          '• Escuta Semântica: Decodifica mensagens linguísticas e códigos simbólicos (a fala e os diálogos).',
          '• Escuta Reduzida: Foca nas propriedades físicas do som em si — timbre, textura, pitch, frequência e reverberação — dissociando-o de sua origem figurativa.',
        ],
        keyTakeaway: 'Trate cada som da sua trilha sonora como um instrumento musical de timbres e frequências, não apenas como ruído documental.',
      },
    ],
    practicalExercise: {
      title: 'Projeto de Áudio-Ambiente Acusmático',
      instructions:
        'Crie uma lista de 4 sons puramente acusmáticos (fora de quadro) para uma cena onde um personagem está trancado em um quarto aguardando um resultado médico ou judicial. Explique como cada som aumenta o suspense.',
    },
  },

  'read-7': {
    id: 'read-7',
    moduleId: 7,
    bookTitle: 'Num Piscar de Olhos (In the Blink of an Eye)',
    originalTitle: 'In the Blink of an Eye: A Perspective on Film Editing',
    author: 'Walter Murch',
    year: '1995',
    suggestedChapter: 'A Regra de Seis: Por Que e Onde Cortar?',
    estimatedMinutes: 45,
    tonyDeLucCommentary:
      'Walter Murch é uma lenda viva do cinema mundial, responsável pelo som e montagem de marcos como Apocalypse Now e O Poderoso Chefão. O que torna este livro genial é a sua Regra dos Seis Critérios: quando você precisa cortar, a continuidade de movimento ou de espaço é o critério menos importante! A emoção do corte é quem manda soberanamente.',
    sections: [
      {
        title: '1. A Regra dos Seis Critérios para o Corte Ideal',
        paragraphs: [
          'Walter Murch estabelece uma hierarquia de prioridades revolucionária para orientar cada decisão do montador na ilha de edição:',
          '1. Emoção (51% de importância): O corte preserva e potencializa a verdade do sentimento da cena?',
          '2. História (23%): O corte empurra a trama para a frente?',
          '3. Ritmo (10%): O corte cai no compasso certo da respiração e pulso da cena?',
          '4. Rastreamento do Olhar / Eye-trace (7%): O olhar do espectador encontra o centro de interesse no próximo plano sem confusão visual involuntária?',
          '5. Plano Bidimensional / Eixo de 180° (5%): As convenções da gramática de tela são respeitadas?',
          '6. Espaço Físico Tridimensional (4%): A continuidade rigorosa da posição dos corpos é mantida?',
        ],
        keyTakeaway: 'Se você conseguir salvar a emoção, o espectador jamais notará uma pequena falha de continuidade física de um copo ou cigarro na mão do ator.',
      },
      {
        title: '2. A Teoria da Piscada Humana',
        paragraphs: [
          'Murch postula uma analogia biológica profunda: o corte cinematográfico é o correspondente artificial da piscada humana (o piscar de olhos).',
          'Nós não piscamos apenas para umedecer a córnea; piscamos quando encerramos um pensamento ou assimilamos uma ideia nova. Atores extraordinários costumam piscar exatamente nos momentos de virada de pensamento de seus personagens.',
          'Um montador atento sintoniza a respiração e os cortes na linha de corte natural sugerida pelos olhos do ator em cena.',
        ],
        keyTakeaway: 'Corte no ritmo da respiração humana. O cinema é uma conversa biológica entre o cérebro da tela e o coração da plateia.',
      },
      {
        title: '3. A Montagem como Cirurgia e Escultura',
        paragraphs: [
          'Montar não é juntar o material que sobrou do set; é reescrever o filme pela terceira e definitiva vez (a primeira é o roteiro, a segunda é a rodagem).',
          'Saber cortar exige a coragem de sacrificar cenas lindas e caras que não servem à emoção principal da narrativa.',
        ],
        keyTakeaway: 'Ame seus personagens, mas seja implacável com os planos que arrastam o ritmo do filme.',
      },
    ],
    practicalExercise: {
      title: 'Aplicação da Regra dos Seis',
      instructions:
        'Imagine que em uma cena dramática o ator cometeu um erro de continuidade: bebeu água com a mão direita no plano aberto e no plano fechado o copo está na mão esquerda. No entanto, a tomada fechada tem a atuação mais emocionante da vida dele. O que você faz, baseado em Walter Murch? Justifique.',
    },
  },

  'read-8': {
    id: 'read-8',
    moduleId: 8,
    bookTitle: 'Produção Executiva para Cinema Independente',
    originalTitle: 'Shoot to Kill: How an Independent Producer Survives',
    author: 'Christine Vachon',
    year: '1998',
    suggestedChapter: 'Como Realizar um Filme sem Perder a Alma nem a Casa',
    estimatedMinutes: 45,
    tonyDeLucCommentary:
      'Christine Vachon é o ícone absoluto do cinema independente mundial (produziu Todd Haynes, Boys Don\'t Cry e tantos outros marcos). Ela destrói as ilusões ingênuas: um produtor executivo talentoso não é um mero burocrata de planilhas, mas o primeiro defensor do olhar autoral do diretor contra os perigos práticos e financeiros.',
    sections: [
      {
        title: '1. A Anatomia do Orçamento de Produção',
        paragraphs: [
          'Christine Vachon ensina a desmistificar a planilha orçamentária: o orçamento é a tradução numérica da visão estética do diretor.',
          'Ela divide o planejamento orçamentário nas contas essenciais: Acima da Linha (direção, roteiro, atores principais), Abaixo da Linha (equipe técnica, equipamentos, locações, maquinária, alimentação, pós-produção) e a imprescindível Reserva de Contingência (10% a 15% para imprevistos).',
        ],
        keyTakeaway: 'Se você não planejar a contingência na pré-produção, o primeiro dia de chuva ou quebra de câmera encerra sua carreira.',
      },
      {
        title: '2. Ordem do Dia e Gestão de Conflitos no Set',
        paragraphs: [
          'A Ordem do Dia (Call Sheet) é a lei suprema do set de filmagem. Ela organiza horários precisos de chamada do elenco para maquiagem, café da manhã, primeiro plano no motor e previsão de wrap.',
          'Vachon enfatiza que a alimentação digna e o respeito aos descansos sindicais e humanos da equipe são o maior diferencial entre um set produtivo e uma revolta generalizada no meio da floresta.',
        ],
        keyTakeaway: 'Uma equipe alimentada e segura dá o sangue pela visão do diretor; uma equipe desrespeitada sabota o filme em silêncio.',
      },
      {
        title: '3. A Proteção Jurídica e Liberação de Direitos',
        paragraphs: [
          'Nenhum festival internacional ou distribuidora comercial comprará seu curta se a pasta jurídica estiver irregular. É obrigatório ter assinaturas de: Autorização de Uso de Imagem e Voz de todos os atores e figurantes, Cessão de Direitos de Roteiro e Trilha Musical 100% licenciada.',
        ],
        keyTakeaway: 'O cinema é arte, mas sem contratos e direitos liberados ele se torna um crime autoral não exibível.',
      },
    ],
    practicalExercise: {
      title: 'Estruturação de Plano de Contingência',
      instructions:
        'Liste 3 imprevistos graves comuns em sets de curtas-metragens independentes (ex: ator adoece, locação cancela 12h antes, bateria de áudio acaba) e defina qual a resposta preventiva do produtor executivo para cada um.',
    },
  },

  'read-9': {
    id: 'read-9',
    moduleId: 9,
    bookTitle: 'A Circulação do Curta-Metragem Brasileiro e Internacional',
    originalTitle: 'Circulação, Editais e Festivais de Cinema',
    author: 'Pesquisadores do Audiovisual Brasileiro',
    year: '2023',
    suggestedChapter: 'Estratégia de Inscrições, FilmFreeway e Janelas Digitais',
    estimatedMinutes: 45,
    tonyDeLucCommentary:
      'Terminar o curta é apenas 50% da jornada. Os outros 50% residem na estratégia de circulação. Mandar seu filme para 100 festivais aleatórios sem estudar as linhas curatoriais é jogar dinheiro no lixo. É preciso definir uma rota: estreia mundial com status de Première, janela de festivais qualificatórios e só então a liberação para o público na internet.',
    sections: [
      {
        title: '1. A Pirâmide de Festivais e o Estatuto da Première',
        paragraphs: [
          'O circuito mundial de festivais opera sob uma rigorosa política de Première. Os grandes festivais (Cannes, Berlim, Veneza, Sundance, Clermont-Ferrand, Gramado, Tiradentes, Rio) exigem na maioria das vezes que o curta seja inédito em âmbito mundial ou nacional.',
          'Se você publicar seu curta livremente no YouTube ou Vimeo antes do circuito de festivais, você imediatamente queima a chance de entrar em quase todos os festivais de ponta.',
        ],
        keyTakeaway: 'Guarde seu link protegido por senha (Vimeo privado) e trace a estratégia de festivais antes de qualquer divulgação aberta.',
      },
      {
        title: '2. Dominando o FilmFreeway e Kit de Imprensa (EPK)',
        paragraphs: [
          'A plataforma FilmFreeway centraliza as inscrições em milhares de mostras do mundo. Um perfil profissional de curta exige:',
          '• Sinopse Curta (logline de 25 palavras) e Sinopse Média.',
          '• Fotos de Divulgação em altíssima resolução (Stills limpos de cena, sem texto nem logomarcas sobrepostas).',
          '• Foto do Diretor e biografia de 1 parágrafo com prêmios e formação.',
          '• Nota de Intenção do Diretor (Director\'s Statement) justificando a urgência política, humana ou estética do filme.',
        ],
        keyTakeaway: 'A Nota de Intenção do Diretor é o que convence o curador em dúvida a defender seu filme na reunião de seleção.',
      },
      {
        title: '3. A Transição para o Mercado e Mostras Digitais',
        paragraphs: [
          'Após o ciclo de 1 a 2 anos nos festivais, o curta deve cumprir seu objetivo maior: ser visto pelo mundo e servir como cartão de visitas para seu primeiro longa-metragem ou série de TV.',
          'A estratégia envolve venda para canais a cabo (Canal Brasil, Curta!, TV Brasil), plataformas de streaming especializadas (MUBI, Spcine Play) e lançamento com estratégia de assessoria de imprensa nas redes.',
        ],
        keyTakeaway: 'O curta-metragem é o passaporte que prova ao mercado que você sabe comandar uma equipe e emocionar um público.',
      },
    ],
    practicalExercise: {
      title: 'Redação da Nota de Intenção do Diretor (Director\'s Statement)',
      instructions:
        'Escreva a Nota de Intenção para o seu curta do CINELAB em 2 parágrafos: (1) Por que você precisa contar essa história específica hoje? (2) Que escolhas formais de câmera e som você fez para transmitir essa verdade?',
    },
  },

  'read-10': {
    id: 'read-10',
    moduleId: 10,
    bookTitle: 'Esculpir o Tempo',
    originalTitle: 'Sculpting in Time',
    author: 'Andrei Tarkovsky',
    year: '1986',
    suggestedChapter: 'A Responsabilidade do Artista e o Cinema como Imagem da Vida',
    estimatedMinutes: 50,
    tonyDeLucCommentary:
      'Andrei Tarkovsky é a nossa bússola moral e filosófica no CINELAB. Para ele, fazer cinema não é uma profissão comercial de entretenimento descartável, mas um ato de fé e de compromisso espiritual com o tempo humano. Concluir este curso com Tarkovsky é lembrar que a técnica precisa sempre servir à dignidade humana e à beleza duradoura.',
    sections: [
      {
        title: '1. O Cinema como Fixação do Fluxo Temporal',
        paragraphs: [
          'Tarkovsky recusa a primazia da montagem eisensteiniana em prol do plano-sequência contemplativo e da textura interna do tempo.',
          'Para o autor, assim como um escultor pega um bloco de mármore e vai retirando tudo o que é supérfluo até sobrar a estátua pura, o cineasta pega um bloco de tempo vivo e descasca tudo o que não pertence à verdade do momento.',
          'O ritmo do cinema não nasce dos cortes acelerados na ilha de edição, mas da densidade de tempo que corre por dentro de cada plano individual.',
        ],
        keyTakeaway: 'Não corte o plano antes que o tempo tenha assentado sua verdade na alma do espectador.',
      },
      {
        title: '2. A Imagem Poética versus o Símbolo Abstrato',
        paragraphs: [
          'Tarkovsky alerta contra o perigo dos símbolos fechados e intelectualóides: "Quando vejo uma árvore no cinema, não quero que ela signifique a Árvore da Vida ou uma metáfora da pátria; quero que ela seja aquela árvore real, com suas folhas úmidas pela chuva e o vento agitando seus galhos".',
          'A verdadeira imagem artística é inesgotável, polifônica e misteriosa como a própria vida.',
        ],
        keyTakeaway: 'Aproxime-se da realidade com humildade sensorial. A verdade da matéria do mundo é mais poética do que qualquer conceito intelectual.',
      },
      {
        title: '3. A Responsabilidade Moral do Cineasta',
        paragraphs: [
          'No capítulo final, Tarkovsky escreve uma carta apaixonada às futuras gerações de realizadores.',
          'Fazer um filme é um privilégio imenso que acarreta uma responsabilidade ética sagrada: não degradar o espírito do público com vulgaridade cínica ou oportunismo passageiro.',
          'O cinema deve elevar a sensibilidade humana, consolar os aflitos perante a finitude e despertar a compaixão entre as almas.',
        ],
        keyTakeaway: 'Seja fiel à sua voz interior. O mundo não precisa de mais um filme imitador; o mundo precisa do seu olhar único sobre a existência.',
      },
    ],
    practicalExercise: {
      title: 'Manifesto do Realizador: O Seu Compromisso com o Cinema',
      instructions:
        'Como exercício de graduação do curso CINELAB, escreva em uma folha seu manifesto cinematográfico pessoal: Que tipo de cinema você se recusa a fazer? Que verdades humanas você se compromete a defender nas suas futuras obras?',
    },
  },
};
