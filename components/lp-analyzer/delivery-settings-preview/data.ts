import { BGMOption } from "./types";

export const bgmOptions: BGMOption[] = [
  { id: "uplifting", name: "Uplifting Corporate", duration: "2:58" },
  { id: "gentle", name: "Gentle Acoustic", duration: "3:12" },
  { id: "energetic", name: "Energetic Pop", duration: "2:45" },
];

export const fontOptions = ["Noto Sans JP", "Hiragino Sans", "Yu Gothic"];

export const templateOptions = [
  { id: "simple" as const, name: "シンプルモダン", previewBg: "bg-gray-50" },
  { id: "dynamic" as const, name: "ダイナミック", previewBg: "bg-slate-50" },
  { id: "desc" as const, name: "説明的", previewBg: "bg-blue-50" },
];
