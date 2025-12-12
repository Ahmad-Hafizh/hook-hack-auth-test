import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Spinner } from '@/components/ui/spinner';
import { JapaneseYen } from 'lucide-react';
import React from 'react';
import { submitStep1 } from '../hooks/useFetchAPINext';
import { useParams } from 'next/navigation';
import { useDataContext } from '../hooks/useDataContext';

const Step1 = ({ onNext }: { onNext: () => void }) => {
  const { sessionId } = useParams();
  const [loading, setLoading] = React.useState(false);
  const [budget, setBudget] = React.useState<number | undefined>(undefined);
  const { onSetPlan } = useDataContext();

  return (
    <div className="px-10 h-full flex flex-col gap-5 container justify-between">
      <div className=" flex flex-col gap-20">
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-bold leading-tight">
            動画の​訴求内容が​決まったので、
            <br />
            ​どのような​訴求方​法で​動画に​するか​決めて​いきましょう。​
          </h1>
        </div>
        <div className="flex flex-col gap-2">
          <p>月額動画​広告予算を​入力</p>
          <div className="relative flex items-center">
            <JapaneseYen className="absolute  text-gray-500 w-4 h-4 left-2" />
            <Input type="number" placeholder="Enter your monthly budget" className="border pl-8 pr-4 py-2 w-[500px]" defaultValue={budget} min={0} onChange={(e) => setBudget(Number(e.target.value))} />
          </div>
        </div>
      </div>
      <div className="flex justify-end">
        <Button onClick={() => submitStep1({ setLoading, onNext, budget: budget ?? 0, onSetPlan, sessionId: sessionId as string })} disabled={loading} className="border-2 border-rose-600 bg-rose-600  hover:bg-rose-500 text-white px-4 py-2">
          {loading && <Spinner className="w-3 h-3" />}
          次に​進む
        </Button>
      </div>
    </div>
  );
};

export default Step1;
