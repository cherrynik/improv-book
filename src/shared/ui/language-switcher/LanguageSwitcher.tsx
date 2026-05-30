import { useI18n } from "@/shared/i18n";
import { cn } from "@/shared/lib/cn";

interface LanguageSwitcherProps {
  className?: string;
}

export function LanguageSwitcher({ className }: LanguageSwitcherProps) {
  const { locale, toggle } = useI18n();

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={locale === "ru" ? "Switch to English" : "Переключить на русский"}
      className={cn(
        "type-badge inline-flex cursor-pointer items-center gap-1.5 rounded-pill border border-border-muted px-3.5 py-2 text-ink transition-opacity duration-200 active:scale-95",
        className,
      )}
    >
      <span className={locale === "ru" ? "" : "opacity-40"}>RU</span>
      <span className="opacity-30">/</span>
      <span className={locale === "en" ? "" : "opacity-40"}>EN</span>
    </button>
  );
}
