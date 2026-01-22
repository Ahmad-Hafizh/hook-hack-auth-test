export type VerificationTarget = "hook" | "body1" | "body2" | "cta";

export interface RowData {
  hook: string;
  body1: string;
  body2: string;
  cta: string;
  hookChecked: boolean;
  body1Checked: boolean;
  body2Checked: boolean;
  ctaChecked: boolean;
}

export interface PatternCounts {
  imagePatterns: number;
  textPatterns: number;
  total: number;
}
