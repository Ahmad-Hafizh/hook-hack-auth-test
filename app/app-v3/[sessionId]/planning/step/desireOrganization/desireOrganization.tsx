"use client";
import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { usePlanningWhatDataContext } from "../../context/planningWhatDataContext";
import { Card } from "../../components/card";
import { LoadingOverlay } from "@/components/ui/loading-overlay";
import { ArrowRight } from "lucide-react";
import callApi from "@/config/axios/axios";
import { useParams } from "next/navigation";
import { DesireCard } from "./components/desireCard";
import { IPositioningPatterns } from "../../context/dataTypes";
import { errorToastCaller } from "../../components/toastCaller";

const DesireOrganizationPage = ({
  onNext,
  onPrev,
  stepId,
}: {
  stepId?: number;
  onNext: () => void;
  onPrev?: () => void;
}) => {
  const {
    desireOrganization,
    onSetDesireOrganization,
    onSetPositioningPatterns,
  } = usePlanningWhatDataContext();

  const [submitting, setSubmitting] = React.useState(false);
  const [regenerating, setRegenerating] = React.useState(false);

  const [checkedTobes, setCheckedTobes] = React.useState<string[]>([]);
  const [submitProcess, setSubmitProcess] = React.useState<{
    percent: number;
    message: string;
  }>({ percent: 0, message: "" });
  const { sessionId } = useParams();

  const onSubmit = async () => {
    try {
      setSubmitting(true);
      setSubmitProcess({ percent: 10, message: "ポジショニングを分析中..." });
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/app-v3/planning/what/step5/sse`,
        {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            sessionId,
            desireOrganization,
            selectedDesireOrganization: checkedTobes,
            step: stepId || 7,
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
                setSubmitProcess({
                  percent: Number(jsonData.percent),
                  message: jsonData.message,
                });
              } else if (jsonData.positioning_patterns) {
                const positioning_patterns: IPositioningPatterns[] =
                  jsonData.positioning_patterns;

                onSetPositioningPatterns(positioning_patterns);
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
          if (jsonData.positioning_patterns) {
            const positioning_patterns: IPositioningPatterns[] =
              jsonData.positioning_patterns;

            console.log("final positioning patterns:", positioning_patterns);
            onSetPositioningPatterns(positioning_patterns);

            onNext();
          }
        } catch (e) {
          console.error("Failed to parse final JSON:", buffer, e);
        }
      }
    } catch (error: any) {
      errorToastCaller(error);
    } finally {
      setSubmitting(false);
    }
  };

  const onRegenerate = async () => {
    try {
      setRegenerating(true);
      const { data } = await callApi.post("/app-v3/planning/what/step5/fetch", {
        sessionId,
      });
      console.log(data);

      const desireData = data.desireOrganization || [];
      onSetDesireOrganization(desireData);

      // Build set of valid IDs from current desire data
      const validIds = new Set<string>();
      for (const desireOrg of desireData) {
        validIds.add(`${desireOrg.value_id}_${desireOrg.desire_1.desire}`);
        validIds.add(`${desireOrg.value_id}_${desireOrg.desire_2.desire}`);
      }

      // Filter out any stale/phantom IDs that don't match current data
      const selectedIds: string[] = data.selectedDesireOrganization || [];
      setCheckedTobes(selectedIds.filter((id: string) => validIds.has(id)));
    } catch (error) {
      errorToastCaller(error);
    } finally {
      setRegenerating(false);
    }
  };

  useEffect(() => {
    onRegenerate();
  }, []);

  const onTobeChange = async (
    value_id: string,
    desireKey: "desire_1" | "desire_2",
    field: string,
    value: string,
  ) => {
    const duplicate = [...desireOrganization];
    const index = duplicate.findIndex((e) => e.value_id === value_id);
    const desire = duplicate[index][desireKey];
    desire.tobe = {
      ...desire.tobe,
      [field]: value,
    };

    onSetDesireOrganization(duplicate);
  };

  if (regenerating) {
    return (
      <div className="flex items-center justify-center h-full">
        <LoadingOverlay
          isVisible={true}
          message="前回の選択を読み込んでいます..."
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
        progress={submitProcess.percent}
        message={submitProcess.message || "ポジショニングを分析中..."}
        showProgress={true}
      />

      <div className="flex-1 w-full max-w-[1400px] mx-auto px-6 py-4 flex flex-col h-full items-start">
        <div className="w-full mb-4 animate-fade-in-up">
          <div className="w-full flex justify-between items-start">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold tracking-tight mb-2 text-slate-800">
                {stepId || 7}. ニーズ整理
              </h1>
              <p className="text-black text-lg">
                価値×欲求で​発散した​12個の​TOBEから、​採用する​TOBEを​4つ​選び、​必要に​応じて​編集してください
              </p>
            </div>
            <div className="inline-flex items-center gap-2 bg-white border border-slate-200 rounded-lg px-4 py-2 shadow-sm">
              <span className="text-sm font-medium text-slate-600">
                選択数:
              </span>
              <span
                className={`text-lg font-bold ${checkedTobes.length === 4 ? "text-[#0093b4]" : "text-slate-800"}`}
              >
                {checkedTobes.length}
              </span>
              <span className="text-sm text-slate-400">/ 4</span>
            </div>
          </div>
        </div>
        <div className="w-full">
          <Card
            variant="elevated"
            className="w-full bg-white rounded-xl border border-slate-200 shadow-sm p-6"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-8 w-full ">
              {desireOrganization.map((desireOrg, i) => (
                <DesireCard
                  key={i}
                  value_id={desireOrg.value_id}
                  value_display_id={`価値${i + 1}`}
                  value_category={desireOrg.value_category}
                  value_label={desireOrg.value_label}
                  desire_1={desireOrg.desire_1}
                  desire_1_id={`${desireOrg.value_id}_${desireOrg.desire_1.desire}`}
                  desire_2={desireOrg.desire_2}
                  desire_2_id={`${desireOrg.value_id}_${desireOrg.desire_2.desire}`}
                  checkedTobes={checkedTobes}
                  onCheckChange={(desire_id, checked) => {
                    if (checked && checkedTobes.length < 4) {
                      setCheckedTobes([...checkedTobes, desire_id]);
                    } else {
                      setCheckedTobes(
                        checkedTobes.filter((id) => id !== desire_id),
                      );
                    }
                  }}
                  onDesireChange={(desireKey, field, value) => {
                    const updated = [...desireOrganization];
                    const desire =
                      updated[i][desireKey as "desire_1" | "desire_2"];
                    desire.tobe = {
                      ...desire.tobe,
                      [field]: value,
                    };
                    onSetDesireOrganization(updated);
                  }}
                  onTobeChange={onTobeChange}
                />
              ))}
            </div>
            <div className="flex justify-end mt-10 pt-6 border-t border-slate-100 gap-4">
              <Button
                variant={"secondary"}
                className="px-6 py-2.5 rounded-lg text-slate-500 font-semibold hover:text-slate-800 hover:bg-slate-100"
                onClick={onPrev}
                disabled={submitting}
              >
                戻る
              </Button>
              <Button
                className="bg-[#0093b4] hover:bg-[#007a92] px-8 py-2.5 rounded-lg font-semibold shadow-sm"
                disabled={submitting || checkedTobes.length < 4}
                onClick={onSubmit}
              >
                次に進む <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </>
  );
};

export default DesireOrganizationPage;
