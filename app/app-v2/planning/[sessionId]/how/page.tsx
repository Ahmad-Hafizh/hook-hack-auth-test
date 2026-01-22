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
  const { step, onStep, onChangePage } = usePlannningContext();

  const stepList = [
    {
      id: 1,
      page: <Step1New onNext={() => onStep(2)} />,
    },
    {
      id: 2,
      page: <Step2New onNext={() => onStep(3)} />,
    },
    {
      id: 3,
      page: <Step3New onNext={() => onStep(4)} />,
    },
    {
      id: 4,
      page: <Step4New />,
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
