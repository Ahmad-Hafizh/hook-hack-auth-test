import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Pencil, Check, X } from "lucide-react";

export interface KeywordOption {
  term: string;
  reason?: string;
}

export interface KeywordSelectorProps {
  keywords: KeywordOption[];
  selectedKeywords: string;
  onSelectionChange: (value: string) => void;
  onKeywordEdit?: (index: number, newValue: string) => void;
  label?: string;
  className?: string;
}

export const KeywordSelector: React.FC<KeywordSelectorProps> = ({
  keywords,
  selectedKeywords,
  onSelectionChange,
  onKeywordEdit,
  label,
  className,
}) => {
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editValue, setEditValue] = useState<string>("");

  const handleStartEdit = (index: number, currentValue: string, e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    setEditingIndex(index);
    setEditValue(currentValue);
  };

  const handleSaveEdit = (index: number, e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    if (onKeywordEdit && editValue.trim()) {
      onKeywordEdit(index, editValue.trim());
    }
    setEditingIndex(null);
    setEditValue("");
  };

  const handleCancelEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    setEditingIndex(null);
    setEditValue("");
  };

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
          if (editingIndex === null) {
            onSelectionChange(value);
          }
        }}
        value={selectedKeywords}
      >
        {keywords.map((keyword, index) => (
          <ToggleGroupItem
            key={index}
            value={keyword.term}
            className="
            px-4 py-3 border rounded-lg text-sm font-medium transition-all text-center relative group

            data-[state=on]:font-bold data-[state=on]:border-cyan-600  data-[state=on]:bg-white bg-white data-[state=on]:text-cyan-600 "
          >
            {editingIndex === index ? (
              <div className="flex items-center gap-2 w-full" onClick={(e) => e.stopPropagation()}>
                <input
                  type="text"
                  value={editValue}
                  onChange={(e) => setEditValue(e.target.value)}
                  className="flex-1 min-w-0 text-sm border border-cyan-400 rounded px-2 py-1 focus:outline-none focus:ring-1 focus:ring-cyan-500"
                  autoFocus
                  onClick={(e) => e.stopPropagation()}
                />
                <span
                  onClick={(e) => handleSaveEdit(index, e)}
                  className="p-1 text-green-600 hover:bg-green-50 rounded cursor-pointer"
                >
                  <Check className="w-4 h-4" />
                </span>
                <span
                  onClick={handleCancelEdit}
                  className="p-1 text-red-600 hover:bg-red-50 rounded cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </span>
              </div>
            ) : (
              <>
                <span>{keyword.term}</span>
                {onKeywordEdit && (
                  <span
                    onClick={(e) => handleStartEdit(index, keyword.term, e)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 p-1 opacity-0 group-hover:opacity-100 transition-opacity text-gray-400 hover:text-cyan-600 hover:bg-cyan-50 rounded cursor-pointer"
                  >
                    <Pencil className="w-3 h-3" />
                  </span>
                )}
              </>
            )}
          </ToggleGroupItem>
        ))}
      </ToggleGroup>
    </div>
  );
};
