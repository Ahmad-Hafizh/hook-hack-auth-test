'use client';
import React from 'react';
import Step3 from './scracth/step3';
import Step4 from './scracth/step4';
import SwitchPage from './switch';
import Step1Scratch from './scracth/step1';
import Step2Scratch from './scracth/step2';
import Step1Skip from './skip/step1';
import Step2Skip from './skip/step2';
import { usePage } from './hooks/usePage';
import { useStepData } from './hooks/useStepData';
import TopHorizontalProgress from './components/topHorizontalProgress';
import { useStep } from '../hooks/useStep';

const AppPage = () => {
  const { page, onChangePage } = usePage();
  const { step, onStep } = useStep(page == 'scratch' ? 4 : page == 'skip' ? 2 : 0, page);
  const { onSetKeywords, keywords, websites, onSetWebsites, onSetSuggestions, onSetCompetitorStrategy, suggestions, competitorStrategy } = useStepData();

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
          page: <Step3 onNext={() => onStep(4)} onPrev={() => onStep(2)} websites={websites} onSetWebsites={onSetWebsites} onSetSuggestions={onSetSuggestions} onSetCompetitorStrategy={onSetCompetitorStrategy} keywords={keywords} />,
        },
        {
          id: 4,
          page: <Step4 suggestions={suggestions} competitorStrategy={competitorStrategy} />,
        },
      ],
    },
    skip: {
      id: 'skip',
      steps: [
        {
          id: 1,
          page: <Step1Skip onNext={() => onStep(2)} onSetSuggestions={onSetSuggestions} onSetCompetitorStrategy={onSetCompetitorStrategy} />,
        },
        {
          id: 2,
          page: <Step2Skip onNext={() => onStep(1)} suggestions={suggestions} competitorStrategy={competitorStrategy} />,
        },
      ],
    },
  };

  return (
    <div className="h-full w-full py-10 flex flex-col items-center">
      {page == 'switch' && pages.switch.page}
      {(page == 'scratch' || page == 'skip') && (
        <>
          <TopHorizontalProgress pageStep={pages[page].steps} step={step} />

          {/* Current Step Content */}
          {pages[page].steps[step - 1]?.page}
        </>
      )}
    </div>
  );
};

export default AppPage;
