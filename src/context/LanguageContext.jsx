import React, { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem('restaurant_lang') || 'en';
  });

  useEffect(() => {
    localStorage.setItem('restaurant_lang', language);
  }, [language]);

  const toggleLanguage = (lang) => {
    if (lang) {
      setLanguage(lang);
    } else {
      setLanguage((prev) => (prev === 'en' ? 'pt' : 'en'));
    }
  };

  // Helper to resolve multilingual objects { en: "...", pt: "..." }
  const t = (val) => {
    if (!val) return '';
    if (typeof val === 'string') return val;
    if (typeof val === 'object') {
      return val[language] || val['en'] || Object.values(val)[0] || '';
    }
    return String(val);
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

