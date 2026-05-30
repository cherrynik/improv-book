import type { ReactNode } from "react";
import { cn } from "@/shared/lib/cn";

interface KickerProps {
  children: ReactNode;
  className?: string;
}

export function Kicker({ children, className }: KickerProps) {
  return (
    <div className={cn("type-kicker text-accent", className)}>
      {children}
    </div>
  );
}
