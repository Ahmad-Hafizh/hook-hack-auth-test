'use client';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import React from 'react';

const Step2Skip = ({ onNext }: { onNext: () => void }) => {
  // const [selectedVisuals, setSelectedVisuals] = React.useState<boolean>(false);
  return (
    <div className="p-10 h-full flex flex-col gap-5 container justify-between">
      <div className=" flex flex-col gap-20">
        <div className="flex flex-col gap-4">
          <p className="text-lg">Step 2</p>
          <h1 className="text-3xl font-bold leading-none">Select 3 key visuals that matches your product/ services</h1>
        </div>
        <div className="overflow-x-scroll w-full">
          <div className="flex gap-8 w-fit items-start">
            <div className="flex flex-col gap-4 items-center justify-center pb-4 w-[700px] ">
              <h2 className="text-3xl mb-4 font-bold">Your Company</h2>
              <div className="flex flex-col gap-2 w-full items-start justify-center">
                <p>Key message - This will help with making up Hooks for your video</p>
                <div className="p-4 border border-black cursor-pointer w-full h-[175px] flex flex-col items-start justify-center">
                  <p>This area, u would be able to edit</p>
                </div>
              </div>
              <div className="flex flex-col gap-2 w-full items-start justify-center">
                <p>3 strong points - This will help with making up the Body part for your video</p>
                <div className="p-4 border border-black cursor-pointer w-full h-[400px] flex flex-col items-start justify-center">
                  <p>This area, u would be able to edit</p>
                </div>
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
                <div className="p-4 border border-black cursor-pointer w-full h-[175px] flex flex-col items-start justify-center">
                  <p>Suggestion</p>
                </div>
              </div>
              <div className="flex flex-col gap-2 w-full items-start justify-center">
                <p className="opacity-0">..</p>
                <div className="p-4 border border-black cursor-pointer w-full h-[400px] flex flex-col items-start justify-center">
                  <p>Suggestion</p>
                </div>
              </div>
              <div className="flex gap-4 w-full items-center justify-center py-5">
                <input type="checkbox" />
                <Button>Edit This</Button>
              </div>
            </div>
            <div className="flex flex-col gap-4 items-center justify-center pb-4 w-[700px] ">
              <h2 className="text-3xl mb-4 font-bold">Competitor</h2>
              <div className="flex flex-col gap-2 w-full items-start justify-center">
                <p className="opacity-0">..</p>
                <div className="p-4 border border-black cursor-pointer w-full h-[175px] flex flex-col items-start justify-center">
                  <p>Key Messages</p>
                </div>
              </div>
              <div className="flex flex-col gap-2 w-full items-start justify-center">
                <p className="opacity-0">..</p>
                <div className="p-4 border border-black cursor-pointer w-full h-[400px] flex flex-col items-start justify-center">
                  <p>3 Strong Points</p>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-4 items-center justify-center pb-4 w-[700px] ">
              <h2 className="text-3xl mb-4 font-bold">Competitor</h2>
              <div className="flex flex-col gap-2 w-full items-start justify-center">
                <p className="opacity-0">..</p>
                <div className="p-4 border border-black cursor-pointer w-full h-[175px] flex flex-col items-start justify-center">
                  <p>Key Messages</p>
                </div>
              </div>
              <div className="flex flex-col gap-2 w-full items-start justify-center">
                <p className="opacity-0">..</p>
                <div className="p-4 border border-black cursor-pointer w-full h-[400px] flex flex-col items-start justify-center">
                  <p>3 Strong Points</p>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-4 items-center justify-center pb-4 w-[700px] ">
              <h2 className="text-3xl mb-4 font-bold">Competitor</h2>
              <div className="flex flex-col gap-2 w-full items-start justify-center">
                <p className="opacity-0">..</p>
                <div className="p-4 border border-black cursor-pointer w-full h-[175px] flex flex-col items-start justify-center">
                  <p>Key Messages</p>
                </div>
              </div>
              <div className="flex flex-col gap-2 w-full items-start justify-center">
                <p className="opacity-0">..</p>
                <div className="p-4 border border-black cursor-pointer w-full h-[400px] flex flex-col items-start justify-center">
                  <p>3 Strong Points</p>
                </div>
              </div>
            </div>
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

export default Step2Skip;
