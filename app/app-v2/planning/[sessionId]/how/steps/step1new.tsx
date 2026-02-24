"use client";

import React, { useState, useRef, useCallback, useEffect } from "react";
import { createPortal } from "react-dom";
import { ArrowRight, HelpCircle, Check, X } from "lucide-react";
import { useDataContext } from "../hooks/useDataContext";
import { VideoDurationOption } from "@/components/lp-analyzer/video-duration-selection/types";
import callAppV2Api from "@/config/axios/axiosAppV2";
import { LoadingOverlay } from "@/components/ui/loading-overlay";

interface VideoDurationSelectionProps {
  onBack?: () => void;
  onNext: () => void;
}

const videoDurationOptions: VideoDurationOption[] = [
  {
    value: 15,
    title: "15秒動画",
    advantages: ["視聴完了率が高い", "短時間でメッセージを伝えやすい"],
    disadvantages: ["情報量が限定的", "複雑な訴求には不向き"],
  },
  {
    value: 30,
    title: "30秒動画",
    advantages: ["詳細な情報伝達が可能", "ブランドの世界観を表現しやすい"],
    disadvantages: ["視聴完了率が低い傾向", "制作コストが高い"],
  },
];

const DurationDropdown: React.FC<{
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

export const Step1New: React.FC<VideoDurationSelectionProps> = ({
  onBack,
  onNext,
}) => {
  const { duration, onSetDuration, onSetJobId } = useDataContext();
  const [loading, setLoading] = useState(false);
  const [communicationStyle, setCommunicationStyle] = useState("casual");
  const [pointOfView, setPointOfView] = useState("first_person");
  const selected_value_6 = localStorage.getItem("selected_values_6");
  const selected_tobe_4 = localStorage.getItem("selected_tobe_4");
  const selected_matrix = localStorage.getItem("selected_matrix");

  const onSubmit = async () => {
    setLoading(true);
    try {
      // Get positioning pattern from localStorage (saved in what step 7)
      const whatData = JSON.parse(
        localStorage.getItem("planning_what_data") || "{}",
      );
      const positioningPatterns = whatData.positioningPatterns || [];
      const selectedPattern = positioningPatterns[0] || {}; // Use first pattern or selected one

      // Build positioning_pattern in the format API expects
      const positioning_pattern = {
        pattern_number: selectedPattern.pattern_number || 1,
        pattern_label: selectedPattern.pattern_label || "",
        one_liner: selectedPattern.one_line_promise || "",
        // API expects functional_value and emotional_value as arrays
        functional_value: [
          {
            quadrant: "functional x process",
            quadrant_value: selectedPattern.process_description || "",
          },
          {
            quadrant: "functional x result",
            quadrant_value: selectedPattern.outcome_description || "",
          },
        ],
        emotional_value: [
          {
            quadrant: "emotional x result",
            quadrant_value: selectedPattern.direction_ja || "",
          },
          {
            quadrant: "emotional x process",
            quadrant_value: selectedPattern.direction_reason || "",
          },
        ],
      };

      const { data } = await callAppV2Api.post("/v1/video/main-content/async", {
        key_message: JSON.parse(selected_matrix || "{}")?.key_message,
        strong_points: JSON.parse(selected_matrix || "{}")?.strong_points,
        video_length: `${duration}s`,
        provider: "openai",
        language: "en",
        selected_values: JSON.parse(selected_value_6 || "[]"),
        selected_tobes: JSON.parse(selected_tobe_4 || "[]"),
        positioning_pattern,
        thinking_level: "medium",
        // communication_style: communicationStyle,
        // point_of_view: pointOfView,
      });

      // Store how data in localStorage
      const howData = JSON.parse(
        localStorage.getItem("planning_how_data") || "{}",
      );
      howData.communication_style = communicationStyle;
      howData.point_of_view = pointOfView;
      localStorage.setItem("planning_how_data", JSON.stringify(howData));

      onSetJobId(data.job_id);
      onNext();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Loading Overlay */}
      <LoadingOverlay
        isVisible={loading}
        progress={50}
        message="コピー案を生成中..."
        showProgress={false}
      />

      <main className="flex-1 w-full max-w-5xl mx-auto px-6 py-4 flex flex-col">
        {/* Header */}
        <div className="mb-4 animate-fade-in-up">
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight mb-2 text-slate-800">
            動画の長さと表現方法を選択してください
          </h1>
          {/* <p className="text-slate-500 text-base">
            広告の目的に合わせて最適な動画の長さを選択してください
          </p> */}
        </div>

        {/* Content Card */}
        <div className="w-full bg-white rounded-xl border border-slate-200 shadow-sm p-6">
          {/* Duration */}
          <div className="mb-6">
            <DurationDropdown
              duration={duration}
              onSetDuration={onSetDuration}
              options={videoDurationOptions}
            />
          </div>

          {/* Communication Style & Point of View */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-slate-500">
                コミュニケーション方法
              </label>
              <div className="relative">
                <select
                  className="w-full appearance-none bg-white border border-slate-200 text-slate-800 py-2.5 px-3 pr-10 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0093b4] focus:border-[#0093b4] text-sm cursor-pointer"
                  value={communicationStyle}
                  onChange={(e) => setCommunicationStyle(e.target.value)}
                >
                  <option value="casual">会話体／親しみ</option>
                  <option value="polite">敬体／誠実・安心</option>
                  <option value="neutral">常体／端的・解説</option>
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
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-slate-500">視点</label>
              <div className="relative">
                <select
                  className="w-full appearance-none bg-white border border-slate-200 text-slate-800 py-2.5 px-3 pr-10 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0093b4] focus:border-[#0093b4] text-sm cursor-pointer"
                  value={pointOfView}
                  onChange={(e) => setPointOfView(e.target.value)}
                >
                  <option value="first_person">一人称</option>
                  <option value="second_person">二人称</option>
                  <option value="third_person">三人称</option>
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
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-end gap-4 mt-10 pt-6 border-t border-slate-100">
            <button
              onClick={onBack}
              className="px-6 py-2.5 rounded-lg text-sm font-semibold text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-all"
            >
              戻る
            </button>
            <button
              onClick={onSubmit}
              disabled={loading}
              className="px-8 py-2.5 rounded-lg text-sm font-semibold text-white bg-[#0093b4] hover:bg-[#007a92] transition-all shadow-sm flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span>次へ進む</span>
              <ArrowRight className="w-4 h-4 text-white" />
            </button>
          </div>
        </div>
      </main>
    </>
  );
};

export default Step1New;
