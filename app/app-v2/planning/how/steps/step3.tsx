'use client';
import React from 'react';
import { Button } from '@/components/ui/button';
import { generateVariants, submitStep3 } from '../hooks/useFetchApi';
import { Spinner } from '@/components/ui/spinner';
import { Infinity } from 'lucide-react';
import { IElements, IPattern, IPlan, ITemplateCreatomate, IVariants } from '../hooks/useStepData';
import { generatePatternCombinations, calculatePatternCount, onElementValueChange } from '../hooks/usePattern';
import ElementProgress from '../components/elementProgress';
import ElementCard from '../components/elementCard';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import { log } from 'console';

const Step3 = ({
  onNext,
  plan,
  elements,
  variants,
  patternCount,
  setPatternCount,
  setElements,
  setVariants,
  setPatternCombinations,
}: {
  onNext: () => void;
  plan: IPlan | undefined;
  elements: IElements;
  variants: IVariants;
  setElements: React.Dispatch<React.SetStateAction<IElements>>;
  setVariants: React.Dispatch<React.SetStateAction<IVariants>>;
  patternCount: number;
  setPatternCount: React.Dispatch<React.SetStateAction<number>>;
  setPatternCombinations: React.Dispatch<React.SetStateAction<IPattern[]>>;
}) => {
  const [loading, setLoading] = React.useState(false);
  const [loadingGenerate, setLoadingGenerate] = React.useState(true);
  const [isComplete, setIsComplete] = React.useState(false);

  React.useEffect(() => {
    generateVariants({ setLoadingGenerate, setVariants, variants });
  }, []);

  React.useEffect(() => {
    setPatternCount(calculatePatternCount(elements).totalPattern);
    setIsComplete(calculatePatternCount(elements).complete);
  }, [elements]);

  return (
    <div className="px-10 h-full flex flex-col gap-5 container justify-between">
      <div className="flex flex-col items-center gap-4 mb-10">
        <div className="flex gap-2 items-center">
          <p className="text-2xl font-bold">
            {patternCount} パターンを {plan?.test_term_weeks || 0} 週間テスト
          </p>
          <HoverCard>
            <HoverCardTrigger className="w-6 h-6 border-2 border-black text-lg font-bold rounded-full flex justify-center items-center">?</HoverCardTrigger>
            <HoverCardContent>This is image guide for the video</HoverCardContent>
          </HoverCard>
        </div>
        <div className="flex flex-col gap-4 items-center justify-center">
          <p className="text-sm flex items-center gap-2 leading-none">
            <Infinity className="w-5 h-5" /> Pattern
            {plan?.test_term_weeks ? <strong className="text-base">{plan.test_term_weeks}</strong> : <Infinity className="w-5 h-5" />} Weeks to test is recommended
          </p>
          <ElementProgress elements={elements} />
        </div>
      </div>

      <div className=" w-full h-full overflow-x-auto relative ">
        {loadingGenerate ? (
          <div className="w-full h-96 flex justify-center items-center">
            <Spinner /> Generating variants...
          </div>
        ) : (
          <div className="flex flex-row w-fit gap-10 whitespace-nowrap pb-10">
            <ElementCard type="hook" variants={variants} elements={elements} onElementValueChange={onElementValueChange} setElements={setElements} setVariants={setVariants} />
            <ElementCard type="body1image" variants={variants} elements={elements} onElementValueChange={onElementValueChange} setElements={setElements} setVariants={setVariants} />
            <ElementCard type="body1message" variants={variants} elements={elements} onElementValueChange={onElementValueChange} setElements={setElements} setVariants={setVariants} />
            <ElementCard type="body2image" variants={variants} elements={elements} onElementValueChange={onElementValueChange} setElements={setElements} setVariants={setVariants} />
            <ElementCard type="body2message" variants={variants} elements={elements} onElementValueChange={onElementValueChange} setElements={setElements} setVariants={setVariants} />
            <ElementCard type="body3image" variants={variants} elements={elements} onElementValueChange={onElementValueChange} setElements={setElements} setVariants={setVariants} />
            <ElementCard type="body3message" variants={variants} elements={elements} onElementValueChange={onElementValueChange} setElements={setElements} setVariants={setVariants} />
            <ElementCard type="cta" variants={variants} elements={elements} onElementValueChange={onElementValueChange} setElements={setElements} setVariants={setVariants} />
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
          disabled={loading || loadingGenerate || !isComplete}
          className="border-2 border-rose-600 bg-rose-600  hover:bg-rose-500 text-white px-4 py-2"
        >
          {loading && <Spinner />}
          次に​進む
        </Button>
      </div>
    </div>
  );
};

export default Step3;
