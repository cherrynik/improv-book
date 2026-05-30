import { ScrambleText } from "@/shared/ui";
import { cn } from "@/shared/lib/cn";
import type { DialogueExample, DialogueKind } from "@/entities/lesson";

const TONE: Record<DialogueKind, { dot: string; note: string }> = {
  block: { dot: "bg-dead", note: "text-dead" },
  weak: { dot: "bg-warn", note: "text-warn" },
  good: { dot: "bg-alive", note: "text-alive" },
};

interface DialogueProps {
  example: DialogueExample;
}

export function Dialogue({ example }: DialogueProps) {
  const { kind, label, cue, response, note } = example;
  const tone = TONE[kind];
  const positive = kind === "good";

  return (
    <div className="mb-6">
      <div className="mb-[11px] flex items-center gap-2">
        <span className={cn("h-[7px] w-[7px] rounded-pill", tone.dot)} />
        <span className="type-dialogue-label">
          <ScrambleText text={label} />
        </span>
      </div>

      <div className="mb-2 flex justify-start">
        <div className="type-dialogue-bubble bubble-incoming max-w-[85%] bg-white px-[15px] py-[11px] text-ink shadow-bubble">
          <ScrambleText text={cue} />
        </div>
      </div>

      <div className="mb-2.5 flex justify-end">
        <div
          className={cn(
            "type-dialogue-bubble bubble-outgoing max-w-[85%] px-[15px] py-[11px] shadow-bubble",
            positive ? "bg-ink text-paper" : "bg-white text-ink",
          )}
        >
          <ScrambleText text={response} />
        </div>
      </div>

      <p className={cn("type-body-secondary pl-0.5", tone.note)}>
        <ScrambleText text={note} />
      </p>
    </div>
  );
}
