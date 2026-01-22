"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { getSessionId } from "./hooks/fetchAPI";
import { Card, PageHeader, RadioCard } from "@/components/lp-analyzer";
import { ArrowRight, Link, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";

const SwitchPage = () => {
  const [loading, setLoading] = React.useState(false);
  const router = useRouter();
  const [selectedMethod, setSelectedMethod] = React.useState<string | null>(
    null
  );

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
              <RadioCard
                name="research_method"
                value="search"
                icon={<Search />}
                title="競合他社の調査を始める"
                description="キーワードや業界から、リサーチすべき競合LPを探します。"
                checked={selectedMethod === "what_scratch"}
                onChange={(value) => {
                  setSelectedMethod("what_scratch");
                }}
              />

              <RadioCard
                name="research_method"
                value="url"
                icon={<Link />}
                title={
                  <span>
                    調査したい競合3社の
                    <br />
                    LPのURLをすでにご存じの方`
                  </span>
                }
                description="直接URLを入力して、すぐに分析を開始します。"
                checked={selectedMethod === "what_skip"}
                onChange={(value) => {
                  setSelectedMethod("what_skip");
                }}
              />
            </div>

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
                disabled={!selectedMethod || loading}
                onClick={() =>
                  getSessionId({
                    page: selectedMethod || "",
                    setLoading,
                    router,
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

export default SwitchPage;
