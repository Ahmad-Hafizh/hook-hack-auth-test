'use client';
import { Button } from '@/components/ui/button';
import React from 'react';
import KeyMessageCard from '../components/keyMessageCard';
import { useRouter } from 'next/navigation';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { IBriefPlanning } from '../hooks/useStepData';

const Step2Skip = ({ briefPlanning }: { briefPlanning: IBriefPlanning }) => {
  const router = useRouter();
  const [selectedOption, setSelectedOption] = React.useState('your-company');

  const [strongPoints, setStrongPoints] = React.useState<string[]>(briefPlanning.user.strong_points);
  const [keyMessage, setKeyMessage] = React.useState<string>(briefPlanning.user.key_message);

  const [suggestionStrongPoints, setSuggestionStrongPoints] = React.useState<string[]>(briefPlanning.suggestion.strong_points);
  const [suggestionKeyMessage, setSuggestionKeyMessage] = React.useState<string>(briefPlanning.suggestion.key_message);

  return (
    <div className="px-10 h-full flex flex-col gap-10 container justify-between">
      <div className="h-full flex justify-center items-center flex-col">
        <div className="w-full overflow-x-scroll pb-10">
          <div className="flex flex-row gap-8 w-fit items-start justify-start ">
            <RadioGroup value={selectedOption} onValueChange={setSelectedOption} className="gap-8 flex w-full">
              <KeyMessageCard key_message={keyMessage} strong_points={strongPoints} setStrongPoints={setStrongPoints} setKeyMessage={setKeyMessage} title="自社" type="your-company" />
              <KeyMessageCard key_message={suggestionKeyMessage} strong_points={suggestionStrongPoints} setStrongPoints={setSuggestionStrongPoints} setKeyMessage={setSuggestionKeyMessage} title="AI競合インサイト" type="ai-suggestion" />
            </RadioGroup>
            {briefPlanning.competitors.map((competitor: any, index: number) => (
              <KeyMessageCard key_message={competitor.key_message} strong_points={competitor.strong_points} title="競合" type="competitor" key={index} />
            ))}
          </div>
        </div>
      </div>
      <div className="flex justify-end">
        <Button
          onClick={async () => {
            localStorage.removeItem('planning-what-data');
            localStorage.setItem(
              'planning-what-data',
              selectedOption === 'your-company' ? JSON.stringify({ key_message: keyMessage, strong_points: strongPoints }) : JSON.stringify({ key_message: suggestionKeyMessage, strong_points: suggestionStrongPoints })
            );
            router.push('/app-v2/planning/how');
          }}
          className=" border-2 border-rose-600 bg-rose-600  hover:bg-rose-500 text-white px-4 py-2"
        >
          次に​進む
        </Button>
      </div>
    </div>
  );
};

export default Step2Skip;
