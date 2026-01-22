import React from "react";

interface FeatureTagProps {
  label: string;
  isActive: boolean;
  onClick?: () => void;
}

export const FeatureTag: React.FC<FeatureTagProps> = ({
  label,
  isActive,
  onClick,
}) => (
  <button
    onClick={onClick}
    className={`px-2 py-0.5 text-[10px] transition-colors ${
      isActive
        ? "bg-white text-text-main font-medium shadow-sm"
        : "text-text-muted hover:bg-white/50"
    }`}
  >
    {label}
  </button>
);
