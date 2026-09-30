import { ModuleEvaluation } from '../src/types/index.js';

export const pedagogicalEvaluations: ModuleEvaluation[] = [
  // AVALIAÇÃO 01 - INTRODUÇÃO AO CINEMA E À LINGUAGEM AUDIOVISUAL (10 Questões x 1.0 ponto = 10.0)
  // GABARITO OFICIAL: 1-B | 2-A | 3-C | 4-B | 5-B | 6-B | 7-A | 8-B | 9-B | 10-A
  {
    id: 'eval-1',
    moduleId: 1,
    moduleNumber: 1,
    title: 'Avaliação Oficial 01 — Introdução ao Cinema e à Linguagem Audiovisual',
    description: '10 questões objetivas de múltipla escolha (1,0 ponto cada, nota máxima 10,0). Correção automática com resultado imediato.',
    maxScore: 10.0,
    minPassingScore: 6.0,
    questions: [
      {
        id: 'q1-1',
        type: 'multiple_choice',
        prompt: '1. O que significa audiovisual?',
        options: [
          'Comunicação somente por texto',
          'Comunicação por imagens e sons',
          'Comunicação apenas por música',
          'Comunicação somente por fotografia'
        ],
        correctOptionIndex: 1, // B
        weight: 1.0,
        explanation: 'Audiovisual é a forma de comunicação e expressão artística baseada na combinação integrada de imagens e sons.'
      },
      {
        id: 'q1-2',
        type: 'multiple_choice',
        prompt: '2. Qual elemento pode contribuir para contar uma história além da imagem?',
        options: [
          'Som',
          'Apenas legenda',
          'Apenas cenário',
          'Apenas figurino'
        ],
        correctOptionIndex: 0, // A
        weight: 1.0,
        explanation: 'O som atua de forma direta na construção narrativa, espacialidade e atmosfera emocional do filme.'
      },
      {
        id: 'q1-3',
        type: 'multiple_choice',
        prompt: '3. Qual enquadramento é mais adequado para destacar um detalhe?',
        options: [
          'Plano geral',
          'Plano conjunto',
          'Close/detalhe',
          'Plano de estabelecimento'
        ],
        correctOptionIndex: 2, // C
        weight: 1.0,
        explanation: 'O enquadramento em close ou plano detalhe isola e destaca um elemento pontual essencial da cena.'
      },
      {
        id: 'q1-4',
        type: 'multiple_choice',
        prompt: '4. Quais são as três grandes etapas básicas de uma produção?',
        options: [
          'Roteiro, elenco e estreia',
          'Pré-produção, produção e pós-produção',
          'Câmera, luz e som',
          'Filme, cartaz e festival'
        ],
        correctOptionIndex: 1, // B
        weight: 1.0,
        explanation: 'As três etapas canônicas da realização audiovisual são pré-produção (planejamento), produção (gravação) e pós-produção (montagem e finalização).'
      },
      {
        id: 'q1-5',
        type: 'multiple_choice',
        prompt: '5. Por que o som é importante no audiovisual?',
        options: [
          'Serve apenas para preencher silêncio',
          'Pode situar, criar atmosfera e participar da narrativa',
          'Só é necessário em musicais',
          'Substitui a imagem'
        ],
        correctOptionIndex: 1, // B
        weight: 1.0,
        explanation: 'O som não é mero acompanhamento; ele situa o espectador no espaço, cria atmosfera dramática e é parte ativa da narrativa.'
      },
      {
        id: 'q1-6',
        type: 'multiple_choice',
        prompt: '6. O que é enquadramento?',
        options: [
          'O roteiro completo',
          'Tudo aquilo que a câmera mostra dentro da imagem',
          'A edição final',
          'O orçamento'
        ],
        correctOptionIndex: 1, // B
        weight: 1.0,
        explanation: 'Enquadramento é a delimitação e escolha óptica de tudo aquilo que a câmera registra e exibe dentro dos limites do quadro.'
      },
      {
        id: 'q1-7',
        type: 'multiple_choice',
        prompt: '7. O que é montagem?',
        options: [
          'Organização de imagens e sons para formar a obra',
          'Escolha do elenco',
          'Construção do cenário',
          'Captação do áudio'
        ],
        correctOptionIndex: 0, // A
        weight: 1.0,
        explanation: 'Montagem é o processo de seleção, ordenação e articulação temporal de imagens e sons para criar sentido e ritmo à obra.'
      },
      {
        id: 'q1-8',
        type: 'multiple_choice',
        prompt: '8. O que é pré-produção?',
        options: [
          'Etapa posterior à estreia',
          'Etapa de preparação e planejamento',
          'Apenas a montagem',
          'Apenas a divulgação'
        ],
        correctOptionIndex: 1, // B
        weight: 1.0,
        explanation: 'A pré-produção é a fase preparatória onde se desenvolve o roteiro, orçamento, cronograma, locações e equipe antes de ligar a câmera.'
      },
      {
        id: 'q1-9',
        type: 'multiple_choice',
        prompt: '9. No exercício de cinco planos, qual é a função do plano 1?',
        options: [
          'Mostrar o resultado',
          'Apresentar o lugar',
          'Mostrar apenas um detalhe',
          'Encerrar a história'
        ],
        correctOptionIndex: 1, // B
        weight: 1.0,
        explanation: 'No exercício dos cinco planos, o primeiro plano tem a função primordial de apresentar e estabelecer o espaço da ação.'
      },
      {
        id: 'q1-10',
        type: 'multiple_choice',
        prompt: '10. O que o exercício de cinco planos procura desenvolver?',
        options: [
          'A capacidade de criar narrativa pela organização das imagens',
          'Apenas a qualidade técnica da câmera',
          'Apenas efeitos visuais',
          'Apenas gravação de áudio'
        ],
        correctOptionIndex: 0, // A
        weight: 1.0,
        explanation: 'O exercício estimula a capacidade fundamental do realizador em contar uma história visualmente articulada através da ordem dos planos.'
      }
    ]
  },

  // AVALIAÇÃO 02 - HISTÓRIA DO CINEMA E ANÁLISE DE OBRAS
  // GABARITO OFICIAL: 1-B | 2-A | 3-A | 4-A | 5-B | 6-B | 7-B | 8-B | 9-A | 10-A
  {
    id: 'eval-2',
    moduleId: 2,
    moduleNumber: 2,
    title: 'Avaliação Oficial 02 — História do Cinema e Análise de Obras',
    description: '10 questões objetivas de múltipla escolha (1,0 ponto cada, nota máxima 10,0). Correção automática com resultado imediato.',
    maxScore: 10.0,
    minPassingScore: 6.0,
    questions: [
      {
        id: 'q2-1',
        type: 'multiple_choice',
        prompt: '1. O que caracteriza uma mudança importante na história do cinema?',
        options: [
          'Apenas a troca de atores',
          'A evolução de técnicas, tecnologias e formas de narrativa',
          'Apenas o aumento da duração dos filmes',
          'Apenas a mudança de cartazes'
        ],
        correctOptionIndex: 1, // B
        weight: 1.0,
        explanation: 'Grandes marcos históricos no cinema decorrem da transformação conjunta de recursos tecnológicos, técnicas expressivas e novos modos narrativos.'
      },
      {
        id: 'q2-2',
        type: 'multiple_choice',
        prompt: '2. No cinema silencioso, qual elemento tinha papel importante?',
        options: [
          'Música ao vivo',
          'Dublagem digital',
          'Streaming',
          'Som surround'
        ],
        correctOptionIndex: 0, // A
        weight: 1.0,
        explanation: 'Na era muda, pianistas e orquestras executavam música ao vivo nas salas para pontuar a emoção e o ritmo dos filmes.'
      },
      {
        id: 'q2-3',
        type: 'multiple_choice',
        prompt: '3. O surgimento do som sincronizado ampliou o uso de:',
        options: [
          'Voz, ruídos e música',
          'Apenas cor',
          'Apenas cenários',
          'Apenas figurino'
        ],
        correctOptionIndex: 0, // A
        weight: 1.0,
        explanation: 'A chegada do som sincronizado permitiu a integração orgânica entre diálogos falados (voz), efeitos sonoros realistas (ruídos) e trilha musical.'
      },
      {
        id: 'q2-4',
        type: 'multiple_choice',
        prompt: '4. A cor no cinema pode contribuir principalmente para:',
        options: [
          'Atmosfera e estilo',
          'Eliminar a montagem',
          'Substituir o roteiro',
          'Impedir a atuação'
        ],
        correctOptionIndex: 0, // A
        weight: 1.0,
        explanation: 'A paleta cromática cria estados emocionais, ressalta a psicologia dos personagens e estabelece o estilo estético do realizador.'
      },
      {
        id: 'q2-5',
        type: 'multiple_choice',
        prompt: '5. Por que estudar cinema brasileiro é importante?',
        options: [
          'Para ignorar outras cinematografias',
          'Para ampliar repertório e perceber histórias próximas da nossa realidade',
          'Apenas para decorar datas',
          'Apenas para conhecer atores'
        ],
        correctOptionIndex: 1, // B
        weight: 1.0,
        explanation: 'O cinema nacional enriquece o repertório do cineasta ao dialogar diretamente com a identidade cultural e as realidades sociais do país.'
      },
      {
        id: 'q2-6',
        type: 'multiple_choice',
        prompt: '6. Na análise de obras, o que deve ser observado?',
        options: [
          'Somente a história',
          'Narrativa, personagem, espaço, imagem, som e montagem',
          'Apenas o cartaz',
          'Apenas o orçamento'
        ],
        correctOptionIndex: 1, // B
        weight: 1.0,
        explanation: 'Uma análise cinematográfica abrangente decompõe o filme em suas seis camadas fundamentais: narrativa, personagem, espaço, imagem, som e montagem.'
      },
      {
        id: 'q2-7',
        type: 'multiple_choice',
        prompt: '7. O que torna uma análise mais forte?',
        options: [
          'Opinião sem exemplos',
          'Descrição de escolhas concretas e seus efeitos',
          'Apenas nota de 0 a 10',
          'Apenas resumo da trama'
        ],
        correctOptionIndex: 1, // B
        weight: 1.0,
        explanation: 'Uma análise analítica sólida fundamenta-se na observação técnica de escolhas concretas de direção e seus impactos dramáticos na tela.'
      },
      {
        id: 'q2-8',
        type: 'multiple_choice',
        prompt: '8. Na camada narrativa, a pergunta central é:',
        options: [
          'Qual lente foi usada?',
          'O que ocorre?',
          'Qual foi o orçamento?',
          'Qual festival exibiu?'
        ],
        correctOptionIndex: 1, // B
        weight: 1.0,
        explanation: 'Na camada narrativa investiga-se o encadeamento dos fatos dramáticos: o que ocorre, como os eventos se desencadeiam e como a trama se resolve.'
      },
      {
        id: 'q2-9',
        type: 'multiple_choice',
        prompt: '9. Na camada de som, deve-se observar:',
        options: [
          'Voz, ambiência, música e silêncio',
          'Apenas cor',
          'Apenas figurino',
          'Apenas cenografia'
        ],
        correctOptionIndex: 0, // A
        weight: 1.0,
        explanation: 'A análise sonora examina a articulação entre as falas, os ruídos ambientes, a trilha musical e os momentos significativos de silêncio.'
      },
      {
        id: 'q2-10',
        type: 'multiple_choice',
        prompt: '10. Por que comparar filmes de épocas diferentes?',
        options: [
          'Para perceber como condições técnicas, sociais e econômicas influenciam a linguagem',
          'Para escolher o filme mais caro',
          'Para evitar análise',
          'Para substituir o estudo histórico'
        ],
        correctOptionIndex: 0, // A
        weight: 1.0,
        explanation: 'A comparação histórica evidencia como as transformações tecnológicas e o contexto social moldam a evolução da linguagem cinematográfica.'
      }
    ]
  },

  // AVALIAÇÃO 03 - ROTEIRO E CRIAÇÃO DE PERSONAGENS
  // GABARITO OFICIAL: 1-A | 2-A | 3-A | 4-A | 5-A | 6-A | 7-A | 8-A | 9-A | 10-A
  {
    id: 'eval-3',
    moduleId: 3,
    moduleNumber: 3,
    title: 'Avaliação Oficial 03 — Roteiro e Criação de Personagens',
    description: '10 questões objetivas de múltipla escolha (1,0 ponto cada, nota máxima 10,0). Correção automática com resultado imediato.',
    maxScore: 10.0,
    minPassingScore: 6.0,
    questions: [
      {
        id: 'q3-1',
        type: 'multiple_choice',
        prompt: '1. Qual sequência representa melhor o desenvolvimento de um projeto de roteiro?',
        options: [
          'Ideia → storyline → logline → sinopse → tratamento → escaleta → roteiro',
          'Roteiro → cartaz → elenco → ideia',
          'Festival → roteiro → ideia',
          'Trailer → logline → orçamento'
        ],
        correctOptionIndex: 0, // A
        weight: 1.0,
        explanation: 'O desenvolvimento dramatúrgico profissional parte da ideia inicial e avança progressivamente em complexidade até o roteiro formatado.'
      },
      {
        id: 'q3-2',
        type: 'multiple_choice',
        prompt: '2. Quem vive a ação da história?',
        options: [
          'O personagem',
          'O orçamento',
          'A locação',
          'A câmera'
        ],
        correctOptionIndex: 0, // A
        weight: 1.0,
        explanation: 'O personagem é o agente que encarna os desejos, toma decisões e vive os conflitos da narrativa.'
      },
      {
        id: 'q3-3',
        type: 'multiple_choice',
        prompt: '3. O que é objetivo do personagem?',
        options: [
          'Aquilo que ele deseja alcançar',
          'O lugar onde mora',
          'O gênero do filme',
          'O plano de câmera'
        ],
        correctOptionIndex: 0, // A
        weight: 1.0,
        explanation: 'O objetivo dramático é a meta consciente ou inconsciente que move o personagem a agir contra as adversidades.'
      },
      {
        id: 'q3-4',
        type: 'multiple_choice',
        prompt: '4. O que é obstáculo?',
        options: [
          'O que dificulta a conquista do objetivo',
          'A trilha sonora',
          'A fotografia',
          'O cartaz'
        ],
        correctOptionIndex: 0, // A
        weight: 1.0,
        explanation: 'Obstáculo é qualquer barreira interna, interpessoal ou externa que impede ou dificulta o protagonista de atingir sua meta.'
      },
      {
        id: 'q3-5',
        type: 'multiple_choice',
        prompt: '5. O que é subtexto?',
        options: [
          'O significado ou intenção presente por baixo das palavras',
          'A lista de equipamentos',
          'A duração do filme',
          'O nome do diretor'
        ],
        correctOptionIndex: 0, // A
        weight: 1.0,
        explanation: 'Subtexto é o sentido implícito, a intenção real e a corrente emocional não dita diretamente nos diálogos.'
      },
      {
        id: 'q3-6',
        type: 'multiple_choice',
        prompt: '6. Uma cena filmável deve conter, entre outros elementos:',
        options: [
          'Lugar, tempo, personagens e mudança',
          'Apenas diálogo',
          'Apenas descrição literária',
          'Apenas música'
        ],
        correctOptionIndex: 0, // A
        weight: 1.0,
        explanation: 'Uma cena cinematográfica eficaz estabelece unidade de espaço, tempo e personagens, promovendo uma mudança de estado dramático.'
      },
      {
        id: 'q3-7',
        type: 'multiple_choice',
        prompt: '7. Qual documento ajuda a planejar como filmar a cena?',
        options: [
          'Decupagem',
          'Release',
          'Orçamento final',
          'Cartaz'
        ],
        correctOptionIndex: 0, // A
        weight: 1.0,
        explanation: 'A decupagem é a tradução técnica do roteiro em planos ordenados, movimentos de câmera e especificações de filmagem.'
      },
      {
        id: 'q3-8',
        type: 'multiple_choice',
        prompt: '8. Qual é uma estrutura simples de três movimentos?',
        options: [
          'Começo, desenvolvimento e desfecho',
          'Plano, foco e lente',
          'Som, cor e figurino',
          'Festival, estreia e prêmio'
        ],
        correctOptionIndex: 0, // A
        weight: 1.0,
        explanation: 'A estrutura clássica em três atos organiza a história em apresentação/começo, complicação/desenvolvimento e resolução/desfecho.'
      },
      {
        id: 'q3-9',
        type: 'multiple_choice',
        prompt: '9. No roteiro inicial, a descrição deve privilegiar:',
        options: [
          'Ações que possam ser vistas ou ouvidas',
          'Pensamentos impossíveis de filmar',
          'Instruções técnicas excessivas',
          'Apenas opiniões do autor'
        ],
        correctOptionIndex: 0, // A
        weight: 1.0,
        explanation: 'A escrita cinematográfica foca naquilo que é exteriorizável sensorialmente através da câmera e do microfone.'
      },
      {
        id: 'q3-10',
        type: 'multiple_choice',
        prompt: '10. No exercício \'A Última Carta\', qual conjunto é solicitado?',
        options: [
          'Storyline, logline, sinopse, escaleta de cinco cenas e uma cena de roteiro',
          'Apenas cartaz',
          'Apenas orçamento',
          'Apenas trailer'
        ],
        correctOptionIndex: 0, // A
        weight: 1.0,
        explanation: 'O exercício prático exige a construção encadeada de storyline, logline, sinopse, escaleta de 5 cenas e 1 cena formatada de roteiro.'
      }
    ]
  },

  // AVALIAÇÃO 04 - DIREÇÃO E DIREÇÃO DE ATORES
  // GABARITO OFICIAL: 1-A | 2-A | 3-A | 4-A | 5-A | 6-A | 7-A | 8-A | 9-A | 10-A
  {
    id: 'eval-4',
    moduleId: 4,
    moduleNumber: 4,
    title: 'Avaliação Oficial 04 — Direção e Direção de Atores',
    description: '10 questões objetivas de múltipla escolha (1,0 ponto cada, nota máxima 10,0). Correção automática com resultado imediato.',
    maxScore: 10.0,
    minPassingScore: 6.0,
    questions: [
      {
        id: 'q4-1',
        type: 'multiple_choice',
        prompt: '1. Qual é o papel central da direção?',
        options: [
          'Integrar decisões criativas e dialogar com os setores da produção',
          'Apenas operar câmera',
          'Apenas editar',
          'Apenas divulgar'
        ],
        correctOptionIndex: 0, // A
        weight: 1.0,
        explanation: 'O diretor é o maestro criativo que articula a visão artística com todas as equipes técnicas e artísticas do filme.'
      },
      {
        id: 'q4-2',
        type: 'multiple_choice',
        prompt: '2. Uma orientação útil ao ator deve ser:',
        options: [
          'Concreta e ligada à ação',
          'Vaga e genérica',
          'Apenas emocional',
          'Sem relação com a cena'
        ],
        correctOptionIndex: 0, // A
        weight: 1.0,
        explanation: 'Direções verbais claras e verbos de ação física ou psicológica fornecem ao ator ferramentas palpáveis para atuar com verdade.'
      },
      {
        id: 'q4-3',
        type: 'multiple_choice',
        prompt: '3. O que é objetivo da personagem?',
        options: [
          'O que ela quer',
          'O que o diretor quer vender',
          'O tipo de lente',
          'O horário da diária'
        ],
        correctOptionIndex: 0, // A
        weight: 1.0,
        explanation: 'O objetivo da personagem representa a motivação interna profunda do que ela busca obter em cada cena.'
      },
      {
        id: 'q4-4',
        type: 'multiple_choice',
        prompt: '4. O que é subtexto?',
        options: [
          'O que existe por baixo das palavras',
          'O nome da locação',
          'O orçamento',
          'A trilha'
        ],
        correctOptionIndex: 0, // A
        weight: 1.0,
        explanation: 'Subtexto é o pensamento real e o jogo psicológico invisível que dá densidade à atuação dos atores.'
      },
      {
        id: 'q4-5',
        type: 'multiple_choice',
        prompt: '5. Para que serve a decupagem?',
        options: [
          'Transformar a cena escrita em lista de planos e ações de gravação',
          'Fazer divulgação',
          'Criar orçamento publicitário',
          'Registrar festivais'
        ],
        correctOptionIndex: 0, // A
        weight: 1.0,
        explanation: 'A decupagem é o guia prático do diretor e do fotógrafo no set, detalhando cada plano necessário para contar a cena.'
      },
      {
        id: 'q4-6',
        type: 'multiple_choice',
        prompt: '6. O ensaio serve para testar:',
        options: [
          'Ritmo, texto e marcação',
          'Apenas figurino',
          'Apenas o cartaz',
          'Apenas a exportação'
        ],
        correctOptionIndex: 0, // A
        weight: 1.0,
        explanation: 'Os ensaios afinam o tempo cênico, a naturalidade dos diálogos e os deslocamentos espaciais (marcação) dos atores.'
      },
      {
        id: 'q4-7',
        type: 'multiple_choice',
        prompt: '7. Por que registrar continuidade?',
        options: [
          'Para manter coerência de roupas, objetos, posições e ações',
          'Para aumentar a duração',
          'Para substituir o roteiro',
          'Para escolher festival'
        ],
        correctOptionIndex: 0, // A
        weight: 1.0,
        explanation: 'O controle de continuidade assegura que as tomadas gravadas fora de ordem possam ser montadas sem saltos visuais ou incoerências.'
      },
      {
        id: 'q4-8',
        type: 'multiple_choice',
        prompt: '8. Uma tomada é:',
        options: [
          'Uma versão registrada da cena',
          'Um tipo de orçamento',
          'Um documento de festival',
          'Um efeito sonoro'
        ],
        correctOptionIndex: 0, // A
        weight: 1.0,
        explanation: 'Uma tomada (take) é cada gravação contínua individual realizada de um determinado plano durante a filmagem.'
      },
      {
        id: 'q4-9',
        type: 'multiple_choice',
        prompt: '9. Em temas delicados ou contato físico, a direção deve:',
        options: [
          'Planejar limites, comunicação e consentimento',
          'Improvisar sem conversar',
          'Evitar qualquer ensaio',
          'Ignorar desconfortos'
        ],
        correctOptionIndex: 0, // A
        weight: 1.0,
        explanation: 'A direção ética e responsável estabelece conversas prévias, coreografias claras e consentimento explícito no set.'
      },
      {
        id: 'q4-10',
        type: 'multiple_choice',
        prompt: '10. No exercício do módulo, quantos planos indispensáveis devem ser definidos?',
        options: [
          'Três',
          'Dez',
          'Vinte',
          'Nenhum'
        ],
        correctOptionIndex: 0, // A
        weight: 1.0,
        explanation: 'O exercício orienta a síntese rigorosa definindo os três planos estruturais indispensáveis para cobrir a cena dramática.'
      }
    ]
  },

  // AVALIAÇÃO 05 - FOTOGRAFIA, CÂMERA E ILUMINAÇÃO
  // GABARITO OFICIAL: 1-A | 2-A | 3-A | 4-A | 5-A | 6-A | 7-A | 8-A | 9-A | 10-A
  {
    id: 'eval-5',
    moduleId: 5,
    moduleNumber: 5,
    title: 'Avaliação Oficial 05 — Fotografia, Câmera e Iluminação',
    description: '10 questões objetivas de múltipla escolha (1,0 ponto cada, nota máxima 10,0). Correção automática com resultado imediato.',
    maxScore: 10.0,
    minPassingScore: 6.0,
    questions: [
      {
        id: 'q5-1',
        type: 'multiple_choice',
        prompt: '1. O plano geral serve principalmente para:',
        options: [
          'Situar pessoa e ambiente',
          'Destacar apenas um detalhe',
          'Mostrar apenas uma expressão',
          'Gravar somente áudio'
        ],
        correctOptionIndex: 0, // A
        weight: 1.0,
        explanation: 'O plano geral revela a relação espacial entre a figura humana e a geografia ao seu redor.'
      },
      {
        id: 'q5-2',
        type: 'multiple_choice',
        prompt: '2. O primeiro plano aproxima principalmente:',
        options: [
          'A expressão',
          'O cenário completo',
          'O orçamento',
          'A equipe inteira'
        ],
        correctOptionIndex: 0, // A
        weight: 1.0,
        explanation: 'O primeiro plano (close) evidencia os micro-movimentos do rosto e a intensidade psicológica do ator.'
      },
      {
        id: 'q5-3',
        type: 'multiple_choice',
        prompt: '3. Composição é:',
        options: [
          'Organização dos elementos dentro do quadro',
          'Montagem do filme',
          'Organização do orçamento',
          'Escolha do festival'
        ],
        correctOptionIndex: 0, // A
        weight: 1.0,
        explanation: 'Composição é o arranjo visual harmonioso ou intencionalmente contrastante dos objetos e luzes dentro do enquadramento.'
      },
      {
        id: 'q5-4',
        type: 'multiple_choice',
        prompt: '4. A regra dos terços é:',
        options: [
          'Uma ferramenta de composição, não uma lei',
          'Uma obrigação em todo plano',
          'Uma técnica de som',
          'Uma regra de roteiro'
        ],
        correctOptionIndex: 0, // A
        weight: 1.0,
        explanation: 'A regra dos terços é um guia de referência para posicionar centros de interesse, que pode ser seguida ou desconstruída criativamente.'
      },
      {
        id: 'q5-5',
        type: 'multiple_choice',
        prompt: '5. A luz lateral pode:',
        options: [
          'Criar volume',
          'Eliminar sombras sempre',
          'Substituir o som',
          'Impedir a exposição'
        ],
        correctOptionIndex: 0, // A
        weight: 1.0,
        explanation: 'A luz lateral destaca relevos, texturas e profundidade através do jogo entre áreas iluminadas e sombras demarcadas.'
      },
      {
        id: 'q5-6',
        type: 'multiple_choice',
        prompt: '6. A contraluz pode criar:',
        options: [
          'Silhueta',
          'Som ambiente',
          'Roteiro',
          'Continuidade sonora'
        ],
        correctOptionIndex: 0, // A
        weight: 1.0,
        explanation: 'Iluminando o sujeito por trás, a contraluz recorta o contorno contra o fundo ou gera uma silhueta expressiva.'
      },
      {
        id: 'q5-7',
        type: 'multiple_choice',
        prompt: '7. Ao gravar com celular, é recomendável:',
        options: [
          'Limpar a lente e estabilizar o aparelho',
          'Usar zoom digital sempre',
          'Ignorar foco',
          'Mudar horizontal/vertical durante a cena'
        ],
        correctOptionIndex: 0, // A
        weight: 1.0,
        explanation: 'Limpeza prévia da lente e estabilização firme são cuidados primordiais para obter imagem límpida e profissional com smartphones.'
      },
      {
        id: 'q5-8',
        type: 'multiple_choice',
        prompt: '8. O foco e a exposição devem ser controlados para:',
        options: [
          'Evitar variações indesejadas durante a tomada',
          'Aumentar o ruído',
          'Substituir a montagem',
          'Criar roteiro'
        ],
        correctOptionIndex: 0, // A
        weight: 1.0,
        explanation: 'O travamento manual de exposição e foco impede oscilações eletrônicas bruscas que comprometem a cena.'
      },
      {
        id: 'q5-9',
        type: 'multiple_choice',
        prompt: '9. O exercício de iluminação propõe quatro situações:',
        options: [
          'Frontal, lateral, contraluz e janela',
          'Azul, vermelho, verde e preto',
          'Sol, chuva, neve e noite',
          'Grande, médio, close e detalhe'
        ],
        correctOptionIndex: 0, // A
        weight: 1.0,
        explanation: 'O exercício prático propõe captar retratos sob quatro esquemas luminosos: frontal, lateral, contraluz e iluminação natural de janela.'
      },
      {
        id: 'q5-10',
        type: 'multiple_choice',
        prompt: '10. Antes de gravar, a orientação sobre horizontal ou vertical é:',
        options: [
          'Definir conforme o destino e a proposta',
          'Sempre vertical',
          'Sempre horizontal',
          'Decidir somente depois da edição'
        ],
        correctOptionIndex: 0, // A
        weight: 1.0,
        explanation: 'A orientação do quadro (aspect ratio) deve ser planejada previamente conforme a linguagem estética e as plataformas de exibição.'
      }
    ]
  },

  // AVALIAÇÃO 06 - SOM E TRILHA SONORA
  // GABARITO OFICIAL: 1-A | 2-A | 3-A | 4-A | 5-A | 6-A | 7-A | 8-A | 9-A | 10-A
  {
    id: 'eval-6',
    moduleId: 6,
    moduleNumber: 6,
    title: 'Avaliação Oficial 06 — Som e Trilha Sonora',
    description: '10 questões objetivas de múltipla escolha (1,0 ponto cada, nota máxima 10,0). Correção automática com resultado imediato.',
    maxScore: 10.0,
    minPassingScore: 6.0,
    questions: [
      {
        id: 'q6-1',
        type: 'multiple_choice',
        prompt: '1. O som pode:',
        options: [
          'Situar, criar atmosfera e mostrar ações fora do quadro',
          'Apenas preencher silêncio',
          'Substituir o roteiro',
          'Eliminar a fotografia'
        ],
        correctOptionIndex: 0, // A
        weight: 1.0,
        explanation: 'O desenho de som projeta o universo diegético para além das bordas visuais da tela, expandindo o espaço e o suspense.'
      },
      {
        id: 'q6-2',
        type: 'multiple_choice',
        prompt: '2. Quais são camadas importantes de som?',
        options: [
          'Diálogo, ambiência, efeitos e trilha',
          'Apenas música',
          'Apenas voz',
          'Apenas ruído'
        ],
        correctOptionIndex: 0, // A
        weight: 1.0,
        explanation: 'A trilha sonora completa é composta por quatro pilares entrelaçados: vozes (diálogos), ambiências de fundo, efeitos/foley e música.'
      },
      {
        id: 'q6-3',
        type: 'multiple_choice',
        prompt: '3. Uma boa prática de captação é:',
        options: [
          'Aproximar o microfone da fonte e testar com fones',
          'Afastar o microfone o máximo possível',
          'Ignorar ruídos',
          'Não testar'
        ],
        correctOptionIndex: 0, // A
        weight: 1.0,
        explanation: 'Posicionar o microfone o mais próximo possível da boca sem entrar no enquadramento e monitorar com fones fechados garante clareza acústica.'
      },
      {
        id: 'q6-4',
        type: 'multiple_choice',
        prompt: '4. Room tone é:',
        options: [
          'Registro do som ambiente do local',
          'Música principal',
          'Voz do diretor',
          'Som de abertura'
        ],
        correctOptionIndex: 0, // A
        weight: 1.0,
        explanation: 'Room tone é a gravação de 1 minuto do ruído acústico ambiente da locação em absoluto silêncio da equipe.'
      },
      {
        id: 'q6-5',
        type: 'multiple_choice',
        prompt: '5. O room tone ajuda principalmente a:',
        options: [
          'Suavizar cortes na montagem',
          'Criar roteiro',
          'Escolher elenco',
          'Fazer orçamento'
        ],
        correctOptionIndex: 0, // A
        weight: 1.0,
        explanation: 'O room tone preenche emendas de áudio e silêncios entre falas, impedindo que o espectador perceba cortes secos no fundo sonoro.'
      },
      {
        id: 'q6-6',
        type: 'multiple_choice',
        prompt: '6. Música em uma cena:',
        options: [
          'Pode ampliar, antecipar ou contrastar emoção',
          'Deve sempre explicar a imagem',
          'Nunca deve ser usada',
          'Substitui o diálogo'
        ],
        correctOptionIndex: 0, // A
        weight: 1.0,
        explanation: 'A música dialoga com a narrativa: pode potencializar o sentimento, criar expectativa de perigo ou ironizar a cena por contraponto.'
      },
      {
        id: 'q6-7',
        type: 'multiple_choice',
        prompt: '7. Silêncio no audiovisual:',
        options: [
          'Também pode ser uma escolha dramática',
          'É sempre um erro',
          'Deve ser eliminado',
          'Só existe em documentário'
        ],
        correctOptionIndex: 0, // A
        weight: 1.0,
        explanation: 'O silêncio deliberado gera tensão palpável, intimidade profunda e amplifica o impacto de um som subsequente.'
      },
      {
        id: 'q6-8',
        type: 'multiple_choice',
        prompt: '8. Para entrevistas, é recomendável escolher local com:',
        options: [
          'Pouco eco e pouco ruído',
          'Muito trânsito',
          'Ar-condicionado próximo',
          'Obras e máquinas'
        ],
        correctOptionIndex: 0, // A
        weight: 1.0,
        explanation: 'Ambientes acusticamente secos, sem reverberação ou ruídos mecânicos contínuos, preservam a inteligibilidade da fala.'
      },
      {
        id: 'q6-9',
        type: 'multiple_choice',
        prompt: '9. Músicas conhecidas usadas em uma obra pública podem exigir:',
        options: [
          'Autorização compatível com os direitos',
          'Apenas aumento de volume',
          'Nenhuma preocupação',
          'Troca de câmera'
        ],
        correctOptionIndex: 0, // A
        weight: 1.0,
        explanation: 'Qualquer fonograma de terceiros demanda licença autoral expressa para veiculação legal em festivais ou plataformas.'
      },
      {
        id: 'q6-10',
        type: 'multiple_choice',
        prompt: '10. O exercício prático compara:',
        options: [
          'Ambiente e fala em duas distâncias diferentes',
          'Apenas duas câmeras',
          'Apenas duas músicas',
          'Apenas duas lentes'
        ],
        correctOptionIndex: 0, // A
        weight: 1.0,
        explanation: 'O exercício analisa na prática a perda de presença e a entrada de eco conforme o microfone se afasta do falante.'
      }
    ]
  },

  // AVALIAÇÃO 07 - MONTAGEM E PÓS-PRODUÇÃO
  // GABARITO OFICIAL: 1-A | 2-A | 3-A | 4-A | 5-A | 6-A | 7-A | 8-A | 9-A | 10-A
  {
    id: 'eval-7',
    moduleId: 7,
    moduleNumber: 7,
    title: 'Avaliação Oficial 07 — Montagem e Pós-Produção',
    description: '10 questões objetivas de múltipla escolha (1,0 ponto cada, nota máxima 10,0). Correção automática com resultado imediato.',
    maxScore: 10.0,
    minPassingScore: 6.0,
    questions: [
      {
        id: 'q7-1',
        type: 'multiple_choice',
        prompt: '1. Montagem é:',
        options: [
          'Escolher ordem, duração e relação entre imagens e sons',
          'Apenas aplicar efeitos',
          'Apenas exportar',
          'Apenas corrigir cor'
        ],
        correctOptionIndex: 0, // A
        weight: 1.0,
        explanation: 'A montagem é a reescrita final do filme através da determinação da ordem temporal, ritmo de corte e diálogo entre imagem e som.'
      },
      {
        id: 'q7-2',
        type: 'multiple_choice',
        prompt: '2. Antes de começar a editar, é recomendável:',
        options: [
          'Fazer backup e organizar os arquivos',
          'Aplicar efeitos',
          'Exportar imediatamente',
          'Apagar os brutos'
        ],
        correctOptionIndex: 0, // A
        weight: 1.0,
        explanation: 'Segurança e disciplina operacional: manter backups duplicados e pastas organizadas por cenas evita perdas desastrosas.'
      },
      {
        id: 'q7-3',
        type: 'multiple_choice',
        prompt: '3. Corte por ação ajuda a:',
        options: [
          'Manter fluidez de um movimento entre planos',
          'Escolher figurino',
          'Criar orçamento',
          'Definir festival'
        ],
        correctOptionIndex: 0, // A
        weight: 1.0,
        explanation: 'Cortar no meio de um gesto esconde a transição óptica e confere naturalidade e dinamismo ao corte.'
      },
      {
        id: 'q7-4',
        type: 'multiple_choice',
        prompt: '4. Corte de reação mostra:',
        options: [
          'Como alguém recebe uma informação',
          'Apenas o cenário',
          'Apenas o objeto',
          'Apenas a câmera'
        ],
        correctOptionIndex: 0, // A
        weight: 1.0,
        explanation: 'O cinema reside com frequência não em quem fala, mas na reação silenciosa e emocional de quem escuta.'
      },
      {
        id: 'q7-5',
        type: 'multiple_choice',
        prompt: '5. B-roll são:',
        options: [
          'Imagens complementares que ajudam a contextualizar e cobrir cortes',
          'Arquivos de áudio',
          'Créditos',
          'Documentos de produção'
        ],
        correctOptionIndex: 0, // A
        weight: 1.0,
        explanation: 'B-roll é o material de cobertura visual que enriquece a cena, ilustra os depoimentos e mascara saltos de eixo.'
      },
      {
        id: 'q7-6',
        type: 'multiple_choice',
        prompt: '6. A primeira preocupação da montagem deve ser:',
        options: [
          'Garantir que a história se entenda',
          'Aplicar muitas transições',
          'Usar todos os efeitos',
          'Aumentar a saturação'
        ],
        correctOptionIndex: 0, // A
        weight: 1.0,
        explanation: 'A clareza narrativa e o engajamento emocional do público antecedem qualquer adereço ou efeito de edição.'
      },
      {
        id: 'q7-7',
        type: 'multiple_choice',
        prompt: '7. Na revisão técnica, é importante verificar:',
        options: [
          'Áudio, continuidade, créditos, foco e telas pretas',
          'Apenas o cartaz',
          'Apenas o orçamento',
          'Apenas o figurino'
        ],
        correctOptionIndex: 0, // A
        weight: 1.0,
        explanation: 'O controle de qualidade avalia picos sonoros, sincronia de lábios, ortografia dos créditos e ausência de frames vazios.'
      },
      {
        id: 'q7-8',
        type: 'multiple_choice',
        prompt: '8. É útil assistir a uma versão com:',
        options: [
          'Fones e sem fones',
          'Apenas fones',
          'Apenas celular',
          'Apenas sem som'
        ],
        correctOptionIndex: 0, // A
        weight: 1.0,
        explanation: 'Testar a mixagem tanto em fones de precisão quanto em caixas comuns ou alto-falantes de TV assegura compatibilidade ampla.'
      },
      {
        id: 'q7-9',
        type: 'multiple_choice',
        prompt: '9. O projeto editável deve ser:',
        options: [
          'Guardado junto com versões de trabalho e final',
          'Apagado após exportar',
          'Enviado ao festival sempre',
          'Transformado em cartaz'
        ],
        correctOptionIndex: 0, // A
        weight: 1.0,
        explanation: 'O arquivo de projeto deve ser preservado para possibilitar reedições, cortes alternativos para festivais ou correções futuras.'
      },
      {
        id: 'q7-10',
        type: 'multiple_choice',
        prompt: '10. O exercício do módulo pede uma sequência de:',
        options: [
          '30 a 60 segundos com pelo menos cinco planos',
          '10 minutos com um plano',
          '30 minutos sem cortes',
          '5 horas de material'
        ],
        correctOptionIndex: 0, // A
        weight: 1.0,
        explanation: 'O exercício prático estipula a montagem rítmica concisa de 30 a 60 segundos articulando no mínimo cinco planos.'
      }
    ]
  },

  // AVALIAÇÃO 08 - PRODUÇÃO EXECUTIVA E PLANEJAMENTO
  // GABARITO OFICIAL: 1-A | 2-A | 3-A | 4-A | 5-A | 6-A | 7-A | 8-A | 9-A | 10-A
  {
    id: 'eval-8',
    moduleId: 8,
    moduleNumber: 8,
    title: 'Avaliação Oficial 08 — Produção Executiva e Planejamento',
    description: '10 questões objetivas de múltipla escolha (1,0 ponto cada, nota máxima 10,0). Correção automática com resultado imediato.',
    maxScore: 10.0,
    minPassingScore: 6.0,
    questions: [
      {
        id: 'q8-1',
        type: 'multiple_choice',
        prompt: '1. A produção começa antes da filmagem com:',
        options: [
          'Roteiro, equipe, locações, equipamentos, autorizações, cronograma e orçamento',
          'Apenas cartaz',
          'Apenas estreia',
          'Apenas festival'
        ],
        correctOptionIndex: 0, // A
        weight: 1.0,
        explanation: 'Produzir é viabilizar concretamente: coordenar pessoas, gerenciar custos, providenciar licenças e organizar a logística de filmagem.'
      },
      {
        id: 'q8-2',
        type: 'multiple_choice',
        prompt: '2. Por que visitar a locação?',
        options: [
          'Para verificar acesso, ruído, luz, energia e segurança',
          'Para escolher o prêmio',
          'Para editar o filme',
          'Para criar a trilha'
        ],
        correctOptionIndex: 0, // A
        weight: 1.0,
        explanation: 'A visita técnica (rec) antecipa problemas de tomadas elétricas, iluminação solar ao longo do dia, acústica e segurança do set.'
      },
      {
        id: 'q8-3',
        type: 'multiple_choice',
        prompt: '3. A ordem do dia reúne:',
        options: [
          'Horário, local, cenas, contatos e observações',
          'Apenas créditos',
          'Apenas sinopse',
          'Apenas cartaz'
        ],
        correctOptionIndex: 0, // A
        weight: 1.0,
        explanation: 'A Ordem do Dia (call sheet) é a folha de bordo diária que direciona horários de chamada para cada membro do elenco e da equipe.'
      },
      {
        id: 'q8-4',
        type: 'multiple_choice',
        prompt: '4. Produção cuida, entre outras coisas, de:',
        options: [
          'Tempo, alimentação, transporte e comunicação',
          'Apenas atuação',
          'Apenas montagem',
          'Apenas fotografia'
        ],
        correctOptionIndex: 0, // A
        weight: 1.0,
        explanation: 'O bem-estar e o rendimento da equipe dependem da alimentação pontual, transporte seguro e comunicação fluida providos pela produção.'
      },
      {
        id: 'q8-5',
        type: 'multiple_choice',
        prompt: '5. Depois da gravação, é essencial:',
        options: [
          'Fazer backup e organizar arquivos',
          'Apagar os brutos',
          'Publicar imediatamente',
          'Ignorar permissões'
        ],
        correctOptionIndex: 0, // A
        weight: 1.0,
        explanation: 'Descarregar cartões imediatamente em duas mídias físicas distintas com checagem de integridade (checksum) é regra de ouro no audiovisual.'
      },
      {
        id: 'q8-6',
        type: 'multiple_choice',
        prompt: '6. Viabilidade significa:',
        options: [
          'O projeto caber nos recursos disponíveis',
          'O filme ser sempre caro',
          'Ter muitos atores',
          'Ter muitas locações'
        ],
        correctOptionIndex: 0, // A
        weight: 1.0,
        explanation: 'Um projeto viável adapta sua ambição estética e técnica às reais condições financeiras, humanas e materiais da produção.'
      },
      {
        id: 'q8-7',
        type: 'multiple_choice',
        prompt: '7. Um orçamento básico pode incluir:',
        options: [
          'Transporte, alimentação, locação, equipamento, arte e reserva',
          'Apenas cachês',
          'Apenas câmera',
          'Apenas divulgação'
        ],
        correctOptionIndex: 0, // A
        weight: 1.0,
        explanation: 'O orçamento financeiro contempla despesas operacionais, aluguel de espaço e maquinário, figurinos e margem para imprevistos.'
      },
      {
        id: 'q8-8',
        type: 'multiple_choice',
        prompt: '8. O plano B existe para:',
        options: [
          'Proteger o trabalho diante de imprevistos',
          'Substituir o roteiro',
          'Aumentar a duração',
          'Evitar planejamento'
        ],
        correctOptionIndex: 0, // A
        weight: 1.0,
        explanation: 'Planos de contingência garantem soluções rápidas diante de chuvas repentinas, quebras de equipamento ou ausências de atores.'
      },
      {
        id: 'q8-9',
        type: 'multiple_choice',
        prompt: '9. A cessão de imagem é um exemplo de:',
        options: [
          'Documento útil de produção',
          'Tipo de enquadramento',
          'Tipo de montagem',
          'Tipo de trilha'
        ],
        correctOptionIndex: 0, // A
        weight: 1.0,
        explanation: 'Termos de autorização e cessão de direitos de imagem e voz resguardam juridicamente a obra contra futuras contestações.'
      },
      {
        id: 'q8-10',
        type: 'multiple_choice',
        prompt: '10. O exercício prático pede uma ordem do dia com:',
        options: [
          'Equipe, horário, local, equipamentos, plano B e backup',
          'Apenas título',
          'Apenas logline',
          'Apenas cartaz'
        ],
        correctOptionIndex: 0, // A
        weight: 1.0,
        explanation: 'O exercício prático consolida o aprendizado organizando uma Ordem do Dia real com todos os campos logísticos e de segurança.'
      }
    ]
  },

  // AVALIAÇÃO 09 - DISTRIBUIÇÃO, FESTIVAIS E MERCADO AUDIOVISUAL
  // GABARITO OFICIAL: 1-A | 2-A | 3-A | 4-A | 5-A | 6-A | 7-A | 8-A | 9-A | 10-A
  {
    id: 'eval-9',
    moduleId: 9,
    moduleNumber: 9,
    title: 'Avaliação Oficial 09 — Distribuição, Festivais e Mercado Audiovisual',
    description: '10 questões objetivas de múltipla escolha (1,0 ponto cada, nota máxima 10,0). Correção automática com resultado imediato.',
    maxScore: 10.0,
    minPassingScore: 6.0,
    questions: [
      {
        id: 'q9-1',
        type: 'multiple_choice',
        prompt: '1. Distribuição é:',
        options: [
          'O caminho do filme até seus públicos e espaços de exibição',
          'Apenas a montagem',
          'Apenas a filmagem',
          'Apenas o roteiro'
        ],
        correctOptionIndex: 0, // A
        weight: 1.0,
        explanation: 'Distribuir é a estratégia de fazer a obra circular, encontrar espectadores e conquistar telas de cinema, mostras e canais digitais.'
      },
      {
        id: 'q9-2',
        type: 'multiple_choice',
        prompt: '2. Antes de escolher canais de circulação, é importante definir:',
        options: [
          'Público e objetivo',
          'Apenas o orçamento',
          'Apenas a câmera',
          'Apenas o elenco'
        ],
        correctOptionIndex: 0, // A
        weight: 1.0,
        explanation: 'Conhecer para quem o filme foi feito e que impacto se almeja alcançar direciona as escolhas certas de festivais e mostras.'
      },
      {
        id: 'q9-3',
        type: 'multiple_choice',
        prompt: '3. Cada festival possui:',
        options: [
          'Regulamento próprio',
          'Regras idênticas',
          'Apenas uma data',
          'Nenhuma exigência'
        ],
        correctOptionIndex: 0, // A
        weight: 1.0,
        explanation: 'Cada certame estipula exigências específicas de ineditismo, minutagem, legendagem e prazos rigorosos de inscrição.'
      },
      {
        id: 'q9-4',
        type: 'multiple_choice',
        prompt: '4. O que pode constar em um kit de divulgação?',
        options: [
          'Logline, sinopse, cartaz, stills, trailer, teaser, release e ficha técnica',
          'Apenas o roteiro',
          'Apenas o orçamento',
          'Apenas o certificado'
        ],
        correctOptionIndex: 0, // A
        weight: 1.0,
        explanation: 'O press kit profissional mune a imprensa e programadores de todos os materiais visuais e informativos indispensáveis para promover a obra.'
      },
      {
        id: 'q9-5',
        type: 'multiple_choice',
        prompt: '5. Still é:',
        options: [
          'Foto de cena utilizada como material de divulgação',
          'Um tipo de áudio',
          'Uma versão do roteiro',
          'Um documento financeiro'
        ],
        correctOptionIndex: 0, // A
        weight: 1.0,
        explanation: 'Fotografias de cena em alta resolução (stills) captadas durante as filmagens são indispensáveis para catálogos, pôsteres e matérias de jornal.'
      },
      {
        id: 'q9-6',
        type: 'multiple_choice',
        prompt: '6. Por que controlar prazos de festivais em planilha?',
        options: [
          'Para acompanhar links, prazos, exigências, taxas e resultados',
          'Para editar o filme',
          'Para escolher atores',
          'Para substituir o cartaz'
        ],
        correctOptionIndex: 0, // A
        weight: 1.0,
        explanation: 'O circuito de festivais exige controle metódico de calendários, taxas de submissão e formatos de cópia de exibição.'
      },
      {
        id: 'q9-7',
        type: 'multiple_choice',
        prompt: '7. Uma janela de exibição é:',
        options: [
          'Período ou canal planejado para lançamento/exibição',
          'Uma janela física',
          'Uma lente',
          'Um tipo de microfone'
        ],
        correctOptionIndex: 0, // A
        weight: 1.0,
        explanation: 'Janela de exibição é a ordem temporal cronometrada dos canais em que a obra é mostrada (ex: festival → cinema → streaming aberto).'
      },
      {
        id: 'q9-8',
        type: 'multiple_choice',
        prompt: '8. Antes de publicar na internet, pode ser necessário considerar:',
        options: [
          'Condições de elegibilidade de festivais',
          'Apenas a duração',
          'Apenas o título',
          'Apenas o gênero'
        ],
        correctOptionIndex: 0, // A
        weight: 1.0,
        explanation: 'Disponibilizar o filme livremente na web desqualifica a obra para a maioria dos grandes festivais competitivos que exigem ineditismo.'
      },
      {
        id: 'q9-9',
        type: 'multiple_choice',
        prompt: '9. Em projetos locais, parceiros comunitários podem ser:',
        options: [
          'Mais importantes que números de alcance, dependendo do objetivo',
          'Sempre irrelevantes',
          'Proibidos',
          'Apenas patrocinadores'
        ],
        correctOptionIndex: 0, // A
        weight: 1.0,
        explanation: 'Cineclubes, escolas e centros culturais locais geram debates e conexões profundas com o público-alvo prioritário.'
      },
      {
        id: 'q9-10',
        type: 'multiple_choice',
        prompt: '10. O exercício do módulo pede:',
        options: [
          'Kit de divulgação e calendário de circulação',
          'Apenas uma câmera',
          'Apenas um roteiro',
          'Apenas um orçamento'
        ],
        correctOptionIndex: 0, // A
        weight: 1.0,
        explanation: 'O exercício estrutura o kit completo de divulgação e o cronograma planejado de inscrições e exibições públicas.'
      }
    ]
  },

  // AVALIAÇÃO 10 - PROJETO FINAL: CURTA-METRAGEM
  // GABARITO OFICIAL: 1-A | 2-A | 3-A | 4-A | 5-A | 6-A | 7-A | 8-A | 9-A | 10-A
  {
    id: 'eval-10',
    moduleId: 10,
    moduleNumber: 10,
    title: 'Avaliação Oficial 10 — Projeto Final: Curta-Metragem',
    description: '10 questões objetivas de múltipla escolha (1,0 ponto cada, nota máxima 10,0). Correção automática com resultado imediato.',
    maxScore: 10.0,
    minPassingScore: 6.0,
    questions: [
      {
        id: 'q10-1',
        type: 'multiple_choice',
        prompt: '1. O principal objetivo do projeto final é:',
        options: [
          'Integrar as etapas do curso em um curta possível de realizar',
          'Criar apenas um cartaz',
          'Fazer apenas um roteiro',
          'Comprar equipamentos'
        ],
        correctOptionIndex: 0, // A
        weight: 1.0,
        explanation: 'O projeto final é a coroação prática onde o aluno aplica os conhecimentos de roteiro, direção, câmera, som e montagem em uma obra concreta.'
      },
      {
        id: 'q10-2',
        type: 'multiple_choice',
        prompt: '2. Um escopo realizável deve considerar:',
        options: [
          'Duração, elenco, locações e dias de gravação',
          'Apenas o gênero',
          'Apenas o título',
          'Apenas a música'
        ],
        correctOptionIndex: 0, // A
        weight: 1.0,
        explanation: 'Dimensionar o número de atores, locais e diárias assegura que o curta seja finalizado com excelência dentro dos prazos.'
      },
      {
        id: 'q10-3',
        type: 'multiple_choice',
        prompt: '3. No planejamento do curta, é importante preparar:',
        options: [
          'Roteiro/escaleta, decupagem, cronograma e lista de recursos',
          'Apenas o cartaz',
          'Apenas o trailer',
          'Apenas o certificado'
        ],
        correctOptionIndex: 0, // A
        weight: 1.0,
        explanation: 'Documentos organizados de pré-produção diminuem erros no set e garantem segurança técnica e criativa.'
      },
      {
        id: 'q10-4',
        type: 'multiple_choice',
        prompt: '4. Na filmagem, além do planejamento, é importante cuidar de:',
        options: [
          'Continuidade e materiais de cobertura',
          'Apenas efeitos',
          'Apenas créditos',
          'Apenas festivais'
        ],
        correctOptionIndex: 0, // A
        weight: 1.0,
        explanation: 'Garantir planos de cobertura (cutaways) e vigiar a continuidade salva a montagem no caso de imprevistos de cena.'
      },
      {
        id: 'q10-5',
        type: 'multiple_choice',
        prompt: '5. Na montagem final, deve-se garantir:',
        options: [
          'Clareza, áudio compreensível, créditos e revisão',
          'Muitos efeitos',
          'Ausência de créditos',
          'Som muito alto'
        ],
        correctOptionIndex: 0, // A
        weight: 1.0,
        explanation: 'Um acabamento polido prioriza clareza narrativa, equilíbrio sonoro impecável e créditos devidamente creditados.'
      },
      {
        id: 'q10-6',
        type: 'multiple_choice',
        prompt: '6. Na apresentação do curta, o aluno deve mostrar:',
        options: [
          'Título, sinopse, gênero, duração, equipe, processo e filme',
          'Apenas o filme',
          'Apenas o cartaz',
          'Apenas o roteiro'
        ],
        correctOptionIndex: 0, // A
        weight: 1.0,
        explanation: 'Apresentar a obra cinematográfica acompanhada de sua contextualização e ficha técnica reflete postura profissional.'
      },
      {
        id: 'q10-7',
        type: 'multiple_choice',
        prompt: '7. O pacote final de entrega pode incluir:',
        options: [
          'Título, logline, sinopse, roteiro/escaleta, plano de gravação, ficha técnica, créditos, arquivo final, imagem e reflexão',
          'Apenas vídeo',
          'Apenas roteiro',
          'Apenas orçamento'
        ],
        correctOptionIndex: 0, // A
        weight: 1.0,
        explanation: 'O dossiê completo de formatura reúne todo o percurso conceitual, prático e analítico vivenciado pelo realizador.'
      },
      {
        id: 'q10-8',
        type: 'multiple_choice',
        prompt: '8. Qual duração é indicada no exercício prático do módulo?',
        options: [
          '1 a 5 minutos',
          '30 minutos',
          '1 hora',
          '10 segundos'
        ],
        correctOptionIndex: 0, // A
        weight: 1.0,
        explanation: 'A minutagem concisa de 1 a 5 minutos estimula a densidade narrativa e o rigor estético do primeiro filme.'
      },
      {
        id: 'q10-9',
        type: 'multiple_choice',
        prompt: '9. Depois da exibição, a reflexão deve considerar:',
        options: [
          'O que funcionou, o que faria diferente e o que deseja aprender',
          'Apenas a quantidade de visualizações',
          'Apenas o preço da câmera',
          'Apenas o cartaz'
        ],
        correctOptionIndex: 0, // A
        weight: 1.0,
        explanation: 'O autoexame crítico maduro transforma erros e acertos em trampolim para o aprimoramento contínuo na carreira.'
      },
      {
        id: 'q10-10',
        type: 'multiple_choice',
        prompt: '10. O curta final deve ser visto também como:',
        options: [
          'Primeiro material de portfólio e ferramenta para o próximo projeto',
          'Produto sem possibilidade de revisão',
          'Apenas exercício sem valor',
          'Substituto de todos os estudos anteriores'
        ],
        correctOptionIndex: 0, // A
        weight: 1.0,
        explanation: 'O primeiro curta finalizado é o passaporte artístico do cineasta: um cartão de visitas para festivais, editais e futuros longas.'
      }
    ]
  }
];
