import { useEffect, useRef, useState, type CSSProperties } from "react";
import { Badge, GlassButton, ScrambleText } from "@/shared/ui";
import { cn } from "@/shared/lib/cn";
import { useI18n } from "@/shared/i18n";
import { useRipple } from "@/shared/lib/useRipple";
import type { Section } from "../model/types";

const MAX_TILT = 13;
const PERSPECTIVE = 700;
const PROXIMITY_RANGE = 120;
const ELEVATE = 14;
const REST_ANGLES = [-0.8, 0.6, -0.4];

const smooth = (value: number) => value * value * (3 - 2 * value);

interface SectionCardProps {
  section: Section;
  index: number;
  onOpen: (section: Section) => void;
}

export function SectionCard({ section, index, onOpen }: SectionCardProps) {
  const cardRef = useRef<HTMLButtonElement>(null);
  const [proximity, setProximity] = useState(0);
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });
  const [glare, setGlare] = useState({ x: 50, y: 50 });
  const [pressed, setPressed] = useState(false);
  const { onPointerDown: rippleDown, ripples } = useRipple();
  const { t } = useI18n();
  const ready = section.status === "ready";

  useEffect(() => {
    if (!ready) return;
    let frame = 0;
    let pending: { x: number; y: number } | null = null;

    const process = () => {
      frame = 0;
      const element = cardRef.current;
      if (!element || !pending) return;

      const rect = element.getBoundingClientRect();
      const { x, y } = pending;
      const dx = x < rect.left ? rect.left - x : x > rect.right ? x - rect.right : 0;
      const dy = y < rect.top ? rect.top - y : y > rect.bottom ? y - rect.bottom : 0;
      const distance = Math.hypot(dx, dy);
      const nearness = Math.max(0, 1 - distance / PROXIMITY_RANGE);
      const eased = smooth(nearness);
      setProximity(nearness);

      const horizontal = (x - rect.left) / rect.width;
      const vertical = (y - rect.top) / rect.height;
      const relX = Math.max(-1.5, Math.min(1.5, (horizontal - 0.5) * 2));
      const relY = Math.max(-1.5, Math.min(1.5, (vertical - 0.5) * 2));
      setTilt({
        rotateX: -relY * MAX_TILT * eased,
        rotateY: relX * MAX_TILT * eased,
      });
      setGlare({
        x: Math.max(0, Math.min(1, horizontal)) * 100,
        y: Math.max(0, Math.min(1, vertical)) * 100,
      });
    };

    const onMove = (event: PointerEvent) => {
      if (event.pointerType === "touch") return;
      pending = { x: event.clientX, y: event.clientY };
      if (!frame) frame = requestAnimationFrame(process);
    };

    const onLeave = () => {
      setProximity(0);
      setTilt({ rotateX: 0, rotateY: 0 });
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("mouseleave", onLeave);

    return () => {
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [ready]);

  const elevation = smooth(proximity);
  const scale = pressed ? 0.985 : 1;
  const lift = -ELEVATE * elevation;
  const skew = ready ? REST_ANGLES[index % REST_ANGLES.length] * (1 - elevation) : 0;
  const restSkew = REST_ANGLES[index % REST_ANGLES.length];
  const sheenAngle = 135 + tilt.rotateY * 1.8 - tilt.rotateX * 1.8;
  const transform = ready
    ? `rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg) translateY(${lift}px) scale(${scale}) rotate(${skew}deg)`
    : `rotate(${restSkew}deg)`;

  return (
    <div
      className="relative mb-4 animate-rise"
      style={{
        animationDelay: `${0.08 * index + 0.1}s`,
        perspective: `${PERSPECTIVE}px`,
        zIndex: elevation > 0.01 ? Math.ceil(elevation * 10) : undefined,
      }}
    >
      <button
        ref={cardRef}
        type="button"
        disabled={!ready}
        onClick={() => ready && onOpen(section)}
        onPointerDown={(event) => {
          if (ready) rippleDown(event);
          if (event.pointerType !== "touch") setPressed(true);
        }}
        onPointerUp={() => setPressed(false)}
        onPointerLeave={() => setPressed(false)}
        onPointerCancel={() => setPressed(false)}
        style={
          {
            "--color-accent": section.accent,
            "--elevation": proximity,
            transform,
          } as CSSProperties
        }
        className={cn(
          "group relative block w-full overflow-hidden rounded-panel px-6 py-[26px] text-left will-change-transform",
          ready
            ? "section-card cursor-pointer bg-accent text-white"
            : "cursor-default bg-surface-muted text-faint opacity-65",
        )}
      >
        {ready && (
          <div
            aria-hidden
            className="card-sheen"
            style={
              {
                "--sheen-angle": `${sheenAngle}deg`,
                backgroundPosition: `${glare.x}% ${glare.y}%`,
                opacity: elevation,
              } as CSSProperties
            }
          />
        )}

        {ripples}

        <div className="type-watermark-card pointer-events-none absolute -right-2 -bottom-7">
          {section.number}
        </div>

        <div className="mb-3.5 flex items-center justify-between">
          <span className="type-card-eyebrow opacity-90">
            <ScrambleText text={section.stage} />
          </span>
          <Badge
            className={ready ? "bg-white/[0.18]" : "border border-border-muted"}
          >
            <ScrambleText
              text={ready ? `${section.minutes} ${t.minutes}` : t.soon}
            />
          </Badge>
        </div>

        <h3 className="type-card-heading relative mb-2">
          <ScrambleText text={section.title} />
        </h3>
        <p className="type-card-subtitle relative max-w-[280px] opacity-[0.94]">
          <ScrambleText text={section.subtitle} />
        </p>

        {ready && (
          <GlassButton as="div" className="type-cta relative mt-5 group-hover:bg-white/30">
            <ScrambleText text={t.start} />
            <span className="transition-transform duration-200 ease-out group-hover:translate-x-1">
              →
            </span>
          </GlassButton>
        )}
      </button>
    </div>
  );
}
