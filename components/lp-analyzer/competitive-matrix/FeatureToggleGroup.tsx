import React from "react";
import { FeatureTag } from "./FeatureTag";

interface FeatureToggleGroupProps {
  topSelected: "function" | "emotion";
  bottomSelected: "process" | "result";
  onTopChange?: (value: "function" | "emotion") => void;
  onBottomChange?: (value: "process" | "result") => void;
}

export const FeatureToggleGroup: React.FC<FeatureToggleGroupProps> = ({
  topSelected,
  bottomSelected,
  onTopChange,
  onBottomChange,
}) => (
  <div className="flex flex-col items-end gap-1.5">
    <div className="flex rounded overflow-hidden border border-border-light bg-surface-subtle">
      <FeatureTag
        label="機能"
        isActive={topSelected === "function"}
        onClick={() => onTopChange?.("function")}
      />
      <FeatureTag
        label="情緒"
        isActive={topSelected === "emotion"}
        onClick={() => onTopChange?.("emotion")}
      />
    </div>
    <div className="flex rounded overflow-hidden border border-border-light bg-surface-subtle">
      <FeatureTag
        label="プロセス"
        isActive={bottomSelected === "process"}
        onClick={() => onBottomChange?.("process")}
      />
      <FeatureTag
        label="結果"
        isActive={bottomSelected === "result"}
        onClick={() => onBottomChange?.("result")}
      />
    </div>
  </div>
);
