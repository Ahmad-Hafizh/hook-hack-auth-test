"use client";

import React from "react";
import { VerificationTarget } from "./types";
import { Sliders, SlidersHorizontal } from "lucide-react";

interface VerificationSelectorProps {
  selectedTarget: VerificationTarget;
  onChange: (target: VerificationTarget) => void;
}

const targets: { id: VerificationTarget; label: string }[] = [
  { id: "hook", label: "Hook" },
  { id: "body1", label: "Body1" },
  { id: "body2", label: "Body2" },
  { id: "cta", label: "CTA" },
];

export const VerificationSelector: React.FC<VerificationSelectorProps> = ({
  selectedTarget,
  onChange,
}) => {
  return (
    <div className="flex items-center gap-4">
      <span className="text-xs font-bold text-slate-800 flex items-center gap-1">
        <span className="material-symbols-outlined text-lg text-[#0093b4]">
          <SlidersHorizontal className="text-[#0093b4] w-4 h-4" />
        </span>
        検証項目を選択:
      </span>
      <div className="flex bg-white/60 rounded-lg p-1 gap-1 border border-slate-400/50 shadow-inner">
        {targets.map((target) => (
          <button
            key={target.id}
            onClick={() => onChange(target.id)}
            className={`cursor-pointer px-4 py-1.5 rounded-md text-sm font-bold transition-all border border-transparent hover:bg-white/50 flex items-center gap-2 ${
              selectedTarget === target.id
                ? "bg-[#0093b4] text-white shadow-sm border-[#0093b4]/20"
                : "text-slate-500 hover:text-slate-800"
            }`}
          >
            {target.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default VerificationSelector;
