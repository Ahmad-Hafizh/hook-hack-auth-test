import React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      children,
      variant = "primary",
      size = "md",
      icon,
      iconPosition = "right",
      ...props
    },
    ref
  ) => {
    const baseClasses =
      "rounded-lg font-bold transition-all flex items-center justify-center gap-2 group disabled:opacity-50 disabled:cursor-not-allowed";

    const variantClasses = {
      primary:
        "text-white bg-primary hover:bg-primary-hover shadow-lg shadow-primary/20",
      secondary:
        "text-text-muted bg-transparent hover:bg-slate-50 border border-transparent hover:border-slate-200",
      ghost: "text-text-muted hover:text-text-main hover:bg-slate-100",
    };

    const sizeClasses = {
      sm: "px-4 py-2 text-xs",
      md: "px-6 py-3 text-sm",
      lg: "px-10 py-3 text-sm",
    };

    return (
      <button
        ref={ref}
        className={cn(
          baseClasses,
          variantClasses[variant],
          sizeClasses[size],
          className
        )}
        {...props}
      >
        {icon && iconPosition === "left" && icon}
        {children}
        {icon && iconPosition === "right" && icon}
      </button>
    );
  }
);

Button.displayName = "Button";
