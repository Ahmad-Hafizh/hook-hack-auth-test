"use client";
import React, { useEffect } from "react";
import Step3 from "./scracth/step3";
import Step4 from "./scracth/step4";
import Step1Scratch from "./scracth/step1";
import Step2Scratch from "./scracth/step2";
import Step1Skip from "./skip/step1";
import Step2Skip from "./skip/step2";
import TopHorizontalProgress from "./components/topHorizontalProgress";
import { usePlanningWhatDataContext } from "./hooks/planningWhatDataContext";
import { usePlannningContext } from "@/app/app-v2/plannningContext";
import Step5 from "./scracth/step5";
import Step6 from "./scracth/step6";
import Step7 from "./scracth/step7";

const AppPage = () => {
  const { step, onStep, page } = usePlannningContext();
  const {
    keyVisuals,
    onSetKeyVisuals,
    keywords,
    onSetKeywords,
    selectedKeywords,
    onSetSelectedKeywords,
    briefPlanning,
    onSetBriefPlanning,
  } = usePlanningWhatDataContext();
  const currentWhatPage = page.split("_")[1];

  const pages = {
    scratch: {
      id: "scratch",
      steps: [
        {
          id: 1,
          page: (
            <Step1Scratch
              onNext={() => onStep(2)}
              onSetKeywords={onSetKeywords}
            />
          ),
        },
        {
          id: 2,
          page: (
            <Step2Scratch
              onNext={() => onStep(3)}
              keywords={keywords}
              selectedKeywords={selectedKeywords}
              onSetSelectedKeywords={onSetSelectedKeywords}
              onSetKeyVisuals={onSetKeyVisuals}
            />
          ),
        },
        {
          id: 3,
          page: (
            <Step3
              onNext={() => onStep(4)}
              onPrev={() => onStep(2)}
              onSetBriefPlanning={onSetBriefPlanning}
              selectedKeywords={selectedKeywords}
              keyVisuals={keyVisuals}
              onSetKeyVisuals={onSetKeyVisuals}
            />
          ),
        },
        {
          id: 4,
          page: (
            <Step4
              briefPlanning={briefPlanning}
              onNext={() => {
                onStep(5);
              }}
            />
          ),
        },
        {
          id: 5,
          page: <Step5 onNext={() => onStep(6)} />,
        },
        {
          id: 6,
          page: <Step6 onNext={() => onStep(7)} />,
        },
        {
          id: 7,
          page: <Step7 />,
        },
      ],
    },
    skip: {
      id: "skip",
      steps: [
        {
          id: 1,
          page: (
            <Step1Skip
              onNext={() => onStep(2)}
              onSetBriefPlanning={onSetBriefPlanning}
            />
          ),
        },
        {
          id: 2,
          page: <Step2Skip briefPlanning={briefPlanning} />,
        },
      ],
    },
  };

  return (
    <div className="h-full w-full py-10 flex flex-col items-center">
      {(currentWhatPage == "scratch" || currentWhatPage == "skip") && (
        <>
          {/* <TopHorizontalProgress
            pageStep={pages[currentWhatPage].steps.length}
            step={step}
          /> */}

          {/* Current Step Content */}
          {pages[currentWhatPage].steps[step - 1]?.page}
        </>
      )}
    </div>
  );
};

export default AppPage;
