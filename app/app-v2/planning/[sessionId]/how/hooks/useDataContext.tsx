"use client";

import React, { useState, useEffect } from "react";

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

export interface TwoPartValue {
  part1: string;
  part2: string;
}

export interface IDataRow {
  hook: TwoPartValue;
  body1: TwoPartValue;
  body2: TwoPartValue;
  cta: TwoPartValue;
}

export interface IDataRowFinalized {
  hookImage: string;
  hookPart1: string;
  hookPart2: string;
  body1Image: string;
  body1ImageB?: string;
  body1Part1: string;
  body1Part2: string;
  body2Image: string;
  body2ImageB?: string;
  body2Part1: string;
  body2Part2: string;
  ctaPart1: string;
  ctaPart2: string;
  // Legacy fields for backward compatibility
  hook?: string;
  body1?: string;
  body2?: string;
  cta?: string;
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
  orientation: "horizontal" as "horizontal" | "vertical",
  onSetOrientation: (orientation: "horizontal" | "vertical") => {},
  dataRows: [] as IDataRow[],
  onSetDataRows: (rows: IDataRow[]) => {},
  finalizedDataRows: [] as IDataRowFinalized[],
  onSetFinalizedDataRows: (rows: IDataRowFinalized[]) => {},
  selectedFinalizedRows: [] as IDataRowFinalized[],
  onSetSelectedFinalizedRows: (rows: IDataRowFinalized[]) => {},
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

  const [orientation, setOrientation] = useState<"horizontal" | "vertical">("horizontal");
  const onSetOrientation = (orientation: "horizontal" | "vertical") => {
    setOrientation(orientation);
  };

  const [dataRows, setDataRows] = useState<IDataRow[]>([]);
  const onSetDataRows = (rows: IDataRow[]) => {
    setDataRows(rows);
  };

  const [finalizedDataRows, setFinalizedDataRows] = useState<
    IDataRowFinalized[]
  >([]);
  const onSetFinalizedDataRows = (rows: IDataRowFinalized[]) => {
    setFinalizedDataRows(rows);
  };

  const [selectedFinalizedRows, setSelectedFinalizedRows] = useState<
    IDataRowFinalized[]
  >([]);
  const onSetSelectedFinalizedRows = (rows: IDataRowFinalized[]) => {
    setSelectedFinalizedRows(rows);
  };

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem("planning_how_data");
      if (saved) {
        const d = JSON.parse(saved);
        if (d.plan) setPlan(d.plan);
        if (d.variants) setVariants(d.variants);
        if (d.elements) setElements(d.elements);
        if (d.patternCount) setPatternCount(d.patternCount);
        if (d.patternCombinations) setPatternCombinations(d.patternCombinations);
        if (d.jobId) setJobId(d.jobId);
        if (d.rendersCreatomate) setRendersCreatomate(d.rendersCreatomate);
        if (d.selectedTemplateId) setSelectedTemplateId(d.selectedTemplateId);
        if (d.duration) setDuration(d.duration);
        if (d.orientation) setOrientation(d.orientation);
        if (d.dataRows) setDataRows(d.dataRows);
        if (d.finalizedDataRows) setFinalizedDataRows(d.finalizedDataRows);
        if (d.selectedFinalizedRows) setSelectedFinalizedRows(d.selectedFinalizedRows);
      }
    } catch (e) {
      console.error("Error loading planning_how_data:", e);
    }
  }, []);

  // Save to localStorage on change
  useEffect(() => {
    try {
      localStorage.setItem("planning_how_data", JSON.stringify({
        plan, variants, elements, patternCount, patternCombinations,
        jobId, rendersCreatomate, selectedTemplateId, duration, orientation,
        dataRows, finalizedDataRows, selectedFinalizedRows,
      }));
    } catch (e) {
      console.error("Error saving planning_how_data:", e);
    }
  }, [plan, variants, elements, patternCount, patternCombinations, jobId, rendersCreatomate, selectedTemplateId, duration, orientation, dataRows, finalizedDataRows, selectedFinalizedRows]);

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
        orientation,
        onSetOrientation,
        dataRows,
        onSetDataRows,
        finalizedDataRows,
        onSetFinalizedDataRows,
        selectedFinalizedRows,
        onSetSelectedFinalizedRows,
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
