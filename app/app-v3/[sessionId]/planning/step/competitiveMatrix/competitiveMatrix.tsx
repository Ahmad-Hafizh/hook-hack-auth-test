"use client";
import { Button } from "@/components/ui/button";
import React, { useEffect } from "react";
import { useParams } from "next/navigation";
import { LoadingOverlay } from "@/components/ui/loading-overlay";
import { usePlanningWhatDataContext } from "../../context/planningWhatDataContext";
import { ArrowRight } from "lucide-react";
import callApi from "@/config/axios/axios";
import { Card } from "../../components/card";
import Matrix from "./components/matrix";
import { errorToastCaller } from "../../components/toastCaller";

const CompetitiveMatrixPage = ({
  onNext,
  onPrev,
  stepId,
}: {
  onNext: () => void;
  onPrev?: () => void;
  stepId?: number;
}) => {
  const {
    competitiveMatrix,
    onSetValueOrganization,
    onSetSelectedMatrix,
    selectedMatrix,
    onSetCompetitiveMatrix,
  } = usePlanningWhatDataContext();

  const { sessionId } = useParams();
  const [submitting, setSubmitting] = React.useState(false);
  const [regenerating, setRegenerating] = React.useState(false);
  const [candidates, setCandidates] = React.useState<any[]>([]);
  const [submitProgress, setSubmitProgress] = React.useState({
    percent: 0,
    message: "",
  });

  const onRegenerate = async () => {
    try {
      setRegenerating(true);
      const { data } = await callApi.post("/app-v3/planning/what/step3/fetch", {
        sessionId,
      });

      if (data) {
        if (data.competitiveMatrix) {
          onSetCompetitiveMatrix({
            user: data.competitiveMatrix.user,
            competitors: data.competitiveMatrix.competitors,
            suggestion: data.competitiveMatrix.suggestion,
          });
        }
        // Always default to "user" since the radio selection was removed
        onSetSelectedMatrix("user");
        if (data.candidates) {
          setCandidates(data.candidates);
        }
      }
    } catch (error) {
      errorToastCaller(error);
    } finally {
      setRegenerating(false);
    }
  };

  const onSubmit = async () => {
    try {
      setSubmitting(true);
      setSubmitProgress({ percent: 10, message: "データを送信中..." });
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/app-v3/planning/what/step3/sse`,
        {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            sessionId,
            selectedCompetitiveMatrix: selectedMatrix,
            competitiveMatrix: competitiveMatrix,
            step: stepId || 5,
          }),
        },
      );

      const reader = response.body?.getReader();
      const decoder = new TextDecoder("utf-8");
      let buffer = "";

      while (true) {
        const { done, value } = await reader!.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        buffer += chunk;

        const lines = buffer.split("\n");
        buffer = lines.pop() || "";

        for (const line of lines) {
          if (line.trim().startsWith("data: ")) {
            try {
              const jsonData = JSON.parse(line.substring(6));

              if (jsonData.percent && jsonData.message) {
                setSubmitProgress({
                  percent: Number(jsonData.percent),
                  message: jsonData.message,
                });
              } else if (jsonData.values) {
                onSetValueOrganization(jsonData.values);
                onNext();
              }
            } catch (e) {
              console.error("Failed to parse JSON:", line, e);
            }
          }
        }
      }

      // Process remaining buffer
      if (buffer.trim().startsWith("data: ")) {
        try {
          const jsonData = JSON.parse(buffer.substring(6));
          if (jsonData.values) {
            onSetValueOrganization(jsonData.values);
            onNext();
          }
        } catch (e) {
          console.error("Failed to parse final JSON:", buffer, e);
        }
      }
    } catch (error) {
      errorToastCaller(error);
    } finally {
      setSubmitting(false);
      setSubmitProgress({ percent: 0, message: "" });
    }
  };

  useEffect(() => {
    onRegenerate();
  }, []);

  if (regenerating) {
    return (
      <div className="flex items-center justify-center h-full">
        <LoadingOverlay
          isVisible={regenerating}
          message={"データを再生成中..."}
          showProgress={false}
        />
      </div>
    );
  }

  return (
    <>
      {/* Loading Overlay with SSE Progress */}
      <LoadingOverlay
        isVisible={submitting}
        progress={submitProgress.percent}
        message={submitProgress.message || "データを分析中..."}
        showProgress={true}
      />

      <div className="flex-1 w-full max-w-[1400px] mx-auto px-6 py-4 flex flex-col h-full items-start">
        <div className="mb-4 animate-fade-in-up">
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight mb-2 text-slate-800">
            {stepId || 5}. 分析素材の確認
          </h1>
          <p className="text-black text-lg">
            選んだ競合3社と各LPの内容をもとに、次のステップで提供価値（何を）とニーズ（誰に）を整理していきます。
          </p>
          <h2 className="text-xl font-bold text-slate-700 mt-4">
            ベンチマークマトリクス
          </h2>
        </div>
        <div className="w-full">
          <div className="flex flex-col gap-8">
            {/* card */}
            <Card variant="elevated" className="w-full">
              <div className="w-full overflow-x-scroll pb-10">
                <div className="flex flex-row gap-8 w-fit items-start justify-start ">
                  <Matrix type="user" matrix={competitiveMatrix.user} />
                  <Matrix
                    type="suggestion"
                    matrix={competitiveMatrix.suggestion}
                  />
                  <div className="flex flex-col gap-3 group  ">
                    {/* Header */}
                    <div className="bg-gray-50 p-4 rounded-xl shadow-sm relative overflow-hidden flex-none h-[70px] flex flex-col justify-center">
                      <div className="flex items-center justify-between">
                        <h3 className="font-bold text-lg text-text-main flex items-center gap-2 text-gray-500">
                          ベンチマーク情報
                        </h3>
                      </div>
                    </div>

                    <div className="bg-gray-50 p-5 rounded-xl border shadow-sm flex flex-row gap-6 h-full min-h-[860px] text-gray-500 ">
                      {competitiveMatrix.competitors?.map((matrix, index) => {
                        const matchedCandidate = candidates.find(
                          (c: any) =>
                            c.url && matrix.url && c.url === matrix.url,
                        );
                        const companyName =
                          matchedCandidate?.company_name ||
                          matchedCandidate?.service_name ||
                          "";
                        return (
                          <div key={index} className="flex flex-row gap-6">
                            <Matrix
                              type="competitor"
                              matrix={matrix}
                              screenshotUrl={matrix.screenshot_url}
                              companyName={companyName}
                            />
                            {index <
                              (competitiveMatrix.competitors?.length || 0) -
                                1 && (
                              <hr className="w-[1px] h-full bg-slate-300" />
                            )}
                          </div>
                        );
                      }) || null}
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex justify-end mt-10 gap-4">
                <Button
                  variant={"secondary"}
                  className="bg-gray-50 text-gray-500"
                  size={"lg"}
                  onClick={onPrev}
                  disabled={submitting}
                >
                  戻る
                </Button>
                <Button
                  className="bg-cyan-600 hover:bg-cyan-700"
                  size={"lg"}
                  disabled={submitting}
                  onClick={onSubmit}
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

export default CompetitiveMatrixPage;
