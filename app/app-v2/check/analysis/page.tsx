"use client";

import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { MdOutlineSort } from "react-icons/md";
import {
  FaSortAlphaDown,
  FaSortAlphaUpAlt,
  FaSortNumericDown,
  FaSortNumericUpAlt,
} from "react-icons/fa";
import { ArrowLeft } from "lucide-react";

interface AdAnalysis {
  name: string;
  h: string;
  b1: string;
  b2: string;
  c: string;
  ctr: string;
  cvr: string;
  hook: string;
  body1: string;
  body2: string;
  cta: string;
  hookImage?: string;
  body1Image?: string;
  body2Image?: string;
}

type SortField =
  | "hookImage"
  | "hook"
  | "h"
  | "body1Image"
  | "body1"
  | "b1"
  | "body2Image"
  | "body2"
  | "b2"
  | "cta"
  | "c"
  | "ctr"
  | "cvr"
  | "steps";
type SortDirection = "asc" | "desc";
type SortType = "alpha" | "numeric";

interface SortConfig {
  field: SortField | null;
  direction: SortDirection;
}

// Sort Dropdown Component
const SortDropdown = ({
  isOpen,
  onClose,
  onSort,
  type,
  position = "bottom",
}: {
  isOpen: boolean;
  onClose: () => void;
  onSort: (direction: SortDirection) => void;
  type: SortType;
  position?: "bottom" | "bottom-right";
}) => {
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSortClick = (direction: SortDirection, e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    onSort(direction);
    onClose();
  };

  return (
    <div
      ref={dropdownRef}
      onClick={(e) => e.stopPropagation()}
      className={`absolute ${position === "bottom-right" ? "right-0" : "left-1/2 -translate-x-1/2"} top-full mt-1 z-[100] bg-white rounded-lg shadow-lg border border-slate-200 py-1 min-w-[130px]`}
      style={{ boxShadow: "0 4px 20px rgba(0,0,0,0.15)" }}
    >
      {type === "alpha" ? (
        <>
          <button
            onClick={(e) => handleSortClick("asc", e)}
            className="w-full px-3 py-2.5 text-left text-xs text-slate-700 hover:bg-blue-50 hover:text-[#0093b4] flex items-center gap-2 transition-colors"
          >
            <FaSortAlphaDown className="text-sm" />
            <span>昇順で並べ替え</span>
          </button>
          <button
            onClick={(e) => handleSortClick("desc", e)}
            className="w-full px-3 py-2.5 text-left text-xs text-slate-700 hover:bg-blue-50 hover:text-[#0093b4] flex items-center gap-2 transition-colors"
          >
            <FaSortAlphaUpAlt className="text-sm" />
            <span>降順で並べ替え</span>
          </button>
        </>
      ) : (
        <>
          <button
            onClick={(e) => handleSortClick("desc", e)}
            className="w-full px-3 py-2.5 text-left text-xs text-slate-700 hover:bg-blue-50 hover:text-[#0093b4] flex items-center gap-2 transition-colors"
          >
            <FaSortNumericUpAlt className="text-sm" />
            <span>High → Low</span>
          </button>
          <button
            onClick={(e) => handleSortClick("asc", e)}
            className="w-full px-3 py-2.5 text-left text-xs text-slate-700 hover:bg-blue-50 hover:text-[#0093b4] flex items-center gap-2 transition-colors"
          >
            <FaSortNumericDown className="text-sm" />
            <span>Low → High</span>
          </button>
        </>
      )}
    </div>
  );
};

// All steps for the dropdown (same as flow-header)
const allSteps = [
  { id: 1, label: "自社LP URL入力", pageType: "what", stepInPage: 1 },
  { id: 2, label: "キーワード選択", pageType: "what", stepInPage: 2 },
  { id: 3, label: "競合キービジュアル選択", pageType: "what", stepInPage: 3 },
  { id: 4, label: "ベンチマークマトリクス", pageType: "what", stepInPage: 4 },
  { id: 5, label: "価値整理", pageType: "what", stepInPage: 5 },
  { id: 6, label: "根源欲求整理", pageType: "what", stepInPage: 6 },
  { id: 7, label: "ポジショニング骨子選択", pageType: "what", stepInPage: 7 },
  { id: 8, label: "動画尺・語り方選択", pageType: "how", stepInPage: 1 },
  { id: 9, label: "メッセージ選択", pageType: "how", stepInPage: 2 },
  { id: 10, label: "バリエーション選択", pageType: "how", stepInPage: 3 },
  { id: 11, label: "ロゴ・音楽設定", pageType: "how", stepInPage: 4 },
  { id: 12, label: "動画生成", pageType: "generation", stepInPage: 1 },
];

