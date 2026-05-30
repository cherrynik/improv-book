import { useEffect, useState, type AnimationEvent } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { HomePage } from "@/pages/home";
import { LessonPage } from "@/pages/lesson";
import { SiteFooter } from "@/widgets/site-footer";

export function AppRoutes() {
  const location = useLocation();
  const [displayed, setDisplayed] = useState(location);
  const [stage, setStage] = useState<"enter" | "exit">("enter");

  useEffect(() => {
    if (location.pathname !== displayed.pathname) setStage("exit");
  }, [location, displayed]);

  const handleAnimationEnd = (event: AnimationEvent<HTMLDivElement>) => {
    if (event.target !== event.currentTarget) return;
    if (stage === "exit") {
      setDisplayed(location);
      setStage("enter");
      window.scrollTo(0, 0);
    }
  };

  return (
    <div
      key={displayed.pathname}
      className={stage === "exit" ? "page-exit" : "page-enter"}
      onAnimationEnd={handleAnimationEnd}
    >
      <Routes location={displayed}>
        <Route path="/" element={<HomePage />} />
        <Route path="/lesson/:sectionId" element={<LessonPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <SiteFooter />
    </div>
  );
}
