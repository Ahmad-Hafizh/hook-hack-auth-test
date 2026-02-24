import React from "react";
import { cn } from "@/lib/utils";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "elevated";
  padding?: "sm" | "md" | "lg";
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  (
    { className, children, variant = "default", padding = "md", ...props },
    ref
  ) => {
    const baseClasses =
      "bg-surface-light rounded-xl border border-border-light";

    const variantClasses = {
      default: "",
      elevated: "shadow-soft",
    };

    const paddingClasses = {
      sm: "p-4",
      md: "p-8 md:p-12",
      lg: "p-12 md:p-16",
    };

    return (
      <div
        ref={ref}
        className={cn(
          baseClasses,
          variantClasses[variant],
          paddingClasses[padding],
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = "Card";
