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

interface DesireItemProps {
  priority: 1 | 2;
  desire: string;
  reason: string;
  isChecked: boolean;
  tobe: {
    oldPremise: string;
    newPremise: string;
    judgment: string;
    action: string;
  };
  onDesireChange?: (value: string) => void;
  onReasonChange?: (value: string) => void;
  onCheckChange?: (checked: boolean) => void;
  //   onTobeChange?: (field: keyof typeof tobe, value: string) => void;
}

export const DesireItem: React.FC<DesireItemProps> = ({
  priority,
  desire,
  reason,
  isChecked,
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
        <input
          checked={isChecked}
          type="checkbox"
          onChange={(e) => onCheckChange?.(e.target.checked)}
        />
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
        {/* <TOBEField
          label="旧前提（卒業）"
          value={tobe.oldPremise}
          onChange={(value) => onTobeChange?.("oldPremise", value)}
        />
        <TOBEField
          label="新前提（当たり前）"
          value={tobe.newPremise}
          onChange={(value) => onTobeChange?.("newPremise", value)}
        />
        <TOBEField
          label="判断"
          value={tobe.judgment}
          onChange={(value) => onTobeChange?.("judgment", value)}
        />
        <TOBEField
          label="行動"
          value={tobe.action}
          onChange={(value) => onTobeChange?.("action", value)}
        /> */}
      </div>
    </div>
  );
};

interface ValueDesireCardProps {
  valueId: string;
  valueCategory: string;
  valueTitle: string;
  desires: Array<{
    id: string;
    priority: 1 | 2;
    desire: string;
    reason: string;
    isChecked: boolean;
    tobe: {
      oldPremise: string;
      newPremise: string;
      judgment: string;
      action: string;
    };
  }>;
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
  valueId,
  valueCategory,
  valueTitle,
  desires,
  onValueIdChange,
  onValueCategoryChange,
  onValueTitleChange,
  onDesireChange,
}) => (
  <div className="bg-surface-light rounded-xl shadow-soft border border-border-light p-5 md:p-6 flex flex-col gap-5 transition-shadow hover:shadow-md">
    <div className="flex flex-col gap-2 border-b border-border-light pb-4">
      <div className="flex items-center gap-3">
        <input
          className="w-12 text-center text-xs font-bold text-white bg-text-main rounded py-1 focus:ring-2 focus:ring-primary outline-none cursor-text"
          type="text"
          value={valueId}
          onChange={(e) => onValueIdChange?.(e.target.value)}
        />
        <input
          className="w-20 text-xs text-text-muted bg-surface-subtle border border-border-light rounded px-2 py-1 text-center focus:border-primary focus:ring-1 focus:ring-primary outline-none"
          type="text"
          value={valueCategory}
          onChange={(e) => onValueCategoryChange?.(e.target.value)}
        />
        <input
          className="flex-1 text-lg font-bold text-text-main bg-transparent border-none p-0 focus:ring-0 placeholder-text-muted/50 truncate"
          type="text"
          value={valueTitle}
          onChange={(e) => onValueTitleChange?.(e.target.value)}
        />
      </div>
    </div>

    {desires.map((desire) => (
      <DesireItem
        key={desire.id}
        priority={desire.priority}
        desire={desire.desire}
        reason={desire.reason}
        isChecked={desire.isChecked}
        tobe={desire.tobe}
        onDesireChange={(value) => onDesireChange?.(desire.id, "desire", value)}
        onReasonChange={(value) => onDesireChange?.(desire.id, "reason", value)}
        onCheckChange={(checked) =>
          onDesireChange?.(desire.id, "checked", checked)
        }
        // onTobeChange={(field, value) =>
        //   onDesireChange?.(desire.id, `tobe.${field}`, value)
        // }
      />
    ))}
  </div>
);
