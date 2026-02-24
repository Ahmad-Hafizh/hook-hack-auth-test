"use client";

import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { ArrowRight, ArrowLeft } from "lucide-react";
import React, { useState } from "react";
import { useParams, useRouter } from "next/navigation";

const Step1Skip = ({
  onNext,
  onBack,
}: {
  onNext: () => void;
  onBack?: () => void;
}) => {
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const [userUrl, setUserUrl] = useState("");
  const [competitor1, setCompetitor1] = useState("");
  const [competitor2, setCompetitor2] = useState("");
  const [competitor3, setCompetitor3] = useState("");
  const { sessionId } = useParams();
  const router = useRouter();

  const handleSubmit = () => {
    const competitorUrls = [competitor1, competitor2, competitor3].filter(
      (url) => url.trim() !== "",
    );
  };

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      router.push("/app-v2/projects");
    }
  };

  return (
    <main className="flex-1 w-full max-w-5xl mx-auto px-4 py-12 md:px-8 flex flex-col justify-center">
      <div className="mb-10 animate-fade-in-up">
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight mb-3 text-slate-800">
          自社LPと競合LPのURL入力
        </h1>
      </div>

      <div className="w-full">
        <div className="flex flex-col gap-8">
          <div className="bg-white rounded-xl p-8 md:p-12 shadow-sm border border-slate-200 animate-fade-in-up min-h-[400px] flex flex-col justify-between">
            <div className="flex-1 flex flex-col w-full max-w-3xl mx-auto gap-10 justify-start">
              {/* 自社LP情報 */}
              <section className="flex flex-col gap-3">
                <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2 px-1">
                  自社LP情報
                </h2>
                <div className="w-full p-6 border border-slate-200 rounded-xl bg-slate-50/30">
                  <div className="w-full">
                    <label
                      className="block text-sm font-bold text-slate-800 mb-2"
                      htmlFor="lp-url"
                    >
                      あなたのプロダクトやサービスのLPのURLを入力してください
                    </label>
                    <div className="relative w-full">
                      <input
                        className="block w-full px-4 py-4 text-base text-slate-800 bg-slate-50 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#0093b4] focus:border-[#0093b4] transition-all placeholder-slate-400"
                        id="lp-url"
                        name="lp-url"
                        placeholder="https://example.com/your-landing-page"
                        type="url"
                        value={userUrl}
                        onChange={(e) => setUserUrl(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </section>

              {/* 競合LP情報 */}
              <section className="flex flex-col gap-3">
                <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2 px-1">
                  競合LP情報
                </h2>
                <div className="w-full p-6 border border-slate-200 rounded-xl bg-slate-50/30 flex flex-col gap-6">
                  <div className="w-full">
                    <label
                      className="block text-sm font-bold text-slate-800 mb-2"
                      htmlFor="competitor-1"
                    >
                      競合1社のLPのURLを入力してください
                    </label>
                    <div className="relative w-full">
                      <input
                        className="block w-full px-4 py-4 text-base text-slate-800 bg-slate-50 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#0093b4] focus:border-[#0093b4] transition-all placeholder-slate-400"
                        id="competitor-1"
                        name="competitor-1"
                        placeholder="https://example.com/competitor-1"
                        type="url"
                        value={competitor1}
                        onChange={(e) => setCompetitor1(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="w-full">
                    <label
                      className="block text-sm font-bold text-slate-800 mb-2"
                      htmlFor="competitor-2"
                    >
                      競合2社のLPのURLを入力してください
                    </label>
                    <div className="relative w-full">
                      <input
                        className="block w-full px-4 py-4 text-base text-slate-800 bg-slate-50 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#0093b4] focus:border-[#0093b4] transition-all placeholder-slate-400"
                        id="competitor-2"
                        name="competitor-2"
                        placeholder="https://example.com/competitor-2"
                        type="url"
                        value={competitor2}
                        onChange={(e) => setCompetitor2(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="w-full">
                    <label
                      className="block text-sm font-bold text-slate-800 mb-2"
                      htmlFor="competitor-3"
                    >
                      競合3社のLPのURLを入力してください
                    </label>
                    <div className="relative w-full">
                      <input
                        className="block w-full px-4 py-4 text-base text-slate-800 bg-slate-50 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#0093b4] focus:border-[#0093b4] transition-all placeholder-slate-400"
                        id="competitor-3"
                        name="competitor-3"
                        placeholder="https://example.com/competitor-3"
                        type="url"
                        value={competitor3}
                        onChange={(e) => setCompetitor3(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </section>
            </div>

            {/* Navigation buttons */}
            <div className="flex flex-col-reverse sm:flex-row items-center justify-end gap-4 mt-12 w-full">
              <div className="flex-1"></div>
              <button
                onClick={handleBack}
                className="px-6 py-3 rounded-lg text-sm font-bold text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-all flex items-center justify-center"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                戻る
              </button>
              <button
                onClick={handleSubmit}
                disabled={loadingSubmit || !userUrl}
                className="w-full sm:w-auto px-10 py-3 rounded-lg text-sm font-bold text-white bg-[#0093b4] hover:bg-[#007a92] transition-all shadow-lg shadow-[#0093b4]/20 flex items-center justify-center gap-2 group disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loadingSubmit ? (
                  <>
                    <Spinner className="w-4 h-4" />
                    <span>分析中...</span>
                  </>
                ) : (
                  <>
                    <span>次へ進む</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Step1Skip;
