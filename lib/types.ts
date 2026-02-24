export interface SearchResult {
  genre: string;
  videoType: string;
  bgm: {
    genre: string;
    bpm: number;
  };
  averageDuration: number;
  keyPoints: string[];
  storyboard: StoryboardItem[];
  insights: {
    hook: InsightItem[];
    problem: InsightItem[];
    cta: InsightItem[];
  };
}

export interface StoryboardItem {
  timeInSeconds: string;
  structure: string;
  caption: string;
  script: string;
  visualInfo: string;
  shootingMethod: string;
  editingEffect: string;
  rtb: string;
}

export interface InsightItem {
  title: string;
  description: string;
  tags: string[];
}