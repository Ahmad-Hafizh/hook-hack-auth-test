"use client";

import React from "react";
import { Sheet } from "./types";
import { XCircle } from "lucide-react";

interface SheetTabsProps {
  sheets: Sheet[];
  activeSheetId: string;
  onSheetSelect: (sheetId: string) => void;
  onAddSheet: () => void;
  onDuplicateSheet: () => void;
  onDeleteSheet: (sheetId: string) => void;
  onRenameSheet: (sheetId: string) => void;
}

export const SheetTabs: React.FC<SheetTabsProps> = ({
  sheets,
  activeSheetId,
  onSheetSelect,
  onAddSheet,
  onDuplicateSheet,
  onDeleteSheet,
  onRenameSheet,
}) => {
  return (
    <div className="w-full flex items-end border-b border-slate-400 bg-gray-50 rounded-t-lg -mt-2">
      <div className="flex items-center gap-1 px-2 pb-2">
        <button
          onClick={onAddSheet}
          className="p-1.5 rounded hover:bg-gray-200 transition-colors text-slate-500 hover:text-[#0093b4]"
          title="Add new sheet"
        >
          <span className="material-symbols-outlined ">add</span>
        </button>
        <button
          onClick={onDuplicateSheet}
          className="p-1.5 rounded hover:bg-gray-200 transition-colors text-slate-500 hover:text-[#0093b4]"
          title="Duplicate current sheet"
        >
          <span className="material-symbols-outlined ">content_copy</span>
        </button>
      </div>
      <div className="flex items-end gap-1 px-2 pt-2 overflow-x-auto scrollbar-hide flex-1">
        {sheets.map((sheet) => (
          <div
            key={sheet.id}
            onClick={() => onSheetSelect(sheet.id)}
            className={`px-4 py-2 text-sm font-medium cursor-pointer border-t border-l border-r rounded-t-lg transition-all flex justify-between items-center gap-2 relative ${
              sheet.id === activeSheetId
                ? "bg-white text-[#0093b4] border-slate-400 border-b-white -mb-px z-10"
                : "bg-gray-100 text-slate-500 border-transparent hover:bg-gray-200"
            }`}
          >
            <span
              className="tab-name"
              onDoubleClick={(e) => {
                e.stopPropagation();
                onRenameSheet(sheet.id);
              }}
            >
              {sheet.name}
            </span>
            {sheets.length > 1 && (
              <button
                className="opacity-0 hover:opacity-100 transition-opacity text-gray-400 hover:text-red-500 p-0"
                onClick={(e) => {
                  e.stopPropagation();
                  onDeleteSheet(sheet.id);
                }}
              >
                <span className="material-symbols-outlined text-sm">
                  <XCircle className="w-4 h-4" />
                </span>
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SheetTabs;
