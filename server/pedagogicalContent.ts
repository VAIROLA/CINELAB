import {
  CourseModule,
  VideoLesson,
  Apostila,
  BonusApostila,
  ModuleActivity,
  ModuleEvaluation,
  ModuleFilm,
  ModuleReading,
} from '../src/types/index.js';

// 1. OS 10 MÓDULOS PRINCIPAIS DO CINELAB (Calibrados pedagogicamente para 3 meses / 90 dias)
export const pedagogicalModules: CourseModule[] = [
  {
    id: 1,
    number: 1,
    title: 'Introdução ao Cinema e à Linguagem Audiovisual',
    subtitle: 'A gramática visual, escalas de plano, enquadramentos e as etapas de produção',
    summary:
      'O que é cinema e audiovisual. Relação dialética entre imagem e som. Planos, escalas e enquadramentos. Os profissionais do cinema, pré-produção, produção, pós-produção e a primazia do som.',
    order: 1,
    durationWeeks: 1,
    durationDays: 7,
    durationLabel: '1 semana (7 dias)',
    evalLeadDays: 2,
  },
  {
    id: 2,
    number: 2,
    title: 'História do Cinema',
    subtitle: 'Evolução tecnológica, estética e narrativa da sétima arte e o cinema brasileiro',
    summary:
      'A trajetória histórica do cinema mundial e brasileiro: do cinema silencioso às vanguardas europeias, cinema clássico, movimentos modernos e contemporâneos.',
    order: 2,
    durationWeeks: 1,
    durationDays: 8,
    durationLabel: '8 dias',
    evalLeadDays: 2,
  },
  {
    id: 3,
    number: 3,
    title: 'Roteiro e Criação de Personagens',
    subtitle: 'Da centelha à cena filmável: estrutura dramática, conflito e padrão Master Scenes',
    summary:
      'Ideia, storyline, logline, sinopse, argumento/tratamento, escaleta, decupagem e storyboard. Construção de personagens, objetivo, obstáculo, conflito, transformação, diálogos e subtexto. Liberação dos Bônus 01 e 02.',
    order: 3,
    durationWeeks: 1.5,
    durationDays: 10,
    durationLabel: '10 dias',
    evalLeadDays: 3,
  },
  {
    id: 4,
    number: 4,
    title: 'Direção e Direção de Atores',
    subtitle: 'A visão do diretor, mise-en-scène, condução do elenco e ética do set',
    summary:
      'O papel central da direção, direção de cena e direção de atores. Intenção, ação, subtexto, ensaios, tomadas, continuidade e decupagem técnica. Condução ética e segura do set cinematográfico.',
    order: 4,
    durationWeeks: 1.3,
    durationDays: 9,
    durationLabel: '9 dias',
    evalLeadDays: 2,
  },
  {
    id: 5,
    number: 5,
    title: 'Fotografia, Câmera e Iluminação',
    subtitle: 'Composição visual, desenho com sombras, temperatura de cor e operação de câmera',
    summary:
      'Planos gerais a closes, regra dos terços, linhas-guia, profundidade e espaço negativo. As 4 qualidades de luz: frontal, lateral, contraluz e luz de janela. Foco, exposição, lentes e uso do celular com rigor estético.',
    order: 5,
    durationWeeks: 1.5,
    durationDays: 10,
    durationLabel: '10 dias',
    evalLeadDays: 3,
  },
  {
    id: 6,
    number: 6,
    title: 'Som e Trilha Sonora',
    subtitle: 'A dimensão acústica: diálogo, ambiência, efeitos sonoros e captação direta',
    summary:
      'Diálogo inteligível, ambiência, ruídos de sala (room tone), foley, trilha sonora e o poder do silêncio. Tipos de microfone, técnicas de captação no set e aspectos legais de direitos autorais de áudio.',
    order: 6,
    durationWeeks: 1,
    durationDays: 8,
    durationLabel: '8 dias',
    evalLeadDays: 2,
  },
  {
    id: 7,
    number: 7,
    title: 'Montagem e Pós-Produção',
    subtitle: 'A reescritura do filme: ritmo, continuidades, cortes expressivos e finalização',
    summary:
      'Montagem como escrita e sintaxe. Organização de mídia, backup, decupagem de ilha, ritmo e continuidades. Corte na ação, corte de reação, corte de detalhe, B-roll, cor primária e exportação.',
    order: 7,
    durationWeeks: 1.5,
    durationDays: 10,
    durationLabel: '10 dias',
    evalLeadDays: 3,
  },
  {
    id: 8,
    number: 8,
    title: 'Produção Executiva e Planejamento',
    subtitle: 'Viabilidade, orçamentação ética, ordem do dia e liderança de equipe',
    summary:
      'Fluxo completo: pré, produção e pós. Formação de equipe, locações, equipamentos, autorizações de imagem e locação. Cronograma, planilha orçamentária, ordem do dia e planos de contingência (Plano B).',
    order: 8,
    durationWeeks: 1.3,
    durationDays: 9,
    durationLabel: '9 dias',
    evalLeadDays: 2,
  },
  {
    id: 9,
    number: 9,
    title: 'Distribuição, Festivais e Mercado Audiovisual',
    subtitle: 'Estratégias de lançamento, press-kit profissional e circuito de festivais',
    summary:
      'Definição de público e janelas de exibição. Festivais, mostras, cineclubes e streaming. Materiais de lançamento: logline, sinopse, cartaz, trailer, release e inscrições internacionais.',
    order: 9,
    durationWeeks: 1.3,
    durationDays: 9,
    durationLabel: '9 dias',
    evalLeadDays: 2,
  },
  {
    id: 10,
    number: 10,
    title: 'Projeto Final: Realização de Curta-Metragem & Mostra Independente',
    subtitle:
      'Concepção, rodagem, montagem e exibição da sua obra autoral de 1 a 5 minutos',
    summary:
      'Módulo integrador e prático. Realização e finalização do curta-metragem autoral e estudo analítico de obras consagradas do cinema independente brasileiro como referência estética e de produção. Entrega de roteiro, plano de filmagem, ficha técnica, arquivo final e conclusão da formação.',
    order: 10,
    durationWeeks: 1.5,
    durationDays: 10,
    durationLabel: '10 dias',
    evalLeadDays: 3,
  },
];

// 2. VÍDEOS DO PROFESSOR (Tony de Luc)
export const pedagogicalVideos: VideoLesson[] = [
  {
    id: 'vid-1',
    moduleId: 1,
    title: 'VÍDEO DO MÓDULO 01 – A Linguagem Audiovisual e o Olhar do Cineasta',
    description:
      'Apresentação oficial da Formação CINELAB por Tony de Luc. O que distingue o audiovisual das demais artes, a unidade fundamental do plano e como ler a Apostila 01.',
    durationMinutes: 42,
    videoUrl: 'https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ',
    thumbnailUrl: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=1200&q=80',
    professorName: 'Professor Tony de Luc',
    professorRole: 'Diretor Acadêmico & Cineasta',
    professorNotes:
      'Bem-vindo ao CINELAB! Lembre-se: o cinema não é sobre equipamentos caros, mas sobre a precisão do seu olhar e a verdade humana que você coloca em cada quadro.',
  },
  {
    id: 'vid-2',
    moduleId: 2,
    title: 'VÍDEO DO MÓDULO 02 – As Raízes do Cinema e a Dissecação Fílmica em 6 Camadas',
    description:
      'Tony de Luc percorre os marcos da história cinematográfica e demonstra na prática como analisar uma obra através das seis camadas essenciais.',
    durationMinutes: 48,
    videoUrl: 'https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ',
    thumbnailUrl: 'https://images.unsplash.com/photo-1478720568477-152d9b164e26?auto=format&fit=crop&w=1200&q=80',
    professorName: 'Professor Tony de Luc',
    professorRole: 'Diretor Acadêmico & Cineasta',
    professorNotes:
      'Ao assistir ao Encouraçado Potemkin nesta etapa, desligue o olhar de espectador passivo e ative o olhar analítico de cirurgião da imagem.',
  },
  {
    id: 'vid-3',
    moduleId: 3,
    title: 'VÍDEO DO MÓDULO 03 – O Coração do Roteiro: Conflito, Subtexto e Personagem',
    description:
      'Como transformar uma ideia em uma cena cinematográfica potente. O uso do subtexto, o formato Master Scenes e a apresentação dos Bônus 01 e 02.',
    durationMinutes: 55,
    videoUrl: 'https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ',
    thumbnailUrl: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=1200&q=80',
    professorName: 'Professor Tony de Luc',
    professorRole: 'Diretor Acadêmico & Cineasta',
    professorNotes:
      'Liberamos nesta etapa dois tesouros para consulta vitalícia: o Glossário Completo de Planos e o Glossário Completo de Roteiro. Utilize-os sempre!',
  },
  {
    id: 'vid-4',
    moduleId: 4,
    title: 'VÍDEO DO MÓDULO 04 – A Liderança do Diretor e a Condução Sensível de Atores',
    description:
      'O trabalho do diretor no ensaio e no set. Como se comunicar com o ator sem impor resultados, decupagem com intenção e respeito à equipe.',
    durationMinutes: 46,
    videoUrl: 'https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ',
    thumbnailUrl: 'https://images.unsplash.com/photo-1518133910546-b6c2fb7d79e3?auto=format&fit=crop&w=1200&q=80',
    professorName: 'Professor Tony de Luc',
    professorRole: 'Diretor Acadêmico & Cineasta',
    professorNotes:
      'Dirigir ator não é pedir para ele chorar ou rir; é dar a ele uma ação física e um objetivo interno inegociável.',
  },
  {
    id: 'vid-5',
    moduleId: 5,
    title: 'VÍDEO DO MÓDULO 05 – Pintar com a Luz: Óptica, Contraste e Composição',
    description:
      'Tony de Luc demonstra os esquemas fundamentais de iluminação: luz frontal, lateral, contraluz e a luz poética de janela.',
    durationMinutes: 52,
    videoUrl: 'https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ',
    thumbnailUrl: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=1200&q=80',
    professorName: 'Professor Tony de Luc',
    professorRole: 'Diretor Acadêmico & Cineasta',
    professorNotes:
      'A fotografia cinematográfica nasce da sombra. Quem ilumina tudo não cria profundidade; quem escolhe onde colocar a sombra cria mistério e volume.',
  },
  {
    id: 'vid-6',
    moduleId: 6,
    title: 'VÍDEO DO MÓDULO 06 – A Metade Invisível do Filme: Paisagem Sonora e Captação',
    description:
      'A importância capital do som no cinema. Como gravar diálogo limpo com microfone direcional ou lapela, room tone e a dramaturgia do silêncio.',
    durationMinutes: 44,
    videoUrl: 'https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ',
    thumbnailUrl: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=1200&q=80',
    professorName: 'Professor Tony de Luc',
    professorRole: 'Diretor Acadêmico & Cineasta',
    professorNotes:
      'Um espectador tolera uma imagem granulada ou com pouca luz se o som for cristalino. Mas se o som for ruim e o diálogo ininteligível, ele abandona o filme em 30 segundos.',
  },
  {
    id: 'vid-7',
    moduleId: 7,
    title: 'VÍDEO DO MÓDULO 07 – A Arte da Montagem: Ritmo, Elipse e o Corte Invisível',
    description:
      'A reescritura do filme na ilha de edição. Montagem métrica, rítmica e de conteúdo. O uso de cortes na ação e a transição emocional entre planos.',
    durationMinutes: 50,
    videoUrl: 'https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ',
    thumbnailUrl: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=1200&q=80',
    professorName: 'Professor Tony de Luc',
    professorRole: 'Diretor Acadêmico & Cineasta',
    professorNotes:
      'Cortar é escolher o que o espectador não precisa ver para que a imaginação dele complete a história.',
  },
  {
    id: 'vid-8',
    moduleId: 8,
    title: 'VÍDEO DO MÓDULO 08 – Produção Executiva na Prática: Ordem do Dia e Set Seguro',
    description:
      'Como planejar uma diária de filmagem sem estresse. Elaboração de ordem do dia profissional, plano de contingência e orçamento equilibrado.',
    durationMinutes: 47,
    videoUrl: 'https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ',
    thumbnailUrl: 'https://images.unsplash.com/photo-1535016120720-40c646be5580?auto=format&fit=crop&w=1200&q=80',
    professorName: 'Professor Tony de Luc',
    professorRole: 'Diretor Acadêmico & Cineasta',
    professorNotes:
      'O cinema independente triunfa no planejamento. Um roteiro adaptado à sua realidade de produção vale mais do que mil ideias inexequíveis.',
  },
  {
    id: 'vid-9',
    moduleId: 9,
    title: 'VÍDEO DO MÓDULO 09 – Fazendo seu Filme Circular: Festivais, Mostras e Press-Kit',
    description:
      'A trajetória do curta após a finalização. Como preparar o kit de divulgação, escrever a sinopse vendedora e traçar a rota de festivais no FilmFreeway.',
    durationMinutes: 45,
    videoUrl: 'https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ',
    thumbnailUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
    professorName: 'Professor Tony de Luc',
    professorRole: 'Diretor Acadêmico & Cineasta',
    professorNotes:
      'O filme não termina na exportação. Um curta existe para encontrar seu público, circular em festivais e abrir portas para sua carreira.',
  },
  {
    id: 'vid-10',
    moduleId: 10,
    title: 'VÍDEO DO MÓDULO 10 – O Projeto Final: Da Ideia à Tela e a Jornada do Cineasta',
    description:
      'Orientações finais de Tony de Luc para a entrega do Curta-Metragem de 1 a 5 minutos, celebração da conclusão e diretrizes para o acesso vitalício.',
    durationMinutes: 40,
    videoUrl: 'https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ',
    thumbnailUrl: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=1200&q=80',
    professorName: 'Professor Tony de Luc',
    professorRole: 'Diretor Acadêmico & Cineasta',
    professorNotes:
      'Chegamos ao ápice! Confie no seu instinto, respeite tudo que aprendeu nas 10 etapas e coloque sua alma neste curta. O cinema agora pertence a você.',
  },
];

