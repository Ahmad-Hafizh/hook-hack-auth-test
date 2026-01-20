"use client";

import React, { useState } from "react";

export interface IPlan {
  test_term_weeks: number;
  videos_per_month: number;
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

const dataContext = React.createContext({
  plan: {} as IPlan,
  onSetPlan: (plan: IPlan) => {},
  variants: {} as IVariants,
  onSetVariants: (value: any) => {},
  elements: {} as IElements,
  onSetElements: (value: any) => {},
  patternCount: 0,
  onSetPatternCount: (count: number) => {},
  patternCombinations: [] as IPattern[],
  onSetPatternCombinations: (value: any) => {},
  jobId: "",
  onSetJobId: (id: string) => {},
  rendersCreatomate: [] as { result_url: string }[],
  onSetRendersCreatomate: (value: any) => {},
  selectedTemplateId: "",
  onSetSelectedTemplateId: (id: string) => {},

  // New Steps Data
  duration: 15 | 30,
  onSetDuration: (duration: 15 | 30) => {},
});

export const DataContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [plan, setPlan] = useState<IPlan>({
    test_term_weeks: 0,
    videos_per_month: 0,
  });
  const onSetPlan = (plan: IPlan) => {
    setPlan(plan);
  };

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
    brand_logo: "",
  });
  const onSetVariants = (value: any) => {
    setVariants(value);
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
  const onSetElements = (value: any) => {
    setElements(value);
  };

  const [patternCount, setPatternCount] = useState<number>(0);
  const onSetPatternCount = (count: number) => {
    setPatternCount(count);
  };

  const [patternCombinations, setPatternCombinations] = useState<IPattern[]>(
    [],
  );
  const onSetPatternCombinations = (value: any) => {
    setPatternCombinations(value);
  };

  const [jobId, setJobId] = useState<string>("");
  const onSetJobId = (id: string) => {
    setJobId(id);
  };

  const [rendersCreatomate, setRendersCreatomate] = useState<
    { result_url: string }[]
  >([]);
  const onSetRendersCreatomate = (value: any) => {
    setRendersCreatomate(value);
  };

  const [selectedTemplateId, setSelectedTemplateId] = useState<string>("");
  const onSetSelectedTemplateId = (id: string) => {
    setSelectedTemplateId(id);
  };

  // new steps data
  const [duration, setDuration] = useState<15 | 30>(15);
  const onSetDuration = (duration: 15 | 30) => {
    setDuration(duration);
  };

  return (
    <dataContext.Provider
      value={{
        plan,
        onSetPlan,
        variants,
        onSetVariants,
        elements,
        onSetElements,
        patternCount,
        onSetPatternCount,
        patternCombinations,
        onSetPatternCombinations,
        jobId,
        onSetJobId,
        rendersCreatomate,
        onSetRendersCreatomate,
        selectedTemplateId,
        onSetSelectedTemplateId,
        duration,
        onSetDuration,
      }}
    >
      {children}
    </dataContext.Provider>
  );
};

export const useDataContext = () => {
  const context = React.useContext(dataContext);
  if (context === undefined) {
    throw new Error("useDataContext must be used within a DataContextProvider");
  }
  return context;
};
