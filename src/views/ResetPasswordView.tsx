import React, { useState, useEffect } from 'react';
import { Lock, CheckCircle2, AlertCircle, ArrowLeft, KeyRound, Sparkles, MessageCircle } from 'lucide-react';
import { api } from '../services/api.js';

interface ResetPasswordViewProps {
  onNavigate: (route: string) => void;
  onOpenAuth: () => void;
}

export const ResetPasswordView: React.FC<ResetPasswordViewProps> = ({
  onNavigate,
  onOpenAuth,
}) => {
  const [email, setEmail] = useState('');
  const [token, setToken] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const urlEmail = params.get('email');
      const urlToken = params.get('token');
      if (urlEmail) setEmail(urlEmail);
      if (urlToken) setToken(urlToken);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!newPassword || newPassword.length < 6) {
      setErrorMessage('A nova senha deve ter no mínimo 6 caracteres.');
      return;
    }

    if (newPassword !== confirmPassword) {
      setErrorMessage('As duas senhas digitadas não coincidem.');
      return;
    }

    try {
      setLoading(true);
      await api.resetPassword({
        email,
        token,
        newPassword,
      });
      setSuccess(true);
    } catch (err: any) {
      setErrorMessage(err.message || 'Erro ao redefinir senha. O link pode ter expirado.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[75vh] flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-neutral-900/90 border border-neutral-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
        
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-500/20 to-purple-500/20 border border-amber-500/40 flex items-center justify-center mx-auto text-amber-400">
            <KeyRound className="w-6 h-6" />
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-white font-display">
            Redefinir Senha
          </h1>
          <p className="text-xs text-neutral-400">
            Cadastre uma nova senha de acesso para sua conta de aluno no CINELAB.
          </p>
        </div>

        {errorMessage && (
          <div className="p-3 rounded-xl bg-red-950/80 border border-red-500/50 flex items-center gap-2.5 text-xs text-red-200">
            <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        {success ? (
          <div className="space-y-5 text-center py-4">
            <div className="w-14 h-14 rounded-full bg-emerald-500/10 border border-emerald-500/40 flex items-center justify-center mx-auto text-emerald-400">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <div className="space-y-1">
              <h3 className="text-base font-bold text-white">Senha alterada com sucesso!</h3>
              <p className="text-xs text-neutral-400">
                Sua nova senha já está ativa. Você pode fazer login agora e acessar suas apostilas e vídeos.
              </p>
            </div>
            <button
              onClick={() => {
                onOpenAuth();
                onNavigate('inicio');
              }}
              className="w-full py-3 bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold uppercase tracking-wider rounded-xl transition-all shadow-lg shadow-amber-500/20 cursor-pointer active:scale-98 text-xs"
            >
              Fazer Login Agora
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs text-neutral-400 mb-1 font-medium">Seu E-mail</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="seu-email@exemplo.com"
                className="w-full px-3.5 py-2.5 bg-neutral-950 border border-neutral-700/80 rounded-xl text-xs text-white focus:outline-none focus:border-amber-500"
              />
            </div>

            <div>
              <label className="block text-xs text-neutral-400 mb-1 font-medium">Nova Senha</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-neutral-500 absolute left-3.5 top-3" />
                <input
                  type="password"
                  required
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Mínimo 6 caracteres"
                  className="w-full pl-10 pr-3.5 py-2.5 bg-neutral-950 border border-neutral-700/80 rounded-xl text-xs text-white focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs text-neutral-400 mb-1 font-medium">Confirme a Nova Senha</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-neutral-500 absolute left-3.5 top-3" />
                <input
                  type="password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Repita a nova senha"
                  className="w-full pl-10 pr-3.5 py-2.5 bg-neutral-950 border border-neutral-700/80 rounded-xl text-xs text-white focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 disabled:opacity-50 text-neutral-950 font-bold uppercase tracking-wider rounded-xl transition-all shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2 cursor-pointer active:scale-98 text-xs"
            >
              {loading ? 'Atualizando senha...' : 'Salvar Nova Senha'}
            </button>

            <div className="pt-2 text-center flex items-center justify-between text-xs">
              <button
                type="button"
                onClick={() => onNavigate('inicio')}
                className="text-neutral-400 hover:text-white flex items-center gap-1 cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Voltar ao Início</span>
              </button>

              <a
                href="https://wa.me/5521966725240?text=Ol%C3%A1%20Professor%20Tony%2C%20preciso%20de%20ajuda%20para%20recuperar%20minha%20senha%20no%20CINELAB."
                target="_blank"
                rel="noreferrer"
                className="text-amber-400 hover:underline flex items-center gap-1 font-medium"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>Suporte WhatsApp</span>
              </a>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
