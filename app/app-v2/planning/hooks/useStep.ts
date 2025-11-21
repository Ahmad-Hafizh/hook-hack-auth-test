import { useState, useEffect } from 'react';

export const useStep = (currentMaxSteps: number, page?: string) => {
  const [step, setStep] = useState(1);

  // Reset to step 1 when page changes
  useEffect(() => {
    setStep(1);
  }, [page]);

  // onStep with bounds checking
  const onStep = (newStep: number) => {
    if (newStep >= 1 && newStep <= currentMaxSteps) {
      setStep(newStep);
    }
  };

  return { step, onStep };
};
