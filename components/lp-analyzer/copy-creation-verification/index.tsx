"use client";

import React, { useState } from "react";
import { PatternCounter } from "./PatternCounter";
import { VerificationSelector } from "./VerificationSelector";
import { CopyTable } from "./CopyTable";
import { copyData } from "./data";
import { VerificationTarget } from "./types";
import { ArrowRight, Grid } from "lucide-react";

export const CopyCreationVerification = ({
  onNext,
}: {
  onNext: () => void;
}) => {
  const [selectedTarget, setSelectedTarget] =
    useState<VerificationTarget>("hook");

  return (
    <main className="flex-1 w-full max-w-[1800px] mx-auto p-6 flex flex-col items-start gap-6 pb-24 relative">
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
          imagePatternCount={1}
          textPatternCount={3}
          totalPatternCount={3}
        />
      </div>

      {/* Table Section */}
      <div className="w-full bg-white rounded-lg border border-slate-400 shadow-sm relative h-[calc(100vh-220px)] overflow-hidden">
        <table className="w-full min-w-[1300px] border-collapse text-sm table-fixed">
          <thead className="z-50">
            <tr className="h-[54px] bg-slate-200 border-b border-slate-400 z-[80] sticky top-0 shadow-sm">
              <th
                className="px-4 py-2 text-left align-middle border-r border-slate-400"
                colSpan={4}
              >
                <VerificationSelector
                  selectedTarget={selectedTarget}
                  onChange={setSelectedTarget}
                />
              </th>
            </tr>
          </thead>
        </table>
        <CopyTable data={copyData} selectedTarget={selectedTarget} />
      </div>

      {/* Navigation */}
      <div className="w-full flex justify-end items-center mt-auto pt-4 gap-6">
        <button className="px-4 py-2 text-slate-500 font-bold hover:text-slate-800 transition-colors text-sm">
          戻る
        </button>
        <button
          className="px-8 py-2.5 rounded-lg bg-[#0093b4] hover:bg-[#007a92] text-white font-bold flex items-center gap-2 shadow-md transition-colors text-sm"
          onClick={onNext}
        >
          次へ進む
          <ArrowRight className="w-5 h-5 text-white" />
        </button>
      </div>
    </main>
  );
};

export default CopyCreationVerification;
