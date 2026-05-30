import { ScrambleText } from "@/shared/ui";
import { cn } from "@/shared/lib/cn";

export interface TimelineEntry {
  cue: string;
  text: string;
  highlighted: boolean;
}

interface TimelineProps {
  entries: TimelineEntry[];
}

export function Timeline({ entries }: TimelineProps) {
  return (
    <div className="mt-1 mb-8">
      {entries.map(({ cue, text, highlighted }, index) => (
        <div key={index} className="flex gap-4">
          <div className="flex flex-col items-center">
            <span
              className={cn(
                "mt-[5px] h-[13px] w-[13px] shrink-0 rounded-full border-[2.5px] border-accent",
                highlighted ? "timeline-ring bg-accent" : "bg-white",
              )}
            />
            {index < entries.length - 1 && (
              <span
                className={cn(
                  "mt-[2px] min-h-5 w-[2.5px] flex-1",
                  highlighted ? "bg-accent" : "bg-line",
                )}
              />
            )}
          </div>
          <div className="pb-[18px]">
            <div
              className={cn(
                "type-timeline-cue",
                highlighted ? "text-accent" : "text-ink",
              )}
            >
              <ScrambleText text={cue} />
            </div>
            <p className="type-timeline-text mt-[3px]">
              <ScrambleText text={text} />
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
