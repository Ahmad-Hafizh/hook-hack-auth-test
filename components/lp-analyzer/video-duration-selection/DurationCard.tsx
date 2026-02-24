"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import { VideoDurationOption } from "./types";
import { Check, X, HelpCircle } from "lucide-react";

interface DurationCardProps {
  option: VideoDurationOption;
  isSelected: boolean;
  onSelect: () => void;
}

export const DurationCard: React.FC<DurationCardProps> = ({
  option,
  isSelected,
  onSelect,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [tooltipPos, setTooltipPos] = useState({ top: 0, left: 0 });
  const badgeRef = useRef<HTMLButtonElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const hideTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const updatePosition = useCallback(() => {
    if (badgeRef.current) {
      const rect = badgeRef.current.getBoundingClientRect();
      setTooltipPos({
        top: rect.bottom + 8,
        left: rect.right - 256, // 256 = w-64
      });
    }
  }, []);

  const showTooltip = useCallback(() => {
    if (hideTimeoutRef.current) {
      clearTimeout(hideTimeoutRef.current);
      hideTimeoutRef.current = null;
    }
    updatePosition();
    setIsMounted(true);
    // Small delay to trigger CSS transition after mount
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setIsVisible(true);
      });
    });
  }, [updatePosition]);

  const hideTooltip = useCallback(() => {
    hideTimeoutRef.current = setTimeout(() => {
      setIsVisible(false);
      // Wait for fade out animation to finish before unmounting
      setTimeout(() => {
        setIsMounted(false);
      }, 200);
    }, 100);
  }, []);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (hideTimeoutRef.current) clearTimeout(hideTimeoutRef.current);
    };
  }, []);

  return (
    <label className="flex-1 relative cursor-pointer group">
      <input
        type="radio"
        name="video_duration"
        value={option.value}
        checked={isSelected}
        onChange={onSelect}
        className="peer sr-only"
      />
      <div
        className={`h-full bg-white rounded-xl p-4 md:p-5 shadow-sm border transition-all duration-300 ${
          isSelected
            ? "border-[#0093b4] ring-1 ring-[#0093b4] bg-[#0093b4]/5"
            : "border-slate-200 group-hover:border-[#0093b4]/50 group-hover:shadow-md"
        }`}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div
              className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors duration-200 shrink-0 ${
                isSelected
                  ? "border-[#0093b4] bg-[#0093b4]"
                  : "border-slate-300 bg-white"
              }`}
            >
              <div
                className={`w-2.5 h-2.5 rounded-full bg-white transition-opacity duration-200 ${
                  isSelected ? "opacity-100" : "opacity-0"
                }`}
              />
            </div>
            <h3 className="text-lg font-bold text-slate-800">
              {option.title}
            </h3>
          </div>

          {/* Question mark badge */}
          <button
            ref={badgeRef}
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
            onMouseEnter={showTooltip}
            onMouseLeave={hideTooltip}
            className="w-6 h-6 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition-colors"
          >
            <HelpCircle className="w-4 h-4 text-slate-400" />
          </button>
        </div>
      </div>

      {/* Tooltip via portal */}
      {isMounted &&
        createPortal(
          <div
            ref={tooltipRef}
            style={{
              position: "fixed",
              top: tooltipPos.top,
              left: Math.max(8, tooltipPos.left),
              zIndex: 9999,
            }}
            className={`w-64 bg-white rounded-lg shadow-xl border border-slate-200 p-4 transition-all duration-200 ease-out ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 -translate-y-1 pointer-events-none"
            }`}
            onMouseEnter={showTooltip}
            onMouseLeave={hideTooltip}
          >
            {/* Arrow */}
            <div className="absolute -top-1.5 right-3 w-3 h-3 bg-white border-l border-t border-slate-200 rotate-45" />

            {/* Advantages */}
            <div className="mb-3">
              <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-bold bg-[#0093b4]/10 text-[#0093b4] mb-2">
                メリット
              </span>
              <ul className="space-y-1.5">
                {option.advantages.map((advantage, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-2 text-slate-600 text-xs"
                  >
                    <span className="shrink-0 mt-0.5">
                      <Check className="w-3 h-3 text-[#0093b4]" />
                    </span>
                    <span>{advantage}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Disadvantages */}
            <div>
              <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-bold bg-slate-100 text-slate-500 mb-2">
                デメリット
              </span>
              <ul className="space-y-1.5">
                {option.disadvantages.map((disadvantage, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-2 text-slate-500 text-xs"
                  >
                    <span className="shrink-0 mt-0.5">
                      <X className="w-3 h-3 text-slate-400" />
                    </span>
                    <span>{disadvantage}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>,
          document.body,
        )}
    </label>
  );
};

export default DurationCard;
