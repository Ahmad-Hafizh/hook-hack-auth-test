"use client";

import React, { useState } from "react";
import { ColorPicker } from "@/components/lp-analyzer/delivery-settings-preview/ColorPicker";
import { OrientationSelector } from "@/components/lp-analyzer/delivery-settings-preview/OrientationSelector";
import { TemplateSelector } from "@/components/lp-analyzer/delivery-settings-preview/TemplateSelector";
import { BGMSelector } from "@/components/lp-analyzer/delivery-settings-preview/BGMSelector";
import { LivePreview } from "@/components/lp-analyzer/delivery-settings-preview/LivePreview";
import {
  fontOptions,
  genderOptions,
} from "@/components/lp-analyzer/delivery-settings-preview/data";
import {
  Orientation,
  Template,
  DesignSettings,
} from "@/components/lp-analyzer/delivery-settings-preview/types";
import { ArrowRight, SlidersHorizontal } from "lucide-react";
import UploadImageButton from "../components/uploadImageButton";
import callAppV2Api from "@/config/axios/axiosAppV2";
import { useDataContext } from "../hooks/useDataContext";
import { Spinner } from "@/components/ui/spinner";
import { useParams, useRouter } from "next/navigation";

interface DeliverySettingsPreviewProps {
  onBack?: () => void;
  onNext?: (settings: DesignSettings) => void;
}

