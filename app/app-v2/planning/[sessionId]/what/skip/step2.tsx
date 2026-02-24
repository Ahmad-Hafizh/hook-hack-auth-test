"use client";

import React from "react";
import { ArrowLeft } from "lucide-react";
import { usePlanningWhatDataContext } from "../hooks/planningWhatDataContext";

const Step2Skip = ({ onPrev }: { onPrev: () => void }) => {
  const { competitiveMatrix } = usePlanningWhatDataContext();

  return (
    <main className="flex-1 w-full max-w-5xl mx-auto px-4 py-12 md:px-8 flex flex-col justify-center">
      <div className="mb-10 animate-fade-in-up">
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight mb-3 text-slate-800">
          競合マトリクス
        </h1>
      </div>

      <div className="w-full">
        <div className="flex flex-col gap-8">
          <div className="bg-white rounded-xl p-8 md:p-12 shadow-sm border border-slate-200 animate-fade-in-up min-h-[400px] flex flex-col justify-between">
            <div className="flex-1 flex flex-col w-full max-w-3xl mx-auto gap-10 justify-start">
              {competitiveMatrix ? (
                <pre className="whitespace-pre-wrap text-sm text-slate-700">
                  {JSON.stringify(competitiveMatrix, null, 2)}
                </pre>
              ) : (
                <p className="text-slate-500">データがありません。</p>
              )}
            </div>

            <div className="flex flex-col-reverse sm:flex-row items-center justify-end gap-4 mt-12 w-full">
              <div className="flex-1"></div>
              <button
                onClick={onPrev}
                className="px-6 py-3 rounded-lg text-sm font-bold text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-all flex items-center justify-center"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                戻る
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Step2Skip;
