"use client";
import { createContext, useContext, useState, useEffect } from "react";
import {
  ICandidates,
  ICompetitiveMatrix,
  IDesire,
  IMatrix,
  IDesireOrganization,
  IKeyVisuals,
  IKeywords,
  IMessageTags,
  IPositioningPatterns,
  IStrongPointTagged,
  IValueOrganization,
  IWebsite,
} from "./dataTypes";

export const PlannningWhatDataContext = createContext({
  // step 2 data
  keywords: [] as IKeywords[],
  onSetKeywords: (keywords: IKeywords[]) => {},
  selectedKeywords: "",
  onSetSelectedKeywords: (value: string) => {},

  candidates: [] as ICandidates[],
  onSetCandidates: (candidates: ICandidates[]) => {},

  // step 3 data
  keyVisuals: [] as IKeyVisuals[],
  onSetKeyVisuals: (keyVisuals: IKeyVisuals[]) => {},
  selectedKeyVisuals: [] as string[],
  onSetSelectedKeyVisuals: (value: string[]) => {},

  // step 4 data
  competitiveMatrix: {} as ICompetitiveMatrix,
  onSetCompetitiveMatrix: (competitiveMatrix: ICompetitiveMatrix) => {},
  selectedMatrix: "" as "user" | "suggestion",
  onSetSelectedMatrix: (matrix: "user" | "suggestion") => {},

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

  const [candidates, setCandidates] = useState<ICandidates[]>([]);
  const onSetCandidates = (candidates: ICandidates[]) => {
    setCandidates(candidates);
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
    useState<ICompetitiveMatrix>({} as ICompetitiveMatrix);
  const onSetCompetitiveMatrix = (competitiveMatrix: ICompetitiveMatrix) => {
    setCompetitiveMatrix(competitiveMatrix);
  };
  const [selectedMatrix, setSelectedMatrix] = useState<"user" | "suggestion">(
    "user",
  );
  const onSetSelectedMatrix = (matrix: "user" | "suggestion") => {
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
        candidates,
        onSetCandidates,
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
