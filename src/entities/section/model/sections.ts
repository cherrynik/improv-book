import type { Locale, Localized } from "@/shared/i18n";
import type { Section } from "./types";

interface SectionContent {
  id: string;
  number: string;
  minutes?: number;
  status: Section["status"];
  accent: string;
  accentSoft: string;
  stage: Localized<string>;
  title: Localized<string>;
  subtitle: Localized<string>;
}

const SECTION_CONTENT: SectionContent[] = [
  {
    id: "story-spine",
    number: "01",
    minutes: 6,
    status: "ready",
    accent: "#2A6F97",
    accentSoft: "#E8F0F5",
    stage: { ru: "Сторителлинг", en: "Storytelling" },
    title: { ru: "Story Spine", en: "Story Spine" },
    subtitle: {
      ru: "Каркас истории, который держится на причинности, а не на хронологии",
      en: "A story spine that holds on causality, not chronology",
    },
  },
  {
    id: "yes-and",
    number: "02",
    minutes: 7,
    status: "ready",
    accent: "#E4572E",
    accentSoft: "#FCEDE7",
    stage: { ru: "Основы", en: "Basics" },
    title: { ru: "«Да, и…»", en: "“Yes, and…”" },
    subtitle: {
      ru: "Принятие и вклад — раствор, что скрепляет сцену",
      en: "Acceptance and contribution — the mortar that binds a scene",
    },
  },
  {
    id: "game",
    number: "03",
    status: "soon",
    accent: "#6A4C93",
    accentSoft: "#F0EAF7",
    stage: { ru: "Игра сцены", en: "Game of the scene" },
    title: { ru: "The Game of the Scene", en: "The Game of the Scene" },
    subtitle: {
      ru: "Поиск необычного и его хайтенинг",
      en: "Finding the unusual and heightening it",
    },
  },
];

export function getSections(locale: Locale): Section[] {
  return SECTION_CONTENT.map((section) => ({
    id: section.id,
    number: section.number,
    minutes: section.minutes,
    status: section.status,
    accent: section.accent,
    accentSoft: section.accentSoft,
    stage: section.stage[locale],
    title: section.title[locale],
    subtitle: section.subtitle[locale],
  }));
}

export function getSectionById(id: string, locale: Locale): Section | undefined {
  return getSections(locale).find((section) => section.id === id);
}

export function getAdjacentSections(id: string, locale: Locale) {
  const sections = getSections(locale);
  const index = sections.findIndex((section) => section.id === id);
  if (index === -1) return { prev: undefined, next: undefined };

  const ready = (section: Section) => section.status === "ready";
  const prev = [...sections.slice(0, index)].reverse().find(ready);
  const next = sections.slice(index + 1).find(ready);
  return { prev, next };
}
