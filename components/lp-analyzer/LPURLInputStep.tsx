"use client";

import React, { useState } from "react";
import { PageHeader } from "./PageHeader";
import { Card } from "./Card";
import { URLInput } from "./URLInput";
import { NavigationButtons } from "./NavigationButtons";

export interface LPURLInputStepProps {
  onBack?: () => void;
  onNext?: (url: string) => void;
  initialValue?: string;
}

export const LPURLInputStep: React.FC<LPURLInputStepProps> = ({
  onBack,
  onNext,
  initialValue = "",
}) => {
  const [url, setUrl] = useState(initialValue);
  const [error, setError] = useState("");

  const validateURL = (urlString: string): boolean => {
    try {
      new URL(urlString);
      return true;
    } catch {
      return false;
    }
  };

  const handleNext = () => {
    if (!url) {
      setError("URLを入力してください");
      return;
    }

    if (!validateURL(url)) {
      setError("有効なURLを入力してください");
      return;
    }

    setError("");

    if (onNext) {
      onNext(url);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(e.target.value);
    setError("");
  };

  return (
    <main className="flex-1 w-full max-w-5xl mx-auto px-4 py-12 md:px-8 flex flex-col justify-center">
      <PageHeader title="自社LPのURL入力" />

      <div className="w-full">
        <div className="flex flex-col gap-8">
          <Card
            variant="elevated"
            className="animate-fade-in-up min-h-[400px] flex flex-col justify-between"
          >
            <URLInput
              id="lp-url"
              name="lp-url"
              label="あなたのプロダクトやサービスのLPのurlを入力してください"
              placeholder="https://example.com/your-landing-page"
              value={url}
              onChange={handleChange}
              error={error}
            />

            <NavigationButtons
              onBack={onBack}
              onNext={handleNext}
              isNextDisabled={!url}
              nextLabel="次へ進む"
              backLabel="戻る"
            />
          </Card>
        </div>
      </div>
    </main>
  );
};
