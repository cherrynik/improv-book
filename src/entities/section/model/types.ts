export type SectionStatus = "ready" | "soon";

export interface Section {
  id: string;
  number: string;
  stage: string;
  title: string;
  subtitle: string;
  minutes?: number;
  status: SectionStatus;
  accent: string;
  accentSoft: string;
}
