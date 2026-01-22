import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import React from "react";
import { submitStep2Scratch } from "../hooks/useFetchAPINext";
import { useParams } from "next/navigation";
import { Card, KeywordSelector, PageHeader } from "@/components/lp-analyzer";
import { ArrowRight } from "lucide-react";
import { usePlanningWhatDataContext } from "../hooks/planningWhatDataContext";

const Step2Scratch = ({ onNext }: { onNext: () => void }) => {
  const [loading, setLoading] = React.useState(false);
  const { sessionId } = useParams();
  const { keywords, selectedKeywords, onSetSelectedKeywords, onSetKeyVisuals } =
    usePlanningWhatDataContext();

  return (
    <div className="flex-1 w-full max-w-6xl mx-auto px-4 py-12 md:px-8 flex flex-col justify-center h-full items-start">
      <PageHeader
        title="キーワード選択"
        description="あなたのプロダクトやサービスに最適なキーワードを選んで、分析の方向性を定めましょう。"
      />
      <div className="w-full">
        <div className="flex flex-col gap-8">
          {/* card */}
          <Card variant="elevated" className="w-full">
            <KeywordSelector
              keywords={keywords}
              selectedKeywords={selectedKeywords}
              onSelectionChange={(value) => onSetSelectedKeywords(value)}
              label="あなたのプロダクト/サービスに当てはまるキーワードを選択してください"
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
                disabled={loading || !selectedKeywords}
                onClick={() =>
                  submitStep2Scratch({
                    selectedKeywords,
                    onNext,
                    setLoading,
                    sessionId: sessionId as string,
                    onSetKeyVisuals,
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

export default Step2Scratch;
