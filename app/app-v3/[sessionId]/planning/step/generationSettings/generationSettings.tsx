"use client";

import React, { useEffect, useState } from "react";
import { ArrowRight, SlidersHorizontal, AlertTriangle } from "lucide-react";
import UploadImageButton from "../../components/uploadImageButton";
import { LoadingOverlay } from "@/components/ui/loading-overlay";
import { Spinner } from "@/components/ui/spinner";
import { useParams, useRouter } from "next/navigation";
import callApi from "@/config/axios/axios";
import { usePlanningHowDataContext } from "../../context/planningHowDataContext";
import VoiceOverSelector from "./components/VoiceOverSelector";
import BGMSelector from "./components/BGMSelector";
import TemplateSelector from "./components/TemplateSelector";
import { ColorPicker } from "./components/ColorPicker";
import { OrientationSelector } from "./components/OrientationSelector";
import { LivePreview } from "./components/LivePreview";
import { errorToastCaller } from "../../components/toastCaller";

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
  "ノートブック",
  "画用紙",
  "ウォール",
  "ペーパー",
  "グラフィックス",
];

const BG_ITEMS: BgItem[] = [
  // ノートブック
  {
    url: "https://res.cloudinary.com/dp3zkpouo/image/upload/v1771305243/notebook_jai3im.png",
    name: "ノートブック クラシック",
    category: "ノートブック",
  },
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

export interface BGMOption {
  id: string;
  name: string;
  duration: string;
}

export type Orientation = "horizontal" | "vertical";
export type Template = "simple" | "dynamic" | "desc";

export interface DesignSettings {
  logo?: string;
  orientation: Orientation;
  backgroundColor: string;
  backgroundImage?: string;
  font: string;
  backgroundMusic: string;
  voiceOver?: string;
  template?: Template;
}

export const GenerationSettingsPage = ({
  onPrev,
  onNext,
  stepId,
}: {
  stepId?: number;
  onPrev: () => void;
  onNext: () => void;
}) => {
  const [dataRows, setDataRows] = useState<any[]>([]);
  const [settings, setSettings] = useState<DesignSettings>({
    logo: "",
    orientation: "horizontal",
    backgroundColor: "ffffff",
    backgroundImage: BG_ITEMS[0].url,
    font: "Kiwi Maru",
    backgroundMusic:
      "https://drive.google.com/uc?export=download&id=1Ze1KD3g7rTzlJRf73vBSyequdSU_yu39",
    voiceOver: "lhTvHflPVOqgSWyuWQry",
    template: "simple",
  });
  const { sessionId } = useParams();
  const router = useRouter();
  const [showCreditModal, setShowCreditModal] = useState(false);
  const [bgTab, setBgTab] = useState<BgCategory>("ノートブック");
  const [submitProgress, setSubmitProgress] = useState({
    percent: 0,
    status: "",
  });

  const [submitting, setSubmitting] = useState<boolean>(false);
  const [jobId, setJobId] = useState<string>("");

  // Get first row's images and text for preview
  const firstRow = dataRows[0];
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
  };

  const [renderError, setRenderError] = useState<string | null>(null);

  const onSubmit = async () => {
    try {
      setSubmitting(true);

      // Credit check before generation
      const { data: creditData } = await callApi.get("/user/check-credit");
      if (!creditData.hasSufficientCredit) {
        setSubmitting(false);
        setShowCreditModal(true);
        return;
      }

      const { data } = await callApi.post("/app-v3/planning/how/step4", {
        sessionId,
        logo: settings.logo,
        background_music: settings.backgroundMusic,
        background_color: settings.backgroundColor,
        background_image: settings.backgroundImage,
        voice_over: settings.voiceOver,
        orientation: settings.orientation,
        font: settings.font,
      });

      // Step 4: Set job ID and start polling
      if (data.job_id) {
        setJobId(data.job_id);
        onNext();
      }
    } catch (error) {
      errorToastCaller(error);
      setRenderError("設定の保存に失敗しました。もう一度お試しください。");
    } finally {
      setSubmitting(false);
    }
  };

  const onRegenerate = async () => {
    try {
      const { data } = await callApi.post("/app-v3/planning/how/step4/fetch", {
        sessionId: sessionId,
      });

      if (data) {
        if (data.designSettings) {
          const ds = data.designSettings;
          setSettings({
            orientation: ds.orientation || "horizontal",
            backgroundColor: ds.background_color || "ffffff",
            backgroundImage: ds.background_image || BG_ITEMS[0].url,
            font: ds.font || "Noto Sans JP",
            backgroundMusic:
              ds.background_music ||
              "https://creatomate.com/files/assets/744d800a-221f-475e-a12a-3523a70756c4",

            voiceOver: ds.voice_over || "lhTvHflPVOqgSWyuWQry",
            logo: ds.logo || "",
          });
        }
        if (data.dataRows) {
          setDataRows(data.dataRows);
        }
      }
    } catch (error) {
      errorToastCaller(error);
    }
  };

  useEffect(() => {
    onRegenerate();
  }, []);

  return (
    <>
      {/* Loading Overlay */}
      <LoadingOverlay
        isVisible={submitting}
        message={"動画を生成中..."}
        showProgress={false}
      />

      <main className="flex-1 w-full max-w-[1600px] mx-auto px-6 py-4 pb-24">
        {/* Header */}
        <div className="mb-4">
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight mb-2 text-slate-800">
            {stepId || 11}. その他設定
          </h1>
          <p className="text-black text-lg">
            プレビュー画面を​確認しながら​設定を​行ってください​
          </p>
        </div>

        {/* Main Card */}
        <div className="w-full bg-white border border-slate-200 rounded-xl shadow-sm flex flex-col h-full">
          {/* <div className="p-5 border-b border-slate-200 bg-slate-50 rounded-t-xl flex justify-between items-center">
            <h2 className="font-semibold text-lg text-slate-800 flex items-center gap-2">
              <SlidersHorizontal className="w-5 h-5 text-[#0093b4]" />
              デザイン設定
            </h2>
          </div> */}

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
                    onUploadImage={(url: string) => updateSetting("logo", url)}
                    aspectRatio={1 / 1}
                    slot="logo"
                  >
                    <div className="w-full max-w-[200px] aspect-square bg-gray-50 border border-dashed border-gray-300 rounded-lg flex items-center justify-center relative overflow-hidden group hover:border-blue-400 transition-colors cursor-pointer">
                      {settings.logo ? (
                        <img
                          src={settings.logo}
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
                        const isSelected =
                          settings.backgroundImage === item.url;
                        return (
                          <div
                            key={item.url}
                            onClick={() =>
                              updateSetting("backgroundImage", item.url)
                            }
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
                              onChange={() =>
                                updateSetting("backgroundImage", item.url)
                              }
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
                  {/* <p className="text-xs text-slate-400">
                    動画内のテキストに使用するフォントを選択します
                  </p> */}
                </div>

                {/* Voice Over Selector */}
                <VoiceOverSelector
                  value={settings.voiceOver || "lhTvHflPVOqgSWyuWQry"}
                  onChange={(value) => updateSetting("voiceOver", value)}
                />

                {/* BGM */}
                <BGMSelector
                  value={settings.backgroundMusic}
                  onChange={(value) => updateSetting("backgroundMusic", value)}
                />

                {/* Template - Coming Soon
                <TemplateSelector
                  value={settings.template || "simple"}
                  onChange={(value) => updateSetting("template", value)}
                /> */}
              </div>
              {/* Preview */}
              <LivePreview
                orientation={settings.orientation}
                backgroundColor={settings.backgroundColor}
                font={settings.font}
                logoUrl={settings.logo}
                onOrientationChange={(value) =>
                  updateSetting("orientation", value)
                }
                backgroundImageUrl={settings.backgroundImage}
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
            onClick={onPrev}
            className="px-6 py-2.5 rounded-lg text-slate-500 font-semibold hover:text-slate-800 hover:bg-white/80 text-sm transition-colors"
          >
            戻る
          </button>
          <button
            onClick={onSubmit}
            disabled={submitting}
            className="bg-[#0093b4] hover:bg-[#007a92] text-white px-8 py-2.5 rounded-lg font-semibold shadow-sm transition-all flex items-center gap-2 text-sm disabled:opacity-50"
          >
            {submitting ? (
              <>
                <Spinner className="w-4 h-4" />{" "}
                {submitProgress.status.replace(/_/g, " ") || "送信中..."}
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

      {/* Credit Insufficient Modal */}
      {showCreditModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-xl shadow-2xl p-6 max-w-md w-full mx-4">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center">
                <AlertTriangle className="w-5 h-5 text-amber-600" />
              </div>
              <h3 className="text-lg font-bold text-slate-800">
                クレジットが不足しています
              </h3>
            </div>
            <p className="text-sm text-slate-600 mb-6">
              動画を生成するにはクレジットが必要です。クレジットを購入してから再度お試しください。
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowCreditModal(false)}
                className="px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
              >
                閉じる
              </button>
              <button
                onClick={() => {
                  setShowCreditModal(false);
                  router.push(
                    `/dashboard/credits?redirect=/app-v3/planning/${sessionId}`,
                  );
                }}
                className="px-4 py-2 text-sm font-medium text-white bg-[#0093b4] hover:bg-[#007a92] rounded-lg transition-colors"
              >
                クレジットを購入
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default GenerationSettingsPage;
