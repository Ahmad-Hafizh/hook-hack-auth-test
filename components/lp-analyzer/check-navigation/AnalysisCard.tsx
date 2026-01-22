"use client";

import React from "react";
import { AnalysisItem } from "./types";

interface AnalysisCardProps {
  title: string;
  items: AnalysisItem[];
}

export const AnalysisCard: React.FC<AnalysisCardProps> = ({ title, items }) => {
  return (
    <div className="flex-[1] bg-white rounded-lg border border-slate-300 shadow-sm p-2 flex flex-col h-full overflow-hidden">
      <div className="flex items-center mb-1 border-b border-gray-100 pb-0.5 shrink-0">
        <h2 className="text-[10px] font-bold text-black">{title}</h2>
      </div>
      <div className="flex-1 overflow-y-auto space-y-1 pr-1 scrollbar-hide">
        {items.map((item, index) => (
          <div key={index} className="flex items-start gap-1.5">
            <div className="w-1 h-1 rounded-full bg-[#0093b4] mt-1 shrink-0" />
            <p className="text-[9px] leading-tight text-black">{item.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AnalysisCard;
