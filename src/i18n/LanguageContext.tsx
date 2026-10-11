import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Language,
  LANGUAGES,
  UI_TRANSLATIONS,
  MODULE_TRANSLATIONS,
  getFilmTranslation as translateFilmHelper,
  getReadingTranslation as translateReadingHelper,
  FilmTranslation,
  ReadingTranslation,
} from './translations.js';
import { CurrencyCode, initLiveCurrencyRates } from '../utils/currency.js';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  currency: CurrencyCode;
  setCurrency: (curr: CurrencyCode) => void;
  t: (key: string, fallback?: string) => string;
  getModuleTranslation: (moduleId: number) => {
    title: string;
    subtitle: string;
    summary: string;
    apostilaSummary: string;
    keyThemes: string[];
  };
  getFilmTranslation: (film: any) => FilmTranslation;
  getReadingTranslation: (reading: any) => ReadingTranslation;
  languages: typeof LANGUAGES;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    try {
      const saved = localStorage.getItem('cinelab_language') as Language;
      if (saved && ['pt', 'en', 'es', 'fr'].includes(saved)) {
        return saved;
      }
    } catch (e) {
      // ignore
    }
    return 'pt';
  });

  // Helper que mapeia cada idioma para a moeda correspondente
  const getCurrencyForLanguage = (lang: Language): CurrencyCode => {
    if (lang === 'fr') return 'EUR';
    if (lang === 'en' || lang === 'es') return 'USD';
    return 'BRL';
  };

  const [currency, setCurrencyState] = useState<CurrencyCode>(() => {
    try {
      const savedLang = localStorage.getItem('cinelab_language') as Language;
      const savedCurrency = localStorage.getItem('cinelab_currency') as CurrencyCode;

      // Se houver moeda salva válida:
      if (savedCurrency && ['BRL', 'USD', 'EUR'].includes(savedCurrency)) {
        // Se a língua salva for estrangeira mas a moeda estiver presa em BRL (resquício anterior),
        // força a conversão correta para o idioma salvo!
        if (savedLang === 'fr' && savedCurrency === 'BRL') return 'EUR';
        if ((savedLang === 'en' || savedLang === 'es') && savedCurrency === 'BRL') return 'USD';
        return savedCurrency;
      }

      if (savedLang && ['pt', 'en', 'es', 'fr'].includes(savedLang)) {
        return getCurrencyForLanguage(savedLang);
      }
    } catch (e) {
      // ignore
    }
    return 'BRL';
  });

  const setCurrency = (c: CurrencyCode) => {
    setCurrencyState(c);
    try {
      localStorage.setItem('cinelab_currency', c);
    } catch (e) {
      // ignore
    }
  };

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);

    // MUDOU O IDIOMA -> CONVERTE AUTOMATICAMENTE PARA A MOEDA DO PAÍS!
    const targetCurrency = getCurrencyForLanguage(lang);
    setCurrencyState(targetCurrency);

    try {
      localStorage.setItem('cinelab_language', lang);
      localStorage.setItem('cinelab_currency', targetCurrency);
      localStorage.removeItem('cinelab_currency_manual');
      document.documentElement.lang = lang;
    } catch (e) {
      // ignore
    }
  };

  useEffect(() => {
    document.documentElement.lang = language;
    initLiveCurrencyRates();
  }, [language]);

  const t = (key: string, fallback?: string): string => {
    const entry = UI_TRANSLATIONS[key];
    if (entry && entry[language]) {
      return entry[language];
    }
    if (entry && entry.pt) {
      return entry.pt;
    }
    return fallback || key;
  };

  const getModuleTranslation = (moduleId: number) => {
    const mod = MODULE_TRANSLATIONS[moduleId];
    if (!mod) {
      return {
        title: `Módulo 0${moduleId}`,
        subtitle: '',
        summary: '',
        apostilaSummary: '',
        keyThemes: [],
      };
    }
    return {
      title: mod.title[language] || mod.title.pt,
      subtitle: mod.subtitle[language] || mod.subtitle.pt,
      summary: mod.summary[language] || mod.summary.pt,
      apostilaSummary: mod.apostilaSummary[language] || mod.apostilaSummary.pt,
      keyThemes: mod.keyThemes[language] || mod.keyThemes.pt,
    };
  };

  const getFilmTranslation = (film: any): FilmTranslation => {
    return translateFilmHelper(film, language);
  };

  const getReadingTranslation = (reading: any): ReadingTranslation => {
    return translateReadingHelper(reading, language);
  };

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        currency,
        setCurrency,
        t,
        getModuleTranslation,
        getFilmTranslation,
        getReadingTranslation,
        languages: LANGUAGES,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
