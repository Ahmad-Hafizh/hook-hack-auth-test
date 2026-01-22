import React from "react";

interface PageHeaderProps {
  title: string;
  description?: string;
  legend?: Array<{
    color: string;
    label: string;
  }>;
}

export const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  description,
  legend,
}) => (
  <div className="mb-6 animate-fade-in-up flex flex-col md:flex-row md:items-end justify-between gap-4 max-w-[1800px] mx-auto w-full">
    <div>
      <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-text-main mb-2">
        {title}
      </h1>
      {description && <p className="text-sm text-text-muted">{description}</p>}
    </div>
    {legend && legend.length > 0 && (
      <div className="flex flex-wrap gap-4 text-xs font-medium text-text-muted bg-surface-subtle px-3 py-1.5 rounded-lg border border-border-light">
        {legend.map((item, index) => (
          <div key={index} className="flex items-center gap-1.5">
            <span className={`w-2 h-2 rounded-full ${item.color}`}></span>
            <span>{item.label}</span>
          </div>
        ))}
      </div>
    )}
  </div>
);

interface NavigationButtonsProps {
  onBack?: () => void;
  onNext?: () => void;
  nextLabel?: string;
  backLabel?: string;
  isNextDisabled?: boolean;
}

export const NavigationButtons: React.FC<NavigationButtonsProps> = ({
  onBack,
  onNext,
  nextLabel = "次へ進む",
  backLabel = "戻る",
  isNextDisabled = false,
}) => (
  <div className="flex flex-col-reverse sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
    {onBack && (
      <button
        onClick={onBack}
        className="px-6 py-2.5 rounded-lg text-sm font-medium text-text-muted hover:text-primary transition-colors w-full sm:w-auto flex items-center justify-center bg-transparent border-0 outline-none shadow-none"
      >
        {backLabel}
      </button>
    )}
    {onNext && (
      <button
        onClick={onNext}
        disabled={isNextDisabled}
        className="w-full sm:w-auto px-10 py-3 rounded-lg text-sm font-bold text-white bg-primary hover:bg-primary-hover transition-all shadow-lg shadow-primary/20 flex items-center justify-center gap-2 group disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <span>{nextLabel}</span>
        <span className="material-symbols-outlined text-[18px] group-hover:translate-x-1 transition-transform">
          arrow_forward
        </span>
      </button>
    )}
  </div>
);
