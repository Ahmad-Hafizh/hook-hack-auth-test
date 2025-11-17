'use client';
import React from 'react';
import Step3 from './scracth/step3';
import Step4 from './scracth/step4';
import SwitchPage from './switch';
import Step1Scratch from './scracth/step1';
import Step2Scratch from './scracth/step2';
import Step1Skip from './skip/step1';
import Step2Skip from './skip/step2';
import { usePlanningWhat } from './usePlanningWhat';
import { useStepDataScracth } from './useStepDataScracth';

const AppPage = () => {
  const { page, step, onStep, onChangePage, maxSteps } = usePlanningWhat();
  const { onSetKeywords, keywords, websites, onSetWebsites } = useStepDataScracth();

  const pages = {
    switch: {
      id: 'switch',
      page: <SwitchPage onScratch={() => onChangePage('scratch')} onSkip={() => onChangePage('skip')} />,
    },
    scratch: {
      id: 'scratch',
      steps: [
        {
          id: 1,
          page: <Step1Scratch onNext={() => onStep(2)} onSetKeywords={onSetKeywords} />,
        },
        {
          id: 2,
          page: <Step2Scratch onNext={() => onStep(3)} keywords={keywords} onSetWebsites={onSetWebsites} />,
        },
        {
          id: 3,
          page: <Step3 onNext={() => onStep(4)} onPrev={() => onStep(2)} websites={websites} />,
        },
        {
          id: 4,
          page: <Step4 onNext={() => onStep(5)} />,
        },
      ],
    },
    skip: {
      id: 'skip',
      steps: [
        {
          id: 1,
          page: <Step1Skip onNext={() => onStep(2)} />,
        },
        {
          id: 2,
          page: <Step2Skip onNext={() => onStep(1)} />,
        },
      ],
    },
  };

  return (
    <div className="h-full w-full py-10 flex flex-col items-center">
      {page == 'switch' && pages.switch.page}
      {(page == 'scratch' || page == 'skip') && (
        <>
          <div className="flex justify-center items-center mb-10 gap-2">
            {pages[page].steps.map((_, i) => {
              const stepNumber = i + 1;
              const isCurrentStep = step === stepNumber;
              const isCompletedStep = step > stepNumber;
              const isUpcomingStep = step < stepNumber;

              return (
                <div className="flex items-center justify-center gap-2" key={i}>
                  <div
                    className={`w-6 h-6 border-2 rounded-full flex items-center justify-center z-10 transition-all duration-200 ${
                      isCurrentStep ? 'bg-cyan-500 border-cyan-500 text-white' : isCompletedStep ? 'bg-rose-500 border-rose-600 text-white' : 'bg-gray-200 border-gray-300 text-gray-400'
                    }`}
                  >
                    <p className="text-xs font-bold">{stepNumber}</p>
                  </div>
                  {i < pages[page].steps.length - 1 && <div className={`h-[3px] w-8 rounded-full transition-all duration-200 ${isCompletedStep ? 'bg-rose-500' : 'bg-gray-300'}`} />}
                </div>
              );
            })}
          </div>

          {/* Current Step Content */}
          {pages[page].steps[step - 1]?.page}
        </>
      )}
    </div>
  );
};

export default AppPage;
