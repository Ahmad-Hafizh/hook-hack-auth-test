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
import { ArrowRight } from "lucide-react";
import { submitStep6 } from "../hooks/useFetchAPINext";

const Step6 = ({ onNext }: { onNext: () => void }) => {
  const {
    desireOrganization,
    onSetDesireOrganization,
    valueOrganization,
    selectedValueOrganization,
    briefPlanning,
    selectedMatrix,
    onSetPositioningPatterns,
  } = usePlanningWhatDataContext();
  const [loading, setLoading] = React.useState(false);
  const [checkedTobes, setCheckedTobes] = React.useState<string[]>([]);
  const [submitProcess, setSubmitProcess] = React.useState<{
    percent: number;
    message: string;
  }>({ percent: 0, message: "" });

  return (
    <div className="flex-1 w-full max-w-6xl mx-auto px-4 py-12 md:px-8 flex flex-col justify-center h-full items-start">
      <PageHeader title="価値の整理" />
      <div className="w-full">
        <div className="flex flex-col gap-8">
          {/* card */}

          <Card variant="elevated" className="w-full !p-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-8 w-full ">
              {desireOrganization.map((desireOrg, i) => (
                <ValueDesireCard
                  key={i}
                  value_id={desireOrg.value_id}
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
                disabled={loading || checkedTobes.length < 4}
                onClick={() =>
                  submitStep6({
                    own_lp_summary: `${selectedMatrix.key_message}, ${selectedMatrix.strong_points.join(", ")}`,
                    competitors_summary: briefPlanning.competitors.map(
                      (c) => `${c.key_message}, ${c.strong_points.join(", ")}`,
                    ),
                    selected_values_6: selectedValueOrganization.map((e) => {
                      return valueOrganization.find((v) => v.id === e);
                    }),
                    selected_tobe_4: checkedTobes.map((e) => {
                      const [value_id, desire] = e.split("_");
                      const desireObj = desireOrganization.find(
                        (v) => v.value_id === value_id,
                      );
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
                    }),
                    onSetPositioningPatterns,
                    onNext,
                    onSetSubmitProcess: (percent, message) => {
                      setSubmitProcess({ percent, message });
                    },
                    onSetLoading: (loading) => setLoading(loading),
                  })
                }
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
  );
};

export default Step6;
