import React from 'react';
import { Label } from '@/components/ui/label';
import { CustomCheckboxItem, CustomCheckboxGroup } from '../components/customCheckbox';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { generateVariants, submitStep3 } from '../hooks/useFetchApi';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Spinner } from '@/components/ui/spinner';
import { Infinity } from 'lucide-react';
import { IElements, IPattern, IVariants } from '../hooks/useStepData';
import { generatePatternCombinations, calculatePatternCount, calculateValuePattern } from '../hooks/usePattern';
import ElementProgress from '../components/elementProgress';

const Step3 = ({
  onNext,
  plan,
  elements,
  onSetElements,
  onSetVariants,
  variants,
  patternCount,
  setPatternCount,
  patternCombinations,
  setPatternCombinations,
}: {
  onNext: () => void;
  plan: any;
  elements: IElements;
  onSetElements: any;
  onSetVariants: any;
  variants: any;
  patternCount: number;
  setPatternCount: React.Dispatch<React.SetStateAction<number>>;
  patternCombinations: IPattern[];
  setPatternCombinations: React.Dispatch<React.SetStateAction<IPattern[]>>;
}) => {
  const [loading, setLoading] = React.useState(false);
  const [loadingGenerate, setLoadingGenerate] = React.useState(true);

  const { hooks, body1Images, body1Messages, body2Images, body2Messages, body3Images, body3Messages, ctas } = elements;

  React.useEffect(() => {
    generateVariants({ setLoadingGenerate, onSetVariants });
  }, []);

  React.useEffect(() => {
    // Only calculate count, don't generate combinations on every change
    setPatternCount(calculatePatternCount(elements));
  }, [elements]);

  const onValueChange = (category: keyof IElements, value: string[]) => {
    if (patternCount < 10) {
      if (elements[category].length < 2) {
        if (calculateValuePattern(elements, category, value) <= 10) {
          onSetElements({ ...elements, [category]: value });
        }
      }
    } else if (value.length < elements[category].length) {
      // Allow deselecting even if over limit
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
            {plan?.videos_per_month ? <strong className="text-base">{plan.videos_per_month}</strong> : <Infinity className="w-5 h-5" />} Pattern
            {plan?.test_term_weeks ? <strong className="text-base">{plan.test_term_weeks}</strong> : <Infinity className="w-5 h-5" />} Weeks to test is recommended
          </p>
          <ElementProgress elements={elements} />
        </div>
      </div>
      <div className="flex flex-col ">
        <h2 className="text-2xl font-semibold">Select your preferred distribution channels</h2>
        <p> Select 8 element, multiple checks per element will lead to more patterns being tested</p>
      </div>

      <div className=" w-full h-full ">
        {loadingGenerate ? (
          <div className="w-full h-96 flex justify-center items-center">
            <Spinner /> Generating variants...
          </div>
        ) : (
          <div className="flex flex-col w-full gap-10 ">
            <Card>
              <CardHeader>
                <CardTitle>Hooks</CardTitle>
                <CardDescription> </CardDescription>
              </CardHeader>
              <CardContent>
                <CustomCheckboxGroup className="gap-5" value={hooks} onValueChange={(value) => onValueChange('hooks', value)}>
                  {!loadingGenerate &&
                    variants.hooks &&
                    variants.hooks.map((value: string, index: number) => (
                      <div className="flex items-center space-x-2 " key={index}>
                        <CustomCheckboxItem id={`hook-option-${index + 1}`} value={value} />
                        <Label htmlFor={`hook-option-${index + 1}`} className="text-base cursor-pointer">
                          {value}
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
                        <div className="relative flex flex-col items-center w-fit">
                          <Button variant={'outline'}>Upload</Button>
                        </div>
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
                  {!loadingGenerate &&
                    variants.strong_point_1_messages &&
                    variants.strong_point_1_messages.map((value: string, index: number) => (
                      <div className="flex items-center space-x-2 " key={index}>
                        <CustomCheckboxItem id={`body1-message-${index + 1}`} value={value} />
                        <Label htmlFor={`body1-message-${index + 1}`} className="text-base cursor-pointer">
                          {value}
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
                  {!loadingGenerate &&
                    variants.strong_point_2_messages &&
                    variants.strong_point_2_messages.map((value: string, index: number) => (
                      <div className="flex items-center space-x-2 " key={index}>
                        <CustomCheckboxItem id={`body2-message-${index + 1}`} value={value} />
                        <Label htmlFor={`body2-message-${index + 1}`} className="text-base cursor-pointer">
                          {value}
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
                  {!loadingGenerate &&
                    variants.strong_point_3_messages &&
                    variants.strong_point_3_messages.map((value: string, index: number) => (
                      <div className="flex items-center space-x-2 " key={index}>
                        <CustomCheckboxItem id={`body3-message-${index + 1}`} value={value} />
                        <Label htmlFor={`body3-message-${index + 1}`} className="text-base cursor-pointer">
                          {value}
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
                  {!loadingGenerate &&
                    variants.ctas &&
                    variants.ctas.map((value: string, index: number) => (
                      <div className="flex items-center space-x-2 " key={index}>
                        <CustomCheckboxItem id={`cta-${index + 1}`} value={value} />
                        <Label htmlFor={`cta-${index + 1}`} className="text-base cursor-pointer">
                          {value}
                        </Label>
                      </div>
                    ))}
                </CustomCheckboxGroup>
              </CardContent>
            </Card>
          </div>
        )}
      </div>

      <div className="flex justify-end">
        <Button
          onClick={() => {
            // Generate pattern combinations only on submit
            const patterns = generatePatternCombinations(elements);
            setPatternCombinations(patterns);

            submitStep3({ setLoading, onNext });
          }}
          disabled={loading || loadingGenerate || (hooks.length == 0 && body1Messages.length === 0 && body2Messages.length === 0 && body3Messages.length === 0 && ctas.length === 0)}
        >
          {loading && <Spinner />}
          Next
        </Button>
      </div>
    </div>
  );
};

export default Step3;
