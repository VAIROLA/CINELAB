import React, { useEffect, useState } from 'react';
import { api, setAuthToken } from '../services/api.js';
import {
  CourseSettings,
  CourseModule,
  Apostila,
  VideoLesson,
  EvaluationSubmission,
  VisitorStats,
  BonusApostila,
} from '../types/index.js';
import {
  saveApostilaToVault,
  updateVaultMetadata,
  getMergedApostilasWithVault,
  getMergedBonusWithVault,
  autoRestoreVaultToServer,
} from '../utils/apostilaVault.js';
import {
  Shield,
  Users,
  Eye,
  DollarSign,
  FileCheck,
  Award,
  Clock,
  BookOpen,
  Film,
  Settings,
  Mail,
  CheckCircle2,
  AlertCircle,
  Search,
  Sliders,
  Sparkles,
  Save,
  RotateCcw,
  Lock,
  UserPlus,
  Edit2,
  Trash2,
  Plus,
  RefreshCw,
  QrCode,
  Upload,
  Image as ImageIcon,
  Link as LinkIcon,
  Copy,
  ExternalLink,
  Loader2,
  Globe,
  FileText,
  CreditCard,
  AlertTriangle,
  GraduationCap,
  HelpCircle,
  Filter,
  Check,
  X,
} from 'lucide-react';
import { VisitorsTab } from '../components/admin/VisitorsTab.js';
import { StudentModal } from '../components/admin/StudentModal.js';
import { ModuleEditModal } from '../components/admin/ModuleEditModal.js';
import { BonusApostilaEditModal } from '../components/admin/BonusApostilaEditModal.js';
import { ApostilaExtraVideosSection } from '../components/ApostilaExtraVideosSection.js';
import { InstitutionalTab } from '../components/admin/InstitutionalTab.js';
import { Logo } from '../components/Logo.js';

interface AdminViewProps {
  onNavigate: (route: string) => void;
  currentUser?: any;
  onAdminLogin?: (user: any) => void;
  onSettingsUpdated?: () => void;
  onSwitchToStudentPreview?: () => void;
}

