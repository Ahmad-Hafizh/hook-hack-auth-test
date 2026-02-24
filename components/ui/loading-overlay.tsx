"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface LoadingOverlayProps {
  isVisible: boolean;
  progress?: number; // 0-100
  message?: string;
  showProgress?: boolean;
  showTimeEstimate?: boolean;
  className?: string;
}

export const LoadingOverlay: React.FC<LoadingOverlayProps> = ({
  isVisible,
  progress = 50,
  message = "データを処理中...",
  showProgress = true,
  showTimeEstimate = false,
  className,
}) => {
  if (!isVisible) return null;

  return (
    <div
      className={cn(
        "fixed inset-0 z-[100] flex items-center justify-center",
        "bg-black/65 backdrop-blur-sm",
        "transition-all duration-300",
        className
      )}
    >
      <div className="w-full max-w-md mx-4">
        {/* Card */}
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          {/* Animated gradient header */}
          <div className="h-2 bg-gradient-to-r from-cyan-500 via-blue-500 to-cyan-500 bg-[length:200%_100%] animate-gradient" />

          <div className="p-8">
            {/* Spinner animation */}
            <div className="flex justify-center mb-6">
              <div className="relative">
                {/* Outer ring */}
                <div className="w-14 h-14 rounded-full border-4 border-gray-100" />
                {/* Spinning arc */}
                <div className="absolute inset-0 w-14 h-14 rounded-full border-4 border-transparent border-t-cyan-500 border-r-cyan-500 animate-spin" />
              </div>
            </div>

            {/* Progress bar */}
            {showProgress && (
              <div className="mb-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-600">進行状況</span>
                  <span className="text-sm font-bold text-cyan-600">{Math.round(progress)}%</span>
                </div>
                <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full transition-all duration-500 ease-out relative"
                    style={{ width: `${progress}%` }}
                  >
                    {/* Shimmer effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
                  </div>
                </div>
              </div>
            )}

            {/* Message */}
            <p className="text-center text-gray-600 font-medium">{message}</p>

            {/* Sub-message */}
            <p className="text-center text-gray-400 text-sm mt-2">
              {showTimeEstimate
                ? "※ 最大で10分ほどかかる場合があります"
                : "※ しばらくお待ちください"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingOverlay;
