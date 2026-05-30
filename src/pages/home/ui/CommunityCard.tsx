import { Heart } from "lucide-react";
import { ScrambleText, InstagramIcon, TelegramIcon } from "@/shared/ui";
import { useI18n } from "@/shared/i18n";

export function CommunityCard() {
  const { t } = useI18n();

  return (
    <div>
      <div className="type-kicker mt-12 mb-4 text-muted">
        <ScrambleText text={t.weHere} />
      </div>

      <div className="community-surface relative overflow-hidden rounded-panel px-7 py-8 text-white">
        <Heart
          fill="currentColor"
          strokeWidth={0}
          className="pointer-events-none absolute -right-6 -bottom-12 h-56 w-56 text-white/10"
        />

        <div className="relative">
          <div className="type-kicker text-white/70">
            <ScrambleText text={t.community} />
          </div>
          <h3 className="type-pitch mt-3 text-white">
            <ScrambleText text={t.communityTitle} suffix="🇬🇪" />
          </h3>
          <p className="type-hero-lede mt-4 max-w-[300px] text-white/85">
            <ScrambleText text={t.communitySubtitle} />
          </p>

          <div className="mt-7 flex items-center gap-3">
            <a
              href="https://instagram.com/improv_tbilisi"
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
              className="flex h-12 w-12 items-center justify-center rounded-full border border-white/15 bg-white/15 transition-colors duration-200 hover:bg-white/25"
            >
              <InstagramIcon className="h-5 w-5" />
            </a>
            <a
              href="https://t.me/impro_v_tbilisi"
              target="_blank"
              rel="noreferrer"
              aria-label="Telegram"
              className="flex h-12 w-12 items-center justify-center rounded-full border border-white/15 bg-white/15 transition-colors duration-200 hover:bg-white/25"
            >
              <TelegramIcon className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
