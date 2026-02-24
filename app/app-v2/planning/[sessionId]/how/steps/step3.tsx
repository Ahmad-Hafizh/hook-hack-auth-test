"use client";
import React, { use } from "react";
import { Button } from "@/components/ui/button";
import { submitStep3 } from "../hooks/useFetchAPINext";
import { getJobResult } from "../hooks/useFetchAPINext";
import { Spinner } from "@/components/ui/spinner";
import { Infinity } from "lucide-react";
import {
  generatePatternCombinations,
  calculatePatternCount,
  onElementValueChange,
} from "../hooks/usePattern";
import ElementProgress from "../components/elementProgress";
import ElementCard from "../components/elementCard";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
// @ts-ignore
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { useDataContext } from "../hooks/useDataContext";

const Step3 = ({ onNext }: { onNext: () => void }) => {
  const [loading, setLoading] = React.useState(false);
  const [loadingGenerate, setLoadingGenerate] = React.useState(true);
  const [isComplete, setIsComplete] = React.useState(false);
  const {
    plan,
    elements,
    variants,
    patternCount,
    onSetElements,
    onSetVariants,
    onSetPatternCount,
    onSetPatternCombinations,
    jobId,
    selectedTemplateId,
  } = useDataContext();

  const { sessionId } = useParams();
  const [aspectRatio, setAspectRatio] = React.useState<{
    aspectRatio: number;
    aspectLabel: string;
    aspectStyle: string;
  }>(
    selectedTemplateId === "6f8e118a-703d-4b94-8534-96a2b7be7d62"
      ? {
          aspectRatio: 469 / 1023,
          aspectLabel: "469 / 1023（縦）",
          aspectStyle: "469/1023",
        }
      : { aspectRatio: 4 / 3, aspectLabel: "4 / 3（横）", aspectStyle: "4/3" }
  );

  // Use the polling query
  const {
    data: jobResult,
    isPending,
    error,
  } = useQuery<{
    status?: string;
    variants?: any;
    error?: unknown;
  }>({
    queryKey: ["jobStatus", jobId],
    queryFn: () =>
      getJobResult({ jobId: jobId!, sessionId: sessionId as string }),
    enabled: !!jobId && loadingGenerate, // Only poll when we have a jobId and still loading
    refetchInterval: (query) => {
      const currentStatus = query.state.data?.status;

      // Stop polling if status is any terminal state
      if (
        currentStatus === "done" ||
        currentStatus === "error" ||
        currentStatus === "failed"
      ) {
        return false;
      }

      // Continue polling only if status is 'running'
      if (currentStatus === "running") {
        return 10000;
      }

      // For undefined status, try again with shorter interval
      return 3000;
    },
  });

  // Handle job completion
  React.useEffect(() => {
    if (jobResult) {
      if (jobResult.status === "done" && jobResult.variants) {
        onSetVariants(jobResult.variants);
        setLoadingGenerate(false);
      } else if (
        jobResult.status === "failed" ||
        jobResult.status === "error"
      ) {
        console.error(
          "Job failed with status:",
          jobResult.status,
          jobResult.error
        );
        setLoadingGenerate(false);
      }
    }
  }, [jobResult]);

  React.useEffect(() => {
    onSetPatternCount(calculatePatternCount(elements).totalPattern);
    setIsComplete(calculatePatternCount(elements).complete);
  }, [elements]);

  if (loadingGenerate || isPending) {
    return (
      <div className="w-full h-96 flex justify-center items-center gap-4">
        <Spinner /> Generating variants...
      </div>
    );
  }

  if (error) {
    console.log(error);
  }

  return (
    <div className="px-10 h-full flex flex-col gap-5 container justify-between">
      <div className="flex flex-col items-center gap-4 mb-10">
        <div className="flex gap-2 items-center">
          <p className="text-2xl font-bold">
            {patternCount} パターンを {plan?.test_term_weeks || 0} 週間テスト
          </p>
          <HoverCard>
            <HoverCardTrigger className="w-6 h-6 border-2 border-black text-lg font-bold rounded-full flex justify-center items-center">
              ?
            </HoverCardTrigger>
            <HoverCardContent>
              This is image guide for the video
            </HoverCardContent>
          </HoverCard>
        </div>
        <div className="flex flex-col gap-4 items-center justify-center">
          <p className="text-sm flex items-center gap-2 leading-none">
            <Infinity className="w-5 h-5" /> Pattern
            {plan?.test_term_weeks ? (
              <strong className="text-base">{plan.test_term_weeks}</strong>
            ) : (
              <Infinity className="w-5 h-5" />
            )}{" "}
            Weeks to test is recommended
          </p>
          <ElementProgress elements={elements} />
        </div>
      </div>

      <div className=" w-full h-full overflow-x-auto relative ">
        {loadingGenerate ? (
          <div className="w-full h-96 flex justify-center items-center gap-2">
            <Spinner className="w-4 h-4" /> Generating variants...
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
                onSetVariants({ ...variants, hooks: newHooks });
              }}
              value={elements.hooks}
              onElementValueChange={(value) =>
                onElementValueChange({
                  category: "hooks",
                  value,
                  elements,
                  onSetElements,
                })
              }
            />
            <ElementCard
              type="image"
              title="Body 1 Images"
              description={`Aspect ratio : ${aspectRatio.aspectLabel}`}
              aspectRatio={aspectRatio.aspectRatio}
              aspectStyle={aspectRatio.aspectStyle}
              variant={variants.strong_point_1_images}
              onVariantChange={(value, index) => {
                const variantCopy = [...variants.strong_point_1_images];
                const oldUrl = variantCopy[index];

                // Update variants using functional state to avoid stale closures
                onSetVariants((prev: any) => {
                  const newBody1Images = [...prev.strong_point_1_images];
                  newBody1Images[index] = value;
                  return { ...prev, strong_point_1_images: newBody1Images };
                });

                // Keep selections in sync when an already-selected image is edited
                if (oldUrl) {
                  onSetElements((prev: any) => {
                    if (!prev.body1Images.includes(oldUrl)) return prev;

                    return {
                      ...prev,
                      body1Images: prev.body1Images.map((url: string) =>
                        url === oldUrl ? value : url
                      ),
                    };
                  });
                }
              }}
              value={elements.body1Images}
              onElementValueChange={(value) =>
                onElementValueChange({
                  category: "body1Images",
                  value,
                  elements,
                  onSetElements,
                })
              }
            />
            <ElementCard
              type="text"
              title="Body 1 Messages"
              variant={variants.strong_point_1_messages}
              onVariantChange={(value, index) => {
                const newBody1Messages = [...variants.strong_point_1_messages];
                newBody1Messages[index] = value;
                onSetVariants({
                  ...variants,
                  strong_point_1_messages: newBody1Messages,
                });
              }}
              value={elements.body1Messages}
              onElementValueChange={(value) =>
                onElementValueChange({
                  category: "body1Messages",
                  value,
                  elements,
                  onSetElements,
                })
              }
            />
            <ElementCard
              type="image"
              title="Body 2 Images"
              description={`Aspect ratio : ${aspectRatio.aspectLabel}`}
              aspectRatio={aspectRatio.aspectRatio}
              aspectStyle={aspectRatio.aspectStyle}
              variant={variants.strong_point_2_images}
              onVariantChange={(value, index) => {
                const variantCopy = [...variants.strong_point_2_images];
                const oldUrl = variantCopy[index];

                onSetVariants((prev: any) => {
                  const newBody2Images = [...prev.strong_point_2_images];
                  newBody2Images[index] = value;
                  return { ...prev, strong_point_2_images: newBody2Images };
                });

                if (oldUrl) {
                  onSetElements((prev: any) => {
                    if (!prev.body2Images.includes(oldUrl)) return prev;
                    return {
                      ...prev,
                      body2Images: prev.body2Images.map((url: string) =>
                        url === oldUrl ? value : url
                      ),
                    };
                  });
                }
              }}
              value={elements.body2Images}
              onElementValueChange={(value) =>
                onElementValueChange({
                  category: "body2Images",
                  value,
                  elements,
                  onSetElements,
                })
              }
            />
            <ElementCard
              type="text"
              title="Body 2 Messages"
              variant={variants.strong_point_2_messages}
              onVariantChange={(value, index) => {
                const newBody2Messages = [...variants.strong_point_2_messages];
                newBody2Messages[index] = value;
                onSetVariants({
                  ...variants,
                  strong_point_2_messages: newBody2Messages,
                });
              }}
              value={elements.body2Messages}
              onElementValueChange={(value) =>
                onElementValueChange({
                  category: "body2Messages",
                  value,
                  elements,
                  onSetElements,
                })
              }
            />
            <ElementCard
              type="image"
              title="Body 3 Images"
              description={`Aspect ratio : ${aspectRatio.aspectLabel}`}
              aspectRatio={aspectRatio.aspectRatio}
              aspectStyle={aspectRatio.aspectStyle}
              variant={variants.strong_point_3_images}
              onVariantChange={(value, index) => {
                const variantCopy = [...variants.strong_point_3_images];
                const oldUrl = variantCopy[index];

                onSetVariants((prev: any) => {
                  const newBody3Images = [...prev.strong_point_3_images];
                  newBody3Images[index] = value;
                  return { ...prev, strong_point_3_images: newBody3Images };
                });

                if (oldUrl) {
                  onSetElements((prev: any) => {
                    if (!prev.body3Images.includes(oldUrl)) return prev;
                    return {
                      ...prev,
                      body3Images: prev.body3Images.map((url: string) =>
                        url === oldUrl ? value : url
                      ),
                    };
                  });
                }
              }}
              value={elements.body3Images}
              onElementValueChange={(value) =>
                onElementValueChange({
                  category: "body3Images",
                  value,
                  elements,
                  onSetElements,
                })
              }
            />
            <ElementCard
              type="text"
              title="Body 3 Messages"
              variant={variants.strong_point_3_messages}
              onVariantChange={(value, index) => {
                const newBody3Messages = [...variants.strong_point_3_messages];
                newBody3Messages[index] = value;
                onSetVariants({
                  ...variants,
                  strong_point_3_messages: newBody3Messages,
                });
              }}
              value={elements.body3Messages}
              onElementValueChange={(value) =>
                onElementValueChange({
                  category: "body3Messages",
                  value,
                  elements,
                  onSetElements,
                })
              }
            />
            <ElementCard
              type="text"
              title="CTAs"
              variant={variants.ctas}
              onVariantChange={(value, index) => {
                const newCtas = [...variants.ctas];
                newCtas[index] = value;
                onSetVariants({ ...variants, ctas: newCtas });
              }}
              value={elements.ctas}
              onElementValueChange={(value) =>
                onElementValueChange({
                  category: "ctas",
                  value,
                  elements,
                  onSetElements,
                })
              }
            />
          </div>
        )}
      </div>

      <div className="flex justify-end">
        <Button
          onClick={() => {
            // Generate pattern combinations only on submit
            const patterns = generatePatternCombinations(elements);
            onSetPatternCombinations(patterns);

            submitStep3({ setLoading, onNext });
          }}
          disabled={loading || loadingGenerate || !isComplete}
          className="border-2 border-sky-600 bg-sky-600  hover:bg-sky-500 text-white px-4 py-2"
        >
          {loading && <Spinner />}
          次に​進む
        </Button>
      </div>
    </div>
  );
};

export default Step3;
