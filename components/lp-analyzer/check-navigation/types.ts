export interface AdData {
  name: string;
  h: string;
  b1: string;
  b2: string;
  c: string;
  ctr: string;
  cvr: string;
  hook: string;
  body1: string;
  body2: string;
  cta: string;
}

export interface AnalysisItem {
  text: string;
}

export interface RoadmapButton {
  icon: string;
  label: string;
  onClick?: () => void;
}

export interface RoadmapStep {
  step: number;
  title: string;
  buttons: RoadmapButton[];
}
