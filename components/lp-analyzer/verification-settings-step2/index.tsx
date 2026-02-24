"use client";

import React, { useState, useMemo } from "react";
import { RowData, VerificationTarget, PatternCounts } from "./types";
import { defaultRowData } from "./data";
import { TargetSelector } from "./TargetSelector";
import { VerificationTable } from "./VerificationTable";

export const VerificationSettingsStep2: React.FC = () => {
  const [rows, setRows] = useState<RowData[]>([...defaultRowData]);
  const [selectedTarget, setSelectedTarget] =
    useState<VerificationTarget>("hook");
  const [selectedRadio, setSelectedRadio] = useState<
    Record<VerificationTarget, number>
  >({
    hook: 0,
    body1: 0,
    body2: 0,
    cta: 0,
  });

  // Calculate pattern counts
  const patternCounts = useMemo<PatternCounts>(() => {
    // Count checked items for the selected target (multi-select mode)
    const checkedField = `${selectedTarget}Checked` as keyof RowData;
    const checkedCount = rows.filter((row) => row[checkedField]).length;

    // For now, image patterns is 1 (fixed), text patterns is the checked count
    const imagePatterns = 1;
    const textPatterns = checkedCount;
    const total = imagePatterns * textPatterns || checkedCount;

    return { imagePatterns, textPatterns, total };
  }, [rows, selectedTarget]);

  const handleCheckboxChange = (rowIndex: number, field: keyof RowData) => {
    const newRows = [...rows];
    newRows[rowIndex] = {
      ...newRows[rowIndex],
      [field]: !newRows[rowIndex][field],
    };
    setRows(newRows);
  };

  const handleRadioChange = (target: VerificationTarget, rowIndex: number) => {
    setSelectedRadio((prev) => ({
      ...prev,
      [target]: rowIndex,
    }));
  };

  const handleTextChange = (
    rowIndex: number,
    field: keyof RowData,
    value: string
  ) => {
    const newRows = [...rows];
    newRows[rowIndex] = {
      ...newRows[rowIndex],
      [field]: value,
    };
    setRows(newRows);
  };

  return (
    <main className="flex-1 w-full max-w-[1800px] mx-auto p-6 flex flex-col items-start gap-6 pb-24 relative">
      {/* Header */}
      <div className="w-full flex items-center justify-between mb-2">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
            <span className="material-symbols-outlined text-[#0093b4] text-3xl">
              grid_on
            </span>
            コピー作成（検証項目設定）
          </h1>
        </div>
        <div className="flex items-center gap-2">
          {/* Pattern Counter */}
          <div className="flex items-center bg-white rounded-lg border border-slate-400 px-2 py-1 shadow-sm gap-1 h-[54px]">
            <div className="flex items-center px-4 py-1 border-r border-slate-100/50">
              <div className="flex flex-col items-end mr-3">
                <span className="text-[10px] font-bold text-slate-500 leading-tight whitespace-nowrap">
                  画像
                  <br />
                  パターン数
                </span>
              </div>
              <span className="text-2xl font-bold text-slate-800 font-mono tracking-tight">
                {patternCounts.imagePatterns}
              </span>
            </div>
            <div className="flex items-center px-4 py-1 border-r border-slate-100/50">
              <div className="flex flex-col items-end mr-3">
                <span className="text-[10px] font-bold text-slate-500 leading-tight whitespace-nowrap">
                  テキスト
                  <br />
                  パターン数
                </span>
              </div>
              <span className="text-2xl font-bold text-slate-800 font-mono tracking-tight">
                {patternCounts.textPatterns}
              </span>
            </div>
            <div className="flex items-center px-6 py-1 bg-cyan-50/30 rounded-md ml-1">
              <div className="flex flex-col items-end mr-3">
                <span className="text-[10px] font-bold text-[#0093b4] leading-tight whitespace-nowrap">
                  合計
                  <br />
                  パターン数
                </span>
              </div>
              <span className="text-3xl font-black text-[#0093b4] font-mono tracking-tight">
                {patternCounts.total}
              </span>
            </div>
          </div>
          {/* Budget Reference */}
          <div className="flex flex-col justify-center bg-white rounded-lg border border-slate-400 px-4 py-1 shadow-sm h-[54px]">
            <span className="text-[10px] font-bold text-slate-500 leading-tight mb-0.5">
              1ヶ月運用期間の予算の参考表
            </span>
            <div className="flex items-center gap-3 text-xs font-medium text-slate-800">
              <div className="flex items-baseline gap-1">
                <span className="text-[10px] text-slate-500">
                  ５本の場合 ＝
                </span>
                <span className="font-mono text-slate-800">¥100,000 / 月</span>
              </div>
              <div className="w-px h-3 bg-slate-200"></div>
              <div className="flex items-baseline gap-1">
                <span className="text-[10px] text-slate-500">
                  １０本の場合 ＝
                </span>
                <span className="font-mono text-slate-800">¥200,000 / 月</span>
              </div>
              <div className="w-px h-3 bg-slate-200"></div>
              <div className="flex items-baseline gap-1">
                <span className="text-[10px] text-slate-500">
                  ２０本の場合 ＝
                </span>
                <span className="font-mono text-slate-800">¥400,000 / 月</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Target Selector Header */}
      <div className="w-full bg-slate-200 rounded-t-lg border border-slate-400 border-b-0 px-4 py-2">
        <TargetSelector
          selectedTarget={selectedTarget}
          onTargetChange={setSelectedTarget}
        />
      </div>

      {/* Verification Table */}
      <div className="-mt-6">
        <VerificationTable
          rows={rows}
          selectedTarget={selectedTarget}
          selectedRadio={selectedRadio}
          onCheckboxChange={handleCheckboxChange}
          onRadioChange={handleRadioChange}
          onTextChange={handleTextChange}
        />
      </div>

      {/* Navigation */}
      <div className="w-full flex justify-end items-center mt-auto pt-4 gap-6">
        <button className="px-4 py-2 text-slate-500 font-bold hover:text-slate-800 transition-colors text-sm">
          戻る
        </button>
        <button className="px-8 py-2.5 rounded-lg bg-[#0093b4] hover:bg-[#007a92] text-white font-bold flex items-center gap-2 shadow-md transition-colors text-sm">
          次へ進む
          <span className="material-symbols-outlined text-lg">
            arrow_forward
          </span>
        </button>
      </div>
    </main>
  );
};

export default VerificationSettingsStep2;
