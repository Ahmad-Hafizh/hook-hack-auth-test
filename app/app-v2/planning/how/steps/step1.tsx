import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Spinner } from '@/components/ui/spinner';
import { JapaneseYen } from 'lucide-react';
import React from 'react';
import { submitStep1 } from '../hooks/useFetchApi';

const Step1 = ({ onNext }: { onNext: () => void }) => {
  const [loading, setLoading] = React.useState(false);
  const [budget, setBudget] = React.useState(0);

  return (
    <div className="px-10 h-full flex flex-col gap-5 container justify-between">
      <div className=" flex flex-col gap-20">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold leading-none">INPUT MONTHLY BUDGET</h1>
          <p>We will use this to calculate your terms of test later on!!</p>
        </div>
        <div className="flex flex-col gap-2">
          <p>BUDGET PER MONTH</p>
          <div className="relative flex items-center">
            <JapaneseYen className="absolute  text-gray-500 w-4 h-4 left-2" />
            <Input type="number" placeholder="Enter your monthly budget" className="border pl-8 pr-4 py-2 w-[500px]" value={budget} onChange={(e) => setBudget(Number(e.target.value))} />
          </div>
        </div>
      </div>
      <div className="flex justify-end">
        <Button className="border border-black bg-black text-white px-4 py-2" onClick={() => submitStep1({ setLoading, onNext, budget })} disabled={loading}>
          {loading && <Spinner className="w-3 h-3" />} Next
        </Button>
      </div>
    </div>
  );
};

export default Step1;
