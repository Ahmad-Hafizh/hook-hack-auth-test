import React from "react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

type FieldFeatureProps = {
  icon?: React.ReactNode;
  label: string;
  isTextarea?: boolean;
  inputHeight?: string;
  topSelected?: "function" | "emotion";
  bottomSelected?: "process" | "result";
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
};

const FieldFeature = ({
  icon,
  label,
  isTextarea,
  inputHeight,
  topSelected,
  bottomSelected,
  placeholder,
  value,
  onChange,
}: FieldFeatureProps) => {
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
              value={topSelected}
            >
              <ToggleGroupItem
                value="function"
                className="text-[10px] rounded-none px-2 py-0.5 h-fit border-r"
              >
                機能
              </ToggleGroupItem>
              <ToggleGroupItem
                value="emotion"
                className="text-[10px] rounded-none px-2 py-0.5 h-fit"
              >
                情緒
              </ToggleGroupItem>
            </ToggleGroup>
            {/* lower toggle */}
            <ToggleGroup
              type="single"
              className="border rounded flex gap-0 py-0"
              size={"sm"}
              value={bottomSelected}
            >
              <ToggleGroupItem
                value="process"
                className="text-[10px] rounded-none px-2 py-0.5 h-fit border-r"
              >
                プロセス
              </ToggleGroupItem>
              <ToggleGroupItem
                value="result"
                className="text-[10px] rounded-none px-2 py-0.5 h-fit "
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
          <div className="flex gap-2">
            <div className="px-2 py-0.5 border rounded text-[10px]">
              {topSelected == "function" ? "機能" : "情緒"}
            </div>
            <div className="px-2 py-0.5 border rounded text-[10px]">
              {bottomSelected === "process" ? "プロセス" : "結果"}
            </div>
          </div>
        </div>
        <div className="p-4 h-[84px] ">
          <p>{value}</p>
        </div>
      </div>
    );
  }
};

export default FieldFeature;
