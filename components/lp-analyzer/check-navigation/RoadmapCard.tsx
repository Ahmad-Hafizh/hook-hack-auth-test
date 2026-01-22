"use client";

import React from "react";
import { RoadmapStep } from "./types";

interface RoadmapCardProps {
  title: string;
  steps: RoadmapStep[];
}

const RoadmapButton: React.FC<{
  icon: string;
  label: string;
  onClick?: () => void;
}> = ({ icon, label, onClick }) => (
  <button
    onClick={onClick}
    className="px-2 py-1 text-[9px] border border-slate-200 rounded bg-white hover:bg-slate-50 transition-colors text-black text-left flex items-center gap-1.5 w-full font-medium shadow-sm hover:border-gray-400"
  >
    <span className="material-symbols-outlined text-[11px] leading-none">
      {icon}
    </span>
    <span>{label}</span>
  </button>
);

const StepColumn: React.FC<{ step: RoadmapStep; isLast: boolean }> = ({
  step,
  isLast,
}) => (
  <div
    className={`flex flex-col ${!isLast ? "border-r border-slate-200 pr-3" : ""} h-full overflow-y-auto scrollbar-hide`}
  >
    <div className="flex items-center gap-1.5 mb-1.5 shrink-0">
      <span className="w-4 h-4 rounded bg-black text-white text-[8px] flex items-center justify-center font-black">
        {step.step}
      </span>
      <h3 className="text-[9px] font-bold text-black">{step.title}</h3>
    </div>
    <div className="grid grid-cols-2 gap-1.5">
      {step.buttons.map((button, index) => (
        <RoadmapButton key={index} {...button} />
      ))}
    </div>
  </div>
);

export const RoadmapCard: React.FC<RoadmapCardProps> = ({ title, steps }) => {
  return (
    <div className="flex-[3] bg-white rounded-lg border border-slate-300 shadow-sm p-2 flex flex-col h-full overflow-hidden">
      <div className="flex items-center mb-1 border-b border-gray-100 pb-0.5 shrink-0">
        <h2 className="text-[10px] font-bold text-black">{title}</h2>
      </div>
      <div className="flex-1 grid grid-cols-3 gap-4 overflow-hidden py-0.5">
        {steps.map((step, index) => (
          <StepColumn
            key={step.step}
            step={step}
            isLast={index === steps.length - 1}
          />
        ))}
      </div>
    </div>
  );
};

export default RoadmapCard;
