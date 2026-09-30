if (!(Promise as any).try) {
  (Promise as any).try = function (fn: any, ...args: any[]) {
    return new Promise((resolve) => resolve(fn(...args)));
  };
}

import fs from 'fs';
import path from 'path';
import * as pdfjs from 'pdfjs-dist/legacy/build/pdf.mjs';
import { GoogleGenAI } from '@google/genai';

const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
  console.error('No GEMINI_API_KEY found!');
  process.exit(1);
}

const ai = new GoogleGenAI({ apiKey });
const cacheFile = path.join(process.cwd(), 'server', 'pageTranslationsCache.json');

let cache: Record<string, string> = {};
if (fs.existsSync(cacheFile)) {
  try {
    cache = JSON.parse(fs.readFileSync(cacheFile, 'utf-8'));
  } catch (e) {}
}

const languages: { code: string; name: string }[] = [
  { code: 'fr', name: 'Français (French)' },
  { code: 'en', name: 'English' },
  { code: 'es', name: 'Español (Spanish)' },
];

async function translateWithRetry(text: string, langName: string, attempts = 3): Promise<string> {
  const models = ['gemini-3.6-flash', 'gemini-3.8-flash'];
  for (let a = 1; a <= attempts; a++) {
    for (const model of models) {
      try {
        const res = await ai.models.generateContent({
          model,
          contents: text,
          config: {
            systemInstruction: `You are an elite film school professor and academic translator.
Translate the following cinema course textbook page completely from Portuguese into ${langName}.
CRITICAL INSTRUCTIONS:
- The entire output MUST be in ${langName}.
- Accurately preserve cinema terminology in ${langName} (découpage, mise-en-scène, plan moyen, gros plan, travelling, contrechamp, etc.).
- Retain clean paragraphs, bullet points, and headers.
- Return ONLY the translated educational content. Do not include introductory or concluding conversational notes.`,
          },
        });
        const out = res.text?.trim();
        if (out && out.length > 20 && out !== text) {
          return out;
        }
      } catch (err: any) {
        console.warn(`Attempt ${a} with ${model} error:`, err?.status || err?.message?.slice(0, 50));
        await new Promise((r) => setTimeout(r, 1000));
      }
    }
  }
  return '';
}

async function main() {
  const data = new Uint8Array(fs.readFileSync('public/materiais/cinelab-apostila-01.pdf'));
  const doc = await (pdfjs as any).getDocument({ data }).promise;
  console.log(`Extracting and translating ${doc.numPages} pages...`);

  for (let pageNum = 1; pageNum <= doc.numPages; pageNum++) {
    const page = await doc.getPage(pageNum);
    const tc = await page.getTextContent();
    let rawText = '';
    let lastY: number | null = null;
    for (const item of tc.items as any[]) {
      if (!item.str) continue;
      const currentY = item.transform ? item.transform[5] : null;
      if (lastY !== null && currentY !== null && Math.abs(currentY - lastY) > 9) {
        rawText += '\n';
      } else if (rawText && !rawText.endsWith(' ') && !rawText.endsWith('\n') && !item.str.startsWith(' ')) {
        rawText += ' ';
      }
      rawText += item.str;
      if (currentY !== null) lastY = currentY;
    }

    const trimmed = rawText.trim();
    if (!trimmed) continue;

    console.log(`\n=== PAGE ${pageNum} (length: ${trimmed.length}) ===`);

    for (const lang of languages) {
      // Look for any existing cache key for this page and language
      const exactKey = `1_p${pageNum}_${lang.code}_${trimmed.length}_${trimmed.slice(0, 30)}`;
      const prefixKey = `1_p${pageNum}_${lang.code}_`;

      const existingValid = Object.entries(cache).find(([k, v]) => {
        if (!k.startsWith(prefixKey)) return false;
        // Verify not untranslated portuguese
        if (v.includes('Bem - vindo') || v.includes('CURSO ONLINE DE CINEMA E AUDIOVISUAL')) {
          if (lang.code !== 'pt') return false;
        }
        return v.length > 50;
      });

      if (existingValid) {
        console.log(`Page ${pageNum} [${lang.code}] already cached.`);
        // Ensure exact key is mapped
        cache[exactKey] = existingValid[1];
        continue;
      }

      console.log(`Translating Page ${pageNum} into ${lang.name}...`);
      const translation = await translateWithRetry(trimmed, lang.name);
      if (translation) {
        cache[exactKey] = translation;
        // Also add generic key without length if needed
        cache[`1_p${pageNum}_${lang.code}`] = translation;
        fs.writeFileSync(cacheFile, JSON.stringify(cache, null, 2), 'utf-8');
        console.log(`Saved Page ${pageNum} [${lang.code}] (${translation.length} chars)`);
      } else {
        console.error(`FAILED to translate Page ${pageNum} into ${lang.code}`);
      }
      // Small pause between calls
      await new Promise((r) => setTimeout(r, 600));
    }
  }

  console.log('\nPRE-TRANSLATION COMPLETE!');
  process.exit(0);
}

main().catch(console.error);
