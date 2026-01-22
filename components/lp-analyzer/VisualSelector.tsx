import React, { useState } from "react";
import { cn } from "@/lib/utils";

export interface VisualOption {
  url: string;
  screenshot_url?: string;
  title?: string;
  meta_description?: string;
}

export interface CheckboxCardProps {
  visual: VisualOption;
  isSelected: boolean;
  onToggle: (url: string) => void;
}

export const CheckboxCard: React.FC<CheckboxCardProps> = ({
  visual,
  isSelected,
  onToggle,
}) => {
  return (
    <label className="group relative flex flex-col items-center cursor-pointer w-full">
      <input
        className="peer sr-only"
        type="checkbox"
        checked={isSelected}
        onChange={() => onToggle(visual.url)}
      />

      <div
        className={cn(
          "w-full aspect-video rounded-lg flex items-center justify-center overflow-hidden transition-all duration-200 border relative",
          "bg-slate-50 text-text-muted",
          "peer-checked:bg-accent-soft peer-checked:border-cyan-600 peer-checked:text-primary peer-checked:shadow-sm peer-checked:ring-2 peer-checked:ring-cyan-400/30",
          "group-hover:border-primary/50"
        )}
      >
        {visual.screenshot_url ? (
          <img
            src={visual.screenshot_url}
            alt={visual.meta_description || "Key visual"}
            className="w-full h-full object-cover"
          />
        ) : (
          <span className="font-medium z-10 text-xs">
            {visual.url || "Key visuals"}
          </span>
        )}
      </div>
    </label>
  );
};

export interface VisualSelectorProps {
  visuals: VisualOption[];
  selectedVisuals?: string[];
  onSelectionChange?: (selectedVisuals: string[]) => void;
  maxSelection?: number;
  label?: string;
  showMoreLabel?: string;
  onShowMore: () => void;
  className?: string;
}

export const VisualSelector: React.FC<VisualSelectorProps> = ({
  visuals,
  selectedVisuals = [],
  onSelectionChange,
  maxSelection = 3,
  label,
  showMoreLabel = "さらに6件表示する",
  onShowMore,
  className,
}) => {
  const [selected, setSelected] = useState<string[]>(selectedVisuals);

  const handleToggle = (id: string) => {
    let newSelected: string[];

    if (selected.includes(id)) {
      newSelected = selected.filter((visualId) => visualId !== id);
    } else {
      if (maxSelection && selected.length >= maxSelection) {
        // Remove the first selected item and add the new one
        newSelected = [...selected.slice(1), id];
      } else {
        newSelected = [...selected, id];
      }
    }

    setSelected(newSelected);

    if (onSelectionChange) {
      onSelectionChange(newSelected);
    }
  };

  return (
    <div className={cn("w-full", className)}>
      <div className="mb-6 flex items-center justify-between">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <h3 className="text-lg font-bold text-text-main">{label}</h3>
        </div>
        <div className="w-full flex justify-center lg:justify-end z-20">
          <button
            type="button"
            onClick={onShowMore}
            className="px-6 py-2.5 rounded-lg text-sm font-medium text-text-muted bg-white border border-border-light hover:bg-slate-50 hover:text-primary hover:border-primary/30 transition-colors shadow-sm"
          >
            {showMoreLabel}
          </button>
        </div>
      </div>

      <div className="relative">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {visuals.map((visual) => (
            <CheckboxCard
              key={visual.url}
              visual={visual}
              isSelected={selected.includes(visual.url)}
              onToggle={handleToggle}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
