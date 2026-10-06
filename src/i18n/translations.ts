export type Language = 'pt' | 'en' | 'es' | 'fr';

export interface LanguageOption {
  code: Language;
  name: string;
  nativeName: string;
  flag: string;
}

export const LANGUAGES: LanguageOption[] = [
  { code: 'pt', name: 'Português', nativeName: 'Português (BR)', flag: '🇧🇷' },
  { code: 'en', name: 'Inglês', nativeName: 'English (US)', flag: '🇺🇸' },
  { code: 'es', name: 'Espanhol', nativeName: 'Español', flag: '🇪🇸' },
  { code: 'fr', name: 'Francês', nativeName: 'Français', flag: '🇫🇷' },
];

export interface Translations {
  [key: string]: {
    pt: string;
    en: string;
    es: string;
    fr: string;
  };
}

export const UI_TRANSLATIONS: Translations = {
  // Navigation
  'nav.home': {
    pt: 'Início',
    en: 'Home',
    es: 'Inicio',
    fr: 'Accueil',
  },
  'nav.course': {
    pt: 'O Curso',
    en: 'The Course',
    es: 'El Curso',
    fr: 'Le Cours',
  },
  'nav.methodology': {
    pt: 'Metodologia',
    en: 'Methodology',
    es: 'Metodología',
    fr: 'Méthodologie',
  },
  'nav.tony': {
    pt: 'Tony de Luc',
    en: 'Tony de Luc',
    es: 'Tony de Luc',
    fr: 'Tony de Luc',
  },
  'nav.apostilas': {
    pt: 'Apostilas',
    en: 'Handouts',
    es: 'Apostilas',
    fr: 'Fascicules',
  },
  'nav.videos': {
    pt: 'Vídeos',
    en: 'Videos',
    es: 'Videos',
    fr: 'Vidéos',
  },
  'nav.cinemateca': {
    pt: 'Cinemateca & Leituras',
    en: 'Film Library & Readings',
    es: 'Cinemateca y Lecturas',
    fr: 'Cinémathèque & Lectures',
  },
  'nav.evaluations': {
    pt: 'Avaliações',
    en: 'Evaluations',
    es: 'Evaluaciones',
    fr: 'Évaluations',
  },
  'nav.tutorIa': {
    pt: 'Tutor IA',
    en: 'AI Tutor',
    es: 'Tutor IA',
    fr: 'Tuteur IA',
  },
  'nav.certificate': {
    pt: 'Certificado',
    en: 'Certificate',
    es: 'Certificado',
    fr: 'Certificat',
  },
  'nav.validate': {
    pt: 'Validar',
    en: 'Validate',
    es: 'Validar',
    fr: 'Valider',
  },
  'nav.faq': {
    pt: 'FAQ',
    en: 'FAQ',
    es: 'Preguntas',
    fr: 'FAQ',
  },
  'nav.contact': {
    pt: 'Contato',
    en: 'Contact',
    es: 'Contacto',
    fr: 'Contact',
  },
  'nav.studentArea': {
    pt: 'Área do Aluno',
    en: 'Student Portal',
    es: 'Área del Alumno',
    fr: 'Espace Étudiant',
  },
  'nav.adminPanel': {
    pt: 'Painel Admin',
    en: 'Admin Panel',
    es: 'Panel Admin',
    fr: 'Panneau Admin',
  },
  'nav.logout': {
    pt: 'Sair da Conta',
    en: 'Sign Out',
    es: 'Cerrar Sesión',
    fr: 'Déconnexion',
  },
  'nav.login': {
    pt: 'Acesso do Aluno',
    en: 'Student Login',
    es: 'Acceso Alumno',
    fr: 'Connexion Étudiant',
  },
  'nav.language': {
    pt: 'Idioma',
    en: 'Language',
    es: 'Idioma',
    fr: 'Langue',
  },

  // Topbar
  'topbar.tagline': {
    pt: 'Formação Profissional em Cinema e Audiovisual • Duração 3 Meses',
    en: 'Professional Filmmaking and Audiovisual Training • 3 Months Duration',
    es: 'Formación Profesional en Cine y Audiovisual • Duración 3 Meses',
    fr: 'Formation Professionnelle en Cinéma et Audiovisuel • Durée 3 Mois',
  },

  // Apostilas
  'apostila.title': {
    pt: 'Material Didático & Apostilas Oficiais',
    en: 'Teaching Material & Official Handouts',
    es: 'Material Didáctico y Manuales Oficiales',
    fr: 'Matériel Pédagogique & Fascicules Officiels',
  },
  'apostila.subtitle': {
    pt: 'Leitura online e estudo exclusivo na plataforma CineLab. Guias teóricos, decupagens e exercícios práticos.',
    en: 'Exclusive online reading and study on CineLab. Technical guides, shot breakdowns, and practical exercises.',
    es: 'Lectura y estudio exclusivo en la plataforma CineLab. Guías técnicas, desglose de planos y ejercicios prácticos.',
    fr: 'Lecture et étude exclusives sur la plateforme CineLab. Guides techniques, découpages et exercices pratiques.',
  },
  'apostila.protectedNotice': {
    pt: 'Leitura Protegida na Plataforma (Download desativado por direitos autorais)',
    en: 'Protected Reading on Platform (Download disabled for copyright protection)',
    es: 'Lectura Protegida en Plataforma (Descarga desactivada por derechos de autor)',
    fr: 'Lecture Protégée sur la Plateforme (Téléchargement désactivé pour droits d\'auteur)',
  },
  'apostila.pages': {
    pt: 'páginas didáticas reais',
    en: 'actual pedagogical pages',
    es: 'páginas didácticas reales',
    fr: 'pages pédagogiques réelles',
  },
  'apostila.readerTab': {
    pt: 'Leitor da Apostila Oficial',
    en: 'Official Handout Reader',
    es: 'Lector del Manual Oficial',
    fr: 'Lecteur du Fascicule Officiel',
  },
  'apostila.topicsTab': {
    pt: 'Ementa & Conteúdo Traduzido',
    en: 'Syllabus & Translated Content',
    es: 'Temario y Contenido Traducido',
    fr: 'Programme & Contenu Traduit',
  },
  'apostila.openReader': {
    pt: 'Abrir Apostila para Estudo',
    en: 'Open Handout for Study',
    es: 'Abrir Manual para Estudiar',
    fr: 'Ouvrir le Fascicule pour Étudier',
  },
  'apostila.summaryTitle': {
    pt: 'RESUMO PEDAGÓGICO DA ETAPA:',
    en: 'PEDAGOGICAL SUMMARY OF THE STAGE:',
    es: 'RESUMEN PEDAGÓGICO DE LA ETAPA:',
    fr: 'RÉSUMÉ PÉDAGOGIQUE DE L\'ÉTAPE:',
  },
  'apostila.quizTitle': {
    pt: 'Questionário de Fixação da Apostila (Quiz)',
    en: 'Handout Review Quiz',
    es: 'Cuestionario de Fijación (Quiz)',
    fr: 'Quiz de Révision du Fascicule',
  },
  'apostila.quizPrompt': {
    pt: 'Responda as questões abaixo para consolidar seu aprendizado técnico desta apostila.',
    en: 'Answer the questions below to consolidate your technical understanding of this handout.',
    es: 'Responda las siguientes preguntas para consolidar su aprendizaje técnico de este manual.',
    fr: 'Répondez aux questions ci-dessous pour consolider votre apprentissage technique de ce fascicule.',
  },

  // Student Management & Grade Rule (> 6.0)
  'student.controlTitle': {
    pt: 'Controle de Alunos & Coordenação Pedagógica',
    en: 'Student Management & Pedagogical Coordination',
    es: 'Control de Alumnos y Coordinación Pedagógica',
    fr: 'Gestion des Étudiants & Coordination Pédagogique',
  },
  'student.matricula': {
    pt: 'Matrícula',
    en: 'Enrollment ID',
    es: 'Matrícula',
    fr: 'Numéro d\'Étudiant',
  },
  'student.name': {
    pt: 'Nome do Aluno',
    en: 'Student Name',
    es: 'Nombre del Alumno',
    fr: 'Nom de l\'Étudiant',
  },
  'student.paymentMethod': {
    pt: 'Forma de Pagamento',
    en: 'Payment Method',
    es: 'Forma de Pago',
    fr: 'Moyen de Paiement',
  },
  'student.difficulty': {
    pt: 'Maior Dificuldade do Aluno',
    en: 'Main Student Difficulty',
    es: 'Mayor Dificultad del Alumno',
    fr: 'Principale Difficulté de l\'Étudiant',
  },
  'student.averageGrade': {
    pt: 'Média do Aluno',
    en: 'Student Grade Average',
    es: 'Promedio del Alumno',
    fr: 'Moyenne de l\'Étudiant',
  },
  'student.gradeRule': {
    pt: 'A média deve ser SUPERIOR A 6.0 para aprovação',
    en: 'Grade average must be OVER 6.0 for approval',
    es: 'El promedio debe ser SUPERIOR A 6.0 para aprobación',
    fr: 'La moyenne doit être SUPÉRIEURE À 6.0 pour valider',
  },
  'student.statusApproved': {
    pt: 'Aprovado (Média > 6.0)',
    en: 'Approved (Average > 6.0)',
    es: 'Aprobado (Promedio > 6.0)',
    fr: 'Admis (Moyenne > 6.0)',
  },
  'student.statusAlert': {
    pt: 'Abaixo da Média (<= 6.0) • Alerta Pedagógico',
    en: 'Below Average (<= 6.0) • Academic Alert',
    es: 'Bajo Promedio (<= 6.0) • Alerta Pedagógica',
    fr: 'Sous la Moyenne (<= 6.0) • Alerte Pédagogique',
  },
  'student.pedagogicalNotes': {
    pt: 'Observações do Professor Tony de Luc',
    en: 'Professor Tony de Luc Notes',
    es: 'Observaciones del Profesor Tony de Luc',
    fr: 'Remarques du Professeur Tony de Luc',
  },

  // Common UI Actions
  'action.search': {
    pt: 'Buscar...',
    en: 'Search...',
    es: 'Buscar...',
    fr: 'Rechercher...',
  },
  'action.filter': {
    pt: 'Filtrar',
    en: 'Filter',
    es: 'Filtrar',
    fr: 'Filtrer',
  },
  'action.save': {
    pt: 'Salvar Alterações',
    en: 'Save Changes',
    es: 'Guardar Cambios',
    fr: 'Enregistrer les Modifications',
  },
  'action.close': {
    pt: 'Fechar',
    en: 'Close',
    es: 'Cerrar',
    fr: 'Fermer',
  },
  'action.edit': {
    pt: 'Editar',
    en: 'Edit',
    es: 'Editar',
    fr: 'Modifier',
  },
  'action.details': {
    pt: 'Ver Detalhes',
    en: 'View Details',
    es: 'Ver Detalles',
    fr: 'Voir Détails',
  },
  'action.previewStudent': {
    pt: 'Prévia como Aluno',
    en: 'Preview as Student',
    es: 'Vista previa de Alumno',
    fr: 'Aperçu comme Étudiant',
  },
  'action.allStudents': {
    pt: 'Todos os Alunos',
    en: 'All Students',
    es: 'Todos los Alumnos',
    fr: 'Tous les Étudiants',
  },
  'action.aboveAvg': {
    pt: 'Média Aprovada (> 6.0)',
    en: 'Passing (> 6.0)',
    es: 'Promedio Aprobado (> 6.0)',
    fr: 'Moyenne Validée (> 6.0)',
  },
  'action.belowAvg': {
    pt: 'Em Alerta (<= 6.0)',
    en: 'Academic Alert (<= 6.0)',
    es: 'En Alerta (<= 6.0)',
    fr: 'En Alerte (<= 6.0)',
  },

  // ==========================================
  // HOME - HERO SECTION
  // ==========================================
  'home.stageBadge': {
    pt: 'Plataforma Oficial EAD • Turma com Inscrições Abertas',
    en: 'Official Online Platform • Enrollment Open for New Cohort',
    es: 'Plataforma Oficial EAD • Inscripciones Abiertas para Nuevo Grupo',
    fr: 'Plateforme EAD Officielle • Inscriptions Ouvertes pour la Nouvelle Session',
  },
  'home.heroTitle1': {
    pt: 'COMECE SUA FORMAÇÃO EM',
    en: 'START YOUR TRAINING IN',
    es: 'COMIENZA TU FORMACIÓN EN',
    fr: 'DÉBUTEZ VOTRE FORMATION EN',
  },
  'home.heroTitle2': {
    pt: 'CINEMA E AUDIOVISUAL',
    en: 'FILMMAKING & CINEMA',
    es: 'CINE Y AUDIOVISUAL',
    fr: 'CINÉMA ET AUDIOVISUEL',
  },
  'home.heroSubtitle': {
    pt: 'O CINELAB é uma escola e laboratório criativo de formação cinematográfica. Um curso imersivo de 3 meses (90 dias) dividido em 10 etapas pedagógicas com masterclasses, apostilas técnicas exclusivas, pesquisas guiadas de filmes e livros, exercícios práticos, avaliações online e certificação profissional.',
    en: 'CINELAB is a creative school and film training laboratory. An immersive 3-month (90 days) course structured into 10 pedagogical stages featuring masterclasses, exclusive technical handouts, guided film and book research, practical exercises, online evaluations, and professional certification.',
    es: 'CINELAB es una escuela y laboratorio creativo de formación cinematográfica. Un curso inmersivo de 3 meses (90 días) estructurado en 10 etapas pedagógicas con clases magistrales, manuales técnicos exclusivos, investigación guiada de películas y libros, ejercicios prácticos, evaluaciones en línea y certificación profesional.',
    fr: 'CINELAB est une école et un laboratoire créatif de formation cinématographique. Un cours immersif de 3 mois (90 jours) structuré en 10 étapes pédagogiques avec masterclasses, fascicules techniques exclusifs, recherches guidées de films et d\'ouvrages, exercices pratiques, évaluations en ligne et certification professionnelle.',
  },
  'home.enrollBtn': {
    pt: 'FAÇA SUA MATRÍCULA',
    en: 'ENROLL NOW',
    es: 'INSCRÍBETE AHORA',
    fr: 'S\'INSCRIRE MAINTENANT',
  },
  'home.courseBtn': {
    pt: 'Conhecer o Curso em Detalhes',
    en: 'Explore Course Details',
    es: 'Conocer el Curso en Detalle',
    fr: 'Découvrir le Cours en Détail',
  },
  'home.metricDuration': {
    pt: '3 Meses',
    en: '3 Months',
    es: '3 Meses',
    fr: '3 Mois',
  },
  'home.metricDurationLabel': {
    pt: 'Duração Total do Curso',
    en: 'Total Course Duration',
    es: 'Duración Total del Curso',
    fr: 'Durée Totale du Cours',
  },
  'home.metricHandouts': {
    pt: '10 + 2',
    en: '10 + 2',
    es: '10 + 2',
    fr: '10 + 2',
  },
  'home.metricHandoutsLabel': {
    pt: 'Apostilas Didáticas',
    en: 'Pedagogical Handouts',
    es: 'Manuales Didácticos',
    fr: 'Fascicules Pédagogiques',
  },
  'home.metricSchedule': {
    pt: 'Dias Contados',
    en: 'Counted Days',
    es: 'Días Contados',
    fr: 'Jours Comptés',
  },
  'home.metricScheduleLabel': {
    pt: 'Cronograma Automático (90 Dias)',
    en: 'Automated Schedule (90 Days)',
    es: 'Cronograma Automático (90 Días)',
    fr: 'Calendrier Automatisé (90 Jours)',
  },
  'home.metricWorkload': {
    pt: '180 Horas',
    en: '180 Hours',
    es: '180 Horas',
    fr: '180 Heures',
  },
  'home.metricWorkloadLabel': {
    pt: 'Certificado Válido',
    en: 'Verified Certificate',
    es: 'Certificado Válido',
    fr: 'Certificat Vérifié',
  },

  // HOME - PRESENTATION SECTION
  'home.labBadge': {
    pt: 'Identidade & Metodologia',
    en: 'Identity & Methodology',
    es: 'Identidad y Metodología',
    fr: 'Identité & Méthodologie',
  },
  'home.labTitle': {
    pt: 'Um Laboratório Criativo e Técnico para Formação de Realizadores',
    en: 'A Creative and Technical Laboratory for Filmmakers',
    es: 'Un Laboratorio Creativo y Técnico para Formación de Realizadores',
    fr: 'Un Laboratoire Créatif et Technique pour Former des Réalisateurs',
  },
  'home.labP1': {
    pt: 'O CINELAB – Cinema & Audiovisual foi concebido para romper com as plataformas genéricas de videoaulas fragmentadas. Aqui, cada módulo é uma imersão profunda na linguagem, técnica e prática dos grandes cineastas.',
    en: 'CINELAB – Cinema & Audiovisual was conceived to break away from generic platforms with fragmented videos. Here, every module is a deep dive into the cinematic language, technique, and craft of world-class directors.',
    es: 'CINELAB – Cine y Audiovisual fue concebido para romper con las plataformas genéricas de video-clases fragmentadas. Aquí, cada módulo es una inmersión profunda en el lenguaje, técnica y oficio de los grandes cineastas.',
    fr: 'CINELAB – Cinéma & Audiovisuel a été conçu pour rompre avec les plateformes génériques de vidéos fragmentées. Ici, chaque module est une immersion profonde dans le langage, la technique et la pratique des grands cinéastes.',
  },
  'home.labP2': {
    pt: 'Nossa filosofia pedagógica se apoia na disciplina temporal: o cinema exige tempo de observação, análise de filmes clássicos e contemporâneos, leitura bibliográfica e experimentação. Por isso, os módulos são liberados com dias contados (de 7 a 10 dias por etapa ao longo de 90 dias), permitindo a assimilação real de cada conteúdo e a realização pontual das avaliações.',
    en: 'Our pedagogical philosophy relies on temporal discipline: filmmaking demands observation time, analysis of classical and contemporary cinema, bibliography reading, and experimentation. Hence, modules unlock with counted days (7 to 10 days per stage over 90 days), enabling genuine mastery of each subject and timely assessments.',
    es: 'Nuestra filosofía pedagógica se basa en la disciplina temporal: el cine exige tiempo de observación, análisis de obras maestras, lectura bibliográfica y experimentación. Por ello, los módulos se habilitan con días contados (de 7 a 10 días por etapa a lo largo de 90 días), garantizando una asimilación real y evaluaciones puntuales.',
    fr: 'Notre philosophie pédagogique repose sur la discipline temporelle : le cinéma exige du temps d\'observation, l\'analyse de chefs-d\'œuvre classiques et contemporains, des lectures et de l\'expérimentation. Les modules sont donc débloqués avec des jours comptés (de 7 à 10 jours par étape sur 90 jours) pour assurer une véritable assimilation et des évaluations opportunes.',
  },
  'home.labFeature1Title': {
    pt: 'Ambiente EAD 100% Integrado',
    en: '100% Integrated Online Learning Environment',
    es: 'Entorno EAD 100% Integrado',
    fr: 'Environnement EAD 100% Intégré',
  },
  'home.labFeature1Desc': {
    pt: 'Vídeos, apostilas didáticas, pesquisas guiadas, avaliações e emissão de notas dentro do mesmo portal.',
    en: 'Videos, pedagogical handouts, guided research, evaluations, and grading all within the same platform.',
    es: 'Videos, manuales didácticos, investigaciones guiadas, evaluaciones y calificaciones dentro del mismo portal.',
    fr: 'Vidéos, fascicules pédagogiques, recherches guidées, évaluations et notation au sein du même portail.',
  },
  'home.labFeature2Title': {
    pt: 'Rigor Técnico e Estético',
    en: 'Technical and Aesthetic Rigor',
    es: 'Rigor Técnico y Estético',
    fr: 'Rigueur Technique et Esthétique',
  },
  'home.labFeature2Desc': {
    pt: 'Abordagem profissional desde o roteiro e iluminação até a pós-produção e distribuição em festivais.',
    en: 'Professional approach from screenwriting and lighting to post-production and festival distribution.',
    es: 'Enfoque profesional desde el guion e iluminación hasta la postproducción y distribución en festivales.',
    fr: 'Approche professionnelle du scénario et de l\'éclairage jusqu\'à la post-production et la diffusion en festival.',
  },
  'home.labSetTag': {
    pt: 'SET CINELAB',
    en: 'CINELAB SET',
    es: 'SET CINELAB',
    fr: 'PLATEAU CINELAB',
  },
  'home.labSetLens': {
    pt: 'Lente Anamórfica • 35mm Digital',
    en: 'Anamorphic Lens • 35mm Digital',
    es: 'Lente Anamórfica • 35mm Digital',
    fr: 'Objectif Anamorphique • 35mm Numérique',
  },
  'home.labSetTitle': {
    pt: 'Da Teoria Semiótica à Ordem do Dia no Set de Filmagem',
    en: 'From Semiotic Theory to Call Sheet on Film Sets',
    es: 'De la Teoría Semiótica a la Orden del Día en el Set',
    fr: 'De la Théorie Sémiotique à la Feuille de Service sur le Plateau',
  },
  'home.labSetDesc': {
    pt: 'Aprenda a liderar equipes, decupar cenas e criar imagens com identidade autoral marcante.',
    en: 'Learn to lead creative crews, break down scenes, and craft visuals with a bold auteur identity.',
    es: 'Aprende a liderar equipos, desglosar escenas y crear imágenes con una identidad autoral distintiva.',
    fr: 'Apprenez à diriger des équipes, découper les scènes et créer des images à forte identité d\'auteur.',
  },

  // HOME - CURRICULAR PILLARS
  'home.pillarsBadge': {
    pt: 'Matriz Curricular',
    en: 'Curriculum Matrix',
    es: 'Malla Curricular',
    fr: 'Programme Pédagogique',
  },
  'home.pillarsTitle': {
    pt: 'O Que Você Aprenderá no CINELAB',
    en: 'What You Will Master at CINELAB',
    es: 'Lo Que Aprenderás en CINELAB',
    fr: 'Ce Que Vous Apprendrez à CINELAB',
  },
  'home.pillarsSubtitle': {
    pt: 'Uma grade técnica e artística completa, estruturada para formar realizadores capazes de criar projetos do zero até a tela grande.',
    en: 'A complete technical and artistic curriculum, engineered to train filmmakers capable of taking projects from blank page to big screen.',
    es: 'Una estructura técnica y artística completa, diseñada para formar directores capaces de llevar proyectos desde cero hasta la gran pantalla.',
    fr: 'Un programme technique et artistique complet, conçu pour former des réalisateurs capables de mener des projets de la page blanche au grand écran.',
  },
  'home.pillar1Title': {
    pt: 'Linguagem & Enquadramento',
    en: 'Cinematic Language & Framing',
    es: 'Lenguaje y Encuadre',
    fr: 'Langage & Cadrage Cinématographique',
  },
  'home.pillar1Desc': {
    pt: 'Gramática visual dos planos, movimentos de câmera, eixos espaciais e psicologia ótica.',
    en: 'Visual grammar of shots, camera movement, spatial axes, and optical psychology.',
    es: 'Gramática visual de planos, movimientos de cámara, ejes espaciales y psicología óptica.',
    fr: 'Grammaire visuelle des plans, mouvements de caméra, axes spatiaux et psychologie optique.',
  },
  'home.pillar2Title': {
    pt: 'Roteiro & Dramaturgia',
    en: 'Screenwriting & Dramaturgy',
    es: 'Guion y Dramaturgia',
    fr: 'Scénario & Dramaturgie',
  },
  'home.pillar2Desc': {
    pt: 'Paradigma de 3 atos, formatação Master Scenes, subtexto em diálogos e conflito dramático.',
    en: '3-act paradigm, industry Master Scenes formatting, subtext in dialogue, and dramatic conflict.',
    es: 'Paradigma de 3 actos, formato Master Scenes, subtexto en diálogos y conflicto dramático.',
    fr: 'Paradigme des 3 actes, format Master Scenes, sous-texte des dialogues et conflit dramatique.',
  },
  'home.pillar3Title': {
    pt: 'Direção & Decupagem',
    en: 'Directing & Shot Breakdown',
    es: 'Dirección y Desglose',
    fr: 'Réalisation & Découpage Technique',
  },
  'home.pillar3Desc': {
    pt: 'Mise-en-scène, direção de elenco, storyboard, planta baixa e liderança no set.',
    en: 'Mise-en-scène, directing actors, storyboarding, floor plans, and on-set leadership.',
    es: 'Puesta en escena, dirección de actores, guion gráfico, planos de planta y liderazgo en set.',
    fr: 'Mise en scène, direction d\'acteurs, storyboard, plan au sol et leadership sur le plateau.',
  },
  'home.pillar4Title': {
    pt: 'Fotografia & Iluminação',
    en: 'Cinematography & Lighting',
    es: 'Fotografía e Iluminación',
    fr: 'Image & Éclairage',
  },
  'home.pillar4Desc': {
    pt: 'Luz natural e artificial, chiaroscuro, sensores, lentes, codecs RAW/Log e esquemas de luz.',
    en: 'Natural and artificial lighting, chiaroscuro, camera sensors, lenses, RAW/Log codecs, and 3-point setups.',
    es: 'Luz natural y artificial, claroscuro, sensores, lentes, códecs RAW/Log y esquemas de iluminación.',
    fr: 'Lumière naturelle et artificielle, clair-obscur, capteurs, optiques, codecs RAW/Log et plans d\'éclairage.',
  },
  'home.pillar5Title': {
    pt: 'Som Direto & Foley',
    en: 'Production Sound & Foley',
    es: 'Sonido Directo y Foley',
    fr: 'Prise de Son & Foley',
  },
  'home.pillar5Desc': {
    pt: 'Microfonia de set, lapelas, captação limpa de diálogos, room tone e mixagem.',
    en: 'Boom and lavalier techniques, pristine dialogue recording, room tone, sound design, and mixing.',
    es: 'Microfonía de set, micrófonos de solapa, captura limpia de diálogos, room tone y mezcla sonora.',
    fr: 'Techniques de perche et micros cravates, prise de son des dialogues, room tone et mixage.',
  },
  'home.pillar6Title': {
    pt: 'Montagem & Color Grading',
    en: 'Editing & Color Grading',
    es: 'Montaje y Corrección de Color',
    fr: 'Montage & Étalonnage',
  },
  'home.pillar6Desc': {
    pt: 'Teoria da montagem, ritmo, elipses narrativas e gradação de cores em DaVinci Resolve.',
    en: 'Editing theories, pacing, narrative ellipses, and professional color grading in DaVinci Resolve.',
    es: 'Teoría del montaje, ritmo, elipsis narrativas y gradación de color en DaVinci Resolve.',
    fr: 'Théorie du montage, rythme, ellipses narratives et étalonnage des couleurs sous DaVinci Resolve.',
  },

  // HOME - SCHEDULE SECTION
  'home.scheduleBadge': {
    pt: 'Metodologia de Imersão • 90 Dias',
    en: 'Immersion Methodology • 90 Days',
    es: 'Metodología de Inmersión • 90 Días',
    fr: 'Méthodologie d\'Immersion • 90 Jours',
  },
  'home.scheduleTitle': {
    pt: 'Como Funciona a Liberação dos Módulos por Dias Contados',
    en: 'How the Counted-Day Module Release Works',
    es: 'Cómo Funciona la Liberación de Módulos por Días Contados',
    fr: 'Comment Fonctionne la Libération des Modules par Jours Comptés',
  },
  'home.scheduleRuleBadge': {
    pt: 'REGRA FUNDAMENTAL DO CINELAB:',
    en: 'FUNDAMENTAL RULE OF CINELAB:',
    es: 'REGLA FUNDAMENTAL DE CINELAB:',
    fr: 'RÈGLE FONDAMENTALE DE CINELAB :',
  },
  'home.scheduleRuleText': {
    pt: 'Os módulos possuem dias contados calibrados por densidade pedagógica (de 7 a 10 dias por etapa, totalizando 90 dias). Mesmo que você termine a apostila antes do prazo, o sistema NÃO permitirá o acesso à próxima etapa antes da data programada. O calendário é soberano.',
    en: 'Modules have counted days calibrated by pedagogical density (7 to 10 days per stage, totaling 90 days). Even if you finish reading early, the system will NOT unlock the next stage before the scheduled date. The calendar is sovereign.',
    es: 'Los módulos tienen días contados calibrados por densidad pedagógica (7 a 10 días por etapa, sumando 90 días). Aunque termines el manual antes del plazo, el sistema NO permitirá el acceso a la siguiente etapa antes de la fecha programada. El calendario es soberano.',
    fr: 'Les modules sont rythmés par des jours comptés calibrés selon la densité pédagogique (7 à 10 jours par étape, soit 90 jours au total). Même si vous finissez plus tôt, le système NE permettra PAS d\'accéder à l\'étape suivante avant la date prévue. Le calendrier est souverain.',
  },
  'home.scheduleIntro': {
    pt: 'Esse intervalo com dias contados não é um impedimento, mas uma ferramenta pedagógica ativa para estudo aprofundado e resolução das avaliações online. Durante cada etapa formativa você deve:',
    en: 'This counted-day interval is not an obstacle, but an active pedagogical tool for in-depth study and online evaluations. During each learning stage you must:',
    es: 'Este intervalo de días contados no es un impedimento, sino una herramienta pedagógica activa para el estudio profundo y las evaluaciones online. Durante cada etapa debes:',
    fr: 'Cet intervalle à jours comptés n\'est pas un frein, mais un outil pédagogique actif pour l\'étude approfondie et les évaluations en ligne. Durant chaque étape, vous devez :',
  },
  'home.scheduleTask1': {
    pt: 'Assistir à Masterclass em vídeo da etapa;',
    en: 'Watch the video masterclass for the stage;',
    es: 'Ver la clase magistral en video de la etapa;',
    fr: 'Visionner la masterclass vidéo de l\'étape ;',
  },
  'home.scheduleTask2': {
    pt: 'Ler detalhadamente a apostila técnica correspondente;',
    en: 'Thoroughly read the corresponding technical handout;',
    es: 'Leer detalladamente el manual técnico correspondiente;',
    fr: 'Étudier en détail le fascicule technique correspondant ;',
  },
  'home.scheduleTask3': {
    pt: 'Assistir aos filmes sugeridos na Cinemateca decupando as cenas;',
    en: 'Watch recommended films in the Cinemateca while analyzing scenes;',
    es: 'Ver las películas recomendadas en la Cinemateca analizando planos;',
    fr: 'Regarder les films recommandés dans la Cinémathèque en analysant le découpage ;',
  },
  'home.scheduleTask4': {
    pt: 'Pesquisar a bibliografia indicada e materiais complementares;',
    en: 'Study recommended literature and supplementary materials;',
    es: 'Investigar la bibliografía recomendada y materiales complementarios;',
    fr: 'Consulter la bibliographie conseillée et la documentation complémentaire ;',
  },
  'home.scheduleTask5': {
    pt: 'Realizar os exercícios práticos e resolver a avaliação nos dias contados da reta final.',
    en: 'Complete practical exercises and take the online evaluation during the final counted days.',
    es: 'Realizar los ejercicios prácticos y responder la evaluación en los días contados del tramo final.',
    fr: 'Réaliser les exercices pratiques et passer l\'évaluation durant les jours comptés de la phase finale.',
  },
  'home.scheduleCycleHeader': {
    pt: 'Ciclo de uma Etapa (7 a 10 Dias)',
    en: 'Stage Cycle (7 to 10 Days)',
    es: 'Ciclo de una Etapa (7 a 10 Días)',
    fr: 'Cycle d\'une Étape (7 à 10 Jours)',
  },
  'home.scheduleCycleSub': {
    pt: 'Dias Contados por Módulo',
    en: 'Counted Days per Module',
    es: 'Días Contados por Módulo',
    fr: 'Jours Comptés par Module',
  },
  'home.scheduleDay1Title': {
    pt: 'Abertura da Etapa & Conteúdos',
    en: 'Stage Opening & Materials Unlocked',
    es: 'Apertura de la Etapa y Contenidos',
    fr: 'Ouverture de l\'Étape & Contenus',
  },
  'home.scheduleDay1Desc': {
    pt: 'A Masterclass em vídeo da etapa e a Apostila didática oficial são desbloqueadas na Área do Aluno com início do cronômetro da etapa.',
    en: 'Exclusive stage video masterclass and official didactic handout unlock in the Student Portal as the stage countdown begins.',
    es: 'La Masterclass en video y el manual didáctico oficial se desbloquean en el Área del Alumno al iniciar el cronómetro de la etapa.',
    fr: 'La Masterclass vidéo et le fascicule officiel sont débloqués dans l\'Espace Étudiant avec lancement du chronomètre de l\'étape.',
  },
  'home.scheduleDay210Title': {
    pt: 'Estudo Técnico, Cinemateca e Exercícios',
    en: 'Technical Study, Film Analysis & Practice',
    es: 'Estudio Técnico, Cinemateca y Práctica',
    fr: 'Étude Technique, Cinémathèque et Pratique',
  },
  'home.scheduleDay210Desc': {
    pt: 'Período imersivo para dissecar as obras na Cinemateca indicada, leitura da apostila técnica, estudo das referências e execução prática dos exercícios.',
    en: 'Immersive period to dissect films in the Cinemateca, read the technical handout, study book references, and execute hands-on exercises.',
    es: 'Período inmersivo para analizar obras en la Cinemateca recomendada, lectura del manual, estudio de referencias y ejercicios prácticos.',
    fr: 'Période immersive pour analyser les œuvres dans la Cinémathèque, lire le fascicule, étudier les références et pratiquer sur le terrain.',
  },
  'home.scheduleDay11Title': {
    pt: 'Liberação da Avaliação Online',
    en: 'Online Evaluation Release',
    es: 'Liberación de la Evaluación Online',
    fr: 'Ouverture de l\'Évaluation en Ligne',
  },
  'home.scheduleDay11Desc': {
    pt: 'Liberada com dias contados: desbloqueia automaticamente de 2 a 3 dias antes do fim da respectiva etapa para resolução no sistema.',
    en: 'Unlocked with counted days: opens automatically 2 to 3 days before the end of the respective stage for online completion.',
    es: 'Disponible con días contados: se habilita automáticamente de 2 a 3 días antes del final de la etapa para su resolución online.',
    fr: 'Débloquée avec des jours comptés : accessible automatiquement 2 à 3 jours avant la fin de l\'étape pour validation en ligne.',
  },
  'home.scheduleDay15Title': {
    pt: 'Conclusão e Próximo Módulo',
    en: 'Stage Completion & Next Module',
    es: 'Conclusión y Siguiente Módulo',
    fr: 'Clôture et Module Suivant',
  },
  'home.scheduleDay15Desc': {
    pt: 'Ao vencer o período estipulado de dias contados (7 a 10 dias calibrados), a etapa se conclui e o próximo módulo é desbloqueado no cronograma geral de 90 dias.',
    en: 'Upon completing the exact allotted period (7 to 10 calibrated days), the stage closes and the next module unlocks in the 90-day master schedule.',
    es: 'Al cumplir los días exactos estipulados (7 a 10 días calibrados), concluye la etapa y se desbloquea el siguiente módulo en el calendario de 90 días.',
    fr: 'Au terme des jours impartis (7 à 10 jours calibrés), l\'étape s\'achève et le module suivant se déverrouille dans le planning de 90 jours.',
  },

  // HOME - HANDOUTS OVERVIEW
  'home.handoutsBadge': {
    pt: 'Material Didático',
    en: 'Teaching Material',
    es: 'Material Didáctico',
    fr: 'Matériel Didactique',
  },
  'home.handoutsTitle': {
    pt: 'Estrutura das 10 Apostilas + 3 Bônus',
    en: 'Structure of the 10 Handouts + 3 Bonuses',
    es: 'Estructura de los 10 Manuales + 3 Bonos',
    fr: 'Structure des 10 Fascicules + 3 Bonus',
  },
  'home.handoutsSubtitle': {
    pt: 'Materiais técnicos completos em PDF para leitura protegida, diagramas de iluminação, decupagens reais e referências teóricas.',
    en: 'Comprehensive technical materials for protected online reading, lighting diagrams, real breakdowns, and theoretical references.',
    es: 'Materiales técnicos completos para lectura protegida, diagramas de iluminación, desgloses reales y referencias teóricas.',
    fr: 'Matériaux techniques complets en lecture protégée, diagrammes d\'éclairage, découpages réels et références théoriques.',
  },
  'home.handoutsBtn': {
    pt: 'Ver Grade Completa das Apostilas',
    en: 'View Full Handout Syllabus',
    es: 'Ver Temario Completo de Manuales',
    fr: 'Voir le Programme Complet des Fascicules',
  },
  'home.bonusBadge': {
    pt: 'CONTEÚDO ESPECIAL INCLUSO',
    en: 'SPECIAL CONTENT INCLUDED',
    es: 'CONTENIDO ESPECIAL INCLUIDO',
    fr: 'CONTENU SPÉCIAL INCLUS',
  },
  'home.bonusTitle': {
    pt: '3 Apostilas Bônus Exclusivas',
    en: '3 Exclusive Bonus Handouts',
    es: '3 Manuales Bono Exclusivos',
    fr: '3 Fascicules Bonus Exclusifs',
  },
  'home.bonusSubtitle': {
    pt: 'Bônus 01: Glossário Completo de Planos (30 págs) • Bônus 02: Glossário Completo de Roteiro (29 págs) • Bônus 03: Análise Fílmica em 6 Camadas (27 págs).',
    en: 'Bonus 01: Complete Shot Glossary (30 pages) • Bonus 02: Complete Screenwriting Glossary (29 pages) • Bonus 03: 6-Layer Film Analysis (27 pages).',
    es: 'Bono 01: Glosario Completo de Planos (30 págs) • Bono 02: Glosario Completo de Guion (29 págs) • Bono 03: Análisis Fílmico en 6 Capas (27 págs).',
    fr: 'Bonus 01 : Glossaire Complet des Plans (30 pages) • Bonus 02 : Glossaire Complet du Scénario (29 pages) • Bonus 03 : Analyse Filmique en 6 Couches (27 pages).',
  },
  'home.bonusBtn': {
    pt: 'Garantir Minha Vaga com Bônus',
    en: 'Secure My Spot with Bonuses',
    es: 'Asegurar Mi Cupo con Bonos',
    fr: 'Réserver Ma Place avec les Bonus',
  },

  // HOME - AUDIENCE
  'home.audienceBadge': {
    pt: 'Público-Alvo',
    en: 'Target Audience',
    es: 'Público Objetivo',
    fr: 'Public Cible',
  },
  'home.audienceTitle': {
    pt: 'Para Quem é a Formação CINELAB?',
    en: 'Who is CINELAB Designed For?',
    es: '¿Para Quién es la Formación CINELAB?',
    fr: 'À Qui S\'adresse la Formation CINELAB ?',
  },
  'home.audienceSubtitle': {
    pt: 'Projetado tanto para quem está começando do zero com paixão pelo cinema, quanto para profissionais que desejam aprofundar seu conhecimento autoral.',
    en: 'Engineered for newcomers starting with a passion for cinema as well as media professionals seeking deeper auteur mastery.',
    es: 'Diseñado tanto para principiantes apasionados por el cine como para profesionales que buscan profundizar su lenguaje de autor.',
    fr: 'Conçu aussi bien pour les débutants passionnés que pour les professionnels souhaitant approfondir leur vision d\'auteur.',
  },
  'home.aud1Title': {
    pt: 'Aspirantes a Cineastas e Diretores',
    en: 'Aspiring Filmmakers & Directors',
    es: 'Aspirantes a Cineastas y Directores',
    fr: 'Cinéastes et Réalisateurs en Devenir',
  },
  'home.aud1Desc': {
    pt: 'Quem deseja conceber, planejar e dirigir seus próprios curtas, longas, documentários ou séries com domínio técnico.',
    en: 'Those who want to conceive, plan, and direct their own shorts, features, documentaries, or series with technical command.',
    es: 'Quienes desean concebir, planificar y dirigir sus propios cortometrajes, largometrajes, documentales o series con maestría técnica.',
    fr: 'Ceux qui souhaitent concevoir, planifier et réaliser leurs courts, longs-métrages, documentaires ou séries avec maîtrise.',
  },
  'home.aud2Title': {
    pt: 'Roteiristas e Contadores de Histórias',
    en: 'Screenwriters & Storytellers',
    es: 'Guionistas y Narradores',
    fr: 'Scénaristes & Conteurs d\'Histoires',
  },
  'home.aud2Desc': {
    pt: 'Criativos que querem transformar ideias em roteiros profissionais formatados prontos para produtoras e editais.',
    en: 'Creatives ready to transform raw ideas into industry-standard scripts prepared for producers and production funds.',
    es: 'Creativos que desean transformar ideas en guiones profesionales listos para productoras y convocatorias públicas.',
    fr: 'Créatifs souhaitant transformer leurs idées en scénarios professionnels prêts pour les producteurs et commissions.',
  },
  'home.aud3Title': {
    pt: 'Profissionais de Fotografia e Vídeo',
    en: 'Cinematographers & Videomakers',
    es: 'Fotógrafos y Realizadores Audiovisuales',
    fr: 'Cadreurs & Vidéastes',
  },
  'home.aud3Desc': {
    pt: 'Videomakers, operadores de câmera e fotógrafos que desejam elevar a estética de seus trabalhos ao padrão cinematográfico.',
    en: 'Videomakers, camera operators, and photographers wanting to elevate their visual aesthetics to cinematic standards.',
    es: 'Videógrafos y fotógrafos que desean elevar la estética visual de sus trabajos al estándar cinematográfico.',
    fr: 'Vidéastes, cadreurs et photographes désirant élever l\'esthétique de leurs images aux standards du cinéma.',
  },
  'home.aud4Title': {
    pt: 'Atores e Criadores Independentes',
    en: 'Actors & Independent Creators',
    es: 'Actores y Creadores Independientes',
    fr: 'Acteurs & Créateurs Indépendants',
  },
  'home.aud4Desc': {
    pt: 'Profissionais que buscam entender os bastidores, a decupagem do diretor e a mecânica completa de uma produção de set.',
    en: 'Performers and creators seeking to grasp the director perspective, shot mechanics, and the full dynamics of film production sets.',
    es: 'Profesionales que buscan comprender el detrás de escena, la visión del director y la mecánica completa de un rodaje.',
    fr: 'Professionnels souhaitant comprendre les coulisses, le découpage du réalisateur et la mécanique d\'un tournage.',
  },

  // HOME - CERTIFICATE SECTION
  'home.certBadge': {
    pt: 'Certificação Profissional',
    en: 'Professional Certification',
    es: 'Certificación Profesional',
    fr: 'Certification Professionnelle',
  },
  'home.certTitle': {
    pt: 'Certificado de Conclusão CINELAB – 180 Horas',
    en: 'CINELAB Certificate of Completion – 180 Hours',
    es: 'Certificado de Finalización CINELAB – 180 Horas',
    fr: 'Certificat de Réussite CINELAB – 180 Heures',
  },
  'home.certSubtitle': {
    pt: 'Ao cumprir todas as etapas do cronograma, responder às avaliações com média superior a 6.0 e realizar os exercícios, você receberá o Certificado Oficial CINELAB – Cinema & Audiovisual.',
    en: 'Upon completing all stages, achieving an evaluation average above 6.0, and executing assignments, you will receive the Official CINELAB Certificate.',
    es: 'Al cumplir todas las etapas, aprobar las evaluaciones con promedio superior a 6.0 y realizar los ejercicios, recibirás el Certificado Oficial CINELAB.',
    fr: 'En validant toutes les étapes avec une moyenne supérieure à 6.0 et en réalisant les exercices, vous obtiendrez le Certificat Officiel CINELAB.',
  },
  'home.certItem1': {
    pt: 'Código único e intransferível de autenticidade (ex: CNL-CERT-8910-4821)',
    en: 'Unique, non-transferable authenticity verification code (e.g., CNL-CERT-8910-4821)',
    es: 'Código único e intransferible de autenticidad (ej: CNL-CERT-8910-4821)',
    fr: 'Code unique et infalsifiable d\'authenticité (ex : CNL-CERT-8910-4821)',
  },
  'home.certItem2': {
    pt: 'Página pública de validação para produtoras e editais verificarem sua autenticidade',
    en: 'Public validation page for production companies and film funds to verify authenticity',
    es: 'Página pública de validación para productoras y fondos de cine',
    fr: 'Page publique de validation pour les maisons de production et commissions culturelles',
  },
  'home.certItem3': {
    pt: 'Assinatura do Diretor Acadêmico e registro das 180 horas de carga formativa',
    en: 'Signature of Academic Director and registration of the 180 training hours',
    es: 'Firma del Director Académico y registro oficial de las 180 horas de formación',
    fr: 'Signature du Directeur Pédagogique et mention des 180 heures de formation',
  },
  'home.certBtn': {
    pt: 'Acessar Validador Público de Certificados',
    en: 'Access Public Certificate Validator',
    es: 'Acceder al Validador Público de Certificados',
    fr: 'Accéder au Validateur Public de Certificats',
  },

  // HOME - PRICING SECTION
  'home.pricingBadge': {
    pt: 'Matrícula Integrada',
    en: 'Integrated Enrollment',
    es: 'Matrícula Integrada',
    fr: 'Inscription Complète',
  },
  'home.pricingTitle': {
    pt: 'Invista na sua Carreira Cinematográfica',
    en: 'Invest in Your Filmmaking Career',
    es: 'Invierte en tu Carrera Cinematográfica',
    fr: 'Investissez dans Votre Carrière Cinématographique',
  },
  'home.pricingSubtitle': {
    pt: 'Acesso completo aos 3 meses de formação (90 dias), 10 apostilas didáticas, 3 apostilas bônus, masterclasses em vídeo, atividades, avaliações e certificado.',
    en: 'Full access to 3 months of immersive training (90 days), 10 pedagogical handouts, 3 bonus guides, video masterclasses, activities, evaluations, and certificate.',
    es: 'Acceso completo a 3 meses de formación (90 días), 10 manuales, 3 bonos, masterclasses en video, actividades, evaluaciones y certificado.',
    fr: 'Accès complet aux 3 mois de formation (90 jours), 10 fascicules, 3 bonus, masterclasses vidéo, exercices, évaluations et certificat.',
  },
  'home.pricingClassBadge': {
    pt: 'TURMA OFICIAL DE CINEMA',
    en: 'OFFICIAL FILM COHORT',
    es: 'PROMOCIÓN OFICIAL DE CINE',
    fr: 'SESSION OFFICIELLE DE CINÉMA',
  },
  'home.pricingFrom': {
    pt: 'De R$ 2.000,00 (Valor de Mercado)',
    en: 'From $2,000 (Market Value)',
    es: 'De 2.000,00 $ (Valor de Mercado)',
    fr: 'Au lieu de 2 000 € (Valeur Marchande)',
  },
  'home.pricingBy': {
    pt: 'POR APENAS',
    en: 'FOR ONLY',
    es: 'POR TAN SOLO',
    fr: 'POUR SEULEMENT',
  },
  'home.pricingCash': {
    pt: 'à vista',
    en: 'single payment',
    es: 'de contado',
    fr: 'au comptant',
  },
  'home.pricingInstallments': {
    pt: 'ou até 12x no cartão de crédito',
    en: 'or in up to 12 card installments',
    es: 'o hasta en 12 cuotas con tarjeta',
    fr: 'ou jusqu\'à 12 fois par carte',
  },
  'home.pricingPromoTag': {
    pt: 'Promoção por Tempo Limitado',
    en: 'Limited-Time Promotional Offer',
    es: 'Promoción por Tiempo Limitado',
    fr: 'Offre Promotionnelle Limitée',
  },
  'home.pricingBtn': {
    pt: 'FAÇA SUA MATRÍCULA AGORA',
    en: 'COMPLETE YOUR ENROLLMENT NOW',
    es: 'INSCRÍBETE AHORA MISMO',
    fr: 'FINALISER VOTRE INSCRIPTION',
  },
  'home.pricingPix': {
    pt: 'PIX Instantâneo',
    en: 'Instant Wire / PIX',
    es: 'Pago Instantáneo / Transferencia',
    fr: 'Paiement Immédiat / Virement',
  },
  'home.pricingCard': {
    pt: 'Até 12x no Cartão',
    en: 'Up to 12x Credit Card',
    es: 'Hasta 12 Cuotas con Tarjeta',
    fr: 'Jusqu\'à 12x par Carte Bancaire',
  },
  'home.pricingItem1': {
    pt: '3 meses de formação intensiva (10 etapas pedagógicas)',
    en: '3 months of intensive training (10 pedagogical stages)',
    es: '3 meses de formación intensiva (10 etapas pedagógicas)',
    fr: '3 mois de formation intensive (10 étapes pédagogiques)',
  },
  'home.pricingItem2': {
    pt: '10 Apostilas completas para leitura online + 3 Bônus',
    en: '10 Full digital handouts for online reading + 3 Bonuses',
    es: '10 Manuales completos para lectura online + 3 Bonos',
    fr: '10 Fascicules numériques complets en ligne + 3 Bonus',
  },
  'home.pricingItem3': {
    pt: 'Masterclasses em vídeo gravadas pelo professor',
    en: 'Exclusive video masterclasses taught by the filmmaker',
    es: 'Masterclasses en video grabadas por el director',
    fr: 'Masterclasses vidéo exclusives animées par le réalisateur',
  },
  'home.pricingItem4': {
    pt: 'Pesquisas de filmes, leituras de livros e exercícios',
    en: 'Curated film studies, critical book chapters, and exercises',
    es: 'Análisis de películas, lecturas críticas y ejercicios',
    fr: 'Analyses de films, lectures critiques et exercices pratiques',
  },
  'home.pricingItem5': {
    pt: 'Sistema de avaliações online e cálculo automático de notas',
    en: 'Online evaluation system with automated grading',
    es: 'Sistema de evaluaciones online y cálculo automático de notas',
    fr: 'Système d\'évaluations en ligne avec notation automatisée',
  },
  'home.pricingItem6': {
    pt: 'Certificado profissional de 180h com código verificável',
    en: 'Professional 180-hour diploma with verifiable QR/code',
    es: 'Certificado profesional de 180h con código verificable',
    fr: 'Certificat professionnel de 180h avec code vérifiable',
  },

  // HOME - FAQ SECTION
  'home.faqBadge': {
    pt: 'Tire Suas Dúvidas',
    en: 'Got Questions?',
    es: 'Resuelve tus Dudas',
    fr: 'Des Questions ?',
  },
  'home.faqTitle': {
    pt: 'Perguntas Frequentes (FAQ)',
    en: 'Frequently Asked Questions (FAQ)',
    es: 'Preguntas Frecuentes (FAQ)',
    fr: 'Foire Aux Questions (FAQ)',
  },

  // HOME - BOTTOM CTA
  'home.ctaTitle': {
    pt: 'Pronto para Dirigir e Produzir suas Próprias Histórias?',
    en: 'Ready to Direct and Produce Your Own Stories?',
    es: '¿Listo para Dirigir y Producir tus Propias Historias?',
    fr: 'Prêt à Réaliser et Produire Vos Propres Histoires ?',
  },
  'home.ctaSubtitle': {
    pt: 'Matricule-se hoje no CINELAB e receba imediatamente o acesso à Área do Aluno com a liberação do Módulo 01.',
    en: 'Enroll today at CINELAB and receive immediate access to the Student Portal with Module 01 unlocked.',
    es: 'Inscríbete hoy en CINELAB y obtén acceso inmediato al Área del Alumno con la apertura del Módulo 01.',
    fr: 'Inscrivez-vous aujourd\'hui à CINELAB et accédez instantanément à l\'Espace Étudiant avec le Module 01 activé.',
  },
  'home.ctaBtn': {
    pt: 'FAÇA SUA MATRÍCULA NO CINELAB',
    en: 'ENROLL AT CINELAB NOW',
    es: 'INSCRÍBETE EN CINELAB AHORA',
    fr: 'S\'INSCRIRE À CINELAB MAINTENANT',
  },

  // ==========================================
  // COURSE BANNER PROMO
  // ==========================================
  'banner.ribbonCourse': {
    pt: 'CURSO ONLINE CINELAB',
    en: 'CINELAB ONLINE COURSE',
    es: 'CURSO ONLINE CINELAB',
    fr: 'COURS EN LIGNE CINELAB',
  },
  'banner.ribbonDuration': {
    pt: '• 3 MESES DE FORMAÇÃO COMPLETA',
    en: '• 3 MONTHS OF COMPREHENSIVE TRAINING',
    es: '• 3 MESES DE FORMACIÓN COMPLETA',
    fr: '• 3 MOIS DE FORMATION COMPLÈTE',
  },
  'banner.ribbonModules': {
    pt: '• 10 ETAPAS + 3 BÔNUS',
    en: '• 10 STAGES + 3 BONUSES',
    es: '• 10 ETAPAS + 3 BONOS',
    fr: '• 10 ÉTAPES + 3 BONUS',
  },
  'banner.ribbonCert': {
    pt: '• CERTIFICADO 180H',
    en: '• 180H CERTIFICATE',
    es: '• CERTIFICADO 180H',
    fr: '• CERTIFICAT 180H',
  },
  'banner.ribbonOpen': {
    pt: 'VAGAS ABERTAS',
    en: 'ENROLLMENT OPEN',
    es: 'CUPOS ABIERTOS',
    fr: 'INSCRIPTIONS OUVERTES',
  },
  'banner.tagline': {
    pt: 'A Formação Definitiva de Realização Audiovisual',
    en: 'The Definitive Film & Directing Academy',
    es: 'La Formación Definitiva en Realización Audiovisual',
    fr: 'La Formation Ultime de Réalisation Audiovisuelle',
  },
  'banner.headlineMain': {
    pt: 'CURSO DE CINEMA & AUDIOVISUAL',
    en: 'FILM & AUDIOVISUAL COURSE',
    es: 'CURSO DE CINE Y AUDIOVISUAL',
    fr: 'FORMATION CINÉMA & AUDIOVISUEL',
  },
  'banner.headlineSubtitle': {
    pt: 'DO PRIMEIRO CLIQUE À REALIZAÇÃO DO SEU CURTA-METRAGEM!',
    en: 'FROM FIRST FRAME TO DIRECTING YOUR SHORT FILM!',
    es: '¡DESDE EL PRIMER PLANO HASTA DIRIGIR TU CORTOMETRAJE!',
    fr: 'DU PREMIER PLAN JUSQU\'À LA RÉALISATION DE VOTRE COURT-MÉTRAGE !',
  },
  'banner.instructorRole': {
    pt: 'Com o Cineasta & Diretor',
    en: 'With Filmmaker & Director',
    es: 'Con el Cineasta y Director',
    fr: 'Avec le Cinéaste et Réalisateur',
  },
  'banner.instructorName': {
    pt: 'Professor Cineasta Tony de Luc',
    en: 'Professor Filmmaker Tony de Luc',
    es: 'Profesor Cineasta Tony de Luc',
    fr: 'Professeur Cinéaste Tony de Luc',
  },
  'banner.instructorDesc': {
    pt: 'Diretor premiado, pesquisador e docente de cinema. Mais de 20 anos de experiência em sets de filmagem, festivais e formação de novos realizadores.',
    en: 'Award-winning director, scholar, and cinema professor. Over 20 years on sets, international film festivals, and mentoring emerging filmmakers.',
    es: 'Director galardonado, investigador y docente de cine. Más de 20 años de experiencia en rodajes, festivales y formación de cineastas.',
    fr: 'Réalisateur primé, chercheur et professeur de cinéma. Plus de 20 ans d\'expérience sur les plateaux, en festivals et dans la formation.',
  },
  'banner.benefit1': {
    pt: 'Metodologia Intensiva de 3 Meses (90 Dias de Imersão Contínua)',
    en: '3-Month Intensive Methodology (90 Days Continuous Immersion)',
    es: 'Metodología Intensiva de 3 Meses (90 Días de Inmersión Continua)',
    fr: 'Méthodologie Intensive de 3 Mois (90 Jours d\'Immersion Continue)',
  },
  'banner.benefit2': {
    pt: '10 Apostilas Técnicas Completas + 3 Apostilas Bônus Especiais',
    en: '10 Comprehensive Technical Handouts + 3 Special Bonus Guides',
    es: '10 Manuales Técnicos Completos + 3 Manuales Bono Especiales',
    fr: '10 Fascicules Techniques Complets + 3 Fascicules Bonus Spéciaux',
  },
  'banner.benefit3': {
    pt: 'Masterclasses Exclusivas em Vídeo com o Professor Tony de Luc',
    en: 'Exclusive Video Masterclasses with Professor Tony de Luc',
    es: 'Masterclasses Exclusivas en Video con el Profesor Tony de Luc',
    fr: 'Masterclasses Vidéo Exclusives avec le Professeur Tony de Luc',
  },
  'banner.benefit4': {
    pt: 'Cinemateca com Filmes Selecionados, Livros e Pesquisas Guiadas',
    en: 'Curated Film Library, Textbooks, and Guided Research Modules',
    es: 'Cinemateca con Películas Seleccionadas, Libros e Investigaciones',
    fr: 'Cinémathèque avec Films Sélectionnés, Ouvrages et Recherches Guidées',
  },
  'banner.benefit5': {
    pt: 'Avaliações Online Progressivas e Certificado Válido de 180h',
    en: 'Progressive Online Evaluations and Verified 180h Certificate',
    es: 'Evaluaciones Online Progresivas y Certificado Oficial de 180h',
    fr: 'Évaluations en Ligne Progressives et Certificat Reconnu de 180h',
  },
  'banner.enrollNow': {
    pt: 'MATRICULAR-SE AGORA',
    en: 'ENROLL NOW',
    es: 'MATRICULARME AHORA',
    fr: 'S\'INSCRIRE MAINTENANT',
  },
  'banner.exploreSyllabus': {
    pt: 'Explorar Grade do Curso',
    en: 'Explore Course Syllabus',
    es: 'Explorar Temario del Curso',
    fr: 'Découvrir le Programme',
  },
  'banner.guarantee': {
    pt: 'Garantia Incondicional de 7 Dias • Acesso Imediato à Plataforma',
    en: '7-Day Unconditional Guarantee • Instant Platform Access',
    es: 'Garantía Incondicional de 7 Días • Acceso Inmediato a la Plataforma',
    fr: 'Garantie Inconditionnelle de 7 Jours • Accès Immédiat à la Plateforme',
  },

  // ==========================================
  // WELCOME MESSAGE SECTION
  // ==========================================
  'welcome.badge': {
    pt: 'MENSAGEM DO COORDENADOR PEDAGÓGICO',
    en: 'MESSAGE FROM THE ACADEMIC DIRECTOR',
    es: 'MENSAJE DEL COORDINADOR PEDAGÓGICO',
    fr: 'MESSAGE DU DIRECTEUR PÉDAGOGIQUE',
  },
  'welcome.title': {
    pt: 'Boas-Vindas aos Novos Alunos do CINELAB',
    en: 'Welcome to New CINELAB Filmmaking Students',
    es: 'Bienvenida a los Nuevos Alumnos de CINELAB',
    fr: 'Bienvenue aux Nouveaux Étudiants de CINELAB',
  },
  'welcome.subtitle': {
    pt: 'Uma mensagem especial do Professor Cineasta Tony de Luc para quem está iniciando a jornada',
    en: 'A special message from Professor Filmmaker Tony de Luc to everyone starting this journey',
    es: 'Un mensaje especial del Profesor Cineasta Tony de Luc para quienes inician el camino',
    fr: 'Un message spécial du Professeur Cinéaste Tony de Luc pour ceux qui débutent l\'aventure',
  },
  'welcome.videoTitle': {
    pt: 'VÍDEO DE APRESENTAÇÃO DO PROFESSOR TONY DE LUC',
    en: 'INTRODUCTORY VIDEO BY PROFESSOR TONY DE LUC',
    es: 'VIDEO DE PRESENTACIÓN DEL PROFESOR TONY DE LUC',
    fr: 'VIDÉO DE PRÉSENTATION DU PROFESSEUR TONY DE LUC',
  },
  'welcome.videoSubtitle': {
    pt: 'Como aproveitar ao máximo cada etapa da sua formação cinematográfica',
    en: 'How to make the absolute most of every stage in your film training',
    es: 'Cómo aprovechar al máximo cada etapa de tu formación cinematográfica',
    fr: 'Comment tirer le meilleur parti de chaque étape de votre formation cinématographique',
  },
  'welcome.directorRole': {
    pt: 'Diretor Geral & Coordenador Acadêmico do CINELAB',
    en: 'General Director & Academic Coordinator of CINELAB',
    es: 'Director General y Coordinador Académico de CINELAB',
    fr: 'Directeur Général et Coordinateur Pédagogique de CINELAB',
  },
  'welcome.btnStart': {
    pt: 'Iniciar Formação no CINELAB',
    en: 'Start Training at CINELAB',
    es: 'Comenzar Formación en CINELAB',
    fr: 'Démarrer la Formation à CINELAB',
  },
  'welcome.btnMethodology': {
    pt: 'Conhecer a Metodologia',
    en: 'Explore the Methodology',
    es: 'Conocer la Metodología',
    fr: 'Découvrir la Méthodologie',
  },

  // ==========================================
  // FOOTER
  // ==========================================
  'footer.about': {
    pt: 'Escola e laboratório de formação profissional em Cinema e Realização Audiovisual. Metodologia de imersão de 3 meses (90 dias), 10 apostilas didáticas com cronograma progressivo, masterclasses exclusivas, avaliações contínuas e certificação reconhecida pelo mercado.',
    en: 'School and creative lab for professional training in Cinema and Audiovisual Filmmaking. 3-month (90 days) immersion methodology, 10 pedagogical handouts with progressive timeline, exclusive masterclasses, continuous evaluations, and industry-recognized certification.',
    es: 'Escuela y laboratorio de formación profesional en Cine y Realización Audiovisual. Metodología de inmersión de 3 meses (90 días), 10 manuales con cronograma progresivo, masterclasses exclusivas, evaluaciones continuas y certificación reconocida.',
    fr: 'École et laboratoire de formation professionnelle au Cinéma et à la Réalisation Audiovisuelle. Méthodologie immersive de 3 mois (90 jours), 10 fascicules avec calendrier progressif, masterclasses exclusives, évaluations continues et certification reconnue.',
  },
  'footer.badge': {
    pt: 'Plataforma EAD Oficial',
    en: 'Official Online Platform',
    es: 'Plataforma EAD Oficial',
    fr: 'Plateforme EAD Officielle',
  },
  'footer.workload': {
    pt: '180h Carga Horária',
    en: '180h Workload',
    es: '180h Carga Horaria',
    fr: '180h Volume Horaire',
  },
  'footer.disclaimer': {
    pt: 'Regras pedagógicas validadas por cronograma • Certificação Profissional',
    en: 'Pedagogical rules verified by timeline • Professional Certification',
    es: 'Reglas pedagógicas validadas por cronograma • Certificación Profesional',
    fr: 'Règles pédagogiques validées par calendrier • Certification Professionnelle',
  },
  'footer.rights': {
    pt: 'Todos os direitos reservados.',
    en: 'All rights reserved.',
    es: 'Todos los derechos reservados.',
    fr: 'Tous droits réservés.',
  },
  'footer.quickLinks': {
    pt: 'Links Rápidos',
    en: 'Quick Links',
    es: 'Enlaces Rápidos',
    fr: 'Liens Rapides',
  },
  'footer.studentPortal': {
    pt: 'Portal do Aluno',
    en: 'Student Portal',
    es: 'Portal del Alumno',
    fr: 'Espace Étudiant',
  },
  'footer.contact': {
    pt: 'Atendimento & Suporte',
    en: 'Support & Inquiries',
    es: 'Atención y Soporte',
    fr: 'Assistance & Support',
  },

  // ==========================================
  // METHODOLOGY VIEW
  // ==========================================
  'methodology.badge': {
    pt: 'Metodologia Pedagógica',
    en: 'Pedagogical Methodology',
    es: 'Metodología Pedagógica',
    fr: 'Méthodologie Pédagogique',
  },
  'methodology.title': {
    pt: 'Cronograma de 3 Meses (90 Dias)',
    en: '3-Month (90 Days) Timeline',
    es: 'Cronograma de 3 Meses (90 Días)',
    fr: 'Calendrier de 3 Mois (90 Jours)',
  },
  'methodology.subtitle': {
    pt: 'Distribuição pedagógica calibrada pela densidade de cada conteúdo: introdução e etapas de roteiro, direção, luz, som, montagem e projeto final.',
    en: 'Pedagogical distribution calibrated by subject density: introduction, screenwriting, directing, lighting, sound, editing, and final project.',
    es: 'Distribución pedagógica calibrada según la densidad de cada materia: guion, dirección, luz, sonido, montaje y proyecto final.',
    fr: 'Répartition pédagogique calibrée selon la densité de chaque discipline : scénario, réalisation, lumière, son, montage et projet de fin d\'études.',
  },

  // ==========================================
  // CONTACT VIEW
  // ==========================================
  'contact.badge': {
    pt: 'Atendimento & Suporte',
    en: 'Inquiries & Support',
    es: 'Atención y Soporte',
    fr: 'Assistance & Contact',
  },
  'contact.title': {
    pt: 'Fale com o CINELAB',
    en: 'Get in Touch with CINELAB',
    es: 'Comunícate con CINELAB',
    fr: 'Contacter CINELAB',
  },
  'contact.subtitle': {
    pt: 'Entre em contato com a coordenação acadêmica do Professor Tony de Luc ou com o suporte da plataforma.',
    en: 'Contact Professor Tony de Luc academic office or our platform support team.',
    es: 'Comunícate con la coordinación académica del Profesor Tony de Luc o con soporte.',
    fr: 'Contactez la coordination académique du Professeur Tony de Luc ou le support.',
  },
  'contact.formName': {
    pt: 'Seu Nome Completo',
    en: 'Your Full Name',
    es: 'Tu Nombre Completo',
    fr: 'Votre Nom Complet',
  },
  'contact.formEmail': {
    pt: 'Seu E-mail',
    en: 'Your Email Address',
    es: 'Tu Correo Electrónico',
    fr: 'Votre Adresse Email',
  },
  'contact.formSubject': {
    pt: 'Assunto',
    en: 'Subject',
    es: 'Asunto',
    fr: 'Objet',
  },
  'contact.formMessage': {
    pt: 'Sua Mensagem',
    en: 'Your Message',
    es: 'Tu Mensaje',
    fr: 'Votre Message',
  },
  'contact.formSubmit': {
    pt: 'Enviar Mensagem',
    en: 'Send Message',
    es: 'Enviar Mensaje',
    fr: 'Envoyer le Message',
  },

  // ==========================================
  // ENROLLMENT VIEW
  // ==========================================
  'enroll.badge': {
    pt: 'Matrícula Oficial',
    en: 'Official Enrollment',
    es: 'Matrícula Oficial',
    fr: 'Inscription Officielle',
  },
  'enroll.title': {
    pt: 'Matrícula no Curso de Cinema & Audiovisual',
    en: 'Enroll in Film & Audiovisual Training',
    es: 'Matrícula en el Curso de Cine y Audiovisual',
    fr: 'Inscription à la Formation Cinéma & Audiovisuel',
  },
  'enroll.step1': {
    pt: '1. Dados Pessoais do Aluno',
    en: '1. Student Personal Information',
    es: '1. Datos Personales del Alumno',
    fr: '1. Informations Personnelles de l\'Étudiant',
  },
  'enroll.step2': {
    pt: '2. Forma de Pagamento',
    en: '2. Payment Method',
    es: '2. Forma de Pago',
    fr: '2. Mode de Paiement',
  },
  'enroll.pix': {
    pt: 'PIX Instantâneo',
    en: 'Instant Wire / PIX',
    es: 'PIX Instantáneo',
    fr: 'Virement / PIX Instantané',
  },
  'enroll.card': {
    pt: 'Cartão de Crédito',
    en: 'Credit Card',
    es: 'Tarjeta de Crédito',
    fr: 'Carte Bancaire',
  },
  'enroll.btnSubmit': {
    pt: 'CONFIRMAR MATRÍCULA E ATIVAR ACESSO',
    en: 'CONFIRM ENROLLMENT AND ACTIVATE ACCESS',
    es: 'CONFIRMAR MATRÍCULA Y ACTIVAR ACCESO',
    fr: 'CONFIRMER L\'INSCRIPTION ET ACTIVER L\'ACCÈS',
  },

  // ==========================================
  // AUTH & LOGIN MODAL
  // ==========================================
  'auth.titleLogin': {
    pt: 'Acesso à Plataforma EAD',
    en: 'E-Learning Platform Access',
    es: 'Acceso a la Plataforma Virtual',
    fr: 'Accès à la Plateforme EAD',
  },
  'auth.titleRegister': {
    pt: 'Cadastre-se no CINELAB',
    en: 'Register at CINELAB',
    es: 'Regístrate en CINELAB',
    fr: 'S\'inscrire sur CINELAB',
  },
  'auth.titleForgot': {
    pt: 'Recuperação de Senha',
    en: 'Password Recovery',
    es: 'Recuperación de Contraseña',
    fr: 'Récupération de Mot de Passe',
  },
  'auth.descLogin': {
    pt: 'Entre com seu e-mail e senha para acessar suas aulas',
    en: 'Sign in with your email and password to access your classes',
    es: 'Ingresa con tu correo y contraseña para acceder a tus clases',
    fr: 'Connectez-vous avec vos identifiants pour accéder à vos cours',
  },
  'auth.descRegister': {
    pt: 'Preencha seus dados para iniciar sua formação',
    en: 'Fill in your details to begin your filmmaking training',
    es: 'Completa tus datos para iniciar tu formación en cine',
    fr: 'Remplissez vos informations pour débuter votre formation',
  },
  'auth.descForgot': {
    pt: 'Enviaremos instruções seguras para seu e-mail',
    en: 'We will send secure instructions to your email address',
    es: 'Enviaremos instrucciones seguras a tu correo electrónico',
    fr: 'Nous enverrons des instructions sécurisées à votre adresse email',
  },
  'auth.quickAccess': {
    pt: 'Acesso Imediato (1 Clique):',
    en: 'Immediate Access (1 Click):',
    es: 'Acceso Inmediato (1 Clic):',
    fr: 'Accès Immédiat (1 Clic) :',
  },
  'auth.noPassword': {
    pt: 'Sem senha',
    en: 'No password',
    es: 'Sin contraseña',
    fr: 'Sans mot de passe',
  },
  'auth.quickAdminTitle': {
    pt: 'Admin • Prof. Tony de Luc',
    en: 'Admin • Prof. Tony de Luc',
    es: 'Admin • Prof. Tony de Luc',
    fr: 'Admin • Prof. Tony de Luc',
  },
  'auth.quickStudentTitle': {
    pt: 'Área do Aluno Demo',
    en: 'Demo Student Portal',
    es: 'Área del Alumno Demo',
    fr: 'Espace Étudiant Démo',
  },
  'auth.emailLabel': {
    pt: 'E-mail Cadastrado',
    en: 'Registered Email',
    es: 'Correo Registrado',
    fr: 'Email Enregistré',
  },
  'auth.passwordLabel': {
    pt: 'Senha',
    en: 'Password',
    es: 'Contraseña',
    fr: 'Mot de passe',
  },
  'auth.forgotPasswordLink': {
    pt: 'Esqueci minha senha',
    en: 'Forgot password?',
    es: '¿Olvidaste tu contraseña?',
    fr: 'Mot de passe oublié ?',
  },
  'auth.loginBtn': {
    pt: 'Entrar na Plataforma',
    en: 'Sign In to Platform',
    es: 'Ingresar a la Plataforma',
    fr: 'Accéder à la Plateforme',
  },
  'auth.loggingIn': {
    pt: 'Entrando...',
    en: 'Signing in...',
    es: 'Ingresando...',
    fr: 'Connexion...',
  },
  'auth.noAccountYet': {
    pt: 'Ainda não tem matrícula?',
    en: 'Not enrolled yet?',
    es: '¿Aún no tienes matrícula?',
    fr: 'Pas encore inscrit ?',
  },
  'auth.registerHere': {
    pt: 'Cadastre-se aqui',
    en: 'Register here',
    es: 'Regístrate aquí',
    fr: 'Inscrivez-vous ici',
  },
  'auth.fullNameLabel': {
    pt: 'Nome Completo',
    en: 'Full Name',
    es: 'Nombre Completo',
    fr: 'Nom Complet',
  },
  'auth.phoneLabel': {
    pt: 'Telefone / WhatsApp',
    en: 'Phone / WhatsApp',
    es: 'Teléfono / WhatsApp',
    fr: 'Téléphone / WhatsApp',
  },
  'auth.documentLabel': {
    pt: 'CPF / Documento Oficial',
    en: 'ID / Official Document',
    es: 'DNI / Documento Oficial',
    fr: 'Pièce d\'identité / Document',
  },
  'auth.createPasswordLabel': {
    pt: 'Criar Senha Segura',
    en: 'Create Secure Password',
    es: 'Crear Contraseña Segura',
    fr: 'Créer un Mot de Passe Sécurisé',
  },
  'auth.registerBtn': {
    pt: 'Concluir Cadastro',
    en: 'Complete Registration',
    es: 'Completar Registro',
    fr: 'Finaliser l\'Inscription',
  },
  'auth.creatingAccount': {
    pt: 'Criando conta...',
    en: 'Creating account...',
    es: 'Creando cuenta...',
    fr: 'Création du compte...',
  },
  'auth.alreadyHaveAccount': {
    pt: 'Já possui conta?',
    en: 'Already have an account?',
    es: '¿Ya tienes una cuenta?',
    fr: 'Vous avez déjà un compte ?',
  },
  'auth.loginHere': {
    pt: 'Faça login',
    en: 'Sign in',
    es: 'Inicia sesión',
    fr: 'Connectez-vous',
  },
  'auth.sendResetLink': {
    pt: 'Enviar Link de Redefinição',
    en: 'Send Reset Link',
    es: 'Enviar Enlace de Recuperación',
    fr: 'Envoyer le Lien de Réinitialisation',
  },
  'auth.backToLogin': {
    pt: 'Voltar para o login',
    en: 'Back to sign in',
    es: 'Volver al inicio de sesión',
    fr: 'Retour à la connexion',
  },

  // ==========================================
  // HEADER & NAVIGATION ADDITIONS
  // ==========================================
  'header.enrollmentLabel': {
    pt: 'Matrícula:',
    en: 'Enrollment:',
    es: 'Matrícula:',
    fr: 'Inscription :',
  },
  'header.activeStatus': {
    pt: 'Matrícula Ativa',
    en: 'Active Enrollment',
    es: 'Matrícula Activa',
    fr: 'Inscription Active',
  },
  'header.coordBadge': {
    pt: 'Coordenação',
    en: 'Coordination',
    es: 'Coordinación',
    fr: 'Direction',
  },
  'header.adminPanel': {
    pt: 'Painel Administrativo',
    en: 'Administrative Panel',
    es: 'Panel Administrativo',
    fr: 'Panneau d\'Administration',
  },
  'header.myArea': {
    pt: 'Minha Área (Painel do Aluno)',
    en: 'My Area (Student Portal)',
    es: 'Mi Área (Portal del Alumno)',
    fr: 'Mon Espace (Espace Étudiant)',
  },
  'header.myGrades': {
    pt: 'Minhas Notas & Avaliações',
    en: 'My Grades & Evaluations',
    es: 'Mis Notas y Evaluaciones',
    fr: 'Mes Notes & Évaluations',
  },
  'header.myCert': {
    pt: 'Meu Certificado',
    en: 'My Certificate',
    es: 'Mi Certificado',
    fr: 'Mon Certificat',
  },
  'header.logout': {
    pt: 'Encerrar Sessão',
    en: 'Sign Out',
    es: 'Cerrar Sesión',
    fr: 'Se Déconnecter',
  },
  'header.teacherArea': {
    pt: 'Área do Professor',
    en: 'Instructor Portal',
    es: 'Área del Profesor',
    fr: 'Espace Professeur',
  },
  'header.login': {
    pt: 'Entrar',
    en: 'Sign In',
    es: 'Entrar',
    fr: 'Connexion',
  },
  'header.enrollNow': {
    pt: 'Quero me matricular',
    en: 'Enroll Now',
    es: 'Quiero matricularme',
    fr: 'Je m\'inscris',
  },
  'header.teacherAreaFull': {
    pt: 'Área do Professor Tony de Luc (Admin)',
    en: 'Professor Tony de Luc Portal (Admin)',
    es: 'Área del Profesor Tony de Luc (Admin)',
    fr: 'Espace Professeur Tony de Luc (Admin)',
  },
  'header.alreadyStudent': {
    pt: 'Já sou Aluno (Fazer Login)',
    en: 'Already a Student (Sign In)',
    es: 'Ya soy Alumno (Iniciar Sesión)',
    fr: 'Déjà Étudiant (Connexion)',
  },
  'header.langSelection': {
    pt: 'Idioma / Language:',
    en: 'Language / Idioma:',
    es: 'Idioma / Language:',
    fr: 'Langue / Language :',
  },

  // ==========================================
  // STUDENT AREA VIEW
  // ==========================================
  'studentArea.portalBadge': {
    pt: 'Portal Oficial do Aluno',
    en: 'Official Student Portal',
    es: 'Portal Oficial del Alumno',
    fr: 'Portail Officiel Étudiant',
  },
  'studentArea.greeting': {
    pt: 'Olá,',
    en: 'Hello,',
    es: '¡Hola,',
    fr: 'Bonjour,',
  },
  'studentArea.welcome': {
    pt: 'Bem-vindo ao',
    en: 'Welcome to',
    es: 'Bienvenido a',
    fr: 'Bienvenue sur',
  },
  'studentArea.enrollmentTag': {
    pt: 'MATRÍCULA:',
    en: 'ENROLLMENT:',
    es: 'MATRÍCULA:',
    fr: 'INSCRIPTION :',
  },
  'studentArea.statusTag': {
    pt: 'STATUS:',
    en: 'STATUS:',
    es: 'ESTADO:',
    fr: 'STATUT :',
  },
  'studentArea.statusActive': {
    pt: 'ATIVA',
    en: 'ACTIVE',
    es: 'ACTIVA',
    fr: 'ACTIF',
  },
  'studentArea.progressLabel': {
    pt: 'Progresso na Formação Cinematográfica:',
    en: 'Filmmaking Training Progress:',
    es: 'Progreso en la Formación Cinematográfica:',
    fr: 'Progression de la Formation Cinéma :',
  },
  'studentArea.modulesCount': {
    pt: 'módulos concluídos',
    en: 'modules completed',
    es: 'módulos completados',
    fr: 'modules terminés',
  },
  'studentArea.currentAverage': {
    pt: 'Média Atual:',
    en: 'Current GPA:',
    es: 'Promedio Actual:',
    fr: 'Moyenne Actuelle :',
  },
  'studentArea.currentModuleTitle': {
    pt: 'MÓDULO ATUAL VIGENTE:',
    en: 'CURRENT ACTIVE STAGE:',
    es: 'MÓDULO ACTUAL VIGENTE:',
    fr: 'MODULE ACTUELLEMENT ACTIF :',
  },
  'studentArea.stageInProgress': {
    pt: 'Etapa em andamento',
    en: 'Stage in progress',
    es: 'Etapa en progreso',
    fr: 'Étape en cours',
  },
  'studentArea.nextUnlockTitle': {
    pt: 'PRÓXIMA LIBERAÇÃO:',
    en: 'NEXT RELEASE:',
    es: 'PRÓXIMO DESBLOQUEO:',
    fr: 'PROCHAIN DÉBLOCAGE :',
  },
  'studentArea.unlockingModule': {
    pt: 'Desbloqueio do Módulo',
    en: 'Unlocking Module',
    es: 'Desbloqueo del Módulo',
    fr: 'Déblocage du Module',
  },
  'studentArea.stageEvalTitle': {
    pt: 'AVALIAÇÃO DA ETAPA:',
    en: 'STAGE EVALUATION:',
    es: 'EVALUACIÓN DE LA ETAPA:',
    fr: 'ÉVALUATION DE L\'ÉTAPE :',
  },
  'studentArea.evalNotice': {
    pt: '(Liberada na reta final da etapa)',
    en: '(Unlocked in final stretch of stage)',
    es: '(Habilitada en la recta final de la etapa)',
    fr: '(Débloquée dans la phase finale de l\'étape)',
  },
  'studentArea.timelineTitle': {
    pt: 'Linha do Tempo das 10 Etapas',
    en: '10-Stage Course Timeline',
    es: 'Línea de Tiempo de las 10 Etapas',
    fr: 'Chronologie des 10 Étapes',
  },
  'studentArea.timelineSubtitle': {
    pt: 'Acesso estritamente sincronizado ao calendário pedagógico de 3 meses (90 dias).',
    en: 'Access strictly synchronized with the pedagogical 3-month (90 days) calendar.',
    es: 'Acceso estrictamente sincronizado con el calendario pedagógico de 3 meses (90 días).',
    fr: 'Accès strictement synchronisé au calendrier pédagogique de 3 mois (90 jours).',
  },
  'studentArea.statusCompleted': {
    pt: 'Concluído',
    en: 'Completed',
    es: 'Completado',
    fr: 'Terminé',
  },
  'studentArea.statusAvailable': {
    pt: 'Liberado',
    en: 'Available',
    es: 'Disponible',
    fr: 'Débloqué',
  },
  'studentArea.statusLocked': {
    pt: 'Bloqueado',
    en: 'Locked',
    es: 'Bloqueado',
    fr: 'Verrouillé',
  },
  'studentArea.nowOpen': {
    pt: '🔓 Aberto agora',
    en: '🔓 Open now',
    es: '🔓 Abierto ahora',
    fr: '🔓 Ouvert',
  },
  'studentArea.shortcutsTitle': {
    pt: 'Acessos Rápidos da Formação',
    en: 'Training Quick Navigation',
    es: 'Accesos Rápidos de la Formación',
    fr: 'Accès Rapides de la Formation',
  },
  'studentArea.scApostilasTitle': {
    pt: 'Minhas Apostilas',
    en: 'My Handouts',
    es: 'Mis Manuales',
    fr: 'Mes Fascicules',
  },
  'studentArea.scApostilasDesc': {
    pt: 'Leitura online exclusiva das apostilas didáticas e quizzes de fixação liberados no cronograma.',
    en: 'Exclusive online reading of handouts and reinforcement quizzes scheduled by calendar.',
    es: 'Lectura online exclusiva de manuales y quizzes pedagógicos programados.',
    fr: 'Lecture en ligne exclusive des fascicules et quiz pédagogiques programmés.',
  },
  'studentArea.scFilmsTitle': {
    pt: 'Filmes & Leituras',
    en: 'Films & Readings',
    es: 'Películas y Lecturas',
    fr: 'Films & Lectures',
  },
  'studentArea.scFilmsDesc': {
    pt: 'Cinemateca de 10 filmes essenciais comentados e 10 leituras críticas obrigatórias.',
    en: 'Film library of 10 essential films with critical analysis and 10 required readings.',
    es: 'Cinemateca de 10 filmes esenciales comentados y 10 lecturas críticas obligatorias.',
    fr: 'Cinémathèque de 10 films essentiels commentés et 10 lectures critiques indispensables.',
  },
  'studentArea.scVideosTitle': {
    pt: 'Vídeos & Masterclasses',
    en: 'Videos & Masterclasses',
    es: 'Videos y Masterclasses',
    fr: 'Vidéos & Masterclasses',
  },
  'studentArea.scVideosDesc': {
    pt: 'Assista às aulas do Professor Cineasta Tony de Luc para cada módulo do cronograma.',
    en: 'Watch filmmaking lectures by Professor Tony de Luc for every scheduled module.',
    es: 'Mira las clases magistrales del Director Tony de Luc para cada módulo del curso.',
    fr: 'Visionnez les cours du Réalisateur Tony de Luc pour chaque étape du programme.',
  },
  'studentArea.scActivitiesTitle': {
    pt: 'Pesquisas & Atividades',
    en: 'Research & Set Exercises',
    es: 'Investigación y Prácticas',
    fr: 'Recherches & Pratiques',
  },
  'studentArea.scActivitiesDesc': {
    pt: 'Filmes recomendados, capítulos de livros para leitura e exercícios de set.',
    en: 'Recommended films, key book chapters, and on-set directing exercises.',
    es: 'Películas recomendadas, lecturas de libros y ejercicios prácticos de rodaje.',
    fr: 'Films recommandés, lectures choisies et exercices pratiques de tournage.',
  },
  'studentArea.scEvaluationsTitle': {
    pt: 'Avaliações do Módulo',
    en: 'Stage Evaluations',
    es: 'Evaluaciones del Módulo',
    fr: 'Évaluations des Étapes',
  },
  'studentArea.scEvaluationsDesc': {
    pt: 'Responda os questionários online liberados na reta final de cada etapa.',
    en: 'Answer online questionnaires released in the final days of each stage.',
    es: 'Responde los cuestionarios online liberados en la recta final de cada etapa.',
    fr: 'Répondez aux questionnaires en ligne débloqués en fin d\'étape.',
  },
  'studentArea.scGradesTitle': {
    pt: 'Painel de Notas',
    en: 'Grades Dashboard',
    es: 'Panel de Calificaciones',
    fr: 'Tableau des Notes',
  },
  'studentArea.scGradesDesc': {
    pt: 'Acompanhe seu desempenho acadêmico e feedbacks das questões discursivas.',
    en: 'Track your academic performance and teacher feedback on essay questions.',
    es: 'Sigue tu rendimiento académico y comentarios del profesor en las respuestas.',
    fr: 'Suivez vos performances académiques et les retours du corps enseignant.',
  },
  'studentArea.scCertTitle': {
    pt: 'Meu Certificado',
    en: 'My Certificate',
    es: 'Mi Certificado',
    fr: 'Mon Certificat',
  },
  'studentArea.scCertDesc': {
    pt: 'Verifique os critérios de emissão e acesse seu diploma oficial de 180 horas.',
    en: 'Review graduation requirements and access your official 180-hour diploma.',
    es: 'Verifica los criterios de graduación y accede a tu diploma oficial de 180 horas.',
    fr: 'Vérifiez les critères d\'obtention et accédez à votre diplôme officiel de 180 heures.',
  },
  'studentArea.bonusSectionTitle': {
    pt: 'Apostilas Bônus Exclusivas',
    en: 'Exclusive Bonus Handouts',
    es: 'Manuales Bonus Exclusivos',
    fr: 'Fascicules Bonus Exclusifs',
  },
  'studentArea.pagesCount': {
    pt: 'páginas',
    en: 'pages',
    es: 'páginas',
    fr: 'pages',
  },

  // ==========================================
  // EVALUATIONS VIEW
  // ==========================================
  'eval.badge': {
    pt: 'Avaliações Online de Cinema',
    en: 'Online Film Evaluations',
    es: 'Evaluaciones Online de Cine',
    fr: 'Évaluations Cinéma en Ligne',
  },
  'eval.title': {
    pt: 'Avaliações das Etapas',
    en: 'Stage Evaluations',
    es: 'Evaluaciones de las Etapas',
    fr: 'Évaluations des Étapes',
  },
  'eval.subtitle': {
    pt: 'Questionários avaliativos de cada uma das 10 etapas formativas com correção imediata das questões objetivas e feedback detalhado. Média mínima para certificação: 6.0.',
    en: 'Assessments for each of the 10 training stages with immediate objective scoring and detailed feedback. Minimum passing grade: 6.0.',
    es: 'Cuestionarios de evaluación para cada una de las 10 etapas con calificación inmediata y comentarios. Promedio mínimo: 6.0.',
    fr: 'Évaluations de chacune des 10 étapes avec notation objective immédiate et commentaires détaillés. Moyenne minimale : 6.0.',
  },
  'eval.loading': {
    pt: 'Carregando questionário avaliativo...',
    en: 'Loading evaluation questionnaire...',
    es: 'Cargando cuestionario evaluativo...',
    fr: 'Chargement du questionnaire d\'évaluation...',
  },
  'eval.lockedTitle': {
    pt: 'Avaliação Bloqueada pelo Calendário',
    en: 'Evaluation Locked by Schedule',
    es: 'Evaluación Bloqueada por Calendario',
    fr: 'Évaluation Bloquée par le Calendrier',
  },
  'eval.completedBadge': {
    pt: 'AVALIAÇÃO CONCLUÍDA',
    en: 'EVALUATION COMPLETED',
    es: 'EVALUACIÓN COMPLETADA',
    fr: 'ÉVALUATION TERMINÉE',
  },
  'eval.finalScore': {
    pt: 'Nota Final:',
    en: 'Final Score:',
    es: 'Nota Final:',
    fr: 'Note Finale :',
  },
  'eval.approved': {
    pt: 'APROVADO NA ETAPA',
    en: 'PASSED STAGE',
    es: 'APROBADO EN LA ETAPA',
    fr: 'VALIDÉ POUR CETTE ÉTAPE',
  },
  'eval.retake': {
    pt: 'EM RECUPERAÇÃO',
    en: 'NEEDS IMPROVEMENT',
    es: 'EN RECUPERACIÓN',
    fr: 'EN RATTRAPAGE',
  },
  'eval.submittedAt': {
    pt: 'Enviado em:',
    en: 'Submitted on:',
    es: 'Enviado el:',
    fr: 'Soumis le :',
  },
  'eval.teacherFeedback': {
    pt: 'Comentário da Coordenação Acadêmica:',
    en: 'Academic Coordination Feedback:',
    es: 'Comentario de la Coordinación Académica:',
    fr: 'Commentaire de la Direction Pédagogique :',
  },
  'eval.question': {
    pt: 'QUESTÃO',
    en: 'QUESTION',
    es: 'PREGUNTA',
    fr: 'QUESTION',
  },
  'eval.weight': {
    pt: 'Peso:',
    en: 'Weight:',
    es: 'Valor:',
    fr: 'Barème :',
  },
  'eval.discursivePlaceholder': {
    pt: 'Digite sua resposta técnica e reflexão cinematográfica...',
    en: 'Enter your technical response and filmmaking reflection...',
    es: 'Escribe tu respuesta técnica y análisis cinematográfico...',
    fr: 'Saisissez votre réponse technique et réflexion cinématographique...',
  },
  'eval.teacherGraded': {
    pt: 'Nota atribuída pelo professor:',
    en: 'Grade assigned by instructor:',
    es: 'Nota asignada por el profesor:',
    fr: 'Note attribuée par le professeur :',
  },
  'eval.underReview': {
    pt: 'Em análise pela coordenação',
    en: 'Under review by faculty',
    es: 'En revisión por la coordinación',
    fr: 'En cours d\'examen pédagogique',
  },
  'eval.answerKey': {
    pt: 'Gabarito Comentado:',
    en: 'Reviewed Answer Key:',
    es: 'Pauta de Respuestas Comentada:',
    fr: 'Corrigé Commenté :',
  },
  'eval.submitBtn': {
    pt: 'Enviar Avaliação e Calcular Nota',
    en: 'Submit Evaluation & Calculate Grade',
    es: 'Enviar Evaluación y Calcular Nota',
    fr: 'Soumettre l\'Évaluation & Calculer la Note',
  },
  'eval.submitting': {
    pt: 'Calculando Notas...',
    en: 'Calculating Grades...',
    es: 'Calculando Calificaciones...',
    fr: 'Calcul des notes en cours...',
  },
  'eval.guestTitle': {
    pt: 'Sistema de Avaliações CINELAB',
    en: 'CINELAB Evaluation System',
    es: 'Sistema de Evaluaciones CINELAB',
    fr: 'Système d\'Évaluation CINELAB',
  },
  'eval.guestDesc': {
    pt: 'As avaliações do curso são exclusivas para alunos matriculados e liberadas automaticamente na reta final de cada etapa do cronograma de 3 meses.',
    en: 'Course assessments are exclusive to enrolled students and automatically released in the final days of each 3-month schedule stage.',
    es: 'Las evaluaciones del curso son exclusivas para estudiantes inscritos y se abren automáticamente al final de cada etapa.',
    fr: 'Les évaluations du cours sont réservées aux étudiants inscrits et se débloquent automatiquement à la fin de chaque étape.',
  },
  'eval.guestEnrollBtn': {
    pt: 'Faça sua Matrícula no Curso',
    en: 'Enroll in the Filmmaking Course',
    es: 'Inscríbete en el Curso de Cine',
    fr: 'Inscrivez-vous à la Formation Cinéma',
  },

  // ==========================================
  // ACTIVITIES VIEW
  // ==========================================
  'act.badge': {
    pt: 'Pesquisas & Atividades por Etapa',
    en: 'Curated Research & Practical Tasks',
    es: 'Investigación y Prácticas',
    fr: 'Recherches & Activités Pratiques',
  },
  'act.title': {
    pt: 'Filmes, Livros & Práticas de Set',
    en: 'Films, Books & Directing Exercises',
    es: 'Películas, Libros y Prácticas de Rodaje',
    fr: 'Films, Livres & Exercices de Tournage',
  },
  'act.subtitle': {
    pt: 'O cinema exige disciplina e repertório. Conclua as filmografias indicadas, leituras recomendadas e exercícios práticos em cada etapa.',
    en: 'Filmmaking requires discipline and cultural background. Complete the curated films, critical readings, and on-set exercises.',
    es: 'El cine requiere disciplina y repertorio. Completa las filmografías sugeridas, lecturas y prácticas en cada etapa.',
    fr: 'Le cinéma exige rigueur et culture visuelle. Complétez les films recommandés, lectures critiques et exercices pratiques.',
  },
  'act.lockedTitle': {
    pt: 'Etapa Bloqueada pelo Calendário',
    en: 'Stage Locked by Pedagogical Schedule',
    es: 'Etapa Bloqueada por Calendario',
    fr: 'Étape Verrouillée par le Calendrier',
  },
  'act.lockedDesc': {
    pt: 'As atividades e filmes desta etapa só serão liberadas no início da respectiva etapa oficial do cronograma.',
    en: 'Activities and film study for this stage unlock when the official stage start date is reached.',
    es: 'Las actividades y películas de esta etapa se desbloquearán al iniciar la etapa oficial.',
    fr: 'Les activités et études de films se débloqueront au lancement officiel de cette étape.',
  },
  'act.loading': {
    pt: 'Carregando pesquisas do módulo...',
    en: 'Loading module research tasks...',
    es: 'Cargando investigaciones del módulo...',
    fr: 'Chargement des travaux de recherche...',
  },
  'act.stageActivitiesPrefix': {
    pt: 'ATIVIDADES DA ETAPA 0',
    en: 'STAGE 0',
    es: 'ACTIVIDADES DE LA ETAPA 0',
    fr: 'ACTIVITÉS DE L\'ÉTAPE 0',
  },
  'act.filmSuggested': {
    pt: 'FILME SUGERIDO',
    en: 'RECOMMENDED FILM',
    es: 'PELÍCULA SUGERIDA',
    fr: 'FILM CONSEILLÉ',
  },
  'act.bookReading': {
    pt: 'LEITURA INDICADA',
    en: 'ASSIGNED READING',
    es: 'LECTURA ASIGNADA',
    fr: 'LECTURE RECOMMANDÉE',
  },
  'act.setPractice': {
    pt: 'PRÁTICA DE SET',
    en: 'SET DIRECTING EXERCISE',
    es: 'PRÁCTICA DE RODAJE',
    fr: 'EXERCICE DE TOURNAGE',
  },
  'act.doneTag': {
    pt: '✓ REALIZADO',
    en: '✓ COMPLETED',
    es: '✓ COMPLETADO',
    fr: '✓ RÉALISÉ',
  },
  'act.unmarkBtn': {
    pt: 'Atividade Concluída (Desmarcar)',
    en: 'Activity Completed (Unmark)',
    es: 'Actividad Completada (Desmarcar)',
    fr: 'Activité Réalisée (Décocher)',
  },
  'act.markBtn': {
    pt: 'Marcar como Realizada',
    en: 'Mark as Completed',
    es: 'Marcar como Realizada',
    fr: 'Marquer comme Réalisée',
  },

  // ==========================================
  // GRADES VIEW
  // ==========================================
  'grades.badge': {
    pt: 'Histórico Acadêmico',
    en: 'Academic Record',
    es: 'Historial Académico',
    fr: 'Dossier Académique',
  },
  'grades.title': {
    pt: 'Painel de Notas & Desempenho',
    en: 'Grades & Academic Performance',
    es: 'Panel de Calificaciones y Rendimiento',
    fr: 'Tableau des Notes & Performance',
  },
  'grades.subtitle': {
    pt: 'Acompanhe suas notas em cada uma das avaliações das 10 etapas pedagógicas. A média mínima global necessária para emissão do certificado é 6.0.',
    en: 'Track your scores across each of the 10 pedagogical stage evaluations. Minimum cumulative GPA required for graduation is 6.0.',
    es: 'Revisa tus calificaciones en cada una de las 10 etapas pedagógicas. El promedio mínimo global para certificarse es 6.0.',
    fr: 'Consultez vos notes sur chacune des 10 étapes. La moyenne générale minimale requise pour l\'obtention du diplôme est de 6.0.',
  },
  'grades.statAverage': {
    pt: 'MÉDIA GERAL DO CURSO',
    en: 'CUMULATIVE COURSE GPA',
    es: 'PROMEDIO GENERAL DEL CURSO',
    fr: 'MOYENNE GÉNÉRALE DU COURS',
  },
  'grades.statMinPassing': {
    pt: 'Mínimo para Certificado: 6.0',
    en: 'Minimum for Certificate: 6.0',
    es: 'Mínimo para Certificado: 6.0',
    fr: 'Minimum pour Diplôme : 6.0',
  },
  'grades.statCompleted': {
    pt: 'AVALIAÇÕES CONCLUÍDAS',
    en: 'COMPLETED EVALUATIONS',
    es: 'EVALUACIONES COMPLETADAS',
    fr: 'ÉVALUATIONS COMPLÉTÉES',
  },
  'grades.statOfTen': {
    pt: 'das 10 etapas oficiais',
    en: 'out of 10 official stages',
    es: 'de las 10 etapas oficiales',
    fr: 'sur les 10 étapes officielles',
  },
  'grades.statStatus': {
    pt: 'STATUS DE APROVAÇÃO',
    en: 'ACADEMIC STATUS',
    es: 'ESTADO ACADÉMICO',
    fr: 'STATUT ACADÉMIQUE',
  },
  'grades.statusEligible': {
    pt: 'Apto para Certificado',
    en: 'Eligible for Diploma',
    es: 'Apto para Certificado',
    fr: 'Éligible au Diplôme',
  },
  'grades.statusWarning': {
    pt: 'Média insuficiente',
    en: 'Grade below 6.0',
    es: 'Promedio insuficiente',
    fr: 'Moyenne insuffisante',
  },
  'grades.thStage': {
    pt: 'Etapa / Módulo',
    en: 'Stage / Module',
    es: 'Etapa / Módulo',
    fr: 'Étape / Module',
  },
  'grades.thDate': {
    pt: 'Data de Envio',
    en: 'Submission Date',
    es: 'Fecha de Envío',
    fr: 'Date de Soumission',
  },
  'grades.thScore': {
    pt: 'Nota Obtida',
    en: 'Score',
    es: 'Calificación',
    fr: 'Note Obtenue',
  },
  'grades.thStatus': {
    pt: 'Status',
    en: 'Status',
    es: 'Estado',
    fr: 'Statut',
  },
  'grades.thActions': {
    pt: 'Ações',
    en: 'Actions',
    es: 'Acciones',
    fr: 'Actions',
  },
  'grades.viewFeedback': {
    pt: 'Ver Avaliação & Feedback',
    en: 'View Evaluation & Feedback',
    es: 'Ver Evaluación y Comentarios',
    fr: 'Voir Évaluation & Retours',
  },
  'grades.takeEval': {
    pt: 'Fazer Avaliação',
    en: 'Take Evaluation',
    es: 'Hacer Evaluación',
    fr: 'Passer l\'Évaluation',
  },
  'grades.notTaken': {
    pt: 'Ainda não realizada',
    en: 'Not taken yet',
    es: 'Aún no realizada',
    fr: 'Pas encore passée',
  },
  'grades.retake': {
    pt: 'Em recuperação',
    en: 'Needs improvement',
    es: 'En recuperación',
    fr: 'En rattrapage',
  },
  'grades.approved': {
    pt: 'Aprovado',
    en: 'Approved',
    es: 'Aprobado',
    fr: 'Validé',
  },
  'grades.guestTitle': {
    pt: 'Painel de Notas do Aluno',
    en: 'Student Grades Dashboard',
    es: 'Panel de Calificaciones del Alumno',
    fr: 'Tableau des Notes Étudiant',
  },
  'grades.guestDesc': {
    pt: 'Acesse com seu e-mail e senha para consultar seu histórico acadêmico no CINELAB.',
    en: 'Sign in with your email and password to view your academic transcripts at CINELAB.',
    es: 'Accede con tu correo y contraseña para consultar tu historial académico en CINELAB.',
    fr: 'Connectez-vous pour consulter votre relevé de notes au sein du CINELAB.',
  },
  'grades.guestBtn': {
    pt: 'Fazer Matrícula',
    en: 'Enroll Now',
    es: 'Inscribirse Ahora',
    fr: 'S\'inscrire',
  },

  // ==========================================
  // BONUS APOSTILA EDIT MODAL
  // ==========================================
  'bonusModal.titlePrefix': {
    pt: 'Editar Apostila Bônus 0',
    en: 'Edit Bonus Handout 0',
    es: 'Editar Manual Bonus 0',
    fr: 'Modifier le Fascicule Bonus 0',
  },
  'bonusModal.tagline': {
    pt: 'Material permanente de consulta para alunos e cineastas',
    en: 'Permanent reference material for students and filmmakers',
    es: 'Material permanente de consulta para alumnos y cineastas',
    fr: 'Document de référence permanent pour étudiants et cinéastes',
  },
  'bonusModal.fullTitleLabel': {
    pt: 'Título Completo da Apostila Bônus',
    en: 'Full Title of Bonus Handout',
    es: 'Título Completo del Manual Bonus',
    fr: 'Titre Complet du Fascicule Bonus',
  },
  'bonusModal.subtitleLabel': {
    pt: 'Subtítulo / Especialidade',
    en: 'Subtitle / Specialty Focus',
    es: 'Subtítulo / Especialidad',
    fr: 'Sous-titre / Domaine d\'Expertise',
  },
  'bonusModal.subtitlePlaceholder': {
    pt: 'Ex: Guia Permanente de Consulta Técnica e Decupagem',
    en: 'e.g.: Permanent Technical Guide to Shot Breakdown & Lighting',
    es: 'Ej: Guía Permanente de Consulta Técnica y Decupaje',
    fr: 'Ex : Guide Technique Permanent de Découpage et Éclairage',
  },
  'bonusModal.descLabel': {
    pt: 'Descrição / Finalidade Didática',
    en: 'Description / Pedagogical Objective',
    es: 'Descripción / Propósito Pedagógico',
    fr: 'Description / Objectif Pédagogique',
  },
  'bonusModal.pagesLabel': {
    pt: 'Número de Páginas do PDF:',
    en: 'PDF Page Count:',
    es: 'Número de Páginas del PDF:',
    fr: 'Nombre de Pages du PDF :',
  },
  'bonusModal.pagesBadge': {
    pt: 'Exibição nos Cards',
    en: 'Card Display',
    es: 'Visualización en Tarjetas',
    fr: 'Affichage Cartes',
  },
  'bonusModal.pagesNotice': {
    pt: 'Calculado automaticamente ao subir o arquivo PDF via leitor óptico.',
    en: 'Automatically computed from the uploaded PDF document header.',
    es: 'Calculado automáticamente al subir el archivo PDF por lector óptico.',
    fr: 'Calculé automatiquement dès l\'importation du fichier PDF.',
  },
  'bonusModal.fileSizeLabel': {
    pt: 'Tamanho do Arquivo (MB)',
    en: 'File Size (MB)',
    es: 'Tamaño del Archivo (MB)',
    fr: 'Taille du Fichier (Mo)',
  },
  'bonusModal.autoLabel': {
    pt: 'Automático',
    en: 'Automatic',
    es: 'Automático',
    fr: 'Automatique',
  },
  'bonusModal.pdfFileLabel': {
    pt: 'Arquivo PDF da Apostila Bônus:',
    en: 'Bonus Handout PDF File:',
    es: 'Archivo PDF del Manual Bonus:',
    fr: 'Fichier PDF du Fascicule Bonus :',
  },
  'bonusModal.openCurrentPdf': {
    pt: 'Abrir PDF Atual',
    en: 'Open Current PDF',
    es: 'Abrir PDF Actual',
    fr: 'Ouvrir le PDF Actuel',
  },
  'bonusModal.dragDropNotice': {
    pt: 'Arraste o arquivo PDF ou clique para selecionar',
    en: 'Drag and drop PDF file or click to browse',
    es: 'Arrastra el archivo PDF o haz clic para seleccionar',
    fr: 'Glissez-déposez le fichier PDF ou cliquez pour sélectionner',
  },
  'bonusModal.headerNotice': {
    pt: 'O número real de páginas é detectado automaticamente do cabeçalho do PDF.',
    en: 'Actual page count is automatically detected from the PDF header.',
    es: 'El número real de páginas se detecta automáticamente del encabezado PDF.',
    fr: 'Le nombre réel de pages est automatiquement extrait des métadonnées PDF.',
  },
  'bonusModal.directUrlLabel': {
    pt: 'Ou digite/confirme a URL direta do PDF:',
    en: 'Or specify/confirm direct PDF URL:',
    es: 'O escribe/confirma la URL directa del PDF:',
    fr: 'Ou saisissez/confirmez l\'URL directe du PDF :',
  },
  'bonusModal.cancelBtn': {
    pt: 'Cancelar',
    en: 'Cancel',
    es: 'Cancelar',
    fr: 'Annuler',
  },
  'bonusModal.saveBtn': {
    pt: 'Salvar Alterações',
    en: 'Save Changes',
    es: 'Guardar Cambios',
    fr: 'Enregistrer les Modifications',
  },
  'bonusModal.saving': {
    pt: 'Salvando...',
    en: 'Saving...',
    es: 'Guardando...',
    fr: 'Enregistrement...',
  },
};

