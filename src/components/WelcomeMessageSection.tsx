import React, { useState, useRef, useEffect } from 'react';
import {
  Play,
  Pause,
  Upload,
  Video,
  Film,
  HeartHandshake,
  ArrowRight,
  User as UserIcon,
  CheckCircle2,
  AlertCircle,
  X,
  Link as LinkIcon,
  Trash2,
  Edit3,
  Sparkles,
  ExternalLink,
  Download,
  Image as ImageIcon,
  Loader2,
  Volume2,
  VolumeX,
  Maximize2,
} from 'lucide-react';
import { CourseSettings } from '../types/index.js';
import { api } from '../services/api.js';
import { useLanguage } from '../i18n/LanguageContext.js';
import { parseVideoEmbed } from '../utils/videoUtils.js';
import {
  getLocalWelcomeVideoBackup,
  saveLocalWelcomeVideoBackup,
} from '../services/tonyPersistence.js';
import {
  getWelcomeVideoFromIndexedDB,
  saveWelcomeVideoToIndexedDB,
  deleteWelcomeVideoFromIndexedDB,
} from '../services/videoStorage.js';

interface WelcomeMessageSectionProps {
  settings?: CourseSettings | null;
  onNavigate: (route: string) => void;
  isAdmin?: boolean;
  onSettingsUpdated?: (newSettings: CourseSettings) => void;
}

