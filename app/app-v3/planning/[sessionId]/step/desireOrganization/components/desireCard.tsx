import {
  IDesire,
  IDesireOrganization,
} from "@/app/app-v2/planning/[sessionId]/what/hooks/planningWhatDataContext";
import React, { useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";

// Helper to capitalize first letter
const capitalize = (str: string) => {
  if (!str) return str;
  return str.charAt(0).toUpperCase() + str.slice(1);
};

// Map legacy category names to new names
const mapCategory = (category: string) => {
  if (category === "バイブス") return "雰囲気";
  return category;
};

interface TOBEFieldProps {
  label: string;
  value: string;
  onChange?: (value: string) => void;
}

const TOBEField: React.FC<TOBEFieldProps> = ({ label, value, onChange }) => (
  <div className="flex items-start gap-2">
    <span className="w-32 text-[10px] font-medium text-text-muted text-right shrink-0 pt-1">
      {label}:
    </span>
    <textarea
      className="flex-1 min-w-0 text-xs text-text-main bg-white border border-border-light rounded px-2 py-1 focus:border-primary focus:ring-1 focus:ring-primary outline-none resize-none"
      defaultValue={value}
      rows={2}
      onChange={(e) => onChange?.(e.target.value)}
    />
  </div>
);

interface DesireItemProps extends IDesire {
  priority: 1 | 2;
  onDesireChange?: (value: string) => void;
  onReasonChange?: (value: string) => void;
  onCheckChange?: (checked: boolean) => void;
  onTobeChange?: (field: string, value: string) => void;
  isChecked?: boolean;
}

export const DesireItem: React.FC<DesireItemProps> = ({
  priority,
  desire,
  reason,
  tobe,
  onCheckChange,
  onTobeChange,
  isChecked,
}) => {
  const [tobeOpen, setTobeOpen] = useState(false);
  const isPrimary = priority === 1;
  const badgeClass = isPrimary
    ? "bg-primary/10 text-primary"
    : "bg-gray-200 text-text-muted";

  return (
    <div className="bg-surface-subtle rounded-lg p-4 border border-border-light/50 flex flex-col gap-3">
      <div className="flex items-center gap-3">
        <input
          type="checkbox"
          checked={isChecked}
          onChange={(e) => onCheckChange?.(e.target.checked)}
        />
        <span
          className={`text-[10px] font-bold px-2 py-0.5 rounded whitespace-nowrap ${badgeClass}`}
        >
          欲求Top{priority}
        </span>
        <span className="flex-1 min-w-0 text-sm font-bold text-text-main">
          {capitalize(desire)}
        </span>
      </div>

      <div className="flex items-center gap-2 pl-8">
        <span className="text-xs text-text-muted whitespace-nowrap">
          理由 :
        </span>
        <span className="flex-1 min-w-0 text-xs text-text-main">{reason}</span>
      </div>

      <div className="pl-8 pt-2 flex flex-col gap-1.5">
        <button
          type="button"
          className="flex items-center gap-1 text-[10px] text-text-muted font-bold mb-0.5 hover:text-text-main transition-colors"
          onClick={() => setTobeOpen(!tobeOpen)}
        >
          {tobeOpen ? (
            <ChevronDown className="w-3 h-3" />
          ) : (
            <ChevronRight className="w-3 h-3" />
          )}
          TOBE
        </button>
        {tobeOpen && (
          <>
            <TOBEField
              label="旧前提（卒業）"
              value={tobe.old_assumption}
              onChange={(v) => onTobeChange?.("old_assumption", v)}
            />
            <TOBEField
              label="新前提（当たり前）"
              value={tobe.new_assumption}
              onChange={(v) => onTobeChange?.("new_assumption", v)}
            />
            <TOBEField
              label="判断"
              value={tobe.judgment}
              onChange={(v) => onTobeChange?.("judgment", v)}
            />
            <TOBEField
              label="行動"
              value={tobe.action}
              onChange={(v) => onTobeChange?.("action", v)}
            />
          </>
        )}
      </div>
    </div>
  );
};

interface ValueDesireCardProps extends IDesireOrganization {
  value_display_id?: string;
  onValueIdChange?: (value: string) => void;
  onValueCategoryChange?: (value: string) => void;
  onValueTitleChange?: (value: string) => void;
  onDesireChange?: (
    desireId: string,
    field: string,
    value: string | boolean,
  ) => void;
  checkedTobes?: string[];
  onCheckChange?: (desire_id: string, checked: boolean) => void;
  desire_1_id?: string;
  desire_2_id?: string;
  onTobeChange?: (
    value_id: string,
    desireId: "desire_1" | "desire_2",
    field: string,
    value: string,
  ) => void;
}

export const DesireCard: React.FC<ValueDesireCardProps> = ({
  value_id,
  value_display_id,
  value_category,
  value_label,
  desire_1,
  desire_2,
  desire_1_id,
  desire_2_id,
  checkedTobes,
  onCheckChange,
  onTobeChange,
}) => (
  <div className="bg-surface-light rounded-xl shadow-soft border border-border-light p-5 md:p-6 flex flex-col gap-5 transition-shadow hover:shadow-md">
    <div className="flex flex-col gap-2 border-b border-border-light pb-4">
      <div className="flex items-center gap-3">
        <span className="w-12 text-center text-xs font-bold text-white bg-black rounded py-1">
          {value_display_id || value_id}
        </span>
        <span className="w-20 text-xs text-text-muted bg-surface-subtle border border-border-light rounded px-2 py-1 text-center">
          {capitalize(mapCategory(value_category))}
        </span>
        <span className="flex-1 text-lg font-bold text-text-main truncate">
          {value_label}
        </span>
      </div>
    </div>

    <DesireItem
      priority={1}
      key={desire_1.desire}
      desire={desire_1.desire}
      reason={desire_1.reason}
      tobe={desire_1.tobe}
      isChecked={checkedTobes?.includes(desire_1_id || "")}
      onCheckChange={(checked: boolean) =>
        onCheckChange?.(desire_1_id || "", checked)
      }
      onTobeChange={(field, value) =>
        onTobeChange?.(value_id || "", "desire_1", field, value)
      }
    />
    <DesireItem
      priority={2}
      key={desire_2.desire}
      desire={desire_2.desire}
      reason={desire_2.reason}
      tobe={desire_2.tobe}
      isChecked={checkedTobes?.includes(desire_2_id || "")}
      onCheckChange={(checked: boolean) =>
        onCheckChange?.(desire_2_id || "", checked)
      }
      onTobeChange={(field, value) =>
        onTobeChange?.(value_id || "", "desire_2", field, value)
      }
    />
  </div>
);
