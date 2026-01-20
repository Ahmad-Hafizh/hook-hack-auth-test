"use client";

import React from "react";
import { Orientation, Template } from "./types";

interface LivePreviewProps {
  orientation: Orientation;
  template: Template;
  backgroundColor: string;
  ctaTextColor: string;
}

export const LivePreview: React.FC<LivePreviewProps> = ({
  orientation,
  template,
  backgroundColor,
  ctaTextColor,
}) => {
  const getSceneStyle = () => {
    switch (template) {
      case "dynamic":
        return {
          backgroundColor: "#f8fafc",
          backgroundImage:
            "repeating-linear-gradient(45deg, #f1f5f9 0px, #f1f5f9 10px, #f8fafc 10px, #f8fafc 20px)",
        };
      case "desc":
        return {
          backgroundColor: "#f0f9ff",
          backgroundImage:
            "linear-gradient(#e0f2fe 1px, transparent 1px), linear-gradient(90deg, #e0f2fe 1px, transparent 1px)",
          backgroundSize: "20px 20px",
        };
      default:
        return { backgroundColor: "white" };
    }
  };

  return (
    <div className="w-full lg:w-[420px] shrink-0 sticky top-6">
      <div className="bg-gray-50 border border-slate-200 rounded-xl p-4 lg:p-6 shadow-sm sticky top-6">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
            <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">
              Live Preview
            </span>
          </div>
          <div className="flex gap-2">
            <button className="text-gray-400 hover:text-[#0093b4] transition-colors">
              <span className="material-symbols-outlined text-xl">
                smartphone
              </span>
            </button>
            <button className="text-[#0093b4] hover:text-[#007a92] transition-colors">
              <span className="material-symbols-outlined text-xl">
                desktop_windows
              </span>
            </button>
          </div>
        </div>

        <div className="w-full aspect-video bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden relative">
          <div className="w-full h-full flex items-center justify-center bg-gray-100">
            <div
              className={`bg-white shadow-xl relative overflow-hidden flex flex-col z-10 transition-all duration-300 ease-in-out ${
                orientation === "vertical"
                  ? "h-full max-h-[280px] aspect-[9/16] mx-auto"
                  : "w-full aspect-video"
              }`}
              style={{
                borderWidth: "4px",
                borderStyle: "solid",
                borderColor: `#${backgroundColor}`,
              }}
            >
              <div
                className="absolute inset-0 transition-all duration-500 z-0"
                style={getSceneStyle()}
              />

              {template === "dynamic" && (
                <div className="hidden absolute top-0 right-0 m-3 bg-yellow-400 text-black text-[8px] font-bold px-1.5 py-0.5 rounded shadow z-10 pointer-events-none">
                  DYNAMIC
                </div>
              )}
              {template === "desc" && (
                <div className="hidden absolute bottom-0 left-0 m-3 bg-blue-500 text-white text-[8px] font-bold px-1.5 py-0.5 rounded shadow z-10 pointer-events-none">
                  INFO
                </div>
              )}

              <div className="absolute inset-0 flex flex-col p-3 z-20">
                <div
                  className={`flex w-full mb-2 transition-all duration-300 ${
                    orientation === "vertical" ? "mb-4 justify-center" : ""
                  }`}
                >
                  <div className="h-5 px-2 bg-gray-50/90 backdrop-blur rounded border border-gray-100 flex items-center justify-center shadow-sm">
                    <span className="text-gray-300 text-[8px] font-bold tracking-widest">
                      LOGO
                    </span>
                  </div>
                </div>
                <div
                  className={`flex-1 flex flex-col items-center justify-center text-center -mt-1 transition-all duration-300 ${
                    orientation === "vertical" ? "space-y-3 px-2" : "space-y-2"
                  }`}
                >
                  <h3
                    className={`font-black text-black leading-tight tracking-tight transition-all duration-300 drop-shadow-sm ${
                      orientation === "vertical" ? "text-base" : "text-sm"
                    }`}
                  >
                    無料体験レッスンに
                    <br />
                    ぜひお越しください
                  </h3>
                  <button
                    className={`bg-black text-white rounded-full font-bold shadow-lg hover:bg-gray-800 transition-colors ${
                      orientation === "vertical"
                        ? "py-2 px-6 text-xs"
                        : "px-3 py-1.5 text-[10px]"
                    }`}
                    style={{
                      color:
                        `#${ctaTextColor}` === "#000000"
                          ? "white"
                          : `#${ctaTextColor}`,
                    }}
                  >
                    詳しく見る
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-4 text-center">
          <p className="text-[10px] text-gray-400">
            ※ 実際の配信時の表示とは多少異なる場合があります
          </p>
        </div>
      </div>
    </div>
  );
};

export default LivePreview;
