const fs = require('fs');
const path = require('path');
const { PDFParse } = require('pdf-parse');
const { GoogleGenAI } = require('@google/genai');

const cachePath = path.join(__dirname, '..', 'server', 'pageTranslationsCache.json');
const logPath = path.join(__dirname, '..', 'pretranslate.log');

function log(msg) {
  const line = `[${new Date().toISOString()}] ${msg}`;
  console.log(line);
  try {
    fs.appendFileSync(logPath, line + '\n', 'utf8');
  } catch (e) {}
}

function loadCache() {
  try {
    if (fs.existsSync(cachePath)) {
      return JSON.parse(fs.readFileSync(cachePath, 'utf8'));
    }
  } catch (e) {
    log(`Error loading cache: ${e.message}`);
  }
  return {};
}

function saveCache(cache) {
  try {
    fs.writeFileSync(cachePath, JSON.stringify(cache, null, 2), 'utf8');
  } catch (e) {
    log(`Error saving cache: ${e.message}`);
  }
}

async function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const languageNames = {
  fr: 'Français (French)',
  es: 'Español (Spanish)',
  en: 'English',
};

async function translateTextWithGemini(ai, text, targetLang) {
  const langName = languageNames[targetLang];
  const candidateModels = ['gemini-3.1-flash-lite', 'gemini-3.8-flash'];
  
  for (const model of candidateModels) {
    for (let attempt = 1; attempt <= 2; attempt++) {
      try {
        const resp = await ai.models.generateContent({
          model,
          contents: text,
          config: {
            systemInstruction: `You are an elite film school professor and academic translator specializing in cinematic arts and audiovisual studies.
Translate the provided film study text from Portuguese directly, completely, and accurately into ${langName}.
CRITICAL REQUIREMENTS:
- The entire output MUST be in ${langName}.
- Translate EVERY SINGLE SENTENCE, heading, bullet point, practical exercise, and director note thoroughly.
- DO NOT summarize, condense, or omit ANY part of the text. The translation must be complete and faithful to the full original handout page.
- Accurately preserve cinema terminology in ${langName} (such as: découpage, mise-en-scène, plan moyen, gros plan, contrechamp, travelling, dolly, clapboard, etc.).
- Maintain clean formatting, paragraphs, and bullet points.
- Output ONLY the translated text. Do NOT add conversational notes, greetings, or meta commentary.`
          }
        });

        const out = resp.text?.trim();
        if (out && out.length > 25 && out !== text) {
          return out;
        }
      } catch (err) {
        const msg = err.message || '';
        log(`[${model} attempt ${attempt}] ${targetLang} error: ${msg.slice(0, 100)}`);
        
        if (msg.includes('429') || msg.includes('RESOURCE_EXHAUSTED')) {
          let waitMs = 35000;
          const match = msg.match(/retry in ([0-9.]+)s/);
          if (match && match[1]) {
            waitMs = Math.ceil(parseFloat(match[1]) * 1000) + 3000;
          }
          log(`Rate limit window hit. Sleeping for ${Math.round(waitMs / 1000)}s before retry...`);
          await sleep(waitMs);
        } else if (msg.includes('503') || msg.includes('UNAVAILABLE')) {
          log('Service unavailable (503). Waiting 5s...');
          await sleep(5000);
        } else {
          await sleep(2000);
        }
      }
    }
  }
  return null;
}

async function run() {
  log('--- STARTING CLEAN PACED TRANSLATION BATCH ---');
  const cache = loadCache();
  const ai = new GoogleGenAI();
  const targets = ['fr', 'es', 'en'];

  for (let modNum = 1; modNum <= 10; modNum++) {
    const pad = modNum.toString().padStart(2, '0');
    const pdfPath = path.join(__dirname, '..', 'public', 'materiais', `cinelab-apostila-${pad}.pdf`);
    if (!fs.existsSync(pdfPath)) {
      log(`Module ${modNum} PDF not found at ${pdfPath}, skipping.`);
      continue;
    }

    const buf = fs.readFileSync(pdfPath);
    const parser = new PDFParse({ data: buf });
    const res = await parser.getText();

    log(`\n=== Module ${modNum} (${pad}): ${res.pages.length} pages total ===`);

    for (let pIdx = 0; pIdx < res.pages.length; pIdx++) {
      const pNum = pIdx + 1;
      const pageText = res.pages[pIdx].text.trim();
      if (!pageText || pageText.length < 20) {
        continue;
      }

      for (const lang of targets) {
        const primaryKey = `${modNum}_p${pNum}_${lang}`;
        const hashKey = `${modNum}_p${pNum}_${lang}_${pageText.length}_${pageText.slice(0, 30)}`;

        // Check if cache already has a complete translation (>55% length of source)
        if (cache[primaryKey] && cache[primaryKey].length >= Math.min(pageText.length * 0.55, 200)) {
          const lower = cache[primaryKey].toLowerCase();
          const isGeneric = 
            lower.includes('l\'évolution du septième art') ||
            lower.includes('la chaîne de production') ||
            lower.includes('las etapas de la producción') ||
            lower.includes('shot scale and the grammar') ||
            lower.includes('direction de la photographie et éclairage') ||
            lower.includes('production exécutive et organisation');
          
          if (!isGeneric || pageText.length < 400) {
            continue; // Already cleanly cached
          }
        }

        log(`[Mod ${modNum} P${pNum} - ${lang}] Translating (${pageText.length} chars)...`);
        const t0 = Date.now();
        const translated = await translateTextWithGemini(ai, pageText, lang);
        if (translated) {
          cache[primaryKey] = translated;
          cache[hashKey] = translated;
          saveCache(cache);
          log(`[Mod ${modNum} P${pNum} - ${lang}] OK in ${Date.now() - t0}ms (len: ${translated.length})`);
        } else {
          log(`[Mod ${modNum} P${pNum} - ${lang}] SKIPPED AFTER RETRIES`);
        }
        
        // Pacing to strictly avoid 20 RPM limit (4.8s = ~12.5 req/min)
        await sleep(4800);
      }
    }
  }

  saveCache(cache);
  log('\n=== ALL MODULES PROCESSED SUCCESSFULLY! ===');
}

run().catch((e) => log('FATAL ERROR: ' + e.message));
