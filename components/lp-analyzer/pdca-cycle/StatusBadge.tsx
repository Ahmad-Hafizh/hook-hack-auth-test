"use client";

import React from "react";
import { PDCACycle, statusConfig } from "./types";

interface StatusBadgeProps {
  status: PDCACycle["status"];
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
