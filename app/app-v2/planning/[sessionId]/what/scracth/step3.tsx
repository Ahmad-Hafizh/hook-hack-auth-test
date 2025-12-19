"use client";
import { Button } from "@/components/ui/button";
import { ToggleGroup } from "@/components/ui/toggle-group";
import React, { useEffect } from "react";
import KeyVisualsCard from "../components/keyVisualsCard";
import { submitStep3, getMoreVisuals } from "../hooks/useFetchAPINext";
import { Spinner } from "@/components/ui/spinner";
import { useParams } from "next/navigation";
import { IBriefPlanning } from "../hooks/planningWhatDataContext";

const Step3 = ({
  onNext,
  onPrev,
  onSetBriefPlanning,
  keyVisuals,
  onSetKeyVisuals,
}: {
  onNext: () => void;
  onPrev: () => void;
  selectedKeywords: string;
  keyVisuals: any[];
  onSetKeyVisuals: (visuals: any[]) => void;
  onSetBriefPlanning: (briefPlanning: IBriefPlanning) => void;
}) => {
  const { sessionId } = useParams();
  const [selectedVisuals, setSelectedVisuals] = React.useState<string[]>([]);

  const [loadingSubmit, setLoadingSubmit] = React.useState(false);
  const [loadingGenerate, setLoadingGenerate] = React.useState(false);

  useEffect(() => {
    if (keyVisuals.length === 0) {
      getMoreVisuals({
        setLoadingGenerate,
        keyVisuals,
        onSetKeyVisuals,
        sessionId: sessionId as string,
      });
    }
  }, []);

  return (
    <div className="px-10 h-full flex flex-col gap-5 container justify-between">
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
    </div>
  );
};

export default Step3;
