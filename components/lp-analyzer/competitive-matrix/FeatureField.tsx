import React from "react";
import { FeatureToggleGroup } from "./FeatureToggleGroup";

interface FeatureFieldProps {
  icon?: React.ReactNode;
  label: string;
  value: string;
  placeholder?: string;
  height?: string;
  isTextarea?: boolean;
  topSelected?: "function" | "emotion";
  bottomSelected?: "process" | "result";
  showToggle?: boolean;
  disabled?: boolean;
  onChange?: (value: string) => void;
  onTopChange?: (value: "function" | "emotion") => void;
  onBottomChange?: (value: "process" | "result") => void;
}

export const FeatureField: React.FC<FeatureFieldProps> = ({
  icon,
  label,
  value,
  placeholder = "",
  height = "h-[110px]",
  isTextarea = true,
  topSelected = "function",
  bottomSelected = "result",
  showToggle = true,
  disabled = false,
  onChange,
  onTopChange,
  onBottomChange,
}) => {
  const inputClasses = `w-full text-sm p-3 rounded-lg border transition-all text-text-main leading-relaxed ${height} ${
    disabled
      ? "bg-gray-50 border-gray-200 cursor-not-allowed"
      : "border-border-light bg-surface-subtle focus:bg-white focus:ring-1 focus:ring-primary focus:border-primary"
  }`;

  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-between items-start mb-1 h-[48px]">
        <label className="text-sm font-bold text-text-main flex items-center gap-2 pt-1">
          {icon}
          {label}
        </label>
        {showToggle && !disabled && (
          <FeatureToggleGroup
            topSelected={topSelected}
            bottomSelected={bottomSelected}
            onTopChange={onTopChange}
            onBottomChange={onBottomChange}
          />
        )}
      </div>
      {isTextarea ? (
        <textarea
          className={`${inputClasses} resize-none`}
          value={value}
          placeholder={placeholder}
          disabled={disabled}
          onChange={(e) => onChange?.(e.target.value)}
        />
      ) : (
        <input
          type="text"
          className={inputClasses}
          value={value}
          placeholder={placeholder}
          disabled={disabled}
          onChange={(e) => onChange?.(e.target.value)}
        />
      )}
    </div>
  );
};
