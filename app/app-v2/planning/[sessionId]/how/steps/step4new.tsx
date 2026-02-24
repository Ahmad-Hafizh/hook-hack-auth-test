"use client";

import React, { useState, useMemo } from "react";
import { ColorPicker } from "@/components/lp-analyzer/delivery-settings-preview/ColorPicker";
import { OrientationSelector } from "@/components/lp-analyzer/delivery-settings-preview/OrientationSelector";
import { TemplateSelector } from "@/components/lp-analyzer/delivery-settings-preview/TemplateSelector";
import { BGMSelector } from "@/components/lp-analyzer/delivery-settings-preview/BGMSelector";
import { VoiceOverSelector } from "@/components/lp-analyzer/delivery-settings-preview/VoiceOverSelector";
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
import { LoadingOverlay } from "@/components/ui/loading-overlay";
import { useParams, useRouter } from "next/navigation";

// Background image categories and items
type BgCategory =
  | "画用紙"
  | "ウォール"
  | "ノートブック"
  | "ペーパー"
  | "グラフィックス";

interface BgItem {
  url: string;
  name: string;
  category: BgCategory;
}

const BG_CATEGORIES: BgCategory[] = [
  "画用紙",
  "ウォール",
  "ノートブック",
  "ペーパー",
  "グラフィックス",
];

const BG_ITEMS: BgItem[] = [
  // 画用紙
  {
    url: "https://res.cloudinary.com/dp3zkpouo/image/upload/v1771305245/paper_sbpsku.png",
    name: "画用紙 スタンダード",
    category: "画用紙",
  },
  // ウォール
  {
    url: "https://res.cloudinary.com/dp3zkpouo/image/upload/v1771305245/wall_concrete_oww7g1.png",
    name: "コンクリート",
    category: "ウォール",
  },
  // ノートブック
  {
    url: "https://res.cloudinary.com/dp3zkpouo/image/upload/v1771305243/notebook_jai3im.png",
    name: "ノートブック クラシック",
    category: "ノートブック",
  },
  // ペーパー
  {
    url: "https://res.cloudinary.com/dp3zkpouo/image/upload/v1771305245/paper_more_rough_ks0ywp.png",
    name: "ラフペーパー",
    category: "ペーパー",
  },
  // グラフィックス
  {
    url: "https://res.cloudinary.com/dp3zkpouo/image/upload/v1771305244/3_p2pdyn.png",
    name: "グラフィックス 01",
    category: "グラフィックス",
  },
];

interface DeliverySettingsPreviewProps {
  onBack?: () => void;
  onNext?: (settings: DesignSettings) => void;
}

// Template IDs for different video configurations
const TEMPLATE_IDS = {
  "30s_horizontal": "92826a71-48e8-41fb-8064-4c2c5639900c",
  "30s_vertical": "ef56a422-52b2-4e89-93e8-e32517c8981b",
  "15s_horizontal": "c894b6c5-7dad-4cf0-a247-a11ecf3cd033",
  "15s_vertical": "2a42ff4d-3271-454a-8d08-203c8db719fd",
};

