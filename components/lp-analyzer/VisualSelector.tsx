import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

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
          "w-full aspect-video rounded-lg flex items-center justify-center overflow-hidden transition-all duration-200 border-2 relative",
          "bg-slate-50 text-text-muted border-transparent",
          "peer-checked:bg-accent-soft peer-checked:border-[#0093b4] peer-checked:text-primary peer-checked:shadow-lg peer-checked:ring-4 peer-checked:ring-[#0093b4]/30",
          "group-hover:border-slate-300"
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
        {/* Selection indicator */}
        {isSelected && (
          <div className="absolute top-2 right-2 w-7 h-7 bg-[#0093b4] rounded-full flex items-center justify-center shadow-md">
            <Check className="w-4 h-4 text-white" strokeWidth={3} />
          </div>
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
  regenerateLabel?: string;
  onShowMore: () => void;
  onRegenerate?: () => void;
  isRegenerating?: boolean;
  isLoadingMore?: boolean;
  className?: string;
}

export const VisualSelector: React.FC<VisualSelectorProps> = ({
  visuals,
  selectedVisuals = [],
  onSelectionChange,
  maxSelection = 3,
  label,
  showMoreLabel = "さらに6件追加する",
  regenerateLabel = "すべて再生成",
  onShowMore,
  onRegenerate,
  isRegenerating = false,
  isLoadingMore = false,
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
        <div className="w-full flex justify-center lg:justify-end z-20 gap-2">
          {onRegenerate && (
            <button
              type="button"
              onClick={onRegenerate}
              disabled={isRegenerating || isLoadingMore}
              className="px-6 py-2.5 rounded-lg text-sm font-medium text-red-600 bg-white border border-red-400 hover:bg-red-50 transition-colors shadow-sm disabled:opacity-50"
            >
              {isRegenerating ? "再生成中..." : regenerateLabel}
            </button>
          )}
          <button
            type="button"
            onClick={onShowMore}
            disabled={isLoadingMore || isRegenerating}
            className="px-6 py-2.5 rounded-lg text-sm font-medium text-[#0093b4] bg-white border border-[#0093b4] hover:bg-cyan-50 transition-colors shadow-sm disabled:opacity-50"
          >
            {isLoadingMore ? "読み込み中..." : showMoreLabel}
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
