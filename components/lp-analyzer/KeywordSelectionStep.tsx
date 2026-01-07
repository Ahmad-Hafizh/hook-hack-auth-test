"use client";

import React, { useState } from "react";
import { PageHeader } from "./PageHeader";
import { Card } from "./Card";
import { KeywordSelector, KeywordOption } from "./KeywordSelector";
import { NavigationButtons } from "./NavigationButtons";

export interface KeywordSelectionStepProps {
  keywords: KeywordOption[];
  onBack?: () => void;
  onNext?: (selectedKeywords: string[]) => void;
  initialSelected?: string[];
  maxSelection?: number;
}

export const KeywordSelectionStep: React.FC<KeywordSelectionStepProps> = ({
  keywords,
  onBack,
  onNext,
  initialSelected = [],
  maxSelection,
}) => {
  const [selectedKeywords, setSelectedKeywords] =
    useState<string[]>(initialSelected);

  const handleNext = () => {
    if (onNext) {
      onNext(selectedKeywords);
    }
  };

  return (
    <main className="flex-1 w-full max-w-5xl mx-auto px-4 py-12 md:px-8 flex flex-col justify-center">
      <PageHeader
        title="キーワード選択"
        description="あなたのプロダクトやサービスに最適なキーワードを選んで、分析の方向性を定めましょう。"
      />

      <div className="w-full">
        <div className="flex flex-col gap-8">
          <Card
            variant="elevated"
            className="animate-fade-in-up min-h-[400px] flex flex-col justify-between"
          >
            {/* <KeywordSelector
              keywords={keywords}
              selectedKeywords={selectedKeywords}
              onSelectionChange={setSelectedKeywords}
              maxSelection={maxSelection}
              label="あなたのプロダクト/サービスに当てはまるキーワードを選択してください"
            /> */}

            <NavigationButtons
              onBack={onBack}
              onNext={handleNext}
              isNextDisabled={selectedKeywords.length === 0}
              nextLabel="次へ進む"
              backLabel="戻る"
            />
          </Card>
        </div>
      </div>
    </main>
  );
};
