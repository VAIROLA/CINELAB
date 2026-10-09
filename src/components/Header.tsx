import React, { useState } from 'react';
import { Logo } from './Logo.js';
import { User, Enrollment } from '../types/index.js';
import { LanguageSelector, HeaderCountryTranslator } from './LanguageSelector.js';
import { useLanguage } from '../i18n/LanguageContext.js';
import {
  Menu,
  X,
  User as UserIcon,
  Shield,
  GraduationCap,
  Sparkles,
  ChevronDown,
  LogOut,
  FileCheck,
  Film,
  BookOpen,
  Award,
  Clapperboard,
  Globe,
} from 'lucide-react';

interface HeaderProps {
  currentRoute: string;
  onNavigate: (route: string) => void;
  user: User | null;
  enrollment: Enrollment | null;
  onOpenAuth: () => void;
  onLogout: () => void;
  onSwitchDemoRole?: (role: 'guest' | 'student' | 'admin') => void;
  customLogoUrl?: string;
}

export const Header: React.FC<HeaderProps> = ({
  currentRoute,
  onNavigate,
  user,
  enrollment,
  onOpenAuth,
  onLogout,
  onSwitchDemoRole,
  customLogoUrl,
}) => {
  const { t, language } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [demoMenuOpen, setDemoMenuOpen] = useState(false);

  // Reordered navigation items: Todas as pÃ¡ginas principais do portal
  const navItems: Array<{
    label: string;
    route: string;
    icon?: any;
    action?: 'panel' | 'logout';
    highlight?: 'amber' | 'emerald' | 'red';
  }> = [
    { label: t('nav.home', 'InÃ­cio'), route: 'inicio' },
    { label: t('nav.course', 'O Curso'), route: 'curso' },
    { label: t('nav.methodology', 'Metodologia'), route: 'metodologia' },
    { label: t('nav.apostilas', 'Apostilas'), route: 'apostilas', icon: BookOpen },
    { label: t('nav.videos', 'VÃ­deos'), route: 'videos', icon: Film },
    { label: t('nav.cinemateca', 'Cinemateca & Leituras'), route: 'filmes-leituras', icon: BookOpen },
    { label: t('nav.evaluations', 'AvaliaÃ§Ãµes'), route: 'avaliacoes', icon: FileCheck },
    { label: t('nav.tutorIa', 'Tutor IA'), route: 'tutor-ia', icon: Sparkles },
    { label: t('nav.certificate', 'Certificado'), route: 'certificado', icon: Award },
    { label: t('nav.validate', 'Validar'), route: 'validar-certificado' },
    { label: t('nav.faq', 'FAQ'), route: 'faq' },
    { label: t('nav.contact', 'Contato'), route: 'contato' },
    ...(user?.role === 'admin' ? [{ label: 'Painel Admin', route: 'admin', icon: Shield, highlight: 'red' as const }] : []),
  ];

  const handleNav = (route: string, action?: 'panel' | 'logout') => {
    if (action === 'logout') {
      setMobileMenuOpen(false);
      onLogout();
      return;
    }
    if (action === 'panel') {
      setMobileMenuOpen(false);
      if (user?.role === 'admin') {
        onNavigate('admin');
      } else if (user) {
        onNavigate('minha-area');
      } else {
        onOpenAuth();
      }
      return;
    }
    onNavigate(route);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-gradient-to-r from-[#190333] via-[#2a0852] to-[#190333] backdrop-blur-md border-b-2 border-fuchsia-500/80 shadow-[0_6px_35px_rgba(168,85,247,0.45)] transition-all max-w-full">
      {/* Top micro-banner / Faixa Roxo Neon Vibrante + Tradutor e Perfil: Admin & Professor */}
      <div className="bg-gradient-to-r from-[#6b21a8] via-[#a855f7] to-[#7c3aed] px-2 sm:px-6 lg:px-8 py-1 sm:py-1.5 border-b border-fuchsia-300/60 text-[11px] text-white font-mono flex items-center justify-between gap-1.5 sm:gap-3 shadow-[0_2px_22px_rgba(168,85,247,0.65)] relative z-40 max-w-full">
        {/* Sutil reflexo de luz neon */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/20 via-transparent to-black/10 pointer-events-none" />

        <div className="flex items-center gap-1.5 sm:gap-3 shrink-0 relative z-10">
          <span className="inline-flex items-center gap-1 text-white font-extrabold tracking-wide drop-shadow-[0_0_10px_rgba(255,255,255,0.9)] text-[11px] sm:text-xs">
            <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-amber-300 animate-pulse drop-shadow-[0_0_6px_rgba(251,191,36,0.8)]" /> CINELAB
          </span>
          <span className="hidden md:inline text-purple-200/60">|</span>
          <span className="hidden md:inline text-purple-100 font-semibold drop-shadow-sm">
            {t('topbar.tagline', 'FormaÃ§Ã£o Profissional em Cinema e Audiovisual â€¢ DuraÃ§Ã£o 3 Meses')}
          </span>
        </div>

        {/* Acima do lado direito: Professor junto com Admin / Perfil e o Tradutor */}
        <div className="ml-auto flex items-center gap-1 sm:gap-2 shrink-0 relative z-20">
                    {/* BotÃ£o Acesso Direto: ADMIN (Sempre visÃ­vel para acesso imediato ou alternar perfil) */}
          <button
            onClick={() => {
              handleNav('admin');
            }}
            className={`text-[9px] sm:text-[10.5px] px-1.5 sm:px-2.5 py-0.5 sm:py-1 rounded-lg flex items-center gap-1 font-mono font-bold cursor-pointer transition-all active:scale-95 shrink-0 ${
              user?.role === 'admin'
                ? 'bg-red-500 text-white ring-2 ring-red-300 font-extrabold shadow-[0_0_12px_rgba(239,68,68,0.5)]'
                : 'bg-red-950/90 hover:bg-red-900 text-red-200 border border-red-500/70 hover:text-white shadow-sm'
            }`}
            title="Acesso ao Painel Administrativo CINELAB"
          >
            <Shield className={`w-3 h-3 ${user?.role === 'admin' ? 'text-white' : 'text-red-400'} shrink-0`} />
            <span className="uppercase tracking-wider">Admin</span>
          </button>

          {/* BotÃ£o e Acesso Direto: Professor Tony de Luc - Oculto em telas ultra-pequenas (< sm) para eliminar scroll lateral no mobile */}
          <button
            onClick={() => handleNav('tony-de-luc')}
            className={`hidden sm:flex text-[9px] sm:text-[10.5px] px-1.5 sm:px-2.5 py-0.5 sm:py-1 rounded-lg items-center gap-1 font-sans font-bold cursor-pointer transition-all active:scale-95 shadow-[0_0_10px_rgba(245,158,11,0.25)] shrink-0 ${
              currentRoute === 'tony-de-luc' || currentRoute === 'sobre-tony' || currentRoute === 'filmografia'
                ? 'bg-amber-400 text-neutral-950 ring-1 ring-amber-300'
                : 'bg-[#270d4a]/95 hover:bg-[#3b126e] text-amber-300 hover:text-white border border-amber-400/60'
            }`}
            title="PÃ¡gina do Professor Cineasta Tony de Luc (Bio, Feitos & Filmografia)"
          >
            <Clapperboard className="w-3 h-3 text-amber-400 shrink-0" />
            <span className="text-purple-300 font-mono text-[9px]">Professor:</span>
            <span className="font-extrabold uppercase drop-shadow-[0_0_6px_rgba(255,255,255,0.8)] whitespace-nowrap">Tony</span>
            <span className="font-extrabold uppercase drop-shadow-[0_0_6px_rgba(255,255,255,0.8)] whitespace-nowrap hidden md:inline"> de Luc</span>
          </button>

          {/* Perfil & Acessos: Admin Autenticado, Aluno Matriculado ou Visitante */}
          <div className="relative flex items-center shrink-0">
            {user?.role === 'admin' ? (
              /* ADMIN LOGADO: Possui menu exclusivo para coordenar ou testar como Aluno */
              <>
                <button
                  onClick={() => setDemoMenuOpen(!demoMenuOpen)}
                  className="text-[9.5px] sm:text-[11.5px] px-2 sm:px-3 py-0.5 sm:py-1 rounded-lg sm:rounded-xl bg-red-950/90 hover:bg-red-900/90 text-red-100 flex items-center gap-1 sm:gap-1.5 border border-red-500/80 shadow-[0_0_14px_rgba(239,68,68,0.45)] cursor-pointer font-sans transition-all active:scale-95 whitespace-nowrap shrink-0"
                  title="Painel do Professor Tony de Luc & Modos de Teste"
                >
                  <Shield className="w-3 h-3 text-red-300" />
                  <span className="font-extrabold uppercase text-white font-mono text-[9.5px] sm:text-[12px] drop-shadow-[0_0_8px_rgba(255,255,255,0.9)]">
                    Admin
                  </span>
                  <ChevronDown className="w-3 h-3 text-red-200 transition-transform duration-200" />
                </button>

                {demoMenuOpen && (
                  <>
                    <div
                      className="fixed inset-0 z-[99] bg-black/50"
                      onClick={() => setDemoMenuOpen(false)}
                    />
                    <div className="fixed sm:absolute top-12 sm:top-full inset-x-2 sm:inset-auto sm:right-0 mt-1 max-w-sm sm:w-[380px] mx-auto max-h-[85vh] overflow-y-auto bg-[#140428] border-2 border-red-500/80 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.9),0_0_35px_rgba(239,68,68,0.5)] p-3 sm:p-4 z-[100] text-left font-sans backdrop-blur-xl animate-fadeIn custom-scrollbar">
                      <div className="px-2 py-2 border-b border-red-800/60 mb-2 flex items-center justify-between">
                        <div>
                          <span className="text-xs font-mono text-red-200 uppercase tracking-wider font-bold block">
                            Coordenação Acadêmica
                          </span>
                          <span className="text-[11px] text-purple-300/80">Professor Tony de Luc</span>
                        </div>
                        <span className="text-[10px] font-mono text-emerald-300 bg-red-950/90 px-2 py-0.5 rounded-full border border-red-500/50">
                          Autenticado
                        </span>
                      </div>

                      <div className="space-y-2 py-1">
                        {/* OPÇÃO 1: PAINEL ADMIN */}
                        <button
                          onClick={() => {
                            handleNav('admin');
                            setDemoMenuOpen(false);
                          }}
                          className="w-full text-left p-3 rounded-xl flex items-center justify-between cursor-pointer transition-all border bg-red-950/60 border-red-500/80 text-white shadow-[0_0_15px_rgba(239,68,68,0.3)] ring-1 ring-red-400"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-lg bg-red-500/20 border border-red-500/50 flex items-center justify-center shrink-0">
                              <Shield className="w-5 h-5 text-red-400" />
                            </div>
                            <div>
                              <div className="text-sm font-extrabold text-white">Painel Administrativo</div>
                              <p className="text-[11px] text-red-300/80">Gestão de alunos, notas, avaliações e vídeos</p>
                            </div>
                          </div>
                          <span className="text-[10px] font-bold px-2 py-1 rounded bg-red-500/30 text-red-200 border border-red-400/50 font-mono">
                            Abrir →
                          </span>
                        </button>

                        {/* OPÇÃO 2: TESTAR COMO ALUNO */}
                        <button
                          onClick={() => {
                            onSwitchDemoRole?.('student');
                            setDemoMenuOpen(false);
                          }}
                          className="w-full text-left p-3 rounded-xl flex items-center justify-between cursor-pointer transition-all border bg-[#220743]/90 hover:bg-purple-900/60 border-purple-500/40 text-purple-100 hover:text-white"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-lg bg-emerald-500/20 border border-emerald-500/50 flex items-center justify-center shrink-0">
                              <GraduationCap className="w-5 h-5 text-emerald-400" />
                            </div>
                            <div>
                              <div className="text-sm font-extrabold text-white">👁️ Visualizar como Aluno (Teste)</div>
                              <p className="text-[11px] text-emerald-300/80">Inspecione as aulas, apostilas e notas do aluno</p>
                            </div>
                          </div>
                          <span className="text-[11px] text-emerald-300 font-mono font-semibold">Testar →</span>
                        </button>

                        {/* OPÇÃO 3: VOLTAR A VISITANTE */}
                        <button
                          onClick={() => {
                            onSwitchDemoRole?.('guest');
                            setDemoMenuOpen(false);
                          }}
                          className="w-full text-left p-2.5 rounded-xl flex items-center justify-between cursor-pointer transition-all bg-neutral-900/80 hover:bg-neutral-800 border border-neutral-700/60 text-neutral-300 hover:text-white text-xs"
                        >
                          <span className="flex items-center gap-2">
                            <UserIcon className="w-4 h-4 text-neutral-400" />
                            <span>Desconectar e Ver como Visitante</span>
                          </span>
                          <span className="text-[10px] text-neutral-500 font-mono">Sair</span>
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </>
            ) : user ? (
              /* ALUNO LOGADO */
              <button
                onClick={() => handleNav('minha-area')}
                className="text-[9.5px] sm:text-[11.5px] px-2 sm:px-3 py-0.5 sm:py-1 rounded-lg sm:rounded-xl bg-emerald-950/90 hover:bg-emerald-900 text-emerald-200 border border-emerald-500/60 flex items-center gap-1 sm:gap-1.5 font-mono shadow-sm cursor-pointer"
                title="Área do Aluno Matriculado"
              >
                <GraduationCap className="w-3.5 h-3.5 text-emerald-400" />
                <span className="font-bold text-white uppercase text-[9.5px] sm:text-[12px] truncate max-w-[110px]">
                  {user.name.split(' ')[0]}
                </span>
              </button>
            ) : (
              /* VISITANTE PÚBLICO: Sem atalhos fictícios. Exibe botões de Entrar */
              <div className="flex items-center gap-1">
                <button
                  onClick={onOpenAuth}
                  className="text-[9.5px] sm:text-[11.5px] px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-lg bg-purple-950/80 hover:bg-purple-900 text-purple-200 hover:text-white border border-purple-400/50 font-mono font-bold flex items-center gap-1 cursor-pointer transition-all"
                  title="Acessar Área do Aluno com e-mail e senha"
                >
                  <UserIcon className="w-3 h-3 text-purple-300" />
                  <span>Entrar</span>
                </button>
              </div>
            )}
          </div>

          {/* Tradutor no topo do lado direito: no desktop exibe todas as bandeiras; no mobile exibe botÃ£o compacto para abrir menu */}
          <div className="hidden md:flex items-center">
            <HeaderCountryTranslator variant="neon" />
          </div>
          <div className="md:hidden flex items-center shrink-0">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="px-1.5 py-0.5 rounded-lg bg-[#270d4a]/95 hover:bg-[#3d1374] text-white border border-purple-400/50 flex items-center gap-1 text-[10px] font-mono font-bold shadow-sm cursor-pointer"
              title="Mudar idioma do sistema"
            >
              <span className="text-xs">{language === 'pt' ? 'ðŸ‡§ðŸ‡·' : language === 'en' ? 'ðŸ‡ºðŸ‡¸' : language === 'es' ? 'ðŸ‡ªðŸ‡¸' : 'ðŸ‡«ðŸ‡·'}</span>
              <span>{language.toUpperCase()}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Row Principal: Logo CINELAB + Status / Destaques + BotÃµes de AÃ§Ã£o */}
      <div className="max-w-[1600px] mx-auto px-3 sm:px-6 lg:px-8 py-2 sm:py-3.5 md:py-4 flex items-center justify-between gap-2 sm:gap-6 overflow-hidden">
        {/* Brand Logo - CINELAB Oficial */}
        <div className="py-1 shrink-0 flex items-center max-w-[42%] xs:max-w-[46%] sm:max-w-none min-w-0">
          <Logo
            customUrl={customLogoUrl}
            size="header"
            layout="stacked"
            onClick={() => handleNav('inicio')}
          />
        </div>

        {/* Center Tagline / Status Indicator (visÃ­vel em telas mÃ©dias para cima) */}
        <div className="hidden md:flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-950/50 border border-purple-500/30 text-xs text-purple-200 font-mono shadow-[inset_0_0_10px_rgba(168,85,247,0.15)]">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="font-semibold text-purple-100">MatrÃ­culas Abertas</span>
          <span className="text-purple-400">â€¢</span>
          <span className="text-amber-300 font-bold">10 MÃ³dulos + 3 BÃ´nus</span>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
          {user ? (
            <div className="relative">
              <button
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-xl bg-[#1b0433]/90 border border-purple-400/50 hover:border-amber-400/70 shadow-[0_0_12px_rgba(168,85,247,0.3)] transition-colors text-left cursor-pointer"
                id="header-user-menu-btn"
              >
                <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-md bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 text-xs font-bold font-mono">
                  {user.name.charAt(0)}
                </div>
                <div className="hidden sm:block leading-tight">
                  <div className="text-xs font-medium text-white truncate max-w-[120px]">
                    {user.name.split(' ')[0]}
                  </div>
                  <div className="text-[10px] font-mono text-amber-400/90 flex items-center gap-1">
                    {user.role === 'admin' ? (
                      <span className="text-red-400 flex items-center gap-0.5">
                        <Shield className="w-2.5 h-2.5" /> {t('header.coordination')}
                      </span>
                    ) : (
                      <span>{enrollment?.enrollmentNumber || t('header.activeEnrollment')}</span>
                    )}
                  </div>
                </div>
                <ChevronDown className="w-3.5 h-3.5 text-neutral-400" />
              </button>

              {userDropdownOpen && (
                <div className="absolute right-0 top-full mt-2 w-[calc(100vw-24px)] max-w-xs sm:w-80 bg-neutral-900/98 backdrop-blur-md border border-purple-500/50 rounded-2xl shadow-2xl p-3 z-50 text-sm animate-fadeIn">
                  <div className="px-3 py-2 border-b border-neutral-800 mb-1">
                    <p className="text-xs font-bold text-white truncate">{user.name}</p>
                    <p className="text-[11px] text-neutral-400 font-mono truncate">{user.email}</p>
                    {enrollment && (
                      <span className="inline-block mt-1 text-[10px] font-mono px-2 py-0.5 rounded bg-amber-950/60 text-amber-300 border border-amber-800/40">
                        {t('header.registrationBadge')} {enrollment.enrollmentNumber}
                      </span>
                    )}
                  </div>

                  {user.role === 'admin' ? (
                    <>
                      <button
                        onClick={() => {
                          handleNav('admin');
                          setUserDropdownOpen(false);
                        }}
                        className="w-full text-left px-3 py-2 text-xs font-semibold text-red-300 hover:bg-neutral-800 rounded-xl flex items-center gap-2.5 cursor-pointer"
                      >
                        <Shield className="w-4 h-4 text-red-400 shrink-0" />
                        {t('header.adminPanel')}
                      </button>
                      <button
                        onClick={() => {
                          handleNav('tony-de-luc');
                          setUserDropdownOpen(false);
                        }}
                        className="w-full text-left px-3 py-2 text-xs font-semibold text-amber-300 hover:bg-neutral-800 rounded-xl flex items-center gap-2.5 cursor-pointer"
                      >
                        <Clapperboard className="w-4 h-4 text-amber-400 shrink-0" />
                        PÃ¡gina do Professor Tony de Luc
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => {
                          handleNav('minha-area');
                          setUserDropdownOpen(false);
                        }}
                        className="w-full text-left px-3 py-2 text-xs font-semibold text-amber-300 hover:bg-neutral-800 rounded-xl flex items-center gap-2.5 cursor-pointer"
                      >
                        <GraduationCap className="w-4 h-4 text-amber-400 shrink-0" />
                        {t('header.myArea')}
                      </button>
                      <button
                        onClick={() => {
                          handleNav('notas');
                          setUserDropdownOpen(false);
                        }}
                        className="w-full text-left px-3 py-2 text-xs font-semibold text-neutral-300 hover:bg-neutral-800 rounded-xl flex items-center gap-2.5 cursor-pointer"
                      >
                        <FileCheck className="w-4 h-4 text-neutral-400 shrink-0" />
                        {t('header.myGrades')}
                      </button>
                      <button
                        onClick={() => {
                          handleNav('certificado');
                          setUserDropdownOpen(false);
                        }}
                        className="w-full text-left px-3 py-2 text-xs font-semibold text-neutral-300 hover:bg-neutral-800 rounded-xl flex items-center gap-2.5 cursor-pointer"
                      >
                        <Award className="w-4 h-4 text-neutral-400 shrink-0" />
                        {t('header.myCertificate')}
                      </button>
                      <button
                        onClick={() => {
                          handleNav('tony-de-luc');
                          setUserDropdownOpen(false);
                        }}
                        className="w-full text-left px-3 py-2 text-xs font-semibold text-purple-300 hover:bg-neutral-800 rounded-xl flex items-center gap-2.5 cursor-pointer"
                      >
                        <Clapperboard className="w-4 h-4 text-purple-400 shrink-0" />
                        PÃ¡gina do Professor Tony de Luc
                      </button>
                    </>
                  )}

                  {/* Somente Admin pode testar como Aluno */}
                  {user?.role === 'admin' && onSwitchDemoRole && (
                    <div className="border-t border-purple-800/60 my-2 pt-2">
                      <button
                        onClick={() => {
                          onSwitchDemoRole('student');
                          setUserDropdownOpen(false);
                        }}
                        className="w-full text-left px-3 py-2 text-xs rounded-xl flex items-center justify-between font-bold cursor-pointer transition-colors bg-emerald-950/60 hover:bg-emerald-900/60 border border-emerald-500/50 text-emerald-200 hover:text-white"
                      >
                        <span className="flex items-center gap-2.5">
                          <GraduationCap className="w-4 h-4 text-emerald-400" />
                          <span>👁️ Visualizar como Aluno (Teste)</span>
                        </span>
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-500/30 text-emerald-200 font-mono">
                          Testar
                        </span>
                      </button>
                    </div>
                  )}

                  <div className="border-t border-neutral-800 my-1 pt-1">
                    <button
                      onClick={() => {
                        onLogout();
                        setUserDropdownOpen(false);
                      }}
                      className="w-full text-left px-3 py-2 text-xs text-neutral-400 hover:text-red-400 hover:bg-neutral-800 rounded-lg flex items-center gap-2 cursor-pointer"
                    >
                      <LogOut className="w-4 h-4" />
                      {t('header.logout')}
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-1 sm:gap-2 shrink-0">
              <button
                onClick={onOpenAuth}
                className="hidden sm:inline-flex px-2.5 sm:px-3 py-1 sm:py-1.5 text-xs sm:text-sm font-semibold text-purple-100 hover:text-white hover:bg-purple-900/60 border border-purple-400/40 rounded-xl transition-all shadow-[0_0_10px_rgba(168,85,247,0.2)] cursor-pointer whitespace-nowrap"
                id="header-login-btn"
              >
                {t('header.login')}
              </button>
              <button
                onClick={() => handleNav('matricula')}
                className="px-2.5 sm:px-4 py-1.5 text-xs sm:text-sm font-bold uppercase tracking-wider bg-amber-500 hover:bg-amber-400 text-neutral-950 rounded-xl transition-all shadow-md shadow-amber-500/30 active:scale-95 cursor-pointer whitespace-nowrap"
                id="header-matricula-cta"
              >
                <span className="sm:hidden">MatrÃ­cula</span>
                <span className="hidden sm:inline">{t('header.enrollNow')}</span>
              </button>
            </div>
          )}

          {/* Mobile hamburger button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-1.5 sm:p-2 text-purple-200 hover:text-white rounded-xl hover:bg-purple-900/50 lg:hidden cursor-pointer shrink-0"
            aria-label="Abrir menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Ribbon de NavegaÃ§Ã£o Desktop - Todas as PÃ¡ginas Perfeitamente VisÃ­veis Sem Rolagem Lateral */}
      <nav
        aria-label="NavegaÃ§Ã£o Principal do Portal"
        className="hidden lg:block w-full bg-[#120224]/95 border-t border-purple-500/25 px-2 sm:px-4 py-1.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]"
      >
        <div className="max-w-[1600px] mx-auto flex items-center justify-center flex-wrap gap-1 xl:gap-1.5 2xl:gap-2">
          {navItems.map((item) => {
            const isActive =
              currentRoute === item.route ||
              (item.route === 'inicio' && (currentRoute === 'inicio' || currentRoute === 'home'));
            return (
              <button
                key={item.label}
                onClick={() => handleNav(item.route, item.action)}
                className={`px-2.5 2xl:px-3 py-1 rounded-lg transition-all cursor-pointer flex items-center gap-1.5 text-[12.5px] xl:text-[13px] 2xl:text-[14px] whitespace-nowrap ${
                  item.highlight === 'red'
                    ? isActive
                      ? 'text-white bg-red-600 font-extrabold shadow-[0_0_16px_rgba(239,68,68,0.7)] ring-2 ring-red-400'
                      : 'text-red-200 bg-red-950/80 hover:bg-red-900 border border-red-500/70 hover:text-white font-bold'
                    : isActive
                    ? 'text-amber-300 bg-purple-900/95 font-bold shadow-[0_0_14px_rgba(245,158,11,0.35)] ring-1 ring-amber-400/60'
                    : 'text-purple-100 hover:text-white hover:bg-purple-900/60 font-semibold'
                }`}
              >
                {item.icon && <item.icon className="w-3.5 h-3.5 opacity-85 shrink-0" />}
                <span>{item.label}</span>
                {item.route === 'tutor-ia' && (
                  <span className="text-[9px] font-mono px-1 py-0.2 rounded bg-amber-400 text-neutral-950 font-extrabold uppercase shadow-[0_0_8px_rgba(251,191,36,0.6)]">
                    IA
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#180430]/98 border-b-2 border-fuchsia-500/80 px-4 py-4 space-y-4 animate-fadeIn shadow-2xl">
          {/* Mobile Country Translator */}
          <div className="p-3 bg-purple-950/60 rounded-2xl border border-purple-400/40 space-y-2 shadow-inner">
            <span className="text-xs font-mono text-purple-200 block text-center font-bold">
              Tradutor do Sistema â€¢ Clique no PaÃ­s:
            </span>
            <HeaderCountryTranslator stacked variant="neon" className="w-full justify-center" />
          </div>

          {/* Quick Access to Professor & Admin in mobile */}
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => handleNav('tony-de-luc')}
              className="px-3 py-2 rounded-xl bg-amber-500/20 border border-amber-400/50 text-amber-300 flex items-center justify-center gap-2 font-bold text-xs"
            >
              <Clapperboard className="w-4 h-4 text-amber-400" />
              <span>Prof. Tony de Luc</span>
            </button>
            <button
              onClick={() => {
                if (user?.role === 'admin') {
                  handleNav('admin');
                } else if (onSwitchDemoRole) {
                  onSwitchDemoRole('admin');
                  setMobileMenuOpen(false);
                } else {
                  handleNav('admin');
                }
              }}
              className={`px-3 py-2 rounded-xl flex items-center justify-center gap-2 font-bold text-xs cursor-pointer transition-all ${
                user?.role === 'admin'
                  ? 'bg-red-950/90 border border-red-500/80 text-red-200 hover:text-white shadow-[0_0_12px_rgba(239,68,68,0.4)] ring-1 ring-red-400'
                  : 'bg-red-950/70 border border-red-500/60 text-red-300 hover:text-white'
              }`}
            >
              <Shield className="w-4 h-4 text-red-400" />
              <span>{user?.role === 'admin' ? 'Painel Admin' : 'Modo Admin'}</span>
            </button>
          </div>

          {/* Role Switcher in Mobile Drawer */}
          {onSwitchDemoRole && (
            <div className="p-3 bg-purple-950/70 rounded-2xl border border-purple-500/40 space-y-2">
              <span className="text-xs font-mono text-purple-200 block text-center font-bold">
                Alternar Modo de VisualizaÃ§Ã£o:
              </span>
              <div className="grid grid-cols-3 gap-1.5 text-center">
                <button
                  onClick={() => {
                    onSwitchDemoRole('admin');
                    setMobileMenuOpen(false);
                  }}
                  className={`px-2 py-2 rounded-xl text-xs font-bold border transition-colors ${
                    user?.role === 'admin'
                      ? 'bg-red-500/30 text-red-200 border-red-400 shadow-sm'
                      : 'bg-[#220743] text-red-300 border-purple-500/40 hover:bg-purple-900/50'
                  }`}
                >
                  ðŸ›¡ï¸ Admin
                </button>
                <button
                  onClick={() => {
                    onSwitchDemoRole('guest');
                    setMobileMenuOpen(false);
                  }}
                  className={`px-2 py-2 rounded-xl text-xs font-bold border transition-colors ${
                    !user
                      ? 'bg-purple-500/30 text-purple-200 border-purple-400 shadow-sm'
                      : 'bg-[#220743] text-purple-300 border-purple-500/40 hover:bg-purple-900/50'
                  }`}
                >
                  ðŸ‘¤ Visitante
                </button>
                <button
                  onClick={() => {
                    onSwitchDemoRole('student');
                    setMobileMenuOpen(false);
                  }}
                  className={`px-2 py-2 rounded-xl text-xs font-bold border transition-colors ${
                    user && user.role !== 'admin'
                      ? 'bg-emerald-500/30 text-emerald-200 border-emerald-400 shadow-sm'
                      : 'bg-[#220743] text-emerald-300 border-purple-500/40 hover:bg-purple-900/50'
                  }`}
                >
                  ðŸŽ“ Aluno
                </button>
              </div>
            </div>
          )}

          {user && (
            <div className="p-3 bg-neutral-800/60 rounded-xl mb-3 flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-white">{user.name}</p>
                <p className="text-[11px] font-mono text-amber-400">{user.email}</p>
              </div>
              <button
                onClick={() => handleNav(user.role === 'admin' ? 'admin' : 'minha-area')}
                className="px-2.5 py-1 text-xs bg-amber-500 text-neutral-950 font-bold rounded-lg"
              >
                {user.role === 'admin' ? t('header.adminRole') : t('header.panel')}
              </button>
            </div>
          )}

          {/* Standard Navigation items */}
          <div className="grid grid-cols-2 gap-1.5">
            {navItems.map((item) => {
              const isActive =
                currentRoute === item.route ||
                (item.route === 'inicio' && (currentRoute === 'inicio' || currentRoute === 'home'));
              return (
                <button
                  key={item.label}
                  onClick={() => handleNav(item.route, item.action)}
                  className={`text-left px-3 py-2 text-xs rounded-lg flex items-center gap-2 cursor-pointer ${
                    item.highlight === 'red'
                      ? isActive
                        ? 'bg-red-600 text-white font-bold ring-1 ring-red-400'
                        : 'bg-red-950/80 border border-red-500/60 text-red-200 hover:text-white font-bold'
                      : isActive
                      ? 'bg-amber-500/20 text-amber-400 font-bold'
                      : 'text-neutral-300 hover:bg-neutral-800'
                  }`}
                >
                  {item.icon && <item.icon className="w-3.5 h-3.5" />}
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>

          {!user && (
            <div className="pt-2 border-t border-neutral-800 flex flex-col gap-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAuth();
                }}
                className="w-full py-2.5 text-xs font-medium text-neutral-200 bg-neutral-800 rounded-xl text-center cursor-pointer"
              >
                {t('header.alreadyStudentLogin')}
              </button>
              <button
                onClick={() => handleNav('matricula')}
                className="w-full py-2.5 text-xs font-bold uppercase tracking-wider bg-amber-500 text-neutral-950 rounded-xl text-center shadow-lg shadow-amber-500/20"
              >
                {t('header.enrollNow')}
              </button>
            </div>
          )}
        </div>
      )}
    </header>
  );
};
