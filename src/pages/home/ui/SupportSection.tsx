import { ScrambleText, HeartIcon } from "@/shared/ui";
import { useI18n } from "@/shared/i18n";

// Donation block — temporarily hidden (not rendered) until the support link is ready.
export function SupportSection() {
  const { t } = useI18n();

  return (
    <div className="pt-10 pb-8 text-center">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-brand/15">
        <HeartIcon className="h-6 w-6 text-brand" />
      </div>
      <h3 className="type-pitch mt-5 text-white">
        <ScrambleText text={t.enthusiasm} />
      </h3>
      <p className="type-home-subtitle mx-auto mt-3 max-w-[340px] text-white/55">
        <ScrambleText text={t.enthusiasmSub} />
      </p>
      <button
        type="button"
        disabled
        className="mt-7 inline-flex cursor-not-allowed items-center gap-2 rounded-pill bg-brand px-8 py-3.5 text-white opacity-55"
      >
        <HeartIcon className="h-[1.1em] w-[1.1em]" />
        <span className="type-cta">
          <ScrambleText text={t.support} />
        </span>
      </button>
    </div>
  );
}
