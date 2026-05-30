import type { CSSProperties } from "react";
import { ScrambleText, HomeIcon } from "@/shared/ui";
import { useI18n } from "@/shared/i18n";
import type { Section } from "@/entities/section";

interface LessonNavProps {
  prev?: Section;
  next?: Section;
  onOpen: (id: string) => void;
  onHome: () => void;
}

const CARD =
  "block w-full cursor-pointer rounded-card p-4 transition-transform duration-200 active:scale-[0.98]";

function accentVars(section: Section): CSSProperties {
  return {
    "--color-accent": section.accent,
    "--color-accent-soft": section.accentSoft,
  } as CSSProperties;
}

export function LessonNav({ prev, next, onOpen, onHome }: LessonNavProps) {
  const { t } = useI18n();

  const sectionCard = (section: Section, dir: "prev" | "next") => (
    <button
      type="button"
      onClick={() => onOpen(section.id)}
      style={accentVars(section)}
      className={`${CARD} bg-accent-soft ${dir === "prev" ? "text-left" : "text-right"}`}
    >
      <div className="type-card-eyebrow text-accent">
        {dir === "prev" && "← "}
        <ScrambleText text={section.stage} />
        {dir === "next" && " →"}
      </div>
      <div className="type-card-title mt-1.5 text-ink">
        <ScrambleText text={section.title} />
      </div>
    </button>
  );

  const homeCard = (
    <button type="button" onClick={onHome} className={`${CARD} bg-ink text-left`}>
      <HomeIcon className="h-5 w-5 text-paper/70" />
      <div className="type-card-title mt-2 text-paper">
        <ScrambleText text={t.back} />
      </div>
    </button>
  );

  if (next) {
    return (
      <div className="mt-10 grid grid-cols-2 items-stretch gap-3">
        {prev ? sectionCard(prev, "prev") : homeCard}
        {sectionCard(next, "next")}
      </div>
    );
  }

  return (
    <div className="mt-10">
      <div className="border-t border-line pt-8 pb-7 text-center">
        <div className="text-[28px] leading-none">🎭</div>
        <div className="type-card-heading mt-3 text-ink">
          <ScrambleText text={t.endTitle} />
        </div>
        <p className="type-card-subtitle mx-auto mt-2 max-w-[300px] text-muted">
          <ScrambleText text={t.endNote} />
        </p>
      </div>
      <div className={prev ? "grid grid-cols-2 items-stretch gap-3" : ""}>
        {prev && sectionCard(prev, "prev")}
        {homeCard}
      </div>
    </div>
  );
}
