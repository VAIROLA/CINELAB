import React, { useState, useEffect, useRef } from 'react';
import { api } from '../services/api.js';
import { User, Enrollment, CourseModule, TutorChatMessage } from '../types/index.js';
import { useLanguage } from '../i18n/LanguageContext.js';
import {
  Sparkles,
  Send,
  Bot,
  User as UserIcon,
  BookOpen,
  Film,
  Award,
  Copy,
  Check,
  Volume2,
  VolumeX,
  Trash2,
  Download,
  Lightbulb,
  Clapperboard,
  Camera,
  Scissors,
  Mic,
  FileText,
  HelpCircle,
  ArrowRight,
  RefreshCw,
} from 'lucide-react';

interface TutorIaViewProps {
  user: User | null;
  enrollment?: Enrollment | null;
  modules?: CourseModule[];
  onNavigate: (route: string, params?: any) => void;
  onOpenAuth?: (mode: 'login' | 'register') => void;
}

const DEFAULT_SUGGESTIONS = [
  'Como montar a iluminação clássica de 3 pontos em uma sala comum?',
  'Exemplo de folha de decupagem técnica para uma cena de suspense',
  'Qual a diferença prática entre o Paradigma de Syd Field e a Jornada do Herói?',
  'Quando devo escolher lente 24mm, 50mm ou 85mm para filmar um diálogo?',
  'O que é o Efeito Kuleshov e como aplicar cortes na ação?',
  'Quais são os critérios para emissão do certificado de 120 horas?',
];

const MODULE_OPTIONS = [
  { id: 0, label: 'Geral (Todos os Módulos)', icon: Sparkles },
  { id: 1, label: 'M01: Linguagem & Planos', icon: Camera },
  { id: 2, label: 'M02: História & Análise', icon: Film },
  { id: 3, label: 'M03: Roteiro & Narrativa', icon: FileText },
  { id: 4, label: 'M04: Direção & Atores', icon: Clapperboard },
  { id: 5, label: 'M05: Fotografia & Iluminação', icon: Lightbulb },
  { id: 6, label: 'M06: Som & Trilha Sonora', icon: Mic },
  { id: 7, label: 'M07: Montagem & Edição', icon: Scissors },
  { id: 8, label: 'M08: Produção Executiva', icon: BookOpen },
  { id: 9, label: 'M09: Distribuição & Festivais', icon: Award },
  { id: 10, label: 'M10: Curta-Metragem Final', icon: Clapperboard },
];

