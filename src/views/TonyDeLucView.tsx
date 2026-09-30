import React, { useState, useEffect, useRef } from 'react';
import { CourseSettings, FilmographyWork } from '../types/index.js';
import { api } from '../services/api.js';
import { useLanguage } from '../i18n/LanguageContext.js';
import { parseVideoEmbed } from '../utils/videoUtils.js';
import {
  Film,
  Award,
  BookOpen,
  Sparkles,
  Clapperboard,
  Camera,
  CheckCircle2,
  Calendar,
  ExternalLink,
  MessageSquare,
  ArrowRight,
  ShieldCheck,
  Star,
  Tv,
  PenTool,
  HeartHandshake,
  UserCheck,
  Edit3,
  Linkedin,
  Youtube,
  Instagram,
  Upload,
  Loader2,
  RefreshCw,
  Sliders,
  Play,
  PlayCircle,
  Maximize2,
  X,
} from 'lucide-react';
import { TonyDeLucEditorModal } from '../components/TonyDeLucEditorModal.js';
import {
  getLocalTonyProfile,
  saveLocalTonyProfile,
  persistTonyProfile,
  persistTonyPhoto,
  getLocalWelcomeVideoBackup,
  TonyProfileData,
} from '../services/tonyPersistence.js';

interface TonyDeLucViewProps {
  settings?: CourseSettings | null;
  onNavigate: (route: string) => void;
  isAdmin?: boolean;
}

