"use client";

import { useEffect, useState, useCallback } from "react";
import { translations, type Locale } from "./translations";

const DEFAULT_LOCALE: Locale = "en";
const STORAGE_KEY = "velora_locale";

export function useTranslation() {
  const [locale, setLocaleState] = useState<Locale>(DEFAULT_LOCALE);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY) as Locale | null;
    if (saved && translations[saved]) {
      setLocaleState(saved);
    }
  }, []);

  const setLocale = useCallback((newLocale: Locale) => {
    setLocaleState(newLocale);
    localStorage.setItem(STORAGE_KEY, newLocale);
  }, []);

  const t = useCallback(
    (key: string): string => {
      const dict = translations[locale] || translations.en;
      return (dict as Record<string, string>)[key] || key;
    },
    [locale]
  );

  return { t, locale, setLocale };
}
