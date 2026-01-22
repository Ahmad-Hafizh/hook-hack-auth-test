import React from "react";
import { cn } from "@/lib/utils";

export interface PageHeaderProps {
  title: string;
  description?: string;
  className?: string;
}

export const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  description,
  className,
}) => {
  return (
    <div className={cn("mb-10 animate-fade-in-up", className)}>
      <h1 className="text-2xl md:text-3xl font-bold tracking-tight mb-3 text-text-main">
        {title}
      </h1>
      {description && (
        <p className="text-text-muted text-base max-w-3xl leading-relaxed">
          {description}
        </p>
      )}
    </div>
  );
};
