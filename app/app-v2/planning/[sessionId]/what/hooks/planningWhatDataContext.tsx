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

export interface ICompetitiveMatrix {
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
  // step 2 data
  keywords: [] as IKeywords[],
  onSetKeywords: (keywords: IKeywords[]) => {},
  selectedKeywords: "",
  onSetSelectedKeywords: (value: string) => {},

  // step 3 data
  keyVisuals: [] as IKeyVisuals[],
  onSetKeyVisuals: (keyVisuals: IKeyVisuals[]) => {},
  selectedKeyVisuals: [] as string[],
  onSetSelectedKeyVisuals: (value: string[]) => {},

  // step 4 data
  competitiveMatrix: {} as ICompetitiveMatrix,
  onSetCompetitiveMatrix: (competitiveMatrix: ICompetitiveMatrix) => {},
  selectedMatrix: {} as IMatrix,
  onSetSelectedMatrix: (matrix: IMatrix) => {},

  // step 5 data
  valueOrganization: [] as IValueOrganization[],
  onSetValueOrganization: (data: IValueOrganization[]) => {},
  selectedValueOrganization: [] as string[],
  onSetSelectedValueOrganization: (data: string[]) => {},

  // step 6 data
  desireOrganization: [] as IDesireOrganization[],
  onSetDesireOrganization: (data: IDesireOrganization[]) => {},
  selectedTobes: [] as string[],
  onSetSelectedTobes: (data: string[]) => {},

  // step 7 data
  positioningPatterns: [] as IPositioningPatterns[],
  onSetPositioningPatterns: (data: IPositioningPatterns[]) => {},
});

export default function PlannningWhatDataContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  // step 2 data
  const [keywords, setKeywords] = useState<IKeywords[]>([]);
  const onSetKeywords = (keywords: IKeywords[]) => {
    setKeywords(keywords);
  };
  const [selectedKeywords, setSelectedKeywords] = useState<string>("");
  const onSetSelectedKeywords = (value: string) => {
    setSelectedKeywords(value);
  };

  // step 3 data
  const [keyVisuals, setKeyVisuals] = useState<IKeyVisuals[]>([]);
  const onSetKeyVisuals = (keyVisuals: IKeyVisuals[]) => {
    setKeyVisuals(keyVisuals);
  };
  const [selectedKeyVisuals, setSelectedKeyVisuals] = useState<string[]>([]);
  const onSetSelectedKeyVisuals = (value: string[]) => {
    setSelectedKeyVisuals(value);
  };

  // step 4 data
  const [competitiveMatrix, setCompetitiveMatrix] =
    useState<ICompetitiveMatrix>({
      user: { key_message: "", strong_points: [] },
      competitors: [],
      suggestion: { key_message: "", strong_points: [] },
    });
  const onSetCompetitiveMatrix = (competitiveMatrix: ICompetitiveMatrix) => {
    setCompetitiveMatrix(competitiveMatrix);
  };
  const [selectedMatrix, setSelectedMatrix] = useState<IMatrix>({} as IMatrix);
  const onSetSelectedMatrix = (matrix: IMatrix) => {
    setSelectedMatrix(matrix);
  };

  // step 5 data
  const [valueOrganization, setValueOrganization] = useState<
    IValueOrganization[]
  >([]);
  const onSetValueOrganization = (data: IValueOrganization[]) => {
    setValueOrganization(data);
  };
  const [selectedValueOrganization, setSelectedValueOrganization] = useState<
    any[]
  >([]);
  const onSetSelectedValueOrganization = (data: any[]) => {
    setSelectedValueOrganization(data);
  };

  // step 6 data
  const [desireOrganization, setDesireOrganization] = useState<
    IDesireOrganization[]
  >([]);
  const onSetDesireOrganization = (data: IDesireOrganization[]) => {
    setDesireOrganization(data);
  };
  const [selectedTobes, setSelectedTobes] = useState<string[]>([]);
  const onSetSelectedTobes = (data: string[]) => {
    setSelectedTobes(data);
  };

  const [positioningPatterns, setPositioningPatterns] = useState<
    IPositioningPatterns[]
  >([]);
  const onSetPositioningPatterns = (data: IPositioningPatterns[]) => {
    setPositioningPatterns(data);
  };

  return (
    <PlannningWhatDataContext.Provider
      value={{
        keywords,
        onSetKeywords,
        keyVisuals,
        onSetKeyVisuals,
        selectedKeywords,
        onSetSelectedKeywords,
        competitiveMatrix,
        onSetCompetitiveMatrix,
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
        selectedKeyVisuals,
        onSetSelectedKeyVisuals,
      }}
    >
      {children}
    </PlannningWhatDataContext.Provider>
  );
}

export function usePlanningWhatDataContext() {
  return useContext(PlannningWhatDataContext);
}
