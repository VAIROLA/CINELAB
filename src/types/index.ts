export type UserRole = 'student' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  document?: string; // CPF
  role: UserRole;
  createdAt: string;
  matricula?: string;
  paymentMethod?: string;
  difficulties?: string;
  averageGrade?: number;
  pedagogicalNotes?: string;
}

export interface StudentControlItem {
  id: string;
  name: string;
  email: string;
  phone?: string;
  document?: string;
  createdAt: string;
  enrollmentNumber: string;
  enrollmentStatus: string;
  paymentStatus: string;
  paymentMethod: string;
  difficulties: string;
  pedagogicalNotes?: string;
  evaluationsCompleted: number;
  averageGrade: number | null;
  isPassingGrade: boolean; // true if averageGrade > 6.0
}

export type PaymentMethod = 'pix' | 'credit_card' | 'debit_card' | 'boleto';
export type PaymentStatus = 'pending' | 'approved' | 'rejected' | 'refunded';

export interface Payment {
  id: string;
  studentId: string;
  enrollmentId: string;
  method: PaymentMethod;
  amount: number;
  installments?: number;
  installmentValue?: number;
  status: PaymentStatus;
  pixKey?: string;
  pixQrCode?: string;
  cardBrand?: string;
  lastFour?: string;
  createdAt: string;
  approvedAt?: string;
}

export type EnrollmentStatus = 'active' | 'pending' | 'suspended' | 'completed';

export interface Enrollment {
  id: string;
  enrollmentNumber: string; // e.g. CNL-2026-8491
  studentId: string;
  studentName: string;
  studentEmail: string;
  status: EnrollmentStatus;
  enrolledAt: string;
  activatedAt?: string;
  paymentId: string;
}

export type ItemStatus = 'locked' | 'available' | 'completed';

export interface CourseModule {
  id: number; // 1 to 10
  number: number;
  title: string;
  subtitle: string;
  summary: string;
  order: number;
  durationWeeks?: number;
  durationDays?: number; // 7 to 10 days, summing to 90 days (3 months)
  durationLabel?: string; // e.g. "1 semana (7 dias)", "10 dias", "8 dias"
  evalLeadDays?: number; // days before end when evaluation unlocks
  pedagogicalObjective?: string;
  directorObjectives?: string[];
  syllabus?: string[];
  estimatedHours?: number;
  // Calculated dynamically by calendar:
  startDate?: string;
  endDate?: string;
  evaluationReleaseDate?: string;
  evalUnlockDate?: string;
  status?: ItemStatus;
  daysRemaining?: number;
  hoursRemaining?: number;
  isEvalUnlocked?: boolean;
  isCurrent?: boolean;
}

export interface VideoLesson {
  id: string;
  moduleId: number;
  title: string;
  description: string;
  durationMinutes: number;
  videoUrl: string;
  thumbnailUrl: string;
  professorName: string;
  professorRole: string;
  professorNotes?: string;
  duration?: string;
}

export interface ApostilaQuizQuestion {
  id: string;
  questionNumber?: number;
  question?: string;
  prompt?: string;
  options: string[];
  correctAnswerIndex?: number;
  correctOptionIndex?: number;
  explanation: string;
}

export interface ApostilaExtraVideo {
  id: string;
  slot: 1 | 2; // 1 = Local 1 (Vídeo Extra de Estudo 01), 2 = Local 2 (Vídeo Extra de Estudo 02)
  title: string;
  description?: string;
  videoUrl?: string;
  thumbnailUrl?: string;
  durationHours?: number;
  durationMinutes?: number;
  durationSeconds?: number;
  totalDurationSeconds?: number;
  durationLabel?: string;
  professorNotes?: string;
  uploadedAt?: string;
}

export interface ApostilaSection {
  id: string;
  title: string;
  subtitle?: string;
  content?: string;
  contentMarkdown?: string;
  keyTakeaway?: string;
  bulletPoints?: string[];
  tonyNotes?: string;
}

export interface Apostila {
  id: string;
  moduleId: number;
  number: number;
  title: string;
  subtitle?: string;
  summary?: string;
  description?: string;
  totalPages?: number;
  pagesCount?: number;
  pdfUrl?: string;
  coverUrl?: string;
  fileSizeMb?: number;
  isBonus?: boolean;
  sections?: ApostilaSection[];
  quiz?: ApostilaQuizQuestion[];
  quizQuestions?: ApostilaQuizQuestion[];
  contentMarkdown?: string;
  isUnlocked?: boolean;
  unlockDate?: string;
  startDate?: string;
  endDate?: string;
  evalUnlockDate?: string;
  isEvalUnlocked?: boolean;
  status?: 'locked' | 'available' | 'completed' | 'current';
  durationDays?: number;
  durationLabel?: string;
  evalLeadDays?: number;
  extraVideos?: ApostilaExtraVideo[];
}

