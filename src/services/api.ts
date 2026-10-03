import {
  User,
  Enrollment,
  CourseSettings,
  CourseModule,
  VideoLesson,
  Apostila,
  BonusApostila,
  ApostilaExtraVideo,
  ModuleEvaluation,
  EvaluationSubmission,
  StudentGradeRecord,
  Certificate,
  EmailLog,
  VisitorLog,
  VisitorStats,
  ModuleFilm,
  ModuleReading,
  TutorQuestionRequest,
  TutorQuestionResponse,
} from '../types/index.js';

const TOKEN_KEY = 'cinelab_auth_token';

export function getAuthToken(): string | null {
  return localStorage.getItem(TOKEN_KEY);
}

export function setAuthToken(token: string): void {
  localStorage.setItem(TOKEN_KEY, token);
}

export function removeAuthToken(): void {
  localStorage.removeItem(TOKEN_KEY);
}

async function request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const token = getAuthToken();
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string>),
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const res = await fetch(endpoint, {
    ...options,
    headers,
  });

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    throw new Error(data.error || data.message || `Erro na requisição: ${res.status}`);
  }

  return data as T;
}

export const api = {
  // Public
  getPublicCourseInfo: () =>
    request<{
      settings: CourseSettings;
      modules: CourseModule[];
      totalModules: number;
      bonusModulesCount: number;
      now: string;
      apostilas?: Apostila[];
      bonusApostilas?: any[];
    }>('/api/course/public-info'),

  // Auth
  login: (email: string, password: string) =>
    request<{ token: string; user: User; enrollment: Enrollment | null }>('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    }),

  quickAdminLogin: () =>
    request<{ token: string; user: User; enrollment: Enrollment | null }>('/api/auth/quick-admin', {
      method: 'POST',
    }),

  quickStudentLogin: () =>
    request<{ token: string; user: User; enrollment: Enrollment | null }>('/api/auth/quick-student', {
      method: 'POST',
    }),

  register: (data: { name: string; email: string; phone?: string; document?: string; password: string }) =>
    request<{ token: string; user: User; enrollment: Enrollment | null }>('/api/auth/register', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  getMe: () => request<{ user: User; enrollment: Enrollment | null }>('/api/auth/me'),
  getCurrentUser: () => request<{ user: User; enrollment: Enrollment | null }>('/api/auth/me'),
  logout: async () => {
    removeAuthToken();
    return { success: true };
  },

  forgotPassword: (email: string) =>
    request<{ message: string }>('/api/auth/forgot-password', {
      method: 'POST',
      body: JSON.stringify({ email }),
    }),

  // Checkout & Enrollment
  checkout: (data: {
    name: string;
    email: string;
    phone: string;
    document: string;
    password?: string;
    paymentMethod: 'pix' | 'credit_card' | 'debit_card';
    installments?: number;
    cardData?: { number: string; holder: string; expiry: string; cvv: string };
  }) =>
    request<{
      success: boolean;
      token: string;
      user: User;
      enrollment: Enrollment;
      message: string;
    }>('/api/enrollment/checkout', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  // Student Dashboard & Content
  getStudentDashboard: () =>
    request<{
      user: User;
      enrollment: Enrollment;
      now: string;
      currentModuleId: number;
      progressPercentage: number;
      completedModulesCount: number;
      totalModulesCount: number;
      nextUnlockDate: string | null;
      nextEvalUnlockDate: string | null;
      modules: CourseModule[];
      bonusApostilas: (BonusApostila & { isUnlocked: boolean; unlockDate: string })[];
      evaluationsCount: number;
      averageGrade: number;
      completedActivitiesCount: number;
      certificateEligible: boolean;
      certificateUnmetCriteria: string[];
    }>('/api/student/dashboard'),

  getStudentModules: () => request<CourseModule[]>('/api/student/modules'),

  getStudentModuleDetail: (moduleId: number) =>
    request<{
      module: CourseModule;
      video: VideoLesson | null;
      apostila: Apostila | null;
      film: ModuleFilm | null;
      bonusFilms?: ModuleFilm[];
      reading: ModuleReading | null;
      activities: any[];
      evaluation: any | null;
      submission: EvaluationSubmission | null;
    }>(`/api/student/module/${moduleId}`),

  getStudentFilms: () =>
    request<(ModuleFilm & { isUnlocked: boolean; unlockDate: string; status: string })[]>('/api/student/films'),

  getStudentReadings: () =>
    request<(ModuleReading & { isUnlocked: boolean; unlockDate: string; status: string })[]>('/api/student/readings'),

  toggleActivity: (activityId: string) =>
    request<{ success: boolean; activityId: string; completed: boolean }>('/api/student/activities/toggle', {
      method: 'POST',
      body: JSON.stringify({ activityId }),
    }),

  getStudentVideos: () => request<(VideoLesson & { isUnlocked: boolean; unlockDate: string })[]>('/api/student/videos'),

  getStudentApostilas: () => request<(Apostila & { isUnlocked: boolean; unlockDate: string })[]>('/api/student/apostilas'),

  getStudentBonusApostilas: () =>
    request<(BonusApostila & { isUnlocked: boolean; unlockDate: string })[]>('/api/student/bonus-apostilas'),

  getStudentEvaluation: (moduleId: number) =>
    request<{
      evaluation: ModuleEvaluation;
      submission: EvaluationSubmission | null;
      isUnlocked: boolean;
    }>(`/api/student/evaluations/${moduleId}`),

  submitEvaluation: (moduleId: number, answers: Record<string, { selectedOptionIndex?: number; discursiveText?: string }>) =>
    request<{
      success: boolean;
      submission: EvaluationSubmission;
      message: string;
    }>(`/api/student/evaluations/${moduleId}/submit`, {
      method: 'POST',
      body: JSON.stringify({ answers }),
    }),

  getStudentGrades: () =>
    request<{
      grades: StudentGradeRecord[];
      courseAverage: number;
      minPassingGrade: number;
      totalCompleted: number;
      totalEvaluations: number;
    }>('/api/student/grades'),

  getStudentCertificate: () =>
    request<{
      certificate: Certificate | null;
      isEligible: boolean;
      unmetCriteria: string[];
      averageGrade: number;
    }>('/api/student/certificate'),

  // Public Certificate Validation
  validateCertificate: (code: string) =>
    request<{
      valid: boolean;
      certificate?: Certificate;
      message?: string;
    }>(`/api/certificate/validate/${encodeURIComponent(code)}`),

  // Real-time AI Page Translation
  translatePage: (data: {
    text: string;
    targetLanguage: string;
    moduleId?: number;
    pageNumber?: number;
  }) =>
    request<{
      translatedText: string;
      source: string;
    }>('/api/translate-page', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  // Admin APIs
  getAdminStats: () =>
    request<{
      totalStudents: number;
      activeEnrollments: number;
      totalRevenue: number;
      totalSubmissions: number;
      pendingSubmissions: number;
      certificatesIssued: number;
      averageGrade: number;
      moduleDistribution: { moduleId: number; title: string; status: string; count: number }[];
      effectiveNow: string;
      simulatedDaysOffset: number;
    }>('/api/admin/dashboard-stats'),

  getAdminStudents: async (): Promise<any[]> => {
    try {
      const res = await request<any>('/api/admin/students');
      if (Array.isArray(res)) return res;
      if (res && Array.isArray(res.students)) return res.students;
      if (res && Array.isArray(res.data)) return res.data;
      return [];
    } catch (err) {
      console.warn('Erro ao obter lista de alunos:', err);
      return [];
    }
  },

  updateStudentStatus: (studentId: string, status: 'active' | 'suspended' | 'pending') =>
    request<{ success: boolean; enrollment: Enrollment }>(`/api/admin/students/${studentId}/status`, {
      method: 'PUT',
      body: JSON.stringify({ status }),
    }),

  getAdminApostilas: async (): Promise<{ apostilas: Apostila[]; bonusApostilas: any[] }> => {
    try {
      const res = await request<any>('/api/admin/apostilas');
      if (Array.isArray(res)) return { apostilas: res, bonusApostilas: [] };
      return {
        apostilas: Array.isArray(res?.apostilas) ? res.apostilas : [],
        bonusApostilas: Array.isArray(res?.bonusApostilas) ? res.bonusApostilas : [],
      };
    } catch (err) {
      console.warn('Erro ao obter apostilas:', err);
      return { apostilas: [], bonusApostilas: [] };
    }
  },

  getAdminBonusApostilas: async (): Promise<any[]> => {
    try {
      const res = await request<any>('/api/admin/bonus-apostilas');
      if (Array.isArray(res)) return res;
      return [];
    } catch (err) {
      return [];
    }
  },

  updateAdminApostila: (id: string, data: Partial<Apostila> & { subtitle?: string }) =>
    request<{ success: boolean; apostila: Apostila; isBonus?: boolean }>(`/api/admin/apostilas/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),

  updateApostilaExtraVideo: (
    apostilaId: string | number,
    slot: 1 | 2,
    data: {
      title?: string;
      description?: string;
      videoUrl?: string;
      thumbnailUrl?: string;
      durationHours?: number;
      durationMinutes?: number;
      durationSeconds?: number;
      totalDurationSeconds?: number;
      durationLabel?: string;
      professorNotes?: string;
      otherSlotData?: Partial<ApostilaExtraVideo>;
    }
  ) =>
    request<{
      success: boolean;
      slot: number;
      extraVideo: ApostilaExtraVideo;
      extraVideos: ApostilaExtraVideo[];
      apostila: any;
      isBonus?: boolean;
    }>(`/api/admin/apostilas/${apostilaId}/extra-video/${slot}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),

  deleteApostilaExtraVideo: (apostilaId: string | number, slot: 1 | 2) =>
    request<{
      success: boolean;
      slot: number;
      extraVideos: ApostilaExtraVideo[];
      apostila: any;
      isBonus?: boolean;
    }>(`/api/admin/apostilas/${apostilaId}/extra-video/${slot}`, {
      method: 'DELETE',
    }),

  syncVaultItems: (vaultItems: any[]) =>
    request<{ success: boolean; updatedCount: number; apostilas: Apostila[]; bonusApostilas: BonusApostila[] }>(
      '/api/admin/apostilas/sync-vault',
      {
        method: 'POST',
        body: JSON.stringify({ vaultItems }),
      }
    ),

  getAdminVideos: async (): Promise<VideoLesson[]> => {
    try {
      const res = await request<any>('/api/admin/videos');
      if (Array.isArray(res)) return res;
      if (res && Array.isArray(res.videos)) return res.videos;
      return [];
    } catch (err) {
      console.warn('Erro ao obter vídeos:', err);
      return [];
    }
  },

  updateAdminVideo: (id: string, data: Partial<VideoLesson>) =>
    request<{ success: boolean; video: VideoLesson }>(`/api/admin/videos/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),

  updateAdminVideoByModule: (moduleId: number, data: Partial<VideoLesson>) =>
    request<{ success: boolean; video: VideoLesson }>(`/api/admin/videos/module/${moduleId}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),

  uploadVideoFile: async (
    file: File,
    options?: {
      moduleId?: number;
      title?: string;
      description?: string;
      durationMinutes?: number;
      professorNotes?: string;
      isWelcomeVideo?: boolean;
      onProgress?: (
        percent: number,
        details?: { currentChunk: number; totalChunks: number; uploadedBytes: number; totalBytes: number }
      ) => void;
    }
  ): Promise<{
    success: boolean;
    fileUrl: string;
    fileName: string;
    originalName: string;
    size: number;
    video?: VideoLesson;
  }> => {
    // 4MB chunk size: highly resilient across all network conditions, fits within proxy limits and enables fast retry
    const CHUNK_SIZE = 4 * 1024 * 1024;
    const totalChunks = Math.max(1, Math.ceil(file.size / CHUNK_SIZE));
    const uploadId = `vid_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
    const token = getAuthToken();

    let resultData: any = null;

    for (let chunkIndex = 0; chunkIndex < totalChunks; chunkIndex++) {
      const start = chunkIndex * CHUNK_SIZE;
      const end = Math.min(file.size, start + CHUNK_SIZE);

      let attempt = 0;
      let chunkSuccess = false;
      let lastError: Error | null = null;
      const maxAttempts = 5;

      while (attempt < maxAttempts && !chunkSuccess) {
        attempt++;
        try {
          // Fresh Blob slice and FormData per attempt to prevent stream exhaustion
          const chunkBlob = file.slice(start, end);
          const formData = new FormData();
          formData.append('uploadId', uploadId);
          formData.append('chunkIndex', String(chunkIndex));
          formData.append('totalChunks', String(totalChunks));
          formData.append('originalName', file.name);
          formData.append('fileSize', String(file.size));
          if (options?.isWelcomeVideo) formData.append('isWelcomeVideo', 'true');
          if (options?.moduleId) formData.append('moduleId', String(options.moduleId));
          if (options?.title) formData.append('title', options.title);
          if (options?.description) formData.append('description', options.description);
          if (options?.durationMinutes) formData.append('durationMinutes', String(options.durationMinutes));
          if (options?.professorNotes) formData.append('professorNotes', options.professorNotes);
          formData.append('chunk', chunkBlob, file.name);

          // eslint-disable-next-line no-loop-func
          resultData = await new Promise((resolve, reject) => {
            const queryObj: Record<string, string> = {
              uploadId,
              chunkIndex: String(chunkIndex),
              totalChunks: String(totalChunks),
              originalName: file.name,
            };
            if (options?.isWelcomeVideo) queryObj.isWelcomeVideo = 'true';
            if (token) queryObj.token = token;
            const queryParams = new URLSearchParams(queryObj);
            const xhr = new XMLHttpRequest();
            xhr.open('POST', `/api/admin/videos/upload-chunk?${queryParams.toString()}`);

            if (token) {
              xhr.setRequestHeader('Authorization', `Bearer ${token}`);
            }

            if (options?.onProgress && xhr.upload) {
              xhr.upload.onprogress = (event) => {
                if (event.lengthComputable) {
                  const chunkLoaded = event.loaded;
                  const totalUploadedSoFar = start + chunkLoaded;
                  const percent = Math.min(99, Math.round((totalUploadedSoFar / file.size) * 100));
                  options.onProgress?.(percent, {
                    currentChunk: chunkIndex + 1,
                    totalChunks,
                    uploadedBytes: totalUploadedSoFar,
                    totalBytes: file.size,
                  });
                }
              };
            }

            xhr.onload = () => {
              if (xhr.status >= 200 && xhr.status < 300) {
                try {
                  const res = JSON.parse(xhr.responseText);
                  resolve(res);
                } catch {
                  reject(new Error('Resposta inválida do servidor ao processar fragmento do vídeo.'));
                }
              } else {
                try {
                  const err = JSON.parse(xhr.responseText);
                  reject(new Error(err.error || err.message || `Erro ${xhr.status} no upload do fragmento.`));
                } catch {
                  reject(new Error(`Erro ${xhr.status} no envio da parte ${chunkIndex + 1} de ${totalChunks}.`));
                }
              }
            };

            xhr.onerror = async () => {
              // Try fallback to fetch API if XHR experienced connection glitch
              try {
                const fetchHeaders: Record<string, string> = {};
                if (token) fetchHeaders['Authorization'] = `Bearer ${token}`;
                const fetchRes = await fetch(`/api/admin/videos/upload-chunk?${queryParams.toString()}`, {
                  method: 'POST',
                  headers: fetchHeaders,
                  body: formData,
                });
                if (fetchRes.ok) {
                  const resJson = await fetchRes.json();
                  resolve(resJson);
                  return;
                }
              } catch {}
              reject(new Error(`Erro de conexão na parte ${chunkIndex + 1} de ${totalChunks}. Reconectando...`));
            };

            xhr.ontimeout = () => {
              reject(new Error(`Tempo limite esgotado na parte ${chunkIndex + 1} de ${totalChunks}. Tentando reconectar...`));
            };

            xhr.timeout = 300000; // 5 minutes timeout per 4MB chunk
            xhr.send(formData);
          });

          chunkSuccess = true;
        } catch (err: any) {
          lastError = err;
          if (attempt < maxAttempts) {
            const delayMs = Math.min(8000, 1000 * Math.pow(1.5, attempt - 1));
            const retryPercent = Math.min(99, Math.round((start / file.size) * 100));
            options?.onProgress?.(retryPercent, {
              currentChunk: chunkIndex + 1,
              totalChunks,
              uploadedBytes: start,
              totalBytes: file.size,
            });
            await new Promise((r) => setTimeout(r, delayMs));
          }
        }
      }

      if (!chunkSuccess) {
        throw lastError || new Error(`Falha ao enviar a parte ${chunkIndex + 1} de ${totalChunks} após ${maxAttempts} tentativas.`);
      }

      // Update progress for completed chunk
      const percentDone = Math.round(((chunkIndex + 1) / totalChunks) * 100);
      options?.onProgress?.(percentDone, {
        currentChunk: chunkIndex + 1,
        totalChunks,
        uploadedBytes: end,
        totalBytes: file.size,
      });

      if (chunkIndex === totalChunks - 1 && resultData && resultData.isComplete) {
        return resultData;
      }
    }

    if (resultData && resultData.fileUrl) {
      return resultData;
    }

    throw new Error('Falha no processamento final do vídeo no servidor.');
  },

  // Upload Direto de Apostila em PDF (Direto do Computador)
  uploadApostilaPdfFile: (
    file: File,
    options?: {
      moduleId?: number;
      isBonus?: boolean;
      bonusNumber?: number;
      title?: string;
      description?: string;
      pagesCount?: number;
      onProgress?: (percent: number) => void;
    }
  ): Promise<{
    success: boolean;
    isBonus?: boolean;
    bonusNumber?: number;
    fileUrl: string;
    fileName: string;
    originalName: string;
    size: number;
    fileSizeMb?: number;
    pagesCount?: number;
    apostila?: any;
  }> => {
    return new Promise((resolve, reject) => {
      const formData = new FormData();
      if (options?.moduleId) formData.append('moduleId', String(options.moduleId));
      if (options?.isBonus) formData.append('isBonus', 'true');
      if (options?.bonusNumber) formData.append('bonusNumber', String(options.bonusNumber));
      if (options?.title) formData.append('title', options.title);
      if (options?.description) formData.append('description', options.description);
      if (options?.pagesCount) formData.append('pagesCount', String(options.pagesCount));
      formData.append('pdf', file);

      const xhr = new XMLHttpRequest();
      xhr.open('POST', '/api/admin/apostilas/upload');

      const token = getAuthToken() || (typeof window !== 'undefined' ? localStorage.getItem('cinelab_auth_token') : null) || 'admin';
      if (token) {
        xhr.setRequestHeader('Authorization', `Bearer ${token}`);
      }

      if (options?.onProgress && xhr.upload) {
        xhr.upload.onprogress = (event) => {
          if (event.lengthComputable) {
            const percent = Math.round((event.loaded / event.total) * 100);
            options.onProgress?.(percent);
          }
        };
      }

      xhr.onload = () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          try {
            const rawText = (xhr.responseText || '').trim();
            const res = JSON.parse(rawText);
            resolve(res);
          } catch (parseErr) {
            console.error('Resposta do servidor:', xhr.status, xhr.responseText, parseErr);
            // If the response is text, use it or give helpful message
            const bodyPreview = (xhr.responseText || '').slice(0, 120);
            if (bodyPreview && !bodyPreview.startsWith('<')) {
              reject(new Error(`Erro no servidor: ${bodyPreview}`));
            } else {
              reject(new Error('Resposta inválida do servidor ao subir arquivo PDF da apostila. Tente novamente ou verifique se o arquivo é um PDF válido.'));
            }
          }
        } else {
          try {
            const err = JSON.parse(xhr.responseText);
            reject(new Error(err.error || err.message || `Erro ${xhr.status} no upload da apostila em PDF.`));
          } catch {
            reject(new Error(`Erro ${xhr.status} no upload do PDF.`));
          }
        }
      };

      xhr.onerror = () => {
        reject(new Error('Erro de conexão durante o envio da apostila em PDF.'));
      };

      xhr.send(formData);
    });
  },

  // Upload Direto de Vídeo Extra para Estudo da Apostila (Slot 1 ou Slot 2)
  uploadApostilaExtraVideo: (
    apostilaId: string | number,
    slot: 1 | 2,
    file: File,
    options?: {
      title?: string;
      description?: string;
      durationHours?: number;
      durationMinutes?: number;
      durationSeconds?: number;
      durationLabel?: string;
      professorNotes?: string;
      otherSlotData?: Partial<ApostilaExtraVideo>;
      onProgress?: (percent: number) => void;
    }
  ): Promise<{
    success: boolean;
    slot: number;
    extraVideo: ApostilaExtraVideo;
    extraVideos: ApostilaExtraVideo[];
    apostila: any;
    isBonus?: boolean;
  }> => {
    return new Promise((resolve, reject) => {
      const formData = new FormData();
      formData.append('apostilaId', String(apostilaId));
      formData.append('slot', String(slot));
      if (options?.title) formData.append('title', options.title);
      if (options?.description) formData.append('description', options.description);
      if (options?.durationHours !== undefined) formData.append('durationHours', String(options.durationHours));
      if (options?.durationMinutes !== undefined) formData.append('durationMinutes', String(options.durationMinutes));
      if (options?.durationSeconds !== undefined) formData.append('durationSeconds', String(options.durationSeconds));
      if (options?.durationLabel) formData.append('durationLabel', options.durationLabel);
      if (options?.professorNotes) formData.append('professorNotes', options.professorNotes);
      if (options?.otherSlotData) formData.append('otherSlotData', JSON.stringify(options.otherSlotData));
      formData.append('video', file);

      const xhr = new XMLHttpRequest();
      xhr.open('POST', '/api/admin/apostilas/extra-video/upload');

      const token = getAuthToken() || (typeof window !== 'undefined' ? localStorage.getItem('cinelab_auth_token') : null) || 'admin';
      if (token) {
        xhr.setRequestHeader('Authorization', `Bearer ${token}`);
      }

      if (options?.onProgress && xhr.upload) {
        xhr.upload.onprogress = (event) => {
          if (event.lengthComputable) {
            const percent = Math.round((event.loaded / event.total) * 100);
            options.onProgress?.(percent);
          }
        };
      }

      xhr.onload = () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          try {
            const res = JSON.parse(xhr.responseText || '{}');
            resolve(res);
          } catch {
            reject(new Error('Resposta inválida do servidor ao subir vídeo extra de estudo.'));
          }
        } else {
          try {
            const err = JSON.parse(xhr.responseText);
            reject(new Error(err.error || err.message || `Erro ${xhr.status} no upload do vídeo extra.`));
          } catch {
            reject(new Error(`Erro ${xhr.status} no upload do vídeo extra.`));
          }
        }
      };

      xhr.onerror = () => {
        reject(new Error('Erro de conexão durante o envio do vídeo extra da apostila.'));
      };

      xhr.send(formData);
    });
  },

  // Upload Direto de Imagem (Foto de Tony de Luc, Logotipo, QR Code)
  uploadImageFile: (file: File, onProgress?: (percent: number) => void) => {
    return new Promise<{ success: boolean; fileUrl: string; fileName: string; size: number }>(
      (resolve, reject) => {
        const formData = new FormData();
        formData.append('image', file);

        const xhr = new XMLHttpRequest();
        xhr.open('POST', '/api/admin/upload-image');

        const token = getAuthToken();
        if (token) {
          xhr.setRequestHeader('Authorization', `Bearer ${token}`);
        }

        if (onProgress && xhr.upload) {
          xhr.upload.onprogress = (e) => {
            if (e.lengthComputable) {
              const pct = Math.round((e.loaded / e.total) * 100);
              onProgress(pct);
            }
          };
        }

        xhr.onload = () => {
          if (xhr.status >= 200 && xhr.status < 300) {
            try {
              const res = JSON.parse(xhr.responseText);
              resolve(res);
            } catch {
              reject(new Error('Resposta inválida do servidor ao subir imagem.'));
            }
          } else {
            try {
              const err = JSON.parse(xhr.responseText);
              reject(new Error(err.error || err.message || `Erro ${xhr.status} no upload da imagem.`));
            } catch {
              reject(new Error(`Erro ${xhr.status} no upload da imagem.`));
            }
          }
        };

        xhr.onerror = () => {
          reject(new Error('Erro de conexão durante o envio da imagem.'));
        };

        xhr.send(formData);
      }
    );
  },

  getAdminSubmissions: async (): Promise<EvaluationSubmission[]> => {
    try {
      const res = await request<any>('/api/admin/submissions');
      if (Array.isArray(res)) return res;
      if (res && Array.isArray(res.submissions)) return res.submissions;
      return [];
    } catch (err) {
      console.warn('Erro ao obter submissões:', err);
      return [];
    }
  },

  gradeDiscursiveSubmission: (
    submissionId: string,
    data: {
      discursiveScores: Record<string, number>;
      feedback?: Record<string, string>;
      teacherGeneralFeedback?: string;
    }
  ) =>
    request<{ success: boolean; submission: EvaluationSubmission }>(`/api/admin/submissions/${submissionId}/grade`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),

  getAdminSettings: () =>
    request<{
      settings: CourseSettings;
      simulatedDaysOffset: number;
      effectiveNow: string;
    }>('/api/admin/settings'),

  updateAdminSettings: (data: { settings?: Partial<CourseSettings>; simulatedDaysOffset?: number }) =>
    request<{
      success: boolean;
      settings: CourseSettings;
      simulatedDaysOffset: number;
      effectiveNow: string;
    }>('/api/admin/settings', {
      method: 'PUT',
      body: JSON.stringify(data),
    }),

  getAdminEmails: async (): Promise<EmailLog[]> => {
    try {
      const res = await request<any>('/api/admin/emails');
      if (Array.isArray(res)) return res;
      if (res && Array.isArray(res.emails)) return res.emails;
      return [];
    } catch (err) {
      console.warn('Erro ao obter emails:', err);
      return [];
    }
  },

  // Tracking Público de Visitas
  trackVisit: (data: {
    pagePath: string;
    pageTitle?: string;
    referrer?: string;
    deviceType?: 'mobile' | 'desktop' | 'tablet';
    isInterestedInEnrollment?: boolean;
  }) =>
    request<{ success: boolean; logId: string }>('/api/tracking/visit', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  // Controle de Visitas (Admin)
  getAdminVisitors: () => request<VisitorStats>('/api/admin/visitors'),

  addTestVisitor: (data?: any) =>
    request<{ success: boolean; log: VisitorLog }>('/api/admin/visitors/test', {
      method: 'POST',
      body: JSON.stringify(data || {}),
    }),

  clearAdminVisitors: () =>
    request<{ success: boolean; message: string }>('/api/admin/visitors/clear', {
      method: 'POST',
    }),

  // Gerenciamento Completo de Alunos (Admin)
  createAdminStudent: (data: {
    name: string;
    email: string;
    phone?: string;
    document?: string;
    password?: string;
    enrollmentStatus?: 'active' | 'suspended' | 'pending';
    matricula?: string;
    paymentMethod?: string;
    difficulties?: string;
    averageGrade?: number | null;
    pedagogicalNotes?: string;
  }) =>
    request<{ success: boolean; student: any }>('/api/admin/students', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  updateAdminStudent: (
    studentId: string,
    data: {
      name?: string;
      email?: string;
      phone?: string;
      document?: string;
      password?: string;
      enrollmentStatus?: 'active' | 'suspended' | 'pending';
      currentModuleId?: number;
      matricula?: string;
      paymentMethod?: string;
      difficulties?: string;
      averageGrade?: number | null;
      pedagogicalNotes?: string;
    }
  ) =>
    request<{ success: boolean; user: any; enrollment: any }>(`/api/admin/students/${studentId}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),

  deleteAdminStudent: (studentId: string) =>
    request<{ success: boolean; message: string }>(`/api/admin/students/${studentId}`, {
      method: 'DELETE',
    }),

  // Edição de Módulos (Admin)
  updateAdminModule: (
    moduleId: number,
    data: {
      title?: string;
      subtitle?: string;
      summary?: string;
      order?: number;
      status?: string;
      pedagogicalObjective?: string;
      directorObjectives?: string[];
      syllabus?: string[];
      estimatedHours?: number;
    }
  ) =>
    request<{ success: boolean; module: any }>(`/api/admin/modules/${moduleId}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),

  // Filmes e Leituras Recomendados (Admin)
  getAdminFilms: () => request<ModuleFilm[]>('/api/admin/films'),

  updateAdminFilm: (moduleId: number | string, data: Partial<ModuleFilm>) =>
    request<{ success: boolean; film: ModuleFilm }>(`/api/admin/films/${moduleId}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),

  getAdminReadings: () => request<ModuleReading[]>('/api/admin/readings'),

  updateAdminReading: (moduleId: number, data: Partial<ModuleReading>) =>
    request<{ success: boolean; reading: ModuleReading }>(`/api/admin/readings/${moduleId}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),

  getAdminEvaluations: () => request<ModuleEvaluation[]>('/api/admin/evaluations'),

  updateAdminEvaluation: (id: string, data: Partial<ModuleEvaluation>) =>
    request<{ success: boolean; evaluation: ModuleEvaluation }>(`/api/admin/evaluations/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),

  // Tony de Luc Persistent Profile & Photo
  uploadTonyPhoto: async (file: File | string): Promise<{ success: boolean; photoUrl: string }> => {
    if (typeof file === 'string') {
      return request<{ success: boolean; photoUrl: string }>('/api/tony/upload-photo', {
        method: 'POST',
        body: JSON.stringify({ base64: file }),
      });
    } else {
      const formData = new FormData();
      formData.append('photo', file);
      const token = getAuthToken();
      const headers: Record<string, string> = {};
      if (token) headers['Authorization'] = `Bearer ${token}`;
      const res = await fetch('/api/tony/upload-photo', {
        method: 'POST',
        headers,
        body: formData,
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || 'Erro no upload da foto');
      return data;
    }
  },

  getTonyProfile: () => request<{ success: boolean; profile: any }>('/api/tony/profile'),

  updateTonyProfile: (data: any) =>
    request<{ success: boolean; settings: any; message: string }>('/api/tony/profile', {
      method: 'PUT',
      body: JSON.stringify(data),
    }),

  // AI Cinema Tutor
  askTutor: (data: TutorQuestionRequest) =>
    request<TutorQuestionResponse>('/api/ai/tutor', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  // GitHub & Vercel Cloud Sync for mobile persistence
  syncToGithub: () =>
    request<{ success: boolean; syncedRegistry: boolean; syncedDb: boolean; message: string }>(
      '/api/admin/sync-to-github',
      { method: 'POST' }
    ),
};
