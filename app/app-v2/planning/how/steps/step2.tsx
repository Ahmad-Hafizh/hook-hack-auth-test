import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import React from 'react';
import { submitStep2 } from '../hooks/useFetchApi';

const Step2 = ({ onNext }: { onNext: () => void }) => {
  const [loading, setLoading] = React.useState(false);

  return (
    <div className="px-10 h-full flex flex-col gap-5 container justify-between">
      <div className="flex flex-col gap-5">
        <h2 className="text-2xl font-semibold">Which video style you would like to use</h2>
      </div>
      <div className="flex gap-20 justify-center items-center h-full">
        {Array.from({ length: 3 }).map((_, index) => (
          <div className="flex flex-col gap-4 h-full justify-center items-center" key={index}>
            <p className="text-xl font-semibold">Pattern {index + 1}</p>
            <div className="relative h-full">
              <img src="/planning_test_image.jpg" alt={`pattern ${index + 1} image`} className="w-52 h-full object-cover rounded-lg " />
            </div>
            <input type="checkbox" />
          </div>
        ))}
      </div>
      <div className="flex justify-end">
        <Button onClick={() => submitStep2({ setLoading, onNext })} disabled={loading}>
          {loading && <Spinner />}
          Next
        </Button>
      </div>
    </div>
  );
};

export default Step2;
