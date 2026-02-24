"use client";
import React from "react";

import { DataContextProvider } from "./hooks/useDataContext";
import { useParams, useRouter } from "next/navigation";
import { usePlannningContext } from "@/app/app-v2/plannningContext";
import Step1New from "./steps/step1new";
import { Step2New } from "./steps/step2new";
import { Step3New } from "./steps/step3new";
import Step4New from "./steps/step4new";

const PlanningHowPage = () => {
  const { step, onStep, onChangePage, onChangePageAndStep, whatType } = usePlannningContext();
  const { sessionId } = useParams();
  const router = useRouter();

  // Get the max step for "what" section based on whatType
  const getWhatMaxStep = () => {
    const effectiveWhatType = whatType || (typeof window !== 'undefined' ? localStorage.getItem("planning_what_type") : "scratch") || "scratch";
    return effectiveWhatType === "scratch" ? 7 : 2;
  };

  // Navigate back to what section (last step)
  const handleBackToWhat = () => {
    const whatMaxStep = getWhatMaxStep();
    const effectiveWhatType = whatType || (typeof window !== 'undefined' ? localStorage.getItem("planning_what_type") : "scratch") || "scratch";
    onChangePageAndStep(`what_${effectiveWhatType}`, whatMaxStep);
    router.push(`/app-v2/planning/${sessionId}/what`);
  };

  const stepList = [
    {
      id: 1,
      page: <Step1New onNext={() => onStep(2)} onBack={handleBackToWhat} />,
    },
    {
      id: 2,
      page: <Step2New onNext={() => onStep(3)} onPrev={() => onStep(1)} />,
    },
    {
      id: 3,
      page: <Step3New onNext={() => onStep(4)} onPrev={() => onStep(2)} />,
    },
    {
      id: 4,
      page: <Step4New onBack={() => onStep(3)} />,
    },
  ];

  return (
    <DataContextProvider>
      <div className="h-full w-full py-10 flex flex-col items-center">
        {stepList[step - 1] ? stepList[step - 1].page : stepList[0].page}
      </div>
    </DataContextProvider>
  );
};

export default PlanningHowPage;
