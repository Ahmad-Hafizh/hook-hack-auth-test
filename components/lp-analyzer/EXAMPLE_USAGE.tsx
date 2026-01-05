"use client";

import React, { useState } from "react";
import {
  CompetitorResearchStep,
  LPURLInputStep,
  KeywordSelectionStep,
  VisualSelectionStep,
} from "@/components/lp-analyzer";

// Example data
const KEYWORDS = [
  { value: "saas", label: "SaaS" },
  { value: "ecommerce", label: "E-commerce" },
  { value: "marketing", label: "Marketing" },
  { value: "education", label: "Education" },
  { value: "healthcare", label: "Healthcare" },
  { value: "finance", label: "Finance" },
  { value: "realestate", label: "Real Estate" },
  { value: "consulting", label: "Consulting" },
];

const INITIAL_VISUALS = [
  { id: "1", placeholder: "Key visual 1" },
  { id: "2", placeholder: "Key visual 2" },
  { id: "3", placeholder: "Key visual 3" },
  { id: "4", placeholder: "Key visual 4" },
  { id: "5", placeholder: "Key visual 5" },
  { id: "6", placeholder: "Key visual 6" },
];

type Step = "research" | "url" | "keywords" | "visuals" | "complete";

interface FormData {
  researchMethod?: "search" | "url";
  lpUrl?: string;
  selectedKeywords?: string[];
  selectedVisuals?: string[];
}

export default function LPAnalyzerFlow() {
  const [currentStep, setCurrentStep] = useState<Step>("research");
  const [formData, setFormData] = useState<FormData>({});
  const [visuals, setVisuals] = useState(INITIAL_VISUALS);

  // Handle competitor research method selection
  const handleResearchMethodSelect = (method: "search" | "url") => {
    setFormData({ ...formData, researchMethod: method });
    setCurrentStep("url");
  };

  // Handle LP URL submission
  const handleLPUrlSubmit = (url: string) => {
    setFormData({ ...formData, lpUrl: url });
    setCurrentStep("keywords");
  };

  // Handle keyword selection
  const handleKeywordsSubmit = (keywords: string[]) => {
    setFormData({ ...formData, selectedKeywords: keywords });
    setCurrentStep("visuals");
  };

  // Handle visual selection
  const handleVisualsSubmit = (visualIds: string[]) => {
    setFormData({ ...formData, selectedVisuals: visualIds });
    setCurrentStep("complete");

    // Here you would typically submit the form data to your API
    console.log("Form completed:", { ...formData, selectedVisuals: visualIds });
  };

  // Handle show more visuals
  const handleShowMoreVisuals = () => {
    // Simulate loading more visuals
    const moreVisuals = [
      { id: "7", placeholder: "Key visual 7" },
      { id: "8", placeholder: "Key visual 8" },
      { id: "9", placeholder: "Key visual 9" },
      { id: "10", placeholder: "Key visual 10" },
      { id: "11", placeholder: "Key visual 11" },
      { id: "12", placeholder: "Key visual 12" },
    ];

    setVisuals([...visuals, ...moreVisuals]);
  };

  // Navigation handlers
  const goBack = () => {
    switch (currentStep) {
      case "url":
        setCurrentStep("research");
        break;
      case "keywords":
        setCurrentStep("url");
        break;
      case "visuals":
        setCurrentStep("keywords");
        break;
      case "complete":
        setCurrentStep("visuals");
        break;
    }
  };

  // Render current step
  const renderStep = () => {
    switch (currentStep) {
      case "research":
        return (
          <CompetitorResearchStep
            onNext={handleResearchMethodSelect}
            initialValue={formData.researchMethod}
          />
        );

      case "url":
        return (
          <LPURLInputStep
            onBack={goBack}
            onNext={handleLPUrlSubmit}
            initialValue={formData.lpUrl}
          />
        );

      case "keywords":
        return (
          <KeywordSelectionStep
            keywords={KEYWORDS}
            onBack={goBack}
            onNext={handleKeywordsSubmit}
            initialSelected={formData.selectedKeywords}
            maxSelection={5}
          />
        );

      case "visuals":
        return (
          <VisualSelectionStep
            visuals={visuals}
            onBack={goBack}
            onNext={handleVisualsSubmit}
            onShowMore={handleShowMoreVisuals}
            initialSelected={formData.selectedVisuals}
            maxSelection={3}
            hasMore={visuals.length < 12}
          />
        );

      case "complete":
        return (
          <div className="flex-1 w-full max-w-5xl mx-auto px-4 py-12 md:px-8 flex flex-col justify-center items-center">
            <div className="bg-white rounded-xl p-12 shadow-lg border border-border-light text-center">
              <h1 className="text-3xl font-bold text-text-main mb-4">
                フォームが完了しました！
              </h1>
              <p className="text-text-muted mb-8">
                以下のデータが送信されました：
              </p>
              <div className="text-left bg-slate-50 p-6 rounded-lg">
                <pre className="text-sm overflow-auto">
                  {JSON.stringify(formData, null, 2)}
                </pre>
              </div>
              <button
                onClick={() => {
                  setCurrentStep("research");
                  setFormData({});
                  setVisuals(INITIAL_VISUALS);
                }}
                className="mt-8 px-8 py-3 bg-primary text-white rounded-lg hover:bg-primary-hover transition-colors"
              >
                最初から始める
              </button>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="bg-surface-light text-text-main font-sans min-h-screen flex flex-col">
      {renderStep()}
    </div>
  );
}
