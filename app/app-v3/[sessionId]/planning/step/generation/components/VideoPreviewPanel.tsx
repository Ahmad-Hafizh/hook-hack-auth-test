"use client";

import React, { useState } from "react";
import { Download, Loader, XCircle, Video } from "lucide-react";

interface VideoPreviewPanelProps {
  videoUrl?: string;
  orientation: "horizontal" | "vertical";
  rowIndex: number | null;
  status?: string;
}

export const VideoPreviewPanel: React.FC<VideoPreviewPanelProps> = ({
  videoUrl,
  orientation,
  rowIndex,
  status,
}) => {
  const [downloading, setDownloading] = useState(false);
  console.log("status", status);

  const handleDownload = async () => {
    if (!videoUrl) return;
    setDownloading(true);
    try {
      const response = await fetch(videoUrl);
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `pattern_${(rowIndex ?? 0) + 1}.mp4`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch {
      // Fallback: open in new tab
      window.open(videoUrl, "_blank");
    } finally {
      setDownloading(false);
    }
  };

  // No row selected
  if (rowIndex === null) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center px-6">
        <Video className="w-12 h-12 text-slate-300 mb-4" />
        <p className="text-sm text-slate-500 font-medium">
          行を選択してプレビュー
        </p>
        <p className="text-xs text-slate-400 mt-1">
          テーブルの行をクリックすると動画をプレビューできます
        </p>
      </div>
    );
  }

  // Planned / Rendering
  if (status === "planned" || status === "rendering" || status === "running") {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center px-6">
        <Loader className="w-10 h-10 text-amber-500 animate-spin mb-4" />
        <p className="text-sm font-medium text-slate-700">
          Pattern {(rowIndex ?? 0) + 1}
        </p>
        <p className="text-sm text-amber-600 mt-2">
          {status === "planned" ? "待機中..." : "生成中..."}
        </p>
        <p className="text-xs text-slate-400 mt-1">
          動画の生成が完了するまでお待ちください
        </p>
      </div>
    );
  }

  // Failed
  if (status === "failed") {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center px-6">
        <XCircle className="w-10 h-10 text-red-400 mb-4" />
        <p className="text-sm font-medium text-slate-700">
          Pattern {(rowIndex ?? 0) + 1}
        </p>
        <p className="text-sm text-red-600 mt-2">生成に失敗しました</p>
        <p className="text-xs text-slate-400 mt-1">
          動画の生成中にエラーが発生しました。もう一度お試しください。
        </p>
      </div>
    );
  }

  // Succeeded - show video
  if (status === "succeeded") {
    return (
      <div className="flex flex-col items-center h-full px-6 py-8">
        <p className="text-sm font-semibold text-slate-700 mb-4">
          Pattern {(rowIndex ?? 0) + 1}
        </p>

        {videoUrl ? (
          <>
            <video
              key={videoUrl}
              className={`rounded-xl bg-black shadow-lg ${
                orientation === "vertical"
                  ? "aspect-[9/16] max-w-[220px]"
                  : "aspect-[16/9] w-full max-w-[340px]"
              }`}
              controls
            >
              <source src={videoUrl} type="video/mp4" />
              Your browser does not support the video tag.
            </video>

            <button
              onClick={handleDownload}
              disabled={downloading}
              className="mt-6 mb-4 bg-[#0093b4] hover:bg-[#007a92] text-white font-semibold py-2.5 px-6 rounded-lg shadow-sm transition-all duration-200 flex items-center gap-2 text-sm disabled:opacity-50"
            >
              {downloading ? (
                <>
                  <Loader className="w-4 h-4 animate-spin" />
                  ダウンロード中...
                </>
              ) : (
                <>
                  <Download className="w-4 h-4" />
                  ダウンロード
                </>
              )}
            </button>
          </>
        ) : (
          <div className="text-sm text-slate-400">動画URLが見つかりません</div>
        )}
      </div>
    );
  }
};

export default VideoPreviewPanel;
