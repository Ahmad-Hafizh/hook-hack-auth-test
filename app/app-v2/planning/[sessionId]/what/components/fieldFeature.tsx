import React from "react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

type FieldFeatureProps = {
  icon?: React.ReactNode;
  label: string;
  isTextarea?: boolean;
  inputHeight?: string;
  topSelected?: "function" | "emotion";
  bottomSelected?: "process" | "result";
  // API tags format
  tags?: {
    type?: "functional" | "emotional";
    focus?: "process" | "outcome";
  };
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
};

// Helper to convert API tags to UI format
const getTopSelected = (tags?: { type?: string }): "function" | "emotion" => {
  if (tags?.type === "emotional") return "emotion";
  return "function";
};

const getBottomSelected = (tags?: { focus?: string }): "process" | "result" => {
  if (tags?.focus === "outcome") return "result";
  return "process";
};

const FieldFeature = ({
  icon,
  label,
  isTextarea,
  inputHeight,
  topSelected,
  bottomSelected,
  tags,
  placeholder,
  value,
  onChange,
}: FieldFeatureProps) => {
  // Use API tags if provided, otherwise fall back to direct props
  const effectiveTopSelected = tags ? getTopSelected(tags) : topSelected;
  const effectiveBottomSelected = tags ? getBottomSelected(tags) : bottomSelected;

  if (onChange) {
    return (
      <div className="flex flex-col gap-2">
        {/* headers field */}
        <div className="flex justify-between items-start mb-1 h-[48px]">
          <label className="text-sm font-bold text-text-main flex items-center gap-2 pt-1">
            {icon}
            {label}
          </label>
          {/* toggle buttons */}
          <div className="flex flex-col items-end gap-1.5">
            {/* upper toggle */}

            <ToggleGroup
              type="single"
              className="border rounded flex gap-0 py-0"
              size={"sm"}
              value={effectiveTopSelected}
            >
              <ToggleGroupItem
                value="function"
                className={`text-[10px] rounded-none px-2 py-0.5 h-fit border-r ${effectiveTopSelected === "function" ? "bg-sky-100 text-sky-700 font-semibold" : ""}`}
              >
                機能
              </ToggleGroupItem>
              <ToggleGroupItem
                value="emotion"
                className={`text-[10px] rounded-none px-2 py-0.5 h-fit ${effectiveTopSelected === "emotion" ? "bg-pink-100 text-pink-700 font-semibold" : ""}`}
              >
                情緒
              </ToggleGroupItem>
            </ToggleGroup>
            {/* lower toggle */}
            <ToggleGroup
              type="single"
              className="border rounded flex gap-0 py-0"
              size={"sm"}
              value={effectiveBottomSelected}
            >
              <ToggleGroupItem
                value="process"
                className={`text-[10px] rounded-none px-2 py-0.5 h-fit border-r ${effectiveBottomSelected === "process" ? "bg-amber-100 text-amber-700 font-semibold" : ""}`}
              >
                プロセス
              </ToggleGroupItem>
              <ToggleGroupItem
                value="result"
                className={`text-[10px] rounded-none px-2 py-0.5 h-fit ${effectiveBottomSelected === "result" ? "bg-green-100 text-green-700 font-semibold" : ""}`}
              >
                結果
              </ToggleGroupItem>
            </ToggleGroup>
          </div>
        </div>

        {isTextarea ? (
          <textarea
            className={`w-full text-sm p-3 rounded-lg border border-border-light bg-surface-subtle focus:bg-white focus:ring-1 focus:ring-primary focus:border-primary transition-all resize-none text-text-main leading-relaxed ${inputHeight ? inputHeight : "h-[84px]"}`}
            placeholder={placeholder}
            value={value}
            onChange={(e) => onChange(e.target.value)}
          />
        ) : (
          <input
            type="text"
            className={`w-full text-sm p-3 rounded-lg border border-border-light bg-surface-subtle focus:bg-white focus:ring-1 focus:ring-primary focus:border-primary transition-all text-text-main ${inputHeight ? inputHeight : "h-[46px]"}`}
            placeholder={placeholder}
            value={value}
            onChange={(e) => onChange(e.target.value)}
          />
        )}
      </div>
    );
  } else {
    return (
      <div className="flex flex-col gap-2">
        <div className="flex justify-between items-start mb-1 h-[48px]">
          <label className="text-sm font-bold text-text-main flex items-center gap-2 pt-1">
            {label}
          </label>
          {/* toggle buttons - same as editable version */}
          <div className="flex flex-col items-end gap-1.5">
            {/* upper toggle */}
            <ToggleGroup
              type="single"
              className="border rounded flex gap-0 py-0"
              size={"sm"}
              value={effectiveTopSelected}
            >
              <ToggleGroupItem
                value="function"
                className={`text-[10px] rounded-none px-2 py-0.5 h-fit border-r ${effectiveTopSelected === "function" ? "bg-sky-100 text-sky-700 font-semibold" : ""}`}
              >
                機能
              </ToggleGroupItem>
              <ToggleGroupItem
                value="emotion"
                className={`text-[10px] rounded-none px-2 py-0.5 h-fit ${effectiveTopSelected === "emotion" ? "bg-pink-100 text-pink-700 font-semibold" : ""}`}
              >
                情緒
              </ToggleGroupItem>
            </ToggleGroup>
            {/* lower toggle */}
            <ToggleGroup
              type="single"
              className="border rounded flex gap-0 py-0"
              size={"sm"}
              value={effectiveBottomSelected}
            >
              <ToggleGroupItem
                value="process"
                className={`text-[10px] rounded-none px-2 py-0.5 h-fit border-r ${effectiveBottomSelected === "process" ? "bg-amber-100 text-amber-700 font-semibold" : ""}`}
              >
                プロセス
              </ToggleGroupItem>
              <ToggleGroupItem
                value="result"
                className={`text-[10px] rounded-none px-2 py-0.5 h-fit ${effectiveBottomSelected === "result" ? "bg-green-100 text-green-700 font-semibold" : ""}`}
              >
                結果
              </ToggleGroupItem>
            </ToggleGroup>
          </div>
        </div>
        <div className="p-4 h-[84px]">
          <p>{value}</p>
        </div>
      </div>
    );
  }
};

export default FieldFeature;