export const AdminView: React.FC<AdminViewProps> = ({
  onNavigate,
  currentUser,
  onAdminLogin,
  onSettingsUpdated,
  onSwitchToStudentPreview,
}) => {
  // Ordered Tabs: Notice 'visitors' is strictly positioned BEFORE 'students' as requested!
  const [activeTab, setActiveTab] = useState<
    'stats' | 'visitors' | 'students' | 'grading' | 'content' | 'institutional' | 'settings' | 'emails'
  >('stats');

  const [loading, setLoading] = useState(true);
  const [authError, setAuthError] = useState<string | null>(null);
  const [loginEmail, setLoginEmail] = useState('studiodeluc@gmail.com');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginLoading, setLoginLoading] = useState(false);
  const [loginMessage, setLoginMessage] = useState('');

  // Loaded data
  const [stats, setStats] = useState<any>(null);
  const [visitorStats, setVisitorStats] = useState<VisitorStats | null>(null);
  const [students, setStudents] = useState<any[]>([]);
  const [modules, setModules] = useState<CourseModule[]>([]);
  const [apostilas, setApostilas] = useState<Apostila[]>([]);
  const [videos, setVideos] = useState<VideoLesson[]>([]);
  const [submissions, setSubmissions] = useState<EvaluationSubmission[]>([]);
  const [settingsData, setSettingsData] = useState<{
    settings: CourseSettings;
    simulatedDaysOffset: number;
    effectiveNow: string;
  } | null>(null);
  const [emails, setEmails] = useState<any[]>([]);

  // Search & Filter for Students
  const [searchStudent, setSearchStudent] = useState('');
  const [studentFilter, setStudentFilter] = useState<'all' | 'passing' | 'warning' | 'difficulties'>('all');

  // Modals for adding / editing
  const [studentModalOpen, setStudentModalOpen] = useState(false);
  const [studentToEdit, setStudentToEdit] = useState<any | null>(null);

  const [moduleModalOpen, setModuleModalOpen] = useState(false);
  const [moduleToEdit, setModuleToEdit] = useState<CourseModule | null>(null);

  // Notifications
  const [actionNotification, setActionNotification] = useState<{
    type: 'success' | 'error';
    message: string;
  } | null>(null);

  // Grading desk state
  const [selectedSubmission, setSelectedSubmission] = useState<EvaluationSubmission | null>(null);
  const [discursiveScore, setDiscursiveScore] = useState<number>(3.0);
  const [teacherComment, setTeacherComment] = useState('');
  const [gradingSuccess, setGradingSuccess] = useState('');

  // Settings form states
  const [coursePrice, setCoursePrice] = useState(1000.00);
  const [coursePriceOriginal, setCoursePriceOriginal] = useState(2000.00);
  const [pixKey, setPixKey] = useState('');
  const [pixBeneficiary, setPixBeneficiary] = useState('');
  const [pixBank, setPixBank] = useState('');
  const [pixQrCodeUrl, setPixQrCodeUrl] = useState('');
  const [pixPayload, setPixPayload] = useState('');
  const [cardPaymentLink, setCardPaymentLink] = useState('https://pag.ae/82e6wXk2G');
  const [pagbankToken, setPagbankToken] = useState('');
  const [logoUrl, setLogoUrl] = useState('');
  const [directorName, setDirectorName] = useState('Professor Cineasta Tony de Luc');
  const [directorRole, setDirectorRole] = useState('Diretor Geral & Cineasta');
  const [contactEmail, setContactEmail] = useState('contato@cinelab.edu.br');
  const [contactPhone, setContactPhone] = useState('(11) 98765-4321');
  const [simOffset, setSimOffset] = useState(0);
  const [quickUploadModuleId, setQuickUploadModuleId] = useState<number>(1);
  const [uploadingModuleVideo, setUploadingModuleVideo] = useState<number | null>(null);
  const [quickUploadProgress, setQuickUploadProgress] = useState(0);
  const [quickUploadApostilaModuleId, setQuickUploadApostilaModuleId] = useState<number>(1);
  const [quickUploadApostilaTitle, setQuickUploadApostilaTitle] = useState('');
  const [savingQuickTitle, setSavingQuickTitle] = useState(false);
  const [uploadingModuleApostila, setUploadingModuleApostila] = useState<number | null>(null);
  const [quickUploadApostilaProgress, setQuickUploadApostilaProgress] = useState(0);
  const [apostilaRenameModalOpen, setApostilaRenameModalOpen] = useState(false);
  const [apostilaToRename, setApostilaToRename] = useState<{ id: string; moduleId?: number; title: string; isBonus?: boolean } | null>(null);
  const [renameTitleInput, setRenameTitleInput] = useState('');
  const [savingRename, setSavingRename] = useState(false);
  const [quickUploadThumbnailModuleId, setQuickUploadThumbnailModuleId] = useState<number>(1);
  const [uploadingModuleThumbnail, setUploadingModuleThumbnail] = useState<number | null>(null);
  const [quickUploadThumbnailProgress, setQuickUploadThumbnailProgress] = useState(0);
  const [uploadingApostilaCover, setUploadingApostilaCover] = useState<number | string | null>(null);
  const [quickUploadApostilaCoverProgress, setQuickUploadApostilaCoverProgress] = useState(0);

  // Bonus Apostilas Admin State
  const [bonusApostilas, setBonusApostilas] = useState<BonusApostila[]>([]);
  const [bonusModalOpen, setBonusModalOpen] = useState(false);
  const [bonusToEdit, setBonusToEdit] = useState<BonusApostila | null>(null);
  const [uploadingBonusNumber, setUploadingBonusNumber] = useState<number | null>(null);
  const [uploadingBonusProgress, setUploadingBonusProgress] = useState<number>(0);
  const [extraVideosModalApostila, setExtraVideosModalApostila] = useState<Apostila | BonusApostila | null>(null);

  useEffect(() => {
    if (currentUser?.role === 'admin') {
      loadAllAdminData();
    } else {
      setLoading(false);
    }
  }, [currentUser]);

  const notify = (message: string, type: 'success' | 'error' = 'success') => {
    setActionNotification({ type, message });
    setTimeout(() => setActionNotification(null), 4000);
  };

  const loadAllAdminData = async () => {
    try {
      setLoading(true);
      setAuthError(null);
      const [st, vis, stud, modsRes, apos, vids, subs, setts, em, bonusRes] = await Promise.all([
        api.getAdminStats(),
        api.getAdminVisitors().catch(() => null),
        api.getAdminStudents(),
        api.getPublicCourseInfo().catch(() => ({ modules: [] })),
        api.getAdminApostilas(),
        api.getAdminVideos(),
        api.getAdminSubmissions(),
        api.getAdminSettings(),
        api.getAdminEmails(),
        api.getStudentBonusApostilas().catch(() => []),
      ]);

      setStats(st);
      if (vis) setVisitorStats(vis);
      setStudents(Array.isArray(stud) ? stud : ((stud as any)?.students && Array.isArray((stud as any).students) ? (stud as any).students : []));
      if (modsRes?.modules && Array.isArray(modsRes.modules)) setModules(modsRes.modules);
      const rawApos = Array.isArray(apos) ? apos : ((apos as any)?.apostilas && Array.isArray((apos as any).apostilas) ? (apos as any).apostilas : []);
      const rawBonus = Array.isArray(bonusRes) && bonusRes.length > 0 ? bonusRes : ((apos as any)?.bonusApostilas && Array.isArray((apos as any).bonusApostilas) ? (apos as any).bonusApostilas : []);
      setApostilas(getMergedApostilasWithVault(rawApos));
      setBonusApostilas(getMergedBonusWithVault(rawBonus));
      setVideos(Array.isArray(vids) ? vids : ((vids as any)?.videos && Array.isArray((vids as any).videos) ? (vids as any).videos : []));
      setSubmissions(Array.isArray(subs) ? subs : ((subs as any)?.submissions && Array.isArray((subs as any).submissions) ? (subs as any).submissions : []));
      setSettingsData(setts);
      setEmails(Array.isArray(em) ? em : ((em as any)?.emails && Array.isArray((em as any).emails) ? (em as any).emails : []));

      // Auto-sync persistent vault to backend
      autoRestoreVaultToServer(api);

      if (setts?.settings) {
        setCoursePrice(setts.settings.coursePrice || 1000.00);
        setCoursePriceOriginal(setts.settings.coursePriceOriginal || 2000.00);
        setPixKey(setts.settings.pixKey || '');
        setPixBeneficiary(setts.settings.pixBeneficiary || 'CINELAB Ensino e Produção Audiovisual');
        setPixBank(setts.settings.pixBank || 'Banco Inter / NuBank');
        setPixQrCodeUrl(setts.settings.pixQrCodeUrl || '');
        setPixPayload(setts.settings.pixPayload || '');
        setCardPaymentLink(setts.settings.cardPaymentLink || '');
        setPagbankToken(setts.settings.pagbankToken || '');
        setLogoUrl(setts.settings.logoUrl || '');
        setDirectorName(setts.settings.directorName || 'Professor Cineasta Tony de Luc');
        setDirectorRole(setts.settings.directorRole || 'Diretor Geral & Cineasta');
        setContactEmail(setts.settings.contactEmail || 'contato@cinelab.edu.br');
        setContactPhone(setts.settings.contactPhone || '(11) 98765-4321');
        setSimOffset(setts.simulatedDaysOffset || 0);
      }
    } catch (err: any) {
      console.error(err);
      setAuthError(err.message || 'Acesso restrito');
    } finally {
      setLoading(false);
    }
  };

  const handleQuickAdminLogin = async () => {
    setLoginLoading(true);
    setLoginMessage('');
    try {
      const res = await api.quickAdminLogin();
      setAuthToken(res.token);
      if (onAdminLogin) onAdminLogin(res.user);
      setAuthError(null);
      await loadAllAdminData();
    } catch (err: any) {
      setLoginMessage(err.message || 'Falha ao autenticar administrador.');
    } finally {
      setLoginLoading(false);
    }
  };

  const handleFormAdminLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginLoading(true);
    setLoginMessage('');
    try {
      const res = await api.login(loginEmail, loginPassword);
      if (res.user.role !== 'admin') {
        throw new Error('Este usuário não possui privilégios de Administrador.');
      }
      setAuthToken(res.token);
      if (onAdminLogin) onAdminLogin(res.user);
      setAuthError(null);
      await loadAllAdminData();
    } catch (err: any) {
      setLoginMessage(err.message || 'Falha ao autenticar.');
    } finally {
      setLoginLoading(false);
    }
  };

  const handleToggleStudentStatus = async (studentId: string, currentStatus: string) => {
    const nextStatus = currentStatus === 'active' ? 'suspended' : 'active';
    try {
      await api.updateStudentStatus(studentId, nextStatus as any);
      setStudents((prev) =>
        (Array.isArray(prev) ? prev : []).map((s) => (s.id === studentId ? { ...s, status: nextStatus, enrollmentStatus: nextStatus } : s))
      );
      notify(`Status do aluno atualizado para: ${nextStatus === 'active' ? 'Ativo' : 'Suspenso'}`);
    } catch (err: any) {
      alert('Erro ao alterar status: ' + err.message);
    }
  };

  const handleDeleteStudent = async (studentId: string, studentName: string) => {
    if (!confirm(`Deseja realmente excluir o aluno "${studentName}" do sistema? Esta ação removerá sua matrícula e histórico.`)) {
      return;
    }
    try {
      await api.deleteAdminStudent(studentId);
      notify(`Aluno "${studentName}" excluído com sucesso.`);
      await loadAllAdminData();
    } catch (err: any) {
      alert('Erro ao excluir aluno: ' + err.message);
    }
  };

  const handleGradeDiscursive = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedSubmission) return;

    try {
      const q3Id = 'q3';
      await api.gradeDiscursiveSubmission(selectedSubmission.id, {
        discursiveScores: { [q3Id]: Number(discursiveScore) },
        teacherGeneralFeedback: teacherComment || 'Resposta analisada com rigor técnico e sensibilidade cinematográfica.',
      });
      setGradingSuccess('Nota salva e média recalculada com sucesso!');
      setTimeout(() => setGradingSuccess(''), 3000);
      loadAllAdminData();
      setSelectedSubmission(null);
    } catch (err: any) {
      alert('Erro ao salvar nota: ' + err.message);
    }
  };

  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.updateAdminSettings({
        settings: {
          coursePrice: Number(coursePrice),
          coursePriceOriginal: Number(coursePriceOriginal),
          pixKey,
          pixBeneficiary,
          pixBank,
          pixQrCodeUrl,
          pixPayload,
          cardPaymentLink,
          pagbankToken,
          logoUrl,
          directorName,
          directorRole,
          contactEmail,
          contactPhone,
        },
        simulatedDaysOffset: Number(simOffset),
      });
      notify('Configurações institucionais, logotipo, valores, QR Code e máquina do tempo salvas com sucesso!');
      await loadAllAdminData();
      if (onSettingsUpdated) {
        onSettingsUpdated();
      }
    } catch (err: any) {
      alert('Erro ao salvar configurações: ' + err.message);
    }
  };

  const handleSaveInstitutionalSettings = async (updatedFields: Partial<CourseSettings>) => {
    try {
      await api.updateAdminSettings({
        settings: {
          ...(settingsData?.settings || {}),
          ...updatedFields,
        },
      });
      await loadAllAdminData();
      if (onSettingsUpdated) {
        onSettingsUpdated();
      }
    } catch (err: any) {
      throw err;
    }
  };

  const handleLogoImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      alert('Por favor, selecione um arquivo de imagem válido (PNG, JPG, WEBP, SVG).');
      return;
    }
    try {
      const res = await api.uploadImageFile(file);
      if (res && res.fileUrl) {
        setLogoUrl(res.fileUrl);
        notify('Logotipo personalizado enviado com sucesso! Clique em "Salvar" para confirmar.');
        return;
      }
    } catch (uploadErr) {
      console.warn('Upload de logotipo via API falhou, usando base64:', uploadErr);
    }
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        setLogoUrl(reader.result);
        notify('Logotipo personalizado carregado! Clique em "Salvar Todas as Configurações" para gravar.');
      }
    };
    reader.readAsDataURL(file);
  };

  const handleQrImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      alert('Por favor, selecione um arquivo de imagem válido (PNG, JPG, WEBP, SVG).');
      return;
    }
    try {
      const res = await api.uploadImageFile(file);
      if (res && res.fileUrl) {
        setPixQrCodeUrl(res.fileUrl);
        notify('QR Code enviado e gravado com sucesso!');
        return;
      }
    } catch (uploadErr) {
      console.warn('Upload de QR code via API falhou, usando base64:', uploadErr);
    }
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        setPixQrCodeUrl(reader.result);
        notify('Imagem do QR Code carregada com sucesso! Clique em "Salvar Todas as Configurações" para confirmar.');
      }
    };
    reader.readAsDataURL(file);
  };

  const handlePasteQrArea = async (e: React.ClipboardEvent) => {
    const items = e.clipboardData?.items;
    if (items) {
      for (let i = 0; i < items.length; i++) {
        if (items[i].type.indexOf('image') !== -1) {
          const file = items[i].getAsFile();
          if (file) {
            try {
              const res = await api.uploadImageFile(file);
              if (res && res.fileUrl) {
                setPixQrCodeUrl(res.fileUrl);
                notify('QR Code colado e enviado com sucesso!');
                e.preventDefault();
                return;
              }
            } catch (err) {
              console.warn('Upload de QR colado falhou, usando base64:', err);
            }
            const reader = new FileReader();
            reader.onload = () => {
              if (typeof reader.result === 'string') {
                setPixQrCodeUrl(reader.result);
                notify('QR Code colado da área de transferência com sucesso! Lembre-se de salvar.');
              }
            };
            reader.readAsDataURL(file);
            e.preventDefault();
            return;
          }
        }
      }
    }
    const text = e.clipboardData?.getData('text');
    if (text) {
      const trimmed = text.trim();
      if (trimmed.startsWith('http://') || trimmed.startsWith('https://') || trimmed.startsWith('data:image/')) {
        setPixQrCodeUrl(trimmed);
        notify('Link da imagem do QR Code colado com sucesso!');
      } else if (trimmed.startsWith('000201') || trimmed.length > 50) {
        setPixPayload(trimmed);
        notify('Código PIX Copia e Cola colado com sucesso!');
      }
    }
  };

  const handleQuickVideoUpload = async (moduleId: number, file: File) => {
    if (!file) return;
    const isVideo = file.type.startsWith('video/') || /\.(mp4|webm|mov|mkv|avi|m4v)$/i.test(file.name);
    if (!isVideo) {
      alert('Por favor, selecione um arquivo de vídeo válido (MP4, WebM, MOV, MKV, AVI).');
      return;
    }

    try {
      setUploadingModuleVideo(moduleId);
      setQuickUploadProgress(0);

      const targetMod = modules.find((m) => m.id === moduleId);
      await api.uploadVideoFile(file, {
        moduleId,
        title: targetMod ? `Masterclass 0${moduleId}: ${targetMod.title}` : undefined,
        description: targetMod?.summary,
        onProgress: (p) => setQuickUploadProgress(p),
      });

      notify(`Vídeo da Etapa 0${moduleId} (${file.name}) subido com sucesso direto do seu computador!`);
      await loadAllAdminData();
    } catch (err: any) {
      console.error(err);
      alert('Erro ao subir vídeo: ' + (err.message || 'Erro desconhecido'));
    } finally {
      setUploadingModuleVideo(null);
      setQuickUploadProgress(0);
    }
  };

  const handleQuickApostilaUpload = async (moduleId: number, file: File) => {
    if (!file) return;
    const isPdf = file.type === 'application/pdf' || /\.pdf$/i.test(file.name);
    if (!isPdf) {
      alert('Por favor, selecione um arquivo no formato PDF (.pdf).');
      return;
    }

    const isBonus = moduleId > 990;
    const bonusNum = isBonus ? moduleId - 990 : undefined;

    try {
      setUploadingModuleApostila(moduleId);
      setQuickUploadApostilaProgress(0);

      const targetMod = !isBonus ? modules.find((m) => m.id === moduleId) : undefined;
      const existingApos = !isBonus ? apostilas.find((a) => a.moduleId === moduleId) : undefined;
      const targetBonus = isBonus ? bonusApostilas.find((b) => b.number === bonusNum) : undefined;

      const isCurrentSelectedModule = quickUploadApostilaModuleId === moduleId;
      const isDuplicatedMod1Title = !isBonus && moduleId !== 1 && (
        existingApos?.title === 'Introdução ao Cinema e à Linguagem Audiovisual' ||
        (isCurrentSelectedModule && quickUploadApostilaTitle.trim() === 'Introdução ao Cinema e à Linguagem Audiovisual')
      );

      const chosenTitle =
        (isCurrentSelectedModule && quickUploadApostilaTitle.trim() && !isDuplicatedMod1Title)
          ? quickUploadApostilaTitle.trim()
          : (targetMod?.title || (existingApos && !isDuplicatedMod1Title ? existingApos.title : undefined) || targetBonus?.title || (isBonus ? `Apostila Bônus 0${bonusNum}` : `Apostila 0${moduleId}`));

      const res = await api.uploadApostilaPdfFile(file, {
        moduleId: isBonus ? undefined : moduleId,
        isBonus,
        bonusNumber: bonusNum,
        title: chosenTitle,
        description: targetMod?.summary || targetBonus?.description,
        onProgress: (p) => setQuickUploadApostilaProgress(p),
      });

      const finalPages = res.pagesCount || res.apostila?.pagesCount || targetMod?.pagesCount || targetBonus?.pagesCount || 30;

      try {
        await saveApostilaToVault(isBonus ? bonusNum! : moduleId, file, {
          isBonus,
          bonusNumber: bonusNum,
          fileName: file.name,
          title: chosenTitle,
          pagesCount: finalPages,
          fileSizeMb: res.fileSizeMb || Number((file.size / (1024 * 1024)).toFixed(2)),
          pdfUrl: res.fileUrl,
        });
      } catch (vaultErr) {
        console.warn('Could not store in local vault:', vaultErr);
      }

      notify(
        isBonus
          ? `Apostila Bônus 0${bonusNum} ("${chosenTitle}") salva com sucesso! (${finalPages} páginas)`
          : `Apostila em PDF da Etapa 0${moduleId} salva com sucesso! Título: "${chosenTitle}" (${finalPages} páginas)`
      );
      await loadAllAdminData();
    } catch (err: any) {
      console.error(err);
      alert('Erro ao subir apostila em PDF: ' + (err.message || 'Erro desconhecido'));
    } finally {
      setUploadingModuleApostila(null);
      setQuickUploadApostilaProgress(0);
    }
  };

  useEffect(() => {
    if (quickUploadApostilaModuleId > 990) {
      const bNum = quickUploadApostilaModuleId - 990;
      const foundBonus = bonusApostilas.find((b) => b.number === bNum);
      setQuickUploadApostilaTitle(foundBonus?.title || `Apostila Bônus 0${bNum}`);
    } else {
      const foundApos = apostilas.find((a) => a.moduleId === quickUploadApostilaModuleId);
      const foundMod = modules.find((m) => m.id === quickUploadApostilaModuleId);
      const isDuplicatedMod1Title = quickUploadApostilaModuleId !== 1 && foundApos?.title === 'Introdução ao Cinema e à Linguagem Audiovisual';
      const cleanTitle = (isDuplicatedMod1Title ? foundMod?.title : (foundApos?.title || foundMod?.title)) || '';
      setQuickUploadApostilaTitle(cleanTitle);
    }
  }, [quickUploadApostilaModuleId, apostilas, modules, bonusApostilas]);

  const handleSaveQuickApostilaTitle = async () => {
    if (!quickUploadApostilaTitle.trim()) return;
    try {
      setSavingQuickTitle(true);
      if (quickUploadApostilaModuleId > 990) {
        const bNum = quickUploadApostilaModuleId - 990;
        const foundBonus = bonusApostilas.find((b) => b.number === bNum);
        if (foundBonus) {
          await api.updateAdminApostila(foundBonus.id, {
            title: quickUploadApostilaTitle.trim(),
          });
          notify(`Nome da Apostila Bônus 0${bNum} atualizado para "${quickUploadApostilaTitle.trim()}"!`);
        }
      } else {
        const foundApos = apostilas.find((a) => a.moduleId === quickUploadApostilaModuleId);
        const targetId = foundApos?.id || `apostila-${quickUploadApostilaModuleId}`;
        await api.updateAdminApostila(targetId, {
          title: quickUploadApostilaTitle.trim(),
        });
        notify(`Nome da Apostila 0${quickUploadApostilaModuleId} salvo com sucesso para "${quickUploadApostilaTitle.trim()}"!`);
      }
      await loadAllAdminData();
    } catch (err: any) {
      alert('Erro ao salvar nome da apostila: ' + (err.message || 'Erro desconhecido'));
    } finally {
      setSavingQuickTitle(false);
    }
  };

  const handleOpenRenameApostila = (apos: { id: string; moduleId?: number; title: string; isBonus?: boolean }) => {
    setApostilaToRename(apos);
    setRenameTitleInput(apos.title || '');
    setApostilaRenameModalOpen(true);
  };

  const handleSaveRenameApostila = async () => {
    if (!apostilaToRename || !renameTitleInput.trim()) return;
    try {
      setSavingRename(true);
      await api.updateAdminApostila(apostilaToRename.id, {
        title: renameTitleInput.trim(),
      });
      notify(`Nome da apostila atualizado para "${renameTitleInput.trim()}" com sucesso!`);
      setApostilaRenameModalOpen(false);
      setApostilaToRename(null);
      await loadAllAdminData();
    } catch (err: any) {
      alert('Erro ao renomear apostila: ' + (err.message || 'Erro desconhecido'));
    } finally {
      setSavingRename(false);
    }
  };

  const handleQuickThumbnailUpload = async (moduleId: number, file: File) => {
    if (!file) return;
    const isImage = file.type.startsWith('image/') || /\.(jpe?g|png|webp|svg|gif|avif|bmp)$/i.test(file.name);
    if (!isImage) {
      alert('Por favor, selecione um arquivo de imagem válido (JPG, PNG, WebP).');
      return;
    }

    try {
      setUploadingModuleThumbnail(moduleId);
      setQuickUploadThumbnailProgress(0);

      const res = await api.uploadImageFile(file, (p) => setQuickUploadThumbnailProgress(p));
      if (res && res.fileUrl) {
        const existingVid = videos.find((v) => v.moduleId === moduleId);
        if (existingVid) {
          await api.updateAdminVideo(existingVid.id, {
            thumbnailUrl: res.fileUrl,
          });
        } else {
          await api.updateAdminVideoByModule(moduleId, {
            thumbnailUrl: res.fileUrl,
          });
        }

        notify(`Capa da aula da Etapa 0${moduleId} (${file.name}) atualizada com sucesso!`);
        await loadAllAdminData();
      }
    } catch (err: any) {
      console.error(err);
      alert('Erro ao subir capa da aula: ' + (err.message || 'Erro desconhecido'));
    } finally {
      setUploadingModuleThumbnail(null);
      setQuickUploadThumbnailProgress(0);
    }
  };

  const handleQuickApostilaCoverUpload = async (targetIdOrModuleId: number | string, file: File) => {
    if (!file) return;
    const isImage = file.type.startsWith('image/') || /\.(jpe?g|png|webp|svg|gif|avif|bmp)$/i.test(file.name);
    if (!isImage) {
      alert('Por favor, selecione um arquivo de imagem válido (JPG, PNG, WebP).');
      return;
    }

    const isBonus = typeof targetIdOrModuleId === 'number'
      ? targetIdOrModuleId > 990
      : (typeof targetIdOrModuleId === 'string' && targetIdOrModuleId.startsWith('bonus'));
    const bonusNum = isBonus
      ? (typeof targetIdOrModuleId === 'number' ? targetIdOrModuleId - 990 : Number(String(targetIdOrModuleId).replace(/\D/g, '') || 1))
      : undefined;
    const moduleId = !isBonus ? (typeof targetIdOrModuleId === 'number' ? targetIdOrModuleId : Number(String(targetIdOrModuleId).replace(/\D/g, '') || 1)) : undefined;

    try {
      setUploadingApostilaCover(targetIdOrModuleId);
      setQuickUploadApostilaCoverProgress(0);

      // Leitura imediata como DataURL para persistência sem falhas
      const localDataUrl = await new Promise<string>((resolve) => {
        const reader = new FileReader();
        reader.onload = () => resolve((reader.result as string) || '');
        reader.onerror = () => resolve('');
        reader.readAsDataURL(file);
      });

      let serverFileUrl = localDataUrl;
      try {
        const res = await api.uploadImageFile(file, (p) => setQuickUploadApostilaCoverProgress(p));
        if (res && res.fileUrl) {
          serverFileUrl = res.fileUrl;
        }
      } catch (uploadErr) {
        console.warn('Upload image server error, using dataUrl:', uploadErr);
      }

      const coverToSave = localDataUrl || serverFileUrl;

      if (isBonus) {
        const targetBonus = bonusApostilas.find((b) => b.number === bonusNum);
        const bonusId = targetBonus?.id || `bonus-${bonusNum}`;
        try {
          await api.updateAdminApostila(bonusId, { coverUrl: coverToSave });
        } catch (e) {
          console.warn('updateAdminApostila error:', e);
        }
        await updateVaultMetadata(targetIdOrModuleId, {
          isBonus: true,
          bonusNumber: bonusNum,
          coverUrl: coverToSave,
        });
      } else {
        const existingApos = apostilas.find((a) => a.moduleId === moduleId);
        const aposId = existingApos?.id || `apostila-${moduleId}`;
        try {
          await api.updateAdminApostila(aposId, { coverUrl: coverToSave });
        } catch (e) {
          console.warn('updateAdminApostila error:', e);
        }
        await updateVaultMetadata(targetIdOrModuleId, {
          coverUrl: coverToSave,
        });
      }

      notify(`Capa da Apostila ${isBonus ? `Bônus 0${bonusNum}` : `0${moduleId}`} (${file.name}) atualizada com sucesso!`);
      await loadAllAdminData();
    } catch (err: any) {
      console.error(err);
      alert('Erro ao subir capa da apostila: ' + (err.message || 'Erro desconhecido'));
    } finally {
      setUploadingApostilaCover(null);
      setQuickUploadApostilaCoverProgress(0);
    }
  };

  const handleQuickBonusApostilaUpload = async (
    bonusNumber: number,
    file: File,
    title?: string,
    pagesCount?: number
  ) => {
    if (!file) return;
    const isPdf = file.type === 'application/pdf' || /\.pdf$/i.test(file.name);
    if (!isPdf) {
      alert('Por favor, selecione um arquivo no formato PDF (.pdf).');
      return;
    }

    try {
      setUploadingBonusNumber(bonusNumber);
      setUploadingBonusProgress(0);

      const targetBonus = bonusApostilas.find((b) => b.number === bonusNumber);
      const chosenTitle = title || targetBonus?.title || (bonusNumber === 1 ? 'Glossário Completo de Planos' : bonusNumber === 2 ? 'Glossário Completo de Roteiro' : `Apostila Bônus 0${bonusNumber}`);
      const rawPages = pagesCount || targetBonus?.pagesCount || targetBonus?.totalPages;
      const chosenPages = rawPages && rawPages !== 96 && rawPages !== 104 ? rawPages : (bonusNumber === 1 ? 30 : 29);

      const res = await api.uploadApostilaPdfFile(file, {
        isBonus: true,
        bonusNumber,
        title: chosenTitle,
        description: targetBonus?.description || targetBonus?.summary,
        pagesCount: chosenPages,
        onProgress: (p) => setUploadingBonusProgress(p),
      });

      const finalPages = res?.pagesCount || chosenPages;
      try {
        await saveApostilaToVault(bonusNumber, file, {
          isBonus: true,
          bonusNumber,
          fileName: file.name,
          title: chosenTitle,
          pagesCount: finalPages,
          fileSizeMb: res?.fileSizeMb,
          pdfUrl: res?.fileUrl,
        });
      } catch (vaultErr) {
        console.warn('Vault warning:', vaultErr);
      }

      notify(`Apostila Bônus 0${bonusNumber} ("${chosenTitle}") subida com sucesso! (${finalPages} páginas)`);
      await loadAllAdminData();
    } catch (err: any) {
      console.error(err);
      alert('Erro ao subir apostila bônus: ' + (err.message || 'Erro desconhecido'));
    } finally {
      setUploadingBonusNumber(null);
      setUploadingBonusProgress(0);
    }
  };

  const handleQuickTimeTravel = async (days: number) => {
    try {
      await api.updateAdminSettings({
        simulatedDaysOffset: days,
      });
      setSimOffset(days);
      notify(`Cronograma adiantado em +${days} dias para testes.`);
      loadAllAdminData();
    } catch (err: any) {
      alert('Erro ao adiantar tempo: ' + err.message);
    }
  };

  const studentList = Array.isArray(students)
    ? students
    : (students && Array.isArray((students as any).students))
    ? (students as any).students
    : [];

  const totalStudentsCount = studentList.length;
  const passingStudentsCount = studentList.filter(
    (s) => s && s.averageGrade !== undefined && s.averageGrade !== null && Number(s.averageGrade) > 6.0
  ).length;
  const warningStudentsCount = studentList.filter(
    (s) => s && s.averageGrade !== undefined && s.averageGrade !== null && Number(s.averageGrade) <= 6.0
  ).length;
  const withDifficultiesCount = studentList.filter(
    (s) => s && s.difficulties && s.difficulties.trim() !== '' && s.difficulties !== 'Nenhuma dificuldade registrada'
  ).length;

  const filteredStudents = studentList.filter((s) => {
    if (!s) return false;
    const term = searchStudent.toLowerCase().trim();
    const matchesSearch =
      !term ||
      s.name?.toLowerCase().includes(term) ||
      s.email?.toLowerCase().includes(term) ||
      s.enrollmentNumber?.toLowerCase().includes(term) ||
      s.paymentMethod?.toLowerCase().includes(term) ||
      s.difficulties?.toLowerCase().includes(term);

    if (!matchesSearch) return false;

    if (studentFilter === 'passing') {
      return s.averageGrade !== undefined && s.averageGrade !== null && Number(s.averageGrade) > 6.0;
    }
    if (studentFilter === 'warning') {
      return s.averageGrade !== undefined && s.averageGrade !== null && Number(s.averageGrade) <= 6.0;
    }
    if (studentFilter === 'difficulties') {
      return s.difficulties && s.difficulties.trim() !== '' && s.difficulties !== 'Nenhuma dificuldade registrada';
    }
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 text-neutral-200 space-y-8 animate-fadeIn" id="admin-view-root">
      {/* Notifications bar */}
      {actionNotification && (
        <div
          className={`p-4 rounded-2xl text-xs flex items-center gap-2.5 shadow-lg animate-fadeIn ${
            actionNotification.type === 'success'
              ? 'bg-emerald-950/80 border border-emerald-800 text-emerald-300'
              : 'bg-red-950/80 border border-red-800 text-red-300'
          }`}
        >
          <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
          <span className="font-sans font-medium">{actionNotification.message}</span>
        </div>
      )}

      {/* Top Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-neutral-800 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-mono font-bold mb-2">
            <Shield className="w-3.5 h-3.5" /> Painel de Gestão & Coordenação Acadêmica
          </div>
          <h1 className="text-2xl sm:text-3xl font-display font-bold text-white">
            Administração CINELAB
          </h1>
          <p className="text-xs text-neutral-400">
            Controle de visitas públicas, gestão de alunos, edição de módulos e máquina do tempo.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {onSwitchToStudentPreview && (
            <button
              type="button"
              onClick={onSwitchToStudentPreview}
              className="px-4 py-2.5 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-mono font-bold flex items-center gap-2 transition cursor-pointer shadow-md"
              title="Testar a plataforma exatamente com a visão de um aluno matriculado"
            >
              <Eye className="w-4 h-4 text-amber-400" />
              <span>👁️ Entrar como Aluno Teste (Lucas)</span>
            </button>
          )}

        {/* Quick Time Travel Status Widget */}
        {settingsData && (
          <div className="p-3 rounded-2xl bg-neutral-900 border border-neutral-700/80 text-xs font-mono flex items-center gap-3">
            <Clock className="w-4 h-4 text-amber-400 shrink-0" />
            <div>
              <span className="text-[10px] text-neutral-400 block">DATA VIRTUAL ATUAL:</span>
              <span className="text-white font-bold">
                {new Date(settingsData.effectiveNow).toLocaleDateString('pt-BR')} (
                {settingsData.simulatedDaysOffset > 0
                  ? `+${settingsData.simulatedDaysOffset} dias`
                  : 'Tempo real'}
                )
              </span>
            </div>
          </div>
        )}
        </div>
      </div>

      {/* Navigation Tabs */}
      {/* NOTICE: The user explicitly requested: "ANTES DE ALUNOS MATRICULADOS NO PAINEL ADMIN EU ACRESCETARIA VISITANTES (PÚBLICOS), PARA CONTROLE DE VISITAS." */}
      <div className="flex flex-wrap items-center gap-2.5 border-b border-neutral-800 pb-4 text-xs font-medium">
        <button
          onClick={() => setActiveTab('stats')}
          className={`px-4 py-2 rounded-xl transition-all cursor-pointer flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'stats'
              ? 'bg-amber-500 text-neutral-950 font-bold shadow-md shadow-amber-500/20'
              : 'text-neutral-400 hover:text-white hover:bg-neutral-800'
          }`}
        >
          <Award className="w-4 h-4" />
          <span>Visão Geral & KPIs</span>
        </button>

        {/* VISITANTES (PÚBLICOS) - POSICIONADA RIGOROSAMENTE ANTES DE ALUNOS MATRICULADOS */}
        <button
          onClick={() => setActiveTab('visitors')}
          className={`px-4 py-2 rounded-xl transition-all cursor-pointer flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'visitors'
              ? 'bg-amber-500 text-neutral-950 font-bold shadow-md shadow-amber-500/20'
              : 'text-neutral-400 hover:text-white hover:bg-neutral-800'
          }`}
        >
          <Eye className="w-4 h-4" />
          <span>Visitantes (Públicos) ({visitorStats?.totalVisits || 0})</span>
        </button>

        <button
          onClick={() => setActiveTab('students')}
          className={`px-4 py-2 rounded-xl transition-all cursor-pointer flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'students'
              ? 'bg-amber-500 text-neutral-950 font-bold shadow-md shadow-amber-500/20'
              : 'text-neutral-400 hover:text-white hover:bg-neutral-800'
          }`}
        >
          <Users className="w-4 h-4" />
          <span>Alunos Matriculados ({studentList.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('grading')}
          className={`px-4 py-2 rounded-xl transition-all cursor-pointer flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'grading'
              ? 'bg-amber-500 text-neutral-950 font-bold shadow-md shadow-amber-500/20'
              : 'text-neutral-400 hover:text-white hover:bg-neutral-800'
          }`}
        >
          <FileCheck className="w-4 h-4" />
          <span>Mesa de Correção ({submissions.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('content')}
          className={`px-4 py-2 rounded-xl transition-all cursor-pointer flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'content'
              ? 'bg-amber-500 text-neutral-950 font-bold shadow-md shadow-amber-500/20'
              : 'text-neutral-400 hover:text-white hover:bg-neutral-800'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>Módulos, Apostilas & Vídeos</span>
        </button>

        <button
          onClick={() => setActiveTab('institutional')}
          className={`px-4 py-2 rounded-xl transition-all cursor-pointer flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'institutional'
              ? 'bg-amber-500 text-neutral-950 font-bold shadow-md shadow-amber-500/20'
              : 'text-neutral-400 hover:text-white hover:bg-neutral-800'
          }`}
        >
          <Globe className="w-4 h-4" />
          <span>Rodapé, Contato & Tony de Luc</span>
        </button>

        <button
          onClick={() => setActiveTab('settings')}
          className={`px-4 py-2.5 rounded-xl transition-all cursor-pointer flex items-center gap-2 whitespace-nowrap font-bold ${
            activeTab === 'settings'
              ? 'bg-amber-500 text-neutral-950 shadow-lg shadow-amber-500/30'
              : 'bg-amber-500/10 text-amber-300 border border-amber-500/40 hover:bg-amber-500/20 hover:text-white'
          }`}
        >
          <Settings className="w-4 h-4 text-amber-400" />
          <span>⚙️ Configurações & Pagamentos (PagBank / PIX)</span>
        </button>

        <button
          onClick={() => setActiveTab('emails')}
          className={`px-4 py-2 rounded-xl transition-all cursor-pointer flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'emails'
              ? 'bg-amber-500 text-neutral-950 font-bold shadow-md shadow-amber-500/20'
              : 'text-neutral-400 hover:text-white hover:bg-neutral-800'
          }`}
        >
          <Mail className="w-4 h-4" />
          <span>Logs de E-mail ({emails.length})</span>
        </button>
      </div>

      {loading ? (
        <div className="py-20 text-center text-neutral-500 font-mono text-xs">
          Carregando dados da administração...
        </div>
      ) : authError || !stats || !currentUser || currentUser.role !== 'admin' ? (
        <div className="max-w-xl mx-auto py-12 px-6 rounded-3xl bg-neutral-900 border border-neutral-800 shadow-2xl space-y-6 text-center animate-fadeIn">
          <div className="w-16 h-16 rounded-2xl bg-red-950/80 border border-red-800/80 flex items-center justify-center mx-auto text-red-400">
            <Lock className="w-8 h-8" />
          </div>
          <div>
            <span className="text-[11px] font-mono uppercase tracking-widest text-red-400 font-bold">
              Autenticação de Segurança
            </span>
            <h2 className="text-xl font-display font-bold text-white mt-1">
              Acesso da Coordenação Acadêmica
            </h2>
            <p className="text-xs text-neutral-400 mt-2">
              Esta área é restrita ao <strong className="text-neutral-200">Professor Cineasta Tony de Luc</strong> para gestão do curso, controle de visitas, alunos, liberação de etapas e emissão de certificados.
            </p>
          </div>

          {loginMessage && (
            <div className="p-3 rounded-xl bg-red-950/40 border border-red-800/60 text-red-300 text-xs flex items-center gap-2 text-left">
              <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
              <span>{loginMessage}</span>
            </div>
          )}

          {/* Formulário com credenciais */}
          <form onSubmit={handleFormAdminLogin} className="space-y-3 text-left">
            <div>
              <label className="block text-[11px] font-mono text-neutral-400 mb-1">E-mail Administrativo</label>
              <input
                type="email"
                required
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-white text-xs focus:border-red-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-[11px] font-mono text-neutral-400 mb-1">Senha de Acesso</label>
              <input
                type="password"
                required
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-white text-xs focus:border-red-500 focus:outline-none"
              />
            </div>
            <button
              type="submit"
              disabled={loginLoading}
              className="w-full py-2.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs font-semibold transition-all cursor-pointer"
            >
              {loginLoading ? 'Autenticando...' : 'Entrar com E-mail & Senha'}
            </button>
          </form>

          <button
            type="button"
            onClick={() => onNavigate('inicio')}
            className="text-xs text-neutral-400 hover:text-white transition-colors cursor-pointer"
          >
            ← Voltar para a Página Inicial
          </button>
        </div>
      ) : (
        <>
          {/* TAB 1: STATS & OVERVIEW */}
          {activeTab === 'stats' && stats && (
            <div className="space-y-8 animate-fadeIn">
              {/* Metric Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 font-mono">
                <div className="p-6 rounded-2xl bg-neutral-900 border border-neutral-800">
                  <span className="text-neutral-400 text-xs block">ALUNOS MATRICULADOS</span>
                  <div className="text-3xl font-display font-bold text-white mt-1">
                    {stats.totalStudents}
                  </div>
                  <span className="text-[11px] text-emerald-400 mt-1 block">
                    {stats.activeEnrollments} com acesso ativo
                  </span>
                </div>

                <div className="p-6 rounded-2xl bg-neutral-900 border border-neutral-800">
                  <span className="text-neutral-400 text-xs block">RECEITA CONFIRMADA</span>
                  <div className="text-3xl font-display font-bold text-amber-400 mt-1">
                    R$ {(stats.totalRevenue || 0).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </div>
                  <span className="text-[11px] text-neutral-500 mt-1 block">
                    PIX e Cartão de Crédito
                  </span>
                </div>

                <div className="p-6 rounded-2xl bg-neutral-900 border border-neutral-800">
                  <span className="text-neutral-400 text-xs block">AVALIAÇÕES ENVIADAS</span>
                  <div className="text-3xl font-display font-bold text-white mt-1">
                    {stats.totalSubmissions}
                  </div>
                  <span className="text-[11px] text-amber-400 mt-1 block">
                    {stats.pendingSubmissions} aguardando correção
                  </span>
                </div>

                <div className="p-6 rounded-2xl bg-neutral-900 border border-neutral-800">
                  <span className="text-neutral-400 text-xs block">MÉDIA GERAL DA ESCOLA</span>
                  <div className="text-3xl font-display font-bold text-emerald-400 mt-1">
                    {stats.totalSubmissions > 0 && stats.averageGrade > 0 ? stats.averageGrade.toFixed(1) : '0.0'}{' '}
                    <span className="text-xs text-neutral-400 font-normal">/ 10</span>
                  </div>
                  <span className="text-[11px] text-neutral-500 mt-1 block">
                    {stats.certificatesIssued} diplomas emitidos
                  </span>
                </div>
              </div>

              {/* Module Timeline Progression Distribution */}
              <div className="p-6 sm:p-8 rounded-3xl bg-neutral-900 border border-neutral-800 space-y-4">
                <h3 className="text-sm font-bold font-display text-white">
                  Distribuição das 10 Etapas por Dias Contados (90 Dias de Imersão)
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-5 lg:grid-cols-10 gap-2 font-mono text-center">
                  {stats.moduleDistribution?.map((m: any) => (
                    <div
                      key={m.moduleId}
                      className={`p-3 rounded-xl border text-xs ${
                        m.status === 'completed'
                          ? 'bg-emerald-950/20 border-emerald-800 text-emerald-300'
                          : m.status === 'available'
                          ? 'bg-amber-950/30 border-amber-500 text-amber-300'
                          : 'bg-neutral-950 border-neutral-800 text-neutral-500'
                      }`}
                    >
                      <div className="font-bold">M0{m.moduleId}</div>
                      <div className="text-[10px] mt-1 truncate">
                        {m.status === 'completed'
                          ? '✓ Concluído'
                          : m.status === 'available'
                          ? '🔓 Vigente'
                          : '🔒 Bloqueado'}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: VISITANTES (PÚBLICOS) - CONTROLE DE VISITAS */}
          {/* EXACTLY BEFORE ALUNOS MATRICULADOS */}
          {activeTab === 'visitors' && (
            <VisitorsTab
              stats={visitorStats}
              onRefresh={async () => {
                const updated = await api.getAdminVisitors();
                setVisitorStats(updated);
              }}
            />
          )}

          {/* TAB 3: LOCAL PARA CONTROLE DE ALUNOS - MATRÍCULA, PAGAMENTO, DIFICULDADES E MÉDIA > 6.0 */}
          {activeTab === 'students' && (
            <div className="space-y-6 animate-fadeIn" id="student-control-panel">
              {/* Header with Actions */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-800 pb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <GraduationCap className="w-5 h-5 text-amber-400" />
                    <h3 className="text-lg font-bold font-display text-white">
                      Painel de Controle de Alunos
                    </h3>
                  </div>
                  <p className="text-xs text-neutral-400 mt-0.5">
                    Acompanhamento de matrículas, formas de pagamento, áreas de maior dificuldade e notas (Média de aprovação: &gt; 6.0).
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  {/* Botão de Acrescentar Novo Aluno */}
                  <button
                    type="button"
                    onClick={() => {
                      setStudentToEdit(null);
                      setStudentModalOpen(true);
                    }}
                    className="px-4 py-2.5 bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold rounded-xl text-xs transition-all cursor-pointer flex items-center gap-2 shadow-md shadow-amber-500/20 active:scale-98"
                  >
                    <UserPlus className="w-4 h-4" />
                    <span>+ Acrescentar Novo Aluno</span>
                  </button>

                  <button
                    type="button"
                    onClick={loadAllAdminData}
                    className="p-2.5 bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 text-neutral-300 rounded-xl text-xs transition-all cursor-pointer"
                    title="Atualizar lista de alunos"
                  >
                    <RefreshCw className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Official Cinema Grading Rule Banner */}
              <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                <div className="flex items-start sm:items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
                    <Award className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-bold text-amber-300 font-display">
                      REGRA OFICIAL CINELAB: MÉDIA SUPERIOR A 6.0 (&gt; 6.0) PARA APROVAÇÃO
                    </div>
                    <div className="text-neutral-300 text-[11px] font-sans">
                      Para obter a certificação assinada pelo cineasta Tony de Luc, o aluno deve atingir média final estritamente <strong>superior a 6.0</strong> em todas as avaliações teóricas e práticas.
                    </div>
                  </div>
                </div>
                <div className="px-3 py-1.5 rounded-xl bg-neutral-900 border border-neutral-700 text-[11px] text-amber-400 font-mono font-bold whitespace-nowrap self-start sm:self-auto">
                  Nota de Corte: &gt; 6.0
                </div>
              </div>

              {/* KPI Summary Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-4 flex items-center justify-between shadow-sm">
                  <div>
                    <p className="text-[11px] text-neutral-400 font-mono uppercase tracking-wider">Total de Alunos</p>
                    <p className="text-2xl font-bold font-display text-white mt-1">{totalStudentsCount}</p>
                    <p className="text-[10px] text-neutral-500 font-mono mt-0.5">Cadastrados no sistema</p>
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-neutral-800 text-neutral-300 flex items-center justify-center">
                    <Users className="w-5 h-5" />
                  </div>
                </div>

                <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-4 flex items-center justify-between shadow-sm">
                  <div>
                    <p className="text-[11px] text-emerald-400 font-mono uppercase tracking-wider">Aprovados (&gt; 6.0)</p>
                    <p className="text-2xl font-bold font-display text-emerald-400 mt-1">{passingStudentsCount}</p>
                    <p className="text-[10px] text-emerald-500/80 font-mono mt-0.5">Média superior a 6.0</p>
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-emerald-950/60 border border-emerald-800/60 text-emerald-400 flex items-center justify-center">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                </div>

                <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-4 flex items-center justify-between shadow-sm">
                  <div>
                    <p className="text-[11px] text-red-400 font-mono uppercase tracking-wider">Em Atenção (≤ 6.0)</p>
                    <p className="text-2xl font-bold font-display text-red-400 mt-1">{warningStudentsCount}</p>
                    <p className="text-[10px] text-red-500/80 font-mono mt-0.5">Abaixo da média mínima</p>
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-red-950/60 border border-red-800/60 text-red-400 flex items-center justify-center">
                    <AlertTriangle className="w-5 h-5" />
                  </div>
                </div>

                <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-4 flex items-center justify-between shadow-sm">
                  <div>
                    <p className="text-[11px] text-amber-400 font-mono uppercase tracking-wider">Dificuldades</p>
                    <p className="text-2xl font-bold font-display text-amber-400 mt-1">{withDifficultiesCount}</p>
                    <p className="text-[10px] text-amber-500/80 font-mono mt-0.5">Com pontos mapeados</p>
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-amber-950/60 border border-amber-800/60 text-amber-400 flex items-center justify-center">
                    <HelpCircle className="w-5 h-5" />
                  </div>
                </div>
              </div>

              {/* Filters and Search Bar */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                {/* Filter Pills */}
                <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
                  <button
                    type="button"
                    onClick={() => setStudentFilter('all')}
                    className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer flex items-center gap-1.5 ${
                      studentFilter === 'all'
                        ? 'bg-amber-500 text-neutral-950 font-bold shadow-sm'
                        : 'bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-neutral-300'
                    }`}
                  >
                    <span>Todos</span>
                    <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-neutral-950/40">{totalStudentsCount}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setStudentFilter('passing')}
                    className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer flex items-center gap-1.5 ${
                      studentFilter === 'passing'
                        ? 'bg-emerald-500 text-neutral-950 font-bold shadow-sm'
                        : 'bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-emerald-400'
                    }`}
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Aprovados (&gt; 6.0)</span>
                    <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-neutral-950/40">{passingStudentsCount}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setStudentFilter('warning')}
                    className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer flex items-center gap-1.5 ${
                      studentFilter === 'warning'
                        ? 'bg-red-500 text-neutral-950 font-bold shadow-sm'
                        : 'bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-red-400'
                    }`}
                  >
                    <AlertTriangle className="w-3.5 h-3.5" />
                    <span>Abaixo de 6.0 (Atenção)</span>
                    <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-neutral-950/40">{warningStudentsCount}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setStudentFilter('difficulties')}
                    className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer flex items-center gap-1.5 ${
                      studentFilter === 'difficulties'
                        ? 'bg-amber-400 text-neutral-950 font-bold shadow-sm'
                        : 'bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-amber-400'
                    }`}
                  >
                    <HelpCircle className="w-3.5 h-3.5" />
                    <span>Com Dificuldades</span>
                    <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-neutral-950/40">{withDifficultiesCount}</span>
                  </button>
                </div>

                {/* Search Bar */}
                <div className="relative max-w-sm w-full">
                  <Search className="w-4 h-4 text-neutral-500 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    value={searchStudent}
                    onChange={(e) => setSearchStudent(e.target.value)}
                    placeholder="Buscar por nome, matrícula, pagamento, dificuldade..."
                    className="w-full pl-9 pr-4 py-2 bg-neutral-900 border border-neutral-700 rounded-xl text-xs text-white focus:outline-none focus:border-amber-500 font-mono"
                  />
                </div>
              </div>

              {/* Complete Students Control Table */}
              <div className="bg-neutral-900 border border-neutral-800 rounded-3xl overflow-hidden shadow-xl">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs font-mono">
                    <thead className="bg-neutral-950 border-b border-neutral-800 text-neutral-400 text-[11px]">
                      <tr>
                        <th className="p-4 whitespace-nowrap">MATRÍCULA</th>
                        <th className="p-4">NOME DO ALUNO / CONTATO</th>
                        <th className="p-4 whitespace-nowrap">FORMA DE PAGAMENTO</th>
                        <th className="p-4">EM QUE TEM MAIS DIFICULDADE</th>
                        <th className="p-4 whitespace-nowrap">MÉDIA DO ALUNO</th>
                        <th className="p-4 whitespace-nowrap">STATUS / ETAPA</th>
                        <th className="p-4 text-right whitespace-nowrap">AÇÕES</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-800">
                      {filteredStudents.length > 0 ? (
                        filteredStudents.map((s) => {
                          const status = s.enrollmentStatus || s.status || 'active';
                          const isActive = status === 'active';
                          const grade = s.averageGrade !== undefined && s.averageGrade !== null ? Number(s.averageGrade) : null;
                          const isPassing = grade !== null ? grade > 6.0 : null;

                          return (
                            <tr key={s.id} className="hover:bg-neutral-800/40 transition-colors">
                              {/* Matrícula */}
                              <td className="p-4 font-bold whitespace-nowrap">
                                <span className="px-2.5 py-1 rounded-lg bg-neutral-950 border border-neutral-700 text-amber-400 text-xs">
                                  {s.enrollmentNumber || s.matricula || 'CNL-2026-AUTO'}
                                </span>
                              </td>

                              {/* Nome / Email / Telefone */}
                              <td className="p-4 font-sans">
                                <div className="font-bold text-white text-xs">{s.name}</div>
                                <div className="text-neutral-400 font-mono text-[11px]">{s.email}</div>
                                <div className="text-[11px] text-neutral-500 font-mono mt-0.5">
                                  {s.phone ? `Tel: ${s.phone}` : ''} {s.document ? `• CPF: ${s.document}` : ''}
                                </div>
                              </td>

                              {/* Forma de Pagamento */}
                              <td className="p-4 whitespace-nowrap">
                                <div className="flex items-center gap-1.5 text-neutral-300 font-sans text-xs">
                                  <CreditCard className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                                  <span>{s.paymentMethod || 'PIX à Vista'}</span>
                                </div>
                                <span className="text-[10px] text-emerald-400 font-mono block mt-0.5">
                                  ✓ Pagamento Confirmado
                                </span>
                              </td>

                              {/* Em que o aluno tem mais dificuldade */}
                              <td className="p-4 max-w-xs font-sans">
                                {s.difficulties && s.difficulties.trim() !== '' && s.difficulties !== 'Nenhuma dificuldade registrada' ? (
                                  <div className="p-2 rounded-xl bg-amber-950/30 border border-amber-800/50 text-amber-200 text-[11px] leading-relaxed">
                                    <div className="flex items-center gap-1 font-bold text-amber-400 mb-0.5 text-[10px]">
                                      <HelpCircle className="w-3 h-3" />
                                      <span>Ponto de Atenção:</span>
                                    </div>
                                    {s.difficulties}
                                  </div>
                                ) : (
                                  <span className="text-neutral-500 text-[11px] italic">
                                    Nenhuma dificuldade crítica informada
                                  </span>
                                )}
                                {s.pedagogicalNotes && (
                                  <div className="text-[10px] text-neutral-400 mt-1 line-clamp-1">
                                    <strong>Obs:</strong> {s.pedagogicalNotes}
                                  </div>
                                )}
                              </td>

                              {/* Média do Aluno com destaque da regra > 6.0 */}
                              <td className="p-4 whitespace-nowrap">
                                {grade !== null ? (
                                  <div className="space-y-1">
                                    <div className="text-base font-bold font-mono text-white flex items-center gap-2">
                                      <span>{grade.toFixed(1)}</span>
                                      <span className="text-[10px] text-neutral-400 font-sans">/ 10</span>
                                    </div>
                                    {isPassing ? (
                                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-950/80 text-emerald-400 border border-emerald-800/80 inline-flex items-center gap-1">
                                        <CheckCircle2 className="w-3 h-3" />
                                        <span>APROVADO (&gt; 6.0)</span>
                                      </span>
                                    ) : (
                                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-red-950/80 text-red-400 border border-red-800/80 inline-flex items-center gap-1">
                                        <AlertTriangle className="w-3 h-3" />
                                        <span>ABAIXO DE 6.0</span>
                                      </span>
                                    )}
                                  </div>
                                ) : (
                                  <div className="text-neutral-500 text-[11px]">
                                    <div>Sem notas ainda</div>
                                    <span className="text-[10px] text-neutral-600">(Exige &gt; 6.0)</span>
                                  </div>
                                )}
                              </td>

                              {/* Status / Etapa Liberada */}
                              <td className="p-4 whitespace-nowrap">
                                <div>
                                  <span className="px-2 py-0.5 rounded bg-neutral-950 border border-neutral-800 text-neutral-300 font-bold text-[11px]">
                                    Módulo 0{s.currentModuleId || 1}
                                  </span>
                                </div>
                                <span
                                  className={`px-2 py-0.5 rounded text-[10px] font-bold inline-block mt-1 ${
                                    isActive
                                      ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                                      : 'bg-red-950 text-red-400 border border-red-800'
                                  }`}
                                >
                                  {isActive ? 'MATRÍCULA ATIVA' : 'SUSPENSA'}
                                </span>
                              </td>

                              {/* Ações */}
                              <td className="p-4 text-right whitespace-nowrap">
                                <div className="inline-flex items-center gap-1.5 font-sans">
                                  {/* Botão de Entrar/Testar como este Aluno */}
                                  {onSwitchToStudentPreview && (
                                    <button
                                      type="button"
                                      onClick={onSwitchToStudentPreview}
                                      className="px-2.5 py-1 bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30 rounded-lg text-xs cursor-pointer flex items-center gap-1 font-mono font-bold transition"
                                      title="Entrar na Área do Aluno simulando o Lucas Teste"
                                    >
                                      <Eye className="w-3.5 h-3.5 text-amber-400" />
                                      <span>Testar Aluno</span>
                                    </button>
                                  )}

                                  {/* Botão de Editar Aluno */}
                                  <button
                                    type="button"
                                    onClick={() => {
                                      setStudentToEdit(s);
                                      setStudentModalOpen(true);
                                    }}
                                    className="px-2.5 py-1 bg-neutral-800 hover:bg-neutral-700 text-neutral-200 hover:text-white rounded-lg text-xs cursor-pointer flex items-center gap-1 font-mono"
                                    title="Editar ficha pedagógica, média e dados do aluno"
                                  >
                                    <Edit2 className="w-3.5 h-3.5" />
                                    <span>Editar</span>
                                  </button>

                                  {/* Botão de Suspender/Ativar */}
                                  <button
                                    type="button"
                                    onClick={() => handleToggleStudentStatus(s.id, status)}
                                    className="px-2.5 py-1 bg-neutral-800 hover:bg-neutral-700 text-neutral-300 rounded-lg text-xs cursor-pointer font-mono"
                                  >
                                    {isActive ? 'Suspender' : 'Ativar'}
                                  </button>

                                  {/* Botão de Excluir Aluno */}
                                  <button
                                    type="button"
                                    onClick={() => handleDeleteStudent(s.id, s.name)}
                                    className="p-1.5 bg-neutral-900 hover:bg-red-950/80 border border-neutral-800 hover:border-red-800 text-neutral-400 hover:text-red-400 rounded-lg text-xs cursor-pointer transition-colors"
                                    title="Remover aluno"
                                  >
                                    <Trash2 className="w-3.5 h-3.5" />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          );
                        })
                      ) : (
                        <tr>
                          <td colSpan={7} className="p-8 text-center text-neutral-500 font-mono text-xs">
                            Nenhum aluno encontrado para este filtro ou busca. Clique em "+ Acrescentar Novo Aluno" para cadastrar.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: MESA DE CORREÇÃO DISCURSIVA */}
          {activeTab === 'grading' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="border-b border-neutral-800 pb-3 flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold font-display text-white">
                    Avaliações Submetidas pelos Alunos
                  </h3>
                  <p className="text-xs text-neutral-400">
                    Corrija as respostas discursivas e deixe o parecer técnico do professor.
                  </p>
                </div>
                <span className="text-xs font-mono text-amber-400 font-bold">
                  {submissions.length} submissões registradas
                </span>
              </div>

              {gradingSuccess && (
                <div className="p-3 bg-emerald-950/60 border border-emerald-800 text-emerald-300 text-xs rounded-xl flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>{gradingSuccess}</span>
                </div>
              )}

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* List of Submissions */}
                <div className="lg:col-span-6 space-y-3">
                  {submissions.length > 0 ? (
                    submissions.map((sub) => {
                      const isSelected = selectedSubmission?.id === sub.id;
                      const student = studentList.find((s) => s && s.id === sub.studentId);
                      return (
                        <div
                          key={sub.id}
                          onClick={() => {
                            setSelectedSubmission(sub);
                            setDiscursiveScore(3.0);
                            setTeacherComment(sub.teacherGeneralFeedback || '');
                          }}
                          className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                            isSelected
                              ? 'bg-amber-950/30 border-amber-500 shadow-md'
                              : 'bg-neutral-900 border-neutral-800 hover:border-neutral-700'
                          }`}
                        >
                          <div className="flex items-center justify-between text-xs font-mono mb-1">
                            <span className="text-amber-400 font-bold">
                              Módulo 0{sub.moduleId}
                            </span>
                            <span className="text-white font-bold text-sm">
                              {sub.finalGrade.toFixed(1)} / 10.0
                            </span>
                          </div>
                          <h4 className="text-sm font-bold text-white font-sans">
                            {student?.name || 'Aluno Matriculado'}
                          </h4>
                          <div className="flex items-center justify-between text-[11px] text-neutral-400 font-mono mt-2">
                            <span>
                              {new Date(sub.submittedAt).toLocaleDateString('pt-BR')}
                            </span>
                            <span
                              className={`px-2 py-0.5 rounded text-[10px] ${
                                sub.status === 'graded'
                                  ? 'bg-emerald-950 text-emerald-400'
                                  : 'bg-amber-950 text-amber-400'
                              }`}
                            >
                              {sub.status === 'graded' ? 'CORRIGIDO' : 'AGUARDANDO CORREÇÃO'}
                            </span>
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <div className="p-8 rounded-2xl bg-neutral-900 border border-neutral-800 text-center text-xs text-neutral-500 font-mono">
                      Nenhuma avaliação enviada ainda.
                    </div>
                  )}
                </div>

                {/* Grading Panel */}
                <div className="lg:col-span-6">
                  {selectedSubmission ? (
                    <form
                      onSubmit={handleGradeDiscursive}
                      className="p-6 rounded-3xl bg-neutral-900 border border-neutral-800 space-y-5"
                    >
                      <h3 className="text-sm font-bold font-display text-white border-b border-neutral-800 pb-2">
                        Correção da Avaliação do Módulo 0{selectedSubmission.moduleId}
                      </h3>

                      {/* Display Discursive Answer */}
                      <div className="space-y-2">
                        <label className="block text-xs font-mono text-neutral-400">
                          Resposta Discursiva do Aluno:
                        </label>
                        <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800 text-xs text-neutral-200 leading-relaxed max-h-48 overflow-y-auto font-sans">
                          {selectedSubmission.answers.find((a) => a.discursiveText)
                            ?.discursiveText || 'Nenhuma resposta em texto encontrada.'}
                        </div>
                      </div>

                      {/* Score Input */}
                      <div>
                        <label className="block text-xs font-mono text-neutral-400 mb-1">
                          Nota da Questão Discursiva (0.0 a 3.0 pts):
                        </label>
                        <input
                          type="number"
                          step="0.5"
                          min="0"
                          max="3"
                          required
                          value={discursiveScore}
                          onChange={(e) => setDiscursiveScore(Number(e.target.value))}
                          className="w-full px-3.5 py-2.5 bg-neutral-950 border border-neutral-700 rounded-xl text-white font-mono text-xs focus:outline-none focus:border-amber-500"
                        />
                      </div>

                      {/* Feedback */}
                      <div>
                        <label className="block text-xs font-mono text-neutral-400 mb-1">
                          Parecer do Professor Tony de Luc:
                        </label>
                        <textarea
                          rows={3}
                          value={teacherComment}
                          onChange={(e) => setTeacherComment(e.target.value)}
                          placeholder="Excelente domínio do plano cinematográfico..."
                          className="w-full p-3 bg-neutral-950 border border-neutral-700 rounded-xl text-white text-xs focus:outline-none focus:border-amber-500 font-sans"
                        />
                      </div>

                      <button
                        type="submit"
                        className="w-full py-3 bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold uppercase rounded-xl text-xs transition-all cursor-pointer font-sans"
                      >
                        Salvar Nota & Atualizar Boletim do Aluno
                      </button>
                    </form>
                  ) : (
                    <div className="p-12 rounded-3xl bg-neutral-900 border border-neutral-800 text-center text-xs text-neutral-500 font-mono">
                      Selecione uma avaliação na lista ao lado para atribuir nota e parecer técnico.
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: CONTENT MANAGEMENT - COM BOTÃO DE EDITAR E ESCREVER */}
          {activeTab === 'content' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="border-b border-neutral-800 pb-3 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className="text-base font-bold font-display text-white">
                    Módulos, Apostilas Digitais & Masterclasses
                  </h3>
                  <p className="text-xs text-neutral-400">
                    Edite títulos, ementas, links de vídeo das aulas e PDFs das 10 etapas do curso.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={loadAllAdminData}
                  className="px-3 py-1.5 bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 text-neutral-300 rounded-xl text-xs cursor-pointer flex items-center gap-1.5 font-mono"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Atualizar Conteúdos</span>
                </button>
              </div>

              {/* Banner / Atalho para Gerenciamento dos Filmes e URLs dos Vídeos */}
              <div className="p-5 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-lg">
                <div className="flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
                    <Film className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white font-display">
                      Cinemateca do CINELAB: URLs de Vídeos dos 10 Módulos
                    </h4>
                    <p className="text-xs text-neutral-300">
                      Visualize todos os 10 filmes, assista no player integrado, edite links do YouTube/Vimeo e altere orientações pedagógicas para cada etapa.
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => onNavigate('filmes-leituras')}
                  className="px-4 py-2.5 bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold rounded-xl text-xs flex items-center gap-2 cursor-pointer transition-all shadow-md shadow-amber-500/20 shrink-0 font-sans"
                >
                  <span>Abrir Cinemateca & Editar URLs</span>
                  <span>→</span>
                </button>
              </div>

              {/* Central de Upload Rápido de Vídeos Direto do Computador */}
              <div className="p-5 sm:p-6 rounded-2xl bg-neutral-950 border border-neutral-800 space-y-4 shadow-lg">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-neutral-800 pb-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
                      <Upload className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-xs sm:text-sm font-bold text-white font-display">
                        Central de Upload de Vídeos das Aulas (Direto do Computador)
                      </h4>
                      <p className="text-[11px] text-neutral-400">
                        Envie os arquivos MP4, WebM ou MOV das masterclasses gravadas diretamente do seu PC para o servidor
                      </p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                  <div className="md:col-span-5">
                    <label className="block text-neutral-400 text-xs mb-1 font-mono">
                      Selecione a Etapa / Módulo de destino:
                    </label>
                    <select
                      value={quickUploadModuleId}
                      onChange={(e) => setQuickUploadModuleId(Number(e.target.value))}
                      className="w-full px-3.5 py-2.5 bg-neutral-900 border border-neutral-700 rounded-xl text-white text-xs focus:border-amber-500 focus:outline-none font-sans"
                    >
                      {modules.map((m) => (
                        <option key={m.id} value={m.id}>
                          Etapa 0{m.id}: {m.title}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="md:col-span-7">
                    <label className="block text-neutral-400 text-xs mb-1 font-mono">
                      Arquivo de Vídeo do seu Computador:
                    </label>
                    <div className="flex flex-col sm:flex-row gap-2">
                      <label className="flex-1 px-4 py-2.5 bg-neutral-900 hover:bg-neutral-800 border border-dashed border-neutral-700 hover:border-amber-500 rounded-xl cursor-pointer text-xs font-sans text-neutral-300 flex items-center justify-center gap-2 transition-all">
                        {uploadingModuleVideo === quickUploadModuleId ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin text-amber-400" />
                            <span className="text-amber-300 font-bold">Subindo {quickUploadProgress}%...</span>
                          </>
                        ) : (
                          <>
                            <Upload className="w-4 h-4 text-amber-400" />
                            <span>Clique para escolher vídeo (MP4, WebM, MOV)</span>
                          </>
                        )}
                        <input
                          type="file"
                          accept="video/mp4,video/webm,video/quicktime,video/x-matroska,video/*"
                          disabled={uploadingModuleVideo !== null}
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) handleQuickVideoUpload(quickUploadModuleId, file);
                          }}
                          className="hidden"
                        />
                      </label>
                    </div>

                    {uploadingModuleVideo === quickUploadModuleId && (
                      <div className="mt-2 space-y-1">
                        <div className="w-full h-1.5 bg-neutral-800 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-amber-500 to-yellow-400 transition-all duration-300"
                            style={{ width: `${quickUploadProgress}%` }}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Central de Upload e Gestão de Apostilas em PDF Direto do Computador */}
              <div className="p-5 sm:p-6 rounded-2xl bg-neutral-950 border border-neutral-800 space-y-4 shadow-lg">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-neutral-800 pb-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400 shrink-0">
                      <FileText className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-xs sm:text-sm font-bold text-white font-display">
                        Central de Gestão, Nome &amp; Upload de Apostilas em PDF
                      </h4>
                      <p className="text-[11px] text-neutral-400">
                        Altere o nome da apostila, envie o arquivo PDF de cada etapa e disponibilize para os alunos
                      </p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end">
                  <div className="md:col-span-3">
                    <label className="block text-neutral-400 text-xs mb-1 font-mono">
                      Selecione a Apostila (Módulo ou Bônus):
                    </label>
                    <select
                      value={quickUploadApostilaModuleId}
                      onChange={(e) => setQuickUploadApostilaModuleId(Number(e.target.value))}
                      className="w-full px-3.5 py-2.5 bg-neutral-900 border border-neutral-700 rounded-xl text-white text-xs focus:border-amber-500 focus:outline-none font-sans"
                    >
                      <optgroup label="Módulos Regulares (01 a 10)">
                        {modules.map((m) => {
                          const curApos = apostilas.find((a) => a.moduleId === m.id);
                          return (
                            <option key={m.id} value={m.id}>
                              Apostila 0{m.id}: {curApos?.title || m.title}
                            </option>
                          );
                        })}
                      </optgroup>
                      <optgroup label="Apostilas Bônus Especiais">
                        {bonusApostilas.map((b) => (
                          <option key={`bonus-${b.number}`} value={990 + b.number}>
                            {b.code || `BÔNUS 0${b.number}`}: {b.title}
                          </option>
                        ))}
                      </optgroup>
                    </select>
                  </div>

                  <div className="md:col-span-3">
                    <label className="block text-amber-300 font-bold text-xs mb-1 font-mono flex items-center justify-between">
                      <span>Nome / Título da Apostila:</span>
                      <span className="text-[10px] text-neutral-400 font-normal">Editável</span>
                    </label>
                    <div className="flex items-center gap-1.5">
                      <input
                        type="text"
                        value={quickUploadApostilaTitle}
                        onChange={(e) => setQuickUploadApostilaTitle(e.target.value)}
                        placeholder="Ex: História do Cinema"
                        className="flex-1 px-3 py-2.5 bg-neutral-900 border border-amber-500/50 focus:border-amber-400 rounded-xl text-white text-xs font-sans focus:outline-none shadow-inner"
                      />
                      <button
                        type="button"
                        onClick={handleSaveQuickApostilaTitle}
                        disabled={savingQuickTitle}
                        className="px-3 py-2.5 bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold rounded-xl text-xs transition-colors cursor-pointer shrink-0 shadow-sm flex items-center gap-1 font-sans"
                        title="Salvar o nome digitado para esta apostila"
                      >
                        {savingQuickTitle ? (
                          <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        ) : (
                          <Check className="w-3.5 h-3.5" />
                        )}
                        <span>Salvar</span>
                      </button>
                    </div>
                  </div>

                  <div className="md:col-span-3">
                    <label className="block text-neutral-400 text-xs mb-1 font-mono">
                      Subir Novo PDF (.PDF até 200MB):
                    </label>
                    <div className="flex flex-col sm:flex-row gap-2">
                      <label className="flex-1 px-3.5 py-2.5 bg-neutral-900 hover:bg-neutral-800 border border-dashed border-neutral-700 hover:border-blue-500 rounded-xl cursor-pointer text-xs font-sans text-neutral-300 flex items-center justify-center gap-2 transition-all">
                        {uploadingModuleApostila === quickUploadApostilaModuleId ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin text-blue-400" />
                            <span className="text-blue-300 font-bold">Subindo {quickUploadApostilaProgress}%...</span>
                          </>
                        ) : (
                          <>
                            <FileText className="w-4 h-4 text-blue-400" />
                            <span className="truncate">Escolher Arquivo PDF</span>
                          </>
                        )}
                        <input
                          type="file"
                          accept="application/pdf,.pdf"
                          disabled={uploadingModuleApostila !== null}
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) handleQuickApostilaUpload(quickUploadApostilaModuleId, file);
                          }}
                          className="hidden"
                        />
                      </label>
                    </div>
                  </div>

                  {/* Coluna 4: Subir Imagem de Capa da Apostila */}
                  <div className="md:col-span-3">
                    <label className="block text-amber-400 font-bold text-xs mb-1 font-mono flex items-center justify-between">
                      <span>Capa da Apostila:</span>
                      {(() => {
                        const cur = quickUploadApostilaModuleId > 990
                          ? bonusApostilas.find((b) => b.number === quickUploadApostilaModuleId - 990)
                          : apostilas.find((a) => a.moduleId === quickUploadApostilaModuleId);
                        return cur?.coverUrl ? <span className="text-[10px] text-emerald-400 font-normal">Capa Ativa</span> : null;
                      })()}
                    </label>
                    <div className="flex items-center gap-2">
                      <div className="w-10 h-11 rounded-lg bg-neutral-900 border border-neutral-700 overflow-hidden shrink-0 flex items-center justify-center shadow-inner">
                        {(() => {
                          const fallbackUrl = quickUploadApostilaModuleId > 990
                            ? undefined
                            : `/images/covers/apostila-${quickUploadApostilaModuleId < 10 ? '0' + quickUploadApostilaModuleId : quickUploadApostilaModuleId}.jpg`;
                          const cur = quickUploadApostilaModuleId > 990
                            ? bonusApostilas.find((b) => b.number === quickUploadApostilaModuleId - 990)
                            : apostilas.find((a) => a.moduleId === quickUploadApostilaModuleId);
                          const effectiveCover = (cur?.coverUrl && !cur.coverUrl.includes('unsplash.com')) ? cur.coverUrl : fallbackUrl;
                          return effectiveCover ? (
                            <img
                              src={effectiveCover}
                              alt="Capa"
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                if (fallbackUrl && e.currentTarget.src !== fallbackUrl && !e.currentTarget.src.endsWith(fallbackUrl)) {
                                  e.currentTarget.src = fallbackUrl;
                                }
                              }}
                            />
                          ) : (
                            <ImageIcon className="w-4 h-4 text-neutral-600" />
                          );
                        })()}
                      </div>
                      <label className="flex-1 px-3 py-2.5 bg-neutral-900 hover:bg-neutral-800 border border-dashed border-amber-500/50 hover:border-amber-400 rounded-xl cursor-pointer text-xs font-sans text-neutral-300 flex items-center justify-center gap-1.5 transition-all">
                        {uploadingApostilaCover === quickUploadApostilaModuleId ? (
                          <>
                            <Loader2 className="w-3.5 h-3.5 animate-spin text-amber-400" />
                            <span className="text-amber-300 font-bold">{quickUploadApostilaCoverProgress}%</span>
                          </>
                        ) : (
                          <>
                            <Upload className="w-3.5 h-3.5 text-amber-400" />
                            <span className="truncate">Subir Capa (Imagem)</span>
                          </>
                        )}
                        <input
                          type="file"
                          accept="image/*"
                          disabled={uploadingApostilaCover !== null}
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) handleQuickApostilaCoverUpload(quickUploadApostilaModuleId, file);
                          }}
                          className="hidden"
                        />
                      </label>
                    </div>
                  </div>

                    {uploadingModuleApostila === quickUploadApostilaModuleId && (
                      <div className="mt-2 space-y-1">
                        <div className="w-full h-1.5 bg-neutral-800 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 transition-all duration-300"
                            style={{ width: `${quickUploadApostilaProgress}%` }}
                          />
                        </div>
                      </div>
                    )}
                  </div>

                {/* Banner de Gerenciamento Direto dos 2 Vídeos Extras da Apostila Selecionada */}
                <div className="pt-3 border-t border-neutral-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-neutral-900/60 p-3.5 rounded-xl border border-neutral-800/80">
                  <div className="flex items-center gap-2.5 text-xs text-amber-200">
                    <div className="w-8 h-8 rounded-lg bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 shrink-0">
                      <Film className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-white block">2 Locais de Vídeos Extras para Estudo</span>
                        <span className="px-1.5 py-0.5 rounded bg-red-950 text-red-300 border border-red-800 text-[10px] font-mono font-bold">
                          MP4 + YouTube
                        </span>
                      </div>
                      <span className="text-[11px] text-neutral-400">
                        Suba vídeos direto do computador (MP4) ou vincule pelo YouTube nos 2 locais da apostila selecionada
                      </span>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      if (quickUploadApostilaModuleId > 990) {
                        const bNum = quickUploadApostilaModuleId - 990;
                        const foundB = bonusApostilas.find((b) => b.number === bNum);
                        if (foundB) setExtraVideosModalApostila(foundB);
                      } else {
                        const foundApos = apostilas.find((a) => a.moduleId === quickUploadApostilaModuleId);
                        const foundMod = modules.find((m) => m.id === quickUploadApostilaModuleId);
                        const isDuplicatedMod1Title = quickUploadApostilaModuleId !== 1 && foundApos?.title === 'Introdução ao Cinema e à Linguagem Audiovisual';
                        const safeTitle = (isDuplicatedMod1Title ? foundMod?.title : (foundApos?.title || foundMod?.title)) || quickUploadApostilaTitle;
                        const safeApos = foundApos ? { ...foundApos, title: safeTitle } : {
                          id: `apostila-${quickUploadApostilaModuleId}`,
                          moduleId: quickUploadApostilaModuleId,
                          number: quickUploadApostilaModuleId,
                          title: safeTitle,
                        } as any;
                        setExtraVideosModalApostila(safeApos);
                      }
                    }}
                    className="px-4 py-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-neutral-950 font-bold rounded-xl text-xs transition-all cursor-pointer flex items-center gap-1.5 shadow"
                  >
                    <Film className="w-3.5 h-3.5" />
                    <span>Gerenciar 2 Vídeos Extras (MP4 / YouTube)</span>
                  </button>
                </div>
              </div>

              {/* Central de Upload de Capa dos Vídeos das Aulas (Direto do Computador) */}
              <div className="p-5 sm:p-6 rounded-2xl bg-neutral-950 border border-neutral-800 space-y-4 shadow-lg">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-neutral-800 pb-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
                      <ImageIcon className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-xs sm:text-sm font-bold text-white font-display">
                        Central de Upload de Capa dos Vídeos (Direto do Computador)
                      </h4>
                      <p className="text-[11px] text-neutral-400">
                        Envie imagens de capa (JPG, PNG, WebP) para as videoaulas de cada uma das 10 etapas do curso
                      </p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                  <div className="md:col-span-5 space-y-2">
                    <label className="block text-neutral-400 text-xs mb-1 font-mono">
                      Selecione a Etapa / Módulo:
                    </label>
                    <select
                      value={quickUploadThumbnailModuleId}
                      onChange={(e) => setQuickUploadThumbnailModuleId(Number(e.target.value))}
                      className="w-full px-3.5 py-2.5 bg-neutral-900 border border-neutral-700 rounded-xl text-white text-xs focus:border-amber-500 focus:outline-none font-sans"
                    >
                      {modules.map((m) => (
                        <option key={m.id} value={m.id}>
                          Módulo 0{m.id}: {m.title}
                        </option>
                      ))}
                    </select>

                    {/* Prévia da capa atual do módulo selecionado */}
                    {(() => {
                      const curVid = videos.find((v) => v.moduleId === quickUploadThumbnailModuleId);
                      return curVid?.thumbnailUrl ? (
                        <div className="flex items-center gap-2.5 p-2 bg-neutral-900/60 rounded-xl border border-neutral-800">
                          <img
                            src={curVid.thumbnailUrl}
                            alt="Capa Atual"
                            className="w-14 h-9 object-cover rounded-lg border border-neutral-700 shrink-0"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = '/images/cinelab-cover.jpg';
                            }}
                          />
                          <div className="min-w-0 flex-1">
                            <span className="text-[10px] text-amber-300 font-mono block">Capa cadastrada</span>
                            <span className="text-[10px] text-neutral-400 font-mono truncate block">
                              {curVid.thumbnailUrl}
                            </span>
                          </div>
                        </div>
                      ) : (
                        <span className="text-[10px] font-mono text-neutral-500 block">
                          Nenhuma capa personalizada cadastrada ainda.
                        </span>
                      );
                    })()}
                  </div>

                  <div className="md:col-span-7">
                    <label className="block text-neutral-400 text-xs mb-1 font-mono">
                      Imagem de Capa (JPG, PNG, WebP):
                    </label>
                    <div className="flex flex-col sm:flex-row gap-2">
                      <label className="flex-1 px-4 py-2.5 bg-neutral-900 hover:bg-neutral-800 border border-dashed border-neutral-700 hover:border-amber-500 rounded-xl cursor-pointer text-xs font-sans text-neutral-300 flex items-center justify-center gap-2 transition-all">
                        {uploadingModuleThumbnail === quickUploadThumbnailModuleId ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin text-amber-400" />
                            <span className="text-amber-300 font-bold">Subindo capa {quickUploadThumbnailProgress}%...</span>
                          </>
                        ) : (
                          <>
                            <Upload className="w-4 h-4 text-amber-400" />
                            <span>Clique para escolher imagem do computador</span>
                          </>
                        )}
                        <input
                          type="file"
                          accept="image/jpeg,image/png,image/webp,image/avif,image/gif"
                          disabled={uploadingModuleThumbnail !== null}
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) handleQuickThumbnailUpload(quickUploadThumbnailModuleId, file);
                          }}
                          className="hidden"
                        />
                      </label>
                    </div>

                    {uploadingModuleThumbnail === quickUploadThumbnailModuleId && (
                      <div className="mt-2 space-y-1">
                        <div className="w-full h-1.5 bg-neutral-800 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-amber-500 to-yellow-400 transition-all duration-300"
                            style={{ width: `${quickUploadThumbnailProgress}%` }}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* 10 Modules List with Edit Button */}
              <div className="space-y-4">
                {modules.map((mod) => {
                  const matchingApostila = apostilas.find((a) => a.moduleId === mod.id);
                  const matchingVideo = videos.find((v) => v.moduleId === mod.id);

                  return (
                    <div
                      key={mod.id}
                      className="p-5 rounded-2xl bg-neutral-900 border border-neutral-800 hover:border-neutral-700 transition-all flex flex-col lg:flex-row lg:items-center justify-between gap-4 shadow-md"
                    >
                      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 max-w-2xl">
                        {/* Miniatura da Capa da Apostila com Upload ao Clicar */}
                        <div className="relative group w-16 sm:w-20 aspect-[1/1.4] rounded-lg overflow-hidden border border-neutral-700 bg-neutral-950 shrink-0 shadow-md">
                          {(() => {
                            const fallbackUrl = `/images/covers/apostila-${mod.id < 10 ? '0' + mod.id : mod.id}.jpg`;
                            const effectiveCover = (matchingApostila?.coverUrl && !matchingApostila.coverUrl.includes('unsplash.com')) ? matchingApostila.coverUrl : fallbackUrl;
                            return (
                              <img
                                src={effectiveCover}
                                alt={`Capa Apostila ${mod.id}`}
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                  if (e.currentTarget.src !== fallbackUrl && !e.currentTarget.src.endsWith(fallbackUrl)) {
                                    e.currentTarget.src = fallbackUrl;
                                  }
                                }}
                              />
                            );
                          })()}
                          <label className="absolute inset-0 bg-black/80 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center cursor-pointer p-1 text-center">
                            <ImageIcon className="w-3.5 h-3.5 text-purple-300 mb-0.5" />
                            <span className="text-[8px] font-sans font-medium text-purple-200 leading-tight">Subir Capa</span>
                            <input
                              type="file"
                              accept="image/jpeg,image/png,image/webp,image/avif"
                              disabled={uploadingApostilaCover !== null}
                              onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) handleQuickApostilaCoverUpload(mod.id, file);
                              }}
                              className="hidden"
                            />
                          </label>
                        </div>

                        <div className="space-y-1.5 flex-1 min-w-0">
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="px-2 py-0.5 rounded bg-amber-500/20 border border-amber-500/40 text-amber-300 font-mono text-[10px] font-bold">
                              ETAPA 0{mod.id}
                            </span>
                            <span className="text-[11px] font-mono text-neutral-400">
                              {mod.subtitle}
                            </span>
                            {matchingVideo?.videoUrl?.startsWith('/uploads/') && (
                              <span className="px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-mono text-[10px] flex items-center gap-1">
                                <CheckCircle2 className="w-3 h-3" /> Vídeo no Servidor
                              </span>
                            )}
                            {matchingApostila?.pdfUrl && (
                              <span className="px-2 py-0.5 rounded bg-blue-500/10 border border-blue-500/30 text-blue-400 font-mono text-[10px] flex items-center gap-1">
                                <CheckCircle2 className="w-3 h-3" /> Apostila PDF Ativa
                              </span>
                            )}
                            {matchingApostila?.coverUrl && (
                              <span className="px-2 py-0.5 rounded bg-purple-500/10 border border-purple-500/30 text-purple-300 font-mono text-[10px] flex items-center gap-1">
                                <ImageIcon className="w-3 h-3 text-purple-400" /> Capa Apostila Ativa
                              </span>
                            )}
                            {matchingVideo?.thumbnailUrl && (
                              <span className="px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/30 text-amber-300 font-mono text-[10px] flex items-center gap-1">
                                <ImageIcon className="w-3 h-3 text-amber-400" /> Capa Aula Ativa
                              </span>
                            )}
                          </div>
                          <h4 className="text-sm font-bold text-white font-sans">{mod.title}</h4>
                          <p className="text-xs text-neutral-400 font-sans line-clamp-2 leading-relaxed">
                            {mod.summary}
                          </p>
                          <div className="flex flex-wrap items-center gap-3 pt-1 text-[11px] font-mono text-neutral-400">
                            <span className="flex items-center gap-1 text-neutral-300">
                              <Film className="w-3 h-3 text-amber-400" />
                              Aula: {matchingVideo?.duration || `${matchingVideo?.durationMinutes || 45} min`}
                            </span>
                            <span className="flex items-center gap-1 text-neutral-300">
                              <BookOpen className="w-3 h-3 text-blue-400" />
                              PDF: {matchingApostila?.pagesCount || 30} páginas
                              {matchingApostila?.fileSizeMb ? ` (${matchingApostila.fileSizeMb} MB)` : ''}
                            </span>
                            {matchingApostila?.pdfUrl && (
                              <a
                                href={matchingApostila.pdfUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-amber-400 hover:text-amber-300 underline text-[10px] flex items-center gap-1"
                              >
                                <span>Ver PDF Atual</span>
                                <ExternalLink className="w-2.5 h-2.5" />
                              </a>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-wrap items-center gap-2 shrink-0">
                        {/* Botão Rápido de Subir Capa da Apostila */}
                        <label className="px-3 py-2 bg-neutral-800 hover:bg-neutral-700 text-purple-300 hover:text-white border border-purple-500/30 hover:border-purple-500/60 rounded-xl text-xs transition-colors cursor-pointer flex items-center gap-1.5 font-sans shadow-sm">
                          {uploadingApostilaCover === mod.id ? (
                            <>
                              <Loader2 className="w-3.5 h-3.5 animate-spin text-purple-400" />
                              <span>Subindo Capa {quickUploadApostilaCoverProgress}%...</span>
                            </>
                          ) : (
                            <>
                              <ImageIcon className="w-3.5 h-3.5 text-purple-400" />
                              <span>Subir Capa Apostila</span>
                            </>
                          )}
                          <input
                            type="file"
                            accept="image/jpeg,image/png,image/webp,image/avif"
                            disabled={uploadingApostilaCover !== null}
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) handleQuickApostilaCoverUpload(mod.id, file);
                            }}
                            className="hidden"
                          />
                        </label>

                        {/* Botão Rápido de Subir Vídeo Direto */}
                        <label className="px-3 py-2 bg-neutral-800 hover:bg-neutral-700 text-neutral-200 hover:text-white border border-neutral-700 rounded-xl text-xs transition-colors cursor-pointer flex items-center gap-1.5 font-sans">
                          {uploadingModuleVideo === mod.id ? (
                            <>
                              <Loader2 className="w-3.5 h-3.5 animate-spin text-amber-400" />
                              <span>Subindo {quickUploadProgress}%...</span>
                            </>
                          ) : (
                            <>
                              <Upload className="w-3.5 h-3.5 text-amber-400" />
                              <span>Subir Vídeo</span>
                            </>
                          )}
                          <input
                            type="file"
                            accept="video/mp4,video/webm,video/quicktime,video/x-matroska,video/*"
                            disabled={uploadingModuleVideo !== null}
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) handleQuickVideoUpload(mod.id, file);
                            }}
                            className="hidden"
                          />
                        </label>

                        {/* Botão Rápido de Subir Apostila PDF Direto */}
                        <label className="px-3 py-2 bg-neutral-800 hover:bg-neutral-700 text-neutral-200 hover:text-white border border-neutral-700 rounded-xl text-xs transition-colors cursor-pointer flex items-center gap-1.5 font-sans">
                          {uploadingModuleApostila === mod.id ? (
                            <>
                              <Loader2 className="w-3.5 h-3.5 animate-spin text-blue-400" />
                              <span>Subindo {quickUploadApostilaProgress}%...</span>
                            </>
                          ) : (
                            <>
                              <FileText className="w-3.5 h-3.5 text-blue-400" />
                              <span>Subir Apostila (PDF)</span>
                            </>
                          )}
                          <input
                            type="file"
                            accept="application/pdf,.pdf"
                            disabled={uploadingModuleApostila !== null}
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) handleQuickApostilaUpload(mod.id, file);
                            }}
                            className="hidden"
                          />
                        </label>

                        {/* Botão Direto para Renomear Apostila */}
                        <button
                          type="button"
                          onClick={() => {
                            const isDuplicatedMod1Title = mod.id !== 1 && matchingApostila?.title === 'Introdução ao Cinema e à Linguagem Audiovisual';
                            const effectiveTitle = (isDuplicatedMod1Title ? mod.title : (matchingApostila?.title || mod.title)) || mod.title;
                            handleOpenRenameApostila({
                              id: matchingApostila?.id || `apostila-${mod.id}`,
                              moduleId: mod.id,
                              title: effectiveTitle,
                              isBonus: false,
                            });
                          }}
                          className="px-3 py-2 bg-blue-500/10 hover:bg-blue-500/20 text-blue-300 hover:text-white border border-blue-500/30 rounded-xl text-xs transition-colors cursor-pointer flex items-center gap-1.5 font-sans"
                          title="Mudar o nome/título oficial desta apostila"
                        >
                          <Edit2 className="w-3.5 h-3.5 text-blue-400" />
                          <span>Renomear Apostila</span>
                        </button>

                        {/* Botão para Gerenciar os 2 Vídeos Extras de Estudo da Apostila */}
                        <button
                          type="button"
                          onClick={() => {
                            const isDuplicatedMod1Title = mod.id !== 1 && matchingApostila?.title === 'Introdução ao Cinema e à Linguagem Audiovisual';
                            const effectiveTitle = (isDuplicatedMod1Title ? mod.title : (matchingApostila?.title || mod.title)) || mod.title;
                            const curApos = matchingApostila ? { ...matchingApostila, title: effectiveTitle } : {
                              id: `apostila-${mod.id}`,
                              moduleId: mod.id,
                              number: mod.id,
                              title: effectiveTitle,
                            } as any;
                            setExtraVideosModalApostila(curApos);
                          }}
                          className="px-3 py-2 bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 hover:text-white border border-amber-500/30 rounded-xl text-xs transition-colors cursor-pointer flex items-center gap-1.5 font-sans shadow-sm"
                          title="Gerenciar e subir os 2 vídeos extras para estudo desta apostila (MP4 ou YouTube)"
                        >
                          <Film className="w-3.5 h-3.5 text-amber-400" />
                          <span>2 Vídeos Extras (MP4 / YouTube)</span>
                        </button>

                        {/* Botão Rápido de Subir Capa da Aula Direto */}
                        <label className="px-3 py-2 bg-neutral-800 hover:bg-neutral-700 text-neutral-200 hover:text-white border border-neutral-700 rounded-xl text-xs transition-colors cursor-pointer flex items-center gap-1.5 font-sans">
                          {uploadingModuleThumbnail === mod.id ? (
                            <>
                              <Loader2 className="w-3.5 h-3.5 animate-spin text-amber-400" />
                              <span>Subindo {quickUploadThumbnailProgress}%...</span>
                            </>
                          ) : (
                            <>
                              <ImageIcon className="w-3.5 h-3.5 text-amber-400" />
                              <span>Subir Capa</span>
                            </>
                          )}
                          <input
                            type="file"
                            accept="image/jpeg,image/png,image/webp,image/avif,image/gif"
                            disabled={uploadingModuleThumbnail !== null}
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) handleQuickThumbnailUpload(mod.id, file);
                            }}
                            className="hidden"
                          />
                        </label>

                        {/* Botão de Editar Módulo */}
                        <button
                          type="button"
                          onClick={() => {
                            setModuleToEdit(mod);
                            setModuleModalOpen(true);
                          }}
                          className="px-4 py-2 bg-amber-500/20 hover:bg-amber-500 border border-amber-500/40 hover:border-amber-400 text-amber-300 hover:text-neutral-950 font-bold rounded-xl text-xs transition-all cursor-pointer flex items-center gap-1.5 font-sans"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                          <span>Editar Módulo, Vídeo & PDF</span>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* SEÇÃO ESPECIAL: APOSTILAS BÔNUS (UPLOAD & GESTÃO DE PDFS) */}
              <div className="pt-8 border-t border-neutral-800 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-amber-400" />
                    <div>
                      <h3 className="text-base sm:text-lg font-bold text-white font-sans flex items-center gap-2">
                        <span>Apostilas Bônus Especiais (Upload & Gestão de PDFs)</span>
                        <span className="px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/30 text-amber-400 font-mono text-[10px]">
                          Bônus Complementares
                        </span>
                      </h3>
                      <p className="text-xs text-neutral-400">
                        Suba apostilas bônus em PDF, defina o nome e a contagem de páginas para disponibilização imediata aos alunos.
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      setBonusToEdit({
                        id: 'bonus-new',
                        number: (bonusApostilas.length || 2) + 1,
                        code: `BÔNUS 0${(bonusApostilas.length || 2) + 1}`,
                        title: `Nova Apostila Bônus 0${(bonusApostilas.length || 2) + 1}`,
                        totalPages: 50,
                        pagesCount: 50,
                        summary: '',
                        description: '',
                        isUnlocked: true,
                      } as any);
                      setBonusModalOpen(true);
                    }}
                    className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold rounded-xl text-xs transition-all cursor-pointer flex items-center gap-1.5 shadow-sm whitespace-nowrap"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Cadastrar Nova Apostila Bônus</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {(bonusApostilas.length > 0 ? bonusApostilas : [
                    {
                      id: 'bonus-01',
                      number: 1,
                      code: 'BÔNUS 01',
                      title: 'Glossário Completo de Planos',
                      totalPages: 30,
                      pagesCount: 30,
                      pdfUrl: '/materiais/cinelab-bonus-01-glossario-planos.pdf',
                      summary: 'Guia permanente de consulta técnica para decupagem cinematográfica, escalas de planos e movimentos de câmera.',
                      isUnlocked: true,
                    },
                    {
                      id: 'bonus-02',
                      number: 2,
                      code: 'BÔNUS 02',
                      title: 'Glossário Completo de Roteiro',
                      totalPages: 29,
                      pagesCount: 29,
                      pdfUrl: '/materiais/cinelab-bonus-02-glossario-roteiro.pdf',
                      summary: 'Guia permanente de consulta dramatúrgica: da criação de premissa, storyline e sinopse à escaleta e roteiro final.',
                      isUnlocked: true,
                    },
                    {
                      id: 'bonus-03',
                      number: 3,
                      code: 'BÔNUS 03',
                      title: 'Método de Análise Fílmica em 6 Camadas',
                      totalPages: 27,
                      pagesCount: 27,
                      pdfUrl: '/materiais/cinelab-bonus-03-analise-filmica.pdf',
                      summary: 'A metodologia analítica do CINELAB em 6 camadas: Narrativa, Personagem, Espaço, Imagem (Fotografia), Som e Montagem para dissecar qualquer obra audiovisual como realizador.',
                      isUnlocked: true,
                    }
                  ]).map((b: any) => {
                    const rawPages = b.pagesCount || b.totalPages;
                    const displayPages = rawPages && rawPages !== 4 && rawPages !== 24 && rawPages !== 96 && rawPages !== 104 ? rawPages : (b.number === 1 ? 30 : (b.number === 3 ? 27 : 29));
                    return (
                      <div
                        key={b.id || b.number}
                        className="p-5 rounded-2xl bg-neutral-900 border border-amber-500/30 hover:border-amber-500/60 transition-all flex flex-col justify-between gap-4 shadow-md"
                      >
                        <div className="flex flex-col sm:flex-row gap-4">
                          {/* Miniatura da Capa da Apostila Bônus com Upload ao Clicar */}
                          <div className="relative group w-20 sm:w-24 aspect-[1/1.4] rounded-lg overflow-hidden border border-neutral-700 bg-neutral-950 shrink-0 shadow-md">
                            {b.coverUrl ? (
                              <img
                                src={b.coverUrl}
                                alt={`Capa ${b.title}`}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <div className="w-full h-full bg-gradient-to-br from-neutral-900 via-neutral-950 to-neutral-900 flex flex-col items-center justify-center p-1.5 text-center border border-amber-500/20">
                                <BookOpen className="w-4 h-4 text-amber-500/60 mb-1" />
                                <span className="text-[8px] font-mono text-amber-400 font-bold leading-tight uppercase">
                                  {b.code || `BÔNUS 0${b.number}`}
                                </span>
                                <span className="text-[8px] text-neutral-500 mt-0.5">Sem Capa</span>
                              </div>
                            )}
                            <label className="absolute inset-0 bg-black/80 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center cursor-pointer p-1 text-center">
                              <ImageIcon className="w-3.5 h-3.5 text-purple-300 mb-0.5" />
                              <span className="text-[8px] font-sans font-medium text-purple-200 leading-tight">Subir Capa</span>
                              <input
                                type="file"
                                accept="image/jpeg,image/png,image/webp,image/avif"
                                disabled={uploadingApostilaCover !== null}
                                onChange={(e) => {
                                  const file = e.target.files?.[0];
                                  if (file) handleQuickApostilaCoverUpload(b.id || (b.number + 990), file);
                                }}
                                className="hidden"
                              />
                            </label>
                          </div>

                          <div className="space-y-2 flex-1 min-w-0">
                            <div className="flex items-center justify-between flex-wrap gap-2">
                              <span className="px-2 py-0.5 rounded bg-amber-500/20 border border-amber-500/40 text-amber-300 font-mono text-[10px] font-bold">
                                {b.code || `BÔNUS 0${b.number}`}
                              </span>
                              {/* NÚMERO DE PÁGINAS DESTACADO */}
                              <span className="px-2.5 py-0.5 rounded bg-neutral-800 border border-neutral-700 text-amber-300 font-mono text-[11px] font-bold flex items-center gap-1">
                                <BookOpen className="w-3 h-3 text-amber-400" />
                                {displayPages} páginas
                              </span>
                              {b.pdfUrl && (
                                <span className="px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-mono text-[10px] flex items-center gap-1">
                                  <CheckCircle2 className="w-3 h-3" /> PDF Ativo
                                </span>
                              )}
                              {b.coverUrl && (
                                <span className="px-2 py-0.5 rounded bg-purple-500/10 border border-purple-500/30 text-purple-300 font-mono text-[10px] flex items-center gap-1">
                                  <ImageIcon className="w-3 h-3 text-purple-400" /> Capa Ativa
                                </span>
                              )}
                            </div>

                            {/* NOME DA APOSTILA */}
                            <h4 className="text-sm font-bold text-white font-sans">
                              {b.title}
                            </h4>

                            <p className="text-xs text-neutral-400 font-sans line-clamp-2 leading-relaxed">
                              {b.description || b.summary || 'Material pedagógico complementar oficial do CINELAB.'}
                            </p>

                            {b.pdfUrl && (
                              <a
                                href={b.pdfUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-amber-400 hover:text-amber-300 underline text-[10px] flex items-center gap-1 pt-1"
                              >
                                <span>Ver PDF Atual da Apostila Bônus</span>
                                <ExternalLink className="w-2.5 h-2.5" />
                              </a>
                            )}
                          </div>
                        </div>

                        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-neutral-800">
                          {/* Botão Rápido de Subir Capa da Apostila Bônus */}
                          <label className="px-3 py-2 bg-neutral-800 hover:bg-neutral-700 text-purple-300 hover:text-white border border-purple-500/30 hover:border-purple-500/60 rounded-xl text-xs transition-colors cursor-pointer flex items-center justify-center gap-1.5 font-sans shadow-sm">
                            {uploadingApostilaCover === b.id || uploadingApostilaCover === (b.number + 990) ? (
                              <>
                                <Loader2 className="w-3.5 h-3.5 animate-spin text-purple-400" />
                                <span>Subindo Capa {quickUploadApostilaCoverProgress}%...</span>
                              </>
                            ) : (
                              <>
                                <ImageIcon className="w-3.5 h-3.5 text-purple-400" />
                                <span>Subir Capa Bônus</span>
                              </>
                            )}
                            <input
                              type="file"
                              accept="image/jpeg,image/png,image/webp,image/avif"
                              disabled={uploadingApostilaCover !== null}
                              onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) handleQuickApostilaCoverUpload(b.id || (b.number + 990), file);
                              }}
                              className="hidden"
                            />
                          </label>

                          {/* Botão Rápido de Subir Apostila PDF do Bônus */}
                          <label className="flex-1 px-3 py-2 bg-neutral-800 hover:bg-neutral-700 text-neutral-200 hover:text-white border border-neutral-700 rounded-xl text-xs transition-colors cursor-pointer flex items-center justify-center gap-1.5 font-sans">
                            {uploadingBonusNumber === b.number ? (
                              <>
                                <Loader2 className="w-3.5 h-3.5 animate-spin text-amber-400" />
                                <span>Subindo {uploadingBonusProgress}%...</span>
                              </>
                            ) : (
                              <>
                                <Upload className="w-3.5 h-3.5 text-amber-400" />
                                <span>Subir PDF ({b.code || `Bônus 0${b.number}`})</span>
                              </>
                            )}
                            <input
                              type="file"
                              accept="application/pdf,.pdf"
                              disabled={uploadingBonusNumber !== null}
                              onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) handleQuickBonusApostilaUpload(b.number, file, b.title, displayPages);
                              }}
                              className="hidden"
                            />
                          </label>

                          {/* Botão de Gerenciar 2 Vídeos Extras do Bônus */}
                          <button
                            type="button"
                            onClick={() => setExtraVideosModalApostila(b)}
                            className="px-3 py-2 bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 hover:text-white border border-amber-500/30 rounded-xl text-xs transition-colors cursor-pointer flex items-center gap-1.5 font-sans shadow-sm"
                            title="Gerenciar e subir os 2 vídeos extras para estudo desta apostila bônus"
                          >
                            <Film className="w-3.5 h-3.5 text-amber-400" />
                            <span>2 Vídeos Extras</span>
                          </button>

                          {/* Botão de Editar Detalhes do Bônus */}
                          <button
                            type="button"
                            onClick={() => {
                              setBonusToEdit(b);
                              setBonusModalOpen(true);
                            }}
                            className="px-3.5 py-2 bg-amber-500/20 hover:bg-amber-500 border border-amber-500/40 hover:border-amber-400 text-amber-300 hover:text-neutral-950 font-bold rounded-xl text-xs transition-all cursor-pointer flex items-center gap-1.5 font-sans"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                            <span>Editar Detalhes</span>
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* TAB: RODAPÉ, CONTATO & TONY DE LUC */}
          {activeTab === 'institutional' && settingsData && (
            <InstitutionalTab
              key={settingsData.settings.tonyName || 'inst-tab'}
              settings={settingsData.settings}
              onSaveSettings={handleSaveInstitutionalSettings}
              onNavigate={onNavigate}
              notify={notify}
            />
          )}
          {activeTab === 'institutional' && !settingsData && (
            <div className="flex items-center justify-center p-12">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-amber-500" />
            </div>
          )}

          {/* TAB 6: SETTINGS & TIME TRAVEL */}
          {activeTab === 'settings' && (
            <div className="space-y-8 animate-fadeIn">
              {/* The Sovereign Calendar Time Machine */}
              <div className="p-6 sm:p-8 rounded-3xl bg-neutral-900 border-2 border-amber-500/50 shadow-2xl space-y-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-mono text-amber-400 font-bold uppercase tracking-wider">
                      MÁQUINA DO TEMPO • TESTE DO CRONOGRAMA SOBERANO
                    </span>
                    <h3 className="text-lg font-bold text-white">
                      Simulação do Desbloqueio dos Módulos (Cronograma de 3 Meses)
                    </h3>
                  </div>
                </div>

                <p className="text-xs text-neutral-300 leading-relaxed font-sans">
                  Como o curso do CINELAB dura 3 meses (90 dias) com liberação progressiva calibrada por conteúdo (1 semana no Módulo 01 e 8 a 10 dias nas etapas seguintes), 
                  esta ferramenta permite avançar o tempo no servidor instantaneamente para testar o desbloqueio progressivo das apostilas, vídeos e avaliações.
                </p>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <button
                    type="button"
                    onClick={() => handleQuickTimeTravel(0)}
                    className={`py-3 px-4 rounded-xl border font-mono text-xs cursor-pointer ${
                      simOffset === 0
                        ? 'bg-amber-500 text-neutral-950 font-bold border-amber-400'
                        : 'bg-neutral-950 text-neutral-300 border-neutral-700 hover:bg-neutral-800'
                    }`}
                  >
                    Hoje (M01 Aberto)
                  </button>

                  <button
                    type="button"
                    onClick={() => handleQuickTimeTravel(7)}
                    className={`py-3 px-4 rounded-xl border font-mono text-xs cursor-pointer ${
                      simOffset === 7
                        ? 'bg-amber-500 text-neutral-950 font-bold border-amber-400'
                        : 'bg-neutral-950 text-neutral-300 border-neutral-700 hover:bg-neutral-800'
                    }`}
                  >
                    +7 Dias (M02 Aberto - 1ª Semana)
                  </button>

                  <button
                    type="button"
                    onClick={() => handleQuickTimeTravel(45)}
                    className={`py-3 px-4 rounded-xl border font-mono text-xs cursor-pointer ${
                      simOffset === 45
                        ? 'bg-amber-500 text-neutral-950 font-bold border-amber-400'
                        : 'bg-neutral-950 text-neutral-300 border-neutral-700 hover:bg-neutral-800'
                    }`}
                  >
                    +45 Dias (M05 / Metade do Curso)
                  </button>

                  <button
                    type="button"
                    onClick={() => handleQuickTimeTravel(90)}
                    className={`py-3 px-4 rounded-xl border font-mono text-xs cursor-pointer ${
                      simOffset >= 90
                        ? 'bg-emerald-500 text-neutral-950 font-bold border-emerald-400'
                        : 'bg-neutral-950 text-neutral-300 border-neutral-700 hover:bg-neutral-800'
                    }`}
                  >
                    +90 Dias (10 Módulos - Formatura 3 Meses)
                  </button>
                </div>
              </div>

              {/* General Course Settings Form */}
              <form
                onSubmit={handleSaveSettings}
                className="p-6 sm:p-8 rounded-3xl bg-neutral-900 border border-neutral-800 space-y-6 shadow-xl"
              >
                <div className="border-b border-neutral-800 pb-3 flex items-center justify-between">
                  <h3 className="text-sm font-bold font-display text-white">
                    Configurações Institucionais, Valores e Pagamento PIX
                  </h3>
                  <span className="text-[11px] font-mono text-amber-400">Edição ativa</span>
                </div>

                {/* Banner de Atalho para Rodapé, Contato e Tony de Luc */}
                <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex flex-col sm:flex-row items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <Globe className="w-5 h-5 text-amber-400 shrink-0" />
                    <div className="text-xs">
                      <span className="text-amber-300 font-bold block">
                        Painel Completo: Rodapé, Contato & Tony de Luc
                      </span>
                      <span className="text-neutral-400">
                        Edite todos os textos do rodapé, redes sociais, telefones de suporte e a biografia/currículo/feitos do diretor.
                      </span>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setActiveTab('institutional')}
                    className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-xs rounded-xl cursor-pointer shrink-0 transition-colors"
                  >
                    Editar Rodapé & Tony de Luc
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs font-mono">
                  <div>
                    <label className="block text-neutral-400 mb-1">
                      Preço Promocional Cobrado / "Por Apenas" (R$) *
                    </label>
                    <input
                      type="number"
                      step="0.10"
                      required
                      value={coursePrice}
                      onChange={(e) => setCoursePrice(Number(e.target.value))}
                      className="w-full px-3.5 py-2.5 bg-neutral-950 border border-neutral-700 rounded-xl text-white font-mono text-xs focus:border-amber-500 focus:outline-none"
                    />
                    <span className="text-[10px] text-amber-400/80 mt-1 block">
                      Valor final cobrado na matrícula (padrão: R$ 1.000,00)
                    </span>
                  </div>

                  <div>
                    <label className="block text-neutral-400 mb-1">
                      Preço de Mercado Original (R$)
                    </label>
                    <input
                      type="number"
                      step="0.10"
                      value={coursePriceOriginal}
                      onChange={(e) => setCoursePriceOriginal(Number(e.target.value))}
                      className="w-full px-3.5 py-2.5 bg-neutral-950 border border-neutral-700 rounded-xl text-white font-mono text-xs focus:border-amber-500 focus:outline-none"
                    />
                    <span className="text-[10px] text-neutral-500 mt-1 block">
                      Exibido riscado como referência (padrão: R$ 2.000,00)
                    </span>
                  </div>

                  <div>
                    <label className="block text-neutral-400 mb-1">Chave PIX Oficial</label>
                    <input
                      type="text"
                      value={pixKey}
                      onChange={(e) => setPixKey(e.target.value)}
                      placeholder="financeiro@cinelab.edu.br"
                      className="w-full px-3.5 py-2.5 bg-neutral-950 border border-neutral-700 rounded-xl text-white font-mono text-xs focus:border-amber-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-neutral-400 mb-1">Nome do Favorecido PIX</label>
                    <input
                      type="text"
                      value={pixBeneficiary}
                      onChange={(e) => setPixBeneficiary(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-neutral-950 border border-neutral-700 rounded-xl text-white font-mono text-xs focus:border-amber-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-neutral-400 mb-1">Banco / Instituição</label>
                    <input
                      type="text"
                      value={pixBank}
                      onChange={(e) => setPixBank(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-neutral-950 border border-neutral-700 rounded-xl text-white font-mono text-xs focus:border-amber-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-neutral-400 mb-1">Nome do Diretor / Professor</label>
                    <input
                      type="text"
                      value={directorName}
                      onChange={(e) => setDirectorName(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-neutral-950 border border-neutral-700 rounded-xl text-white font-sans text-xs focus:border-amber-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-neutral-400 mb-1">Cargo / Papel do Diretor</label>
                    <input
                      type="text"
                      value={directorRole}
                      onChange={(e) => setDirectorRole(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-neutral-950 border border-neutral-700 rounded-xl text-white font-sans text-xs focus:border-amber-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-neutral-400 mb-1">E-mail de Atendimento</label>
                    <input
                      type="email"
                      value={contactEmail}
                      onChange={(e) => setContactEmail(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-neutral-950 border border-neutral-700 rounded-xl text-white font-mono text-xs focus:border-amber-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-neutral-400 mb-1">WhatsApp / Telefone de Contato</label>
                    <input
                      type="text"
                      value={contactPhone}
                      onChange={(e) => setContactPhone(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-neutral-950 border border-neutral-700 rounded-xl text-white font-mono text-xs focus:border-amber-500 focus:outline-none"
                    />
                  </div>
                </div>

                {/* Seção Exclusiva: Logotipo Oficial do CINELAB */}
                <div className="p-5 sm:p-6 rounded-2xl bg-neutral-950 border border-neutral-800 space-y-5">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-neutral-800/80 pb-3">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
                        <Sparkles className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="text-xs sm:text-sm font-bold text-white font-display">
                          Logotipo Oficial da Instituição CINELAB
                        </h4>
                        <p className="text-[11px] text-neutral-400">
                          Exibido em destaque e em alta resolução no cabeçalho, rodapé, autenticação e certificados
                        </p>
                      </div>
                    </div>

                    {logoUrl && (
                      <button
                        type="button"
                        onClick={() => {
                          setLogoUrl('');
                          notify('Restaurado o Logotipo Oficial Enviado (Emblema Vertical). Salve as configurações para confirmar.');
                        }}
                        className="text-[11px] text-amber-400 hover:text-amber-300 flex items-center gap-1 font-mono transition-colors self-start sm:self-auto cursor-pointer"
                      >
                        <RotateCcw className="w-3 h-3" />
                        <span>Restaurar Logotipo Oficial Enviado</span>
                      </button>
                    )}
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                    {/* Visual Preview */}
                    <div className="lg:col-span-5 flex flex-col items-center justify-center p-5 rounded-xl bg-neutral-900/90 border border-neutral-800 text-center min-h-[170px]">
                      <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-wider mb-2">
                        Prévia em Tempo Real (Cabeçalho)
                      </span>
                      <div className="py-2.5 px-6 rounded-xl bg-[#0c0d10] border border-neutral-800 flex items-center justify-center shadow-inner">
                        <Logo
                          customUrl={logoUrl}
                          size="header"
                          layout={logoUrl === '/cinelab-logo.svg' ? 'horizontal' : 'stacked'}
                        />
                      </div>
                      <div className="mt-3">
                        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-mono font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                          {!logoUrl
                            ? '★ Logotipo Oficial Enviado (Ativo)'
                            : logoUrl === '/cinelab-logo.svg'
                            ? 'Logotipo Versão Horizontal'
                            : 'Logotipo Personalizado'}
                        </span>
                      </div>
                    </div>

                    {/* Controls & Upload */}
                    <div className="lg:col-span-7 space-y-4">
                      {/* Presets Rápidos */}
                      <div className="space-y-1.5">
                        <label className="block text-neutral-300 font-medium text-xs">
                          Escolha o formato ou carregue seu arquivo:
                        </label>
                        <div className="flex flex-wrap gap-2">
                          <button
                            type="button"
                            onClick={() => {
                              setLogoUrl('');
                              notify('Selecionado Logotipo Oficial Enviado (Emblema Vertical).');
                            }}
                            className={`px-3 py-2 rounded-xl text-xs font-mono transition-all flex items-center gap-1.5 cursor-pointer ${
                              !logoUrl
                                ? 'bg-amber-500 text-black font-bold shadow-md shadow-amber-500/20'
                                : 'bg-neutral-900 text-neutral-300 border border-neutral-700 hover:bg-neutral-800'
                            }`}
                          >
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            Logotipo Oficial Enviado (Padrão do Diretor)
                          </button>

                          <button
                            type="button"
                            onClick={() => {
                              setLogoUrl('/cinelab-logo.svg');
                              notify('Selecionada versão horizontal.');
                            }}
                            className={`px-3 py-2 rounded-xl text-xs font-mono transition-all flex items-center gap-1.5 cursor-pointer ${
                              logoUrl === '/cinelab-logo.svg'
                                ? 'bg-amber-500 text-black font-bold shadow-md shadow-amber-500/20'
                                : 'bg-neutral-900 text-neutral-300 border border-neutral-700 hover:bg-neutral-800'
                            }`}
                          >
                            Versão Horizontal
                          </button>
                        </div>
                      </div>

                      {/* Upload de Imagem ou Link */}
                      <div className="space-y-1.5">
                        <label className="block text-neutral-300 font-medium text-xs flex items-center justify-between">
                          <span>Ou envie uma imagem do seu computador:</span>
                          <span className="text-[10px] text-neutral-500">PNG, SVG, JPG, WebP</span>
                        </label>
                        <div className="flex flex-col sm:flex-row gap-2">
                          <input
                            type="text"
                            value={logoUrl}
                            onChange={(e) => setLogoUrl(e.target.value)}
                            placeholder="URL direta da imagem (ex: https://... ou deixe vazio para o padrão)"
                            className="flex-1 px-3.5 py-2.5 bg-neutral-900 border border-neutral-700 rounded-xl text-white font-mono text-xs focus:border-amber-500 focus:outline-none placeholder:text-neutral-600"
                          />

                          <label className="px-4 py-2.5 bg-neutral-800 hover:bg-neutral-700 text-neutral-200 hover:text-white border border-neutral-700 rounded-xl cursor-pointer text-xs font-medium shrink-0 flex items-center justify-center gap-2 transition-colors">
                            <Upload className="w-3.5 h-3.5 text-amber-400" />
                            <span>Enviar Imagem</span>
                            <input
                              type="file"
                              accept="image/*"
                              onChange={handleLogoImageUpload}
                              className="hidden"
                            />
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Seção Exclusiva: QR Code do Pagamento PIX Oficial */}
                <div className="p-5 sm:p-6 rounded-2xl bg-neutral-950 border border-neutral-800 space-y-5">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-neutral-800/80 pb-3">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
                        <QrCode className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="text-xs sm:text-sm font-bold text-white font-display">
                          QR Code Oficial do Pagamento PIX
                        </h4>
                        <p className="text-[11px] text-neutral-400">
                          Cole a imagem, o link direto ou o código Copia e Cola do QR emitido pelo app do seu banco
                        </p>
                      </div>
                    </div>

                    {(pixQrCodeUrl || pixPayload) && (
                      <button
                        type="button"
                        onClick={() => {
                          setPixQrCodeUrl('');
                          setPixPayload('');
                          notify('QR Code personalizado removido. O sistema voltará a gerar o QR dinâmico pela Chave PIX.');
                        }}
                        className="text-[10px] text-neutral-400 hover:text-red-400 flex items-center gap-1 self-start sm:self-auto cursor-pointer border border-neutral-800 hover:border-red-900/50 px-2.5 py-1 rounded-lg transition-colors"
                      >
                        <RotateCcw className="w-3 h-3" />
                        <span>Restaurar QR Padrão</span>
                      </button>
                    )}
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                    {/* Controles de Colar / Carregar (8 colunas) */}
                    <div className="lg:col-span-8 space-y-4">
                      {/* Opção 1: Colar Link ou Imagem do QR Code */}
                      <div className="space-y-1.5">
                        <label className="block text-neutral-300 font-medium text-xs flex items-center justify-between">
                          <span className="flex items-center gap-1.5">
                            <ImageIcon className="w-3.5 h-3.5 text-amber-400" />
                            <span>1. Colar URL ou Carregar Imagem do seu QR Code:</span>
                          </span>
                          <span className="text-[10px] text-neutral-500 font-normal">Link ou arquivo (.png, .jpg, .svg)</span>
                        </label>
                        
                        <div className="flex flex-col sm:flex-row gap-2">
                          <input
                            type="text"
                            value={pixQrCodeUrl}
                            onChange={(e) => setPixQrCodeUrl(e.target.value)}
                            placeholder="Cole aqui o link ou URL da imagem do seu QR (https://... ou data:image/...)"
                            className="flex-1 px-3.5 py-2.5 bg-neutral-900 border border-neutral-700 rounded-xl text-white font-mono text-xs focus:border-amber-500 focus:outline-none placeholder:text-neutral-600"
                          />

                          <label className="px-4 py-2.5 bg-neutral-800 hover:bg-neutral-700 text-neutral-200 hover:text-white border border-neutral-700 rounded-xl cursor-pointer text-xs font-medium shrink-0 flex items-center justify-center gap-2 transition-colors">
                            <Upload className="w-3.5 h-3.5 text-amber-400" />
                            <span>Carregar Imagem</span>
                            <input
                              type="file"
                              accept="image/*"
                              onChange={handleQrImageUpload}
                              className="hidden"
                            />
                          </label>
                        </div>
                      </div>

                      {/* Opção 2: Colar Código PIX "Copia e Cola" (Payload) */}
                      <div className="space-y-1.5">
                        <label className="block text-neutral-300 font-medium text-xs flex items-center justify-between">
                          <span className="flex items-center gap-1.5">
                            <LinkIcon className="w-3.5 h-3.5 text-amber-400" />
                            <span>2. Ou cole o Código PIX Copia e Cola do seu banco:</span>
                          </span>
                          <span className="text-[10px] text-neutral-500 font-normal">Gera o QR Code instantaneamente</span>
                        </label>
                        <textarea
                          rows={3}
                          value={pixPayload}
                          onChange={(e) => setPixPayload(e.target.value)}
                          placeholder="Cole aqui o código Copia e Cola gerado pelo app do seu banco (ex: 00020126580014br.gov.bcb.pix...)"
                          className="w-full px-3.5 py-2 bg-neutral-900 border border-neutral-700 rounded-xl text-white font-mono text-xs focus:border-amber-500 focus:outline-none placeholder:text-neutral-600 resize-none leading-relaxed"
                        />
                      </div>

                      {/* Dica para colar direto com Ctrl+V */}
                      <div
                        onPaste={handlePasteQrArea}
                        tabIndex={0}
                        className="p-3.5 rounded-xl bg-neutral-900/70 border border-dashed border-neutral-700 hover:border-amber-500/70 text-[11px] text-neutral-400 flex items-center gap-3 transition-colors focus:outline-none focus:border-amber-500 cursor-pointer"
                        title="Clique nesta caixa e pressione Ctrl+V para colar a imagem do seu QR Code diretamente da sua área de transferência"
                      >
                        <div className="w-7 h-7 rounded-lg bg-neutral-800 flex items-center justify-center text-amber-400 shrink-0 font-mono text-[10px] font-bold border border-neutral-700">
                          Ctrl+V
                        </div>
                        <div>
                          <span className="text-neutral-200 font-medium">Área rápida de colagem direta: </span>
                          <span>Clique aqui e pressione <kbd className="px-1.5 py-0.5 rounded bg-neutral-800 text-amber-300 font-mono text-[10px] border border-neutral-700">Ctrl+V</kbd> para colar a imagem ou código do seu QR Code imediatamente da sua área de transferência.</span>
                        </div>
                      </div>
                    </div>

                    {/* Pré-visualização do QR Code em Tempo Real (4 colunas) */}
                    <div className="lg:col-span-4 flex flex-col items-center text-center p-4 rounded-2xl bg-neutral-900 border border-neutral-800 space-y-3">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-400 font-mono">
                        Pré-Visualização do Aluno
                      </span>

                      {/* Caixa do QR Code em alto contraste */}
                      <div className="w-44 h-44 bg-white p-2.5 rounded-2xl flex items-center justify-center shadow-xl border border-neutral-300">
                        {pixQrCodeUrl ? (
                          <img
                            src={pixQrCodeUrl}
                            alt="QR Code PIX Personalizado"
                            className="w-full h-full object-contain rounded-lg"
                          />
                        ) : (
                          <img
                            src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(
                              pixPayload || pixKey || 'financeiro@cinelab.edu.br'
                            )}`}
                            alt="QR Code PIX Preview"
                            className="w-full h-full object-contain"
                          />
                        )}
                      </div>

                      {/* Badge de status do QR Code */}
                      <div className="space-y-1">
                        {pixQrCodeUrl ? (
                          <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-400 bg-emerald-950/60 border border-emerald-800/80 px-2.5 py-0.5 rounded-full">
                            <CheckCircle2 className="w-3 h-3" /> QR Personalizado (Imagem)
                          </span>
                        ) : pixPayload ? (
                          <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-amber-400 bg-amber-950/60 border border-amber-800/80 px-2.5 py-0.5 rounded-full">
                            <Sparkles className="w-3 h-3" /> QR Personalizado (Copia e Cola)
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-neutral-400 bg-neutral-800 border border-neutral-700 px-2.5 py-0.5 rounded-full">
                            <QrCode className="w-3 h-3" /> QR Dinâmico (Chave PIX)
                          </span>
                        )}
                        <p className="text-[10px] text-neutral-500">
                          Exibido instantaneamente para novos alunos no checkout.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bloco de Configuração do PagBank (Cartão de Crédito Oficial) */}
                <div className="p-6 rounded-2xl bg-neutral-950/70 border border-neutral-800 space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-neutral-800 pb-3">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                        <CreditCard className="w-4 h-4" />
                      </div>
                      <div>
                        <h3 className="text-sm font-bold text-white font-sans flex items-center gap-2">
                          <span>Recebimento por Cartão de Crédito (PagBank Oficial)</span>
                          <span className="px-2 py-0.5 rounded-full text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-mono">
                            Adquirente Homologada
                          </span>
                        </h3>
                        <p className="text-[11px] text-neutral-400">
                          O PagBank já é uma instituição de pagamentos oficial. Você pode vincular seu Link de Pagamento ou Token para o dinheiro do cartão cair direto na sua conta PagBank.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 text-xs font-mono">
                    <div className="space-y-1.5">
                      <label className="block text-neutral-300 font-medium text-xs flex items-center justify-between">
                        <span>Link de Pagamento PagBank (Recomendado):</span>
                        <span className="text-[10px] text-emerald-400 font-normal">Ex: https://pag.ae/...</span>
                      </label>
                      <input
                        type="url"
                        value={cardPaymentLink}
                        onChange={(e) => setCardPaymentLink(e.target.value)}
                        placeholder="https://pag.ae/7xxxxxx ou https://pagbank.com/..."
                        className="w-full px-3.5 py-2.5 bg-neutral-900 border border-neutral-700 rounded-xl text-white font-mono text-xs focus:border-amber-500 focus:outline-none placeholder:text-neutral-600"
                      />
                      <p className="text-[10px] text-neutral-400 leading-relaxed font-sans">
                        Ao preencher este link, o aluno que optar por cartão poderá pagar diretamente no ambiente 100% seguro do PagBank em até 12x, e os valores são creditados diretamente na sua conta PagBank.
                      </p>
                    </div>

                    <div className="space-y-1.5">
                      <label className="block text-neutral-300 font-medium text-xs flex items-center justify-between">
                        <span>Token de Integração PagBank (Opcional):</span>
                        <span className="text-[10px] text-neutral-500 font-normal">API / Checkout Direto</span>
                      </label>
                      <input
                        type="password"
                        value={pagbankToken}
                        onChange={(e) => setPagbankToken(e.target.value)}
                        placeholder="Cole aqui seu Token de Produção PagBank"
                        className="w-full px-3.5 py-2.5 bg-neutral-900 border border-neutral-700 rounded-xl text-white font-mono text-xs focus:border-amber-500 focus:outline-none placeholder:text-neutral-600"
                      />
                      <p className="text-[10px] text-neutral-400 leading-relaxed font-sans">
                        Obtido no painel do PagBank em <em>Vendas &gt; Integrações &gt; Gerar Token</em> para processamento direto sem redirecionamento.
                      </p>
                    </div>
                  </div>

                  {/* Instruções Rápidas de Como Ativar no PagBank */}
                  <div className="p-3.5 rounded-xl bg-neutral-900/60 border border-neutral-800 text-[11px] text-neutral-300 space-y-1.5 font-sans">
                    <div className="font-bold text-amber-300 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Como gerar seu Link em 3 minutos no app do PagBank:</span>
                    </div>
                    <ol className="list-decimal list-inside space-y-1 text-neutral-400 text-[11px]">
                      <li>Abra o app do <strong>PagBank</strong> no celular ou acesse pelo computador (<code className="text-amber-300 font-mono">ibanking.pagbank.com.br</code>).</li>
                      <li>Toque no menu <strong>Vendas</strong> &gt; <strong>Link de Pagamento</strong> &gt; <strong>Criar Link</strong>.</li>
                      <li>Coloque o nome <strong>Curso CINELAB – Cinema &amp; Audiovisual</strong> e o valor <strong>R$ 1.000,00</strong>.</li>
                      <li>Defina o parcelamento (em até 12x) e selecione <strong>Juros por conta do comprador</strong> (o aluno arca com a taxa da operadora e você recebe o valor líquido sem desconto de juros).</li>
                      <li>Copie o link gerado (<code className="text-emerald-400 font-mono">https://pag.ae/...</code>) e cole no campo acima!</li>
                    </ol>
                  </div>
                </div>

                <div className="pt-2 flex items-center justify-end">
                  <button
                    type="submit"
                    className="px-8 py-3 bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold uppercase rounded-xl text-xs transition-all cursor-pointer flex items-center gap-2 shadow-lg shadow-amber-500/20 font-sans active:scale-98"
                  >
                    <Save className="w-4 h-4" />
                    <span>Salvar Todas as Configurações</span>
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* TAB 7: EMAIL LOGS */}
          {activeTab === 'emails' && (
            <div className="space-y-4 animate-fadeIn">
              <div className="border-b border-neutral-800 pb-3">
                <h3 className="text-base font-bold font-display text-white">
                  Logs de Comunicação por E-mail
                </h3>
                <p className="text-xs text-neutral-400">
                  Registro de confirmações de matrícula, recibos financeiros e avisos de liberação pedagógica.
                </p>
              </div>

              <div className="space-y-3 font-mono text-xs">
                {emails.map((em) => (
                  <div
                    key={em.id}
                    className="p-4 rounded-xl bg-neutral-900 border border-neutral-800 space-y-2"
                  >
                    <div className="flex items-center justify-between text-[11px] text-neutral-400">
                      <span className="text-amber-400 font-bold">PARA: {em.toEmail || em.to}</span>
                      <span>{new Date(em.sentAt).toLocaleString('pt-BR')}</span>
                    </div>
                    <h4 className="text-xs font-bold text-white font-sans">{em.subject}</h4>
                    <p className="text-neutral-300 font-sans text-xs bg-neutral-950 p-3 rounded-lg leading-relaxed">
                      {em.body || em.content}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      )}

      {/* Modal: Acrescentar ou Editar Aluno */}
      <StudentModal
        isOpen={studentModalOpen}
        onClose={() => {
          setStudentModalOpen(false);
          setStudentToEdit(null);
        }}
        onSuccess={(msg) => {
          notify(msg);
          loadAllAdminData();
        }}
        studentToEdit={studentToEdit}
      />

      {/* Modal: Editar Módulo e Vídeo */}
      <ModuleEditModal
        isOpen={moduleModalOpen}
        onClose={() => {
          setModuleModalOpen(false);
          setModuleToEdit(null);
        }}
        onSuccess={(msg) => {
          notify(msg);
          loadAllAdminData();
        }}
        module={moduleToEdit}
        video={moduleToEdit ? videos.find((v) => v.moduleId === moduleToEdit.id) : null}
        apostila={moduleToEdit ? apostilas.find((a) => a.moduleId === moduleToEdit.id) : null}
      />

      {/* Modal: Editar Apostila Bônus */}
      <BonusApostilaEditModal
        isOpen={bonusModalOpen}
        onClose={() => {
          setBonusModalOpen(false);
          setBonusToEdit(null);
        }}
        onSuccess={(msg) => {
          notify(msg);
          loadAllAdminData();
        }}
        bonusApostila={bonusToEdit}
      />

      {/* Modal Rápido: Renomear Apostila */}
      {apostilaRenameModalOpen && apostilaToRename && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className="w-full max-w-md bg-neutral-900 border border-amber-500/50 rounded-2xl p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
              <div className="flex items-center gap-2 text-white font-bold font-sans">
                <FileText className="w-5 h-5 text-amber-400" />
                <span>Renomear Apostila</span>
              </div>
              <button
                type="button"
                onClick={() => {
                  setApostilaRenameModalOpen(false);
                  setApostilaToRename(null);
                }}
                className="text-neutral-400 hover:text-white p-1 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-2">
              <label className="block text-xs font-mono text-amber-300 font-semibold">
                Novo Nome / Título da Apostila:
              </label>
              <input
                type="text"
                autoFocus
                value={renameTitleInput}
                onChange={(e) => setRenameTitleInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleSaveRenameApostila();
                  }
                }}
                placeholder="Ex: História do Cinema"
                className="w-full px-3.5 py-2.5 bg-neutral-950 border border-amber-500/60 focus:border-amber-400 rounded-xl text-white text-sm font-sans focus:outline-none shadow-inner"
              />
              <p className="text-[11px] text-neutral-400 font-mono">
                {apostilaToRename.moduleId
                  ? `Etapa 0${apostilaToRename.moduleId} • O nome será atualizado em toda a plataforma e no leitor de PDF imediatamente.`
                  : 'Apostila Bônus • O nome será atualizado em toda a plataforma imediatamente.'}
              </p>
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-neutral-800">
              <button
                type="button"
                onClick={() => {
                  setApostilaRenameModalOpen(false);
                  setApostilaToRename(null);
                }}
                className="px-4 py-2 bg-neutral-800 hover:bg-neutral-700 text-neutral-300 rounded-xl text-xs font-sans transition-colors cursor-pointer"
              >
                Cancelar
              </button>
              <button
                type="button"
                disabled={savingRename || !renameTitleInput.trim()}
                onClick={handleSaveRenameApostila}
                className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold rounded-xl text-xs font-sans transition-colors cursor-pointer flex items-center gap-1.5 shadow-sm"
              >
                {savingRename ? (
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                ) : (
                  <Check className="w-3.5 h-3.5" />
                )}
                <span>Salvar Nome</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Gerenciamento dos 2 Vídeos Extras para Estudo da Apostila */}
      {extraVideosModalApostila && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-4xl max-h-[90vh] bg-[#12141c] border border-amber-500/40 rounded-3xl shadow-2xl flex flex-col overflow-hidden text-neutral-200">
            {/* Modal Header */}
            <div className="p-5 border-b border-neutral-800 flex items-center justify-between bg-neutral-900/90">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center border border-amber-500/40 shadow-inner">
                  <Film className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white leading-tight font-display">
                    {extraVideosModalApostila.title}
                  </h3>
                  <span className="text-[11px] font-mono text-amber-300">
                    2 Locais de Vídeos Extras para Estudo • Painel de Upload &amp; Gestão
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setExtraVideosModalApostila(null)}
                className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors cursor-pointer"
                title="Fechar"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Content Scrollable */}
            <div className="p-5 sm:p-7 overflow-y-auto max-h-[80vh]">
              <ApostilaExtraVideosSection
                apostila={extraVideosModalApostila}
                isAdmin={true}
                onApostilaUpdated={(updated) => {
                  setExtraVideosModalApostila(updated);
                  loadAllAdminData();
                }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
