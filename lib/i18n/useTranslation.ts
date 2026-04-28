"use client";

import { useEffect, useState, useCallback } from "react";
import { translations, type Locale } from "./translations";

const STORAGE_KEY = "velora_locale";

export function useTranslation() {
  const [locale, setLocaleState] = useState<Locale>("en");

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

  // t("Hello") → returns "Zdravo" if locale=sr, or "Hello" if en or not found
  const t = useCallback(
    (text: string): string => {
      // Language switcher is hidden — always return English
      return text;
    },
    []
  );

  return { t, locale, setLocale };
}