// 3. AS 10 APOSTILAS (Com Leitor Protegido e Quiz de Fixação Integrado)
export const pedagogicalApostilas: Apostila[] = [
  {
    id: 'apostila-1',
    moduleId: 1,
    number: 1,
    title: 'Apostila 01: Introdução ao Cinema e à Linguagem Audiovisual',
    description:
      'Conceitos fundamentais da linguagem cinematográfica, a gramática dos enquadramentos, as fases da produção audiovisual e a interdependência entre som e imagem.',
    pagesCount: 8,
    pdfUrl: '/materiais/cinelab-apostila-01.pdf',
    coverUrl: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=600&q=80',
    fileSizeMb: 18.5,
    extraVideos: [
      {
            "id": "ev-apostila-1-1",
            "slot": 1,
            "title": "Vídeo Extra 01: Introdução ao Cinema e à Linguagem Audiovisual - O GAROTO - M- 1.1",
            "videoUrl": "https://www.youtube.com/watch?v=q1U0eKOOwsQ",
            "thumbnailUrl": "https://img.youtube.com/vi/q1U0eKOOwsQ/hqdefault.jpg",
            "durationHours": 0,
            "durationMinutes": 52,
            "durationSeconds": 48,
            "totalDurationSeconds": 3168,
            "durationLabel": "00h 52m 48s",
            "description": "Observe principalmente:\nexpressão • gestos • atuação • enquadramento • montagem • ritmo • emoção • narrativa visual.",
            "professorNotes": "“Ao assistir a este filme, tente compreender a história antes mesmo de pensar nas palavras. Observe o rosto, o corpo e os gestos dos personagens. Perceba como Chaplin utiliza enquadramentos, montagem, ritmo e atuação para fazer você rir, se emocionar e compreender o que está acontecendo. Preste atenção também à relação entre os personagens e à maneira como cada imagem ajuda a contar a história. Pergunte a si mesmo: eu conseguiria entender essa cena apenas olhando para as imagens?”",
            "uploadedAt": "2026-10-05T14:47:08.227Z"
      },
      {
            "id": "ev-apostila-1-2",
            "slot": 2,
            "title": "Vídeo Extra 02: Introdução ao Cinema e à Linguagem Audiovisual - TEMPOS MODERNOS - M- 1.2",
            "videoUrl": "https://www.youtube.com/watch?v=i15UCTIdfwI",
            "thumbnailUrl": "https://img.youtube.com/vi/i15UCTIdfwI/hqdefault.jpg",
            "durationHours": 1,
            "durationMinutes": 26,
            "durationSeconds": 52,
            "totalDurationSeconds": 5212,
            "durationLabel": "01h 26m 52s",
            "description": "observe:\nmovimento • montagem • ritmo • som • máquinas • enquadramento • atuação • significado.\n\n“Durante esta atividade, você não deve assistir aos filmes apenas como espectador. Assista como um futuro cineasta. Observe onde a câmera está, o que aparece dentro do quadro, como os personagens se movimentam, como as imagens são organizadas e como cada escolha interfere naquilo que você sente e compreende. Não existe apenas uma maneira de assistir a um filme. Existe a maneira de quem assiste e existe a maneira de quem aprende a fazer cinema.”",
            "professorNotes": "“Neste filme, observe como o cinema utiliza imagens, movimentos, montagem e sons para transmitir ideias. Preste atenção às máquinas, aos trabalhadores, aos movimentos repetitivos e ao ritmo da fábrica. Observe como Chaplin coloca o personagem dentro desse ambiente e como a montagem cria relações entre pessoas e máquinas. Perceba também quando o som aparece e qual função ele exerce. Pergunte a si mesmo: como uma imagem pode transmitir uma ideia sem precisar explicá-la através de palavras?”",
            "uploadedAt": "2026-10-05T14:47:08.229Z"
      }
],
    sections: [
      {
        id: 'sec-1-1',
        title: '1. O que é Cinema e o que é Audiovisual?',
        subtitle: 'A natureza espaço-temporal da imagem em movimento',
        contentMarkdown: `O cinema não é mera reprodução da realidade; é uma **construção deliberada de sentido no tempo e no espaço**. Enquanto o teatro se ancora na presença física do ator em um palco contínuo onde o espectador escolhe para onde olhar, o cinema opera através da **seleção óptica do diretor**: o enquadramento determina o que existe e o que é excluído da experiência visual.

Audiovisual é o amálgama indissociável entre luz projetada e ondas sonoras. A imagem atrai a razão e a atenção focal; o som atua diretamente no sistema límbico, gerando sensação de espaço, tensão e verossimilhança sem que o espectador perceba o artifício.`,
        tonyNotes:
          'Em cinema, cada milímetro do enquadramento é uma escolha moral e estética. Nunca posicione a câmera ao acaso.',
      },
      {
        id: 'sec-1-2',
        title: '2. Escalas de Planos e a Gramática dos Enquadramentos',
        subtitle: 'A relação de proximidade entre a câmera e o sujeito dramático',
        contentMarkdown: `A escala de planos estabelece a distância psicológica entre a plateia e o personagem:
* **Grande Plano Geral (GPG)**: O ambiente domina completamente a figura humana. Comunica solidão, vastidão ou opressão do cenário.
* **Plano Geral (PG)**: O sujeito aparece de corpo inteiro integrado ao ambiente. Situa espacialmente a ação.
* **Plano Americano (PA)**: Enquadra da altura do joelho até a cabeça (nascido nos westerns para exibir o coldre dos revólveres). Equilíbrio entre ação física e diálogo.
* **Plano Médio (PM)**: Da cintura para cima. O plano do diálogo clássico e da interação social.
* **Primeiro Plano (PP / Close-Up)**: Do peito ou ombros para cima. Foco nas expressões faciais, emoções íntimas e reação imediata.
* **Plano Detalhe (PD)**: Isola um objeto ou elemento específico (um bilhete, um olho, um gatilho). Revela pistas cruciais para a narrativa.`,
        tonyNotes:
          'O close-up é a maior arma do cinema. Se você usa close-up o tempo todo, ele perde o poder de impacto.',
      },
      {
        id: 'sec-1-3',
        title: '3. A Cadeia de Produção Cinematográfica',
        subtitle: 'Da pré-produção à finalização',
        contentMarkdown: `Todo projeto audiovisual atravessa três etapas fundamentais:
1. **Pré-Produção**: Roteiro definitivo, decupagem técnica, seleção de elenco (casting), reconhecimento de locações, ordem de filmagem e orçamento.
2. **Produção (Filmagem)**: A execução no set, registro de imagem e áudio direto, respeito aos horários e condução artística.
3. **Pós-Produção**: Montagem, desenho de som, mixagem, tratamento de cor (grading) e masterização.`,
        tonyNotes:
          'Uma hora gasta na pré-produção economiza três horas de atraso no set de filmagem.',
      },
    ],
    quizQuestions: [
      {
        id: 'quiz-1-1',
        questionNumber: 1,
        prompt: 'Qual é a principal diferença de percepção entre o espectador de teatro e o espectador de cinema?',
        options: [
          'No teatro o espectador não ouve o ator, enquanto no cinema o som é amplificado.',
          'No teatro o espectador escolhe livremente para onde olhar no palco; no cinema, o diretor seleciona rigidamente o enquadramento.',
          'No cinema os atores não precisam de maquiagem nem de figurino.',
          'O cinema não utiliza luz artificial para compor suas cenas.',
        ],
        correctOptionIndex: 1,
        explanation:
          'Correto! No cinema, o enquadramento e a decupagem controlam rigorosamente o ponto de vista e o foco da atenção do espectador.',
      },
      {
        id: 'quiz-1-2',
        questionNumber: 2,
        prompt: 'Qual tamanho de plano foi popularizado nos filmes de faroeste (westerns) para manter visíveis o coldre e a arma do pistoleiro?',
        options: [
          'Plano Detalhe',
          'Grande Plano Geral',
          'Plano Americano (do joelho para cima)',
          'Primeiro Plano (Close-up)',
        ],
        correctOptionIndex: 2,
        explanation:
          'Exato! O Plano Americano enquadra os personagens dos joelhos para cima, permitindo filmar os duelos mantendo as mãos nas armas.',
      },
      {
        id: 'quiz-1-3',
        questionNumber: 3,
        prompt: 'Por que a captação de som é considerada tão vital quanto a imagem na produção audiovisual?',
        options: [
          'Porque a imagem atrai o foco consciente, enquanto o som atua diretamente na imersão e na sensação de realidade espacial.',
          'Porque sem som nenhum arquivo de vídeo pode ser exportado no computador.',
          'Porque os festivais de cinema recusam filmes com qualquer tipo de silêncio.',
          'Porque as câmeras digitais não conseguem gravar imagens se não houver um microfone acoplado.',
        ],
        correctOptionIndex: 0,
        explanation:
          'Perfeito! O som ancora a verossimilhança espacial e a carga emocional, sendo tolerado com muito menos falhas pelo público que a própria imagem.',
      },
      {
        id: 'quiz-1-4',
        questionNumber: 4,
        prompt: 'Qual é o princípio fundamental da "Regra dos 180 Graus" (Eixo de Ação) no cinema?',
        options: [
          'A câmera deve cruzar a linha imaginária entre os atores a cada 10 segundos para dar dinamismo.',
          'A câmera deve permanecer sempre de um mesmo lado da linha imaginária que une dois sujeitos para preservar a orientação espacial e a direção dos olhares.',
          'A lente deve ser girada em 180 graus entre tomadas consecutivas.',
          'O set de filmagem precisa ter exatamente 180 graus de temperatura térmica.',
        ],
        correctOptionIndex: 1,
        explanation:
          'Correto! A regra dos 180 graus assegura que, na montagem, os olhares dos personagens se cruzem harmoniosamente sem desorientar o espectador.',
      },
      {
        id: 'quiz-1-5',
        questionNumber: 5,
        prompt: 'Em uma decupagem técnica, qual é a principal diferença em relação ao roteiro literário?',
        options: [
          'O roteiro literário narra a dramaturgia e falas, enquanto a decupagem decompõe a cena em planos específicos com lente, enquadramento e movimento de câmera.',
          'A decupagem só pode ser lida pelos investidores financeiros.',
          'O roteiro literário deve ser jogado fora assim que a filmagem começa.',
          'A decupagem é feita apenas no computador durante a fase de montagem.',
        ],
        correctOptionIndex: 0,
        explanation:
          'Exato! A decupagem é o desenho cirúrgico de execução visual onde o diretor traduz a prosa do roteiro na linguagem concreta das lentes e enquadramentos.',
      },
    ],
  },
  {
    id: 'apostila-2',
    moduleId: 2,
    number: 2,
    title: 'História do Cinema',
    description:
      'A trajetória histórica do cinema mundial e brasileiro: do cinema silencioso às vanguardas europeias, cinema clássico e contemporâneo.',
    pagesCount: 52,
    pdfUrl: '/uploads/apostilas/apostila-modulo-02-2-APOSTILA_HISTORIA_DO_CINEMA_-_COM-1790652429759.pdf',
    coverUrl: 'https://images.unsplash.com/photo-1478720568477-152d9b164e26?auto=format&fit=crop&w=600&q=80',
    fileSizeMb: 2.17,
    extraVideos: [
      {
            "id": "ev-apostila-2-1",
            "slot": 1,
            "title": "Vídeo Extra 01: História do Cinema - CHEGADA DO TREM - M- 2.1",
            "videoUrl": "https://www.youtube.com/watch?v=qawVtd32DOQ",
            "thumbnailUrl": "https://img.youtube.com/vi/qawVtd32DOQ/hqdefault.jpg",
            "durationHours": 0,
            "durationMinutes": 0,
            "durationSeconds": 49,
            "totalDurationSeconds": 49,
            "durationLabel": "00h 00m 49s",
            "description": "Observe principalmente:\ncâmera • espaço • profundidade • movimento • realidade • enquadramento • pessoas • acontecimento.",
            "professorNotes": "“Ao assistir a este filme, não procure uma história complexa. Observe o acontecimento. Perceba como a câmera registra um momento real, como as pessoas entram e saem do enquadramento e como o movimento da locomotiva cria uma sensação de profundidade e dinamismo. Lembre-se de que, para os primeiros espectadores, aquilo não era apenas uma imagem: era a própria ilusão da vida em movimento projetada em uma tela.”",
            "uploadedAt": "2026-10-05T14:47:08.244Z"
      },
      {
            "id": "ev-apostila-2-2",
            "slot": 2,
            "title": "Vídeo Extra 02: História do Cinema - LE VOYAGE DANS LA LUNE - M- 2.2",
            "videoUrl": "https://www.youtube.com/watch?v=UHbpgsD8zCM",
            "thumbnailUrl": "https://img.youtube.com/vi/UHbpgsD8zCM/hqdefault.jpg",
            "durationHours": 0,
            "durationMinutes": 12,
            "durationSeconds": 51,
            "totalDurationSeconds": 771,
            "durationLabel": "00h 12m 51s",
            "description": "Observe:\nA cenografia • atuação • figurino • ilusionismo • efeitos especiais • cortes • fantasia • composição visual.",
            "professorNotes": "“Neste filme, observe como Georges Méliès transforma elementos do teatro, do ilusionismo e da fantasia em linguagem cinematográfica. Preste atenção ao uso dos truques de câmera, como a parada de cena para criar desaparecimentos e transformações. Perceba como cada plano funciona como um pequeno palco onde tudo é desenhado, pintado e coreografado para estimular a imaginação do espectador.”",
            "uploadedAt": "2026-10-05T14:47:08.244Z"
      }
],
    sections: [
      {
        id: 'sec-2-1',
        title: '1. A Evolução da Sétima Arte',
        subtitle: 'Do cinematógrafo dos Irmãos Lumière à revolução sonora',
        contentMarkdown: `O nascimento do cinema (1895) fundou-se na atração documental (Lumière) e na fantasia mágica do ilusionismo (Méliès). O cinema mudo desenvolveu uma sofisticação visual inigualável, onde a pantomima dos atores e os cartazes de texto exigiam composições gráficas de extrema força.

Com a chegada do som sincronizado em 1927 (*The Jazz Singer*), o cinema sofreu uma profunda transformação: as câmeras tornaram-se inicialmente estáticas devido aos pesados blimps antirruído, até que a técnica recuperou a mobilidade nos anos 1930 com os movimentos de grua e travelling.`,
        tonyNotes:
          'Estude o cinema silencioso: nele reside a essência mais pura da composição e da narrativa por imagens.',
      },
      {
        id: 'sec-2-2',
        title: '2. As Seis Camadas de Análise Fílmica CINELAB',
        subtitle: 'O método definitivo para dissecar qualquer obra audiovisual',
        contentMarkdown: `Para analisar um filme com profundidade crítica, desmonte a obra em suas 6 camadas constitutivas:
1. **Camada Narrativa**: O arco dramático, a premissa temática, a estrutura em atos e os pontos de virada.
2. **Camada de Personagem**: Motivação primordial, fraqueza interna, arco de transformação e subtexto das relações.
3. **Camada Espacial**: A cenografia, a escolha das locações, a claustrofobia ou amplitude do mundo físico.
4. **Camada de Imagem (Fotografia)**: A paleta de cores, temperatura da luz, contraste, lentes e profundidade de campo.
5. **Camada de Som**: O desenho de som, diálogos, ruídos diegéticos (internos à história), música extradiegética e silêncio.
6. **Camada de Montagem**: O ritmo dos cortes, duração média dos planos, elipses temporais e justaposição de sentidos.`,
        tonyNotes:
          'Quando você analisa um filme nessas seis camadas, você deixa de ser um mero consumidor e passa a pensar como realizador.',
      },
    ],
    quizQuestions: [
      {
        id: 'quiz-2-1',
        questionNumber: 1,
        prompt: 'Qual foi o impacto imediato da introdução do som síncrono no final dos anos 1920 sobre a movimentação da câmera no set?',
        options: [
          'A câmera tornou-se imediatamente mais veloz e portátil.',
          'As câmeras precisaram ser isoladas em cabines ou capas pesadas para não vazar ruído no microfone, reduzindo temporariamente a mobilidade.',
          'Os estúdios passaram a filmar exclusivamente com luz natural.',
          'A montagem passou a cortar os planos a cada 1 segundo.',
        ],
        correctOptionIndex: 1,
        explanation:
          'Correto! O barulho dos motores das primeiras câmeras exigiu pesadas caixas de isolamento acústico (blimps), engessando o movimento até a evolução de novos equipamentos.',
      },
      {
        id: 'quiz-2-2',
        questionNumber: 2,
        prompt: 'No método de análise fílmica do CINELAB, qual camada examina a iluminação, paleta de cores e profundidade de campo?',
        options: ['Camada Espacial', 'Camada de Imagem (Fotografia)', 'Camada Sonora', 'Camada Narrativa'],
        correctOptionIndex: 1,
        explanation:
          'Exato! A Camada de Imagem investiga todas as escolhas fotográficas, ópticas e lumínicas da obra.',
      },
      {
        id: 'quiz-2-3',
        questionNumber: 3,
        prompt: 'Em que consiste o conceito de som diegético em uma obra audiovisual?',
        options: [
          'É o som que pertence ao universo da história e que os personagens em cena também conseguem ouvir.',
          'É a trilha sonora orquestral que apenas a plateia escuta fora da cena.',
          'É o ruído gerado por falhas no cabo do microfone.',
          'É a voz do narrador que fala diretamente com o público em tom documental.',
        ],
        correctOptionIndex: 0,
        explanation:
          'Perfeito! O som diegético é aquele originado dentro do mundo ficcional do filme (o rádio tocando, a buzina de um carro, a fala de outro personagem).',
      },
      {
        id: 'quiz-2-4',
        questionNumber: 4,
        prompt: 'Qual movimento cinematográfico italiano do pós-guerra notabilizou-se pelo uso de locações reais nas ruas e atores não profissionais?',
        options: [
          'Expressionismo Alemão',
          'Neorrealismo Italiano',
          'Cinema Marginal Brasileiro',
          'Dogma 95 Dinamarquês',
        ],
        correctOptionIndex: 1,
        explanation:
          'Correto! O Neorrealismo Italiano (com obras como "Ladrões de Bicicleta" e "Roma, Cidade Aberta") desceu às ruas para registrar a dura realidade social sem maquiagem de estúdio.',
      },
      {
        id: 'quiz-2-5',
        questionNumber: 5,
        prompt: 'O que caracterizou o movimento da "Nouvelle Vague" francesa e sua Política dos Autores no fim dos anos 1950?',
        options: [
          'A proibição de câmeras portáteis e o retorno ao teatro filmado clássico.',
          'A liberdade de câmera na mão, o corte seco descontínuo (jump cut) e a consagração do diretor como o verdadeiro autor e mente criadora do filme.',
          'A obrigação de usar computadores para renderizar cenários virtuais.',
          'A exigência de que todos os filmes tivessem no mínimo 4 horas de duração.',
        ],
        correctOptionIndex: 1,
        explanation:
          'Exato! Cineastas como Godard e Truffaut romperam com o academicismo usando montagem audaciosa com jump cuts, filmagens nas ruas de Paris e afirmando a autoria artística do realizador.',
      },
    ],
  },
  {
    id: 'apostila-3',
    moduleId: 3,
    number: 3,
    title: 'Apostila 03: Roteiro e Criação de Personagens',
    description:
      'Da ideia embrionária à cena formatada: storyline, logline, sinopse, escaleta, criação de personagens tridimensionais, diálogos e subtexto dramático.',
    pagesCount: 4,
    pdfUrl: '/materiais/cinelab-apostila-03.pdf',
    coverUrl: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=600&q=80',
    fileSizeMb: 21.0,
    extraVideos: [
      {
            "id": "ev-apostila-3-1",
            "slot": 1,
            "title": "Vídeo Extra 01: Roteiro e Criação de Personagens - À PROCURA DA FELICIDADE - M- 3.1",
            "videoUrl": "https://www.youtube.com/watch?v=_-Pzxdhk32k",
            "thumbnailUrl": "https://img.youtube.com/vi/_-Pzxdhk32k/hqdefault.jpg",
            "durationHours": 1,
            "durationMinutes": 57,
            "durationSeconds": 25,
            "totalDurationSeconds": 7045,
            "durationLabel": "01h 57m 25s",
            "description": "Observe:\nProtagonista: quem é Chris e o que sabemos sobre ele?\nObjetivo: o que ele realmente deseja conquistar?\nConflito: quais obstáculos impedem esse objetivo?\nPonto de virada: quais momentos mudam a direção da história?\nSubtexto: o que os personagens sentem ou pensam, mesmo sem falar diretamente?\nMotivação: o que move o protagonista a continuar, mesmo diante das maiores dificuldades?",
            "professorNotes": "“Ao assistir a este filme, não observe apenas o que acontece com o protagonista. Observe por que cada acontecimento acontece e como as escolhas do personagem movem a narrativa. Repare como o roteirista constrói um objetivo claro e urgente, e como os obstáculos se tornam cada vez mais difíceis. O bom roteiro nasce dessa tensão constante entre o desejo do personagem e as dificuldades da realidade.”",
            "uploadedAt": "2026-10-05T14:47:08.261Z"
      },
      {
            "id": "ev-apostila-3-2",
            "slot": 2,
            "title": "Vídeo Extra 02: Roteiro e Criação de Personagens - O AUTO DA COMPADECIDA - M- 3.2",
            "videoUrl": "https://www.youtube.com/watch?v=Cui4izDKfYY",
            "thumbnailUrl": "https://img.youtube.com/vi/Cui4izDKfYY/hqdefault.jpg",
            "durationHours": 1,
            "durationMinutes": 42,
            "durationSeconds": 1,
            "totalDurationSeconds": 6121,
            "durationLabel": "01h 42m 01s",
            "description": "Observe:\nQuem é o protagonista?\nQual é o objetivo de João Grilo?\nO que ele faz para conseguir o que deseja?\nQuais são seus principais obstáculos?\nQual é a motivação de Chicó?\nComo a personalidade de cada personagem é revelada pelos diálogos?\nComo o roteiro utiliza o humor, a esperteza e a cultura regional para construir as situações dramáticas?",
            "professorNotes": "Ao assistir a este filme, observe como os personagens são construídos através de suas dualidades. João Grilo e Chicó possuem personalidades muito diferentes, mas complementares. O aluno deve aprender como caracterizar personagens com vozes próprias, objetivos imediatos e sobrevivência através da inteligência e do diálogo.",
            "uploadedAt": "2026-10-05T14:47:08.261Z"
      }
],
    sections: [
      {
        id: 'sec-3-1',
        title: '1. A Escada da Criação do Roteiro',
        subtitle: 'Da centelha inicial ao roteiro decupado',
        contentMarkdown: `Nenhum roteirista profissional abre o editor de texto e começa a escrever diálogos a esmo. Existe um fluxo canônico de amadurecimento:
1. **Ideia Central**: O que aconteceria se...?
2. **Storyline**: O resumo dramático em até 5 linhas (Quem é o protagonista? Qual o conflito deflagrador? O que está em jogo?).
3. **Logline**: A síntese em 1 a 2 frases com protagonista, catalisador e objetivo com urgência.
4. **Sinopse**: A narrativa do início, meio e fim em 1 ou 2 páginas.
5. **Argumento / Tratamento**: O filme escrito em prosa corrida no presente do indicativo, cena a cena.
6. **Escaleta (Beat Sheet)**: Lista numerada de todas as cenas com cabeçalho de cena e resumo da ação.
7. **Roteiro Literário (Master Scenes)**: O formato com cabeçalho de cena (INT/EXT), rubrica no presente e diálogos formatados.`,
        tonyNotes:
          'A escaleta é o mapa do tesouro. Se a sua escaleta tem problemas estruturais, o roteiro terá furos irreparáveis.',
      },
      {
        id: 'sec-3-2',
        title: '2. Subtexto: O que Não é Dito Vale Mais',
        subtitle: 'A arte do diálogo indireto no cinema moderno',
        contentMarkdown: `No cinema amador, os personagens dizem exatamente o que estão pensando e sentindo ("Estou muito zangado com você!"). No grande cinema, os personagens mentem, disfarçam, atacam pelas beiradas e desviam o assunto.
**Subtexto** é o rio subterrâneo que corre por baixo das palavras pronunciadas. Uma conversa casual sobre a receita de um sanduíche ou o tempo lá fora pode ser, na verdade, um rompimento conjugal doloroso.`,
        tonyNotes:
          'Se uma cena pode ser entendida inteiramente sem áudio apenas pela tensão corporal dos atores, você escreveu um roteiro visual brilhante.',
      },
    ],
    quizQuestions: [
      {
        id: 'quiz-3-1',
        questionNumber: 1,
        prompt: 'Qual é o papel da escaleta (beat sheet) no desenvolvimento de um roteiro cinematográfico?',
        options: [
          'Definir a lista de equipamentos que a câmera vai usar no set.',
          'Mapear a sequência estruturada de cenas e acontecimentos dramáticos antes da redação dos diálogos.',
          'Contratar os atores e assinar os contratos de locação.',
          'Calcular o orçamento final de pós-produção do filme.',
        ],
        correctOptionIndex: 1,
        explanation:
          'Correto! A escaleta organiza a espinha dorsal de cada cena, garantindo o ritmo e a lógica dramática antes dos diálogos.',
      },
      {
        id: 'quiz-3-2',
        questionNumber: 2,
        prompt: 'Em dramaturgia audiovisual, o que define o "subtexto" de uma cena?',
        options: [
          'O tamanho da fonte tipográfica usada na impressão do roteiro.',
          'A legenda em língua estrangeira exibida na parte inferior da tela.',
          'O significado real e oculto por trás do que os personagens dizem ou fazem em cena.',
          'A lista de patrocinadores exibida nos créditos finais.',
        ],
        correctOptionIndex: 2,
        explanation:
          'Exato! Subtexto é o conteúdo emocional não verbalizado diretamente, onde a verdadeira intenção do personagem se manifesta.',
      },
      {
        id: 'quiz-3-3',
        questionNumber: 3,
        prompt: 'Qual a estrutura padrão de um cabeçalho de cena no formato internacional Master Scenes?',
        options: [
          'NOME DO DIRETOR – DATA DE NASCIMENTO – PREÇO DA DIÁRIA',
          'INT. ou EXT. / LOCAÇÃO ESPECÍFICA / DIA ou NOITE',
          'TITULO DO FILME / NÚMERO DE PÁGINAS / COR DO CENÁRIO',
          'CÂMERA 1 / LENTE 50MM / ISO 800',
        ],
        correctOptionIndex: 1,
        explanation:
          'Perfeito! O cabeçalho indica se a cena é interna (INT.) ou externa (EXT.), o local onde ocorre e a condição de luz (DIA/NOITE).',
      },
      {
        id: 'quiz-3-4',
        questionNumber: 4,
        prompt: 'Na estrutura clássica em três atos de Syd Field, o que caracteriza o "Incidente Incitante" (Catalisador)?',
        options: [
          'A lista de agradecimentos nos créditos finais.',
          'O evento disruptivo que quebra o equilíbrio do mundo comum do protagonista e desencadeia a jornada dramática.',
          'O momento em que a equipe encerra a primeira semana de gravação.',
          'A compra de uma nova câmera de cinema.',
        ],
        correctOptionIndex: 1,
        explanation:
          'Correto! O Incidente Incitante quebra a normalidade inicial do protagonista e o coloca em rota de colisão com seu novo objetivo dramático.',
      },
      {
        id: 'quiz-3-5',
        questionNumber: 5,
        prompt: 'Em dramaturgia, qual a importância da "Falha Trágica" (Flaw) para a construção de um protagonista tridimensional?',
        options: [
          'Serve para o roteiro ser recusado pelos produtores.',
          'Cria uma ferida emocional ou crença errônea interna que o personagem precisa confrontar e superar para completar seu arco de transformação.',
          'Obriga o ator a falar sempre sussurrando em cena.',
          'Impede que o filme tenha qualquer tipo de trilha sonora.',
        ],
        correctOptionIndex: 1,
        explanation:
          'Exato! A falha trágica interna humaniza o protagonista, gerando identificação e empatia com a plateia ao longo de seu arco de evolução.',
      },
    ],
  },
  {
    id: 'apostila-4',
    moduleId: 4,
    number: 4,
    title: 'Apostila 04: Direção e Direção de Atores',
    description:
      'O papel de liderança do diretor, decupagem com intenção estética, ensaios práticos, marcação cênica (blocking) e a condução ética e respeitosa do elenco.',
    pagesCount: 4,
    pdfUrl: '/materiais/cinelab-apostila-04.pdf',
    coverUrl: 'https://images.unsplash.com/photo-1518133910546-b6c2fb7d79e3?auto=format&fit=crop&w=600&q=80',
    fileSizeMb: 18.9,
    extraVideos: [
      {
            "id": "ev-apostila-4-1",
            "slot": 1,
            "title": "Vídeo Extra 01: Direção e Direção de Atores - O PAGADOR DE PROMESSAS - M- 4.1",
            "videoUrl": "https://www.youtube.com/watch?v=KfybjIi_J8U",
            "thumbnailUrl": "https://img.youtube.com/vi/KfybjIi_J8U/hqdefault.jpg",
            "durationHours": 1,
            "durationMinutes": 31,
            "durationSeconds": 30,
            "totalDurationSeconds": 5490,
            "durationLabel": "01h 31m 30s",
            "description": "Observe a construção dos personagens e observe como cada personagem apresenta uma personalidade diferente. Como essa personalidade é percebida pelo comportamento do ator?\nVoz e interpretação:\nPreste atenção ao tom de voz, volume, velocidade e pausas. Como essas escolhas modificam o significado das falas?\nExpressão corporal:\nObserve postura, gestos, movimentos e principalmente os momentos em que o personagem permanece parado.\nOlhares e reações:\nNem sempre o personagem precisa falar para participar da cena. Observe as reações dos atores enquanto outros personagens estão falando.\nConflito entre personagens:\nObserve como os atores modificam seu comportamento quando entram em confronto. A energia da interpretação muda?\nIntensidade dramática:\nPerceba como a interpretação vai ganhando intensidade conforme os conflitos aumentam.\nRelação com o espaço:\nObserve como os personagens ocupam o ambiente. Quem se aproxima? Quem se afasta? Quem permanece isolado?\nDireção de atores em grupo:\nPreste atenção às cenas com vários personagens. Observe como cada ator mantém sua própria ação enquanto reage ao que acontece ao redor.",
            "professorNotes": "Ao assistir O Pagador de Promessas, o aluno deve observar como o diretor conduz os atores dentro de uma história marcada por conflito, pressão social e diferentes pontos de vista. A atenção não deve estar apenas no que os personagens dizem, mas principalmente em como eles dizem, reagem, se movimentam e se relacionam uns com os outros.\n\nObserve como cada personagem possui uma personalidade própria e como essa personalidade aparece através da voz, do olhar, dos gestos, da postura corporal e da maneira de ocupar o espaço. Perceba também como o diretor utiliza os atores para aumentar gradualmente a tensão da narrativa.\n\nO objetivo é entender que dirigir atores não significa simplesmente dizer o que eles devem falar ou fazer. O diretor precisa construir uma situação na qual o ator compreenda o objetivo do personagem e consiga expressá-lo de maneira coerente com a cena.",
            "uploadedAt": "2026-10-05T14:47:08.262Z"
      },
      {
            "id": "ev-apostila-4-2",
            "slot": 2,
            "title": "Vídeo Extra 02: Direção e Direção de Atores - CENTRAL DO BRASIL - M- 4.2",
            "videoUrl": "https://www.youtube.com/watch?v=wpYfXBNOPvk",
            "thumbnailUrl": "https://img.youtube.com/vi/wpYfXBNOPvk/hqdefault.jpg",
            "durationHours": 2,
            "durationMinutes": 6,
            "durationSeconds": 5,
            "totalDurationSeconds": 7565,
            "durationLabel": "02h 06m 05s",
            "description": "observe:\nNaturalidade da interpretação:\nObserve como os atores fazem suas falas e movimentos parecerem espontâneos, evitando uma interpretação excessivamente teatral ou forçada.\nConstrução da relação entre personagens:\nPerceba como a proximidade entre os personagens vai se transformando ao longo do filme. Como isso é demonstrado no comportamento físico dos atores?\nOlhares e silêncios:\nObserve momentos em que os personagens não dizem nada, mas o espectador compreende exatamente o que estão sentindo.\nAtores de origens diferentes:\nO filme reúne uma atriz consagrada (Fernanda Montenegro) e um jovem sem experiência anterior no cinema (Vinícius de Oliveira). Observe como a direção harmoniza essas duas presenças em cena.\nReações sutis:\nPreste atenção em pequenos gestos: desviar o olhar, hesitar antes de responder, mudar a postura ou segurar um objeto.\nEvolução emocional:\nObserve a transformação gradual da personagem principal, da frieza inicial até o afeto genuíno.\nDireção em ambientes reais:\nObserve como os atores interagem com locações reais (estações de trem, estradas, feiras populares e pessoas comuns).",
            "professorNotes": "Ao assistir Central do Brasil, observe principalmente a relação construída entre Dora e Josué. O filme é uma excelente oportunidade para perceber como a direção pode utilizar silêncios, olhares, pequenos gestos e reações para desenvolver uma relação entre personagens.\n\nObserve como os atores não precisam explicar tudo o que sentem. Muitas vezes, a hesitação antes de falar, o desvio do olhar ou a maneira de caminhar revelam muito mais do que os diálogos.\n\nO aluno deve perceber que dirigir atores envolve criar cumplicidade, escuta e verdade cênica, permitindo que a emoção surja de maneira orgânica a partir das situações vividas pelos personagens.",
            "uploadedAt": "2026-10-05T14:47:08.262Z"
      }
],
    sections: [
      {
        id: 'sec-4-1',
        title: '1. O Diretor como Maestro do Set',
        subtitle: 'Autoridade afetiva, clareza de visão e comunicação',
        contentMarkdown: `O diretor de cinema é o guardião final da visão artística da obra. Todos os departamentos (fotografia, arte, som, figurino) respondem ao mesmo conceito unificador. O diretor não precisa saber operar cada botão de uma câmera Arri ou de um gravador Sound Devices, mas **precisa saber exatamente o que quer sentir e comunicar em cada plano**.`,
        tonyNotes:
          'Nunca grite no set. A serenidade do diretor é o oxigênio que mantém toda a equipe criativa e focada.',
      },
      {
        id: 'sec-4-2',
        title: '2. Direção de Atores: Verbos de Ação vs. Adjetivos',
        subtitle: 'A técnica de dirigir através de objetivos palpáveis',
        contentMarkdown: `A pior instrução que um diretor pode dar a um ator é um adjetivo ou um estado de espírito abstrato: *"Fique mais triste"*, *"Seja mais misterioso"*.
O ator não consegue interpretar "tristeza"; ele interpreta **ações e objetivos**. Substitua adjetivos por verbos ativos transitivos:
* Em vez de *"fique furioso"*, diga: *"desmonte a mentira dele com elegância"*.
* Em vez de *"seja sedutora"*, diga: *"atraia a atenção dele para o documento sobre a mesa sem tocá-lo"*.`,
        tonyNotes:
          'Dê ao ator um obstáculo físico e um objetivo concreto: a emoção nascerá espontaneamente da resistência.',
      },
    ],
    quizQuestions: [
      {
        id: 'quiz-4-1',
        questionNumber: 1,
        prompt: 'Por que o uso de verbos de ação é muito mais eficaz na direção de atores do que o uso de adjetivos como "fique triste"?',
        options: [
          'Porque os atores não entendem o significado dos adjetivos.',
          'Porque o ator interpreta intenções e objetivos concretos contra obstáculos, e a emoção surge como consequência da ação física.',
          'Porque os adjetivos tornam o roteiro mais caro para ser filmado.',
          'Porque o diretor é obrigado por lei sindical a usar apenas verbos no set.',
        ],
        correctOptionIndex: 1,
        explanation:
          'Correto! O ator precisa de um objetivo jogável (um verbo ativo) e não de uma emoção abstrata que soaria fingida.',
      },
      {
        id: 'quiz-4-2',
        questionNumber: 2,
        prompt: 'O que significa a marcação cênica (blocking) em um ensaio de cena cinematográfica?',
        options: [
          'Bloquear a entrada de visitantes indesejados no set.',
          'A definição da movimentação física dos atores pelo espaço em relação à posição da câmera.',
          'A escolha do microfone mais adequado para a cena.',
          'O momento em que a equipe faz o intervalo de almoço.',
        ],
        correctOptionIndex: 1,
        explanation:
          'Exato! O blocking é a coreografia dos passos e posicionamentos dos atores dentro do espaço cênico e diante das lentes.',
      },
      {
        id: 'quiz-4-3',
        questionNumber: 3,
        prompt: 'Qual postura do diretor de cinema promove um ambiente seguro e de alta performance criativa?',
        options: [
          'Gritar com os assistentes para demonstrar autoridade diante dos atores.',
          'Mudar o roteiro a cada cinco minutos sem avisar a equipe de produção.',
          'Clareza de visão estética, escuta ativa, pontualidade e respeito irrestrito a todos os membros da equipe.',
          'Proibir que os atores façam perguntas sobre seus personagens.',
        ],
        correctOptionIndex: 2,
        explanation:
          'Perfeito! O profissionalismo cinematográfico fundamenta-se no rigor técnico associado ao respeito ético no ambiente de trabalho.',
      },
      {
        id: 'quiz-4-4',
        questionNumber: 4,
        prompt: 'Durante os ensaios de cena com o elenco, qual é o principal objetivo da "Leitura de Mesa" (Table Read)?',
        options: [
          'Decorar o texto rapidamente para filmar no mesmo dia.',
          'Alinhar o tom dramático da obra, ouvir a musicalidade dos diálogos e sanar dúvidas conceituais antes de pisar no set.',
          'Decidir quais figurinos serão comprados na internet.',
          'Verificar se os atores sabem ler em voz alta.',
        ],
        correctOptionIndex: 1,
        explanation:
          'Correto! A leitura de mesa é a primeira confraternização artística entre diretor e elenco, onde ritmo, intenções e harmonia dramática são ajustados.',
      },
      {
        id: 'quiz-4-5',
        questionNumber: 5,
        prompt: 'Como o diretor cinematográfico trabalha o "subtexto" nas pausas e olhares dos atores em cena?',
        options: [
          'Mandando o ator piscar os olhos freneticamente para a câmera.',
          'Criando uma ação física paralela e mantendo a tensão do que não é dito expressa através do olhar, respiração e ritmo corporal.',
          'Pedindo para o ator sussurrar o que está pensando para o microfone de lapela.',
          'Colocando legendas explicativas sobre a cabeça dos personagens.',
        ],
        correctOptionIndex: 1,
        explanation:
          'Exato! O subtexto vive no corpo, no olhar e no silêncio entre as falas, onde a tensão emocional genuína é transmitida ao espectador.',
      },
    ],
  },
  {
    id: 'apostila-5',
    moduleId: 5,
    number: 5,
    title: 'Apostila 05: Fotografia, Câmera e Iluminação',
    description:
      'A estética da luz no cinema, os 4 tipos de iluminação dramática, composição visual, profundidade de campo, lentes e operação consciente de câmeras e celulares.',
    pagesCount: 6,
    pdfUrl: '/materiais/cinelab-apostila-05.pdf',
    coverUrl: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=600&q=80',
    fileSizeMb: 22.4,
    extraVideos: [
      {
            "id": "ev-apostila-5-1",
            "slot": 1,
            "title": "Vídeo Extra 01: Fotografia, Câmera e Iluminação - O GABINETE DO DR. CALIGARI - M- 5.1",
            "videoUrl": "https://www.youtube.com/watch?v=yQn1j34-f4A",
            "thumbnailUrl": "https://img.youtube.com/vi/yQn1j34-f4A/hqdefault.jpg",
            "durationHours": 1,
            "durationMinutes": 17,
            "durationSeconds": 11,
            "totalDurationSeconds": 4631,
            "durationLabel": "01h 17m 11s",
            "description": "observe:\nEnquadramento:\nObserve como os personagens são posicionados dentro do quadro.\nCenários e composição:\nRepare nas linhas, formas, portas, janelas, paredes e objetos. Como eles conduzem o olhar do espectador?\nLuz e sombra:\nObserve onde existe luz e onde existe escuridão. Que sensação as sombras provocam?\nContraste:\nPerceba a diferença entre áreas claras e escuras e como isso influencia a atmosfera da cena.\nPerspectiva e profundidade:\nObserve como os cenários criam sensação de profundidade ou, em alguns momentos, parecem propositalmente deformados.\nCâmera:\nObserve a posição da câmera e pergunte: por que o diretor escolheu mostrar essa cena desse ponto de vista?\nDireção de arte + fotografia:\nPerceba que iluminação, cenário, figurino e enquadramento trabalham juntos para criar uma identidade visual.\nAtmosfera:\nPergunte-se: se essa mesma cena fosse iluminada de maneira totalmente diferente, ela provocaria a mesma sensação?",
            "professorNotes": "Ao assistir O Gabinete do Dr. Caligari, não observe apenas a história. Assista ao filme como um fotógrafo e diretor de fotografia. Observe como os cenários, as sombras, os enquadramentos e a iluminação são utilizados para criar uma atmosfera e transmitir sensações.\n\nPerceba que a fotografia cinematográfica não serve apenas para deixar uma imagem bonita. Ela pode ajudar a construir tensão, medo, mistério, desequilíbrio e personalidade visual. Observe como as formas e os contrastes presentes na imagem fazem parte da narrativa.",
            "uploadedAt": "2026-10-05T14:47:08.264Z"
      },
      {
            "id": "ev-apostila-5-2",
            "slot": 2,
            "title": "Vídeo Extra 02: Fotografia, Câmera e Iluminação - A NOITE DOS MORTOS-VIVOS - M- 5.2",
            "videoUrl": "https://www.youtube.com/watch?v=CfaU2Og_Zt0",
            "thumbnailUrl": "https://img.youtube.com/vi/CfaU2Og_Zt0/hqdefault.jpg",
            "durationHours": 1,
            "durationMinutes": 35,
            "durationSeconds": 12,
            "totalDurationSeconds": 5712,
            "durationLabel": "01h 35m 12s",
            "description": "observe:\nIluminação em preto e branco:\nObserve como a ausência de cor faz a luz e a sombra ganharem importância.\nAlto contraste:\nPerceba as áreas muito claras ao lado de sombras profundas.\nCâmera na mão x câmera fixa:\nObserve quando a câmera se move com os personagens e quando permanece estática observando a ação.\nPlanos fechados (close-ups):\nObserve os enquadramentos nos rostos dos personagens para intensificar expressões de medo, angústia e desespero.\nUso do espaço fechado:\nPerceba como a iluminação e os enquadramentos reforçam a sensação de claustrofobia dentro da casa.\nIluminação diegética:\nObserve fontes de luz dentro da cena (lâmpadas, velas, faróis de carro, fósforos).\nProfundidade de campo:\nPreste atenção ao que está nítido no primeiro plano e o que acontece desfocado ao fundo.\nEconomia de recursos:\nPerceba como uma iluminação simples, bem direcionada, cria atmosfera sem necessidade de equipamentos caros.",
            "professorNotes": "Em A Noite dos Mortos-Vivos, observe como uma produção visualmente simples consegue criar tensão através das escolhas de câmera, enquadramento e iluminação.\n\nNão procure apenas equipamentos sofisticados. Observe como o diretor utiliza aquilo que tem disponível para construir uma atmosfera cinematográfica. A iluminação de baixo orçamento, quando bem pensada, torna-se uma ferramenta artística poderosa para gerar medo, claustrofobia e realismo.",
            "uploadedAt": "2026-10-05T14:47:08.264Z"
      }
],
    sections: [
      {
        id: 'sec-5-1',
        title: '1. As 4 Qualidades de Luz Essenciais',
        subtitle: 'Frontal, Lateral, Contraluz e Luz de Janela',
        contentMarkdown: `A direção de fotografia esculpe o volume tridimensional da cena:
1. **Luz Frontal**: Atinge o rosto diretamente no mesmo eixo da câmera. Achata os traços, elimina sombras e cria um aspecto limpo, direto ou institucional.
2. **Luz Lateral (90°)**: Ilumina metade do rosto deixando a outra na penumbra. Gera textura, revela poros e cria alto contraste dramático (chiaroscuro).
3. **Contraluz (Backlight)**: Posicionada atrás do sujeito em direção à câmera. Cria uma auréola de luz nos ombros e cabelos, destacando o personagem do fundo escuro.
4. **Luz de Janela (Natural / Suave)**: Difusa por cortinas ou rebatida em paredes. A luz mais nobre do cinema intimista e poético (Tarkovsky, Bresson).`,
        tonyNotes:
          'Aprenda a fotografar com luz natural de janela rebatida em um pedaço de isopor antes de gastar milhares de reais em refletores LED.',
      },
      {
        id: 'sec-5-2',
        title: '2. Regras de Composição: Terços, Linhas e Espaço Negativo',
        subtitle: 'A organização harmônica do quadro cinematográfico',
        contentMarkdown: `O olho humano busca padrões naturais de equilíbrio:
* **Regra dos Terços**: Posicione os olhos do personagem nas interseções superiores da grade de 3x3.
* **Espaço Negativo**: A área vazia ao redor do sujeito reforça a solidão, a espera ou o isolamento social.
* **Linhas de Fuga**: Corredores, trilhos, ruas e pontes que direcionam a visão diretamente para o ponto dramático.`,
        tonyNotes:
          'Conheça as regras de composição para poder quebrá-las deliberadamente quando o drama exigir desconforto.',
      },
      {
        id: 'sec-5-3',
        title: '3. Estudo de Caso & Vídeo Extra: Herói (Hero, com Jet Li)',
        subtitle: 'A Masterclass Cromática de Christopher Doyle e Zhang Yimou',
        contentMarkdown: `Como demonstrado na indicação do filme extra do Módulo 05 (**Herói**, 2002, estrelado por Jet Li e fotografado por Christopher Doyle), a cor e a iluminação não são meros adereços decorativos, mas a própria espinha dorsal da narrativa:
* **Psicologia Cromática Estrutural**: A mesma história é recontada em versões divergentes, onde cada versão adota uma paleta estrita: **Vermelho** (paixão cega e ciúme), **Azul** (razão e lealdade lúcida), **Branco** (verdade e sacrifício), **Verde** (memória e afeto) e **Preto** (a solenidade imperial).
* **Velocidade de Obturação e Luz em Alta Velocidade**: No duelo de Jet Li contra Donnie Yen no pátio sob chuva torrencial, a iluminação dura lateral transforma cada gota d'água suspensa em vidro cortante.
* **Espelho Natural e Luz Suave**: No lendário duelo sobre o lago calmo, a equipe aguardava as duas primeiras horas da alvorada para captar a água em espelho absoluto sob luz suave difusa.`,
        content: `Como demonstrado na indicação do filme extra do Módulo 05 (Herói, 2002, estrelado por Jet Li e fotografado por Christopher Doyle), a cor e a iluminação não são meros adereços decorativos, mas a própria espinha dorsal da narrativa:
* Psicologia Cromática Estrutural: A mesma história é recontada em versões divergentes, onde cada versão adota uma paleta estrita: Vermelho (paixão cega e ciúme), Azul (razão e lealdade lúcida), Branco (verdade e sacrifício), Verde (memória e afeto) e Preto (a solenidade imperial).
* Velocidade de Obturação e Luz em Alta Velocidade: No duelo de Jet Li contra Donnie Yen no pátio sob chuva torrencial, a iluminação dura lateral transforma cada gota d'água suspensa em vidro cortante.
* Espelho Natural e Luz Suave: No lendário duelo sobre o lago calmo, a equipe aguardava as duas primeiras horas da alvorada para captar a água em espelho absoluto sob luz suave difusa.`,
        keyTakeaway: 'Assista aos vídeos extras de "Herói" na Cinemateca e na aba do Módulo 05. Repare como Christopher Doyle ilumina os figurinos monocromáticos para destacá-los sem saturar a pele dos atores.',
        tonyNotes:
          'Assista aos vídeos extras de "Herói" na Cinemateca e na aba do Módulo 05. Repare como Christopher Doyle ilumina os figurinos monocromáticos para destacá-los sem saturar a pele dos atores.',
      },
      {
        id: 'sec-5-4',
        title: '4. A Gramática das Variações Cromáticas em Herói (Hero)',
        subtitle: 'Decupagem estética das 5 paletas de cor que reinventaram a fotografia no cinema',
        contentMarkdown: `Na Cinemateca do CINELAB (Módulo 05), disponibilizamos as cenas de estudo com cada variação de cor. Analise a função dramatúrgica de cada uma:

1. **A Paleta Vermelha (Duelo no Bosque de Folhas Outonais)**:
   * *Significado Dramático*: Paixão ardente, ciúme obsessivo, engano e ilusão destrutiva. É a história contada sob a suspeita de traição.
   * *Técnica Fotográfica*: Christopher Doyle utilizou emulsões de alta saturação e iluminação incandescente quente. As folhas no chão iniciam em amarelo-ouro quente e, conforme o duelo entre Neve Voadora e Lua culmina em assassinato, transformam-se cinematograficamente em um vermelho escarlate sangue avassalador.

2. **A Paleta Azul (O Lago Calmo e a Razão Lúcida)**:
   * *Significado Dramático*: Sabedoria, busca da verdade, lealdade e serenidade reflexiva. É a versão onde os amantes compreendem a necessidade do bem maior.
   * *Técnica Fotográfica*: Temperatura de cor balanceada para a luz fria do dia (5600K a 6500K). O lago do Parque Jiuzhaigou só podia ser filmado por 2 horas diárias para captar a água imóvel sem ondulações de vento, criando a simetria perfeita entre o real e o reflexo.

3. **A Paleta Verde (A Escola de Caligrafia de Zhao sob Flechas)**:
   * *Significado Dramático*: Pureza de espírito, juventude, memória afetuosa e a eternidade da arte sobre a barbárie.
   * *Técnica Fotográfica*: Mantos verdes esmeralda tingidos manualmente que contrastam violentamente com as dezenas de milhares de flechas pretas retilíneas lançadas pelo exército invasor. A iluminação filtra suavemente pelas janelas de papel de arroz.

4. **A Paleta Branca (O Luto, o Sacrifício e a Verdade Desnuda)**:
   * *Significado Dramático*: A realidade sem adereços, o luto solene, o sacrifício supremo e a clareza moral. Na tradição chinesa antiga, o branco é a cor do luto e do fim do ciclo terreno.
   * *Técnica Fotográfica*: Luz solar direta dura nas areias brancas do deserto de Dunhuang, sem rebatedores quentes. Os rostos expostos ao vento revelam a dor crua dos guerreiros.

5. **A Paleta Preta / Sombra Imperial (A Ordem de Qin e o Duelo na Chuva)**:
   * *Significado Dramático*: O peso inflexível da lei imperial, autoridade esmagadora e poderio bélico.
   * *Técnica Fotográfica*: Alto contraste (chiaroscuro extremo), silhuetas pretas contra lanternas de óleo e contraluz lateral duro sobre as armaduras e as gotas de chuva no confronto entre Jet Li e Donnie Yen.`,
        content: `Na Cinemateca do CINELAB (Módulo 05), disponibilizamos as cenas de estudo com cada variação de cor. Analise a função dramatúrgica de cada uma:

1. A Paleta Vermelha (Duelo no Bosque de Folhas Outonais):
- Significado Dramático: Paixão ardente, ciúme obsessivo, engano e ilusão destrutiva.
- Técnica Fotográfica: Christopher Doyle utilizou emulsões de alta saturação e iluminação incandescente quente. As folhas transformam-se em vermelho escarlate sangue quando a tragédia se consuma.

2. A Paleta Azul (O Lago Calmo e a Razão Lúcida):
- Significado Dramático: Sabedoria, serenidade e busca da verdade objetiva.
- Técnica Fotográfica: Temperatura de cor fria (5600K a 6500K) e água em espelho absoluto.

3. A Paleta Verde (A Escola de Caligrafia de Zhao sob Flechas):
- Significado Dramático: Juventude, memória afetuosa e persistência da arte.
- Técnica Fotográfica: Mantos verdes esmeralda em contraste brutal com as flechas pretas do império.

4. A Paleta Branca (O Luto, o Sacrifício e a Verdade Desnuda):
- Significado Dramático: A realidade sem adornos e o luto da perda trágica.
- Técnica Fotográfica: Luz solar dura direta no deserto sem filtros quentes.

5. A Paleta Preta (A Ordem de Qin e o Duelo na Chuva):
- Significado Dramático: Autoridade implacável e rigor geométrico.
- Técnica Fotográfica: Contraluz lateral e alto contraste com sombras pretas densas.`,
        keyTakeaway: 'A cor nunca deve ser apenas decorativa: em um filme autoral, ela é o estado emocional da cena. Ao planejar seu curta, defina qual cor dominará cada ato antes de posicionar as lâmpadas.',
        tonyNotes:
          'A cor nunca deve ser apenas decorativa: em um filme autoral, ela é o estado emocional da cena. Ao planejar seu curta, defina qual cor dominará cada ato antes de posicionar as lâmpadas.',
      },
    ],
    quizQuestions: [
      {
        id: 'quiz-5-1',
        questionNumber: 1,
        prompt: 'Qual é a função do contraluz (backlight) na iluminação de uma cena?',
        options: [
          'Deixar a lente da câmera suja para criar reflexos.',
          'Separar o sujeito do fundo escuro, criando um contorno luminoso nos cabelos e ombros.',
          'Iluminar as pernas dos atores quando eles usam sapatos pretos.',
          'Substituir o microfone de lapela.',
        ],
        correctOptionIndex: 1,
        explanation:
          'Correto! O contraluz delimita a silhueta do personagem contra o cenário, conferindo sensação de profundidade tridimensional.',
      },
      {
        id: 'quiz-5-2',
        questionNumber: 2,
        prompt: 'O que acontece esteticamente quando utilizamos uma iluminação puramente lateral a 90 graus no rosto de um personagem?',
        options: [
          'O rosto perde toda a textura e fica plano como em um desenho animado.',
          'Metade do rosto fica iluminada e a outra metade em sombra dramática, acentuando texturas e conflito interno.',
          'A câmera perde o foco automaticamente.',
          'A cor da cena é transformada em preto e branco sem necessidade de edição.',
        ],
        correctOptionIndex: 1,
        explanation:
          'Exato! A luz lateral gera o contraste claro-escuro, acentuando o relevo facial e sugerindo dualidade psicológica.',
      },
      {
        id: 'quiz-5-3',
        questionNumber: 3,
        prompt: 'Qual das opções descreve corretamente o uso do espaço negativo na composição cinematográfica?',
        options: [
          'O espaço que fica atrás da equipe de filmagem fora do set.',
          'A área do enquadramento que não contém elementos dramáticos centrais, utilizada para evocar vazio, silêncio ou pequenez.',
          'O espaço do disco rígido ocupado pelos arquivos apagados.',
          'A sala onde o diretor assiste aos cortes preliminares.',
        ],
        correctOptionIndex: 1,
        explanation:
          'Perfeito! O espaço negativo emoldura o sujeito, ampliando a carga expressiva da solidão ou da vulnerabilidade.',
      },
      {
        id: 'quiz-5-4',
        questionNumber: 4,
        prompt: 'Como a abertura do diafragma (f-stop) influencia visualmente a profundidade de campo em um plano cinematográfico?',
        options: [
          'Quanto mais aberto o diafragma (ex: f/1.8), mais rasa é a profundidade de campo, isolando o sujeito nítido com fundo desfocado (bokeh).',
          'A abertura do diafragma só altera o volume do microfone.',
          'Quanto mais aberto o diafragma, mais escuro fica o plano.',
          'O diafragma serve exclusivamente para mudar a taxa de quadros por segundo.',
        ],
        correctOptionIndex: 0,
        explanation:
          'Correto! Grandes aberturas de diafragma (números f pequenos) geram pouca profundidade de campo, direcionando o foco do espectador para o personagem.',
      },
      {
        id: 'quiz-5-5',
        questionNumber: 5,
        prompt: 'Quais são as três fontes que compõem o clássico esquema de iluminação de três pontos no cinema?',
        options: [
          'Luz Vermelha, Luz Verde e Luz Azul.',
          'Luz Principal (Key Light), Luz de Preenchimento (Fill Light) e Contraluz (Backlight).',
          'Lanterna de celular, tela do computador e vela aromática.',
          'Farol de carro, poste de rua e luz solar direta.',
        ],
        correctOptionIndex: 1,
        explanation:
          'Exato! O trio clássico modela o sujeito com a luz principal, atenua sombras excessivas com o preenchimento e separa o corpo do fundo com o contraluz.',
      },
    ],
  },
  {
    id: 'apostila-6',
    moduleId: 6,
    number: 6,
    title: 'Apostila 06: Som e Trilha Sonora',
    description:
      'Captação de som direto no set, microfones direcionais e lapela, ruídos de sala (room tone), camadas de desenho sonoro (foley, efeitos e trilha) e legislação de áudio.',
    pagesCount: 4,
    pdfUrl: '/materiais/cinelab-apostila-06.pdf',
    coverUrl: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=600&q=80',
    fileSizeMb: 18.1,
    extraVideos: [
      {
            "id": "ev-apostila-6-1",
            "slot": 1,
            "title": "Vídeo Extra 01: Som e Trilha Sonora - O HOMEM QUE COPIAVA - M- 6.1",
            "videoUrl": "https://www.youtube.com/watch?v=fjT-CtR4AWs",
            "thumbnailUrl": "https://img.youtube.com/vi/fjT-CtR4AWs/hqdefault.jpg",
            "durationHours": 2,
            "durationMinutes": 5,
            "durationSeconds": 2,
            "totalDurationSeconds": 7502,
            "durationLabel": "02h 05m 02s",
            "description": "Observe:\nVoz e narração:\nObserve como a voz do personagem pode conduzir a narrativa e revelar informações que não estão necessariamente sendo mostradas pela imagem.\nSons ambientes:\nPreste atenção aos sons da cidade, trânsito, máquinas copiadoras, passos, portas e ruídos cotidianos.\nMúsica:\nIdentifique quando a trilha musical entra, qual emoção ela reforça e quando ela para de tocar.\nFoley e ruídos de ação:\nObserve o som de notas de dinheiro sendo contadas, papel sendo manipulado, objetos e passos.\nSilêncios:\nRepare nos momentos em que a ausência de som cria expectativa ou reflexão.\nRitmo sonoro:\nPerceba como a montagem do som acompanha o ritmo dos pensamentos do protagonista.",
            "professorNotes": "Ao assistir O Homem Que Copiava, não observe somente a história. Preste atenção em tudo aquilo que você escuta e perceba como o som participa da construção da narrativa.\n\nObserve a relação entre voz, música, ruídos, sons ambientes e imagem. Perceba que determinados sons podem representar pensamentos, memórias, ironias ou sentimentos do protagonista.\n\nO som no cinema não serve apenas para acompanhar a imagem. Ele pode contar coisas que a imagem não mostra.",
            "uploadedAt": "2026-10-05T14:47:08.265Z"
      },
      {
            "id": "ev-apostila-6-2",
            "slot": 2,
            "title": "Vídeo Extra 02: Som e Trilha Sonora - O SOM AO REDOR - M- 6.2",
            "videoUrl": "https://www.youtube.com/watch?v=OOUtn06aP9I",
            "thumbnailUrl": "https://img.youtube.com/vi/OOUtn06aP9I/hqdefault.jpg",
            "durationHours": 2,
            "durationMinutes": 10,
            "durationSeconds": 59,
            "totalDurationSeconds": 7859,
            "durationLabel": "02h 10m 59s",
            "description": "Observe:\nSom ambiente:\nFeche os olhos durante alguns momentos e tente identificar quantos sons diferentes existem na cena.\nSons fora do quadro:\nObserve os sons que você escuta sem conseguir ver imediatamente sua origem.\nConstrução do espaço:\nPergunte: se retirássemos o som, ainda teríamos a mesma percepção daquele lugar?\nSons cotidianos:\nPreste atenção aos sons aparentemente banais: televisão, carros, portões, aparelhos domésticos, animais, passos etc.\nSons como suspense:\nObserve quando um som aparentemente comum passa a provocar tensão.\nDireção de som:\nPerceba se determinados sons estão mais próximos ou mais distantes e como isso cria profundidade.\nSilêncio:\nObserve quando o ambiente fica inesperadamente silencioso.\nMúsica x som ambiente:\nIdentifique quando existe música propriamente dita e quando a emoção é criada apenas pelos sons do ambiente.\nSom subjetivo:\nObserve se existem momentos em que o tratamento sonoro parece representar a percepção ou o estado emocional de determinado personagem.",
            "professorNotes": "Em O Som ao Redor, faça um exercício diferente: tente perceber o ambiente antes mesmo de pensar na história.\n\nObserve quantas informações chegam ao espectador através dos sons. Portões, carros, televisões, conversas, cachorros, aparelhos domésticos, ruídos da rua e sons distantes ajudam a construir o espaço onde a história acontece.\n\nPerceba também que alguns sons aparentemente comuns podem adquirir outro significado dentro da narrativa. Um ruído distante pode criar expectativa; um som repetitivo pode provocar incômodo; um silêncio repentino pode chamar a atenção.\n\nO objetivo é compreender que o espaço cinematográfico também é construído pelo ouvido. Uma cena não precisa mostrar tudo para fazer o espectador perceber que algo está acontecendo.",
            "uploadedAt": "2026-10-05T14:47:08.265Z"
      }
],
    sections: [
      {
        id: 'sec-6-1',
        title: '1. O Som Direto e a Gravação de Room Tone',
        subtitle: 'A regra de ouro de nunca deixar o set sem o silêncio da locação',
        contentMarkdown: `O **Room Tone** (ruído de sala ou ambiência neutra) é o som daquele espaço específico sem ninguém falando: o zumbido sutil da rede elétrica, o vento distante, a ressonância das paredes.
Grave sempre **pelo menos 60 segundos de room tone absoluto** com a equipe imóvel e em silêncio antes de desarmar o set. Sem esse áudio, o montador não conseguirá emendar os cortes de diálogo sem que ocorram quedas abruptas de ruído de fundo.`,
        tonyNotes:
          'Silêncio total por 1 minuto no set é o maior respeito que uma equipe pode prestar à pós-produção do filme.',
      },
      {
        id: 'sec-6-2',
        title: '2. As Quatro Camadas do Sound Design',
        subtitle: 'Diálogo, Foley, Efeitos (FX) e Trilha Sonora',
        contentMarkdown: `A mixagem cinematográfica profissional equilibra quatro pilares:
1. **Diálogos (DX)**: Devem ser claros, inteligíveis e tratados sem excesso de reverberação invasiva.
2. **Foley**: Sons corporais gravados em estúdio sincronizados com a ação (passos, toque de xícaras, atrito de roupas).
3. **Efeitos Especiais e Ambiência (FX/BG)**: Motores, chuva, tiros, vento, portas batendo.
4. **Música (MX)**: Não deve redundar o que a imagem já mostra; deve dialogar em contraponto ou revelar o subtexto interior.`,
        tonyNotes:
          'Se a cena é triste e você coloca uma música ultra melodramática, você agride o espectador. Deixe a imagem e o silêncio respirarem.',
      },
    ],
    quizQuestions: [
      {
        id: 'quiz-6-1',
        questionNumber: 1,
        prompt: 'Por que é fundamental gravar ao menos 60 segundos de "Room Tone" (ruído de sala) em cada locação antes de desmontar o set?',
        options: [
          'Para testar se a bateria do gravador ainda tem carga.',
          'Para que o montador possa preencher lacunas de áudio e suavizar cortes entre diferentes tomadas de diálogo sem saltos acústicos.',
          'Porque a legislação trabalhista exige um minuto de silêncio diário para os atores.',
          'Para que o diretor possa relaxar a mente após a filmagem.',
        ],
        correctOptionIndex: 1,
        explanation:
          'Correto! O room tone permite criar uma base contínua que mascara os cortes de diálogo na ilha de edição.',
      },
      {
        id: 'quiz-6-2',
        questionNumber: 2,
        prompt: 'O que caracteriza o trabalho do artista de Foley na pós-produção de áudio?',
        options: [
          'Escrever as partituras orquestrais da trilha sonora clássica.',
          'Recriar em estúdio e em sincronia labial e física os ruídos de passos, roupas, copos e manuseio de objetos.',
          'Instalar caixas de som nos cinemas de rua.',
          'Substituir a voz dos atores por inteligência artificial.',
        ],
        correctOptionIndex: 1,
        explanation:
          'Exato! O artista de Foley reproduz manualmente texturas sonoras humanas para dar peso e presença física ao filme.',
      },
      {
        id: 'quiz-6-3',
        questionNumber: 3,
        prompt: 'Em relação aos direitos autorais de músicas comerciais conhecidas em curtas-metragens independentes:',
        options: [
          'Qualquer música pode ser usada livremente desde que o curta não cobre ingresso.',
          'Músicas de artistas consagrados exigem autorização expressa e onerosa dos detentores; utilizar sem licença bloqueia o filme em festivais e plataformas.',
          'Se a música tocar por menos de 30 segundos, não é necessária autorização.',
          'O YouTube autoriza automaticamente qualquer música se o vídeo for educativo.',
        ],
        correctOptionIndex: 1,
        explanation:
          'Perfeito! O uso desautorizado de trilhas comerciais é a causa número um de desclassificação de curtas em festivais sérios.',
      },
      {
        id: 'quiz-6-4',
        questionNumber: 4,
        prompt: 'Qual a função do microfone direcionador (Shotgun) acoplado à vara de boom na captação de diálogos no set?',
        options: [
          'Captar o som em 360 graus de todo o bairro.',
          'Isolar com alta precisão a voz dos atores vinda de frente, rejeitando ruídos laterais indesejados da equipe e do tráfego.',
          'Substituir a iluminação da cena.',
          'Servir de apoio físico para o operador de câmera se apoiar.',
        ],
        correctOptionIndex: 1,
        explanation:
          'Correto! O microfone shotgun possui padrão polar hipercardioide/lobar, privilegiando o eixo frontal e atenuando ruídos incidentes nas laterais.',
      },
      {
        id: 'quiz-6-5',
        questionNumber: 5,
        prompt: 'Na pré-produção de som e direção de arte, por que a escolha de materiais cenográficos influencia diretamente a captação de áudio?',
        options: [
          'Porque pisos ocos, sapatos de salto duro e superfícies de vidro reverberantes geram ruídos indesejados que poluem os microfones durante as falas.',
          'Porque o som só pode ser gravado se o cenário for pintado de azul.',
          'Não há qualquer relação entre a cenografia e a captação sonora.',
          'Porque os microfones só funcionam perto de cortinas de veludo.',
        ],
        correctOptionIndex: 0,
        explanation:
          'Exato! A acústica da locação e os objetos de cena (calçados, portas, móveis) impactam diretamente a clareza e a pureza do diálogo gravado no set.',
      },
    ],
  },
  {
    id: 'apostila-7',
    moduleId: 7,
    number: 7,
    title: 'Apostila 07: Montagem e Pós-Produção',
    description:
      'A teoria e prática da montagem, organização e nomenclatura de mídias, sincronização, continuidades, cortes rítmicos, elipses e finalização.',
    pagesCount: 4,
    pdfUrl: '/materiais/cinelab-apostila-07.pdf',
    coverUrl: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=600&q=80',
    fileSizeMb: 20.5,
    extraVideos: [
      {
            "id": "ev-apostila-7-1",
            "slot": 1,
            "title": "Vídeo Extra 01: Montagem e Pós-Produção - A GREVE - M- 7.1",
            "videoUrl": "https://www.youtube.com/watch?v=VD40vLjRaNA",
            "thumbnailUrl": "https://img.youtube.com/vi/VD40vLjRaNA/hqdefault.jpg",
            "durationHours": 1,
            "durationMinutes": 28,
            "durationSeconds": 56,
            "totalDurationSeconds": 5336,
            "durationLabel": "01h 28m 56s",
            "description": "Observe:\nCorte entre planos:\nObserve quando o diretor corta de uma imagem para outra e pergunte por que aquele corte acontece.\nAssociação de imagens:\nObserve duas imagens diferentes colocadas em sequência. Que ideia surge da combinação?\nContraste:\nPerceba quando o filme coloca situações ou personagens opostos lado a lado.\nMontagem paralela:\nObserve quando acontecimentos diferentes são alternados pela montagem.\nRitmo:\nPerceba quando os cortes ficam mais rápidos ou mais demorados.\nRepetição:\nObserve se determinados tipos de imagens ou ações são repetidos e qual efeito isso produz.\nMetáfora visual:\nProcure imagens que representam uma ideia diferente daquela que aparece literalmente na cena.\nConstrução de tensão:\nObserve como a montagem organiza diferentes ações para aumentar a expectativa.\nSequência final:\nPreste atenção especial à associação entre a repressão aos trabalhadores e as imagens de animais. Pergunte: o que a montagem está dizendo que nenhuma dessas imagens diria sozinha?",
            "professorNotes": "Ao assistir A Greve, não tente acompanhar somente a história. Assista prestando atenção à maneira como uma imagem é colocada ao lado da outra.\n\nPergunte-se constantemente: por que o diretor escolheu cortar exatamente neste momento? Por que colocou esta imagem depois daquela?\n\nPerceba que a montagem não serve apenas para organizar as cenas. Ela pode criar ideias, comparações, emoções e significados que não estão presentes em nenhum plano isoladamente.\n\nObserve também o ritmo dos cortes. Quando a ação fica mais intensa, a montagem pode se tornar mais dinâmica. Quando o diretor quer criar determinada sensação, pode alterar a duração e a combinação dos planos.\n\nO objetivo é compreender que montar é construir uma narrativa através da relação entre imagens.",
            "uploadedAt": "2026-10-05T14:47:08.266Z"
      },
      {
            "id": "ev-apostila-7-2",
            "slot": 2,
            "title": "Vídeo Extra 02: Montagem e Pós-Produção - A GENERAL - M- 7.2",
            "videoUrl": "https://www.youtube.com/watch?v=520-x-oNWlA",
            "thumbnailUrl": "https://img.youtube.com/vi/520-x-oNWlA/hqdefault.jpg",
            "durationHours": 1,
            "durationMinutes": 18,
            "durationSeconds": 32,
            "totalDurationSeconds": 4712,
            "durationLabel": "01h 18m 32s",
            "description": "Observe:\nContinuidade da ação:\nObserve como os cortes permitem acompanhar uma ação sem perder a noção do que está acontecendo.\nDireção do movimento:\nObserve para onde os trens, veículos e personagens se deslocam em cada plano. Como a montagem mantém a coerência de direção?\nMontagem para o humor:\nPerceba como o timing do corte determina o efeito cômico da cena (antecipação, surpresa e reação).\nCortes no movimento:\nObserve os cortes realizados durante uma ação física para tornar a transição imperceptível.\nClareza espacial:\nMesmo em cenas complexas com grandes máquinas em movimento, o espectador sempre sabe onde cada elemento está posicionado.",
            "professorNotes": "Ao assistir A General, observe o filme como um exercício de montagem. Não se preocupe apenas em acompanhar a aventura de Johnnie Gray. Procure perceber como diferentes planos são organizados para que o espectador compreenda perfeitamente a ação.\n\nObserve como a montagem acompanha perseguições, movimentos de trens, obstáculos e ações físicas mantendo sempre a clareza espacial e a continuidade do movimento.\n\nO aluno deve compreender que a montagem não serve apenas para criar efeitos dramáticos ou poéticos; ela é a ferramenta essencial para organizar a ação e guiar a atenção da plateia com precisão cirúrgica.",
            "uploadedAt": "2026-10-05T14:47:08.266Z"
      }
],
    sections: [
      {
        id: 'sec-7-1',
        title: '1. O Efeito Kuleshov e o Poder da Justaposição',
        subtitle: '1 + 1 = 3 no pensamento cinematográfico',
        contentMarkdown: `O cineasta soviético Lev Kuleshov demonstrou que dois planos justapostos geram um terceiro sentido que não existia em nenhum deles isoladamente:
* Rosto inexpressivo do ator + prato de sopa = fome.
* Rosto inexpressivo do ator + caixão de criança = luto profundo.
* Rosto inexpressivo do ator + mulher bonita = desejo.
A montagem é o coração da linguagem cinematográfica porque cria pensamento na mente de quem assiste.`,
        tonyNotes:
          'O montador é o terceiro roteirista do filme. O primeiro escreve no papel, o segundo filma no set e o terceiro salva na ilha de edição.',
      },
      {
        id: 'sec-7-2',
        title: '2. Técnicas de Corte Dinâmico',
        subtitle: 'Corte na ação, corte de reação e elipse temporal',
        contentMarkdown: `Para manter a ilusão de fluidez ininterrupta:
* **Corte na Ação (Cut on Action)**: O plano é cortado no momento em que o personagem inicia um movimento (levantar da cadeira, abrir uma porta), completando o movimento no plano seguinte. O cérebro segue o movimento e não percebe a emenda.
* **Elipse**: Eliminação do tempo morto desnecessário. Se o personagem sai de casa e chega ao trabalho, não precisamos filmar os 40 minutos do trajeto de ônibus.`,
        tonyNotes:
          'Corte sempre por um motivo emocional, narrativo ou visual. Se não há motivo, deixe o plano respirar.',
      },
    ],
    quizQuestions: [
      {
        id: 'quiz-7-1',
        questionNumber: 1,
        prompt: 'O que comprovou o célebre experimento histórico do "Efeito Kuleshov"?',
        options: [
          'Que os atores russos eram os mais expressivos do mundo.',
          'Que a justaposição de dois planos distintos cria na mente do espectador um novo significado psicológico que nenhum dos planos possuía sozinho.',
          'Que o cinema não precisa de diretores de fotografia.',
          'Que filmes em preto e branco são mais baratos de produzir.',
        ],
        correctOptionIndex: 1,
        explanation:
          'Correto! O Efeito Kuleshov provou que o sentido cinematográfico nasce da relação dialética entre cortes sucessivos.',
      },
      {
        id: 'quiz-7-2',
        questionNumber: 2,
        prompt: 'Em que consiste a técnica de "Corte na Ação" (Cut on Action)?',
        options: [
          'Cortar o filme assim que explode uma bomba.',
          'Mudar o enquadramento durante o movimento físico de um personagem, fazendo com que o olho do espectador acompanhe a ação e ignore o corte.',
          'Pedir para o diretor gritar "ação" duas vezes.',
          'Interromper a edição no final da jornada de trabalho.',
        ],
        correctOptionIndex: 1,
        explanation:
          'Exato! O corte na ação mascara a transição de planos através do movimento contínuo da cena.',
      },
      {
        id: 'quiz-7-3',
        questionNumber: 3,
        prompt: 'Qual a definição de "Elipse Temporal" na montagem cinematográfica?',
        options: [
          'Uma falha técnica que faz o vídeo piscar em preto.',
          'A supressão deliberada de um trecho de tempo da história que não é necessário para o espectador compreender a narrativa.',
          'O atraso na entrega do filme para os festivais.',
          'O uso exclusivo de planos-sequência de 10 minutos.',
        ],
        correctOptionIndex: 1,
        explanation:
          'Perfeito! A elipse descarta os tempos mortos e concentra a narrativa nos eventos de real relevância dramática.',
      },
      {
        id: 'quiz-7-4',
        questionNumber: 4,
        prompt: 'Qual a diferença entre um "Corte em J" (J-Cut) e um "Corte em L" (L-Cut) na montagem audiovisual?',
        options: [
          'O J-Cut é feito apenas nas segundas-feiras e o L-Cut nas sextas-feiras.',
          'No J-Cut o áudio da cena seguinte começa a ser ouvido antes do corte visual; no L-Cut a imagem muda mas o áudio da cena anterior continua ecoando.',
          'O J-Cut só pode ser usado em comédias e o L-Cut em filmes de terror.',
          'Ambos são teclas de atalho que desligam o monitor do editor.',
        ],
        correctOptionIndex: 1,
        explanation:
          'Correto! O J-Cut antecipa o som criando expectativa, enquanto o L-Cut prolonga o som anterior gerando continuidade e ressonância emocional.',
      },
      {
        id: 'quiz-7-5',
        questionNumber: 5,
        prompt: 'Por que o marco de "Picture Lock" (trava da imagem) é uma etapa sagrada antes da finalização de som e cor?',
        options: [
          'Porque impede que o computador pegue vírus na internet.',
          'Porque qualquer alteração na duração dos planos após o Picture Lock desalinha toda a mixagem sonora, efeitos de Foley e sincronismo de áudio.',
          'Porque a imagem fica bloqueada e não pode mais ser vista pelo diretor.',
          'Porque o arquivo é gravado em fita VHS antiga.',
        ],
        correctOptionIndex: 1,
        explanation:
          'Exato! O Picture Lock congela os cortes da narrativa, permitindo que a pós-produção de áudio, cor e efeitos visuais trabalhe com timecodes definitivos.',
      },
    ],
  },
  {
    id: 'apostila-8',
    moduleId: 8,
    number: 8,
    title: 'Apostila 08: Produção Executiva e Planejamento',
    description:
      'A engenharia da realização cinematográfica: formação de equipes de set, ordem do dia profissional, orçamentação ética, autorizações e planos de contingência.',
    pagesCount: 4,
    pdfUrl: '/materiais/cinelab-apostila-08.pdf',
    coverUrl: 'https://images.unsplash.com/photo-1535016120720-40c646be5580?auto=format&fit=crop&w=600&q=80',
    fileSizeMb: 19.4,
    extraVideos: [
      {
            "id": "ev-apostila-8-1",
            "slot": 1,
            "title": "Vídeo Extra 01: Produção Executiva e Planejamento - BAILE PERFUMADO - M- 8.1",
            "videoUrl": "https://www.youtube.com/watch?v=_8ZrfthVE24",
            "thumbnailUrl": "https://img.youtube.com/vi/_8ZrfthVE24/hqdefault.jpg",
            "durationHours": 1,
            "durationMinutes": 32,
            "durationSeconds": 42,
            "totalDurationSeconds": 5562,
            "durationLabel": "01h 32m 42s",
            "description": "Observe:\nLocações:\nObserve os diferentes ambientes utilizados e pense nas dificuldades de filmar em regiões externas e afastadas.\nDireção de arte:\nObserve como cenários e ambientes são preparados para representar uma determinada época.\nFigurinos:\nPerceba a quantidade de personagens e como suas roupas ajudam a construir o período histórico.\nObjetos de cena:\nObserve armas, veículos, equipamentos, objetos pessoais e elementos utilizados pelos personagens.\nVeículos e deslocamentos:\nObserve quantos veículos aparecem e imagine toda a logística necessária para disponibilizá-los durante as filmagens.\nContinuidade:\nObserve roupas, objetos e características dos ambientes entre diferentes cenas.\nPesquisa histórica:\nPerceba como a produção precisou pesquisar personagens, época, costumes, lugares e acontecimentos históricos.\nOrganização da equipe:\nO aluno deve perceber que uma produção envolve muito mais profissionais do que apenas diretor e atores.\nRecursos financeiros:\nPergunte: quanto custaria transportar equipe, equipamentos, figurinos, veículos e materiais para realizar uma produção desse tipo?\nPlanejamento de uma produção de época:\nImagine que você fosse o produtor responsável pelo filme. O que precisaria ser resolvido antes de iniciar as filmagens?",
            "professorNotes": "Ao assistir Baile Perfumado, assista também como produtor. Procure enxergar tudo aquilo que foi necessário organizar para transformar uma história ambientada no sertão dos anos 1930 em um filme.\n\nObserve as locações, deslocamentos, figurinos, objetos de cena, veículos, cenários, preparação dos ambientes e quantidade de profissionais envolvidos na realização.\n\nPense sempre além daquilo que aparece na tela: quanto planejamento foi necessário para que aquela cena pudesse existir?\n\nO objetivo é compreender que a produção executiva transforma uma ideia cinematográfica em uma operação concreta, envolvendo pessoas, recursos, tempo, logística, orçamento e tomada de decisões.",
            "uploadedAt": "2026-10-05T14:47:08.267Z"
      },
      {
            "id": "ev-apostila-8-2",
            "slot": 2,
            "title": "Vídeo Extra 02: Produção Executiva e Planejamento - CINEMA, ASPIRINAS E URUBUS - M- 8.2",
            "videoUrl": "https://www.youtube.com/watch?v=jmXpJND14LI",
            "thumbnailUrl": "https://img.youtube.com/vi/jmXpJND14LI/hqdefault.jpg",
            "durationHours": 1,
            "durationMinutes": 35,
            "durationSeconds": 56,
            "totalDurationSeconds": 5756,
            "durationLabel": "01h 35m 56s",
            "description": "Observe:\nLocações:\nObserve os locais onde as cenas foram realizadas e pense nas dificuldades de produção de cada ambiente.\nDeslocamento da equipe:\nObserve que os personagens estão constantemente viajando. Imagine a logística necessária para transportar equipe e equipamentos.\nVeículos:\nO caminhão é praticamente um elemento central da narrativa. Pense nas necessidades de produção relacionadas a ele.\nObjetos de cena:\nObserve os objetos utilizados pelos personagens. Pergunte como foram selecionados, transportados e organizados.\nFigurino:\nObserve a continuidade das roupas durante as diferentes cenas.\nContinuidade:\nPreste atenção à posição dos objetos, roupas, veículos e personagens entre diferentes momentos.\nCondições naturais:\nObserve calor, poeira, paisagem, iluminação natural e estrada. Como esses fatores podem interferir no planejamento?\nTempo de filmagem:\nPergunte: quanto tempo uma equipe precisaria permanecer em cada locação para realizar essas cenas?\nOrganização da equipe:\nImagine quais profissionais precisariam estar presentes para que cada sequência pudesse ser realizada.\nOrçamento:\nPense em quais elementos provavelmente representam custos: transporte, alimentação, hospedagem, equipamentos, equipe, veículos, locações e produção de arte.",
            "professorNotes": "Ao assistir Cinema, Aspirinas e Urubus, observe o filme pensando como produtor. Não se concentre somente nos personagens e na história. Procure imaginar tudo aquilo que foi necessário para que cada cena pudesse existir.\n\nObserve as locações, deslocamentos, veículos, figurinos, objetos de cena, elenco, equipe e as características do ambiente. Pense nas dificuldades que uma produção enfrenta quando trabalha em regiões afastadas, com grandes deslocamentos e condições específicas de clima e espaço.\n\nO exercício é aprender a olhar para uma cena pronta e perguntar: “O que foi necessário organizar para que esta cena pudesse ser filmada?”\n\nUm produtor precisa aprender a enxergar aquilo que o espectador normalmente não percebe.",
            "uploadedAt": "2026-10-05T14:47:08.267Z"
      }
],
    sections: [
      {
        id: 'sec-8-1',
        title: '1. A Ordem do Dia (Call Sheet)',
        subtitle: 'O documento sagrado de toda diária de filmagem',
        contentMarkdown: `A Ordem do Dia (ODD) enviada na véspera de cada diária é o mapa operacional que governa o set:
* Horário de chamada (call time) individual para cada departamento e ator.
* Endereço exato da locação com pontos de referência e estacionamento.
* Sequência cronológica das cenas a serem filmadas com indicação de páginas de roteiro.
* Previsão meteorológica e planos de contingência para chuva (Cena cover ou locação alternativa).
* Cardápio e horário impreterível de alimentação da equipe.`,
        tonyNotes:
          'Equipe bem alimentada e com horários respeitados faz um filme dez vezes melhor do que equipe exausta e faminta.',
      },
      {
        id: 'sec-8-2',
        title: '2. Orçamento Básico e Plano B',
        subtitle: 'Como gerenciar recursos sem comprometer a integridade da obra',
        contentMarkdown: `Um orçamento independente honesto contempla:
1. **Desenvolvimento**: Registro de roteiro, assessoria jurídica.
2. **Produção**: Cachês de equipe e elenco, alimentação, transporte, locações, seguro e aluguel de equipamentos essenciais.
3. **Pós-Produção**: Edição, correção de cor, sound design, trilha e cópia mestre DCP.
4. **Reserva de Contingência**: Pelo menos 10% do total reservado para imprevistos inevitáveis.`,
        tonyNotes:
          'Se você não tem plano B no cinema, você não tem nem sequer um plano A funcional.',
      },
    ],
    quizQuestions: [
      {
        id: 'quiz-8-1',
        questionNumber: 1,
        prompt: 'Qual é a função primária de uma "Ordem do Dia" (Call Sheet) no planejamento de produção?',
        options: [
          'Divulgar o trailer do filme nas redes sociais.',
          'Organizar detalhadamente os horários de chamada de cada profissional, a lista de cenas do dia, a locação e a logística da diária.',
          'Pagar o cachê dos atores antecipadamente.',
          'Definir quais festivais o filme irá se inscrever no ano seguinte.',
        ],
        correctOptionIndex: 1,
        explanation:
          'Correto! A Ordem do Dia é o instrumento de gestão operacional indispensável para coordenar a diária de gravação.',
      },
      {
        id: 'quiz-8-2',
        questionNumber: 2,
        prompt: 'Por que todo orçamento de produção audiovisual deve conter uma margem de contingência (geralmente entre 10% e 15%)?',
        options: [
          'Para pagar gorjetas extras para os garçons do festival.',
          'Para absorver imprevistos reais como mudanças climáticas, quebras de equipamento ou necessidades de regravação.',
          'Para comprar roupas caras para o diretor usar nas entrevistas.',
          'Para pagar multas de trânsito dos motoristas.',
        ],
        correctOptionIndex: 1,
        explanation:
          'Exato! O set de cinema é sujeito a variáveis incontroláveis e a margem de contingência assegura a conclusão do projeto.',
      },
      {
        id: 'quiz-8-3',
        questionNumber: 3,
        prompt: 'O que deve ser priorizado pelo produtor executivo na condução de um set de filmagem ético?',
        options: [
          'Prolongar as jornadas por 18 horas diárias sem pausa para refeições a fim de economizar dinheiro.',
          'Segurança física de todos, alimentação adequada, respeito aos descansos e cumprimento dos acordos contratuais.',
          'Gastar todo o orçamento apenas nos figurinos dos protagonistas.',
          'Dispensar o uso de contratos de autorização de imagem.',
        ],
        correctOptionIndex: 1,
        explanation:
          'Perfeito! A ética no trabalho audiovisual garante a integridade humana e a reputação profissional de toda a produção.',
      },
      {
        id: 'quiz-8-4',
        questionNumber: 4,
        prompt: 'Por que o plano de filmagem quase nunca segue a ordem cronológica do roteiro?',
        options: [
          'Porque os atores gostam de se confundir durante as falas.',
          'Porque a produção agrupa as cenas por locação, iluminação, disponibilidade de elenco e clima para otimizar custos e tempo.',
          'Porque a câmera digital só grava de trás para frente.',
          'Porque os festivais exigem que os filmes sejam rodados em ordem inversa.',
        ],
        correctOptionIndex: 1,
        explanation:
          'Correto! O plano de filmagem (plano de diárias) maximiza o uso de cada cenário e elenco, gravando todas as cenas da mesma locação juntas.',
      },
      {
        id: 'quiz-8-5',
        questionNumber: 5,
        prompt: 'Qual é o risco jurídico de rodar um curta-metragem sem o "Termo de Autorização de Uso de Imagem e Voz" assinado pelos atores?',
        options: [
          'A câmera perde a garantia de fábrica.',
          'O filme fica judicialmente impedido de ser exibido em festivais, cinemas, TVs ou streaming por violação de direitos de imagem.',
          'O diretor é obrigado a trocar a cor do cartaz.',
          'Nenhum, pois a presença física no set substitui qualquer documento legal.',
        ],
        correctOptionIndex: 1,
        explanation:
          'Exato! A autorização de imagem é documento jurídico indispensável na cadeia de direitos (chain of title) de qualquer obra audiovisual.',
      },
    ],
  },
  {
    id: 'apostila-9',
    moduleId: 9,
    number: 9,
    title: 'Apostila 09: Distribuição, Festivais e Mercado Audiovisual',
    description:
      'O ciclo de vida do curta-metragem após a finalização: montagem do press-kit, loglines atraentes, stills de alta resolução, trailer/teaser e inscrições no circuito de festivais.',
    pagesCount: 4,
    pdfUrl: '/materiais/cinelab-apostila-09.pdf',
    coverUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=600&q=80',
    fileSizeMb: 19.8,
    extraVideos: [
      {
            "id": "ev-apostila-9-1",
            "slot": 1,
            "title": "Vídeo Extra 01: Distribuição, Festivais e Mercado Audiovisual - QUE HORAS ELA VOLTA? - M- 9.1",
            "videoUrl": "https://www.youtube.com/watch?v=Ks9VIZejfw8",
            "thumbnailUrl": "https://img.youtube.com/vi/Ks9VIZejfw8/hqdefault.jpg",
            "durationHours": 1,
            "durationMinutes": 51,
            "durationSeconds": 40,
            "totalDurationSeconds": 6700,
            "durationLabel": "01h 51m 40s",
            "description": "Observe:\nQual é o público potencial do filme?\nQue características da história podem despertar interesse fora do Brasil?\nComo o tema brasileiro pode ser compreendido por espectadores de outros países?\nPor que um festival internacional pode ser importante para a carreira de um filme?\nComo uma premiação pode aumentar o interesse de distribuidores?\nO que pode fazer um filme independente chamar atenção do mercado?\nObserve a diferença entre produzir um filme e conseguir fazê-lo chegar ao público.\nPesquise depois da sessão quais festivais o filme frequentou e quais prêmios recebeu.\nPesquise em quantos países o filme foi lançado.\nCompare o mercado nacional com o mercado internacional da obra.",
            "professorNotes": "“Ao assistir a Que Horas Ela Volta?, você não deve olhar apenas para a história. Pense no filme como um produto audiovisual que precisou encontrar seu público. Observe como uma obra brasileira, com uma história profundamente ligada à realidade do país, conseguiu ultrapassar as fronteiras nacionais por meio dos festivais, das premiações e da distribuição internacional.”\n\nO objetivo é compreender que produzir um bom filme é apenas uma etapa. Depois da produção, é necessário pensar em onde o filme será exibido, para quem será apresentado, quais festivais podem recebê-lo, como será vendido e como poderá alcançar outros mercados.",
            "uploadedAt": "2026-10-05T14:47:08.269Z"
      },
      {
            "id": "ev-apostila-9-2",
            "slot": 2,
            "title": "Vídeo Extra 02: Distribuição, Festivais e Mercado Audiovisual - COMO FUNCIONA A DISTRIBUIÇÃO DE UM FILME (Insight) - M- 9.2",
            "videoUrl": "https://www.youtube.com/watch?v=misa0VVsNaM",
            "thumbnailUrl": "https://img.youtube.com/vi/misa0VVsNaM/hqdefault.jpg",
            "durationHours": 0,
            "durationMinutes": 13,
            "durationSeconds": 25,
            "totalDurationSeconds": 805,
            "durationLabel": "00h 13m 25s",
            "description": "Observe:\nPrimeiros passos para distribuir:\nAs recomendações das representantes da Olhar Distribuição sobre o que fazer quando se tem um filme pronto (ou em desenvolvimento).\n\nA importância de pesquisar mercados e festivais que acontecem dentro de eventos de cinema pelo país.\n\nEstratégia de festivais como porta de entrada:\nComo o vídeo explica que festivais funcionam como vitrine para contatos com distribuidoras, programadores e compradores.\nA ideia de escolher festivais de forma estratégica (perfil do filme, público, premiação, mercado).\n\nRelação entre realizador e distribuidora:\nO que uma distribuidora espera do filme e do produtor (material de divulgação, trailer, stills, sinopse, ficha técnica).\nComo se dá a negociação de janelas de exibição (cinema, TV, streaming, VoD) e a divisão de receitas.",
            "professorNotes": "Observe:\nComo um realizador deve pensar a distribuição desde o início do projeto. A orientação é que o aluno assista como se fosse um produtor/distribuidor, anotando passos, estratégias e erros comuns que podem impedir o filme de circular.",
            "uploadedAt": "2026-10-05T14:47:08.269Z"
      }
],
    sections: [
      {
        id: 'sec-9-1',
        title: '1. O Kit de Imprensa (Electronic Press Kit - EPK)',
        subtitle: 'As ferramentas visuais e textuais para vender sua obra',
        contentMarkdown: `Um press-kit profissional deve conter obrigatoriamente:
* **Ficha Técnica Completa**: Direção, roteiro, elenco principal, direção de fotografia, arte, som e produção.
* **Logline (1-2 linhas)** e **Sinopse Curta (3-5 linhas)** sem entregar o final.
* **Release de Imprensa**: Texto jornalístico apresentando a relevância cultural ou temática do curta.
* **Cartaz Oficial em Alta Resolução (300 DPI)** e formato vertical (2:3).
* **3 a 5 Stills Oficiais do Filme**: Imagens congeladas de alta qualidade artística dos momentos-chave da narrativa.
* **Trailer / Teaser de 30 a 60 segundos**.`,
        tonyNotes:
          'Muitos curadores de festivais decidem se assistirão ao seu filme pela qualidade do still e pela força da logline.',
      },
      {
        id: 'sec-9-2',
        title: '2. Estratégia de Janelas de Exibição e Festivais',
        subtitle: 'A regra de ouro da Estreia Mundial (World Premiere)',
        contentMarkdown: `Não cometa o erro de postar seu curta finalizado no YouTube no dia seguinte à montagem se o seu objetivo é o circuito de festivais!
A maioria dos festivais de ponta (Gramado, Tiradentes, Berlim, Clermont-Ferrand) exige **inédito / estreia regional ou mundial**. Traçar um calendário de 12 a 18 meses para festivais antes de liberar a obra para visualização pública online é o caminho padrão da indústria.`,
        tonyNotes:
          'Proteja o ineditismo do seu filme até que ele complete sua jornada nas telas dos cinemas e festivais.',
      },
    ],
    quizQuestions: [
      {
        id: 'quiz-9-1',
        questionNumber: 1,
        prompt: 'Por que não se deve disponibilizar publicamente na internet um curta-metragem logo após sua conclusão se o objetivo for concorrer a festivais de cinema?',
        options: [
          'Porque a internet reduz a resolução do arquivo para sempre.',
          'Porque os principais festivais nacionais e internacionais exigem ineditismo (estreia mundial ou nacional) e desclassificam obras disponíveis publicamente.',
          'Porque o diretor de cinema perde seus direitos autorais se o vídeo for visto online.',
          'Porque os atores não podem ser vistos na internet por contrato.',
        ],
        correctOptionIndex: 1,
        explanation:
          'Correto! O ineditismo é pré-requisito rigoroso nos editais e seleções dos mais prestigiados festivais de cinema.',
      },
      {
        id: 'quiz-9-2',
        questionNumber: 2,
        prompt: 'O que são os "stills" de um filme dentro do kit de divulgação (press-kit)?',
        options: [
          'Fotografias da equipe comendo no intervalo.',
          'Fotogramas congelados ou fotos de cena em alta resolução que capturam o clima visual e os momentos dramáticos da obra.',
          'Os recibos fiscais dos equipamentos de filmagem.',
          'A lista telefônica dos patrocinadores.',
        ],
        correctOptionIndex: 1,
        explanation:
          'Exato! Stills são as imagens de divulgação oficiais utilizadas por catálogos de festivais, revistas e jornais.',
      },
      {
        id: 'quiz-9-3',
        questionNumber: 3,
        prompt: 'Qual a extensão e o objetivo ideal de uma logline para apresentação em catálogos de mercado e plataformas como FilmFreeway?',
        options: [
          'Um texto de 10 páginas contando o final do filme em detalhes.',
          'Uma a duas frases concisas revelando o protagonista, o incidente incitante e o conflito central com senso de urgência.',
          'Apenas o nome do diretor e o custo do filme.',
          'Um poema abstrato que não revela nada sobre a história.',
        ],
        correctOptionIndex: 1,
        explanation:
          'Perfeito! A logline deve despertar o interesse imediato do curador em apenas uma ou duas frases magnéticas.',
      },
      {
        id: 'quiz-9-4',
        questionNumber: 4,
        prompt: 'O que é um "DCP" (Digital Cinema Package) e qual sua função técnica na exibição cinematográfica?',
        options: [
          'Um programa de computador para editar fotos de casamento.',
          'O padrão mundial da indústria para armazenamento e projeção digital de filmes em alta fidelidade e som multicanal 5.1/7.1 nas salas de cinema.',
          'Um tipo de cabo de tomada usado exclusivamente na Europa.',
          'O crachá de identificação usado pelos diretores de cinema.',
        ],
        correctOptionIndex: 1,
        explanation:
          'Correto! O DCP é o pacote digital padronizado DCI que garante que o filme seja projetado em qualquer sala de cinema do mundo com máxima fidelidade técnica.',
      },
      {
        id: 'quiz-9-5',
        questionNumber: 5,
        prompt: 'Qual é o papel estratégico de um agente de vendas (Sales Agent) no circuito internacional de cinema?',
        options: [
          'Vender pipoca e refrigerante na bomboniere dos cinemas.',
          'Negociar os direitos de exibição e licenciamento territorial do filme com distribuidoras, TVs e plataformas de streaming globais.',
          'Comprar as passagens de avião para os atores passearem.',
          'Cobrar ingressos na entrada dos festivais.',
        ],
        correctOptionIndex: 1,
        explanation:
          'Exato! O agente de vendas representa a obra comercialmente em mercados internacionais (como Cannes Marché du Film e EFM Berlim), buscando compradores territoriais.',
      },
    ],
  },
  {
    id: 'apostila-10',
    moduleId: 10,
    number: 10,
    title: 'Apostila 10: Projeto Final – Curta-Metragem',
    description:
      'A consolidação de todas as etapas: o guia passo a passo para a realização do seu curta de 1 a 5 minutos, do roteiro à entrega final, autoavaliação e certificação profissional.',
    pagesCount: 4,
    pdfUrl: '/materiais/cinelab-apostila-10.pdf',
    coverUrl: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=600&q=80',
    fileSizeMb: 23.5,
    extraVideos: [
      {
            "id": "ev-apostila-10-1",
            "slot": 1,
            "title": "Vídeo Extra 01: Projeto Final - NAPO (Curta-Metragem) - M- 10.1",
            "videoUrl": "https://www.youtube.com/watch?v=k1vCrsZ80M4",
            "thumbnailUrl": "https://img.youtube.com/vi/k1vCrsZ80M4/hqdefault.jpg",
            "durationHours": 0,
            "durationMinutes": 16,
            "durationSeconds": 40,
            "totalDurationSeconds": 1000,
            "durationLabel": "00h 16m 40s",
            "description": "Observe:\nA narrativa visual completa de um curta-metragem multipremiado.\nComo o roteiro, a direção de arte, a trilha sonora e a animação se unem para transmitir uma história sensível sem a necessidade de diálogos falados.\nAnalise o arco dramático, a relação entre os personagens e o impacto emocional do clímax.",
            "professorNotes": "Ao assistir ao curta-metragem Napo (dirigido por Gustavo Ribeiro e produzido pela Miralumo Films), o aluno deve analisar a síntese de todas as etapas de realização cinematográfica aprendidas ao longo do curso. Repare na excelência técnica, na precisão da decupagem e na força de uma ideia concisa executada com rigor e sensibilidade artística.",
            "uploadedAt": "2026-10-05T14:47:08.270Z"
      },
      {
            "id": "ev-apostila-10-2",
            "slot": 2,
            "title": "Vídeo Extra 02: Projeto Final - HOJE EU QUERO VOLTAR SOZINHO (Curta-Metragem) - M- 10.2",
            "videoUrl": "https://www.youtube.com/watch?v=mQuoIuLUxmo",
            "thumbnailUrl": "https://img.youtube.com/vi/mQuoIuLUxmo/hqdefault.jpg",
            "durationHours": 0,
            "durationMinutes": 17,
            "durationSeconds": 15,
            "totalDurationSeconds": 1035,
            "durationLabel": "00h 17m 15s",
            "description": "Observe:\nA estrutura dramática de um curta-metragem ficcional que conquistou dezenas de prêmios e originou um longa-metragem de sucesso internacional.\nPreste atenção na direção de atores, na naturalidade dos diálogos, na sutileza da fotografia e no planejamento de produção.",
            "professorNotes": "Ao assistir ao curta-metragem Eu Não Quero Voltar Sozinho / Hoje Eu Quero Voltar Sozinho (Dir. Daniel Ribeiro), observe como um roteiro focado em conflitos humanos genuínos, aliado a uma produção eficiente e direção precisa, pode criar um curta-metragem de enorme alcance e reconhecimento.",
            "uploadedAt": "2026-10-05T14:47:08.270Z"
      }
],
    sections: [
      {
        id: 'sec-10-1',
        title: '1. O Escopo do Curta de 1 a 5 Minutos',
        subtitle: 'A força da síntese, economia e rigor estético',
        contentMarkdown: `Um curta-metragem de 1 a 5 minutos não é um longa-metragem resumido; é uma **forma de arte autônoma**, com suas próprias regras de intensidade.
* Concentre-se em **uma única situação dramática**, uma ideia potente ou uma revelação emocional.
* Limite o número de atores (1 a 3 personagens) e locações (1 ou 2 locações bem aproveitadas).
* Cada segundo de tela deve justificar sua existência.`,
        tonyNotes:
          'Mais vale um curta de 2 minutos impecável e inesquecível do que um curta de 20 minutos arrastado e disperso.',
      },
      {
        id: 'sec-10-2',
        title: '2. A Reflexão de Processo e o Certificado Vitalício',
        subtitle: 'A maturidade do cineasta em avaliar sua própria criação',
        contentMarkdown: `Ao finalizar seu filme, todo cineasta maduro precisa responder a três perguntas sinceras:
1. **O que funcionou exatamente como planejado?**
2. **O que faria de forma diferente se pudesse refilmar amanhã?**
3. **Qual aprendizado técnico e poético desejo aprofundar na minha próxima produção?**

Ao completar esta etapa e atingir a média mínima de 7,0 nas avaliações, o aluno recebe o **Certificado Profissional do CINELAB** e sua matrícula converte-se em **Acesso Vitalício**, funcionando como biblioteca permanente de consulta.`,
        tonyNotes:
          'Um filme nunca está pronto; ele é abandonado pelo realizador no momento em que precisa caminhar pelo mundo por conta própria.',
      },
    ],
    quizQuestions: [
      {
        id: 'quiz-10-1',
        questionNumber: 1,
        prompt: 'Qual é a principal recomendação dramática para a realização de um curta-metragem de alta qualidade de 1 a 5 minutos?',
        options: [
          'Tentar contar a biografia completa de um personagem ao longo de 50 anos de vida.',
          'Focar em uma única situação dramática potente, com poucos personagens e locações controladas, extraindo o máximo de tensão e verdade visual.',
          'Contratar 30 atores figurantes para preencher a tela.',
          'Filmar sem roteiro e decidir a história na pós-produção.',
        ],
        correctOptionIndex: 1,
        explanation:
          'Correto! A economia de recursos e o foco dramático afiado são as chaves mestras de um curta de impacto internacional.',
      },
      {
        id: 'quiz-10-2',
        questionNumber: 2,
        prompt: 'Após a conclusão de todas as 10 etapas e aprovação nas avaliações do CINELAB, qual o status concedido à matrícula do aluno?',
        options: [
          'Acesso cancelado e bloqueado após 30 dias.',
          'Acesso vitalício irrestrito a todas as apostilas, vídeos, quizzes, filmes indicados e bônus, funcionando como biblioteca permanente de pesquisa.',
          'O aluno é obrigado a refazer todas as provas a cada semestre.',
          'Apenas o certificado pode ser impresso, sem acesso aos materiais didáticos.',
        ],
        correctOptionIndex: 1,
        explanation:
          'Exato! A matrícula torna-se vitalícia, garantindo que o acervo pedagógico do CINELAB permaneça como fonte permanente de consulta profissional.',
      },
      {
        id: 'quiz-10-3',
        questionNumber: 3,
        prompt: 'Por que o exercício da "Reflexão de Processo" pós-filmagem é considerado fundamental para a formação de um novo cineasta?',
        options: [
          'Para encontrar culpados entre a equipe de filmagem.',
          'Para consolidar o aprendizado prático identificando acertos, erros corrigíveis e maturidade para o próximo projeto autoral.',
          'Para preencher burocracia sem valor prático.',
          'Para pedir reembolso aos fornecedores.',
        ],
        correctOptionIndex: 1,
        explanation:
          'Perfeito! A reflexão honesta sobre o próprio trabalho é o que transforma o realizador iniciante em um autor autêntico e consciente.',
      },
      {
        id: 'quiz-10-4',
        questionNumber: 4,
        prompt: 'Ao realizar a montagem de um curta-metragem autoral, como o realizador deve calibrar a duração dos planos para valorizar a dramaturgia?',
        options: [
          'Cortar obrigatoriamente a cada 0.5 segundo para parecer um comercial acelerado.',
          'Respeitar a respiração interna da cena, dando tempo para o olhar do ator ecoar sem estender planos que já esgotaram sua carga informativa ou dramática.',
          'Nunca cortar o plano sob hipótese alguma.',
          'Deixar a tela preta durante a maior parte do curta.',
        ],
        correctOptionIndex: 1,
        explanation:
          'Correto! O ritmo na montagem não significa velocidade cega, mas precisão cirúrgica no tempo necessário para cada plano comover e comunicar.',
      },
      {
        id: 'quiz-10-5',
        questionNumber: 5,
        prompt: 'Qual é a regra padrão da indústria para salvaguarda e backup de dados digitais das diárias (Regra 3-2-1)?',
        options: [
          'Deixar todos os arquivos apenas no cartão de memória da câmera.',
          'Manter 3 cópias do material, em pelo menos 2 tipos de mídias/dispositivos diferentes, com 1 cópia armazenada em local físico ou nuvem externa segura.',
          'Postar todos os vídeos brutos sem edição no TikTok.',
          'Formatar o disco rígido imediatamente após exportar o primeiro arquivo.',
        ],
        correctOptionIndex: 1,
        explanation:
          'Exato! A regra 3-2-1 é o protocolo universal de segurança de dados (DIT) que protege o filme contra perdas catastróficas de diárias.',
      },
    ],
  },
];

