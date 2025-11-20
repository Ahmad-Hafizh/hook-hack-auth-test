'use client';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import React from 'react';

const Step4 = ({ onNext, suggestions, competitorStrategy }: { onNext: () => void; suggestions: any; competitorStrategy: any }) => {
  return (
    <div className="px-10 h-full flex flex-col gap-5 container justify-between">
      <div className=" flex flex-col gap-20">
        <div className="overflow-x-scroll w-full">
          <div className="flex gap-8 w-fit items-start">
            <div className="flex flex-col gap-4 items-center justify-center pb-4 w-[700px] ">
              <h2 className="text-3xl mb-4 font-bold">Your Company</h2>
              <div className="flex flex-col gap-2 w-full items-start justify-center">
                <p>Key message - This will help with making up Hooks for your video</p>
                <Textarea className="w-full py-4 px-6 text-2xl border border-black h-[175px] focus-visible:ring-0" defaultValue={'This area, u would be able to edit'} />
              </div>
              <div className="flex flex-col gap-2 w-full items-start justify-center">
                <p>3 strong points - This will help with making up the Body part for your video</p>
                <Textarea className="w-full py-4 px-6 text-2xl border border-black h-[400px] focus-visible:ring-0" defaultValue={'This area, u would be able to edit'} />
              </div>
              <div className="flex gap-4 w-full items-center justify-center py-5">
                <input type="checkbox" />
                <Button>Edit This</Button>
              </div>
            </div>
            <div className="flex flex-col gap-4 items-center justify-center pb-4 w-[700px] ">
              <h2 className="text-3xl mb-4 font-bold">AI Suggestion</h2>
              <div className="flex flex-col gap-2 w-full items-start justify-center">
                <p className="opacity-0">..</p>
                <div className="py-4 px-6 border border-black w-full h-[175px] flex flex-col items-start justify-center rounded-lg">
                  <p className="text-2xl font-semibold">{suggestions.key_message}</p>
                </div>
              </div>
              <div className="flex flex-col gap-2 w-full items-start justify-center">
                <p className="opacity-0">..</p>
                <div className="py-4 px-6 border border-black w-full h-[400px] flex flex-col items-start justify-center rounded-lg ">
                  <ol className="list-decimal list-inside text-xl font-medium">
                    {suggestions.strong_points.map((point: string, index: number) => (
                      <li key={index}>{point}</li>
                    ))}
                  </ol>
                </div>
              </div>
              <div className="flex gap-4 w-full items-center justify-center py-5">
                <input type="checkbox" />
                <Button>Edit This</Button>
              </div>
            </div>
            {competitorStrategy.map((competitor: any, index: number) => (
              <div className="flex flex-col gap-4 items-center justify-center pb-4 w-[700px]">
                <h2 className="text-3xl mb-4 font-bold">Competitor</h2>
                <div className="flex flex-col gap-2 w-full items-start justify-center">
                  <p className="opacity-0">..</p>
                  <div className="py-4 px-6 border border-black w-full h-[175px] flex flex-col items-start justify-center rounded-lg">
                    <p className="text-2xl font-semibold">{competitor.key_message}</p>
                  </div>
                </div>
                <div className="flex flex-col gap-2 w-full items-start justify-center">
                  <p className="opacity-0">..</p>
                  <div className="py-4 px-6 border border-black w-full h-[400px] flex flex-col items-start justify-center rounded-lg ">
                    <ol className="list-decimal list-inside text-xl font-medium">
                      {competitor.strong_points.map((point: string, index: number) => (
                        <li key={index}>{point}</li>
                      ))}
                    </ol>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* <div className="flex justify-center gap-4">
        <button className="border border-black bg-black text-white px-4 py-2" onClick={onNext}>
          Next
        </button>
      </div> */}
    </div>
  );
};

export default Step4;
