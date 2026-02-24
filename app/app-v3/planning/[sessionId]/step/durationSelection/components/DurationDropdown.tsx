import { Check, HelpCircle, X } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

export interface VideoDurationOption {
  value: number;
  title: string;
  advantages: string[];
  disadvantages: string[];
}

export const DurationDropdown: React.FC<{
  duration: number;
  onSetDuration: (v: 15 | 30) => void;
  options: VideoDurationOption[];
}> = ({ duration, onSetDuration, options }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [tooltipPos, setTooltipPos] = useState({ top: 0, left: 0 });
  const badgeRef = useRef<HTMLButtonElement>(null);
  const hideTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const selectedOption =
    options.find((o) => o.value === duration) || options[0];

  const updatePosition = useCallback(() => {
    if (badgeRef.current) {
      const rect = badgeRef.current.getBoundingClientRect();
      setTooltipPos({
        top: rect.bottom + 8,
        left: Math.max(8, rect.right - 280),
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
    requestAnimationFrame(() => {
      requestAnimationFrame(() => setIsVisible(true));
    });
  }, [updatePosition]);

  const hideTooltip = useCallback(() => {
    hideTimeoutRef.current = setTimeout(() => {
      setIsVisible(false);
      setTimeout(() => setIsMounted(false), 200);
    }, 100);
  }, []);

  useEffect(() => {
    return () => {
      if (hideTimeoutRef.current) clearTimeout(hideTimeoutRef.current);
    };
  }, []);

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-1.5">
        <label className="text-sm font-medium text-slate-500">動画尺</label>
        <button
          ref={badgeRef}
          type="button"
          onMouseEnter={showTooltip}
          onMouseLeave={hideTooltip}
          className="w-5 h-5 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition-colors"
        >
          <HelpCircle className="w-3.5 h-3.5 text-slate-400" />
        </button>
      </div>
      <div className="relative">
        <select
          className="w-full appearance-none bg-white border border-slate-200 text-slate-800 py-2.5 px-3 pr-10 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0093b4] focus:border-[#0093b4] text-sm cursor-pointer"
          value={duration}
          onChange={(e) => onSetDuration(Number(e.target.value) as 15 | 30)}
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.title}
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-400">
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
      </div>

      {/* Tooltip via portal */}
      {isMounted &&
        createPortal(
          <div
            style={{
              position: "fixed",
              top: tooltipPos.top,
              left: tooltipPos.left,
              zIndex: 9999,
            }}
            className={`w-[280px] bg-white rounded-lg shadow-xl border border-slate-200 p-4 transition-all duration-200 ease-out ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 -translate-y-1 pointer-events-none"
            }`}
            onMouseEnter={showTooltip}
            onMouseLeave={hideTooltip}
          >
            <div className="absolute -top-1.5 left-6 w-3 h-3 bg-white border-l border-t border-slate-200 rotate-45" />
            {options.map((opt, i) => (
              <div
                key={opt.value}
                className={i > 0 ? "mt-3 pt-3 border-t border-slate-100" : ""}
              >
                <p className="text-xs font-bold text-slate-700 mb-2">
                  {opt.title}
                </p>
                <div className="mb-2">
                  <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-bold bg-[#0093b4]/10 text-[#0093b4] mb-1.5">
                    メリット
                  </span>
                  <ul className="space-y-1">
                    {opt.advantages.map((adv, j) => (
                      <li
                        key={j}
                        className="flex items-start gap-2 text-slate-600 text-xs"
                      >
                        <Check className="w-3 h-3 text-[#0093b4] shrink-0 mt-0.5" />
                        <span>{adv}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-bold bg-slate-100 text-slate-500 mb-1.5">
                    デメリット
                  </span>
                  <ul className="space-y-1">
                    {opt.disadvantages.map((dis, j) => (
                      <li
                        key={j}
                        className="flex items-start gap-2 text-slate-500 text-xs"
                      >
                        <X className="w-3 h-3 text-slate-400 shrink-0 mt-0.5" />
                        <span>{dis}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>,
          document.body,
        )}
    </div>
  );
};
