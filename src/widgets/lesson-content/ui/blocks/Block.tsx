import { Kicker, Badge, ScrambleText } from "@/shared/ui";
import { cn } from "@/shared/lib/cn";
import { useI18n } from "@/shared/i18n";
import type { LessonBlock } from "@/entities/lesson";
import { Timeline, type TimelineEntry } from "./Timeline";
import { Dialogue } from "./Dialogue";

const HIGHLIGHT = /из-за этого|because of that/i;

interface BlockProps {
  block: LessonBlock;
}

export function Block({ block }: BlockProps) {
  const { t } = useI18n();

  switch (block.type) {
    case "essence":
      return (
        <div className="mb-8">
          <Kicker>
            <ScrambleText text={t.essence} />
          </Kicker>
          <p className="type-essence mt-2.5">
            <ScrambleText text={block.text} />
          </p>
        </div>
      );

    case "paragraph":
      return <p className="type-body mb-[22px]">{block.node}</p>;

    case "heading":
      return (
        <h2 className="type-heading">
          <ScrambleText text={block.text} />
        </h2>
      );

    case "dialogues":
      return (
        <>
          {block.items.map((example, index) => (
            <Dialogue key={index} example={example} />
          ))}
        </>
      );

    case "definitionHalves":
      return (
        <div className="mb-[26px]">
          {block.items.map(({ term, lead, description }, index) => (
            <div key={index} className="mb-3.5 flex items-start gap-3.5">
              <span className="type-definition-term min-w-[34px] text-accent">
                <ScrambleText text={term} />
              </span>
              <p className="type-body">
                <strong className="font-semibold text-ink">
                  <ScrambleText text={lead} />
                </strong>{" "}
                <ScrambleText text={description} />
              </p>
            </div>
          ))}
        </div>
      );

    case "callout":
      return (
        <div className="my-[26px] rounded-card border-l-4 border-accent bg-accent-soft p-[18px]">
          <Kicker>
            <ScrambleText text={block.title} />
          </Kicker>
          <p className="type-lead mt-2">{block.node}</p>
        </div>
      );

    case "spine":
      return (
        <Timeline
          entries={block.steps.map<TimelineEntry>((step) => ({
            cue: step.cue,
            text: step.note,
            highlighted: Boolean(step.highlighted),
          }))}
        />
      );

    case "example":
      return (
        <div className="mb-7">
          <Kicker>
            <ScrambleText text={block.title ?? t.example} />
          </Kicker>
          <div className="mt-3.5">
            <Timeline
              entries={block.lines.map<TimelineEntry>((line) => ({
                cue: line.cue,
                text: line.text,
                highlighted: HIGHLIGHT.test(line.cue),
              }))}
            />
          </div>
        </div>
      );

    case "comparison":
      return (
        <div className="mb-[26px]">
          {block.items.map(({ alive, label, text, note }, index) => (
            <div
              key={index}
              className={cn(
                "mb-3.5 border-l-[3px] pl-4",
                alive ? "border-alive" : "border-dead",
              )}
            >
              <div
                className={cn(
                  "type-comparison-label mb-1.5",
                  alive ? "text-alive" : "text-dead",
                )}
              >
                <ScrambleText text={alive ? t.alive : t.dead} /> —{" "}
                <ScrambleText text={label} />
              </div>
              <p className="type-body">
                <ScrambleText text={text} />
              </p>
              <p className="type-body-secondary mt-[5px]">
                <ScrambleText text={note} />
              </p>
            </div>
          ))}
        </div>
      );

    case "traps":
      return (
        <div className="mb-1.5">
          {block.items.map(({ title, note }, index) => (
            <div key={index} className="mb-4 flex gap-3.5">
              <span className="type-trap-number min-w-[22px] text-accent">
                {index + 1}
              </span>
              <div>
                <div className="type-lead mb-0.5">
                  <ScrambleText text={title} />
                </div>
                <div className="type-body-secondary">
                  <ScrambleText text={note} />
                </div>
              </div>
            </div>
          ))}
        </div>
      );

    case "exercises":
      return (
        <>
          {block.items.map(({ tag, title, note }, index) => (
            <div
              key={index}
              className="surface-card mb-2.5 cursor-default transition duration-200 hover:-translate-y-0.5 hover:shadow-lg"
            >
              <div className="mb-1 flex items-baseline justify-between">
                <div className="type-card-title">
                  <ScrambleText text={title} />
                </div>
                <Badge
                  className={cn(
                    "border border-accent text-accent",
                    index % 2 === 0 ? "rotate-2" : "-rotate-2",
                  )}
                >
                  <ScrambleText text={tag} />
                </Badge>
              </div>
              <div className="type-body-secondary">
                <ScrambleText text={note} />
              </div>
            </div>
          ))}
        </>
      );

    case "next":
      return (
        <div className="mt-7 border-t border-line pt-5">
          <Kicker>
            <ScrambleText text={t.next} />
          </Kicker>
          <p className="type-body mt-2">{block.node}</p>
        </div>
      );

    default:
      return null;
  }
}
