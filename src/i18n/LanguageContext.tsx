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

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
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

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    try {
      localStorage.setItem('cinelab_language', lang);
      document.documentElement.lang = lang;
    } catch (e) {
      // ignore
    }
  };

  useEffect(() => {
    document.documentElement.lang = language;
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
