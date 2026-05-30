import { useNavigate } from "react-router-dom";
import type { Section } from "@/entities/section";
import { useThemeColor } from "@/shared/lib/useThemeColor";
import { HomeHeader } from "./HomeHeader";
import { SectionsList } from "./SectionsList";
import { NextTeaser } from "./NextTeaser";
import { CommunityCard } from "./CommunityCard";
import { PitchSection } from "./PitchSection";

export function HomePage() {
  const navigate = useNavigate();
  useThemeColor("#fffbf5");

  const openSection = (section: Section) => {
    navigate(`/lesson/${section.id}`);
  };

  return (
    <div className="home-backdrop min-h-lvh">
      <div className="mx-auto max-w-[480px] px-[clamp(18px,5vw,26px)] pt-[clamp(44px,9vw,64px)] pb-14">
        <HomeHeader />
        <SectionsList onOpen={openSection} />
        <NextTeaser />
        <CommunityCard />
        <PitchSection />
      </div>
    </div>
  );
}
