/**
 * Multi-Currency Conversion & Formatting Service for CINELAB
 * Supports Brazilian Real (BRL / R$), Euro (EUR / €), US Dollar (USD / $)
 * Handles accurate locale formatting, installment division and live rates.
 */

export type SupportedLanguage = 'pt' | 'en' | 'es' | 'fr';

export interface CurrencyConfig {
  code: 'BRL' | 'USD' | 'EUR';
  symbol: string;
  name: string;
  country: string;
  symbolPosition: 'before' | 'after';
  decimalSep: string;
  thousandSep: string;
  locale: string;
  defaultRate: number; // 1 BRL = X foreign currency
}

export const CURRENCY_CONFIGS: Record<SupportedLanguage, CurrencyConfig> = {
  pt: {
    code: 'BRL',
    symbol: 'R$',
    name: 'Real Brasileiro',
    country: 'Brasil',
    symbolPosition: 'before',
    decimalSep: ',',
    thousandSep: '.',
    locale: 'pt-BR',
    defaultRate: 1.0,
  },
  fr: {
    code: 'EUR',
    symbol: '€',
    name: 'Euro',
    country: 'France / Europe',
    symbolPosition: 'after',
    decimalSep: ',',
    thousandSep: ' ',
    locale: 'fr-FR',
    defaultRate: 0.165, // R$ 1.000 ≈ 165 € (1 EUR ≈ 6.06 BRL)
  },
  en: {
    code: 'USD',
    symbol: '$',
    name: 'US Dollar',
    country: 'United States / Global',
    symbolPosition: 'before',
    decimalSep: '.',
    thousandSep: ',',
    locale: 'en-US',
    defaultRate: 0.18, // R$ 1.000 ≈ $180 USD (1 USD ≈ 5.55 BRL)
  },
  es: {
    code: 'USD',
    symbol: '$',
    name: 'Dólar Estadounidense',
    country: 'Internacional / Hispanoamérica',
    symbolPosition: 'before',
    decimalSep: ',',
    thousandSep: '.',
    locale: 'es-ES',
    defaultRate: 0.18, // R$ 1.000 ≈ $180 USD
  },
};

// In-memory rates with robust fallback defaults
const activeRates: Record<string, number> = {
  BRL: 1.0,
  USD: 0.18,
  EUR: 0.165,
};

let liveRatesInitialized = false;

/**
 * Initializes and fetches live exchange rates in the background if possible.
 */
export async function initLiveCurrencyRates(): Promise<void> {
  if (liveRatesInitialized || typeof window === 'undefined') return;
  liveRatesInitialized = true;

  try {
    const res = await fetch('https://open.er-api.com/v6/latest/BRL');
    if (res.ok) {
      const data = await res.json();
      if (data?.rates?.USD && typeof data.rates.USD === 'number') {
        activeRates.USD = Number(data.rates.USD.toFixed(4));
      }
      if (data?.rates?.EUR && typeof data.rates.EUR === 'number') {
        activeRates.EUR = Number(data.rates.EUR.toFixed(4));
      }
    }
  } catch (err) {
    // Silently proceed with calibrated default rates
  }
}

/**
 * Converts a base BRL price to the target language currency.
 */
export function getConvertedValue(priceInBrl: number, lang: string): number {
  const safeLang = (lang as SupportedLanguage) in CURRENCY_CONFIGS ? (lang as SupportedLanguage) : 'pt';
  const cfg = CURRENCY_CONFIGS[safeLang];
  if (cfg.code === 'BRL') return priceInBrl;

  const rate = activeRates[cfg.code] || cfg.defaultRate;
  const rawConverted = priceInBrl * rate;
  return Math.round(rawConverted * 100) / 100;
}

/**
 * Formats a BRL price into a localized currency string.
 * Example:
 * pt -> "R$ 1.000,00"
 * fr -> "165,00 €"
 * en -> "$180.00"
 * es -> "$180,00"
 */
