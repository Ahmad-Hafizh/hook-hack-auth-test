export interface IKeywords {
  term: string;
}

export interface ICandidates {
  company_name: string;
  url: string;
  head_company: string;
  reason: string;
  name: string;
  service_name: string;
  source: string;
  title: string;
  hero_text: {
    headline: string;
    subhead: string;
    cta: string;
  };
  _uid?: string;
}

export interface IKeyVisuals {
  url: string;
  title: string;
  screenshot_url: string;
  meta_description: string;
}

export interface IMessageTags {
  type: "functional" | "emotional";
  focus: "process" | "outcome";
}

export interface IStrongPointTagged {
  text: string;
  type: "functional" | "emotional";
  focus: "process" | "outcome";
}

export interface IMatrix {
  url?: string;
  key_message: string;
  key_message_tags?: IMessageTags;
  strong_points: string[];
  strong_points_tagged?: IStrongPointTagged[];
  cta?: string;
  cta_tags?: IMessageTags;
  screenshot_url?: string;
}

export interface ICompetitiveMatrix {
  user: IMatrix;
  competitors: IMatrix[];
  suggestion: IMatrix;
}

export interface IValueOrganization {
  id: string;
  category: string;
  label: string;
  rationale: string;
}

export interface IDesire {
  desire: string;
  reason: string;
  tobe: {
    action: string;
    judgment: string;
    new_assumption: string;
    old_assumption: string;
  };
}

export interface IDesireOrganization {
  value_id: string;
  value_label: string;
  value_category: string;
  desire_1: IDesire;
  desire_2: IDesire;
}

export interface IPositioningPatterns {
  direction_ja: string;
  direction_reason: string;
  outcome_description: string;
  pattern_number: number;
  pattern_label: string;
  process_description: string;
  quadrant_ja: string;
  source_tobe_ids: string[];
  source_value_ids: string[];
  one_liner: string;
  one_line_promise: string;
  functional_value: {
    quadrant: string;
    quadrant_value: string;
  }[];
  emotional_value: {
    quadrant: string;
    quadrant_value: string;
  }[];
}

export interface IWebsite {
  id: string;
  companyName: string;
  serviceName: string;
  serviceUrl: string;
}

export interface IPlan {
  test_term_weeks: number;
  videos_per_month: number;
}

export interface IVariants {
  hooks: string[];
  strong_point_1_messages: string[];
  strong_point_2_messages: string[];
  strong_point_3_messages: string[];
  ctas: string[];
  strong_point_1_images: string[];
  strong_point_2_images: string[];
  strong_point_3_images: string[];
  background_music: string[];
  brand_logo: string;
}

export interface IElements {
  hooks: string[];
  body1Images: string[];
  body1Messages: string[];
  body2Images: string[];
  body2Messages: string[];
  body3Images: string[];
  body3Messages: string[];
  ctas: string[];
}

export interface IPattern {
  hook: string;
  strong_point_1: string;
  strong_point_2: string;
  strong_point_3: string;
  cta: string;
  images: {
    strong_point_1: string;
    strong_point_2: string;
    strong_point_3: string;
    logo: string;
  };
}

export interface TwoPartValue {
  part1: string;
  part2: string;
}

export interface IDataRow {
  hook: TwoPartValue;
  body1: TwoPartValue;
  body2: TwoPartValue;
  cta: TwoPartValue;
}

export interface IDataRowFinalized {
  hookImage: string;
  hookPart1: string;
  hookPart2?: string;
  body1Image: string;
  body1ImageB?: string;
  body1Part1: string;
  body1Part2?: string;
  body2Image: string;
  body2ImageB?: string;
  body2Part1: string;
  body2Part2?: string;
  ctaPart1: string;
  ctaPart2?: string;
  // Legacy fields for backward compatibility
  hook?: string;
  body1?: string;
  body2?: string;
  cta?: string;
}
