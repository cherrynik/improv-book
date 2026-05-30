import { Globe as GlobeIcon } from "lucide-react";
import { useI18n, type Locale } from "@/shared/i18n";
import { cn } from "@/shared/lib/cn";

const LOCALES: { code: Locale; label: string }[] = [
  { code: "ru", label: "RU" },
  { code: "en", label: "EN" },
];

interface LangPickerProps {
  className?: string;
}

// Designed for dark surfaces (footer).
export function LangPicker({ className }: LangPickerProps) {
  const { locale, setLocale } = useI18n();

  return (
    <div className={cn("inline-flex items-center gap-1.5", className)}>
      <GlobeIcon className="mr-1 h-4 w-4 text-white/40" />
      {LOCALES.map(({ code, label }) => (
        <button
          key={code}
          type="button"
          onClick={() => setLocale(code)}
          aria-pressed={locale === code}
          className={cn(
            "type-badge cursor-pointer rounded-pill px-3.5 py-1.5 transition-colors duration-200",
            locale === code
              ? "bg-white text-ink"
              : "text-white/45 hover:text-white/75",
          )}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
