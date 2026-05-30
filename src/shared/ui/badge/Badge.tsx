import type { ReactNode } from "react";
import { cn } from "@/shared/lib/cn";

interface BadgeProps {
  children: ReactNode;
  className?: string;
}

export function Badge({ children, className }: BadgeProps) {
  return (
    <span className={cn("type-badge rounded-pill px-2.5 py-1", className)}>
      {children}
    </span>
  );
}
