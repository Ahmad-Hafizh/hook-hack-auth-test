"use client";
import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  IDesire,
  usePlanningWhatDataContext,
} from "../hooks/planningWhatDataContext";
import { Card, PageHeader } from "@/components/lp-analyzer";
import { ValueDesireCard } from "@/components/lp-analyzer/ValueDesireCard";
import { Spinner } from "@/components/ui/spinner";
import { LoadingOverlay } from "@/components/ui/loading-overlay";
import { ArrowRight } from "lucide-react";
import { submitStep6 } from "../hooks/useFetchAPINext";
import { usePlannningContext } from "@/app/app-v2/plannningContext";

const Step6 = ({
  onNext,
  onPrev,
}: {
  onNext: () => void;
  onPrev?: () => void;
}) => {
  const {
    desireOrganization,
    onSetDesireOrganization,
    valueOrganization,
    selectedValueOrganization,
    competitiveMatrix,
    onSetPositioningPatterns,
    selectedMatrix,
    onSetSelectedValueOrganization,
    onSetSelectedTobes,
  } = usePlanningWhatDataContext();

  const [loading, setLoading] = React.useState(false);
  const [checkedTobes, setCheckedTobes] = React.useState<string[]>([]);
  const [submitProcess, setSubmitProcess] = React.useState<{
    percent: number;
    message: string;
  }>({ percent: 0, message: "" });

  const onSubmit = () => {
    // Map selected IDs to full value objects
    // selectedValueOrganization contains string IDs like "P1", "P2"
    const selectedValue6 = selectedValueOrganization
      .map((e: any) => {
        // Handle if e is already an object (from previous run) or string ID
        const id = typeof e === "string" ? e : e?.id;
        return valueOrganization.find((v) => v.id === id);
      })
      .filter(Boolean); // Remove nulls

    // Don't overwrite selectedValueOrganization - keep it as string IDs
    localStorage.setItem("selected_values_6", JSON.stringify(selectedValue6));

    const selectedTobe4 = checkedTobes.map((e) => {
      const [value_id, desire] = e.split("_");
      const desireObj = desireOrganization.find((v) => v.value_id === value_id);
      const desireTobe: IDesire | null =
        desireObj?.desire_1.desire === desire
          ? desireObj.desire_1
          : desireObj?.desire_2.desire === desire
            ? desireObj.desire_2
            : null;
      return {
        id: desireObj?.value_id,
        value_id: desireObj?.value_id,
        value_label: desireObj?.value_label,
        desire: desireTobe?.desire,
        old_assumption: desireTobe?.tobe.old_assumption,
        new_assumption: desireTobe?.tobe.new_assumption,
        judgment: desireTobe?.tobe.judgment,
        action: desireTobe?.tobe.action,
      };
    });
    onSetSelectedTobes(selectedTobe4 as any);
    localStorage.setItem("selected_tobe_4", JSON.stringify(selectedTobe4));

    submitStep6({
      own_lp_summary: `${selectedMatrix.key_message}, ${selectedMatrix.strong_points.join(", ")}`,
      competitors_summary: competitiveMatrix.competitors.map(
        (c) => `${c.key_message}, ${c.strong_points.join(", ")}`,
      ),
      selected_values_6: selectedValue6,
      selected_tobe_4: selectedTobe4,
      onSetPositioningPatterns,
      onNext,
      onSetSubmitProcess: (percent, message) => {
        setSubmitProcess({ percent, message });
      },
      onSetLoading: (loading) => setLoading(loading),
    });
  };

  return (
    <>
      {/* Loading Overlay with SSE Progress */}
      <LoadingOverlay
        isVisible={loading}
        progress={submitProcess.percent}
        message={submitProcess.message || "ポジショニングを分析中..."}
        showProgress={true}
      />

      <div className="flex-1 w-full max-w-[1400px] mx-auto px-6 py-4 flex flex-col h-full items-start">
        <div className="w-full mb-4 animate-fade-in-up">
          <div className="w-full flex justify-between items-start">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold tracking-tight mb-2 text-slate-800">
                コア欲求
              </h1>
              <p className="text-slate-500 text-base">
                価値×欲求で発散した12個のTOBEから、採用するTOBEを4つ選んでください
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
          <div className="w-full">
            <Card
              variant="elevated"
              className="w-full bg-white rounded-xl border border-slate-200 shadow-sm p-6"
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-8 w-full ">
                {desireOrganization.map((desireOrg, i) => (
                  <ValueDesireCard
                    key={i}
                    value_id={`価値${i + 1}`}
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
                  />
                ))}
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
                  disabled={loading || checkedTobes.length < 4}
                  onClick={onSubmit}
                >
                  {loading ? (
                    <>
                      <Spinner className="h-4 w-4" />
                      {submitProcess.percent}% {submitProcess.message}
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
    </>
  );
};

export default Step6;
