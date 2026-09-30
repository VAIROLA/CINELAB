import React, { useEffect, useState } from 'react';
import { api } from '../services/api.js';
import { useLanguage } from '../i18n/LanguageContext.js';
import { LanguageSelector } from '../components/LanguageSelector.js';
import { ProtectedPdfViewer } from '../components/ProtectedPdfViewer.js';
import { FilmSubtitleTranscriptViewer } from '../components/FilmSubtitleTranscriptViewer.js';
import { ReadingReaderModal } from '../components/ReadingReaderModal.js';
import { getTranslatedApostilaSections } from '../i18n/apostilaContentTranslations.js';
import { formatPdfViewerUrl, getVaultBlobUrl } from '../utils/apostilaVault.js';
import { parseVideoEmbed } from '../utils/videoUtils.js';
import {
  CourseModule,
  VideoLesson,
  Apostila,
  EvaluationSubmission,
  ModuleFilm,
  ModuleReading,
  ModuleEvaluation,
} from '../types/index.js';
import {
  Film,
  BookOpen,
  CheckCircle2,
  FileCheck,
  Lock,
  Unlock,
  Clock,
  ArrowLeft,
  Eye,
  Award,
  ExternalLink,
  Sparkles,
  Play,
  BookmarkCheck,
  Compass,
  ListChecks,
  AlertCircle,
  Copy,
  Check,
  Tv,
  Volume2,
  FileText,
  Shield,
  Globe,
  Subtitles,
  Languages,
  Info,
} from 'lucide-react';

interface ModuleDetailViewProps {
  moduleId: number;
  onNavigate: (route: string, params?: any) => void;
}

