import app from '../server.ts';

export default function handler(req: any, res: any) {
  try {
    return app(req, res);
  } catch (err: any) {
    console.error('[CINELAB API Error]:', err);
    if (!res.headersSent) {
      res.status(500).json({
        error: 'Erro interno na API CINELAB',
        message: err?.message || String(err),
      });
    }
  }
}
