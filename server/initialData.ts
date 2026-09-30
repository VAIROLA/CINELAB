import {
  CourseModule,
  VideoLesson,
  Apostila,
  BonusApostila,
  ModuleActivity,
  ModuleEvaluation,
  CourseSettings,
  User,
  Enrollment,
  Payment,
} from '../src/types/index.js';

export const initialCourseSettings: CourseSettings = {
  courseName: 'CINELAB',
  courseSubtitle: 'CINEMA & AUDIOVISUAL',
  description:
    'Formação profissional completa em Cinema e Realização Audiovisual. Três meses intensivos com 10 etapas pedagógicas (90 dias), 3 apostilas bônus, masterclasses em vídeo, pesquisas guiadas, análises de filmografia e certificação profissional.',
  totalDurationMonths: 3,
  totalModules: 10,
  moduleDurationDays: 9,
  evalLeadTimeDays: 3,
  cohortStartDate: '2026-08-25',
  minPassingGrade: 6.0,
  workloadHours: 180,
  coursePrice: 1000.00,
  coursePriceOriginal: 2000.00,
  maxInstallments: 12,
  pixKey: 'contato@tv-diversidade.com',
  pixBeneficiary: 'AILTON PAULO DOS SANTOS',
  pixBank: 'Banco Nubank (0260) - Ag: 0001 - Conta: 24334459-6',
  pixQrCodeUrl: '',
  pixPayload: '00020126480014BR.GOV.BCB.PIX0126contato@tv-diversidade.com5204000053039865406499.905802BR5923Ailton Paulo dos Santos6009SAO PAULO62140510WiwHdJ7uff63',
  cardPaymentLink: '',
  pagbankToken: '',
  logoUrl: '',
  contactEmail: 'tonydeluc@tv-diversidade.com',
  contactPhone: '+55 (21) 96672-5240',
  directorName: 'Professor Cineasta Tony de Luc',
  directorRole: 'Cineasta, Diretor de Fotografia, Produtor, Ator, Jornalista & Fundador do CINELAB',

  // Rodapé (Footer) & Dados Institucionais
  footerAboutText:
    'Escola e laboratório de formação profissional em Cinema e Realização Audiovisual. Metodologia de imersão de 3 meses (90 dias), 10 apostilas didáticas com cronograma progressivo, masterclasses exclusivas, avaliações contínuas e certificação reconhecida pelo mercado.',
  footerWorkloadBadge: '180h Carga Horária',
  footerOfficialBadge: 'Plataforma EAD Oficial',
  footerCopyright: '© 2026 CINELAB – Cinema & Audiovisual. Todos os direitos reservados.',
  footerDisclaimer: 'Regras pedagógicas validadas por cronograma • Certificação Profissional',
  companyCnpj: '48.912.834/0001-02',
  companyAddress: 'Rio de Janeiro, RJ • Plataforma Digital Nacional',
  instagramUrl: 'https://instagram.com/cinelab.cinema',
  youtubeUrl: 'https://www.youtube.com/@TVDIVERSIDADE',
  vimeoUrl: 'https://vimeo.com/cinelab',
  whatsappNumber: '+55 (21) 96672-5240',
  whatsappDefaultMessage: 'Olá Professor Tony de Luc! Gostaria de tirar dúvidas sobre o curso de cinema CINELAB.',

  // Contato & Suporte
  supportHours: 'Segunda a Sexta, das 09h às 17h (Atendimento Direto da Coordenação)',
  supportResponseTime: 'Resposta em até 24 horas úteis',
  contactAddress: 'Rio de Janeiro, RJ • Plataforma Digital de Alcance Nacional e Internacional',

  // Página & Perfil de Tony de Luc (Feitos, Currículo, Filmografia)
  tonyName: 'Professor Cineasta Tony de Luc',
  tonyRole: 'Cineasta, Diretor de Fotografia, Produtor, Ator, Jornalista & Fundador do CINELAB',
  tonyPhotoUrl: '/images/tony-de-luc.jpg',
  tonyTagline: 'O cinema não é apenas técnica ou equipamento; é a arte soberana de imprimir a verdade humana em cada enquadramento e contar histórias que ecoam no tempo.',
  tonyBioShort:
    'Cineasta, realizador audiovisual, roteirista e educador cinematográfico com mais de 20 anos de experiência em sets de filmagem, mostras de cinema e formação de centenas de novos diretores.',
  tonyBioFull:
    'Com uma trajetória forjada no pulsar vivo dos sets de gravação e na dedicação incansável à pedagogia da imagem em movimento, Tony de Luc é uma referência contemporânea na formação de cineastas e realizadores audiovisuais independentes.\n\nSua carreira abrange a direção geral de longas e curtas-metragens laureados em festivais no Brasil e no exterior, a direção de fotografia com ênfase no claro-escuro dramático e o desenvolvimento de métodos pedagógicos que eliminam o hermetismo acadêmico. No CINELAB, Tony desenhou pessoalmente a arquitetura das 10 etapas pedagógicas (90 dias) para garantir que cada aluno, do roteiro à pós-produção, sinta a real pulsação de uma equipe de cinema profissional.',
  tonyFeitos: [
    'Direção e roteiro de obras cinematográficas exibidas e premiadas em festivais e mostras de cinema no Brasil e no circuito internacional.',
    'FORMOU DEZENAS DE REALIZADORES, ROTEIRISTAS E DIRETORES DE FOTOGRAFIA E INSERIDOS NO MERCADO AUDIOVISUAL , PUBLICIDADE E STREAMING.',
    'Criação do método pedagógico CINELAB: formação intensiva de 3 meses (90 dias) calibrada em 10 etapas com foco em set, rigor estético e narrativa autoral.',
    'Direção de Fotografia e Iluminação Cênica em dezenas de produções ficcionais, videoclipes premiados e documentários autorais.',
    'Curador e jurado convidado em comissões de seleção de mostras de cinema independente e editais públicos de fomento cultural.',
    'Tony de Luc, participou ativamente da edição inaugural do CINEMANO - Mestres da Sétima Arte, na UFRJ no Fundão, como um dos palestrantes falando sobre o documentário e temáticas políticas e sociais pós-exibição do filme "A bolsa ou a vida" (de Silvio Tendler). Participação do Cineasta e Historiador, prof. Silvio Tendler. Palestrantes: Evandro Vieira Ourique (Professor da Escola de Comunicação da UFRJ) & Tony de Luc (Cineasta e Diretor da TV Diversidade)',
  ],
  tonyCurriculo: [
    'Graduação e Especialização em Cinema, Direção Cinematográfica e Realização Audiovisual.',
    'Formação Avançada em Roteiro Cinematográfico (Script Doctoring & Estruturas Narrativas Clássicas e Não-Lineares).',
    'Especialização em Direção de Fotografia, Óptica Cinematográfica, Teoria da Cor e Iluminação Dramática.',
    'Docência no Ensino Superior e em Cursos Livres de Cinema, Montagem e Narrativas Visuais.',
    'Pesquisador de Linguagem Cinematográfica, Montagem Analítica e Filosofia da Imagem em Movimento.',
    'Membro de Associações Profissionais de Cinema e Realizadores Audiovisuais Independentes.',
  ],
  tonyFilmografia: [
    {
      title: 'SINGULARIDADE',
      year: '2017',
      role: 'Diretor de Fotografia',
      type: 'Curta-Metragem - GENERO: ANIMAÇÃO',
      details: '',
    },
    {
      title: 'NELSON PEREIRA DOS SANTOS E O CINEMA NOVO',
      year: '2016',
      role: 'Diretor de Fotografia & Montagem',
      type: 'Curta-Metragem - GENERO: DOCUMENTÁRIO',
      details: '',
    },
    {
      title: 'HAP',
      year: '2016',
      role: 'Diretor de Fotografia',
      type: 'Curta-Metragem - GENERO: DRAMA',
      details: '',
    },
    {
      title: 'O DIÁRIO DE UM VICIADO ',
      year: '2012',
      role: 'Supervisão Geral Do Roteiro e Direção',
      type: 'Média-Metragem - GENERO: DRAMA POLICIAL',
      details: '',
    },
    {
      title: 'EXPRESSO TERMINAL (TERMINAL EXPRESS) ',
      year: '2006',
      role: 'Direção & Roteiro',
      type: 'Curta-Metragem - GENERO: SUSPENSE',
      details:
        'Prêmio De Melhor Roteiro Do Festival Curta 4.2 – Favorito Do Amazonas Film Festival De 2006 –No Festival de Cannes Participação em “Un CertainRegard”–  Prêmio De Melhor Direção E Roteiro No Festival Da França – Melhor Direção Em Portugal. Tendo Participado De Vários Outros Festivais No Brasil E No Exterior.',
    },
    {
      title: 'A POSSUÍDA ',
      year: '2006',
      role: 'Diretor de Fotografia',
      type: 'Curta-Metragem - GENERO: TERROR',
      details: 'Participou numa amostragem dentro do Festivais Curta Amazônico 4.2 em Manaus.',
    },
  ],
  tonySocialInstagram: 'https://instagram.com/tonydeluc.cinema',
  tonySocialLinkedin: 'https://linkedin.com/in/tonydeluc-cinema',
  tonySocialYoutube: 'https://youtube.com/@cinelabcinema',

  // Vídeo e Mensagem de Boas-Vindas aos Novos Alunos (Página Inicial)
  welcomeVideoUrl: '/uploads/videos/aula-CINELAB_INTRODU__O-1790768528604-650605.mp4',
  welcomeVideoPoster: '/uploads/images/img-LOCO_CINELAB___COLE-1790299254778-824285.png',
  welcomeMessageTitle: 'Mensagem de Boas-Vindas aos Novos Alunos',
  welcomeMessageText:
    'Caro estudante e futuro realizador,\n\nQuando idealizei o CINELAB, meu objetivo não foi criar mais um curso com aulas teóricas genéricas que você pode encontrar em qualquer canto da internet. Minha obsessão foi estruturar um laboratório de formação autêntica em 3 meses (90 dias), onde cada etapa coloca você frente a frente com a realidade artística, técnica e estética da indústria cinematográfica.\n\nNós estudamos o plano não como um conceito estático, mas como a menor unidade dramática da narrativa. Nós formatamos o roteiro não por burocracia, mas para que a equipe inteira consiga visualizar a luz, o som e o silêncio que o filme pede. E em cada uma das 10 etapas, minha equipe e eu estaremos acompanhando seu progresso, avaliando suas respostas e orientando seus exercícios.\n\nSe você carrega a urgência de contar histórias e quer dominar a gramática do cinema com rigor, seja muito bem-vindo ao CINELAB.',
};

