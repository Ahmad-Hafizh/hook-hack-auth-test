"use client";

import React from "react";
import { RowData, VerificationTarget } from "./types";

interface VerificationTableProps {
  rows: RowData[];
  selectedTarget: VerificationTarget;
  selectedRadio: Record<VerificationTarget, number>;
  onCheckboxChange: (rowIndex: number, field: keyof RowData) => void;
  onRadioChange: (target: VerificationTarget, rowIndex: number) => void;
  onTextChange: (rowIndex: number, field: keyof RowData, value: string) => void;
}

const columnConfig: {
  key: VerificationTarget;
  label: string;
  width: string;
}[] = [
  { key: "hook", label: "Hook", width: "w-[30%]" },
  { key: "body1", label: "Body1", width: "w-[25%]" },
  { key: "body2", label: "Body2", width: "w-[25%]" },
  { key: "cta", label: "CTA", width: "w-[20%]" },
];

export const VerificationTable: React.FC<VerificationTableProps> = ({
  rows,
  selectedTarget,
  selectedRadio,
  onCheckboxChange,
  onRadioChange,
  onTextChange,
}) => {
  const getCheckedField = (key: VerificationTarget): keyof RowData => {
    return `${key}Checked` as keyof RowData;
  };

  return (
    <div className="w-full bg-white rounded-lg border border-slate-400 shadow-sm overflow-auto relative h-[calc(100vh-220px)] isolate">
      <table className="w-full min-w-[1300px] border-collapse text-sm table-fixed">
        <thead className="z-50">
          <tr className="h-[40px]">
            {columnConfig.map((col, index) => (
              <th
                key={col.key}
                className={`border-b border-r border-slate-400 text-left text-xs font-bold text-slate-800 bg-slate-200 px-4 py-3 select-none whitespace-nowrap sticky top-0 z-50 shadow-sm ${col.width} ${
                  index === 0 ? "border-l-0" : ""
                } ${index === columnConfig.length - 1 ? "border-r-0" : ""}`}
              >
                {col.label}
                {selectedTarget === col.key && (
                  <span className="ml-2 px-2 py-0.5 bg-[#0093b4] text-white text-[10px] rounded-full">
                    検証中
                  </span>
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="text-slate-800">
          {rows.map((row, rowIndex) => (
            <tr key={rowIndex} className="group">
              {columnConfig.map((col, colIndex) => {
                const isMultiSelect = selectedTarget === col.key;
                const checkedField = getCheckedField(col.key);
                const isChecked = row[checkedField] as boolean;
                const isRadioSelected = selectedRadio[col.key] === rowIndex;

                return (
                  <td
                    key={col.key}
                    className={`border-b border-r border-slate-400 relative p-0 transition-colors bg-white hover:bg-slate-50 h-24 align-top ${
                      colIndex === 0 ? "border-l-0" : ""
                    } ${colIndex === columnConfig.length - 1 ? "border-r-0" : ""}`}
                  >
                    <div className="flex h-full">
                      <div className="pt-3.5 pl-3 pr-2 flex-shrink-0 flex items-start">
                        {isMultiSelect ? (
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={() =>
                              onCheckboxChange(rowIndex, checkedField)
                            }
                            className="w-4 h-4 text-[#0093b4] border-gray-400 rounded focus:ring-[#0093b4]/50 cursor-pointer transition-all"
                          />
                        ) : (
                          <input
                            type="radio"
                            name={`${col.key}_select`}
                            checked={isRadioSelected}
                            onChange={() => onRadioChange(col.key, rowIndex)}
                            className="w-4 h-4 border-gray-400 text-[#0093b4] focus:ring-[#0093b4]/50 cursor-pointer transition-all"
                          />
                        )}
                      </div>
                      <textarea
                        className="w-full h-full py-2 px-3 text-xs bg-transparent border-none focus:ring-0 focus:outline-none resize-none leading-relaxed transition-all text-slate-800"
                        value={row[col.key] as string}
                        onChange={(e) =>
                          onTextChange(rowIndex, col.key, e.target.value)
                        }
                        placeholder={`${col.label} message...`}
                      />
                    </div>
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default VerificationTable;
