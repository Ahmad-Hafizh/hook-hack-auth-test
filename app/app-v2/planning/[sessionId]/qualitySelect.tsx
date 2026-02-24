"use client";
import React from "react";
import { useParams, useRouter } from "next/navigation";
import { Card, PageHeader, RadioCard } from "@/components/lp-analyzer";
import { ArrowRight, Search, TextSearch } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { usePlannningContext } from "../../plannningContext";
import callApi from "@/config/axios/axios";

const QualitySelectPage = ({
  onSetCurrentTab,
}: {
  onSetCurrentTab: () => void;
}) => {
  const [loading, setLoading] = React.useState(false);
  const router = useRouter();
  const [qualitySelection, setQualitySelection] = React.useState<string | null>(
    null,
  );
  const { sessionId } = useParams();
  const { onSetWhatType } = usePlannningContext();

  const onSubmitSelection = async () => {
    try {
      setLoading(true);
      const { data } = await callApi.post(
        "/app-v2/projects/session/quality-selection",
        {
          qualitySelection,
          sessionId,
        },
      );

      // Speed mode removed - only scratch and quality (skip) modes available
      if (qualitySelection === "scratch") {
        onSetWhatType("scratch");
        router.push(`/app-v2/planning/${data.sessionId}/what`);
      } else if (qualitySelection === "quality") {
        onSetWhatType("skip");
        onSetCurrentTab();
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex-1 w-full max-w-6xl mx-auto px-4 py-12 md:px-8 flex flex-col justify-center h-full items-start">
      <PageHeader title="競合他社調査の開始" />
      <div className="w-full">
        <div className="flex flex-col gap-8">
          {/* card */}
          <Card variant="elevated" className="w-full">
            <div className="text-center mb-10">
              <h3 className="text-lg md:text-xl font-bold text-text-main mb-2">
                以下どちらかを選択してください
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 h-full">
              {/* Speed mode commented out - quality mode only */}
              {/* <RadioCard
                name="research_method"
                value="speed"
                icon={<TimerIcon />}
                title="競合他社の調査を始める"
                description="キーワードや業界から、リサーチすべき競合LPを探します。"
                checked={qualitySelection === "speed"}
                onChange={(value) => {
                  setQualitySelection("speed");
                }}
              /> */}

              <RadioCard
                name="research_method"
                value="scratch"
                icon={<Search />}
                title="最初から始める"
                description="キーワードや業界から、リサーチすべき競合LPを探します。"
                checked={qualitySelection === "scratch"}
                onChange={(value) => {
                  setQualitySelection("scratch");
                }}
              />

              <RadioCard
                name="research_method"
                value="quality"
                icon={<TextSearch />}
                title={
                  <span>
                    調査したい競合3社の
                    <br />
                    LPのURLをすでにご存じの方
                  </span>
                }
                description="直接URLを入力して、すぐに分析を開始します。"
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
                disabled={!qualitySelection || loading}
                onClick={onSubmitSelection}
              >
                {loading ? (
                  <>
                    <Spinner className="h-4 w-4" />
                    読み込み中...
                  </>
                ) : (
                  <>
                    次に進む <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default QualitySelectPage;
