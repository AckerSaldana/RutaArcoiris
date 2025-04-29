import React, { createContext, useState, useContext, useEffect } from 'react';
import translations from '../locales';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState(() => {
    const savedLanguage = localStorage.getItem('language');
    return savedLanguage && translations[savedLanguage] ? savedLanguage : 'es';
  });
  
  useEffect(() => {
    localStorage.setItem('language', currentLanguage);
  }, [currentLanguage]);
  
  const t = (key) => {
    const currentTranslations = translations[currentLanguage];
    if (currentTranslations && currentTranslations[key]) {
      return currentTranslations[key];
    }
    if (translations.es && translations.es[key]) {
      return translations.es[key];
    }
    return key;
  };
  
  const changeLanguage = (languageCode) => {
    if (translations[languageCode]) {
      setCurrentLanguage(languageCode);
    }
  };
  
  const availableLanguages = [
    { code: 'es', name: 'Español' },
    { code: 'en', name: 'English' },
    { code: 'fr', name: 'Français' },
    { code: 'pt', name: 'Português' },
  ];

  return (
    <LanguageContext.Provider 
      value={{ 
        currentLanguage, 
        changeLanguage, 
        t, 
        availableLanguages 
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage debe usarse dentro de un LanguageProvider');
  }
  return context;
};