"use client";

import { useState } from "react";
import { SearchForm } from "@/components/search-form";
import axiosInstance from "@/config/axios/axios";
import { Button } from "@/components/ui/button";
import { VideoCvrPanel } from "./VideoCvrPanel";

export function AnalysisBoard() {
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showCvrPanel, setShowCvrPanel] = useState(false);

  const handleSearch = async (searchParams: any) => {
    console.log(searchParams.genre);
    setIsLoading(true);
    setSearchResults([]);
    try {
      const res = await axiosInstance.post("/api/search", {
        search: searchParams.search,
        genre: searchParams.genre,
      });
      const data = res.data;
      setSearchResults(data.results || []);
    } catch (e) {
      setSearchResults([]);
    }
    setIsLoading(false);
  };

  console.log(searchResults);

  return (
    <div className="flex flex-col gap-8">
      <SearchForm
        onSearch={handleSearch}
        mockData={() => setShowCvrPanel((v) => !v)}
        isLoading={isLoading}
      />

      {showCvrPanel && <VideoCvrPanel />}

      {isLoading && (
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 flex justify-center items-center min-h-[300px]">
          <div className="flex flex-col items-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mb-4"></div>
            <p className="text-slate-600">Analyzing videos...</p>
          </div>
        </div>
      )}

      {!isLoading && searchResults.length > 0 && (
        <>
          {/*
          Table overview and card list commented out for new layout
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 mb-6">
            <table className="min-w-full text-sm text-left">
              ...
            </table>
          </div>
          <div className="flex flex-col gap-6">
            ...
          </div>
          */}
        </>
      )}
    </div>
  );
}
