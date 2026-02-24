"use client";
import React, { useEffect, useState } from "react";
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
import callApi from "@/config/axios/axios";

type StepStatus = "done" | "active" | "locked";

interface Step {
  id: number;
  label: string;
  status: StepStatus;
}

export function FlowHeader() {
  const router = useRouter();
  const { sessionId } = useParams();
  const { step, whatType, onDbStep } = usePlannningContext();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [projectName, setProjectName] = useState("プロジェクト名");
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");

  // Define all steps based on whatType - matching page.tsx structure exactly
  const getSteps = (): Step[] => {
    const scratchSteps = [
      { id: 1, label: "コピー作成モード選択" },
      { id: 2, label: "分析選択" },
      { id: 3, label: "自社LP URL入力" },
      { id: 4, label: "ベンチマーク選択" },
      { id: 5, label: "分析素材の確認" },
      { id: 6, label: "価値整理" },
      { id: 7, label: "ニーズ整理" },
      { id: 8, label: "ポジショニング骨子選択" },
      { id: 9, label: "動画尺・語り方選択" },
      { id: 10, label: "メッセージ選択" },
      { id: 11, label: "画像・クリエイティブ確認" },
      { id: 12, label: "その他設定" },
      { id: 13, label: "動画生成" },
    ];

    const skipSteps = [
      { id: 1, label: "コピー作成モード選択" },
      { id: 2, label: "分析選択" },
      { id: 3, label: "URL・競合入力" },
      { id: 4, label: "分析素材の確認" },
      { id: 5, label: "価値整理" },
      { id: 6, label: "ニーズ整理" },
      { id: 7, label: "ポジショニング骨子選択" },
      { id: 8, label: "動画尺・語り方選択" },
      { id: 9, label: "メッセージ選択" },
      { id: 10, label: "画像・クリエイティブ確認" },
      { id: 11, label: "その他設定" },
      { id: 12, label: "動画生成" },
    ];

    const speedSteps = [
      { id: 1, label: "コピー作成モード選択" },
      { id: 2, label: "自社LP URL入力" },
      { id: 3, label: "動画尺・語り方選択" },
      { id: 4, label: "メッセージ選択" },
      { id: 5, label: "画像・クリエイティブ確認" },
      { id: 6, label: "その他設定" },
      { id: 7, label: "動画生成" },
    ];

    const baseSteps =
      whatType === "scratch"
        ? scratchSteps
        : whatType === "skip"
          ? skipSteps
          : speedSteps;

    // Add status based on current step
    return baseSteps.map((s) => {
      let status: StepStatus;
      if (s.id < step) {
        status = "done";
      } else if (s.id === step) {
        status = "active";
      } else {
        status = "locked";
      }
      return { ...s, status };
    });
  };

  const getProjectName = async () => {
    try {
      const { data } = await callApi.get(
        `/app-v3/projects/session/project-name`,
        {
          params: {
            sessionId: sessionId,
          },
        },
      );

      if (data && data.projectName) {
        setProjectName(data.projectName);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getUserInfo = async () => {
    try {
      const { data } = await callApi.get("/user");
      if (data?.user) {
        setUserName(data.user.name || "");
        setUserEmail(data.user.email || "");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProjectName();
    getUserInfo();
  }, []);

  const steps = getSteps();
  const totalSteps = steps.length;
  const completedSteps = steps.filter((s) => s.status === "done").length;
  const currentStepLabel = steps.find((s) => s.id === step)?.label || "";

  const handleStepClick = (stepItem: Step) => {
    // Only allow clicking on done or active steps
    if (stepItem.status === "locked") return;

    // Navigate to the step using onDbStep
    onDbStep(stepItem.id, sessionId as string);
    setIsDropdownOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 flex items-center justify-between whitespace-nowrap border-b border-solid border-gray-200 bg-white px-6 md:px-10 py-4">
      {/* Left: Back Button + Project Name */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => router.back()}
          className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
        >
          <ArrowLeft className="h-5 w-5 text-gray-600" />
        </button>
        <span className="text-base font-semibold text-gray-800">
          {projectName}
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
            {step}/{totalSteps}
          </span>
          <span className="text-gray-300">|</span>
          <span className="text-sm font-semibold text-gray-700">
            {currentStepLabel}
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
                {steps.map((stepItem) => (
                  <div
                    key={stepItem.id}
                    onClick={() => handleStepClick(stepItem)}
                    className={`flex items-center gap-4 px-4 py-3 border-b border-gray-50 transition-colors ${
                      stepItem.status === "active"
                        ? "bg-cyan-50/50 border-l-4 border-l-cyan-500"
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
                            : "bg-gray-100 text-gray-400"
                      }`}
                    >
                      {stepItem.status === "done" ? (
                        <Check className="h-3 w-3" />
                      ) : stepItem.status === "locked" ? (
                        <Lock className="h-3 w-3" />
                      ) : (
                        <span className="text-[10px] font-bold">
                          {stepItem.id}
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
                            : "text-gray-500"
                      }`}
                    >
                      {stepItem.id}. {stepItem.label}
                    </p>

                    {/* Active Indicator */}
                    {stepItem.status === "active" && (
                      <div className="w-2 h-2 bg-cyan-500 rounded-full animate-pulse" />
                    )}
                  </div>
                ))}
              </div>

              {/* Footer */}
              <div className="p-4 bg-gray-50 border-t border-gray-100">
                <p className="text-xs text-gray-500 font-medium text-center">
                  残り {totalSteps - step} ステップ
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
            {userName || userEmail ? (
              <span className="text-sm font-bold text-white">
                {(userName || userEmail).charAt(0).toUpperCase()}
              </span>
            ) : (
              <User className="h-4 w-4 text-white" />
            )}
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
                <p className="text-sm font-medium text-gray-800">{userName || "ユーザー"}</p>
                <p className="text-xs text-gray-500">{userEmail || ""}</p>
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