export const WelcomeMessageSection: React.FC<WelcomeMessageSectionProps> = ({
  settings,
  onNavigate,
  isAdmin = false,
  onSettingsUpdated,
}) => {
  const { t, language } = useLanguage();
  const directorName = settings?.tonyName || settings?.directorName || 'Professor Cineasta Tony de Luc';
  
  const defaultRoles = {
    pt: 'Diretor Geral & Fundador do CINELAB',
    en: 'General Director & Founder of CINELAB',
    es: 'Director General y Fundador de CINELAB',
    fr: 'Directeur Général & Fondateur de CINELAB',
  };
  const directorRole = settings?.tonyRole || settings?.directorRole || defaultRoles[language] || defaultRoles.pt;
  
  const photoUrl =
    settings?.tonyPhotoUrl ||
    '/images/tony-de-luc.jpg';
  const localBackup = typeof window !== 'undefined' ? getLocalWelcomeVideoBackup() : null;
  const videoPoster =
    settings?.welcomeVideoPoster ||
    localBackup?.poster ||
    '/uploads/images/img-LOCO_CINELAB___COLE-1790299254778-824285.png';
  const videoUrl =
    settings?.welcomeVideoUrl && settings.welcomeVideoUrl.trim() !== ''
      ? settings.welcomeVideoUrl
      : localBackup?.url || '/uploads/videos/aula-CINELAB_INTRODU__O-1790768528604-650605.mp4';

  useEffect(() => {
    if (settings?.welcomeVideoUrl && settings.welcomeVideoUrl.trim() !== '') {
      saveLocalWelcomeVideoBackup(settings.welcomeVideoUrl, settings.welcomeVideoPoster);
    }
  }, [settings?.welcomeVideoUrl]);

  const localizedTitles = {
    pt: 'Mensagem de Boas-Vindas aos Novos Alunos',
    en: 'Welcome Message to New Students',
    es: 'Mensaje de Bienvenida a los Nuevos Alumnos',
    fr: 'Message de Bienvenue aux Nouveaux Étudiants',
  };
  const messageTitle = settings?.welcomeMessageTitle && settings.welcomeMessageTitle !== 'Mensagem de Boas-Vindas aos Novos Alunos'
    ? settings.welcomeMessageTitle
    : (localizedTitles[language] || localizedTitles.pt);

  const localizedDefaultTexts = {
    pt: `Caro estudante e futuro realizador,\n\nQuando idealizei o CINELAB, meu objetivo não foi criar mais um curso com aulas teóricas genéricas que você pode encontrar em qualquer canto da internet. Minha obsessão foi estruturar um laboratório de formação autêntica, onde cada etapa coloca você frente a frente com a realidade artística, técnica e estética da indústria cinematográfica.\n\nNós estudamos o plano não como um conceito estático, mas como a menor unidade dramática da narrativa. Nós formatamos o roteiro não por burocracia, mas para que a equipe inteira consiga visualizar a luz, o som e o silêncio que o filme pede. E em cada uma das 10 etapas, minha equipe e eu estaremos acompanhando seu progresso, avaliando suas respostas e orientando seus exercícios.\n\nSe você carrega a urgência de contar histórias e quer dominar a gramática do cinema com rigor, seja muito bem-vindo ao CINELAB.`,
    en: `Dear student and future filmmaker,\n\nWhen I conceived CINELAB, my goal was not to build just another course filled with generic theory you could find anywhere online. My obsession was to structure an authentic training laboratory, where every stage places you face-to-face with the artistic, technical, and aesthetic reality of filmmaking.\n\nWe study the shot not as a static concept, but as the fundamental dramatic unit of narrative. We format the script not for bureaucracy, but so the entire crew can visualize the light, the sound, and the silence the story demands. And across all 10 stages, my team and I will be closely following your progress, assessing your assignments, and guiding your practical exercises.\n\nIf you carry the burning urge to tell stories and master cinema grammar with genuine rigor, welcome to CINELAB.`,
    es: `Estimado estudiante y futuro realizador,\n\nCuando creé CINELAB, mi objetivo no era diseñar un curso más con teoría genérica accesible en cualquier rincón de internet. Mi obsesión fue estructurar un laboratorio de formación auténtica, donde cada etapa te sitúa cara a cara con la realidad artística, técnica y estética del cine.\n\nEstudiamos el plano no como una definición estática, sino como la unidad dramática fundamental del relato. Formateamos el guion no por burocracia, sino para que todo el equipo visualice la luz, el sonido y el silencio que la historia exige. Y a lo largo de las 10 etapas, mi equipo y yo acompañaremos tu evolución, revisando tus respuestas y orientando tus prácticas.\n\nSi sientes la urgencia de contar historias y deseas dominar el lenguaje del cine con rigor, bienvenido a CINELAB.`,
    fr: `Cher étudiant et futur cinéaste,\n\nLorsque j'ai imaginé CINELAB, mon but n'était pas de créer une énième formation théorique générique trouvable partout sur internet. Mon obsession a été de concevoir un véritable laboratoire de formation, où chaque étape vous confronte aux réalités artistiques, techniques et esthétiques de l'industrie cinématographique.\n\nNous étudions le plan non pas comme un concept théorique figé, mais comme la cellule dramatique première du récit. Nous rédigeons le scénario non par formalisme, mais pour que l'équipe entière visualise la lumière, le son et le silence voulus par l'histoire. Et tout au long des 10 étapes, mon équipe et moi-même suivrons vos progrès et guiderons vos exercices pratiques.\n\nSi vous portez l'urgence de raconter des histoires et souhaitez maîtriser la grammaire du cinéma avec rigueur, soyez le bienvenu à CINELAB.`,
  };

  const isCustomMessage = settings?.welcomeMessageText && !settings.welcomeMessageText.includes('Quando idealizei o CINELAB');
  const messageText = isCustomMessage ? settings!.welcomeMessageText! : (localizedDefaultTexts[language] || localizedDefaultTexts.pt);

  // Modal State for Video Upload
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [uploadTab, setUploadTab] = useState<'file' | 'link' | 'poster'>('file');
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [urlInput, setUrlInput] = useState(videoUrl);
  const [posterUrlInput, setPosterUrlInput] = useState(videoPoster);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadProgressDetails, setUploadProgressDetails] = useState('');
  const [posterUploading, setPosterUploading] = useState(false);
  const [posterProgress, setPosterProgress] = useState(0);
  const [statusMessage, setStatusMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [modalDragOver, setModalDragOver] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const posterFileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isBuffering, setIsBuffering] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [isMutedNotice, setIsMutedNotice] = useState(false);
  const [videoLoadError, setVideoLoadError] = useState(false);
  const [indexedDbBlobUrl, setIndexedDbBlobUrl] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    getWelcomeVideoFromIndexedDB().then((entry) => {
      if (active && entry && entry.blob) {
        try {
          const blobUrl = URL.createObjectURL(entry.blob);
          setIndexedDbBlobUrl(blobUrl);
        } catch {}
      }
    });
    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    setVideoLoadError(false);
    setHasStarted(false);
    setIsPlaying(false);
    setIsBuffering(false);
  }, [videoUrl]);

  const handleUploadPoster = async (file: File) => {
    if (!file) return;
    const isImage = file.type.startsWith('image/') || /\.(jpe?g|png|webp|svg|gif|avif|bmp)$/i.test(file.name);
    if (!isImage) {
      setStatusMessage({ type: 'error', text: 'Selecione um arquivo de imagem válido (JPG, PNG, WebP).' });
      return;
    }

    try {
      setPosterUploading(true);
      setPosterProgress(0);
      setStatusMessage(null);

      const res = await api.uploadImageFile(file, (pct) => setPosterProgress(pct));
      if (res && res.fileUrl) {
        setPosterUrlInput(res.fileUrl);
        const updated = await api.updateAdminSettings({
          settings: {
            welcomeVideoPoster: res.fileUrl,
          },
        });
        setStatusMessage({ type: 'success', text: 'Capa do vídeo atualizada e salva com sucesso!' });
        if (onSettingsUpdated && updated.settings) {
          onSettingsUpdated(updated.settings);
        }
      }
    } catch (err: any) {
      setStatusMessage({ type: 'error', text: err.message || 'Erro ao subir imagem de capa.' });
    } finally {
      setPosterUploading(false);
      setPosterProgress(0);
    }
  };

  const handleSavePosterUrl = async () => {
    if (!posterUrlInput.trim()) return;
    try {
      setPosterUploading(true);
      setStatusMessage(null);
      const updated = await api.updateAdminSettings({
        settings: {
          welcomeVideoPoster: posterUrlInput.trim(),
        },
      });
      setStatusMessage({ type: 'success', text: 'Capa do vídeo atualizada com sucesso!' });
      if (onSettingsUpdated && updated.settings) {
        onSettingsUpdated(updated.settings);
      }
    } catch (err: any) {
      setStatusMessage({ type: 'error', text: err.message || 'Erro ao salvar capa.' });
    } finally {
      setPosterUploading(false);
    }
  };

  const handleTogglePlay = async () => {
    if (!videoRef.current) return;

    // Immediately dismiss the overlay so native controls and video are directly accessible
    setHasStarted(true);

    if (videoRef.current.paused) {
      setIsBuffering(true);

      try {
        await videoRef.current.play();
        setIsPlaying(true);
        setIsBuffering(false);
      } catch (err: any) {
        console.warn('Playback notice, attempting muted playback:', err?.message || String(err));
        try {
          if (videoRef.current) {
            videoRef.current.muted = true;
            await videoRef.current.play();
            setIsPlaying(true);
            setIsBuffering(false);
            setIsMutedNotice(true);
          }
        } catch {
          setIsBuffering(false);
        }
      }
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const handleUnmute = () => {
    if (videoRef.current) {
      videoRef.current.muted = false;
      setIsMutedNotice(false);
    }
  };

  const handleFullscreen = () => {
    if (!videoRef.current) return;
    if (videoRef.current.requestFullscreen) {
      videoRef.current.requestFullscreen();
    } else if ((videoRef.current as any).webkitRequestFullscreen) {
      (videoRef.current as any).webkitRequestFullscreen();
    }
  };

  const embedInfo = parseVideoEmbed(videoUrl);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('video/') && !/\.(mp4|webm|mov|mkv|avi|m4v|wmv|flv|ts|3gp)$/i.test(file.name)) {
        setStatusMessage({ type: 'error', text: 'Selecione um arquivo de vídeo válido (MP4, WebM, MOV, MKV).' });
        return;
      }
      setVideoFile(file);
      setStatusMessage(null);
    }
    e.target.value = '';
  };

  const handleUploadFile = async () => {
    if (!videoFile) return;

    const fileSizeMb = (videoFile.size / (1024 * 1024)).toFixed(1);

    try {
      setUploading(true);
      setUploadProgress(2);
      setUploadProgressDetails(`Iniciando envio acelerado (${fileSizeMb} MB)...`);
      setStatusMessage(null);

      const res = await api.uploadVideoFile(videoFile, {
        title: 'Vídeo de Boas-Vindas aos Novos Alunos',
        description: 'Apresentação institucional e boas-vindas do Professor Cineasta Tony de Luc.',
        isWelcomeVideo: true,
        onProgress: (pct, details) => {
          setUploadProgress(pct);
          if (details) {
            const mbUploaded = (details.uploadedBytes / (1024 * 1024)).toFixed(1);
            const mbTotal = (details.totalBytes / (1024 * 1024)).toFixed(1);
            setUploadProgressDetails(
              `Parte ${details.currentChunk} de ${details.totalChunks} (${mbUploaded} MB de ${mbTotal} MB) • ${pct}%`
            );
          } else {
            setUploadProgressDetails(`Enviando vídeo (${fileSizeMb} MB): ${pct}% concluído...`);
          }
        },
      });

      if (res && res.fileUrl) {
        // Save to browser IndexedDB for permanent survival across reloads and cold restarts
        try {
          await saveWelcomeVideoToIndexedDB(videoFile, {
            fileName: videoFile.name,
            serverUrl: res.fileUrl,
            posterUrl: settings?.welcomeVideoPoster || '/images/cinelab-cover.jpg',
          });
          const newBlobUrl = URL.createObjectURL(videoFile);
          setIndexedDbBlobUrl(newBlobUrl);
        } catch (idbErr) {
          console.warn('[WelcomeVideo] IndexedDB save notice:', idbErr);
        }

        saveLocalWelcomeVideoBackup(res.fileUrl, settings?.welcomeVideoPoster);
        // Save into course settings
        const updated = await api.updateAdminSettings({
          settings: {
            welcomeVideoUrl: res.fileUrl,
            welcomeVideoPoster: settings?.welcomeVideoPoster || '/images/cinelab-cover.jpg',
          },
        });

        setVideoLoadError(false);
        setStatusMessage({ type: 'success', text: `Vídeo de boas-vindas (${fileSizeMb} MB) enviado e publicado com sucesso!` });
        if (onSettingsUpdated && updated.settings) {
          onSettingsUpdated(updated.settings);
        }
        setTimeout(() => {
          setShowUploadModal(false);
          setVideoFile(null);
          setStatusMessage(null);
          setUploadProgressDetails('');
        }, 1200);
      }
    } catch (err: any) {
      setStatusMessage({ type: 'error', text: err.message || 'Erro ao enviar o vídeo.' });
    } finally {
      setUploading(false);
    }
  };

  const handleSaveUrl = async () => {
    if (!urlInput.trim()) {
      setStatusMessage({ type: 'error', text: 'Insira uma URL válida do vídeo.' });
      return;
    }

    try {
      setUploading(true);
      setStatusMessage(null);
      saveLocalWelcomeVideoBackup(urlInput.trim(), settings?.welcomeVideoPoster);

      const updated = await api.updateAdminSettings({
        settings: {
          welcomeVideoUrl: urlInput.trim(),
          welcomeVideoPoster: settings?.welcomeVideoPoster || '/images/cinelab-cover.jpg',
        },
      });

      setVideoLoadError(false);
      setStatusMessage({ type: 'success', text: 'Link do vídeo salvo com sucesso!' });
      if (onSettingsUpdated && updated.settings) {
        onSettingsUpdated(updated.settings);
      }
      setTimeout(() => {
        setShowUploadModal(false);
        setStatusMessage(null);
      }, 1000);
    } catch (err: any) {
      setStatusMessage({ type: 'error', text: err.message || 'Erro ao salvar o link do vídeo.' });
    } finally {
      setUploading(false);
    }
  };

  const handleRemoveVideo = async () => {
    const confirmed = window.confirm(
      'Atenção: O vídeo de boas-vindas só será removido se você confirmar. Deseja realmente remover o vídeo da página inicial?'
    );
    if (!confirmed) return;

    try {
      setUploading(true);
      const updated = await api.updateAdminSettings({
        settings: {
          welcomeVideoUrl: '',
        },
        explicitRemoveWelcomeVideo: true,
      } as any);
      setUrlInput('');
      setVideoLoadError(false);
      setHasStarted(false);
      setIsPlaying(false);
      try {
        localStorage.removeItem('cinelab_welcome_video_permanent_url');
        await deleteWelcomeVideoFromIndexedDB();
        setIndexedDbBlobUrl(null);
      } catch {}
      setStatusMessage({ type: 'success', text: 'Vídeo removido com sucesso!' });
      if (onSettingsUpdated && updated.settings) {
        onSettingsUpdated(updated.settings);
      }
      setTimeout(() => {
        setShowUploadModal(false);
        setStatusMessage(null);
      }, 800);
    } catch (err: any) {
      setStatusMessage({ type: 'error', text: err.message || 'Erro ao remover o vídeo.' });
    } finally {
      setUploading(false);
    }
  };

  const ui = {
    pt: {
      badge: 'Boas-Vindas do Diretor Geral',
      subtitle: `Uma palavra de acolhimento e compromisso do ${directorName} para os novos alunos e realizadores do CINELAB.`,
      meetTony: 'Conhecer o Professor Tony',
      videoBadge: 'VÍDEO DE BOAS-VINDAS • CINELAB',
      videoPlaceholderTitle: 'Vídeo de Apresentação do Professor',
      videoPlaceholderDesc: 'Assista à mensagem oficial em vídeo gravada pelo Diretor Tony de Luc apresentando a dinâmica do laboratório.',
      videoOfficialTag: 'Apresentação Oficial do Curso',
      subRole: 'Fundador e Responsável Pedagógico do CINELAB',
      sigRole: 'Diretor Geral & Cineasta',
      enrollBtn: 'Fazer Minha Matrícula',
      methodologyBtn: 'Conhecer Metodologia',
      stagesPill: '• 10 Etapas com Dias Contados (90 Dias) • Masterclasses em Vídeo • Certificação 180h',
      availableAll: 'Disponível para todos os inscritos',
      uploadBtnChange: 'Alterar / Subir Vídeo',
      uploadBtnNew: 'Subir Vídeo de Boas-Vindas',
      modalTitle: 'Configurar Vídeo de Boas-Vindas',
      modalSubtitle: 'O vídeo será exibido em destaque na página inicial do CINELAB.',
      tabUpload: 'Subir Arquivo do Computador',
      tabLink: 'Link do YouTube / Vimeo / MP4',
      dropTitle: 'Clique para selecionar o vídeo do computador',
      dropFormats: 'Formatos aceitos: MP4, MOV, WebM (alta definição).',
      sizeLabel: 'Tamanho:',
      sendingVideo: 'Enviando vídeo para o servidor...',
      cancel: 'Cancelar',
      savePublish: 'Salvar e Publicar Vídeo',
      uploadingPct: 'Subindo',
      urlLabel: 'URL do Vídeo (YouTube, Vimeo ou Link Direto MP4)',
      urlExamples: 'Exemplos: Links do YouTube, Vimeo ou link direto .mp4 hospedado na nuvem.',
      saveLink: 'Salvar Link',
      activeOnHome: 'Vídeo atualmente ativo na Home',
      removeVideo: 'Remover Vídeo da Home',
      confirmRemove: 'Deseja realmente remover o vídeo de boas-vindas da página inicial?',
    },
    en: {
      badge: 'Welcome from the General Director',
      subtitle: `A welcoming statement and pedagogical commitment from ${directorName} for all new CINELAB filmmakers.`,
      meetTony: 'Meet Professor Tony',
      videoBadge: 'WELCOME VIDEO • CINELAB',
      videoPlaceholderTitle: 'Director Presentation Video',
      videoPlaceholderDesc: 'Watch the official video message recorded by Director Tony de Luc introducing the creative lab dynamic.',
      videoOfficialTag: 'Official Course Introduction',
      subRole: 'Founder & Pedagogical Head of CINELAB',
      sigRole: 'General Director & Filmmaker',
      enrollBtn: 'Complete My Enrollment',
      methodologyBtn: 'Explore Methodology',
      stagesPill: '• 10 Counted-Day Stages (90 Days) • Video Masterclasses • 180h Certificate',
      availableAll: 'Available for all enrolled students',
      uploadBtnChange: 'Change / Upload Video',
      uploadBtnNew: 'Upload Welcome Video',
      modalTitle: 'Configure Welcome Video',
      modalSubtitle: 'The video will be highlighted on CINELAB\'s home page.',
      tabUpload: 'Upload File from PC',
      tabLink: 'YouTube / Vimeo / MP4 Link',
      dropTitle: 'Click to select video from computer',
      dropFormats: 'Accepted formats: MP4, MOV, WebM (HD).',
      sizeLabel: 'Size:',
      sendingVideo: 'Uploading video to server...',
      cancel: 'Cancel',
      savePublish: 'Save and Publish Video',
      uploadingPct: 'Uploading',
      urlLabel: 'Video URL (YouTube, Vimeo or Direct MP4 Link)',
      urlExamples: 'Examples: YouTube, Vimeo or direct .mp4 cloud link.',
      saveLink: 'Save Link',
      activeOnHome: 'Video currently active on Home',
      removeVideo: 'Remove Video from Home',
      confirmRemove: 'Are you sure you want to remove the welcome video from the home page?',
    },
    es: {
      badge: 'Bienvenida del Director General',
      subtitle: `Unas palabras de bienvenida y compromiso de ${directorName} para los nuevos alumnos y cineastas de CINELAB.`,
      meetTony: 'Conocer al Profesor Tony',
      videoBadge: 'VIDEO DE BIENVENIDA • CINELAB',
      videoPlaceholderTitle: 'Video de Presentación del Profesor',
      videoPlaceholderDesc: 'Mira el mensaje oficial grabado por el Director Tony de Luc presentando la dinámica del laboratorio.',
      videoOfficialTag: 'Presentación Oficial del Curso',
      subRole: 'Fundador y Responsable Pedagógico de CINELAB',
      sigRole: 'Director General y Cineasta',
      enrollBtn: 'Hacer Mi Matrícula',
      methodologyBtn: 'Conocer Metodología',
      stagesPill: '• 10 Etapas con Días Contados (90 Días) • Masterclasses en Video • Certificado 180h',
      availableAll: 'Disponible para todos los matriculados',
      uploadBtnChange: 'Cambiar / Subir Video',
      uploadBtnNew: 'Subir Video de Bienvenida',
      modalTitle: 'Configurar Video de Bienvenida',
      modalSubtitle: 'El video se mostrará destacado en la página de inicio.',
      tabUpload: 'Subir Archivo de la PC',
      tabLink: 'Enlace de YouTube / Vimeo / MP4',
      dropTitle: 'Haz clic para seleccionar el video',
      dropFormats: 'Formatos aceptados: MP4, MOV, WebM (HD).',
      sizeLabel: 'Tamaño:',
      sendingVideo: 'Subiendo video al servidor...',
      cancel: 'Cancelar',
      savePublish: 'Guardar y Publicar Video',
      uploadingPct: 'Subiendo',
      urlLabel: 'URL del Video (YouTube, Vimeo o Enlace Directo MP4)',
      urlExamples: 'Ejemplos: Enlaces de YouTube, Vimeo o enlace directo .mp4.',
      saveLink: 'Guardar Enlace',
      activeOnHome: 'Video actualmente activo en la Home',
      removeVideo: 'Eliminar Video de la Home',
      confirmRemove: '¿Deseas realmente eliminar el video de bienvenida?',
    },
    fr: {
      badge: 'Bienvenue du Directeur Général',
      subtitle: `Un mot d'accueil et d'engagement de ${directorName} pour les nouveaux étudiants et réalisateurs de CINELAB.`,
      meetTony: 'Découvrir le Professeur Tony',
      videoBadge: 'VIDÉO DE BIENVENUE • CINELAB',
      videoPlaceholderTitle: 'Vidéo de Présentation du Professeur',
      videoPlaceholderDesc: 'Visionnez le message officiel enregistré par le Directeur Tony de Luc présentant la dynamique du laboratoire.',
      videoOfficialTag: 'Présentation Officielle de la Formation',
      subRole: 'Fondateur et Responsable Pédagogique de CINELAB',
      sigRole: 'Directeur Général & Cinéaste',
      enrollBtn: 'M\'Inscrire Maintenant',
      methodologyBtn: 'Découvrir la Méthodologie',
      stagesPill: '• 10 Étapes à Jours Comptés (90 Jours) • Masterclasses Vidéo • Certificat 180h',
      availableAll: 'Accessible à tous les étudiants inscrits',
      uploadBtnChange: 'Modifier / Téléverser la Vidéo',
      uploadBtnNew: 'Téléverser Vidéo de Bienvenue',
      modalTitle: 'Configurer la Vidéo de Bienvenue',
      modalSubtitle: 'La vidéo sera mise en avant sur la page d\'accueil.',
      tabUpload: 'Téléverser Fichier du PC',
      tabLink: 'Lien YouTube / Vimeo / MP4',
      dropTitle: 'Cliquez pour sélectionner la vidéo',
      dropFormats: 'Formats acceptés : MP4, MOV, WebM (HD).',
      sizeLabel: 'Taille :',
      sendingVideo: 'Téléversement de la vidéo vers le serveur...',
      cancel: 'Annuler',
      savePublish: 'Enregistrer et Publier la Vidéo',
      uploadingPct: 'Téléversement',
      urlLabel: 'URL de la Vidéo (YouTube, Vimeo ou Lien Direct MP4)',
      urlExamples: 'Exemples : Liens YouTube, Vimeo ou lien direct .mp4 en ligne.',
      saveLink: 'Enregistrer le Lien',
      activeOnHome: 'Vidéo actuellement active sur l\'Accueil',
      removeVideo: 'Supprimer la Vidéo de l\'Accueil',
      confirmRemove: 'Voulez-vous vraiment supprimer la vidéo de bienvenue ?',
    },
  }[language] || {
    badge: 'Boas-Vindas do Diretor Geral',
    subtitle: `Uma palavra de acolhimento e compromisso do ${directorName} para os novos alunos e realizadores do CINELAB.`,
    meetTony: 'Conhecer o Professor Tony',
    videoBadge: 'VÍDEO DE BOAS-VINDAS • CINELAB',
    videoPlaceholderTitle: 'Vídeo de Apresentação do Professor',
    videoPlaceholderDesc: 'Assista à mensagem oficial em vídeo gravada pelo Diretor Tony de Luc apresentando a dinâmica do laboratório.',
    videoOfficialTag: 'Apresentação Oficial do Curso',
    subRole: 'Fundador e Responsável Pedagógico do CINELAB',
    sigRole: 'Diretor Geral & Cineasta',
    enrollBtn: 'Fazer Minha Matrícula',
    methodologyBtn: 'Conhecer Metodologia',
    stagesPill: '• 10 Etapas com Dias Contados (90 Dias) • Masterclasses em Vídeo • Certificação 180h',
    availableAll: 'Disponível para todos os inscritos',
    uploadBtnChange: 'Alterar / Subir Vídeo',
    uploadBtnNew: 'Subir Vídeo de Boas-Vindas',
    modalTitle: 'Configurar Vídeo de Boas-Vindas',
    modalSubtitle: 'O vídeo será exibido em destaque na página inicial do CINELAB.',
    tabUpload: 'Subir Arquivo do Computador',
    tabLink: 'Link do YouTube / Vimeo / MP4',
    dropTitle: 'Clique para selecionar o vídeo do computador',
    dropFormats: 'Formatos aceitos: MP4, MOV, WebM (alta definição).',
    sizeLabel: 'Tamanho:',
    sendingVideo: 'Enviando vídeo para o servidor...',
    cancel: 'Cancelar',
    savePublish: 'Salvar e Publicar Vídeo',
    uploadingPct: 'Subindo',
    urlLabel: 'URL do Vídeo (YouTube, Vimeo ou Link Direto MP4)',
    urlExamples: 'Exemplos: Links do YouTube, Vimeo ou link direto .mp4 hospedado na nuvem.',
    saveLink: 'Salvar Link',
    activeOnHome: 'Vídeo atualmente ativo na Home',
    removeVideo: 'Remover Vídeo da Home',
    confirmRemove: 'Deseja realmente remover o vídeo de boas-vindas da página inicial?',
  };

  return (
    <section className="py-16 sm:py-20 bg-gradient-to-b from-[#0a0b0e] via-[#0d0e12] to-[#07080a] border-b border-neutral-800 relative overflow-hidden" id="boas-vindas">
      {/* Cinematic subtle light accents */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 bg-amber-500/5 blur-[120px] pointer-events-none rounded-full" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-amber-600/5 blur-[100px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10 pb-6 border-b border-neutral-800/80">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-mono uppercase tracking-wider mb-2 font-medium">
              <Sparkles className="w-3.5 h-3.5" /> {ui.badge}
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-display font-bold text-white tracking-tight">
              {messageTitle}
            </h2>
            <p className="text-xs sm:text-sm text-neutral-400 mt-1 max-w-2xl">
              {ui.subtitle}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {isAdmin && (
              <button
                onClick={() => setShowUploadModal(true)}
                className="px-4 py-2 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/40 text-amber-300 hover:text-amber-200 text-xs font-mono font-bold flex items-center gap-2 transition-all cursor-pointer shadow-md"
                id="btn-subir-video-boas-vindas-home"
              >
                <Upload className="w-3.5 h-3.5 text-amber-400" />
                <span>{videoUrl ? ui.uploadBtnChange : ui.uploadBtnNew}</span>
              </button>
            )}

            <button
              onClick={() => onNavigate('tony-de-luc')}
              className="px-3.5 py-2 rounded-xl bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 text-neutral-300 hover:text-white text-xs font-mono flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <UserIcon className="w-3.5 h-3.5 text-amber-400" />
              <span>{ui.meetTony}</span>
            </button>
          </div>
        </div>

        {/* Main Grid: Video Player on Left, Letter on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          
          {/* COLUMN 1: VÍDEO DE BOAS-VINDAS */}
          <div className="lg:col-span-6 space-y-4">
            <div className="relative group rounded-3xl overflow-hidden bg-neutral-950 border border-amber-500/30 shadow-2xl">
              {/* Badge Over Video */}
              <div className="absolute top-3 left-3 z-20 flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-950/80 backdrop-blur-md border border-neutral-700 text-[11px] font-mono text-amber-300 pointer-events-none">
                <Film className="w-3 h-3 text-amber-400" />
                <span>{ui.videoBadge}</span>
              </div>

              {/* Video Content */}
              <div className="relative aspect-video bg-black flex items-center justify-center group/player overflow-hidden">
                {videoUrl && embedInfo ? (
                  embedInfo.type === 'youtube' || embedInfo.type === 'vimeo' || embedInfo.type === 'archive' ? (
                    <iframe
                      src={embedInfo.embedUrl}
                      title="Vídeo de Boas-Vindas - Professor Tony de Luc"
                      className="w-full h-full border-0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      referrerPolicy="strict-origin-when-cross-origin"
                      allowFullScreen
                    />
                  ) : (
                    <div className="relative w-full h-full flex items-center justify-center bg-black">
                      <video
                        ref={videoRef}
                        key={videoUrl}
                        controls
                        playsInline
                        preload="metadata"
                        poster={videoPoster || '/images/cinelab-cover.jpg'}
                        className="w-full h-full object-contain bg-black"
                        onPlay={() => {
                          setIsPlaying(true);
                          setHasStarted(true);
                        }}
                        onPlaying={() => {
                          setIsPlaying(true);
                          setIsBuffering(false);
                        }}
                        onPause={() => setIsPlaying(false)}
                        onWaiting={() => setIsBuffering(true)}
                        onCanPlay={() => setIsBuffering(false)}
                        onEnded={() => {
                          setIsPlaying(false);
                          setHasStarted(false);
                        }}
                        onVolumeChange={() => {
                          if (videoRef.current && !videoRef.current.muted) {
                            setIsMutedNotice(false);
                          }
                        }}
                        onError={() => {
                          console.warn('Vídeo notice on error, keeping source active.');
                          setIsBuffering(false);
                        }}
                      >
                        <source src={indexedDbBlobUrl || embedInfo.embedUrl || videoUrl} type="video/mp4" />
                        <source src="/videos/cinelab-intro-apresentacao.mp4" type="video/mp4" />
                        Seu navegador não suporta a tag de vídeo nativa.
                      </video>

                      {/* Custom Play Overlay (shown before user initiates playback) */}
                      {!hasStarted && (
                        <div
                          onClick={handleTogglePlay}
                          className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-black/30 hover:bg-black/20 transition-all cursor-pointer group/overlay p-4"
                        >
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleTogglePlay();
                            }}
                            className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-amber-500 group-hover/overlay:bg-amber-400 group-hover/overlay:scale-110 transition-all duration-300 flex items-center justify-center text-neutral-950 shadow-2xl shadow-amber-500/50 ring-4 ring-amber-500/30 ring-offset-2 ring-offset-black/50 cursor-pointer"
                            aria-label="Assistir ao vídeo"
                          >
                            {isBuffering ? (
                              <Loader2 className="w-10 h-10 sm:w-12 sm:h-12 animate-spin text-neutral-950" />
                            ) : (
                              <Play className="w-10 h-10 sm:w-12 sm:h-12 fill-neutral-950 translate-x-1" />
                            )}
                          </button>
                          <div className="mt-4 px-4 py-1.5 rounded-full bg-neutral-950/90 backdrop-blur-md border border-amber-500/50 text-xs sm:text-sm font-bold font-mono text-amber-300 shadow-xl tracking-wide flex items-center gap-2 pointer-events-none">
                            {isBuffering ? (
                              <>
                                <Loader2 className="w-3.5 h-3.5 animate-spin text-amber-400" />
                                <span>INICIANDO VÍDEO...</span>
                              </>
                            ) : (
                              <span>CLIQUE PARA ASSISTIR À APRESENTAÇÃO</span>
                            )}
                          </div>
                        </div>
                      )}

                      {/* Buffering Indicator during active playback */}
                      {hasStarted && isBuffering && (
                        <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/40 pointer-events-none">
                          <div className="flex items-center gap-2.5 px-4 py-2 rounded-xl bg-neutral-950/90 border border-neutral-800 text-amber-400 font-mono text-xs shadow-xl">
                            <Loader2 className="w-4 h-4 animate-spin" />
                            <span>Carregando vídeo...</span>
                          </div>
                        </div>
                      )}

                      {/* Muted Warning Button if audio was initially suppressed by browser */}
                      {isMutedNotice && isPlaying && (
                        <button
                          type="button"
                          onClick={handleUnmute}
                          className="absolute top-12 left-3 z-20 px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-neutral-950 text-xs font-bold font-mono flex items-center gap-2 shadow-lg transition-all animate-bounce cursor-pointer"
                        >
                          <VolumeX className="w-4 h-4" />
                          <span>Clique para Ativar o Áudio</span>
                        </button>
                      )}
                    </div>
                  )
                ) : (
                  /* Placeholder when no video has been uploaded yet or if local file missing */
                  <div className="relative w-full h-full flex flex-col items-center justify-center p-6 text-center bg-gradient-to-br from-neutral-900 via-neutral-950 to-black">
                    <img
                      src={videoPoster || '/images/cinelab-cover.jpg'}
                      alt="CINELAB"
                      className="absolute inset-0 w-full h-full object-cover opacity-60 filter brightness-95"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = '/images/cinelab-cover.jpg';
                      }}
                    />
                    <div className="relative z-10 max-w-sm space-y-3">
                      <div className="w-16 h-16 rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 mx-auto shadow-lg shadow-amber-500/10 group-hover:scale-105 transition-transform">
                        <Play className="w-8 h-8 fill-amber-400 translate-x-0.5" />
                      </div>
                      <div>
                        <h4 className="text-base font-bold text-white font-display">
                          {ui.videoPlaceholderTitle}
                        </h4>
                        <p className="text-xs text-neutral-300 mt-1 leading-relaxed">
                          {ui.videoPlaceholderDesc}
                        </p>
                      </div>

                      {videoLoadError && isAdmin && (
                        <div className="p-2.5 rounded-xl bg-amber-950/90 border border-amber-500/60 text-[11px] text-amber-300 font-mono">
                          Arquivo de vídeo não localizado no disco. Suba novamente ou vincule link do YouTube/Vimeo.
                        </div>
                      )}

                      {isAdmin ? (
                        <button
                          onClick={() => setShowUploadModal(true)}
                          className="mt-2 px-4 py-2 bg-amber-500 hover:bg-amber-400 text-neutral-950 text-xs font-bold font-mono uppercase rounded-xl transition-all cursor-pointer flex items-center gap-2 mx-auto shadow-lg"
                        >
                          <Upload className="w-3.5 h-3.5" />
                          <span>{videoLoadError ? 'Reconfigurar Vídeo' : (videoUrl ? ui.uploadBtnChange : ui.uploadBtnNew)}</span>
                        </button>
                      ) : (
                        <span className="inline-block px-3 py-1 rounded-full bg-neutral-900/90 border border-neutral-800 text-[11px] font-mono text-amber-400">
                          {ui.availableAll}
                        </span>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Bottom bar of video box */}
              <div className="p-4 bg-neutral-900/90 border-t border-neutral-800 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full overflow-hidden border border-amber-500/50 shrink-0">
                    <img
                      src={photoUrl}
                      alt={directorName}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <span className="block text-xs font-bold text-white font-display">
                      {directorName}
                    </span>
                    <span className="block text-[10px] font-mono text-amber-400/90">
                      {ui.videoOfficialTag}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {videoUrl && (
                    <>
                      <button
                        type="button"
                        onClick={handleTogglePlay}
                        className="px-3.5 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-neutral-950 text-xs font-bold font-mono flex items-center gap-1.5 cursor-pointer transition-colors shadow active:scale-95"
                      >
                        {isPlaying ? (
                          <>
                            <Pause className="w-3.5 h-3.5 fill-current" />
                            <span>Pausar</span>
                          </>
                        ) : (
                          <>
                            <Play className="w-3.5 h-3.5 fill-current" />
                            <span>{hasStarted ? 'Continuar' : 'Reproduzir'}</span>
                          </>
                        )}
                      </button>

                      <button
                        type="button"
                        onClick={handleFullscreen}
                        className="px-2.5 py-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-200 hover:text-white text-xs font-mono flex items-center gap-1.5 transition-colors border border-neutral-700 cursor-pointer"
                        title="Assistir em Tela Cheia"
                      >
                        <Maximize2 className="w-3.5 h-3.5 text-amber-400" />
                        <span className="hidden sm:inline">Tela Cheia</span>
                      </button>

                      {isMutedNotice && isPlaying && (
                        <button
                          type="button"
                          onClick={handleUnmute}
                          className="px-2.5 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-neutral-950 text-xs font-mono font-bold flex items-center gap-1.5 transition-colors cursor-pointer shadow"
                          title="Ativar Áudio"
                        >
                          <Volume2 className="w-3.5 h-3.5" />
                          <span>Ativar Som</span>
                        </button>
                      )}
                    </>
                  )}

                  {isAdmin && (
                    <button
                      onClick={() => setShowUploadModal(true)}
                      className="p-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-300 hover:text-amber-300 transition-colors cursor-pointer"
                      title="Editar configurações do vídeo"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            </div>

            <div className="p-3 sm:p-4 rounded-2xl bg-neutral-900/40 border border-neutral-800 text-xs text-neutral-400 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <span className="font-mono text-[11px] text-neutral-300 break-words">
                {ui.stagesPill}
              </span>
              <span className="text-amber-400 font-bold font-mono text-[11px] shrink-0 self-end sm:self-auto">
                CINELAB EAD
              </span>
            </div>
          </div>

          {/* COLUMN 2: CARTA / MENSAGEM DE BOAS-VINDAS */}
          <div className="lg:col-span-6 space-y-6">
            <div className="p-6 sm:p-8 rounded-3xl bg-neutral-900/80 border border-neutral-800 relative space-y-5">
              {/* Top Director Bar */}
              <div className="flex items-center justify-between gap-4 border-b border-neutral-800 pb-4">
                <div className="flex items-center gap-3.5">
                  <div className="w-14 h-14 rounded-2xl overflow-hidden border-2 border-amber-500/60 shadow-md shrink-0">
                    <img
                      src={photoUrl}
                      alt={directorName}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-white font-display">
                      {directorName}
                    </h3>
                    <p className="text-xs font-mono text-amber-400/90">
                      {directorRole}
                    </p>
                    <p className="text-[11px] text-neutral-400 mt-0.5">
                      {ui.subRole}
                    </p>
                  </div>
                </div>
                <HeartHandshake className="w-8 h-8 text-amber-500/80 shrink-0 hidden sm:block" />
              </div>

              {/* Message Body */}
              <div className="space-y-3.5 text-xs sm:text-sm text-neutral-300 leading-relaxed font-sans">
                {messageText.split('\n\n').map((paragraph, idx) => (
                  <p key={idx} className="first:font-medium first:text-amber-200/90">
                    {paragraph}
                  </p>
                ))}
              </div>

              {/* Director Signature & CTAs */}
              <div className="pt-5 border-t border-neutral-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <span className="block text-sm font-bold font-display text-white">
                    {directorName}
                  </span>
                  <span className="block text-[11px] font-mono text-amber-400/90">
                    {ui.sigRole}
                  </span>
                  <span className="block text-[10px] font-mono text-neutral-500">
                    CINELAB • Cinema & Realização Audiovisual
                  </span>
                </div>

                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
                  <button
                    onClick={() => onNavigate('matricula')}
                    className="px-5 py-3 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-neutral-950 font-bold uppercase rounded-xl text-xs transition-all cursor-pointer flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 font-sans active:scale-98"
                    id="btn-boas-vindas-matricula"
                  >
                    <span>{ui.enrollBtn}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* ========================================================================= */}
      {/* MODAL DE UPLOAD / CONFIGURAÇÃO DO VÍDEO DE BOAS-VINDAS (ADMIN)             */}
      {/* ========================================================================= */}
      {showUploadModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
          <div className="bg-neutral-900 border border-neutral-700 rounded-3xl p-6 sm:p-8 max-w-xl w-full shadow-2xl relative space-y-6 max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-neutral-800 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
                  <Video className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white font-display">
                    {ui.modalTitle}
                  </h3>
                  <p className="text-xs text-neutral-400">
                    {ui.modalSubtitle}
                  </p>
                </div>
              </div>
              <button
                onClick={() => {
                  setShowUploadModal(false);
                  setStatusMessage(null);
                }}
                className="w-8 h-8 rounded-full bg-neutral-800 hover:bg-neutral-700 text-neutral-400 hover:text-white flex items-center justify-center cursor-pointer transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Status Message */}
            {statusMessage && (
              <div
                className={`p-3.5 rounded-xl text-xs flex items-center gap-2 ${
                  statusMessage.type === 'success'
                    ? 'bg-emerald-950/60 border border-emerald-800 text-emerald-300'
                    : 'bg-red-950/60 border border-red-800 text-red-300'
                }`}
              >
                {statusMessage.type === 'success' ? (
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                ) : (
                  <AlertCircle className="w-4 h-4 shrink-0" />
                )}
                <span>{statusMessage.text}</span>
              </div>
            )}

            {/* Banner de Garantia de Permanência */}
            <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-start gap-3 text-xs">
              <Sparkles className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <div className="space-y-0.5 font-sans">
                <span className="font-bold text-amber-300 block">
                  Garantia de Permanência Ativa
                </span>
                <p className="text-neutral-300 text-[11px] leading-relaxed">
                  O vídeo configurado aqui é salvo com proteção permanente e tripla redundância. <strong>Ele NUNCA sairá sozinho do ar. O vídeo só sai se você clicar explicitamente no botão "Remover Vídeo da Home".</strong>
                </p>
              </div>
            </div>

            {/* Sub-tabs: File vs Link */}
            <div className="flex border-b border-neutral-800 pb-2 gap-2 text-xs font-mono">
              <button
                onClick={() => setUploadTab('file')}
                className={`px-3 py-1.5 rounded-lg flex items-center gap-2 cursor-pointer transition-colors ${
                  uploadTab === 'file'
                    ? 'bg-amber-500 text-neutral-950 font-bold'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                <Upload className="w-3.5 h-3.5" />
                <span>{ui.tabUpload}</span>
              </button>
              <button
                onClick={() => setUploadTab('link')}
                className={`px-3 py-1.5 rounded-lg flex items-center gap-2 cursor-pointer transition-colors ${
                  uploadTab === 'link'
                    ? 'bg-amber-500 text-neutral-950 font-bold'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                <LinkIcon className="w-3.5 h-3.5" />
                <span>{ui.tabLink}</span>
              </button>
              <button
                onClick={() => setUploadTab('poster')}
                className={`px-3 py-1.5 rounded-lg flex items-center gap-2 cursor-pointer transition-colors ${
                  uploadTab === 'poster'
                    ? 'bg-amber-500 text-neutral-950 font-bold'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                <ImageIcon className="w-3.5 h-3.5" />
                <span>Capa do Vídeo (Poster)</span>
              </button>
            </div>

            {/* TAB 1: File Upload */}
            {uploadTab === 'file' && (
              <div className="space-y-4">
                <div
                  onDragOver={(e) => {
                    e.preventDefault();
                    if (!uploading) setModalDragOver(true);
                  }}
                  onDragLeave={() => setModalDragOver(false)}
                  onDrop={(e) => {
                    e.preventDefault();
                    setModalDragOver(false);
                    if (uploading) return;
                    const file = e.dataTransfer.files?.[0];
                    if (file) {
                      if (!file.type.startsWith('video/') && !/\.(mp4|webm|mov|mkv|avi|m4v|wmv|flv|ts|3gp)$/i.test(file.name)) {
                        setStatusMessage({ type: 'error', text: 'Selecione um arquivo de vídeo válido (MP4, WebM, MOV, MKV).' });
                        return;
                      }
                      setVideoFile(file);
                      setStatusMessage(null);
                    }
                  }}
                  onClick={() => {
                    if (!uploading && fileInputRef.current) {
                      fileInputRef.current.value = '';
                      fileInputRef.current.click();
                    }
                  }}
                  className={`border-2 border-dashed ${
                    modalDragOver
                      ? 'border-amber-400 bg-amber-500/20 scale-[1.01]'
                      : 'border-neutral-700 hover:border-amber-500/60 bg-neutral-950/60'
                  } rounded-2xl p-6 text-center cursor-pointer transition-all hover:bg-neutral-950 select-none`}
                >
                  <Upload className="w-10 h-10 text-amber-400/80 mx-auto mb-2" />
                  <p className="text-sm font-bold text-white">
                    {videoFile ? videoFile.name : (modalDragOver ? 'Solte o arquivo de vídeo aqui' : ui.dropTitle)}
                  </p>
                  <p className="text-xs text-neutral-400 mt-1">
                    {ui.dropFormats}
                  </p>
                  {videoFile && (
                    <p className="text-[11px] font-mono text-amber-400 mt-2">
                      {ui.sizeLabel} {(videoFile.size / (1024 * 1024)).toFixed(2)} MB
                    </p>
                  )}
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="video/mp4,video/webm,video/quicktime,video/*,.mp4,.mov,.webm,.mkv,.avi,.m4v"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </div>

                {uploading && (
                  <div className="space-y-2 p-3 bg-black/40 rounded-xl border border-amber-500/20">
                    <div className="flex justify-between text-xs font-mono text-neutral-300">
                      <span className="text-amber-300 font-semibold">{ui.sendingVideo}</span>
                      <span className="text-amber-400 font-bold">{uploadProgress}%</span>
                    </div>
                    <div className="w-full h-2.5 bg-neutral-800 rounded-full overflow-hidden border border-amber-500/30">
                      <div
                        className="h-full bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-300 transition-all duration-300"
                        style={{ width: `${uploadProgress}%` }}
                      />
                    </div>
                    {uploadProgressDetails && (
                      <span className="text-[11px] font-mono text-neutral-300 block text-center">
                        {uploadProgressDetails}
                      </span>
                    )}
                    <span className="text-[10px] text-neutral-500 block text-center">
                      Envio fragmentado de alta capacidade • Suporta arquivos de 350 MB a 1 GB com segurança
                    </span>
                  </div>
                )}

                <div className="flex justify-end gap-2 pt-2">
                  <button
                    onClick={() => setShowUploadModal(false)}
                    disabled={uploading}
                    className="px-4 py-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-300 text-xs font-mono cursor-pointer"
                  >
                    {ui.cancel}
                  </button>
                  <button
                    onClick={handleUploadFile}
                    disabled={!videoFile || uploading}
                    className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 disabled:opacity-50 text-neutral-950 text-xs font-mono font-bold flex items-center gap-2 cursor-pointer shadow-md"
                  >
                    <Upload className="w-3.5 h-3.5" />
                    <span>{uploading ? `${ui.uploadingPct} ${uploadProgress}%...` : ui.savePublish}</span>
                  </button>
                </div>
              </div>
            )}

            {/* TAB 2: External Link */}
            {uploadTab === 'link' && (
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-mono uppercase text-neutral-400 mb-1.5">
                    {ui.urlLabel}
                  </label>
                  <input
                    type="url"
                    value={urlInput}
                    onChange={(e) => setUrlInput(e.target.value)}
                    placeholder="https://www.youtube.com/watch?v=... ou https://vimeo.com/..."
                    className="w-full px-4 py-3 bg-neutral-950 border border-neutral-700 rounded-xl text-white text-xs font-mono focus:border-amber-500 focus:outline-none"
                  />
                  <p className="text-[11px] text-neutral-500 mt-1">
                    {ui.urlExamples}
                  </p>
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <button
                    onClick={() => setShowUploadModal(false)}
                    disabled={uploading}
                    className="px-4 py-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-300 text-xs font-mono cursor-pointer"
                  >
                    {ui.cancel}
                  </button>
                  <button
                    onClick={handleSaveUrl}
                    disabled={!urlInput.trim() || uploading}
                    className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 disabled:opacity-50 text-neutral-950 text-xs font-mono font-bold flex items-center gap-2 cursor-pointer shadow-md"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>{ui.saveLink}</span>
                  </button>
                </div>
              </div>
            )}

            {/* TAB 3: Video Poster / Cover */}
            {uploadTab === 'poster' && (
              <div className="space-y-4">
                <div className="p-4 rounded-2xl bg-neutral-950/80 border border-neutral-800 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono text-amber-300 font-bold flex items-center gap-1.5">
                      <ImageIcon className="w-3.5 h-3.5 text-amber-400" />
                      <span>Prévia da Capa Atual:</span>
                    </span>
                    <button
                      type="button"
                      onClick={async () => {
                        setPosterUrlInput('/images/cinelab-cover.jpg');
                        const updated = await api.updateAdminSettings({
                          settings: { welcomeVideoPoster: '/images/cinelab-cover.jpg' },
                        });
                        setStatusMessage({ type: 'success', text: 'Capa padrão CINELAB restaurada!' });
                        if (onSettingsUpdated && updated.settings) onSettingsUpdated(updated.settings);
                      }}
                      className="text-[11px] font-mono text-amber-400 hover:text-amber-300 underline cursor-pointer"
                    >
                      Restaurar Capa Padrão
                    </button>
                  </div>

                  <div className="aspect-video w-full max-h-48 rounded-xl overflow-hidden border border-neutral-700 bg-black relative shadow-inner">
                    <img
                      src={posterUrlInput || videoPoster || '/images/cinelab-cover.jpg'}
                      alt="Capa do Vídeo"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = '/images/cinelab-cover.jpg';
                      }}
                    />
                    <div className="absolute bottom-2 right-2 px-2 py-0.5 rounded bg-black/80 text-[10px] font-mono text-amber-300">
                      Capa Ativa
                    </div>
                  </div>

                  {/* Upload button from computer */}
                  <label className={`block border-2 border-dashed ${posterUploading ? 'border-amber-400 animate-pulse' : 'border-amber-500/40 hover:border-amber-400'} bg-amber-500/10 hover:bg-amber-500/20 rounded-xl p-4 text-center cursor-pointer transition-all`}>
                    <input
                      ref={posterFileInputRef}
                      type="file"
                      accept="image/jpeg,image/png,image/webp,image/avif,image/gif"
                      disabled={posterUploading}
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) handleUploadPoster(file);
                      }}
                      className="hidden"
                    />
                    <div className="flex items-center justify-center gap-2">
                      {posterUploading ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin text-amber-400" />
                          <span className="text-xs font-mono font-bold text-amber-300">
                            Subindo imagem de capa {posterProgress}%...
                          </span>
                        </>
                      ) : (
                        <>
                          <Upload className="w-4 h-4 text-amber-400" />
                          <span className="text-xs font-mono font-bold text-amber-300">
                            Clique para Subir Imagem de Capa do Computador (JPG, PNG, WebP)
                          </span>
                        </>
                      )}
                    </div>
                  </label>

                  {posterUploading && (
                    <div className="w-full h-1.5 bg-neutral-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-amber-500 to-yellow-400 transition-all duration-300"
                        style={{ width: `${posterProgress}%` }}
                      />
                    </div>
                  )}

                  {/* Manual URL Input */}
                  <div className="space-y-1 pt-1">
                    <label className="block text-[11px] font-mono text-neutral-400">
                      Ou informe o caminho/URL da capa:
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={posterUrlInput}
                        onChange={(e) => setPosterUrlInput(e.target.value)}
                        placeholder="/images/cinelab-cover.jpg ou https://..."
                        className="flex-1 px-3 py-2 bg-neutral-950 border border-neutral-700 rounded-xl text-white text-xs font-mono focus:border-amber-500 focus:outline-none"
                      />
                      <button
                        onClick={handleSavePosterUrl}
                        disabled={posterUploading}
                        className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-xs font-mono rounded-xl cursor-pointer"
                      >
                        Salvar
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Option to remove existing video if present */}
            {videoUrl && (
              <div className="pt-4 border-t border-neutral-800 flex items-center justify-between text-xs">
                <span className="text-neutral-400 font-mono">{ui.activeOnHome}</span>
                <button
                  onClick={handleRemoveVideo}
                  disabled={uploading}
                  className="px-3 py-1.5 rounded-lg bg-red-950/60 hover:bg-red-900 border border-red-800 text-red-300 font-mono flex items-center gap-1.5 cursor-pointer transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5 text-red-400" />
                  <span>{ui.removeVideo}</span>
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
};
