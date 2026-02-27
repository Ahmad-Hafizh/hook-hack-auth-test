"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useParams } from "next/navigation";

import { RadioGroup } from "@/components/ui/radio-group";
import { LoadingOverlay } from "@/components/ui/loading-overlay";
import { ArrowRight } from "lucide-react";
import callApi from "@/config/axios/axios";
import { IPositioningPatterns } from "../../context/dataTypes";
import { PositioningPatternCard } from "./components/PositioningPatternCard";
import { errorToastCaller } from "../../components/toastCaller";

const PositioningOutlinePage = ({
  onPrev,
  onNext,
  stepId,
}: {
  stepId?: number;
  onPrev: () => void;
  onNext: () => void;
}) => {
  // const { positioningPatterns, onSetPositioningPatterns } =
  //   usePlanningWhatDataContext();
  const [positioningPatterns, setPositioningPatterns] = useState<
    IPositioningPatterns[]
  >([]);
  const [selectedPattern, setSelectedPattern] = React.useState<
    number | undefined
  >();
  const [regenerating, setRegenerating] = React.useState(false);
  const [submitting, setSubmitting] = React.useState(false);
  const [editablePatterns, setEditablePatterns] = React.useState<
    IPositioningPatterns[]
  >([]);
  const [loading, setLoading] = React.useState(false);

  // Initialize editable patterns from context
  React.useEffect(() => {
    if (positioningPatterns.length > 0 && editablePatterns.length === 0) {
      setEditablePatterns([...positioningPatterns]);
    }
  }, [positioningPatterns]);

  const { sessionId } = useParams();

  const handlePromiseChange = (index: number, value: string) => {
    const updated = [...editablePatterns];
    updated[index] = { ...updated[index], one_liner: value };
    setEditablePatterns(updated);
  };

  const handleFunctionalValueChange = (
    patternIndex: number,
    valueIndex: number,
    value: string,
  ) => {
    const updated = [...editablePatterns];
    const functionalValue = [...updated[patternIndex].functional_value];
    functionalValue[valueIndex] = {
      ...functionalValue[valueIndex],
      quadrant_value: value,
    };
    updated[patternIndex] = {
      ...updated[patternIndex],
      functional_value: functionalValue,
    };
    setEditablePatterns(updated);
  };

  const handleEmotionalValueChange = (
    patternIndex: number,
    valueIndex: number,
    value: string,
  ) => {
    const updated = [...editablePatterns];
    const emotionalValue = [...updated[patternIndex].emotional_value];
    emotionalValue[valueIndex] = {
      ...emotionalValue[valueIndex],
      quadrant_value: value,
    };
    updated[patternIndex] = {
      ...updated[patternIndex],
      emotional_value: emotionalValue,
    };
    setEditablePatterns(updated);
  };

  const onSubmit = async () => {
    setLoading(true);
    try {
      setSubmitting(true);
      const { data } = await callApi.post("/app-v3/planning/what/step6", {
        sessionId,
        positioningPatterns: editablePatterns,
        selectedPositioningPatterns: selectedPattern,
      });

      onNext();
    } catch (error) {
      errorToastCaller(error);
    } finally {
      setSubmitting(false);
    }
  };

  const onRegenerate = async () => {
    try {
      setRegenerating(true);
      const { data } = await callApi.post("/app-v3/planning/what/step6/fetch", {
        sessionId,
      });

      if (data) {
        if (data?.positioningPatterns) {
          setPositioningPatterns(data.positioningPatterns);
        }
        if (data.selectedPositioningPatterns) {
          setSelectedPattern(data.selectedPositioningPatterns);
        }
      }
    } catch (error) {
      errorToastCaller(error);
    } finally {
      setRegenerating(false);
    }
  };

  useEffect(() => {
    onRegenerate();
  }, []);

  const quadrantLabelMap: Record<string, string> = {
    "functional x process": "機能xプロセス",
    "functional x result": "機能x結果",
    "emotional x process": "情緒xプロセス",
    "emotional x result": "情緒x結果",
  };

  const mapQuadrantLabel = (label: string) =>
    quadrantLabelMap[label.toLowerCase()] || label;

  const sortProcessFirstWithIndex = <T extends { quadrant: string }>(
    items: T[],
  ): { item: T; originalIndex: number }[] =>
    items
      .map((item, idx) => ({ item, originalIndex: idx }))
      .sort((a, b) => {
        const aIsProcess = a.item.quadrant.toLowerCase().includes("process")
          ? 0
          : 1;
        const bIsProcess = b.item.quadrant.toLowerCase().includes("process")
          ? 0
          : 1;
        return aIsProcess - bIsProcess;
      });

  const patternsToDisplay =
    editablePatterns.length > 0 ? editablePatterns : positioningPatterns;

  if (regenerating) {
    return (
      <div className="flex-1 w-full max-w-6xl mx-auto px-4 py-12 md:px-8 flex flex-col justify-center h-full items-center">
        <LoadingOverlay
          isVisible={true}
          message="ポジショニング骨子を生成中です"
          showProgress={false}
        />
      </div>
    );
  }

  return (
    <>
      {/* Loading Overlay */}
      <LoadingOverlay
        isVisible={loading}
        message="次のステップを準備中..."
        showProgress={false}
      />

      <div className="flex-1 w-full max-w-[1400px] mx-auto px-6 py-4 flex flex-col h-full items-start">
        <div className="mb-4 animate-fade-in-up">
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight mb-2 text-slate-800">
            {stepId || 8}. ポジショニング骨子選択
          </h1>
          <p className="text-black text-lg">
            採用する​パターンを​1つ​選び、​必要に​応じて​編集してください​
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
                  promise={pattern.one_liner || ""}
                  value={`${i}`}
                  onPromiseChange={(value) => handlePromiseChange(i, value)}
                  functionalValues={sortProcessFirstWithIndex(
                    pattern.functional_value,
                  ).map(({ item: fv }) => ({
                    label: mapQuadrantLabel(fv.quadrant || ""),
                    value: fv.quadrant_value || "",
                  }))}
                  emotionalValues={sortProcessFirstWithIndex(
                    pattern.emotional_value,
                  ).map(({ item: ev }) => ({
                    label: mapQuadrantLabel(ev.quadrant || ""),
                    value: ev.quadrant_value || "",
                  }))}
                  onFunctionalValueChange={(index, value) => {
                    const sorted = sortProcessFirstWithIndex(
                      pattern.functional_value,
                    );
                    handleFunctionalValueChange(
                      i,
                      sorted[index].originalIndex,
                      value,
                    );
                  }}
                  onEmotionalValueChange={(index, value) => {
                    const sorted = sortProcessFirstWithIndex(
                      pattern.emotional_value,
                    );
                    handleEmotionalValueChange(
                      i,
                      sorted[index].originalIndex,
                      value,
                    );
                  }}
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
            disabled={submitting}
          >
            次に進む <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </>
  );
};

export default PositioningOutlinePage;