// 4. OS DOIS BÔNUS PEDAGÓGICOS (Liberados junto com a APOSTILA 03)
export const pedagogicalBonusApostilas: BonusApostila[] = [
  {
    id: 'bonus-01',
    number: 1,
    title: 'Glossário Completo de Planos',
    subtitle: 'Guia Permanente de Consulta Técnica e Decupagem Cinematográfica',
    description:
      'Guia permanente de consulta técnica para decupagem cinematográfica, escalas de planos e movimentos de câmera.',
    summary:
      'Guia permanente de consulta técnica para decupagem cinematográfica, escalas de planos e movimentos de câmera.',
    pagesCount: 30,
    totalPages: 30,
    pdfUrl: '/materiais/cinelab-bonus-01-glossario-planos.pdf',
    coverUrl: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=600&q=80',
    unlockedByDefault: false,
    requiredModule: 3,
    extraVideos: [
    {
        "id": "ev-bonus-01-1",
        "slot": 1,
        "title": "Vídeo Extra 01: Estudo Dirigido & Análise Prática – Bônus 01",
        "description": "Análise técnica e decupagem comentada pelo Professor Cineasta Tony de Luc para aprofundar os conceitos teóricos desta apostila.",
        "videoUrl": "/videos/cinelab-intro-apresentacao.mp4",
        "thumbnailUrl": "https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=800&q=80",
        "durationMinutes": 18,
        "durationLabel": "00h 18m 00s",
        "professorNotes": "",
        "uploadedAt": "2026-09-29T13:12:25.294Z",
        "durationHours": 0,
        "durationSeconds": 0,
        "totalDurationSeconds": 1080
    },
    {
        "id": "ev-bonus-01-2",
        "slot": 2,
        "title": "Vídeo Extra 02: Estudo de Caso & Exercício Técnico – Bônus 01",
        "description": "Demonstração em set de filmagem com resolução prática de problemas de decupagem e linguagem cinematográfica.",
        "videoUrl": "",
        "thumbnailUrl": "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=800&q=80",
        "durationMinutes": 24,
        "durationLabel": "00h 24m 00s",
        "professorNotes": "",
        "uploadedAt": "2026-09-29T13:12:25.294Z",
        "durationHours": 0,
        "durationSeconds": 0,
        "totalDurationSeconds": 1440
    }
],
    notes:
      'Liberado automaticamente a partir da Etapa 03 (junto com a Apostila 03). Acesso permanente mesmo após a conclusão do curso.',
    termsGlossary: [
      {
        term: 'Grande Plano Geral (GPG)',
        definition: 'Enquadramento de escala máxima onde o cenário domina amplamente a presença humana.',
        application: 'Estabelece a pequenez do homem diante da natureza ou o desamparo em cidades monumentais.',
      },
      {
        term: 'Plano Geral (PG)',
        definition: 'Enquadra o sujeito de corpo inteiro dos pés à cabeça, com espaço ao redor.',
        application: 'Apresenta a postura física do personagem e situa as ações no ambiente imediato.',
      },
      {
        term: 'Plano Americano (PA)',
        definition: 'Corte efetuado na linha dos joelhos até o topo da cabeça.',
        application: 'Equilíbrio ideal entre movimento de corpo, gesticulação e diálogos em grupo.',
      },
      {
        term: 'Plano Médio (PM)',
        definition: 'Enquadra da cintura para cima.',
        application: 'O plano padrão para conversas cotidianas, entrevistas e relações interpessoais.',
      },
      {
        term: 'Primeiro Plano (PP / Close-Up)',
        definition: 'Corte dos ombros ou peito para cima, preenchendo a tela com o rosto.',
        application: 'Intensidade dramática máxima, revelação de emoções íntimas e foco absoluto na reação.',
      },
      {
        term: 'Plano Detalhe (PD)',
        definition: 'Isolamento de um objeto ou parte anatômica específica (um anel, uma arma, uma lágrima).',
        application: 'Direciona a atenção do público para uma pista essencial que define os rumos da trama.',
      },
      {
        term: 'Plongée (Ângulo Superior / Picado)',
        definition: 'Câmera posicionada acima do sujeito apontando para baixo.',
        application: 'Confere sensação de fragilidade, submissão, inferioridade ou observação distante.',
      },
      {
        term: 'Contra-Plongée (Ângulo Inferior / Contrapicado)',
        definition: 'Câmera posicionada abaixo do sujeito apontando para cima.',
        application: 'Enobrece o personagem, confere autoridade, ameaça, grandiosidade ou poder heroico.',
      },
      {
        term: 'Ângulo Holandês (Dutch Angle / Tilted)',
        definition: 'Câmera inclinada lateralmente no eixo horizontal.',
        application: 'Gera desorientação psicológica, delírio, embriaguez, perigo iminente ou loucura.',
      },
      {
        term: 'Travelling',
        definition: 'Câmera em deslocamento físico sobre trilhos, rodas ou estabilizador.',
        application: 'Acompanha o personagem em caminhada ou explora a profundidade do espaço em movimento suave.',
      },
      {
        term: 'Panorâmica (Pan)',
        definition: 'Movimento horizontal de rotação da câmera sobre o próprio eixo do tripé.',
        application: 'Varre o horizonte ou conecta dois personagens sem necessidade de corte.',
      },
      {
        term: 'Plano-Sequência',
        definition: 'Uma cena inteira ou sequência complexa filmada em tomada única contínua sem nenhum corte.',
        application: 'Preserva a veracidade do tempo real e cria imersão visceral para o espectador.',
      },
      {
        term: 'Eixo de 180 Graus',
        definition: 'Linha imaginária entre dois interlocutores que a câmera não deve cruzar.',
        application: 'Garante a continuidade espacial da linha do olhar entre os personagens no campo e contracampo.',
      },
    ],
  },
  {
    id: 'bonus-02',
    number: 2,
    title: 'Glossário Completo de Roteiro',
    subtitle: 'Guia Permanente de Consulta Dramatúrgica e Estruturação de Histórias',
    description:
      'Guia permanente de consulta dramatúrgica: da criação de premissa, storyline e sinopse à escaleta e roteiro final.',
    summary:
      'Guia permanente de consulta dramatúrgica: da criação de premissa, storyline e sinopse à escaleta e roteiro final.',
    pagesCount: 29,
    totalPages: 29,
    pdfUrl: '/materiais/cinelab-bonus-02-glossario-roteiro.pdf',
    coverUrl: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=600&q=80',
    unlockedByDefault: false,
    requiredModule: 3,
    extraVideos: [
    {
        "id": "ev-bonus-02-1",
        "slot": 1,
        "title": "Vídeo Extra 01: Estudo Dirigido & Análise Prática – Bônus 02",
        "description": "Análise técnica e decupagem comentada pelo Professor Cineasta Tony de Luc para aprofundar os conceitos teóricos desta apostila.",
        "videoUrl": "/videos/cinelab-intro-apresentacao.mp4",
        "thumbnailUrl": "https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=800&q=80",
        "durationMinutes": 18,
        "durationLabel": "00h 18m 00s",
        "professorNotes": "",
        "uploadedAt": "2026-09-29T13:12:25.299Z",
        "durationHours": 0,
        "durationSeconds": 0,
        "totalDurationSeconds": 1080
    },
    {
        "id": "ev-bonus-02-2",
        "slot": 2,
        "title": "Vídeo Extra 02: Estudo de Caso & Exercício Técnico – Bônus 02",
        "description": "Demonstração em set de filmagem com resolução prática de problemas de decupagem e linguagem cinematográfica.",
        "videoUrl": "",
        "thumbnailUrl": "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=800&q=80",
        "durationMinutes": 24,
        "durationLabel": "00h 24m 00s",
        "professorNotes": "",
        "uploadedAt": "2026-09-29T13:12:25.299Z",
        "durationHours": 0,
        "durationSeconds": 0,
        "totalDurationSeconds": 1440
    }
],
    notes:
      'Liberado automaticamente a partir da Etapa 03 (junto com a Apostila 03). Acesso permanente mesmo após a conclusão do curso.',
    termsGlossary: [
      {
        term: 'Premissa / Ideia Central',
        definition: 'A proposição fundamental que impulsiona a narrativa: e se acontecesse X?',
        application: 'O ponto de partida para qualquer desenvolvimento criativo autoral.',
      },
      {
        term: 'Storyline',
        definition: 'A síntese de até 5 linhas contendo: apresentação, conflito detonador e desfecho básico.',
        application: 'Utilizado para avaliar rapidamente se a ideia possui sustentação dramática.',
      },
      {
        term: 'Logline',
        definition: 'Frase de impacto de 1 a 2 linhas com protagonista, gancho, antagonismo e urgência.',
        application: 'Cartão de visitas para venda de projetos a produtoras, canais e inscrições.',
      },
      {
        term: 'Sinopse',
        definition: 'A história do filme resumida de 1 a 2 páginas, escrita no presente do indicativo.',
        application: 'Exigência fundamental de editais públicos (Ancine, Paulo Gustavo, Aldir Blanc) e festivais.',
      },
      {
        term: 'Argumento / Tratamento',
        definition: 'A narrativa cinematográfica em prosa fluida, descrevendo visualmente o filme do início ao fim.',
        application: 'Etapa anterior aos diálogos, onde se testa o ritmo e a consistência visual das ações.',
      },
      {
        term: 'Outline / Beat Sheet',
        definition: 'Lista dos principais acontecimentos emocionais e batidas dramáticas em sequência.',
        application: 'Garante que os arcos de tensão não enfraqueçam entre o início e o clímax.',
      },
      {
        term: 'Escaleta',
        definition: 'A lista numerada de todas as cenas do filme com cabeçalho e resumo estrito da ação.',
        application: 'O mapa operacional que antecede a redação final do roteiro.',
      },
      {
        term: 'Incidente Incitante (Catalisador)',
        definition: 'O acontecimento que quebra a normalidade inicial da vida do protagonista.',
        application: 'Força o personagem a sair de sua zona de conforto e iniciar sua jornada dramática.',
      },
      {
        term: 'Ponto de Virada (Plot Point 1 & 2)',
        definition: 'Reviravolta estrutural irreversível que empurra a história para um novo ato.',
        application: 'Muda o rumo das ações e eleva o nível das apostas emocionais do protagonista.',
      },
      {
        term: 'Ponto Central (Midpoint)',
        definition: 'Momento na metade exata da história onde o conflito passa de passivo a ativo.',
        application: 'O protagonista deixa de apenas reagir e passa a tomar decisões conscientes que precipitam o clímax.',
      },
      {
        term: 'Clímax',
        definition: 'O ponto de tensão máxima onde o conflito central é resolvido de forma definitiva.',
        application: 'A cena decisiva que responde se o protagonista alcança ou não seu objetivo primordial.',
      },
      {
        term: 'Subtexto',
        definition: 'A intenção real, não dita expressamente, que transparece por trás dos diálogos e ações.',
        application: 'Confere humanidade, sofisticação e mistério psicológico aos personagens em cena.',
      },
    ],
  },
  {
    id: 'bonus-03',
    number: 3,
    title: 'Método de Análise Fílmica em 6 Camadas',
    subtitle: 'Guia Completo de Análise Crítica e Decupagem de Obras Audiovisuais',
    description:
      'A metodologia analítica do CINELAB em 6 camadas: Narrativa, Personagem, Espaço, Imagem (Fotografia), Som e Montagem para dissecar qualquer obra audiovisual como realizador.',
    summary:
      'A metodologia analítica do CINELAB em 6 camadas: Narrativa, Personagem, Espaço, Imagem (Fotografia), Som e Montagem para dissecar qualquer obra audiovisual como realizador.',
    pagesCount: 27,
    totalPages: 27,
    pdfUrl: '/materiais/cinelab-bonus-03-analise-filmica.pdf',
    coverUrl: 'https://images.unsplash.com/photo-1478720568477-152d9b164e26?auto=format&fit=crop&w=600&q=80',
    unlockedByDefault: false,
    requiredModule: 6,
    extraVideos: [
    {
        "id": "ev-bonus-03-1",
        "slot": 1,
        "title": "Vídeo Extra 01: Estudo Dirigido & Análise Prática – Bônus 03",
        "description": "Análise técnica e decupagem comentada pelo Professor Cineasta Tony de Luc para aprofundar os conceitos teóricos desta apostila.",
        "videoUrl": "/videos/cinelab-intro-apresentacao.mp4",
        "thumbnailUrl": "https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=800&q=80",
        "durationMinutes": 18,
        "durationLabel": "00h 18m 00s",
        "professorNotes": "",
        "uploadedAt": "2026-09-29T13:12:25.303Z",
        "durationHours": 0,
        "durationSeconds": 0,
        "totalDurationSeconds": 1080
    },
    {
        "id": "ev-bonus-03-2",
        "slot": 2,
        "title": "Vídeo Extra 02: Estudo de Caso & Exercício Técnico – Bônus 03",
        "description": "Demonstração em set de filmagem com resolução prática de problemas de decupagem e linguagem cinematográfica.",
        "videoUrl": "",
        "thumbnailUrl": "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=800&q=80",
        "durationMinutes": 24,
        "durationLabel": "00h 24m 00s",
        "professorNotes": "",
        "uploadedAt": "2026-09-29T13:12:25.303Z",
        "durationHours": 0,
        "durationSeconds": 0,
        "totalDurationSeconds": 1440
    }
],
    notes:
      'Apostila bônus especial com o método completo das 6 camadas para análise técnica e crítica de cinema.',
    termsGlossary: [
      {
        term: 'Camada Narrativa',
        definition: 'Investiga o esqueleto dramatúrgico: premissa, arcos de transformação, catalisador, clímax e resolução.',
        application: 'Identifica como o roteiro sustenta a tensão dramática e o envolvimento do espectador.',
      },
      {
        term: 'Camada de Personagem',
        definition: 'Examina a motivação consciente versus necessidade inconsciente, contradições e arcos evolutivos.',
        application: 'Permite criar figuras humanas verossímeis que geram empatia ou repulsa calculada.',
      },
      {
        term: 'Camada Espacial',
        definition: 'Analisa cenografia, arquitetura, enclausuramento ou amplitude dos espaços físicos.',
        application: 'O espaço deixa de ser fundo passivo e atua como extensão psicológica dos personagens.',
      },
      {
        term: 'Camada de Imagem',
        definition: 'Paleta cromática, razão de contraste, atmosfera de luz, distância focal e enquadramentos.',
        application: 'Define a assinatura visual da obra e orienta as emoções subconscientes do público.',
      },
      {
        term: 'Camada Sonora',
        definition: 'Equilíbrio entre sons diegéticos (ruídos de set), música e o uso expressivo do silêncio.',
        application: 'Cria imersão tridimensional e ancora a percepção emocional da cena.',
      },
      {
        term: 'Camada de Montagem',
        definition: 'Cadência métrica dos cortes, transições, associações intelectuais e elipses de tempo.',
        application: 'Dita a pulsação do filme, o ritmo respiratório do espectador e a montagem das ideias.',
      },
    ],
    fileSizeMb: 0.28,
  },
];

