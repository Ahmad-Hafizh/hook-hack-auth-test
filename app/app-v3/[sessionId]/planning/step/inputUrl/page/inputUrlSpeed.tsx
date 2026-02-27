import { Button } from "@/components/ui/button";
import React, { useEffect } from "react";
import { useParams } from "next/navigation";
import { LoadingOverlay } from "@/components/ui/loading-overlay";
import { URLInput } from "../components/URLInput";
import { ArrowRight } from "lucide-react";
import { usePlanningWhatDataContext } from "../../../context/planningWhatDataContext";
import callApi from "@/config/axios/axios";
import { Card } from "../../../components/card";
import { errorToastCaller } from "../../../components/toastCaller";

const InputUrlSpeedPage = ({
  onNext,
  onPrev,
}: {
  onNext: () => void;
  onPrev: () => void;
}) => {
  const { sessionId } = useParams();
  const [loading, setLoading] = React.useState(false);
  const [productUrl, setProductUrl] = React.useState("");
  const { onSetCandidates } = usePlanningWhatDataContext();
  const [regenerating, setRegenerating] = React.useState(false);

  const onSubmit = async () => {
    try {
      setLoading(true);
      const { data } = await callApi.post("/app-v3/planning/what/step1/speed", {
        product: productUrl,
        sessionId,
      });

      onSetCandidates(data.candidates);
      onNext();
    } catch (error) {
      errorToastCaller(error);
    } finally {
      setLoading(false);
    }
  };

  const onRegenerate = async () => {
    try {
      setRegenerating(true);
      const { data } = await callApi.post("/app-v3/planning/what/step1/fetch", {
        sessionId,
      });

      if (data) {
        if (data.product) {
          setProductUrl(data.product);
        }
      }
    } catch (error) {
      errorToastCaller(error);
    } finally {
      setRegenerating(false);
    }
  };

  useEffect(() => {
    // if (productUrl) return;

    // const productUrlSession = sessionStorage.getItem("productUrl");
    // if (productUrlSession) {
    //   const parsedProductUrl = JSON.parse(productUrlSession);
    //   setProductUrl(parsedProductUrl);
    // } else {
    onRegenerate();
    // }
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
            2. 自社LPのURL入力
          </h1>
          <p className="text-slate-500 text-base">
            分析対象となるランディングページのURLを入力してください
          </p>
        </div>
        <div className="w-full">
          <Card
            variant="elevated"
            className="w-full bg-white rounded-xl border border-slate-200 shadow-sm p-6"
          >
            <URLInput
              id="lp-url"
              name="lp-url"
              label="あなたのプロダクトやサービスのLPのurlを入力してください"
              placeholder="https://example.com/your-landing-page"
              value={productUrl}
              onChange={(e) => setProductUrl(e.target.value)}
              error={""}
            />

            <div className="flex justify-end mt-10 pt-6 border-t border-slate-100 gap-4">
              <Button
                variant={"secondary"}
                className="px-6 py-2.5 rounded-lg text-slate-500 font-semibold hover:text-slate-800 hover:bg-slate-100"
                onClick={onPrev}
              >
                戻る
              </Button>
              <Button
                className="bg-[#0093b4] hover:bg-[#007a92] px-8 py-2.5 rounded-lg font-semibold shadow-sm"
                disabled={loading || !productUrl}
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

export default InputUrlSpeedPage;
