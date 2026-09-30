const fs = require('fs');
const path = require('path');
const { PDFParse } = require('pdf-parse');
const { GoogleGenAI } = require('@google/genai');

const cachePath = path.join(__dirname, '..', 'server', 'pageTranslationsCache.json');

function loadCache() {
  try {
    if (fs.existsSync(cachePath)) {
      return JSON.parse(fs.readFileSync(cachePath, 'utf8'));
    }
  } catch (e) {
    console.error('Error loading cache:', e.message);
  }
  return {};
}

function saveCache(cache) {
  fs.writeFileSync(cachePath, JSON.stringify(cache, null, 2), 'utf8');
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
  const models = ['gemini-3.1-flash-lite', 'gemini-flash-latest', 'gemini-3.6-flash'];
  
  for (const model of models) {
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
        if (out && out.length > 50 && out !== text) {
          return out;
        }
      } catch (err) {
        console.warn(`[${model}] attempt ${attempt} failed:`, err.message);
        await sleep(1000);
      }
    }
  }
  return null;
}

async function run() {
  const cache = loadCache();
  const ai = new GoogleGenAI();

  // Clean corrupted/truncated keys from cache
  const cleanKeys = [
    '1_p2_fr', '1_p3_fr', '1_p4_fr', '1_p4_es', '1_p4_en',
    '1_p5_fr', '1_p6_es', '1_p7_fr', '1_p7_en', '1_p7_es', '1_p8_es',
    '2_p1_fr', '2_p1_es', '2_p1_en', '5_p1_fr', '8_p1_fr', '10_p1_fr'
  ];
  for (const k of cleanKeys) {
    if (cache[k] && cache[k].length < 1200) {
      delete cache[k];
    }
  }

  // Read Module 1 PDF
  const pdfPath = path.join(__dirname, '..', 'public', 'materiais', 'cinelab-apostila-01.pdf');
  const buf = fs.readFileSync(pdfPath);
  const parser = new PDFParse({ data: buf });
  const res = await parser.getText();

  console.log(`Module 1 has ${res.pages.length} pages.`);

  const targets = ['fr', 'es', 'en'];

  for (let pIdx = 0; pIdx < res.pages.length; pIdx++) {
    const pNum = pIdx + 1;
    const pageText = res.pages[pIdx].text.trim();
    if (!pageText || pageText.length < 25) {
      console.log(`Page ${pNum} has no text, skipping.`);
      continue;
    }

    console.log(`\n--- Module 1, Page ${pNum} (${pageText.length} chars) ---`);

    for (const lang of targets) {
      const primaryKey = `1_p${pNum}_${lang}`;
      const hashKey = `1_p${pNum}_${lang}_${pageText.length}_${pageText.slice(0, 30)}`;

      if (cache[primaryKey] && cache[primaryKey].length >= pageText.length * 0.6) {
        console.log(`[${lang}] Page ${pNum} already cached (len: ${cache[primaryKey].length})`);
        continue;
      }

      console.log(`[${lang}] Translating Page ${pNum}...`);
      const t0 = Date.now();
      const translated = await translateTextWithGemini(ai, pageText, lang);
      if (translated) {
        cache[primaryKey] = translated;
        cache[hashKey] = translated;
        saveCache(cache);
        console.log(`[${lang}] Page ${pNum} translated in ${Date.now() - t0}ms (len: ${translated.length})`);
      } else {
        console.error(`[${lang}] Page ${pNum} FAILED translation!`);
      }
      await sleep(500);
    }
  }

  saveCache(cache);
  console.log('Module 1 translation pre-generation finished successfully!');
}

run().catch(console.error);