// 5. FILMES PARA ASSISTIR (Em cada módulo, com links e atividades de observação)
export const pedagogicalFilms: ModuleFilm[] = [
  {
    id: 'film-1',
    moduleId: 1,
    title: 'Ilha das Flores',
    director: 'Jorge Furtado',
    year: 1989,
    duration: '13 min',
    durationMinutes: 13,
    audioTrack: 'original_pt',
    audioTrackLabel: '🇧🇷 Áudio Original em Português',
    availableSubtitles: ['pt', 'en', 'es', 'fr'],
    availableDubbed: [],
    platform: 'Acervo Digital Aberto (Archive.org HD) / Casa de Cinema de POA',
    streamingPlatform: 'Arquivo de Vídeo Direto MP4 / YouTube Oficial',
    watchUrl: 'https://archive.org/embed/ilha_das_flores',
    streamingUrl: 'https://archive.org/download/ilha_das_flores/Video%20156.mp4',
    videoOptions: [
      {
        id: 'ilha-original',
        label: '🇧🇷 Áudio Original em Português (Archive.org HD) (13 min)',
        url: 'https://archive.org/embed/ilha_das_flores',
        duration: '13 min',
        durationMinutes: 13,
        platformName: 'Archive.org / Casa de Cinema de POA',
        badge: 'Áudio Original PT • 13 min',
        audioLang: 'pt',
        type: 'full_movie',
      },
      {
        id: 'ilha-english-sub',
        label: '🇺🇸 Isle of Flowers – English Subtitles (13 min)',
        url: 'https://www.youtube.com/watch?v=Kfk01rIe_sU',
        duration: '13 min',
        durationMinutes: 13,
        platformName: 'YouTube (English Subtitles)',
        badge: 'Legendas em Inglês • 13 min',
        subtitleLang: 'en',
        type: 'full_movie',
      },
      {
        id: 'ilha-direct-mp4',
        label: '🎞️ Arquivo Aberto em MP4 (13 min)',
        url: 'https://archive.org/download/ilha_das_flores/Video%20156.mp4',
        duration: '13 min',
        durationMinutes: 13,
        platformName: 'Acervo Archive.org MP4',
        badge: 'Arquivo MP4 • 13 min',
        audioLang: 'pt',
        type: 'full_movie',
      },
    ],
    whyWatch:
      'Considerado pela ABRACCINE o maior curta-metragem brasileiro de todos os tempos. Uma obra-prima da montagem e da relação entre texto e imagem.',
    whatToObserve:
      'Observe como imagem, narração, som e montagem constroem a narrativa satírica e política através de cortes rápidos de arquivo e narração enciclopédica.',
    observationActivity:
      'Anote como o diretor utiliza o conceito de "tomate" para conectar biologia, economia, desigualdade social e dignidade humana em apenas 13 minutos.',
  },
  {
    id: 'film-2',
    moduleId: 2,
    title: 'O Encouraçado Potemkin (Battleship Potemkin)',
    director: 'Sergei Eisenstein',
    year: 1925,
    duration: '74 min (Filme Completo) • 8 min (Cena da Escadaria)',
    durationMinutes: 74,
    audioTrack: 'mudo',
    audioTrackLabel: '🎼 Cinema Mudo • Trilha Sonora Orquestral',
    availableSubtitles: ['pt', 'en', 'es', 'fr'],
    platform: 'Domínio Público / Archive.org (Filme Completo HD)',
    streamingPlatform: 'YouTube 4K Restored',
    watchUrl: 'https://archive.org/embed/BattleshipPotemkin',
    streamingUrl: 'https://www.youtube.com/watch?v=x6a-3y6Orvw',
    videoOptions: [
      {
        id: 'potemkin-mosfilm',
        label: '🚢 Filme Completo Restaurado em 4K (74 min)',
        url: 'https://www.youtube.com/watch?v=x6a-3y6Orvw',
        duration: '74 min',
        durationMinutes: 74,
        platformName: 'YouTube 4K Restored',
        badge: 'Filme Completo • 4K • 74 min',
        subtitleLang: 'multi',
        type: 'full_movie',
      },
      {
        id: 'potemkin-archive',
        label: '🏛️ Versão Histórica no Archive.org (72 min)',
        url: 'https://archive.org/embed/BattleshipPotemkin',
        duration: '72 min',
        durationMinutes: 72,
        platformName: 'Domínio Público / Archive.org',
        badge: 'Archive.org • 72 min',
        type: 'full_movie',
      },
      {
        id: 'potemkin-steps-scene',
        label: '⚡ A Célebre Cena da Escadaria de Odessa em 4K (7:45 min)',
        url: 'https://www.youtube.com/watch?v=K1Vx3AOpVDo',
        duration: '7:45 min',
        durationMinutes: 8,
        platformName: 'YouTube 4K Remaster',
        badge: 'Cena da Escadaria • 7:45 min',
        type: 'scene',
      },
    ],
    whyWatch:
      'A obra fundadora da montagem cinematográfica moderna. O nascimento das teorias de justaposição, choque de ideias e ritmo visual.',
    whatToObserve:
      'Montagem, duração dos planos e construção de ritmo. Observe a famosa sequência da Escadaria de Odessa dissecando-a nas 6 camadas de análise fílmica.',
    observationActivity:
      'Identifique a dilatação do tempo cinematográfico: como uma descida que levaria 2 minutos no mundo real é estendida para mais de 7 minutos na montagem.',
  },
  {
    id: 'film-3',
    moduleId: 3,
    title: 'O Sanduíche',
    director: 'Jorge Furtado',
    year: 2000,
    duration: '13 min',
    durationMinutes: 13,
    audioTrack: 'original_pt',
    audioTrackLabel: '🇧🇷 Áudio Original em Português',
    availableSubtitles: ['pt', 'en', 'es', 'fr'],
    platform: 'Casa de Cinema de Porto Alegre (YouTube)',
    streamingPlatform: 'YouTube Oficial',
    watchUrl: 'https://www.youtube.com/watch?v=eqFx7VvxLi4',
    streamingUrl: 'https://www.youtube.com/watch?v=eqFx7VvxLi4',
    videoOptions: [
      {
        id: 'sanduiche-yt',
        label: '🥪 Curta-Metragem Completo (Casa de Cinema de POA) (13 min)',
        url: 'https://www.youtube.com/watch?v=eqFx7VvxLi4',
        duration: '13 min',
        durationMinutes: 13,
        platformName: 'YouTube Oficial',
        badge: 'Áudio Original PT • CC Disponível • 13 min',
        audioLang: 'pt',
        type: 'full_movie',
      },
    ],
    whyWatch:
      'Aula magistral de unidade de espaço, tempo, diálogos com subtexto denso e decupagem impecável em padrão de roteiro.',
    whatToObserve:
      'Diálogos cruzados, revelação gradual de informações ocultas e economia de elementos cênicos. A comida como catalisador de tensões amorosas.',
    observationActivity:
      'Mapeie o subtexto na conversa dos dois casais: como o que eles dizem superficialmente diverge do conflito real que os consome internamente.',
  },
  {
    id: 'film-4',
    moduleId: 4,
    title: 'Dona Cristina Perdeu a Memória',
    director: 'Ana Luiza Azevedo',
    year: 2002,
    duration: '13 min',
    durationMinutes: 13,
    audioTrack: 'original_pt',
    audioTrackLabel: '🇧🇷 Áudio Original em Português',
    availableSubtitles: ['pt', 'en', 'es', 'fr'],
    platform: 'Canal wocomoBRASIL / Casa de Cinema de POA (YouTube)',
    streamingPlatform: 'YouTube Oficial',
    watchUrl: 'https://www.youtube.com/watch?v=iawXU1Y8_TQ',
    streamingUrl: 'https://www.youtube.com/watch?v=iawXU1Y8_TQ',
    videoOptions: [
      {
        id: 'cristina-yt',
        label: '👵 Curta Completo HD (wocomoBRASIL) (13 min)',
        url: 'https://www.youtube.com/watch?v=iawXU1Y8_TQ',
        duration: '13 min',
        durationMinutes: 13,
        platformName: 'wocomoBRASIL / YouTube Oficial',
        badge: 'Áudio Original PT • Legendas Multilíngues • 13 min',
        audioLang: 'pt',
        type: 'full_movie',
      },
    ],
    whyWatch:
      'Uma aula de direção sensível de atores, com interação íntima entre um ator mirim estreante e uma atriz sênior consagrada.',
    whatToObserve:
      'O tom das atuações, as pausas, a modulação de voz, os olhares de cumplicidade e a sutileza na movimentação dos corpos em cena.',
    observationActivity:
      'Observe como a diretora trabalha os primeiros planos para registrar o nascimento da amizade e a troca de memórias sem cair no melodrama fácil.',
  },
  {
    id: 'film-5',
    moduleId: 5,
    title: 'A Noite dos Mortos-Vivos (Night of the Living Dead) – Versão Dublada',
    originalTitle: 'Night of the Living Dead (Dublagem Clássica em Português)',
    director: 'George A. Romero (Direção & Fotografia)',
    year: 1968,
    duration: '96 min',
    durationMinutes: 96,
    audioTrack: 'dublado_pt',
    audioTrackLabel: '🎙️ Filme Completo Dublado em Português (HD)',
    availableDubbed: ['pt'],
    availableSubtitles: ['pt', 'en', 'es', 'fr'],
    platform: 'YouTube Oficial (Filme Completo Dublado HD)',
    streamingPlatform: 'Diversão em Casa / YouTube Oficial',
    watchUrl: 'https://www.youtube.com/watch?v=ZbYJmYgrmrs',
    streamingUrl: 'https://www.youtube.com/watch?v=ZbYJmYgrmrs',
    videoOptions: [
      {
        id: 'notld-dublado-pt',
        label: '🎙️ Filme Completo Dublado em Português (HD) (96 min)',
        url: 'https://www.youtube.com/watch?v=ZbYJmYgrmrs',
        duration: '96 min',
        durationMinutes: 96,
        platformName: 'YouTube Oficial (Dublado PT-BR)',
        badge: '🎙️ Dublado em Português • 96 min',
        audioLang: 'pt',
        isDubbed: true,
        type: 'full_movie',
      },
      {
        id: 'notld-original-en',
        label: '🇺🇸 Original em Inglês com Legendas (Night of the Living Dead) (96 min)',
        url: 'https://www.youtube.com/watch?v=0k3y6y8Yy5I',
        duration: '96 min',
        durationMinutes: 96,
        platformName: 'YouTube Remastered (English Audio + CC)',
        badge: 'Áudio Original EN + Legendas',
        audioLang: 'en',
        subtitleLang: 'multi',
        type: 'full_movie',
      },
      {
        id: 'notld-archive-hd',
        label: '🏛️ Acervo Histórico em Alta Definição (Archive.org) (96 min)',
        url: 'https://archive.org/embed/night_of_the_living_dead',
        duration: '96 min',
        durationMinutes: 96,
        platformName: 'Domínio Público / Archive.org',
        badge: 'Archive.org 1080p',
        audioLang: 'en',
        type: 'full_movie',
      },
    ],
    whyWatch:
      'Obra-prima do cinema independente mundial com DUBLAGEM COMPLETA EM PORTUGUÊS. Realizada com orçamento ultrarreduzido em película 35mm P&B, é uma autêntica aula de Direção de Fotografia, alto contraste, luz e sombra (chiaroscuro) e iluminação de set prática.',
    whatToObserve:
      'A iluminação de alto contraste no ambiente fechado da casa; como luzes diretas de tungstênio desenham sombras expressionistas nos rostos; os ângulos dramáticos de câmera e a profundidade de campo obtida sem equipamentos milionários.',
    observationActivity:
      'Analise a cena em que os personagens protegem as portas e janelas: descreva como a luz corta a penumbra do cômodo e cria tensão psicológica sem necessidade de refletores sofisticados.',
  },
  {
    id: 'film-6',
    moduleId: 6,
    title: 'Stalker',
    director: 'Andrei Tarkovsky (Música: Eduard Artemyev)',
    year: 1979,
    duration: '162 min',
    durationMinutes: 162,
    audioTrack: 'legendado_pt',
    audioTrackLabel: '💬 Legendado em Português (PT-BR) & Multilíngue',
    availableSubtitles: ['pt', 'en', 'es', 'fr'],
    platform: 'Mosfilm Oficial (YouTube HD)',
    streamingPlatform: 'Archive.org (Legendado em Português PT-BR)',
    watchUrl: 'https://www.youtube.com/watch?v=Q3hBLv-HLEc',
    streamingUrl: 'https://archive.org/embed/stalker-1979-legendado-em-pt-br-1080p-25fps-c-1-uqfvz-wkc-i',
    videoOptions: [
      {
        id: 'stalker-legendado-pt',
        label: '💬 Filme Completo Legendado em Português PT-BR (1080p) (162 min)',
        url: 'https://archive.org/embed/stalker-1979-legendado-em-pt-br-1080p-25fps-c-1-uqfvz-wkc-i',
        duration: '162 min',
        durationMinutes: 162,
        platformName: 'Archive.org (Legendado PT-BR)',
        badge: 'Legendado PT-BR • 162 min',
        subtitleLang: 'pt',
        type: 'full_movie',
      },
      {
        id: 'stalker-mosfilm-multilang',
        label: '🌐 Versão Oficial Mosfilm HD com Legendas Multilíngues (EN, ES, FR, PT) (162 min)',
        url: 'https://www.youtube.com/watch?v=Q3hBLv-HLEc',
        duration: '162 min',
        durationMinutes: 162,
        platformName: 'Canal Oficial Mosfilm (YouTube)',
        badge: 'Mosfilm HD • CC Multilíngue',
        subtitleLang: 'multi',
        type: 'full_movie',
      },
    ],
    whyWatch:
      'A maior referência mundial em desenho de som, ruídos de ambiente (soundscape), sintetizadores analógicos e o poder transcendental do silêncio.',
    whatToObserve:
      'Silêncio, ambiente da Zona, ruídos mecânicos ritmados das vagonetas nos trilhos, água gotejando e o espaço acústico em camadas.',
    observationActivity:
      'Identifique 3 momentos em que o som antecipa o perigo ou a presença de algo sobrenatural antes que a câmera ou a imagem revelem o evento.',
  },
  {
    id: 'film-7',
    moduleId: 7,
    title: 'O Encouraçado Potemkin – Cena da Escadaria de Odessa',
    director: 'Sergei Eisenstein',
    year: 1925,
    duration: '7:45 min (Cena da Escadaria) • 74 min (Filme Completo)',
    durationMinutes: 8,
    audioTrack: 'mudo',
    audioTrackLabel: '🎼 Cinema Mudo • Trilha Sonora Orquestral',
    availableSubtitles: ['pt', 'en', 'es', 'fr'],
    platform: 'YouTube 4K Remaster',
    streamingPlatform: 'Archive.org Histórico',
    watchUrl: 'https://www.youtube.com/watch?v=K1Vx3AOpVDo',
    streamingUrl: 'https://archive.org/embed/theodessasteps',
    videoOptions: [
      {
        id: 'steps-4k',
        label: '⚡ Cena da Escadaria de Odessa em 4K Remaster (7:45 min)',
        url: 'https://www.youtube.com/watch?v=K1Vx3AOpVDo',
        duration: '7:45 min',
        durationMinutes: 8,
        platformName: 'YouTube 4K Remaster',
        badge: 'Cena da Escadaria • 7:45 min',
        type: 'scene',
      },
      {
        id: 'steps-archive',
        label: '🏛️ Versão Histórica no Archive.org (7:35 min)',
        url: 'https://archive.org/embed/theodessasteps',
        duration: '7:35 min',
        durationMinutes: 8,
        platformName: 'Archive.org Histórico',
        badge: 'Cena • 7:35 min',
        type: 'scene',
      },
      {
        id: 'steps-full-film',
        label: '🚢 Longa-Metragem Completo Restaurado em 4K (74 min)',
        url: 'https://www.youtube.com/watch?v=x6a-3y6Orvw',
        duration: '74 min',
        durationMinutes: 74,
        platformName: 'YouTube 4K Restored',
        badge: 'Filme Completo • 4K • 74 min',
        subtitleLang: 'multi',
        type: 'full_movie',
      },
      {
        id: 'steps-full-archive',
        label: '🏛️ Longa-Metragem Completo no Archive.org (72 min)',
        url: 'https://archive.org/embed/BattleshipPotemkin',
        duration: '72 min',
        durationMinutes: 72,
        platformName: 'Domínio Público / Archive.org',
        badge: 'Archive.org • 72 min',
        subtitleLang: 'multi',
        type: 'full_movie',
      },
    ],
    whyWatch:
      'A sequência de montagem mais estudada nas escolas de cinema de todo o mundo. A teoria do corte métrico, rítmico e intelectual em ação.',
    whatToObserve:
      'Montagem rítmica acelerada, contraste de direção de movimento (soldados descendo vs povo subindo), cortes de detalhe e o carrinho de bebê descendo.',
    observationActivity:
      'Analise como a alternância entre planos gerais dos degraus e closes da mãe desesperada gera comoção imediata e sensação de impotência.',
  },
  {
    id: 'film-8',
    moduleId: 8,
    title: 'Bastidores & Making Of de Produção Audiovisual Profissional',
    director: 'Equipe de Cinema e Audiovisual',
    year: 2023,
    duration: '21:36 min (AvMakers) • 26:53 min (Geração Cinema)',
    durationMinutes: 22,
    audioTrack: 'original_pt',
    audioTrackLabel: '🇧🇷 Áudio Original em Português',
    availableSubtitles: ['pt', 'en', 'es', 'fr'],
    platform: 'Dinâmica de um Set de Filmagem (YouTube)',
    streamingPlatform: 'Como Funciona o Set (YouTube Alternativo)',
    watchUrl: 'https://www.youtube.com/watch?v=bA3kSWwOm6I',
    streamingUrl: 'https://www.youtube.com/watch?v=vustjlR_fgI',
    videoOptions: [
      {
        id: 'set-avmakers',
        label: '🎬 Dinâmica de um Set de Filmagem (AvMakers) (21:36 min)',
        url: 'https://www.youtube.com/watch?v=bA3kSWwOm6I',
        duration: '21:36 min',
        durationMinutes: 22,
        platformName: 'AvMakers Brasil (YouTube)',
        badge: 'Aula Prática • CC Multilíngue • 21:36 min',
        audioLang: 'pt',
        type: 'analysis',
      },
      {
        id: 'set-geracao',
        label: '🎥 Como Funciona um Set de Filmagem e suas Funções (Geração Cinema) (26:53 min)',
        url: 'https://www.youtube.com/watch?v=vustjlR_fgI',
        duration: '26:53 min',
        durationMinutes: 27,
        platformName: 'Geração Cinema (YouTube)',
        badge: 'Bastidores • CC Multilíngue • 26:53 min',
        audioLang: 'pt',
        type: 'analysis',
      },
    ],
    whyWatch:
      'Visualizar a mecânica de um set de verdade: a relação entre assistente de direção, continuísta, fotógrafo, maquinária, som direto e atores.',
    whatToObserve:
      'A hierarquia respeitosa no set, o controle da ordem do dia, os testes de luz antes da chamada dos atores e a resolução ágil de imprevistos climáticos.',
    observationActivity:
      'Aponte três situações em que a organização da produção executiva evitou desperdício de tempo e assegurou o cronograma da diária.',
  },
  {
    id: 'film-9',
    moduleId: 9,
    title: 'Recife Frio',
    director: 'Kleber Mendonça Filho',
    year: 2009,
    duration: '24 min (Curta Completo) • 25 min (Versão com Teaser)',
    durationMinutes: 24,
    audioTrack: 'original_pt',
    audioTrackLabel: '🇧🇷 Áudio Original em Português',
    availableSubtitles: ['pt', 'en', 'es', 'fr'],
    platform: 'YouTube (Filme de Kleber Mendonça Filho)',
    streamingPlatform: 'YouTube Teaser & Making Of',
    watchUrl: 'https://www.youtube.com/watch?v=X_Xho2GFIPY',
    streamingUrl: 'https://www.youtube.com/watch?v=U9mu2TJ0scY',
    videoOptions: [
      {
        id: 'recife-frio-hd',
        label: '❄️ Curta-Metragem Completo em HD (24:00 min)',
        url: 'https://www.youtube.com/watch?v=X_Xho2GFIPY',
        duration: '24 min',
        durationMinutes: 24,
        platformName: 'YouTube (HD Oficial)',
        badge: 'Curta Completo • CC Multilíngue • 24 min',
        audioLang: 'pt',
        type: 'full_movie',
      },
      {
        id: 'recife-frio-director',
        label: '🎬 Versão do Diretor com Teaser de O Som ao Redor (25:35 min)',
        url: 'https://www.youtube.com/watch?v=U9mu2TJ0scY',
        duration: '25:35 min',
        durationMinutes: 26,
        platformName: 'Canal Oficial Kleber Mendonça Filho',
        badge: 'Versão com Teaser • 25:35 min',
        audioLang: 'pt',
        type: 'full_movie',
      },
    ],
    whyWatch:
      'Um dos curtas mais premiados da história do cinema brasileiro recente (mais de 50 prêmios). Aula de falso documentário e divulgação mercadológica.',
    whatToObserve:
      'A estética de telejornalismo estrangeiro cobrindo uma tragédia bizarra, a força da premissa cômica e dramática, o cartaz icônico e a circulação em festivais.',
    observationActivity:
      'Identifique como a logline ("Uma mudança climática sem explicação faz nevar no Recife tropical") gerou interesse imediato de festivais no mundo inteiro.',
  },
  {
    id: 'film-10',
    moduleId: 10,
    title: 'Mostra de Curtas-Metragens Independentes & Obras de Referência',
    originalTitle: 'Meu Amigo Nietzsche & Três Minutos (Curadoria de Cinema Independente)',
    director: 'Fáuston da Silva & Ana Luiza Azevedo (Cineastas Independentes Brasileiros)',
    year: 2024,
    duration: '15 min (Meu Amigo Nietzsche) • 6 min (Três Minutos)',
    durationMinutes: 15,
    audioTrack: 'original_pt',
    audioTrackLabel: '🇧🇷 Áudio Original em Português',
    availableSubtitles: ['pt', 'en', 'es', 'fr'],
    platform: 'Meu Amigo Nietzsche (Dir. Fáuston da Silva - YouTube Oficial)',
    streamingPlatform: 'Três Minutos (Dir. Ana Luiza Azevedo - YouTube Oficial)',
    watchUrl: 'https://www.youtube.com/watch?v=DN0qoSCJYlI',
    streamingUrl: 'https://www.youtube.com/watch?v=jAWaMJ7mA6E',
    videoOptions: [
      {
        id: 'curta-nietzsche',
        label: '📖 Meu Amigo Nietzsche (Dir. Fáuston da Silva) (15:00 min)',
        url: 'https://www.youtube.com/watch?v=DN0qoSCJYlI',
        duration: '15 min',
        durationMinutes: 15,
        platformName: 'YouTube Oficial (Curta Completo)',
        badge: 'Curta • Legendas CC • 15 min',
        audioLang: 'pt',
        type: 'full_movie',
      },
      {
        id: 'curta-tres-minutos',
        label: '⏱️ Três Minutos (Dir. Ana Luiza Azevedo & Jorge Furtado) (6:00 min)',
        url: 'https://www.youtube.com/watch?v=jAWaMJ7mA6E',
        duration: '6 min',
        durationMinutes: 6,
        platformName: 'wocomoBRASIL / Casa de Cinema de POA',
        badge: 'Curta Premiado em Cannes • 6 min',
        audioLang: 'pt',
        type: 'full_movie',
      },
    ],
    whyWatch:
      'Grandes obras premiadas do cinema independente brasileiro, selecionadas pela coordenação pedagógica como referências de linguagem, economia de recursos e potência narrativa para inspirar o seu Projeto Final.',
    whatToObserve:
      'A capacidade de emocionar em poucos minutos sem necessidade de efeitos caros; a precisão do corte, a iluminação expressiva e a verdade da atuação.',
    observationActivity:
      'Compare seu próprio projeto final com os curtas exibidos, avaliando clareza de proposta, qualidade de som e intensidade da narrativa.',
  },
  {
    id: 'film-bonus-noite-americana',
    moduleId: 0,
    isBonus: true,
    badge: 'BÔNUS EXTRA • CLÁSSICO DO SET DE FILMAGEM',
    category: 'bonus',
    relatedModuleId: 8,
    title: 'A Noite Americana (La Nuit Américaine)',
    originalTitle: 'La Nuit Américaine (Day for Night)',
    director: 'François Truffaut',
    year: 1973,
    country: 'França / Itália',
    duration: '116 min (Filme Completo em Streaming) • 2:30 min (Cena Antológica de Set)',
    durationMinutes: 116,
    audioTrack: 'legendado_pt',
    audioTrackLabel: '💬 Legendado em Português (PT-BR) + Transcrição Didática',
    availableSubtitles: ['pt', 'en', 'es', 'fr'],
    platform: 'YouTube (Cena Didática & Bastidores)',
    streamingPlatform: 'Prime Video / Arte1 / JustWatch (Filme Completo 116 min)',
    watchUrl: 'https://www.youtube.com/watch?v=GmSpeM5Hj2A',
    streamingUrl: 'https://www.primevideo.com/detail/0S777P0XW132Y8D5L03P4L105/',
    videoOptions: [
      {
        id: 'noite-trailer-hd',
        label: '🎬 Filme & Cena de Set: Trailer Oficial HD Remasterizado 1080p • Legendas Didáticas (2:15 min)',
        url: 'https://www.youtube.com/watch?v=GmSpeM5Hj2A',
        duration: '2:15 min',
        durationMinutes: 2,
        platformName: 'Trailer Oficial HD 1080p (YouTube)',
        badge: 'Cena de Estudo HD • 2:15 min',
        type: 'trailer',
      },
      {
        id: 'noite-analysis',
        label: '🎓 Análise Crítica & Bastidores: "Carta de Amor ao Cinema" (10 min)',
        url: 'https://www.youtube.com/watch?v=v4YeaNBca3U',
        duration: '10 min',
        durationMinutes: 10,
        platformName: 'Ensaio Cinematográfico (YouTube)',
        badge: 'Análise de Obra • 10 min',
        type: 'scene',
      },
      {
        id: 'noite-trailer-bfi',
        label: '🎞️ Trailer Oficial de Cinema BFI (British Film Institute) (2:30 min)',
        url: 'https://www.youtube.com/watch?v=OBen19EjYAc',
        duration: '2:30 min',
        durationMinutes: 3,
        platformName: 'BFI (British Film Institute)',
        badge: 'Trailer BFI • 2:30 min',
        type: 'trailer',
      },
      {
        id: 'noite-streaming-prime',
        label: '📺 Assistir ao Filme Completo (116 min) no Prime Video / Arte1',
        url: 'https://www.primevideo.com/detail/0S777P0XW132Y8D5L03P4L105/',
        duration: '116 min',
        durationMinutes: 116,
        isStreaming: true,
        platformName: 'Prime Video (Arte1 Amazon Channel)',
        badge: 'Streaming Oficial (116 min)',
        type: 'streaming',
      },
      {
        id: 'noite-streaming-justwatch',
        label: '🔍 Onde Assistir ao Filme Completo no Brasil (JustWatch)',
        url: 'https://www.justwatch.com/br/filme/a-noite-americana',
        duration: '116 min',
        durationMinutes: 116,
        isStreaming: true,
        platformName: 'JustWatch Brasil (Guia de Streaming)',
        badge: 'Catálogo de Streaming (116 min)',
        type: 'streaming',
      },
      {
        id: 'noite-streaming-apple',
        label: '🍎 Assistir na Apple TV / iTunes (Aluguel ou Compra HD)',
        url: 'https://tv.apple.com/us/movie/day-for-night/umc.cmc.38r7zsk3o4o9vug3qj2n9qrvq',
        duration: '116 min',
        durationMinutes: 116,
        isStreaming: true,
        platformName: 'Apple TV / iTunes',
        badge: 'Aluguel Digital (116 min)',
        type: 'streaming',
      },
    ],
    synopsis:
      'Uma declaração de amor apaixonada ao ofício de fazer cinema. Em Nice, uma equipe cinematográfica reúne-se nos estúdios Victorine para rodar o melodrama "Je vous présente Paméla". Durante a produção, acompanhamos todas as crises, romances, desafios técnicos, caprichos dos atores e a obstinação do diretor para concluir o filme contra todos os imprevistos cotidianos. Vencedor do Oscar de Melhor Filme Estrangeiro.',
    whyWatch:
      'O filme definitivo sobre o cotidiano de um set de filmagem real. Mostra de forma magistral os bastidores da produção cinematográfica: o estresse do cronograma, as relações humanas complexas entre equipe e elenco, a resolução engenhosa de problemas de produção e, principalmente, a técnica clássica da "Noite Americana" (Day for Night) — a arte de filmar durante a luz do dia usando filtros e subexposição para simular a noite no filme.',
    whatToObserve:
      '1. A demonstração visual da técnica da "Noite Americana": observe a colocação dos filtros especiais na câmera para transformar o sol de Nice em noite cinematográfica.\n2. A dinâmica de comando no set: a cumplicidade do diretor Ferrand (interpretado pelo próprio Truffaut) com a assistente de direção Joëlle, o operador de som e o continuísta.\n3. A resolução criativa de imprevistos reais de produção: adereços que quebram, o gato que não cumpre a marcação de cena, e o lema inesquecível de Truffaut: "Fazer um filme é como viajar numa diligência do Velho Oeste: no começo esperamos uma bela viagem, mas logo passamos a desejar apenas chegar ao destino".',
    observationActivity:
      'Anote como François Truffaut equilibra a dimensão técnica (escolha de lentes, luz de estúdio e filtros de dia-por-noite) com a gestão emocional da equipe. Escreva uma reflexão de 1 parágrafo sobre como a técnica da Noite Americana pode ser aplicada em produções de baixo orçamento.',
  },
  {
    id: 'film-extra-heroi',
    moduleId: 5,
    isBonus: true,
    badge: 'VÍDEO EXTRA • MASTERCLASS EM FOTOGRAFIA & COR',
    category: 'bonus',
    relatedModuleId: 5,
    title: 'Herói (Hero)',
    originalTitle: 'Yīngxióng (Hero - Com Jet Li)',
    director: 'Zhang Yimou (Direção de Fotografia: Christopher Doyle)',
    year: 2002,
    country: 'China / Hong Kong',
    duration: '99 min (Longa Completo) • 7:08 min (Duelo Principal)',
    durationMinutes: 99,
    audioTrack: 'legendado_pt',
    audioTrackLabel: '💬 Legendado em Português (PT-BR)',
    availableSubtitles: ['pt', 'en', 'es', 'fr'],
    platform: 'YouTube (Duelo Completo 1080p HD & Trailer Oficial)',
    streamingPlatform: 'Apple TV & Amazon Prime Video (Filme Completo 99 min)',
    watchUrl: 'https://www.youtube.com/watch?v=-N3BdBhWdmU',
    streamingUrl: 'https://www.youtube.com/watch?v=_USDk5jaGek',
    videoOptions: [
      {
        id: 'duel-rain',
        label: '⚔️ Duelo na Chuva 1080p: Jet Li vs. Donnie Yen (7:08 min)',
        url: 'https://www.youtube.com/watch?v=-N3BdBhWdmU',
        duration: '7:08 min',
        durationMinutes: 7,
        platformName: 'YouTube (1080p HD)',
        badge: 'Cena Principal • 7:08 min',
        type: 'full_scene',
      },
      {
        id: 'color-red',
        label: '🔴 Paleta Vermelha: O Duelo no Bosque de Folhas (4:33 min)',
        url: 'https://www.youtube.com/watch?v=p9keMBIyPnA',
        duration: '4:33 min',
        durationMinutes: 4,
        platformName: 'Cena Oficial das Folhas Vermelhas (1080p)',
        badge: 'Cena Vermelha • 4:33 min',
        type: 'scene',
      },
      {
        id: 'color-green',
        label: '🟢 Paleta Verde: Defesa da Escola de Caligrafia (3:45 min)',
        url: 'https://www.youtube.com/watch?v=YMv3XctCpJ0',
        duration: '3:45 min',
        durationMinutes: 3,
        platformName: 'Dancing With Arrows (1080p)',
        badge: 'Cena Verde • 3:45 min',
        type: 'scene',
      },
      {
        id: 'color-analysis',
        label: '🎨 Vídeo-Ensaio: Why Every Color in Hero Tells a Story (14:21 min)',
        url: 'https://www.youtube.com/watch?v=_ZiWnfHxhu4',
        duration: '14:21 min',
        durationMinutes: 14,
        platformName: 'Estudo Teórico de Fotografia & Cores',
        badge: 'Vídeo-Ensaio • 14:21 min',
        type: 'analysis',
      },
      {
        id: 'color-transitions',
        label: '🌈 Variação das 5 Cores: Transições Cromáticas (5:14 min)',
        url: 'https://www.youtube.com/watch?v=7PU8RVPZJ_g',
        duration: '5:14 min',
        durationMinutes: 5,
        platformName: 'Supercut Cromático',
        badge: 'Variação 5 Cores • 5:14 min',
        type: 'analysis',
      },
      {
        id: 'trailer-hd',
        label: '🎞️ Trailer Oficial HD 1080p (2:18 min)',
        url: 'https://www.youtube.com/watch?v=_USDk5jaGek',
        duration: '2:18 min',
        durationMinutes: 2,
        platformName: 'Rotten Tomatoes Classic Trailers / Miramax',
        badge: 'Trailer • 2:18 min',
        type: 'trailer',
      },
      {
        id: 'apple-tv',
        label: '🍎 Assistir ao Longa-Metragem Completo (99 min) no Apple TV',
        url: 'https://tv.apple.com/br/movie/heroi/umc.cmc.3y42j9404285x8n44l1s2j6z8',
        duration: '99 min',
        durationMinutes: 99,
        isStreaming: true,
        platformName: 'Apple TV (Aluguel / Compra HD)',
        badge: 'Filme Completo (99 min)',
        type: 'streaming',
      },
      {
        id: 'prime-video',
        label: '📦 Assistir ao Longa-Metragem Completo (99 min) no Prime Video',
        url: 'https://www.primevideo.com/search/ref=atv_nb_sr?phrase=Hero+Zhang+Yimou',
        duration: '99 min',
        durationMinutes: 99,
        isStreaming: true,
        platformName: 'Amazon Prime Video',
        badge: 'Streaming Oficial (99 min)',
        type: 'streaming',
      },
    ],
    synopsis:
      'Estrelado por Jet Li (o guerreiro Sem Nome), Tony Leung, Maggie Cheung, Zhang Ziyi e Donnie Yen. Na China antiga dos Reinos Combatentes, um espadachim relata ao Rei de Qin como derrotou os maiores assassinos do império. Inspirado na estrutura narrativa de Rashomon, a mesma história é recontada sob perspectivas divergentes — cada uma inteiramente dominada por uma cor primária arrebatadora (vermelho, azul, branco, verde e preto). Indicado ao Oscar e ao Globo de Ouro de Melhor Filme Estrangeiro.',
    whyWatch:
      'O maior clássico contemporâneo de Direção de Fotografia e Teoria das Cores no cinema. O diretor Zhang Yimou (ele próprio formado como diretor de fotografia) e o renomado mestre da luz Christopher Doyle construíram uma das experiências visuais mais arrebatadoras da história das telas. Uma masterclass prática sobre paletas monocromáticas, psicologia da cor, luz natural espelhada na água, iluminação dura e difusa em cenas de ação sob a chuva e enquadramentos rigorosamente geométricos em formato widescreen anamórfico.',
    whatToObserve:
      '1. A Teoria Narrativa das Cores de Christopher Doyle: O Vermelho para a paixão e o ciúme cego; o Azul para a sabedoria serena e a verdade racional; o Branco para o luto e a clareza moral; o Verde para a memória e o idílio do passado; e o Preto para o rigor absolutista do palácio imperial.\n2. O Duelo Histórico entre Jet Li e Donnie Yen no Pátio de Go sob a chuva: Repare na iluminação lateral dura que recorta as gotas d\'água em alta velocidade de obturação, nos reflexos límpidos no chão molhado e nas sombras dramáticas.\n3. O Duelo sobre a Água do Lago: A equipe esperou semanas para filmar apenas durante 2 horas diárias ao amanhecer, para conseguir a superfície de água perfeitamente lisa como um espelho e a luz dourada suave que transforma a luta em um balé poético.',
    observationActivity:
      'Analise como a direção de fotografia e a temperatura de cor alteram totalmente a emoção da mesma cena quando ela é recontada em cores diferentes. Escreva 1 parágrafo relacionando a paleta de Herói com a iluminação de três pontos (luz principal, preenchimento e contra-luz) e proponha como utilizar uma luz colorida de recorte no seu exercício prático de câmera do Módulo 05.',
  },
  {
    id: 'film-extra-heroi-cores',
    moduleId: 5,
    isBonus: true,
    badge: 'VÍDEO EXTRA • VARIAÇÃO CROMÁTICA & TEORIA DAS CORES',
    category: 'bonus',
    relatedModuleId: 5,
    title: 'Herói: As 5 Variações Cromáticas de Christopher Doyle',
    originalTitle: 'Hero (2002) - Chromatic Variations & Color Grammar',
    director: 'Zhang Yimou & Christopher Doyle',
    year: 2002,
    country: 'China / Hong Kong',
    duration: '4:33 min (Cena Principal) • 37 min (Playlist de Cenas)',
    durationMinutes: 5,
    audioTrack: 'legendado_pt',
    audioTrackLabel: '💬 Legendado em Português (PT-BR)',
    availableSubtitles: ['pt', 'en', 'es', 'fr'],
    platform: 'YouTube (Cenas Oficiais em HD & Estudo Cromático)',
    streamingPlatform: 'Apple TV & Amazon Prime Video',
    watchUrl: 'https://www.youtube.com/watch?v=p9keMBIyPnA',
    streamingUrl: 'https://www.youtube.com/watch?v=_ZiWnfHxhu4',
    videoOptions: [
      {
        id: 'opt-red',
        label: '🔴 Paleta Vermelha: O Duelo no Bosque de Folhas (4:33 min)',
        url: 'https://www.youtube.com/watch?v=p9keMBIyPnA',
        duration: '4:33 min',
        durationMinutes: 4,
        platformName: 'Cena Oficial das Folhas Vermelhas (1080p)',
        badge: 'Cena Vermelha • 4:33 min',
        type: 'scene',
      },
      {
        id: 'opt-green',
        label: '🟢 Paleta Verde: Defesa da Escola de Caligrafia (3:45 min)',
        url: 'https://www.youtube.com/watch?v=YMv3XctCpJ0',
        duration: '3:45 min',
        durationMinutes: 3,
        platformName: 'Dancing With Arrows (1080p)',
        badge: 'Cena Verde • 3:45 min',
        type: 'scene',
      },
      {
        id: 'opt-rain',
        label: '⚔️ Duelo na Chuva em Preto & Prata (7:08 min)',
        url: 'https://www.youtube.com/watch?v=-N3BdBhWdmU',
        duration: '7:08 min',
        durationMinutes: 7,
        platformName: 'YouTube (1080p HD)',
        badge: 'Cena da Chuva • 7:08 min',
        type: 'full_scene',
      },
      {
        id: 'opt-essay',
        label: '🎨 Vídeo-Ensaio Analítico: Why Every Color in Hero Tells a Story (14:21 min)',
        url: 'https://www.youtube.com/watch?v=_ZiWnfHxhu4',
        duration: '14:21 min',
        durationMinutes: 14,
        platformName: 'Estudo Crítico de Fotografia',
        badge: 'Vídeo-Ensaio • 14:21 min',
        type: 'analysis',
      },
      {
        id: 'opt-transitions',
        label: '🌈 Variação das 5 Cores: Transições Cromáticas (5:14 min)',
        url: 'https://www.youtube.com/watch?v=7PU8RVPZJ_g',
        duration: '5:14 min',
        durationMinutes: 5,
        platformName: 'Supercut Cromático',
        badge: 'Comparativo • 5:14 min',
        type: 'analysis',
      },
      {
        id: 'opt-trailer',
        label: '🎞️ Trailer Oficial HD 1080p (2:18 min)',
        url: 'https://www.youtube.com/watch?v=_USDk5jaGek',
        duration: '2:18 min',
        durationMinutes: 2,
        platformName: 'Miramax HD',
        badge: 'Trailer • 2:18 min',
        type: 'trailer',
      },
    ],
    synopsis:
      'Coletânea de estudos audiovisuais dedicada especificamente à gramática das cores no filme Herói (2002), dirigido por Zhang Yimou e fotografado por Christopher Doyle. O material reúne a cena emblemática do duelo no bosque com as folhas que sangram do amarelo para o vermelho escarlate, a defesa da escola de caligrafia em verde-esmeralda límpido sob milhares de flechas imperiais pretas, o combate na chuva com iluminação lateral dura, e o vídeo-ensaio analítico sobre a psicologia e dramaturgia de cada matiz cromático.',
    whyWatch:
      'Estudo essencial para a Apostila 05 de Direção de Fotografia. Demonstra como o domínio da temperatura de cor, da saturação seletiva e do contraste tonal pode mudar por completo o significado ético e emocional de uma mesma história.',
    whatToObserve:
      '1. Repare na transição das folhas amarelas para vermelho sangue no bosque outonal; 2. Veja como o verde esmeralda transmite serenidade e disciplina espiritual perante a violência das flechas; 3. Analise como o contraste entre o preto e a luz lateral na chuva isola as silhuetas com precisão cirúrgica.',
    observationActivity:
      'Compare as duas cenas cromáticas (a Paleta Vermelha e a Paleta Verde). Escreva 1 parágrafo explicando como a paleta de cores altera o ritmo percebido da luta e que temperatura de cor (quente ou fria) foi empregada em cada uma.',
  },
];

