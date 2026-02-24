import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { LoadingOverlay } from "@/components/ui/loading-overlay";
import React from "react";
import { useParams, useRouter } from "next/navigation";
import { submitStep1Scratch } from "../hooks/useFetchAPINext";
import { Card, PageHeader, URLInput } from "@/components/lp-analyzer";
import { ArrowRight } from "lucide-react";
import { usePlanningWhatDataContext } from "../hooks/planningWhatDataContext";

const Step1Scratch = ({ onNext }: { onNext: () => void }) => {
  const { sessionId } = useParams();
  const router = useRouter();
  const [loading, setLoading] = React.useState(false);
  const [url, setUrl] = React.useState("");
  const { onSetKeywords } = usePlanningWhatDataContext();

  return (
    <>
      {/* Loading Overlay */}
      <LoadingOverlay
        isVisible={loading}
        progress={50}
        message="LPを分析中..."
        showProgress={false}
      />

      <div className="flex-1 w-full max-w-[1400px] mx-auto px-6 py-4 flex flex-col h-full items-start">
      <div className="mb-4 animate-fade-in-up">
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight mb-2 text-slate-800">
          自社LPのURL入力
        </h1>
        <p className="text-slate-500 text-base">
          分析対象となるランディングページのURLを入力してください
        </p>
      </div>
      <div className="w-full">
        <Card variant="elevated" className="w-full bg-white rounded-xl border border-slate-200 shadow-sm p-6">
          <URLInput
            id="lp-url"
            name="lp-url"
            label="あなたのプロダクトやサービスのLPのurlを入力してください"
            placeholder="https://example.com/your-landing-page"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            error={""}
          />

          <div className="flex justify-end mt-10 pt-6 border-t border-slate-100 gap-4">
            <Button
              variant={"secondary"}
              className="px-6 py-2.5 rounded-lg text-slate-500 font-semibold hover:text-slate-800 hover:bg-slate-100"
              onClick={() => router.push("/app-v2/projects")}
              disabled={loading}
            >
              戻る
            </Button>
            <Button
              className="bg-[#0093b4] hover:bg-[#007a92] px-8 py-2.5 rounded-lg font-semibold shadow-sm"
              disabled={loading || !url}
              onClick={() => {
                localStorage.setItem("planning_what_product_url", url);
                submitStep1Scratch({
                  url,
                  onSetKeywords,
                  onNext,
                  setLoading,
                  sessionId: sessionId as string,
                });
              }}
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
    </>
  );
};

export default Step1Scratch;
