'use client';
import React from 'react';
import Step1 from './steps/step1';
import TopHorizontalProgress from '../what/components/topHorizontalProgress';
import Step2 from './steps/step2';
import Step3 from './steps/step3';
import Step4 from './steps/step4';
import { useStep } from '../hooks/useStep';

const PlanningHowPage = () => {
  const { step, onStep } = useStep(4);

  const stepList = [
    {
      id: 1,
      page: <Step1 onNext={() => onStep(2)} />,
    },
    {
      id: 2,
      page: <Step2 onNext={() => onStep(3)} />,
    },
    {
      id: 3,
      page: <Step3 onNext={() => onStep(4)} />,
    },
    {
      id: 4,
      page: <Step4 />,
    },
  ];

  return (
    <div className="h-full w-full py-10 flex flex-col items-center">
      <TopHorizontalProgress pageStep={stepList} step={step} />
      {stepList[step - 1].page}
    </div>
  );
};

export default PlanningHowPage;