// 6. LEITURAS COMPLEMENTARES (Em cada módulo)
export const pedagogicalReadings: ModuleReading[] = [
  {
    id: 'read-1',
    moduleId: 1,
    title: 'A Linguagem do Cinema',
    author: 'Marcel Martin',
    suggestedChapter: 'Capítulos 1 e 2: A Unidade Fílmica e a Expressão pelo Enquadramento',
    whyRead:
      'O livro de referência absoluta sobre a gramática do cinema e a passagem do plano como documento para o plano como obra de arte.',
    url: '/filmes-leituras',
  },
  {
    id: 'read-2',
    moduleId: 2,
    title: 'A Forma do Filme',
    author: 'Sergei Eisenstein',
    suggestedChapter: 'A Estrutura do Filme e os Métodos de Montagem',
    whyRead:
      'Escrito pelo próprio gênio russo, ensina a montagem métrica, rítmica, tonal, sobretonal e intelectual que revolucionou a história das telas.',
    url: '/filmes-leituras',
  },
  {
    id: 'read-3',
    moduleId: 3,
    title: 'Manual do Roteiro (Screenplay)',
    author: 'Syd Field',
    suggestedChapter: 'O Paradigma dos Três Atos e os Pontos de Virada',
    whyRead:
      'A bíblia da estrutura dramática no cinema mundial. Como arquitetar a espinha dorsal de uma narrativa sem que ela perca ritmo ou fôlego.',
    url: '/filmes-leituras',
  },
  {
    id: 'read-4',
    moduleId: 4,
    title: 'A Preparação do Ator',
    author: 'Constantin Stanislavski',
    suggestedChapter: 'Ação Física, Objetivo e Memória Afetiva',
    whyRead:
      'A base de toda a direção de atores moderna realista. Ensina o diretor a dialogar com a psicologia viva do elenco em cena.',
    url: '/filmes-leituras',
  },
  {
    id: 'read-5',
    moduleId: 5,
    title: 'Iluminação no Cinema: A Arte de Pintar com a Luz',
    author: 'John Alton (Painting with Light)',
    suggestedChapter: 'O Mistério das Sombras e o Desenho Clássico de Luz',
    whyRead:
      'O primeiro grande manual escrito por um lendário diretor de fotografia de Hollywood. Prático, visceral e revelador sobre luz e sombra.',
    url: '/filmes-leituras',
  },
  {
    id: 'read-6',
    moduleId: 6,
    title: 'A Audiovisualidade: Som e Imagem no Cinema',
    author: 'Michel Chion',
    suggestedChapter: 'O Áudio-Logo, o Ponto de Escuta e o Efeito Acousmático',
    whyRead:
      'A obra definitiva sobre teoria sonora no cinema. Como o som transforma e ressignifica a imagem que os olhos veem.',
    url: '/filmes-leituras',
  },
  {
    id: 'read-7',
    moduleId: 7,
    title: 'Num Piscar de Olhos (In the Blink of an Eye)',
    author: 'Walter Murch',
    suggestedChapter: 'A Regra de Seis: Por Que e Onde Cortar?',
    whyRead:
      'O lendário montador de Apocalypse Now e O Poderoso Chefão ensina a teoria emocional e fisiológica do corte cinematográfico.',
    url: '/filmes-leituras',
  },
  {
    id: 'read-8',
    moduleId: 8,
    title: 'Produção Executiva para Cinema Independente (Shoot to Kill)',
    author: 'Christine Vachon',
    suggestedChapter: 'Como Realizar um Filme sem Perder a Alma nem a Casa',
    whyRead:
      'Visão pragmática, desmistificadora e corajosa dos bastidores da produção executiva de filmes autorais premiados.',
    url: '/filmes-leituras',
  },
  {
    id: 'read-9',
    moduleId: 9,
    title: 'A Circulação do Curta-Metragem Brasileiro e Internacional',
    author: 'Pesquisadores do Audiovisual Brasileiro',
    suggestedChapter: 'Estratégia de Inscrições, FilmFreeway e Janelas Digitais',
    whyRead:
      'Guia indispensável para transformar seu curta em cartão de visitas mundial e compreender as exigências de curadoria dos festivais.',
    url: '/filmes-leituras',
  },
  {
    id: 'read-10',
    moduleId: 10,
    title: 'Esculpir o Tempo',
    author: 'Andrei Tarkovsky',
    suggestedChapter: 'A Responsabilidade do Artista e o Cinema como Imagem da Vida',
    whyRead:
      'O fechamento filosófico e poético perfeito para quem conclui o CINELAB e assume o papel soberano de cineasta no mundo contemporâneo.',
    url: '/filmes-leituras',
  },
];

