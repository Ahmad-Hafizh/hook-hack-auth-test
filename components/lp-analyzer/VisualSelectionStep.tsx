"use client";

import React, { useState } from "react";
import { PageHeader } from "./PageHeader";
import { Card } from "./Card";
import { VisualSelector, VisualOption } from "./VisualSelector";
import { NavigationButtons } from "./NavigationButtons";

export interface VisualSelectionStepProps {
  visuals: VisualOption[];
  onBack?: () => void;
  onNext?: (selectedVisuals: string[]) => void;
  onShowMore?: () => void;
  initialSelected?: string[];
  maxSelection?: number;
  hasMore?: boolean;
}

export const VisualSelectionStep: React.FC<VisualSelectionStepProps> = ({
  visuals,
  onBack,
  onNext,
  onShowMore,
  initialSelected = [],
  maxSelection = 3,
  hasMore = false,
}) => {
  const [selectedVisuals, setSelectedVisuals] =
    useState<string[]>(initialSelected);

  const handleNext = () => {
    if (onNext) {
      onNext(selectedVisuals);
    }
  };

  return (
    <main className="flex-1 w-full max-w-7xl mx-auto px-4 py-12 md:px-8 flex flex-col justify-center">
      <PageHeader title="キービジュアル選択" />

      <div className="w-full">
        <div className="flex flex-col gap-8">
          <Card
            variant="elevated"
            padding="sm"
            className="animate-fade-in-up p-8"
          >
            <VisualSelector
              visuals={visuals}
              selectedVisuals={selectedVisuals}
              onSelectionChange={setSelectedVisuals}
              maxSelection={maxSelection}
              label="プロダクト / サービスに合うキービジュアルを3つ選んでください"
              onShowMore={onShowMore}
              hasMore={hasMore}
            />

            <div className="flex flex-col items-center gap-6 mt-8 w-full">
              <NavigationButtons
                onBack={onBack}
                onNext={handleNext}
                isNextDisabled={selectedVisuals.length === 0}
                nextLabel="次へ進む"
                backLabel="戻る"
                className="mt-0 w-full sm:w-auto justify-center"
              />
            </div>
          </Card>
        </div>
      </div>
    </main>
  );
};
