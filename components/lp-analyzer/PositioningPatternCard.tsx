import React from "react";
import { RadioGroupItem } from "../ui/radio-group";
import { Heart, Settings, SettingsIcon } from "lucide-react";

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
          className=" text-xs w-full bg-transparent leading-relaxed resize-none"
          rows={2}
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
    <div className="relative cursor-pointer group flex flex-col h-[650px] group">
      {/* <input
        className="peer sr-only"
        name="pattern_selection"
        type="radio"
        value={pattern}
        checked={isSelected}
        onChange={onSelect}
      /> */}

      {/* Check Icon */}
      {/* <div className="absolute top-6 right-6 z-10">
        <span
          className="material-symbols-outlined text-[32px] text-blue-600 hidden peer-checked:block fill-1"
          style={{ fontVariationSettings: "'FILL' 1" }}
        >
          check_circle
        </span>
        <span className="material-symbols-outlined text-[32px] text-border-light block peer-checked:hidden">
          radio_button_unchecked
        </span>
      </div> */}

      {/* Card */}
      <div className="flex flex-col h-full bg-white rounded-2xl border-2 transition-all duration-200 overflow-hidden border-border-light shadow-sm hover:shadow-lg peer-checked:border-blue-600 peer-checked:shadow-lg peer-checked:ring-4 peer-checked:ring-blue-50/50">
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
            {/* <textarea
              className="editable-input text-lg w-full font-semibold leading-snug bg-transparent overflow-visible"
              rows={2}
              value={promise}
              onChange={(e) => onPromiseChange?.(e.target.value)}
            /> */}
            <p className="font-semibold">{promise}</p>
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

// interface PositioningPatternGridProps {
//   patterns: Array<{
//     pattern: "A" | "B" | "C";
//     isSelected: boolean;
//     promise: string;
//     functionalValues: Array<{ label: string; value: string }>;
//     emotionalValues: Array<{ label: string; value: string }>;
//   }>;
//   onPatternSelect?: (pattern: "A" | "B" | "C") => void;
//   onPatternChange?: (
//     pattern: "A" | "B" | "C",
//     field: string,
//     value: string | number,
//   ) => void;
// }

// export const PositioningPatternGrid: React.FC<PositioningPatternGridProps> = ({
//   patterns,
//   onPatternSelect,
//   onPatternChange,
// }) => (
//   <div
//     className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1 mb-12 animate-fade-in-up"
//     style={{ animationDelay: "0.1s" }}
//   >
//     {patterns.map((patternData) => (
//       <PositioningPatternCard
//         key={patternData.pattern}
//         pattern={patternData.pattern}
//         isSelected={patternData.isSelected}
//         promise={patternData.promise}
//         functionalValues={patternData.functionalValues}
//         emotionalValues={patternData.emotionalValues}
//         onSelect={() => onPatternSelect?.(patternData.pattern)}
//         onPromiseChange={(value) =>
//           onPatternChange?.(patternData.pattern, "promise", value)
//         }
//         onFunctionalValueChange={(index, value) =>
//           onPatternChange?.(patternData.pattern, `functional.${index}`, value)
//         }
//         onEmotionalValueChange={(index, value) =>
//           onPatternChange?.(patternData.pattern, `emotional.${index}`, value)
//         }
//       />
//     ))}
//   </div>
// );
