"use client";
import React, { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowRight, Search, TextSearch, TimerReset } from "lucide-react";
import { Button } from "@/components/ui/button";
import { usePlannningContext } from "../../../../plannningContext";
import callApi from "@/config/axios/axios";
import LoadingOverlay from "@/components/ui/loading-overlay";
import { Card } from "../../components/card";
import { RadioCard } from "../../components/RadioCard";

const QualitySelectPage = ({ onNext }: { onNext: () => void }) => {
  const [submitting, setSubmitting] = React.useState(false);
  const [regenerating, setRegenerating] = React.useState(false);
  const router = useRouter();
  const [qualitySelection, setQualitySelection] = React.useState<string | null>(
    null,
  );
  const { sessionId } = useParams();
  const { onSetWhatType } = usePlannningContext();

  const onSubmitSelection = async () => {
    try {
      setSubmitting(true);
      const { data } = await callApi.post(
        "/app-v3/projects/session/quality-selection",
        {
          qualitySelection,
          sessionId,
        },
      );

      if (qualitySelection === "speed") {
        onSetWhatType("speed");
      } else {
        onSetWhatType("scratch");
      }
      onNext();
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitting(false);
    }
  };

  const onRegenerate = async () => {
    try {
      setRegenerating(true);
      const { data } = await callApi.post(
        "/app-v3/projects/session/quality-selection/fetch",
        {
          sessionId,
        },
      );

      if (data) {
        if (data.isChoosingSpeed) {
          setQualitySelection("speed");
        } else {
          setQualitySelection("quality");
        }
      }
      // Handle regeneration response if needed
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
          message="データを取得中..."
          showProgress={false}
        />
      </div>
    );
  }

  return (
    <>
      <LoadingOverlay
        isVisible={submitting}
        progress={50}
        message="コピー案を生成中です"
        showProgress={false}
      />
      <div className="flex-1 w-full max-w-6xl mx-auto px-4 py-12 md:px-8 flex flex-col justify-center h-full items-start">
        <div className="mb-4 animate-fade-in-up">
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight mb-2 text-slate-800">
            1. コピー作成モード選択
          </h1>
          <p className="text-black text-lg">
            以下​どちらかを​選択してください。​
          </p>
        </div>
        <div className="w-full">
          <div className="flex flex-col gap-8">
            {/* card */}
            <Card variant="elevated" className="w-full">
              <div className="text-center mb-10">
                {/* <h3 className="text-lg md:text-xl font-bold text-text-main mb-2">
                  以下どちらかを選択してください test
                </h3> */}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 h-full">
                <RadioCard
                  name="research_method"
                  value="speed"
                  icon={<TimerReset />}
                  title={"スピード重視​（所要​時間：約5分）​"}
                  description={"LPの入力から、最適なコピーのバリエーション(how)を生成します。"}
                  checked={qualitySelection === "speed"}
                  onChange={(value) => {
                    setQualitySelection("speed");
                  }}
                />

                <RadioCard
                  name="research_method"
                  value="quality"
                  icon={<TextSearch />}
                  title={"精度​重視​（所​要​時間：​約15分）​"}
                  description="ベンチマーク分析から「誰に(who)」「何を(what)」「どのように(how)」を特定。より精度の高いコピーを作成します。"
                  checked={qualitySelection === "quality"}
                  onChange={(value) => {
                    setQualitySelection("quality");
                  }}
                />
              </div>

              <div className="flex justify-end mt-10 gap-4">
                <Button
                  variant={"secondary"}
                  className="bg-gray-50 text-gray-500"
                  size={"lg"}
                  onClick={() => router.back()}
                >
                  戻る
                </Button>
                <Button
                  className="bg-cyan-600 hover:bg-cyan-700"
                  size={"lg"}
                  disabled={!qualitySelection || submitting}
                  onClick={onSubmitSelection}
                >
                  次に進む <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};

export default QualitySelectPage;
