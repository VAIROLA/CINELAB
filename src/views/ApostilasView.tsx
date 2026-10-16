import React, { useEffect, useState } from 'react';
import { api } from '../services/api.js';
import { Apostila, BonusApostila, User, Enrollment } from '../types/index.js';
import { useLanguage } from '../i18n/LanguageContext.js';
import { LanguageSelector } from '../components/LanguageSelector.js';
import { ProtectedPdfViewer } from '../components/ProtectedPdfViewer.js';
import { TrainingEvaluationModal } from '../components/TrainingEvaluationModal.js';
import { FolderExplorer } from '../components/FolderExplorer.js';
import { ApostilaExtraVideosSection } from '../components/ApostilaExtraVideosSection.js';
import { getTranslatedApostilaSections } from '../i18n/apostilaContentTranslations.js';
import { getTrainingQuestionsForModule } from '../i18n/evaluationTranslations.js';
import {
  formatPdfViewerUrl,
  getVaultBlobUrl,
  getVaultPdfBlob,
  saveApostilaToVault,
  updateVaultMetadata,
  getMergedApostilasWithVault,
  getMergedBonusWithVault,
  autoRestoreVaultToServer,
} from '../utils/apostilaVault.js';
import {
  BookOpen,
  Lock,
  Unlock,
  CheckCircle2,
  Eye,
  Calendar,
  X,
  Sparkles,
  ArrowRight,
  ExternalLink,
  Timer,
  Clock,
  Hourglass,
  FileQuestion,
  HelpCircle,
  FileText,
  Film,
  Shield,
  Globe,
  Upload,
  Image as ImageIcon,
  Plus,
  AlertCircle,
  Loader2,
  Download,
  RotateCcw,
  RefreshCw,
  LayoutGrid,
  Folder,
  ChevronLeft,
  ChevronRight,
  Edit3,
  Trash2,
} from 'lucide-react';

interface ApostilasViewProps {
  onNavigate: (route: string, params?: any) => void;
  isLoggedIn: boolean;
  user?: User | null;
  enrollment?: Enrollment | null;
  onOpenAuth?: (mode: 'login' | 'register') => void;
  initialModuleId?: number;
}

// Digital countdown timer display component
const DigitalCountdownDisplay: React.FC<{
  targetDateIso?: string;
  effectiveNow: number;
  label: string;
  accent?: 'amber' | 'emerald';
}> = ({ targetDateIso, effectiveNow, label, accent = 'amber' }) => {
  const { language } = useLanguage();
  if (!targetDateIso) return null;
  const targetMs = new Date(targetDateIso).getTime();
  const diffMs = targetMs - effectiveNow;

  if (diffMs <= 0) return null;

  const totalSeconds = Math.floor(diffMs / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  const pad = (n: number) => String(n).padStart(2, '0');

  const isEmerald = accent === 'emerald';

  const labels = {
    pt: { live: 'AO VIVO', days: 'Dias', hours: 'Horas', min: 'Min', sec: 'Seg' },
    en: { live: 'LIVE', days: 'Days', hours: 'Hours', min: 'Min', sec: 'Sec' },
    es: { live: 'EN VIVO', days: 'Días', hours: 'Horas', min: 'Min', sec: 'Seg' },
    fr: { live: 'EN DIRECT', days: 'Jours', hours: 'Heures', min: 'Min', sec: 'Sec' },
  }[language] || { live: 'AO VIVO', days: 'Dias', hours: 'Horas', min: 'Min', sec: 'Seg' };

  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between text-[11px] font-mono">
        <span className="text-neutral-300 font-semibold flex items-center gap-1.5">
          <Timer className={`w-3.5 h-3.5 ${isEmerald ? 'text-emerald-400' : 'text-amber-400'}`} />
          {label}
        </span>
        <span className={`text-[10px] font-bold px-1.5 py-0.2 rounded ${isEmerald ? 'bg-emerald-950 text-emerald-400' : 'bg-amber-950 text-amber-400'}`}>
          {labels.live}
        </span>
      </div>

      <div className="grid grid-cols-4 gap-1.5 text-center font-mono">
        <div className="bg-neutral-900/90 border border-neutral-800 rounded-lg py-1.5 px-1 flex flex-col items-center justify-center">
          <span className={`text-base sm:text-lg font-extrabold ${isEmerald ? 'text-emerald-400' : 'text-amber-400'} leading-none`}>
            {pad(days)}
          </span>
          <span className="text-[9px] uppercase tracking-wider text-neutral-400 mt-0.5">{labels.days}</span>
        </div>

        <div className="bg-neutral-900/90 border border-neutral-800 rounded-lg py-1.5 px-1 flex flex-col items-center justify-center">
          <span className={`text-base sm:text-lg font-extrabold ${isEmerald ? 'text-emerald-400' : 'text-amber-400'} leading-none`}>
            {pad(hours)}
          </span>
          <span className="text-[9px] uppercase tracking-wider text-neutral-400 mt-0.5">{labels.hours}</span>
        </div>

        <div className="bg-neutral-900/90 border border-neutral-800 rounded-lg py-1.5 px-1 flex flex-col items-center justify-center">
          <span className={`text-base sm:text-lg font-extrabold ${isEmerald ? 'text-emerald-400' : 'text-amber-400'} leading-none`}>
            {pad(minutes)}
          </span>
          <span className="text-[9px] uppercase tracking-wider text-neutral-400 mt-0.5">{labels.min}</span>
        </div>

        <div className="bg-neutral-900/90 border border-neutral-800 rounded-lg py-1.5 px-1 flex flex-col items-center justify-center">
          <span className={`text-base sm:text-lg font-extrabold ${isEmerald ? 'text-emerald-400' : 'text-amber-400'} leading-none`}>
            {pad(seconds)}
          </span>
          <span className="text-[9px] uppercase tracking-wider text-neutral-400 mt-0.5">{labels.sec}</span>
        </div>
      </div>
    </div>
  );
};

