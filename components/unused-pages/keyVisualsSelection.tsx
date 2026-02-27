"use client";
import { Button } from "@/components/ui/button";
import React, { useEffect } from "react";

import { Spinner } from "@/components/ui/spinner";
import { redirect, useParams } from "next/navigation";
import { LoadingOverlay } from "@/components/ui/loading-overlay";
import { Card, PageHeader, VisualSelector } from "@/components/lp-analyzer";
import { ArrowRight } from "lucide-react";
import callApi from "@/config/axios/axios";
import { usePlanningWhatDataContext } from "@/app/app-v3/[sessionId]/planning/context/planningWhatDataContext";

const KeyVisualsSelectionPage = ({
  onNext,
  onPrev,
}: {
  onNext: () => void;
  onPrev: () => void;
}) => {
  const { sessionId } = useParams();
  // const [selectedVisuals, setSelectedVisuals] = React.useState<string[]>([]);
  const [submitting, setSubmitting] = React.useState(false);
  const [generatingMore, setGeneratingMore] = React.useState(false);
  const [regenerating, setRegenerating] = React.useState(false);
  const {
    onSetCompetitiveMatrix,
    onSetKeyVisuals,
    keyVisuals,
    selectedKeyVisuals,
    onSetSelectedKeyVisuals,
  } = usePlanningWhatDataContext();

  const getMoreVisuals = async () => {
    try {
      setGeneratingMore(true);
      const exclude_domains = keyVisuals.map((w) => w.url);
      // Get keyword from localStorage as fallback
      const { data } = await callApi.post(
        "/app-v2/planning/what/step3/generate",
        {
          exclude_domains,
          sessionId,
        },
      );

      if (data.key_visuals && data.key_visuals.length > 0) {
        sessionStorage.setItem(
          "keyVisuals",
          JSON.stringify([...keyVisuals, ...data.key_visuals]),
        );
        onSetKeyVisuals([...keyVisuals, ...data.key_visuals]);
      }
    } catch (error) {
      console.error("Error submitting get additional key visuals:", error);
    } finally {
      setGeneratingMore(false);
    }
  };

  const replaceCurrentVisuals = async () => {
    try {
      console.log("replace triggered");

      setGeneratingMore(true);
      const exclude_domains = keyVisuals.map((w) => w.url);
      // Get keyword from localStorage as fallback
      const { data } = await callApi.post(
        "/app-v2/planning/what/step3/generate",
        {
          exclude_domains,
          sessionId,
        },
      );

      // setSelectedVisuals([]);
      onSetSelectedKeyVisuals([]);
      sessionStorage.removeItem("selectedKeyVisuals");
      onSetKeyVisuals([...data.key_visuals]);
      sessionStorage.setItem(
        "keyVisuals",
        JSON.stringify([...data.key_visuals]),
      );
    } catch (error) {
      console.error("Error submitting get additional key visuals:", error);
    } finally {
      setGeneratingMore(false);
    }
  };

  const regenerateVisuals = async () => {
    try {
      setRegenerating(true);
      const { data } = await callApi.post("/app-v2/planning/what/step3/fetch", {
        sessionId,
      });
      console.log(data);

      if (data) {
        if (data.selected_keyVisual && data.selected_keyVisual.length > 0) {
          // sessionStorage.setItem(
          //   "selectedKeyVisuals",
          //   JSON.stringify(data.selected_keyVisual),
          // );
          onSetSelectedKeyVisuals(data.selected_keyVisual);
        }
        if (data.key_visuals && data.key_visuals.length > 0) {
          // sessionStorage.setItem(
          //   "keyVisuals",
          //   JSON.stringify(data.key_visuals),
          // );
          onSetKeyVisuals(data.key_visuals);
        }
      }
    } catch (error) {
      console.error("Error regenerating key visuals:", error);
    } finally {
      setRegenerating(false);
    }
  };

  const submitStep3 = async () => {
    try {
      setSubmitting(true);
      const { data, statusText } = await callApi.post(
        "/app-v2/planning/what/step3",
        {
          selected_keyVisual: selectedKeyVisuals,
          sessionId,
          keyVisuals,
        },
      );

      if (statusText == "invalid") {
        redirect("/app-v2/planning/what");
      }

      sessionStorage.setItem(
        "selectedKeyVisuals",
        JSON.stringify(selectedKeyVisuals),
      );

      sessionStorage.setItem("keyVisuals", JSON.stringify(keyVisuals));
      sessionStorage.setItem(
        "competitiveMatrix",
        JSON.stringify(data.key_message),
      );

      onSetCompetitiveMatrix(data.key_message);
      onNext();
    } catch (error) {
      // const { status, statusText } = (error as any).response || {};
      // if (status == 401 && statusText == "invalid") {
      //   redirect("/app-v2/planning/what");
      // } else {
      //   console.error("Error submitting Step 3:", error);
      // }
      console.log(error);
    } finally {
      setSubmitting(false);
    }
  };

  useEffect(() => {
    // if (keyVisuals.length > 0 && selectedKeyVisuals.length > 0) return;
    // const selectedSession = sessionStorage.getItem("selectedKeyVisuals");
    // const keyVisualsSession = sessionStorage.getItem("keyVisuals");

    // if (selectedSession && keyVisualsSession) {
    //   const parsedKeyVisuals = JSON.parse(keyVisualsSession);
    //   const parsedSelected = JSON.parse(selectedSession);

    //   onSetKeyVisuals(parsedKeyVisuals);
    //   onSetSelectedKeyVisuals(parsedSelected);
    // } else {
    regenerateVisuals();
    // }
  }, []);

  console.log(selectedKeyVisuals);

  if (regenerating) {
    return (
      <div className="flex-1 w-full max-w-6xl mx-auto px-4 py-12 md:px-8 flex flex-col justify-center h-full items-center">
        <Spinner className="h-8 w-8" />
        <p className="mt-4 text-gray-600">キービジュアルを再生成中...</p>
      </div>
    );
  }

  // Determine loading message based on which operation is in progress
  const getLoadingMessage = () => {
    if (submitting) return "競合分析中...";
    if (regenerating) return "キービジュアルを再生成中...";
    if (generatingMore) return "キービジュアルを取得中...";
    return "処理中...";
  };

  const isAnyLoading = submitting || regenerating || generatingMore;

  return (
    <>
      <LoadingOverlay
        isVisible={isAnyLoading}
        progress={50}
        message={getLoadingMessage()}
        showProgress={false}
      />
      <div className="flex-1 w-full max-w-6xl mx-auto px-4 py-12 md:px-8 flex flex-col justify-center h-full items-start">
        <PageHeader title="キービジュアル選択" />
        <div className="w-full">
          <div className="flex flex-col gap-8">
            {/* card */}
            <Card variant="elevated" className="w-full">
              <VisualSelector
                visuals={keyVisuals}
                selectedVisuals={selectedKeyVisuals}
                onSelectionChange={onSetSelectedKeyVisuals}
                label="プロダクト / サービスに合うキービジュアルを3つ選んでください"
                onShowMore={getMoreVisuals}
                onRegenerate={regenerateVisuals}
                isRegenerating={regenerating}
                isLoadingMore={generatingMore}
              />
              <div className="flex justify-end mt-10 gap-4">
                <Button
                  variant={"secondary"}
                  className="bg-gray-50 text-gray-500"
                  size={"lg"}
                  onClick={onPrev}
                  disabled={submitting || generatingMore || regenerating}
                >
                  戻る
                </Button>
                <Button
                  className="bg-cyan-600 hover:bg-cyan-700"
                  size={"lg"}
                  disabled={submitting || selectedKeyVisuals.length < 3}
                  onClick={submitStep3}
                >
                  次に進む <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};

export default KeyVisualsSelectionPage;
