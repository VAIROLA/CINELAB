import { ApostilaExtraVideo } from '../types/index.js';

export interface CanonicalExtraVideoItem {
  slot: 1 | 2;
  title: string;
  videoUrl: string;
  thumbnailUrl: string;
  durationHours: number;
  durationMinutes: number;
  durationSeconds: number;
  totalDurationSeconds: number;
  durationLabel: string;
  description: string;
  professorNotes: string;
}

export const CANONICAL_EXTRA_VIDEOS_MAP: Record<string, [CanonicalExtraVideoItem, CanonicalExtraVideoItem]> = {
  // Módulo 01: Introdução ao Cinema e à Linguagem Audiovisual
  'mod-1': [
    {
      slot: 1,
      title: 'Vídeo Extra 01: Introdução ao Cinema e à Linguagem Audiovisual & Análise Prática - M- 1.1',
      videoUrl: 'https://www.youtube.com/watch?v=q1U0eKOOwsQ',
      thumbnailUrl: 'https://img.youtube.com/vi/q1U0eKOOwsQ/hqdefault.jpg',
      durationHours: 0,
      durationMinutes: 18,
      durationSeconds: 0,
      totalDurationSeconds: 1080,
      durationLabel: '00h 18m 00s',
      description: 'Análise técnica e decupagem comentada pelo Professor Cineasta Tony de Luc para aprofundar os conceitos teóricos desta apostila.',
      professorNotes: 'O aluno deve observar como a história é contada principalmente através das imagens, expressões faciais, gestos e movimentos dos personagens, já que o filme pertence ao período do cinema mudo. Deve prestar atenção aos enquadramentos, composição das cenas, montagem, ritmo, atuação corporal e uso da música para perceber como o cinema consegue transmitir emoções e narrar acontecimentos sem depender de diálogos falados.',
    },
    {
      slot: 2,
      title: 'Vídeo Extra 02: Introdução ao Cinema e à Linguagem Audiovisual & Análise Prática - M- 1.2',
      videoUrl: 'https://www.youtube.com/watch?v=i15UCTIdfwI',
      thumbnailUrl: 'https://img.youtube.com/vi/i15UCTIdfwI/hqdefault.jpg',
      durationHours: 0,
      durationMinutes: 24,
      durationSeconds: 0,
      totalDurationSeconds: 1440,
      durationLabel: '00h 24m 00s',
      description: 'Exercício prático de aplicação em set de filmagem com demonstração passo a passo da metodologia do CINELAB.',
      professorNotes: 'O aluno deve observar como imagem, movimento, montagem, ritmo e som trabalham juntos para construir a narrativa. Deve prestar atenção especialmente às máquinas, ao ambiente da fábrica, aos movimentos repetitivos dos trabalhadores, aos enquadramentos, à montagem e aos efeitos sonoros, percebendo como Chaplin utiliza a linguagem audiovisual não apenas para contar uma história, mas também para transmitir ideias e críticas através das imagens.',
    },
  ],

  // Módulo 02: História do Cinema
  'mod-2': [
    {
      slot: 1,
      title: 'Vídeo Extra 01: História do Cinema & Análise Prática - M- 2.1',
      videoUrl: 'https://www.youtube.com/watch?v=qawVtd32DOQ',
      thumbnailUrl: 'https://img.youtube.com/vi/qawVtd32DOQ/hqdefault.jpg',
      durationHours: 0,
      durationMinutes: 18,
      durationSeconds: 0,
      totalDurationSeconds: 1080,
      durationLabel: '00h 18m 00s',
      description: 'Análise técnica e decupagem comentada pelo Professor Cineasta Tony de Luc para aprofundar os conceitos teóricos desta apostila.',
      professorNotes: 'O aluno deve observar o nascimento do cinema e o impacto visual da primeira exibição pública dos Irmãos Lumière com a chegada do trem na estação (1895). Analisar a profundidade de campo natural, a perspectiva diagonal da locomotiva aproximando-se da tela e o choque realista causado na plateia da época.',
    },
    {
      slot: 2,
      title: 'Vídeo Extra 02: História do Cinema & Análise Prática - M- 2.2',
      videoUrl: 'https://www.youtube.com/watch?v=UHbpgsD8zCM',
      thumbnailUrl: 'https://img.youtube.com/vi/UHbpgsD8zCM/hqdefault.jpg',
      durationHours: 0,
      durationMinutes: 24,
      durationSeconds: 0,
      totalDurationSeconds: 1440,
      durationLabel: '00h 24m 00s',
      description: 'Exercício prático de aplicação em set de filmagem com demonstração passo a passo da metodologia do CINELAB.',
      professorNotes: 'Identifique os efeitos utilizados e tentar imaginar como poderiam ter sido realizados na época. O aluno deve analisar as trucagens ópticas de Georges Méliès (parada de câmera, sobreposição e fusão) e compreender como os primeiros efeitos especiais moldaram a imaginação e a técnica cinematográfica mundial.',
    },
  ],

  // Módulo 03: Roteiro e Criação de Personagens
  'mod-3': [
    {
      slot: 1,
      title: 'Vídeo Extra 01: Roteiro e Criação de Personagens & Análise Prática - M- 3.1',
      videoUrl: 'https://www.youtube.com/watch?v=q1U0eKOOwsQ',
      thumbnailUrl: 'https://img.youtube.com/vi/q1U0eKOOwsQ/hqdefault.jpg',
      durationHours: 0,
      durationMinutes: 18,
      durationSeconds: 0,
      totalDurationSeconds: 1080,
      durationLabel: '00h 18m 00s',
      description: 'Análise técnica e decupagem comentada pelo Professor Cineasta Tony de Luc para aprofundar os conceitos teóricos desta apostila.',
      professorNotes: 'O aluno deve observar a construção da curva dramática em 3 atos, o incidente incitante e a motivação interna dos personagens, analisando como o subtexto guia cada diálogo e decisão na cena.',
    },
    {
      slot: 2,
      title: 'Vídeo Extra 02: Roteiro e Criação de Personagens & Análise Prática - M- 3.2',
      videoUrl: 'https://www.youtube.com/watch?v=i15UCTIdfwI',
      thumbnailUrl: 'https://img.youtube.com/vi/i15UCTIdfwI/hqdefault.jpg',
      durationHours: 0,
      durationMinutes: 24,
      durationSeconds: 0,
      totalDurationSeconds: 1440,
      durationLabel: '00h 24m 00s',
      description: 'Exercício prático de aplicação em set de filmagem com demonstração passo a passo da metodologia do CINELAB.',
      professorNotes: 'O aluno deve atentar para a formatação técnica internacional de roteiro (cabeçalho Master Scenes, rubrica no presente, transição e diálogo), identificando a economia descritiva e o ritmo da leitura visual.',
    },
  ],

  // Módulo 04: Direção e Direção de Atores
  'mod-4': [
    {
      slot: 1,
      title: 'Vídeo Extra 01: Direção e Direção de Atores & Análise Prática - M- 4.1',
      videoUrl: 'https://www.youtube.com/watch?v=qawVtd32DOQ',
      thumbnailUrl: 'https://img.youtube.com/vi/qawVtd32DOQ/hqdefault.jpg',
      durationHours: 0,
      durationMinutes: 18,
      durationSeconds: 0,
      totalDurationSeconds: 1080,
      durationLabel: '00h 18m 00s',
      description: 'Análise técnica e decupagem comentada pelo Professor Cineasta Tony de Luc para aprofundar os conceitos teóricos desta apostila.',
      professorNotes: 'O aluno deve observar a interação entre o diretor e o elenco, prestando atenção à comunicação por ações físicas e verbos ativos, em vez de exigir sentimentos abstratos dos atores.',
    },
    {
      slot: 2,
      title: 'Vídeo Extra 02: Direção e Direção de Atores & Análise Prática - M- 4.2',
      videoUrl: 'https://www.youtube.com/watch?v=UHbpgsD8zCM',
      thumbnailUrl: 'https://img.youtube.com/vi/UHbpgsD8zCM/hqdefault.jpg',
      durationHours: 0,
      durationMinutes: 24,
      durationSeconds: 0,
      totalDurationSeconds: 1440,
      durationLabel: '00h 24m 00s',
      description: 'Exercício prático de aplicação em set de filmagem com demonstração passo a passo da metodologia do CINELAB.',
      professorNotes: 'O aluno deve acompanhar a escolha do ponto de vista da câmera (POV), a marcação cênica (blocking) e a relação do enquadramento com a tensão psicológica dos personagens na cena.',
    },
  ],

  // Módulo 05: Fotografia, Câmera e Iluminação
  'mod-5': [
    {
      slot: 1,
      title: 'Vídeo Extra 01: Fotografia, Câmera e Iluminação & Análise Prática - M- 5.1',
      videoUrl: '/videos/cinelab-intro-apresentacao.mp4',
      thumbnailUrl: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=800&q=80',
      durationHours: 0,
      durationMinutes: 18,
      durationSeconds: 0,
      totalDurationSeconds: 1080,
      durationLabel: '00h 18m 00s',
      description: 'Análise técnica e decupagem comentada pelo Professor Cineasta Tony de Luc para aprofundar os conceitos teóricos desta apostila.',
      professorNotes: 'O aluno deve observar o sistema clássico de iluminação em três pontos (Key Light, Fill Light e Backlight), além do uso de sombras, temperatura de cor e profundidade de campo.',
    },
    {
      slot: 2,
      title: 'Vídeo Extra 02: Fotografia, Câmera e Iluminação & Análise Prática - M- 5.2',
      videoUrl: '/videos/cinelab-intro-apresentacao.mp4',
      thumbnailUrl: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=800&q=80',
      durationHours: 0,
      durationMinutes: 24,
      durationSeconds: 0,
      totalDurationSeconds: 1440,
      durationLabel: '00h 24m 00s',
      description: 'Exercício prático de aplicação em set de filmagem com demonstração passo a passo da metodologia do CINELAB.',
      professorNotes: 'O aluno deve analisar os movimentos de câmera (panorâmica, travelling, dolly e câmera na mão), percebendo como a fluidez do enquadramento dita o ritmo emocional do espectador.',
    },
  ],

  // Módulo 06: Som e Trilha Sonora
  'mod-6': [
    {
      slot: 1,
      title: 'Vídeo Extra 01: Som e Trilha Sonora & Análise Prática - M- 6.1',
      videoUrl: '/videos/cinelab-intro-apresentacao.mp4',
      thumbnailUrl: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=800&q=80',
      durationHours: 0,
      durationMinutes: 18,
      durationSeconds: 0,
      totalDurationSeconds: 1080,
      durationLabel: '00h 18m 00s',
      description: 'Análise técnica e decupagem comentada pelo Professor Cineasta Tony de Luc para aprofundar os conceitos teóricos desta apostila.',
      professorNotes: 'O aluno deve identificar a captação de diálogo com microfone direcional (Boom), a captação do som ambiente (room tone) e a importância do silêncio como elemento dramático.',
    },
    {
      slot: 2,
      title: 'Vídeo Extra 02: Som e Trilha Sonora & Análise Prática - M- 6.2',
      videoUrl: '/videos/cinelab-intro-apresentacao.mp4',
      thumbnailUrl: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800&q=80',
      durationHours: 0,
      durationMinutes: 24,
      durationSeconds: 0,
      totalDurationSeconds: 1440,
      durationLabel: '00h 24m 00s',
      description: 'Exercício prático de aplicação em set de filmagem com demonstração passo a passo da metodologia do CINELAB.',
      professorNotes: 'O aluno deve observar a construção das camadas sonoras (foley, efeitos sonoros diegéticos e não-diegéticos) e a harmonia entre trilha musical e diálogos.',
    },
  ],

  // Módulo 07: Montagem e Pós-Produção
  'mod-7': [
    {
      slot: 1,
      title: 'Vídeo Extra 01: Montagem e Pós-Produção & Análise Prática - M- 7.1',
      videoUrl: '/videos/cinelab-intro-apresentacao.mp4',
      thumbnailUrl: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=800&q=80',
      durationHours: 0,
      durationMinutes: 18,
      durationSeconds: 0,
      totalDurationSeconds: 1080,
      durationLabel: '00h 18m 00s',
      description: 'Análise técnica e decupagem comentada pelo Professor Cineasta Tony de Luc para aprofundar os conceitos teóricos desta apostila.',
      professorNotes: 'O aluno deve observar a regra dos 180 graus, cortes em ação, elipses temporais e a montagem paralela, percebendo como o corte cria sentido novo entre duas tomadas.',
    },
    {
      slot: 2,
      title: 'Vídeo Extra 02: Montagem e Pós-Produção & Análise Prática - M- 7.2',
      videoUrl: '/videos/cinelab-intro-apresentacao.mp4',
      thumbnailUrl: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=800&q=80',
      durationHours: 0,
      durationMinutes: 24,
      durationSeconds: 0,
      totalDurationSeconds: 1440,
      durationLabel: '00h 24m 00s',
      description: 'Exercício prático de aplicação em set de filmagem com demonstração passo a passo da metodologia do CINELAB.',
      professorNotes: 'O aluno deve atentar para a correção de cor, curvas de gama e color grading estético, unificando a identidade visual das diárias de filmagem.',
    },
  ],

  // Módulo 08: Produção Executiva e Planejamento
  'mod-8': [
    {
      slot: 1,
      title: 'Vídeo Extra 01: Produção Executiva e Planejamento & Análise Prática - M- 8.1',
      videoUrl: '/videos/cinelab-intro-apresentacao.mp4',
      thumbnailUrl: 'https://images.unsplash.com/photo-1535016120720-40c646be5580?auto=format&fit=crop&w=800&q=80',
      durationHours: 0,
      durationMinutes: 18,
      durationSeconds: 0,
      totalDurationSeconds: 1080,
      durationLabel: '00h 18m 00s',
      description: 'Análise técnica e decupagem comentada pelo Professor Cineasta Tony de Luc para aprofundar os conceitos teóricos desta apostila.',
      professorNotes: 'O aluno deve observar a planilha orçamentária por etapas (desenvolvimento, pré-produção, produção e pós), cronograma de filmagem e gestão de equipe.',
    },
    {
      slot: 2,
      title: 'Vídeo Extra 02: Produção Executiva e Planejamento & Análise Prática - M- 8.2',
      videoUrl: '/videos/cinelab-intro-apresentacao.mp4',
      thumbnailUrl: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=800&q=80',
      durationHours: 0,
      durationMinutes: 24,
      durationSeconds: 0,
      totalDurationSeconds: 1440,
      durationLabel: '00h 24m 00s',
      description: 'Exercício prático de aplicação em set de filmagem com demonstração passo a passo da metodologia do CINELAB.',
      professorNotes: 'O aluno deve analisar a estrutura da Ordem do Dia (Call Sheet), autorizações de locação, direitos de imagem e logística diária de produção no set.',
    },
  ],

  // Módulo 09: Distribuição, Festivais e Mercado Audiovisual
  'mod-9': [
    {
      slot: 1,
      title: 'Vídeo Extra 01: Distribuição, Festivais e Mercado Audiovisual & Análise Prática - M- 9.1',
      videoUrl: '/videos/cinelab-intro-apresentacao.mp4',
      thumbnailUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80',
      durationHours: 0,
      durationMinutes: 18,
      durationSeconds: 0,
      totalDurationSeconds: 1080,
      durationLabel: '00h 18m 00s',
      description: 'Análise técnica e decupagem comentada pelo Professor Cineasta Tony de Luc para aprofundar os conceitos teóricos desta apostila.',
      professorNotes: 'O aluno deve observar os circuitos de festivais nacionais e internacionais, janelas de exibição, plataformas de streaming e preparação de press kit oficial.',
    },
    {
      slot: 2,
      title: 'Vídeo Extra 02: Distribuição, Festivais e Mercado Audiovisual & Análise Prática - M- 9.2',
      videoUrl: '/videos/cinelab-intro-apresentacao.mp4',
      thumbnailUrl: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=800&q=80',
      durationHours: 0,
      durationMinutes: 24,
      durationSeconds: 0,
      totalDurationSeconds: 1440,
      durationLabel: '00h 24m 00s',
      description: 'Exercício prático de aplicação em set de filmagem com demonstração passo a passo da metodologia do CINELAB.',
      professorNotes: 'O aluno deve atentar para a apresentação de projetos (Pitch Deck de 5 a 10 minutos), logline comercial, sinopse de venda e negociação com distribuidoras.',
    },
  ],

  // Módulo 10: Projeto Final – Realização de Curta-Metragem
  'mod-10': [
    {
      slot: 1,
      title: 'Vídeo Extra 01: Projeto Final & Análise Prática - M- 10.1',
      videoUrl: '/videos/cinelab-intro-apresentacao.mp4',
      thumbnailUrl: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=800&q=80',
      durationHours: 0,
      durationMinutes: 18,
      durationSeconds: 0,
      totalDurationSeconds: 1080,
      durationLabel: '00h 18m 00s',
      description: 'Análise técnica e decupagem comentada pelo Professor Cineasta Tony de Luc para aprofundar os conceitos teóricos desta apostila.',
      professorNotes: 'O aluno deve revisar o checklist completo para filmagem do curta-metragem: roteiro finalizado, decupagem plano a plano, plano de filmagem e testes de equipamento.',
    },
    {
      slot: 2,
      title: 'Vídeo Extra 02: Projeto Final & Análise Prática - M- 10.2',
      videoUrl: '/videos/cinelab-intro-apresentacao.mp4',
      thumbnailUrl: 'https://images.unsplash.com/photo-1518133910546-b6c2fb7d79e3?auto=format&fit=crop&w=800&q=80',
      durationHours: 0,
      durationMinutes: 24,
      durationSeconds: 0,
      totalDurationSeconds: 1440,
      durationLabel: '00h 24m 00s',
      description: 'Exercício prático de aplicação em set de filmagem com demonstração passo a passo da metodologia do CINELAB.',
      professorNotes: 'O aluno deve acompanhar as diretrizes para exportação do Master em ProRes/H.264, trailer oficial, cartaz de divulgação e submissão para a Mostra CINELAB.',
    },
  ],

  // BÔNUS 01: Glossário Completo de Planos
  'bonus-1': [
    {
      slot: 1,
      title: 'Vídeo Extra 01: Glossário Completo de Planos & Análise Prática - B- 1.1',
      videoUrl: '/videos/cinelab-intro-apresentacao.mp4',
      thumbnailUrl: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=800&q=80',
      durationHours: 0,
      durationMinutes: 18,
      durationSeconds: 0,
      totalDurationSeconds: 1080,
      durationLabel: '00h 18m 00s',
      description: 'Análise técnica e decupagem comentada pelo Professor Cineasta Tony de Luc para aprofundar os conceitos teóricos desta apostila bônus.',
      professorNotes: 'O aluno deve analisar a decupagem de planos e movimentos de câmera fundamentais, compreendendo como a escala do enquadramento afeta a empatia e a conexão emocional do público.',
    },
    {
      slot: 2,
      title: 'Vídeo Extra 02: Glossário Completo de Planos & Análise Prática - B- 1.2',
      videoUrl: '/videos/cinelab-intro-apresentacao.mp4',
      thumbnailUrl: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=800&q=80',
      durationHours: 0,
      durationMinutes: 24,
      durationSeconds: 0,
      totalDurationSeconds: 1440,
      durationLabel: '00h 24m 00s',
      description: 'Exercício prático de aplicação em set de filmagem com demonstração passo a passo da metodologia do CINELAB.',
      professorNotes: 'Exercício prático de aplicação em decupagem técnica: observe a transição entre plano geral e primeiro plano mantendo a continuidade do olhar do ator.',
    },
  ],

  // BÔNUS 02: Glossário Completo de Roteiro
  'bonus-2': [
    {
      slot: 1,
      title: 'Vídeo Extra 01: Glossário Completo de Roteiro & Análise Prática - B- 2.1',
      videoUrl: '/videos/cinelab-intro-apresentacao.mp4',
      thumbnailUrl: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=800&q=80',
      durationHours: 0,
      durationMinutes: 18,
      durationSeconds: 0,
      totalDurationSeconds: 1080,
      durationLabel: '00h 18m 00s',
      description: 'Análise técnica e decupagem comentada pelo Professor Cineasta Tony de Luc para aprofundar os conceitos teóricos desta apostila bônus.',
      professorNotes: 'O aluno deve observar a estrutura narrativa e formatação canônica de roteiro, focando na economia de rubricas e na construção de diálogos dinâmicos.',
    },
    {
      slot: 2,
      title: 'Vídeo Extra 02: Glossário Completo de Roteiro & Análise Prática - B- 2.2',
      videoUrl: '/videos/cinelab-intro-apresentacao.mp4',
      thumbnailUrl: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=800&q=80',
      durationHours: 0,
      durationMinutes: 24,
      durationSeconds: 0,
      totalDurationSeconds: 1440,
      durationLabel: '00h 24m 00s',
      description: 'Exercício prático de aplicação em set de filmagem com demonstração passo a passo da metodologia do CINELAB.',
      professorNotes: 'Aplicação prática de storyline, sinopse e escaleta: identifique a progressão do clímax dramático e os pontos de virada da narrativa.',
    },
  ],

  // BÔNUS 03: Análise Fílmica
  'bonus-3': [
    {
      slot: 1,
      title: 'Vídeo Extra 01: Análise Fílmica & Análise Prática - B- 3.1',
      videoUrl: '/videos/cinelab-intro-apresentacao.mp4',
      thumbnailUrl: 'https://images.unsplash.com/photo-1478720568477-152d9b164e26?auto=format&fit=crop&w=800&q=80',
      durationHours: 0,
      durationMinutes: 18,
      durationSeconds: 0,
      totalDurationSeconds: 1080,
      durationLabel: '00h 18m 00s',
      description: 'Análise técnica e decupagem comentada pelo Professor Cineasta Tony de Luc para aprofundar os conceitos teóricos desta apostila bônus.',
      professorNotes: 'Análise crítica e decupagem plano a plano de obras consagradas do cinema mundial: identifique escolhas de lentes e ritmo de corte.',
    },
    {
      slot: 2,
      title: 'Vídeo Extra 02: Análise Fílmica & Análise Prática - B- 3.2',
      videoUrl: '/videos/cinelab-intro-apresentacao.mp4',
      thumbnailUrl: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=800&q=80',
      durationHours: 0,
      durationMinutes: 24,
      durationSeconds: 0,
      totalDurationSeconds: 1440,
      durationLabel: '00h 24m 00s',
      description: 'Exercício prático de aplicação em set de filmagem com demonstração passo a passo da metodologia do CINELAB.',
      professorNotes: 'Exercício de desconstrução da linguagem cinematográfica: mapeie a relação de causa e efeito entre a mise-en-scène e o subtexto dos personagens.',
    },
  ],
};