export const initialModules: CourseModule[] = [
  {
    id: 1,
    number: 1,
    title: 'Linguagem Cinematográfica, Planos e Enquadramentos',
    subtitle: 'A gramática visual do cinema, escalas de plano, ângulos e movimentos de câmera',
    summary:
      'Fundamentos da narrativa visual, o plano cinematográfico como unidade mínima de sentido, enquadramento clássico e moderno, eixo de ação e psicologia do ponto de vista.',
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
    subtitle: 'Evolução tecnológica, estética e de linguagem da sétima arte e o cinema brasileiro',
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
    title: 'Direção de Cinema e Decupagem',
    subtitle: 'O olhar do diretor, mise-en-scène, direção de atores e plano de filmagem',
    summary:
      'Construção da encenação cinematográfica, trabalho com o elenco, elaboração do storyboard, decupagem técnica e liderança nos sets de filmagem.',
    order: 3,
    durationWeeks: 1.5,
    durationDays: 10,
    durationLabel: '10 dias',
    evalLeadDays: 3,
  },
  {
    id: 4,
    number: 4,
    title: 'Direção de Fotografia, Iluminação e Câmeras',
    subtitle: 'A luz como dramaturgia, lentes, sensores, fotometria e esquemas de três pontos',
    summary:
      'Princípios ópticos, temperatura de cor, relação de contraste, chiaroscuro, codecs de gravação (RAW, Log) e escolha de equipamentos para cada linguagem.',
    order: 4,
    durationWeeks: 1.3,
    durationDays: 9,
    durationLabel: '9 dias',
    evalLeadDays: 2,
  },
  {
    id: 5,
    number: 5,
    title: 'Som Direto, Microfonia e Desenho de Som',
    subtitle: 'Captação sonora no set, acústica, sound design, foley e mixagem 5.1/Stereo',
    summary:
      'O universo acústico do cinema: microfones direcionais, lapelas, gravação de ruídos de sala (room tone), camadas de ambiência e diálogo inteligível.',
    order: 5,
    durationWeeks: 1.5,
    durationDays: 10,
    durationLabel: '10 dias',
    evalLeadDays: 3,
  },
  {
    id: 6,
    number: 6,
    title: 'Direção de Arte, Cenografia e Figurino',
    subtitle: 'A estética do espaço fílmico, paletas cromáticas, adereços e caracterização',
    summary:
      'Concepção visual dos universos cinematográficos, semiótica das cores, ambientação de época e contemporânea, maquiagem e figurino integrados à dramaturgia.',
    order: 6,
    durationWeeks: 1,
    durationDays: 8,
    durationLabel: '8 dias',
    evalLeadDays: 2,
  },
  {
    id: 7,
    number: 7,
    title: 'Montagem, Edição e Ritmo Cinematográfico',
    subtitle: 'Teoria da montagem (Kuleshov, Eisenstein), continuidades e cortes invisíveis',
    summary:
      'A construção do tempo cinematográfico, elipses, montagem paralela, ritmo da cena, montagem de ação versus contemplação e fluxos no DaVinci Resolve e Premiere Pro.',
    order: 7,
    durationWeeks: 1.5,
    durationDays: 10,
    durationLabel: '10 dias',
    evalLeadDays: 3,
  },
  {
    id: 8,
    number: 8,
    title: 'Pós-produção, Efeitos Visuais e Color Grading',
    subtitle: 'Tratamento de cor primário e secundário, LUTs, chroma key e finalização DCP',
    summary:
      'Correção e gradação de cor com precisão técnica, espaço de cores ACES/Rec.709, masterização para streaming e cinema (DCP DCI 2K/4K).',
    order: 8,
    durationWeeks: 1.3,
    durationDays: 9,
    durationLabel: '9 dias',
    evalLeadDays: 2,
  },
  {
    id: 9,
    number: 9,
    title: 'Produção Executiva, Legislação e Orçamento',
    subtitle: 'Planejamento de produção, ordens do dia, Ancine, leis de incentivo e contratos',
    summary:
      'Planilhas orçamentárias profissionais, gestão de equipe de set, direitos autorais e de imagem, contratação sindical e viabilidade financeira de projetos.',
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
    subtitle: 'Concepção, rodagem, montagem e exibição do seu curta autoral de 1 a 5 minutos',
    summary:
      'Módulo integrador e prático. Realização e finalização do curta-metragem autoral e estudo analítico de obras consagradas do cinema independente brasileiro como referência estética e de produção. Entrega de roteiro, plano de filmagem, ficha técnica, arquivo final e conclusão da formação.',
    order: 10,
    durationWeeks: 1.5,
    durationDays: 10,
    durationLabel: '10 dias',
    evalLeadDays: 3,
  },
];

