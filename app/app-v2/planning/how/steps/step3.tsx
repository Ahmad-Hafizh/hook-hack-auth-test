"use client";
import React, { use } from "react";
import { Button } from "@/components/ui/button";
import {
  generateVariants,
  getJobResult,
  submitStep3,
} from "../hooks/useFetchApi";
import { Spinner } from "@/components/ui/spinner";
import { Infinity } from "lucide-react";
import {
  IElements,
  IPattern,
  IPlan,
  ITemplateCreatomate,
  IVariants,
} from "../hooks/useStepData";
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
import { useMutation, useQuery } from "@tanstack/react-query";

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
  selectedTemplateId,
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
  selectedTemplateId: string;
}) => {
  const [loading, setLoading] = React.useState(false);
  const [loadingGenerate, setLoadingGenerate] = React.useState(true);
  const [isComplete, setIsComplete] = React.useState(false);
  const [jobId, setJobId] = React.useState<string | null>(null);

  // Determine target aspect ratio based on the selected template (video style)
  // real estate template: 469 / 1023 (vertical)
  // other two templates: 4 / 3
  const selectedAspectRatio = React.useMemo(() => {
    // Real estate template (vertical)
    if (selectedTemplateId === "6f8e118a-703d-4b94-8534-96a2b7be7d62") {
      return 469 / 1023;
    }

    // All other templates: 4:3 (horizontal)
    return 4 / 3;
  }, [selectedTemplateId]);

  const aspectLabel = React.useMemo(() => {
    if (selectedTemplateId === "6f8e118a-703d-4b94-8534-96a2b7be7d62") {
      return "469 / 1023（縦）";
    }
    return "4 : 3（横）";
  }, [selectedTemplateId]);

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
  const { data: jobResult, isLoading: isPolling } = useQuery<{
    status?: string;
    result?: { variants?: IVariants };
    error?: unknown;
  }>({
    queryKey: ["status", jobId],
    queryFn: () => getJobResult({ jobId: jobId! }),
    enabled: !!jobId && loadingGenerate, // Only poll when we have a jobId and still loading
    refetchInterval: (query: { state: { data?: { status?: string } } }) => {
      // Stop polling when status is not 'running'
      if (query.state.data?.status !== "running") {
        return false; // Stop polling
      }
      return 5000; // Poll every 5 seconds while status is 'running'
    },
  });

  // Handle job completion
  React.useEffect(() => {
    if (
      jobResult &&
      jobResult.status !== "running" &&
      jobResult.result?.variants
    ) {
      const variantsData = jobResult.result.variants;
      setVariants({ ...variants, ...variantsData });
      setLoadingGenerate(false);
    } else if (jobResult && !jobResult.status) {
      console.error("Job failed:", jobResult.error);
      setLoadingGenerate(false);
    }
  }, [jobResult, setVariants, setElements]);

  React.useEffect(() => {
    setPatternCount(calculatePatternCount(elements).totalPattern);
    setIsComplete(calculatePatternCount(elements).complete);
  }, [elements]);

  // Debug: observe when image variants / selections change
  React.useEffect(() => {
    console.log(
      "[Step3] variants.strong_point_1_images",
      variants.strong_point_1_images
    );
  }, [variants.strong_point_1_images]);

  React.useEffect(() => {
    console.log("[Step3] elements.body1Images", elements.body1Images);
  }, [elements.body1Images]);

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
              onElementValueChange={(value) =>
                onElementValueChange({
                  category: "hooks",
                  value,
                  elements,
                  setElements,
                })
              }
            />
            <ElementCard
              type="image"
              title="Body 1 Images"
              description={`Aspect ratio : ${aspectLabel}`}
              // @ts-expect-error extended props for image cards
              aspectRatio={selectedAspectRatio}
              variant={variants.strong_point_1_images}
              onVariantChange={(value, index) => {
                console.log("[Step3] Body1 onVariantChange", {
                  index,
                  oldUrl: variants.strong_point_1_images[index],
                  newUrl: value,
                });
                const oldUrl = variants.strong_point_1_images[index];

                // Update variants using functional state to avoid stale closures
                setVariants((prev) => {
                  const newBody1Images = [...prev.strong_point_1_images];
                  newBody1Images[index] = value;
                  return { ...prev, strong_point_1_images: newBody1Images };
                });

                // Keep selections in sync when an already-selected image is edited
                if (oldUrl) {
                  setElements((prev) => {
                    if (!prev.body1Images.includes(oldUrl)) return prev;
                    console.log("[Step3] Body1 updating elements.body1Images", {
                      before: prev.body1Images,
                      replacing: oldUrl,
                      with: value,
                    });
                    return {
                      ...prev,
                      body1Images: prev.body1Images.map((url) =>
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
                  setElements,
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
                setVariants({
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
                  setElements,
                })
              }
            />
            <ElementCard
              type="image"
              title="Body 2 Images"
              description={`Aspect ratio : ${aspectLabel}`}
              // @ts-expect-error extended props for image cards
              aspectRatio={selectedAspectRatio}
              variant={variants.strong_point_2_images}
              onVariantChange={(value, index) => {
                const oldUrl = variants.strong_point_2_images[index];

                setVariants((prev) => {
                  const newBody2Images = [...prev.strong_point_2_images];
                  newBody2Images[index] = value;
                  return { ...prev, strong_point_2_images: newBody2Images };
                });

                if (oldUrl) {
                  setElements((prev) => {
                    if (!prev.body2Images.includes(oldUrl)) return prev;
                    return {
                      ...prev,
                      body2Images: prev.body2Images.map((url) =>
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
                  setElements,
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
                setVariants({
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
                  setElements,
                })
              }
            />
            <ElementCard
              type="image"
              title="Body 3 Images"
              description={`Aspect ratio : ${aspectLabel}`}
              // @ts-expect-error extended props for image cards
              aspectRatio={selectedAspectRatio}
              variant={variants.strong_point_3_images}
              onVariantChange={(value, index) => {
                const oldUrl = variants.strong_point_3_images[index];

                setVariants((prev) => {
                  const newBody3Images = [...prev.strong_point_3_images];
                  newBody3Images[index] = value;
                  return { ...prev, strong_point_3_images: newBody3Images };
                });

                if (oldUrl) {
                  setElements((prev) => {
                    if (!prev.body3Images.includes(oldUrl)) return prev;
                    return {
                      ...prev,
                      body3Images: prev.body3Images.map((url) =>
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
                  setElements,
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
                setVariants({
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
                  setElements,
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
                setVariants({ ...variants, ctas: newCtas });
              }}
              value={elements.ctas}
              onElementValueChange={(value) =>
                onElementValueChange({
                  category: "ctas",
                  value,
                  elements,
                  setElements,
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
