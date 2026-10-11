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
  try {
    const safePrice = typeof priceInBrl === 'number' && !isNaN(priceInBrl) ? priceInBrl : 1000.00;
    const safeLang = (lang as SupportedLanguage) in CURRENCY_CONFIGS ? (lang as SupportedLanguage) : 'pt';
    const cfg = CURRENCY_CONFIGS[safeLang];
    if (cfg.code === 'BRL') return safePrice;

    const rate = activeRates[cfg.code] || cfg.defaultRate;
    const rawConverted = safePrice * rate;
    return Math.round(rawConverted * 100) / 100;
  } catch (e) {
    return Number(priceInBrl || 1000.00);
  }
}

/**
 * Formats a BRL price into a localized currency string.
 * Example:
 * pt -> "R$ 1.000,00"
 * fr -> "165,00 €"
 * en -> "$ 180.00"
 * es -> "$ 180,00"
 */
export function formatCurrencyPrice(priceInBrl: number, lang: string): string {
  try {
    const safePrice = typeof priceInBrl === 'number' && !isNaN(priceInBrl) ? priceInBrl : 1000.00;
    const safeLang = (lang as SupportedLanguage) in CURRENCY_CONFIGS ? (lang as SupportedLanguage) : 'pt';
    const cfg = CURRENCY_CONFIGS[safeLang];
    const val = getConvertedValue(safePrice, lang);

    const formattedNum = val.toLocaleString(cfg.locale, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

    if (cfg.symbolPosition === 'after') {
      return `${formattedNum} ${cfg.symbol}`;
    }
    return `${cfg.symbol} ${formattedNum}`;
  } catch (e) {
    return `R$ ${Number(priceInBrl || 1000).toFixed(2)}`;
  }
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
  try {
    const safePrice = typeof priceInBrl === 'number' && !isNaN(priceInBrl) ? priceInBrl : 1000.00;
    const safeLang = (lang as SupportedLanguage) in CURRENCY_CONFIGS ? (lang as SupportedLanguage) : 'pt';
    const cfg = CURRENCY_CONFIGS[safeLang];
    const val = getConvertedValue(safePrice, lang);

    const formattedNum = val.toLocaleString(cfg.locale, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

    const match = formattedNum.match(/^(.*)[,.](\d{2})$/);
    const integerPart = match ? match[1] : Math.floor(val).toString();
    const decimalPart = match ? match[2] : '00';
    const decimalSep = cfg.decimalSep || ',';

    const fullFormatted =
      cfg.symbolPosition === 'after'
        ? `${formattedNum} ${cfg.symbol}`
        : `${cfg.symbol} ${formattedNum}`;

    return {
      symbol: cfg.symbol,
      symbolPosition: cfg.symbolPosition,
      integerPart,
      decimalPart,
      decimalSep,
      fullFormatted,
      currencyCode: cfg.code,
    };
  } catch (e) {
    return {
      symbol: 'R$',
      symbolPosition: 'before',
      integerPart: '1.000',
      decimalPart: '00',
      decimalSep: ',',
      fullFormatted: 'R$ 1.000,00',
      currencyCode: 'BRL',
    };
  }
}

/**
 * Formats the installment badge text according to language & currency.
 */
export function formatInstallmentOption(
  priceInBrl: number,
  installmentsCount: number,
  lang: string
): string {
  try {
    const safeCount = Math.max(1, Number(installmentsCount) || 12);
    const safePrice = typeof priceInBrl === 'number' && !isNaN(priceInBrl) ? priceInBrl : 1000.00;
    const safeLang = (lang as SupportedLanguage) in CURRENCY_CONFIGS ? (lang as SupportedLanguage) : 'pt';
    const cfg = CURRENCY_CONFIGS[safeLang];
    const totalVal = getConvertedValue(safePrice, lang);
    const singleVal = Math.round((totalVal / safeCount) * 100) / 100;

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
        return `ou jusqu'à ${safeCount} mensualités de ${currencyStr} par carte`;
      case 'en':
        return `or in up to ${safeCount}x card installments of ${currencyStr}`;
      case 'es':
        return `o hasta en ${safeCount} cuotas de ${currencyStr} con tarjeta`;
      case 'pt':
      default:
        return `ou em até ${safeCount}x de ${currencyStr} no cartão`;
    }
  } catch (e) {
    return `ou em até 12x de R$ 83,33 no cartão`;
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
  try {
    const safeOrig = typeof originalPriceInBrl === 'number' && !isNaN(originalPriceInBrl) ? originalPriceInBrl : 2000.00;
    const safePromo = typeof promoPriceInBrl === 'number' && !isNaN(promoPriceInBrl) ? promoPriceInBrl : 1000.00;
    const safeLang = (lang as SupportedLanguage) in CURRENCY_CONFIGS ? (lang as SupportedLanguage) : 'pt';
    const diffBrl = Math.max(0, safeOrig - safePromo);
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
  } catch (e) {
    return `Economia real de R$ 1.000,00 na sua formação profissional!`;
  }
}
