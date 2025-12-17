'use client';
import { createContext, useContext, useState } from 'react';

export interface IKeywords {
  term: string;
}

export interface IKeyVisuals {
  url: string;
  title: string;
  screenshot_url: string;
  meta_description: string;
}

export const PlannningWhatDataContext = createContext({
  keyWords: [] as IKeywords[],
  onSetKeywords: (keywords: IKeywords[]) => {},
  step1Form: '',
  onChangeStep1Form: (value: string) => {},
  keyVisuals: [] as IKeyVisuals[],
  onSetKeyVisuals: (keyVisuals: IKeyVisuals[]) => {},
});

export default function PlannningWhatDataContextProvider({ children }: { children: React.ReactNode }) {
  const [keyWords, setKeyWords] = useState<IKeywords[]>([]);
  const onSetKeywords = (keywords: IKeywords[]) => {
    setKeyWords(keywords);
  };

  const [step1Form, setStep1Form] = useState<string>('');
  const onChangeStep1Form = (value: string) => {
    setStep1Form(value);
  };

  const [keyVisuals, setKeyVisuals] = useState<IKeyVisuals[]>([]);
  const onSetKeyVisuals = (keyVisuals: IKeyVisuals[]) => {
    setKeyVisuals(keyVisuals);
  };

  return <PlannningWhatDataContext.Provider value={{ keyWords, onSetKeywords, step1Form, onChangeStep1Form, keyVisuals, onSetKeyVisuals }}>{children}</PlannningWhatDataContext.Provider>;
}

export function usePlanningWhatDataContext() {
  return useContext(PlannningWhatDataContext);
}
