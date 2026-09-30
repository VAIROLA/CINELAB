import React, { useState, useEffect } from 'react';
import { api } from '../../services/api.js';
import { UserPlus, Edit2, X, Check, Lock, AlertCircle, Award, CreditCard, HelpCircle, FileText } from 'lucide-react';

interface StudentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (message: string) => void;
  studentToEdit?: any | null; // If null, mode is "create", else "edit"
}

export const StudentModal: React.FC<StudentModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
  studentToEdit,
}) => {
  const isEdit = Boolean(studentToEdit);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [document, setDocument] = useState('');
  const [password, setPassword] = useState('');
  const [matricula, setMatricula] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('PIX à Vista');
  const [difficulties, setDifficulties] = useState('');
  const [averageGrade, setAverageGrade] = useState<string>('');
  const [pedagogicalNotes, setPedagogicalNotes] = useState('');
  const [enrollmentStatus, setEnrollmentStatus] = useState<'active' | 'suspended' | 'pending'>('active');
  const [currentModuleId, setCurrentModuleId] = useState<number>(1);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (studentToEdit) {
      setName(studentToEdit.name || '');
      setEmail(studentToEdit.email || '');
      setPhone(studentToEdit.phone || '');
      setDocument(studentToEdit.document || '');
      setPassword(''); // keep blank unless admin wants to overwrite
      setMatricula(studentToEdit.enrollmentNumber || studentToEdit.matricula || '');
      setPaymentMethod(studentToEdit.paymentMethod || 'PIX à Vista');
      setDifficulties(studentToEdit.difficulties || '');
      setAverageGrade(studentToEdit.averageGrade !== undefined && studentToEdit.averageGrade !== null ? String(studentToEdit.averageGrade) : '');
      setPedagogicalNotes(studentToEdit.pedagogicalNotes || '');
      setEnrollmentStatus(studentToEdit.enrollmentStatus || studentToEdit.status || 'active');
      setCurrentModuleId(studentToEdit.currentModuleId || 1);
    } else {
      setName('');
      setEmail('');
      setPhone('');
      setDocument('');
      setPassword('cinelab123');
      setMatricula(`CNL-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`);
      setPaymentMethod('PIX à Vista');
      setDifficulties('');
      setAverageGrade('');
      setPedagogicalNotes('');
      setEnrollmentStatus('active');
      setCurrentModuleId(1);
    }
    setErrorMessage('');
  }, [studentToEdit, isOpen]);

  if (!isOpen) return null;

  const parsedGrade = averageGrade !== '' ? Number(averageGrade) : null;
  const isPassing = parsedGrade !== null ? parsedGrade > 6.0 : true;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setLoading(true);

    try {
      if (isEdit) {
        await api.updateAdminStudent(studentToEdit.id, {
          name,
          email,
          phone,
          document,
          password: password || undefined,
          enrollmentStatus,
          currentModuleId,
          matricula,
          paymentMethod,
          difficulties,
          averageGrade: averageGrade !== '' ? Number(averageGrade) : null,
          pedagogicalNotes,
        });
        onSuccess(`Dados do aluno "${name}" atualizados com sucesso no Painel de Controle!`);
      } else {
        await api.createAdminStudent({
          name,
          email,
          phone,
          document,
          password: password || 'cinelab123',
          enrollmentStatus,
          matricula,
          paymentMethod,
          difficulties,
          averageGrade: averageGrade !== '' ? Number(averageGrade) : null,
          pedagogicalNotes,
        });
        onSuccess(`Novo aluno "${name}" matriculado e registrado no Painel de Controle!`);
      }
      onClose();
    } catch (err: any) {
      setErrorMessage(err.message || 'Erro ao processar dados do aluno.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4 backdrop-blur-sm animate-fadeIn overflow-y-auto">
      <div className="bg-neutral-900 border border-neutral-800 rounded-3xl p-6 sm:p-8 max-w-2xl w-full space-y-5 shadow-2xl text-left my-8">
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center">
              {isEdit ? <Edit2 className="w-4 h-4" /> : <UserPlus className="w-4 h-4" />}
            </div>
            <div>
              <h3 className="text-base font-bold font-display text-white">
                {isEdit ? 'Controle do Aluno: Editar Ficha Pedagógica' : 'Acrescentar Novo Aluno no CINELAB'}
              </h3>
              <p className="text-[11px] text-neutral-400 font-mono">
                {isEdit ? `Matrícula: ${matricula || 'S/N'}` : 'Cadastro direto com controle de média e dificuldades'}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-neutral-400 hover:text-white p-1 rounded-lg hover:bg-neutral-800 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Error Alert */}
        {errorMessage && (
          <div className="p-3 rounded-xl bg-red-950/40 border border-red-800/60 text-red-300 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="space-y-4 text-xs font-mono">
          {/* Section 1: Dados Pessoais & Matrícula */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-neutral-400 mb-1">Nome Completo do Aluno *</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ex: Lucas Mendonça de Oliveira"
                className="w-full px-3.5 py-2 bg-neutral-950 border border-neutral-700 rounded-xl text-white font-sans text-xs focus:outline-none focus:border-amber-500"
              />
            </div>

            <div>
              <label className="block text-neutral-400 mb-1">Número da Matrícula *</label>
              <input
                type="text"
                required
                value={matricula}
                onChange={(e) => setMatricula(e.target.value)}
                placeholder="Ex: CNL-2026-4819"
                className="w-full px-3.5 py-2 bg-neutral-950 border border-neutral-700 rounded-xl text-amber-400 font-bold text-xs focus:outline-none focus:border-amber-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-neutral-400 mb-1">E-mail de Acesso *</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="aluno@cinelab.edu.br"
                className="w-full px-3.5 py-2 bg-neutral-950 border border-neutral-700 rounded-xl text-white text-xs focus:outline-none focus:border-amber-500"
              />
            </div>

            <div>
              <label className="block text-neutral-400 mb-1">Telefone / WhatsApp</label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="(11) 98765-4321"
                className="w-full px-3.5 py-2 bg-neutral-950 border border-neutral-700 rounded-xl text-white text-xs focus:outline-none focus:border-amber-500"
              />
            </div>

            <div>
              <label className="block text-neutral-400 mb-1">CPF / Documento</label>
              <input
                type="text"
                value={document}
                onChange={(e) => setDocument(e.target.value)}
                placeholder="123.456.789-00"
                className="w-full px-3.5 py-2 bg-neutral-950 border border-neutral-700 rounded-xl text-white text-xs focus:outline-none focus:border-amber-500"
              />
            </div>
          </div>

          {/* Section 2: Pagamento e Status */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 border-t border-neutral-800">
            <div>
              <label className="block text-neutral-400 mb-1 flex items-center gap-1">
                <CreditCard className="w-3.5 h-3.5 text-amber-400" />
                <span>Forma de Pagamento *</span>
              </label>
              <select
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="w-full px-3.5 py-2 bg-neutral-950 border border-neutral-700 rounded-xl text-white text-xs focus:outline-none focus:border-amber-500"
              >
                <option value="PIX à Vista">PIX à Vista</option>
                <option value="Cartão de Crédito (12x)">Cartão de Crédito (12x)</option>
                <option value="Cartão de Crédito (6x)">Cartão de Crédito (6x)</option>
                <option value="Cartão de Crédito (1x)">Cartão de Crédito à Vista</option>
                <option value="Cartão de Débito">Cartão de Débito</option>
                <option value="Boleto Bancário">Boleto Bancário</option>
                <option value="Bolsa de Estudos / Cortesia">Bolsa de Estudos / Cortesia</option>
              </select>
            </div>

            <div>
              <label className="block text-neutral-400 mb-1">Status da Matrícula</label>
              <select
                value={enrollmentStatus}
                onChange={(e: any) => setEnrollmentStatus(e.target.value)}
                className="w-full px-3.5 py-2 bg-neutral-950 border border-neutral-700 rounded-xl text-white text-xs focus:outline-none focus:border-amber-500"
              >
                <option value="active">ATIVA (Acesso Liberado)</option>
                <option value="suspended">SUSPENSA (Bloqueado)</option>
                <option value="pending">PENDENTE (Aguardando)</option>
              </select>
            </div>

            <div>
              <label className="block text-neutral-400 mb-1">Etapa / Módulo Liberado</label>
              <select
                value={currentModuleId}
                onChange={(e) => setCurrentModuleId(Number(e.target.value))}
                className="w-full px-3.5 py-2 bg-neutral-950 border border-neutral-700 rounded-xl text-white text-xs focus:outline-none focus:border-amber-500"
              >
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                  <option key={num} value={num}>
                    Módulo 0{num}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Section 3: PEDAGÓGICO: Dificuldades e Média > 6.0 */}
          <div className="pt-2 border-t border-neutral-800 space-y-3">
            <div>
              <label className="block text-neutral-400 mb-1 flex items-center gap-1">
                <HelpCircle className="w-3.5 h-3.5 text-amber-400" />
                <span>Em que o aluno tem mais dificuldade:</span>
              </label>
              <input
                type="text"
                value={difficulties}
                onChange={(e) => setDifficulties(e.target.value)}
                placeholder="Ex: Decupagem técnica de lentes, regra dos 180°, iluminação de recorte, roteiro..."
                className="w-full px-3.5 py-2 bg-neutral-950 border border-neutral-700 rounded-xl text-white font-sans text-xs focus:outline-none focus:border-amber-500"
              />
              <span className="text-[10px] text-neutral-500 mt-1 block">
                Registre os pontos de atenção e principais desafios técnicos identificados nas aulas e avaliações.
              </span>
            </div>

            <div className="p-3.5 rounded-2xl bg-neutral-950 border border-neutral-800 space-y-2">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <label className="text-neutral-300 font-bold flex items-center gap-1.5">
                  <Award className="w-4 h-4 text-amber-400" />
                  <span>Média Geral do Aluno (Nota de 0 a 10)</span>
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    step="0.1"
                    min="0"
                    max="10"
                    value={averageGrade}
                    onChange={(e) => setAverageGrade(e.target.value)}
                    placeholder="Ex: 8.5"
                    className="w-24 px-3 py-1.5 bg-neutral-900 border border-neutral-700 rounded-lg text-white font-mono text-xs focus:outline-none focus:border-amber-500 text-center font-bold"
                  />
                  {parsedGrade !== null && (
                    <span
                      className={`px-2 py-1 rounded text-[10px] font-bold ${
                        isPassing
                          ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                          : 'bg-red-950 text-red-300 border border-red-800'
                      }`}
                    >
                      {isPassing ? 'APROVADO (> 6.0)' : 'ABAIXO DE 6.0'}
                    </span>
                  )}
                </div>
              </div>

              {/* Explicit rule indicator */}
              <div className="flex items-center gap-2 text-[11px] p-2 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-300">
                <Award className="w-3.5 h-3.5 shrink-0 text-amber-400" />
                <span>
                  <strong>Critério de Aprovação Oficial CINELAB:</strong> A média final do aluno deve ser <strong>SUPERIOR A 6.0 (&gt; 6.0)</strong> para certificação.
                </span>
              </div>
            </div>

            <div>
              <label className="block text-neutral-400 mb-1 flex items-center gap-1">
                <FileText className="w-3.5 h-3.5 text-amber-400" />
                <span>Observações Pedagógicas do Professor Cineasta Tony de Luc:</span>
              </label>
              <textarea
                rows={2}
                value={pedagogicalNotes}
                onChange={(e) => setPedagogicalNotes(e.target.value)}
                placeholder="Anotações de acompanhamento, mentoria individual ou evolução pedagógica..."
                className="w-full px-3.5 py-2 bg-neutral-950 border border-neutral-700 rounded-xl text-white font-sans text-xs focus:outline-none focus:border-amber-500 resize-none"
              />
            </div>
          </div>

          {/* Section 4: Senha (se necessário) */}
          <div className="pt-2 border-t border-neutral-800">
            <label className="block text-neutral-400 mb-1 flex items-center gap-1">
              <Lock className="w-3.5 h-3.5 text-neutral-500" />
              <span>{isEdit ? 'Redefinir Senha do Aluno (Opcional)' : 'Senha Inicial de Acesso *'}</span>
            </label>
            <input
              type="text"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder={isEdit ? 'Deixe em branco para manter a senha atual' : 'cinelab123'}
              className="w-full px-3.5 py-2 bg-neutral-950 border border-neutral-700 rounded-xl text-white text-xs focus:outline-none focus:border-amber-500 font-mono"
            />
          </div>

          <div className="flex items-center justify-end gap-2 pt-3 border-t border-neutral-800">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 bg-neutral-800 hover:bg-neutral-700 text-neutral-300 rounded-xl text-xs cursor-pointer font-sans"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2.5 bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold rounded-xl text-xs transition-all cursor-pointer flex items-center gap-1.5 font-sans shadow-md shadow-amber-500/20"
            >
              <Check className="w-4 h-4" />
              <span>{loading ? 'Salvando...' : isEdit ? 'Salvar Alterações' : 'Cadastrar Aluno'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
