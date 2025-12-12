'use client';
import React, { useEffect } from 'react';
import Step3 from './scracth/step3';
import Step4 from './scracth/step4';
import Step1Scratch from './scracth/step1';
import Step2Scratch from './scracth/step2';
import Step1Skip from './skip/step1';
import Step2Skip from './skip/step2';
import { useStepData } from './hooks/useStepData';
import TopHorizontalProgress from './components/topHorizontalProgress';
import { usePlannningWhatContext } from './hooks/plannningWhatContext';
import { usePlanningWhatDataContext } from './hooks/planningWhatDataContext';

const AppPage = () => {
  const { onSetKeywords, keywords, websites, onSetWebsites, briefPlanning, setBriefPlanning, selectedKeywords, setSelectedKeywords } = useStepData();
  const { step, onStep, page } = usePlannningWhatContext();
  const { keyVisuals, onSetKeyVisuals } = usePlanningWhatDataContext();

  const pages = {
    scratch: {
      id: 'scratch',
      steps: [
        {
          id: 1,
          page: <Step1Scratch onNext={() => onStep(2)} onSetKeywords={onSetKeywords} />,
        },
        {
          id: 2,
          page: <Step2Scratch onNext={() => onStep(3)} keywords={keywords} selectedKeywords={selectedKeywords} setSelectedKeywords={setSelectedKeywords} onSetKeyVisuals={onSetKeyVisuals} />,
        },
        {
          id: 3,
          page: <Step3 onNext={() => onStep(4)} onPrev={() => onStep(2)} setBriefPlanning={setBriefPlanning} selectedKeywords={selectedKeywords} keyVisuals={keyVisuals} onSetKeyVisuals={onSetKeyVisuals} />,
        },
        {
          id: 4,
          page: <Step4 briefPlanning={briefPlanning} />,
        },
      ],
    },
    skip: {
      id: 'skip',
      steps: [
        {
          id: 1,
          page: <Step1Skip onNext={() => onStep(2)} setBriefPlanning={setBriefPlanning} />,
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
      {(page == 'scratch' || page == 'skip') && (
        <>
          <TopHorizontalProgress pageStep={pages[page].steps.length} step={step} />

          {/* Current Step Content */}
          {pages[page].steps[step - 1]?.page}
        </>
      )}
    </div>
  );
};

export default AppPage;
