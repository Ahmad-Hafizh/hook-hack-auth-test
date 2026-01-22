"use client";

import React, { useState } from "react";
import { DurationCard } from "@/components/lp-analyzer/video-duration-selection/DurationCard";
import { ArrowRight } from "lucide-react";
import { useDataContext } from "../hooks/useDataContext";
import { VideoDurationOption } from "@/components/lp-analyzer/video-duration-selection/types";
import callAppV2Api from "@/config/axios/axiosAppV2";

interface VideoDurationSelectionProps {
  onBack?: () => void;
  onNext: () => void;
}

const videoDurationOptions: VideoDurationOption[] = [
  {
    value: 15,
    title: "15秒動画",
    advantages: ["視聴完了率が高い", "短時間でメッセージを伝えやすい"],
    disadvantages: ["情報量が限定的", "複雑な訴求には不向き"],
  },
  {
    value: 30,
    title: "30秒動画",
    advantages: ["詳細な情報伝達が可能", "ブランドの世界観を表現しやすい"],
    disadvantages: ["視聴完了率が低い傾向", "制作コストが高い"],
  },
];

export const Step1New: React.FC<VideoDurationSelectionProps> = ({
  onBack,
  onNext,
}) => {
  const { duration, onSetDuration, onSetJobId } = useDataContext();
  const selected_value_6 = localStorage.getItem("selected_values_6");
  const selected_tobe_4 = localStorage.getItem("selected_tobe_4");
  const selected_matrix = localStorage.getItem("selected_matrix");

  const onSubmit = async () => {
    try {
      const { data } = await callAppV2Api.post("/v1/video/main-content/async", {
        key_message: JSON.parse(selected_matrix || "{}")?.key_message,
        strong_points: JSON.parse(selected_matrix || "{}")?.strong_points,
        video_length: `${duration}s`,
        provider: "openai",
        language: "en",
        selected_values: JSON.parse(selected_value_6 || "[]"),
        selected_tobes: JSON.parse(selected_tobe_4 || "[]"),
        positioning_pattern: {
          pattern_number: 1,
          quadrant: "functional × process",
          quadrant_ja: "string",
          direction: "convergent",
          direction_ja: "収束",
          direction_reason: "string",
          process_description: "string",
          outcome_description: "string",
          one_line_promise: "string",
          source_value_ids: ["string"],
          source_tobe_ids: ["string"],
        },
      });

      onSetJobId(data.job_id);
      onNext();
    } catch (error) {
      console.log(error);
    }
  };

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
              isSelected={duration === option.value}
              onSelect={() => {
                onSetDuration(option.value as 15 | 30);
              }}
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
            onClick={onSubmit}
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

export default Step1New;
