"use client";

import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { PDCACycle } from "./types";
import { StatusBadge } from "./StatusBadge";
import {
  Copy,
  Edit,
  Eye,
  XCircle,
  Play,
  BarChart3,
  X,
  FileText,
  Palette,
  Video,
  Cog,
  Lock,
} from "lucide-react";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { useRouter } from "next/navigation";

interface PDCATableProps {
  cycles: PDCACycle[];
  onView?: (cycle: PDCACycle) => void;
  onEdit?: (cycle: PDCACycle) => void;
  onDuplicate?: (cycle: PDCACycle) => void;
  onContinue?: (cycle: PDCACycle) => void;
  onAnalysis?: (cycle: PDCACycle) => void;
  loading: boolean;
  onClick: (cycleID: string) => void;
}

interface StepOption {
  id: string;
  section: "what" | "how";
  step: number;
  label: string;
  description: string;
  icon: React.ReactNode;
}

const STEP_OPTIONS: StepOption[] = [
  // What section - Scratch mode (7 steps)
  {
    id: "what_1",
    section: "what",
    step: 1,
    label: "STEP 1: URL入力",
    description: "プロダクトURLを入力",
    icon: <FileText className="w-4 h-4" />,
  },
  {
    id: "what_2",
    section: "what",
    step: 2,
    label: "STEP 2: キーワード選択",
    description: "キーワードを選択",
    icon: <FileText className="w-4 h-4" />,
  },
  {
    id: "what_3",
    section: "what",
    step: 3,
    label: "STEP 3: キービジュアル",
    description: "競合ビジュアルを選択",
    icon: <FileText className="w-4 h-4" />,
  },
  {
    id: "what_4",
    section: "what",
    step: 4,
    label: "STEP 4: 競合マトリクス",
    description: "キーメッセージを選択",
    icon: <FileText className="w-4 h-4" />,
  },
  {
    id: "what_5",
    section: "what",
    step: 5,
    label: "STEP 5: バリュー整理",
    description: "バリューを選択",
    icon: <FileText className="w-4 h-4" />,
  },
  {
    id: "what_6",
    section: "what",
    step: 6,
    label: "STEP 6: 欲求整理",
    description: "欲求を選択",
    icon: <FileText className="w-4 h-4" />,
  },
  {
    id: "what_7",
    section: "what",
    step: 7,
    label: "STEP 7: ポジショニング",
    description: "ポジショニングを確定",
    icon: <FileText className="w-4 h-4" />,
  },
  // How section (4 steps)
  {
    id: "how_1",
    section: "how",
    step: 1,
    label: "HOW 1: 動画時間",
    description: "動画の長さを選択",
    icon: <Video className="w-4 h-4" />,
  },
  {
    id: "how_2",
    section: "how",
    step: 2,
    label: "HOW 2: スタイル選択",
    description: "動画スタイルを選択",
    icon: <Palette className="w-4 h-4" />,
  },
  {
    id: "how_3",
    section: "how",
    step: 3,
    label: "HOW 3: バリアント",
    description: "バリアントを選択",
    icon: <Cog className="w-4 h-4" />,
  },
  {
    id: "how_4",
    section: "how",
    step: 4,
    label: "HOW 4: ロゴ・音楽",
    description: "ロゴと音楽を設定",
    icon: <Cog className="w-4 h-4" />,
  },
];

