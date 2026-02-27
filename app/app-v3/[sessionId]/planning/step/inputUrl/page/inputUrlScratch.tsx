import { Button } from "@/components/ui/button";
import React, { useEffect } from "react";
import { useParams } from "next/navigation";
import { LoadingOverlay } from "@/components/ui/loading-overlay";
import { URLInput } from "../components/URLInput";
import { ArrowRight } from "lucide-react";
import { usePlanningWhatDataContext } from "../../../context/planningWhatDataContext";
import callApi from "@/config/axios/axios";
import { Card } from "../../../components/card";
import { toast } from "sonner";
import { errorToastCaller } from "../../../components/toastCaller";

const InputUrlScratchPage = ({
  onNext,
  onPrev,
}: {
  onNext: () => void;
  onPrev: () => void;
}) => {
  const { sessionId } = useParams();
  const [productUrl, setProductUrl] = React.useState("");
  const { onSetCandidates, candidates } = usePlanningWhatDataContext();
  const [regenerating, setRegenerating] = React.useState(false);
  const [submitting, setSubmitting] = React.useState(false);
  const [sseMessage, setSseMessage] = React.useState("");

  const onSubmitSSE = async () => {
    try {
      setSubmitting(true);

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/app-v3/planning/what/step1/sse`,
        {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            product: productUrl,
            sessionId,
            step: 3,
          }),
        },
      );
      const reader = response.body?.getReader();
      const decoder = new TextDecoder("utf-8");
      let buffer = "";

      while (true) {
        const { done, value } = await reader!.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        buffer += chunk;

        const lines = buffer.split("\n");
        buffer = lines.pop() || "";

        for (const line of lines) {
          if (line.trim().startsWith("data: ")) {
            try {
              const jsonData = JSON.parse(line.substring(6));

              if (jsonData.stage && jsonData.message) {
                setSseMessage(jsonData.message);
              }

              if (jsonData.candidates) {
                onSetCandidates(jsonData.candidates);
              }

              if (jsonData.status === "completed") {
                onNext();
              }
            } catch (e) {
              console.error("Failed to parse JSON:", line, e);
            }
          }
        }
      }

      // Process remaining buffer
      if (buffer.trim().startsWith("data: ")) {
        try {
          const jsonData = JSON.parse(buffer.substring(6));

          console.log(jsonData);

          if (jsonData.desire_tobes) {
            try {
              // onNext();
            } catch (error) {
              console.log(error);
            }
          }
        } catch (e) {
          console.error("Failed to parse final JSON:", buffer, e);
        }
      }
    } catch (error) {
      console.log(error);
      errorToastCaller(error);
    } finally {
      setSubmitting(false);
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
    } catch (error: any) {
      errorToastCaller(error);
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
      {/* Loading Overlay */}
      <LoadingOverlay
        isVisible={submitting}
        progress={50}
        message={sseMessage || "LPを分析中..."}
        showProgress={false}
      />

      <div className="flex-1 w-full max-w-[1400px] mx-auto px-6 py-4 flex flex-col h-full items-start">
        <div className="mb-4 animate-fade-in-up mt-5">
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight mb-2 text-slate-800">
            3. 自社LP URL入力
          </h1>
          <p className="text-black text-lg">
            プロダクトや サービスの LPの URLを 入力してください
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
              label=""
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
                disabled={submitting || regenerating || !productUrl}
                onClick={onSubmitSSE}
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

export default InputUrlScratchPage;
