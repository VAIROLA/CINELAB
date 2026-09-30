import React, { useState, useRef, useEffect } from 'react';
import { useLanguage } from '../i18n/LanguageContext.js';
import { Globe, ChevronDown, Check } from 'lucide-react';

interface LanguageSelectorProps {
  compact?: boolean;
  className?: string;
  showLabel?: boolean;
}

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  compact = false,
  className = '',
  showLabel = true,
}) => {
  const { language, setLanguage, languages, t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentLang = languages.find((l) => l.code === language) || languages[0];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const selectorTexts = {
    pt: {
      title: 'Alterar idioma do site e das apostilas (Português, Inglês, Espanhol, Francês)',
      aria: 'Selecionar Idioma',
      header: 'IDIOMA DO SITE & APOSTILAS',
      footer: 'Traduz navegação, módulos e apostilas',
    },
    en: {
      title: 'Change site and handout language (Portuguese, English, Spanish, French)',
      aria: 'Select Language',
      header: 'WEBSITE & HANDOUT LANGUAGE',
      footer: 'Translates navigation, modules & handouts',
    },
    es: {
      title: 'Cambiar idioma del sitio y de los manuales (Portugués, Inglés, Español, Francés)',
      aria: 'Seleccionar Idioma',
      header: 'IDIOMA DEL SITIO Y MANUALES',
      footer: 'Traduce navegación, módulos y manuales',
    },
    fr: {
      title: 'Changer la langue du site et des fascicules (Portugais, Anglais, Espagnol, Français)',
      aria: 'Choisir la Langue',
      header: 'LANGUE DU SITE & FASCICULES',
      footer: 'Traduit navigation, modules et fascicules',
    },
  }[language] || {
    title: 'Alterar idioma do site e das apostilas',
    aria: 'Selecionar Idioma',
    header: 'IDIOMA DO SITE & APOSTILAS',
    footer: 'Traduz navegação, módulos e apostilas',
  };

  return (
    <div className={`relative inline-block text-left ${className}`} ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-1.5 rounded-xl border border-neutral-700 bg-neutral-900/90 px-2.5 py-1.5 text-xs text-neutral-200 hover:border-amber-500/60 hover:bg-neutral-800 transition-all cursor-pointer font-sans shadow-sm ${
          compact ? 'py-1 px-2 text-[11px]' : ''
        }`}
        title={selectorTexts.title}
        aria-label={selectorTexts.aria}
      >
        <span className="text-sm leading-none">{currentLang.flag}</span>
        {showLabel && (
          <span className="font-semibold uppercase tracking-wider text-[11px]">
            {currentLang.code}
          </span>
        )}
        <ChevronDown className="w-3 h-3 text-neutral-400" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 rounded-2xl bg-[#121318] border border-neutral-700/80 shadow-2xl p-1.5 z-50 animate-fadeIn backdrop-blur-lg">
          <div className="px-3 py-1.5 text-[10px] font-mono text-neutral-400 border-b border-neutral-800 flex items-center gap-1.5">
            <Globe className="w-3 h-3 text-amber-400" />
            <span>{selectorTexts.header}</span>
          </div>

          <div className="py-1 space-y-0.5">
            {languages.map((lang) => {
              const isSelected = lang.code === language;
              return (
                <button
                  key={lang.code}
                  type="button"
                  onClick={() => {
                    setLanguage(lang.code);
                    setIsOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2 text-xs rounded-xl transition-colors cursor-pointer text-left ${
                    isSelected
                      ? 'bg-amber-500/15 text-amber-400 font-bold border border-amber-500/30'
                      : 'text-neutral-300 hover:bg-neutral-800 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className="text-base">{lang.flag}</span>
                    <span className="font-sans">{lang.nativeName}</span>
                  </div>
                  {isSelected && <Check className="w-3.5 h-3.5 text-amber-400" />}
                </button>
              );
            })}
          </div>

          <div className="p-2 border-t border-neutral-800/80 text-[10px] font-mono text-neutral-400 text-center">
            {selectorTexts.footer}
          </div>
        </div>
      )}
    </div>
  );
};

export const HeaderCountryTranslator: React.FC<{
  className?: string;
  stacked?: boolean;
  variant?: 'default' | 'neon';
}> = ({ className = '', stacked = false, variant = 'default' }) => {
  const { language, setLanguage } = useLanguage();

  const countries: Array<{
    code: 'pt' | 'en' | 'es' | 'fr';
    flag: string;
    countryName: string;
    fullName: string;
  }> = [
    { code: 'pt', flag: '🇧🇷', countryName: 'Brasil', fullName: 'Brasil (Português)' },
    { code: 'en', flag: '🇺🇸', countryName: 'English', fullName: 'English (USA)' },
    { code: 'es', flag: '🇪🇸', countryName: 'Español', fullName: 'Español (España)' },
    { code: 'fr', flag: '🇫🇷', countryName: 'Français', fullName: 'Français (France)' },
  ];

  const isNeon = variant === 'neon';

  return (
    <div
      className={`flex items-center gap-1 sm:gap-1.5 p-0.5 sm:p-1 rounded-xl transition-all ${
        isNeon
          ? 'bg-purple-950/80 border border-purple-400/50 shadow-[0_0_12px_rgba(168,85,247,0.35)] backdrop-blur-sm'
          : 'bg-neutral-900/90 border border-neutral-700/80 shadow-inner'
      } ${
        stacked ? 'flex-wrap justify-center' : ''
      } ${className}`}
      title="Tradutor: Clique no país para traduzir todo o sistema"
      id="header-country-translator"
    >
      {countries.map((item) => {
        const isSelected = language === item.code;
        return (
          <button
            key={item.code}
            type="button"
            onClick={() => setLanguage(item.code)}
            className={`flex items-center gap-1 sm:gap-1.5 px-1.5 sm:px-2.5 py-0.5 sm:py-1 rounded-lg text-xs font-medium transition-all cursor-pointer select-none whitespace-nowrap ${
              isSelected
                ? 'bg-amber-400 text-neutral-950 font-bold shadow-md shadow-amber-400/30 ring-1 ring-amber-300 scale-[1.03]'
                : isNeon
                ? 'text-purple-100 hover:text-white hover:bg-purple-800/80 border border-transparent'
                : 'text-neutral-300 hover:text-white hover:bg-neutral-800/90 border border-transparent'
            }`}
            title={`Traduzir para ${item.fullName}`}
          >
            <span className="text-sm sm:text-base leading-none" role="img" aria-label={item.countryName}>
              {item.flag}
            </span>
            <span className={`text-[11px] sm:text-xs font-semibold tracking-tight ${stacked ? 'inline' : 'hidden xl:inline'}`}>
              {item.countryName}
            </span>
          </button>
        );
      })}
    </div>
  );
};