export const Step4New: React.FC<DeliverySettingsPreviewProps> = ({
  onBack,
  onNext,
}) => {
  const { selectedFinalizedRows } = useDataContext();
  const [settings, setSettings] = useState<DesignSettings>({
    orientation: "horizontal",
    backgroundColor: "ffffff",
    ctaTextColor: "000000",
    font: "Noto Sans JP",
    template: "simple",
    selectedBgm: "uplifting",
    gender: "f",
  });
  const { sessionId } = useParams();
  const [logoUrl, setLogoUrl] = useState<string>("");
  const [submitProgress, setSubmitProgress] = useState({
    percent: 0,
    status: "",
  });
  const [loading, setLoading] = useState<boolean>(false);

  const updateSetting = <K extends keyof DesignSettings>(
    key: K,
    value: DesignSettings[K],
  ) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  const router = useRouter();

  const onSubmit = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        "https://hook-hack.himtalks.my.id/v1/creatomate/raw-renders",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            template_id: "de2edb7c-b2cb-43b2-bcec-df6d79cdaa98",
            modifications: {
              "Back-ground-color(CTA).fill_color": settings.ctaTextColor,
              "BodyB(image)-2.source":
                "https://creatomate.com/files/assets/3f0d08c5-9aa9-47de-91e0-fe39416dbfe2",
              "BodyB(image)-1.source":
                selectedFinalizedRows[0]?.body2Image || "",
              "BodyB(text)-2.text":
                "同じ世界を違う角度から見る力が育っていきます ",
              "BodyB(text)-2.background_color": "ffffff",
              "BodyB(text)-2_audio.source": "   ",
              "BodyB(text)-1.text": selectedFinalizedRows[0]?.body2 || "",
              "BodyB(text)-1.background_color": "ffffff",
              "BodyB(text)-1_audio.source": "   ",
              "BodyA(image)-2.source":
                "https://creatomate.com/files/assets/a745c91d-2648-4708-8a4f-0ec24adcf8b8",
              "BodyA(image)-1.source":
                selectedFinalizedRows[0]?.body1Image || "",
              "BodyA(text)-2.text": "小学生で英検2級を目指す英語塾 ",
              "BodyA(text)-2.font_size": "5 vmin",
              "BodyA(text)-2.background_color": "ffffff",
              "BodyA(text)-2_audio.source": "   ",
              "BodyA(text)-1.text": selectedFinalizedRows[0]?.body1 || "",
              "BodyA(text)-1.background_color": "ffffff",
              "BodyA(text)-1_audio.source": "   ",
              "Back-ground-color(Hook).fill_color": "rgba(63,177,53,1)",
              "Hook(image).source": selectedFinalizedRows[0]?.hookImage || "",
              "Hook(text)-2.text": "生き方の選択肢が増える英語時間を子どもに ",
              "Hook(text)-2_audio.source": "   ",
              "Hook(text)-1.text": selectedFinalizedRows[0]?.hook || "",
              "Hook(text)-1_audio.source": "   ",
              "Same-image-as-BodyA(image)-1.source":
                selectedFinalizedRows[0]?.body1Image || "",
              "Same-image-as-BodyA(image)-2.source":
                selectedFinalizedRows[0]?.body1Image || "",
              "Same-image-as-Hook(image).source":
                selectedFinalizedRows[0]?.hookImage || "",
              "CTA(text)-1.text": selectedFinalizedRows[0]?.cta || "",
              "CTA(text)-1_audio.source": "   ",
              "CTA(text)-2.text": "無料体験レッスン\n",
              "CTA(text)-2.background_color": settings.backgroundColor,
              "CTA(text)-2_audio.source": "   ",
              "Logo.source":
                logoUrl ||
                "https://creatomate.com/files/assets/b87431af-d124-4305-b6c2-6320c8e2bf93",
              "BGM.source": "  ",
            },
            voice: settings.gender || "f",
            audio_max_duration: 30.0,
            enable_audio: true,
          }),
        },
      );

      const reader = response.body?.getReader();
      const decoder = new TextDecoder("utf-8");
      let buffer = "";

      while (true) {
        const { done, value } = await reader!.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        buffer += chunk;

        const lines = buffer.split("\n");
        buffer = lines.pop() || "";

        for (const line of lines) {
          if (line.trim().startsWith("data: ")) {
            try {
              const jsonData = JSON.parse(line.substring(6));

              if (jsonData.percent && jsonData.status) {
                setSubmitProgress({
                  percent: Number(jsonData.percent),
                  status: jsonData.status,
                });
              } else if (jsonData.url) {
                console.log(jsonData.url);
                localStorage.setItem("renderedVideoUrl", jsonData.url);
                router.push(`/app-v2/planning/${sessionId}/generation`);
              }
            } catch (e) {
              console.error("Failed to parse JSON:", line, e);
            }
          }
        }
      }

      // Process remaining buffer
      if (buffer.trim().startsWith("data: ")) {
        try {
          const jsonData = JSON.parse(buffer.substring(6));
          if (jsonData.url) {
            console.log(jsonData.url);
          }
        } catch (e) {
          console.error("Failed to parse final JSON:", buffer, e);
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
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
                <UploadImageButton
                  onUploadImage={(url) => setLogoUrl(url)}
                  aspectRatio={1 / 1}
                >
                  <div className="w-full max-w-[200px] aspect-square bg-gray-50 border border-dashed border-gray-300 rounded-lg flex items-center justify-center relative overflow-hidden group hover:border-blue-400 transition-colors cursor-pointer">
                    {logoUrl ? (
                      <img
                        src={logoUrl}
                        alt="Logo Preview"
                        className="w-full h-full object-contain"
                      />
                    ) : (
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
                    )}
                  </div>
                </UploadImageButton>
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
                    Gender
                  </label>
                  <div className="relative">
                    <select
                      className="w-full appearance-none bg-white border border-slate-200 text-slate-800 py-2.5 px-3 pr-10 rounded focus:outline-none focus:ring-1 focus:ring-[#0093b4] focus:border-[#0093b4] text-sm"
                      value={settings.gender}
                      onChange={(e) => updateSetting("gender", e.target.value)}
                    >
                      {genderOptions.map((gender) => (
                        <option key={gender} value={gender}>
                          {gender}
                        </option>
                      ))}
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-500">
                      <span className="text-xs">▼</span>
                    </div>
                  </div>
                </div>
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
          onClick={onSubmit}
          disabled={loading}
          className="bg-[#0093b4] hover:bg-[#007a92] text-white px-8 py-3 rounded-full font-bold shadow-lg transition-transform hover:-translate-y-0.5 active:translate-y-0 flex items-center gap-2"
        >
          {loading ? (
            <>
              <Spinner className="w-5 h-5" /> {submitProgress.percent}%{" "}
              {submitProgress.status.replace(/_/g, " ")}
            </>
          ) : (
            <>
              次に進む
              <ArrowRight className="w-5 h-5" />
            </>
          )}
        </button>
      </div>
    </main>
  );
};

export default Step4New;
