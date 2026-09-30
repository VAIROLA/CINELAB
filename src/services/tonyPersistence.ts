import { CourseSettings, FilmographyWork } from '../types/index.js';
import { api } from './api.js';

export interface TonyProfileData {
  tonyName: string;
  tonyRole: string;
  tonyPhotoUrl: string;
  tonyTagline: string;
  tonyBioShort: string;
  tonyBioFull: string;
  tonyFeitos: string[];
  tonyCurriculo: string[];
  tonyFilmografia: FilmographyWork[];
  tonySocialInstagram?: string;
  tonySocialLinkedin?: string;
  tonySocialYoutube?: string;
  welcomeVideoUrl?: string;
  welcomeVideoPoster?: string;
  welcomeMessageTitle?: string;
  welcomeMessageText?: string;
}

const LOCAL_STORAGE_KEY = 'cinelab_tony_profile_v2';
const LOCAL_PHOTO_BACKUP_KEY = 'cinelab_tony_photo_backup';
const LOCAL_WELCOME_VIDEO_KEY = 'cinelab_welcome_video_permanent_url';
const LOCAL_WELCOME_POSTER_KEY = 'cinelab_welcome_poster_permanent_url';

export function saveLocalWelcomeVideoBackup(url: string, poster?: string): void {
  try {
    if (url && url.trim() !== '') {
      localStorage.setItem(LOCAL_WELCOME_VIDEO_KEY, url.trim());
    }
    if (poster && poster.trim() !== '') {
      localStorage.setItem(LOCAL_WELCOME_POSTER_KEY, poster.trim());
    }
  } catch (e) {
    console.warn('Erro ao salvar backup local do vídeo de boas-vindas:', e);
  }
}

export function getLocalWelcomeVideoBackup(): { url: string; poster?: string } | null {
  try {
    const url = localStorage.getItem(LOCAL_WELCOME_VIDEO_KEY);
    const poster = localStorage.getItem(LOCAL_WELCOME_POSTER_KEY) || undefined;
    if (url && url.trim() !== '') {
      return { url: url.trim(), poster };
    }
    return null;
  } catch {
    return null;
  }
}

export function getLocalTonyProfile(): Partial<TonyProfileData> | null {
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch (e) {
    console.warn('Erro ao ler perfil local de Tony de Luc:', e);
    return null;
  }
}

export function saveLocalTonyProfile(data: Partial<TonyProfileData>): void {
  try {
    const current = getLocalTonyProfile() || {};
    const merged = { ...current, ...data };
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(merged));
    
    // If photo is present, store a dedicated backup key as well
    if (data.tonyPhotoUrl) {
      localStorage.setItem(LOCAL_PHOTO_BACKUP_KEY, data.tonyPhotoUrl);
    }

    // If welcome video is present, store dedicated backup keys as well
    if (data.welcomeVideoUrl) {
      saveLocalWelcomeVideoBackup(data.welcomeVideoUrl, data.welcomeVideoPoster);
    }
  } catch (e) {
    console.warn('Erro ao salvar perfil local de Tony de Luc:', e);
  }
}

export function getLocalTonyPhotoBackup(): string | null {
  try {
    return localStorage.getItem(LOCAL_PHOTO_BACKUP_KEY);
  } catch {
    return null;
  }
}

/**
 * Saves Tony profile both to localStorage (instant persistence) and server (/api/tony/profile)
 */
export async function persistTonyProfile(profile: Partial<TonyProfileData>): Promise<void> {
  // 1. Immediately save to browser localStorage
  saveLocalTonyProfile(profile);

  // 2. Persist to server API
  try {
    await api.updateTonyProfile(profile);
  } catch (err) {
    console.error('Falha ao sincronizar perfil de Tony com o servidor:', err);
    // Still saved in browser localStorage, so not lost!
  }
}

/**
 * Uploads Tony photo file to server and saves the persistent URL
 */
export async function persistTonyPhoto(fileOrBase64: File | string): Promise<string> {
  try {
    // If it's a File, make a quick local base64 preview to save in localStorage right away
    if (typeof fileOrBase64 !== 'string') {
      try {
        const reader = new FileReader();
        reader.onload = () => {
          if (typeof reader.result === 'string') {
            saveLocalTonyProfile({ tonyPhotoUrl: reader.result });
          }
        };
        reader.readAsDataURL(fileOrBase64);
      } catch {}
    } else {
      saveLocalTonyProfile({ tonyPhotoUrl: fileOrBase64 });
    }

    // Upload to server
    const res = await api.uploadTonyPhoto(fileOrBase64);
    if (res?.photoUrl) {
      saveLocalTonyProfile({ tonyPhotoUrl: res.photoUrl });
      return res.photoUrl;
    }
    return '/images/tony-de-luc.jpg';
  } catch (err: any) {
    console.error('Erro ao fazer upload da foto:', err);
    throw err;
  }
}
