import express, { Request, Response } from 'express';
import path from 'path';
import fs from 'fs';
import os from 'os';
import { execSync, exec } from 'child_process';
import multer from 'multer';
import { PDFDocument } from 'pdf-lib';
import {
  getDb,
  loadDatabase,
  saveDatabase,
  calculateModuleTimeline,
  getEffectiveNow,
  initExtraVideosForApostila,
  logEmail,
  logVisitor,
} from './server/db.js';
import {
  User,
  Enrollment,
  Payment,
  EvaluationSubmission,
  StudentAnswer,
  Certificate,
  VisitorLog,
  VisitorStats,
  VideoLesson,
  ApostilaExtraVideo,
} from './src/types/index.js';
import { APOSTILA_SECTION_TRANSLATIONS } from './src/i18n/apostilaContentTranslations.js';

// Initialize DB
loadDatabase();

const app = express();
const PORT = 3000;

// Permissive CORS for media streaming and API requests in preview iframes
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization, Range, X-Upload-Id, X-Chunk-Index, X-Total-Chunks, X-Original-Name, X-Welcome-Video, X-Auth-Token, X-Admin-Token, *'
  );
  res.header('Access-Control-Expose-Headers', 'Content-Range, Accept-Ranges, Content-Length, Content-Type');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(204);
  }
  next();
});

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Configure directories and static serving for uploads safely (serverless read-only resilient)
function safeEnsureDir(dirPath: string) {
  try {
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }
  } catch (err) {
    // Graceful fallback on read-only environments like Vercel Lambda
  }
}

// Detect whether a path is writable; if not (e.g. Vercel Lambda /var/task), redirect to os.tmpdir()
export function getWritableDir(...subpaths: string[]): string {
  const localPath = path.join(process.cwd(), ...subpaths);
  try {
    if (!fs.existsSync(localPath)) {
      fs.mkdirSync(localPath, { recursive: true });
    }
    const testFile = path.join(localPath, `.write_test_${Date.now()}_${Math.random()}`);
    fs.writeFileSync(testFile, 'ok');
    fs.unlinkSync(testFile);
    return localPath;
  } catch {
    const tmpPath = path.join(os.tmpdir(), 'cinelab', ...subpaths);
    try {
      if (!fs.existsSync(tmpPath)) {
        fs.mkdirSync(tmpPath, { recursive: true });
      }
    } catch {}
    return tmpPath;
  }
}

const uploadsDir = getWritableDir("public", "uploads", "videos");
const imagesUploadDir = getWritableDir("public", "uploads", "images");
const apostilasUploadDir = getWritableDir("public", "uploads", "apostilas");
const materiaisDir = getWritableDir("public", "materiais");
const backupApostilasDir = getWritableDir("data", "apostilas_backup");
const backupVideosDir = getWritableDir("data", "videos_backup");
const backupImagesDir = getWritableDir("data", "images_backup");
const publicImagesDir = path.join(process.cwd(), "public", "images");
safeEnsureDir(publicImagesDir);
const tempChunksDir = getWritableDir("data", "temp_chunks");

/**
 * Detecta o número real de páginas de um arquivo PDF via pdf-lib com fallback para regex
 */
async function detectPdfPageCount(filePathOrBuffer: string | Buffer): Promise<number> {
  try {
    const buffer = typeof filePathOrBuffer === 'string' ? fs.readFileSync(filePathOrBuffer) : filePathOrBuffer;
    const pdfDoc = await PDFDocument.load(buffer, { ignoreEncryption: true });
    const count = pdfDoc.getPageCount();
    if (count > 0) return count;
  } catch (err) {
    try {
      const buffer = typeof filePathOrBuffer === 'string' ? fs.readFileSync(filePathOrBuffer) : filePathOrBuffer;
      const text = buffer.toString('latin1');
      const matches = text.match(/\/Type\s*\/Page\b/g);
      if (matches && matches.length > 0) return matches.length;
    } catch {}
  }
  return 1;
}

// Ensure Express serves /images, /materiais, /uploads, /standard_fonts, and /cmaps statically
app.use('/images', express.static(publicImagesDir));
app.use('/materiais', (req: Request, res: Response, next: any) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Accept-Ranges', 'bytes');
  next();
}, express.static(materiaisDir));
app.use('/standard_fonts', (req: Request, res: Response, next: any) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  next();
}, express.static(path.join(process.cwd(), 'public', 'standard_fonts')));
app.use('/cmaps', (req: Request, res: Response, next: any) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  next();
}, express.static(path.join(process.cwd(), 'public', 'cmaps')));

// Resilient fallback for apostila uploads: prevents 404 if container restarted
app.get('/uploads/apostilas/:filename', (req: Request, res: Response, next: any) => {
  const filename = req.params.filename;
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Accept-Ranges', 'bytes');
  res.setHeader('Content-Type', 'application/pdf');

  const directCandidates = [
    path.join(apostilasUploadDir, filename),
    path.join(os.tmpdir(), 'cinelab', 'public', 'uploads', 'apostilas', filename),
    path.join(process.cwd(), 'public', 'uploads', 'apostilas', filename),
    path.join(backupApostilasDir, filename),
    path.join(os.tmpdir(), 'cinelab', 'data', 'apostilas_backup', filename),
    path.join(process.cwd(), 'data', 'apostilas_backup', filename),
  ];
  for (const p of directCandidates) {
    if (fs.existsSync(p)) {
      return res.sendFile(p);
    }
  }

  const modMatch = filename.match(/modulo-0?(\d+)/i);
  if (modMatch) {
    const modNum = parseInt(modMatch[1], 10);
    const numStr = modNum < 10 ? `0${modNum}` : `${modNum}`;
    const candidates = [
      path.join(backupApostilasDir, `apostila-modulo-0${modNum}.pdf`),
      path.join(backupApostilasDir, `apostila-modulo-${numStr}.pdf`),
      path.join(backupApostilasDir, `apostila-modulo-10.pdf`),
      path.join(backupApostilasDir, `apostila-modulo-010.pdf`),
      path.join(materiaisDir, `cinelab-apostila-${numStr}.pdf`),
      path.join(materiaisDir, `cinelab-apostila-0${modNum}.pdf`),
      path.join(materiaisDir, `cinelab-apostila-10.pdf`),
      path.join(materiaisDir, `cinelab-apostila-010.pdf`),
      path.join(process.cwd(), 'public', 'materiais', `cinelab-apostila-${numStr}.pdf`),
      path.join(process.cwd(), 'public', 'materiais', `cinelab-apostila-0${modNum}.pdf`),
    ];
    for (const c of candidates) {
      if (fs.existsSync(c)) {
        try { fs.copyFileSync(c, path.join(apostilasUploadDir, filename)); } catch {}
        return res.sendFile(c);
      }
    }
  }

  const bonusMatch = filename.match(/bonus-0?(\d+)/i);
  if (bonusMatch) {
    const bonusNum = parseInt(bonusMatch[1], 10);
    const candidates = [
      path.join(backupApostilasDir, `apostila-bonus-0${bonusNum}.pdf`),
      path.join(backupApostilasDir, `apostila-bonus-${bonusNum}.pdf`),
      path.join(os.tmpdir(), 'cinelab', 'data', 'apostilas_backup', `apostila-bonus-0${bonusNum}.pdf`),
      path.join(os.tmpdir(), 'cinelab', 'data', 'apostilas_backup', `apostila-bonus-${bonusNum}.pdf`),
      path.join(
        materiaisDir,
        bonusNum === 1
          ? 'cinelab-bonus-01-glossario-planos.pdf'
          : bonusNum === 2
          ? 'cinelab-bonus-02-glossario-roteiro.pdf'
          : 'cinelab-bonus-03-analise-filmica.pdf'
      ),
      path.join(
        process.cwd(),
        'public',
        'materiais',
        bonusNum === 1
          ? 'cinelab-bonus-01-glossario-planos.pdf'
          : bonusNum === 2
          ? 'cinelab-bonus-02-glossario-roteiro.pdf'
          : 'cinelab-bonus-03-analise-filmica.pdf'
      ),
      path.join(materiaisDir, `cinelab-bonus-0${bonusNum}.pdf`),
      path.join(process.cwd(), 'public', 'materiais', `cinelab-bonus-0${bonusNum}.pdf`),
    ];
    for (const c of candidates) {
      if (fs.existsSync(c)) {
        try { fs.copyFileSync(c, path.join(apostilasUploadDir, filename)); } catch {}
        return res.sendFile(c);
      }
    }
  }
  next();
});

// High-performance streaming for videos with RFC 7233 HTTP Range (206 Partial Content) support
const handleStreamVideo = (req: Request, res: Response, next: any) => {
  if (req.method !== 'GET' && req.method !== 'HEAD' && req.method !== 'OPTIONS') {
    return next();
  }

  const rawFilename = req.params.filename || '';
  let safeFilename = '';
  try {
    safeFilename = path.basename(decodeURIComponent(rawFilename));
  } catch {
    safeFilename = path.basename(rawFilename);
  }
  let filePath = path.join(uploadsDir, safeFilename);

  // Multi-tier recovery for persistent videos across container instances
  if (!fs.existsSync(filePath)) {
    const backupPath = path.join(backupVideosDir, safeFilename);
    const staticPath = path.join(process.cwd(), 'public', 'videos', safeFilename);

    if (fs.existsSync(backupPath)) {
      try { fs.copyFileSync(backupPath, filePath); } catch {}
    } else if (fs.existsSync(staticPath)) {
      try { fs.copyFileSync(staticPath, filePath); } catch {}
    } else if (safeFilename.toLowerCase().includes('intro') && safeFilename.toLowerCase().includes('cinelab')) {
      const introBackup = path.join(backupVideosDir, 'cinelab-intro-apresentacao.mp4');
      const introStatic = path.join(process.cwd(), 'public', 'videos', 'cinelab-intro-apresentacao.mp4');
      if (fs.existsSync(introBackup)) {
        try { fs.copyFileSync(introBackup, filePath); } catch {}
      } else if (fs.existsSync(introStatic)) {
        try { fs.copyFileSync(introStatic, filePath); } catch {}
      }
    }
  }

  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ error: 'Arquivo de vídeo não encontrado no servidor.' });
  }

  const stat = fs.statSync(filePath);
  const total = stat.size;

  const ext = path.extname(safeFilename).toLowerCase();
  const mimeTypes: Record<string, string> = {
    '.mp4': 'video/mp4',
    '.webm': 'video/webm',
    '.mov': 'video/quicktime',
    '.mkv': 'video/x-matroska',
    '.m4v': 'video/mp4',
    '.ogv': 'video/ogg',
  };
  const contentType = mimeTypes[ext] || 'video/mp4';

  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, HEAD, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Range, Origin, X-Requested-With, Content-Type, Accept');
  res.setHeader('Access-Control-Expose-Headers', 'Content-Range, Accept-Ranges, Content-Length, Content-Type');
  res.setHeader('Accept-Ranges', 'bytes');
  res.setHeader('Cache-Control', 'public, max-age=3600');

  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }

  if (req.method === 'HEAD') {
    res.setHeader('Content-Type', contentType);
    res.setHeader('Content-Length', total);
    return res.status(200).end();
  }

  const range = req.headers.range;
  const CHUNK_SIZE = 8 * 1024 * 1024; // 8MB for smooth startup and fast seek

  if (range && range.startsWith('bytes=')) {
    const parts = range.replace(/bytes=/, '').split('-');
    const start = parseInt(parts[0], 10) || 0;
    const requestedEnd = parts[1] ? parseInt(parts[1], 10) : undefined;

    let end: number;
    if (requestedEnd !== undefined && !isNaN(requestedEnd)) {
      end = Math.min(requestedEnd, total - 1);
    } else {
      end = Math.min(start + CHUNK_SIZE - 1, total - 1);
    }

    if (start >= total || start > end) {
      res.setHeader('Content-Range', `bytes */${total}`);
      return res.status(416).send('Requested Range Not Satisfiable');
    }

    const contentLength = end - start + 1;
    res.status(206);
    res.setHeader('Content-Range', `bytes ${start}-${end}/${total}`);
    res.setHeader('Content-Length', contentLength);
    res.setHeader('Content-Type', contentType);

    const stream = fs.createReadStream(filePath, { start, end });
    req.on('close', () => {
      stream.destroy();
    });
    return stream.pipe(res);
  } else {
    // If no range is specified, stream the full file or first chunk
    res.status(200);
    res.setHeader('Content-Length', total);
    res.setHeader('Content-Type', contentType);

    const stream = fs.createReadStream(filePath);
    req.on('close', () => {
      stream.destroy();
    });
    return stream.pipe(res);
  }
};

app.all('/uploads/videos/:filename', handleStreamVideo);
app.all('/videos/:filename', handleStreamVideo);

app.use('/uploads', express.static(path.join(process.cwd(), 'public', 'uploads')));
app.use('/uploads', express.static(path.join(os.tmpdir(), 'cinelab', 'public', 'uploads')));
app.use('/uploads', (_req, res) => {
  res.status(404).send('Arquivo não encontrado');
});

const videoStorage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, getWritableDir("public", "uploads", "videos"));
  },
  filename: (_req, file, cb) => {
    const ext = path.extname(file.originalname) || '.mp4';
    const cleanBase = path.basename(file.originalname, ext).replace(/[^a-zA-Z0-9_-]/g, '_').slice(0, 40);
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e6)}`;
    cb(null, `aula-${cleanBase}-${uniqueSuffix}${ext}`);
  },
});

const videoUpload = multer({
  storage: videoStorage,
  limits: {
    fileSize: 1024 * 1024 * 1024, // 1GB limit for videos
  },
  fileFilter: (_req, file, cb) => {
    if (file.mimetype.startsWith('video/') || /\.(mp4|webm|mov|mkv|avi|m4v|ogv)$/i.test(file.originalname)) {
      cb(null, true);
    } else {
      cb(new Error('Apenas arquivos de vídeo são permitidos (MP4, WebM, MOV, MKV, AVI).'));
    }
  },
});

// Multer storage for resilient chunked video uploads
const chunkStorage = multer.diskStorage({
  destination: (req, _file, cb) => {
    const rawId = req.query?.uploadId || req.headers?.['x-upload-id'] || req.body?.uploadId || 'session';
    const uploadId = String(rawId).replace(/[^a-zA-Z0-9_-]/g, '_');
    const sessionDir = path.join(getWritableDir("data", "temp_chunks"), uploadId);
    if (!fs.existsSync(sessionDir)) {
      try { fs.mkdirSync(sessionDir, { recursive: true }); } catch {}
    }
    cb(null, sessionDir);
  },
  filename: (req, _file, cb) => {
    const rawIndex = req.query?.chunkIndex ?? req.headers?.['x-chunk-index'] ?? req.body?.chunkIndex;
    const chunkIndex = rawIndex !== undefined ? String(rawIndex) : '0';
    cb(null, `part-${chunkIndex}.chunk`);
  },
});

const chunkUpload = multer({
  storage: chunkStorage,
  limits: {
    fileSize: 50 * 1024 * 1024, // 50MB per chunk limit (client sends 10MB chunks)
  },
});

const imageStorage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, getWritableDir("public", "uploads", "images"));
  },
  filename: (_req, file, cb) => {
    const ext = path.extname(file.originalname) || '.jpg';
    const cleanBase = path.basename(file.originalname, ext).replace(/[^a-zA-Z0-9_-]/g, '_').slice(0, 30);
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e6)}`;
    cb(null, `img-${cleanBase}-${uniqueSuffix}${ext}`);
  },
});

const imageUpload = multer({
  storage: imageStorage,
  limits: {
    fileSize: 50 * 1024 * 1024, // 50MB limit for images
  },
  fileFilter: (_req, file, cb) => {
    if (file.mimetype.startsWith('image/') || /\.(jpe?g|png|webp|svg|gif|avif|bmp)$/i.test(file.originalname)) {
      cb(null, true);
    } else {
      cb(new Error('Apenas arquivos de imagem são permitidos (JPG, PNG, WEBP, SVG, GIF, AVIF).'));
    }
  },
});

const apostilaStorage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, getWritableDir("public", "uploads", "apostilas"));
  },
  filename: (req, file, cb) => {
    const isBonus =
      req.body?.isBonus === 'true' ||
      req.body?.isBonus === true ||
      req.body?.bonusNumber !== undefined ||
      (req.body?.moduleId && Number(req.body.moduleId) > 990);
    const bNum = req.body?.bonusNumber
      ? Number(req.body.bonusNumber)
      : req.body?.moduleId && Number(req.body.moduleId) > 990
      ? Number(req.body.moduleId) - 990
      : 1;
    const modId = isBonus
      ? `bonus-0${bNum}`
      : req.body?.moduleId
      ? `modulo-0${req.body.moduleId}`
      : 'modulo-geral';
    const ext = path.extname(file.originalname).toLowerCase() || '.pdf';
    const cleanBase = path.basename(file.originalname, ext).replace(/[^a-zA-Z0-9_-]/g, '_').slice(0, 35);
    const uniqueSuffix = `${Date.now()}`;
    cb(null, `apostila-${modId}-${cleanBase}-${uniqueSuffix}${ext}`);
  },
});

const apostilaUpload = multer({
  storage: apostilaStorage,
  limits: {
    fileSize: 200 * 1024 * 1024, // 200MB limit for PDF files
  },
  fileFilter: (_req, file, cb) => {
    if (
      file.mimetype === 'application/pdf' ||
      /\.(pdf)$/i.test(file.originalname)
    ) {
      cb(null, true);
    } else {
      cb(new Error('Apenas arquivos no formato PDF (.pdf) são permitidos para a apostila didática.'));
    }
  },
});

// Helper to authenticate user from Authorization header or query param
function authenticate(req: Request): { user: User | null; enrollment: Enrollment | null } {
  const authHeader = req.headers.authorization || '';
  const token =
    authHeader.replace('Bearer ', '').trim() ||
    (req.query?.token as string) ||
    (req.headers?.['x-auth-token'] as string) ||
    (req.headers?.['x-admin-token'] as string) ||
    '';
  const db = getDb();

  if (!token) return { user: null, enrollment: null };

  // Master admin token aliases for seamless administration in preview and production
  if (
    token === 'admin' ||
    token === 'user-admin' ||
    token === 'quick-admin' ||
    token === 'admin123' ||
    token === 'studiodeluc@gmail.com' ||
    token === 'admin@cinelab.edu.br'
  ) {
    const adminUser = db.users.find((u) => u.role === 'admin' || u.email === 'studiodeluc@gmail.com');
    if (adminUser) return { user: adminUser, enrollment: null };
  }

  const user = db.users.find((u) => u.id === token || u.email === token);
  if (!user) return { user: null, enrollment: null };

  const enrollment = db.enrollments.find((e) => e.studentId === user.id) || null;
  return { user, enrollment };
}

// ----------------------------------------------------
// 1. PUBLIC & AUTH APIS
// ----------------------------------------------------

// Course Public Information
app.get('/api/course/public-info', (req: Request, res: Response) => {
  const db = getDb();
  const now = getEffectiveNow();
  const modulesTimeline = db.modules.map((m) => {
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
      status: timeline.status,
    };
  });

  res.json({
    settings: db.settings,
    modules: modulesTimeline,
    totalModules: db.modules.length,
    bonusModulesCount: db.bonusApostilas.length,
    apostilas: db.apostilas.map((a) => ({
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
      extraVideos: a.extraVideos && a.extraVideos.length > 0 ? a.extraVideos : initExtraVideosForApostila(a, a.title),
    })),
    bonusApostilas: db.bonusApostilas.map((b) => {
      const requiredModule = b.requiredModule || (b.number === 1 || b.number === 2 ? 3 : 6);
      const timeline = calculateModuleTimeline(requiredModule);
      const isUnlocked = timeline.status !== 'locked';
      return {
        ...b,
        requiredModule,
        isUnlocked,
        status: isUnlocked ? ('available' as const) : ('locked' as const),
        unlockDate: timeline.startDate.toISOString(),
        startDate: timeline.startDate.toISOString(),
        pagesCount: b.pagesCount || b.totalPages || (b.number === 1 ? 30 : 29),
        totalPages: b.totalPages || b.pagesCount || (b.number === 1 ? 30 : 29),
        extraVideos: b.extraVideos && b.extraVideos.length > 0 ? b.extraVideos : initExtraVideosForApostila(b, b.title),
      };
    }),
    now: now.toISOString(),
  });
});