export const ApostilasView: React.FC<ApostilasViewProps> = ({
  onNavigate,
  isLoggedIn,
  user,
  enrollment,
  onOpenAuth,
  initialModuleId,
}) => {
  const { language, t, getModuleTranslation } = useLanguage();
  const [apostilas, setApostilas] = useState<Apostila[]>([]);
  const [bonusApostilas, setBonusApostilas] = useState<BonusApostila[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedApostila, setSelectedApostila] = useState<Apostila | null>(null);
  const [modalTab, setModalTab] = useState<'pdf' | 'text' | 'quiz' | 'extra-videos'>('pdf');
  const [vaultBlobUrl, setVaultBlobUrl] = useState<string | null>(null);
  const [vaultPdfBlob, setVaultPdfBlob] = useState<Blob | null>(null);

  // Training Evaluation & Access Restriction state
  const [trainingModalOpen, setTrainingModalOpen] = useState(false);
  const [trainingApostila, setTrainingApostila] = useState<Apostila | BonusApostila | null>(null);
  const [trainingEtapaNumber, setTrainingEtapaNumber] = useState<number>(1);
  const [accessModalOpen, setAccessModalOpen] = useState(false);
  const [displayMode, setDisplayMode] = useState<'grid' | 'folders'>('grid');
  const [completedTrainings, setCompletedTrainings] = useState<
    Record<string, { etapa: number; score: number; total: number; percentage: number }>
  >({});

  // Check if student has active/paid enrollment or is admin
  const isPaidStudent =
    Boolean(user?.role === 'admin') ||
    Boolean(user && enrollment && (enrollment.status === 'active' || enrollment.status === 'completed')) ||
    Boolean(user && user.role === 'student' && (!enrollment || enrollment.status === 'active' || enrollment.status === 'completed'));

  const isAdmin = Boolean(user?.role === 'admin');

  // Estado e função para upload da capa de cada apostila diretamente da tela
  const [uploadingCoverId, setUploadingCoverId] = useState<string | number | null>(null);

  const compressCoverImage = (file: File, maxWidth = 640, quality = 0.86): Promise<string> => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          let width = img.width;
          let height = img.height;
          if (width > maxWidth) {
            height = Math.round((height * maxWidth) / width);
            width = maxWidth;
          }
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          if (ctx) {
            ctx.drawImage(img, 0, 0, width, height);
            resolve(canvas.toDataURL('image/jpeg', quality));
          } else {
            resolve((e.target?.result as string) || '');
          }
        };
        img.onerror = () => resolve((e.target?.result as string) || '');
        img.src = (e.target?.result as string) || '';
      };
      reader.onerror = () => resolve('');
      reader.readAsDataURL(file);
    });
  };

  const handleUploadCover = async (item: Apostila | BonusApostila, file: File, isExtra: boolean = false) => {
    if (!isAdmin || !file) return;
    const isImage = file.type.startsWith('image/') || /\.(jpe?g|png|webp|svg|gif|avif|bmp)$/i.test(file.name);
    if (!isImage) {
      alert('Por favor, selecione um arquivo de imagem válido (JPG, PNG, WebP).');
      return;
    }

    const isBonus = Boolean((item as any).isBonus || (item as any).number > 990 || item.id?.startsWith('bonus') || (item as any).code?.includes('BÔNUS'));
    const itemId = item.id;
    const rawNum = item.number || ((item as any).moduleId && (item as any).moduleId > 990 ? (item as any).moduleId - 990 : (item as any).moduleId) || 1;
    const modOrBonusNumber = isBonus && rawNum > 990 ? rawNum - 990 : rawNum;
    const uploadKey = isExtra ? `${itemId}-extra` : itemId;

    try {
      setUploadingCoverId(uploadKey);

      // Compactação ultraleve (~60KB) com máxima nitidez visual — nunca expira, nunca dá 404 e abre em qualquer celular
      const coverToSave = await compressCoverImage(file);

      // Envia assincronamente ao servidor
      api.uploadImageFile(file).catch(() => {});

      if (isExtra) {
        try {
          await api.updateAdminApostila(itemId, { extraCoverUrl: coverToSave, isExtra: true });
        } catch (apiErr) {
          console.warn('updateAdminApostila error:', apiErr);
        }

        await updateVaultMetadata(modOrBonusNumber, {
          isExtra: true,
          coverUrl: coverToSave,
          extraCoverUrl: coverToSave,
        });

        setApostilas((prev) =>
          prev.map((a) => (a.id === itemId || a.moduleId === modOrBonusNumber ? { ...a, extraCoverUrl: coverToSave } : a))
        );
        alert('Capa da Apostila Extra atualizada e aplicada com sucesso!');
      } else {
        try {
          await api.updateAdminApostila(itemId, { coverUrl: coverToSave });
        } catch (apiErr) {
          console.warn('updateAdminApostila error:', apiErr);
        }

        await updateVaultMetadata(isBonus ? `bonus-${modOrBonusNumber}` : modOrBonusNumber, {
          isBonus,
          bonusNumber: isBonus ? modOrBonusNumber : undefined,
          coverUrl: coverToSave,
        });

        if (isBonus) {
          setBonusApostilas((prev) =>
            prev.map((b) => (b.id === itemId || b.number === modOrBonusNumber ? { ...b, coverUrl: coverToSave } : b))
          );
        } else {
          setApostilas((prev) =>
            prev.map((a) => (a.id === itemId || a.moduleId === modOrBonusNumber ? { ...a, coverUrl: coverToSave } : a))
          );
        }
        alert('Capa da Apostila atualizada e aplicada com sucesso!');
      }
    } catch (err: any) {
      console.error(err);
      alert(`Erro ao subir capa: ${err.message || 'Falha no upload'}`);
    } finally {
      setUploadingCoverId(null);
    }
  };

  // Estado e métodos para upload de Apostila Extra (PDF) diretamente pelo card
  const [uploadingExtraPdfModId, setUploadingExtraPdfModId] = useState<number | null>(null);
  const [uploadingExtraPdfProgress, setUploadingExtraPdfProgress] = useState<number>(0);

  const handleUploadExtraPdf = async (modNum: number, file: File) => {
    if (!isAdmin || !file) return;
    const isPdf = file.type === 'application/pdf' || /\.pdf$/i.test(file.name);
    if (!isPdf) {
      alert('Por favor, selecione um arquivo de documento PDF (.pdf).');
      return;
    }

    try {
      setUploadingExtraPdfModId(modNum);
      setUploadingExtraPdfProgress(0);

      const matchingApos = apostilas.find((a) => a.moduleId === modNum);
      const defaultTitle = matchingApos?.extraTitle || `Apostila Extra 0${modNum} (Material Complementar)`;

      const customTitlePrompt = window.prompt(
        `Digite o título para a Apostila Extra do Módulo 0${modNum}:`,
        defaultTitle
      );
      if (customTitlePrompt === null) {
        setUploadingExtraPdfModId(null);
        return;
      }
      const finalTitle = customTitlePrompt.trim() || defaultTitle;

      const res = await api.uploadApostilaPdfFile(file, {
        isExtra: true,
        moduleId: modNum,
        title: finalTitle,
        onProgress: (percent) => setUploadingExtraPdfProgress(percent),
      });

      // Salva no Vault local
      try {
        await saveApostilaToVault(modNum, file, {
          isExtra: true,
          fileName: file.name,
          title: finalTitle,
          pagesCount: res.pagesCount || 20,
          fileSizeMb: res.fileSizeMb || Number((file.size / (1024 * 1024)).toFixed(2)),
          pdfUrl: res.fileUrl,
        });
      } catch (vaultErr) {
        console.warn('Vault error ao salvar extra:', vaultErr);
      }

      // Atualiza estado local das apostilas
      setApostilas((prev) =>
        prev.map((a) => {
          if (a.moduleId === modNum) {
            return {
              ...a,
              extraPdfUrl: res.fileUrl,
              extraTitle: finalTitle,
              extraPagesCount: res.pagesCount || 20,
              extraFileSizeMb: res.fileSizeMb || Number((file.size / (1024 * 1024)).toFixed(2)),
            };
          }
          return a;
        })
      );

      alert(`Apostila Extra do Módulo 0${modNum} ("${finalTitle}") enviada e blindada com sucesso!`);
    } catch (err: any) {
      console.error(err);
      alert(`Erro ao subir Apostila Extra: ${err.message || 'Falha no upload'}`);
    } finally {
      setUploadingExtraPdfModId(null);
      setUploadingExtraPdfProgress(0);
    }
  };

  const handleRenameExtraPdf = async (modNum: number) => {
    const matchingApos = apostilas.find((a) => a.moduleId === modNum);
    const currentTitle = matchingApos?.extraTitle || `Apostila Extra 0${modNum} (Material Complementar)`;
    const newTitle = window.prompt(`Novo título para a Apostila Extra do Módulo 0${modNum}:`, currentTitle);
    if (!newTitle || !newTitle.trim() || newTitle === currentTitle) return;

    try {
      await api.updateAdminApostila(`mod-${modNum}`, {
        isExtra: true,
        extraTitle: newTitle.trim(),
      });
      await updateVaultMetadata(modNum, {
        isExtra: true,
        extraTitle: newTitle.trim(),
      });
      setApostilas((prev) =>
        prev.map((a) => (a.moduleId === modNum ? { ...a, extraTitle: newTitle.trim() } : a))
      );
      alert('Título da Apostila Extra atualizado com sucesso!');
    } catch (err: any) {
      alert(`Erro ao renomear: ${err.message || 'Erro desconhecido'}`);
    }
  };

  const handleDeleteExtraPdf = async (modNum: number) => {
    if (!window.confirm(`Deseja realmente remover a Apostila Extra do Módulo 0${modNum}?`)) return;
    try {
      await api.deleteExtraApostila(modNum);
      setApostilas((prev) =>
        prev.map((a) => {
          if (a.moduleId === modNum) {
            const copy = { ...a };
            delete copy.extraPdfUrl;
            delete copy.extraTitle;
            delete copy.extraPagesCount;
            delete copy.extraFileSizeMb;
            return copy;
          }
          return a;
        })
      );
      alert('Apostila Extra removida com sucesso!');
    } catch (err: any) {
      alert(`Erro ao remover: ${err.message || 'Erro desconhecido'}`);
    }
  };

  useEffect(() => {
    try {
      const stored = localStorage.getItem('cinelab_training_evaluations');
      if (stored) {
        setCompletedTrainings(JSON.parse(stored));
      }
    } catch {}
  }, [trainingModalOpen]);

  const handleOpenApostila = async (item: Apostila, defaultTab: "pdf" | "text" | "quiz" | "extra-videos" = "pdf") => {
    if (!isPaidStudent) {
      setAccessModalOpen(true);
      return;
    }
    const isBonusItem = (item as any).id?.startsWith('bonus') ||
                        (item as any).code?.includes('BÔNUS') ||
                        (item.moduleId && item.moduleId > 990);

    const fullItem = isBonusItem
      ? (bonusApostilas.find((b) => b.id === item.id || (item.number && b.number === item.number)) || item)
      : (apostilas.find((a) => a.id === item.id || (item.moduleId && a.moduleId === item.moduleId)) || item);

    if (isBonusItem) {
      const bNum = fullItem.number || item.number || 1;
      const canonicalBonusPdf = bNum === 1
        ? '/materiais/cinelab-bonus-01-glossario-planos.pdf'
        : (bNum === 2 ? '/materiais/cinelab-bonus-02-glossario-roteiro.pdf' : (bNum === 3 ? '/materiais/cinelab-bonus-03-analise-filmica.pdf' : '/materiais/cinelab-bonus-04-historia-do-cinema-complemento.pdf'));
      const realBonusPages = bNum === 1 ? 30 : (bNum === 2 ? 29 : (bNum === 3 ? 27 : 33));
      const modTrans = getModuleTranslation(990 + bNum);
      fullItem.moduleId = 990 + bNum;
      fullItem.title = modTrans.title || fullItem.title;
      fullItem.subtitle = modTrans.subtitle || fullItem.subtitle;
      fullItem.summary = modTrans.summary || fullItem.summary;
      fullItem.pdfUrl = fullItem.pdfUrl || canonicalBonusPdf;
      fullItem.totalPages = fullItem.totalPages || realBonusPages;
      fullItem.pagesCount = fullItem.pagesCount || realBonusPages;
      fullItem.isUnlocked = true;
    }

    const startMs = (!isBonusItem && fullItem.startDate) ? new Date(fullItem.startDate).getTime() : 0;
    const isLocked = !isBonusItem && (!fullItem.isUnlocked || (startMs > 0 && effectiveNow < startMs)) && !isAdmin;

    if (isLocked) {
      alert(`Esta apostila e seus vídeos serão liberados de acordo com o cronograma pedagógico em ${formatDateTime(fullItem.startDate)}.`);
      return;
    }

    const isExtra = Boolean((fullItem as any).isExtra || (fullItem as any).id?.includes('extra'));
    const bNum = fullItem.number || (fullItem.moduleId ? fullItem.moduleId - 990 : 1);
    const targetId = isBonusItem ? `bonus-${bNum}` : (fullItem.moduleId || fullItem.number);
    try {
      const [bUrl, blob] = await Promise.all([
        getVaultBlobUrl(targetId, isBonusItem, isExtra),
        getVaultPdfBlob(targetId, isBonusItem, isExtra),
      ]);
      // Se for o Módulo 1 e o blob tiver tamanho de upload anterior ou for menor que 50KB, descarta para carregar o oficial de 33 págs
      if (!isBonusItem && !isExtra && (targetId === 1 || targetId === '1' || targetId === 'mod-1') && blob && (blob.size < 50000 || blob.size > 15000000)) {
        console.info('[ApostilasView] Ignorando blob local não canônico do Módulo 1 para usar PDF oficial direto de 33 páginas.');
        setVaultBlobUrl(null);
        setVaultPdfBlob(null);
      } else {
        setVaultBlobUrl(bUrl || null);
        setVaultPdfBlob(blob || null);
      }
    } catch {
      setVaultBlobUrl(null);
      setVaultPdfBlob(null);
    }

    setSelectedApostila(fullItem as Apostila);
    setModalTab(defaultTab);
  };

  const handleOpenExtraApostila = async (item: Apostila) => {
    if (!isPaidStudent) {
      setAccessModalOpen(true);
      return;
    }
    const startMs = item.startDate ? new Date(item.startDate).getTime() : 0;
    const isLocked = (!item.isUnlocked || (startMs > 0 && effectiveNow < startMs)) && !isAdmin;
    if (isLocked) {
      alert(`Esta apostila complementar será liberada junto com a etapa em ${formatDateTime(item.startDate)}.`);
      return;
    }

    const modNum = item.moduleId || item.number || 1;
    const extraApos: Apostila = {
      ...item,
      id: `mod-${modNum}-extra`,
      isExtra: true,
      title: item.extraTitle || `Apostila Extra 0${modNum} (Material Complementar)`,
      subtitle: `Material Didático Complementar - Etapa 0${modNum}`,
      summary: `Apostila extra de aprofundamento técnico e exercícios práticos da Etapa 0${modNum}.`,
      pdfUrl: item.extraPdfUrl || item.pdfUrl,
      pagesCount: (modNum === 3 && item.extraPagesCount === 34) ? 7 : (item.extraPagesCount || (modNum === 3 ? 7 : 30)),
      totalPages: (modNum === 3 && item.extraPagesCount === 34) ? 7 : (item.extraPagesCount || (modNum === 3 ? 7 : 30)),
      fileSizeMb: item.extraFileSizeMb || item.fileSizeMb,
      sections: [],
    };

    try {
      const [bUrl, blob] = await Promise.all([
        getVaultBlobUrl(modNum, false, true),
        getVaultPdfBlob(modNum, false, true),
      ]);
      setVaultBlobUrl(bUrl || null);
      setVaultPdfBlob(blob || null);
    } catch {}

    setSelectedApostila(extraApos);
    setModalTab('pdf');
  };

  const handleOpenTraining = (item: Apostila | BonusApostila, modNum: number) => {
    if (!isPaidStudent) {
      setAccessModalOpen(true);
      return;
    }
    const startMs = item.startDate ? new Date(item.startDate).getTime() : 0;
    const isLocked = (!item.isUnlocked || (startMs > 0 && effectiveNow < startMs)) && !isAdmin;

    if (isLocked) {
      alert(`A avaliação de treinamento desta etapa será liberada junto com a apostila em ${formatDateTime(item.startDate)}.`);
      return;
    }

    setTrainingApostila(item);
    setTrainingEtapaNumber(modNum);
    setTrainingModalOpen(true);
  };

  // Bonus Apostilas Upload Local State (Área de Envio de Apostilas Bônus)
  const [showBonusUploadForm, setShowBonusUploadForm] = useState(true);
  const [bonusUploadTargetNumber, setBonusUploadTargetNumber] = useState<number>(1);
  const [bonusUploadTitle, setBonusUploadTitle] = useState('Glossário Completo de Planos');
  const [bonusUploadPages, setBonusUploadPages] = useState<number>(30);
  const [bonusUploadDescription, setBonusUploadDescription] = useState(
    'Guia permanente de consulta técnica para decupagem cinematográfica, escalas de planos e movimentos de câmera.'
  );
  const [bonusUploadFile, setBonusUploadFile] = useState<File | null>(null);
  const [isBonusUploading, setIsBonusUploading] = useState(false);
  const [bonusUploadProgress, setBonusUploadProgress] = useState(0);
  const [bonusUploadMessage, setBonusUploadMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const selectBonusForUpload = (bNumber: number) => {
    setBonusUploadTargetNumber(bNumber);
    const existing = bonusApostilas.find((b) => b.number === bNumber);
    if (existing) {
      setBonusUploadTitle(existing.title || (bNumber === 1 ? 'Glossário Completo de Planos' : 'Glossário Completo de Roteiro'));
      const rawP = existing.pagesCount || existing.totalPages;
      setBonusUploadPages(rawP && rawP !== 96 && rawP !== 104 ? rawP : (bNumber === 1 ? 30 : 29));
      setBonusUploadDescription(existing.description || existing.summary || (bNumber === 1 ? 'Guia permanente de consulta técnica para decupagem cinematográfica, escalas de planos e movimentos de câmera.' : 'Guia permanente de consulta dramatúrgica: da criação de premissa, storyline e sinopse à escaleta e roteiro final.'));
    } else if (bNumber === 1) {
      setBonusUploadTitle('Glossário Completo de Planos');
      setBonusUploadPages(30);
      setBonusUploadDescription('Guia permanente de consulta técnica para decupagem cinematográfica, escalas de planos e movimentos de câmera.');
    } else if (bNumber === 2) {
      setBonusUploadTitle('Glossário Completo de Roteiro');
      setBonusUploadPages(29);
      setBonusUploadDescription('Guia permanente de consulta dramatúrgica: da criação de premissa, storyline e sinopse à escaleta e roteiro final.');
    } else {
      setBonusUploadTitle(`Apostila Bônus 0${bNumber} Especial`);
      setBonusUploadPages(60);
      setBonusUploadDescription('Material pedagógico complementar exclusivo CINELAB.');
    }
    setShowBonusUploadForm(true);
    setBonusUploadMessage(null);
    setTimeout(() => {
      document.getElementById('bonus-upload-section')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleUploadBonusApostila = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAdmin) {
      setBonusUploadMessage({
        type: 'error',
        text: 'Acesso restrito: apenas a escola e administradores podem publicar apostilas bônus.',
      });
      return;
    }
    if (!bonusUploadFile) {
      setBonusUploadMessage({
        type: 'error',
        text: 'Por favor, selecione um arquivo PDF (.pdf) da apostila bônus para fazer o upload.',
      });
      return;
    }
    const isPdf = bonusUploadFile.type === 'application/pdf' || /\.pdf$/i.test(bonusUploadFile.name);
    if (!isPdf) {
      setBonusUploadMessage({
        type: 'error',
        text: 'Formato inválido. O arquivo precisa ser um documento PDF (.pdf).',
      });
      return;
    }

    try {
      setIsBonusUploading(true);
      setBonusUploadProgress(0);
      setBonusUploadMessage(null);

      const titleToSend = bonusUploadTitle.trim() || `Apostila Bônus 0${bonusUploadTargetNumber}`;
      const res = await api.uploadApostilaPdfFile(bonusUploadFile, {
        isBonus: true,
        bonusNumber: bonusUploadTargetNumber,
        title: titleToSend,
        description: bonusUploadDescription,
        pagesCount: Number(bonusUploadPages) || 35,
        onProgress: (percent) => setBonusUploadProgress(percent),
      });

      // Save to local indexedDB & LocalStorage vault with resilient metadata
      const rawResPages = res.pagesCount || Number(bonusUploadPages);
      const finalPages = rawResPages && rawResPages !== 96 && rawResPages !== 104 ? rawResPages : (bonusUploadTargetNumber === 1 ? 30 : 29);
      try {
        await saveApostilaToVault(bonusUploadTargetNumber, bonusUploadFile, {
          isBonus: true,
          bonusNumber: bonusUploadTargetNumber,
          fileName: bonusUploadFile.name,
          title: titleToSend,
          pagesCount: finalPages,
          fileSizeMb: res.fileSizeMb,
          pdfUrl: res.fileUrl,
        });
      } catch (vaultErr) {
        console.warn('Vault error:', vaultErr);
      }

      setBonusUploadMessage({
        type: 'success',
        text: `Apostila Bônus 0${bonusUploadTargetNumber} ("${titleToSend}") enviada e sincronizada com sucesso! Total de páginas: ${finalPages}.`,
      });

      setBonusUploadFile(null);
      await loadData();
    } catch (err: any) {
      setBonusUploadMessage({
        type: 'error',
        text: err.message || 'Erro ao enviar apostila bônus. Tente novamente.',
      });
    } finally {
      setIsBonusUploading(false);
    }
  };

  useEffect(() => {
    let active = true;
    if (selectedApostila) {
      const isBonus = (selectedApostila as any).id?.startsWith('bonus') ||
                      (selectedApostila as any).code?.includes('BÔNUS') ||
                      (selectedApostila.moduleId && selectedApostila.moduleId > 990);
      const isExtra = Boolean((selectedApostila as any).isExtra || (selectedApostila as any).id?.includes('extra'));
      const bNum = selectedApostila.number || (selectedApostila.moduleId ? selectedApostila.moduleId - 990 : 1);
      const targetId = isBonus ? `bonus-${bNum}` : (selectedApostila.moduleId || selectedApostila.number);
      Promise.all([
        getVaultBlobUrl(targetId, isBonus, isExtra),
        getVaultPdfBlob(targetId, isBonus, isExtra),
      ]).then(([bUrl, blob]) => {
        if (active) {
          if (bUrl) setVaultBlobUrl(bUrl);
          if (blob) setVaultPdfBlob(blob);
        }
      });
    } else {
      setVaultBlobUrl(null);
      setVaultPdfBlob(null);
    }
    return () => {
      active = false;
    };
  }, [selectedApostila?.moduleId, selectedApostila?.number, selectedApostila?.id, (selectedApostila as any)?.isExtra]);

  // Support opening initialModuleId directly from navigation route params
  useEffect(() => {
    if (initialModuleId && apostilas.length > 0 && !selectedApostila) {
      const target = apostilas.find(
        (a) => (a.moduleId || a.number) === initialModuleId
      );
      if (target) {
        handleOpenApostila(target);
      }
    }
  }, [initialModuleId, apostilas]);

  // Real-time synchronization
  const [currentTime, setCurrentTime] = useState<number>(Date.now());
  const [serverOffsetMs, setServerOffsetMs] = useState<number>(0);

  useEffect(() => {
    // 1-second interval to update live timers
    const timerInterval = setInterval(() => {
      setCurrentTime(Date.now());
    }, 1000);
    return () => clearInterval(timerInterval);
  }, []);

  useEffect(() => {
    loadData();
  }, [isLoggedIn]);

  const loadData = async () => {
    try {
      setLoading(true);
      // Fetch public course info to get canonical server now & module schedules
      const info = await api.getPublicCourseInfo();
      if (info && info.now) {
        const offset = new Date(info.now).getTime() - Date.now();
        setServerOffsetMs(offset);
      }

      if (isLoggedIn) {
        const [apos, bonus] = await Promise.all([
          api.getStudentApostilas(),
          api.getStudentBonusApostilas(),
        ]);
        setApostilas(getMergedApostilasWithVault(apos));
        setBonusApostilas(getMergedBonusWithVault(bonus));
      } else if (info.apostilas && info.apostilas.length > 0) {
        const mappedApos: Apostila[] = info.apostilas.map((a: any) => {
          const m = info.modules?.find((mod: any) => mod.id === a.moduleId);
          const modNumber = a.number || a.moduleId || 1;
          const canonicalPdf = `/materiais/cinelab-apostila-${modNumber < 10 ? '0' + modNumber : modNumber}.pdf`;
          const canonicalCover = `/images/covers/apostila-${modNumber < 10 ? '0' + modNumber : modNumber}.jpg`;
          const isOutdatedCover = !a.coverUrl || a.coverUrl.includes('unsplash.com') || (a.coverUrl.startsWith('/uploads/') && !a.coverUrl.includes('base64'));
          return {
            ...a,
            coverUrl: !isOutdatedCover ? a.coverUrl : canonicalCover,
            subtitle: m?.subtitle,
            isUnlocked: true,
            unlockDate: m?.startDate || '',
            startDate: m?.startDate || '',
            endDate: m?.endDate || '',
            evalUnlockDate: m?.evalUnlockDate || '',
            isEvalUnlocked: m?.isEvalUnlocked || false,
            status: 'available' as const,
            durationDays: m?.durationDays,
            durationLabel: m?.durationLabel,
            evalLeadDays: m?.evalLeadDays,
            totalPages: a.totalPages || a.pagesCount || ((a.moduleId || a.number) === 1 ? 8 : ((a.moduleId || a.number) === 2 ? 52 : ((a.moduleId || a.number) === 3 ? 34 : 6))),
            pagesCount: a.pagesCount || a.totalPages || ((a.moduleId || a.number) === 1 ? 8 : ((a.moduleId || a.number) === 2 ? 52 : ((a.moduleId || a.number) === 3 ? 34 : 6))),
            pdfUrl: a.pdfUrl || canonicalPdf,
          };
        });
        setApostilas(getMergedApostilasWithVault(mappedApos));
        setBonusApostilas(getMergedBonusWithVault(info.bonusApostilas || []));
      } else {
        const mappedApos: Apostila[] = info.modules.map((m: any) => {
          const num = m.number || m.id;
          return {
            id: `ap-${m.id}`,
            moduleId: m.id,
            number: num,
            coverUrl: `/images/covers/apostila-${num < 10 ? '0' + num : num}.jpg`,
            title: `Apostila 0${num} – ${m.title}`,
            subtitle: m.subtitle,
            summary: m.summary,
            totalPages: num === 1 ? 8 : (num === 2 ? 52 : (num === 3 ? 34 : 6)),
            pagesCount: num === 1 ? 8 : (num === 2 ? 52 : (num === 3 ? 34 : 6)),
            pdfUrl: `/materiais/cinelab-apostila-${num < 10 ? '0' + num : num}.pdf`,
            isUnlocked: true,
            unlockDate: m.startDate || '',
            startDate: m.startDate || '',
            endDate: m.endDate || '',
            evalUnlockDate: m.evalUnlockDate || m.evaluationReleaseDate || '',
            isEvalUnlocked: m.isEvalUnlocked || false,
            status: 'available' as const,
            durationDays: m.durationDays,
            durationLabel: m.durationLabel,
            evalLeadDays: m.evalLeadDays,
            contentMarkdown: `# APOSTILA 0${num} – ${m.title}\n\n## Subtítulo: ${m.subtitle}\n\n${m.summary}\n\n### 1. Fundamentos e Conceitos Centrais\nO cinema opera como uma sintaxe espaço-temporal onde cada elemento do plano possui carga semiótica direta.\n\n### 2. Estudo de Caso\nAnálise prática de enquadramento, iluminação e decupagem aplicada.\n\n### 3. Síntese do Realizador\nDiretrizes práticas para aplicação em seu próprio projeto.`,
          };
        });
        setApostilas(getMergedApostilasWithVault(mappedApos));

        // Map bonus apostilas with unlock dates corresponding to module 5 and module 8
        const mod5 = info.modules.find((m: any) => m.number === 5);
        const mod8 = info.modules.find((m: any) => m.number === 8);

        const initialBonusList = [
          {
            id: 'bonus-01',
            number: 1,
            code: 'BÔNUS 01',
            title: 'Glossário Completo de Planos',
            subtitle: 'Guia Permanente de Consulta Técnica e Decupagem Cinematográfica',
            summary: 'Guia permanente de consulta técnica para decupagem cinematográfica, escalas de planos e movimentos de câmera.',
            description: 'Guia permanente de consulta técnica para decupagem cinematográfica, escalas de planos e movimentos de câmera.',
            totalPages: 30,
            pagesCount: 30,
            pdfUrl: '/materiais/cinelab-bonus-01-glossario-planos.pdf',
            isUnlocked: true,
            unlockDate: '',
          },
          {
            id: 'bonus-02',
            number: 2,
            code: 'BÔNUS 02',
            title: 'Glossário Completo de Roteiro',
            subtitle: 'Guia Permanente de Consulta Dramatúrgica e Estruturação de Histórias',
            summary: 'Guia permanente de consulta dramatúrgica: da criação de premissa, storyline e sinopse à escaleta e roteiro final.',
            description: 'Guia permanente de consulta dramatúrgica: da criação de premissa, storyline e sinopse à escaleta e roteiro final.',
            totalPages: 29,
            pagesCount: 29,
            pdfUrl: '/materiais/cinelab-bonus-02-glossario-roteiro.pdf',
            isUnlocked: true,
            unlockDate: '',
          },
          {
            id: 'bonus-03',
            number: 3,
            code: 'BÔNUS 03',
            title: 'Método de Análise Fílmica em 6 Camadas',
            subtitle: 'Guia Completo de Análise Crítica e Decupagem de Obras Audiovisuais',
            summary: 'A metodologia analítica do CINELAB em 6 camadas: Narrativa, Personagem, Espaço, Imagem (Fotografia), Som e Montagem para dissecar qualquer obra audiovisual como realizador.',
            description: 'A metodologia analítica do CINELAB em 6 camadas: Narrativa, Personagem, Espaço, Imagem (Fotografia), Som e Montagem para dissecar qualquer obra audiovisual como realizador.',
            totalPages: 27,
            pagesCount: 27,
            pdfUrl: '/materiais/cinelab-bonus-03-analise-filmica.pdf',
            isUnlocked: true,
            unlockDate: '',
          },
          {
            id: 'bonus-04',
            number: 4,
            code: 'BÔNUS 04',
            title: 'História do Cinema - Complemento',
            subtitle: 'Guia Histórico e Complemento Didático Completo',
            summary: 'A evolução histórica da linguagem cinematográfica: das primeiras projeções às inovações digitais contemporâneas.',
            description: 'A evolução histórica da linguagem cinematográfica: das primeiras projeções às inovações digitais contemporâneas.',
            totalPages: 36,
            pagesCount: 36,
            pdfUrl: '/materiais/cinelab-bonus-04-historia-do-cinema-complemento.pdf',
            isUnlocked: true,
            unlockDate: '',
          },
        ];
        setBonusApostilas(getMergedBonusWithVault(initialBonusList as any));
      }

      // Sincroniza silenciosamente o cofre local permanente com o backend
      autoRestoreVaultToServer(api);
    } catch (err) {
      console.error('Erro ao carregar apostilas:', err);
    } finally {
      setLoading(false);
    }
  };

  // The effective real-time milliseconds taking server offset into account
  const effectiveNow = currentTime + serverOffsetMs;

  const localeMap: Record<string, string> = {
    pt: 'pt-BR',
    en: 'en-US',
    es: 'es-ES',
    fr: 'fr-FR',
  };
  const currentLocale = localeMap[language] || 'pt-BR';

  const formatDate = (isoString?: string) => {
    if (!isoString) return '';
    try {
      const d = new Date(isoString);
      return d.toLocaleDateString(currentLocale, {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      });
    } catch {
      return isoString;
    }
  };

  const formatDateTime = (isoString?: string) => {
    if (!isoString) return '';
    try {
      const d = new Date(isoString);
      const datePart = d.toLocaleDateString(currentLocale, {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      });
      const atLabel = language === 'pt' ? 'às' : language === 'es' ? 'a las' : language === 'fr' ? 'à' : 'at';
      return `${datePart} ${atLabel} 00:00`;
    } catch {
      return isoString;
    }
  };

  const currentBonusCount = bonusApostilas && bonusApostilas.length > 0 ? bonusApostilas.length : 4;

  const i18n = {
    pt: {
      badge: 'Material Didático Exclusivo',
      title: 'Minhas Apostilas de Cinema',
      subtitle: `As 10 apostilas didáticas do curso e ${currentBonusCount} apostilas bônus. Conteúdo técnico e prático de leitura 100% online integrada na plataforma CINELAB, calibrado em um cronograma imersivo de 3 meses (90 dias).`,
      onlineNotice: 'Leitura Online Exclusiva na Plataforma • Sem download',
      visitorNotice: 'Você está navegando como visitante. Para acessar as apostilas na íntegra e responder às avaliações:',
      enrollBtn: 'Faça sua Matrícula no CINELAB',
      sectionTitle: 'As 10 Apostilas do Curso (Cronograma de 3 Meses)',
      sectionDesc: 'Cronograma de 90 dias calibrado por volume pedagógico. Acompanhe abaixo o cronômetro em tempo real do início de cada apostila e a data de liberação da respectiva avaliação online.',
      stagesBadge: '10 Etapas • 90 Dias',
      locked: 'BLOQUEADO',
      completed: 'CONCLUÍDO',
      evalOpen: 'AVALIAÇÃO ABERTA',
      available: 'DISPONÍVEL',
      handoutPrefix: 'APOSTILA 0',
      pagesUnit: 'páginas didáticas',
      readingOnPlatform: 'Leitura na Plataforma',
      readOnlineBtn: 'Ler Apostila Online',
      lockedStartNotice: 'Leitura liberada no início desta etapa',
      startCountLabel: (num: number) => `Início da Apostila 0${num} em:`,
      officialStart: 'Início Oficial:',
      handoutStarted: 'Apostila iniciada & liberada',
      evalUnlockCountLabel: 'Liberação da Avaliação em:',
      evalOnlineLabel: 'Avaliação Online:',
      evalLeadNotice: 'Liberada automaticamente 2 a 3 dias antes do término desta etapa.',
      evalReleasedTitle: 'AVALIAÇÃO LIBERADA!',
      finalStretch: 'Reta Final',
      evalReleasedDesc: 'A avaliação desta etapa está aberta para resposta online. Teste seus conhecimentos teóricos e práticos.',
      takeEvalBtn: (num: number) => `Fazer Avaliação do Módulo 0${num}`,
      stageEndCountLabel: 'Encerramento da Etapa em:',
      evalDoneNotice: 'Avaliação da etapa concluída',
      viewEvalBtn: 'Ver Avaliação',
      bonusSectionTitle: 'Apostilas Bônus Exclusivas',
      bonusSectionDesc: `${currentBonusCount} Módulos Especiais`,
      extraVideosTab: 'Vídeos Extras de Estudo',
      extraVideosBtn: '2 Vídeos Extras',
      trainingEvalTab: 'Avaliação de Treinamento',
      trainingEvalBtn: 'Avaliação',
      extraVideosBannerTitle: '2 Vídeos Extras para Estudo',
      extraVideosBannerDesc: 'integrados a esta apostila (análises práticas & estudo de caso)!',
      viewExtraVideosBtn: 'Ver os 2 Vídeos',
      bonusPagesUnit: 'páginas',
      bonusCardBadge: (num: number) => `APOSTILA BÔNUS 0${num}`,
      pdfAvailable: 'PDF Cadastrado e Disponível',
      adminUploadBonusBtn: 'Subir / Atualizar PDF (Admin)',
      bonusUnlockCountLabel: (num: number) => `Liberação do Bônus 0${num} em:`,
      bonusUnlockReq: (num: number) => `Desbloqueia automaticamente com o início do Módulo 0${num}.`,
      bonusReleased: 'Bônus liberado para estudo',
      readBonusBtn: 'Ler Apostila Bônus Online',
      readerIntegratedTitle: 'CINELAB EAD • Leitor Integrado',
      readerProtectedNotice: 'Leitura Online Protegida',
      readerPagesBadge: (count: number) => `CINELAB • ${count} PÁGINAS`,
      readerTabPdf: 'Leitor do PDF Oficial',
      readerTabTopics: 'Leitura Completa (Texto)',
      documentLabel: 'Documento:',
      readerDisclaimer: 'Leitura exclusiva na plataforma CINELAB • Download desativado',
      summaryTitle: 'RESUMO PEDAGÓGICO DA ETAPA:',
      keyPointTitle: 'Ponto Chave de Direção:',
      quizTitle: 'QUIZ DE FIXAÇÃO DO CONTEÚDO (5 QUESTÕES)',
      quizDesc: 'Este quiz serve exclusivamente para fixação do conteúdo da apostila que você acabou de ler.',
      quizImportant: 'Importante: Ele NÃO substitui a avaliação oficial do módulo.',
      quizQuestionPrefix: (num: number) => `QUESTÃO FIXAÇÃO 0${num} DE 5`,
      correctLabel: 'CORRETA',
      explanationTitle: 'Explicação Didática:',
      closeReader: 'Fechar Leitor',
      viewGrid: 'Apostilas & Cronograma',
      viewFolders: 'Pastas & Sub-pastas Didáticas',
    },
    en: {
      badge: 'Exclusive Educational Material',
      title: 'My Cinema Handouts',
      subtitle: `The 10 course didactic handouts and ${currentBonusCount} bonus handouts. Technical and practical content for 100% online reading integrated into CINELAB, calibrated over an immersive 3-month (90-day) schedule.`,
      onlineNotice: 'Exclusive Online Reading on Platform • No Download',
      visitorNotice: 'You are browsing as a guest. To access full handouts and take evaluations:',
      enrollBtn: 'Enroll in CINELAB Now',
      sectionTitle: 'The 10 Course Handouts (3-Month Schedule)',
      sectionDesc: 'Calibrated 90-day schedule by pedagogical workload. Track the real-time countdown for each handout start and the release date of its online evaluation.',
      stagesBadge: '10 Stages • 90 Days',
      locked: 'LOCKED',
      completed: 'COMPLETED',
      evalOpen: 'ASSESSMENT OPEN',
      available: 'AVAILABLE',
      handoutPrefix: 'HANDOUT 0',
      pagesUnit: 'course pages',
      readingOnPlatform: 'Online Reading',
      readOnlineBtn: 'Read Handout Online',
      lockedStartNotice: 'Reading unlocks at the start of this stage',
      startCountLabel: (num: number) => `Handout 0${num} starts in:`,
      officialStart: 'Official Start:',
      handoutStarted: 'Handout started & unlocked',
      evalUnlockCountLabel: 'Assessment Unlocks in:',
      evalOnlineLabel: 'Online Assessment:',
      evalLeadNotice: 'Automatically unlocked 2 to 3 days before this stage ends.',
      evalReleasedTitle: 'ASSESSMENT UNLOCKED!',
      finalStretch: 'Final Stretch',
      evalReleasedDesc: 'The assessment for this stage is open for online answers. Test your theoretical and practical knowledge.',
      takeEvalBtn: (num: number) => `Take Module 0${num} Assessment`,
      stageEndCountLabel: 'Stage Ends in:',
      evalDoneNotice: 'Stage assessment completed',
      viewEvalBtn: 'View Assessment',
      bonusSectionTitle: 'Exclusive Bonus Handouts',
      bonusSectionDesc: `${currentBonusCount} Special Modules`,
      extraVideosTab: 'Extra Study Videos',
      extraVideosBtn: '2 Extra Videos',
      trainingEvalTab: 'Training Drill',
      trainingEvalBtn: 'Evaluation',
      extraVideosBannerTitle: '2 Extra Study Videos',
      extraVideosBannerDesc: 'integrated with this handout (practical breakdowns & case study)!',
      viewExtraVideosBtn: 'Watch Both Videos',
      bonusPagesUnit: 'pages',
      bonusCardBadge: (num: number) => `BONUS HANDOUT 0${num}`,
      pdfAvailable: 'PDF Registered & Available',
      adminUploadBonusBtn: 'Upload / Update PDF (Admin)',
      bonusUnlockCountLabel: (num: number) => `Bonus 0${num} Unlocks in:`,
      bonusUnlockReq: (num: number) => `Unlocks automatically at the start of Module 0${num}.`,
      bonusReleased: 'Bonus unlocked for study',
      readBonusBtn: 'Read Bonus Handout Online',
      readerIntegratedTitle: 'CINELAB Online • Integrated Reader',
      readerProtectedNotice: 'Protected Online Reading',
      readerPagesBadge: (count: number) => `CINELAB • ${count} PAGES`,
      readerTabPdf: 'Official PDF Reader',
      readerTabTopics: 'Complete Booklet (Text)',
      documentLabel: 'Document:',
      readerDisclaimer: 'Exclusive reading on CINELAB platform • Download disabled',
      summaryTitle: 'PEDAGOGICAL STAGE SUMMARY:',
      keyPointTitle: 'Directing Key Point:',
      quizTitle: 'CONTENT REINFORCEMENT QUIZ (5 QUESTIONS)',
      quizDesc: 'This quiz is exclusively for consolidating what you read in this handout.',
      quizImportant: 'Important: It does NOT replace the official module assessment.',
      quizQuestionPrefix: (num: number) => `REINFORCEMENT QUESTION 0${num} OF 5`,
      correctLabel: 'CORRECT',
      explanationTitle: 'Pedagogical Explanation:',
      closeReader: 'Close Reader',
      viewGrid: 'Handouts & Schedule',
      viewFolders: 'Didactic Folders & Sub-folders',
    },
    es: {
      badge: 'Material Didáctico Exclusivo',
      title: 'Mis Manuales de Cine',
      subtitle: `Los 10 manuales didácticos del curso y ${currentBonusCount} manuales bonus. Contenido técnico y práctico de lectura 100% online integrada en CINELAB, calibrado en un cronograma inmersivo de 3 meses (90 días).`,
      onlineNotice: 'Lectura Online Exclusiva en la Plataforma • Sin Descarga',
      visitorNotice: 'Estás navegando como visitante. Para acceder a los manuales completos y responder a las evaluaciones:',
      enrollBtn: 'Matricúlate en CINELAB Ahora',
      sectionTitle: 'Los 10 Manuales del Curso (Cronograma de 3 Meses)',
      sectionDesc: 'Cronograma de 90 días calibrado por volumen pedagógico. Sigue en tiempo real el cronómetro de inicio de cada manual y la fecha de apertura de la evaluación.',
      stagesBadge: '10 Etapas • 90 Días',
      locked: 'BLOQUEADO',
      completed: 'COMPLETADO',
      evalOpen: 'EVALUACIÓN ABIERTA',
      available: 'DISPONIBLE',
      handoutPrefix: 'MANUAL 0',
      pagesUnit: 'páginas didácticas',
      readingOnPlatform: 'Lectura en Plataforma',
      readOnlineBtn: 'Leer Manual Online',
      lockedStartNotice: 'Lectura habilitada al inicio de esta etapa',
      startCountLabel: (num: number) => `Inicio del Manual 0${num} en:`,
      officialStart: 'Inicio Oficial:',
      handoutStarted: 'Manual iniciado y habilitado',
      evalUnlockCountLabel: 'Apertura de la Evaluación en:',
      evalOnlineLabel: 'Evaluación Online:',
      evalLeadNotice: 'Habilitada automáticamente 2 a 3 días antes del final de esta etapa.',
      evalReleasedTitle: '¡EVALUACIÓN HABILITADA!',
      finalStretch: 'Recta Final',
      evalReleasedDesc: 'La evaluación de esta etapa está abierta para responder en línea. Pon a prueba tus conocimientos.',
      takeEvalBtn: (num: number) => `Hacer Evaluación del Módulo 0${num}`,
      stageEndCountLabel: 'Fin de la Etapa en:',
      evalDoneNotice: 'Evaluación de la etapa completada',
      viewEvalBtn: 'Ver Evaluación',
      bonusSectionTitle: 'Manuales Bonus Exclusivos',
      bonusSectionDesc: `${currentBonusCount} Módulos Especiales`,
      extraVideosTab: 'Videos Extras de Estudio',
      extraVideosBtn: '2 Videos Extras',
      trainingEvalTab: 'Evaluación de Entrenamiento',
      trainingEvalBtn: 'Evaluación',
      extraVideosBannerTitle: '2 Videos Extras de Estudio',
      extraVideosBannerDesc: 'integrados con este manual (análisis prácticos y estudio de caso)!',
      viewExtraVideosBtn: 'Ver los 2 Videos',
      bonusPagesUnit: 'páginas',
      bonusCardBadge: (num: number) => `MANUAL BÓNUS 0${num}`,
      pdfAvailable: 'PDF Registrado y Disponible',
      adminUploadBonusBtn: 'Subir / Actualizar PDF (Admin)',
      bonusUnlockCountLabel: (num: number) => `Apertura del Bonus 0${num} en:`,
      bonusUnlockReq: (num: number) => `Se desbloquea automáticamente al inicio del Módulo 0${num}.`,
      bonusReleased: 'Bonus habilitado para estudio',
      readBonusBtn: 'Leer Manual Bonus Online',
      readerIntegratedTitle: 'CINELAB Online • Lector Integrado',
      readerProtectedNotice: 'Lectura Online Protegida',
      readerPagesBadge: (count: number) => `CINELAB • ${count} PÁGINAS`,
      readerTabPdf: 'Lector de PDF Oficial',
      readerTabTopics: 'Lectura Completa (Texto)',
      documentLabel: 'Documento:',
      readerDisclaimer: 'Lectura exclusiva en la plataforma CINELAB • Descarga deshabilitada',
      summaryTitle: 'RESUMEN PEDAGÓGICO DE LA ETAPA:',
      keyPointTitle: 'Punto Clave de Dirección:',
      quizTitle: 'QUIZ DE FIJACIÓN DE CONTENIDOS (5 PREGUNTAS)',
      quizDesc: 'Este cuestionario sirve exclusivamente para afianzar el contenido del manual que acabas de leer.',
      quizImportant: 'Importante: NO sustituye la evaluación oficial del módulo.',
      quizQuestionPrefix: (num: number) => `PREGUNTA DE FIJACIÓN 0${num} DE 5`,
      correctLabel: 'CORRECTA',
      explanationTitle: 'Explicación Didáctica:',
      closeReader: 'Cerrar Lector',
      viewGrid: 'Manuales y Cronograma',
      viewFolders: 'Carpetas y Subcarpetas Didácticas',
    },
    fr: {
      badge: 'Matériel Pédagogique Exclusif',
      title: 'Mes Fascicules de Cinéma',
      subtitle: `Les 10 fascicules pédagogiques du cours et ${currentBonusCount} fascicules bonus. Contenu technique et pratique de lecture 100% en ligne intégrée dans CINELAB, calibré sur un calendrier immersif de 3 mois (90 jours).`,
      onlineNotice: 'Lecture en Ligne Exclusive sur la Plateforme • Sans Téléchargement',
      visitorNotice: 'Vous naviguez en tant que visiteur. Pour accéder aux fascicules complets et passer les évaluations :',
      enrollBtn: 'Inscrivez-vous à CINELAB',
      sectionTitle: 'Les 10 Fascicules du Cours (Calendrier de 3 Mois)',
      sectionDesc: 'Calendrier de 90 jours calibré par charge pédagogique. Suivez en temps réel le compte à rebours de chaque fascicule et la date d\'ouverture de son évaluation.',
      stagesBadge: '10 Étapes • 90 Jours',
      locked: 'VERROUILLÉ',
      completed: 'TERMINÉ',
      evalOpen: 'ÉVALUATION OUVERTE',
      available: 'DISPONIBLE',
      handoutPrefix: 'FASCICULE 0',
      pagesUnit: 'pages de cours',
      readingOnPlatform: 'Lecture en Ligne',
      readOnlineBtn: 'Lire le Fascicule en Ligne',
      lockedStartNotice: 'Lecture débloquée au début de cette étape',
      startCountLabel: (num: number) => `Début du Fascicule 0${num} dans :`,
      officialStart: 'Début Officiel :',
      handoutStarted: 'Fascicule commencé & débloqué',
      evalUnlockCountLabel: 'Ouverture de l\'Évaluation dans :',
      evalOnlineLabel: 'Évaluation en Ligne :',
      evalLeadNotice: 'Débloquée automatiquement 2 à 3 jours avant la fin de cette étape.',
      evalReleasedTitle: 'ÉVALUATION OUVERTE !',
      finalStretch: 'Dernière Ligne Droite',
      evalReleasedDesc: 'L\'évaluation de cette étape est ouverte en ligne. Testez vos connaissances théoriques et pratiques.',
      takeEvalBtn: (num: number) => `Passer l'Évaluation du Module 0${num}`,
      stageEndCountLabel: 'Fin de l\'Étape dans :',
      evalDoneNotice: 'Évaluation de l\'étape terminée',
      viewEvalBtn: 'Voir l\'Évaluation',
      bonusSectionTitle: 'Fascicules Bonus Exclusifs',
      bonusSectionDesc: `${currentBonusCount} Modules Spéciaux`,
      extraVideosTab: "Vidéos Extras d'Étude",
      extraVideosBtn: '2 Vidéos Extras',
      trainingEvalTab: "Évaluation d'Entraînement",
      trainingEvalBtn: 'Évaluation',
      extraVideosBannerTitle: "2 Vidéos Extras d'Étude",
      extraVideosBannerDesc: 'intégrées à ce fascicule (analyses pratiques & étude de cas) !',
      viewExtraVideosBtn: 'Voir les 2 Vidéos',
      bonusPagesUnit: 'pages',
      bonusCardBadge: (num: number) => `FASCICULE BONUS 0${num}`,
      pdfAvailable: 'PDF Enregistré et Disponible',
      adminUploadBonusBtn: 'Téléverser / Mettre à jour le PDF (Admin)',
      bonusUnlockCountLabel: (num: number) => `Ouverture du Bonus 0${num} dans :`,
      bonusUnlockReq: (num: number) => `Se débloque automatiquement au début du Module 0${num}.`,
      bonusReleased: 'Bonus débloqué pour l\'étude',
      readBonusBtn: 'Lire le Fascicule Bonus en Ligne',
      readerIntegratedTitle: 'CINELAB EAD • Lecteur Intégré',
      readerProtectedNotice: 'Lecture en Ligne Protégée',
      readerPagesBadge: (count: number) => `CINELAB • ${count} PAGES`,
      readerTabPdf: 'Lecteur PDF Officiel',
      readerTabTopics: 'Lecture Complète (Texte)',
      documentLabel: 'Document :',
      readerDisclaimer: 'Lecture exclusive sur la plateforme CINELAB • Téléchargement désactivé',
      summaryTitle: 'RÉSUMÉ PÉDAGOGIQUE DE L\'ÉTAPE :',
      keyPointTitle: 'Point Clé de Réalisation :',
      quizTitle: 'QUIZ D\'ASSIMILATION DU CONTENU (5 QUESTIONS)',
      quizDesc: 'Ce quiz sert exclusivement à assimiler le contenu du fascicule que vous venez de lire.',
      quizImportant: 'Important : Il ne remplace PAS l\'évaluation officielle du module.',
      quizQuestionPrefix: (num: number) => `QUESTION D'ASSIMILATION 0${num} SUR 5`,
      correctLabel: 'CORRECTE',
      explanationTitle: 'Explication Pédagogique :',
      closeReader: 'Fermer le Lecteur',
      viewGrid: 'Fascicules & Calendrier',
      viewFolders: 'Dossiers & Sous-dossiers Didactiques',
    },
  };

  const cur = i18n[language] || i18n.pt;

  const bonusTranslations: Record<number, Record<string, { title: string; subtitle: string; summary: string }>> = {
    1: {
      pt: {
        title: 'Glossário Completo de Planos',
        subtitle: 'Guia Permanente de Consulta Técnica e Decupagem Cinematográfica',
        summary: 'Guia permanente de consulta técnica para decupagem cinematográfica, escalas de planos e movimentos de câmera.',
      },
      en: {
        title: 'Complete Shot Glossary',
        subtitle: 'Permanent Technical Reference Guide for Cinematic Framing and Blocking',
        summary: 'Permanent technical reference guide for cinematic coverage, shot scales, and camera movements.',
      },
      es: {
        title: 'Glosario Completo de Planos',
        subtitle: 'Guía Permanente de Consulta Técnica y Decupaje Cinematográfico',
        summary: 'Guía permanente de consulta técnica para decupaje cinematográfico, escalas de planos y movimientos de cámara.',
      },
      fr: {
        title: 'Glossaire Complet des Plans',
        subtitle: 'Guide Permanent de Consultation Technique et Découpage Cinématographique',
        summary: 'Guide permanent de consultation technique pour le découpage, les échelles de plans et mouvements de caméra.',
      },
    },
    2: {
      pt: {
        title: 'Glossário Completo de Roteiro',
        subtitle: 'Guia Permanente de Consulta Dramatúrgica e Estruturação de Histórias',
        summary: 'Guia permanente de consulta dramatúrgica: da criação de premissa, storyline e sinopse à escaleta e roteiro final.',
      },
      en: {
        title: 'Complete Screenwriting Glossary',
        subtitle: 'Permanent Dramaturgical Reference and Story Structuring Guide',
        summary: 'Permanent dramaturgical reference: from premise, storyline, and synopsis to beat sheet and final script.',
      },
      es: {
        title: 'Glosario Completo de Guion',
        subtitle: 'Guía Permanente de Consulta Dramatúrgica y Estructuración de Historias',
        summary: 'Guía permanente de consulta dramatúrgica: desde la premisa, storyline y sinopsis hasta la escaleta y guion final.',
      },
      fr: {
        title: 'Glossaire Complet du Scénario',
        subtitle: 'Guide Permanent de Dramaturgie et Structuration d\'Histoires',
        summary: 'Guide permanent de dramaturgie : de l\'idée, storyline et synopsis au séquencier et scénario final.',
      },
    },
    3: {
      pt: {
        title: 'Método de Análise Fílmica em 6 Camadas',
        subtitle: 'Guia Completo de Análise Crítica e Decupagem de Obras Audiovisuais',
        summary: 'A metodologia analítica do CINELAB em 6 camadas: Narrativa, Personagem, Espaço, Imagem (Fotografia), Som e Montagem para dissecar qualquer obra audiovisual como realizador.',
      },
      en: {
        title: '6-Layer Film Analysis Method',
        subtitle: 'Complete Guide to Critical Film Analysis and Cinematic Decoupage',
        summary: 'The CINELAB 6-layer analytical framework: Narrative, Character, Space, Visuals (Cinematography), Sound, and Editing to dissect any film like a director.',
      },
      es: {
        title: 'Método de Análisis Fílmico en 6 Capas',
        subtitle: 'Guía Completa de Análisis Crítico y Decupaje de Obras Audiovisuales',
        summary: 'La metodología analítica del CINELAB en 6 capas: Narrativa, Personaje, Espacio, Imagen (Fotografía), Sonido y Montaje para desglosar cualquier obra cinematográfica.',
      },
      fr: {
        title: 'Méthode d\'Analyse Filmique en 6 Couches',
        subtitle: 'Guide Complet d\'Analyse Critique et Découpage d\'Œuvres Audiovisuelles',
        summary: 'La méthodologie analytique du CINELAB en 6 couches : Récit, Personnage, Espace, Image, Son et Montage pour disséquer toute œuvre audiovisuelle comme un réalisateur.',
      },
    },
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-neutral-200 space-y-12">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-mono font-medium uppercase tracking-wider">
          <BookOpen className="w-3.5 h-3.5" /> {cur.badge}
        </div>
        <h1 className="text-3xl sm:text-4xl font-display font-extrabold text-white">
          {cur.title}
        </h1>
        <p className="text-xs sm:text-sm text-neutral-300">
          {cur.subtitle}
        </p>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-900 border border-neutral-700/60 text-[11px] font-mono text-amber-400">
          <BookOpen className="w-3.5 h-3.5" /> {cur.onlineNotice}
        </div>

        {!isPaidStudent && (
          <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-neutral-900 via-neutral-900 to-amber-950/40 border-2 border-amber-500/70 text-xs text-amber-200 max-w-2xl mx-auto mt-4 shadow-2xl space-y-3">
            <div className="flex items-center justify-center gap-2 text-amber-400 font-mono font-bold uppercase tracking-wider text-xs">
              <Lock className="w-4 h-4 text-amber-400" />
              <span>Material Didático Protegido • Exclusivo para Alunos Matriculados</span>
            </div>
            <p className="text-xs text-neutral-300 leading-relaxed max-w-xl mx-auto">
              Você está visualizando a ementa pedagógica do curso. O acesso integral ao leitor em alta definição de todas as 10 apostilas em PDF, materiais extras e avaliações práticas é liberado imediatamente após a confirmação da matrícula.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-2.5 pt-1">
              {!isLoggedIn ? (
                <>
                  <button
                    onClick={() => onOpenAuth?.('login')}
                    className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-white font-bold text-xs cursor-pointer border border-neutral-700 transition"
                  >
                    Já sou Aluno • Fazer Login
                  </button>
                  <button
                    onClick={() => onNavigate('matricula')}
                    className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold uppercase tracking-wider text-xs cursor-pointer shadow-lg shadow-amber-500/30 flex items-center justify-center gap-2 transition"
                  >
                    <span>Matricular-se Agora</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </>
              ) : (
                <button
                  onClick={() => onNavigate('matricula')}
                  className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold uppercase tracking-wider text-xs cursor-pointer shadow-lg shadow-amber-500/30 flex items-center justify-center gap-2 transition"
                >
                  <span>Regularizar Matrícula / Pagamento</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        )}

        {/* View Switcher: Grid vs Folders & Sub-folders */}
        <div className="flex items-center justify-center gap-2 p-1.5 bg-neutral-900/90 border border-neutral-800 rounded-2xl max-w-md mx-auto shadow-lg pt-2">
          <button
            onClick={() => setDisplayMode('grid')}
            className={`flex-1 py-2.5 px-4 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
              displayMode === 'grid'
                ? 'bg-amber-500 text-neutral-950 shadow-md shadow-amber-500/20'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            <LayoutGrid className="w-4 h-4" />
            <span>{cur.viewGrid}</span>
          </button>
          <button
            onClick={() => setDisplayMode('folders')}
            className={`flex-1 py-2.5 px-4 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
              displayMode === 'folders'
                ? 'bg-amber-500 text-neutral-950 shadow-md shadow-amber-500/20'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            <Folder className="w-4 h-4" />
            <span>{cur.viewFolders}</span>
          </button>
        </div>
      </div>

      {displayMode === 'folders' ? (
        <FolderExplorer
          onNavigate={onNavigate}
          onOpenApostilaReader={(modNum) => {
            const found = apostilas.find(a => (a.moduleId || a.number) === modNum);
            if (found) {
              handleOpenApostila(found);
            }
          }}
          onOpenApostila={(modNum) => {
            const found = apostilas.find(a => (a.moduleId || a.number) === modNum);
            if (found) {
              handleOpenApostila(found);
            }
          }}
          onOpenBonusReader={(bonusId) => {
            const rawDigits = Number(String(bonusId).replace(/\D/g, ''));
            const bNum = rawDigits > 990 ? rawDigits - 990 : (rawDigits > 0 ? rawDigits : 1);
            const bFound = bonusApostilas.find(b => b.number === bNum);
            const canonicalPdf = bNum === 1
              ? '/materiais/cinelab-bonus-01-glossario-planos.pdf'
              : (bNum === 2 ? '/materiais/cinelab-bonus-02-glossario-roteiro.pdf' : (bNum === 3 ? '/materiais/cinelab-bonus-03-analise-filmica.pdf' : (bFound?.pdfUrl || `/materiais/cinelab-bonus-0${bNum}-historia-do-cinema-complemento.pdf`)));
            const canonicalTitle = bNum === 1
              ? 'Glossário Completo de Planos'
              : (bNum === 2 ? 'Glossário Completo de Roteiro' : (bNum === 3 ? 'Método de Análise Fílmica em 6 Camadas' : `Apostila Bônus 0${bNum}`));
            const pages = bFound?.pagesCount || bFound?.totalPages || (bNum === 1 ? 30 : (bNum === 3 ? 27 : 29));
            handleOpenApostila({
              id: bFound?.id || `bonus-0${bNum}`,
              moduleId: 990 + bNum,
              number: bNum,
              title: bFound?.title || canonicalTitle,
              subtitle: bFound?.code || `BÔNUS 0${bNum}`,
              summary: bFound?.summary || bFound?.description || '',
              totalPages: pages,
              pagesCount: pages,
              pdfUrl: bFound?.pdfUrl || canonicalPdf,
              coverUrl: bFound?.coverUrl || '',
              contentMarkdown: `# BÔNUS 0${bNum} – ${bFound?.title || canonicalTitle}`,
            }, 'pdf');
          }}
          onOpenBonusApostila={(bonusNum) => {
            const bNum = bonusNum;
            const bFound = bonusApostilas.find(b => b.number === bNum);
            const canonicalPdf = bNum === 1
              ? '/materiais/cinelab-bonus-01-glossario-planos.pdf'
              : (bNum === 2 ? '/materiais/cinelab-bonus-02-glossario-roteiro.pdf' : (bNum === 3 ? '/materiais/cinelab-bonus-03-analise-filmica.pdf' : (bFound?.pdfUrl || `/materiais/cinelab-bonus-0${bNum}-historia-do-cinema-complemento.pdf`)));
            const canonicalTitle = bNum === 1
              ? 'Glossário Completo de Planos'
              : (bNum === 2 ? 'Glossário Completo de Roteiro' : (bNum === 3 ? 'Método de Análise Fílmica em 6 Camadas' : `Apostila Bônus 0${bNum}`));
            const pages = bFound?.pagesCount || bFound?.totalPages || (bNum === 1 ? 30 : (bNum === 3 ? 27 : 29));
            handleOpenApostila({
              id: bFound?.id || `bonus-0${bNum}`,
              moduleId: 990 + bNum,
              number: bNum,
              title: bFound?.title || canonicalTitle,
              subtitle: bFound?.code || `BÔNUS 0${bNum}`,
              summary: bFound?.summary || bFound?.description || '',
              totalPages: pages,
              pagesCount: pages,
              pdfUrl: bFound?.pdfUrl || canonicalPdf,
              coverUrl: bFound?.coverUrl || '',
              contentMarkdown: `# BÔNUS 0${bNum} – ${bFound?.title || canonicalTitle}`,
            }, 'pdf');
          }}
          onOpenTrainingQuiz={(modNum) => {
            const found = apostilas.find(a => (a.moduleId || a.number) === modNum);
            if (found) {
              handleOpenTraining(found, modNum);
            }
          }}
          onOpenTraining={(modNum) => {
            const found = apostilas.find(a => (a.moduleId || a.number) === modNum);
            if (found) {
              handleOpenTraining(found, modNum);
            }
          }}
          onOpenEvaluation={(modNum) => {
            onNavigate('avaliacoes', { moduleId: modNum });
          }}
          isPaidStudent={isPaidStudent}
          onRequirePayment={() => setAccessModalOpen(true)}
        />
      ) : (
        <>
        {/* Main 10 Apostilas Section */}
        <div className="space-y-6">
        {/* Section Header with corrected terminology */}
        <div className="border-b border-neutral-800 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-white font-display">
              {cur.sectionTitle}
            </h2>
            <p className="text-xs text-neutral-400 mt-1">
              {cur.sectionDesc}
            </p>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <span className="text-xs font-mono px-3 py-1.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/30">
              {cur.stagesBadge}
            </span>
          </div>
        </div>

        {/* Responsive Grid with side-by-side Timer Panel on desktop */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {apostilas.map((item, idx) => {
            const modNum = item.moduleId || item.number || idx + 1;
            const startMs = item.startDate ? new Date(item.startDate).getTime() : 0;
            const evalMs = item.evalUnlockDate ? new Date(item.evalUnlockDate).getTime() : 0;
            const endMs = item.endDate ? new Date(item.endDate).getTime() : 0;

            const isStarted = effectiveNow >= startMs;
            const isEvaluationOpen = effectiveNow >= evalMs && effectiveNow < endMs;
            const isFinished = effectiveNow >= endMs;
            const isLocked = (!item.isUnlocked || !isStarted) && !isAdmin;

            const trans = getModuleTranslation(modNum);
            const displayTitle = language === 'pt' ? item.title : (trans.title || item.title);
            const displaySubtitle = language === 'pt' ? item.subtitle : (trans.subtitle || item.subtitle);
            const displaySummary = language === 'pt' ? item.summary : (trans.apostilaSummary || trans.summary || item.summary);

            // Compute overall status badge
            let statusBadge = (
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded text-[10px] font-bold bg-neutral-900 text-neutral-400 border border-neutral-700">
                <Lock className="w-2.5 h-2.5 text-neutral-500" /> {cur.locked}
              </span>
            );

            if (isFinished) {
              statusBadge = (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded text-[10px] font-bold bg-neutral-800 text-neutral-300 border border-neutral-700">
                  <CheckCircle2 className="w-2.5 h-2.5 text-emerald-400" /> {cur.completed}
                </span>
              );
            } else if (isEvaluationOpen && !isLocked) {
              statusBadge = (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40 animate-pulse">
                  <Sparkles className="w-2.5 h-2.5 text-amber-400" /> {cur.evalOpen}
                </span>
              );
            } else if (!isLocked) {
              statusBadge = (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded text-[10px] font-bold bg-emerald-950 text-emerald-400 border border-emerald-800">
                  <Unlock className="w-2.5 h-2.5" /> {cur.available}
                </span>
              );
            }

            return (
              <div
                key={item.id || `mod-${modNum}`}
                className={`p-6 rounded-2xl border transition-all flex flex-col justify-between ${
                  isStarted
                    ? 'bg-neutral-900/80 border-neutral-800 hover:border-amber-500/40 shadow-xl'
                    : 'bg-neutral-900/35 border-neutral-800/60'
                }`}
              >
                <div className="flex flex-col sm:flex-row gap-5 items-start">
                  {/* Espaço das DUAS CAPAS (Capa Oficial & Capa Extra) */}
                  <div className="w-full sm:w-60 md:w-68 shrink-0 grid grid-cols-2 gap-2.5 items-start">
                    {/* 1. Capa Oficial */}
                    <div className="flex flex-col items-center">
                      <div className="text-[9px] font-mono font-bold text-amber-400 text-center uppercase tracking-wider mb-1">
                        Apostila {modNum}
                      </div>
                      <div className="relative w-full aspect-[1/1.4] rounded-xl overflow-hidden border border-neutral-700/80 bg-neutral-950 shadow-xl group/cover flex items-center justify-center">
                        {(() => {
                          const fallbackUrl = `/images/covers/apostila-${modNum < 10 ? '0' + modNum : modNum}.jpg`;
                          const effectiveCover = (item.coverUrl && !item.coverUrl.includes('unsplash.com')) ? item.coverUrl : fallbackUrl;
                          return (
                            <img
                              src={effectiveCover}
                              alt={`Capa da ${cur.handoutPrefix}${modNum}`}
                              className="w-full h-full object-cover group-hover/cover:scale-105 transition-transform duration-300"
                              loading="lazy"
                              onError={(e) => {
                                if (e.currentTarget.src !== fallbackUrl && !e.currentTarget.src.endsWith(fallbackUrl)) {
                                  e.currentTarget.src = fallbackUrl;
                                }
                              }}
                            />
                          );
                        })()}

                      </div>
                    </div>

                    {/* 2. Capa Extra (Material Complementar) */}
                    <div className="flex flex-col items-center">
                      <div className="text-[9px] font-mono font-bold text-cyan-400 text-center uppercase tracking-wider mb-1">
                        Capa Extra
                      </div>
                      <div className="relative w-full aspect-[1/1.4] rounded-xl overflow-hidden border border-cyan-500/40 bg-neutral-950 shadow-xl group/cover flex items-center justify-center">
                        {item.extraCoverUrl && !item.extraCoverUrl.startsWith('/uploads/images/') ? (
                          <img
                            src={item.extraCoverUrl}
                            alt={`Capa Extra da ${cur.handoutPrefix}${modNum}`}
                            className="w-full h-full object-cover group-hover/cover:scale-105 transition-transform duration-300"
                            loading="lazy"
                            onError={(e) => {
                              (e.currentTarget as HTMLImageElement).style.display = 'none';
                              const fb = e.currentTarget.parentElement?.querySelector('.extra-cover-fallback') as HTMLElement;
                              if (fb) fb.style.display = 'flex';
                            }}
                          />
                        ) : null}
                        <div
                          className={`extra-cover-fallback w-full h-full bg-gradient-to-b from-neutral-900 via-cyan-950/40 to-neutral-950 p-1.5 flex flex-col items-center justify-center text-center border border-cyan-500/20 ${item.extraCoverUrl && !item.extraCoverUrl.startsWith('/uploads/images/') ? 'hidden' : 'flex'}`}
                        >
                          <BookOpen className="w-5 h-5 text-cyan-400 mb-1 opacity-80" />
                          <span className="text-[8px] font-bold text-cyan-300 uppercase tracking-tight">Capa Extra</span>
                          <span className="text-[8px] font-mono text-cyan-400 mt-0.5">Mod. 0{modNum}</span>
                          <span className="text-[7px] text-neutral-400 mt-0.5 leading-tight line-clamp-2">
                            {item.extraTitle || 'Complementar'}
                          </span>
                        </div>

                      </div>
                    </div>
                    </div>
                  </div>

                  {/* Lado Direito: Informações da Apostila */}
                  <div className="flex-1 min-w-0 space-y-4">
                    {/* Card Header */}
                    <div className="flex items-center justify-between text-xs font-mono">
                      <div className="flex items-center gap-2">
                        <span className="text-amber-400 font-bold tracking-wide">
                          {cur.handoutPrefix}{modNum}
                        </span>
                        {item.durationLabel && (
                          <span className="text-[11px] text-neutral-400 bg-neutral-800/80 px-2 py-0.5 rounded border border-neutral-700/60">
                            {item.durationLabel}
                          </span>
                        )}
                      </div>
                      {statusBadge}
                    </div>

                    {/* Title & Description */}
                    <div>
                      <h3 className="text-base font-bold text-white mb-1 leading-snug">
                        {displayTitle}
                      </h3>
                      {displaySubtitle && (
                        <p className="text-xs font-medium text-amber-300/80 mb-2">
                          {displaySubtitle}
                        </p>
                      )}
                      <p className="text-xs text-neutral-400 leading-relaxed line-clamp-3">
                        {displaySummary}
                      </p>
                    </div>

                    {/* Reading Metadata & Online Reader CTA */}
                    <div className="pt-2 space-y-2">
                      <div className="flex items-center justify-between text-[11px] font-mono text-neutral-400">
                        <span>{(modNum === 3 && item.pagesCount === 7 ? 34 : (item.totalPages || item.pagesCount || (modNum === 3 ? 34 : 30)))} {cur.pagesUnit}</span>
                        <span>{cur.readingOnPlatform}</span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1">
                        <button
                          disabled={isPaidStudent && isLocked}
                          onClick={() => handleOpenApostila(item, 'pdf')}
                          className={`w-full py-2.5 px-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all shadow-md active:scale-98 ${
                            !isPaidStudent
                              ? 'bg-amber-500 hover:bg-amber-400 text-neutral-950 cursor-pointer shadow-amber-500/10'
                              : isLocked
                              ? 'bg-neutral-800 text-neutral-500 opacity-60 cursor-not-allowed border border-neutral-700/50'
                              : 'bg-amber-500 hover:bg-amber-400 text-neutral-950 cursor-pointer shadow-amber-500/10'
                          }`}
                          title={!isPaidStudent ? "Conteúdo Exclusivo para Alunos Matriculados" : isLocked ? `Liberada em ${formatDateTime(item.startDate)}` : "Ler apostila em PDF na plataforma (download protegido)"}
                        >
                          {!isPaidStudent ? <Lock className="w-3.5 h-3.5 shrink-0" /> : isLocked ? <Lock className="w-3.5 h-3.5 shrink-0 text-neutral-500" /> : <BookOpen className="w-3.5 h-3.5 shrink-0" />}
                          <span className="truncate">{!isPaidStudent ? '🔒 Desbloquear (Matrícula)' : isLocked ? 'Bloqueada' : cur.readOnlineBtn}</span>
                        </button>

                        <button
                          disabled={isPaidStudent && isLocked}
                          onClick={() => handleOpenApostila(item, 'extra-videos')}
                          className={`w-full py-2.5 px-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all active:scale-98 ${
                            !isPaidStudent
                              ? 'bg-neutral-800 hover:bg-neutral-700 text-amber-300 border border-neutral-700 hover:border-amber-500/50 cursor-pointer'
                              : isLocked
                              ? 'bg-neutral-800 text-neutral-500 opacity-60 cursor-not-allowed border border-neutral-700/50'
                              : 'bg-neutral-800 hover:bg-neutral-700 text-amber-300 border border-neutral-700 hover:border-amber-500/50 cursor-pointer'
                          }`}
                          title={!isPaidStudent ? "Exclusivo para Alunos Matriculados" : isLocked ? `Liberados em ${formatDateTime(item.startDate)}` : "Assistir aos 2 vídeos extras para estudo desta apostila"}
                        >
                          {!isPaidStudent ? <Lock className="w-3.5 h-3.5 text-amber-400 shrink-0" /> : isLocked ? <Lock className="w-3.5 h-3.5 shrink-0 text-neutral-500" /> : <Film className="w-3.5 h-3.5 text-amber-400 shrink-0" />}
                          <span className="truncate">{!isPaidStudent ? '🔒 Vídeos Extras' : isLocked ? cur.locked : cur.extraVideosBtn}</span>
                        </button>

                        <button
                          disabled={isPaidStudent && isLocked}
                          onClick={() => handleOpenTraining(item, modNum)}
                          className={`w-full py-2.5 px-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all border active:scale-98 ${
                            !isPaidStudent
                              ? 'bg-neutral-800 hover:bg-neutral-700 text-amber-300 border-amber-500/40 hover:border-amber-400 cursor-pointer'
                              : isLocked
                              ? 'bg-neutral-800 text-neutral-500 opacity-60 cursor-not-allowed border-neutral-700/50'
                              : completedTrainings[`etapa-${modNum}`]
                              ? 'bg-emerald-950/50 hover:bg-emerald-900/50 text-emerald-300 border-emerald-600/60 shadow-sm cursor-pointer'
                              : 'bg-neutral-800 hover:bg-neutral-700 text-amber-300 border-amber-500/40 hover:border-amber-400 cursor-pointer'
                          }`}
                          title={!isPaidStudent ? "Exclusivo para Alunos Matriculados" : isLocked ? `Liberada em ${formatDateTime(item.startDate)}` : "Fazer Avaliação de Treinamento prática da etapa"}
                        >
                          {!isPaidStudent ? <Lock className="w-3.5 h-3.5 text-amber-400 shrink-0" /> : isLocked ? <Lock className="w-3.5 h-3.5 shrink-0 text-neutral-500" /> : <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0" />}
                          <span className="truncate">{!isPaidStudent ? '🔒 Treinamento' : isLocked ? cur.locked : cur.trainingEvalBtn}</span>
                          {completedTrainings[`etapa-${modNum}`] && !isLocked && isPaidStudent && (
                            <span className="text-[10px] font-mono bg-emerald-500/20 text-emerald-300 px-1 py-0.2 rounded shrink-0">
                              {completedTrainings[`etapa-${modNum}`].score}/{completedTrainings[`etapa-${modNum}`].total}
                            </span>
                          )}
                        </button>
                      </div>

                      {/* Bloco Dedicado de Apostila Extra (Material Complementar) */}
                      <div className="pt-2">
                        <div className="p-3 rounded-xl border border-cyan-500/30 bg-gradient-to-r from-cyan-950/30 via-neutral-900/90 to-blue-950/20 space-y-2.5">
                          <div className="flex items-center justify-between text-xs">
                            <div className="flex items-center gap-1.5 font-bold text-cyan-300">
                              <BookOpen className="w-3.5 h-3.5 text-cyan-400" />
                              <span>Apostila Extra 0{modNum} (Material Complementar)</span>
                            </div>
                            {item.extraPdfUrl ? (
                              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-bold">
                                ✓ Ativa ({(modNum === 3 && item.extraPagesCount === 34 ? 7 : (item.extraPagesCount ?? (modNum === 3 ? 7 : 0)))} págs)
                              </span>
                            ) : (
                              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-neutral-800 text-neutral-400 border border-neutral-700">
                                Apostila Extra Pendente
                              </span>
                            )}
                          </div>

                          {item.extraPdfUrl ? (
                            <div className="space-y-2">
                              <div className="flex items-center justify-between text-xs text-neutral-300">
                                <span className="font-semibold text-white truncate max-w-[240px]">
                                  {item.extraTitle || `Material Complementar 0${modNum}`}
                                </span>
                                <span className="text-neutral-400 font-mono text-[10px]">
                                  {item.extraFileSizeMb ? `${item.extraFileSizeMb} MB` : ''}
                                </span>
                              </div>
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                <button
                                  disabled={isPaidStudent && isLocked}
                                  onClick={() => handleOpenExtraApostila(item)}
                                  className={`w-full py-2.5 px-3 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition shadow active:scale-98 ${
                                    !isPaidStudent
                                      ? 'bg-cyan-600 hover:bg-cyan-500 text-white cursor-pointer shadow-cyan-500/20'
                                      : isLocked
                                      ? 'bg-neutral-800 text-neutral-500 cursor-not-allowed opacity-60'
                                      : 'bg-cyan-500 hover:bg-cyan-400 text-neutral-950 cursor-pointer shadow-cyan-500/20'
                                  }`}
                                  title={!isPaidStudent ? "Exclusivo para Alunos Matriculados" : isLocked ? `Liberada em ${formatDateTime(item.startDate)}` : "Ler apostila extra em PDF"}
                                >
                                  {!isPaidStudent ? <Lock className="w-3.5 h-3.5" /> : <FileText className="w-3.5 h-3.5" />}
                                  <span>{!isPaidStudent ? '🔒 Desbloquear Extra' : 'Ler Apostila Extra'}</span>
                                </button>
                              </div>
                            </div>
                          ) : (
                            <div className="pt-0.5">
                              <p className="text-[11px] text-neutral-400 italic">
                                Material complementar em preparação pelo professor.
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* DEDICATED TIMELINE & COUNTDOWN PANEL */}
                <div className="mt-5 pt-4 border-t border-neutral-800/80 space-y-3 bg-neutral-950/60 -mx-2 -mb-2 p-3.5 rounded-xl border border-neutral-800/50">
                  {/* Cronômetro 1: Início da Apostila */}
                  {isLocked ? (
                    <div className="space-y-1.5">
                      <DigitalCountdownDisplay
                        targetDateIso={item.startDate}
                        effectiveNow={effectiveNow}
                        label={cur.startCountLabel(modNum)}
                        accent="amber"
                      />
                      <div className="flex items-center justify-between text-[10px] font-mono text-neutral-400 pt-1">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3 text-neutral-400" /> {cur.officialStart}
                        </span>
                        <span className="text-amber-400 font-bold">{formatDateTime(item.startDate)}</span>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between p-2 rounded-lg bg-emerald-950/30 border border-emerald-800/40 text-emerald-300 text-xs font-mono">
                      <span className="flex items-center gap-1.5 text-[11px]">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" /> {cur.handoutStarted}
                      </span>
                      <span className="text-[10px] text-emerald-400/90 font-bold">
                        {formatDate(item.startDate)}
                      </span>
                    </div>
                  )}

                  {/* Cronômetro 2: Liberação da Avaliação */}
                  {effectiveNow < evalMs ? (
                    <div className="pt-2 border-t border-neutral-800/60 space-y-1.5">
                      <DigitalCountdownDisplay
                        targetDateIso={item.evalUnlockDate}
                        effectiveNow={effectiveNow}
                        label={cur.evalUnlockCountLabel}
                        accent="amber"
                      />
                      <div className="flex items-center justify-between text-[10px] font-mono text-neutral-400 pt-0.5">
                        <span className="flex items-center gap-1">
                          <FileQuestion className="w-3 h-3 text-amber-400/80" /> {cur.evalOnlineLabel}
                        </span>
                        <span className="text-amber-300 font-bold">{formatDateTime(item.evalUnlockDate)}</span>
                      </div>
                      <p className="text-[10px] text-neutral-400 italic">
                        {cur.evalLeadNotice}
                      </p>
                    </div>
                  ) : isEvaluationOpen ? (
                    <div className="pt-2 border-t border-neutral-800/60 space-y-2.5">
                      <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/40 space-y-2">
                        <div className="flex items-center justify-between text-xs font-mono text-amber-300 font-bold">
                          <span className="flex items-center gap-1.5">
                            <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse" /> {cur.evalReleasedTitle}
                          </span>
                          <span className="text-[10px] text-amber-400 uppercase">{cur.finalStretch}</span>
                        </div>
                        <p className="text-[11px] text-neutral-300">
                          {cur.evalReleasedDesc}
                        </p>
                        <button
                          onClick={() => onNavigate('avaliacoes', { moduleId: modNum })}
                          className="w-full py-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-neutral-950 rounded-lg text-xs font-extrabold flex items-center justify-center gap-1.5 cursor-pointer shadow transition-all active:scale-98"
                        >
                          <CheckCircle2 className="w-4 h-4" />
                          <span>{cur.takeEvalBtn(modNum)}</span>
                        </button>
                      </div>

                      {/* Countdown to module end */}
                      <DigitalCountdownDisplay
                        targetDateIso={item.endDate}
                        effectiveNow={effectiveNow}
                        label={cur.stageEndCountLabel}
                        accent="amber"
                      />
                    </div>
                  ) : (
                    <div className="pt-2 border-t border-neutral-800/60 flex items-center justify-between text-xs font-mono text-neutral-300">
                      <span className="flex items-center gap-1.5 text-[11px]">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> {cur.evalDoneNotice}
                      </span>
                      <button
                        onClick={() => onNavigate('avaliacoes', { moduleId: modNum })}
                        className="text-amber-400 hover:text-amber-300 text-[11px] font-bold hover:underline cursor-pointer"
                      >
                        {cur.viewEvalBtn}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bonus Apostilas Grid & Upload Section */}
      <div className="space-y-6 pt-6">
        {/* Section Header */}
        <div className="border-b border-neutral-800 pb-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-400" />
            <h2 className="text-lg sm:text-xl font-bold text-white font-display">
              {cur.bonusSectionTitle}
            </h2>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono text-amber-400 font-bold">{cur.bonusSectionDesc}</span>
          </div>
        </div>



        {/* CARDS COM O NOME DAS APOSTILAS E NÚMERO DE PÁGINAS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {bonusApostilas.map((b) => {
            const reqMod = b.requiredModule || (b.number === 1 || b.number === 2 ? 3 : 6);
            const isUnlocked = true;
            const isWaiting = false;

            const bTrans = bonusTranslations[b.number]?.[language] || bonusTranslations[b.number]?.pt;
            const bFallbackTitle = b.number === 1
              ? 'Glossário Completo de Planos'
              : b.number === 2
              ? 'Glossário Completo de Roteiro'
              : b.number === 3
              ? 'Método de Análise Fílmica em 6 Camadas'
              : `Apostila Bônus 0${b.number}`;

            const bDisplayTitle = language === 'pt'
              ? (b.title && !b.title.includes('Pitching') && !b.title.includes('Guerrilha') ? b.title : (bTrans?.title || bFallbackTitle))
              : (bTrans?.title || b.title || bFallbackTitle);

            const bFallbackSummary = b.number === 1
              ? 'Guia permanente de consulta técnica para decupagem cinematográfica, escalas de planos e movimentos de câmera.'
              : b.number === 2
              ? 'Guia permanente de consulta dramatúrgica: da criação de premissa, storyline e sinopse à escaleta e roteiro final.'
              : b.number === 3
              ? 'A metodologia analítica do CINELAB em 6 camadas para dissecar qualquer obra audiovisual como realizador.'
              : 'Material didático complementar do CINELAB.';

            const bDisplaySummary = language === 'pt'
              ? ((b.summary || b.description) && !(b.summary || b.description).includes('empacotamento') && !(b.summary || b.description).includes('Pitching') && !(b.summary || b.description).includes('Guerrilha')
                  ? (b.summary || b.description)
                  : (bTrans?.summary || bFallbackSummary))
              : (bTrans?.summary || b.summary || b.description || bFallbackSummary);
            const displayPages = (b.pagesCount && b.pagesCount !== 4 && b.pagesCount !== 24 && b.pagesCount !== 35 && b.pagesCount !== 40 && b.pagesCount !== 96 && b.pagesCount !== 104) ? b.pagesCount : (b.number === 1 ? 30 : (b.number === 3 ? 27 : (b.number === 2 ? 29 : 30)));
            const canonicalBonusPdf = b.number === 1
              ? '/materiais/cinelab-bonus-01-glossario-planos.pdf'
              : (b.number === 2 ? '/materiais/cinelab-bonus-02-glossario-roteiro.pdf' : (b.number === 3 ? '/materiais/cinelab-bonus-03-analise-filmica.pdf' : (b.pdfUrl || `/materiais/cinelab-bonus-0${b.number}-historia-do-cinema-complemento.pdf`)));
            const safeBonusPdf = (!b.pdfUrl || (b.number <= 3 && (b.pdfUrl.includes('1790444') || b.pdfUrl.includes('1791222')))) ? canonicalBonusPdf : b.pdfUrl;

            return (
              <div
                key={b.id}
                className="p-6 sm:p-7 rounded-3xl bg-neutral-900/80 border-2 border-amber-500/30 hover:border-amber-500/60 transition-all space-y-4 flex flex-col justify-between shadow-xl"
              >
                <div className="flex flex-col sm:flex-row gap-4 items-start">
                  {/* Capa da Apostila Bônus */}
                  <div className="w-full sm:w-28 md:w-32 shrink-0 flex flex-col items-center">
                    <div className="relative w-full aspect-[1/1.4] rounded-xl overflow-hidden border border-amber-500/40 bg-neutral-950 shadow-xl group/cover flex items-center justify-center">
                      {b.coverUrl ? (
                        <img
                          src={b.coverUrl}
                          alt={`Capa da ${b.code || `BÔNUS 0${b.number}`}`}
                          className="w-full h-full object-cover group-hover/cover:scale-105 transition-transform duration-300"
                          loading="lazy"
                        />
                      ) : (
                        <div className="w-full h-full flex flex-col items-center justify-center p-2 text-center bg-gradient-to-b from-neutral-900 to-neutral-950 border border-amber-500/20">
                          <BookOpen className="w-6 h-6 text-amber-500/60 mb-1" />
                          <span className="text-[9px] font-mono font-bold text-amber-400 uppercase tracking-wider">
                            {b.code || `BÔNUS 0${b.number}`}
                          </span>
                          <span className="text-[8px] text-neutral-400 line-clamp-2 mt-0.5">
                            {bDisplayTitle}
                          </span>
                        </div>
                      )}

                    </div>
                  </div>

                  {/* Informações da Apostila Bônus */}
                  <div className="flex-1 min-w-0 space-y-3">
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span className="px-2.5 py-1 rounded-lg bg-amber-500/20 text-amber-300 font-bold border border-amber-500/40">
                        {cur.bonusCardBadge ? cur.bonusCardBadge(b.number) : (b.code || `BÔNUS 0${b.number}`)}
                      </span>
                      {/* NÚMERO DE PÁGINAS DESTACADO */}
                      <span className="px-3 py-1 rounded-lg bg-neutral-800 text-amber-300 font-mono text-xs font-bold border border-neutral-700/80 shadow-inner flex items-center gap-1.5">
                        <BookOpen className="w-3.5 h-3.5 text-amber-400" />
                        <span>{displayPages} {cur.bonusPagesUnit}</span>
                      </span>
                    </div>

                    {/* NOME DA APOSTILA DESTACADO */}
                    <h3 className="text-base sm:text-lg font-bold text-white leading-snug font-display">
                      {bDisplayTitle}
                    </h3>

                    <p className="text-xs text-neutral-300 leading-relaxed line-clamp-2 min-h-[2.5rem]">
                      {bDisplaySummary}
                    </p>

                    <div className="text-[11px] font-mono text-neutral-400 flex items-center gap-1.5 pt-1">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400 font-semibold">{cur.pdfAvailable}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3 pt-3 border-t border-neutral-800/80">
                  <div className="flex items-center justify-between p-2 rounded-lg bg-emerald-950/30 border border-emerald-800/40 text-emerald-300 text-xs font-mono">
                    <span className="flex items-center gap-1.5 text-[11px]">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> {cur.bonusReleased}
                    </span>
                  </div>

                  {/* Botões de Ação: Ler Apostila, Vídeos Extras & Subir/Substituir PDF do Bônus */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <button
                      onClick={() => {
                        handleOpenApostila({
                          id: b.id,
                          moduleId: 990 + b.number,
                          number: b.number,
                          title: bDisplayTitle,
                          subtitle: b.code || `BÔNUS 0${b.number}`,
                          summary: bDisplaySummary,
                          totalPages: displayPages,
                          pagesCount: displayPages,
                          pdfUrl: safeBonusPdf,
                          extraVideos: b.extraVideos,
                          contentMarkdown: `# ${b.code || `APOSTILA BÔNUS 0${b.number}`} – ${bDisplayTitle}\n\n${bDisplaySummary}`,
                        }, 'pdf');
                      }}
                      className={`w-full py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                        !isPaidStudent
                          ? 'bg-amber-500 hover:bg-amber-400 text-neutral-950 shadow-amber-500/10'
                          : 'bg-amber-500 hover:bg-amber-400 text-neutral-950 shadow'
                      }`}
                    >
                      {!isPaidStudent ? <Lock className="w-4 h-4" /> : <BookOpen className="w-4 h-4" />}
                      <span>{!isPaidStudent ? '🔒 Desbloquear (Matrícula)' : cur.readBonusBtn}</span>
                    </button>

                    <button
                      onClick={() => {
                        handleOpenApostila({
                          id: b.id,
                          moduleId: 990 + b.number,
                          number: b.number,
                          title: bDisplayTitle,
                          subtitle: b.code || `BÔNUS 0${b.number}`,
                          summary: bDisplaySummary,
                          totalPages: displayPages,
                          pagesCount: displayPages,
                          pdfUrl: safeBonusPdf,
                          extraVideos: b.extraVideos,
                          contentMarkdown: `# ${b.code || `APOSTILA BÔNUS 0${b.number}`} – ${bDisplayTitle}\n\n${bDisplaySummary}`,
                        }, 'extra-videos');
                      }}
                      className="w-full py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 bg-neutral-800 hover:bg-neutral-700 text-amber-300 border border-neutral-700 hover:border-amber-500/50 transition-all cursor-pointer"
                    >
                      {!isPaidStudent ? <Lock className="w-4 h-4 text-amber-400" /> : <Film className="w-4 h-4 text-amber-400" />}
                      <span>{!isPaidStudent ? '🔒 Vídeos Extras' : cur.extraVideosTab}</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      </>
      )}

      {/* Integrated Modal Reader for Apostila */}
      {selectedApostila && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-4xl max-h-[90vh] bg-[#12141c] border border-neutral-700 rounded-3xl shadow-2xl flex flex-col overflow-hidden text-neutral-200">
            {/* Modal Header */}
            <div className="p-5 border-b border-neutral-800 flex items-center justify-between bg-neutral-900/80">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center">
                  <BookOpen className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white leading-tight">
                    {selectedApostila.title?.includes('Extra') ? selectedApostila.title : (getModuleTranslation(selectedApostila.moduleId || selectedApostila.number).title || selectedApostila.title)}
                  </h3>
                  <span className="text-[11px] font-mono text-neutral-400">
                    {cur.readerIntegratedTitle}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="hidden sm:flex items-center gap-1 px-3 py-1.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-mono">
                  <Shield className="w-3.5 h-3.5 text-amber-400" />
                  <span>{cur.readerProtectedNotice}</span>
                </span>
                <LanguageSelector compact />
                <button
                  onClick={() => setSelectedApostila(null)}
                  className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors cursor-pointer"
                  title={cur.closeReader}
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Modal Content Scrollable Area */}
            <div className="p-4 sm:p-8 overflow-y-auto space-y-5 max-h-[80vh] text-neutral-300 text-xs sm:text-sm leading-relaxed">
              {/* Header Info & View Switcher */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 rounded-xl bg-neutral-900 border border-neutral-800">
                <div className="flex items-center gap-2 font-mono text-xs text-amber-400">
                  <FileText className="w-4 h-4" />
                  <span>{cur.readerPagesBadge(selectedApostila.totalPages || selectedApostila.pagesCount || 30)}</span>
                </div>

                <div className="flex items-center gap-1.5 bg-neutral-950 p-1 rounded-lg border border-neutral-800">
                  {selectedApostila.pdfUrl && (
                    <button
                      onClick={() => setModalTab('pdf')}
                      className={`px-3 py-1 rounded-md text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                        modalTab === 'pdf'
                          ? 'bg-amber-500 text-neutral-950 shadow'
                          : 'text-neutral-400 hover:text-white'
                      }`}
                    >
                      <Shield className="w-3.5 h-3.5" />
                      <span>{cur.readerTabPdf}</span>
                    </button>
                  )}
                  <button
                    onClick={() => setModalTab('text')}
                    className={`px-3 py-1 rounded-md text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                      modalTab === 'text'
                        ? 'bg-amber-500 text-neutral-950 shadow'
                        : 'text-neutral-400 hover:text-white'
                    }`}
                  >
                    <FileText className="w-3.5 h-3.5" />
                    <span>{cur.readerTabTopics}</span>
                  </button>
                  <button
                    onClick={() => setModalTab('extra-videos')}
                    className={`px-3 py-1 rounded-md text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                      modalTab === 'extra-videos'
                        ? 'bg-amber-500 text-neutral-950 shadow'
                        : 'text-neutral-400 hover:text-white'
                    }`}
                  >
                    <Film className="w-3.5 h-3.5 text-amber-400" />
                    <span>{cur.extraVideosTab}</span>
                    <span className="text-[10px] font-mono font-bold px-1.5 py-0.2 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40">
                      2
                    </span>
                  </button>
                  <button
                    onClick={() => {
                      setTrainingApostila(selectedApostila);
                      setTrainingEtapaNumber(selectedApostila.number || selectedApostila.moduleId || 1);
                      setTrainingModalOpen(true);
                    }}
                    className="px-3 py-1 rounded-md text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 bg-neutral-800 hover:bg-neutral-700 text-amber-300 border border-amber-500/30"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                    <span>{cur.trainingEvalTab}</span>
                    {completedTrainings[`etapa-${selectedApostila.number || selectedApostila.moduleId}`] && (
                      <span className="text-[10px] font-mono bg-emerald-500/20 text-emerald-300 px-1 py-0.2 rounded font-bold">
                        {completedTrainings[`etapa-${selectedApostila.number || selectedApostila.moduleId}`].score}/{completedTrainings[`etapa-${selectedApostila.number || selectedApostila.moduleId}`].total}
                      </span>
                    )}
                  </button>
                </div>
              </div>

              {/* 1. PDF EMBEDDED VIEWER (PROTECTED CANVAS RENDERING WITH REAL-TIME AI TRANSLATION) */}
              {selectedApostila.pdfUrl && modalTab === 'pdf' && (
                <div className="space-y-3">
                  {/* Quick-Access Banner to the 2 Extra Study Videos */}
                  <div className="p-3 rounded-xl bg-gradient-to-r from-amber-950/40 via-neutral-900 to-neutral-900 border border-amber-500/30 flex items-center justify-between gap-3 text-xs shadow-md">
                    <div className="flex items-center gap-2.5 text-amber-200">
                      <div className="w-7 h-7 rounded-lg bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 shrink-0">
                        <Film className="w-4 h-4" />
                      </div>
                      <span>
                        <strong className="text-amber-300">{cur.extraVideosBannerTitle}</strong> {cur.extraVideosBannerDesc}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setModalTab('extra-videos')}
                      className="px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold font-mono text-[11px] transition-all cursor-pointer shrink-0 shadow flex items-center gap-1"
                    >
                      <Film className="w-3.5 h-3.5" />
                      <span>{cur.viewExtraVideosBtn}</span>
                    </button>
                  </div>
                  <div className="w-full h-[78vh] min-h-[580px] rounded-2xl border border-neutral-800 overflow-hidden relative shadow-2xl bg-neutral-950">
                    <ProtectedPdfViewer
                      url={selectedApostila.pdfUrl || `/materiais/cinelab-apostila-${(selectedApostila.moduleId || 1) < 10 ? '0' + (selectedApostila.moduleId || 1) : (selectedApostila.moduleId || 1)}.pdf`}
                      pdfBlob={vaultPdfBlob}
                      title={selectedApostila.title}
                      studentName={user?.name || enrollment?.studentName}
                      studentEmail={user?.email || enrollment?.studentEmail}
                      moduleId={
                        (selectedApostila.id?.startsWith('bonus') || selectedApostila.code?.includes('BÔNUS') || (selectedApostila.moduleId && selectedApostila.moduleId > 990))
                          ? (selectedApostila.moduleId && selectedApostila.moduleId > 990 ? selectedApostila.moduleId : 990 + (selectedApostila.number || 1))
                          : (selectedApostila.moduleId || selectedApostila.number || 1)
                      }
                      onFallbackToText={() => setModalTab('text')}
                      allApostilas={apostilas}
                      onSelectApostila={(modNum) => {
                        const target = apostilas.find((a) => (a.number || a.moduleId) === modNum);
                        if (target) {
                          handleOpenApostila(target);
                        }
                      }}
                    />
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-3 bg-neutral-900/60 rounded-xl border border-neutral-800 text-[11px] text-neutral-400 font-mono">
                    <span>{cur.documentLabel} {selectedApostila.pdfUrl.split('/').pop()}</span>
                    <div className="flex items-center gap-3">
                      {isAdmin && (
                        <button
                          type="button"
                          onClick={async () => {
                            const modNum = selectedApostila.moduleId || selectedApostila.number || 1;
                            const isExtra = Boolean((selectedApostila as any).isExtra);
                            const isBonus = Boolean(selectedApostila.id?.startsWith('bonus') || (selectedApostila.moduleId && selectedApostila.moduleId > 990));
                            await purgeVaultPdfBlob(modNum, isBonus, isExtra);
                            setVaultPdfBlob(null);
                            setVaultBlobUrl(null);
                            const canonicalUrl = `/materiais/cinelab-apostila-${modNum < 10 ? '0' + modNum : modNum}.pdf`;
                            setSelectedApostila({
                              ...selectedApostila,
                              pdfUrl: canonicalUrl,
                            });
                            alert('PDF Oficial Restaurado com Sucesso!');
                          }}
                          className="px-2.5 py-1 rounded-md bg-neutral-800 hover:bg-neutral-700 text-amber-300 border border-amber-500/30 text-[10px] font-bold cursor-pointer transition flex items-center gap-1"
                          title="Restaurar arquivo PDF original oficial da escola"
                        >
                          <RefreshCw className="w-3 h-3 text-amber-400" />
                          <span>Restaurar PDF Oficial</span>
                        </button>
                      )}
                      <span className="text-amber-300 flex items-center gap-1.5 font-sans">
                        <Shield className="w-3.5 h-3.5 text-amber-400" />
                        <span>{cur.readerDisclaimer}</span>
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* 2. TEXT TOPICS & QUIZ */}
              {(!selectedApostila.pdfUrl || modalTab === 'text') && (
                <div className="space-y-6">
                <div>
                  <h1 className="text-xl sm:text-2xl font-display font-extrabold text-white">
                    {getModuleTranslation(selectedApostila.moduleId || selectedApostila.number).title || selectedApostila.title}
                  </h1>
                  <p className="text-sm font-medium text-amber-300 mt-1">
                    {getModuleTranslation(selectedApostila.moduleId || selectedApostila.number).subtitle || selectedApostila.subtitle}
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-amber-950/20 border-l-4 border-amber-500 text-xs text-amber-100">
                  <strong className="block text-amber-400 font-bold mb-1">{cur.summaryTitle}</strong>
                  {getModuleTranslation(selectedApostila.moduleId || selectedApostila.number).apostilaSummary ||
                   getModuleTranslation(selectedApostila.moduleId || selectedApostila.number).summary ||
                   selectedApostila.summary}
                </div>

                {/* Pedagogical Sections with dynamic translations */}
                {(() => {
                  const translatedSections = getTranslatedApostilaSections(
                    selectedApostila.sections || [],
                    selectedApostila.moduleId || selectedApostila.number,
                    language
                  );
                  if (translatedSections && translatedSections.length > 0) {
                    return (
                      <div className="space-y-6 pt-2">
                        {translatedSections.map((sec, sIdx) => (
                          <div key={sec.id || sIdx} className="p-6 rounded-2xl bg-neutral-900/60 border border-neutral-800 space-y-3">
                            <div className="flex items-center gap-2">
                              <span className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-400 font-mono text-xs flex items-center justify-center font-bold">
                                {sIdx + 1}
                              </span>
                              <h3 className="text-base font-bold text-white font-display">{sec.title}</h3>
                            </div>
                            <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed whitespace-pre-line">
                              {sec.content || sec.contentMarkdown}
                            </p>
                            {(sec.keyTakeaway || sec.tonyNotes) && (
                              <div className="p-3 rounded-lg bg-amber-950/30 border border-amber-500/30 text-amber-300 text-xs">
                                <strong className="font-mono uppercase text-amber-400">{cur.keyPointTitle} </strong>
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
                    );
                  }
                  return (
                    <div className="space-y-4 text-xs sm:text-sm text-neutral-300 leading-relaxed font-sans pt-2">
                      <p>
                        {selectedApostila.contentMarkdown || 'Conteúdo teórico completo da apostila disponível para estudo.'}
                      </p>
                    </div>
                  );
                })()}

                {/* Quiz de Fixação da Apostila com Tradução */}
                {(() => {
                  const trainingQuestions = getTrainingQuestionsForModule(
                    selectedApostila.moduleId || selectedApostila.number,
                    language
                  );
                  const questionsToShow = trainingQuestions && trainingQuestions.length > 0
                    ? trainingQuestions
                    : (selectedApostila.quiz || []);

                  if (!questionsToShow || questionsToShow.length === 0) return null;

                  return (
                    <div className="pt-6 border-t border-neutral-800 space-y-6">
                      <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 space-y-2">
                        <div className="flex items-center gap-2 text-amber-400 font-mono text-xs font-bold">
                          <Sparkles className="w-4 h-4" />
                          <span>{cur.quizTitle}</span>
                        </div>
                        <p className="text-xs text-neutral-300 leading-relaxed">
                          {cur.quizDesc}
                          <strong className="text-amber-300 font-bold block mt-1">
                            {cur.quizImportant}
                          </strong>
                        </p>
                      </div>

                      <div className="space-y-4">
                        {questionsToShow.map((q: any, qIdx: number) => {
                          const questionText = q.question || q.prompt || q.statement;
                          const options = q.options || [];
                          const correctIdx = q.correctAnswerIndex ?? q.correctOptionIndex ?? 0;

                          return (
                            <div key={q.id || qIdx} className="p-5 rounded-2xl bg-neutral-900 border border-neutral-800 space-y-3">
                              <div className="flex items-center justify-between text-xs font-mono">
                                <span className="text-amber-400 font-bold">{cur.quizQuestionPrefix(qIdx + 1)}</span>
                              </div>
                              <p className="text-xs sm:text-sm font-semibold text-white">{questionText}</p>
                              <div className="space-y-2 pt-1">
                                {options.map((opt: string, oIdx: number) => (
                                  <div
                                    key={oIdx}
                                    className={`p-3 rounded-xl border text-xs leading-relaxed transition-all cursor-pointer ${
                                      oIdx === correctIdx
                                        ? 'bg-emerald-950/40 border-emerald-500/60 text-emerald-200 font-medium'
                                        : 'bg-neutral-950/50 border-neutral-800 text-neutral-400 hover:border-neutral-700'
                                    }`}
                                  >
                                    <div className="flex items-start gap-2">
                                      <span className="font-mono font-bold text-neutral-400">
                                        {String.fromCharCode(65 + oIdx)})
                                      </span>
                                      <span>{opt}</span>
                                      {oIdx === correctIdx && (
                                        <span className="ml-auto text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-900 text-emerald-300 font-bold">
                                          {cur.correctLabel}
                                        </span>
                                      )}
                                    </div>
                                  </div>
                                ))}
                              </div>
                              {q.explanation && (
                                <div className="p-3 rounded-lg bg-[#12141c] border border-neutral-800 text-xs text-neutral-400 leading-relaxed">
                                  <strong className="text-amber-400 block font-mono text-[11px] mb-0.5">{cur.explanationTitle}</strong>
                                  {q.explanation}
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })()}
              </div>
            )}

            {/* 3. VÍDEOS EXTRAS PARA ESTUDO (2 LOCAIS EXCLUSIVOS COM UPLOAD) */}
            {modalTab === 'extra-videos' && (
              <ApostilaExtraVideosSection
                apostila={selectedApostila}
                isAdmin={isAdmin}
                onApostilaUpdated={(updated) => {
                  setSelectedApostila(updated);
                  setApostilas((prev) =>
                    prev.map((a) => (a.id === updated.id || a.moduleId === updated.moduleId ? { ...a, ...updated } : a))
                  );
                  setBonusApostilas((prev) =>
                    prev.map((b) => (b.id === updated.id || b.number === updated.number ? { ...b, ...updated } : b))
                  );
                }}
              />
            )}
            </div>
          </div>
        </div>
      )}

      {/* Interactive Training Evaluation Modal */}
      <TrainingEvaluationModal
        isOpen={trainingModalOpen}
        onClose={() => {
          setTrainingModalOpen(false);
          setTrainingApostila(null);
        }}
        apostila={trainingApostila}
        user={user}
        etapaNumber={trainingEtapaNumber}
        onNavigateToCourseEvaluation={(modId) => {
          setTrainingModalOpen(false);
          setSelectedApostila(null);
          onNavigate('avaliacao', { moduleId: modId });
        }}
      />

      {/* Student Enrollment / Payment Required Modal */}
      {accessModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-fadeIn">
          <div className="relative w-full max-w-lg p-6 sm:p-8 bg-neutral-900 border border-neutral-800 rounded-3xl shadow-2xl text-center space-y-5">
            <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center mx-auto text-amber-400 shadow-inner">
              <Shield className="w-8 h-8 text-amber-400" />
            </div>

            <div className="space-y-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40">
                <Lock className="w-3.5 h-3.5 text-amber-400" />
                Acesso Exclusivo para Alunos Matriculados
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-white font-display">
                Material Didático Protegido
              </h3>
              <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed max-w-md mx-auto">
                Quem for aluno e pagou poderá visualizar todas as apostilas completas em alta definição e responder às avaliações práticas de treinamento.
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-neutral-950/80 border border-neutral-800 text-xs text-neutral-300 flex items-center gap-2.5 justify-start text-left">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>
                <strong>Leitor Integrado Sem Download:</strong> Leitura segura e avaliações de treinamento exclusivas na plataforma CINELAB.
              </span>
            </div>

            <div className="flex flex-col sm:flex-row gap-2.5 pt-2">
              {!isLoggedIn ? (
                <>
                  <button
                    onClick={() => {
                      setAccessModalOpen(false);
                      onOpenAuth?.('login');
                    }}
                    className="flex-1 py-3 bg-neutral-800 hover:bg-neutral-700 text-white rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-2"
                  >
                    <span>Fazer Login de Aluno</span>
                  </button>
                  <button
                    onClick={() => {
                      setAccessModalOpen(false);
                      onNavigate('matricula');
                    }}
                    className="flex-1 py-3 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-neutral-950 rounded-xl text-xs font-bold transition-all cursor-pointer shadow-md flex items-center justify-center gap-2"
                  >
                    <span>Realizar Matrícula</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </>
              ) : (
                <button
                  onClick={() => {
                    setAccessModalOpen(false);
                    onNavigate('matricula');
                  }}
                  className="w-full py-3 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-neutral-950 rounded-xl text-xs font-bold transition-all cursor-pointer shadow-md flex items-center justify-center gap-2"
                >
                  <span>Regularizar Matrícula / Pagamento</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </div>

            <button
              onClick={() => setAccessModalOpen(false)}
              className="text-xs text-neutral-500 hover:text-neutral-400 transition-colors cursor-pointer block mx-auto pt-1"
            >
              Voltar ao painel de apostilas
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
