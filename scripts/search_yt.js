import https from 'https';

async function fetchUrl(url) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36', 'Accept-Language': 'pt-BR,pt;q=0.9,en-US;q=0.8,en;q=0.7' } }, (res) => {
      let data = '';
      res.on('data', (chunk) => (data += chunk));
      res.on('end', () => resolve(data));
    }).on('error', reject);
  });
}

async function searchYouTube(query) {
  try {
    const html = await fetchUrl(`https://www.youtube.com/results?search_query=${encodeURIComponent(query)}`);
    const regex = /"videoId":"([\w-]{11})"/g;
    const ids = [];
    let m;
    while ((m = regex.exec(html)) !== null) {
      if (!ids.includes(m[1])) ids.push(m[1]);
      if (ids.length >= 8) break;
    }
    return ids;
  } catch (e) {
    return [];
  }
}

async function checkPlayable(videoId) {
  try {
    const html = await fetchUrl(`https://www.youtube.com/watch?v=${videoId}`);
    const match = html.match(/"playabilityStatus":\{"status":"([^"]+)"/);
    const status = match ? match[1] : 'UNKNOWN';
    const titleMatch = html.match(/<title>([^<]+)<\/title>/);
    const title = titleMatch ? titleMatch[1].replace(' - YouTube', '').trim() : '';
    // Also check if embeddable
    const embeddable = !html.includes('"reason":"Playback on other websites has been disabled by the video owner"');
    return { videoId, status, title, embeddable };
  } catch (e) {
    return { videoId, status: 'ERROR', title: e.message, embeddable: false };
  }
}

const queries = [
  { film: 'Ilha das Flores', query: 'Ilha das Flores 1989 Jorge Furtado' },
  { film: 'O Encouraçado Potemkin', query: 'Battleship Potemkin full movie 1925' },
  { film: 'O Sanduíche', query: 'curta O Sanduíche Jorge Furtado 2000' },
  { film: 'Dona Cristina Perdeu a Memória', query: 'curta Dona Cristina Perdeu a Memória' },
  { film: 'O Espelho Tarkovsky', query: 'The Mirror Andrei Tarkovsky full movie Mosfilm' },
  { film: 'Stalker Tarkovsky', query: 'Stalker Andrei Tarkovsky full movie Mosfilm' },
  { film: 'Escadaria de Odessa', query: 'Odessa Steps Battleship Potemkin scene' },
  { film: 'Bastidores Cinema Set', query: 'making of cinema set de filmagem' },
  { film: 'Recife Frio', query: 'Recife Frio Kleber Mendonça Filho' },
  { film: 'Curta Metragem Premiado Brasileiro', query: 'curta metragem premiado brasileiro' },
  { film: 'A Noite Americana Truffaut', query: 'La Nuit Americaine Day for Night Francois Truffaut' }
];

async function run() {
  const verified = {};
  for (const item of queries) {
    console.log(`\n=== Buscando: ${item.film} ===`);
    const ids = await searchYouTube(item.query);
    console.log(`IDs encontrados: ${ids.join(', ')}`);
    let found = false;
    for (const id of ids) {
      const res = await checkPlayable(id);
      if (res.status === 'OK' && res.embeddable) {
        console.log(`  ✓ PLAYABLE & EMBEDDABLE: https://www.youtube.com/watch?v=${id} - "${res.title}"`);
        verified[item.film] = { id, title: res.title, url: `https://www.youtube.com/watch?v=${id}` };
        found = true;
        break;
      } else {
        console.log(`  ✗ ${id} status: ${res.status}, embeddable: ${res.embeddable} - "${res.title}"`);
      }
    }
  }
  console.log('\n\nRESUMO VERIFICADO:');
  console.log(JSON.stringify(verified, null, 2));
}

run();
