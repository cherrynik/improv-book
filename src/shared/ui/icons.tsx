// Brand glyphs — lucide dropped logo icons (trademarks), so these stay custom.
interface IconProps {
  className?: string;
}

export function InstagramIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden className={className}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17" cy="6.8" r="1.1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function TelegramIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className={className}>
      <path d="M21.94 4.3 19.2 19.06c-.2 1.08-.84 1.34-1.7.83l-4.7-3.46-2.27 2.18c-.25.25-.46.46-.95.46l.34-4.78L18.9 6.2c.38-.34-.08-.53-.59-.19L6.6 13.3l-4.7-1.47c-1.02-.32-1.04-1.02.21-1.5L20.6 2.94c.85-.3 1.6.2 1.34 1.36z" />
    </svg>
  );
}
