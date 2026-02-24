"use client";
import { Button } from "@/components/ui/button";
import React from "react";
import { useParams } from "next/navigation";
import { RadioGroup } from "@/components/ui/radio-group";

import { Spinner } from "@/components/ui/spinner";
import { LoadingOverlay } from "@/components/ui/loading-overlay";
import { submitStep4 } from "../hooks/useFetchAPINext";
import { usePlanningWhatDataContext } from "../hooks/planningWhatDataContext";
import { Card, PageHeader } from "@/components/lp-analyzer";
import { ArrowRight } from "lucide-react";
import CompetitiveMatrix from "../components/competitiveMatrix";
import { usePlannningContext } from "@/app/app-v2/plannningContext";

const Step4 = ({ onNext, onPrev }: { onNext: () => void; onPrev?: () => void }) => {
  const {
    competitiveMatrix,
    onSetValueOrganization,
    onSetSelectedMatrix,
    selectedMatrix,
  } = usePlanningWhatDataContext();

  const { sessionId } = useParams();
  const [loading, setLoading] = React.useState(false);
  const [selectedOption, setSelectedOption] = React.useState("your-company");

  const [strongPoints, setStrongPoints] = React.useState<string[]>(
    competitiveMatrix.user?.strong_points || [],
  );
  const [keyMessage, setKeyMessage] = React.useState<string>(
    competitiveMatrix.user?.key_message || "",
  );

  const [suggestionStrongPoints, setSuggestionStrongPoints] = React.useState<
    string[]
  >(competitiveMatrix.suggestion?.strong_points || []);

  const [suggestionKeyMessage, setSuggestionKeyMessage] =
    React.useState<string>(competitiveMatrix.suggestion?.key_message || "");

  const [submitProgress, setSubmitProgress] = React.useState({
    percent: 0,
    message: "",
  });

  return (
    <>
      {/* Loading Overlay with SSE Progress */}
      <LoadingOverlay
        isVisible={loading}
        progress={submitProgress.percent}
        message={submitProgress.message || "データを分析中..."}
        showProgress={true}
      />

      <div className="flex-1 w-full max-w-[1400px] mx-auto px-6 py-4 flex flex-col h-full items-start">
      <div className="mb-4 animate-fade-in-up">
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight mb-2 text-slate-800">
          競合マトリクス
        </h1>
        <p className="text-slate-500 text-base">
          AI分析による競合3社の統合サマリーと、自社LPの差別化構成案を編集・確認します
        </p>
      </div>
      <div className="w-full">
        <Card variant="elevated" className="w-full bg-white rounded-xl border border-slate-200 shadow-sm p-6">
          <div className="w-full overflow-x-scroll pb-10">
            <div className="flex flex-row gap-8 w-fit items-start justify-start ">
              <RadioGroup
                value={selectedOption}
                onValueChange={setSelectedOption}
                className="gap-8 flex w-full"
              >
                <CompetitiveMatrix
                  type="own"
                  onSetKeymessage={(value) => setKeyMessage(value)}
                  onSetStrongPoint={(value, index) => {
                    const newStrongPoints = [...strongPoints];
                    newStrongPoints[index] = value;
                    setStrongPoints(newStrongPoints);
                  }}
                  keymessage={keyMessage}
                  strongPoint={strongPoints}
                  keymessageTags={competitiveMatrix.user?.key_message_tags}
                  strongPointsTagged={competitiveMatrix.user?.strong_points_tagged}
                  cta={competitiveMatrix.user?.cta}
                  ctaTags={competitiveMatrix.user?.cta_tags}
                />
                <CompetitiveMatrix
                  type="ai-summary"
                  onSetKeymessage={(value) => setSuggestionKeyMessage(value)}
                  onSetStrongPoint={(value, index) => {
                    const newStrongPoints = [...suggestionStrongPoints];
                    newStrongPoints[index] = value;
                    setSuggestionStrongPoints(newStrongPoints);
                  }}
                  keymessage={suggestionKeyMessage}
                  strongPoint={suggestionStrongPoints}
                  keymessageTags={competitiveMatrix.suggestion?.key_message_tags}
                  strongPointsTagged={competitiveMatrix.suggestion?.strong_points_tagged}
                  cta={competitiveMatrix.suggestion?.cta}
                  ctaTags={competitiveMatrix.suggestion?.cta_tags}
                />
              </RadioGroup>
              <CompetitiveMatrix
                type="competitor"
                competitors={competitiveMatrix.competitors}
              />
            </div>
          </div>
          <div className="flex justify-end mt-10 pt-6 border-t border-slate-100 gap-4">
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
              disabled={loading}
              onClick={() =>
                submitStep4({
                  keyMessage:
                    selectedOption === "your-company"
                      ? keyMessage
                      : suggestionKeyMessage,
                  strongPoints:
                    selectedOption === "your-company"
                      ? strongPoints
                      : suggestionStrongPoints,
                  onSetLoading: (loading) => setLoading(loading),
                  sessionId: sessionId as string,
                  competitorsMatrix: competitiveMatrix.competitors,
                  onSetSubmitProgress: (progress, message) =>
                    setSubmitProgress({ percent: progress, message }),
                  onSetValueOrganization,
                  onNext,
                  onSetSelectedMatrix,
                })
              }
            >
              {loading ? (
                <>
                  <Spinner className="h-4 w-4" />
                  {submitProgress.percent}% {submitProgress.message}
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

export default Step4;
