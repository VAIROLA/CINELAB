/**
 * CINELAB – Cinema & Audiovisual
 * Plataforma Educacional EAD Completa e Profissional
 */

import React, { useState, useEffect } from 'react';
import { api, getAuthToken, setAuthToken, removeAuthToken } from './services/api.js';
import { User, Enrollment, CourseSettings, CourseModule } from './types/index.js';
import { Header } from './components/Header.js';
import { Footer } from './components/Footer.js';
import { AuthModal } from './components/AuthModal.js';
import { Shield, Lock } from 'lucide-react';

// Views
import { HomeView } from './views/HomeView.js';
import { CourseView } from './views/CourseView.js';
import { MethodologyView } from './views/MethodologyView.js';
import { EnrollmentView } from './views/EnrollmentView.js';
import { StudentAreaView } from './views/StudentAreaView.js';
import { ApostilasView } from './views/ApostilasView.js';
import { VideosView } from './views/VideosView.js';
import { ActivitiesView } from './views/ActivitiesView.js';
import { EvaluationsView } from './views/EvaluationsView.js';
import { GradesView } from './views/GradesView.js';
import { CertificateView } from './views/CertificateView.js';
import { CertificateValidationView } from './views/CertificateValidationView.js';
import { ModuleDetailView } from './views/ModuleDetailView.js';
import { FilmsAndReadingsView } from './views/FilmsAndReadingsView.js';
import { TonyDeLucView } from './views/TonyDeLucView.js';
import { AdminView } from './views/AdminView.js';
import { FaqView } from './views/FaqView.js';
import { ContactView } from './views/ContactView.js';
import { TutorIaView } from './views/TutorIaView.js';

