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
        if (user?.role !== 'admin') {
          handleOpenAuth('login');
          return;
        }
        navigateTo('admin');
      } else if (role === 'student') {
        const studentUser: User = {
          id: 'user-student-demo',
          name: 'Aluno Demonstrativo',
          email: 'aluno@cinelab.com.br',
          role: 'student',
          createdAt: new Date().toISOString(),
        };
        const studentEnrollment: Enrollment = {
          id: "enr-demo",
          enrollmentNumber: "CNL-2026-DEMO",
          studentId: "user-student-demo",
          studentName: "Aluno Demonstração",
          studentEmail: "aluno@cinelab.com.br",
          status: "active",
          enrolledAt: new Date().toISOString(),
          paymentId: "pay-demo",
        };
        setAuthToken('user-student-demo');
        setUser(studentUser);
        setEnrollment(studentEnrollment);
        navigateTo('minha-area');
        try {
          const res = await api.quickStudentLogin();
          if (res?.user) setUser(res.user);
          if (res?.enrollment) setEnrollment(res.enrollment);
          if (res?.token) setAuthToken(res.token);
        } catch (e) {
          console.warn('Quick student login remote sync notice:', e);
        }
      }
    } catch (err) {
      console.error('Erro ao alternar perfil:', err);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#0c0d10] text-[#e4e6eb] w-full max-w-full min-w-0 overflow-x-clip">
      {/* Platform Header */}
      <Header
        currentRoute={currentRoute}
        onNavigate={navigateTo}
        user={user}
        enrollment={enrollment}
        onOpenAuth={handleOpenAuth}
        onLogout={handleLogout}
        onSwitchDemoRole={user?.role === 'admin' ? handleSwitchDemoRole : undefined}
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
          <StudentAreaView
            onNavigate={navigateTo}
            user={user}
            onOpenAuth={handleOpenAuth}
          />
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
