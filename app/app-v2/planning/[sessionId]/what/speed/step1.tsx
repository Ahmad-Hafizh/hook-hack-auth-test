import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import React from "react";
import { useParams } from "next/navigation";
import { Card, URLInput } from "@/components/lp-analyzer";
import { ArrowRight } from "lucide-react";
import { usePlanningWhatDataContext } from "../hooks/planningWhatDataContext";

const Step1Speed = ({ onNext }: { onNext: () => void }) => {
  const { sessionId } = useParams();
  const [loading, setLoading] = React.useState(false);
  const [url, setUrl] = React.useState("");
  const { onSetKeywords } = usePlanningWhatDataContext();

  return (
    <div className="flex-1 w-full max-w-[1400px] mx-auto px-6 py-4 flex flex-col h-full items-start">
      <div className="mb-4 animate-fade-in-up">
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight mb-2 text-slate-800">
          自社LPのURL入力
        </h1>
        <p className="text-slate-500 text-base">
          スピードモードで素早く分析を開始します
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
            >
              戻る
            </Button>
            <Button
              className="bg-[#0093b4] hover:bg-[#007a92] px-8 py-2.5 rounded-lg font-semibold shadow-sm"
              disabled={loading || !url}
              onClick={() => console.log("Submit logic here")}
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
  );
};

export default Step1Speed;
