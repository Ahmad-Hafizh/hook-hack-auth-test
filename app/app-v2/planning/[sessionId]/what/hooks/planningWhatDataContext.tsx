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
  step5Data: {} as any,
  onSetStep5Data: (data: any) => {},
  step6Data: [] as any,
  onSetStep6Data: (data: any) => {},
  step7Data: {} as any,
  onSetStep7Data: (data: any) => {},
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
      }}
    >
      {children}
    </PlannningWhatDataContext.Provider>
  );
}

export function usePlanningWhatDataContext() {
  return useContext(PlannningWhatDataContext);
}
