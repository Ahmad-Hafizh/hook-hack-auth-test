'use client';
import React, { useState } from 'react';
import Step3 from './scracth/step3';
import Step4 from './scracth/step4';
import SwitchPage from './switch';
import { Progress } from '@/components/ui/progress';
import Step1Scratch from './scracth/step1';
import Step2Scratch from './scracth/step2';
import Step1Skip from './skip/step1';
import Step2Skip from './skip/step2';

const AppPage = () => {
  const [page, setPage] = useState('switch');
  const [step, setStep] = React.useState(1);

  const onStep = (step: number) => {
    setStep(step);
  };

  const onChangePage = (page: string) => {
    setPage(page);
  };

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
          page: <Step1Scratch onNext={() => onStep(2)} />,
        },
        {
          id: 2,
          page: <Step2Scratch onNext={() => onStep(3)} />,
        },
        {
          id: 3,
          page: <Step3 onNext={() => onStep(4)} onPrev={() => onStep(2)} />,
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
    <div className="h-full w-full py-10">
      {page == 'switch' && pages.switch.page}
      {(page == 'scratch' || page == 'skip') && (
        <div className="h-full">
          <Progress value={(step / pages[page].steps.length) * 100} className={`w-[400px] mx-auto  ${step === 0 ? 'hidden' : ''}`} />
          {pages[page].steps[step - 1].page}
        </div>
      )}
    </div>
  );
};

export default AppPage;
