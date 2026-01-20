"use client";
import React from "react";
import Step1 from "./steps/step1";
import TopHorizontalProgress from "../what/components/topHorizontalProgress";
import Step2 from "./steps/step2";
import Step3 from "./steps/step3";
import Step4 from "./steps/step4";
import { DataContextProvider } from "./hooks/useDataContext";
import { useParams, useRouter } from "next/navigation";
import { usePlannningContext } from "@/app/app-v2/plannningContext";

import DeliverySettingsPreview from "@/components/lp-analyzer/delivery-settings-preview";
import Step1New from "./steps/step1new";
import { Step2New } from "./steps/step2new";
import { Step3New } from "./steps/step3new";
import Step4New from "./steps/step4new";

const PlanningHowPage = () => {
  const { step, onStep, onChangePage } = usePlannningContext();
  const router = useRouter();
  const { sessionId } = useParams();

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
        {/* <TopHorizontalProgress pageStep={stepList.length} step={step} /> */}
        {stepList[step - 1].page}
      </div>
    </DataContextProvider>
  );
};

export default PlanningHowPage;