export const TutorIaView: React.FC<TutorIaViewProps> = ({
  user,
  enrollment,
  modules = [],
  onNavigate,
  onOpenAuth,
}) => {
  const { t, language } = useLanguage();
  const [selectedModuleId, setSelectedModuleId] = useState<number>(0);
  const [inputMessage, setInputMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [speakingId, setSpeakingId] = useState<string | null>(null);
  const [activeSuggestions, setActiveSuggestions] = useState<string[]>(DEFAULT_SUGGESTIONS);

  const studentName = user?.name ? user.name.split(' ')[0] : 'Futuro Cineasta';

  // Storage key for persistent chat in current session
  const STORAGE_KEY = `cinelab_tutor_chat_${user?.id || 'guest'}`;

  const [messages, setMessages] = useState<TutorChatMessage[]>(() => {
    try {
      const saved = sessionStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // ignore
    }
    return [
      {
        id: 'welcome-msg',
        role: 'model',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        content: `Olá, **${studentName}**! Seja muito bem-vindo ao **CineTutor IA**, seu mentor pedagógico e assistente acadêmico oficial no **CINELAB**.

Estou aqui para tirar qualquer dúvida que você tiver sobre:
- 🎬 **Decupagem Técnica & Direção de Cena** (planos, movimentos, eixos de 180°, mise-en-scène).
- ✍️ **Roteiro & Estrutura Dramática** (Master Scenes, conflito, Syd Field, diálogos com subtexto).
- 💡 **Fotografia & Iluminação** (Key Light, Fill, Backlight, lentes 24mm/50mm/85mm, temperatura de cor).
- 🎙️ **Som Direto & Desenho Sonoro** (Boom, lapela, ruído de sala / room tone, foley).
- ✂️ **Montagem & Pós-Produção** (Efeito Kuleshov, continuidades, corte na ação, color grading).
- 📋 **Produção Executiva & Festivais** (orçamentos, ordens do dia, leis de incentivo, inscrições).
- 🎓 **Regras do Curso CINELAB** (cronograma, avaliações dos 10 módulos e certificado de 120 horas).

Qual dúvida ou projeto você gostaria de discutir hoje? Escolha uma das sugestões abaixo ou digite sua pergunta!`,
      },
    ];
  });

  const chatEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Scroll to bottom on new messages
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  // Save messages to session
  useEffect(() => {
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
    } catch {
      // ignore
    }
  }, [messages, STORAGE_KEY]);

  // Update suggestions based on selected module
  useEffect(() => {
    if (selectedModuleId === 1) {
      setActiveSuggestions([
        'Qual a diferença entre Plano Geral, Plano Conjunto e Plano Médio?',
        'O que é a regra dos 180 graus e como evitar quebra de eixo?',
        'Quais são os principais movimentos de câmera e sua carga emocional?',
      ]);
    } else if (selectedModuleId === 3) {
      setActiveSuggestions([
        'Como formatar cabeçalhos de cena no padrão Master Scenes?',
        'Qual a diferença entre Storyline, Logline, Sinopse e Argumento?',
        'Como construir um Ponto de Virada (Plot Point) impactante no 1º Ato?',
      ]);
    } else if (selectedModuleId === 4) {
      setActiveSuggestions([
        'Como preparar uma folha de decupagem técnica antes da filmagem?',
        'Dicas práticas para ensaiar atores amadores e obter naturalidade',
        'O que compõe a mise-en-scène de uma sequência dramática?',
      ]);
    } else if (selectedModuleId === 5) {
      setActiveSuggestions([
        'Como montar a luz de 3 pontos com refletores simples ou LEDs?',
        'Quando usar lentes grande-angulares (24mm) vs teleobjetivas (85mm)?',
        'Como calibrar o balanço de branco e a temperatura de cor (3200K vs 5600K)?',
      ]);
    } else if (selectedModuleId === 6) {
      setActiveSuggestions([
        'Por que gravar Room Tone (ruído de sala) é obrigatório em toda locação?',
        'Qual a técnica correta de posicionamento do microfone boom?',
        'O que é som diegético e extra-diegético com exemplos no cinema?',
      ]);
    } else if (selectedModuleId === 7) {
      setActiveSuggestions([
        'O que foi o experimento de Lev Kuleshov e sua importância?',
        'Como executar um corte na ação (cutting on action) perfeitamente fluido?',
        'Dicas para organizar a timeline e o fluxo de trabalho de edição',
      ]);
    } else if (selectedModuleId === 8) {
      setActiveSuggestions([
        'Como elaborar uma Ordem do Dia (Call Sheet) completa e sem falhas?',
        'Quais itens não podem faltar em uma planilha orçamentária de curta?',
        'Como funcionam as autorizações de direito de imagem de atores?',
      ]);
    } else if (selectedModuleId === 9) {
      setActiveSuggestions([
        'Quais os primeiros passos para inscrever meu curta no FilmFreeway?',
        'O que deve constar no Press-Kit e no Pitch Deck de um filme independente?',
        'Quais as principais janelas de exibição para um curta autoral?',
      ]);
    } else if (selectedModuleId === 10) {
      setActiveSuggestions([
        'Quais são os requisitos de entrega do Projeto Final de curta?',
        'Como estruturar o cronograma de 1 dia de rodagem para um curta de 3 minutos?',
        'Como funciona a avaliação final e a liberação do certificado de 120 horas?',
      ]);
    } else {
      setActiveSuggestions(DEFAULT_SUGGESTIONS);
    }
  }, [selectedModuleId]);

  const handleSendMessage = async (textToSend?: string) => {
    const text = (textToSend || inputMessage).trim();
    if (!text || loading) return;

    setInputMessage('');
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }

    const userMsg: TutorChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      moduleId: selectedModuleId > 0 ? selectedModuleId : undefined,
    };

    const newHistory = [...messages, userMsg];
    setMessages(newHistory);
    setLoading(true);

    try {
      // Build history payload for API
      const historyPayload = newHistory
        .filter((m) => m.id !== 'welcome-msg')
        .slice(-6)
        .map((m) => ({
          role: m.role === 'user' ? ('user' as const) : ('model' as const),
          content: m.content,
        }));

      const res = await api.askTutor({
        message: text,
        history: historyPayload,
        moduleId: selectedModuleId > 0 ? selectedModuleId : undefined,
        studentName: user?.name || 'Aluno(a)',
        language,
      });

      const tutorMsg: TutorChatMessage = {
        id: `tutor-${Date.now()}`,
        role: 'model',
        content: res.answer,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        moduleId: res.relatedModuleId || selectedModuleId || undefined,
        suggestions: res.suggestions,
      };

      setMessages((prev) => [...prev, tutorMsg]);

      if (res.suggestions && res.suggestions.length > 0) {
        setActiveSuggestions(res.suggestions);
      }
    } catch (err: any) {
      console.error('Erro ao consultar CineTutor IA:', err);
      const errorMsg: TutorChatMessage = {
        id: `err-${Date.now()}`,
        role: 'model',
        content: `Desculpe, ocorreu uma instabilidade momentânea na conexão. Por favor, tente perguntar novamente ou reformular a questão.\n\n*(Dica pedagógica: você também pode consultar a apostila oficial correspondente na aba **Apostilas**).*`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Text-To-Speech using native Web Speech API
  const handleSpeak = (id: string, text: string) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;

    if (speakingId === id) {
      window.speechSynthesis.cancel();
      setSpeakingId(null);
      return;
    }

    window.speechSynthesis.cancel();

    // Strip markdown formatting symbols for clean speech
    const cleanText = text
      .replace(/[#*`_~]/g, '')
      .replace(/>/g, '')
      .replace(/\[(.*?)\]\(.*?\)/g, '$1')
      .trim();

    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = language === 'en' ? 'en-US' : language === 'es' ? 'es-ES' : language === 'fr' ? 'fr-FR' : 'pt-BR';
    utterance.rate = 1.05;

    utterance.onend = () => setSpeakingId(null);
    utterance.onerror = () => setSpeakingId(null);

    setSpeakingId(id);
    window.speechSynthesis.speak(utterance);
  };

  const handleClearChat = () => {
    if (confirm('Deseja limpar todo o histórico desta conversa com o CineTutor?')) {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
      setSpeakingId(null);
      setMessages([
        {
          id: 'welcome-reset',
          role: 'model',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          content: `Histórico reiniciado. Olá, **${studentName}**! Estou pronto para a sua próxima dúvida sobre cinema.`,
        },
      ]);
      try {
        sessionStorage.removeItem(STORAGE_KEY);
      } catch {
        // ignore
      }
    }
  };

  const handleExportNotes = () => {
    const textContent = messages
      .map(
        (m) =>
          `[${m.timestamp}] ${m.role === 'user' ? user?.name || 'Aluno' : 'CineTutor IA (CINELAB)'}:\n${m.content}\n\n----------------------------------------\n`
      )
      .join('\n');

    const header = `========================================================\nCINELAB – CADERNO DE ESTUDOS COM O CINETUTOR IA\nData: ${new Date().toLocaleDateString('pt-BR')} ${new Date().toLocaleTimeString('pt-BR')}\nAluno: ${user?.name || 'Aluno(a)'} | Matrícula: ${enrollment?.enrollmentNumber || 'Visitante'}\n========================================================\n\n`;

    const blob = new Blob([header + textContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Cinelab_Anotacoes_TutorIA_${new Date().toISOString().slice(0, 10)}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  // Helper to format text with simple markdown-like elements
  const renderFormattedContent = (content: string) => {
    const paragraphs = content.split('\n');

    return (
      <div className="space-y-2.5 text-[14px] sm:text-[15px] leading-relaxed">
        {paragraphs.map((line, idx) => {
          const trimmed = line.trim();
          if (!trimmed) {
            return <div key={idx} className="h-1" />;
          }

          // Headers (### or ##)
          if (trimmed.startsWith('### ')) {
            return (
              <h4 key={idx} className="text-amber-300 font-bold text-base mt-3 mb-1 font-display tracking-wide">
                {trimmed.replace('### ', '')}
              </h4>
            );
          }
          if (trimmed.startsWith('## ')) {
            return (
              <h3 key={idx} className="text-white font-extrabold text-lg mt-4 mb-1 font-display border-b border-purple-500/30 pb-1">
                {trimmed.replace('## ', '')}
              </h3>
            );
          }

          // Blockquotes
          if (trimmed.startsWith('> ')) {
            return (
              <blockquote
                key={idx}
                className="pl-3.5 py-1.5 border-l-2 border-amber-400 bg-amber-500/10 rounded-r-lg text-amber-200 text-xs sm:text-sm italic my-2 font-sans"
              >
                {trimmed.replace('> ', '')}
              </blockquote>
            );
          }

          // Bullet points
          if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
            const bulletText = trimmed.substring(2);
            return (
              <div key={idx} className="flex items-start gap-2 pl-2">
                <span className="text-amber-400 text-sm mt-0.5">•</span>
                <span className="flex-1">{renderBoldText(bulletText)}</span>
              </div>
            );
          }

          // Numbered list item
          if (/^\d+\.\s/.test(trimmed)) {
            const num = trimmed.match(/^\d+\./)?.[0];
            const textAfter = trimmed.replace(/^\d+\.\s*/, '');
            return (
              <div key={idx} className="flex items-start gap-2 pl-2">
                <span className="text-amber-400 font-bold font-mono text-xs mt-0.5">{num}</span>
                <span className="flex-1">{renderBoldText(textAfter)}</span>
              </div>
            );
          }

          return <p key={idx}>{renderBoldText(line)}</p>;
        })}
      </div>
    );
  };

  // Helper to parse **bold** and `code` inside lines
  const renderBoldText = (text: string) => {
    const parts = text.split(/(\*\*.*?\*\*|`.*?`)/g);
    return parts.map((part, i) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return (
          <strong key={i} className="text-white font-bold drop-shadow-sm">
            {part.slice(2, -2)}
          </strong>
        );
      }
      if (part.startsWith('`') && part.endsWith('`')) {
        return (
          <code key={i} className="px-1.5 py-0.5 rounded bg-purple-950/80 text-amber-300 font-mono text-xs border border-purple-800/50">
            {part.slice(1, -1)}
          </code>
        );
      }
      return part;
    });
  };

  return (
    <div className="min-h-screen bg-[#0c0d12] text-[#e4e6eb] pb-16">
      {/* Top Hero Banner */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#240849] via-[#15042b] to-[#0c0d12] border-b border-purple-500/30 pt-8 pb-10 px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(168,85,247,0.18),transparent_50%)] pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(245,158,11,0.12),transparent_40%)] pointer-events-none" />

        <div className="max-w-6xl mx-auto relative z-10 space-y-4">
          <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
            <span className="px-3 py-1 rounded-full bg-purple-900/60 border border-purple-400/60 text-purple-200 flex items-center gap-1.5 shadow-[0_0_12px_rgba(168,85,247,0.4)]">
              <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-pulse" /> CineTutor IA Oficial
            </span>
            <span className="px-3 py-1 rounded-full bg-emerald-950/60 border border-emerald-500/50 text-emerald-300 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping inline-block" />
              Online & Disponível 24h
            </span>
            {user?.role === 'student' && (
              <span className="px-3 py-1 rounded-full bg-amber-950/50 border border-amber-500/50 text-amber-300">
                Aluno Matriculado
              </span>
            )}
          </div>

          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-white font-display tracking-tight drop-shadow-md">
                Tire suas Dúvidas com o <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-200 to-purple-300">CineTutor IA</span>
              </h1>
              <p className="text-sm sm:text-base text-purple-200/80 max-w-3xl mt-1 leading-relaxed">
                Diálogo interativo, decupagens de cena, técnicas de iluminação, regras de set, análise dramática e tira-dúvidas de todos os 10 módulos pedagógicos do CINELAB.
              </p>
            </div>

            {/* Quick shortcuts */}
            <div className="flex items-center gap-2 self-start lg:self-center shrink-0">
              <button
                onClick={() => onNavigate('apostilas')}
                className="px-3 py-2 rounded-xl bg-purple-900/40 hover:bg-purple-900/70 border border-purple-400/40 text-xs font-semibold text-purple-200 flex items-center gap-1.5 transition-all cursor-pointer"
                title="Abrir as 10 apostilas didáticas"
              >
                <BookOpen className="w-4 h-4 text-amber-400" />
                <span className="hidden sm:inline">Ver Apostilas</span>
              </button>
              <button
                onClick={() => onNavigate('videos')}
                className="px-3 py-2 rounded-xl bg-purple-900/40 hover:bg-purple-900/70 border border-purple-400/40 text-xs font-semibold text-purple-200 flex items-center gap-1.5 transition-all cursor-pointer"
                title="Acessar as masterclasses em vídeo"
              >
                <Film className="w-4 h-4 text-purple-300" />
                <span className="hidden sm:inline">Vídeos</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Interactive Workspace */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-6 grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Left Column: Filter by Module & Study Tips (1 col) */}
        <aside className="lg:col-span-1 space-y-4">
          {/* Module Selector Card */}
          <div className="p-4 rounded-2xl bg-gradient-to-b from-[#180830] to-[#120524] border border-purple-500/30 shadow-lg space-y-3">
            <div className="flex items-center justify-between text-xs font-mono text-purple-300">
              <span className="font-bold flex items-center gap-1.5">
                <Clapperboard className="w-3.5 h-3.5 text-amber-400" /> Foco da Dúvida
              </span>
              <span className="text-[10px] text-purple-400">Filtrar tema</span>
            </div>

            <p className="text-[11px] text-purple-200/70 leading-snug">
              Selecione um módulo para que o CineTutor foque exatamente na ementa que você está estudando:
            </p>

            <div className="space-y-1 max-h-72 overflow-y-auto pr-1 custom-scrollbar">
              {MODULE_OPTIONS.map((opt) => {
                const IconComp = opt.icon;
                const isSelected = selectedModuleId === opt.id;
                return (
                  <button
                    key={opt.id}
                    onClick={() => setSelectedModuleId(opt.id)}
                    className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-sans transition-all flex items-center gap-2 cursor-pointer ${
                      isSelected
                        ? 'bg-gradient-to-r from-amber-500/20 to-purple-600/30 text-amber-300 border border-amber-400/50 font-bold shadow-[0_0_8px_rgba(245,158,11,0.2)]'
                        : 'text-purple-200/80 hover:bg-purple-950/60 hover:text-white border border-transparent'
                    }`}
                  >
                    <IconComp className={`w-3.5 h-3.5 shrink-0 ${isSelected ? 'text-amber-400' : 'text-purple-400'}`} />
                    <span className="truncate">{opt.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Quick Tools & Study Info */}
          <div className="p-4 rounded-2xl bg-[#140628] border border-purple-500/20 space-y-3 text-xs">
            <h4 className="font-bold text-white flex items-center gap-1.5 font-display">
              <Lightbulb className="w-4 h-4 text-amber-400" /> Como aproveitar melhor:
            </h4>
            <ul className="space-y-2 text-purple-200/80 text-[11px] leading-relaxed">
              <li className="flex items-start gap-1.5">
                <span className="text-amber-400 font-bold">1.</span>
                <span>Peça exemplos práticos de planos (PP, PM, PG) com indicações de lentes.</span>
              </li>
              <li className="flex items-start gap-1.5">
                <span className="text-amber-400 font-bold">2.</span>
                <span>Solicite modelos de decupagem técnica para cenas do seu roteiro autoral.</span>
              </li>
              <li className="flex items-start gap-1.5">
                <span className="text-amber-400 font-bold">3.</span>
                <span>Use o botão de ouvir por voz para escutar a resposta enquanto revisa sua cena!</span>
              </li>
            </ul>

            {/* Conversation Actions */}
            <div className="pt-2 border-t border-purple-900/50 flex flex-col gap-2">
              <button
                onClick={handleExportNotes}
                className="w-full py-2 px-3 rounded-xl bg-purple-900/30 hover:bg-purple-900/60 border border-purple-400/30 text-purple-200 font-semibold text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                title="Baixar todo o diálogo em arquivo de texto"
              >
                <Download className="w-3.5 h-3.5 text-amber-400" />
                <span>Exportar Caderno de Notas</span>
              </button>
              <button
                onClick={handleClearChat}
                className="w-full py-1.5 px-3 rounded-xl text-neutral-400 hover:text-red-400 text-[11px] flex items-center justify-center gap-1 transition-colors cursor-pointer"
              >
                <Trash2 className="w-3 h-3" />
                <span>Limpar Histórico da Conversa</span>
              </button>
            </div>
          </div>
        </aside>

        {/* Right Column: Chat Interface (3 cols) */}
        <main className="lg:col-span-3 flex flex-col rounded-3xl bg-gradient-to-b from-[#150529] via-[#100321] to-[#0d031b] border-2 border-purple-500/40 shadow-[0_8px_40px_rgba(147,51,234,0.25)] overflow-hidden min-h-[620px] max-h-[820px]">
          {/* Chat Window Top Bar */}
          <div className="px-5 py-3.5 bg-gradient-to-r from-[#200742] via-[#2d095c] to-[#200742] border-b border-purple-400/40 flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-amber-500 to-purple-600 flex items-center justify-center text-white shadow-[0_0_15px_rgba(245,158,11,0.5)] border border-amber-300">
                  <Clapperboard className="w-5 h-5 text-white" />
                </div>
                <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-500 border-2 border-[#150529]" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-white text-sm sm:text-base font-display">
                    CineTutor IA
                  </h3>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                    CINELAB
                  </span>
                </div>
                <p className="text-[11px] text-purple-200/70 font-mono">
                  {selectedModuleId > 0
                    ? `Focado no Módulo 0${selectedModuleId}`
                    : 'Visão Geral dos 10 Módulos & Bônus'}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  setSelectedModuleId(0);
                  setActiveSuggestions(DEFAULT_SUGGESTIONS);
                }}
                className="text-[11px] font-mono text-purple-300 hover:text-amber-300 px-2.5 py-1 rounded-lg bg-purple-950/60 border border-purple-800/60 flex items-center gap-1 transition-colors cursor-pointer"
                title="Redefinir para perguntas gerais"
              >
                <RefreshCw className="w-3 h-3" />
                <span className="hidden sm:inline">Sugestões Gerais</span>
              </button>
            </div>
          </div>

          {/* Quick Suggestions Chips Carousel */}
          <div className="px-4 py-2.5 bg-[#17052e]/80 border-b border-purple-500/20 overflow-x-auto custom-scrollbar flex items-center gap-2">
            <span className="text-[10px] font-mono text-purple-300 uppercase tracking-wider shrink-0 flex items-center gap-1 font-bold">
              <Lightbulb className="w-3 h-3 text-amber-400" /> Dúvidas Frequentes:
            </span>
            {activeSuggestions.map((suggestion, sIdx) => (
              <button
                key={sIdx}
                onClick={() => handleSendMessage(suggestion)}
                disabled={loading}
                className="text-[11.5px] px-3 py-1 rounded-full bg-purple-900/40 hover:bg-amber-500/20 text-purple-100 hover:text-amber-200 border border-purple-400/30 hover:border-amber-400/50 shrink-0 transition-all cursor-pointer disabled:opacity-50 whitespace-nowrap active:scale-95"
              >
                {suggestion}
              </button>
            ))}
          </div>

          {/* Messages Scroll Area */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5 custom-scrollbar">
            {messages.map((msg) => {
              const isUser = msg.role === 'user';
              return (
                <div
                  key={msg.id}
                  className={`flex gap-3 sm:gap-4 items-start ${isUser ? 'flex-row-reverse' : 'flex-row'}`}
                >
                  {/* Avatar */}
                  <div
                    className={`w-8 sm:w-9 h-8 sm:h-9 rounded-2xl shrink-0 flex items-center justify-center font-bold text-xs shadow-md ${
                      isUser
                        ? 'bg-gradient-to-br from-amber-500 to-amber-600 text-neutral-950 border border-amber-300'
                        : 'bg-gradient-to-br from-[#5b19a8] to-[#9333ea] text-white border border-purple-400 shadow-[0_0_12px_rgba(168,85,247,0.4)]'
                    }`}
                  >
                    {isUser ? (
                      user?.name ? user.name.charAt(0).toUpperCase() : <UserIcon className="w-4 h-4" />
                    ) : (
                      <Clapperboard className="w-4 h-4 text-amber-300" />
                    )}
                  </div>

                  {/* Message Bubble */}
                  <div
                    className={`flex-1 max-w-[88%] sm:max-w-[82%] rounded-2xl p-4 shadow-md ${
                      isUser
                        ? 'bg-gradient-to-r from-amber-600/90 to-amber-700/90 text-white rounded-tr-none border border-amber-400/40'
                        : 'bg-[#1b0736]/90 border border-purple-500/40 text-purple-100 rounded-tl-none shadow-[0_4px_20px_rgba(0,0,0,0.3)]'
                    }`}
                  >
                    {/* Header info inside bubble */}
                    <div className="flex items-center justify-between gap-2 mb-2 pb-1.5 border-b border-white/10 text-[10.5px] font-mono">
                      <span className="font-bold flex items-center gap-1">
                        {isUser ? (
                          <span>{user?.name ? user.name.split(' ')[0] : 'Você'}</span>
                        ) : (
                          <span className="text-amber-300 flex items-center gap-1 font-sans font-bold">
                            <Sparkles className="w-3 h-3 text-amber-400" /> CineTutor IA
                          </span>
                        )}
                        {msg.moduleId && (
                          <span className="px-1.5 py-0.2 rounded bg-purple-900/60 text-purple-200 border border-purple-700/60 text-[9.5px]">
                            M0{msg.moduleId}
                          </span>
                        )}
                      </span>
                      <span className="text-purple-300/70">{msg.timestamp}</span>
                    </div>

                    {/* Content */}
                    {isUser ? (
                      <p className="text-[14px] sm:text-[15px] leading-relaxed whitespace-pre-wrap">{msg.content}</p>
                    ) : (
                      renderFormattedContent(msg.content)
                    )}

                    {/* Action buttons on bot message */}
                    {!isUser && (
                      <div className="mt-3 pt-2 border-t border-purple-500/20 flex flex-wrap items-center justify-between gap-2 text-xs">
                        <div className="flex items-center gap-1 text-[11px] text-purple-300/80">
                          <button
                            onClick={() => handleCopy(msg.id, msg.content)}
                            className="px-2 py-1 rounded-lg hover:bg-purple-900/50 flex items-center gap-1 text-purple-200 hover:text-white transition-colors cursor-pointer"
                            title="Copiar resposta completa"
                          >
                            {copiedId === msg.id ? (
                              <>
                                <Check className="w-3 h-3 text-emerald-400" />
                                <span className="text-emerald-400">Copiado</span>
                              </>
                            ) : (
                              <>
                                <Copy className="w-3 h-3" />
                                <span>Copiar</span>
                              </>
                            )}
                          </button>

                          <button
                            onClick={() => handleSpeak(msg.id, msg.content)}
                            className="px-2 py-1 rounded-lg hover:bg-purple-900/50 flex items-center gap-1 text-purple-200 hover:text-white transition-colors cursor-pointer"
                            title={speakingId === msg.id ? 'Parar leitura por voz' : 'Ouvir resposta em áudio'}
                          >
                            {speakingId === msg.id ? (
                              <>
                                <VolumeX className="w-3 h-3 text-amber-400 animate-pulse" />
                                <span className="text-amber-400">Parar Áudio</span>
                              </>
                            ) : (
                              <>
                                <Volume2 className="w-3 h-3" />
                                <span>Ouvir Resposta</span>
                              </>
                            )}
                          </button>
                        </div>

                        {/* Direct module deep dive shortcut */}
                        {msg.moduleId && (
                          <button
                            onClick={() => onNavigate('apostilas', { moduleId: msg.moduleId })}
                            className="text-[10px] font-mono text-amber-300 hover:text-white flex items-center gap-1 hover:underline cursor-pointer"
                          >
                            <span>Abrir Apostila M0{msg.moduleId}</span>
                            <ArrowRight className="w-2.5 h-2.5" />
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}

            {/* Typing / Loading animation */}
            {loading && (
              <div className="flex gap-3 sm:gap-4 items-start">
                <div className="w-8 sm:w-9 h-8 sm:h-9 rounded-2xl bg-gradient-to-br from-[#5b19a8] to-[#9333ea] text-white flex items-center justify-center shrink-0 border border-purple-400 shadow-[0_0_12px_rgba(168,85,247,0.4)]">
                  <Clapperboard className="w-4 h-4 text-amber-300 animate-pulse" />
                </div>
                <div className="p-4 rounded-2xl bg-[#1b0736]/90 border border-purple-500/40 rounded-tl-none space-y-2">
                  <div className="flex items-center gap-2 text-xs font-mono text-amber-300">
                    <Sparkles className="w-3.5 h-3.5 animate-spin" />
                    <span>CineTutor pensando e consultando a metodologia de set...</span>
                  </div>
                  <div className="flex items-center gap-1.5 pt-1">
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-2.5 h-2.5 rounded-full bg-purple-400 animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-2.5 h-2.5 rounded-full bg-fuchsia-400 animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              </div>
            )}

            <div ref={chatEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-4 bg-gradient-to-t from-[#110324] to-[#170530] border-t border-purple-500/30">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="flex items-end gap-2 sm:gap-3"
            >
              <div className="flex-1 relative rounded-2xl bg-[#0c0217] border-2 border-purple-500/40 focus-within:border-amber-400/80 focus-within:shadow-[0_0_15px_rgba(245,158,11,0.25)] transition-all">
                <textarea
                  ref={textareaRef}
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder={`Digite sua dúvida sobre cinema, roteiro, decupagem ou Módulo 0${selectedModuleId || 1}...`}
                  rows={2}
                  className="w-full px-4 py-3 bg-transparent text-white placeholder-purple-300/40 text-sm focus:outline-none resize-none custom-scrollbar leading-relaxed"
                />
                <div className="px-3 pb-2 flex items-center justify-between text-[10px] font-mono text-purple-300/60">
                  <span className="hidden sm:inline">Pressione Enter para enviar • Shift+Enter para quebra de linha</span>
                  <span>{inputMessage.length} caracteres</span>
                </div>
              </div>

              <button
                type="submit"
                disabled={!inputMessage.trim() || loading}
                className="h-[60px] px-5 sm:px-6 rounded-2xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 hover:from-amber-400 hover:to-amber-300 text-neutral-950 font-bold font-sans text-sm flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(245,158,11,0.4)] transition-all cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed shrink-0 active:scale-95"
              >
                <span className="hidden sm:inline">Enviar</span>
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </main>
      </div>

      {/* Bottom Academic Pedagogical Support Banner */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
        <div className="p-6 rounded-3xl bg-gradient-to-r from-[#1f063d] via-[#2c0857] to-[#1f063d] border border-purple-500/30 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 shrink-0">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-base font-bold text-white font-display">
                Precisa de auxílio com avaliações ou emissão do certificado?
              </h4>
              <p className="text-xs text-purple-200/80 mt-0.5 max-w-xl">
                Além do CineTutor IA, o aluno conta com correção de questões discursivas pelo Diretor Tony de Luc e acompanhamento contínuo no boletim.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => onNavigate('avaliacoes')}
              className="px-4 py-2 rounded-xl bg-purple-900/60 hover:bg-purple-900 text-purple-100 border border-purple-400/40 text-xs font-semibold transition-all cursor-pointer"
            >
              Ir para Avaliações
            </button>
            <button
              onClick={() => onNavigate('contato')}
              className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-xs transition-all shadow-md cursor-pointer"
            >
              Suporte Acadêmico
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
