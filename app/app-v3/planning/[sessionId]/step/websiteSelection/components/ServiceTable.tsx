"use client";

import React, { useMemo, useState, useCallback } from "react";
import { cn } from "@/lib/utils";
import { SortConfig, SortField } from "./types";
import { ArrowUpDown, Link } from "lucide-react";
import { ICandidates } from "../../../context/dataTypes";

interface Column<T> {
  key: string;
  label: string;
  sortable?: boolean;
  width?: string;
  render?: (item: T, index: number) => React.ReactNode;
}

interface ServiceTableProps {
  data: ICandidates[];
  selectedIds: string[];
  onSelectionChange: (selectedIds: string[]) => void;
  columns?: Column<ICandidates>[];
  loading?: boolean;
  emptyMessage?: string;
  className?: string;
}

const SortIcon: React.FC<{
  field: string;
  sortConfig: SortConfig | null;
}> = ({ field, sortConfig }) => {
  const isActive = sortConfig?.field === field;
  return (
    <ArrowUpDown
      className={cn("w-4 h-4", isActive ? "text-primary" : "text-slate-400")}
    />
  );
};

const defaultColumns: Column<ICandidates>[] = [
  // {
  //   key: "head_company",
  //   label: "企業名",
  //   sortable: true,
  //   width: "w-[23%]",
  // },
  {
    key: "name",
    label: "サービス名",
    sortable: true,
    width: "w-[33%]",
  },
  {
    key: "url",
    label: "サービスURL",
    sortable: true,
    render: (item) => (
      <a
        href={item.url}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 text-cyan-500 hover:underline cursor-pointer truncate"
      >
        <span className="truncate">{item.url}</span>
        <Link className="w-4 h-4" />
      </a>
    ),
  },
];

export const ServiceTable: React.FC<ServiceTableProps> = ({
  data,
  selectedIds,
  onSelectionChange,
  columns = defaultColumns,
  loading = false,
  emptyMessage = "データがありません",
  className,
}) => {
  const [sortConfig, setSortConfig] = useState<SortConfig | null>(null);

  const handleSort = useCallback((field: string) => {
    setSortConfig((prev) => {
      if (prev?.field === field) {
        return {
          field: field as SortField,
          direction: prev.direction === "asc" ? "desc" : "asc",
        };
      }
      return { field: field as SortField, direction: "asc" };
    });
  }, []);

  const sortedData = useMemo(() => {
    if (!sortConfig) return data;

    return [...data].sort((a, b) => {
      const aVal = String(a[sortConfig.field as keyof ICandidates] || "");
      const bVal = String(b[sortConfig.field as keyof ICandidates] || "");
      const comparison = aVal.localeCompare(bVal, "ja");
      return sortConfig.direction === "asc" ? comparison : -comparison;
    });
  }, [data, sortConfig]);

  const allSelected = data.length > 0 && selectedIds.length === data.length;

  const handleSelectAll = useCallback(() => {
    if (allSelected) {
      onSelectionChange([]);
    } else {
      onSelectionChange(data.map((item) => item.url));
    }
  }, [allSelected, data, onSelectionChange]);

  const handleSelectRow = useCallback(
    (id: string) => {
      // Prevent toggling if the id is empty or invalid
      if (!id) return;
      const next = new Set(selectedIds);
      if (next.has(id)) {
        next.delete(id);
      } else if (next.size < 3) {
        next.add(id);
      }
      onSelectionChange(Array.from(next));
    },
    [selectedIds, onSelectionChange],
  );

  return (
    <div
      className={cn(
        "bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm flex flex-col",
        className,
      )}
    >
      <div className="overflow-auto flex-1 custom-scrollbar">
        <table className="w-full border-collapse table-fixed">
          {/* Header */}
          <thead className="sticky top-0 z-10">
            <tr className="bg-slate-50 border-b border-slate-200">
              {/* Checkbox column */}
              <th className="w-[48px] px-4 py-3 bg-slate-50  border-slate-200 text-center">
                {/* <input
                  type="checkbox"
                  checked={allSelected}
                  onChange={handleSelectAll}
                  className="rounded border-slate-300 text-primary focus:ring-primary/20 w-4 h-4 cursor-pointer"
                /> */}
              </th>

              {/* Data columns */}
              {columns.map((col, i) => (
                <th
                  key={col.key}
                  className={cn(
                    "px-4 py-3 text-left text-xs font-bold text-slate-500 uppercase tracking-wider",
                    col.width,
                    i < columns.length - 1 && "border-r border-slate-200",
                  )}
                >
                  <div className="flex items-center justify-between">
                    <span>{col.label}</span>
                    {col.sortable && (
                      <button onClick={() => handleSort(col.key)}>
                        <SortIcon field={col.key} sortConfig={sortConfig} />
                      </button>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>

          {/* Body */}
          <tbody className="divide-y divide-slate-200">
            {loading ? (
              <tr>
                <td
                  colSpan={columns.length + 1}
                  className="px-4 py-16 text-center"
                >
                  <div className="flex flex-col items-center justify-center text-slate-500">
                    <p className="text-sm font-medium">読み込み中...</p>
                  </div>
                </td>
              </tr>
            ) : sortedData.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length + 1}
                  className="px-4 py-16 text-center"
                >
                  <div className="flex flex-col items-center justify-center text-slate-400">
                    <p className="text-sm font-medium">{emptyMessage}</p>
                  </div>
                </td>
              </tr>
            ) : (
              sortedData.map((item, rowIndex) => {
                const rowId = item._uid || item.url;
                const isSelected = selectedIds.includes(rowId);

                return (
                  <tr
                    key={rowId}
                    className={cn(
                      "transition-colors group",
                      isSelected ? "bg-[#E6F4F7]" : "hover:bg-slate-50",
                    )}
                  >
                    {/* Row checkbox */}
                    <td className="px-4 py-3 border-r border-slate-200 text-center">
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => handleSelectRow(rowId)}
                        className="rounded border-slate-300 text-primary focus:ring-primary/20 w-4 h-4 cursor-pointer "
                      />
                    </td>

                    {/* Data cells */}
                    {columns.map((col, i) => (
                      <td
                        key={col.key}
                        className={cn(
                          "px-4 py-3 text-sm truncate",
                          i < columns.length - 1 && "border-r border-slate-200",
                          col.key === "name"
                            ? "font-medium text-slate-800"
                            : "text-slate-700",
                        )}
                      >
                        {col.render
                          ? col.render(item, rowIndex)
                          : String(item[col.key as keyof ICandidates] || "")}
                      </td>
                    ))}
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
