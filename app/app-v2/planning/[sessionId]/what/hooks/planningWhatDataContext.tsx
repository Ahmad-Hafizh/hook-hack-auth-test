import { createContext, useState } from 'react';

export interface IKeywords {
  term: string;
}

export const PlannningWhatDataContext = createContext({
  keyWords: [] as IKeywords[],
  onSetKeywords: (keywords: IKeywords[]) => {},
  step1Form: '',
  onChangeStep1Form: (value: string) => {},
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

  return <PlannningWhatDataContext.Provider value={{ keyWords, onSetKeywords, step1Form, onChangeStep1Form }}>{children}</PlannningWhatDataContext.Provider>;
}
