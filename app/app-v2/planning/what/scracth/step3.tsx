'use client';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import callAppV2Api from '@/config/axios/axiosAppV2';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect } from 'react';

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

  const get5MoreVisuals = async () => {
    setLoadingGenerate(true);
    try {
      const { data } = await callAppV2Api.post('/v1/websites', {
        keywords: keywords.map((k) => k.term),
        limit: 5,
      });

      console.log('Get more key visual success', data);
      onSetWebsites([...websites, ...data.websites]);
    } catch (error) {
      console.error('Error submitting get additional key visuals:', error);
    } finally {
      setLoadingGenerate(false);
    }
  };

  const generateScreenshot = async () => {
    setLoadingGenerateVisual(true);
    try {
      const { data } = await callAppV2Api.post('/v1/websites/screenshot', {
        urls: websites.map((website) => website.url),
      });

      console.log('Screenshot generated successfully:', data);
      setKeyVisuals(data.items);
    } catch (error) {
      console.error('Error generating screenshot:', error);
    } finally {
      setLoadingGenerateVisual(false);
    }
  };

  useEffect(() => {
    generateScreenshot();
  }, [websites]);

  const submitStep3 = async () => {
    setLoadingSubmit(true);
    try {
      const selectedVisualsData = keyVisuals.filter((keyVisual) => selectedVisuals.includes(keyVisual.url));
      const competitors = selectedVisualsData.map((visual) => {
        return {
          url: visual.url,
          title: visual.title,
          meta_description: visual.meta_description,
          hero_text: {
            headline: 'string',
            subhead: 'string',
            cta: 'string',
          },
        };
      });
      const { data } = await callAppV2Api.post('/v1/key-message', {
        competitors,
        provider: 'openai',
        language: 'en',
        brand_hint: 'string',
        audience: 'string',
        tone: 'professional',
      });

      console.log('Step 3 submitted successfully:', data);
      onSetSuggestions(data.suggestion);
      onSetCompetitorStrategy(data.competitors);
      onNext();
    } catch (error) {
      console.error('Error submitting Step 3:', error);
    } finally {
      setLoadingSubmit(false);
    }
  };

  return (
    <div className="px-10 h-full flex flex-col gap-5 container justify-between">
      <div className=" flex flex-col gap-10">
        <div className="flex flex-col gap-4">
          <p className="text-lg">Step 3</p>
          <h1 className="text-3xl font-bold leading-none">Select 3 key visuals that matches your product/ services</h1>
          <Button variant="outline" className="w-fit" onClick={onPrev}>
            Change Keyword
          </Button>
        </div>
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
            {!loadingGenerateVisual ? (
              keyVisuals.map((keyVisual: any, index) => {
                return keyVisual.status == 'ok' ? (
                  <ToggleGroupItem value={keyVisual.url} className="border-2 p-2 h-fit w-fit flex-col gap-2 rounded-xl data-[state=on]:bg-cyan-50 data-[state=on]:border-cyan-200" variant="outline" key={index}>
                    <div className="w-[600px] h-[400px] relative rounded-lg overflow-hidden">
                      {/* <Skeleton className="w-full h-full" /> */}
                      {keyVisual.screenshot && keyVisual.screenshot.link ? <Image fill src={keyVisual.screenshot.link} alt={keyVisual.meta_description} className="absolute object-cover" /> : <Skeleton className="w-full h-full" />}
                    </div>
                    <div className="flex flex-col items-start w-full gap-2 p-2 text-start max-w-[600px]">
                      {keyVisual.text ? <h2 className="text-lg font-semibold leading-tight">{keyVisual.texts.h1 || ''}</h2> : <h2 className="text-lg font-semibold leading-tight">Title not available</h2>}
                      <div className="flex flex-col items-start">
                        {keyVisual.title ? <p className="text-xs text-gray-500">{keyVisual.title || ''}</p> : <p className="text-xs text-gray-500">description not available</p>}
                        <a className="text-xs  text-gray-500 leading-none" href={keyVisual.url || ''} target="blank">
                          {keyVisual.url || ''}
                        </a>
                      </div>
                    </div>
                  </ToggleGroupItem>
                ) : (
                  <ToggleGroupItem value={keyVisual.url} className="border-2 p-2 h-fit w-fit flex-col gap-2 rounded-xl data-[state=on]:bg-cyan-50 data-[state=on]:border-cyan-200" variant="outline" key={index}>
                    <p className="w-[600px] min-h-[500px] h-full flex flex-col justify-center items-center border-2 rounded-lg p-4 text-center ">
                      {keyVisual.status} by {keyVisual.url}
                    </p>
                  </ToggleGroupItem>
                );
              })
            ) : (
              <Skeleton className="w-full h-[400px]" />
            )}
          </ToggleGroup>
        </div>
      </div>
      <div className="flex justify-center gap-4">
        <Button variant="outline" className="w-fit" type="button" onClick={get5MoreVisuals} disabled={loadingGenerate}>
          Show 5 More
        </Button>
        <Button onClick={submitStep3} disabled={loadingSubmit}>
          Next
        </Button>
      </div>
    </div>
  );
};

export default Step3;
