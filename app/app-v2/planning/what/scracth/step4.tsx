'use client';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import React from 'react';
import KeyMessageCard from '../components/keyMessageCard';

const Step4 = ({ suggestions, competitorStrategy }: { suggestions: any; competitorStrategy: any }) => {
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
            <KeyMessageCard key_message={suggestions.key_message} strong_points={suggestions.strong_points} title="AI Suggestion" />
            {competitorStrategy.map((competitor: any, index: number) => (
              <KeyMessageCard key_message={competitor.key_message} strong_points={competitor.strong_points} title="Competitor" key={index} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Step4;
