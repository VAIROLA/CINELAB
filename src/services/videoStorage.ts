/**
 * Permanent IndexedDB media storage for CINELAB
 * Stores large binary video blobs (MP4/WebM) directly in the browser
 * so files survive server container cold restarts and browser reloads.
 */

const DB_NAME = 'cinelab_local_media_v1';
const DB_VERSION = 1;
const STORE_NAME = 'welcome_media';
const WELCOME_KEY = 'welcome_video_entry';

export interface StoredWelcomeVideo {
  id: string;
  blob: Blob;
  fileName: string;
  fileSize: number;
  mimeType: string;
  serverUrl?: string;
  posterUrl?: string;
  updatedAt: number;
}

function openMediaDb(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined' || !window.indexedDB) {
      return reject(new Error('IndexedDB not supported in this environment'));
    }

    const request = window.indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'id' });
      }
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error || new Error('Failed to open IndexedDB'));
  });
}

/**
 * Stores a video Blob permanently in client-side IndexedDB
 */
export async function saveWelcomeVideoToIndexedDB(
  blob: Blob,
  meta: { fileName: string; serverUrl?: string; posterUrl?: string }
): Promise<void> {
  try {
    const db = await openMediaDb();
    const entry: StoredWelcomeVideo = {
      id: WELCOME_KEY,
      blob,
      fileName: meta.fileName,
      fileSize: blob.size,
      mimeType: blob.type || 'video/mp4',
      serverUrl: meta.serverUrl,
      posterUrl: meta.posterUrl,
      updatedAt: Date.now(),
    };

    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readwrite');
      const store = tx.objectStore(STORE_NAME);
      const req = store.put(entry);

      req.onsuccess = () => resolve();
      req.onerror = () => reject(req.error || new Error('Failed to save video to IndexedDB'));
      tx.oncomplete = () => db.close();
    });
  } catch (err) {
    console.warn('[VideoStorage] Could not save to IndexedDB:', err);
  }
}

/**
 * Retrieves the permanently stored video Blob from IndexedDB
 */
export async function getWelcomeVideoFromIndexedDB(): Promise<StoredWelcomeVideo | null> {
  try {
    const db = await openMediaDb();
    return new Promise((resolve) => {
      const tx = db.transaction(STORE_NAME, 'readonly');
      const store = tx.objectStore(STORE_NAME);
      const req = store.get(WELCOME_KEY);

      req.onsuccess = () => {
        resolve(req.result || null);
      };
      req.onerror = () => {
        resolve(null);
      };
      tx.oncomplete = () => db.close();
    });
  } catch {
    return null;
  }
}

/**
 * Removes the stored video Blob from IndexedDB (only on explicit user removal)
 */
export async function deleteWelcomeVideoFromIndexedDB(): Promise<void> {
  try {
    const db = await openMediaDb();
    return new Promise((resolve) => {
      const tx = db.transaction(STORE_NAME, 'readwrite');
      const store = tx.objectStore(STORE_NAME);
      const req = store.delete(WELCOME_KEY);

      req.onsuccess = () => resolve();
      req.onerror = () => resolve();
      tx.oncomplete = () => db.close();
    });
  } catch {
    // ignore
  }
}
