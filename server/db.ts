import fs from 'fs';
import path from 'path';
import zlib from 'zlib';
import {
  User,
  CourseSettings,
  CourseModule,
  VideoLesson,
  Apostila,
  BonusApostila,
  ApostilaExtraVideo,
  ModuleActivity,
  ModuleEvaluation,
  Enrollment,
  Payment,
  EvaluationSubmission,
  Certificate,
  EmailLog,
  ItemStatus,
  VisitorLog,
  ModuleFilm,
  ModuleReading,
} from '../src/types/index.js';
import {
  initialCourseSettings,
  initialUsers,
  initialEnrollments,
  initialPayments,
} from './initialData.js';
import {
  pedagogicalModules,
  pedagogicalVideos,
  pedagogicalApostilas,
  pedagogicalBonusApostilas,
  pedagogicalActivities,
  pedagogicalFilms,
  pedagogicalReadings,
} from './pedagogicalContent.js';
import { pedagogicalEvaluations } from './pedagogicalEvaluations.js';

interface DatabaseSchema {
  settings: CourseSettings;
  users: (User & { passwordHash: string })[];
  enrollments: Enrollment[];
  payments: Payment[];
  modules: CourseModule[];
  videos: VideoLesson[];
  apostilas: Apostila[];
  bonusApostilas: BonusApostila[];
  activities: ModuleActivity[];
  films: ModuleFilm[];
  readings: ModuleReading[];
  studentActivities: Record<string, string[]>; // studentId -> completed activityIds
  evaluations: ModuleEvaluation[];
  submissions: EvaluationSubmission[];
  certificates: Certificate[];
  emailLogs: EmailLog[];
  visitors: VisitorLog[];
  simulatedDaysOffset: number; // for testing/demo timeline shifting if desired
}

const isVercel = Boolean(process.env.VERCEL);
export const DB_DIR = isVercel ? '/tmp/cinelab-data' : path.join(process.cwd(), 'data');
const DB_FILE = path.join(DB_DIR, 'cinelab-db.json');
const DB_BACKUP_FILE = path.join(DB_DIR, 'cinelab-db.backup.json');
const WELCOME_CONFIG_FILE = path.join(DB_DIR, 'welcome-video-config.json');
const READONLY_SEED_FILE = path.join(process.cwd(), 'data', 'cinelab-db.json');

/**
 * Detecta de forma síncrona e rápida o número real de páginas de um arquivo PDF
 */
export function detectPdfPageCountSync(filePath: string): number {
  try {
    if (!fs.existsSync(filePath)) return 0;
    const buf = fs.readFileSync(filePath);
    const str = buf.toString('latin1');
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
    // Inspect streams for compressed object streams (pdf-lib format)
    const streamMatches = [...str.matchAll(/stream\r?\n([\s\S]*?)\r?\nendstream/g)];
    for (const sm of streamMatches) {
      try {
        const dec = zlib.inflateSync(Buffer.from(sm[1], 'latin1')).toString('latin1');
        const countM = [...dec.matchAll(/\/Count\s+(\d+)/g)];
        if (countM.length > 0) {
          const cList = countM.map(m => parseInt(m[1], 10)).filter(n => !isNaN(n) && n > 0);
          if (cList.length > 0) return Math.max(...cList);
        }
        const pMatches = [...dec.matchAll(/\/Type\s*\/Page(?!\w)/g)];
        if (pMatches.length > 0) return pMatches.length;
      } catch(e) {}
    }
  } catch (err) {
    console.warn('detectPdfPageCountSync error for:', filePath, err);
  }
  return 0;
}
// Memory store
let db: DatabaseSchema;

