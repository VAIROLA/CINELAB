import React, { useState, useEffect, useRef } from 'react';
import { api } from '../../services/api.js';
import {
  BookOpen,
  Film,
  Check,
  X,
  AlertCircle,
  Upload,
  CheckCircle2,
  Loader2,
  FileText,
  ExternalLink,
  Image as ImageIcon,
} from 'lucide-react';
import { CourseModule, VideoLesson, Apostila } from '../../types/index.js';
import { saveApostilaToVault, updateVaultMetadata } from '../../utils/apostilaVault.js';
import { ApostilaExtraVideosSection } from '../ApostilaExtraVideosSection.js';

interface ModuleEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (message: string) => void;
  module: CourseModule | null;
  video?: VideoLesson | null;
  apostila?: Apostila | null;
}

export const ModuleEditModal: React.FC<ModuleEditModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
  module,
  video,
  apostila,
}) => {
  const [title, setTitle] = useState('');
  const [apostilaTitle, setApostilaTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [summary, setSummary] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [videoDurationMinutes, setVideoDurationMinutes] = useState(45);
  const [pdfUrl, setPdfUrl] = useState('');
  const [pagesCount, setPagesCount] = useState<number>(30);
  const [fileSizeMb, setFileSizeMb] = useState<number | undefined>(undefined);
  const [loading, setLoading] = useState(false);

  // Video upload state
  const [uploadingVideo, setUploadingVideo] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadedFileName, setUploadedFileName] = useState('');
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Apostila PDF upload state
  const [uploadingPdf, setUploadingPdf] = useState(false);
  const [pdfUploadProgress, setPdfUploadProgress] = useState(0);
  const [uploadedPdfFileName, setUploadedPdfFileName] = useState('');
  const [isPdfDragOver, setIsPdfDragOver] = useState(false);
  const pdfFileInputRef = useRef<HTMLInputElement>(null);

  const [errorMessage, setErrorMessage] = useState('');
  const [currentApostila, setCurrentApostila] = useState<Apostila | null>(apostila || null);

  // Capa da videoaula (Thumbnail / Poster)
  const [thumbnailUrl, setThumbnailUrl] = useState(video?.thumbnailUrl || '');
  const [uploadingThumbnail, setUploadingThumbnail] = useState(false);
  const [thumbnailProgress, setThumbnailProgress] = useState(0);
  const thumbnailFileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (module) {
      setCurrentApostila(apostila || null);
      setTitle(module.title || '');
      setApostilaTitle(apostila?.title || module.title || '');
      setSubtitle(module.subtitle || '');
      setSummary(module.summary || '');
      setVideoUrl(video?.videoUrl || '');
      setVideoDurationMinutes(video?.durationMinutes || 45);
      setThumbnailUrl(video?.thumbnailUrl || '');
      setPdfUrl(apostila?.pdfUrl || '');
      setPagesCount(apostila?.pagesCount || apostila?.totalPages || 30);
      setFileSizeMb(apostila?.fileSizeMb);
      setUploadedFileName('');
      setUploadProgress(0);
      setUploadingVideo(false);
      setUploadingThumbnail(false);
      setThumbnailProgress(0);
      setUploadedPdfFileName('');
      setPdfUploadProgress(0);
      setUploadingPdf(false);
    }
    setErrorMessage('');
  }, [module, video, apostila, isOpen]);

  if (!isOpen || !module) return null;

  const handleThumbnailUpload = async (file: File) => {
    if (!file) return;
    const isImage = file.type.startsWith('image/') || /\.(jpe?g|png|webp|svg|gif|avif|bmp)$/i.test(file.name);
    if (!isImage) {
      setErrorMessage('Por favor, selecione um arquivo de imagem válido (JPG, PNG, WebP).');
      return;
    }

    try {
      setUploadingThumbnail(true);
      setThumbnailProgress(0);
      setErrorMessage('');

      const res = await api.uploadImageFile(file, (pct) => setThumbnailProgress(pct));
      if (res && res.fileUrl) {
        setThumbnailUrl(res.fileUrl);
        if (video) {
          await api.updateAdminVideo(video.id, {
            thumbnailUrl: res.fileUrl,
          });
        } else if (module) {
          await api.updateAdminVideoByModule(module.id, {
            thumbnailUrl: res.fileUrl,
          });
        }
      }
    } catch (err: any) {
      setErrorMessage('Erro ao subir imagem de capa da aula: ' + (err.message || 'Falha no upload'));
    } finally {
      setUploadingThumbnail(false);
      setThumbnailProgress(0);
    }
  };

  const handleVideoUpload = async (file: File) => {
    if (!file) return;

    // Validate type
    const isVideo = file.type.startsWith('video/') || /\.(mp4|webm|mov|mkv|avi|m4v)$/i.test(file.name);
    if (!isVideo) {
      setErrorMessage('Por favor, selecione um arquivo de vídeo válido (MP4, WebM, MOV, MKV, AVI).');
      return;
    }

    try {
      setUploadingVideo(true);
      setUploadProgress(0);
      setErrorMessage('');
      setUploadedFileName(file.name);

      // Try detecting duration from local file
      try {
        const objectUrl = URL.createObjectURL(file);
        const tempVideo = document.createElement('video');
        tempVideo.preload = 'metadata';
        tempVideo.src = objectUrl;
        tempVideo.onloadedmetadata = () => {
          if (tempVideo.duration && !isNaN(tempVideo.duration) && tempVideo.duration > 0) {
            const minutes = Math.max(1, Math.round(tempVideo.duration / 60));
            setVideoDurationMinutes(minutes);
          }
          URL.revokeObjectURL(objectUrl);
        };
      } catch (err) {
        console.warn('Could not extract duration automatically', err);
      }

      // Upload file directly to server
      const result = await api.uploadVideoFile(file, {
        moduleId: module.id,
        title,
        description: summary,
        durationMinutes: videoDurationMinutes,
        onProgress: (percent) => setUploadProgress(percent),
      });

      setVideoUrl(result.fileUrl);
      setUploadProgress(100);
    } catch (err: any) {
      console.error(err);
      setErrorMessage(err.message || 'Erro ao fazer upload do vídeo do computador.');
    } finally {
      setUploadingVideo(false);
    }
  };

  const handlePdfUpload = async (file: File) => {
    if (!file) return;

    const isPdf = file.type === 'application/pdf' || /\.pdf$/i.test(file.name);
    if (!isPdf) {
      setErrorMessage('Por favor, selecione um arquivo no formato PDF (.pdf).');
      return;
    }

    try {
      setUploadingPdf(true);
      setPdfUploadProgress(0);
      setErrorMessage('');
      setUploadedPdfFileName(file.name);

      const result = await api.uploadApostilaPdfFile(file, {
        moduleId: module.id,
        title: title || `Apostila Didática do Módulo 0${module.id}`,
        description: summary,
        pagesCount,
        onProgress: (percent) => setPdfUploadProgress(percent),
      });

      setPdfUrl(result.fileUrl);
      if (result.fileSizeMb) {
        setFileSizeMb(result.fileSizeMb);
      }
      if (result.pagesCount) {
        setPagesCount(result.pagesCount);
      }
      // Save locally to persistent IndexedDB vault so it can be restored on any session
      try {
        await saveApostilaToVault(module.id, file, {
          fileName: file.name,
          title: module.title,
          pagesCount: result.pagesCount || pagesCount,
          fileSizeMb: result.fileSizeMb || Number((file.size / (1024 * 1024)).toFixed(2)),
          pdfUrl: result.fileUrl,
        });
      } catch (vaultErr) {
        console.warn('Could not store in local vault:', vaultErr);
      }
      setPdfUploadProgress(100);
    } catch (err: any) {
      console.error(err);
      setErrorMessage(err.message || 'Erro ao fazer upload do arquivo PDF da apostila.');
    } finally {
      setUploadingPdf(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleVideoUpload(file);
    }
  };

  const handlePdfFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handlePdfUpload(file);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      handleVideoUpload(file);
    }
  };

  const handlePdfDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsPdfDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      handlePdfUpload(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setLoading(true);

    try {
      // 1. Update module info
      await api.updateAdminModule(module.id, {
        title,
        subtitle,
        summary,
      });

      // 2. Update video info if video exists
      if (video) {
        await api.updateAdminVideo(video.id, {
          title,
          videoUrl,
          thumbnailUrl,
          description: summary,
          durationMinutes: Number(videoDurationMinutes),
        });
      } else if (module) {
        await api.updateAdminVideoByModule(module.id, {
          title,
          videoUrl,
          thumbnailUrl,
          description: summary,
          durationMinutes: Number(videoDurationMinutes),
        });
      }

      // 3. Update apostila info if apostila exists
      if (apostila) {
        const finalApostilaTitle = apostilaTitle.trim() || title;
        await api.updateAdminApostila(apostila.id, {
          title: finalApostilaTitle,
          description: summary,
          pdfUrl,
          pagesCount: Number(pagesCount),
        });

        try {
          await updateVaultMetadata(module.id, {
            isBonus: false,
            title: finalApostilaTitle,
            pagesCount: Number(pagesCount),
            pdfUrl,
            fileSizeMb,
          });
        } catch (e) {
          console.warn('Vault metadata update warning:', e);
        }
      }

      onSuccess(`Conteúdo e materiais do Módulo 0${module.id} atualizados com sucesso!`);
      onClose();
    } catch (err: any) {
      setErrorMessage(err.message || 'Erro ao atualizar dados do módulo.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4 backdrop-blur-sm animate-fadeIn overflow-y-auto">
      <div className="bg-neutral-900 border border-neutral-800 rounded-3xl p-6 sm:p-8 max-w-xl w-full space-y-5 shadow-2xl text-left my-8 max-h-[90vh] overflow-y-auto">
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center">
              <BookOpen className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold font-display text-white">
                Editar Conteúdo do Módulo 0{module.id}
              </h3>
              <p className="text-[11px] text-neutral-400 font-mono">
                Altere títulos, ementa, link ou upload de vídeos e apostilas em PDF
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-neutral-400 hover:text-white p-1 rounded-lg hover:bg-neutral-800 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Error Alert */}
        {errorMessage && (
          <div className="p-3 rounded-xl bg-red-950/40 border border-red-800/60 text-red-300 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4 text-xs font-mono">
          <div>
            <label className="block text-neutral-400 mb-1">Título Principal do Módulo</label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-neutral-950 border border-neutral-700 rounded-xl text-white font-sans text-xs focus:outline-none focus:border-amber-500"
            />
          </div>

          <div>
            <label className="block text-neutral-400 mb-1">Subtítulo / Temática</label>
            <input
              type="text"
              value={subtitle}
              onChange={(e) => setSubtitle(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-neutral-950 border border-neutral-700 rounded-xl text-white font-sans text-xs focus:outline-none focus:border-amber-500"
            />
          </div>

          <div>
            <label className="block text-neutral-400 mb-1">Resumo da Ementa / Descrição</label>
            <textarea
              rows={3}
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              className="w-full p-3 bg-neutral-950 border border-neutral-700 rounded-xl text-white font-sans text-xs focus:outline-none focus:border-amber-500 leading-relaxed"
            />
          </div>

          {/* 1. SEÇÃO DE VÍDEO DA AULA */}
          <div className="p-4 sm:p-5 rounded-2xl bg-neutral-950 border border-neutral-800 space-y-3.5">
            <div className="flex items-center justify-between">
              <label className="text-white font-bold flex items-center gap-2 text-xs">
                <Film className="w-3.5 h-3.5 text-amber-400" />
                <span>Vídeo da Masterclass (Subir do Computador ou Link)</span>
              </label>
              {videoUrl?.startsWith('/uploads/') && (
                <span className="inline-flex items-center gap-1 text-[10px] text-emerald-400 font-mono bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                  <CheckCircle2 className="w-3 h-3" /> Hospedado no Servidor
                </span>
              )}
            </div>

            {/* Dropzone & Direct Upload Button */}
            <div
              onDragOver={(e) => {
                e.preventDefault();
                setIsDragOver(true);
              }}
              onDragLeave={() => setIsDragOver(false)}
              onDrop={handleDrop}
              className={`p-4 rounded-xl border-2 border-dashed transition-all text-center flex flex-col items-center justify-center gap-2 ${
                isDragOver
                  ? 'border-amber-500 bg-amber-500/10'
                  : 'border-neutral-800 hover:border-neutral-700 bg-neutral-900/60'
              }`}
            >
              <input
                type="file"
                ref={fileInputRef}
                accept="video/mp4,video/webm,video/quicktime,video/x-matroska,video/*"
                onChange={handleFileChange}
                className="hidden"
              />

              <div className="w-10 h-10 rounded-full bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
                <Upload className="w-5 h-5" />
              </div>

              <div>
                <p className="text-xs font-sans text-white font-semibold">
                  Arraste o arquivo de vídeo aqui ou clique para selecionar
                </p>
                <p className="text-[10px] text-neutral-400 font-mono mt-0.5">
                  Suporta MP4, WebM, MOV, MKV, AVI gravados no seu computador
                </p>
              </div>

              <button
                type="button"
                disabled={uploadingVideo}
                onClick={() => fileInputRef.current?.click()}
                className="mt-1 px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-xs font-sans cursor-pointer transition-colors flex items-center gap-1.5 shadow-sm"
              >
                {uploadingVideo ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    <span>Subindo vídeo {uploadProgress}%...</span>
                  </>
                ) : (
                  <>
                    <Upload className="w-3.5 h-3.5" />
                    <span>Subir Vídeo Direto do Computador</span>
                  </>
                )}
              </button>

              {/* Barra de Progresso Real */}
              {uploadingVideo && (
                <div className="w-full max-w-xs mt-2 space-y-1">
                  <div className="flex items-center justify-between text-[10px] font-mono text-neutral-400">
                    <span className="truncate max-w-[180px]">{uploadedFileName}</span>
                    <span className="text-amber-400 font-bold">{uploadProgress}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-neutral-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-amber-500 to-yellow-400 transition-all duration-300"
                      style={{ width: `${uploadProgress}%` }}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Prévia do Vídeo Carregado ou Salvo */}
            {videoUrl && (
              <div className="space-y-1.5 pt-1">
                <div className="flex items-center justify-between text-[10px] text-neutral-400 font-mono">
                  <span className="text-amber-300 font-semibold flex items-center gap-1">
                    <Film className="w-3 h-3 text-amber-400" /> Prévia da Masterclass:
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      setVideoUrl('');
                      setUploadedFileName('');
                    }}
                    className="text-red-400 hover:text-red-300 cursor-pointer"
                  >
                    Remover vídeo
                  </button>
                </div>
                <div className="relative aspect-video max-h-48 bg-black rounded-xl overflow-hidden border border-neutral-800 flex items-center justify-center">
                  <video
                    controls
                    preload="metadata"
                    src={videoUrl}
                    className="w-full h-full object-contain"
                  >
                    Seu navegador não suporta a prévia de vídeo.
                  </video>
                </div>
              </div>
            )}

            {/* Opção Manual: URL ou Caminho e Duração */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
              <div className="sm:col-span-2">
                <label className="block text-neutral-400 text-[11px] mb-1">
                  Caminho do Arquivo ou URL Externa
                </label>
                <input
                  type="text"
                  value={videoUrl}
                  onChange={(e) => setVideoUrl(e.target.value)}
                  placeholder="https://... ou caminho do vídeo subido"
                  className="w-full px-3.5 py-2 bg-neutral-900 border border-neutral-700 rounded-xl text-white text-xs focus:outline-none focus:border-amber-500 font-mono"
                />
              </div>

              <div>
                <label className="block text-neutral-400 text-[11px] mb-1">
                  Duração (minutos)
                </label>
                <input
                  type="number"
                  min="1"
                  value={videoDurationMinutes}
                  onChange={(e) => setVideoDurationMinutes(Number(e.target.value))}
                  placeholder="45"
                  className="w-full px-3.5 py-2 bg-neutral-900 border border-neutral-700 rounded-xl text-white text-xs focus:outline-none focus:border-amber-500 font-mono"
                />
              </div>
            </div>

            {/* Capa da Videoaula (Thumbnail / Poster) */}
            <div className="p-3.5 rounded-xl border border-neutral-800 bg-neutral-900/60 space-y-2.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-mono text-amber-300 font-semibold flex items-center gap-1.5">
                  <ImageIcon className="w-3.5 h-3.5 text-amber-400" />
                  <span>Capa da Videoaula (Poster / Thumbnail)</span>
                </label>
                {thumbnailUrl && (
                  <button
                    type="button"
                    onClick={() => setThumbnailUrl('')}
                    className="text-[10px] font-mono text-red-400 hover:text-red-300 cursor-pointer"
                  >
                    Remover Capa
                  </button>
                )}
              </div>

              <div className="flex flex-col sm:flex-row gap-3 items-center">
                {/* Thumbnail Preview */}
                <div className="w-28 h-18 rounded-lg bg-black border border-neutral-700 overflow-hidden shrink-0 flex items-center justify-center relative shadow-sm">
                  {thumbnailUrl ? (
                    <img
                      src={thumbnailUrl}
                      alt="Capa da Aula"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = '/images/cinelab-cover.jpg';
                      }}
                    />
                  ) : (
                    <div className="text-[10px] text-neutral-500 font-mono text-center p-1">
                      Sem Capa
                    </div>
                  )}
                  {thumbnailUrl && (
                    <div className="absolute bottom-1 right-1 px-1 py-0.2 rounded bg-black/80 text-[8px] font-mono text-amber-300">
                      Ativa
                    </div>
                  )}
                </div>

                {/* Upload from Computer Button */}
                <div className="flex-1 w-full space-y-1.5">
                  <input
                    type="file"
                    ref={thumbnailFileInputRef}
                    accept="image/jpeg,image/png,image/webp,image/avif,image/gif"
                    disabled={uploadingThumbnail}
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) handleThumbnailUpload(file);
                    }}
                    className="hidden"
                  />
                  <button
                    type="button"
                    disabled={uploadingThumbnail}
                    onClick={() => thumbnailFileInputRef.current?.click()}
                    className={`w-full px-3 py-2 bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 rounded-xl text-xs font-mono font-bold flex items-center justify-center gap-2 border ${uploadingThumbnail ? 'border-amber-400 animate-pulse' : 'border-amber-500/30 hover:border-amber-500'} cursor-pointer transition-all`}
                  >
                    {uploadingThumbnail ? (
                      <>
                        <Loader2 className="w-3.5 h-3.5 animate-spin text-amber-400" />
                        <span>Subindo capa {thumbnailProgress}%...</span>
                      </>
                    ) : (
                      <>
                        <Upload className="w-3.5 h-3.5 text-amber-400" />
                        <span>Subir Capa do seu Computador (JPG, PNG, WebP)</span>
                      </>
                    )}
                  </button>

                  {uploadingThumbnail && (
                    <div className="w-full h-1 bg-neutral-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-amber-500 to-yellow-400 transition-all duration-300"
                        style={{ width: `${thumbnailProgress}%` }}
                      />
                    </div>
                  )}

                  <input
                    type="text"
                    value={thumbnailUrl}
                    onChange={(e) => setThumbnailUrl(e.target.value)}
                    placeholder="Ou cole o link da capa (ex: /uploads/images/... ou URL)"
                    className="w-full px-3 py-1.5 bg-neutral-950 border border-neutral-800 rounded-lg text-neutral-300 text-[11px] font-mono focus:border-amber-500 focus:outline-none"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* 2. SEÇÃO DE APOSTILA DIDÁTICA EM PDF (DIRETO DO COMPUTADOR OU LINK) */}
          <div className="p-4 sm:p-5 rounded-2xl bg-neutral-950 border border-neutral-800 space-y-3.5">
            <div className="flex items-center justify-between">
              <label className="text-white font-bold flex items-center gap-2 text-xs">
                <FileText className="w-3.5 h-3.5 text-amber-400" />
                <span>Apostila Didática Oficial (Subir PDF do Computador)</span>
              </label>
              {pdfUrl?.startsWith('/uploads/') && (
                <span className="inline-flex items-center gap-1 text-[10px] text-emerald-400 font-mono bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                  <CheckCircle2 className="w-3 h-3" /> PDF Hospedado no Servidor
                </span>
              )}
            </div>

            {/* Campo Editável de Nome/Título da Apostila */}
            <div className="p-3 rounded-xl bg-neutral-900/80 border border-amber-500/30 space-y-1">
              <label className="block text-amber-300 font-bold text-xs font-sans flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5 text-amber-400" />
                <span>Nome / Título da Apostila (Ex: História do Cinema)</span>
              </label>
              <input
                type="text"
                value={apostilaTitle}
                onChange={(e) => setApostilaTitle(e.target.value)}
                placeholder="Ex: História do Cinema"
                className="w-full px-3.5 py-2.5 bg-neutral-950 border border-neutral-700 focus:border-amber-500 rounded-xl text-white text-xs font-sans focus:outline-none transition-colors"
              />
              <p className="text-[10px] text-neutral-400 font-mono">
                Este é o nome oficial exibido aos alunos na lista de apostilas, nos cartões e no leitor.
              </p>
            </div>

            {/* Dropzone & Direct PDF Upload Button */}
            <div
              onDragOver={(e) => {
                e.preventDefault();
                setIsPdfDragOver(true);
              }}
              onDragLeave={() => setIsPdfDragOver(false)}
              onDrop={handlePdfDrop}
              className={`p-4 rounded-xl border-2 border-dashed transition-all text-center flex flex-col items-center justify-center gap-2 ${
                isPdfDragOver
                  ? 'border-amber-500 bg-amber-500/10'
                  : 'border-neutral-800 hover:border-neutral-700 bg-neutral-900/60'
              }`}
            >
              <input
                type="file"
                ref={pdfFileInputRef}
                accept="application/pdf,.pdf"
                onChange={handlePdfFileChange}
                className="hidden"
              />

              <div className="w-10 h-10 rounded-full bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
                <FileText className="w-5 h-5" />
              </div>

              <div>
                <p className="text-xs font-sans text-white font-semibold">
                  Arraste o arquivo PDF da apostila aqui ou clique para selecionar
                </p>
                <p className="text-[10px] text-neutral-400 font-mono mt-0.5">
                  Suporta arquivos .PDF de até 200MB com decupagens, fotos e gramática visual
                </p>
              </div>

              <button
                type="button"
                disabled={uploadingPdf}
                onClick={() => pdfFileInputRef.current?.click()}
                className="mt-1 px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-xs font-sans cursor-pointer transition-colors flex items-center gap-1.5 shadow-sm"
              >
                {uploadingPdf ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    <span>Subindo apostila {pdfUploadProgress}%...</span>
                  </>
                ) : (
                  <>
                    <Upload className="w-3.5 h-3.5" />
                    <span>Subir Apostila em PDF do Computador</span>
                  </>
                )}
              </button>

              {/* Barra de Progresso Real do PDF */}
              {uploadingPdf && (
                <div className="w-full max-w-xs mt-2 space-y-1">
                  <div className="flex items-center justify-between text-[10px] font-mono text-neutral-400">
                    <span className="truncate max-w-[180px]">{uploadedPdfFileName}</span>
                    <span className="text-amber-400 font-bold">{pdfUploadProgress}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-neutral-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-amber-500 to-yellow-400 transition-all duration-300"
                      style={{ width: `${pdfUploadProgress}%` }}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Informações da Apostila Carregada */}
            {pdfUrl && (
              <div className="p-3 rounded-xl bg-neutral-900 border border-neutral-800 flex items-center justify-between gap-3">
                <div className="flex items-center gap-2.5 overflow-hidden">
                  <div className="w-8 h-8 rounded-lg bg-red-500/10 text-red-400 flex items-center justify-center shrink-0">
                    <FileText className="w-4 h-4" />
                  </div>
                  <div className="truncate">
                    <span className="text-xs text-white font-medium block truncate">
                      {uploadedPdfFileName || pdfUrl.split('/').pop() || 'Apostila Oficial'}
                    </span>
                    <span className="text-[10px] text-neutral-400 font-mono">
                      {fileSizeMb ? `${fileSizeMb} MB • ` : ''} {pagesCount} páginas cadastradas
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <a
                    href={pdfUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-2.5 py-1 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-[11px] font-mono flex items-center gap-1 transition-colors"
                  >
                    <span>Abrir</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                  <button
                    type="button"
                    onClick={() => {
                      setPdfUrl('');
                      setUploadedPdfFileName('');
                      setFileSizeMb(undefined);
                    }}
                    className="text-red-400 hover:text-red-300 p-1 text-xs cursor-pointer"
                    title="Remover PDF"
                  >
                    Remover
                  </button>
                </div>
              </div>
            )}

            {/* Configurações Adicionais do PDF: Páginas e URL alternativa */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
              <div className="sm:col-span-2">
                <label className="block text-neutral-400 text-[11px] mb-1">
                  Caminho do Arquivo ou Link Externo (Google Drive / Nuvem)
                </label>
                <input
                  type="text"
                  value={pdfUrl}
                  onChange={(e) => setPdfUrl(e.target.value)}
                  placeholder="https://.../apostila.pdf ou caminho subido"
                  className="w-full px-3.5 py-2 bg-neutral-900 border border-neutral-700 rounded-xl text-white text-xs focus:outline-none focus:border-amber-500 font-mono"
                />
              </div>

              <div>
                <label className="block text-neutral-400 text-[11px] mb-1">
                  Número de Páginas
                </label>
                <input
                  type="number"
                  min="1"
                  value={pagesCount}
                  onChange={(e) => setPagesCount(Number(e.target.value))}
                  placeholder="30"
                  className="w-full px-3.5 py-2 bg-neutral-900 border border-neutral-700 rounded-xl text-white text-xs focus:outline-none focus:border-amber-500 font-mono"
                />
              </div>
            </div>

            {/* 2 Locais de Vídeos Extras para Estudo da Apostila */}
            <div className="pt-4 border-t border-neutral-800">
              <ApostilaExtraVideosSection
                apostila={currentApostila || apostila || ({ id: `apostila-${module.id}`, moduleId: module.id, number: module.id, title: apostilaTitle || module.title } as any)}
                isAdmin={true}
                onApostilaUpdated={(updated) => {
                  if (updated) {
                    setCurrentApostila(updated);
                  }
                  onSuccess('Vídeos extras da apostila atualizados com sucesso!');
                }}
              />
            </div>
          </div>

          <div className="flex items-center justify-end gap-2 pt-3 border-t border-neutral-800">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 bg-neutral-800 hover:bg-neutral-700 text-neutral-300 rounded-xl text-xs cursor-pointer font-sans"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2.5 bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold rounded-xl text-xs transition-all cursor-pointer flex items-center gap-1.5 font-sans shadow-md shadow-amber-500/20"
            >
              <Check className="w-4 h-4" />
              <span>{loading ? 'Salvando...' : 'Salvar Alterações do Módulo'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
