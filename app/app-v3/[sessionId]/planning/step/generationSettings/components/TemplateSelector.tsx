"use client";

import React from "react";
import { Template } from "./types";
import { templateOptions } from "./data";
import { Play, PlayCircle } from "lucide-react";

interface TemplateSelectorProps {
  value: Template;
  onChange: (value: Template) => void;
}

export const TemplateSelector: React.FC<TemplateSelectorProps> = ({
  value,
  onChange,
}) => {
  const comingsSoon = true;
  return (
    <div className="flex flex-col gap-3">
      <label className="text-sm font-medium text-slate-500">動画テンプレ</label>
      <div className="relative w-full">
        {comingsSoon && (
          <div className="absolute inset-0 w-full h-full z-50 flex items-center justify-center bg-white bg-opacity-75 text-lg font-semibold text-gray-700">
            Coming Soon
          </div>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {templateOptions.map((template) => (
            <label
              key={template.id}
              className={`group relative block w-full overflow-hidden rounded-xl border bg-white shadow-sm transition-all hover:shadow-md cursor-pointer select-none ${
                value === template.id
                  ? "border-[#0093b4] ring-2 ring-[#0093b4] ring-opacity-50 bg-[#0093b4]/5"
                  : "border-slate-200"
              }`}
              onClick={() => onChange(template.id)}
            >
              <div
                className={`aspect-video w-full ${template.previewBg} relative overflow-hidden`}
              >
                {template.id === "simple" && (
                  <div className="absolute inset-0 flex items-center justify-center p-6">
                    <div className="h-full w-2/3 bg-white rounded shadow-sm border border-gray-100 flex items-center justify-center">
                      <div className="w-8 h-1 bg-gray-200 rounded-full" />
                    </div>
                  </div>
                )}
                {template.id === "dynamic" && (
                  <>
                    <div
                      className="absolute inset-0"
                      style={{
                        backgroundImage:
                          "repeating-linear-gradient(45deg, #e2e8f0 0px, #e2e8f0 10px, #f8fafc 10px, #f8fafc 20px)",
                      }}
                    />
                    <div className="absolute bottom-2 right-2 bg-yellow-400 w-6 h-1.5 rounded-sm shadow-sm" />
                  </>
                )}
                {template.id === "desc" && (
                  <div className="absolute inset-0 flex flex-col p-3 gap-1.5 opacity-50">
                    <div className="w-full h-1.5 bg-blue-200 rounded-full" />
                    <div className="grid grid-cols-2 gap-1.5 mt-0.5">
                      <div className="h-6 bg-blue-100 rounded" />
                      <div className="h-6 bg-blue-100 rounded" />
                    </div>
                  </div>
                )}
                <div className="absolute inset-0 bg-black/5 opacity-80 group-hover:opacity-100 transition-all flex items-center justify-center">
                  <div className="bg-white/90 backdrop-blur rounded-full p-2 shadow-lg transform group-hover:scale-110 transition-transform duration-300">
                    <Play />
                  </div>
                </div>
              </div>
              <div className="p-3 flex items-center justify-between border-t border-gray-50">
                <div className="flex flex-col min-w-0 pr-2">
                  <span className="text-xs font-bold text-slate-800 truncate">
                    {template.name}
                  </span>
                </div>
                <div className="relative flex items-center justify-center w-4 h-4 shrink-0">
                  <div
                    className={`w-4 h-4 border rounded-full flex items-center justify-center transition-colors bg-white ${
                      value === template.id
                        ? "border-[#0093b4]"
                        : "border-gray-300"
                    }`}
                  >
                    <div
                      className={`w-2 h-2 rounded-full bg-[#0093b4] transition-opacity ${
                        value === template.id ? "opacity-100" : "opacity-0"
                      }`}
                    />
                  </div>
                </div>
              </div>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TemplateSelector;
