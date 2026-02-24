"use client";
import React, { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { usePlannningContext } from "../plannningContext";
import {
  ChevronDown,
  Check,
  Lock,
  ArrowLeft,
  User,
  LogOut,
  Settings,
} from "lucide-react";

type StepStatus = "done" | "active" | "locked" | "visited";

interface Step {
  id: number;
  label: string;
  status: StepStatus;
  pageType: "what" | "how" | "generation";
  stepInPage: number;
}

export function FlowHeader() {
  const router = useRouter();
  const { sessionId } = useParams();
  const { step, page, whatType, onStep, onChangePage, onChangePageAndStep } =
    usePlannningContext();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);

  // Track the maximum step reached for each page
  const getMaxStepReached = (pageType: string): number => {
    if (typeof window === "undefined") return 1;
    const key = `max_step_reached_${pageType}`;
    const stored = localStorage.getItem(key);
    return stored ? parseInt(stored, 10) : 1;
  };

  const setMaxStepReached = (pageType: string, stepNum: number) => {
    if (typeof window === "undefined") return;
    const key = `max_step_reached_${pageType}`;
    const current = getMaxStepReached(pageType);
    if (stepNum > current) {
      localStorage.setItem(key, String(stepNum));
    }
  };

  // Update max step when current step changes
  useEffect(() => {
    const currentPageType = page.startsWith("what") ? "what" : page;
    setMaxStepReached(currentPageType, step);
  }, [step, page]);

  // Get effective whatType from localStorage as fallback (speed mode removed)
  const getEffectiveWhatType = (): "scratch" | "skip" => {
    if (whatType === "scratch" || whatType === "skip") return whatType;
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("planning_what_type");
      if (stored === "scratch" || stored === "skip") {
        return stored;
      }
      // Migrate speed to scratch
      if (stored === "speed") {
        localStorage.setItem("planning_what_type", "scratch");
        return "scratch";
      }
    }
    return "scratch"; // default
  };

  // Define all steps based on the flow
  const getSteps = (): Step[] => {
    const effectiveWhatType = getEffectiveWhatType();
    const whatSteps =
      effectiveWhatType === "scratch"
        ? [
            {
              id: 1,
              label: "自社LP URL入力",
              pageType: "what" as const,
              stepInPage: 1,
            },
            {
              id: 2,
              label: "キーワード選択",
              pageType: "what" as const,
              stepInPage: 2,
            },
            {
              id: 3,
              label: "競合キービジュアル選択",
              pageType: "what" as const,
              stepInPage: 3,
            },
            {
              id: 4,
              label: "ベンチマークマトリクス",
              pageType: "what" as const,
              stepInPage: 4,
            },
            {
              id: 5,
              label: "価値整理",
              pageType: "what" as const,
              stepInPage: 5,
            },
            {
              id: 6,
              label: "根源欲求整理",
              pageType: "what" as const,
              stepInPage: 6,
            },
            {
              id: 7,
              label: "ポジショニング骨子選択",
              pageType: "what" as const,
              stepInPage: 7,
            },
          ]
        : effectiveWhatType === "skip"
          ? [
              {
                id: 1,
                label: "URL・競合入力",
                pageType: "what" as const,
                stepInPage: 1,
              },
              {
                id: 2,
                label: "ベンチマークマトリクス",
                pageType: "what" as const,
                stepInPage: 2,
              },
            ]
          : [
              // Speed mode removed - default to scratch steps
              {
                id: 1,
                label: "自社LP URL入力",
                pageType: "what" as const,
                stepInPage: 1,
              },
            ];

    const howSteps = [
      {
        id: 1,
        label: "動画尺・語り方選択",
        pageType: "how" as const,
        stepInPage: 1,
      },
      {
        id: 2,
        label: "メッセージ選択",
        pageType: "how" as const,
        stepInPage: 2,
      },
      {
        id: 3,
        label: "バリエーション選択",
        pageType: "how" as const,
        stepInPage: 3,
      },
      {
        id: 4,
        label: "ロゴ・音楽設定",
        pageType: "how" as const,
        stepInPage: 4,
      },
    ];

    const generationSteps = [
      {
        id: 1,
        label: "動画生成",
        pageType: "generation" as const,
        stepInPage: 1,
      },
    ];

    // Calculate current position
    const isWhatPage = page.startsWith("what");
    const isHowPage = page === "how";
    const isGenerationPage = page === "generation";

    // Get max steps reached for each page type
    const whatMaxReached = getMaxStepReached("what");
    const howMaxReached = getMaxStepReached("how");
    const generationMaxReached = getMaxStepReached("generation");

    // Determine step status:
    // - "done": completed and before current step
    // - "active": current step
    // - "visited": previously visited but after current step (still clickable)
    // - "locked": never visited
    const whatStepsWithStatus: Step[] = whatSteps.map((s, idx) => {
      const stepNum = idx + 1;
      let status: StepStatus;

      if (isWhatPage) {
        if (stepNum < step) {
          status = "done";
        } else if (stepNum === step) {
          status = "active";
        } else if (stepNum <= whatMaxReached) {
          // Previously visited step - make it clickable
          status = "visited";
        } else {
          status = "locked";
        }
      } else if (isHowPage || isGenerationPage) {
        // All what steps are done when on how/generation page
        status = "done";
      } else {
        status = "locked";
      }

      return { ...s, status };
    });

    const howStepsWithStatus: Step[] = howSteps.map((s, idx) => {
      const stepNum = idx + 1;
      let status: StepStatus;

      if (isHowPage) {
        if (stepNum < step) {
          status = "done";
        } else if (stepNum === step) {
          status = "active";
        } else if (stepNum <= howMaxReached) {
          // Previously visited step - make it clickable
          status = "visited";
        } else {
          status = "locked";
        }
      } else if (isGenerationPage) {
        // All how steps are done when on generation page
        status = "done";
      } else {
        status = "locked";
      }

      return {
        ...s,
        id: whatSteps.length + idx + 1,
        status,
      };
    });

    const generationStepsWithStatus: Step[] = generationSteps.map((s, idx) => ({
      ...s,
      id: whatSteps.length + howSteps.length + idx + 1,
      status: isGenerationPage ? "active" : "locked",
    }));

    return [
      ...whatStepsWithStatus,
      ...howStepsWithStatus,
      ...generationStepsWithStatus,
    ];
  };

  const steps = getSteps();
  const currentStepIndex = steps.findIndex((s) => s.status === "active");
  const totalSteps = steps.length;
  // Count both done and visited as completed for progress display
  const completedSteps = steps.filter(
    (s) => s.status === "done" || s.status === "visited",
  ).length;

  const handleStepClick = (stepItem: Step) => {
    // Allow clicking on done, active, or visited steps - only block locked
    if (stepItem.status === "locked") return;

    // Determine the target page
    const effectiveWhatType = getEffectiveWhatType();
    const targetPage =
      stepItem.pageType === "what"
        ? `what_${effectiveWhatType}`
        : stepItem.pageType;

    const currentPageType = page.startsWith("what") ? "what" : page;
    const targetPageType = stepItem.pageType;

    if (currentPageType !== targetPageType) {
      // Different page - use coordinated navigation
      onChangePageAndStep(targetPage, stepItem.stepInPage);
      router.push(
        `/app-v2/planning/${sessionId}/${stepItem.pageType === "what" ? "what" : stepItem.pageType}`,
      );
    } else {
      // Same page - just set the step
      onStep(stepItem.stepInPage);
    }

    setIsDropdownOpen(false);
  };

  // Get the whatType from localStorage as fallback since context might reset (speed mode removed)
  const getWhatStepCount = () => {
    // Try to get whatType from localStorage as fallback
    let storedWhatType =
      typeof window !== "undefined"
        ? localStorage.getItem("planning_what_type") || whatType
        : whatType;

    // Migrate speed to scratch
    if (storedWhatType === "speed") {
      storedWhatType = "scratch";
    }

    if (storedWhatType === "scratch") return 7;
    if (storedWhatType === "skip") return 2;
    return 7; // default to scratch steps
  };

  // Calculate the current step number consistently across all pages
  const getCurrentStepNumber = () => {
    const whatStepCount = getWhatStepCount();
    const isWhatPage = page.startsWith("what");
    const isHowPage = page === "how";

    if (isWhatPage) {
      return step;
    } else if (isHowPage) {
      // Continue from where /what left off
      return whatStepCount + step;
    } else {
      // generation page - after all how steps
      return whatStepCount + 4 + 1;
    }
  };

  return (
    <header className="sticky top-0 z-50 flex items-center justify-between whitespace-nowrap border-b border-solid border-gray-200 bg-white px-6 md:px-10 py-4">
      {/* Left: Back Button + Project Name */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => router.push("/dashboard")}
          className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
        >
          <ArrowLeft className="h-5 w-5 text-gray-600" />
        </button>
        <span className="text-base font-semibold text-gray-800">
          ホーム画面に戻る
        </span>
      </div>

      {/* Center: Step Progress Dropdown */}
      <div className="relative flex items-center gap-3">
        <span className="text-sm font-semibold text-black">
          ステップ進行状況:
        </span>
        <button
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="flex items-center gap-3 px-5 py-2.5 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 transition-colors shadow-sm"
        >
          <span className="text-sm font-semibold text-gray-700">
            {getCurrentStepNumber()}/{totalSteps}
          </span>
          <span className="text-gray-300">|</span>
          <span className="text-sm font-semibold text-gray-700">
            {steps[currentStepIndex]?.label ?? ""}
          </span>
          <ChevronDown
            className={`h-4 w-4 text-gray-500 transition-transform ${isDropdownOpen ? "rotate-180" : ""}`}
          />
        </button>

        {/* Dropdown */}
        {isDropdownOpen && (
          <>
            {/* Backdrop */}
            <div
              className="fixed inset-0 z-40"
              onClick={() => setIsDropdownOpen(false)}
            />

            {/* Dropdown Content */}
            <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[360px] bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden z-50">
              {/* Header */}
              <div className="p-4 border-b border-gray-100 flex justify-between items-center">
                <h3 className="font-bold text-base text-gray-800">
                  ステップ進行状況
                </h3>
                <span className="text-xs bg-cyan-50 text-cyan-600 px-2 py-1 rounded font-medium">
                  進行中
                </span>
              </div>

              {/* Steps List */}
              <div className="max-h-[400px] overflow-y-auto">
                {steps.map((stepItem, index) => (
                  <div
                    key={`${stepItem.pageType}-${stepItem.stepInPage}`}
                    onClick={() => handleStepClick(stepItem)}
                    className={`flex items-center gap-4 px-4 py-3 border-b border-gray-50 transition-colors ${
                      stepItem.status === "active"
                        ? "bg-cyan-50/50 border-l-4 border-l-cyan-500"
                        : stepItem.status === "visited"
                          ? "bg-blue-50/30 border-l-4 border-l-blue-300"
                          : ""
                    } ${stepItem.status === "locked" ? "opacity-60 cursor-not-allowed" : "cursor-pointer hover:bg-gray-50"}`}
                  >
                    {/* Step Indicator */}
                    <div
                      className={`flex items-center justify-center rounded-full shrink-0 w-6 h-6 ${
                        stepItem.status === "done"
                          ? "bg-green-500 text-white"
                          : stepItem.status === "active"
                            ? "bg-cyan-500 text-white"
                            : stepItem.status === "visited"
                              ? "bg-blue-400 text-white"
                              : "bg-gray-100 text-gray-400"
                      }`}
                    >
                      {stepItem.status === "done" ? (
                        <Check className="h-3 w-3" />
                      ) : stepItem.status === "visited" ? (
                        <Check className="h-3 w-3" />
                      ) : stepItem.status === "locked" ? (
                        <Lock className="h-3 w-3" />
                      ) : (
                        <span className="text-[10px] font-bold">
                          {index + 1}
                        </span>
                      )}
                    </div>

                    {/* Step Label */}
                    <p
                      className={`text-sm flex-1 ${
                        stepItem.status === "done"
                          ? "text-gray-500 line-through"
                          : stepItem.status === "active"
                            ? "font-bold text-gray-800"
                            : stepItem.status === "visited"
                              ? "text-blue-600"
                              : "text-gray-500"
                      }`}
                    >
                      {index + 1}. {stepItem.label}
                    </p>

                    {/* Active Indicator */}
                    {stepItem.status === "active" && (
                      <div className="w-2 h-2 bg-cyan-500 rounded-full animate-pulse" />
                    )}
                    {/* Visited Indicator - shows data is available */}
                    {stepItem.status === "visited" && (
                      <span className="text-xs text-blue-500 font-medium">
                        表示可
                      </span>
                    )}
                  </div>
                ))}
              </div>

              {/* Footer - just showing remaining steps */}
              <div className="p-4 bg-gray-50 border-t border-gray-100">
                <p className="text-xs text-gray-500 font-medium text-center">
                  残り {Math.max(0, totalSteps - completedSteps - 1)} ステップ
                </p>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Right: User Avatar Dropdown */}
      <div className="relative">
        <button
          onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
          className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 transition-colors"
        >
          <div className="w-8 h-8 rounded-full bg-[#0093b4] flex items-center justify-center">
            <User className="h-4 w-4 text-white" />
          </div>
          <ChevronDown
            className={`h-4 w-4 text-gray-500 transition-transform ${isUserDropdownOpen ? "rotate-180" : ""}`}
          />
        </button>

        {/* User Dropdown */}
        {isUserDropdownOpen && (
          <>
            <div
              className="fixed inset-0 z-40"
              onClick={() => setIsUserDropdownOpen(false)}
            />
            <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-100 overflow-hidden z-50">
              <div className="p-3 border-b border-gray-100">
                <p className="text-sm font-medium text-gray-800">ユーザー</p>
                <p className="text-xs text-gray-500">user@example.com</p>
              </div>
              <div className="py-1">
                <button className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                  <Settings className="h-4 w-4" />
                  設定
                </button>
                <button className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-gray-50 transition-colors">
                  <LogOut className="h-4 w-4" />
                  ログアウト
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </header>
  );
}
