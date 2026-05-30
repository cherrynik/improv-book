import { Fragment, useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/shared/lib/cn";

const GLYPHS =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZабвгдежзийклмнопрстуфхцчшщ0123456789@#%&*<>/\\—=+?";
const DURATION = 1_000;
const SETTLE_WINDOW = 0.72;
const TICK = 50;

interface ScrambleTextProps {
  text: string;
  className?: string;
  // glued to the last word (never wraps onto its own line) — e.g. a flag emoji
  suffix?: ReactNode;
}

function randomGlyph() {
  return GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
}

const isWhitespace = (token: string) => /^\s+$/.test(token);

export function ScrambleText({ text, className, suffix }: ScrambleTextProps) {
  const [display, setDisplay] = useState(text);
  const previous = useRef(text);
  const frame = useRef(0);
  const settleAt = useRef<number[]>([]);

  useEffect(() => {
    if (previous.current === text) {
      setDisplay(text);
      return;
    }
    previous.current = text;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setDisplay(text);
      return;
    }

    // each character locks in at its own random moment, not left to right
    settleAt.current = Array.from(
      { length: text.length },
      () => Math.random() * SETTLE_WINDOW,
    );

    let startedAt = 0;
    let lastRoll = 0;
    let scrambled = text.split("").map(randomGlyph);

    const step = (timestamp: number) => {
      if (!startedAt) startedAt = timestamp;
      const progress = Math.min(1, (timestamp - startedAt) / DURATION);

      if (timestamp - lastRoll >= TICK) {
        lastRoll = timestamp;
        scrambled = text.split("").map(randomGlyph);
      }

      let output = "";
      for (let i = 0; i < text.length; i++) {
        const char = text[i];
        if (char === " " || char === "\n" || progress >= settleAt.current[i]) {
          output += char;
        } else {
          output += scrambled[i];
        }
      }
      setDisplay(output);

      if (progress < 1) frame.current = requestAnimationFrame(step);
    };

    frame.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame.current);
  }, [text]);

  // reserve each word's final box, overlay the scramble on top — line breaks are
  // fixed by the final words, so varying glyph widths never reflow the text
  const textTokens = text.split(/(\s+)/);
  const displayTokens = display.split(/(\s+)/);
  const lastWordIndex = textTokens.reduce(
    (last, token, index) => (isWhitespace(token) ? last : index),
    -1,
  );

  return (
    <span className={cn("inline-block", className)}>
      {textTokens.map((token, index) => {
        if (isWhitespace(token)) return <Fragment key={index}>{token}</Fragment>;

        const word = (
          <span className="relative inline-block">
            <span className="opacity-0">{token}</span>
            <span aria-hidden className="absolute inset-0 overflow-hidden">
              {displayTokens[index] ?? token}
            </span>
          </span>
        );

        if (index === lastWordIndex && suffix !== undefined) {
          return (
            <span key={index} className="inline-block whitespace-nowrap">
              {word}
              {" "}
              {suffix}
            </span>
          );
        }

        return <Fragment key={index}>{word}</Fragment>;
      })}
    </span>
  );
}
