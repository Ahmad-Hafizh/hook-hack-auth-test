"use client";
import React from "react";
import {
  CustomCheckboxGroup,
  CustomCheckboxItem,
} from "../../how/components/customCheckbox";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useParams, useRouter } from "next/navigation";
import { PageHeader, Card } from "@/components/lp-analyzer";
import { PositioningPatternCard } from "@/components/lp-analyzer/PositioningPatternCard";
import { RadioGroup } from "@/components/ui/radio-group";
import { usePlanningWhatDataContext } from "../hooks/planningWhatDataContext";
import { Spinner } from "@/components/ui/spinner";
import { ArrowRight } from "lucide-react";

const Step7 = () => {
  const { positioningPatterns } = usePlanningWhatDataContext();
  const [selectedPattern, setSelectedPattern] = React.useState<number>(0);

  const router = useRouter();
  const { sessionId } = useParams();
  return (
    <div className="flex-1 w-full max-w-6xl mx-auto px-4 py-12 md:px-8 flex flex-col justify-center h-full items-start">
      <PageHeader title="ポジショニング骨子" />
      <div className="w-full">
        <div className="flex flex-col gap-8">
          {/* card */}
          <RadioGroup onValueChange={(e) => setSelectedPattern(Number(e))}>
            <div
              className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1 mb-12 animate-fade-in-up"
              style={{ animationDelay: "0.1s" }}
            >
              {positioningPatterns.map((pattern, i) => (
                <PositioningPatternCard
                  pattern={i == 0 ? "A" : i == 1 ? "B" : "C"}
                  isSelected={selectedPattern === i}
                  promise={pattern.one_line_promise}
                  value={`${i}`}
                  functionalValues={[
                    {
                      label: "機能 x 価値",
                      value: "価値の説明が入ります。価値の説明が入ります。",
                    },
                    {
                      label: "機能 x 価値",
                      value: "価値の説明が入ります。価値の説明が入ります。",
                    },
                  ]}
                  emotionalValues={[
                    {
                      label: "情緒 x 価値",
                      value: "価値の説明が入ります。価値の説明が入ります。",
                    },
                    {
                      label: "情緒 x 価値",
                      value: "価値の説明が入ります。価値の説明が入ります。",
                    },
                  ]}
                  key={i}
                />
              ))}
            </div>
          </RadioGroup>
        </div>
      </div>
      <div className="flex w-full justify-end mt-10 gap-4">
        <Button
          variant={"secondary"}
          className="bg-gray-50 text-gray-500"
          size={"lg"}
        >
          戻る
        </Button>
        <Button
          className="bg-cyan-600 hover:bg-cyan-700"
          size={"lg"}
          onClick={() => router.push(`/app-v2/planning/${sessionId}/how`)}
        >
          <>
            次に進む <ArrowRight className="h-4 w-4" />
          </>
        </Button>
      </div>
    </div>
  );
};

export default Step7;
