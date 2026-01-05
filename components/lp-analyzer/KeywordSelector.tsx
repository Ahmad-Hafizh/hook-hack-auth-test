import React, { useState } from "react";
import { cn } from "@/lib/utils";

export interface KeywordOption {
  value: string;
  label: string;
}

export interface KeywordSelectorProps {
  keywords: KeywordOption[];
  selectedKeywords?: string[];
  onSelectionChange?: (selectedKeywords: string[]) => void;
  maxSelection?: number;
  label?: string;
  className?: string;
}

export const KeywordSelector: React.FC<KeywordSelectorProps> = ({
  keywords,
  selectedKeywords = [],
  onSelectionChange,
  maxSelection,
  label,
  className,
}) => {
  const [selected, setSelected] = useState<string[]>(selectedKeywords);

  const handleToggle = (value: string) => {
    let newSelected: string[];

    if (selected.includes(value)) {
      newSelected = selected.filter((k) => k !== value);
    } else {
      if (maxSelection && selected.length >= maxSelection) {
        return;
      }
      newSelected = [...selected, value];
    }

    setSelected(newSelected);

    if (onSelectionChange) {
      onSelectionChange(newSelected);
    }
  };

  return (
    <div className={cn("flex-1 flex flex-col w-full", className)}>
      {label && (
        <label className="block text-lg md:text-xl font-bold text-text-main mb-8 text-left">
          {label}
        </label>
      )}

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full">
        {keywords.map((keyword) => {
          const isSelected = selected.includes(keyword.value);

          return (
            <button
              key={keyword.value}
              type="button"
              onClick={() => handleToggle(keyword.value)}
              className={cn(
                "px-4 py-3 border rounded-lg text-sm font-medium transition-all text-center",
                isSelected
                  ? "border-primary text-primary bg-accent-soft/30"
                  : "border-border-light text-text-main hover:border-primary hover:text-primary hover:bg-accent-soft/30"
              )}
            >
              {keyword.label}
            </button>
          );
        })}
      </div>
    </div>
  );
};
