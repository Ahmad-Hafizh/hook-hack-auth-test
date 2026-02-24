"use client";

import React from "react";
import { AnalysisCard } from "./AnalysisCard";
import { RoadmapCard } from "./RoadmapCard";
import { AdTable } from "./AdTable";
import { adData, analysisItems, roadmapSteps } from "./data";

export const CheckNavigation: React.FC = () => {
  return (
    <main className="w-full max-w-[1920px] mx-auto p-4 flex flex-col items-start gap-4 text-black bg-slate-50 min-h-screen">
      {/* Header */}
      <div className="w-full flex items-center justify-between shrink-0">
        <div>
          <h1 className="text-xl font-bold text-black">
            CHECK（ナビゲーション削除）
          </h1>
        </div>
      </div>

      {/* Analysis and Roadmap Cards */}
      <div className="w-full flex gap-4 shrink-0 h-[120px]">
        <AnalysisCard title="分析・示唆" items={analysisItems} />
        <RoadmapCard
          title="次のアクション（制作ロードマップ）"
          steps={roadmapSteps}
        />
      </div>

      {/* Ad Data Table */}
      <AdTable data={adData} />
    </main>
  );
};

export default CheckNavigation;
