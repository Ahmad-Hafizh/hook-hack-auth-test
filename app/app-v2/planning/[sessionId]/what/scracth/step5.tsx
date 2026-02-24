"use client";
import React from "react";
import { usePlanningWhatDataContext } from "../hooks/planningWhatDataContext";
import { Card, PageHeader } from "@/components/lp-analyzer";
import { ValueCategoryCard } from "@/components/lp-analyzer/ValueOrganizationCard";
import { Button } from "@/components/ui/button";
import { submitStep5 } from "../hooks/useFetchAPINext";
import { Spinner } from "@/components/ui/spinner";
import { LoadingOverlay } from "@/components/ui/loading-overlay";
import { ArrowRight } from "lucide-react";
import { usePlannningContext } from "@/app/app-v2/plannningContext";

const Step5 = ({ onNext, onPrev }: { onNext: () => void; onPrev?: () => void }) => {
  const {
    valueOrganization,
    onSetValueOrganization,
    onSetDesireOrganization,
    selectedValueOrganization,
    onSetSelectedValueOrganization,
    competitiveMatrix,
    selectedMatrix,
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

  // Check if each category has at least one selection
  const hasAllCategories = () => {
    const prefixes = ["P", "T", "I", "V"];
    return prefixes.every((prefix) =>
      selectedValueOrganization.some((id: string) => id.startsWith(prefix))
    );
  };

  return (
    <>
      {/* Loading Overlay with SSE Progress */}
      <LoadingOverlay
        isVisible={loading}
        progress={submitProgress.percent}
        message={submitProgress.message || "価値を分析中..."}
        showProgress={true}
      />

      <div className="flex-1 w-full max-w-[1400px] mx-auto px-6 py-4 flex flex-col h-full items-start">
      <div className="w-full mb-4 animate-fade-in-up">
        <div className="w-full flex justify-between items-start">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight mb-2 text-slate-800">
              価値の整理
            </h1>
            <p className="text-slate-500 text-base">
              価値を6つ選定してください（各カテゴリ最低1つ）
            </p>
          </div>
          <div className="inline-flex items-center gap-2 bg-white border border-slate-200 rounded-lg px-4 py-2 shadow-sm">
            <span className="text-sm font-medium text-slate-600">選択数:</span>
            <span className={`text-lg font-bold ${selectedValueOrganization.length === 6 ? "text-[#0093b4]" : "text-slate-800"}`}>
              {selectedValueOrganization.length}
            </span>
            <span className="text-sm text-slate-400">/ 6</span>
          </div>
        </div>
      </div>
      <div className="w-full">
        <Card variant="elevated" className="w-full bg-white rounded-xl border border-slate-200 shadow-sm p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-12 w-full">
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
                    // Allow ONE from each category (no limit per category, just max 6 total)
                    onSetSelectedValueOrganization([
                      ...selectedValueOrganization,
                      id,
                    ]);
                  } else if (!checked) {
                    onSetSelectedValueOrganization(
                      selectedValueOrganization.filter((e: any) => e !== id),
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
              disabled={loading || selectedValueOrganization.length < 6 || !hasAllCategories()}
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
                  competitors_summary: competitiveMatrix.competitors.map(
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
    </>
  );
};

export default Step5;
