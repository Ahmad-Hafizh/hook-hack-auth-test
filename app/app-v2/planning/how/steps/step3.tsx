'use client';
import React, { use } from 'react';
import { Button } from '@/components/ui/button';
import { generateVariants, getJobResult, submitStep3 } from '../hooks/useFetchApi';
import { Spinner } from '@/components/ui/spinner';
import { Infinity } from 'lucide-react';
import { IElements, IPattern, IPlan, ITemplateCreatomate, IVariants } from '../hooks/useStepData';
import { generatePatternCombinations, calculatePatternCount, onElementValueChange } from '../hooks/usePattern';
import ElementProgress from '../components/elementProgress';
import ElementCard from '../components/elementCard';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import { useMutation, useQuery } from '@tanstack/react-query';

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
  const [jobId, setJobId] = React.useState<string | null>(null);

  React.useEffect(() => {
    const fetchVariants = async () => {
      setLoadingGenerate(true);
      generateVariants({ setJobId });
    };
    if (!jobId) {
      fetchVariants();
    }
  }, []);

  // Use the polling query
  const { data: jobResult, isLoading: isPolling } = useQuery({
    queryKey: ['status', jobId],
    queryFn: () => getJobResult({ jobId: jobId! }),
    enabled: !!jobId && loadingGenerate, // Only poll when we have a jobId and still loading
    refetchInterval: (query) => {
      // Stop polling when status is not 'running'
      if (query.state.data?.status !== 'running') {
        return false; // Stop polling
      }
      return 5000; // Poll every 5 seconds while status is 'running'
    },
  });

  // Handle job completion
  React.useEffect(() => {
    if (jobResult && jobResult.status !== 'running' && jobResult.result?.variants) {
      const variantsData = jobResult.result.variants;
      setVariants({ ...variants, ...variantsData });
      setLoadingGenerate(false);
    } else if (jobResult && !jobResult.status) {
      console.error('Job failed:', jobResult.error);
      setLoadingGenerate(false);
    }
  }, [jobResult, setVariants, setElements]);

  React.useEffect(() => {
    setPatternCount(calculatePatternCount(elements).totalPattern);
    setIsComplete(calculatePatternCount(elements).complete);
  }, [elements]);

  if (!jobId || isPolling) {
    return (
      <div className="w-full h-96 flex justify-center items-center">
        <Spinner /> Generating variants...
      </div>
    );
  }

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
            <ElementCard
              type="text"
              title="Hooks"
              variant={variants.hooks}
              onVariantChange={(value, index) => {
                const newHooks = [...variants.hooks];
                newHooks[index] = value;
                setVariants({ ...variants, hooks: newHooks });
              }}
              value={elements.hooks}
              onElementValueChange={(value) => onElementValueChange({ category: 'hooks', value, elements, setElements })}
            />
            <ElementCard
              type="image"
              title="Body 1 Images"
              description="Aspect ratio : 9/16"
              variant={variants.strong_point_1_images}
              onVariantChange={(value, index) => {
                const newBody1Images = [...variants.strong_point_1_images];
                newBody1Images[index] = value;
                setVariants({ ...variants, strong_point_1_images: newBody1Images });
              }}
              value={elements.body1Images}
              onElementValueChange={(value) => onElementValueChange({ category: 'body1Images', value, elements, setElements })}
            />
            <ElementCard
              type="text"
              title="Body 1 Messages"
              variant={variants.strong_point_1_messages}
              onVariantChange={(value, index) => {
                const newBody1Messages = [...variants.strong_point_1_messages];
                newBody1Messages[index] = value;
                setVariants({ ...variants, strong_point_1_messages: newBody1Messages });
              }}
              value={elements.body1Messages}
              onElementValueChange={(value) => onElementValueChange({ category: 'body1Messages', value, elements, setElements })}
            />
            <ElementCard
              type="image"
              title="Body 2 Images"
              description="Aspect ratio : 9/16"
              variant={variants.strong_point_2_images}
              onVariantChange={(value, index) => {
                const newBody2Images = [...variants.strong_point_2_images];
                newBody2Images[index] = value;
                setVariants({ ...variants, strong_point_2_images: newBody2Images });
              }}
              value={elements.body2Images}
              onElementValueChange={(value) => onElementValueChange({ category: 'body2Images', value, elements, setElements })}
            />
            <ElementCard
              type="text"
              title="Body 2 Messages"
              variant={variants.strong_point_2_messages}
              onVariantChange={(value, index) => {
                const newBody2Messages = [...variants.strong_point_2_messages];
                newBody2Messages[index] = value;
                setVariants({ ...variants, strong_point_2_messages: newBody2Messages });
              }}
              value={elements.body2Messages}
              onElementValueChange={(value) => onElementValueChange({ category: 'body2Messages', value, elements, setElements })}
            />
            <ElementCard
              type="image"
              title="Body 3 Images"
              description="Aspect ratio : 9/16"
              variant={variants.strong_point_3_images}
              onVariantChange={(value, index) => {
                const newBody3Images = [...variants.strong_point_3_images];
                newBody3Images[index] = value;
                setVariants({ ...variants, strong_point_3_images: newBody3Images });
              }}
              value={elements.body3Images}
              onElementValueChange={(value) => onElementValueChange({ category: 'body3Images', value, elements, setElements })}
            />
            <ElementCard
              type="text"
              title="Body 3 Messages"
              variant={variants.strong_point_3_messages}
              onVariantChange={(value, index) => {
                const newBody3Messages = [...variants.strong_point_3_messages];
                newBody3Messages[index] = value;
                setVariants({ ...variants, strong_point_3_messages: newBody3Messages });
              }}
              value={elements.body3Messages}
              onElementValueChange={(value) => onElementValueChange({ category: 'body3Messages', value, elements, setElements })}
            />
            <ElementCard
              type="text"
              title="CTAs"
              variant={variants.ctas}
              onVariantChange={(value, index) => {
                const newCtas = [...variants.ctas];
                newCtas[index] = value;
                setVariants({ ...variants, ctas: newCtas });
              }}
              value={elements.ctas}
              onElementValueChange={(value) => onElementValueChange({ category: 'ctas', value, elements, setElements })}
            />
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
