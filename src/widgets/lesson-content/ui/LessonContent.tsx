import type { CSSProperties } from "react";
import { Badge, ScrambleText, LanguageSwitcher } from "@/shared/ui";
import { useI18n } from "@/shared/i18n";
import { useThemeColor } from "@/shared/lib/useThemeColor";
import type { Section } from "@/entities/section";
import type { Lesson } from "@/entities/lesson";
import { Block } from "./blocks/Block";

interface LessonContentProps {
  section: Section;
  lesson: Lesson;
  onBack: () => void;
}

export function LessonContent({ section, lesson, onBack }: LessonContentProps) {
  const { t } = useI18n();
  useThemeColor(section.accent);

  return (
    <div
      style={
        {
          "--color-accent": section.accent,
          "--color-accent-soft": section.accentSoft,
        } as CSSProperties
      }
      className="no-scrollbar min-h-svh bg-paper"
    >
      <div className="lesson-hero relative overflow-hidden rounded-b-panel bg-accent pt-[env(safe-area-inset-top)] pb-9 text-white">
        <div className="relative mx-auto max-w-[480px] px-[22px] pt-4">
          <div className="type-watermark-hero pointer-events-none absolute -right-[10px] -bottom-[34px]">
            {section.number}
          </div>

          <div className="mb-7 flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={onBack}
              className="type-back group inline-flex cursor-pointer items-center gap-2 rounded-pill bg-white/[0.18] px-3.5 py-2 text-white transition duration-200 hover:bg-white/30 active:scale-95"
            >
              <span className="transition-transform duration-200 ease-out group-hover:-translate-x-1">
                ←
              </span>
              <ScrambleText text={t.back} />
            </button>
            <LanguageSwitcher className="border-white/30 bg-white/[0.18] text-white" />
          </div>

          <div className="mb-[22px] flex items-center justify-between">
            <span className="type-hero-eyebrow opacity-90">
              {section.number} · <ScrambleText text={section.stage} />
            </span>
            {section.minutes && (
              <Badge className="bg-white/[0.18]">
                <ScrambleText text={`${section.minutes} ${t.minutes}`} />
              </Badge>
            )}
          </div>

          <h1 className="type-hero-title">{lesson.titleNode}</h1>
          <p className="type-hero-lede mt-3.5 max-w-[320px] opacity-95">
            <ScrambleText text={lesson.lede} />
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-[480px] px-[22px] pt-[34px] pb-[60px]">
        {lesson.blocks.map((block, index) => (
          <Block key={index} block={block} />
        ))}
      </div>
    </div>
  );
}
