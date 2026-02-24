"use client";
import React, { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import { VideoDurationOption } from "./components/DurationCard";
import callApi from "@/config/axios/axios";
import { useParams } from "next/navigation";
import { LoadingOverlay } from "@/components/ui/loading-overlay";
import { usePlanningHowDataContext } from "../../context/planningHowDataContext";
import { DurationDropdown } from "./components/DurationDropdown";

const videoDurationOptions: VideoDurationOption[] = [
  {
    value: 15,
    title: "15秒動画",
    advantages: ["視聴完了率が高い", "短時間でメッセージを伝えやすい"],
    disadvantages: ["情報量が限定的", "複雑な訴求には不向き"],
  },
  {
    value: 30,
    title: "30秒動画",
    advantages: ["詳細な情報伝達が可能", "ブランドの世界観を表現しやすい"],
    disadvantages: ["視聴完了率が低い傾向", "制作コストが高い"],
  },
];

export const DurationSelectionPage = ({
  onPrev,
  onNext,
  stepId,
}: {
  stepId?: number;
  onPrev?: () => void;
  onNext: () => void;
}) => {
  const { duration, onSetDuration, onSetJobId } = usePlanningHowDataContext();
  const { sessionId } = useParams();
  const [submitting, setSubmitting] = useState(false);
  const [regenerating, setRegenerating] = useState(false);
  const [communicationStyle, setCommunicationStyle] = useState("formal");
  const [pointOfView, setPointOfView] = useState("first_person");

  const onSubmit = async () => {
    try {
      setSubmitting(true);
      const { data } = await callApi.post("/app-v3/planning/how/step1", {
        sessionId: sessionId,
        duration: duration,
        communicationStyle,
        pointOfView,
      });

      if (data.job_id) {
        onSetJobId(data.job_id);
        setSubmitting(false); // Hide loading overlay before navigation
        onNext();
      } else {
        console.error("No job_id returned from API");
        setSubmitting(false);
      }
    } catch (error) {
      console.log(error);
      setSubmitting(false); // Ensure loading is set to false on error
    } finally {
      setSubmitting(false);
    }
  };

  const onRegenerate = async () => {
    try {
      setRegenerating(true);
      const { data } = await callApi.post("/app-v3/planning/how/step1/fetch", {
        sessionId,
      });

      console.log(data);

      if (data) {
        if (data.duration) {
          onSetDuration(data.duration);
        }
        if (data.tone) {
          setCommunicationStyle(data.tone);
        }
        if (data.pointOfView) {
          setPointOfView(data.pointOfView);
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      setRegenerating(false);
    }
  };

  useEffect(() => {
    onRegenerate();
  }, []);

  if (regenerating) {
    return (
      <div className="flex justify-center items-center h-screen gap-4">
        <LoadingOverlay
          isVisible={true}
          message="前回の選択を読み込んでいます"
          showProgress={false}
        />
      </div>
    );
  }

  return (
    <>
      {/* Loading Overlay */}
      <LoadingOverlay
        isVisible={submitting}
        progress={50}
        message="コピー案を生成中..."
        showProgress={false}
      />

      <main className="flex-1 w-full max-w-5xl mx-auto px-6 py-4 flex flex-col">
        {/* Header */}
        <div className="mb-4 animate-fade-in-up">
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight mb-2 text-slate-800">
            {stepId || 9}. 動画尺・語り方選択
          </h1>
          <p className="text-black text-lg">
            動画の​尺と​語り方を​選択してください
          </p>
        </div>

        {/* Content Card */}
        <div className="w-full bg-white rounded-xl border border-slate-200 shadow-sm p-6">
          {/* Duration */}
          <div className="mb-6">
            <DurationDropdown
              duration={duration}
              onSetDuration={onSetDuration}
              options={videoDurationOptions}
            />
          </div>

          {/* Communication Style & Point of View */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-slate-500">
                語り手
              </label>
              <div className="relative">
                <select
                  className="w-full appearance-none bg-white border border-slate-200 text-slate-800 py-2.5 px-3 pr-10 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0093b4] focus:border-[#0093b4] text-sm cursor-pointer"
                  value={pointOfView}
                  onChange={(e) => setPointOfView(e.target.value)}
                >
                  <option value="first_person">
                    １人称​（例：​私/​私たち/当校/弊社など）​
                  </option>
                  <option value="second_person">
                    ２人称​（例：お子様、​飼い​主様、​オーナー様、​転職希望者など）
                  </option>
                  <option value="third_person">
                    ３人称​（例：利用者/合格者/導入企業など）
                  </option>
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
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-slate-500">
                語り口
              </label>
              <div className="relative">
                <select
                  className="w-full appearance-none bg-white border border-slate-200 text-slate-800 py-2.5 px-3 pr-10 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0093b4] focus:border-[#0093b4] text-sm cursor-pointer"
                  value={communicationStyle}
                  onChange={(e) => setCommunicationStyle(e.target.value)}
                >
                  <option value="formal">
                    丁寧​（例：です/ます/〜できます）​
                  </option>
                  <option value="communicative">
                    フレンドリー​（例：だよ/じゃん​/〜してみて）
                  </option>
                  <option value="neutral">
                    常体​（例：だ/〜である​/〜しが​ち）
                  </option>
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
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-end gap-4 mt-10 pt-6 border-t border-slate-100">
            <button
              onClick={onPrev}
              className="px-6 py-2.5 rounded-lg text-sm font-semibold text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-all"
            >
              戻る
            </button>
            <button
              onClick={onSubmit}
              disabled={submitting}
              className="px-8 py-2.5 rounded-lg text-sm font-semibold text-white bg-[#0093b4] hover:bg-[#007a92] transition-all shadow-sm flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span>次へ進む</span>
              <ArrowRight className="w-4 h-4 text-white" />
            </button>
          </div>
        </div>
      </main>
    </>
  );
};

export default DurationSelectionPage;
