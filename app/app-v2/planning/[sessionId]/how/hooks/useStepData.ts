import { useState } from 'react';

export interface IPlan {
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
  strong_point_1_images: string[];
  strong_point_2_images: string[];
  strong_point_3_images: string[];
  background_music: string[];
  brand_logo: string;
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

export interface IRendersCreatomate {
  result_url: string;
}

export interface ITemplateCreatomate {
  template_id: string;
  images: {
    logo: string;
    strong_point_3: string;
    strong_point_2: string;
    strong_point_1: string;
    background_music: string;
  };
}

export const useStepData = () => {
  const [plan, setPlan] = useState<IPlan>();

  const [variants, setVariants] = useState<IVariants>({
    hooks: [],
    strong_point_1_messages: [],
    strong_point_2_messages: [],
    strong_point_3_messages: [],
    ctas: [],
    strong_point_1_images: [],
    strong_point_2_images: [],
    strong_point_3_images: [],
    background_music: [],
    brand_logo: '',
  });

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

  const [patternCount, setPatternCount] = useState<number>(0);
  const [patternCombinations, setPatternCombinations] = useState<IPattern[]>([]);

  const [rendersCreatomate, setRendersCreatomate] = useState<IRendersCreatomate[]>([]);

  const [selectedTemplateId, setSelectedTemplateId] = useState<string>('');

  const [jobId, setJobId] = useState<string>('');

  return {
    plan,
    setPlan,
    variants,
    setVariants,
    elements,
    setElements,
    patternCount,
    setPatternCount,
    patternCombinations,
    setPatternCombinations,
    rendersCreatomate,
    setRendersCreatomate,
    selectedTemplateId,
    setSelectedTemplateId,
    jobId,
    setJobId,
  };
};
