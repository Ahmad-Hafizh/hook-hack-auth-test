import { useState } from 'react';

export const usePlanningWhat = () => {
  const [page, setPage] = useState<'switch' | 'scratch' | 'skip'>('switch');
  const [step, setStep] = useState(1);

  const maxSteps = {
    scratch: 4,
    skip: 2,
    switch: 0
  };

  // onStep with bounds checking
  const onStep = (newStep: number) => {
    const currentMaxSteps = maxSteps[page];
    if (newStep >= 1 && newStep <= currentMaxSteps) {
      setStep(newStep);
    }
  };

  const onChangePage = (newPage: string) => {
    const typedPage = newPage as 'switch' | 'scratch' | 'skip';
    setPage(typedPage);
    // Reset step to 1 when changing pages
    if (typedPage !== 'switch') {
      setStep(1);
    }
  };

  return { page, step, onStep, onChangePage, maxSteps };
};
