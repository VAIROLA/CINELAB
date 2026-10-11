import { StrictMode, Component, ReactNode, ErrorInfo } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { LanguageProvider } from './i18n/LanguageContext.js';
import './index.css';

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

class RootErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('RootErrorBoundary caught error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ minHeight: '100vh', backgroundColor: '#0c0d10', color: '#e4e6eb', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px', fontFamily: 'sans-serif', textAlign: 'center' }}>
          <div style={{ maxWidth: '480px', padding: '32px', borderRadius: '16px', backgroundColor: '#14161f', border: '1px solid rgba(245, 158, 11, 0.3)' }}>
            <h2 style={{ fontSize: '20px', fontWeight: 'bold', color: '#f59e0b', marginBottom: '12px' }}>CINELAB</h2>
            <p style={{ fontSize: '14px', color: '#cbd5e1', marginBottom: '20px', lineHeight: '1.5' }}>
              Ocorreu uma pequena instabilidade ao carregar a interface. Clique abaixo para recarregar o portal.
            </p>
            {this.state.error?.message && (
              <div style={{ margin: '0 0 20px', padding: '10px 14px', background: 'rgba(239, 68, 68, 0.15)', border: '1px solid rgba(239, 68, 68, 0.4)', borderRadius: '10px', color: '#fca5a5', fontSize: '11px', textAlign: 'left', overflowX: 'auto', fontFamily: 'monospace' }}>
                Detalhes: {this.state.error.message}
              </div>
            )}
            <button
              onClick={() => {
                try { localStorage.removeItem('cinelab_tutor_chat_guest'); } catch {}
                window.location.reload();
              }}
              style={{ backgroundColor: '#f59e0b', color: '#000', fontWeight: 'bold', padding: '10px 20px', borderRadius: '10px', border: 'none', cursor: 'pointer', fontSize: '13px' }}
            >
              Recarregar Plataforma
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RootErrorBoundary>
      <LanguageProvider>
        <App />
      </LanguageProvider>
    </RootErrorBoundary>
  </StrictMode>,
);

