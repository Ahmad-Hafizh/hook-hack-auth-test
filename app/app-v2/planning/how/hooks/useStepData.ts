import { useState } from 'react';

interface IPlan {
  assumptions: {
    platform: string;
    targer_impressions_per_video: number;
    typical_cpm: number;
  };
  currency: string;
  estimated_cost_per_video: number;
  recommended_min_spend_per_video: number;
  test_term_weeks: number;
  videos_per_month: number;
  explanation: string;
}

interface IVariants {
  hooks: string[];
  strong_points_1_messages: string[];
  strong_points_2_messages: string[];
  strong_points_3_messages: string[];
  ctas: string[];
}

export interface IElements {
  hooks: string[];
  body1Images: string[];
  body1Messages: string[];
  body2Images: string[];
  body2Messages: string[];
  body3Images: string[];
  body3Messages: string[];
  ctas: string[];
}

export const useStepData = () => {
  const [plan, setPlan] = useState<IPlan>();
  const onSetPlan = (data: IPlan) => {
    setPlan(data);
  };

  const [variants, setVariants] = useState<IVariants>();
  const onSetVariants = (data: IVariants) => {
    setVariants(data);
  };

  const [elements, setElements] = useState<IElements>({
    hooks: [],
    body1Images: [],
    body1Messages: [],
    body2Images: [],
    body2Messages: [],
    body3Images: [],
    body3Messages: [],
    ctas: [],
  });
  const onSetElements = (data: IElements) => {
    setElements(data);
  };

  return { plan, onSetPlan, variants, onSetVariants, elements, onSetElements };
};
