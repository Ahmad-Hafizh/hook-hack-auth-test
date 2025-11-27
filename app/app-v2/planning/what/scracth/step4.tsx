'use client';
import { Button } from '@/components/ui/button';
import React from 'react';
import KeyMessageCard from '../components/keyMessageCard';
import { useRouter } from 'next/navigation';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

const Step4 = ({ suggestions, competitorStrategy }: { suggestions: any; competitorStrategy: any }) => {
  const router = useRouter();
  const [selectedOption, setSelectedOption] = React.useState('your-company');

  return (
    <div className="px-10 h-full flex flex-col gap-10 container justify-between">
      <div className="h-full flex justify-center items-center flex-col">
        <div className="w-full overflow-x-scroll pb-10">
          <div className="flex flex-row gap-8 w-fit items-start justify-start ">
            <RadioGroup value={selectedOption} onValueChange={setSelectedOption} className="gap-8 flex w-full">
              <KeyMessageCard key_message="Your Company" strong_points={['Strong Point 1', 'Strong Point 2', 'Strong Point 3']} title="Your Company" type="your-company" />

              <KeyMessageCard key_message={suggestions.key_message} strong_points={suggestions.strong_points} title="AI Suggestion" type="ai-suggestion" />
            </RadioGroup>
            {competitorStrategy.map((competitor: any, index: number) => (
              <KeyMessageCard key_message={competitor.key_message} strong_points={competitor.strong_points} title="Competitor" type="competitor" key={index} />
            ))}
          </div>
        </div>
      </div>
      <div className="flex justify-end">
        <Button
          type="button"
          className="w-fit"
          onClick={() => {
            localStorage.setItem(
              'planning-what-data',
              selectedOption === 'your-company' ? JSON.stringify({ key_message: 'Your Company', strong_points: ['Strong Point 1', 'Strong Point 2', 'Strong Point 3'] }) : JSON.stringify(suggestions)
            );
            router.push('/app-v2/planning/how');
          }}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default Step4;
