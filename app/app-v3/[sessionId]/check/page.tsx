"use client";

import React, { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Search, Check } from "lucide-react";
import { useRouter } from "next/navigation";
import { Checkbox } from "@/components/ui/checkbox";
import callApi from "@/config/axios/axios";
import LoadingOverlay from "@/components/ui/loading-overlay";
import { toast } from "sonner";

interface Ad {
  ad_id: string;
  ad_group: string;
  ad_name: string;
  ad_type: string;
  campaign: {
    id: string;
    name: string;
  };
  final_urls: string[];
  status: string;
  video_id: string;
  metrics: {
    clicks: number;
    conversions: number;
    cost: number;
    ctr: number;
    ctr_percent: number;
    cvr: number;
    cvr_percent: number;
    impressions: number;
    video_quartile_25_rate_percent: number;
    video_quartile_50_rate_percent: number;
    video_quartile_75_rate_percent: number;
    video_quartile_100_rate_percent: number;
    video_views: number;
  };
}

// // Base mock data for demonstration - all horizontal videos
// const baseMockAds: Ad[] = Array.from({ length: 27 }, (_, i) => ({
//   id: `ad-${i + 1}`,
//   title: `広告クリエイティブ ${i + 1}`,
//   campaign: `キャンペーン ${Math.floor(i / 3) + 1}`,
//   videoSrc: "/Real_estate.m4v",
//   aspectRatio: "horizontal",
//   createdAt: new Date(Date.now() - i * 86400000).toISOString(),
// }));

const ITEMS_PER_PAGE = 9;