export const ModuleDetailView: React.FC<ModuleDetailViewProps> = ({
  moduleId,
  onNavigate,
}) => {
  const { language, t, getModuleTranslation, getFilmTranslation, getReadingTranslation } = useLanguage();
  const currentTranslation = getModuleTranslation(moduleId);

  const tMod = {
    pt: {
      loading: 'Carregando conteúdo pedagógico do Módulo 0',
      unavailable: 'Módulo Não Disponível',
      lockedDesc: 'Conteúdo bloqueado pelo cronograma pedagógico de 3 meses.',
      backDashboard: 'Voltar para Minha Área',
      stagePrefix: 'ETAPA',
      ofTen: 'DE 10',
      durationLabel: 'Duração Programada do Módulo',
      unlockedBadge: 'LIBERADO NO CRONOGRAMA',
      pedagogicalObjective: 'OBJETIVO PEDAGÓGICO',
      directorObjectives: 'OBJETIVOS DO REALIZADOR',
      tabVideo: 'Masterclass em Vídeo',
      tabApostila: 'Apostila (Leitura Online)',
      tabFilm: 'Filme Recomendado',
      tabReading: 'Leitura Obrigatória',
      tabActivities: 'Práticas & Pesquisa',
      tabEval: 'Avaliação Oficial (10 Questões)',
      masterclassPrefix: 'MASTERCLASS',
      minutes: 'MINUTOS',
      profTony: 'Professor Tony de Luc',
      profComments: 'Comentário do Professor Tony de Luc:',
      officialMaterial: 'MATERIAL DIDÁTICO OFICIAL',
      exclusiveReading: 'Leitura Exclusiva na Plataforma • Sem Download',
      realPages: 'páginas didáticas reais de estudo, decupagens e gramática do filme',
      stageSummary: 'RESUMO DA ETAPA:',
      readerTab: 'Leitor da Apostila Oficial',
      topicsTab: 'Ementa & Conteúdo Traduzido',
      apostilaLabel: 'Apostila:',
      quizTitle: 'QUIZ DE FIXAÇÃO DA APOSTILA (5 QUESTÕES)',
      quizDesc: 'Este quiz serve exclusivamente para fixação dos conceitos fundamentais da apostila.',
      quizWarning: 'Aviso: Ele NÃO substitui a avaliação oficial do módulo.',
      questionPrefix: 'QUESTÃO FIXAÇÃO 0',
      ofFive: 'DE 5',
      correct: 'CORRETA',
      didacticExpl: 'Explicação Didática:',
      cinematecaTitle: 'CINEMATECA OBRIGATÓRIA',
      originalTitleLabel: 'Título Original:',
      selectVersion: 'Selecione a Versão ou Recorte Pedagógico:',
      selectedDuration: 'Tempo do vídeo selecionado:',
      synopsisTitle: 'Sinopse da Obra:',
      whyWatchTitle: 'Por Que o Aluno Deve Assistir:',
      whatToObserveTitle: 'O Que Observar com Olhar de Realizador:',
      technicalSheet: 'FICHA TÉCNICA',
      direction: 'Direção:',
      year: 'Ano:',
      country: 'País:',
      duration: 'Duração:',
      extraBonusBadge: 'VÍDEO EXTRA • RECURSO PEDAGÓGICO',
      integratedPlayer: 'Player Integrado',
      closePlayer: 'Fechar Player',
      watchVideo: 'Assistir ao Vídeo',
      openStreaming: 'Abrir no Streaming Oficial',
      libraryTitle: 'BIBLIOTECA & LEITURA CRÍTICA',
      authorLabel: 'Autor(a):',
      estimatedTime: 'Tempo estimado:',
      chapterPages: 'Capítulo / Páginas:',
      readingSummaryTitle: 'Resumo Crítico da Leitura:',
      whyReadTitle: 'Por Que o Realizador Deve Ler:',
      accessReadingBtn: 'Acessar Leitura Online Recomendada',
      practicalLab: 'LABORATÓRIO PRÁTICO',
      practicesOfModule: 'Práticas, Pesquisas e Decupagens do Módulo 0',
      completedCount: 'concluídas',
      ofTotal: 'de',
      completedBadge: 'CONCLUÍDA',
      executionInstructions: 'Instruções de Execução:',
      markCompleted: 'Marcar como Concluída',
      unmarkCompleted: 'Desmarcar Atividade',
      evalStageTitle: 'AVALIAÇÃO OFICIAL DA ETAPA',
      evalExamTitle: 'Prova Oficial do Módulo 0',
      evalRules: '10 Questões Objetivas • 1 Ponto por Questão • Nota Máxima: 10 • Correção Imediata',
      evalFinished: 'AVALIAÇÃO CONCLUÍDA',
      evalGrade: 'NOTA:',
      evalPending: 'PENDENTE DE REALIZAÇÃO',
      evalCoordDirective: 'Diretriz da Coordenação:',
      evalCoordDirectiveText: 'A avaliação é a prova oficial do módulo. Ela difere do quiz da apostila. Responda com atenção a todas as 10 questões para compor sua média de certificação.',
      evalQuestionPrefix: 'QUESTÃO 0',
      evalOfTen: 'DE 10',
      evalValue: 'Valor: 1,0 Ponto',
      evalSubmitBtn: 'Finalizar e Enviar Avaliação',
      evalSubmitting: 'Corrigindo Avaliação...',
      evalAvailableSchedule: 'Esta avaliação estará disponível de acordo com o cronograma pedagógico de 3 meses do curso.',
    },
    en: {
      loading: 'Loading pedagogical content for Module 0',
      unavailable: 'Module Not Available',
      lockedDesc: 'Content locked by the 3-month pedagogical schedule.',
      backDashboard: 'Return to Student Dashboard',
      stagePrefix: 'STAGE',
      ofTen: 'OF 10',
      durationLabel: 'Scheduled Module Duration',
      unlockedBadge: 'UNLOCKED ON SCHEDULE',
      pedagogicalObjective: 'PEDAGOGICAL OBJECTIVE',
      directorObjectives: 'DIRECTOR\'S GOALS',
      tabVideo: 'Video Masterclass',
      tabApostila: 'Handout (Online Reader)',
      tabFilm: 'Recommended Film',
      tabReading: 'Required Reading',
      tabActivities: 'Practices & Research',
      tabEval: 'Official Assessment (10 Questions)',
      masterclassPrefix: 'MASTERCLASS',
      minutes: 'MINUTES',
      profTony: 'Professor Tony de Luc',
      profComments: 'Professor Tony de Luc\'s Commentary:',
      officialMaterial: 'OFFICIAL TECHNICAL HANDOUT',
      exclusiveReading: 'Exclusive Platform Reader • No Download',
      realPages: 'technical pages of film grammar, shot breakdowns, and analysis',
      stageSummary: 'STAGE SUMMARY:',
      readerTab: 'Official Handout Reader',
      topicsTab: 'Syllabus & Translated Content',
      apostilaLabel: 'Handout:',
      quizTitle: 'HANDOUT RETENTION QUIZ (5 QUESTIONS)',
      quizDesc: 'This quiz serves exclusively to reinforce fundamental concepts from the handout.',
      quizWarning: 'Notice: It does NOT replace the official module evaluation.',
      questionPrefix: 'RETENTION QUESTION 0',
      ofFive: 'OF 5',
      correct: 'CORRECT',
      didacticExpl: 'Pedagogical Explanation:',
      cinematecaTitle: 'MANDATORY CINEMATHEQUE',
      originalTitleLabel: 'Original Title:',
      selectVersion: 'Select Version or Scene Breakdown:',
      selectedDuration: 'Selected video length:',
      synopsisTitle: 'Synopsis:',
      whyWatchTitle: 'Why Students Must Watch:',
      whatToObserveTitle: 'What to Observe through a Filmmaker\'s Lens:',
      technicalSheet: 'CREDITS & TECHNICAL SPECS',
      direction: 'Director:',
      year: 'Year:',
      country: 'Country:',
      duration: 'Duration:',
      extraBonusBadge: 'EXTRA VIDEO • PEDAGOGICAL RESOURCE',
      integratedPlayer: 'Integrated Player',
      closePlayer: 'Close Player',
      watchVideo: 'Watch Video',
      openStreaming: 'Open on Official Streaming',
      libraryTitle: 'CRITICAL LIBRARY & ESSAY',
      authorLabel: 'Author:',
      estimatedTime: 'Estimated time:',
      chapterPages: 'Chapter / Pages:',
      readingSummaryTitle: 'Critical Reading Summary:',
      whyReadTitle: 'Why the Filmmaker Must Read:',
      accessReadingBtn: 'Access Recommended Online Reading',
      practicalLab: 'PRACTICAL LAB',
      practicesOfModule: 'Practices, Research & Shot Breakdown for Module 0',
      completedCount: 'completed',
      ofTotal: 'of',
      completedBadge: 'COMPLETED',
      executionInstructions: 'Execution Guidelines:',
      markCompleted: 'Mark as Completed',
      unmarkCompleted: 'Unmark Activity',
      evalStageTitle: 'OFFICIAL STAGE EVALUATION',
      evalExamTitle: 'Official Assessment for Module 0',
      evalRules: '10 Multiple-Choice Questions • 1 Point Each • Max Score: 10 • Instant Grading',
      evalFinished: 'ASSESSMENT COMPLETED',
      evalGrade: 'GRADE:',
      evalPending: 'PENDING SUBMISSION',
      evalCoordDirective: 'Academic Coordination Guideline:',
      evalCoordDirectiveText: 'This is the official stage examination. It differs from the handout quiz. Answer all 10 questions thoughtfully to build your diploma average.',
      evalQuestionPrefix: 'QUESTION 0',
      evalOfTen: 'OF 10',
      evalValue: 'Value: 1.0 Point',
      evalSubmitBtn: 'Finalize and Submit Assessment',
      evalSubmitting: 'Submitting & Grading...',
      evalAvailableSchedule: 'This assessment will be accessible according to the course\'s 3-month schedule.',
    },
    es: {
      loading: 'Cargando contenido pedagógico del Módulo 0',
      unavailable: 'Módulo No Disponible',
      lockedDesc: 'Contenido bloqueado por el cronograma pedagógico de 3 meses.',
      backDashboard: 'Volver al Panel del Alumno',
      stagePrefix: 'ETAPA',
      ofTen: 'DE 10',
      durationLabel: 'Duración Programada del Módulo',
      unlockedBadge: 'HABILITADO EN CRONOGRAMA',
      pedagogicalObjective: 'OBJETIVO PEDAGÓGICO',
      directorObjectives: 'OBJETIVOS DEL REALIZADOR',
      tabVideo: 'Masterclass en Video',
      tabApostila: 'Manual (Lectura en Línea)',
      tabFilm: 'Película Recomendada',
      tabReading: 'Lectura Obligatoria',
      tabActivities: 'Prácticas e Investigación',
      tabEval: 'Evaluación Oficial (10 Preguntas)',
      masterclassPrefix: 'MASTERCLASS',
      minutes: 'MINUTOS',
      profTony: 'Profesor Tony de Luc',
      profComments: 'Comentario del Profesor Tony de Luc:',
      officialMaterial: 'MATERIAL DIDÁCTICO OFICIAL',
      exclusiveReading: 'Lectura Exclusiva en Plataforma • Sin Descarga',
      realPages: 'páginas didácticas reales de estudio, decupajes y gramática del film',
      stageSummary: 'RESUMEN DE LA ETAPA:',
      readerTab: 'Lector del Manual Oficial',
      topicsTab: 'Temario y Contenido Traducido',
      apostilaLabel: 'Manual:',
      quizTitle: 'QUIZ DE FIJACIÓN DEL MANUAL (5 PREGUNTAS)',
      quizDesc: 'Este cuestionario sirve exclusivamente para afianzar conceptos clave del manual.',
      quizWarning: 'Aviso: NO reemplaza la evaluación oficial del módulo.',
      questionPrefix: 'PREGUNTA DE FIJACIÓN 0',
      ofFive: 'DE 5',
      correct: 'CORRECTA',
      didacticExpl: 'Explicación Didáctica:',
      cinematecaTitle: 'CINEMATECA OBLIGATORIA',
      originalTitleLabel: 'Título Original:',
      selectVersion: 'Seleccione la Versión o Escena:',
      selectedDuration: 'Duración del video seleccionado:',
      synopsisTitle: 'Sinopsis de la Obra:',
      whyWatchTitle: 'Por Qué el Alumno Debe Verla:',
      whatToObserveTitle: 'Qué Observar con Mirada de Realizador:',
      technicalSheet: 'FICHA TÉCNICA',
      direction: 'Dirección:',
      year: 'Año:',
      country: 'País:',
      duration: 'Duración:',
      extraBonusBadge: 'VIDEO EXTRA • RECURSO PEDAGÓGICO',
      integratedPlayer: 'Player Integrado',
      closePlayer: 'Cerrar Player',
      watchVideo: 'Ver Video',
      openStreaming: 'Abrir en Streaming Oficial',
      libraryTitle: 'BIBLIOTECA Y LECTURA CRÍTICA',
      authorLabel: 'Autor(a):',
      estimatedTime: 'Tiempo estimado:',
      chapterPages: 'Capítulo / Páginas:',
      readingSummaryTitle: 'Resumen Crítico de la Lectura:',
      whyReadTitle: 'Por Qué el Realizador Debe Leerlo:',
      accessReadingBtn: 'Acceder a la Lectura Recomendada',
      practicalLab: 'LABORATORIO PRÁCTICO',
      practicesOfModule: 'Prácticas, Investigaciones y Decupajes del Módulo 0',
      completedCount: 'completadas',
      ofTotal: 'de',
      completedBadge: 'COMPLETADA',
      executionInstructions: 'Instrucciones de Realización:',
      markCompleted: 'Marcar como Completada',
      unmarkCompleted: 'Desmarcar Actividad',
      evalStageTitle: 'EVALUACIÓN OFICIAL DE LA ETAPA',
      evalExamTitle: 'Examen Oficial del Módulo 0',
      evalRules: '10 Preguntas Objetivas • 1 Punto por Pregunta • Nota Máxima: 10 • Corrección Inmediata',
      evalFinished: 'EVALUACIÓN COMPLETADA',
      evalGrade: 'NOTA:',
      evalPending: 'PENDIENTE DE REALIZACIÓN',
      evalCoordDirective: 'Directriz de la Coordinación:',
      evalCoordDirectiveText: 'La evaluación es el examen oficial del módulo. Responde con atención a las 10 preguntas para tu promedio de titulación.',
      evalQuestionPrefix: 'PREGUNTA 0',
      evalOfTen: 'DE 10',
      evalValue: 'Valor: 1,0 Punto',
      evalSubmitBtn: 'Finalizar y Enviar Evaluación',
      evalSubmitting: 'Corrigiendo Evaluación...',
      evalAvailableSchedule: 'Esta evaluación estará disponible según el cronograma pedagógico de 3 meses.',
    },
    fr: {
      loading: 'Chargement du contenu pédagogique du Module 0',
      unavailable: 'Module Non Disponible',
      lockedDesc: 'Contenu verrouillé selon le calendrier pédagogique de 3 mois.',
      backDashboard: 'Retour à l\'Espace Étudiant',
      stagePrefix: 'ÉTAPE',
      ofTen: 'SUR 10',
      durationLabel: 'Durée Programmée du Module',
      unlockedBadge: 'DÉBLOQUÉ SELON LE CALENDRIER',
      pedagogicalObjective: 'OBJECTIF PÉDAGOGIQUE',
      directorObjectives: 'OBJECTIFS DU RÉALISATEUR',
      tabVideo: 'Masterclass Vidéo',
      tabApostila: 'Fascicule (Lecture en Ligne)',
      tabFilm: 'Film Recommandé',
      tabReading: 'Lecture Obligatoire',
      tabActivities: 'Pratiques & Recherches',
      tabEval: 'Évaluation Officielle (10 Questions)',
      masterclassPrefix: 'MASTERCLASS',
      minutes: 'MINUTES',
      profTony: 'Professeur Tony de Luc',
      profComments: 'Commentaire du Professeur Tony de Luc :',
      officialMaterial: 'MATÉRIEL PÉDAGOGIQUE OFFICIEL',
      exclusiveReading: 'Lecture Exclusive sur la Plateforme • Sans Téléchargement',
      realPages: 'pages didactiques réelles de grammaire cinématographique et analyse',
      stageSummary: 'RÉSUMÉ DU MODULE :',
      readerTab: 'Lecteur du Fascicule Officiel',
      topicsTab: 'Programme & Contenu Traduit',
      apostilaLabel: 'Fascicule :',
      quizTitle: 'QUIZ DE CONSOLIDATION DU FASCICULE (5 QUESTIONS)',
      quizDesc: 'Ce quiz sert exclusivement à consolider les concepts fondamentaux du fascicule.',
      quizWarning: 'Remarque : Il NE remplace PAS l\'évaluation officielle du module.',
      questionPrefix: 'QUESTION DE CONSOLIDATION 0',
      ofFive: 'SUR 5',
      correct: 'CORRECT',
      didacticExpl: 'Explication Pédagogique :',
      cinematecaTitle: 'CINÉMATHÈQUE OBLIGATOIRE',
      originalTitleLabel: 'Titre Original :',
      selectVersion: 'Sélectionnez la Version ou Scène :',
      selectedDuration: 'Durée de la vidéo sélectionnée :',
      synopsisTitle: 'Synopsis de l\'Œuvre :',
      whyWatchTitle: 'Pourquoi l\'Étudiant Doit Regarder :',
      whatToObserveTitle: 'Ce Qu\'il Faut Observer avec le Regard du Réalisateur :',
      technicalSheet: 'FICHE TECHNIQUE',
      direction: 'Réalisation :',
      year: 'Année :',
      country: 'Pays :',
      duration: 'Durée :',
      extraBonusBadge: 'VIDÉO SUPPLÉMENTAIRE • RESSOURCE PÉDAGOGIQUE',
      integratedPlayer: 'Lecteur Intégré',
      closePlayer: 'Fermer le Lecteur',
      watchVideo: 'Regarder la Vidéo',
      openStreaming: 'Ouvrir sur le Streaming Officiel',
      libraryTitle: 'BIBLIOTHÈQUE & LECTURE CRITIQUE',
      authorLabel: 'Auteur :',
      estimatedTime: 'Temps estimé :',
      chapterPages: 'Chapitre / Pages :',
      readingSummaryTitle: 'Résumé Critique de la Lecture :',
      whyReadTitle: 'Pourquoi le Réalisateur Doit Lire :',
      accessReadingBtn: 'Accéder à la Lecture Recommandée',
      practicalLab: 'LABORATOIRE PRATIQUE',
      practicesOfModule: 'Pratiques, Recherches et Découpages du Module 0',
      completedCount: 'validées',
      ofTotal: 'sur',
      completedBadge: 'TERMINÉE',
      executionInstructions: 'Consignes d\'Exécution :',
      markCompleted: 'Marquer comme Terminée',
      unmarkCompleted: 'Décocher l\'Activité',
      evalStageTitle: 'ÉVALUATION OFFICIELLE DU MODULE',
      evalExamTitle: 'Épreuve Officielle du Module 0',
      evalRules: '10 Questions QCM • 1 Point par Question • Note Maximale : 10 • Correction Immédiate',
      evalFinished: 'ÉVALUATION TERMINÉE',
      evalGrade: 'NOTE :',
      evalPending: 'EN ATTENTE',
      evalCoordDirective: 'Directive Pédagogique :',
      evalCoordDirectiveText: 'Cette évaluation constitue l\'examen officiel du module. Répondez avec soin aux 10 questions pour votre moyenne finale.',
      evalQuestionPrefix: 'QUESTION 0',
      evalOfTen: 'SUR 10',
      evalValue: 'Valeur : 1,0 Point',
      evalSubmitBtn: 'Finaliser et Soumettre l\'Évaluation',
      evalSubmitting: 'Correction en Cours...',
      evalAvailableSchedule: 'Cette évaluation sera accessible selon le calendrier pédagogique de 3 mois du cours.',
    },
  }[language] || {
    loading: 'Carregando conteúdo pedagógico do Módulo 0',
    unavailable: 'Módulo Não Disponível',
    lockedDesc: 'Conteúdo bloqueado pelo cronograma pedagógico de 3 meses.',
    backDashboard: 'Voltar para Minha Área',
    stagePrefix: 'ETAPA',
    ofTen: 'DE 10',
    durationLabel: 'Duração Programada do Módulo',
    unlockedBadge: 'LIBERADO NO CRONOGRAMA',
    pedagogicalObjective: 'OBJETIVO PEDAGÓGICO',
    directorObjectives: 'OBJETIVOS DO REALIZADOR',
    tabVideo: 'Masterclass em Vídeo',
    tabApostila: 'Apostila (Leitura Online)',
    tabFilm: 'Filme Recomendado',
    tabReading: 'Leitura Obrigatória',
    tabActivities: 'Práticas & Pesquisa',
    tabEval: 'Avaliação Oficial (10 Questões)',
    masterclassPrefix: 'MASTERCLASS',
    minutes: 'MINUTOS',
    profTony: 'Professor Tony de Luc',
    profComments: 'Comentário do Professor Tony de Luc:',
    officialMaterial: 'MATERIAL DIDÁTICO OFICIAL',
    exclusiveReading: 'Leitura Exclusiva na Plataforma • Sem Download',
    realPages: 'páginas didáticas reais de estudo, decupagens e gramática do filme',
    stageSummary: 'RESUMO DA ETAPA:',
    readerTab: 'Leitor da Apostila Oficial',
    topicsTab: 'Ementa & Conteúdo Traduzido',
    apostilaLabel: 'Apostila:',
    quizTitle: 'QUIZ DE FIXAÇÃO DA APOSTILA (5 QUESTÕES)',
    quizDesc: 'Este quiz serve exclusivamente para fixação dos conceitos fundamentais da apostila.',
    quizWarning: 'Aviso: Ele NÃO substitui a avaliação oficial do módulo.',
    questionPrefix: 'QUESTÃO FIXAÇÃO 0',
    ofFive: 'DE 5',
    correct: 'CORRETA',
    didacticExpl: 'Explicação Didática:',
    cinematecaTitle: 'CINEMATECA OBRIGATÓRIA',
    originalTitleLabel: 'Título Original:',
    selectVersion: 'Selecione a Versão ou Recorte Pedagógico:',
    selectedDuration: 'Tempo do vídeo selecionado:',
    synopsisTitle: 'Sinopse da Obra:',
    whyWatchTitle: 'Por Que o Aluno Deve Assistir:',
    whatToObserveTitle: 'O Que Observar com Olhar de Realizador:',
    technicalSheet: 'FICHA TÉCNICA',
    direction: 'Direção:',
    year: 'Ano:',
    country: 'País:',
    duration: 'Duração:',
    extraBonusBadge: 'VÍDEO EXTRA • RECURSO PEDAGÓGICO',
    integratedPlayer: 'Player Integrado',
    closePlayer: 'Fechar Player',
    watchVideo: 'Assistir ao Vídeo',
    openStreaming: 'Abrir no Streaming Oficial',
    libraryTitle: 'BIBLIOTECA & LEITURA CRÍTICA',
    authorLabel: 'Autor(a):',
    estimatedTime: 'Tempo estimado:',
    chapterPages: 'Capítulo / Páginas:',
    readingSummaryTitle: 'Resumo Crítico da Leitura:',
    whyReadTitle: 'Por Que o Realizador Deve Ler:',
    accessReadingBtn: 'Acessar Leitura Online Recomendada',
    practicalLab: 'LABORATÓRIO PRÁTICO',
    practicesOfModule: 'Práticas, Pesquisas e Decupagens do Módulo 0',
    completedCount: 'concluídas',
    ofTotal: 'de',
    completedBadge: 'CONCLUÍDA',
    executionInstructions: 'Instruções de Execução:',
    markCompleted: 'Marcar como Concluída',
    unmarkCompleted: 'Desmarcar Atividade',
    evalStageTitle: 'AVALIAÇÃO OFICIAL DA ETAPA',
    evalExamTitle: 'Prova Oficial do Módulo 0',
    evalRules: '10 Questões Objetivas • 1 Ponto por Questão • Nota Máxima: 10 • Correção Imediata',
    evalFinished: 'AVALIAÇÃO CONCLUÍDA',
    evalGrade: 'NOTA:',
    evalPending: 'PENDENTE DE REALIZAÇÃO',
    evalCoordDirective: 'Diretriz da Coordenação:',
    evalCoordDirectiveText: 'A avaliação é a prova oficial do módulo. Ela difere do quiz da apostila. Responda com atenção a todas as 10 questões para compor sua média de certificação.',
    evalQuestionPrefix: 'QUESTÃO 0',
    evalOfTen: 'DE 10',
    evalValue: 'Valor: 1,0 Ponto',
    evalSubmitBtn: 'Finalizar e Enviar Avaliação',
    evalSubmitting: 'Corrigindo Avaliação...',
    evalAvailableSchedule: 'Esta avaliação estará disponível de acordo com o cronograma pedagógico de 3 meses do curso.',
  };

  const [data, setData] = useState<{
    module: CourseModule;
    video: VideoLesson | null;
    apostila: Apostila | null;
    film: ModuleFilm | null;
    reading: ModuleReading | null;
    activities: any[];
    evaluation: any | null;
    submission: EvaluationSubmission | null;
  } | null>(null);

  const [activeTab, setActiveTab] = useState<
    'video' | 'apostila' | 'film' | 'reading' | 'activities' | 'eval'
  >('video');
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  // Evaluation form state inside module
  const [evalDetails, setEvalDetails] = useState<ModuleEvaluation | null>(null);
  const [answers, setAnswers] = useState<
    Record<string, { selectedOptionIndex?: number; discursiveText?: string }>
  >({});
  const [submittingEval, setSubmittingEval] = useState(false);
  const [evalSuccessMessage, setEvalSuccessMessage] = useState<string | null>(null);

  // Apostila fixação quiz state
  const [quizSelections, setQuizSelections] = useState<Record<number, number>>({});
  const [pdfViewTab, setPdfViewTab] = useState<'reader' | 'topics'>('reader');
  const [apostilaBlobUrl, setApostilaBlobUrl] = useState<string | null>(null);
  const [isReadingModalOpen, setIsReadingModalOpen] = useState(false);

  // Film video state
  const [filmCopied, setFilmCopied] = useState(false);
  const [showFilmPlayer, setShowFilmPlayer] = useState(true);
  const [bonusFilmCopied, setBonusFilmCopied] = useState(false);
  const [activeBonusPlayerId, setActiveBonusPlayerId] = useState<string | null>(null);
  const [selectedBonusVideoOption, setSelectedBonusVideoOption] = useState<Record<string, string>>({});
  const [selectedMainFilmOption, setSelectedMainFilmOption] = useState<string | null>(null);
  const [selectedFilmSubtitle, setSelectedFilmSubtitle] = useState<'pt' | 'en' | 'es' | 'fr' | 'off'>('pt');
  const [selectedBonusSubtitle, setSelectedBonusSubtitle] = useState<Record<string, 'pt' | 'en' | 'es' | 'fr' | 'off'>>({});
  const [mainFilmLineIndex, setMainFilmLineIndex] = useState(0);
  const [isMainFilmAutoPlay, setIsMainFilmAutoPlay] = useState(true);
  const [bonusLineIndices, setBonusLineIndices] = useState<Record<string, number>>({});
  const [bonusAutoPlay, setBonusAutoPlay] = useState<Record<string, boolean>>({});

  useEffect(() => {
    if (language === 'en') setSelectedFilmSubtitle('en');
    else if (language === 'es') setSelectedFilmSubtitle('es');
    else if (language === 'fr') setSelectedFilmSubtitle('fr');
    else setSelectedFilmSubtitle('pt');
  }, [language]);

  useEffect(() => {
    loadDetail();
  }, [moduleId]);

  const loadDetail = async () => {
    try {
      setLoading(true);
      setErrorMessage('');
      setApostilaBlobUrl(null);
      const res = await api.getStudentModuleDetail(moduleId);
      setData(res);

      try {
        const vBlob = await getVaultBlobUrl(moduleId);
        setApostilaBlobUrl(vBlob || null);
      } catch {
        setApostilaBlobUrl(null);
      }

      if (res.evaluation?.id) {
        try {
          const evalRes = await api.getStudentEvaluation(moduleId);
          setEvalDetails(evalRes.evaluation);
          if (evalRes.submission) {
            setData((prev) => (prev ? { ...prev, submission: evalRes.submission } : prev));
          }
        } catch {
          // Eval might be locked by calendar
        }
      }
    } catch (err: any) {
      setErrorMessage(err.message || 'Erro ao carregar detalhes do módulo.');
    } finally {
      setLoading(false);
    }
  };

  const handleToggleActivity = async (activityId: string) => {
    try {
      const res = await api.toggleActivity(activityId);
      setData((prev) => {
        if (!prev) return prev;
        return {
          ...prev,
          activities: prev.activities.map((a: any) =>
            a.id === activityId ? { ...a, completed: res.completed } : a
          ),
        };
      });
    } catch (err) {
      console.error(err);
    }
  };

  const handleEvalSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!data) return;

    try {
      setSubmittingEval(true);
      setErrorMessage('');
      const res = await api.submitEvaluation(moduleId, answers);
      setData((prev) => (prev ? { ...prev, submission: res.submission } : null));
      setEvalSuccessMessage(`AVALIAÇÃO CONCLUÍDA\nNOTA: ${(res.submission.totalScore || 0).toFixed(1).replace('.', ',')} / 10`);
    } catch (err: any) {
      setErrorMessage(err.message || 'Erro ao enviar avaliação.');
    } finally {
      setSubmittingEval(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center text-neutral-500 font-mono text-xs">
        {tMod.loading}0{moduleId}...
      </div>
    );
  }

  if (errorMessage && !data) {
    return (
      <div className="max-w-xl mx-auto px-4 py-20 text-center text-neutral-200">
        <div className="p-8 rounded-3xl bg-neutral-900 border border-neutral-800 space-y-4">
          <Lock className="w-12 h-12 text-amber-400 mx-auto" />
          <h2 className="text-xl font-bold text-white">{tMod.unavailable}</h2>
          <p className="text-xs text-neutral-400">{errorMessage || tMod.lockedDesc}</p>
          <button
            onClick={() => onNavigate('minha-area')}
            className="px-6 py-2.5 bg-neutral-800 hover:bg-neutral-700 text-white rounded-xl text-xs font-semibold"
          >
            {tMod.backDashboard}
          </button>
        </div>
      </div>
    );
  }

  if (!data) return null;

  const { module: m, video, apostila, film, reading, activities, evaluation, submission } = data;

  const curTrans = currentTranslation as any;
  const effectiveDirectorObjectives =
    curTrans.directorObjectives && curTrans.directorObjectives.length > 0
      ? curTrans.directorObjectives
      : m.directorObjectives;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 text-neutral-200 space-y-8 animate-fadeIn">
      {/* Back button */}
      <button
        onClick={() => onNavigate('minha-area')}
        className="inline-flex items-center gap-2 text-xs font-mono text-neutral-400 hover:text-white transition-colors cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>{tMod.backDashboard}</span>
      </button>

      {/* Module Header Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-neutral-900 via-[#12141c] to-neutral-900 border border-neutral-800 space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2 font-mono text-xs">
            <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-400 font-bold border border-amber-500/40">
              {tMod.stagePrefix} 0{m.number} {tMod.ofTen}
            </span>
            <span className="text-neutral-400">{tMod.durationLabel}</span>
          </div>
          <span className="text-xs font-mono px-2.5 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800 font-bold">
            {tMod.unlockedBadge}
          </span>
        </div>

        <div>
          <h1 className="text-2xl sm:text-4xl font-display font-extrabold text-white">
            {currentTranslation.title || m.title}
          </h1>
          <p className="text-xs sm:text-sm text-amber-300/90 font-medium mt-1">
            {currentTranslation.subtitle || m.subtitle}
          </p>
        </div>

        {/* Pedagogical Objectives & Syllabus */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
          {(curTrans.pedagogicalObjective || m.pedagogicalObjective) && (
            <div className="p-4 rounded-2xl bg-black/40 border border-neutral-800/80 space-y-2">
              <div className="flex items-center gap-2 text-amber-400 font-mono text-xs font-bold">
                <Compass className="w-4 h-4" />
                <span>{tMod.pedagogicalObjective}</span>
              </div>
              <p className="text-xs text-neutral-300 leading-relaxed">
                {curTrans.pedagogicalObjective || m.pedagogicalObjective}
              </p>
            </div>
          )}

          {effectiveDirectorObjectives && effectiveDirectorObjectives.length > 0 && (
            <div className="p-4 rounded-2xl bg-black/40 border border-neutral-800/80 space-y-2">
              <div className="flex items-center gap-2 text-emerald-400 font-mono text-xs font-bold">
                <ListChecks className="w-4 h-4" />
                <span>{tMod.directorObjectives}</span>
              </div>
              <ul className="text-xs text-neutral-300 space-y-1 list-disc list-inside">
                {effectiveDirectorObjectives.map((obj: string, idx: number) => (
                  <li key={idx}>{obj}</li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Tab Selector */}
        <div className="flex items-center gap-2 pt-4 border-t border-neutral-800 overflow-x-auto scrollbar-none">
          <button
            onClick={() => setActiveTab('video')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'video'
                ? 'bg-amber-500 text-neutral-950 font-bold shadow-md shadow-amber-500/20'
                : 'bg-neutral-800/60 text-neutral-300 hover:bg-neutral-800'
            }`}
          >
            <Film className="w-4 h-4" />
            <span>{tMod.tabVideo}</span>
          </button>

          <button
            onClick={() => setActiveTab('apostila')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'apostila'
                ? 'bg-amber-500 text-neutral-950 font-bold shadow-md shadow-amber-500/20'
                : 'bg-neutral-800/60 text-neutral-300 hover:bg-neutral-800'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>{tMod.tabApostila}</span>
          </button>

          <button
            onClick={() => setActiveTab('film')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'film'
                ? 'bg-amber-500 text-neutral-950 font-bold shadow-md shadow-amber-500/20'
                : 'bg-neutral-800/60 text-neutral-300 hover:bg-neutral-800'
            }`}
          >
            <Play className="w-4 h-4" />
            <span>
              {data?.bonusFilms && data.bonusFilms.length > 0
                ? `${tMod.tabFilm} & Extra (${1 + data.bonusFilms.length})`
                : tMod.tabFilm}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('reading')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'reading'
                ? 'bg-amber-500 text-neutral-950 font-bold shadow-md shadow-amber-500/20'
                : 'bg-neutral-800/60 text-neutral-300 hover:bg-neutral-800'
            }`}
          >
            <BookmarkCheck className="w-4 h-4" />
            <span>{tMod.tabReading}</span>
          </button>

          <button
            onClick={() => setActiveTab('activities')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'activities'
                ? 'bg-amber-500 text-neutral-950 font-bold shadow-md shadow-amber-500/20'
                : 'bg-neutral-800/60 text-neutral-300 hover:bg-neutral-800'
            }`}
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>{tMod.tabActivities} ({activities?.length || 0})</span>
          </button>

          <button
            onClick={() => setActiveTab('eval')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'eval'
                ? 'bg-amber-500 text-neutral-950 font-bold shadow-md shadow-amber-500/20'
                : 'bg-neutral-800/60 text-neutral-300 hover:bg-neutral-800'
            }`}
          >
            <FileCheck className="w-4 h-4" />
            <span>{tMod.tabEval}</span>
          </button>
        </div>
      </div>

      {/* TAB 1: VIDEO */}
      {activeTab === 'video' && video && (
        <div className="space-y-6">
          <div className="bg-neutral-900 border border-neutral-800 rounded-3xl overflow-hidden shadow-xl">
            {(() => {
              const embed = parseVideoEmbed(video.videoUrl);
              return (
                <div>
                  {/* Top Player Action Bar */}
                  <div className="px-6 py-3 bg-neutral-950/80 border-b border-neutral-800/80 flex items-center justify-between flex-wrap gap-2 text-xs">
                    <div className="flex items-center gap-2 text-neutral-300">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                      <span className="font-mono text-neutral-400">Player Masterclass:</span>
                      <span className="font-semibold text-white">{embed?.platformLabel || 'Vídeo Integrado'}</span>
                    </div>
                    {embed?.externalWatchUrl && (
                      <a
                        href={embed.externalWatchUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-amber-300 hover:text-amber-200 transition font-mono text-[11px] font-medium"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        Abrir em Nova Aba / YouTube
                      </a>
                    )}
                  </div>

                  <div className="aspect-video bg-black relative">
                    {embed && (embed.type === 'youtube' || embed.type === 'vimeo' || embed.type === 'archive') ? (
                      <iframe
                        src={embed.embedUrl}
                        title={video.title}
                        className="w-full h-full border-0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                      />
                    ) : (
                      <video
                        controls
                        playsInline
                        className="w-full h-full object-contain"
                        poster={video.thumbnailUrl}
                        src={embed?.embedUrl || video.videoUrl}
                      >
                        Seu navegador não suporta reprodução de vídeo.
                      </video>
                    )}
                  </div>
                </div>
              );
            })()}
            <div className="p-6 sm:p-8 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-amber-400 font-bold">
                  MASTERCLASS 0{video.moduleId} • {video.durationMinutes} MINUTOS
                </span>
                <span className="text-xs font-mono text-neutral-400">Professor Tony de Luc</span>
              </div>
              <h3 className="text-xl font-bold text-white">{video.title}</h3>
              <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">{video.description}</p>
              {video.professorNotes && (
                <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800 text-xs text-neutral-300 italic">
                  <strong className="text-amber-400 not-italic block font-mono mb-1">
                    Comentário do Professor Tony de Luc:
                  </strong>
                  "{video.professorNotes}"
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: APOSTILA (Online Only Reader + 5-Question Quiz) */}
      {activeTab === 'apostila' && apostila && (
        <div className="p-6 sm:p-10 rounded-3xl bg-neutral-900 border border-neutral-800 space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-800 pb-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-mono text-amber-400 font-bold">MATERIAL DIDÁTICO OFICIAL</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-amber-500/10 text-amber-300 border border-amber-500/30 flex items-center gap-1">
                  <Shield className="w-3 h-3 text-amber-400" />
                  {t('apostila.protectedNotice', 'Leitura Exclusiva na Plataforma • Sem Download')}
                </span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white">
                {language === 'pt' ? apostila.title : (currentTranslation.title || apostila.title)}
              </h3>
              <p className="text-xs text-neutral-400">
                {apostila.pagesCount || apostila.totalPages || 30} {t('apostila.pages', 'páginas didáticas reais')} de estudo, decupagens e gramática do filme
                {apostila.fileSizeMb ? ` • ${apostila.fileSizeMb} MB` : ''}
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2 shrink-0">
              <LanguageSelector compact />
            </div>
          </div>

          <div className="p-4 rounded-xl bg-amber-950/20 border-l-4 border-amber-500 text-xs text-amber-200">
            <strong className="block text-amber-400 font-bold mb-1">{t('apostila.summaryTitle', 'RESUMO DA ETAPA:')}</strong>
            {language === 'pt' ? apostila.summary : (currentTranslation.apostilaSummary || apostila.summary)}
          </div>

          {/* Toggle entre Leitor do PDF Oficial e Ementa Textual quando houver PDF */}
          {apostila.pdfUrl && (
            <div className="flex items-center gap-2 border-b border-neutral-800 pb-2">
              <button
                onClick={() => setPdfViewTab('reader')}
                className={`px-4 py-2 rounded-xl text-xs font-bold font-sans flex items-center gap-2 cursor-pointer transition-all ${
                  pdfViewTab === 'reader'
                    ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40'
                    : 'text-neutral-400 hover:text-white hover:bg-neutral-800'
                }`}
              >
                <FileText className="w-4 h-4" />
                <span>{t('apostila.readerTab', 'Leitor da Apostila Oficial')}</span>
              </button>
              <button
                onClick={() => setPdfViewTab('topics')}
                className={`px-4 py-2 rounded-xl text-xs font-bold font-sans flex items-center gap-2 cursor-pointer transition-all ${
                  pdfViewTab === 'topics'
                    ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40'
                    : 'text-neutral-400 hover:text-white hover:bg-neutral-800'
                }`}
              >
                <BookOpen className="w-4 h-4" />
                <span>{t('apostila.topicsTab', 'Ementa & Conteúdo Traduzido')}</span>
              </button>
            </div>
          )}

          {/* 1. VISUALIZADOR EMBUTIDO DO PDF OFICIAL */}
          {apostila.pdfUrl && pdfViewTab === 'reader' && (
            <div className="space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-3 bg-neutral-950 rounded-xl border border-neutral-800 text-xs font-mono text-neutral-400">
                <span className="flex items-center gap-2 text-neutral-200 font-medium truncate">
                  <FileText className="w-4 h-4 text-amber-400 shrink-0" />
                  <span className="truncate">Apostila: {apostila.pdfUrl.split('/').pop()}</span>
                </span>
                <span className="text-amber-400 shrink-0 font-bold">
                  {apostila.pagesCount || apostila.totalPages || ((apostila.number || apostila.moduleId || moduleId) === 1 ? 8 : ((apostila.number || apostila.moduleId || moduleId) === 5 ? 6 : 4))} páginas didáticas reais (Leitura Online)
                </span>
              </div>

              {/* PDF Viewer Frame - Protected online reading with real-time translation */}
              <div className="w-full h-[750px] sm:h-[850px] bg-neutral-950 rounded-2xl border border-neutral-700 overflow-hidden relative shadow-2xl">
                <ProtectedPdfViewer
                  url={apostilaBlobUrl || apostila.pdfUrl || `/materiais/cinelab-apostila-${(apostila.number || apostila.moduleId || moduleId) < 10 ? '0' + (apostila.number || apostila.moduleId || moduleId) : (apostila.number || apostila.moduleId || moduleId)}.pdf`}
                  title={apostila.title}
                  moduleId={apostila.number || apostila.moduleId || moduleId}
                  onFallbackToText={() => setPdfViewTab('topics')}
                />
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-3 bg-neutral-950/60 rounded-xl border border-neutral-800/80 text-[11px] text-neutral-400 font-mono">
                <span className="flex items-center gap-1.5 text-amber-300">
                  <Shield className="w-3.5 h-3.5 text-amber-400" />
                  <span>Leitura protegida no navegador CineLab. Download desativado por direitos autorais.</span>
                </span>
                <span className="text-neutral-500">
                  Total: {apostila.pagesCount || apostila.totalPages || ((apostila.number || apostila.moduleId || moduleId) === 1 ? 8 : ((apostila.number || apostila.moduleId || moduleId) === 5 ? 6 : 4))} páginas oficiais
                </span>
              </div>
            </div>
          )}

          {/* 2. TÓPICOS DIDÁTICOS E EMENTA TEXTUAL */}
          {(!apostila.pdfUrl || pdfViewTab === 'topics') && (
            <>
              {apostila.sections && apostila.sections.length > 0 ? (
                <div className="space-y-6">
                  {getTranslatedApostilaSections(apostila.sections, apostila.number || apostila.moduleId || moduleId, language).map((sec, sIdx) => (
                    <div key={sec.id || sIdx} className="p-6 rounded-2xl bg-black/40 border border-neutral-800/80 space-y-3">
                      <div className="flex items-center gap-2">
                        <span className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-400 font-mono text-xs flex items-center justify-center font-bold">
                          {sIdx + 1}
                        </span>
                        <h4 className="text-base font-bold text-white font-display">{sec.title}</h4>
                      </div>
                      <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed whitespace-pre-line">
                        {sec.content || sec.contentMarkdown}
                      </p>
                      {(sec.keyTakeaway || sec.tonyNotes) && (
                        <div className="p-3 rounded-lg bg-amber-950/30 border border-amber-500/30 text-amber-300 text-xs">
                          <strong className="font-mono uppercase text-amber-400">
                            {language === 'fr'
                              ? 'Point Clé de Réalisation : '
                              : language === 'es'
                              ? 'Punto Clave de Dirección: '
                              : language === 'en'
                              ? "Director's Key Takeaway: "
                              : 'Ponto Chave de Direção: '}
                          </strong>
                          {sec.keyTakeaway || sec.tonyNotes}
                        </div>
                      )}
                      {sec.bulletPoints && sec.bulletPoints.length > 0 && (
                        <ul className="list-disc list-inside text-xs text-neutral-400 space-y-1 pt-1">
                          {sec.bulletPoints.map((bp, bpIdx) => (
                            <li key={bpIdx}>{bp}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-xs text-neutral-300 leading-relaxed whitespace-pre-line">
                  {apostila.contentMarkdown}
                </div>
              )}
            </>
          )}

          {/* Quiz de Fixação da Apostila (5 questões) */}
          {apostila.quiz && apostila.quiz.length > 0 && (
            <div className="pt-8 border-t border-neutral-800 space-y-6">
              <div className="p-5 rounded-2xl bg-amber-500/10 border border-amber-500/30 space-y-2">
                <div className="flex items-center gap-2 text-amber-400 font-mono text-xs font-bold">
                  <Sparkles className="w-4 h-4" />
                  <span>QUIZ DE FIXAÇÃO DA APOSTILA (5 QUESTÕES)</span>
                </div>
                <p className="text-xs text-neutral-300 leading-relaxed">
                  Este quiz serve exclusivamente para fixação dos conceitos fundamentais da apostila.
                  <strong className="text-amber-300 font-bold block mt-1">
                    Aviso: Ele NÃO substitui a avaliação oficial do módulo.
                  </strong>
                </p>
              </div>

              <div className="space-y-4">
                {apostila.quiz.map((q, qIdx) => {
                  const selectedIdx = quizSelections[qIdx];
                  const hasAnswered = selectedIdx !== undefined;

                  return (
                    <div key={q.id || qIdx} className="p-5 sm:p-6 rounded-2xl bg-neutral-950 border border-neutral-800 space-y-3">
                      <div className="flex items-center justify-between text-xs font-mono">
                        <span className="text-amber-400 font-bold">QUESTÃO FIXAÇÃO 0{qIdx + 1} DE 5</span>
                      </div>
                      <p className="text-xs sm:text-sm font-semibold text-white">{q.question}</p>
                      
                      <div className="space-y-2 pt-1">
                        {q.options.map((opt, oIdx) => {
                          const isOptionCorrect = oIdx === q.correctAnswerIndex;
                          const isOptionSelected = selectedIdx === oIdx;

                          return (
                            <button
                              type="button"
                              key={oIdx}
                              onClick={() => setQuizSelections((prev) => ({ ...prev, [qIdx]: oIdx }))}
                              className={`w-full text-left p-3 rounded-xl border text-xs leading-relaxed transition-all cursor-pointer ${
                                hasAnswered
                                  ? isOptionCorrect
                                    ? 'bg-emerald-950/40 border-emerald-500/60 text-emerald-200 font-medium'
                                    : isOptionSelected
                                    ? 'bg-rose-950/40 border-rose-500/60 text-rose-200'
                                    : 'bg-neutral-900/40 border-neutral-800 text-neutral-500'
                                  : 'bg-neutral-900 border-neutral-800 text-neutral-300 hover:border-neutral-700'
                              }`}
                            >
                              <div className="flex items-start gap-2">
                                <span className="font-mono font-bold text-neutral-400">
                                  {String.fromCharCode(65 + oIdx)})
                                </span>
                                <span>{opt}</span>
                                {hasAnswered && isOptionCorrect && (
                                  <span className="ml-auto text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-900 text-emerald-300 font-bold">
                                    CORRETA
                                  </span>
                                )}
                              </div>
                            </button>
                          );
                        })}
                      </div>

                      {hasAnswered && q.explanation && (
                        <div className="p-3 rounded-lg bg-[#12141c] border border-neutral-800 text-xs text-neutral-400 leading-relaxed">
                          <strong className="text-amber-400 block font-mono text-[11px] mb-0.5">Explicação Didática:</strong>
                          {q.explanation}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}

      {/* TAB 3: FILME RECOMENDADO & BÔNUS EXTRA */}
      {activeTab === 'film' && (
        <div className="space-y-8">
          {film && (() => {
            const chosenOption = film.videoOptions?.find(
              (opt) => opt.id === (selectedMainFilmOption || film.videoOptions?.[0]?.id)
            );
            let activeVideoUrl = chosenOption?.url || film.watchUrl || film.streamingUrl || '';
            const platformName = chosenOption?.platformName || film.platform || film.streamingPlatform || 'Online / YouTube';
            const currentDuration = chosenOption?.duration || film.duration || `${film.durationMinutes || 90} min`;
            const isStreaming = chosenOption?.isStreaming || false;

            let embed = parseVideoEmbed(activeVideoUrl, selectedFilmSubtitle);
            if (!embed) {
              const playableOpt = film.videoOptions?.find((opt) => !opt.isStreaming && parseVideoEmbed(opt.url));
              if (playableOpt) {
                activeVideoUrl = playableOpt.url;
                embed = parseVideoEmbed(activeVideoUrl, selectedFilmSubtitle);
              } else if (film.watchUrl && parseVideoEmbed(film.watchUrl)) {
                activeVideoUrl = film.watchUrl;
                embed = parseVideoEmbed(activeVideoUrl, selectedFilmSubtitle);
              }
            }

            const tf = getFilmTranslation(film);

            return (
              <div className="p-6 sm:p-10 rounded-3xl bg-neutral-900 border border-neutral-800 space-y-6 shadow-xl">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-800 pb-4">
                  <div>
                    <span className="text-xs font-mono text-amber-400 font-bold">{tMod.cinematecaTitle || 'CINEMATECA OBRIGATÓRIA'}</span>
                    <h3 className="text-2xl font-bold text-white font-display">{tf.title}</h3>
                    {film.originalTitle && film.originalTitle !== tf.title && (
                      <p className="text-xs text-neutral-400 italic">{tMod.originalTitleLabel || 'Título Original:'} {film.originalTitle}</p>
                    )}
                    {(tf.audioTrackLabel || film.audioTrackLabel || film.audioTrack) && (
                      <div className="mt-2 flex flex-wrap gap-2">
                        <span
                          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-mono font-semibold border ${
                            film.audioTrack === 'dublado_pt'
                              ? 'bg-cyan-950/70 border-cyan-500/50 text-cyan-300'
                              : film.audioTrack === 'original_pt'
                              ? 'bg-emerald-950/70 border-emerald-500/50 text-emerald-300'
                              : film.audioTrack === 'mudo'
                              ? 'bg-amber-950/70 border-amber-500/50 text-amber-300'
                              : 'bg-purple-950/70 border-purple-500/50 text-purple-300'
                          }`}
                        >
                          <Volume2 className="w-3.5 h-3.5 shrink-0" />
                          <span>
                            {tf.audioTrackLabel ||
                              film.audioTrackLabel ||
                              (film.audioTrack === 'dublado_pt'
                                ? '🎙️ Filme Completo Dublado em Português'
                                : film.audioTrack === 'original_pt'
                                ? '🇧🇷 Áudio Original em Português'
                                : film.audioTrack === 'mudo'
                                ? '🎼 Cinema Mudo • Trilha Orquestral'
                                : '💬 Legendado em Português')}
                          </span>
                        </span>

                        {/* Multilingual Subtitles Available Badge */}
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-mono font-semibold bg-neutral-950 border border-neutral-800 text-neutral-300">
                          <Subtitles className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                          <span>Legendas:</span>
                          <span className="text-purple-300 font-bold">
                            {film.availableSubtitles && film.availableSubtitles.length > 0
                              ? film.availableSubtitles.map((s) => s.toUpperCase()).join(' • ')
                              : 'PT • EN • ES • FR'}
                          </span>
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 rounded-full bg-neutral-800 text-amber-300 border border-neutral-700 font-mono text-xs font-semibold">
                      {film.year} • {film.director} • ⏱️ {chosenOption?.duration ? `Cena/Versão: ${chosenOption.duration}` : currentDuration}
                    </span>
                  </div>
                </div>

                {/* Video Options Selector Bar if multiple versions/options exist */}
                {film.videoOptions && film.videoOptions.length > 0 && (
                  <div className="p-3.5 sm:p-4 rounded-2xl bg-neutral-950 border border-neutral-800 space-y-2">
                    <div className="flex flex-wrap items-center justify-between text-xs font-mono text-neutral-400 gap-2">
                      <span className="flex items-center gap-1.5 text-amber-400 font-semibold">
                        <Tv className="w-3.5 h-3.5" />
                        <span>Selecione a Versão ou Recorte Pedagógico:</span>
                      </span>
                      <span className="text-[11px] bg-neutral-900 px-2 py-0.5 rounded border border-neutral-800">
                        Tempo do vídeo selecionado: <strong className="text-amber-300">{chosenOption?.duration || currentDuration}</strong>
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-2 pt-1">
                      {film.videoOptions.map((opt) => {
                        const isSelected = (selectedMainFilmOption || film.videoOptions?.[0]?.id) === opt.id;
                        return (
                          <button
                            key={opt.id}
                            type="button"
                            onClick={() => setSelectedMainFilmOption(opt.id)}
                            className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all cursor-pointer flex items-center gap-1.5 ${
                              isSelected
                                ? 'bg-amber-500 text-neutral-950 font-bold shadow-md shadow-amber-500/20'
                                : 'bg-neutral-800 text-neutral-300 hover:text-white border border-neutral-700'
                            }`}
                          >
                            <span>{opt.label}</span>
                            {opt.badge && (
                              <span
                                className={`text-[10px] px-1.5 py-0.2 rounded font-mono font-semibold ${
                                  isSelected ? 'bg-neutral-900 text-amber-300' : 'bg-neutral-900/80 text-amber-400'
                                }`}
                              >
                                {opt.badge}
                              </span>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Streaming notification banner if user selected streaming option */}
                {isStreaming && (
                  <div className="px-4 py-3 bg-gradient-to-r from-neutral-950 via-cyan-950/60 to-neutral-950 border border-cyan-500/40 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs shadow-lg">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse shrink-0" />
                      <div>
                        <span className="font-semibold text-white">Filme Completo em {chosenOption?.platformName || 'Streaming Oficial'}:</span>
                        <span className="text-neutral-300 ml-1.5 hidden sm:inline">Disponível nos canais comerciais ({chosenOption?.duration || '116 min'}). Player integrado abaixo executando cena em estudo com legendas sincronizadas.</span>
                      </div>
                    </div>
                    <a
                      href={chosenOption?.url || activeVideoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-neutral-950 font-bold text-xs font-mono transition-all shrink-0 cursor-pointer shadow-md shadow-cyan-500/20"
                    >
                      <span>Abrir no {chosenOption?.platformName || 'Streaming'}</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                )}

                {/* Integrated Film Video Player (ALWAYS VISIBLE & PLAYABLE) */}
                <div className="space-y-4">
                  {/* Multilingual Accessibility Controls: Dubbing & Subtitles */}
                  <div className="px-4 py-3 bg-neutral-950 rounded-2xl border border-neutral-800 space-y-2.5">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                      <div className="flex items-center gap-2">
                        <Volume2 className="w-3.5 h-3.5 text-cyan-400" />
                        <span className="text-neutral-400 font-mono text-[11px] font-semibold">Áudio:</span>
                        <span className="text-cyan-300 font-mono text-[11px] font-bold">
                          {film.audioTrack === 'dublado_pt'
                            ? '🎙️ Dublado em Português'
                            : film.audioTrack === 'original_pt'
                            ? '🇧🇷 Áudio Original em Português'
                            : film.audioTrack === 'mudo'
                            ? '🎼 Cinema Mudo (Trilha Sonora)'
                            : '🔊 Áudio Original Estrangeiro'}
                        </span>
                      </div>

                      <div className="flex flex-wrap items-center gap-1.5">
                        <Subtitles className="w-3.5 h-3.5 text-purple-400" />
                        <span className="text-neutral-400 font-mono text-[11px] font-semibold">Legendas (CC):</span>
                        <div className="flex items-center gap-1">
                          {[
                            { code: 'pt' as const, label: '🇧🇷 PT', name: 'Português' },
                            { code: 'en' as const, label: '🇺🇸 EN', name: 'English' },
                            { code: 'es' as const, label: '🇪🇸 ES', name: 'Español' },
                            { code: 'fr' as const, label: '🇫🇷 FR', name: 'Français' },
                            { code: 'off' as const, label: '🔕 Off', name: 'Sem Legenda' },
                          ].map((sub) => {
                            const isActive = selectedFilmSubtitle === sub.code;
                            const isStudentLang = language === sub.code;
                            return (
                              <button
                                key={sub.code}
                                type="button"
                                onClick={() => setSelectedFilmSubtitle(sub.code)}
                                title={`${sub.name}${isStudentLang ? ' (Língua da sua interface)' : ''}`}
                                className={`px-2.5 py-1 rounded-md text-[11px] font-mono transition-all cursor-pointer flex items-center gap-1 ${
                                  isActive
                                    ? 'bg-purple-600 text-white font-bold ring-2 ring-purple-400/50 shadow'
                                    : 'bg-neutral-800 text-neutral-300 hover:text-white hover:bg-neutral-700'
                                }`}
                              >
                                <span>{sub.label}</span>
                                {isStudentLang && <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    </div>

                    {/* Subtitle Notice below the languages - wraps cleanly, zero cutoff */}
                    <div className="w-full text-xs text-neutral-200 bg-neutral-900/95 px-4 py-3 rounded-xl border border-purple-500/30 font-sans leading-relaxed break-words flex items-start gap-2.5">
                      <Info className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                      <div className="space-y-0.5">
                        <p className="font-semibold text-purple-300 font-mono text-[11px] uppercase tracking-wide">
                          💬 Áudio & Legendas Multilíngues Sincronizadas:
                        </p>
                        <p className="text-neutral-300 text-xs">
                          O player está pronto com áudio e controles nativos completos. Acompanhe a decupagem pedagógica da cena e todas as falas traduzidas no painel de roteiro sincronizado logo abaixo do vídeo.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Top Player Action Bar */}
                  <div className="flex items-center justify-between flex-wrap gap-2 px-4 py-2.5 rounded-xl bg-neutral-950 border border-neutral-800 text-xs">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                      <span className="text-neutral-400 font-mono">Fonte Ativa:</span>
                      <span className="font-semibold text-white">{embed?.platformLabel || platformName}</span>
                    </div>
                    {embed?.externalWatchUrl && (
                      <a
                        href={embed.externalWatchUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-amber-300 hover:text-amber-200 transition font-mono text-[11px] font-medium"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        Abrir em Nova Aba / {embed.platformLabel}
                      </a>
                    )}
                  </div>

                  <div className="rounded-2xl overflow-hidden border border-neutral-800 bg-black aspect-video w-full shadow-2xl relative">
                    {embed && (embed.type === 'youtube' || embed.type === 'vimeo' || embed.type === 'archive') ? (
                      <iframe
                        key={`${embed.embedUrl}-${selectedFilmSubtitle}`}
                        src={embed.embedUrl}
                        title={film.title}
                        className="w-full h-full border-0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                      />
                    ) : (
                      <video
                        src={embed?.embedUrl || activeVideoUrl}
                        controls
                        playsInline
                        className="w-full h-full object-contain"
                      >
                        Seu navegador não suporta reprodução de vídeo.
                      </video>
                    )}
                  </div>

                  {/* Multilingual Pedagogical Transcript & Subtitle Study Component */}
                  <div className="rounded-2xl overflow-hidden border border-neutral-800 bg-neutral-950 p-2 sm:p-4">
                    <FilmSubtitleTranscriptViewer
                      filmId={film.id}
                      selectedSubtitle={selectedFilmSubtitle}
                      onSelectSubtitle={setSelectedFilmSubtitle}
                      studentLanguage={language}
                      filmTitle={film.title}
                      currentOption={chosenOption}
                      activeLineIndex={mainFilmLineIndex}
                      setActiveLineIndex={setMainFilmLineIndex}
                      isAutoPlay={isMainFilmAutoPlay}
                      setIsAutoPlay={setIsMainFilmAutoPlay}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="md:col-span-2 space-y-4">
                    <div>
                      <h4 className="text-xs font-mono text-amber-400 font-bold uppercase mb-1">{tMod.synopsisTitle || 'Sinopse da Obra:'}</h4>
                      <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">{tf.synopsis || film.synopsis}</p>
                    </div>

                    <div className="p-4 rounded-2xl bg-amber-950/20 border-l-4 border-amber-500 space-y-1">
                      <h4 className="text-xs font-mono text-amber-400 font-bold uppercase">{tMod.whyWatchTitle || 'Por Que o Aluno Deve Assistir:'}</h4>
                      <p className="text-xs sm:text-sm text-amber-100 leading-relaxed">{tf.whyWatch || film.whyWatch}</p>
                    </div>

                    {(tf.whatToObserve || film.whatToObserve) && (
                      <div className="p-4 rounded-2xl bg-neutral-950 border border-neutral-800 space-y-1 text-xs">
                        <h4 className="font-mono text-amber-400 font-bold uppercase flex items-center gap-1.5">
                          <Eye className="w-3.5 h-3.5" />
                          <span>{tMod.whatToObserveTitle || 'O Que Observar com Olhar de Realizador:'}</span>
                        </h4>
                        <p className="text-neutral-300 leading-relaxed">{tf.whatToObserve || film.whatToObserve}</p>
                      </div>
                    )}

                    {(tf.observationActivity || film.observationActivity) && (
                      <div className="p-4 rounded-2xl bg-neutral-950 border border-neutral-800 space-y-1 text-xs">
                        <h4 className="font-mono text-emerald-400 font-bold uppercase flex items-center gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Exercício de Análise do Filme:</span>
                        </h4>
                        <p className="text-neutral-300 leading-relaxed">{tf.observationActivity || film.observationActivity}</p>
                      </div>
                    )}

                    {/* VÍDEO INDICADO & URL */}
                    <div className="p-4 rounded-2xl bg-neutral-950 border border-neutral-800 space-y-3">
                      <div className="flex items-center justify-between gap-2">
                        <div>
                          <span className="text-[11px] font-mono text-neutral-400 block">Vídeo Indicado & Plataforma:</span>
                          <strong className="text-xs text-white font-semibold">{platformName}</strong>
                        </div>

                        <div className="flex items-center gap-2">
                          {activeVideoUrl && (
                            <a
                              href={activeVideoUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="px-4 py-2 bg-neutral-800 hover:bg-neutral-700 text-amber-300 hover:text-amber-200 border border-neutral-700 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                            >
                              <ExternalLink className="w-3.5 h-3.5" />
                              <span>Abrir em Nova Aba</span>
                            </a>
                          )}
                        </div>
                      </div>

                      {activeVideoUrl && (
                        <div className="flex items-center gap-2 p-2 rounded-xl bg-neutral-900 border border-neutral-800 text-[11px] font-mono">
                          <span className="text-amber-400 font-bold shrink-0">URL:</span>
                          <span className="truncate flex-1 text-neutral-300 select-all">{activeVideoUrl}</span>
                          <button
                            type="button"
                            onClick={() => {
                              navigator.clipboard.writeText(activeVideoUrl);
                              setFilmCopied(true);
                              setTimeout(() => setFilmCopied(false), 2000);
                            }}
                            className="p-1 rounded hover:bg-neutral-800 text-neutral-400 hover:text-amber-400 transition-colors cursor-pointer shrink-0"
                            title="Copiar URL"
                          >
                            {filmCopied ? (
                              <Check className="w-3.5 h-3.5 text-emerald-400" />
                            ) : (
                              <Copy className="w-3.5 h-3.5" />
                            )}
                          </button>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="p-5 rounded-2xl bg-neutral-950 border border-neutral-800 space-y-3 font-mono text-xs">
                      <div className="text-amber-400 font-bold border-b border-neutral-800 pb-2">FICHA TÉCNICA</div>
                      <div className="flex justify-between text-neutral-400">
                        <span>Direção:</span>
                        <span className="text-white font-semibold">{film.director}</span>
                      </div>
                      <div className="flex justify-between text-neutral-400">
                        <span>Ano:</span>
                        <span className="text-white font-semibold">{film.year}</span>
                      </div>
                      {film.country && (
                        <div className="flex justify-between text-neutral-400">
                          <span>País:</span>
                          <span className="text-white font-semibold">{film.country}</span>
                        </div>
                      )}
                      <div className="flex justify-between text-neutral-400">
                        <span>Duração:</span>
                        <span className="text-white font-semibold">{currentDuration}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })()}

          {/* FILMES BÔNUS EXTRA (Ex: Herói e A Noite Americana) */}
          {data?.bonusFilms && data.bonusFilms.map((bonusFilm) => {
            const chosenOption = bonusFilm.videoOptions?.find(
              (opt) => opt.id === (selectedBonusVideoOption[bonusFilm.id] || bonusFilm.videoOptions?.[0]?.id)
            );
            const bVideoUrl = chosenOption?.url || bonusFilm.watchUrl || bonusFilm.streamingUrl || '';
            const bPlatform = chosenOption?.platformName || bonusFilm.platform || bonusFilm.streamingPlatform || 'Online / YouTube';
            const bIsStreaming = chosenOption?.isStreaming || false;

            const currentBonusSub = selectedBonusSubtitle[bonusFilm.id] || selectedFilmSubtitle;

            // Study fallback URL for player embed (scene or study clip)
            const studyFallbackUrl = bonusFilm.videoOptions?.find((o) => !o.isStreaming)?.url || bonusFilm.watchUrl || '';
            const effectiveBonusVideoUrl = bIsStreaming ? studyFallbackUrl : bVideoUrl;

            const bEmbed = parseVideoEmbed(effectiveBonusVideoUrl, currentBonusSub);
            const isBonusPlayerOpen = activeBonusPlayerId !== 'closed-' + bonusFilm.id;

            return (
              <div
                key={bonusFilm.id}
                id={`bonus-film-card-${bonusFilm.id}`}
                className="p-6 sm:p-10 rounded-3xl bg-neutral-900/90 border-2 border-amber-500/40 space-y-6 shadow-2xl relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-800 pb-4">
                  <div>
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <span className="px-2.5 py-0.5 rounded bg-amber-500/20 text-amber-300 font-mono text-[11px] font-bold border border-amber-500/40 flex items-center gap-1.5">
                        <Sparkles className="w-3 h-3 text-amber-400" />
                        <span>{bonusFilm.badge || 'VÍDEO EXTRA • RECURSO PEDAGÓGICO'}</span>
                      </span>
                      {bonusFilm.audioTrackLabel && (
                        <span className="px-2.5 py-0.5 rounded bg-cyan-950/70 border border-cyan-500/40 text-cyan-300 font-mono text-[11px] font-semibold flex items-center gap-1">
                          <Volume2 className="w-3 h-3 text-cyan-400" />
                          <span>{bonusFilm.audioTrackLabel}</span>
                        </span>
                      )}
                    </div>
                    <h3 className="text-2xl font-bold text-white font-display">{bonusFilm.title}</h3>
                    {bonusFilm.originalTitle && bonusFilm.originalTitle !== bonusFilm.title && (
                      <p className="text-xs text-neutral-400 italic">Título Original: {bonusFilm.originalTitle}</p>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 rounded-full bg-neutral-800 text-neutral-300 font-mono text-xs">
                      {bonusFilm.year} • {bonusFilm.director} • {chosenOption?.duration ? `Cena selecionada: ${chosenOption.duration}` : (bonusFilm.duration || `${bonusFilm.durationMinutes || 99} min`)}
                    </span>
                  </div>
                </div>

                {/* In-page Embedded Player or Streaming Notice when toggled (OPEN BY DEFAULT) */}
                {isBonusPlayerOpen && (
                  <div className="space-y-4">
                    {bIsStreaming && (
                      <div className="rounded-2xl p-5 sm:p-6 bg-gradient-to-r from-neutral-950 via-cyan-950/40 to-neutral-950 border border-cyan-500/40 shadow-xl space-y-3">
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                          <div className="space-y-1">
                            <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-cyan-950 text-cyan-300 border border-cyan-500/40 font-bold uppercase tracking-wider">
                              Longa-Metragem Comercial (116 min) • Streaming Oficial
                            </span>
                            <h4 className="text-white font-bold text-sm sm:text-base font-display">
                              {chosenOption?.label}
                            </h4>
                            <p className="text-xs text-neutral-300 leading-relaxed max-w-xl">
                              O filme completo de François Truffaut (116 min) é transmitido oficialmente pelas plataformas autorizadas ({chosenOption?.platformName || 'Prime Video / Apple TV'}). Para decupagem das cenas em sala de aula com legendas didáticas e transcrição pedagógica sincronizada, utilize o player integrado abaixo.
                            </p>
                          </div>
                          <a
                            href={bVideoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-neutral-950 font-bold text-xs transition-all cursor-pointer shadow-lg shadow-cyan-500/25 shrink-0"
                          >
                            <span>Assistir Completo no {chosenOption?.platformName || 'Streaming'}</span>
                            <ExternalLink className="w-4 h-4" />
                          </a>
                        </div>
                      </div>
                    )}

                    {bEmbed && (
                      <>
                        {/* Multilingual Accessibility Controls: Dubbing & Subtitles */}
                        <div className="px-4 py-3 bg-neutral-950 rounded-2xl border border-neutral-800 space-y-2.5">
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                            <div className="flex items-center gap-2">
                              <Volume2 className="w-3.5 h-3.5 text-cyan-400" />
                              <span className="text-neutral-400 font-mono text-[11px] font-semibold">Áudio:</span>
                              <span className="text-cyan-300 font-mono text-[11px] font-bold">
                                {bonusFilm.audioTrackLabel || '🔊 Áudio Original Francês (Dolby 2.0)'}
                              </span>
                            </div>

                            <div className="flex flex-wrap items-center gap-1.5">
                              <Subtitles className="w-3.5 h-3.5 text-purple-400" />
                              <span className="text-neutral-400 font-mono text-[11px] font-semibold">Legendas (CC):</span>
                              <div className="flex items-center gap-1">
                                {[
                                  { code: 'pt' as const, label: '🇧🇷 PT', name: 'Português' },
                                  { code: 'en' as const, label: '🇺🇸 EN', name: 'English' },
                                  { code: 'es' as const, label: '🇪🇸 ES', name: 'Español' },
                                  { code: 'fr' as const, label: '🇫🇷 FR', name: 'Français' },
                                  { code: 'off' as const, label: '🔕 Off', name: 'Sem Legenda' },
                                ].map((sub) => {
                                  const isActive = currentBonusSub === sub.code;
                                  const isStudentLang = language === sub.code;
                                  return (
                                    <button
                                      key={sub.code}
                                      type="button"
                                      onClick={() =>
                                        setSelectedBonusSubtitle((prev) => ({ ...prev, [bonusFilm.id]: sub.code }))
                                      }
                                      title={`${sub.name}${isStudentLang ? ' (Língua da sua interface)' : ''}`}
                                      className={`px-2.5 py-1 rounded-md text-[11px] font-mono transition-all cursor-pointer flex items-center gap-1 ${
                                        isActive
                                          ? 'bg-purple-600 text-white font-bold ring-2 ring-purple-400/50 shadow'
                                          : 'bg-neutral-800 text-neutral-300 hover:text-white hover:bg-neutral-700'
                                      }`}
                                    >
                                      <span>{sub.label}</span>
                                      {isStudentLang && <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />}
                                    </button>
                                  );
                                })}
                              </div>
                            </div>
                          </div>

                          {/* Subtitle Notice below the languages - wraps cleanly, zero cutoff */}
                          <div className="w-full text-xs text-neutral-200 bg-neutral-900/95 px-4 py-3 rounded-xl border border-purple-500/30 font-sans leading-relaxed break-words flex items-start gap-2.5">
                            <Info className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                            <div className="space-y-0.5">
                              <p className="font-semibold text-purple-300 font-mono text-[11px] uppercase tracking-wide">
                                💬 Áudio & Legendas Multilíngues Sincronizadas:
                              </p>
                              <p className="text-neutral-300 text-xs">
                                O player está pronto com áudio e controles nativos completos. Acompanhe a decupagem pedagógica da cena e todas as falas traduzidas no painel de roteiro sincronizado logo abaixo do vídeo.
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Top Player Action Bar */}
                        <div className="flex items-center justify-between flex-wrap gap-2 px-4 py-2.5 rounded-xl bg-neutral-950 border border-neutral-800 text-xs">
                          <div className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                            <span className="text-neutral-400 font-mono">Fonte Ativa:</span>
                            <span className="font-semibold text-white">{bEmbed?.platformLabel || bPlatform}</span>
                          </div>
                          {bEmbed?.externalWatchUrl && (
                            <a
                              href={bEmbed.externalWatchUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-amber-300 hover:text-amber-200 transition font-mono text-[11px] font-medium"
                            >
                              <ExternalLink className="w-3.5 h-3.5" />
                              Abrir em Nova Aba / {bEmbed.platformLabel}
                            </a>
                          )}
                        </div>

                        <div className="rounded-2xl overflow-hidden border border-neutral-800 bg-black aspect-video w-full shadow-2xl relative">
                          {bEmbed && (bEmbed.type === 'youtube' || bEmbed.type === 'vimeo' || bEmbed.type === 'archive') ? (
                            <iframe
                              key={`${bEmbed.embedUrl}-${currentBonusSub}`}
                              src={bEmbed.embedUrl}
                              title={bonusFilm.title}
                              className="w-full h-full border-0"
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                              allowFullScreen
                            />
                          ) : (
                            <video src={bEmbed?.embedUrl || effectiveBonusVideoUrl} controls playsInline className="w-full h-full object-contain" />
                          )}
                        </div>

                        {/* Multilingual Pedagogical Transcript & Subtitle Study Component */}
                        <div className="rounded-2xl overflow-hidden border border-neutral-800 bg-neutral-950 p-2 sm:p-4">
                          <FilmSubtitleTranscriptViewer
                            filmId={bonusFilm.id}
                            selectedSubtitle={currentBonusSub}
                            onSelectSubtitle={(sub) =>
                              setSelectedBonusSubtitle((prev) => ({ ...prev, [bonusFilm.id]: sub }))
                            }
                            studentLanguage={language}
                            filmTitle={bonusFilm.title}
                            currentOption={chosenOption}
                            activeLineIndex={bonusLineIndices[bonusFilm.id] || 0}
                            setActiveLineIndex={(val) => {
                              setBonusLineIndices((prev) => ({
                                ...prev,
                                [bonusFilm.id]: typeof val === 'function' ? val(prev[bonusFilm.id] || 0) : val,
                              }));
                            }}
                            isAutoPlay={bonusAutoPlay[bonusFilm.id] !== undefined ? bonusAutoPlay[bonusFilm.id] : true}
                            setIsAutoPlay={(val) => {
                              setBonusAutoPlay((prev) => ({
                                ...prev,
                                [bonusFilm.id]: typeof val === 'function' ? val(prev[bonusFilm.id] !== undefined ? prev[bonusFilm.id] : true) : val,
                              }));
                            }}
                          />
                        </div>
                      </>
                    )}
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="md:col-span-2 space-y-4">
                    <div>
                      <h4 className="text-xs font-mono text-amber-400 font-bold uppercase mb-1">Sinopse da Obra:</h4>
                      <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">{bonusFilm.synopsis}</p>
                    </div>

                    <div className="p-4 rounded-2xl bg-amber-950/20 border-l-4 border-amber-500 space-y-1">
                      <h4 className="text-xs font-mono text-amber-400 font-bold uppercase">Por Que o Aluno Deve Assistir:</h4>
                      <p className="text-xs sm:text-sm text-amber-100 leading-relaxed">{bonusFilm.whyWatch}</p>
                    </div>

                    {bonusFilm.whatToObserve && (
                      <div className="p-4 rounded-2xl bg-neutral-950 border border-neutral-800 space-y-1 text-xs">
                        <h4 className="font-mono text-amber-400 font-bold uppercase flex items-center gap-1.5">
                          <Eye className="w-3.5 h-3.5" />
                          <span>
                            {bonusFilm.id === 'film-extra-heroi'
                              ? 'O Que Observar: Christopher Doyle, Teoria das Cores & Duelo de Espadas:'
                              : 'O Que Observar com Olhar de Realizador & Decupagem Técnica:'}
                          </span>
                        </h4>
                        <p className="text-neutral-300 leading-relaxed whitespace-pre-line">{bonusFilm.whatToObserve}</p>
                      </div>
                    )}

                    {bonusFilm.observationActivity && (
                      <div className="p-4 rounded-2xl bg-neutral-950 border border-neutral-800 space-y-1 text-xs">
                        <h4 className="font-mono text-emerald-400 font-bold uppercase flex items-center gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Exercício de Análise do Filme:</span>
                        </h4>
                        <p className="text-neutral-300 leading-relaxed">{bonusFilm.observationActivity}</p>
                      </div>
                    )}

                    {/* SELETOR DE VERSÕES, CENAS & STREAMING OFICIAL */}
                    {bonusFilm.videoOptions && bonusFilm.videoOptions.length > 0 && (
                      <div className="p-4 rounded-2xl bg-neutral-950 border border-neutral-800 space-y-3">
                        <div className="flex items-center justify-between gap-2">
                          <h4 className="text-xs font-mono text-amber-400 font-bold uppercase flex items-center gap-1.5">
                            <Film className="w-3.5 h-3.5" />
                            <span>Cenas para Decupagem Técnica & Onde Assistir Completo:</span>
                          </h4>
                          <span className="text-[10px] font-mono text-neutral-500">
                            {bonusFilm.videoOptions.length} opções disponíveis
                          </span>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {bonusFilm.videoOptions.map((opt) => {
                            const isSelected = (chosenOption?.id || bonusFilm.videoOptions?.[0]?.id) === opt.id;
                            return (
                              <button
                                key={opt.id}
                                type="button"
                                onClick={() => {
                                  setSelectedBonusVideoOption((prev) => ({ ...prev, [bonusFilm.id]: opt.id }));
                                  setActiveBonusPlayerId(bonusFilm.id);
                                }}
                                className={`p-3 rounded-xl text-left text-xs transition-all border flex flex-col justify-between gap-1.5 cursor-pointer ${
                                  isSelected
                                    ? 'bg-amber-500/20 border-amber-500 text-white shadow-lg shadow-amber-500/10'
                                    : 'bg-neutral-900/80 border-neutral-800 text-neutral-300 hover:border-neutral-700 hover:text-white'
                                }`}
                              >
                                <div className="flex items-start justify-between gap-2">
                                  <span className="font-semibold text-xs leading-snug">{opt.label}</span>
                                  {opt.badge && (
                                    <span
                                      className={`text-[10px] font-mono px-1.5 py-0.5 rounded shrink-0 font-bold ${
                                        opt.isStreaming
                                          ? 'bg-cyan-950 text-cyan-300 border border-cyan-700'
                                          : 'bg-amber-950/80 text-amber-300 border border-amber-800'
                                      }`}
                                    >
                                      {opt.badge}
                                    </span>
                                  )}
                                </div>
                                <div className="flex items-center justify-between text-[10px] font-mono text-neutral-400 pt-1">
                                  <span>{opt.platformName}</span>
                                  <div className="flex items-center gap-2">
                                    {opt.duration && (
                                      <span className="text-amber-300 font-mono font-bold">⏱️ {opt.duration}</span>
                                    )}
                                    {opt.isStreaming ? (
                                      <span className="text-cyan-400 flex items-center gap-0.5">
                                        Streaming <ExternalLink className="w-2.5 h-2.5" />
                                      </span>
                                    ) : (
                                      <span className="text-amber-400 flex items-center gap-0.5">
                                        Assistir Cena <Play className="w-2.5 h-2.5 fill-current" />
                                      </span>
                                    )}
                                  </div>
                                </div>
                              </button>
                            );
                          })}
                        </div>

                        {(bonusFilm.id === 'film-extra-heroi' || bonusFilm.id === 'film-extra-heroi-cores') && (
                          <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-[11px] text-amber-200 leading-relaxed space-y-1.5">
                            <p className="font-bold text-amber-400 flex items-center gap-1.5">
                              <span>💡</span>
                              <span>Guia de Visualização Pedagógica • Variação de Cores & Fotografia:</span>
                            </p>
                            <p className="text-neutral-300">
                              Para aprofundar o estudo da <strong>Apostila 05 de Direção de Fotografia</strong>, utilize os botões acima para alternar entre as opções de cena: a <strong>Paleta Vermelha</strong> (Duelo no Bosque de Folhas Outonais), a <strong>Paleta Verde</strong> (Escola de Caligrafia de Zhao sob Chuva de Flechas), o <strong>Duelo na Chuva</strong> (Jet Li vs. Donnie Yen em alto contraste/luz lateral) e os <strong>Vídeos-Ensaios</strong> sobre como Christopher Doyle e Zhang Yimou utilizaram cada matiz para transformar o ponto de vista narrativo e a psicologia da cena.
                            </p>
                          </div>
                        )}
                      </div>
                    )}

                    {/* VÍDEO INDICADO & URL */}
                    <div className="p-4 rounded-2xl bg-neutral-950 border border-neutral-800 space-y-3">
                      <div className="flex items-center justify-between gap-2">
                        <div>
                          <span className="text-[11px] font-mono text-neutral-400 block">Opção Selecionada & Plataforma:</span>
                          <strong className="text-xs text-white font-semibold flex items-center gap-1.5">
                            <span>{bPlatform}</span>
                            {chosenOption?.badge && (
                              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-neutral-800 text-amber-300">
                                {chosenOption.badge}
                              </span>
                            )}
                          </strong>
                        </div>

                        <div className="flex items-center gap-2">
                          {bEmbed && (
                            <button
                              type="button"
                              onClick={() => {
                                if (!isBonusPlayerOpen) {
                                  setActiveBonusPlayerId(bonusFilm.id);
                                }
                                const el = document.getElementById(`bonus-film-card-${bonusFilm.id}`);
                                if (el) {
                                  el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                                }
                              }}
                              className="px-3 py-1.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                            >
                              <Tv className="w-3.5 h-3.5 text-amber-400" />
                              <span>{isBonusPlayerOpen ? 'Ver Player Integrado' : 'Player Integrado'}</span>
                            </button>
                          )}

                          {bVideoUrl && (
                            <a
                              href={bVideoUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all shadow-md cursor-pointer ${
                                bIsStreaming
                                  ? 'bg-cyan-500 hover:bg-cyan-400 text-neutral-950 shadow-cyan-500/20'
                                  : 'bg-amber-500 hover:bg-amber-400 text-neutral-950 shadow-amber-500/20'
                              }`}
                            >
                              {bIsStreaming ? <ExternalLink className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-current" />}
                              <span>{bIsStreaming ? 'Abrir no Streaming Oficial' : 'Assistir ao Vídeo'}</span>
                              <ExternalLink className="w-3.5 h-3.5" />
                            </a>
                          )}
                        </div>
                      </div>

                      {bVideoUrl && (
                        <div className="flex items-center gap-2 p-2 rounded-xl bg-neutral-900 border border-neutral-800 text-[11px] font-mono">
                          <span className="text-amber-400 font-bold shrink-0">URL:</span>
                          <span className="truncate flex-1 text-neutral-300 select-all">{bVideoUrl}</span>
                          <button
                            type="button"
                            onClick={() => {
                              navigator.clipboard.writeText(bVideoUrl);
                              setBonusFilmCopied(true);
                              setTimeout(() => setBonusFilmCopied(false), 2000);
                            }}
                            className="p-1 rounded hover:bg-neutral-800 text-neutral-400 hover:text-amber-400 transition-colors cursor-pointer shrink-0"
                            title="Copiar URL"
                          >
                            {bonusFilmCopied ? (
                              <Check className="w-3.5 h-3.5 text-emerald-400" />
                            ) : (
                              <Copy className="w-3.5 h-3.5" />
                            )}
                          </button>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="p-5 rounded-2xl bg-neutral-950 border border-neutral-800 space-y-3 font-mono text-xs">
                      <div className="text-amber-400 font-bold border-b border-neutral-800 pb-2">FICHA TÉCNICA</div>
                      <div className="flex justify-between text-neutral-400">
                        <span>Direção:</span>
                        <span className="text-white font-semibold">{bonusFilm.director}</span>
                      </div>
                      <div className="flex justify-between text-neutral-400">
                        <span>Ano:</span>
                        <span className="text-white font-semibold">{bonusFilm.year}</span>
                      </div>
                      {bonusFilm.country && (
                        <div className="flex justify-between text-neutral-400">
                          <span>País:</span>
                          <span className="text-white font-semibold">{bonusFilm.country}</span>
                        </div>
                      )}
                      <div className="flex justify-between text-neutral-400">
                        <span>Duração:</span>
                        <span className="text-white font-semibold">
                          {bonusFilm.duration || `${bonusFilm.durationMinutes || 116} min`}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* TAB 4: LEITURA OBRIGATÓRIA */}
      {activeTab === 'reading' && reading && (() => {
        const tr = getReadingTranslation(reading);
        return (
        <div className="p-6 sm:p-10 rounded-3xl bg-neutral-900 border border-neutral-800 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-800 pb-4">
            <div>
              <span className="text-xs font-mono text-amber-400 font-bold">{tMod.libraryTitle || 'BIBLIOTECA & LEITURA CRÍTICA'}</span>
              <h3 className="text-2xl font-bold text-white font-display">{tr.title || reading.title}</h3>
              <p className="text-xs text-amber-300 font-medium">{tMod.authorLabel || 'Autor(a):'} {reading.author}</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-neutral-800 text-neutral-300 font-mono text-xs flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-amber-400" />
                {tMod.estimatedTime || 'Tempo estimado:'} {reading.estimatedMinutes} min
              </span>
            </div>
          </div>

          <div className="space-y-4">
            {(tr.suggestedChapter || reading.pagesOrChapter) && (
              <div className="inline-block px-3 py-1 rounded-lg bg-neutral-950 border border-neutral-800 text-xs font-mono text-neutral-300">
                {tMod.chapterPages || 'Capítulo / Páginas:'} {tr.suggestedChapter || reading.pagesOrChapter}
              </div>
            )}

            <div>
              <h4 className="text-xs font-mono text-amber-400 font-bold uppercase mb-1">{tMod.readingSummaryTitle || 'Resumo Crítico da Leitura:'}</h4>
              <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">{tr.summary || reading.summary}</p>
            </div>

            <div className="p-4 rounded-2xl bg-amber-950/20 border-l-4 border-amber-500 space-y-1">
              <h4 className="text-xs font-mono text-amber-400 font-bold uppercase">{tMod.whyReadTitle || 'Por Que o Realizador Deve Ler:'}</h4>
              <p className="text-xs sm:text-sm text-amber-100 leading-relaxed">{tr.whyRead || reading.whyRead}</p>
            </div>

            <div className="pt-2">
              <button
                type="button"
                onClick={() => setIsReadingModalOpen(true)}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-neutral-950 rounded-xl text-xs font-bold transition-all shadow-md shadow-amber-500/20 cursor-pointer active:scale-95"
              >
                <BookOpen className="w-4 h-4" />
                <span>{tMod.accessReadingBtn || 'Acessar Leitura Online Recomendada'}</span>
              </button>
            </div>
          </div>
        </div>
        );
      })()}

      {/* TAB 5: ATIVIDADES PRÁTICAS */}
      {activeTab === 'activities' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
            <div>
              <span className="text-xs font-mono text-amber-400 font-bold">LABORATÓRIO PRÁTICO</span>
              <h3 className="text-xl font-bold text-white font-display">
                Práticas, Pesquisas e Decupagens do Módulo 0{m.number}
              </h3>
            </div>
            <span className="text-xs font-mono text-neutral-400">
              {activities.filter((a: any) => a.completed).length} de {activities.length} concluídas
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {activities.map((act: any) => (
              <div
                key={act.id}
                className={`p-6 rounded-2xl border transition-all flex flex-col justify-between ${
                  act.completed ? 'bg-emerald-950/20 border-emerald-800' : 'bg-neutral-900 border-neutral-800'
                }`}
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-[11px] font-mono">
                    <span className="text-amber-400 font-bold uppercase">{act.type}</span>
                    {act.completed && (
                      <span className="text-emerald-400 font-bold flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" /> CONCLUÍDA
                      </span>
                    )}
                  </div>
                  <h4 className="text-sm font-bold text-white">{act.title}</h4>
                  <p className="text-xs text-neutral-300 leading-relaxed">{act.description}</p>
                  {act.instructions && (
                    <div className="p-3 rounded-lg bg-neutral-950 border border-neutral-800 text-xs text-neutral-400">
                      <strong className="text-amber-400 block font-mono text-[11px] mb-0.5">Instruções de Execução:</strong>
                      {act.instructions}
                    </div>
                  )}
                </div>

                <div className="pt-4 border-t border-neutral-800 mt-4">
                  <button
                    onClick={() => handleToggleActivity(act.id)}
                    className="w-full py-2.5 rounded-lg text-xs font-medium bg-neutral-800 hover:bg-neutral-700 text-neutral-200 flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <CheckCircle2 className="w-4 h-4 text-amber-400" />
                    <span>{act.completed ? 'Desmarcar Atividade' : 'Marcar como Concluída'}</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 6: AVALIAÇÃO OFICIAL */}
      {activeTab === 'eval' && (
        <div className="p-6 sm:p-10 rounded-3xl bg-neutral-900 border border-neutral-800 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-800 pb-4">
            <div>
              <span className="text-xs font-mono text-amber-400 font-bold">AVALIAÇÃO OFICIAL DA ETAPA</span>
              <h3 className="text-xl sm:text-2xl font-bold text-white">Prova Oficial do Módulo 0{m.number}</h3>
              <p className="text-xs text-neutral-400">
                10 Questões Objetivas • 1 Ponto por Questão • Nota Máxima: 10 • Correção Imediata
              </p>
            </div>
            {submission ? (
              <div className="p-3 rounded-2xl bg-emerald-950/80 border border-emerald-500/50 text-right">
                <span className="text-[11px] font-mono text-emerald-400 font-extrabold block">
                  AVALIAÇÃO CONCLUÍDA
                </span>
                <span className="text-base sm:text-lg font-bold text-white font-mono">
                  NOTA: {(submission.totalScore || 0).toFixed(1).replace('.', ',')} / 10
                </span>
              </div>
            ) : (
              <span className="text-xs font-mono px-3 py-1.5 rounded-xl bg-amber-950 text-amber-400 border border-amber-800">
                PENDENTE DE REALIZAÇÃO
              </span>
            )}
          </div>

          {/* Banner of Success when just submitted */}
          {evalSuccessMessage && (
            <div className="p-6 rounded-2xl bg-emerald-950 border-2 border-emerald-400 text-center space-y-2 animate-fadeIn">
              <div className="text-sm font-mono font-extrabold text-emerald-400 tracking-wider">
                AVALIAÇÃO CONCLUÍDA
              </div>
              <div className="text-2xl font-mono font-bold text-white">
                NOTA: {(submission?.totalScore || 0).toFixed(1).replace('.', ',')} / 10
              </div>
              <p className="text-xs text-emerald-200">
                Suas respostas foram salvas no sistema e lançadas em seu boletim acadêmico.
              </p>
            </div>
          )}

          {/* Warning Banner */}
          <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 text-xs text-neutral-300 leading-relaxed">
            <strong className="text-amber-400 font-bold block mb-0.5">Diretriz da Coordenação:</strong>
            A avaliação é a prova oficial do módulo. Ela difere do quiz da apostila. Responda com atenção a todas as 10 questões para compor sua média de certificação.
          </div>

          {/* Questions or Review */}
          {evalDetails?.questions && evalDetails.questions.length > 0 ? (
            <form onSubmit={handleEvalSubmit} className="space-y-6">
              {evalDetails.questions.map((q, qIndex) => {
                const currentAnswer = answers[q.id]?.selectedOptionIndex;
                const submittedAnswer = submission?.answers
                  ? Array.isArray(submission.answers)
                    ? (submission.answers as any[]).find((a) => a.questionId === q.id)?.selectedOptionIndex
                    : (submission.answers as any)[q.id]?.selectedOptionIndex
                  : undefined;

                const isAnswered = currentAnswer !== undefined || submittedAnswer !== undefined;
                const isReadOnly = !!submission;

                return (
                  <div key={q.id} className="p-6 rounded-2xl bg-neutral-950 border border-neutral-800 space-y-3">
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span className="text-amber-400 font-bold">QUESTÃO 0{qIndex + 1} DE 10</span>
                      <span className="text-neutral-400">Valor: 1,0 Ponto</span>
                    </div>

                    <h4 className="text-sm sm:text-base font-semibold text-white leading-relaxed">
                      {q.prompt}
                    </h4>

                    <div className="space-y-2 pt-2">
                      {q.options?.map((opt, optIdx) => {
                        const isChosen = isReadOnly ? submittedAnswer === optIdx : currentAnswer === optIdx;
                        const isCorrectAnswer = optIdx === q.correctAnswerIndex;

                        return (
                          <label
                            key={optIdx}
                            className={`block p-3.5 rounded-xl border text-xs leading-relaxed transition-all ${
                              isReadOnly
                                ? isCorrectAnswer
                                  ? 'bg-emerald-950/40 border-emerald-500/60 text-emerald-200 font-medium'
                                  : isChosen
                                  ? 'bg-rose-950/40 border-rose-500/60 text-rose-200'
                                  : 'bg-neutral-900/30 border-neutral-800/50 text-neutral-500'
                                : isChosen
                                ? 'bg-amber-500/20 border-amber-500 text-amber-200 font-semibold cursor-pointer'
                                : 'bg-neutral-900 border-neutral-800 text-neutral-300 hover:border-neutral-700 cursor-pointer'
                            }`}
                          >
                            <div className="flex items-start gap-3">
                              <input
                                type="radio"
                                name={`q-${q.id}`}
                                disabled={isReadOnly}
                                checked={isChosen}
                                onChange={() =>
                                  setAnswers((prev) => ({
                                    ...prev,
                                    [q.id]: { selectedOptionIndex: optIdx },
                                  }))
                                }
                                className="mt-0.5 accent-amber-500"
                              />
                              <span className="font-mono font-bold text-neutral-400">
                                {String.fromCharCode(65 + optIdx)})
                              </span>
                              <span className="flex-1">{opt}</span>
                              {isReadOnly && isCorrectAnswer && (
                                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-900 text-emerald-300 font-bold">
                                  CORRETA
                                </span>
                              )}
                            </div>
                          </label>
                        );
                      })}
                    </div>
                  </div>
                );
              })}

              {!submission && (
                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={submittingEval}
                    className="w-full py-4 bg-amber-500 hover:bg-amber-400 disabled:opacity-50 text-neutral-950 font-bold text-sm uppercase rounded-2xl flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-amber-500/20 transition-all active:scale-98"
                  >
                    <FileCheck className="w-5 h-5" />
                    <span>{submittingEval ? 'Corrigindo Avaliação...' : 'Finalizar e Enviar Avaliação'}</span>
                  </button>
                </div>
              )}
            </form>
          ) : (
            <div className="p-6 text-center text-xs text-neutral-400 bg-neutral-950 rounded-2xl border border-neutral-800">
              Esta avaliação estará disponível de acordo com o cronograma pedagógico de 3 meses do curso.
            </div>
          )}
        </div>
      )}

      {/* READING READER MODAL */}
      {isReadingModalOpen && data?.reading && (
        <ReadingReaderModal
          reading={data.reading}
          isOpen={isReadingModalOpen}
          onClose={() => setIsReadingModalOpen(false)}
        />
      )}
    </div>
  );
};