function getInitialDb(): DatabaseSchema {
  return {
    settings: { ...initialCourseSettings },
    users: initialUsers.map((u) => ({
      ...u,
      passwordHash: u.role === 'admin' ? 'admin123' : 'aluno123',
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
      'user-student-demo': ['act-1', 'act-2'],
    },
    evaluations: [...pedagogicalEvaluations],
    submissions: [
      {
        id: 'sub-1',
        evaluationId: 'eval-1',
        moduleId: 1,
        studentId: 'user-student-demo',
        studentName: 'Lucas Mendonça de Oliveira',
        enrollmentNumber: 'CNL-2026-4819',
        submittedAt: '2026-08-30T16:20:00Z',
        answers: {
          'q1-1': { questionId: 'q1-1', selectedOptionIndex: 1, isCorrect: true, scoreAwarded: 2.5 },
          'q1-2': { questionId: 'q1-2', selectedOptionIndex: 1, isCorrect: true, scoreAwarded: 2.5 },
          'q1-3': { questionId: 'q1-3', selectedOptionIndex: 1, isCorrect: true, scoreAwarded: 2.5 },
          'q1-4': {
            questionId: 'q1-4',
            discursiveText:
              'A lente grande-angular expande a perspectiva e gera maior profundidade de campo, integrando o sujeito ao espaço dramático. A teleobjetiva achata as camadas de plano e comprime a profundidade, isolando a figura humana em primeiro plano com foco seletivo.',
            scoreAwarded: 2.0,
            feedback: 'Excelente análise técnica de lentes e efeito estético.',
          },
        },
        objectiveScore: 7.5,
        discursiveScore: 2.0,
        totalScore: 9.5,
        maxScore: 10,
        percentage: 95,
        status: 'graded',
        gradedAt: '2026-08-31T09:00:00Z',
        gradedBy: 'Professor Cineasta Tony de Luc',
        teacherGeneralFeedback: 'Excelente desempenho na primeira avaliação. Domínio da linguagem dos planos e ótica cinematográfica.',
      },
    ],
    certificates: [
      {
        id: 'cert-seed-1',
        validationCode: 'CNL-CERT-8910-4821',
        studentId: 'user-student-demo',
        studentName: 'Lucas Mendonça de Oliveira',
        studentDocument: '123.456.789-00',
        enrollmentNumber: 'CNL-2026-4819',
        courseName: 'CINELAB – CINEMA & AUDIOVISUAL',
        workloadHours: 180,
        issueDate: '2026-09-08T18:00:00.000Z',
        directorName: 'Professor Cineasta Tony de Luc',
        directorRole: 'Diretor Acadêmico & Cineasta',
        averageGrade: 9.5,
        isEligible: true,
      },
    ],
    emailLogs: [
      {
        id: 'email-1',
        toEmail: 'aluno@cinelab.edu.br',
        recipientName: 'Lucas Mendonça de Oliveira',
        subject: 'MATRÍCULA CONFIRMADA – CINELAB Cinema & Audiovisual',
        eventType: 'enrollment_created',
        body: 'Parabéns! Sua matrícula no CINELAB foi confirmada com sucesso. Matrícula: CNL-2026-4819. Acesse sua área do aluno com seu e-mail cadastrado.',
        sentAt: '2026-08-20T14:35:00Z',
      },
    ],
    visitors: [
      {
        id: 'vis-1',
        ip: '177.136.24.102',
        userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_4 like Mac OS X)',
        deviceType: 'mobile',
        pagePath: '/matricula',
        pageTitle: 'Matrícula Oficial CINELAB',
        referrer: 'Instagram Ads (@cinelab.cinema)',
        timestamp: new Date(Date.now() - 1000 * 60 * 12).toISOString(),
        isInterestedInEnrollment: true,
        city: 'São Paulo',
        state: 'SP',
      },
      {
        id: 'vis-2',
        ip: '189.40.112.55',
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/122.0.0.0',
        deviceType: 'desktop',
        pagePath: '/curso',
        pageTitle: 'Grade Curricular & Metodologia',
        referrer: 'Google Busca ("curso de cinema tony de luc")',
        timestamp: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
        isInterestedInEnrollment: true,
        city: 'Rio de Janeiro',
        state: 'RJ',
      },
      {
        id: 'vis-3',
        ip: '201.86.19.8',
        userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)',
        deviceType: 'desktop',
        pagePath: '/',
        pageTitle: 'Home – Formação CINELAB',
        referrer: 'Acesso Direto (cinelab.edu.br)',
        timestamp: new Date(Date.now() - 1000 * 60 * 95).toISOString(),
        isInterestedInEnrollment: false,
        city: 'Belo Horizonte',
        state: 'MG',
      },
      {
        id: 'vis-4',
        ip: '179.184.210.14',
        userAgent: 'Mozilla/5.0 (Linux; Android 14; SM-S918B)',
        deviceType: 'mobile',
        pagePath: '/matricula',
        pageTitle: 'Matrícula Oficial CINELAB',
        referrer: 'WhatsApp (Compartilhado)',
        timestamp: new Date(Date.now() - 1000 * 60 * 180).toISOString(),
        isInterestedInEnrollment: true,
        city: 'Curitiba',
        state: 'PR',
      },
      {
        id: 'vis-5',
        ip: '187.60.245.91',
        userAgent: 'Mozilla/5.0 (iPad; CPU OS 17_3 like Mac OS X)',
        deviceType: 'tablet',
        pagePath: '/curso',
        pageTitle: 'Grade Curricular & Metodologia',
        referrer: 'Google Busca ("escola de audiovisual r$ 499")',
        timestamp: new Date(Date.now() - 1000 * 60 * 320).toISOString(),
        isInterestedInEnrollment: true,
        city: 'Porto Alegre',
        state: 'RS',
      },
    ],
    simulatedDaysOffset: 0,
  };
}

