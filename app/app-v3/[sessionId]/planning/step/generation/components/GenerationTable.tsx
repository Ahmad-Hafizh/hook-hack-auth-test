"use client";

import React from "react";
import { CheckCircle2, XCircle, Loader } from "lucide-react";

export interface RenderStatus {
  index: number;
  status: "planned" | "rendering" | "succeeded" | "failed";
  url?: string;
  render_id?: string;
}

interface GenerationTableProps {
  rows: any[];
  renderStatuses: RenderStatus[];
  selectedRowIndex: number | null;
  onRowSelect: (index: number) => void;
  duration: 15 | 30;
}

const StatusIndicator = ({ status }: { status: string }) => {
  switch (status) {
    case "planned":
      return (
        <span className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-500">
          <div className="w-2.5 h-2.5 rounded-full bg-slate-400" />
          待機中
        </span>
      );
    case "rendering":
      return (
        <span className="inline-flex items-center gap-1.5 text-xs font-medium text-amber-600">
          <Loader className="w-3.5 h-3.5 animate-spin" />
          生成中
        </span>
      );
    case "succeeded":
      return (
        <span className="inline-flex items-center gap-1.5 text-xs font-medium text-green-600">
          <CheckCircle2 className="w-3.5 h-3.5" />
          完了
        </span>
      );
    case "failed":
      return (
        <span className="inline-flex items-center gap-1.5 text-xs font-medium text-red-600">
          <XCircle className="w-3.5 h-3.5" />
          失敗
        </span>
      );
    default:
      return (
        <span className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-400">
          <div className="w-2.5 h-2.5 rounded-full bg-slate-300" />
          不明
        </span>
      );
  }
};

