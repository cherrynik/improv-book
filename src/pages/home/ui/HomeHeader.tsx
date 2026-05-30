import { ScrambleText, SparkleIcon } from "@/shared/ui";
import { useI18n } from "@/shared/i18n";

export function HomeHeader() {
  const { t } = useI18n();

  return (
    <header className="mb-[38px] animate-rise">
      <div className="type-home-eyebrow group mb-[22px] inline-flex items-center gap-[0.6em] rounded-pill bg-pitch px-[13px] py-[7px] text-white">
        <ScrambleText text={t.eyebrow} />
        <SparkleIcon className="h-[1em] w-[1em] transition-transform duration-500 ease-out group-hover:rotate-[360deg]" />
      </div>
      <h1 className="type-home-title">
        <ScrambleText text={t.titleLead} />
        <br />
        <span className="text-pitch/50">
          <ScrambleText text={t.titleAccent} />
        </span>
      </h1>
      <p className="type-home-subtitle mt-[18px] max-w-[340px]">
        <ScrambleText text={t.homeSubtitle} />
      </p>
    </header>
  );
}