export function initExtraVideosForApostila(apos: any, defaultSuffix: string): ApostilaExtraVideo[] {
  const existing: ApostilaExtraVideo[] = Array.isArray(apos.extraVideos) ? apos.extraVideos : [];

  // Dedicated custom notes store
  const notesFilePath = path.join(DB_DIR, 'extra-videos-notes.json');
  const seedNotesFilePath = path.join(process.cwd(), 'data', 'extra-videos-notes.json');
  let savedNotesMap: Record<string, string> = {};
  if (fs.existsSync(notesFilePath)) {
    try {
      savedNotesMap = JSON.parse(fs.readFileSync(notesFilePath, 'utf-8'));
    } catch {}
  } else if (fs.existsSync(seedNotesFilePath)) {
    try {
      savedNotesMap = JSON.parse(fs.readFileSync(seedNotesFilePath, 'utf-8'));
    } catch {}
  }

  const aposKey1 = `${apos.id || apos.moduleId}_slot_1`;
  const aposKey2 = `${apos.id || apos.moduleId}_slot_2`;

  const cannedPhrases = [
    'Assista com atenção antes de responder ao quiz e à avaliação de treinamento.',
    'Aplicação prática e orientações de direção do cinema profissional.',
    'Assista com atenção aos detalhes do enquadramento e da linguagem cinematográfica.',
    'Demonstração de resolução de problemas no set e técnicas de direção.',
  ];

  let slot1 = existing.find((v: any) => v.slot === 1);
  if (!slot1) {
    slot1 = {
      id: `ev-${apos.id || 'apos'}-1`,
      slot: 1,
      title: `Vídeo Extra 01: Estudo Dirigido & Análise Prática – ${defaultSuffix}`,
      description: `Análise técnica e decupagem comentada pelo Professor Cineasta Tony de Luc para aprofundar os conceitos teóricos desta apostila.`,
      videoUrl: '/videos/cinelab-intro-apresentacao.mp4',
      thumbnailUrl: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=800&q=80',
      durationHours: 0,
      durationMinutes: 18,
      durationSeconds: 0,
      totalDurationSeconds: 18 * 60,
      durationLabel: '00h 18m 00s',
      professorNotes: savedNotesMap[aposKey1] || '',
      uploadedAt: new Date().toISOString(),
    };
  } else {
    // If the slot already exists, preserve whatever professorNotes the user wrote (or left empty)
    if (slot1.professorNotes === undefined || (slot1.professorNotes === '' && savedNotesMap[aposKey1])) {
      slot1.professorNotes = savedNotesMap[aposKey1] || '';
    }
    if (!slot1.durationLabel || slot1.durationLabel === '18 min') {
      slot1.durationHours = slot1.durationHours ?? 0;
      slot1.durationMinutes = slot1.durationMinutes ?? 18;
      slot1.durationSeconds = slot1.durationSeconds ?? 0;
      slot1.totalDurationSeconds = (slot1.durationHours * 3600) + (slot1.durationMinutes * 60) + slot1.durationSeconds;
      slot1.durationLabel = '00h 18m 00s';
    }
  }

  let slot2 = existing.find((v: any) => v.slot === 2);
  if (!slot2) {
    slot2 = {
      id: `ev-${apos.id || 'apos'}-2`,
      slot: 2,
      title: `Vídeo Extra 02: Estudo de Caso & Exercício Técnico – ${defaultSuffix}`,
      description: `Demonstração em set de filmagem com resolução prática de problemas de decupagem e linguagem cinematográfica.`,
      videoUrl: '', // Ready for video upload by the user
      thumbnailUrl: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=800&q=80',
      durationHours: 0,
      durationMinutes: 24,
      durationSeconds: 0,
      totalDurationSeconds: 24 * 60,
      durationLabel: '00h 24m 00s',
      professorNotes: savedNotesMap[aposKey2] || '',
      uploadedAt: new Date().toISOString(),
    };
  } else {
    // If the slot already exists, preserve whatever professorNotes the user wrote (or left empty)
    if (slot2.professorNotes === undefined || (slot2.professorNotes === '' && savedNotesMap[aposKey2])) {
      slot2.professorNotes = savedNotesMap[aposKey2] || '';
    }
    if (!slot2.durationLabel || slot2.durationLabel === '24 min') {
      slot2.durationHours = slot2.durationHours ?? 0;
      slot2.durationMinutes = slot2.durationMinutes ?? 24;
      slot2.durationSeconds = slot2.durationSeconds ?? 0;
      slot2.totalDurationSeconds = (slot2.durationHours * 3600) + (slot2.durationMinutes * 60) + slot2.durationSeconds;
      slot2.durationLabel = '00h 24m 00s';
    }
  }

  return [slot1, slot2];
}

