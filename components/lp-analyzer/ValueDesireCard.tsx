import {
  IDesire,
  IDesireOrganization,
} from "@/app/app-v2/planning/[sessionId]/what/hooks/planningWhatDataContext";
import React from "react";

interface TOBEFieldProps {
  label: string;
  value: string;
  onChange?: (value: string) => void;
}

const TOBEField: React.FC<TOBEFieldProps> = ({ label, value, onChange }) => (
  <div className="flex items-center gap-2">
    <span className="w-28 text-[10px] font-medium text-text-muted text-right shrink-0">
      {label}:
    </span>
    <input
      className="flex-1 min-w-0 text-xs text-text-main bg-white border border-border-light rounded px-2 py-1 focus:border-primary focus:ring-1 focus:ring-primary outline-none"
      type="text"
      value={value}
      onChange={(e) => onChange?.(e.target.value)}
    />
  </div>
);

interface DesireItemProps extends IDesire {
  priority: 1 | 2;
  onDesireChange?: (value: string) => void;
  onReasonChange?: (value: string) => void;
  onCheckChange?: (checked: boolean) => void;
  //   onTobeChange?: (field: keyof typeof tobe, value: string) => void;
}

export const DesireItem: React.FC<DesireItemProps> = ({
  priority,
  desire,
  reason,
  tobe,
  onDesireChange,
  onReasonChange,
  onCheckChange,
  //   onTobeChange,
}) => {
  const isPrimary = priority === 1;
  const badgeClass = isPrimary
    ? "bg-primary/10 text-primary"
    : "bg-gray-200 text-text-muted";

  return (
    <div className="bg-surface-subtle rounded-lg p-4 border border-border-light/50 flex flex-col gap-3">
      <div className="flex items-center gap-3">
        {/* <input
          checked={isChecked}
          type="checkbox"
          onChange={(e) => onCheckChange?.(e.target.checked)}
        /> */}
        <span
          className={`text-[10px] font-bold px-2 py-0.5 rounded whitespace-nowrap ${badgeClass}`}
        >
          欲求Top{priority}
        </span>
        <input
          className="flex-1 min-w-0 text-sm font-bold text-text-main bg-white border border-border-light rounded px-2 py-1 focus:border-primary focus:ring-1 focus:ring-primary outline-none"
          type="text"
          value={desire}
          onChange={(e) => onDesireChange?.(e.target.value)}
        />
      </div>

      <div className="flex items-center gap-2 pl-8">
        <span className="text-xs text-text-muted whitespace-nowrap">
          理由 :
        </span>
        <input
          className="flex-1 min-w-0 text-xs text-text-main bg-transparent border-b border-border-light py-0.5 focus:border-primary outline-none"
          type="text"
          value={reason}
          onChange={(e) => onReasonChange?.(e.target.value)}
        />
      </div>

      <div className="pl-8 pt-2 flex flex-col gap-1.5">
        <div className="text-[10px] text-text-muted font-bold mb-0.5">TOBE</div>
        <TOBEField label="旧前提（卒業）" value={tobe.old_assumption} />
        <TOBEField label="新前提（当たり前）" value={tobe.new_assumption} />
        <TOBEField label="判断" value={tobe.judgement} />
        <TOBEField label="行動" value={tobe.action} />
      </div>
    </div>
  );
};

interface ValueDesireCardProps extends IDesireOrganization {
  onValueIdChange?: (value: string) => void;
  onValueCategoryChange?: (value: string) => void;
  onValueTitleChange?: (value: string) => void;
  onDesireChange?: (
    desireId: string,
    field: string,
    value: string | boolean
  ) => void;
}

export const ValueDesireCard: React.FC<ValueDesireCardProps> = ({
  value_id,
  value_category,
  value_label,
  desire_1,
  desire_2,
  onValueIdChange,
  onValueCategoryChange,
  onValueTitleChange,
  onDesireChange,
}) => (
  <div className="bg-surface-light rounded-xl shadow-soft border border-border-light p-5 md:p-6 flex flex-col gap-5 transition-shadow hover:shadow-md">
    <div className="flex flex-col gap-2 border-b border-border-light pb-4">
      <div className="flex items-center gap-3">
        <input
          className="w-12 text-center text-xs font-bold text-white bg-black rounded py-1 focus:ring-2 focus:ring-primary outline-none cursor-text"
          type="text"
          value={value_id}
        />
        <input
          className="w-20 text-xs text-text-muted bg-surface-subtle border border-border-light rounded px-2 py-1 text-center focus:border-primary focus:ring-1 focus:ring-primary outline-none"
          type="text"
          value={value_category}
        />
        <input
          className="flex-1 text-lg font-bold text-text-main bg-transparent border-none p-0 focus:ring-0 placeholder-text-muted/50 truncate"
          type="text"
          value={value_label}
        />
      </div>
    </div>

    <DesireItem
      priority={1}
      key={desire_1.desire}
      desire={desire_1.desire}
      reason={desire_1.reason}
      tobe={desire_1.tobe}
    />
    <DesireItem
      priority={2}
      key={desire_2.desire}
      desire={desire_2.desire}
      reason={desire_2.reason}
      tobe={desire_2.tobe}
    />
  </div>
);
