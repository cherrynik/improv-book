import type { Locale } from "./types";

export const UI = {
  ru: {
    eyebrow: "играй смелее",
    titleLead: "Импров",
    titleAccent: "для своих",
    homeSubtitle:
      "Понятный путь от первой сцены. Один раздел — один навык, по порядку.",
    sections: "Разделы",
    minutes: "мин",
    soon: "скоро",
    start: "Начать",
    back: "К разделам",
    essence: "Суть",
    example: "Пример",
    next: "Дальше",
    alive: "Живой",
    dead: "Мёртвый",
    teaserKicker: "Дальше в пути",
    teaserTitle: "Персонажи,\nформаты, жанры",
    teaserSubtitle: "Новые разделы появляются регулярно",
    madeIn: "Сделано в Тбилиси",
    weHere: "Мы играем здесь",
    community: "Сообщество",
    communityTitle: "Импров в Тбилиси",
    communitySubtitle: "Живые игры, джемы и сцена. Сюда я и зову всех, кто учится.",
    pitchBig: "Выходи на сцену.",
    pitchSub: "Теория — только начало. Настоящее обучение там, где есть зал.",
    enthusiasm: "Делаю на энтузиазме",
    enthusiasmSub:
      "Веду проект для ребят сам. Если материалы полезны — поддержи, чтобы разделов становилось больше.",
    support: "Поддержать",
  },
  en: {
    eyebrow: "play bolder",
    titleLead: "Improv",
    titleAccent: "for your crew",
    homeSubtitle:
      "A clear path from your first scene. One section — one skill, in order.",
    sections: "Sections",
    minutes: "min",
    soon: "soon",
    start: "Start",
    back: "Sections",
    essence: "Essence",
    example: "Example",
    next: "Next",
    alive: "Alive",
    dead: "Dead",
    teaserKicker: "More on the way",
    teaserTitle: "Characters,\nformats, genres",
    teaserSubtitle: "New sections drop regularly",
    madeIn: "Made in Tbilisi",
    weHere: "We play here",
    community: "Community",
    communityTitle: "Improv in Tbilisi",
    communitySubtitle:
      "Live games, jams and stage. This is where I invite everyone who's learning.",
    pitchBig: "Get on stage.",
    pitchSub: "Theory is just the start. Real learning happens where there's a room.",
    enthusiasm: "Running on enthusiasm",
    enthusiasmSub:
      "I run this project myself. If the materials help — support it so more sections appear.",
    support: "Support",
  },
} satisfies Record<Locale, Record<string, string>>;

export type Translation = (typeof UI)["ru"];