export function loadDatabase(): void {
  try {
    try {
      if (!fs.existsSync(DB_DIR)) {
        fs.mkdirSync(DB_DIR, { recursive: true });
      }
    } catch (e) {
      console.warn('[DB] Could not create DB_DIR:', e);
    }
    let data = '';
    if (fs.existsSync(DB_FILE)) {
      try {
        data = fs.readFileSync(DB_FILE, 'utf-8');
      } catch (readErr) {
        console.warn('Error reading DB_FILE, trying backup:', readErr);
      }
    }
    if (!data && fs.existsSync(DB_BACKUP_FILE)) {
      try {
        data = fs.readFileSync(DB_BACKUP_FILE, 'utf-8');
        console.log('Successfully recovered database from DB_BACKUP_FILE');
      } catch (backupErr) {
        console.warn('Error reading DB_BACKUP_FILE:', backupErr);
      }
    }
    if (!data && fs.existsSync(READONLY_SEED_FILE)) {
      try {
        data = fs.readFileSync(READONLY_SEED_FILE, 'utf-8');
        console.log('Successfully initialized database from seed file');
      } catch (seedErr) {
        console.warn('Error reading READONLY_SEED_FILE:', seedErr);
      }
    }

    if (data) {
      db = JSON.parse(data);
      // Ensure all arrays exist in case of schema upgrade
      const initial = getInitialDb();
      db.settings = { ...initial.settings, ...db.settings };

      // Ensure persistent photo URL and extraction if base64
      const localTonyPhoto = path.join(process.cwd(), 'public', 'images', 'tony-de-luc.jpg');
      const localUploadTonyPhoto = path.join(process.cwd(), 'public', 'uploads', 'images', 'tony-de-luc.jpg');
      const backupImagesDir = path.join(process.cwd(), 'data', 'images_backup');
      const backupVideosDir = path.join(process.cwd(), 'data', 'videos_backup');
      const publicImagesDir = path.join(process.cwd(), 'public', 'images');
      const uploadsVideosDir = path.join(process.cwd(), 'public', 'uploads', 'videos');
      const uploadsImagesDir = path.join(process.cwd(), 'public', 'uploads', 'images');

      try {
        if (!fs.existsSync(backupImagesDir)) fs.mkdirSync(backupImagesDir, { recursive: true });
        if (!fs.existsSync(backupVideosDir)) fs.mkdirSync(backupVideosDir, { recursive: true });
        if (!fs.existsSync(publicImagesDir)) fs.mkdirSync(publicImagesDir, { recursive: true });
        if (!fs.existsSync(uploadsVideosDir)) fs.mkdirSync(uploadsVideosDir, { recursive: true });
        if (!fs.existsSync(uploadsImagesDir)) fs.mkdirSync(uploadsImagesDir, { recursive: true });
      } catch (mkdirErr) {
        console.warn('[DB] Notice creating image/video backup dirs:', mkdirErr);
      }

      // Restore ALL backup images into public/uploads/images and public/images
      try {
        if (fs.existsSync(backupImagesDir)) {
          const backupImages = fs.readdirSync(backupImagesDir);
          for (const imgName of backupImages) {
            const src = path.join(backupImagesDir, imgName);
            const dstUploads = path.join(uploadsImagesDir, imgName);
            const dstPublic = path.join(publicImagesDir, imgName);
            if (!fs.existsSync(dstUploads)) {
              try { fs.copyFileSync(src, dstUploads); } catch {}
            }
            if (!fs.existsSync(dstPublic) && (imgName.endsWith('.jpg') || imgName.endsWith('.png') || imgName.endsWith('.webp'))) {
              try { fs.copyFileSync(src, dstPublic); } catch {}
            }
          }
        }
      } catch (err) {
        console.warn('[DB] Image sync notice:', err);
      }

      // Restore ALL backup videos into uploadsVideosDir
      try {
        if (fs.existsSync(backupVideosDir)) {
          const backupVideos = fs.readdirSync(backupVideosDir);
          for (const vidName of backupVideos) {
            const src = path.join(backupVideosDir, vidName);
            const dst = path.join(uploadsVideosDir, vidName);
            if (!fs.existsSync(dst)) {
              try { fs.copyFileSync(src, dst); } catch {}
            }
          }
        }
      } catch (err) {
        console.warn('[DB] Video sync notice:', err);
      }

      // Image recovery: cinelab-cover.jpg
      const coverPath = path.join(publicImagesDir, 'cinelab-cover.jpg');
      const backupCoverPath = path.join(backupImagesDir, 'cinelab-cover.jpg');
      if (!fs.existsSync(coverPath) && fs.existsSync(backupCoverPath)) {
        try { fs.copyFileSync(backupCoverPath, coverPath); } catch {}
      } else if (fs.existsSync(coverPath) && !fs.existsSync(backupCoverPath)) {
        try { fs.copyFileSync(coverPath, backupCoverPath); } catch {}
      }

      // Read dedicated welcome video configuration backup if available
      let welcomeConfigFile: any = null;
      try {
        if (fs.existsSync(WELCOME_CONFIG_FILE)) {
          welcomeConfigFile = JSON.parse(fs.readFileSync(WELCOME_CONFIG_FILE, 'utf-8'));
        }
      } catch (wcErr) {
        console.warn('[DB] Notice reading WELCOME_CONFIG_FILE:', wcErr);
      }

      // Ensure persistent welcomeVideoPoster and verify it physically exists
      if (!db.settings.welcomeVideoPoster || db.settings.welcomeVideoPoster.trim() === '') {
        db.settings.welcomeVideoPoster = welcomeConfigFile?.welcomeVideoPoster || '/uploads/images/img-LOCO_CINELAB___COLE-1790299254778-824285.png';
      } else if (db.settings.welcomeVideoPoster.startsWith('/uploads/images/')) {
        const posterName = path.basename(db.settings.welcomeVideoPoster);
        const posterDiskPath = path.join(uploadsImagesDir, posterName);
        const posterBackupPath = path.join(backupImagesDir, posterName);
        if (!fs.existsSync(posterDiskPath)) {
          if (fs.existsSync(posterBackupPath)) {
            try { fs.copyFileSync(posterBackupPath, posterDiskPath); } catch {}
          } else {
            db.settings.welcomeVideoPoster = '/images/cinelab-cover.jpg';
          }
        }
      }

      // Ensure persistent welcomeVideoUrl: NEVER delete or wipe to empty!
      if (!db.settings.welcomeVideoUrl || db.settings.welcomeVideoUrl.trim() === '') {
        if (welcomeConfigFile?.welcomeVideoUrl && welcomeConfigFile.welcomeVideoUrl.trim() !== '') {
          db.settings.welcomeVideoUrl = welcomeConfigFile.welcomeVideoUrl;
          console.log(`[DB] Restored welcome video URL from welcome-video-config.json: ${db.settings.welcomeVideoUrl}`);
        } else {
          db.settings.welcomeVideoUrl = '/uploads/videos/aula-CINELAB_INTRODU__O-1790768528604-650605.mp4';
          console.log(`[DB] Set default official welcome video URL: ${db.settings.welcomeVideoUrl}`);
        }
      }

      // Also ensure message title and text are preserved
      if (!db.settings.welcomeMessageTitle || db.settings.welcomeMessageTitle.trim() === '') {
        db.settings.welcomeMessageTitle = welcomeConfigFile?.welcomeMessageTitle || 'Mensagem de Boas-Vindas aos Novos Alunos';
      }
      if (!db.settings.welcomeMessageText || db.settings.welcomeMessageText.trim() === '') {
        if (welcomeConfigFile?.welcomeMessageText) {
          db.settings.welcomeMessageText = welcomeConfigFile.welcomeMessageText;
        }
      }

      // Validate welcomeVideoUrl: if it points to a local file, ensure it physically exists or restore
      if (db.settings.welcomeVideoUrl && db.settings.welcomeVideoUrl.startsWith('/uploads/videos/')) {
        const videoFileName = path.basename(db.settings.welcomeVideoUrl);
        const diskVideoPath = path.join(uploadsVideosDir, videoFileName);
        const backupVideoPath = path.join(backupVideosDir, videoFileName);
        const backupIntro = path.join(backupVideosDir, 'cinelab-intro-apresentacao.mp4');
        const diskIntro = path.join(uploadsVideosDir, 'cinelab-intro-apresentacao.mp4');

        // Ensure default intro video always exists in both directories
        if (!fs.existsSync(diskIntro) && fs.existsSync(backupIntro)) {
          try { fs.copyFileSync(backupIntro, diskIntro); } catch {}
        } else if (fs.existsSync(diskIntro) && !fs.existsSync(backupIntro)) {
          try { fs.copyFileSync(diskIntro, backupIntro); } catch {}
        }

        const staticVideosDir = path.join(process.cwd(), 'public', 'videos');
        const staticVideoPath = path.join(staticVideosDir, videoFileName);
        const staticIntro = path.join(staticVideosDir, 'cinelab-intro-apresentacao.mp4');

        if (!fs.existsSync(staticVideosDir)) {
          try { fs.mkdirSync(staticVideosDir, { recursive: true }); } catch {}
        }

        // Ensure default intro video always exists in all locations
        if (!fs.existsSync(diskIntro) && fs.existsSync(backupIntro)) {
          try { fs.copyFileSync(backupIntro, diskIntro); } catch {}
        } else if (fs.existsSync(diskIntro) && !fs.existsSync(backupIntro)) {
          try { fs.copyFileSync(diskIntro, backupIntro); } catch {}
        }
        if (!fs.existsSync(staticIntro) && fs.existsSync(diskIntro)) {
          try { fs.copyFileSync(diskIntro, staticIntro); } catch {}
        }

        if (!fs.existsSync(diskVideoPath)) {
          if (fs.existsSync(backupVideoPath)) {
            try {
              fs.copyFileSync(backupVideoPath, diskVideoPath);
              console.log(`[DB] Restored welcome video from backup: ${videoFileName}`);
            } catch (copyErr) {
              console.warn('[DB] Failed to restore welcome video from backup:', copyErr);
            }
          } else if (fs.existsSync(staticVideoPath)) {
            try {
              fs.copyFileSync(staticVideoPath, diskVideoPath);
              console.log(`[DB] Restored welcome video from static videos: ${videoFileName}`);
            } catch {}
          }
        }

        // Ensure backup directory and static directory also have a copy of the current welcome video
        if (fs.existsSync(diskVideoPath)) {
          if (!fs.existsSync(backupVideoPath)) {
            try { fs.copyFileSync(diskVideoPath, backupVideoPath); } catch {}
          }
          if (!fs.existsSync(staticVideoPath)) {
            try { fs.copyFileSync(diskVideoPath, staticVideoPath); } catch {}
          }
        }
      }

      if (db.settings.tonyPhotoUrl && db.settings.tonyPhotoUrl.startsWith('data:image')) {
        try {
          const base64Data = db.settings.tonyPhotoUrl.replace(/^data:image\/\w+;base64,/, '');
          const buffer = Buffer.from(base64Data, 'base64');
          if (!fs.existsSync(path.dirname(localTonyPhoto))) fs.mkdirSync(path.dirname(localTonyPhoto), { recursive: true });
          if (!fs.existsSync(path.dirname(localUploadTonyPhoto))) fs.mkdirSync(path.dirname(localUploadTonyPhoto), { recursive: true });
          fs.writeFileSync(localTonyPhoto, buffer);
          fs.writeFileSync(localUploadTonyPhoto, buffer);
          db.settings.tonyPhotoUrl = '/images/tony-de-luc.jpg';
        } catch (e) {
          console.error('Failed to extract base64 tonyPhotoUrl:', e);
        }
      } else if (fs.existsSync(localTonyPhoto)) {
        if (!db.settings.tonyPhotoUrl || db.settings.tonyPhotoUrl.includes('unsplash.com')) {
          db.settings.tonyPhotoUrl = '/images/tony-de-luc.jpg';
        }
      }

      if (!db.settings.tonyRole) {
        db.settings.tonyRole = 'Cineasta, Diretor de Fotografia, Produtor, Ator, Jornalista & Fundador do CINELAB';
      }
      if (!db.settings.directorRole) {
        db.settings.directorRole = db.settings.tonyRole;
      }

      if (!db.settings.tonySocialLinkedin) {
        db.settings.tonySocialLinkedin = 'https://linkedin.com/in/tonydeluc-cinema';
      }
      if (!db.settings.tonySocialYoutube) {
        db.settings.tonySocialYoutube = 'https://youtube.com/@TVDIVERSIDADE';
      }
      db.settings.minPassingGrade = 6.0;
      db.modules = db.modules || initial.modules;
      if (!db.modules[0]?.pedagogicalObjective) {
        db.modules = [...pedagogicalModules];
      }
      db.videos = db.videos || initial.videos;
      if (!db.apostilas || db.apostilas.length === 0) {
        db.apostilas = [...pedagogicalApostilas];
      } else {
        // PRESERVE user modifications in db.apostilas!
        // Never wipe user titles, pagesCount, totalPages, or pdfUrl with hardcoded defaults.
        db.apostilas = db.apostilas.map((apos: any) => {
          const pedMatch = pedagogicalApostilas.find((p) => p.moduleId === apos.moduleId);
          const isAccidentalDuplicatedTitle = apos.moduleId !== 1 && apos.title === 'Introdução ao Cinema e à Linguagem Audiovisual';
          const resolvedTitle = isAccidentalDuplicatedTitle ? (pedMatch?.title || 'História do Cinema') : (apos.title || pedMatch?.title);
          return {
            ...pedMatch,
            ...apos,
            title: resolvedTitle,
            pdfUrl: apos.pdfUrl || pedMatch?.pdfUrl,
            pagesCount: apos.pagesCount || apos.totalPages || pedMatch?.pagesCount || 30,
            totalPages: apos.totalPages || apos.pagesCount || pedMatch?.totalPages || 30,
            fileSizeMb: apos.fileSizeMb || pedMatch?.fileSizeMb,
            sections: (apos.sections && apos.sections.length > 0) ? apos.sections : (pedMatch?.sections || []),
            quiz: (apos.quiz && apos.quiz.length >= 5) ? apos.quiz : ((pedMatch as any)?.quizQuestions || pedMatch?.quiz || apos.quiz || []),
            quizQuestions: (apos.quizQuestions && apos.quizQuestions.length >= 5) ? apos.quizQuestions : ((pedMatch as any)?.quizQuestions || pedMatch?.quiz || apos.quizQuestions || []),
          };
        });
      }

      // Synchronize pagesCount, totalPages and restore file backups across storage locations
      const backupDir = path.join(process.cwd(), 'data', 'apostilas_backup');
      const materiaisDir = path.join(process.cwd(), 'public', 'materiais');
      const uploadsAposDir = path.join(process.cwd(), 'public', 'uploads', 'apostilas');
      try {
        if (!fs.existsSync(backupDir)) fs.mkdirSync(backupDir, { recursive: true });
        if (!fs.existsSync(materiaisDir)) fs.mkdirSync(materiaisDir, { recursive: true });
        if (!fs.existsSync(uploadsAposDir)) fs.mkdirSync(uploadsAposDir, { recursive: true });
      } catch (mkdirAposErr) {
        console.warn('[DB] Notice creating apostila backup dirs:', mkdirAposErr);
      }

      const canonicalPagesMap: Record<number, number> = {
        1: 8,
        2: 52,
        3: 7,
        4: 6,
        5: 6,
        6: 6,
        7: 6,
        8: 6,
        9: 6,
        10: 6,
      };

      db.apostilas = db.apostilas.map((apos: any) => {
        const modNum = Number(apos.moduleId || apos.number || 1);
        const numStr = modNum < 10 ? `0${modNum}` : `${modNum}`;
        const canonicalPdfUrl = `/materiais/cinelab-apostila-${numStr}.pdf`;

        let resolvedPdfUrl = apos.pdfUrl;
        if (!resolvedPdfUrl || resolvedPdfUrl.includes('1790444') || resolvedPdfUrl.startsWith('/uploads/apostilas/')) {
          resolvedPdfUrl = canonicalPdfUrl;
        }

        const realPages = canonicalPagesMap[modNum] || apos.pagesCount || apos.totalPages || 6;

        return {
          ...apos,
          pdfUrl: resolvedPdfUrl,
          pagesCount: realPages,
          totalPages: realPages,
          extraVideos: initExtraVideosForApostila(apos, `Módulo ${numStr}`),
        };
      });

      // Bonus Apostilas: preserve user configuration and dynamically inspect real files
      if (!db.bonusApostilas || db.bonusApostilas.length === 0) {
        db.bonusApostilas = [...pedagogicalBonusApostilas];
      } else {
        db.bonusApostilas = db.bonusApostilas.map((b: any) => {
          const pedMatch = pedagogicalBonusApostilas.find((p) => p.number === b.number);
          const defaultPages = b.number === 1 ? 30 : 29;
          const isOutdatedLegacy =
            !b.title ||
            b.title.includes('Pitching') ||
            b.title.includes('Guerrilha') ||
            b.title.includes('Bíblia de Série') ||
            b.title.includes('Nova Apostila') ||
            b.pagesCount === 35 ||
            b.pagesCount === 40 ||
            b.pagesCount === 96 ||
            b.pagesCount === 104;

          return {
            ...pedMatch,
            ...b,
            title: isOutdatedLegacy ? (pedMatch?.title || b.title) : (b.title || pedMatch?.title),
            subtitle: isOutdatedLegacy ? (pedMatch?.subtitle || b.subtitle) : (b.subtitle || pedMatch?.subtitle),
            description: isOutdatedLegacy ? (pedMatch?.description || b.description) : (b.description || b.summary || pedMatch?.description),
            summary: isOutdatedLegacy ? (pedMatch?.summary || b.summary) : (b.summary || b.description || pedMatch?.summary),
            pdfUrl: b.pdfUrl || pedMatch?.pdfUrl,
            pagesCount: (isOutdatedLegacy && (b.pagesCount === 35 || b.pagesCount === 40 || b.pagesCount === 96 || b.pagesCount === 104 || !b.pagesCount))
              ? (pedMatch?.pagesCount || defaultPages)
              : (b.pagesCount || b.totalPages || pedMatch?.pagesCount || defaultPages),
            totalPages: (isOutdatedLegacy && (b.totalPages === 35 || b.totalPages === 40 || b.totalPages === 96 || b.totalPages === 104 || !b.totalPages))
              ? (pedMatch?.totalPages || defaultPages)
              : (b.totalPages || b.pagesCount || pedMatch?.totalPages || defaultPages),
            fileSizeMb: b.fileSizeMb || pedMatch?.fileSizeMb,
          };
        });
      }

      db.bonusApostilas = db.bonusApostilas.map((b: any) => {
        const bonusNum = b.number || 1;
        const canonicalBonusUrl = bonusNum === 1
          ? '/materiais/cinelab-bonus-01-glossario-planos.pdf'
          : bonusNum === 2
          ? '/materiais/cinelab-bonus-02-glossario-roteiro.pdf'
          : '/materiais/cinelab-bonus-03-analise-filmica.pdf';
        const canonicalPages = bonusNum === 1 ? 30 : (bonusNum === 2 ? 29 : 4);

        let resolvedBonusUrl = b.pdfUrl;
        if (!resolvedBonusUrl || resolvedBonusUrl.includes('1790') || resolvedBonusUrl.startsWith('/uploads/apostilas/')) {
          resolvedBonusUrl = canonicalBonusUrl;
        }

        const realPages = b.pagesCount && b.pagesCount !== 96 && b.pagesCount !== 104 ? b.pagesCount : canonicalPages;

        return {
          ...b,
          pdfUrl: resolvedBonusUrl,
          pagesCount: realPages,
          totalPages: realPages,
          extraVideos: initExtraVideosForApostila(b, `Bônus 0${bonusNum}`),
        };
      });
      db.activities = db.activities || initial.activities;
      if (db.activities.length < 10) {
        db.activities = [...pedagogicalActivities];
      }
      if (!db.films || db.films.length < 10) {
        db.films = [...pedagogicalFilms];
      } else {
        // Synchronize and update all films with updated metadata, exact durations, and videoOptions from pedagogicalFilms
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
              availableSubtitles: pf.availableSubtitles || ['pt', 'en', 'es', 'fr'],
              availableDubbed: pf.availableDubbed,
              audioTrack: pf.audioTrack || db.films[existingIdx].audioTrack,
              audioTrackLabel: pf.audioTrackLabel || db.films[existingIdx].audioTrackLabel,
            };
          }
        }
      }
      db.readings = [...pedagogicalReadings];
      db.evaluations = db.evaluations || initial.evaluations;
      if (
        !db.evaluations[0]?.questions ||
        db.evaluations[0].questions.length < 10 ||
        db.evaluations.length < 10 ||
        !db.evaluations[0].questions[0].prompt.includes('O que significa audiovisual')
      ) {
        db.evaluations = [...pedagogicalEvaluations];
        try {
          fs.writeFileSync(DB_FILE, JSON.stringify(db, null, 2), 'utf-8');
        } catch {}
      }
      db.users = db.users || initial.users;
      // Ensure all initial demo students and their control fields exist
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
            averageGrade: db.users[existingIdx].averageGrade !== undefined ? db.users[existingIdx].averageGrade : initUser.averageGrade,
            pedagogicalNotes: db.users[existingIdx].pedagogicalNotes || initUser.pedagogicalNotes,
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
    console.error('Error loading database, using memory fallback:', err);
    db = getInitialDb();
  }
}

