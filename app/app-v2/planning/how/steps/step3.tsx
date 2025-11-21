import React from 'react';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { submitStep3 } from '../hooks/useFetchApi';

const Step3 = ({ onNext }: { onNext: () => void }) => {
  const [loading, setLoading] = React.useState(false);

  return (
    <div className="px-10 h-full flex flex-col gap-5 container justify-between">
      <div className="flex flex-col gap-5">
        <h2 className="text-2xl font-semibold">Select your preferred distribution channels</h2>
        <p> Select 8 element, multiple checks per element will lead to more patterns being tested</p>
      </div>

      <div className="overflow-scroll w-full h-full ">
        <div className="flex w-fit gap-20 justify-start items-start ">
          <div className="flex flex-col gap-4">
            <p className="font-bold text-lg">Hook</p>
            <RadioGroup defaultValue="option-one" className="gap-4">
              {Array.from({ length: 10 }).map((_, index) => (
                <div className="flex items-center space-x-2 " key={index}>
                  <RadioGroupItem value={`hook-option-${index + 1}`} id={`hook-option-${index + 1}`} />
                  <Label htmlFor={`hook-option-${index + 1}`} className="text-base">
                    Hook option {index + 1}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>
          <div className="flex flex-col gap-4">
            <p className="font-bold text-lg">Body 1 image :7cm increase in height</p>
            <RadioGroup defaultValue="option-one" className="gap-4">
              {Array.from({ length: 5 }).map((_, index) => (
                <div className="flex items-center space-x-2" key={index}>
                  <RadioGroupItem value={`hook-option-${index + 1}`} id={`hook-option-${index + 1}`} />
                  <div className="relative flex items-center">
                    <Image src="/planning_test_image.jpg" alt={`hook option ${index + 1} image`} width={200} height={200} className="inline-block mr-2" />
                    <Button variant={'outline'}>Upload</Button>
                  </div>
                </div>
              ))}
            </RadioGroup>
          </div>
          <div className="flex flex-col gap-4">
            <p className="font-bold text-lg">Body 1 Message :7cm increase in height</p>
            <RadioGroup defaultValue="option-one" className="gap-4">
              {Array.from({ length: 10 }).map((_, index) => (
                <div className="flex items-center space-x-2 " key={index}>
                  <RadioGroupItem value={`hook-option-${index + 1}`} id={`hook-option-${index + 1}`} />
                  <Label htmlFor={`hook-option-${index + 1}`} className="text-base">
                    Body 1 Message option {index + 1}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>
          <div className="flex flex-col gap-4">
            <p className="font-bold text-lg">Body 2 Image :Unique and premium design</p>
            <RadioGroup defaultValue="option-one" className="gap-4">
              {Array.from({ length: 5 }).map((_, index) => (
                <div className="flex items-center space-x-2" key={index}>
                  <RadioGroupItem value={`hook-option-${index + 1}`} id={`hook-option-${index + 1}`} />
                  <div className="relative flex items-center">
                    <Image src="/planning_test_image.jpg" alt={`hook option ${index + 1} image`} width={200} height={200} className="inline-block mr-2" />
                    <Button variant={'outline'}>Upload</Button>
                  </div>
                </div>
              ))}
            </RadioGroup>
          </div>
          <div className="flex flex-col gap-4">
            <p className="font-bold text-lg">Body 2 Message :Unique and premium design</p>
            <RadioGroup defaultValue="option-one" className="gap-4">
              {Array.from({ length: 10 }).map((_, index) => (
                <div className="flex items-center space-x-2 " key={index}>
                  <RadioGroupItem value={`hook-option-${index + 1}`} id={`hook-option-${index + 1}`} />
                  <Label htmlFor={`hook-option-${index + 1}`} className="text-base">
                    Body 2 Message option {index + 1}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>
          <div className="flex flex-col gap-4">
            <p className="font-bold text-lg">Body 3 Image :Lightweight and comfortable to walk in</p>
            <RadioGroup defaultValue="option-one" className="gap-4">
              {Array.from({ length: 5 }).map((_, index) => (
                <div className="flex items-center space-x-2" key={index}>
                  <RadioGroupItem value={`hook-option-${index + 1}`} id={`hook-option-${index + 1}`} />
                  <div className="relative flex items-center">
                    <Image src="/planning_test_image.jpg" alt={`hook option ${index + 1} image`} width={200} height={200} className="inline-block mr-2" />
                    <Button variant={'outline'}>Upload</Button>
                  </div>
                </div>
              ))}
            </RadioGroup>
          </div>
          <div className="flex flex-col gap-4">
            <p className="font-bold text-lg">Body 3 Message :Lightweight and comfortable to walk in</p>
            <RadioGroup defaultValue="option-one" className="gap-4">
              {Array.from({ length: 10 }).map((_, index) => (
                <div className="flex items-center space-x-2 " key={index}>
                  <RadioGroupItem value={`hook-option-${index + 1}`} id={`hook-option-${index + 1}`} />
                  <Label htmlFor={`hook-option-${index + 1}`} className="text-base">
                    Body 3 Message option {index + 1}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>
          <div className="flex flex-col gap-4">
            <p className="font-bold text-lg">CTA</p>
            <RadioGroup defaultValue="option-one" className="gap-4">
              {Array.from({ length: 10 }).map((_, index) => (
                <div className="flex items-center space-x-2 " key={index}>
                  <RadioGroupItem value={`hook-option-${index + 1}`} id={`hook-option-${index + 1}`} />
                  <Label htmlFor={`hook-option-${index + 1}`} className="text-base">
                    CTA option {index + 1}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <button onClick={() => submitStep3({ setLoading, onNext })} disabled={loading} className="border border-black bg-black text-white px-4 py-2">
          {loading && <span className="loader mr-2"></span>}
          Next
        </button>
      </div>
    </div>
  );
};

export default Step3;
