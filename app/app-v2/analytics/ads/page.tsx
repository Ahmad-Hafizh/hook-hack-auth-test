"use client";

import React, { useEffect, useState } from "react";
import { Search, Filter, Play, Clock, Eye, TrendingUp } from "lucide-react";
import callApi from "@/config/axios/axios";

const SelectAdsPage = () => {
  const [selectedAds, setSelectedAds] = useState<number[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const [isLoading, setIsLoading] = useState(false);

  const getAds = async () => {
    // Fetch ads from backend or API
    setIsLoading(true);
    try {
      const { data } = await callApi.get("/app-v2/analytics/ads");
      console.log(data);
    } catch (error) {
      console.error("Error fetching ads:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getAds();
  }, []);

  const ads = [
    {
      id: 1,
      title: "Real Estate Modern Villa",
      description: "Luxury property showcase with stunning views",
      videoSrc: "/Real_estate.m4v",
      duration: "0:45",
      views: "12.5K",
      engagement: "8.2%",
      category: "real-estate",
    },
    {
      id: 2,
      title: "Real Estate Downtown Condo",
      description: "Urban living at its finest",
      videoSrc: "/Real_estate.m4v",
      duration: "0:32",
      views: "9.8K",
      engagement: "7.5%",
      category: "real-estate",
    },
    {
      id: 3,
      title: "Real Estate Beachfront Property",
      description: "Coastal paradise with ocean views",
      videoSrc: "/Real_estate.m4v",
      duration: "0:58",
      views: "15.2K",
      engagement: "9.1%",
      category: "real-estate",
    },
  ];

  const toggleAdSelection = (id: number) => {
    setSelectedAds((prev) =>
      prev.includes(id) ? prev.filter((adId) => adId !== id) : [...prev, id]
    );
  };

  const filteredAds = ads.filter((ad) => {
    const matchesSearch =
      ad.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ad.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      filterCategory === "all" || ad.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="w-full min-h-screen ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 dark:from-slate-100 dark:to-slate-300 bg-clip-text text-transparent">
              Select Your Ads
            </h1>
            {selectedAds.length > 0 && (
              <div className="flex items-center gap-2 px-4 py-2 bg-blue-100 dark:bg-blue-900/30 rounded-full">
                <span className="text-sm font-medium text-blue-700 dark:text-blue-300">
                  {selectedAds.length} selected
                </span>
              </div>
            )}
          </div>
          <p className="text-slate-600 dark:text-slate-400 text-lg">
            Choose from our collection of high-performing ad creatives to
            analyze and optimize your campaigns
          </p>
        </div>

        {/* Ads Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAds.map((ad) => (
            <div
              key={ad.id}
              className={`group relative bg-white dark:bg-slate-800 rounded-xl shadow-sm border-2 transition-all duration-300 hover:shadow-xl overflow-hidden ${
                selectedAds.includes(ad.id)
                  ? "border-blue-500 dark:border-blue-600 ring-2 ring-blue-200 dark:ring-blue-900"
                  : "border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600"
              }`}
            >
              {/* Selection Checkbox */}
              <div className="absolute top-4 right-4 z-10">
                <input
                  type="checkbox"
                  checked={selectedAds.includes(ad.id)}
                  onChange={() => toggleAdSelection(ad.id)}
                  className="w-5 h-5 rounded border-2 border-white shadow-lg cursor-pointer accent-blue-600"
                />
              </div>

              {/* Video Container */}
              <div className="relative aspect-[9/16] bg-slate-100 dark:bg-slate-900 overflow-hidden">
                <video
                  className="w-full h-full object-cover"
                  controls
                  preload="metadata"
                >
                  <source src={ad.videoSrc} />
                  Your browser does not support the video tag.
                </video>
              </div>

              {/* Ad Info */}
              <div className="p-5">
                <h3 className="font-semibold text-lg text-slate-900 dark:text-slate-100 mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {ad.title}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-4 line-clamp-2">
                  {ad.description}
                </p>

                {/* Metrics */}
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-1 text-slate-600 dark:text-slate-400">
                    <Clock className="w-4 h-4" />
                    <span>{ad.duration}</span>
                  </div>
                  <div className="flex items-center gap-1 text-slate-600 dark:text-slate-400">
                    <Eye className="w-4 h-4" />
                    <span>{ad.views}</span>
                  </div>
                  <div className="flex items-center gap-1 text-green-600 dark:text-green-400">
                    <TrendingUp className="w-4 h-4" />
                    <span>{ad.engagement}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredAds.length === 0 && (
          <div className="text-center py-16">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-full mb-4">
              <Search className="w-8 h-8 text-slate-400" />
            </div>
            <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-2">
              No ads found
            </h3>
            <p className="text-slate-600 dark:text-slate-400">
              Try adjusting your search or filter criteria
            </p>
          </div>
        )}

        {/* Action Bar */}
        {selectedAds.length > 0 && (
          <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 bg-slate-900 dark:bg-slate-800 text-white rounded-full shadow-2xl px-8 py-4 flex items-center gap-4 z-50 border border-slate-700">
            <span className="font-medium">
              {selectedAds.length} ad{selectedAds.length > 1 ? "s" : ""}{" "}
              selected
            </span>
            <div className="flex gap-2">
              <button className="px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded-full font-medium transition-colors">
                Analyze
              </button>
              <button
                onClick={() => setSelectedAds([])}
                className="px-6 py-2 bg-slate-700 hover:bg-slate-600 rounded-full font-medium transition-colors"
              >
                Clear
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SelectAdsPage;
