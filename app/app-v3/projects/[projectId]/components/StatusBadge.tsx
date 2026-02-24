"use client";

import React from "react";
import { PDCASession } from "../page";

const statusConfig: Record<
  PDCASession["status"],
  { label: string; bgClass: string; textClass: string; borderClass: string }
> = {
  in_progress: {
    label: "計画中",
    bgClass: "bg-blue-100",
    textClass: "text-blue-800",
    borderClass: "border-blue-200",
  },
  running: {
    label: "実行中",
    bgClass: "bg-emerald-100",
    textClass: "text-emerald-800",
    borderClass: "border-emerald-200",
  },
  completed: {
    label: "完了",
    bgClass: "bg-slate-100",
    textClass: "text-slate-600",
    borderClass: "border-slate-200",
  },
  deleted: {
    label: "削除",
    bgClass: "bg-red-100",
    textClass: "text-red-800",
    borderClass: "border-red-200",
  },
};

interface StatusBadgeProps {
  status: PDCASession["status"];
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const config = statusConfig[status];

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.bgClass} ${config.textClass} border ${config.borderClass}`}
    >
      {config.label}
    </span>
  );
};

export default StatusBadge;