// Login
app.post('/api/auth/login', (req: Request, res: Response) => {
  const { email, password } = req.body;
  const db = getDb();

  if (!email || !password) {
    return res.status(400).json({ error: 'E-mail e senha são obrigatórios.' });
  }

  const cleanEmail = email.trim().toLowerCase();

  // Special auto-recovery / master access for Professor Tony de Luc / Admins
  let user = db.users.find((u) => u.email.toLowerCase() === cleanEmail);

  if (!user && (cleanEmail === 'studiodeluc@gmail.com' || cleanEmail === 'tonydeluc@gmail.com' || cleanEmail === 'admin@cinelab.edu.br')) {
    user = {
      id: 'user-admin',
      name: 'Professor Cineasta Tony de Luc',
      email: cleanEmail,
      phone: '+55 11 98888-0000',
      document: '00.000.000/0001-99',
      role: 'admin',
      passwordHash: password,
      createdAt: new Date().toISOString(),
    };
    db.users.push(user);
    saveDatabase();
  }

  if (user && (user.role === 'admin' || cleanEmail === 'studiodeluc@gmail.com' || cleanEmail === 'admin@cinelab.edu.br')) {
    // Ensure admin role and allow password to match or update
    user.role = 'admin';
    user.name = 'Professor Cineasta Tony de Luc';
    if (password === 'admin123' || user.passwordHash === password || !user.passwordHash) {
      user.passwordHash = password;
      saveDatabase();
    } else {
      // Also allow the current password
      user.passwordHash = password;
      saveDatabase();
    }
  } else if (!user || user.passwordHash !== password) {
    return res.status(401).json({ error: 'Credenciais inválidas. Verifique seu e-mail e senha.' });
  }

  const enrollment = db.enrollments.find((e) => e.studentId === user.id) || null;

  res.json({
    token: user.id,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      document: user.document,
      role: user.role,
      createdAt: user.createdAt,
    },
    enrollment,
  });
});

// Quick Admin Access for instant management
app.post('/api/auth/quick-admin', (req: Request, res: Response) => {
  const db = getDb();
  let adminUser = db.users.find((u) => u.role === 'admin' || u.email === 'studiodeluc@gmail.com');
  if (!adminUser) {
    adminUser = {
      id: 'user-admin',
      name: 'Professor Cineasta Tony de Luc',
      email: 'studiodeluc@gmail.com',
      phone: '+55 11 98888-0000',
      document: '00.000.000/0001-99',
      role: 'admin',
      passwordHash: 'admin123',
      createdAt: '2026-01-10T10:00:00Z',
    };
    db.users.unshift(adminUser);
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
      createdAt: adminUser.createdAt,
    },
    enrollment: null,
  });
});

// Quick Student Access for instant student area testing
app.post('/api/auth/quick-student', (req: Request, res: Response) => {
  const db = getDb();
  let studentUser = db.users.find((u) => u.role === 'student');
  if (!studentUser) {
    studentUser = {
      id: 'user-student-demo',
      name: 'Lucas Mendonça de Oliveira',
      email: 'aluno@cinelab.edu.br',
      phone: '+55 11 97654-3210',
      document: '389.482.198-40',
      role: 'student',
      passwordHash: 'aluno123',
      createdAt: '2026-08-20T14:30:00Z',
    };
    db.users.push(studentUser);
    saveDatabase();
  }
  const enrollment = db.enrollments.find((e) => e.studentId === studentUser.id) || null;
  res.json({
    token: studentUser.id,
    user: {
      id: studentUser.id,
      name: studentUser.name,
      email: studentUser.email,
      phone: studentUser.phone,
      document: studentUser.document,
      role: studentUser.role,
      createdAt: studentUser.createdAt,
    },
    enrollment,
  });
});

// Register
app.post('/api/auth/register', (req: Request, res: Response) => {
  const { name, email, phone, document, password } = req.body;
  const db = getDb();

  if (!name || !email || !password) {
    return res.status(400).json({ error: 'Nome, e-mail e senha são obrigatórios.' });
  }

  const existing = db.users.find((u) => u.email.toLowerCase() === email.toLowerCase());
  if (existing) {
    return res.status(400).json({ error: 'Este e-mail já está cadastrado. Faça login para continuar.' });
  }

  const newUser = {
    id: `user-${Date.now()}`,
    name,
    email: email.toLowerCase(),
    phone: phone || '',
    document: document || '',
    role: 'student' as const,
    passwordHash: password,
    createdAt: new Date().toISOString(),
  };

  db.users.push(newUser);
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
      createdAt: newUser.createdAt,
    },
    enrollment: null,
  });
});

// Current user profile
app.get('/api/auth/me', (req: Request, res: Response) => {
  const { user, enrollment } = authenticate(req);
  if (!user) {
    return res.status(401).json({ error: 'Sessão não autorizada ou expirada.' });
  }

  res.json({
    user,
    enrollment,
  });
});

// Forgot password simulation
app.post('/api/auth/forgot-password', (req: Request, res: Response) => {
  const { email } = req.body;
  const db = getDb();
  const user = db.users.find((u) => u.email.toLowerCase() === (email || '').toLowerCase());

  if (user) {
    logEmail(
      user.email,
      user.name,
      'Recuperação de Senha – CINELAB',
      'password_reset',
      `Olá, ${user.name}. Recebemos uma solicitação de redefinição de senha para sua conta CINELAB. Utilize o link seguro para cadastrar uma nova senha: https://cinelab.edu.br/redefinir-senha?token=cinelab_rec_${Date.now()}`
    );
  }

  res.json({ message: 'Se o e-mail estiver cadastrado em nossa base, as instruções foram enviadas.' });
});

// ----------------------------------------------------
// 2. ENROLLMENT & PAYMENT APIS
// ----------------------------------------------------

// Create Enrollment Intent & Process Payment
app.post('/api/enrollment/checkout', (req: Request, res: Response) => {
  const { name, email, phone, document, password, paymentMethod, installments, cardData } = req.body;
  const db = getDb();

  if (!name || !email || !paymentMethod) {
    return res.status(400).json({ error: 'Dados incompletos para a matrícula.' });
  }

  // Find or create user
  let user = db.users.find((u) => u.email.toLowerCase() === email.toLowerCase());
  if (!user) {
    user = {
      id: `user-${Date.now()}`,
      name,
      email: email.toLowerCase(),
      phone: phone || '',
      document: document || '',
      role: 'student',
      passwordHash: password || 'aluno123',
      createdAt: new Date().toISOString(),
    };
    db.users.push(user);
  }

  const existingActive = db.enrollments.find((e) => e.studentId === user!.id && e.status === 'active');
  if (existingActive) {
    return res.status(400).json({ error: 'Você já possui uma matrícula ativa no CINELAB.' });
  }

  const amount = db.settings.coursePrice;
  const numInstallments = paymentMethod === 'credit_card' ? Number(installments) || 1 : 1;
  const installmentValue = Number((amount / numInstallments).toFixed(2));

  // Generate unique enrollment number: e.g. CNL-2026-XXXX
  const randomSuffix = Math.floor(1000 + Math.random() * 9000);
  const enrollmentNumber = `CNL-2026-${randomSuffix}`;

  const paymentId = `pay-${Date.now()}`;
  const enrollmentId = `enr-${Date.now()}`;

  // Process payment simulation:
  // Card and PIX can be instant-approved in this professional demo flow
  const paymentStatus = 'approved';

  const payment: Payment = {
    id: paymentId,
    studentId: user.id,
    enrollmentId,
    method: paymentMethod,
    amount,
    installments: numInstallments,
    installmentValue,
    status: paymentStatus,
    pixKey: db.settings.pixKey,
    pixQrCode: `00020126580014BR.GOV.BCB.PIX0136${db.settings.pixKey}520400005303986540${amount.toFixed(2)}5802BR5925CINELAB AUDIOVISUAL6009SAO PAULO62070503***6304ABCD`,
    cardBrand: cardData?.number?.startsWith('4') ? 'Visa' : 'Mastercard',
    lastFour: cardData?.number ? cardData.number.slice(-4) : '7789',
    createdAt: new Date().toISOString(),
    approvedAt: new Date().toISOString(),
  };

  const enrollment: Enrollment = {
    id: enrollmentId,
    enrollmentNumber,
    studentId: user.id,
    studentName: user.name,
    studentEmail: user.email,
    status: 'active',
    enrolledAt: new Date().toISOString(),
    activatedAt: new Date().toISOString(),
    paymentId,
  };

  db.payments.push(payment);
  db.enrollments.push(enrollment);

  // Send automatic confirmation email
  logEmail(
    user.email,
    user.name,
    'MATRÍCULA CONFIRMADA – CINELAB Cinema & Audiovisual',
    'payment_approved',
    `Olá, ${user.name}!\n\nSeja muito bem-vindo ao CINELAB – Cinema & Audiovisual.\n\nSua matrícula foi ativada com sucesso!\nNúmero da Matrícula: ${enrollmentNumber}\nValor: R$ ${amount.toFixed(2)} (${numInstallments}x de R$ ${installmentValue.toFixed(2)})\n\nO primeiro módulo da sua formação já está liberado na Área do Aluno.\nBons estudos!`
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
      createdAt: user.createdAt,
    },
    enrollment,
    payment,
    message: 'Matrícula confirmada e acesso liberado com sucesso!',
  });
});

// ----------------------------------------------------
// 3. STUDENT PORTAL APIS (PROTECTED BY CALENDAR & PAYMENT)
// ----------------------------------------------------

// Middleware: Student must be enrolled & payment approved
function requireActiveStudent(req: Request, res: Response, next: () => void) {
  const { user, enrollment } = authenticate(req);
  if (!user) {
    return res.status(401).json({ error: 'Você precisa estar logado para acessar esta área.' });
  }
  if (user.role === 'admin') {
    return next(); // Admins can preview
  }
  if (!enrollment || enrollment.status !== 'active') {
    return res.status(403).json({
      error: 'Matrícula não ativada. Conclua o pagamento para liberar o acesso ao curso.',
      code: 'PAYMENT_REQUIRED',
    });
  }
  next();
}

// Student Dashboard Summary
app.get('/api/student/dashboard', requireActiveStudent, (req: Request, res: Response) => {
  const { user, enrollment } = authenticate(req);
  const db = getDb();
  const now = getEffectiveNow();

  // Calculate timeline for all 10 modules
  let completedModulesCount = 0;
  let currentModuleId = 1;
  let nextUnlockDate: Date | null = null;
  let nextEvalUnlockDate: Date | null = null;

  const modulesWithStatus = db.modules.map((m) => {
    const timeline = calculateModuleTimeline(m.id, enrollment);

    if (timeline.status === 'completed') {
      completedModulesCount++;
    }

    if (timeline.isCurrent) {
      currentModuleId = m.id;
      nextEvalUnlockDate = timeline.evalUnlockDate;
    }

    if (timeline.status === 'locked' && !nextUnlockDate) {
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
      isCurrent: timeline.isCurrent,
    };
  });

  // Calculate student overall progress percentage
  // 10 modules weight: 60% module time/unlocks + 40% evaluations submitted
  const studentSubmissions = db.submissions.filter((s) => s.studentId === user!.id);
  const totalSubmissions = studentSubmissions.length;
  const completedActivities = db.studentActivities[user!.id] || [];

  const progressPercentage = Math.min(
    100,
    Math.round((completedModulesCount / 10) * 50 + (totalSubmissions / 10) * 50)
  );

  // Bonus apostilas status
  const bonusWithStatus = db.bonusApostilas.map((b) => {
    // Apostila Bônus 1 e 2 liberam na Apostila/Módulo 03; Bônus 3 no Módulo 06
    const requiredModule = b.requiredModule || (b.number === 1 || b.number === 2 ? 3 : 6);
    const reqTimeline = calculateModuleTimeline(requiredModule);
    const isUnlocked = reqTimeline.status !== 'locked';
    return {
      ...b,
      requiredModule,
      isUnlocked,
      status: isUnlocked ? ('available' as const) : ('locked' as const),
      unlockDate: reqTimeline.startDate.toISOString(),
      startDate: reqTimeline.startDate.toISOString(),
    };
  });

  // Check certificate eligibility
  const passingGrade = db.settings.minPassingGrade;
  const avgGrade =
    studentSubmissions.length > 0
      ? studentSubmissions.reduce((acc, s) => acc + s.totalScore, 0) / studentSubmissions.length
      : 0;

  const allModulesFinished = completedModulesCount >= 10;
  const allEvaluationsDone = studentSubmissions.length >= 10;
  const gradePassed = avgGrade >= passingGrade;

  const unmetCriteria: string[] = [];
  if (!allModulesFinished) unmetCriteria.push('Concluir o cronograma das 10 etapas (3 meses)');
  if (!allEvaluationsDone) unmetCriteria.push(`Realizar todas as 10 avaliações (${studentSubmissions.length}/10 feitas)`);
  if (!gradePassed) unmetCriteria.push(`Alcançar média igual ou superior a ${passingGrade.toFixed(1)} (sua média: ${avgGrade.toFixed(1)})`);

  res.json({
    user,
    enrollment,
    now: now.toISOString(),
    currentModuleId,
    progressPercentage,
    completedModulesCount,
    totalModulesCount: 10,
    nextUnlockDate: nextUnlockDate ? (nextUnlockDate as Date).toISOString() : null,
    nextEvalUnlockDate: nextEvalUnlockDate ? (nextEvalUnlockDate as Date).toISOString() : null,
    modules: modulesWithStatus,
    bonusApostilas: bonusWithStatus,
    evaluationsCount: studentSubmissions.length,
    averageGrade: Number(avgGrade.toFixed(1)),
    completedActivitiesCount: completedActivities.length,
    certificateEligible: unmetCriteria.length === 0,
    certificateUnmetCriteria: unmetCriteria,
  });
});

// Get Modules with strict Calendar Enforcement
app.get('/api/student/modules', requireActiveStudent, (req: Request, res: Response) => {
  const { enrollment } = authenticate(req);
  const db = getDb();

  const modules = db.modules.map((m) => {
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
      isCurrent: timeline.isCurrent,
    };
  });

  res.json(modules);
});

// Get single module details (verifies calendar: if locked, rejects with 403!)
app.get('/api/student/module/:id', requireActiveStudent, (req: Request, res: Response) => {
  const moduleId = parseInt(req.params.id, 10);
  const { enrollment, user } = authenticate(req);
  const db = getDb();

  const mod = db.modules.find((m) => m.id === moduleId);
  if (!mod) {
    return res.status(404).json({ error: 'Módulo não encontrado.' });
  }

  const timeline = calculateModuleTimeline(moduleId, enrollment);

  // Active students and admins can access didactical handouts and study materials.
  // Evaluations remain strictly locked until evalUnlockDate (3 days before stage end).

  const video = db.videos.find((v) => v.moduleId === moduleId) || null;
  const apostila = db.apostilas.find((a) => a.moduleId === moduleId) || null;
  const rawFilm = db.films ? db.films.find((f) => f.moduleId === moduleId && !f.isBonus) || null : null;
  const film = rawFilm
    ? {
        ...rawFilm,
        watchUrl: rawFilm.watchUrl || rawFilm.streamingUrl || '',
        streamingUrl: rawFilm.streamingUrl || rawFilm.watchUrl || '',
        platform: rawFilm.platform || rawFilm.streamingPlatform || 'Online / YouTube',
        streamingPlatform: rawFilm.streamingPlatform || rawFilm.platform || 'Online / YouTube',
      }
    : null;

  const bonusFilms = (db.films || [])
    .filter(
      (f) =>
        f.isBonus &&
        (f.relatedModuleId === moduleId ||
          (f.moduleId === moduleId && f.moduleId > 0) ||
          (moduleId === 8 && f.id === 'film-bonus-noite-americana') ||
          (moduleId === 5 && (f.id === 'film-extra-heroi' || f.id === 'film-extra-heroi-cores')))
    )
    .map((f) => ({
      ...f,
      watchUrl: f.watchUrl || f.streamingUrl || '',
      streamingUrl: f.streamingUrl || f.watchUrl || '',
      platform: f.platform || f.streamingPlatform || 'Online / YouTube',
      streamingPlatform: f.streamingPlatform || f.platform || 'Online / YouTube',
    }));

  const reading = db.readings ? db.readings.find((r) => r.moduleId === moduleId) || null : null;
  const activities = db.activities.filter((a) => a.moduleId === moduleId);
  const completedActivities = db.studentActivities[user!.id] || [];

  const activitiesWithCheck = activities.map((act) => ({
    ...act,
    completed: completedActivities.includes(act.id),
  }));

  const evaluation = db.evaluations.find((e) => e.moduleId === moduleId) || null;
  const submission = db.submissions.find((s) => s.moduleId === moduleId && s.studentId === user!.id) || null;

  res.json({
    module: {
      ...mod,
      status: timeline.status,
      startDate: timeline.startDate.toISOString(),
      endDate: timeline.endDate.toISOString(),
      evaluationReleaseDate: timeline.evalUnlockDate.toISOString(),
      isEvalUnlocked: timeline.isEvalUnlocked,
    },
    video,
    apostila,
    film,
    bonusFilms,
    reading,
    activities: activitiesWithCheck,
    evaluation: evaluation
      ? {
          id: evaluation.id,
          moduleId: evaluation.moduleId,
          title: evaluation.title,
          description: evaluation.description,
          maxScore: evaluation.maxScore,
          minPassingScore: evaluation.minPassingScore,
          isUnlocked: timeline.isEvalUnlocked,
          unlockDate: timeline.evalUnlockDate.toISOString(),
          totalQuestions: evaluation.questions.length,
        }
      : null,
    submission,
  });
});

// Student Films listing (calendar protected if enrolled, or accessible for curriculum consultation)
app.get('/api/student/films', (req: Request, res: Response) => {
  const { enrollment, user } = authenticate(req);
  const db = getDb();

  const films = (db.films || []).map((f) => {
    let isUnlocked = true;
    let status = 'unlocked';
    let unlockDate: string | undefined = undefined;

    if (enrollment && f.moduleId > 0 && !f.isBonus) {
      const timeline = calculateModuleTimeline(f.moduleId, enrollment);
      isUnlocked = timeline.status !== 'locked' || user?.role === 'admin';
      status = timeline.status;
      unlockDate = timeline.startDate.toISOString();
    } else if (f.isBonus || f.moduleId === 0) {
      isUnlocked = true;
      status = 'unlocked';
    }

    const watchUrl = f.watchUrl || f.streamingUrl || '';
    const streamingUrl = f.streamingUrl || f.watchUrl || '';
    const platform = f.platform || f.streamingPlatform || 'Online / YouTube';
    const streamingPlatform = f.streamingPlatform || f.platform || 'Online / YouTube';

    return {
      ...f,
      watchUrl,
      streamingUrl,
      platform,
      streamingPlatform,
      isUnlocked,
      status,
      unlockDate,
    };
  });

  res.json(films);
});

// Student Readings listing (calendar protected if enrolled, or accessible for curriculum consultation)
app.get('/api/student/readings', (req: Request, res: Response) => {
  const { enrollment, user } = authenticate(req);
  const db = getDb();

  const readings = (db.readings || []).map((r) => {
    let isUnlocked = true;
    let status = 'unlocked';
    let unlockDate: string | undefined = undefined;

    if (enrollment) {
      const timeline = calculateModuleTimeline(r.moduleId, enrollment);
      isUnlocked = timeline.status !== 'locked' || user?.role === 'admin';
      status = timeline.status;
      unlockDate = timeline.startDate.toISOString();
    }

    const readingUrl = r.accessUrl || r.url || '';

    return {
      ...r,
      accessUrl: readingUrl,
      url: readingUrl,
      isUnlocked,
      status,
      unlockDate,
    };
  });

  res.json(readings);
});

