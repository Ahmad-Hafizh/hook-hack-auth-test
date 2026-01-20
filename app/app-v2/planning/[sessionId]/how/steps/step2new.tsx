"use client";

import React, { useState } from "react";
import { PatternCounter } from "@/components/lp-analyzer/copy-creation-verification/PatternCounter";
import { VerificationSelector } from "@/components/lp-analyzer/copy-creation-verification/VerificationSelector";
import { CopyTable } from "@/components/lp-analyzer/copy-creation-verification/CopyTable";
import { copyData } from "@/components/lp-analyzer/copy-creation-verification/data";
import { ArrowRight, Grid } from "lucide-react";
import { Button } from "@/components/ui/button";

export type VerificationTarget = "hook" | "body1" | "body2" | "cta";

export const Step2New = ({ onNext }: { onNext: () => void }) => {
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
        if (field !== target) {
          duplicate[field] =
            typeof selectedRow[field][0] === "number"
              ? [selectedRow[field][0]]
              : []; // keep previous selections
        }
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
          data={copyData}
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
          onClick={onNext}
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
