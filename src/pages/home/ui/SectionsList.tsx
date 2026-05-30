import { getSections, SectionCard, type Section } from "@/entities/section";
import { ScrambleText } from "@/shared/ui";
import { useI18n } from "@/shared/i18n";

interface SectionsListProps {
  onOpen: (section: Section) => void;
}

export function SectionsList({ onOpen }: SectionsListProps) {
  const { locale, t } = useI18n();
  const sections = getSections(locale);
  const readyCount = sections.filter((section) => section.status === "ready").length;

  return (
    <>
      <div className="mb-[22px] flex items-center gap-3">
        <span className="type-section-label">
          <ScrambleText text={t.sections} />
        </span>
        <span className="h-px flex-1 bg-line" />
        <span className="type-counter">
          {readyCount} / {sections.length}
        </span>
      </div>

      {sections.map((section, index) => (
        <SectionCard
          key={section.id}
          section={section}
          index={index}
          onOpen={onOpen}
        />
      ))}
    </>
  );
}
