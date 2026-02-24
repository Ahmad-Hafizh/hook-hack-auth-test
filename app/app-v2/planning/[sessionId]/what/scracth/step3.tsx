"use client";
import { Button } from "@/components/ui/button";
import { ToggleGroup } from "@/components/ui/toggle-group";
import React, { useEffect } from "react";
import KeyVisualsCard from "../components/keyVisualsCard";
import { submitStep3, getMoreVisuals, regenerateVisuals } from "../hooks/useFetchAPINext";
import { Spinner } from "@/components/ui/spinner";
import { LoadingOverlay } from "@/components/ui/loading-overlay";
import { useParams } from "next/navigation";
import {
  ICompetitiveMatrix,
  usePlanningWhatDataContext,
} from "../hooks/planningWhatDataContext";
import { Card, PageHeader, VisualSelector } from "@/components/lp-analyzer";
import { ArrowRight } from "lucide-react";

const Step3 = ({
  onNext,
  onPrev,
}: {
  onNext: () => void;
  onPrev: () => void;
}) => {
  const { sessionId } = useParams();
  const [selectedVisuals, setSelectedVisuals] = React.useState<string[]>([]);
  const [loading, setLoading] = React.useState(false);
  const [loadingGenerate, setLoadingGenerate] = React.useState(false);
  const [loadingRegenerate, setLoadingRegenerate] = React.useState(false);
  const {
    onSetCompetitiveMatrix,
    onSetKeyVisuals,
    keyVisuals,
    selectedKeywords,
  } = usePlanningWhatDataContext();

  useEffect(() => {
    // Check if keyword exists in localStorage before trying to generate visuals
    const keyword = localStorage.getItem("planning_what_selected_keyword");
    if (keyVisuals.length === 0 && keyword) {
      getMoreVisuals({
        setLoadingGenerate,
        keyVisuals,
        onSetKeyVisuals,
        sessionId: sessionId as string,
      });
    } else if (keyVisuals.length === 0 && !keyword) {
      // If no keyword, redirect back to step 2 (keyword selection)
      console.warn("No keyword found in localStorage, redirecting to step 2");
      onPrev();
    }
  }, []);

  const handleRegenerate = () => {
    setSelectedVisuals([]); // Clear selection when regenerating
    regenerateVisuals({
      setLoadingRegenerate,
      onSetKeyVisuals,
      sessionId: sessionId as string,
    });
  };

  // Determine loading message based on which operation is in progress
  const getLoadingMessage = () => {
    if (loading) return "競合分析中...";
    if (loadingRegenerate) return "キービジュアルを再生成中...";
    if (loadingGenerate) return "キービジュアルを取得中...";
    return "処理中...";
  };

  const isAnyLoading = loading || loadingGenerate || loadingRegenerate;

  return (
    <>
      {/* Loading Overlay */}
      <LoadingOverlay
        isVisible={isAnyLoading}
        progress={50}
        message={getLoadingMessage()}
        showProgress={false}
      />

      {/* <div className="px-10 h-full flex flex-col gap-5 container justify-between">
        <div className="flex flex-col gap-4">
          <h1 className="text-2xl font-bold leading-none">
            プロダクト／サービスに​合う​キービジュアルを​3つ​選んでください​
          </h1>
          <Button
            variant="outline"
            className="w-fit"
            onClick={onPrev}
            type="button"
            disabled={loadingSubmit || loadingGenerate}
          >
            ＜ キーワードを​選び直す
          </Button>
        </div>

        <div className="overflow-x-scroll w-full relative ">
          <ToggleGroup
            type="multiple"
            className="gap-4 w-fit pb-4 "
            value={selectedVisuals}
            onValueChange={(value: string[]) => {
              if (selectedVisuals.length < 3) {
                setSelectedVisuals(value);
              } else {
                if (selectedVisuals.includes(value[value.length - 1])) {
                  setSelectedVisuals(value);
                }
              }
            }}
          >
            {keyVisuals.map((keyVisual: any, index) => (
              <KeyVisualsCard keyVisual={keyVisual} index={index} key={index} />
            ))}
          </ToggleGroup>
          {loadingGenerate && (
            <div className="flex gap-4 w-full h-full justify-center items-center bg-white opacity-70 fixed top-0 left-0">
              <Spinner className="w-6 h-6 opacity-100" />
              <p className="text-lg font-medium opacity-100">
                キービジュアルを生成中...
              </p>
            </div>
          )}
        </div>

        <div className="flex justify-center gap-4">
          <Button
            variant="outline"
            className="w-fit"
            type="button"
            onClick={() =>
              getMoreVisuals({
                setLoadingGenerate,
                keyVisuals,
                onSetKeyVisuals,
                sessionId: sessionId as string,
              })
            }
            disabled={loadingSubmit || loadingGenerate}
          >
            {loadingGenerate && <Spinner className="w-4 h-4 mr-2" />}
            さらに​5件表示する​
          </Button>
          <Button
            onClick={() =>
              submitStep3({
                selectedVisuals,
                keyVisuals,
                onSetBriefPlanning,
                onNext,
                setLoadingSubmit,
                sessionId: sessionId as string,
              })
            }
            disabled={loadingSubmit || selectedVisuals.length < 3}
            className=" border-2 border-sky-600 bg-sky-600  hover:bg-sky-500 text-white px-4 py-2"
          >
            {loadingSubmit && <Spinner className="w-3 h-3" />}
            次に​進む
          </Button>
        </div>
      </div> */}

      <div className="flex-1 w-full max-w-[1400px] mx-auto px-6 py-4 flex flex-col h-full items-start">
        <div className="mb-4 animate-fade-in-up">
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight mb-2 text-slate-800">
            キービジュアル選択
          </h1>
          <p className="text-slate-500 text-base">
            プロダクト/サービスに合うキービジュアルを3つ選んでください
          </p>
        </div>
        <div className="w-full">
          <Card variant="elevated" className="w-full bg-white rounded-xl border border-slate-200 shadow-sm p-6">
            <VisualSelector
              visuals={keyVisuals}
              selectedVisuals={selectedVisuals}
              onSelectionChange={setSelectedVisuals}
              label="プロダクト / サービスに合うキービジュアルを3つ選んでください"
              onShowMore={() =>
                getMoreVisuals({
                  setLoadingGenerate,
                  keyVisuals,
                  onSetKeyVisuals,
                  sessionId: sessionId as string,
                })
              }
              isLoadingMore={loadingGenerate}
            />
            <div className="flex justify-end mt-10 pt-6 border-t border-slate-100 gap-4">
              <Button
                variant={"secondary"}
                className="px-6 py-2.5 rounded-lg text-slate-500 font-semibold hover:text-slate-800 hover:bg-slate-100"
                onClick={onPrev}
                disabled={loading || loadingGenerate || loadingRegenerate}
              >
                戻る
              </Button>
              <Button
                className="bg-[#0093b4] hover:bg-[#007a92] px-8 py-2.5 rounded-lg font-semibold shadow-sm"
                disabled={loading || selectedVisuals.length < 3}
                onClick={() =>
                  submitStep3({
                    selectedVisuals,
                    keyVisuals,
                    onSetCompetitiveMatrix,
                    onNext,
                    setLoadingSubmit: setLoading,
                    sessionId: sessionId as string,
                  })
                }
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
          </Card>
        </div>
      </div>
    </>
  );
};

export default Step3;
