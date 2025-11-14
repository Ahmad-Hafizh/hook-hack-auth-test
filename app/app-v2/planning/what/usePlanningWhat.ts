import { useState } from 'react';

export const usePlanningWhat = () => {
  const [page, setPage] = useState<'switch' | 'scratch' | 'skip'>('switch');
  const [step, setStep] = useState(1);

  // onStep / onChangePage etc.
  const onStep = (step: number) => {
    setStep(step);
  };

  const onChangePage = (page: string) => {
    setPage(page as 'switch' | 'scratch' | 'skip');
  };

  return { page, step, onStep, onChangePage };
};