export function saveDatabase(): void {
  try {
    try {
      if (!fs.existsSync(DB_DIR)) {
        fs.mkdirSync(DB_DIR, { recursive: true });
      }
      const data = JSON.stringify(db, null, 2);
      fs.writeFileSync(DB_FILE, data, 'utf-8');
      try {
        fs.writeFileSync(DB_BACKUP_FILE, data, 'utf-8');
      } catch (bErr) {
        console.warn('Could not mirror to DB_BACKUP_FILE:', bErr);
      }
    } catch (fsErr: any) {
      console.warn('[DB] Filesystem notice (state kept in memory):', fsErr?.message || fsErr);
    }
    // Also mirror welcome video configuration to dedicated permanent file
    try {
      if (db.settings.welcomeVideoUrl) {
        fs.writeFileSync(
          WELCOME_CONFIG_FILE,
          JSON.stringify(
            {
              welcomeVideoUrl: db.settings.welcomeVideoUrl,
              welcomeVideoPoster: db.settings.welcomeVideoPoster || '/images/cinelab-cover.jpg',
              welcomeMessageTitle: db.settings.welcomeMessageTitle || 'Mensagem de Boas-Vindas aos Novos Alunos',
              welcomeMessageText: db.settings.welcomeMessageText || '',
            },
            null,
            2
          ),
          'utf-8'
        );
      }
    } catch (wErr) {
      console.warn('Could not mirror to WELCOME_CONFIG_FILE:', wErr);
    }
  } catch (err: any) {
    if (err?.code !== 'EROFS') {
      console.error('Error saving database to file:', err);
    }
  }
}

