import React from 'react';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import Image from 'next/image';
import { Button } from '@/components/ui/button';

const Step4 = () => {
  const [loading, setLoading] = React.useState(false);

  const submitStep4 = async () => {
    setLoading(true);
    try {
      setTimeout(() => {}, 1000);
      console.log('called');
    } catch (error) {
      console.error('Error submitting Step 4:', error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="px-10 h-full flex flex-col gap-5 container justify-between">
      <div className="flex flex-col gap-5">
        <h2 className="text-2xl font-semibold">Select your preferred distribution channels</h2>
        <p> Select 8 element, multiple checks per element will lead to more patterns being tested</p>
      </div>

      <div className="overflow-scroll w-full h-full ">
        <div className="flex w-fit gap-20 justify-start items-start ">
          <div className="flex flex-col gap-4">
            <p className="font-bold text-lg">Brand Logo</p>
            <RadioGroup defaultValue="option-one" className="gap-4">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value={`brand logo`} id={`brand-logo`} />
                <div className="relative flex items-center">
                  <Image src="/planning_test_image.jpg" alt={`brand logo image`} width={200} height={200} className="inline-block mr-2" />
                  <Button variant={'outline'}>Upload</Button>
                </div>
              </div>
            </RadioGroup>
          </div>
          <div className="flex flex-col gap-4">
            <p className="font-bold text-lg">BGM</p>
            <RadioGroup defaultValue="option-one" className="gap-4">
              {Array.from({ length: 3 }).map((_, index) => (
                <div className="flex items-center space-x-2 " key={index}>
                  <RadioGroupItem value={`hook-option-${index + 1}`} id={`hook-option-${index + 1}`} />
                  <Label htmlFor={`hook-option-${index + 1}`} className="text-base">
                    BGM option {index + 1}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>
          <div className="flex flex-col gap-4">
            <p className="font-bold text-lg">Background Color</p>
            <RadioGroup defaultValue="option-one" className="gap-4">
              {Array.from({ length: 10 }).map((_, index) => (
                <div className="flex items-center space-x-2 " key={index}>
                  <RadioGroupItem value={`hook-option-${index + 1}`} id={`hook-option-${index + 1}`} />
                  <Label htmlFor={`hook-option-${index + 1}`} className="text-base">
                    Background Color option {index + 1}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>
          <div className="flex flex-col gap-4">
            <p className="font-bold text-lg">Font</p>
            <RadioGroup defaultValue="option-one" className="gap-4">
              {Array.from({ length: 2 }).map((_, index) => (
                <div className="flex items-center space-x-2 " key={index}>
                  <RadioGroupItem value={`hook-option-${index + 1}`} id={`hook-option-${index + 1}`} />
                  <Label htmlFor={`hook-option-${index + 1}`} className="text-base">
                    Body 3 Message option {index + 1}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <button onClick={submitStep4} disabled={loading} className="border border-black bg-black text-white px-4 py-2">
          {loading && <span className="loader mr-2"></span>}
          Generate
        </button>
      </div>
    </div>
  );
};

export default Step4;
