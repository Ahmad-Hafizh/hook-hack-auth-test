"use client";

import React, { useState } from "react";
import { PatternCounter } from "@/components/lp-analyzer/copy-creation-verification/PatternCounter";
import { VerificationSelector } from "@/components/lp-analyzer/copy-creation-verification/VerificationSelector";
import { CopyTable } from "@/components/lp-analyzer/copy-creation-verification/CopyTable";
import { copyData } from "@/components/lp-analyzer/copy-creation-verification/data";
import { ArrowRight, Grid } from "lucide-react";
import { Button } from "@/components/ui/button";
import { IDataRowFinalized, useDataContext } from "../hooks/useDataContext";
import { useQuery } from "@tanstack/react-query";
import { getJobResult } from "../hooks/useFetchAPINext";
import { useParams } from "next/navigation";
import { Spinner } from "@/components/ui/spinner";

export type VerificationTarget = "hook" | "body1" | "body2" | "cta";

export const Step2New = ({ onNext }: { onNext: () => void }) => {
  const { onSetDataRows, jobId, dataRows, onSetFinalizedDataRows } =
    useDataContext();
  const { sessionId } = useParams();

  const [loadingGenerate, setLoadingGenerate] = useState<boolean>(true);
  const [selectedTarget, setSelectedTarget] =
    useState<VerificationTarget>("hook");

  const [selectedRow, setSelectedRow] = useState<any>({
    hook: [],
    body1: [],
    body2: [],
    cta: [],
  });

  const onSelectRowIndex = (rowIndex: any, field: string) => {
    setSelectedRow((prev: any) => {
      const duplicate = { ...prev };

      if (duplicate[field].includes(rowIndex)) {
        duplicate[field] = duplicate[field].filter(
          (idx: any) => idx !== rowIndex,
        );
      } else {
        duplicate[field].push(rowIndex);
      }
      return duplicate;
    });
  };

  const onSetSelectedTarget = (target: VerificationTarget) => {
    setSelectedTarget(target);
    setSelectedRow((prev: any) => {
      const duplicate = { ...prev };
      const fields = ["hook", "body1", "body2", "cta"];

      for (const field of fields) {
        duplicate[field] =
          typeof selectedRow[field][selectedRow[field].length - 1] === "number"
            ? [selectedRow[field][selectedRow[field].length - 1]]
            : []; // keep previous selections
      }

      return duplicate;
    });
  };

  const countTextPatterns = (): number => {
    let count = 1;
    count =
      selectedRow.hook.length *
      selectedRow.body1.length *
      selectedRow.body2.length *
      selectedRow.cta.length;

    return count;
  };

  const {
    data: jobResult,
    isPending,
    error,
  } = useQuery<{
    status?: string;
    variants?: any;
    error?: unknown;
  }>({
    queryKey: ["jobStatus", jobId],
    queryFn: () =>
      getJobResult({ jobId: jobId!, sessionId: sessionId as string }),
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

  // Handle job completion
  React.useEffect(() => {
    if (jobResult) {
      if (jobResult.status === "done" && jobResult.variants) {
        const dataRows = jobResult.variants.hooks.map((_: any, i: number) => {
          return {
            hook: jobResult.variants.hooks[i],
            body1: jobResult.variants.strong_point_1_messages[i],
            body2: jobResult.variants.strong_point_2_messages[i],
            cta: jobResult.variants.ctas[i],
          };
        });

        onSetDataRows(dataRows);
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
      }
    }
  }, [jobResult]);

  const onSubmit = () => {
    const patternCombination = selectedRow[selectedTarget].map(
      (rowIndex: number) => {
        const newRow: IDataRowFinalized = {
          hook:
            selectedTarget === "hook"
              ? dataRows[rowIndex].hook
              : dataRows[selectedRow.hook[selectedRow.hook.length - 1]].hook ||
                "",
          body1:
            selectedTarget === "body1"
              ? dataRows[rowIndex].body1
              : dataRows[selectedRow.body1[selectedRow.body1.length - 1]]
                  .body1 || "",
          body2:
            selectedTarget === "body2"
              ? dataRows[rowIndex].body2
              : dataRows[selectedRow.body2[selectedRow.body2.length - 1]]
                  .body2 || "",
          cta:
            selectedTarget === "cta"
              ? dataRows[rowIndex].cta
              : dataRows[selectedRow.cta[selectedRow.cta.length - 1]].cta || "",
          hookImage: "",
          body1Image: "",
          body1ImageB: "",
          body2Image: "",
          body2ImageB: "",
        };

        return newRow;
      },
    );

    onSetFinalizedDataRows(patternCombination);
    onNext();
  };

  if (loadingGenerate) {
    return (
      <div className="flex  items-center justify-center w-full h-full gap-4">
        <Spinner />
        <p className="text-slate-700 text-lg font-medium">
          コピー案を生成中です。しばらくお待ちください...
        </p>
      </div>
    );
  }

  return (
    <div className="flex-1 w-full max-w-[1800px] mx-auto p-6 flex flex-col items-start gap-6 relative">
      {/* Header */}
      <div className="w-full flex items-center justify-between mb-2">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
            <span className="material-symbols-outlined text-[#0093b4] text-3xl">
              <Grid className="text-[#0093b4] w-6 h-6" />
            </span>
            コピー作成（検証項目設定）
          </h1>
        </div>
        <PatternCounter
          imagePatternCount={0}
          textPatternCount={countTextPatterns()}
          totalPatternCount={countTextPatterns()}
        />
      </div>

      {/* Table Section */}
      <div className="w-full bg-white rounded-lg border border-slate-400 shadow-sm relative h-full ">
        <table className="w-full border-collapse text-sm table-fixed">
          <thead className="z-50">
            <tr className="h-[54px] bg-slate-200 border-b border-slate-400 z-[80] sticky top-0 shadow-sm">
              <th
                className="px-4 py-2 text-left align-middle border-r border-slate-400"
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
        />
      </div>

      {/* Navigation */}
      <div className="w-full flex justify-end items-center mt-auto pt-4 gap-6">
        <button className="px-4 py-2 text-slate-500 font-bold hover:text-slate-800 transition-colors text-sm">
          戻る
        </button>
        <Button
          className="px-8 py-2.5 rounded-lg bg-[#0093b4] hover:bg-[#007a92] text-white font-bold flex items-center gap-2 shadow-md transition-colors text-sm"
          onClick={onSubmit}
          disabled={countTextPatterns() === 0}
        >
          次へ進む
          <ArrowRight className="w-5 h-5 text-white" />
        </Button>
      </div>
    </div>
  );
};

export default Step2New;