export function getDb(): DatabaseSchema {
  if (!db) {
    loadDatabase();
  }
  return db;
}

// Current effective time considering any admin simulated offset (default 0)
export function getEffectiveNow(): Date {
  const current = new Date();
  const offsetMs = (getDb().simulatedDaysOffset || 0) * 86400000;
  return new Date(current.getTime() + offsetMs);
}

export interface ModuleScheduleConfig {
  durationDays: number;
  evalLeadDays: number;
  label: string;
}

export const MODULE_SCHEDULE_CONFIG: Record<number, ModuleScheduleConfig> = {
  1: { durationDays: 7, evalLeadDays: 2, label: '1 semana (7 dias)' },
  2: { durationDays: 8, evalLeadDays: 2, label: '8 dias' },
  3: { durationDays: 10, evalLeadDays: 3, label: '10 dias' },
  4: { durationDays: 9, evalLeadDays: 2, label: '9 dias' },
  5: { durationDays: 10, evalLeadDays: 3, label: '10 dias' },
  6: { durationDays: 8, evalLeadDays: 2, label: '8 dias' },
  7: { durationDays: 10, evalLeadDays: 3, label: '10 dias' },
  8: { durationDays: 9, evalLeadDays: 2, label: '9 dias' },
  9: { durationDays: 9, evalLeadDays: 2, label: '9 dias' },
  10: { durationDays: 10, evalLeadDays: 3, label: '10 dias' },
};

