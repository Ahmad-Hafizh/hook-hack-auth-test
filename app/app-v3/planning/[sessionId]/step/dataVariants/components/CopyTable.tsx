"use client";

import React, { useEffect, useRef, useState } from "react";

export interface TwoPartValue {
  part1: string;
  part2: string;
}

export interface CopyRow {
  hook: TwoPartValue;
  body1: TwoPartValue;
  body2: TwoPartValue;
  cta: TwoPartValue;
}

export type VerificationTarget = "hook" | "body1" | "body2" | "cta";

interface CopyTableProps {
  data: CopyRow[];
  selectedTarget: VerificationTarget;
  selectedRow: any;
  onSelectRow: (rowIndex: any, field: string) => void;
  onDataChange?: (rows: CopyRow[]) => void;
  duration: 15 | 30;
}

interface CellState {
  checked: boolean;
  value: TwoPartValue;
}

export const CopyTable: React.FC<CopyTableProps> = ({
  data,
  selectedTarget,
  selectedRow,
  onSelectRow,
  onDataChange,
  duration,
}) => {
  const [rows, setRows] = useState<any[]>([
    {
      hook: { checked: false, value: { part1: "", part2: "" } },
      body1: { checked: false, value: { part1: "", part2: "" } },
      body2: { checked: false, value: { part1: "", part2: "" } },
      cta: { checked: false, value: { part1: "", part2: "" } },
    },
  ]);
  const isLocalEdit = useRef(false);

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

  const getCharCount = (text: string) => {
    return text?.length || 0;
  };

  useEffect(() => {
    // Skip re-initialization when the data change came from local edits
    if (isLocalEdit.current) {
      isLocalEdit.current = false;
      return;
    }

    const clampValue = (
      val: TwoPartValue,
      field: VerificationTarget,
    ): TwoPartValue => ({
      part1: truncateToLimit(val?.part1 || "", field),
      part2: truncateToLimit(val?.part2 || "", field),
    });

    const initialRows = data.map((item, rowIndex) => ({
      hook: {
        checked: selectedRow.hook.includes(rowIndex),
        value: clampValue(item.hook, "hook"),
      },
      body1: {
        checked: selectedRow.body1.includes(rowIndex),
        value: clampValue(item.body1, "body1"),
      },
      body2: {
        checked: selectedRow.body2.includes(rowIndex),
        value: clampValue(item.body2, "body2"),
      },
      cta: {
        checked: selectedRow.cta.includes(rowIndex),
        value: clampValue(item.cta, "cta"),
      },
    }));
    setRows(initialRows);
  }, [data, selectedRow]);

  const handleTextChange = (
    rowIndex: number,
    field: VerificationTarget,
    part: "part1" | "part2",
    value: string,
  ) => {
    const newRows = [...rows];
    newRows[rowIndex][field].value[part] = truncateToLimit(value, field);
    setRows(newRows);

    // Propagate edits back to parent so context stays in sync
    if (onDataChange) {
      isLocalEdit.current = true;
      const updatedData: CopyRow[] = newRows.map((row) => ({
        hook: row.hook.value,
        body1: row.body1.value,
        body2: row.body2.value,
        cta: row.cta.value,
      }));
      onDataChange(updatedData);
    }
  };

  const getColumnStyle = (column: VerificationTarget) => {
    if (column === selectedTarget) {
      return "bg-blue-50";
    }
    return "bg-slate-50";
  };

  const fieldLabel: Record<VerificationTarget, string> = {
    hook: "Hook",
    body1: "Body 1",
    body2: "Body 2",
    cta: "CTA",
  };

  const getHeaderStyle = (column: VerificationTarget) => {
    if (column === selectedTarget) {
      return "text-[#0093b4] border-b-[#0093b4]/50";
    }
    return "";
  };

  return (
    <div className="w-full bg-white border shadow-sm overflow-scroll h-[70vh] ">
      <table className="w-full min-w-[1300px] h-fit border-collapse text-sm table-fixed">
        <thead className="z-10">
          <tr className="h-[40px]">
            <th
              className={`border-b border-r border-slate-400 text-left text-xs font-bold px-3 py-3 select-none whitespace-nowrap bg-slate-200 w-[30%] sticky top-0  ${getHeaderStyle("hook")}`}
            >
              Hook
              {selectedTarget === "hook" && (
                <span className="ml-2 bg-[#0093b4] text-white text-[10px] px-1.5 py-0.5 rounded font-bold align-middle shadow-sm">
                  検証中
                </span>
              )}
            </th>
            <th
              className={`border-b border-r border-slate-400 text-left text-xs font-bold px-3 py-3 select-none whitespace-nowrap bg-slate-200 w-[25%] sticky top-0 ${getHeaderStyle("body1")}`}
            >
              Body 1
              {selectedTarget === "body1" && (
                <span className="ml-2 bg-[#0093b4] text-white text-[10px] px-1.5 py-0.5 rounded font-bold align-middle shadow-sm">
                  検証中
                </span>
              )}
            </th>
            <th
              className={`border-b border-r border-slate-400 text-left text-xs font-bold px-3 py-3 select-none whitespace-nowrap bg-slate-200 w-[25%] sticky top-0 ${getHeaderStyle("body2")}`}
            >
              Body 2
              {selectedTarget === "body2" && (
                <span className="ml-2 bg-[#0093b4] text-white text-[10px] px-1.5 py-0.5 rounded font-bold align-middle shadow-sm">
                  検証中
                </span>
              )}
            </th>
            <th
              className={`border-b border-slate-400 text-left text-xs font-bold px-3 py-3 select-none whitespace-nowrap bg-slate-200 w-[20%] sticky top-0  ${getHeaderStyle("cta")}`}
            >
              CTA
              {selectedTarget === "cta" && (
                <span className="ml-2 bg-[#0093b4] text-white text-[10px] px-1.5 py-0.5 rounded font-bold align-middle shadow-sm">
                  検証中
                </span>
              )}
            </th>
          </tr>
        </thead>
        <tbody className="text-slate-800">
          {rows.map((row, index) => (
            <tr key={index} className="group">
              {(["hook", "body1", "body2", "cta"] as VerificationTarget[]).map(
                (field, fieldIndex) => (
                  <td
                    key={field}
                    className={`border-b border-r border-slate-400 relative p-0 transition-colors bg-white align-top ${
                      fieldIndex === 0 ? "border-l-0" : ""
                    } ${fieldIndex === 3 ? "border-r-0" : ""} ${getColumnStyle(field)}`}
                  >
                    <div className="flex h-full">
                      <div className="pt-3.5 pl-3 pr-2 flex-shrink-0 flex items-start">
                        {selectedTarget === field ? (
                          <input
                            type="checkbox"
                            checked={row[field].checked}
                            onChange={() => onSelectRow(index, field)}
                            className="w-4 h-4 rounded border-gray-400 text-[#0093b4] focus:ring-[#0093b4]/50 transition duration-150 ease-in-out cursor-pointer"
                          />
                        ) : (
                          <input
                            type="radio"
                            name={`${field}_select`}
                            checked={row[field].checked}
                            onChange={() => onSelectRow(index, field)}
                            className="w-4 h-4 border-gray-400 text-[#0093b4] focus:ring-[#0093b4]/50 focus:ring-offset-0 cursor-pointer transition-all"
                          />
                        )}
                      </div>
                      <div className="flex-1 flex flex-col py-1 pr-3 pl-1">
                        {duration === 30 ? (
                          <>
                            <div className="relative">
                              <span className="text-[9px] font-medium text-slate-400 uppercase tracking-wide">
                                {fieldLabel[field]}A
                              </span>
                              <textarea
                                className="w-full py-0.5 text-sm bg-transparent border-none focus:ring-0 focus:outline-none resize-none leading-snug transition-all text-black min-h-[36px]"
                                value={row[field].value?.part1 || ""}
                                maxLength={charLimits[field]}
                                onChange={(e) =>
                                  handleTextChange(
                                    index,
                                    field,
                                    "part1",
                                    e.target.value,
                                  )
                                }
                              />
                              <span
                                className={`text-[10px] float-right ${getCharCount(row[field].value?.part1) >= charLimits[field] ? "text-red-400" : "text-slate-300"}`}
                              >
                                {getCharCount(row[field].value?.part1)} /{" "}
                                {charLimits[field]}字
                              </span>
                            </div>
                            <div className="border-t border-slate-200 my-0.5" />
                            <div className="relative">
                              <span className="text-[9px] font-medium text-slate-400 uppercase tracking-wide">
                                {fieldLabel[field]}B
                              </span>
                              <textarea
                                className="w-full py-0.5 text-sm bg-transparent border-none focus:ring-0 focus:outline-none resize-none leading-snug transition-all text-black min-h-[36px]"
                                value={row[field].value?.part2 || ""}
                                maxLength={charLimits[field]}
                                onChange={(e) =>
                                  handleTextChange(
                                    index,
                                    field,
                                    "part2",
                                    e.target.value,
                                  )
                                }
                              />
                              <span
                                className={`text-[10px] float-right ${getCharCount(row[field].value?.part2) >= charLimits[field] ? "text-red-400" : "text-slate-300"}`}
                              >
                                {getCharCount(row[field].value?.part2)} /{" "}
                                {charLimits[field]}字
                              </span>
                            </div>
                          </>
                        ) : (
                          <div className="relative">
                            <textarea
                              className="w-full py-1 text-sm bg-transparent border-none focus:ring-0 focus:outline-none resize-none leading-snug transition-all text-black min-h-[60px]"
                              value={row[field].value?.part1 || ""}
                              maxLength={charLimits[field]}
                              onChange={(e) =>
                                handleTextChange(
                                  index,
                                  field,
                                  "part1",
                                  e.target.value,
                                )
                              }
                            />
                            <span
                              className={`text-[10px] float-right ${getCharCount(row[field].value?.part1) >= charLimits[field] ? "text-red-400" : "text-slate-300"}`}
                            >
                              {getCharCount(row[field].value?.part1)} /{" "}
                              {charLimits[field]}字
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </td>
                ),
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CopyTable;
