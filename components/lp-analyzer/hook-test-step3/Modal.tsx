"use client";

import React from "react";
import { ModalOptions, ModalButton } from "./types";

interface ModalProps extends ModalOptions {
  isOpen: boolean;
  onClose: () => void;
  onButtonClick: (button: ModalButton, inputValue?: string) => void;
  inputValue?: string;
  onInputChange?: (value: string) => void;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  type,
  title,
  message,
  inputValue = "",
  inputPlaceholder = "",
  buttons = [],
  onClose,
  onButtonClick,
  onInputChange,
}) => {
  if (!isOpen) return null;

  const getIconConfig = () => {
    switch (type) {
      case "danger":
        return { bg: "bg-red-100", icon: "warning", iconColor: "text-red-500" };
      case "success":
        return {
          bg: "bg-green-100",
          icon: "check_circle",
          iconColor: "text-green-500",
        };
      case "input":
        return { bg: "bg-blue-100", icon: "edit", iconColor: "text-[#0093b4]" };
      default:
        return { bg: "bg-blue-100", icon: "info", iconColor: "text-[#0093b4]" };
    }
  };

  const iconConfig = getIconConfig();

  return (
    <div
      className="fixed inset-0 bg-black/50 z-[100] flex items-center justify-center"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-white rounded-xl shadow-2xl p-6 max-w-md w-full mx-4 transform transition-all">
        <div className="flex items-start gap-4">
          <div
            className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${iconConfig.bg}`}
          >
            <span
              className={`material-symbols-outlined text-2xl ${iconConfig.iconColor}`}
            >
              {iconConfig.icon}
            </span>
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-bold text-slate-800 mb-2">{title}</h3>
            <p className="text-sm text-slate-500 mb-4">{message}</p>

            {type === "input" && (
              <div className="mb-4">
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-slate-400 rounded-lg text-sm focus:ring-2 focus:ring-[#0093b4] focus:border-[#0093b4]"
                  placeholder={inputPlaceholder}
                  value={inputValue}
                  onChange={(e) => onInputChange?.(e.target.value)}
                  autoFocus
                />
              </div>
            )}

            <div className="flex gap-3 justify-end">
              {buttons.map((button, index) => (
                <button
                  key={index}
                  onClick={() => onButtonClick(button, inputValue)}
                  className={`px-4 py-2 font-medium rounded-lg transition-colors text-sm ${
                    button.primary
                      ? type === "danger"
                        ? "bg-red-500 hover:bg-red-600 text-white"
                        : "bg-[#0093b4] hover:bg-[#007a92] text-white"
                      : "bg-gray-100 hover:bg-gray-200 text-slate-800"
                  }`}
                >
                  {button.text}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
