import React from "react";
import { RadioGroupItem } from "@/components/ui/radio-group";
import { Heart, SettingsIcon } from "lucide-react";

interface ValueItemProps {
  label: string;
  value: string;
  type: "functional" | "emotional";
  onChange?: (value: string) => void;
  selected: boolean;
}

const ValueItem: React.FC<ValueItemProps> = ({
  label,
  value,
  type,
  onChange,
  selected,
}) => {
  const isFunctional = type === "functional";
  const borderColor = isFunctional ? "bg-blue-200" : "bg-pink-200";

  return (
    <div className="flex gap-3 pl-1">
      <div
        className={`w-1 ${selected ? borderColor : "bg-gray-200"} rounded-full shrink-0 h-auto self-stretch`}
      ></div>
      <div className="w-full">
        <span className="block text-[10px] text-gray-400 mb-0.5">{label}</span>
        <textarea
          className="text-xs w-full bg-transparent leading-relaxed resize-none focus:outline-none focus:ring-1 focus:ring-cyan-400 rounded px-1 h-[50px]"
          rows={4}
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
        />
      </div>
    </div>
  );
};

interface PositioningPatternCardProps {
  pattern: "A" | "B" | "C";
  isSelected: boolean;
  promise: string;
  functionalValues: Array<{
    label: string;
    value: string;
  }>;
  emotionalValues: Array<{
    label: string;
    value: string;
  }>;
  onSelect?: () => void;
  onPromiseChange?: (value: string) => void;
  onFunctionalValueChange?: (index: number, value: string) => void;
  onEmotionalValueChange?: (index: number, value: string) => void;
  value: string;
}

export const PositioningPatternCard: React.FC<PositioningPatternCardProps> = ({
  pattern,
  isSelected,
  promise,
  functionalValues,
  emotionalValues,
  onSelect,
  onPromiseChange,
  onFunctionalValueChange,
  onEmotionalValueChange,
  value,
}) => {
  return (
    <div className="relative cursor-pointer group flex flex-col min-h-[600px] group">
      {/* Card */}
      <div className="h-full bg-white rounded-2xl border-2 transition-all duration-200 overflow-hidden border-border-light shadow-sm hover:shadow-lg peer-checked:border-blue-600 peer-checked:shadow-lg peer-checked:ring-4 peer-checked:ring-blue-50/50">
        <div className="p-6 flex flex-col h-full">
          {/* Header */}
          <div className="flex justify-between items-start mb-4">
            <div className="flex items-center gap-2 mb-1">
              <h2 className="text-xl font-bold text-text-main">
                パターン {pattern}
              </h2>
            </div>
            <div className="flex items-center h-full">
              <RadioGroupItem value={value} className="" />
            </div>
          </div>

          {/* Promise */}
          <div className="bg-gray-50 rounded-lg p-4 mb-6 border border-gray-100">
            <p className="text-[10px] font-bold text-text-muted mb-1">
              1行の約束
            </p>
            <textarea
              className="editable-input text-base w-full font-semibold leading-snug bg-transparent overflow-visible resize-none focus:outline-none focus:ring-1 focus:ring-cyan-400 rounded px-1"
              rows={3}
              value={promise}
              onChange={(e) => onPromiseChange?.(e.target.value)}
            />
          </div>

          {/* Functional Values */}
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-3">
              <SettingsIcon
                className={`w-4 h-4 ${isSelected ? "fill-sky-600" : "fill-gray-500"} text-white`}
              />
              <span
                className={`text-xs font-bold ${isSelected ? "text-sky-600" : "text-gray-400"}`}
              >
                機能的価値
              </span>
            </div>
            <div className="space-y-3">
              {functionalValues.map((item, index) => (
                <ValueItem
                  key={index}
                  label={item.label}
                  value={item.value}
                  type="functional"
                  onChange={(value) => onFunctionalValueChange?.(index, value)}
                  selected={isSelected}
                />
              ))}
            </div>
          </div>

          {/* Emotional Values */}
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-3">
              <Heart
                className={`w-4 h-4 ${isSelected ? "text-pink-600 fill-pink-600" : "text-gray-500 fill-gray-500"}`}
              />
              <span
                className={`text-xs font-bold ${isSelected ? "text-pink-600" : "text-gray-400"}`}
              >
                情緒的価値
              </span>
            </div>
            <div className="space-y-3">
              {emotionalValues.map((item, index) => (
                <ValueItem
                  key={index}
                  label={item.label}
                  value={item.value}
                  type="emotional"
                  onChange={(value) => onEmotionalValueChange?.(index, value)}
                  selected={isSelected}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
