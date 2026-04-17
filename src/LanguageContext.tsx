import { createContext, useContext, ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import { Language, translations } from './translations';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  t: any;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const { pathname } = useLocation();
  const language: Language = pathname.startsWith('/es') ? 'es' : 'en';
  const t = translations[language];

  return (
    <LanguageContext.Provider value={{ language, setLanguage: () => {}, toggleLanguage: () => {}, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
