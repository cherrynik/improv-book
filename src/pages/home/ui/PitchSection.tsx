import { ScrambleText } from "@/shared/ui";
import { useI18n } from "@/shared/i18n";

export function PitchSection() {
  const { t } = useI18n();

  return (
    <div className="mt-12 text-center">
      <p className="type-pitch">
        <ScrambleText text={t.pitchBig} />
      </p>
      <p className="type-home-subtitle mx-auto mt-4 max-w-[330px]">
        <ScrambleText text={t.pitchSub} />
      </p>
    </div>
  );
}
