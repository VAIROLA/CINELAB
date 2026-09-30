import React, { useState, useEffect, useRef } from 'react';
import { CourseSettings, FilmographyWork } from '../../types/index.js';
import { api } from '../../services/api.js';
import {
  persistTonyPhoto,
  saveLocalTonyProfile,
  persistTonyProfile,
  getLocalTonyProfile,
  getLocalWelcomeVideoBackup,
  saveLocalWelcomeVideoBackup,
} from '../../services/tonyPersistence.js';
import {
  Globe,
  Mail,
  Phone,
  Clock,
  MapPin,
  MessageSquare,
  User,
  Film,
  Award,
  BookOpen,
  Camera,
  Clapperboard,
  Save,
  Upload,
  ExternalLink,
  Plus,
  Trash2,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  ShieldCheck,
  Eye,
  MessageCircle,
  Linkedin,
  Youtube,
  Instagram,
  Loader2,
  Video,
  Play,
  PlayCircle,
  EyeOff,
  Image as ImageIcon,
} from 'lucide-react';
import { parseVideoEmbed } from '../../utils/videoUtils.js';

interface InstitutionalTabProps {
  settings: CourseSettings;
  onSaveSettings: (updatedFields: Partial<CourseSettings>) => Promise<void>;
  onNavigate: (route: string) => void;
  notify: (msg: string, type?: 'success' | 'error') => void;
}

