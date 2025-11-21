import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import React from 'react';
import { submitStep2 } from '../hooks/useFetchApi';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const Step2 = ({ onNext }: { onNext: () => void }) => {
  const [loading, setLoading] = React.useState(false);

  return (
    <div className="px-10 h-full flex flex-col gap-5 container justify-between">
      <div className="flex flex-col gap-5">
        <h2 className="text-2xl font-semibold">Which video style you would like to use</h2>
      </div>
      <RadioGroup className="flex gap-20 justify-center items-center ">
        {Array.from({ length: 3 }).map((_, index) => (
          <Card key={index} className="flex flex-col gap-4 h-full justify-center items-center ">
            <Label htmlFor={`pattern${index + 1}`} className="text-lg font-bold">
              <CardHeader className="p-4 text-center">
                <CardTitle>Pattern {index + 1}</CardTitle>
              </CardHeader>
              <CardContent className="px-4 py-0">
                <img src="/planning_test_image.jpg" alt={`pattern ${index + 1} image`} className="w-60 aspect-[9/16] object-cover rounded-lg " />
              </CardContent>
            </Label>
            <RadioGroupItem value={`pattern${index + 1}`} id={`pattern${index + 1}`} className="data-[state=checked]:text-cyan-300  data-[state=checked]:border-cyan-500 border-rose-600 mb-4" fill="fill-cyan-300" />
          </Card>
        ))}
      </RadioGroup>
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