export interface FilmVideoOption {
  id: string;
  label: string;
  url: string;
  duration?: string;
  durationMinutes?: number;
  isStreaming?: boolean;
  platformName?: string;
  badge?: string;
  type?: 'full_scene' | 'trailer' | 'scene' | 'streaming' | 'analysis' | 'full_movie';
  audioLang?: 'pt' | 'en' | 'es' | 'fr' | 'ru' | 'silent' | string;
  subtitleLang?: 'pt' | 'en' | 'es' | 'fr' | 'multi' | string;
  isDubbed?: boolean;
}

export interface ModuleFilm {
  id: string;
  moduleId: number;
  title: string;
  originalTitle?: string;
  director: string;
  year: number | string;
  country?: string;
  durationMinutes?: number;
  duration?: string;
  synopsis?: string;
  whyWatch: string;
  streamingPlatform?: string;
  platform?: string; // e.g. "Porta Curtas / YouTube Oficial"
  streamingUrl?: string;
  watchUrl?: string;
  posterUrl?: string;
  whatToObserve?: string;
  observationActivity?: string;
  isBonus?: boolean;
  badge?: string;
  category?: 'curriculum' | 'bonus';
  relatedModuleId?: number;
  audioTrack?: 'original_pt' | 'dublado_pt' | 'mudo' | 'legendado_pt' | 'original_en' | 'original_fr' | 'original_ru';
  audioTrackLabel?: string;
  availableSubtitles?: ('pt' | 'en' | 'es' | 'fr')[];
  availableDubbed?: ('pt' | 'en' | 'es' | 'fr')[];
  videoOptions?: FilmVideoOption[];
}

export interface ModuleReading {
  id: string;
  moduleId: number;
  title: string;
  author: string;
  bookOrArticle?: string;
  suggestedChapter?: string;
  pagesOrChapter?: string;
  summary?: string;
  whyRead: string;
  accessUrl?: string;
  url?: string;
  estimatedMinutes?: number;
}

export interface BonusApostila {
  id: string;
  number: number;
  title: string;
  subtitle?: string;
  description: string;
  pagesCount: number;
  totalPages?: number;
  fileSizeMb?: number;
  pdfUrl: string;
  coverUrl: string;
  unlockedByDefault: boolean;
  status?: ItemStatus;
  notes: string;
  startDate?: string;
  unlockDate?: string;
  isUnlocked?: boolean;
  requiredModule?: number;
  code?: string;
  summary?: string;
  sections?: ApostilaSection[];
  termsGlossary?: { term: string; definition: string; application: string }[];
  extraVideos?: ApostilaExtraVideo[];
}

export interface ModuleActivity {
  id: string;
  moduleId: number;
  title: string;
  category: 'pesquisa' | 'filme' | 'livro' | 'pratica' | 'observacao';
  content: string;
  details?: string;
  completed?: boolean;
  activityType?: 'text_response' | 'structured_form' | 'script_scene' | 'project_final';
  expectedFields?: { key: string; label: string; placeholder: string; required?: boolean }[];
  studentResponse?: Record<string, string>;
  submittedAt?: string;
}

export type QuestionType = 'multiple_choice' | 'true_false' | 'discursive';

export interface EvaluationQuestion {
  id: string;
  type: QuestionType;
  prompt: string;
  options?: string[]; // for multiple choice & true_false
  correctOptionIndex?: number; // for auto-correction
  weight: number;
  explanation?: string;
}

export interface ModuleEvaluation {
  id: string;
  moduleId: number;
  moduleNumber: number;
  title: string;
  description: string;
  maxScore: number;
  minPassingScore: number;
  questions: EvaluationQuestion[];
  isUnlocked?: boolean;
  unlockDate?: string;
}

export interface StudentAnswer {
  questionId: string;
  selectedOptionIndex?: number;
  discursiveText?: string;
  scoreAwarded?: number;
  isCorrect?: boolean;
  feedback?: string;
}

export interface EvaluationSubmission {
  id: string;
  evaluationId: string;
  moduleId: number;
  studentId: string;
  studentName: string;
  enrollmentNumber: string;
  submittedAt: string;
  answers: Record<string, StudentAnswer>;
  objectiveScore: number;
  discursiveScore: number;
  totalScore: number;
  maxScore: number;
  percentage: number;
  status: 'graded' | 'pending_review';
  gradedAt?: string;
  gradedBy?: string;
  teacherGeneralFeedback?: string;
}

export interface StudentGradeRecord {
  moduleId: number;
  moduleTitle: string;
  evaluationTitle: string;
  score: number;
  maxScore: number;
  percentage: number;
  status: 'graded' | 'pending_review' | 'not_submitted' | 'locked';
  submittedAt?: string;
}