export const initialVideos: VideoLesson[] = initialModules.map((mod) => ({
  id: `vid-${mod.id}`,
  moduleId: mod.id,
  title: `VÍDEO – ETAPA 0${mod.id}: Apresentação da Apostila 0${mod.id}`,
  description: `Masterclass exclusiva de introdução aos conceitos fundamentais da Etapa ${mod.id}: ${mod.title}. Orientações para a leitura da apostila e execução dos exercícios.`,
  durationMinutes: 45,
  videoUrl: 'https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ', // Default video embed, customizable by admin
  thumbnailUrl: `https://images.unsplash.com/photo-${[
    '1485846234645-a62644f84728',
    '1478720568477-152d9b164e26',
    '1536440136628-849c177e76a1',
    '1518133910546-b6c2fb7d79e3',
    '1598488035139-bdbb2231ce04',
    '1513151233558-d860c5398176',
    '1574717024653-61fd2cf4d44d',
    '1535016120720-40c646be5580',
    '1486406146926-c627a92ad1ab',
    '1489599849927-2ee91cede3ba',
  ][mod.id - 1]}?auto=format&fit=crop&w=1200&q=80`,
  professorName: 'Professor Cineasta Tony de Luc',
  professorRole: 'Diretor de Cinema & Docente CINELAB',
}));