/**
 * Fundamental Rule of CINELAB:
 * Calculate time-based status for each module:
 * The 10 modules are pedagogically calibrated across 3 months (90 days):
 * - Mod 1: 7 days (1 week) - Introdução e Gramática Visual (Linguagem e Planos)
 * - Mod 2: 8 days - História do Cinema e Análise em 6 Camadas
 * - Mod 3: 10 days - Roteiro, Estrutura Dramática e Criação de Personagens
 * - Mod 4: 9 days - Direção de Cena, Mise-en-scène e Decupagem
 * - Mod 5: 10 days - Direção de Fotografia, Luz em 3 Pontos e Câmeras
 * - Mod 6: 8 days - Som Direto, Microfonia, Acústica e Trilha Sonora
 * - Mod 7: 10 days - Montagem, Ritmo e Pós-produção
 * - Mod 8: 9 days - Produção Executiva, Viabilidade e Orçamento
 * - Mod 9: 9 days - Distribuição, Festivais e Circuito de Mercado
 * - Mod 10: 10 days - Projeto Final de Conclusão: Realização de Curta-Metragem
 * Total = 7 + 8 + 10 + 9 + 10 + 8 + 10 + 9 + 9 + 10 = 90 dias (3 meses exatos)
 */
export function calculateModuleTimeline(
  moduleId: number,
  studentEnrollment?: Enrollment | null
): {
  startDate: Date;
  endDate: Date;
  evalUnlockDate: Date;
  status: ItemStatus;
  isEvalUnlocked: boolean;
  daysRemainingToUnlock: number;
  hoursRemainingToUnlock: number;
  isCurrent: boolean;
  durationDays: number;
  durationLabel: string;
  evalLeadDays: number;
} {
  const settings = getDb().settings;
  const now = getEffectiveNow();

  // Cohort start date
  const cohortStart = new Date(settings.cohortStartDate);

  // Calculate cumulative days for previous modules
  let cumulativeDaysStart = 0;
  for (let i = 1; i < moduleId; i++) {
    cumulativeDaysStart += (MODULE_SCHEDULE_CONFIG[i]?.durationDays ?? 9);
  }

  const currentConfig = MODULE_SCHEDULE_CONFIG[moduleId] || {
    durationDays: 9,
    evalLeadDays: 2,
    label: '9 dias',
  };

  const startMs = cohortStart.getTime() + cumulativeDaysStart * 86400000;
  const endMs = startMs + currentConfig.durationDays * 86400000;
  const evalUnlockMs = endMs - currentConfig.evalLeadDays * 86400000;

  const startDate = new Date(startMs);
  const endDate = new Date(endMs);
  const evalUnlockDate = new Date(evalUnlockMs);

  const nowMs = now.getTime();

  let status: ItemStatus = 'locked';
  const isEvalUnlocked = nowMs >= evalUnlockMs;

  if (nowMs >= endMs) {
    status = 'completed';
  } else if (nowMs >= startMs) {
    status = 'available';
  } else {
    status = 'locked';
  }

  const msRemaining = Math.max(0, startMs - nowMs);
  const daysRemainingToUnlock = Math.ceil(msRemaining / 86400000);
  const hoursRemainingToUnlock = Math.ceil(msRemaining / 3600000);

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
    evalLeadDays: currentConfig.evalLeadDays,
  };
}

