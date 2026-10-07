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
  saveApostilaToVault,
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
  Plus,
  AlertCircle,
  Loader2,
  Download,
  RotateCcw,
  LayoutGrid,
  Folder,
  ChevronLeft,
  ChevronRight,
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

  useEffect(() => {
    try {
      const stored = localStorage.getItem('cinelab_training_evaluations');
      if (stored) {
        setCompletedTrainings(JSON.parse(stored));
      }
    } catch {}
  }, [trainingModalOpen]);

  const handleOpenApostila = (item: Apostila, defaultTab: "pdf" | "text" | "quiz" | "extra-videos" = "pdf") => {
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
        : (bNum === 3 ? '/materiais/cinelab-bonus-03-analise-filmica.pdf' : '/materiais/cinelab-bonus-02-glossario-roteiro.pdf');
      const realBonusPages = bNum === 1 ? 30 : (bNum === 3 ? 27 : 29);
      fullItem.moduleId = 990 + bNum;
      fullItem.pdfUrl = canonicalBonusPdf;
      fullItem.totalPages = realBonusPages;
      fullItem.pagesCount = realBonusPages;
      fullItem.isUnlocked = true;
    }

    const startMs = (!isBonusItem && fullItem.startDate) ? new Date(fullItem.startDate).getTime() : 0;
    const isLocked = !isBonusItem && (!fullItem.isUnlocked || (startMs > 0 && effectiveNow < startMs)) && !isAdmin;

    if (isLocked) {
      alert(`Esta apostila e seus vídeos serão liberados de acordo com o cronograma pedagógico em ${formatDateTime(fullItem.startDate)}.`);
      return;
    }

    setSelectedApostila(fullItem as Apostila);
    setModalTab(defaultTab);
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
    setVaultBlobUrl(null);
    if (selectedApostila) {
      const isBonus = (selectedApostila as any).id?.startsWith('bonus') ||
                      (selectedApostila as any).code?.includes('BÔNUS') ||
                      (selectedApostila.moduleId && selectedApostila.moduleId > 990);
      const bNum = selectedApostila.number || (selectedApostila.moduleId ? selectedApostila.moduleId - 990 : 1);
      const targetId = isBonus ? `bonus-${bNum}` : (selectedApostila.moduleId || selectedApostila.number);
      getVaultBlobUrl(targetId, isBonus).then((bUrl) => {
        if (active) {
          setVaultBlobUrl(bUrl || null);
        }
      });
    }
    return () => {
      active = false;
    };
  }, [selectedApostila?.moduleId, selectedApostila?.number, selectedApostila?.id]);

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
          return {
            ...a,
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
            totalPages: a.totalPages || a.pagesCount || ((a.moduleId || a.number) === 1 ? 8 : ((a.moduleId || a.number) === 5 ? 6 : 4)),
            pagesCount: a.pagesCount || a.totalPages || ((a.moduleId || a.number) === 1 ? 8 : ((a.moduleId || a.number) === 5 ? 6 : 4)),
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
            title: `Apostila 0${num} – ${m.title}`,
            subtitle: m.subtitle,
            summary: m.summary,
            totalPages: num === 1 ? 8 : (num === 5 ? 6 : 4),
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

  const i18n = {
    pt: {
      badge: 'Material Didático Exclusivo',
      title: 'Minhas Apostilas de Cinema',
      subtitle: 'As 10 apostilas didáticas do curso e 3 apostilas bônus. Conteúdo técnico e prático de leitura 100% online integrada na plataforma CINELAB, calibrado em um cronograma imersivo de 3 meses (90 dias).',
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
      bonusSectionDesc: '3 Módulos Especiais',
      extraVideosTab: 'Vídeos Extras de Estudo',
      extraVideosBtn: '2 Vídeos Extras',
      trainingEvalTab: 'Avaliação de Treinamento',
      trainingEvalBtn: 'Avaliação',
      extraVideosBannerTitle: '2 Vídeos Extras para Estudo',
      extraVideosBannerDesc: 'integrados a esta apostila (análises práticas & estudo de caso)!',
      viewExtraVideosBtn: 'Ver os 2 Vídeos',
      bonusPagesUnit: 'páginas',
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
      subtitle: 'The 10 course didactic handouts and 3 bonus handouts. Technical and practical content for 100% online reading integrated into CINELAB, calibrated over an immersive 3-month (90-day) schedule.',
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
      bonusSectionDesc: '3 Special Modules',
      extraVideosTab: 'Extra Study Videos',
      extraVideosBtn: '2 Extra Videos',
      trainingEvalTab: 'Training Drill',
      trainingEvalBtn: 'Evaluation',
      extraVideosBannerTitle: '2 Extra Study Videos',
      extraVideosBannerDesc: 'integrated with this handout (practical breakdowns & case study)!',
      viewExtraVideosBtn: 'Watch Both Videos',
      bonusPagesUnit: 'pages',
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
      subtitle: 'Los 10 manuales didácticos del curso y 3 manuales bonus. Contenido técnico y práctico de lectura 100% online integrada en CINELAB, calibrado en un cronograma inmersivo de 3 meses (90 días).',
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
      bonusSectionDesc: '3 Módulos Especiales',
      extraVideosTab: 'Videos Extras de Estudio',
      extraVideosBtn: '2 Videos Extras',
      trainingEvalTab: 'Evaluación de Entrenamiento',
      trainingEvalBtn: 'Evaluación',
      extraVideosBannerTitle: '2 Videos Extras de Estudio',
      extraVideosBannerDesc: 'integrados con este manual (análisis prácticos y estudio de caso)!',
      viewExtraVideosBtn: 'Ver los 2 Videos',
      bonusPagesUnit: 'páginas',
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
      subtitle: 'Les 10 fascicules pédagogiques du cours et 3 fascicules bonus. Contenu technique et pratique de lecture 100% en ligne intégrée dans CINELAB, calibré sur un calendrier immersif de 3 mois (90 jours).',
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
      bonusSectionDesc: '3 Modules Spéciaux',
      extraVideosTab: "Vidéos Extras d'Étude",
      extraVideosBtn: '2 Vidéos Extras',
      trainingEvalTab: "Évaluation d'Entraînement",
      trainingEvalBtn: 'Évaluation',
      extraVideosBannerTitle: "2 Vidéos Extras d'Étude",
      extraVideosBannerDesc: 'intégrées à ce fascicule (analyses pratiques & étude de cas) !',
      viewExtraVideosBtn: 'Voir les 2 Vidéos',
      bonusPagesUnit: 'pages',
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

        {!isLoggedIn && (
          <div className="p-4 rounded-xl bg-amber-950/30 border border-amber-800/40 text-xs text-amber-200 max-w-lg mx-auto mt-4">
            <span>{cur.visitorNotice}</span>
            <div className="pt-2">
              <button
                onClick={() => onNavigate('matricula')}
                className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold uppercase rounded-lg text-xs cursor-pointer"
              >
                {cur.enrollBtn}
              </button>
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
            const bNum = bonusId.includes('3') ? 3 : bonusId.includes('2') ? 2 : 1;
            const bFound = bonusApostilas.find(b => b.number === bNum);
            const canonicalPdf = bNum === 1
              ? '/materiais/cinelab-bonus-01-glossario-planos.pdf'
              : (bNum === 3 ? '/materiais/cinelab-bonus-03-analise-filmica.pdf' : '/materiais/cinelab-bonus-02-glossario-roteiro.pdf');
            const canonicalTitle = bNum === 1
              ? 'Glossário Completo de Planos'
              : (bNum === 3 ? 'Método de Análise Fílmica em 6 Camadas' : 'Glossário Completo de Roteiro');
            const pages = bNum === 1 ? 30 : (bNum === 3 ? 27 : 29);
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
              contentMarkdown: `# BÔNUS 0${bNum} – ${canonicalTitle}`,
            }, 'pdf');
          }}
          onOpenBonusApostila={(bonusNum) => {
            const bNum = bonusNum;
            const bFound = bonusApostilas.find(b => b.number === bNum);
            const canonicalPdf = bNum === 1
              ? '/materiais/cinelab-bonus-01-glossario-planos.pdf'
              : (bNum === 3 ? '/materiais/cinelab-bonus-03-analise-filmica.pdf' : '/materiais/cinelab-bonus-02-glossario-roteiro.pdf');
            const canonicalTitle = bNum === 1
              ? 'Glossário Completo de Planos'
              : (bNum === 3 ? 'Método de Análise Fílmica em 6 Camadas' : 'Glossário Completo de Roteiro');
            const pages = bNum === 1 ? 30 : (bNum === 3 ? 27 : 29);
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
              contentMarkdown: `# BÔNUS 0${bNum} – ${canonicalTitle}`,
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
                <div className="space-y-4">
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
                      <span>{item.totalPages || item.pagesCount || 30} {cur.pagesUnit}</span>
                      <span>{cur.readingOnPlatform}</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1">
                      <button
                        disabled={isLocked}
                        onClick={() => handleOpenApostila(item, 'pdf')}
                        className={`w-full py-2.5 px-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all shadow-md active:scale-98 ${
                          isLocked
                            ? 'bg-neutral-800 text-neutral-500 opacity-60 cursor-not-allowed border border-neutral-700/50'
                            : 'bg-amber-500 hover:bg-amber-400 text-neutral-950 cursor-pointer shadow-amber-500/10'
                        }`}
                        title={isLocked ? `Liberada em ${formatDateTime(item.startDate)}` : "Ler apostila em PDF na plataforma (download protegido)"}
                      >
                        {isLocked ? <Lock className="w-3.5 h-3.5 shrink-0 text-neutral-500" /> : <BookOpen className="w-3.5 h-3.5 shrink-0" />}
                        <span className="truncate">{isLocked ? 'Bloqueada' : cur.readOnlineBtn}</span>
                      </button>

                      <button
                        disabled={isLocked}
                        onClick={() => handleOpenApostila(item, 'extra-videos')}
                        className={`w-full py-2.5 px-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all active:scale-98 ${
                          isLocked
                            ? 'bg-neutral-800 text-neutral-500 opacity-60 cursor-not-allowed border border-neutral-700/50'
                            : 'bg-neutral-800 hover:bg-neutral-700 text-amber-300 border border-neutral-700 hover:border-amber-500/50 cursor-pointer'
                        }`}
                        title={isLocked ? `Liberados em ${formatDateTime(item.startDate)}` : "Assistir aos 2 vídeos extras para estudo desta apostila"}
                      >
                        {isLocked ? <Lock className="w-3.5 h-3.5 shrink-0 text-neutral-500" /> : <Film className="w-3.5 h-3.5 text-amber-400 shrink-0" />}
                        <span className="truncate">{isLocked ? cur.locked : cur.extraVideosBtn}</span>
                      </button>

                      <button
                        disabled={isLocked}
                        onClick={() => handleOpenTraining(item, modNum)}
                        className={`w-full py-2.5 px-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all border active:scale-98 ${
                          isLocked
                            ? 'bg-neutral-800 text-neutral-500 opacity-60 cursor-not-allowed border-neutral-700/50'
                            : completedTrainings[`etapa-${modNum}`]
                            ? 'bg-emerald-950/50 hover:bg-emerald-900/50 text-emerald-300 border-emerald-600/60 shadow-sm cursor-pointer'
                            : 'bg-neutral-800 hover:bg-neutral-700 text-amber-300 border-amber-500/40 hover:border-amber-400 cursor-pointer'
                        }`}
                        title={isLocked ? `Liberada em ${formatDateTime(item.startDate)}` : "Fazer Avaliação de Treinamento prática da etapa"}
                      >
                        {isLocked ? <Lock className="w-3.5 h-3.5 shrink-0 text-neutral-500" /> : <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0" />}
                        <span className="truncate">{isLocked ? cur.locked : cur.trainingEvalBtn}</span>
                        {completedTrainings[`etapa-${modNum}`] && !isLocked && (
                          <span className="text-[10px] font-mono bg-emerald-500/20 text-emerald-300 px-1 py-0.2 rounded shrink-0">
                            {completedTrainings[`etapa-${modNum}`].score}/{completedTrainings[`etapa-${modNum}`].total}
                          </span>
                        )}
                      </button>
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
            {isAdmin && (
              <button
                type="button"
                onClick={() => setShowBonusUploadForm(!showBonusUploadForm)}
                className="px-3 py-1.5 bg-amber-500/20 hover:bg-amber-500 border border-amber-500/50 hover:border-amber-400 text-amber-300 hover:text-neutral-950 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 shadow-sm"
                id="btn-toggle-bonus-upload"
              >
                <Upload className="w-3.5 h-3.5" />
                <span>{showBonusUploadForm ? 'Ocultar Painel de Upload' : 'Subir Apostila Bônus (Admin)'}</span>
              </button>
            )}
          </div>
        </div>

        {/* LOCAL PARA SUBIR AS APOSTILAS BÔNUS (RESTRITO AO ADMIN) */}
        {isAdmin && showBonusUploadForm && (
          <div
            id="bonus-upload-section"
            className="p-6 sm:p-7 rounded-3xl bg-[#0e1017] border-2 border-amber-500/40 space-y-5 shadow-2xl animate-fadeIn"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-neutral-800 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-amber-500/20 border border-amber-500/40 text-amber-400 flex items-center justify-center shrink-0">
                  <Upload className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm sm:text-base font-bold text-white font-display flex items-center gap-2">
                    <span>Central de Upload de Apostilas Bônus</span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-amber-500/10 border border-amber-500/30 text-amber-400">
                      PDF Oficial
                    </span>
                  </h3>
                  <p className="text-xs text-neutral-400 mt-0.5">
                    Envie o arquivo PDF com o nome da apostila e número de páginas para publicação imediata no sistema.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => selectBonusForUpload(1)}
                  className={`px-2.5 py-1 text-xs rounded-lg font-mono transition-all cursor-pointer ${
                    bonusUploadTargetNumber === 1
                      ? 'bg-amber-500 text-neutral-950 font-bold shadow'
                      : 'bg-neutral-900 text-neutral-300 hover:text-white border border-neutral-700'
                  }`}
                >
                  Bônus 01
                </button>
                <button
                  type="button"
                  onClick={() => selectBonusForUpload(2)}
                  className={`px-2.5 py-1 text-xs rounded-lg font-mono transition-all cursor-pointer ${
                    bonusUploadTargetNumber === 2
                      ? 'bg-amber-500 text-neutral-950 font-bold shadow'
                      : 'bg-neutral-900 text-neutral-300 hover:text-white border border-neutral-700'
                  }`}
                >
                  Bônus 02
                </button>
                <button
                  type="button"
                  onClick={() => selectBonusForUpload(3)}
                  className={`px-2.5 py-1 text-xs rounded-lg font-mono transition-all cursor-pointer ${
                    bonusUploadTargetNumber === 3
                      ? 'bg-amber-500 text-neutral-950 font-bold shadow'
                      : 'bg-neutral-900 text-neutral-300 hover:text-white border border-neutral-700'
                  }`}
                >
                  + Novo Bônus 03
                </button>
              </div>
            </div>

            {bonusUploadMessage && (
              <div
                className={`p-4 rounded-xl text-xs flex items-center justify-between gap-3 ${
                  bonusUploadMessage.type === 'success'
                    ? 'bg-emerald-950/70 border border-emerald-700 text-emerald-300'
                    : 'bg-red-950/70 border border-red-700 text-red-300'
                }`}
              >
                <div className="flex items-center gap-2">
                  {bonusUploadMessage.type === 'success' ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  ) : (
                    <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                  )}
                  <span>{bonusUploadMessage.text}</span>
                </div>
                <button
                  type="button"
                  onClick={() => setBonusUploadMessage(null)}
                  className="text-neutral-400 hover:text-white cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            )}

            <form onSubmit={handleUploadBonusApostila} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                {/* Selecionar Bônus Alvo */}
                <div className="md:col-span-3">
                  <label className="block text-xs font-mono text-neutral-300 mb-1 font-bold">
                    Identificação do Bônus:
                  </label>
                  <select
                    value={bonusUploadTargetNumber}
                    onChange={(e) => selectBonusForUpload(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-neutral-900 border border-neutral-700 rounded-xl text-white text-xs focus:border-amber-500 focus:outline-none font-sans"
                  >
                    <option value={1}>Apostila Bônus 01 (Glossário de Planos - 30 págs)</option>
                    <option value={2}>Apostila Bônus 02 (Glossário de Roteiro - 29 págs)</option>
                    <option value={3}>Apostila Bônus 03 (Método de Análise Fílmica em 6 Camadas - 27 págs)</option>
                    <option value={4}>Nova Apostila Bônus 04</option>
                  </select>
                </div>

                {/* Nome da Apostila */}
                <div className="md:col-span-6">
                  <label className="block text-xs font-mono text-neutral-300 mb-1 font-bold">
                    Nome da Apostila Bônus: <span className="text-amber-400">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={bonusUploadTitle}
                    onChange={(e) => setBonusUploadTitle(e.target.value)}
                    placeholder="Ex: Glossário Completo de Planos"
                    className="w-full px-3 py-2 bg-neutral-900 border border-neutral-700 rounded-xl text-white text-xs focus:border-amber-500 focus:outline-none font-sans"
                  />
                </div>

                {/* Número de Páginas */}
                <div className="md:col-span-3">
                  <label className="block text-xs font-mono text-neutral-300 mb-1 font-bold">
                    Número de Páginas: <span className="text-amber-400">*</span>
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="999"
                    required
                    value={bonusUploadPages}
                    onChange={(e) => setBonusUploadPages(Number(e.target.value))}
                    placeholder="Ex: 30"
                    className="w-full px-3 py-2 bg-neutral-900 border border-neutral-700 rounded-xl text-white text-xs focus:border-amber-500 focus:outline-none font-mono"
                  />
                </div>

                {/* Descrição / Ementa */}
                <div className="md:col-span-12">
                  <label className="block text-xs font-mono text-neutral-300 mb-1">
                    Descrição / Ementa Resumida:
                  </label>
                  <textarea
                    rows={2}
                    value={bonusUploadDescription}
                    onChange={(e) => setBonusUploadDescription(e.target.value)}
                    placeholder="Resumo pedagógico dos temas tratados nesta apostila bônus..."
                    className="w-full px-3 py-2 bg-neutral-900 border border-neutral-700 rounded-xl text-white text-xs focus:border-amber-500 focus:outline-none font-sans resize-none"
                  />
                </div>

                {/* Seletor de Arquivo PDF */}
                <div className="md:col-span-12">
                  <label className="block text-xs font-mono text-neutral-300 mb-1 font-bold">
                    Arquivo PDF da Apostila: <span className="text-amber-400">*</span>
                  </label>
                  <div className="flex flex-col sm:flex-row gap-3 items-stretch">
                    <label className="flex-1 p-4 bg-neutral-900/90 hover:bg-neutral-900 border-2 border-dashed border-neutral-700 hover:border-amber-500/80 rounded-2xl cursor-pointer text-xs font-sans text-neutral-300 flex flex-col sm:flex-row items-center justify-center gap-3 transition-all">
                      <FileText className="w-6 h-6 text-amber-400 shrink-0" />
                      <div className="text-center sm:text-left">
                        {bonusUploadFile ? (
                          <div>
                            <span className="font-bold text-white block">{bonusUploadFile.name}</span>
                            <span className="text-[11px] font-mono text-amber-400">
                              {(bonusUploadFile.size / (1024 * 1024)).toFixed(2)} MB • Pronto para enviar
                            </span>
                          </div>
                        ) : (
                          <div>
                            <span className="font-bold text-white block">
                              Clique para escolher ou arraste o arquivo PDF da apostila bônus
                            </span>
                            <span className="text-[11px] font-mono text-neutral-400">
                              Aceita documentos .PDF (até 250MB)
                            </span>
                          </div>
                        )}
                      </div>
                      <input
                        type="file"
                        accept="application/pdf,.pdf"
                        disabled={isBonusUploading}
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            setBonusUploadFile(file);
                            setBonusUploadMessage(null);
                          }
                        }}
                        className="hidden"
                      />
                    </label>

                    <button
                      type="submit"
                      disabled={isBonusUploading || !bonusUploadFile}
                      className={`px-6 py-3 rounded-2xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer whitespace-nowrap ${
                        isBonusUploading || !bonusUploadFile
                          ? 'bg-neutral-800 text-neutral-500 border border-neutral-700 cursor-not-allowed'
                          : 'bg-amber-500 hover:bg-amber-400 text-neutral-950 shadow-lg shadow-amber-500/20 active:scale-95'
                      }`}
                      id="btn-submit-bonus-upload"
                    >
                      {isBonusUploading ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span>Subindo {bonusUploadProgress}%...</span>
                        </>
                      ) : (
                        <>
                          <Upload className="w-4 h-4" />
                          <span>Subir Apostila Bônus 0{bonusUploadTargetNumber}</span>
                        </>
                      )}
                    </button>
                  </div>

                  {isBonusUploading && (
                    <div className="mt-2 space-y-1">
                      <div className="w-full h-2 bg-neutral-800 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-amber-500 to-yellow-300 transition-all duration-300"
                          style={{ width: `${bonusUploadProgress}%` }}
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </form>
          </div>
        )}

        {/* CARDS COM O NOME DAS APOSTILAS E NÚMERO DE PÁGINAS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {bonusApostilas.map((b) => {
            const reqMod = b.requiredModule || (b.number === 1 || b.number === 2 ? 3 : 6);
            const isUnlocked = true;
            const isWaiting = false;

            const bTrans = bonusTranslations[b.number]?.[language] || bonusTranslations[b.number]?.pt;
            const bDisplayTitle = language === 'pt'
              ? (b.title && !b.title.includes('Pitching') && !b.title.includes('Guerrilha') ? b.title : (bTrans?.title || (b.number === 1 ? 'Glossário Completo de Planos' : b.number === 2 ? 'Glossário Completo de Roteiro' : 'Método de Análise Fílmica em 6 Camadas')))
              : (bTrans?.title || b.title);
            const bDisplaySummary = language === 'pt'
              ? ((b.summary || b.description) && !(b.summary || b.description).includes('empacotamento') && !(b.summary || b.description).includes('Pitching') && !(b.summary || b.description).includes('Guerrilha')
                  ? (b.summary || b.description)
                  : (bTrans?.summary || (b.number === 1 ? 'Guia permanente de consulta técnica para decupagem cinematográfica, escalas de planos e movimentos de câmera.' : b.number === 2 ? 'Guia permanente de consulta dramatúrgica: da criação de premissa, storyline e sinopse à escaleta e roteiro final.' : 'A metodologia analítica do CINELAB em 6 camadas para dissecar qualquer obra audiovisual como realizador.')))
              : (bTrans?.summary || b.summary || b.description);
            const displayPages = (b.pagesCount && b.pagesCount !== 4 && b.pagesCount !== 24 && b.pagesCount !== 35 && b.pagesCount !== 40 && b.pagesCount !== 96 && b.pagesCount !== 104) ? b.pagesCount : (b.number === 1 ? 30 : (b.number === 3 ? 27 : 29));
            const canonicalBonusPdf = b.number === 1
              ? '/materiais/cinelab-bonus-01-glossario-planos.pdf'
              : (b.number === 3 ? '/materiais/cinelab-bonus-03-analise-filmica.pdf' : '/materiais/cinelab-bonus-02-glossario-roteiro.pdf');
            const safeBonusPdf = (!b.pdfUrl || b.pdfUrl.includes('1790444') || b.pdfUrl.includes('1791222')) ? canonicalBonusPdf : b.pdfUrl;

            return (
              <div
                key={b.id}
                className="p-6 sm:p-7 rounded-3xl bg-neutral-900/80 border-2 border-amber-500/30 hover:border-amber-500/60 transition-all space-y-4 flex flex-col justify-between shadow-xl"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="px-2.5 py-1 rounded-lg bg-amber-500/20 text-amber-300 font-bold border border-amber-500/40">
                      {b.code || `${cur.handoutPrefix}${b.number} BÔNUS`}
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
                    <span className="text-emerald-400 font-semibold">PDF Cadastrado e Disponível</span>
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
                      className="w-full py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer bg-amber-500 hover:bg-amber-400 text-neutral-950 shadow"
                    >
                      <BookOpen className="w-4 h-4" />
                      <span>{cur.readBonusBtn}</span>
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
                      <Film className="w-4 h-4 text-amber-400" />
                      <span>{cur.extraVideosTab}</span>
                    </button>

                    {isAdmin && (
                      <button
                        type="button"
                        onClick={() => selectBonusForUpload(b.number)}
                        className="sm:col-span-2 w-full py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 bg-neutral-900 hover:bg-neutral-800 text-neutral-300 border border-neutral-800 hover:border-amber-500/50 transition-all cursor-pointer"
                        title="Subir ou substituir arquivo PDF desta apostila bônus"
                      >
                        <Upload className="w-3.5 h-3.5 text-amber-400" />
                        <span>Subir / Atualizar PDF (Admin)</span>
                      </button>
                    )}
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
                    {language === 'pt' ? selectedApostila.title : (getModuleTranslation(selectedApostila.moduleId || selectedApostila.number).title || selectedApostila.title)}
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
                      url={vaultBlobUrl || selectedApostila.pdfUrl}
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
                    <span className="text-amber-300 flex items-center gap-1.5 font-sans">
                      <Shield className="w-3.5 h-3.5 text-amber-400" />
                      <span>{cur.readerDisclaimer}</span>
                    </span>
                  </div>
                </div>
              )}

              {/* 2. TEXT TOPICS & QUIZ */}
              {(!selectedApostila.pdfUrl || modalTab === 'text') && (
                <div className="space-y-6">
                <div>
                  <h1 className="text-xl sm:text-2xl font-display font-extrabold text-white">
                    {language === 'pt' ? selectedApostila.title : (getModuleTranslation(selectedApostila.moduleId || selectedApostila.number).title || selectedApostila.title)}
                  </h1>
                  <p className="text-sm font-medium text-amber-300 mt-1">
                    {language === 'pt' ? selectedApostila.subtitle : (getModuleTranslation(selectedApostila.moduleId || selectedApostila.number).subtitle || selectedApostila.subtitle)}
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-amber-950/20 border-l-4 border-amber-500 text-xs text-amber-100">
                  <strong className="block text-amber-400 font-bold mb-1">{cur.summaryTitle}</strong>
                  {language === 'pt' ? selectedApostila.summary : (getModuleTranslation(selectedApostila.moduleId || selectedApostila.number).apostilaSummary || selectedApostila.summary)}
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