export const initialApostilas: Apostila[] = initialModules.map((mod) => ({
  id: `apostila-${mod.id}`,
  moduleId: mod.id,
  number: mod.id,
  title: `Apostila 0${mod.id}: ${mod.title}`,
  description: `Material didático completo e exclusivo do CINELAB para a Etapa 0${mod.id}. Textos técnicos, diagramas de set, decupagens comentadas e bibliografia especializada.`,
  pagesCount: 68 + mod.id * 4,
  pdfUrl: `/materiais/cinelab-apostila-${mod.id < 10 ? "0" + mod.id : mod.id}.pdf`,
  coverUrl: `https://images.unsplash.com/photo-${[
    '1485846234645-a62644f84728',
    '1478720568477-152d9b164e26',
    '1536440136628-849c177e76a1',
    '1518133910546-b6c2fb7d79e3',
    '1598488035139-bdbb2231ce04',
    '1513151233558-d860c5398176',
    '1574717024653-61fd2cf4d44d',
    '1535016120720-40c646be5580',
    '1486406146926-c627a92ad1ab',
    '1489599849927-2ee91cede3ba',
  ][mod.id - 1]}?auto=format&fit=crop&w=600&q=80`,
  fileSizeMb: 18.5,
}));

export const initialBonusApostilas: BonusApostila[] = [
  {
    id: 'bonus-01',
    number: 1,
    title: 'Glossário Completo de Planos',
    description:
      'Guia permanente de consulta técnica para decupagem cinematográfica, escalas de planos e movimentos de câmera.',
    pagesCount: 30,
    pdfUrl: '/materiais/cinelab-bonus-01-glossario-planos.pdf',
    coverUrl: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=600&q=80',
    unlockedByDefault: false,
    notes: 'Conteúdo bônus especial liberado para alunos a partir do Módulo 05.',
  },
  {
    id: 'bonus-02',
    number: 2,
    title: 'Glossário Completo de Roteiro',
    description:
      'Guia permanente de consulta dramatúrgica: da criação de premissa, storyline e sinopse à escaleta e roteiro final.',
    pagesCount: 29,
    pdfUrl: '/materiais/cinelab-bonus-02-glossario-roteiro.pdf',
    coverUrl: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=600&q=80',
    unlockedByDefault: false,
    notes: 'Conteúdo bônus especial liberado ao atingir a reta final da formação (Módulo 08).',
  },
];

