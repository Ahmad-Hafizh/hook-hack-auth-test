import { useState } from 'react';

interface IStepData {
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

export const useStepData = () => {
  const [plan, setPlan] = useState<IStepData>();
  const onSetPlan = (data: IStepData) => {
    setPlan(data);
  };

  const [variants, setVariants] = useState<IVariants>();
  const onSetVariants = (data: IVariants) => {
    setVariants(data);
  };

  return { plan, onSetPlan, variants, onSetVariants };
};
