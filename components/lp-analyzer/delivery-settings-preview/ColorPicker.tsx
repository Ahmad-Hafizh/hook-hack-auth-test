"use client";

import { Paintbrush } from "lucide-react";
import React from "react";

interface ColorPickerProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  previewColor: string;
}

export const ColorPicker: React.FC<ColorPickerProps> = ({
  label,
  value,
  onChange,
  previewColor,
}) => {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium text-slate-500">{label}</label>
      <div className="flex items-center gap-2">
        <div
          className="w-10 h-10 rounded border border-gray-200 shadow-sm shrink-0"
          style={{ backgroundColor: previewColor }}
        />
        <div className="flex-1 flex items-center border border-slate-200 rounded px-2 py-2 bg-gray-50">
          <span className="text-gray-500 mr-1 text-xs">#</span>
          <input
            className="bg-transparent border-none p-0 text-sm font-mono focus:ring-0 text-slate-800 w-full"
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
          />
        </div>
        <button className="w-10 h-10 flex items-center justify-center border border-slate-200 rounded hover:bg-gray-50 text-gray-500 shrink-0">
          <Paintbrush />
        </button>
      </div>
    </div>
  );
};

export default ColorPicker;
