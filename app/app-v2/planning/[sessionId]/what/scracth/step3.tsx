'use client';
import { Button } from '@/components/ui/button';
import { ToggleGroup } from '@/components/ui/toggle-group';
import React, { useEffect } from 'react';
import KeyVisualsCard from '../components/keyVisualsCard';
import { generateScreenshot, get5MoreVisuals, submitStep3 } from '../hooks/useFetchApi';
import { Spinner } from '@/components/ui/spinner';
import { IBriefPlanning, IWebsites } from '../hooks/useStepData';

const Step3 = ({
  onNext,
  onPrev,
  websites,
  onSetWebsites,
  keywords,
  setBriefPlanning,
  selectedKeywords,
}: {
  onNext: () => void;
  onPrev: () => void;
  websites: IWebsites[];
  onSetWebsites: (websites: IWebsites[]) => void;
  keywords: { term: string }[];
  setBriefPlanning: React.Dispatch<React.SetStateAction<IBriefPlanning>>;
  selectedKeywords: string;
}) => {
  const [selectedVisuals, setSelectedVisuals] = React.useState<string[]>([]);
  const [generatedVisuals, setGeneratedVisuals] = React.useState(0);
  const [loadingSubmit, setLoadingSubmit] = React.useState(false);
  const [loadingGenerate, setLoadingGenerate] = React.useState(false);
  const [loadingGenerateVisual, setLoadingGenerateVisual] = React.useState(true);
  const [keyVisuals, setKeyVisuals] = React.useState<any[]>([]);

  useEffect(() => {
    if (generatedVisuals === 0) {
      generateScreenshot({ websites, setKeyVisuals, setLoadingGenerateVisual, keyVisuals });
      setGeneratedVisuals(generatedVisuals + websites.length);
    } else if (generatedVisuals < websites.length) {
      const newWebsites = websites.slice(generatedVisuals);
      generateScreenshot({ websites: newWebsites, setKeyVisuals, setLoadingGenerateVisual, keyVisuals });
      setGeneratedVisuals(websites.length);
    }
  }, [websites]);

  return (
    <div className="px-10 h-full flex flex-col gap-5 container justify-between">
      <div className=" flex flex-col gap-10 h-full py-10">
        <div className="flex flex-col gap-4">
          <h1 className="text-2xl font-bold leading-none">プロダクト／サービスに​合う​キービジュアルを​3つ​選んでください​</h1>
          <Button variant="outline" className="w-fit" onClick={onPrev} type="button" disabled={loadingSubmit || loadingGenerate || loadingGenerateVisual}>
            ＜ キーワードを​選び直す
          </Button>
        </div>
        {loadingGenerateVisual ? (
          <div className="flex gap-4 w-full h-full pb-4 justify-center items-center">
            <Spinner className="w-6 h-6" />
            <p>キービジュアルを生成中...</p>
          </div>
        ) : (
          <div className="overflow-x-scroll w-full">
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
          </div>
        )}
      </div>
      <div className="flex justify-center gap-4">
        <Button variant="outline" className="w-fit" type="button" onClick={() => get5MoreVisuals({ selectedKeywords, websites, onSetWebsites, setLoadingGenerate })} disabled={loadingSubmit || loadingGenerate || loadingGenerateVisual}>
          さらに​5件表示する​
        </Button>
        <Button
          onClick={() => submitStep3({ selectedVisuals, keyVisuals, setBriefPlanning, onNext, setLoadingSubmit })}
          disabled={loadingSubmit || selectedVisuals.length < 3}
          className=" border-2 border-rose-600 bg-rose-600  hover:bg-rose-500 text-white px-4 py-2"
        >
          {loadingSubmit && <Spinner className="w-3 h-3" />}
          次に​進む
        </Button>
      </div>
    </div>
  );
};

export default Step3;
