"use client";
import React from "react";
import { usePlanningWhatDataContext } from "../hooks/planningWhatDataContext";
import { Card, PageHeader } from "@/components/lp-analyzer";
import { ValueCategoryCard } from "@/components/lp-analyzer/ValueOrganizationCard";
import { Button } from "@/components/ui/button";
import { submitStep5 } from "../hooks/useFetchAPINext";
import { Spinner } from "@/components/ui/spinner";
import { ArrowRight } from "lucide-react";

const Step5 = ({ onNext }: { onNext: () => void }) => {
  const {
    valueOrganization,
    onSetValueOrganization,
    onSetDesireOrganization,
    selectedValueOrganization,
    onSetSelectedValueOrganization,
    selectedMatrix,
    briefPlanning,
  } = usePlanningWhatDataContext();
  const [loading, setLoading] = React.useState(false);
  const [submitProgress, setSubmitProgress] = React.useState({
    percent: 0,
    message: "",
  });

  const arrangedCategories = [
    {
      id: "people",
      title: "人",
      items: valueOrganization.filter((item) => item.id.startsWith("P")),
    },
    {
      id: "things",
      title: "モノ",
      items: valueOrganization.filter((item) => item.id.startsWith("T")),
    },
    {
      id: "information",
      title: "情報",
      items: valueOrganization.filter((item) => item.id.startsWith("I")),
    },
    {
      id: "vibes",
      title: "バイブス",
      items: valueOrganization.filter((item) => item.id.startsWith("V")),
    },
  ];

  return (
    <div className="flex-1 w-full max-w-6xl mx-auto px-4 py-12 md:px-8 flex flex-col justify-center h-full items-start">
      <PageHeader title="価値の整理" />
      <div className="w-full">
        <div className="flex flex-col gap-8">
          {/* card */}
          <Card variant="elevated" className="w-full">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-12 w-full p-4 md:p-6">
              {arrangedCategories.map((category) => (
                <ValueCategoryCard
                  key={category.id}
                  title={category.title}
                  items={category.items}
                  selectedIds={selectedValueOrganization}
                  onValueChange={(id, value) => {
                    const duplicate = [...valueOrganization];
                    const index = duplicate.findIndex((e) => {
                      e.id === id;
                    });
                    duplicate[index].label = value;
                    onSetValueOrganization(duplicate);
                  }}
                  onCheckChange={(id, checked) => {
                    if (checked && selectedValueOrganization.length < 6) {
                      const currentIds = selectedValueOrganization.filter((e) =>
                        e.startsWith(id[0]),
                      ).length;

                      if (currentIds < 2) {
                        onSetSelectedValueOrganization([
                          ...selectedValueOrganization,
                          id,
                        ]);
                      }
                    } else {
                      onSetSelectedValueOrganization(
                        selectedValueOrganization.filter((e: any) => e !== id),
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
                disabled={loading || selectedValueOrganization.length < 6}
                onClick={() =>
                  submitStep5({
                    selectedIds: selectedValueOrganization,
                    valueOrganization,
                    onSetLoading: (loading) => setLoading(loading),
                    onSetSubmitProcess: (percent, message) =>
                      setSubmitProgress({
                        percent,
                        message,
                      }),
                    onSetDesireOrganization: (desireOrganization) =>
                      onSetDesireOrganization(desireOrganization),
                    onNext,
                    own_lp_summary: `${selectedMatrix.key_message}, ${selectedMatrix.strong_points.join(", ")}`,
                    competitors_summary: briefPlanning.competitors.map(
                      (c) => `${c.key_message}, ${c.strong_points.join(", ")}`,
                    ),
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

export default Step5;
