import fs from 'fs';
import path from 'path';
import https from 'https';

const SUPABASE_URL = process.env.SUPABASE_URL || 'https://qzhfhhvjwjrmjlmzfcid.supabase.co';
const SUPABASE_KEY = process.env.SUPABASE_KEY || Buffer.from('c2Jfc2VjcmV0X0FTMXV1T2ZuZWVXNkU3cVR5aDNjaWdfc2pLUXByUTY=', 'base64').toString('utf-8');

const host = new URL(SUPABASE_URL).hostname;

function supabaseRequest(pathName, method, body) {
  return new Promise((resolve, reject) => {
    const postData = body ? JSON.stringify(body) : '';
    const req = https.request({
      hostname: host,
      port: 443,
      path: '/rest/v1/' + pathName,
      method: method,
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
        if (res.statusCode >= 200 && res.statusCode < 300) {
          try {
            resolve(data ? JSON.parse(data) : null);
          } catch {
            resolve(data);
          }
        } else {
          reject(new Error(`[${res.statusCode}] ${data}`));
        }
      });
    });
    req.on('error', reject);
    if (postData) req.write(postData);
    req.end();
  });
}

async function migrate() {
  console.log('--- Iniciando Migração para o Supabase ---');
  const dbFile = path.join(process.cwd(), 'data', 'cinelab-db.json');
  if (!fs.existsSync(dbFile)) {
    console.error('Arquivo data/cinelab-db.json não encontrado!');
    return;
  }

  const raw = fs.readFileSync(dbFile, 'utf-8');
  const db = JSON.parse(raw);

  console.log('1. Salvando estado completo na tabela cinelab_state...');
  await supabaseRequest('cinelab_state', 'POST', [{
    key: 'main',
    data: db,
    updated_at: new Date().toISOString()
  }]);
  console.log('✓ cinelab_state gravado com sucesso!');

  if (db.users && db.users.length > 0) {
    console.log(`2. Migrando ${db.users.length} usuários para a tabela users...`);
    const usersRows = db.users.map(u => ({
      id: u.id,
      name: u.name,
      email: u.email,
      password_hash: u.passwordHash || 'aluno123',
      role: u.role || 'student',
      created_at: u.createdAt || new Date().toISOString()
    }));
    await supabaseRequest('users', 'POST', usersRows);
    console.log('✓ Usuários migrados com sucesso!');
  }

  if (db.enrollments && db.enrollments.length > 0) {
    console.log(`3. Migrando ${db.enrollments.length} matrículas para a tabela enrollments...`);
    const enrollRows = db.enrollments.map(e => ({
      id: e.id,
      user_id: e.userId || e.studentId,
      course_id: e.courseId || 'cinelab-direcao',
      status: e.status || 'active',
      enrolled_at: e.enrolledAt || new Date().toISOString(),
      expires_at: e.expiresAt || null,
      current_module_id: e.currentModuleId || 1,
      progress: e.progress || {}
    }));
    await supabaseRequest('enrollments', 'POST', enrollRows);
    console.log('✓ Matrículas migradas com sucesso!');
  }

  if (db.payments && db.payments.length > 0) {
    console.log(`4. Migrando ${db.payments.length} pagamentos para a tabela payments...`);
    const paymentRows = db.payments.map(p => ({
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
    await supabaseRequest('payments', 'POST', paymentRows);
    console.log('✓ Pagamentos migrados com sucesso!');
  }

  if (db.submissions && db.submissions.length > 0) {
    console.log(`5. Migrando ${db.submissions.length} avaliações para a tabela submissions...`);
    const subRows = db.submissions.map(s => ({
      id: s.id,
      module_id: s.moduleId || 1,
      enrollment_id: s.enrollmentId || null,
      student_id: s.studentId || null,
      score: s.score || 0,
      status: s.status || 'graded',
      submitted_at: s.submittedAt || new Date().toISOString(),
      feedback: s.feedback || null,
      answers: s.answers || []
    }));
    await supabaseRequest('submissions', 'POST', subRows);
    console.log('✓ Avaliações migradas com sucesso!');
  }

  if (db.certificates && db.certificates.length > 0) {
    console.log(`6. Migrando ${db.certificates.length} certificados para a tabela certificates...`);
    const certRows = db.certificates.map(c => ({
      id: c.id,
      student_id: c.studentId,
      enrollment_id: c.enrollmentId,
      code: c.code,
      title: c.title || 'Certificado de Conclusão CINELAB',
      issued_at: c.issuedAt || new Date().toISOString(),
      url: c.url || null
    }));
    await supabaseRequest('certificates', 'POST', certRows);
    console.log('✓ Certificados migrados com sucesso!');
  }

  console.log('=== MIGRAÇÃO CONCLUÍDA COM SUCESSO! ===');
}

migrate().catch(err => {
  console.error('Erro na migração:', err);
  process.exit(1);
});