export const GenerationTable: React.FC<GenerationTableProps> = ({
  rows,
  renderStatuses,
  selectedRowIndex,
  onRowSelect,
  duration,
}) => {
  return (
    <div className="w-full bg-white overflow-auto relative isolate h-full">
      <table className="w-full min-w-[1400px] border-collapse text-sm table-fixed">
        <thead className="z-50">
          <tr className="h-[40px]">
            {/* Status Column */}
            <th className="border-b border-r border-slate-200 text-left text-xs font-bold text-slate-800 bg-slate-100 px-3 py-3 select-none whitespace-nowrap sticky top-0 z-50 shadow-sm w-[90px]">
              Status
            </th>
            {/* Hook Image */}
            <th className="border-b border-r border-slate-200 text-left text-xs font-bold text-slate-800 bg-slate-100 px-2 py-3 select-none whitespace-nowrap sticky top-0 z-50 shadow-sm w-[10%]">
              Hook (画像)
            </th>
            {/* Hook Message */}
            <th className="border-b border-r border-slate-200 text-left text-xs font-bold text-slate-800 bg-slate-100 px-2 py-3 select-none whitespace-nowrap sticky top-0 z-50 shadow-sm w-[14%]">
              Hook (メッセージ)
            </th>
            {/* Body1 Image */}
            <th className="border-b border-r border-slate-200 text-left text-xs font-bold text-slate-800 bg-slate-100 px-2 py-3 select-none whitespace-nowrap sticky top-0 z-50 shadow-sm w-[10%]">
              Body1 (画像) {duration === 30 ? "シーンA" : ""}
            </th>
            {/* Body1 Image Scene B (30s only) */}
            {duration === 30 && (
              <th className="border-b border-r border-slate-200 text-left text-xs font-bold text-slate-800 bg-slate-100 px-2 py-3 select-none whitespace-nowrap sticky top-0 z-50 shadow-sm w-[10%]">
                Body1 (画像) シーンB
              </th>
            )}
            {/* Body1 Message */}
            <th className="border-b border-r border-slate-200 text-left text-xs font-bold text-slate-800 bg-slate-100 px-2 py-3 select-none whitespace-nowrap sticky top-0 z-50 shadow-sm w-[14%]">
              {duration === 30
                ? "Body1 (シーンA / シーンB)"
                : "Body1 (メッセージ)"}
            </th>
            {/* Body2 Image */}
            <th className="border-b border-r border-slate-200 text-left text-xs font-bold text-slate-800 bg-slate-100 px-2 py-3 select-none whitespace-nowrap sticky top-0 z-50 shadow-sm w-[10%]">
              Body2 (画像) {duration === 30 ? "シーンA" : ""}
            </th>
            {/* Body2 Image Scene B (30s only) */}
            {duration === 30 && (
              <th className="border-b border-r border-slate-200 text-left text-xs font-bold text-slate-800 bg-slate-100 px-2 py-3 select-none whitespace-nowrap sticky top-0 z-50 shadow-sm w-[10%]">
                Body2 (画像) シーンB
              </th>
            )}
            {/* Body2 Message */}
            <th className="border-b border-r border-slate-200 text-left text-xs font-bold text-slate-800 bg-slate-100 px-2 py-3 select-none whitespace-nowrap sticky top-0 z-50 shadow-sm w-[14%]">
              {duration === 30
                ? "Body2 (シーンA / シーンB)"
                : "Body2 (メッセージ)"}
            </th>
            {/* CTA Message */}
            <th className="border-b border-slate-200 text-left text-xs font-bold text-slate-800 bg-slate-100 px-2 py-3 select-none whitespace-nowrap sticky top-0 z-50 shadow-sm w-[12%] border-r-0">
              CTA (メッセージ)
            </th>
          </tr>
        </thead>
        <tbody className="text-slate-800">
          {rows.map((row, index) => {
            const isSelected = selectedRowIndex === index;
            const renderStatus = renderStatuses[index];

            return (
              <tr
                key={index}
                onClick={() => onRowSelect(index)}
                className={`group cursor-pointer transition-colors ${
                  isSelected
                    ? "bg-blue-50 ring-2 ring-inset ring-[#0093b4]"
                    : "hover:bg-slate-50"
                }`}
              >
                {/* Status */}
                <td className="border-b border-r border-slate-200 px-3 py-3 align-middle">
                  <StatusIndicator status={renderStatus?.status || "planned"} />
                </td>
                {/* Hook Image */}
                <td className="border-b border-r border-slate-200 p-2 align-middle">
                  {row.hookImage ? (
                    <img
                      src={row.hookImage}
                      alt="Hook"
                      className="w-full h-[60px] object-cover rounded"
                    />
                  ) : (
                    <div className="w-full h-[60px] bg-slate-100 rounded flex items-center justify-center text-[10px] text-slate-400">
                      No Image
                    </div>
                  )}
                </td>
                {/* Hook Message */}
                <td className="border-b border-r border-slate-200 px-3 py-2.5 align-top">
                  <div className="flex flex-col gap-0.5">
                    {duration === 30 ? (
                      <>
                        <div>
                          <span className="text-[9px] font-medium text-slate-400 uppercase tracking-wide">
                            Part 1
                          </span>
                          <div className="text-xs text-slate-800 leading-snug break-words">
                            {row.hookPart1 || ""}
                          </div>
                        </div>
                        <div className="border-t border-slate-200 my-0.5" />
                        <div>
                          <span className="text-[9px] font-medium text-slate-400 uppercase tracking-wide">
                            Part 2
                          </span>
                          <div className="text-xs text-slate-800 leading-snug break-words">
                            {row.hookPart2 || ""}
                          </div>
                        </div>
                      </>
                    ) : (
                      <div className="text-xs text-slate-800 leading-snug break-words min-h-[40px]">
                        {row.hookPart1 || ""}
                      </div>
                    )}
                  </div>
                </td>
                {/* Body1 Image */}
                <td className="border-b border-r border-slate-200 p-2 align-middle">
                  {row.body1Image ? (
                    <img
                      src={row.body1Image}
                      alt="Body1"
                      className="w-full h-[60px] object-cover rounded"
                    />
                  ) : (
                    <div className="w-full h-[60px] bg-slate-100 rounded flex items-center justify-center text-[10px] text-slate-400">
                      No Image
                    </div>
                  )}
                </td>
                {/* Body1 Image Scene B (30s only) */}
                {duration === 30 && (
                  <td className="border-b border-r border-slate-200 p-2 align-middle">
                    {row.body1ImageB ? (
                      <img
                        src={row.body1ImageB}
                        alt="Body1 B"
                        className="w-full h-[60px] object-cover rounded"
                      />
                    ) : (
                      <div className="w-full h-[60px] bg-slate-100 rounded flex items-center justify-center text-[10px] text-slate-400">
                        No Image
                      </div>
                    )}
                  </td>
                )}
                {/* Body1 Message */}
                <td className="border-b border-r border-slate-200 px-3 py-2.5 align-top">
                  <div className="flex flex-col gap-0.5">
                    {duration === 30 ? (
                      <>
                        <div>
                          <span className="text-[9px] font-medium text-slate-400 uppercase tracking-wide">
                            Part 1
                          </span>
                          <div className="text-xs text-slate-800 leading-snug break-words">
                            {row.body1Part1 || ""}
                          </div>
                        </div>
                        <div className="border-t border-slate-200 my-0.5" />
                        <div>
                          <span className="text-[9px] font-medium text-slate-400 uppercase tracking-wide">
                            Part 2
                          </span>
                          <div className="text-xs text-slate-800 leading-snug break-words">
                            {row.body1Part2 || ""}
                          </div>
                        </div>
                      </>
                    ) : (
                      <div className="text-xs text-slate-800 leading-snug break-words min-h-[40px]">
                        {row.body1Part1 || ""}
                      </div>
                    )}
                  </div>
                </td>
                {/* Body2 Image */}
                <td className="border-b border-r border-slate-200 p-2 align-middle">
                  {row.body2Image ? (
                    <img
                      src={row.body2Image}
                      alt="Body2"
                      className="w-full h-[60px] object-cover rounded"
                    />
                  ) : (
                    <div className="w-full h-[60px] bg-slate-100 rounded flex items-center justify-center text-[10px] text-slate-400">
                      No Image
                    </div>
                  )}
                </td>
                {/* Body2 Image Scene B (30s only) */}
                {duration === 30 && (
                  <td className="border-b border-r border-slate-200 p-2 align-middle">
                    {row.body2ImageB ? (
                      <img
                        src={row.body2ImageB}
                        alt="Body2 B"
                        className="w-full h-[60px] object-cover rounded"
                      />
                    ) : (
                      <div className="w-full h-[60px] bg-slate-100 rounded flex items-center justify-center text-[10px] text-slate-400">
                        No Image
                      </div>
                    )}
                  </td>
                )}
                {/* Body2 Message */}
                <td className="border-b border-r border-slate-200 px-3 py-2.5 align-top">
                  <div className="flex flex-col gap-0.5">
                    {duration === 30 ? (
                      <>
                        <div>
                          <span className="text-[9px] font-medium text-slate-400 uppercase tracking-wide">
                            Part 1
                          </span>
                          <div className="text-xs text-slate-800 leading-snug break-words">
                            {row.body2Part1 || ""}
                          </div>
                        </div>
                        <div className="border-t border-slate-200 my-0.5" />
                        <div>
                          <span className="text-[9px] font-medium text-slate-400 uppercase tracking-wide">
                            Part 2
                          </span>
                          <div className="text-xs text-slate-800 leading-snug break-words">
                            {row.body2Part2 || ""}
                          </div>
                        </div>
                      </>
                    ) : (
                      <div className="text-xs text-slate-800 leading-snug break-words min-h-[40px]">
                        {row.body2Part1 || ""}
                      </div>
                    )}
                  </div>
                </td>
                {/* CTA Message */}
                <td className="border-b border-slate-200 px-3 py-2.5 align-top border-r-0">
                  <div className="flex flex-col gap-0.5">
                    {duration === 30 ? (
                      <>
                        <div>
                          <span className="text-[9px] font-medium text-slate-400 uppercase tracking-wide">
                            Part 1
                          </span>
                          <div className="text-xs text-slate-800 leading-snug break-words">
                            {row.ctaPart1 || ""}
                          </div>
                        </div>
                        <div className="border-t border-slate-200 my-0.5" />
                        <div>
                          <span className="text-[9px] font-medium text-slate-400 uppercase tracking-wide">
                            Part 2
                          </span>
                          <div className="text-xs text-slate-800 leading-snug break-words">
                            {row.ctaPart2 || ""}
                          </div>
                        </div>
                      </>
                    ) : (
                      <div className="text-xs text-slate-800 leading-snug break-words min-h-[40px]">
                        {row.ctaPart1 || ""}
                      </div>
                    )}
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default GenerationTable;
