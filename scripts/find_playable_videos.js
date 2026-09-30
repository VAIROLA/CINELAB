import https from 'https';

async function fetchUrl(url, headers = {}) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)', ...headers } }, (res) => {
      let data = '';
      res.on('data', (chunk) => (data += chunk));
      res.on('end', () => resolve(data));
    }).on('error', reject);
  });
}

async function checkPlayable(videoId) {
  try {
    const html = await fetchUrl(`https://www.youtube.com/watch?v=${videoId}`);
    const match = html.match(/"playabilityStatus":\{"status":"([^"]+)"/);
    const status = match ? match[1] : 'UNKNOWN';
    const titleMatch = html.match(/<title>([^<]+)<\/title>/);
    const title = titleMatch ? titleMatch[1].replace(' - YouTube', '').trim() : '';
    return { videoId, status, title };
  } catch (e) {
    return { videoId, status: 'ERROR', title: e.message };
  }
}

async function searchCandidates(query) {
  const url = `https://html.duckduckgo.com/html/?q=${encodeURIComponent(query + ' youtube')}`;
  const html = await fetchUrl(url);
  const regex = /(?:youtube\.com%2Fwatch%3Fv%3D|youtu\.be%2F|watch\?v=)([\w-]{11})/g;
  const ids = new Set();
  let m;
  while ((m = regex.exec(html)) !== null) {
    ids.add(m[1]);
  }
  return Array.from(ids);
}

const queries = [
  { film: 'Ilha das Flores', query: 'Ilha das Flores Jorge Furtado filme completo' },
  { film: 'O Encouraçado Potemkin', query: 'Battleship Potemkin full movie Sergei Eisenstein' },
  { film: 'O Sanduíche', query: 'curta O Sanduiche Jorge Furtado' },
  { film: 'Dona Cristina Perdeu a Memória', query: 'curta Dona Cristina Perdeu a Memoria Ana Luiza Azevedo' },
  { film: 'O Espelho Tarkovsky', query: 'The Mirror Tarkovsky full movie Mosfilm' },
  { film: 'Stalker Tarkovsky', query: 'Stalker Tarkovsky Mosfilm full movie' },
  { film: 'Escadaria de Odessa', query: 'Battleship Potemkin Odessa Steps scene' },
  { film: 'Bastidores Cinema', query: 'Making of cinema set de filmagem producao audiovisual' },
  { film: 'Recife Frio', query: 'Recife Frio Kleber Mendonca Filho curta' },
  { film: 'Curtas de Cinema', query: 'curta metragem premiado brasileiro cinema ficcao' },
  { film: 'A Noite Americana Truffaut', query: 'La Nuit Americaine Truffaut Day for Night scene' }
];

async function run() {
  for (const item of queries) {
    console.log(`\n=== Buscando: ${item.film} ===`);
    const candidates = await searchCandidates(item.query);
    console.log(`Candidatos encontrados: ${candidates.length}`);
    let found = false;
    for (const id of candidates.slice(0, 10)) {
      const result = await checkPlayable(id);
      if (result.status === 'OK') {
        console.log(`✓ ENCONTRADO PLAYABLE: https://www.youtube.com/watch?v=${id} - "${result.title}"`);
        found = true;
        break;
      } else {
        console.log(`  ✗ ${id} status: ${result.status}`);
      }
    }
    if (!found) {
      console.log(`Nenhum vídeo com status OK encontrado para ${item.film}`);
    }
  }
}

run();
