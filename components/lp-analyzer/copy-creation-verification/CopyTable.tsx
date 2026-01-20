"use client";

import React, { useEffect, useState } from "react";
import { CopyRow, VerificationTarget } from "./types";

interface CopyTableProps {
  data: CopyRow[];
  selectedTarget: VerificationTarget;
  selectedRow: any;
  onSelectRow: (rowIndex: any, field: string) => void;
}

interface CellState {
  checked: boolean;
  value: string;
}

export const CopyTable: React.FC<CopyTableProps> = ({
  data,
  selectedTarget,
  selectedRow,
  onSelectRow,
}) => {
  const [rows, setRows] = useState<any[]>([
    {
      hook: { checked: false, value: "" },
      body1: { checked: false, value: "" },
      body2: { checked: false, value: "" },
      cta: { checked: false, value: "" },
    },
  ]);

  useEffect(() => {
    const initialRows = data.map((item, rowIndex) => ({
      hook: { checked: selectedRow.hook.includes(rowIndex), value: item.hook },
      body1: {
        checked: selectedRow.body1.includes(rowIndex),
        value: item.body1,
      },
      body2: {
        checked: selectedRow.body2.includes(rowIndex),
        value: item.body2,
      },
      cta: { checked: selectedRow.cta.includes(rowIndex), value: item.cta },
    }));
    setRows(initialRows);
  }, [data, selectedRow]);

  console.log(selectedRow);
  console.log(rows);

  const handleTextChange = (
    rowIndex: number,
    field: VerificationTarget,
    value: string,
  ) => {
    const newRows = [...rows];
    newRows[rowIndex][field].value = value;
    setRows(newRows);
  };

  const getColumnStyle = (column: VerificationTarget) => {
    if (column === selectedTarget) {
      return "bg-blue-50";
    }
    return "bg-slate-50";
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
        <thead className="z-50">
          <tr className="h-[40px]">
            <th
              className={`border-b border-r border-slate-400 text-left text-xs font-bold px-3 py-3 select-none whitespace-nowrap bg-slate-200 w-[30%] sticky top-0 z-50 ${getHeaderStyle("hook")}`}
            >
              Hook
              {selectedTarget === "hook" && (
                <span className="ml-2 bg-[#0093b4] text-white text-[10px] px-1.5 py-0.5 rounded font-bold align-middle shadow-sm">
                  検証中
                </span>
              )}
            </th>
            <th
              className={`border-b border-r border-slate-400 text-left text-xs font-bold px-3 py-3 select-none whitespace-nowrap bg-slate-200 w-[25%] sticky top-0 z-50 ${getHeaderStyle("body1")}`}
            >
              Body1
              {selectedTarget === "body1" && (
                <span className="ml-2 bg-[#0093b4] text-white text-[10px] px-1.5 py-0.5 rounded font-bold align-middle shadow-sm">
                  検証中
                </span>
              )}
            </th>
            <th
              className={`border-b border-r border-slate-400 text-left text-xs font-bold px-3 py-3 select-none whitespace-nowrap bg-slate-200 w-[25%] sticky top-0 z-50 ${getHeaderStyle("body2")}`}
            >
              Body2
              {selectedTarget === "body2" && (
                <span className="ml-2 bg-[#0093b4] text-white text-[10px] px-1.5 py-0.5 rounded font-bold align-middle shadow-sm">
                  検証中
                </span>
              )}
            </th>
            <th
              className={`border-b border-slate-400 text-left text-xs font-bold px-3 py-3 select-none whitespace-nowrap bg-slate-200 w-[20%] sticky top-0 z-50 ${getHeaderStyle("cta")}`}
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
                    className={`border-b border-r border-slate-400 relative p-0 transition-colors bg-white h-24 align-top ${
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
                      <textarea
                        className="w-full h-full py-3 pr-3 pl-1 text-sm bg-transparent border-none focus:ring-0 focus:outline-none resize-none leading-relaxed transition-all text-black"
                        value={row[field].value}
                        onChange={(e) =>
                          handleTextChange(index, field, e.target.value)
                        }
                      />
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
