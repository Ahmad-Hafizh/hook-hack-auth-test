"use client";

import React, { useState } from "react";
import { DurationCard } from "./DurationCard";
import { videoDurationOptions } from "./data";
import { ArrowRight } from "lucide-react";

interface VideoDurationSelectionProps {
  onBack?: () => void;
  onNext: () => void;
}

export const VideoDurationSelection: React.FC<VideoDurationSelectionProps> = ({
  onBack,
  onNext,
}) => {
  const [selectedDuration, setSelectedDuration] = useState("15");

  return (
    <main className="flex-1 w-full max-w-5xl mx-auto px-4 py-12 md:px-8 flex flex-col justify-center">
      {/* Header */}
      <div className="mb-10 animate-fade-in-up">
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight mb-3 text-slate-800 text-center md:text-left">
          動画尺を選択してください
        </h1>
      </div>

      {/* Content */}
      <div className="w-full">
        {/* Duration Cards */}
        <div
          className="flex flex-col md:flex-row gap-6 mb-12 animate-fade-in-up"
          style={{ animationDelay: "100ms" }}
        >
          {videoDurationOptions.map((option) => (
            <DurationCard
              key={option.value}
              option={option}
              isSelected={selectedDuration === option.value}
              onSelect={() => setSelectedDuration(option.value)}
            />
          ))}
        </div>

        {/* Navigation */}
        <div className="flex flex-col-reverse sm:flex-row items-center justify-end gap-4 mt-12 w-full">
          <div className="flex-1" />
          <button
            onClick={onBack}
            className="px-6 py-3 rounded-lg text-sm font-bold text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-all flex items-center justify-center"
          >
            戻る
          </button>
          <button
            onClick={onNext}
            className="w-full sm:w-auto px-10 py-3 rounded-lg text-sm font-bold text-white bg-[#0093b4] hover:bg-[#007a92] transition-all shadow-lg shadow-[#0093b4]/20 flex items-center justify-center gap-2 group disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span>次へ進む</span>
            <ArrowRight className="w-5 h-5 text-white group-hover:translate-x-1 transition-transform " />
          </button>
        </div>
      </div>
    </main>
  );
};

export default VideoDurationSelection;