export const initialActivities: ModuleActivity[] = [
  // Module 1
  {
    id: 'act-1-1',
    moduleId: 1,
    category: 'filme',
    title: 'Assistir e decupar: "Cidadão Kane" (Orson Welles, 1941)',
    content:
      'Assista prestando atenção especial ao uso do plano geral em profundidade de campo (deep focus), iluminação em chiaroscuro e ângulos holandeses/contra-plongées.',
    details: 'Faça anotações sobre ao menos 3 cenas-chave onde a escala de plano determina a relação de poder.',
  },
  {
    id: 'act-1-2',
    moduleId: 1,
    category: 'livro',
    title: 'Pesquisa Bibliográfica: "A Linguagem do Cinema" de Marcel Martin',
    content: 'Leitura recomendada dos capítulos 2 e 3 sobre a função dramática do enquadramento e do movimento de câmera.',
  },
  {
    id: 'act-1-3',
    moduleId: 1,
    category: 'pratica',
    title: 'Exercício Prático 01: Fotometria e Escala de Planos',
    content:
      'Fotografe ou grave 5 planos distintos com o mesmo personagem (Plano Geral, Plano Médio, Primeiro Plano, Close-up e Detalhe) respeitando a linha de olhar e o eixo de 180 graus.',
  },
  {
    id: 'act-1-4',
    moduleId: 1,
    category: 'observacao',
    title: 'Observações do Professor Cineasta Tony de Luc',
    content:
      'Não se precipite tentando movimentar a câmera sem motivo narrativo. Toda movimentação de câmera deve responder a uma necessidade emocional do personagem ou da história.',
  },

  // Module 2
  {
    id: 'act-2-1',
    moduleId: 2,
    category: 'filme',
    title: 'Análise de Estrutura: "Parasita" (Bong Joon-ho, 2019)',
    content:
      'Mapeie o ponto de virada (plot point 1), o ponto central (midpoint) e o clímax da narrativa, identificando como os objetos cênicos funcionam como metáforas visuais.',
  },
  {
    id: 'act-2-2',
    moduleId: 2,
    category: 'livro',
    title: 'Pesquisa: "Manual do Roteiro" (Syd Field) & "O Guia do Escritor" (Christopher Vogler)',
    content: 'Estudar os 12 passos da Jornada do Herói aplicados ao cinema moderno e os arquétipos dramáticos.',
  },
  {
    id: 'act-2-3',
    moduleId: 2,
    category: 'pratica',
    title: 'Criação de Cena: Subtexto e Conflito em Padrão Master Scenes',
    content:
      'Escreva uma cena de 2 páginas entre dois personagens com um conflito latente, onde o que eles dizem é o oposto do que eles realmente querem (uso intenso de subtexto).',
  },

  // Module 3
  {
    id: 'act-3-1',
    moduleId: 3,
    category: 'filme',
    title: 'Estudo de Direção: "O Poderoso Chefão" (Francis Ford Coppola, 1972)',
    content:
      'Analise a cena inicial de abertura (Amerigo Bonasera pedindo justiça a Don Corleone). Observe a distância focal, o timing dos silêncios e a entrada de luz.',
  },
  {
    id: 'act-3-2',
    moduleId: 3,
    category: 'pratica',
    title: 'Decupagem Técnica e Storyboard de 1 Página',
    content:
      'Pegue o roteiro escrito no Módulo 02 e faça a decupagem técnica completa: lista de planos, lentes sugeridas, posição de câmera e planta baixa de set.',
  },

  // Modules 4-10 sample activities
  {
    id: 'act-4-1',
    moduleId: 4,
    category: 'filme',
    title: 'Iluminação Naturalista: "Blade Runner 2049" (Roger Deakins)',
    content: 'Observar a difusão de silhuetas, luz rebatida e uso expressivo de cores monocromáticas em contraste com sombras profundas.',
  },
  {
    id: 'act-5-1',
    moduleId: 5,
    category: 'pratica',
    title: 'Gravação de Soundscape e Ruídos de Sala (Foley)',
    content: 'Grave 3 minutos de ruído ambiente limpo e 5 sons de passos em superfícies distintas usando um gravador ou celular com microfone lapela.',
  },
  {
    id: 'act-6-1',
    moduleId: 6,
    category: 'livro',
    title: 'Pesquisa: "A Psicologia das Cores no Cinema" de Patti Bellantoni',
    content: 'Identificar o significado das 6 paletas fundamentais em filmes de gênero (ficção científica, drama intimista, terror e thriller).',
  },
  {
    id: 'act-7-1',
    moduleId: 7,
    category: 'filme',
    title: 'Estudo de Ritmo: "Whiplash" (Damien Chazelle / Tom Cross)',
    content: 'Mapear a aceleração de cortes durante os ensaios musicais e o contraste com planos contemplativos no quarto de Andrew.',
  },
  {
    id: 'act-8-1',
    moduleId: 8,
    category: 'pratica',
    title: 'Color Grading: Correção Primária em DaVinci Resolve',
    content: 'Ajustar o balanço de branco, ponto de preto e contraste neutro de 3 tomadas brutas em formato Log ou RAW.',
  },
  {
    id: 'act-9-1',
    moduleId: 9,
    category: 'pratica',
    title: 'Orçamento Sintético em Padrão Ancine',
    content: 'Preencher uma planilha modelo com os 4 grandes grupos orçamentários: Desenvolvimento, Produção, Pós-produção e Distribuição.',
  },
  {
    id: 'act-10-1',
    moduleId: 10,
    category: 'pratica',
    title: 'Estratégia de Lançamento e Inscrições em Festivais',
    content: 'Elaborar a rota de festivais do seu projeto (festivais de estreia mundial, festivais qualificadores ao Oscar/Gramado e mostras regionais).',
  },
];

