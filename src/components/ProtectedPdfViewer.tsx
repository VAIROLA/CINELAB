import React, { useEffect, useRef, useState, useCallback } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  ZoomOut,
  Maximize2,
  Minimize2,
  Shield,
  Loader2,
  AlertCircle,
  FileText,
  Lock,
  Globe,
  Sparkles,
  BookOpen,
  X,
  Languages,
  ArrowRight,
  RefreshCw,
} from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext.js';
import { Language } from '../i18n/translations.js';
import { api } from '../services/api.js';

interface ProtectedPdfViewerProps {
  url: string;
  title: string;
  studentName?: string;
  studentEmail?: string;
  moduleId?: number;
  onFallbackToText?: () => void;
  className?: string;
  allApostilas?: Array<{ id: string; number: number; title: string; moduleId?: number }>;
  onSelectApostila?: (modNum: number) => void;
}

declare global {
  interface Window {
    pdfjsLib?: any;
  }
}

export const ProtectedPdfViewer: React.FC<ProtectedPdfViewerProps> = ({
  url,
  title,
  studentName,
  studentEmail,
  moduleId,
  onFallbackToText,
  className = '',
  allApostilas,
  onSelectApostila,
}) => {
  const { language } = useLanguage();

  // Selected language for in-reader translation (defaults to app language)
  const [readerLang, setReaderLang] = useState<Language>(language);
  // Whether the live translation view is active (defaults to true if app language is not Portuguese)
  const [showTranslation, setShowTranslation] = useState<boolean>(language !== 'pt');
  // Mobile active tab between PDF canvas and translated text
  const [mobileTab, setMobileTab] = useState<'pdf' | 'translation'>('pdf');
  // Text size in translation panel
  const [fontSize, setFontSize] = useState<'sm' | 'base' | 'lg'>('base');

  // Page translation state & cache
  const [translatedText, setTranslatedText] = useState<string>('');
  const [translating, setTranslating] = useState<boolean>(false);
  const [translationError, setTranslationError] = useState<string | null>(null);
  const [pageCache, setPageCache] = useState<Record<string, string>>({});

  // Sync reader language if the user changes app global language
  useEffect(() => {
    setReaderLang(language);
    if (language !== 'pt') {
      setShowTranslation(true);
    }
  }, [language]);

  const tViewer = {
    pt: {
      badge: 'Leitor Protegido',
      sub: 'Download desativado • Visualização exclusiva',
      translateBtn: 'Tradução ao Vivo',
      translateBtnActive: 'Tradução Ativa',
      translateTooltip: 'Ativar / desativar tradução da página em tempo real',
      panelTitle: (p: number, total: number) => `Tradução da Página ${p} de ${total}`,
      translatingTitle: 'Traduzindo página com IA Cinematográfica...',
      translatingSub: 'Adaptando terminologia de planos, decupagem e mise-en-scène',
      syncedBadge: 'Sincronizado com o PDF',
      emptyPage: 'Esta página possui diagramação puramente visual ou ilustrações de planos.',
      fullTextLink: 'Deseja ver a ementa didática estruturada em tópicos?',
      fullTextAction: 'Ver Ementa & Tópicos (Programme & Sujets) →',
      refreshBtn: 'Atualizar Tradução',
      prev: 'Página Anterior',
      next: 'Próxima Página',
      zoomIn: 'Aumentar Zoom',
      zoomOut: 'Diminuir Zoom',
      fit: 'Ajustar',
      fullscreen: 'Tela Cheia',
      exitFullscreen: 'Sair da Tela Cheia',
      loading: 'Carregando leitor seguro da apostila...',
      loadingSub: 'Decodificando páginas e aplicando travas de proteção anti-download',
      mobilePdfTab: 'PDF Original',
      mobileTransTab: 'Texto Traduzido',
    },
    en: {
      badge: 'Protected Reader',
      sub: 'Download disabled • Platform exclusive',
      translateBtn: 'Live Translation',
      translateBtnActive: 'Translation Active',
      translateTooltip: 'Toggle real-time AI page translation panel',
      panelTitle: (p: number, total: number) => `Page ${p} of ${total} Translation`,
      translatingTitle: 'Translating page with Film AI...',
      translatingSub: 'Adapting shot scales, découpage, and cinematic directing terminology',
      syncedBadge: 'Synchronized with PDF',
      emptyPage: 'This page consists of visual diagrams, frame charts, or graphic layouts.',
      fullTextLink: 'Want to view the structured syllabus topics?',
      fullTextAction: 'View Syllabus & Topics (Programme & Sujets) →',
      refreshBtn: 'Refresh Translation',
      prev: 'Previous Page',
      next: 'Next Page',
      zoomIn: 'Zoom In',
      zoomOut: 'Zoom Out',
      fit: 'Fit Width',
      fullscreen: 'Fullscreen',
      exitFullscreen: 'Exit Fullscreen',
      loading: 'Loading protected course reader...',
      loadingSub: 'Decoding pages and applying document security protocols',
      mobilePdfTab: 'Original PDF',
      mobileTransTab: 'Translated Text',
    },
    es: {
      badge: 'Lector Protegido',
      sub: 'Descarga deshabilitada • Exclusivo en plataforma',
      translateBtn: 'Traducción en Vivo',
      translateBtnActive: 'Traducción Activa',
      translateTooltip: 'Activar / desactivar traducción de la página en tiempo real',
      panelTitle: (p: number, total: number) => `Traducción de la Página ${p} de ${total}`,
      translatingTitle: 'Traduciendo página con IA Cinematográfica...',
      translatingSub: 'Adaptando escalas de planos, decupaje y puesta en escena',
      syncedBadge: 'Sincronizado con el PDF',
      emptyPage: 'Esta página contiene diagramas visuales o ilustraciones de encuadres.',
      fullTextLink: '¿Deseas ver el programa estructurado en temas?',
      fullTextAction: 'Ver Programa y Temas (Programme & Sujets) →',
      refreshBtn: 'Actualizar Traducción',
      prev: 'Página Anterior',
      next: 'Próxima Página',
      zoomIn: 'Acercar',
      zoomOut: 'Alejar',
      fit: 'Ajustar',
      fullscreen: 'Pantalla Completa',
      exitFullscreen: 'Salir de Pantalla Completa',
      loading: 'Cargando lector protegido del manual...',
      loadingSub: 'Decodificando páginas y aplicando protocolos de seguridad',
      mobilePdfTab: 'PDF Original',
      mobileTransTab: 'Texto Traducido',
    },
    fr: {
      badge: 'Lecteur Sécurisé',
      sub: 'Téléchargement désactivé • Consultation exclusive',
      translateBtn: 'Traduction en Direct',
      translateBtnActive: 'Traduction Active',
      translateTooltip: 'Activer / désactiver la traduction de la page en temps réel',
      panelTitle: (p: number, total: number) => `Traduction de la Page ${p} sur ${total}`,
      translatingTitle: 'Traduction de la page par IA Cinématographique...',
      translatingSub: 'Adaptation de la terminologie des plans, découpage et mise en scène',
      syncedBadge: 'Synchronisé avec le PDF',
      emptyPage: 'Cette page est principalement visuelle (diagrammes, plans, illustrations).',
      fullTextLink: 'Souhaitez-vous consulter le programme structuré en sujets ?',
      fullTextAction: 'Consulter le Programme & Sujets détaillés →',
      refreshBtn: 'Actualiser la Traduction',
      prev: 'Page Précédente',
      next: 'Page Suivante',
      zoomIn: 'Zoom Avant',
      zoomOut: 'Zoom Arrière',
      fit: 'Ajuster',
      fullscreen: 'Plein Écran',
      exitFullscreen: 'Quitter Plein Écran',
      loading: 'Chargement du lecteur sécurisé...',
      loadingSub: 'Décodage des pages et application des protections',
      mobilePdfTab: 'PDF Original',
      mobileTransTab: 'Texte Traduit',
    },
  }[language] || {
    badge: 'Leitor Protegido',
    sub: 'Download desativado • Visualização exclusiva',
    translateBtn: 'Tradução ao Vivo',
    translateBtnActive: 'Tradução Ativa',
    translateTooltip: 'Ativar / desativar tradução da página em tempo real',
    panelTitle: (p: number, total: number) => `Tradução da Página ${p} de ${total}`,
    translatingTitle: 'Traduzindo página com IA Cinematográfica...',
    translatingSub: 'Adaptando terminologia de planos, decupagem e mise-en-scène',
    syncedBadge: 'Sincronizado com o PDF Original',
    emptyPage: 'Esta página possui diagramação puramente visual ou ilustrações de planos.',
    fullTextLink: 'Prefere ler a apostila completa diagramada em texto corrido e simulado?',
    fullTextAction: 'Abrir Leitura Completa em Texto →',
    prev: 'Página Anterior',
    next: 'Próxima Página',
    zoomIn: 'Aumentar Zoom',
    zoomOut: 'Diminuir Zoom',
    fit: 'Ajustar',
    fullscreen: 'Tela Cheia',
    exitFullscreen: 'Sair da Tela Cheia',
    loading: 'Carregando leitor seguro da apostila...',
    loadingSub: 'Decodificando páginas e aplicando travas de proteção anti-download',
    mobilePdfTab: 'PDF Original',
    mobileTransTab: 'Texto Traduzido',
  };

  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [pdfDoc, setPdfDoc] = useState<any>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [numPages, setNumPages] = useState<number>(0);
  const [scale, setScale] = useState<number>(1.15);
  const [loading, setLoading] = useState<boolean>(true);
  const [pageRendering, setPageRendering] = useState<boolean>(false);
  const [pageNumPending, setPageNumPending] = useState<number | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [jumpPageInput, setJumpPageInput] = useState<string>('1');

  // Load PDF.js if not yet initialized
  const ensurePdfJsLoaded = useCallback(async (): Promise<any> => {
    if (window.pdfjsLib) {
      return window.pdfjsLib;
    }

    return new Promise((resolve, reject) => {
      const existingScript = document.querySelector('script[src*="pdf.min.js"]');
      if (existingScript) {
        let attempts = 0;
        const interval = setInterval(() => {
          attempts++;
          if (window.pdfjsLib) {
            clearInterval(interval);
            resolve(window.pdfjsLib);
          } else if (attempts > 50) {
            clearInterval(interval);
            reject(new Error('Tempo limite para carregar o visualizador PDF excedido.'));
          }
        }, 100);
        return;
      }

      const script = document.createElement('script');
      script.src = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js';
      script.async = true;
      script.onload = () => {
        if (window.pdfjsLib) {
          window.pdfjsLib.GlobalWorkerOptions.workerSrc =
            'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
          resolve(window.pdfjsLib);
        } else {
          reject(new Error('Biblioteca PDF.js não inicializada.'));
        }
      };
      script.onerror = () => reject(new Error('Falha ao baixar biblioteca do leitor de PDF.'));
      document.body.appendChild(script);
    });
  }, []);

  const renderTaskRef = useRef<any>(null);

  // Load PDF document
  useEffect(() => {
    let isMounted = true;
    let currentLoadingTask: any = null;
    setLoading(true);
    setErrorMessage(null);
    setCurrentPage(1);
    setJumpPageInput('1');

    const loadDocument = async () => {
      try {
        const pdfjs = await ensurePdfJsLoaded();
        if (!isMounted) return;

        if (pdfjs.GlobalWorkerOptions && !pdfjs.GlobalWorkerOptions.workerSrc) {
          pdfjs.GlobalWorkerOptions.workerSrc =
            'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
        }

        const origin = typeof window !== 'undefined' ? window.location.origin : '';
        let effectiveUrl = url || '';

        // Auto-heal de URLs corrompidas ou antigas para as 10 apostilas oficiais e bônus
        if (!effectiveUrl || effectiveUrl.includes('1790444') || effectiveUrl.includes('1790684')) {
          if (moduleId && moduleId >= 1 && moduleId <= 10) {
            effectiveUrl = `/materiais/cinelab-apostila-${moduleId < 10 ? '0' + moduleId : moduleId}.pdf`;
          } else if (effectiveUrl.includes('bonus-01') || effectiveUrl.includes('bonus-1')) {
            effectiveUrl = '/materiais/cinelab-bonus-01-glossario-planos.pdf';
          } else if (effectiveUrl.includes('bonus-02') || effectiveUrl.includes('bonus-2')) {
            effectiveUrl = '/materiais/cinelab-bonus-02-glossario-roteiro.pdf';
          } else if (effectiveUrl.includes('bonus-03') || effectiveUrl.includes('bonus-3')) {
            effectiveUrl = '/materiais/cinelab-bonus-03-analise-filmica.pdf';
          } else if (moduleId) {
            effectiveUrl = `/materiais/cinelab-apostila-${moduleId < 10 ? '0' + moduleId : moduleId}.pdf`;
          }
        }

        currentLoadingTask = pdfjs.getDocument({
          url: effectiveUrl,
          cMapUrl: `${origin}/cmaps/`,
          cMapPacked: true,
          standardFontDataUrl: `${origin}/standard_fonts/`,
          withCredentials: false,
        });

        const doc = await currentLoadingTask.promise;
        if (!isMounted) return;

        setPdfDoc(doc);
        setNumPages(doc.numPages);
        setLoading(false);
      } catch (err: any) {
        if (!isMounted) return;
        // Ignore expected unmount and rendering cancellation exceptions
        if (
          err?.name === 'RenderingCancelledException' ||
          err?.name === 'AbortException' ||
          err?.message?.includes('Worker was destroyed') ||
          err?.message?.includes('worker was destroyed')
        ) {
          return;
        }

        console.warn('Alerta ao carregar PDF no canvas:', err?.message || err);

        // Resilient fallback 1: If regular module PDF failed, try canonical materiais PDF
        if (isMounted && moduleId) {
          try {
            const origin = typeof window !== 'undefined' ? window.location.origin : '';
            const canonicalUrl = `/materiais/cinelab-apostila-${moduleId < 10 ? '0' + moduleId : moduleId}.pdf`;
            if (url !== canonicalUrl) {
              const pdfjs = await ensurePdfJsLoaded();
              currentLoadingTask = pdfjs.getDocument({
                url: canonicalUrl,
                cMapUrl: `${origin}/cmaps/`,
                cMapPacked: true,
                standardFontDataUrl: `${origin}/standard_fonts/`,
                withCredentials: false,
              });
              const fallbackDoc = await currentLoadingTask.promise;
              if (isMounted) {
                setPdfDoc(fallbackDoc);
                setNumPages(fallbackDoc.numPages);
                setLoading(false);
                return;
              }
            }
          } catch (fallbackErr) {
            console.warn('Fallback do módulo falhou:', fallbackErr);
          }
        }

        // Resilient fallback 2: If bonus PDF failed, try canonical materiais bonus PDF
        if (isMounted && url && (url.includes('bonus-01') || url.includes('bonus-02') || url.includes('bonus-03') || url.includes('bonus'))) {
          try {
            const origin = typeof window !== 'undefined' ? window.location.origin : '';
            const bonusNum = url.includes('bonus-03') || url.includes('bonus-3') ? 3 : url.includes('bonus-02') || url.includes('bonus-2') ? 2 : 1;
            const canonicalBonusUrl =
              bonusNum === 1
                ? '/materiais/cinelab-bonus-01-glossario-planos.pdf'
                : bonusNum === 2
                ? '/materiais/cinelab-bonus-02-glossario-roteiro.pdf'
                : '/materiais/cinelab-bonus-03-analise-filmica.pdf';

            if (url !== canonicalBonusUrl) {
              const pdfjs = await ensurePdfJsLoaded();
              currentLoadingTask = pdfjs.getDocument({
                url: canonicalBonusUrl,
                cMapUrl: `${origin}/cmaps/`,
                cMapPacked: true,
                standardFontDataUrl: `${origin}/standard_fonts/`,
                withCredentials: false,
              });
              const fallbackDoc = await currentLoadingTask.promise;
              if (isMounted) {
                setPdfDoc(fallbackDoc);
                setNumPages(fallbackDoc.numPages);
                setLoading(false);
                return;
              }
            }
          } catch (fallbackBonusErr) {
            console.warn('Fallback da apostila bônus falhou:', fallbackBonusErr);
          }
        }

        if (isMounted) {
          setLoading(false);
          setErrorMessage(
            'Não foi possível abrir o arquivo PDF diretamente. Você pode acessar a leitura completa em modo texto.'
          );
        }
      }
    };

    loadDocument();

    return () => {
      isMounted = false;
      if (renderTaskRef.current) {
        try {
          renderTaskRef.current.cancel();
        } catch {}
        renderTaskRef.current = null;
      }
      if (currentLoadingTask && typeof currentLoadingTask.destroy === 'function') {
        try { currentLoadingTask.destroy(); } catch {}
      }
    };
  }, [url, moduleId, ensurePdfJsLoaded]);

  // Render specific page on the secure canvas
  const renderPage = useCallback(
    async (pageNumber: number) => {
      if (!pdfDoc || !canvasRef.current) return;

      // Cancel any ongoing render task before starting a new one
      if (renderTaskRef.current) {
        try {
          renderTaskRef.current.cancel();
        } catch {}
        renderTaskRef.current = null;
      }

      setPageRendering(true);

      try {
        const page = await pdfDoc.getPage(pageNumber);
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const pixelRatio = window.devicePixelRatio || 1;
        const viewport = page.getViewport({ scale });

        canvas.width = Math.floor(viewport.width * pixelRatio);
        canvas.height = Math.floor(viewport.height * pixelRatio);
        canvas.style.width = `${Math.floor(viewport.width)}px`;
        canvas.style.height = `${Math.floor(viewport.height)}px`;

        ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);

        const renderContext = {
          canvasContext: ctx,
          viewport: viewport,
        };

        const currentRenderTask = page.render(renderContext);
        renderTaskRef.current = currentRenderTask;
        await currentRenderTask.promise;
        renderTaskRef.current = null;

        setPageRendering(false);

        if (pageNumPending !== null) {
          const next = pageNumPending;
          setPageNumPending(null);
          renderPage(next);
        }
      } catch (err: any) {
        if (err?.name === 'RenderingCancelledException') {
          // Expected when rapidly switching pages or zooming
          return;
        }
        console.error('Erro ao desenhar página no canvas:', err);
        setPageRendering(false);
      }
    },
    [pdfDoc, scale, pageNumPending]
  );

  useEffect(() => {
    if (pdfDoc && !loading) {
      if (pageRendering) {
        setPageNumPending(currentPage);
      } else {
        renderPage(currentPage);
      }
    }
  }, [pdfDoc, currentPage, scale, loading, renderPage]);

  // LIVE PAGE TRANSLATION LOGIC
  const fetchPageTranslation = useCallback(
    async (targetPage: number, targetLang: Language, forceRefresh = false) => {
      if (!pdfDoc) return;

      const cacheKey = `${moduleId || 'm'}_p${targetPage}_${targetLang}`;
      const isStaleLocalCache = (str?: string) => {
        if (!str || str.trim().length === 0) return true;
        if (targetLang !== 'pt' && str.length < 200) return true;
        const lower = str.toLowerCase();
        return (
          lower.includes("l'évolution du septième art") ||
          lower.includes('la chaîne de production') ||
          lower.includes('las etapas de la producción') ||
          lower.includes('shot scale and the grammar') ||
          lower.includes('direction de la photographie et éclairage') ||
          lower.includes('production exécutive et organisation')
        );
      };

      if (!forceRefresh && pageCache[cacheKey] && !isStaleLocalCache(pageCache[cacheKey])) {
        setTranslatedText(pageCache[cacheKey]);
        setTranslating(false);
        setTranslationError(null);
        return;
      }

      setTranslating(true);
      setTranslationError(null);

      try {
        const page = await pdfDoc.getPage(targetPage);
        const textContent = await page.getTextContent();

        let rawText = '';
        let lastY: number | null = null;
        if (textContent && textContent.items) {
          for (const item of textContent.items as any[]) {
            if (!item.str) continue;
            const currentY = item.transform ? item.transform[5] : null;
            const hasEol = Boolean(item.hasEOL);
            if (hasEol || (lastY !== null && currentY !== null && Math.abs(currentY - lastY) > 6)) {
              rawText += '\n';
            } else if (
              rawText &&
              !rawText.endsWith(' ') &&
              !rawText.endsWith('\n') &&
              !item.str.startsWith(' ')
            ) {
              rawText += ' ';
            }
            rawText += item.str;
            if (currentY !== null) lastY = currentY;
          }
        }

        const trimmed = rawText.trim();

        // If target is Portuguese and we have raw extracted text, display directly
        if (targetLang === 'pt' && trimmed.length > 25) {
          setTranslatedText(trimmed);
          setPageCache((prev) => ({ ...prev, [cacheKey]: trimmed }));
          setTranslating(false);
          return;
        }

        // Call backend translation service (with Gemini and pedagogical content fallback)
        const res = await api.translatePage({
          text: trimmed,
          targetLanguage: targetLang,
          moduleId,
          pageNumber: targetPage,
        });

        if (res && res.translatedText && res.translatedText.trim().length > 0) {
          setTranslatedText(res.translatedText);
          setPageCache((prev) => ({ ...prev, [cacheKey]: res.translatedText }));
        } else if (trimmed) {
          setTranslatedText(trimmed);
          setPageCache((prev) => ({ ...prev, [cacheKey]: trimmed }));
        } else {
          const fallbackMsg = tViewer.emptyPage;
          setTranslatedText(fallbackMsg);
          setPageCache((prev) => ({ ...prev, [cacheKey]: fallbackMsg }));
        }
      } catch (err: any) {
        console.error('Falha ao traduzir página:', err);
        setTranslationError('Não foi possível obter a tradução desta página no momento.');
      } finally {
        setTranslating(false);
      }
    },
    [pdfDoc, moduleId, pageCache, tViewer.emptyPage]
  );

  // Trigger translation when page or target language changes (if translation is active)
  useEffect(() => {
    if (pdfDoc && showTranslation && !loading) {
      fetchPageTranslation(currentPage, readerLang);
    }
  }, [pdfDoc, currentPage, readerLang, showTranslation, loading, fetchPageTranslation]);

  // Page navigation helpers
  const goToPrevPage = () => {
    if (currentPage <= 1) return;
    const prev = currentPage - 1;
    setCurrentPage(prev);
    setJumpPageInput(String(prev));
  };

  const goToNextPage = () => {
    if (currentPage >= numPages) return;
    const next = currentPage + 1;
    setCurrentPage(next);
    setJumpPageInput(String(next));
  };

  const handleJumpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = parseInt(jumpPageInput, 10);
    if (!isNaN(parsed) && parsed >= 1 && parsed <= numPages) {
      setCurrentPage(parsed);
    } else {
      setJumpPageInput(String(currentPage));
    }
  };

  // Zoom controls
  const handleZoomIn = () => {
    setScale((prev) => Math.min(2.5, +(prev + 0.15).toFixed(2)));
  };

  const handleZoomOut = () => {
    setScale((prev) => Math.max(0.6, +(prev - 0.15).toFixed(2)));
  };

  const handleFitWidth = () => {
    if (containerRef.current && canvasRef.current) {
      const availableWidth = showTranslation
        ? (containerRef.current.clientWidth / 2) - 48
        : containerRef.current.clientWidth - 48;
      if (availableWidth > 260) {
        const optimalScale = Math.min(2.0, Math.max(0.7, availableWidth / 620));
        setScale(+optimalScale.toFixed(2));
      }
    }
  };

  // Fullscreen toggle
  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen?.().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen?.().catch(() => {});
      setIsFullscreen(false);
    }
  };

  // Security: block print, save shortcuts, and right-click
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && (e.key === 's' || e.key === 'p' || e.key === 'S' || e.key === 'P')) {
        e.preventDefault();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const watermarkText = `CINELAB • Aluno: ${studentName || 'Matriculado'} • Leitura Protegida`;

  return (
    <div
      ref={containerRef}
      onContextMenu={(e) => e.preventDefault()}
      className={`relative flex flex-col h-full w-full bg-[#0b0c10] select-none ${className}`}
    >
      {/* SECURITY & READER CONTROL BAR */}
      <div className="flex flex-wrap items-center justify-between gap-2 px-3 py-2 bg-neutral-900 border-b border-neutral-800 shrink-0 z-20 text-xs font-mono">
        {/* Left: Security Status Badge & Real-Time Translation Toggle */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-amber-500/10 border border-amber-500/30 text-amber-300 font-bold text-[11px]">
            <Shield className="w-3.5 h-3.5 text-amber-400" />
            <span>{tViewer.badge}</span>
          </div>

          {/* Translation Mode Toggle Button (Stay inside reader!) */}
          <button
            onClick={() => {
              const next = !showTranslation;
              setShowTranslation(next);
              if (next && readerLang === 'pt') {
                setReaderLang(language !== 'pt' ? language : 'fr');
              }
              if (next) {
                setMobileTab('translation');
              }
            }}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-sans font-bold transition-all cursor-pointer ${
              showTranslation
                ? 'bg-amber-500 text-neutral-950 shadow ring-1 ring-amber-400'
                : 'bg-neutral-800 hover:bg-neutral-700 text-neutral-300 border border-neutral-700'
            }`}
            title={tViewer.translateTooltip}
          >
            <Globe className="w-3.5 h-3.5 text-current" />
            <span>{showTranslation ? tViewer.translateBtnActive : tViewer.translateBtn}</span>
            {showTranslation && (
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            )}
          </button>

          {/* Reader Language Selector (when translation active) */}
          {showTranslation && (
            <div className="flex items-center bg-neutral-950 rounded-lg p-0.5 border border-neutral-800 text-[10px]">
              {(['fr', 'es', 'en', 'pt'] as Language[]).map((l) => (
                <button
                  key={l}
                  onClick={() => setReaderLang(l)}
                  className={`px-2 py-0.5 rounded font-bold uppercase transition-colors cursor-pointer ${
                    readerLang === l
                      ? 'bg-amber-500 text-neutral-950 shadow-sm'
                      : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  {l}
                </button>
              ))}
            </div>
          )}

          {/* Apostila Switcher Dropdown (Módulos 01 a 10) */}
          {allApostilas && allApostilas.length > 0 && onSelectApostila && (
            <div className="flex items-center gap-1.5 bg-neutral-950 px-2.5 py-1 rounded-lg border border-neutral-800 text-xs">
              <BookOpen className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <select
                value={moduleId || 1}
                onChange={(e) => onSelectApostila(Number(e.target.value))}
                className="bg-transparent text-amber-300 font-bold text-xs focus:outline-none cursor-pointer max-w-[200px] truncate"
                aria-label="Selecionar Apostila"
              >
                {allApostilas.map((a) => {
                  const num = a.number || a.moduleId || 1;
                  return (
                    <option key={a.id || num} value={num} className="bg-neutral-900 text-white">
                      Apostila {num < 10 ? '0' + num : num}: {a.title.replace(/^Apostila\s*\d+\s*[-–:]\s*/i, '').slice(0, 32)}
                    </option>
                  );
                })}
              </select>
            </div>
          )}
        </div>

        {/* Center: Page Navigation Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={goToPrevPage}
            disabled={currentPage <= 1 || loading}
            aria-label={tViewer.prev}
            className="p-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 disabled:opacity-30 disabled:hover:bg-neutral-800 text-neutral-200 transition-colors cursor-pointer"
            title={tViewer.prev}
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <form onSubmit={handleJumpSubmit} className="flex items-center gap-1">
            <input
              type="text"
              value={jumpPageInput}
              onChange={(e) => setJumpPageInput(e.target.value)}
              onBlur={handleJumpSubmit}
              aria-label="Número da página"
              className="w-10 px-1.5 py-1 bg-neutral-950 border border-neutral-700 rounded text-center text-xs text-white font-bold focus:border-amber-400 focus:outline-none"
            />
            <span className="text-neutral-400 text-xs">/ {numPages || '...'}</span>
          </form>

          <button
            onClick={goToNextPage}
            disabled={currentPage >= numPages || loading}
            aria-label={tViewer.next}
            className="p-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 disabled:opacity-30 disabled:hover:bg-neutral-800 text-neutral-200 transition-colors cursor-pointer"
            title={tViewer.next}
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Right: Zoom & Layout Controls */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={handleZoomOut}
            disabled={scale <= 0.6 || loading}
            aria-label={tViewer.zoomOut}
            className="p-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 disabled:opacity-30 text-neutral-200 transition-colors cursor-pointer"
            title={tViewer.zoomOut}
          >
            <ZoomOut className="w-4 h-4" />
          </button>

          <span className="text-[11px] text-neutral-400 w-11 text-center">
            {Math.round(scale * 100)}%
          </span>

          <button
            onClick={handleZoomIn}
            disabled={scale >= 2.5 || loading}
            aria-label={tViewer.zoomIn}
            className="p-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 disabled:opacity-30 text-neutral-200 transition-colors cursor-pointer"
            title={tViewer.zoomIn}
          >
            <ZoomIn className="w-4 h-4" />
          </button>

          <button
            onClick={handleFitWidth}
            disabled={loading}
            className="hidden sm:inline-flex px-2 py-1 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-300 text-[11px] transition-colors cursor-pointer"
            title={tViewer.fit}
          >
            {tViewer.fit}
          </button>

          <button
            onClick={toggleFullscreen}
            aria-label={tViewer.fullscreen}
            className="p-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-200 transition-colors cursor-pointer ml-1"
            title={isFullscreen ? tViewer.exitFullscreen : tViewer.fullscreen}
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* MOBILE SEGMENTED VIEW SWITCHER (When translation active) */}
      {showTranslation && (
        <div className="lg:hidden flex items-center justify-center p-1.5 bg-neutral-950 border-b border-neutral-800 shrink-0">
          <div className="flex items-center bg-neutral-900 rounded-lg p-1 border border-neutral-800 text-xs w-full max-w-xs">
            <button
              onClick={() => setMobileTab('pdf')}
              className={`flex-1 py-1 rounded-md text-center font-bold transition-all cursor-pointer ${
                mobileTab === 'pdf'
                  ? 'bg-amber-500 text-neutral-950 shadow'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              {tViewer.mobilePdfTab}
            </button>
            <button
              onClick={() => setMobileTab('translation')}
              className={`flex-1 py-1 rounded-md text-center font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                mobileTab === 'translation'
                  ? 'bg-amber-500 text-neutral-950 shadow'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              <Globe className="w-3.5 h-3.5" />
              <span>{tViewer.mobileTransTab} ({readerLang.toUpperCase()})</span>
            </button>
          </div>
        </div>
      )}

      {/* MAIN VIEWPORT: SPLIT-SCREEN OR FULL WIDTH */}
      <div className="relative flex-1 overflow-hidden flex flex-col lg:flex-row bg-[#060709]">
        {/* LEFT PANE: SECURED PDF CANVAS */}
        <div
          className={`relative flex-1 overflow-auto p-4 flex items-center justify-center bg-[#07080a] ${
            showTranslation && mobileTab === 'translation' ? 'hidden lg:flex' : 'flex'
          }`}
        >
          {/* Loading State */}
          {loading && (
            <div className="flex flex-col items-center justify-center p-8 text-neutral-400 space-y-3">
              <Loader2 className="w-8 h-8 text-amber-400 animate-spin" />
              <p className="text-sm font-medium text-neutral-200">
                {tViewer.loading}
              </p>
              <p className="text-xs text-neutral-400">
                {tViewer.loadingSub}
              </p>
            </div>
          )}

          {/* Error Fallback */}
          {!loading && errorMessage && (
            <div className="max-w-md p-6 rounded-2xl bg-neutral-900 border border-neutral-800 text-center space-y-4">
              <AlertCircle className="w-10 h-10 text-amber-400 mx-auto" />
              <div>
                <h4 className="text-sm font-bold text-white mb-1">
                  Visualização Indisponível no PDF
                </h4>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  {errorMessage}
                </p>
              </div>
              {onFallbackToText && (
                <button
                  onClick={onFallbackToText}
                  className="w-full py-2.5 bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold rounded-xl text-xs flex items-center justify-center gap-2 cursor-pointer transition-all shadow"
                >
                  <FileText className="w-4 h-4" />
                  <span>{tViewer.fullTextAction}</span>
                </button>
              )}
            </div>
          )}

          {/* The Secured Canvas */}
          <div
            className={`relative shadow-2xl rounded-sm transition-opacity duration-200 ${
              loading || errorMessage ? 'hidden' : 'block'
            }`}
            style={{ maxWidth: '100%' }}
          >
            <canvas
              ref={canvasRef}
              className="block rounded-sm pointer-events-auto bg-white"
            />

            {/* DYNAMIC ANTI-COPY WATERMARK OVERLAY */}
            <div
              className="absolute inset-0 pointer-events-none flex flex-col justify-around overflow-hidden select-none opacity-20"
              style={{
                transform: 'rotate(-25deg) scale(1.15)',
                transformOrigin: 'center center',
              }}
            >
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="text-neutral-900 text-xs sm:text-sm font-black tracking-widest uppercase whitespace-nowrap text-center"
                >
                  {watermarkText}
                </div>
              ))}
            </div>

            {/* Page Rendering Spinner */}
            {pageRendering && (
              <div className="absolute top-3 right-3 p-1.5 rounded-md bg-neutral-950/80 text-amber-400 border border-neutral-800 flex items-center gap-1.5 text-[10px] font-mono shadow">
                <Loader2 className="w-3 h-3 animate-spin" />
                <span>Renderizando...</span>
              </div>
            )}
          </div>
        </div>

        {/* RIGHT PANE: REAL-TIME TRANSLATED PAGE READER (SYNCHRONIZED WITH CURRENT PAGE) */}
        {showTranslation && (
          <div
            className={`flex-1 lg:max-w-[50%] flex flex-col bg-neutral-950 border-t lg:border-t-0 lg:border-l border-neutral-800 overflow-hidden ${
              mobileTab === 'pdf' ? 'hidden lg:flex' : 'flex'
            }`}
          >
            {/* Translation Header Bar */}
            <div className="flex flex-wrap items-center justify-between gap-2 px-4 py-2.5 bg-neutral-900/90 border-b border-neutral-800 shrink-0">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                <h3 className="text-xs sm:text-sm font-bold text-white font-sans">
                  {tViewer.panelTitle(currentPage, numPages || 1)}
                </h3>
              </div>

              {/* Language Selector, Refresh, Font Size & Close */}
              <div className="flex items-center gap-1.5 sm:gap-2">
                {/* Language Switcher Buttons inside Translation Pane */}
                <div className="flex items-center bg-neutral-950 rounded-lg p-0.5 border border-neutral-800 text-[10px] font-mono">
                  {(['fr', 'es', 'en', 'pt'] as Language[]).map((l) => (
                    <button
                      key={l}
                      onClick={() => setReaderLang(l)}
                      className={`px-2 py-0.5 rounded font-bold uppercase transition-colors cursor-pointer ${
                        readerLang === l
                          ? 'bg-amber-500 text-neutral-950 shadow-sm'
                          : 'text-neutral-400 hover:text-white'
                      }`}
                      title={`Traduzir para ${l.toUpperCase()}`}
                    >
                      {l}
                    </button>
                  ))}
                </div>

                {/* Refresh Button */}
                <button
                  onClick={() => fetchPageTranslation(currentPage, readerLang, true)}
                  disabled={translating}
                  className="p-1.5 rounded-lg text-neutral-400 hover:text-amber-300 hover:bg-neutral-800 transition-colors disabled:opacity-50 cursor-pointer"
                  title={tViewer.refreshBtn}
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${translating ? 'animate-spin text-amber-400' : ''}`} />
                </button>

                {/* Font Size Selector */}
                <div className="hidden sm:flex items-center bg-neutral-950 rounded-lg p-0.5 border border-neutral-800 text-[11px] font-mono">
                  <button
                    onClick={() => setFontSize('sm')}
                    className={`px-1.5 py-0.5 rounded ${fontSize === 'sm' ? 'bg-neutral-800 text-amber-300 font-bold' : 'text-neutral-400'}`}
                    title="Texto menor"
                  >
                    A-
                  </button>
                  <button
                    onClick={() => setFontSize('base')}
                    className={`px-1.5 py-0.5 rounded ${fontSize === 'base' ? 'bg-neutral-800 text-amber-300 font-bold' : 'text-neutral-400'}`}
                    title="Texto médio"
                  >
                    A
                  </button>
                  <button
                    onClick={() => setFontSize('lg')}
                    className={`px-1.5 py-0.5 rounded ${fontSize === 'lg' ? 'bg-neutral-800 text-amber-300 font-bold' : 'text-neutral-400'}`}
                    title="Texto ampliado"
                  >
                    A+
                  </button>
                </div>

                <button
                  onClick={() => setShowTranslation(false)}
                  className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors cursor-pointer"
                  title="Ocultar painel de tradução"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Translation Content Scrollable Area */}
            <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-4 text-neutral-200">
              {translating ? (
                <div className="flex flex-col items-center justify-center py-16 text-neutral-400 space-y-3">
                  <Loader2 className="w-7 h-7 text-amber-400 animate-spin" />
                  <p className="text-xs sm:text-sm font-semibold text-white">
                    {tViewer.translatingTitle}
                  </p>
                  <p className="text-[11px] text-neutral-400 text-center max-w-sm">
                    {tViewer.translatingSub}
                  </p>
                </div>
              ) : translationError ? (
                <div className="p-4 rounded-xl bg-red-950/20 border border-red-800/40 text-xs text-red-200 space-y-2">
                  <div className="flex items-center gap-2 font-bold text-red-400">
                    <AlertCircle className="w-4 h-4" />
                    <span>{translationError}</span>
                  </div>
                  <button
                    onClick={() => fetchPageTranslation(currentPage, readerLang, true)}
                    className="px-3 py-1 rounded bg-red-900/40 hover:bg-red-900/60 text-white font-semibold cursor-pointer transition-colors"
                  >
                    Tentar novamente
                  </button>
                </div>
              ) : (
                <div
                  className={`space-y-4 font-sans leading-relaxed text-neutral-200 ${
                    fontSize === 'sm'
                      ? 'text-xs'
                      : fontSize === 'lg'
                      ? 'text-base sm:text-lg'
                      : 'text-xs sm:text-sm'
                  }`}
                >
                  {translatedText ? (
                    translatedText.split('\n\n').map((paragraph, idx) => {
                      const cleanPara = paragraph.trim();
                      if (!cleanPara) return null;

                      // Detect headings or bullet points
                      if (cleanPara.startsWith('#') || (cleanPara.length < 50 && cleanPara.endsWith(':'))) {
                        return (
                          <h4
                            key={idx}
                            className="font-bold text-white font-display text-sm sm:text-base text-amber-300 mt-4 first:mt-0"
                          >
                            {cleanPara.replace(/^#+\s*/, '')}
                          </h4>
                        );
                      }

                      if (cleanPara.startsWith('•') || cleanPara.startsWith('-')) {
                        return (
                          <div key={idx} className="pl-3 border-l-2 border-amber-500/40 py-0.5 text-neutral-300">
                            {cleanPara}
                          </div>
                        );
                      }

                      return (
                        <p key={idx} className="text-neutral-300 whitespace-pre-line">
                          {cleanPara}
                        </p>
                      );
                    })
                  ) : (
                    <p className="text-neutral-400 italic">
                      {tViewer.emptyPage}
                    </p>
                  )}
                </div>
              )}
            </div>

            {/* Translation Footer with Navigation & Full Text Link */}
            <div className="p-3 bg-neutral-900/90 border-t border-neutral-800 text-[11px] text-neutral-400 flex flex-col sm:flex-row sm:items-center justify-between gap-2 shrink-0">
              <div className="flex items-center gap-1.5 text-emerald-400 font-mono text-[10px]">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{tViewer.syncedBadge}</span>
              </div>

              {onFallbackToText && (
                <button
                  onClick={onFallbackToText}
                  className="flex items-center gap-1.5 text-neutral-400 hover:text-amber-300 transition-colors text-left sm:text-right cursor-pointer"
                  title={tViewer.fullTextLink}
                >
                  <BookOpen className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span className="text-[11px]">{tViewer.fullTextAction}</span>
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      {/* FOOTER NOTICE */}
      <div className="px-4 py-1.5 bg-neutral-950 border-t border-neutral-900 flex items-center justify-between text-[10px] font-mono text-neutral-400 shrink-0">
        <span className="truncate max-w-[280px] sm:max-w-md">
          {title}
        </span>
        <span className="flex items-center gap-1 text-amber-400/80">
          <Lock className="w-2.5 h-2.5" /> Protegido por CINELAB Vault
        </span>
      </div>
    </div>
  );
};
