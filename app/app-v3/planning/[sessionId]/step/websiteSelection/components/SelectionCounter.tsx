"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface SelectionCounterProps {
  selectedCount: number;
  totalCount: number;
  className?: string;
}

export const SelectionCounter: React.FC<SelectionCounterProps> = ({
  selectedCount,
  totalCount,
  className,
}) => {
  return (
    <div
      className={cn(
        "inline-flex items-center px-3 py-1 bg-[#E6F4F7] text-cyan-500 text-xs font-bold rounded-md border border-primary/20",
        className,
      )}
    >
      選択中: {selectedCount} / {totalCount}
    </div>
  );
};