// Mock analysis data - only 5 items for demo
const mockAnalysisData: AdAnalysis[] = [
  {
    name: "広告1",
    h: "42%",
    b1: "35%",
    b2: "28%",
    c: "18%",
    ctr: "1.8%",
    cvr: "0.5%",
    hook: "30代男性の悩み、これ1本で解決？驚きのスカルプケア",
    body1: "専門家監修の独自成分で、あなたの頭皮環境を根本から改善。",
    body2: "利用者の90%が満足！「抜け毛が減った」と実感の声多数。",
    cta: "今すぐチェック",
  },
  {
    name: "広告2",
    h: "45%",
    b1: "38%",
    b2: "30%",
    c: "21%",
    ctr: "2.1%",
    cvr: "0.8%",
    hook: "「えっ、まだ高いシャンプー使ってるの？」賢い男の選択",
    body1: "厳選されたオーガニック成分が毛穴の奥まで浸透。",
    body2: "累計販売数100万本突破！30日間の全額返金保証付き。",
    cta: "詳細を見る",
  },
  {
    name: "広告3",
    h: "38%",
    b1: "32%",
    b2: "25%",
    c: "15%",
    ctr: "1.5%",
    cvr: "0.4%",
    hook: "美容師がこっそり教える、自宅でできる頭皮改革",
    body1: "独自のマイクロバブル処方で、こびりついた皮脂汚れをごっそり洗浄。",
    body2: "「もっと早く使えばよかった」リピート率95%が証明する信頼の品質。",
    cta: "公式サイトへ",
  },
  {
    name: "広告4",
    h: "40%",
    b1: "33%",
    b2: "22%",
    c: "12%",
    ctr: "1.2%",
    cvr: "0.3%",
    hook: "鏡を見るのが楽しみに. 新習慣で手に入れる自信。",
    body1: "毎日のシャンプーを変えるだけで、驚きのハリ・コシを実現。",
    body2: "科学的根拠に基づいた成分配合で、実感力が違います。",
    cta: "限定特典付",
  },
  {
    name: "広告5",
    h: "48%",
    b1: "41%",
    b2: "35%",
    c: "24%",
    ctr: "2.5%",
    cvr: "1.1%",
    hook: "【究極のケア】男の身だしなみは頭皮から。次世代シャンプー。",
    body1: "高濃度の栄養成分が、細くなった髪に力強さを与えます。",
    body2: "他社製品で満足できなかった方にこそ使ってほしい1本。",
    cta: "送料無料",
  },
];

