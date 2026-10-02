let cachedApp: any = null;

async function getApp() {
  if (cachedApp) return cachedApp;
  try {
    const mod = await import('../server.js');
    cachedApp = mod.default || mod.app || mod;
    return cachedApp;
  } catch (e1) {
    try {
      const mod = await import('../server.ts');
      cachedApp = mod.default || mod.app || mod;
      return cachedApp;
    } catch (e2) {
      console.error('[CINELAB Vercel Handler] Import failed:', e1, e2);
      throw e2;
    }
  }
}

export default async function handler(req: any, res: any) {
  try {
    const app = await getApp();
    return app(req, res);
  } catch (err: any) {
    console.error('[CINELAB Vercel API Error]:', err);
    if (!res.headersSent) {
      res.status(500).json({
        error: 'Erro interno no backend Vercel',
        message: err?.message || String(err),
      });
    }
  }
}
