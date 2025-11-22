'use client';
import { Button } from '@/components/ui/button';
import { ToggleGroup } from '@/components/ui/toggle-group';
import React, { useEffect } from 'react';
import KeyVisualsCard from '../components/keyVisualsCard';
import { Skeleton } from '@/components/ui/skeleton';
import { generateScreenshot, get5MoreVisuals, submitStep3 } from '../hooks/useFetchApi';
import { Spinner } from '@/components/ui/spinner';

const Step3 = ({
  onNext,
  onPrev,
  websites,
  onSetSuggestions,
  onSetWebsites,
  keywords,
  onSetCompetitorStrategy,
}: {
  onNext: () => void;
  onPrev: () => void;
  websites: any[];
  onSetSuggestions: (suggestions: any) => void;
  onSetWebsites: (websites: any) => void;
  onSetCompetitorStrategy: (competitorStrategy: any) => void;
  keywords: { term: string }[];
}) => {
  const [selectedVisuals, setSelectedVisuals] = React.useState<string[]>([]);
  const [loadingSubmit, setLoadingSubmit] = React.useState(false);
  const [loadingGenerate, setLoadingGenerate] = React.useState(false);
  const [loadingGenerateVisual, setLoadingGenerateVisual] = React.useState(true);
  const [keyVisuals, setKeyVisuals] = React.useState<any[]>([]);

  useEffect(() => {
    generateScreenshot({ websites, setKeyVisuals, setLoadingGenerateVisual });
  }, [websites]);

  return (
    <div className="px-10 h-full flex flex-col gap-5 container justify-between">
      <div className=" flex flex-col gap-10">
        <div className="flex flex-col gap-4">
          <h1 className="text-3xl font-bold leading-none">Select 3 key visuals that matches your product/ services</h1>
          <Button variant="outline" className="w-fit" onClick={onPrev}>
            Change Keyword
          </Button>
        </div>
        <div className="overflow-x-scroll w-full">
          {loadingGenerateVisual ? (
            <div className="flex gap-4 w-fit pb-4">
              {[1, 2, 3, 4, 5].map((_, index) => (
                <Skeleton key={index} className="w-[600px] h-[470px] rounded-md" />
              ))}
            </div>
          ) : (
            <ToggleGroup
              type="multiple"
              className="gap-4 w-fit pb-4 "
              value={selectedVisuals}
              onValueChange={(value: string[]) => {
                if (selectedVisuals.length < 3) {
                  setSelectedVisuals(value);
                } else {
                  if (selectedVisuals.includes(value[value.length - 1])) {
                    setSelectedVisuals(value);
                  }
                }
              }}
            >
              {keyVisuals.map((keyVisual: any, index) => (
                <KeyVisualsCard keyVisual={keyVisual} index={index} key={index} />
              ))}
            </ToggleGroup>
          )}
        </div>
      </div>
      <div className="flex justify-center gap-4">
        <Button variant="outline" className="w-fit" type="button" onClick={() => get5MoreVisuals({ keywords, websites, onSetWebsites, setLoadingGenerate })} disabled={loadingGenerate}>
          Show 5 More
        </Button>
        <Button onClick={() => submitStep3({ selectedVisuals, keyVisuals, onSetSuggestions, onSetCompetitorStrategy, onNext, setLoadingSubmit })} disabled={loadingSubmit || selectedVisuals.length < 3}>
          {loadingSubmit && <Spinner className="w-3 h-3" />}
          Next
        </Button>
      </div>
    </div>
  );
};

export default Step3;
