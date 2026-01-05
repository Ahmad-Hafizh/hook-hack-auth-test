"use client";

import React, { useState } from "react";
import { PageHeader } from "./PageHeader";
import { Card } from "./Card";
import { RadioCard } from "./RadioCard";
import { NavigationButtons } from "./NavigationButtons";

export interface CompetitorResearchStepProps {
  onBack?: () => void;
  onNext?: (method: "search" | "url") => void;
  initialValue?: "search" | "url";
}

export const CompetitorResearchStep: React.FC<CompetitorResearchStepProps> = ({
  onBack,
  onNext,
  initialValue,
}) => {
  const [selectedMethod, setSelectedMethod] = useState<"search" | "url" | null>(
    initialValue || null
  );

  const handleNext = () => {
    if (selectedMethod && onNext) {
      onNext(selectedMethod);
    }
  };

  return (
    <main className="flex-1 w-full max-w-5xl mx-auto px-4 py-12 md:px-8 flex flex-col justify-center">
      <PageHeader title="競合他社調査の開始" />

      <div className="w-full">
        <div className="flex flex-col gap-8">
          <Card variant="elevated" className="animate-fade-in-up">
            <div className="text-center mb-10">
              <h3 className="text-lg md:text-xl font-bold text-text-main mb-2">
                以下どちらかを選択してください
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 h-full">
              <RadioCard
                name="research_method"
                value="search"
                icon="search"
                title="競合他社の調査を始める"
                description="キーワードや業界から、リサーチすべき競合LPを探します。"
                checked={selectedMethod === "search"}
                onChange={(value) =>
                  setSelectedMethod(value as "search" | "url")
                }
              />

              <RadioCard
                name="research_method"
                value="url"
                icon="link"
                title="調査したい競合3社のLPのURLをすでにご存じの方"
                description="直接URLを入力して、すぐに分析を開始します。"
                checked={selectedMethod === "url"}
                onChange={(value) =>
                  setSelectedMethod(value as "search" | "url")
                }
              />
            </div>

            <NavigationButtons
              onBack={onBack}
              onNext={handleNext}
              isNextDisabled={!selectedMethod}
              nextLabel="次に進む"
              backLabel="戻る"
            />
          </Card>
        </div>
      </div>
    </main>
  );
};
