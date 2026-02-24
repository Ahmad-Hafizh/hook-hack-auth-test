"use client";

import React, { useState, useEffect } from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { IDataRowFinalized } from "../../hooks/useDataContext";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import callApi from "@/config/axios/axios";
import LoadingOverlay from "@/components/ui/loading-overlay";
import { usePlanningHowDataContext } from "../../context/planningHowDataContext";
import PatternCounter from "./components/PatternCounter";
import VerificationSelector from "./components/VerificationSelector";
import CopyTable from "./components/CopyTable";

export type VerificationTarget = "hook" | "body1" | "body2" | "cta";

export const SelectDataVariantsPage = ({
  onNext,
  onPrev,
  stepId,
}: {
  stepId?: number;
  onNext: () => void;
  onPrev: () => void;
}) => {
  const [submitting, setSubmitting] = React.useState(false);
  const [regenerating, setRegenerating] = React.useState(false);
  const {
    onSetDataRows,
    // jobId,
    // onSetJobId,
    dataRows,
    onSetFinalizedDataRows,
    duration,
    onSetDuration,
    orientation,
  } = usePlanningHowDataContext();
  const { sessionId } = useParams();
  const [jobId, setJobId] = useState<string | null>(null);
  const [loadingGenerate, setLoadingGenerate] = useState<boolean>(true);
  const [selectedTarget, setSelectedTarget] =
    useState<VerificationTarget>("hook");

  const [selectedRow, setSelectedRow] = useState<any>({
    hook: [0],
    body1: [0],
    body2: [0],
    cta: [0],
  });

  // Select row - only current target can have multiple selections, others are single select
  const onSelectRowIndex = (rowIndex: number, field: string) => {
    setSelectedRow((prev: any) => {
      const isCurrentTarget = field === selectedTarget;

      if (isCurrentTarget) {
        // Current target: toggle selection (multi-select behavior)
        const currentSelections = prev[field] || [];
        if (currentSelections.includes(rowIndex)) {
          // Deselect
          return {
            ...prev,
            [field]: currentSelections.filter(
              (idx: number) => idx !== rowIndex,
            ),
          };
        } else {
          // Add to selection
          return {
            ...prev,
            [field]: [...currentSelections, rowIndex],
          };
        }
      } else {
        // Non-current target: single select (radio behavior)
        return {
          ...prev,
          [field]: [rowIndex],
        };
      }
    });
  };

  // Switch target - DON'T modify selections, just change the active target
  const onSetSelectedTarget = (target: VerificationTarget) => {
    setSelectedTarget(target);
    // Don't reset selections - just switch which tab is active
  };

  // Count patterns - only the current target can have multiple selections
  // Other targets should only have 1 selection each (radio behavior)
  const countTextPatterns = (): number => {
    if (!selectedRow) return 0;

    const hookCount = selectedRow.hook?.length || 0;
    const body1Count = selectedRow.body1?.length || 0;
    const body2Count = selectedRow.body2?.length || 0;
    const ctaCount = selectedRow.cta?.length || 0;

    // If any category has no selection, return 0
    if (
      hookCount === 0 ||
      body1Count === 0 ||
      body2Count === 0 ||
      ctaCount === 0
    ) {
      return 0;
    }

    // Since non-current targets are single-select (radio), they're always 1
    // Only the current target contributes to the pattern count
    return selectedRow[selectedTarget]?.length || 0;
  };

  // get job result
  const getJobResult = async () => {
    try {
      const { data } = await callApi.post(
        "/app-v3/planning/how/step2/job-result",
        {
          sessionId,
        },
      );

      return data;
    } catch (error) {
      console.error("getJobResult error:", error);
      return { status: "error", error: error };
    }
  };

  //polling
  const { data: jobResult } = useQuery<{
    status?: string;
    result: {
      variants?: any;
    };
    error?: unknown;
  }>({
    queryKey: ["jobStatus", jobId],
    queryFn: () => getJobResult(),
    enabled: !!jobId && loadingGenerate, // Only poll when we have a jobId and still loading
    refetchInterval: (query) => {
      const currentStatus = query.state.data?.status;

      // Stop polling if status is any terminal state
      if (
        currentStatus === "done" ||
        currentStatus === "error" ||
        currentStatus === "failed"
      ) {
        return false;
      }

      // Continue polling only if status is 'running'
      if (currentStatus === "running") {
        return 10000;
      }

      // For undefined status, try again with shorter interval
      return 3000;
    },
  });

  // Helper to clean text by removing newlines
  // For vertical videos: keep \n (AI produces line breaks)
  // For 15s videos: keep the text as-is
  // For 30s horizontal videos: remove \n completely
  const cleanText = (text: string | undefined): string => {
    if (!text) return "";
    // For vertical videos, keep the newlines from AI
    if (orientation === "vertical") {
      return text;
    }
    // For 15s duration, keep the text as-is
    if (duration === 15) {
      return text;
    }
    // For 30s horizontal duration, remove newlines completely
    return text.replace(/\n/g, "").trim();
  };

  // Handle job completion
  React.useEffect(() => {
    if (jobResult) {
      if (jobResult.status === "done" && jobResult.result.variants) {
        const hook_1 = jobResult.result.variants.hook_1 || [];
        const hook_2 = jobResult.result.variants.hook_2 || [];
        const body_a_1 = jobResult.result.variants.body_a_1 || [];
        const body_a_2 = jobResult.result.variants.body_a_2 || [];
        const body_b_1 = jobResult.result.variants.body_b_1 || [];
        const body_b_2 = jobResult.result.variants.body_b_2 || [];
        const cta_1 = jobResult.result.variants.cta_1 || [];
        const cta_2 = jobResult.result.variants.cta_2 || [];

        // Determine the max row count from all arrays
        const maxRows = Math.max(
          hook_1.length,
          hook_2.length,
          body_a_1.length,
          body_a_2.length,
          body_b_1.length,
          body_b_2.length,
          cta_1.length,
          cta_2.length,
        );

        // Only create rows if we have data
        if (maxRows > 0) {
          const dataRows = Array.from({ length: maxRows }, (_, i) => ({
            hook: { part1: cleanText(hook_1[i]), part2: cleanText(hook_2[i]) },
            body1: {
              part1: cleanText(body_a_1[i]),
              part2: cleanText(body_a_2[i]),
            },
            body2: {
              part1: cleanText(body_b_1[i]),
              part2: cleanText(body_b_2[i]),
            },
            cta: { part1: cleanText(cta_1[i]), part2: cleanText(cta_2[i]) },
          }));

          onSetDataRows(dataRows);

          // Save to backend
          (async () => {
            try {
              const { data } = await callApi.post(
                "/app-v3/planning/how/step2/save",
                {
                  sessionId,
                  dataRows: dataRows,
                  selectedDataRows: selectedRow,
                },
              );
            } catch (err) {
              console.error("Failed to save data rows:", err);
            }
          })();
        }
        setLoadingGenerate(false);
      } else if (
        jobResult.status === "failed" ||
        jobResult.status === "error"
      ) {
        console.error(
          "Job failed with status:",
          jobResult.status,
          jobResult.error,
        );
        setLoadingGenerate(false);
      } else {
        setLoadingGenerate(true);
      }
    }
  }, [jobResult]);

  // Helper to get TwoPartValue fields
  const getFieldParts = (
    field: "hook" | "body1" | "body2" | "cta",
    rowIndex: number,
  ) => {
    if (selectedTarget === field) {
      return dataRows[rowIndex]?.[field] || { part1: "", part2: "" };
    }
    const lastSelectedIndex = selectedRow[field][selectedRow[field].length - 1];
    return dataRows[lastSelectedIndex]?.[field] || { part1: "", part2: "" };
  };

  const charLimits: Record<VerificationTarget, number> = {
    hook: 20,
    body1: 24,
    body2: 24,
    cta: 17,
  };

  const truncateToLimit = (text: string, field: VerificationTarget): string => {
    const limit = charLimits[field];
    return text && text.length > limit ? text.slice(0, limit) : text;
  };

  const onSubmit = async () => {
    try {
      setSubmitting(true);
      const patternCombination = selectedRow[selectedTarget].map(
        (rowIndex: number) => {
          const hookParts = getFieldParts("hook", rowIndex);
          const body1Parts = getFieldParts("body1", rowIndex);
          const body2Parts = getFieldParts("body2", rowIndex);
          const ctaParts = getFieldParts("cta", rowIndex);

          const newRow: IDataRowFinalized = {
            hookPart1: truncateToLimit(hookParts.part1 || "", "hook"),
            body1Part1: truncateToLimit(body1Parts.part1 || "", "body1"),
            body2Part1: truncateToLimit(body2Parts.part1 || "", "body2"),
            ctaPart1: truncateToLimit(ctaParts.part1 || "", "cta"),
            hookImage: "",
            body1Image: "",
            body2Image: "",
            // 30s
            hookPart2: truncateToLimit(hookParts.part2 || "", "hook"),
            body1Part2: truncateToLimit(body1Parts.part2 || "", "body1"),
            body2Part2: truncateToLimit(body2Parts.part2 || "", "body2"),
            ctaPart2: truncateToLimit(ctaParts.part2 || "", "cta"),
            body1ImageB: "",
            body2ImageB: "",
          };

          return newRow;
        },
      );

      const { data, status } = await callApi.post(
        "/app-v3/planning/how/step2",
        {
          sessionId,
          dataRows: dataRows,
          selectedDataRows: selectedRow,
          finalizedRows: patternCombination,
        },
      );

      if (status === 200) {
        onSetFinalizedDataRows(patternCombination);
        onNext();
      }
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitting(false);
    }
  };

  const onRegenerate = async () => {
    try {
      setRegenerating(true);
      const { data } = await callApi.post("/app-v3/planning/how/step2/fetch", {
        sessionId,
      });

      if (data) {
        if (data.job_id) {
          setJobId(data.job_id);
        }
        if (data.data_rows) {
          onSetDataRows(data.data_rows);
        }
        if (data.selected_data_rows.hook.length > 0) {
          setSelectedRow(data.selected_data_rows);
        } else {
          setSelectedRow({
            hook: [0],
            body1: [0],
            body2: [0],
            cta: [0],
          });
        }
        if (data.duration) {
          onSetDuration(parseInt(data.duration, 10) as 15 | 30);
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      setRegenerating(false);
    }
  };

  useEffect(() => {
    onRegenerate();
  }, []);

  if (regenerating || loadingGenerate) {
    return (
      <div className="flex items-center justify-center w-full h-full">
        <LoadingOverlay
          isVisible={true}
          message="コピー案を生成中です"
          showProgress={false}
        />
      </div>
    );
  }

  return (
    <>
      {/* Loading Overlay */}
      <LoadingOverlay
        isVisible={submitting}
        progress={50}
        message="コピー案を生成中です"
        showProgress={false}
        showTimeEstimate={true}
      />

      <div className="flex-1 w-full max-w-[1800px] mx-auto px-6 py-4 flex flex-col items-start gap-6 relative">
        {/* Header */}
        <div className="w-full flex items-center justify-between">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight mb-2 text-slate-800">
              {stepId || 9}. メッセージ選択
            </h1>
            <p className="text-black text-lg">
              メッセージを​選択し、​必要に​応じて​編集してください​（次の​ステップでも​編集できます）​
            </p>
          </div>
          <PatternCounter
            imagePatternCount={0}
            textPatternCount={countTextPatterns()}
          />
        </div>

        {/* Table Section Card */}
        <div className="w-full bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <table className="w-full border-collapse text-sm table-fixed">
            <thead className="z-10">
              <tr className="h-[54px] bg-slate-100 border-b border-slate-200  sticky top-0">
                <th
                  className="px-4 py-2 text-left align-middle border-r border-slate-200"
                  colSpan={4}
                >
                  <VerificationSelector
                    selectedTarget={selectedTarget}
                    onChange={onSetSelectedTarget}
                  />
                </th>
              </tr>
            </thead>
          </table>
          <CopyTable
            data={dataRows}
            selectedTarget={selectedTarget}
            selectedRow={selectedRow}
            onSelectRow={onSelectRowIndex}
            onDataChange={onSetDataRows}
            duration={duration as 15 | 30}
          />
        </div>

        {/* Navigation */}
        <div className="w-full flex justify-end items-center mt-auto pt-4 gap-4">
          <button
            onClick={onPrev}
            className="px-6 py-2.5 rounded-lg text-slate-500 font-semibold hover:text-slate-800 hover:bg-slate-100 transition-colors text-sm"
          >
            戻る
          </button>
          <Button
            className="px-8 py-2.5 rounded-lg bg-[#0093b4] hover:bg-[#007a92] text-white font-semibold flex items-center gap-2 shadow-sm transition-colors text-sm"
            onClick={onSubmit}
            disabled={countTextPatterns() === 0 || submitting}
          >
            {submitting ? "送信中..." : "次へ進む"}
            <ArrowRight className="w-5 h-5 text-white" />
          </Button>
        </div>
      </div>
    </>
  );
};

export default SelectDataVariantsPage;
