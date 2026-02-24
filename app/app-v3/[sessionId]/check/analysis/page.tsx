"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface AdAnalysis {
  name: string;
  h: string;
  b1: string;
  b2: string;
  c: string;
  ctr: string;
  cvr: string;
  hook: string;
  body1: string;
  body2: string;
  cta: string;
  hookImage?: string;
  body1Image?: string;
  body2Image?: string;
}

// Mock analysis data - only 5 items for demo
const mockAnalysisData: AdAnalysis[] = [
  { name: "広告1", h: "42%", b1: "35%", b2: "28%", c: "18%", ctr: "1.8%", cvr: "0.5%", hook: "30代男性の悩み、これ1本で解決？驚きのスカルプケア", body1: "専門家監修の独自成分で、あなたの頭皮環境を根本から改善。", body2: "利用者の90%が満足！「抜け毛が減った」と実感の声多数。", cta: "今すぐチェック" },
  { name: "広告2", h: "45%", b1: "38%", b2: "30%", c: "21%", ctr: "2.1%", cvr: "0.8%", hook: "「えっ、まだ高いシャンプー使ってるの？」賢い男の選択", body1: "厳選されたオーガニック成分が毛穴の奥まで浸透。", body2: "累計販売数100万本突破！30日間の全額返金保証付き。", cta: "詳細を見る" },
  { name: "広告3", h: "38%", b1: "32%", b2: "25%", c: "15%", ctr: "1.5%", cvr: "0.4%", hook: "美容師がこっそり教える、自宅でできる頭皮改革", body1: "独自のマイクロバブル処方で、こびりついた皮脂汚れをごっそり洗浄。", body2: "「もっと早く使えばよかった」リピート率95%が証明する信頼の品質。", cta: "公式サイトへ" },
  { name: "広告4", h: "40%", b1: "33%", b2: "22%", c: "12%", ctr: "1.2%", cvr: "0.3%", hook: "鏡を見るのが楽しみに. 新習慣で手に入れる自信。", body1: "毎日のシャンプーを変えるだけで、驚きのハリ・コシを実現。", body2: "科学的根拠に基づいた成分配合で、実感力が違います。", cta: "限定特典付" },
  { name: "広告5", h: "48%", b1: "41%", b2: "35%", c: "24%", ctr: "2.5%", cvr: "1.1%", hook: "【究極のケア】男の身だしなみは頭皮から。次世代シャンプー。", body1: "高濃度の栄養成分が、細くなった髪に力強さを与えます。", body2: "他社製品で満足できなかった方にこそ使ってほしい1本。", cta: "送料無料" },
];

