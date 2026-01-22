"use client";

import React from "react";
import { BGMOption } from "./types";
import { bgmOptions } from "./data";
import { PlayCircle, Volume2 } from "lucide-react";

interface BGMSelectorProps {
  value: string;
  onChange: (value: string) => void;
}

export const BGMSelector: React.FC<BGMSelectorProps> = ({
  value,
  onChange,
}) => {
  return (
    <div className="flex flex-col gap-3">
      <label className="text-sm font-medium text-slate-500">BGM</label>
      <div className="flex flex-col gap-2 border border-slate-200 rounded-lg p-2 bg-gray-50/50">
        {bgmOptions.map((option) => (
          <div
            key={option.id}
            className={`flex items-center gap-2 p-2 rounded transition-all ${
              value === option.id
                ? "bg-white border border-blue-100 shadow-sm"
                : "hover:bg-white border border-transparent hover:border-gray-200"
            }`}
          >
            <input
              type="radio"
              name="bgm"
              checked={value === option.id}
              onChange={() => onChange(option.id)}
              className="text-[#0093b4] focus:ring-[#0093b4] h-4 w-4 border-gray-300"
            />
            <button
              className={`flex items-center justify-center w-6 h-6 transition-colors ${
                value === option.id
                  ? "text-gray-700 hover:text-[#0093b4]"
                  : "text-gray-400 hover:text-[#0093b4]"
              }`}
            >
              <PlayCircle />
            </button>
            <div className="flex flex-col gap-0.5 min-w-0 flex-1">
              <span
                className={`text-xs truncate ${value === option.id ? "font-medium" : "text-gray-600"}`}
              >
                {option.name}
              </span>
              <span className="text-[10px] text-gray-500 font-mono">
                {value === option.id ? "0:00 / " : ""}
                {option.duration}
              </span>
            </div>
            {value === option.id && <Volume2 />}
          </div>
        ))}
      </div>
    </div>
  );
};

export default BGMSelector;
