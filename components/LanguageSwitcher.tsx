"use client";

import { useState } from "react";
import { useTranslation } from "@/lib/i18n/useTranslation";
import { LOCALE_NAMES, LOCALE_FLAGS, type Locale } from "@/lib/i18n/translations";

export default function LanguageSwitcher() {
  const { locale, setLocale } = useTranslation();
  const [open, setOpen] = useState(false);

  const locales: Locale[] = ["en", "sr", "de", "es"];

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm text-[#6f5a62] hover:bg-white hover:shadow-md transition-all"
        aria-label="Change language"
      >
        <span>{LOCALE_FLAGS[locale]}</span>
        <span className="hidden sm:inline text-xs">{LOCALE_NAMES[locale]}</span>
        <svg
          className={`w-3 h-3 transition-transform ${open ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <div className="absolute right-0 top-full mt-2 z-50 bg-white rounded-2xl shadow-xl border border-[#f0e3e8] overflow-hidden min-w-[160px]">
            {locales.map((loc) => (
              <button
                key={loc}
                onClick={() => {
                  setLocale(loc);
                  setOpen(false);
                  // Force re-render by reloading
                  window.location.reload();
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 text-sm hover:bg-[#fdf2f5] transition-colors ${
                  locale === loc ? "bg-[#fdf2f5] text-[#8f5d6f] font-medium" : "text-[#6f5a62]"
                }`}
              >
                <span className="text-lg">{LOCALE_FLAGS[loc]}</span>
                <span>{LOCALE_NAMES[loc]}</span>
                {locale === loc && <span className="ml-auto text-[#d8a7b5]">✓</span>}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
