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
import { usePlanningWhatDataContext, IPositioningPatterns } from "../hooks/planningWhatDataContext";
import { Spinner } from "@/components/ui/spinner";
import { LoadingOverlay } from "@/components/ui/loading-overlay";
import { ArrowRight } from "lucide-react";
import callApi from "@/config/axios/axios";

const Step7 = ({ onPrev }: { onPrev?: () => void }) => {
  const { positioningPatterns, onSetPositioningPatterns } = usePlanningWhatDataContext();
  const [selectedPattern, setSelectedPattern] = React.useState<number | undefined>(undefined);
  const [editablePatterns, setEditablePatterns] = React.useState<IPositioningPatterns[]>([]);
  const [loading, setLoading] = React.useState(false);

  // Initialize editable patterns from context
  React.useEffect(() => {
    if (positioningPatterns.length > 0 && editablePatterns.length === 0) {
      setEditablePatterns([...positioningPatterns]);
    }
  }, [positioningPatterns]);

  const router = useRouter();
  const { sessionId } = useParams();

  const handlePromiseChange = (index: number, value: string) => {
    const updated = [...editablePatterns];
    updated[index] = { ...updated[index], one_line_promise: value };
    setEditablePatterns(updated);
  };

  const handleFunctionalValueChange = (patternIndex: number, valueIndex: number, value: string) => {
    const updated = [...editablePatterns];
    if (valueIndex === 0) {
      updated[patternIndex] = { ...updated[patternIndex], process_description: value };
    } else {
      updated[patternIndex] = { ...updated[patternIndex], outcome_description: value };
    }
    setEditablePatterns(updated);
  };

  const handleEmotionalValueChange = (patternIndex: number, valueIndex: number, value: string) => {
    const updated = [...editablePatterns];
    if (valueIndex === 0) {
      updated[patternIndex] = { ...updated[patternIndex], direction_ja: value };
    } else {
      updated[patternIndex] = { ...updated[patternIndex], direction_reason: value };
    }
    setEditablePatterns(updated);
  };

  const onSubmit = async () => {
    if (selectedPattern === undefined) return;
    setLoading(true);
    try {
      // Save the selected positioning pattern to localStorage
      const selectedPatternData = patternsToDisplay[selectedPattern];
      if (selectedPatternData) {
        const whatData = JSON.parse(localStorage.getItem("planning_what_data") || "{}");
        whatData.positioningPatterns = [selectedPatternData];
        localStorage.setItem("planning_what_data", JSON.stringify(whatData));
      }

      const { data } = await callApi.post("/app-v2/planning/what/step7", {
        sessionId,
      });
      router.push(data.redirectTo);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const patternsToDisplay = editablePatterns.length > 0 ? editablePatterns : positioningPatterns;

  return (
    <>
      {/* Loading Overlay */}
      <LoadingOverlay
        isVisible={loading}
        progress={50}
        message="次のステップを準備中..."
        showProgress={false}
      />

      <div className="flex-1 w-full max-w-[1400px] mx-auto px-6 py-4 flex flex-col h-full items-start">
      <div className="mb-4 animate-fade-in-up">
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight mb-2 text-slate-800">
          ポジショニング骨子
        </h1>
        <p className="text-slate-500 text-base">
          採用するパターンを1つ選んでください
        </p>
      </div>
      <div className="w-full">
        <RadioGroup onValueChange={(e) => setSelectedPattern(Number(e))}>
          <div
            className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1 animate-fade-in-up"
            style={{ animationDelay: "0.1s" }}
          >
            {patternsToDisplay.map((pattern, i) => (
              <PositioningPatternCard
                pattern={i == 0 ? "A" : i == 1 ? "B" : "C"}
                isSelected={selectedPattern === i}
                promise={pattern.one_line_promise}
                value={`${i}`}
                onPromiseChange={(value) => handlePromiseChange(i, value)}
                functionalValues={[
                  {
                    label: "プロセス",
                    value: pattern.process_description || "",
                  },
                  {
                    label: "アウトカム",
                    value: pattern.outcome_description || "",
                  },
                ]}
                emotionalValues={[
                  {
                    label: "方向性",
                    value: pattern.direction_ja || "",
                  },
                  {
                    label: "理由",
                    value: pattern.direction_reason || "",
                  },
                ]}
                onFunctionalValueChange={(index, value) => handleFunctionalValueChange(i, index, value)}
                onEmotionalValueChange={(index, value) => handleEmotionalValueChange(i, index, value)}
                key={i}
              />
            ))}
          </div>
        </RadioGroup>
      </div>
      <div className="flex w-full justify-end mt-10 pt-6 border-t border-slate-100 gap-4">
        <Button
          variant={"secondary"}
          className="px-6 py-2.5 rounded-lg text-slate-500 font-semibold hover:text-slate-800 hover:bg-slate-100"
          onClick={onPrev}
          disabled={loading}
        >
          戻る
        </Button>
        <Button
          className="bg-[#0093b4] hover:bg-[#007a92] px-8 py-2.5 rounded-lg font-semibold shadow-sm"
          onClick={onSubmit}
          disabled={loading || selectedPattern === undefined}
        >
          {loading ? (
            <>
              <Spinner className="h-4 w-4" />
              読み込み中...
            </>
          ) : (
            <>
              次に進む <ArrowRight className="h-4 w-4" />
            </>
          )}
        </Button>
      </div>
    </div>
    </>
  );
};

export default Step7;
