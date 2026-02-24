"use client";

import React from "react";
import { Orientation, Template } from "./types";

type PreviewMode = "color" | "image";

interface LivePreviewProps {
  orientation: Orientation;
  template: Template;
  backgroundColor: string;
  ctaTextColor: string;
  font?: string;
  logoUrl?: string;
  onOrientationChange?: (orientation: Orientation) => void;
  backgroundImageUrl?: string;
  hookImage?: string;
  bodyImage?: string;
  hookText?: string;
  bodyText?: string;
  ctaText?: string;
  availableBgImages?: string[];
  onBgImageSelect?: (url: string) => void;
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
  template,
  backgroundColor,
  ctaTextColor,
  font,
  logoUrl,
  onOrientationChange,
  backgroundImageUrl,
  hookImage,
  bodyImage,
  hookText,
  bodyText,
  ctaText,
  availableBgImages,
  onBgImageSelect,
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
          Live Preview
        </div>

        {/* ===== Hook Preview ===== */}
        <div className="mb-2 text-xs font-medium text-slate-500">Hook</div>
        <div className="w-full flex justify-center">
          <div className={frameClass}>
            {/* Outermost: bg image */}
            <div
              className="w-full h-full flex items-center justify-center"
              style={bgImageStyle}
            >
              {isVertical ? (
                /* === Vertical: bg color rect with text on top, square image on bottom === */
                <div
                  className="flex flex-col items-center justify-center gap-[8%] rounded shadow-lg overflow-hidden"
                  style={{
                    backgroundColor: bgColorHex,
                    width: "82%",
                    height: "90%",
                    padding: "6%",
                  }}
                >
                  {/* Text on top */}
                  <p
                    className="text-white text-[11px] font-bold leading-snug drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)] w-full"
                    style={{ fontFamily: getFontFamily() }}
                  >
                    {hookText || "フックテキスト"}
                    <span className="animate-pulse">|</span>
                  </p>
                  {/* Square image on bottom */}
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
                /* === Horizontal: bg color rect (wide px, super narrow py), image fills, text overlay === */
                <div
                  className="flex items-center justify-center rounded shadow-lg overflow-hidden"
                  style={{
                    backgroundColor: bgColorHex,
                    width: "80%",
                    height: "85%",
                    padding: "1% 10%",
                  }}
                >
                  <div className="relative w-full h-full overflow-hidden rounded">
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
                    {/* Text overlay at bottom */}
                    <div className="absolute bottom-10 left-2 right-2">
                      <p
                        className="text-white text-[11px] font-bold leading-snug drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)]"
                        style={{ fontFamily: getFontFamily() }}
                      >
                        {hookText || "フックテキスト"}
                        <span className="animate-pulse">|</span>
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ===== Body Preview ===== */}
        {/* Outer: bg image → Inner: user image (square-ish) + text BELOW image (no overlap) */}
        <div className="mt-4 mb-2 text-xs font-medium text-slate-500">Body</div>
        <div className="w-full flex justify-center">
          <div className={frameClass}>
            <div
              className="w-full h-full flex flex-col items-center justify-center gap-[1%] py-5"
              style={bgImageStyle}
            >
              {/* User image - square-ish */}
              <div className="relative w-[55%] aspect-square overflow-hidden rounded shadow-lg mb-3">
                {bodyImage ? (
                  <img
                    src={bodyImage}
                    alt="Body"
                    className="w-full h-full object-cover "
                  />
                ) : (
                  <div className="w-full h-full bg-gray-300 flex items-center justify-center">
                    <span className="text-gray-500 text-[10px]">
                      Body Image
                    </span>
                  </div>
                )}
              </div>
              {/* Text below the image, no overlap */}
              <p
                className="text-black text-[10px] font-bold leading-snug px-3 text-center"
                style={{ fontFamily: getFontFamily() }}
              >
                {bodyText || "ボディテキスト"}
                <span className="animate-pulse">|</span>
              </p>
            </div>
          </div>
        </div>

        {/* ===== CTA Preview ===== */}
        {/* bg COLOR only, NO bg image. White box + logo + text */}
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
                    className="font-normal leading-tight tracking-tight transition-all duration-300 text-[10px]"
                    style={{
                      fontFamily: getFontFamily(),
                      color: `#${ctaTextColor}`,
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
