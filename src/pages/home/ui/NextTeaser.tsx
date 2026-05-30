import { ScrambleText } from "@/shared/ui";
import { useI18n } from "@/shared/i18n";

export function NextTeaser() {
  const { t } = useI18n();

  return (
    <div className="rounded-panel border border-dashed border-border-muted px-6 py-10 text-center">
      <div className="type-kicker text-brand">
        <ScrambleText text={t.teaserKicker} />
      </div>
      <h3 className="type-card-heading mt-3 whitespace-pre-line text-ink">
        <ScrambleText text={t.teaserTitle} />
      </h3>
      <p className="type-card-subtitle mt-2 text-muted">
        <ScrambleText text={t.teaserSubtitle} />
      </p>
    </div>
  );
}