// 7. ATIVIDADES E EXERCÍCIOS PRÁTICOS DE CADA MÓDULO (Com espaço para o aluno registrar sua resposta)
export const pedagogicalActivities: ModuleActivity[] = [
  // Módulo 01
  {
    id: 'act-1-principal',
    moduleId: 1,
    title: 'Atividade Principal 01: "Conte uma pequena história em 5 planos"',
    category: 'pratica',
    content:
      'Crie uma narrativa visual completa utilizando rigorosamente 5 planos cinematográficos em progressão dramática. Defina o enquadramento de cada plano (ex: Plano Geral, Plano Médio, Primeiro Plano, Plano Detalhe) e a ação que ocorre em cena.',
    details:
      'Exemplo: Plano 1 (Plano Geral: sala vazia com chave sobre a mesa) -> Plano 2 (Plano Médio: mulher entra com pressa) -> Plano 3 (Plano Detalhe: mão pega a chave) -> Plano 4 (Primeiro Plano: olhar de alívio e espanto) -> Plano 5 (Plano Americano: ela sai batendo a porta).',
    activityType: 'structured_form',
    expectedFields: [
      { key: 'plano1', label: 'Plano 1 (Enquadramento + Ação)', placeholder: 'Ex: GPG ou PG - Descreva a cena...', required: true },
      { key: 'plano2', label: 'Plano 2 (Enquadramento + Ação)', placeholder: 'Ex: PM - Descreva a ação...', required: true },
      { key: 'plano3', label: 'Plano 3 (Enquadramento + Ação)', placeholder: 'Ex: Close / Primeiro Plano...', required: true },
      { key: 'plano4', label: 'Plano 4 (Enquadramento + Ação)', placeholder: 'Ex: Plano Detalhe - Elemento chave...', required: true },
      { key: 'plano5', label: 'Plano 5 (Enquadramento + Desfecho)', placeholder: 'Ex: PG ou PA - Conclusão...', required: true },
    ],
  },
  // Módulo 02
  {
    id: 'act-2-principal',
    moduleId: 2,
    title: 'Atividade Principal 02: "Exercício de Análise em Seis Camadas"',
    category: 'pratica',
    content:
      'Escolha uma cena emblemática de "O Encouraçado Potemkin" (ou outra obra de sua escolha) e aplique o método analítico do CINELAB dissecando suas 6 camadas constitutivas.',
    activityType: 'structured_form',
    expectedFields: [
      { key: 'filmeCena', label: 'Filme e Cena Escolhida', placeholder: 'Ex: O Encouraçado Potemkin - Escadaria de Odessa', required: true },
      { key: 'camada1', label: '1. Camada Narrativa', placeholder: 'Qual o conflito e o ponto de virada dramático?', required: true },
      { key: 'camada2', label: '2. Camada de Personagem', placeholder: 'Quais as motivações e reações dos personagens?', required: true },
      { key: 'camada3', label: '3. Camada de Espaço', placeholder: 'Como a locação e o cenário influenciam a tensão?', required: true },
      { key: 'camada4', label: '4. Camada de Imagem (Fotografia)', placeholder: 'Como são a luz, os ângulos e as cores?', required: true },
      { key: 'camada5', label: '5. Camada de Som', placeholder: 'Qual o papel dos ruídos, música e silêncio?', required: true },
      { key: 'camada6', label: '6. Camada de Montagem', placeholder: 'Como o ritmo dos cortes dita a pulsação da cena?', required: true },
    ],
  },
  // Módulo 03
  {
    id: 'act-3-principal',
    moduleId: 3,
    title: 'Atividade Principal 03: "A Última Carta" (Desenvolvimento de Roteiro)',
    category: 'pratica',
    content:
      'Desenvolva o projeto de roteiro da história "A Última Carta". Preencha todos os campos da cadeia de criação dramática e escreva ao menos uma cena completa em padrão Master Scenes.',
    activityType: 'structured_form',
    expectedFields: [
      { key: 'storyline', label: 'Storyline (até 5 linhas)', placeholder: 'Apresentação + Conflito + Resolução básica...', required: true },
      { key: 'logline', label: 'Logline (1 a 2 linhas)', placeholder: 'Quem é o protagonista e qual o obstáculo urgente?', required: true },
      { key: 'sinopse', label: 'Sinopse Curta (1 a 2 parágrafos)', placeholder: 'Resumo completo da narrativa...', required: true },
      { key: 'escaleta', label: 'Escaleta de 5 Cenas', placeholder: 'Cena 1 (...), Cena 2 (...), Cena 3 (...), Cena 4 (...), Cena 5 (...)', required: true },
      { key: 'cenaRoteiro', label: 'Uma Cena Completa em Master Scenes', placeholder: 'INT. QUARTO DE ANDRÉ - NOITE\n\nAndré segura a carta amarelada...', required: true },
    ],
  },
  // Módulo 04
  {
    id: 'act-4-principal',
    moduleId: 4,
    title: 'Atividade Principal 04: "Ensaio de Cena de 45 Segundos"',
    category: 'pratica',
    content:
      'Planeje o ensaio e a direção de uma cena curta de aproximadamente 45 segundos entre dois atores. Defina a intenção da cena, o objetivo interno de cada personagem, a marcação física (blocking) e os 3 planos indispensáveis para filmá-la.',
    activityType: 'structured_form',
    expectedFields: [
      { key: 'intencao', label: 'Intenção Geral da Cena', placeholder: 'Ex: Despedida dolorosa sem que um perceba a partida definitiva do outro.', required: true },
      { key: 'objetivoPers1', label: 'Objetivo do Personagem A (com verbo ativo)', placeholder: 'Ex: Fazer B aceitar o dinheiro sem ofendê-lo.', required: true },
      { key: 'objetivoPers2', label: 'Objetivo do Personagem B (com verbo ativo)', placeholder: 'Ex: Descobrir se A está mentindo sobre a viagem.', required: true },
      { key: 'marcacao', label: 'Marcação Cênica (Blocking)', placeholder: 'Onde cada personagem começa, para onde anda e onde termina a cena?', required: true },
      { key: 'tresPlanos', label: 'Os Três Planos Indispensáveis', placeholder: 'Plano 1 (...), Plano 2 (...), Plano 3 (...)', required: true },
    ],
  },
  // Módulo 05
  {
    id: 'act-5-principal',
    moduleId: 5,
    title: 'Atividade Principal 05: "Quatro Retratos de Luz"',
    category: 'pratica',
    content:
      'Fotografe ou simule quatro retratos de um mesmo sujeito utilizando quatro qualidades de iluminação: 1. Luz Frontal, 2. Luz Lateral, 3. Contraluz, 4. Luz de Janela. Compare o resultado utilizando dois tamanhos de plano (ex: Plano Médio e Close).',
    activityType: 'structured_form',
    expectedFields: [
      { key: 'luzFrontal', label: '1. Luz Frontal (Observação e Efeito)', placeholder: 'Como o rosto se comportou? Como ficaram as sombras?', required: true },
      { key: 'luzLateral', label: '2. Luz Lateral (Observação e Efeito)', placeholder: 'Qual foi o contraste dramático obtido?', required: true },
      { key: 'contraluz', label: '3. Contraluz (Observação e Efeito)', placeholder: 'Como o contorno de luz separou o sujeito do fundo?', required: true },
      { key: 'luzJanela', label: '4. Luz de Janela (Observação e Efeito)', placeholder: 'Qual a qualidade da difusão e textura da pele?', required: true },
      { key: 'comparacaoPlanos', label: 'Comparação entre os Dois Tamanhos de Plano', placeholder: 'O que mudou entre o Plano Médio e o Close nas mesmas luzes?', required: true },
      { key: 'linksImagens', label: 'Links das Imagens / Fotos Registradas (Opcional)', placeholder: 'Cole links do Google Drive, Imgur ou redes sociais...', required: false },
    ],
  },
  // Módulo 06
  {
    id: 'act-6-principal',
    moduleId: 6,
    title: 'Atividade Principal 06: "Gravação de Room Tone e Teste de Distâncias"',
    category: 'pratica',
    content:
      'Grave o ambiente (Room Tone) de um cômodo por 60 segundos. Em seguida, grave a mesma fala curta com o microfone a 30 centímetros e a 2 metros de distância. Compare a reverberação, ruído de fundo e inteligibilidade.',
    activityType: 'structured_form',
    expectedFields: [
      { key: 'locacao', label: 'Locação Escolhida', placeholder: 'Ex: Quarto com janela de madeira voltada para a rua.', required: true },
      { key: 'equipamento', label: 'Equipamento Utilizado', placeholder: 'Ex: Celular com fone/lapela, gravador digital, etc.', required: true },
      { key: 'roomToneAnalise', label: 'Análise do Room Tone (60 segundos)', placeholder: 'Quais ruídos ocultos foram captados no silêncio aparente?', required: true },
      { key: 'falaProxima', label: 'Fala a 30 cm do Microfone', placeholder: 'Como ficou a clareza e presença dos graves?', required: true },
      { key: 'falaDistante', label: 'Fala a 2 metros do Microfone', placeholder: 'Quanto a acústica do ambiente afetou a compreensão?', required: true },
      { key: 'conclusao', label: 'Conclusão Prática para seu Curta', placeholder: 'O que você fará para garantir som limpo no seu filme?', required: true },
    ],
  },
  // Módulo 07
  {
    id: 'act-7-principal',
    moduleId: 7,
    title: 'Atividade Principal 07: "Montagem de Sequência de 30 a 60 Segundos"',
    category: 'pratica',
    content:
      'Monte uma sequência rítmica de 30 a 60 segundos utilizando pelo menos cinco planos distintos. Aplique corte na ação (Cut on Action), corte de reação e controle da duração dos planos.',
    activityType: 'structured_form',
    expectedFields: [
      { key: 'descricaoSequencia', label: 'Descrição da Sequência Montada', placeholder: 'Qual a ação e a emoção retratada nos 30 a 60 segundos?', required: true },
      { key: 'listaPlanos', label: 'Lista dos 5 Planos Utilizados e Durações', placeholder: 'Plano 1 (4s), Plano 2 (2s), Plano 3 (1.5s)...', required: true },
      { key: 'corteAcao', label: 'Onde ocorreu o Corte na Ação?', placeholder: 'Descreva a transição em que o movimento disfarçou o corte.', required: true },
      { key: 'ritmoEmocional', label: 'Como a velocidade dos cortes afetou o espectador?', placeholder: 'Criou aceleração, calma, suspense ou alívio?', required: true },
      { key: 'linkVideo', label: 'Link do Vídeo Montado (Opcional: YouTube/Vimeo/Drive)', placeholder: 'https://...', required: false },
    ],
  },
  // Módulo 08
  {
    id: 'act-8-principal',
    moduleId: 8,
    title: 'Atividade Principal 08: "Ordem do Dia Simplificada e Orçamento Básico"',
    category: 'pratica',
    content:
      'Crie a Ordem do Dia (ODD) para uma diária fictícia ou real do seu curta-metragem. Defina a equipe indispensável, cronograma de horários, locação, equipamentos, plano de contingência (Plano B) e planilha orçamentária sintética.',
    activityType: 'structured_form',
    expectedFields: [
      { key: 'equipe', label: 'Equipe e Funções', placeholder: 'Diretor, Fotógrafo, Som Direto, Produção, Elenco...', required: true },
      { key: 'horarios', label: 'Horários da Diária', placeholder: '08h Chegada / 09h Ensaio / 12h Almoço / 17h Wrap...', required: true },
      { key: 'locacao', label: 'Locação e Logística', placeholder: 'Endereço, autorizações necessárias, tomada de energia...', required: true },
      { key: 'equipamentos', label: 'Lista de Equipamentos Essenciais', placeholder: 'Câmera, tripé, 2 refletores, gravador, rebatedor...', required: true },
      { key: 'planoB', label: 'Plano B (Contingência para imprevistos)', placeholder: 'Se chover ou o ator atrasar, qual a alternativa imediata?', required: true },
      { key: 'orcamento', label: 'Orçamento Básico Estimado (em R$)', placeholder: 'Alimentação: R$ X | Transporte: R$ Y | Equipamentos: R$ Z...', required: true },
    ],
  },
  // Módulo 09
  {
    id: 'act-9-principal',
    moduleId: 9,
    title: 'Atividade Principal 09: "Kit de Divulgação do Curta (EPK)"',
    category: 'pratica',
    content:
      'Elabore o kit de divulgação oficial do seu projeto de curta-metragem para festivais e plataformas. Preencha logline, sinopse, release jornalístico de três linhas, conceito do cartaz e calendário de circulação.',
    activityType: 'structured_form',
    expectedFields: [
      { key: 'tituloCurta', label: 'Título Oficial do Curta', placeholder: 'Ex: "O Último Retrato"', required: true },
      { key: 'logline', label: 'Logline Oficial (1 a 2 linhas)', placeholder: 'A síntese irresistível do filme...', required: true },
      { key: 'sinopse', label: 'Sinopse Curta (3 a 5 linhas)', placeholder: 'Apresentação da trama para catálogos de festival...', required: true },
      { key: 'release', label: 'Release de Imprensa (3 linhas)', placeholder: 'O texto que será enviado para críticos e jornais...', required: true },
      { key: 'ideiaCartaz', label: 'Conceito Visual do Cartaz', placeholder: 'Qual imagem, tipografia e cores expressam a alma do filme?', required: true },
      { key: 'calendarioCirculacao', label: 'Calendário de Festivais (Primeiros 12 meses)', placeholder: 'Festivais prioritários para inscrição (Gramado, Tiradentes, Curta Cinema, etc.)...', required: true },
    ],
  },
  // Módulo 10
  {
    id: 'act-10-principal',
    moduleId: 10,
    title: 'Projeto Final: Curta-Metragem Integrado (1 a 5 minutos)',
    category: 'pratica',
    content:
      'O momento de colocar tudo que aprendeu nas telas! Entregue os dados do seu curta autoral de 1 a 5 minutos com ficha técnica, link do filme finalizado e sua reflexão pessoal de processo.',
    activityType: 'structured_form',
    expectedFields: [
      { key: 'titulo', label: 'Título Oficial do Curta', placeholder: 'Título do seu filme...', required: true },
      { key: 'genero', label: 'Gênero e Formato', placeholder: 'Ficção, Documentário, Ensaio Poético, Suspense, etc.', required: true },
      { key: 'duracao', label: 'Duração Exata (entre 1 e 5 minutos)', placeholder: 'Ex: 3 min 45 seg', required: true },
      { key: 'logline', label: 'Logline', placeholder: 'A frase de impacto do filme...', required: true },
      { key: 'equipeFicha', label: 'Ficha Técnica Completa', placeholder: 'Direção, Roteiro, Elenco, Fotografia, Som, Montagem...', required: true },
      { key: 'linkFilme', label: 'Link do Curta Finalizado (YouTube/Vimeo/Drive/Dropbox)', placeholder: 'https://...', required: true },
      { key: 'linkImagem', label: 'Link do Cartaz ou Still Oficial (Opcional)', placeholder: 'https://...', required: false },
      { key: 'aprendizadoPrincipal', label: 'Aprendizado Principal na Realização', placeholder: 'Qual foi a maior descoberta durante as filmagens?', required: true },
      { key: 'oQueFuncionou', label: 'O que funcionou exatamente como planejado?', placeholder: 'Avalie os acertos do seu curta...', required: true },
      { key: 'oQueFariaDiferente', label: 'O que faria de forma diferente em um próximo filme?', placeholder: 'Reflexão crítica sobre melhorias...', required: true },
      { key: 'proximoProjeto', label: 'O que deseja aprender ou realizar no seu próximo projeto?', placeholder: 'Próximos passos da sua jornada cinematográfica...', required: true },
    ],
  },
];