export function formatCurrencyPrice(priceInBrl: number, lang: string): string {
  const safeLang = (lang as SupportedLanguage) in CURRENCY_CONFIGS ? (lang as SupportedLanguage) : 'pt';
  const cfg = CURRENCY_CONFIGS[safeLang];
  const val = getConvertedValue(priceInBrl, lang);

  const formattedNum = val.toLocaleString(cfg.locale, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  if (cfg.symbolPosition === 'after') {
    return `${formattedNum} ${cfg.symbol}`;
  }
  return `${cfg.symbol} ${formattedNum}`;
}

export interface PriceParts {
  symbol: string;
  symbolPosition: 'before' | 'after';
  integerPart: string;
  decimalPart: string;
  decimalSep: string;
  fullFormatted: string;
  currencyCode: string;
}

/**
 * Returns structured price parts for custom typography / heroic pricing cards.
 */
export function getPriceDisplayParts(priceInBrl: number, lang: string): PriceParts {
  const safeLang = (lang as SupportedLanguage) in CURRENCY_CONFIGS ? (lang as SupportedLanguage) : 'pt';
  const cfg = CURRENCY_CONFIGS[safeLang];
  const val = getConvertedValue(priceInBrl, lang);

  const formattedNum = val.toLocaleString(cfg.locale, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  const sep = cfg.decimalSep;
  const parts = formattedNum.split(sep);
  const integerPart = parts[0] || '0';
  const decimalPart = parts[1] || '00';

  const fullFormatted =
    cfg.symbolPosition === 'after'
      ? `${formattedNum} ${cfg.symbol}`
      : `${cfg.symbol} ${formattedNum}`;

  return {
    symbol: cfg.symbol,
    symbolPosition: cfg.symbolPosition,
    integerPart,
    decimalPart,
    decimalSep: sep,
    fullFormatted,
    currencyCode: cfg.code,
  };
}

/**
 * Formats the installment badge text according to language & currency.
 */
export function formatInstallmentOption(
  priceInBrl: number,
  installmentsCount: number,
  lang: string
): string {
  const safeLang = (lang as SupportedLanguage) in CURRENCY_CONFIGS ? (lang as SupportedLanguage) : 'pt';
  const cfg = CURRENCY_CONFIGS[safeLang];
  const totalVal = getConvertedValue(priceInBrl, lang);
  const singleVal = Math.round((totalVal / installmentsCount) * 100) / 100;

  const formattedVal = singleVal.toLocaleString(cfg.locale, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  const currencyStr =
    cfg.symbolPosition === 'after'
      ? `${formattedVal} ${cfg.symbol}`
      : `${cfg.symbol} ${formattedVal}`;

  switch (safeLang) {
    case 'fr':
      return `ou jusqu'à ${installmentsCount} mensualités de ${currencyStr} par carte`;
    case 'en':
      return `or in up to ${installmentsCount}x card installments of ${currencyStr}`;
    case 'es':
      return `o hasta en ${installmentsCount} cuotas de ${currencyStr} con tarjeta`;
    case 'pt':
    default:
      return `ou em até ${installmentsCount}x de ${currencyStr} no cartão`;
  }
}

/**
 * Formats the real savings difference according to language & currency.
 */
export function formatSavingsText(
  originalPriceInBrl: number,
  promoPriceInBrl: number,
  lang: string
): string {
  const safeLang = (lang as SupportedLanguage) in CURRENCY_CONFIGS ? (lang as SupportedLanguage) : 'pt';
  const diffBrl = Math.max(0, originalPriceInBrl - promoPriceInBrl);
  const formattedDiff = formatCurrencyPrice(diffBrl, lang);

  switch (safeLang) {
    case 'fr':
      return `Économie réelle de ${formattedDiff} sur votre formation professionnelle !`;
    case 'en':
      return `Real savings of ${formattedDiff} on your professional training!`;
    case 'es':
      return `¡Ahorro real de ${formattedDiff} en tu formación profesional!`;
    case 'pt':
    default:
      return `Economia real de ${formattedDiff} na sua formação profissional!`;
  }
}
