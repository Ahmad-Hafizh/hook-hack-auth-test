"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import React, { createContext, useContext, useState } from "react";

interface CheckboxGroupContextValue {
  value: string[];
  onItemCheckedChange: (itemValue: string, checked: boolean) => void;
}

const CheckboxGroupContext = createContext<
  CheckboxGroupContextValue | undefined
>(undefined);

const useCheckboxGroup = () => {
  const context = useContext(CheckboxGroupContext);
  if (!context) {
    throw new Error(
      "CustomCheckboxItem must be used within CustomCheckboxGroup"
    );
  }
  return context;
};

interface CustomCheckboxGroupProps extends Omit<
  React.HTMLAttributes<HTMLDivElement>,
  "onValueChange"
> {
  value?: string[];
  defaultValue?: string[];
  onValueChange?: (value: string[]) => void;
}

const CustomCheckboxGroup = React.forwardRef<
  HTMLDivElement,
  CustomCheckboxGroupProps
>(
  (
    {
      className,
      value: controlledValue,
      defaultValue = [],
      onValueChange,
      children,
      ...props
    },
    ref
  ) => {
    const [uncontrolledValue, setUncontrolledValue] =
      useState<string[]>(defaultValue);
    const value =
      controlledValue !== undefined ? controlledValue : uncontrolledValue;

    const onItemCheckedChange = (itemValue: string, checked: boolean) => {
      const newValue = checked
        ? [...value, itemValue]
        : value.filter((v) => v !== itemValue);

      if (controlledValue === undefined) {
        setUncontrolledValue(newValue);
      }

      onValueChange?.(newValue);
    };

    return (
      <CheckboxGroupContext.Provider value={{ value, onItemCheckedChange }}>
        <div
          className={cn("flex flex-col gap-4", className)}
          {...props}
          ref={ref}
        >
          {children}
        </div>
      </CheckboxGroupContext.Provider>
    );
  }
);
CustomCheckboxGroup.displayName = "CustomCheckboxGroup";

interface CustomCheckboxItemProps extends Omit<
  React.ComponentPropsWithoutRef<typeof Checkbox>,
  "value" | "checked" | "onCheckedChange"
> {
  value: string;
  fill?: string;
}

const CustomCheckboxItem = React.forwardRef<
  React.ElementRef<typeof Checkbox>,
  CustomCheckboxItemProps
>(({ className, fill, value: itemValue, ...props }, ref) => {
  const { value, onItemCheckedChange } = useCheckboxGroup();
  const isChecked = value.includes(itemValue);

  return (
    <Checkbox
      ref={ref}
      checked={isChecked}
      onCheckedChange={(checked) =>
        onItemCheckedChange(itemValue, checked as boolean)
      }
      className={cn(
        "h-4 w-4 rounded-full border shadow focus:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    />
  );
});
CustomCheckboxItem.displayName = "CustomCheckboxItem";

export { CustomCheckboxGroup, CustomCheckboxItem };
