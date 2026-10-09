import React, { useState } from 'react';
import { Logo } from './Logo.js';
import { api, setAuthToken } from '../services/api.js';
import { User, Enrollment } from '../types/index.js';
import { useLanguage } from '../i18n/LanguageContext.js';
import {
  X,
  Lock,
  Mail,
  User as UserIcon,
  Phone,
  FileText,
  ArrowRight,
  Shield,
  GraduationCap,
  AlertCircle,
  CheckCircle2,
} from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess?: (user: User, enrollment: Enrollment | null) => void;
  onSuccess?: (user: User, enrollment: Enrollment | null) => void;
  initialMode?: 'login' | 'register';
  onNavigate?: (route: string) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess,
  onSuccess,
  initialMode = 'login',
  onNavigate,
}) => {
  const { t } = useLanguage();
  const [mode, setMode] = useState<'login' | 'register' | 'forgot'>(initialMode);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [document, setDocument] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  if (!isOpen) return null;

  const notifySuccess = (u: User, e: Enrollment | null) => {
    if (onLoginSuccess) onLoginSuccess(u, e);
    if (onSuccess) onSuccess(u, e);
  };

  const handleLogin = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setLoading(true);
    setErrorMessage('');
    setSuccessMessage('');

    try {
      const res = await api.login(email, password);
      setAuthToken(res.token);
      notifySuccess(res.user, res.enrollment);
      onClose();
    } catch (err: any) {
      setErrorMessage(err.message || 'Falha ao autenticar.');
    } finally {
      setLoading(false);
    }
  };

  const handleQuickAdmin = async () => {
    setLoading(true);
    setErrorMessage('');
    try {
      const res = await api.quickAdminLogin();
      setAuthToken(res.token);
      notifySuccess(res.user, res.enrollment);
      onClose();
    } catch (err: any) {
      setErrorMessage(err.message || 'Falha ao acessar como Administrador.');
    } finally {
      setLoading(false);
    }
  };

  const handleQuickStudent = async () => {
    setLoading(true);
    setErrorMessage('');
    try {
      const res = await api.quickStudentLogin();
      setAuthToken(res.token);
      notifySuccess(res.user, res.enrollment);
      onClose();
    } catch (err: any) {
      setErrorMessage(err.message || 'Falha ao acessar como Aluno.');
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage('');

    try {
      const res = await api.register({
        name,
        email,
        phone,
        document,
        password,
      });
      setAuthToken(res.token);
      notifySuccess(res.user, res.enrollment);
      onClose();
    } catch (err: any) {
      setErrorMessage(err.message || 'Falha no cadastro.');
    } finally {
      setLoading(false);
    }
  };

  const handleForgot = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage('');

    try {
      const res = await api.forgotPassword(email);
      setSuccessMessage(res.message);
    } catch (err: any) {
      setErrorMessage(err.message || 'Erro ao solicitar recuperação.');
    } finally {
      setLoading(false);
    }
  };

  // Fast pre-fill helpers for demo testing
  const fillStudentDemo = () => {
    setEmail('aluno@cinelab.edu.br');
    setPassword('aluno123');
    setErrorMessage('');
  };

  const fillAdminDemo = () => {
    setEmail('admin@cinelab.edu.br');
    setPassword('admin123');
    setErrorMessage('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-md bg-[#12141c] border border-neutral-800 rounded-2xl shadow-2xl p-6 sm:p-8 text-neutral-200">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Brand Header */}
        <div className="text-center mb-6">
          <div className="flex justify-center mb-2">
            <Logo size="md" />
          </div>
          <h2 className="text-lg font-display font-bold text-white tracking-wide">
            {mode === 'login' && t('auth.titleLogin')}
            {mode === 'register' && t('auth.titleRegister')}
            {mode === 'forgot' && t('auth.titleForgot')}
          </h2>
          <p className="text-xs text-neutral-400 mt-1">
            {mode === 'login' && t('auth.descLogin')}
            {mode === 'register' && t('auth.descRegister')}
            {mode === 'forgot' && t('auth.descForgot')}
          </p>
        </div>

        {/* Alerts */}
        {errorMessage && (
          <div className="mb-4 p-3 rounded-lg bg-red-950/50 border border-red-800/60 text-red-300 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
            <span>{errorMessage}</span>
          </div>
        )}

        {successMessage && (
          <div className="mb-4 p-3 rounded-lg bg-emerald-950/50 border border-emerald-800/60 text-emerald-300 text-xs flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
            <span>{successMessage}</span>
          </div>
        )}

        {/* Forms */}
        {mode === 'login' && (
          <form onSubmit={handleLogin} className="space-y-4 text-xs">
            <div>
              <label className="block text-neutral-400 mb-1 font-medium">{t('auth.emailLabel')}</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-neutral-500 absolute left-3 top-3" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="exemplo@cinelab.edu.br"
                  className="w-full pl-9 pr-3 py-2.5 bg-neutral-900 border border-neutral-700 rounded-lg text-white focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-neutral-400 font-medium">{t('auth.passwordLabel')}</label>
                <button
                  type="button"
                  onClick={() => setMode('forgot')}
                  className="text-amber-400/80 hover:text-amber-300 text-[11px] cursor-pointer"
                >
                  {t('auth.forgotPasswordLink')}
                </button>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-neutral-500 absolute left-3 top-3" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-9 pr-3 py-2.5 bg-neutral-900 border border-neutral-700 rounded-lg text-white focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-amber-500 hover:bg-amber-400 disabled:opacity-50 text-neutral-950 font-bold uppercase tracking-wider rounded-lg transition-all shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2 cursor-pointer active:scale-98"
            >
              {loading ? t('auth.loggingIn') : t('auth.loginBtn')}
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="pt-3 text-center text-xs text-neutral-400">
              Ainda não é aluno?{' '}
              <button
                type="button"
                onClick={() => {
                  onClose();
                  if (onNavigate) {
                    onNavigate('matricula');
                  }
                }}
                className="text-amber-400 font-bold hover:underline cursor-pointer ml-1 inline-flex items-center gap-0.5"
              >
                <span>Matricular-se no Curso</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </form>
        )}

        {mode === 'register' && (
          <div className="space-y-4 py-2">
            <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 space-y-2 text-left">
              <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
                <GraduationCap className="w-5 h-5 shrink-0" />
                <span>Cadastro Vinculado à Matrícula</span>
              </div>
              <p className="text-xs text-neutral-300 leading-relaxed">
                O acesso à Área do Aluno do CINELAB é exclusivo para estudantes matriculados. Sua conta e credenciais de acesso são criadas oficialmente no momento da sua matrícula.
              </p>
            </div>

            <button
              type="button"
              onClick={() => {
                onClose();
                if (onNavigate) {
                  onNavigate('matricula');
                }
              }}
              className="w-full py-3 bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold uppercase tracking-wider rounded-lg transition-all shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2 cursor-pointer active:scale-98 text-xs"
            >
              <span>Fazer Matrícula Oficial</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="pt-2 text-center text-xs text-neutral-400">
              Já possui matrícula?{' '}
              <button
                type="button"
                onClick={() => setMode('login')}
                className="text-amber-400 font-semibold hover:underline cursor-pointer"
              >
                Fazer Login
              </button>
            </div>
          </div>
        )}

        {mode === 'forgot' && (
          <form onSubmit={handleForgot} className="space-y-4 text-xs">
            <div>
              <label className="block text-neutral-400 mb-1 font-medium">{t('auth.emailLabel')}</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-neutral-500 absolute left-3 top-3" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="exemplo@cinelab.edu.br"
                  className="w-full pl-9 pr-3 py-2.5 bg-neutral-900 border border-neutral-700 rounded-lg text-white focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-amber-500 hover:bg-amber-400 disabled:opacity-50 text-neutral-950 font-bold uppercase tracking-wider rounded-lg transition-all shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2 cursor-pointer active:scale-98"
            >
              {loading ? t('auth.loggingIn') : t('auth.sendResetLink')}
            </button>

            <div className="pt-2 text-center">
              <button
                type="button"
                onClick={() => setMode('login')}
                className="text-neutral-400 hover:text-white cursor-pointer"
              >
                {t('auth.backToLogin')}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
