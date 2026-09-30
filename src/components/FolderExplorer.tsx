import React, { useState, useMemo } from 'react';
import { useLanguage } from '../i18n/LanguageContext.js';
import {
  getFolderHierarchy,
  CourseFolderCategory,
  CourseSubFolder,
  CourseFileItem,
} from '../i18n/apostilaContentTranslations.js';
import {
  Folder,
  FolderOpen,
  FileText,
  BookOpen,
  Award,
  Film,
  CheckCircle2,
  Lock,
  Unlock,
  ChevronRight,
  Search,
  ArrowRight,
  ExternalLink,
  SlidersHorizontal,
  FileCheck,
  Eye,
  Layers,
  Sparkles,
  HelpCircle,
} from 'lucide-react';

interface FolderExplorerProps {
  onOpenFile?: (file: CourseFileItem) => void;
  onNavigate?: (route: string, params?: any) => void;
  onOpenApostilaReader?: (moduleId: number) => void;
  onOpenBonusReader?: (bonusId: string) => void;
  onOpenTrainingQuiz?: (moduleId: number) => void;
  onOpenApostila?: (moduleId: number) => void;
  onOpenBonusApostila?: (bonusNum: number) => void;
  onOpenTraining?: (moduleId: number) => void;
  onOpenEvaluation?: (moduleId: number) => void;
  isPaidStudent?: boolean;
  onRequirePayment?: () => void;
}

