import React from "react";
import { Icon } from "./Icon";
import { cn } from "@/lib/utils";

export interface RadioCardProps {
  name: string;
  value: string;
  icon: React.ReactNode;
  title: string | React.ReactNode;
  description: string | React.ReactNode;
  checked?: boolean;
  onChange?: (value: string) => void;
  className?: string;
}

export const RadioCard: React.FC<RadioCardProps> = ({
  name,
  value,
  icon,
  title,
  description,
  checked = false,
  onChange,
  className,
}) => {
  const handleChange = () => {
    if (onChange) {
      onChange(value);
    }
  };

  return (
    <label
      className={cn(
        `group relative flex flex-col items-center justify-center p-8 md:p-10 cursor-pointer rounded-xl border-2 border-border-light hover:border-cyan-600 hover:shadow-md transition-all duration-300 h-full ${checked ? "border-cyan-600 shadow-md" : ""}`,
        className
      )}
    >
      <input
        className="peer sr-only"
        name={name}
        type="radio"
        value={value}
        checked={checked}
        onChange={handleChange}
      />

      <div className="mb-6 bg-slate-50 rounded-full p-4 group-hover:bg-white group-hover:scale-110 transition-transform duration-300 border border-slate-100 group-hover:border-primary/20">
        {icon}
      </div>

      <h4 className="text-lg font-bold text-text-main text-center group-hover:text-primary transition-colors mb-3">
        {title}
      </h4>

      <p className="text-sm text-gray-400 text-center leading-relaxed">
        {description}
      </p>

      <div className="mt-6 w-5 h-5 rounded-full border border-slate-300 flex items-center justify-center peer-checked:border-cyan-600 peer-checked:bg-cyan-600 transition-colors">
        <div className="w-2.5 h-2.5 rounded-full bg-white opacity-0 peer-checked:opacity-100 transition-opacity"></div>
      </div>

      {/* <div className="absolute inset-0 rounded-xl border-2 border-transparent peer-checked:border-cyan-600  pointer-events-none transition-colors"></div> */}
    </label>
  );
};
