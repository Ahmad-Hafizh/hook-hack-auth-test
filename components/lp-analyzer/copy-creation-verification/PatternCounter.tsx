"use client";

import React from "react";

interface PatternCounterProps {
  imagePatternCount: number;
  textPatternCount: number;
  totalPatternCount: number;
}

export const PatternCounter: React.FC<PatternCounterProps> = ({
  imagePatternCount,
  textPatternCount,
  totalPatternCount,
}) => {
  return (
    <div className="flex items-center gap-2">
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
            {imagePatternCount}
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
            {textPatternCount}
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
            {totalPatternCount}
          </span>
        </div>
      </div>

      <div className="flex flex-col justify-center bg-white rounded-lg border border-slate-400 px-4 py-1 shadow-sm h-[54px]">
        <span className="text-[10px] font-bold text-slate-500 leading-tight mb-0.5">
          1ヶ月運用期間の予算の参考表
        </span>
        <div className="flex items-center gap-3 text-xs font-medium text-slate-800">
          <div className="flex items-baseline gap-1">
            <span className="text-[10px] text-slate-500">５本の場合 ＝</span>
            <span className="font-mono text-slate-800">¥100,000 / 月</span>
          </div>
          <div className="w-px h-3 bg-slate-200" />
          <div className="flex items-baseline gap-1">
            <span className="text-[10px] text-slate-500">１０本の場合 ＝</span>
            <span className="font-mono text-slate-800">¥200,000 / 月</span>
          </div>
          <div className="w-px h-3 bg-slate-200" />
          <div className="flex items-baseline gap-1">
            <span className="text-[10px] text-slate-500">２０本の場合 ＝</span>
            <span className="font-mono text-slate-800">¥400,000 / 月</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatternCounter;
