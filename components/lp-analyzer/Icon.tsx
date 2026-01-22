import React from "react";
import { cn } from "@/lib/utils";

export interface IconProps {
  name: string;
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
}

const sizeClasses = {
  sm: "text-lg",
  md: "text-xl",
  lg: "text-2xl",
  xl: "text-4xl",
};

export const Icon: React.FC<IconProps> = ({ name, className, size = "md" }) => {
  return (
    <span
      className={cn("material-symbols-outlined", sizeClasses[size], className)}
    >
      {name}
    </span>
  );
};
