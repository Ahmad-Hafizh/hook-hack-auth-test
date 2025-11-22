'use client';
import React from 'react';
import Step1 from './steps/step1';
import TopHorizontalProgress from '../what/components/topHorizontalProgress';
import Step2 from './steps/step2';
import Step3 from './steps/step3';
import Step4 from './steps/step4';
import { useStep } from '../hooks/useStep';
import { useStepData } from './hooks/useStepData';

const PlanningHowPage = () => {
  const { step, onStep } = useStep(4);
  const { plan, elements, onSetElements, onSetPlan, onSetVariants, variants, patternCount, setPatternCount, patternCombinations, setPatternCombinations } = useStepData();

  const stepList = [
    {
      id: 1,
      page: <Step1 onNext={() => onStep(2)} onSetPlan={onSetPlan} />,
    },
    {
      id: 2,
      page: <Step2 onNext={() => onStep(3)} />,
    },
    {
      id: 3,
      page: (
        <Step3
          onNext={() => onStep(4)}
          plan={plan}
          elements={elements}
          onSetElements={onSetElements}
          onSetVariants={onSetVariants}
          variants={variants}
          patternCount={patternCount}
          setPatternCount={setPatternCount}
          patternCombinations={patternCombinations}
          setPatternCombinations={setPatternCombinations}
        />
      ),
    },
    {
      id: 4,
      page: <Step4 onNext={() => onStep(5)} patternCombinations={patternCombinations} setPatternCombinations={setPatternCombinations} />,
    },
  ];

  return (
    <div className="h-full w-full py-10 flex flex-col items-center">
      <TopHorizontalProgress pageStep={stepList.length} step={step} />
      {stepList[step - 1].page}
    </div>
  );
};

export default PlanningHowPage;
