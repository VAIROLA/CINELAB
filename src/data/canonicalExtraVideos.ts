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
  'mod-1': [
    {
      slot: 1,
      title: "Vídeo Extra 01: Introdução ao Cinema e à Linguagem Audiovisual - O GAROTO - M- 1.1",
      videoUrl: "https://www.youtube.com/watch?v=q1U0eKOOwsQ",
      thumbnailUrl: "https://img.youtube.com/vi/q1U0eKOOwsQ/hqdefault.jpg",
      durationHours: 0,
      durationMinutes: 52,
      durationSeconds: 48,
      totalDurationSeconds: 3168,
      durationLabel: "00h 52m 48s",
      description: "Observe principalmente:\nexpressão • gestos • atuação • enquadramento • montagem • ritmo • emoção • narrativa visual.",
      professorNotes: "“Ao assistir a este filme, tente compreender a história antes mesmo de pensar nas palavras. Observe o rosto, o corpo e os gestos dos personagens. Perceba como Chaplin utiliza enquadramentos, montagem, ritmo e atuação para fazer você rir, se emocionar e compreender o que está acontecendo. Preste atenção também à relação entre os personagens e à maneira como cada imagem ajuda a contar a história. Pergunte a si mesmo: eu conseguiria entender essa cena apenas olhando para as imagens?”",
    },
    {
      slot: 2,
      title: "Vídeo Extra 02: Introdução ao Cinema e à Linguagem Audiovisual - TEMPOS MODERNOS - M- 1.2",
      videoUrl: "https://www.youtube.com/watch?v=i15UCTIdfwI",
      thumbnailUrl: "https://img.youtube.com/vi/i15UCTIdfwI/hqdefault.jpg",
      durationHours: 1,
      durationMinutes: 26,
      durationSeconds: 52,
      totalDurationSeconds: 5212,
      durationLabel: "01h 26m 52s",
      description: "observe:\nmovimento • montagem • ritmo • som • máquinas • enquadramento • atuação • significado.\n\n“Durante esta atividade, você não deve assistir aos filmes apenas como espectador. Assista como um futuro cineasta. Observe onde a câmera está, o que aparece dentro do quadro, como os personagens se movimentam, como as imagens são organizadas e como cada escolha interfere naquilo que você sente e compreende. Não existe apenas uma maneira de assistir a um filme. Existe a maneira de quem assiste e existe a maneira de quem aprende a fazer cinema.”",
      professorNotes: "“Neste filme, observe como o cinema utiliza imagens, movimentos, montagem e sons para transmitir ideias. Preste atenção às máquinas, aos trabalhadores, aos movimentos repetitivos e ao ritmo da fábrica. Observe como Chaplin coloca o personagem dentro desse ambiente e como a montagem cria relações entre pessoas e máquinas. Perceba também quando o som aparece e qual função ele exerce. Pergunte a si mesmo: como uma imagem pode transmitir uma ideia sem precisar explicá-la através de palavras?”",
    },
  ],
  'mod-2': [
    {
      slot: 1,
      title: "Vídeo Extra 01: História do Cinema - CHEGADA DO TREM - M- 2.1",
      videoUrl: "https://www.youtube.com/watch?v=qawVtd32DOQ",
      thumbnailUrl: "https://img.youtube.com/vi/qawVtd32DOQ/hqdefault.jpg",
      durationHours: 0,
      durationMinutes: 0,
      durationSeconds: 49,
      totalDurationSeconds: 49,
      durationLabel: "00h 00m 49s",
      description: "Observe principalmente:\ncâmera • espaço • profundidade • movimento • realidade • enquadramento • pessoas • acontecimento.",
      professorNotes: "“Ao assistir a este filme, não procure uma história complexa. Observe o acontecimento. Perceba como a câmera registra um momento real, como as pessoas entram e saem do enquadramento e como o movimento da locomotiva cria uma sensação de profundidade e dinamismo. Lembre-se de que, para os primeiros espectadores, aquilo não era apenas uma imagem: era a própria ilusão da vida em movimento projetada em uma tela.”",
    },
    {
      slot: 2,
      title: "Vídeo Extra 02: História do Cinema - LE VOYAGE DANS LA LUNE - M- 2.2",
      videoUrl: "https://www.youtube.com/watch?v=UHbpgsD8zCM",
      thumbnailUrl: "https://img.youtube.com/vi/UHbpgsD8zCM/hqdefault.jpg",
      durationHours: 0,
      durationMinutes: 12,
      durationSeconds: 51,
      totalDurationSeconds: 771,
      durationLabel: "00h 12m 51s",
      description: "Observe:\nA cenografia • atuação • figurino • ilusionismo • efeitos especiais • cortes • fantasia • composição visual.",
      professorNotes: "“Neste filme, observe como Georges Méliès transforma elementos do teatro, do ilusionismo e da fantasia em linguagem cinematográfica. Preste atenção ao uso dos truques de câmera, como a parada de cena para criar desaparecimentos e transformações. Perceba como cada plano funciona como um pequeno palco onde tudo é desenhado, pintado e coreografado para estimular a imaginação do espectador.”",
    },
  ],
  'mod-3': [
    {
      slot: 1,
      title: "Vídeo Extra 01: Roteiro e Criação de Personagens - À PROCURA DA FELICIDADE - M- 3.1",
      videoUrl: "https://www.youtube.com/watch?v=_-Pzxdhk32k",
      thumbnailUrl: "https://img.youtube.com/vi/_-Pzxdhk32k/hqdefault.jpg",
      durationHours: 1,
      durationMinutes: 57,
      durationSeconds: 25,
      totalDurationSeconds: 7045,
      durationLabel: "01h 57m 25s",
      description: "Observe:\nProtagonista: quem é Chris e o que sabemos sobre ele?\nObjetivo: o que ele realmente deseja conquistar?\nConflito: quais obstáculos impedem esse objetivo?\nPonto de virada: quais momentos mudam a direção da história?\nSubtexto: o que os personagens sentem ou pensam, mesmo sem falar diretamente?\nMotivação: o que move o protagonista a continuar, mesmo diante das maiores dificuldades?",
      professorNotes: "“Ao assistir a este filme, não observe apenas o que acontece com o protagonista. Observe por que cada acontecimento acontece e como as escolhas do personagem movem a narrativa. Repare como o roteirista constrói um objetivo claro e urgente, e como os obstáculos se tornam cada vez mais difíceis. O bom roteiro nasce dessa tensão constante entre o desejo do personagem e as dificuldades da realidade.”",
    },
    {
      slot: 2,
      title: "Vídeo Extra 02: Roteiro e Criação de Personagens - O AUTO DA COMPADECIDA - M- 3.2",
      videoUrl: "https://www.youtube.com/watch?v=Cui4izDKfYY",
      thumbnailUrl: "https://img.youtube.com/vi/Cui4izDKfYY/hqdefault.jpg",
      durationHours: 1,
      durationMinutes: 42,
      durationSeconds: 1,
      totalDurationSeconds: 6121,
      durationLabel: "01h 42m 01s",
      description: "Observe:\nQuem é o protagonista?\nQual é o objetivo de João Grilo?\nO que ele faz para conseguir o que deseja?\nQuais são seus principais obstáculos?\nQual é a motivação de Chicó?\nComo a personalidade de cada personagem é revelada pelos diálogos?\nComo o roteiro utiliza o humor, a esperteza e a cultura regional para construir as situações dramáticas?",
      professorNotes: "Ao assistir a este filme, observe como os personagens são construídos através de suas dualidades. João Grilo e Chicó possuem personalidades muito diferentes, mas complementares. O aluno deve aprender como caracterizar personagens com vozes próprias, objetivos imediatos e sobrevivência através da inteligência e do diálogo.",
    },
  ],
  'mod-4': [
    {
      slot: 1,
      title: "Vídeo Extra 01: Direção e Direção de Atores - O PAGADOR DE PROMESSAS - M- 4.1",
      videoUrl: "https://www.youtube.com/watch?v=KfybjIi_J8U",
      thumbnailUrl: "https://img.youtube.com/vi/KfybjIi_J8U/hqdefault.jpg",
      durationHours: 1,
      durationMinutes: 31,
      durationSeconds: 30,
      totalDurationSeconds: 5490,
      durationLabel: "01h 31m 30s",
      description: "Observe a construção dos personagens e observe como cada personagem apresenta uma personalidade diferente. Como essa personalidade é percebida pelo comportamento do ator?\nVoz e interpretação:\nPreste atenção ao tom de voz, volume, velocidade e pausas. Como essas escolhas modificam o significado das falas?\nExpressão corporal:\nObserve postura, gestos, movimentos e principalmente os momentos em que o personagem permanece parado.\nOlhares e reações:\nNem sempre o personagem precisa falar para participar da cena. Observe as reações dos atores enquanto outros personagens estão falando.\nConflito entre personagens:\nObserve como os atores modificam seu comportamento quando entram em confronto. A energia da interpretação muda?\nIntensidade dramática:\nPerceba como a interpretação vai ganhando intensidade conforme os conflitos aumentam.\nRelação com o espaço:\nObserve como os personagens ocupam o ambiente. Quem se aproxima? Quem se afasta? Quem permanece isolado?\nDireção de atores em grupo:\nPreste atenção às cenas com vários personagens. Observe como cada ator mantém sua própria ação enquanto reage ao que acontece ao redor.",
      professorNotes: "Ao assistir O Pagador de Promessas, o aluno deve observar como o diretor conduz os atores dentro de uma história marcada por conflito, pressão social e diferentes pontos de vista. A atenção não deve estar apenas no que os personagens dizem, mas principalmente em como eles dizem, reagem, se movimentam e se relacionam uns com os outros.\n\nObserve como cada personagem possui uma personalidade própria e como essa personalidade aparece através da voz, do olhar, dos gestos, da postura corporal e da maneira de ocupar o espaço. Perceba também como o diretor utiliza os atores para aumentar gradualmente a tensão da narrativa.\n\nO objetivo é entender que dirigir atores não significa simplesmente dizer o que eles devem falar ou fazer. O diretor precisa construir uma situação na qual o ator compreenda o objetivo do personagem e consiga expressá-lo de maneira coerente com a cena.",
    },
    {
      slot: 2,
      title: "Vídeo Extra 02: Direção e Direção de Atores - CENTRAL DO BRASIL - M- 4.2",
      videoUrl: "https://www.youtube.com/watch?v=wpYfXBNOPvk",
      thumbnailUrl: "https://img.youtube.com/vi/wpYfXBNOPvk/hqdefault.jpg",
      durationHours: 2,
      durationMinutes: 6,
      durationSeconds: 5,
      totalDurationSeconds: 7565,
      durationLabel: "02h 06m 05s",
      description: "observe:\nNaturalidade da interpretação:\nObserve como os atores fazem suas falas e movimentos parecerem espontâneos, evitando uma interpretação excessivamente teatral ou forçada.\nConstrução da relação entre personagens:\nPerceba como a proximidade entre os personagens vai se transformando ao longo do filme. Como isso é demonstrado no comportamento físico dos atores?\nOlhares e silêncios:\nObserve momentos em que os personagens não dizem nada, mas o espectador compreende exatamente o que estão sentindo.\nAtores de origens diferentes:\nO filme reúne uma atriz consagrada (Fernanda Montenegro) e um jovem sem experiência anterior no cinema (Vinícius de Oliveira). Observe como a direção harmoniza essas duas presenças em cena.\nReações sutis:\nPreste atenção em pequenos gestos: desviar o olhar, hesitar antes de responder, mudar a postura ou segurar um objeto.\nEvolução emocional:\nObserve a transformação gradual da personagem principal, da frieza inicial até o afeto genuíno.\nDireção em ambientes reais:\nObserve como os atores interagem com locações reais (estações de trem, estradas, feiras populares e pessoas comuns).",
      professorNotes: "Ao assistir Central do Brasil, observe principalmente a relação construída entre Dora e Josué. O filme é uma excelente oportunidade para perceber como a direção pode utilizar silêncios, olhares, pequenos gestos e reações para desenvolver uma relação entre personagens.\n\nObserve como os atores não precisam explicar tudo o que sentem. Muitas vezes, a hesitação antes de falar, o desvio do olhar ou a maneira de caminhar revelam muito mais do que os diálogos.\n\nO aluno deve perceber que dirigir atores envolve criar cumplicidade, escuta e verdade cênica, permitindo que a emoção surja de maneira orgânica a partir das situações vividas pelos personagens.",
    },
  ],
  'mod-5': [
    {
      slot: 1,
      title: "Vídeo Extra 01: Fotografia, Câmera e Iluminação - O GABINETE DO DR. CALIGARI - M- 5.1",
      videoUrl: "https://www.youtube.com/watch?v=yQn1j34-f4A",
      thumbnailUrl: "https://img.youtube.com/vi/yQn1j34-f4A/hqdefault.jpg",
      durationHours: 1,
      durationMinutes: 17,
      durationSeconds: 11,
      totalDurationSeconds: 4631,
      durationLabel: "01h 17m 11s",
      description: "observe:\nEnquadramento:\nObserve como os personagens são posicionados dentro do quadro.\nCenários e composição:\nRepare nas linhas, formas, portas, janelas, paredes e objetos. Como eles conduzem o olhar do espectador?\nLuz e sombra:\nObserve onde existe luz e onde existe escuridão. Que sensação as sombras provocam?\nContraste:\nPerceba a diferença entre áreas claras e escuras e como isso influencia a atmosfera da cena.\nPerspectiva e profundidade:\nObserve como os cenários criam sensação de profundidade ou, em alguns momentos, parecem propositalmente deformados.\nCâmera:\nObserve a posição da câmera e pergunte: por que o diretor escolheu mostrar essa cena desse ponto de vista?\nDireção de arte + fotografia:\nPerceba que iluminação, cenário, figurino e enquadramento trabalham juntos para criar uma identidade visual.\nAtmosfera:\nPergunte-se: se essa mesma cena fosse iluminada de maneira totalmente diferente, ela provocaria a mesma sensação?",
      professorNotes: "Ao assistir O Gabinete do Dr. Caligari, não observe apenas a história. Assista ao filme como um fotógrafo e diretor de fotografia. Observe como os cenários, as sombras, os enquadramentos e a iluminação são utilizados para criar uma atmosfera e transmitir sensações.\n\nPerceba que a fotografia cinematográfica não serve apenas para deixar uma imagem bonita. Ela pode ajudar a construir tensão, medo, mistério, desequilíbrio e personalidade visual. Observe como as formas e os contrastes presentes na imagem fazem parte da narrativa.",
    },
    {
      slot: 2,
      title: "Vídeo Extra 02: Fotografia, Câmera e Iluminação - A NOITE DOS MORTOS-VIVOS - M- 5.2",
      videoUrl: "https://www.youtube.com/watch?v=CfaU2Og_Zt0",
      thumbnailUrl: "https://img.youtube.com/vi/CfaU2Og_Zt0/hqdefault.jpg",
      durationHours: 1,
      durationMinutes: 35,
      durationSeconds: 12,
      totalDurationSeconds: 5712,
      durationLabel: "01h 35m 12s",
      description: "observe:\nIluminação em preto e branco:\nObserve como a ausência de cor faz a luz e a sombra ganharem importância.\nAlto contraste:\nPerceba as áreas muito claras ao lado de sombras profundas.\nCâmera na mão x câmera fixa:\nObserve quando a câmera se move com os personagens e quando permanece estática observando a ação.\nPlanos fechados (close-ups):\nObserve os enquadramentos nos rostos dos personagens para intensificar expressões de medo, angústia e desespero.\nUso do espaço fechado:\nPerceba como a iluminação e os enquadramentos reforçam a sensação de claustrofobia dentro da casa.\nIluminação diegética:\nObserve fontes de luz dentro da cena (lâmpadas, velas, faróis de carro, fósforos).\nProfundidade de campo:\nPreste atenção ao que está nítido no primeiro plano e o que acontece desfocado ao fundo.\nEconomia de recursos:\nPerceba como uma iluminação simples, bem direcionada, cria atmosfera sem necessidade de equipamentos caros.",
      professorNotes: "Em A Noite dos Mortos-Vivos, observe como uma produção visualmente simples consegue criar tensão através das escolhas de câmera, enquadramento e iluminação.\n\nNão procure apenas equipamentos sofisticados. Observe como o diretor utiliza aquilo que tem disponível para construir uma atmosfera cinematográfica. A iluminação de baixo orçamento, quando bem pensada, torna-se uma ferramenta artística poderosa para gerar medo, claustrofobia e realismo.",
    },
  ],
  'mod-6': [
    {
      slot: 1,
      title: "Vídeo Extra 01: Som e Trilha Sonora - O HOMEM QUE COPIAVA - M- 6.1",
      videoUrl: "https://www.youtube.com/watch?v=fjT-CtR4AWs",
      thumbnailUrl: "https://img.youtube.com/vi/fjT-CtR4AWs/hqdefault.jpg",
      durationHours: 2,
      durationMinutes: 5,
      durationSeconds: 2,
      totalDurationSeconds: 7502,
      durationLabel: "02h 05m 02s",
      description: "Observe:\nVoz e narração:\nObserve como a voz do personagem pode conduzir a narrativa e revelar informações que não estão necessariamente sendo mostradas pela imagem.\nSons ambientes:\nPreste atenção aos sons da cidade, trânsito, máquinas copiadoras, passos, portas e ruídos cotidianos.\nMúsica:\nIdentifique quando a trilha musical entra, qual emoção ela reforça e quando ela para de tocar.\nFoley e ruídos de ação:\nObserve o som de notas de dinheiro sendo contadas, papel sendo manipulado, objetos e passos.\nSilêncios:\nRepare nos momentos em que a ausência de som cria expectativa ou reflexão.\nRitmo sonoro:\nPerceba como a montagem do som acompanha o ritmo dos pensamentos do protagonista.",
      professorNotes: "Ao assistir O Homem Que Copiava, não observe somente a história. Preste atenção em tudo aquilo que você escuta e perceba como o som participa da construção da narrativa.\n\nObserve a relação entre voz, música, ruídos, sons ambientes e imagem. Perceba que determinados sons podem representar pensamentos, memórias, ironias ou sentimentos do protagonista.\n\nO som no cinema não serve apenas para acompanhar a imagem. Ele pode contar coisas que a imagem não mostra.",
    },
    {
      slot: 2,
      title: "Vídeo Extra 02: Som e Trilha Sonora - O SOM AO REDOR - M- 6.2",
      videoUrl: "https://www.youtube.com/watch?v=OOUtn06aP9I",
      thumbnailUrl: "https://img.youtube.com/vi/OOUtn06aP9I/hqdefault.jpg",
      durationHours: 2,
      durationMinutes: 10,
      durationSeconds: 59,
      totalDurationSeconds: 7859,
      durationLabel: "02h 10m 59s",
      description: "Observe:\nSom ambiente:\nFeche os olhos durante alguns momentos e tente identificar quantos sons diferentes existem na cena.\nSons fora do quadro:\nObserve os sons que você escuta sem conseguir ver imediatamente sua origem.\nConstrução do espaço:\nPergunte: se retirássemos o som, ainda teríamos a mesma percepção daquele lugar?\nSons cotidianos:\nPreste atenção aos sons aparentemente banais: televisão, carros, portões, aparelhos domésticos, animais, passos etc.\nSons como suspense:\nObserve quando um som aparentemente comum passa a provocar tensão.\nDireção de som:\nPerceba se determinados sons estão mais próximos ou mais distantes e como isso cria profundidade.\nSilêncio:\nObserve quando o ambiente fica inesperadamente silencioso.\nMúsica x som ambiente:\nIdentifique quando existe música propriamente dita e quando a emoção é criada apenas pelos sons do ambiente.\nSom subjetivo:\nObserve se existem momentos em que o tratamento sonoro parece representar a percepção ou o estado emocional de determinado personagem.",
      professorNotes: "Em O Som ao Redor, faça um exercício diferente: tente perceber o ambiente antes mesmo de pensar na história.\n\nObserve quantas informações chegam ao espectador através dos sons. Portões, carros, televisões, conversas, cachorros, aparelhos domésticos, ruídos da rua e sons distantes ajudam a construir o espaço onde a história acontece.\n\nPerceba também que alguns sons aparentemente comuns podem adquirir outro significado dentro da narrativa. Um ruído distante pode criar expectativa; um som repetitivo pode provocar incômodo; um silêncio repentino pode chamar a atenção.\n\nO objetivo é compreender que o espaço cinematográfico também é construído pelo ouvido. Uma cena não precisa mostrar tudo para fazer o espectador perceber que algo está acontecendo.",
    },
  ],
  'mod-7': [
    {
      slot: 1,
      title: "Vídeo Extra 01: Montagem e Pós-Produção - A GREVE - M- 7.1",
      videoUrl: "https://www.youtube.com/watch?v=VD40vLjRaNA",
      thumbnailUrl: "https://img.youtube.com/vi/VD40vLjRaNA/hqdefault.jpg",
      durationHours: 1,
      durationMinutes: 28,
      durationSeconds: 56,
      totalDurationSeconds: 5336,
      durationLabel: "01h 28m 56s",
      description: "Observe:\nCorte entre planos:\nObserve quando o diretor corta de uma imagem para outra e pergunte por que aquele corte acontece.\nAssociação de imagens:\nObserve duas imagens diferentes colocadas em sequência. Que ideia surge da combinação?\nContraste:\nPerceba quando o filme coloca situações ou personagens opostos lado a lado.\nMontagem paralela:\nObserve quando acontecimentos diferentes são alternados pela montagem.\nRitmo:\nPerceba quando os cortes ficam mais rápidos ou mais demorados.\nRepetição:\nObserve se determinados tipos de imagens ou ações são repetidos e qual efeito isso produz.\nMetáfora visual:\nProcure imagens que representam uma ideia diferente daquela que aparece literalmente na cena.\nConstrução de tensão:\nObserve como a montagem organiza diferentes ações para aumentar a expectativa.\nSequência final:\nPreste atenção especial à associação entre a repressão aos trabalhadores e as imagens de animais. Pergunte: o que a montagem está dizendo que nenhuma dessas imagens diria sozinha?",
      professorNotes: "Ao assistir A Greve, não tente acompanhar somente a história. Assista prestando atenção à maneira como uma imagem é colocada ao lado da outra.\n\nPergunte-se constantemente: por que o diretor escolheu cortar exatamente neste momento? Por que colocou esta imagem depois daquela?\n\nPerceba que a montagem não serve apenas para organizar as cenas. Ela pode criar ideias, comparações, emoções e significados que não estão presentes em nenhum plano isoladamente.\n\nObserve também o ritmo dos cortes. Quando a ação fica mais intensa, a montagem pode se tornar mais dinâmica. Quando o diretor quer criar determinada sensação, pode alterar a duração e a combinação dos planos.\n\nO objetivo é compreender que montar é construir uma narrativa através da relação entre imagens.",
    },
    {
      slot: 2,
      title: "Vídeo Extra 02: Montagem e Pós-Produção - A GENERAL - M- 7.2",
      videoUrl: "https://www.youtube.com/watch?v=520-x-oNWlA",
      thumbnailUrl: "https://img.youtube.com/vi/520-x-oNWlA/hqdefault.jpg",
      durationHours: 1,
      durationMinutes: 18,
      durationSeconds: 32,
      totalDurationSeconds: 4712,
      durationLabel: "01h 18m 32s",
      description: "Observe:\nContinuidade da ação:\nObserve como os cortes permitem acompanhar uma ação sem perder a noção do que está acontecendo.\nDireção do movimento:\nObserve para onde os trens, veículos e personagens se deslocam em cada plano. Como a montagem mantém a coerência de direção?\nMontagem para o humor:\nPerceba como o timing do corte determina o efeito cômico da cena (antecipação, surpresa e reação).\nCortes no movimento:\nObserve os cortes realizados durante uma ação física para tornar a transição imperceptível.\nClareza espacial:\nMesmo em cenas complexas com grandes máquinas em movimento, o espectador sempre sabe onde cada elemento está posicionado.",
      professorNotes: "Ao assistir A General, observe o filme como um exercício de montagem. Não se preocupe apenas em acompanhar a aventura de Johnnie Gray. Procure perceber como diferentes planos são organizados para que o espectador compreenda perfeitamente a ação.\n\nObserve como a montagem acompanha perseguições, movimentos de trens, obstáculos e ações físicas mantendo sempre a clareza espacial e a continuidade do movimento.\n\nO aluno deve compreender que a montagem não serve apenas para criar efeitos dramáticos ou poéticos; ela é a ferramenta essencial para organizar a ação e guiar a atenção da plateia com precisão cirúrgica.",
    },
  ],
  'mod-8': [
    {
      slot: 1,
      title: "Vídeo Extra 01: Produção Executiva e Planejamento - BAILE PERFUMADO - M- 8.1",
      videoUrl: "https://www.youtube.com/watch?v=_8ZrfthVE24",
      thumbnailUrl: "https://img.youtube.com/vi/_8ZrfthVE24/hqdefault.jpg",
      durationHours: 1,
      durationMinutes: 32,
      durationSeconds: 42,
      totalDurationSeconds: 5562,
      durationLabel: "01h 32m 42s",
      description: "Observe:\nLocações:\nObserve os diferentes ambientes utilizados e pense nas dificuldades de filmar em regiões externas e afastadas.\nDireção de arte:\nObserve como cenários e ambientes são preparados para representar uma determinada época.\nFigurinos:\nPerceba a quantidade de personagens e como suas roupas ajudam a construir o período histórico.\nObjetos de cena:\nObserve armas, veículos, equipamentos, objetos pessoais e elementos utilizados pelos personagens.\nVeículos e deslocamentos:\nObserve quantos veículos aparecem e imagine toda a logística necessária para disponibilizá-los durante as filmagens.\nContinuidade:\nObserve roupas, objetos e características dos ambientes entre diferentes cenas.\nPesquisa histórica:\nPerceba como a produção precisou pesquisar personagens, época, costumes, lugares e acontecimentos históricos.\nOrganização da equipe:\nO aluno deve perceber que uma produção envolve muito mais profissionais do que apenas diretor e atores.\nRecursos financeiros:\nPergunte: quanto custaria transportar equipe, equipamentos, figurinos, veículos e materiais para realizar uma produção desse tipo?\nPlanejamento de uma produção de época:\nImagine que você fosse o produtor responsável pelo filme. O que precisaria ser resolvido antes de iniciar as filmagens?",
      professorNotes: "Ao assistir Baile Perfumado, assista também como produtor. Procure enxergar tudo aquilo que foi necessário organizar para transformar uma história ambientada no sertão dos anos 1930 em um filme.\n\nObserve as locações, deslocamentos, figurinos, objetos de cena, veículos, cenários, preparação dos ambientes e quantidade de profissionais envolvidos na realização.\n\nPense sempre além daquilo que aparece na tela: quanto planejamento foi necessário para que aquela cena pudesse existir?\n\nO objetivo é compreender que a produção executiva transforma uma ideia cinematográfica em uma operação concreta, envolvendo pessoas, recursos, tempo, logística, orçamento e tomada de decisões.",
    },
    {
      slot: 2,
      title: "Vídeo Extra 02: Produção Executiva e Planejamento - CINEMA, ASPIRINAS E URUBUS - M- 8.2",
      videoUrl: "https://www.youtube.com/watch?v=jmXpJND14LI",
      thumbnailUrl: "https://img.youtube.com/vi/jmXpJND14LI/hqdefault.jpg",
      durationHours: 1,
      durationMinutes: 35,
      durationSeconds: 56,
      totalDurationSeconds: 5756,
      durationLabel: "01h 35m 56s",
      description: "Observe:\nLocações:\nObserve os locais onde as cenas foram realizadas e pense nas dificuldades de produção de cada ambiente.\nDeslocamento da equipe:\nObserve que os personagens estão constantemente viajando. Imagine a logística necessária para transportar equipe e equipamentos.\nVeículos:\nO caminhão é praticamente um elemento central da narrativa. Pense nas necessidades de produção relacionadas a ele.\nObjetos de cena:\nObserve os objetos utilizados pelos personagens. Pergunte como foram selecionados, transportados e organizados.\nFigurino:\nObserve a continuidade das roupas durante as diferentes cenas.\nContinuidade:\nPreste atenção à posição dos objetos, roupas, veículos e personagens entre diferentes momentos.\nCondições naturais:\nObserve calor, poeira, paisagem, iluminação natural e estrada. Como esses fatores podem interferir no planejamento?\nTempo de filmagem:\nPergunte: quanto tempo uma equipe precisaria permanecer em cada locação para realizar essas cenas?\nOrganização da equipe:\nImagine quais profissionais precisariam estar presentes para que cada sequência pudesse ser realizada.\nOrçamento:\nPense em quais elementos provavelmente representam custos: transporte, alimentação, hospedagem, equipamentos, equipe, veículos, locações e produção de arte.",
      professorNotes: "Ao assistir Cinema, Aspirinas e Urubus, observe o filme pensando como produtor. Não se concentre somente nos personagens e na história. Procure imaginar tudo aquilo que foi necessário para que cada cena pudesse existir.\n\nObserve as locações, deslocamentos, veículos, figurinos, objetos de cena, elenco, equipe e as características do ambiente. Pense nas dificuldades que uma produção enfrenta quando trabalha em regiões afastadas, com grandes deslocamentos e condições específicas de clima e espaço.\n\nO exercício é aprender a olhar para uma cena pronta e perguntar: “O que foi necessário organizar para que esta cena pudesse ser filmada?”\n\nUm produtor precisa aprender a enxergar aquilo que o espectador normalmente não percebe.",
    },
  ],
  'mod-9': [
    {
      slot: 1,
      title: "Vídeo Extra 01: Distribuição, Festivais e Mercado Audiovisual - QUE HORAS ELA VOLTA? - M- 9.1",
      videoUrl: "https://www.youtube.com/watch?v=Ks9VIZejfw8",
      thumbnailUrl: "https://img.youtube.com/vi/Ks9VIZejfw8/hqdefault.jpg",
      durationHours: 1,
      durationMinutes: 51,
      durationSeconds: 40,
      totalDurationSeconds: 6700,
      durationLabel: "01h 51m 40s",
      description: "Observe:\nQual é o público potencial do filme?\nQue características da história podem despertar interesse fora do Brasil?\nComo o tema brasileiro pode ser compreendido por espectadores de outros países?\nPor que um festival internacional pode ser importante para a carreira de um filme?\nComo uma premiação pode aumentar o interesse de distribuidores?\nO que pode fazer um filme independente chamar atenção do mercado?\nObserve a diferença entre produzir um filme e conseguir fazê-lo chegar ao público.\nPesquise depois da sessão quais festivais o filme frequentou e quais prêmios recebeu.\nPesquise em quantos países o filme foi lançado.\nCompare o mercado nacional com o mercado internacional da obra.",
      professorNotes: "“Ao assistir a Que Horas Ela Volta?, você não deve olhar apenas para a história. Pense no filme como um produto audiovisual que precisou encontrar seu público. Observe como uma obra brasileira, com uma história profundamente ligada à realidade do país, conseguiu ultrapassar as fronteiras nacionais por meio dos festivais, das premiações e da distribuição internacional.”\n\nO objetivo é compreender que produzir um bom filme é apenas uma etapa. Depois da produção, é necessário pensar em onde o filme será exibido, para quem será apresentado, quais festivais podem recebê-lo, como será vendido e como poderá alcançar outros mercados.",
    },
    {
      slot: 2,
      title: "Vídeo Extra 02: Distribuição, Festivais e Mercado Audiovisual - COMO FUNCIONA A DISTRIBUIÇÃO DE UM FILME (Insight) - M- 9.2",
      videoUrl: "https://www.youtube.com/watch?v=misa0VVsNaM",
      thumbnailUrl: "https://img.youtube.com/vi/misa0VVsNaM/hqdefault.jpg",
      durationHours: 0,
      durationMinutes: 13,
      durationSeconds: 25,
      totalDurationSeconds: 805,
      durationLabel: "00h 13m 25s",
      description: "Observe:\nPrimeiros passos para distribuir:\nAs recomendações das representantes da Olhar Distribuição sobre o que fazer quando se tem um filme pronto (ou em desenvolvimento).\n\nA importância de pesquisar mercados e festivais que acontecem dentro de eventos de cinema pelo país.\n\nEstratégia de festivais como porta de entrada:\nComo o vídeo explica que festivais funcionam como vitrine para contatos com distribuidoras, programadores e compradores.\nA ideia de escolher festivais de forma estratégica (perfil do filme, público, premiação, mercado).\n\nRelação entre realizador e distribuidora:\nO que uma distribuidora espera do filme e do produtor (material de divulgação, trailer, stills, sinopse, ficha técnica).\nComo se dá a negociação de janelas de exibição (cinema, TV, streaming, VoD) e a divisão de receitas.",
      professorNotes: "Observe:\nComo um realizador deve pensar a distribuição desde o início do projeto. A orientação é que o aluno assista como se fosse um produtor/distribuidor, anotando passos, estratégias e erros comuns que podem impedir o filme de circular.",
    },
  ],
  'mod-10': [
    {
      slot: 1,
      title: "Vídeo Extra 01: Projeto Final - NAPO (Curta-Metragem) - M- 10.1",
      videoUrl: "https://www.youtube.com/watch?v=k1vCrsZ80M4",
      thumbnailUrl: "https://img.youtube.com/vi/k1vCrsZ80M4/hqdefault.jpg",
      durationHours: 0,
      durationMinutes: 16,
      durationSeconds: 40,
      totalDurationSeconds: 1000,
      durationLabel: "00h 16m 40s",
      description: "Observe:\nA narrativa visual completa de um curta-metragem multipremiado.\nComo o roteiro, a direção de arte, a trilha sonora e a animação se unem para transmitir uma história sensível sem a necessidade de diálogos falados.\nAnalise o arco dramático, a relação entre os personagens e o impacto emocional do clímax.",
      professorNotes: "Ao assistir ao curta-metragem Napo (dirigido por Gustavo Ribeiro e produzido pela Miralumo Films), o aluno deve analisar a síntese de todas as etapas de realização cinematográfica aprendidas ao longo do curso. Repare na excelência técnica, na precisão da decupagem e na força de uma ideia concisa executada com rigor e sensibilidade artística.",
    },
    {
      slot: 2,
      title: "Vídeo Extra 02: Projeto Final - HOJE EU QUERO VOLTAR SOZINHO (Curta-Metragem) - M- 10.2",
      videoUrl: "https://www.youtube.com/watch?v=mQuoIuLUxmo",
      thumbnailUrl: "https://img.youtube.com/vi/mQuoIuLUxmo/hqdefault.jpg",
      durationHours: 0,
      durationMinutes: 17,
      durationSeconds: 15,
      totalDurationSeconds: 1035,
      durationLabel: "00h 17m 15s",
      description: "Observe:\nA estrutura dramática de um curta-metragem ficcional que conquistou dezenas de prêmios e originou um longa-metragem de sucesso internacional.\nPreste atenção na direção de atores, na naturalidade dos diálogos, na sutileza da fotografia e no planejamento de produção.",
      professorNotes: "Ao assistir ao curta-metragem Eu Não Quero Voltar Sozinho / Hoje Eu Quero Voltar Sozinho (Dir. Daniel Ribeiro), observe como um roteiro focado em conflitos humanos genuínos, aliado a uma produção eficiente e direção precisa, pode criar um curta-metragem de enorme alcance e reconhecimento.",
    },
  ],
};

