import { HandIcon, StarsIcon } from "lucide-react";
import React from "react";

interface FeatureTagProps {
  label: string;
  isActive: boolean;
}

const FeatureTag: React.FC<FeatureTagProps> = ({ label, isActive }) => (
  <button
    className={`px-2 py-0.5 text-[10px] ${
      isActive
        ? "bg-white text-text-main font-medium shadow-sm"
        : "text-text-muted hover:bg-white/50"
    } transition-colors`}
  >
    {label}
  </button>
);

interface FeatureToggleGroupProps {
  topSelected: "function" | "emotion";
  bottomSelected: "process" | "result";
  onTopChange?: (value: "function" | "emotion") => void;
  onBottomChange?: (value: "process" | "result") => void;
}

export const FeatureToggleGroup: React.FC<FeatureToggleGroupProps> = ({
  topSelected,
  bottomSelected,
  onTopChange,
  onBottomChange,
}) => (
  <div className="flex flex-col items-end gap-1.5">
    <div className="flex rounded overflow-hidden border border-border-light bg-surface-subtle">
      <FeatureTag label="機能" isActive={topSelected === "function"} />
      <FeatureTag label="情緒" isActive={topSelected === "emotion"} />
    </div>
    <div className="flex rounded overflow-hidden border border-border-light bg-surface-subtle">
      <FeatureTag label="プロセス" isActive={bottomSelected === "process"} />
      <FeatureTag label="結果" isActive={bottomSelected === "result"} />
    </div>
  </div>
);

interface FeatureFieldProps {
  icon?: React.ReactNode;
  label: string;
  value: string;
  placeholder?: string;
  height?: string;
  isTextarea?: boolean;
  topSelected?: "function" | "emotion";
  bottomSelected?: "process" | "result";
  showToggle?: boolean;
  onChange?: (value: string) => void;
  disabled?: boolean;
}

export const FeatureField: React.FC<FeatureFieldProps> = ({
  icon,
  label,
  value,
  placeholder = "",
  height = "h-[110px]",
  isTextarea = true,
  topSelected = "function",
  bottomSelected = "result",
  showToggle = true,
  onChange,
  disabled = false,
}) => (
  <div className="flex flex-col gap-2">
    <div className="flex justify-between items-start mb-1 h-[48px]">
      <label className="text-sm font-bold text-text-main flex items-center gap-2 pt-1">
        {icon}
        {label}
      </label>
      {showToggle && (
        <FeatureToggleGroup
          topSelected={topSelected}
          bottomSelected={bottomSelected}
        />
      )}
    </div>
    {isTextarea ? (
      <textarea
        className={`w-full text-sm p-3 rounded-lg border border-border-light bg-surface-subtle focus:bg-white focus:ring-1 focus:ring-primary focus:border-primary transition-all resize-none text-text-main leading-relaxed ${height}`}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange?.(e.target.value)}
      />
    ) : (
      <input
        type="text"
        className={`w-full text-sm p-3 rounded-lg border border-border-light bg-surface-subtle focus:bg-white focus:ring-1 focus:ring-primary focus:border-primary transition-all text-text-main ${height}`}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange?.(e.target.value)}
      />
    )}
  </div>
);

interface CompetitiveCardProps {
  type: "own" | "ai-summary" | "competitor";
  title: string;
  badge?: {
    text: string;
    bgColor: string;
    textColor: string;
    borderColor?: string;
  };
  headerColor: string;
  features: {
    keyMessage: string;
    feature1: string;
    feature2: string;
    feature3: string;
    cta: string;
  };
  isEditable?: boolean;
  onChange?: (field: string, value: string) => void;
}