// Complete module translations for all 10 modules in all 4 languages (PT, EN, ES, FR)
export const MODULE_TRANSLATIONS: Record<
  number,
  {
    title: { pt: string; en: string; es: string; fr: string };
    subtitle: { pt: string; en: string; es: string; fr: string };
    summary: { pt: string; en: string; es: string; fr: string };
    apostilaSummary: { pt: string; en: string; es: string; fr: string };
    keyThemes: { pt: string[]; en: string[]; es: string[]; fr: string[] };
  }
> = {
  1: {
    title: {
      pt: 'Módulo 01: Introdução ao Cinema e à Linguagem Audiovisual',
      en: 'Module 01: Introduction to Cinema & Audiovisual Language',
      es: 'Módulo 01: Introducción al Cine y Lenguaje Audiovisual',
      fr: 'Module 01: Introduction au Cinéma et au Langage Audiovisuel',
    },
    subtitle: {
      pt: 'Planos, enquadramentos, lentes e a gramática visual do cinema',
      en: 'Shots, framing, lenses and visual grammar of cinema',
      es: 'Planos, encuadres, lentes y la gramática visual del cine',
      fr: 'Plans, cadrages, objectifs et grammaire visuelle du cinéma',
    },
    summary: {
      pt: 'Domine os fundamentos ópticos e espaciais que transformam ideias em narrativa dramática na tela.',
      en: 'Master the optical and spatial fundamentals that transform ideas into dramatic storytelling on screen.',
      es: 'Domina los fundamentos ópticos y espaciales que transforman ideas en narrativa dramática en la pantalla.',
      fr: 'Maîtrisez les fondamentaux optiques et spatiaux qui transforment les idées en récit dramatique à l\'écran.',
    },
    apostilaSummary: {
      pt: 'Apostila técnica completa com 8 páginas detalhando a escala de planos (PG, PA, PM, PP, PD), campo e contracampo, regra dos 180 graus e ótica das lentes normais, grandes-angulares e teleobjetivas.',
      en: 'Complete technical handout with 8 pages detailing shot scale (ELS, LS, MS, CU, ECU), shot-reverse-shot, the 180-degree rule, and the optics of standard, wide-angle, and telephoto lenses.',
      es: 'Manual técnico completo con 8 páginas que detallan la escala de planos (Gran Plano General, Plano Medio, Primer Plano), campo y contra-campo, la regla de 180 grados y óptica de lentes.',
      fr: 'Fascicule technique complet de 8 pages détaillant l\'échelle des plans (PG, PA, PM, Gros Plan), champ/contrechamp, règle des 180 degrés et optique des objectifs grand-angle et téléobjectifs.',
    },
    keyThemes: {
      pt: ['Escala de Planos e Enquadramento', 'Regra dos 180 Graus e Eixo de Ação', 'Lentes e Profundidade de Campo', 'Movimentos de Câmera (Pan, Tilt, Travelling)'],
      en: ['Shot Scale and Framing', '180-Degree Rule and Action Axis', 'Lenses and Depth of Field', 'Camera Movement (Pan, Tilt, Tracking)'],
      es: ['Escala de Planos y Encuadre', 'Regla de 180 Grados y Eje de Acción', 'Lentes y Profundidad de Campo', 'Movimientos de Cámara (Pan, Tilt, Travelling)'],
      fr: ['Échelle des Plans et Cadrage', 'Règle des 180 Degrés et Axe d\'Action', 'Objectifs et Profondeur de Champ', 'Mouvements de Caméra (Pan, Tilt, Travelling)'],
    },
  },
  2: {
    title: {
      pt: 'Módulo 02: História do Cinema',
      en: 'Module 02: Film History',
      es: 'Módulo 02: Historia del Cine',
      fr: 'Module 02: Histoire du Cinéma',
    },
    subtitle: {
      pt: 'Do cinema silencioso e vanguardas europeias ao cinema clássico, moderno e brasileiro',
      en: 'From silent cinema and European avant-garde to classical, modern, and world cinema',
      es: 'Del cine mudo y las vanguardias europeas al cine clásico, moderno y latinoamericano',
      fr: 'Du cinéma muet et des avant-gardes européennes au cinéma classique, moderne et mondial',
    },
    summary: {
      pt: 'Explore a evolução tecnológica, estética e de linguagem da sétima arte e os grandes marcos do cinema mundial.',
      en: 'Explore the technological, aesthetic, and narrative evolution of filmmaking and cinema milestones.',
      es: 'Explora la evolución tecnológica, estética y narrativa del séptimo arte y los grandes hitos del cine.',
      fr: 'Explorez l\'évolution technologique, esthétique et narrative du septième art et les grands jalons du cinéma.',
    },
    apostilaSummary: {
      pt: 'Apostila completa de 52 páginas cobrindo a trajetória histórica da sétima arte: do cinema silencioso às vanguardas europeias, cinema clássico, movimentos modernos e cinematografia brasileira.',
      en: 'Complete 52-page handout covering the historical journey of cinema: from silent film to European avant-garde, classical Hollywood, modern movements, and Brazilian cinema.',
      es: 'Manual completo de 52 páginas sobre la trayectoria histórica del séptimo arte: del cine mudo a las vanguardias, cine clásico y movimientos modernos.',
      fr: 'Fascicule complet de 52 pages retraçant l\'histoire du cinéma : du muet aux avant-gardes européennes, au cinéma classique et aux mouvements modernes.',
    },
    keyThemes: {
      pt: ['Expressionismo Alemão e Sombras', 'Montagem Soviética e Colisão de Ideias', 'Neorrealismo Italiano', 'Nouvelle Vague e Cinema Moderno'],
      en: ['German Expressionism & Shadows', 'Soviet Montage & Colliding Ideas', 'Italian Neorealism', 'French New Wave & Modern Cinema'],
      es: ['Expresionismo Alemán y Sombras', 'Montaje Soviético y Colisión de Ideas', 'Neorrealismo Italiano', 'Nouvelle Vague y Cine Moderno'],
      fr: ['Expressionnisme Allemand & Ombres', 'Montage Soviétique & Collision d\'Idées', 'Néoréalisme Italien', 'Nouvelle Vague & Cinéma Moderne'],
    },
  },
  3: {
    title: {
      pt: 'Módulo 03: Roteiro e Estrutura Narrativa',
      en: 'Module 03: Screenwriting & Narrative Structure',
      es: 'Módulo 03: Guion y Estructura Narrativa',
      fr: 'Module 03: Scénario et Structure Narrative',
    },
    subtitle: {
      pt: 'Jornada dramática, arcos de personagem e formatação profissional',
      en: 'Dramatic journey, character arcs, and industry standard formatting',
      es: 'Viaje dramático, arcos de personaje y formato profesional',
      fr: 'Voyage dramatique, arcs de personnages et mise en page professionnelle',
    },
    summary: {
      pt: 'Construa histórias cativantes dominando o paradigma dos 3 atos, pontos de virada e a psicologia dos personagens.',
      en: 'Build captivating stories by mastering the 3-act paradigm, plot points, and character psychology.',
      es: 'Construye historias cautivadoras dominando el paradigma de 3 actos, puntos de giro y psicología de personajes.',
      fr: 'Bâtissez des histoires captivantes en maîtrisant le paradigme des 3 actes, les nœuds dramatiques et la psychologie des personnages.',
    },
    apostilaSummary: {
      pt: 'Apostila com 7 páginas apresentando a estrutura clássica em 3 atos de Syd Field, pontos de virada, conflito dramático, construção de bíblia de personagens e formatação Master Scenes.',
      en: '7-page handout presenting Syd Field classic 3-act structure, plot points, dramatic conflict, character bible construction, and Master Scenes formatting.',
      es: 'Manual de 7 páginas que presenta la estructura clásica en 3 actos, puntos de giro, conflicto dramático y formato profesional de guion.',
      fr: 'Fascicule de 7 pages présentant la structure classique en 3 actes, points de bascule, conflit dramatique et mise en page de scénario.',
    },
    keyThemes: {
      pt: ['Estrutura em 3 Atos e Plot Points', 'Arco de Transformação do Protagonista', 'Subtexto e Diálogos Vivos', 'Formatação Master Scenes Standard'],
      en: ['3-Act Structure and Plot Points', 'Protagonist Transformation Arc', 'Subtext and Dynamic Dialogue', 'Industry Master Scenes Formatting'],
      es: ['Estructura en 3 Actos y Puntos de Giro', 'Arco de Transformación del Protagonista', 'Subtexto y Diálogos Vivos', 'Formato Profesional de Guion'],
      fr: ['Structure en 3 Actes et Noeuds Dramatiques', 'Arc de Transformation du Protagoniste', 'Sous-texte et Dialogues Vivants', 'Formatage Professionnel Master Scenes'],
    },
  },
  4: {
    title: {
      pt: 'Módulo 04: Direção de Fotografia, Iluminação e Câmeras',
      en: 'Module 04: Cinematography, Lighting & Camera Optics',
      es: 'Módulo 04: Dirección de Fotografía, Iluminación y Cámaras',
      fr: 'Module 04: Direction de la Photographie, Éclairage et Caméras',
    },
    subtitle: {
      pt: 'A luz como dramaturgia, lentes, sensores, fotometria e esquemas de três pontos',
      en: 'Light as dramaturgy, lenses, sensors, exposure and three-point lighting setups',
      es: 'La luz como dramaturgia, lentes, sensores, fotometría y esquemas de tres puntos',
      fr: 'La lumière comme dramaturgie, optiques, capteurs et schéma d\'éclairage à trois points',
    },
    summary: {
      pt: 'Princípios ópticos, temperatura de cor, relação de contraste, chiaroscuro, codecs de gravação (RAW, Log) e escolha de equipamentos.',
      en: 'Optical principles, color temperature, contrast ratio, chiaroscuro, recording codecs (RAW, Log) and equipment selection.',
      es: 'Principios ópticos, temperatura de color, contraste, claroscuro, códecs RAW/Log y selección de equipamiento.',
      fr: 'Principes optiques, température de couleur, contraste, clair-obscur, codecs RAW/Log et choix du matériel.',
    },
    apostilaSummary: {
      pt: 'Apostila com 8 páginas cobrindo diagramas de iluminação (Key, Fill, Backlight), uso do fotômetro, relação de Kelvin, profundidade de campo e curvas Log/RAW.',
      en: '8-page handout covering lighting diagrams (Key, Fill, Backlight), exposure meter usage, Kelvin color temps, depth of field, and Log/RAW profiles.',
      es: 'Manual de 8 páginas con esquemas de luz (Principal, Relleno, Contraluz), fotometría, escala Kelvin y perfiles Log.',
      fr: 'Fascicule de 8 pages détaillant les plans d\'éclairage (Key, Fill, Backlight), posemètre, échelle Kelvin et profils Log/RAW.',
    },
    keyThemes: {
      pt: ['Esquemas de Iluminação de 3 Pontos', 'Fotometria e Curvas Log/RAW', 'Temperatura de Cor e Kelvin', 'Lentes e Profundidade de Campo'],
      en: ['3-Point Lighting Diagrams', 'Photometry & Log/RAW Curves', 'Color Temperature & Kelvin Scale', 'Lenses & Depth of Field'],
      es: ['Esquemas de Iluminación de 3 Puntos', 'Fotometría y Curvas Log/RAW', 'Temperatura de Color y Kelvin', 'Lentes y Profundidad de Campo'],
      fr: ['Plans d\'Éclairage à 3 Points', 'Photométrie et Courbes Log/RAW', 'Température de Couleur et Kelvin', 'Objectifs et Profondeur de Champ'],
    },
  },
  5: {
    title: {
      pt: 'Módulo 05: Som Direto, Microfonia e Desenho de Som',
      en: 'Module 05: Production Sound, Microphones & Sound Design',
      es: 'Módulo 05: Sonido Directo, Microfonía y Diseño de Sonido',
      fr: 'Module 05: Prise de Son, Microphones et Sound Design',
    },
    subtitle: {
      pt: 'Captação sonora no set, acústica, sound design, foley e mixagem',
      en: 'On-set sound recording, acoustics, sound design, foley and mixing',
      es: 'Captura de sonido en set, acústica, diseño de sonido, foley y mezcla',
      fr: 'Enregistrement sonore sur le plateau, acoustique, sound design, bruitage et mixage',
    },
    summary: {
      pt: 'O universo acústico do cinema: microfones direcionais, lapelas, gravação de ruídos de sala (room tone), camadas de ambiência e diálogo inteligível.',
      en: 'The acoustic realm of film: shotgun mics, lavaliers, room tone recording, ambient layering, and intelligible dialogue.',
      es: 'El universo acústico del cine: micrófonos direccionales, corbateros, room tone, capas de ambiente y diálogo inteligible.',
      fr: 'L\'univers acoustique du cinéma : micros directionnels, cravates, sons d\'ambiance (room tone) et clarté des dialogues.',
    },
    apostilaSummary: {
      pt: 'Apostila com 7 páginas detalhando padrões polares de microfones, posicionamento do boom, gravadores digitais e introdução à pós-produção de áudio.',
      en: '7-page handout detailing microphone polar patterns, boom pole positioning, digital field recorders, and intro to audio post-production.',
      es: 'Manual de 7 páginas detallando patrones polares, posición de caña/boom, grabadoras de campo y postproducción de audio.',
      fr: 'Fascicule de 7 pages détaillant les diagrammes polaires, le placement de la perche, enregistreurs numériques et post-production sonore.',
    },
    keyThemes: {
      pt: ['Microfones Direcionais e Lapelas', 'Técnica de Operação de Boom', 'Room Tone e Captação Limpa', 'Sound Design e Foley'],
      en: ['Shotgun & Lavalier Microphones', 'Boom Pole Technique', 'Room Tone & Clean Capture', 'Sound Design & Foley'],
      es: ['Micrófonos Direccionales y Corbateros', 'Técnica de Operación de Boom', 'Room Tone y Captura Limpia', 'Diseño de Sonido y Foley'],
      fr: ['Micros Directionnels et Cravates', 'Technique de Perche', 'Room Tone et Prise Propre', 'Sound Design et Bruitage'],
    },
  },
  6: {
    title: {
      pt: 'Módulo 06: Direção de Arte, Cenografia e Figurino',
      en: 'Module 06: Production Design, Set Decoration & Costume',
      es: 'Módulo 06: Dirección de Arte, Escenografía y Vestuario',
      fr: 'Module 06: Direction Artistique, Décors et Costumes',
    },
    subtitle: {
      pt: 'A estética do espaço fílmico, paletas cromáticas, adereços e caracterização',
      en: 'The aesthetics of cinematic space, color palettes, props and characterization',
      es: 'La estética del espacio fílmico, paletas cromáticas, atrezo y caracterización',
      fr: 'L\'esthétique de l\'espace filmique, palettes chromatiques, accessoires et costumes',
    },
    summary: {
      pt: 'Concepção visual dos universos cinematográficos, semiótica das cores, ambientação de época e contemporânea, maquiagem e figurino integrados à dramaturgia.',
      en: 'Visual conception of film worlds, color semiotics, period vs contemporary set dressing, makeup and costume integrated with drama.',
      es: 'Concepción visual de universos cinematográficos, semiótica de color, ambientación de época y vestuario integrado al drama.',
      fr: 'Conception visuelle des univers filmiques, sémiotique des couleurs, décors d\'époque, maquillage et costumes au service du récit.',
    },
    apostilaSummary: {
      pt: 'Apostila com 7 páginas sobre a construção visual do filme: paleta de cores, moodboards, pesquisa de locações, desenho de produção e linguagem de adereços.',
      en: '7-page handout covering film visual construction: color swatches, moodboards, location scouting, production design, and props.',
      es: 'Manual de 7 páginas sobre construcción visual: paletas de color, moodboards, búsqueda de locaciones y diseño de producción.',
      fr: 'Fascicule de 7 pages sur la construction visuelle : moodboards, repérage de décors, direction artistique et accessoires.',
    },
    keyThemes: {
      pt: ['Paletas Cromáticas e Semiótica', 'Moodboards e Desenho de Produção', 'Figurino e Caracterização', 'Locações e Ambientação'],
      en: ['Color Palettes & Semiotics', 'Moodboards & Production Design', 'Costumes & Characterization', 'Locations & Set Dressing'],
      es: ['Paletas Cromáticas y Semiótica', 'Moodboards y Diseño de Producción', 'Vestuario y Caracterización', 'Locaciones y Ambientación'],
      fr: ['Palettes Chromatiques & Sémiotique', 'Moodboards & Direction Artistique', 'Costumes & Maquillage', 'Décors & Repérages'],
    },
  },
  7: {
    title: {
      pt: 'Módulo 07: Montagem, Edição e Ritmo Cinematográfico',
      en: 'Module 07: Film Editing, Pacing & Continuity',
      es: 'Módulo 07: Montaje, Edición y Ritmo Cinematográfico',
      fr: 'Module 07: Montage, Rythme et Continuité Cinématographique',
    },
    subtitle: {
      pt: 'Teoria da montagem (Kuleshov, Eisenstein), continuidades e cortes invisíveis',
      en: 'Editing theories (Kuleshov, Eisenstein), continuity and invisible cuts',
      es: 'Teoría del montaje (Kuleshov, Eisenstein), continuidad y cortes invisibles',
      fr: 'Théorie du montage (Koulechov, Eisenstein), continuité et raccords invisibles',
    },
    summary: {
      pt: 'A construção do tempo cinematográfico, elipses, montagem paralela, ritmo da cena, montagem de ação versus contemplação e fluxos no DaVinci Resolve.',
      en: 'Crafting cinematic time, ellipses, cross-cutting, scene pacing, dynamic vs contemplative cuts, and workflows in DaVinci Resolve.',
      es: 'Construcción del tiempo cinematográfico, elipsis, montaje paralelo, ritmo y flujos de trabajo en DaVinci Resolve.',
      fr: 'Construction du temps filmique, ellipses, montage alterné, tempo dramatique et flux de travail sous DaVinci Resolve.',
    },
    apostilaSummary: {
      pt: 'Apostila com 8 páginas detalhando a história e prática do corte cinematográfico: efeito Kuleshov, tipos de transição, découpage e sincronização de som e imagem.',
      en: '8-page handout detailing history and practice of the cinematic cut: Kuleshov effect, cut types, rhythm, and sync.',
      es: 'Manual de 8 páginas con la teoría y práctica del corte: efecto Kuleshov, transiciones, ritmo y sincronización.',
      fr: 'Fascicule de 8 pages détaillant la pratique du cut : effet Koulechov, transitions, rythme et synchronisation image/son.',
    },
    keyThemes: {
      pt: ['Efeito Kuleshov e Montagem Intelectual', 'Raccord e Continuidade Espacial', 'Montagem Paralela e Elipses', 'Fluxo de Trabalho de Edição'],
      en: ['Kuleshov Effect & Intellectual Montage', 'Continuity & Invisible Cuts', 'Cross-Cutting & Ellipses', 'NLE Editing Workflows'],
      es: ['Efecto Kuleshov y Montaje Intelectual', 'Raccord y Continuidad Espacial', 'Montaje Paralelo y Elipsis', 'Flujo de Trabajo de Edición'],
      fr: ['Effet Koulechov & Montage Intellectuel', 'Raccords & Continuité', 'Montage Alterné & Ellipses', 'Workflows de Montage'],
    },
  },
  8: {
    title: {
      pt: 'Módulo 08: Pós-produção, Efeitos Visuais e Color Grading',
      en: 'Module 08: Post-Production, VFX & Color Grading',
      es: 'Módulo 08: Postproducción, Efectos Visuales y Color Grading',
      fr: 'Module 08: Post-Production, Effets Spéciaux et Étalonnage',
    },
    subtitle: {
      pt: 'Tratamento de cor primário e secundário, LUTs, chroma key e finalização DCP',
      en: 'Primary and secondary color correction, LUTs, chroma key and DCP mastering',
      es: 'Tratamiento de color primario y secundario, LUTs, croma y masterización DCP',
      fr: 'Étalonnage primaire et secondaire, LUTs, incrustation et masterisation DCP',
    },
    summary: {
      pt: 'Correção e gradação de cor com precisão técnica, espaço de cores ACES/Rec.709, masterização para streaming e cinema (DCP DCI 2K/4K).',
      en: 'Technical color correction and creative grading, ACES/Rec.709 color spaces, mastering for streaming and theatrical delivery (DCP 2K/4K).',
      es: 'Corrección y gradación de color profesional, espacios de color ACES/Rec.709, exportación para streaming y cine (DCP).',
      fr: 'Étalonnage technique et artistique, espaces colorimétriques ACES/Rec.709, masterisation pour plateformes et cinéma (DCP 2K/4K).',
    },
    apostilaSummary: {
      pt: 'Apostila com 7 páginas sobre scopes (waveform, vectorscope), nós no DaVinci Resolve, match de câmeras e criação de look cinematográfico.',
      en: '7-page handout on video scopes (waveform, vectorscope), node trees in DaVinci Resolve, camera matching, and cinematic look development.',
      es: 'Manual de 7 páginas sobre scopes (vectorscopio, forma de onda), nodos en DaVinci Resolve y creación de looks cinematográficos.',
      fr: 'Fascicule de 7 pages sur les scopes vidéo, arborescence de nœuds sous DaVinci Resolve et conception de look cinématographique.',
    },
    keyThemes: {
      pt: ['Scopes (Waveform, Vectorscópio)', 'Color Grading Primário e Secundário', 'Espaços de Cor ACES e Rec.709', 'Masterização DCP para Festivais'],
      en: ['Scopes (Waveform, Vectorscope)', 'Primary & Secondary Grading', 'ACES & Rec.709 Color Spaces', 'DCP Cinema Mastering'],
      es: ['Scopes (Waveform, Vectorscopio)', 'Gradación Primaria y Secundaria', 'Espacios de Color ACES y Rec.709', 'Masterización DCP'],
      fr: ['Scopes (Forme d\'onde, Vecteurscope)', 'Étalonnage Primaire et Secondaire', 'Espaces Colorimétriques ACES', 'Masterisation DCP'],
    },
  },
  9: {
    title: {
      pt: 'Módulo 09: Produção Executiva, Legislação e Orçamento',
      en: 'Module 09: Executive Producing, Film Law & Budgeting',
      es: 'Módulo 09: Producción Ejecutiva, Legislación y Presupuestos',
      fr: 'Module 09: Production Exécutive, Droit du Cinéma et Budget',
    },
    subtitle: {
      pt: 'Planejamento de produção, ordens do dia, editais, leis de incentivo e contratos',
      en: 'Production planning, call sheets, grants, incentive laws and contracts',
      es: 'Planificación de producción, hojas de llamado, fondos, leyes de incentivo y contratos',
      fr: 'Planification de production, feuilles de service, commissions et contrats',
    },
    summary: {
      pt: 'Planilhas orçamentárias profissionais, gestão de equipe de set, direitos autorais e de imagem, contratação sindical e viabilidade financeira de projetos.',
      en: 'Professional budgeting spreadsheets, crew management, copyright and talent releases, union guidelines, and financing strategies.',
      es: 'Presupuestos profesionales, gestión de equipo en set, derechos de autor e imagen, contratos y viabilidad económica de proyectos.',
      fr: 'Budgets prévisionnels professionnels, gestion d\'équipe, droits d\'auteur, contrats et recherche de financements.',
    },
    apostilaSummary: {
      pt: 'Apostila com 8 páginas com modelos de planilhas de produção, contratos padrão de cessão de direitos, ordem do dia e submissão a editais públicos.',
      en: '8-page handout with production budget templates, standard copyright release forms, call sheets, and grant submission guides.',
      es: 'Manual de 8 páginas con plantillas de presupuestos, modelos de contratos de cesión, órdenes de rodaje y postulación a fondos.',
      fr: 'Fascicule de 8 pages avec modèles de devis, cessions de droits, feuilles de service et dossiers de subventions.',
    },
    keyThemes: {
      pt: ['Planilhas de Orçamento Cinematográfico', 'Ordem do Dia e Cronograma de Rodagem', 'Direitos Autorais e Contratos', 'Editais Públicos e Pitching'],
      en: ['Film Budgeting Spreadsheets', 'Call Sheets & Shooting Schedules', 'Copyright & Talent Contracts', 'Grants & Project Pitching'],
      es: ['Presupuestos Cinematográficos', 'Órdenes de Rodaje y Calendario', 'Derechos de Autor y Contratos', 'Fondos Públicos y Pitching'],
      fr: ['Plans de Financement et Budgets', 'Feuilles de Service & Tournage', 'Droits d\'Auteur et Contrats', 'Commissions & Pitching'],
    },
  },
  10: {
    title: {
      pt: 'Módulo 10: Projeto Final: Realização de Curta-Metragem & Mostra Independente',
      en: 'Module 10: Final Project: Short Film Production & Independent Showcase',
      es: 'Módulo 10: Proyecto Final: Realización de Cortometraje y Muestra Independiente',
      fr: 'Module 10: Projet Final : Réalisation d\'un Court-Métrage & Diffusion',
    },
    subtitle: {
      pt: 'Concepção, rodagem, montagem e exibição do seu curta autoral de 1 a 5 minutos',
      en: 'Conception, shooting, editing and screening of your 1-to-5 minute auteur short',
      es: 'Concepción, rodaje, montaje y exhibición de tu cortometraje de 1 a 5 minutos',
      fr: 'Conception, tournage, montage et diffusion de votre court-métrage de 1 à 5 minutes',
    },
    summary: {
      pt: 'Módulo integrador e prático. Realização e finalização do curta-metragem autoral e estudo analítico de obras consagradas do cinema independente como referência estética.',
      en: 'Capstone practical module. Complete execution and finalization of your original short film, analyzing benchmark independent cinema as aesthetic reference.',
      es: 'Módulo integrador y práctico. Realización y finalización de tu cortometraje original con análisis de obras consagradas del cine independiente.',
      fr: 'Module pratique d\'intégration. Réalisation complète de votre court-métrage original et analyse d\'œuvres de référence du cinéma indépendant.',
    },
    apostilaSummary: {
      pt: 'Apostila com 9 páginas guiando a execução passo a passo do curta-metragem final: do roteiro decupado ao master final para exibição e certificação.',
      en: '9-page handout guiding step-by-step execution of your final short film: from shooting script to final festival master and diploma.',
      es: 'Manual de 9 páginas que guía paso a paso la producción del cortometraje: del guion técnico al master final y certificación.',
      fr: 'Fascicule de 9 pages guidant la production pas à pas : du scénario technique au master final et à l\'obtention du diplôme.',
    },
    keyThemes: {
      pt: ['Planejamento e Rodagem do Curta', 'Decupagem e Execução no Set', 'Finalização e Master de Exibição', 'Mostra Virtual e Certificação'],
      en: ['Short Film Planning & Production', 'On-Set Shot Execution', 'Master Delivery & Final Cut', 'Showcase & Certification'],
      es: ['Planificación y Rodaje del Corto', 'Ejecución del Desglose en Set', 'Finalización y Master de Exhibición', 'Muestra y Certificación'],
      fr: ['Planification et Tournage du Court', 'Exécution du Découpage sur le Plateau', 'Master Final et Diffusion', 'Projection et Certification'],
    },
  },
};

export * from './filmTranslations.js';
