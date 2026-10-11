/**
 * Multi-Currency Conversion & Formatting Service for CINELAB
 * Supports Brazilian Real (BRL / R$), Euro (EUR / €), US Dollar (USD / $)
 * Handles accurate locale formatting, installment division, manual currency switching and live rates.
 */

export type SupportedLanguage = 'pt' | 'en' | 'es' | 'fr';
export type CurrencyCode = 'BRL' | 'USD' | 'EUR';

export interface CurrencyConfig {
  code: CurrencyCode;
  symbol: string;
  name: string;
  country: string;
  symbolPosition: 'before' | 'after';
  decimalSep: string;
  thousandSep: string;
  locale: string;
  defaultRate: number; // 1 BRL = X foreign currency
}

export interface CurrencyOption {
  code: CurrencyCode;
  symbol: string;
  flag: string;
  name: string;
  label: string;
}

export const AVAILABLE_CURRENCIES: CurrencyOption[] = [
  { code: 'BRL', symbol: 'R$', flag: '🇧🇷', name: 'Real', label: 'R$ Real' },
  { code: 'USD', symbol: '$', flag: '🇺🇸', name: 'Dólar', label: '$ Dólar' },
  { code: 'EUR', symbol: '€', flag: '🇪🇺', name: 'Euro', label: '€ Euro' },
];

export const CURRENCY_CONFIGS_BY_CODE: Record<CurrencyCode, CurrencyConfig> = {
  BRL: {
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
  USD: {
    code: 'USD',
    symbol: '$',
    name: 'US Dollar',
    country: 'EUA / Global / América Latina',
    symbolPosition: 'before',
    decimalSep: '.',
    thousandSep: ',',
    locale: 'en-US',
    defaultRate: 0.18, // R$ 1.000 ≈ $180 USD (1 USD ≈ 5.55 BRL)
  },
  EUR: {
    code: 'EUR',
    symbol: '€',
    name: 'Euro',
    country: 'Europa / França / Espanha',
    symbolPosition: 'after',
    decimalSep: ',',
    thousandSep: ' ',
    locale: 'fr-FR',
    defaultRate: 0.165, // R$ 1.000 ≈ 165 € (1 EUR ≈ 6.06 BRL)
  },
};

export const CURRENCY_CONFIGS: Record<SupportedLanguage, CurrencyConfig> = {
  pt: CURRENCY_CONFIGS_BY_CODE.BRL,
  en: CURRENCY_CONFIGS_BY_CODE.USD,
  es: CURRENCY_CONFIGS_BY_CODE.USD,
  fr: CURRENCY_CONFIGS_BY_CODE.EUR,
};

// In-memory rates with robust fallback defaults
const activeRates: Record<CurrencyCode, number> = {
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
 * Resolves a currency config either from a currency code ('BRL', 'USD', 'EUR')
 * or from a language code ('pt', 'en', 'es', 'fr').
 */
export function resolveCurrencyConfig(currencyOrLang?: string): CurrencyConfig {
  if (currencyOrLang === 'BRL') return CURRENCY_CONFIGS_BY_CODE.BRL;
  if (currencyOrLang === 'USD') return CURRENCY_CONFIGS_BY_CODE.USD;
  if (currencyOrLang === 'EUR') return CURRENCY_CONFIGS_BY_CODE.EUR;
  if (currencyOrLang === 'fr') return CURRENCY_CONFIGS_BY_CODE.EUR;
  if (currencyOrLang === 'en' || currencyOrLang === 'es') return CURRENCY_CONFIGS_BY_CODE.USD;
  return CURRENCY_CONFIGS_BY_CODE.BRL;
}

/**
 * Converts a base BRL price to the target currency or language.
 */
export function getConvertedValue(priceInBrl: number, currencyOrLang?: string): number {
  try {
    const safePrice = typeof priceInBrl === 'number' && !isNaN(priceInBrl) ? priceInBrl : 1000.00;
    const cfg = resolveCurrencyConfig(currencyOrLang);
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
 * BRL / pt -> "R$ 1.000,00"
 * EUR / fr -> "165,00 €"
 * USD / en -> "$ 180.00"
 */
export function formatCurrencyPrice(priceInBrl: number, currencyOrLang?: string): string {
  try {
    const safePrice = typeof priceInBrl === 'number' && !isNaN(priceInBrl) ? priceInBrl : 1000.00;
    const cfg = resolveCurrencyConfig(currencyOrLang);
    const val = getConvertedValue(safePrice, cfg.code);

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
export function getPriceDisplayParts(priceInBrl: number, currencyOrLang?: string): PriceParts {
  try {
    const safePrice = typeof priceInBrl === 'number' && !isNaN(priceInBrl) ? priceInBrl : 1000.00;
    const cfg = resolveCurrencyConfig(currencyOrLang);
    const val = getConvertedValue(safePrice, cfg.code);

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
 * Formats the installment badge text according to currency & language.
 */
export function formatInstallmentOption(
  priceInBrl: number,
  installmentsCount: number,
  currencyOrLang?: string,
  preferredLang?: string
): string {
  try {
    const safeCount = Math.max(1, Number(installmentsCount) || 12);
    const safePrice = typeof priceInBrl === 'number' && !isNaN(priceInBrl) ? priceInBrl : 1000.00;
    const cfg = resolveCurrencyConfig(currencyOrLang);
    const totalVal = getConvertedValue(safePrice, cfg.code);
    const singleVal = Math.round((totalVal / safeCount) * 100) / 100;

    const formattedVal = singleVal.toLocaleString(cfg.locale, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

    const currencyStr =
      cfg.symbolPosition === 'after'
        ? `${formattedVal} ${cfg.symbol}`
        : `${cfg.symbol} ${formattedVal}`;

    const textLang = preferredLang || (['pt', 'en', 'es', 'fr'].includes(currencyOrLang || '') ? currencyOrLang : 'pt');

    switch (textLang) {
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
 * Formats the real savings difference according to currency & language.
 */
export function formatSavingsText(
  originalPriceInBrl: number,
  promoPriceInBrl: number,
  currencyOrLang?: string,
  preferredLang?: string
): string {
  try {
    const safeOrig = typeof originalPriceInBrl === 'number' && !isNaN(originalPriceInBrl) ? originalPriceInBrl : 2000.00;
    const safePromo = typeof promoPriceInBrl === 'number' && !isNaN(promoPriceInBrl) ? promoPriceInBrl : 1000.00;
    const cfg = resolveCurrencyConfig(currencyOrLang);
    const diffBrl = Math.max(0, safeOrig - safePromo);
    const formattedDiff = formatCurrencyPrice(diffBrl, cfg.code);

    const textLang = preferredLang || (['pt', 'en', 'es', 'fr'].includes(currencyOrLang || '') ? currencyOrLang : 'pt');

    switch (textLang) {
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