export const CompetitiveCard: React.FC<CompetitiveCardProps> = ({
  type,
  title,
  badge,
  headerColor,
  features,
  isEditable = false,
  onChange,
}) => {
  const iconColor =
    type === "own"
      ? "text-primary"
      : type === "ai-summary"
        ? "text-indigo-500"
        : "text-text-muted";
  const numberBgColor =
    type === "own"
      ? "bg-slate-100 text-slate-500"
      : type === "ai-summary"
        ? "bg-indigo-50 text-indigo-500"
        : "bg-white border border-slate-200 text-slate-500";

  return (
    <div className="flex flex-col gap-3 group w-[400px]">
      {/* Header */}
      <div className="bg-white p-4 rounded-xl shadow-sm relative overflow-hidden flex-none h-[70px] flex flex-col justify-center">
        <div
          className={`absolute top-0 left-0 w-full h-1 ${headerColor}`}
        ></div>
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-lg text-text-main flex items-center gap-2">
            {title}
            {badge && (
              <span
                className={`${badge.bgColor} ${badge.textColor} text-[10px] px-2 py-0.5 rounded-full font-bold ${badge.borderColor || ""}`}
              >
                {badge.text}
              </span>
            )}
          </h3>
        </div>
      </div>

      {/* Content */}
      <div className="bg-white p-5 rounded-xl border border-border-light shadow-soft flex flex-col gap-6 h-full min-h-[860px]">
        <div className="flex flex-col gap-6 h-full">
          {/* Key Message */}
          <FeatureField
            icon={<StarsIcon className="w-4 h-4" fill={iconColor} />}
            label="キーメッセージ"
            value={features.keyMessage}
            topSelected="function"
            bottomSelected="result"
            onChange={(value) => onChange?.("keyMessage", value)}
          />

          {/* Feature 1 */}
          <FeatureField
            icon={
              <span
                className={`w-5 h-5 rounded-full ${numberBgColor} flex items-center justify-center text-[10px] font-bold`}
              >
                1
              </span>
            }
            label="特徴 1"
            value={features.feature1}
            height="h-[84px]"
            topSelected="function"
            bottomSelected="process"
            onChange={(value) => onChange?.("feature1", value)}
          />

          {/* Feature 2 */}
          <FeatureField
            icon={
              <span
                className={`w-5 h-5 rounded-full ${numberBgColor} flex items-center justify-center text-[10px] font-bold`}
              >
                2
              </span>
            }
            label="特徴 2"
            value={features.feature2}
            height="h-[84px]"
            topSelected="emotion"
            bottomSelected="result"
            onChange={(value) => onChange?.("feature2", value)}
          />

          {/* Feature 3 */}
          <FeatureField
            icon={
              <span
                className={`w-5 h-5 rounded-full ${numberBgColor} flex items-center justify-center text-[10px] font-bold`}
              >
                3
              </span>
            }
            label="特徴 3"
            value={features.feature3}
            height="h-[84px]"
            topSelected="function"
            bottomSelected="result"
            onChange={(value) => onChange?.("feature3", value)}
          />

          {/* CTA */}
          <FeatureField
            icon={
              <HandIcon className={`w-4 h-4 border-none`} fill={iconColor} />
            }
            label="CTA"
            value={features.cta}
            height="h-[46px]"
            isTextarea={false}
            topSelected="function"
            bottomSelected="process"
            onChange={(value) => onChange?.("cta", value)}
          />
        </div>
      </div>
    </div>
  );
};

interface CompetitorDetailColumnProps {
  data: {
    keyMessage: string;
    keyMessageTags: string[];
    feature1: string;
    feature1Tags: string[];
    feature2: string;
    feature2Tags: string[];
    feature3: string;
    feature3Tags: string[];
    cta: string;
  };
}

export const CompetitorDetailColumn: React.FC<CompetitorDetailColumnProps> = ({
  data,
}) => (
  <div className="flex-1 flex flex-col gap-6 border-r border-border-light/50 pr-4 last:border-0 last:pr-0">
    {/* Key Message */}
    <div className="flex flex-col gap-2">
      <div className="flex justify-between items-start mb-1 h-[48px]">
        <span className="text-xs font-bold text-text-muted pt-2">
          キーメッセージ
        </span>
        <div className="flex gap-1 pt-0.5">
          {data.keyMessageTags.map((tag, i) => (
            <span
              key={i}
              className="text-[9px] px-1.5 py-0.5 bg-white border border-slate-200 rounded text-slate-500 h-fit"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
      <p className="text-xs text-text-main p-3 leading-relaxed h-[110px] overflow-y-auto">
        {data.keyMessage}
      </p>
    </div>

    {/* Feature 1 */}
    <div className="flex flex-col gap-2">
      <div className="flex justify-between items-start mb-1 h-[48px]">
        <span className="text-xs font-bold text-text-muted pt-2">特徴 1</span>
        <div className="flex gap-1 pt-0.5">
          {data.feature1Tags.map((tag, i) => (
            <span
              key={i}
              className="text-[9px] px-1.5 py-0.5 bg-white border border-slate-200 rounded text-slate-500 h-fit"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
      <p className="text-xs text-text-main p-3 h-[84px] overflow-y-auto">
        {data.feature1}
      </p>
    </div>

    {/* Feature 2 */}
    <div className="flex flex-col gap-2">
      <div className="flex justify-between items-start mb-1 h-[48px]">
        <span className="text-xs font-bold text-text-muted pt-2">特徴 2</span>
        <div className="flex gap-1 pt-0.5">
          {data.feature2Tags.map((tag, i) => (
            <span
              key={i}
              className="text-[9px] px-1.5 py-0.5 bg-white border border-slate-200 rounded text-slate-500 h-fit"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
      <p className="text-xs text-text-main p-3 h-[84px] overflow-y-auto">
        {data.feature2}
      </p>
    </div>

    {/* Feature 3 */}
    <div className="flex flex-col gap-2">
      <div className="flex justify-between items-start mb-1 h-[48px]">
        <span className="text-xs font-bold text-text-muted pt-2">特徴 3</span>
        <div className="flex gap-1 pt-0.5">
          {data.feature3Tags.map((tag, i) => (
            <span
              key={i}
              className="text-[9px] px-1.5 py-0.5 bg-white border border-slate-200 rounded text-slate-500 h-fit"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
      <p className="text-xs text-text-main p-3 h-[84px] overflow-y-auto">
        {data.feature3}
      </p>
    </div>

    {/* CTA */}
    <div className="flex flex-col gap-2">
      <div className="flex justify-between items-start mb-1 h-[48px]">
        <span className="text-xs font-bold text-text-muted pt-2">CTA</span>
      </div>
      <p className="text-xs text-text-main px-3 font-medium h-[46px] flex items-center">
        {data.cta}
      </p>
    </div>
  </div>
);