/**
 * Resolves extra videos for an apostila safely.
 * USER CONTENT HAS ABSOLUTE PRIORITY:
 * Whatever the user entered or edited in title, description, notes or videoUrl
 * will NEVER be overwritten by fallbacks. Fallbacks are only used if a slot is entirely missing or blank.
 */
export function resolveApostilaExtraVideos(
  apostila: { id?: string; moduleId?: number; number?: number; extraVideos?: ApostilaExtraVideo[] },
  extraVideosInput?: ApostilaExtraVideo[]
): [ApostilaExtraVideo, ApostilaExtraVideo] {
  const modNum =
    apostila.moduleId ||
    apostila.number ||
    (apostila.id ? parseInt(apostila.id.replace(/[^0-9]/g, ''), 10) : 1) ||
    1;

  const key = `mod-${modNum}`;
  const canonicalPair = CANONICAL_EXTRA_VIDEOS_MAP[key] || CANONICAL_EXTRA_VIDEOS_MAP['mod-1'];
  const [can1, can2] = canonicalPair;

  const list = Array.isArray(extraVideosInput)
    ? extraVideosInput
    : Array.isArray(apostila.extraVideos)
    ? apostila.extraVideos
    : [];

  const rawSlot1 = list.find((v) => v.slot === 1);
  const rawSlot2 = list.find((v) => v.slot === 2);

  // Helper to determine if a string has meaningful user content
  const hasUserText = (val: string | undefined | null) => Boolean(val && val.trim().length > 0);

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
    // If raw title is blank or has outdated placeholder, use canonical; otherwise keep user's title
    const isLegacyTitle1 = !hasUserText(rawSlot1.title) || rawSlot1.title.includes('Estudo Dirigido & Análise Prática – Módulo');
    const effectiveTitle1 = isLegacyTitle1 ? can1.title : rawSlot1.title;

    // Use user URL if present, otherwise canonical
    const effectiveUrl1 = hasUserText(rawSlot1.videoUrl) ? rawSlot1.videoUrl : can1.videoUrl;

    // User description and professor notes MUST BE PRESERVED
    const effectiveDesc1 = hasUserText(rawSlot1.description) ? rawSlot1.description : can1.description;
    const effectiveNotes1 = rawSlot1.professorNotes !== undefined && rawSlot1.professorNotes !== null && rawSlot1.professorNotes !== ''
      ? rawSlot1.professorNotes
      : can1.professorNotes;

    slot1 = {
      ...rawSlot1,
      title: effectiveTitle1,
      videoUrl: effectiveUrl1,
      thumbnailUrl: rawSlot1.thumbnailUrl || can1.thumbnailUrl,
      description: effectiveDesc1,
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
    const isLegacyTitle2 = !hasUserText(rawSlot2.title) || rawSlot2.title.includes('Estudo de Caso & Exercício Técnico – Módulo');
    const effectiveTitle2 = isLegacyTitle2 ? can2.title : rawSlot2.title;

    const effectiveUrl2 = hasUserText(rawSlot2.videoUrl) ? rawSlot2.videoUrl : can2.videoUrl;

    const effectiveDesc2 = hasUserText(rawSlot2.description) ? rawSlot2.description : can2.description;
    const effectiveNotes2 = rawSlot2.professorNotes !== undefined && rawSlot2.professorNotes !== null && rawSlot2.professorNotes !== ''
      ? rawSlot2.professorNotes
      : can2.professorNotes;

    slot2 = {
      ...rawSlot2,
      title: effectiveTitle2,
      videoUrl: effectiveUrl2,
      thumbnailUrl: rawSlot2.thumbnailUrl || can2.thumbnailUrl,
      description: effectiveDesc2,
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
