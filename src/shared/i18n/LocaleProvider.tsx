import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { Locale } from "./types";
import { UI, type Translation } from "./ui";

interface I18nValue {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  toggle: () => void;
  t: Translation;
}

const STORAGE_KEY = "improv-locale";
const I18nContext = createContext<I18nValue | null>(null);

function readInitialLocale(): Locale {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === "ru" || saved === "en") return saved;
  } catch {
    // localStorage unavailable — fall back to default
  }
  return "ru";
}

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(readInitialLocale);

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // ignore persistence errors
    }
  }, []);

  const toggle = useCallback(
    () => setLocale(locale === "ru" ? "en" : "ru"),
    [locale, setLocale],
  );

  const value = useMemo(
    () => ({ locale, setLocale, toggle, t: UI[locale] }),
    [locale, setLocale, toggle],
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (!context) throw new Error("useI18n must be used within LocaleProvider");
  return context;
}