export const initialEvaluations: ModuleEvaluation[] = [
  {
    id: 'eval-1',
    moduleId: 1,
    moduleNumber: 1,
    title: 'Avaliação 01: Linguagem Cinematográfica, Planos e Enquadramentos',
    description:
      'Avaliação teórica e analítica da primeira etapa formativa. Responda às questões objetivas e discursivas para consolidar sua nota deste módulo.',
    maxScore: 10,
    minPassingScore: 7,
    questions: [
      {
        id: 'q1-1',
        type: 'multiple_choice',
        prompt: 'Qual é a função primordial da regra do "Eixo de 180 Graus" em uma cena de diálogo entre dois personagens?',
        options: [
          'Garantir que a iluminação seja idêntica em ambos os lados da sala.',
          'Manter a consistência espacial da cena e a direção do olhar dos personagens para não desorientar o espectador.',
          'Permitir que a câmera dê giros contínuos de 360 graus sem necessitar de cortes.',
          'Economizar tempo de filmagem dispensando o uso de contra-planos.',
        ],
        correctOptionIndex: 1,
        weight: 2.5,
        explanation:
          'O eixo de 180° traça uma linha imaginária entre os interlocutores. Posicionar as câmeras sempre do mesmo lado dessa linha garante a continuidade espacial e a direção do olhar.',
      },
      {
        id: 'q1-2',
        type: 'true_false',
        prompt:
          'No enquadramento cinematográfico, o "Plano Holandês" (Dutch Angle ou ângulo inclinado) é tradicionalmente empregado para transmitir estabilidade, equilíbrio e sensação de paz absoluta.',
        options: ['Verdadeiro', 'Falso'],
        correctOptionIndex: 1,
        weight: 2.5,
        explanation:
          'Falso. O Dutch Angle inclina a linha do horizonte na câmera para gerar estranheza, tensão psicológica, loucura ou perigo iminente.',
      },
      {
        id: 'q1-3',
        type: 'multiple_choice',
        prompt: 'A respeito da escala de planos, assinale a alternativa que define com precisão o "Primeiro Plano" (Close-up):',
        options: [
          'Mostra o personagem da cintura para cima, evidenciando principalmente a gestualidade corporal com o ambiente.',
          'Enquadra o personagem do peito para cima ou focado no rosto, enfatizando expressões faciais, emoções íntimas e reações.',
          'Enquadra apenas um objeto pontual minúsculo, como uma chave na fechadura ou um olho piscando.',
          'Mostra o personagem de corpo inteiro, estabelecendo sua posição física no cenário.',
        ],
        correctOptionIndex: 1,
        weight: 2.5,
        explanation:
          'O Close-up foca a atenção na intimidade psicológica do personagem, privilegiando o olhar e as sutilezas da expressão facial.',
      },
      {
        id: 'q1-4',
        type: 'discursive',
        prompt:
          'Explique de que forma a escolha de uma lente grande-angular (ex: 24mm) versus uma teleobjetiva (ex: 85mm ou 135mm) altera a percepção de espaço, profundidade e a relação psicológica entre o personagem e seu ambiente.',
        weight: 2.5,
        explanation:
          'A grande-angular expande o campo de visão e acentua a sensação de distância e distorção nos cantos, contextualizando o ambiente ao redor do personagem. Já a teleobjetiva comprime os planos de fundo e primeiro plano, isolando o personagem com rasa profundidade de campo e intimidade ótica.',
      },
    ],
  },
  {
    id: 'eval-2',
    moduleId: 2,
    moduleNumber: 2,
    title: 'Avaliação 02: Roteiro e Narrativa Audiovisual',
    description: 'Teste de assimilação sobre dramaturgia, paradigma de 3 atos, conflito e formatação cinematográfica.',
    maxScore: 10,
    minPassingScore: 7,
    questions: [
      {
        id: 'q2-1',
        type: 'multiple_choice',
        prompt: 'No paradigma clássico de Syd Field, o "Inciting Incident" (Incidente Incitante) tem como papel principal:',
        options: [
          'Concluir a história após o clímax final.',
          'Apresentar a ficha técnica e os créditos do filme.',
          'Perturbar o equilíbrio inicial do mundo comum do protagonista, obrigando-o a tomar uma decisão e iniciar a jornada dramática.',
          'Explicar em voz-over todo o passado de infância do personagem.',
        ],
        correctOptionIndex: 2,
        weight: 3.0,
      },
      {
        id: 'q2-2',
        type: 'true_false',
        prompt:
          'No padrão internacional Master Scenes, rubricas de cena não devem descrever pensamentos internos abstratos dos personagens que não possam ser fotografados ou captados pelo microfone.',
        options: ['Verdadeiro', 'Falso'],
        correctOptionIndex: 0,
        weight: 3.0,
      },
      {
        id: 'q2-3',
        type: 'discursive',
        prompt:
          'Defina o conceito de "Subtexto" em um diálogo cinematográfico e apresente um exemplo breve de como duas falas aparentemente banais podem esconder uma grave ameaça ou revelação íntima.',
        weight: 4.0,
      },
    ],
  },
  // Subsequent evaluations for 3-10
  ...Array.from({ length: 8 }, (_, i) => {
    const num = i + 3;
    const mod = initialModules[num - 1];
    return {
      id: `eval-${num}`,
      moduleId: num,
      moduleNumber: num,
      title: `Avaliação 0${num}: ${mod.title}`,
      description: `Avaliação do Módulo 0${num}. Aprovada quando atingida a média mínima de 7.0 pontos.`,
      maxScore: 10,
      minPassingScore: 7,
      questions: [
        {
          id: `q${num}-1`,
          type: 'multiple_choice' as const,
          prompt: `Em relação aos fundamentos práticos e conceituais estudados no Módulo 0${num} (${mod.title}), assinale a afirmativa correta:`,
          options: [
            `A aplicação técnica do Módulo 0${num} depende da coerência com a narrativa geral proposta pelo diretor e roteirista.`,
            `Não há relação entre as escolhas estéticas do Módulo 0${num} e o roteiro cinematográfico.`,
            `Os parâmetros devem ser decididos aleatoriamente no momento da gravação.`,
            `A tecnologia digital eliminou a necessidade de planejamento prévio para esta etapa.`,
          ],
          correctOptionIndex: 0,
          weight: 5.0,
        },
        {
          id: `q${num}-2`,
          type: 'discursive' as const,
          prompt: `Apresente uma reflexão crítica articulando os desafios práticos de execução e as tomadas de decisão que um profissional enfrenta na etapa de ${mod.title}.`,
          weight: 5.0,
        },
      ],
    };
  }),
];

