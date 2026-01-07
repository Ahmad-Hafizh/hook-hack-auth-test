import React from "react";
import { cn } from "@/lib/utils";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

export interface KeywordOption {
  term: string;
  reason?: string;
}

export interface KeywordSelectorProps {
  keywords: KeywordOption[];
  selectedKeywords: string;
  onSelectionChange: (value: string) => void;
  label?: string;
  className?: string;
}

export const KeywordSelector: React.FC<KeywordSelectorProps> = ({
  keywords,
  selectedKeywords,
  onSelectionChange,
  label,
  className,
}) => {
  return (
    <div className={cn("flex-1 flex flex-col w-full", className)}>
      {label && (
        <label className="block text-lg md:text-xl font-bold text-text-main mb-8 text-left">
          {label}
        </label>
      )}

      <ToggleGroup
        type="single"
        variant={"outline"}
        className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full"
        onValueChange={(value) => {
          onSelectionChange(value);
        }}
        value={selectedKeywords}
      >
        {keywords.map((keyword, index) => (
          <ToggleGroupItem
            key={index}
            value={keyword.term}
            className="
            px-4 py-3 border rounded-lg text-sm font-medium transition-all text-center
            
            data-[state=on]:font-bold data-[state=on]:border-cyan-600  data-[state=on]:bg-white bg-white data-[state=on]:text-cyan-600 "
          >
            {keyword.term}
          </ToggleGroupItem>
        ))}
      </ToggleGroup>
    </div>
  );
};
