"use client";

import React from "react";
import { Check, X } from "lucide-react";

interface DurationCardProps {
  option: VideoDurationOption;
  isSelected: boolean;
  onSelect: () => void;
}

export interface VideoDurationOption {
  value: number;
  title: string;
  advantages: string[];
  disadvantages: string[];
}

export const DurationCard: React.FC<DurationCardProps> = ({
  option,
  isSelected,
  onSelect,
}) => {
  return (
    <label className="flex-1 relative cursor-pointer group">
      <input
        type="radio"
        name="video_duration"
        value={option.value}
        checked={isSelected}
        onChange={onSelect}
        className="peer sr-only"
      />
      <div
        className={`h-full bg-white rounded-xl p-6 md:p-10 shadow-sm border transition-all duration-300 ${
          isSelected
            ? "border-[#0093b4] ring-1 ring-[#0093b4] bg-[#0093b4]/5"
            : "border-slate-200 group-hover:border-[#0093b4]/50 group-hover:shadow-md"
        }`}
      >
        <div className="flex items-center justify-between mb-8">
          <h3 className="text-xl md:text-2xl font-bold text-slate-800">
            {option.title}
          </h3>
          <div
            className={`w-7 h-7 rounded-full border-2 flex items-center justify-center transition-colors duration-200 ${
              isSelected
                ? "border-[#0093b4] bg-[#0093b4]"
                : "border-slate-300 bg-white"
            }`}
          >
            <div
              className={`w-3 h-3 rounded-full bg-white transition-opacity duration-200 ${
                isSelected ? "opacity-100" : "opacity-0"
              }`}
            />
          </div>
        </div>

        <div className="space-y-6">
          {/* Advantages */}
          <div>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded text-xs font-bold bg-[#0093b4]/10 text-[#0093b4] mb-3">
              メリット
            </span>
            <ul className="space-y-2 pl-1">
              {option.advantages.map((advantage, index) => (
                <li
                  key={index}
                  className="flex items-start gap-3 text-slate-500 text-sm md:text-base"
                >
                  <span className="material-symbols-outlined text-[14px] bg-[#0093b4]/80 shrink-0 text-white rounded-full">
                    <Check />
                  </span>
                  <span>{advantage}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Disadvantages */}
          <div>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded text-xs font-bold bg-slate-100 text-slate-500 mb-3">
              デメリット
            </span>
            <ul className="space-y-2 pl-1">
              {option.disadvantages.map((disadvantage, index) => (
                <li
                  key={index}
                  className="flex items-start gap-3 text-slate-500 text-sm md:text-base"
                >
                  <span className="material-symbols-outlined text-[20px] text-white rounded-full bg-slate-400 shrink-0">
                    <X />
                  </span>
                  <span>{disadvantage}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </label>
  );
};

export default DurationCard;
