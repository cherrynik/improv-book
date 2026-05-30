import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type CSSProperties,
} from "react";
import { Badge, GlassButton, ScrambleText } from "@/shared/ui";
import { useI18n } from "@/shared/i18n";
import { useThemeColor } from "@/shared/lib/useThemeColor";
import { getAdjacentSections, type Section } from "@/entities/section";
import type { Lesson } from "@/entities/lesson";
import { Block } from "./blocks/Block";
import { LessonNav } from "./LessonNav";

const COLLAPSE_DISTANCE = 150;
const RADIUS_DISTANCE = 60;
const BAR_FONT_SIZE = 16;
const BAR_PADDING = 22;

interface TitleGeometry {
  left: number;
  top: number;
  dx: number;
  dy: number;
  collapsedScale: number;
}

interface LessonContentProps {
  section: Section;
  lesson: Lesson;
  onBack: () => void;
  onOpen: (id: string) => void;
}

export function LessonContent({ section, lesson, onBack, onOpen }: LessonContentProps) {
  const { t, locale } = useI18n();
  useThemeColor(section.accent);
  const { prev, next } = getAdjacentSections(section.id, locale);

  const barOuterRef = useRef<HTMLDivElement>(null);
  const barInnerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const placeholderRef = useRef<HTMLHeadingElement>(null);
  const [geometry, setGeometry] = useState<TitleGeometry | null>(null);

  useLayoutEffect(() => {
    const measure = () => {
      const inner = barInnerRef.current;
      const title = titleRef.current;
      const placeholder = placeholderRef.current;
      if (!inner || !title || !placeholder) return;

      const barRect = inner.getBoundingClientRect();
      const phRect = placeholder.getBoundingClientRect();
      const fontSize = parseFloat(getComputedStyle(placeholder).fontSize);

      // title renders at full (hero) size and scales DOWN — downscaling stays
      // crisp, unlike scaling a small raster up.
      const collapsedScale = BAR_FONT_SIZE / fontSize;
      const collapsedWidth = title.offsetWidth * collapsedScale;
      const collapsedHeight = title.offsetHeight * collapsedScale;
      const collapsedLeft = barRect.width - BAR_PADDING - collapsedWidth;
      const collapsedTop = (barRect.height - collapsedHeight) / 2;

      // placeholder scrolls with the page — normalise to scroll-0 so a reload
      // mid-page measures the same expanded position as at the top.
      setGeometry({
        left: collapsedLeft,
        top: collapsedTop,
        dx: phRect.left - barRect.left - collapsedLeft,
        dy: phRect.top + window.scrollY - barRect.top - collapsedTop,
        collapsedScale,
      });
    };

    let lastWidth = window.innerWidth;
    const onResize = () => {
      if (window.innerWidth === lastWidth) return;
      lastWidth = window.innerWidth;
      measure();
    };

    measure();
    window.addEventListener("resize", onResize);
    document.fonts?.ready.then(measure);
    return () => window.removeEventListener("resize", onResize);
  }, [lesson]);

  useEffect(() => {
    const outer = barOuterRef.current;
    const morph = titleRef.current;
    const staticTitle = placeholderRef.current;
    let frame = 0;

    const apply = () => {
      frame = 0;
      const scrollY = window.scrollY;
      if (outer) {
        const radius = Math.min(1, Math.max(0, scrollY / RADIUS_DISTANCE));
        outer.style.setProperty("--scroll", String(radius));
      }

      // At the very top (incl. over-scroll bounce, scrollY <= 0) the title stays
      // static in the hero flow; the fixed morphing copy only kicks in past 0.
      const atTop = scrollY <= 0;
      if (staticTitle) staticTitle.style.opacity = atTop ? "1" : "0";
      if (morph) {
        morph.style.opacity = atTop ? "0" : "1";
        if (geometry) {
          const expanded = 1 - Math.min(1, Math.max(0, scrollY / COLLAPSE_DISTANCE));
          const scale =
            geometry.collapsedScale + (1 - geometry.collapsedScale) * expanded;
          morph.style.transform = `translate(${geometry.dx * expanded}px, ${geometry.dy * expanded}px) scale(${scale})`;
        }
      }
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(apply);
    };

    apply();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [geometry]);

  const titleStyle: CSSProperties = geometry
    ? {
        position: "absolute",
        left: geometry.left,
        top: geometry.top,
        opacity: 0,
        transformOrigin: "top left",
        transform: `translate(${geometry.dx}px, ${geometry.dy}px) scale(1)`,
        willChange: "transform",
      }
    : { position: "absolute", opacity: 0 };

  return (
    <div
      style={
        {
          "--color-accent": section.accent,
          "--color-accent-soft": section.accentSoft,
        } as CSSProperties
      }
      className="no-scrollbar min-h-lvh bg-paper"
    >
      <div
        ref={barOuterRef}
        className="lesson-bar fixed top-0 right-0 left-0 z-30 border-b border-white/15 bg-accent/90 pt-[env(safe-area-inset-top)] backdrop-blur-md backdrop-saturate-150 [transform:translateZ(0)]"
      >
        <div ref={barInnerRef} className="relative mx-auto max-w-[480px] px-[22px] py-3">
          <GlassButton onClick={onBack} className="type-back cursor-pointer">
            <span className="transition-transform duration-200 ease-out group-hover/glass:-translate-x-1">
              ←
            </span>
            <ScrambleText text={t.back} />
          </GlassButton>
          <div
            ref={titleRef}
            aria-hidden
            style={titleStyle}
            className="type-hero-title pointer-events-none whitespace-nowrap text-white"
          >
            {lesson.titleNode}
          </div>
        </div>
      </div>

      <div className="lesson-hero relative overflow-hidden rounded-b-panel bg-accent pt-[calc(env(safe-area-inset-top)+60px)] pb-9 text-white">
        <div className="relative mx-auto max-w-[480px] px-[22px] pt-4">
          <div className="type-watermark-hero pointer-events-none absolute -right-[10px] -bottom-[34px]">
            {section.number}
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

          <h1 ref={placeholderRef} className="type-hero-title">
            {lesson.titleNode}
          </h1>
          <p className="type-hero-lede mt-3.5 max-w-[320px] opacity-95">
            <ScrambleText text={lesson.lede} />
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-[480px] px-[22px] pt-[34px] pb-[60px]">
        {lesson.blocks.map((block, index) => (
          <Block key={index} block={block} />
        ))}
        <LessonNav prev={prev} next={next} onOpen={onOpen} onHome={onBack} />
      </div>
    </div>
  );
}
