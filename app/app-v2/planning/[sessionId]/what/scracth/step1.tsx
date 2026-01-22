import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import React from "react";
import { useParams } from "next/navigation";
import { submitStep1Scratch } from "../hooks/useFetchAPINext";
import { Card, PageHeader, URLInput } from "@/components/lp-analyzer";
import { ArrowRight } from "lucide-react";
import { usePlanningWhatDataContext } from "../hooks/planningWhatDataContext";

const Step1Scratch = ({ onNext }: { onNext: () => void }) => {
  const { sessionId } = useParams();
  const [loading, setLoading] = React.useState(false);
  const [url, setUrl] = React.useState("");
  const { onSetKeywords } = usePlanningWhatDataContext();

  return (
    <div className="flex-1 w-full max-w-6xl mx-auto px-4 py-12 md:px-8 flex flex-col justify-center h-full items-start">
      <PageHeader title="自社LPのURL入力" />
      <div className="w-full">
        <div className="flex flex-col gap-8">
          {/* card */}
          <Card variant="elevated" className="w-full">
            <URLInput
              id="lp-url"
              name="lp-url"
              label="あなたのプロダクトやサービスのLPのurlを入力してください"
              placeholder="https://example.com/your-landing-page"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              error={""}
            />

            <div className="flex justify-end mt-10 gap-4">
              <Button
                variant={"secondary"}
                className="bg-gray-50 text-gray-500"
                size={"lg"}
              >
                戻る
              </Button>
              <Button
                className="bg-cyan-600 hover:bg-cyan-700"
                size={"lg"}
                disabled={loading || !url}
                onClick={() =>
                  submitStep1Scratch({
                    url,
                    onSetKeywords,
                    onNext,
                    setLoading,
                    sessionId: sessionId as string,
                  })
                }
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

export default Step1Scratch;