export const TonyDeLucView: React.FC<TonyDeLucViewProps> = ({
  settings,
  onNavigate,
  isAdmin = false,
}) => {
  const { language } = useLanguage();

  const profileTranslations = {
    pt: {
      role: 'Cineasta, Diretor de Fotografia, Produtor, Ator, Jornalista & Fundador do CINELAB',
      tagline: 'O cinema não é apenas técnica ou equipamento; é a arte soberana de imprimir a verdade humana em cada enquadramento e contar histórias que ecoam no tempo.',
      bioShort: 'Cineasta, realizador audiovisual, roteirista e educador cinematográfico com mais de 20 anos de experiência em sets de filmagem, mostras de cinema e formação de centenas de novos diretores.',
      bioFull: 'Com uma trajetória forjada no pulsar vivo dos sets de gravação e na dedicação incansável à pedagogia da imagem em movimento, Tony de Luc é uma referência contemporânea na formação de cineastas e realizadores audiovisuais independentes.\n\nSua carreira abrange a direção geral de longas e curtas-metragens laureados em festivais no Brasil e no exterior, a direção de fotografia com ênfase no claro-escuro dramático e o desenvolvimento de métodos pedagógicos que eliminam o hermetismo acadêmico. No CINELAB, Tony desenhou pessoalmente a arquitetura das 10 etapas formativas (90 dias) para garantir que cada aluno, do roteiro à pós-produção, sinta a real pulsação de uma equipe de cinema profissional.',
      feitos: [
        'Direção e roteiro de obras cinematográficas exibidas e premiadas em festivais e mostras de cinema no Brasil e no circuito internacional.',
        'FORMOU DEZENAS DE REALIZADORES, ROTEIRISTAS E DIRETORES DE FOTOGRAFIA E INSERIDOS NO MERCADO AUDIOVISUAL, PUBLICIDADE E STREAMING.',
        'Criação do método pedagógico CINELAB: formação intensiva de 3 meses (90 dias) calibrada em 10 etapas progressivas, com foco em set, rigor estético e narrativa autoral.',
        'Direção de Fotografia e Iluminação Cênica em dezenas de produções ficcionais, videoclipes premiados e documentários autorais.',
        'Curador e jurado convidado em comissões de seleção de mostras de cinema independente e editais públicos de fomento cultural.',
        'Tony de Luc participou ativamente da edição inaugural do CINEMANO - Mestres da Sétima Arte na UFRJ, como debatedor de temáticas sociopolíticas e documentais ao lado do cineasta Silvio Tendler.',
      ],
      curriculo: [
        'Graduação e Especialização em Cinema, Direção Cinematográfica e Realização Audiovisual.',
        'Formação Avançada em Roteiro Cinematográfico (Script Doctoring & Estruturas Narrativas Clássicas e Não-Lineares).',
        'Especialização em Direção de Fotografia, Óptica Cinematográfica, Teoria da Cor e Iluminação Dramática.',
        'Docência no Ensino Superior e em Cursos Livres de Cinema, Montagem e Narrativas Visuais.',
        'Pesquisador de Linguagem Cinematográfica, Montagem Analítica e Filosofia da Imagem em Movimento.',
        'Membro de Associações Profissionais de Cinema e Realizadores Audiovisuais Independentes.',
      ],
      letterTitle: 'Mensagem de Boas-Vindas aos Novos Alunos',
      letterText: `Caro estudante e futuro realizador,\n\nQuando idealizei o CINELAB, meu objetivo não foi criar mais um curso com aulas teóricas genéricas que você pode encontrar em qualquer canto da internet. Minha obsessão foi estruturar um laboratório de formação autêntica em 3 meses (90 dias), onde cada etapa coloca você frente a frente com a realidade artística, técnica e estética da indústria cinematográfica.\n\nNós estudamos o plano não como um conceito estático, mas como a menor unidade dramática da narrativa. Nós formatamos o roteiro não por burocracia, mas para que a equipe inteira consiga visualizar a luz, o som e o silêncio que o filme pede. E em cada uma das 10 etapas, minha equipe e eu estaremos acompanhando seu progresso, avaliando suas respostas e orientando seus exercícios.\n\nSe você carrega a urgência de contar histórias e quer dominar a gramática do cinema com rigor, seja muito bem-vindo ao CINELAB.`,
      badgeMentor: 'O Mentor & Fundador do CINELAB',
      badgeDirector: 'Diretor Geral & Cineasta',
      editPresentation: 'Editar Apresentação & Biografia',
      editShort: 'Editar Apresentação',
      manifestoLabel: '— Manifesto de Direção',
      presAndProfile: 'Apresentação & Perfil',
      bioAndTrajectory: 'Biografia & Trajetória em Sets de Filmagem',
      studyWithBtn: 'Estude com Tony de Luc (Matrícula Aberta)',
      talkCoordBtn: 'Falar com a Coordenação',
      stat1Val: '+20 Anos',
      stat1Label: 'Experiência em Sets de Cinema',
      stat2Val: '+2.000',
      stat2Label: 'Cineastas & Alunos Mentorados',
      stat3Val: '10 Etapas',
      stat3Label: 'Apostilas & Metodologia Exclusiva',
      stat4Val: '180 Horas',
      stat4Label: 'Carga Horária & Certificado Oficial',
      histBadge: 'Histórico & Reconhecimento',
      histTitle: 'Grandes Feitos & Conquistas de Tony de Luc',
      histDesc: 'Uma trajetória marcada pelo compromisso com o cinema de qualidade, a formação de novos olhares e a realização cinematográfica autoral.',
      currBadge: 'Rigor Técnico & Docência',
      currTitle: 'Currículo & Formação Acadêmica',
      currDesc: 'Tony de Luc combina a vivência de chão de set com sólidos fundamentos teóricos e acadêmicos. Cada apostila e masterclass entregue no CINELAB foi revisada sob os mais altos padrões de ensino cinematográfico.',
      pedCoordTitle: 'Coordenação Pedagógica CINELAB',
      pedCoordDesc: 'Todas as 10 avaliações de etapa e os certificados emitidos contam com a chancela oficial, pareceres personalizados e a assinatura do Diretor Acadêmico Tony de Luc.',
      filmoBadge: 'Obras & Realizações',
      filmoTitle: 'Filmografia Selecionada',
      filmoDesc: 'Trabalhos de destaque em direção, roteiro, fotografia e curadoria cinematográfica.',
      viewCourseBtn: 'Ver Conteúdo do Curso',
      roleLabel: 'Função:',
      formatLabel: 'Formato:',
      officialPortrait: 'Retrato Oficial do Diretor',
      generalDirectorSub: 'Cineasta, Diretor Geral e Idealizador do CINELAB.',
      uploadPhotoBtn: 'Carregar Minha Foto (Arquivo)',
      changePhotoBtn: 'Alterar Foto',
      savingPhoto: 'Salvando...',
      enrollCtaBtn: 'Fazer Minha Matrícula no CINELAB',
    },
    en: {
      role: 'Filmmaker, Director of Photography, Producer, Actor, Journalist & Founder of CINELAB',
      tagline: 'Cinema is not merely equipment or technique; it is the sovereign art of imprinting human truth into every frame and telling stories that echo through time.',
      bioShort: 'Filmmaker, director, screenwriter, and film educator with more than 20 years on active film sets, festival circuits, and mentoring hundreds of emerging directors.',
      bioFull: 'With a trajectory forged in the lively rhythm of film sets and an unwavering devotion to the pedagogy of moving images, Tony de Luc is a prominent contemporary figure in training independent filmmakers.\n\nHis career spans the general direction of award-winning feature and short films in Brazil and abroad, cinematography emphasizing dramatic chiaroscuro, and developing teaching methods that strip away academic pretension. At CINELAB, Tony personally designed the 10 formative stages (90 days) so every student experiences the authentic pulse of a professional film crew.',
      feitos: [
        'Directing and writing cinematic works screened and awarded at film festivals in Brazil and internationally.',
        'Trained dozens of directors, screenwriters, and cinematographers now working in commercial film, advertising, and streaming networks.',
        'Created the CINELAB pedagogical method: intensive 3-month (90-day) training calibrated across 10 progressive stages, centered on set discipline and auteur storytelling.',
        'Director of Photography and Dramatic Lighting across dozens of fiction films, music videos, and authorial documentaries.',
        'Invited curator and juror on selection boards for independent film festivals and public cultural grants.',
        'Active speaker at the inaugural CINEMANO - Masters of the Seventh Art at UFRJ, discussing documentary and sociopolitical cinema alongside acclaimed filmmaker Silvio Tendler.',
      ],
      curriculo: [
        'Degree and Specialization in Film, Film Directing, and Audiovisual Production.',
        'Advanced Studies in Screenwriting (Script Doctoring & Classical / Non-Linear Narrative Structures).',
        'Specialization in Cinematography, Lens Optics, Color Science, and Dramatic Lighting.',
        'Higher Education Faculty and Masterclass Lecturer in Editing and Visual Storytelling.',
        'Researcher of Film Grammar, Analytical Montage, and the Philosophy of the Moving Image.',
        'Member of Professional Cinema Associations and Independent Audiovisual Filmmaker Guilds.',
      ],
      letterTitle: 'Welcome Message to New Students',
      letterText: `Dear student and aspiring filmmaker,\n\nWhen I conceptualized CINELAB, my goal was not to make just another theoretical course with generic video lectures you could find anywhere online. My obsession was to build an authentic training workshop across 3 months (90 days), where each stage places you directly in contact with the artistic, technical, and aesthetic realities of cinema.\n\nWe examine the shot not as a static idea, but as the smallest dramatic cell of a story. We format scripts not for paperwork, but so the entire crew can envision the light, sound, and stillness required on set. And throughout each of the 10 stages, my team and I will personally accompany your progress, reviewing your assessments and guiding your projects.\n\nIf you carry the urgent need to tell cinematic stories and master film grammar with rigor, welcome to CINELAB.`,
      badgeMentor: 'The Mentor & Founder of CINELAB',
      badgeDirector: 'General Director & Filmmaker',
      editPresentation: 'Edit Presentation & Bio',
      editShort: 'Edit Presentation',
      manifestoLabel: '— Directing Manifesto',
      presAndProfile: 'Presentation & Profile',
      bioAndTrajectory: 'Biography & Film Set Trajectory',
      studyWithBtn: 'Study with Tony de Luc (Enrollment Open)',
      talkCoordBtn: 'Contact Academic Office',
      stat1Val: '+20 Years',
      stat1Label: 'Years of Film Set Experience',
      stat2Val: '+2,000',
      stat2Label: 'Filmmakers & Students Mentored',
      stat3Val: '10 Stages',
      stat3Label: 'Stages & Exclusive Method',
      stat4Val: '180 Hours',
      stat4Label: 'Hours & Official Certificate',
      histBadge: 'Record & Recognition',
      histTitle: 'Key Milestones & Achievements of Tony de Luc',
      histDesc: 'A lifetime committed to cinema of excellence, fostering fresh cinematic voices, and authentic auteur production.',
      currBadge: 'Technical Rigor & Teaching',
      currTitle: 'Curriculum & Academic Background',
      currDesc: 'Tony de Luc fuses hands-on set mastery with profound theoretical rigor. Every syllabus and masterclass delivered at CINELAB has been refined to international cinema school benchmarks.',
      pedCoordTitle: 'CINELAB Academic Board',
      pedCoordDesc: 'All 10 modular evaluations and issued graduation diplomas bear the official seal, personalized reviews, and signature of Academic Director Tony de Luc.',
      filmoBadge: 'Works & Directorial Credits',
      filmoTitle: 'Selected Filmography',
      filmoDesc: 'Prominent works in directing, screenwriting, cinematography, and film curation.',
      viewCourseBtn: 'Explore Course Curriculum',
      roleLabel: 'Role:',
      formatLabel: 'Format:',
      officialPortrait: 'Official Portrait of the Director',
      generalDirectorSub: 'Filmmaker, General Director, and Creator of CINELAB.',
      uploadPhotoBtn: 'Upload Photo (File)',
      changePhotoBtn: 'Change Photo',
      savingPhoto: 'Saving...',
      enrollCtaBtn: 'Complete My Enrollment in CINELAB',
    },
    es: {
      role: 'Cineasta, Director de Fotografía, Productor, Actor, Periodista y Fundador de CINELAB',
      tagline: 'El cine no es simplemente técnica o cámaras; es el arte supremo de plasmar la verdad humana en cada plano y contar historias que resuenen en el tiempo.',
      bioShort: 'Cineasta, realizador audiovisual, guionista y formador con más de 20 años de experiencia en rodajes, festivales y tutorías a directores emergentes.',
      bioFull: 'Con una trayectoria nacida en la energía viva de los sets y una entrega incondicional a la enseñanza cinematográfica, Tony de Luc es un referente en la formación de realizadores independientes.\n\nSu carrera comprende la dirección de largometrajes y cortometrajes premiados en festivales internacionales, la dirección de fotografía con foco en el claroscuro expresivo y el desarrollo de metodologías directas y prácticas. En CINELAB, Tony concibió las 10 etapas formativas (90 días) para que cada estudiante experimente la verdadera dinámica de un rodaje profesional.',
      feitos: [
        'Dirección y guion de obras cinematográficas seleccionadas y premiadas en festivales en Brasil y el circuito internacional.',
        'Formación de decenas de directores, guionistas y directores de fotografía que hoy trabajan en la industria, publicidad y plataformas.',
        'Creación del método pedagógico CINELAB: formación intensiva de 3 meses (90 días) en 10 etapas progresivas, con rigor de set y mirada autoral.',
        'Dirección de Fotografía e Iluminación Dramática en múltiples ficciones, videoclips premiados y documentales de autor.',
        'Jurado y curador invitado en festivales de cine independiente y comités de selección de fondos culturales públicos.',
        'Ponente en el encuentro inaugural CINEMANO - Maestros del Séptimo Arte en la UFRJ, dialogando sobre cine social junto al cineasta Silvio Tendler.',
      ],
      curriculo: [
        'Licenciatura y Especialización en Cine, Dirección Cinematográfica y Realización Audiovisual.',
        'Formación Avanzada en Guion Cinematográfico (Script Doctoring y Narrativas Clásicas y No Lineales).',
        'Especialización en Dirección de Fotografía, Óptica, Teoría del Color e Iluminación Dramática.',
        'Profesor Universitario y docente de talleres de Montaje, Puesta en Escena y Lenguaje Visual.',
        'Investigador del Lenguaje Cinematográfico, Montaje Analítico y Filosofía de la Imagen en Movimiento.',
        'Miembro de Asociaciones Profesionales de Cine y Realizadores Audiovisuales Independientes.',
      ],
      letterTitle: 'Mensaje de Bienvenida a los Nuevos Alumnos',
      letterText: `Estimado estudiante y futuro realizador,\n\nCuando creé CINELAB, mi objetivo no era hacer otro curso teórico con videos genéricos. Mi propósito fue estructurar un auténtico laboratorio de creación cinematográfica durante 3 meses (90 días), donde cada etapa te enfrenta a la realidad artística y técnica de nuestra industria.\n\nEstudiamos el plano no como una idea abstracta, sino como la unidad dramática viva del relato. Escribimos guiones no por trámite, sino para que todo el equipo visualice la luz, el sonido y el silencio que la historia exige. Y a lo largo de las 10 etapas, mi equipo y yo evaluaremos tus respuestas y guiaremos tus proyectos de manera personalizada.\n\nSi sientes la urgencia de narrar y quieres dominar la gramática del cine con rigor, bienvenido a CINELAB.`,
      badgeMentor: 'El Mentor y Fundador de CINELAB',
      badgeDirector: 'Director General y Cineasta',
      editPresentation: 'Editar Presentación y Biografía',
      editShort: 'Editar Presentación',
      manifestoLabel: '— Manifiesto de Dirección',
      presAndProfile: 'Presentación y Perfil',
      bioAndTrajectory: 'Biografía y Trayectoria en Rodajes',
      studyWithBtn: 'Estudia con Tony de Luc (Matrícula Abierta)',
      talkCoordBtn: 'Hablar con Coordinación',
      stat1Val: '+20 Años',
      stat1Label: 'Años de Experiencia en Rodajes',
      stat2Val: '+2.000',
      stat2Label: 'Cineastas y Alumnos Tutorizados',
      stat3Val: '10 Etapas',
      stat3Label: 'Etapas y Método Exclusivo',
      stat4Val: '180 Horas',
      stat4Label: 'Horas y Certificado Oficial',
      histBadge: 'Historial y Reconocimiento',
      histTitle: 'Grandes Logros y Distinciones de Tony de Luc',
      histDesc: 'Una trayectoria marcada por la búsqueda de excelencia visual, la formación de nuevas miradas y el cine de autor.',
      currBadge: 'Rigor Técnico y Docencia',
      currTitle: 'Currículo y Formación Académica',
      currDesc: 'Tony de Luc une el oficio práctico del rodaje con sólidos fundamentos teóricos. Cada manual y masterclass de CINELAB responde a estándares rigurosos de enseñanza cinematográfica.',
      pedCoordTitle: 'Coordinación Pedagógica CINELAB',
      pedCoordDesc: 'Todas las 10 evaluaciones modulares y diplomas emitidos cuentan con validación oficial, comentarios detallados y la firma del Director Tony de Luc.',
      filmoBadge: 'Obras y Filmografía',
      filmoTitle: 'Filmografía Seleccionada',
      filmoDesc: 'Obras destacadas en dirección, guion, fotografía y curaduría cinematográfica.',
      viewCourseBtn: 'Ver Plan de Estudios',
      roleLabel: 'Función:',
      formatLabel: 'Formato:',
      officialPortrait: 'Retrato Oficial del Director',
      generalDirectorSub: 'Cineasta, Director General y Creador de CINELAB.',
      uploadPhotoBtn: 'Subir Mi Foto (Archivo)',
      changePhotoBtn: 'Cambiar Foto',
      savingPhoto: 'Guardando...',
      enrollCtaBtn: 'Completar Mi Matrícula en CINELAB',
    },
    fr: {
      role: 'Cinéaste, Directeur de la Photographie, Producteur, Acteur, Journaliste & Fondateur de CINELAB',
      tagline: 'Le cinéma n\'est pas qu\'une affaire d\'équipement ou de technique ; c\'est l\'art souverain d\'imprimer la vérité humaine dans chaque plan et de raconter des histoires qui traversent le temps.',
      bioShort: 'Cinéaste, réalisateur audiovisuel, scénariste et pédagogue avec plus de 20 ans d\'expérience sur les plateaux de tournage, en festivals et dans la formation de nombreux réalisateurs.',
      bioFull: 'Forgeant sa vision au cœur vibrant des plateaux de tournage et vouant une passion sincère à la pédagogie du cinéma, Tony de Luc est une référence incontournable de la création indépendante.\n\nSon parcours englobe la réalisation de courts et longs métrages primés en festivals internationaux, la direction de la photographie centrée sur le clair-obscur dramatique et le développement d\'une méthode d\'apprentissage directe et sans détour. À CINELAB, Tony a conçu le parcours des 10 étapes formatives (90 jours) pour immerger chaque étudiant dans les conditions réelles d\'une équipe de cinéma.',
      feitos: [
        'Réalisation et scénario d\'œuvres cinématographiques sélectionnées et récompensées en festivals au Brésil et à l\'international.',
        'Formation de dizaines de réalisateurs, scénaristes et chefs opérateurs aujourd\'hui actifs dans l\'industrie, la publicité et le streaming.',
        'Création de la méthode pédagogique CINELAB : formation intensive de 3 mois (90 jours) en 10 étapes progressives, centrée sur le plateau et le cinéma d\'auteur.',
        'Direction de la photographie et éclairage dramatique sur de nombreuses fictions, clips primés et documentaires d\'auteur.',
        'Membre de jury et programmateur invité pour des festivals de cinéma indépendant et commissions de subventions publiques.',
        'Intervenant lors des rencontres inaugurales CINEMANO - Maîtres du Septième Art à l\'UFRJ, aux côtés du cinéaste Silvio Tendler.',
      ],
      curriculo: [
        'Diplômé d\'études supérieures et spécialisation en Cinéma, Réalisation et Écriture Audiovisuelle.',
        'Formation approfondie en Scénario (Script Doctoring & Structures Narratives Classiques et Non-Linéaires).',
        'Spécialisation en Direction de la Photographie, Optique Cinématographique, Étalonnage et Lumière Dramatique.',
        'Enseignant universitaire et formateur en Montage Analytique et Grammaire de l\'Image.',
        'Chercheur en Esthétique Cinématographique et Philosophie de l\'Image en Mouvement.',
        'Membre d\'associations professionnelles de cinéastes et réalisateurs indépendants.',
      ],
      letterTitle: 'Message de Bienvenue aux Nouveaux Étudiants',
      letterText: `Cher étudiant et futur cinéaste,\n\nQuand j'ai fondé CINELAB, mon objectif n'était pas de concevoir un cours purement théorique avec des vidéos impersonnelles. Mon exigence absolue était d'établir un véritable atelier immersif de 3 mois (90 jours), où chaque étape vous confronte aux exigences artistiques et techniques du cinéma.\n\nNous abordons le plan non comme une notion abstraite, mais comme la plus petite unité dramatique du récit. Nous écrivons un scénario pour que toute l'équipe perçoive la lumière, le son et les silences du film. Et tout au long des 10 étapes, mon équipe et moi suivrons personnellement vos progrès et analyserons vos exercices.\n\nSi vous ressentez le besoin impérieux de raconter des histoires avec rigueur et passion, soyez le bienvenu au CINELAB.`,
      badgeMentor: 'Le Mentor & Fondateur du CINELAB',
      badgeDirector: 'Directeur Général & Cinéaste',
      editPresentation: 'Modifier Présentation & Biographie',
      editShort: 'Modifier Présentation',
      manifestoLabel: '— Manifeste de Réalisation',
      presAndProfile: 'Présentation & Profil',
      bioAndTrajectory: 'Biographie & Expérience de Plateau',
      studyWithBtn: 'Étudiez avec Tony de Luc (Inscriptions Ouvertes)',
      talkCoordBtn: 'Contacter la Coordination',
      stat1Val: '+20 Ans',
      stat1Label: 'Années d\'Expérience sur les Plateaux',
      stat2Val: '+2.000',
      stat2Label: 'Cinéastes & Étudiants Accompagnés',
      stat3Val: '10 Étapes',
      stat3Label: 'Étapes & Méthode Pédagogique Exclusif',
      stat4Val: '180 Heures',
      stat4Label: 'Heures Certifiées & Diplôme Officiel',
      histBadge: 'Parcours & Distinctions',
      histTitle: 'Faits Marquants & Réalisations de Tony de Luc',
      histDesc: 'Un itinéraire placé sous le signe de l\'exigence cinématographique, de la transmission et de la création d\'auteur.',
      currBadge: 'Rigueur Technique & Enseignement',
      currTitle: 'Curriculum & Formation Académique',
      currDesc: 'Tony de Luc associe l\'expérience concrète du terrain à une solide formation théorique. Chaque module enseigné au CINELAB respecte les plus hauts standards académiques.',
      pedCoordTitle: 'Coordination Pédagogique CINELAB',
      pedCoordDesc: 'L\'ensemble des 10 évaluations et diplômes délivrés portent la validation officielle et la signature du Directeur Académique Tony de Luc.',
      filmoBadge: 'Filmographie & Réalisations',
      filmoTitle: 'Filmographie Sélective',
      filmoDesc: 'Œuvres majeures en réalisation, scénario, photographie et programmation de cinéma.',
      viewCourseBtn: 'Consulter le Programme du Cours',
      roleLabel: 'Rôle :',
      formatLabel: 'Format :',
      officialPortrait: 'Portrait Officiel du Réalisateur',
      generalDirectorSub: 'Cinéaste, Directeur Général et Créateur du CINELAB.',
      uploadPhotoBtn: 'Téléverser ma photo (Fichier)',
      changePhotoBtn: 'Modifier la photo',
      savingPhoto: 'Enregistrement...',
      enrollCtaBtn: 'Finaliser mon Inscription au CINELAB',
    },
  };

  const cur = profileTranslations[language] || profileTranslations.pt;

  const defaultFilmografia: FilmographyWork[] = [
    {
      title: 'SINGULARIDADE',
      year: '2017',
      role: language === 'pt' ? 'Diretor de Fotografia' : language === 'en' ? 'Director of Photography' : language === 'es' ? 'Director de Fotografía' : 'Directeur de la Photographie',
      type: language === 'pt' ? 'Curta-Metragem - GÊNERO: ANIMAÇÃO' : language === 'en' ? 'Short Film - GENRE: ANIMATION' : language === 'es' ? 'Cortometraje - GÉNERO: ANIMACIÓN' : 'Court Métrage - GENRE : ANIMATION',
      details: language === 'pt' ? 'Direção de fotografia com iluminação volumétrica digital.' : language === 'en' ? 'Cinematography with digital volumetric lighting.' : language === 'es' ? 'Dirección de fotografía con iluminación volumétrica digital.' : 'Direction de la photographie avec lumière volumétrique.',
    },
    {
      title: 'NELSON PEREIRA DOS SANTOS E O CINEMA NOVO',
      year: '2016',
      role: language === 'pt' ? 'Diretor de Fotografia & Montagem' : language === 'en' ? 'Director of Photography & Editing' : language === 'es' ? 'Director de Fotografía y Montaje' : 'Directeur de la Photographie & Montage',
      type: language === 'pt' ? 'Curta-Metragem - GÊNERO: DOCUMENTÁRIO' : language === 'en' ? 'Short Film - GENRE: DOCUMENTARY' : language === 'es' ? 'Cortometraje - GÉNERO: DOCUMENTAL' : 'Court Métrage - GENRE : DOCUMENTAIRE',
      details: language === 'pt' ? 'Encontro e registro documental sobre um dos fundadores do Cinema Novo brasileiro.' : language === 'en' ? 'Documentary encounter and registry on one of the founders of Brazilian Cinema Novo.' : language === 'es' ? 'Encuentro y registro documental sobre uno de los padres del Cinema Novo brasileño.' : 'Rencontre et hommage documentaire sur un des pères fondateurs du Cinema Novo.',
    },
    {
      title: 'HAP',
      year: '2016',
      role: language === 'pt' ? 'Diretor de Fotografia' : language === 'en' ? 'Director of Photography' : language === 'es' ? 'Director de Fotografía' : 'Directeur de la Photographie',
      type: language === 'pt' ? 'Curta-Metragem - GÊNERO: DRAMA' : language === 'en' ? 'Short Film - GENRE: DRAMA' : language === 'es' ? 'Cortometraje - GÉNERO: DRAMA' : 'Court Métrage - GENRE : DRAME',
      details: language === 'pt' ? 'Obra dramática com pesquisa visual em claro-escuro.' : language === 'en' ? 'Dramatic film with visual research in dramatic chiaroscuro.' : language === 'es' ? 'Obra dramática con exploración visual en claroscuro.' : 'Œuvre dramatique avec recherche visuelle en clair-obscur.',
    },
    {
      title: 'O DIÁRIO DE UM VICIADO',
      year: '2012',
      role: language === 'pt' ? 'Supervisão Geral do Roteiro e Direção' : language === 'en' ? 'Screenplay Supervision & Direction' : language === 'es' ? 'Supervisión de Guion y Dirección' : 'Supervision du Scénario & Réalisation',
      type: language === 'pt' ? 'Média-Metragem - GÊNERO: DRAMA POLICIAL' : language === 'en' ? 'Medium-Length Film - GENRE: CRIME DRAMA' : language === 'es' ? 'Mediometraje - GÉNERO: DRAMA POLICIAL' : 'Moyen Métrage - GENRE : DRAME POLICIER',
      details: language === 'pt' ? 'Exploração de ritmo narrativo e montagem paralela.' : language === 'en' ? 'Exploration of narrative rhythm and parallel montage.' : language === 'es' ? 'Exploración de ritmo narrativo y montaje paralelo.' : 'Exploration du rythme narratif et montage parallèle.',
    },
    {
      title: 'EXPRESSO TERMINAL (TERMINAL EXPRESS)',
      year: '2006',
      role: language === 'pt' ? 'Direção & Roteiro' : language === 'en' ? 'Directing & Screenplay' : language === 'es' ? 'Dirección y Guion' : 'Réalisation & Scénario',
      type: language === 'pt' ? 'Curta-Metragem - GÊNERO: SUSPENSE' : language === 'en' ? 'Short Film - GENRE: THRILLER' : language === 'es' ? 'Cortometraje - GÉNERO: SUSPENSE' : 'Court Métrage - GENRE : SUSPENSE',
      details: language === 'pt'
        ? 'Prêmio De Melhor Roteiro Do Festival Curta 4.2 – Favorito Do Amazonas Film Festival De 2006 – Participação no Festival de Cannes (Un Certain Regard) – Prêmio De Melhor Direção E Roteiro No Festival Da França – Melhor Direção Em Portugal.'
        : language === 'en'
        ? 'Best Screenplay Award at Curta 4.2 Festival – Audience Favorite at Amazonas Film Festival 2006 – Cannes Film Festival (Un Certain Regard showcase) – Best Directing and Screenplay at France Festival – Best Directing in Portugal.'
        : language === 'es'
        ? 'Premio al Mejor Guion en Festival Curta 4.2 – Favorito del Amazonas Film Festival 2006 – Participación en Festival de Cannes (Un Certain Regard) – Mejor Dirección y Guion en Festival de Francia – Mejor Dirección en Portugal.'
        : 'Prix du Meilleur Scénario au Festival Curta 4.2 – Favori du Festival d\'Amazonas 2006 – Sélection au Festival de Cannes (Un Certain Regard) – Prix de la Meilleure Réalisation et Scénario en France – Meilleure Réalisation au Portugal.',
    },
    {
      title: 'A POSSUÍDA',
      year: '2006',
      role: language === 'pt' ? 'Diretor de Fotografia' : language === 'en' ? 'Director of Photography' : language === 'es' ? 'Director de Fotografía' : 'Directeur de la Photographie',
      type: language === 'pt' ? 'Curta-Metragem - GÊNERO: TERROR' : language === 'en' ? 'Short Film - GENRE: HORROR' : language === 'es' ? 'Cortometraje - GÉNERO: TERROR' : 'Court Métrage - GENRE : HORREUR',
      details: language === 'pt' ? 'Participou numa amostragem dentro do Festival Curta Amazônico 4.2 em Manaus.' : language === 'en' ? 'Screened in official showcase at Curta Amazônico 4.2 in Manaus.' : language === 'es' ? 'Muestra oficial en el Festival Curta Amazônico 4.2 en Manaos.' : 'Présenté au Festival Curta Amazônico 4.2 à Manaus.',
    },
  ];

  // Local storage profile state for instant and resilient persistence
  const localSaved = getLocalTonyProfile();

  const [directorName, setDirectorName] = useState<string>(
    localSaved?.tonyName || settings?.tonyName || settings?.directorName || 'Professor Cineasta Tony de Luc'
  );
  const [directorRole, setDirectorRole] = useState<string>(
    localSaved?.tonyRole || settings?.tonyRole || settings?.directorRole || cur.role
  );
  const [photoUrlState, setPhotoUrlState] = useState<string>(
    localSaved?.tonyPhotoUrl || settings?.tonyPhotoUrl || '/images/tony-de-luc.jpg'
  );
  const [tagline, setTagline] = useState<string>(
    localSaved?.tonyTagline || settings?.tonyTagline || cur.tagline
  );
  const [bioShort, setBioShort] = useState<string>(
    localSaved?.tonyBioShort || settings?.tonyBioShort || cur.bioShort
  );
  const [bioFull, setBioFull] = useState<string>(
    localSaved?.tonyBioFull || settings?.tonyBioFull || cur.bioFull
  );
  const [feitosList, setFeitosList] = useState<string[]>(
    localSaved?.tonyFeitos && localSaved.tonyFeitos.length > 0
      ? localSaved.tonyFeitos
      : settings?.tonyFeitos && settings.tonyFeitos.length > 0
      ? settings.tonyFeitos
      : cur.feitos
  );
  const [curriculoList, setCurriculoList] = useState<string[]>(
    localSaved?.tonyCurriculo && localSaved.tonyCurriculo.length > 0
      ? localSaved.tonyCurriculo
      : settings?.tonyCurriculo && settings.tonyCurriculo.length > 0
      ? settings.tonyCurriculo
      : cur.curriculo
  );
  const [socialInstagram, setSocialInstagram] = useState<string>(
    localSaved?.tonySocialInstagram || settings?.tonySocialInstagram || 'https://instagram.com/tonydeluc'
  );
  const [socialLinkedin, setSocialLinkedin] = useState<string>(
    localSaved?.tonySocialLinkedin || settings?.tonySocialLinkedin || settings?.tonySocialImdb || 'https://linkedin.com/in/tonydeluc-cinema'
  );
  const [socialYoutube, setSocialYoutube] = useState<string>(
    localSaved?.tonySocialYoutube || settings?.tonySocialYoutube || settings?.tonySocialVimeo || 'https://youtube.com/@TVDIVERSIDADE'
  );

  const [imgLoadError, setImgLoadError] = useState(false);
  const [isUploadingPhoto, setIsUploadingPhoto] = useState(false);
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [successToast, setSuccessToast] = useState<string | null>(null);
  const [expandedFilmIdx, setExpandedFilmIdx] = useState<number | null>(null);
  const [cinemaFilm, setCinemaFilm] = useState<FilmographyWork | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Close cinema lightbox on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setCinemaFilm(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Smooth scroll to filmografia if arrived via anchor or filmografia route
  useEffect(() => {
    if (window.location.hash === '#filmografia') {
      const el = document.getElementById('filmografia');
      if (el) {
        setTimeout(() => el.scrollIntoView({ behavior: 'smooth' }), 200);
      }
    }
  }, []);

  // When language changes, update defaults if not customized
  useEffect(() => {
    if (!localSaved?.tonyRole && !settings?.tonyRole) setDirectorRole(cur.role);
    if (!localSaved?.tonyTagline && !settings?.tonyTagline) setTagline(cur.tagline);
    if (!localSaved?.tonyBioShort && !settings?.tonyBioShort) setBioShort(cur.bioShort);
    if (!localSaved?.tonyBioFull && !settings?.tonyBioFull) setBioFull(cur.bioFull);
    if ((!localSaved?.tonyFeitos || localSaved.tonyFeitos.length === 0) && (!settings?.tonyFeitos || settings.tonyFeitos.length === 0)) {
      setFeitosList(cur.feitos);
    }
    if ((!localSaved?.tonyCurriculo || localSaved.tonyCurriculo.length === 0) && (!settings?.tonyCurriculo || settings.tonyCurriculo.length === 0)) {
      setCurriculoList(cur.curriculo);
    }
  }, [language]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  // Direct photo upload from computer or phone
  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsUploadingPhoto(true);
      const persistentUrl = await persistTonyPhoto(file);
      setPhotoUrlState(persistentUrl);
      setImgLoadError(false);
      setSuccessToast(
        language === 'pt'
          ? '✓ Foto salva com sucesso!'
          : language === 'es'
          ? '✓ ¡Foto guardada con éxito!'
          : language === 'fr'
          ? '✓ Photo enregistrée avec succès !'
          : '✓ Photo saved successfully!'
      );
      setTimeout(() => setSuccessToast(null), 4500);
    } catch (err: any) {
      console.error('Erro ao enviar foto:', err);
      alert('Erro ao enviar foto: ' + (err.message || err));
    } finally {
      setIsUploadingPhoto(false);
    }
  };

  // Full profile save from modal
  const handleSaveProfileModal = async (updated: TonyProfileData) => {
    await persistTonyProfile(updated);
    setDirectorName(updated.tonyName);
    setDirectorRole(updated.tonyRole);
    setPhotoUrlState(updated.tonyPhotoUrl);
    setTagline(updated.tonyTagline);
    setBioShort(updated.tonyBioShort);
    setBioFull(updated.tonyBioFull);
    setFeitosList(updated.tonyFeitos);
    setCurriculoList(updated.tonyCurriculo);
    if (updated.tonySocialInstagram) setSocialInstagram(updated.tonySocialInstagram);
    if (updated.tonySocialLinkedin) setSocialLinkedin(updated.tonySocialLinkedin);
    if (updated.tonySocialYoutube) setSocialYoutube(updated.tonySocialYoutube);

    setSuccessToast(
      language === 'pt'
        ? '✓ Perfil atualizado com sucesso!'
        : language === 'es'
        ? '✓ ¡Perfil actualizado con éxito!'
        : language === 'fr'
        ? '✓ Profil mis à jour avec succès !'
        : '✓ Profile updated successfully!'
    );
    setTimeout(() => setSuccessToast(null), 5000);
  };

  const welcomeVideoUrl = settings?.welcomeVideoUrl || '';
  const messageTitle = settings?.welcomeMessageTitle || cur.letterTitle;
  const messageText = settings?.welcomeMessageText || cur.letterText;

  const embedInfo = parseVideoEmbed(welcomeVideoUrl);
  const filmografia =
    settings?.tonyFilmografia && settings.tonyFilmografia.length > 0 ? settings.tonyFilmografia : defaultFilmografia;

  return (
    <div className="min-h-screen bg-[#07080a] text-neutral-200 pb-20 selection:bg-amber-500 selection:text-black">
      {/* Floating Success Notification */}
      {successToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-emerald-950/95 border border-emerald-500 text-white px-5 py-3.5 rounded-2xl shadow-2xl flex items-center gap-3 animate-bounce">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <span className="text-xs sm:text-sm font-medium">{successToast}</span>
        </div>
      )}

      {/* Top Breadcrumb & Control Bar */}
      <div className="border-b border-neutral-800/80 bg-[#0c0d10] py-3 sticky top-0 z-30 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <div className="flex items-center gap-2 text-neutral-400 font-mono text-xs">
            <button onClick={() => onNavigate('inicio')} className="hover:text-white transition-colors cursor-pointer">
              CINELAB
            </button>
            <span>/</span>
            <span className="text-amber-400 font-semibold">Tony de Luc</span>
          </div>

          <div className="flex items-center gap-2.5">
            {/* Direct Edit Button for Tony / Director */}
            <button
              onClick={() => setIsEditorOpen(true)}
              className="px-3.5 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold font-mono text-xs flex items-center gap-1.5 cursor-pointer transition-all shadow-md shadow-amber-500/20 active:scale-95"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>{cur.editPresentation}</span>
            </button>

            {isAdmin && (
              <button
                onClick={() => onNavigate('admin')}
                className="px-3 py-1.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 text-neutral-300 font-mono text-xs flex items-center gap-1.5 cursor-pointer transition-colors"
              >
                <Sliders className="w-3.5 h-3.5 text-neutral-400" />
                <span className="hidden sm:inline">Admin</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section id="biografia" className="relative overflow-hidden pt-10 pb-16 lg:py-16 border-b border-neutral-800/70">
        <div className="absolute inset-0 bg-radial from-amber-500/10 via-transparent to-transparent opacity-60 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
            {/* Left: Director Image & Badges */}
            <div className="lg:col-span-5 flex flex-col items-center">
              <div className="relative group w-full max-w-md">
                {/* Cinema border frame */}
                <div className="absolute -inset-2 bg-gradient-to-tr from-amber-500/30 via-neutral-700/20 to-amber-600/30 rounded-3xl blur-md group-hover:blur-lg transition-all opacity-80" />
                
                <div className="relative rounded-2xl overflow-hidden border border-neutral-700/80 bg-neutral-900 shadow-2xl">
                  {photoUrlState && !imgLoadError ? (
                    <img
                      src={photoUrlState}
                      alt={directorName}
                      referrerPolicy="no-referrer"
                      onError={() => setImgLoadError(true)}
                      className="w-full aspect-[4/5] object-cover object-top filter contrast-105"
                    />
                  ) : (
                    <div className="w-full aspect-[4/5] bg-gradient-to-b from-neutral-800 via-neutral-900 to-black flex flex-col items-center justify-center p-6 text-center space-y-4">
                      <div className="w-24 h-24 rounded-full bg-amber-500/10 border-2 border-amber-500/30 flex items-center justify-center shadow-inner">
                        <Camera className="w-12 h-12 text-amber-400/80" />
                      </div>
                      <div className="space-y-1">
                        <h4 className="text-white font-bold font-display text-lg">{directorName}</h4>
                        <p className="text-xs text-amber-400/80 font-mono">{cur.officialPortrait}</p>
                      </div>
                      <p className="text-xs text-neutral-400 max-w-xs leading-relaxed">
                        {cur.generalDirectorSub}
                      </p>
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        disabled={isUploadingPhoto}
                        className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-semibold text-xs flex items-center gap-2 transition-transform active:scale-95 shadow-lg shadow-amber-500/20 cursor-pointer"
                      >
                        {isUploadingPhoto ? (
                          <>
                            <Loader2 className="w-3.5 h-3.5 animate-spin" />
                            <span>{cur.savingPhoto}</span>
                          </>
                        ) : (
                          <>
                            <Upload className="w-3.5 h-3.5" />
                            <span>{cur.uploadPhotoBtn}</span>
                          </>
                        )}
                      </button>
                    </div>
                  )}

                  {/* Hidden file input for quick direct upload */}
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handlePhotoUpload}
                  />

                  {/* Clapperboard watermarked badge */}
                  <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-black/75 backdrop-blur-md border border-amber-500/40 text-amber-300 text-[11px] font-mono flex items-center gap-1.5 shadow-lg">
                    <Clapperboard className="w-3.5 h-3.5 text-amber-400" />
                    <span>{cur.badgeDirector}</span>
                  </div>

                  {/* Always-visible change photo button */}
                  {photoUrlState && !imgLoadError && (
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      disabled={isUploadingPhoto}
                      title="Alterar Foto"
                      className="absolute top-4 right-4 px-3 py-1.5 rounded-full bg-black/80 hover:bg-black border border-amber-500/50 hover:border-amber-400 text-amber-300 hover:text-white text-[11px] font-mono flex items-center gap-1.5 shadow-xl transition-all cursor-pointer backdrop-blur-sm"
                    >
                      {isUploadingPhoto ? (
                        <Loader2 className="w-3.5 h-3.5 animate-spin text-amber-400" />
                      ) : (
                        <Camera className="w-3.5 h-3.5 text-amber-400" />
                      )}
                      <span>{isUploadingPhoto ? cur.savingPhoto : cur.changePhotoBtn}</span>
                    </button>
                  )}

                  <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black via-black/80 to-transparent p-6 text-center space-y-1">
                    <h3 className="text-lg font-bold font-display text-white">{directorName}</h3>
                    <p className="text-xs font-mono text-amber-400/90">{directorRole}</p>
                  </div>
                </div>
              </div>

              {/* Social Channels / Portfolios */}
              <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
                {socialInstagram && (
                  <a
                    href={socialInstagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3.5 py-1.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-neutral-300 hover:text-white text-xs font-mono flex items-center gap-1.5 transition-colors"
                  >
                    <Instagram className="w-3.5 h-3.5 text-pink-400" />
                    <span>Instagram</span>
                    <ExternalLink className="w-3 h-3 text-neutral-500" />
                  </a>
                )}
                {socialLinkedin && (
                  <a
                    href={socialLinkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3.5 py-1.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-neutral-300 hover:text-white text-xs font-mono flex items-center gap-1.5 transition-colors"
                  >
                    <Linkedin className="w-3.5 h-3.5 text-sky-400" />
                    <span>LinkedIn</span>
                    <ExternalLink className="w-3 h-3 text-neutral-500" />
                  </a>
                )}
                {socialYoutube && (
                  <a
                    href={socialYoutube}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3.5 py-1.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-neutral-300 hover:text-white text-xs font-mono flex items-center gap-1.5 transition-colors"
                  >
                    <Youtube className="w-3.5 h-3.5 text-red-500" />
                    <span>YouTube</span>
                    <ExternalLink className="w-3 h-3 text-neutral-500" />
                  </a>
                )}
              </div>
            </div>

            {/* Right: Bio, Manifesto, Tagline & Vision */}
            <div className="lg:col-span-7 space-y-6">
              <div className="flex items-center justify-between gap-4">
                <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-mono font-medium uppercase tracking-wider">
                  <Sparkles className="w-3.5 h-3.5" /> {cur.badgeMentor}
                </div>

                <button
                  onClick={() => setIsEditorOpen(true)}
                  className="text-xs font-mono text-amber-400/90 hover:text-amber-300 flex items-center gap-1 cursor-pointer transition-colors"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  <span>{cur.editShort}</span>
                </button>
              </div>

              <div>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-white tracking-tight leading-tight">
                  {directorName}
                </h1>
                <p className="text-sm font-mono text-amber-400/90 mt-1">
                  {directorRole}
                </p>
              </div>

              {/* Tagline / Frase do Diretor */}
              <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-transparent border-l-4 border-amber-500 border-y border-r border-neutral-800/80">
                <p className="text-base sm:text-lg lg:text-xl text-amber-200/95 font-serif italic leading-relaxed">
                  "{tagline}"
                </p>
                <div className="flex items-center gap-2 mt-2.5 text-[11px] font-mono text-amber-400/80 uppercase tracking-widest">
                  <span>{cur.manifestoLabel}</span>
                </div>
              </div>

              {/* Minibiografia */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-[11px] font-mono uppercase tracking-widest text-neutral-400 font-bold">
                  <span>{cur.presAndProfile}</span>
                  <button
                    onClick={() => setIsEditorOpen(true)}
                    className="text-amber-400 hover:text-amber-300 lowercase text-[11px] cursor-pointer"
                  >
                    [editar]
                  </button>
                </div>
                <p className="text-sm sm:text-base text-neutral-200 leading-relaxed font-sans">
                  {bioShort}
                </p>
              </div>

              {/* Biografia Completa & Trajetória */}
              <div className="pt-4 border-t border-neutral-800/80 space-y-2.5">
                <div className="flex items-center justify-between text-[11px] font-mono uppercase tracking-widest text-neutral-400 font-bold">
                  <span>{cur.bioAndTrajectory}</span>
                  <button
                    onClick={() => setIsEditorOpen(true)}
                    className="text-amber-400 hover:text-amber-300 lowercase text-[11px] cursor-pointer"
                  >
                    [editar]
                  </button>
                </div>
                <div className="text-xs sm:text-sm text-neutral-300 space-y-3 leading-relaxed whitespace-pre-line">
                  {bioFull}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 flex flex-wrap items-center gap-3">
                <button
                  onClick={() => onNavigate('matricula')}
                  className="px-6 py-3 bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold uppercase rounded-xl text-xs transition-all cursor-pointer flex items-center gap-2 shadow-lg shadow-amber-500/20 font-sans active:scale-98"
                >
                  <Clapperboard className="w-4 h-4" />
                  <span>{cur.studyWithBtn}</span>
                </button>

                <button
                  onClick={() => onNavigate('contato')}
                  className="px-5 py-3 bg-neutral-900 hover:bg-neutral-800 text-neutral-200 hover:text-white border border-neutral-700 rounded-xl text-xs font-medium transition-colors cursor-pointer flex items-center gap-2"
                >
                  <MessageSquare className="w-4 h-4 text-amber-400" />
                  <span>{cur.talkCoordBtn}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Stats Bar */}
      <section className="bg-neutral-950 border-b border-neutral-800/80 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center font-mono">
            <div className="p-4 rounded-2xl bg-neutral-900/60 border border-neutral-800">
              <span className="text-2xl sm:text-3xl font-display font-bold text-amber-400 block">{cur.stat1Val}</span>
              <span className="text-xs text-neutral-400 mt-1 block">{cur.stat1Label}</span>
            </div>
            <div className="p-4 rounded-2xl bg-neutral-900/60 border border-neutral-800">
              <span className="text-2xl sm:text-3xl font-display font-bold text-white block">{cur.stat2Val}</span>
              <span className="text-xs text-neutral-400 mt-1 block">{cur.stat2Label}</span>
            </div>
            <div className="p-4 rounded-2xl bg-neutral-900/60 border border-neutral-800">
              <span className="text-2xl sm:text-3xl font-display font-bold text-amber-400 block">{cur.stat3Val}</span>
              <span className="text-xs text-neutral-400 mt-1 block">{cur.stat3Label}</span>
            </div>
            <div className="p-4 rounded-2xl bg-neutral-900/60 border border-neutral-800">
              <span className="text-2xl sm:text-3xl font-display font-bold text-white block">{cur.stat4Val}</span>
              <span className="text-xs text-neutral-400 mt-1 block">{cur.stat4Label}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Feitos, Conquistas & Distinções */}
      <section id="feitos" className="py-16 border-b border-neutral-800/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="space-y-3 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-mono">
                <Award className="w-3.5 h-3.5" /> {cur.histBadge}
              </div>
              <h2 className="text-2xl sm:text-3xl font-display font-bold text-white">
                {cur.histTitle}
              </h2>
              <p className="text-xs sm:text-sm text-neutral-400">
                {cur.histDesc}
              </p>
            </div>

            <button
              onClick={() => setIsEditorOpen(true)}
              className="px-3.5 py-1.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-amber-400 text-xs font-mono flex items-center gap-1.5 cursor-pointer self-start sm:self-auto"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>{cur.editShort}</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {feitosList.map((item, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-neutral-900/90 border border-neutral-800 hover:border-amber-500/40 transition-all space-y-3 relative group"
              >
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0 group-hover:bg-amber-500 group-hover:text-black transition-colors">
                  {idx === 0 ? (
                    <Award className="w-5 h-5" />
                  ) : idx === 1 ? (
                    <UserCheck className="w-5 h-5" />
                  ) : idx === 2 ? (
                    <Film className="w-5 h-5" />
                  ) : idx === 3 ? (
                    <Camera className="w-5 h-5" />
                  ) : idx === 4 ? (
                    <Star className="w-5 h-5" />
                  ) : (
                    <Tv className="w-5 h-5" />
                  )}
                </div>
                <h3 className="text-sm font-bold text-white font-display">
                  #{String(idx + 1).padStart(2, '0')}
                </h3>
                <p className="text-xs text-neutral-300 leading-relaxed font-sans">
                  {item}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Currículo & Formação Acadêmica */}
      <section id="curriculo" className="py-16 border-b border-neutral-800/70 bg-[#090a0d]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Left Column */}
            <div className="lg:col-span-5 space-y-5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-mono">
                <BookOpen className="w-3.5 h-3.5" /> {cur.currBadge}
              </div>
              <h2 className="text-2xl sm:text-3xl font-display font-bold text-white">
                {cur.currTitle}
              </h2>
              <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
                {cur.currDesc}
              </p>

              <div className="p-5 rounded-2xl bg-neutral-900 border border-neutral-800 space-y-3">
                <div className="flex items-center gap-2 text-amber-400 text-xs font-bold font-mono">
                  <ShieldCheck className="w-4 h-4 text-amber-500" />
                  <span>{cur.pedCoordTitle}</span>
                </div>
                <p className="text-xs text-neutral-300 leading-relaxed">
                  {cur.pedCoordDesc}
                </p>
              </div>
            </div>

            {/* Right Column: Credentials List */}
            <div className="lg:col-span-7 space-y-3">
              {curriculoList.map((item, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl bg-neutral-900/80 border border-neutral-800/90 flex items-start gap-3.5 text-xs text-neutral-200 hover:border-neutral-700 transition-colors"
                >
                  <div className="w-6 h-6 rounded-lg bg-neutral-800 border border-neutral-700 flex items-center justify-center text-amber-400 font-mono text-[10px] shrink-0 mt-0.5 font-bold">
                    {idx + 1}
                  </div>
                  <div className="flex-1 leading-relaxed">
                    {item}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Filmografia Selecionada & Obras */}
      <section id="filmografia" className="py-16 border-b border-neutral-800/70 scroll-mt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="space-y-2 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-mono">
                <Film className="w-3.5 h-3.5" /> {cur.filmoBadge}
              </div>
              <h2 className="text-2xl sm:text-3xl font-display font-bold text-white">
                {cur.filmoTitle}
              </h2>
              <p className="text-xs sm:text-sm text-neutral-400">
                {cur.filmoDesc}
              </p>
            </div>

            <button
              onClick={() => onNavigate('curso')}
              className="px-4 py-2 rounded-xl bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-neutral-300 hover:text-white text-xs font-mono flex items-center gap-1.5 transition-colors cursor-pointer self-start sm:self-auto"
            >
              <span>{cur.viewCourseBtn}</span>
              <ArrowRight className="w-3.5 h-3.5 text-amber-400" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filmografia.map((work, idx) => {
              const isExpanded = expandedFilmIdx === idx;
              const embed = work.videoUrl ? parseVideoEmbed(work.videoUrl) : null;

              return (
                <div
                  key={idx}
                  className="p-6 rounded-2xl bg-neutral-900/90 border border-neutral-800 hover:border-amber-500/30 transition-all space-y-4 relative flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between gap-2 border-b border-neutral-800 pb-3">
                      <div className="flex items-center gap-2 min-w-0">
                        <Clapperboard className="w-4 h-4 text-amber-500 shrink-0" />
                        <h3 className="text-base font-bold font-display text-white truncate">{work.title}</h3>
                      </div>
                      <span className="px-2.5 py-1 rounded-full bg-neutral-800 text-amber-400 font-mono text-[11px] font-bold shrink-0">
                        {work.year}
                      </span>
                    </div>

                    <div className="space-y-1.5 text-xs">
                      <div className="flex items-center gap-2">
                        <span className="text-neutral-500 font-mono">{cur.roleLabel}</span>
                        <strong className="text-neutral-200">{work.role}</strong>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-neutral-500 font-mono">{cur.formatLabel}</span>
                        <span className="text-neutral-300">{work.type}</span>
                      </div>
                    </div>

                    {work.details && (
                      <p className="text-xs text-neutral-400 leading-relaxed font-sans bg-neutral-950 p-3.5 rounded-xl border border-neutral-800/60">
                        {work.details}
                      </p>
                    )}
                  </div>

                  {/* Seção do Vídeo / Player Integrado */}
                  <div className="pt-3 border-t border-neutral-800/80">
                    {work.videoUrl ? (
                      <div className="space-y-3">
                        <div className="flex items-center justify-between gap-2 flex-wrap">
                          <div className="flex items-center gap-1.5">
                            {embed?.type === 'youtube' ? (
                              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-red-950/50 border border-red-500/30 text-red-400 font-mono text-[10px] font-semibold">
                                <Youtube className="w-3 h-3 text-red-500" /> YouTube HD
                              </span>
                            ) : embed?.type === 'vimeo' ? (
                              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-sky-950/50 border border-sky-500/30 text-sky-400 font-mono text-[10px] font-semibold">
                                <Play className="w-2.5 h-2.5 fill-sky-400 text-sky-400" /> Vimeo HD
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-950/50 border border-amber-500/30 text-amber-400 font-mono text-[10px] font-semibold">
                                <Film className="w-3 h-3" /> Vídeo HD
                              </span>
                            )}
                          </div>

                          <div className="flex items-center gap-2">
                            {/* Botão Modo Cinema */}
                            <button
                              type="button"
                              onClick={() => setCinemaFilm(work)}
                              className="px-2.5 py-1.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-300 hover:text-white text-xs font-mono flex items-center gap-1.5 transition-colors cursor-pointer border border-neutral-700"
                              title="Assistir em Modo Cinema (Tela Cheia)"
                            >
                              <Maximize2 className="w-3 h-3 text-amber-400" />
                              <span className="hidden sm:inline">Modo Cinema</span>
                            </button>

                            {/* Botão Assistir ao Filme / Fechar Player */}
                            <button
                              type="button"
                              onClick={() => setExpandedFilmIdx(isExpanded ? null : idx)}
                              className={`px-3.5 py-1.5 rounded-xl font-mono text-xs flex items-center gap-1.5 transition-all cursor-pointer font-bold ${
                                isExpanded
                                  ? 'bg-neutral-800 text-neutral-300 hover:bg-neutral-700 border border-neutral-700'
                                  : 'bg-gradient-to-r from-amber-500 to-amber-600 text-neutral-950 hover:brightness-110 shadow-lg shadow-amber-500/25 active:scale-95'
                              }`}
                            >
                              {isExpanded ? (
                                <>
                                  <X className="w-3.5 h-3.5" />
                                  <span>Ocultar Player</span>
                                </>
                              ) : (
                                <>
                                  <Play className="w-3.5 h-3.5 fill-neutral-950 text-neutral-950" />
                                  <span>Assistir ao Filme</span>
                                </>
                              )}
                            </button>
                          </div>
                        </div>

                        {/* Player Embebido Integrado */}
                        {isExpanded && embed && (
                          <div className="space-y-2 pt-1 animate-fadeIn">
                            <div className="aspect-video w-full rounded-xl overflow-hidden bg-black border border-amber-500/40 shadow-2xl relative">
                              {embed.type === 'youtube' || embed.type === 'vimeo' || embed.type === 'archive' ? (
                                <iframe
                                  src={embed.embedUrl}
                                  title={`Filme: ${work.title}`}
                                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                  allowFullScreen
                                  className="w-full h-full border-0"
                                />
                              ) : (
                                <video
                                  controls
                                  playsInline
                                  preload="metadata"
                                  src={embed.embedUrl || work.videoUrl}
                                  className="w-full h-full object-contain bg-black"
                                >
                                  Seu navegador não suporta a tag de vídeo nativa.
                                </video>
                              )}
                            </div>

                            <div className="flex items-center justify-between text-[11px] font-mono text-neutral-400 px-1 pt-1">
                              <span className="flex items-center gap-1.5 text-neutral-300">
                                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                                <span>Player CINELAB Ativo</span>
                              </span>

                              <div className="flex items-center gap-3">
                                <button
                                  type="button"
                                  onClick={() => setCinemaFilm(work)}
                                  className="text-amber-400 hover:text-amber-300 flex items-center gap-1 cursor-pointer transition-colors"
                                >
                                  <Maximize2 className="w-3 h-3" />
                                  <span>Expandir Tela</span>
                                </button>

                                <a
                                  href={work.videoUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="hover:text-white flex items-center gap-1 transition-colors"
                                >
                                  <ExternalLink className="w-3 h-3" />
                                  <span>Abrir Original</span>
                                </a>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="flex items-center justify-between text-xs text-neutral-500 font-mono py-1">
                        <span className="flex items-center gap-1.5 text-[11px]">
                          <Film className="w-3.5 h-3.5 text-neutral-600" />
                          <span>Obra preservada em acervo cinematográfico</span>
                        </span>
                        {isAdmin && (
                          <button
                            type="button"
                            onClick={() => setIsEditorOpen(true)}
                            className="text-amber-400 hover:text-amber-300 text-[11px] flex items-center gap-1 cursor-pointer hover:underline"
                          >
                            <Edit3 className="w-3 h-3" />
                            <span>+ Inserir Link do Filme</span>
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Director's Personal Letter to Students */}
      <section className="py-16 bg-gradient-to-b from-transparent via-amber-950/10 to-transparent" id="boas-vindas">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-8">
          <div className="p-8 sm:p-10 rounded-3xl bg-neutral-900 border border-amber-500/30 shadow-2xl relative space-y-6">
            <div className="flex items-center justify-between gap-4 border-b border-neutral-800 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full overflow-hidden border border-amber-500 shrink-0 bg-neutral-800 flex items-center justify-center">
                  {photoUrlState && !imgLoadError ? (
                    <img
                      src={photoUrlState}
                      alt={directorName}
                      referrerPolicy="no-referrer"
                      onError={() => setImgLoadError(true)}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <Camera className="w-5 h-5 text-amber-400" />
                  )}
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white font-display">{messageTitle}</h3>
                  <p className="text-[11px] font-mono text-neutral-400">{directorName} • {cur.badgeDirector}</p>
                </div>
              </div>
              <HeartHandshake className="w-6 h-6 text-amber-500 shrink-0 hidden sm:block" />
            </div>

            {/* Video Player if configured */}
            {welcomeVideoUrl && embedInfo && (
              <div className="space-y-2">
                <div className="px-4 py-2 bg-neutral-950 rounded-xl border border-neutral-800 flex items-center justify-between flex-wrap gap-2 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                    <span className="text-neutral-400 font-mono">Vídeo de Apresentação:</span>
                    <span className="font-semibold text-white">{embedInfo.platformLabel}</span>
                  </div>
                  {embedInfo.externalWatchUrl && (
                    <a
                      href={embedInfo.externalWatchUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-amber-300 hover:text-amber-200 transition font-mono text-[11px] font-medium"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      Abrir em Nova Aba
                    </a>
                  )}
                </div>

                <div className="aspect-video rounded-2xl overflow-hidden bg-black border border-neutral-800 shadow-xl">
                  {embedInfo.type === 'youtube' || embedInfo.type === 'vimeo' || embedInfo.type === 'archive' ? (
                    <iframe
                      src={embedInfo.embedUrl}
                      title="Vídeo de Boas-Vindas"
                      className="w-full h-full border-0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      referrerPolicy="strict-origin-when-cross-origin"
                      allowFullScreen
                    />
                  ) : (
                    <video
                      key={welcomeVideoUrl}
                      src={embedInfo.embedUrl || welcomeVideoUrl}
                      controls
                      playsInline
                      preload="auto"
                      poster={settings?.welcomeVideoPoster || '/images/cinelab-cover.jpg'}
                      className="w-full h-full object-contain bg-black"
                    >
                      <source src={embedInfo.embedUrl || welcomeVideoUrl} type="video/mp4" />
                      Vídeo de Apresentação
                    </video>
                  )}
                </div>
              </div>
            )}

            <div className="space-y-4 text-xs sm:text-sm text-neutral-300 leading-relaxed font-sans">
              {messageText.split('\n\n').map((paragraph, idx) => (
                <p key={idx} className="first:font-medium first:text-amber-200/90">
                  {paragraph}
                </p>
              ))}
            </div>

            <div className="pt-4 border-t border-neutral-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="block text-sm font-bold font-display text-white">{directorName}</span>
                <span className="block text-xs font-mono text-amber-400/90">{directorRole}</span>
              </div>

              <button
                onClick={() => onNavigate('matricula')}
                className="px-6 py-3 bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold uppercase rounded-xl text-xs transition-all cursor-pointer flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 font-sans"
              >
                <span>{cur.enrollCtaBtn}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Modal Modo Cinema (Tela Cheia / Theater Mode) */}
      {cinemaFilm && (
        <div
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex flex-col items-center justify-center p-3 sm:p-6 animate-fadeIn"
          onClick={(e) => {
            if (e.target === e.currentTarget) setCinemaFilm(null);
          }}
        >
          <div className="w-full max-w-5xl bg-[#0e1014] border border-neutral-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[96vh]">
            {/* Header da Sala de Cinema */}
            <div className="flex items-center justify-between px-5 py-3.5 border-b border-neutral-800 bg-[#12141a]">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
                  <Film className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <h3 className="text-base font-bold text-white font-display flex items-center gap-2 truncate">
                    <span className="truncate">{cinemaFilm.title}</span>
                    <span className="px-2 py-0.5 rounded-full bg-neutral-800 text-amber-400 font-mono text-[10px] shrink-0 font-bold">
                      {cinemaFilm.year}
                    </span>
                  </h3>
                  <p className="text-xs text-neutral-400 font-mono truncate">
                    {cinemaFilm.role} • {cinemaFilm.type}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                {cinemaFilm.videoUrl && (
                  <a
                    href={cinemaFilm.videoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-300 hover:text-white text-xs font-mono flex items-center gap-1.5 transition-colors border border-neutral-700"
                    title="Abrir no YouTube / Vimeo"
                  >
                    <ExternalLink className="w-3.5 h-3.5 text-amber-400" />
                    <span className="hidden sm:inline">Abrir Original</span>
                  </a>
                )}
                <button
                  type="button"
                  onClick={() => setCinemaFilm(null)}
                  className="p-1.5 rounded-xl text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors cursor-pointer"
                  title="Fechar Modo Cinema (Esc)"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Tela de Projeção / Player de Cinema */}
            <div className="aspect-video w-full bg-black relative flex items-center justify-center">
              {(() => {
                const embed = cinemaFilm.videoUrl ? parseVideoEmbed(cinemaFilm.videoUrl) : null;
                if (embed && (embed.type === 'youtube' || embed.type === 'vimeo' || embed.type === 'archive')) {
                  const autoPlayUrl = embed.embedUrl.includes('?')
                    ? `${embed.embedUrl}&autoplay=1`
                    : `${embed.embedUrl}?autoplay=1`;
                  return (
                    <iframe
                      src={autoPlayUrl}
                      title={`Cinema: ${cinemaFilm.title}`}
                      className="w-full h-full border-0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                    />
                  );
                }
                return (
                  <video
                    controls
                    autoPlay
                    playsInline
                    preload="auto"
                    src={embed?.embedUrl || cinemaFilm.videoUrl}
                    className="w-full h-full object-contain bg-black"
                  >
                    Seu navegador não suporta a tag de vídeo nativa.
                  </video>
                );
              })()}
            </div>

            {/* Rodapé Informativo / Sinopse & Festivais */}
            {cinemaFilm.details && (
              <div className="px-5 py-3 border-t border-neutral-800 bg-[#0c0d10] text-xs text-neutral-300 font-sans overflow-y-auto max-h-32">
                <strong className="text-amber-400 block font-mono text-[11px] mb-1">
                  Sinopse, Premiações & Circuito de Festivais:
                </strong>
                <p className="leading-relaxed text-neutral-400">{cinemaFilm.details}</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Editor Modal for Director Tony de Luc */}
      <TonyDeLucEditorModal
        isOpen={isEditorOpen}
        onClose={() => setIsEditorOpen(false)}
        initialData={{
          tonyName: directorName,
          tonyRole: directorRole,
          tonyPhotoUrl: photoUrlState,
          tonyTagline: tagline,
          tonyBioShort: bioShort,
          tonyBioFull: bioFull,
          tonyFeitos: feitosList,
          tonyCurriculo: curriculoList,
          tonyFilmografia: filmografia,
          tonySocialInstagram: socialInstagram,
          tonySocialLinkedin: socialLinkedin,
          tonySocialYoutube: socialYoutube,
          welcomeVideoUrl,
          welcomeMessageTitle: messageTitle,
          welcomeMessageText: messageText,
        }}
        onSave={handleSaveProfileModal}
      />
    </div>
  );
};
