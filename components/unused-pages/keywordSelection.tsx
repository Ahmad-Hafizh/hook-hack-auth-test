import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import React, { useEffect } from "react";

import { redirect, useParams } from "next/navigation";
import { LoadingOverlay } from "@/components/ui/loading-overlay";

import { Card, KeywordSelector, PageHeader } from "@/components/lp-analyzer";
import { ArrowRight, RefreshCw } from "lucide-react";
import callApi from "@/config/axios/axios";
import { usePlanningWhatDataContext } from "@/app/app-v3/[sessionId]/planning/context/planningWhatDataContext";

const KeywordSelectionPage = ({
  onNext,
  onPrev,
}: {
  onNext: () => void;
  onPrev?: () => void;
}) => {
  const [loading, setLoading] = React.useState(false);
  const [regenerating, setRegenerating] = React.useState(false);
  const [generatingMore, setGeneratingMore] = React.useState(false);
  const { sessionId } = useParams();
  const {
    keywords,
    selectedKeywords,
    onSetSelectedKeywords,
    onSetKeyVisuals,
    onSetKeywords,
  } = usePlanningWhatDataContext();

  const onSubmit = async () => {
    try {
      setLoading(true);
      const { data, statusText } = await callApi.post(
        "/app-v2/planning/what/step2",
        {
          selectedKeywords,
          sessionId,
          keywords,
        },
      );

      sessionStorage.setItem(
        "selectedKeywords",
        JSON.stringify(selectedKeywords),
      );
      sessionStorage.setItem("keywords", JSON.stringify(keywords));
      sessionStorage.setItem("keyVisuals", JSON.stringify(data.key_visuals));

      onSetKeyVisuals(data.key_visuals);
      onNext();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const onRegenerate = async () => {
    try {
      setRegenerating(true);
      const { data } = await callApi.post("/app-v2/planning/what/step2/fetch", {
        sessionId,
      });

      console.log(data.keywords);
      if (data.keywords) {
        onSetKeywords(data.keywords);
        onSetSelectedKeywords(data.selected_keyword);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setRegenerating(false);
    }
  };

  const handleKeywordEdit = (index: number, newValue: string) => {
    const updatedKeywords = [...keywords];
    updatedKeywords[index] = { ...updatedKeywords[index], term: newValue };
    onSetKeywords(updatedKeywords);
    // If the edited keyword was selected, update selection
    if (selectedKeywords === keywords[index].term) {
      onSetSelectedKeywords(newValue);
    }
  };

  const handleGenerateMore = async () => {
    try {
      setGeneratingMore(true);
      const { data } = await callApi.post(
        "/app-v2/planning/what/step2/generate",
        {
          sessionId,
          excludeKeywords: keywords.map((k) => k.term),
        },
      );

      onSetKeywords([...keywords, ...data.keywords]);
    } catch (error) {
      console.log(error);
    } finally {
      setGeneratingMore(false);
    }
  };

  console.log(keywords);

  useEffect(() => {
    // If keywords are already in context, don't reload
    // if (!keywords[0]) return;

    // const keywordsSession = sessionStorage.getItem("keywords");
    // const selectedKeywordsSession = sessionStorage.getItem("selectedKeywords");

    // if (keywordsSession && selectedKeywordsSession) {
    //   const parsedKeywords = JSON.parse(keywordsSession);
    //   onSetKeywords(parsedKeywords);
    //   onSetSelectedKeywords(JSON.parse(selectedKeywordsSession));
    // }
    onRegenerate();
  }, []);

  if (regenerating) {
    return (
      <div className="flex-1 w-full max-w-6xl mx-auto px-4 py-12 md:px-8 flex flex-col justify-center h-full items-center">
        <Spinner className="h-8 w-8 text-cyan-600" />
        <p className="mt-4 text-gray-600">キーワードを再生成中...</p>
      </div>
    );
  }
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
          <Card
            variant="elevated"
            className="w-full bg-white rounded-xl border border-slate-200 shadow-sm p-6"
          >
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
                onClick={onSubmit}
              >
                次に進む <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </>
  );
};

export default KeywordSelectionPage;
