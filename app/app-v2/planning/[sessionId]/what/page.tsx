"use client";
import React, { useEffect } from "react";
import Step3 from "./scracth/step3";
import Step4 from "./scracth/step4";
import Step1Scratch from "./scracth/step1";
import Step2Scratch from "./scracth/step2";
import Step1Skip from "./skip/step1";
import Step2Skip from "./skip/step2";
import TopHorizontalProgress from "./components/topHorizontalProgress";
import { usePlannningContext } from "@/app/app-v2/plannningContext";
import Step5 from "./scracth/step5";
import Step6 from "./scracth/step6";
import Step7 from "./scracth/step7";
import { usePlanningWhatDataContext } from "./hooks/planningWhatDataContext";

const AppPage = () => {
  const { step, onStep, page, whatType } = usePlannningContext();
  const { onSetCompetitiveMatrix } = usePlanningWhatDataContext();

  // Get effective whatType with localStorage fallback (speed mode removed)
  const getEffectiveWhatType = (): "scratch" | "skip" => {
    // Speed mode is removed - default to scratch
    if (whatType === "scratch" || whatType === "skip") return whatType;
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("planning_what_type");
      if (stored === "scratch" || stored === "skip") {
        return stored;
      }
      // If localStorage has "speed", treat it as "scratch"
      if (stored === "speed") {
        localStorage.setItem("planning_what_type", "scratch");
        return "scratch";
      }
    }
    return "scratch"; // default
  };

  const effectiveWhatType = getEffectiveWhatType();

  const pages = {
    scratch: {
      id: "scratch",
      steps: [
        {
          id: 1,
          page: <Step1Scratch onNext={() => onStep(2)} />,
        },
        {
          id: 2,
          page: (
            <Step2Scratch onNext={() => onStep(3)} onPrev={() => onStep(1)} />
          ),
        },
        {
          id: 3,
          page: <Step3 onNext={() => onStep(4)} onPrev={() => onStep(2)} />,
        },
        {
          id: 4,
          page: <Step4 onNext={() => onStep(5)} onPrev={() => onStep(3)} />,
        },
        {
          id: 5,
          page: <Step5 onNext={() => onStep(6)} onPrev={() => onStep(4)} />,
        },
        {
          id: 6,
          page: <Step6 onNext={() => onStep(7)} onPrev={() => onStep(5)} />,
        },
        {
          id: 7,
          page: <Step7 onPrev={() => onStep(6)} />,
        },
      ],
    },
    skip: {
      id: "skip",
      steps: [
        {
          id: 1,
          page: <Step1Skip onNext={() => onStep(2)} />,
        },
        {
          id: 2,
          page: <Step2Skip onPrev={() => onStep(1)} />,
        },
      ],
    },
  };

  const pagePositionIndex =
    page === "what_scratch" || page === "what_skip"
      ? 0
      : page === "how"
        ? 1
        : 2;

  const pagesList = [
    {
      page: "what",
      japanesePage: "企画​（訴求​内容）​",
      steps:
        page == "what_skip"
          ? [
              "input product name or url & competitors urls",
              "competitor matrix",
              "organize value",
              "organize core desire",
              "positioning spine",
            ]
          : [
              "input product name or url",
              "select keyword",
              "select competitors key visuals",
              "competitor matrix",
              "organize value",
              "organize core desire",
              "positioning spine",
            ],
    },
    {
      page: "how",
      japanesePage: "企画​（訴求​方法）​",
      steps: [
        "select video duration",
        "select video style",
        "select videos variants",
        "input logo & select music style",
      ],
    },
    {
      page: "generation",
      japanesePage: "動画生成",
      steps: [],
    },
  ];

  return (
    <div className="h-full w-full py-10 flex flex-col items-center">
      {/* Render content based on effectiveWhatType - with localStorage fallback */}
      {pages[effectiveWhatType]?.steps[step - 1]?.page}
    </div>
  );
};

export default AppPage;
