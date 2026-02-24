"use client";

import React from "react";
import { PDCATable } from "./PDCATable";
import { pdcaData } from "./data";

export const PDCACycle: React.FC = () => {
  return (
    <main className="flex-1 w-full max-w-6xl mx-auto px-4 py-12 md:px-8 flex flex-col justify-start">
      {/* Header */}
      <div className="mb-8 animate-fade-in-up flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-slate-800">
          PDCAサイクル
        </h1>
        <button className="bg-[#0093b4] hover:bg-[#007a92] text-white font-bold py-2.5 px-6 rounded-lg shadow-sm transition-all duration-200 flex items-center gap-2 group">
          <span className="material-symbols-outlined text-[20px] group-hover:rotate-90 transition-transform">
            add_circle
          </span>
          <span>新しいサイクルを作成</span>
        </button>
      </div>

      {/* Main Card */}
      <div className="w-full bg-white rounded-xl shadow-sm border border-slate-200 animate-fade-in-up overflow-hidden flex flex-col relative z-0">
        {/* Table */}
        <PDCATable cycles={pdcaData} loading={false} onClick={() => {}} onHandleDelete={() => {}} />

        {/* Pagination */}
        <div className="p-4 border-t border-slate-200 bg-slate-50/20 flex items-center justify-between text-xs text-slate-500">
          <div>全 {pdcaData.length} サイクルを表示中</div>
          <div className="flex gap-1">
            <button
              className="px-2 py-1 rounded border border-slate-200 bg-white hover:bg-slate-50 disabled:opacity-50"
              disabled
            >
              <span className="material-symbols-outlined text-[16px] leading-none">
                chevron_left
              </span>
            </button>
            <button
              className="px-2 py-1 rounded border border-slate-200 bg-white hover:bg-slate-50 disabled:opacity-50"
              disabled
            >
              <span className="material-symbols-outlined text-[16px] leading-none">
                chevron_right
              </span>
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default PDCACycle;