export default function App() {
  const [currentRoute, setCurrentRoute] = useState<string>('inicio');
  const [routeParams, setRouteParams] = useState<any>({});
  const [user, setUser] = useState<User | null>(null);
  const [enrollment, setEnrollment] = useState<Enrollment | null>(null);
  const [courseSettings, setCourseSettings] = useState<CourseSettings | null>(null);
  const [courseModules, setCourseModules] = useState<CourseModule[]>([]);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState<'login' | 'register'>('login');
  const [loadingInitialAuth, setLoadingInitialAuth] = useState(true);

  // Check persistent session and load course info on mount
  useEffect(() => {
    checkCurrentUser();
    loadCourseInfo();
  }, []);

  // Track visitor navigation
  useEffect(() => {
    const titles: Record<string, string> = {
      inicio: 'Página Inicial – CINELAB',
      home: 'Página Inicial – CINELAB',
      curso: 'O Curso & Metodologia',
      metodologia: 'Metodologia de Ensino',
      'tony-de-luc': 'Sobre Tony de Luc – Direção, Feitos & Currículo',
      'sobre-tony': 'Sobre Tony de Luc – Direção, Feitos & Currículo',
      'filmografia': 'Filmografia do Diretor Tony de Luc – CINELAB',
      'filmografia-diretor': 'Filmografia do Diretor Tony de Luc – CINELAB',
      'filmografia-tony': 'Filmografia do Diretor Tony de Luc – CINELAB',
      matricula: 'Inscrição & Matrícula Online',
      apostilas: 'Apostilas Digitais Exclusivas',
      videos: 'Masterclasses em Vídeo',
      atividades: 'Atividades Práticas',
      avaliacoes: 'Avaliações de Etapas',
      notas: 'Boletim & Notas',
      certificado: 'Certificado Profissional',
      'tutor-ia': 'CineTutor IA – Mentor de Cinema & Audiovisual',
      tutor: 'CineTutor IA – Mentor de Cinema & Audiovisual',
      'ia-tutor': 'CineTutor IA – Mentor de Cinema & Audiovisual',
      cinetutor: 'CineTutor IA – Mentor de Cinema & Audiovisual',
      admin: 'Painel de Gestão Acadêmica',
      contato: 'Fale Conosco',
      faq: 'Perguntas Frequentes',
    };
    api
      .trackVisit({
        pagePath: '/' + (currentRoute === 'inicio' ? '' : currentRoute),
        pageTitle: titles[currentRoute] || currentRoute,
        referrer: typeof document !== 'undefined' ? document.referrer || 'Acesso Direto' : 'Acesso Direto',
        isInterestedInEnrollment: currentRoute === 'matricula' || currentRoute === 'curso',
      })
      .catch(() => {});
  }, [currentRoute]);

  const loadCourseInfo = async () => {
    try {
      const data = await api.getPublicCourseInfo();
      if (data.settings) setCourseSettings(data.settings);
      if (data.modules) setCourseModules(data.modules);
    } catch (err) {
      console.error('Falha ao carregar informações públicas do curso:', err);
    }
  };

  const checkCurrentUser = async () => {
    try {
      setLoadingInitialAuth(true);
      const token = getAuthToken();

      // Por padrão e por segurança absoluta:
      // Qualquer visitante ou pessoa externa que receba o link entra estritamente como VISITANTE (guest)
      if (!token) {
        setUser(null);
        setEnrollment(null);
        return;
      }

      // Se há token de autenticação prévia salva, valida com a API
      try {
        const res = await api.getCurrentUser();
        if (res?.user) {
          setUser(res.user);
          if (res.enrollment) setEnrollment(res.enrollment);
        } else {
          setUser(null);
          setEnrollment(null);
          removeAuthToken();
        }
      } catch {
        setUser(null);
        setEnrollment(null);
        removeAuthToken();
      }
    } catch {
      setUser(null);
      setEnrollment(null);
    } finally {
      setLoadingInitialAuth(false);
    }
  };

  const navigateTo = (route: string, params: any = {}) => {
    const normalizedRoute = route === 'home' || !route ? 'inicio' : route;
    setCurrentRoute(normalizedRoute);
    setRouteParams(params);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenAuth = (mode: 'login' | 'register') => {
    setAuthModalMode(mode);
    setAuthModalOpen(true);
  };

  const handleAuthSuccess = (authenticatedUser: User, authEnrollment?: Enrollment) => {
    setUser(authenticatedUser);
    if (authEnrollment) {
      setEnrollment(authEnrollment);
    } else {
      // Re-fetch enrollment to guarantee state
      checkCurrentUser();
    }
    setAuthModalOpen(false);

    if (authenticatedUser.role === 'admin') {
      navigateTo('admin');
    } else {
      navigateTo('minha-area');
    }
  };

  const handleLogout = async () => {
    try {
      await api.logout();
    } catch (err) {
      console.error(err);
    }
    removeAuthToken();
    if (typeof window !== 'undefined') {
      localStorage.removeItem('cinelab_active_role');
    }
    setUser(null);
    setEnrollment(null);
    navigateTo('inicio');
  };

  const handleRestoreAdminSession = () => {
    if (typeof window !== 'undefined') {
      const savedAdminToken = localStorage.getItem('cinelab_admin_saved_token');
      if (savedAdminToken) {
        setAuthToken(savedAdminToken);
        localStorage.removeItem('cinelab_admin_saved_token');
        checkCurrentUser();
        navigateTo('admin');
        return;
      }
    }
    navigateTo('admin');
  };

  const handleSwitchDemoRole = async (role: 'guest' | 'student' | 'admin') => {
    try {
      if (typeof window !== 'undefined') {
        localStorage.setItem('cinelab_active_role', role);
      }

      if (role === 'guest') {
        setAuthToken('');
        setUser(null);
        setEnrollment(null);
        navigateTo('inicio');
        try {
          await api.logout();
        } catch {}
      } else if (role === 'admin') {
        // Redireciona para o Painel Administrativo com tela de autenticação segura
        navigateTo('admin');
      } else if (role === 'student') {
        // OPÇÃO 1: SEGURANÇA COMERCIAL TOTAL
        // Apenas o Professor Tony (administrador autenticado) pode testar a área do aluno sem senha.
        // Visitantes públicos NÃO entram como aluno fake e devem autenticar-se normalmente.
        const isAdminSession = user?.role === 'admin' || (typeof window !== 'undefined' && !!localStorage.getItem('cinelab_admin_saved_token'));

        if (isAdminSession) {
          const currentToken = getAuthToken();
          if (currentToken && typeof window !== 'undefined' && user?.role === 'admin') {
            localStorage.setItem('cinelab_admin_saved_token', currentToken);
          }
          const previewStudentUser: User = {
            id: 'user-preview-professor',
            name: 'Aluno de Teste (Visão do Professor Tony)',
            email: 'professor-tony-preview@cinelab.edu.br',
            role: 'student',
            createdAt: new Date().toISOString(),
          };
          const previewEnrollment: Enrollment = {
            id: 'enr-preview-tony',
            enrollmentNumber: 'CNL-2026-TESTE-PROF',
            studentId: 'user-preview-professor',
            studentName: 'Professor Tony de Luc (Modo de Teste)',
            studentEmail: 'professor-tony-preview@cinelab.edu.br',
            status: 'active',
            enrolledAt: new Date().toISOString(),
            paymentId: 'pay-test-prof',
          };
          setAuthToken('preview-mode-token');
          setUser(previewStudentUser);
          setEnrollment(previewEnrollment);
          navigateTo('minha-area');
        } else {
          // Visitante não autenticado: abre modal de login de aluno
          handleOpenAuth('login');
        }
      }
    } catch (err) {
      console.error('Erro ao alternar perfil:', err);
    }
  };

  const hasAdminSavedToken = typeof window !== 'undefined' && !!localStorage.getItem('cinelab_admin_saved_token');

  return (
    <div className="min-h-screen flex flex-col bg-[#0c0d10] text-[#e4e6eb] w-full max-w-full min-w-0 overflow-x-clip">
      {/* Top Banner de Retorno ao Admin quando Professor Tony estiver testando como Aluno */}
      {hasAdminSavedToken && (
        <div className="bg-gradient-to-r from-red-950 via-purple-950 to-red-950 border-b border-red-500/50 px-3 sm:px-6 py-2 text-xs font-mono text-white flex items-center justify-between gap-3 shadow-2xl sticky top-0 z-[60]">
          <div className="flex items-center gap-2 truncate">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse shrink-0" />
            <span className="font-bold text-amber-300">Modo de Teste da Área do Aluno</span>
            <span className="text-neutral-400 hidden md:inline">• Sessão Administrativa do Professor Tony salva</span>
          </div>
          <button
            onClick={handleRestoreAdminSession}
            className="px-3 py-1 rounded-lg bg-red-600 hover:bg-red-500 text-white font-bold text-[11px] uppercase tracking-wider flex items-center gap-1.5 shadow-lg cursor-pointer transition-transform active:scale-95 shrink-0"
          >
            <Shield className="w-3.5 h-3.5" />
            <span>Voltar ao Painel Admin</span>
          </button>
        </div>
      )}

      {/* Platform Header */}
      <Header
        currentRoute={currentRoute}
        onNavigate={navigateTo}
        user={user}
        enrollment={enrollment}
        onOpenAuth={handleOpenAuth}
        onLogout={handleLogout}
        onSwitchDemoRole={handleSwitchDemoRole}
        customLogoUrl={courseSettings?.logoUrl}
      />

      {/* Main Content Router */}
      <main className="flex-1 w-full max-w-full min-w-0 overflow-x-clip">
        {(currentRoute === 'inicio' || currentRoute === 'home' || !currentRoute) && (
          <HomeView
            onNavigate={navigateTo}
            onOpenAuth={handleOpenAuth}
            isLoggedIn={!!user}
            isAdmin={user?.role === 'admin'}
            settings={courseSettings}
            modules={courseModules}
          />
        )}

        {currentRoute === 'curso' && (
          <CourseView
            onNavigate={navigateTo}
            isLoggedIn={!!user}
            settings={courseSettings}
            modules={courseModules}
          />
        )}

        {currentRoute === 'metodologia' && (
          <MethodologyView
            onNavigate={navigateTo}
            isLoggedIn={!!user}
            settings={courseSettings}
            modules={courseModules}
          />
        )}

        {currentRoute === 'matricula' && (
          <EnrollmentView
            onNavigate={navigateTo}
            currentUser={user}
            user={user}
            settings={courseSettings}
            onEnrollmentSuccess={handleAuthSuccess}
          />
        )}

        {currentRoute === 'minha-area' && (
          user ? (
            <StudentAreaView
              onNavigate={navigateTo}
              user={user}
              enrollment={enrollment}
            />
          ) : (
            <div className="max-w-xl mx-auto px-4 py-20 text-center text-neutral-200">
              <div className="p-8 rounded-3xl bg-[#12141c] border border-amber-500/30 space-y-5 shadow-2xl">
                <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center mx-auto text-amber-400">
                  <Lock className="w-8 h-8" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white font-display">Acesso Exclusivo para Alunos Matriculados</h2>
                  <p className="text-xs text-neutral-400 mt-2 leading-relaxed">
                    A Área do Aluno com as aulas dos 10 módulos, apostilas completas e acompanhamento é restrita para estudantes matriculados na formação CINELAB.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                  <button
                    onClick={() => handleOpenAuth('login')}
                    className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-purple-900/60 hover:bg-purple-800 text-purple-200 hover:text-white border border-purple-500/50 text-xs font-bold font-mono transition-all cursor-pointer"
                  >
                    Já sou Aluno • Fazer Login
                  </button>
                  <button
                    onClick={() => navigateTo('matricula')}
                    className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-xs uppercase tracking-wider transition-all cursor-pointer shadow-lg shadow-amber-500/20"
                  >
                    Matricular-se Agora
                  </button>
                </div>
              </div>
            </div>
          )
        )}

        {currentRoute === 'apostilas' && (
          <ApostilasView
            isLoggedIn={!!user}
            user={user}
            enrollment={enrollment}
            onOpenAuth={handleOpenAuth}
            onNavigate={navigateTo}
            initialModuleId={routeParams.moduleId}
          />
        )}

        {currentRoute === 'videos' && (
          <VideosView
            isLoggedIn={!!user}
            isAdmin={user?.role === 'admin'}
            onNavigate={navigateTo}
          />
        )}

        {currentRoute === 'atividades' && (
          <ActivitiesView
            isLoggedIn={!!user}
            onNavigate={navigateTo}
            initialModuleId={routeParams.moduleId}
          />
        )}

        {(currentRoute === 'filmes-leituras' || currentRoute === 'filmes' || currentRoute === 'leituras') && (
          <FilmsAndReadingsView
            isLoggedIn={!!user}
            isAdmin={user?.role === 'admin'}
            currentUser={user}
            onNavigate={navigateTo}
            initialTab={routeParams.tab || (currentRoute === 'leituras' ? 'readings' : 'films')}
            initialModuleId={routeParams.moduleId}
          />
        )}

        {currentRoute === 'avaliacoes' && (
          <EvaluationsView
            isLoggedIn={!!user}
            onNavigate={navigateTo}
            initialModuleId={routeParams.moduleId}
          />
        )}

        {currentRoute === 'notas' && (
          <GradesView
            isLoggedIn={!!user}
            onNavigate={navigateTo}
          />
        )}

        {currentRoute === 'certificado' && (
          <CertificateView
            isLoggedIn={!!user}
            onNavigate={navigateTo}
            user={user}
            enrollment={enrollment}
          />
        )}

        {(currentRoute === 'tutor-ia' ||
          currentRoute === 'tutor' ||
          currentRoute === 'ia-tutor' ||
          currentRoute === 'cinetutor') && (
          <TutorIaView
            user={user}
            enrollment={enrollment}
            modules={courseModules}
            onNavigate={navigateTo}
            onOpenAuth={handleOpenAuth}
          />
        )}

        {currentRoute === 'validar-certificado' && (
          <CertificateValidationView
            initialCode={routeParams.code}
            onNavigate={navigateTo}
          />
        )}

        {currentRoute === 'modulo-detalhe' && (
          <ModuleDetailView
            moduleId={routeParams.moduleId || 1}
            onNavigate={navigateTo}
          />
        )}

        {(currentRoute === 'tony-de-luc' ||
          currentRoute === 'sobre-tony' ||
          currentRoute === 'filmografia' ||
          currentRoute === 'filmografia-diretor' ||
          currentRoute === 'filmografia-tony') && (
          <TonyDeLucView
            settings={courseSettings}
            onNavigate={navigateTo}
            isAdmin={user?.role === 'admin'}
          />
        )}

        {currentRoute === 'admin' && (
          <AdminView
            onNavigate={navigateTo}
            currentUser={user}
            onAdminLogin={(adminUser) => {
              setUser(adminUser);
              setEnrollment(null);
            }}
            onSettingsUpdated={loadCourseInfo}
            onSwitchToStudentPreview={() => handleSwitchDemoRole('student')}
          />
        )}

        {currentRoute === 'faq' && (
          <FaqView onNavigate={navigateTo} />
        )}

        {currentRoute === 'contato' && (
          <ContactView settings={courseSettings} onNavigate={navigateTo} />
        )}
      </main>

      {/* Global Footer */}
      <Footer onNavigate={navigateTo} settings={courseSettings} />

      {/* Global Auth Modal */}
      <AuthModal
        isOpen={authModalOpen}
        initialMode={authModalMode}
        onClose={() => setAuthModalOpen(false)}
        onLoginSuccess={handleAuthSuccess}
        onSuccess={handleAuthSuccess}
      />
    </div>
  );
}
