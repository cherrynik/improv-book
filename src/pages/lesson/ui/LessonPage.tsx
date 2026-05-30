import { Navigate, useNavigate, useParams } from "react-router-dom";
import { getSectionById } from "@/entities/section";
import { getLessonById } from "@/entities/lesson";
import { LessonContent } from "@/widgets/lesson-content";
import { useI18n } from "@/shared/i18n";

export function LessonPage() {
  const { sectionId } = useParams();
  const navigate = useNavigate();
  const { locale } = useI18n();

  const section = sectionId ? getSectionById(sectionId, locale) : undefined;
  const lesson = sectionId ? getLessonById(sectionId, locale) : undefined;

  if (!section || !lesson) {
    return <Navigate to="/" replace />;
  }

  return (
    <LessonContent
      section={section}
      lesson={lesson}
      onBack={() => navigate("/")}
    />
  );
}