export interface Certificate {
  id: string;
  validationCode: string; // e.g. CNL-CERT-8842-1983
  studentId: string;
  studentName: string;
  studentDocument?: string;
  enrollmentNumber: string;
  courseName: string;
  workloadHours: number;
  issueDate: string;
  directorName: string;
  directorRole: string;
  averageGrade: number;
  isEligible: boolean;
  unmetCriteria?: string[];
}

export interface FilmographyWork {
  title: string;
  year: string;
  role: string;
  type: string;
  details: string;
  videoUrl?: string; // Link do YouTube, Vimeo ou arquivo de vídeo
}

export interface CourseSettings {
  courseName: string;
  courseSubtitle: string;
  description: string;
  totalDurationMonths: number;
  totalModules: number;
  moduleDurationDays: number;
  evalLeadTimeDays: number; // released 3 days before module end
  cohortStartDate: string; // ISO date string
  minPassingGrade: number; // e.g. 7.0
  workloadHours: number; // 180h
  coursePrice: number; // 1000.00
  coursePriceOriginal: number; // 2000.00
  maxInstallments: number; // 12
  pixKey: string;
  pixBeneficiary: string;
  pixBank: string;
  pixQrCodeUrl?: string;
  pixPayload?: string;
  cardPaymentLink?: string; // Link de pagamento PagBank (ex: https://pag.ae/...)
  pagbankToken?: string; // Token de integração PagBank
  logoUrl?: string;
  contactEmail: string;
  contactPhone: string;
  directorName: string;
  directorRole: string;

  // Rodapé (Footer) & Dados Institucionais
  footerAboutText?: string;
  footerWorkloadBadge?: string;
  footerOfficialBadge?: string;
  footerCopyright?: string;
  footerDisclaimer?: string;
  companyCnpj?: string;
  companyAddress?: string;
  instagramUrl?: string;
  youtubeUrl?: string;
  vimeoUrl?: string;
  whatsappNumber?: string;
  whatsappDefaultMessage?: string;

  // Contato & Suporte
  supportHours?: string;
  supportResponseTime?: string;
  contactAddress?: string;

  // Página & Perfil de Tony de Luc (Feitos, Currículo, Filmografia)
  tonyName?: string;
  tonyRole?: string;
  tonyPhotoUrl?: string;
  tonyTagline?: string;
  tonyBioShort?: string;
  tonyBioFull?: string;
  tonyFeitos?: string[];
  tonyCurriculo?: string[];
  tonyFilmografia?: FilmographyWork[];
  tonySocialInstagram?: string;
  tonySocialLinkedin?: string;
  tonySocialYoutube?: string;
  tonySocialImdb?: string; // Legado mantido para compatibilidade
  tonySocialVimeo?: string; // Legado mantido para compatibilidade

  // Vídeo e Mensagem de Boas-Vindas aos Novos Alunos (Página Inicial)
  welcomeVideoUrl?: string;
  welcomeVideoPoster?: string;
  welcomeMessageTitle?: string;
  welcomeMessageText?: string;
}

export interface EmailLog {
  id: string;
  toEmail: string;
  recipientName: string;
  subject: string;
  eventType: 'enrollment_created' | 'payment_approved' | 'module_released' | 'evaluation_released' | 'course_completed' | 'password_reset';
  body: string;
  sentAt: string;
}

export interface VisitorLog {
  id: string;
  ip: string;
  userAgent: string;
  deviceType: 'mobile' | 'desktop' | 'tablet';
  pagePath: string;
  pageTitle: string;
  referrer: string;
  timestamp: string;
  isInterestedInEnrollment: boolean;
  city?: string;
  state?: string;
  userId?: string;
  userName?: string;
  isStudent?: boolean;
}

export interface VisitorStats {
  totalVisits: number;
  uniqueVisitors: number;
  todayVisits: number;
  interestedVisits: number;
  conversionRate: number;
  devices: {
    mobile: number;
    desktop: number;
    tablet: number;
  };
  topPages: { path: string; title: string; count: number }[];
  recentVisitors: VisitorLog[];
}

export interface TutorChatMessage {
  id: string;
  role: 'user' | 'model' | 'system';
  content: string;
  timestamp: string;
  moduleId?: number;
  suggestions?: string[];
}

export interface TutorQuestionRequest {
  message: string;
  history?: Array<{ role: 'user' | 'model'; content: string }>;
  moduleId?: number;
  studentName?: string;
  language?: string;
}

export interface TutorQuestionResponse {
  answer: string;
  modelUsed?: string;
  relatedModuleId?: number;
  suggestions?: string[];
}

