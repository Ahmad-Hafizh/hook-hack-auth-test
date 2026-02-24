"use client";

import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Search,
  Play,
  Download,
  ChevronLeft,
  ChevronRight,
  Video,
  X,
} from "lucide-react";

function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = React.useState<T>(value);

  React.useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

interface VideoData {
  id: string;
  url: string | null;
  status: string | null;
  projectName: string;
  sessionName: string;
  createdAt: string;
}

export default function VideosPage() {
  const [videos, setVideos] = React.useState<VideoData[]>([]);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [currentPage, setCurrentPage] = React.useState(1);
  const [totalPages, setTotalPages] = React.useState(1);
  const [totalVideos, setTotalVideos] = React.useState(0);
  const [isLoading, setIsLoading] = React.useState(true);
  const [playingVideoId, setPlayingVideoId] = React.useState<string | null>(null);
  const videosPerPage = 9;

  const debouncedSearchQuery = useDebounce(searchQuery, 300);

  const fetchVideos = React.useCallback(async (page: number, search: string) => {
    setIsLoading(true);
    try {
      const params = new URLSearchParams({
        page: String(page),
        limit: String(videosPerPage),
      });
      if (search) params.set("search", search);

      const res = await fetch(`/api/new-dashboard/videos?${params}`);
      if (res.ok) {
        const data = await res.json();
        setVideos(data.videos);
        setTotalPages(data.totalPages);
        setTotalVideos(data.totalVideos);
      }
    } catch (error) {
      console.error("Failed to fetch videos:", error);
    } finally {
      setIsLoading(false);
    }
  }, [videosPerPage]);

  React.useEffect(() => {
    fetchVideos(currentPage, debouncedSearchQuery);
  }, [currentPage, debouncedSearchQuery, fetchVideos]);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <div className="flex flex-1 flex-col gap-4 p-4 md:gap-6 md:p-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="space-y-1">
          <h1 className="text-xl font-semibold tracking-tight">動画一覧</h1>
          <p className="text-[13px] text-muted-foreground">生成された動画を管理・再生できます</p>
        </div>
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground stroke-[1.5]" />
          <Input
            placeholder="プロジェクト名で検索..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
            className="pl-8 h-9 text-[13px]"
          />
        </div>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Card key={i} className="overflow-hidden">
              <div className="aspect-video bg-muted animate-pulse" />
              <CardContent className="p-4 space-y-2">
                <div className="h-3.5 w-3/4 rounded bg-muted animate-pulse" />
                <div className="h-3 w-1/2 rounded bg-muted animate-pulse" />
              </CardContent>
            </Card>
          ))}
        </div>
      ) : videos.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {videos.map((video) => (
            <Card key={video.id} className="overflow-hidden group">
              <div className="relative aspect-video bg-muted">
                {playingVideoId === video.id && video.url ? (
                  <div className="relative w-full h-full">
                    <video
                      src={video.url}
                      controls
                      autoPlay
                      className="w-full h-full object-contain bg-black"
                    />
                    <button
                      onClick={() => setPlayingVideoId(null)}
                      className="absolute top-2 right-2 rounded-full bg-black/60 p-1 text-white hover:bg-black/80 transition-colors"
                    >
                      <X className="size-3.5" />
                    </button>
                  </div>
                ) : (
                  <>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Video className="size-10 text-muted-foreground/20 stroke-[1.5]" />
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center bg-black/0 opacity-0 transition-all group-hover:bg-black/40 group-hover:opacity-100">
                      <Button
                        size="sm"
                        variant="secondary"
                        className="h-8 gap-1.5 text-[12px]"
                        onClick={() => setPlayingVideoId(video.id)}
                      >
                        <Play className="size-3.5 stroke-[1.5]" />
                        再生
                      </Button>
                    </div>
                  </>
                )}
              </div>
              <CardContent className="p-4">
                <p className="text-[13px] font-medium leading-none truncate">{video.projectName}</p>
                <p className="text-[11px] text-muted-foreground mt-1.5 truncate">{video.sessionName}</p>
                <div className="flex items-center justify-between mt-3 pt-3 border-t">
                  <span className="text-[11px] text-muted-foreground tabular-nums">
                    {new Date(video.createdAt).toLocaleDateString("ja-JP")}
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-7 gap-1.5 text-[11px] text-muted-foreground hover:text-foreground"
                    onClick={() => video.url && window.open(video.url, "_blank")}
                    disabled={!video.url}
                  >
                    <Download className="size-3.5 stroke-[1.5]" />
                    ダウンロード
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center rounded-lg border border-dashed py-20">
          <Video className="size-10 text-muted-foreground/30 mb-3 stroke-[1.5]" />
          <p className="text-[13px] text-muted-foreground">動画がまだありません</p>
        </div>
      )}

      {totalVideos > videosPerPage && (
        <div className="flex items-center justify-between text-[13px]">
          <p className="text-muted-foreground tabular-nums">
            {totalVideos}件中 {(currentPage - 1) * videosPerPage + 1}〜{Math.min(currentPage * videosPerPage, totalVideos)}件
          </p>
          <div className="flex items-center gap-1">
            <Button
              variant="outline"
              size="icon"
              className="size-8"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="size-4 stroke-[1.5]" />
            </Button>
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              const pageNum = i + 1;
              return (
                <Button
                  key={pageNum}
                  variant={currentPage === pageNum ? "default" : "outline"}
                  size="icon"
                  className="size-8 text-[12px]"
                  onClick={() => handlePageChange(pageNum)}
                >
                  {pageNum}
                </Button>
              );
            })}
            <Button
              variant="outline"
              size="icon"
              className="size-8"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              <ChevronRight className="size-4 stroke-[1.5]" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
