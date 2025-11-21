'use client';
import { useState } from 'react';

interface IKeywords {
  term: string;
}

interface IWebsites {
  url: String;
  title: String;
  reason: String;
}

interface IStep3Form {
  url: string;
  title: string;
  meta_description: string;
  hero_text: {
    headline: string;
    subhead: string;
    cta: string;
  };
}

interface IKeyVisual {
  url: string;
  title: string;
  meta_description: string;
  screenshot: {
    path: string;
    link: string;
  };
}

interface ISuggestion {
  key_message: string;
  strong_points: string[];
}
interface ICompetitorStrategy {
  key_message: string;
  strong_points: string[];
}

export const useStepData = () => {
  // step 1
  const [step1Form, setStep1Form] = useState<string>('');
  const onChangeStep1Form = (value: string) => {
    setStep1Form(value);
  };

  const [keywords, setKeywords] = useState<IKeywords[]>([]);
  const onSetKeywords = (keywords: IKeywords[]) => {
    setKeywords(keywords);
  };

  // step 2
  const [step2Form, setStep2Form] = useState<string[]>([]);
  const onChangeStep2Form = (value: string[]) => {
    setStep2Form(value);
  };

  const [websites, setWebsites] = useState<IWebsites[]>([]);
  const onSetWebsites = (websites: IWebsites[]) => {
    setWebsites(websites);
  };

  // step 3
  const [keyVisuals, setKeyVisuals] = useState<IKeyVisual[]>([]);
  const onSetKeyVisuals = (keyVisuals: IKeyVisual[]) => {
    setKeyVisuals(keyVisuals);
  };

  const [step3Form, setStep3Form] = useState<IStep3Form[]>([]);
  const onChangeStep3Form = (value: IStep3Form[]) => {
    setStep3Form(value);
  };

  const [suggestions, setSuggestions] = useState<ISuggestion>();
  const onSetSuggestions = (suggestions: ISuggestion) => {
    setSuggestions(suggestions);
  };

  const [competitorStrategy, setCompetitorStrategy] = useState<ICompetitorStrategy[]>();
  const onSetCompetitorStrategy = (competitorStrategy: ICompetitorStrategy[]) => {
    setCompetitorStrategy(competitorStrategy);
  };

  return {
    // step 1
    step1Form,
    onChangeStep1Form,
    keywords,
    onSetKeywords,
    // step 2
    step2Form,
    onChangeStep2Form,
    websites,
    onSetWebsites,
    // step 3
    keyVisuals,
    onSetKeyVisuals,
    step3Form,
    onChangeStep3Form,
    suggestions,
    onSetSuggestions,
    competitorStrategy,
    onSetCompetitorStrategy,
  };
};
