'use client';
import { Button } from '@/components/ui/button';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import Image from 'next/image';
import React from 'react';

const Step3 = ({ onNext, onPrev }: { onNext: () => void; onPrev: () => void }) => {
  const [selectedVisuals, setSelectedVisuals] = React.useState<boolean>(false);
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
          <ToggleGroup type="multiple" className="gap-4 w-fit pb-4">
            {Array.from({ length: selectedVisuals ? 10 : 5 }).map((_, index) => (
              <ToggleGroupItem value={`competitor-${index}`} className="border-2 p-4 h-fit w-fit flex-col gap-2 rounded-xl data-[state=on]:bg-rose-50 data-[state=on]:border-rose-200" variant="outline" key={index}>
                <div className="flex flex-col items-start w-full gap-2 ">
                  <p className="text-lg font-semibold leading-none">Key Visuals of Competitor</p>
                  <p className="text-sm font-semibold text-gray-500 leading-none">https://competitor.com</p>
                </div>
                <div className="w-[600px] h-[400px] relative">
                  {/* <Skeleton className="w-full h-full" /> */}
                  <Image fill src={'/planning_test_image.jpg'} alt="test-img-meta" className="absolute object-cover rounded" />
                </div>
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
        </div>
      </div>
      <div className="flex justify-center gap-4">
        <Button variant="outline" className="w-fit" onClick={() => setSelectedVisuals(true)}>
          Show 5 More
        </Button>
        <Button onClick={onNext}>Next</Button>
      </div>
    </div>
  );
};

export default Step3;