export const Step4New: React.FC<DeliverySettingsPreviewProps> = ({
  onBack,
  onNext,
}) => {
  const { selectedFinalizedRows, duration, orientation, onSetOrientation } =
    useDataContext();
  const [settings, setSettings] = useState<DesignSettings>({
    orientation: orientation || "horizontal",
    backgroundColor: "ffffff",
    ctaTextColor: "000000",
    font: "Kiwi Maru",
    template: "simple",
    selectedBgm:
      "https://drive.google.com/uc?export=download&id=1Ze1KD3g7rTzlJRf73vBSyequdSU_yu39",
    gender: "f",
    voiceOver: "lhTvHflPVOqgSWyuWQry", // Default to first female voice
  });
  const { sessionId } = useParams();
  const [logoUrl, setLogoUrl] = useState<string>("");
  const [bgImageUrl, setBgImageUrl] = useState<string>(BG_ITEMS[0].url);
  const [bgTab, setBgTab] = useState<BgCategory>("画用紙");
  const [submitProgress, setSubmitProgress] = useState({
    percent: 0,
    status: "",
  });
  const [loading, setLoading] = useState<boolean>(false);

  // Get first row's images and text for preview
  const firstRow = selectedFinalizedRows[0];
  const previewHookImage = firstRow?.hookImage || "";
  const previewBodyImage = firstRow?.body1Image || "";
  const previewHookText = firstRow?.hookPart1 || "";
  const previewBodyText = firstRow?.body1Part1 || "";
  const previewCtaText = firstRow?.ctaPart1 || "";

  const updateSetting = <K extends keyof DesignSettings>(
    key: K,
    value: DesignSettings[K],
  ) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
    // Sync orientation to context
    if (key === "orientation") {
      onSetOrientation(value as "horizontal" | "vertical");
    }
  };

  // Get template ID based on duration and orientation
  const getTemplateId = (): string => {
    const key =
      `${duration}s_${settings.orientation}` as keyof typeof TEMPLATE_IDS;
    return TEMPLATE_IDS[key] || TEMPLATE_IDS["30s_horizontal"];
  };

  // Get audio max duration based on video duration
  const getAudioMaxDuration = (): number => {
    return duration === 15 ? 18.0 : 34.0;
  };

  const router = useRouter();

  // Helper function to convert color to HEX format
  const toHexColor = (color: string): string => {
    // If already has #, return as is
    if (color.startsWith("#")) return color;
    // Otherwise add #
    return `#${color}`;
  };

  // Generate modifications for a single row
  // Note: backgroundColor = Hook/frame background color
  // For 15s videos, we only use -1 elements (no -2)
  const generateModifications = (row: (typeof selectedFinalizedRows)[0]) => {
    const is30s = duration === 30;
    const fontFamily = settings.font || "Kiwi Maru";

    // Base modifications (always included)
    const baseModifications: Record<string, string> = {
      // Hook
      "Back-ground-color(Hook).fill_color": toHexColor(
        settings.backgroundColor,
      ),
      "Hook(image).source": row?.hookImage || "",
      "Hook(text)-1.text": row?.hookPart1 || "",
      "Hook(text)-1_audio.source": "",
      "Hook(text)-1.font_family": fontFamily,

      // BodyA
      "BodyA(image)-1.source": row?.body1Image || "",
      "BodyA(text)-1.text": row?.body1Part1 || "",
      "BodyA(text)-1.background_color": "",
      "BodyA(text)-1_audio.source": "",
      "BodyA(text)-1.font_family": fontFamily,

      // BodyB
      "Back-ground-color(CTA).fill_color": toHexColor(settings.backgroundColor),
      "BodyB(image)-1.source": row?.body2Image || "",
      "BodyB(text)-1.text": row?.body2Part1 || "",
      "BodyB(text)-1.background_color": "",
      "BodyB(text)-1_audio.source": "   ",
      "BodyB(text)-1.font_family": fontFamily,

      // CTA
      "CTA(text)-1.text": row?.ctaPart1 || "",
      "CTA(text)-1_audio.source": "",
      "CTA(text)-1.color": toHexColor(settings.ctaTextColor),
      "CTA(text)-1.font_family": fontFamily,

      // Common
      "Same-image-as-BodyA(image)-1.source": row?.body1Image || "",
      "Same-image-as-Hook(image).source": row?.hookImage || "",
      "Logo.source":
        logoUrl ||
        "https://creatomate.com/files/assets/b87431af-d124-4305-b6c2-6320c8e2bf93",
      "BGM.source": settings.selectedBgm || "",
    };

    // Additional modifications for 30s videos (includes -2 elements)
    if (is30s) {
      Object.assign(baseModifications, {
        // Hook -2
        "Hook(text)-2.text": row?.hookPart2 || "",
        "Hook(text)-2_audio.source": "",
        "Hook(text)-2.font_family": fontFamily,

        // BodyA -2
        "BodyA(image)-2.source":
          row?.body1ImageB ||
          "https://creatomate.com/files/assets/a745c91d-2648-4708-8a4f-0ec24adcf8b8",
        "BodyA(text)-2.text": row?.body1Part2 || "",
        "BodyA(text)-2.font_size": "5 vmin",
        "BodyA(text)-2.background_color": "",
        "BodyA(text)-2_audio.source": "   ",
        "BodyA(text)-2.font_family": fontFamily,

        // BodyB -2
        "BodyB(image)-2.source":
          row?.body2ImageB ||
          "https://creatomate.com/files/assets/3f0d08c5-9aa9-47de-91e0-fe39416dbfe2",
        "BodyB(text)-2.text": row?.body2Part2 || "",
        "BodyB(text)-2.background_color": "",
        "BodyB(text)-2_audio.source": "   ",
        "BodyB(text)-2.font_family": fontFamily,

        // CTA -2
        "CTA(text)-2.text": row?.ctaPart2 || "",
        "CTA(text)-2.background_color": toHexColor(settings.backgroundColor),
        "CTA(text)-2.color": toHexColor(settings.ctaTextColor),
        "CTA(text)-2_audio.source": "",
        "CTA(text)-2.font_family": fontFamily,

        // Additional for 30s
        "Same-image-as-BodyA(image)-2.source": row?.body1Image || "",
      });
    }

    return baseModifications;
  };

  const [renderError, setRenderError] = useState<string | null>(null);

  const onSubmit = async () => {
    if (selectedFinalizedRows.length === 0) {
      console.error("No patterns to render");
      return;
    }

    setLoading(true);
    setRenderError(null);
    setSubmitProgress({ percent: 0, status: "レンダリングを開始中..." });

    try {
      const templateId = getTemplateId();

      // Build batch renders array
      const renders = selectedFinalizedRows.map((row) => ({
        template_id: templateId,
        modifications: generateModifications(row),
        voice_id: settings.voiceOver || "lhTvHflPVOqgSWyuWQry",
        audio_max_duration: duration === 15 ? 19.0 : 34.0,
        enable_audio: true,
      }));

      // Submit batch render job
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_APP_V2_API_URL}/v1/creatomate/raw-renders`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-User-ID": "cmlhesrw5000004jv2v19md5v",
            "X-PDCA-Session-ID": sessionId as string,
          },
          body: JSON.stringify({ renders }),
        },
      );

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.detail || `Server error: ${response.status}`);
      }

      const jobData = await response.json();
      const jobId = jobData.job_id;

      if (!jobId) {
        throw new Error("No job_id returned from server");
      }

      console.log("Batch job submitted:", jobId);

      // Store job ID for generation page to poll
      localStorage.setItem("renderJobId", jobId);

      // Clear any previous render URLs (generation page will set these after polling)
      localStorage.removeItem("renderedVideoUrls");
      localStorage.removeItem("renderedVideoUrl");

      // Store video settings for generation page
      localStorage.setItem(
        "videoSettings",
        JSON.stringify({
          orientation: settings.orientation,
          duration: duration,
          font: settings.font,
        }),
      );

      // Navigate immediately — generation page handles polling and status display
      router.push(`/app-v2/planning/${sessionId}/generation`);
    } catch (error) {
      console.error("Error during batch rendering:", error);
      setRenderError(
        "動画の生成中にエラーが発生しました。もう一度お試しください。",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Loading Overlay */}
      <LoadingOverlay
        isVisible={loading}
        progress={submitProgress.percent}
        message={submitProgress.status || "動画を生成中..."}
        showProgress={true}
      />

      <main className="flex-1 w-full max-w-[1600px] mx-auto px-6 py-4">
        {/* Header */}
        <div className="mb-4">
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight mb-2 text-slate-800">
            配信設定とプレビュー
          </h1>
          <p className="text-slate-500 text-base">
            ロゴ、カラー、BGMなどのデザイン設定を行ってください
          </p>
        </div>

        {/* Main Card */}
        <div className="w-full bg-white border border-slate-200 rounded-xl shadow-sm">
          <div className="p-5 border-b border-slate-200 bg-slate-50 rounded-t-xl flex justify-between items-center">
            <h2 className="font-semibold text-lg text-slate-800 flex items-center gap-2">
              <SlidersHorizontal className="w-5 h-5 text-[#0093b4]" />
              デザイン設定
            </h2>
          </div>

          <div className="p-6">
            <div className="flex flex-col lg:flex-row lg:items-start gap-8">
              {/* Settings Panel */}
              <div className="flex-1 space-y-8">
                {/* Orientation */}
                <OrientationSelector
                  value={settings.orientation}
                  onChange={(value) => updateSetting("orientation", value)}
                />

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
                    slot="logo"
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

                {/* Background Image Selector (Tabs + Scrollable List) */}
                <div className="flex flex-col gap-3 max-w-md">
                  <label className="text-sm font-medium text-slate-500">
                    背景画像
                  </label>
                  {/* Category Tabs */}
                  <div className="flex gap-1 p-1 bg-slate-100 rounded-lg overflow-x-auto">
                    {BG_CATEGORIES.map((cat) => (
                      <button
                        key={cat}
                        onClick={() => setBgTab(cat)}
                        className={`py-2 px-3 text-xs font-medium rounded-md transition-all whitespace-nowrap shrink-0 ${
                          bgTab === cat
                            ? "text-white bg-[#0093b4] shadow-sm"
                            : "text-slate-600 hover:text-slate-800 hover:bg-white/50"
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                  {/* Items List */}
                  <div className="flex flex-col gap-2 border border-slate-200 rounded-lg p-2 bg-gray-50/50 max-h-[220px] overflow-y-auto">
                    {BG_ITEMS.filter((item) => item.category === bgTab).map(
                      (item) => {
                        const isSelected = bgImageUrl === item.url;
                        return (
                          <div
                            key={item.url}
                            onClick={() => setBgImageUrl(item.url)}
                            className={`flex items-center gap-3 p-2 rounded transition-all cursor-pointer ${
                              isSelected
                                ? "bg-white border border-blue-100 shadow-sm"
                                : "hover:bg-white border border-transparent hover:border-gray-200"
                            }`}
                          >
                            <input
                              type="radio"
                              name="bg_select"
                              checked={isSelected}
                              onChange={() => setBgImageUrl(item.url)}
                              className="text-[#0093b4] focus:ring-[#0093b4] h-4 w-4 border-gray-300 shrink-0"
                            />
                            <div className="w-14 h-10 rounded overflow-hidden border border-slate-200 shrink-0">
                              <img
                                src={item.url}
                                alt={item.name}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <span
                              className={`text-xs truncate ${isSelected ? "font-medium" : "text-gray-600"}`}
                            >
                              {item.name}
                            </span>
                          </div>
                        );
                      },
                    )}
                  </div>
                </div>

                {/* Colors */}
                <div className="grid grid-cols-1 gap-4 max-w-md">
                  <ColorPicker
                    label="背景色（フレームの色）"
                    value={settings.backgroundColor}
                    onChange={(value) =>
                      updateSetting("backgroundColor", value)
                    }
                    previewColor={`#${settings.backgroundColor}`}
                  />
                </div>

                {/* Font Selection */}
                <div className="flex flex-col gap-2 max-w-md">
                  <label className="text-sm font-medium text-slate-500">
                    フォント
                  </label>
                  <div className="relative">
                    <select
                      className="w-full appearance-none bg-white border border-slate-200 text-slate-800 py-2.5 px-3 pr-10 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0093b4] focus:border-[#0093b4] text-sm cursor-pointer"
                      value={settings.font}
                      onChange={(e) => updateSetting("font", e.target.value)}
                    >
                      <option value="Kiwi Maru">Kiwi Maru</option>
                      <option value="Noto Sans JP">Noto Sans JP</option>
                      <option value="Zen Kaku Gothic New">
                        Zen Kaku Gothic New
                      </option>
                      <option value="M PLUS Rounded 1c">
                        M PLUS Rounded 1c
                      </option>
                      <option value="Kosugi Maru">Kosugi Maru</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-400">
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </div>
                  </div>
                  <p className="text-xs text-slate-400">
                    動画内のテキストに使用するフォントを選択します
                  </p>
                </div>

                {/* Voice Over Selector */}
                <VoiceOverSelector
                  value={settings.voiceOver || "lhTvHflPVOqgSWyuWQry"}
                  onChange={(value) => updateSetting("voiceOver", value)}
                />

                {/* BGM */}
                <BGMSelector
                  value={settings.selectedBgm}
                  onChange={(value) => updateSetting("selectedBgm", value)}
                />

                {/* Template - Coming Soon */}
                <TemplateSelector
                  value={settings.template}
                  onChange={(value) => updateSetting("template", value)}
                />
              </div>

              {/* Preview */}
              <LivePreview
                orientation={settings.orientation}
                template={settings.template}
                backgroundColor={settings.backgroundColor}
                ctaTextColor={settings.ctaTextColor}
                font={settings.font}
                logoUrl={logoUrl}
                onOrientationChange={(value) =>
                  updateSetting("orientation", value)
                }
                backgroundImageUrl={bgImageUrl}
                hookImage={previewHookImage}
                bodyImage={previewBodyImage}
                hookText={previewHookText}
                bodyText={previewBodyText}
                ctaText={previewCtaText}
              />
            </div>
          </div>
        </div>

        {/* Error Message */}
        {renderError && (
          <div className="mt-4 max-w-md bg-red-50 border border-red-200 rounded-lg p-4 shadow-sm">
            <p className="text-red-700 text-sm font-medium">{renderError}</p>
            <button
              onClick={() => setRenderError(null)}
              className="mt-2 text-red-600 hover:text-red-800 text-xs underline"
            >
              閉じる
            </button>
          </div>
        )}

        {/* Navigation */}
        <div className="mt-8 mb-8 flex items-center justify-end gap-4">
          <button
            onClick={onBack}
            className="px-6 py-2.5 rounded-lg text-slate-500 font-semibold hover:text-slate-800 hover:bg-white/80 text-sm transition-colors"
          >
            戻る
          </button>
          <button
            onClick={onSubmit}
            disabled={loading}
            className="bg-[#0093b4] hover:bg-[#007a92] text-white px-8 py-2.5 rounded-lg font-semibold shadow-sm transition-all flex items-center gap-2 text-sm disabled:opacity-50"
          >
            {loading ? (
              <>
                <Spinner className="w-4 h-4" /> {submitProgress.percent}%{" "}
                {submitProgress.status.replace(/_/g, " ")}
              </>
            ) : (
              <>
                次に進む
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </div>
      </main>
    </>
  );
};

export default Step4New;
