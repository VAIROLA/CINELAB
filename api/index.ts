let cachedApp: any = null;
let initError: any = null;

async function getApp() {
  if (cachedApp) return cachedApp;
  if (initError) throw initError;

  const logs: string[] = [];

  try {
    const mod = await import('../server.ts');
    cachedApp = mod.default || mod.app;
    return cachedApp;
  } catch (err1: any) {
    logs.push(`server.ts error: ${err1?.message}\n${err1?.stack}`);
  }

  try {
    const mod = await import('../server.js');
    cachedApp = mod.default || mod.app;
    return cachedApp;
  } catch (err2: any) {
    logs.push(`server.js error: ${err2?.message}\n${err2?.stack}`);
  }

  initError = new Error(`Failed to initialize CINELAB backend:\n` + logs.join('\n---\n'));
  throw initError;
}

export default async function handler(req: any, res: any) {
  try {
    const app = await getApp();
    return app(req, res);
  } catch (err: any) {
    console.error('[CINELAB Vercel Handler Error]:', err);
    if (!res.headersSent) {
      res.status(500).json({
        error: 'Erro na inicialização da API na Vercel',
        message: err?.message || String(err),
        stack: err?.stack,
        env: {
          nodeEnv: process.env.NODE_ENV,
          vercel: process.env.VERCEL,
          cwd: process.cwd(),
        },
      });
    }
  }
}
