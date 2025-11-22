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

export interface IVariants {
  hooks: string[];
  strong_point_1_messages: string[];
  strong_point_2_messages: string[];
  strong_point_3_messages: string[];
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

export interface IPattern {
  hook: string;
  strong_point_1: string;
  strong_point_2: string;
  strong_point_3: string;
  cta: string;
  images: {
    strong_point_1: string;
    strong_point_2: string;
    strong_point_3: string;
    logo: string;
  };
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

  const [patternCount, setPatternCount] = useState<number>(0);
  const [patternCombinations, setPatternCombinations] = useState<IPattern[]>([]);

  return { plan, onSetPlan, variants, onSetVariants, elements, onSetElements, patternCount, setPatternCount, patternCombinations, setPatternCombinations };
};
