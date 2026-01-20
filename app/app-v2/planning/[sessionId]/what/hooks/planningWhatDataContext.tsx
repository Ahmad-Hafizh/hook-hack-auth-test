"use client";
import { createContext, useContext, useState } from "react";

export interface IKeywords {
  term: string;
}

export interface IKeyVisuals {
  url: string;
  title: string;
  screenshot_url: string;
  meta_description: string;
}

export interface IMatrix {
  key_message: string;
  strong_points: string[];
}

export interface IBriefPlanning {
  user: IMatrix;
  competitors: IMatrix[];
  suggestion: IMatrix;
}

export interface IValueOrganization {
  id: string;
  category: string;
  label: string;
  rationale: string;
}

export interface IDesire {
  desire: string;
  reason: string;
  tobe: {
    action: string;
    judgment: string;
    new_assumption: string;
    old_assumption: string;
  };
}

export interface IDesireOrganization {
  value_id: string;
  value_label: string;
  value_category: string;
  desire_1: IDesire;
  desire_2: IDesire;
}

export interface IPositioningPatterns {
  pattern_number: number;
  quadrant: string;
  quadrant_ja: string;
  direction: string;
  direction_ja: string;
  direction_reason: string;
  process_description: string;
  outcome_description: string;
  one_line_promise: string;
  source_value_ids: string[];
  source_tobe_ids: string[];
}

export const PlannningWhatDataContext = createContext({
  keywords: [] as IKeywords[],
  onSetKeywords: (keywords: IKeywords[]) => {},
  step1Form: "",
  onChangeStep1Form: (value: string) => {},
  keyVisuals: [] as IKeyVisuals[],
  onSetKeyVisuals: (keyVisuals: IKeyVisuals[]) => {},
  selectedKeywords: "",
  onSetSelectedKeywords: (value: string) => {},
  briefPlanning: {} as IBriefPlanning,
  onSetBriefPlanning: (briefPlanning: IBriefPlanning) => {},
  step5Data: {} as any,
  onSetStep5Data: (data: any) => {},
  step6Data: [] as any,
  onSetStep6Data: (data: any) => {},
  step7Data: {} as any,
  onSetStep7Data: (data: any) => {},
  valueOrganization: [] as IValueOrganization[],
  onSetValueOrganization: (data: IValueOrganization[]) => {},
  desireOrganization: [] as IDesireOrganization[],
  onSetDesireOrganization: (data: IDesireOrganization[]) => {},
  positioningPatterns: [] as IPositioningPatterns[],
  onSetPositioningPatterns: (data: IPositioningPatterns[]) => {},
  selectedValueOrganization: [] as string[],
  onSetSelectedValueOrganization: (data: string[]) => {},
  selectedTobes: [] as string[],
  onSetSelectedTobes: (data: string[]) => {},
  selectedMatrix: {} as IMatrix,
  onSetSelectedMatrix: (data: IMatrix) => {},
});

export default function PlannningWhatDataContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [keywords, setKeywords] = useState<IKeywords[]>([]);
  const onSetKeywords = (keywords: IKeywords[]) => {
    setKeywords(keywords);
  };

  const [step1Form, setStep1Form] = useState<string>("");
  const onChangeStep1Form = (value: string) => {
    setStep1Form(value);
  };

  const [keyVisuals, setKeyVisuals] = useState<IKeyVisuals[]>([]);
  const onSetKeyVisuals = (keyVisuals: IKeyVisuals[]) => {
    setKeyVisuals(keyVisuals);
  };

  const [selectedKeywords, setSelectedKeywords] = useState<string>("");
  const onSetSelectedKeywords = (value: string) => {
    setSelectedKeywords(value);
  };

  const [briefPlanning, setBriefPlanning] = useState<IBriefPlanning>({
    user: { key_message: "", strong_points: [] },
    competitors: [],
    suggestion: { key_message: "", strong_points: [] },
  });

  const onSetBriefPlanning = (briefPlanning: IBriefPlanning) => {
    setBriefPlanning(briefPlanning);
  };

  const [step5Data, setStep5Data] = useState<any>({
    option1: [],
    option2: [],
    option3: [],
    option4: [],
  });
  const onSetStep5Data = (data: any) => {
    setStep5Data(data);
  };

  const [step6Data, setStep6Data] = useState<any>([]);
  const onSetStep6Data = (data: any) => {
    setStep6Data(data);
  };

  const [step7Data, setStep7Data] = useState<any>({
    option1: [],
    option2: [],
    option3: [],
  });
  const onSetStep7Data = (data: any) => {
    setStep7Data(data);
  };

  const [valueOrganization, setValueOrganization] = useState<
    IValueOrganization[]
  >([]);
  const onSetValueOrganization = (data: IValueOrganization[]) => {
    setValueOrganization(data);
  };

  const [desireOrganization, setDesireOrganization] = useState<
    IDesireOrganization[]
  >([]);
  const onSetDesireOrganization = (data: IDesireOrganization[]) => {
    setDesireOrganization(data);
  };

  const [positioningPatterns, setPositioningPatterns] = useState<
    IPositioningPatterns[]
  >([]);
  const onSetPositioningPatterns = (data: IPositioningPatterns[]) => {
    setPositioningPatterns(data);
  };

  const [selectedMatrix, setSelectedMatrix] = useState<IMatrix>({
    key_message: "",
    strong_points: [],
  });
  const onSetSelectedMatrix = (data: IMatrix) => {
    setSelectedMatrix(data);
  };

  const [selectedValueOrganization, setSelectedValueOrganization] = useState<
    any[]
  >([]);
  const onSetSelectedValueOrganization = (data: any[]) => {
    setSelectedValueOrganization(data);
  };

  const [selectedTobes, setSelectedTobes] = useState<string[]>([]);
  const onSetSelectedTobes = (data: string[]) => {
    setSelectedTobes(data);
  };

  return (
    <PlannningWhatDataContext.Provider
      value={{
        keywords,
        onSetKeywords,
        step1Form,
        onChangeStep1Form,
        keyVisuals,
        onSetKeyVisuals,
        selectedKeywords,
        onSetSelectedKeywords,
        briefPlanning,
        onSetBriefPlanning,
        step5Data,
        onSetStep5Data,
        step6Data,
        onSetStep6Data,
        step7Data,
        onSetStep7Data,
        valueOrganization,
        onSetValueOrganization,
        desireOrganization,
        onSetDesireOrganization,
        positioningPatterns,
        onSetPositioningPatterns,
        selectedTobes,
        onSetSelectedTobes,
        selectedValueOrganization,
        onSetSelectedValueOrganization,
        selectedMatrix,
        onSetSelectedMatrix,
      }}
    >
      {children}
    </PlannningWhatDataContext.Provider>
  );
}

export function usePlanningWhatDataContext() {
  return useContext(PlannningWhatDataContext);
}
