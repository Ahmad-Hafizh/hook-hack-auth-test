import React from "react";
import { Button } from "./Button";
import { Icon } from "./Icon";
import { cn } from "@/lib/utils";

export interface NavigationButtonsProps {
  onBack?: () => void;
  onNext?: () => void;
  nextLabel?: string;
  backLabel?: string;
  isNextDisabled?: boolean;
  className?: string;
}

export const NavigationButtons: React.FC<NavigationButtonsProps> = ({
  onBack,
  onNext,
  nextLabel = "次へ進む",
  backLabel = "戻る",
  isNextDisabled = false,
  className,
}) => {
  return (
    <div
      className={cn(
        "flex flex-col-reverse sm:flex-row items-center justify-end gap-4 mt-12 w-full",
        className
      )}
    >
      <div className="flex-1"></div>
      {onBack && (
        <Button variant="ghost" onClick={onBack} className="w-full sm:w-auto">
          {backLabel}
        </Button>
      )}
      {onNext && (
        <Button
          variant="primary"
          size="lg"
          onClick={onNext}
          disabled={isNextDisabled}
          className="w-full sm:w-auto"
          icon={
            <Icon
              name="arrow_forward"
              size="sm"
              className="group-hover:translate-x-1 transition-transform"
            />
          }
          iconPosition="right"
        >
          {nextLabel}
        </Button>
      )}
    </div>
  );
};