export function getCanonicalExtraVideos(moduleIdOrNumber: number | string, isBonus?: boolean): [CanonicalExtraVideoItem, CanonicalExtraVideoItem] {
  const num = typeof moduleIdOrNumber === 'string' ? parseInt(moduleIdOrNumber.replace(/\D/g, ''), 10) || 1 : moduleIdOrNumber;
  const key = isBonus || num > 900 ? `bonus-${num > 900 ? num - 990 : num}` : `mod-${num}`;
  
  if (CANONICAL_EXTRA_VIDEOS_MAP[key]) {
    return CANONICAL_EXTRA_VIDEOS_MAP[key];
  }
  
  // Default fallback
  const cleanMod = isBonus ? `B- ${num}` : `M- ${num}`;
  return [
    {
      slot: 1,
      title: `Vídeo Extra 01: Análise Prática - ${cleanMod}.1`,
      videoUrl: '/videos/cinelab-intro-apresentacao.mp4',
      thumbnailUrl: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=800&q=80',
      durationHours: 0,
      durationMinutes: 18,
      durationSeconds: 0,
      totalDurationSeconds: 1080,
      durationLabel: '00h 18m 00s',
      description: 'Análise técnica e decupagem comentada pelo Professor Cineasta Tony de Luc.',
      professorNotes: 'Assista a esta aula complementar e aplique os conceitos em seu projeto cinematográfico.',
    },
    {
      slot: 2,
      title: `Vídeo Extra 02: Análise Prática - ${cleanMod}.2`,
      videoUrl: '/videos/cinelab-intro-apresentacao.mp4',
      thumbnailUrl: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=800&q=80',
      durationHours: 0,
      durationMinutes: 24,
      durationSeconds: 0,
      totalDurationSeconds: 1440,
      durationLabel: '00h 24m 00s',
      description: 'Exercício prático de aplicação em set de filmagem.',
      professorNotes: 'Aplicação prática e orientações de direção do cinema profissional.',
    },
  ];
}

