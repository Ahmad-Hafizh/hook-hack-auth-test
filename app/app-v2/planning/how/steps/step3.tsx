import React from 'react';
import { Label } from '@/components/ui/label';
import { CustomCheckboxItem, CustomCheckboxGroup } from '../components/customCheckbox';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { submitStep3 } from '../hooks/useFetchApi';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Spinner } from '@/components/ui/spinner';
import { Infinity } from 'lucide-react';
import TopHorizontalProgress from '../../what/components/topHorizontalProgress';
import { IElements } from '../hooks/useStepData';

const Step3 = ({ onNext, plan, elements, onSetElements }: { onNext: () => void; plan: any; elements: IElements; onSetElements: any }) => {
  const [loading, setLoading] = React.useState(false);

  const { hooks, body1Images, body1Messages, body2Images, body2Messages, body3Images, body3Messages, ctas } = elements;

  const [patternCount, setPatternCount] = React.useState<number>(0);
  const [patternCombinations, setPatternCombinations] = React.useState<string[][]>([]);

  // Generate all pattern combinations using cartesian product
  const generateCombinations = (arrays: string[][]): string[][] => {
    if (arrays.length === 0) return [[]];

    const [first, ...rest] = arrays;
    const restCombinations = generateCombinations(rest);

    const combinations: string[][] = [];
    for (const item of first) {
      for (const restCombo of restCombinations) {
        combinations.push([item, ...restCombo]);
      }
    }

    return combinations;
  };

  // Calculate pattern combinations whenever selections change
  React.useEffect(() => {
    const calculatePatterns = () => {
      // Prepare arrays, use placeholder if empty
      const categories = [
        hooks.length > 0 ? hooks : ['default-hook'],
        body1Images.length > 0 ? body1Images : ['default-body1-image'],
        body1Messages.length > 0 ? body1Messages : ['default-body1-message'],
        body2Images.length > 0 ? body2Images : ['default-body2-image'],
        body2Messages.length > 0 ? body2Messages : ['default-body2-message'],
        body3Images.length > 0 ? body3Images : ['default-body3-image'],
        body3Messages.length > 0 ? body3Messages : ['default-body3-message'],
        ctas.length > 0 ? ctas : ['default-cta'],
      ];

      // Generate all combinations
      const combinations = generateCombinations(categories);

      setPatternCombinations(combinations);
      setPatternCount(combinations.length);
    };

    calculatePatterns();
  }, [elements]);

  const onValueChange = (category: keyof IElements, value: string[]) => {
    if (patternCount < 8 || value.length < elements[category].length) {
      onSetElements({ ...elements, [category]: value });
    }
  };

  return (
    <div className="px-10 h-full flex flex-col gap-5 container justify-between">
      <div className="flex flex-col items-center gap-4 mb-10">
        <div className="flex gap-4 text-2xl font-bold">
          <p>{patternCount} Pattern</p>
          <p>{plan?.test_term_weeks || 0} Weeks</p>
        </div>
        <div className="flex flex-col gap-4 items-center justify-center">
          <p className="text-sm flex items-center gap-2 leading-none">
            <Infinity className="w-5 h-5" /> Pattern <Infinity className="w-5 h-5" /> Weeks to test is recommended
          </p>
          <TopHorizontalProgress pageStep={8} step={0} />
        </div>
      </div>
      <div className="flex flex-col ">
        <h2 className="text-2xl font-semibold">Select your preferred distribution channels</h2>
        <p> Select 8 element, multiple checks per element will lead to more patterns being tested</p>
      </div>

      <div className=" w-full h-full ">
        <div className="flex flex-col w-full gap-10 ">
          <Card>
            <CardHeader>
              <CardTitle>Hooks</CardTitle>
              <CardDescription> </CardDescription>
            </CardHeader>
            <CardContent>
              <CustomCheckboxGroup className="gap-5" value={hooks} onValueChange={(value) => onValueChange('hooks', value)}>
                {Array.from({ length: 10 }).map((_, index) => (
                  <div className="flex items-center space-x-2 " key={index}>
                    <CustomCheckboxItem id={`hook-option-${index + 1}`} value={`hook-option-${index + 1}`} />
                    <Label htmlFor={`hook-option-${index + 1}`} className="text-base cursor-pointer">
                      Hook option {index + 1}
                    </Label>
                  </div>
                ))}
              </CustomCheckboxGroup>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Body 1 Image</CardTitle>
              <CardDescription>7cm increase in height</CardDescription>
            </CardHeader>
            <CardContent>
              <CustomCheckboxGroup className="gap-10 flex-row" value={body1Images} onValueChange={(value) => onValueChange('body1Images', value)}>
                {Array.from({ length: 5 }).map((_, index) => (
                  <div className="flex items-center space-x-2" key={index}>
                    <CustomCheckboxItem id={`body1-image-${index + 1}`} value={`body1-image-${index + 1}`} />
                    <div className="relative flex items-center w-fit">
                      <Image src="/planning_test_image.jpg" alt={`hook option ${index + 1} image`} width={200} height={200} className="inline-block mr-2 rounded-md" />
                      <Button variant={'outline'}>Upload</Button>
                    </div>
                  </div>
                ))}
              </CustomCheckboxGroup>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Body 1 Message</CardTitle>
              <CardDescription>7cm increase in height</CardDescription>
            </CardHeader>
            <CardContent>
              <CustomCheckboxGroup className="gap-5" value={body1Messages} onValueChange={(value) => patternCount <= 8 && onSetElements({ ...elements, body1Messages: value })}>
                {Array.from({ length: 10 }).map((_, index) => (
                  <div className="flex items-center space-x-2 " key={index}>
                    <CustomCheckboxItem id={`body1-message-${index + 1}`} value={`body1-message-${index + 1}`} />
                    <Label htmlFor={`body1-message-${index + 1}`} className="text-base cursor-pointer">
                      Body 1 Message option {index + 1}
                    </Label>
                  </div>
                ))}
              </CustomCheckboxGroup>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Body 2 Image</CardTitle>
              <CardDescription>Unique and premium design</CardDescription>
            </CardHeader>
            <CardContent>
              <CustomCheckboxGroup className="gap-10 flex-row" value={body2Images} onValueChange={(value) => patternCount <= 8 && onSetElements({ ...elements, body2Images: value })}>
                {Array.from({ length: 5 }).map((_, index) => (
                  <div className="flex items-center space-x-2" key={index}>
                    <CustomCheckboxItem id={`body2-image-${index + 1}`} value={`body2-image-${index + 1}`} />
                    <div className="relative flex items-center">
                      <Image src="/planning_test_image.jpg" alt={`hook option ${index + 1} image`} width={200} height={200} className="inline-block mr-2 rounded-md" />
                      <Button variant={'outline'}>Upload</Button>
                    </div>
                  </div>
                ))}
              </CustomCheckboxGroup>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Body 2 Message</CardTitle>
              <CardDescription>Unique and premium design</CardDescription>
            </CardHeader>
            <CardContent>
              <CustomCheckboxGroup className="gap-5" value={body2Messages} onValueChange={(value) => patternCount <= 10 && onSetElements({ ...elements, body2Messages: value })}>
                {Array.from({ length: 10 }).map((_, index) => (
                  <div className="flex items-center space-x-2 " key={index}>
                    <CustomCheckboxItem id={`body2-message-${index + 1}`} value={`body2-message-${index + 1}`} />
                    <Label htmlFor={`body2-message-${index + 1}`} className="text-base cursor-pointer">
                      Body 2 Message option {index + 1}
                    </Label>
                  </div>
                ))}
              </CustomCheckboxGroup>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Body 3 Image</CardTitle>
              <CardDescription>Lightweight and comfortable to walk in</CardDescription>
            </CardHeader>
            <CardContent>
              <CustomCheckboxGroup className="gap-10 flex-row" value={body3Images} onValueChange={(value) => patternCount <= 8 && onSetElements({ ...elements, body3Images: value })}>
                {Array.from({ length: 5 }).map((_, index) => (
                  <div className="flex items-center space-x-2" key={index}>
                    <CustomCheckboxItem id={`body3-image-${index + 1}`} value={`body3-image-${index + 1}`} />
                    <div className="relative flex items-center">
                      <Image src="/planning_test_image.jpg" alt={`hook option ${index + 1} image`} width={200} height={200} className="inline-block mr-2 rounded-md" />
                      <Button variant={'outline'}>Upload</Button>
                    </div>
                  </div>
                ))}
              </CustomCheckboxGroup>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Body 3 Message</CardTitle>
              <CardDescription>Lightweight and comfortable to walk in</CardDescription>
            </CardHeader>
            <CardContent>
              <CustomCheckboxGroup className="gap-5" value={body3Messages} onValueChange={(value) => patternCount <= 8 && onSetElements({ ...elements, body3Messages: value })}>
                {Array.from({ length: 10 }).map((_, index) => (
                  <div className="flex items-center space-x-2 " key={index}>
                    <CustomCheckboxItem id={`body3-message-${index + 1}`} value={`body3-message-${index + 1}`} />
                    <Label htmlFor={`body3-message-${index + 1}`} className="text-base cursor-pointer">
                      Body 3 Message option {index + 1}
                    </Label>
                  </div>
                ))}
              </CustomCheckboxGroup>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>CTA</CardTitle>
              <CardDescription> </CardDescription>
            </CardHeader>
            <CardContent>
              <CustomCheckboxGroup className="gap-5" value={ctas} onValueChange={(value) => patternCount <= 8 && onSetElements({ ...elements, ctas: value })}>
                {Array.from({ length: 10 }).map((_, index) => (
                  <div className="flex items-center space-x-2 " key={index}>
                    <CustomCheckboxItem id={`cta-${index + 1}`} value={`cta-${index + 1}`} />
                    <Label htmlFor={`cta-${index + 1}`} className="text-base cursor-pointer">
                      CTA option {index + 1}
                    </Label>
                  </div>
                ))}
              </CustomCheckboxGroup>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="flex justify-end">
        <Button onClick={() => submitStep3({ setLoading, onNext })} disabled={loading}>
          {loading && <Spinner />}
          Next
        </Button>
      </div>
    </div>
  );
};

export default Step3;