export const FolderExplorer: React.FC<FolderExplorerProps> = ({
  onOpenFile,
  onNavigate,
  onOpenApostilaReader,
  onOpenBonusReader,
  onOpenTrainingQuiz,
  onOpenApostila,
  onOpenBonusApostila,
  onOpenTraining,
  onOpenEvaluation,
  isPaidStudent,
  onRequirePayment,
}) => {
  const { language } = useLanguage();
  const folderTree = useMemo(() => getFolderHierarchy(language), [language]);

  const [selectedCatId, setSelectedCatId] = useState<string>('cat-apostilas');
  const [selectedSubId, setSelectedSubId] = useState<string>('sub-apostilas-oficiais');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // UI labels per language
  const tExplorer = {
    pt: {
      explorerTitle: 'Explorador de Pastas & Sub-pastas Didáticas',
      explorerSubtitle: 'Navegação em diretório de materiais didáticos, apostilas, avaliações e documentos oficiais.',
      searchPlaceholder: 'Buscar em pastas e sub-pastas...',
      rootFolder: 'Pasta Raiz: CINELAB',
      allFolders: 'Todas as Pastas',
      filesCount: 'itens na sub-pasta',
      openCanvasReader: 'Abrir no Leitor Canvas',
      startTraining: 'Fazer Treinamento',
      openOfficialEval: 'Ir para Avaliação Oficial',
      openResource: 'Acessar Conteúdo',
      statusAvailable: 'Disponível',
      statusLocked: 'Programado no Cronograma',
      noFilesFound: 'Nenhum arquivo correspondente nesta pasta.',
      selectFolderHint: 'Selecione uma pasta ou sub-pasta ao lado para navegar nos arquivos didáticos.',
    },
    en: {
      explorerTitle: 'Didactic Folders & Sub-folders Directory',
      explorerSubtitle: 'Structured file explorer for handouts, assessments, film factsheets, and official credentials.',
      searchPlaceholder: 'Search files across folders & sub-folders...',
      rootFolder: 'Root Directory: CINELAB',
      allFolders: 'All Folders',
      filesCount: 'items in sub-folder',
      openCanvasReader: 'Open in Canvas Reader',
      startTraining: 'Start Training Drill',
      openOfficialEval: 'Go to Official Exam',
      openResource: 'Access Content',
      statusAvailable: 'Available',
      statusLocked: 'Scheduled on Timeline',
      noFilesFound: 'No matching files found in this folder.',
      selectFolderHint: 'Select a folder or sub-folder on the left to browse study materials.',
    },
    es: {
      explorerTitle: 'Explorador de Carpetas y Sub-carpetas Didácticas',
      explorerSubtitle: 'Explorador de archivos para manuales, evaluaciones, fichas de cine y documentos oficiales.',
      searchPlaceholder: 'Buscar en carpetas y sub-carpetas...',
      rootFolder: 'Carpeta Raíz: CINELAB',
      allFolders: 'Todas las Carpetas',
      filesCount: 'elementos en la sub-carpeta',
      openCanvasReader: 'Abrir en Lector Canvas',
      startTraining: 'Realizar Entrenamiento',
      openOfficialEval: 'Ir a Evaluación Oficial',
      openResource: 'Acceder al Contenido',
      statusAvailable: 'Disponible',
      statusLocked: 'Programado en Cronograma',
      noFilesFound: 'No se encontraron archivos en esta carpeta.',
      selectFolderHint: 'Selecciona una carpeta o sub-carpeta a la izquierda para ver los archivos.',
    },
    fr: {
      explorerTitle: 'Explorateur de Dossiers & Sous-dossiers Didactiques',
      explorerSubtitle: 'Répertoire structuré pour fascicules, évaluations, fiches filmiques et documents officiels.',
      searchPlaceholder: 'Rechercher dans les dossiers & sous-dossiers...',
      rootFolder: 'Dossier Racine : CINELAB',
      allFolders: 'Tous les Dossiers',
      filesCount: 'fichiers dans le sous-dossier',
      openCanvasReader: 'Ouvrir dans le Lecteur Canvas',
      startTraining: 'Faire l\'Entraînement',
      openOfficialEval: 'Aller à l\'Épreuve Officielle',
      openResource: 'Consulter la Ressource',
      statusAvailable: 'Disponible',
      statusLocked: 'Programmé au Calendrier',
      noFilesFound: 'Aucun fichier trouvé dans ce dossier.',
      selectFolderHint: 'Sélectionnez un dossier ou sous-dossier pour parcourir les documents.',
    },
  }[language];

  const currentCategory = folderTree.find((c) => c.id === selectedCatId) || folderTree[0];
  const currentSubFolder =
    currentCategory?.subFolders.find((s) => s.id === selectedSubId) || currentCategory?.subFolders[0];

  const filteredFiles = useMemo(() => {
    if (!currentSubFolder) return [];
    if (!searchQuery.trim()) return currentSubFolder.files;
    const q = searchQuery.toLowerCase();
    return currentSubFolder.files.filter(
      (f) =>
        f.name.toLowerCase().includes(q) ||
        f.description.toLowerCase().includes(q) ||
        f.sizeOrPages.toLowerCase().includes(q)
    );
  }, [currentSubFolder, searchQuery]);

  const handleAction = (file: CourseFileItem) => {
    const openApos = onOpenApostilaReader || onOpenApostila;
    if (file.actionParam?.openModuleId && openApos) {
      openApos(file.actionParam.openModuleId);
      return;
    }
    if (file.actionParam?.openBonusId && (onOpenBonusReader || onOpenBonusApostila)) {
      if (onOpenBonusReader) {
        onOpenBonusReader(file.actionParam.openBonusId);
      } else if (onOpenBonusApostila) {
        const bNum = file.actionParam.openBonusId.includes('2') ? 2 : 1;
        onOpenBonusApostila(bNum);
      }
      return;
    }
    const openTrain = onOpenTrainingQuiz || onOpenTraining;
    if (file.actionParam?.openTrainingModal && openTrain) {
      openTrain(file.actionParam.openTrainingModal);
      return;
    }

    if (file.type === 'eval' && !file.id.includes('drill') && file.moduleId && onOpenEvaluation) {
      onOpenEvaluation(file.moduleId);
      return;
    }
    if (file.actionRoute && onNavigate) {
      onNavigate(file.actionRoute, file.actionParam);
      return;
    }
    if (onOpenFile) {
      onOpenFile(file);
    }
  };

  return (
    <div className="w-full bg-[#0d0f17] border border-neutral-800 rounded-3xl overflow-hidden shadow-2xl space-y-0">
      {/* Top Banner & Search */}
      <div className="p-6 bg-gradient-to-r from-neutral-950 via-[#131622] to-neutral-950 border-b border-neutral-800">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-amber-400 text-xs font-mono font-semibold uppercase tracking-wider">
              <Layers className="w-4 h-4" />
              <span>{tExplorer.explorerTitle}</span>
            </div>
            <p className="text-xs text-neutral-300">
              {tExplorer.explorerSubtitle}
            </p>
          </div>

          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={tExplorer.searchPlaceholder}
              className="w-full pl-10 pr-4 py-2 bg-neutral-900 border border-neutral-700/80 rounded-xl text-xs text-white placeholder:text-neutral-500 focus:outline-none focus:border-amber-500 transition-colors"
            />
          </div>
        </div>

        {/* Breadcrumbs */}
        <div className="flex items-center gap-1.5 mt-4 pt-3 border-t border-neutral-800/80 text-[11px] font-mono text-neutral-400 overflow-x-auto scrollbar-none">
          <span className="flex items-center gap-1 text-amber-400">
            <FolderOpen className="w-3.5 h-3.5" />
            <span>{tExplorer.rootFolder}</span>
          </span>
          <ChevronRight className="w-3 h-3 text-neutral-600 shrink-0" />
          <span className="text-neutral-200 font-semibold truncate">{currentCategory?.name}</span>
          <ChevronRight className="w-3 h-3 text-neutral-600 shrink-0" />
          <span className="text-amber-300 font-semibold truncate">{currentSubFolder?.name}</span>
        </div>
      </div>

      {/* Main Two-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[560px]">
        {/* Left Column: Folders & Sub-folders Tree */}
        <div className="lg:col-span-4 bg-neutral-950/70 border-b lg:border-b-0 lg:border-r border-neutral-800 p-4 space-y-4">
          <div className="text-[11px] font-mono font-bold uppercase tracking-wider text-neutral-500 px-2">
            {tExplorer.allFolders}
          </div>

          <div className="space-y-3">
            {folderTree.map((cat) => {
              const isCatActive = cat.id === selectedCatId;
              return (
                <div key={cat.id} className="space-y-1">
                  {/* Category Folder Header */}
                  <button
                    onClick={() => {
                      setSelectedCatId(cat.id);
                      setSelectedSubId(cat.subFolders[0]?.id || '');
                    }}
                    className={`w-full flex items-center justify-between p-2.5 rounded-xl text-xs font-semibold text-left transition-all cursor-pointer ${
                      isCatActive
                        ? 'bg-amber-500/10 text-amber-300 border border-amber-500/30'
                        : 'text-neutral-300 hover:bg-neutral-900 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center gap-2 truncate">
                      {isCatActive ? (
                        <FolderOpen className="w-4 h-4 text-amber-400 shrink-0" />
                      ) : (
                        <Folder className="w-4 h-4 text-neutral-500 shrink-0" />
                      )}
                      <span className="truncate">{cat.name}</span>
                    </div>
                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-neutral-800 text-neutral-400 shrink-0">
                      {cat.subFolders.length}
                    </span>
                  </button>

                  {/* Sub-folders List */}
                  {isCatActive && (
                    <div className="pl-4 space-y-1 border-l-2 border-amber-500/20 ml-3 py-1">
                      {cat.subFolders.map((sub) => {
                        const isSubActive = sub.id === selectedSubId;
                        return (
                          <button
                            key={sub.id}
                            onClick={() => setSelectedSubId(sub.id)}
                            className={`w-full flex items-center justify-between p-2 rounded-lg text-[11px] font-mono text-left transition-all cursor-pointer ${
                              isSubActive
                                ? 'bg-amber-500 text-neutral-950 font-bold shadow-md shadow-amber-500/20'
                                : 'text-neutral-400 hover:bg-neutral-900 hover:text-neutral-200'
                            }`}
                          >
                            <span className="truncate flex items-center gap-1.5">
                              <span className="w-1.5 h-1.5 rounded-full bg-current opacity-60" />
                              <span className="truncate">{sub.name}</span>
                            </span>
                            <span
                              className={`text-[9px] px-1.5 py-0.5 rounded font-bold shrink-0 ${
                                isSubActive
                                  ? 'bg-neutral-950 text-amber-300'
                                  : 'bg-neutral-900 text-neutral-500'
                              }`}
                            >
                              {sub.itemCount}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Files in Selected Sub-folder */}
        <div className="lg:col-span-8 p-6 bg-[#0a0c13] space-y-6">
          {currentSubFolder ? (
            <div className="space-y-4">
              {/* Sub-folder Info Banner */}
              <div className="p-4 rounded-2xl bg-neutral-900/80 border border-neutral-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <FolderOpen className="w-4 h-4 text-amber-400" />
                    <h3 className="text-sm font-bold text-white font-display">
                      {currentSubFolder.name}
                    </h3>
                  </div>
                  <p className="text-xs text-neutral-400">
                    {currentSubFolder.description}
                  </p>
                </div>
                <div className="text-xs font-mono text-amber-400 font-semibold px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 whitespace-nowrap shrink-0 self-start sm:self-auto">
                  {filteredFiles.length} {tExplorer.filesCount}
                </div>
              </div>

              {/* Files List */}
              {filteredFiles.length > 0 ? (
                <div className="space-y-2.5">
                  {filteredFiles.map((file) => {
                    const isAvailable = file.status === 'available';
                    return (
                      <div
                        key={file.id}
                        className="group p-4 rounded-2xl bg-neutral-900/50 hover:bg-neutral-900/90 border border-neutral-800/90 hover:border-amber-500/40 transition-all space-y-2.5"
                      >
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                          <div className="flex items-start gap-3 min-w-0">
                            <div
                              className={`p-2.5 rounded-xl shrink-0 mt-0.5 ${
                                file.type === 'pdf'
                                  ? 'bg-red-500/10 text-red-400'
                                  : file.type === 'eval'
                                  ? 'bg-amber-500/10 text-amber-400'
                                  : file.type === 'video'
                                  ? 'bg-blue-500/10 text-blue-400'
                                  : 'bg-emerald-500/10 text-emerald-400'
                              }`}
                            >
                              {file.type === 'pdf' ? (
                                <FileText className="w-4 h-4" />
                              ) : file.type === 'eval' ? (
                                <FileCheck className="w-4 h-4" />
                              ) : file.type === 'video' ? (
                                <Film className="w-4 h-4" />
                              ) : (
                                <Award className="w-4 h-4" />
                              )}
                            </div>

                            <div className="min-w-0 space-y-1">
                              <h4 className="text-xs sm:text-sm font-bold text-white group-hover:text-amber-300 transition-colors">
                                {file.name}
                              </h4>
                              <p className="text-xs text-neutral-400 leading-relaxed line-clamp-2">
                                {file.description}
                              </p>
                              <div className="flex flex-wrap items-center gap-2 pt-0.5 text-[10px] font-mono text-neutral-400">
                                <span className="px-2 py-0.5 rounded bg-neutral-800 text-neutral-300">
                                  {file.sizeOrPages}
                                </span>
                                <span
                                  className={`px-2 py-0.5 rounded flex items-center gap-1 font-semibold ${
                                    isAvailable
                                      ? 'bg-emerald-950/60 text-emerald-300 border border-emerald-800/60'
                                      : 'bg-neutral-800 text-neutral-400'
                                  }`}
                                >
                                  {isAvailable ? (
                                    <>
                                      <Unlock className="w-3 h-3 text-emerald-400" />
                                      <span>{tExplorer.statusAvailable}</span>
                                    </>
                                  ) : (
                                    <>
                                      <Lock className="w-3 h-3 text-neutral-500" />
                                      <span>{tExplorer.statusLocked}</span>
                                    </>
                                  )}
                                </span>
                              </div>
                            </div>
                          </div>

                          {/* Action Button */}
                          <div className="shrink-0 flex items-center justify-end">
                            <button
                              onClick={() => handleAction(file)}
                              className="px-3.5 py-2 rounded-xl text-xs font-bold font-sans flex items-center gap-1.5 transition-all cursor-pointer bg-neutral-800 hover:bg-amber-500 text-neutral-200 hover:text-neutral-950 shadow"
                            >
                              <span>
                                {file.type === 'pdf'
                                  ? tExplorer.openCanvasReader
                                  : file.type === 'eval' && file.id.includes('drill')
                                  ? tExplorer.startTraining
                                  : file.type === 'eval'
                                  ? tExplorer.openOfficialEval
                                  : tExplorer.openResource}
                              </span>
                              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="py-16 text-center text-neutral-500 font-mono text-xs space-y-2">
                  <Folder className="w-10 h-10 text-neutral-700 mx-auto" />
                  <p>{tExplorer.noFilesFound}</p>
                </div>
              )}
            </div>
          ) : (
            <div className="py-20 text-center text-neutral-500 font-mono text-xs">
              {tExplorer.selectFolderHint}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