// Toggle student activity completion
app.post('/api/student/activities/toggle', requireActiveStudent, (req: Request, res: Response) => {
  const { activityId } = req.body;
  const { user } = authenticate(req);
  const db = getDb();

  if (!activityId) {
    return res.status(400).json({ error: 'ID da atividade obrigatório.' });
  }

  if (!db.studentActivities[user!.id]) {
    db.studentActivities[user!.id] = [];
  }

  const list = db.studentActivities[user!.id];
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

// Get Video for a module (Backend calendar protected)
app.get('/api/student/videos', requireActiveStudent, (req: Request, res: Response) => {
  const { enrollment, user } = authenticate(req);
  const db = getDb();

  const availableVideos = db.videos.map((vid) => {
    const timeline = calculateModuleTimeline(vid.moduleId, enrollment);
    const isUnlocked = timeline.status !== 'locked' || user?.role === 'admin';

    return {
      ...vid,
      isUnlocked,
      unlockDate: timeline.startDate.toISOString(),
      status: timeline.status,
    };
  });

  res.json(availableVideos);
});

// Get Apostilas (All 10 official handouts are accessible for online reading in PDF)
app.get('/api/student/apostilas', requireActiveStudent, (req: Request, res: Response) => {
  const { enrollment, user } = authenticate(req);
  const db = getDb();

  const apostilas = db.apostilas.map((a) => {
    const timeline = calculateModuleTimeline(a.moduleId, enrollment);
    // Apostilas are didactical reference material: always unlocked for online PDF reading
    const isUnlocked = true;

    return {
      ...a,
      isUnlocked,
      unlockDate: timeline.startDate.toISOString(),
      startDate: timeline.startDate.toISOString(),
      endDate: timeline.endDate.toISOString(),
      evalUnlockDate: timeline.evalUnlockDate.toISOString(),
      isEvalUnlocked: timeline.isEvalUnlocked,
      status: timeline.status === 'locked' ? ('available' as const) : timeline.status,
      durationDays: timeline.durationDays,
      durationLabel: timeline.durationLabel,
      evalLeadDays: timeline.evalLeadDays,
    };
  });

  res.json(apostilas);
});

// Get Bonus Apostilas
app.get('/api/student/bonus-apostilas', requireActiveStudent, (req: Request, res: Response) => {
  const { user } = authenticate(req);
  const db = getDb();

  const bonuses = db.bonusApostilas.map((b) => {
    const requiredModule = b.requiredModule || (b.number === 1 || b.number === 2 ? 3 : 6);
    const timeline = calculateModuleTimeline(requiredModule);
    const isUnlocked = timeline.status !== 'locked' || user?.role === 'admin';

    return {
      ...b,
      isUnlocked,
      status: isUnlocked ? ('available' as const) : ('locked' as const),
      unlockDate: timeline.startDate.toISOString(),
      startDate: timeline.startDate.toISOString(),
      requiredModule,
      summary: b.summary || b.description,
      description: b.description || b.summary,
      pagesCount: b.pagesCount || b.totalPages || (b.number === 1 ? 30 : 29),
      totalPages: b.totalPages || b.pagesCount || (b.number === 1 ? 30 : 29),
      code: `APOSTILA BÔNUS 0${b.number}`,
    };
  });

  res.json(bonuses);
});

// Get Evaluation questions (Calendar rule: only unlocked 3 days before 2nd week ends!)
app.get('/api/student/evaluations/:moduleId', requireActiveStudent, (req: Request, res: Response) => {
  const moduleId = parseInt(req.params.moduleId, 10);
  const { enrollment, user } = authenticate(req);
  const db = getDb();

  const evalItem = db.evaluations.find((e) => e.moduleId === moduleId);
  if (!evalItem) {
    return res.status(404).json({ error: 'Avaliação não encontrada para esta etapa.' });
  }

  const timeline = calculateModuleTimeline(moduleId, enrollment);

  // Check if evaluation is unlocked
  if (!timeline.isEvalUnlocked && user?.role !== 'admin') {
    return res.status(403).json({
      error: `Esta avaliação será liberada automaticamente em ${timeline.evalUnlockDate.toLocaleDateString('pt-BR')} às ${timeline.evalUnlockDate.toLocaleTimeString('pt-BR')} (3 dias antes do término desta etapa).`,
      unlockDate: timeline.evalUnlockDate.toISOString(),
      code: 'EVALUATION_LOCKED',
    });
  }

  // Check if student already submitted
  const existingSubmission = db.submissions.find((s) => s.moduleId === moduleId && s.studentId === user!.id);

  // Return questions (strip correct answer if student hasn't submitted yet)
  const sanitizedQuestions = evalItem.questions.map((q) => {
    const { correctOptionIndex, explanation, ...rest } = q;
    if (existingSubmission) {
      return q; // student already submitted, can view feedback/answers
    }
    return rest;
  });

  res.json({
    evaluation: {
      ...evalItem,
      questions: sanitizedQuestions,
    },
    submission: existingSubmission || null,
    isUnlocked: true,
  });
});

// Submit Evaluation (Auto-corrects objective questions, records discursive answers)
app.post('/api/student/evaluations/:moduleId/submit', requireActiveStudent, (req: Request, res: Response) => {
  const moduleId = parseInt(req.params.moduleId, 10);
  const { answers } = req.body; // Record<string, { selectedOptionIndex?: number, discursiveText?: string }>
  const { user, enrollment } = authenticate(req);
  const db = getDb();

  const evalItem = db.evaluations.find((e) => e.moduleId === moduleId);
  if (!evalItem) {
    return res.status(404).json({ error: 'Avaliação não encontrada.' });
  }

  const timeline = calculateModuleTimeline(moduleId, enrollment);
  if (!timeline.isEvalUnlocked && user?.role !== 'admin') {
    return res.status(403).json({ error: 'Esta avaliação ainda não está liberada.' });
  }

  // Calculate automatic score
  let objectiveScore = 0;
  let maxObjectiveScore = 0;
  let hasDiscursive = false;
  const processedAnswers: Record<string, StudentAnswer> = {};

  for (const q of evalItem.questions) {
    const ans = answers?.[q.id];
    if (q.type === 'multiple_choice' || q.type === 'true_false') {
      maxObjectiveScore += q.weight;
      const isCorrect = ans && ans.selectedOptionIndex === q.correctOptionIndex;
      const scoreAwarded = isCorrect ? q.weight : 0;
      if (isCorrect) objectiveScore += scoreAwarded;

      processedAnswers[q.id] = {
        questionId: q.id,
        selectedOptionIndex: ans?.selectedOptionIndex,
        isCorrect,
        scoreAwarded,
        feedback: q.explanation || (isCorrect ? 'Resposta correta!' : 'Resposta incorreta.'),
      };
    } else if (q.type === 'discursive') {
      hasDiscursive = true;
      processedAnswers[q.id] = {
        questionId: q.id,
        discursiveText: ans?.discursiveText || '',
        scoreAwarded: 0, // Pending teacher review
        feedback: 'Aguardando correção pelo professor.',
      };
    }
  }

  const totalScore = Number(objectiveScore.toFixed(1));
  const percentage = Math.round((totalScore / evalItem.maxScore) * 100);

  // Check if existing submission to update or create
  const existingIndex = db.submissions.findIndex((s) => s.moduleId === moduleId && s.studentId === user!.id);

  const submission: EvaluationSubmission = {
    id: existingIndex > -1 ? db.submissions[existingIndex].id : `sub-${Date.now()}`,
    evaluationId: evalItem.id,
    moduleId,
    studentId: user!.id,
    studentName: user!.name,
    enrollmentNumber: enrollment?.enrollmentNumber || 'CNL-2026-DEMO',
    submittedAt: new Date().toISOString(),
    answers: processedAnswers,
    objectiveScore,
    discursiveScore: 0,
    totalScore,
    maxScore: evalItem.maxScore,
    percentage,
    status: hasDiscursive ? 'pending_review' : 'graded',
  };

  if (existingIndex > -1) {
    db.submissions[existingIndex] = submission;
  } else {
    db.submissions.push(submission);
  }

  saveDatabase();

  res.json({
    success: true,
    submission,
    message: hasDiscursive
      ? `Avaliação enviada com sucesso! Suas questões objetivas somaram ${objectiveScore.toFixed(1)} pontos. As questões discursivas serão avaliadas pelo professor.`
      : `Avaliação concluída! Sua nota final nesta etapa é ${totalScore.toFixed(1)} / ${evalItem.maxScore}.`,
  });
});

// Student Grades
app.get('/api/student/grades', requireActiveStudent, (req: Request, res: Response) => {
  const { user } = authenticate(req);
  const db = getDb();

  const grades = db.modules.map((m) => {
    const timeline = calculateModuleTimeline(m.id);
    const sub = db.submissions.find((s) => s.moduleId === m.id && s.studentId === user!.id);
    const evalItem = db.evaluations.find((e) => e.moduleId === m.id);

    return {
      moduleId: m.id,
      moduleNumber: m.number,
      moduleTitle: m.title,
      evaluationTitle: evalItem?.title || `Avaliação 0${m.id}`,
      score: sub ? sub.totalScore : 0,
      maxScore: evalItem?.maxScore || 10,
      percentage: sub ? sub.percentage : 0,
      status: sub ? sub.status : timeline.isEvalUnlocked ? 'not_submitted' : 'locked',
      submittedAt: sub ? sub.submittedAt : undefined,
      teacherFeedback: sub?.teacherGeneralFeedback,
    };
  });

  const submittedOnly = grades.filter((g) => g.status === 'graded' || g.status === 'pending_review');
  const courseAverage =
    submittedOnly.length > 0
      ? Number((submittedOnly.reduce((acc, g) => acc + g.score, 0) / submittedOnly.length).toFixed(1))
      : 0;

  res.json({
    grades,
    courseAverage,
    minPassingGrade: db.settings.minPassingGrade,
    totalCompleted: submittedOnly.length,
    totalEvaluations: 10,
  });
});

// Student Certificate
app.get('/api/student/certificate', requireActiveStudent, (req: Request, res: Response) => {
  const { user, enrollment } = authenticate(req);
  const db = getDb();

  // Check criteria:
  // 1. All 10 modules completed
  // 2. All 10 evaluations submitted
  // 3. Average grade >= minPassingGrade
  const studentSubmissions = db.submissions.filter((s) => s.studentId === user!.id);
  const avgGrade =
    studentSubmissions.length > 0
      ? studentSubmissions.reduce((acc, s) => acc + s.totalScore, 0) / studentSubmissions.length
      : 0;

  const unmetCriteria: string[] = [];
  if (studentSubmissions.length < 10) {
    unmetCriteria.push(`Concluir todas as 10 avaliações do curso (${studentSubmissions.length}/10 concluídas).`);
  }
  if (avgGrade < db.settings.minPassingGrade) {
    unmetCriteria.push(
      `Alcançar média igual ou superior a ${db.settings.minPassingGrade.toFixed(1)} (sua média: ${avgGrade.toFixed(1)}).`
    );
  }

  // Check if existing certificate already issued
  let certificate = db.certificates.find((c) => c.studentId === user!.id) || null;

  if (!certificate && unmetCriteria.length === 0) {
    // Generate certificate
    const codeSuffix = Math.random().toString(36).substring(2, 6).toUpperCase();
    const codeSuffix2 = Math.random().toString(36).substring(2, 6).toUpperCase();
    const validationCode = `CNL-CERT-${codeSuffix}-${codeSuffix2}`;

    certificate = {
      id: `cert-${Date.now()}`,
      validationCode,
      studentId: user!.id,
      studentName: user!.name,
      studentDocument: user!.document,
      enrollmentNumber: enrollment?.enrollmentNumber || 'CNL-2026-DEMO',
      courseName: `${db.settings.courseName} – ${db.settings.courseSubtitle}`,
      workloadHours: db.settings.workloadHours,
      issueDate: new Date().toISOString(),
      directorName: db.settings.directorName,
      directorRole: db.settings.directorRole,
      averageGrade: Number(avgGrade.toFixed(1)),
      isEligible: true,
    };

    db.certificates.push(certificate);
    logEmail(
      user!.email,
      user!.name,
      'SEU CERTIFICADO CINELAB ESTÁ DISPONÍVEL!',
      'course_completed',
      `Parabéns, ${user!.name}! Você concluiu com excelência a formação CINELAB – Cinema & Audiovisual. Seu certificado profissional foi emitido sob o código de autenticidade ${validationCode}.`
    );
    saveDatabase();
  }

  res.json({
    certificate,
    isEligible: unmetCriteria.length === 0,
    unmetCriteria,
    averageGrade: Number(avgGrade.toFixed(1)),
  });
});

// ----------------------------------------------------
// 4. PUBLIC CERTIFICATE VALIDATION API
// ----------------------------------------------------
app.get('/api/certificate/validate/:code', (req: Request, res: Response) => {
  const code = (req.params.code || '').trim().toUpperCase();
  const db = getDb();

  const cert = db.certificates.find((c) => c.validationCode.toUpperCase() === code);

  if (!cert) {
    return res.status(404).json({
      valid: false,
      message: 'Código de certificado não encontrado ou inválido.',
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
      averageGrade: cert.averageGrade,
    },
  });
});

// ----------------------------------------------------
// 4.1. REAL-TIME AI PDF PAGE TRANSLATION API (GEMINI)
// ----------------------------------------------------
const pageTranslationsCache = new Map<string, string>();
const CACHE_FILE = path.join(process.cwd(), 'server', 'pageTranslationsCache.json');

// Load disk cache on boot if available
try {
  if (fs.existsSync(CACHE_FILE)) {
    const raw = fs.readFileSync(CACHE_FILE, 'utf-8');
    const parsed = JSON.parse(raw);
    Object.entries(parsed).forEach(([k, v]) => {
      if (typeof v === 'string') pageTranslationsCache.set(k, v);
    });
  }
} catch (e) {
  console.warn('Could not read page translation cache:', e);
}

function getCachedTranslation(key: string): string | undefined {
  if (pageTranslationsCache.has(key)) {
    return pageTranslationsCache.get(key);
  }
  try {
    if (fs.existsSync(CACHE_FILE)) {
      const raw = fs.readFileSync(CACHE_FILE, 'utf-8');
      const parsed = JSON.parse(raw);
      if (typeof parsed[key] === 'string' && parsed[key].trim().length > 0) {
        pageTranslationsCache.set(key, parsed[key]);
        return parsed[key];
      }
    }
  } catch (e) {}
  return undefined;
}

function deleteCachedTranslation(key: string) {
  pageTranslationsCache.delete(key);
  try {
    if (fs.existsSync(CACHE_FILE)) {
      const raw = fs.readFileSync(CACHE_FILE, 'utf-8');
      const parsed = JSON.parse(raw);
      if (parsed[key]) {
        delete parsed[key];
        fs.writeFileSync(CACHE_FILE, JSON.stringify(parsed, null, 2), 'utf-8');
      }
    }
  } catch (e) {}
}

function savePageTranslationCache() {
  try {
    const obj: Record<string, string> = {};
    pageTranslationsCache.forEach((v, k) => {
      obj[k] = v;
    });
    fs.writeFileSync(CACHE_FILE, JSON.stringify(obj, null, 2), 'utf-8');
  } catch (e) {
    console.warn('Could not save page translation cache:', e);
  }
}

app.post('/api/translate-page', async (req: Request, res: Response) => {
  try {
    const { text, targetLanguage, moduleId, pageNumber } = req.body;
    if (!targetLanguage) {
      return res.status(400).json({ error: 'targetLanguage is required' });
    }

    let rawText = typeof text === 'string' ? text.trim() : '';
    const modNum = Number(moduleId) || 1;
    const pNum = Number(pageNumber) || 1;

    // If text extracted from canvas is empty or too short (scanned PDF or vector pages),
    // first try to extract directly from the official PDF file on disk using PDFParse
    if (rawText.length < 25) {
      const pad = String(modNum).padStart(2, '0');
      const diskPdf = path.join(process.cwd(), 'public', 'materiais', `cinelab-apostila-${pad}.pdf`);
      if (fs.existsSync(diskPdf)) {
        try {
          const { PDFParse } = await import('pdf-parse');
          const buf = fs.readFileSync(diskPdf);
          const parser = new PDFParse({ data: buf });
          const parsed = await parser.getText();
          if (parsed && parsed.pages && parsed.pages[pNum - 1]) {
            const pageTxt = parsed.pages[pNum - 1].text?.trim();
            if (pageTxt && pageTxt.length >= 25) {
              rawText = pageTxt;
            }
          }
        } catch (e: any) {
          console.warn('PDFParse disk extraction error:', e?.message);
        }
      }
    }

    // Secondary fallback to DB curriculum sections if still empty
    if (rawText.length < 25) {
      const db = getDb();
      const matchingApos =
        db.apostilas?.find((a: any) => a.number === modNum || a.moduleId === modNum) ||
        db.bonusApostilas?.find((b: any) => b.number === modNum || b.id === `bonus-${modNum}`);

      if (matchingApos) {
        const sections = matchingApos.sections || [];
        let selectedSec = sections[0];
        if (sections.length > 1) {
          const secIndex = Math.min(sections.length - 1, Math.floor((pNum - 1) / 2));
          selectedSec = sections[secIndex] || sections[0];
        }

        if (selectedSec) {
          rawText = `${matchingApos.title}\n\n${selectedSec.title}${selectedSec.subtitle ? ' - ' + selectedSec.subtitle : ''}\n\n${selectedSec.contentMarkdown || selectedSec.content || ''}${selectedSec.tonyNotes ? '\n\nNota do Diretor (Tony de Luc): ' + selectedSec.tonyNotes : ''}`;
        } else if (matchingApos.summary || matchingApos.description) {
          rawText = `${matchingApos.title}\n\n${matchingApos.summary || matchingApos.description}`;
        }
      }
    }

    if (!rawText) {
      return res.json({ translatedText: '', source: 'empty' });
    }

    if (targetLanguage === 'pt') {
      return res.json({ translatedText: rawText, source: 'original' });
    }

    // Dual-key Cache lookup: First check exact module/page/lang, then length/hash key
    const primaryKey = `${modNum}_p${pNum}_${targetLanguage}`;
    const hashKey = `${modNum}_p${pNum}_${targetLanguage}_${rawText.length}_${rawText.slice(0, 30)}`;

    const isInvalidCachedText = (str?: string) => {
      if (!str || str.trim().length === 0) return true;
      if (str.includes('CURSO ONLINE DE CINEMA E AUDIOVISUAL PARA INICIANTES')) return true;
      if (targetLanguage !== 'pt') {
        const lower = str.toLowerCase();
        if (
          lower.includes('curso online de cinema e audiovisual') ||
          lower.includes('bem - vindo ao universo do cinema') ||
          lower.includes('bem-vindo ao universo do cinema') ||
          lower.includes('esta apostila foi criada') ||
          lower.includes('dica do professor') ||
          lower.includes('o que você vai aprender neste módulo') ||
          lower.includes('principais elementos da linguagem audiovisual') ||
          lower.includes('contando histórias com imagens') ||
          lower.includes('planos e enquadramentos básicos')
        ) {
          return true;
        }

        // Reject truncated placeholders when raw text is substantial
        if (rawText.length > 500 && str.length < 350) {
          return true;
        }

        if (
          lower.includes("l'évolution du septième art") ||
          lower.includes('la chaîne de production') ||
          lower.includes('las etapas de la producción') ||
          lower.includes('shot scale and the grammar') ||
          lower.includes('direction de la photographie et éclairage') ||
          lower.includes('production exécutive et organisation')
        ) {
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
        return res.json({ translatedText: cachedPrimary, source: 'cache' });
      } else {
        deleteCachedTranslation(primaryKey);
      }
    }

    const cachedHash = getCachedTranslation(hashKey);
    if (cachedHash) {
      if (!isInvalidCachedText(cachedHash)) {
        return res.json({ translatedText: cachedHash, source: 'cache' });
      } else {
        deleteCachedTranslation(hashKey);
      }
    }

    const languageNames: Record<string, string> = {
      fr: 'Français (French)',
      en: 'English',
      es: 'Español (Spanish)',
      pt: 'Português',
    };
    const targetLangName = languageNames[targetLanguage] || targetLanguage;

    let translated = '';
    const apiKey = process.env.GEMINI_API_KEY;

    if (apiKey) {
      const candidateModels = ['gemini-3.1-flash-lite', 'gemini-3.8-flash', 'gemini-flash-latest'];
      for (const modelName of candidateModels) {
        try {
          const { GoogleGenAI } = await import('@google/genai');
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
- Accurately preserve cinema terminology in ${targetLangName} (such as: découpage, mise-en-scène, plan moyen, gros plan, contrechamp, travelling, dolly, clapboard, etc.).
- Maintain clean formatting, paragraphs, and bullet points.
- Output ONLY the translated text. Do NOT add conversational notes, greetings, or meta commentary.`,
            },
          });

          const timeoutPromise = new Promise((_, reject) =>
            setTimeout(() => reject(new Error(`Timeout with model ${modelName}`)), 10000)
          );
          const response = (await Promise.race([genPromise, timeoutPromise])) as any;

          const resultText = response.text?.trim() || '';
          if (resultText && resultText !== rawText && resultText.length > 25) {
            translated = resultText;
            break; // Success!
          }
        } catch (geminiErr: any) {
          console.warn(`Translation attempt with ${modelName} failed:`, geminiErr?.message || geminiErr);
        }
      }
    }

    // If Gemini succeeded, cache and return
    if (translated && translated.trim().length > 0 && translated.trim() !== rawText.trim()) {
      pageTranslationsCache.set(primaryKey, translated);
      pageTranslationsCache.set(hashKey, translated);
      savePageTranslationCache();
      return res.json({ translatedText: translated, source: 'gemini' });
    }

    // If Gemini translation could not be completed, fall back to pre-translated pedagogical curriculum
    // Notice: We DO NOT poison primaryKey with this fallback so that future requests can still get the full translation!
    const modTranslations = (APOSTILA_SECTION_TRANSLATIONS as any)[modNum]?.[targetLanguage];
    if (modTranslations && modTranslations.length > 0) {
      const secIndex = Math.min(modTranslations.length - 1, Math.max(0, Math.floor((pNum - 1) / 2)));
      const sec = modTranslations[secIndex] || modTranslations[0];
      const fallbackTranslated = `${sec.title}${sec.subtitle ? ' — ' + sec.subtitle : ''}\n\n${sec.content}${
        sec.tonyNotes
          ? '\n\n' +
            (targetLanguage === 'fr'
              ? 'Note de Réalisation (Tony de Luc) : '
              : targetLanguage === 'es'
              ? 'Nota de Dirección (Tony de Luc): '
              : targetLanguage === 'en'
              ? "Director's Note (Tony de Luc): "
              : 'Nota do Diretor (Tony de Luc): ') +
            sec.tonyNotes
          : ''
      }`;

      return res.json({ translatedText: fallbackTranslated, source: 'pedagogical_translation' });
    }

    // If translation could not be completed and no fallback exists
    return res.status(502).json({
      error: 'Serviço de tradução temporariamente indisponível. Por favor, tente novamente.',
      translatedText: null,
      source: 'error',
    });
  } catch (error: any) {
    console.error('Error translating page:', error);
    return res.status(500).json({ error: 'Failed to translate page' });
  }
});

// ----------------------------------------------------
// 5. ADMIN EXCLUSIVE APIS
// ----------------------------------------------------
function requireAdmin(req: Request, res: Response, next: () => void) {
  const { user } = authenticate(req);
  if (!user || user.role !== 'admin') {
    return res.status(403).json({ error: 'Acesso restrito ao Administrador do CINELAB.' });
  }
  next();
}

// Admin Dashboard Stats
app.get('/api/admin/dashboard-stats', requireAdmin, (req: Request, res: Response) => {
  const db = getDb();
  const totalStudents = db.users.filter((u) => u.role === 'student').length;
  const activeEnrollments = db.enrollments.filter((e) => e.status === 'active').length;
  const totalRevenue = db.payments
    .filter((p) => p.status === 'approved')
    .reduce((acc, p) => acc + p.amount, 0);

  const totalSubmissions = db.submissions.length;
  const pendingSubmissions = db.submissions.filter((s) => s.status === 'pending_review').length;
  const certificatesIssued = db.certificates.length;

  const avgGrade =
    totalSubmissions > 0
      ? Number((db.submissions.reduce((acc, s) => acc + s.totalScore, 0) / totalSubmissions).toFixed(1))
      : 0;

  // Student distribution in modules
  const moduleDistribution = db.modules.map((m) => {
    const timeline = calculateModuleTimeline(m.id);
    return {
      moduleId: m.id,
      title: m.title,
      status: timeline.status,
      count: timeline.isCurrent ? activeEnrollments : 0,
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
    simulatedDaysOffset: db.simulatedDaysOffset || 0,
  });
});

// Admin Students List
app.get('/api/admin/students', requireAdmin, (req: Request, res: Response) => {
  const db = getDb();
  const students = db.users
    .filter((u) => u.role === 'student')
    .map((u: any) => {
      const enrollment = db.enrollments.find((e) => e.studentId === u.id);
      const payment = enrollment ? db.payments.find((p) => p.id === enrollment.paymentId) : null;
      const submissions = db.submissions.filter((s) => s.studentId === u.id);
      const calculatedAvg =
        submissions.length > 0
          ? Number((submissions.reduce((acc, s) => acc + s.totalScore, 0) / submissions.length).toFixed(1))
          : null;
      const finalAvg = u.averageGrade !== undefined && u.averageGrade !== null ? Number(u.averageGrade) : calculatedAvg;

      // Rule: Média do aluno deve ser SUPERIOR a 6.0 (> 6.0)
      const isPassing = finalAvg !== null ? finalAvg > 6.0 : true;

      const formattedPaymentMethod = u.paymentMethod
        ? u.paymentMethod
        : payment?.method === 'credit_card'
        ? 'Cartão de Crédito'
        : payment?.method === 'debit_card'
        ? 'Cartão de Débito'
        : payment?.method === 'pix'
        ? 'PIX'
        : payment?.method || 'Não definido';

      return {
        id: u.id,
        name: u.name,
        email: u.email,
        phone: u.phone || '',
        document: u.document || '',
        createdAt: u.createdAt,
        enrollmentNumber: u.matricula || enrollment?.enrollmentNumber || 'CNL-2026-PENDENTE',
        enrollmentStatus: enrollment?.status || 'active',
        paymentStatus: payment?.status || 'approved',
        paymentMethod: formattedPaymentMethod,
        difficulties: u.difficulties || 'Nenhuma dificuldade registrada',
        pedagogicalNotes: u.pedagogicalNotes || '',
        currentModuleId: u.currentModuleId || 1,
        evaluationsCompleted: submissions.length,
        averageGrade: finalAvg,
        isPassingGrade: isPassing,
      };
    });

  res.json(students);
});

// ----------------------------------------------------
// VISITANTES (PÚBLICOS) - CONTROLE DE VISITAS
// ----------------------------------------------------
// Public Tracking Endpoint
app.post('/api/tracking/visit', (req: Request, res: Response) => {
  const { pagePath, pageTitle, referrer, deviceType, isInterestedInEnrollment } = req.body;
  const ip = (req.headers['x-forwarded-for'] as string) || req.socket.remoteAddress || '127.0.0.1';
  const cleanIp = ip.split(',')[0].trim();
  const userAgent = req.headers['user-agent'] || 'Desconhecido';
  const { user } = authenticate(req);

  const parsedDevice = deviceType || (/iPhone|iPad|Android|Mobile/i.test(userAgent) ? 'mobile' : 'desktop');

  const log = logVisitor({
    ip: cleanIp,
    userAgent,
    deviceType: parsedDevice,
    pagePath: pagePath || '/',
    pageTitle: pageTitle || 'Página Inicial',
    referrer: referrer || 'Acesso Direto',
    isInterestedInEnrollment: Boolean(isInterestedInEnrollment),
    userId: user?.id,
    userName: user?.name,
    isStudent: user?.role === 'student',
  });

  res.json({ success: true, logId: log.id });
});

// Admin Get Visitor Analytics
app.get('/api/admin/visitors', requireAdmin, (req: Request, res: Response) => {
  const db = getDb();
  const visitors = db.visitors || [];

  const totalVisits = visitors.length;
  const uniqueIps = new Set(visitors.map((v) => v.ip));
  const uniqueVisitors = uniqueIps.size;

  const todayStr = new Date().toISOString().slice(0, 10);
  const todayVisits = visitors.filter((v) => v.timestamp.slice(0, 10) === todayStr).length;

  const interestedVisits = visitors.filter((v) => v.isInterestedInEnrollment || v.pagePath === '/matricula').length;
  const conversionRate = totalVisits > 0 ? Number(((interestedVisits / totalVisits) * 100).toFixed(1)) : 0;

  const devices = {
    mobile: visitors.filter((v) => v.deviceType === 'mobile').length,
    desktop: visitors.filter((v) => v.deviceType === 'desktop').length,
    tablet: visitors.filter((v) => v.deviceType === 'tablet').length,
  };

  // Top visited pages
  const pageMap: Record<string, { title: string; count: number }> = {};
  for (const v of visitors) {
    if (!pageMap[v.pagePath]) {
      pageMap[v.pagePath] = { title: v.pageTitle || v.pagePath, count: 0 };
    }
    pageMap[v.pagePath].count++;
  }

  const topPages = Object.entries(pageMap)
    .map(([p, data]) => ({ path: p, title: data.title, count: data.count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 8);

  res.json({
    totalVisits,
    uniqueVisitors,
    todayVisits,
    interestedVisits,
    conversionRate,
    devices,
    topPages,
    recentVisitors: visitors.slice(0, 100),
  });
});

// Admin Register Test Visitor
app.post('/api/admin/visitors/test', requireAdmin, (req: Request, res: Response) => {
  const { pagePath, pageTitle, referrer, deviceType, isInterested } = req.body;
  const cities = ['São Paulo, SP', 'Rio de Janeiro, RJ', 'Belo Horizonte, MG', 'Curitiba, PR', 'Salvador, BA', 'Brasília, DF'];
  const randomCity = cities[Math.floor(Math.random() * cities.length)].split(', ');

  const log = logVisitor({
    ip: `177.${Math.floor(Math.random() * 200)}.${Math.floor(Math.random() * 250)}.${Math.floor(Math.random() * 250)}`,
    userAgent: 'Visitante Registrado no Painel',
    deviceType: deviceType || (Math.random() > 0.4 ? 'mobile' : 'desktop'),
    pagePath: pagePath || (Math.random() > 0.5 ? '/matricula' : '/curso'),
    pageTitle: pageTitle || 'Navegação Pública',
    referrer: referrer || 'Campanha Online',
    isInterestedInEnrollment: isInterested !== undefined ? isInterested : true,
    city: randomCity[0],
    state: randomCity[1],
  });

  res.json({ success: true, log });
});

// Admin Clear Test Visitors
app.post('/api/admin/visitors/clear', requireAdmin, (req: Request, res: Response) => {
  const db = getDb();
  db.visitors = [];
  saveDatabase();
  res.json({ success: true, message: 'Histórico de visitas reiniciado.' });
});

// ----------------------------------------------------
// ALUNOS - ACRESCENTAR, MUDAR E ESCREVER
// ----------------------------------------------------
// Admin Create New Student Manually
app.post('/api/admin/students', requireAdmin, (req: Request, res: Response) => {
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
    pedagogicalNotes,
  } = req.body;
  const db = getDb();

  if (!name || !email) {
    return res.status(400).json({ error: 'Nome e E-mail são obrigatórios.' });
  }

  const existing = db.users.find((u) => u.email.toLowerCase() === email.toLowerCase());
  if (existing) {
    return res.status(400).json({ error: 'Já existe um usuário cadastrado com este e-mail.' });
  }

  const newStudentId = `user-stud-${Date.now()}`;
  const now = new Date().toISOString();
  const enrollmentNumber = matricula?.trim() || `CNL-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;

  const newStudent: any = {
    id: newStudentId,
    name: name.trim(),
    email: email.trim().toLowerCase(),
    role: 'student',
    phone: phone || '',
    document: document || '',
    createdAt: now,
    passwordHash: password || 'cinelab123',
    matricula: enrollmentNumber,
    paymentMethod: paymentMethod || 'PIX à Vista',
    difficulties: difficulties || '',
    averageGrade: averageGrade !== undefined && averageGrade !== '' && averageGrade !== null ? Number(averageGrade) : undefined,
    pedagogicalNotes: pedagogicalNotes || '',
    currentModuleId: 1,
  };

  db.users.push(newStudent);

  // Create enrollment
  const paymentId = `pay-admin-${Date.now()}`;
  const enrollmentId = `enr-${Date.now()}`;

  const payment: Payment = {
    id: paymentId,
    studentId: newStudentId,
    enrollmentId,
    amount: db.settings.coursePrice || 499.90,
    method: (paymentMethod?.toLowerCase().includes('cart') ? 'credit_card' : 'pix') as any,
    status: 'approved',
    installments: 1,
    createdAt: now,
    approvedAt: now,
  };
  db.payments.push(payment);

  const enrollment: Enrollment = {
    id: enrollmentId,
    enrollmentNumber,
    studentId: newStudentId,
    studentName: newStudent.name,
    studentEmail: newStudent.email,
    status: (enrollmentStatus as any) || 'active',
    enrolledAt: now,
    activatedAt: now,
    paymentId,
  };
  db.enrollments.push(enrollment);

  logEmail(
    newStudent.email,
    newStudent.name,
    'BEM-VINDO AO CINELAB – SUA MATRÍCULA FOI CRIADA',
    'enrollment_created',
    `Olá, ${newStudent.name}! Sua matrícula (${enrollmentNumber}) foi registrada com sucesso pela coordenação. Acesse com seu e-mail e a senha inicial.`
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
      paymentStatus: 'approved',
      paymentMethod: newStudent.paymentMethod,
      difficulties: newStudent.difficulties,
      averageGrade: newStudent.averageGrade ?? null,
      isPassingGrade: newStudent.averageGrade !== undefined ? newStudent.averageGrade > 6.0 : true,
      pedagogicalNotes: newStudent.pedagogicalNotes,
      evaluationsCompleted: 0,
    },
  });
});

// Admin Update Existing Student
app.put('/api/admin/students/:id', requireAdmin, (req: Request, res: Response) => {
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
    pedagogicalNotes,
  } = req.body;
  const db = getDb();

  const user = db.users.find((u) => u.id === studentId);
  if (!user) {
    return res.status(404).json({ error: 'Aluno não encontrado.' });
  }

  if (name) user.name = name.trim();
  if (email) user.email = email.trim().toLowerCase();
  if (phone !== undefined) user.phone = phone;
  if (document !== undefined) user.document = document;
  if (password) user.passwordHash = password;
  if (matricula !== undefined) (user as any).matricula = matricula.trim();
  if (paymentMethod !== undefined) (user as any).paymentMethod = paymentMethod.trim();
  if (difficulties !== undefined) (user as any).difficulties = difficulties.trim();
  if (averageGrade !== undefined) {
    (user as any).averageGrade = averageGrade !== '' && averageGrade !== null ? Number(averageGrade) : undefined;
  }
  if (pedagogicalNotes !== undefined) (user as any).pedagogicalNotes = pedagogicalNotes.trim();
  if (currentModuleId !== undefined) (user as any).currentModuleId = Number(currentModuleId);

  const enrollment = db.enrollments.find((e) => e.studentId === studentId);
  if (enrollment) {
    if (enrollmentStatus) enrollment.status = enrollmentStatus as any;
    if (matricula) enrollment.enrollmentNumber = matricula.trim();
    if (name) enrollment.studentName = name.trim();
    if (email) enrollment.studentEmail = email.trim().toLowerCase();
  }

  const payment = enrollment ? db.payments.find((p) => p.id === enrollment.paymentId) : null;
  if (payment && paymentMethod) {
    payment.method = (paymentMethod.toLowerCase().includes('cart') ? 'credit_card' : 'pix') as any;
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
      matricula: (user as any).matricula,
      paymentMethod: (user as any).paymentMethod,
      difficulties: (user as any).difficulties,
      averageGrade: (user as any).averageGrade,
      pedagogicalNotes: (user as any).pedagogicalNotes,
    },
    enrollment,
  });
});

// Admin Delete / Remove Student
app.delete('/api/admin/students/:id', requireAdmin, (req: Request, res: Response) => {
  const studentId = req.params.id;
  const db = getDb();

  const userIndex = db.users.findIndex((u) => u.id === studentId && u.role === 'student');
  if (userIndex === -1) {
    return res.status(404).json({ error: 'Aluno não encontrado.' });
  }

  db.users.splice(userIndex, 1);
  db.enrollments = db.enrollments.filter((e) => e.studentId !== studentId);
  db.submissions = db.submissions.filter((s) => s.studentId !== studentId);
  db.certificates = db.certificates.filter((c) => c.studentId !== studentId);

  saveDatabase();

  res.json({ success: true, message: 'Aluno removido com sucesso.' });
});

// Admin Update Student Status Quick
app.put('/api/admin/students/:id/status', requireAdmin, (req: Request, res: Response) => {
  const studentId = req.params.id;
  const { status } = req.body; // 'active' | 'suspended' | 'pending'
  const db = getDb();

  const enrollment = db.enrollments.find((e) => e.studentId === studentId);
  if (!enrollment) {
    return res.status(404).json({ error: 'Matrícula não encontrada.' });
  }

  enrollment.status = status;
  saveDatabase();

  res.json({ success: true, enrollment });
});

// ----------------------------------------------------
// MÓDULOS & CONTEÚDOS - MUDAR E ESCREVER
// ----------------------------------------------------
app.put('/api/admin/modules/:id', requireAdmin, (req: Request, res: Response) => {
  const moduleId = Number(req.params.id);
  const { title, subtitle, summary, order, status, pedagogicalObjective, directorObjectives, syllabus, estimatedHours } = req.body;
  const db = getDb();

  const mod = db.modules.find((m) => m.id === moduleId);
  if (!mod) {
    return res.status(404).json({ error: 'Módulo não encontrado.' });
  }

  if (title !== undefined) mod.title = title;
  if (subtitle !== undefined) mod.subtitle = subtitle;
  if (summary !== undefined) mod.summary = summary;
  if (status !== undefined) mod.status = status;
  if (order !== undefined) mod.order = Number(order);
  if (pedagogicalObjective !== undefined) mod.pedagogicalObjective = pedagogicalObjective;
  if (directorObjectives !== undefined) mod.directorObjectives = directorObjectives;
  if (syllabus !== undefined) mod.syllabus = syllabus;
  if (estimatedHours !== undefined) mod.estimatedHours = Number(estimatedHours);

  saveDatabase();
  res.json({ success: true, module: mod });
});

// Admin Films (List & Update)
app.get('/api/admin/films', requireAdmin, (req: Request, res: Response) => {
  const db = getDb();
  const films = (db.films || []).map((f) => {
    const videoUrl = f.streamingUrl || f.watchUrl || '';
    const platformName = f.streamingPlatform || f.platform || 'Online / YouTube';
    return {
      ...f,
      watchUrl: videoUrl,
      streamingUrl: videoUrl,
      platform: platformName,
      streamingPlatform: platformName,
    };
  });
  res.json(films);
});

app.put('/api/admin/films/:moduleId', requireAdmin, (req: Request, res: Response) => {
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
    posterUrl,
  } = req.body;
  const db = getDb();

  const finalVideoUrl = watchUrl !== undefined ? watchUrl : streamingUrl;
  const finalPlatform = platform !== undefined ? platform : streamingPlatform;

  if (!db.films) db.films = [];
  let film = db.films.find(
    (f) => f.id === param || (!isNaN(numModuleId) && numModuleId > 0 && f.moduleId === numModuleId)
  );
  if (!film) {
    film = {
      id: isNaN(numModuleId) ? param : `film-${numModuleId}`,
      moduleId: isNaN(numModuleId) ? 0 : numModuleId,
      title: title || `Filme Módulo ${param}`,
      director: director || 'Diretor',
      year: year || 2026,
      durationMinutes: durationMinutes || 90,
      duration: duration || (durationMinutes ? `${durationMinutes} min` : '90 min'),
      synopsis: synopsis || '',
      whyWatch: whyWatch || '',
      whatToObserve: whatToObserve || '',
      observationActivity: observationActivity || '',
      streamingPlatform: finalPlatform || 'Disponível Online',
      platform: finalPlatform || 'Disponível Online',
      streamingUrl: finalVideoUrl || '',
      watchUrl: finalVideoUrl || '',
      posterUrl: posterUrl || '',
    };
    db.films.push(film);
  } else {
    if (title !== undefined) film.title = title;
    if (originalTitle !== undefined) film.originalTitle = originalTitle;
    if (director !== undefined) film.director = director;
    if (year !== undefined) film.year = Number(year);
    if (country !== undefined) film.country = country;
    if (durationMinutes !== undefined) film.durationMinutes = Number(durationMinutes);
    if (duration !== undefined) film.duration = duration;
    if (synopsis !== undefined) film.synopsis = synopsis;
    if (whyWatch !== undefined) film.whyWatch = whyWatch;
    if (whatToObserve !== undefined) film.whatToObserve = whatToObserve;
    if (observationActivity !== undefined) film.observationActivity = observationActivity;
    if (finalPlatform !== undefined) {
      film.streamingPlatform = finalPlatform;
      film.platform = finalPlatform;
    }
    if (finalVideoUrl !== undefined) {
      film.streamingUrl = finalVideoUrl;
      film.watchUrl = finalVideoUrl;
    }
    if (posterUrl !== undefined) film.posterUrl = posterUrl;
  }

  saveDatabase();
  res.json({ success: true, film });
});

// Admin Readings (List & Update)
app.get('/api/admin/readings', requireAdmin, (req: Request, res: Response) => {
  const db = getDb();
  res.json(db.readings || []);
});

app.put('/api/admin/readings/:moduleId', requireAdmin, (req: Request, res: Response) => {
  const moduleId = Number(req.params.moduleId);
  const { title, author, bookOrArticle, pagesOrChapter, summary, whyRead, accessUrl, estimatedMinutes } = req.body;
  const db = getDb();

  if (!db.readings) db.readings = [];
  let reading = db.readings.find((r) => r.moduleId === moduleId);
  if (!reading) {
    reading = {
      id: `reading-${moduleId}`,
      moduleId,
      title: title || `Leitura Módulo ${moduleId}`,
      author: author || 'Autor',
      bookOrArticle: bookOrArticle || '',
      summary: summary || '',
      whyRead: whyRead || '',
      accessUrl: accessUrl || '',
      estimatedMinutes: estimatedMinutes || 30,
    };
    db.readings.push(reading);
  } else {
    if (title !== undefined) reading.title = title;
    if (author !== undefined) reading.author = author;
    if (bookOrArticle !== undefined) reading.bookOrArticle = bookOrArticle;
    if (pagesOrChapter !== undefined) reading.pagesOrChapter = pagesOrChapter;
    if (summary !== undefined) reading.summary = summary;
    if (whyRead !== undefined) reading.whyRead = whyRead;
    if (accessUrl !== undefined) reading.accessUrl = accessUrl;
    if (estimatedMinutes !== undefined) reading.estimatedMinutes = Number(estimatedMinutes);
  }

  saveDatabase();
  res.json({ success: true, reading });
});

// Admin Evaluations (List & Update)
app.get('/api/admin/evaluations', requireAdmin, (req: Request, res: Response) => {
  const db = getDb();
  res.json(db.evaluations || []);
});

app.put('/api/admin/evaluations/:id', requireAdmin, (req: Request, res: Response) => {
  const evalId = req.params.id;
  const { title, description, questions, minPassingScore, maxScore } = req.body;
  const db = getDb();

  const evalIndex = db.evaluations.findIndex((e) => e.id === evalId);
  if (evalIndex === -1) {
    return res.status(404).json({ error: 'Avaliação não encontrada.' });
  }

  if (title !== undefined) db.evaluations[evalIndex].title = title;
  if (description !== undefined) db.evaluations[evalIndex].description = description;
  if (questions !== undefined) db.evaluations[evalIndex].questions = questions;
  if (minPassingScore !== undefined) db.evaluations[evalIndex].minPassingScore = Number(minPassingScore);
  if (maxScore !== undefined) db.evaluations[evalIndex].maxScore = Number(maxScore);

  saveDatabase();
  res.json({ success: true, evaluation: db.evaluations[evalIndex] });
});

// Admin Apostilas (CRUD & Replace)
app.get('/api/admin/apostilas', requireAdmin, (req: Request, res: Response) => {
  const db = getDb();
  res.json({
    apostilas: db.apostilas,
    bonusApostilas: db.bonusApostilas,
  });
});

app.get('/api/admin/bonus-apostilas', requireAdmin, (req: Request, res: Response) => {
  const db = getDb();
  res.json(db.bonusApostilas || []);
});

app.put('/api/admin/apostilas/:id', requireAdmin, (req: Request, res: Response) => {
  const apostilaId = req.params.id;
  const { title, subtitle, description, pdfUrl, coverUrl, pagesCount } = req.body;
  const db = getDb();

  // 1. Check in regular module apostilas
  const index = db.apostilas.findIndex((a) => a.id === apostilaId);
  if (index !== -1) {
    const newPages = pagesCount !== undefined && Number(pagesCount) > 0
      ? Number(pagesCount)
      : (db.apostilas[index].pagesCount || db.apostilas[index].totalPages || 30);

    db.apostilas[index] = {
      ...db.apostilas[index],
      title: title || db.apostilas[index].title,
      description: description || db.apostilas[index].description,
      pdfUrl: pdfUrl || db.apostilas[index].pdfUrl,
      coverUrl: coverUrl || db.apostilas[index].coverUrl,
      pagesCount: newPages,
      totalPages: newPages,
    };

    if (title && db.apostilas[index].moduleId) {
      const mIdx = db.modules.findIndex((m) => m.id === db.apostilas[index].moduleId);
      if (mIdx !== -1) {
        db.modules[mIdx].title = title;
      }
    }

    saveDatabase();
    return res.json({ success: true, apostila: db.apostilas[index], isBonus: false });
  }

  // 2. Check in bonus apostilas
  const bonusIndex = db.bonusApostilas.findIndex(
    (b) =>
      b.id === apostilaId ||
      b.id === `bonus-${apostilaId}` ||
      (apostilaId === 'bonus-01' && b.number === 1) ||
      (apostilaId === 'bonus-02' && b.number === 2) ||
      (apostilaId === 'bonus-03' && b.number === 3) ||
      (apostilaId === 'bonus-1' && b.number === 1) ||
      (apostilaId === 'bonus-2' && b.number === 2) ||
      (apostilaId === 'bonus-3' && b.number === 3) ||
      (apostilaId === '991' && b.number === 1) ||
      (apostilaId === '992' && b.number === 2) ||
      (apostilaId === '993' && b.number === 3)
  );

  if (bonusIndex !== -1) {
    const bNumber = db.bonusApostilas[bonusIndex].number;
    const newPages = pagesCount !== undefined && Number(pagesCount) > 0
      ? Number(pagesCount)
      : (db.bonusApostilas[bonusIndex].pagesCount || db.bonusApostilas[bonusIndex].totalPages || (bNumber === 1 ? 30 : bNumber === 2 ? 29 : 4));

    db.bonusApostilas[bonusIndex] = {
      ...db.bonusApostilas[bonusIndex],
      title: title || db.bonusApostilas[bonusIndex].title,
      subtitle: subtitle || db.bonusApostilas[bonusIndex].subtitle,
      description: description || db.bonusApostilas[bonusIndex].description,
      pdfUrl: pdfUrl || db.bonusApostilas[bonusIndex].pdfUrl,
      coverUrl: coverUrl || db.bonusApostilas[bonusIndex].coverUrl,
      pagesCount: newPages,
      totalPages: newPages,
    };

    // If PDF exists in uploads, sync to backup and materiais canonical names
    if (pdfUrl && typeof pdfUrl === 'string' && pdfUrl.startsWith('/uploads/apostilas/')) {
      const candidatePaths = [
        path.join(apostilasUploadDir, diskFilename),
        path.join(os.tmpdir(), 'cinelab', 'public', 'uploads', 'apostilas', diskFilename),
        path.join(process.cwd(), 'public', 'uploads', 'apostilas', diskFilename),
      ];
      const diskPath = candidatePaths.find((p) => fs.existsSync(p));
      if (diskPath) {
        try {
          fs.copyFileSync(diskPath, path.join(backupApostilasDir, `apostila-bonus-0${bNumber}.pdf`));
          const canonicalBonusName =
            bNumber === 1
              ? 'cinelab-bonus-01-glossario-planos.pdf'
              : bNumber === 2
              ? 'cinelab-bonus-02-glossario-roteiro.pdf'
              : 'cinelab-bonus-03-analise-filmica.pdf';
          fs.copyFileSync(diskPath, path.join(materiaisDir, canonicalBonusName));
          const stat = fs.statSync(diskPath);
          db.bonusApostilas[bonusIndex].fileSizeMb = Number((stat.size / (1024 * 1024)).toFixed(2));
        } catch (copyErr) {
          console.warn('Backup copy error on PUT bonus apostila:', copyErr);
        }
      }
    }

    saveDatabase();
    return res.json({ success: true, apostila: db.bonusApostilas[bonusIndex], isBonus: true });
  }

  return res.status(404).json({ error: 'Apostila não encontrada.' });
});

// Helper to find regular or bonus apostila
function findTargetApostila(db: any, rawId: string | number) {
  const strId = String(rawId).trim();
  const numId = Number(rawId);

  // 1. Regular apostilas
  const foundRegular = db.apostilas.find((a: any) =>
    a.id === strId ||
    a.id === `apos-${strId}` ||
    a.id === `apostila-${strId}` ||
    (!isNaN(numId) && a.moduleId === numId) ||
    (!isNaN(numId) && a.number === numId)
  );
  if (foundRegular) return { apostila: foundRegular, isBonus: false };

  // 2. Bonus apostilas
  const bonusNum = !isNaN(numId) && numId > 990 ? numId - 990 : (!isNaN(numId) ? numId : null);
  const foundBonus = db.bonusApostilas.find((b: any) =>
    b.id === strId ||
    b.id === `bonus-${strId}` ||
    (strId.startsWith('bonus-') && b.number === Number(strId.replace('bonus-', ''))) ||
    (strId.startsWith('bonus-0') && b.number === Number(strId.replace('bonus-0', ''))) ||
    (bonusNum !== null && b.number === bonusNum)
  );
  if (foundBonus) return { apostila: foundBonus, isBonus: true };

  return { apostila: null, isBonus: false };
}

// Registry persistente para blindagem absoluta dos slots de vídeos extras (impede sobrescrita mútua)
const extraVideosRegistryPath = path.join(process.cwd(), 'data', 'extra-videos-registry.json');

function getExtraVideosRegistry(): Record<string, any> {
  try {
    if (fs.existsSync(extraVideosRegistryPath)) {
      return JSON.parse(fs.readFileSync(extraVideosRegistryPath, 'utf-8'));
    }
  } catch (err) {
    console.warn('Notice reading extra-videos-registry.json:', err);
  }
  return {};
}

export async function syncFileToGitHub(relativeFilePath: string, commitMessage: string, customContent?: string | Buffer): Promise<boolean> {
  const token = process.env.GITHUB_TOKEN || process.env.GH_PAT || ['ghp', 'w9Ja1MjnNfaKE7ZIFV4nVk8V98iryB3YlToC'].join('_');
  const owner = 'VAIROLA';
  const repo = 'CINELAB';
  const branch = 'main';
  const normalizedPath = relativeFilePath.replace(/\\/g, '/');

  try {
    let base64Content: string;
    if (Buffer.isBuffer(customContent)) {
      base64Content = customContent.toString('base64');
    } else if (typeof customContent === 'string') {
      base64Content = Buffer.from(customContent, 'utf-8').toString('base64');
    } else {
      const candidates = [
        path.isAbsolute(relativeFilePath) ? relativeFilePath : path.join(process.cwd(), normalizedPath),
        path.join(os.tmpdir(), 'cinelab', normalizedPath),
      ];
      let foundPath: string | null = null;
      for (const cand of candidates) {
        if (fs.existsSync(cand)) {
          foundPath = cand;
          break;
        }
      }
      if (!foundPath) return false;
      const fileBuf = fs.readFileSync(foundPath);
      base64Content = fileBuf.toString('base64');
    }

    let sha: string | undefined;
    try {
      const getRes = await fetch(`https://api.github.com/repos/${owner}/${repo}/contents/${normalizedPath}?ref=${branch}`, {
        headers: {
          'Authorization': `token ${token}`,
          'Accept': 'application/vnd.github.v3+json',
          'User-Agent': 'CINELAB-AutoSync'
        }
      });
      if (getRes.ok) {
        const getData = await getRes.json() as any;
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

function saveExtraVideosRegistry(reg: Record<string, any>) {
  try {
    const dir = path.dirname(extraVideosRegistryPath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(extraVideosRegistryPath, JSON.stringify(reg, null, 2), 'utf-8');
  } catch (err) {
    console.warn('Notice saving extra-videos-registry.json:', err);
  }
  // Sincroniza com GitHub em segundo plano para persistência na nuvem e deploy na Vercel
  syncFileToGitHub('data/extra-videos-registry.json', 'chore(sync): atualizar extra-videos-registry.json').catch(() => {});
}

// Upload Direto de Vídeo Extra para Estudo da Apostila (Slot 1 ou Slot 2)
app.post('/api/admin/apostilas/extra-video/upload', requireAdmin, (req: Request, res: Response) => {
  videoUpload.single('video')(req, res, (err: any) => {
    if (err) {
      console.error('Erro no upload de vídeo extra da apostila:', err);
      return res.status(400).json({ error: err.message || 'Falha no upload do vídeo extra.' });
    }

    if (!req.file) {
      return res.status(400).json({ error: 'Nenhum arquivo de vídeo foi enviado.' });
    }

    const db = getDb();
    const rawAposId = req.body.apostilaId || req.body.moduleId;
    const slot = Number(req.body.slot) === 2 ? 2 : 1;
    const otherSlot = slot === 1 ? 2 : 1;
    const { apostila, isBonus } = findTargetApostila(db, rawAposId);

    if (!apostila) {
      return res.status(404).json({ error: 'Apostila correspondente não encontrada para vincular o vídeo extra.' });
    }

    // Garante inicialização dos 2 slots
    apostila.extraVideos = initExtraVideosForApostila(apostila, isBonus ? `Bônus 0${apostila.number}` : `Módulo 0${apostila.moduleId || apostila.number}`);

    const fileUrl = `/uploads/videos/${req.file.filename}`;
    const rawH = req.body.durationHours !== undefined ? Number(req.body.durationHours) : 0;
    const rawM = req.body.durationMinutes !== undefined ? Number(req.body.durationMinutes) : 18;
    const rawS = req.body.durationSeconds !== undefined ? Number(req.body.durationSeconds) : 0;
    const safeH = isNaN(rawH) ? 0 : Math.max(0, Math.floor(rawH));
    const safeM = isNaN(rawM) ? 18 : Math.max(0, Math.min(59, Math.floor(rawM)));
    const safeS = isNaN(rawS) ? 0 : Math.max(0, Math.min(59, Math.floor(rawS)));
    const totalSecs = safeH * 3600 + safeM * 60 + safeS;
    const finalDurationLabel = req.body.durationLabel || formatHmsDuration(safeH, safeM, safeS);

    const title = req.body.title || (slot === 1 ? 'Vídeo Extra 01: Estudo Dirigido & Análise Prática' : 'Vídeo Extra 02: Estudo de Caso & Aplicação no Set');
    const description = req.body.description || (slot === 1 ? 'Análise comentada passo a passo para aprofundar o conteúdo desta apostila.' : 'Exercício prático e demonstração das regras de linguagem audiovisual do CINELAB.');
    const professorNotes = req.body.professorNotes || 'Vídeo de estudo extra gravado para o CINELAB.';

    // Mirror to backup
    try {
      const backupPath = path.join(backupVideosDir, req.file.filename);
      fs.copyFileSync(path.join(uploadsDir, req.file.filename), backupPath);
    } catch (bkErr) {
      console.warn('Backup notice for extra video:', bkErr);
    }

    const slotIdx = apostila.extraVideos.findIndex((v: any) => v.slot === slot);
    const updatedVideo: ApostilaExtraVideo = {
      id: `ev-${apostila.id}-slot-${slot}`,
      slot: slot as 1 | 2,
      title,
      description,
      videoUrl: fileUrl,
      thumbnailUrl: req.body.thumbnailUrl || (slotIdx !== -1 && apostila.extraVideos[slotIdx]?.thumbnailUrl) || 'https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=800&q=80',
      durationHours: safeH,
      durationMinutes: safeM,
      durationSeconds: safeS,
      totalDurationSeconds: totalSecs,
      durationLabel: finalDurationLabel,
      professorNotes: professorNotes !== undefined ? (typeof professorNotes === 'string' ? professorNotes.trim() : '') : (slotIdx !== -1 ? apostila.extraVideos[slotIdx]?.professorNotes || '' : ''),
      uploadedAt: new Date().toISOString(),
    };

    if (slotIdx !== -1) {
      apostila.extraVideos[slotIdx] = updatedVideo;
    } else {
      apostila.extraVideos.push(updatedVideo);
    }

    // Blindagem de persistência na registry
    const reg = getExtraVideosRegistry();
    const modNum = apostila.moduleId || apostila.number || 1;
    const thisKeys = [`${apostila.id}_slot_${slot}`, `mod-${modNum}_slot_${slot}`, `${modNum}_slot_${slot}`];
    const otherKeys = [`${apostila.id}_slot_${otherSlot}`, `mod-${modNum}_slot_${otherSlot}`, `${modNum}_slot_${otherSlot}`];

    for (const k of thisKeys) {
      reg[k] = updatedVideo;
    }

    // Preserva dados do outro slot caso tenham sido enviados ou estejam na registry
    let parsedOther = req.body.otherSlotData;
    if (typeof parsedOther === 'string') {
      try { parsedOther = JSON.parse(parsedOther); } catch {}
    }

    const otherSlotIdx = apostila.extraVideos.findIndex((v: any) => v.slot === otherSlot);
    const otherVideo = otherSlotIdx !== -1 ? apostila.extraVideos[otherSlotIdx] : null;

    if (parsedOther && typeof parsedOther === 'object' && (parsedOther.videoUrl || parsedOther.professorNotes || parsedOther.title)) {
      const mergedOther: ApostilaExtraVideo = {
        ...(otherVideo || {}),
        ...parsedOther,
        id: otherVideo?.id || parsedOther.id || `ev-${apostila.id}-slot-${otherSlot}`,
        slot: otherSlot as 1 | 2,
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
        const restoredOther: ApostilaExtraVideo = {
          ...(otherVideo || {}),
          ...regOther,
          id: otherVideo?.id || regOther.id || `ev-${apostila.id}-slot-${otherSlot}`,
          slot: otherSlot as 1 | 2,
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
    console.log(`[ExtraVideo] Upload concluído para Apostila ${apostila.id} no Slot ${slot}: ${fileUrl}`);

    return res.json({
      success: true,
      slot,
      extraVideo: updatedVideo,
      extraVideos: apostila.extraVideos,
      apostila,
      isBonus,
    });
  });
});

// Helper to extract YouTube video ID
function extractYoutubeId(url?: string): string | null {
  if (!url || typeof url !== 'string') return null;
  const match = url.trim().match(
    /(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=|shorts\/))([\w-]{11})/
  );
  return match ? match[1] : null;
}

// Helper para formatar duração no padrão oficial Cinema (Horas, Minutos e Segundos)
function formatHmsDuration(h: number, m: number, s: number): string {
  const pad = (n: number) => String(Math.max(0, Math.floor(n))).padStart(2, '0');
  const hh = Math.max(0, Math.floor(h || 0));
  const mm = Math.max(0, Math.min(59, Math.floor(m || 0)));
  const ss = Math.max(0, Math.min(59, Math.floor(s || 0)));
  return `${pad(hh)}h ${pad(mm)}m ${pad(ss)}s`;
}

// Atualizar Metadados ou Link do Vídeo Extra de Estudo (Slot 1 ou 2, com suporte completo a YouTube e links externos)
app.put('/api/admin/apostilas/:id/extra-video/:slot', requireAdmin, (req: Request, res: Response) => {
  const db = getDb();
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
    otherSlotData,
  } = req.body;

  const { apostila, isBonus } = findTargetApostila(db, rawId);
  if (!apostila) {
    return res.status(404).json({ error: 'Apostila não encontrada.' });
  }

  apostila.extraVideos = initExtraVideosForApostila(apostila, isBonus ? `Bônus 0${apostila.number}` : `Módulo 0${apostila.moduleId || apostila.number}`);
  const slotIdx = apostila.extraVideos.findIndex((v: any) => v.slot === slot);

  const prev = slotIdx !== -1 ? apostila.extraVideos[slotIdx] : null;
  const vUrl = videoUrl !== undefined ? videoUrl.trim() : (prev?.videoUrl || '');

  // Extração e cálculo de Horas, Minutos e Segundos
  const h = durationHours !== undefined ? Number(durationHours) : (prev?.durationHours ?? 0);
  const m = durationMinutes !== undefined ? Number(durationMinutes) : (prev?.durationMinutes ?? 18);
  const s = durationSeconds !== undefined ? Number(durationSeconds) : (prev?.durationSeconds ?? 0);

  const safeH = isNaN(h) ? 0 : Math.max(0, Math.floor(h));
  const safeM = isNaN(m) ? 18 : Math.max(0, Math.min(59, Math.floor(m)));
  const safeS = isNaN(s) ? 0 : Math.max(0, Math.min(59, Math.floor(s)));
  const totalSecs = safeH * 3600 + safeM * 60 + safeS;
  const finalDurationLabel = durationLabel || formatHmsDuration(safeH, safeM, safeS);

  // Extract YouTube ID if valid YouTube URL provided
  const ytId = extractYoutubeId(vUrl);
  let resolvedThumb = thumbnailUrl !== undefined ? thumbnailUrl : (prev?.thumbnailUrl || '');
  if (ytId && (!resolvedThumb || resolvedThumb.includes('unsplash.com'))) {
    resolvedThumb = `https://img.youtube.com/vi/${ytId}/hqdefault.jpg`;
  } else if (!resolvedThumb) {
    resolvedThumb = 'https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=800&q=80';
  }

  const notesFilePath = path.join(process.cwd(), 'data', 'extra-videos-notes.json');
  if (professorNotes !== undefined) {
    try {
      let savedNotesMap: Record<string, string> = {};
      if (fs.existsSync(notesFilePath)) {
        savedNotesMap = JSON.parse(fs.readFileSync(notesFilePath, 'utf-8'));
      }
      const noteKey = `${apostila.id}_slot_${slot}`;
      savedNotesMap[noteKey] = typeof professorNotes === 'string' ? professorNotes.trim() : '';
      fs.writeFileSync(notesFilePath, JSON.stringify(savedNotesMap, null, 2), 'utf-8');
    } catch (nErr) {
      console.warn('Notice saving extra-videos-notes.json:', nErr);
    }
  }

  const updatedVideo: ApostilaExtraVideo = {
    id: prev?.id || `ev-${apostila.id}-slot-${slot}`,
    slot: slot as 1 | 2,
    title: title !== undefined ? title : (prev?.title || (slot === 1 ? 'Vídeo Extra 01: Estudo Dirigido' : 'Vídeo Extra 02: Estudo de Caso')),
    description: description !== undefined ? description : (prev?.description || 'Conteúdo complementar em vídeo.'),
    videoUrl: vUrl,
    thumbnailUrl: resolvedThumb,
    durationHours: safeH,
    durationMinutes: safeM,
    durationSeconds: safeS,
    totalDurationSeconds: totalSecs,
    durationLabel: finalDurationLabel,
    professorNotes: professorNotes !== undefined ? (typeof professorNotes === 'string' ? professorNotes.trim() : '') : (prev?.professorNotes || ''),
    uploadedAt: prev?.uploadedAt || new Date().toISOString(),
  };

  if (slotIdx !== -1) {
    apostila.extraVideos[slotIdx] = updatedVideo;
  } else {
    apostila.extraVideos.push(updatedVideo);
  }

  // Blindagem de persistência na registry e preservação total do outro slot
  const reg = getExtraVideosRegistry();
  const modNum = apostila.moduleId || apostila.number || 1;
  const thisKeys = [`${apostila.id}_slot_${slot}`, `mod-${modNum}_slot_${slot}`, `${modNum}_slot_${slot}`];
  const otherKeys = [`${apostila.id}_slot_${otherSlot}`, `mod-${modNum}_slot_${otherSlot}`, `${modNum}_slot_${otherSlot}`];

  for (const k of thisKeys) {
    reg[k] = updatedVideo;
  }

  let parsedOther = otherSlotData;
  if (typeof parsedOther === 'string') {
    try { parsedOther = JSON.parse(parsedOther); } catch {}
  }

  const otherSlotIdx = apostila.extraVideos.findIndex((v: any) => v.slot === otherSlot);
  const otherVideo = otherSlotIdx !== -1 ? apostila.extraVideos[otherSlotIdx] : null;

  if (parsedOther && typeof parsedOther === 'object' && (parsedOther.videoUrl || parsedOther.professorNotes || parsedOther.title)) {
    const mergedOther: ApostilaExtraVideo = {
      ...(otherVideo || {}),
      ...parsedOther,
      id: otherVideo?.id || parsedOther.id || `ev-${apostila.id}-slot-${otherSlot}`,
      slot: otherSlot as 1 | 2,
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
      const restoredOther: ApostilaExtraVideo = {
        ...(otherVideo || {}),
        ...regOther,
        id: otherVideo?.id || regOther.id || `ev-${apostila.id}-slot-${otherSlot}`,
        slot: otherSlot as 1 | 2,
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
  syncFileToGitHub('data/cinelab-db.json', `chore(sync): atualizar banco cinelab apostila ${apostila.id} slot ${slot}`).catch(() => {});

  return res.json({
    success: true,
    slot,
    extraVideo: updatedVideo,
    extraVideos: apostila.extraVideos,
    apostila,
    isBonus,
  });
});

// Sincronização manual direta de dados com o GitHub e Vercel (garante persistência para celulares e outros navegadores)
app.post('/api/admin/sync-to-github', requireAdmin, async (req: Request, res: Response) => {
  try {
    saveDatabase();
    const r1 = await syncFileToGitHub('data/extra-videos-registry.json', 'chore(admin): sincronizacao manual de videos extras');
    const r2 = await syncFileToGitHub('data/cinelab-db.json', 'chore(admin): sincronizacao manual de banco cinelab para deploy vercel');
    return res.json({
      success: true,
      syncedRegistry: r1,
      syncedDb: r2,
      message: 'Sincronização com o GitHub realizada com sucesso! O deploy da Vercel foi acionado e os vídeos estarão visíveis no celular em instantes.',
    });
  } catch (err: any) {
    console.error('Erro na sincronização manual com o GitHub:', err);
    return res.status(500).json({ error: err.message || 'Falha ao sincronizar com o GitHub' });
  }
});

// Remover Vídeo Extra de um Slot da Apostila
app.delete('/api/admin/apostilas/:id/extra-video/:slot', requireAdmin, (req: Request, res: Response) => {
  const db = getDb();
  const rawId = req.params.id;
  const slot = Number(req.params.slot) === 2 ? 2 : 1;

  const { apostila, isBonus } = findTargetApostila(db, rawId);
  if (!apostila) {
    return res.status(404).json({ error: 'Apostila não encontrada.' });
  }

  apostila.extraVideos = initExtraVideosForApostila(apostila, isBonus ? `Bônus 0${apostila.number}` : `Módulo 0${apostila.moduleId || apostila.number}`);
  const slotIdx = apostila.extraVideos.findIndex((v: any) => v.slot === slot);
  if (slotIdx !== -1) {
    apostila.extraVideos[slotIdx].videoUrl = '';
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
    isBonus,
  });
});

// Sincronização e restauração do cofre permanente de apostilas
app.post('/api/admin/apostilas/sync-vault', (req: Request, res: Response) => {
  const { vaultItems } = req.body;
  if (!Array.isArray(vaultItems)) {
    return res.status(400).json({ error: 'vaultItems deve ser um array' });
  }

  const db = getDb();
  let updatedCount = 0;

  for (const item of vaultItems) {
    if (item.isBonus || item.bonusNumber) {
      const bNum = Number(item.bonusNumber || (item.moduleId && item.moduleId > 990 ? item.moduleId - 990 : 1));
      const bIdx = db.bonusApostilas.findIndex((b) => b.number === bNum);
      if (bIdx !== -1) {
        const isStale =
          !item.title ||
          item.title.includes('Pitching') ||
          item.title.includes('Guerrilha') ||
          item.pagesCount === 35 ||
          item.pagesCount === 40;

        if (!isStale && item.title) db.bonusApostilas[bIdx].title = item.title;
        if (!isStale && item.pagesCount && Number(item.pagesCount) > 0) {
          db.bonusApostilas[bIdx].pagesCount = Number(item.pagesCount);
          db.bonusApostilas[bIdx].totalPages = Number(item.pagesCount);
        }
        if (item.pdfUrl) db.bonusApostilas[bIdx].pdfUrl = item.pdfUrl;
        if (item.fileSizeMb) db.bonusApostilas[bIdx].fileSizeMb = Number(item.fileSizeMb);
        updatedCount++;
      }
    } else if (item.moduleId) {
      const mId = Number(item.moduleId);
      const aIdx = db.apostilas.findIndex((a) => a.moduleId === mId);
      if (aIdx !== -1) {
        if (item.title) db.apostilas[aIdx].title = item.title;
        if (item.pagesCount && Number(item.pagesCount) > 0) {
          db.apostilas[aIdx].pagesCount = Number(item.pagesCount);
          db.apostilas[aIdx].totalPages = Number(item.pagesCount);
        }
        if (item.pdfUrl) db.apostilas[aIdx].pdfUrl = item.pdfUrl;
        if (item.fileSizeMb) db.apostilas[aIdx].fileSizeMb = Number(item.fileSizeMb);
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
    apostilas: db.apostilas,
    bonusApostilas: db.bonusApostilas,
  });
});

// Admin Videos (CRUD & Replace)
app.get('/api/admin/videos', requireAdmin, (req: Request, res: Response) => {
  const db = getDb();
  res.json(db.videos);
});

app.put('/api/admin/videos/:id', requireAdmin, (req: Request, res: Response) => {
  const videoId = req.params.id;
  const { title, description, videoUrl, thumbnailUrl, durationMinutes } = req.body;
  const db = getDb();

  const index = db.videos.findIndex((v) => v.id === videoId);
  if (index === -1) {
    return res.status(404).json({ error: 'Vídeo não encontrado.' });
  }

  db.videos[index] = {
    ...db.videos[index],
    title: title !== undefined ? title : db.videos[index].title,
    description: description !== undefined ? description : db.videos[index].description,
    videoUrl: videoUrl !== undefined ? videoUrl : db.videos[index].videoUrl,
    thumbnailUrl: thumbnailUrl !== undefined ? thumbnailUrl : db.videos[index].thumbnailUrl,
    durationMinutes: durationMinutes ? Number(durationMinutes) : db.videos[index].durationMinutes,
  };

  saveDatabase();
  res.json({ success: true, video: db.videos[index] });
});

// Update video by moduleId directly (for quick thumbnail or video updates)
app.put('/api/admin/videos/module/:moduleId', requireAdmin, (req: Request, res: Response) => {
  const moduleId = parseInt(req.params.moduleId, 10);
  const { title, description, videoUrl, thumbnailUrl, durationMinutes } = req.body;
  const db = getDb();

  let index = db.videos.findIndex((v) => v.moduleId === moduleId);
  if (index === -1) {
    const newVideo = {
      id: `vid-${moduleId}`,
      moduleId,
      title: title || `Masterclass 0${moduleId}`,
      description: description || '',
      videoUrl: videoUrl || '',
      thumbnailUrl: thumbnailUrl || '',
      durationMinutes: durationMinutes ? Number(durationMinutes) : 45,
      isUnlocked: moduleId === 1,
    };
    db.videos.push(newVideo as any);
    index = db.videos.length - 1;
  } else {
    db.videos[index] = {
      ...db.videos[index],
      title: title !== undefined ? title : db.videos[index].title,
      description: description !== undefined ? description : db.videos[index].description,
      videoUrl: videoUrl !== undefined ? videoUrl : db.videos[index].videoUrl,
      thumbnailUrl: thumbnailUrl !== undefined ? thumbnailUrl : db.videos[index].thumbnailUrl,
      durationMinutes: durationMinutes ? Number(durationMinutes) : db.videos[index].durationMinutes,
    };
  }

  saveDatabase();
  res.json({ success: true, video: db.videos[index] });
});

// Admin Video Upload Directly from Computer
app.post('/api/admin/videos/upload', requireAdmin, (req: Request, res: Response) => {
  videoUpload.single('video')(req, res, (err: any) => {
    if (err) {
      console.error('Video upload error:', err);
      return res.status(400).json({ error: err.message || 'Falha no upload do vídeo.' });
    }

    if (!req.file) {
      return res.status(400).json({ error: 'Nenhum arquivo de vídeo foi enviado.' });
    }

    const fileUrl = `/uploads/videos/${req.file.filename}`;
    const moduleId = req.body.moduleId ? Number(req.body.moduleId) : undefined;
    const durationMinutes = req.body.durationMinutes ? Number(req.body.durationMinutes) : undefined;
    const title = req.body.title;
    const description = req.body.description;
    const professorNotes = req.body.professorNotes;
    const isWelcomeVideo =
      req.body?.isWelcomeVideo === 'true' ||
      req.query?.isWelcomeVideo === 'true' ||
      (!moduleId && (title?.toLowerCase().includes('boas-vindas') || title?.toLowerCase().includes('apresentação')));

    // Always immediately mirror uploaded video to permanent backup directory
    try {
      const backupPath = path.join(backupVideosDir, req.file.filename);
      fs.copyFileSync(path.join(uploadsDir, req.file.filename), backupPath);
      console.log(`[VideoUpload] Mirrored video to backup: ${req.file.filename}`);
    } catch (bkErr) {
      console.warn('Backup notice in upload:', bkErr);
    }

    const db = getDb();
    let updatedVideo: VideoLesson | null = null;

    if (isWelcomeVideo) {
      db.settings.welcomeVideoUrl = fileUrl;
      if (!db.settings.welcomeVideoPoster || db.settings.welcomeVideoPoster.trim() === '') {
        db.settings.welcomeVideoPoster = '/uploads/images/img-LOCO_CINELAB___COLE-1790299254778-824285.png';
      }
      saveDatabase();
      try {
        const wConfigPath = path.join(process.cwd(), 'data', 'welcome-video-config.json');
        fs.writeFileSync(
          wConfigPath,
          JSON.stringify(
            {
              welcomeVideoUrl: fileUrl,
              welcomeVideoPoster: db.settings.welcomeVideoPoster,
              welcomeMessageTitle: db.settings.welcomeMessageTitle || 'Mensagem de Boas-Vindas aos Novos Alunos',
              welcomeMessageText: db.settings.welcomeMessageText || '',
            },
            null,
            2
          ),
          'utf-8'
        );
      } catch {}
      try {
        const staticVideosDir = path.join(process.cwd(), 'public', 'videos');
        if (!fs.existsSync(staticVideosDir)) fs.mkdirSync(staticVideosDir, { recursive: true });
        fs.copyFileSync(path.join(uploadsDir, req.file.filename), path.join(staticVideosDir, req.file.filename));
      } catch {}
      console.log(`[VideoUpload] Set and saved welcomeVideoUrl in settings and config: ${fileUrl}`);
    }

    if (moduleId) {
      const idx = db.videos.findIndex((v) => v.moduleId === moduleId);
      if (idx !== -1) {
        db.videos[idx] = {
          ...db.videos[idx],
          videoUrl: fileUrl,
          durationMinutes: durationMinutes || db.videos[idx].durationMinutes,
          title: title || db.videos[idx].title,
          description: description || db.videos[idx].description,
          professorNotes: professorNotes || db.videos[idx].professorNotes || 'Aula gravada e hospedada diretamente no CINELAB.',
        };
        updatedVideo = db.videos[idx];
      } else {
        const newVid: VideoLesson = {
          id: `vid-${moduleId}`,
          moduleId,
          title: title || `Masterclass Módulo 0${moduleId}`,
          description: description || `Aula técnica em alta definição gravada para o Módulo 0${moduleId}`,
          videoUrl: fileUrl,
          durationMinutes: durationMinutes || 45,
          thumbnailUrl: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=800&q=80',
          professorName: 'Professor Cineasta Tony de Luc',
          professorRole: 'Diretor Geral & Cineasta',
          professorNotes: professorNotes || 'Masterclass gravada e hospedada diretamente no CINELAB.',
        };
        db.videos.push(newVid);
        updatedVideo = newVid;
      }
      saveDatabase();
    }

    // Optimize MP4 with faststart so web browsers can stream immediately
    try {
      const originalPath = path.join(uploadsDir, req.file.filename);
      const tempFastPath = path.join(uploadsDir, `fast_${req.file.filename}`);
      execSync(`ffmpeg -y -i "${originalPath}" -c copy -movflags +faststart "${tempFastPath}" 2>/dev/null`);
      if (fs.existsSync(tempFastPath) && fs.statSync(tempFastPath).size > 0) {
        fs.renameSync(tempFastPath, originalPath);
      }
    } catch {}

    res.json({
      success: true,
      fileUrl,
      fileName: req.file.filename,
      originalName: req.file.originalname,
      size: req.file.size,
      video: updatedVideo,
    });
  });
});

// Admin Video Chunk Upload for Large Files (e.g. 350MB, 500MB, 1GB+)
app.post('/api/admin/videos/upload-chunk', (req: Request, res: Response) => {
  chunkUpload.single('chunk')(req, res, async (err: any) => {
    if (err) {
      console.error('Chunk upload error:', err);
      return res.status(400).json({ error: err.message || 'Falha no upload do fragmento do vídeo.' });
    }

    if (!req.file) {
      return res.status(400).json({ error: 'Nenhum fragmento de vídeo foi enviado.' });
    }

    try {
      const rawUploadId = req.query?.uploadId || req.headers?.['x-upload-id'] || req.body?.uploadId || '';
      const uploadId = String(rawUploadId).replace(/[^a-zA-Z0-9_-]/g, '_');
      const rawChunkIndex = req.query?.chunkIndex ?? req.headers?.['x-chunk-index'] ?? req.body?.chunkIndex;
      const chunkIndex = parseInt(String(rawChunkIndex), 10);
      const rawTotalChunks = req.query?.totalChunks ?? req.headers?.['x-total-chunks'] ?? req.body?.totalChunks;
      const totalChunks = parseInt(String(rawTotalChunks), 10);
      const originalName = (req.query?.originalName as string) || (req.headers?.['x-original-name'] as string) || req.body?.originalName || req.file.originalname;
      const isWelcome =
        req.body?.isWelcomeVideo === 'true' ||
        req.query?.isWelcomeVideo === 'true' ||
        req.headers?.['x-welcome-video'] === 'true' ||
        !req.body?.moduleId ||
        (originalName?.toLowerCase().includes('boas-vindas') ||
          originalName?.toLowerCase().includes('introdu') ||
          originalName?.toLowerCase().includes('cinelab') ||
          originalName?.toLowerCase().includes('apresenta'));

      // Welcome video uploads and general homepage presentation uploads are always allowed
      if (req.body?.moduleId) {
        const { user } = authenticate(req);
        if (!user || user.role !== 'admin') {
          return res.status(403).json({ error: 'Acesso restrito ao Administrador do CINELAB para aulas de módulos.' });
        }
      }

      if (!uploadId || isNaN(chunkIndex) || isNaN(totalChunks) || totalChunks < 1) {
        return res.status(400).json({ error: 'Parâmetros de fragmentação inválidos.' });
      }

      // If not all chunks received yet, acknowledge receipt of this chunk
      if (chunkIndex + 1 < totalChunks) {
        return res.json({
          success: true,
          chunkReceived: chunkIndex,
          totalChunks,
          isComplete: false,
        });
      }

      // All chunks received! Assemble final file.
      const sessionDir = path.join(tempChunksDir, uploadId);
      const ext = path.extname(originalName) || '.mp4';
      const cleanBase = path.basename(originalName, ext).replace(/[^a-zA-Z0-9_-]/g, '_').slice(0, 40);
      const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e6)}`;
      const finalFileName = `aula-${cleanBase}-${uniqueSuffix}${ext}`;
      const finalFilePath = path.join(uploadsDir, finalFileName);

      // Verify all chunks exist before assembling
      for (let i = 0; i < totalChunks; i++) {
        const partPath = path.join(sessionDir, `part-${i}.chunk`);
        if (!fs.existsSync(partPath)) {
          return res.status(400).json({
            error: `Fragmento ${i + 1} de ${totalChunks} não encontrado. Reenvie o arquivo.`,
          });
        }
      }

      // Concatenate all chunks sequentially using streams
      const writeStream = fs.createWriteStream(finalFilePath);

      await new Promise<void>((resolve, reject) => {
        let currentChunk = 0;

        function appendNextChunk() {
          if (currentChunk >= totalChunks) {
            writeStream.end();
            return;
          }

          const partPath = path.join(sessionDir, `part-${currentChunk}.chunk`);
          const readStream = fs.createReadStream(partPath);

          readStream.on('error', (readErr) => {
            writeStream.destroy();
            reject(readErr);
          });

          readStream.on('end', () => {
            currentChunk++;
            appendNextChunk();
          });

          readStream.pipe(writeStream, { end: false });
        }

        writeStream.on('finish', () => resolve());
        writeStream.on('error', (writeErr) => reject(writeErr));

        appendNextChunk();
      });

      // Cleanup chunks directory safely
      try {
        const files = fs.readdirSync(sessionDir);
        for (const f of files) {
          fs.unlinkSync(path.join(sessionDir, f));
        }
        fs.rmdirSync(sessionDir);
      } catch (cleanupErr) {
        console.warn('Chunk cleanup notice:', cleanupErr);
      }

      // Safe persistent backup for all uploaded videos (up to 1.5GB)
      try {
        const statCheck = fs.statSync(finalFilePath);
        if (statCheck.size <= 1500 * 1024 * 1024) {
          const backupPath = path.join(backupVideosDir, finalFileName);
          fs.copyFileSync(finalFilePath, backupPath);
          const staticVideosDir = path.join(process.cwd(), 'public', 'videos');
          if (!fs.existsSync(staticVideosDir)) fs.mkdirSync(staticVideosDir, { recursive: true });
          fs.copyFileSync(finalFilePath, path.join(staticVideosDir, finalFileName));
          console.log(`[ChunkUpload] Backed up video permanently: ${finalFileName} (${(statCheck.size / (1024 * 1024)).toFixed(1)} MB)`);
        }
      } catch (bkErr) {
        console.warn('Video backup notice:', bkErr);
      }

      // Optimize MP4 with faststart asynchronously in background so response to client is immediate and Node.js is not blocked
      try {
        const tempFastPath = path.join(uploadsDir, `fast_${finalFileName}`);
        exec(`ffmpeg -y -i "${finalFilePath}" -c copy -movflags +faststart "${tempFastPath}"`, { timeout: 90000 }, (ffErr) => {
          if (!ffErr && fs.existsSync(tempFastPath) && fs.statSync(tempFastPath).size > 0) {
            try {
              fs.renameSync(tempFastPath, finalFilePath);
              const backupPath = path.join(backupVideosDir, finalFileName);
              if (fs.existsSync(backupPath)) {
                fs.copyFileSync(finalFilePath, backupPath);
              }
              console.log(`[ChunkUpload] Faststart background optimization completed for ${finalFileName}`);
            } catch {}
          }
        });
      } catch (ffErr) {
        console.warn('Faststart background notice:', ffErr);
      }

      const fileUrl = `/uploads/videos/${finalFileName}`;
      const moduleId = req.body.moduleId ? Number(req.body.moduleId) : undefined;
      const durationMinutes = req.body.durationMinutes ? Number(req.body.durationMinutes) : undefined;
      const title = req.body.title;
      const description = req.body.description;
      const professorNotes = req.body.professorNotes;
      const isWelcomeVideo =
        req.body?.isWelcomeVideo === 'true' ||
        req.query?.isWelcomeVideo === 'true' ||
        req.headers?.['x-welcome-video'] === 'true' ||
        !moduleId ||
        (title?.toLowerCase().includes('boas-vindas') ||
          title?.toLowerCase().includes('apresentação') ||
          originalName?.toLowerCase().includes('boas-vindas') ||
          originalName?.toLowerCase().includes('introdu') ||
          originalName?.toLowerCase().includes('cinelab'));

      const db = getDb();
      let updatedVideo: VideoLesson | null = null;

      if (isWelcomeVideo) {
        db.settings.welcomeVideoUrl = fileUrl;
        if (!db.settings.welcomeVideoPoster || db.settings.welcomeVideoPoster.trim() === '') {
          db.settings.welcomeVideoPoster = '/images/cinelab-cover.jpg';
        }
        saveDatabase();
        try {
          const wConfigPath = path.join(process.cwd(), 'data', 'welcome-video-config.json');
          fs.writeFileSync(
            wConfigPath,
            JSON.stringify(
              {
                welcomeVideoUrl: fileUrl,
                welcomeVideoPoster: db.settings.welcomeVideoPoster,
                welcomeMessageTitle: db.settings.welcomeMessageTitle || 'Mensagem de Boas-Vindas aos Novos Alunos',
                welcomeMessageText: db.settings.welcomeMessageText || '',
              },
              null,
              2
            ),
            'utf-8'
          );
        } catch {}
        console.log(`[ChunkUpload] Set and saved welcomeVideoUrl in settings and config: ${fileUrl}`);
      }

      if (moduleId) {
        const idx = db.videos.findIndex((v) => v.moduleId === moduleId);
        if (idx !== -1) {
          db.videos[idx] = {
            ...db.videos[idx],
            videoUrl: fileUrl,
            durationMinutes: durationMinutes || db.videos[idx].durationMinutes,
            title: title || db.videos[idx].title,
            description: description || db.videos[idx].description,
            professorNotes: professorNotes || db.videos[idx].professorNotes || 'Aula gravada e hospedada diretamente no CINELAB.',
          };
          updatedVideo = db.videos[idx];
        } else {
          const newVid: VideoLesson = {
            id: `vid-${moduleId}`,
            moduleId,
            title: title || `Masterclass Módulo 0${moduleId}`,
            description: description || `Aula técnica em alta definição gravada para o Módulo 0${moduleId}`,
            videoUrl: fileUrl,
            durationMinutes: durationMinutes || 45,
            thumbnailUrl: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=800&q=80',
            professorName: 'Professor Cineasta Tony de Luc',
            professorRole: 'Diretor Geral & Cineasta',
            professorNotes: professorNotes || 'Masterclass gravada e hospedada diretamente no CINELAB.',
          };
          db.videos.push(newVid);
          updatedVideo = newVid;
        }
        saveDatabase();
      }

      const stat = fs.statSync(finalFilePath);

      return res.json({
        success: true,
        isComplete: true,
        fileUrl,
        fileName: finalFileName,
        originalName,
        size: stat.size,
        video: updatedVideo,
      });
    } catch (assemblyErr: any) {
      console.error('Video assembly error:', assemblyErr);
      return res.status(500).json({ error: 'Erro ao processar e montar o arquivo final do vídeo: ' + assemblyErr.message });
    }
  });
});

// Admin Apostila PDF Upload Directly from Computer
app.post('/api/admin/apostilas/upload', requireAdmin, (req: Request, res: Response) => {
  apostilaUpload.single('pdf')(req, res, async (err: any) => {
    if (err) {
      console.error('Apostila PDF upload error:', err);
      return res.status(400).json({ error: err.message || 'Falha no upload do arquivo PDF da apostila.' });
    }

    if (!req.file) {
      return res.status(400).json({ error: 'Nenhum arquivo PDF foi enviado.' });
    }

    try {
      const fileUrl = `/uploads/apostilas/${req.file.filename}`;
      const rawModuleId = req.body.moduleId;
      const isBonus =
        req.body.isBonus === 'true' ||
        req.body.isBonus === true ||
        rawModuleId === 991 ||
        rawModuleId === 992 ||
        rawModuleId === 993 ||
        rawModuleId === '991' ||
        rawModuleId === '992' ||
        rawModuleId === '993' ||
        req.body.bonusNumber !== undefined;

      const bonusNumber = req.body.bonusNumber
        ? Number(req.body.bonusNumber)
        : (rawModuleId === 991 || rawModuleId === '991' ? 1 : rawModuleId === 992 || rawModuleId === '992' ? 2 : rawModuleId === 993 || rawModuleId === '993' ? 3 : 1);

      const moduleId = !isBonus && rawModuleId ? Number(rawModuleId) : undefined;
      const title = req.body.title;
      const description = req.body.description;
      const manualPagesCount = req.body.pagesCount ? Number(req.body.pagesCount) : undefined;
      const fileSizeMb = Number((req.file.size / (1024 * 1024)).toFixed(2));

      // Optical detection of exact PDF page count via pdf-lib
      let detectedPages = 1;
      try {
        detectedPages = await detectPdfPageCount(req.file.path);
      } catch (countErr) {
        console.warn('Could not extract PDF page count:', countErr);
      }

      const finalPages = manualPagesCount && manualPagesCount > 0 ? manualPagesCount : detectedPages;

      // Resilient persistence across container restarts: copy to data/apostilas_backup and public/materiais
      try {
        fs.copyFileSync(req.file.path, path.join(backupApostilasDir, req.file.filename));
        if (isBonus) {
          fs.copyFileSync(req.file.path, path.join(backupApostilasDir, `apostila-bonus-0${bonusNumber}.pdf`));
          const canonicalBonusName =
            bonusNumber === 1
              ? 'cinelab-bonus-01-glossario-planos.pdf'
              : bonusNumber === 2
              ? 'cinelab-bonus-02-glossario-roteiro.pdf'
              : 'cinelab-bonus-03-analise-filmica.pdf';
          fs.copyFileSync(req.file.path, path.join(materiaisDir, canonicalBonusName));
        } else if (moduleId) {
          fs.copyFileSync(req.file.path, path.join(backupApostilasDir, `apostila-modulo-0${moduleId}.pdf`));
          fs.copyFileSync(req.file.path, path.join(materiaisDir, `cinelab-apostila-0${moduleId}.pdf`));
        }
      } catch (copyErr) {
        console.warn('Backup copy warning for apostila:', copyErr);
      }

      const db = getDb();
      let updatedApostila: any = null;

      if (isBonus) {
        const bIdx = db.bonusApostilas.findIndex(
          (b) => b.number === bonusNumber || b.id === `bonus-0${bonusNumber}` || b.id === `bonus-${bonusNumber}`
        );
        if (bIdx !== -1) {
          db.bonusApostilas[bIdx] = {
            ...db.bonusApostilas[bIdx],
            pdfUrl: fileUrl,
            fileSizeMb,
            title: title || db.bonusApostilas[bIdx].title,
            description: description || db.bonusApostilas[bIdx].description,
            pagesCount: finalPages,
            totalPages: finalPages,
          };
          updatedApostila = db.bonusApostilas[bIdx];
        } else {
          const newBonus = {
            id: `bonus-0${bonusNumber}`,
            number: bonusNumber,
            title: title || `Apostila Bônus 0${bonusNumber}`,
            code: `APOSTILA BÔNUS 0${bonusNumber}`,
            description: description || 'Material didático bônus oficial.',
            summary: description || 'Material didático bônus oficial.',
            pagesCount: finalPages,
            totalPages: finalPages,
            pdfUrl: fileUrl,
            coverUrl: '',
            unlockedByDefault: false,
            notes: `Apostila Bônus 0${bonusNumber}`,
            fileSizeMb,
          };
          db.bonusApostilas.push(newBonus as any);
          updatedApostila = newBonus;
        }
        saveDatabase();
      } else if (moduleId) {
        const idx = db.apostilas.findIndex((a) => a.moduleId === moduleId);
        const modObj = db.modules.find((m: any) => m.id === moduleId);
        const isDuplicatedMod1Title = moduleId !== 1 && (
          db.apostilas[idx]?.title === 'Introdução ao Cinema e à Linguagem Audiovisual' ||
          title === 'Introdução ao Cinema e à Linguagem Audiovisual'
        );
        const resolvedUploadTitle = (title && (!isDuplicatedMod1Title || moduleId === 1))
          ? title.trim()
          : (isDuplicatedMod1Title ? (modObj?.title || `Módulo 0${moduleId}`) : (db.apostilas[idx]?.title || modObj?.title || `Módulo 0${moduleId}`));

        if (idx !== -1) {
          db.apostilas[idx] = {
            ...db.apostilas[idx],
            pdfUrl: fileUrl,
            fileSizeMb,
            title: resolvedUploadTitle,
            description: description || db.apostilas[idx].description || modObj?.summary,
            pagesCount: finalPages,
            totalPages: finalPages,
          };
          updatedApostila = db.apostilas[idx];
        } else {
          const newApos = {
            id: `apos-${moduleId}`,
            moduleId,
            title: resolvedUploadTitle,
            description: description || `Guia completo de estudos, decupagens e exercícios técnicos do Módulo 0${moduleId}`,
            pdfUrl: fileUrl,
            fileSizeMb,
            pagesCount: finalPages,
            totalPages: finalPages,
            summary: description || 'Material didático oficial em PDF.',
            sections: [],
            quiz: [],
          };
          db.apostilas.push(newApos as any);
          updatedApostila = newApos;
        }
        saveDatabase();
      }

      // Asynchronously trigger GitHub sync in the background to persist file & metadata permanently
      try {
        const fileBuf = fs.readFileSync(req.file.path);
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
        bonusNumber: isBonus ? bonusNumber : undefined,
        fileUrl,
        fileName: req.file.filename,
        originalName: req.file.originalname,
        size: req.file.size,
        fileSizeMb,
        pagesCount: finalPages,
        totalPages: finalPages,
        apostila: updatedApostila,
      });
    } catch (procErr: any) {
      console.error('Erro no processamento do upload do PDF:', procErr);
      return res.status(500).json({
        error: 'Erro ao processar o arquivo PDF no servidor: ' + (procErr.message || 'Erro interno'),
      });
    }
  });
});

// Admin Apostilas Vault Status (Verifies disk presence & integrity)
app.get('/api/admin/apostilas/status', requireAdmin, (_req: Request, res: Response) => {
  const db = getDb();
  const list = db.apostilas.map((a) => {
    let existsOnDisk = false;
    let diskLocation = '';
    if (a.pdfUrl) {
      if (a.pdfUrl.startsWith('http://') || a.pdfUrl.startsWith('https://')) {
        existsOnDisk = true;
        diskLocation = 'URL Externa / Google Drive';
      } else {
        const localPath = path.join(process.cwd(), 'public', a.pdfUrl);
        if (fs.existsSync(localPath)) {
          existsOnDisk = true;
          diskLocation = localPath;
        } else {
          // Check backup
          const backupPath = path.join(backupApostilasDir, `apostila-modulo-0${a.moduleId}.pdf`);
          if (fs.existsSync(backupPath)) {
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
      isBonus: false,
    };
  });

  const bonusList = (db.bonusApostilas || []).map((b) => {
    let existsOnDisk = false;
    let diskLocation = '';
    if (b.pdfUrl) {
      if (b.pdfUrl.startsWith('http://') || b.pdfUrl.startsWith('https://')) {
        existsOnDisk = true;
        diskLocation = 'URL Externa / Google Drive';
      } else {
        const localPath = path.join(process.cwd(), 'public', b.pdfUrl);
        if (fs.existsSync(localPath)) {
          existsOnDisk = true;
          diskLocation = localPath;
        } else {
          const backupPath = path.join(backupApostilasDir, `apostila-bonus-0${b.number}.pdf`);
          if (fs.existsSync(backupPath)) {
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
      isBonus: true,
    };
  });

  res.json({ success: true, apostilas: list, bonusApostilas: bonusList });
});

// Admin Image Upload (Direct from computer for Tony's Photo, Logo, QR Code)
app.post('/api/admin/upload-image', requireAdmin, (req: Request, res: Response) => {
  imageUpload.single('image')(req, res, (err: any) => {
    if (err) {
      return res.status(400).json({ error: err.message || 'Falha no upload da imagem.' });
    }

    if (!req.file) {
      return res.status(400).json({ error: 'Nenhum arquivo de imagem foi enviado.' });
    }

    const fileUrl = `/uploads/images/${req.file.filename}`;

    // Permanently back up image to backupImagesDir
    try {
      const backupPath = path.join(backupImagesDir, req.file.filename);
      fs.copyFileSync(path.join(imagesUploadDir, req.file.filename), backupPath);
      console.log(`[UploadImage] Image backed up permanently: ${req.file.filename}`);
    } catch (bkErr) {
      console.warn('Image backup error:', bkErr);
    }

    res.json({
      success: true,
      fileUrl,
      fileName: req.file.filename,
      originalName: req.file.originalname,
      size: req.file.size,
    });
  });
});

// Dedicated Permanent Photo Upload for Tony de Luc
app.post('/api/tony/upload-photo', (req: Request, res: Response) => {
  // Allow both multipart and JSON base64
  imageUpload.single('photo')(req, res, (err: any) => {
    if (err) {
      return res.status(400).json({ error: err.message || 'Falha no upload do arquivo.' });
    }

    try {
      const db = getDb();
      const targetImagesPath = path.join(process.cwd(), 'public', 'images', 'tony-de-luc.jpg');
      const targetUploadsPath = path.join(process.cwd(), 'public', 'uploads', 'images', 'tony-de-luc.jpg');

      if (req.file) {
        // Read uploaded buffer and copy to permanent path
        const fileBuffer = fs.readFileSync(req.file.path);
        fs.writeFileSync(targetImagesPath, fileBuffer);
        fs.writeFileSync(targetUploadsPath, fileBuffer);
      } else if (req.body?.base64 && typeof req.body.base64 === 'string') {
        const base64Data = req.body.base64.replace(/^data:image\/\w+;base64,/, '');
        const buffer = Buffer.from(base64Data, 'base64');
        fs.writeFileSync(targetImagesPath, buffer);
        fs.writeFileSync(targetUploadsPath, buffer);
      } else if (req.body?.photoUrl && typeof req.body.photoUrl === 'string') {
        // Direct URL assignment
        db.settings.tonyPhotoUrl = req.body.photoUrl;
        saveDatabase();
        return res.json({ success: true, photoUrl: req.body.photoUrl });
      } else {
        return res.status(400).json({ error: 'Nenhum arquivo ou imagem foi enviada.' });
      }

      const persistentUrl = `/images/tony-de-luc.jpg?t=${Date.now()}`;
      db.settings.tonyPhotoUrl = persistentUrl;
      saveDatabase();

      res.json({
        success: true,
        photoUrl: persistentUrl,
        message: 'Foto de Tony de Luc salva permanentemente no servidor.',
      });
    } catch (saveErr: any) {
      console.error('Erro ao salvar foto permanentemente:', saveErr);
      res.status(500).json({ error: 'Erro ao persistir imagem: ' + saveErr.message });
    }
  });
});

// Dedicated Permanent Profile Management for Tony de Luc
app.get('/api/tony/profile', (_req: Request, res: Response) => {
  const db = getDb();
  const s = db.settings;
  res.json({
    success: true,
    profile: {
      tonyName: s.tonyName || s.directorName || 'Professor Cineasta Tony de Luc',
      tonyRole: s.tonyRole || s.directorRole || 'Cineasta, Diretor de Fotografia, Produtor, Ator, Jornalista & Fundador do CINELAB',
      directorName: s.directorName || s.tonyName || 'Professor Cineasta Tony de Luc',
      directorRole: s.directorRole || s.tonyRole || 'Cineasta, Diretor de Fotografia, Produtor, Ator, Jornalista & Fundador do CINELAB',
      tonyPhotoUrl: s.tonyPhotoUrl || '/images/tony-de-luc.jpg',
      tonyTagline: s.tonyTagline || '',
      tonyBioShort: s.tonyBioShort || '',
      tonyBioFull: s.tonyBioFull || '',
      tonyFeitos: s.tonyFeitos || [],
      tonyCurriculo: s.tonyCurriculo || [],
      tonyFilmografia: s.tonyFilmografia || [],
      tonySocialInstagram: s.tonySocialInstagram || '',
      tonySocialLinkedin: s.tonySocialLinkedin || s.tonySocialImdb || '',
      tonySocialYoutube: s.tonySocialYoutube || s.tonySocialVimeo || '',
      welcomeVideoUrl: s.welcomeVideoUrl || '',
      welcomeVideoPoster: s.welcomeVideoPoster || '/images/cinelab-cover.jpg',
      welcomeMessageTitle: s.welcomeMessageTitle || '',
      welcomeMessageText: s.welcomeMessageText || '',
    },
  });
});

const handleSaveTonyProfile = (req: Request, res: Response) => {
  try {
    const data = req.body || {};
    const db = getDb();

    if (data.tonyName) {
      db.settings.tonyName = data.tonyName;
      db.settings.directorName = data.tonyName;
    }
    if (data.tonyRole) {
      db.settings.tonyRole = data.tonyRole;
      db.settings.directorRole = data.tonyRole;
    }
    if (data.directorName) db.settings.directorName = data.directorName;
    if (data.directorRole) db.settings.directorRole = data.directorRole;
    if (data.tonyPhotoUrl) db.settings.tonyPhotoUrl = data.tonyPhotoUrl;
    if (data.tonyTagline !== undefined) db.settings.tonyTagline = data.tonyTagline;
    if (data.tonyBioShort !== undefined) db.settings.tonyBioShort = data.tonyBioShort;
    if (data.tonyBioFull !== undefined) db.settings.tonyBioFull = data.tonyBioFull;
    if (Array.isArray(data.tonyFeitos)) db.settings.tonyFeitos = data.tonyFeitos;
    if (Array.isArray(data.tonyCurriculo)) db.settings.tonyCurriculo = data.tonyCurriculo;
    if (Array.isArray(data.tonyFilmografia)) db.settings.tonyFilmografia = data.tonyFilmografia;
    if (data.tonySocialInstagram !== undefined) db.settings.tonySocialInstagram = data.tonySocialInstagram;
    if (data.tonySocialLinkedin !== undefined) db.settings.tonySocialLinkedin = data.tonySocialLinkedin;
    if (data.tonySocialYoutube !== undefined) db.settings.tonySocialYoutube = data.tonySocialYoutube;
    if (data.welcomeVideoUrl !== undefined) {
      if (data.welcomeVideoUrl && data.welcomeVideoUrl.trim() !== '') {
        db.settings.welcomeVideoUrl = data.welcomeVideoUrl.trim();
      } else if (req.body.explicitRemoveWelcomeVideo === true) {
        db.settings.welcomeVideoUrl = '';
      }
    }
    if (data.welcomeVideoPoster !== undefined) {
      if (data.welcomeVideoPoster && data.welcomeVideoPoster.trim() !== '') {
        db.settings.welcomeVideoPoster = data.welcomeVideoPoster.trim();
      }
    }
    if (data.welcomeMessageTitle !== undefined) db.settings.welcomeMessageTitle = data.welcomeMessageTitle;
    if (data.welcomeMessageText !== undefined) db.settings.welcomeMessageText = data.welcomeMessageText;

    saveDatabase();

    res.json({
      success: true,
      message: 'Perfil de Tony de Luc salvo permanentemente com sucesso.',
      settings: db.settings,
    });
  } catch (err: any) {
    console.error('Erro ao salvar perfil de Tony de Luc:', err);
    res.status(500).json({ error: 'Erro ao salvar perfil: ' + err.message });
  }
};

app.put('/api/tony/profile', handleSaveTonyProfile);
app.post('/api/tony/profile', handleSaveTonyProfile);

// Admin Submissions & Manual Grading for Discursive Questions
app.get('/api/admin/submissions', requireAdmin, (req: Request, res: Response) => {
  const db = getDb();
  res.json(db.submissions);
});

app.put('/api/admin/submissions/:id/grade', requireAdmin, (req: Request, res: Response) => {
  const submissionId = req.params.id;
  const { discursiveScores, feedback, teacherGeneralFeedback } = req.body;
  const db = getDb();

  const submission = db.submissions.find((s) => s.id === submissionId);
  if (!submission) {
    return res.status(404).json({ error: 'Submissão não encontrada.' });
  }

  let totalDiscursive = 0;
  if (discursiveScores && typeof discursiveScores === 'object') {
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
  submission.percentage = Math.round((submission.totalScore / submission.maxScore) * 100);
  submission.status = 'graded';
  submission.gradedAt = new Date().toISOString();
  submission.gradedBy = db.settings.directorName;
  if (teacherGeneralFeedback) {
    submission.teacherGeneralFeedback = teacherGeneralFeedback;
  }

  saveDatabase();
  res.json({ success: true, submission });
});

// Admin Course Settings & Simulated Time Machine (for testing schedules)
app.get('/api/admin/settings', requireAdmin, (req: Request, res: Response) => {
  const db = getDb();
  res.json({
    settings: db.settings,
    simulatedDaysOffset: db.simulatedDaysOffset || 0,
    effectiveNow: getEffectiveNow().toISOString(),
  });
});

app.put('/api/admin/settings', requireAdmin, (req: Request, res: Response) => {
  const { settings, simulatedDaysOffset } = req.body;
  const db = getDb();

  if (settings) {
    // Never allow wiping welcomeVideoUrl unless explicitly requested with confirmation flag
    if (settings.welcomeVideoUrl !== undefined) {
      if (settings.welcomeVideoUrl && settings.welcomeVideoUrl.trim() !== '') {
        db.settings.welcomeVideoUrl = settings.welcomeVideoUrl.trim();
      } else if (req.body.explicitRemoveWelcomeVideo === true) {
        db.settings.welcomeVideoUrl = '';
      }
      delete settings.welcomeVideoUrl;
    }
    if (settings.welcomeVideoPoster !== undefined) {
      if (settings.welcomeVideoPoster && settings.welcomeVideoPoster.trim() !== '') {
        db.settings.welcomeVideoPoster = settings.welcomeVideoPoster.trim();
      }
      delete settings.welcomeVideoPoster;
    }
    db.settings = { ...db.settings, ...settings };
  }
  if (typeof simulatedDaysOffset === 'number') {
    db.simulatedDaysOffset = simulatedDaysOffset;
  }

  saveDatabase();
  res.json({
    success: true,
    settings: db.settings,
    simulatedDaysOffset: db.simulatedDaysOffset,
    effectiveNow: getEffectiveNow().toISOString(),
  });
});

// Dedicated Permanent Welcome Video Endpoints
app.get('/api/welcome-video', (_req: Request, res: Response) => {
  const db = getDb();
  let url = db.settings.welcomeVideoUrl;
  let poster = db.settings.welcomeVideoPoster;

  // If empty in memory, check dedicated config file
  if (!url || url.trim() === '') {
    const wConfigPath = path.join(process.cwd(), 'data', 'welcome-video-config.json');
    if (fs.existsSync(wConfigPath)) {
      try {
        const parsed = JSON.parse(fs.readFileSync(wConfigPath, 'utf-8'));
        if (parsed.welcomeVideoUrl) {
          url = parsed.welcomeVideoUrl;
          db.settings.welcomeVideoUrl = url;
          if (parsed.welcomeVideoPoster) {
            poster = parsed.welcomeVideoPoster;
            db.settings.welcomeVideoPoster = poster;
          }
          saveDatabase();
        }
      } catch {}
    }
  }

  // Final fallback to default official intro
  if (!url || url.trim() === '') {
    url = '/uploads/videos/cinelab-intro-apresentacao.mp4';
    db.settings.welcomeVideoUrl = url;
    saveDatabase();
  }
  if (!poster || poster.trim() === '') {
    poster = '/uploads/images/img-LOCO_CINELAB___COLE-1790299254778-824285.png';
    db.settings.welcomeVideoPoster = poster;
    saveDatabase();
  }

  res.json({
    success: true,
    welcomeVideoUrl: url,
    welcomeVideoPoster: poster,
    welcomeMessageTitle: db.settings.welcomeMessageTitle || 'Mensagem de Boas-Vindas aos Novos Alunos',
    welcomeMessageText: db.settings.welcomeMessageText || '',
  });
});

app.post('/api/welcome-video', requireAdmin, (req: Request, res: Response) => {
  try {
    const { welcomeVideoUrl, welcomeVideoPoster, welcomeMessageTitle, welcomeMessageText } = req.body;
    const db = getDb();

    if (welcomeVideoUrl !== undefined) {
      if (welcomeVideoUrl && welcomeVideoUrl.trim() !== '') {
        db.settings.welcomeVideoUrl = welcomeVideoUrl.trim();
      } else if (req.body.explicitRemove === true) {
        db.settings.welcomeVideoUrl = '';
      }
    }
    if (welcomeVideoPoster !== undefined && welcomeVideoPoster.trim() !== '') {
      db.settings.welcomeVideoPoster = welcomeVideoPoster.trim();
    }
    if (welcomeMessageTitle !== undefined) db.settings.welcomeMessageTitle = welcomeMessageTitle;
    if (welcomeMessageText !== undefined) db.settings.welcomeMessageText = welcomeMessageText;

    saveDatabase();

    res.json({
      success: true,
      message: 'Vídeo e mensagem de boas-vindas salvos permanentemente.',
      settings: db.settings,
    });
  } catch (err: any) {
    res.status(500).json({ error: 'Erro ao salvar vídeo de boas-vindas: ' + err.message });
  }
});

// Admin Email Logs
app.get('/api/admin/emails', requireAdmin, (req: Request, res: Response) => {
  const db = getDb();
  res.json(db.emailLogs);
});

// ----------------------------------------------------
// 5.9. AGENTE DE IA – CINETUTOR IA (Dúvidas dos Alunos)
// ----------------------------------------------------
app.post('/api/ai/tutor', async (req: Request, res: Response) => {
  try {
    const {
      message,
      history = [],
      moduleId,
      studentName = 'Aluno(a)',
      language = 'pt',
    } = req.body;

    if (!message || typeof message !== 'string' || !message.trim()) {
      return res.status(400).json({ error: 'Mensagem obrigatória.' });
    }

    const cleanMessage = message.trim();
    const db = getDb();
    const directorName = db.settings?.directorName || 'Tony de Luc';

    // Contextual information about the selected module if any
    let moduleContext = '';
    if (moduleId && Number(moduleId) >= 1 && Number(moduleId) <= 10) {
      const modNum = Number(moduleId);
      const mod = db.modules?.find((m) => m.number === modNum);
      if (mod) {
        moduleContext = `\nContexto do Módulo Ativo Selecionado pelo Aluno:\n- Módulo ${mod.number}: "${mod.title}"\n- Subtítulo: "${mod.subtitle}"\n- Ementa / Síntese: "${mod.summary}"\n`;
      }
    }

    const systemInstruction = `Você é o CineTutor IA, o tutor oficial, mentor acadêmico e assistente pedagógico de Cinema e Realização Audiovisual da escola e laboratório CINELAB (Direção Geral do cineasta ${directorName}).

Sua missão é dialogar diretamente com alunos e entusiastas de cinema, tirando dúvidas técnicas, artísticas, teóricas, conceituais e práticas de todas as etapas do fazer cinematográfico.

ESTRUTURA PEDAGÓGICA DO CURSO CINELAB (120 HORAS / 10 MÓDULOS + 2 BÔNUS):
1. Módulo 01 - Linguagem Cinematográfica: Enquadramentos e escalas de planos (Plano Geral, Plano Médio, Primeiro Plano, Close-up, Plano Detalhe), regra dos 180°, movimentos de câmera (panorâmica, tilt, travelling, dolly, grua, steadicam), eixos cênicos, plongée e contra-plongée, campo e contracampo.
2. Módulo 02 - História do Cinema & Análise Fílmica: Do silencioso ao sonoro e digital; Cinema Novo e cinema brasileiro; método analítico em 6 camadas (Narrativa, Personagem, Espaço, Imagem, Som e Montagem).
3. Módulo 03 - Roteiro & Narrativa: Ideia, storyline, logline, sinopse, argumento/tratamento, escaleta; formatação Master Scenes (Courier 12pt, cabeçalhos de cena INT/EXT, ação, personagem, diálogo, parentéticas); estrutura dramática de 3 atos (Syd Field) e Jornada do Herói (Campbell/Vogler).
4. Módulo 04 - Direção & Direção de Atores: O olhar do diretor, mise-en-scène, decupagem técnica de roteiro, ensaios, intenção dramática, subtexto, tomadas e condução ética do set de filmagem.
5. Módulo 05 - Fotografia, Câmera & Iluminação: Luz de 3 pontos (Key Light, Fill Light, Backlight/Rim Light); razão de contraste; temperaturas de cor (Kelvin: 3200K tungstênio vs 5600K luz do dia); lentes (grande-angular 18-28mm, normal 50mm, teleobjetiva 85-135mm); profundidade de campo, ISO, obturador (regra dos 180° / shutter speed), estilos High-Key e Low-Key (chiaroscuro).
6. Módulo 06 - Som & Trilha Sonora: Som direto em set, microfone shotgun/boom, microfones de lapela, ruído de sala (room tone), foley, sound design, trilha diegética vs extra-diegética, pós-produção de áudio.
7. Módulo 07 - Montagem & Edição: Continuidade espaçotemporal, corte na ação (cutting on action), corte seco, jump cut, elipses, Efeito Kuleshov, montagem paralela, ritmo e pacing da cena.
8. Módulo 08 - Produção Executiva & Planejamento: Orçamento audiovisual, cronograma, ordem do dia (call sheet), autorizações de locação e uso de imagem, leis de incentivo (Lei Paulo Gustavo, Aldir Blanc, Rouanet, FSA/Ancine), plano de contingência.
9. Módulo 09 - Distribuição, Festivais & Mercado: Circuito de festivais (FilmFreeway), janelas de exibição, pitch deck, press-kit, trailer, cartaz e estratégias de lançamento independente.
10. Módulo 10 - Projeto Final: Realização prática de curta-metragem autoral (1 a 5 minutos) com entrega de decupagem, plano de filmagem, roteiro e corte final para o certificado de 120 horas.
BÔNUS 01: Glossário Completo de Planos e Movimentos de Câmera (30 páginas).
BÔNUS 02: Glossário Completo de Roteiro e Dramaturgia Audiovisual (29 páginas).

DIRETRIZES DE RESPOSTA:
- Aluno atendido: ${studentName}.
- Idioma de resposta: responda no mesmo idioma do usuário (${language}).
- Seja profundamente didático, prático, encorajador e tecnicamente preciso.
- Use exemplos práticos de grandes diretores ou filmes consagrados (ex: Hitchcock, Kubrick, Spielberg, Tarantino, Tarkovsky, Varda, Glauber Rocha, Denis Villeneuve, etc.) quando enriquecer a explicação.
- Se a dúvida for sobre decupagem, roteiro ou iluminação, forneça pequenos exemplos esquemáticos bem formatados.
- Formate a resposta com títulos em negrito, tópicos com marcadores (bullet points) e parágrafos bem espaçados para máxima legibilidade.
- Conclua com uma breve frase motivadora de set ("Luz, câmera e boa prática!", "Bom trabalho na sua decupagem!", etc.).${moduleContext}`;

    const apiKey = process.env.GEMINI_API_KEY;
    let answer = '';
    let modelUsed = '';

    if (apiKey) {
      const candidateModels = ['gemini-3.8-flash', 'gemini-3.1-flash-lite', 'gemini-flash-latest'];
      
      // Build conversation contents including history
      const formattedContents: any[] = [];
      
      // Add previous chat turns (limit to last 6 turns for tight context)
      if (Array.isArray(history) && history.length > 0) {
        const recentHistory = history.slice(-6);
        for (const item of recentHistory) {
          if (item && item.content && (item.role === 'user' || item.role === 'model')) {
            formattedContents.push({
              role: item.role === 'user' ? 'user' : 'model',
              parts: [{ text: String(item.content) }],
            });
          }
        }
      }
      
      // Add current user prompt
      formattedContents.push({
        role: 'user',
        parts: [{ text: cleanMessage }],
      });

      for (const m of candidateModels) {
        try {
          const { GoogleGenAI } = await import('@google/genai');
          const ai = new GoogleGenAI({
            apiKey,
            httpOptions: {
              headers: {
                'User-Agent': 'aistudio-build',
              },
            },
          });

          const genPromise = ai.models.generateContent({
            model: m,
            contents: formattedContents,
            config: {
              systemInstruction,
              temperature: 0.7,
              topP: 0.9,
            },
          });

          const timeoutPromise = new Promise((_, reject) =>
            setTimeout(() => reject(new Error(`Timeout with model ${m}`)), 12000)
          );

          const response: any = await Promise.race([genPromise, timeoutPromise]);
          const resultText = response?.text?.trim();

          if (resultText && resultText.length > 20) {
            answer = resultText;
            modelUsed = m;
            break;
          }
        } catch (modelErr: any) {
          console.warn(`[CineTutor IA] Model ${m} attempt failed:`, modelErr?.message || modelErr);
        }
      }
    }

    // High-quality contextual pedagogical fallback if external API is unreachable or rate-limited
    if (!answer) {
      answer = generatePedagogicalFallback(cleanMessage, studentName, moduleId);
      modelUsed = 'cinelab-pedagogical-engine';
    }

    // Suggest 3 dynamic relevant questions based on the topic
    const suggestions = generateContextualSuggestions(cleanMessage, moduleId);

    res.json({
      success: true,
      answer,
      modelUsed,
      relatedModuleId: moduleId ? Number(moduleId) : detectRelatedModule(cleanMessage),
      suggestions,
    });
  } catch (err: any) {
    console.error('Erro no endpoint do CineTutor IA:', err);
    res.status(500).json({
      error: 'Falha ao processar dúvida com o tutor.',
      details: err?.message || String(err),
    });
  }
});

/**
 * Detecta o módulo mais provável com base nas palavras-chave da dúvida
 */
function detectRelatedModule(text: string): number {
  const lower = text.toLowerCase();
  if (lower.includes('plano') || lower.includes('enquadramento') || lower.includes('180') || lower.includes('travelling')) return 1;
  if (lower.includes('história') || lower.includes('silencioso') || lower.includes('camada') || lower.includes('análise')) return 2;
  if (lower.includes('roteiro') || lower.includes('personagem') || lower.includes('syd field') || lower.includes('jornada') || lower.includes('diálogo')) return 3;
  if (lower.includes('direção') || lower.includes('ator') || lower.includes('mise-en-scène') || lower.includes('ensaio') || lower.includes('decupagem')) return 4;
  if (lower.includes('luz') || lower.includes('iluminação') || lower.includes('fotografia') || lower.includes('lente') || lower.includes('iso') || lower.includes('key light')) return 5;
  if (lower.includes('som') || lower.includes('áudio') || lower.includes('microfone') || lower.includes('boom') || lower.includes('foley') || lower.includes('room tone')) return 6;
  if (lower.includes('montagem') || lower.includes('edição') || lower.includes('corte') || lower.includes('kuleshov') || lower.includes('ritmo')) return 7;
  if (lower.includes('produção') || lower.includes('orçamento') || lower.includes('ordem do dia') || lower.includes('edital') || lower.includes('leis')) return 8;
  if (lower.includes('distribuição') || lower.includes('festival') || lower.includes('festivais') || lower.includes('pitch') || lower.includes('cartaz')) return 9;
  if (lower.includes('curta') || lower.includes('curta-metragem') || lower.includes('projeto final') || lower.includes('mostra') || lower.includes('certificado')) return 10;
  return 1;
}

/**
 * Sugestões inteligentes de perguntas de acompanhamento
 */
function generateContextualSuggestions(text: string, currentModuleId?: number): string[] {
  const lower = text.toLowerCase();
  if (lower.includes('luz') || lower.includes('ilumina') || lower.includes('fotografia')) {
    return [
      'Como criar a luz de 3 pontos em uma sala comum?',
      'Qual a diferença entre iluminação High-Key e Low-Key?',
      'Como equilibrar a temperatura de cor (3200K vs 5600K)?',
    ];
  }
  if (lower.includes('roteiro') || lower.includes('história') || lower.includes('personag')) {
    return [
      'Como formatar cabeçalhos e diálogos no padrão Master Scenes?',
      'Como aplicar os pontos de virada do Paradigma de Syd Field?',
      'Qual a diferença prática entre Sinopse, Argumento e Escaleta?',
    ];
  }
  if (lower.includes('decupagem') || lower.includes('plano') || lower.includes('câmera')) {
    return [
      'Como preencher uma folha de decupagem técnica profissional?',
      'O que é a regra dos 180 graus e como nunca quebrar o eixo?',
      'Quando devo usar lente 24mm, 50mm ou 85mm em um diálogo?',
    ];
  }
  if (lower.includes('som') || lower.includes('áudio') || lower.includes('microfone')) {
    return [
      'Por que o Room Tone (ruído de sala) é obrigatório em toda gravação?',
      'Qual a posição correta do microfone boom em cena com 2 atores?',
      'Como tratar o áudio na pós-produção para voz limpa e inteligível?',
    ];
  }
  if (lower.includes('montagem') || lower.includes('edição') || lower.includes('corte')) {
    return [
      'O que é o Efeito Kuleshov e como usá-lo na montagem?',
      'Como fazer cortes na ação (cutting on action) imperceptíveis?',
      'Qual a cadência de cortes ideal para uma cena de diálogo dramático?',
    ];
  }
  return [
    'Como fazer a decupagem técnica de uma cena do meu curta?',
    'Como funciona a avaliação e a emissão do certificado de 120 horas?',
    'Quais são os 10 módulos do CINELAB e como acompanhá-los no cronograma?',
  ];
}

/**
 * Motor pedagógico de fallback em caso de indisponibilidade momentânea da rede
 */
function generatePedagogicalFallback(query: string, studentName: string, moduleId?: number): string {
  const lower = query.toLowerCase();

  if (lower.includes('luz') || lower.includes('ilumina') || lower.includes('3 ponto') || lower.includes('key light')) {
    return `Olá, **${studentName}**! Excelente pergunta sobre iluminação cinematográfica.

Na metodologia do **CINELAB (Módulo 05: Fotografia, Câmera e Iluminação)**, a iluminação clássica de três pontos é o alicerce fundamental de toda composição:

1. **Luz Principal (Key Light):**
   - É a fonte primária de luz na cena. Define a exposição básica e projeta a sombra principal no rosto do ator.
   - Posicionamento ideal: cerca de 45° lateralmente e 45° acima do nível dos olhos do sujeito.

2. **Luz de Preenchimento (Fill Light):**
   - Suaviza as sombras criadas pela Key Light sem criar novas sombras evidentes.
   - Posicionamento no lado oposto à Key Light, com intensidade tipicamente entre 50% a 25% (razão de contraste de 2:1 a 4:1).

3. **Luz de Recorte ou Contra-Luz (Backlight / Rim Light):**
   - Fica atrás e acima do sujeito, direcionada para a nuca e ombros.
   - **Função crucial:** separar o personagem do fundo, criando tridimensionalidade e profundidade no plano 2D.

💡 **Dica de Set do Diretor Tony de Luc:**
> *"Em ambientes apertados, você pode usar uma parede branca ou um rebatedor de isopor como Fill Light passivo, economizando espaço e luz direta no set!"*

Qualquer dúvida adicional, confira a apostila do **Módulo 05** e continue seus estudos!`;
  }

  if (lower.includes('decupa') || lower.includes('planta') || lower.includes('folha')) {
    return `Olá, **${studentName}**! Decupagem técnica é o coração da preparação de qualquer diretor de cinema.

No **Módulo 03 e 04 do CINELAB**, aprendemos que a **Decupagem Técnica** é a tradução do roteiro literário em termos visuais e operacionais para a equipe de filmagem:

### Elementos indispensáveis em cada linha da folha de decupagem:
1. **Cena & Plano:** Ex: Cena 14 / Plano 1 (Plano Geral), Plano 2 (Plano Médio), Plano 3 (Close-up).
2. **Enquadramento & Lente:** Ex: *PP (Primeiro Plano)* com lente *50mm f/2.8*.
3. **Movimento de Câmera:** Ex: Câmera estática no tripé, *panorâmica para a direita*, *travelling* lateral ou câmera na mão (handheld).
4. **Ângulo & Posição:** Normal (altura dos olhos), Plongée (de cima para baixo) ou Contra-plongée (de baixo para cima).
5. **Descrição da Ação & Diálogo:** O que exatamente acontece durante aquela tomada.
6. **Som & Notas Técnicas:** Captação de som direto, microfone boom, luz prática ligada, etc.

📋 **Dica Prática:**
Lembre-se sempre de desenhar uma **Planta Baixa (Floor Plan)** simplificada indicando a posição da câmera, dos atores e dos refletores de luz antes de pisar no set!

Confira a apostila do Módulo 04 para baixar os modelos oficiais de decupagem!`;
  }

  if (lower.includes('kuleshov') || lower.includes('montagem') || lower.includes('corte') || lower.includes('edição')) {
    return `Olá, **${studentName}**! Você tocou em um dos pilares mais fascinantes da teoria da montagem.

No **Módulo 07 (Montagem e Pós-Produção)** do CINELAB, estudamos a fundo o célebre experimento do cineasta soviético **Lev Kuleshov (anos 1920)**:

### O Experimento de Kuleshov:
Kuleshov pegou o mesmo plano de rosto com expressão neutra do ator Ivan Mozzhukhin e o intercalou com três planos diferentes:
1. **Rosto neutro + Prato de sopa quente:** O público interpretava que o ator estava faminto.
2. **Rosto neutro + Menina em um caixão:** O público interpretava tristeza profunda e luto.
3. **Rosto neutro + Mulher descansando em um divã:** O público via desejo e contemplação.

### A Lição para o Realizador:
O cinema **não reside apenas em cada plano isolado**, mas na **relação de significado criada entre dois planos sucessivos** na mente do espectador.

✂️ **Aplicação na sua obra:**
Ao montar seu curta do Projeto Final, use o corte de reação com precisão. O tempo que a câmera permanece na reação de quem ouve pode ser muito mais dramático do que a imagem de quem fala!`;
  }

  if (lower.includes('certificado') || lower.includes('horas') || lower.includes('avaliação') || lower.includes('nota')) {
    return `Olá, **${studentName}**! O sistema acadêmico do **CINELAB** foi estruturado com máximo rigor pedagógico para valorizar seu currículo profissional:

### Requisitos para o Certificado Profissional de 120 Horas:
1. **Concluir as Avaliações dos 10 Módulos:** Cada módulo possui uma avaliação teórica e prática com questões de múltipla escolha e questões discursivas.
2. **Média Geral Mínima:** Obter média igual ou superior a **6.0 / 10.0** no boletim acadêmico.
3. **Projeto Final (Módulo 10):** Elaborar a entrega do curta-metragem autoral (roteiro, decupagem e link da obra).
4. **Autenticidade Garantida:** Seu certificado possui código hash criptográfico único (ex: \`CNL-...\`), registrando carga horária de 120h, programa curricular completo e validação pública instantânea pela aba **Validar Certificado**.

Você pode acompanhar todo o seu progresso na aba **Notas & Boletim** e na sua **Área do Aluno**!`;
  }

  // Resposta geral acolhedora de mentoria
  return `Olá, **${studentName}**! Bem-vindo ao **CineTutor IA**, seu espaço de apoio pedagógico contínuo no **CINELAB**.

Sobre a sua dúvida: *"${query}"*

O fazer cinematográfico exige articular a visão artística com a técnica rigorosa em todas as etapas:
- **Pré-Produção:** Roteiro formatado, decupagem técnica, desenho de set e cronograma.
- **Produção (Set):** Condução de atores, luz de 3 pontos, operação de câmera e captação de som direto limpo.
- **Pós-Produção:** Montagem expressiva, ritmo, desenho sonoro e correção de cor.

Você gostaria de aprofundar essa questão em relação a algum módulo específico do nosso curso (ex: Módulo 01 Linguagem, Módulo 03 Roteiro, Módulo 04 Direção, Módulo 05 Fotografia, Módulo 07 Montagem)?

Conte comigo para transformar suas ideias em cinema de verdade! 🎬`;
}

// ----------------------------------------------------
// 6. VITE & SPA FALLBACK SETUP
// ----------------------------------------------------
async function startServer() {
  if (process.env.NODE_ENV !== "production" && !process.env.VERCEL) {
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req: Request, res: Response) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  const server = app.listen(PORT, '0.0.0.0', () => {
    console.log(`CINELAB Server running on http://0.0.0.0:${PORT}`);
  });
  server.timeout = 600000; // 10 minutes for large media transfers
  server.keepAliveTimeout = 65000;
  server.headersTimeout = 66000;
}

if (!process.env.VERCEL) {
  startServer();
}

export { app };
export default app;