export const initialUsers: User[] = [
  {
    id: 'user-admin',
    name: 'Professor Cineasta Tony de Luc',
    email: 'studiodeluc@gmail.com',
    phone: '+55 11 98888-0000',
    document: '00.000.000/0001-99',
    role: 'admin',
    createdAt: '2026-01-10T10:00:00Z',
  },
  {
    id: 'user-admin-alias',
    name: 'Professor Cineasta Tony de Luc (Coordenação)',
    email: 'admin@cinelab.edu.br',
    phone: '+55 11 98888-0000',
    document: '00.000.000/0001-99',
    role: 'admin',
    createdAt: '2026-01-10T10:00:00Z',
  },
  {
    id: 'user-student-demo',
    name: 'Lucas Mendonça de Oliveira',
    email: 'aluno@cinelab.edu.br',
    phone: '+55 11 97654-3210',
    document: '389.482.198-40',
    role: 'student',
    createdAt: '2026-08-20T14:30:00Z',
    matricula: 'CNL-2026-4819',
    paymentMethod: 'Cartão de Crédito (12x)',
    difficulties: 'Decupagem técnica de lentes e regra dos 180°',
    averageGrade: 9.5,
    pedagogicalNotes: 'Excelente domínio de linguagem cinematográfica e olhar de composição.',
  },
  {
    id: 'user-student-mariana',
    name: 'Mariana Duarte Costa',
    email: 'mariana.costa@gmail.com',
    phone: '+55 21 98765-4321',
    document: '421.890.112-55',
    role: 'student',
    createdAt: '2026-08-22T09:15:00Z',
    matricula: 'CNL-2026-5102',
    paymentMethod: 'PIX À Vista',
    difficulties: 'Dificuldade em iluminação de três pontos e cálculo de Kelvin',
    averageGrade: 5.4,
    pedagogicalNotes: 'Precisa de reforço nas aulas práticas de iluminação e refazer a avaliação 03.',
  },
  {
    id: 'user-student-rodrigo',
    name: 'Rodrigo Alves Silveira',
    email: 'rodrigo.cine@yahoo.com.br',
    phone: '+55 31 99123-8877',
    document: '298.761.503-22',
    role: 'student',
    createdAt: '2026-08-23T11:40:00Z',
    matricula: 'CNL-2026-5388',
    paymentMethod: 'Boleto Bancário',
    difficulties: 'Dificuldade em formatação master scenes no roteiro',
    averageGrade: 7.8,
    pedagogicalNotes: 'Boa participação nas masterclasses, roteiro necessita de ajustes de formatação.',
  },
];