const CheckAnalysisPage = () => {
  const router = useRouter();
  const [analysisData, setAnalysisData] = useState<AdAnalysis[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [sessionId, setSessionId] = useState<string | null>(null);

  useEffect(() => {
    // Get session ID from localStorage
    const storedSessionId = localStorage.getItem("checkSessionId");
    setSessionId(storedSessionId);

    const loadData = async () => {
      setIsLoading(true);
      try {
        // Get selected ads from sessionStorage
        const selectedAdsJson = sessionStorage.getItem("selectedAdsForCheck");
        if (!selectedAdsJson) {
          // If no selection, show mock data for demo
          setAnalysisData(mockAnalysisData);
        } else {
          // TODO: Fetch actual analysis data based on selected ads
          // const selectedAds = JSON.parse(selectedAdsJson);
          // const { data } = await callApi.post("/check/analyze", { ads: selectedAds });
          // setAnalysisData(data.analysis);

          // For now, use mock data
          await new Promise((resolve) => setTimeout(resolve, 500));
          setAnalysisData(mockAnalysisData);
        }
      } catch (error) {
        console.error("Error loading analysis data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  // Navigation handlers for roadmap buttons
  const handleNavigate = (step: string) => {
    if (sessionId) {
      // Store the restart point in localStorage
      localStorage.setItem("planningRestartFrom", step);
      router.push(`/app-v2/planning/${sessionId}/what`);
    } else {
      // No session, go to projects page
      router.push("/app-v2/projects");
    }
  };

  const handleGoHome = () => {
    router.push("/app-v2/projects");
  };

  const handleStartOver = () => {
    // Clear planning data and start fresh
    localStorage.removeItem("planningRestartFrom");
    if (sessionId) {
      router.push(`/app-v2/planning/${sessionId}/what`);
    } else {
      router.push("/app-v2/projects");
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f8fafc]">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-[#0093b4] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-slate-600">分析中...</p>
        </div>
      </div>
    );
  }

  return (
    <main className="w-full max-w-[1920px] mx-auto p-4 flex flex-col items-start gap-4 text-[#000000] bg-[#f8fafc] min-h-screen font-sans">
      {/* Header */}
      <div className="w-full flex items-center justify-between shrink-0">
        <div>
          <h1 className="text-xl font-bold text-slate-800">CHECK</h1>
        </div>
        <Link
          href="/app-v2/check"
          className="text-sm text-[#0093b4] hover:text-[#007a92] transition-colors"
        >
          広告選択に戻る
        </Link>
      </div>

      {/* Analysis & Actions Section */}
      <div className="w-full flex gap-4 shrink-0">
        {/* Analysis Card */}
        <div className="w-[280px] bg-white rounded-lg border border-slate-200 p-4 flex flex-col shrink-0">
          <h2 className="text-sm font-bold text-slate-700 mb-3">分析・示唆</h2>
          <div className="space-y-2">
            <div className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-[#0093b4] mt-1.5 shrink-0" />
              <p className="text-xs leading-relaxed text-slate-600">
                広告2はHook保持率が45%と高く、全体平均を上回っています。このDNAをベースにした展開を推奨します。
              </p>
            </div>
            <div className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-[#0093b4] mt-1.5 shrink-0" />
              <p className="text-xs leading-relaxed text-slate-600">
                CTA視聴維持率は良好ですが、CTRが低調です。
              </p>
            </div>
          </div>
        </div>

        {/* Actions Card */}
        <div className="flex-1 bg-white rounded-lg border border-slate-200 p-4 flex flex-col">
          <h2 className="text-sm font-bold text-slate-700 mb-3">次のアクション（制作ロードマップ）</h2>
          <div className="grid grid-cols-2 gap-6">
            {/* Step 1 */}
            <div className="flex flex-col">
              <div className="flex items-center gap-2 mb-3">
                <span className="w-5 h-5 rounded bg-slate-800 text-white text-xs flex items-center justify-center font-bold">1</span>
                <h3 className="text-xs font-bold text-slate-700">ステップ1: 戦略設計</h3>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <button onClick={() => handleNavigate("information")} className="px-3 py-1.5 text-xs border border-slate-200 rounded bg-white hover:bg-slate-50 text-slate-700 whitespace-nowrap">情報収集からやり直す</button>
                <button onClick={() => handleNavigate("competitor")} className="px-3 py-1.5 text-xs border border-slate-200 rounded bg-white hover:bg-slate-50 text-slate-700 whitespace-nowrap">競合分析からやり直す</button>
                <button onClick={() => handleNavigate("insight")} className="px-3 py-1.5 text-xs border border-slate-200 rounded bg-white hover:bg-slate-50 text-slate-700 whitespace-nowrap">インサイトからやり直す</button>
                <button onClick={() => handleNavigate("positioning")} className="px-3 py-1.5 text-xs border border-slate-200 rounded bg-white hover:bg-slate-50 text-slate-700 whitespace-nowrap">ポジショニングからやり直す</button>
              </div>
            </div>

            {/* Step 2 */}
            <div className="flex flex-col">
              <div className="flex items-center gap-2 mb-3">
                <span className="w-5 h-5 rounded bg-slate-800 text-white text-xs flex items-center justify-center font-bold">2</span>
                <h3 className="text-xs font-bold text-slate-700">ステップ2: クリエイティブ</h3>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <button onClick={() => handleNavigate("expression")} className="px-3 py-1.5 text-xs border border-slate-200 rounded bg-white hover:bg-slate-50 text-slate-700 whitespace-nowrap">表現プランからやり直す</button>
                <button onClick={() => handleNavigate("variation")} className="px-3 py-1.5 text-xs border border-slate-200 rounded bg-white hover:bg-slate-50 text-slate-700 whitespace-nowrap">バリエーション案からやり直す</button>
                <button onClick={() => handleNavigate("branding")} className="px-3 py-1.5 text-xs border border-slate-200 rounded bg-white hover:bg-slate-50 text-slate-700 whitespace-nowrap col-span-2">ブランディングからやり直す</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Data Table */}
      <div className="table-wrapper w-full bg-white rounded-lg border border-slate-200 shadow-sm overflow-visible relative isolate mb-8">
        <table className="w-full border-collapse text-[10px] table-fixed">
          <thead className="z-50 sticky top-0">
            <tr className="h-[54px] border-b border-slate-200">
              <th className="border-b border-r border-slate-200 text-[10px] font-bold text-white px-1 py-1.5 select-none whitespace-nowrap sticky top-0 z-50 leading-tight w-[45px] text-center p-0 border-l-0 bg-[#0093b4]">広告名</th>
              <th className="border-b border-r border-slate-200 text-[10px] font-bold text-white px-1 py-1.5 select-none whitespace-nowrap sticky top-0 z-50 leading-tight w-[40px] text-center text-[9px] bg-[#0093b4]">CTR</th>
              <th className="border-b border-r border-slate-200 text-[10px] font-bold text-white px-1 py-1.5 select-none whitespace-nowrap sticky top-0 z-50 leading-tight w-[40px] text-center text-[9px] bg-[#0093b4]">CVR</th>
              <th className="border-b border-r border-slate-200 text-[10px] font-bold text-slate-700 bg-blue-100 px-1 py-1.5 select-none whitespace-nowrap sticky top-0 z-50 leading-tight w-[45px] text-center p-0 text-[9px]">Hook<br/>維持率</th>
              <th className="border-b border-r border-slate-200 text-[10px] font-bold text-slate-700 bg-blue-100 px-1 py-1.5 select-none whitespace-nowrap sticky top-0 z-50 leading-tight w-[60px] text-center">Hook<br/>画像</th>
              <th className="border-b border-r border-slate-200 text-[10px] font-bold text-slate-700 bg-blue-100 px-1 py-1.5 select-none whitespace-nowrap sticky top-0 z-50 leading-tight w-[15%]">Hook メッセージ</th>
              <th className="border-b border-r border-slate-200 text-[10px] font-bold text-slate-700 bg-orange-100 px-1 py-1.5 select-none whitespace-nowrap sticky top-0 z-50 leading-tight w-[45px] text-center p-0 text-[9px]">Body1<br/>維持率</th>
              <th className="border-b border-r border-slate-200 text-[10px] font-bold text-slate-700 bg-orange-100 px-1 py-1.5 select-none whitespace-nowrap sticky top-0 z-50 leading-tight w-[60px] text-center">Body1<br/>画像</th>
              <th className="border-b border-r border-slate-200 text-[10px] font-bold text-slate-700 bg-orange-100 px-1 py-1.5 select-none whitespace-nowrap sticky top-0 z-50 leading-tight w-[15%]">Body1 メッセージ</th>
              <th className="border-b border-r border-slate-200 text-[10px] font-bold text-slate-700 bg-purple-100 px-1 py-1.5 select-none whitespace-nowrap sticky top-0 z-50 leading-tight w-[45px] text-center p-0 text-[9px]">Body2<br/>維持率</th>
              <th className="border-b border-r border-slate-200 text-[10px] font-bold text-slate-700 bg-purple-100 px-1 py-1.5 select-none whitespace-nowrap sticky top-0 z-50 leading-tight w-[60px] text-center">Body2<br/>画像</th>
              <th className="border-b border-r border-slate-200 text-[10px] font-bold text-slate-700 bg-purple-100 px-1 py-1.5 select-none whitespace-nowrap sticky top-0 z-50 leading-tight w-[15%]">Body2 メッセージ</th>
              <th className="border-b border-r border-slate-200 text-[10px] font-bold text-slate-700 bg-pink-100 px-1 py-1.5 select-none whitespace-nowrap sticky top-0 z-50 leading-tight w-[45px] text-center p-0 text-[9px]">CTA<br/>維持率</th>
              <th className="border-b border-slate-200 text-[10px] font-bold text-slate-700 bg-pink-100 px-1 py-1.5 select-none whitespace-nowrap sticky top-0 z-50 leading-tight w-[12%] border-r-0">CTA メッセージ</th>
            </tr>
          </thead>
          <tbody className="text-slate-700">
            {analysisData.map((row, index) => (
              <tr key={index} className="group h-[50px]">
                {/* Ad Name */}
                <td className="border-b border-r border-slate-200 relative p-0 transition-colors hover:bg-slate-50 bg-white align-middle text-center border-l-0">
                  <span className="font-mono text-xs font-bold text-slate-700">{row.name}</span>
                </td>

                {/* CTR - moved to left */}
                <td className="border-b border-r border-slate-200 relative p-0 transition-colors hover:bg-slate-50 bg-white align-middle text-center">
                  <span className="font-mono text-xs font-bold text-slate-700">{row.ctr}</span>
                </td>

                {/* CVR - moved to left */}
                <td className="border-b border-r border-slate-200 relative p-0 transition-colors hover:bg-slate-50 bg-white align-middle text-center">
                  <span className="font-mono text-xs font-bold text-slate-700">{row.cvr}</span>
                </td>

                {/* Hook Rate */}
                <td className="border-b border-r border-slate-200 relative p-0 transition-colors hover:bg-slate-50 bg-white align-middle text-center">
                  <span className="font-mono text-xs font-bold text-slate-700">{row.h}</span>
                </td>

                {/* Hook Image */}
                <td className="border-b border-r border-slate-200 relative p-0 transition-colors hover:bg-slate-50 bg-white">
                  <div className="w-full h-full p-1 flex flex-col items-center justify-center relative">
                    <div className={`w-10 h-10 rounded-sm border ${index === 0 ? 'border-gray-300 border-solid bg-white p-0.5' : 'border-dashed border-gray-400 bg-slate-50 hover:border-[#0093b4] hover:bg-blue-50/50'} flex items-center justify-center cursor-pointer transition-all text-gray-400 hover:text-[#0093b4] relative overflow-hidden group/img`}>
                      {index === 0 ? (
                        <img
                          alt="Selected"
                          className="w-full h-full object-cover"
                          src="https://lh3.googleusercontent.com/aida-public/AB6AXuAW9HnYOP1ZfD6GpB7A5iBYvYWr61_5P1VDkC7OwdOXbHq15-wgtrHERQc9n-h7smUGRcYJowbDnUaDJcLVKz4pRshQFebXeQWSqgvj0zKUF5eCmkiVoKsfF1kvz6WRnMNJYEcxxdNHga1PZCnxx-COTeMAqUw9blNYEIF5La6s5H89VDwXmwmP4ceezwh_brmP6pKFZyAcHhGQz1FL3Okjx22ChHqAumf24E5KPY93cBF5gKxtvzv13mD55dt5cR_Gnd0ik0XGLYuC"
                        />
                      ) : (
                        <span className="material-symbols-outlined text-lg group-hover/img:scale-110 transition-transform">add_photo_alternate</span>
                      )}
                      <div className="absolute inset-0 bg-black/0 group-hover/img:bg-black/10 transition-colors" />
                    </div>
                  </div>
                </td>

                {/* Hook Message */}
                <td className="border-b border-r border-slate-200 relative p-0 transition-colors hover:bg-slate-50 bg-white align-top">
                  <div className="flex h-full w-full relative">
                    <textarea
                      className="w-full h-full py-1 px-1.5 text-[10px] leading-tight bg-transparent border-none focus:ring-0 focus:outline-none resize-none transition-all text-slate-700 placeholder-gray-400"
                      defaultValue={row.hook}
                    />
                  </div>
                </td>

                {/* Body1 Rate */}
                <td className="border-b border-r border-slate-200 relative p-0 transition-colors hover:bg-slate-50 bg-white align-middle text-center">
                  <span className="font-mono text-xs font-bold text-slate-700">{row.b1}</span>
                </td>

                {/* Body1 Image */}
                <td className="border-b border-r border-slate-200 relative p-0 transition-colors hover:bg-slate-50 bg-white">
                  <div className="w-full h-full p-1 flex flex-col items-center justify-center relative">
                    <div className="w-10 h-10 rounded-sm border border-dashed border-gray-400 bg-slate-50 hover:border-[#0093b4] hover:bg-blue-50/50 flex items-center justify-center cursor-pointer transition-all text-gray-400 hover:text-[#0093b4] relative overflow-hidden group/img">
                      <span className="material-symbols-outlined text-lg group-hover/img:scale-110 transition-transform">add_photo_alternate</span>
                    </div>
                  </div>
                </td>

                {/* Body1 Message */}
                <td className="border-b border-r border-slate-200 relative p-0 transition-colors hover:bg-slate-50 bg-white align-top">
                  <div className="flex h-full w-full relative">
                    <textarea
                      className="w-full h-full py-1 px-1.5 text-[10px] leading-tight bg-transparent border-none focus:ring-0 focus:outline-none resize-none transition-all text-slate-700 placeholder-gray-400"
                      defaultValue={row.body1}
                    />
                  </div>
                </td>

                {/* Body2 Rate */}
                <td className="border-b border-r border-slate-200 relative p-0 transition-colors hover:bg-slate-50 bg-white align-middle text-center">
                  <span className="font-mono text-xs font-bold text-slate-700">{row.b2}</span>
                </td>

                {/* Body2 Image */}
                <td className="border-b border-r border-slate-200 relative p-0 transition-colors hover:bg-slate-50 bg-white">
                  <div className="w-full h-full p-1 flex flex-col items-center justify-center relative">
                    <div className="w-10 h-10 rounded-sm border border-dashed border-gray-400 bg-slate-50 hover:border-[#0093b4] hover:bg-blue-50/50 flex items-center justify-center cursor-pointer transition-all text-gray-400 hover:text-[#0093b4] relative overflow-hidden group/img">
                      <span className="material-symbols-outlined text-lg group-hover/img:scale-110 transition-transform">add_photo_alternate</span>
                    </div>
                  </div>
                </td>

                {/* Body2 Message */}
                <td className="border-b border-r border-slate-200 relative p-0 transition-colors hover:bg-slate-50 bg-white align-top">
                  <div className="flex h-full w-full relative">
                    <textarea
                      className="w-full h-full py-1 px-1.5 text-[10px] leading-tight bg-transparent border-none focus:ring-0 focus:outline-none resize-none transition-all text-slate-700 placeholder-gray-400"
                      defaultValue={row.body2}
                    />
                  </div>
                </td>

                {/* CTA Rate */}
                <td className="border-b border-r border-slate-200 relative p-0 transition-colors hover:bg-slate-50 bg-white align-middle text-center">
                  <span className="font-mono text-xs font-bold text-slate-700">{row.c}</span>
                </td>

                {/* CTA Message */}
                <td className="border-b border-slate-200 relative p-0 transition-colors hover:bg-slate-50 bg-white align-top border-r-0">
                  <div className="flex h-full w-full relative">
                    <textarea
                      className="w-full h-full py-1 px-1.5 text-[10px] leading-tight bg-transparent border-none focus:ring-0 focus:outline-none resize-none transition-all text-slate-700 placeholder-gray-400"
                      defaultValue={row.cta}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
};

export default CheckAnalysisPage;