export const InstitutionalTab: React.FC<InstitutionalTabProps> = ({
  settings,
  onSaveSettings,
  onNavigate,
  notify,
}) => {
  const [subTab, setSubTab] = useState<'all' | 'footer' | 'contact' | 'tony'>('all');
  const [saving, setSaving] = useState(false);

  // Rodapé states
  const [footerAboutText, setFooterAboutText] = useState(
    settings.footerAboutText ||
      'Escola e laboratório de formação profissional em Cinema e Realização Audiovisual. Metodologia de imersão de 3 meses (90 dias), 10 apostilas didáticas com cronograma progressivo, masterclasses exclusivas, avaliações contínuas e certificação reconhecida pelo mercado.'
  );
  const [footerWorkloadBadge, setFooterWorkloadBadge] = useState(settings.footerWorkloadBadge || '180h Carga Horária');
  const [footerOfficialBadge, setFooterOfficialBadge] = useState(settings.footerOfficialBadge || 'Plataforma EAD Oficial');
  const [footerCopyright, setFooterCopyright] = useState(
    settings.footerCopyright || '© 2026 CINELAB – Cinema & Audiovisual. Todos os direitos reservados.'
  );
  const [footerDisclaimer, setFooterDisclaimer] = useState(
    settings.footerDisclaimer || 'Regras pedagógicas validadas por cronograma • Certificação Profissional'
  );
  const [companyCnpj, setCompanyCnpj] = useState(settings.companyCnpj || '48.912.834/0001-02');
  const [companyAddress, setCompanyAddress] = useState(
    settings.companyAddress || 'Rio de Janeiro, RJ • Plataforma Digital Nacional'
  );
  const [instagramUrl, setInstagramUrl] = useState(settings.instagramUrl || 'https://instagram.com/cinelab.cinema');
  const [youtubeUrl, setYoutubeUrl] = useState(settings.youtubeUrl || 'https://youtube.com/@cinelabcinema');
  const [vimeoUrl, setVimeoUrl] = useState(settings.vimeoUrl || 'https://vimeo.com/cinelab');

  // Contato & Suporte states
  const [contactEmail, setContactEmail] = useState(settings.contactEmail || 'contato@cinelab.edu.br');
  const [contactPhone, setContactPhone] = useState(settings.contactPhone || '+55 (21) 96672-5240');
  const [whatsappNumber, setWhatsappNumber] = useState(settings.whatsappNumber || '+55 (21) 96672-5240');
  const [whatsappDefaultMessage, setWhatsappDefaultMessage] = useState(
    settings.whatsappDefaultMessage || 'Olá Professor Tony de Luc! Gostaria de tirar dúvidas sobre o curso CINELAB.'
  );
  const [supportHours, setSupportHours] = useState(
    settings.supportHours || 'Segunda a Sexta, das 09h às 19h (Atendimento Humanizado)'
  );
  const [supportResponseTime, setSupportResponseTime] = useState(
    settings.supportResponseTime || 'Resposta em até 24 horas úteis'
  );
  const [contactAddress, setContactAddress] = useState(
    settings.contactAddress || 'Rio de Janeiro, RJ • Plataforma Digital de Alcance Nacional e Internacional'
  );

  // Tony de Luc states
  const [tonyName, setTonyName] = useState(settings.tonyName || settings.directorName || 'Professor Cineasta Tony de Luc');
  const [tonyRole, setTonyRole] = useState(
    settings.tonyRole || settings.directorRole || 'Diretor Geral, Cineasta & Fundador do CINELAB'
  );
  const [tonyPhotoUrl, setTonyPhotoUrl] = useState(
    settings.tonyPhotoUrl ||
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1000&q=80'
  );
  const [tonyTagline, setTonyTagline] = useState(
    settings.tonyTagline ||
      'O cinema não nasce na teoria fria; nasce na coragem do realizador em dominar a linguagem visual e imprimir sua verdade humana em cada enquadramento.'
  );
  const [tonyBioShort, setTonyBioShort] = useState(
    settings.tonyBioShort ||
      'Cineasta, realizador audiovisual, roteirista e educador cinematográfico com mais de 20 anos de experiência em sets de filmagem, mostras de cinema e formação de centenas de novos diretores.'
  );
  const [tonyBioFull, setTonyBioFull] = useState(
    settings.tonyBioFull ||
      'Com uma trajetória forjada no pulsar vivo dos sets de gravação e na dedicação incansável à pedagogia da imagem em movimento, Tony de Luc é uma referência contemporânea na formação de cineastas e realizadores audiovisuais independentes.\n\nSua carreira abrange a direção geral de longas e curtas-metragens laureados em festivais no Brasil e no exterior, a direção de fotografia com ênfase no claro-escuro dramático e o desenvolvimento de métodos pedagógicos que eliminam o hermetismo acadêmico. No CINELAB, Tony desenhou pessoalmente a arquitetura das 10 etapas formativas (90 dias) para garantir que cada aluno, do roteiro à pós-produção, sinta a real pulsação de uma equipe de cinema profissional.'
  );

  const initialFeitos =
    settings.tonyFeitos && settings.tonyFeitos.length > 0
      ? settings.tonyFeitos.join('\n')
      : [
          'Direção e roteiro de obras cinematográficas exibidas e premiadas em festivais e mostras de cinema no Brasil e no circuito internacional.',
          'FORMOU DEZENAS DE REALIZADORES, ROTEIRISTAS E DIRETORES DE FOTOGRAFIA E INSERIDOS NO MERCADO AUDIOVISUAL , PUBLICIDADE E STREAMING.',
          'Criação do método pedagógico CINELAB: formação intensiva de 3 meses (90 dias) calibrada em 10 etapas com foco em set, rigor estético e narrativa autoral.',
          'Direção de Fotografia e Iluminação Cênica em dezenas de produções ficcionais, videoclipes premiados e documentários autorais.',
          'Curador e jurado convidado em comissões de seleção de mostras de cinema independente e editais públicos de fomento cultural.',
          'Tony de Luc, participou ativamente da edição inaugural do CINEMANO - Mestres da Sétima Arte, na UFRJ no Fundão, como um dos palestrantes falando sobre o documentário e temáticas políticas e sociais pós-exibição do filme "A bolsa ou a vida" (de Silvio Tendler). Participação do Cineasta e Historiador, prof. Silvio Tendler. Palestrantes: Evandro Vieira Ourique (Professor da Escola de Comunicação da UFRJ) & Tony de Luc (Cineasta e Diretor da TV Diversidade)',
        ].join('\n');

  const initialCurriculo =
    settings.tonyCurriculo && settings.tonyCurriculo.length > 0
      ? settings.tonyCurriculo.join('\n')
      : [
          'Graduação e Especialização em Cinema, Direção Cinematográfica e Realização Audiovisual.',
          'Formação Avançada em Roteiro Cinematográfico (Script Doctoring & Estruturas Narrativas Clássicas e Não-Lineares).',
          'Especialização em Direção de Fotografia, Óptica Cinematográfica, Teoria da Cor e Iluminação Dramática.',
          'Docência no Ensino Superior e em Cursos Livres de Cinema, Montagem e Narrativas Visuais.',
          'Pesquisador de Linguagem Cinematográfica, Montagem Analítica e Filosofia da Imagem em Movimento.',
          'Membro de Associações Profissionais de Cinema e Realizadores Audiovisuais Independentes.',
        ].join('\n');

  const [tonyFeitosText, setTonyFeitosText] = useState(initialFeitos);
  const [tonyCurriculoText, setTonyCurriculoText] = useState(initialCurriculo);

  const defaultFilmografia: FilmographyWork[] = [
    {
      title: 'SINGULARIDADE',
      year: '2017',
      role: 'Diretor de Fotografia',
      type: 'Curta-Metragem - GENERO: ANIMAÇÃO',
      details: '',
    },
    {
      title: 'NELSON PEREIRA DOS SANTOS E O CINEMA NOVO',
      year: '2016',
      role: 'Diretor de Fotografia & Montagem',
      type: 'Curta-Metragem - GENERO: DOCUMENTÁRIO',
      details: '',
    },
    {
      title: 'HAP',
      year: '2016',
      role: 'Diretor de Fotografia',
      type: 'Curta-Metragem - GENERO: DRAMA',
      details: '',
    },
    {
      title: 'O DIÁRIO DE UM VICIADO ',
      year: '2012',
      role: 'Supervisão Geral Do Roteiro e Direção',
      type: 'Média-Metragem - GENERO: DRAMA POLICIAL',
      details: '',
    },
    {
      title: 'EXPRESSO TERMINAL (TERMINAL EXPRESS) ',
      year: '2006',
      role: 'Direção & Roteiro',
      type: 'Curta-Metragem - GENERO: SUSPENSE',
      details:
        'Prêmio De Melhor Roteiro Do Festival Curta 4.2 – Favorito Do Amazonas Film Festival De 2006 –No Festival de Cannes Participação em “Un CertainRegard”–  Prêmio De Melhor Direção E Roteiro No Festival Da França – Melhor Direção Em Portugal. Tendo Participado De Vários Outros Festivais No Brasil E No Exterior.',
    },
    {
      title: 'A POSSUÍDA ',
      year: '2006',
      role: 'Diretor de Fotografia',
      type: 'Curta-Metragem - GENERO: TERROR',
      details: 'Participou numa amostragem dentro do Festivais Curta Amazônico 4.2 em Manaus.',
    },
  ];

  const [tonyFilmografia, setTonyFilmografia] = useState<FilmographyWork[]>(
    settings.tonyFilmografia && settings.tonyFilmografia.length > 0
      ? settings.tonyFilmografia
      : defaultFilmografia
  );
  const [previewFilmIdx, setPreviewFilmIdx] = useState<number | null>(null);

  const [tonySocialInstagram, setTonySocialInstagram] = useState(
    settings.tonySocialInstagram || 'https://instagram.com/tonydeluc.cinema'
  );
  const [tonySocialLinkedin, setTonySocialLinkedin] = useState(
    settings.tonySocialLinkedin || settings.tonySocialImdb || 'https://linkedin.com/in/tonydeluc-cinema'
  );
  const [tonySocialYoutube, setTonySocialYoutube] = useState(
    settings.tonySocialYoutube || settings.tonySocialVimeo || 'https://youtube.com/@cinelabcinema'
  );

  // Synchronize state when settings are loaded/refreshed from server
  useEffect(() => {
    if (!settings || Object.keys(settings).length === 0) return;
    if (settings.footerAboutText) setFooterAboutText(settings.footerAboutText);
    if (settings.footerWorkloadBadge) setFooterWorkloadBadge(settings.footerWorkloadBadge);
    if (settings.footerOfficialBadge) setFooterOfficialBadge(settings.footerOfficialBadge);
    if (settings.footerCopyright) setFooterCopyright(settings.footerCopyright);
    if (settings.footerDisclaimer) setFooterDisclaimer(settings.footerDisclaimer);
    if (settings.companyCnpj) setCompanyCnpj(settings.companyCnpj);
    if (settings.companyAddress) setCompanyAddress(settings.companyAddress);
    if (settings.instagramUrl) setInstagramUrl(settings.instagramUrl);
    if (settings.youtubeUrl) setYoutubeUrl(settings.youtubeUrl);
    if (settings.vimeoUrl) setVimeoUrl(settings.vimeoUrl);

    if (settings.contactEmail) setContactEmail(settings.contactEmail);
    if (settings.contactPhone) setContactPhone(settings.contactPhone);
    if (settings.whatsappNumber) setWhatsappNumber(settings.whatsappNumber);
    if (settings.whatsappDefaultMessage) setWhatsappDefaultMessage(settings.whatsappDefaultMessage);
    if (settings.supportHours) setSupportHours(settings.supportHours);
    if (settings.supportResponseTime) setSupportResponseTime(settings.supportResponseTime);
    if (settings.contactAddress) setContactAddress(settings.contactAddress);

    if (settings.tonyName || settings.directorName) setTonyName(settings.tonyName || settings.directorName || '');
    if (settings.tonyRole || settings.directorRole) setTonyRole(settings.tonyRole || settings.directorRole || '');
    if (settings.tonyPhotoUrl) setTonyPhotoUrl(settings.tonyPhotoUrl);
    if (settings.tonyTagline) setTonyTagline(settings.tonyTagline);
    if (settings.tonyBioShort) setTonyBioShort(settings.tonyBioShort);
    if (settings.tonyBioFull) setTonyBioFull(settings.tonyBioFull);
    if (settings.tonyFeitos && settings.tonyFeitos.length > 0) {
      setTonyFeitosText(settings.tonyFeitos.join('\n'));
    }
    if (settings.tonyCurriculo && settings.tonyCurriculo.length > 0) {
      setTonyCurriculoText(settings.tonyCurriculo.join('\n'));
    }
    if (settings.tonyFilmografia && settings.tonyFilmografia.length > 0) {
      setTonyFilmografia(settings.tonyFilmografia);
    }
    if (settings.tonySocialInstagram) setTonySocialInstagram(settings.tonySocialInstagram);
    if (settings.tonySocialLinkedin) setTonySocialLinkedin(settings.tonySocialLinkedin);
    if (settings.tonySocialYoutube) setTonySocialYoutube(settings.tonySocialYoutube);

    // Sync welcome video and cover
    if (settings.welcomeVideoUrl && settings.welcomeVideoUrl.trim() !== '') {
      setWelcomeVideoUrl(settings.welcomeVideoUrl);
      saveLocalWelcomeVideoBackup(settings.welcomeVideoUrl, settings.welcomeVideoPoster);
    }
    if (settings.welcomeVideoPoster && settings.welcomeVideoPoster.trim() !== '') {
      setWelcomeVideoPoster(settings.welcomeVideoPoster);
    }
    if (settings.welcomeMessageTitle !== undefined) setWelcomeMessageTitle(settings.welcomeMessageTitle);
    if (settings.welcomeMessageText !== undefined) setWelcomeMessageText(settings.welcomeMessageText);
  }, [settings]);

  // States for Photo Upload
  const [photoUploading, setPhotoUploading] = useState(false);
  const [photoProgress, setPhotoProgress] = useState(0);
  const [photoSaved, setPhotoSaved] = useState(false);

  // Handle Direct Photo Upload from Computer
  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith('image/') && !/\.(jpe?g|png|webp|svg|gif|avif)$/i.test(file.name)) {
      notify('Selecione um arquivo de imagem válido (PNG, JPG, WEBP, SVG, AVIF).', 'error');
      return;
    }

    try {
      setPhotoUploading(true);
      setPhotoProgress(30);
      setPhotoSaved(false);

      // Upload and persist permanently to disk, DB and localStorage
      const savedPhotoUrl = await persistTonyPhoto(file);

      setTonyPhotoUrl(savedPhotoUrl);
      setPhotoProgress(80);

      // Persist permanently in settings database
      await onSaveSettings({
        tonyPhotoUrl: savedPhotoUrl,
      });

      setPhotoProgress(100);
      setPhotoSaved(true);
      notify('Foto do Diretor enviada e salva permanentemente no banco de dados e no servidor!');
    } catch (err: any) {
      console.error('Erro ao processar imagem:', err);
      notify('Erro ao salvar foto: ' + (err.message || err), 'error');
    } finally {
      setPhotoUploading(false);
      setPhotoProgress(0);
      e.target.value = '';
    }
  };

  const handleSavePhotoOnly = async () => {
    if (!tonyPhotoUrl) return;
    setSaving(true);
    try {
      await onSaveSettings({
        tonyPhotoUrl,
      });
      setPhotoSaved(true);
      notify('Foto do Diretor salva e confirmada!');
    } catch (err: any) {
      notify('Erro ao salvar foto: ' + err.message, 'error');
    } finally {
      setSaving(false);
    }
  };

  // Estados para Vídeo e Mensagem de Boas-Vindas aos Novos Alunos (Home)
  const initialLocalBackup = typeof window !== 'undefined' ? getLocalWelcomeVideoBackup() : null;
  const [welcomeVideoUrl, setWelcomeVideoUrl] = useState(
    settings.welcomeVideoUrl || initialLocalBackup?.url || '/uploads/videos/aula-CINELAB_INTRODU__O-1790768528604-650605.mp4'
  );
  const [welcomeVideoPoster, setWelcomeVideoPoster] = useState(
    settings.welcomeVideoPoster || initialLocalBackup?.poster || '/uploads/images/img-LOCO_CINELAB___COLE-1790299254778-824285.png'
  );
  const [previewVideoError, setPreviewVideoError] = useState(false);
  const [welcomeMessageTitle, setWelcomeMessageTitle] = useState(
    settings.welcomeMessageTitle || 'Mensagem de Boas-Vindas aos Novos Alunos'
  );

  useEffect(() => {
    setPreviewVideoError(false);
  }, [welcomeVideoUrl]);
  const [welcomeMessageText, setWelcomeMessageText] = useState(
    settings.welcomeMessageText ||
      'Caro estudante e futuro realizador,\n\nQuando idealizei o CINELAB, meu objetivo não foi criar mais um curso com aulas teóricas genéricas que você pode encontrar em qualquer canto da internet. Minha obsessão foi estruturar um laboratório de formação autêntica, onde cada etapa coloca você frente a frente com a realidade artística, técnica e estética da indústria cinematográfica.\n\nNós estudamos o plano não como um conceito estático, mas como a menor unidade dramática da narrativa. Nós formatamos o roteiro não por burocracia, mas para que a equipe inteira consiga visualizar a luz, o som e o silêncio que o filme pede. E em cada uma das 10 etapas, minha equipe e eu estaremos acompanhando seu progresso, avaliando suas respostas e orientando seus exercícios.\n\nSe você carrega a urgência de contar histórias e quer dominar a gramática do cinema com rigor, seja muito bem-vindo ao CINELAB.'
  );
  const [welcomeVideoUploading, setWelcomeVideoUploading] = useState(false);
  const [welcomeVideoProgress, setWelcomeVideoProgress] = useState(0);
  const [welcomeVideoProgressDetails, setWelcomeVideoProgressDetails] = useState('');
  const [welcomeVideoSaved, setWelcomeVideoSaved] = useState(false);
  const [welcomeVideoError, setWelcomeVideoError] = useState<string>('');
  const [videoDragOver, setVideoDragOver] = useState(false);
  const [posterDragOver, setPosterDragOver] = useState(false);
  const videoFileInputRef = useRef<HTMLInputElement>(null);
  const posterFileInputRef = useRef<HTMLInputElement>(null);

  // Upload da Capa do Vídeo de Boas-Vindas Direto do Computador
  const [posterUploading, setPosterUploading] = useState(false);
  const [posterProgress, setPosterProgress] = useState(0);

  const handlePosterUpload = async (file: File) => {
    if (!file) return;
    const isImage = file.type.startsWith('image/') || /\.(jpe?g|png|webp|svg|gif|avif|bmp)$/i.test(file.name);
    if (!isImage) {
      notify('Por favor, selecione uma imagem válida (JPG, PNG, WebP).', 'error');
      return;
    }

    try {
      setPosterUploading(true);
      setPosterProgress(0);
      const res = await api.uploadImageFile(file, (pct) => {
        setPosterProgress(pct);
      });

      if (res && res.fileUrl) {
        setWelcomeVideoPoster(res.fileUrl);
        await onSaveSettings({
          welcomeVideoPoster: res.fileUrl,
          welcomeVideoUrl,
        });
        setWelcomeVideoSaved(true);
        notify('Capa do vídeo atualizada e salva com sucesso!', 'success');
      }
    } catch (err: any) {
      notify('Erro ao subir imagem de capa: ' + (err.message || 'Falha no upload'), 'error');
    } finally {
      setPosterUploading(false);
      setPosterProgress(0);
    }
  };

  // Helper to detect YouTube or Vimeo embeds for admin preview
  const getEmbedInfo = (url: string) => {
    if (!url) return null;
    const ytMatch = url.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/i);
    if (ytMatch && ytMatch[1]) {
      return {
        type: 'youtube' as const,
        embedUrl: `https://www.youtube-nocookie.com/embed/${ytMatch[1]}?autoplay=0&rel=0&modestbranding=1`,
      };
    }
    const vimeoMatch = url.match(/(?:vimeo\.com\/(?:channels\/(?:\w+\/)?|groups\/(?:[^\/]*)\/videos\/|album\/(?:\d+)\/video\/|video\/|)(\d+))/i);
    if (vimeoMatch && vimeoMatch[1]) {
      return {
        type: 'vimeo' as const,
        embedUrl: `https://player.vimeo.com/video/${vimeoMatch[1]}?title=0&byline=0&portrait=0`,
      };
    }
    return {
      type: 'direct' as const,
      embedUrl: url,
    };
  };

  const processVideoFile = async (file: File) => {
    if (!file) return;
    const isVideo =
      file.type.startsWith('video/') ||
      /\.(mp4|webm|mov|mkv|avi|m4v|wmv|flv|ts|3gp)$/i.test(file.name);
    if (!isVideo) {
      setWelcomeVideoError('Selecione um arquivo de vídeo válido (MP4, WebM, MOV, MKV, AVI).');
      notify('Selecione um arquivo de vídeo válido (MP4, WebM, MOV, MKV).', 'error');
      return;
    }

    const fileSizeMb = (file.size / (1024 * 1024)).toFixed(1);

    try {
      setWelcomeVideoUploading(true);
      setWelcomeVideoProgress(2);
      setWelcomeVideoSaved(false);
      setWelcomeVideoError('');
      setWelcomeVideoProgressDetails(`Preparando upload acelerado do vídeo (${fileSizeMb} MB)...`);

      const res = await api.uploadVideoFile(file, {
        title: 'Vídeo de Boas-Vindas aos Novos Alunos',
        description: 'Apresentação institucional e boas-vindas do Professor Cineasta Tony de Luc.',
        isWelcomeVideo: true,
        onProgress: (pct, details) => {
          setWelcomeVideoProgress(pct);
          if (details) {
            const mbUploaded = (details.uploadedBytes / (1024 * 1024)).toFixed(1);
            const mbTotal = (details.totalBytes / (1024 * 1024)).toFixed(1);
            setWelcomeVideoProgressDetails(
              `Enviando parte ${details.currentChunk} de ${details.totalChunks} (${mbUploaded} MB de ${mbTotal} MB) • ${pct}%`
            );
          } else {
            setWelcomeVideoProgressDetails(`Enviando vídeo (${fileSizeMb} MB): ${pct}% concluído...`);
          }
        },
      });

      if (res && res.fileUrl) {
        setWelcomeVideoUrl(res.fileUrl);
        setPreviewVideoError(false);
        const posterToSave = welcomeVideoPoster || '/images/cinelab-cover.jpg';
        saveLocalWelcomeVideoBackup(res.fileUrl, posterToSave);
        await onSaveSettings({
          welcomeVideoUrl: res.fileUrl,
          welcomeVideoPoster: posterToSave,
        });
        setWelcomeVideoSaved(true);
        notify(`Vídeo de Boas-Vindas enviado e salvo permanentemente no servidor! (${fileSizeMb} MB)`, 'success');
      }
    } catch (err: any) {
      console.error('Erro no upload do vídeo:', err);
      const msg = err.message || 'Falha no upload do vídeo.';
      setWelcomeVideoError(msg);
      notify(`Erro ao enviar vídeo: ${msg}`, 'error');
    } finally {
      setWelcomeVideoUploading(false);
      setWelcomeVideoProgress(0);
      setWelcomeVideoProgressDetails('');
    }
  };

  const handleWelcomeVideoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      await processVideoFile(file);
    }
    e.target.value = '';
  };

  const handleSaveWelcomeSectionOnly = async () => {
    setSaving(true);
    try {
      await onSaveSettings({
        welcomeVideoUrl,
        welcomeVideoPoster: welcomeVideoPoster || '/images/cinelab-cover.jpg',
        welcomeMessageTitle,
        welcomeMessageText,
      });
      setWelcomeVideoSaved(true);
      notify('Vídeo, capa e mensagem de boas-vindas salvos com sucesso na Página Inicial!');
    } catch (err: any) {
      notify('Erro ao salvar: ' + err.message, 'error');
    } finally {
      setSaving(false);
    }
  };

  // Filmography helpers
  const handleAddFilm = () => {
    setTonyFilmografia((prev) => [
      ...prev,
      {
        title: 'Nova Produção Audiovisual',
        year: String(new Date().getFullYear()),
        role: 'Direção & Roteiro',
        type: 'Curta-Metragem / Longa-Metragem',
        details: 'Descrição da obra, prêmios em mostras e circuito de festivais.',
        videoUrl: '',
      },
    ]);
  };

  const handleUpdateFilm = (index: number, field: keyof FilmographyWork, value: string) => {
    setTonyFilmografia((prev) =>
      prev.map((film, i) => (i === index ? { ...film, [field]: value } : film))
    );
  };

  const handleRemoveFilm = (index: number) => {
    setTonyFilmografia((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSaveAll = async () => {
    setSaving(true);
    try {
      const parsedFeitos = tonyFeitosText
        .split('\n')
        .map((s) => s.trim())
        .filter(Boolean);

      const parsedCurriculo = tonyCurriculoText
        .split('\n')
        .map((s) => s.trim())
        .filter(Boolean);

      await onSaveSettings({
        // Rodapé
        footerAboutText,
        footerWorkloadBadge,
        footerOfficialBadge,
        footerCopyright,
        footerDisclaimer,
        companyCnpj,
        companyAddress,
        instagramUrl,
        youtubeUrl,
        vimeoUrl,

        // Contato
        contactEmail,
        contactPhone,
        whatsappNumber,
        whatsappDefaultMessage,
        supportHours,
        supportResponseTime,
        contactAddress,

        // Tony de Luc
        directorName: tonyName,
        directorRole: tonyRole,
        tonyName,
        tonyRole,
        tonyPhotoUrl,
        tonyTagline,
        tonyBioShort,
        tonyBioFull,
        tonyFeitos: parsedFeitos,
        tonyCurriculo: parsedCurriculo,
        tonyFilmografia,
        tonySocialInstagram,
        tonySocialLinkedin,
        tonySocialYoutube,
        tonySocialImdb: tonySocialLinkedin,
        tonySocialVimeo: tonySocialYoutube,

        // Boas-Vindas aos Novos Alunos (Home)
        welcomeVideoUrl: welcomeVideoUrl || settings.welcomeVideoUrl || initialLocalBackup?.url || '',
        welcomeVideoPoster: welcomeVideoPoster || settings.welcomeVideoPoster || initialLocalBackup?.poster || '/uploads/images/img-LOCO_CINELAB___COLE-1790299254778-824285.png',
        welcomeMessageTitle,
        welcomeMessageText,
      });

      const finalWelcomeVideoUrl = welcomeVideoUrl || settings.welcomeVideoUrl || initialLocalBackup?.url || '';
      const finalWelcomePoster = welcomeVideoPoster || settings.welcomeVideoPoster || initialLocalBackup?.poster || '/uploads/images/img-LOCO_CINELAB___COLE-1790299254778-824285.png';

      // Save locally to ensure immediate permanence
      saveLocalTonyProfile({
        tonyName,
        tonyRole,
        tonyPhotoUrl,
        tonyTagline,
        tonyBioShort,
        tonyBioFull,
        tonyFeitos: parsedFeitos,
        tonyCurriculo: parsedCurriculo,
        tonyFilmografia,
        tonySocialInstagram,
        tonySocialLinkedin,
        tonySocialYoutube,
        welcomeVideoUrl: finalWelcomeVideoUrl,
        welcomeVideoPoster: finalWelcomePoster,
        welcomeMessageTitle,
        welcomeMessageText,
      });

      // Also persist to dedicated Tony server endpoint
      persistTonyProfile({
        tonyName,
        tonyRole,
        tonyPhotoUrl,
        tonyTagline,
        tonyBioShort,
        tonyBioFull,
        tonyFeitos: parsedFeitos,
        tonyCurriculo: parsedCurriculo,
        tonyFilmografia,
        tonySocialInstagram,
        tonySocialLinkedin,
        tonySocialYoutube,
        welcomeVideoUrl: finalWelcomeVideoUrl,
        welcomeVideoPoster: finalWelcomePoster,
        welcomeMessageTitle,
        welcomeMessageText,
      }).catch(() => {});

      setPhotoSaved(true);
      setWelcomeVideoSaved(true);
      notify('Todas as configurações de Rodapé, Contato, Vídeo de Boas-Vindas e Tony de Luc foram salvas com sucesso!');
    } catch (err: any) {
      notify('Erro ao salvar configurações: ' + err.message, 'error');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-neutral-800 pb-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-mono font-bold mb-1">
            <Globe className="w-3.5 h-3.5" /> Edição Institucional Completa
          </div>
          <h2 className="text-xl sm:text-2xl font-display font-bold text-white">
            Rodapé, Central de Contato & Tony de Luc
          </h2>
          <p className="text-xs text-neutral-400">
            Gerencie e personalize tudo o que aparece no rodapé do site, canais de suporte e na página oficial do Diretor Tony de Luc.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => onNavigate('tony-de-luc')}
            className="px-3.5 py-2 rounded-xl bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 text-neutral-300 hover:text-white text-xs font-mono flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <User className="w-3.5 h-3.5 text-amber-400" />
            <span>Ver Página Tony de Luc</span>
            <ExternalLink className="w-3 h-3 text-neutral-500" />
          </button>

          <button
            onClick={() => onNavigate('contato')}
            className="px-3.5 py-2 rounded-xl bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 text-neutral-300 hover:text-white text-xs font-mono flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Mail className="w-3.5 h-3.5 text-amber-400" />
            <span>Ver Contato</span>
            <ExternalLink className="w-3 h-3 text-neutral-500" />
          </button>

          <button
            onClick={handleSaveAll}
            disabled={saving}
            className="px-5 py-2.5 bg-amber-500 hover:bg-amber-400 disabled:opacity-50 text-neutral-950 font-bold uppercase rounded-xl text-xs transition-all cursor-pointer flex items-center gap-2 shadow-lg shadow-amber-500/20 font-sans active:scale-98"
          >
            <Save className="w-4 h-4" />
            <span>{saving ? 'Salvando...' : 'Salvar Alterações'}</span>
          </button>
        </div>
      </div>

      {/* Sub-tabs selector for easy navigation */}
      <div className="flex items-center gap-2 border-b border-neutral-800 pb-2 text-xs font-mono">
        <button
          onClick={() => setSubTab('all')}
          className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
            subTab === 'all'
              ? 'bg-neutral-800 text-white font-bold border border-neutral-700'
              : 'text-neutral-400 hover:text-neutral-200'
          }`}
        >
          Visão Completa
        </button>
        <button
          onClick={() => setSubTab('tony')}
          className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 ${
            subTab === 'tony'
              ? 'bg-amber-500 text-black font-bold'
              : 'text-neutral-400 hover:text-amber-400'
          }`}
        >
          <User className="w-3.5 h-3.5" />
          <span>Página Tony de Luc</span>
        </button>
        <button
          onClick={() => setSubTab('welcome')}
          className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 ${
            subTab === 'welcome'
              ? 'bg-amber-500 text-black font-bold'
              : 'text-neutral-400 hover:text-amber-400'
          }`}
        >
          <Video className="w-3.5 h-3.5" />
          <span>Vídeo & Boas-Vindas (Home)</span>
        </button>
        <button
          onClick={() => setSubTab('contact')}
          className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 ${
            subTab === 'contact'
              ? 'bg-amber-500 text-black font-bold'
              : 'text-neutral-400 hover:text-amber-400'
          }`}
        >
          <Phone className="w-3.5 h-3.5" />
          <span>Contato & Suporte</span>
        </button>
        <button
          onClick={() => setSubTab('footer')}
          className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 ${
            subTab === 'footer'
              ? 'bg-amber-500 text-black font-bold'
              : 'text-neutral-400 hover:text-amber-400'
          }`}
        >
          <Globe className="w-3.5 h-3.5" />
          <span>Rodapé do Site</span>
        </button>
      </div>

      {/* ========================================================================= */}
      {/* SEÇÃO: VÍDEO E MENSAGEM DE BOAS-VINDAS AOS NOVOS ALUNOS (PÁGINA INICIAL)  */}
      {/* ========================================================================= */}
      {(subTab === 'all' || subTab === 'welcome') && (
        <div className="p-6 sm:p-8 rounded-3xl bg-neutral-900 border border-amber-500/30 space-y-6 shadow-xl relative overflow-hidden">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-800 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
                <Video className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white font-display">
                  Vídeo & Mensagem de Boas-Vindas (Página Inicial)
                </h3>
                <p className="text-xs text-neutral-400">
                  Suba o vídeo do seu computador (MP4, WebM) ou insira um link para acolher os novos alunos na Home.
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={handleSaveWelcomeSectionOnly}
              disabled={saving}
              className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-black text-xs font-mono font-bold rounded-xl flex items-center gap-2 transition-all cursor-pointer shadow-md"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Salvar Vídeo & Mensagem</span>
            </button>
          </div>

          {welcomeVideoSaved && (
            <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center gap-2 text-emerald-400 text-xs font-mono">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>Vídeo e Mensagem de Boas-Vindas salvos e publicados com sucesso na Página Inicial!</span>
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Left: Video Upload & Preview */}
            <div className="lg:col-span-6 space-y-4">
              <span className="block text-xs font-mono text-neutral-300 font-semibold uppercase tracking-wider">
                1. Vídeo de Apresentação & Boas-Vindas
              </span>

              {/* Video Player Preview */}
              <div className="aspect-video rounded-2xl overflow-hidden bg-black border border-neutral-800 relative flex items-center justify-center">
                {welcomeVideoUrl ? (
                  (() => {
                    const embed = getEmbedInfo(welcomeVideoUrl);
                    if (embed && (embed.type === 'youtube' || embed.type === 'vimeo')) {
                      return (
                        <iframe
                          src={embed.embedUrl}
                          title="Pré-visualização do Vídeo"
                          className="w-full h-full border-0"
                          allowFullScreen
                        />
                      );
                    }
                    return (
                      <div className="relative w-full h-full flex items-center justify-center bg-black">
                        <video
                          key={welcomeVideoUrl}
                          controls
                          playsInline
                          preload="metadata"
                          poster={welcomeVideoPoster || '/images/cinelab-cover.jpg'}
                          className="w-full h-full object-contain"
                          onError={(e) => {
                            console.warn('Vídeo em recuperação na aba institucional.');
                            const v = e.currentTarget;
                            if (v && !v.src.includes('cinelab-intro-apresentacao.mp4')) {
                              v.src = '/uploads/videos/cinelab-intro-apresentacao.mp4';
                              v.load();
                            }
                          }}
                        >
                          <source src={welcomeVideoUrl} type="video/mp4" />
                          <source src="/uploads/videos/aula-CINELAB_INTRODU__O-1790480419494-936896.mp4" type="video/mp4" />
                          <source src="/videos/aula-CINELAB_INTRODU__O-1790480419494-936896.mp4" type="video/mp4" />
                          <source src="/uploads/videos/cinelab-intro-apresentacao.mp4" type="video/mp4" />
                          <source src="/videos/cinelab-intro-apresentacao.mp4" type="video/mp4" />
                          Vídeo carregado
                        </video>
                      </div>
                    );
                  })()
                ) : (
                  <div className="text-center p-6 space-y-2">
                    <Video className="w-12 h-12 text-neutral-600 mx-auto" />
                    <p className="text-xs text-neutral-400">Nenhum vídeo configurado no momento.</p>
                    <p className="text-[11px] text-neutral-500">Suba um arquivo MP4 ou informe um link abaixo.</p>
                  </div>
                )}
              </div>

              {welcomeVideoUrl && (
                <div className="flex items-center justify-between text-xs font-mono">
                  <a
                    href={welcomeVideoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-amber-400 hover:text-amber-300 underline"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>Abrir vídeo em nova aba (Player Nativo)</span>
                  </a>
                  <span className="text-[10px] text-neutral-400">364 MB • 1080p MP4</span>
                </div>
              )}

              {/* Upload Dropzone & Button */}
              <div className="space-y-3">
                <div
                  onDragOver={(e) => {
                    e.preventDefault();
                    if (!welcomeVideoUploading) setVideoDragOver(true);
                  }}
                  onDragLeave={() => setVideoDragOver(false)}
                  onDrop={(e) => {
                    e.preventDefault();
                    setVideoDragOver(false);
                    if (welcomeVideoUploading) return;
                    const file = e.dataTransfer.files?.[0];
                    if (file) processVideoFile(file);
                  }}
                  onClick={() => {
                    if (!welcomeVideoUploading && videoFileInputRef.current) {
                      videoFileInputRef.current.value = '';
                      videoFileInputRef.current.click();
                    }
                  }}
                  className={`block w-full py-4 px-4 bg-amber-500/10 hover:bg-amber-500/20 border-2 border-dashed ${
                    welcomeVideoUploading
                      ? 'border-amber-400 bg-amber-500/20 animate-pulse'
                      : videoDragOver
                      ? 'border-amber-400 bg-amber-500/30 scale-[1.01]'
                      : 'border-amber-500/40 hover:border-amber-500'
                  } rounded-2xl text-center cursor-pointer transition-all select-none`}
                >
                  <Upload className="w-6 h-6 text-amber-400 mx-auto mb-1.5" />
                  <span className="text-xs font-mono font-bold text-amber-300 block">
                    {welcomeVideoUploading
                      ? 'Enviando vídeo para o servidor...'
                      : videoDragOver
                      ? 'Solte o arquivo de vídeo aqui'
                      : 'Clique ou Arraste para Subir Vídeo do Computador (MP4, MOV, WebM)'}
                  </span>
                  <span className="text-[10px] text-neutral-400 block mt-1">
                    Envio acelerado em partes seguras de 10 MB • Suporta arquivos grandes de 350 MB a 1 GB+
                  </span>
                  <input
                    ref={videoFileInputRef}
                    id="welcome-video-file-input"
                    type="file"
                    accept="video/mp4,video/webm,video/quicktime,video/*,.mp4,.mov,.webm,.mkv,.avi,.m4v"
                    disabled={welcomeVideoUploading}
                    onChange={handleWelcomeVideoUpload}
                    className="hidden"
                  />
                </div>

                {welcomeVideoError && (
                  <div className="p-3 rounded-xl bg-red-950/80 border border-red-700/80 text-red-200 text-xs font-mono flex items-start gap-2 animate-fadeIn">
                    <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <span className="font-bold block">Falha no envio do vídeo:</span>
                      <span>{welcomeVideoError}</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setWelcomeVideoError('')}
                      className="text-red-400 hover:text-red-200 text-xs cursor-pointer"
                    >
                      ✕
                    </button>
                  </div>
                )}

                {welcomeVideoUploading && (
                  <div className="space-y-2 p-3.5 rounded-xl bg-neutral-950 border border-amber-500/30">
                    <div className="flex items-center justify-between text-[11px] font-mono">
                      <span className="text-amber-300 font-bold">Transferindo arquivo de vídeo...</span>
                      <span className="text-amber-400 font-bold">{welcomeVideoProgress}%</span>
                    </div>
                    <div className="w-full bg-neutral-900 h-2.5 rounded-full overflow-hidden border border-amber-500/40">
                      <div
                        className="bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-300 h-full transition-all duration-300"
                        style={{ width: `${welcomeVideoProgress}%` }}
                      />
                    </div>
                    {welcomeVideoProgressDetails && (
                      <span className="text-[11px] text-neutral-300 font-mono block text-center">
                        {welcomeVideoProgressDetails}
                      </span>
                    )}
                    <span className="text-[10px] text-neutral-500 block text-center">
                      Por favor, mantenha esta aba aberta enquanto o envio de alta capacidade é concluído.
                    </span>
                  </div>
                )}

                {/* External link input */}
                <div>
                  <label className="block text-xs font-mono text-neutral-400 mb-1">
                    Ou informe o Link do Vídeo (YouTube, Vimeo ou URL .mp4):
                  </label>
                  <input
                    type="text"
                    value={welcomeVideoUrl}
                    onChange={(e) => {
                      setWelcomeVideoUrl(e.target.value);
                      setWelcomeVideoSaved(false);
                    }}
                    placeholder="https://www.youtube.com/watch?v=... ou https://vimeo.com/..."
                    className="w-full px-3.5 py-2.5 bg-neutral-950 border border-neutral-700 rounded-xl text-white text-xs font-mono focus:border-amber-500 focus:outline-none"
                  />
                </div>

                {/* Poster / Cover Image */}
                <div className="p-4 rounded-2xl bg-neutral-950/80 border border-neutral-800 space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="block text-xs font-mono text-amber-300 font-bold flex items-center gap-1.5">
                      <ImageIcon className="w-3.5 h-3.5 text-amber-400" />
                      <span>Capa do Vídeo (Poster da Apresentação)</span>
                    </label>
                    <button
                      type="button"
                      onClick={() => {
                        setWelcomeVideoPoster('/images/cinelab-cover.jpg');
                        setWelcomeVideoSaved(false);
                      }}
                      className="text-[11px] font-mono text-amber-400 hover:text-amber-300 underline cursor-pointer"
                    >
                      Restaurar Capa Padrão CINELAB
                    </button>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                    {/* Live Thumbnail Preview */}
                    <div className="w-full sm:w-44 aspect-video rounded-xl overflow-hidden border border-neutral-700 bg-black shrink-0 relative shadow-md">
                      <img
                        src={welcomeVideoPoster || '/images/cinelab-cover.jpg'}
                        alt="Capa do Vídeo"
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = '/images/cinelab-cover.jpg';
                        }}
                      />
                      <div className="absolute bottom-1 right-1 px-1.5 py-0.5 rounded bg-black/80 text-[9px] font-mono text-amber-300">
                        Capa Ativa
                      </div>
                    </div>

                    {/* Upload Controls */}
                    <div className="flex-1 w-full space-y-2">
                      <div
                        onDragOver={(e) => {
                          e.preventDefault();
                          if (!posterUploading) setPosterDragOver(true);
                        }}
                        onDragLeave={() => setPosterDragOver(false)}
                        onDrop={(e) => {
                          e.preventDefault();
                          setPosterDragOver(false);
                          if (posterUploading) return;
                          const file = e.dataTransfer.files?.[0];
                          if (file) handlePosterUpload(file);
                        }}
                        onClick={() => {
                          if (!posterUploading && posterFileInputRef.current) {
                            posterFileInputRef.current.value = '';
                            posterFileInputRef.current.click();
                          }
                        }}
                        className={`block w-full py-2.5 px-4 bg-amber-500/10 hover:bg-amber-500/20 border-2 border-dashed ${
                          posterUploading
                            ? 'border-amber-400 animate-pulse'
                            : posterDragOver
                            ? 'border-amber-400 bg-amber-500/30'
                            : 'border-amber-500/40 hover:border-amber-500'
                        } rounded-xl text-center cursor-pointer transition-all select-none`}
                      >
                        <div className="flex items-center justify-center gap-2">
                          {posterUploading ? (
                            <>
                              <Loader2 className="w-4 h-4 animate-spin text-amber-400" />
                              <span className="text-xs font-mono font-bold text-amber-300">
                                Subindo capa {posterProgress}%...
                              </span>
                            </>
                          ) : (
                            <>
                              <Upload className="w-4 h-4 text-amber-400" />
                              <span className="text-xs font-mono font-bold text-amber-300">
                                {posterDragOver ? 'Solte a capa aqui' : 'Subir Capa do seu Computador (JPG, PNG, WebP)'}
                              </span>
                            </>
                          )}
                        </div>
                        <input
                          ref={posterFileInputRef}
                          id="welcome-video-poster-input"
                          type="file"
                          accept="image/jpeg,image/png,image/webp,image/avif,image/gif"
                          disabled={posterUploading}
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) handlePosterUpload(file);
                            e.target.value = '';
                          }}
                          className="hidden"
                        />
                      </div>

                      {posterUploading && (
                        <div className="w-full h-1.5 bg-neutral-800 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-amber-500 to-yellow-400 transition-all duration-300"
                            style={{ width: `${posterProgress}%` }}
                          />
                        </div>
                      )}

                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-mono text-neutral-500 shrink-0">URL:</span>
                        <input
                          type="text"
                          value={welcomeVideoPoster}
                          onChange={(e) => {
                            setWelcomeVideoPoster(e.target.value);
                            setWelcomeVideoSaved(false);
                          }}
                          placeholder="/images/cinelab-cover.jpg ou link externo"
                          className="w-full px-3 py-1.5 bg-neutral-950 border border-neutral-800 rounded-lg text-white text-[11px] font-mono focus:border-amber-500 focus:outline-none"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {welcomeVideoUrl && (
                  <div className="flex items-center justify-between pt-1">
                    <span className="text-[11px] font-mono text-emerald-400 flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Vídeo vinculado à Página Inicial
                    </span>
                    <button
                      type="button"
                      onClick={async () => {
                        const confirmed = window.confirm(
                          'Atenção: O vídeo de boas-vindas só será removido se você confirmar. Deseja realmente remover o vídeo da página inicial?'
                        );
                        if (!confirmed) return;
                        setWelcomeVideoUrl('');
                        setPreviewVideoError(false);
                        await onSaveSettings({ welcomeVideoUrl: '', explicitRemoveWelcomeVideo: true } as any);
                        setWelcomeVideoSaved(true);
                        notify('Vídeo de boas-vindas removido com sucesso!', 'success');
                      }}
                      className="text-xs font-mono text-red-400 hover:text-red-300 flex items-center gap-1 cursor-pointer"
                    >
                      <Trash2 className="w-3 h-3" />
                      <span>Remover Vídeo</span>
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Right: Welcome Message Content */}
            <div className="lg:col-span-6 space-y-4">
              <span className="block text-xs font-mono text-neutral-300 font-semibold uppercase tracking-wider">
                2. Texto da Mensagem de Boas-Vindas
              </span>

              <div>
                <label className="block text-xs font-mono text-neutral-400 mb-1">
                  Título da Seção de Boas-Vindas
                </label>
                <input
                  type="text"
                  value={welcomeMessageTitle}
                  onChange={(e) => {
                    setWelcomeMessageTitle(e.target.value);
                    setWelcomeVideoSaved(false);
                  }}
                  placeholder="Mensagem de Boas-Vindas aos Novos Alunos"
                  className="w-full px-3.5 py-2.5 bg-neutral-950 border border-neutral-700 rounded-xl text-white text-xs font-medium focus:border-amber-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-neutral-400 mb-1">
                  Carta / Mensagem de Boas-Vindas do Professor Tony de Luc
                </label>
                <textarea
                  rows={9}
                  value={welcomeMessageText}
                  onChange={(e) => {
                    setWelcomeMessageText(e.target.value);
                    setWelcomeVideoSaved(false);
                  }}
                  placeholder="Texto da mensagem de acolhimento aos novos alunos..."
                  className="w-full p-3.5 bg-neutral-950 border border-neutral-700 rounded-xl text-white text-xs font-sans leading-relaxed focus:border-amber-500 focus:outline-none"
                />
                <p className="text-[11px] text-neutral-500 mt-1">
                  Separe os parágrafos com uma linha em branco. Este texto é exibido ao lado do vídeo na Home e também na página oficial do Diretor.
                </p>
              </div>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={handleSaveWelcomeSectionOnly}
                  disabled={saving}
                  className="w-full py-2.5 px-4 bg-amber-500 hover:bg-amber-400 text-black font-bold font-mono text-xs uppercase rounded-xl flex items-center justify-center gap-2 cursor-pointer shadow-md transition-all"
                >
                  <Save className="w-4 h-4" />
                  <span>Salvar Vídeo & Mensagem na Página Inicial</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* SEÇÃO 1: PÁGINA DO PROFESSOR CINEASTA TONY DE LUC                         */}
      {/* ========================================================================= */}
      {(subTab === 'all' || subTab === 'tony') && (
        <div className="p-6 rounded-3xl bg-neutral-900 border border-neutral-800 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-neutral-800 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
                <Clapperboard className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold font-display text-white">
                  Página do Professor Cineasta Tony de Luc
                </h3>
                <p className="text-xs text-neutral-400">
                  Edite a biografia, feitos, currículo acadêmico, filmografia e foto de perfil do Diretor.
                </p>
              </div>
            </div>

            <button
              onClick={() => onNavigate('tony-de-luc')}
              className="px-3.5 py-1.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-amber-300 text-xs font-mono flex items-center gap-1.5 self-start sm:self-auto cursor-pointer"
            >
              <Eye className="w-3.5 h-3.5 text-amber-400" />
              <span>Ver Página no Site</span>
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Foto & Identidade Visual (4 cols) */}
            <div className="lg:col-span-4 space-y-4">
              <label className="block text-xs font-mono text-neutral-400">
                Foto do Diretor Tony de Luc
              </label>

              <div className="relative group w-full rounded-2xl overflow-hidden border border-neutral-700 bg-neutral-950 aspect-[4/5] flex items-center justify-center">
                {tonyPhotoUrl ? (
                  <img
                    src={tonyPhotoUrl}
                    alt={tonyName}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-top"
                  />
                ) : (
                  <div className="text-center p-4 text-neutral-600">
                    <User className="w-12 h-12 mx-auto mb-2 opacity-50" />
                    <span className="text-xs">Sem foto configurada</span>
                  </div>
                )}
                <div className="absolute top-2 right-2 px-2 py-0.5 rounded-md bg-black/80 text-[10px] font-mono text-amber-400 border border-amber-500/30">
                  Pré-visualização
                </div>
              </div>

              {/* Upload direto do PC */}
              <div className="space-y-2">
                <label
                  className={`w-full py-2.5 px-3 rounded-xl text-xs font-mono flex items-center justify-center gap-2 cursor-pointer transition-all border ${
                    photoUploading
                      ? 'bg-amber-500/20 border-amber-500/50 text-amber-300 pointer-events-none'
                      : 'bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold border-amber-400 shadow-md shadow-amber-500/20 active:scale-98'
                  }`}
                >
                  {photoUploading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-amber-400" />
                      <span>Enviando Foto ({photoProgress}%)...</span>
                    </>
                  ) : (
                    <>
                      <Upload className="w-4 h-4 text-neutral-950" />
                      <span>Subir Foto do Computador</span>
                    </>
                  )}
                  <input
                    type="file"
                    accept="image/png,image/jpeg,image/webp,image/svg+xml,image/avif,image/*"
                    disabled={photoUploading}
                    onChange={handlePhotoUpload}
                    className="hidden"
                  />
                </label>

                {/* Progress bar when uploading */}
                {photoUploading && (
                  <div className="space-y-1">
                    <div className="w-full bg-neutral-950 h-2 rounded-full overflow-hidden border border-amber-500/30">
                      <div
                        className="bg-gradient-to-r from-amber-500 to-amber-300 h-full transition-all duration-300"
                        style={{ width: `${photoProgress}%` }}
                      />
                    </div>
                    <span className="text-[10px] text-amber-400 font-mono block text-center">
                      Gravando foto no servidor com segurança...
                    </span>
                  </div>
                )}

                {photoSaved && (
                  <div className="p-2 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center gap-2 text-emerald-400 text-[11px] font-mono">
                    <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                    <span>Foto gravada e sincronizada no site!</span>
                  </div>
                )}

                <div className="space-y-1 pt-1">
                  <span className="text-[10px] text-neutral-500 font-mono block">Ou cole uma URL direta da Imagem:</span>
                  <input
                    type="text"
                    value={tonyPhotoUrl}
                    onChange={(e) => {
                      setTonyPhotoUrl(e.target.value);
                      setPhotoSaved(false);
                    }}
                    placeholder="https://exemplo.com/foto-tony.jpg"
                    className="w-full px-3 py-2 bg-neutral-950 border border-neutral-700 rounded-xl text-xs text-white font-mono focus:border-amber-500 focus:outline-none"
                  />
                </div>

                {/* Botão de Gravação Rápida da Foto */}
                <button
                  type="button"
                  onClick={handleSavePhotoOnly}
                  disabled={saving || photoUploading || !tonyPhotoUrl}
                  className="w-full py-2 px-3 bg-neutral-800 hover:bg-neutral-700 border border-neutral-700 text-neutral-200 hover:text-white rounded-xl text-xs font-mono flex items-center justify-center gap-1.5 cursor-pointer transition-colors"
                >
                  <Save className="w-3.5 h-3.5 text-amber-400" />
                  <span>Gravar Foto Agora</span>
                </button>
              </div>

              {/* Redes Sociais do Diretor */}
              <div className="p-4 rounded-2xl bg-neutral-950 border border-neutral-800/80 space-y-3">
                <span className="text-xs font-bold text-neutral-200 font-mono block">
                  Redes & Portfólios do Diretor:
                </span>
                <div className="space-y-2.5 text-xs">
                  <div>
                    <label className="text-[10px] text-neutral-400 flex items-center gap-1.5 mb-1">
                      <Instagram className="w-3 h-3 text-pink-400" />
                      <span>Instagram do Diretor</span>
                    </label>
                    <input
                      type="text"
                      value={tonySocialInstagram}
                      onChange={(e) => setTonySocialInstagram(e.target.value)}
                      placeholder="https://instagram.com/tonydeluc.cinema"
                      className="w-full px-3 py-1.5 bg-neutral-900 border border-neutral-700 rounded-lg text-xs text-white font-mono focus:border-amber-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-neutral-400 flex items-center gap-1.5 mb-1">
                      <Linkedin className="w-3 h-3 text-sky-400" />
                      <span>LinkedIn Profissional</span>
                    </label>
                    <input
                      type="text"
                      value={tonySocialLinkedin}
                      onChange={(e) => setTonySocialLinkedin(e.target.value)}
                      placeholder="https://linkedin.com/in/tonydeluc-cinema"
                      className="w-full px-3 py-1.5 bg-neutral-900 border border-neutral-700 rounded-lg text-xs text-white font-mono focus:border-amber-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-neutral-400 flex items-center gap-1.5 mb-1">
                      <Youtube className="w-3 h-3 text-red-500" />
                      <span>Canal no YouTube (Portfólio & Aulas)</span>
                    </label>
                    <input
                      type="text"
                      value={tonySocialYoutube}
                      onChange={(e) => setTonySocialYoutube(e.target.value)}
                      placeholder="https://youtube.com/@cinelabcinema"
                      className="w-full px-3 py-1.5 bg-neutral-900 border border-neutral-700 rounded-lg text-xs text-white font-mono focus:border-amber-500 focus:outline-none"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Dados Textuais, Biografia & Feitos (8 cols) */}
            <div className="lg:col-span-8 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-neutral-400 mb-1">
                    Nome Oficial do Diretor
                  </label>
                  <input
                    type="text"
                    value={tonyName}
                    onChange={(e) => setTonyName(e.target.value)}
                    placeholder="Professor Cineasta Tony de Luc"
                    className="w-full px-3.5 py-2.5 bg-neutral-950 border border-neutral-700 rounded-xl text-white text-xs font-medium focus:border-amber-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-neutral-400 mb-1">
                    Cargo / Titulação Acadêmica
                  </label>
                  <input
                    type="text"
                    value={tonyRole}
                    onChange={(e) => setTonyRole(e.target.value)}
                    placeholder="Diretor Geral & Cineasta"
                    className="w-full px-3.5 py-2.5 bg-neutral-950 border border-neutral-700 rounded-xl text-white text-xs font-medium focus:border-amber-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-neutral-400 mb-1">
                  Tagline / Frase / Manifesto do Diretor
                </label>
                <input
                  type="text"
                  value={tonyTagline}
                  onChange={(e) => setTonyTagline(e.target.value)}
                  placeholder="Frase de impacto que aparece no topo da página do diretor"
                  className="w-full px-3.5 py-2.5 bg-neutral-950 border border-neutral-700 rounded-xl text-white text-xs focus:border-amber-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-neutral-400 mb-1">
                  Minibiografia (Resumo curto que aparece no topo)
                </label>
                <textarea
                  rows={2}
                  value={tonyBioShort}
                  onChange={(e) => setTonyBioShort(e.target.value)}
                  placeholder="Resumo biográfico de 2 a 3 linhas..."
                  className="w-full px-3.5 py-2.5 bg-neutral-950 border border-neutral-700 rounded-xl text-white text-xs leading-relaxed focus:border-amber-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-neutral-400 mb-1">
                  Biografia Completa & Trajetória Detalhada
                </label>
                <textarea
                  rows={5}
                  value={tonyBioFull}
                  onChange={(e) => setTonyBioFull(e.target.value)}
                  placeholder="Conte a história completa, trajetória em sets, prêmios e pedagogia..."
                  className="w-full px-3.5 py-2.5 bg-neutral-950 border border-neutral-700 rounded-xl text-white text-xs leading-relaxed focus:border-amber-500 focus:outline-none"
                />
              </div>

              {/* Feitos & Conquistas */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-mono text-neutral-400">
                    Grandes Feitos, Premiações & Conquistas (1 por linha)
                  </label>
                  <span className="text-[10px] text-amber-400 font-mono">
                    {tonyFeitosText.split('\n').filter(Boolean).length} itens cadastrados
                  </span>
                </div>
                <textarea
                  rows={5}
                  value={tonyFeitosText}
                  onChange={(e) => setTonyFeitosText(e.target.value)}
                  placeholder="Digite uma conquista por linha..."
                  className="w-full px-3.5 py-2.5 bg-neutral-950 border border-neutral-700 rounded-xl text-white text-xs leading-relaxed font-sans focus:border-amber-500 focus:outline-none"
                />
              </div>

              {/* Currículo Acadêmico */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-mono text-neutral-400">
                    Currículo & Formação Acadêmica (1 por linha)
                  </label>
                  <span className="text-[10px] text-amber-400 font-mono">
                    {tonyCurriculoText.split('\n').filter(Boolean).length} itens cadastrados
                  </span>
                </div>
                <textarea
                  rows={5}
                  value={tonyCurriculoText}
                  onChange={(e) => setTonyCurriculoText(e.target.value)}
                  placeholder="Digite uma formação/especialização por linha..."
                  className="w-full px-3.5 py-2.5 bg-neutral-950 border border-neutral-700 rounded-xl text-white text-xs leading-relaxed font-sans focus:border-amber-500 focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Filmografia Interativa */}
          <div className="border-t border-neutral-800 pt-6 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-bold font-display text-white flex items-center gap-2">
                  <Film className="w-4 h-4 text-amber-400" /> Filmografia Selecionada do Diretor
                </h4>
                <p className="text-xs text-neutral-400">
                  Cadastre filmes, séries, documentários e produções audiovisuais realizadas por Tony de Luc.
                </p>
              </div>

              <button
                type="button"
                onClick={handleAddFilm}
                className="px-3 py-1.5 bg-neutral-800 hover:bg-neutral-700 text-amber-400 text-xs font-mono rounded-xl border border-neutral-700 flex items-center gap-1.5 cursor-pointer transition-colors"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Adicionar Obra</span>
              </button>
            </div>

            <div className="space-y-3">
              {tonyFilmografia.map((work, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-2xl bg-neutral-950 border border-neutral-800 space-y-3 relative group"
                >
                  <div className="flex items-center justify-between gap-2 border-b border-neutral-800/80 pb-2">
                    <span className="text-xs font-bold text-amber-400 font-mono">
                      Obra #{idx + 1}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleRemoveFilm(idx)}
                      className="p-1 text-neutral-500 hover:text-red-400 transition-colors cursor-pointer"
                      title="Excluir obra"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
                    <div className="sm:col-span-5">
                      <label className="text-[10px] text-neutral-400 font-mono block mb-1">Título da Obra</label>
                      <input
                        type="text"
                        value={work.title}
                        onChange={(e) => handleUpdateFilm(idx, 'title', e.target.value)}
                        className="w-full px-3 py-2 bg-neutral-900 border border-neutral-700 rounded-lg text-xs text-white focus:border-amber-500 focus:outline-none"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="text-[10px] text-neutral-400 font-mono block mb-1">Ano</label>
                      <input
                        type="text"
                        value={work.year}
                        onChange={(e) => handleUpdateFilm(idx, 'year', e.target.value)}
                        className="w-full px-3 py-2 bg-neutral-900 border border-neutral-700 rounded-lg text-xs text-white font-mono focus:border-amber-500 focus:outline-none"
                      />
                    </div>

                    <div className="sm:col-span-5">
                      <label className="text-[10px] text-neutral-400 font-mono block mb-1">Função / Papel</label>
                      <input
                        type="text"
                        value={work.role}
                        onChange={(e) => handleUpdateFilm(idx, 'role', e.target.value)}
                        className="w-full px-3 py-2 bg-neutral-900 border border-neutral-700 rounded-lg text-xs text-white focus:border-amber-500 focus:outline-none"
                      />
                    </div>

                    <div className="sm:col-span-4">
                      <label className="text-[10px] text-neutral-400 font-mono block mb-1">Formato / Categoria</label>
                      <input
                        type="text"
                        value={work.type}
                        onChange={(e) => handleUpdateFilm(idx, 'type', e.target.value)}
                        placeholder="Longa-metragem, Curta, Documentário"
                        className="w-full px-3 py-2 bg-neutral-900 border border-neutral-700 rounded-lg text-xs text-white focus:border-amber-500 focus:outline-none"
                      />
                    </div>

                    <div className="sm:col-span-8">
                      <label className="text-[10px] text-neutral-400 font-mono block mb-1">Detalhes, Prêmios & Festivais</label>
                      <input
                        type="text"
                        value={work.details}
                        onChange={(e) => handleUpdateFilm(idx, 'details', e.target.value)}
                        placeholder="Exibições em festivais, premiações e menções"
                        className="w-full px-3 py-2 bg-neutral-900 border border-neutral-700 rounded-lg text-xs text-white focus:border-amber-500 focus:outline-none"
                      />
                    </div>

                    {/* Link do Vídeo (YouTube ou Vimeo) */}
                    <div className="sm:col-span-12 pt-1 border-t border-neutral-800/60">
                      <div className="flex items-center justify-between gap-2 mb-1.5 flex-wrap">
                        <label className="text-[10px] text-neutral-300 font-mono flex items-center gap-1.5 font-bold">
                          <PlayCircle className="w-3.5 h-3.5 text-amber-400" />
                          <span>Link do Filme (YouTube ou Vimeo)</span>
                        </label>

                        {work.videoUrl && (
                          <div className="flex items-center gap-2">
                            {(() => {
                              const parsed = parseVideoEmbed(work.videoUrl);
                              if (!parsed) {
                                return (
                                  <span className="text-[10px] font-mono text-amber-400/80 bg-amber-950/40 px-2 py-0.5 rounded border border-amber-500/20">
                                    Link direto inserido
                                  </span>
                                );
                              }
                              return (
                                <span className={`text-[10px] font-mono px-2 py-0.5 rounded border flex items-center gap-1 ${
                                  parsed.type === 'youtube'
                                    ? 'bg-red-950/40 border-red-500/30 text-red-400'
                                    : parsed.type === 'vimeo'
                                    ? 'bg-sky-950/40 border-sky-500/30 text-sky-400'
                                    : 'bg-neutral-800 border-neutral-700 text-neutral-300'
                                }`}>
                                  {parsed.type === 'youtube' && <Youtube className="w-3 h-3 text-red-500" />}
                                  {parsed.type === 'vimeo' && <Play className="w-3 h-3 text-sky-400" />}
                                  <span>{parsed.platformLabel}</span>
                                </span>
                              );
                            })()}

                            <button
                              type="button"
                              onClick={() => setPreviewFilmIdx(previewFilmIdx === idx ? null : idx)}
                              className="px-2 py-0.5 rounded bg-neutral-800 hover:bg-neutral-700 text-amber-400 hover:text-amber-300 text-[10px] font-mono flex items-center gap-1 transition-colors cursor-pointer border border-neutral-700"
                              title="Testar player na interface de edição"
                            >
                              {previewFilmIdx === idx ? (
                                <>
                                  <EyeOff className="w-3 h-3" />
                                  <span>Fechar Player</span>
                                </>
                              ) : (
                                <>
                                  <Eye className="w-3 h-3" />
                                  <span>Pré-visualizar Player</span>
                                </>
                              )}
                            </button>

                            <a
                              href={work.videoUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="px-2 py-0.5 rounded bg-neutral-800 hover:bg-neutral-700 text-neutral-300 hover:text-white text-[10px] font-mono flex items-center gap-1 transition-colors border border-neutral-700"
                              title="Abrir em nova aba"
                            >
                              <ExternalLink className="w-3 h-3 text-amber-400" />
                              <span>Testar Link</span>
                            </a>
                          </div>
                        )}
                      </div>

                      <div className="relative flex items-center">
                        <input
                          type="url"
                          value={work.videoUrl || ''}
                          onChange={(e) => handleUpdateFilm(idx, 'videoUrl', e.target.value)}
                          placeholder="Cole aqui o link do filme (Ex: https://www.youtube.com/watch?v=... ou https://vimeo.com/...)"
                          className="w-full pl-9 pr-4 py-2 bg-neutral-900 border border-neutral-700 rounded-lg text-xs text-white placeholder-neutral-500 focus:border-amber-500 focus:outline-none font-mono"
                        />
                        <div className="absolute left-3 text-neutral-400 pointer-events-none">
                          {work.videoUrl?.includes('vimeo') ? (
                            <span className="font-bold text-[10px] text-sky-400 font-mono">VI</span>
                          ) : work.videoUrl?.includes('youtu') ? (
                            <Youtube className="w-3.5 h-3.5 text-red-500" />
                          ) : (
                            <Video className="w-3.5 h-3.5 text-amber-400" />
                          )}
                        </div>
                      </div>
                      <p className="text-[10px] text-neutral-400 mt-1">
                        Permite que os alunos assistam ao filme diretamente na página do Diretor através de um player de cinema integrado. Suporta vídeos do YouTube, Vimeo ou link direto MP4.
                      </p>

                      {/* Quick Player Preview in Admin */}
                      {previewFilmIdx === idx && work.videoUrl && (
                        <div className="mt-3 p-3 bg-neutral-950 rounded-xl border border-amber-500/40 space-y-2">
                          <div className="flex items-center justify-between text-xs font-mono text-neutral-300 pb-1 border-b border-neutral-800">
                            <span className="flex items-center gap-1.5 text-amber-400 font-bold">
                              <PlayCircle className="w-3.5 h-3.5" />
                              Player de Teste: {work.title || 'Sem título'}
                            </span>
                            <button
                              type="button"
                              onClick={() => setPreviewFilmIdx(null)}
                              className="text-neutral-400 hover:text-white text-[11px]"
                            >
                              ✕ Fechar
                            </button>
                          </div>
                          <div className="aspect-video w-full max-w-lg mx-auto bg-black rounded-lg overflow-hidden border border-neutral-800">
                            {(() => {
                              const parsed = parseVideoEmbed(work.videoUrl);
                              if (parsed && (parsed.type === 'youtube' || parsed.type === 'vimeo' || parsed.type === 'archive')) {
                                return (
                                  <iframe
                                    src={parsed.embedUrl}
                                    title={`Preview: ${work.title}`}
                                    className="w-full h-full border-0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                  />
                                );
                              }
                              return (
                                <video
                                  controls
                                  playsInline
                                  preload="metadata"
                                  src={parsed?.embedUrl || work.videoUrl}
                                  className="w-full h-full object-contain"
                                >
                                  Seu navegador não suporta a tag de vídeo.
                                </video>
                              );
                            })()}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* SEÇÃO 2: CANAIS DE CONTATO & SUPORTE AO ALUNO                             */}
      {/* ========================================================================= */}
      {(subTab === 'all' || subTab === 'contact') && (
        <div className="p-6 rounded-3xl bg-neutral-900 border border-neutral-800 space-y-6">
          <div className="flex items-center gap-3 border-b border-neutral-800 pb-4">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
              <Phone className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold font-display text-white">
                Canais de Contato & Suporte Oficial
              </h3>
              <p className="text-xs text-neutral-400">
                Informações de atendimento exibidas na Central de Contato e no rodapé para os alunos.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 text-xs">
            <div>
              <label className="block text-neutral-400 font-mono mb-1">E-mail Oficial</label>
              <input
                type="email"
                value={contactEmail}
                onChange={(e) => setContactEmail(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-neutral-950 border border-neutral-700 rounded-xl text-white font-mono focus:border-amber-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-neutral-400 font-mono mb-1">Telefone Principal (Exibição)</label>
              <input
                type="text"
                value={contactPhone}
                onChange={(e) => setContactPhone(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-neutral-950 border border-neutral-700 rounded-xl text-white font-mono focus:border-amber-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-neutral-400 font-mono mb-1">Número do WhatsApp (Link wa.me)</label>
              <input
                type="text"
                value={whatsappNumber}
                onChange={(e) => setWhatsappNumber(e.target.value)}
                placeholder="+55 11 98765-4321"
                className="w-full px-3.5 py-2.5 bg-neutral-950 border border-neutral-700 rounded-xl text-white font-mono focus:border-amber-500 focus:outline-none"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-neutral-400 font-mono mb-1">
                Mensagem Padrão ao Iniciar WhatsApp
              </label>
              <input
                type="text"
                value={whatsappDefaultMessage}
                onChange={(e) => setWhatsappDefaultMessage(e.target.value)}
                placeholder="Ex: Olá Tony de Luc! Gostaria de tirar dúvidas sobre o curso de cinema."
                className="w-full px-3.5 py-2.5 bg-neutral-950 border border-neutral-700 rounded-xl text-white focus:border-amber-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-neutral-400 font-mono mb-1">Horário de Atendimento</label>
              <input
                type="text"
                value={supportHours}
                onChange={(e) => setSupportHours(e.target.value)}
                placeholder="Segunda a Sexta, das 09h às 19h"
                className="w-full px-3.5 py-2.5 bg-neutral-950 border border-neutral-700 rounded-xl text-white focus:border-amber-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-neutral-400 font-mono mb-1">Prazo de Resposta (SLA)</label>
              <input
                type="text"
                value={supportResponseTime}
                onChange={(e) => setSupportResponseTime(e.target.value)}
                placeholder="Resposta em até 24 horas úteis"
                className="w-full px-3.5 py-2.5 bg-neutral-950 border border-neutral-700 rounded-xl text-white focus:border-amber-500 focus:outline-none"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-neutral-400 font-mono mb-1">Endereço / Sede Institucional (Página de Contato)</label>
              <input
                type="text"
                value={contactAddress}
                onChange={(e) => {
                  setContactAddress(e.target.value);
                  if (!companyAddress) {
                    setCompanyAddress(e.target.value);
                  }
                }}
                placeholder="Rio de Janeiro, RJ • Plataforma Digital Nacional"
                className="w-full px-3.5 py-2.5 bg-neutral-950 border border-neutral-700 rounded-xl text-white focus:border-amber-500 focus:outline-none"
              />
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* SEÇÃO 3: RODAPÉ DO SITE (FOOTER) & IDENTIDADE INSTITUCIONAL                */}
      {/* ========================================================================= */}
      {(subTab === 'all' || subTab === 'footer') && (
        <div className="p-6 rounded-3xl bg-neutral-900 border border-neutral-800 space-y-6">
          <div className="flex items-center gap-3 border-b border-neutral-800 pb-4">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
              <Globe className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold font-display text-white">
                Textos & Selos do Rodapé (Footer)
              </h3>
              <p className="text-xs text-neutral-400">
                Edite os textos descritivos, selos de qualidade, CNPJ e redes sociais que aparecem no rodapé de todas as páginas.
              </p>
            </div>
          </div>

          <div className="space-y-4 text-xs">
            <div>
              <label className="block text-neutral-400 font-mono mb-1">
                Texto de Apresentação Institucional no Rodapé
              </label>
              <textarea
                rows={3}
                value={footerAboutText}
                onChange={(e) => setFooterAboutText(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-neutral-950 border border-neutral-700 rounded-xl text-white leading-relaxed focus:border-amber-500 focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <label className="block text-neutral-400 font-mono mb-1">Selo 1 (Carga Horária)</label>
                <input
                  type="text"
                  value={footerWorkloadBadge}
                  onChange={(e) => setFooterWorkloadBadge(e.target.value)}
                  placeholder="180h Carga Horária"
                  className="w-full px-3.5 py-2.5 bg-neutral-950 border border-neutral-700 rounded-xl text-white focus:border-amber-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-neutral-400 font-mono mb-1">Selo 2 (Chancela da Plataforma)</label>
                <input
                  type="text"
                  value={footerOfficialBadge}
                  onChange={(e) => setFooterOfficialBadge(e.target.value)}
                  placeholder="Plataforma EAD Oficial"
                  className="w-full px-3.5 py-2.5 bg-neutral-950 border border-neutral-700 rounded-xl text-white focus:border-amber-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-neutral-400 font-mono mb-1">CNPJ da Instituição</label>
                <input
                  type="text"
                  value={companyCnpj}
                  onChange={(e) => setCompanyCnpj(e.target.value)}
                  placeholder="48.912.834/0001-02"
                  className="w-full px-3.5 py-2.5 bg-neutral-950 border border-neutral-700 rounded-xl text-white font-mono focus:border-amber-500 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-neutral-400 font-mono mb-1">
                Cidade / Sede Institucional no Rodapé (Endereço)
              </label>
              <input
                type="text"
                value={companyAddress}
                onChange={(e) => setCompanyAddress(e.target.value)}
                placeholder="Rio de Janeiro, RJ • Plataforma Digital Nacional"
                className="w-full px-3.5 py-2.5 bg-neutral-950 border border-neutral-700 rounded-xl text-white focus:border-amber-500 focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-neutral-400 font-mono mb-1">
                  Texto de Direitos Autorais (Copyright)
                </label>
                <input
                  type="text"
                  value={footerCopyright}
                  onChange={(e) => setFooterCopyright(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-neutral-950 border border-neutral-700 rounded-xl text-white focus:border-amber-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-neutral-400 font-mono mb-1">
                  Disclaimer Pedagógico / Legal
                </label>
                <input
                  type="text"
                  value={footerDisclaimer}
                  onChange={(e) => setFooterDisclaimer(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-neutral-950 border border-neutral-700 rounded-xl text-white focus:border-amber-500 focus:outline-none"
                />
              </div>
            </div>

            {/* Redes Sociais no Rodapé */}
            <div className="border-t border-neutral-800 pt-4 space-y-3">
              <span className="text-xs font-bold text-neutral-200 font-mono block">
                Canais & Redes Sociais do CINELAB (Links no Rodapé):
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="text-[10px] text-neutral-400 font-mono block mb-1">Instagram Oficial</label>
                  <input
                    type="text"
                    value={instagramUrl}
                    onChange={(e) => setInstagramUrl(e.target.value)}
                    placeholder="https://instagram.com/cinelab.cinema"
                    className="w-full px-3 py-2 bg-neutral-950 border border-neutral-700 rounded-xl text-white font-mono text-xs focus:border-amber-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-[10px] text-neutral-400 font-mono block mb-1">Canal do YouTube</label>
                  <input
                    type="text"
                    value={youtubeUrl}
                    onChange={(e) => setYoutubeUrl(e.target.value)}
                    placeholder="https://youtube.com/@cinelabcinema"
                    className="w-full px-3 py-2 bg-neutral-950 border border-neutral-700 rounded-xl text-white font-mono text-xs focus:border-amber-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-[10px] text-neutral-400 font-mono block mb-1">Página no Vimeo</label>
                  <input
                    type="text"
                    value={vimeoUrl}
                    onChange={(e) => setVimeoUrl(e.target.value)}
                    placeholder="https://vimeo.com/cinelab"
                    className="w-full px-3 py-2 bg-neutral-950 border border-neutral-700 rounded-xl text-white font-mono text-xs focus:border-amber-500 focus:outline-none"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Bottom Save Bar */}
      <div className="p-4 rounded-2xl bg-neutral-900 border border-amber-500/30 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-xs text-neutral-400 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>As alterações salvas entram no ar imediatamente em todo o CINELAB.</span>
        </div>

        <button
          type="button"
          onClick={handleSaveAll}
          disabled={saving}
          className="w-full sm:w-auto px-8 py-3 bg-amber-500 hover:bg-amber-400 disabled:opacity-50 text-neutral-950 font-bold uppercase rounded-xl text-xs transition-all cursor-pointer flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 font-sans"
        >
          <Save className="w-4 h-4" />
          <span>{saving ? 'Gravando...' : 'Salvar Alterações de Rodapé, Contato e Tony de Luc'}</span>
        </button>
      </div>
    </div>
  );
};
