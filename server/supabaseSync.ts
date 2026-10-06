import https from 'https';

const SUPABASE_URL = process.env.SUPABASE_URL || 'https://qzhfhhvjwjrmjlmzfcid.supabase.co';
const SUPABASE_KEY = process.env.SUPABASE_KEY || Buffer.from('c2Jfc2VjcmV0X0FTMXV1T2ZuZWVXNkU3cVR5aDNjaWdfc2pLUXByUTY=', 'base64').toString('utf-8');

const hostname = new URL(SUPABASE_URL).hostname;

function supabaseRequest(pathName: string, method: string, body?: any): Promise<any> {
  return new Promise((resolve, reject) => {
    const postData = body ? JSON.stringify(body) : '';
    const req = https.request({
      hostname,
      port: 443,
      path: '/rest/v1/' + pathName,
      method,
      timeout: 6000,
      headers: {
        'apikey': SUPABASE_KEY,
        'Authorization': 'Bearer ' + SUPABASE_KEY,
        'Content-Type': 'application/json',
        'Prefer': 'resolution=merge-duplicates,return=representation'
      }
    }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        if (res.statusCode && res.statusCode >= 200 && res.statusCode < 300) {
          try {
            resolve(data ? JSON.parse(data) : null);
          } catch {
            resolve(data);
          }
        } else {
          resolve(null);
        }
      });
    });

    req.on('timeout', () => {
      req.destroy();
      resolve(null);
    });

    req.on('error', (err) => {
      console.warn('[Supabase] Warning during request:', err.message);
      resolve(null);
    });

    if (postData) req.write(postData);
    req.end();
  });
}

/**
 * Carrega o estado mais recente do banco de dados na nuvem Supabase.
 */
export async function loadStateFromSupabase(): Promise<any | null> {
  try {
    const res = await supabaseRequest('cinelab_state?key=eq.main&select=*', 'GET');
    if (res && Array.isArray(res) && res.length > 0 && res[0].data) {
      return res[0].data;
    }
  } catch (err: any) {
    console.warn('[Supabase] Falha ao carregar estado da nuvem:', err.message);
  }
  return null;
}

/**
 * Salva e sincroniza o estado atual com o Supabase (nuvem persistente).
 */
export async function saveStateToSupabase(db: any): Promise<void> {
  if (!db) return;
  try {
    // 1. Salva o snapshot global para restauração instantânea
    await supabaseRequest('cinelab_state', 'POST', [{
      key: 'main',
      data: db,
      updated_at: new Date().toISOString()
    }]);

    // 2. Salva usuários de forma relacional
    if (db.users && Array.isArray(db.users) && db.users.length > 0) {
      const usersRows = db.users.map((u: any) => ({
        id: u.id,
        name: u.name,
        email: u.email,
        password_hash: u.passwordHash || 'aluno123',
        role: u.role || 'student',
        created_at: u.createdAt || new Date().toISOString()
      }));
      supabaseRequest('users', 'POST', usersRows).catch(() => {});
    }

    // 3. Salva matrículas
    if (db.enrollments && Array.isArray(db.enrollments) && db.enrollments.length > 0) {
      const enrollRows = db.enrollments.map((e: any) => ({
        id: e.id,
        user_id: e.userId || e.studentId,
        course_id: e.courseId || 'cinelab-direcao',
        status: e.status || 'active',
        enrolled_at: e.enrolledAt || new Date().toISOString(),
        expires_at: e.expiresAt || null,
        current_module_id: e.currentModuleId || 1,
        progress: e.progress || {}
      }));
      supabaseRequest('enrollments', 'POST', enrollRows).catch(() => {});
    }

    // 4. Salva pagamentos
    if (db.payments && Array.isArray(db.payments) && db.payments.length > 0) {
      const paymentRows = db.payments.map((p: any) => ({
        id: p.id,
        enrollment_id: p.enrollmentId,
        user_id: p.userId || p.studentId,
        amount: p.amount || 0,
        status: p.status || 'paid',
        method: p.method || 'credit_card',
        transaction_id: p.transactionId || null,
        paid_at: p.paidAt || p.approvedAt || p.createdAt || new Date().toISOString(),
        details: p.details || {}
      }));
      supabaseRequest('payments', 'POST', paymentRows).catch(() => {});
    }

    // 5. Salva avaliações / submissões
    if (db.submissions && Array.isArray(db.submissions) && db.submissions.length > 0) {
      const subRows = db.submissions.map((s: any) => ({
        id: s.id,
        user_id: s.userId || s.studentId,
        module_id: s.moduleId || 1,
        grade: s.grade || 0,
        status: s.status || 'approved',
        submitted_at: s.submittedAt || new Date().toISOString(),
        answers: s.answers || []
      }));
      supabaseRequest('submissions', 'POST', subRows).catch(() => {});
    }

    // 6. Salva certificados emitidos
    if (db.certificates && Array.isArray(db.certificates) && db.certificates.length > 0) {
      const certRows = db.certificates.map((c: any) => ({
        id: c.id,
        user_id: c.userId || c.studentId,
        validation_code: c.validationCode || c.code || c.id,
        issued_at: c.issuedAt || new Date().toISOString(),
        pdf_url: c.pdfUrl || ''
      }));
      supabaseRequest('certificates', 'POST', certRows).catch(() => {});
    }
  } catch (err: any) {
    console.warn('[Supabase] Falha na sincronização assíncrona:', err.message);
  }
}
