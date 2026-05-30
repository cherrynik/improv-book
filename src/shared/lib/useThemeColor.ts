import { useEffect } from "react";

// Drives the iOS Safari status-bar / top safe-area tint.
export function useThemeColor(color: string) {
  useEffect(() => {
    const meta = document.querySelector('meta[name="theme-color"]');
    if (!meta) return;
    const previous = meta.getAttribute("content");
    meta.setAttribute("content", color);
    return () => {
      if (previous) meta.setAttribute("content", previous);
    };
  }, [color]);
}