export function logEmail(
  toEmail: string,
  recipientName: string,
  subject: string,
  eventType: EmailLog['eventType'],
  body: string
): EmailLog {
  const log: EmailLog = {
    id: `email-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
    toEmail,
    recipientName,
    subject,
    eventType,
    body,
    sentAt: new Date().toISOString(),
  };
  getDb().emailLogs.unshift(log);
  saveDatabase();
  return log;
}

export function logVisitor(visitorData: Partial<VisitorLog>): VisitorLog {
  const currentDb = getDb();
  if (!currentDb.visitors) {
    currentDb.visitors = [];
  }
  const log: VisitorLog = {
    id: `vis-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
    ip: visitorData.ip || '127.0.0.1',
    userAgent: visitorData.userAgent || 'Desconhecido',
    deviceType: visitorData.deviceType || 'desktop',
    pagePath: visitorData.pagePath || '/',
    pageTitle: visitorData.pageTitle || 'Página Inicial',
    referrer: visitorData.referrer || 'Acesso Direto',
    timestamp: new Date().toISOString(),
    isInterestedInEnrollment: Boolean(visitorData.isInterestedInEnrollment),
    city: visitorData.city || 'Brasil',
    state: visitorData.state || 'BR',
    userId: visitorData.userId,
    userName: visitorData.userName,
    isStudent: visitorData.isStudent,
  };

  currentDb.visitors.unshift(log);
  // Keep last 1000 visitors to avoid unbounded growth
  if (currentDb.visitors.length > 1000) {
    currentDb.visitors = currentDb.visitors.slice(0, 1000);
  }
  saveDatabase();
  return log;
}

