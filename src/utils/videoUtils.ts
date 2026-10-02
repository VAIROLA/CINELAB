/**
 * Universal video embed and link resolution utility for CINELAB
 */

export interface ParsedVideoEmbed {
  type: 'youtube' | 'vimeo' | 'archive' | 'direct' | 'streaming';
  embedUrl: string;
  directUrl: string;
  externalWatchUrl: string;
  platformLabel: string;
  isEmbeddable: boolean;
}

export function parseVideoEmbed(rawUrl?: string, subLang?: string): ParsedVideoEmbed | null {
  if (!rawUrl) return null;
  const trimmed = rawUrl.trim();
  if (!trimmed) return null;

  // Commercial streaming detection (Prime Video, Apple TV, JustWatch, Netflix, Mubi, etc.)
  if (
    /(?:primevideo\.com|netflix\.com|apple\.com|justwatch\.com|mubi\.com|max\.com|hbomax\.com|disneyplus\.com|globoplay\.globo\.com)/i.test(
      trimmed
    )
  ) {
    let platformLabel = 'Streaming Oficial';
    if (trimmed.includes('primevideo')) platformLabel = 'Prime Video';
    else if (trimmed.includes('apple.com')) platformLabel = 'Apple TV';
    else if (trimmed.includes('justwatch')) platformLabel = 'JustWatch';
    else if (trimmed.includes('netflix')) platformLabel = 'Netflix';
    else if (trimmed.includes('mubi')) platformLabel = 'MUBI';

    return {
      type: 'streaming',
      embedUrl: '',
      directUrl: trimmed,
      externalWatchUrl: trimmed,
      platformLabel,
      isEmbeddable: false,
    };
  }

  // Direct video file extensions check (even if from archive.org or other hosts)
  if (/\.(mp4|webm|ogg|mov|m4v)(\?.*)?$/i.test(trimmed) || trimmed.includes('/download/')) {
    return {
      type: 'direct',
      embedUrl: trimmed,
      directUrl: trimmed,
      externalWatchUrl: trimmed,
      platformLabel: 'Vídeo Digital (MP4/WebM)',
      isEmbeddable: true,
    };
  }

  // 1. YouTube (Supports watch?v=, youtu.be/, /embed/, youtube-nocookie.com, /shorts/, /v/)
  const ytMatch = trimmed.match(
    /(?:(?:youtube\.com|youtube-nocookie\.com)\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?|shorts)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/i
  );
  if (ytMatch && ytMatch[1]) {
    const videoId = ytMatch[1];
    const ccParam = subLang && subLang !== 'off'
      ? `&cc_load_policy=1&cc_lang_pref=${subLang}&hl=${subLang}`
      : '';
    return {
      type: 'youtube',
      embedUrl: `https://www.youtube-nocookie.com/embed/${videoId}?rel=0&playsinline=1${ccParam}`,
      directUrl: trimmed,
      externalWatchUrl: `https://www.youtube.com/watch?v=${videoId}`,
      platformLabel: 'YouTube HD',
      isEmbeddable: true,
    };
  }

  // 2. Vimeo (Supports vimeo.com/ID, player.vimeo.com/video/ID)
  const vimeoMatch = trimmed.match(
    /(?:vimeo\.com\/(?:channels\/(?:\w+\/)?|groups\/(?:[^\/]*)\/videos\/|album\/(?:\d+)\/video\/|video\/|)|player\.vimeo\.com\/video\/)(\d+)/i
  );
  if (vimeoMatch && vimeoMatch[1]) {
    const videoId = vimeoMatch[1];
    return {
      type: 'vimeo',
      embedUrl: `https://player.vimeo.com/video/${videoId}?title=0&byline=0&portrait=0`,
      directUrl: trimmed,
      externalWatchUrl: `https://vimeo.com/${videoId}`,
      platformLabel: 'Vimeo HD',
      isEmbeddable: true,
    };
  }

  // 3. Archive.org (Supports archive.org/embed/ID, archive.org/details/ID)
  const archiveMatch = trimmed.match(/archive\.org\/(?:details|embed)\/([^\/?#\s]+)/i);
  if (archiveMatch && archiveMatch[1]) {
    const archiveId = archiveMatch[1];
    return {
      type: 'archive',
      embedUrl: `https://archive.org/embed/${archiveId}`,
      directUrl: trimmed,
      externalWatchUrl: `https://archive.org/details/${archiveId}`,
      platformLabel: 'Archive.org',
      isEmbeddable: true,
    };
  }

  // 4. Fallback direct
  return {
    type: 'direct',
    embedUrl: trimmed,
    directUrl: trimmed,
    externalWatchUrl: trimmed,
    platformLabel: 'Arquivo de Vídeo',
    isEmbeddable: true,
  };
}
