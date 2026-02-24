export interface TwoPartValue {
  part1: string;
  part2: string;
}

export interface CopyRow {
  hook: TwoPartValue;
  body1: TwoPartValue;
  body2: TwoPartValue;
  cta: TwoPartValue;
}

export type VerificationTarget = "hook" | "body1" | "body2" | "cta";
