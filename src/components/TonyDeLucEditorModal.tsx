import React, { useState, useRef } from 'react';
import {
  X,
  Upload,
  Camera,
  CheckCircle2,
  Loader2,
  Save,
  User,
  FileText,
  Award,
  BookOpen,
  Sparkles,
  Plus,
  Trash2,
  Instagram,
  Linkedin,
  Youtube,
  Film,
  PlayCircle,
  Play,
  Video,
  ExternalLink,
  Eye,
  EyeOff,
} from 'lucide-react';
import { TonyProfileData, persistTonyPhoto } from '../services/tonyPersistence.js';
import { FilmographyWork } from '../types/index.js';
import { parseVideoEmbed } from '../utils/videoUtils.js';

interface TonyDeLucEditorModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialData: TonyProfileData;
  onSave: (updated: TonyProfileData) => Promise<void>;
}

export const TonyDeLucEditorModal: React.FC<TonyDeLucEditorModalProps> = ({
  isOpen,
  onClose,
  initialData,
  onSave,
}) => {
  const [activeTab, setActiveTab] = useState<'perfil' | 'bio' | 'feitos' | 'curriculo' | 'filmografia'>('perfil');

  // Form states
  const [tonyName, setTonyName] = useState(initialData.tonyName || 'Professor Cineasta Tony de Luc');
  const [tonyRole, setTonyRole] = useState(
    initialData.tonyRole || 'Cineasta, Diretor de Fotografia, Produtor, Ator, Jornalista & Fundador do CINELAB'
  );
  const [tonyPhotoUrl, setTonyPhotoUrl] = useState(initialData.tonyPhotoUrl || '/images/tony-de-luc.jpg');
  const [tonyTagline, setTonyTagline] = useState(initialData.tonyTagline || '');
  const [tonyBioShort, setTonyBioShort] = useState(initialData.tonyBioShort || '');
  const [tonyBioFull, setTonyBioFull] = useState(initialData.tonyBioFull || '');
  const [tonyFeitos, setTonyFeitos] = useState<string[]>(initialData.tonyFeitos || []);
  const [tonyCurriculo, setTonyCurriculo] = useState<string[]>(initialData.tonyCurriculo || []);
  const [tonyFilmografia, setTonyFilmografia] = useState<FilmographyWork[]>(initialData.tonyFilmografia || []);
  const [previewFilmIdx, setPreviewFilmIdx] = useState<number | null>(null);
  const [tonySocialInstagram, setTonySocialInstagram] = useState(initialData.tonySocialInstagram || '');
  const [tonySocialLinkedin, setTonySocialLinkedin] = useState(initialData.tonySocialLinkedin || '');
  const [tonySocialYoutube, setTonySocialYoutube] = useState(initialData.tonySocialYoutube || '');

  // Upload states
  const [isUploadingPhoto, setIsUploadingPhoto] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  if (!isOpen) return null;

  const handlePhotoFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsUploadingPhoto(true);
      const persistentUrl = await persistTonyPhoto(file);
      setTonyPhotoUrl(persistentUrl);
    } catch (err: any) {
      alert('Erro ao enviar foto: ' + (err.message || err));
    } finally {
      setIsUploadingPhoto(false);
    }
  };

  const handleAddFilm = () => {
    setTonyFilmografia((prev) => [
      ...prev,
      {
        title: 'Nova Produção Audiovisual',
        year: String(new Date().getFullYear()),
        role: 'Direção & Roteiro',
        type: 'Curta-Metragem',
        details: '',
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
    try {
      setIsSaving(true);
      const updatedProfile: TonyProfileData = {
        tonyName,
        tonyRole,
        tonyPhotoUrl,
        tonyTagline,
        tonyBioShort,
        tonyBioFull,
        tonyFeitos,
        tonyCurriculo,
        tonyFilmografia,
        tonySocialInstagram,
        tonySocialLinkedin,
        tonySocialYoutube,
        welcomeVideoUrl: initialData.welcomeVideoUrl,
        welcomeVideoPoster: initialData.welcomeVideoPoster,
        welcomeMessageTitle: initialData.welcomeMessageTitle,
        welcomeMessageText: initialData.welcomeMessageText,
      };

      await onSave(updatedProfile);
      setSaveSuccess(true);
      setTimeout(() => {
        setSaveSuccess(false);
        onClose();
      }, 1200);
    } catch (err: any) {
      alert('Erro ao salvar alterações: ' + (err.message || err));
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-[#0e1014] border border-neutral-800 rounded-2xl shadow-2xl overflow-hidden my-8 max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-800/80 bg-[#12141a]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <Camera className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-white font-display">
                Editar Perfil, Apresentação & Trajetória — Tony de Luc
              </h2>
              <p className="text-xs text-neutral-400 font-mono">
                As alterações são salvas permanentemente no banco de dados e no navegador.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tabs Bar */}
        <div className="flex border-b border-neutral-800 bg-[#0c0d10] px-6 gap-2 overflow-x-auto text-xs font-mono">
          <button
            onClick={() => setActiveTab('perfil')}
            className={`py-3 px-4 border-b-2 font-medium flex items-center gap-2 cursor-pointer transition-colors whitespace-nowrap ${
              activeTab === 'perfil'
                ? 'border-amber-500 text-amber-400 bg-amber-500/5'
                : 'border-transparent text-neutral-400 hover:text-neutral-200'
            }`}
          >
            <User className="w-4 h-4" />
            <span>Foto & Apresentação</span>
          </button>

          <button
            onClick={() => setActiveTab('bio')}
            className={`py-3 px-4 border-b-2 font-medium flex items-center gap-2 cursor-pointer transition-colors whitespace-nowrap ${
              activeTab === 'bio'
                ? 'border-amber-500 text-amber-400 bg-amber-500/5'
                : 'border-transparent text-neutral-400 hover:text-neutral-200'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>Biografia & Trajetória em Set</span>
          </button>

          <button
            onClick={() => setActiveTab('feitos')}
            className={`py-3 px-4 border-b-2 font-medium flex items-center gap-2 cursor-pointer transition-colors whitespace-nowrap ${
              activeTab === 'feitos'
                ? 'border-amber-500 text-amber-400 bg-amber-500/5'
                : 'border-transparent text-neutral-400 hover:text-neutral-200'
            }`}
          >
            <Award className="w-4 h-4" />
            <span>Grandes Feitos & Conquistas</span>
          </button>

          <button
            onClick={() => setActiveTab('curriculo')}
            className={`py-3 px-4 border-b-2 font-medium flex items-center gap-2 cursor-pointer transition-colors whitespace-nowrap ${
              activeTab === 'curriculo'
                ? 'border-amber-500 text-amber-400 bg-amber-500/5'
                : 'border-transparent text-neutral-400 hover:text-neutral-200'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Currículo & Redes</span>
          </button>

          <button
            onClick={() => setActiveTab('filmografia')}
            className={`py-3 px-4 border-b-2 font-medium flex items-center gap-2 cursor-pointer transition-colors whitespace-nowrap ${
              activeTab === 'filmografia'
                ? 'border-amber-500 text-amber-400 bg-amber-500/5'
                : 'border-transparent text-neutral-400 hover:text-neutral-200'
            }`}
          >
            <Film className="w-4 h-4 text-amber-400" />
            <span>Filmografia & Filmes ({tonyFilmografia.length})</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 text-sm">
          {/* TAB 1: Foto & Apresentação */}
          {activeTab === 'perfil' && (
            <div className="space-y-6">
              {/* Photo Upload Card */}
              <div className="p-5 rounded-2xl bg-neutral-900/90 border border-neutral-800 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-400 flex items-center gap-2">
                    <Camera className="w-4 h-4" /> Foto Oficial de Tony de Luc
                  </span>
                  <span className="text-[11px] font-mono text-neutral-400">Armazenamento Permanente</span>
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-6">
                  {/* Image Preview */}
                  <div className="relative w-32 h-40 sm:w-36 sm:h-44 rounded-2xl overflow-hidden border-2 border-amber-500/50 bg-black shrink-0 shadow-lg group">
                    {tonyPhotoUrl ? (
                      <img
                        src={tonyPhotoUrl}
                        alt="Tony de Luc"
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover object-top"
                      />
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center text-neutral-500">
                        <Camera className="w-8 h-8 mb-2" />
                        <span className="text-[10px]">Sem foto</span>
                      </div>
                    )}
                    {isUploadingPhoto && (
                      <div className="absolute inset-0 bg-black/75 flex flex-col items-center justify-center text-amber-400 text-xs gap-2">
                        <Loader2 className="w-6 h-6 animate-spin" />
                        <span>Enviando...</span>
                      </div>
                    )}
                  </div>

                  {/* Upload Controls */}
                  <div className="flex-1 space-y-3 w-full">
                    <p className="text-xs text-neutral-300 leading-relaxed">
                      Carregue o retrato oficial do Diretor Tony de Luc diretamente do seu computador ou celular. A foto será salva permanentemente na pasta oficial do sistema e sincronizada com o banco de dados.
                    </p>

                    <div className="flex flex-wrap items-center gap-3">
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        disabled={isUploadingPhoto}
                        className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-xs flex items-center gap-2 shadow-lg shadow-amber-500/20 cursor-pointer transition-all active:scale-95"
                      >
                        {isUploadingPhoto ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            <span>Gravando Arquivo...</span>
                          </>
                        ) : (
                          <>
                            <Upload className="w-4 h-4" />
                            <span>Selecionar Foto do Computador</span>
                          </>
                        )}
                      </button>

                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handlePhotoFileChange}
                        className="hidden"
                      />

                      {tonyPhotoUrl && (
                        <span className="text-xs text-emerald-400 font-mono flex items-center gap-1.5 bg-emerald-950/40 border border-emerald-800/60 px-3 py-1.5 rounded-lg">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Foto Ativa: {tonyPhotoUrl.startsWith('data:') ? 'Imagem carregada' : tonyPhotoUrl}</span>
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Name & Role Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-mono font-semibold text-neutral-300 uppercase">
                    Nome de Apresentação
                  </label>
                  <input
                    type="text"
                    value={tonyName}
                    onChange={(e) => setTonyName(e.target.value)}
                    placeholder="Ex: Professor Cineasta Tony de Luc"
                    className="w-full px-4 py-2.5 rounded-xl bg-neutral-900 border border-neutral-800 focus:border-amber-500 focus:outline-none text-white text-sm"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-mono font-semibold text-neutral-300 uppercase">
                    Apresentação & Perfil (Cargos e Titulações)
                  </label>
                  <input
                    type="text"
                    value={tonyRole}
                    onChange={(e) => setTonyRole(e.target.value)}
                    placeholder="Ex: Cineasta, Diretor de Fotografia, Produtor, Ator, Jornalista & Fundador do CINELAB"
                    className="w-full px-4 py-2.5 rounded-xl bg-neutral-900 border border-neutral-800 focus:border-amber-500 focus:outline-none text-white text-sm"
                  />
                </div>
              </div>

              {/* Tagline Field */}
              <div className="space-y-1.5">
                <label className="text-xs font-mono font-semibold text-neutral-300 uppercase">
                  Frase de Destaque / Manifesto Cinematográfico
                </label>
                <textarea
                  rows={2}
                  value={tonyTagline}
                  onChange={(e) => setTonyTagline(e.target.value)}
                  placeholder="Ex: O cinema não é apenas técnica ou equipamento; é a arte soberana de imprimir a verdade humana em cada enquadramento..."
                  className="w-full px-4 py-2.5 rounded-xl bg-neutral-900 border border-neutral-800 focus:border-amber-500 focus:outline-none text-white text-sm leading-relaxed"
                />
              </div>

              {/* Minibiografia */}
              <div className="space-y-1.5">
                <label className="text-xs font-mono font-semibold text-neutral-300 uppercase">
                  Apresentação & Perfil (Resumo Rápido)
                </label>
                <textarea
                  rows={3}
                  value={tonyBioShort}
                  onChange={(e) => setTonyBioShort(e.target.value)}
                  placeholder="Resumo de apresentação visível no topo da página..."
                  className="w-full px-4 py-2.5 rounded-xl bg-neutral-900 border border-neutral-800 focus:border-amber-500 focus:outline-none text-white text-sm leading-relaxed"
                />
              </div>
            </div>
          )}

          {/* TAB 2: Biografia & Trajetória */}
          {activeTab === 'bio' && (
            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-mono font-semibold text-neutral-300 uppercase flex items-center justify-between">
                  <span>Biografia Completa & Trajetória em Set de Filmagem</span>
                  <span className="text-neutral-500 font-normal">Quebras de linha são preservadas</span>
                </label>
                <textarea
                  rows={14}
                  value={tonyBioFull}
                  onChange={(e) => setTonyBioFull(e.target.value)}
                  placeholder="Escreva detalhadamente a trajetória em set de filmagem, festivais, direções de fotografia, produções e realizações de Tony de Luc..."
                  className="w-full px-4 py-3 rounded-xl bg-neutral-900 border border-neutral-800 focus:border-amber-500 focus:outline-none text-white text-sm leading-relaxed font-sans"
                />
              </div>
            </div>
          )}

          {/* TAB 3: Feitos & Conquistas */}
          {activeTab === 'feitos' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-white">Grandes Feitos & Conquistas</h3>
                  <p className="text-xs text-neutral-400">
                    Destaques da carreira, festivais e participações de relevância histórica.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setTonyFeitos([...tonyFeitos, 'Novo feito profissional de Tony de Luc'])}
                  className="px-3 py-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-amber-400 text-xs font-mono flex items-center gap-1.5 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Adicionar Feito</span>
                </button>
              </div>

              <div className="space-y-3">
                {tonyFeitos.map((feito, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-xl bg-neutral-900 border border-neutral-800 space-y-2 relative group"
                  >
                    <div className="flex items-center justify-between text-xs font-mono text-amber-400">
                      <span>Destaque #{String(idx + 1).padStart(2, '0')}</span>
                      {tonyFeitos.length > 1 && (
                        <button
                          type="button"
                          onClick={() => setTonyFeitos(tonyFeitos.filter((_, i) => i !== idx))}
                          className="text-neutral-500 hover:text-red-400 cursor-pointer p-1"
                          title="Excluir este feito"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                    <textarea
                      rows={2}
                      value={feito}
                      onChange={(e) => {
                        const copy = [...tonyFeitos];
                        copy[idx] = e.target.value;
                        setTonyFeitos(copy);
                      }}
                      className="w-full px-3 py-2 rounded-lg bg-neutral-950 border border-neutral-800 focus:border-amber-500 focus:outline-none text-white text-xs leading-relaxed"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: Currículo & Redes */}
          {activeTab === 'curriculo' && (
            <div className="space-y-6">
              {/* Currículo list */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-white">Currículo & Formação Acadêmica</h3>
                  <button
                    type="button"
                    onClick={() => setTonyCurriculo([...tonyCurriculo, 'Nova credencial / especialização'])}
                    className="px-3 py-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-amber-400 text-xs font-mono flex items-center gap-1.5 cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Adicionar Item</span>
                  </button>
                </div>

                <div className="space-y-2">
                  {tonyCurriculo.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <span className="w-6 text-center text-xs font-mono text-amber-400 font-bold">
                        {idx + 1}.
                      </span>
                      <input
                        type="text"
                        value={item}
                        onChange={(e) => {
                          const copy = [...tonyCurriculo];
                          copy[idx] = e.target.value;
                          setTonyCurriculo(copy);
                        }}
                        className="flex-1 px-3 py-2 rounded-lg bg-neutral-900 border border-neutral-800 focus:border-amber-500 focus:outline-none text-white text-xs"
                      />
                      {tonyCurriculo.length > 1 && (
                        <button
                          type="button"
                          onClick={() => setTonyCurriculo(tonyCurriculo.filter((_, i) => i !== idx))}
                          className="text-neutral-500 hover:text-red-400 p-1.5"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Redes Sociais */}
              <div className="pt-4 border-t border-neutral-800 space-y-4">
                <h3 className="text-sm font-bold text-white">Canais Oficiais & Redes Sociais</h3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono text-neutral-400 flex items-center gap-1.5">
                      <Instagram className="w-3.5 h-3.5 text-pink-400" /> Instagram
                    </label>
                    <input
                      type="url"
                      value={tonySocialInstagram}
                      onChange={(e) => setTonySocialInstagram(e.target.value)}
                      placeholder="https://instagram.com/tonydeluc"
                      className="w-full px-3 py-2 rounded-lg bg-neutral-900 border border-neutral-800 focus:border-amber-500 text-white text-xs"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-mono text-neutral-400 flex items-center gap-1.5">
                      <Linkedin className="w-3.5 h-3.5 text-sky-400" /> LinkedIn
                    </label>
                    <input
                      type="url"
                      value={tonySocialLinkedin}
                      onChange={(e) => setTonySocialLinkedin(e.target.value)}
                      placeholder="https://linkedin.com/in/tonydeluc-cinema"
                      className="w-full px-3 py-2 rounded-lg bg-neutral-900 border border-neutral-800 focus:border-amber-500 text-white text-xs"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-mono text-neutral-400 flex items-center gap-1.5">
                      <Youtube className="w-3.5 h-3.5 text-red-500" /> YouTube
                    </label>
                    <input
                      type="url"
                      value={tonySocialYoutube}
                      onChange={(e) => setTonySocialYoutube(e.target.value)}
                      placeholder="https://youtube.com/@TVDIVERSIDADE"
                      className="w-full px-3 py-2 rounded-lg bg-neutral-900 border border-neutral-800 focus:border-amber-500 text-white text-xs"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: FILMOGRAFIA & LINKS DOS FILMES */}
          {activeTab === 'filmografia' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="flex items-center justify-between pb-4 border-b border-neutral-800">
                <div>
                  <h3 className="text-sm font-bold text-white font-display flex items-center gap-2">
                    <Film className="w-4 h-4 text-amber-400" /> Filmografia Selecionada & Vídeos dos Filmes
                  </h3>
                  <p className="text-xs text-neutral-400">
                    Cadastre suas obras cinematográficas e adicione o link do YouTube ou Vimeo para que os alunos possam assistir a cada filme diretamente na sua página.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleAddFilm}
                  className="px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-xs flex items-center gap-1.5 cursor-pointer transition-colors shadow-sm"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Adicionar Obra</span>
                </button>
              </div>

              {tonyFilmografia.length === 0 ? (
                <div className="p-8 text-center rounded-2xl bg-neutral-900/50 border border-dashed border-neutral-800 space-y-3">
                  <Film className="w-10 h-10 text-neutral-600 mx-auto" />
                  <p className="text-sm text-neutral-400">Nenhuma obra cadastrada ainda.</p>
                  <button
                    type="button"
                    onClick={handleAddFilm}
                    className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-neutral-950 rounded-xl text-xs font-bold inline-flex items-center gap-1.5 cursor-pointer"
                  >
                    <Plus className="w-4 h-4" /> Adicionar Primeiro Filme
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {tonyFilmografia.map((work, idx) => (
                    <div
                      key={idx}
                      className="p-4 sm:p-5 rounded-2xl bg-neutral-900/80 border border-neutral-800 space-y-3.5 hover:border-neutral-700 transition-colors"
                    >
                      <div className="flex items-center justify-between border-b border-neutral-800 pb-2.5">
                        <span className="text-xs font-mono font-bold text-amber-400 flex items-center gap-2">
                          <span className="w-5 h-5 rounded-full bg-amber-500/10 text-amber-400 flex items-center justify-center text-[10px]">
                            {idx + 1}
                          </span>
                          <span>{work.title || 'Nova Obra Sem Título'}</span>
                        </span>
                        <button
                          type="button"
                          onClick={() => handleRemoveFilm(idx)}
                          className="p-1.5 text-neutral-500 hover:text-red-400 hover:bg-red-950/30 rounded-lg transition-colors cursor-pointer"
                          title="Excluir obra"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
                        <div className="sm:col-span-5">
                          <label className="text-[10px] text-neutral-400 font-mono block mb-1">Título do Filme</label>
                          <input
                            type="text"
                            value={work.title}
                            onChange={(e) => handleUpdateFilm(idx, 'title', e.target.value)}
                            placeholder="Ex: EXPRESSO TERMINAL"
                            className="w-full px-3 py-2 bg-neutral-950 border border-neutral-800 rounded-lg text-xs text-white focus:border-amber-500 focus:outline-none"
                          />
                        </div>

                        <div className="sm:col-span-2">
                          <label className="text-[10px] text-neutral-400 font-mono block mb-1">Ano</label>
                          <input
                            type="text"
                            value={work.year}
                            onChange={(e) => handleUpdateFilm(idx, 'year', e.target.value)}
                            placeholder="2024"
                            className="w-full px-3 py-2 bg-neutral-950 border border-neutral-800 rounded-lg text-xs text-white font-mono focus:border-amber-500 focus:outline-none"
                          />
                        </div>

                        <div className="sm:col-span-5">
                          <label className="text-[10px] text-neutral-400 font-mono block mb-1">Função / Papel</label>
                          <input
                            type="text"
                            value={work.role}
                            onChange={(e) => handleUpdateFilm(idx, 'role', e.target.value)}
                            placeholder="Direção & Roteiro"
                            className="w-full px-3 py-2 bg-neutral-950 border border-neutral-800 rounded-lg text-xs text-white focus:border-amber-500 focus:outline-none"
                          />
                        </div>

                        <div className="sm:col-span-4">
                          <label className="text-[10px] text-neutral-400 font-mono block mb-1">Formato / Categoria</label>
                          <input
                            type="text"
                            value={work.type}
                            onChange={(e) => handleUpdateFilm(idx, 'type', e.target.value)}
                            placeholder="Curta-Metragem - SUSPENSE"
                            className="w-full px-3 py-2 bg-neutral-950 border border-neutral-800 rounded-lg text-xs text-white focus:border-amber-500 focus:outline-none"
                          />
                        </div>

                        <div className="sm:col-span-8">
                          <label className="text-[10px] text-neutral-400 font-mono block mb-1">Detalhes, Prêmios & Festivais</label>
                          <input
                            type="text"
                            value={work.details}
                            onChange={(e) => handleUpdateFilm(idx, 'details', e.target.value)}
                            placeholder="Prêmios, mostras, sinopse ou menções honrosas"
                            className="w-full px-3 py-2 bg-neutral-950 border border-neutral-800 rounded-lg text-xs text-white focus:border-amber-500 focus:outline-none"
                          />
                        </div>

                        {/* Link do Filme no YouTube ou Vimeo */}
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
                                >
                                  {previewFilmIdx === idx ? (
                                    <>
                                      <EyeOff className="w-3 h-3" />
                                      <span>Fechar Player</span>
                                    </>
                                  ) : (
                                    <>
                                      <Eye className="w-3 h-3" />
                                      <span>Testar Player</span>
                                    </>
                                  )}
                                </button>

                                <a
                                  href={work.videoUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="px-2 py-0.5 rounded bg-neutral-800 hover:bg-neutral-700 text-neutral-300 hover:text-white text-[10px] font-mono flex items-center gap-1 transition-colors border border-neutral-700"
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
                              placeholder="Cole o link do YouTube ou Vimeo (Ex: https://www.youtube.com/watch?v=... ou https://vimeo.com/...)"
                              className="w-full pl-9 pr-4 py-2 bg-neutral-950 border border-neutral-800 rounded-lg text-xs text-white placeholder-neutral-500 focus:border-amber-500 focus:outline-none font-mono"
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

                          {/* Quick Player Preview */}
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
              )}
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-neutral-800/80 bg-[#12141a]">
          <span className="text-xs text-neutral-400 font-mono hidden sm:inline">
            Salva permanentemente no servidor e no seu navegador
          </span>

          <div className="flex items-center gap-3 ml-auto">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-300 text-xs font-mono cursor-pointer transition-colors"
            >
              Cancelar
            </button>

            <button
              type="button"
              onClick={handleSaveAll}
              disabled={isSaving}
              className="px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-xs flex items-center gap-2 shadow-lg shadow-amber-500/20 cursor-pointer transition-all active:scale-95"
            >
              {isSaving ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Salvando Permanentemente...</span>
                </>
              ) : saveSuccess ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-neutral-950" />
                  <span>Salvo com Sucesso!</span>
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  <span>Salvar Permanentemente</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
