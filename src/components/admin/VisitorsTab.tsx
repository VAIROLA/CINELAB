import React, { useState } from 'react';
import { VisitorStats, VisitorLog } from '../../types/index.js';
import { api } from '../../services/api.js';
import {
  Eye,
  Smartphone,
  Monitor,
  Tablet,
  Search,
  RefreshCw,
  Plus,
  Trash2,
  CheckCircle2,
  TrendingUp,
  MapPin,
  Globe,
  ExternalLink,
} from 'lucide-react';

interface VisitorsTabProps {
  stats: VisitorStats | null;
  onRefresh: () => Promise<void>;
}

export const VisitorsTab: React.FC<VisitorsTabProps> = ({ stats, onRefresh }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [deviceFilter, setDeviceFilter] = useState<'all' | 'mobile' | 'desktop' | 'tablet'>('all');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isAddingTest, setIsAddingTest] = useState(false);
  const [actionMessage, setActionMessage] = useState('');
  const [customTestModalOpen, setCustomTestModalOpen] = useState(false);
  
  // Custom test visitor state
  const [testPath, setTestPath] = useState('/matricula');
  const [testDevice, setTestDevice] = useState<'mobile' | 'desktop' | 'tablet'>('mobile');
  const [testReferrer, setTestReferrer] = useState('Instagram Ads (@cinelab.cinema)');

  const handleRefresh = async () => {
    setIsRefreshing(true);
    try {
      await onRefresh();
      setActionMessage('Dados de visitantes atualizados com sucesso.');
      setTimeout(() => setActionMessage(''), 3000);
    } catch (err) {
      console.error(err);
    } finally {
      setIsRefreshing(false);
    }
  };

  const handleQuickAddTestVisitor = async () => {
    setIsAddingTest(true);
    try {
      await api.addTestVisitor({
        pagePath: testPath,
        deviceType: testDevice,
        referrer: testReferrer,
        isInterested: testPath === '/matricula' || testPath === '/curso',
      });
      await onRefresh();
      setActionMessage('Visita de teste registrada com sucesso.');
      setCustomTestModalOpen(false);
      setTimeout(() => setActionMessage(''), 3500);
    } catch (err: any) {
      alert('Erro ao registrar visita de teste: ' + err.message);
    } finally {
      setIsAddingTest(false);
    }
  };

  const handleClearVisitors = async () => {
    if (!confirm('Deseja realmente reiniciar o histórico de visitas públicas?')) return;
    try {
      await api.clearAdminVisitors();
      await onRefresh();
      setActionMessage('Histórico de visitas limpo.');
      setTimeout(() => setActionMessage(''), 3000);
    } catch (err: any) {
      alert('Erro ao limpar histórico: ' + err.message);
    }
  };

  const filteredVisitors = (stats?.recentVisitors || []).filter((v) => {
    const matchSearch =
      v.ip.includes(searchTerm) ||
      v.pagePath.toLowerCase().includes(searchTerm.toLowerCase()) ||
      v.referrer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (v.city && v.city.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (v.userName && v.userName.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchDevice = deviceFilter === 'all' || v.deviceType === deviceFilter;

    return matchSearch && matchDevice;
  });

  const totalDevices = (stats?.devices.mobile || 0) + (stats?.devices.desktop || 0) + (stats?.devices.tablet || 0) || 1;
  const mobilePct = Math.round(((stats?.devices.mobile || 0) / totalDevices) * 100);
  const desktopPct = Math.round(((stats?.devices.desktop || 0) / totalDevices) * 100);
  const tabletPct = Math.round(((stats?.devices.tablet || 0) / totalDevices) * 100);

  return (
    <div className="space-y-6 animate-fadeIn" id="admin-visitors-section">
      {/* Action Notification */}
      {actionMessage && (
        <div className="p-3 bg-emerald-950/60 border border-emerald-800 text-emerald-300 text-xs rounded-xl flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>{actionMessage}</span>
        </div>
      )}

      {/* Top Header info */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-800 pb-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-mono font-bold mb-1">
            <Eye className="w-3.5 h-3.5" /> Controle de Tráfego & Visitas Públicas
          </div>
          <h2 className="text-xl font-display font-bold text-white">
            Visitantes (Públicos)
          </h2>
          <p className="text-xs text-neutral-400">
            Monitoramento em tempo real de visitantes públicos, visualizações de páginas e conversões de matrícula.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setCustomTestModalOpen(true)}
            className="px-3.5 py-2 bg-amber-500 hover:bg-amber-400 text-neutral-950 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 shadow-md shadow-amber-500/10"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Simular Visita Teste</span>
          </button>

          <button
            type="button"
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="p-2 bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 text-neutral-300 rounded-xl text-xs transition-all cursor-pointer"
            title="Atualizar dados agora"
          >
            <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
          </button>

          <button
            type="button"
            onClick={handleClearVisitors}
            className="p-2 bg-neutral-900 hover:bg-red-950/60 border border-neutral-800 hover:border-red-800 text-neutral-400 hover:text-red-400 rounded-xl text-xs transition-all cursor-pointer"
            title="Limpar histórico"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 font-mono">
        <div className="p-5 rounded-2xl bg-neutral-900 border border-neutral-800 shadow-md">
          <span className="text-neutral-400 text-xs block">TOTAL DE ACESSOS</span>
          <div className="text-3xl font-display font-bold text-white mt-1">
            {stats?.totalVisits || 0}
          </div>
          <span className="text-[11px] text-neutral-500 mt-1 block">
            Visualizações computadas
          </span>
        </div>

        <div className="p-5 rounded-2xl bg-neutral-900 border border-neutral-800 shadow-md">
          <span className="text-neutral-400 text-xs block">VISITANTES ÚNICOS (IPS)</span>
          <div className="text-3xl font-display font-bold text-amber-400 mt-1">
            {stats?.uniqueVisitors || 0}
          </div>
          <span className="text-[11px] text-amber-500/80 mt-1 block">
            Dispositivos distintos
          </span>
        </div>

        <div className="p-5 rounded-2xl bg-neutral-900 border border-neutral-800 shadow-md">
          <span className="text-neutral-400 text-xs block">VISITAS HOJE</span>
          <div className="text-3xl font-display font-bold text-emerald-400 mt-1">
            {stats?.todayVisits || 0}
          </div>
          <span className="text-[11px] text-emerald-500/80 mt-1 block">
            Acessos nas últimas 24h
          </span>
        </div>

        <div className="p-5 rounded-2xl bg-neutral-900 border border-neutral-800 shadow-md">
          <span className="text-neutral-400 text-xs block">INTERESSE EM MATRÍCULA</span>
          <div className="text-3xl font-display font-bold text-amber-300 mt-1">
            {stats?.interestedVisits || 0}
          </div>
          <span className="text-[11px] text-emerald-400 mt-1 block flex items-center gap-1 font-sans">
            <TrendingUp className="w-3 h-3" />
            {stats?.conversionRate || 0}% taxa de interesse
          </span>
        </div>
      </div>

      {/* Analytics Breakdown: Devices & Top Pages */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Device Distribution */}
        <div className="lg:col-span-5 p-5 rounded-3xl bg-neutral-900 border border-neutral-800 space-y-4">
          <h3 className="text-xs font-bold font-mono text-neutral-300 uppercase tracking-wider">
            Dispositivos dos Visitantes
          </h3>

          <div className="space-y-3 font-mono text-xs">
            {/* Mobile */}
            <div>
              <div className="flex items-center justify-between text-neutral-300 mb-1">
                <span className="flex items-center gap-1.5 font-sans">
                  <Smartphone className="w-3.5 h-3.5 text-amber-400" />
                  Smartphones (Celular)
                </span>
                <span className="text-white font-bold">{stats?.devices.mobile || 0} ({mobilePct}%)</span>
              </div>
              <div className="w-full bg-neutral-950 h-2 rounded-full overflow-hidden">
                <div className="bg-amber-500 h-full rounded-full" style={{ width: `${mobilePct}%` }} />
              </div>
            </div>

            {/* Desktop */}
            <div>
              <div className="flex items-center justify-between text-neutral-300 mb-1">
                <span className="flex items-center gap-1.5 font-sans">
                  <Monitor className="w-3.5 h-3.5 text-blue-400" />
                  Computadores (Desktop)
                </span>
                <span className="text-white font-bold">{stats?.devices.desktop || 0} ({desktopPct}%)</span>
              </div>
              <div className="w-full bg-neutral-950 h-2 rounded-full overflow-hidden">
                <div className="bg-blue-500 h-full rounded-full" style={{ width: `${desktopPct}%` }} />
              </div>
            </div>

            {/* Tablet */}
            <div>
              <div className="flex items-center justify-between text-neutral-300 mb-1">
                <span className="flex items-center gap-1.5 font-sans">
                  <Tablet className="w-3.5 h-3.5 text-emerald-400" />
                  Tablets & iPads
                </span>
                <span className="text-white font-bold">{stats?.devices.tablet || 0} ({tabletPct}%)</span>
              </div>
              <div className="w-full bg-neutral-950 h-2 rounded-full overflow-hidden">
                <div className="bg-emerald-500 h-full rounded-full" style={{ width: `${tabletPct}%` }} />
              </div>
            </div>
          </div>
        </div>

        {/* Top Pages */}
        <div className="lg:col-span-7 p-5 rounded-3xl bg-neutral-900 border border-neutral-800 space-y-4">
          <h3 className="text-xs font-bold font-mono text-neutral-300 uppercase tracking-wider">
            Páginas Mais Acessadas pelo Público
          </h3>

          <div className="space-y-2 font-mono text-xs">
            {stats?.topPages && stats.topPages.length > 0 ? (
              stats.topPages.map((page, idx) => (
                <div
                  key={page.path}
                  className="flex items-center justify-between p-2.5 rounded-xl bg-neutral-950/60 border border-neutral-800/80"
                >
                  <div className="flex items-center gap-2 overflow-hidden">
                    <span className="text-[10px] text-amber-400 font-bold w-4">#{idx + 1}</span>
                    <span className="text-white truncate font-sans text-xs">{page.title}</span>
                    <span className="text-[10px] text-neutral-500 truncate">({page.path})</span>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-neutral-800 text-amber-300 text-[11px] font-bold shrink-0">
                    {page.count} visitas
                  </span>
                </div>
              ))
            ) : (
              <div className="text-center py-6 text-neutral-500 text-xs font-mono">
                Nenhum dado de página registrado ainda.
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Visitors Filter & Table */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="relative max-w-sm w-full">
            <Search className="w-4 h-4 text-neutral-500 absolute left-3 top-3" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar por IP, página, origem ou cidade..."
              className="w-full pl-9 pr-4 py-2 bg-neutral-900 border border-neutral-700 rounded-xl text-xs text-white focus:outline-none focus:border-amber-500 font-mono"
            />
          </div>

          <div className="flex items-center gap-2 text-xs font-mono">
            <span className="text-neutral-500 text-[11px]">Dispositivo:</span>
            <button
              type="button"
              onClick={() => setDeviceFilter('all')}
              className={`px-2.5 py-1 rounded-lg border text-[11px] cursor-pointer ${
                deviceFilter === 'all'
                  ? 'bg-amber-500 text-neutral-950 font-bold border-amber-400'
                  : 'bg-neutral-900 text-neutral-400 border-neutral-800 hover:text-white'
              }`}
            >
              Todos
            </button>
            <button
              type="button"
              onClick={() => setDeviceFilter('mobile')}
              className={`px-2.5 py-1 rounded-lg border text-[11px] cursor-pointer ${
                deviceFilter === 'mobile'
                  ? 'bg-amber-500 text-neutral-950 font-bold border-amber-400'
                  : 'bg-neutral-900 text-neutral-400 border-neutral-800 hover:text-white'
              }`}
            >
              Mobile
            </button>
            <button
              type="button"
              onClick={() => setDeviceFilter('desktop')}
              className={`px-2.5 py-1 rounded-lg border text-[11px] cursor-pointer ${
                deviceFilter === 'desktop'
                  ? 'bg-amber-500 text-neutral-950 font-bold border-amber-400'
                  : 'bg-neutral-900 text-neutral-400 border-neutral-800 hover:text-white'
              }`}
            >
              Desktop
            </button>
          </div>
        </div>

        {/* Table of Visitors */}
        <div className="bg-neutral-900 border border-neutral-800 rounded-3xl overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono">
              <thead className="bg-neutral-950 border-b border-neutral-800 text-neutral-400 text-[11px]">
                <tr>
                  <th className="p-4">DATA & HORA</th>
                  <th className="p-4">IP / LOCALIZAÇÃO</th>
                  <th className="p-4">DISPOSITIVO</th>
                  <th className="p-4">PÁGINA ACESSADA</th>
                  <th className="p-4">ORIGEM / CAMPANHA</th>
                  <th className="p-4 text-right">STATUS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-800">
                {filteredVisitors.length > 0 ? (
                  filteredVisitors.map((vis) => {
                    const isEnrollmentInterest = vis.isInterestedInEnrollment || vis.pagePath === '/matricula';
                    const formattedDate = new Date(vis.timestamp).toLocaleString('pt-BR', {
                      day: '2-digit',
                      month: '2-digit',
                      hour: '2-digit',
                      minute: '2-digit',
                    });

                    return (
                      <tr key={vis.id} className="hover:bg-neutral-800/30 transition-colors">
                        <td className="p-4 text-neutral-400 whitespace-nowrap">
                          {formattedDate}
                        </td>
                        <td className="p-4">
                          <div className="font-bold text-white">{vis.ip}</div>
                          <div className="text-[11px] text-neutral-400 flex items-center gap-1">
                            <MapPin className="w-3 h-3 text-neutral-500" />
                            {vis.city ? `${vis.city}, ${vis.state || 'BR'}` : 'Brasil'}
                          </div>
                        </td>
                        <td className="p-4">
                          <span className="inline-flex items-center gap-1.5 text-neutral-300 font-sans text-xs">
                            {vis.deviceType === 'mobile' ? (
                              <Smartphone className="w-3.5 h-3.5 text-amber-400" />
                            ) : vis.deviceType === 'tablet' ? (
                              <Tablet className="w-3.5 h-3.5 text-emerald-400" />
                            ) : (
                              <Monitor className="w-3.5 h-3.5 text-blue-400" />
                            )}
                            <span className="capitalize">{vis.deviceType}</span>
                          </span>
                        </td>
                        <td className="p-4">
                          <div className="font-sans font-bold text-white text-xs">
                            {vis.pageTitle || vis.pagePath}
                          </div>
                          <div className="text-[11px] text-neutral-400">{vis.pagePath}</div>
                        </td>
                        <td className="p-4 text-neutral-300">
                          <span className="text-xs truncate max-w-xs block font-sans">
                            {vis.referrer || 'Acesso Direto'}
                          </span>
                        </td>
                        <td className="p-4 text-right whitespace-nowrap">
                          {isEnrollmentInterest ? (
                            <span className="px-2 py-1 rounded-full text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40 font-sans">
                              Interesse em Matrícula
                            </span>
                          ) : (
                            <span className="px-2 py-0.5 rounded text-[10px] text-neutral-400 bg-neutral-950 border border-neutral-800 font-sans">
                              Navegação Geral
                            </span>
                          )}
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan={6} className="p-8 text-center text-neutral-500 font-mono text-xs">
                      Nenhuma visita registrada com os filtros aplicados.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Modal: Simular Visita Teste */}
      {customTestModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4 backdrop-blur-sm animate-fadeIn">
          <div className="bg-neutral-900 border border-neutral-800 rounded-3xl p-6 sm:p-8 max-w-md w-full space-y-5 shadow-2xl text-left">
            <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
              <h3 className="text-sm font-bold font-display text-white flex items-center gap-2">
                <Plus className="w-4 h-4 text-amber-400" />
                Registrar Visita Pública de Teste
              </h3>
              <button
                type="button"
                onClick={() => setCustomTestModalOpen(false)}
                className="text-neutral-400 hover:text-white text-xs cursor-pointer"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-neutral-300 leading-relaxed">
              Adicione uma visita para testar imediatamente o contador, a conversão e o registro de visitantes no painel:
            </p>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-neutral-400 mb-1 font-mono">Página Visitada:</label>
                <select
                  value={testPath}
                  onChange={(e) => setTestPath(e.target.value)}
                  className="w-full px-3 py-2 bg-neutral-950 border border-neutral-700 rounded-xl text-white font-mono text-xs focus:outline-none focus:border-amber-500"
                >
                  <option value="/matricula">/matricula – Inscrição & Matrícula (Com Interesse)</option>
                  <option value="/curso">/curso – Grade Curricular & Metodologia</option>
                  <option value="/apostilas">/apostilas – Apostilas Digitais</option>
                  <option value="/">/ – Página Inicial CINELAB</option>
                </select>
              </div>

              <div>
                <label className="block text-neutral-400 mb-1 font-mono">Dispositivo:</label>
                <div className="grid grid-cols-3 gap-2 font-mono">
                  <button
                    type="button"
                    onClick={() => setTestDevice('mobile')}
                    className={`py-2 px-3 rounded-xl border text-xs cursor-pointer ${
                      testDevice === 'mobile'
                        ? 'bg-amber-500 text-neutral-950 font-bold border-amber-400'
                        : 'bg-neutral-950 text-neutral-300 border-neutral-700'
                    }`}
                  >
                    Mobile
                  </button>
                  <button
                    type="button"
                    onClick={() => setTestDevice('desktop')}
                    className={`py-2 px-3 rounded-xl border text-xs cursor-pointer ${
                      testDevice === 'desktop'
                        ? 'bg-amber-500 text-neutral-950 font-bold border-amber-400'
                        : 'bg-neutral-950 text-neutral-300 border-neutral-700'
                    }`}
                  >
                    Desktop
                  </button>
                  <button
                    type="button"
                    onClick={() => setTestDevice('tablet')}
                    className={`py-2 px-3 rounded-xl border text-xs cursor-pointer ${
                      testDevice === 'tablet'
                        ? 'bg-amber-500 text-neutral-950 font-bold border-amber-400'
                        : 'bg-neutral-950 text-neutral-300 border-neutral-700'
                    }`}
                  >
                    Tablet
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-neutral-400 mb-1 font-mono">Origem / Referência:</label>
                <input
                  type="text"
                  value={testReferrer}
                  onChange={(e) => setTestReferrer(e.target.value)}
                  placeholder="Ex: Instagram Ads, Google, WhatsApp..."
                  className="w-full px-3 py-2 bg-neutral-950 border border-neutral-700 rounded-xl text-white font-mono text-xs focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-neutral-800">
              <button
                type="button"
                onClick={() => setCustomTestModalOpen(false)}
                className="px-4 py-2 bg-neutral-800 hover:bg-neutral-700 text-neutral-300 rounded-xl text-xs cursor-pointer"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={handleQuickAddTestVisitor}
                disabled={isAddingTest}
                className="px-5 py-2 bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold rounded-xl text-xs transition-all cursor-pointer flex items-center gap-1.5"
              >
                {isAddingTest ? 'Adicionando...' : 'Confirmar Visita'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
