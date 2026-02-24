"use client";
import React, { useEffect } from "react";
import { useParams } from "next/navigation";
import { ArrowRight, Link, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import callApi from "@/config/axios/axios";
import { usePlannningContext } from "../../../../plannningContext";
import { Card } from "../../components/card";
import { RadioCard } from "../../components/RadioCard";
import { LoadingOverlay } from "@/components/ui/loading-overlay";

const AnalyticSelectPage = ({
  onBack,
  onNext,
}: {
  onBack: () => void;
  onNext: () => void;
}) => {
  const [submitting, setSubmitting] = React.useState(false);
  const [regenerating, setRegenerating] = React.useState(false);
  const [analyticSelection, setAnalyticSelection] = React.useState<
    "scratch" | "skip" | null
  >(null);
  const { sessionId } = useParams();
  const { onSetWhatType } = usePlannningContext();

  const onSubmitSelection = async () => {
    try {
      setSubmitting(true);
      const { data } = await callApi.post(
        "/app-v3/projects/session/analytics-selection",
        {
          analyticsSelection: analyticSelection,
          sessionId,
        },
      );

      if (analyticSelection === "scratch") {
        onSetWhatType("scratch");
      } else if (analyticSelection === "skip") {
        onSetWhatType("skip");
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
        "/app-v3/projects/session/analytics-selection/fetch",
        {
          sessionId,
        },
      );

      if (data) {
        if (data.isHavingCompetitorUrls === true) {
          setAnalyticSelection("skip");
        } else {
          setAnalyticSelection("scratch");
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
        message="選択を保存中..."
        showProgress={false}
      />
      <div className="flex-1 w-full max-w-6xl mx-auto px-4 py-12 md:px-8 flex flex-col justify-center h-full items-start">
        <div className="mb-10">
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight mb-2 text-slate-800">
            2. ベンチマーク調査モード選択
          </h1>
          <p className="text-black text-lg">
            以下​どちらかを​選択してください​
          </p>
        </div>
        <div className="w-full">
          <div className="flex flex-col gap-8">
            {/* card */}
            <Card variant="elevated" className="w-full">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 h-full">
                <RadioCard
                  name="scratch_method"
                  value="scratch"
                  icon={<Search />}
                  title="競合他社の調査を始める"
                  description=""
                  checked={analyticSelection === "scratch"}
                  onChange={(value) => {
                    setAnalyticSelection("scratch");
                  }}
                />

                <RadioCard
                  name="skip_method"
                  value="skip"
                  icon={<Link />}
                  title={
                    <span>
                      調査したい競合3社の
                      <br />
                      LPのURLをすでにご存じの方`
                    </span>
                  }
                  description=""
                  checked={analyticSelection === "skip"}
                  onChange={(value) => {
                    setAnalyticSelection("skip");
                  }}
                />
              </div>

              <div className="flex justify-end mt-10 gap-4">
                <Button
                  variant={"secondary"}
                  className="bg-gray-50 text-gray-500"
                  size={"lg"}
                  onClick={onBack}
                >
                  戻る
                </Button>
                <Button
                  className="bg-cyan-600 hover:bg-cyan-700"
                  size={"lg"}
                  disabled={!analyticSelection || submitting}
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

export default AnalyticSelectPage;
