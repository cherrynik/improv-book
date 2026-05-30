import { ScrambleText, LangPicker } from "@/shared/ui";
import { useI18n } from "@/shared/i18n";

export function SiteFooter() {
  const { t } = useI18n();
  const year = new Date().getFullYear();

  return (
    <div className="overflow-hidden rounded-t-panel bg-pitch pb-[env(safe-area-inset-bottom)] text-white">
      <div className="mx-auto max-w-[480px] px-[clamp(18px,5vw,26px)]">
        <div className="flex items-end justify-between gap-4 pt-9 pb-7">
          <div>
            <div className="type-footer-brand text-white">
              <ScrambleText text={t.titleLead} />
            </div>
            <div className="type-footer-brand-sub uppercase text-white/45">
              <ScrambleText text={t.titleAccent} />
            </div>
          </div>
          <div className="text-right">
            <div className="type-footer text-white/60">
              <ScrambleText text={t.madeIn} suffix="🇬🇪" />
            </div>
            <div className="type-kicker mt-1 text-white/40">v0.1 · {year}</div>
          </div>
        </div>

        <div className="flex justify-start border-t border-white/10 py-6">
          <LangPicker />
        </div>
      </div>
    </div>
  );
}
