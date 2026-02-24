import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { LoadingOverlay } from "@/components/ui/loading-overlay";
import React from "react";
import { submitStep2Scratch, regenerateKeywords } from "../hooks/useFetchAPINext";
import { useParams } from "next/navigation";
import { Card, KeywordSelector, PageHeader } from "@/components/lp-analyzer";
import { ArrowRight, RefreshCw } from "lucide-react";
import { usePlanningWhatDataContext } from "../hooks/planningWhatDataContext";

const Step2Scratch = ({ onNext, onPrev }: { onNext: () => void; onPrev?: () => void }) => {
  const [loading, setLoading] = React.useState(false);
  const [regenerating, setRegenerating] = React.useState(false);
  const { sessionId } = useParams();
  const { keywords, selectedKeywords, onSetSelectedKeywords, onSetKeyVisuals, onSetKeywords } =
    usePlanningWhatDataContext();

  const handleKeywordEdit = (index: number, newValue: string) => {
    const updatedKeywords = [...keywords];
    updatedKeywords[index] = { ...updatedKeywords[index], term: newValue };
    onSetKeywords(updatedKeywords);
    // If the edited keyword was selected, update selection
    if (selectedKeywords === keywords[index].term) {
      onSetSelectedKeywords(newValue);
    }
  };

  const handleRegenerate = () => {
    const productUrl = localStorage.getItem("planning_what_product_url") || "";
    if (!productUrl) {
      console.error("No product URL found");
      return;
    }
    regenerateKeywords({
      sessionId: sessionId as string,
      product: productUrl,
      onSetKeywords,
      setLoading: setRegenerating,
    });
    onSetSelectedKeywords(""); // Clear selection when regenerating
  };

  const getLoadingMessage = () => {
    if (loading) return "キービジュアルを取得中...";
    if (regenerating) return "キーワードを再生成中...";
    return "処理中...";
  };

  return (
    <>
      {/* Loading Overlay */}
      <LoadingOverlay
        isVisible={loading || regenerating}
        progress={50}
        message={getLoadingMessage()}
        showProgress={false}
      />

      <div className="flex-1 w-full max-w-[1400px] mx-auto px-6 py-4 flex flex-col h-full items-start">
      <div className="mb-4 animate-fade-in-up">
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight mb-2 text-slate-800">
          キーワード選択
        </h1>
        <p className="text-slate-500 text-base">
          あなたのプロダクトやサービスに最適なキーワードを選んで、分析の方向性を定めましょう
        </p>
      </div>
      <div className="w-full">
        <Card variant="elevated" className="w-full bg-white rounded-xl border border-slate-200 shadow-sm p-6">
          <div className="flex justify-end mb-4">
            <Button
              variant="outline"
              size="sm"
              onClick={handleRegenerate}
              disabled={regenerating || loading}
              className="text-[#0093b4] border-[#0093b4] hover:bg-cyan-50"
            >
              <RefreshCw className={`h-4 w-4 mr-2 ${regenerating ? "animate-spin" : ""}`} />
              {regenerating ? "再生成中..." : "キーワードを再生成"}
            </Button>
          </div>
          <KeywordSelector
            keywords={keywords}
            selectedKeywords={selectedKeywords}
            onSelectionChange={(value) => onSetSelectedKeywords(value)}
            onKeywordEdit={handleKeywordEdit}
            label="あなたのプロダクト/サービスに当てはまるキーワードを選択してください"
          />
          <div className="flex justify-end mt-10 pt-6 border-t border-slate-100 gap-4">
            <Button
              variant={"secondary"}
              className="px-6 py-2.5 rounded-lg text-slate-500 font-semibold hover:text-slate-800 hover:bg-slate-100"
              onClick={onPrev}
              disabled={loading || regenerating}
            >
              戻る
            </Button>
            <Button
              className="bg-[#0093b4] hover:bg-[#007a92] px-8 py-2.5 rounded-lg font-semibold shadow-sm"
              disabled={loading || regenerating || !selectedKeywords}
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
    </>
  );
};

export default Step2Scratch;
