import React from 'react';
import { useLanguage } from '../i18n/LanguageContext.js';
import { AVAILABLE_CURRENCIES, CurrencyCode } from '../utils/currency.js';
import { Coins } from 'lucide-react';

interface CurrencySelectorProps {
  className?: string;
  stacked?: boolean;
  variant?: 'default' | 'neon';
  compact?: boolean;
  showIcon?: boolean;
}

export const HeaderCurrencySelector: React.FC<CurrencySelectorProps> = ({
  className = '',
  stacked = false,
  variant = 'neon',
  compact = false,
  showIcon = true,
}) => {
  const { currency, setCurrency, language } = useLanguage();

  const isNeon = variant === 'neon';

  const tooltipTitle = {
    pt: 'Seletor de Moeda: Escolha entre Real (R$), Dólar ($) ou Euro (€)',
    en: 'Currency Selector: Choose between Real (R$), Dollar ($) or Euro (€)',
    es: 'Selector de Moneda: Elige entre Real (R$), Dólar ($) o Euro (€)',
    fr: 'Sélecteur de Devise : Choisissez entre Real (R$), Dollar ($) ou Euro (€)',
  }[language] || 'Seletor de Moeda';

  return (
    <div
      className={`flex items-center gap-1 sm:gap-1.5 p-0.5 sm:p-1 rounded-xl transition-all ${
        isNeon
          ? 'bg-purple-950/80 border border-purple-400/50 shadow-[0_0_12px_rgba(168,85,247,0.35)] backdrop-blur-sm'
          : 'bg-neutral-900/90 border border-neutral-700/80 shadow-inner'
      } ${
        stacked ? 'flex-wrap justify-center' : ''
      } ${className}`}
      title={tooltipTitle}
      id="header-currency-selector"
    >
      {showIcon && (
        <div className="hidden xl:flex items-center pl-1 pr-0.5 text-amber-300">
          <Coins className="w-3.5 h-3.5" />
        </div>
      )}

      {AVAILABLE_CURRENCIES.map((item) => {
        const isSelected = currency === item.code;
        return (
          <button
            key={item.code}
            type="button"
            onClick={() => setCurrency(item.code as CurrencyCode)}
            className={`flex items-center gap-1 sm:gap-1.5 px-1.5 sm:px-2.5 py-0.5 sm:py-1 rounded-lg text-xs font-medium transition-all cursor-pointer select-none whitespace-nowrap active:scale-95 ${
              isSelected
                ? 'bg-emerald-400 text-neutral-950 font-extrabold shadow-md shadow-emerald-400/30 ring-1 ring-emerald-300 scale-[1.03]'
                : isNeon
                ? 'text-purple-100 hover:text-white hover:bg-purple-800/80 border border-transparent'
                : 'text-neutral-300 hover:text-white hover:bg-neutral-800/90 border border-transparent'
            }`}
            title={`${item.flag} ${item.label} (${item.name})`}
          >
            <span className="text-sm sm:text-base leading-none" role="img" aria-label={item.name}>
              {item.flag}
            </span>
            <span className={`text-[11px] sm:text-xs font-bold tracking-tight ${compact ? 'hidden sm:inline' : 'inline'}`}>
              {item.label}
            </span>
          </button>
        );
      })}
    </div>
  );
};