export function resolveApostilaExtraVideos(
  apostila: any,
  rawExtraVideos?: ApostilaExtraVideo[]
): [ApostilaExtraVideo, ApostilaExtraVideo] {
  const modNum = apostila.moduleId || apostila.number || 1;
  const isBonus = Boolean(apostila.isBonus || (apostila.id && String(apostila.id).startsWith('bonus-')) || (apostila.number && !apostila.moduleId && apostila.number <= 3));
  const [can1, can2] = getCanonicalExtraVideos(modNum, isBonus);

  const list: ApostilaExtraVideo[] = Array.isArray(rawExtraVideos)
    ? rawExtraVideos
    : Array.isArray(apostila.extraVideos)
    ? apostila.extraVideos
    : [];

  const rawSlot1 = list.find((v) => v.slot === 1);
  const rawSlot2 = list.find((v) => v.slot === 2);

  // Slot 1
  let slot1: ApostilaExtraVideo;
  if (!rawSlot1) {
    slot1 = {
      id: `ev-${apostila.id || modNum}-1`,
      slot: 1,
      title: can1.title,
      description: can1.description,
      videoUrl: can1.videoUrl,
      thumbnailUrl: can1.thumbnailUrl,
      durationHours: can1.durationHours,
      durationMinutes: can1.durationMinutes,
      durationSeconds: can1.durationSeconds,
      totalDurationSeconds: can1.totalDurationSeconds,
      durationLabel: can1.durationLabel,
      professorNotes: can1.professorNotes,
      uploadedAt: new Date().toISOString(),
    };
  } else {
    // Check if title needs healing (legacy title format)
    const isLegacyTitle1 =
      !rawSlot1.title ||
      rawSlot1.title.includes('Estudo Dirigido & Análise Prática') ||
      rawSlot1.title.includes('Módulo 0') ||
      !rawSlot1.title.includes('- M-') && !rawSlot1.title.includes('- B-');

    const effectiveTitle1 = isLegacyTitle1 ? can1.title : rawSlot1.title;

    // Check if videoUrl was accidentally replaced by welcome video
    const isBogusUrl1 =
      !rawSlot1.videoUrl ||
      rawSlot1.videoUrl === '' ||
      (can1.videoUrl.includes('youtube.com') && rawSlot1.videoUrl.includes('cinelab-intro-apresentacao.mp4'));

    const effectiveUrl1 = isBogusUrl1 ? can1.videoUrl : rawSlot1.videoUrl;

    // Check if professor notes are missing or empty
    const effectiveNotes1 =
      rawSlot1.professorNotes && rawSlot1.professorNotes.trim() !== ''
        ? rawSlot1.professorNotes.trim()
        : can1.professorNotes;

    slot1 = {
      ...rawSlot1,
      title: effectiveTitle1,
      videoUrl: effectiveUrl1,
      thumbnailUrl: isBogusUrl1 ? can1.thumbnailUrl : (rawSlot1.thumbnailUrl || can1.thumbnailUrl),
      professorNotes: effectiveNotes1,
      durationLabel: rawSlot1.durationLabel || can1.durationLabel,
      durationHours: rawSlot1.durationHours ?? can1.durationHours,
      durationMinutes: rawSlot1.durationMinutes ?? can1.durationMinutes,
      durationSeconds: rawSlot1.durationSeconds ?? can1.durationSeconds,
      totalDurationSeconds: rawSlot1.totalDurationSeconds ?? can1.totalDurationSeconds,
    };
  }

  // Slot 2
  let slot2: ApostilaExtraVideo;
  if (!rawSlot2) {
    slot2 = {
      id: `ev-${apostila.id || modNum}-2`,
      slot: 2,
      title: can2.title,
      description: can2.description,
      videoUrl: can2.videoUrl,
      thumbnailUrl: can2.thumbnailUrl,
      durationHours: can2.durationHours,
      durationMinutes: can2.durationMinutes,
      durationSeconds: can2.durationSeconds,
      totalDurationSeconds: can2.totalDurationSeconds,
      durationLabel: can2.durationLabel,
      professorNotes: can2.professorNotes,
      uploadedAt: new Date().toISOString(),
    };
  } else {
    // Check if title needs healing
    const isLegacyTitle2 =
      !rawSlot2.title ||
      rawSlot2.title.includes('Estudo de Caso & Exercício Técnico') ||
      rawSlot2.title.includes('Módulo 0') ||
      !rawSlot2.title.includes('- M-') && !rawSlot2.title.includes('- B-');

    const effectiveTitle2 = isLegacyTitle2 ? can2.title : rawSlot2.title;

    // Check if videoUrl was lost
    const isBogusUrl2 =
      (!rawSlot2.videoUrl || rawSlot2.videoUrl === '') && can2.videoUrl !== '';

    const effectiveUrl2 = isBogusUrl2 ? can2.videoUrl : rawSlot2.videoUrl;

    const effectiveNotes2 =
      rawSlot2.professorNotes && rawSlot2.professorNotes.trim() !== ''
        ? rawSlot2.professorNotes.trim()
        : can2.professorNotes;

    slot2 = {
      ...rawSlot2,
      title: effectiveTitle2,
      videoUrl: effectiveUrl2,
      thumbnailUrl: isBogusUrl2 ? can2.thumbnailUrl : (rawSlot2.thumbnailUrl || can2.thumbnailUrl),
      professorNotes: effectiveNotes2,
      durationLabel: rawSlot2.durationLabel || can2.durationLabel,
      durationHours: rawSlot2.durationHours ?? can2.durationHours,
      durationMinutes: rawSlot2.durationMinutes ?? can2.durationMinutes,
      durationSeconds: rawSlot2.durationSeconds ?? can2.durationSeconds,
      totalDurationSeconds: rawSlot2.totalDurationSeconds ?? can2.totalDurationSeconds,
    };
  }

  return [slot1, slot2];
}
