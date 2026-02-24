import React from "react";
import { cn } from "@/lib/utils";
import { Link2 } from "lucide-react";

export interface URLInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  containerClassName?: string;
}

export const URLInput = React.forwardRef<HTMLInputElement, URLInputProps>(
  ({ label, error, containerClassName, className, ...props }, ref) => {
    return (
      <div
        className={cn(
          "flex-1 flex flex-col items-center justify-center w-full max-w-3xl mx-auto",
          containerClassName
        )}
      >
        {label && (
          <label
            className="block text-lg md:text-xl font-bold text-text-main mb-8 text-center"
            htmlFor={props.id}
          >
            {label}
          </label>
        )}

        <div className="relative w-full">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Link2 className="text-gray-400 w-5 h-5" />
          </div>

          <input
            ref={ref}
            type="url"
            className={cn(
              "block w-full pl-12 pr-4 py-4 text-base md:text-lg text-text-main bg-slate-50 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-all placeholder-slate-400",
              error && "border-red-500 focus:ring-red-500 focus:border-red-500",
              className
            )}
            {...props}
          />
        </div>

        {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
      </div>
    );
  }
);

URLInput.displayName = "URLInput";
