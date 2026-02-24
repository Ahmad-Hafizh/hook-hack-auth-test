"use client";

import React from "react";
import { Orientation, Template } from "./types";

interface LivePreviewProps {
  orientation: Orientation;
  template?: Template;
  backgroundColor?: string;
  ctaTextColor?: string;
  font?: string;
  logoUrl?: string;
  onOrientationChange?: (orientation: Orientation) => void;
  backgroundImageUrl?: string;
  hookImage?: string;
  bodyImage?: string;
  hookText?: string;
  bodyText?: string;
  ctaText?: string;
}

const fontFamilyMap: Record<string, string> = {
  "Noto Sans JP": "'Noto Sans JP', sans-serif",
  "Kiwi Maru": "var(--font-kiwi-maru), 'Kiwi Maru', serif",
  "Zen Kaku Gothic New": "'Zen Kaku Gothic New', sans-serif",
  "M PLUS Rounded 1c": "'M PLUS Rounded 1c', sans-serif",
  "Kosugi Maru": "'Kosugi Maru', sans-serif",
};

export const LivePreview: React.FC<LivePreviewProps> = ({
  orientation,
  backgroundColor,
  font,
  logoUrl,
  backgroundImageUrl,
  hookImage,
  bodyImage,
  hookText,
  bodyText,
  ctaText,
}) => {
  const isVertical = orientation === "vertical";

  const getFontFamily = () => (font ? fontFamilyMap[font] || font : undefined);

  const frameClass = `rounded-lg shadow-md border border-gray-200 overflow-hidden relative transition-all duration-300 ${
    isVertical ? "w-[220px] aspect-[9/16]" : "w-full aspect-video"
  }`;

  const bgColorHex = `#${backgroundColor}`;

  const bgImageStyle: React.CSSProperties = backgroundImageUrl
    ? {
        backgroundImage: `url(${backgroundImageUrl})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }
    : { backgroundColor: "#f0f0f0" };

  return (
    <div className="w-full lg:w-[420px] shrink-0 self-start sticky top-[80px]">
      <div className="bg-gray-50 border border-slate-200 rounded-xl p-4 lg:p-6 shadow-sm">
        <div className="mb-3 font-semibold text-sm text-slate-700">
          プレビュー画面
        </div>

        {/* ===== Hook Preview ===== */}
        <div className="mb-2 text-xs font-medium text-slate-500">Hook</div>
        <div className="w-full flex justify-center">
          <div className={frameClass}>
            <div
              className="w-full h-full flex items-center justify-center"
              style={bgImageStyle}
            >
              {isVertical ? (
                <div
                  className="flex flex-col items-center justify-center gap-[8%] overflow-hidden rounded shadow-lg"
                  style={{
                    backgroundColor: bgColorHex,
                    width: "82%",
                    height: "90%",
                    padding: "6%",
                  }}
                >
                  <p
                    className="text-white text-[11px] font-bold leading-snug text-left w-full"
                    style={{
                      fontFamily: getFontFamily(),
                      WebkitTextStroke: "0.3px rgba(0,0,0,0.7)",
                      textShadow:
                        "0 1px 4px rgba(0,0,0,0.8), 0 0 2px rgba(0,0,0,0.5)",
                    }}
                  >
                    {hookText || "フックテキスト"}
                    <span className="animate-pulse">|</span>
                  </p>
                  <div className="w-[85%] aspect-square overflow-hidden rounded shadow-lg">
                    {hookImage ? (
                      <img
                        src={hookImage}
                        alt="Hook"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-300 flex items-center justify-center">
                        <span className="text-gray-500 text-[10px]">
                          Hook Image
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div
                  className="relative overflow-hidden rounded shadow-lg"
                  style={{
                    backgroundColor: bgColorHex,
                    width: "80%",
                    height: "85%",
                  }}
                >
                  <div className="w-full h-full flex items-center justify-center p-[4%]">
                    {hookImage ? (
                      <img
                        src={hookImage}
                        alt="Hook"
                        className="w-full h-full object-cover rounded"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-300 flex items-center justify-center rounded">
                        <span className="text-gray-500 text-[10px]">
                          Hook Image
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center px-[8%]">
                    <p
                      className="text-white text-[11px] font-bold leading-snug text-center"
                      style={{
                        fontFamily: getFontFamily(),
                        WebkitTextStroke: "0.3px rgba(0,0,0,0.7)",
                        textShadow:
                          "0 1px 4px rgba(0,0,0,0.8), 0 0 2px rgba(0,0,0,0.5)",
                      }}
                    >
                      {hookText || "フックテキスト"}
                      <span className="animate-pulse">|</span>
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ===== Body Preview ===== */}
        <div className="mt-4 mb-2 text-xs font-medium text-slate-500">Body</div>
        <div className="w-full flex justify-center">
          <div className={frameClass}>
            <div
              className="w-full h-full flex flex-col items-center justify-center gap-[1%] py-5"
              style={bgImageStyle}
            >
              <div className="relative w-[55%] aspect-square overflow-hidden rounded shadow-lg mb-3">
                {bodyImage ? (
                  <img
                    src={bodyImage}
                    alt="Body"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-300 flex items-center justify-center">
                    <span className="text-gray-500 text-[10px]">
                      Body Image
                    </span>
                  </div>
                )}
              </div>
              <p
                className={`text-black text-[11px] leading-snug px-3 ${isVertical ? "text-left w-full" : "text-center"}`}
                style={{ fontFamily: getFontFamily() }}
              >
                {bodyText || "ボディテキスト"}
                <span className="animate-pulse">|</span>
              </p>
            </div>
          </div>
        </div>

        {/* ===== CTA Preview ===== */}
        <div className="mt-4 mb-2 text-xs font-medium text-slate-500">CTA</div>
        <div className="w-full flex justify-center">
          <div className={frameClass}>
            <div
              className="w-full h-full flex items-center justify-center transition-all duration-300"
              style={{ backgroundColor: bgColorHex }}
            >
              <div className="bg-white shadow-xl overflow-hidden flex flex-col items-center justify-center w-[75%] h-[70%] rounded-xl">
                <div className="flex flex-col items-center justify-center text-center p-3 gap-2">
                  <div className="w-16 h-16 bg-gray-100 rounded-lg border border-gray-200 flex items-center justify-center shadow-sm shrink-0 overflow-hidden">
                    {logoUrl ? (
                      <img
                        src={logoUrl}
                        alt="Logo"
                        className="w-full h-full object-contain"
                      />
                    ) : (
                      <span className="text-gray-400 text-[7px] font-bold tracking-widest">
                        LOGO
                      </span>
                    )}
                  </div>
                  <h3
                    className="font-normal leading-tight tracking-tight transition-all duration-300 text-[11px]"
                    style={{
                      fontFamily: getFontFamily(),
                    }}
                  >
                    {ctaText || (
                      <>
                        無料体験レッスンに
                        <br />
                        ぜひお越しください
                      </>
                    )}
                    <span className="animate-pulse">|</span>
                  </h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LivePreview;