const CheckSelectAdsPage = () => {
  const router = useRouter();
  const [ads, setAds] = useState<Ad[]>([]);
  const [selectedAds, setSelectedAds] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  const getAds = async () => {
    try {
      setIsLoading(true);
      const { data } = await callApi.get("/app-v3/check/dummy");
      console.log(data);
      setAds(data.ads);
    } catch (error: any) {
      console.log(error);
      toast.error(error.response?.data?.message || "広告の取得に失敗しました", {
        position: "top-center",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch ads on mount + include generated videos from localStorage
  useEffect(() => {
    getAds();
  }, []);

  // Filter ads based on search
  const filteredAds = ads.filter(
    (ad) =>
      ad.ad_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ad.campaign.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  // Pagination
  const totalPages = Math.ceil(filteredAds.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedAds = filteredAds.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE,
  );

  // Toggle ad selection
  const toggleAdSelection = (id: string) => {
    setSelectedAds((prev) =>
      prev.includes(id) ? prev.filter((adId) => adId !== id) : [...prev, id],
    );
  };

  // Select all on current page
  const toggleSelectAll = () => {
    const currentPageIds = paginatedAds.map((ad) => ad.ad_id);
    const allSelected = currentPageIds.every((id) => selectedAds.includes(id));

    if (allSelected) {
      setSelectedAds((prev) =>
        prev.filter((id) => !currentPageIds.includes(id)),
      );
    } else {
      setSelectedAds((prev) => {
        const combined = [...prev, ...currentPageIds];
        return combined.filter((id, index) => combined.indexOf(id) === index);
      });
    }
  };

  // Handle submit
  const handleSubmit = async () => {
    try {
      const { data } = await callApi.post("/app-v3/check/dummy/selected", {
        selected_ad_ids: selectedAds,
      });
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const isAllCurrentPageSelected =
    paginatedAds.length > 0 &&
    paginatedAds.every((ad) => selectedAds.includes(ad.ad_id));

  if (isLoading)
    return (
      <div className="flex items-center justify-center h-screen">
        <LoadingOverlay
          message="広告を読み込んでいます..."
          showProgress={false}
          isVisible={isLoading}
        />
      </div>
    );

  return (
    <main className="flex-1 w-full max-w-6xl mx-auto px-4 py-12 md:px-8 flex flex-col justify-start">
      {/* Header */}
      <div className="mb-8 animate-fade-in-up flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-slate-800">
            広告チェック
          </h1>
          <p className="text-slate-600 mt-1">
            分析したい広告を選択してください
          </p>
        </div>
        {selectedAds.length > 0 && (
          <div className="flex items-center gap-3">
            <span className="text-sm text-slate-600">
              {selectedAds.length}件選択中
            </span>
            <button
              onClick={handleSubmit}
              className="bg-[#0093b4] hover:bg-[#007a92] text-white font-semibold py-2.5 px-6 rounded-lg shadow-sm transition-all duration-200 flex items-center gap-2"
            >
              <Check className="w-5 h-5" />
              <span>分析する</span>
            </button>
          </div>
        )}
      </div>

      {/* Main Card */}
      <div className="w-full bg-white rounded-xl shadow-sm border border-slate-200 animate-fade-in-up overflow-hidden flex flex-col">
        {/* Search and Select All Bar */}
        <div className="p-4 border-b border-slate-200 bg-slate-50/30 flex flex-col md:flex-row gap-4 justify-between items-center">
          <div className="relative w-full md:w-80 group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-[#0093b4] transition-colors w-4 h-4" />
            <input
              className="w-full pl-10 pr-4 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0093b4]/20 focus:border-[#0093b4] transition-all bg-white text-slate-800 placeholder-slate-400"
              placeholder="広告名・キャンペーン名で検索..."
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
            />
          </div>
          <div className="flex items-center gap-3">
            <label className="flex items-center gap-2 cursor-pointer text-sm text-slate-600 hover:text-slate-800 transition-colors">
              <Checkbox
                checked={isAllCurrentPageSelected}
                onCheckedChange={toggleSelectAll}
                className="data-[state=checked]:bg-[#0093b4] data-[state=checked]:border-[#0093b4]"
              />
              <span>このページの全てを選択</span>
            </label>
          </div>
        </div>

        {/* Ads Grid */}
        <div className="p-6">
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {Array.from({ length: 9 }).map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="aspect-video bg-slate-200 rounded-lg mb-2" />
                  <div className="h-4 bg-slate-200 rounded w-3/4 mb-1" />
                  <div className="h-3 bg-slate-200 rounded w-1/2" />
                </div>
              ))}
            </div>
          ) : paginatedAds.length === 0 ? (
            <div className="text-center py-16">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-slate-100 rounded-full mb-4">
                <Search className="w-8 h-8 text-slate-400" />
              </div>
              <h3 className="text-lg font-semibold text-slate-800 mb-2">
                広告が見つかりません
              </h3>
              <p className="text-slate-600">検索条件を変更してください</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {paginatedAds.map((ad) => (
                <div
                  key={ad.ad_id}
                  className={`group relative bg-white rounded-lg border-2 transition-all duration-200 hover:shadow-lg overflow-hidden cursor-pointer ${
                    selectedAds.includes(ad.ad_id)
                      ? "border-[#0093b4] ring-2 ring-[#0093b4]/20"
                      : "border-slate-200 hover:border-slate-300"
                  }`}
                  onClick={() => toggleAdSelection(ad.ad_id)}
                >
                  {/* Selection Checkbox */}
                  <div className="absolute top-2 right-2 z-10">
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center transition-all ${
                        selectedAds.includes(ad.ad_id)
                          ? "bg-[#0093b4] text-white"
                          : "bg-white/80 border border-slate-300 text-transparent group-hover:border-slate-400"
                      }`}
                    >
                      <Check className="w-4 h-4" />
                    </div>
                  </div>

                  {/* Video Container - All horizontal */}
                  <div className="relative bg-slate-100 overflow-hidden aspect-video">
                    <video
                      className="w-full h-full object-cover"
                      preload="metadata"
                      muted
                      onMouseEnter={(e) => e.currentTarget.play()}
                      onMouseLeave={(e) => {
                        e.currentTarget.pause();
                        e.currentTarget.currentTime = 0;
                      }}
                    >
                      <source src={ad.final_urls[0]} type="video/mp4" />
                    </video>
                  </div>

                  {/* Ad Info */}
                  <div className="p-3">
                    <h3 className="font-medium text-sm text-slate-800 truncate mb-1">
                      {ad.ad_name}
                    </h3>
                    <p className="text-xs text-slate-500 truncate">
                      {ad.campaign.name}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Pagination */}
        <div className="p-4 border-t border-slate-200 bg-slate-50/20 flex items-center justify-between text-xs text-slate-500">
          <div>
            全 {filteredAds.length} 件中 {startIndex + 1}-
            {Math.min(startIndex + ITEMS_PER_PAGE, filteredAds.length)} 件を表示
          </div>
          <div className="flex items-center gap-2">
            <button
              className="px-3 py-1.5 rounded border border-slate-200 bg-white hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
            >
              <ChevronLeft className="w-4 h-4" />
              <span>前へ</span>
            </button>
            <div className="flex items-center gap-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1)
                .filter(
                  (page) =>
                    page === 1 ||
                    page === totalPages ||
                    Math.abs(page - currentPage) <= 1,
                )
                .map((page, index, array) => (
                  <React.Fragment key={page}>
                    {index > 0 && array[index - 1] !== page - 1 && (
                      <span className="px-2">...</span>
                    )}
                    <button
                      className={`w-8 h-8 rounded flex items-center justify-center transition-colors ${
                        currentPage === page
                          ? "bg-[#0093b4] text-white"
                          : "border border-slate-200 bg-white hover:bg-slate-50"
                      }`}
                      onClick={() => setCurrentPage(page)}
                    >
                      {page}
                    </button>
                  </React.Fragment>
                ))}
            </div>
            <button
              className="px-3 py-1.5 rounded border border-slate-200 bg-white hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1"
              disabled={currentPage >= totalPages}
              onClick={() => setCurrentPage((prev) => prev + 1)}
            >
              <span>次へ</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Floating Action Bar */}
      {selectedAds.length > 0 && (
        <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 bg-slate-900 text-white rounded-full shadow-2xl px-8 py-4 flex items-center gap-4 z-50 border border-slate-700">
          <span className="font-medium">
            {selectedAds.length}件の広告を選択中
          </span>
          <div className="flex gap-2">
            <button
              onClick={handleSubmit}
              className="px-6 py-2 bg-[#0093b4] hover:bg-[#007a92] rounded-full font-medium transition-colors"
            >
              分析する
            </button>
            <button
              onClick={() => setSelectedAds([])}
              className="px-6 py-2 bg-slate-700 hover:bg-slate-600 rounded-full font-medium transition-colors"
            >
              クリア
            </button>
          </div>
        </div>
      )}
    </main>
  );
};

export default CheckSelectAdsPage;
