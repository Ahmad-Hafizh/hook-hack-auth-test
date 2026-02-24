import { HandIcon, StarsIcon } from "lucide-react";
import React from "react";
import { FeatureField } from "./FeatureField";

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
  onChange?: (field: string, value: string) => void;
}

export const CompetitiveCard: React.FC<CompetitiveCardProps> = ({
  type,
  title,
  badge,
  headerColor,
  features,
  onChange,
}) => {
  const isDisabled = type === "competitor";
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
    <div className="flex flex-col gap-3 w-[400px]">
      {/* Header */}
      <div className="bg-white p-4 rounded-xl shadow-sm relative overflow-hidden h-[70px] flex items-center">
        <div className={`absolute top-0 left-0 w-full h-1 ${headerColor}`} />
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

      {/* Content */}
      <div className="bg-white p-5 rounded-xl border border-border-light shadow-soft flex flex-col gap-6 min-h-[860px]">
        <div className="flex flex-col gap-6">
          {/* Key Message */}
          <FeatureField
            icon={<StarsIcon className="w-4 h-4" fill={iconColor} />}
            label="キーメッセージ"
            value={features.keyMessage}
            disabled={isDisabled}
            topSelected="function"
            bottomSelected="result"
            onChange={(value) => onChange?.("keyMessage", value)}
          />

          {/* Features */}
          {["feature1", "feature2", "feature3"].map((key, index) => (
            <FeatureField
              key={key}
              icon={
                <span
                  className={`w-5 h-5 rounded-full ${numberBgColor} flex items-center justify-center text-[10px] font-bold`}
                >
                  {index + 1}
                </span>
              }
              label={`特徴 ${index + 1}`}
              value={features[key as keyof typeof features]}
              height="h-[84px]"
              disabled={isDisabled}
              topSelected={index === 1 ? "emotion" : "function"}
              bottomSelected={index === 0 ? "process" : "result"}
              onChange={(value) => onChange?.(key, value)}
            />
          ))}

          {/* CTA */}
          <FeatureField
            icon={<HandIcon className="w-4 h-4" fill={iconColor} />}
            label="CTA"
            value={features.cta}
            height="h-[46px]"
            isTextarea={false}
            disabled={isDisabled}
            topSelected="function"
            bottomSelected="process"
            onChange={(value) => onChange?.("cta", value)}
          />
        </div>
      </div>
    </div>
  );
};
