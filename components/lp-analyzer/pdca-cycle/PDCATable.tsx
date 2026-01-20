"use client";

import React, { useState } from "react";
import { PDCACycle } from "./types";
import { StatusBadge } from "./StatusBadge";

interface PDCATableProps {
  cycles: PDCACycle[];
  onView?: (cycle: PDCACycle) => void;
  onEdit?: (cycle: PDCACycle) => void;
  onDuplicate?: (cycle: PDCACycle) => void;
}

export const PDCATable: React.FC<PDCATableProps> = ({
  cycles,
  onView,
  onEdit,
  onDuplicate,
}) => {
  const [memos, setMemos] = useState<Record<string, string>>(
    cycles.reduce((acc, c) => ({ ...acc, [c.id]: c.memo }), {})
  );

  const handleMemoChange = (cycleId: string, value: string) => {
    setMemos((prev) => ({ ...prev, [cycleId]: value }));
  };

  return (
    <div className="overflow-x-auto custom-scrollbar">
      <table className="w-full text-sm text-left border-collapse">
        <thead className="bg-slate-50 text-slate-800 font-bold text-xs uppercase tracking-wider sticky top-0 z-10">
          <tr>
            <th className="border border-slate-200 px-4 py-3 bg-slate-100 min-w-[100px] w-[120px]">
              ID
            </th>
            <th className="border border-slate-200 px-4 py-3 bg-slate-100 w-[140px]">
              ステータス
            </th>
            <th className="border border-slate-200 px-4 py-3 bg-slate-100 min-w-[300px]">
              仮説
            </th>
            <th className="border border-slate-200 px-4 py-3 bg-slate-100 min-w-[250px] w-[350px]">
              メモ
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-200 bg-white">
          {cycles.map((cycle) => (
            <tr
              key={cycle.id}
              className="hover:bg-cyan-50/30 transition-colors group relative"
            >
              <td className="border border-slate-200 px-4 py-3 text-slate-800 font-mono text-xs font-medium bg-slate-50/50">
                {cycle.id}
              </td>
              <td className="border border-slate-200 px-4 py-3 align-middle">
                <StatusBadge status={cycle.status} />
              </td>
              <td className="border border-slate-200 px-4 py-3 text-slate-800 align-top leading-relaxed">
                <p className="line-clamp-2">{cycle.hypothesis}</p>
              </td>
              <td className="border border-slate-200 px-0 py-0 align-top relative">
                <textarea
                  className="w-full h-full min-h-[60px] px-4 py-3 bg-transparent border-none resize-none focus:ring-2 focus:ring-inset focus:ring-[#0093b4]/20 text-slate-500 placeholder-slate-300 text-sm leading-relaxed"
                  placeholder=""
                  value={memos[cycle.id]}
                  onChange={(e) => handleMemoChange(cycle.id, e.target.value)}
                />
                <div className="absolute right-2 top-2 hidden group-hover:flex items-center gap-1 bg-white/90 backdrop-blur-sm p-1 rounded-lg border border-slate-200 shadow-sm">
                  <button
                    className="p-1.5 hover:bg-slate-100 rounded text-slate-500 hover:text-[#0093b4] transition-colors"
                    title="詳細を見る"
                    onClick={() => onView?.(cycle)}
                  >
                    <span className="material-symbols-outlined text-[18px]">
                      visibility
                    </span>
                  </button>
                  <button
                    className="p-1.5 hover:bg-slate-100 rounded text-slate-500 hover:text-[#0093b4] transition-colors"
                    title="編集"
                    onClick={() => onEdit?.(cycle)}
                  >
                    <span className="material-symbols-outlined text-[18px]">
                      edit
                    </span>
                  </button>
                  <button
                    className="p-1.5 hover:bg-slate-100 rounded text-slate-500 hover:text-[#0093b4] transition-colors"
                    title="複製"
                    onClick={() => onDuplicate?.(cycle)}
                  >
                    <span className="material-symbols-outlined text-[18px]">
                      content_copy
                    </span>
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PDCATable;
