"use client";

import React, { useState } from "react";
import { ColorPicker } from "@/components/lp-analyzer/delivery-settings-preview/ColorPicker";
import { OrientationSelector } from "@/components/lp-analyzer/delivery-settings-preview/OrientationSelector";
import { TemplateSelector } from "@/components/lp-analyzer/delivery-settings-preview/TemplateSelector";
import { BGMSelector } from "@/components/lp-analyzer/delivery-settings-preview/BGMSelector";
import { LivePreview } from "@/components/lp-analyzer/delivery-settings-preview/LivePreview";
import { fontOptions } from "@/components/lp-analyzer/delivery-settings-preview/data";
import {
  Orientation,
  Template,
  DesignSettings,
} from "@/components/lp-analyzer/delivery-settings-preview/types";
import { ArrowRight, SlidersHorizontal } from "lucide-react";

interface DeliverySettingsPreviewProps {
  onBack?: () => void;
  onNext?: (settings: DesignSettings) => void;
}

export const Step4New: React.FC<DeliverySettingsPreviewProps> = ({
  onBack,
  onNext,
}) => {
  const [settings, setSettings] = useState<DesignSettings>({
    orientation: "horizontal",
    backgroundColor: "22C55E",
    ctaTextColor: "000000",
    font: "Noto Sans JP",
    template: "simple",
    selectedBgm: "uplifting",
  });

  const updateSetting = <K extends keyof DesignSettings>(
    key: K,
    value: DesignSettings[K],
  ) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <main className="flex-1 w-full max-w-[1200px] mx-auto px-6 py-10 pb-24">
      {/* Header */}
      <div className="mb-10 text-center md:text-left">
        <h1 className="text-3xl md:text-4xl font-bold text-slate-800 tracking-tight">
          配信設定とプレビュー
        </h1>
      </div>

      {/* Main Card */}
      <div className="w-full bg-white border border-slate-200 rounded-xl shadow-sm flex flex-col h-full">
        <div className="p-5 border-b border-slate-200 bg-slate-50/30 rounded-t-xl flex justify-between items-center">
          <h2 className="font-bold text-lg text-slate-800 flex items-center gap-2">
            <SlidersHorizontal className="w-6 h-6 text-[#0093b4]" />
            デザイン設定
          </h2>
        </div>

        <div className="p-6">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Settings Panel */}
            <div className="flex-1 space-y-8">
              {/* Logo Upload */}
              <div className="flex flex-col gap-4">
                <div className="flex justify-between items-center mb-1">
                  <label className="font-bold text-sm text-slate-800">
                    ブランドロゴ
                  </label>
                </div>
                <div className="w-full max-w-[200px] aspect-square bg-gray-50 border border-dashed border-gray-300 rounded-lg flex items-center justify-center relative overflow-hidden group hover:border-blue-400 transition-colors cursor-pointer">
                  <div className="absolute inset-0 flex items-center justify-center opacity-60 group-hover:opacity-80 transition-opacity">
                    <svg
                      className="w-24 h-24"
                      fill="none"
                      viewBox="0 0 200 200"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <circle cx="100" cy="33" fill="black" r="8" />
                      <circle cx="20" cy="167" fill="black" r="8" />
                      <circle cx="180" cy="167" fill="black" r="8" />
                      <path
                        d="M100 33 L20 167"
                        stroke="black"
                        strokeDasharray="8 8"
                        strokeWidth="2"
                      />
                      <path
                        d="M100 33 L180 167"
                        stroke="black"
                        strokeDasharray="8 8"
                        strokeWidth="2"
                      />
                      <path
                        d="M20 167 L180 167"
                        stroke="black"
                        strokeDasharray="8 8"
                        strokeWidth="2"
                      />
                    </svg>
                  </div>
                </div>
                <p className="text-xs text-slate-500 mt-1">
                  推奨サイズ: 500x500px (PNG, JPG)
                </p>
              </div>

              {/* Orientation */}
              <OrientationSelector
                value={settings.orientation}
                onChange={(value) => updateSetting("orientation", value)}
              />

              {/* Colors */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl">
                <ColorPicker
                  label="背景色（緑の部分）"
                  value={settings.backgroundColor}
                  onChange={(value) => updateSetting("backgroundColor", value)}
                  previewColor={`#${settings.backgroundColor}`}
                />
                <ColorPicker
                  label="CTA文字色"
                  value={settings.ctaTextColor}
                  onChange={(value) => updateSetting("ctaTextColor", value)}
                  previewColor={`#${settings.ctaTextColor}`}
                />

                {/* Font */}
                <div className="flex flex-col gap-2 md:col-span-2">
                  <label className="text-sm font-medium text-slate-500">
                    フォント
                  </label>
                  <div className="relative">
                    <select
                      className="w-full appearance-none bg-white border border-slate-200 text-slate-800 py-2.5 px-3 pr-10 rounded focus:outline-none focus:ring-1 focus:ring-[#0093b4] focus:border-[#0093b4] text-sm"
                      value={settings.font}
                      onChange={(e) => updateSetting("font", e.target.value)}
                    >
                      {fontOptions.map((font) => (
                        <option key={font} value={font}>
                          {font}
                        </option>
                      ))}
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-500">
                      <span className="text-xs">▼</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Template */}
              <TemplateSelector
                value={settings.template}
                onChange={(value) => updateSetting("template", value)}
              />

              {/* BGM */}
              <BGMSelector
                value={settings.selectedBgm}
                onChange={(value) => updateSetting("selectedBgm", value)}
              />
            </div>

            {/* Preview */}
            <LivePreview
              orientation={settings.orientation}
              template={settings.template}
              backgroundColor={settings.backgroundColor}
              ctaTextColor={settings.ctaTextColor}
            />
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="fixed bottom-8 right-8 z-50 flex items-center gap-4">
        <button
          onClick={onBack}
          className="text-slate-500 hover:text-slate-800 font-bold px-4 py-2 transition-colors"
        >
          戻る
        </button>
        <button
          onClick={() => onNext?.(settings)}
          className="bg-[#0093b4] hover:bg-[#007a92] text-white px-8 py-3 rounded-full font-bold shadow-lg transition-transform hover:-translate-y-0.5 active:translate-y-0 flex items-center gap-2"
        >
          次に進む
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </main>
  );
};

export default Step4New;