export const PDCATable: React.FC<PDCATableProps> = ({
  cycles,
  onView,
  onEdit,
  onDuplicate,
  onContinue,
  onAnalysis,
  loading,
  onClick,
}) => {
  const router = useRouter();
  const [memos, setMemos] = useState<Record<string, string>>({});
  const [showStepPopup, setShowStepPopup] = useState(false);
  const [selectedCycle, setSelectedCycle] = useState<PDCACycle | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  // For SSR compatibility with createPortal
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Initialize memos when cycles change
  useEffect(() => {
    setMemos(cycles.reduce((acc, c) => ({ ...acc, [c.id]: c.memo || "" }), {}));
  }, [cycles]);

  const handleContinueClick = (cycle: PDCACycle) => {
    setSelectedCycle(cycle);
    setShowStepPopup(true);
  };

  // Get the max step reached for a section
  const getMaxStepReached = (section: "what" | "how"): number => {
    if (typeof window === "undefined") return 1;
    const key = `max_step_reached_${section}`;
    const stored = localStorage.getItem(key);
    return stored ? parseInt(stored, 10) : 1;
  };

  // Check if a step is accessible (user has reached it)
  const isStepAccessible = (step: StepOption): boolean => {
    const maxStep = getMaxStepReached(step.section);
    return step.step <= maxStep;
  };

  const handleStepSelect = (step: StepOption) => {
    if (!selectedCycle) return;

    localStorage.setItem("continueSessionId", selectedCycle.id);

    // Set the planning type based on what's stored or default to scratch
    const whatType =
      localStorage.getItem(`planning_what_type_${selectedCycle.id}`) ||
      "scratch";
    localStorage.setItem("planning_what_type", whatType);

    // Navigate to the selected step
    if (step.section === "what") {
      localStorage.setItem("planning_current_page", `what_${whatType}`);
      localStorage.setItem("planning_current_step", step.step.toString());
      router.push(`/app-v2/planning/${selectedCycle.id}/what`);
    } else {
      localStorage.setItem("planning_current_page", "how");
      localStorage.setItem("planning_current_step", step.step.toString());
      router.push(`/app-v2/planning/${selectedCycle.id}/how`);
    }

    setShowStepPopup(false);
    setSelectedCycle(null);
  };

  const handleAnalysis = (cycle: PDCACycle) => {
    if (onAnalysis) {
      onAnalysis(cycle);
    } else {
      // Default behavior: go to check page
      localStorage.setItem("checkSessionId", cycle.id);
      router.push("/app-v2/check");
    }
  };

  const handleMemoChange = (cycleId: string, value: string) => {
    setMemos((prev) => ({ ...prev, [cycleId]: value }));
  };

  return (
    <div className="overflow-x-auto custom-scrollbar">
      <table className="w-full text-sm text-left border-collapse">
        <thead className="bg-slate-50 text-slate-800 font-bold text-xs uppercase tracking-wider sticky top-0 z-10">
          <tr>
            <th className="border border-slate-200 px-4 py-3 bg-slate-100 min-w-[100px] w-[120px]">
              ID
            </th>
            <th className="border border-slate-200 px-4 py-3 bg-slate-100 w-[140px]">
              ステータス
            </th>
            <th className="border border-slate-200 px-4 py-3 bg-slate-100 min-w-[300px]">
              仮説
            </th>
            <th className="border border-slate-200 px-4 py-3 bg-slate-100 min-w-[250px] w-[300px]">
              メモ
            </th>
            <th className="border border-slate-200 px-4 py-3 bg-slate-100 w-[180px]">
              アクション
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-200 bg-white">
          {loading ? (
            <tr>
              <td colSpan={5} className="border border-slate-200 h-[372px]">
                <div className="flex flex-col items-center justify-center h-full text-slate-500">
                  <p className="text-sm font-medium">
                    プロジェクトを読み込み中...
                  </p>
                </div>
              </td>
            </tr>
          ) : cycles.length > 0 ? (
            cycles.map((cycle) => (
              <tr
                key={cycle.id}
                className="hover:bg-cyan-50/30 transition-colors group relative"
              >
                <td
                  className="border border-slate-200 px-4 py-3 text-slate-800 font-mono text-xs font-medium bg-slate-50/50"
                  onClick={() => onClick(cycle.id)}
                >
                  {cycle.id.split("_")[1].toUpperCase().replace("-", " ")}
                </td>
                <td
                  className="border border-slate-200 px-4 py-3 align-middle"
                  onClick={() => onClick(cycle.id)}
                >
                  <StatusBadge status={cycle.status} />
                </td>
                <td className="border border-slate-200 px-4 py-3 text-slate-800 align-top leading-relaxed">
                  <p className="line-clamp-2">{cycle.hypothesis}</p>
                </td>
                <td className="border border-slate-200 px-0 py-0 align-top relative">
                  <textarea
                    className="w-full h-full min-h-[60px] px-4 py-3 bg-transparent border-none resize-none focus:ring-2 focus:ring-inset focus:ring-[#0093b4]/20 text-slate-500 placeholder-slate-300 text-sm leading-relaxed"
                    placeholder=""
                    value={memos[cycle.id]}
                    onChange={(e) => handleMemoChange(cycle.id, e.target.value)}
                  />
                  <div className="absolute right-2 top-2 hidden group-hover:flex items-center gap-1 bg-white/90 backdrop-blur-sm p-1 rounded-lg border border-slate-200 shadow-sm">
                    <button
                      className="p-1.5 hover:bg-slate-100 rounded text-slate-500 hover:text-[#0093b4] transition-colors"
                      title="詳細を見る"
                      onClick={() => onView?.(cycle)}
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button
                      className="p-1.5 hover:bg-slate-100 rounded text-slate-500 hover:text-[#0093b4] transition-colors"
                      title="編集"
                      onClick={() => onEdit?.(cycle)}
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      className="p-1.5 hover:bg-slate-100 rounded text-slate-500 hover:text-[#0093b4] transition-colors"
                      title="複製"
                      onClick={() => onDuplicate?.(cycle)}
                    >
                      <Copy className="w-4 h-4" />
                    </button>
                  </div>
                </td>
                <td className="border border-slate-200 px-3 py-3 align-middle">
                  <div className="flex flex-col gap-2">
                    <button
                      onClick={() => handleContinueClick(cycle)}
                      className="flex items-center justify-center gap-1.5 px-3 py-1.5 bg-[#0093b4] hover:bg-[#007a92] text-white text-xs font-medium rounded-md transition-colors"
                    >
                      <Play className="w-3.5 h-3.5" />
                      <span>続ける</span>
                    </button>
                    <button
                      onClick={() => handleAnalysis(cycle)}
                      className="flex items-center justify-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium rounded-md transition-colors border border-slate-200"
                    >
                      <BarChart3 className="w-3.5 h-3.5" />
                      <span>分析</span>
                    </button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={5} className="border border-slate-200 h-[372px] p-0">
                <Empty className="h-full">
                  <EmptyHeader>
                    <EmptyMedia variant="icon">{/* <XCircle /> */}</EmptyMedia>
                    <EmptyTitle className="text-gray-400 mb-10">
                      サイクルがありません
                    </EmptyTitle>
                    {/* <EmptyDescription>
                      You haven't created any cycles yet. Get started by
                      creating your first cycle.
                    </EmptyDescription> */}
                  </EmptyHeader>
                </Empty>
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Step Selection Popup - Using Portal to render outside overflow container */}
      {isMounted &&
        showStepPopup &&
        createPortal(
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[9999]">
            <div className="bg-white rounded-xl shadow-xl max-w-lg w-full mx-4 max-h-[80vh] overflow-hidden">
              <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200">
                <h3 className="text-lg font-bold text-slate-800">
                  続けるステップを選択
                </h3>
                <button
                  onClick={() => {
                    setShowStepPopup(false);
                    setSelectedCycle(null);
                  }}
                  className="p-1 hover:bg-slate-100 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-slate-500" />
                </button>
              </div>

              <div className="p-4 overflow-y-auto max-h-[60vh]">
                {/* WHAT Section */}
                <div className="mb-4">
                  <h4 className="text-sm font-bold text-slate-600 mb-2 px-2">
                    WHAT（何を伝えるか）
                  </h4>
                  <div className="space-y-1">
                    {STEP_OPTIONS.filter((s) => s.section === "what").map(
                      (step) => {
                        const accessible = isStepAccessible(step);
                        return (
                          <button
                            key={step.id}
                            onClick={() => accessible && handleStepSelect(step)}
                            disabled={!accessible}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors text-left group ${
                              accessible
                                ? "hover:bg-slate-50 cursor-pointer"
                                : "opacity-50 cursor-not-allowed bg-slate-50/50"
                            }`}
                          >
                            <div
                              className={`flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${
                                accessible
                                  ? "bg-[#0093b4]/10 text-[#0093b4] group-hover:bg-[#0093b4] group-hover:text-white"
                                  : "bg-slate-200 text-slate-400"
                              }`}
                            >
                              {accessible ? (
                                step.icon
                              ) : (
                                <Lock className="w-4 h-4" />
                              )}
                            </div>
                            <div className="flex-1 min-w-0">
                              <p
                                className={`text-sm font-medium ${accessible ? "text-slate-800" : "text-slate-400"}`}
                              >
                                {step.label}
                              </p>
                              <p
                                className={`text-xs ${accessible ? "text-slate-500" : "text-slate-400"}`}
                              >
                                {accessible
                                  ? step.description
                                  : "まだアクセスできません"}
                              </p>
                            </div>
                          </button>
                        );
                      },
                    )}
                  </div>
                </div>

                {/* HOW Section */}
                <div>
                  <h4 className="text-sm font-bold text-slate-600 mb-2 px-2">
                    HOW（どう伝えるか）
                  </h4>
                  <div className="space-y-1">
                    {STEP_OPTIONS.filter((s) => s.section === "how").map(
                      (step) => {
                        const accessible = isStepAccessible(step);
                        return (
                          <button
                            key={step.id}
                            onClick={() => accessible && handleStepSelect(step)}
                            disabled={!accessible}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors text-left group ${
                              accessible
                                ? "hover:bg-slate-50 cursor-pointer"
                                : "opacity-50 cursor-not-allowed bg-slate-50/50"
                            }`}
                          >
                            <div
                              className={`flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${
                                accessible
                                  ? "bg-emerald-500/10 text-emerald-600 group-hover:bg-emerald-500 group-hover:text-white"
                                  : "bg-slate-200 text-slate-400"
                              }`}
                            >
                              {accessible ? (
                                step.icon
                              ) : (
                                <Lock className="w-4 h-4" />
                              )}
                            </div>
                            <div className="flex-1 min-w-0">
                              <p
                                className={`text-sm font-medium ${accessible ? "text-slate-800" : "text-slate-400"}`}
                              >
                                {step.label}
                              </p>
                              <p
                                className={`text-xs ${accessible ? "text-slate-500" : "text-slate-400"}`}
                              >
                                {accessible
                                  ? step.description
                                  : "まだアクセスできません"}
                              </p>
                            </div>
                          </button>
                        );
                      },
                    )}
                  </div>
                </div>
              </div>

              <div className="px-6 py-4 border-t border-slate-200 bg-slate-50">
                <button
                  onClick={() => {
                    setShowStepPopup(false);
                    setSelectedCycle(null);
                  }}
                  className="w-full py-2.5 text-sm font-medium text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors"
                >
                  キャンセル
                </button>
              </div>
            </div>
          </div>,
          document.body,
        )}
    </div>
  );
};

export default PDCATable;
