export interface BGMOption {
  id: string;
  name: string;
  duration: string;
}

export type Orientation = "horizontal" | "vertical";
export type Template = "simple" | "dynamic" | "desc";

export interface DesignSettings {
  logoUrl?: string;
  orientation: Orientation;
  backgroundColor: string;
  ctaTextColor: string;
  font: string;
  template: Template;
  selectedBgm: string;
  gender: string;
}
