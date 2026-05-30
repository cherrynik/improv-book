import type { ElementType, ReactNode } from "react";
import { cn } from "@/shared/lib/cn";

// Translucent pill used on accent / dark surfaces ("Start", "Sections", …).
// Renders a <button> by default; pass `as="div"` when it sits inside another
// clickable element (e.g. a card).
const GLASS_PILL =
  "group/glass inline-flex items-center gap-2 rounded-pill border border-white/15 bg-white/[0.18] px-4 py-2 text-white transition duration-200 hover:bg-white/30 active:scale-95";

interface GlassButtonProps {
  as?: ElementType;
  className?: string;
  onClick?: () => void;
  children: ReactNode;
}

export function GlassButton({
  as: Component = "button",
  className,
  onClick,
  children,
}: GlassButtonProps) {
  const extra = Component === "button" ? { type: "button" as const } : {};
  return (
    <Component className={cn(GLASS_PILL, className)} onClick={onClick} {...extra}>
      {children}
    </Component>
  );
}
