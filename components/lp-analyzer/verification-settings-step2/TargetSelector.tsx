"use client";

import React from "react";
import { VerificationTarget } from "./types";

interface TargetSelectorProps {
  selectedTarget: VerificationTarget;
  onTargetChange: (target: VerificationTarget) => void;
}

const targets: { id: VerificationTarget; label: string }[] = [
  { id: "hook", label: "フック" },
  { id: "body1", label: "Body1" },
  { id: "body2", label: "Body2" },
  { id: "cta", label: "CTA" },
];

export const TargetSelector: React.FC<TargetSelectorProps> = ({
  selectedTarget,
  onTargetChange,
}) => {
  return (
    <div className="flex items-center gap-4">
      <span className="text-xs font-bold text-slate-800 flex items-center gap-1">
        <span className="material-symbols-outlined text-lg text-[#0093b4]">
          tune
        </span>
        検証項目を選択:
      </span>
      <div className="flex bg-white/60 rounded-lg p-1 gap-1 border border-slate-400/50 shadow-inner">
        {targets.map((target) => (
          <label
            key={target.id}
            className={`cursor-pointer px-4 py-1.5 rounded-md text-sm font-bold transition-all border flex items-center gap-2 ${
              selectedTarget === target.id
                ? "bg-[#0093b4] text-white border-[#0093b4]"
                : "text-slate-500 border-transparent hover:bg-white/50 hover:text-slate-800"
            }`}
          >
            <input
              type="radio"
              name="verification-target"
              value={target.id}
              checked={selectedTarget === target.id}
              onChange={() => onTargetChange(target.id)}
              className="sr-only"
            />
            {target.label}
          </label>
        ))}
      </div>
    </div>
  );
};

export default TargetSelector;
