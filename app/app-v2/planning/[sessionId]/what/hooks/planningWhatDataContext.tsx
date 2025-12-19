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

interface IKeyStrategy {
  key_message: string;
  strong_points: string[];
}

export interface IBriefPlanning {
  user: IKeyStrategy;
  competitors: IKeyStrategy[];
  suggestion: IKeyStrategy;
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
      }}
    >
      {children}
    </PlannningWhatDataContext.Provider>
  );
}

export function usePlanningWhatDataContext() {
  return useContext(PlannningWhatDataContext);
}
