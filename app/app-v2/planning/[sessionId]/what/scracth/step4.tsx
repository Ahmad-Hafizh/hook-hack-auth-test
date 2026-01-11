"use client";
import { Button } from "@/components/ui/button";
import React from "react";
import { useParams } from "next/navigation";
import { RadioGroup } from "@/components/ui/radio-group";

import { Spinner } from "@/components/ui/spinner";
import { submitStep4 } from "../hooks/useFetchAPINext";
import { usePlanningWhatDataContext } from "../hooks/planningWhatDataContext";
import { Card, PageHeader } from "@/components/lp-analyzer";
import { ArrowRight } from "lucide-react";
import CompetitiveMatrix from "../components/competitiveMatrix";

const Step4 = ({ onNext }: { onNext: () => void }) => {
  const { briefPlanning, onSetValueOrganization } =
    usePlanningWhatDataContext();

  const { sessionId } = useParams();
  const [loading, setLoading] = React.useState(false);
  const [selectedOption, setSelectedOption] = React.useState("your-company");

  const [strongPoints, setStrongPoints] = React.useState<string[]>(
    briefPlanning.user.strong_points
  );
  const [keyMessage, setKeyMessage] = React.useState<string>(
    briefPlanning.user.key_message
  );

  const [suggestionStrongPoints, setSuggestionStrongPoints] = React.useState<
    string[]
  >(briefPlanning.suggestion.strong_points);

  const [suggestionKeyMessage, setSuggestionKeyMessage] =
    React.useState<string>(briefPlanning.suggestion.key_message);

  const [submitProgress, setSubmitProgress] = React.useState({
    percent: 0,
    message: "",
  });

  return (
    <div className="flex-1 w-full max-w-6xl mx-auto px-4 py-12 md:px-8 flex flex-col justify-center h-full items-start">
      <PageHeader
        title="競合マトリクス"
        description="AI分析による競合3社の統合サマリーと、自社LPの差別化構成案を編集・確認します。"
      />
      <div className="w-full">
        <div className="flex flex-col gap-8">
          {/* card */}
          <Card variant="elevated" className="w-full">
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
                  />
                </RadioGroup>
                <CompetitiveMatrix
                  type="competitor"
                  competitors={briefPlanning.competitors}
                />
              </div>
            </div>
            <div className="flex justify-center mt-10 gap-4">
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
                    competitorsMatrix: briefPlanning.competitors,
                    onSetSubmitProgress: (progress, message) =>
                      setSubmitProgress({ percent: progress, message }),
                    onSetValueOrganization,
                    onNext,
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
    </div>
  );
};

export default Step4;
