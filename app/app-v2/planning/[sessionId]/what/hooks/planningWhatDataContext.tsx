"use client";
import { createContext, useContext, useState, useEffect } from "react";

const STORAGE_KEY = "planning_what_data";

export interface IKeywords {
  term: string;
}

export interface IKeyVisuals {
  url: string;
  title: string;
  screenshot_url: string;
  meta_description: string;
}

export interface IMessageTags {
  type: "functional" | "emotional";
  focus: "process" | "outcome";
}

export interface IStrongPointTagged {
  text: string;
  type: "functional" | "emotional";
  focus: "process" | "outcome";
}

export interface IMatrix {
  url?: string;
  key_message: string;
  key_message_tags?: IMessageTags;
  strong_points: string[];
  strong_points_tagged?: IStrongPointTagged[];
  cta?: string;
  cta_tags?: IMessageTags;
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

  // Load data from localStorage on mount
  useEffect(() => {
    try {
      const savedData = localStorage.getItem(STORAGE_KEY);
      if (savedData) {
        const parsed = JSON.parse(savedData);
        if (parsed.keywords) setKeywords(parsed.keywords);
        if (parsed.selectedKeywords) setSelectedKeywords(parsed.selectedKeywords);
        if (parsed.keyVisuals) setKeyVisuals(parsed.keyVisuals);
        if (parsed.selectedKeyVisuals) setSelectedKeyVisuals(parsed.selectedKeyVisuals);
        if (parsed.competitiveMatrix) setCompetitiveMatrix(parsed.competitiveMatrix);
        if (parsed.selectedMatrix) setSelectedMatrix(parsed.selectedMatrix);
        if (parsed.valueOrganization) setValueOrganization(parsed.valueOrganization);
        if (parsed.selectedValueOrganization) setSelectedValueOrganization(parsed.selectedValueOrganization);
        if (parsed.desireOrganization) setDesireOrganization(parsed.desireOrganization);
        if (parsed.selectedTobes) setSelectedTobes(parsed.selectedTobes);
        if (parsed.positioningPatterns) setPositioningPatterns(parsed.positioningPatterns);
      }
    } catch (error) {
      console.error("Error loading data from localStorage:", error);
    }
  }, []);

  // Save data to localStorage whenever state changes
  useEffect(() => {
    try {
      const dataToSave = {
        keywords,
        selectedKeywords,
        keyVisuals,
        selectedKeyVisuals,
        competitiveMatrix,
        selectedMatrix,
        valueOrganization,
        selectedValueOrganization,
        desireOrganization,
        selectedTobes,
        positioningPatterns,
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(dataToSave));
    } catch (error) {
      console.error("Error saving data to localStorage:", error);
    }
  }, [
    keywords,
    selectedKeywords,
    keyVisuals,
    selectedKeyVisuals,
    competitiveMatrix,
    selectedMatrix,
    valueOrganization,
    selectedValueOrganization,
    desireOrganization,
    selectedTobes,
    positioningPatterns,
  ]);

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
