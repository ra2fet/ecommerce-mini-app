'use client';

import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import en from '../../locales/en';
import es from '../../locales/es';
import ar from '../../locales/ar';

type Locale = 'en' | 'es' | 'ar';
type Messages = typeof en;

interface I18nContextType {
  locale: Locale;
  messages: Messages;
  setLocale: (locale: Locale) => void;
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

export const I18nProvider = ({ children }: { children: ReactNode }) => {
  const [locale, setLocaleState] = useState<Locale>('en');
  const [messages, setMessages] = useState<Messages>(en);

  useEffect(() => {
    const storedLocale = localStorage.getItem('locale') as Locale;
    if (storedLocale && (storedLocale === 'en' || storedLocale === 'es' || storedLocale === 'ar')) {
      setLocaleState(storedLocale);
      setMessages(
        storedLocale === 'en' ? en :
        storedLocale === 'es' ? es :
        ar
      );
      document.documentElement.lang = storedLocale;
    }
  }, []);

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale);
    setMessages(
      newLocale === 'en' ? en :
      newLocale === 'es' ? es :
      ar
    );
    localStorage.setItem('locale', newLocale);
    document.documentElement.lang = newLocale;
  };

  return (
    <I18nContext.Provider value={{ locale, messages, setLocale }}>
      {children}
    </I18nContext.Provider>
  );
};

export const useI18n = () => {
  const context = useContext(I18nContext);
  if (context === undefined) {
    throw new Error('useI18n must be used within an I18nProvider');
  }
  return context;
};