const CheckAnalysisPage = () => {
  const router = useRouter();
  const [analysisData, setAnalysisData] = useState<AdAnalysis[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [activeDropdown, setActiveDropdown] = useState<SortField | null>(null);
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    field: null,
    direction: "asc",
  });

  // Parse percentage string to number for sorting
  const parsePercentage = (value: string): number => {
    return parseFloat(value.replace("%", "")) || 0;
  };

  // Sort function
  const handleSort = (field: SortField, direction: SortDirection) => {
    setSortConfig({ field, direction });

    const sortedData = [...analysisData].sort((a: any, b: any) => {
      let aValue: string | number;
      let bValue: string | number;

      // Get the values based on field
      switch (field) {
        case "hook":
        case "body1":
        case "body2":
        case "cta":
          aValue = a[field];
          bValue = b[field];
          break;
        case "h":
        case "b1":
        case "b2":
        case "c":
        case "ctr":
        case "cvr":
          aValue = parsePercentage(a[field]);
          bValue = parsePercentage(b[field]);
          break;
        case "hookImage":
          aValue = a.hookImage || "";
          bValue = b.hookImage || "";
          break;
        case "body1Image":
          aValue = a.body1Image || "";
          bValue = b.body1Image || "";
          break;
        case "body2Image":
          aValue = a.body2Image || "";
          bValue = b.body2Image || "";
          break;
        case "steps":
          // "steps" is only used for dropdown state, not sorting
          return 0;
        default:
          aValue = "";
          bValue = "";
      }

      // Compare
      if (typeof aValue === "number" && typeof bValue === "number") {
        return direction === "asc" ? aValue - bValue : bValue - aValue;
      } else {
        const comparison = String(aValue).localeCompare(String(bValue), "ja");
        return direction === "asc" ? comparison : -comparison;
      }
    });

    setAnalysisData(sortedData);
  };

  const toggleDropdown = (field: SortField, e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    setActiveDropdown(activeDropdown === field ? null : field);
  };

  useEffect(() => {
    // Get session ID from localStorage
    const storedSessionId = localStorage.getItem("checkSessionId");
    setSessionId(storedSessionId);

    const loadData = async () => {
      setIsLoading(true);
      try {
        // Get selected ads from sessionStorage
        const selectedAdsJson = sessionStorage.getItem("selectedAdsForCheck");
        if (!selectedAdsJson) {
          // If no selection, show mock data for demo
          setAnalysisData(mockAnalysisData);
        } else {
          // TODO: Fetch actual analysis data based on selected ads
          // const selectedAds = JSON.parse(selectedAdsJson);
          // const { data } = await callApi.post("/check/analyze", { ads: selectedAds });
          // setAnalysisData(data.analysis);

          // For now, use mock data
          await new Promise((resolve) => setTimeout(resolve, 500));
          setAnalysisData(mockAnalysisData);
        }
      } catch (error) {
        console.error("Error loading analysis data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  // Navigation handlers for roadmap buttons
  const handleNavigate = (step: string) => {
    if (sessionId) {
      // Store the restart point in localStorage
      localStorage.setItem("planningRestartFrom", step);
      router.push(`/app-v2/planning/${sessionId}/what`);
    } else {
      // No session, go to projects page
      router.push("/app-v2/projects");
    }
  };

  const handleGoHome = () => {
    router.push("/app-v2/projects");
  };

  const handleStartOver = () => {
    // Clear planning data and start fresh
    localStorage.removeItem("planningRestartFrom");
    if (sessionId) {
      router.push(`/app-v2/planning/${sessionId}/what`);
    } else {
      router.push("/app-v2/projects");
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f8fafc]">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-[#0093b4] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-slate-600">分析中...</p>
        </div>
      </div>
    );
  }

  return (
    <main className="w-full max-w-[1920px] mx-auto p-4 flex flex-col items-start gap-4 text-[#000000] bg-[#f8fafc] min-h-screen font-sans">
      {/* Header */}
      <div className="w-full flex items-center justify-between shrink-0">
        <div className="flex gap-2 justify-start items-center px-5 py-3">
          <Link
            href="/app-v2/check"
            className="text-sm text-black hover:text-[#007a92] transition-colors"
          >
            {" "}
            <ArrowLeft />{" "}
          </Link>
          <h1 className="text-xl font-bold text-slate-800">CHECK / ACTION</h1>
        </div>
      </div>

      {/* Analysis & Actions Section */}
      <div className="w-full flex gap-4 shrink-0">
        {/* Analysis Card - Wide */}
        <div className="flex-1 bg-white rounded-xl border border-slate-200 p-6 flex flex-col shadow-sm">
          <h2 className="text-base font-bold text-slate-800 mb-4 flex items-center gap-2">
            <span className="w-2 h-6 bg-[#0093b4] rounded-full"></span>
            分析・示唆
          </h2>
          <div className="grid grid-cols-3 gap-4">
            <div className="flex items-start gap-3 p-4 bg-blue-50/50 rounded-lg">
              <div className="w-2 h-2 rounded-full bg-[#0093b4] mt-2 shrink-0" />
              <p className="text-sm leading-relaxed text-slate-700">
                広告2はHook保持率が
                <span className="font-bold text-[#0093b4]">45%</span>
                と高く、全体平均を上回っています。このDNAをベースにした展開を推奨します。
              </p>
            </div>
            <div className="flex items-start gap-3 p-4 bg-amber-50/50 rounded-lg">
              <div className="w-2 h-2 rounded-full bg-amber-500 mt-2 shrink-0" />
              <p className="text-sm leading-relaxed text-slate-700">
                CTA視聴維持率は良好ですが、
                <span className="font-bold text-amber-600">CTRが低調</span>
                です。CTAの訴求力強化を検討してください。
              </p>
            </div>
            <div className="flex items-start gap-3 p-4 bg-green-50/50 rounded-lg">
              <div className="w-2 h-2 rounded-full bg-green-500 mt-2 shrink-0" />
              <p className="text-sm leading-relaxed text-slate-700">
                Body1→Body2の離脱率が
                <span className="font-bold text-green-600">改善傾向</span>
                。ストーリー構成が効果的です。
              </p>
            </div>
          </div>
        </div>

        {/* Next Action Dropdown - Right side */}
        <div className="flex flex-col gap-5 justify-start items-start bg-white rounded-xl border border-slate-200 p-6">
          <div className="flex gap-2 items-center">
            <span className="w-2 h-6 bg-[#0093b4] rounded-full"></span>
            <h1 className="font-semibold text-base">次のアクション </h1>
          </div>
          <div className="w-[360px] shrink-0 relative">
            <button
              onClick={() =>
                setActiveDropdown(activeDropdown === "steps" ? null : "steps")
              }
              className="w-full flex items-center gap-3 px-5 py-4 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 transition-colors shadow-sm"
            >
              <span className="text-[#0093b4] text-xl">☑</span>
              <span className="text-sm font-semibold text-slate-700 flex-1 text-left">
                選択する
              </span>
              <svg
                className={`w-5 h-5 text-slate-400 transition-transform ${activeDropdown === "steps" ? "rotate-180" : ""}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            {activeDropdown === "steps" && (
              <>
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setActiveDropdown(null)}
                />
                <div className="absolute top-full right-0 mt-2 w-[360px] bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden z-50">
                  <div className="p-4 border-b border-gray-100 flex justify-between items-center">
                    <h3 className="font-bold text-base text-gray-800">
                      ステップ選択
                    </h3>
                    <span className="text-xs bg-cyan-50 text-cyan-600 px-2 py-1 rounded font-medium">
                      やり直す
                    </span>
                  </div>
                  <div className="max-h-[400px] overflow-y-auto">
                    {allSteps.map((stepItem, index) => (
                      <div
                        key={stepItem.id}
                        onClick={() => {
                          handleNavigate(
                            `${stepItem.pageType}-${stepItem.stepInPage}`,
                          );
                          setActiveDropdown(null);
                        }}
                        className="flex items-center gap-4 px-4 py-3 border-b border-gray-50 transition-colors cursor-pointer hover:bg-gray-50"
                      >
                        <div className="flex items-center justify-center rounded-full shrink-0 w-6 h-6 bg-cyan-500 text-white">
                          <span className="text-[10px] font-bold">
                            {index + 1}
                          </span>
                        </div>
                        <p className="text-sm flex-1 text-gray-700">
                          {index + 1}. {stepItem.label}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Data Table */}
      <div className="table-wrapper w-full bg-white rounded-lg border border-slate-200 shadow-sm overflow-visible relative isolate mb-8">
        <table className="w-full border-collapse text-[10px]">
          <thead className="z-50 sticky top-0">
            {/* First row - merged headers */}
            <tr className="h-[28px]">
              <th
                colSpan={3}
                className="text-[9px] border-1 border  border-[#8a8a8a] font-bold text-black bg-blue-100 px-1 py-1 text-center"
              >
                <p className="flex items-center gap-1 w-full justify-center">
                  HOOK{" "}
                  <MdOutlineSort className="text-xs hover:text-[#0093b4]" />
                </p>
              </th>
              <th
                colSpan={3}
                className="text-[9px] border  border-[#8a8a8a] font-bold text-black bg-blue-100 px-1 py-1 text-center"
              >
                Body1
              </th>
              <th
                colSpan={3}
                className="text-[9px] border  border-[#8a8a8a] font-bold text-black bg-blue-100 px-1 py-1 text-center"
              >
                Body2
              </th>
              <th
                colSpan={2}
                className="btext-[9px] border  border-[#8a8a8a] font-bold text-black bg-blue-100 px-1 py-1 text-center"
              >
                CTA
              </th>
              <th
                rowSpan={2}
                className="text-[9px] border border-[#8a8a8a] font-bold text-black bg-blue-100 px-3 py-1.5 text-center w-0 whitespace-nowrap relative"
              >
                <span className="flex items-center gap-1 justify-center">
                  CTR
                  <MdOutlineSort
                    className={`text-[14px] hover:text-[#0093b4] cursor-pointer ${sortConfig.field === "ctr" ? "text-[#0093b4]" : ""}`}
                    onClick={(e) => toggleDropdown("ctr", e)}
                  />
                </span>
                <SortDropdown
                  isOpen={activeDropdown === "ctr"}
                  onClose={() => setActiveDropdown(null)}
                  onSort={(dir) => handleSort("ctr", dir)}
                  type="numeric"
                  position="bottom-right"
                />
              </th>
              <th
                rowSpan={2}
                className="text-[9px] border border-[#8a8a8a] font-bold text-black bg-blue-100 px-3 py-1.5 text-center w-0 whitespace-nowrap relative"
              >
                <span className="flex items-center gap-1 justify-center">
                  CVR
                  <MdOutlineSort
                    className={`text-[14px] hover:text-[#0093b4] cursor-pointer ${sortConfig.field === "cvr" ? "text-[#0093b4]" : ""}`}
                    onClick={(e) => toggleDropdown("cvr", e)}
                  />
                </span>
                <SortDropdown
                  isOpen={activeDropdown === "cvr"}
                  onClose={() => setActiveDropdown(null)}
                  onSort={(dir) => handleSort("cvr", dir)}
                  type="numeric"
                  position="bottom-right"
                />
              </th>
            </tr>
            {/* Second row - sub headers */}
            <tr className="h-[28px]">
              {/* Hook Image */}
              <th className="text-[9px] border border-[#8a8a8a] font-bold text-slate-700 bg-blue-100 px-0.5 py-1 w-[100px] relative">
                <span className="text-center block">画像</span>
                <MdOutlineSort
                  className={`absolute right-[1px] top-1/2 -translate-y-1/2 text-[17px] hover:text-[#0093b4] cursor-pointer ${sortConfig.field === "hookImage" ? "text-[#0093b4]" : ""}`}
                  onClick={(e) => toggleDropdown("hookImage", e)}
                />
                <SortDropdown
                  isOpen={activeDropdown === "hookImage"}
                  onClose={() => setActiveDropdown(null)}
                  onSort={(dir) => handleSort("hookImage", dir)}
                  type="alpha"
                />
              </th>
              {/* Hook Text */}
              <th className="text-[9px] border border-[#8a8a8a] font-bold text-slate-700 bg-blue-100 px-1 py-1 relative">
                <span className="text-center block">テキスト</span>
                <MdOutlineSort
                  className={`absolute right-[1px] top-1/2 -translate-y-1/2 text-[17px] hover:text-[#0093b4] cursor-pointer ${sortConfig.field === "hook" ? "text-[#0093b4]" : ""}`}
                  onClick={(e) => toggleDropdown("hook", e)}
                />
                <SortDropdown
                  isOpen={activeDropdown === "hook"}
                  onClose={() => setActiveDropdown(null)}
                  onSort={(dir) => handleSort("hook", dir)}
                  type="alpha"
                />
              </th>
              {/* Hook Rate */}
              <th className="text-[9px] border border-[#8a8a8a] font-bold text-slate-700 bg-blue-100 px-1 py-1 w-0 whitespace-nowrap relative">
                <span className="text-center block mr-5">維持率</span>
                <MdOutlineSort
                  className={`absolute right-[1px] top-1/2 -translate-y-1/2 text-[17px] hover:text-[#0093b4] cursor-pointer ${sortConfig.field === "h" ? "text-[#0093b4]" : ""}`}
                  onClick={(e) => toggleDropdown("h", e)}
                />
                <SortDropdown
                  isOpen={activeDropdown === "h"}
                  onClose={() => setActiveDropdown(null)}
                  onSort={(dir) => handleSort("h", dir)}
                  type="numeric"
                  position="bottom-right"
                />
              </th>
              {/* Body1 Image */}
              <th className="text-[9px] border border-[#8a8a8a] font-bold text-slate-700 bg-blue-100 px-0.5 py-1 w-[100px] relative">
                <span className="text-center block">画像</span>
                <MdOutlineSort
                  className={`absolute right-[1px] top-1/2 -translate-y-1/2 text-[17px] hover:text-[#0093b4] cursor-pointer ${sortConfig.field === "body1Image" ? "text-[#0093b4]" : ""}`}
                  onClick={(e) => toggleDropdown("body1Image", e)}
                />
                <SortDropdown
                  isOpen={activeDropdown === "body1Image"}
                  onClose={() => setActiveDropdown(null)}
                  onSort={(dir) => handleSort("body1Image", dir)}
                  type="alpha"
                />
              </th>
              {/* Body1 Text */}
              <th className="text-[9px] border border-[#8a8a8a] font-bold text-slate-700 bg-blue-100 px-1 py-1 relative">
                <span className="text-center block">テキスト</span>
                <MdOutlineSort
                  className={`absolute right-[1px] top-1/2 -translate-y-1/2 text-[17px] hover:text-[#0093b4] cursor-pointer ${sortConfig.field === "body1" ? "text-[#0093b4]" : ""}`}
                  onClick={(e) => toggleDropdown("body1", e)}
                />
                <SortDropdown
                  isOpen={activeDropdown === "body1"}
                  onClose={() => setActiveDropdown(null)}
                  onSort={(dir) => handleSort("body1", dir)}
                  type="alpha"
                />
              </th>
              {/* Body1 Rate */}
              <th className="text-[9px] border border-[#8a8a8a] font-bold text-slate-700 bg-blue-100 px-1 py-1 w-0 whitespace-nowrap relative">
                <span className="text-center block mr-5">維持率</span>
                <MdOutlineSort
                  className={`absolute right-[1px] top-1/2 -translate-y-1/2 text-[17px] hover:text-[#0093b4] cursor-pointer ${sortConfig.field === "b1" ? "text-[#0093b4]" : ""}`}
                  onClick={(e) => toggleDropdown("b1", e)}
                />
                <SortDropdown
                  isOpen={activeDropdown === "b1"}
                  onClose={() => setActiveDropdown(null)}
                  onSort={(dir) => handleSort("b1", dir)}
                  type="numeric"
                  position="bottom-right"
                />
              </th>
              {/* Body2 Image */}
              <th className="text-[9px] border border-[#8a8a8a] font-bold text-slate-700 bg-blue-100 px-0.5 py-1 w-[100px] relative">
                <span className="text-center block">画像</span>
                <MdOutlineSort
                  className={`absolute right-[1px] top-1/2 -translate-y-1/2 text-[17px] hover:text-[#0093b4] cursor-pointer ${sortConfig.field === "body2Image" ? "text-[#0093b4]" : ""}`}
                  onClick={(e) => toggleDropdown("body2Image", e)}
                />
                <SortDropdown
                  isOpen={activeDropdown === "body2Image"}
                  onClose={() => setActiveDropdown(null)}
                  onSort={(dir) => handleSort("body2Image", dir)}
                  type="alpha"
                />
              </th>
              {/* Body2 Text */}
              <th className="text-[9px] border border-[#8a8a8a] font-bold text-slate-700 bg-blue-100 px-1 py-1 relative">
                <span className="text-center block">テキスト</span>
                <MdOutlineSort
                  className={`absolute right-[1px] top-1/2 -translate-y-1/2 text-[17px] hover:text-[#0093b4] cursor-pointer ${sortConfig.field === "body2" ? "text-[#0093b4]" : ""}`}
                  onClick={(e) => toggleDropdown("body2", e)}
                />
                <SortDropdown
                  isOpen={activeDropdown === "body2"}
                  onClose={() => setActiveDropdown(null)}
                  onSort={(dir) => handleSort("body2", dir)}
                  type="alpha"
                />
              </th>
              {/* Body2 Rate */}
              <th className="text-[9px] border border-[#8a8a8a] font-bold text-slate-700 bg-blue-100 px-1 py-1 w-0 whitespace-nowrap relative">
                <span className="text-center block mr-5">維持率</span>
                <MdOutlineSort
                  className={`absolute right-[1px] top-1/2 -translate-y-1/2 text-[17px] hover:text-[#0093b4] cursor-pointer ${sortConfig.field === "b2" ? "text-[#0093b4]" : ""}`}
                  onClick={(e) => toggleDropdown("b2", e)}
                />
                <SortDropdown
                  isOpen={activeDropdown === "b2"}
                  onClose={() => setActiveDropdown(null)}
                  onSort={(dir) => handleSort("b2", dir)}
                  type="numeric"
                  position="bottom-right"
                />
              </th>
              {/* CTA Text */}
              <th className="text-[9px] border border-[#8a8a8a] font-bold text-slate-700 bg-blue-100 px-1 py-1 relative">
                <span className="text-center block">テキスト</span>
                <MdOutlineSort
                  className={`absolute right-[1px] top-1/2 -translate-y-1/2 text-[17px] hover:text-[#0093b4] cursor-pointer ${sortConfig.field === "cta" ? "text-[#0093b4]" : ""}`}
                  onClick={(e) => toggleDropdown("cta", e)}
                />
                <SortDropdown
                  isOpen={activeDropdown === "cta"}
                  onClose={() => setActiveDropdown(null)}
                  onSort={(dir) => handleSort("cta", dir)}
                  type="alpha"
                />
              </th>
              {/* CTA Rate */}
              <th className="text-[9px] border border-[#8a8a8a] font-bold text-slate-700 bg-blue-100 px-1 py-1 w-0 whitespace-nowrap relative">
                <span className="text-center block mr-5">維持率</span>
                <MdOutlineSort
                  className={`absolute right-[1px] top-1/2 -translate-y-1/2 text-[17px] hover:text-[#0093b4] cursor-pointer ${sortConfig.field === "c" ? "text-[#0093b4]" : ""}`}
                  onClick={(e) => toggleDropdown("c", e)}
                />
                <SortDropdown
                  isOpen={activeDropdown === "c"}
                  onClose={() => setActiveDropdown(null)}
                  onSort={(dir) => handleSort("c", dir)}
                  type="numeric"
                  position="bottom-right"
                />
              </th>
            </tr>
          </thead>

          <tbody className="text-slate-700">
            {analysisData.map((row, index) => (
              <tr key={index} className="group h-[44px]">
                {/* Hook Image */}
                <td className="border-b border-r border-slate-200 relative p-0 transition-colors hover:bg-slate-50 bg-white">
                  <div className="w-full h-full p-0 flex items-center justify-center">
                    <div
                      className={`w-20 h-10 rounded-sm border ${index === 0 ? "border-gray-300 border-solid bg-white" : "border-dashed border-gray-400 bg-slate-50 hover:border-[#0093b4] hover:bg-blue-50/50"} flex items-center justify-center cursor-pointer transition-all text-gray-400 hover:text-[#0093b4] overflow-hidden group/img`}
                    >
                      {index === 0 ? (
                        <img
                          alt="Selected"
                          className="w-full h-full object-cover"
                          src="https://lh3.googleusercontent.com/aida-public/AB6AXuAW9HnYOP1ZfD6GpB7A5iBYvYWr61_5P1VDkC7OwdOXbHq15-wgtrHERQc9n-h7smUGRcYJowbDnUaDJcLVKz4pRshQFebXeQWSqgvj0zKUF5eCmkiVoKsfF1kvz6WRnMNJYEcxxdNHga1PZCnxx-COTeMAqUw9blNYEIF5La6s5H89VDwXmwmP4ceezwh_brmP6pKFZyAcHhGQz1FL3Okjx22ChHqAumf24E5KPY93cBF5gKxtvzv13mD55dt5cR_Gnd0ik0XGLYuC"
                        />
                      ) : (
                        <span className="material-symbols-outlined w-20 h-10 text-sm group-hover/img:scale-110 transition-transform">
                          add_photo_alternate
                        </span>
                      )}
                    </div>
                  </div>
                </td>

                {/* Hook Message */}
                <td className="border-b border-r border-slate-200 relative p-0 transition-colors hover:bg-slate-50 bg-white align-top">
                  <div className="flex h-full w-full relative">
                    <textarea
                      className="w-full h-full py-1 px-1.5 text-[10px] leading-tight bg-transparent border-none focus:ring-0 focus:outline-none resize-none transition-all text-slate-700 placeholder-gray-400"
                      defaultValue={row.hook}
                      disabled
                    />
                  </div>
                </td>

                {/* Hook Rate */}
                <td className="border-b border-r border-slate-200 relative p-0 transition-colors hover:bg-slate-50 bg-white align-middle text-center">
                  <span className="font-mono text-[9px] font-bold text-slate-700">
                    {row.h}
                  </span>
                </td>

                {/* Body1 Image */}
                <td className="border-b border-r border-slate-200 relative p-0 transition-colors hover:bg-slate-50 bg-white">
                  <div className="w-full h-full p-0.5 flex items-center justify-center">
                    <div className="w-20 h-10 rounded-sm border border-dashed border-gray-400 bg-slate-50 hover:border-[#0093b4] hover:bg-blue-50/50 flex items-center justify-center cursor-pointer transition-all text-gray-400 hover:text-[#0093b4] overflow-hidden group/img">
                      <span className="material-symbols-outlined text-sm group-hover/img:scale-110 transition-transform">
                        add_photo_alternate
                      </span>
                    </div>
                  </div>
                </td>

                {/* Body1 Message */}
                <td className="border-b border-r border-slate-200 relative p-0 transition-colors hover:bg-slate-50 bg-white align-top">
                  <div className="flex h-full w-full relative">
                    <textarea
                      className="w-full h-full py-1 px-1.5 text-[10px] leading-tight bg-transparent border-none focus:ring-0 focus:outline-none resize-none transition-all text-slate-700 placeholder-gray-400"
                      defaultValue={row.body1}
                      disabled
                    />
                  </div>
                </td>

                {/* Body1 Rate */}
                <td className="border-b border-r border-slate-200 relative p-0 transition-colors hover:bg-slate-50 bg-white align-middle text-center">
                  <span className="font-mono text-[9px] font-bold text-slate-700">
                    {row.b1}
                  </span>
                </td>

                {/* Body2 Image */}
                <td className="border-b border-r border-slate-200 relative p-0 transition-colors hover:bg-slate-50 bg-white">
                  <div className="w-full h-full p-0.5 flex items-center justify-center">
                    <div className="w-20 h-10 rounded-sm border border-dashed border-gray-400 bg-slate-50 hover:border-[#0093b4] hover:bg-blue-50/50 flex items-center justify-center cursor-pointer transition-all text-gray-400 hover:text-[#0093b4] overflow-hidden group/img">
                      <span className="material-symbols-outlined text-sm group-hover/img:scale-110 transition-transform">
                        add_photo_alternate
                      </span>
                    </div>
                  </div>
                </td>

                {/* Body2 Message */}
                <td className="border-b border-r border-slate-200 relative p-0 transition-colors hover:bg-slate-50 bg-white align-top">
                  <div className="flex h-full w-full relative">
                    <textarea
                      className="w-full h-full py-1 px-1.5 text-[10px] leading-tight bg-transparent border-none focus:ring-0 focus:outline-none resize-none transition-all text-slate-700 placeholder-gray-400"
                      defaultValue={row.body2}
                      disabled
                    />
                  </div>
                </td>

                {/* Body2 Rate */}
                <td className="border-b border-r border-slate-200 relative p-0 transition-colors hover:bg-slate-50 bg-white align-middle text-center">
                  <span className="font-mono text-[9px] font-bold text-slate-700">
                    {row.b2}
                  </span>
                </td>

                {/* CTA Message */}
                <td className="border-b border-r border-slate-200 relative p-0 transition-colors hover:bg-slate-50 bg-white align-top">
                  <div className="flex h-full w-full relative">
                    <textarea
                      className="w-full h-full py-1 px-1.5 text-[10px] leading-tight bg-transparent border-none focus:ring-0 focus:outline-none resize-none transition-all text-slate-700 placeholder-gray-400"
                      defaultValue={row.cta}
                      disabled
                    />
                  </div>
                </td>

                {/* CTA Rate */}
                <td className="border-b border-r border-slate-200 relative p-0 transition-colors hover:bg-slate-50 bg-white align-middle text-center">
                  <span className="font-mono text-[9px] font-bold text-slate-700">
                    {row.c}
                  </span>
                </td>

                {/* CTR */}
                <td className="border-b border-r border-slate-200 relative p-0 transition-colors hover:bg-slate-50 bg-white align-middle text-center">
                  <span className="font-mono text-[9px] font-bold text-slate-700">
                    {row.ctr}
                  </span>
                </td>

                {/* CVR */}
                <td className="border-b border-slate-200 relative p-0 transition-colors hover:bg-slate-50 bg-white align-middle text-center">
                  <span className="font-mono text-[9px] font-bold text-slate-700">
                    {row.cvr}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
};

export default CheckAnalysisPage;
