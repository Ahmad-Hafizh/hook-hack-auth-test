"use client";

import React, { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { StatusBadge } from "./StatusBadge";
import {
  Copy,
  Edit,
  Eye,
  Play,
  BarChart3,
  X,
  FileText,
  Globe,
  LayoutGrid,
  Heart,
  Compass,
  Timer,
  Palette,
  Layers,
  Video,
  Cog,
  Lock,
  Search,
  Save,
  Trash,
} from "lucide-react";
import callApi from "@/config/axios/axios";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { useRouter } from "next/navigation";
import { PDCASession } from "../page";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { toast } from "sonner";

interface PDCATableProps {
  cycles: PDCASession[];
  onView?: (cycle: PDCASession) => void;
  onEdit?: (cycle: PDCASession) => void;
  onDuplicate?: (cycle: PDCASession) => void;
  onContinue?: (cycle: PDCASession) => void;
  onAnalysis?: (cycle: PDCASession) => void;
  loading: boolean;
  onClick: (cycleID: string, status: string) => void;
  onHandleDelete: (cycle: PDCASession) => void;
}

interface StepOption {
  id: number;
  section: "what" | "how";
  label: string;
  description: string;
  icon: React.ReactNode;
}

// Step definitions per whatType, matching app-v3/planning/[sessionId]/page.tsx
const SCRATCH_STEPS: StepOption[] = [
  // WHAT section (steps 1-8)
  {
    id: 1,
    section: "what",
    label: "コピー作成モード選択",
    description: "作成モードを選択",
    icon: <Search className="w-4 h-4" />,
  },
  {
    id: 2,
    section: "what",
    label: "分析選択",
    description: "分析方法を選択",
    icon: <FileText className="w-4 h-4" />,
  },
  {
    id: 3,
    section: "what",
    label: "自社LP URL入力",
    description: "プロダクトURLを入力",
    icon: <Globe className="w-4 h-4" />,
  },
  {
    id: 4,
    section: "what",
    label: "ベンチマーク選択",
    description: "競合サービスを選択",
    icon: <LayoutGrid className="w-4 h-4" />,
  },
  {
    id: 5,
    section: "what",
    label: "ベンチマークマトリクス",
    description: "キーメッセージを選択",
    icon: <FileText className="w-4 h-4" />,
  },
  {
    id: 6,
    section: "what",
    label: "価値整理",
    description: "バリューを整理",
    icon: <FileText className="w-4 h-4" />,
  },
  {
    id: 7,
    section: "what",
    label: "根源欲求整理",
    description: "欲求を整理",
    icon: <Heart className="w-4 h-4" />,
  },
  {
    id: 8,
    section: "what",
    label: "ポジショニング骨子選択",
    description: "ポジショニングを確定",
    icon: <Compass className="w-4 h-4" />,
  },
  // HOW section (steps 9-13)
  {
    id: 9,
    section: "how",
    label: "動画尺・語り方選択",
    description: "動画の長さを選択",
    icon: <Timer className="w-4 h-4" />,
  },
  {
    id: 10,
    section: "how",
    label: "メッセージ選択",
    description: "動画スタイルを選択",
    icon: <Palette className="w-4 h-4" />,
  },
  {
    id: 11,
    section: "how",
    label: "バリエーション選択",
    description: "バリアントを選択",
    icon: <Layers className="w-4 h-4" />,
  },
  {
    id: 12,
    section: "how",
    label: "ロゴ・音楽設定",
    description: "ロゴと音楽を設定",
    icon: <Cog className="w-4 h-4" />,
  },
  {
    id: 13,
    section: "how",
    label: "生成設定確認",
    description: "動画を生成",
    icon: <Video className="w-4 h-4" />,
  },
];

const SKIP_STEPS: StepOption[] = [
  {
    id: 1,
    section: "what",
    label: "コピー作成モード選択",
    description: "作成モードを選択",
    icon: <Search className="w-4 h-4" />,
  },
  {
    id: 2,
    section: "what",
    label: "分析選択",
    description: "分析方法を選択",
    icon: <FileText className="w-4 h-4" />,
  },
  {
    id: 3,
    section: "what",
    label: "URL・競合入力",
    description: "URLと競合を入力",
    icon: <Globe className="w-4 h-4" />,
  },
  {
    id: 4,
    section: "what",
    label: "ベンチマークマトリクス",
    description: "キーメッセージを選択",
    icon: <FileText className="w-4 h-4" />,
  },
  {
    id: 5,
    section: "what",
    label: "価値整理",
    description: "バリューを整理",
    icon: <FileText className="w-4 h-4" />,
  },
  {
    id: 6,
    section: "what",
    label: "根源欲求整理",
    description: "欲求を整理",
    icon: <Heart className="w-4 h-4" />,
  },
  {
    id: 7,
    section: "what",
    label: "ポジショニング骨子選択",
    description: "ポジショニングを確定",
    icon: <Compass className="w-4 h-4" />,
  },
  {
    id: 8,
    section: "how",
    label: "動画尺・語り方選択",
    description: "動画の長さを選択",
    icon: <Timer className="w-4 h-4" />,
  },
  {
    id: 9,
    section: "how",
    label: "メッセージ選択",
    description: "動画スタイルを選択",
    icon: <Palette className="w-4 h-4" />,
  },
  {
    id: 10,
    section: "how",
    label: "バリエーション選択",
    description: "バリアントを選択",
    icon: <Layers className="w-4 h-4" />,
  },
  {
    id: 11,
    section: "how",
    label: "ロゴ・音楽設定",
    description: "ロゴと音楽を設定",
    icon: <Cog className="w-4 h-4" />,
  },
  {
    id: 12,
    section: "how",
    label: "生成設定確認",
    description: "動画を生成",
    icon: <Video className="w-4 h-4" />,
  },
];

const SPEED_STEPS: StepOption[] = [
  {
    id: 1,
    section: "what",
    label: "コピー作成モード選択",
    description: "作成モードを選択",
    icon: <Search className="w-4 h-4" />,
  },
  {
    id: 2,
    section: "what",
    label: "自社LP URL入力",
    description: "プロダクトURLを入力",
    icon: <Globe className="w-4 h-4" />,
  },
  {
    id: 3,
    section: "how",
    label: "動画尺・語り方選択",
    description: "動画の長さを選択",
    icon: <Timer className="w-4 h-4" />,
  },
  {
    id: 4,
    section: "how",
    label: "メッセージ選択",
    description: "動画スタイルを選択",
    icon: <Palette className="w-4 h-4" />,
  },
  {
    id: 5,
    section: "how",
    label: "バリエーション選択",
    description: "バリアントを選択",
    icon: <Layers className="w-4 h-4" />,
  },
  {
    id: 6,
    section: "how",
    label: "生成設定確認",
    description: "動画を生成",
    icon: <Video className="w-4 h-4" />,
  },
];

function getStepsByCycleType(whatType: string): StepOption[] {
  switch (whatType) {
    case "skip":
      return SKIP_STEPS;
    case "speed":
      return SPEED_STEPS;
    default:
      return SCRATCH_STEPS;
  }
}

export const PDCATable: React.FC<PDCATableProps> = ({
  cycles,
  onView,
  onEdit,
  onDuplicate,
  onContinue,
  onAnalysis,
  loading,
  onClick,
  onHandleDelete,
}) => {
  const router = useRouter();

  const [showStepPopup, setShowStepPopup] = useState(false);
  const [selectedCycle, setSelectedCycle] = useState<PDCASession | null>(null);
  const [cycleSteps, setCycleSteps] = useState<StepOption[]>(SCRATCH_STEPS);
  const [cycleCurrentStep, setCycleCurrentStep] = useState<number>(1);
  const [isMounted, setIsMounted] = useState(false);
  const [navigating, setNavigating] = useState(false);

  const [editing, setEditing] = useState<boolean>(false);
  const [saving, setSaving] = useState<boolean>(false);
  const memoRef = useRef<HTMLTextAreaElement>(null);

  const saveMemo = async (sessionId: string) => {
    try {
      setSaving(true);
      const { data } = await callApi.post(
        "/app-v3/projects/session/edit/memo",
        {
          sessionId: sessionId,
          memo: memoRef.current?.value,
        },
      );
    } catch (error) {
      console.log(error);
    } finally {
      setSaving(false);
    }
  };

  // For SSR compatibility with createPortal
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleContinueClick = async (cycle: PDCASession) => {
    setSelectedCycle(cycle);
    // Fetch the cycle's current step and whatType from DB
    try {
      const { data } = await callApi.post("/app-v3/projects/session/page", {
        sessionId: cycle.id,
      });
      const whatType = data.isChoosingSpeed
        ? "speed"
        : data.isHavingCompetitorUrls
          ? "skip"
          : "scratch";
      setCycleSteps(getStepsByCycleType(whatType));
      setCycleCurrentStep(data.step || 1);
    } catch (error) {
      console.error("Failed to fetch cycle info:", error);
      setCycleSteps(SCRATCH_STEPS);
      setCycleCurrentStep(1);
    }
    setShowStepPopup(true);
  };

  // Check if a step is accessible (user has reached it or passed it)
  const isStepAccessible = (step: StepOption): boolean => {
    return step.id <= cycleCurrentStep;
  };

  const handleStepSelect = async (step: StepOption) => {
    if (!selectedCycle || navigating) return;

    setNavigating(true);
    try {
      // Update step in DB via API, same as onDbStep in planning context
      await callApi.post("/app-v3/projects/session/step", {
        sessionId: selectedCycle.id,
        step: step.id,
      });

      // Navigate to the app-v3 planning page — the context will pick up the step from DB
      router.push(`/app-v3/${selectedCycle.id}/planning`);
    } catch (error) {
      console.error("Failed to navigate to step:", error);
    } finally {
      setNavigating(false);
      setShowStepPopup(false);
      setSelectedCycle(null);
    }
  };

  const handleAnalysis = (cycle: PDCASession) => {
    if (onAnalysis) {
      onAnalysis(cycle);
    } else {
      router.push("/app-v3/check");
    }
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
                  className="border border-slate-200 px-4 py-3 text-slate-800 font-mono align-top text-xs font-medium bg-slate-50/50"
                  onClick={() => onClick(cycle.id, cycle.status)}
                >
                  {cycle.id.split("_")[1].toUpperCase().replace("-", " ")}
                </td>
                <td
                  className="border border-slate-200 px-4 py-3 align-top "
                  onClick={() => onClick(cycle.id, cycle.status)}
                >
                  <StatusBadge status={cycle.status} />
                </td>
                <td className="border border-slate-200 px-4 py-3 text-slate-800 align-top leading-relaxed">
                  <p className="text-xs">
                    現在のテストセクション: {cycle.hypotesis?.part || "-"}
                  </p>
                  <p className="text-xs mt-1">
                    パターン数: {cycle.hypotesis?.patterns || 0}
                  </p>
                </td>
                <td className="border border-slate-200 px-0 py-0 h-full">
                  <div className="relative h-full ">
                    <textarea
                      className={`w-full h-full ${cycle.status !== "deleted" ? "min-h-[126px]" : ""} px-4 py-3 bg-transparent resize-none focus:ring-inset focus:ring-0 text-slate-500 placeholder-slate-300 text-sm leading-relaxed border-none`}
                      placeholder="メモを入力してください..."
                      defaultValue={cycle.memo}
                      ref={memoRef}
                      disabled={!editing && cycle.status === "deleted"}
                    />
                    {cycle.status !== "deleted" && (
                      <Button
                        variant={"outline"}
                        className="absolute top-1 right-1 text-slate-400 hover:text-slate-600 transition-colors !w-fit !h-fit p-1"
                        onClick={() => {
                          if (editing) {
                            saveMemo(cycle.id);
                          }
                          setEditing((prev) => !prev);
                        }}
                        disabled={saving}
                      >
                        {saving ? (
                          <Spinner className="w-4 h-4" />
                        ) : editing ? (
                          <Save className="w-4 h-4" />
                        ) : (
                          <Edit className="w-4 h-4" />
                        )}
                      </Button>
                    )}
                  </div>
                  {/* <div className="absolute right-2 top-2 hidden group-hover:flex items-center gap-1 bg-white/90 backdrop-blur-sm p-1 rounded-lg border border-slate-200 shadow-sm"> */}
                  {/* <button
                      className="p-1.5 hover:bg-slate-100 rounded text-slate-500 hover:text-[#0093b4] transition-colors"
                      title="詳細を見る"
                      onClick={() => onView?.(cycle)}
                    >
                      <Eye className="w-4 h-4" />
                    </button> */}
                  {/* <button
                      className="p-1.5 hover:bg-slate-100 rounded text-slate-500 hover:text-[#0093b4] transition-colors"
                      title="編集"
                      onClick={() => onEdit?.(cycle)}
                    >
                      <Edit className="w-4 h-4" />
                    </button> */}
                  {/* <button
                      className="p-1.5 hover:bg-slate-100 rounded text-slate-500 hover:text-[#0093b4] transition-colors"
                      title="複製"
                      onClick={() => onDuplicate?.(cycle)}
                    >
                      <Copy className="w-4 h-4" />
                    </button> */}
                  {/* </div> */}
                </td>

                <td className="border border-slate-200 px-3 py-3 align-middle">
                  {cycle.status !== "deleted" && (
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
                      <button
                        onClick={() => onHandleDelete(cycle)}
                        className="flex items-center justify-center gap-1.5 px-3 py-1.5 bg-red-100 hover:bg-red-200 text-red-700 text-xs font-medium rounded-md transition-colors border border-red-200"
                      >
                        <Trash className="w-3.5 h-3.5" />
                        <span>消去</span>
                      </button>
                    </div>
                  )}
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
                {cycleSteps.some((s) => s.section === "what") && (
                  <div className="mb-4">
                    <h4 className="text-sm font-bold text-slate-600 mb-2 px-2">
                      WHAT（何を伝えるか）
                    </h4>
                    <div className="space-y-1">
                      {cycleSteps
                        .filter((s) => s.section === "what")
                        .map((step) => {
                          const accessible = isStepAccessible(step);
                          const isCurrentStep = step.id === cycleCurrentStep;
                          return (
                            <button
                              key={step.id}
                              onClick={() =>
                                accessible && handleStepSelect(step)
                              }
                              disabled={!accessible || navigating}
                              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors text-left group ${
                                isCurrentStep
                                  ? "bg-[#0093b4]/5 ring-1 ring-[#0093b4]/20"
                                  : accessible
                                    ? "hover:bg-slate-50 cursor-pointer"
                                    : "opacity-50 cursor-not-allowed bg-slate-50/50"
                              }`}
                            >
                              <div
                                className={`flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${
                                  isCurrentStep
                                    ? "bg-[#0093b4] text-white"
                                    : accessible
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
                                  className={`text-sm font-medium ${
                                    isCurrentStep
                                      ? "text-[#0093b4]"
                                      : accessible
                                        ? "text-slate-800"
                                        : "text-slate-400"
                                  }`}
                                >
                                  {step.label}
                                  {isCurrentStep && (
                                    <span className="ml-2 text-[10px] font-bold bg-[#0093b4]/10 text-[#0093b4] px-1.5 py-0.5 rounded">
                                      現在
                                    </span>
                                  )}
                                </p>
                                <p
                                  className={`text-xs ${
                                    accessible
                                      ? "text-slate-500"
                                      : "text-slate-400"
                                  }`}
                                >
                                  {accessible
                                    ? step.description
                                    : "まだアクセスできません"}
                                </p>
                              </div>
                            </button>
                          );
                        })}
                    </div>
                  </div>
                )}

                {/* HOW Section */}
                {cycleSteps.some((s) => s.section === "how") && (
                  <div>
                    <h4 className="text-sm font-bold text-slate-600 mb-2 px-2">
                      HOW（どう伝えるか）
                    </h4>
                    <div className="space-y-1">
                      {cycleSteps
                        .filter((s) => s.section === "how")
                        .map((step) => {
                          const accessible = isStepAccessible(step);
                          const isCurrentStep = step.id === cycleCurrentStep;
                          return (
                            <button
                              key={step.id}
                              onClick={() =>
                                accessible && handleStepSelect(step)
                              }
                              disabled={!accessible || navigating}
                              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors text-left group ${
                                isCurrentStep
                                  ? "bg-emerald-500/5 ring-1 ring-emerald-500/20"
                                  : accessible
                                    ? "hover:bg-slate-50 cursor-pointer"
                                    : "opacity-50 cursor-not-allowed bg-slate-50/50"
                              }`}
                            >
                              <div
                                className={`flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${
                                  isCurrentStep
                                    ? "bg-emerald-500 text-white"
                                    : accessible
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
                                  className={`text-sm font-medium ${
                                    isCurrentStep
                                      ? "text-emerald-600"
                                      : accessible
                                        ? "text-slate-800"
                                        : "text-slate-400"
                                  }`}
                                >
                                  {step.label}
                                  {isCurrentStep && (
                                    <span className="ml-2 text-[10px] font-bold bg-emerald-500/10 text-emerald-600 px-1.5 py-0.5 rounded">
                                      現在
                                    </span>
                                  )}
                                </p>
                                <p
                                  className={`text-xs ${
                                    accessible
                                      ? "text-slate-500"
                                      : "text-slate-400"
                                  }`}
                                >
                                  {accessible
                                    ? step.description
                                    : "まだアクセスできません"}
                                </p>
                              </div>
                            </button>
                          );
                        })}
                    </div>
                  </div>
                )}
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
