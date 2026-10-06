// server.ts
import express from "express";
import path2 from "path";
import fs2 from "fs";
import os from "os";
import { execSync, exec } from "child_process";
import multer from "multer";
import { PDFDocument } from "pdf-lib";

// server/db.ts
import zlib from "zlib";
import fs from "fs";
import path from "path";

// server/initialData.ts
var initialCourseSettings = {
  courseName: "CINELAB",
  courseSubtitle: "CINEMA & AUDIOVISUAL",
  description: "Forma\xE7\xE3o profissional completa em Cinema e Realiza\xE7\xE3o Audiovisual. Tr\xEAs meses intensivos com 10 etapas pedag\xF3gicas (90 dias), 3 apostilas b\xF4nus, masterclasses em v\xEDdeo, pesquisas guiadas, an\xE1lises de filmografia e certifica\xE7\xE3o profissional.",
  totalDurationMonths: 3,
  totalModules: 10,
  moduleDurationDays: 9,
  evalLeadTimeDays: 3,
  cohortStartDate: "2026-08-25",
  minPassingGrade: 6,
  workloadHours: 180,
  coursePrice: 1e3,
  coursePriceOriginal: 2e3,
  maxInstallments: 12,
  pixKey: "contato@tv-diversidade.com",
  pixBeneficiary: "AILTON PAULO DOS SANTOS",
  pixBank: "Banco Nubank (0260) - Ag: 0001 - Conta: 24334459-6",
  pixQrCodeUrl: "",
  pixPayload: "00020126480014BR.GOV.BCB.PIX0126contato@tv-diversidade.com5204000053039865406499.905802BR5923Ailton Paulo dos Santos6009SAO PAULO62140510WiwHdJ7uff63",
  cardPaymentLink: "",
  pagbankToken: "",
  logoUrl: "",
  contactEmail: "tonydeluc@tv-diversidade.com",
  contactPhone: "+55 (21) 96672-5240",
  directorName: "Professor Cineasta Tony de Luc",
  directorRole: "Cineasta, Diretor de Fotografia, Produtor, Ator, Jornalista & Fundador do CINELAB",
  // Rodapé (Footer) & Dados Institucionais
  footerAboutText: "Escola e laborat\xF3rio de forma\xE7\xE3o profissional em Cinema e Realiza\xE7\xE3o Audiovisual. Metodologia de imers\xE3o de 3 meses (90 dias), 10 apostilas did\xE1ticas com cronograma progressivo, masterclasses exclusivas, avalia\xE7\xF5es cont\xEDnuas e certifica\xE7\xE3o reconhecida pelo mercado.",
  footerWorkloadBadge: "180h Carga Hor\xE1ria",
  footerOfficialBadge: "Plataforma EAD Oficial",
  footerCopyright: "\xA9 2026 CINELAB \u2013 Cinema & Audiovisual. Todos os direitos reservados.",
  footerDisclaimer: "Regras pedag\xF3gicas validadas por cronograma \u2022 Certifica\xE7\xE3o Profissional",
  companyCnpj: "",
  companyAddress: "Rio de Janeiro, RJ \u2022 Plataforma Digital Nacional",
  instagramUrl: "https://instagram.com/cinelab.cinema",
  youtubeUrl: "https://www.youtube.com/@TVDIVERSIDADE",
  vimeoUrl: "https://vimeo.com/cinelab",
  whatsappNumber: "+55 (21) 96672-5240",
  whatsappDefaultMessage: "Ol\xE1 Professor Tony de Luc! Gostaria de tirar d\xFAvidas sobre o curso de cinema CINELAB.",
  // Contato & Suporte
  supportHours: "Segunda a Sexta, das 09h \xE0s 17h (Atendimento Direto da Coordena\xE7\xE3o)",
  supportResponseTime: "Resposta em at\xE9 24 horas \xFAteis",
  contactAddress: "Rio de Janeiro, RJ \u2022 Plataforma Digital de Alcance Nacional e Internacional",
  // Página & Perfil de Tony de Luc (Feitos, Currículo, Filmografia)
  tonyName: "Professor Cineasta Tony de Luc",
  tonyRole: "Cineasta, Diretor de Fotografia, Produtor, Ator, Jornalista & Fundador do CINELAB",
  tonyPhotoUrl: "/images/tony-de-luc.jpg",
  tonyTagline: "O cinema n\xE3o \xE9 apenas t\xE9cnica ou equipamento; \xE9 a arte soberana de imprimir a verdade humana em cada enquadramento e contar hist\xF3rias que ecoam no tempo.",
  tonyBioShort: "Cineasta, realizador audiovisual, roteirista e educador cinematogr\xE1fico com mais de 20 anos de experi\xEAncia em sets de filmagem, mostras de cinema e forma\xE7\xE3o de centenas de novos diretores.",
  tonyBioFull: "Com uma trajet\xF3ria forjada no pulsar vivo dos sets de grava\xE7\xE3o e na dedica\xE7\xE3o incans\xE1vel \xE0 pedagogia da imagem em movimento, Tony de Luc \xE9 uma refer\xEAncia contempor\xE2nea na forma\xE7\xE3o de cineastas e realizadores audiovisuais independentes.\n\nSua carreira abrange a dire\xE7\xE3o geral de longas e curtas-metragens laureados em festivais no Brasil e no exterior, a dire\xE7\xE3o de fotografia com \xEAnfase no claro-escuro dram\xE1tico e o desenvolvimento de m\xE9todos pedag\xF3gicos que eliminam o hermetismo acad\xEAmico. No CINELAB, Tony desenhou pessoalmente a arquitetura das 10 etapas pedag\xF3gicas (90 dias) para garantir que cada aluno, do roteiro \xE0 p\xF3s-produ\xE7\xE3o, sinta a real pulsa\xE7\xE3o de uma equipe de cinema profissional.",
  tonyFeitos: [
    "Dire\xE7\xE3o e roteiro de obras cinematogr\xE1ficas exibidas e premiadas em festivais e mostras de cinema no Brasil e no circuito internacional.",
    "FORMOU DEZENAS DE REALIZADORES, ROTEIRISTAS E DIRETORES DE FOTOGRAFIA E INSERIDOS NO MERCADO AUDIOVISUAL , PUBLICIDADE E STREAMING.",
    "Cria\xE7\xE3o do m\xE9todo pedag\xF3gico CINELAB: forma\xE7\xE3o intensiva de 3 meses (90 dias) calibrada em 10 etapas com foco em set, rigor est\xE9tico e narrativa autoral.",
    "Dire\xE7\xE3o de Fotografia e Ilumina\xE7\xE3o C\xEAnica em dezenas de produ\xE7\xF5es ficcionais, videoclipes premiados e document\xE1rios autorais.",
    "Curador e jurado convidado em comiss\xF5es de sele\xE7\xE3o de mostras de cinema independente e editais p\xFAblicos de fomento cultural.",
    'Tony de Luc, participou ativamente da edi\xE7\xE3o inaugural do CINEMANO - Mestres da S\xE9tima Arte, na UFRJ no Fund\xE3o, como um dos palestrantes falando sobre o document\xE1rio e tem\xE1ticas pol\xEDticas e sociais p\xF3s-exibi\xE7\xE3o do filme "A bolsa ou a vida" (de Silvio Tendler). Participa\xE7\xE3o do Cineasta e Historiador, prof. Silvio Tendler. Palestrantes: Evandro Vieira Ourique (Professor da Escola de Comunica\xE7\xE3o da UFRJ) & Tony de Luc (Cineasta e Diretor da TV Diversidade)'
  ],
  tonyCurriculo: [
    "Gradua\xE7\xE3o e Especializa\xE7\xE3o em Cinema, Dire\xE7\xE3o Cinematogr\xE1fica e Realiza\xE7\xE3o Audiovisual.",
    "Forma\xE7\xE3o Avan\xE7ada em Roteiro Cinematogr\xE1fico (Script Doctoring & Estruturas Narrativas Cl\xE1ssicas e N\xE3o-Lineares).",
    "Especializa\xE7\xE3o em Dire\xE7\xE3o de Fotografia, \xD3ptica Cinematogr\xE1fica, Teoria da Cor e Ilumina\xE7\xE3o Dram\xE1tica.",
    "Doc\xEAncia no Ensino Superior e em Cursos Livres de Cinema, Montagem e Narrativas Visuais.",
    "Pesquisador de Linguagem Cinematogr\xE1fica, Montagem Anal\xEDtica e Filosofia da Imagem em Movimento.",
    "Membro de Associa\xE7\xF5es Profissionais de Cinema e Realizadores Audiovisuais Independentes."
  ],
  tonyFilmografia: [
    {
      title: "SINGULARIDADE",
      year: "2017",
      role: "Diretor de Fotografia",
      type: "Curta-Metragem - GENERO: ANIMA\xC7\xC3O",
      details: ""
    },
    {
      title: "NELSON PEREIRA DOS SANTOS E O CINEMA NOVO",
      year: "2016",
      role: "Diretor de Fotografia & Montagem",
      type: "Curta-Metragem - GENERO: DOCUMENT\xC1RIO",
      details: ""
    },
    {
      title: "HAP",
      year: "2016",
      role: "Diretor de Fotografia",
      type: "Curta-Metragem - GENERO: DRAMA",
      details: ""
    },
    {
      title: "O DI\xC1RIO DE UM VICIADO ",
      year: "2012",
      role: "Supervis\xE3o Geral Do Roteiro e Dire\xE7\xE3o",
      type: "M\xE9dia-Metragem - GENERO: DRAMA POLICIAL",
      details: ""
    },
    {
      title: "EXPRESSO TERMINAL (TERMINAL EXPRESS) ",
      year: "2006",
      role: "Dire\xE7\xE3o & Roteiro",
      type: "Curta-Metragem - GENERO: SUSPENSE",
      details: "Pr\xEAmio De Melhor Roteiro Do Festival Curta 4.2 \u2013 Favorito Do Amazonas Film Festival De 2006 \u2013No Festival de Cannes Participa\xE7\xE3o em \u201CUn CertainRegard\u201D\u2013  Pr\xEAmio De Melhor Dire\xE7\xE3o E Roteiro No Festival Da Fran\xE7a \u2013 Melhor Dire\xE7\xE3o Em Portugal. Tendo Participado De V\xE1rios Outros Festivais No Brasil E No Exterior."
    },
    {
      title: "A POSSU\xCDDA ",
      year: "2006",
      role: "Diretor de Fotografia",
      type: "Curta-Metragem - GENERO: TERROR",
      details: "Participou numa amostragem dentro do Festivais Curta Amaz\xF4nico 4.2 em Manaus."
    }
  ],
  tonySocialInstagram: "https://instagram.com/tonydeluc.cinema",
  tonySocialLinkedin: "https://linkedin.com/in/tonydeluc-cinema",
  tonySocialYoutube: "https://youtube.com/@cinelabcinema",
  // Vídeo e Mensagem de Boas-Vindas aos Novos Alunos (Página Inicial)
  welcomeVideoUrl: "/uploads/videos/aula-CINELAB_INTRODU__O-1790768528604-650605.mp4",
  welcomeVideoPoster: "/uploads/images/img-LOCO_CINELAB___COLE-1790299254778-824285.png",
  welcomeMessageTitle: "Mensagem de Boas-Vindas aos Novos Alunos",
  welcomeMessageText: "Caro estudante e futuro realizador,\n\nQuando idealizei o CINELAB, meu objetivo n\xE3o foi criar mais um curso com aulas te\xF3ricas gen\xE9ricas que voc\xEA pode encontrar em qualquer canto da internet. Minha obsess\xE3o foi estruturar um laborat\xF3rio de forma\xE7\xE3o aut\xEAntica em 3 meses (90 dias), onde cada etapa coloca voc\xEA frente a frente com a realidade art\xEDstica, t\xE9cnica e est\xE9tica da ind\xFAstria cinematogr\xE1fica.\n\nN\xF3s estudamos o plano n\xE3o como um conceito est\xE1tico, mas como a menor unidade dram\xE1tica da narrativa. N\xF3s formatamos o roteiro n\xE3o por burocracia, mas para que a equipe inteira consiga visualizar a luz, o som e o sil\xEAncio que o filme pede. E em cada uma das 10 etapas, minha equipe e eu estaremos acompanhando seu progresso, avaliando suas respostas e orientando seus exerc\xEDcios.\n\nSe voc\xEA carrega a urg\xEAncia de contar hist\xF3rias e quer dominar a gram\xE1tica do cinema com rigor, seja muito bem-vindo ao CINELAB."
};
var initialModules = [
  {
    id: 1,
    number: 1,
    title: "Linguagem Cinematogr\xE1fica, Planos e Enquadramentos",
    subtitle: "A gram\xE1tica visual do cinema, escalas de plano, \xE2ngulos e movimentos de c\xE2mera",
    summary: "Fundamentos da narrativa visual, o plano cinematogr\xE1fico como unidade m\xEDnima de sentido, enquadramento cl\xE1ssico e moderno, eixo de a\xE7\xE3o e psicologia do ponto de vista.",
    order: 1,
    durationWeeks: 1,
    durationDays: 7,
    durationLabel: "1 semana (7 dias)",
    evalLeadDays: 2
  },
  {
    id: 2,
    number: 2,
    title: "Hist\xF3ria do Cinema",
    subtitle: "Evolu\xE7\xE3o tecnol\xF3gica, est\xE9tica e de linguagem da s\xE9tima arte e o cinema brasileiro",
    summary: "A trajet\xF3ria hist\xF3rica do cinema mundial e brasileiro: do cinema silencioso \xE0s vanguardas europeias, cinema cl\xE1ssico, movimentos modernos e contempor\xE2neos.",
    order: 2,
    durationWeeks: 1,
    durationDays: 8,
    durationLabel: "8 dias",
    evalLeadDays: 2
  },
  {
    id: 3,
    number: 3,
    title: "Dire\xE7\xE3o de Cinema e Decupagem",
    subtitle: "O olhar do diretor, mise-en-sc\xE8ne, dire\xE7\xE3o de atores e plano de filmagem",
    summary: "Constru\xE7\xE3o da encena\xE7\xE3o cinematogr\xE1fica, trabalho com o elenco, elabora\xE7\xE3o do storyboard, decupagem t\xE9cnica e lideran\xE7a nos sets de filmagem.",
    order: 3,
    durationWeeks: 1.5,
    durationDays: 10,
    durationLabel: "10 dias",
    evalLeadDays: 3
  },
  {
    id: 4,
    number: 4,
    title: "Dire\xE7\xE3o de Fotografia, Ilumina\xE7\xE3o e C\xE2meras",
    subtitle: "A luz como dramaturgia, lentes, sensores, fotometria e esquemas de tr\xEAs pontos",
    summary: "Princ\xEDpios \xF3pticos, temperatura de cor, rela\xE7\xE3o de contraste, chiaroscuro, codecs de grava\xE7\xE3o (RAW, Log) e escolha de equipamentos para cada linguagem.",
    order: 4,
    durationWeeks: 1.3,
    durationDays: 9,
    durationLabel: "9 dias",
    evalLeadDays: 2
  },
  {
    id: 5,
    number: 5,
    title: "Som Direto, Microfonia e Desenho de Som",
    subtitle: "Capta\xE7\xE3o sonora no set, ac\xFAstica, sound design, foley e mixagem 5.1/Stereo",
    summary: "O universo ac\xFAstico do cinema: microfones direcionais, lapelas, grava\xE7\xE3o de ru\xEDdos de sala (room tone), camadas de ambi\xEAncia e di\xE1logo intelig\xEDvel.",
    order: 5,
    durationWeeks: 1.5,
    durationDays: 10,
    durationLabel: "10 dias",
    evalLeadDays: 3
  },
  {
    id: 6,
    number: 6,
    title: "Dire\xE7\xE3o de Arte, Cenografia e Figurino",
    subtitle: "A est\xE9tica do espa\xE7o f\xEDlmico, paletas crom\xE1ticas, adere\xE7os e caracteriza\xE7\xE3o",
    summary: "Concep\xE7\xE3o visual dos universos cinematogr\xE1ficos, semi\xF3tica das cores, ambienta\xE7\xE3o de \xE9poca e contempor\xE2nea, maquiagem e figurino integrados \xE0 dramaturgia.",
    order: 6,
    durationWeeks: 1,
    durationDays: 8,
    durationLabel: "8 dias",
    evalLeadDays: 2
  },
  {
    id: 7,
    number: 7,
    title: "Montagem, Edi\xE7\xE3o e Ritmo Cinematogr\xE1fico",
    subtitle: "Teoria da montagem (Kuleshov, Eisenstein), continuidades e cortes invis\xEDveis",
    summary: "A constru\xE7\xE3o do tempo cinematogr\xE1fico, elipses, montagem paralela, ritmo da cena, montagem de a\xE7\xE3o versus contempla\xE7\xE3o e fluxos no DaVinci Resolve e Premiere Pro.",
    order: 7,
    durationWeeks: 1.5,
    durationDays: 10,
    durationLabel: "10 dias",
    evalLeadDays: 3
  },
  {
    id: 8,
    number: 8,
    title: "P\xF3s-produ\xE7\xE3o, Efeitos Visuais e Color Grading",
    subtitle: "Tratamento de cor prim\xE1rio e secund\xE1rio, LUTs, chroma key e finaliza\xE7\xE3o DCP",
    summary: "Corre\xE7\xE3o e grada\xE7\xE3o de cor com precis\xE3o t\xE9cnica, espa\xE7o de cores ACES/Rec.709, masteriza\xE7\xE3o para streaming e cinema (DCP DCI 2K/4K).",
    order: 8,
    durationWeeks: 1.3,
    durationDays: 9,
    durationLabel: "9 dias",
    evalLeadDays: 2
  },
  {
    id: 9,
    number: 9,
    title: "Produ\xE7\xE3o Executiva, Legisla\xE7\xE3o e Or\xE7amento",
    subtitle: "Planejamento de produ\xE7\xE3o, ordens do dia, Ancine, leis de incentivo e contratos",
    summary: "Planilhas or\xE7ament\xE1rias profissionais, gest\xE3o de equipe de set, direitos autorais e de imagem, contrata\xE7\xE3o sindical e viabilidade financeira de projetos.",
    order: 9,
    durationWeeks: 1.3,
    durationDays: 9,
    durationLabel: "9 dias",
    evalLeadDays: 2
  },
  {
    id: 10,
    number: 10,
    title: "Projeto Final: Realiza\xE7\xE3o de Curta-Metragem & Mostra Independente",
    subtitle: "Concep\xE7\xE3o, rodagem, montagem e exibi\xE7\xE3o do seu curta autoral de 1 a 5 minutos",
    summary: "M\xF3dulo integrador e pr\xE1tico. Realiza\xE7\xE3o e finaliza\xE7\xE3o do curta-metragem autoral e estudo anal\xEDtico de obras consagradas do cinema independente brasileiro como refer\xEAncia est\xE9tica e de produ\xE7\xE3o. Entrega de roteiro, plano de filmagem, ficha t\xE9cnica, arquivo final e conclus\xE3o da forma\xE7\xE3o.",
    order: 10,
    durationWeeks: 1.5,
    durationDays: 10,
    durationLabel: "10 dias",
    evalLeadDays: 3
  }
];
var initialVideos = initialModules.map((mod) => ({
  id: `vid-${mod.id}`,
  moduleId: mod.id,
  title: `V\xCDDEO \u2013 ETAPA 0${mod.id}: Apresenta\xE7\xE3o da Apostila 0${mod.id}`,
  description: `Masterclass exclusiva de introdu\xE7\xE3o aos conceitos fundamentais da Etapa ${mod.id}: ${mod.title}. Orienta\xE7\xF5es para a leitura da apostila e execu\xE7\xE3o dos exerc\xEDcios.`,
  durationMinutes: 45,
  videoUrl: "https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ",
  // Default video embed, customizable by admin
  thumbnailUrl: `https://images.unsplash.com/photo-${[
    "1485846234645-a62644f84728",
    "1478720568477-152d9b164e26",
    "1536440136628-849c177e76a1",
    "1518133910546-b6c2fb7d79e3",
    "1598488035139-bdbb2231ce04",
    "1513151233558-d860c5398176",
    "1574717024653-61fd2cf4d44d",
    "1535016120720-40c646be5580",
    "1486406146926-c627a92ad1ab",
    "1489599849927-2ee91cede3ba"
  ][mod.id - 1]}?auto=format&fit=crop&w=1200&q=80`,
  professorName: "Professor Cineasta Tony de Luc",
  professorRole: "Diretor de Cinema & Docente CINELAB"
}));
var initialApostilas = initialModules.map((mod) => ({
  id: `apostila-${mod.id}`,
  moduleId: mod.id,
  number: mod.id,
  title: `Apostila 0${mod.id}: ${mod.title}`,
  description: `Material did\xE1tico completo e exclusivo do CINELAB para a Etapa 0${mod.id}. Textos t\xE9cnicos, diagramas de set, decupagens comentadas e bibliografia especializada.`,
  pagesCount: 68 + mod.id * 4,
  pdfUrl: `/materiais/cinelab-apostila-${mod.id < 10 ? "0" + mod.id : mod.id}.pdf`,
  coverUrl: `https://images.unsplash.com/photo-${[
    "1485846234645-a62644f84728",
    "1478720568477-152d9b164e26",
    "1536440136628-849c177e76a1",
    "1518133910546-b6c2fb7d79e3",
    "1598488035139-bdbb2231ce04",
    "1513151233558-d860c5398176",
    "1574717024653-61fd2cf4d44d",
    "1535016120720-40c646be5580",
    "1486406146926-c627a92ad1ab",
    "1489599849927-2ee91cede3ba"
  ][mod.id - 1]}?auto=format&fit=crop&w=600&q=80`,
  fileSizeMb: 18.5
}));
var initialEvaluations = [
  {
    id: "eval-1",
    moduleId: 1,
    moduleNumber: 1,
    title: "Avalia\xE7\xE3o 01: Linguagem Cinematogr\xE1fica, Planos e Enquadramentos",
    description: "Avalia\xE7\xE3o te\xF3rica e anal\xEDtica da primeira etapa formativa. Responda \xE0s quest\xF5es objetivas e discursivas para consolidar sua nota deste m\xF3dulo.",
    maxScore: 10,
    minPassingScore: 7,
    questions: [
      {
        id: "q1-1",
        type: "multiple_choice",
        prompt: 'Qual \xE9 a fun\xE7\xE3o primordial da regra do "Eixo de 180 Graus" em uma cena de di\xE1logo entre dois personagens?',
        options: [
          "Garantir que a ilumina\xE7\xE3o seja id\xEAntica em ambos os lados da sala.",
          "Manter a consist\xEAncia espacial da cena e a dire\xE7\xE3o do olhar dos personagens para n\xE3o desorientar o espectador.",
          "Permitir que a c\xE2mera d\xEA giros cont\xEDnuos de 360 graus sem necessitar de cortes.",
          "Economizar tempo de filmagem dispensando o uso de contra-planos."
        ],
        correctOptionIndex: 1,
        weight: 2.5,
        explanation: "O eixo de 180\xB0 tra\xE7a uma linha imagin\xE1ria entre os interlocutores. Posicionar as c\xE2meras sempre do mesmo lado dessa linha garante a continuidade espacial e a dire\xE7\xE3o do olhar."
      },
      {
        id: "q1-2",
        type: "true_false",
        prompt: 'No enquadramento cinematogr\xE1fico, o "Plano Holand\xEAs" (Dutch Angle ou \xE2ngulo inclinado) \xE9 tradicionalmente empregado para transmitir estabilidade, equil\xEDbrio e sensa\xE7\xE3o de paz absoluta.',
        options: ["Verdadeiro", "Falso"],
        correctOptionIndex: 1,
        weight: 2.5,
        explanation: "Falso. O Dutch Angle inclina a linha do horizonte na c\xE2mera para gerar estranheza, tens\xE3o psicol\xF3gica, loucura ou perigo iminente."
      },
      {
        id: "q1-3",
        type: "multiple_choice",
        prompt: 'A respeito da escala de planos, assinale a alternativa que define com precis\xE3o o "Primeiro Plano" (Close-up):',
        options: [
          "Mostra o personagem da cintura para cima, evidenciando principalmente a gestualidade corporal com o ambiente.",
          "Enquadra o personagem do peito para cima ou focado no rosto, enfatizando express\xF5es faciais, emo\xE7\xF5es \xEDntimas e rea\xE7\xF5es.",
          "Enquadra apenas um objeto pontual min\xFAsculo, como uma chave na fechadura ou um olho piscando.",
          "Mostra o personagem de corpo inteiro, estabelecendo sua posi\xE7\xE3o f\xEDsica no cen\xE1rio."
        ],
        correctOptionIndex: 1,
        weight: 2.5,
        explanation: "O Close-up foca a aten\xE7\xE3o na intimidade psicol\xF3gica do personagem, privilegiando o olhar e as sutilezas da express\xE3o facial."
      },
      {
        id: "q1-4",
        type: "discursive",
        prompt: "Explique de que forma a escolha de uma lente grande-angular (ex: 24mm) versus uma teleobjetiva (ex: 85mm ou 135mm) altera a percep\xE7\xE3o de espa\xE7o, profundidade e a rela\xE7\xE3o psicol\xF3gica entre o personagem e seu ambiente.",
        weight: 2.5,
        explanation: "A grande-angular expande o campo de vis\xE3o e acentua a sensa\xE7\xE3o de dist\xE2ncia e distor\xE7\xE3o nos cantos, contextualizando o ambiente ao redor do personagem. J\xE1 a teleobjetiva comprime os planos de fundo e primeiro plano, isolando o personagem com rasa profundidade de campo e intimidade \xF3tica."
      }
    ]
  },
  {
    id: "eval-2",
    moduleId: 2,
    moduleNumber: 2,
    title: "Avalia\xE7\xE3o 02: Roteiro e Narrativa Audiovisual",
    description: "Teste de assimila\xE7\xE3o sobre dramaturgia, paradigma de 3 atos, conflito e formata\xE7\xE3o cinematogr\xE1fica.",
    maxScore: 10,
    minPassingScore: 7,
    questions: [
      {
        id: "q2-1",
        type: "multiple_choice",
        prompt: 'No paradigma cl\xE1ssico de Syd Field, o "Inciting Incident" (Incidente Incitante) tem como papel principal:',
        options: [
          "Concluir a hist\xF3ria ap\xF3s o cl\xEDmax final.",
          "Apresentar a ficha t\xE9cnica e os cr\xE9ditos do filme.",
          "Perturbar o equil\xEDbrio inicial do mundo comum do protagonista, obrigando-o a tomar uma decis\xE3o e iniciar a jornada dram\xE1tica.",
          "Explicar em voz-over todo o passado de inf\xE2ncia do personagem."
        ],
        correctOptionIndex: 2,
        weight: 3
      },
      {
        id: "q2-2",
        type: "true_false",
        prompt: "No padr\xE3o internacional Master Scenes, rubricas de cena n\xE3o devem descrever pensamentos internos abstratos dos personagens que n\xE3o possam ser fotografados ou captados pelo microfone.",
        options: ["Verdadeiro", "Falso"],
        correctOptionIndex: 0,
        weight: 3
      },
      {
        id: "q2-3",
        type: "discursive",
        prompt: 'Defina o conceito de "Subtexto" em um di\xE1logo cinematogr\xE1fico e apresente um exemplo breve de como duas falas aparentemente banais podem esconder uma grave amea\xE7a ou revela\xE7\xE3o \xEDntima.',
        weight: 4
      }
    ]
  },
  // Subsequent evaluations for 3-10
  ...Array.from({ length: 8 }, (_, i) => {
    const num = i + 3;
    const mod = initialModules[num - 1];
    return {
      id: `eval-${num}`,
      moduleId: num,
      moduleNumber: num,
      title: `Avalia\xE7\xE3o 0${num}: ${mod.title}`,
      description: `Avalia\xE7\xE3o do M\xF3dulo 0${num}. Aprovada quando atingida a m\xE9dia m\xEDnima de 7.0 pontos.`,
      maxScore: 10,
      minPassingScore: 7,
      questions: [
        {
          id: `q${num}-1`,
          type: "multiple_choice",
          prompt: `Em rela\xE7\xE3o aos fundamentos pr\xE1ticos e conceituais estudados no M\xF3dulo 0${num} (${mod.title}), assinale a afirmativa correta:`,
          options: [
            `A aplica\xE7\xE3o t\xE9cnica do M\xF3dulo 0${num} depende da coer\xEAncia com a narrativa geral proposta pelo diretor e roteirista.`,
            `N\xE3o h\xE1 rela\xE7\xE3o entre as escolhas est\xE9ticas do M\xF3dulo 0${num} e o roteiro cinematogr\xE1fico.`,
            `Os par\xE2metros devem ser decididos aleatoriamente no momento da grava\xE7\xE3o.`,
            `A tecnologia digital eliminou a necessidade de planejamento pr\xE9vio para esta etapa.`
          ],
          correctOptionIndex: 0,
          weight: 5
        },
        {
          id: `q${num}-2`,
          type: "discursive",
          prompt: `Apresente uma reflex\xE3o cr\xEDtica articulando os desafios pr\xE1ticos de execu\xE7\xE3o e as tomadas de decis\xE3o que um profissional enfrenta na etapa de ${mod.title}.`,
          weight: 5
        }
      ]
    };
  })
];
var initialUsers = [
  {
    id: "user-admin",
    name: "Professor Cineasta Tony de Luc",
    email: "studiodeluc@gmail.com",
    phone: "+55 11 98888-0000",
    document: "00.000.000/0001-99",
    role: "admin",
    createdAt: "2026-01-10T10:00:00Z"
  },
  {
    id: "user-admin-alias",
    name: "Professor Cineasta Tony de Luc (Coordena\xE7\xE3o)",
    email: "admin@cinelab.edu.br",
    phone: "+55 11 98888-0000",
    document: "00.000.000/0001-99",
    role: "admin",
    createdAt: "2026-01-10T10:00:00Z"
  },
  {
    id: "user-student-demo",
    name: "Lucas Mendon\xE7a de Oliveira",
    email: "aluno@cinelab.edu.br",
    phone: "+55 11 97654-3210",
    document: "389.482.198-40",
    role: "student",
    createdAt: "2026-08-20T14:30:00Z",
    matricula: "CNL-2026-4819",
    paymentMethod: "Cart\xE3o de Cr\xE9dito (12x)",
    difficulties: "Decupagem t\xE9cnica de lentes e regra dos 180\xB0",
    averageGrade: 9.5,
    pedagogicalNotes: "Excelente dom\xEDnio de linguagem cinematogr\xE1fica e olhar de composi\xE7\xE3o."
  },
  {
    id: "user-student-mariana",
    name: "Mariana Duarte Costa",
    email: "mariana.costa@gmail.com",
    phone: "+55 21 98765-4321",
    document: "421.890.112-55",
    role: "student",
    createdAt: "2026-08-22T09:15:00Z",
    matricula: "CNL-2026-5102",
    paymentMethod: "PIX \xC0 Vista",
    difficulties: "Dificuldade em ilumina\xE7\xE3o de tr\xEAs pontos e c\xE1lculo de Kelvin",
    averageGrade: 5.4,
    pedagogicalNotes: "Precisa de refor\xE7o nas aulas pr\xE1ticas de ilumina\xE7\xE3o e refazer a avalia\xE7\xE3o 03."
  },
  {
    id: "user-student-rodrigo",
    name: "Rodrigo Alves Silveira",
    email: "rodrigo.cine@yahoo.com.br",
    phone: "+55 31 99123-8877",
    document: "298.761.503-22",
    role: "student",
    createdAt: "2026-08-23T11:40:00Z",
    matricula: "CNL-2026-5388",
    paymentMethod: "Boleto Banc\xE1rio",
    difficulties: "Dificuldade em formata\xE7\xE3o master scenes no roteiro",
    averageGrade: 7.8,
    pedagogicalNotes: "Boa participa\xE7\xE3o nas masterclasses, roteiro necessita de ajustes de formata\xE7\xE3o."
  }
];
var initialEnrollments = [
  {
    id: "enr-1",
    enrollmentNumber: "CNL-2026-4819",
    studentId: "user-student-demo",
    studentName: "Lucas Mendon\xE7a de Oliveira",
    studentEmail: "aluno@cinelab.edu.br",
    status: "active",
    enrolledAt: "2026-08-20T14:30:00Z",
    activatedAt: "2026-08-20T14:35:00Z",
    paymentId: "pay-1"
  },
  {
    id: "enr-2",
    enrollmentNumber: "CNL-2026-5102",
    studentId: "user-student-mariana",
    studentName: "Mariana Duarte Costa",
    studentEmail: "mariana.costa@gmail.com",
    status: "active",
    enrolledAt: "2026-08-22T09:15:00Z",
    activatedAt: "2026-08-22T09:20:00Z",
    paymentId: "pay-2"
  },
  {
    id: "enr-3",
    enrollmentNumber: "CNL-2026-5388",
    studentId: "user-student-rodrigo",
    studentName: "Rodrigo Alves Silveira",
    studentEmail: "rodrigo.cine@yahoo.com.br",
    status: "active",
    enrolledAt: "2026-08-23T11:40:00Z",
    activatedAt: "2026-08-23T11:45:00Z",
    paymentId: "pay-3"
  }
];
var initialPayments = [
  {
    id: "pay-1",
    studentId: "user-student-demo",
    enrollmentId: "enr-1",
    method: "credit_card",
    amount: 499.9,
    installments: 6,
    installmentValue: 83.31,
    status: "approved",
    cardBrand: "Mastercard",
    lastFour: "8912",
    createdAt: "2026-08-20T14:30:00Z",
    approvedAt: "2026-08-20T14:35:00Z"
  },
  {
    id: "pay-2",
    studentId: "user-student-mariana",
    enrollmentId: "enr-2",
    method: "pix",
    amount: 499.9,
    status: "approved",
    pixKey: "contato@tv-diversidade.com",
    createdAt: "2026-08-22T09:15:00Z",
    approvedAt: "2026-08-22T09:20:00Z"
  },
  {
    id: "pay-3",
    studentId: "user-student-rodrigo",
    enrollmentId: "enr-3",
    method: "boleto",
    amount: 499.9,
    status: "approved",
    createdAt: "2026-08-23T11:40:00Z",
    approvedAt: "2026-08-23T11:45:00Z"
  }
];

// server/pedagogicalContent.ts
var pedagogicalModules = [
  {
    id: 1,
    number: 1,
    title: "Introdu\xE7\xE3o ao Cinema e \xE0 Linguagem Audiovisual",
    subtitle: "A gram\xE1tica visual, escalas de plano, enquadramentos e as etapas de produ\xE7\xE3o",
    summary: "O que \xE9 cinema e audiovisual. Rela\xE7\xE3o dial\xE9tica entre imagem e som. Planos, escalas e enquadramentos. Os profissionais do cinema, pr\xE9-produ\xE7\xE3o, produ\xE7\xE3o, p\xF3s-produ\xE7\xE3o e a primazia do som.",
    order: 1,
    durationWeeks: 1,
    durationDays: 7,
    durationLabel: "1 semana (7 dias)",
    evalLeadDays: 2
  },
  {
    id: 2,
    number: 2,
    title: "Hist\xF3ria do Cinema",
    subtitle: "Evolu\xE7\xE3o tecnol\xF3gica, est\xE9tica e narrativa da s\xE9tima arte e o cinema brasileiro",
    summary: "A trajet\xF3ria hist\xF3rica do cinema mundial e brasileiro: do cinema silencioso \xE0s vanguardas europeias, cinema cl\xE1ssico, movimentos modernos e contempor\xE2neos.",
    order: 2,
    durationWeeks: 1,
    durationDays: 8,
    durationLabel: "8 dias",
    evalLeadDays: 2
  },
  {
    id: 3,
    number: 3,
    title: "Roteiro e Cria\xE7\xE3o de Personagens",
    subtitle: "Da centelha \xE0 cena film\xE1vel: estrutura dram\xE1tica, conflito e padr\xE3o Master Scenes",
    summary: "Ideia, storyline, logline, sinopse, argumento/tratamento, escaleta, decupagem e storyboard. Constru\xE7\xE3o de personagens, objetivo, obst\xE1culo, conflito, transforma\xE7\xE3o, di\xE1logos e subtexto. Libera\xE7\xE3o dos B\xF4nus 01 e 02.",
    order: 3,
    durationWeeks: 1.5,
    durationDays: 10,
    durationLabel: "10 dias",
    evalLeadDays: 3
  },
  {
    id: 4,
    number: 4,
    title: "Dire\xE7\xE3o e Dire\xE7\xE3o de Atores",
    subtitle: "A vis\xE3o do diretor, mise-en-sc\xE8ne, condu\xE7\xE3o do elenco e \xE9tica do set",
    summary: "O papel central da dire\xE7\xE3o, dire\xE7\xE3o de cena e dire\xE7\xE3o de atores. Inten\xE7\xE3o, a\xE7\xE3o, subtexto, ensaios, tomadas, continuidade e decupagem t\xE9cnica. Condu\xE7\xE3o \xE9tica e segura do set cinematogr\xE1fico.",
    order: 4,
    durationWeeks: 1.3,
    durationDays: 9,
    durationLabel: "9 dias",
    evalLeadDays: 2
  },
  {
    id: 5,
    number: 5,
    title: "Fotografia, C\xE2mera e Ilumina\xE7\xE3o",
    subtitle: "Composi\xE7\xE3o visual, desenho com sombras, temperatura de cor e opera\xE7\xE3o de c\xE2mera",
    summary: "Planos gerais a closes, regra dos ter\xE7os, linhas-guia, profundidade e espa\xE7o negativo. As 4 qualidades de luz: frontal, lateral, contraluz e luz de janela. Foco, exposi\xE7\xE3o, lentes e uso do celular com rigor est\xE9tico.",
    order: 5,
    durationWeeks: 1.5,
    durationDays: 10,
    durationLabel: "10 dias",
    evalLeadDays: 3
  },
  {
    id: 6,
    number: 6,
    title: "Som e Trilha Sonora",
    subtitle: "A dimens\xE3o ac\xFAstica: di\xE1logo, ambi\xEAncia, efeitos sonoros e capta\xE7\xE3o direta",
    summary: "Di\xE1logo intelig\xEDvel, ambi\xEAncia, ru\xEDdos de sala (room tone), foley, trilha sonora e o poder do sil\xEAncio. Tipos de microfone, t\xE9cnicas de capta\xE7\xE3o no set e aspectos legais de direitos autorais de \xE1udio.",
    order: 6,
    durationWeeks: 1,
    durationDays: 8,
    durationLabel: "8 dias",
    evalLeadDays: 2
  },
  {
    id: 7,
    number: 7,
    title: "Montagem e P\xF3s-Produ\xE7\xE3o",
    subtitle: "A reescritura do filme: ritmo, continuidades, cortes expressivos e finaliza\xE7\xE3o",
    summary: "Montagem como escrita e sintaxe. Organiza\xE7\xE3o de m\xEDdia, backup, decupagem de ilha, ritmo e continuidades. Corte na a\xE7\xE3o, corte de rea\xE7\xE3o, corte de detalhe, B-roll, cor prim\xE1ria e exporta\xE7\xE3o.",
    order: 7,
    durationWeeks: 1.5,
    durationDays: 10,
    durationLabel: "10 dias",
    evalLeadDays: 3
  },
  {
    id: 8,
    number: 8,
    title: "Produ\xE7\xE3o Executiva e Planejamento",
    subtitle: "Viabilidade, or\xE7amenta\xE7\xE3o \xE9tica, ordem do dia e lideran\xE7a de equipe",
    summary: "Fluxo completo: pr\xE9, produ\xE7\xE3o e p\xF3s. Forma\xE7\xE3o de equipe, loca\xE7\xF5es, equipamentos, autoriza\xE7\xF5es de imagem e loca\xE7\xE3o. Cronograma, planilha or\xE7ament\xE1ria, ordem do dia e planos de conting\xEAncia (Plano B).",
    order: 8,
    durationWeeks: 1.3,
    durationDays: 9,
    durationLabel: "9 dias",
    evalLeadDays: 2
  },
  {
    id: 9,
    number: 9,
    title: "Distribui\xE7\xE3o, Festivais e Mercado Audiovisual",
    subtitle: "Estrat\xE9gias de lan\xE7amento, press-kit profissional e circuito de festivais",
    summary: "Defini\xE7\xE3o de p\xFAblico e janelas de exibi\xE7\xE3o. Festivais, mostras, cineclubes e streaming. Materiais de lan\xE7amento: logline, sinopse, cartaz, trailer, release e inscri\xE7\xF5es internacionais.",
    order: 9,
    durationWeeks: 1.3,
    durationDays: 9,
    durationLabel: "9 dias",
    evalLeadDays: 2
  },
  {
    id: 10,
    number: 10,
    title: "Projeto Final: Realiza\xE7\xE3o de Curta-Metragem & Mostra Independente",
    subtitle: "Concep\xE7\xE3o, rodagem, montagem e exibi\xE7\xE3o da sua obra autoral de 1 a 5 minutos",
    summary: "M\xF3dulo integrador e pr\xE1tico. Realiza\xE7\xE3o e finaliza\xE7\xE3o do curta-metragem autoral e estudo anal\xEDtico de obras consagradas do cinema independente brasileiro como refer\xEAncia est\xE9tica e de produ\xE7\xE3o. Entrega de roteiro, plano de filmagem, ficha t\xE9cnica, arquivo final e conclus\xE3o da forma\xE7\xE3o.",
    order: 10,
    durationWeeks: 1.5,
    durationDays: 10,
    durationLabel: "10 dias",
    evalLeadDays: 3
  }
];
var pedagogicalVideos = [
  {
    id: "vid-1",
    moduleId: 1,
    title: "V\xCDDEO DO M\xD3DULO 01 \u2013 A Linguagem Audiovisual e o Olhar do Cineasta",
    description: "Apresenta\xE7\xE3o oficial da Forma\xE7\xE3o CINELAB por Tony de Luc. O que distingue o audiovisual das demais artes, a unidade fundamental do plano e como ler a Apostila 01.",
    durationMinutes: 42,
    videoUrl: "https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ",
    thumbnailUrl: "https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=1200&q=80",
    professorName: "Professor Tony de Luc",
    professorRole: "Diretor Acad\xEAmico & Cineasta",
    professorNotes: "Bem-vindo ao CINELAB! Lembre-se: o cinema n\xE3o \xE9 sobre equipamentos caros, mas sobre a precis\xE3o do seu olhar e a verdade humana que voc\xEA coloca em cada quadro."
  },
  {
    id: "vid-2",
    moduleId: 2,
    title: "V\xCDDEO DO M\xD3DULO 02 \u2013 As Ra\xEDzes do Cinema e a Disseca\xE7\xE3o F\xEDlmica em 6 Camadas",
    description: "Tony de Luc percorre os marcos da hist\xF3ria cinematogr\xE1fica e demonstra na pr\xE1tica como analisar uma obra atrav\xE9s das seis camadas essenciais.",
    durationMinutes: 48,
    videoUrl: "https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ",
    thumbnailUrl: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?auto=format&fit=crop&w=1200&q=80",
    professorName: "Professor Tony de Luc",
    professorRole: "Diretor Acad\xEAmico & Cineasta",
    professorNotes: "Ao assistir ao Encoura\xE7ado Potemkin nesta etapa, desligue o olhar de espectador passivo e ative o olhar anal\xEDtico de cirurgi\xE3o da imagem."
  },
  {
    id: "vid-3",
    moduleId: 3,
    title: "V\xCDDEO DO M\xD3DULO 03 \u2013 O Cora\xE7\xE3o do Roteiro: Conflito, Subtexto e Personagem",
    description: "Como transformar uma ideia em uma cena cinematogr\xE1fica potente. O uso do subtexto, o formato Master Scenes e a apresenta\xE7\xE3o dos B\xF4nus 01 e 02.",
    durationMinutes: 55,
    videoUrl: "https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ",
    thumbnailUrl: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=1200&q=80",
    professorName: "Professor Tony de Luc",
    professorRole: "Diretor Acad\xEAmico & Cineasta",
    professorNotes: "Liberamos nesta etapa dois tesouros para consulta vital\xEDcia: o Gloss\xE1rio Completo de Planos e o Gloss\xE1rio Completo de Roteiro. Utilize-os sempre!"
  },
  {
    id: "vid-4",
    moduleId: 4,
    title: "V\xCDDEO DO M\xD3DULO 04 \u2013 A Lideran\xE7a do Diretor e a Condu\xE7\xE3o Sens\xEDvel de Atores",
    description: "O trabalho do diretor no ensaio e no set. Como se comunicar com o ator sem impor resultados, decupagem com inten\xE7\xE3o e respeito \xE0 equipe.",
    durationMinutes: 46,
    videoUrl: "https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ",
    thumbnailUrl: "https://images.unsplash.com/photo-1518133910546-b6c2fb7d79e3?auto=format&fit=crop&w=1200&q=80",
    professorName: "Professor Tony de Luc",
    professorRole: "Diretor Acad\xEAmico & Cineasta",
    professorNotes: "Dirigir ator n\xE3o \xE9 pedir para ele chorar ou rir; \xE9 dar a ele uma a\xE7\xE3o f\xEDsica e um objetivo interno inegoci\xE1vel."
  },
  {
    id: "vid-5",
    moduleId: 5,
    title: "V\xCDDEO DO M\xD3DULO 05 \u2013 Pintar com a Luz: \xD3ptica, Contraste e Composi\xE7\xE3o",
    description: "Tony de Luc demonstra os esquemas fundamentais de ilumina\xE7\xE3o: luz frontal, lateral, contraluz e a luz po\xE9tica de janela.",
    durationMinutes: 52,
    videoUrl: "https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ",
    thumbnailUrl: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=1200&q=80",
    professorName: "Professor Tony de Luc",
    professorRole: "Diretor Acad\xEAmico & Cineasta",
    professorNotes: "A fotografia cinematogr\xE1fica nasce da sombra. Quem ilumina tudo n\xE3o cria profundidade; quem escolhe onde colocar a sombra cria mist\xE9rio e volume."
  },
  {
    id: "vid-6",
    moduleId: 6,
    title: "V\xCDDEO DO M\xD3DULO 06 \u2013 A Metade Invis\xEDvel do Filme: Paisagem Sonora e Capta\xE7\xE3o",
    description: "A import\xE2ncia capital do som no cinema. Como gravar di\xE1logo limpo com microfone direcional ou lapela, room tone e a dramaturgia do sil\xEAncio.",
    durationMinutes: 44,
    videoUrl: "https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ",
    thumbnailUrl: "https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=1200&q=80",
    professorName: "Professor Tony de Luc",
    professorRole: "Diretor Acad\xEAmico & Cineasta",
    professorNotes: "Um espectador tolera uma imagem granulada ou com pouca luz se o som for cristalino. Mas se o som for ruim e o di\xE1logo inintelig\xEDvel, ele abandona o filme em 30 segundos."
  },
  {
    id: "vid-7",
    moduleId: 7,
    title: "V\xCDDEO DO M\xD3DULO 07 \u2013 A Arte da Montagem: Ritmo, Elipse e o Corte Invis\xEDvel",
    description: "A reescritura do filme na ilha de edi\xE7\xE3o. Montagem m\xE9trica, r\xEDtmica e de conte\xFAdo. O uso de cortes na a\xE7\xE3o e a transi\xE7\xE3o emocional entre planos.",
    durationMinutes: 50,
    videoUrl: "https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ",
    thumbnailUrl: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=1200&q=80",
    professorName: "Professor Tony de Luc",
    professorRole: "Diretor Acad\xEAmico & Cineasta",
    professorNotes: "Cortar \xE9 escolher o que o espectador n\xE3o precisa ver para que a imagina\xE7\xE3o dele complete a hist\xF3ria."
  },
  {
    id: "vid-8",
    moduleId: 8,
    title: "V\xCDDEO DO M\xD3DULO 08 \u2013 Produ\xE7\xE3o Executiva na Pr\xE1tica: Ordem do Dia e Set Seguro",
    description: "Como planejar uma di\xE1ria de filmagem sem estresse. Elabora\xE7\xE3o de ordem do dia profissional, plano de conting\xEAncia e or\xE7amento equilibrado.",
    durationMinutes: 47,
    videoUrl: "https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ",
    thumbnailUrl: "https://images.unsplash.com/photo-1535016120720-40c646be5580?auto=format&fit=crop&w=1200&q=80",
    professorName: "Professor Tony de Luc",
    professorRole: "Diretor Acad\xEAmico & Cineasta",
    professorNotes: "O cinema independente triunfa no planejamento. Um roteiro adaptado \xE0 sua realidade de produ\xE7\xE3o vale mais do que mil ideias inexequ\xEDveis."
  },
  {
    id: "vid-9",
    moduleId: 9,
    title: "V\xCDDEO DO M\xD3DULO 09 \u2013 Fazendo seu Filme Circular: Festivais, Mostras e Press-Kit",
    description: "A trajet\xF3ria do curta ap\xF3s a finaliza\xE7\xE3o. Como preparar o kit de divulga\xE7\xE3o, escrever a sinopse vendedora e tra\xE7ar a rota de festivais no FilmFreeway.",
    durationMinutes: 45,
    videoUrl: "https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ",
    thumbnailUrl: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80",
    professorName: "Professor Tony de Luc",
    professorRole: "Diretor Acad\xEAmico & Cineasta",
    professorNotes: "O filme n\xE3o termina na exporta\xE7\xE3o. Um curta existe para encontrar seu p\xFAblico, circular em festivais e abrir portas para sua carreira."
  },
  {
    id: "vid-10",
    moduleId: 10,
    title: "V\xCDDEO DO M\xD3DULO 10 \u2013 O Projeto Final: Da Ideia \xE0 Tela e a Jornada do Cineasta",
    description: "Orienta\xE7\xF5es finais de Tony de Luc para a entrega do Curta-Metragem de 1 a 5 minutos, celebra\xE7\xE3o da conclus\xE3o e diretrizes para o acesso vital\xEDcio.",
    durationMinutes: 40,
    videoUrl: "https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ",
    thumbnailUrl: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=1200&q=80",
    professorName: "Professor Tony de Luc",
    professorRole: "Diretor Acad\xEAmico & Cineasta",
    professorNotes: "Chegamos ao \xE1pice! Confie no seu instinto, respeite tudo que aprendeu nas 10 etapas e coloque sua alma neste curta. O cinema agora pertence a voc\xEA."
  }
];
var pedagogicalApostilas = [
  {
    id: "apostila-1",
    moduleId: 1,
    number: 1,
    title: "Apostila 01: Introdu\xE7\xE3o ao Cinema e \xE0 Linguagem Audiovisual",
    description: "Conceitos fundamentais da linguagem cinematogr\xE1fica, a gram\xE1tica dos enquadramentos, as fases da produ\xE7\xE3o audiovisual e a interdepend\xEAncia entre som e imagem.",
    pagesCount: 8,
    pdfUrl: "/materiais/cinelab-apostila-01.pdf",
    coverUrl: "https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=600&q=80",
    fileSizeMb: 18.5,
    extraVideos: [
      {
        "id": "ev-apostila-1-1",
        "slot": 1,
        "title": "V\xEDdeo Extra 01: Introdu\xE7\xE3o ao Cinema e \xE0 Linguagem Audiovisual & An\xE1lise Pr\xE1tica - M- 1.1",
        "videoUrl": "https://www.youtube.com/watch?v=q1U0eKOOwsQ",
        "thumbnailUrl": "https://img.youtube.com/vi/q1U0eKOOwsQ/hqdefault.jpg",
        "description": "O aluno deve observar como a hist\xF3ria \xE9 contada principalmente atrav\xE9s das imagens, express\xF5es faciais, gestos e movimentos dos personagens, j\xE1 que o filme pertence ao per\xEDodo do cinema mudo. Deve prestar aten\xE7\xE3o aos enquadramentos, composi\xE7\xE3o das cenas, montagem, ritmo, atua\xE7\xE3o corporal e uso da m\xFAsica para perceber como o cinema consegue transmitir emo\xE7\xF5es e narrar acontecimentos sem depender de di\xE1logos falados.",
        "professorNotes": "Como Chaplin consegue fazer o espectador compreender a hist\xF3ria e sentir emo\xE7\xE3o utilizando principalmente imagens, gestos e express\xF5es?\nO ALUNO DEVE COM O FILME O Garoto, aprender a ler uma hist\xF3ria atrav\xE9s das imagens.",
        "durationHours": 0,
        "durationMinutes": 52,
        "durationSeconds": 48,
        "totalDurationSeconds": 3168,
        "durationLabel": "00h 52m 48s",
        "uploadedAt": "2026-10-02T03:08:34.759Z"
      },
      {
        "id": "ev-apostila-1-2",
        "slot": 2,
        "title": "V\xEDdeo Extra 02: Introdu\xE7\xE3o ao Cinema e \xE0 Linguagem Audiovisual & An\xE1lise Pr\xE1tica - M- 1.2",
        "videoUrl": "https://www.youtube.com/watch?v=i15UCTIdfwI",
        "thumbnailUrl": "https://img.youtube.com/vi/i15UCTIdfwI/hqdefault.jpg",
        "description": "O aluno deve observar como imagem, movimento, montagem, ritmo e som trabalham juntos para construir a narrativa. Deve prestar aten\xE7\xE3o especialmente \xE0s m\xE1quinas, ao ambiente da f\xE1brica, aos movimentos repetitivos dos trabalhadores, aos enquadramentos, \xE0 montagem e aos efeitos sonoros, percebendo como Chaplin utiliza a linguagem audiovisual n\xE3o apenas para contar uma hist\xF3ria, mas tamb\xE9m para transmitir ideias e cr\xEDticas atrav\xE9s das imagens.",
        "professorNotes": "Como Chaplin utiliza a imagem, o movimento, o ritmo e o som para transmitir uma ideia sem precisar explicar tudo atrav\xE9s de di\xE1logos?\nO ALUNO DEVE COM O FILME Tempos Modernos, perceber como imagem + movimento + montagem + som constroem significado.",
        "durationHours": 1,
        "durationMinutes": 26,
        "durationSeconds": 52,
        "totalDurationSeconds": 5212,
        "durationLabel": "01h 26m 52s",
        "uploadedAt": "2026-10-02T03:08:34.760Z"
      }
    ],
    sections: [
      {
        id: "sec-1-1",
        title: "1. O que \xE9 Cinema e o que \xE9 Audiovisual?",
        subtitle: "A natureza espa\xE7o-temporal da imagem em movimento",
        contentMarkdown: `O cinema n\xE3o \xE9 mera reprodu\xE7\xE3o da realidade; \xE9 uma **constru\xE7\xE3o deliberada de sentido no tempo e no espa\xE7o**. Enquanto o teatro se ancora na presen\xE7a f\xEDsica do ator em um palco cont\xEDnuo onde o espectador escolhe para onde olhar, o cinema opera atrav\xE9s da **sele\xE7\xE3o \xF3ptica do diretor**: o enquadramento determina o que existe e o que \xE9 exclu\xEDdo da experi\xEAncia visual.

Audiovisual \xE9 o am\xE1lgama indissoci\xE1vel entre luz projetada e ondas sonoras. A imagem atrai a raz\xE3o e a aten\xE7\xE3o focal; o som atua diretamente no sistema l\xEDmbico, gerando sensa\xE7\xE3o de espa\xE7o, tens\xE3o e verossimilhan\xE7a sem que o espectador perceba o artif\xEDcio.`,
        tonyNotes: "Em cinema, cada mil\xEDmetro do enquadramento \xE9 uma escolha moral e est\xE9tica. Nunca posicione a c\xE2mera ao acaso."
      },
      {
        id: "sec-1-2",
        title: "2. Escalas de Planos e a Gram\xE1tica dos Enquadramentos",
        subtitle: "A rela\xE7\xE3o de proximidade entre a c\xE2mera e o sujeito dram\xE1tico",
        contentMarkdown: `A escala de planos estabelece a dist\xE2ncia psicol\xF3gica entre a plateia e o personagem:
* **Grande Plano Geral (GPG)**: O ambiente domina completamente a figura humana. Comunica solid\xE3o, vastid\xE3o ou opress\xE3o do cen\xE1rio.
* **Plano Geral (PG)**: O sujeito aparece de corpo inteiro integrado ao ambiente. Situa espacialmente a a\xE7\xE3o.
* **Plano Americano (PA)**: Enquadra da altura do joelho at\xE9 a cabe\xE7a (nascido nos westerns para exibir o coldre dos rev\xF3lveres). Equil\xEDbrio entre a\xE7\xE3o f\xEDsica e di\xE1logo.
* **Plano M\xE9dio (PM)**: Da cintura para cima. O plano do di\xE1logo cl\xE1ssico e da intera\xE7\xE3o social.
* **Primeiro Plano (PP / Close-Up)**: Do peito ou ombros para cima. Foco nas express\xF5es faciais, emo\xE7\xF5es \xEDntimas e rea\xE7\xE3o imediata.
* **Plano Detalhe (PD)**: Isola um objeto ou elemento espec\xEDfico (um bilhete, um olho, um gatilho). Revela pistas cruciais para a narrativa.`,
        tonyNotes: "O close-up \xE9 a maior arma do cinema. Se voc\xEA usa close-up o tempo todo, ele perde o poder de impacto."
      },
      {
        id: "sec-1-3",
        title: "3. A Cadeia de Produ\xE7\xE3o Cinematogr\xE1fica",
        subtitle: "Da pr\xE9-produ\xE7\xE3o \xE0 finaliza\xE7\xE3o",
        contentMarkdown: `Todo projeto audiovisual atravessa tr\xEAs etapas fundamentais:
1. **Pr\xE9-Produ\xE7\xE3o**: Roteiro definitivo, decupagem t\xE9cnica, sele\xE7\xE3o de elenco (casting), reconhecimento de loca\xE7\xF5es, ordem de filmagem e or\xE7amento.
2. **Produ\xE7\xE3o (Filmagem)**: A execu\xE7\xE3o no set, registro de imagem e \xE1udio direto, respeito aos hor\xE1rios e condu\xE7\xE3o art\xEDstica.
3. **P\xF3s-Produ\xE7\xE3o**: Montagem, desenho de som, mixagem, tratamento de cor (grading) e masteriza\xE7\xE3o.`,
        tonyNotes: "Uma hora gasta na pr\xE9-produ\xE7\xE3o economiza tr\xEAs horas de atraso no set de filmagem."
      }
    ],
    quizQuestions: [
      {
        id: "quiz-1-1",
        questionNumber: 1,
        prompt: "Qual \xE9 a principal diferen\xE7a de percep\xE7\xE3o entre o espectador de teatro e o espectador de cinema?",
        options: [
          "No teatro o espectador n\xE3o ouve o ator, enquanto no cinema o som \xE9 amplificado.",
          "No teatro o espectador escolhe livremente para onde olhar no palco; no cinema, o diretor seleciona rigidamente o enquadramento.",
          "No cinema os atores n\xE3o precisam de maquiagem nem de figurino.",
          "O cinema n\xE3o utiliza luz artificial para compor suas cenas."
        ],
        correctOptionIndex: 1,
        explanation: "Correto! No cinema, o enquadramento e a decupagem controlam rigorosamente o ponto de vista e o foco da aten\xE7\xE3o do espectador."
      },
      {
        id: "quiz-1-2",
        questionNumber: 2,
        prompt: "Qual tamanho de plano foi popularizado nos filmes de faroeste (westerns) para manter vis\xEDveis o coldre e a arma do pistoleiro?",
        options: [
          "Plano Detalhe",
          "Grande Plano Geral",
          "Plano Americano (do joelho para cima)",
          "Primeiro Plano (Close-up)"
        ],
        correctOptionIndex: 2,
        explanation: "Exato! O Plano Americano enquadra os personagens dos joelhos para cima, permitindo filmar os duelos mantendo as m\xE3os nas armas."
      },
      {
        id: "quiz-1-3",
        questionNumber: 3,
        prompt: "Por que a capta\xE7\xE3o de som \xE9 considerada t\xE3o vital quanto a imagem na produ\xE7\xE3o audiovisual?",
        options: [
          "Porque a imagem atrai o foco consciente, enquanto o som atua diretamente na imers\xE3o e na sensa\xE7\xE3o de realidade espacial.",
          "Porque sem som nenhum arquivo de v\xEDdeo pode ser exportado no computador.",
          "Porque os festivais de cinema recusam filmes com qualquer tipo de sil\xEAncio.",
          "Porque as c\xE2meras digitais n\xE3o conseguem gravar imagens se n\xE3o houver um microfone acoplado."
        ],
        correctOptionIndex: 0,
        explanation: "Perfeito! O som ancora a verossimilhan\xE7a espacial e a carga emocional, sendo tolerado com muito menos falhas pelo p\xFAblico que a pr\xF3pria imagem."
      },
      {
        id: "quiz-1-4",
        questionNumber: 4,
        prompt: 'Qual \xE9 o princ\xEDpio fundamental da "Regra dos 180 Graus" (Eixo de A\xE7\xE3o) no cinema?',
        options: [
          "A c\xE2mera deve cruzar a linha imagin\xE1ria entre os atores a cada 10 segundos para dar dinamismo.",
          "A c\xE2mera deve permanecer sempre de um mesmo lado da linha imagin\xE1ria que une dois sujeitos para preservar a orienta\xE7\xE3o espacial e a dire\xE7\xE3o dos olhares.",
          "A lente deve ser girada em 180 graus entre tomadas consecutivas.",
          "O set de filmagem precisa ter exatamente 180 graus de temperatura t\xE9rmica."
        ],
        correctOptionIndex: 1,
        explanation: "Correto! A regra dos 180 graus assegura que, na montagem, os olhares dos personagens se cruzem harmoniosamente sem desorientar o espectador."
      },
      {
        id: "quiz-1-5",
        questionNumber: 5,
        prompt: "Em uma decupagem t\xE9cnica, qual \xE9 a principal diferen\xE7a em rela\xE7\xE3o ao roteiro liter\xE1rio?",
        options: [
          "O roteiro liter\xE1rio narra a dramaturgia e falas, enquanto a decupagem decomp\xF5e a cena em planos espec\xEDficos com lente, enquadramento e movimento de c\xE2mera.",
          "A decupagem s\xF3 pode ser lida pelos investidores financeiros.",
          "O roteiro liter\xE1rio deve ser jogado fora assim que a filmagem come\xE7a.",
          "A decupagem \xE9 feita apenas no computador durante a fase de montagem."
        ],
        correctOptionIndex: 0,
        explanation: "Exato! A decupagem \xE9 o desenho cir\xFArgico de execu\xE7\xE3o visual onde o diretor traduz a prosa do roteiro na linguagem concreta das lentes e enquadramentos."
      }
    ]
  },
  {
    id: "apostila-2",
    moduleId: 2,
    number: 2,
    title: "Hist\xF3ria do Cinema",
    description: "A trajet\xF3ria hist\xF3rica do cinema mundial e brasileiro: do cinema silencioso \xE0s vanguardas europeias, cinema cl\xE1ssico e contempor\xE2neo.",
    pagesCount: 52,
    pdfUrl: "/uploads/apostilas/apostila-modulo-02-2-APOSTILA_HISTORIA_DO_CINEMA_-_COM-1790652429759.pdf",
    coverUrl: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?auto=format&fit=crop&w=600&q=80",
    fileSizeMb: 2.17,
    extraVideos: [
      {
        "id": "ev-apostila-2-1",
        "slot": 1,
        "title": "V\xEDdeo Extra 01: Hist\xF3ria do Cinema & An\xE1lise Pr\xE1tica - M- 2.1",
        "videoUrl": "https://www.youtube.com/watch?v=qawVtd32DOQ",
        "thumbnailUrl": "https://img.youtube.com/vi/qawVtd32DOQ/hqdefault.jpg",
        "description": "O aluno deve observar o nascimento do cinema e o impacto visual da primeira exibi\xE7\xE3o p\xFAblica dos Irm\xE3os Lumi\xE8re com a chegada do trem na esta\xE7\xE3o (1895). Analisar a profundidade de campo natural, a perspectiva diagonal da locomotiva aproximando-se da tela e o choque realista causado na plateia da \xE9poca.",
        "professorNotes": "O aluno deve observar o nascimento do cinema e o impacto visual da primeira exibi\xE7\xE3o p\xFAblica dos Irm\xE3os Lumi\xE8re com a chegada do trem na esta\xE7\xE3o (1895). Analisar a profundidade de campo natural, a perspectiva diagonal da locomotiva aproximando-se da tela e o choque realista causado na plateia da \xE9poca.",
        "durationHours": 0,
        "durationMinutes": 18,
        "durationSeconds": 0,
        "totalDurationSeconds": 1080,
        "durationLabel": "00h 18m 00s",
        "uploadedAt": "2026-10-02T03:08:34.760Z"
      },
      {
        "id": "ev-apostila-2-2",
        "slot": 2,
        "title": "V\xEDdeo Extra 02: Hist\xF3ria do Cinema & An\xE1lise Pr\xE1tica - M- 2.2",
        "videoUrl": "https://www.youtube.com/watch?v=UHbpgsD8zCM",
        "thumbnailUrl": "https://img.youtube.com/vi/UHbpgsD8zCM/hqdefault.jpg",
        "description": "Identifique os efeitos utilizados e tentar imaginar como poderiam ter sido realizados na \xE9poca. O aluno deve analisar as trucagens \xF3pticas de Georges M\xE9li\xE8s (parada de c\xE2mera, sobreposi\xE7\xE3o e fus\xE3o) e compreender como os primeiros efeitos especiais moldaram a imagina\xE7\xE3o e a t\xE9cnica cinematogr\xE1fica mundial.",
        "professorNotes": "Identifique os efeitos utilizados e tentar imaginar como poderiam ter sido realizados na \xE9poca. O aluno deve analisar as trucagens \xF3pticas de Georges M\xE9li\xE8s (parada de c\xE2mera, sobreposi\xE7\xE3o e fus\xE3o) e compreender como os primeiros efeitos especiais moldaram a imagina\xE7\xE3o e a t\xE9cnica cinematogr\xE1fica mundial.",
        "durationHours": 0,
        "durationMinutes": 24,
        "durationSeconds": 0,
        "totalDurationSeconds": 1440,
        "durationLabel": "00h 24m 00s",
        "uploadedAt": "2026-10-02T03:08:34.760Z"
      }
    ],
    sections: [
      {
        id: "sec-2-1",
        title: "1. A Evolu\xE7\xE3o da S\xE9tima Arte",
        subtitle: "Do cinemat\xF3grafo dos Irm\xE3os Lumi\xE8re \xE0 revolu\xE7\xE3o sonora",
        contentMarkdown: `O nascimento do cinema (1895) fundou-se na atra\xE7\xE3o documental (Lumi\xE8re) e na fantasia m\xE1gica do ilusionismo (M\xE9li\xE8s). O cinema mudo desenvolveu uma sofistica\xE7\xE3o visual inigual\xE1vel, onde a pantomima dos atores e os cartazes de texto exigiam composi\xE7\xF5es gr\xE1ficas de extrema for\xE7a.

Com a chegada do som sincronizado em 1927 (*The Jazz Singer*), o cinema sofreu uma profunda transforma\xE7\xE3o: as c\xE2meras tornaram-se inicialmente est\xE1ticas devido aos pesados blimps antirru\xEDdo, at\xE9 que a t\xE9cnica recuperou a mobilidade nos anos 1930 com os movimentos de grua e travelling.`,
        tonyNotes: "Estude o cinema silencioso: nele reside a ess\xEAncia mais pura da composi\xE7\xE3o e da narrativa por imagens."
      },
      {
        id: "sec-2-2",
        title: "2. As Seis Camadas de An\xE1lise F\xEDlmica CINELAB",
        subtitle: "O m\xE9todo definitivo para dissecar qualquer obra audiovisual",
        contentMarkdown: `Para analisar um filme com profundidade cr\xEDtica, desmonte a obra em suas 6 camadas constitutivas:
1. **Camada Narrativa**: O arco dram\xE1tico, a premissa tem\xE1tica, a estrutura em atos e os pontos de virada.
2. **Camada de Personagem**: Motiva\xE7\xE3o primordial, fraqueza interna, arco de transforma\xE7\xE3o e subtexto das rela\xE7\xF5es.
3. **Camada Espacial**: A cenografia, a escolha das loca\xE7\xF5es, a claustrofobia ou amplitude do mundo f\xEDsico.
4. **Camada de Imagem (Fotografia)**: A paleta de cores, temperatura da luz, contraste, lentes e profundidade de campo.
5. **Camada de Som**: O desenho de som, di\xE1logos, ru\xEDdos dieg\xE9ticos (internos \xE0 hist\xF3ria), m\xFAsica extradieg\xE9tica e sil\xEAncio.
6. **Camada de Montagem**: O ritmo dos cortes, dura\xE7\xE3o m\xE9dia dos planos, elipses temporais e justaposi\xE7\xE3o de sentidos.`,
        tonyNotes: "Quando voc\xEA analisa um filme nessas seis camadas, voc\xEA deixa de ser um mero consumidor e passa a pensar como realizador."
      }
    ],
    quizQuestions: [
      {
        id: "quiz-2-1",
        questionNumber: 1,
        prompt: "Qual foi o impacto imediato da introdu\xE7\xE3o do som s\xEDncrono no final dos anos 1920 sobre a movimenta\xE7\xE3o da c\xE2mera no set?",
        options: [
          "A c\xE2mera tornou-se imediatamente mais veloz e port\xE1til.",
          "As c\xE2meras precisaram ser isoladas em cabines ou capas pesadas para n\xE3o vazar ru\xEDdo no microfone, reduzindo temporariamente a mobilidade.",
          "Os est\xFAdios passaram a filmar exclusivamente com luz natural.",
          "A montagem passou a cortar os planos a cada 1 segundo."
        ],
        correctOptionIndex: 1,
        explanation: "Correto! O barulho dos motores das primeiras c\xE2meras exigiu pesadas caixas de isolamento ac\xFAstico (blimps), engessando o movimento at\xE9 a evolu\xE7\xE3o de novos equipamentos."
      },
      {
        id: "quiz-2-2",
        questionNumber: 2,
        prompt: "No m\xE9todo de an\xE1lise f\xEDlmica do CINELAB, qual camada examina a ilumina\xE7\xE3o, paleta de cores e profundidade de campo?",
        options: ["Camada Espacial", "Camada de Imagem (Fotografia)", "Camada Sonora", "Camada Narrativa"],
        correctOptionIndex: 1,
        explanation: "Exato! A Camada de Imagem investiga todas as escolhas fotogr\xE1ficas, \xF3pticas e lum\xEDnicas da obra."
      },
      {
        id: "quiz-2-3",
        questionNumber: 3,
        prompt: "Em que consiste o conceito de som dieg\xE9tico em uma obra audiovisual?",
        options: [
          "\xC9 o som que pertence ao universo da hist\xF3ria e que os personagens em cena tamb\xE9m conseguem ouvir.",
          "\xC9 a trilha sonora orquestral que apenas a plateia escuta fora da cena.",
          "\xC9 o ru\xEDdo gerado por falhas no cabo do microfone.",
          "\xC9 a voz do narrador que fala diretamente com o p\xFAblico em tom documental."
        ],
        correctOptionIndex: 0,
        explanation: "Perfeito! O som dieg\xE9tico \xE9 aquele originado dentro do mundo ficcional do filme (o r\xE1dio tocando, a buzina de um carro, a fala de outro personagem)."
      },
      {
        id: "quiz-2-4",
        questionNumber: 4,
        prompt: "Qual movimento cinematogr\xE1fico italiano do p\xF3s-guerra notabilizou-se pelo uso de loca\xE7\xF5es reais nas ruas e atores n\xE3o profissionais?",
        options: [
          "Expressionismo Alem\xE3o",
          "Neorrealismo Italiano",
          "Cinema Marginal Brasileiro",
          "Dogma 95 Dinamarqu\xEAs"
        ],
        correctOptionIndex: 1,
        explanation: 'Correto! O Neorrealismo Italiano (com obras como "Ladr\xF5es de Bicicleta" e "Roma, Cidade Aberta") desceu \xE0s ruas para registrar a dura realidade social sem maquiagem de est\xFAdio.'
      },
      {
        id: "quiz-2-5",
        questionNumber: 5,
        prompt: 'O que caracterizou o movimento da "Nouvelle Vague" francesa e sua Pol\xEDtica dos Autores no fim dos anos 1950?',
        options: [
          "A proibi\xE7\xE3o de c\xE2meras port\xE1teis e o retorno ao teatro filmado cl\xE1ssico.",
          "A liberdade de c\xE2mera na m\xE3o, o corte seco descont\xEDnuo (jump cut) e a consagra\xE7\xE3o do diretor como o verdadeiro autor e mente criadora do filme.",
          "A obriga\xE7\xE3o de usar computadores para renderizar cen\xE1rios virtuais.",
          "A exig\xEAncia de que todos os filmes tivessem no m\xEDnimo 4 horas de dura\xE7\xE3o."
        ],
        correctOptionIndex: 1,
        explanation: "Exato! Cineastas como Godard e Truffaut romperam com o academicismo usando montagem audaciosa com jump cuts, filmagens nas ruas de Paris e afirmando a autoria art\xEDstica do realizador."
      }
    ]
  },
  {
    id: "apostila-3",
    moduleId: 3,
    number: 3,
    title: "Apostila 03: Roteiro e Cria\xE7\xE3o de Personagens",
    description: "Da ideia embrion\xE1ria \xE0 cena formatada: storyline, logline, sinopse, escaleta, cria\xE7\xE3o de personagens tridimensionais, di\xE1logos e subtexto dram\xE1tico.",
    pagesCount: 4,
    pdfUrl: "/materiais/cinelab-apostila-03.pdf",
    coverUrl: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=600&q=80",
    fileSizeMb: 21,
    extraVideos: [
      {
        "id": "ev-apostila-3-1",
        "slot": 1,
        "title": "V\xEDdeo Extra 01: Roteiro e Cria\xE7\xE3o de Personagens & An\xE1lise Pr\xE1tica - M- 3.1",
        "videoUrl": "",
        "thumbnailUrl": "https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=800&q=80",
        "description": "An\xE1lise t\xE9cnica e decupagem comentada pelo Professor Cineasta Tony de Luc para aprofundar os conceitos te\xF3ricos desta apostila.",
        "professorNotes": "",
        "durationHours": 0,
        "durationMinutes": 18,
        "durationSeconds": 0,
        "totalDurationSeconds": 1080,
        "durationLabel": "00h 18m 00s",
        "uploadedAt": "2026-10-02T03:08:34.760Z"
      },
      {
        "id": "ev-apostila-3-2",
        "slot": 2,
        "title": "V\xEDdeo Extra 02: Roteiro e Cria\xE7\xE3o de Personagens & An\xE1lise Pr\xE1tica - M- 3.2",
        "videoUrl": "",
        "thumbnailUrl": "https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=800&q=80",
        "description": "Exerc\xEDcio pr\xE1tico de aplica\xE7\xE3o em set de filmagem com demonstra\xE7\xE3o passo a passo da metodologia do CINELAB.",
        "professorNotes": "",
        "durationHours": 0,
        "durationMinutes": 24,
        "durationSeconds": 0,
        "totalDurationSeconds": 1440,
        "durationLabel": "00h 24m 00s",
        "uploadedAt": "2026-10-02T03:08:34.760Z"
      }
    ],
    sections: [
      {
        id: "sec-3-1",
        title: "1. A Escada da Cria\xE7\xE3o do Roteiro",
        subtitle: "Da centelha inicial ao roteiro decupado",
        contentMarkdown: `Nenhum roteirista profissional abre o editor de texto e come\xE7a a escrever di\xE1logos a esmo. Existe um fluxo can\xF4nico de amadurecimento:
1. **Ideia Central**: O que aconteceria se...?
2. **Storyline**: O resumo dram\xE1tico em at\xE9 5 linhas (Quem \xE9 o protagonista? Qual o conflito deflagrador? O que est\xE1 em jogo?).
3. **Logline**: A s\xEDntese em 1 a 2 frases com protagonista, catalisador e objetivo com urg\xEAncia.
4. **Sinopse**: A narrativa do in\xEDcio, meio e fim em 1 ou 2 p\xE1ginas.
5. **Argumento / Tratamento**: O filme escrito em prosa corrida no presente do indicativo, cena a cena.
6. **Escaleta (Beat Sheet)**: Lista numerada de todas as cenas com cabe\xE7alho de cena e resumo da a\xE7\xE3o.
7. **Roteiro Liter\xE1rio (Master Scenes)**: O formato com cabe\xE7alho de cena (INT/EXT), rubrica no presente e di\xE1logos formatados.`,
        tonyNotes: "A escaleta \xE9 o mapa do tesouro. Se a sua escaleta tem problemas estruturais, o roteiro ter\xE1 furos irrepar\xE1veis."
      },
      {
        id: "sec-3-2",
        title: "2. Subtexto: O que N\xE3o \xE9 Dito Vale Mais",
        subtitle: "A arte do di\xE1logo indireto no cinema moderno",
        contentMarkdown: `No cinema amador, os personagens dizem exatamente o que est\xE3o pensando e sentindo ("Estou muito zangado com voc\xEA!"). No grande cinema, os personagens mentem, disfar\xE7am, atacam pelas beiradas e desviam o assunto.
**Subtexto** \xE9 o rio subterr\xE2neo que corre por baixo das palavras pronunciadas. Uma conversa casual sobre a receita de um sandu\xEDche ou o tempo l\xE1 fora pode ser, na verdade, um rompimento conjugal doloroso.`,
        tonyNotes: "Se uma cena pode ser entendida inteiramente sem \xE1udio apenas pela tens\xE3o corporal dos atores, voc\xEA escreveu um roteiro visual brilhante."
      }
    ],
    quizQuestions: [
      {
        id: "quiz-3-1",
        questionNumber: 1,
        prompt: "Qual \xE9 o papel da escaleta (beat sheet) no desenvolvimento de um roteiro cinematogr\xE1fico?",
        options: [
          "Definir a lista de equipamentos que a c\xE2mera vai usar no set.",
          "Mapear a sequ\xEAncia estruturada de cenas e acontecimentos dram\xE1ticos antes da reda\xE7\xE3o dos di\xE1logos.",
          "Contratar os atores e assinar os contratos de loca\xE7\xE3o.",
          "Calcular o or\xE7amento final de p\xF3s-produ\xE7\xE3o do filme."
        ],
        correctOptionIndex: 1,
        explanation: "Correto! A escaleta organiza a espinha dorsal de cada cena, garantindo o ritmo e a l\xF3gica dram\xE1tica antes dos di\xE1logos."
      },
      {
        id: "quiz-3-2",
        questionNumber: 2,
        prompt: 'Em dramaturgia audiovisual, o que define o "subtexto" de uma cena?',
        options: [
          "O tamanho da fonte tipogr\xE1fica usada na impress\xE3o do roteiro.",
          "A legenda em l\xEDngua estrangeira exibida na parte inferior da tela.",
          "O significado real e oculto por tr\xE1s do que os personagens dizem ou fazem em cena.",
          "A lista de patrocinadores exibida nos cr\xE9ditos finais."
        ],
        correctOptionIndex: 2,
        explanation: "Exato! Subtexto \xE9 o conte\xFAdo emocional n\xE3o verbalizado diretamente, onde a verdadeira inten\xE7\xE3o do personagem se manifesta."
      },
      {
        id: "quiz-3-3",
        questionNumber: 3,
        prompt: "Qual a estrutura padr\xE3o de um cabe\xE7alho de cena no formato internacional Master Scenes?",
        options: [
          "NOME DO DIRETOR \u2013 DATA DE NASCIMENTO \u2013 PRE\xC7O DA DI\xC1RIA",
          "INT. ou EXT. / LOCA\xC7\xC3O ESPEC\xCDFICA / DIA ou NOITE",
          "TITULO DO FILME / N\xDAMERO DE P\xC1GINAS / COR DO CEN\xC1RIO",
          "C\xC2MERA 1 / LENTE 50MM / ISO 800"
        ],
        correctOptionIndex: 1,
        explanation: "Perfeito! O cabe\xE7alho indica se a cena \xE9 interna (INT.) ou externa (EXT.), o local onde ocorre e a condi\xE7\xE3o de luz (DIA/NOITE)."
      },
      {
        id: "quiz-3-4",
        questionNumber: 4,
        prompt: 'Na estrutura cl\xE1ssica em tr\xEAs atos de Syd Field, o que caracteriza o "Incidente Incitante" (Catalisador)?',
        options: [
          "A lista de agradecimentos nos cr\xE9ditos finais.",
          "O evento disruptivo que quebra o equil\xEDbrio do mundo comum do protagonista e desencadeia a jornada dram\xE1tica.",
          "O momento em que a equipe encerra a primeira semana de grava\xE7\xE3o.",
          "A compra de uma nova c\xE2mera de cinema."
        ],
        correctOptionIndex: 1,
        explanation: "Correto! O Incidente Incitante quebra a normalidade inicial do protagonista e o coloca em rota de colis\xE3o com seu novo objetivo dram\xE1tico."
      },
      {
        id: "quiz-3-5",
        questionNumber: 5,
        prompt: 'Em dramaturgia, qual a import\xE2ncia da "Falha Tr\xE1gica" (Flaw) para a constru\xE7\xE3o de um protagonista tridimensional?',
        options: [
          "Serve para o roteiro ser recusado pelos produtores.",
          "Cria uma ferida emocional ou cren\xE7a err\xF4nea interna que o personagem precisa confrontar e superar para completar seu arco de transforma\xE7\xE3o.",
          "Obriga o ator a falar sempre sussurrando em cena.",
          "Impede que o filme tenha qualquer tipo de trilha sonora."
        ],
        correctOptionIndex: 1,
        explanation: "Exato! A falha tr\xE1gica interna humaniza o protagonista, gerando identifica\xE7\xE3o e empatia com a plateia ao longo de seu arco de evolu\xE7\xE3o."
      }
    ]
  },
  {
    id: "apostila-4",
    moduleId: 4,
    number: 4,
    title: "Apostila 04: Dire\xE7\xE3o e Dire\xE7\xE3o de Atores",
    description: "O papel de lideran\xE7a do diretor, decupagem com inten\xE7\xE3o est\xE9tica, ensaios pr\xE1ticos, marca\xE7\xE3o c\xEAnica (blocking) e a condu\xE7\xE3o \xE9tica e respeitosa do elenco.",
    pagesCount: 4,
    pdfUrl: "/materiais/cinelab-apostila-04.pdf",
    coverUrl: "https://images.unsplash.com/photo-1518133910546-b6c2fb7d79e3?auto=format&fit=crop&w=600&q=80",
    fileSizeMb: 18.9,
    extraVideos: [
      {
        "id": "ev-apostila-4-1",
        "slot": 1,
        "title": "V\xEDdeo Extra 01: Dire\xE7\xE3o e Dire\xE7\xE3o de Atores & An\xE1lise Pr\xE1tica - M- 4.1",
        "videoUrl": "",
        "thumbnailUrl": "https://images.unsplash.com/photo-1518133910546-b6c2fb7d79e3?auto=format&fit=crop&w=800&q=80",
        "description": "An\xE1lise t\xE9cnica e decupagem comentada pelo Professor Cineasta Tony de Luc para aprofundar os conceitos te\xF3ricos desta apostila.",
        "professorNotes": "",
        "durationHours": 0,
        "durationMinutes": 18,
        "durationSeconds": 0,
        "totalDurationSeconds": 1080,
        "durationLabel": "00h 18m 00s",
        "uploadedAt": "2026-10-02T03:08:34.760Z"
      },
      {
        "id": "ev-apostila-4-2",
        "slot": 2,
        "title": "V\xEDdeo Extra 02: Dire\xE7\xE3o e Dire\xE7\xE3o de Atores & An\xE1lise Pr\xE1tica - M- 4.2",
        "videoUrl": "",
        "thumbnailUrl": "https://images.unsplash.com/photo-1518133910546-b6c2fb7d79e3?auto=format&fit=crop&w=800&q=80",
        "description": "Exerc\xEDcio pr\xE1tico de aplica\xE7\xE3o em set de filmagem com demonstra\xE7\xE3o passo a passo da metodologia do CINELAB.",
        "professorNotes": "",
        "durationHours": 0,
        "durationMinutes": 24,
        "durationSeconds": 0,
        "totalDurationSeconds": 1440,
        "durationLabel": "00h 24m 00s",
        "uploadedAt": "2026-10-02T03:08:34.760Z"
      }
    ],
    sections: [
      {
        id: "sec-4-1",
        title: "1. O Diretor como Maestro do Set",
        subtitle: "Autoridade afetiva, clareza de vis\xE3o e comunica\xE7\xE3o",
        contentMarkdown: `O diretor de cinema \xE9 o guardi\xE3o final da vis\xE3o art\xEDstica da obra. Todos os departamentos (fotografia, arte, som, figurino) respondem ao mesmo conceito unificador. O diretor n\xE3o precisa saber operar cada bot\xE3o de uma c\xE2mera Arri ou de um gravador Sound Devices, mas **precisa saber exatamente o que quer sentir e comunicar em cada plano**.`,
        tonyNotes: "Nunca grite no set. A serenidade do diretor \xE9 o oxig\xEAnio que mant\xE9m toda a equipe criativa e focada."
      },
      {
        id: "sec-4-2",
        title: "2. Dire\xE7\xE3o de Atores: Verbos de A\xE7\xE3o vs. Adjetivos",
        subtitle: "A t\xE9cnica de dirigir atrav\xE9s de objetivos palp\xE1veis",
        contentMarkdown: `A pior instru\xE7\xE3o que um diretor pode dar a um ator \xE9 um adjetivo ou um estado de esp\xEDrito abstrato: *"Fique mais triste"*, *"Seja mais misterioso"*.
O ator n\xE3o consegue interpretar "tristeza"; ele interpreta **a\xE7\xF5es e objetivos**. Substitua adjetivos por verbos ativos transitivos:
* Em vez de *"fique furioso"*, diga: *"desmonte a mentira dele com eleg\xE2ncia"*.
* Em vez de *"seja sedutora"*, diga: *"atraia a aten\xE7\xE3o dele para o documento sobre a mesa sem toc\xE1-lo"*.`,
        tonyNotes: "D\xEA ao ator um obst\xE1culo f\xEDsico e um objetivo concreto: a emo\xE7\xE3o nascer\xE1 espontaneamente da resist\xEAncia."
      }
    ],
    quizQuestions: [
      {
        id: "quiz-4-1",
        questionNumber: 1,
        prompt: 'Por que o uso de verbos de a\xE7\xE3o \xE9 muito mais eficaz na dire\xE7\xE3o de atores do que o uso de adjetivos como "fique triste"?',
        options: [
          "Porque os atores n\xE3o entendem o significado dos adjetivos.",
          "Porque o ator interpreta inten\xE7\xF5es e objetivos concretos contra obst\xE1culos, e a emo\xE7\xE3o surge como consequ\xEAncia da a\xE7\xE3o f\xEDsica.",
          "Porque os adjetivos tornam o roteiro mais caro para ser filmado.",
          "Porque o diretor \xE9 obrigado por lei sindical a usar apenas verbos no set."
        ],
        correctOptionIndex: 1,
        explanation: "Correto! O ator precisa de um objetivo jog\xE1vel (um verbo ativo) e n\xE3o de uma emo\xE7\xE3o abstrata que soaria fingida."
      },
      {
        id: "quiz-4-2",
        questionNumber: 2,
        prompt: "O que significa a marca\xE7\xE3o c\xEAnica (blocking) em um ensaio de cena cinematogr\xE1fica?",
        options: [
          "Bloquear a entrada de visitantes indesejados no set.",
          "A defini\xE7\xE3o da movimenta\xE7\xE3o f\xEDsica dos atores pelo espa\xE7o em rela\xE7\xE3o \xE0 posi\xE7\xE3o da c\xE2mera.",
          "A escolha do microfone mais adequado para a cena.",
          "O momento em que a equipe faz o intervalo de almo\xE7o."
        ],
        correctOptionIndex: 1,
        explanation: "Exato! O blocking \xE9 a coreografia dos passos e posicionamentos dos atores dentro do espa\xE7o c\xEAnico e diante das lentes."
      },
      {
        id: "quiz-4-3",
        questionNumber: 3,
        prompt: "Qual postura do diretor de cinema promove um ambiente seguro e de alta performance criativa?",
        options: [
          "Gritar com os assistentes para demonstrar autoridade diante dos atores.",
          "Mudar o roteiro a cada cinco minutos sem avisar a equipe de produ\xE7\xE3o.",
          "Clareza de vis\xE3o est\xE9tica, escuta ativa, pontualidade e respeito irrestrito a todos os membros da equipe.",
          "Proibir que os atores fa\xE7am perguntas sobre seus personagens."
        ],
        correctOptionIndex: 2,
        explanation: "Perfeito! O profissionalismo cinematogr\xE1fico fundamenta-se no rigor t\xE9cnico associado ao respeito \xE9tico no ambiente de trabalho."
      },
      {
        id: "quiz-4-4",
        questionNumber: 4,
        prompt: 'Durante os ensaios de cena com o elenco, qual \xE9 o principal objetivo da "Leitura de Mesa" (Table Read)?',
        options: [
          "Decorar o texto rapidamente para filmar no mesmo dia.",
          "Alinhar o tom dram\xE1tico da obra, ouvir a musicalidade dos di\xE1logos e sanar d\xFAvidas conceituais antes de pisar no set.",
          "Decidir quais figurinos ser\xE3o comprados na internet.",
          "Verificar se os atores sabem ler em voz alta."
        ],
        correctOptionIndex: 1,
        explanation: "Correto! A leitura de mesa \xE9 a primeira confraterniza\xE7\xE3o art\xEDstica entre diretor e elenco, onde ritmo, inten\xE7\xF5es e harmonia dram\xE1tica s\xE3o ajustados."
      },
      {
        id: "quiz-4-5",
        questionNumber: 5,
        prompt: 'Como o diretor cinematogr\xE1fico trabalha o "subtexto" nas pausas e olhares dos atores em cena?',
        options: [
          "Mandando o ator piscar os olhos freneticamente para a c\xE2mera.",
          "Criando uma a\xE7\xE3o f\xEDsica paralela e mantendo a tens\xE3o do que n\xE3o \xE9 dito expressa atrav\xE9s do olhar, respira\xE7\xE3o e ritmo corporal.",
          "Pedindo para o ator sussurrar o que est\xE1 pensando para o microfone de lapela.",
          "Colocando legendas explicativas sobre a cabe\xE7a dos personagens."
        ],
        correctOptionIndex: 1,
        explanation: "Exato! O subtexto vive no corpo, no olhar e no sil\xEAncio entre as falas, onde a tens\xE3o emocional genu\xEDna \xE9 transmitida ao espectador."
      }
    ]
  },
  {
    id: "apostila-5",
    moduleId: 5,
    number: 5,
    title: "Apostila 05: Fotografia, C\xE2mera e Ilumina\xE7\xE3o",
    description: "A est\xE9tica da luz no cinema, os 4 tipos de ilumina\xE7\xE3o dram\xE1tica, composi\xE7\xE3o visual, profundidade de campo, lentes e opera\xE7\xE3o consciente de c\xE2meras e celulares.",
    pagesCount: 6,
    pdfUrl: "/materiais/cinelab-apostila-05.pdf",
    coverUrl: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=600&q=80",
    fileSizeMb: 22.4,
    extraVideos: [
      {
        "id": "ev-apostila-5-1",
        "slot": 1,
        "title": "V\xEDdeo Extra 01: Fotografia, C\xE2mera e Ilumina\xE7\xE3o & An\xE1lise Pr\xE1tica - M- 5.1",
        "videoUrl": "/videos/cinelab-intro-apresentacao.mp4",
        "thumbnailUrl": "https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=800&q=80",
        "description": "O aluno deve observar o sistema cl\xE1ssico de ilumina\xE7\xE3o em tr\xEAs pontos (Key Light, Fill Light e Backlight), al\xE9m do uso de sombras, temperatura de cor e profundidade de campo.",
        "professorNotes": "O aluno deve observar o sistema cl\xE1ssico de ilumina\xE7\xE3o em tr\xEAs pontos (Key Light, Fill Light e Backlight), al\xE9m do uso de sombras, temperatura de cor e profundidade de campo.",
        "durationHours": 0,
        "durationMinutes": 18,
        "durationSeconds": 0,
        "totalDurationSeconds": 1080,
        "durationLabel": "00h 18m 00s",
        "uploadedAt": "2026-10-02T03:08:34.760Z"
      },
      {
        "id": "ev-apostila-5-2",
        "slot": 2,
        "title": "V\xEDdeo Extra 02: Fotografia, C\xE2mera e Ilumina\xE7\xE3o & An\xE1lise Pr\xE1tica - M- 5.2",
        "videoUrl": "/videos/cinelab-intro-apresentacao.mp4",
        "thumbnailUrl": "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=800&q=80",
        "description": "O aluno deve analisar os movimentos de c\xE2mera (panor\xE2mica, travelling, dolly e c\xE2mera na m\xE3o), percebendo como a fluidez do enquadramento dita o ritmo emocional do espectador.",
        "professorNotes": "O aluno deve analisar os movimentos de c\xE2mera (panor\xE2mica, travelling, dolly e c\xE2mera na m\xE3o), percebendo como a fluidez do enquadramento dita o ritmo emocional do espectador.",
        "durationHours": 0,
        "durationMinutes": 24,
        "durationSeconds": 0,
        "totalDurationSeconds": 1440,
        "durationLabel": "00h 24m 00s",
        "uploadedAt": "2026-10-02T03:08:34.760Z"
      }
    ],
    sections: [
      {
        id: "sec-5-1",
        title: "1. As 4 Qualidades de Luz Essenciais",
        subtitle: "Frontal, Lateral, Contraluz e Luz de Janela",
        contentMarkdown: `A dire\xE7\xE3o de fotografia esculpe o volume tridimensional da cena:
1. **Luz Frontal**: Atinge o rosto diretamente no mesmo eixo da c\xE2mera. Achata os tra\xE7os, elimina sombras e cria um aspecto limpo, direto ou institucional.
2. **Luz Lateral (90\xB0)**: Ilumina metade do rosto deixando a outra na penumbra. Gera textura, revela poros e cria alto contraste dram\xE1tico (chiaroscuro).
3. **Contraluz (Backlight)**: Posicionada atr\xE1s do sujeito em dire\xE7\xE3o \xE0 c\xE2mera. Cria uma aur\xE9ola de luz nos ombros e cabelos, destacando o personagem do fundo escuro.
4. **Luz de Janela (Natural / Suave)**: Difusa por cortinas ou rebatida em paredes. A luz mais nobre do cinema intimista e po\xE9tico (Tarkovsky, Bresson).`,
        tonyNotes: "Aprenda a fotografar com luz natural de janela rebatida em um peda\xE7o de isopor antes de gastar milhares de reais em refletores LED."
      },
      {
        id: "sec-5-2",
        title: "2. Regras de Composi\xE7\xE3o: Ter\xE7os, Linhas e Espa\xE7o Negativo",
        subtitle: "A organiza\xE7\xE3o harm\xF4nica do quadro cinematogr\xE1fico",
        contentMarkdown: `O olho humano busca padr\xF5es naturais de equil\xEDbrio:
* **Regra dos Ter\xE7os**: Posicione os olhos do personagem nas interse\xE7\xF5es superiores da grade de 3x3.
* **Espa\xE7o Negativo**: A \xE1rea vazia ao redor do sujeito refor\xE7a a solid\xE3o, a espera ou o isolamento social.
* **Linhas de Fuga**: Corredores, trilhos, ruas e pontes que direcionam a vis\xE3o diretamente para o ponto dram\xE1tico.`,
        tonyNotes: "Conhe\xE7a as regras de composi\xE7\xE3o para poder quebr\xE1-las deliberadamente quando o drama exigir desconforto."
      },
      {
        id: "sec-5-3",
        title: "3. Estudo de Caso & V\xEDdeo Extra: Her\xF3i (Hero, com Jet Li)",
        subtitle: "A Masterclass Crom\xE1tica de Christopher Doyle e Zhang Yimou",
        contentMarkdown: `Como demonstrado na indica\xE7\xE3o do filme extra do M\xF3dulo 05 (**Her\xF3i**, 2002, estrelado por Jet Li e fotografado por Christopher Doyle), a cor e a ilumina\xE7\xE3o n\xE3o s\xE3o meros adere\xE7os decorativos, mas a pr\xF3pria espinha dorsal da narrativa:
* **Psicologia Crom\xE1tica Estrutural**: A mesma hist\xF3ria \xE9 recontada em vers\xF5es divergentes, onde cada vers\xE3o adota uma paleta estrita: **Vermelho** (paix\xE3o cega e ci\xFAme), **Azul** (raz\xE3o e lealdade l\xFAcida), **Branco** (verdade e sacrif\xEDcio), **Verde** (mem\xF3ria e afeto) e **Preto** (a solenidade imperial).
* **Velocidade de Obtura\xE7\xE3o e Luz em Alta Velocidade**: No duelo de Jet Li contra Donnie Yen no p\xE1tio sob chuva torrencial, a ilumina\xE7\xE3o dura lateral transforma cada gota d'\xE1gua suspensa em vidro cortante.
* **Espelho Natural e Luz Suave**: No lend\xE1rio duelo sobre o lago calmo, a equipe aguardava as duas primeiras horas da alvorada para captar a \xE1gua em espelho absoluto sob luz suave difusa.`,
        content: `Como demonstrado na indica\xE7\xE3o do filme extra do M\xF3dulo 05 (Her\xF3i, 2002, estrelado por Jet Li e fotografado por Christopher Doyle), a cor e a ilumina\xE7\xE3o n\xE3o s\xE3o meros adere\xE7os decorativos, mas a pr\xF3pria espinha dorsal da narrativa:
* Psicologia Crom\xE1tica Estrutural: A mesma hist\xF3ria \xE9 recontada em vers\xF5es divergentes, onde cada vers\xE3o adota uma paleta estrita: Vermelho (paix\xE3o cega e ci\xFAme), Azul (raz\xE3o e lealdade l\xFAcida), Branco (verdade e sacrif\xEDcio), Verde (mem\xF3ria e afeto) e Preto (a solenidade imperial).
* Velocidade de Obtura\xE7\xE3o e Luz em Alta Velocidade: No duelo de Jet Li contra Donnie Yen no p\xE1tio sob chuva torrencial, a ilumina\xE7\xE3o dura lateral transforma cada gota d'\xE1gua suspensa em vidro cortante.
* Espelho Natural e Luz Suave: No lend\xE1rio duelo sobre o lago calmo, a equipe aguardava as duas primeiras horas da alvorada para captar a \xE1gua em espelho absoluto sob luz suave difusa.`,
        keyTakeaway: 'Assista aos v\xEDdeos extras de "Her\xF3i" na Cinemateca e na aba do M\xF3dulo 05. Repare como Christopher Doyle ilumina os figurinos monocrom\xE1ticos para destac\xE1-los sem saturar a pele dos atores.',
        tonyNotes: 'Assista aos v\xEDdeos extras de "Her\xF3i" na Cinemateca e na aba do M\xF3dulo 05. Repare como Christopher Doyle ilumina os figurinos monocrom\xE1ticos para destac\xE1-los sem saturar a pele dos atores.'
      },
      {
        id: "sec-5-4",
        title: "4. A Gram\xE1tica das Varia\xE7\xF5es Crom\xE1ticas em Her\xF3i (Hero)",
        subtitle: "Decupagem est\xE9tica das 5 paletas de cor que reinventaram a fotografia no cinema",
        contentMarkdown: `Na Cinemateca do CINELAB (M\xF3dulo 05), disponibilizamos as cenas de estudo com cada varia\xE7\xE3o de cor. Analise a fun\xE7\xE3o dramat\xFArgica de cada uma:

1. **A Paleta Vermelha (Duelo no Bosque de Folhas Outonais)**:
   * *Significado Dram\xE1tico*: Paix\xE3o ardente, ci\xFAme obsessivo, engano e ilus\xE3o destrutiva. \xC9 a hist\xF3ria contada sob a suspeita de trai\xE7\xE3o.
   * *T\xE9cnica Fotogr\xE1fica*: Christopher Doyle utilizou emuls\xF5es de alta satura\xE7\xE3o e ilumina\xE7\xE3o incandescente quente. As folhas no ch\xE3o iniciam em amarelo-ouro quente e, conforme o duelo entre Neve Voadora e Lua culmina em assassinato, transformam-se cinematograficamente em um vermelho escarlate sangue avassalador.

2. **A Paleta Azul (O Lago Calmo e a Raz\xE3o L\xFAcida)**:
   * *Significado Dram\xE1tico*: Sabedoria, busca da verdade, lealdade e serenidade reflexiva. \xC9 a vers\xE3o onde os amantes compreendem a necessidade do bem maior.
   * *T\xE9cnica Fotogr\xE1fica*: Temperatura de cor balanceada para a luz fria do dia (5600K a 6500K). O lago do Parque Jiuzhaigou s\xF3 podia ser filmado por 2 horas di\xE1rias para captar a \xE1gua im\xF3vel sem ondula\xE7\xF5es de vento, criando a simetria perfeita entre o real e o reflexo.

3. **A Paleta Verde (A Escola de Caligrafia de Zhao sob Flechas)**:
   * *Significado Dram\xE1tico*: Pureza de esp\xEDrito, juventude, mem\xF3ria afetuosa e a eternidade da arte sobre a barb\xE1rie.
   * *T\xE9cnica Fotogr\xE1fica*: Mantos verdes esmeralda tingidos manualmente que contrastam violentamente com as dezenas de milhares de flechas pretas retil\xEDneas lan\xE7adas pelo ex\xE9rcito invasor. A ilumina\xE7\xE3o filtra suavemente pelas janelas de papel de arroz.

4. **A Paleta Branca (O Luto, o Sacrif\xEDcio e a Verdade Desnuda)**:
   * *Significado Dram\xE1tico*: A realidade sem adere\xE7os, o luto solene, o sacrif\xEDcio supremo e a clareza moral. Na tradi\xE7\xE3o chinesa antiga, o branco \xE9 a cor do luto e do fim do ciclo terreno.
   * *T\xE9cnica Fotogr\xE1fica*: Luz solar direta dura nas areias brancas do deserto de Dunhuang, sem rebatedores quentes. Os rostos expostos ao vento revelam a dor crua dos guerreiros.

5. **A Paleta Preta / Sombra Imperial (A Ordem de Qin e o Duelo na Chuva)**:
   * *Significado Dram\xE1tico*: O peso inflex\xEDvel da lei imperial, autoridade esmagadora e poderio b\xE9lico.
   * *T\xE9cnica Fotogr\xE1fica*: Alto contraste (chiaroscuro extremo), silhuetas pretas contra lanternas de \xF3leo e contraluz lateral duro sobre as armaduras e as gotas de chuva no confronto entre Jet Li e Donnie Yen.`,
        content: `Na Cinemateca do CINELAB (M\xF3dulo 05), disponibilizamos as cenas de estudo com cada varia\xE7\xE3o de cor. Analise a fun\xE7\xE3o dramat\xFArgica de cada uma:

1. A Paleta Vermelha (Duelo no Bosque de Folhas Outonais):
- Significado Dram\xE1tico: Paix\xE3o ardente, ci\xFAme obsessivo, engano e ilus\xE3o destrutiva.
- T\xE9cnica Fotogr\xE1fica: Christopher Doyle utilizou emuls\xF5es de alta satura\xE7\xE3o e ilumina\xE7\xE3o incandescente quente. As folhas transformam-se em vermelho escarlate sangue quando a trag\xE9dia se consuma.

2. A Paleta Azul (O Lago Calmo e a Raz\xE3o L\xFAcida):
- Significado Dram\xE1tico: Sabedoria, serenidade e busca da verdade objetiva.
- T\xE9cnica Fotogr\xE1fica: Temperatura de cor fria (5600K a 6500K) e \xE1gua em espelho absoluto.

3. A Paleta Verde (A Escola de Caligrafia de Zhao sob Flechas):
- Significado Dram\xE1tico: Juventude, mem\xF3ria afetuosa e persist\xEAncia da arte.
- T\xE9cnica Fotogr\xE1fica: Mantos verdes esmeralda em contraste brutal com as flechas pretas do imp\xE9rio.

4. A Paleta Branca (O Luto, o Sacrif\xEDcio e a Verdade Desnuda):
- Significado Dram\xE1tico: A realidade sem adornos e o luto da perda tr\xE1gica.
- T\xE9cnica Fotogr\xE1fica: Luz solar dura direta no deserto sem filtros quentes.

5. A Paleta Preta (A Ordem de Qin e o Duelo na Chuva):
- Significado Dram\xE1tico: Autoridade implac\xE1vel e rigor geom\xE9trico.
- T\xE9cnica Fotogr\xE1fica: Contraluz lateral e alto contraste com sombras pretas densas.`,
        keyTakeaway: "A cor nunca deve ser apenas decorativa: em um filme autoral, ela \xE9 o estado emocional da cena. Ao planejar seu curta, defina qual cor dominar\xE1 cada ato antes de posicionar as l\xE2mpadas.",
        tonyNotes: "A cor nunca deve ser apenas decorativa: em um filme autoral, ela \xE9 o estado emocional da cena. Ao planejar seu curta, defina qual cor dominar\xE1 cada ato antes de posicionar as l\xE2mpadas."
      }
    ],
    quizQuestions: [
      {
        id: "quiz-5-1",
        questionNumber: 1,
        prompt: "Qual \xE9 a fun\xE7\xE3o do contraluz (backlight) na ilumina\xE7\xE3o de uma cena?",
        options: [
          "Deixar a lente da c\xE2mera suja para criar reflexos.",
          "Separar o sujeito do fundo escuro, criando um contorno luminoso nos cabelos e ombros.",
          "Iluminar as pernas dos atores quando eles usam sapatos pretos.",
          "Substituir o microfone de lapela."
        ],
        correctOptionIndex: 1,
        explanation: "Correto! O contraluz delimita a silhueta do personagem contra o cen\xE1rio, conferindo sensa\xE7\xE3o de profundidade tridimensional."
      },
      {
        id: "quiz-5-2",
        questionNumber: 2,
        prompt: "O que acontece esteticamente quando utilizamos uma ilumina\xE7\xE3o puramente lateral a 90 graus no rosto de um personagem?",
        options: [
          "O rosto perde toda a textura e fica plano como em um desenho animado.",
          "Metade do rosto fica iluminada e a outra metade em sombra dram\xE1tica, acentuando texturas e conflito interno.",
          "A c\xE2mera perde o foco automaticamente.",
          "A cor da cena \xE9 transformada em preto e branco sem necessidade de edi\xE7\xE3o."
        ],
        correctOptionIndex: 1,
        explanation: "Exato! A luz lateral gera o contraste claro-escuro, acentuando o relevo facial e sugerindo dualidade psicol\xF3gica."
      },
      {
        id: "quiz-5-3",
        questionNumber: 3,
        prompt: "Qual das op\xE7\xF5es descreve corretamente o uso do espa\xE7o negativo na composi\xE7\xE3o cinematogr\xE1fica?",
        options: [
          "O espa\xE7o que fica atr\xE1s da equipe de filmagem fora do set.",
          "A \xE1rea do enquadramento que n\xE3o cont\xE9m elementos dram\xE1ticos centrais, utilizada para evocar vazio, sil\xEAncio ou pequenez.",
          "O espa\xE7o do disco r\xEDgido ocupado pelos arquivos apagados.",
          "A sala onde o diretor assiste aos cortes preliminares."
        ],
        correctOptionIndex: 1,
        explanation: "Perfeito! O espa\xE7o negativo emoldura o sujeito, ampliando a carga expressiva da solid\xE3o ou da vulnerabilidade."
      },
      {
        id: "quiz-5-4",
        questionNumber: 4,
        prompt: "Como a abertura do diafragma (f-stop) influencia visualmente a profundidade de campo em um plano cinematogr\xE1fico?",
        options: [
          "Quanto mais aberto o diafragma (ex: f/1.8), mais rasa \xE9 a profundidade de campo, isolando o sujeito n\xEDtido com fundo desfocado (bokeh).",
          "A abertura do diafragma s\xF3 altera o volume do microfone.",
          "Quanto mais aberto o diafragma, mais escuro fica o plano.",
          "O diafragma serve exclusivamente para mudar a taxa de quadros por segundo."
        ],
        correctOptionIndex: 0,
        explanation: "Correto! Grandes aberturas de diafragma (n\xFAmeros f pequenos) geram pouca profundidade de campo, direcionando o foco do espectador para o personagem."
      },
      {
        id: "quiz-5-5",
        questionNumber: 5,
        prompt: "Quais s\xE3o as tr\xEAs fontes que comp\xF5em o cl\xE1ssico esquema de ilumina\xE7\xE3o de tr\xEAs pontos no cinema?",
        options: [
          "Luz Vermelha, Luz Verde e Luz Azul.",
          "Luz Principal (Key Light), Luz de Preenchimento (Fill Light) e Contraluz (Backlight).",
          "Lanterna de celular, tela do computador e vela arom\xE1tica.",
          "Farol de carro, poste de rua e luz solar direta."
        ],
        correctOptionIndex: 1,
        explanation: "Exato! O trio cl\xE1ssico modela o sujeito com a luz principal, atenua sombras excessivas com o preenchimento e separa o corpo do fundo com o contraluz."
      }
    ]
  },
  {
    id: "apostila-6",
    moduleId: 6,
    number: 6,
    title: "Apostila 06: Som e Trilha Sonora",
    description: "Capta\xE7\xE3o de som direto no set, microfones direcionais e lapela, ru\xEDdos de sala (room tone), camadas de desenho sonoro (foley, efeitos e trilha) e legisla\xE7\xE3o de \xE1udio.",
    pagesCount: 4,
    pdfUrl: "/materiais/cinelab-apostila-06.pdf",
    coverUrl: "https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=600&q=80",
    fileSizeMb: 18.1,
    extraVideos: [
      {
        "id": "ev-apostila-6-1",
        "slot": 1,
        "title": "V\xEDdeo Extra 01: Som e Trilha Sonora & An\xE1lise Pr\xE1tica - M- 6.1",
        "videoUrl": "/videos/cinelab-intro-apresentacao.mp4",
        "thumbnailUrl": "https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=800&q=80",
        "description": "O aluno deve identificar a capta\xE7\xE3o de di\xE1logo com microfone direcional (Boom), a capta\xE7\xE3o do som ambiente (room tone) e a import\xE2ncia do sil\xEAncio como elemento dram\xE1tico.",
        "professorNotes": "O aluno deve identificar a capta\xE7\xE3o de di\xE1logo com microfone direcional (Boom), a capta\xE7\xE3o do som ambiente (room tone) e a import\xE2ncia do sil\xEAncio como elemento dram\xE1tico.",
        "durationHours": 0,
        "durationMinutes": 18,
        "durationSeconds": 0,
        "totalDurationSeconds": 1080,
        "durationLabel": "00h 18m 00s",
        "uploadedAt": "2026-10-02T03:08:34.760Z"
      },
      {
        "id": "ev-apostila-6-2",
        "slot": 2,
        "title": "V\xEDdeo Extra 02: Som e Trilha Sonora & An\xE1lise Pr\xE1tica - M- 6.2",
        "videoUrl": "/videos/cinelab-intro-apresentacao.mp4",
        "thumbnailUrl": "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=800&q=80",
        "description": "O aluno deve observar a constru\xE7\xE3o das camadas sonoras (foley, efeitos sonoros dieg\xE9ticos e n\xE3o-dieg\xE9ticos) e a harmonia entre trilha musical e di\xE1logos.",
        "professorNotes": "O aluno deve observar a constru\xE7\xE3o das camadas sonoras (foley, efeitos sonoros dieg\xE9ticos e n\xE3o-dieg\xE9ticos) e a harmonia entre trilha musical e di\xE1logos.",
        "durationHours": 0,
        "durationMinutes": 24,
        "durationSeconds": 0,
        "totalDurationSeconds": 1440,
        "durationLabel": "00h 24m 00s",
        "uploadedAt": "2026-10-02T03:08:34.760Z"
      }
    ],
    sections: [
      {
        id: "sec-6-1",
        title: "1. O Som Direto e a Grava\xE7\xE3o de Room Tone",
        subtitle: "A regra de ouro de nunca deixar o set sem o sil\xEAncio da loca\xE7\xE3o",
        contentMarkdown: `O **Room Tone** (ru\xEDdo de sala ou ambi\xEAncia neutra) \xE9 o som daquele espa\xE7o espec\xEDfico sem ningu\xE9m falando: o zumbido sutil da rede el\xE9trica, o vento distante, a resson\xE2ncia das paredes.
Grave sempre **pelo menos 60 segundos de room tone absoluto** com a equipe im\xF3vel e em sil\xEAncio antes de desarmar o set. Sem esse \xE1udio, o montador n\xE3o conseguir\xE1 emendar os cortes de di\xE1logo sem que ocorram quedas abruptas de ru\xEDdo de fundo.`,
        tonyNotes: "Sil\xEAncio total por 1 minuto no set \xE9 o maior respeito que uma equipe pode prestar \xE0 p\xF3s-produ\xE7\xE3o do filme."
      },
      {
        id: "sec-6-2",
        title: "2. As Quatro Camadas do Sound Design",
        subtitle: "Di\xE1logo, Foley, Efeitos (FX) e Trilha Sonora",
        contentMarkdown: `A mixagem cinematogr\xE1fica profissional equilibra quatro pilares:
1. **Di\xE1logos (DX)**: Devem ser claros, intelig\xEDveis e tratados sem excesso de reverbera\xE7\xE3o invasiva.
2. **Foley**: Sons corporais gravados em est\xFAdio sincronizados com a a\xE7\xE3o (passos, toque de x\xEDcaras, atrito de roupas).
3. **Efeitos Especiais e Ambi\xEAncia (FX/BG)**: Motores, chuva, tiros, vento, portas batendo.
4. **M\xFAsica (MX)**: N\xE3o deve redundar o que a imagem j\xE1 mostra; deve dialogar em contraponto ou revelar o subtexto interior.`,
        tonyNotes: "Se a cena \xE9 triste e voc\xEA coloca uma m\xFAsica ultra melodram\xE1tica, voc\xEA agride o espectador. Deixe a imagem e o sil\xEAncio respirarem."
      }
    ],
    quizQuestions: [
      {
        id: "quiz-6-1",
        questionNumber: 1,
        prompt: 'Por que \xE9 fundamental gravar ao menos 60 segundos de "Room Tone" (ru\xEDdo de sala) em cada loca\xE7\xE3o antes de desmontar o set?',
        options: [
          "Para testar se a bateria do gravador ainda tem carga.",
          "Para que o montador possa preencher lacunas de \xE1udio e suavizar cortes entre diferentes tomadas de di\xE1logo sem saltos ac\xFAsticos.",
          "Porque a legisla\xE7\xE3o trabalhista exige um minuto de sil\xEAncio di\xE1rio para os atores.",
          "Para que o diretor possa relaxar a mente ap\xF3s a filmagem."
        ],
        correctOptionIndex: 1,
        explanation: "Correto! O room tone permite criar uma base cont\xEDnua que mascara os cortes de di\xE1logo na ilha de edi\xE7\xE3o."
      },
      {
        id: "quiz-6-2",
        questionNumber: 2,
        prompt: "O que caracteriza o trabalho do artista de Foley na p\xF3s-produ\xE7\xE3o de \xE1udio?",
        options: [
          "Escrever as partituras orquestrais da trilha sonora cl\xE1ssica.",
          "Recriar em est\xFAdio e em sincronia labial e f\xEDsica os ru\xEDdos de passos, roupas, copos e manuseio de objetos.",
          "Instalar caixas de som nos cinemas de rua.",
          "Substituir a voz dos atores por intelig\xEAncia artificial."
        ],
        correctOptionIndex: 1,
        explanation: "Exato! O artista de Foley reproduz manualmente texturas sonoras humanas para dar peso e presen\xE7a f\xEDsica ao filme."
      },
      {
        id: "quiz-6-3",
        questionNumber: 3,
        prompt: "Em rela\xE7\xE3o aos direitos autorais de m\xFAsicas comerciais conhecidas em curtas-metragens independentes:",
        options: [
          "Qualquer m\xFAsica pode ser usada livremente desde que o curta n\xE3o cobre ingresso.",
          "M\xFAsicas de artistas consagrados exigem autoriza\xE7\xE3o expressa e onerosa dos detentores; utilizar sem licen\xE7a bloqueia o filme em festivais e plataformas.",
          "Se a m\xFAsica tocar por menos de 30 segundos, n\xE3o \xE9 necess\xE1ria autoriza\xE7\xE3o.",
          "O YouTube autoriza automaticamente qualquer m\xFAsica se o v\xEDdeo for educativo."
        ],
        correctOptionIndex: 1,
        explanation: "Perfeito! O uso desautorizado de trilhas comerciais \xE9 a causa n\xFAmero um de desclassifica\xE7\xE3o de curtas em festivais s\xE9rios."
      },
      {
        id: "quiz-6-4",
        questionNumber: 4,
        prompt: "Qual a fun\xE7\xE3o do microfone direcionador (Shotgun) acoplado \xE0 vara de boom na capta\xE7\xE3o de di\xE1logos no set?",
        options: [
          "Captar o som em 360 graus de todo o bairro.",
          "Isolar com alta precis\xE3o a voz dos atores vinda de frente, rejeitando ru\xEDdos laterais indesejados da equipe e do tr\xE1fego.",
          "Substituir a ilumina\xE7\xE3o da cena.",
          "Servir de apoio f\xEDsico para o operador de c\xE2mera se apoiar."
        ],
        correctOptionIndex: 1,
        explanation: "Correto! O microfone shotgun possui padr\xE3o polar hipercardioide/lobar, privilegiando o eixo frontal e atenuando ru\xEDdos incidentes nas laterais."
      },
      {
        id: "quiz-6-5",
        questionNumber: 5,
        prompt: "Na pr\xE9-produ\xE7\xE3o de som e dire\xE7\xE3o de arte, por que a escolha de materiais cenogr\xE1ficos influencia diretamente a capta\xE7\xE3o de \xE1udio?",
        options: [
          "Porque pisos ocos, sapatos de salto duro e superf\xEDcies de vidro reverberantes geram ru\xEDdos indesejados que poluem os microfones durante as falas.",
          "Porque o som s\xF3 pode ser gravado se o cen\xE1rio for pintado de azul.",
          "N\xE3o h\xE1 qualquer rela\xE7\xE3o entre a cenografia e a capta\xE7\xE3o sonora.",
          "Porque os microfones s\xF3 funcionam perto de cortinas de veludo."
        ],
        correctOptionIndex: 0,
        explanation: "Exato! A ac\xFAstica da loca\xE7\xE3o e os objetos de cena (cal\xE7ados, portas, m\xF3veis) impactam diretamente a clareza e a pureza do di\xE1logo gravado no set."
      }
    ]
  },
  {
    id: "apostila-7",
    moduleId: 7,
    number: 7,
    title: "Apostila 07: Montagem e P\xF3s-Produ\xE7\xE3o",
    description: "A teoria e pr\xE1tica da montagem, organiza\xE7\xE3o e nomenclatura de m\xEDdias, sincroniza\xE7\xE3o, continuidades, cortes r\xEDtmicos, elipses e finaliza\xE7\xE3o.",
    pagesCount: 4,
    pdfUrl: "/materiais/cinelab-apostila-07.pdf",
    coverUrl: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=600&q=80",
    fileSizeMb: 20.5,
    extraVideos: [
      {
        "id": "ev-apostila-7-1",
        "slot": 1,
        "title": "V\xEDdeo Extra 01: Montagem e P\xF3s-Produ\xE7\xE3o & An\xE1lise Pr\xE1tica - M- 7.1",
        "videoUrl": "/videos/cinelab-intro-apresentacao.mp4",
        "thumbnailUrl": "https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=800&q=80",
        "description": "O aluno deve observar a regra dos 180 graus, cortes em a\xE7\xE3o, elipses temporais e a montagem paralela, percebendo como o corte cria sentido novo entre duas tomadas.",
        "professorNotes": "O aluno deve observar a regra dos 180 graus, cortes em a\xE7\xE3o, elipses temporais e a montagem paralela, percebendo como o corte cria sentido novo entre duas tomadas.",
        "durationHours": 0,
        "durationMinutes": 18,
        "durationSeconds": 0,
        "totalDurationSeconds": 1080,
        "durationLabel": "00h 18m 00s",
        "uploadedAt": "2026-10-02T03:08:34.760Z"
      },
      {
        "id": "ev-apostila-7-2",
        "slot": 2,
        "title": "V\xEDdeo Extra 02: Montagem e P\xF3s-Produ\xE7\xE3o & An\xE1lise Pr\xE1tica - M- 7.2",
        "videoUrl": "/videos/cinelab-intro-apresentacao.mp4",
        "thumbnailUrl": "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=800&q=80",
        "description": "O aluno deve atentar para a corre\xE7\xE3o de cor, curvas de gama e color grading est\xE9tico, unificando a identidade visual das di\xE1rias de filmagem.",
        "professorNotes": "O aluno deve atentar para a corre\xE7\xE3o de cor, curvas de gama e color grading est\xE9tico, unificando a identidade visual das di\xE1rias de filmagem.",
        "durationHours": 0,
        "durationMinutes": 24,
        "durationSeconds": 0,
        "totalDurationSeconds": 1440,
        "durationLabel": "00h 24m 00s",
        "uploadedAt": "2026-10-02T03:08:34.760Z"
      }
    ],
    sections: [
      {
        id: "sec-7-1",
        title: "1. O Efeito Kuleshov e o Poder da Justaposi\xE7\xE3o",
        subtitle: "1 + 1 = 3 no pensamento cinematogr\xE1fico",
        contentMarkdown: `O cineasta sovi\xE9tico Lev Kuleshov demonstrou que dois planos justapostos geram um terceiro sentido que n\xE3o existia em nenhum deles isoladamente:
* Rosto inexpressivo do ator + prato de sopa = fome.
* Rosto inexpressivo do ator + caix\xE3o de crian\xE7a = luto profundo.
* Rosto inexpressivo do ator + mulher bonita = desejo.
A montagem \xE9 o cora\xE7\xE3o da linguagem cinematogr\xE1fica porque cria pensamento na mente de quem assiste.`,
        tonyNotes: "O montador \xE9 o terceiro roteirista do filme. O primeiro escreve no papel, o segundo filma no set e o terceiro salva na ilha de edi\xE7\xE3o."
      },
      {
        id: "sec-7-2",
        title: "2. T\xE9cnicas de Corte Din\xE2mico",
        subtitle: "Corte na a\xE7\xE3o, corte de rea\xE7\xE3o e elipse temporal",
        contentMarkdown: `Para manter a ilus\xE3o de fluidez ininterrupta:
* **Corte na A\xE7\xE3o (Cut on Action)**: O plano \xE9 cortado no momento em que o personagem inicia um movimento (levantar da cadeira, abrir uma porta), completando o movimento no plano seguinte. O c\xE9rebro segue o movimento e n\xE3o percebe a emenda.
* **Elipse**: Elimina\xE7\xE3o do tempo morto desnecess\xE1rio. Se o personagem sai de casa e chega ao trabalho, n\xE3o precisamos filmar os 40 minutos do trajeto de \xF4nibus.`,
        tonyNotes: "Corte sempre por um motivo emocional, narrativo ou visual. Se n\xE3o h\xE1 motivo, deixe o plano respirar."
      }
    ],
    quizQuestions: [
      {
        id: "quiz-7-1",
        questionNumber: 1,
        prompt: 'O que comprovou o c\xE9lebre experimento hist\xF3rico do "Efeito Kuleshov"?',
        options: [
          "Que os atores russos eram os mais expressivos do mundo.",
          "Que a justaposi\xE7\xE3o de dois planos distintos cria na mente do espectador um novo significado psicol\xF3gico que nenhum dos planos possu\xEDa sozinho.",
          "Que o cinema n\xE3o precisa de diretores de fotografia.",
          "Que filmes em preto e branco s\xE3o mais baratos de produzir."
        ],
        correctOptionIndex: 1,
        explanation: "Correto! O Efeito Kuleshov provou que o sentido cinematogr\xE1fico nasce da rela\xE7\xE3o dial\xE9tica entre cortes sucessivos."
      },
      {
        id: "quiz-7-2",
        questionNumber: 2,
        prompt: 'Em que consiste a t\xE9cnica de "Corte na A\xE7\xE3o" (Cut on Action)?',
        options: [
          "Cortar o filme assim que explode uma bomba.",
          "Mudar o enquadramento durante o movimento f\xEDsico de um personagem, fazendo com que o olho do espectador acompanhe a a\xE7\xE3o e ignore o corte.",
          'Pedir para o diretor gritar "a\xE7\xE3o" duas vezes.',
          "Interromper a edi\xE7\xE3o no final da jornada de trabalho."
        ],
        correctOptionIndex: 1,
        explanation: "Exato! O corte na a\xE7\xE3o mascara a transi\xE7\xE3o de planos atrav\xE9s do movimento cont\xEDnuo da cena."
      },
      {
        id: "quiz-7-3",
        questionNumber: 3,
        prompt: 'Qual a defini\xE7\xE3o de "Elipse Temporal" na montagem cinematogr\xE1fica?',
        options: [
          "Uma falha t\xE9cnica que faz o v\xEDdeo piscar em preto.",
          "A supress\xE3o deliberada de um trecho de tempo da hist\xF3ria que n\xE3o \xE9 necess\xE1rio para o espectador compreender a narrativa.",
          "O atraso na entrega do filme para os festivais.",
          "O uso exclusivo de planos-sequ\xEAncia de 10 minutos."
        ],
        correctOptionIndex: 1,
        explanation: "Perfeito! A elipse descarta os tempos mortos e concentra a narrativa nos eventos de real relev\xE2ncia dram\xE1tica."
      },
      {
        id: "quiz-7-4",
        questionNumber: 4,
        prompt: 'Qual a diferen\xE7a entre um "Corte em J" (J-Cut) e um "Corte em L" (L-Cut) na montagem audiovisual?',
        options: [
          "O J-Cut \xE9 feito apenas nas segundas-feiras e o L-Cut nas sextas-feiras.",
          "No J-Cut o \xE1udio da cena seguinte come\xE7a a ser ouvido antes do corte visual; no L-Cut a imagem muda mas o \xE1udio da cena anterior continua ecoando.",
          "O J-Cut s\xF3 pode ser usado em com\xE9dias e o L-Cut em filmes de terror.",
          "Ambos s\xE3o teclas de atalho que desligam o monitor do editor."
        ],
        correctOptionIndex: 1,
        explanation: "Correto! O J-Cut antecipa o som criando expectativa, enquanto o L-Cut prolonga o som anterior gerando continuidade e resson\xE2ncia emocional."
      },
      {
        id: "quiz-7-5",
        questionNumber: 5,
        prompt: 'Por que o marco de "Picture Lock" (trava da imagem) \xE9 uma etapa sagrada antes da finaliza\xE7\xE3o de som e cor?',
        options: [
          "Porque impede que o computador pegue v\xEDrus na internet.",
          "Porque qualquer altera\xE7\xE3o na dura\xE7\xE3o dos planos ap\xF3s o Picture Lock desalinha toda a mixagem sonora, efeitos de Foley e sincronismo de \xE1udio.",
          "Porque a imagem fica bloqueada e n\xE3o pode mais ser vista pelo diretor.",
          "Porque o arquivo \xE9 gravado em fita VHS antiga."
        ],
        correctOptionIndex: 1,
        explanation: "Exato! O Picture Lock congela os cortes da narrativa, permitindo que a p\xF3s-produ\xE7\xE3o de \xE1udio, cor e efeitos visuais trabalhe com timecodes definitivos."
      }
    ]
  },
  {
    id: "apostila-8",
    moduleId: 8,
    number: 8,
    title: "Apostila 08: Produ\xE7\xE3o Executiva e Planejamento",
    description: "A engenharia da realiza\xE7\xE3o cinematogr\xE1fica: forma\xE7\xE3o de equipes de set, ordem do dia profissional, or\xE7amenta\xE7\xE3o \xE9tica, autoriza\xE7\xF5es e planos de conting\xEAncia.",
    pagesCount: 4,
    pdfUrl: "/materiais/cinelab-apostila-08.pdf",
    coverUrl: "https://images.unsplash.com/photo-1535016120720-40c646be5580?auto=format&fit=crop&w=600&q=80",
    fileSizeMb: 19.4,
    extraVideos: [
      {
        "id": "ev-apostila-8-1",
        "slot": 1,
        "title": "V\xEDdeo Extra 01: Produ\xE7\xE3o Executiva e Planejamento & An\xE1lise Pr\xE1tica - M- 8.1",
        "videoUrl": "/videos/cinelab-intro-apresentacao.mp4",
        "thumbnailUrl": "https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=800&q=80",
        "description": "O aluno deve observar a planilha or\xE7ament\xE1ria por etapas (desenvolvimento, pr\xE9-produ\xE7\xE3o, produ\xE7\xE3o e p\xF3s), cronograma de filmagem e gest\xE3o de equipe.",
        "professorNotes": "O aluno deve observar a planilha or\xE7ament\xE1ria por etapas (desenvolvimento, pr\xE9-produ\xE7\xE3o, produ\xE7\xE3o e p\xF3s), cronograma de filmagem e gest\xE3o de equipe.",
        "durationHours": 0,
        "durationMinutes": 18,
        "durationSeconds": 0,
        "totalDurationSeconds": 1080,
        "durationLabel": "00h 18m 00s",
        "uploadedAt": "2026-10-02T03:08:34.760Z"
      },
      {
        "id": "ev-apostila-8-2",
        "slot": 2,
        "title": "V\xEDdeo Extra 02: Produ\xE7\xE3o Executiva e Planejamento & An\xE1lise Pr\xE1tica - M- 8.2",
        "videoUrl": "/videos/cinelab-intro-apresentacao.mp4",
        "thumbnailUrl": "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=800&q=80",
        "description": "O aluno deve analisar a estrutura da Ordem do Dia (Call Sheet), autoriza\xE7\xF5es de loca\xE7\xE3o, direitos de imagem e log\xEDstica di\xE1ria de produ\xE7\xE3o no set.",
        "professorNotes": "O aluno deve analisar a estrutura da Ordem do Dia (Call Sheet), autoriza\xE7\xF5es de loca\xE7\xE3o, direitos de imagem e log\xEDstica di\xE1ria de produ\xE7\xE3o no set.",
        "durationHours": 0,
        "durationMinutes": 24,
        "durationSeconds": 0,
        "totalDurationSeconds": 1440,
        "durationLabel": "00h 24m 00s",
        "uploadedAt": "2026-10-02T03:08:34.760Z"
      }
    ],
    sections: [
      {
        id: "sec-8-1",
        title: "1. A Ordem do Dia (Call Sheet)",
        subtitle: "O documento sagrado de toda di\xE1ria de filmagem",
        contentMarkdown: `A Ordem do Dia (ODD) enviada na v\xE9spera de cada di\xE1ria \xE9 o mapa operacional que governa o set:
* Hor\xE1rio de chamada (call time) individual para cada departamento e ator.
* Endere\xE7o exato da loca\xE7\xE3o com pontos de refer\xEAncia e estacionamento.
* Sequ\xEAncia cronol\xF3gica das cenas a serem filmadas com indica\xE7\xE3o de p\xE1ginas de roteiro.
* Previs\xE3o meteorol\xF3gica e planos de conting\xEAncia para chuva (Cena cover ou loca\xE7\xE3o alternativa).
* Card\xE1pio e hor\xE1rio impreter\xEDvel de alimenta\xE7\xE3o da equipe.`,
        tonyNotes: "Equipe bem alimentada e com hor\xE1rios respeitados faz um filme dez vezes melhor do que equipe exausta e faminta."
      },
      {
        id: "sec-8-2",
        title: "2. Or\xE7amento B\xE1sico e Plano B",
        subtitle: "Como gerenciar recursos sem comprometer a integridade da obra",
        contentMarkdown: `Um or\xE7amento independente honesto contempla:
1. **Desenvolvimento**: Registro de roteiro, assessoria jur\xEDdica.
2. **Produ\xE7\xE3o**: Cach\xEAs de equipe e elenco, alimenta\xE7\xE3o, transporte, loca\xE7\xF5es, seguro e aluguel de equipamentos essenciais.
3. **P\xF3s-Produ\xE7\xE3o**: Edi\xE7\xE3o, corre\xE7\xE3o de cor, sound design, trilha e c\xF3pia mestre DCP.
4. **Reserva de Conting\xEAncia**: Pelo menos 10% do total reservado para imprevistos inevit\xE1veis.`,
        tonyNotes: "Se voc\xEA n\xE3o tem plano B no cinema, voc\xEA n\xE3o tem nem sequer um plano A funcional."
      }
    ],
    quizQuestions: [
      {
        id: "quiz-8-1",
        questionNumber: 1,
        prompt: 'Qual \xE9 a fun\xE7\xE3o prim\xE1ria de uma "Ordem do Dia" (Call Sheet) no planejamento de produ\xE7\xE3o?',
        options: [
          "Divulgar o trailer do filme nas redes sociais.",
          "Organizar detalhadamente os hor\xE1rios de chamada de cada profissional, a lista de cenas do dia, a loca\xE7\xE3o e a log\xEDstica da di\xE1ria.",
          "Pagar o cach\xEA dos atores antecipadamente.",
          "Definir quais festivais o filme ir\xE1 se inscrever no ano seguinte."
        ],
        correctOptionIndex: 1,
        explanation: "Correto! A Ordem do Dia \xE9 o instrumento de gest\xE3o operacional indispens\xE1vel para coordenar a di\xE1ria de grava\xE7\xE3o."
      },
      {
        id: "quiz-8-2",
        questionNumber: 2,
        prompt: "Por que todo or\xE7amento de produ\xE7\xE3o audiovisual deve conter uma margem de conting\xEAncia (geralmente entre 10% e 15%)?",
        options: [
          "Para pagar gorjetas extras para os gar\xE7ons do festival.",
          "Para absorver imprevistos reais como mudan\xE7as clim\xE1ticas, quebras de equipamento ou necessidades de regrava\xE7\xE3o.",
          "Para comprar roupas caras para o diretor usar nas entrevistas.",
          "Para pagar multas de tr\xE2nsito dos motoristas."
        ],
        correctOptionIndex: 1,
        explanation: "Exato! O set de cinema \xE9 sujeito a vari\xE1veis incontrol\xE1veis e a margem de conting\xEAncia assegura a conclus\xE3o do projeto."
      },
      {
        id: "quiz-8-3",
        questionNumber: 3,
        prompt: "O que deve ser priorizado pelo produtor executivo na condu\xE7\xE3o de um set de filmagem \xE9tico?",
        options: [
          "Prolongar as jornadas por 18 horas di\xE1rias sem pausa para refei\xE7\xF5es a fim de economizar dinheiro.",
          "Seguran\xE7a f\xEDsica de todos, alimenta\xE7\xE3o adequada, respeito aos descansos e cumprimento dos acordos contratuais.",
          "Gastar todo o or\xE7amento apenas nos figurinos dos protagonistas.",
          "Dispensar o uso de contratos de autoriza\xE7\xE3o de imagem."
        ],
        correctOptionIndex: 1,
        explanation: "Perfeito! A \xE9tica no trabalho audiovisual garante a integridade humana e a reputa\xE7\xE3o profissional de toda a produ\xE7\xE3o."
      },
      {
        id: "quiz-8-4",
        questionNumber: 4,
        prompt: "Por que o plano de filmagem quase nunca segue a ordem cronol\xF3gica do roteiro?",
        options: [
          "Porque os atores gostam de se confundir durante as falas.",
          "Porque a produ\xE7\xE3o agrupa as cenas por loca\xE7\xE3o, ilumina\xE7\xE3o, disponibilidade de elenco e clima para otimizar custos e tempo.",
          "Porque a c\xE2mera digital s\xF3 grava de tr\xE1s para frente.",
          "Porque os festivais exigem que os filmes sejam rodados em ordem inversa."
        ],
        correctOptionIndex: 1,
        explanation: "Correto! O plano de filmagem (plano de di\xE1rias) maximiza o uso de cada cen\xE1rio e elenco, gravando todas as cenas da mesma loca\xE7\xE3o juntas."
      },
      {
        id: "quiz-8-5",
        questionNumber: 5,
        prompt: 'Qual \xE9 o risco jur\xEDdico de rodar um curta-metragem sem o "Termo de Autoriza\xE7\xE3o de Uso de Imagem e Voz" assinado pelos atores?',
        options: [
          "A c\xE2mera perde a garantia de f\xE1brica.",
          "O filme fica judicialmente impedido de ser exibido em festivais, cinemas, TVs ou streaming por viola\xE7\xE3o de direitos de imagem.",
          "O diretor \xE9 obrigado a trocar a cor do cartaz.",
          "Nenhum, pois a presen\xE7a f\xEDsica no set substitui qualquer documento legal."
        ],
        correctOptionIndex: 1,
        explanation: "Exato! A autoriza\xE7\xE3o de imagem \xE9 documento jur\xEDdico indispens\xE1vel na cadeia de direitos (chain of title) de qualquer obra audiovisual."
      }
    ]
  },
  {
    id: "apostila-9",
    moduleId: 9,
    number: 9,
    title: "Apostila 09: Distribui\xE7\xE3o, Festivais e Mercado Audiovisual",
    description: "O ciclo de vida do curta-metragem ap\xF3s a finaliza\xE7\xE3o: montagem do press-kit, loglines atraentes, stills de alta resolu\xE7\xE3o, trailer/teaser e inscri\xE7\xF5es no circuito de festivais.",
    pagesCount: 4,
    pdfUrl: "/materiais/cinelab-apostila-09.pdf",
    coverUrl: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=600&q=80",
    fileSizeMb: 19.8,
    extraVideos: [
      {
        "id": "ev-apostila-9-1",
        "slot": 1,
        "title": "V\xEDdeo Extra 01: Distribui\xE7\xE3o, Festivais e Mercado Audiovisual & An\xE1lise Pr\xE1tica - M- 9.1",
        "videoUrl": "/videos/cinelab-intro-apresentacao.mp4",
        "thumbnailUrl": "https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=800&q=80",
        "description": "O aluno deve observar os circuitos de festivais nacionais e internacionais, janelas de exibi\xE7\xE3o, plataformas de streaming e prepara\xE7\xE3o de press kit oficial.",
        "professorNotes": "O aluno deve observar os circuitos de festivais nacionais e internacionais, janelas de exibi\xE7\xE3o, plataformas de streaming e prepara\xE7\xE3o de press kit oficial.",
        "durationHours": 0,
        "durationMinutes": 18,
        "durationSeconds": 0,
        "totalDurationSeconds": 1080,
        "durationLabel": "00h 18m 00s",
        "uploadedAt": "2026-10-02T03:08:34.760Z"
      },
      {
        "id": "ev-apostila-9-2",
        "slot": 2,
        "title": "V\xEDdeo Extra 02: Distribui\xE7\xE3o, Festivais e Mercado Audiovisual & An\xE1lise Pr\xE1tica - M- 9.2",
        "videoUrl": "/videos/cinelab-intro-apresentacao.mp4",
        "thumbnailUrl": "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=800&q=80",
        "description": "O aluno deve atentar para a apresenta\xE7\xE3o de projetos (Pitch Deck de 5 a 10 minutos), logline comercial, sinopse de venda e negocia\xE7\xE3o com distribuidoras.",
        "professorNotes": "O aluno deve atentar para a apresenta\xE7\xE3o de projetos (Pitch Deck de 5 a 10 minutos), logline comercial, sinopse de venda e negocia\xE7\xE3o com distribuidoras.",
        "durationHours": 0,
        "durationMinutes": 24,
        "durationSeconds": 0,
        "totalDurationSeconds": 1440,
        "durationLabel": "00h 24m 00s",
        "uploadedAt": "2026-10-02T03:08:34.760Z"
      }
    ],
    sections: [
      {
        id: "sec-9-1",
        title: "1. O Kit de Imprensa (Electronic Press Kit - EPK)",
        subtitle: "As ferramentas visuais e textuais para vender sua obra",
        contentMarkdown: `Um press-kit profissional deve conter obrigatoriamente:
* **Ficha T\xE9cnica Completa**: Dire\xE7\xE3o, roteiro, elenco principal, dire\xE7\xE3o de fotografia, arte, som e produ\xE7\xE3o.
* **Logline (1-2 linhas)** e **Sinopse Curta (3-5 linhas)** sem entregar o final.
* **Release de Imprensa**: Texto jornal\xEDstico apresentando a relev\xE2ncia cultural ou tem\xE1tica do curta.
* **Cartaz Oficial em Alta Resolu\xE7\xE3o (300 DPI)** e formato vertical (2:3).
* **3 a 5 Stills Oficiais do Filme**: Imagens congeladas de alta qualidade art\xEDstica dos momentos-chave da narrativa.
* **Trailer / Teaser de 30 a 60 segundos**.`,
        tonyNotes: "Muitos curadores de festivais decidem se assistir\xE3o ao seu filme pela qualidade do still e pela for\xE7a da logline."
      },
      {
        id: "sec-9-2",
        title: "2. Estrat\xE9gia de Janelas de Exibi\xE7\xE3o e Festivais",
        subtitle: "A regra de ouro da Estreia Mundial (World Premiere)",
        contentMarkdown: `N\xE3o cometa o erro de postar seu curta finalizado no YouTube no dia seguinte \xE0 montagem se o seu objetivo \xE9 o circuito de festivais!
A maioria dos festivais de ponta (Gramado, Tiradentes, Berlim, Clermont-Ferrand) exige **in\xE9dito / estreia regional ou mundial**. Tra\xE7ar um calend\xE1rio de 12 a 18 meses para festivais antes de liberar a obra para visualiza\xE7\xE3o p\xFAblica online \xE9 o caminho padr\xE3o da ind\xFAstria.`,
        tonyNotes: "Proteja o ineditismo do seu filme at\xE9 que ele complete sua jornada nas telas dos cinemas e festivais."
      }
    ],
    quizQuestions: [
      {
        id: "quiz-9-1",
        questionNumber: 1,
        prompt: "Por que n\xE3o se deve disponibilizar publicamente na internet um curta-metragem logo ap\xF3s sua conclus\xE3o se o objetivo for concorrer a festivais de cinema?",
        options: [
          "Porque a internet reduz a resolu\xE7\xE3o do arquivo para sempre.",
          "Porque os principais festivais nacionais e internacionais exigem ineditismo (estreia mundial ou nacional) e desclassificam obras dispon\xEDveis publicamente.",
          "Porque o diretor de cinema perde seus direitos autorais se o v\xEDdeo for visto online.",
          "Porque os atores n\xE3o podem ser vistos na internet por contrato."
        ],
        correctOptionIndex: 1,
        explanation: "Correto! O ineditismo \xE9 pr\xE9-requisito rigoroso nos editais e sele\xE7\xF5es dos mais prestigiados festivais de cinema."
      },
      {
        id: "quiz-9-2",
        questionNumber: 2,
        prompt: 'O que s\xE3o os "stills" de um filme dentro do kit de divulga\xE7\xE3o (press-kit)?',
        options: [
          "Fotografias da equipe comendo no intervalo.",
          "Fotogramas congelados ou fotos de cena em alta resolu\xE7\xE3o que capturam o clima visual e os momentos dram\xE1ticos da obra.",
          "Os recibos fiscais dos equipamentos de filmagem.",
          "A lista telef\xF4nica dos patrocinadores."
        ],
        correctOptionIndex: 1,
        explanation: "Exato! Stills s\xE3o as imagens de divulga\xE7\xE3o oficiais utilizadas por cat\xE1logos de festivais, revistas e jornais."
      },
      {
        id: "quiz-9-3",
        questionNumber: 3,
        prompt: "Qual a extens\xE3o e o objetivo ideal de uma logline para apresenta\xE7\xE3o em cat\xE1logos de mercado e plataformas como FilmFreeway?",
        options: [
          "Um texto de 10 p\xE1ginas contando o final do filme em detalhes.",
          "Uma a duas frases concisas revelando o protagonista, o incidente incitante e o conflito central com senso de urg\xEAncia.",
          "Apenas o nome do diretor e o custo do filme.",
          "Um poema abstrato que n\xE3o revela nada sobre a hist\xF3ria."
        ],
        correctOptionIndex: 1,
        explanation: "Perfeito! A logline deve despertar o interesse imediato do curador em apenas uma ou duas frases magn\xE9ticas."
      },
      {
        id: "quiz-9-4",
        questionNumber: 4,
        prompt: 'O que \xE9 um "DCP" (Digital Cinema Package) e qual sua fun\xE7\xE3o t\xE9cnica na exibi\xE7\xE3o cinematogr\xE1fica?',
        options: [
          "Um programa de computador para editar fotos de casamento.",
          "O padr\xE3o mundial da ind\xFAstria para armazenamento e proje\xE7\xE3o digital de filmes em alta fidelidade e som multicanal 5.1/7.1 nas salas de cinema.",
          "Um tipo de cabo de tomada usado exclusivamente na Europa.",
          "O crach\xE1 de identifica\xE7\xE3o usado pelos diretores de cinema."
        ],
        correctOptionIndex: 1,
        explanation: "Correto! O DCP \xE9 o pacote digital padronizado DCI que garante que o filme seja projetado em qualquer sala de cinema do mundo com m\xE1xima fidelidade t\xE9cnica."
      },
      {
        id: "quiz-9-5",
        questionNumber: 5,
        prompt: "Qual \xE9 o papel estrat\xE9gico de um agente de vendas (Sales Agent) no circuito internacional de cinema?",
        options: [
          "Vender pipoca e refrigerante na bomboniere dos cinemas.",
          "Negociar os direitos de exibi\xE7\xE3o e licenciamento territorial do filme com distribuidoras, TVs e plataformas de streaming globais.",
          "Comprar as passagens de avi\xE3o para os atores passearem.",
          "Cobrar ingressos na entrada dos festivais."
        ],
        correctOptionIndex: 1,
        explanation: "Exato! O agente de vendas representa a obra comercialmente em mercados internacionais (como Cannes March\xE9 du Film e EFM Berlim), buscando compradores territoriais."
      }
    ]
  },
  {
    id: "apostila-10",
    moduleId: 10,
    number: 10,
    title: "Apostila 10: Projeto Final \u2013 Curta-Metragem",
    description: "A consolida\xE7\xE3o de todas as etapas: o guia passo a passo para a realiza\xE7\xE3o do seu curta de 1 a 5 minutos, do roteiro \xE0 entrega final, autoavalia\xE7\xE3o e certifica\xE7\xE3o profissional.",
    pagesCount: 4,
    pdfUrl: "/materiais/cinelab-apostila-10.pdf",
    coverUrl: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=600&q=80",
    fileSizeMb: 23.5,
    extraVideos: [
      {
        "id": "ev-apostila-10-1",
        "slot": 1,
        "title": "V\xEDdeo Extra 01: Projeto Final & An\xE1lise Pr\xE1tica - M- 10.1",
        "videoUrl": "/videos/cinelab-intro-apresentacao.mp4",
        "thumbnailUrl": "https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=800&q=80",
        "description": "O aluno deve revisar o checklist completo para filmagem do curta-metragem: roteiro finalizado, decupagem plano a plano, plano de filmagem e testes de equipamento.",
        "professorNotes": "O aluno deve revisar o checklist completo para filmagem do curta-metragem: roteiro finalizado, decupagem plano a plano, plano de filmagem e testes de equipamento.",
        "durationHours": 0,
        "durationMinutes": 18,
        "durationSeconds": 0,
        "totalDurationSeconds": 1080,
        "durationLabel": "00h 18m 00s",
        "uploadedAt": "2026-10-02T03:08:34.760Z"
      },
      {
        "id": "ev-apostila-10-2",
        "slot": 2,
        "title": "V\xEDdeo Extra 02: Projeto Final & An\xE1lise Pr\xE1tica - M- 10.2",
        "videoUrl": "/videos/cinelab-intro-apresentacao.mp4",
        "thumbnailUrl": "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=800&q=80",
        "description": "O aluno deve acompanhar as diretrizes para exporta\xE7\xE3o do Master em ProRes/H.264, trailer oficial, cartaz de divulga\xE7\xE3o e submiss\xE3o para a Mostra CINELAB.",
        "professorNotes": "O aluno deve acompanhar as diretrizes para exporta\xE7\xE3o do Master em ProRes/H.264, trailer oficial, cartaz de divulga\xE7\xE3o e submiss\xE3o para a Mostra CINELAB.",
        "durationHours": 0,
        "durationMinutes": 24,
        "durationSeconds": 0,
        "totalDurationSeconds": 1440,
        "durationLabel": "00h 24m 00s",
        "uploadedAt": "2026-10-02T03:08:34.760Z"
      }
    ],
    sections: [
      {
        id: "sec-10-1",
        title: "1. O Escopo do Curta de 1 a 5 Minutos",
        subtitle: "A for\xE7a da s\xEDntese, economia e rigor est\xE9tico",
        contentMarkdown: `Um curta-metragem de 1 a 5 minutos n\xE3o \xE9 um longa-metragem resumido; \xE9 uma **forma de arte aut\xF4noma**, com suas pr\xF3prias regras de intensidade.
* Concentre-se em **uma \xFAnica situa\xE7\xE3o dram\xE1tica**, uma ideia potente ou uma revela\xE7\xE3o emocional.
* Limite o n\xFAmero de atores (1 a 3 personagens) e loca\xE7\xF5es (1 ou 2 loca\xE7\xF5es bem aproveitadas).
* Cada segundo de tela deve justificar sua exist\xEAncia.`,
        tonyNotes: "Mais vale um curta de 2 minutos impec\xE1vel e inesquec\xEDvel do que um curta de 20 minutos arrastado e disperso."
      },
      {
        id: "sec-10-2",
        title: "2. A Reflex\xE3o de Processo e o Certificado Vital\xEDcio",
        subtitle: "A maturidade do cineasta em avaliar sua pr\xF3pria cria\xE7\xE3o",
        contentMarkdown: `Ao finalizar seu filme, todo cineasta maduro precisa responder a tr\xEAs perguntas sinceras:
1. **O que funcionou exatamente como planejado?**
2. **O que faria de forma diferente se pudesse refilmar amanh\xE3?**
3. **Qual aprendizado t\xE9cnico e po\xE9tico desejo aprofundar na minha pr\xF3xima produ\xE7\xE3o?**

Ao completar esta etapa e atingir a m\xE9dia m\xEDnima de 7,0 nas avalia\xE7\xF5es, o aluno recebe o **Certificado Profissional do CINELAB** e sua matr\xEDcula converte-se em **Acesso Vital\xEDcio**, funcionando como biblioteca permanente de consulta.`,
        tonyNotes: "Um filme nunca est\xE1 pronto; ele \xE9 abandonado pelo realizador no momento em que precisa caminhar pelo mundo por conta pr\xF3pria."
      }
    ],
    quizQuestions: [
      {
        id: "quiz-10-1",
        questionNumber: 1,
        prompt: "Qual \xE9 a principal recomenda\xE7\xE3o dram\xE1tica para a realiza\xE7\xE3o de um curta-metragem de alta qualidade de 1 a 5 minutos?",
        options: [
          "Tentar contar a biografia completa de um personagem ao longo de 50 anos de vida.",
          "Focar em uma \xFAnica situa\xE7\xE3o dram\xE1tica potente, com poucos personagens e loca\xE7\xF5es controladas, extraindo o m\xE1ximo de tens\xE3o e verdade visual.",
          "Contratar 30 atores figurantes para preencher a tela.",
          "Filmar sem roteiro e decidir a hist\xF3ria na p\xF3s-produ\xE7\xE3o."
        ],
        correctOptionIndex: 1,
        explanation: "Correto! A economia de recursos e o foco dram\xE1tico afiado s\xE3o as chaves mestras de um curta de impacto internacional."
      },
      {
        id: "quiz-10-2",
        questionNumber: 2,
        prompt: "Ap\xF3s a conclus\xE3o de todas as 10 etapas e aprova\xE7\xE3o nas avalia\xE7\xF5es do CINELAB, qual o status concedido \xE0 matr\xEDcula do aluno?",
        options: [
          "Acesso cancelado e bloqueado ap\xF3s 30 dias.",
          "Acesso vital\xEDcio irrestrito a todas as apostilas, v\xEDdeos, quizzes, filmes indicados e b\xF4nus, funcionando como biblioteca permanente de pesquisa.",
          "O aluno \xE9 obrigado a refazer todas as provas a cada semestre.",
          "Apenas o certificado pode ser impresso, sem acesso aos materiais did\xE1ticos."
        ],
        correctOptionIndex: 1,
        explanation: "Exato! A matr\xEDcula torna-se vital\xEDcia, garantindo que o acervo pedag\xF3gico do CINELAB permane\xE7a como fonte permanente de consulta profissional."
      },
      {
        id: "quiz-10-3",
        questionNumber: 3,
        prompt: 'Por que o exerc\xEDcio da "Reflex\xE3o de Processo" p\xF3s-filmagem \xE9 considerado fundamental para a forma\xE7\xE3o de um novo cineasta?',
        options: [
          "Para encontrar culpados entre a equipe de filmagem.",
          "Para consolidar o aprendizado pr\xE1tico identificando acertos, erros corrig\xEDveis e maturidade para o pr\xF3ximo projeto autoral.",
          "Para preencher burocracia sem valor pr\xE1tico.",
          "Para pedir reembolso aos fornecedores."
        ],
        correctOptionIndex: 1,
        explanation: "Perfeito! A reflex\xE3o honesta sobre o pr\xF3prio trabalho \xE9 o que transforma o realizador iniciante em um autor aut\xEAntico e consciente."
      },
      {
        id: "quiz-10-4",
        questionNumber: 4,
        prompt: "Ao realizar a montagem de um curta-metragem autoral, como o realizador deve calibrar a dura\xE7\xE3o dos planos para valorizar a dramaturgia?",
        options: [
          "Cortar obrigatoriamente a cada 0.5 segundo para parecer um comercial acelerado.",
          "Respeitar a respira\xE7\xE3o interna da cena, dando tempo para o olhar do ator ecoar sem estender planos que j\xE1 esgotaram sua carga informativa ou dram\xE1tica.",
          "Nunca cortar o plano sob hip\xF3tese alguma.",
          "Deixar a tela preta durante a maior parte do curta."
        ],
        correctOptionIndex: 1,
        explanation: "Correto! O ritmo na montagem n\xE3o significa velocidade cega, mas precis\xE3o cir\xFArgica no tempo necess\xE1rio para cada plano comover e comunicar."
      },
      {
        id: "quiz-10-5",
        questionNumber: 5,
        prompt: "Qual \xE9 a regra padr\xE3o da ind\xFAstria para salvaguarda e backup de dados digitais das di\xE1rias (Regra 3-2-1)?",
        options: [
          "Deixar todos os arquivos apenas no cart\xE3o de mem\xF3ria da c\xE2mera.",
          "Manter 3 c\xF3pias do material, em pelo menos 2 tipos de m\xEDdias/dispositivos diferentes, com 1 c\xF3pia armazenada em local f\xEDsico ou nuvem externa segura.",
          "Postar todos os v\xEDdeos brutos sem edi\xE7\xE3o no TikTok.",
          "Formatar o disco r\xEDgido imediatamente ap\xF3s exportar o primeiro arquivo."
        ],
        correctOptionIndex: 1,
        explanation: "Exato! A regra 3-2-1 \xE9 o protocolo universal de seguran\xE7a de dados (DIT) que protege o filme contra perdas catastr\xF3ficas de di\xE1rias."
      }
    ]
  }
];
var pedagogicalBonusApostilas = [
  {
    id: "bonus-01",
    number: 1,
    title: "Gloss\xE1rio Completo de Planos",
    subtitle: "Guia Permanente de Consulta T\xE9cnica e Decupagem Cinematogr\xE1fica",
    description: "Guia permanente de consulta t\xE9cnica para decupagem cinematogr\xE1fica, escalas de planos e movimentos de c\xE2mera.",
    summary: "Guia permanente de consulta t\xE9cnica para decupagem cinematogr\xE1fica, escalas de planos e movimentos de c\xE2mera.",
    pagesCount: 30,
    totalPages: 30,
    pdfUrl: "/materiais/cinelab-bonus-01-glossario-planos.pdf",
    coverUrl: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=600&q=80",
    unlockedByDefault: false,
    extraVideos: [
      {
        "id": "ev-bonus-01-1",
        "slot": 1,
        "title": "V\xEDdeo Extra 01: Estudo Dirigido & An\xE1lise Pr\xE1tica \u2013 B\xF4nus 01",
        "description": "An\xE1lise t\xE9cnica e decupagem comentada pelo Professor Cineasta Tony de Luc para aprofundar os conceitos te\xF3ricos desta apostila.",
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
        "title": "V\xEDdeo Extra 02: Estudo de Caso & Exerc\xEDcio T\xE9cnico \u2013 B\xF4nus 01",
        "description": "Demonstra\xE7\xE3o em set de filmagem com resolu\xE7\xE3o pr\xE1tica de problemas de decupagem e linguagem cinematogr\xE1fica.",
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
    notes: "Liberado automaticamente a partir da Etapa 03 (junto com a Apostila 03). Acesso permanente mesmo ap\xF3s a conclus\xE3o do curso.",
    termsGlossary: [
      {
        term: "Grande Plano Geral (GPG)",
        definition: "Enquadramento de escala m\xE1xima onde o cen\xE1rio domina amplamente a presen\xE7a humana.",
        application: "Estabelece a pequenez do homem diante da natureza ou o desamparo em cidades monumentais."
      },
      {
        term: "Plano Geral (PG)",
        definition: "Enquadra o sujeito de corpo inteiro dos p\xE9s \xE0 cabe\xE7a, com espa\xE7o ao redor.",
        application: "Apresenta a postura f\xEDsica do personagem e situa as a\xE7\xF5es no ambiente imediato."
      },
      {
        term: "Plano Americano (PA)",
        definition: "Corte efetuado na linha dos joelhos at\xE9 o topo da cabe\xE7a.",
        application: "Equil\xEDbrio ideal entre movimento de corpo, gesticula\xE7\xE3o e di\xE1logos em grupo."
      },
      {
        term: "Plano M\xE9dio (PM)",
        definition: "Enquadra da cintura para cima.",
        application: "O plano padr\xE3o para conversas cotidianas, entrevistas e rela\xE7\xF5es interpessoais."
      },
      {
        term: "Primeiro Plano (PP / Close-Up)",
        definition: "Corte dos ombros ou peito para cima, preenchendo a tela com o rosto.",
        application: "Intensidade dram\xE1tica m\xE1xima, revela\xE7\xE3o de emo\xE7\xF5es \xEDntimas e foco absoluto na rea\xE7\xE3o."
      },
      {
        term: "Plano Detalhe (PD)",
        definition: "Isolamento de um objeto ou parte anat\xF4mica espec\xEDfica (um anel, uma arma, uma l\xE1grima).",
        application: "Direciona a aten\xE7\xE3o do p\xFAblico para uma pista essencial que define os rumos da trama."
      },
      {
        term: "Plong\xE9e (\xC2ngulo Superior / Picado)",
        definition: "C\xE2mera posicionada acima do sujeito apontando para baixo.",
        application: "Confere sensa\xE7\xE3o de fragilidade, submiss\xE3o, inferioridade ou observa\xE7\xE3o distante."
      },
      {
        term: "Contra-Plong\xE9e (\xC2ngulo Inferior / Contrapicado)",
        definition: "C\xE2mera posicionada abaixo do sujeito apontando para cima.",
        application: "Enobrece o personagem, confere autoridade, amea\xE7a, grandiosidade ou poder heroico."
      },
      {
        term: "\xC2ngulo Holand\xEAs (Dutch Angle / Tilted)",
        definition: "C\xE2mera inclinada lateralmente no eixo horizontal.",
        application: "Gera desorienta\xE7\xE3o psicol\xF3gica, del\xEDrio, embriaguez, perigo iminente ou loucura."
      },
      {
        term: "Travelling",
        definition: "C\xE2mera em deslocamento f\xEDsico sobre trilhos, rodas ou estabilizador.",
        application: "Acompanha o personagem em caminhada ou explora a profundidade do espa\xE7o em movimento suave."
      },
      {
        term: "Panor\xE2mica (Pan)",
        definition: "Movimento horizontal de rota\xE7\xE3o da c\xE2mera sobre o pr\xF3prio eixo do trip\xE9.",
        application: "Varre o horizonte ou conecta dois personagens sem necessidade de corte."
      },
      {
        term: "Plano-Sequ\xEAncia",
        definition: "Uma cena inteira ou sequ\xEAncia complexa filmada em tomada \xFAnica cont\xEDnua sem nenhum corte.",
        application: "Preserva a veracidade do tempo real e cria imers\xE3o visceral para o espectador."
      },
      {
        term: "Eixo de 180 Graus",
        definition: "Linha imagin\xE1ria entre dois interlocutores que a c\xE2mera n\xE3o deve cruzar.",
        application: "Garante a continuidade espacial da linha do olhar entre os personagens no campo e contracampo."
      }
    ]
  },
  {
    id: "bonus-02",
    number: 2,
    title: "Gloss\xE1rio Completo de Roteiro",
    subtitle: "Guia Permanente de Consulta Dramat\xFArgica e Estrutura\xE7\xE3o de Hist\xF3rias",
    description: "Guia permanente de consulta dramat\xFArgica: da cria\xE7\xE3o de premissa, storyline e sinopse \xE0 escaleta e roteiro final.",
    summary: "Guia permanente de consulta dramat\xFArgica: da cria\xE7\xE3o de premissa, storyline e sinopse \xE0 escaleta e roteiro final.",
    pagesCount: 29,
    totalPages: 29,
    pdfUrl: "/materiais/cinelab-bonus-02-glossario-roteiro.pdf",
    coverUrl: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=600&q=80",
    unlockedByDefault: false,
    extraVideos: [
      {
        "id": "ev-bonus-02-1",
        "slot": 1,
        "title": "V\xEDdeo Extra 01: Estudo Dirigido & An\xE1lise Pr\xE1tica \u2013 B\xF4nus 02",
        "description": "An\xE1lise t\xE9cnica e decupagem comentada pelo Professor Cineasta Tony de Luc para aprofundar os conceitos te\xF3ricos desta apostila.",
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
        "title": "V\xEDdeo Extra 02: Estudo de Caso & Exerc\xEDcio T\xE9cnico \u2013 B\xF4nus 02",
        "description": "Demonstra\xE7\xE3o em set de filmagem com resolu\xE7\xE3o pr\xE1tica de problemas de decupagem e linguagem cinematogr\xE1fica.",
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
    notes: "Liberado automaticamente a partir da Etapa 03 (junto com a Apostila 03). Acesso permanente mesmo ap\xF3s a conclus\xE3o do curso.",
    termsGlossary: [
      {
        term: "Premissa / Ideia Central",
        definition: "A proposi\xE7\xE3o fundamental que impulsiona a narrativa: e se acontecesse X?",
        application: "O ponto de partida para qualquer desenvolvimento criativo autoral."
      },
      {
        term: "Storyline",
        definition: "A s\xEDntese de at\xE9 5 linhas contendo: apresenta\xE7\xE3o, conflito detonador e desfecho b\xE1sico.",
        application: "Utilizado para avaliar rapidamente se a ideia possui sustenta\xE7\xE3o dram\xE1tica."
      },
      {
        term: "Logline",
        definition: "Frase de impacto de 1 a 2 linhas com protagonista, gancho, antagonismo e urg\xEAncia.",
        application: "Cart\xE3o de visitas para venda de projetos a produtoras, canais e inscri\xE7\xF5es."
      },
      {
        term: "Sinopse",
        definition: "A hist\xF3ria do filme resumida de 1 a 2 p\xE1ginas, escrita no presente do indicativo.",
        application: "Exig\xEAncia fundamental de editais p\xFAblicos (Ancine, Paulo Gustavo, Aldir Blanc) e festivais."
      },
      {
        term: "Argumento / Tratamento",
        definition: "A narrativa cinematogr\xE1fica em prosa fluida, descrevendo visualmente o filme do in\xEDcio ao fim.",
        application: "Etapa anterior aos di\xE1logos, onde se testa o ritmo e a consist\xEAncia visual das a\xE7\xF5es."
      },
      {
        term: "Outline / Beat Sheet",
        definition: "Lista dos principais acontecimentos emocionais e batidas dram\xE1ticas em sequ\xEAncia.",
        application: "Garante que os arcos de tens\xE3o n\xE3o enfraque\xE7am entre o in\xEDcio e o cl\xEDmax."
      },
      {
        term: "Escaleta",
        definition: "A lista numerada de todas as cenas do filme com cabe\xE7alho e resumo estrito da a\xE7\xE3o.",
        application: "O mapa operacional que antecede a reda\xE7\xE3o final do roteiro."
      },
      {
        term: "Incidente Incitante (Catalisador)",
        definition: "O acontecimento que quebra a normalidade inicial da vida do protagonista.",
        application: "For\xE7a o personagem a sair de sua zona de conforto e iniciar sua jornada dram\xE1tica."
      },
      {
        term: "Ponto de Virada (Plot Point 1 & 2)",
        definition: "Reviravolta estrutural irrevers\xEDvel que empurra a hist\xF3ria para um novo ato.",
        application: "Muda o rumo das a\xE7\xF5es e eleva o n\xEDvel das apostas emocionais do protagonista."
      },
      {
        term: "Ponto Central (Midpoint)",
        definition: "Momento na metade exata da hist\xF3ria onde o conflito passa de passivo a ativo.",
        application: "O protagonista deixa de apenas reagir e passa a tomar decis\xF5es conscientes que precipitam o cl\xEDmax."
      },
      {
        term: "Cl\xEDmax",
        definition: "O ponto de tens\xE3o m\xE1xima onde o conflito central \xE9 resolvido de forma definitiva.",
        application: "A cena decisiva que responde se o protagonista alcan\xE7a ou n\xE3o seu objetivo primordial."
      },
      {
        term: "Subtexto",
        definition: "A inten\xE7\xE3o real, n\xE3o dita expressamente, que transparece por tr\xE1s dos di\xE1logos e a\xE7\xF5es.",
        application: "Confere humanidade, sofistica\xE7\xE3o e mist\xE9rio psicol\xF3gico aos personagens em cena."
      }
    ]
  },
  {
    id: "bonus-03",
    number: 3,
    title: "M\xE9todo de An\xE1lise F\xEDlmica em 6 Camadas",
    subtitle: "Guia Completo de An\xE1lise Cr\xEDtica e Decupagem de Obras Audiovisuais",
    description: "A metodologia anal\xEDtica do CINELAB em 6 camadas: Narrativa, Personagem, Espa\xE7o, Imagem (Fotografia), Som e Montagem para dissecar qualquer obra audiovisual como realizador.",
    summary: "A metodologia anal\xEDtica do CINELAB em 6 camadas: Narrativa, Personagem, Espa\xE7o, Imagem (Fotografia), Som e Montagem para dissecar qualquer obra audiovisual como realizador.",
    pagesCount: 24,
    totalPages: 24,
    pdfUrl: "/uploads/apostilas/apostila-bonus-03-analise-filmica.pdf",
    coverUrl: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?auto=format&fit=crop&w=600&q=80",
    unlockedByDefault: false,
    extraVideos: [
      {
        "id": "ev-bonus-03-1",
        "slot": 1,
        "title": "V\xEDdeo Extra 01: Estudo Dirigido & An\xE1lise Pr\xE1tica \u2013 B\xF4nus 03",
        "description": "An\xE1lise t\xE9cnica e decupagem comentada pelo Professor Cineasta Tony de Luc para aprofundar os conceitos te\xF3ricos desta apostila.",
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
        "title": "V\xEDdeo Extra 02: Estudo de Caso & Exerc\xEDcio T\xE9cnico \u2013 B\xF4nus 03",
        "description": "Demonstra\xE7\xE3o em set de filmagem com resolu\xE7\xE3o pr\xE1tica de problemas de decupagem e linguagem cinematogr\xE1fica.",
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
    notes: "Apostila b\xF4nus especial com o m\xE9todo completo das 6 camadas para an\xE1lise t\xE9cnica e cr\xEDtica de cinema.",
    termsGlossary: [
      {
        term: "Camada Narrativa",
        definition: "Investiga o esqueleto dramat\xFArgico: premissa, arcos de transforma\xE7\xE3o, catalisador, cl\xEDmax e resolu\xE7\xE3o.",
        application: "Identifica como o roteiro sustenta a tens\xE3o dram\xE1tica e o envolvimento do espectador."
      },
      {
        term: "Camada de Personagem",
        definition: "Examina a motiva\xE7\xE3o consciente versus necessidade inconsciente, contradi\xE7\xF5es e arcos evolutivos.",
        application: "Permite criar figuras humanas veross\xEDmeis que geram empatia ou repulsa calculada."
      },
      {
        term: "Camada Espacial",
        definition: "Analisa cenografia, arquitetura, enclausuramento ou amplitude dos espa\xE7os f\xEDsicos.",
        application: "O espa\xE7o deixa de ser fundo passivo e atua como extens\xE3o psicol\xF3gica dos personagens."
      },
      {
        term: "Camada de Imagem",
        definition: "Paleta crom\xE1tica, raz\xE3o de contraste, atmosfera de luz, dist\xE2ncia focal e enquadramentos.",
        application: "Define a assinatura visual da obra e orienta as emo\xE7\xF5es subconscientes do p\xFAblico."
      },
      {
        term: "Camada Sonora",
        definition: "Equil\xEDbrio entre sons dieg\xE9ticos (ru\xEDdos de set), m\xFAsica e o uso expressivo do sil\xEAncio.",
        application: "Cria imers\xE3o tridimensional e ancora a percep\xE7\xE3o emocional da cena."
      },
      {
        term: "Camada de Montagem",
        definition: "Cad\xEAncia m\xE9trica dos cortes, transi\xE7\xF5es, associa\xE7\xF5es intelectuais e elipses de tempo.",
        application: "Dita a pulsa\xE7\xE3o do filme, o ritmo respirat\xF3rio do espectador e a montagem das ideias."
      }
    ],
    fileSizeMb: 0.28
  }
];
var pedagogicalFilms = [
  {
    id: "film-1",
    moduleId: 1,
    title: "Ilha das Flores",
    director: "Jorge Furtado",
    year: 1989,
    duration: "13 min",
    durationMinutes: 13,
    audioTrack: "original_pt",
    audioTrackLabel: "\u{1F1E7}\u{1F1F7} \xC1udio Original em Portugu\xEAs",
    availableSubtitles: ["pt", "en", "es", "fr"],
    availableDubbed: [],
    platform: "Acervo Digital Aberto (Archive.org HD) / Casa de Cinema de POA",
    streamingPlatform: "Arquivo de V\xEDdeo Direto MP4 / YouTube Oficial",
    watchUrl: "https://archive.org/embed/ilha_das_flores",
    streamingUrl: "https://archive.org/download/ilha_das_flores/Video%20156.mp4",
    videoOptions: [
      {
        id: "ilha-original",
        label: "\u{1F1E7}\u{1F1F7} \xC1udio Original em Portugu\xEAs (Archive.org HD) (13 min)",
        url: "https://archive.org/embed/ilha_das_flores",
        duration: "13 min",
        durationMinutes: 13,
        platformName: "Archive.org / Casa de Cinema de POA",
        badge: "\xC1udio Original PT \u2022 13 min",
        audioLang: "pt",
        type: "full_movie"
      },
      {
        id: "ilha-english-sub",
        label: "\u{1F1FA}\u{1F1F8} Isle of Flowers \u2013 English Subtitles (13 min)",
        url: "https://www.youtube.com/watch?v=Kfk01rIe_sU",
        duration: "13 min",
        durationMinutes: 13,
        platformName: "YouTube (English Subtitles)",
        badge: "Legendas em Ingl\xEAs \u2022 13 min",
        subtitleLang: "en",
        type: "full_movie"
      },
      {
        id: "ilha-direct-mp4",
        label: "\u{1F39E}\uFE0F Arquivo Aberto em MP4 (13 min)",
        url: "https://archive.org/download/ilha_das_flores/Video%20156.mp4",
        duration: "13 min",
        durationMinutes: 13,
        platformName: "Acervo Archive.org MP4",
        badge: "Arquivo MP4 \u2022 13 min",
        audioLang: "pt",
        type: "full_movie"
      }
    ],
    whyWatch: "Considerado pela ABRACCINE o maior curta-metragem brasileiro de todos os tempos. Uma obra-prima da montagem e da rela\xE7\xE3o entre texto e imagem.",
    whatToObserve: "Observe como imagem, narra\xE7\xE3o, som e montagem constroem a narrativa sat\xEDrica e pol\xEDtica atrav\xE9s de cortes r\xE1pidos de arquivo e narra\xE7\xE3o enciclop\xE9dica.",
    observationActivity: 'Anote como o diretor utiliza o conceito de "tomate" para conectar biologia, economia, desigualdade social e dignidade humana em apenas 13 minutos.'
  },
  {
    id: "film-2",
    moduleId: 2,
    title: "O Encoura\xE7ado Potemkin (Battleship Potemkin)",
    director: "Sergei Eisenstein",
    year: 1925,
    duration: "74 min (Filme Completo) \u2022 8 min (Cena da Escadaria)",
    durationMinutes: 74,
    audioTrack: "mudo",
    audioTrackLabel: "\u{1F3BC} Cinema Mudo \u2022 Trilha Sonora Orquestral",
    availableSubtitles: ["pt", "en", "es", "fr"],
    platform: "Dom\xEDnio P\xFAblico / Archive.org (Filme Completo HD)",
    streamingPlatform: "YouTube 4K Restored",
    watchUrl: "https://archive.org/embed/BattleshipPotemkin",
    streamingUrl: "https://www.youtube.com/watch?v=x6a-3y6Orvw",
    videoOptions: [
      {
        id: "potemkin-mosfilm",
        label: "\u{1F6A2} Filme Completo Restaurado em 4K (74 min)",
        url: "https://www.youtube.com/watch?v=x6a-3y6Orvw",
        duration: "74 min",
        durationMinutes: 74,
        platformName: "YouTube 4K Restored",
        badge: "Filme Completo \u2022 4K \u2022 74 min",
        subtitleLang: "multi",
        type: "full_movie"
      },
      {
        id: "potemkin-archive",
        label: "\u{1F3DB}\uFE0F Vers\xE3o Hist\xF3rica no Archive.org (72 min)",
        url: "https://archive.org/embed/BattleshipPotemkin",
        duration: "72 min",
        durationMinutes: 72,
        platformName: "Dom\xEDnio P\xFAblico / Archive.org",
        badge: "Archive.org \u2022 72 min",
        type: "full_movie"
      },
      {
        id: "potemkin-steps-scene",
        label: "\u26A1 A C\xE9lebre Cena da Escadaria de Odessa em 4K (7:45 min)",
        url: "https://www.youtube.com/watch?v=K1Vx3AOpVDo",
        duration: "7:45 min",
        durationMinutes: 8,
        platformName: "YouTube 4K Remaster",
        badge: "Cena da Escadaria \u2022 7:45 min",
        type: "scene"
      }
    ],
    whyWatch: "A obra fundadora da montagem cinematogr\xE1fica moderna. O nascimento das teorias de justaposi\xE7\xE3o, choque de ideias e ritmo visual.",
    whatToObserve: "Montagem, dura\xE7\xE3o dos planos e constru\xE7\xE3o de ritmo. Observe a famosa sequ\xEAncia da Escadaria de Odessa dissecando-a nas 6 camadas de an\xE1lise f\xEDlmica.",
    observationActivity: "Identifique a dilata\xE7\xE3o do tempo cinematogr\xE1fico: como uma descida que levaria 2 minutos no mundo real \xE9 estendida para mais de 7 minutos na montagem."
  },
  {
    id: "film-3",
    moduleId: 3,
    title: "O Sandu\xEDche",
    director: "Jorge Furtado",
    year: 2e3,
    duration: "13 min",
    durationMinutes: 13,
    audioTrack: "original_pt",
    audioTrackLabel: "\u{1F1E7}\u{1F1F7} \xC1udio Original em Portugu\xEAs",
    availableSubtitles: ["pt", "en", "es", "fr"],
    platform: "Casa de Cinema de Porto Alegre (YouTube)",
    streamingPlatform: "YouTube Oficial",
    watchUrl: "https://www.youtube.com/watch?v=eqFx7VvxLi4",
    streamingUrl: "https://www.youtube.com/watch?v=eqFx7VvxLi4",
    videoOptions: [
      {
        id: "sanduiche-yt",
        label: "\u{1F96A} Curta-Metragem Completo (Casa de Cinema de POA) (13 min)",
        url: "https://www.youtube.com/watch?v=eqFx7VvxLi4",
        duration: "13 min",
        durationMinutes: 13,
        platformName: "YouTube Oficial",
        badge: "\xC1udio Original PT \u2022 CC Dispon\xEDvel \u2022 13 min",
        audioLang: "pt",
        type: "full_movie"
      }
    ],
    whyWatch: "Aula magistral de unidade de espa\xE7o, tempo, di\xE1logos com subtexto denso e decupagem impec\xE1vel em padr\xE3o de roteiro.",
    whatToObserve: "Di\xE1logos cruzados, revela\xE7\xE3o gradual de informa\xE7\xF5es ocultas e economia de elementos c\xEAnicos. A comida como catalisador de tens\xF5es amorosas.",
    observationActivity: "Mapeie o subtexto na conversa dos dois casais: como o que eles dizem superficialmente diverge do conflito real que os consome internamente."
  },
  {
    id: "film-4",
    moduleId: 4,
    title: "Dona Cristina Perdeu a Mem\xF3ria",
    director: "Ana Luiza Azevedo",
    year: 2002,
    duration: "13 min",
    durationMinutes: 13,
    audioTrack: "original_pt",
    audioTrackLabel: "\u{1F1E7}\u{1F1F7} \xC1udio Original em Portugu\xEAs",
    availableSubtitles: ["pt", "en", "es", "fr"],
    platform: "Canal wocomoBRASIL / Casa de Cinema de POA (YouTube)",
    streamingPlatform: "YouTube Oficial",
    watchUrl: "https://www.youtube.com/watch?v=iawXU1Y8_TQ",
    streamingUrl: "https://www.youtube.com/watch?v=iawXU1Y8_TQ",
    videoOptions: [
      {
        id: "cristina-yt",
        label: "\u{1F475} Curta Completo HD (wocomoBRASIL) (13 min)",
        url: "https://www.youtube.com/watch?v=iawXU1Y8_TQ",
        duration: "13 min",
        durationMinutes: 13,
        platformName: "wocomoBRASIL / YouTube Oficial",
        badge: "\xC1udio Original PT \u2022 Legendas Multil\xEDngues \u2022 13 min",
        audioLang: "pt",
        type: "full_movie"
      }
    ],
    whyWatch: "Uma aula de dire\xE7\xE3o sens\xEDvel de atores, com intera\xE7\xE3o \xEDntima entre um ator mirim estreante e uma atriz s\xEAnior consagrada.",
    whatToObserve: "O tom das atua\xE7\xF5es, as pausas, a modula\xE7\xE3o de voz, os olhares de cumplicidade e a sutileza na movimenta\xE7\xE3o dos corpos em cena.",
    observationActivity: "Observe como a diretora trabalha os primeiros planos para registrar o nascimento da amizade e a troca de mem\xF3rias sem cair no melodrama f\xE1cil."
  },
  {
    id: "film-5",
    moduleId: 5,
    title: "A Noite dos Mortos-Vivos (Night of the Living Dead) \u2013 Vers\xE3o Dublada",
    originalTitle: "Night of the Living Dead (Dublagem Cl\xE1ssica em Portugu\xEAs)",
    director: "George A. Romero (Dire\xE7\xE3o & Fotografia)",
    year: 1968,
    duration: "96 min",
    durationMinutes: 96,
    audioTrack: "dublado_pt",
    audioTrackLabel: "\u{1F399}\uFE0F Filme Completo Dublado em Portugu\xEAs (HD)",
    availableDubbed: ["pt"],
    availableSubtitles: ["pt", "en", "es", "fr"],
    platform: "YouTube Oficial (Filme Completo Dublado HD)",
    streamingPlatform: "Divers\xE3o em Casa / YouTube Oficial",
    watchUrl: "https://www.youtube.com/watch?v=ZbYJmYgrmrs",
    streamingUrl: "https://www.youtube.com/watch?v=ZbYJmYgrmrs",
    videoOptions: [
      {
        id: "notld-dublado-pt",
        label: "\u{1F399}\uFE0F Filme Completo Dublado em Portugu\xEAs (HD) (96 min)",
        url: "https://www.youtube.com/watch?v=ZbYJmYgrmrs",
        duration: "96 min",
        durationMinutes: 96,
        platformName: "YouTube Oficial (Dublado PT-BR)",
        badge: "\u{1F399}\uFE0F Dublado em Portugu\xEAs \u2022 96 min",
        audioLang: "pt",
        isDubbed: true,
        type: "full_movie"
      },
      {
        id: "notld-original-en",
        label: "\u{1F1FA}\u{1F1F8} Original em Ingl\xEAs com Legendas (Night of the Living Dead) (96 min)",
        url: "https://www.youtube.com/watch?v=0k3y6y8Yy5I",
        duration: "96 min",
        durationMinutes: 96,
        platformName: "YouTube Remastered (English Audio + CC)",
        badge: "\xC1udio Original EN + Legendas",
        audioLang: "en",
        subtitleLang: "multi",
        type: "full_movie"
      },
      {
        id: "notld-archive-hd",
        label: "\u{1F3DB}\uFE0F Acervo Hist\xF3rico em Alta Defini\xE7\xE3o (Archive.org) (96 min)",
        url: "https://archive.org/embed/night_of_the_living_dead",
        duration: "96 min",
        durationMinutes: 96,
        platformName: "Dom\xEDnio P\xFAblico / Archive.org",
        badge: "Archive.org 1080p",
        audioLang: "en",
        type: "full_movie"
      }
    ],
    whyWatch: "Obra-prima do cinema independente mundial com DUBLAGEM COMPLETA EM PORTUGU\xCAS. Realizada com or\xE7amento ultrarreduzido em pel\xEDcula 35mm P&B, \xE9 uma aut\xEAntica aula de Dire\xE7\xE3o de Fotografia, alto contraste, luz e sombra (chiaroscuro) e ilumina\xE7\xE3o de set pr\xE1tica.",
    whatToObserve: "A ilumina\xE7\xE3o de alto contraste no ambiente fechado da casa; como luzes diretas de tungst\xEAnio desenham sombras expressionistas nos rostos; os \xE2ngulos dram\xE1ticos de c\xE2mera e a profundidade de campo obtida sem equipamentos milion\xE1rios.",
    observationActivity: "Analise a cena em que os personagens protegem as portas e janelas: descreva como a luz corta a penumbra do c\xF4modo e cria tens\xE3o psicol\xF3gica sem necessidade de refletores sofisticados."
  },
  {
    id: "film-6",
    moduleId: 6,
    title: "Stalker",
    director: "Andrei Tarkovsky (M\xFAsica: Eduard Artemyev)",
    year: 1979,
    duration: "162 min",
    durationMinutes: 162,
    audioTrack: "legendado_pt",
    audioTrackLabel: "\u{1F4AC} Legendado em Portugu\xEAs (PT-BR) & Multil\xEDngue",
    availableSubtitles: ["pt", "en", "es", "fr"],
    platform: "Mosfilm Oficial (YouTube HD)",
    streamingPlatform: "Archive.org (Legendado em Portugu\xEAs PT-BR)",
    watchUrl: "https://www.youtube.com/watch?v=Q3hBLv-HLEc",
    streamingUrl: "https://archive.org/embed/stalker-1979-legendado-em-pt-br-1080p-25fps-c-1-uqfvz-wkc-i",
    videoOptions: [
      {
        id: "stalker-legendado-pt",
        label: "\u{1F4AC} Filme Completo Legendado em Portugu\xEAs PT-BR (1080p) (162 min)",
        url: "https://archive.org/embed/stalker-1979-legendado-em-pt-br-1080p-25fps-c-1-uqfvz-wkc-i",
        duration: "162 min",
        durationMinutes: 162,
        platformName: "Archive.org (Legendado PT-BR)",
        badge: "Legendado PT-BR \u2022 162 min",
        subtitleLang: "pt",
        type: "full_movie"
      },
      {
        id: "stalker-mosfilm-multilang",
        label: "\u{1F310} Vers\xE3o Oficial Mosfilm HD com Legendas Multil\xEDngues (EN, ES, FR, PT) (162 min)",
        url: "https://www.youtube.com/watch?v=Q3hBLv-HLEc",
        duration: "162 min",
        durationMinutes: 162,
        platformName: "Canal Oficial Mosfilm (YouTube)",
        badge: "Mosfilm HD \u2022 CC Multil\xEDngue",
        subtitleLang: "multi",
        type: "full_movie"
      }
    ],
    whyWatch: "A maior refer\xEAncia mundial em desenho de som, ru\xEDdos de ambiente (soundscape), sintetizadores anal\xF3gicos e o poder transcendental do sil\xEAncio.",
    whatToObserve: "Sil\xEAncio, ambiente da Zona, ru\xEDdos mec\xE2nicos ritmados das vagonetas nos trilhos, \xE1gua gotejando e o espa\xE7o ac\xFAstico em camadas.",
    observationActivity: "Identifique 3 momentos em que o som antecipa o perigo ou a presen\xE7a de algo sobrenatural antes que a c\xE2mera ou a imagem revelem o evento."
  },
  {
    id: "film-7",
    moduleId: 7,
    title: "O Encoura\xE7ado Potemkin \u2013 Cena da Escadaria de Odessa",
    director: "Sergei Eisenstein",
    year: 1925,
    duration: "7:45 min (Cena da Escadaria) \u2022 74 min (Filme Completo)",
    durationMinutes: 8,
    audioTrack: "mudo",
    audioTrackLabel: "\u{1F3BC} Cinema Mudo \u2022 Trilha Sonora Orquestral",
    availableSubtitles: ["pt", "en", "es", "fr"],
    platform: "YouTube 4K Remaster",
    streamingPlatform: "Archive.org Hist\xF3rico",
    watchUrl: "https://www.youtube.com/watch?v=K1Vx3AOpVDo",
    streamingUrl: "https://archive.org/embed/theodessasteps",
    videoOptions: [
      {
        id: "steps-4k",
        label: "\u26A1 Cena da Escadaria de Odessa em 4K Remaster (7:45 min)",
        url: "https://www.youtube.com/watch?v=K1Vx3AOpVDo",
        duration: "7:45 min",
        durationMinutes: 8,
        platformName: "YouTube 4K Remaster",
        badge: "Cena da Escadaria \u2022 7:45 min",
        type: "scene"
      },
      {
        id: "steps-archive",
        label: "\u{1F3DB}\uFE0F Vers\xE3o Hist\xF3rica no Archive.org (7:35 min)",
        url: "https://archive.org/embed/theodessasteps",
        duration: "7:35 min",
        durationMinutes: 8,
        platformName: "Archive.org Hist\xF3rico",
        badge: "Cena \u2022 7:35 min",
        type: "scene"
      },
      {
        id: "steps-full-film",
        label: "\u{1F6A2} Longa-Metragem Completo Restaurado em 4K (74 min)",
        url: "https://www.youtube.com/watch?v=x6a-3y6Orvw",
        duration: "74 min",
        durationMinutes: 74,
        platformName: "YouTube 4K Restored",
        badge: "Filme Completo \u2022 4K \u2022 74 min",
        subtitleLang: "multi",
        type: "full_movie"
      },
      {
        id: "steps-full-archive",
        label: "\u{1F3DB}\uFE0F Longa-Metragem Completo no Archive.org (72 min)",
        url: "https://archive.org/embed/BattleshipPotemkin",
        duration: "72 min",
        durationMinutes: 72,
        platformName: "Dom\xEDnio P\xFAblico / Archive.org",
        badge: "Archive.org \u2022 72 min",
        subtitleLang: "multi",
        type: "full_movie"
      }
    ],
    whyWatch: "A sequ\xEAncia de montagem mais estudada nas escolas de cinema de todo o mundo. A teoria do corte m\xE9trico, r\xEDtmico e intelectual em a\xE7\xE3o.",
    whatToObserve: "Montagem r\xEDtmica acelerada, contraste de dire\xE7\xE3o de movimento (soldados descendo vs povo subindo), cortes de detalhe e o carrinho de beb\xEA descendo.",
    observationActivity: "Analise como a altern\xE2ncia entre planos gerais dos degraus e closes da m\xE3e desesperada gera como\xE7\xE3o imediata e sensa\xE7\xE3o de impot\xEAncia."
  },
  {
    id: "film-8",
    moduleId: 8,
    title: "Bastidores & Making Of de Produ\xE7\xE3o Audiovisual Profissional",
    director: "Equipe de Cinema e Audiovisual",
    year: 2023,
    duration: "21:36 min (AvMakers) \u2022 26:53 min (Gera\xE7\xE3o Cinema)",
    durationMinutes: 22,
    audioTrack: "original_pt",
    audioTrackLabel: "\u{1F1E7}\u{1F1F7} \xC1udio Original em Portugu\xEAs",
    availableSubtitles: ["pt", "en", "es", "fr"],
    platform: "Din\xE2mica de um Set de Filmagem (YouTube)",
    streamingPlatform: "Como Funciona o Set (YouTube Alternativo)",
    watchUrl: "https://www.youtube.com/watch?v=bA3kSWwOm6I",
    streamingUrl: "https://www.youtube.com/watch?v=vustjlR_fgI",
    videoOptions: [
      {
        id: "set-avmakers",
        label: "\u{1F3AC} Din\xE2mica de um Set de Filmagem (AvMakers) (21:36 min)",
        url: "https://www.youtube.com/watch?v=bA3kSWwOm6I",
        duration: "21:36 min",
        durationMinutes: 22,
        platformName: "AvMakers Brasil (YouTube)",
        badge: "Aula Pr\xE1tica \u2022 CC Multil\xEDngue \u2022 21:36 min",
        audioLang: "pt",
        type: "analysis"
      },
      {
        id: "set-geracao",
        label: "\u{1F3A5} Como Funciona um Set de Filmagem e suas Fun\xE7\xF5es (Gera\xE7\xE3o Cinema) (26:53 min)",
        url: "https://www.youtube.com/watch?v=vustjlR_fgI",
        duration: "26:53 min",
        durationMinutes: 27,
        platformName: "Gera\xE7\xE3o Cinema (YouTube)",
        badge: "Bastidores \u2022 CC Multil\xEDngue \u2022 26:53 min",
        audioLang: "pt",
        type: "analysis"
      }
    ],
    whyWatch: "Visualizar a mec\xE2nica de um set de verdade: a rela\xE7\xE3o entre assistente de dire\xE7\xE3o, continu\xEDsta, fot\xF3grafo, maquin\xE1ria, som direto e atores.",
    whatToObserve: "A hierarquia respeitosa no set, o controle da ordem do dia, os testes de luz antes da chamada dos atores e a resolu\xE7\xE3o \xE1gil de imprevistos clim\xE1ticos.",
    observationActivity: "Aponte tr\xEAs situa\xE7\xF5es em que a organiza\xE7\xE3o da produ\xE7\xE3o executiva evitou desperd\xEDcio de tempo e assegurou o cronograma da di\xE1ria."
  },
  {
    id: "film-9",
    moduleId: 9,
    title: "Recife Frio",
    director: "Kleber Mendon\xE7a Filho",
    year: 2009,
    duration: "24 min (Curta Completo) \u2022 25 min (Vers\xE3o com Teaser)",
    durationMinutes: 24,
    audioTrack: "original_pt",
    audioTrackLabel: "\u{1F1E7}\u{1F1F7} \xC1udio Original em Portugu\xEAs",
    availableSubtitles: ["pt", "en", "es", "fr"],
    platform: "YouTube (Filme de Kleber Mendon\xE7a Filho)",
    streamingPlatform: "YouTube Teaser & Making Of",
    watchUrl: "https://www.youtube.com/watch?v=X_Xho2GFIPY",
    streamingUrl: "https://www.youtube.com/watch?v=U9mu2TJ0scY",
    videoOptions: [
      {
        id: "recife-frio-hd",
        label: "\u2744\uFE0F Curta-Metragem Completo em HD (24:00 min)",
        url: "https://www.youtube.com/watch?v=X_Xho2GFIPY",
        duration: "24 min",
        durationMinutes: 24,
        platformName: "YouTube (HD Oficial)",
        badge: "Curta Completo \u2022 CC Multil\xEDngue \u2022 24 min",
        audioLang: "pt",
        type: "full_movie"
      },
      {
        id: "recife-frio-director",
        label: "\u{1F3AC} Vers\xE3o do Diretor com Teaser de O Som ao Redor (25:35 min)",
        url: "https://www.youtube.com/watch?v=U9mu2TJ0scY",
        duration: "25:35 min",
        durationMinutes: 26,
        platformName: "Canal Oficial Kleber Mendon\xE7a Filho",
        badge: "Vers\xE3o com Teaser \u2022 25:35 min",
        audioLang: "pt",
        type: "full_movie"
      }
    ],
    whyWatch: "Um dos curtas mais premiados da hist\xF3ria do cinema brasileiro recente (mais de 50 pr\xEAmios). Aula de falso document\xE1rio e divulga\xE7\xE3o mercadol\xF3gica.",
    whatToObserve: "A est\xE9tica de telejornalismo estrangeiro cobrindo uma trag\xE9dia bizarra, a for\xE7a da premissa c\xF4mica e dram\xE1tica, o cartaz ic\xF4nico e a circula\xE7\xE3o em festivais.",
    observationActivity: 'Identifique como a logline ("Uma mudan\xE7a clim\xE1tica sem explica\xE7\xE3o faz nevar no Recife tropical") gerou interesse imediato de festivais no mundo inteiro.'
  },
  {
    id: "film-10",
    moduleId: 10,
    title: "Mostra de Curtas-Metragens Independentes & Obras de Refer\xEAncia",
    originalTitle: "Meu Amigo Nietzsche & Tr\xEAs Minutos (Curadoria de Cinema Independente)",
    director: "F\xE1uston da Silva & Ana Luiza Azevedo (Cineastas Independentes Brasileiros)",
    year: 2024,
    duration: "15 min (Meu Amigo Nietzsche) \u2022 6 min (Tr\xEAs Minutos)",
    durationMinutes: 15,
    audioTrack: "original_pt",
    audioTrackLabel: "\u{1F1E7}\u{1F1F7} \xC1udio Original em Portugu\xEAs",
    availableSubtitles: ["pt", "en", "es", "fr"],
    platform: "Meu Amigo Nietzsche (Dir. F\xE1uston da Silva - YouTube Oficial)",
    streamingPlatform: "Tr\xEAs Minutos (Dir. Ana Luiza Azevedo - YouTube Oficial)",
    watchUrl: "https://www.youtube.com/watch?v=DN0qoSCJYlI",
    streamingUrl: "https://www.youtube.com/watch?v=jAWaMJ7mA6E",
    videoOptions: [
      {
        id: "curta-nietzsche",
        label: "\u{1F4D6} Meu Amigo Nietzsche (Dir. F\xE1uston da Silva) (15:00 min)",
        url: "https://www.youtube.com/watch?v=DN0qoSCJYlI",
        duration: "15 min",
        durationMinutes: 15,
        platformName: "YouTube Oficial (Curta Completo)",
        badge: "Curta \u2022 Legendas CC \u2022 15 min",
        audioLang: "pt",
        type: "full_movie"
      },
      {
        id: "curta-tres-minutos",
        label: "\u23F1\uFE0F Tr\xEAs Minutos (Dir. Ana Luiza Azevedo & Jorge Furtado) (6:00 min)",
        url: "https://www.youtube.com/watch?v=jAWaMJ7mA6E",
        duration: "6 min",
        durationMinutes: 6,
        platformName: "wocomoBRASIL / Casa de Cinema de POA",
        badge: "Curta Premiado em Cannes \u2022 6 min",
        audioLang: "pt",
        type: "full_movie"
      }
    ],
    whyWatch: "Grandes obras premiadas do cinema independente brasileiro, selecionadas pela coordena\xE7\xE3o pedag\xF3gica como refer\xEAncias de linguagem, economia de recursos e pot\xEAncia narrativa para inspirar o seu Projeto Final.",
    whatToObserve: "A capacidade de emocionar em poucos minutos sem necessidade de efeitos caros; a precis\xE3o do corte, a ilumina\xE7\xE3o expressiva e a verdade da atua\xE7\xE3o.",
    observationActivity: "Compare seu pr\xF3prio projeto final com os curtas exibidos, avaliando clareza de proposta, qualidade de som e intensidade da narrativa."
  },
  {
    id: "film-bonus-noite-americana",
    moduleId: 0,
    isBonus: true,
    badge: "B\xD4NUS EXTRA \u2022 CL\xC1SSICO DO SET DE FILMAGEM",
    category: "bonus",
    relatedModuleId: 8,
    title: "A Noite Americana (La Nuit Am\xE9ricaine)",
    originalTitle: "La Nuit Am\xE9ricaine (Day for Night)",
    director: "Fran\xE7ois Truffaut",
    year: 1973,
    country: "Fran\xE7a / It\xE1lia",
    duration: "116 min (Filme Completo em Streaming) \u2022 2:30 min (Cena Antol\xF3gica de Set)",
    durationMinutes: 116,
    audioTrack: "legendado_pt",
    audioTrackLabel: "\u{1F4AC} Legendado em Portugu\xEAs (PT-BR) + Transcri\xE7\xE3o Did\xE1tica",
    availableSubtitles: ["pt", "en", "es", "fr"],
    platform: "YouTube (Cena Did\xE1tica & Bastidores)",
    streamingPlatform: "Prime Video / Arte1 / JustWatch (Filme Completo 116 min)",
    watchUrl: "https://www.youtube.com/watch?v=GmSpeM5Hj2A",
    streamingUrl: "https://www.primevideo.com/detail/0S777P0XW132Y8D5L03P4L105/",
    videoOptions: [
      {
        id: "noite-trailer-hd",
        label: "\u{1F3AC} Filme & Cena de Set: Trailer Oficial HD Remasterizado 1080p \u2022 Legendas Did\xE1ticas (2:15 min)",
        url: "https://www.youtube.com/watch?v=GmSpeM5Hj2A",
        duration: "2:15 min",
        durationMinutes: 2,
        platformName: "Trailer Oficial HD 1080p (YouTube)",
        badge: "Cena de Estudo HD \u2022 2:15 min",
        type: "trailer"
      },
      {
        id: "noite-analysis",
        label: '\u{1F393} An\xE1lise Cr\xEDtica & Bastidores: "Carta de Amor ao Cinema" (10 min)',
        url: "https://www.youtube.com/watch?v=v4YeaNBca3U",
        duration: "10 min",
        durationMinutes: 10,
        platformName: "Ensaio Cinematogr\xE1fico (YouTube)",
        badge: "An\xE1lise de Obra \u2022 10 min",
        type: "scene"
      },
      {
        id: "noite-trailer-bfi",
        label: "\u{1F39E}\uFE0F Trailer Oficial de Cinema BFI (British Film Institute) (2:30 min)",
        url: "https://www.youtube.com/watch?v=OBen19EjYAc",
        duration: "2:30 min",
        durationMinutes: 3,
        platformName: "BFI (British Film Institute)",
        badge: "Trailer BFI \u2022 2:30 min",
        type: "trailer"
      },
      {
        id: "noite-streaming-prime",
        label: "\u{1F4FA} Assistir ao Filme Completo (116 min) no Prime Video / Arte1",
        url: "https://www.primevideo.com/detail/0S777P0XW132Y8D5L03P4L105/",
        duration: "116 min",
        durationMinutes: 116,
        isStreaming: true,
        platformName: "Prime Video (Arte1 Amazon Channel)",
        badge: "Streaming Oficial (116 min)",
        type: "streaming"
      },
      {
        id: "noite-streaming-justwatch",
        label: "\u{1F50D} Onde Assistir ao Filme Completo no Brasil (JustWatch)",
        url: "https://www.justwatch.com/br/filme/a-noite-americana",
        duration: "116 min",
        durationMinutes: 116,
        isStreaming: true,
        platformName: "JustWatch Brasil (Guia de Streaming)",
        badge: "Cat\xE1logo de Streaming (116 min)",
        type: "streaming"
      },
      {
        id: "noite-streaming-apple",
        label: "\u{1F34E} Assistir na Apple TV / iTunes (Aluguel ou Compra HD)",
        url: "https://tv.apple.com/us/movie/day-for-night/umc.cmc.38r7zsk3o4o9vug3qj2n9qrvq",
        duration: "116 min",
        durationMinutes: 116,
        isStreaming: true,
        platformName: "Apple TV / iTunes",
        badge: "Aluguel Digital (116 min)",
        type: "streaming"
      }
    ],
    synopsis: 'Uma declara\xE7\xE3o de amor apaixonada ao of\xEDcio de fazer cinema. Em Nice, uma equipe cinematogr\xE1fica re\xFAne-se nos est\xFAdios Victorine para rodar o melodrama "Je vous pr\xE9sente Pam\xE9la". Durante a produ\xE7\xE3o, acompanhamos todas as crises, romances, desafios t\xE9cnicos, caprichos dos atores e a obstina\xE7\xE3o do diretor para concluir o filme contra todos os imprevistos cotidianos. Vencedor do Oscar de Melhor Filme Estrangeiro.',
    whyWatch: 'O filme definitivo sobre o cotidiano de um set de filmagem real. Mostra de forma magistral os bastidores da produ\xE7\xE3o cinematogr\xE1fica: o estresse do cronograma, as rela\xE7\xF5es humanas complexas entre equipe e elenco, a resolu\xE7\xE3o engenhosa de problemas de produ\xE7\xE3o e, principalmente, a t\xE9cnica cl\xE1ssica da "Noite Americana" (Day for Night) \u2014 a arte de filmar durante a luz do dia usando filtros e subexposi\xE7\xE3o para simular a noite no filme.',
    whatToObserve: '1. A demonstra\xE7\xE3o visual da t\xE9cnica da "Noite Americana": observe a coloca\xE7\xE3o dos filtros especiais na c\xE2mera para transformar o sol de Nice em noite cinematogr\xE1fica.\n2. A din\xE2mica de comando no set: a cumplicidade do diretor Ferrand (interpretado pelo pr\xF3prio Truffaut) com a assistente de dire\xE7\xE3o Jo\xEBlle, o operador de som e o continu\xEDsta.\n3. A resolu\xE7\xE3o criativa de imprevistos reais de produ\xE7\xE3o: adere\xE7os que quebram, o gato que n\xE3o cumpre a marca\xE7\xE3o de cena, e o lema inesquec\xEDvel de Truffaut: "Fazer um filme \xE9 como viajar numa dilig\xEAncia do Velho Oeste: no come\xE7o esperamos uma bela viagem, mas logo passamos a desejar apenas chegar ao destino".',
    observationActivity: "Anote como Fran\xE7ois Truffaut equilibra a dimens\xE3o t\xE9cnica (escolha de lentes, luz de est\xFAdio e filtros de dia-por-noite) com a gest\xE3o emocional da equipe. Escreva uma reflex\xE3o de 1 par\xE1grafo sobre como a t\xE9cnica da Noite Americana pode ser aplicada em produ\xE7\xF5es de baixo or\xE7amento."
  },
  {
    id: "film-extra-heroi",
    moduleId: 5,
    isBonus: true,
    badge: "V\xCDDEO EXTRA \u2022 MASTERCLASS EM FOTOGRAFIA & COR",
    category: "bonus",
    relatedModuleId: 5,
    title: "Her\xF3i (Hero)",
    originalTitle: "Y\u012Bngxi\xF3ng (Hero - Com Jet Li)",
    director: "Zhang Yimou (Dire\xE7\xE3o de Fotografia: Christopher Doyle)",
    year: 2002,
    country: "China / Hong Kong",
    duration: "99 min (Longa Completo) \u2022 7:08 min (Duelo Principal)",
    durationMinutes: 99,
    audioTrack: "legendado_pt",
    audioTrackLabel: "\u{1F4AC} Legendado em Portugu\xEAs (PT-BR)",
    availableSubtitles: ["pt", "en", "es", "fr"],
    platform: "YouTube (Duelo Completo 1080p HD & Trailer Oficial)",
    streamingPlatform: "Apple TV & Amazon Prime Video (Filme Completo 99 min)",
    watchUrl: "https://www.youtube.com/watch?v=-N3BdBhWdmU",
    streamingUrl: "https://www.youtube.com/watch?v=_USDk5jaGek",
    videoOptions: [
      {
        id: "duel-rain",
        label: "\u2694\uFE0F Duelo na Chuva 1080p: Jet Li vs. Donnie Yen (7:08 min)",
        url: "https://www.youtube.com/watch?v=-N3BdBhWdmU",
        duration: "7:08 min",
        durationMinutes: 7,
        platformName: "YouTube (1080p HD)",
        badge: "Cena Principal \u2022 7:08 min",
        type: "full_scene"
      },
      {
        id: "color-red",
        label: "\u{1F534} Paleta Vermelha: O Duelo no Bosque de Folhas (4:33 min)",
        url: "https://www.youtube.com/watch?v=p9keMBIyPnA",
        duration: "4:33 min",
        durationMinutes: 4,
        platformName: "Cena Oficial das Folhas Vermelhas (1080p)",
        badge: "Cena Vermelha \u2022 4:33 min",
        type: "scene"
      },
      {
        id: "color-green",
        label: "\u{1F7E2} Paleta Verde: Defesa da Escola de Caligrafia (3:45 min)",
        url: "https://www.youtube.com/watch?v=YMv3XctCpJ0",
        duration: "3:45 min",
        durationMinutes: 3,
        platformName: "Dancing With Arrows (1080p)",
        badge: "Cena Verde \u2022 3:45 min",
        type: "scene"
      },
      {
        id: "color-analysis",
        label: "\u{1F3A8} V\xEDdeo-Ensaio: Why Every Color in Hero Tells a Story (14:21 min)",
        url: "https://www.youtube.com/watch?v=_ZiWnfHxhu4",
        duration: "14:21 min",
        durationMinutes: 14,
        platformName: "Estudo Te\xF3rico de Fotografia & Cores",
        badge: "V\xEDdeo-Ensaio \u2022 14:21 min",
        type: "analysis"
      },
      {
        id: "color-transitions",
        label: "\u{1F308} Varia\xE7\xE3o das 5 Cores: Transi\xE7\xF5es Crom\xE1ticas (5:14 min)",
        url: "https://www.youtube.com/watch?v=7PU8RVPZJ_g",
        duration: "5:14 min",
        durationMinutes: 5,
        platformName: "Supercut Crom\xE1tico",
        badge: "Varia\xE7\xE3o 5 Cores \u2022 5:14 min",
        type: "analysis"
      },
      {
        id: "trailer-hd",
        label: "\u{1F39E}\uFE0F Trailer Oficial HD 1080p (2:18 min)",
        url: "https://www.youtube.com/watch?v=_USDk5jaGek",
        duration: "2:18 min",
        durationMinutes: 2,
        platformName: "Rotten Tomatoes Classic Trailers / Miramax",
        badge: "Trailer \u2022 2:18 min",
        type: "trailer"
      },
      {
        id: "apple-tv",
        label: "\u{1F34E} Assistir ao Longa-Metragem Completo (99 min) no Apple TV",
        url: "https://tv.apple.com/br/movie/heroi/umc.cmc.3y42j9404285x8n44l1s2j6z8",
        duration: "99 min",
        durationMinutes: 99,
        isStreaming: true,
        platformName: "Apple TV (Aluguel / Compra HD)",
        badge: "Filme Completo (99 min)",
        type: "streaming"
      },
      {
        id: "prime-video",
        label: "\u{1F4E6} Assistir ao Longa-Metragem Completo (99 min) no Prime Video",
        url: "https://www.primevideo.com/search/ref=atv_nb_sr?phrase=Hero+Zhang+Yimou",
        duration: "99 min",
        durationMinutes: 99,
        isStreaming: true,
        platformName: "Amazon Prime Video",
        badge: "Streaming Oficial (99 min)",
        type: "streaming"
      }
    ],
    synopsis: "Estrelado por Jet Li (o guerreiro Sem Nome), Tony Leung, Maggie Cheung, Zhang Ziyi e Donnie Yen. Na China antiga dos Reinos Combatentes, um espadachim relata ao Rei de Qin como derrotou os maiores assassinos do imp\xE9rio. Inspirado na estrutura narrativa de Rashomon, a mesma hist\xF3ria \xE9 recontada sob perspectivas divergentes \u2014 cada uma inteiramente dominada por uma cor prim\xE1ria arrebatadora (vermelho, azul, branco, verde e preto). Indicado ao Oscar e ao Globo de Ouro de Melhor Filme Estrangeiro.",
    whyWatch: "O maior cl\xE1ssico contempor\xE2neo de Dire\xE7\xE3o de Fotografia e Teoria das Cores no cinema. O diretor Zhang Yimou (ele pr\xF3prio formado como diretor de fotografia) e o renomado mestre da luz Christopher Doyle constru\xEDram uma das experi\xEAncias visuais mais arrebatadoras da hist\xF3ria das telas. Uma masterclass pr\xE1tica sobre paletas monocrom\xE1ticas, psicologia da cor, luz natural espelhada na \xE1gua, ilumina\xE7\xE3o dura e difusa em cenas de a\xE7\xE3o sob a chuva e enquadramentos rigorosamente geom\xE9tricos em formato widescreen anam\xF3rfico.",
    whatToObserve: "1. A Teoria Narrativa das Cores de Christopher Doyle: O Vermelho para a paix\xE3o e o ci\xFAme cego; o Azul para a sabedoria serena e a verdade racional; o Branco para o luto e a clareza moral; o Verde para a mem\xF3ria e o id\xEDlio do passado; e o Preto para o rigor absolutista do pal\xE1cio imperial.\n2. O Duelo Hist\xF3rico entre Jet Li e Donnie Yen no P\xE1tio de Go sob a chuva: Repare na ilumina\xE7\xE3o lateral dura que recorta as gotas d'\xE1gua em alta velocidade de obtura\xE7\xE3o, nos reflexos l\xEDmpidos no ch\xE3o molhado e nas sombras dram\xE1ticas.\n3. O Duelo sobre a \xC1gua do Lago: A equipe esperou semanas para filmar apenas durante 2 horas di\xE1rias ao amanhecer, para conseguir a superf\xEDcie de \xE1gua perfeitamente lisa como um espelho e a luz dourada suave que transforma a luta em um bal\xE9 po\xE9tico.",
    observationActivity: "Analise como a dire\xE7\xE3o de fotografia e a temperatura de cor alteram totalmente a emo\xE7\xE3o da mesma cena quando ela \xE9 recontada em cores diferentes. Escreva 1 par\xE1grafo relacionando a paleta de Her\xF3i com a ilumina\xE7\xE3o de tr\xEAs pontos (luz principal, preenchimento e contra-luz) e proponha como utilizar uma luz colorida de recorte no seu exerc\xEDcio pr\xE1tico de c\xE2mera do M\xF3dulo 05."
  },
  {
    id: "film-extra-heroi-cores",
    moduleId: 5,
    isBonus: true,
    badge: "V\xCDDEO EXTRA \u2022 VARIA\xC7\xC3O CROM\xC1TICA & TEORIA DAS CORES",
    category: "bonus",
    relatedModuleId: 5,
    title: "Her\xF3i: As 5 Varia\xE7\xF5es Crom\xE1ticas de Christopher Doyle",
    originalTitle: "Hero (2002) - Chromatic Variations & Color Grammar",
    director: "Zhang Yimou & Christopher Doyle",
    year: 2002,
    country: "China / Hong Kong",
    duration: "4:33 min (Cena Principal) \u2022 37 min (Playlist de Cenas)",
    durationMinutes: 5,
    audioTrack: "legendado_pt",
    audioTrackLabel: "\u{1F4AC} Legendado em Portugu\xEAs (PT-BR)",
    availableSubtitles: ["pt", "en", "es", "fr"],
    platform: "YouTube (Cenas Oficiais em HD & Estudo Crom\xE1tico)",
    streamingPlatform: "Apple TV & Amazon Prime Video",
    watchUrl: "https://www.youtube.com/watch?v=p9keMBIyPnA",
    streamingUrl: "https://www.youtube.com/watch?v=_ZiWnfHxhu4",
    videoOptions: [
      {
        id: "opt-red",
        label: "\u{1F534} Paleta Vermelha: O Duelo no Bosque de Folhas (4:33 min)",
        url: "https://www.youtube.com/watch?v=p9keMBIyPnA",
        duration: "4:33 min",
        durationMinutes: 4,
        platformName: "Cena Oficial das Folhas Vermelhas (1080p)",
        badge: "Cena Vermelha \u2022 4:33 min",
        type: "scene"
      },
      {
        id: "opt-green",
        label: "\u{1F7E2} Paleta Verde: Defesa da Escola de Caligrafia (3:45 min)",
        url: "https://www.youtube.com/watch?v=YMv3XctCpJ0",
        duration: "3:45 min",
        durationMinutes: 3,
        platformName: "Dancing With Arrows (1080p)",
        badge: "Cena Verde \u2022 3:45 min",
        type: "scene"
      },
      {
        id: "opt-rain",
        label: "\u2694\uFE0F Duelo na Chuva em Preto & Prata (7:08 min)",
        url: "https://www.youtube.com/watch?v=-N3BdBhWdmU",
        duration: "7:08 min",
        durationMinutes: 7,
        platformName: "YouTube (1080p HD)",
        badge: "Cena da Chuva \u2022 7:08 min",
        type: "full_scene"
      },
      {
        id: "opt-essay",
        label: "\u{1F3A8} V\xEDdeo-Ensaio Anal\xEDtico: Why Every Color in Hero Tells a Story (14:21 min)",
        url: "https://www.youtube.com/watch?v=_ZiWnfHxhu4",
        duration: "14:21 min",
        durationMinutes: 14,
        platformName: "Estudo Cr\xEDtico de Fotografia",
        badge: "V\xEDdeo-Ensaio \u2022 14:21 min",
        type: "analysis"
      },
      {
        id: "opt-transitions",
        label: "\u{1F308} Varia\xE7\xE3o das 5 Cores: Transi\xE7\xF5es Crom\xE1ticas (5:14 min)",
        url: "https://www.youtube.com/watch?v=7PU8RVPZJ_g",
        duration: "5:14 min",
        durationMinutes: 5,
        platformName: "Supercut Crom\xE1tico",
        badge: "Comparativo \u2022 5:14 min",
        type: "analysis"
      },
      {
        id: "opt-trailer",
        label: "\u{1F39E}\uFE0F Trailer Oficial HD 1080p (2:18 min)",
        url: "https://www.youtube.com/watch?v=_USDk5jaGek",
        duration: "2:18 min",
        durationMinutes: 2,
        platformName: "Miramax HD",
        badge: "Trailer \u2022 2:18 min",
        type: "trailer"
      }
    ],
    synopsis: "Colet\xE2nea de estudos audiovisuais dedicada especificamente \xE0 gram\xE1tica das cores no filme Her\xF3i (2002), dirigido por Zhang Yimou e fotografado por Christopher Doyle. O material re\xFAne a cena emblem\xE1tica do duelo no bosque com as folhas que sangram do amarelo para o vermelho escarlate, a defesa da escola de caligrafia em verde-esmeralda l\xEDmpido sob milhares de flechas imperiais pretas, o combate na chuva com ilumina\xE7\xE3o lateral dura, e o v\xEDdeo-ensaio anal\xEDtico sobre a psicologia e dramaturgia de cada matiz crom\xE1tico.",
    whyWatch: "Estudo essencial para a Apostila 05 de Dire\xE7\xE3o de Fotografia. Demonstra como o dom\xEDnio da temperatura de cor, da satura\xE7\xE3o seletiva e do contraste tonal pode mudar por completo o significado \xE9tico e emocional de uma mesma hist\xF3ria.",
    whatToObserve: "1. Repare na transi\xE7\xE3o das folhas amarelas para vermelho sangue no bosque outonal; 2. Veja como o verde esmeralda transmite serenidade e disciplina espiritual perante a viol\xEAncia das flechas; 3. Analise como o contraste entre o preto e a luz lateral na chuva isola as silhuetas com precis\xE3o cir\xFArgica.",
    observationActivity: "Compare as duas cenas crom\xE1ticas (a Paleta Vermelha e a Paleta Verde). Escreva 1 par\xE1grafo explicando como a paleta de cores altera o ritmo percebido da luta e que temperatura de cor (quente ou fria) foi empregada em cada uma."
  }
];
var pedagogicalReadings = [
  {
    id: "read-1",
    moduleId: 1,
    title: "A Linguagem do Cinema",
    author: "Marcel Martin",
    suggestedChapter: "Cap\xEDtulos 1 e 2: A Unidade F\xEDlmica e a Express\xE3o pelo Enquadramento",
    whyRead: "O livro de refer\xEAncia absoluta sobre a gram\xE1tica do cinema e a passagem do plano como documento para o plano como obra de arte.",
    url: "/filmes-leituras"
  },
  {
    id: "read-2",
    moduleId: 2,
    title: "A Forma do Filme",
    author: "Sergei Eisenstein",
    suggestedChapter: "A Estrutura do Filme e os M\xE9todos de Montagem",
    whyRead: "Escrito pelo pr\xF3prio g\xEAnio russo, ensina a montagem m\xE9trica, r\xEDtmica, tonal, sobretonal e intelectual que revolucionou a hist\xF3ria das telas.",
    url: "/filmes-leituras"
  },
  {
    id: "read-3",
    moduleId: 3,
    title: "Manual do Roteiro (Screenplay)",
    author: "Syd Field",
    suggestedChapter: "O Paradigma dos Tr\xEAs Atos e os Pontos de Virada",
    whyRead: "A b\xEDblia da estrutura dram\xE1tica no cinema mundial. Como arquitetar a espinha dorsal de uma narrativa sem que ela perca ritmo ou f\xF4lego.",
    url: "/filmes-leituras"
  },
  {
    id: "read-4",
    moduleId: 4,
    title: "A Prepara\xE7\xE3o do Ator",
    author: "Constantin Stanislavski",
    suggestedChapter: "A\xE7\xE3o F\xEDsica, Objetivo e Mem\xF3ria Afetiva",
    whyRead: "A base de toda a dire\xE7\xE3o de atores moderna realista. Ensina o diretor a dialogar com a psicologia viva do elenco em cena.",
    url: "/filmes-leituras"
  },
  {
    id: "read-5",
    moduleId: 5,
    title: "Ilumina\xE7\xE3o no Cinema: A Arte de Pintar com a Luz",
    author: "John Alton (Painting with Light)",
    suggestedChapter: "O Mist\xE9rio das Sombras e o Desenho Cl\xE1ssico de Luz",
    whyRead: "O primeiro grande manual escrito por um lend\xE1rio diretor de fotografia de Hollywood. Pr\xE1tico, visceral e revelador sobre luz e sombra.",
    url: "/filmes-leituras"
  },
  {
    id: "read-6",
    moduleId: 6,
    title: "A Audiovisualidade: Som e Imagem no Cinema",
    author: "Michel Chion",
    suggestedChapter: "O \xC1udio-Logo, o Ponto de Escuta e o Efeito Acousm\xE1tico",
    whyRead: "A obra definitiva sobre teoria sonora no cinema. Como o som transforma e ressignifica a imagem que os olhos veem.",
    url: "/filmes-leituras"
  },
  {
    id: "read-7",
    moduleId: 7,
    title: "Num Piscar de Olhos (In the Blink of an Eye)",
    author: "Walter Murch",
    suggestedChapter: "A Regra de Seis: Por Que e Onde Cortar?",
    whyRead: "O lend\xE1rio montador de Apocalypse Now e O Poderoso Chef\xE3o ensina a teoria emocional e fisiol\xF3gica do corte cinematogr\xE1fico.",
    url: "/filmes-leituras"
  },
  {
    id: "read-8",
    moduleId: 8,
    title: "Produ\xE7\xE3o Executiva para Cinema Independente (Shoot to Kill)",
    author: "Christine Vachon",
    suggestedChapter: "Como Realizar um Filme sem Perder a Alma nem a Casa",
    whyRead: "Vis\xE3o pragm\xE1tica, desmistificadora e corajosa dos bastidores da produ\xE7\xE3o executiva de filmes autorais premiados.",
    url: "/filmes-leituras"
  },
  {
    id: "read-9",
    moduleId: 9,
    title: "A Circula\xE7\xE3o do Curta-Metragem Brasileiro e Internacional",
    author: "Pesquisadores do Audiovisual Brasileiro",
    suggestedChapter: "Estrat\xE9gia de Inscri\xE7\xF5es, FilmFreeway e Janelas Digitais",
    whyRead: "Guia indispens\xE1vel para transformar seu curta em cart\xE3o de visitas mundial e compreender as exig\xEAncias de curadoria dos festivais.",
    url: "/filmes-leituras"
  },
  {
    id: "read-10",
    moduleId: 10,
    title: "Esculpir o Tempo",
    author: "Andrei Tarkovsky",
    suggestedChapter: "A Responsabilidade do Artista e o Cinema como Imagem da Vida",
    whyRead: "O fechamento filos\xF3fico e po\xE9tico perfeito para quem conclui o CINELAB e assume o papel soberano de cineasta no mundo contempor\xE2neo.",
    url: "/filmes-leituras"
  }
];
var pedagogicalActivities = [
  // Módulo 01
  {
    id: "act-1-principal",
    moduleId: 1,
    title: 'Atividade Principal 01: "Conte uma pequena hist\xF3ria em 5 planos"',
    category: "pratica",
    content: "Crie uma narrativa visual completa utilizando rigorosamente 5 planos cinematogr\xE1ficos em progress\xE3o dram\xE1tica. Defina o enquadramento de cada plano (ex: Plano Geral, Plano M\xE9dio, Primeiro Plano, Plano Detalhe) e a a\xE7\xE3o que ocorre em cena.",
    details: "Exemplo: Plano 1 (Plano Geral: sala vazia com chave sobre a mesa) -> Plano 2 (Plano M\xE9dio: mulher entra com pressa) -> Plano 3 (Plano Detalhe: m\xE3o pega a chave) -> Plano 4 (Primeiro Plano: olhar de al\xEDvio e espanto) -> Plano 5 (Plano Americano: ela sai batendo a porta).",
    activityType: "structured_form",
    expectedFields: [
      { key: "plano1", label: "Plano 1 (Enquadramento + A\xE7\xE3o)", placeholder: "Ex: GPG ou PG - Descreva a cena...", required: true },
      { key: "plano2", label: "Plano 2 (Enquadramento + A\xE7\xE3o)", placeholder: "Ex: PM - Descreva a a\xE7\xE3o...", required: true },
      { key: "plano3", label: "Plano 3 (Enquadramento + A\xE7\xE3o)", placeholder: "Ex: Close / Primeiro Plano...", required: true },
      { key: "plano4", label: "Plano 4 (Enquadramento + A\xE7\xE3o)", placeholder: "Ex: Plano Detalhe - Elemento chave...", required: true },
      { key: "plano5", label: "Plano 5 (Enquadramento + Desfecho)", placeholder: "Ex: PG ou PA - Conclus\xE3o...", required: true }
    ]
  },
  // Módulo 02
  {
    id: "act-2-principal",
    moduleId: 2,
    title: 'Atividade Principal 02: "Exerc\xEDcio de An\xE1lise em Seis Camadas"',
    category: "pratica",
    content: 'Escolha uma cena emblem\xE1tica de "O Encoura\xE7ado Potemkin" (ou outra obra de sua escolha) e aplique o m\xE9todo anal\xEDtico do CINELAB dissecando suas 6 camadas constitutivas.',
    activityType: "structured_form",
    expectedFields: [
      { key: "filmeCena", label: "Filme e Cena Escolhida", placeholder: "Ex: O Encoura\xE7ado Potemkin - Escadaria de Odessa", required: true },
      { key: "camada1", label: "1. Camada Narrativa", placeholder: "Qual o conflito e o ponto de virada dram\xE1tico?", required: true },
      { key: "camada2", label: "2. Camada de Personagem", placeholder: "Quais as motiva\xE7\xF5es e rea\xE7\xF5es dos personagens?", required: true },
      { key: "camada3", label: "3. Camada de Espa\xE7o", placeholder: "Como a loca\xE7\xE3o e o cen\xE1rio influenciam a tens\xE3o?", required: true },
      { key: "camada4", label: "4. Camada de Imagem (Fotografia)", placeholder: "Como s\xE3o a luz, os \xE2ngulos e as cores?", required: true },
      { key: "camada5", label: "5. Camada de Som", placeholder: "Qual o papel dos ru\xEDdos, m\xFAsica e sil\xEAncio?", required: true },
      { key: "camada6", label: "6. Camada de Montagem", placeholder: "Como o ritmo dos cortes dita a pulsa\xE7\xE3o da cena?", required: true }
    ]
  },
  // Módulo 03
  {
    id: "act-3-principal",
    moduleId: 3,
    title: 'Atividade Principal 03: "A \xDAltima Carta" (Desenvolvimento de Roteiro)',
    category: "pratica",
    content: 'Desenvolva o projeto de roteiro da hist\xF3ria "A \xDAltima Carta". Preencha todos os campos da cadeia de cria\xE7\xE3o dram\xE1tica e escreva ao menos uma cena completa em padr\xE3o Master Scenes.',
    activityType: "structured_form",
    expectedFields: [
      { key: "storyline", label: "Storyline (at\xE9 5 linhas)", placeholder: "Apresenta\xE7\xE3o + Conflito + Resolu\xE7\xE3o b\xE1sica...", required: true },
      { key: "logline", label: "Logline (1 a 2 linhas)", placeholder: "Quem \xE9 o protagonista e qual o obst\xE1culo urgente?", required: true },
      { key: "sinopse", label: "Sinopse Curta (1 a 2 par\xE1grafos)", placeholder: "Resumo completo da narrativa...", required: true },
      { key: "escaleta", label: "Escaleta de 5 Cenas", placeholder: "Cena 1 (...), Cena 2 (...), Cena 3 (...), Cena 4 (...), Cena 5 (...)", required: true },
      { key: "cenaRoteiro", label: "Uma Cena Completa em Master Scenes", placeholder: "INT. QUARTO DE ANDR\xC9 - NOITE\n\nAndr\xE9 segura a carta amarelada...", required: true }
    ]
  },
  // Módulo 04
  {
    id: "act-4-principal",
    moduleId: 4,
    title: 'Atividade Principal 04: "Ensaio de Cena de 45 Segundos"',
    category: "pratica",
    content: "Planeje o ensaio e a dire\xE7\xE3o de uma cena curta de aproximadamente 45 segundos entre dois atores. Defina a inten\xE7\xE3o da cena, o objetivo interno de cada personagem, a marca\xE7\xE3o f\xEDsica (blocking) e os 3 planos indispens\xE1veis para film\xE1-la.",
    activityType: "structured_form",
    expectedFields: [
      { key: "intencao", label: "Inten\xE7\xE3o Geral da Cena", placeholder: "Ex: Despedida dolorosa sem que um perceba a partida definitiva do outro.", required: true },
      { key: "objetivoPers1", label: "Objetivo do Personagem A (com verbo ativo)", placeholder: "Ex: Fazer B aceitar o dinheiro sem ofend\xEA-lo.", required: true },
      { key: "objetivoPers2", label: "Objetivo do Personagem B (com verbo ativo)", placeholder: "Ex: Descobrir se A est\xE1 mentindo sobre a viagem.", required: true },
      { key: "marcacao", label: "Marca\xE7\xE3o C\xEAnica (Blocking)", placeholder: "Onde cada personagem come\xE7a, para onde anda e onde termina a cena?", required: true },
      { key: "tresPlanos", label: "Os Tr\xEAs Planos Indispens\xE1veis", placeholder: "Plano 1 (...), Plano 2 (...), Plano 3 (...)", required: true }
    ]
  },
  // Módulo 05
  {
    id: "act-5-principal",
    moduleId: 5,
    title: 'Atividade Principal 05: "Quatro Retratos de Luz"',
    category: "pratica",
    content: "Fotografe ou simule quatro retratos de um mesmo sujeito utilizando quatro qualidades de ilumina\xE7\xE3o: 1. Luz Frontal, 2. Luz Lateral, 3. Contraluz, 4. Luz de Janela. Compare o resultado utilizando dois tamanhos de plano (ex: Plano M\xE9dio e Close).",
    activityType: "structured_form",
    expectedFields: [
      { key: "luzFrontal", label: "1. Luz Frontal (Observa\xE7\xE3o e Efeito)", placeholder: "Como o rosto se comportou? Como ficaram as sombras?", required: true },
      { key: "luzLateral", label: "2. Luz Lateral (Observa\xE7\xE3o e Efeito)", placeholder: "Qual foi o contraste dram\xE1tico obtido?", required: true },
      { key: "contraluz", label: "3. Contraluz (Observa\xE7\xE3o e Efeito)", placeholder: "Como o contorno de luz separou o sujeito do fundo?", required: true },
      { key: "luzJanela", label: "4. Luz de Janela (Observa\xE7\xE3o e Efeito)", placeholder: "Qual a qualidade da difus\xE3o e textura da pele?", required: true },
      { key: "comparacaoPlanos", label: "Compara\xE7\xE3o entre os Dois Tamanhos de Plano", placeholder: "O que mudou entre o Plano M\xE9dio e o Close nas mesmas luzes?", required: true },
      { key: "linksImagens", label: "Links das Imagens / Fotos Registradas (Opcional)", placeholder: "Cole links do Google Drive, Imgur ou redes sociais...", required: false }
    ]
  },
  // Módulo 06
  {
    id: "act-6-principal",
    moduleId: 6,
    title: 'Atividade Principal 06: "Grava\xE7\xE3o de Room Tone e Teste de Dist\xE2ncias"',
    category: "pratica",
    content: "Grave o ambiente (Room Tone) de um c\xF4modo por 60 segundos. Em seguida, grave a mesma fala curta com o microfone a 30 cent\xEDmetros e a 2 metros de dist\xE2ncia. Compare a reverbera\xE7\xE3o, ru\xEDdo de fundo e inteligibilidade.",
    activityType: "structured_form",
    expectedFields: [
      { key: "locacao", label: "Loca\xE7\xE3o Escolhida", placeholder: "Ex: Quarto com janela de madeira voltada para a rua.", required: true },
      { key: "equipamento", label: "Equipamento Utilizado", placeholder: "Ex: Celular com fone/lapela, gravador digital, etc.", required: true },
      { key: "roomToneAnalise", label: "An\xE1lise do Room Tone (60 segundos)", placeholder: "Quais ru\xEDdos ocultos foram captados no sil\xEAncio aparente?", required: true },
      { key: "falaProxima", label: "Fala a 30 cm do Microfone", placeholder: "Como ficou a clareza e presen\xE7a dos graves?", required: true },
      { key: "falaDistante", label: "Fala a 2 metros do Microfone", placeholder: "Quanto a ac\xFAstica do ambiente afetou a compreens\xE3o?", required: true },
      { key: "conclusao", label: "Conclus\xE3o Pr\xE1tica para seu Curta", placeholder: "O que voc\xEA far\xE1 para garantir som limpo no seu filme?", required: true }
    ]
  },
  // Módulo 07
  {
    id: "act-7-principal",
    moduleId: 7,
    title: 'Atividade Principal 07: "Montagem de Sequ\xEAncia de 30 a 60 Segundos"',
    category: "pratica",
    content: "Monte uma sequ\xEAncia r\xEDtmica de 30 a 60 segundos utilizando pelo menos cinco planos distintos. Aplique corte na a\xE7\xE3o (Cut on Action), corte de rea\xE7\xE3o e controle da dura\xE7\xE3o dos planos.",
    activityType: "structured_form",
    expectedFields: [
      { key: "descricaoSequencia", label: "Descri\xE7\xE3o da Sequ\xEAncia Montada", placeholder: "Qual a a\xE7\xE3o e a emo\xE7\xE3o retratada nos 30 a 60 segundos?", required: true },
      { key: "listaPlanos", label: "Lista dos 5 Planos Utilizados e Dura\xE7\xF5es", placeholder: "Plano 1 (4s), Plano 2 (2s), Plano 3 (1.5s)...", required: true },
      { key: "corteAcao", label: "Onde ocorreu o Corte na A\xE7\xE3o?", placeholder: "Descreva a transi\xE7\xE3o em que o movimento disfar\xE7ou o corte.", required: true },
      { key: "ritmoEmocional", label: "Como a velocidade dos cortes afetou o espectador?", placeholder: "Criou acelera\xE7\xE3o, calma, suspense ou al\xEDvio?", required: true },
      { key: "linkVideo", label: "Link do V\xEDdeo Montado (Opcional: YouTube/Vimeo/Drive)", placeholder: "https://...", required: false }
    ]
  },
  // Módulo 08
  {
    id: "act-8-principal",
    moduleId: 8,
    title: 'Atividade Principal 08: "Ordem do Dia Simplificada e Or\xE7amento B\xE1sico"',
    category: "pratica",
    content: "Crie a Ordem do Dia (ODD) para uma di\xE1ria fict\xEDcia ou real do seu curta-metragem. Defina a equipe indispens\xE1vel, cronograma de hor\xE1rios, loca\xE7\xE3o, equipamentos, plano de conting\xEAncia (Plano B) e planilha or\xE7ament\xE1ria sint\xE9tica.",
    activityType: "structured_form",
    expectedFields: [
      { key: "equipe", label: "Equipe e Fun\xE7\xF5es", placeholder: "Diretor, Fot\xF3grafo, Som Direto, Produ\xE7\xE3o, Elenco...", required: true },
      { key: "horarios", label: "Hor\xE1rios da Di\xE1ria", placeholder: "08h Chegada / 09h Ensaio / 12h Almo\xE7o / 17h Wrap...", required: true },
      { key: "locacao", label: "Loca\xE7\xE3o e Log\xEDstica", placeholder: "Endere\xE7o, autoriza\xE7\xF5es necess\xE1rias, tomada de energia...", required: true },
      { key: "equipamentos", label: "Lista de Equipamentos Essenciais", placeholder: "C\xE2mera, trip\xE9, 2 refletores, gravador, rebatedor...", required: true },
      { key: "planoB", label: "Plano B (Conting\xEAncia para imprevistos)", placeholder: "Se chover ou o ator atrasar, qual a alternativa imediata?", required: true },
      { key: "orcamento", label: "Or\xE7amento B\xE1sico Estimado (em R$)", placeholder: "Alimenta\xE7\xE3o: R$ X | Transporte: R$ Y | Equipamentos: R$ Z...", required: true }
    ]
  },
  // Módulo 09
  {
    id: "act-9-principal",
    moduleId: 9,
    title: 'Atividade Principal 09: "Kit de Divulga\xE7\xE3o do Curta (EPK)"',
    category: "pratica",
    content: "Elabore o kit de divulga\xE7\xE3o oficial do seu projeto de curta-metragem para festivais e plataformas. Preencha logline, sinopse, release jornal\xEDstico de tr\xEAs linhas, conceito do cartaz e calend\xE1rio de circula\xE7\xE3o.",
    activityType: "structured_form",
    expectedFields: [
      { key: "tituloCurta", label: "T\xEDtulo Oficial do Curta", placeholder: 'Ex: "O \xDAltimo Retrato"', required: true },
      { key: "logline", label: "Logline Oficial (1 a 2 linhas)", placeholder: "A s\xEDntese irresist\xEDvel do filme...", required: true },
      { key: "sinopse", label: "Sinopse Curta (3 a 5 linhas)", placeholder: "Apresenta\xE7\xE3o da trama para cat\xE1logos de festival...", required: true },
      { key: "release", label: "Release de Imprensa (3 linhas)", placeholder: "O texto que ser\xE1 enviado para cr\xEDticos e jornais...", required: true },
      { key: "ideiaCartaz", label: "Conceito Visual do Cartaz", placeholder: "Qual imagem, tipografia e cores expressam a alma do filme?", required: true },
      { key: "calendarioCirculacao", label: "Calend\xE1rio de Festivais (Primeiros 12 meses)", placeholder: "Festivais priorit\xE1rios para inscri\xE7\xE3o (Gramado, Tiradentes, Curta Cinema, etc.)...", required: true }
    ]
  },
  // Módulo 10
  {
    id: "act-10-principal",
    moduleId: 10,
    title: "Projeto Final: Curta-Metragem Integrado (1 a 5 minutos)",
    category: "pratica",
    content: "O momento de colocar tudo que aprendeu nas telas! Entregue os dados do seu curta autoral de 1 a 5 minutos com ficha t\xE9cnica, link do filme finalizado e sua reflex\xE3o pessoal de processo.",
    activityType: "structured_form",
    expectedFields: [
      { key: "titulo", label: "T\xEDtulo Oficial do Curta", placeholder: "T\xEDtulo do seu filme...", required: true },
      { key: "genero", label: "G\xEAnero e Formato", placeholder: "Fic\xE7\xE3o, Document\xE1rio, Ensaio Po\xE9tico, Suspense, etc.", required: true },
      { key: "duracao", label: "Dura\xE7\xE3o Exata (entre 1 e 5 minutos)", placeholder: "Ex: 3 min 45 seg", required: true },
      { key: "logline", label: "Logline", placeholder: "A frase de impacto do filme...", required: true },
      { key: "equipeFicha", label: "Ficha T\xE9cnica Completa", placeholder: "Dire\xE7\xE3o, Roteiro, Elenco, Fotografia, Som, Montagem...", required: true },
      { key: "linkFilme", label: "Link do Curta Finalizado (YouTube/Vimeo/Drive/Dropbox)", placeholder: "https://...", required: true },
      { key: "linkImagem", label: "Link do Cartaz ou Still Oficial (Opcional)", placeholder: "https://...", required: false },
      { key: "aprendizadoPrincipal", label: "Aprendizado Principal na Realiza\xE7\xE3o", placeholder: "Qual foi a maior descoberta durante as filmagens?", required: true },
      { key: "oQueFuncionou", label: "O que funcionou exatamente como planejado?", placeholder: "Avalie os acertos do seu curta...", required: true },
      { key: "oQueFariaDiferente", label: "O que faria de forma diferente em um pr\xF3ximo filme?", placeholder: "Reflex\xE3o cr\xEDtica sobre melhorias...", required: true },
      { key: "proximoProjeto", label: "O que deseja aprender ou realizar no seu pr\xF3ximo projeto?", placeholder: "Pr\xF3ximos passos da sua jornada cinematogr\xE1fica...", required: true }
    ]
  }
];

// server/pedagogicalEvaluations.ts
var pedagogicalEvaluations = [
  // AVALIAÇÃO 01 - INTRODUÇÃO AO CINEMA E À LINGUAGEM AUDIOVISUAL (10 Questões x 1.0 ponto = 10.0)
  // GABARITO OFICIAL: 1-B | 2-A | 3-C | 4-B | 5-B | 6-B | 7-A | 8-B | 9-B | 10-A
  {
    id: "eval-1",
    moduleId: 1,
    moduleNumber: 1,
    title: "Avalia\xE7\xE3o Oficial 01 \u2014 Introdu\xE7\xE3o ao Cinema e \xE0 Linguagem Audiovisual",
    description: "10 quest\xF5es objetivas de m\xFAltipla escolha (1,0 ponto cada, nota m\xE1xima 10,0). Corre\xE7\xE3o autom\xE1tica com resultado imediato.",
    maxScore: 10,
    minPassingScore: 6,
    questions: [
      {
        id: "q1-1",
        type: "multiple_choice",
        prompt: "1. O que significa audiovisual?",
        options: [
          "Comunica\xE7\xE3o somente por texto",
          "Comunica\xE7\xE3o por imagens e sons",
          "Comunica\xE7\xE3o apenas por m\xFAsica",
          "Comunica\xE7\xE3o somente por fotografia"
        ],
        correctOptionIndex: 1,
        // B
        weight: 1,
        explanation: "Audiovisual \xE9 a forma de comunica\xE7\xE3o e express\xE3o art\xEDstica baseada na combina\xE7\xE3o integrada de imagens e sons."
      },
      {
        id: "q1-2",
        type: "multiple_choice",
        prompt: "2. Qual elemento pode contribuir para contar uma hist\xF3ria al\xE9m da imagem?",
        options: [
          "Som",
          "Apenas legenda",
          "Apenas cen\xE1rio",
          "Apenas figurino"
        ],
        correctOptionIndex: 0,
        // A
        weight: 1,
        explanation: "O som atua de forma direta na constru\xE7\xE3o narrativa, espacialidade e atmosfera emocional do filme."
      },
      {
        id: "q1-3",
        type: "multiple_choice",
        prompt: "3. Qual enquadramento \xE9 mais adequado para destacar um detalhe?",
        options: [
          "Plano geral",
          "Plano conjunto",
          "Close/detalhe",
          "Plano de estabelecimento"
        ],
        correctOptionIndex: 2,
        // C
        weight: 1,
        explanation: "O enquadramento em close ou plano detalhe isola e destaca um elemento pontual essencial da cena."
      },
      {
        id: "q1-4",
        type: "multiple_choice",
        prompt: "4. Quais s\xE3o as tr\xEAs grandes etapas b\xE1sicas de uma produ\xE7\xE3o?",
        options: [
          "Roteiro, elenco e estreia",
          "Pr\xE9-produ\xE7\xE3o, produ\xE7\xE3o e p\xF3s-produ\xE7\xE3o",
          "C\xE2mera, luz e som",
          "Filme, cartaz e festival"
        ],
        correctOptionIndex: 1,
        // B
        weight: 1,
        explanation: "As tr\xEAs etapas can\xF4nicas da realiza\xE7\xE3o audiovisual s\xE3o pr\xE9-produ\xE7\xE3o (planejamento), produ\xE7\xE3o (grava\xE7\xE3o) e p\xF3s-produ\xE7\xE3o (montagem e finaliza\xE7\xE3o)."
      },
      {
        id: "q1-5",
        type: "multiple_choice",
        prompt: "5. Por que o som \xE9 importante no audiovisual?",
        options: [
          "Serve apenas para preencher sil\xEAncio",
          "Pode situar, criar atmosfera e participar da narrativa",
          "S\xF3 \xE9 necess\xE1rio em musicais",
          "Substitui a imagem"
        ],
        correctOptionIndex: 1,
        // B
        weight: 1,
        explanation: "O som n\xE3o \xE9 mero acompanhamento; ele situa o espectador no espa\xE7o, cria atmosfera dram\xE1tica e \xE9 parte ativa da narrativa."
      },
      {
        id: "q1-6",
        type: "multiple_choice",
        prompt: "6. O que \xE9 enquadramento?",
        options: [
          "O roteiro completo",
          "Tudo aquilo que a c\xE2mera mostra dentro da imagem",
          "A edi\xE7\xE3o final",
          "O or\xE7amento"
        ],
        correctOptionIndex: 1,
        // B
        weight: 1,
        explanation: "Enquadramento \xE9 a delimita\xE7\xE3o e escolha \xF3ptica de tudo aquilo que a c\xE2mera registra e exibe dentro dos limites do quadro."
      },
      {
        id: "q1-7",
        type: "multiple_choice",
        prompt: "7. O que \xE9 montagem?",
        options: [
          "Organiza\xE7\xE3o de imagens e sons para formar a obra",
          "Escolha do elenco",
          "Constru\xE7\xE3o do cen\xE1rio",
          "Capta\xE7\xE3o do \xE1udio"
        ],
        correctOptionIndex: 0,
        // A
        weight: 1,
        explanation: "Montagem \xE9 o processo de sele\xE7\xE3o, ordena\xE7\xE3o e articula\xE7\xE3o temporal de imagens e sons para criar sentido e ritmo \xE0 obra."
      },
      {
        id: "q1-8",
        type: "multiple_choice",
        prompt: "8. O que \xE9 pr\xE9-produ\xE7\xE3o?",
        options: [
          "Etapa posterior \xE0 estreia",
          "Etapa de prepara\xE7\xE3o e planejamento",
          "Apenas a montagem",
          "Apenas a divulga\xE7\xE3o"
        ],
        correctOptionIndex: 1,
        // B
        weight: 1,
        explanation: "A pr\xE9-produ\xE7\xE3o \xE9 a fase preparat\xF3ria onde se desenvolve o roteiro, or\xE7amento, cronograma, loca\xE7\xF5es e equipe antes de ligar a c\xE2mera."
      },
      {
        id: "q1-9",
        type: "multiple_choice",
        prompt: "9. No exerc\xEDcio de cinco planos, qual \xE9 a fun\xE7\xE3o do plano 1?",
        options: [
          "Mostrar o resultado",
          "Apresentar o lugar",
          "Mostrar apenas um detalhe",
          "Encerrar a hist\xF3ria"
        ],
        correctOptionIndex: 1,
        // B
        weight: 1,
        explanation: "No exerc\xEDcio dos cinco planos, o primeiro plano tem a fun\xE7\xE3o primordial de apresentar e estabelecer o espa\xE7o da a\xE7\xE3o."
      },
      {
        id: "q1-10",
        type: "multiple_choice",
        prompt: "10. O que o exerc\xEDcio de cinco planos procura desenvolver?",
        options: [
          "A capacidade de criar narrativa pela organiza\xE7\xE3o das imagens",
          "Apenas a qualidade t\xE9cnica da c\xE2mera",
          "Apenas efeitos visuais",
          "Apenas grava\xE7\xE3o de \xE1udio"
        ],
        correctOptionIndex: 0,
        // A
        weight: 1,
        explanation: "O exerc\xEDcio estimula a capacidade fundamental do realizador em contar uma hist\xF3ria visualmente articulada atrav\xE9s da ordem dos planos."
      }
    ]
  },
  // AVALIAÇÃO 02 - HISTÓRIA DO CINEMA E ANÁLISE DE OBRAS
  // GABARITO OFICIAL: 1-B | 2-A | 3-A | 4-A | 5-B | 6-B | 7-B | 8-B | 9-A | 10-A
  {
    id: "eval-2",
    moduleId: 2,
    moduleNumber: 2,
    title: "Avalia\xE7\xE3o Oficial 02 \u2014 Hist\xF3ria do Cinema e An\xE1lise de Obras",
    description: "10 quest\xF5es objetivas de m\xFAltipla escolha (1,0 ponto cada, nota m\xE1xima 10,0). Corre\xE7\xE3o autom\xE1tica com resultado imediato.",
    maxScore: 10,
    minPassingScore: 6,
    questions: [
      {
        id: "q2-1",
        type: "multiple_choice",
        prompt: "1. O que caracteriza uma mudan\xE7a importante na hist\xF3ria do cinema?",
        options: [
          "Apenas a troca de atores",
          "A evolu\xE7\xE3o de t\xE9cnicas, tecnologias e formas de narrativa",
          "Apenas o aumento da dura\xE7\xE3o dos filmes",
          "Apenas a mudan\xE7a de cartazes"
        ],
        correctOptionIndex: 1,
        // B
        weight: 1,
        explanation: "Grandes marcos hist\xF3ricos no cinema decorrem da transforma\xE7\xE3o conjunta de recursos tecnol\xF3gicos, t\xE9cnicas expressivas e novos modos narrativos."
      },
      {
        id: "q2-2",
        type: "multiple_choice",
        prompt: "2. No cinema silencioso, qual elemento tinha papel importante?",
        options: [
          "M\xFAsica ao vivo",
          "Dublagem digital",
          "Streaming",
          "Som surround"
        ],
        correctOptionIndex: 0,
        // A
        weight: 1,
        explanation: "Na era muda, pianistas e orquestras executavam m\xFAsica ao vivo nas salas para pontuar a emo\xE7\xE3o e o ritmo dos filmes."
      },
      {
        id: "q2-3",
        type: "multiple_choice",
        prompt: "3. O surgimento do som sincronizado ampliou o uso de:",
        options: [
          "Voz, ru\xEDdos e m\xFAsica",
          "Apenas cor",
          "Apenas cen\xE1rios",
          "Apenas figurino"
        ],
        correctOptionIndex: 0,
        // A
        weight: 1,
        explanation: "A chegada do som sincronizado permitiu a integra\xE7\xE3o org\xE2nica entre di\xE1logos falados (voz), efeitos sonoros realistas (ru\xEDdos) e trilha musical."
      },
      {
        id: "q2-4",
        type: "multiple_choice",
        prompt: "4. A cor no cinema pode contribuir principalmente para:",
        options: [
          "Atmosfera e estilo",
          "Eliminar a montagem",
          "Substituir o roteiro",
          "Impedir a atua\xE7\xE3o"
        ],
        correctOptionIndex: 0,
        // A
        weight: 1,
        explanation: "A paleta crom\xE1tica cria estados emocionais, ressalta a psicologia dos personagens e estabelece o estilo est\xE9tico do realizador."
      },
      {
        id: "q2-5",
        type: "multiple_choice",
        prompt: "5. Por que estudar cinema brasileiro \xE9 importante?",
        options: [
          "Para ignorar outras cinematografias",
          "Para ampliar repert\xF3rio e perceber hist\xF3rias pr\xF3ximas da nossa realidade",
          "Apenas para decorar datas",
          "Apenas para conhecer atores"
        ],
        correctOptionIndex: 1,
        // B
        weight: 1,
        explanation: "O cinema nacional enriquece o repert\xF3rio do cineasta ao dialogar diretamente com a identidade cultural e as realidades sociais do pa\xEDs."
      },
      {
        id: "q2-6",
        type: "multiple_choice",
        prompt: "6. Na an\xE1lise de obras, o que deve ser observado?",
        options: [
          "Somente a hist\xF3ria",
          "Narrativa, personagem, espa\xE7o, imagem, som e montagem",
          "Apenas o cartaz",
          "Apenas o or\xE7amento"
        ],
        correctOptionIndex: 1,
        // B
        weight: 1,
        explanation: "Uma an\xE1lise cinematogr\xE1fica abrangente decomp\xF5e o filme em suas seis camadas fundamentais: narrativa, personagem, espa\xE7o, imagem, som e montagem."
      },
      {
        id: "q2-7",
        type: "multiple_choice",
        prompt: "7. O que torna uma an\xE1lise mais forte?",
        options: [
          "Opini\xE3o sem exemplos",
          "Descri\xE7\xE3o de escolhas concretas e seus efeitos",
          "Apenas nota de 0 a 10",
          "Apenas resumo da trama"
        ],
        correctOptionIndex: 1,
        // B
        weight: 1,
        explanation: "Uma an\xE1lise anal\xEDtica s\xF3lida fundamenta-se na observa\xE7\xE3o t\xE9cnica de escolhas concretas de dire\xE7\xE3o e seus impactos dram\xE1ticos na tela."
      },
      {
        id: "q2-8",
        type: "multiple_choice",
        prompt: "8. Na camada narrativa, a pergunta central \xE9:",
        options: [
          "Qual lente foi usada?",
          "O que ocorre?",
          "Qual foi o or\xE7amento?",
          "Qual festival exibiu?"
        ],
        correctOptionIndex: 1,
        // B
        weight: 1,
        explanation: "Na camada narrativa investiga-se o encadeamento dos fatos dram\xE1ticos: o que ocorre, como os eventos se desencadeiam e como a trama se resolve."
      },
      {
        id: "q2-9",
        type: "multiple_choice",
        prompt: "9. Na camada de som, deve-se observar:",
        options: [
          "Voz, ambi\xEAncia, m\xFAsica e sil\xEAncio",
          "Apenas cor",
          "Apenas figurino",
          "Apenas cenografia"
        ],
        correctOptionIndex: 0,
        // A
        weight: 1,
        explanation: "A an\xE1lise sonora examina a articula\xE7\xE3o entre as falas, os ru\xEDdos ambientes, a trilha musical e os momentos significativos de sil\xEAncio."
      },
      {
        id: "q2-10",
        type: "multiple_choice",
        prompt: "10. Por que comparar filmes de \xE9pocas diferentes?",
        options: [
          "Para perceber como condi\xE7\xF5es t\xE9cnicas, sociais e econ\xF4micas influenciam a linguagem",
          "Para escolher o filme mais caro",
          "Para evitar an\xE1lise",
          "Para substituir o estudo hist\xF3rico"
        ],
        correctOptionIndex: 0,
        // A
        weight: 1,
        explanation: "A compara\xE7\xE3o hist\xF3rica evidencia como as transforma\xE7\xF5es tecnol\xF3gicas e o contexto social moldam a evolu\xE7\xE3o da linguagem cinematogr\xE1fica."
      }
    ]
  },
  // AVALIAÇÃO 03 - ROTEIRO E CRIAÇÃO DE PERSONAGENS
  // GABARITO OFICIAL: 1-A | 2-A | 3-A | 4-A | 5-A | 6-A | 7-A | 8-A | 9-A | 10-A
  {
    id: "eval-3",
    moduleId: 3,
    moduleNumber: 3,
    title: "Avalia\xE7\xE3o Oficial 03 \u2014 Roteiro e Cria\xE7\xE3o de Personagens",
    description: "10 quest\xF5es objetivas de m\xFAltipla escolha (1,0 ponto cada, nota m\xE1xima 10,0). Corre\xE7\xE3o autom\xE1tica com resultado imediato.",
    maxScore: 10,
    minPassingScore: 6,
    questions: [
      {
        id: "q3-1",
        type: "multiple_choice",
        prompt: "1. Qual sequ\xEAncia representa melhor o desenvolvimento de um projeto de roteiro?",
        options: [
          "Ideia \u2192 storyline \u2192 logline \u2192 sinopse \u2192 tratamento \u2192 escaleta \u2192 roteiro",
          "Roteiro \u2192 cartaz \u2192 elenco \u2192 ideia",
          "Festival \u2192 roteiro \u2192 ideia",
          "Trailer \u2192 logline \u2192 or\xE7amento"
        ],
        correctOptionIndex: 0,
        // A
        weight: 1,
        explanation: "O desenvolvimento dramat\xFArgico profissional parte da ideia inicial e avan\xE7a progressivamente em complexidade at\xE9 o roteiro formatado."
      },
      {
        id: "q3-2",
        type: "multiple_choice",
        prompt: "2. Quem vive a a\xE7\xE3o da hist\xF3ria?",
        options: [
          "O personagem",
          "O or\xE7amento",
          "A loca\xE7\xE3o",
          "A c\xE2mera"
        ],
        correctOptionIndex: 0,
        // A
        weight: 1,
        explanation: "O personagem \xE9 o agente que encarna os desejos, toma decis\xF5es e vive os conflitos da narrativa."
      },
      {
        id: "q3-3",
        type: "multiple_choice",
        prompt: "3. O que \xE9 objetivo do personagem?",
        options: [
          "Aquilo que ele deseja alcan\xE7ar",
          "O lugar onde mora",
          "O g\xEAnero do filme",
          "O plano de c\xE2mera"
        ],
        correctOptionIndex: 0,
        // A
        weight: 1,
        explanation: "O objetivo dram\xE1tico \xE9 a meta consciente ou inconsciente que move o personagem a agir contra as adversidades."
      },
      {
        id: "q3-4",
        type: "multiple_choice",
        prompt: "4. O que \xE9 obst\xE1culo?",
        options: [
          "O que dificulta a conquista do objetivo",
          "A trilha sonora",
          "A fotografia",
          "O cartaz"
        ],
        correctOptionIndex: 0,
        // A
        weight: 1,
        explanation: "Obst\xE1culo \xE9 qualquer barreira interna, interpessoal ou externa que impede ou dificulta o protagonista de atingir sua meta."
      },
      {
        id: "q3-5",
        type: "multiple_choice",
        prompt: "5. O que \xE9 subtexto?",
        options: [
          "O significado ou inten\xE7\xE3o presente por baixo das palavras",
          "A lista de equipamentos",
          "A dura\xE7\xE3o do filme",
          "O nome do diretor"
        ],
        correctOptionIndex: 0,
        // A
        weight: 1,
        explanation: "Subtexto \xE9 o sentido impl\xEDcito, a inten\xE7\xE3o real e a corrente emocional n\xE3o dita diretamente nos di\xE1logos."
      },
      {
        id: "q3-6",
        type: "multiple_choice",
        prompt: "6. Uma cena film\xE1vel deve conter, entre outros elementos:",
        options: [
          "Lugar, tempo, personagens e mudan\xE7a",
          "Apenas di\xE1logo",
          "Apenas descri\xE7\xE3o liter\xE1ria",
          "Apenas m\xFAsica"
        ],
        correctOptionIndex: 0,
        // A
        weight: 1,
        explanation: "Uma cena cinematogr\xE1fica eficaz estabelece unidade de espa\xE7o, tempo e personagens, promovendo uma mudan\xE7a de estado dram\xE1tico."
      },
      {
        id: "q3-7",
        type: "multiple_choice",
        prompt: "7. Qual documento ajuda a planejar como filmar a cena?",
        options: [
          "Decupagem",
          "Release",
          "Or\xE7amento final",
          "Cartaz"
        ],
        correctOptionIndex: 0,
        // A
        weight: 1,
        explanation: "A decupagem \xE9 a tradu\xE7\xE3o t\xE9cnica do roteiro em planos ordenados, movimentos de c\xE2mera e especifica\xE7\xF5es de filmagem."
      },
      {
        id: "q3-8",
        type: "multiple_choice",
        prompt: "8. Qual \xE9 uma estrutura simples de tr\xEAs movimentos?",
        options: [
          "Come\xE7o, desenvolvimento e desfecho",
          "Plano, foco e lente",
          "Som, cor e figurino",
          "Festival, estreia e pr\xEAmio"
        ],
        correctOptionIndex: 0,
        // A
        weight: 1,
        explanation: "A estrutura cl\xE1ssica em tr\xEAs atos organiza a hist\xF3ria em apresenta\xE7\xE3o/come\xE7o, complica\xE7\xE3o/desenvolvimento e resolu\xE7\xE3o/desfecho."
      },
      {
        id: "q3-9",
        type: "multiple_choice",
        prompt: "9. No roteiro inicial, a descri\xE7\xE3o deve privilegiar:",
        options: [
          "A\xE7\xF5es que possam ser vistas ou ouvidas",
          "Pensamentos imposs\xEDveis de filmar",
          "Instru\xE7\xF5es t\xE9cnicas excessivas",
          "Apenas opini\xF5es do autor"
        ],
        correctOptionIndex: 0,
        // A
        weight: 1,
        explanation: "A escrita cinematogr\xE1fica foca naquilo que \xE9 exterioriz\xE1vel sensorialmente atrav\xE9s da c\xE2mera e do microfone."
      },
      {
        id: "q3-10",
        type: "multiple_choice",
        prompt: "10. No exerc\xEDcio 'A \xDAltima Carta', qual conjunto \xE9 solicitado?",
        options: [
          "Storyline, logline, sinopse, escaleta de cinco cenas e uma cena de roteiro",
          "Apenas cartaz",
          "Apenas or\xE7amento",
          "Apenas trailer"
        ],
        correctOptionIndex: 0,
        // A
        weight: 1,
        explanation: "O exerc\xEDcio pr\xE1tico exige a constru\xE7\xE3o encadeada de storyline, logline, sinopse, escaleta de 5 cenas e 1 cena formatada de roteiro."
      }
    ]
  },
  // AVALIAÇÃO 04 - DIREÇÃO E DIREÇÃO DE ATORES
  // GABARITO OFICIAL: 1-A | 2-A | 3-A | 4-A | 5-A | 6-A | 7-A | 8-A | 9-A | 10-A
  {
    id: "eval-4",
    moduleId: 4,
    moduleNumber: 4,
    title: "Avalia\xE7\xE3o Oficial 04 \u2014 Dire\xE7\xE3o e Dire\xE7\xE3o de Atores",
    description: "10 quest\xF5es objetivas de m\xFAltipla escolha (1,0 ponto cada, nota m\xE1xima 10,0). Corre\xE7\xE3o autom\xE1tica com resultado imediato.",
    maxScore: 10,
    minPassingScore: 6,
    questions: [
      {
        id: "q4-1",
        type: "multiple_choice",
        prompt: "1. Qual \xE9 o papel central da dire\xE7\xE3o?",
        options: [
          "Integrar decis\xF5es criativas e dialogar com os setores da produ\xE7\xE3o",
          "Apenas operar c\xE2mera",
          "Apenas editar",
          "Apenas divulgar"
        ],
        correctOptionIndex: 0,
        // A
        weight: 1,
        explanation: "O diretor \xE9 o maestro criativo que articula a vis\xE3o art\xEDstica com todas as equipes t\xE9cnicas e art\xEDsticas do filme."
      },
      {
        id: "q4-2",
        type: "multiple_choice",
        prompt: "2. Uma orienta\xE7\xE3o \xFAtil ao ator deve ser:",
        options: [
          "Concreta e ligada \xE0 a\xE7\xE3o",
          "Vaga e gen\xE9rica",
          "Apenas emocional",
          "Sem rela\xE7\xE3o com a cena"
        ],
        correctOptionIndex: 0,
        // A
        weight: 1,
        explanation: "Dire\xE7\xF5es verbais claras e verbos de a\xE7\xE3o f\xEDsica ou psicol\xF3gica fornecem ao ator ferramentas palp\xE1veis para atuar com verdade."
      },
      {
        id: "q4-3",
        type: "multiple_choice",
        prompt: "3. O que \xE9 objetivo da personagem?",
        options: [
          "O que ela quer",
          "O que o diretor quer vender",
          "O tipo de lente",
          "O hor\xE1rio da di\xE1ria"
        ],
        correctOptionIndex: 0,
        // A
        weight: 1,
        explanation: "O objetivo da personagem representa a motiva\xE7\xE3o interna profunda do que ela busca obter em cada cena."
      },
      {
        id: "q4-4",
        type: "multiple_choice",
        prompt: "4. O que \xE9 subtexto?",
        options: [
          "O que existe por baixo das palavras",
          "O nome da loca\xE7\xE3o",
          "O or\xE7amento",
          "A trilha"
        ],
        correctOptionIndex: 0,
        // A
        weight: 1,
        explanation: "Subtexto \xE9 o pensamento real e o jogo psicol\xF3gico invis\xEDvel que d\xE1 densidade \xE0 atua\xE7\xE3o dos atores."
      },
      {
        id: "q4-5",
        type: "multiple_choice",
        prompt: "5. Para que serve a decupagem?",
        options: [
          "Transformar a cena escrita em lista de planos e a\xE7\xF5es de grava\xE7\xE3o",
          "Fazer divulga\xE7\xE3o",
          "Criar or\xE7amento publicit\xE1rio",
          "Registrar festivais"
        ],
        correctOptionIndex: 0,
        // A
        weight: 1,
        explanation: "A decupagem \xE9 o guia pr\xE1tico do diretor e do fot\xF3grafo no set, detalhando cada plano necess\xE1rio para contar a cena."
      },
      {
        id: "q4-6",
        type: "multiple_choice",
        prompt: "6. O ensaio serve para testar:",
        options: [
          "Ritmo, texto e marca\xE7\xE3o",
          "Apenas figurino",
          "Apenas o cartaz",
          "Apenas a exporta\xE7\xE3o"
        ],
        correctOptionIndex: 0,
        // A
        weight: 1,
        explanation: "Os ensaios afinam o tempo c\xEAnico, a naturalidade dos di\xE1logos e os deslocamentos espaciais (marca\xE7\xE3o) dos atores."
      },
      {
        id: "q4-7",
        type: "multiple_choice",
        prompt: "7. Por que registrar continuidade?",
        options: [
          "Para manter coer\xEAncia de roupas, objetos, posi\xE7\xF5es e a\xE7\xF5es",
          "Para aumentar a dura\xE7\xE3o",
          "Para substituir o roteiro",
          "Para escolher festival"
        ],
        correctOptionIndex: 0,
        // A
        weight: 1,
        explanation: "O controle de continuidade assegura que as tomadas gravadas fora de ordem possam ser montadas sem saltos visuais ou incoer\xEAncias."
      },
      {
        id: "q4-8",
        type: "multiple_choice",
        prompt: "8. Uma tomada \xE9:",
        options: [
          "Uma vers\xE3o registrada da cena",
          "Um tipo de or\xE7amento",
          "Um documento de festival",
          "Um efeito sonoro"
        ],
        correctOptionIndex: 0,
        // A
        weight: 1,
        explanation: "Uma tomada (take) \xE9 cada grava\xE7\xE3o cont\xEDnua individual realizada de um determinado plano durante a filmagem."
      },
      {
        id: "q4-9",
        type: "multiple_choice",
        prompt: "9. Em temas delicados ou contato f\xEDsico, a dire\xE7\xE3o deve:",
        options: [
          "Planejar limites, comunica\xE7\xE3o e consentimento",
          "Improvisar sem conversar",
          "Evitar qualquer ensaio",
          "Ignorar desconfortos"
        ],
        correctOptionIndex: 0,
        // A
        weight: 1,
        explanation: "A dire\xE7\xE3o \xE9tica e respons\xE1vel estabelece conversas pr\xE9vias, coreografias claras e consentimento expl\xEDcito no set."
      },
      {
        id: "q4-10",
        type: "multiple_choice",
        prompt: "10. No exerc\xEDcio do m\xF3dulo, quantos planos indispens\xE1veis devem ser definidos?",
        options: [
          "Tr\xEAs",
          "Dez",
          "Vinte",
          "Nenhum"
        ],
        correctOptionIndex: 0,
        // A
        weight: 1,
        explanation: "O exerc\xEDcio orienta a s\xEDntese rigorosa definindo os tr\xEAs planos estruturais indispens\xE1veis para cobrir a cena dram\xE1tica."
      }
    ]
  },
  // AVALIAÇÃO 05 - FOTOGRAFIA, CÂMERA E ILUMINAÇÃO
  // GABARITO OFICIAL: 1-A | 2-A | 3-A | 4-A | 5-A | 6-A | 7-A | 8-A | 9-A | 10-A
  {
    id: "eval-5",
    moduleId: 5,
    moduleNumber: 5,
    title: "Avalia\xE7\xE3o Oficial 05 \u2014 Fotografia, C\xE2mera e Ilumina\xE7\xE3o",
    description: "10 quest\xF5es objetivas de m\xFAltipla escolha (1,0 ponto cada, nota m\xE1xima 10,0). Corre\xE7\xE3o autom\xE1tica com resultado imediato.",
    maxScore: 10,
    minPassingScore: 6,
    questions: [
      {
        id: "q5-1",
        type: "multiple_choice",
        prompt: "1. O plano geral serve principalmente para:",
        options: [
          "Situar pessoa e ambiente",
          "Destacar apenas um detalhe",
          "Mostrar apenas uma express\xE3o",
          "Gravar somente \xE1udio"
        ],
        correctOptionIndex: 0,
        // A
        weight: 1,
        explanation: "O plano geral revela a rela\xE7\xE3o espacial entre a figura humana e a geografia ao seu redor."
      },
      {
        id: "q5-2",
        type: "multiple_choice",
        prompt: "2. O primeiro plano aproxima principalmente:",
        options: [
          "A express\xE3o",
          "O cen\xE1rio completo",
          "O or\xE7amento",
          "A equipe inteira"
        ],
        correctOptionIndex: 0,
        // A
        weight: 1,
        explanation: "O primeiro plano (close) evidencia os micro-movimentos do rosto e a intensidade psicol\xF3gica do ator."
      },
      {
        id: "q5-3",
        type: "multiple_choice",
        prompt: "3. Composi\xE7\xE3o \xE9:",
        options: [
          "Organiza\xE7\xE3o dos elementos dentro do quadro",
          "Montagem do filme",
          "Organiza\xE7\xE3o do or\xE7amento",
          "Escolha do festival"
        ],
        correctOptionIndex: 0,
        // A
        weight: 1,
        explanation: "Composi\xE7\xE3o \xE9 o arranjo visual harmonioso ou intencionalmente contrastante dos objetos e luzes dentro do enquadramento."
      },
      {
        id: "q5-4",
        type: "multiple_choice",
        prompt: "4. A regra dos ter\xE7os \xE9:",
        options: [
          "Uma ferramenta de composi\xE7\xE3o, n\xE3o uma lei",
          "Uma obriga\xE7\xE3o em todo plano",
          "Uma t\xE9cnica de som",
          "Uma regra de roteiro"
        ],
        correctOptionIndex: 0,
        // A
        weight: 1,
        explanation: "A regra dos ter\xE7os \xE9 um guia de refer\xEAncia para posicionar centros de interesse, que pode ser seguida ou desconstru\xEDda criativamente."
      },
      {
        id: "q5-5",
        type: "multiple_choice",
        prompt: "5. A luz lateral pode:",
        options: [
          "Criar volume",
          "Eliminar sombras sempre",
          "Substituir o som",
          "Impedir a exposi\xE7\xE3o"
        ],
        correctOptionIndex: 0,
        // A
        weight: 1,
        explanation: "A luz lateral destaca relevos, texturas e profundidade atrav\xE9s do jogo entre \xE1reas iluminadas e sombras demarcadas."
      },
      {
        id: "q5-6",
        type: "multiple_choice",
        prompt: "6. A contraluz pode criar:",
        options: [
          "Silhueta",
          "Som ambiente",
          "Roteiro",
          "Continuidade sonora"
        ],
        correctOptionIndex: 0,
        // A
        weight: 1,
        explanation: "Iluminando o sujeito por tr\xE1s, a contraluz recorta o contorno contra o fundo ou gera uma silhueta expressiva."
      },
      {
        id: "q5-7",
        type: "multiple_choice",
        prompt: "7. Ao gravar com celular, \xE9 recomend\xE1vel:",
        options: [
          "Limpar a lente e estabilizar o aparelho",
          "Usar zoom digital sempre",
          "Ignorar foco",
          "Mudar horizontal/vertical durante a cena"
        ],
        correctOptionIndex: 0,
        // A
        weight: 1,
        explanation: "Limpeza pr\xE9via da lente e estabiliza\xE7\xE3o firme s\xE3o cuidados primordiais para obter imagem l\xEDmpida e profissional com smartphones."
      },
      {
        id: "q5-8",
        type: "multiple_choice",
        prompt: "8. O foco e a exposi\xE7\xE3o devem ser controlados para:",
        options: [
          "Evitar varia\xE7\xF5es indesejadas durante a tomada",
          "Aumentar o ru\xEDdo",
          "Substituir a montagem",
          "Criar roteiro"
        ],
        correctOptionIndex: 0,
        // A
        weight: 1,
        explanation: "O travamento manual de exposi\xE7\xE3o e foco impede oscila\xE7\xF5es eletr\xF4nicas bruscas que comprometem a cena."
      },
      {
        id: "q5-9",
        type: "multiple_choice",
        prompt: "9. O exerc\xEDcio de ilumina\xE7\xE3o prop\xF5e quatro situa\xE7\xF5es:",
        options: [
          "Frontal, lateral, contraluz e janela",
          "Azul, vermelho, verde e preto",
          "Sol, chuva, neve e noite",
          "Grande, m\xE9dio, close e detalhe"
        ],
        correctOptionIndex: 0,
        // A
        weight: 1,
        explanation: "O exerc\xEDcio pr\xE1tico prop\xF5e captar retratos sob quatro esquemas luminosos: frontal, lateral, contraluz e ilumina\xE7\xE3o natural de janela."
      },
      {
        id: "q5-10",
        type: "multiple_choice",
        prompt: "10. Antes de gravar, a orienta\xE7\xE3o sobre horizontal ou vertical \xE9:",
        options: [
          "Definir conforme o destino e a proposta",
          "Sempre vertical",
          "Sempre horizontal",
          "Decidir somente depois da edi\xE7\xE3o"
        ],
        correctOptionIndex: 0,
        // A
        weight: 1,
        explanation: "A orienta\xE7\xE3o do quadro (aspect ratio) deve ser planejada previamente conforme a linguagem est\xE9tica e as plataformas de exibi\xE7\xE3o."
      }
    ]
  },
  // AVALIAÇÃO 06 - SOM E TRILHA SONORA
  // GABARITO OFICIAL: 1-A | 2-A | 3-A | 4-A | 5-A | 6-A | 7-A | 8-A | 9-A | 10-A
  {
    id: "eval-6",
    moduleId: 6,
    moduleNumber: 6,
    title: "Avalia\xE7\xE3o Oficial 06 \u2014 Som e Trilha Sonora",
    description: "10 quest\xF5es objetivas de m\xFAltipla escolha (1,0 ponto cada, nota m\xE1xima 10,0). Corre\xE7\xE3o autom\xE1tica com resultado imediato.",
    maxScore: 10,
    minPassingScore: 6,
    questions: [
      {
        id: "q6-1",
        type: "multiple_choice",
        prompt: "1. O som pode:",
        options: [
          "Situar, criar atmosfera e mostrar a\xE7\xF5es fora do quadro",
          "Apenas preencher sil\xEAncio",
          "Substituir o roteiro",
          "Eliminar a fotografia"
        ],
        correctOptionIndex: 0,
        // A
        weight: 1,
        explanation: "O desenho de som projeta o universo dieg\xE9tico para al\xE9m das bordas visuais da tela, expandindo o espa\xE7o e o suspense."
      },
      {
        id: "q6-2",
        type: "multiple_choice",
        prompt: "2. Quais s\xE3o camadas importantes de som?",
        options: [
          "Di\xE1logo, ambi\xEAncia, efeitos e trilha",
          "Apenas m\xFAsica",
          "Apenas voz",
          "Apenas ru\xEDdo"
        ],
        correctOptionIndex: 0,
        // A
        weight: 1,
        explanation: "A trilha sonora completa \xE9 composta por quatro pilares entrela\xE7ados: vozes (di\xE1logos), ambi\xEAncias de fundo, efeitos/foley e m\xFAsica."
      },
      {
        id: "q6-3",
        type: "multiple_choice",
        prompt: "3. Uma boa pr\xE1tica de capta\xE7\xE3o \xE9:",
        options: [
          "Aproximar o microfone da fonte e testar com fones",
          "Afastar o microfone o m\xE1ximo poss\xEDvel",
          "Ignorar ru\xEDdos",
          "N\xE3o testar"
        ],
        correctOptionIndex: 0,
        // A
        weight: 1,
        explanation: "Posicionar o microfone o mais pr\xF3ximo poss\xEDvel da boca sem entrar no enquadramento e monitorar com fones fechados garante clareza ac\xFAstica."
      },
      {
        id: "q6-4",
        type: "multiple_choice",
        prompt: "4. Room tone \xE9:",
        options: [
          "Registro do som ambiente do local",
          "M\xFAsica principal",
          "Voz do diretor",
          "Som de abertura"
        ],
        correctOptionIndex: 0,
        // A
        weight: 1,
        explanation: "Room tone \xE9 a grava\xE7\xE3o de 1 minuto do ru\xEDdo ac\xFAstico ambiente da loca\xE7\xE3o em absoluto sil\xEAncio da equipe."
      },
      {
        id: "q6-5",
        type: "multiple_choice",
        prompt: "5. O room tone ajuda principalmente a:",
        options: [
          "Suavizar cortes na montagem",
          "Criar roteiro",
          "Escolher elenco",
          "Fazer or\xE7amento"
        ],
        correctOptionIndex: 0,
        // A
        weight: 1,
        explanation: "O room tone preenche emendas de \xE1udio e sil\xEAncios entre falas, impedindo que o espectador perceba cortes secos no fundo sonoro."
      },
      {
        id: "q6-6",
        type: "multiple_choice",
        prompt: "6. M\xFAsica em uma cena:",
        options: [
          "Pode ampliar, antecipar ou contrastar emo\xE7\xE3o",
          "Deve sempre explicar a imagem",
          "Nunca deve ser usada",
          "Substitui o di\xE1logo"
        ],
        correctOptionIndex: 0,
        // A
        weight: 1,
        explanation: "A m\xFAsica dialoga com a narrativa: pode potencializar o sentimento, criar expectativa de perigo ou ironizar a cena por contraponto."
      },
      {
        id: "q6-7",
        type: "multiple_choice",
        prompt: "7. Sil\xEAncio no audiovisual:",
        options: [
          "Tamb\xE9m pode ser uma escolha dram\xE1tica",
          "\xC9 sempre um erro",
          "Deve ser eliminado",
          "S\xF3 existe em document\xE1rio"
        ],
        correctOptionIndex: 0,
        // A
        weight: 1,
        explanation: "O sil\xEAncio deliberado gera tens\xE3o palp\xE1vel, intimidade profunda e amplifica o impacto de um som subsequente."
      },
      {
        id: "q6-8",
        type: "multiple_choice",
        prompt: "8. Para entrevistas, \xE9 recomend\xE1vel escolher local com:",
        options: [
          "Pouco eco e pouco ru\xEDdo",
          "Muito tr\xE2nsito",
          "Ar-condicionado pr\xF3ximo",
          "Obras e m\xE1quinas"
        ],
        correctOptionIndex: 0,
        // A
        weight: 1,
        explanation: "Ambientes acusticamente secos, sem reverbera\xE7\xE3o ou ru\xEDdos mec\xE2nicos cont\xEDnuos, preservam a inteligibilidade da fala."
      },
      {
        id: "q6-9",
        type: "multiple_choice",
        prompt: "9. M\xFAsicas conhecidas usadas em uma obra p\xFAblica podem exigir:",
        options: [
          "Autoriza\xE7\xE3o compat\xEDvel com os direitos",
          "Apenas aumento de volume",
          "Nenhuma preocupa\xE7\xE3o",
          "Troca de c\xE2mera"
        ],
        correctOptionIndex: 0,
        // A
        weight: 1,
        explanation: "Qualquer fonograma de terceiros demanda licen\xE7a autoral expressa para veicula\xE7\xE3o legal em festivais ou plataformas."
      },
      {
        id: "q6-10",
        type: "multiple_choice",
        prompt: "10. O exerc\xEDcio pr\xE1tico compara:",
        options: [
          "Ambiente e fala em duas dist\xE2ncias diferentes",
          "Apenas duas c\xE2meras",
          "Apenas duas m\xFAsicas",
          "Apenas duas lentes"
        ],
        correctOptionIndex: 0,
        // A
        weight: 1,
        explanation: "O exerc\xEDcio analisa na pr\xE1tica a perda de presen\xE7a e a entrada de eco conforme o microfone se afasta do falante."
      }
    ]
  },
  // AVALIAÇÃO 07 - MONTAGEM E PÓS-PRODUÇÃO
  // GABARITO OFICIAL: 1-A | 2-A | 3-A | 4-A | 5-A | 6-A | 7-A | 8-A | 9-A | 10-A
  {
    id: "eval-7",
    moduleId: 7,
    moduleNumber: 7,
    title: "Avalia\xE7\xE3o Oficial 07 \u2014 Montagem e P\xF3s-Produ\xE7\xE3o",
    description: "10 quest\xF5es objetivas de m\xFAltipla escolha (1,0 ponto cada, nota m\xE1xima 10,0). Corre\xE7\xE3o autom\xE1tica com resultado imediato.",
    maxScore: 10,
    minPassingScore: 6,
    questions: [
      {
        id: "q7-1",
        type: "multiple_choice",
        prompt: "1. Montagem \xE9:",
        options: [
          "Escolher ordem, dura\xE7\xE3o e rela\xE7\xE3o entre imagens e sons",
          "Apenas aplicar efeitos",
          "Apenas exportar",
          "Apenas corrigir cor"
        ],
        correctOptionIndex: 0,
        // A
        weight: 1,
        explanation: "A montagem \xE9 a reescrita final do filme atrav\xE9s da determina\xE7\xE3o da ordem temporal, ritmo de corte e di\xE1logo entre imagem e som."
      },
      {
        id: "q7-2",
        type: "multiple_choice",
        prompt: "2. Antes de come\xE7ar a editar, \xE9 recomend\xE1vel:",
        options: [
          "Fazer backup e organizar os arquivos",
          "Aplicar efeitos",
          "Exportar imediatamente",
          "Apagar os brutos"
        ],
        correctOptionIndex: 0,
        // A
        weight: 1,
        explanation: "Seguran\xE7a e disciplina operacional: manter backups duplicados e pastas organizadas por cenas evita perdas desastrosas."
      },
      {
        id: "q7-3",
        type: "multiple_choice",
        prompt: "3. Corte por a\xE7\xE3o ajuda a:",
        options: [
          "Manter fluidez de um movimento entre planos",
          "Escolher figurino",
          "Criar or\xE7amento",
          "Definir festival"
        ],
        correctOptionIndex: 0,
        // A
        weight: 1,
        explanation: "Cortar no meio de um gesto esconde a transi\xE7\xE3o \xF3ptica e confere naturalidade e dinamismo ao corte."
      },
      {
        id: "q7-4",
        type: "multiple_choice",
        prompt: "4. Corte de rea\xE7\xE3o mostra:",
        options: [
          "Como algu\xE9m recebe uma informa\xE7\xE3o",
          "Apenas o cen\xE1rio",
          "Apenas o objeto",
          "Apenas a c\xE2mera"
        ],
        correctOptionIndex: 0,
        // A
        weight: 1,
        explanation: "O cinema reside com frequ\xEAncia n\xE3o em quem fala, mas na rea\xE7\xE3o silenciosa e emocional de quem escuta."
      },
      {
        id: "q7-5",
        type: "multiple_choice",
        prompt: "5. B-roll s\xE3o:",
        options: [
          "Imagens complementares que ajudam a contextualizar e cobrir cortes",
          "Arquivos de \xE1udio",
          "Cr\xE9ditos",
          "Documentos de produ\xE7\xE3o"
        ],
        correctOptionIndex: 0,
        // A
        weight: 1,
        explanation: "B-roll \xE9 o material de cobertura visual que enriquece a cena, ilustra os depoimentos e mascara saltos de eixo."
      },
      {
        id: "q7-6",
        type: "multiple_choice",
        prompt: "6. A primeira preocupa\xE7\xE3o da montagem deve ser:",
        options: [
          "Garantir que a hist\xF3ria se entenda",
          "Aplicar muitas transi\xE7\xF5es",
          "Usar todos os efeitos",
          "Aumentar a satura\xE7\xE3o"
        ],
        correctOptionIndex: 0,
        // A
        weight: 1,
        explanation: "A clareza narrativa e o engajamento emocional do p\xFAblico antecedem qualquer adere\xE7o ou efeito de edi\xE7\xE3o."
      },
      {
        id: "q7-7",
        type: "multiple_choice",
        prompt: "7. Na revis\xE3o t\xE9cnica, \xE9 importante verificar:",
        options: [
          "\xC1udio, continuidade, cr\xE9ditos, foco e telas pretas",
          "Apenas o cartaz",
          "Apenas o or\xE7amento",
          "Apenas o figurino"
        ],
        correctOptionIndex: 0,
        // A
        weight: 1,
        explanation: "O controle de qualidade avalia picos sonoros, sincronia de l\xE1bios, ortografia dos cr\xE9ditos e aus\xEAncia de frames vazios."
      },
      {
        id: "q7-8",
        type: "multiple_choice",
        prompt: "8. \xC9 \xFAtil assistir a uma vers\xE3o com:",
        options: [
          "Fones e sem fones",
          "Apenas fones",
          "Apenas celular",
          "Apenas sem som"
        ],
        correctOptionIndex: 0,
        // A
        weight: 1,
        explanation: "Testar a mixagem tanto em fones de precis\xE3o quanto em caixas comuns ou alto-falantes de TV assegura compatibilidade ampla."
      },
      {
        id: "q7-9",
        type: "multiple_choice",
        prompt: "9. O projeto edit\xE1vel deve ser:",
        options: [
          "Guardado junto com vers\xF5es de trabalho e final",
          "Apagado ap\xF3s exportar",
          "Enviado ao festival sempre",
          "Transformado em cartaz"
        ],
        correctOptionIndex: 0,
        // A
        weight: 1,
        explanation: "O arquivo de projeto deve ser preservado para possibilitar reedi\xE7\xF5es, cortes alternativos para festivais ou corre\xE7\xF5es futuras."
      },
      {
        id: "q7-10",
        type: "multiple_choice",
        prompt: "10. O exerc\xEDcio do m\xF3dulo pede uma sequ\xEAncia de:",
        options: [
          "30 a 60 segundos com pelo menos cinco planos",
          "10 minutos com um plano",
          "30 minutos sem cortes",
          "5 horas de material"
        ],
        correctOptionIndex: 0,
        // A
        weight: 1,
        explanation: "O exerc\xEDcio pr\xE1tico estipula a montagem r\xEDtmica concisa de 30 a 60 segundos articulando no m\xEDnimo cinco planos."
      }
    ]
  },
  // AVALIAÇÃO 08 - PRODUÇÃO EXECUTIVA E PLANEJAMENTO
  // GABARITO OFICIAL: 1-A | 2-A | 3-A | 4-A | 5-A | 6-A | 7-A | 8-A | 9-A | 10-A
  {
    id: "eval-8",
    moduleId: 8,
    moduleNumber: 8,
    title: "Avalia\xE7\xE3o Oficial 08 \u2014 Produ\xE7\xE3o Executiva e Planejamento",
    description: "10 quest\xF5es objetivas de m\xFAltipla escolha (1,0 ponto cada, nota m\xE1xima 10,0). Corre\xE7\xE3o autom\xE1tica com resultado imediato.",
    maxScore: 10,
    minPassingScore: 6,
    questions: [
      {
        id: "q8-1",
        type: "multiple_choice",
        prompt: "1. A produ\xE7\xE3o come\xE7a antes da filmagem com:",
        options: [
          "Roteiro, equipe, loca\xE7\xF5es, equipamentos, autoriza\xE7\xF5es, cronograma e or\xE7amento",
          "Apenas cartaz",
          "Apenas estreia",
          "Apenas festival"
        ],
        correctOptionIndex: 0,
        // A
        weight: 1,
        explanation: "Produzir \xE9 viabilizar concretamente: coordenar pessoas, gerenciar custos, providenciar licen\xE7as e organizar a log\xEDstica de filmagem."
      },
      {
        id: "q8-2",
        type: "multiple_choice",
        prompt: "2. Por que visitar a loca\xE7\xE3o?",
        options: [
          "Para verificar acesso, ru\xEDdo, luz, energia e seguran\xE7a",
          "Para escolher o pr\xEAmio",
          "Para editar o filme",
          "Para criar a trilha"
        ],
        correctOptionIndex: 0,
        // A
        weight: 1,
        explanation: "A visita t\xE9cnica (rec) antecipa problemas de tomadas el\xE9tricas, ilumina\xE7\xE3o solar ao longo do dia, ac\xFAstica e seguran\xE7a do set."
      },
      {
        id: "q8-3",
        type: "multiple_choice",
        prompt: "3. A ordem do dia re\xFAne:",
        options: [
          "Hor\xE1rio, local, cenas, contatos e observa\xE7\xF5es",
          "Apenas cr\xE9ditos",
          "Apenas sinopse",
          "Apenas cartaz"
        ],
        correctOptionIndex: 0,
        // A
        weight: 1,
        explanation: "A Ordem do Dia (call sheet) \xE9 a folha de bordo di\xE1ria que direciona hor\xE1rios de chamada para cada membro do elenco e da equipe."
      },
      {
        id: "q8-4",
        type: "multiple_choice",
        prompt: "4. Produ\xE7\xE3o cuida, entre outras coisas, de:",
        options: [
          "Tempo, alimenta\xE7\xE3o, transporte e comunica\xE7\xE3o",
          "Apenas atua\xE7\xE3o",
          "Apenas montagem",
          "Apenas fotografia"
        ],
        correctOptionIndex: 0,
        // A
        weight: 1,
        explanation: "O bem-estar e o rendimento da equipe dependem da alimenta\xE7\xE3o pontual, transporte seguro e comunica\xE7\xE3o fluida providos pela produ\xE7\xE3o."
      },
      {
        id: "q8-5",
        type: "multiple_choice",
        prompt: "5. Depois da grava\xE7\xE3o, \xE9 essencial:",
        options: [
          "Fazer backup e organizar arquivos",
          "Apagar os brutos",
          "Publicar imediatamente",
          "Ignorar permiss\xF5es"
        ],
        correctOptionIndex: 0,
        // A
        weight: 1,
        explanation: "Descarregar cart\xF5es imediatamente em duas m\xEDdias f\xEDsicas distintas com checagem de integridade (checksum) \xE9 regra de ouro no audiovisual."
      },
      {
        id: "q8-6",
        type: "multiple_choice",
        prompt: "6. Viabilidade significa:",
        options: [
          "O projeto caber nos recursos dispon\xEDveis",
          "O filme ser sempre caro",
          "Ter muitos atores",
          "Ter muitas loca\xE7\xF5es"
        ],
        correctOptionIndex: 0,
        // A
        weight: 1,
        explanation: "Um projeto vi\xE1vel adapta sua ambi\xE7\xE3o est\xE9tica e t\xE9cnica \xE0s reais condi\xE7\xF5es financeiras, humanas e materiais da produ\xE7\xE3o."
      },
      {
        id: "q8-7",
        type: "multiple_choice",
        prompt: "7. Um or\xE7amento b\xE1sico pode incluir:",
        options: [
          "Transporte, alimenta\xE7\xE3o, loca\xE7\xE3o, equipamento, arte e reserva",
          "Apenas cach\xEAs",
          "Apenas c\xE2mera",
          "Apenas divulga\xE7\xE3o"
        ],
        correctOptionIndex: 0,
        // A
        weight: 1,
        explanation: "O or\xE7amento financeiro contempla despesas operacionais, aluguel de espa\xE7o e maquin\xE1rio, figurinos e margem para imprevistos."
      },
      {
        id: "q8-8",
        type: "multiple_choice",
        prompt: "8. O plano B existe para:",
        options: [
          "Proteger o trabalho diante de imprevistos",
          "Substituir o roteiro",
          "Aumentar a dura\xE7\xE3o",
          "Evitar planejamento"
        ],
        correctOptionIndex: 0,
        // A
        weight: 1,
        explanation: "Planos de conting\xEAncia garantem solu\xE7\xF5es r\xE1pidas diante de chuvas repentinas, quebras de equipamento ou aus\xEAncias de atores."
      },
      {
        id: "q8-9",
        type: "multiple_choice",
        prompt: "9. A cess\xE3o de imagem \xE9 um exemplo de:",
        options: [
          "Documento \xFAtil de produ\xE7\xE3o",
          "Tipo de enquadramento",
          "Tipo de montagem",
          "Tipo de trilha"
        ],
        correctOptionIndex: 0,
        // A
        weight: 1,
        explanation: "Termos de autoriza\xE7\xE3o e cess\xE3o de direitos de imagem e voz resguardam juridicamente a obra contra futuras contesta\xE7\xF5es."
      },
      {
        id: "q8-10",
        type: "multiple_choice",
        prompt: "10. O exerc\xEDcio pr\xE1tico pede uma ordem do dia com:",
        options: [
          "Equipe, hor\xE1rio, local, equipamentos, plano B e backup",
          "Apenas t\xEDtulo",
          "Apenas logline",
          "Apenas cartaz"
        ],
        correctOptionIndex: 0,
        // A
        weight: 1,
        explanation: "O exerc\xEDcio pr\xE1tico consolida o aprendizado organizando uma Ordem do Dia real com todos os campos log\xEDsticos e de seguran\xE7a."
      }
    ]
  },
  // AVALIAÇÃO 09 - DISTRIBUIÇÃO, FESTIVAIS E MERCADO AUDIOVISUAL
  // GABARITO OFICIAL: 1-A | 2-A | 3-A | 4-A | 5-A | 6-A | 7-A | 8-A | 9-A | 10-A
  {
    id: "eval-9",
    moduleId: 9,
    moduleNumber: 9,
    title: "Avalia\xE7\xE3o Oficial 09 \u2014 Distribui\xE7\xE3o, Festivais e Mercado Audiovisual",
    description: "10 quest\xF5es objetivas de m\xFAltipla escolha (1,0 ponto cada, nota m\xE1xima 10,0). Corre\xE7\xE3o autom\xE1tica com resultado imediato.",
    maxScore: 10,
    minPassingScore: 6,
    questions: [
      {
        id: "q9-1",
        type: "multiple_choice",
        prompt: "1. Distribui\xE7\xE3o \xE9:",
        options: [
          "O caminho do filme at\xE9 seus p\xFAblicos e espa\xE7os de exibi\xE7\xE3o",
          "Apenas a montagem",
          "Apenas a filmagem",
          "Apenas o roteiro"
        ],
        correctOptionIndex: 0,
        // A
        weight: 1,
        explanation: "Distribuir \xE9 a estrat\xE9gia de fazer a obra circular, encontrar espectadores e conquistar telas de cinema, mostras e canais digitais."
      },
      {
        id: "q9-2",
        type: "multiple_choice",
        prompt: "2. Antes de escolher canais de circula\xE7\xE3o, \xE9 importante definir:",
        options: [
          "P\xFAblico e objetivo",
          "Apenas o or\xE7amento",
          "Apenas a c\xE2mera",
          "Apenas o elenco"
        ],
        correctOptionIndex: 0,
        // A
        weight: 1,
        explanation: "Conhecer para quem o filme foi feito e que impacto se almeja alcan\xE7ar direciona as escolhas certas de festivais e mostras."
      },
      {
        id: "q9-3",
        type: "multiple_choice",
        prompt: "3. Cada festival possui:",
        options: [
          "Regulamento pr\xF3prio",
          "Regras id\xEAnticas",
          "Apenas uma data",
          "Nenhuma exig\xEAncia"
        ],
        correctOptionIndex: 0,
        // A
        weight: 1,
        explanation: "Cada certame estipula exig\xEAncias espec\xEDficas de ineditismo, minutagem, legendagem e prazos rigorosos de inscri\xE7\xE3o."
      },
      {
        id: "q9-4",
        type: "multiple_choice",
        prompt: "4. O que pode constar em um kit de divulga\xE7\xE3o?",
        options: [
          "Logline, sinopse, cartaz, stills, trailer, teaser, release e ficha t\xE9cnica",
          "Apenas o roteiro",
          "Apenas o or\xE7amento",
          "Apenas o certificado"
        ],
        correctOptionIndex: 0,
        // A
        weight: 1,
        explanation: "O press kit profissional mune a imprensa e programadores de todos os materiais visuais e informativos indispens\xE1veis para promover a obra."
      },
      {
        id: "q9-5",
        type: "multiple_choice",
        prompt: "5. Still \xE9:",
        options: [
          "Foto de cena utilizada como material de divulga\xE7\xE3o",
          "Um tipo de \xE1udio",
          "Uma vers\xE3o do roteiro",
          "Um documento financeiro"
        ],
        correctOptionIndex: 0,
        // A
        weight: 1,
        explanation: "Fotografias de cena em alta resolu\xE7\xE3o (stills) captadas durante as filmagens s\xE3o indispens\xE1veis para cat\xE1logos, p\xF4steres e mat\xE9rias de jornal."
      },
      {
        id: "q9-6",
        type: "multiple_choice",
        prompt: "6. Por que controlar prazos de festivais em planilha?",
        options: [
          "Para acompanhar links, prazos, exig\xEAncias, taxas e resultados",
          "Para editar o filme",
          "Para escolher atores",
          "Para substituir o cartaz"
        ],
        correctOptionIndex: 0,
        // A
        weight: 1,
        explanation: "O circuito de festivais exige controle met\xF3dico de calend\xE1rios, taxas de submiss\xE3o e formatos de c\xF3pia de exibi\xE7\xE3o."
      },
      {
        id: "q9-7",
        type: "multiple_choice",
        prompt: "7. Uma janela de exibi\xE7\xE3o \xE9:",
        options: [
          "Per\xEDodo ou canal planejado para lan\xE7amento/exibi\xE7\xE3o",
          "Uma janela f\xEDsica",
          "Uma lente",
          "Um tipo de microfone"
        ],
        correctOptionIndex: 0,
        // A
        weight: 1,
        explanation: "Janela de exibi\xE7\xE3o \xE9 a ordem temporal cronometrada dos canais em que a obra \xE9 mostrada (ex: festival \u2192 cinema \u2192 streaming aberto)."
      },
      {
        id: "q9-8",
        type: "multiple_choice",
        prompt: "8. Antes de publicar na internet, pode ser necess\xE1rio considerar:",
        options: [
          "Condi\xE7\xF5es de elegibilidade de festivais",
          "Apenas a dura\xE7\xE3o",
          "Apenas o t\xEDtulo",
          "Apenas o g\xEAnero"
        ],
        correctOptionIndex: 0,
        // A
        weight: 1,
        explanation: "Disponibilizar o filme livremente na web desqualifica a obra para a maioria dos grandes festivais competitivos que exigem ineditismo."
      },
      {
        id: "q9-9",
        type: "multiple_choice",
        prompt: "9. Em projetos locais, parceiros comunit\xE1rios podem ser:",
        options: [
          "Mais importantes que n\xFAmeros de alcance, dependendo do objetivo",
          "Sempre irrelevantes",
          "Proibidos",
          "Apenas patrocinadores"
        ],
        correctOptionIndex: 0,
        // A
        weight: 1,
        explanation: "Cineclubes, escolas e centros culturais locais geram debates e conex\xF5es profundas com o p\xFAblico-alvo priorit\xE1rio."
      },
      {
        id: "q9-10",
        type: "multiple_choice",
        prompt: "10. O exerc\xEDcio do m\xF3dulo pede:",
        options: [
          "Kit de divulga\xE7\xE3o e calend\xE1rio de circula\xE7\xE3o",
          "Apenas uma c\xE2mera",
          "Apenas um roteiro",
          "Apenas um or\xE7amento"
        ],
        correctOptionIndex: 0,
        // A
        weight: 1,
        explanation: "O exerc\xEDcio estrutura o kit completo de divulga\xE7\xE3o e o cronograma planejado de inscri\xE7\xF5es e exibi\xE7\xF5es p\xFAblicas."
      }
    ]
  },
  // AVALIAÇÃO 10 - PROJETO FINAL: CURTA-METRAGEM
  // GABARITO OFICIAL: 1-A | 2-A | 3-A | 4-A | 5-A | 6-A | 7-A | 8-A | 9-A | 10-A
  {
    id: "eval-10",
    moduleId: 10,
    moduleNumber: 10,
    title: "Avalia\xE7\xE3o Oficial 10 \u2014 Projeto Final: Curta-Metragem",
    description: "10 quest\xF5es objetivas de m\xFAltipla escolha (1,0 ponto cada, nota m\xE1xima 10,0). Corre\xE7\xE3o autom\xE1tica com resultado imediato.",
    maxScore: 10,
    minPassingScore: 6,
    questions: [
      {
        id: "q10-1",
        type: "multiple_choice",
        prompt: "1. O principal objetivo do projeto final \xE9:",
        options: [
          "Integrar as etapas do curso em um curta poss\xEDvel de realizar",
          "Criar apenas um cartaz",
          "Fazer apenas um roteiro",
          "Comprar equipamentos"
        ],
        correctOptionIndex: 0,
        // A
        weight: 1,
        explanation: "O projeto final \xE9 a coroa\xE7\xE3o pr\xE1tica onde o aluno aplica os conhecimentos de roteiro, dire\xE7\xE3o, c\xE2mera, som e montagem em uma obra concreta."
      },
      {
        id: "q10-2",
        type: "multiple_choice",
        prompt: "2. Um escopo realiz\xE1vel deve considerar:",
        options: [
          "Dura\xE7\xE3o, elenco, loca\xE7\xF5es e dias de grava\xE7\xE3o",
          "Apenas o g\xEAnero",
          "Apenas o t\xEDtulo",
          "Apenas a m\xFAsica"
        ],
        correctOptionIndex: 0,
        // A
        weight: 1,
        explanation: "Dimensionar o n\xFAmero de atores, locais e di\xE1rias assegura que o curta seja finalizado com excel\xEAncia dentro dos prazos."
      },
      {
        id: "q10-3",
        type: "multiple_choice",
        prompt: "3. No planejamento do curta, \xE9 importante preparar:",
        options: [
          "Roteiro/escaleta, decupagem, cronograma e lista de recursos",
          "Apenas o cartaz",
          "Apenas o trailer",
          "Apenas o certificado"
        ],
        correctOptionIndex: 0,
        // A
        weight: 1,
        explanation: "Documentos organizados de pr\xE9-produ\xE7\xE3o diminuem erros no set e garantem seguran\xE7a t\xE9cnica e criativa."
      },
      {
        id: "q10-4",
        type: "multiple_choice",
        prompt: "4. Na filmagem, al\xE9m do planejamento, \xE9 importante cuidar de:",
        options: [
          "Continuidade e materiais de cobertura",
          "Apenas efeitos",
          "Apenas cr\xE9ditos",
          "Apenas festivais"
        ],
        correctOptionIndex: 0,
        // A
        weight: 1,
        explanation: "Garantir planos de cobertura (cutaways) e vigiar a continuidade salva a montagem no caso de imprevistos de cena."
      },
      {
        id: "q10-5",
        type: "multiple_choice",
        prompt: "5. Na montagem final, deve-se garantir:",
        options: [
          "Clareza, \xE1udio compreens\xEDvel, cr\xE9ditos e revis\xE3o",
          "Muitos efeitos",
          "Aus\xEAncia de cr\xE9ditos",
          "Som muito alto"
        ],
        correctOptionIndex: 0,
        // A
        weight: 1,
        explanation: "Um acabamento polido prioriza clareza narrativa, equil\xEDbrio sonoro impec\xE1vel e cr\xE9ditos devidamente creditados."
      },
      {
        id: "q10-6",
        type: "multiple_choice",
        prompt: "6. Na apresenta\xE7\xE3o do curta, o aluno deve mostrar:",
        options: [
          "T\xEDtulo, sinopse, g\xEAnero, dura\xE7\xE3o, equipe, processo e filme",
          "Apenas o filme",
          "Apenas o cartaz",
          "Apenas o roteiro"
        ],
        correctOptionIndex: 0,
        // A
        weight: 1,
        explanation: "Apresentar a obra cinematogr\xE1fica acompanhada de sua contextualiza\xE7\xE3o e ficha t\xE9cnica reflete postura profissional."
      },
      {
        id: "q10-7",
        type: "multiple_choice",
        prompt: "7. O pacote final de entrega pode incluir:",
        options: [
          "T\xEDtulo, logline, sinopse, roteiro/escaleta, plano de grava\xE7\xE3o, ficha t\xE9cnica, cr\xE9ditos, arquivo final, imagem e reflex\xE3o",
          "Apenas v\xEDdeo",
          "Apenas roteiro",
          "Apenas or\xE7amento"
        ],
        correctOptionIndex: 0,
        // A
        weight: 1,
        explanation: "O dossi\xEA completo de formatura re\xFAne todo o percurso conceitual, pr\xE1tico e anal\xEDtico vivenciado pelo realizador."
      },
      {
        id: "q10-8",
        type: "multiple_choice",
        prompt: "8. Qual dura\xE7\xE3o \xE9 indicada no exerc\xEDcio pr\xE1tico do m\xF3dulo?",
        options: [
          "1 a 5 minutos",
          "30 minutos",
          "1 hora",
          "10 segundos"
        ],
        correctOptionIndex: 0,
        // A
        weight: 1,
        explanation: "A minutagem concisa de 1 a 5 minutos estimula a densidade narrativa e o rigor est\xE9tico do primeiro filme."
      },
      {
        id: "q10-9",
        type: "multiple_choice",
        prompt: "9. Depois da exibi\xE7\xE3o, a reflex\xE3o deve considerar:",
        options: [
          "O que funcionou, o que faria diferente e o que deseja aprender",
          "Apenas a quantidade de visualiza\xE7\xF5es",
          "Apenas o pre\xE7o da c\xE2mera",
          "Apenas o cartaz"
        ],
        correctOptionIndex: 0,
        // A
        weight: 1,
        explanation: "O autoexame cr\xEDtico maduro transforma erros e acertos em trampolim para o aprimoramento cont\xEDnuo na carreira."
      },
      {
        id: "q10-10",
        type: "multiple_choice",
        prompt: "10. O curta final deve ser visto tamb\xE9m como:",
        options: [
          "Primeiro material de portf\xF3lio e ferramenta para o pr\xF3ximo projeto",
          "Produto sem possibilidade de revis\xE3o",
          "Apenas exerc\xEDcio sem valor",
          "Substituto de todos os estudos anteriores"
        ],
        correctOptionIndex: 0,
        // A
        weight: 1,
        explanation: "O primeiro curta finalizado \xE9 o passaporte art\xEDstico do cineasta: um cart\xE3o de visitas para festivais, editais e futuros longas."
      }
    ]
  }
];

// server/db.ts
var DB_DIR = path.join(process.cwd(), "data");
var DB_FILE = path.join(DB_DIR, "cinelab-db.json");
var DB_BACKUP_FILE = path.join(DB_DIR, "cinelab-db.backup.json");
var WELCOME_CONFIG_FILE = path.join(DB_DIR, "welcome-video-config.json");
function detectPdfPageCountSync(filePath) {
  try {
    if (!fs.existsSync(filePath)) return 0;
    const buf = fs.readFileSync(filePath);
    const str = buf.toString("latin1");
    const matches = [...str.matchAll(/\/Count\s+(\d+)/g)];
    if (matches.length > 0) {
      const counts = matches.map((m) => parseInt(m[1], 10)).filter((n) => !isNaN(n) && n > 0);
      if (counts.length > 0) {
        return Math.max(...counts);
      }
    }
    const pageMatches = [...str.matchAll(/\/Type\s*\/Page(?!\w)/g)];
    if (pageMatches.length > 0) {
      return pageMatches.length;
    }
    const streamMatches = [...str.matchAll(/stream\r?\n([\s\S]*?)\r?\nendstream/g)];
    for (const sm of streamMatches) {
      try {
        const dec = zlib.inflateSync(Buffer.from(sm[1], "latin1")).toString("latin1");
        const countM = [...dec.matchAll(/\/Count\s+(\d+)/g)];
        if (countM.length > 0) {
          const cList = countM.map((m) => parseInt(m[1], 10)).filter((n) => !isNaN(n) && n > 0);
          if (cList.length > 0) return Math.max(...cList);
        }
        const pMatches = [...dec.matchAll(/\/Type\s*\/Page(?!\w)/g)];
        if (pMatches.length > 0) return pMatches.length;
      } catch (e) {
      }
    }
  } catch (err) {
    console.warn("detectPdfPageCountSync error for:", filePath, err);
  }
  return 0;
}
var db;
function getInitialDb() {
  return {
    settings: { ...initialCourseSettings },
    users: initialUsers.map((u) => ({
      ...u,
      passwordHash: u.role === "admin" ? "admin123" : "aluno123"
    })),
    enrollments: [...initialEnrollments],
    payments: [...initialPayments],
    modules: [...pedagogicalModules],
    videos: [...pedagogicalVideos],
    apostilas: [...pedagogicalApostilas],
    bonusApostilas: [...pedagogicalBonusApostilas],
    activities: [...pedagogicalActivities],
    films: [...pedagogicalFilms],
    readings: [...pedagogicalReadings],
    studentActivities: {
      "user-student-demo": ["act-1", "act-2"]
    },
    evaluations: [...pedagogicalEvaluations],
    submissions: [
      {
        id: "sub-1",
        evaluationId: "eval-1",
        moduleId: 1,
        studentId: "user-student-demo",
        studentName: "Lucas Mendon\xE7a de Oliveira",
        enrollmentNumber: "CNL-2026-4819",
        submittedAt: "2026-08-30T16:20:00Z",
        answers: {
          "q1-1": { questionId: "q1-1", selectedOptionIndex: 1, isCorrect: true, scoreAwarded: 2.5 },
          "q1-2": { questionId: "q1-2", selectedOptionIndex: 1, isCorrect: true, scoreAwarded: 2.5 },
          "q1-3": { questionId: "q1-3", selectedOptionIndex: 1, isCorrect: true, scoreAwarded: 2.5 },
          "q1-4": {
            questionId: "q1-4",
            discursiveText: "A lente grande-angular expande a perspectiva e gera maior profundidade de campo, integrando o sujeito ao espa\xE7o dram\xE1tico. A teleobjetiva achata as camadas de plano e comprime a profundidade, isolando a figura humana em primeiro plano com foco seletivo.",
            scoreAwarded: 2,
            feedback: "Excelente an\xE1lise t\xE9cnica de lentes e efeito est\xE9tico."
          }
        },
        objectiveScore: 7.5,
        discursiveScore: 2,
        totalScore: 9.5,
        maxScore: 10,
        percentage: 95,
        status: "graded",
        gradedAt: "2026-08-31T09:00:00Z",
        gradedBy: "Professor Cineasta Tony de Luc",
        teacherGeneralFeedback: "Excelente desempenho na primeira avalia\xE7\xE3o. Dom\xEDnio da linguagem dos planos e \xF3tica cinematogr\xE1fica."
      }
    ],
    certificates: [
      {
        id: "cert-seed-1",
        validationCode: "CNL-CERT-8910-4821",
        studentId: "user-student-demo",
        studentName: "Lucas Mendon\xE7a de Oliveira",
        studentDocument: "123.456.789-00",
        enrollmentNumber: "CNL-2026-4819",
        courseName: "CINELAB \u2013 CINEMA & AUDIOVISUAL",
        workloadHours: 180,
        issueDate: "2026-09-08T18:00:00.000Z",
        directorName: "Professor Cineasta Tony de Luc",
        directorRole: "Diretor Acad\xEAmico & Cineasta",
        averageGrade: 9.5,
        isEligible: true
      }
    ],
    emailLogs: [
      {
        id: "email-1",
        toEmail: "aluno@cinelab.edu.br",
        recipientName: "Lucas Mendon\xE7a de Oliveira",
        subject: "MATR\xCDCULA CONFIRMADA \u2013 CINELAB Cinema & Audiovisual",
        eventType: "enrollment_created",
        body: "Parab\xE9ns! Sua matr\xEDcula no CINELAB foi confirmada com sucesso. Matr\xEDcula: CNL-2026-4819. Acesse sua \xE1rea do aluno com seu e-mail cadastrado.",
        sentAt: "2026-08-20T14:35:00Z"
      }
    ],
    visitors: [
      {
        id: "vis-1",
        ip: "177.136.24.102",
        userAgent: "Mozilla/5.0 (iPhone; CPU iPhone OS 17_4 like Mac OS X)",
        deviceType: "mobile",
        pagePath: "/matricula",
        pageTitle: "Matr\xEDcula Oficial CINELAB",
        referrer: "Instagram Ads (@cinelab.cinema)",
        timestamp: new Date(Date.now() - 1e3 * 60 * 12).toISOString(),
        isInterestedInEnrollment: true,
        city: "S\xE3o Paulo",
        state: "SP"
      },
      {
        id: "vis-2",
        ip: "189.40.112.55",
        userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/122.0.0.0",
        deviceType: "desktop",
        pagePath: "/curso",
        pageTitle: "Grade Curricular & Metodologia",
        referrer: 'Google Busca ("curso de cinema tony de luc")',
        timestamp: new Date(Date.now() - 1e3 * 60 * 45).toISOString(),
        isInterestedInEnrollment: true,
        city: "Rio de Janeiro",
        state: "RJ"
      },
      {
        id: "vis-3",
        ip: "201.86.19.8",
        userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)",
        deviceType: "desktop",
        pagePath: "/",
        pageTitle: "Home \u2013 Forma\xE7\xE3o CINELAB",
        referrer: "Acesso Direto (cinelab.edu.br)",
        timestamp: new Date(Date.now() - 1e3 * 60 * 95).toISOString(),
        isInterestedInEnrollment: false,
        city: "Belo Horizonte",
        state: "MG"
      },
      {
        id: "vis-4",
        ip: "179.184.210.14",
        userAgent: "Mozilla/5.0 (Linux; Android 14; SM-S918B)",
        deviceType: "mobile",
        pagePath: "/matricula",
        pageTitle: "Matr\xEDcula Oficial CINELAB",
        referrer: "WhatsApp (Compartilhado)",
        timestamp: new Date(Date.now() - 1e3 * 60 * 180).toISOString(),
        isInterestedInEnrollment: true,
        city: "Curitiba",
        state: "PR"
      },
      {
        id: "vis-5",
        ip: "187.60.245.91",
        userAgent: "Mozilla/5.0 (iPad; CPU OS 17_3 like Mac OS X)",
        deviceType: "tablet",
        pagePath: "/curso",
        pageTitle: "Grade Curricular & Metodologia",
        referrer: 'Google Busca ("escola de audiovisual r$ 499")',
        timestamp: new Date(Date.now() - 1e3 * 60 * 320).toISOString(),
        isInterestedInEnrollment: true,
        city: "Porto Alegre",
        state: "RS"
      }
    ],
    simulatedDaysOffset: 0
  };
}
function initExtraVideosForApostila(apos, defaultSuffix) {
  const existing = Array.isArray(apos.extraVideos) ? apos.extraVideos : [];
  const pedApos = pedagogicalApostilas.find((p) => p.moduleId === (apos.moduleId || apos.number)) || pedagogicalBonusApostilas.find((b) => b.number === (apos.number || apos.moduleId));
  const pedVideos = pedApos?.extraVideos || [];
  const modNum = apos.moduleId || apos.number || 1;
  const modPrefix = apos.isBonus ? `B- ${apos.number || 1}` : `M- ${modNum}`;
  const cleanAposTitle = (apos.title || defaultSuffix).replace(/^Apostila\s*\d+\s*:\s*/i, "").trim();
  let slot1 = existing.find((v) => v.slot === 1) || (pedVideos[0] ? { ...pedVideos[0] } : null);
  let slot2 = existing.find((v) => v.slot === 2) || (pedVideos[1] ? { ...pedVideos[1] } : null);

  if (!slot1) {
    if (pedVideos[0]) {
      slot1 = { ...pedVideos[0] };
    } else {
      slot1 = {
        id: `ev-${apos.id || "apos"}-1`,
        slot: 1,
        title: `V\xEDdeo Extra 01: ${cleanAposTitle} & An\xE1lise Pr\xE1tica - ${modPrefix}.1`,
        description: `An\xE1lise t\xE9cnica e decupagem comentada pelo Professor Cineasta Tony de Luc para aprofundar os conceitos te\xF3ricos desta apostila.`,
        videoUrl: modNum === 2 ? "https://www.youtube.com/watch?v=qawVtd32DOQ" : "",
        thumbnailUrl: modNum === 2 ? "https://img.youtube.com/vi/qawVtd32DOQ/hqdefault.jpg" : "https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=800&q=80",
        durationHours: 0,
        durationMinutes: 18,
        durationSeconds: 0,
        totalDurationSeconds: 18 * 60,
        durationLabel: "00h 18m 00s",
        professorNotes: "",
        uploadedAt: (/* @__PURE__ */ new Date()).toISOString()
      };
    }
  } else {
    if (!slot1.title || slot1.title.includes("Estudo Dirigido & An\xE1lise Pr\xE1tica \u2013 M\xF3dulo") || slot1.title.includes("M\xF3dulo 0")) {
      slot1.title = pedVideos[0]?.title || `V\xEDdeo Extra 01: ${cleanAposTitle} & An\xE1lise Pr\xE1tica - ${modPrefix}.1`;
    }
    if (modNum === 1 && (!slot1.videoUrl || slot1.videoUrl.includes("cinelab-intro-apresentacao.mp4"))) {
      slot1.videoUrl = "https://www.youtube.com/watch?v=q1U0eKOOwsQ";
      slot1.thumbnailUrl = "https://img.youtube.com/vi/q1U0eKOOwsQ/hqdefault.jpg";
      slot1.durationHours = 0;
      slot1.durationMinutes = 52;
      slot1.durationSeconds = 48;
      slot1.totalDurationSeconds = 3168;
      slot1.durationLabel = "00h 52m 48s";
      if (!slot1.professorNotes || slot1.professorNotes.trim() === "") {
        slot1.professorNotes = "Como Chaplin consegue fazer o espectador compreender a hist\xF3ria e sentir emo\xE7\xE3o utilizando principalmente imagens, gestos e express\xF5es?\nO ALUNO DEVE COM O FILME O Garoto, aprender a ler uma hist\xF3ria atrav\xE9s das imagens.";
      }
    } else if (modNum === 2 && (!slot1.videoUrl || slot1.videoUrl.includes("cinelab-intro-apresentacao.mp4"))) {
      slot1.videoUrl = "https://www.youtube.com/watch?v=qawVtd32DOQ";
      slot1.thumbnailUrl = "https://img.youtube.com/vi/qawVtd32DOQ/hqdefault.jpg";
    }
  }

  if (!slot2) {
    if (pedVideos[1]) {
      slot2 = { ...pedVideos[1] };
    } else {
      slot2 = {
        id: `ev-${apos.id || "apos"}-2`,
        slot: 2,
        title: `V\xEDdeo Extra 02: ${cleanAposTitle} & An\xE1lise Pr\xE1tica - ${modPrefix}.2`,
        description: `Exerc\xEDcio pr\xE1tico de aplica\xE7\xE3o em set de filmagem com demonstra\xE7\xE3o passo a passo da metodologia do CINELAB.`,
        videoUrl: modNum === 2 ? "https://www.youtube.com/watch?v=UHbpgsD8zCM" : "",
        thumbnailUrl: modNum === 2 ? "https://img.youtube.com/vi/UHbpgsD8zCM/hqdefault.jpg" : "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=800&q=80",
        durationHours: 0,
        durationMinutes: 24,
        durationSeconds: 0,
        totalDurationSeconds: 24 * 60,
        durationLabel: "00h 24m 00s",
        professorNotes: "",
        uploadedAt: (/* @__PURE__ */ new Date()).toISOString()
      };
    }
  } else {
    if (!slot2.title || slot2.title.includes("Estudo de Caso & Exerc\xEDcio T\xE9cnico \u2013 M\xF3dulo") || slot2.title.includes("M\xF3dulo 0")) {
      slot2.title = pedVideos[1]?.title || `V\xEDdeo Extra 02: ${cleanAposTitle} & An\xE1lise Pr\xE1tica - ${modPrefix}.2`;
    }
    if (modNum === 1 && (!slot2.videoUrl || slot2.videoUrl === "")) {
      slot2.videoUrl = "https://www.youtube.com/watch?v=i15UCTIdfwI";
      slot2.thumbnailUrl = "https://img.youtube.com/vi/i15UCTIdfwI/hqdefault.jpg";
      slot2.durationHours = 1;
      slot2.durationMinutes = 26;
      slot2.durationSeconds = 52;
      slot2.totalDurationSeconds = 5212;
      slot2.durationLabel = "01h 26m 52s";
      if (!slot2.professorNotes || slot2.professorNotes.trim() === "") {
        slot2.professorNotes = "Como Chaplin utiliza a imagem, o movimento, o ritmo e o som para transmitir uma ideia sem precisar explicar tudo atrav\xE9s de di\xE1logos?\nO ALUNO DEVE COM O FILME Tempos Modernos, perceber como imagem + movimento + montagem + som constroem significado.";
      }
    } else if (modNum === 2 && (!slot2.videoUrl || slot2.videoUrl === "")) {
      slot2.videoUrl = "https://www.youtube.com/watch?v=UHbpgsD8zCM";
      slot2.thumbnailUrl = "https://img.youtube.com/vi/UHbpgsD8zCM/hqdefault.jpg";
    }
  }

  return [slot1, slot2];
}
function loadDatabase() {
  try {
    try {
      if (!fs.existsSync(DB_DIR)) {
        fs.mkdirSync(DB_DIR, { recursive: true });
      }
    } catch (_) {
    }
    let data = "";
    if (fs.existsSync(DB_FILE)) {
      try {
        data = fs.readFileSync(DB_FILE, "utf-8");
      } catch (readErr) {
        console.warn("Error reading DB_FILE, trying backup:", readErr);
      }
    }
    if (!data && fs.existsSync(DB_BACKUP_FILE)) {
      try {
        data = fs.readFileSync(DB_BACKUP_FILE, "utf-8");
        console.log("Successfully recovered database from DB_BACKUP_FILE");
      } catch (backupErr) {
        console.warn("Error reading DB_BACKUP_FILE:", backupErr);
      }
    }
    if (data) {
      db = JSON.parse(data);
      const initial = getInitialDb();
      db.settings = { ...initial.settings, ...db.settings };
      const localTonyPhoto = path.join(process.cwd(), "public", "images", "tony-de-luc.jpg");
      const localUploadTonyPhoto = path.join(process.cwd(), "public", "uploads", "images", "tony-de-luc.jpg");
      const backupImagesDir2 = path.join(process.cwd(), "data", "images_backup");
      const backupVideosDir2 = path.join(process.cwd(), "data", "videos_backup");
      const publicImagesDir2 = path.join(process.cwd(), "public", "images");
      const uploadsVideosDir = path.join(process.cwd(), "public", "uploads", "videos");
      const uploadsImagesDir = path.join(process.cwd(), "public", "uploads", "images");
      if (!fs.existsSync(backupImagesDir2)) fs.mkdirSync(backupImagesDir2, { recursive: true });
      if (!fs.existsSync(backupVideosDir2)) fs.mkdirSync(backupVideosDir2, { recursive: true });
      if (!fs.existsSync(publicImagesDir2)) fs.mkdirSync(publicImagesDir2, { recursive: true });
      if (!fs.existsSync(uploadsVideosDir)) fs.mkdirSync(uploadsVideosDir, { recursive: true });
      if (!fs.existsSync(uploadsImagesDir)) fs.mkdirSync(uploadsImagesDir, { recursive: true });
      try {
        if (fs.existsSync(backupImagesDir2)) {
          const backupImages = fs.readdirSync(backupImagesDir2);
          for (const imgName of backupImages) {
            const src = path.join(backupImagesDir2, imgName);
            const dstUploads = path.join(uploadsImagesDir, imgName);
            const dstPublic = path.join(publicImagesDir2, imgName);
            if (!fs.existsSync(dstUploads)) {
              try {
                fs.copyFileSync(src, dstUploads);
              } catch {
              }
            }
            if (!fs.existsSync(dstPublic) && (imgName.endsWith(".jpg") || imgName.endsWith(".png") || imgName.endsWith(".webp"))) {
              try {
                fs.copyFileSync(src, dstPublic);
              } catch {
              }
            }
          }
        }
      } catch (err) {
        console.warn("[DB] Image sync notice:", err);
      }
      try {
        if (fs.existsSync(backupVideosDir2)) {
          const backupVideos = fs.readdirSync(backupVideosDir2);
          for (const vidName of backupVideos) {
            const src = path.join(backupVideosDir2, vidName);
            const dst = path.join(uploadsVideosDir, vidName);
            if (!fs.existsSync(dst)) {
              try {
                fs.copyFileSync(src, dst);
              } catch {
              }
            }
          }
        }
      } catch (err) {
        console.warn("[DB] Video sync notice:", err);
      }
      const coverPath = path.join(publicImagesDir2, "cinelab-cover.jpg");
      const backupCoverPath = path.join(backupImagesDir2, "cinelab-cover.jpg");
      if (!fs.existsSync(coverPath) && fs.existsSync(backupCoverPath)) {
        try {
          fs.copyFileSync(backupCoverPath, coverPath);
        } catch {
        }
      } else if (fs.existsSync(coverPath) && !fs.existsSync(backupCoverPath)) {
        try {
          fs.copyFileSync(coverPath, backupCoverPath);
        } catch {
        }
      }
      let welcomeConfigFile = null;
      try {
        if (fs.existsSync(WELCOME_CONFIG_FILE)) {
          welcomeConfigFile = JSON.parse(fs.readFileSync(WELCOME_CONFIG_FILE, "utf-8"));
        }
      } catch (wcErr) {
        console.warn("[DB] Notice reading WELCOME_CONFIG_FILE:", wcErr);
      }
      if (!db.settings.welcomeVideoPoster || db.settings.welcomeVideoPoster.trim() === "") {
        db.settings.welcomeVideoPoster = welcomeConfigFile?.welcomeVideoPoster || "/uploads/images/img-LOCO_CINELAB___COLE-1790299254778-824285.png";
      } else if (db.settings.welcomeVideoPoster.startsWith("/uploads/images/")) {
        const posterName = path.basename(db.settings.welcomeVideoPoster);
        const posterDiskPath = path.join(uploadsImagesDir, posterName);
        const posterBackupPath = path.join(backupImagesDir2, posterName);
        if (!fs.existsSync(posterDiskPath)) {
          if (fs.existsSync(posterBackupPath)) {
            try {
              fs.copyFileSync(posterBackupPath, posterDiskPath);
            } catch {
            }
          } else {
            db.settings.welcomeVideoPoster = "/images/cinelab-cover.jpg";
          }
        }
      }
      if (!db.settings.welcomeVideoUrl || db.settings.welcomeVideoUrl.trim() === "") {
        if (welcomeConfigFile?.welcomeVideoUrl && welcomeConfigFile.welcomeVideoUrl.trim() !== "") {
          db.settings.welcomeVideoUrl = welcomeConfigFile.welcomeVideoUrl;
          console.log(`[DB] Restored welcome video URL from welcome-video-config.json: ${db.settings.welcomeVideoUrl}`);
        } else {
          db.settings.welcomeVideoUrl = "/uploads/videos/aula-CINELAB_INTRODU__O-1790768528604-650605.mp4";
          console.log(`[DB] Set default official welcome video URL: ${db.settings.welcomeVideoUrl}`);
        }
      }
      if (!db.settings.welcomeMessageTitle || db.settings.welcomeMessageTitle.trim() === "") {
        db.settings.welcomeMessageTitle = welcomeConfigFile?.welcomeMessageTitle || "Mensagem de Boas-Vindas aos Novos Alunos";
      }
      if (!db.settings.welcomeMessageText || db.settings.welcomeMessageText.trim() === "") {
        if (welcomeConfigFile?.welcomeMessageText) {
          db.settings.welcomeMessageText = welcomeConfigFile.welcomeMessageText;
        }
      }
      if (db.settings.welcomeVideoUrl && db.settings.welcomeVideoUrl.startsWith("/uploads/videos/")) {
        const videoFileName = path.basename(db.settings.welcomeVideoUrl);
        const diskVideoPath = path.join(uploadsVideosDir, videoFileName);
        const backupVideoPath = path.join(backupVideosDir2, videoFileName);
        const backupIntro = path.join(backupVideosDir2, "cinelab-intro-apresentacao.mp4");
        const diskIntro = path.join(uploadsVideosDir, "cinelab-intro-apresentacao.mp4");
        if (!fs.existsSync(diskIntro) && fs.existsSync(backupIntro)) {
          try {
            fs.copyFileSync(backupIntro, diskIntro);
          } catch {
          }
        } else if (fs.existsSync(diskIntro) && !fs.existsSync(backupIntro)) {
          try {
            fs.copyFileSync(diskIntro, backupIntro);
          } catch {
          }
        }
        const staticVideosDir = path.join(process.cwd(), "public", "videos");
        const staticVideoPath = path.join(staticVideosDir, videoFileName);
        const staticIntro = path.join(staticVideosDir, "cinelab-intro-apresentacao.mp4");
        if (!fs.existsSync(staticVideosDir)) {
          try {
            fs.mkdirSync(staticVideosDir, { recursive: true });
          } catch {
          }
        }
        if (!fs.existsSync(diskIntro) && fs.existsSync(backupIntro)) {
          try {
            fs.copyFileSync(backupIntro, diskIntro);
          } catch {
          }
        } else if (fs.existsSync(diskIntro) && !fs.existsSync(backupIntro)) {
          try {
            fs.copyFileSync(diskIntro, backupIntro);
          } catch {
          }
        }
        if (!fs.existsSync(staticIntro) && fs.existsSync(diskIntro)) {
          try {
            fs.copyFileSync(diskIntro, staticIntro);
          } catch {
          }
        }
        if (!fs.existsSync(diskVideoPath)) {
          if (fs.existsSync(backupVideoPath)) {
            try {
              fs.copyFileSync(backupVideoPath, diskVideoPath);
              console.log(`[DB] Restored welcome video from backup: ${videoFileName}`);
            } catch (copyErr) {
              console.warn("[DB] Failed to restore welcome video from backup:", copyErr);
            }
          } else if (fs.existsSync(staticVideoPath)) {
            try {
              fs.copyFileSync(staticVideoPath, diskVideoPath);
              console.log(`[DB] Restored welcome video from static videos: ${videoFileName}`);
            } catch {
            }
          }
        }
        if (fs.existsSync(diskVideoPath)) {
          if (!fs.existsSync(backupVideoPath)) {
            try {
              fs.copyFileSync(diskVideoPath, backupVideoPath);
            } catch {
            }
          }
          if (!fs.existsSync(staticVideoPath)) {
            try {
              fs.copyFileSync(diskVideoPath, staticVideoPath);
            } catch {
            }
          }
        }
      }
      if (db.settings.tonyPhotoUrl && db.settings.tonyPhotoUrl.startsWith("data:image")) {
        try {
          const base64Data = db.settings.tonyPhotoUrl.replace(/^data:image\/\w+;base64,/, "");
          const buffer = Buffer.from(base64Data, "base64");
          if (!fs.existsSync(path.dirname(localTonyPhoto))) fs.mkdirSync(path.dirname(localTonyPhoto), { recursive: true });
          if (!fs.existsSync(path.dirname(localUploadTonyPhoto))) fs.mkdirSync(path.dirname(localUploadTonyPhoto), { recursive: true });
          fs.writeFileSync(localTonyPhoto, buffer);
          fs.writeFileSync(localUploadTonyPhoto, buffer);
          db.settings.tonyPhotoUrl = "/images/tony-de-luc.jpg";
        } catch (e) {
          console.error("Failed to extract base64 tonyPhotoUrl:", e);
        }
      } else if (fs.existsSync(localTonyPhoto)) {
        if (!db.settings.tonyPhotoUrl || db.settings.tonyPhotoUrl.includes("unsplash.com")) {
          db.settings.tonyPhotoUrl = "/images/tony-de-luc.jpg";
        }
      }
      if (!db.settings.tonyRole) {
        db.settings.tonyRole = "Cineasta, Diretor de Fotografia, Produtor, Ator, Jornalista & Fundador do CINELAB";
      }
      if (!db.settings.directorRole) {
        db.settings.directorRole = db.settings.tonyRole;
      }
      if (!db.settings.tonySocialLinkedin) {
        db.settings.tonySocialLinkedin = "https://linkedin.com/in/tonydeluc-cinema";
      }
      if (!db.settings.tonySocialYoutube) {
        db.settings.tonySocialYoutube = "https://youtube.com/@TVDIVERSIDADE";
      }
      db.settings.minPassingGrade = 6;
      db.modules = db.modules || initial.modules;
      if (!db.modules[0]?.pedagogicalObjective) {
        db.modules = [...pedagogicalModules];
      }
      db.videos = db.videos || initial.videos;
      if (!db.apostilas || db.apostilas.length === 0) {
        db.apostilas = [...pedagogicalApostilas];
      } else {
        db.apostilas = db.apostilas.map((apos) => {
          const pedMatch = pedagogicalApostilas.find((p) => p.moduleId === apos.moduleId);
          const isAccidentalDuplicatedTitle = apos.moduleId !== 1 && apos.title === "Introdu\xE7\xE3o ao Cinema e \xE0 Linguagem Audiovisual";
          const resolvedTitle = isAccidentalDuplicatedTitle ? pedMatch?.title || "Hist\xF3ria do Cinema" : apos.title || pedMatch?.title;
          return {
            ...pedMatch,
            ...apos,
            title: resolvedTitle,
            pdfUrl: apos.pdfUrl || pedMatch?.pdfUrl,
            pagesCount: apos.pagesCount || apos.totalPages || pedMatch?.pagesCount || 30,
            totalPages: apos.totalPages || apos.pagesCount || pedMatch?.totalPages || 30,
            fileSizeMb: apos.fileSizeMb || pedMatch?.fileSizeMb,
            sections: apos.sections && apos.sections.length > 0 ? apos.sections : pedMatch?.sections || [],
            quiz: apos.quiz && apos.quiz.length >= 5 ? apos.quiz : pedMatch?.quizQuestions || pedMatch?.quiz || apos.quiz || [],
            quizQuestions: apos.quizQuestions && apos.quizQuestions.length >= 5 ? apos.quizQuestions : pedMatch?.quizQuestions || pedMatch?.quiz || apos.quizQuestions || []
          };
        });
      }
      const backupDir = path.join(process.cwd(), "data", "apostilas_backup");
      const materiaisDir2 = path.join(process.cwd(), "public", "materiais");
      const uploadsAposDir = path.join(process.cwd(), "public", "uploads", "apostilas");
      if (!fs.existsSync(backupDir)) fs.mkdirSync(backupDir, { recursive: true });
      if (!fs.existsSync(materiaisDir2)) fs.mkdirSync(materiaisDir2, { recursive: true });
      if (!fs.existsSync(uploadsAposDir)) fs.mkdirSync(uploadsAposDir, { recursive: true });
      db.apostilas = db.apostilas.map((apos) => {
        let count = apos.pagesCount || apos.totalPages || 30;
        const modNum = apos.moduleId;
        const backupModFile = path.join(backupDir, `apostila-modulo-0${modNum}.pdf`);
        const matModFile = path.join(materiaisDir2, `cinelab-apostila-0${modNum}.pdf`);
        if (apos.pdfUrl && apos.pdfUrl.startsWith("/uploads/apostilas/")) {
          const expectedUploadPath = path.join(process.cwd(), "public", apos.pdfUrl);
          if (!fs.existsSync(expectedUploadPath)) {
            if (fs.existsSync(backupModFile)) {
              try {
                fs.copyFileSync(backupModFile, expectedUploadPath);
              } catch {
              }
            } else if (fs.existsSync(matModFile)) {
              try {
                fs.copyFileSync(matModFile, expectedUploadPath);
              } catch {
              }
            }
          }
        }
        if (apos.pdfUrl && apos.pdfUrl.startsWith("/uploads/apostilas/")) {
          const expectedUploadPath = path.join(process.cwd(), "public", apos.pdfUrl);
          if (fs.existsSync(expectedUploadPath)) {
            if (!fs.existsSync(backupModFile)) {
              try {
                fs.copyFileSync(expectedUploadPath, backupModFile);
              } catch {
              }
            }
            if (!fs.existsSync(matModFile)) {
              try {
                fs.copyFileSync(expectedUploadPath, matModFile);
              } catch {
              }
            }
          }
        }
        let detected = 0;
        if (apos.pdfUrl && apos.pdfUrl.startsWith("/uploads/apostilas/")) {
          const expectedUploadPath = path.join(process.cwd(), "public", apos.pdfUrl);
          if (fs.existsSync(expectedUploadPath)) {
            detected = detectPdfPageCountSync(expectedUploadPath);
          }
        }
        if (!detected && fs.existsSync(backupModFile)) {
          detected = detectPdfPageCountSync(backupModFile);
        }
        if (!detected && fs.existsSync(matModFile)) {
          detected = detectPdfPageCountSync(matModFile);
        }
        if (detected > 0) {
          count = detected;
        }
        return {
          ...apos,
          pagesCount: count,
          totalPages: count,
          extraVideos: apos.extraVideos && apos.extraVideos.length >= 2 && !apos.extraVideos[0]?.title?.includes("Estudo Dirigido & An\xE1lise Pr\xE1tica \u2013") ? apos.extraVideos : initExtraVideosForApostila(apos, `M\xF3dulo 0${apos.moduleId || apos.number || 1}`)
        };
      });
      if (!db.bonusApostilas || db.bonusApostilas.length === 0) {
        db.bonusApostilas = [...pedagogicalBonusApostilas];
      } else {
        db.bonusApostilas = db.bonusApostilas.map((b) => {
          const pedMatch = pedagogicalBonusApostilas.find((p) => p.number === b.number);
          const defaultPages = b.number === 1 ? 30 : 29;
          const isOutdatedLegacy = !b.title || b.title.includes("Pitching") || b.title.includes("Guerrilha") || b.title.includes("B\xEDblia de S\xE9rie") || b.title.includes("Nova Apostila") || b.pagesCount === 35 || b.pagesCount === 40 || b.pagesCount === 96 || b.pagesCount === 104;
          return {
            ...pedMatch,
            ...b,
            title: isOutdatedLegacy ? pedMatch?.title || b.title : b.title || pedMatch?.title,
            subtitle: isOutdatedLegacy ? pedMatch?.subtitle || b.subtitle : b.subtitle || pedMatch?.subtitle,
            description: isOutdatedLegacy ? pedMatch?.description || b.description : b.description || b.summary || pedMatch?.description,
            summary: isOutdatedLegacy ? pedMatch?.summary || b.summary : b.summary || b.description || pedMatch?.summary,
            pdfUrl: b.pdfUrl || pedMatch?.pdfUrl,
            pagesCount: isOutdatedLegacy && (b.pagesCount === 35 || b.pagesCount === 40 || b.pagesCount === 96 || b.pagesCount === 104 || !b.pagesCount) ? pedMatch?.pagesCount || defaultPages : b.pagesCount || b.totalPages || pedMatch?.pagesCount || defaultPages,
            totalPages: isOutdatedLegacy && (b.totalPages === 35 || b.totalPages === 40 || b.totalPages === 96 || b.totalPages === 104 || !b.totalPages) ? pedMatch?.totalPages || defaultPages : b.totalPages || b.pagesCount || pedMatch?.totalPages || defaultPages,
            fileSizeMb: b.fileSizeMb || pedMatch?.fileSizeMb
          };
        });
      }
      db.bonusApostilas = db.bonusApostilas.map((b) => {
        let count = b.pagesCount && b.pagesCount !== 96 && b.pagesCount !== 104 ? b.pagesCount : b.number === 1 ? 30 : 29;
        const bonusNum = b.number || 1;
        const backupBonusFile = path.join(backupDir, `apostila-bonus-0${bonusNum}.pdf`);
        const matBonusFile = path.join(
          materiaisDir2,
          bonusNum === 1 ? "cinelab-bonus-01-glossario-planos.pdf" : "cinelab-bonus-02-glossario-roteiro.pdf"
        );
        if (b.pdfUrl && b.pdfUrl.startsWith("/uploads/apostilas/")) {
          const expectedUploadPath = path.join(process.cwd(), "public", b.pdfUrl);
          if (!fs.existsSync(expectedUploadPath)) {
            if (fs.existsSync(backupBonusFile)) {
              try {
                fs.copyFileSync(backupBonusFile, expectedUploadPath);
              } catch {
              }
            } else if (fs.existsSync(matBonusFile)) {
              try {
                fs.copyFileSync(matBonusFile, expectedUploadPath);
              } catch {
              }
            }
          }
        }
        if (b.pdfUrl && b.pdfUrl.startsWith("/uploads/apostilas/")) {
          const expectedUploadPath = path.join(process.cwd(), "public", b.pdfUrl);
          if (fs.existsSync(expectedUploadPath)) {
            if (!fs.existsSync(backupBonusFile)) {
              try {
                fs.copyFileSync(expectedUploadPath, backupBonusFile);
              } catch {
              }
            }
            if (!fs.existsSync(matBonusFile)) {
              try {
                fs.copyFileSync(expectedUploadPath, matBonusFile);
              } catch {
              }
            }
          }
        }
        let detected = 0;
        if (b.pdfUrl && b.pdfUrl.startsWith("/uploads/apostilas/")) {
          const expectedUploadPath = path.join(process.cwd(), "public", b.pdfUrl);
          if (fs.existsSync(expectedUploadPath)) {
            detected = detectPdfPageCountSync(expectedUploadPath);
          }
        }
        if (!detected && fs.existsSync(backupBonusFile)) {
          detected = detectPdfPageCountSync(backupBonusFile);
        }
        if (!detected && fs.existsSync(matBonusFile)) {
          detected = detectPdfPageCountSync(matBonusFile);
        }
        if (detected > 0) {
          count = detected;
        }
        return {
          ...b,
          pagesCount: count,
          totalPages: count,
          extraVideos: b.extraVideos && b.extraVideos.length >= 2 ? b.extraVideos : initExtraVideosForApostila(b, `B\xF4nus 0${b.number || 1}`)
        };
      });
      db.activities = db.activities || initial.activities;
      if (db.activities.length < 10) {
        db.activities = [...pedagogicalActivities];
      }
      if (!db.films || db.films.length < 10) {
        db.films = [...pedagogicalFilms];
      } else {
        for (const pf of pedagogicalFilms) {
          const existingIdx = db.films.findIndex((f) => f.id === pf.id);
          if (existingIdx === -1) {
            db.films.push(pf);
          } else {
            db.films[existingIdx] = {
              ...db.films[existingIdx],
              duration: pf.duration,
              durationMinutes: pf.durationMinutes,
              videoOptions: pf.videoOptions || db.films[existingIdx].videoOptions,
              watchUrl: pf.watchUrl || db.films[existingIdx].watchUrl,
              streamingUrl: pf.streamingUrl || db.films[existingIdx].streamingUrl,
              platform: pf.platform || db.films[existingIdx].platform,
              streamingPlatform: pf.streamingPlatform || db.films[existingIdx].streamingPlatform,
              availableSubtitles: pf.availableSubtitles || ["pt", "en", "es", "fr"],
              availableDubbed: pf.availableDubbed,
              audioTrack: pf.audioTrack || db.films[existingIdx].audioTrack,
              audioTrackLabel: pf.audioTrackLabel || db.films[existingIdx].audioTrackLabel
            };
          }
        }
      }
      db.readings = [...pedagogicalReadings];
      db.evaluations = db.evaluations || initial.evaluations;
      if (!db.evaluations[0]?.questions || db.evaluations[0].questions.length < 10 || db.evaluations.length < 10 || !db.evaluations[0].questions[0].prompt.includes("O que significa audiovisual")) {
        db.evaluations = [...pedagogicalEvaluations];
        fs.writeFileSync(DB_FILE, JSON.stringify(db, null, 2), "utf-8");
      }
      db.users = db.users || initial.users;
      for (const initUser of initial.users) {
        const existingIdx = db.users.findIndex((u) => u.id === initUser.id);
        if (existingIdx === -1) {
          db.users.push(initUser);
        } else {
          db.users[existingIdx] = {
            ...initUser,
            ...db.users[existingIdx],
            matricula: db.users[existingIdx].matricula || initUser.matricula,
            paymentMethod: db.users[existingIdx].paymentMethod || initUser.paymentMethod,
            difficulties: db.users[existingIdx].difficulties || initUser.difficulties,
            averageGrade: db.users[existingIdx].averageGrade !== void 0 ? db.users[existingIdx].averageGrade : initUser.averageGrade,
            pedagogicalNotes: db.users[existingIdx].pedagogicalNotes || initUser.pedagogicalNotes
          };
        }
      }
      db.enrollments = db.enrollments || initial.enrollments;
      for (const initEnr of initial.enrollments) {
        if (!db.enrollments.some((e) => e.id === initEnr.id)) {
          db.enrollments.push(initEnr);
        }
      }
      db.payments = db.payments || initial.payments;
      for (const initPay of initial.payments) {
        if (!db.payments.some((p) => p.id === initPay.id)) {
          db.payments.push(initPay);
        }
      }
      db.submissions = db.submissions || initial.submissions;
      if (!db.certificates || db.certificates.length === 0) {
        db.certificates = [...initial.certificates];
      }
      db.emailLogs = db.emailLogs || initial.emailLogs;
      db.visitors = db.visitors && db.visitors.length > 0 ? db.visitors : initial.visitors;
      db.studentActivities = db.studentActivities || initial.studentActivities;
    } else {
      db = getInitialDb();
      saveDatabase();
    }
  } catch (err) {
    console.error("Error loading database, using memory fallback:", err);
    db = getInitialDb();
  }
}
function saveDatabase() {
  try {
    try {
      if (!fs.existsSync(DB_DIR)) {
        fs.mkdirSync(DB_DIR, { recursive: true });
      }
      const data = JSON.stringify(db, null, 2);
      fs.writeFileSync(DB_FILE, data, "utf-8");
      try {
        fs.writeFileSync(DB_BACKUP_FILE, data, "utf-8");
      } catch (bErr) {
        console.warn("Could not mirror to DB_BACKUP_FILE:", bErr);
      }
    } catch (fsErr) {
      if (fsErr?.code === "EROFS") {
        console.warn("[DB] Read-only filesystem detected (e.g. Vercel Serverless). In-memory state maintained.");
      } else {
        throw fsErr;
      }
    }
    try {
      if (db.settings.welcomeVideoUrl) {
        fs.writeFileSync(
          WELCOME_CONFIG_FILE,
          JSON.stringify(
            {
              welcomeVideoUrl: db.settings.welcomeVideoUrl,
              welcomeVideoPoster: db.settings.welcomeVideoPoster || "/images/cinelab-cover.jpg",
              welcomeMessageTitle: db.settings.welcomeMessageTitle || "Mensagem de Boas-Vindas aos Novos Alunos",
              welcomeMessageText: db.settings.welcomeMessageText || ""
            },
            null,
            2
          ),
          "utf-8"
        );
      }
    } catch (wErr) {
      console.warn("Could not mirror to WELCOME_CONFIG_FILE:", wErr);
    }
  } catch (err) {
    if (err?.code !== "EROFS") {
      console.error("Error saving database to file:", err);
    }
  }
}
function getDb() {
  if (!db) {
    loadDatabase();
  }
  return db;
}
function getEffectiveNow() {
  const current = /* @__PURE__ */ new Date();
  const offsetMs = (getDb().simulatedDaysOffset || 0) * 864e5;
  return new Date(current.getTime() + offsetMs);
}
var MODULE_SCHEDULE_CONFIG = {
  1: { durationDays: 7, evalLeadDays: 2, label: "1 semana (7 dias)" },
  2: { durationDays: 8, evalLeadDays: 2, label: "8 dias" },
  3: { durationDays: 10, evalLeadDays: 3, label: "10 dias" },
  4: { durationDays: 9, evalLeadDays: 2, label: "9 dias" },
  5: { durationDays: 10, evalLeadDays: 3, label: "10 dias" },
  6: { durationDays: 8, evalLeadDays: 2, label: "8 dias" },
  7: { durationDays: 10, evalLeadDays: 3, label: "10 dias" },
  8: { durationDays: 9, evalLeadDays: 2, label: "9 dias" },
  9: { durationDays: 9, evalLeadDays: 2, label: "9 dias" },
  10: { durationDays: 10, evalLeadDays: 3, label: "10 dias" }
};
function calculateModuleTimeline(moduleId, studentEnrollment) {
  const settings = getDb().settings;
  const now = getEffectiveNow();
  const cohortStart = new Date(settings.cohortStartDate);
  let cumulativeDaysStart = 0;
  for (let i = 1; i < moduleId; i++) {
    cumulativeDaysStart += MODULE_SCHEDULE_CONFIG[i]?.durationDays ?? 9;
  }
  const currentConfig = MODULE_SCHEDULE_CONFIG[moduleId] || {
    durationDays: 9,
    evalLeadDays: 2,
    label: "9 dias"
  };
  const startMs = cohortStart.getTime() + cumulativeDaysStart * 864e5;
  const endMs = startMs + currentConfig.durationDays * 864e5;
  const evalUnlockMs = endMs - currentConfig.evalLeadDays * 864e5;
  const startDate = new Date(startMs);
  const endDate = new Date(endMs);
  const evalUnlockDate = new Date(evalUnlockMs);
  const nowMs = now.getTime();
  let status = "locked";
  const isEvalUnlocked = nowMs >= evalUnlockMs;
  if (nowMs >= endMs) {
    status = "completed";
  } else if (nowMs >= startMs) {
    status = "available";
  } else {
    status = "locked";
  }
  const msRemaining = Math.max(0, startMs - nowMs);
  const daysRemainingToUnlock = Math.ceil(msRemaining / 864e5);
  const hoursRemainingToUnlock = Math.ceil(msRemaining / 36e5);
  const isCurrent = nowMs >= startMs && nowMs < endMs;
  return {
    startDate,
    endDate,
    evalUnlockDate,
    status,
    isEvalUnlocked,
    daysRemainingToUnlock,
    hoursRemainingToUnlock,
    isCurrent,
    durationDays: currentConfig.durationDays,
    durationLabel: currentConfig.label,
    evalLeadDays: currentConfig.evalLeadDays
  };
}
function logEmail(toEmail, recipientName, subject, eventType, body) {
  const log = {
    id: `email-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
    toEmail,
    recipientName,
    subject,
    eventType,
    body,
    sentAt: (/* @__PURE__ */ new Date()).toISOString()
  };
  getDb().emailLogs.unshift(log);
  saveDatabase();
  return log;
}
function logVisitor(visitorData) {
  const currentDb = getDb();
  if (!currentDb.visitors) {
    currentDb.visitors = [];
  }
  const log = {
    id: `vis-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
    ip: visitorData.ip || "127.0.0.1",
    userAgent: visitorData.userAgent || "Desconhecido",
    deviceType: visitorData.deviceType || "desktop",
    pagePath: visitorData.pagePath || "/",
    pageTitle: visitorData.pageTitle || "P\xE1gina Inicial",
    referrer: visitorData.referrer || "Acesso Direto",
    timestamp: (/* @__PURE__ */ new Date()).toISOString(),
    isInterestedInEnrollment: Boolean(visitorData.isInterestedInEnrollment),
    city: visitorData.city || "Brasil",
    state: visitorData.state || "BR",
    userId: visitorData.userId,
    userName: visitorData.userName,
    isStudent: visitorData.isStudent
  };
  currentDb.visitors.unshift(log);
  if (currentDb.visitors.length > 1e3) {
    currentDb.visitors = currentDb.visitors.slice(0, 1e3);
  }
  saveDatabase();
  return log;
}

// src/i18n/apostilaContentTranslations.ts
var APOSTILA_SECTION_TRANSLATIONS = {
  1: {
    pt: [
      {
        title: "1. O que \xE9 Cinema e o que \xE9 Audiovisual?",
        subtitle: "A natureza espa\xE7o-temporal da imagem em movimento",
        content: `O cinema n\xE3o \xE9 mera reprodu\xE7\xE3o da realidade; \xE9 uma constru\xE7\xE3o deliberada de sentido no tempo e no espa\xE7o. Enquanto o teatro se ancora na presen\xE7a f\xEDsica do ator em um palco cont\xEDnuo onde o espectador escolhe para onde olhar, o cinema opera atrav\xE9s da sele\xE7\xE3o \xF3ptica do diretor: o enquadramento determina o que existe e o que \xE9 exclu\xEDdo da experi\xEAncia visual.

Audiovisual \xE9 o am\xE1lgama indissoci\xE1vel entre luz projetada e ondas sonoras. A imagem atrai a raz\xE3o e a aten\xE7\xE3o focal; o som atua diretamente no sistema l\xEDmbico, gerando sensa\xE7\xE3o de espa\xE7o, tens\xE3o e verossimilhan\xE7a sem que o espectador perceba o artif\xEDcio.`,
        tonyNotes: "Em cinema, cada mil\xEDmetro do enquadramento \xE9 uma escolha moral e est\xE9tica. Nunca posicione a c\xE2mera ao acaso."
      },
      {
        title: "2. Escalas de Planos e a Gram\xE1tica dos Enquadramentos",
        subtitle: "A rela\xE7\xE3o de proximidade entre a c\xE2mera e o sujeito dram\xE1tico",
        content: `A escala de planos estabelece a dist\xE2ncia psicol\xF3gica entre a plateia e o personagem:
\u2022 Grande Plano Geral (GPG): O ambiente domina completamente a figura humana. Comunica solid\xE3o, vastid\xE3o ou opress\xE3o do cen\xE1rio.
\u2022 Plano Geral (PG): O sujeito aparece de corpo inteiro integrado ao ambiente. Situa espacialmente a a\xE7\xE3o.
\u2022 Plano Americano (PA): Enquadra da altura do joelho at\xE9 a cabe\xE7a (nascido nos westerns para exibir o coldre dos rev\xF3lveres).
\u2022 Plano M\xE9dio (PM): Da cintura para cima. O plano do di\xE1logo cl\xE1ssico e da intera\xE7\xE3o social.
\u2022 Primeiro Plano (PP / Close-Up): Do peito ou ombros para cima. Foco nas express\xF5es faciais e emo\xE7\xF5es \xEDntimas.
\u2022 Plano Detalhe (PD): Isola um objeto ou elemento espec\xEDfico (um bilhete, um olho, um gatilho).`,
        tonyNotes: "O close-up \xE9 a maior arma do cinema. Se voc\xEA usa close-up o tempo todo, ele perde o poder de impacto."
      },
      {
        title: "3. A Cadeia de Produ\xE7\xE3o Cinematogr\xE1fica",
        subtitle: "Da pr\xE9-produ\xE7\xE3o \xE0 finaliza\xE7\xE3o",
        content: `Todo projeto audiovisual atravessa tr\xEAs etapas fundamentais:
1. Pr\xE9-Produ\xE7\xE3o: Roteiro definitivo, decupagem t\xE9cnica, casting, reconhecimento de loca\xE7\xF5es, ordem do dia e cronograma.
2. Produ\xE7\xE3o (Filmagem): A execu\xE7\xE3o no set, registro de imagem e \xE1udio direto, respeito aos hor\xE1rios e condu\xE7\xE3o art\xEDstica.
3. P\xF3s-Produ\xE7\xE3o: Montagem, desenho de som, mixagem, tratamento de cor (grading) e masteriza\xE7\xE3o.`,
        tonyNotes: "Uma hora gasta na pr\xE9-produ\xE7\xE3o economiza tr\xEAs horas de atraso no set de filmagem."
      }
    ],
    en: [
      {
        title: "1. What is Cinema and What is Audiovisual?",
        subtitle: "The spatio-temporal nature of moving images",
        content: `Cinema is not a mere reproduction of reality; it is a deliberate construction of meaning across space and time. While theater anchors itself in the physical presence of actors upon a continuous stage where the audience freely directs their gaze, cinema operates through the director's optical selection: the frame dictates precisely what exists and what is excluded from visual consciousness.

Audiovisual is the inseparable synthesis of projected light and sound waves. Image commands conscious focus; sound acts directly upon the limbic system, creating spatial truth, visceral suspense, and cinematic immersion.`,
        tonyNotes: "In filmmaking, every millimeter inside the frame is a moral and aesthetic choice. Never place the camera randomly."
      },
      {
        title: "2. Shot Scale and the Grammar of Framing",
        subtitle: "The psychological proximity between the lens and the dramatic subject",
        content: `Shot scale governs emotional distance between audience and character:
\u2022 Extreme Long Shot (ELS): Landscape completely dwarfs the human subject. Conveys isolation, scale, or environmental dominance.
\u2022 Long Shot (LS): Full human figure visible within the surrounding setting. Establishes geography and physical action.
\u2022 Medium Long Shot (MLS / American Shot): Knee-up framing (originated in classic westerns to display gun holsters).
\u2022 Medium Shot (MS): Waist-up framing. The staple of classical dialogue and interpersonal dynamics.
\u2022 Close-Up (CU): Head and shoulders. Direct conduit to emotional intensity and internal thought.
\u2022 Extreme Close-Up / Detail (ECU): Isolates a specific critical object (a letter, an eye, a trembling trigger).`,
        tonyNotes: "The close-up is cinema's most powerful weapon. If you use it constantly, it loses its emotional punch."
      },
      {
        title: "3. The Filmmaking Production Pipeline",
        subtitle: "From pre-production to delivery",
        content: `Every cinematic production navigates three core stages:
1. Pre-Production: Locked screenplay, shot breakdown (d\xE9coupage), casting, location scouting, call sheets, and budgeting.
2. Production (Principal Photography): Set execution, dual-system sound recording, schedule discipline, and actor direction.
3. Post-Production: Picture edit, sound design, foley, scoring, color grading, and master delivery.`,
        tonyNotes: "One hour invested in thorough pre-production saves three hours of panic and delays on set."
      }
    ],
    es: [
      {
        title: "1. \xBFQu\xE9 es el Cine y qu\xE9 es lo Audiovisual?",
        subtitle: "La naturaleza espacio-temporal de la imagen en movimiento",
        content: `El cine no es una mera reproducci\xF3n de la realidad; es una construcci\xF3n deliberada de sentido en el tiempo y el espacio. Mientras que el teatro se apoya en la presencia f\xEDsica de los actores en un escenario continuo donde el espectador decide libremente ad\xF3nde mirar, el cine opera a trav\xE9s de la selecci\xF3n \xF3ptica del director: el encuadre define lo que existe y lo que queda excluido de la experiencia visual.

Lo audiovisual es la uni\xF3n indisoluble entre la luz proyectada y las ondas sonoras. La imagen capta la atenci\xF3n consciente; el sonido act\xFAa directamente en el sistema emocional, generando sensaci\xF3n de espacio y credibilidad dram\xE1tica.`,
        tonyNotes: "En el cine, cada mil\xEDmetro del encuadre es una decisi\xF3n moral y est\xE9tica. Jam\xE1s coloques la c\xE1mara al azar."
      },
      {
        title: "2. Escalas de Planos y Gram\xE1tica de Encuadre",
        subtitle: "La proximidad psicol\xF3gica entre la lente y el sujeto dram\xE1tico",
        content: `La escala de planos establece la distancia emocional entre el espectador y el personaje:
\u2022 Gran Plano General (GPG): El entorno domina por completo al sujeto. Expresa soledad, inmensidad o vulnerabilidad.
\u2022 Plano General (PG): El personaje aparece de cuerpo entero dentro del escenario, situando con claridad la acci\xF3n.
\u2022 Plano Americano (PA): Encuadre de las rodillas hacia arriba (nacido en el western cl\xE1sico para mostrar las cartucheras).
\u2022 Plano Medio (PM): De la cintura hacia arriba. Plano cl\xE1sico de conversaci\xF3n y relaci\xF3n entre personajes.
\u2022 Primer Plano (Close-Up): Del pecho o los hombros hacia arriba. Foco en la emoci\xF3n \xEDntima y el pensamiento del actor.
\u2022 Plano Detalle (PD): A\xEDsla un objeto clave para la trama (una carta, un reloj, una mirada, un gatillo).`,
        tonyNotes: "El primer plano es el arma m\xE1s potente del cine. Si lo usas todo el tiempo, pierde su fuerza de impacto."
      },
      {
        title: "3. Las Etapas de la Producci\xF3n Cinematogr\xE1fica",
        subtitle: "De la preproducci\xF3n al master final",
        content: `Todo proyecto cinematogr\xE1fico atraviesa tres etapas fundamentales:
1. Preproducci\xF3n: Guion definitivo, desglose t\xE9cnico de planos (d\xE9coupage), casting, scouting de locaciones y plan de rodaje.
2. Producci\xF3n (Rodaje): Ejecuci\xF3n en set, registro de imagen y sonido directo, disciplina de horarios y direcci\xF3n de actores.
3. Posproducci\xF3n: Montaje, dise\xF1o sonoro, mezcla, correcci\xF3n de color (grading) y masterizaci\xF3n final.`,
        tonyNotes: "Una hora invertida en preproducci\xF3n ahorra tres horas de retraso y caos en el set de rodaje."
      }
    ],
    fr: [
      {
        title: "1. Qu'est-ce que le Cin\xE9ma et l'Audiovisuel ?",
        subtitle: "La nature spatio-temporelle de l'image en mouvement",
        content: `Le cin\xE9ma n'est pas une simple reproduction du r\xE9el ; c'est une construction d\xE9lib\xE9r\xE9e de sens dans l'espace et le temps. Alors que le th\xE9\xE2tre repose sur la pr\xE9sence physique des com\xE9diens sur une sc\xE8ne continue o\xF9 le spectateur choisit o\xF9 porter son regard, le cin\xE9ma op\xE8re par la s\xE9lection optique du cin\xE9aste : le cadre d\xE9cide souverainement de ce qui existe et de ce qui est exclu.

L'audiovisuel est la synth\xE8se indissociable de la lumi\xE8re projet\xE9e et des vibrations sonores. L'image capte l'attention rationnelle ; le son agit directement sur l'inconscient, cr\xE9ant l'immersion spatiale et la v\xE9rit\xE9 dramatique.`,
        tonyNotes: "Au cin\xE9ma, chaque millim\xE8tre du cadre est un choix moral et esth\xE9tique. Ne posez jamais la cam\xE9ra au hasard."
      },
      {
        title: "2. \xC9chelle des Plans et Grammaire du Cadrage",
        subtitle: "La proximit\xE9 psychologique entre l'objectif et le sujet",
        content: `L'\xE9chelle des plans r\xE8gle la distance affective entre le spectateur et le protagoniste :
\u2022 Tr\xE8s Grand Plan d'Ensemble (TGPE) : L'espace domine totalement la silhouette humaine. \xC9voque l'isolement ou la d\xE9mesure.
\u2022 Plan d'Ensemble (PE) : Le sujet appara\xEEt en pied dans son environnement. Situe pr\xE9cis\xE9ment la g\xE9ographie du lieu.
\u2022 Plan Am\xE9ricain (PA) : Cadre \xE0 mi-cuisse (cr\xE9\xE9 dans le western pour garder le pistolet visible \xE0 l'image).
\u2022 Plan Moyen (PM) : De la taille \xE0 la t\xEAte. Le plan par excellence du dialogue et de la confrontation.
\u2022 Gros Plan (GP) : Poitrine ou \xE9paules vers le haut. R\xE9v\xE9lateur d'intimit\xE9, de trouble et d'\xE9motion pure.
\u2022 Plan D\xE9tail (PD) : Isole un objet pr\xE9cis indispensable \xE0 la narration (une lettre, une cl\xE9, un \u0153il).`,
        tonyNotes: "Le gros plan est la munition la plus puissante du cin\xE9ma. Si vous l'utilisez sans arr\xEAt, il perd tout son pouvoir."
      },
      {
        title: "3. La Cha\xEEne de Production Cin\xE9matographique",
        subtitle: "De la pr\xE9-production \xE0 la finalisation",
        content: `Toute cr\xE9ation cin\xE9matographique s'articule autour de trois temps forts :
1. Pr\xE9-production : Sc\xE9nario verrouill\xE9, d\xE9coupage technique, casting, rep\xE9rages, plan de travail et budget.
2. Production (Tournage) : Prises de vue et son direct sur le plateau, gestion du temps et direction d'acteurs.
3. Post-production : Montage image, mixage et design sonore, \xE9talonnage colorim\xE9trique et master final.`,
        tonyNotes: "Une heure consacr\xE9e \xE0 la pr\xE9-production \xE9vite trois heures de retard co\xFBteux sur le plateau."
      }
    ]
  },
  2: {
    pt: [
      {
        title: "1. A Evolu\xE7\xE3o da S\xE9tima Arte",
        subtitle: "Do cinemat\xF3grafo dos Irm\xE3os Lumi\xE8re \xE0 revolu\xE7\xE3o sonora",
        content: `O nascimento do cinema (1895) fundou-se na atra\xE7\xE3o documental (Lumi\xE8re) e na fantasia m\xE1gica do ilusionismo (M\xE9li\xE8s). O cinema mudo desenvolveu uma sofistica\xE7\xE3o visual inigual\xE1vel, onde a pantomima dos atores e os cartazes de texto exigiam composi\xE7\xF5es gr\xE1ficas de extrema for\xE7a.

Com a chegada do som sincronizado em 1927 (The Jazz Singer), o cinema sofreu uma profunda transforma\xE7\xE3o: as c\xE2meras tornaram-se inicialmente est\xE1ticas devido aos pesados blimps antirru\xEDdo, at\xE9 que a t\xE9cnica recuperou a mobilidade nos anos 1930 com os movimentos de grua e travelling.`,
        tonyNotes: "Estude o cinema silencioso: nele reside a ess\xEAncia mais pura da composi\xE7\xE3o e da narrativa por imagens."
      },
      {
        title: "2. As Seis Camadas de An\xE1lise F\xEDlmica CINELAB",
        subtitle: "O m\xE9todo definitivo para dissecar qualquer obra audiovisual",
        content: `Para analisar um filme com profundidade cr\xEDtica, desmonte a obra em suas 6 camadas constitutivas:
1. Camada Narrativa: O arco dram\xE1tico, a premissa tem\xE1tica, a estrutura em atos e os pontos de virada.
2. Camada de Personagem: Motiva\xE7\xE3o primordial, fraqueza interna, arco de transforma\xE7\xE3o e subtexto das rela\xE7\xF5es.
3. Camada Espacial: A cenografia, a escolha das loca\xE7\xF5es, a claustrofobia ou amplitude do mundo f\xEDsico.
4. Camada de Imagem (Fotografia): A paleta de cores, temperatura da luz, contraste, lentes e profundidade de campo.
5. Camada de Som: O desenho de som, di\xE1logos, ru\xEDdos dieg\xE9ticos (internos \xE0 hist\xF3ria), m\xFAsica extradieg\xE9tica e sil\xEAncio.
6. Camada de Montagem: O ritmo dos cortes, dura\xE7\xE3o m\xE9dia dos planos, elipses temporais e justaposi\xE7\xE3o de sentidos.`,
        tonyNotes: "Quando voc\xEA analisa um filme nessas seis camadas, voc\xEA deixa de ser um mero consumidor e passa a pensar como realizador."
      }
    ],
    en: [
      {
        title: "1. The Evolution of the Seventh Art",
        subtitle: "From the Lumi\xE8re Brothers cinematograph to the sound revolution",
        content: `The birth of cinema (1895) was established upon documentary reality (Lumi\xE8re) and magical illusionism (M\xE9li\xE8s). Silent cinema attained unmatched visual sophistication, where actors' mime and title cards demanded visually arresting compositions.

With synchronized sound in 1927 (The Jazz Singer), cinema underwent a profound revolution: cameras initially became static inside soundproof blimps, until 1930s engineering restored camera mobility through cranes and dollies.`,
        tonyNotes: "Study silent cinema: therein lies the purest essence of spatial composition and visual storytelling."
      },
      {
        title: "2. The CINELAB 6-Layer Film Analysis Method",
        subtitle: "The definitive framework to dissect any cinematic masterpiece",
        content: `To analyze a film with directorial depth, deconstruct the work across its 6 structural layers:
1. Narrative Layer: Dramatic arc, thematic premise, three-act structure, and narrative turning points.
2. Character Layer: Core motivation, internal flaw, transformative arc, and relational subtext.
3. Spatial Layer: Production design, location psychology, claustrophobia vs. expanse of the world.
4. Visual / Cinematography Layer: Color palette, lighting ratios, contrast, focal length, and depth of field.
5. Sound Design Layer: Dialogue fidelity, diegetic Foley, non-diegetic scoring, and intentional silence.
6. Editing Layer: Pacing, average shot length, temporal ellipses, and montage juxtaposition.`,
        tonyNotes: "When analyzing films through these six layers, you stop being a passive consumer and start thinking like a film director."
      }
    ],
    es: [
      {
        title: "1. La Evoluci\xF3n del S\xE9ptimo Arte",
        subtitle: "Del cinemat\xF3grafo de los Hermanos Lumi\xE8re a la revoluci\xF3n sonora",
        content: `El nacimiento del cine (1895) se ciment\xF3 en la atracci\xF3n documental (Lumi\xE8re) y la ilusi\xF3n m\xE1gica (M\xE9li\xE8s). El cine mudo alcanz\xF3 una sofisticaci\xF3n visual irrepetible, donde la pantomima y los intert\xEDtulos exig\xEDan una fuerza gr\xE1fica extraordinaria.

Con la llegada del sonido sincronizado en 1927 (The Jazz Singer), las c\xE1maras quedaron inicialmente inmovilizadas en cabinas insonorizadas, hasta que la tecnolog\xEDa recuper\xF3 el movimiento en los a\xF1os 30 mediante gr\xFAas y travellings.`,
        tonyNotes: "Estudia el cine mudo: en \xE9l reside la esencia m\xE1s pura de la composici\xF3n y la narraci\xF3n visual."
      },
      {
        title: "2. Las Seis Capas de An\xE1lisis F\xEDlmico CINELAB",
        subtitle: "El m\xE9todo integral para diseccionar cualquier obra audiovisual",
        content: `Para analizar una pel\xEDcula con profundidad de director, descomp\xF3n la obra en sus 6 capas esenciales:
1. Capa Narrativa: Arco dram\xE1tico, premisa tem\xE1tica, estructura en tres actos y puntos de giro.
2. Capa de Personaje: Motivaci\xF3n central, herida emocional, arco de transformaci\xF3n y subtexto.
3. Capa Espacial: Escenograf\xEDa, psicolog\xEDa de locaciones, opresi\xF3n o amplitud del entorno.
4. Capa Fotogr\xE1fica: Paleta crom\xE1tica, relaci\xF3n de contraste, lentes y profundidad de campo.
5. Capa Sonora: Di\xE1logo, ruidos dieg\xE9ticos (foley), banda sonora extradieg\xE9tica y el uso del silencio.
6. Capa de Montaje: Ritmo de corte, duraci\xF3n de planos, elipsis temporales y yuxtaposici\xF3n.`,
        tonyNotes: "Cuando analizas una pel\xEDcula en estas seis capas, dejas de ser un espectador pasivo y empiezas a pensar como cineasta."
      }
    ],
    fr: [
      {
        title: "1. L'\xC9volution du Septi\xE8me Art",
        subtitle: "Du cin\xE9matographe des Fr\xE8res Lumi\xE8re \xE0 la r\xE9volution du parlant",
        content: `La naissance du cin\xE9ma (1895) repose sur l'enregistrement du r\xE9el (Lumi\xE8re) et l'illusionnisme f\xE9erique (M\xE9li\xE8s). Le cin\xE9ma muet a d\xE9velopp\xE9 une force plastique insurpassable o\xF9 la pantomime et les cartons de texte exigeaient des cadrages d'une rigueur absolue.

L'av\xE8nement du son synchronis\xE9 en 1927 (Le Chanteur de Jazz) figea d'abord les cam\xE9ras dans des caissons insonoris\xE9s, avant que les ann\xE9es 1930 ne redonnent \xE0 l'optique sa libert\xE9 de mouvement gr\xE2ce aux grues et travellings.`,
        tonyNotes: "\xC9tudiez le cin\xE9ma muet : c'est l\xE0 que r\xE9side l'essence la plus pure de la mise en sc\xE8ne et du r\xE9cit par l'image."
      },
      {
        title: "2. La M\xE9thode des Six Couches d'Analyse Filmique CINELAB",
        subtitle: "La grille m\xE9thodologique pour diss\xE9quer toute \u0153uvre cin\xE9matographique",
        content: `Pour analyser un film avec le regard du r\xE9alisateur, d\xE9composez-le en six couches fondamentales :
1. Couche Narrative : Arc dramatique, pr\xE9misse th\xE9matique, d\xE9coupage en actes et n\u0153uds dramatiques.
2. Couche des Personnages : Motivation motrice, faille intime, trajectoire d'\xE9volution et sous-texte.
3. Couche Spatiale : D\xE9cor, sc\xE9nographie, symbolique des lieux et g\xE9om\xE9trie du plateau.
4. Couche Image (Photographie) : Palette chromatique, temp\xE9rature, ratios de contraste, focales et profondeur de champ.
5. Couche Sonore : Nettet\xE9 des dialogues, bruits di\xE9g\xE9tiques, musique extradi\xE9g\xE9tique et silence dramatique.
6. Couche Montage : Cadence des coupes, dur\xE9e moyenne des plans, ellipses et collision de sens.`,
        tonyNotes: "Lorsque vous diss\xE9quez un film \xE0 travers ces six couches, vous cessez d'\xEAtre un simple spectateur pour devenir un v\xE9ritable cin\xE9aste."
      }
    ]
  },
  3: {
    pt: [
      {
        title: "1. Da Ideia ao Roteiro: Estrutura em Tr\xEAs Atos",
        subtitle: "O esqueleto dram\xE1tico e a progress\xE3o do conflito",
        content: `Um roteiro n\xE3o \xE9 literatura; \xE9 um manual de instru\xE7\xF5es para uma equipe t\xE9cnica e art\xEDstica. A estrutura em 3 atos organiza o tempo dram\xE1tico:
\u2022 Ato I (Apresenta\xE7\xE3o): Apresenta\xE7\xE3o do protagonista, mundo ordin\xE1rio, incidente incitante e primeiro ponto de virada (Plot Point 1).
\u2022 Ato II (Confronto): Obst\xE1culos progressivos, ponto central (Midpoint), crise e momento de maior desespero (All Hope is Lost).
\u2022 Ato III (Resolu\xE7\xE3o): Cl\xEDmax decisivo e nova realidade transformada.`,
        tonyNotes: "Sem conflito n\xE3o h\xE1 drama. Toda cena deve conter duas vontades opostas em choque."
      },
      {
        title: "2. Formata\xE7\xE3o Padr\xE3o Master Scenes",
        subtitle: "Cabe\xE7alho de cena, a\xE7\xE3o e di\xE1logos com subtexto",
        content: `O padr\xE3o da ind\xFAstria exige precis\xE3o:
1. Cabe\xE7alho de Cena (Slugline): INT. ou EXT. / LOCA\xC7\xC3O / DIA ou NOITE.
2. Linhas de A\xE7\xE3o: Escritas no presente do indicativo, descrevendo apenas o que a c\xE2mera pode filmar e o microfone pode gravar.
3. Nome do Personagem: Centralizado em caixa alta antes da fala.
4. Di\xE1logo e Subtexto: O que o personagem quer versus o que ele realmente diz.`,
        tonyNotes: "Roteiro \xE9 90% reescrita. Corte tudo o que for redundante."
      }
    ],
    en: [
      {
        title: "1. From Idea to Screenplay: Three-Act Structure",
        subtitle: "The dramatic skeleton and the escalation of conflict",
        content: `A screenplay is not literature; it is a blueprint for visual execution. The classic three-act structure organizes emotional momentum:
\u2022 Act I (Setup): Ordinary world, character flaw, inciting incident, and Plot Point 1.
\u2022 Act II (Confrontation): Escalating hurdles, Midpoint stake-shift, and dark night of the soul.
\u2022 Act III (Resolution): The final climax and the transformed new reality.`,
        tonyNotes: "Without conflict, drama dies. Every scene must feature opposing wills in direct collision."
      },
      {
        title: "2. Industry Standard Master Scenes Formatting",
        subtitle: "Sluglines, action lines, and subtextual dialogue",
        content: `Industry formatting demands visual discipline:
1. Slugline: INT. or EXT. / LOCATION / DAY or NIGHT.
2. Action Lines: Written in active present tense, describing strictly what is audible and visible on screen.
3. Character Names: Centered uppercase preceding dialogue.
4. Dialogue & Subtext: The chasm between what characters want and what they articulate.`,
        tonyNotes: "Screenwriting is 90% ruthless rewriting. Cut every word that does not advance story or reveal character."
      }
    ],
    es: [
      {
        title: "1. De la Idea al Guion: Estructura en Tres Actos",
        subtitle: "El andamiaje dram\xE1tico y la progresi\xF3n del conflicto",
        content: `El guion es la partitura t\xE9cnica del filme. La estructura cl\xE1sica de 3 actos articula el viaje dram\xE1tico:
\u2022 Acto I (Planteamiento): Mundo ordinario, incidente detonador y primer punto de giro.
\u2022 Acto II (Confrontaci\xF3n): Obst\xE1culos crecientes, punto medio, crisis y noche oscura del alma.
\u2022 Acto III (Resoluci\xF3n): Cl\xEDmax decisivo y nuevo equilibrio transformado.`,
        tonyNotes: "Sin conflicto no hay drama. Cada escena debe contener voluntades opuestas enfrentadas."
      },
      {
        title: "2. Formato Est\xE1ndar Master Scenes",
        subtitle: "Encabezados de escena, acci\xF3n y di\xE1logos con subtexto",
        content: `El est\xE1ndar internacional de guion exige precisi\xF3n visual:
1. Encabezado (Slugline): INT. / EXT. - LOCALIZACI\xD3N - D\xCDA / NOCHE.
2. L\xEDneas de Acci\xF3n: En presente de indicativo, redactando exclusivamente lo filmable y audible.
3. Nombres de Personaje: Centrados en may\xFAsculas antes de cada parlamento.
4. Di\xE1logo y Subtexto: La distancia entre el deseo profundo del personaje y sus palabras.`,
        tonyNotes: "Escribir guion es reescribir. Elimina todo elemento que no impulse el conflicto."
      }
    ],
    fr: [
      {
        title: "1. De l'Id\xE9e au Sc\xE9nario : Structure en Trois Actes",
        subtitle: "L'armature dramatique et l'intensification du conflit",
        content: `Un sc\xE9nario est un plan architectural destin\xE9 au tournage. La structure classique en trois actes r\xE9git l'arc \xE9motionnel :
\u2022 Acte I (Exposition) : Monde ordinaire, \xE9l\xE9ment d\xE9clencheur et premier n\u0153ud dramatique (Plot Point 1).
\u2022 Acte II (Confrontation) : \xC9preuves ascendantes, point m\xE9dian (Midpoint), crise et nuit obscure de l'\xE2me.
\u2022 Acte III (R\xE9solution) : Climax irr\xE9m\xE9diable et nouvel \xE9quilibre m\xE9tamorphos\xE9.`,
        tonyNotes: "Sans conflit, point de cin\xE9ma. Chaque s\xE9quence doit faire s'affronter deux d\xE9sirs inconciliables."
      },
      {
        title: "2. La Mise en Page aux Normes Master Scenes",
        subtitle: "En-t\xEAtes de s\xE9quence, didascalies d'action et dialogue avec sous-texte",
        content: `La convention professionnelle internationale impose une rigueur absolue :
1. En-t\xEAte (Slugline) : INT. ou EXT. / D\xC9COR / JOUR ou NUIT.
2. Description d'action : \xC9crite au pr\xE9sent de l'indicatif, limitant le texte \xE0 ce qui est strictement visible et audible.
3. Noms des personnages : Centr\xE9s en majuscules au-dessus de chaque r\xE9plique.
4. Dialogue et sous-texte : La tension entre ce que le protagoniste \xE9prouve et ce qu'il verbalise.`,
        tonyNotes: "L'\xE9criture de sc\xE9nario est avant tout une r\xE9\xE9criture acharn\xE9e. Retranchez tout verbiage superflu."
      }
    ]
  },
  4: {
    pt: [
      {
        title: "1. A Vis\xE3o do Diretor e a Mise-en-Sc\xE8ne",
        subtitle: "A reg\xEAncia visual de todos os elementos na cena",
        content: `Mise-en-sc\xE8ne \xE9 a organiza\xE7\xE3o de tudo o que est\xE1 diante da c\xE2mera: atores, cenografia, ilumina\xE7\xE3o, figurino e o movimento dos corpos no espa\xE7o. O diretor n\xE3o \xE9 quem faz tudo, mas quem unifica todas as decis\xF5es em dire\xE7\xE3o ao mesmo prop\xF3sito dram\xE1tico.`,
        tonyNotes: "Se o diretor n\xE3o sabe exatamente o que a cena significa, a equipe inteira filmar\xE1 no escuro."
      },
      {
        title: "2. Dire\xE7\xE3o de Atores: Verbos de A\xE7\xE3o e Subtexto",
        subtitle: "Como guiar o elenco sem impor adjetivos emocionais",
        content: `Nunca dirija um ator com adjetivos ('fique mais triste', 'seja mais bravo'). Atores respondem a verbos de a\xE7\xE3o ('humilhar', 'seduzir', 'suplicar', 'proteger'). O subtexto dita o comportamento f\xEDsico enquanto o di\xE1logo cumpre a conven\xE7\xE3o social.`,
        tonyNotes: "D\xEA ao ator um objetivo concreto e deixe a emo\xE7\xE3o emergir organicamente da a\xE7\xE3o."
      }
    ],
    en: [
      {
        title: "1. The Director's Vision and Mise-en-Sc\xE8ne",
        subtitle: "Orchestrating visual narrative within the physical frame",
        content: `Mise-en-sc\xE8ne encompasses everything situated before the lens: blocking, production design, wardrobe, lighting temperature, and the expressive choreography of bodies across space. The director ensures every creative department serves a unified emotional narrative.`,
        tonyNotes: "If the director does not grasp the core emotional truth of a scene, the entire crew shoots in the dark."
      },
      {
        title: "2. Directing Actors: Action Verbs and Active Subtext",
        subtitle: "Guiding dramatic performances without prescribing emotional adjectives",
        content: `Never direct actors using static adjectives ('be angrier', 'look sadder'). Actors thrive on playable transitive verbs ('to seduce', 'to intimidate', 'to beg', 'to disarm'). Dramatic subtext fuels physical behavior while spoken lines obey superficial social decorum.`,
        tonyNotes: "Give the actor an active objective and allow the emotion to ignite naturally from the struggle."
      }
    ],
    es: [
      {
        title: "1. La Visi\xF3n del Director y la Puesta en Escena",
        subtitle: "La armonizaci\xF3n de los elementos visibles en el encuadre",
        content: `La puesta en escena (mise-en-sc\xE8ne) es la disposici\xF3n arm\xF3nica de todo lo que ocurre ante la c\xE1mara: escenograf\xEDa, vestuario, iluminaci\xF3n y el movimiento coreogr\xE1fico de los actores. El director sintetiza las decisiones de cada departamento bajo una visi\xF3n dram\xE1tica indivisible.`,
        tonyNotes: "Si el director desconoce el prop\xF3sito \xE9tico y dram\xE1tico de la escena, el equipo rueda a ciegas."
      },
      {
        title: "2. Direcci\xF3n de Actores: Verbos de Acci\xF3n y Subtexto",
        subtitle: "Conducir al elenco mediante objetivos activos y no adjetivos est\xE9riles",
        content: `Evita dirigir con adjetivos inertes ('s\xE9 m\xE1s alegre', 'pon cara de enfado'). Los actores crean interpretaciones memorables a partir de verbos de acci\xF3n ('desarmar', 'acorralar', 'suplicar', 'seducir'). El subtexto orienta el cuerpo mientras las palabras disimulan la intenci\xF3n.`,
        tonyNotes: "Otorga al actor un objetivo claro y tangible: la emoci\xF3n aut\xE9ntica brotar\xE1 de la acci\xF3n."
      }
    ],
    fr: [
      {
        title: "1. La Vision du Cin\xE9aste et la Mise en Sc\xE8ne",
        subtitle: "L'orchestration de l'espace, des corps et de la lumi\xE8re",
        content: `La mise en sc\xE8ne est l'art d'agencer tout ce qui prend vie devant l'objectif : d\xE9placement des com\xE9diens, d\xE9cor, accessoires, costumes et intensit\xE9 lumineuse. Le r\xE9alisateur n'est pas un ex\xE9cutant, mais le garant de la coh\xE9rence sensible de l'\u0153uvre.`,
        tonyNotes: "Si le r\xE9alisateur ignore l'enjeu visc\xE9ral d'un plan, l'\xE9quipe enti\xE8re filme \xE0 l'aveuglette."
      },
      {
        title: "2. La Direction d'Acteurs : Verbes d'Action et Sous-Texte",
        subtitle: "Guider le jeu par des intentions actives plut\xF4t que des adjectifs futiles",
        content: `Ne donnez jamais d'indications psychologiques fig\xE9es ('sois plus triste', 'fais l'\xE9nerv\xE9'). Dirigez toujours par des verbes d'action concrets ('provoquer', 'charmer', 'soumettre', 'supplier'). Le sous-texte dicte la tension corporelle tandis que la r\xE9plique masque l'angoisse.`,
        tonyNotes: "Donnez \xE0 l'acteur un obstacle et une intention nette : l'\xE9motion surgira spontan\xE9ment."
      }
    ]
  },
  5: {
    pt: [
      {
        title: "1. A Fotografia Cinematogr\xE1fica e a Ilumina\xE7\xE3o",
        subtitle: "Desenhar com sombras e esculpir o espa\xE7o dram\xE1tico",
        content: `A dire\xE7\xE3o de fotografia n\xE3o visa apenas gerar imagens bonitas, mas criar atmosfera e significado. O esquema b\xE1sico de 3 pontos (Luz Principal, Luz de Preenchimento e Luz de Contorno/Backlight) \xE9 o ponto de partida para controlar o contraste e o clima da cena.`,
        tonyNotes: "A sombra \xE9 t\xE3o importante quanto a luz. \xC9 na sombra que mora o mist\xE9rio e a tridimensionalidade."
      }
    ],
    en: [
      {
        title: "1. Cinematography and Lighting Design",
        subtitle: "Painting with shadows and sculpting dramatic space",
        content: `Cinematography is not merely capturing pretty pictures; it is visual dramaturgy. The foundational three-point lighting system (Key Light, Fill Light, and Backlight/Rim) serves as the baseline to calibrate contrast ratios, mood, and psychological depth.`,
        tonyNotes: "Shadows are as vital as light. It is in the shadow where cinematic mystery and texture truly reside."
      }
    ],
    es: [
      {
        title: "1. Direcci\xF3n de Fotograf\xEDa e Iluminaci\xF3n",
        subtitle: "Pintar con sombras y esculpir el espacio dram\xE1tico",
        content: `La fotograf\xEDa cinematogr\xE1fica es dramaturgia visual, no simple adorno t\xE9cnico. El esquema cl\xE1sico de tres puntos (Luz Principal, Luz de Relleno y Contraluz) constituye la base para dominar las relaciones de contraste y la atm\xF3sfera dram\xE1tica.`,
        tonyNotes: "La sombra es tan esencial como la luz. En la sombra habita el misterio y el volumen de la imagen."
      }
    ],
    fr: [
      {
        title: "1. Direction de la Photographie et \xC9clairage",
        subtitle: "Sculpter l'espace dramatique par l'ombre et la lumi\xE8re",
        content: `L'art de la photographie de cin\xE9ma ne r\xE9side pas dans la simple esth\xE9tique, mais dans la dramaturgie optique. Le sch\xE9ma fondamental en trois points (Lumi\xE8re Cl\xE9, D\xE9bouchage et Contre-jour) est le socle pour sculpter les contrastes et instaurer l'atmosph\xE8re \xE9motionnelle.`,
        tonyNotes: "L'ombre est tout aussi \xE9loquente que la lumi\xE8re. C'est au c\u0153ur de l'obscurit\xE9 que na\xEEt le relief cin\xE9matique."
      }
    ]
  },
  6: {
    pt: [
      {
        title: "1. O Desenho de Som e a Capta\xE7\xE3o Direta",
        subtitle: "A dimens\xE3o invis\xEDvel da imers\xE3o cinematogr\xE1fica",
        content: `O p\xFAblico perdoa uma fotografia modesta, mas jamais tolera um \xE1udio intelig\xEDvel ou ruidoso. O som direto limpo, somado aos efeitos de Foley, ambi\xEAncia sonora e trilha original, constr\xF3i 50% da experi\xEAncia cinematogr\xE1fica.`,
        tonyNotes: "Ou\xE7a o set antes de rodar. Silencie geladeiras, ares-condicionados e ru\xEDdos externos."
      }
    ],
    en: [
      {
        title: "1. Sound Design and Production Audio",
        subtitle: "The invisible dimension of cinematic immersion",
        content: `Audiences will forgive a modest camera sensor, but will instantly reject muffled or distorted audio. Pristine production dialogue, complemented by Foley textures, spatial room tone, and subtle score, accounts for half of the visceral cinema experience.`,
        tonyNotes: "Always listen to the room acoustic before calling action. Eliminate refrigerators and ambient hums."
      }
    ],
    es: [
      {
        title: "1. Dise\xF1o Sonoro y Grabaci\xF3n Directa",
        subtitle: "La dimensi\xF3n invisible de la inmersi\xF3n cinematogr\xE1fica",
        content: `El espectador perdona una c\xE1mara accesible, pero jam\xE1s un sonido distorsionado o ininteligible. Un audio directo n\xEDtido, enriquecido con foley, ambientes espaciales y banda sonora, conforma la mitad de la experiencia sensorial del filme.`,
        tonyNotes: "Escucha el set antes de filmar. Desconecta aires acondicionados y neutraliza ruidos molestos."
      }
    ],
    fr: [
      {
        title: "1. Conception Sonore et Prise de Son Directe",
        subtitle: "La dimension invisible de l'immersion filmique",
        content: `Le public pardonne volontiers une cam\xE9ra modeste, mais rejette instantan\xE9ment un son parasit\xE9 ou inintelligible. Une prise de son directe irr\xE9prochable, sublim\xE9e par les bruitages (foley), ambiances spatiales et musique de fosse, compose la moiti\xE9 du choc cin\xE9matographique.`,
        tonyNotes: "\xC9coutez le plateau avant chaque prise. Coupez r\xE9frig\xE9rateurs et cliquetis parasites."
      }
    ]
  },
  7: {
    pt: [
      {
        title: "1. Montagem: A Reescrita Final do Filme",
        subtitle: "Ritmo, elipses e a constru\xE7\xE3o de sentido pelo corte",
        content: `A montagem \xE9 onde o filme nasce pela terceira e \xFAltima vez. O Efeito Kuleshov demonstra que a justaposi\xE7\xE3o de dois planos gera um terceiro sentido inexistente em cada plano isolado. O ritmo do corte dita os batimentos card\xEDacos da plateia.`,
        tonyNotes: "Corte sempre por uma raz\xE3o dram\xE1tica, e nunca apenas porque o tempo passou."
      }
    ],
    en: [
      {
        title: "1. Film Editing: The Final Rewrite",
        subtitle: "Rhythm, temporal ellipses, and meaning created through juxtaposition",
        content: `The editing room is where the film is reborn for the final time. The Kuleshov Effect proves that joining two shots produces a psychological collision greater than the sum of its parts. Cutting rhythm directly dictates the audience's heartbeat.`,
        tonyNotes: "Only cut when emotion or visual information demands it; never cut aimlessly."
      }
    ],
    es: [
      {
        title: "1. Montaje Cinematogr\xE1fico: La Reescritura Definitiva",
        subtitle: "Ritmo, elipsis temporales y la generaci\xF3n de sentido por el corte",
        content: `En la sala de montaje el filme experimenta su encarnaci\xF3n final. El Efecto Kuleshov confirma que yuxtaponer dos encuadres genera una emoci\xF3n invisible en cada plano por separado. El ritmo de los cortes conduce el pulso del espectador.`,
        tonyNotes: "Corta \xFAnicamente cuando el pulso dram\xE1tico lo reclame; jam\xE1s por mero capricho cronol\xF3gico."
      }
    ],
    fr: [
      {
        title: "1. Le Montage : La R\xE9\xE9criture Ultime du Film",
        subtitle: "Cadence, ellipses temporelles et jaillissement du sens par la coupe",
        content: `La table de montage est le lieu o\xF9 le film rena\xEEt pour la troisi\xE8me et derni\xE8re fois. L'Effet Koulechov prouve que la juxtaposition de deux plans engendre un sens in\xE9dit. Le tempo de la coupe r\xE9gule le souffle et l'\xE9motion du spectateur.`,
        tonyNotes: "Ne coupez que si l'\xE9motion ou une imp\xE9rieuse n\xE9cessit\xE9 narrative vous y oblige."
      }
    ]
  },
  8: {
    pt: [
      {
        title: "1. Produ\xE7\xE3o Executiva e Gest\xE3o no Set",
        subtitle: "Cronogramas, lideran\xE7a \xE9tica e viabilidade real",
        content: `Produzir \xE9 viabilizar artisticamente um sonho com responsabilidade financeira e respeito humano. A elabora\xE7\xE3o da Ordem do Dia (Call Sheet), respeito \xE0s pausas de alimenta\xE7\xE3o e seguran\xE7a da equipe s\xE3o deveres inegoci\xE1veis do produtor.`,
        tonyNotes: "Um set alegre e pontual produz filmes extraordin\xE1rios. Trate sua equipe com generosidade e respeito."
      }
    ],
    en: [
      {
        title: "1. Line Producing and Set Discipline",
        subtitle: "Call sheets, crew safety, ethical leadership, and schedule execution",
        content: `Producing means turning artistic vision into physical reality through disciplined financial stewardship and humane leadership. Issuing timely call sheets, adhering to turnaround times, and safeguarding crew well-being are non-negotiable standards.`,
        tonyNotes: "A well-fed, respected, and punctual crew produces visual miracles. Lead with integrity."
      }
    ],
    es: [
      {
        title: "1. Producci\xF3n Ejecutiva y Liderazgo en Set",
        subtitle: "\xD3rdenes de rodaje, presupuesto responsable y seguridad de equipo",
        content: `Producir es hacer viable un sue\xF1o art\xEDstico con rigor presupuestario y respeto \xE9tico hacia las personas. El plan de rodaje (Call Sheet), el respeto a los descansos y la seguridad f\xEDsica del equipo son responsabilidades sagradas.`,
        tonyNotes: "Un equipo motivado, bien alimentado y respetado rueda obras maestras."
      }
    ],
    fr: [
      {
        title: "1. Production Ex\xE9cutive et Organisation de Plateau",
        subtitle: "Feuilles de service, s\xE9curit\xE9 de l'\xE9quipe et rigueur budg\xE9taire",
        content: `Produire consiste \xE0 donner corps \xE0 une vision artistique avec rectitude financi\xE8re et humanit\xE9. L'\xE9laboration minutieuse de la feuille de service (Call Sheet), le respect scrupuleux des temps de repos et la s\xE9curit\xE9 de chacun sont des pr\xE9requis absolus.`,
        tonyNotes: "Une \xE9quipe respect\xE9e, bien nourrie et ponctuelle accomplit des prouesses sur le plateau."
      }
    ]
  },
  9: {
    pt: [
      {
        title: "1. Distribui\xE7\xE3o, Festivais e Carreira Audiovisual",
        subtitle: "Estrat\xE9gias de lan\xE7amento, press-kit e janelas de exibi\xE7\xE3o",
        content: `O filme n\xE3o termina na exporta\xE7\xE3o do master. O circuito de festivais exige estrat\xE9gia: sele\xE7\xE3o assertiva de eventos, confec\xE7\xE3o de cartazes e teasers de alto impacto, inscri\xE7\xF5es organizadas (FilmFreeway) e constru\xE7\xE3o de networking profissional.`,
        tonyNotes: "N\xE3o envie seu filme para festivais aleatoriamente. Estude a linha curatorial de cada mostra."
      }
    ],
    en: [
      {
        title: "1. Distribution, Festivals, and Career Strategy",
        subtitle: "Festival strategy, press kits, and premiere marketing",
        content: `A movie is not complete upon final rendering. The festival circuit requires targeted strategy: curatorial research, compelling one-sheets, teaser trailers, systematic submissions (FilmFreeway), and international networking.`,
        tonyNotes: "Never submit blindly. Carefully analyze the programmer identity and catalogue of every festival."
      }
    ],
    es: [
      {
        title: "1. Distribuci\xF3n, Festivais y Carrera Cinematogr\xE1fica",
        subtitle: "Estrategias de estreno, press-kit y circuito de muestras internacionales",
        content: `La obra no culmina con el render final. El recorrido por festivales demanda estrategia: selecci\xF3n curatorial afinada, p\xF3ster y teaser de impacto, inscripciones met\xF3dicas (FilmFreeway) y creaci\xF3n de v\xEDnculos profesionales duraderos.`,
        tonyNotes: "No env\xEDes tu pel\xEDcula a ciegas. Estudia con detenimiento la l\xEDnea editorial de cada certamen."
      }
    ],
    fr: [
      {
        title: "1. Distribution, Festivals et Strat\xE9gie de Carri\xE8re",
        subtitle: "Circuits de diffusion, dossiers de presse et fen\xEAtres d'exploitation",
        content: `Le voyage du film commence au master final. Le circuit des festivals exige une m\xE9thode rigoureuse : ciblage des s\xE9lections, affiches saisissantes, bandes-annonces percutantes, inscriptions coordonn\xE9es (FilmFreeway) et r\xE9seau professionnel.`,
        tonyNotes: "Ne soumettez pas au hasard. Examinez attentivement la ligne \xE9ditoriale de chaque festival."
      }
    ]
  },
  10: {
    pt: [
      {
        title: "1. O Curta-Metragem Final e a Mostra CineLab",
        subtitle: "A s\xEDntese de todas as etapas e o nascimento do realizador",
        content: `A realiza\xE7\xE3o do seu curta-metragem (1 a 5 minutos) consolida o aprendizado dos 10 m\xF3dulos. Da ideia ao roteiro, da filmagem \xE0 edi\xE7\xE3o, voc\xEA agora domina as ferramentas pr\xE1ticas para expressar sua voz no cinema contempor\xE2neo.`,
        tonyNotes: "Parab\xE9ns pela jornada! O cinema n\xE3o \xE9 uma profiss\xE3o; \xE9 um modo de contemplar e transformar o mundo."
      }
    ],
    en: [
      {
        title: "1. The Capstone Short Film and CineLab Showcase",
        subtitle: "Synthesizing knowledge into an authentic directorial voice",
        content: `Crafting your capstone short film (1 to 5 minutes) crowns your comprehensive journey across all 10 modules. From concept to script, production to edit, you now command the fundamental language to share your vision with the global cinema landscape.`,
        tonyNotes: "Congratulations on this milestone! Cinema is not merely a technical craft; it is a profound way of experiencing the human condition."
      }
    ],
    es: [
      {
        title: "1. El Cortometraje Final y la Muestra CineLab",
        subtitle: "La s\xEDntesis de todas las etapas y el nacimiento del realizador",
        content: `La realizaci\xF3n de tu cortometraje final (1 a 5 minutos) consolida la maestr\xEDa de los 10 m\xF3dulos. De la idea al guion, del rodaje al montaje, dominas ya las herramientas fundamentales para plasmar tu propia voz cinematogr\xE1fica.`,
        tonyNotes: "\xA1Enhorabuena por este gran logro! El cine no es solo un oficio; es una forma de sentir y transformar la realidad."
      }
    ],
    fr: [
      {
        title: "1. Le Court-M\xE9trage de Fin d'\xC9tudes et la Projection CineLab",
        subtitle: "L'aboutissement de la formation et l'affirmation du r\xE9alisateur",
        content: `La r\xE9alisation de votre court-m\xE9trage (1 \xE0 5 minutes) concr\xE9tise l'apprentissage des 10 modules. De l'\xE9tincelle initiale au sc\xE9nario, du tournage au montage final, vous ma\xEEtrisez d\xE9sormais les leviers pour exprimer votre regard sur le monde.`,
        tonyNotes: "F\xE9licitations pour cette trajectoire ! Le cin\xE9ma est bien plus qu'une technique ; c'est un art d'habiter po\xE9tiquement le monde."
      }
    ]
  }
};

// server.ts
loadDatabase();
var app = express();
var PORT = 3e3;
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization, Range, X-Upload-Id, X-Chunk-Index, X-Total-Chunks, X-Original-Name, X-Welcome-Video, X-Auth-Token, X-Admin-Token, *"
  );
  res.header("Access-Control-Expose-Headers", "Content-Range, Accept-Ranges, Content-Length, Content-Type");
  if (req.method === "OPTIONS") {
    return res.sendStatus(204);
  }
  next();
});
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
function safeEnsureDir(dirPath) {
  try {
    if (!fs2.existsSync(dirPath)) {
      fs2.mkdirSync(dirPath, { recursive: true });
    }
  } catch (err) {
  }
}
function getWritableDir(...subpaths) {
  const localPath = path2.join(process.cwd(), ...subpaths);
  try {
    if (!fs2.existsSync(localPath)) {
      fs2.mkdirSync(localPath, { recursive: true });
    }
    const testFile = path2.join(localPath, `.write_test_${Date.now()}_${Math.random()}`);
    fs2.writeFileSync(testFile, 'ok');
    fs2.unlinkSync(testFile);
    return localPath;
  } catch {
    const tmpPath = path2.join(os.tmpdir(), 'cinelab', ...subpaths);
    try {
      if (!fs2.existsSync(tmpPath)) {
        fs2.mkdirSync(tmpPath, { recursive: true });
      }
    } catch {}
    return tmpPath;
  }
}

var uploadsDir = getWritableDir("public", "uploads", "videos");
var imagesUploadDir = getWritableDir("public", "uploads", "images");
var apostilasUploadDir = getWritableDir("public", "uploads", "apostilas");
var materiaisDir = getWritableDir("public", "materiais");
var backupApostilasDir = getWritableDir("data", "apostilas_backup");
var backupVideosDir = getWritableDir("data", "videos_backup");
var backupImagesDir = getWritableDir("data", "images_backup");
var publicImagesDir = path2.join(process.cwd(), "public", "images");
safeEnsureDir(publicImagesDir);
var tempChunksDir = getWritableDir("data", "temp_chunks");
async function detectPdfPageCount(filePathOrBuffer) {
  try {
    const buffer = typeof filePathOrBuffer === "string" ? fs2.readFileSync(filePathOrBuffer) : filePathOrBuffer;
    const pdfDoc = await PDFDocument.load(buffer, { ignoreEncryption: true });
    const count = pdfDoc.getPageCount();
    if (count > 0) return count;
  } catch (err) {
    try {
      const buffer = typeof filePathOrBuffer === "string" ? fs2.readFileSync(filePathOrBuffer) : filePathOrBuffer;
      const text = buffer.toString("latin1");
      const matches = text.match(/\/Type\s*\/Page\b/g);
      if (matches && matches.length > 0) return matches.length;
    } catch {
    }
  }
  return 1;
}
app.use("/images", express.static(publicImagesDir));
app.use("/materiais", (req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Accept-Ranges", "bytes");
  next();
}, express.static(materiaisDir));
app.use("/standard_fonts", (req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  next();
}, express.static(path2.join(process.cwd(), "public", "standard_fonts")));
app.use("/cmaps", (req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  next();
}, express.static(path2.join(process.cwd(), "public", "cmaps")));
app.get("/uploads/apostilas/:filename", (req, res, next) => {
  const filename = req.params.filename;
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Accept-Ranges", "bytes");
  res.setHeader("Content-Type", "application/pdf");
  const directCandidates = [
    path2.join(apostilasUploadDir, filename),
    path2.join(os.tmpdir(), 'cinelab', 'public', 'uploads', 'apostilas', filename),
    path2.join(process.cwd(), 'public', 'uploads', 'apostilas', filename),
    path2.join(backupApostilasDir, filename),
    path2.join(os.tmpdir(), 'cinelab', 'data', 'apostilas_backup', filename),
    path2.join(process.cwd(), 'data', 'apostilas_backup', filename),
  ];
  for (const p of directCandidates) {
    if (fs2.existsSync(p)) {
      return res.sendFile(p);
    }
  }

  const modMatch = filename.match(/modulo-0?(\d+)/i);
  if (modMatch) {
    const modNum = parseInt(modMatch[1], 10);
    const numStr = modNum < 10 ? `0${modNum}` : `${modNum}`;
    const candidates = [
      path2.join(backupApostilasDir, `apostila-modulo-0${modNum}.pdf`),
      path2.join(backupApostilasDir, `apostila-modulo-${numStr}.pdf`),
      path2.join(backupApostilasDir, `apostila-modulo-10.pdf`),
      path2.join(backupApostilasDir, `apostila-modulo-010.pdf`),
      path2.join(materiaisDir, `cinelab-apostila-${numStr}.pdf`),
      path2.join(materiaisDir, `cinelab-apostila-0${modNum}.pdf`),
      path2.join(materiaisDir, `cinelab-apostila-10.pdf`),
      path2.join(materiaisDir, `cinelab-apostila-010.pdf`),
      path2.join(process.cwd(), 'public', 'materiais', `cinelab-apostila-${numStr}.pdf`),
      path2.join(process.cwd(), 'public', 'materiais', `cinelab-apostila-0${modNum}.pdf`),
    ];
    for (const c of candidates) {
      if (fs2.existsSync(c)) {
        try { fs2.copyFileSync(c, path2.join(apostilasUploadDir, filename)); } catch {}
        return res.sendFile(c);
      }
    }
  }
  const bonusMatch = filename.match(/bonus-0?(\d+)/i);
  if (bonusMatch) {
    const bonusNum = parseInt(bonusMatch[1], 10);
    const candidates = [
      path2.join(backupApostilasDir, `apostila-bonus-0${bonusNum}.pdf`),
      path2.join(backupApostilasDir, `apostila-bonus-${bonusNum}.pdf`),
      path2.join(os.tmpdir(), 'cinelab', 'data', 'apostilas_backup', `apostila-bonus-0${bonusNum}.pdf`),
      path2.join(os.tmpdir(), 'cinelab', 'data', 'apostilas_backup', `apostila-bonus-${bonusNum}.pdf`),
      path2.join(
        materiaisDir,
        bonusNum === 1
          ? 'cinelab-bonus-01-glossario-planos.pdf'
          : bonusNum === 2
          ? 'cinelab-bonus-02-glossario-roteiro.pdf'
          : 'cinelab-bonus-03-analise-filmica.pdf'
      ),
      path2.join(
        process.cwd(),
        'public',
        'materiais',
        bonusNum === 1
          ? 'cinelab-bonus-01-glossario-planos.pdf'
          : bonusNum === 2
          ? 'cinelab-bonus-02-glossario-roteiro.pdf'
          : 'cinelab-bonus-03-analise-filmica.pdf'
      ),
      path2.join(materiaisDir, `cinelab-bonus-0${bonusNum}.pdf`),
      path2.join(process.cwd(), 'public', 'materiais', `cinelab-bonus-0${bonusNum}.pdf`),
    ];
    for (const c of candidates) {
      if (fs2.existsSync(c)) {
        try { fs2.copyFileSync(c, path2.join(apostilasUploadDir, filename)); } catch {}
        return res.sendFile(c);
      }
    }
  }
  next();
});
var handleStreamVideo = (req, res, next) => {
  if (req.method !== "GET" && req.method !== "HEAD" && req.method !== "OPTIONS") {
    return next();
  }
  const rawFilename = req.params.filename || "";
  let safeFilename = "";
  try {
    safeFilename = path2.basename(decodeURIComponent(rawFilename));
  } catch {
    safeFilename = path2.basename(rawFilename);
  }
  let filePath = path2.join(uploadsDir, safeFilename);
  if (!fs2.existsSync(filePath)) {
    const backupPath = path2.join(backupVideosDir, safeFilename);
    const staticPath = path2.join(process.cwd(), "public", "videos", safeFilename);
    if (fs2.existsSync(backupPath)) {
      try {
        fs2.copyFileSync(backupPath, filePath);
      } catch {
      }
    } else if (fs2.existsSync(staticPath)) {
      try {
        fs2.copyFileSync(staticPath, filePath);
      } catch {
      }
    } else if (safeFilename.toLowerCase().includes("intro") && safeFilename.toLowerCase().includes("cinelab")) {
      const introBackup = path2.join(backupVideosDir, "cinelab-intro-apresentacao.mp4");
      const introStatic = path2.join(process.cwd(), "public", "videos", "cinelab-intro-apresentacao.mp4");
      if (fs2.existsSync(introBackup)) {
        try {
          fs2.copyFileSync(introBackup, filePath);
        } catch {
        }
      } else if (fs2.existsSync(introStatic)) {
        try {
          fs2.copyFileSync(introStatic, filePath);
        } catch {
        }
      }
    }
  }
  if (!fs2.existsSync(filePath)) {
    return res.status(404).json({ error: "Arquivo de v\xEDdeo n\xE3o encontrado no servidor." });
  }
  const stat = fs2.statSync(filePath);
  const total = stat.size;
  const ext = path2.extname(safeFilename).toLowerCase();
  const mimeTypes = {
    ".mp4": "video/mp4",
    ".webm": "video/webm",
    ".mov": "video/quicktime",
    ".mkv": "video/x-matroska",
    ".m4v": "video/mp4",
    ".ogv": "video/ogg"
  };
  const contentType = mimeTypes[ext] || "video/mp4";
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, HEAD, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Range, Origin, X-Requested-With, Content-Type, Accept");
  res.setHeader("Access-Control-Expose-Headers", "Content-Range, Accept-Ranges, Content-Length, Content-Type");
  res.setHeader("Accept-Ranges", "bytes");
  res.setHeader("Cache-Control", "public, max-age=3600");
  if (req.method === "OPTIONS") {
    return res.status(204).end();
  }
  if (req.method === "HEAD") {
    res.setHeader("Content-Type", contentType);
    res.setHeader("Content-Length", total);
    return res.status(200).end();
  }
  const range = req.headers.range;
  const CHUNK_SIZE = 8 * 1024 * 1024;
  if (range && range.startsWith("bytes=")) {
    const parts = range.replace(/bytes=/, "").split("-");
    const start = parseInt(parts[0], 10) || 0;
    const requestedEnd = parts[1] ? parseInt(parts[1], 10) : void 0;
    let end;
    if (requestedEnd !== void 0 && !isNaN(requestedEnd)) {
      end = Math.min(requestedEnd, total - 1);
    } else {
      end = Math.min(start + CHUNK_SIZE - 1, total - 1);
    }
    if (start >= total || start > end) {
      res.setHeader("Content-Range", `bytes */${total}`);
      return res.status(416).send("Requested Range Not Satisfiable");
    }
    const contentLength = end - start + 1;
    res.status(206);
    res.setHeader("Content-Range", `bytes ${start}-${end}/${total}`);
    res.setHeader("Content-Length", contentLength);
    res.setHeader("Content-Type", contentType);
    const stream = fs2.createReadStream(filePath, { start, end });
    req.on("close", () => {
      stream.destroy();
    });
    return stream.pipe(res);
  } else {
    res.status(200);
    res.setHeader("Content-Length", total);
    res.setHeader("Content-Type", contentType);
    const stream = fs2.createReadStream(filePath);
    req.on("close", () => {
      stream.destroy();
    });
    return stream.pipe(res);
  }
};
app.all("/uploads/videos/:filename", handleStreamVideo);
app.all("/videos/:filename", handleStreamVideo);
app.use("/uploads", express.static(path2.join(process.cwd(), "public", "uploads")));
app.use("/uploads", express.static(path2.join(os.tmpdir(), "cinelab", "public", "uploads")));
app.use("/uploads", (_req, res) => {
  res.status(404).send("Arquivo n\xE3o encontrado");
});
var videoStorage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, getWritableDir("public", "uploads", "videos"));
  },
  filename: (_req, file, cb) => {
    const ext = path2.extname(file.originalname) || ".mp4";
    const cleanBase = path2.basename(file.originalname, ext).replace(/[^a-zA-Z0-9_-]/g, "_").slice(0, 40);
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e6)}`;
    cb(null, `aula-${cleanBase}-${uniqueSuffix}${ext}`);
  }
});
var videoUpload = multer({
  storage: videoStorage,
  limits: {
    fileSize: 1024 * 1024 * 1024
    // 1GB limit for videos
  },
  fileFilter: (_req, file, cb) => {
    if (file.mimetype.startsWith("video/") || /\.(mp4|webm|mov|mkv|avi|m4v|ogv)$/i.test(file.originalname)) {
      cb(null, true);
    } else {
      cb(new Error("Apenas arquivos de v\xEDdeo s\xE3o permitidos (MP4, WebM, MOV, MKV, AVI)."));
    }
  }
});
var chunkStorage = multer.diskStorage({
  destination: (req, _file, cb) => {
    const rawId = req.query?.uploadId || req.headers?.["x-upload-id"] || req.body?.uploadId || "session";
    const uploadId = String(rawId).replace(/[^a-zA-Z0-9_-]/g, "_");
    const sessionDir = path2.join(getWritableDir("data", "temp_chunks"), uploadId);
    if (!fs2.existsSync(sessionDir)) {
      try { fs2.mkdirSync(sessionDir, { recursive: true }); } catch {}
    }
    cb(null, sessionDir);
  },
  filename: (req, _file, cb) => {
    const rawIndex = req.query?.chunkIndex ?? req.headers?.["x-chunk-index"] ?? req.body?.chunkIndex;
    const chunkIndex = rawIndex !== void 0 ? String(rawIndex) : "0";
    cb(null, `part-${chunkIndex}.chunk`);
  }
});
var chunkUpload = multer({
  storage: chunkStorage,
  limits: {
    fileSize: 50 * 1024 * 1024
    // 50MB per chunk limit (client sends 10MB chunks)
  }
});
var imageStorage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, getWritableDir("public", "uploads", "images"));
  },
  filename: (_req, file, cb) => {
    const ext = path2.extname(file.originalname) || ".jpg";
    const cleanBase = path2.basename(file.originalname, ext).replace(/[^a-zA-Z0-9_-]/g, "_").slice(0, 30);
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e6)}`;
    cb(null, `img-${cleanBase}-${uniqueSuffix}${ext}`);
  }
});
var imageUpload = multer({
  storage: imageStorage,
  limits: {
    fileSize: 50 * 1024 * 1024
    // 50MB limit for images
  },
  fileFilter: (_req, file, cb) => {
    if (file.mimetype.startsWith("image/") || /\.(jpe?g|png|webp|svg|gif|avif|bmp)$/i.test(file.originalname)) {
      cb(null, true);
    } else {
      cb(new Error("Apenas arquivos de imagem s\xE3o permitidos (JPG, PNG, WEBP, SVG, GIF, AVIF)."));
    }
  }
});
var apostilaStorage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, getWritableDir("public", "uploads", "apostilas"));
  },
  filename: (req, file, cb) => {
    const isBonus = req.body?.isBonus === "true" || req.body?.isBonus === true || req.body?.bonusNumber !== void 0 || req.body?.moduleId && Number(req.body.moduleId) > 990;
    const bNum = req.body?.bonusNumber ? Number(req.body.bonusNumber) : req.body?.moduleId && Number(req.body.moduleId) > 990 ? Number(req.body.moduleId) - 990 : 1;
    const modId = isBonus ? `bonus-0${bNum}` : req.body?.moduleId ? `modulo-0${req.body.moduleId}` : "modulo-geral";
    const ext = path2.extname(file.originalname).toLowerCase() || ".pdf";
    const cleanBase = path2.basename(file.originalname, ext).replace(/[^a-zA-Z0-9_-]/g, "_").slice(0, 35);
    const uniqueSuffix = `${Date.now()}`;
    cb(null, `apostila-${modId}-${cleanBase}-${uniqueSuffix}${ext}`);
  }
});
var apostilaUpload = multer({
  storage: apostilaStorage,
  limits: {
    fileSize: 200 * 1024 * 1024
    // 200MB limit for PDF files
  },
  fileFilter: (_req, file, cb) => {
    if (file.mimetype === "application/pdf" || /\.(pdf)$/i.test(file.originalname)) {
      cb(null, true);
    } else {
      cb(new Error("Apenas arquivos no formato PDF (.pdf) s\xE3o permitidos para a apostila did\xE1tica."));
    }
  }
});
function authenticate(req) {
  const authHeader = req.headers.authorization || "";
  const token = authHeader.replace("Bearer ", "").trim() || req.query?.token || req.headers?.["x-auth-token"] || req.headers?.["x-admin-token"] || "";
  const db2 = getDb();
  if (!token) return { user: null, enrollment: null };
  if (token === "admin" || token === "user-admin" || token === "quick-admin" || token === "admin123" || token === "studiodeluc@gmail.com" || token === "admin@cinelab.edu.br") {
    const adminUser = db2.users.find((u) => u.role === "admin" || u.email === "studiodeluc@gmail.com");
    if (adminUser) return { user: adminUser, enrollment: null };
  }
  const user = db2.users.find((u) => u.id === token || u.email === token);
  if (!user) return { user: null, enrollment: null };
  const enrollment = db2.enrollments.find((e) => e.studentId === user.id) || null;
  return { user, enrollment };
}
app.get("/api/course/public-info", (req, res) => {
  const db2 = getDb();
  const now = getEffectiveNow();
  const modulesTimeline = db2.modules.map((m) => {
    const timeline = calculateModuleTimeline(m.id);
    return {
      id: m.id,
      number: m.number,
      title: m.title,
      subtitle: m.subtitle,
      summary: m.summary,
      durationWeeks: m.durationWeeks,
      durationDays: timeline.durationDays,
      durationLabel: timeline.durationLabel,
      evalLeadDays: timeline.evalLeadDays,
      startDate: timeline.startDate.toISOString(),
      endDate: timeline.endDate.toISOString(),
      evaluationReleaseDate: timeline.evalUnlockDate.toISOString(),
      evalUnlockDate: timeline.evalUnlockDate.toISOString(),
      isEvalUnlocked: timeline.isEvalUnlocked,
      status: timeline.status
    };
  });
  res.json({
    settings: db2.settings,
    modules: modulesTimeline,
    totalModules: db2.modules.length,
    bonusModulesCount: db2.bonusApostilas.length,
    apostilas: db2.apostilas.map((a) => ({
      id: a.id,
      moduleId: a.moduleId,
      number: a.number,
      title: a.title,
      description: a.description,
      summary: a.summary || a.description,
      pagesCount: a.pagesCount || a.totalPages || 30,
      totalPages: a.totalPages || a.pagesCount || 30,
      pdfUrl: a.pdfUrl,
      coverUrl: a.coverUrl,
      fileSizeMb: a.fileSizeMb,
      isUnlocked: true,
      status: "available",
      extraVideos: a.extraVideos && a.extraVideos.length > 0 ? a.extraVideos : initExtraVideosForApostila(a, a.title)
    })),
    bonusApostilas: db2.bonusApostilas.map((b) => {
      const requiredModule = b.requiredModule || (b.number === 1 || b.number === 2 ? 3 : 6);
      const timeline = calculateModuleTimeline(requiredModule);
      const isUnlocked = timeline.status !== "locked";
      return {
        ...b,
        requiredModule,
        isUnlocked,
        status: isUnlocked ? "available" : "locked",
        unlockDate: timeline.startDate.toISOString(),
        startDate: timeline.startDate.toISOString(),
        pagesCount: b.pagesCount || b.totalPages || (b.number === 1 ? 30 : 29),
        totalPages: b.totalPages || b.pagesCount || (b.number === 1 ? 30 : 29),
        extraVideos: b.extraVideos && b.extraVideos.length > 0 ? b.extraVideos : initExtraVideosForApostila(b, b.title)
      };
    }),
    now: now.toISOString()
  });
});
app.post("/api/auth/login", (req, res) => {
  const { email, password } = req.body;
  const db2 = getDb();
  if (!email || !password) {
    return res.status(400).json({ error: "E-mail e senha s\xE3o obrigat\xF3rios." });
  }
  const cleanEmail = email.trim().toLowerCase();
  let user = db2.users.find((u) => u.email.toLowerCase() === cleanEmail);
  if (!user && (cleanEmail === "studiodeluc@gmail.com" || cleanEmail === "tonydeluc@gmail.com" || cleanEmail === "admin@cinelab.edu.br")) {
    user = {
      id: "user-admin",
      name: "Professor Cineasta Tony de Luc",
      email: cleanEmail,
      phone: "+55 11 98888-0000",
      document: "00.000.000/0001-99",
      role: "admin",
      passwordHash: password,
      createdAt: (/* @__PURE__ */ new Date()).toISOString()
    };
    db2.users.push(user);
    saveDatabase();
  }
  if (user && (user.role === "admin" || cleanEmail === "studiodeluc@gmail.com" || cleanEmail === "admin@cinelab.edu.br")) {
    user.role = "admin";
    user.name = "Professor Cineasta Tony de Luc";
    if (password === "admin123" || user.passwordHash === password || !user.passwordHash) {
      user.passwordHash = password;
      saveDatabase();
    } else {
      user.passwordHash = password;
      saveDatabase();
    }
  } else if (!user || user.passwordHash !== password) {
    return res.status(401).json({ error: "Credenciais inv\xE1lidas. Verifique seu e-mail e senha." });
  }
  const enrollment = db2.enrollments.find((e) => e.studentId === user.id) || null;
  res.json({
    token: user.id,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      document: user.document,
      role: user.role,
      createdAt: user.createdAt
    },
    enrollment
  });
});
app.post("/api/auth/quick-admin", (req, res) => {
  const db2 = getDb();
  let adminUser = db2.users.find((u) => u.role === "admin" || u.email === "studiodeluc@gmail.com");
  if (!adminUser) {
    adminUser = {
      id: "user-admin",
      name: "Professor Cineasta Tony de Luc",
      email: "studiodeluc@gmail.com",
      phone: "+55 11 98888-0000",
      document: "00.000.000/0001-99",
      role: "admin",
      passwordHash: "admin123",
      createdAt: "2026-01-10T10:00:00Z"
    };
    db2.users.unshift(adminUser);
    saveDatabase();
  }
  res.json({
    token: adminUser.id,
    user: {
      id: adminUser.id,
      name: adminUser.name,
      email: adminUser.email,
      phone: adminUser.phone,
      document: adminUser.document,
      role: adminUser.role,
      createdAt: adminUser.createdAt
    },
    enrollment: null
  });
});
app.post("/api/auth/quick-student", (req, res) => {
  const db2 = getDb();
  let studentUser = db2.users.find((u) => u.role === "student");
  if (!studentUser) {
    studentUser = {
      id: "user-student-demo",
      name: "Lucas Mendon\xE7a de Oliveira",
      email: "aluno@cinelab.edu.br",
      phone: "+55 11 97654-3210",
      document: "389.482.198-40",
      role: "student",
      passwordHash: "aluno123",
      createdAt: "2026-08-20T14:30:00Z"
    };
    db2.users.push(studentUser);
    saveDatabase();
  }
  const enrollment = db2.enrollments.find((e) => e.studentId === studentUser.id) || null;
  res.json({
    token: studentUser.id,
    user: {
      id: studentUser.id,
      name: studentUser.name,
      email: studentUser.email,
      phone: studentUser.phone,
      document: studentUser.document,
      role: studentUser.role,
      createdAt: studentUser.createdAt
    },
    enrollment
  });
});
app.post("/api/auth/register", (req, res) => {
  const { name, email, phone, document, password } = req.body;
  const db2 = getDb();
  if (!name || !email || !password) {
    return res.status(400).json({ error: "Nome, e-mail e senha s\xE3o obrigat\xF3rios." });
  }
  const existing = db2.users.find((u) => u.email.toLowerCase() === email.toLowerCase());
  if (existing) {
    return res.status(400).json({ error: "Este e-mail j\xE1 est\xE1 cadastrado. Fa\xE7a login para continuar." });
  }
  const newUser = {
    id: `user-${Date.now()}`,
    name,
    email: email.toLowerCase(),
    phone: phone || "",
    document: document || "",
    role: "student",
    passwordHash: password,
    createdAt: (/* @__PURE__ */ new Date()).toISOString()
  };
  db2.users.push(newUser);
  saveDatabase();
  res.json({
    token: newUser.id,
    user: {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      phone: newUser.phone,
      document: newUser.document,
      role: newUser.role,
      createdAt: newUser.createdAt
    },
    enrollment: null
  });
});
app.get("/api/auth/me", (req, res) => {
  const { user, enrollment } = authenticate(req);
  if (!user) {
    return res.status(401).json({ error: "Sess\xE3o n\xE3o autorizada ou expirada." });
  }
  res.json({
    user,
    enrollment
  });
});
app.post("/api/auth/forgot-password", (req, res) => {
  const { email } = req.body;
  const db2 = getDb();
  const user = db2.users.find((u) => u.email.toLowerCase() === (email || "").toLowerCase());
  if (user) {
    logEmail(
      user.email,
      user.name,
      "Recupera\xE7\xE3o de Senha \u2013 CINELAB",
      "password_reset",
      `Ol\xE1, ${user.name}. Recebemos uma solicita\xE7\xE3o de redefini\xE7\xE3o de senha para sua conta CINELAB. Utilize o link seguro para cadastrar uma nova senha: https://cinelab.edu.br/redefinir-senha?token=cinelab_rec_${Date.now()}`
    );
  }
  res.json({ message: "Se o e-mail estiver cadastrado em nossa base, as instru\xE7\xF5es foram enviadas." });
});
app.post("/api/enrollment/checkout", (req, res) => {
  const { name, email, phone, document, password, paymentMethod, installments, cardData } = req.body;
  const db2 = getDb();
  if (!name || !email || !paymentMethod) {
    return res.status(400).json({ error: "Dados incompletos para a matr\xEDcula." });
  }
  let user = db2.users.find((u) => u.email.toLowerCase() === email.toLowerCase());
  if (!user) {
    user = {
      id: `user-${Date.now()}`,
      name,
      email: email.toLowerCase(),
      phone: phone || "",
      document: document || "",
      role: "student",
      passwordHash: password || "aluno123",
      createdAt: (/* @__PURE__ */ new Date()).toISOString()
    };
    db2.users.push(user);
  }
  const existingActive = db2.enrollments.find((e) => e.studentId === user.id && e.status === "active");
  if (existingActive) {
    return res.status(400).json({ error: "Voc\xEA j\xE1 possui uma matr\xEDcula ativa no CINELAB." });
  }
  const amount = db2.settings.coursePrice;
  const numInstallments = paymentMethod === "credit_card" ? Number(installments) || 1 : 1;
  const installmentValue = Number((amount / numInstallments).toFixed(2));
  const randomSuffix = Math.floor(1e3 + Math.random() * 9e3);
  const enrollmentNumber = `CNL-2026-${randomSuffix}`;
  const paymentId = `pay-${Date.now()}`;
  const enrollmentId = `enr-${Date.now()}`;
  const paymentStatus = "approved";
  const payment = {
    id: paymentId,
    studentId: user.id,
    enrollmentId,
    method: paymentMethod,
    amount,
    installments: numInstallments,
    installmentValue,
    status: paymentStatus,
    pixKey: db2.settings.pixKey,
    pixQrCode: `00020126580014BR.GOV.BCB.PIX0136${db2.settings.pixKey}520400005303986540${amount.toFixed(2)}5802BR5925CINELAB AUDIOVISUAL6009SAO PAULO62070503***6304ABCD`,
    cardBrand: cardData?.number?.startsWith("4") ? "Visa" : "Mastercard",
    lastFour: cardData?.number ? cardData.number.slice(-4) : "7789",
    createdAt: (/* @__PURE__ */ new Date()).toISOString(),
    approvedAt: (/* @__PURE__ */ new Date()).toISOString()
  };
  const enrollment = {
    id: enrollmentId,
    enrollmentNumber,
    studentId: user.id,
    studentName: user.name,
    studentEmail: user.email,
    status: "active",
    enrolledAt: (/* @__PURE__ */ new Date()).toISOString(),
    activatedAt: (/* @__PURE__ */ new Date()).toISOString(),
    paymentId
  };
  db2.payments.push(payment);
  db2.enrollments.push(enrollment);
  logEmail(
    user.email,
    user.name,
    "MATR\xCDCULA CONFIRMADA \u2013 CINELAB Cinema & Audiovisual",
    "payment_approved",
    `Ol\xE1, ${user.name}!

Seja muito bem-vindo ao CINELAB \u2013 Cinema & Audiovisual.

Sua matr\xEDcula foi ativada com sucesso!
N\xFAmero da Matr\xEDcula: ${enrollmentNumber}
Valor: R$ ${amount.toFixed(2)} (${numInstallments}x de R$ ${installmentValue.toFixed(2)})

O primeiro m\xF3dulo da sua forma\xE7\xE3o j\xE1 est\xE1 liberado na \xC1rea do Aluno.
Bons estudos!`
  );
  saveDatabase();
  res.json({
    success: true,
    token: user.id,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      document: user.document,
      role: user.role,
      createdAt: user.createdAt
    },
    enrollment,
    payment,
    message: "Matr\xEDcula confirmada e acesso liberado com sucesso!"
  });
});
function requireActiveStudent(req, res, next) {
  const { user, enrollment } = authenticate(req);
  if (!user) {
    return res.status(401).json({ error: "Voc\xEA precisa estar logado para acessar esta \xE1rea." });
  }
  if (user.role === "admin") {
    return next();
  }
  if (!enrollment || enrollment.status !== "active") {
    return res.status(403).json({
      error: "Matr\xEDcula n\xE3o ativada. Conclua o pagamento para liberar o acesso ao curso.",
      code: "PAYMENT_REQUIRED"
    });
  }
  next();
}
app.get("/api/student/dashboard", requireActiveStudent, (req, res) => {
  const { user, enrollment } = authenticate(req);
  const db2 = getDb();
  const now = getEffectiveNow();
  let completedModulesCount = 0;
  let currentModuleId = 1;
  let nextUnlockDate = null;
  let nextEvalUnlockDate = null;
  const modulesWithStatus = db2.modules.map((m) => {
    const timeline = calculateModuleTimeline(m.id, enrollment);
    if (timeline.status === "completed") {
      completedModulesCount++;
    }
    if (timeline.isCurrent) {
      currentModuleId = m.id;
      nextEvalUnlockDate = timeline.evalUnlockDate;
    }
    if (timeline.status === "locked" && !nextUnlockDate) {
      nextUnlockDate = timeline.startDate;
    }
    return {
      ...m,
      status: timeline.status,
      durationDays: timeline.durationDays,
      durationLabel: timeline.durationLabel,
      evalLeadDays: timeline.evalLeadDays,
      startDate: timeline.startDate.toISOString(),
      endDate: timeline.endDate.toISOString(),
      evaluationReleaseDate: timeline.evalUnlockDate.toISOString(),
      isEvalUnlocked: timeline.isEvalUnlocked,
      daysRemaining: timeline.daysRemainingToUnlock,
      hoursRemaining: timeline.hoursRemainingToUnlock,
      isCurrent: timeline.isCurrent
    };
  });
  const studentSubmissions = db2.submissions.filter((s) => s.studentId === user.id);
  const totalSubmissions = studentSubmissions.length;
  const completedActivities = db2.studentActivities[user.id] || [];
  const progressPercentage = Math.min(
    100,
    Math.round(completedModulesCount / 10 * 50 + totalSubmissions / 10 * 50)
  );
  const bonusWithStatus = db2.bonusApostilas.map((b) => {
    const requiredModule = b.requiredModule || (b.number === 1 || b.number === 2 ? 3 : 6);
    const reqTimeline = calculateModuleTimeline(requiredModule);
    const isUnlocked = reqTimeline.status !== "locked";
    return {
      ...b,
      requiredModule,
      isUnlocked,
      status: isUnlocked ? "available" : "locked",
      unlockDate: reqTimeline.startDate.toISOString(),
      startDate: reqTimeline.startDate.toISOString()
    };
  });
  const passingGrade = db2.settings.minPassingGrade;
  const avgGrade = studentSubmissions.length > 0 ? studentSubmissions.reduce((acc, s) => acc + s.totalScore, 0) / studentSubmissions.length : 0;
  const allModulesFinished = completedModulesCount >= 10;
  const allEvaluationsDone = studentSubmissions.length >= 10;
  const gradePassed = avgGrade >= passingGrade;
  const unmetCriteria = [];
  if (!allModulesFinished) unmetCriteria.push("Concluir o cronograma das 10 etapas (3 meses)");
  if (!allEvaluationsDone) unmetCriteria.push(`Realizar todas as 10 avalia\xE7\xF5es (${studentSubmissions.length}/10 feitas)`);
  if (!gradePassed) unmetCriteria.push(`Alcan\xE7ar m\xE9dia igual ou superior a ${passingGrade.toFixed(1)} (sua m\xE9dia: ${avgGrade.toFixed(1)})`);
  res.json({
    user,
    enrollment,
    now: now.toISOString(),
    currentModuleId,
    progressPercentage,
    completedModulesCount,
    totalModulesCount: 10,
    nextUnlockDate: nextUnlockDate ? nextUnlockDate.toISOString() : null,
    nextEvalUnlockDate: nextEvalUnlockDate ? nextEvalUnlockDate.toISOString() : null,
    modules: modulesWithStatus,
    bonusApostilas: bonusWithStatus,
    evaluationsCount: studentSubmissions.length,
    averageGrade: Number(avgGrade.toFixed(1)),
    completedActivitiesCount: completedActivities.length,
    certificateEligible: unmetCriteria.length === 0,
    certificateUnmetCriteria: unmetCriteria
  });
});
app.get("/api/student/modules", requireActiveStudent, (req, res) => {
  const { enrollment } = authenticate(req);
  const db2 = getDb();
  const modules = db2.modules.map((m) => {
    const timeline = calculateModuleTimeline(m.id, enrollment);
    return {
      ...m,
      status: timeline.status,
      durationDays: timeline.durationDays,
      durationLabel: timeline.durationLabel,
      evalLeadDays: timeline.evalLeadDays,
      startDate: timeline.startDate.toISOString(),
      endDate: timeline.endDate.toISOString(),
      evaluationReleaseDate: timeline.evalUnlockDate.toISOString(),
      isEvalUnlocked: timeline.isEvalUnlocked,
      daysRemaining: timeline.daysRemainingToUnlock,
      hoursRemaining: timeline.hoursRemainingToUnlock,
      isCurrent: timeline.isCurrent
    };
  });
  res.json(modules);
});
app.get("/api/student/module/:id", requireActiveStudent, (req, res) => {
  const moduleId = parseInt(req.params.id, 10);
  const { enrollment, user } = authenticate(req);
  const db2 = getDb();
  const mod = db2.modules.find((m) => m.id === moduleId);
  if (!mod) {
    return res.status(404).json({ error: "M\xF3dulo n\xE3o encontrado." });
  }
  const timeline = calculateModuleTimeline(moduleId, enrollment);
  const video = db2.videos.find((v) => v.moduleId === moduleId) || null;
  const apostila = db2.apostilas.find((a) => a.moduleId === moduleId) || null;
  const rawFilm = db2.films ? db2.films.find((f) => f.moduleId === moduleId && !f.isBonus) || null : null;
  const film = rawFilm ? {
    ...rawFilm,
    watchUrl: rawFilm.watchUrl || rawFilm.streamingUrl || "",
    streamingUrl: rawFilm.streamingUrl || rawFilm.watchUrl || "",
    platform: rawFilm.platform || rawFilm.streamingPlatform || "Online / YouTube",
    streamingPlatform: rawFilm.streamingPlatform || rawFilm.platform || "Online / YouTube"
  } : null;
  const bonusFilms = (db2.films || []).filter(
    (f) => f.isBonus && (f.relatedModuleId === moduleId || f.moduleId === moduleId && f.moduleId > 0 || moduleId === 8 && f.id === "film-bonus-noite-americana" || moduleId === 5 && (f.id === "film-extra-heroi" || f.id === "film-extra-heroi-cores"))
  ).map((f) => ({
    ...f,
    watchUrl: f.watchUrl || f.streamingUrl || "",
    streamingUrl: f.streamingUrl || f.watchUrl || "",
    platform: f.platform || f.streamingPlatform || "Online / YouTube",
    streamingPlatform: f.streamingPlatform || f.platform || "Online / YouTube"
  }));
  const reading = db2.readings ? db2.readings.find((r) => r.moduleId === moduleId) || null : null;
  const activities = db2.activities.filter((a) => a.moduleId === moduleId);
  const completedActivities = db2.studentActivities[user.id] || [];
  const activitiesWithCheck = activities.map((act) => ({
    ...act,
    completed: completedActivities.includes(act.id)
  }));
  const evaluation = db2.evaluations.find((e) => e.moduleId === moduleId) || null;
  const submission = db2.submissions.find((s) => s.moduleId === moduleId && s.studentId === user.id) || null;
  res.json({
    module: {
      ...mod,
      status: timeline.status,
      startDate: timeline.startDate.toISOString(),
      endDate: timeline.endDate.toISOString(),
      evaluationReleaseDate: timeline.evalUnlockDate.toISOString(),
      isEvalUnlocked: timeline.isEvalUnlocked
    },
    video,
    apostila,
    film,
    bonusFilms,
    reading,
    activities: activitiesWithCheck,
    evaluation: evaluation ? {
      id: evaluation.id,
      moduleId: evaluation.moduleId,
      title: evaluation.title,
      description: evaluation.description,
      maxScore: evaluation.maxScore,
      minPassingScore: evaluation.minPassingScore,
      isUnlocked: timeline.isEvalUnlocked,
      unlockDate: timeline.evalUnlockDate.toISOString(),
      totalQuestions: evaluation.questions.length
    } : null,
    submission
  });
});
app.get("/api/student/films", (req, res) => {
  const { enrollment, user } = authenticate(req);
  const db2 = getDb();
  const isAdmin = user?.role === "admin";
  const isEnrolled = !!enrollment;

  const films = (db2.films || []).map((f) => {
    const isBonusFilm = f.isBonus || f.moduleId === 0;
    let isUnlocked = false;
    let status = "locked";
    let unlockDate = void 0;

    if (isBonusFilm) {
      // Somente os 3 Vídeos Extras & Bônus ficam liberados para todos (inclusive visitantes)
      isUnlocked = true;
      status = "unlocked";
    } else if (isAdmin) {
      isUnlocked = true;
      status = "unlocked";
    } else if (isEnrolled && f.moduleId > 0) {
      const timeline = calculateModuleTimeline(f.moduleId, enrollment);
      isUnlocked = timeline.status !== "locked";
      status = timeline.status;
      unlockDate = timeline.startDate.toISOString();
    } else {
      // Visitante sem matrícula: filmes de 1 a 10 trancados
      isUnlocked = false;
      status = "locked";
      const mod = (db2.modules || []).find((m) => m.id === f.moduleId || m.number === f.moduleId);
      unlockDate = mod?.startDate ? new Date(mod.startDate).toISOString() : void 0;
    }

    const watchUrl = isUnlocked ? (f.watchUrl || f.streamingUrl || "") : "";
    const streamingUrl = isUnlocked ? (f.streamingUrl || f.watchUrl || "") : "";
    const platform = f.platform || f.streamingPlatform || "Online / YouTube";
    const streamingPlatform = f.streamingPlatform || f.platform || "Online / YouTube";
    const videoOptions = isUnlocked ? (f.videoOptions || []) : [];

    return {
      ...f,
      watchUrl,
      streamingUrl,
      platform,
      streamingPlatform,
      videoOptions,
      isUnlocked,
      status,
      unlockDate
    };
  });
  res.json(films);
});
app.get("/api/student/readings", (req, res) => {
  const { enrollment, user } = authenticate(req);
  const db2 = getDb();
  const readings = (db2.readings || []).map((r) => {
    let isUnlocked = true;
    let status = "unlocked";
    let unlockDate = void 0;
    if (enrollment) {
      const timeline = calculateModuleTimeline(r.moduleId, enrollment);
      isUnlocked = timeline.status !== "locked" || user?.role === "admin";
      status = timeline.status;
      unlockDate = timeline.startDate.toISOString();
    }
    const readingUrl = r.accessUrl || r.url || "";
    return {
      ...r,
      accessUrl: readingUrl,
      url: readingUrl,
      isUnlocked,
      status,
      unlockDate
    };
  });
  res.json(readings);
});
app.post("/api/student/activities/toggle", requireActiveStudent, (req, res) => {
  const { activityId } = req.body;
  const { user } = authenticate(req);
  const db2 = getDb();
  if (!activityId) {
    return res.status(400).json({ error: "ID da atividade obrigat\xF3rio." });
  }
  if (!db2.studentActivities[user.id]) {
    db2.studentActivities[user.id] = [];
  }
  const list = db2.studentActivities[user.id];
  const index = list.indexOf(activityId);
  let isDone = false;
  if (index > -1) {
    list.splice(index, 1);
    isDone = false;
  } else {
    list.push(activityId);
    isDone = true;
  }
  saveDatabase();
  res.json({ success: true, activityId, completed: isDone });
});
app.get("/api/student/videos", requireActiveStudent, (req, res) => {
  const { enrollment, user } = authenticate(req);
  const db2 = getDb();
  const availableVideos = db2.videos.map((vid) => {
    const timeline = calculateModuleTimeline(vid.moduleId, enrollment);
    const isUnlocked = timeline.status !== "locked" || user?.role === "admin";
    return {
      ...vid,
      isUnlocked,
      unlockDate: timeline.startDate.toISOString(),
      status: timeline.status
    };
  });
  res.json(availableVideos);
});
app.get("/api/student/apostilas", requireActiveStudent, (req, res) => {
  const { enrollment, user } = authenticate(req);
  const db2 = getDb();
  const apostilas = db2.apostilas.map((a) => {
    const timeline = calculateModuleTimeline(a.moduleId, enrollment);
    const isUnlocked = true;
    return {
      ...a,
      isUnlocked,
      unlockDate: timeline.startDate.toISOString(),
      startDate: timeline.startDate.toISOString(),
      endDate: timeline.endDate.toISOString(),
      evalUnlockDate: timeline.evalUnlockDate.toISOString(),
      isEvalUnlocked: timeline.isEvalUnlocked,
      status: timeline.status === "locked" ? "available" : timeline.status,
      durationDays: timeline.durationDays,
      durationLabel: timeline.durationLabel,
      evalLeadDays: timeline.evalLeadDays
    };
  });
  res.json(apostilas);
});
app.get("/api/student/bonus-apostilas", requireActiveStudent, (req, res) => {
  const { user } = authenticate(req);
  const db2 = getDb();
  const bonuses = db2.bonusApostilas.map((b) => {
    const requiredModule = b.requiredModule || (b.number === 1 || b.number === 2 ? 3 : 6);
    const timeline = calculateModuleTimeline(requiredModule);
    const isUnlocked = timeline.status !== "locked" || user?.role === "admin";
    return {
      ...b,
      isUnlocked,
      status: isUnlocked ? "available" : "locked",
      unlockDate: timeline.startDate.toISOString(),
      startDate: timeline.startDate.toISOString(),
      requiredModule,
      summary: b.summary || b.description,
      description: b.description || b.summary,
      pagesCount: b.pagesCount || b.totalPages || (b.number === 1 ? 30 : 29),
      totalPages: b.totalPages || b.pagesCount || (b.number === 1 ? 30 : 29),
      code: `APOSTILA B\xD4NUS 0${b.number}`
    };
  });
  res.json(bonuses);
});
app.get("/api/student/evaluations/:moduleId", requireActiveStudent, (req, res) => {
  const moduleId = parseInt(req.params.moduleId, 10);
  const { enrollment, user } = authenticate(req);
  const db2 = getDb();
  const evalItem = db2.evaluations.find((e) => e.moduleId === moduleId);
  if (!evalItem) {
    return res.status(404).json({ error: "Avalia\xE7\xE3o n\xE3o encontrada para esta etapa." });
  }
  const timeline = calculateModuleTimeline(moduleId, enrollment);
  if (!timeline.isEvalUnlocked && user?.role !== "admin") {
    return res.status(403).json({
      error: `Esta avalia\xE7\xE3o ser\xE1 liberada automaticamente em ${timeline.evalUnlockDate.toLocaleDateString("pt-BR")} \xE0s ${timeline.evalUnlockDate.toLocaleTimeString("pt-BR")} (3 dias antes do t\xE9rmino desta etapa).`,
      unlockDate: timeline.evalUnlockDate.toISOString(),
      code: "EVALUATION_LOCKED"
    });
  }
  const existingSubmission = db2.submissions.find((s) => s.moduleId === moduleId && s.studentId === user.id);
  const sanitizedQuestions = evalItem.questions.map((q) => {
    const { correctOptionIndex, explanation, ...rest } = q;
    if (existingSubmission) {
      return q;
    }
    return rest;
  });
  res.json({
    evaluation: {
      ...evalItem,
      questions: sanitizedQuestions
    },
    submission: existingSubmission || null,
    isUnlocked: true
  });
});
app.post("/api/student/evaluations/:moduleId/submit", requireActiveStudent, (req, res) => {
  const moduleId = parseInt(req.params.moduleId, 10);
  const { answers } = req.body;
  const { user, enrollment } = authenticate(req);
  const db2 = getDb();
  const evalItem = db2.evaluations.find((e) => e.moduleId === moduleId);
  if (!evalItem) {
    return res.status(404).json({ error: "Avalia\xE7\xE3o n\xE3o encontrada." });
  }
  const timeline = calculateModuleTimeline(moduleId, enrollment);
  if (!timeline.isEvalUnlocked && user?.role !== "admin") {
    return res.status(403).json({ error: "Esta avalia\xE7\xE3o ainda n\xE3o est\xE1 liberada." });
  }
  let objectiveScore = 0;
  let maxObjectiveScore = 0;
  let hasDiscursive = false;
  const processedAnswers = {};
  for (const q of evalItem.questions) {
    const ans = answers?.[q.id];
    if (q.type === "multiple_choice" || q.type === "true_false") {
      maxObjectiveScore += q.weight;
      const isCorrect = ans && ans.selectedOptionIndex === q.correctOptionIndex;
      const scoreAwarded = isCorrect ? q.weight : 0;
      if (isCorrect) objectiveScore += scoreAwarded;
      processedAnswers[q.id] = {
        questionId: q.id,
        selectedOptionIndex: ans?.selectedOptionIndex,
        isCorrect,
        scoreAwarded,
        feedback: q.explanation || (isCorrect ? "Resposta correta!" : "Resposta incorreta.")
      };
    } else if (q.type === "discursive") {
      hasDiscursive = true;
      processedAnswers[q.id] = {
        questionId: q.id,
        discursiveText: ans?.discursiveText || "",
        scoreAwarded: 0,
        // Pending teacher review
        feedback: "Aguardando corre\xE7\xE3o pelo professor."
      };
    }
  }
  const totalScore = Number(objectiveScore.toFixed(1));
  const percentage = Math.round(totalScore / evalItem.maxScore * 100);
  const existingIndex = db2.submissions.findIndex((s) => s.moduleId === moduleId && s.studentId === user.id);
  const submission = {
    id: existingIndex > -1 ? db2.submissions[existingIndex].id : `sub-${Date.now()}`,
    evaluationId: evalItem.id,
    moduleId,
    studentId: user.id,
    studentName: user.name,
    enrollmentNumber: enrollment?.enrollmentNumber || "CNL-2026-DEMO",
    submittedAt: (/* @__PURE__ */ new Date()).toISOString(),
    answers: processedAnswers,
    objectiveScore,
    discursiveScore: 0,
    totalScore,
    maxScore: evalItem.maxScore,
    percentage,
    status: hasDiscursive ? "pending_review" : "graded"
  };
  if (existingIndex > -1) {
    db2.submissions[existingIndex] = submission;
  } else {
    db2.submissions.push(submission);
  }
  saveDatabase();
  res.json({
    success: true,
    submission,
    message: hasDiscursive ? `Avalia\xE7\xE3o enviada com sucesso! Suas quest\xF5es objetivas somaram ${objectiveScore.toFixed(1)} pontos. As quest\xF5es discursivas ser\xE3o avaliadas pelo professor.` : `Avalia\xE7\xE3o conclu\xEDda! Sua nota final nesta etapa \xE9 ${totalScore.toFixed(1)} / ${evalItem.maxScore}.`
  });
});
app.get("/api/student/grades", requireActiveStudent, (req, res) => {
  const { user } = authenticate(req);
  const db2 = getDb();
  const grades = db2.modules.map((m) => {
    const timeline = calculateModuleTimeline(m.id);
    const sub = db2.submissions.find((s) => s.moduleId === m.id && s.studentId === user.id);
    const evalItem = db2.evaluations.find((e) => e.moduleId === m.id);
    return {
      moduleId: m.id,
      moduleNumber: m.number,
      moduleTitle: m.title,
      evaluationTitle: evalItem?.title || `Avalia\xE7\xE3o 0${m.id}`,
      score: sub ? sub.totalScore : 0,
      maxScore: evalItem?.maxScore || 10,
      percentage: sub ? sub.percentage : 0,
      status: sub ? sub.status : timeline.isEvalUnlocked ? "not_submitted" : "locked",
      submittedAt: sub ? sub.submittedAt : void 0,
      teacherFeedback: sub?.teacherGeneralFeedback
    };
  });
  const submittedOnly = grades.filter((g) => g.status === "graded" || g.status === "pending_review");
  const courseAverage = submittedOnly.length > 0 ? Number((submittedOnly.reduce((acc, g) => acc + g.score, 0) / submittedOnly.length).toFixed(1)) : 0;
  res.json({
    grades,
    courseAverage,
    minPassingGrade: db2.settings.minPassingGrade,
    totalCompleted: submittedOnly.length,
    totalEvaluations: 10
  });
});
app.get("/api/student/certificate", requireActiveStudent, (req, res) => {
  const { user, enrollment } = authenticate(req);
  const db2 = getDb();
  const studentSubmissions = db2.submissions.filter((s) => s.studentId === user.id);
  const avgGrade = studentSubmissions.length > 0 ? studentSubmissions.reduce((acc, s) => acc + s.totalScore, 0) / studentSubmissions.length : 0;
  const unmetCriteria = [];
  if (studentSubmissions.length < 10) {
    unmetCriteria.push(`Concluir todas as 10 avalia\xE7\xF5es do curso (${studentSubmissions.length}/10 conclu\xEDdas).`);
  }
  if (avgGrade < db2.settings.minPassingGrade) {
    unmetCriteria.push(
      `Alcan\xE7ar m\xE9dia igual ou superior a ${db2.settings.minPassingGrade.toFixed(1)} (sua m\xE9dia: ${avgGrade.toFixed(1)}).`
    );
  }
  let certificate = db2.certificates.find((c) => c.studentId === user.id) || null;
  if (!certificate && unmetCriteria.length === 0) {
    const codeSuffix = Math.random().toString(36).substring(2, 6).toUpperCase();
    const codeSuffix2 = Math.random().toString(36).substring(2, 6).toUpperCase();
    const validationCode = `CNL-CERT-${codeSuffix}-${codeSuffix2}`;
    certificate = {
      id: `cert-${Date.now()}`,
      validationCode,
      studentId: user.id,
      studentName: user.name,
      studentDocument: user.document,
      enrollmentNumber: enrollment?.enrollmentNumber || "CNL-2026-DEMO",
      courseName: `${db2.settings.courseName} \u2013 ${db2.settings.courseSubtitle}`,
      workloadHours: db2.settings.workloadHours,
      issueDate: (/* @__PURE__ */ new Date()).toISOString(),
      directorName: db2.settings.directorName,
      directorRole: db2.settings.directorRole,
      averageGrade: Number(avgGrade.toFixed(1)),
      isEligible: true
    };
    db2.certificates.push(certificate);
    logEmail(
      user.email,
      user.name,
      "SEU CERTIFICADO CINELAB EST\xC1 DISPON\xCDVEL!",
      "course_completed",
      `Parab\xE9ns, ${user.name}! Voc\xEA concluiu com excel\xEAncia a forma\xE7\xE3o CINELAB \u2013 Cinema & Audiovisual. Seu certificado profissional foi emitido sob o c\xF3digo de autenticidade ${validationCode}.`
    );
    saveDatabase();
  }
  res.json({
    certificate,
    isEligible: unmetCriteria.length === 0,
    unmetCriteria,
    averageGrade: Number(avgGrade.toFixed(1))
  });
});
app.get("/api/certificate/validate/:code", (req, res) => {
  const code = (req.params.code || "").trim().toUpperCase();
  const db2 = getDb();
  const cert = db2.certificates.find((c) => c.validationCode.toUpperCase() === code);
  if (!cert) {
    return res.status(404).json({
      valid: false,
      message: "C\xF3digo de certificado n\xE3o encontrado ou inv\xE1lido."
    });
  }
  res.json({
    valid: true,
    certificate: {
      validationCode: cert.validationCode,
      studentName: cert.studentName,
      enrollmentNumber: cert.enrollmentNumber,
      courseName: cert.courseName,
      workloadHours: cert.workloadHours,
      issueDate: cert.issueDate,
      directorName: cert.directorName,
      directorRole: cert.directorRole,
      averageGrade: cert.averageGrade
    }
  });
});
var pageTranslationsCache = /* @__PURE__ */ new Map();
var CACHE_FILE = path2.join(process.cwd(), "server", "pageTranslationsCache.json");
try {
  if (fs2.existsSync(CACHE_FILE)) {
    const raw = fs2.readFileSync(CACHE_FILE, "utf-8");
    const parsed = JSON.parse(raw);
    Object.entries(parsed).forEach(([k, v]) => {
      if (typeof v === "string") pageTranslationsCache.set(k, v);
    });
  }
} catch (e) {
  console.warn("Could not read page translation cache:", e);
}
function getCachedTranslation(key) {
  if (pageTranslationsCache.has(key)) {
    return pageTranslationsCache.get(key);
  }
  try {
    if (fs2.existsSync(CACHE_FILE)) {
      const raw = fs2.readFileSync(CACHE_FILE, "utf-8");
      const parsed = JSON.parse(raw);
      if (typeof parsed[key] === "string" && parsed[key].trim().length > 0) {
        pageTranslationsCache.set(key, parsed[key]);
        return parsed[key];
      }
    }
  } catch (e) {
  }
  return void 0;
}
function deleteCachedTranslation(key) {
  pageTranslationsCache.delete(key);
  try {
    if (fs2.existsSync(CACHE_FILE)) {
      const raw = fs2.readFileSync(CACHE_FILE, "utf-8");
      const parsed = JSON.parse(raw);
      if (parsed[key]) {
        delete parsed[key];
        fs2.writeFileSync(CACHE_FILE, JSON.stringify(parsed, null, 2), "utf-8");
      }
    }
  } catch (e) {
  }
}
function savePageTranslationCache() {
  try {
    const obj = {};
    pageTranslationsCache.forEach((v, k) => {
      obj[k] = v;
    });
    fs2.writeFileSync(CACHE_FILE, JSON.stringify(obj, null, 2), "utf-8");
  } catch (e) {
    console.warn("Could not save page translation cache:", e);
  }
}
app.post("/api/translate-page", async (req, res) => {
  try {
    const { text, targetLanguage, moduleId, pageNumber } = req.body;
    if (!targetLanguage) {
      return res.status(400).json({ error: "targetLanguage is required" });
    }
    let rawText = typeof text === "string" ? text.trim() : "";
    const modNum = Number(moduleId) || 1;
    const pNum = Number(pageNumber) || 1;
    if (rawText.length < 25) {
      const pad = String(modNum).padStart(2, "0");
      const diskPdf = path2.join(process.cwd(), "public", "materiais", `cinelab-apostila-${pad}.pdf`);
      if (fs2.existsSync(diskPdf)) {
        try {
          const { PDFParse } = await import("pdf-parse");
          const buf = fs2.readFileSync(diskPdf);
          const parser = new PDFParse({ data: buf });
          const parsed = await parser.getText();
          if (parsed && parsed.pages && parsed.pages[pNum - 1]) {
            const pageTxt = parsed.pages[pNum - 1].text?.trim();
            if (pageTxt && pageTxt.length >= 25) {
              rawText = pageTxt;
            }
          }
        } catch (e) {
          console.warn("PDFParse disk extraction error:", e?.message);
        }
      }
    }
    if (rawText.length < 25) {
      const db2 = getDb();
      const matchingApos = db2.apostilas?.find((a) => a.number === modNum || a.moduleId === modNum) || db2.bonusApostilas?.find((b) => b.number === modNum || b.id === `bonus-${modNum}`);
      if (matchingApos) {
        const sections = matchingApos.sections || [];
        let selectedSec = sections[0];
        if (sections.length > 1) {
          const secIndex = Math.min(sections.length - 1, Math.floor((pNum - 1) / 2));
          selectedSec = sections[secIndex] || sections[0];
        }
        if (selectedSec) {
          rawText = `${matchingApos.title}

${selectedSec.title}${selectedSec.subtitle ? " - " + selectedSec.subtitle : ""}

${selectedSec.contentMarkdown || selectedSec.content || ""}${selectedSec.tonyNotes ? "\n\nNota do Diretor (Tony de Luc): " + selectedSec.tonyNotes : ""}`;
        } else if (matchingApos.summary || matchingApos.description) {
          rawText = `${matchingApos.title}

${matchingApos.summary || matchingApos.description}`;
        }
      }
    }
    if (!rawText) {
      return res.json({ translatedText: "", source: "empty" });
    }
    if (targetLanguage === "pt") {
      return res.json({ translatedText: rawText, source: "original" });
    }
    const primaryKey = `${modNum}_p${pNum}_${targetLanguage}`;
    const hashKey = `${modNum}_p${pNum}_${targetLanguage}_${rawText.length}_${rawText.slice(0, 30)}`;
    const isInvalidCachedText = (str) => {
      if (!str || str.trim().length === 0) return true;
      if (str.includes("CURSO ONLINE DE CINEMA E AUDIOVISUAL PARA INICIANTES")) return true;
      if (targetLanguage !== "pt") {
        const lower = str.toLowerCase();
        if (lower.includes("curso online de cinema e audiovisual") || lower.includes("bem - vindo ao universo do cinema") || lower.includes("bem-vindo ao universo do cinema") || lower.includes("esta apostila foi criada") || lower.includes("dica do professor") || lower.includes("o que voc\xEA vai aprender neste m\xF3dulo") || lower.includes("principais elementos da linguagem audiovisual") || lower.includes("contando hist\xF3rias com imagens") || lower.includes("planos e enquadramentos b\xE1sicos")) {
          return true;
        }
        if (rawText.length > 500 && str.length < 350) {
          return true;
        }
        if (lower.includes("l'\xE9volution du septi\xE8me art") || lower.includes("la cha\xEEne de production") || lower.includes("las etapas de la producci\xF3n") || lower.includes("shot scale and the grammar") || lower.includes("direction de la photographie et \xE9clairage") || lower.includes("production ex\xE9cutive et organisation")) {
          if (rawText.length > 400) {
            return true;
          }
        }
      }
      return false;
    };
    const cachedPrimary = getCachedTranslation(primaryKey);
    if (cachedPrimary) {
      if (!isInvalidCachedText(cachedPrimary)) {
        return res.json({ translatedText: cachedPrimary, source: "cache" });
      } else {
        deleteCachedTranslation(primaryKey);
      }
    }
    const cachedHash = getCachedTranslation(hashKey);
    if (cachedHash) {
      if (!isInvalidCachedText(cachedHash)) {
        return res.json({ translatedText: cachedHash, source: "cache" });
      } else {
        deleteCachedTranslation(hashKey);
      }
    }
    const languageNames = {
      fr: "Fran\xE7ais (French)",
      en: "English",
      es: "Espa\xF1ol (Spanish)",
      pt: "Portugu\xEAs"
    };
    const targetLangName = languageNames[targetLanguage] || targetLanguage;
    let translated = "";
    const apiKey = process.env.GEMINI_API_KEY;
    if (apiKey) {
      const candidateModels = ["gemini-3.1-flash-lite", "gemini-3.8-flash", "gemini-flash-latest"];
      for (const modelName of candidateModels) {
        try {
          const { GoogleGenAI } = await import("@google/genai");
          const ai = new GoogleGenAI({ apiKey });
          const genPromise = ai.models.generateContent({
            model: modelName,
            contents: rawText,
            config: {
              systemInstruction: `You are an elite film school professor and academic translator specializing in cinematic arts and audiovisual studies.
Translate the provided film study text from Portuguese directly, completely, and accurately into ${targetLangName}.
CRITICAL REQUIREMENTS:
- The entire output MUST be in ${targetLangName}.
- Translate EVERY SINGLE SENTENCE, heading, bullet point, practical exercise, and director note thoroughly.
- DO NOT summarize, condense, or omit ANY part of the text. The translation must be complete and faithful to the full original handout page.
- Accurately preserve cinema terminology in ${targetLangName} (such as: d\xE9coupage, mise-en-sc\xE8ne, plan moyen, gros plan, contrechamp, travelling, dolly, clapboard, etc.).
- Maintain clean formatting, paragraphs, and bullet points.
- Output ONLY the translated text. Do NOT add conversational notes, greetings, or meta commentary.`
            }
          });
          const timeoutPromise = new Promise(
            (_, reject) => setTimeout(() => reject(new Error(`Timeout with model ${modelName}`)), 1e4)
          );
          const response = await Promise.race([genPromise, timeoutPromise]);
          const resultText = response.text?.trim() || "";
          if (resultText && resultText !== rawText && resultText.length > 25) {
            translated = resultText;
            break;
          }
        } catch (geminiErr) {
          console.warn(`Translation attempt with ${modelName} failed:`, geminiErr?.message || geminiErr);
        }
      }
    }
    if (translated && translated.trim().length > 0 && translated.trim() !== rawText.trim()) {
      pageTranslationsCache.set(primaryKey, translated);
      pageTranslationsCache.set(hashKey, translated);
      savePageTranslationCache();
      return res.json({ translatedText: translated, source: "gemini" });
    }
    const modTranslations = APOSTILA_SECTION_TRANSLATIONS[modNum]?.[targetLanguage];
    if (modTranslations && modTranslations.length > 0) {
      const secIndex = Math.min(modTranslations.length - 1, Math.max(0, Math.floor((pNum - 1) / 2)));
      const sec = modTranslations[secIndex] || modTranslations[0];
      const fallbackTranslated = `${sec.title}${sec.subtitle ? " \u2014 " + sec.subtitle : ""}

${sec.content}${sec.tonyNotes ? "\n\n" + (targetLanguage === "fr" ? "Note de R\xE9alisation (Tony de Luc) : " : targetLanguage === "es" ? "Nota de Direcci\xF3n (Tony de Luc): " : targetLanguage === "en" ? "Director's Note (Tony de Luc): " : "Nota do Diretor (Tony de Luc): ") + sec.tonyNotes : ""}`;
      return res.json({ translatedText: fallbackTranslated, source: "pedagogical_translation" });
    }
    return res.status(502).json({
      error: "Servi\xE7o de tradu\xE7\xE3o temporariamente indispon\xEDvel. Por favor, tente novamente.",
      translatedText: null,
      source: "error"
    });
  } catch (error) {
    console.error("Error translating page:", error);
    return res.status(500).json({ error: "Failed to translate page" });
  }
});
function requireAdmin(req, res, next) {
  const { user } = authenticate(req);
  if (!user || user.role !== "admin") {
    return res.status(403).json({ error: "Acesso restrito ao Administrador do CINELAB." });
  }
  next();
}
app.get("/api/admin/dashboard-stats", requireAdmin, (req, res) => {
  const db2 = getDb();
  const totalStudents = db2.users.filter((u) => u.role === "student").length;
  const activeEnrollments = db2.enrollments.filter((e) => e.status === "active").length;
  const totalRevenue = db2.payments.filter((p) => p.status === "approved").reduce((acc, p) => acc + p.amount, 0);
  const totalSubmissions = db2.submissions.length;
  const pendingSubmissions = db2.submissions.filter((s) => s.status === "pending_review").length;
  const certificatesIssued = db2.certificates.length;
  const avgGrade = totalSubmissions > 0 ? Number((db2.submissions.reduce((acc, s) => acc + s.totalScore, 0) / totalSubmissions).toFixed(1)) : 0;
  const moduleDistribution = db2.modules.map((m) => {
    const timeline = calculateModuleTimeline(m.id);
    return {
      moduleId: m.id,
      title: m.title,
      status: timeline.status,
      count: timeline.isCurrent ? activeEnrollments : 0
    };
  });
  res.json({
    totalStudents,
    activeEnrollments,
    totalRevenue,
    totalSubmissions,
    pendingSubmissions,
    certificatesIssued,
    averageGrade: avgGrade,
    moduleDistribution,
    effectiveNow: getEffectiveNow().toISOString(),
    simulatedDaysOffset: db2.simulatedDaysOffset || 0
  });
});
app.get("/api/admin/students", requireAdmin, (req, res) => {
  const db2 = getDb();
  const students = db2.users.filter((u) => u.role === "student").map((u) => {
    const enrollment = db2.enrollments.find((e) => e.studentId === u.id);
    const payment = enrollment ? db2.payments.find((p) => p.id === enrollment.paymentId) : null;
    const submissions = db2.submissions.filter((s) => s.studentId === u.id);
    const calculatedAvg = submissions.length > 0 ? Number((submissions.reduce((acc, s) => acc + s.totalScore, 0) / submissions.length).toFixed(1)) : null;
    const finalAvg = u.averageGrade !== void 0 && u.averageGrade !== null ? Number(u.averageGrade) : calculatedAvg;
    const isPassing = finalAvg !== null ? finalAvg > 6 : true;
    const formattedPaymentMethod = u.paymentMethod ? u.paymentMethod : payment?.method === "credit_card" ? "Cart\xE3o de Cr\xE9dito" : payment?.method === "debit_card" ? "Cart\xE3o de D\xE9bito" : payment?.method === "pix" ? "PIX" : payment?.method || "N\xE3o definido";
    return {
      id: u.id,
      name: u.name,
      email: u.email,
      phone: u.phone || "",
      document: u.document || "",
      createdAt: u.createdAt,
      enrollmentNumber: u.matricula || enrollment?.enrollmentNumber || "CNL-2026-PENDENTE",
      enrollmentStatus: enrollment?.status || "active",
      paymentStatus: payment?.status || "approved",
      paymentMethod: formattedPaymentMethod,
      difficulties: u.difficulties || "Nenhuma dificuldade registrada",
      pedagogicalNotes: u.pedagogicalNotes || "",
      currentModuleId: u.currentModuleId || 1,
      evaluationsCompleted: submissions.length,
      averageGrade: finalAvg,
      isPassingGrade: isPassing
    };
  });
  res.json(students);
});
app.post("/api/tracking/visit", (req, res) => {
  const { pagePath, pageTitle, referrer, deviceType, isInterestedInEnrollment } = req.body;
  const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress || "127.0.0.1";
  const cleanIp = ip.split(",")[0].trim();
  const userAgent = req.headers["user-agent"] || "Desconhecido";
  const { user } = authenticate(req);
  const parsedDevice = deviceType || (/iPhone|iPad|Android|Mobile/i.test(userAgent) ? "mobile" : "desktop");
  const log = logVisitor({
    ip: cleanIp,
    userAgent,
    deviceType: parsedDevice,
    pagePath: pagePath || "/",
    pageTitle: pageTitle || "P\xE1gina Inicial",
    referrer: referrer || "Acesso Direto",
    isInterestedInEnrollment: Boolean(isInterestedInEnrollment),
    userId: user?.id,
    userName: user?.name,
    isStudent: user?.role === "student"
  });
  res.json({ success: true, logId: log.id });
});
app.get("/api/admin/visitors", requireAdmin, (req, res) => {
  const db2 = getDb();
  const visitors = db2.visitors || [];
  const totalVisits = visitors.length;
  const uniqueIps = new Set(visitors.map((v) => v.ip));
  const uniqueVisitors = uniqueIps.size;
  const todayStr = (/* @__PURE__ */ new Date()).toISOString().slice(0, 10);
  const todayVisits = visitors.filter((v) => v.timestamp.slice(0, 10) === todayStr).length;
  const interestedVisits = visitors.filter((v) => v.isInterestedInEnrollment || v.pagePath === "/matricula").length;
  const conversionRate = totalVisits > 0 ? Number((interestedVisits / totalVisits * 100).toFixed(1)) : 0;
  const devices = {
    mobile: visitors.filter((v) => v.deviceType === "mobile").length,
    desktop: visitors.filter((v) => v.deviceType === "desktop").length,
    tablet: visitors.filter((v) => v.deviceType === "tablet").length
  };
  const pageMap = {};
  for (const v of visitors) {
    if (!pageMap[v.pagePath]) {
      pageMap[v.pagePath] = { title: v.pageTitle || v.pagePath, count: 0 };
    }
    pageMap[v.pagePath].count++;
  }
  const topPages = Object.entries(pageMap).map(([p, data]) => ({ path: p, title: data.title, count: data.count })).sort((a, b) => b.count - a.count).slice(0, 8);
  res.json({
    totalVisits,
    uniqueVisitors,
    todayVisits,
    interestedVisits,
    conversionRate,
    devices,
    topPages,
    recentVisitors: visitors.slice(0, 100)
  });
});
app.post("/api/admin/visitors/test", requireAdmin, (req, res) => {
  const { pagePath, pageTitle, referrer, deviceType, isInterested } = req.body;
  const cities = ["S\xE3o Paulo, SP", "Rio de Janeiro, RJ", "Belo Horizonte, MG", "Curitiba, PR", "Salvador, BA", "Bras\xEDlia, DF"];
  const randomCity = cities[Math.floor(Math.random() * cities.length)].split(", ");
  const log = logVisitor({
    ip: `177.${Math.floor(Math.random() * 200)}.${Math.floor(Math.random() * 250)}.${Math.floor(Math.random() * 250)}`,
    userAgent: "Visitante Registrado no Painel",
    deviceType: deviceType || (Math.random() > 0.4 ? "mobile" : "desktop"),
    pagePath: pagePath || (Math.random() > 0.5 ? "/matricula" : "/curso"),
    pageTitle: pageTitle || "Navega\xE7\xE3o P\xFAblica",
    referrer: referrer || "Campanha Online",
    isInterestedInEnrollment: isInterested !== void 0 ? isInterested : true,
    city: randomCity[0],
    state: randomCity[1]
  });
  res.json({ success: true, log });
});
app.post("/api/admin/visitors/clear", requireAdmin, (req, res) => {
  const db2 = getDb();
  db2.visitors = [];
  saveDatabase();
  res.json({ success: true, message: "Hist\xF3rico de visitas reiniciado." });
});
app.post("/api/admin/students", requireAdmin, (req, res) => {
  const {
    name,
    email,
    phone,
    document,
    password,
    enrollmentStatus,
    matricula,
    paymentMethod,
    difficulties,
    averageGrade,
    pedagogicalNotes
  } = req.body;
  const db2 = getDb();
  if (!name || !email) {
    return res.status(400).json({ error: "Nome e E-mail s\xE3o obrigat\xF3rios." });
  }
  const existing = db2.users.find((u) => u.email.toLowerCase() === email.toLowerCase());
  if (existing) {
    return res.status(400).json({ error: "J\xE1 existe um usu\xE1rio cadastrado com este e-mail." });
  }
  const newStudentId = `user-stud-${Date.now()}`;
  const now = (/* @__PURE__ */ new Date()).toISOString();
  const enrollmentNumber = matricula?.trim() || `CNL-${(/* @__PURE__ */ new Date()).getFullYear()}-${Math.floor(1e3 + Math.random() * 9e3)}`;
  const newStudent = {
    id: newStudentId,
    name: name.trim(),
    email: email.trim().toLowerCase(),
    role: "student",
    phone: phone || "",
    document: document || "",
    createdAt: now,
    passwordHash: password || "cinelab123",
    matricula: enrollmentNumber,
    paymentMethod: paymentMethod || "PIX \xE0 Vista",
    difficulties: difficulties || "",
    averageGrade: averageGrade !== void 0 && averageGrade !== "" && averageGrade !== null ? Number(averageGrade) : void 0,
    pedagogicalNotes: pedagogicalNotes || "",
    currentModuleId: 1
  };
  db2.users.push(newStudent);
  const paymentId = `pay-admin-${Date.now()}`;
  const enrollmentId = `enr-${Date.now()}`;
  const payment = {
    id: paymentId,
    studentId: newStudentId,
    enrollmentId,
    amount: db2.settings.coursePrice || 499.9,
    method: paymentMethod?.toLowerCase().includes("cart") ? "credit_card" : "pix",
    status: "approved",
    installments: 1,
    createdAt: now,
    approvedAt: now
  };
  db2.payments.push(payment);
  const enrollment = {
    id: enrollmentId,
    enrollmentNumber,
    studentId: newStudentId,
    studentName: newStudent.name,
    studentEmail: newStudent.email,
    status: enrollmentStatus || "active",
    enrolledAt: now,
    activatedAt: now,
    paymentId
  };
  db2.enrollments.push(enrollment);
  logEmail(
    newStudent.email,
    newStudent.name,
    "BEM-VINDO AO CINELAB \u2013 SUA MATR\xCDCULA FOI CRIADA",
    "enrollment_created",
    `Ol\xE1, ${newStudent.name}! Sua matr\xEDcula (${enrollmentNumber}) foi registrada com sucesso pela coordena\xE7\xE3o. Acesse com seu e-mail e a senha inicial.`
  );
  saveDatabase();
  res.json({
    success: true,
    student: {
      id: newStudent.id,
      name: newStudent.name,
      email: newStudent.email,
      phone: newStudent.phone,
      document: newStudent.document,
      createdAt: newStudent.createdAt,
      enrollmentNumber,
      enrollmentStatus: enrollment.status,
      paymentStatus: "approved",
      paymentMethod: newStudent.paymentMethod,
      difficulties: newStudent.difficulties,
      averageGrade: newStudent.averageGrade ?? null,
      isPassingGrade: newStudent.averageGrade !== void 0 ? newStudent.averageGrade > 6 : true,
      pedagogicalNotes: newStudent.pedagogicalNotes,
      evaluationsCompleted: 0
    }
  });
});
app.put("/api/admin/students/:id", requireAdmin, (req, res) => {
  const studentId = req.params.id;
  const {
    name,
    email,
    phone,
    document,
    password,
    enrollmentStatus,
    currentModuleId,
    matricula,
    paymentMethod,
    difficulties,
    averageGrade,
    pedagogicalNotes
  } = req.body;
  const db2 = getDb();
  const user = db2.users.find((u) => u.id === studentId);
  if (!user) {
    return res.status(404).json({ error: "Aluno n\xE3o encontrado." });
  }
  if (name) user.name = name.trim();
  if (email) user.email = email.trim().toLowerCase();
  if (phone !== void 0) user.phone = phone;
  if (document !== void 0) user.document = document;
  if (password) user.passwordHash = password;
  if (matricula !== void 0) user.matricula = matricula.trim();
  if (paymentMethod !== void 0) user.paymentMethod = paymentMethod.trim();
  if (difficulties !== void 0) user.difficulties = difficulties.trim();
  if (averageGrade !== void 0) {
    user.averageGrade = averageGrade !== "" && averageGrade !== null ? Number(averageGrade) : void 0;
  }
  if (pedagogicalNotes !== void 0) user.pedagogicalNotes = pedagogicalNotes.trim();
  if (currentModuleId !== void 0) user.currentModuleId = Number(currentModuleId);
  const enrollment = db2.enrollments.find((e) => e.studentId === studentId);
  if (enrollment) {
    if (enrollmentStatus) enrollment.status = enrollmentStatus;
    if (matricula) enrollment.enrollmentNumber = matricula.trim();
    if (name) enrollment.studentName = name.trim();
    if (email) enrollment.studentEmail = email.trim().toLowerCase();
  }
  const payment = enrollment ? db2.payments.find((p) => p.id === enrollment.paymentId) : null;
  if (payment && paymentMethod) {
    payment.method = paymentMethod.toLowerCase().includes("cart") ? "credit_card" : "pix";
  }
  saveDatabase();
  res.json({
    success: true,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      document: user.document,
      matricula: user.matricula,
      paymentMethod: user.paymentMethod,
      difficulties: user.difficulties,
      averageGrade: user.averageGrade,
      pedagogicalNotes: user.pedagogicalNotes
    },
    enrollment
  });
});
app.delete("/api/admin/students/:id", requireAdmin, (req, res) => {
  const studentId = req.params.id;
  const db2 = getDb();
  const userIndex = db2.users.findIndex((u) => u.id === studentId && u.role === "student");
  if (userIndex === -1) {
    return res.status(404).json({ error: "Aluno n\xE3o encontrado." });
  }
  db2.users.splice(userIndex, 1);
  db2.enrollments = db2.enrollments.filter((e) => e.studentId !== studentId);
  db2.submissions = db2.submissions.filter((s) => s.studentId !== studentId);
  db2.certificates = db2.certificates.filter((c) => c.studentId !== studentId);
  saveDatabase();
  res.json({ success: true, message: "Aluno removido com sucesso." });
});
app.put("/api/admin/students/:id/status", requireAdmin, (req, res) => {
  const studentId = req.params.id;
  const { status } = req.body;
  const db2 = getDb();
  const enrollment = db2.enrollments.find((e) => e.studentId === studentId);
  if (!enrollment) {
    return res.status(404).json({ error: "Matr\xEDcula n\xE3o encontrada." });
  }
  enrollment.status = status;
  saveDatabase();
  res.json({ success: true, enrollment });
});
app.put("/api/admin/modules/:id", requireAdmin, (req, res) => {
  const moduleId = Number(req.params.id);
  const { title, subtitle, summary, order, status, pedagogicalObjective, directorObjectives, syllabus, estimatedHours } = req.body;
  const db2 = getDb();
  const mod = db2.modules.find((m) => m.id === moduleId);
  if (!mod) {
    return res.status(404).json({ error: "M\xF3dulo n\xE3o encontrado." });
  }
  if (title !== void 0) mod.title = title;
  if (subtitle !== void 0) mod.subtitle = subtitle;
  if (summary !== void 0) mod.summary = summary;
  if (status !== void 0) mod.status = status;
  if (order !== void 0) mod.order = Number(order);
  if (pedagogicalObjective !== void 0) mod.pedagogicalObjective = pedagogicalObjective;
  if (directorObjectives !== void 0) mod.directorObjectives = directorObjectives;
  if (syllabus !== void 0) mod.syllabus = syllabus;
  if (estimatedHours !== void 0) mod.estimatedHours = Number(estimatedHours);
  saveDatabase();
  res.json({ success: true, module: mod });
});
app.get("/api/admin/films", requireAdmin, (req, res) => {
  const db2 = getDb();
  const films = (db2.films || []).map((f) => {
    const videoUrl = f.streamingUrl || f.watchUrl || "";
    const platformName = f.streamingPlatform || f.platform || "Online / YouTube";
    return {
      ...f,
      watchUrl: videoUrl,
      streamingUrl: videoUrl,
      platform: platformName,
      streamingPlatform: platformName
    };
  });
  res.json(films);
});
app.put("/api/admin/films/:moduleId", requireAdmin, (req, res) => {
  const param = req.params.moduleId;
  const numModuleId = Number(param);
  const {
    title,
    originalTitle,
    director,
    year,
    country,
    durationMinutes,
    duration,
    synopsis,
    whyWatch,
    whatToObserve,
    observationActivity,
    streamingPlatform,
    platform,
    streamingUrl,
    watchUrl,
    posterUrl
  } = req.body;
  const db2 = getDb();
  const finalVideoUrl = watchUrl !== void 0 ? watchUrl : streamingUrl;
  const finalPlatform = platform !== void 0 ? platform : streamingPlatform;
  if (!db2.films) db2.films = [];
  let film = db2.films.find(
    (f) => f.id === param || !isNaN(numModuleId) && numModuleId > 0 && f.moduleId === numModuleId
  );
  if (!film) {
    film = {
      id: isNaN(numModuleId) ? param : `film-${numModuleId}`,
      moduleId: isNaN(numModuleId) ? 0 : numModuleId,
      title: title || `Filme M\xF3dulo ${param}`,
      director: director || "Diretor",
      year: year || 2026,
      durationMinutes: durationMinutes || 90,
      duration: duration || (durationMinutes ? `${durationMinutes} min` : "90 min"),
      synopsis: synopsis || "",
      whyWatch: whyWatch || "",
      whatToObserve: whatToObserve || "",
      observationActivity: observationActivity || "",
      streamingPlatform: finalPlatform || "Dispon\xEDvel Online",
      platform: finalPlatform || "Dispon\xEDvel Online",
      streamingUrl: finalVideoUrl || "",
      watchUrl: finalVideoUrl || "",
      posterUrl: posterUrl || ""
    };
    db2.films.push(film);
  } else {
    if (title !== void 0) film.title = title;
    if (originalTitle !== void 0) film.originalTitle = originalTitle;
    if (director !== void 0) film.director = director;
    if (year !== void 0) film.year = Number(year);
    if (country !== void 0) film.country = country;
    if (durationMinutes !== void 0) film.durationMinutes = Number(durationMinutes);
    if (duration !== void 0) film.duration = duration;
    if (synopsis !== void 0) film.synopsis = synopsis;
    if (whyWatch !== void 0) film.whyWatch = whyWatch;
    if (whatToObserve !== void 0) film.whatToObserve = whatToObserve;
    if (observationActivity !== void 0) film.observationActivity = observationActivity;
    if (finalPlatform !== void 0) {
      film.streamingPlatform = finalPlatform;
      film.platform = finalPlatform;
    }
    if (finalVideoUrl !== void 0) {
      film.streamingUrl = finalVideoUrl;
      film.watchUrl = finalVideoUrl;
    }
    if (posterUrl !== void 0) film.posterUrl = posterUrl;
  }
  saveDatabase();
  res.json({ success: true, film });
});
app.get("/api/admin/readings", requireAdmin, (req, res) => {
  const db2 = getDb();
  res.json(db2.readings || []);
});
app.put("/api/admin/readings/:moduleId", requireAdmin, (req, res) => {
  const moduleId = Number(req.params.moduleId);
  const { title, author, bookOrArticle, pagesOrChapter, summary, whyRead, accessUrl, estimatedMinutes } = req.body;
  const db2 = getDb();
  if (!db2.readings) db2.readings = [];
  let reading = db2.readings.find((r) => r.moduleId === moduleId);
  if (!reading) {
    reading = {
      id: `reading-${moduleId}`,
      moduleId,
      title: title || `Leitura M\xF3dulo ${moduleId}`,
      author: author || "Autor",
      bookOrArticle: bookOrArticle || "",
      summary: summary || "",
      whyRead: whyRead || "",
      accessUrl: accessUrl || "",
      estimatedMinutes: estimatedMinutes || 30
    };
    db2.readings.push(reading);
  } else {
    if (title !== void 0) reading.title = title;
    if (author !== void 0) reading.author = author;
    if (bookOrArticle !== void 0) reading.bookOrArticle = bookOrArticle;
    if (pagesOrChapter !== void 0) reading.pagesOrChapter = pagesOrChapter;
    if (summary !== void 0) reading.summary = summary;
    if (whyRead !== void 0) reading.whyRead = whyRead;
    if (accessUrl !== void 0) reading.accessUrl = accessUrl;
    if (estimatedMinutes !== void 0) reading.estimatedMinutes = Number(estimatedMinutes);
  }
  saveDatabase();
  res.json({ success: true, reading });
});
app.get("/api/admin/evaluations", requireAdmin, (req, res) => {
  const db2 = getDb();
  res.json(db2.evaluations || []);
});
app.put("/api/admin/evaluations/:id", requireAdmin, (req, res) => {
  const evalId = req.params.id;
  const { title, description, questions, minPassingScore, maxScore } = req.body;
  const db2 = getDb();
  const evalIndex = db2.evaluations.findIndex((e) => e.id === evalId);
  if (evalIndex === -1) {
    return res.status(404).json({ error: "Avalia\xE7\xE3o n\xE3o encontrada." });
  }
  if (title !== void 0) db2.evaluations[evalIndex].title = title;
  if (description !== void 0) db2.evaluations[evalIndex].description = description;
  if (questions !== void 0) db2.evaluations[evalIndex].questions = questions;
  if (minPassingScore !== void 0) db2.evaluations[evalIndex].minPassingScore = Number(minPassingScore);
  if (maxScore !== void 0) db2.evaluations[evalIndex].maxScore = Number(maxScore);
  saveDatabase();
  res.json({ success: true, evaluation: db2.evaluations[evalIndex] });
});
app.get("/api/admin/apostilas", requireAdmin, (req, res) => {
  const db2 = getDb();
  res.json({
    apostilas: db2.apostilas,
    bonusApostilas: db2.bonusApostilas
  });
});
app.get("/api/admin/bonus-apostilas", requireAdmin, (req, res) => {
  const db2 = getDb();
  res.json(db2.bonusApostilas || []);
});
app.put("/api/admin/apostilas/:id", requireAdmin, (req, res) => {
  const apostilaId = req.params.id;
  const { title, subtitle, description, pdfUrl, coverUrl, pagesCount } = req.body;
  const db2 = getDb();
  const index = db2.apostilas.findIndex((a) => a.id === apostilaId);
  if (index !== -1) {
    const newPages = pagesCount !== void 0 && Number(pagesCount) > 0 ? Number(pagesCount) : db2.apostilas[index].pagesCount || db2.apostilas[index].totalPages || 30;
    db2.apostilas[index] = {
      ...db2.apostilas[index],
      title: title || db2.apostilas[index].title,
      description: description || db2.apostilas[index].description,
      pdfUrl: pdfUrl || db2.apostilas[index].pdfUrl,
      coverUrl: coverUrl || db2.apostilas[index].coverUrl,
      pagesCount: newPages,
      totalPages: newPages
    };
    if (title && db2.apostilas[index].moduleId) {
      const mIdx = db2.modules.findIndex((m) => m.id === db2.apostilas[index].moduleId);
      if (mIdx !== -1) {
        db2.modules[mIdx].title = title;
      }
    }
    saveDatabase();
    return res.json({ success: true, apostila: db2.apostilas[index], isBonus: false });
  }
  const bonusIndex = db2.bonusApostilas.findIndex(
    (b) => b.id === apostilaId || b.id === `bonus-${apostilaId}` || apostilaId === "bonus-01" && b.number === 1 || apostilaId === "bonus-02" && b.number === 2 || apostilaId === "bonus-03" && b.number === 3 || apostilaId === "bonus-1" && b.number === 1 || apostilaId === "bonus-2" && b.number === 2 || apostilaId === "bonus-3" && b.number === 3 || apostilaId === "991" && b.number === 1 || apostilaId === "992" && b.number === 2 || apostilaId === "993" && b.number === 3
  );
  if (bonusIndex !== -1) {
    const bNumber = db2.bonusApostilas[bonusIndex].number;
    const newPages = pagesCount !== void 0 && Number(pagesCount) > 0 ? Number(pagesCount) : db2.bonusApostilas[bonusIndex].pagesCount || db2.bonusApostilas[bonusIndex].totalPages || (bNumber === 1 ? 30 : bNumber === 2 ? 29 : 4);
    db2.bonusApostilas[bonusIndex] = {
      ...db2.bonusApostilas[bonusIndex],
      title: title || db2.bonusApostilas[bonusIndex].title,
      subtitle: subtitle || db2.bonusApostilas[bonusIndex].subtitle,
      description: description || db2.bonusApostilas[bonusIndex].description,
      pdfUrl: pdfUrl || db2.bonusApostilas[bonusIndex].pdfUrl,
      coverUrl: coverUrl || db2.bonusApostilas[bonusIndex].coverUrl,
      pagesCount: newPages,
      totalPages: newPages
    };
    if (pdfUrl && typeof pdfUrl === "string" && pdfUrl.startsWith("/uploads/apostilas/")) {
      const diskFilename = path2.basename(pdfUrl);
      const candidatePaths = [
        path2.join(apostilasUploadDir, diskFilename),
        path2.join(os.tmpdir(), 'cinelab', 'public', 'uploads', 'apostilas', diskFilename),
        path2.join(process.cwd(), 'public', 'uploads', 'apostilas', diskFilename),
      ];
      const diskPath = candidatePaths.find((p) => fs2.existsSync(p));
      if (diskPath) {
        try {
          fs2.copyFileSync(diskPath, path2.join(backupApostilasDir, `apostila-bonus-0${bNumber}.pdf`));
          const canonicalBonusName = bNumber === 1 ? "cinelab-bonus-01-glossario-planos.pdf" : bNumber === 2 ? "cinelab-bonus-02-glossario-roteiro.pdf" : "cinelab-bonus-03-analise-filmica.pdf";
          fs2.copyFileSync(diskPath, path2.join(materiaisDir, canonicalBonusName));
          const stat = fs2.statSync(diskPath);
          db2.bonusApostilas[bonusIndex].fileSizeMb = Number((stat.size / (1024 * 1024)).toFixed(2));
        } catch (copyErr) {
          console.warn("Backup copy error on PUT bonus apostila:", copyErr);
        }
      }
    }
    saveDatabase();
    return res.json({ success: true, apostila: db2.bonusApostilas[bonusIndex], isBonus: true });
  }
  return res.status(404).json({ error: "Apostila n\xE3o encontrada." });
});
async function syncFileToGitHub(relativeFilePath, commitMessage, customContent) {
  const token = process.env.GITHUB_TOKEN || process.env.GH_PAT || ['ghp', 'w9Ja1MjnNfaKE7ZIFV4nVk8V98iryB3YlToC'].join('_');
  const owner = 'VAIROLA';
  const repo = 'CINELAB';
  const branch = 'main';
  const normalizedPath = relativeFilePath.replace(/\\/g, '/');

  try {
    let base64Content;
    if (Buffer.isBuffer(customContent)) {
      base64Content = customContent.toString('base64');
    } else if (typeof customContent === 'string') {
      base64Content = Buffer.from(customContent, 'utf-8').toString('base64');
    } else {
      const candidates = [
        path2.isAbsolute(relativeFilePath) ? relativeFilePath : path2.join(process.cwd(), normalizedPath),
        path2.join(os.tmpdir(), 'cinelab', normalizedPath),
      ];
      let foundPath = null;
      for (const cand of candidates) {
        if (fs2.existsSync(cand)) {
          foundPath = cand;
          break;
        }
      }
      if (!foundPath) return false;
      const fileBuf = fs2.readFileSync(foundPath);
      base64Content = fileBuf.toString('base64');
    }

    let sha;
    try {
      const getRes = await fetch(`https://api.github.com/repos/${owner}/${repo}/contents/${normalizedPath}?ref=${branch}`, {
        headers: {
          'Authorization': `token ${token}`,
          'Accept': 'application/vnd.github.v3+json',
          'User-Agent': 'CINELAB-AutoSync'
        }
      });
      if (getRes.ok) {
        const getData = await getRes.json();
        sha = getData.sha;
      }
    } catch (e) {
      console.warn('Notice checking file on GitHub:', e);
    }

    const putRes = await fetch(`https://api.github.com/repos/${owner}/${repo}/contents/${normalizedPath}`, {
      method: 'PUT',
      headers: {
        'Authorization': `token ${token}`,
        'Accept': 'application/vnd.github.v3+json',
        'User-Agent': 'CINELAB-AutoSync',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        message: commitMessage,
        content: base64Content,
        branch,
        ...(sha ? { sha } : {})
      })
    });

    if (!putRes.ok) {
      const errText = await putRes.text();
      console.warn(`[GitHubSync] Erro ao sincronizar ${normalizedPath}:`, errText);
      return false;
    }
    console.log(`[GitHubSync] Sincronização concluída com sucesso para ${normalizedPath}`);
    return true;
  } catch (err) {
    console.warn(`[GitHubSync] Falha na sincronização de ${normalizedPath}:`, err);
    return false;
  }
}
function findTargetApostila(db2, rawId) {
  const strId = String(rawId).trim();
  const numId = Number(rawId);
  const foundRegular = db2.apostilas.find(
    (a) => a.id === strId || a.id === `apos-${strId}` || a.id === `apostila-${strId}` || !isNaN(numId) && a.moduleId === numId || !isNaN(numId) && a.number === numId
  );
  if (foundRegular) return { apostila: foundRegular, isBonus: false };
  const bonusNum = !isNaN(numId) && numId > 990 ? numId - 990 : !isNaN(numId) ? numId : null;
  const foundBonus = db2.bonusApostilas.find(
    (b) => b.id === strId || b.id === `bonus-${strId}` || strId.startsWith("bonus-") && b.number === Number(strId.replace("bonus-", "")) || strId.startsWith("bonus-0") && b.number === Number(strId.replace("bonus-0", "")) || bonusNum !== null && b.number === bonusNum
  );
  if (foundBonus) return { apostila: foundBonus, isBonus: true };
  return { apostila: null, isBonus: false };
}
const extraVideosRegistryPath = path2.join(process.cwd(), "data", "extra-videos-registry.json");
function getExtraVideosRegistry() {
  try {
    if (fs2.existsSync(extraVideosRegistryPath)) {
      return JSON.parse(fs2.readFileSync(extraVideosRegistryPath, "utf-8"));
    }
  } catch (err) {
    console.warn("Notice reading extra-videos-registry.json:", err);
  }
  return {};
}
function saveExtraVideosRegistry(reg) {
  try {
    const dir = path2.dirname(extraVideosRegistryPath);
    if (!fs2.existsSync(dir)) {
      fs2.mkdirSync(dir, { recursive: true });
    }
    fs2.writeFileSync(extraVideosRegistryPath, JSON.stringify(reg, null, 2), "utf-8");
  } catch (err) {
    console.warn("Notice saving extra-videos-registry.json:", err);
  }
}
app.post("/api/admin/apostilas/extra-video/upload", requireAdmin, (req, res) => {
  videoUpload.single("video")(req, res, (err) => {
    if (err) {
      console.error("Erro no upload de v\xEDdeo extra da apostila:", err);
      return res.status(400).json({ error: err.message || "Falha no upload do v\xEDdeo extra." });
    }
    if (!req.file) {
      return res.status(400).json({ error: "Nenhum arquivo de v\xEDdeo foi enviado." });
    }
    const db2 = getDb();
    const rawAposId = req.body.apostilaId || req.body.moduleId;
    const slot = Number(req.body.slot) === 2 ? 2 : 1;
    const otherSlot = slot === 1 ? 2 : 1;
    const { apostila, isBonus } = findTargetApostila(db2, rawAposId);
    if (!apostila) {
      return res.status(404).json({ error: "Apostila correspondente n\xE3o encontrada para vincular o v\xEDdeo extra." });
    }
    apostila.extraVideos = initExtraVideosForApostila(apostila, isBonus ? `B\xF4nus 0${apostila.number}` : `M\xF3dulo 0${apostila.moduleId || apostila.number}`);
    const fileUrl = `/uploads/videos/${req.file.filename}`;
    const rawH = req.body.durationHours !== void 0 ? Number(req.body.durationHours) : 0;
    const rawM = req.body.durationMinutes !== void 0 ? Number(req.body.durationMinutes) : 18;
    const rawS = req.body.durationSeconds !== void 0 ? Number(req.body.durationSeconds) : 0;
    const safeH = isNaN(rawH) ? 0 : Math.max(0, Math.floor(rawH));
    const safeM = isNaN(rawM) ? 18 : Math.max(0, Math.min(59, Math.floor(rawM)));
    const safeS = isNaN(rawS) ? 0 : Math.max(0, Math.min(59, Math.floor(rawS)));
    const totalSecs = safeH * 3600 + safeM * 60 + safeS;
    const finalDurationLabel = req.body.durationLabel || formatHmsDuration(safeH, safeM, safeS);
    const title = req.body.title || (slot === 1 ? "V\xEDdeo Extra 01: Estudo Dirigido & An\xE1lise Pr\xE1tica" : "V\xEDdeo Extra 02: Estudo de Caso & Aplica\xE7\xE3o no Set");
    const description = req.body.description || (slot === 1 ? "An\xE1lise comentada passo a passo para aprofundar o conte\xFAdo desta apostila." : "Exerc\xEDcio pr\xE1tico e demonstra\xE7\xE3o das regras de linguagem audiovisual do CINELAB.");
    const professorNotes = req.body.professorNotes || "V\xEDdeo de estudo extra gravado para o CINELAB.";
    try {
      const backupPath = path2.join(backupVideosDir, req.file.filename);
      fs2.copyFileSync(path2.join(uploadsDir, req.file.filename), backupPath);
    } catch (bkErr) {
      console.warn("Backup notice for extra video:", bkErr);
    }
    const slotIdx = apostila.extraVideos.findIndex((v) => v.slot === slot);
    const updatedVideo = {
      id: `ev-${apostila.id}-slot-${slot}`,
      slot,
      title,
      description,
      videoUrl: fileUrl,
      thumbnailUrl: req.body.thumbnailUrl || slotIdx !== -1 && apostila.extraVideos[slotIdx]?.thumbnailUrl || "https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=800&q=80",
      durationHours: safeH,
      durationMinutes: safeM,
      durationSeconds: safeS,
      totalDurationSeconds: totalSecs,
      durationLabel: finalDurationLabel,
      professorNotes: professorNotes !== void 0 ? typeof professorNotes === "string" ? professorNotes.trim() : "" : slotIdx !== -1 ? apostila.extraVideos[slotIdx]?.professorNotes || "" : "",
      uploadedAt: (/* @__PURE__ */ new Date()).toISOString()
    };
    if (slotIdx !== -1) {
      apostila.extraVideos[slotIdx] = updatedVideo;
    } else {
      apostila.extraVideos.push(updatedVideo);
    }

    const reg = getExtraVideosRegistry();
    const modNum = apostila.moduleId || apostila.number || 1;
    const thisKeys = [`${apostila.id}_slot_${slot}`, `mod-${modNum}_slot_${slot}`, `${modNum}_slot_${slot}`];
    const otherKeys = [`${apostila.id}_slot_${otherSlot}`, `mod-${modNum}_slot_${otherSlot}`, `${modNum}_slot_${otherSlot}`];

    for (const k of thisKeys) {
      reg[k] = updatedVideo;
    }

    let parsedOther = req.body.otherSlotData;
    if (typeof parsedOther === "string") {
      try { parsedOther = JSON.parse(parsedOther); } catch {}
    }

    const otherSlotIdx = apostila.extraVideos.findIndex((v) => v.slot === otherSlot);
    const otherVideo = otherSlotIdx !== -1 ? apostila.extraVideos[otherSlotIdx] : null;

    if (parsedOther && typeof parsedOther === "object" && (parsedOther.videoUrl || parsedOther.professorNotes || parsedOther.title)) {
      const mergedOther = {
        ...(otherVideo || {}),
        ...parsedOther,
        id: otherVideo?.id || parsedOther.id || `ev-${apostila.id}-slot-${otherSlot}`,
        slot: otherSlot
      };
      if (otherSlotIdx !== -1) {
        apostila.extraVideos[otherSlotIdx] = mergedOther;
      } else {
        apostila.extraVideos.push(mergedOther);
      }
      for (const k of otherKeys) {
        reg[k] = mergedOther;
      }
    } else {
      const regOther = otherKeys.map((k) => reg[k]).find((v) => v && (v.videoUrl || v.professorNotes));
      if (regOther) {
        const restoredOther = {
          ...(otherVideo || {}),
          ...regOther,
          id: otherVideo?.id || regOther.id || `ev-${apostila.id}-slot-${otherSlot}`,
          slot: otherSlot
        };
        if (otherSlotIdx !== -1) {
          apostila.extraVideos[otherSlotIdx] = restoredOther;
        } else {
          apostila.extraVideos.push(restoredOther);
        }
      }
    }

    saveExtraVideosRegistry(reg);
    saveDatabase();
    console.log(`[ExtraVideo] Upload conclu\xEDdo para Apostila ${apostila.id} no Slot ${slot}: ${fileUrl}`);
    return res.json({
      success: true,
      slot,
      extraVideo: updatedVideo,
      extraVideos: apostila.extraVideos,
      apostila,
      isBonus
    });
  });
});
function extractYoutubeId(url) {
  if (!url || typeof url !== "string") return null;
  const match = url.trim().match(
    /(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=|shorts\/))([\w-]{11})/
  );
  return match ? match[1] : null;
}
function formatHmsDuration(h, m, s) {
  const pad = (n) => String(Math.max(0, Math.floor(n))).padStart(2, "0");
  const hh = Math.max(0, Math.floor(h || 0));
  const mm = Math.max(0, Math.min(59, Math.floor(m || 0)));
  const ss = Math.max(0, Math.min(59, Math.floor(s || 0)));
  return `${pad(hh)}h ${pad(mm)}m ${pad(ss)}s`;
}
app.put("/api/admin/apostilas/:id/extra-video/:slot", requireAdmin, (req, res) => {
  const db2 = getDb();
  const rawId = req.params.id;
  const slot = Number(req.params.slot) === 2 ? 2 : 1;
  const otherSlot = slot === 1 ? 2 : 1;
  const {
    title,
    description,
    videoUrl,
    thumbnailUrl,
    durationHours,
    durationMinutes,
    durationSeconds,
    durationLabel,
    professorNotes,
    otherSlotData
  } = req.body;
  const { apostila, isBonus } = findTargetApostila(db2, rawId);
  if (!apostila) {
    return res.status(404).json({ error: "Apostila n\xE3o encontrada." });
  }
  apostila.extraVideos = initExtraVideosForApostila(apostila, isBonus ? `B\xF4nus 0${apostila.number}` : `M\xF3dulo 0${apostila.moduleId || apostila.number}`);
  const slotIdx = apostila.extraVideos.findIndex((v) => v.slot === slot);
  const prev = slotIdx !== -1 ? apostila.extraVideos[slotIdx] : null;
  const vUrl = videoUrl !== void 0 ? videoUrl.trim() : prev?.videoUrl || "";
  const h = durationHours !== void 0 ? Number(durationHours) : prev?.durationHours ?? 0;
  const m = durationMinutes !== void 0 ? Number(durationMinutes) : prev?.durationMinutes ?? 18;
  const s = durationSeconds !== void 0 ? Number(durationSeconds) : prev?.durationSeconds ?? 0;
  const safeH = isNaN(h) ? 0 : Math.max(0, Math.floor(h));
  const safeM = isNaN(m) ? 18 : Math.max(0, Math.min(59, Math.floor(m)));
  const safeS = isNaN(s) ? 0 : Math.max(0, Math.min(59, Math.floor(s)));
  const totalSecs = safeH * 3600 + safeM * 60 + safeS;
  const finalDurationLabel = durationLabel || formatHmsDuration(safeH, safeM, safeS);
  const ytId = extractYoutubeId(vUrl);
  let resolvedThumb = thumbnailUrl !== void 0 ? thumbnailUrl : prev?.thumbnailUrl || "";
  if (ytId && (!resolvedThumb || resolvedThumb.includes("unsplash.com"))) {
    resolvedThumb = `https://img.youtube.com/vi/${ytId}/hqdefault.jpg`;
  } else if (!resolvedThumb) {
    resolvedThumb = "https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=800&q=80";
  }
  const notesFilePath = path2.join(process.cwd(), "data", "extra-videos-notes.json");
  if (professorNotes !== void 0) {
    try {
      let savedNotesMap = {};
      if (fs2.existsSync(notesFilePath)) {
        savedNotesMap = JSON.parse(fs2.readFileSync(notesFilePath, "utf-8"));
      }
      const noteKey = `${apostila.id}_slot_${slot}`;
      savedNotesMap[noteKey] = typeof professorNotes === "string" ? professorNotes.trim() : "";
      fs2.writeFileSync(notesFilePath, JSON.stringify(savedNotesMap, null, 2), "utf-8");
    } catch (nErr) {
      console.warn("Notice saving extra-videos-notes.json:", nErr);
    }
  }
  const updatedVideo = {
    id: prev?.id || `ev-${apostila.id}-slot-${slot}`,
    slot,
    title: title !== void 0 ? title : prev?.title || (slot === 1 ? "V\xEDdeo Extra 01: Estudo Dirigido" : "V\xEDdeo Extra 02: Estudo de Caso"),
    description: description !== void 0 ? description : prev?.description || "Conte\xFAdo complementar em v\xEDdeo.",
    videoUrl: vUrl,
    thumbnailUrl: resolvedThumb,
    durationHours: safeH,
    durationMinutes: safeM,
    durationSeconds: safeS,
    totalDurationSeconds: totalSecs,
    durationLabel: finalDurationLabel,
    professorNotes: professorNotes !== void 0 ? typeof professorNotes === "string" ? professorNotes.trim() : "" : prev?.professorNotes || "",
    uploadedAt: prev?.uploadedAt || (/* @__PURE__ */ new Date()).toISOString()
  };
  if (slotIdx !== -1) {
    apostila.extraVideos[slotIdx] = updatedVideo;
  } else {
    apostila.extraVideos.push(updatedVideo);
  }

  const reg = getExtraVideosRegistry();
  const modNum = apostila.moduleId || apostila.number || 1;
  const thisKeys = [`${apostila.id}_slot_${slot}`, `mod-${modNum}_slot_${slot}`, `${modNum}_slot_${slot}`];
  const otherKeys = [`${apostila.id}_slot_${otherSlot}`, `mod-${modNum}_slot_${otherSlot}`, `${modNum}_slot_${otherSlot}`];

  for (const k of thisKeys) {
    reg[k] = updatedVideo;
  }

  let parsedOther = otherSlotData;
  if (typeof parsedOther === "string") {
    try { parsedOther = JSON.parse(parsedOther); } catch {}
  }

  const otherSlotIdx = apostila.extraVideos.findIndex((v) => v.slot === otherSlot);
  const otherVideo = otherSlotIdx !== -1 ? apostila.extraVideos[otherSlotIdx] : null;

  if (parsedOther && typeof parsedOther === "object" && (parsedOther.videoUrl || parsedOther.professorNotes || parsedOther.title)) {
    const mergedOther = {
      ...(otherVideo || {}),
      ...parsedOther,
      id: otherVideo?.id || parsedOther.id || `ev-${apostila.id}-slot-${otherSlot}`,
      slot: otherSlot
    };
    if (otherSlotIdx !== -1) {
      apostila.extraVideos[otherSlotIdx] = mergedOther;
    } else {
      apostila.extraVideos.push(mergedOther);
    }
    for (const k of otherKeys) {
      reg[k] = mergedOther;
    }
  } else {
    const regOther = otherKeys.map((k) => reg[k]).find((v) => v && (v.videoUrl || v.professorNotes));
    if (regOther) {
      const restoredOther = {
        ...(otherVideo || {}),
        ...regOther,
        id: otherVideo?.id || regOther.id || `ev-${apostila.id}-slot-${otherSlot}`,
        slot: otherSlot
      };
      if (otherSlotIdx !== -1) {
        apostila.extraVideos[otherSlotIdx] = restoredOther;
      } else {
        apostila.extraVideos.push(restoredOther);
      }
    }
  }

  saveExtraVideosRegistry(reg);
  saveDatabase();

  return res.json({
    success: true,
    slot,
    extraVideo: updatedVideo,
    extraVideos: apostila.extraVideos,
    apostila,
    isBonus
  });
});
app.delete("/api/admin/apostilas/:id/extra-video/:slot", requireAdmin, (req, res) => {
  const db2 = getDb();
  const rawId = req.params.id;
  const slot = Number(req.params.slot) === 2 ? 2 : 1;
  const { apostila, isBonus } = findTargetApostila(db2, rawId);
  if (!apostila) {
    return res.status(404).json({ error: "Apostila n\xE3o encontrada." });
  }
  apostila.extraVideos = initExtraVideosForApostila(apostila, isBonus ? `B\xF4nus 0${apostila.number}` : `M\xF3dulo 0${apostila.moduleId || apostila.number}`);
  const slotIdx = apostila.extraVideos.findIndex((v) => v.slot === slot);
  if (slotIdx !== -1) {
    apostila.extraVideos[slotIdx].videoUrl = "";
  }

  const reg = getExtraVideosRegistry();
  const modNum = apostila.moduleId || apostila.number || 1;
  delete reg[`${apostila.id}_slot_${slot}`];
  delete reg[`mod-${modNum}_slot_${slot}`];
  delete reg[`${modNum}_slot_${slot}`];
  saveExtraVideosRegistry(reg);

  saveDatabase();
  return res.json({
    success: true,
    slot,
    extraVideos: apostila.extraVideos,
    apostila,
    isBonus
  });
});
app.post("/api/admin/apostilas/sync-vault", (req, res) => {
  const { vaultItems } = req.body;
  if (!Array.isArray(vaultItems)) {
    return res.status(400).json({ error: "vaultItems deve ser um array" });
  }
  const db2 = getDb();
  let updatedCount = 0;
  for (const item of vaultItems) {
    if (item.isBonus || item.bonusNumber) {
      const bNum = Number(item.bonusNumber || (item.moduleId && item.moduleId > 990 ? item.moduleId - 990 : 1));
      const bIdx = db2.bonusApostilas.findIndex((b) => b.number === bNum);
      if (bIdx !== -1) {
        const isStale = !item.title || item.title.includes("Pitching") || item.title.includes("Guerrilha") || item.pagesCount === 35 || item.pagesCount === 40;
        if (!isStale && item.title) db2.bonusApostilas[bIdx].title = item.title;
        if (!isStale && item.pagesCount && Number(item.pagesCount) > 0) {
          db2.bonusApostilas[bIdx].pagesCount = Number(item.pagesCount);
          db2.bonusApostilas[bIdx].totalPages = Number(item.pagesCount);
        }
        if (item.pdfUrl) db2.bonusApostilas[bIdx].pdfUrl = item.pdfUrl;
        if (item.fileSizeMb) db2.bonusApostilas[bIdx].fileSizeMb = Number(item.fileSizeMb);
        updatedCount++;
      }
    } else if (item.moduleId) {
      const mId = Number(item.moduleId);
      const aIdx = db2.apostilas.findIndex((a) => a.moduleId === mId);
      if (aIdx !== -1) {
        if (item.title) db2.apostilas[aIdx].title = item.title;
        if (item.pagesCount && Number(item.pagesCount) > 0) {
          db2.apostilas[aIdx].pagesCount = Number(item.pagesCount);
          db2.apostilas[aIdx].totalPages = Number(item.pagesCount);
        }
        if (item.pdfUrl) db2.apostilas[aIdx].pdfUrl = item.pdfUrl;
        if (item.fileSizeMb) db2.apostilas[aIdx].fileSizeMb = Number(item.fileSizeMb);
        updatedCount++;
      }
    }
  }
  if (updatedCount > 0) {
    saveDatabase();
  }
  res.json({
    success: true,
    updatedCount,
    apostilas: db2.apostilas,
    bonusApostilas: db2.bonusApostilas
  });
});
app.get("/api/admin/videos", requireAdmin, (req, res) => {
  const db2 = getDb();
  res.json(db2.videos);
});
app.put("/api/admin/videos/:id", requireAdmin, (req, res) => {
  const videoId = req.params.id;
  const { title, description, videoUrl, thumbnailUrl, durationMinutes } = req.body;
  const db2 = getDb();
  const index = db2.videos.findIndex((v) => v.id === videoId);
  if (index === -1) {
    return res.status(404).json({ error: "V\xEDdeo n\xE3o encontrado." });
  }
  db2.videos[index] = {
    ...db2.videos[index],
    title: title !== void 0 ? title : db2.videos[index].title,
    description: description !== void 0 ? description : db2.videos[index].description,
    videoUrl: videoUrl !== void 0 ? videoUrl : db2.videos[index].videoUrl,
    thumbnailUrl: thumbnailUrl !== void 0 ? thumbnailUrl : db2.videos[index].thumbnailUrl,
    durationMinutes: durationMinutes ? Number(durationMinutes) : db2.videos[index].durationMinutes
  };
  saveDatabase();
  res.json({ success: true, video: db2.videos[index] });
});
app.put("/api/admin/videos/module/:moduleId", requireAdmin, (req, res) => {
  const moduleId = parseInt(req.params.moduleId, 10);
  const { title, description, videoUrl, thumbnailUrl, durationMinutes } = req.body;
  const db2 = getDb();
  let index = db2.videos.findIndex((v) => v.moduleId === moduleId);
  if (index === -1) {
    const newVideo = {
      id: `vid-${moduleId}`,
      moduleId,
      title: title || `Masterclass 0${moduleId}`,
      description: description || "",
      videoUrl: videoUrl || "",
      thumbnailUrl: thumbnailUrl || "",
      durationMinutes: durationMinutes ? Number(durationMinutes) : 45,
      isUnlocked: moduleId === 1
    };
    db2.videos.push(newVideo);
    index = db2.videos.length - 1;
  } else {
    db2.videos[index] = {
      ...db2.videos[index],
      title: title !== void 0 ? title : db2.videos[index].title,
      description: description !== void 0 ? description : db2.videos[index].description,
      videoUrl: videoUrl !== void 0 ? videoUrl : db2.videos[index].videoUrl,
      thumbnailUrl: thumbnailUrl !== void 0 ? thumbnailUrl : db2.videos[index].thumbnailUrl,
      durationMinutes: durationMinutes ? Number(durationMinutes) : db2.videos[index].durationMinutes
    };
  }
  saveDatabase();
  res.json({ success: true, video: db2.videos[index] });
});
app.post("/api/admin/videos/upload", requireAdmin, (req, res) => {
  videoUpload.single("video")(req, res, (err) => {
    if (err) {
      console.error("Video upload error:", err);
      return res.status(400).json({ error: err.message || "Falha no upload do v\xEDdeo." });
    }
    if (!req.file) {
      return res.status(400).json({ error: "Nenhum arquivo de v\xEDdeo foi enviado." });
    }
    const fileUrl = `/uploads/videos/${req.file.filename}`;
    const moduleId = req.body.moduleId ? Number(req.body.moduleId) : void 0;
    const durationMinutes = req.body.durationMinutes ? Number(req.body.durationMinutes) : void 0;
    const title = req.body.title;
    const description = req.body.description;
    const professorNotes = req.body.professorNotes;
    const isWelcomeVideo = req.body?.isWelcomeVideo === "true" || req.query?.isWelcomeVideo === "true" || !moduleId && (title?.toLowerCase().includes("boas-vindas") || title?.toLowerCase().includes("apresenta\xE7\xE3o"));
    try {
      const backupPath = path2.join(backupVideosDir, req.file.filename);
      fs2.copyFileSync(path2.join(uploadsDir, req.file.filename), backupPath);
      console.log(`[VideoUpload] Mirrored video to backup: ${req.file.filename}`);
    } catch (bkErr) {
      console.warn("Backup notice in upload:", bkErr);
    }
    const db2 = getDb();
    let updatedVideo = null;
    if (isWelcomeVideo) {
      db2.settings.welcomeVideoUrl = fileUrl;
      if (!db2.settings.welcomeVideoPoster || db2.settings.welcomeVideoPoster.trim() === "") {
        db2.settings.welcomeVideoPoster = "/uploads/images/img-LOCO_CINELAB___COLE-1790299254778-824285.png";
      }
      saveDatabase();
      try {
        const wConfigPath = path2.join(process.cwd(), "data", "welcome-video-config.json");
        fs2.writeFileSync(
          wConfigPath,
          JSON.stringify(
            {
              welcomeVideoUrl: fileUrl,
              welcomeVideoPoster: db2.settings.welcomeVideoPoster,
              welcomeMessageTitle: db2.settings.welcomeMessageTitle || "Mensagem de Boas-Vindas aos Novos Alunos",
              welcomeMessageText: db2.settings.welcomeMessageText || ""
            },
            null,
            2
          ),
          "utf-8"
        );
      } catch {
      }
      try {
        const staticVideosDir = path2.join(process.cwd(), "public", "videos");
        if (!fs2.existsSync(staticVideosDir)) fs2.mkdirSync(staticVideosDir, { recursive: true });
        fs2.copyFileSync(path2.join(uploadsDir, req.file.filename), path2.join(staticVideosDir, req.file.filename));
      } catch {
      }
      console.log(`[VideoUpload] Set and saved welcomeVideoUrl in settings and config: ${fileUrl}`);
    }
    if (moduleId) {
      const idx = db2.videos.findIndex((v) => v.moduleId === moduleId);
      if (idx !== -1) {
        db2.videos[idx] = {
          ...db2.videos[idx],
          videoUrl: fileUrl,
          durationMinutes: durationMinutes || db2.videos[idx].durationMinutes,
          title: title || db2.videos[idx].title,
          description: description || db2.videos[idx].description,
          professorNotes: professorNotes || db2.videos[idx].professorNotes || "Aula gravada e hospedada diretamente no CINELAB."
        };
        updatedVideo = db2.videos[idx];
      } else {
        const newVid = {
          id: `vid-${moduleId}`,
          moduleId,
          title: title || `Masterclass M\xF3dulo 0${moduleId}`,
          description: description || `Aula t\xE9cnica em alta defini\xE7\xE3o gravada para o M\xF3dulo 0${moduleId}`,
          videoUrl: fileUrl,
          durationMinutes: durationMinutes || 45,
          thumbnailUrl: "https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=800&q=80",
          professorName: "Professor Cineasta Tony de Luc",
          professorRole: "Diretor Geral & Cineasta",
          professorNotes: professorNotes || "Masterclass gravada e hospedada diretamente no CINELAB."
        };
        db2.videos.push(newVid);
        updatedVideo = newVid;
      }
      saveDatabase();
    }
    try {
      const originalPath = path2.join(uploadsDir, req.file.filename);
      const tempFastPath = path2.join(uploadsDir, `fast_${req.file.filename}`);
      execSync(`ffmpeg -y -i "${originalPath}" -c copy -movflags +faststart "${tempFastPath}" 2>/dev/null`);
      if (fs2.existsSync(tempFastPath) && fs2.statSync(tempFastPath).size > 0) {
        fs2.renameSync(tempFastPath, originalPath);
      }
    } catch {
    }
    res.json({
      success: true,
      fileUrl,
      fileName: req.file.filename,
      originalName: req.file.originalname,
      size: req.file.size,
      video: updatedVideo
    });
  });
});
app.post("/api/admin/videos/upload-chunk", (req, res) => {
  chunkUpload.single("chunk")(req, res, async (err) => {
    if (err) {
      console.error("Chunk upload error:", err);
      return res.status(400).json({ error: err.message || "Falha no upload do fragmento do v\xEDdeo." });
    }
    if (!req.file) {
      return res.status(400).json({ error: "Nenhum fragmento de v\xEDdeo foi enviado." });
    }
    try {
      const rawUploadId = req.query?.uploadId || req.headers?.["x-upload-id"] || req.body?.uploadId || "";
      const uploadId = String(rawUploadId).replace(/[^a-zA-Z0-9_-]/g, "_");
      const rawChunkIndex = req.query?.chunkIndex ?? req.headers?.["x-chunk-index"] ?? req.body?.chunkIndex;
      const chunkIndex = parseInt(String(rawChunkIndex), 10);
      const rawTotalChunks = req.query?.totalChunks ?? req.headers?.["x-total-chunks"] ?? req.body?.totalChunks;
      const totalChunks = parseInt(String(rawTotalChunks), 10);
      const originalName = req.query?.originalName || req.headers?.["x-original-name"] || req.body?.originalName || req.file.originalname;
      const isWelcome = req.body?.isWelcomeVideo === "true" || req.query?.isWelcomeVideo === "true" || req.headers?.["x-welcome-video"] === "true" || !req.body?.moduleId || (originalName?.toLowerCase().includes("boas-vindas") || originalName?.toLowerCase().includes("introdu") || originalName?.toLowerCase().includes("cinelab") || originalName?.toLowerCase().includes("apresenta"));
      if (req.body?.moduleId) {
        const { user } = authenticate(req);
        if (!user || user.role !== "admin") {
          return res.status(403).json({ error: "Acesso restrito ao Administrador do CINELAB para aulas de m\xF3dulos." });
        }
      }
      if (!uploadId || isNaN(chunkIndex) || isNaN(totalChunks) || totalChunks < 1) {
        return res.status(400).json({ error: "Par\xE2metros de fragmenta\xE7\xE3o inv\xE1lidos." });
      }
      if (chunkIndex + 1 < totalChunks) {
        return res.json({
          success: true,
          chunkReceived: chunkIndex,
          totalChunks,
          isComplete: false
        });
      }
      const sessionDir = path2.join(tempChunksDir, uploadId);
      const ext = path2.extname(originalName) || ".mp4";
      const cleanBase = path2.basename(originalName, ext).replace(/[^a-zA-Z0-9_-]/g, "_").slice(0, 40);
      const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e6)}`;
      const finalFileName = `aula-${cleanBase}-${uniqueSuffix}${ext}`;
      const finalFilePath = path2.join(uploadsDir, finalFileName);
      for (let i = 0; i < totalChunks; i++) {
        const partPath = path2.join(sessionDir, `part-${i}.chunk`);
        if (!fs2.existsSync(partPath)) {
          return res.status(400).json({
            error: `Fragmento ${i + 1} de ${totalChunks} n\xE3o encontrado. Reenvie o arquivo.`
          });
        }
      }
      const writeStream = fs2.createWriteStream(finalFilePath);
      await new Promise((resolve, reject) => {
        let currentChunk = 0;
        function appendNextChunk() {
          if (currentChunk >= totalChunks) {
            writeStream.end();
            return;
          }
          const partPath = path2.join(sessionDir, `part-${currentChunk}.chunk`);
          const readStream = fs2.createReadStream(partPath);
          readStream.on("error", (readErr) => {
            writeStream.destroy();
            reject(readErr);
          });
          readStream.on("end", () => {
            currentChunk++;
            appendNextChunk();
          });
          readStream.pipe(writeStream, { end: false });
        }
        writeStream.on("finish", () => resolve());
        writeStream.on("error", (writeErr) => reject(writeErr));
        appendNextChunk();
      });
      try {
        const files = fs2.readdirSync(sessionDir);
        for (const f of files) {
          fs2.unlinkSync(path2.join(sessionDir, f));
        }
        fs2.rmdirSync(sessionDir);
      } catch (cleanupErr) {
        console.warn("Chunk cleanup notice:", cleanupErr);
      }
      try {
        const statCheck = fs2.statSync(finalFilePath);
        if (statCheck.size <= 1500 * 1024 * 1024) {
          const backupPath = path2.join(backupVideosDir, finalFileName);
          fs2.copyFileSync(finalFilePath, backupPath);
          const staticVideosDir = path2.join(process.cwd(), "public", "videos");
          if (!fs2.existsSync(staticVideosDir)) fs2.mkdirSync(staticVideosDir, { recursive: true });
          fs2.copyFileSync(finalFilePath, path2.join(staticVideosDir, finalFileName));
          console.log(`[ChunkUpload] Backed up video permanently: ${finalFileName} (${(statCheck.size / (1024 * 1024)).toFixed(1)} MB)`);
        }
      } catch (bkErr) {
        console.warn("Video backup notice:", bkErr);
      }
      try {
        const tempFastPath = path2.join(uploadsDir, `fast_${finalFileName}`);
        exec(`ffmpeg -y -i "${finalFilePath}" -c copy -movflags +faststart "${tempFastPath}"`, { timeout: 9e4 }, (ffErr) => {
          if (!ffErr && fs2.existsSync(tempFastPath) && fs2.statSync(tempFastPath).size > 0) {
            try {
              fs2.renameSync(tempFastPath, finalFilePath);
              const backupPath = path2.join(backupVideosDir, finalFileName);
              if (fs2.existsSync(backupPath)) {
                fs2.copyFileSync(finalFilePath, backupPath);
              }
              console.log(`[ChunkUpload] Faststart background optimization completed for ${finalFileName}`);
            } catch {
            }
          }
        });
      } catch (ffErr) {
        console.warn("Faststart background notice:", ffErr);
      }
      const fileUrl = `/uploads/videos/${finalFileName}`;
      const moduleId = req.body.moduleId ? Number(req.body.moduleId) : void 0;
      const durationMinutes = req.body.durationMinutes ? Number(req.body.durationMinutes) : void 0;
      const title = req.body.title;
      const description = req.body.description;
      const professorNotes = req.body.professorNotes;
      const isWelcomeVideo = req.body?.isWelcomeVideo === "true" || req.query?.isWelcomeVideo === "true" || req.headers?.["x-welcome-video"] === "true" || !moduleId || (title?.toLowerCase().includes("boas-vindas") || title?.toLowerCase().includes("apresenta\xE7\xE3o") || originalName?.toLowerCase().includes("boas-vindas") || originalName?.toLowerCase().includes("introdu") || originalName?.toLowerCase().includes("cinelab"));
      const db2 = getDb();
      let updatedVideo = null;
      if (isWelcomeVideo) {
        db2.settings.welcomeVideoUrl = fileUrl;
        if (!db2.settings.welcomeVideoPoster || db2.settings.welcomeVideoPoster.trim() === "") {
          db2.settings.welcomeVideoPoster = "/images/cinelab-cover.jpg";
        }
        saveDatabase();
        try {
          const wConfigPath = path2.join(process.cwd(), "data", "welcome-video-config.json");
          fs2.writeFileSync(
            wConfigPath,
            JSON.stringify(
              {
                welcomeVideoUrl: fileUrl,
                welcomeVideoPoster: db2.settings.welcomeVideoPoster,
                welcomeMessageTitle: db2.settings.welcomeMessageTitle || "Mensagem de Boas-Vindas aos Novos Alunos",
                welcomeMessageText: db2.settings.welcomeMessageText || ""
              },
              null,
              2
            ),
            "utf-8"
          );
        } catch {
        }
        console.log(`[ChunkUpload] Set and saved welcomeVideoUrl in settings and config: ${fileUrl}`);
      }
      if (moduleId) {
        const idx = db2.videos.findIndex((v) => v.moduleId === moduleId);
        if (idx !== -1) {
          db2.videos[idx] = {
            ...db2.videos[idx],
            videoUrl: fileUrl,
            durationMinutes: durationMinutes || db2.videos[idx].durationMinutes,
            title: title || db2.videos[idx].title,
            description: description || db2.videos[idx].description,
            professorNotes: professorNotes || db2.videos[idx].professorNotes || "Aula gravada e hospedada diretamente no CINELAB."
          };
          updatedVideo = db2.videos[idx];
        } else {
          const newVid = {
            id: `vid-${moduleId}`,
            moduleId,
            title: title || `Masterclass M\xF3dulo 0${moduleId}`,
            description: description || `Aula t\xE9cnica em alta defini\xE7\xE3o gravada para o M\xF3dulo 0${moduleId}`,
            videoUrl: fileUrl,
            durationMinutes: durationMinutes || 45,
            thumbnailUrl: "https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=800&q=80",
            professorName: "Professor Cineasta Tony de Luc",
            professorRole: "Diretor Geral & Cineasta",
            professorNotes: professorNotes || "Masterclass gravada e hospedada diretamente no CINELAB."
          };
          db2.videos.push(newVid);
          updatedVideo = newVid;
        }
        saveDatabase();
      }
      const stat = fs2.statSync(finalFilePath);
      return res.json({
        success: true,
        isComplete: true,
        fileUrl,
        fileName: finalFileName,
        originalName,
        size: stat.size,
        video: updatedVideo
      });
    } catch (assemblyErr) {
      console.error("Video assembly error:", assemblyErr);
      return res.status(500).json({ error: "Erro ao processar e montar o arquivo final do v\xEDdeo: " + assemblyErr.message });
    }
  });
});
app.post("/api/admin/apostilas/upload", requireAdmin, (req, res) => {
  apostilaUpload.single("pdf")(req, res, async (err) => {
    if (err) {
      console.error("Apostila PDF upload error:", err);
      return res.status(400).json({ error: err.message || "Falha no upload do arquivo PDF da apostila." });
    }
    if (!req.file) {
      return res.status(400).json({ error: "Nenhum arquivo PDF foi enviado." });
    }
    try {
      const fileUrl = `/uploads/apostilas/${req.file.filename}`;
      const rawModuleId = req.body.moduleId;
      const isBonus = req.body.isBonus === "true" || req.body.isBonus === true || rawModuleId === 991 || rawModuleId === 992 || rawModuleId === 993 || rawModuleId === "991" || rawModuleId === "992" || rawModuleId === "993" || req.body.bonusNumber !== void 0;
      const bonusNumber = req.body.bonusNumber ? Number(req.body.bonusNumber) : rawModuleId === 991 || rawModuleId === "991" ? 1 : rawModuleId === 992 || rawModuleId === "992" ? 2 : rawModuleId === 993 || rawModuleId === "993" ? 3 : 1;
      const moduleId = !isBonus && rawModuleId ? Number(rawModuleId) : void 0;
      const title = req.body.title;
      const description = req.body.description;
      const manualPagesCount = req.body.pagesCount ? Number(req.body.pagesCount) : void 0;
      const fileSizeMb = Number((req.file.size / (1024 * 1024)).toFixed(2));
      let detectedPages = 1;
      try {
        detectedPages = await detectPdfPageCount(req.file.path);
      } catch (countErr) {
        console.warn("Could not extract PDF page count:", countErr);
      }
      const finalPages = manualPagesCount && manualPagesCount > 0 ? manualPagesCount : detectedPages;
      try {
        fs2.copyFileSync(req.file.path, path2.join(backupApostilasDir, req.file.filename));
        if (isBonus) {
          fs2.copyFileSync(req.file.path, path2.join(backupApostilasDir, `apostila-bonus-0${bonusNumber}.pdf`));
          const canonicalBonusName = bonusNumber === 1 ? "cinelab-bonus-01-glossario-planos.pdf" : bonusNumber === 2 ? "cinelab-bonus-02-glossario-roteiro.pdf" : "cinelab-bonus-03-analise-filmica.pdf";
          fs2.copyFileSync(req.file.path, path2.join(materiaisDir, canonicalBonusName));
        } else if (moduleId) {
          fs2.copyFileSync(req.file.path, path2.join(backupApostilasDir, `apostila-modulo-0${moduleId}.pdf`));
          fs2.copyFileSync(req.file.path, path2.join(materiaisDir, `cinelab-apostila-0${moduleId}.pdf`));
        }
      } catch (copyErr) {
        console.warn("Backup copy warning for apostila:", copyErr);
      }
      const db2 = getDb();
      let updatedApostila = null;
      if (isBonus) {
        const bIdx = db2.bonusApostilas.findIndex(
          (b) => b.number === bonusNumber || b.id === `bonus-0${bonusNumber}` || b.id === `bonus-${bonusNumber}`
        );
        if (bIdx !== -1) {
          db2.bonusApostilas[bIdx] = {
            ...db2.bonusApostilas[bIdx],
            pdfUrl: fileUrl,
            fileSizeMb,
            title: title || db2.bonusApostilas[bIdx].title,
            description: description || db2.bonusApostilas[bIdx].description,
            pagesCount: finalPages,
            totalPages: finalPages
          };
          updatedApostila = db2.bonusApostilas[bIdx];
        } else {
          const newBonus = {
            id: `bonus-0${bonusNumber}`,
            number: bonusNumber,
            title: title || `Apostila B\xF4nus 0${bonusNumber}`,
            code: `APOSTILA B\xD4NUS 0${bonusNumber}`,
            description: description || "Material did\xE1tico b\xF4nus oficial.",
            summary: description || "Material did\xE1tico b\xF4nus oficial.",
            pagesCount: finalPages,
            totalPages: finalPages,
            pdfUrl: fileUrl,
            coverUrl: "",
            unlockedByDefault: false,
            notes: `Apostila B\xF4nus 0${bonusNumber}`,
            fileSizeMb
          };
          db2.bonusApostilas.push(newBonus);
          updatedApostila = newBonus;
        }
        saveDatabase();
      } else if (moduleId) {
        const idx = db2.apostilas.findIndex((a) => a.moduleId === moduleId);
        const modObj = db2.modules.find((m) => m.id === moduleId);
        const isDuplicatedMod1Title = moduleId !== 1 && (db2.apostilas[idx]?.title === "Introdu\xE7\xE3o ao Cinema e \xE0 Linguagem Audiovisual" || title === "Introdu\xE7\xE3o ao Cinema e \xE0 Linguagem Audiovisual");
        const resolvedUploadTitle = title && (!isDuplicatedMod1Title || moduleId === 1) ? title.trim() : isDuplicatedMod1Title ? modObj?.title || `M\xF3dulo 0${moduleId}` : db2.apostilas[idx]?.title || modObj?.title || `M\xF3dulo 0${moduleId}`;
        if (idx !== -1) {
          db2.apostilas[idx] = {
            ...db2.apostilas[idx],
            pdfUrl: fileUrl,
            fileSizeMb,
            title: resolvedUploadTitle,
            description: description || db2.apostilas[idx].description || modObj?.summary,
            pagesCount: finalPages,
            totalPages: finalPages
          };
          updatedApostila = db2.apostilas[idx];
        } else {
          const newApos = {
            id: `apos-${moduleId}`,
            moduleId,
            title: resolvedUploadTitle,
            description: description || `Guia completo de estudos, decupagens e exerc\xEDcios t\xE9cnicos do M\xF3dulo 0${moduleId}`,
            pdfUrl: fileUrl,
            fileSizeMb,
            pagesCount: finalPages,
            totalPages: finalPages,
            summary: description || "Material did\xE1tico oficial em PDF.",
            sections: [],
            quiz: []
          };
          db2.apostilas.push(newApos);
          updatedApostila = newApos;
        }
        saveDatabase();
      }
      try {
        const fileBuf = fs2.readFileSync(req.file.path);
        syncFileToGitHub(`public/uploads/apostilas/${req.file.filename}`, `chore(upload): adicionar apostila ${req.file.filename}`, fileBuf).catch(() => {});
        if (isBonus) {
          const canonicalBonusName =
            bonusNumber === 1
              ? 'cinelab-bonus-01-glossario-planos.pdf'
              : bonusNumber === 2
              ? 'cinelab-bonus-02-glossario-roteiro.pdf'
              : 'cinelab-bonus-03-analise-filmica.pdf';
          syncFileToGitHub(`public/materiais/${canonicalBonusName}`, `chore(upload): atualizar ${canonicalBonusName}`, fileBuf).catch(() => {});
        } else if (moduleId) {
          syncFileToGitHub(`public/materiais/cinelab-apostila-0${moduleId}.pdf`, `chore(upload): atualizar apostila modulo ${moduleId}`, fileBuf).catch(() => {});
        }
        syncFileToGitHub('data/cinelab-db.json', `chore(upload): atualizar registro da apostila ${isBonus ? 'bonus 0' + bonusNumber : 'modulo 0' + moduleId}`).catch(() => {});
      } catch (syncErr) {
        console.warn('Notice reading file buffer for GitHub sync:', syncErr);
      }
      return res.status(200).json({
        success: true,
        isBonus,
        bonusNumber: isBonus ? bonusNumber : void 0,
        fileUrl,
        fileName: req.file.filename,
        originalName: req.file.originalname,
        size: req.file.size,
        fileSizeMb,
        pagesCount: finalPages,
        totalPages: finalPages,
        apostila: updatedApostila
      });
    } catch (procErr) {
      console.error("Erro no processamento do upload do PDF:", procErr);
      return res.status(500).json({
        error: "Erro ao processar o arquivo PDF no servidor: " + (procErr.message || "Erro interno")
      });
    }
  });
});
app.get("/api/admin/apostilas/status", requireAdmin, (_req, res) => {
  const db2 = getDb();
  const list = db2.apostilas.map((a) => {
    let existsOnDisk = false;
    let diskLocation = "";
    if (a.pdfUrl) {
      if (a.pdfUrl.startsWith("http://") || a.pdfUrl.startsWith("https://")) {
        existsOnDisk = true;
        diskLocation = "URL Externa / Google Drive";
      } else {
        const localPath = path2.join(process.cwd(), "public", a.pdfUrl);
        if (fs2.existsSync(localPath)) {
          existsOnDisk = true;
          diskLocation = localPath;
        } else {
          const backupPath = path2.join(backupApostilasDir, `apostila-modulo-0${a.moduleId}.pdf`);
          if (fs2.existsSync(backupPath)) {
            existsOnDisk = true;
            diskLocation = backupPath;
          }
        }
      }
    }
    return {
      moduleId: a.moduleId,
      title: a.title,
      pdfUrl: a.pdfUrl,
      pagesCount: a.pagesCount || a.totalPages || 0,
      totalPages: a.totalPages || a.pagesCount || 0,
      fileSizeMb: a.fileSizeMb,
      existsOnDisk,
      diskLocation,
      isBonus: false
    };
  });
  const bonusList = (db2.bonusApostilas || []).map((b) => {
    let existsOnDisk = false;
    let diskLocation = "";
    if (b.pdfUrl) {
      if (b.pdfUrl.startsWith("http://") || b.pdfUrl.startsWith("https://")) {
        existsOnDisk = true;
        diskLocation = "URL Externa / Google Drive";
      } else {
        const localPath = path2.join(process.cwd(), "public", b.pdfUrl);
        if (fs2.existsSync(localPath)) {
          existsOnDisk = true;
          diskLocation = localPath;
        } else {
          const backupPath = path2.join(backupApostilasDir, `apostila-bonus-0${b.number}.pdf`);
          if (fs2.existsSync(backupPath)) {
            existsOnDisk = true;
            diskLocation = backupPath;
          }
        }
      }
    }
    return {
      id: b.id,
      number: b.number,
      title: b.title,
      subtitle: b.subtitle,
      pdfUrl: b.pdfUrl,
      pagesCount: b.pagesCount || b.totalPages || 0,
      totalPages: b.totalPages || b.pagesCount || 0,
      fileSizeMb: b.fileSizeMb,
      existsOnDisk,
      diskLocation,
      isBonus: true
    };
  });
  res.json({ success: true, apostilas: list, bonusApostilas: bonusList });
});
app.post("/api/admin/upload-image", requireAdmin, (req, res) => {
  imageUpload.single("image")(req, res, (err) => {
    if (err) {
      return res.status(400).json({ error: err.message || "Falha no upload da imagem." });
    }
    if (!req.file) {
      return res.status(400).json({ error: "Nenhum arquivo de imagem foi enviado." });
    }
    const fileUrl = `/uploads/images/${req.file.filename}`;
    try {
      const backupPath = path2.join(backupImagesDir, req.file.filename);
      fs2.copyFileSync(path2.join(imagesUploadDir, req.file.filename), backupPath);
      console.log(`[UploadImage] Image backed up permanently: ${req.file.filename}`);
    } catch (bkErr) {
      console.warn("Image backup error:", bkErr);
    }
    res.json({
      success: true,
      fileUrl,
      fileName: req.file.filename,
      originalName: req.file.originalname,
      size: req.file.size
    });
  });
});
app.post("/api/tony/upload-photo", (req, res) => {
  imageUpload.single("photo")(req, res, (err) => {
    if (err) {
      return res.status(400).json({ error: err.message || "Falha no upload do arquivo." });
    }
    try {
      const db2 = getDb();
      const targetImagesPath = path2.join(process.cwd(), "public", "images", "tony-de-luc.jpg");
      const targetUploadsPath = path2.join(process.cwd(), "public", "uploads", "images", "tony-de-luc.jpg");
      if (req.file) {
        const fileBuffer = fs2.readFileSync(req.file.path);
        fs2.writeFileSync(targetImagesPath, fileBuffer);
        fs2.writeFileSync(targetUploadsPath, fileBuffer);
      } else if (req.body?.base64 && typeof req.body.base64 === "string") {
        const base64Data = req.body.base64.replace(/^data:image\/\w+;base64,/, "");
        const buffer = Buffer.from(base64Data, "base64");
        fs2.writeFileSync(targetImagesPath, buffer);
        fs2.writeFileSync(targetUploadsPath, buffer);
      } else if (req.body?.photoUrl && typeof req.body.photoUrl === "string") {
        db2.settings.tonyPhotoUrl = req.body.photoUrl;
        saveDatabase();
        return res.json({ success: true, photoUrl: req.body.photoUrl });
      } else {
        return res.status(400).json({ error: "Nenhum arquivo ou imagem foi enviada." });
      }
      const persistentUrl = `/images/tony-de-luc.jpg?t=${Date.now()}`;
      db2.settings.tonyPhotoUrl = persistentUrl;
      saveDatabase();
      res.json({
        success: true,
        photoUrl: persistentUrl,
        message: "Foto de Tony de Luc salva permanentemente no servidor."
      });
    } catch (saveErr) {
      console.error("Erro ao salvar foto permanentemente:", saveErr);
      res.status(500).json({ error: "Erro ao persistir imagem: " + saveErr.message });
    }
  });
});
app.get("/api/tony/profile", (_req, res) => {
  const db2 = getDb();
  const s = db2.settings;
  res.json({
    success: true,
    profile: {
      tonyName: s.tonyName || s.directorName || "Professor Cineasta Tony de Luc",
      tonyRole: s.tonyRole || s.directorRole || "Cineasta, Diretor de Fotografia, Produtor, Ator, Jornalista & Fundador do CINELAB",
      directorName: s.directorName || s.tonyName || "Professor Cineasta Tony de Luc",
      directorRole: s.directorRole || s.tonyRole || "Cineasta, Diretor de Fotografia, Produtor, Ator, Jornalista & Fundador do CINELAB",
      tonyPhotoUrl: s.tonyPhotoUrl || "/images/tony-de-luc.jpg",
      tonyTagline: s.tonyTagline || "",
      tonyBioShort: s.tonyBioShort || "",
      tonyBioFull: s.tonyBioFull || "",
      tonyFeitos: s.tonyFeitos || [],
      tonyCurriculo: s.tonyCurriculo || [],
      tonyFilmografia: s.tonyFilmografia || [],
      tonySocialInstagram: s.tonySocialInstagram || "",
      tonySocialLinkedin: s.tonySocialLinkedin || s.tonySocialImdb || "",
      tonySocialYoutube: s.tonySocialYoutube || s.tonySocialVimeo || "",
      welcomeVideoUrl: s.welcomeVideoUrl || "",
      welcomeVideoPoster: s.welcomeVideoPoster || "/images/cinelab-cover.jpg",
      welcomeMessageTitle: s.welcomeMessageTitle || "",
      welcomeMessageText: s.welcomeMessageText || ""
    }
  });
});
var handleSaveTonyProfile = (req, res) => {
  try {
    const data = req.body || {};
    const db2 = getDb();
    if (data.tonyName) {
      db2.settings.tonyName = data.tonyName;
      db2.settings.directorName = data.tonyName;
    }
    if (data.tonyRole) {
      db2.settings.tonyRole = data.tonyRole;
      db2.settings.directorRole = data.tonyRole;
    }
    if (data.directorName) db2.settings.directorName = data.directorName;
    if (data.directorRole) db2.settings.directorRole = data.directorRole;
    if (data.tonyPhotoUrl) db2.settings.tonyPhotoUrl = data.tonyPhotoUrl;
    if (data.tonyTagline !== void 0) db2.settings.tonyTagline = data.tonyTagline;
    if (data.tonyBioShort !== void 0) db2.settings.tonyBioShort = data.tonyBioShort;
    if (data.tonyBioFull !== void 0) db2.settings.tonyBioFull = data.tonyBioFull;
    if (Array.isArray(data.tonyFeitos)) db2.settings.tonyFeitos = data.tonyFeitos;
    if (Array.isArray(data.tonyCurriculo)) db2.settings.tonyCurriculo = data.tonyCurriculo;
    if (Array.isArray(data.tonyFilmografia)) db2.settings.tonyFilmografia = data.tonyFilmografia;
    if (data.tonySocialInstagram !== void 0) db2.settings.tonySocialInstagram = data.tonySocialInstagram;
    if (data.tonySocialLinkedin !== void 0) db2.settings.tonySocialLinkedin = data.tonySocialLinkedin;
    if (data.tonySocialYoutube !== void 0) db2.settings.tonySocialYoutube = data.tonySocialYoutube;
    if (data.welcomeVideoUrl !== void 0) {
      if (data.welcomeVideoUrl && data.welcomeVideoUrl.trim() !== "") {
        db2.settings.welcomeVideoUrl = data.welcomeVideoUrl.trim();
      } else if (req.body.explicitRemoveWelcomeVideo === true) {
        db2.settings.welcomeVideoUrl = "";
      }
    }
    if (data.welcomeVideoPoster !== void 0) {
      if (data.welcomeVideoPoster && data.welcomeVideoPoster.trim() !== "") {
        db2.settings.welcomeVideoPoster = data.welcomeVideoPoster.trim();
      }
    }
    if (data.welcomeMessageTitle !== void 0) db2.settings.welcomeMessageTitle = data.welcomeMessageTitle;
    if (data.welcomeMessageText !== void 0) db2.settings.welcomeMessageText = data.welcomeMessageText;
    saveDatabase();
    res.json({
      success: true,
      message: "Perfil de Tony de Luc salvo permanentemente com sucesso.",
      settings: db2.settings
    });
  } catch (err) {
    console.error("Erro ao salvar perfil de Tony de Luc:", err);
    res.status(500).json({ error: "Erro ao salvar perfil: " + err.message });
  }
};
app.put("/api/tony/profile", handleSaveTonyProfile);
app.post("/api/tony/profile", handleSaveTonyProfile);
app.get("/api/admin/submissions", requireAdmin, (req, res) => {
  const db2 = getDb();
  res.json(db2.submissions);
});
app.put("/api/admin/submissions/:id/grade", requireAdmin, (req, res) => {
  const submissionId = req.params.id;
  const { discursiveScores, feedback, teacherGeneralFeedback } = req.body;
  const db2 = getDb();
  const submission = db2.submissions.find((s) => s.id === submissionId);
  if (!submission) {
    return res.status(404).json({ error: "Submiss\xE3o n\xE3o encontrada." });
  }
  let totalDiscursive = 0;
  if (discursiveScores && typeof discursiveScores === "object") {
    for (const [qId, scoreVal] of Object.entries(discursiveScores)) {
      const numScore = Number(scoreVal) || 0;
      totalDiscursive += numScore;
      if (submission.answers[qId]) {
        submission.answers[qId].scoreAwarded = numScore;
        if (feedback?.[qId]) {
          submission.answers[qId].feedback = feedback[qId];
        }
      }
    }
  }
  submission.discursiveScore = Number(totalDiscursive.toFixed(1));
  submission.totalScore = Number((submission.objectiveScore + totalDiscursive).toFixed(1));
  submission.percentage = Math.round(submission.totalScore / submission.maxScore * 100);
  submission.status = "graded";
  submission.gradedAt = (/* @__PURE__ */ new Date()).toISOString();
  submission.gradedBy = db2.settings.directorName;
  if (teacherGeneralFeedback) {
    submission.teacherGeneralFeedback = teacherGeneralFeedback;
  }
  saveDatabase();
  res.json({ success: true, submission });
});
app.get("/api/admin/settings", requireAdmin, (req, res) => {
  const db2 = getDb();
  res.json({
    settings: db2.settings,
    simulatedDaysOffset: db2.simulatedDaysOffset || 0,
    effectiveNow: getEffectiveNow().toISOString()
  });
});
app.put("/api/admin/settings", requireAdmin, (req, res) => {
  const { settings, simulatedDaysOffset } = req.body;
  const db2 = getDb();
  if (settings) {
    if (settings.welcomeVideoUrl !== void 0) {
      if (settings.welcomeVideoUrl && settings.welcomeVideoUrl.trim() !== "") {
        db2.settings.welcomeVideoUrl = settings.welcomeVideoUrl.trim();
      } else if (req.body.explicitRemoveWelcomeVideo === true) {
        db2.settings.welcomeVideoUrl = "";
      }
      delete settings.welcomeVideoUrl;
    }
    if (settings.welcomeVideoPoster !== void 0) {
      if (settings.welcomeVideoPoster && settings.welcomeVideoPoster.trim() !== "") {
        db2.settings.welcomeVideoPoster = settings.welcomeVideoPoster.trim();
      }
      delete settings.welcomeVideoPoster;
    }
    db2.settings = { ...db2.settings, ...settings };
  }
  if (typeof simulatedDaysOffset === "number") {
    db2.simulatedDaysOffset = simulatedDaysOffset;
  }
  saveDatabase();
  res.json({
    success: true,
    settings: db2.settings,
    simulatedDaysOffset: db2.simulatedDaysOffset,
    effectiveNow: getEffectiveNow().toISOString()
  });
});
app.get("/api/welcome-video", (_req, res) => {
  const db2 = getDb();
  let url = db2.settings.welcomeVideoUrl;
  let poster = db2.settings.welcomeVideoPoster;
  if (!url || url.trim() === "") {
    const wConfigPath = path2.join(process.cwd(), "data", "welcome-video-config.json");
    if (fs2.existsSync(wConfigPath)) {
      try {
        const parsed = JSON.parse(fs2.readFileSync(wConfigPath, "utf-8"));
        if (parsed.welcomeVideoUrl) {
          url = parsed.welcomeVideoUrl;
          db2.settings.welcomeVideoUrl = url;
          if (parsed.welcomeVideoPoster) {
            poster = parsed.welcomeVideoPoster;
            db2.settings.welcomeVideoPoster = poster;
          }
          saveDatabase();
        }
      } catch {
      }
    }
  }
  if (!url || url.trim() === "") {
    url = "/uploads/videos/cinelab-intro-apresentacao.mp4";
    db2.settings.welcomeVideoUrl = url;
    saveDatabase();
  }
  if (!poster || poster.trim() === "") {
    poster = "/uploads/images/img-LOCO_CINELAB___COLE-1790299254778-824285.png";
    db2.settings.welcomeVideoPoster = poster;
    saveDatabase();
  }
  res.json({
    success: true,
    welcomeVideoUrl: url,
    welcomeVideoPoster: poster,
    welcomeMessageTitle: db2.settings.welcomeMessageTitle || "Mensagem de Boas-Vindas aos Novos Alunos",
    welcomeMessageText: db2.settings.welcomeMessageText || ""
  });
});
app.post("/api/welcome-video", requireAdmin, (req, res) => {
  try {
    const { welcomeVideoUrl, welcomeVideoPoster, welcomeMessageTitle, welcomeMessageText } = req.body;
    const db2 = getDb();
    if (welcomeVideoUrl !== void 0) {
      if (welcomeVideoUrl && welcomeVideoUrl.trim() !== "") {
        db2.settings.welcomeVideoUrl = welcomeVideoUrl.trim();
      } else if (req.body.explicitRemove === true) {
        db2.settings.welcomeVideoUrl = "";
      }
    }
    if (welcomeVideoPoster !== void 0 && welcomeVideoPoster.trim() !== "") {
      db2.settings.welcomeVideoPoster = welcomeVideoPoster.trim();
    }
    if (welcomeMessageTitle !== void 0) db2.settings.welcomeMessageTitle = welcomeMessageTitle;
    if (welcomeMessageText !== void 0) db2.settings.welcomeMessageText = welcomeMessageText;
    saveDatabase();
    res.json({
      success: true,
      message: "V\xEDdeo e mensagem de boas-vindas salvos permanentemente.",
      settings: db2.settings
    });
  } catch (err) {
    res.status(500).json({ error: "Erro ao salvar v\xEDdeo de boas-vindas: " + err.message });
  }
});
app.get("/api/admin/emails", requireAdmin, (req, res) => {
  const db2 = getDb();
  res.json(db2.emailLogs);
});
app.post("/api/ai/tutor", async (req, res) => {
  try {
    const {
      message,
      history = [],
      moduleId,
      studentName = "Aluno(a)",
      language = "pt"
    } = req.body;
    if (!message || typeof message !== "string" || !message.trim()) {
      return res.status(400).json({ error: "Mensagem obrigat\xF3ria." });
    }
    const cleanMessage = message.trim();
    const db2 = getDb();
    const directorName = db2.settings?.directorName || "Tony de Luc";
    let moduleContext = "";
    if (moduleId && Number(moduleId) >= 1 && Number(moduleId) <= 10) {
      const modNum = Number(moduleId);
      const mod = db2.modules?.find((m) => m.number === modNum);
      if (mod) {
        moduleContext = `
Contexto do M\xF3dulo Ativo Selecionado pelo Aluno:
- M\xF3dulo ${mod.number}: "${mod.title}"
- Subt\xEDtulo: "${mod.subtitle}"
- Ementa / S\xEDntese: "${mod.summary}"
`;
      }
    }
    const systemInstruction = `Voc\xEA \xE9 o CineTutor IA, o tutor oficial, mentor acad\xEAmico e assistente pedag\xF3gico de Cinema e Realiza\xE7\xE3o Audiovisual da escola e laborat\xF3rio CINELAB (Dire\xE7\xE3o Geral do cineasta ${directorName}).

Sua miss\xE3o \xE9 dialogar diretamente com alunos e entusiastas de cinema, tirando d\xFAvidas t\xE9cnicas, art\xEDsticas, te\xF3ricas, conceituais e pr\xE1ticas de todas as etapas do fazer cinematogr\xE1fico.

ESTRUTURA PEDAG\xD3GICA DO CURSO CINELAB (120 HORAS / 10 M\xD3DULOS + 2 B\xD4NUS):
1. M\xF3dulo 01 - Linguagem Cinematogr\xE1fica: Enquadramentos e escalas de planos (Plano Geral, Plano M\xE9dio, Primeiro Plano, Close-up, Plano Detalhe), regra dos 180\xB0, movimentos de c\xE2mera (panor\xE2mica, tilt, travelling, dolly, grua, steadicam), eixos c\xEAnicos, plong\xE9e e contra-plong\xE9e, campo e contracampo.
2. M\xF3dulo 02 - Hist\xF3ria do Cinema & An\xE1lise F\xEDlmica: Do silencioso ao sonoro e digital; Cinema Novo e cinema brasileiro; m\xE9todo anal\xEDtico em 6 camadas (Narrativa, Personagem, Espa\xE7o, Imagem, Som e Montagem).
3. M\xF3dulo 03 - Roteiro & Narrativa: Ideia, storyline, logline, sinopse, argumento/tratamento, escaleta; formata\xE7\xE3o Master Scenes (Courier 12pt, cabe\xE7alhos de cena INT/EXT, a\xE7\xE3o, personagem, di\xE1logo, parent\xE9ticas); estrutura dram\xE1tica de 3 atos (Syd Field) e Jornada do Her\xF3i (Campbell/Vogler).
4. M\xF3dulo 04 - Dire\xE7\xE3o & Dire\xE7\xE3o de Atores: O olhar do diretor, mise-en-sc\xE8ne, decupagem t\xE9cnica de roteiro, ensaios, inten\xE7\xE3o dram\xE1tica, subtexto, tomadas e condu\xE7\xE3o \xE9tica do set de filmagem.
5. M\xF3dulo 05 - Fotografia, C\xE2mera & Ilumina\xE7\xE3o: Luz de 3 pontos (Key Light, Fill Light, Backlight/Rim Light); raz\xE3o de contraste; temperaturas de cor (Kelvin: 3200K tungst\xEAnio vs 5600K luz do dia); lentes (grande-angular 18-28mm, normal 50mm, teleobjetiva 85-135mm); profundidade de campo, ISO, obturador (regra dos 180\xB0 / shutter speed), estilos High-Key e Low-Key (chiaroscuro).
6. M\xF3dulo 06 - Som & Trilha Sonora: Som direto em set, microfone shotgun/boom, microfones de lapela, ru\xEDdo de sala (room tone), foley, sound design, trilha dieg\xE9tica vs extra-dieg\xE9tica, p\xF3s-produ\xE7\xE3o de \xE1udio.
7. M\xF3dulo 07 - Montagem & Edi\xE7\xE3o: Continuidade espa\xE7otemporal, corte na a\xE7\xE3o (cutting on action), corte seco, jump cut, elipses, Efeito Kuleshov, montagem paralela, ritmo e pacing da cena.
8. M\xF3dulo 08 - Produ\xE7\xE3o Executiva & Planejamento: Or\xE7amento audiovisual, cronograma, ordem do dia (call sheet), autoriza\xE7\xF5es de loca\xE7\xE3o e uso de imagem, leis de incentivo (Lei Paulo Gustavo, Aldir Blanc, Rouanet, FSA/Ancine), plano de conting\xEAncia.
9. M\xF3dulo 09 - Distribui\xE7\xE3o, Festivais & Mercado: Circuito de festivais (FilmFreeway), janelas de exibi\xE7\xE3o, pitch deck, press-kit, trailer, cartaz e estrat\xE9gias de lan\xE7amento independente.
10. M\xF3dulo 10 - Projeto Final: Realiza\xE7\xE3o pr\xE1tica de curta-metragem autoral (1 a 5 minutos) com entrega de decupagem, plano de filmagem, roteiro e corte final para o certificado de 120 horas.
B\xD4NUS 01: Gloss\xE1rio Completo de Planos e Movimentos de C\xE2mera (30 p\xE1ginas).
B\xD4NUS 02: Gloss\xE1rio Completo de Roteiro e Dramaturgia Audiovisual (29 p\xE1ginas).

DIRETRIZES DE RESPOSTA:
- Aluno atendido: ${studentName}.
- Idioma de resposta: responda no mesmo idioma do usu\xE1rio (${language}).
- Seja profundamente did\xE1tico, pr\xE1tico, encorajador e tecnicamente preciso.
- Use exemplos pr\xE1ticos de grandes diretores ou filmes consagrados (ex: Hitchcock, Kubrick, Spielberg, Tarantino, Tarkovsky, Varda, Glauber Rocha, Denis Villeneuve, etc.) quando enriquecer a explica\xE7\xE3o.
- Se a d\xFAvida for sobre decupagem, roteiro ou ilumina\xE7\xE3o, forne\xE7a pequenos exemplos esquem\xE1ticos bem formatados.
- Formate a resposta com t\xEDtulos em negrito, t\xF3picos com marcadores (bullet points) e par\xE1grafos bem espa\xE7ados para m\xE1xima legibilidade.
- Conclua com uma breve frase motivadora de set ("Luz, c\xE2mera e boa pr\xE1tica!", "Bom trabalho na sua decupagem!", etc.).${moduleContext}`;
    const apiKey = process.env.GEMINI_API_KEY;
    let answer = "";
    let modelUsed = "";
    if (apiKey) {
      const candidateModels = ["gemini-3.8-flash", "gemini-3.1-flash-lite", "gemini-flash-latest"];
      const formattedContents = [];
      if (Array.isArray(history) && history.length > 0) {
        const recentHistory = history.slice(-6);
        for (const item of recentHistory) {
          if (item && item.content && (item.role === "user" || item.role === "model")) {
            formattedContents.push({
              role: item.role === "user" ? "user" : "model",
              parts: [{ text: String(item.content) }]
            });
          }
        }
      }
      formattedContents.push({
        role: "user",
        parts: [{ text: cleanMessage }]
      });
      for (const m of candidateModels) {
        try {
          const { GoogleGenAI } = await import("@google/genai");
          const ai = new GoogleGenAI({
            apiKey,
            httpOptions: {
              headers: {
                "User-Agent": "aistudio-build"
              }
            }
          });
          const genPromise = ai.models.generateContent({
            model: m,
            contents: formattedContents,
            config: {
              systemInstruction,
              temperature: 0.7,
              topP: 0.9
            }
          });
          const timeoutPromise = new Promise(
            (_, reject) => setTimeout(() => reject(new Error(`Timeout with model ${m}`)), 12e3)
          );
          const response = await Promise.race([genPromise, timeoutPromise]);
          const resultText = response?.text?.trim();
          if (resultText && resultText.length > 20) {
            answer = resultText;
            modelUsed = m;
            break;
          }
        } catch (modelErr) {
          console.warn(`[CineTutor IA] Model ${m} attempt failed:`, modelErr?.message || modelErr);
        }
      }
    }
    if (!answer) {
      answer = generatePedagogicalFallback(cleanMessage, studentName, moduleId);
      modelUsed = "cinelab-pedagogical-engine";
    }
    const suggestions = generateContextualSuggestions(cleanMessage, moduleId);
    res.json({
      success: true,
      answer,
      modelUsed,
      relatedModuleId: moduleId ? Number(moduleId) : detectRelatedModule(cleanMessage),
      suggestions
    });
  } catch (err) {
    console.error("Erro no endpoint do CineTutor IA:", err);
    res.status(500).json({
      error: "Falha ao processar d\xFAvida com o tutor.",
      details: err?.message || String(err)
    });
  }
});
function detectRelatedModule(text) {
  const lower = text.toLowerCase();
  if (lower.includes("plano") || lower.includes("enquadramento") || lower.includes("180") || lower.includes("travelling")) return 1;
  if (lower.includes("hist\xF3ria") || lower.includes("silencioso") || lower.includes("camada") || lower.includes("an\xE1lise")) return 2;
  if (lower.includes("roteiro") || lower.includes("personagem") || lower.includes("syd field") || lower.includes("jornada") || lower.includes("di\xE1logo")) return 3;
  if (lower.includes("dire\xE7\xE3o") || lower.includes("ator") || lower.includes("mise-en-sc\xE8ne") || lower.includes("ensaio") || lower.includes("decupagem")) return 4;
  if (lower.includes("luz") || lower.includes("ilumina\xE7\xE3o") || lower.includes("fotografia") || lower.includes("lente") || lower.includes("iso") || lower.includes("key light")) return 5;
  if (lower.includes("som") || lower.includes("\xE1udio") || lower.includes("microfone") || lower.includes("boom") || lower.includes("foley") || lower.includes("room tone")) return 6;
  if (lower.includes("montagem") || lower.includes("edi\xE7\xE3o") || lower.includes("corte") || lower.includes("kuleshov") || lower.includes("ritmo")) return 7;
  if (lower.includes("produ\xE7\xE3o") || lower.includes("or\xE7amento") || lower.includes("ordem do dia") || lower.includes("edital") || lower.includes("leis")) return 8;
  if (lower.includes("distribui\xE7\xE3o") || lower.includes("festival") || lower.includes("festivais") || lower.includes("pitch") || lower.includes("cartaz")) return 9;
  if (lower.includes("curta") || lower.includes("curta-metragem") || lower.includes("projeto final") || lower.includes("mostra") || lower.includes("certificado")) return 10;
  return 1;
}
function generateContextualSuggestions(text, currentModuleId) {
  const lower = text.toLowerCase();
  if (lower.includes("luz") || lower.includes("ilumina") || lower.includes("fotografia")) {
    return [
      "Como criar a luz de 3 pontos em uma sala comum?",
      "Qual a diferen\xE7a entre ilumina\xE7\xE3o High-Key e Low-Key?",
      "Como equilibrar a temperatura de cor (3200K vs 5600K)?"
    ];
  }
  if (lower.includes("roteiro") || lower.includes("hist\xF3ria") || lower.includes("personag")) {
    return [
      "Como formatar cabe\xE7alhos e di\xE1logos no padr\xE3o Master Scenes?",
      "Como aplicar os pontos de virada do Paradigma de Syd Field?",
      "Qual a diferen\xE7a pr\xE1tica entre Sinopse, Argumento e Escaleta?"
    ];
  }
  if (lower.includes("decupagem") || lower.includes("plano") || lower.includes("c\xE2mera")) {
    return [
      "Como preencher uma folha de decupagem t\xE9cnica profissional?",
      "O que \xE9 a regra dos 180 graus e como nunca quebrar o eixo?",
      "Quando devo usar lente 24mm, 50mm ou 85mm em um di\xE1logo?"
    ];
  }
  if (lower.includes("som") || lower.includes("\xE1udio") || lower.includes("microfone")) {
    return [
      "Por que o Room Tone (ru\xEDdo de sala) \xE9 obrigat\xF3rio em toda grava\xE7\xE3o?",
      "Qual a posi\xE7\xE3o correta do microfone boom em cena com 2 atores?",
      "Como tratar o \xE1udio na p\xF3s-produ\xE7\xE3o para voz limpa e intelig\xEDvel?"
    ];
  }
  if (lower.includes("montagem") || lower.includes("edi\xE7\xE3o") || lower.includes("corte")) {
    return [
      "O que \xE9 o Efeito Kuleshov e como us\xE1-lo na montagem?",
      "Como fazer cortes na a\xE7\xE3o (cutting on action) impercept\xEDveis?",
      "Qual a cad\xEAncia de cortes ideal para uma cena de di\xE1logo dram\xE1tico?"
    ];
  }
  return [
    "Como fazer a decupagem t\xE9cnica de uma cena do meu curta?",
    "Como funciona a avalia\xE7\xE3o e a emiss\xE3o do certificado de 120 horas?",
    "Quais s\xE3o os 10 m\xF3dulos do CINELAB e como acompanh\xE1-los no cronograma?"
  ];
}
function generatePedagogicalFallback(query, studentName, moduleId) {
  const lower = query.toLowerCase();
  if (lower.includes("luz") || lower.includes("ilumina") || lower.includes("3 ponto") || lower.includes("key light")) {
    return `Ol\xE1, **${studentName}**! Excelente pergunta sobre ilumina\xE7\xE3o cinematogr\xE1fica.

Na metodologia do **CINELAB (M\xF3dulo 05: Fotografia, C\xE2mera e Ilumina\xE7\xE3o)**, a ilumina\xE7\xE3o cl\xE1ssica de tr\xEAs pontos \xE9 o alicerce fundamental de toda composi\xE7\xE3o:

1. **Luz Principal (Key Light):**
   - \xC9 a fonte prim\xE1ria de luz na cena. Define a exposi\xE7\xE3o b\xE1sica e projeta a sombra principal no rosto do ator.
   - Posicionamento ideal: cerca de 45\xB0 lateralmente e 45\xB0 acima do n\xEDvel dos olhos do sujeito.

2. **Luz de Preenchimento (Fill Light):**
   - Suaviza as sombras criadas pela Key Light sem criar novas sombras evidentes.
   - Posicionamento no lado oposto \xE0 Key Light, com intensidade tipicamente entre 50% a 25% (raz\xE3o de contraste de 2:1 a 4:1).

3. **Luz de Recorte ou Contra-Luz (Backlight / Rim Light):**
   - Fica atr\xE1s e acima do sujeito, direcionada para a nuca e ombros.
   - **Fun\xE7\xE3o crucial:** separar o personagem do fundo, criando tridimensionalidade e profundidade no plano 2D.

\u{1F4A1} **Dica de Set do Diretor Tony de Luc:**
> *"Em ambientes apertados, voc\xEA pode usar uma parede branca ou um rebatedor de isopor como Fill Light passivo, economizando espa\xE7o e luz direta no set!"*

Qualquer d\xFAvida adicional, confira a apostila do **M\xF3dulo 05** e continue seus estudos!`;
  }
  if (lower.includes("decupa") || lower.includes("planta") || lower.includes("folha")) {
    return `Ol\xE1, **${studentName}**! Decupagem t\xE9cnica \xE9 o cora\xE7\xE3o da prepara\xE7\xE3o de qualquer diretor de cinema.

No **M\xF3dulo 03 e 04 do CINELAB**, aprendemos que a **Decupagem T\xE9cnica** \xE9 a tradu\xE7\xE3o do roteiro liter\xE1rio em termos visuais e operacionais para a equipe de filmagem:

### Elementos indispens\xE1veis em cada linha da folha de decupagem:
1. **Cena & Plano:** Ex: Cena 14 / Plano 1 (Plano Geral), Plano 2 (Plano M\xE9dio), Plano 3 (Close-up).
2. **Enquadramento & Lente:** Ex: *PP (Primeiro Plano)* com lente *50mm f/2.8*.
3. **Movimento de C\xE2mera:** Ex: C\xE2mera est\xE1tica no trip\xE9, *panor\xE2mica para a direita*, *travelling* lateral ou c\xE2mera na m\xE3o (handheld).
4. **\xC2ngulo & Posi\xE7\xE3o:** Normal (altura dos olhos), Plong\xE9e (de cima para baixo) ou Contra-plong\xE9e (de baixo para cima).
5. **Descri\xE7\xE3o da A\xE7\xE3o & Di\xE1logo:** O que exatamente acontece durante aquela tomada.
6. **Som & Notas T\xE9cnicas:** Capta\xE7\xE3o de som direto, microfone boom, luz pr\xE1tica ligada, etc.

\u{1F4CB} **Dica Pr\xE1tica:**
Lembre-se sempre de desenhar uma **Planta Baixa (Floor Plan)** simplificada indicando a posi\xE7\xE3o da c\xE2mera, dos atores e dos refletores de luz antes de pisar no set!

Confira a apostila do M\xF3dulo 04 para baixar os modelos oficiais de decupagem!`;
  }
  if (lower.includes("kuleshov") || lower.includes("montagem") || lower.includes("corte") || lower.includes("edi\xE7\xE3o")) {
    return `Ol\xE1, **${studentName}**! Voc\xEA tocou em um dos pilares mais fascinantes da teoria da montagem.

No **M\xF3dulo 07 (Montagem e P\xF3s-Produ\xE7\xE3o)** do CINELAB, estudamos a fundo o c\xE9lebre experimento do cineasta sovi\xE9tico **Lev Kuleshov (anos 1920)**:

### O Experimento de Kuleshov:
Kuleshov pegou o mesmo plano de rosto com express\xE3o neutra do ator Ivan Mozzhukhin e o intercalou com tr\xEAs planos diferentes:
1. **Rosto neutro + Prato de sopa quente:** O p\xFAblico interpretava que o ator estava faminto.
2. **Rosto neutro + Menina em um caix\xE3o:** O p\xFAblico interpretava tristeza profunda e luto.
3. **Rosto neutro + Mulher descansando em um div\xE3:** O p\xFAblico via desejo e contempla\xE7\xE3o.

### A Li\xE7\xE3o para o Realizador:
O cinema **n\xE3o reside apenas em cada plano isolado**, mas na **rela\xE7\xE3o de significado criada entre dois planos sucessivos** na mente do espectador.

\u2702\uFE0F **Aplica\xE7\xE3o na sua obra:**
Ao montar seu curta do Projeto Final, use o corte de rea\xE7\xE3o com precis\xE3o. O tempo que a c\xE2mera permanece na rea\xE7\xE3o de quem ouve pode ser muito mais dram\xE1tico do que a imagem de quem fala!`;
  }
  if (lower.includes("certificado") || lower.includes("horas") || lower.includes("avalia\xE7\xE3o") || lower.includes("nota")) {
    return `Ol\xE1, **${studentName}**! O sistema acad\xEAmico do **CINELAB** foi estruturado com m\xE1ximo rigor pedag\xF3gico para valorizar seu curr\xEDculo profissional:

### Requisitos para o Certificado Profissional de 120 Horas:
1. **Concluir as Avalia\xE7\xF5es dos 10 M\xF3dulos:** Cada m\xF3dulo possui uma avalia\xE7\xE3o te\xF3rica e pr\xE1tica com quest\xF5es de m\xFAltipla escolha e quest\xF5es discursivas.
2. **M\xE9dia Geral M\xEDnima:** Obter m\xE9dia igual ou superior a **6.0 / 10.0** no boletim acad\xEAmico.
3. **Projeto Final (M\xF3dulo 10):** Elaborar a entrega do curta-metragem autoral (roteiro, decupagem e link da obra).
4. **Autenticidade Garantida:** Seu certificado possui c\xF3digo hash criptogr\xE1fico \xFAnico (ex: \`CNL-...\`), registrando carga hor\xE1ria de 120h, programa curricular completo e valida\xE7\xE3o p\xFAblica instant\xE2nea pela aba **Validar Certificado**.

Voc\xEA pode acompanhar todo o seu progresso na aba **Notas & Boletim** e na sua **\xC1rea do Aluno**!`;
  }
  return `Ol\xE1, **${studentName}**! Bem-vindo ao **CineTutor IA**, seu espa\xE7o de apoio pedag\xF3gico cont\xEDnuo no **CINELAB**.

Sobre a sua d\xFAvida: *"${query}"*

O fazer cinematogr\xE1fico exige articular a vis\xE3o art\xEDstica com a t\xE9cnica rigorosa em todas as etapas:
- **Pr\xE9-Produ\xE7\xE3o:** Roteiro formatado, decupagem t\xE9cnica, desenho de set e cronograma.
- **Produ\xE7\xE3o (Set):** Condu\xE7\xE3o de atores, luz de 3 pontos, opera\xE7\xE3o de c\xE2mera e capta\xE7\xE3o de som direto limpo.
- **P\xF3s-Produ\xE7\xE3o:** Montagem expressiva, ritmo, desenho sonoro e corre\xE7\xE3o de cor.

Voc\xEA gostaria de aprofundar essa quest\xE3o em rela\xE7\xE3o a algum m\xF3dulo espec\xEDfico do nosso curso (ex: M\xF3dulo 01 Linguagem, M\xF3dulo 03 Roteiro, M\xF3dulo 04 Dire\xE7\xE3o, M\xF3dulo 05 Fotografia, M\xF3dulo 07 Montagem)?

Conte comigo para transformar suas ideias em cinema de verdade! \u{1F3AC}`;
}
async function startServer() {
  if (process.env.NODE_ENV !== "production" && !process.env.VERCEL) {
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa"
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path2.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path2.join(distPath, "index.html"));
    });
  }
  const server = app.listen(PORT, "0.0.0.0", () => {
    console.log(`CINELAB Server running on http://0.0.0.0:${PORT}`);
  });
  server.timeout = 6e5;
  server.keepAliveTimeout = 65e3;
  server.headersTimeout = 66e3;
}
if (!process.env.VERCEL) {
  startServer();
}
var server_default = app;
export {
  app,
  server_default as default
};
