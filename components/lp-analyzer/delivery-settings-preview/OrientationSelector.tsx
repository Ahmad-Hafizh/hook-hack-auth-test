"use client";

import React from "react";
import { Orientation } from "./types";
import { Crop } from "lucide-react";

interface OrientationSelectorProps {
  value: Orientation;
  onChange: (value: Orientation) => void;
}

export const OrientationSelector: React.FC<OrientationSelectorProps> = ({
  value,
  onChange,
}) => {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium text-slate-500">動画の向き</label>
      <div className="flex gap-3 max-w-md">
        <label
          className={`flex-1 flex items-center justify-center gap-2 p-3 border rounded-lg cursor-pointer transition-all group select-none ${
            value === "horizontal"
              ? "border-[#0093b4] bg-[#0093b4]/10 text-[#0093b4] ring-1 ring-[#0093b4]/20"
              : "border-slate-200 hover:bg-gray-50"
          }`}
          onClick={() => onChange("horizontal")}
        >
          <Crop
            className={`material-symbols-outlined text-xl transition-colors ${
              value === "horizontal"
                ? "text-[#0093b4]"
                : "text-gray-400 group-hover:text-[#0093b4]"
            }`}
          />

          <span
            className={`text-sm font-bold transition-colors ${
              value === "horizontal"
                ? "text-[#0093b4]"
                : "text-slate-800 group-hover:text-[#0093b4]"
            }`}
          >
            横動画 (16:9)
          </span>
        </label>
        <label
          className={`flex-1 flex items-center justify-center gap-2 p-3 border rounded-lg cursor-pointer transition-all group select-none ${
            value === "vertical"
              ? "border-[#0093b4] bg-[#0093b4]/10 text-[#0093b4] ring-1 ring-[#0093b4]/20"
              : "border-slate-200 hover:bg-gray-50"
          }`}
          onClick={() => onChange("vertical")}
        >
          <Crop
            className={`material-symbols-outlined text-xl transition-colors ${
              value === "vertical"
                ? "text-[#0093b4]"
                : "text-gray-400 group-hover:text-[#0093b4]"
            }`}
          />
          <span
            className={`text-sm font-bold transition-colors ${
              value === "vertical"
                ? "text-[#0093b4]"
                : "text-slate-800 group-hover:text-[#0093b4]"
            }`}
          >
            縦動画 (9:16)
          </span>
        </label>
      </div>
    </div>
  );
};

export default OrientationSelector;