export const initialEnrollments: Enrollment[] = [
  {
    id: 'enr-1',
    enrollmentNumber: 'CNL-2026-4819',
    studentId: 'user-student-demo',
    studentName: 'Lucas Mendonça de Oliveira',
    studentEmail: 'aluno@cinelab.edu.br',
    status: 'active',
    enrolledAt: '2026-08-20T14:30:00Z',
    activatedAt: '2026-08-20T14:35:00Z',
    paymentId: 'pay-1',
  },
  {
    id: 'enr-2',
    enrollmentNumber: 'CNL-2026-5102',
    studentId: 'user-student-mariana',
    studentName: 'Mariana Duarte Costa',
    studentEmail: 'mariana.costa@gmail.com',
    status: 'active',
    enrolledAt: '2026-08-22T09:15:00Z',
    activatedAt: '2026-08-22T09:20:00Z',
    paymentId: 'pay-2',
  },
  {
    id: 'enr-3',
    enrollmentNumber: 'CNL-2026-5388',
    studentId: 'user-student-rodrigo',
    studentName: 'Rodrigo Alves Silveira',
    studentEmail: 'rodrigo.cine@yahoo.com.br',
    status: 'active',
    enrolledAt: '2026-08-23T11:40:00Z',
    activatedAt: '2026-08-23T11:45:00Z',
    paymentId: 'pay-3',
  },
];

export const initialPayments: Payment[] = [
  {
    id: 'pay-1',
    studentId: 'user-student-demo',
    enrollmentId: 'enr-1',
    method: 'credit_card',
    amount: 499.90,
    installments: 6,
    installmentValue: 83.31,
    status: 'approved',
    cardBrand: 'Mastercard',
    lastFour: '8912',
    createdAt: '2026-08-20T14:30:00Z',
    approvedAt: '2026-08-20T14:35:00Z',
  },
  {
    id: 'pay-2',
    studentId: 'user-student-mariana',
    enrollmentId: 'enr-2',
    method: 'pix',
    amount: 499.90,
    status: 'approved',
    pixKey: 'contato@tv-diversidade.com',
    createdAt: '2026-08-22T09:15:00Z',
    approvedAt: '2026-08-22T09:20:00Z',
  },
  {
    id: 'pay-3',
    studentId: 'user-student-rodrigo',
    enrollmentId: 'enr-3',
    method: 'boleto',
    amount: 499.90,
    status: 'approved',
    createdAt: '2026-08-23T11:40:00Z',
    approvedAt: '2026-08-23T11:45:00Z',
  },
];
