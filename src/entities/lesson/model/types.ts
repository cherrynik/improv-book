import type { ReactNode } from "react";

export type DialogueKind = "block" | "weak" | "good";

export interface DialogueExample {
  kind: DialogueKind;
  label: string;
  cue: string;
  response: string;
  note: string;
}

export interface DefinitionHalf {
  term: string;
  lead: string;
  description: string;
}

export interface SpineStep {
  cue: string;
  note: string;
  highlighted?: boolean;
}

export interface ComparisonItem {
  alive: boolean;
  label: string;
  text: string;
  note: string;
}

export interface ExampleLine {
  cue: string;
  text: string;
}

export interface TrapItem {
  title: string;
  note: string;
}

export interface ExerciseItem {
  tag: string;
  title: string;
  note: string;
}

export type LessonBlock =
  | { type: "essence"; text: string }
  | { type: "paragraph"; node: ReactNode }
  | { type: "heading"; text: string }
  | { type: "dialogues"; items: DialogueExample[] }
  | { type: "definitionHalves"; items: DefinitionHalf[] }
  | { type: "callout"; title: string; node: ReactNode }
  | { type: "spine"; steps: SpineStep[] }
  | { type: "example"; title?: string; lines: ExampleLine[] }
  | { type: "comparison"; items: ComparisonItem[] }
  | { type: "traps"; items: TrapItem[] }
  | { type: "exercises"; items: ExerciseItem[] }
  | { type: "next"; node: ReactNode };

export interface Lesson {
  titleNode: ReactNode;
  lede: string;
  blocks: LessonBlock[];
}
