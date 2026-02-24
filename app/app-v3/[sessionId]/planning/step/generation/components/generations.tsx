"use client";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import {
  Download,
  Video,
  CheckCircle2,
  ArrowLeft,
  BarChart3,
} from "lucide-react";
import callAppV2Api from "@/config/axios/axiosAppV2";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";
import callApi from "@/config/axios/axios";
import LoadingOverlay from "@/components/ui/loading-overlay";

const GenerationPage = () => {
  const { sessionId } = useParams();
  const router = useRouter();
  const [renderError, setRenderError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [jobId, setJobId] = useState<string>("");
  const [regenerating, setRegenerating] = useState(false);

  const [totalRenders, setTotalRenders] = useState(0);
  const [renders, setRenders] = useState<
    {
      index: number;
      template_id: string;
      render_id: string | null;
      status: string;
      url: string | null;
      visual_id_hash: string | null;
      error: string | null;
      attempts: number;
    }[]
  >([]);

  const onGetJobId = async () => {
    try {
      setRegenerating(true);
      const { data } = await callAppV2Api.post(
        "/v2/planning/generation/job-id",
        {
          sessionId,
        },
      );

      if (data.jobId) {
        setJobId(data.jobId);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setRegenerating(false);
    }
  };

  useEffect(() => {
    // Read all rendered video URLs from sessionStorage
    const storedJobId = sessionStorage.getItem("currentJobId");
    if (storedJobId) {
      setJobId(storedJobId);
    } else {
      onGetJobId();
    }
  }, []);

  const handleDownload = async (url: string, index: number) => {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = `video-pattern-${index + 1}.mp4`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(blobUrl);
    } catch (error) {
      console.error("Download failed:", error);
      // Fallback: open in new tab
      window.open(url, "_blank");
    }
  };

  const handleDownloadAll = () => {
    const succeededRenders = renders.filter(
      (r) => (r.status === "done" || r.status === "succeeded") && r.url,
    );
    succeededRenders.forEach((render, index) => {
      setTimeout(() => {
        handleDownload(render.url!, render.index ?? index);
      }, index * 1000); // Stagger downloads by 1s to avoid browser blocking
    });
  };

  const getJobResult = async () => {
    try {
      const { data } = await callAppV2Api.get(
        `/v1/creatomate/raw-renders/${jobId}`,
      );

      // Determine overall status from individual renders if no top-level status
      if (data.renders && Array.isArray(data.renders)) {
        const renders = data.renders;
        const succeeded = renders.filter(
          (r: any) => r.status === "succeeded",
        ).length;
        const failed = renders.filter((r: any) => r.status === "failed").length;
        const total = renders.length;
        const completed = succeeded + failed;

        if (total > 0 && completed >= total) {
          // All renders finished - mark as done or failed
          data._resolvedStatus = failed === total ? "failed" : "done";
        } else {
          data._resolvedStatus = "rendering";
        }
      }

      // Normalize top-level status
      const rawStatus = data.status || data._resolvedStatus;
      if (rawStatus === "succeeded") data.status = "done";
      else if (rawStatus === "rendering" || rawStatus === "planned")
        data.status = "running";
      else if (rawStatus) data.status = rawStatus;

      return data;
    } catch (error) {
      throw error;
    }
  };

  const { data: jobResult } = useQuery<{
    status: string;
    renders?: {
      index: number;
      template_id: string;
      render_id: string | null;
      status: string;
      url: string | null;
      visual_id_hash: string | null;
      error: string | null;
      attempts: number;
    }[];
    error?: string;
    counts?: {
      total: number;
      succeeded: number;
      failed: number;
      running: number;
      pending: number;
    };
  }>({
    queryKey: ["status", "renders", jobId],
    queryFn: getJobResult,
    enabled: !!jobId && !regenerating,
    retry: 2, // Only retry failed requests twice before stopping
    refetchInterval: (query) => {
      const currentStatus = query.state.data?.status;

      // Stop polling on terminal statuses
      if (
        currentStatus === "done" ||
        currentStatus === "succeeded" ||
        currentStatus === "error" ||
        currentStatus === "failed"
      ) {
        return false;
      }

      // Stop polling if query itself errored too many times
      if (query.state.error) {
        return false;
      }

      // Continue polling for in-progress statuses
      if (
        currentStatus === "running" ||
        currentStatus === "rendering" ||
        currentStatus === "planned"
      ) {
        return 10000;
      }

      // For undefined/unknown status, try again with shorter interval
      return 3000;
    },
  });

  // Handle job result changes
  useEffect(() => {
    if (!jobResult) return;

    if (
      jobResult.status === "running" ||
      jobResult.status === "rendering" ||
      jobResult.status === "planned"
    ) {
      setRenderError(null);
      if (jobResult.counts?.total) {
        setTotalRenders(jobResult.counts.total);
      }
      if (jobResult.renders) {
        setRenders(jobResult.renders);
      }
      setLoading(true);
    } else if (
      jobResult.status === "done" ||
      jobResult.status === "succeeded"
    ) {
      // Extract video URLs from renders - check both 'url' and 'result_url' fields
      setRenderError(null);
      if (jobResult.renders) {
        setRenders(jobResult.renders);
      }

      async () => {
        const { data } = await callApi.post(
          "/v2/planning/generation/save-renders",
          {
            sessionId,
            renders: jobResult.renders,
          },
        );

        console.log(data);
      };
    } else if (jobResult.status === "error" || jobResult.status === "failed") {
      async () => {
        const { data } = await callApi.post("/v2/planning/generation/fetch", {
          sessionId,
        });

        if (data.renders) {
          setRenders(data.renders);
        }

        console.log("Fetched renders after failure:", data);
      };

      console.error("[Effect] Render job failed:", jobResult.error);
      setRenderError(
        `動画生成に失敗しました: ${jobResult.error || "不明なエラー"}`,
      );
      setLoading(false);
    }
  }, [jobResult]);

  if (regenerating) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center gap-4">
        <LoadingOverlay
          isVisible={true}
          message="動画生成の結果を取得しています..."
          showProgress={false}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="w-full max-w-[1800px] mx-auto py-8 px-6">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div
                  className={`p-2 rounded-lg ${
                    jobResult?.status === "done"
                      ? "bg-green-100"
                      : jobResult?.status === "error" ||
                          jobResult?.status === "failed"
                        ? "bg-red-100"
                        : "bg-blue-100"
                  }`}
                >
                  <CheckCircle2
                    className={`w-6 h-6 ${
                      jobResult?.status === "done"
                        ? "text-green-600"
                        : jobResult?.status === "error" ||
                            jobResult?.status === "failed"
                          ? "text-red-600"
                          : "text-blue-600 animate-pulse"
                    }`}
                  />
                </div>
                <h1 className="text-3xl font-bold text-slate-800">
                  {jobResult?.status === "done"
                    ? "12. 動画生成完了"
                    : jobResult?.status === "error" ||
                        jobResult?.status === "failed"
                      ? "12. 動画生成失敗"
                      : "12. 動画生成中..."}
                </h1>
              </div>
              {renders.filter((r) => r.status === "succeeded").length > 0 && (
                <p className="text-slate-600 ml-14">
                  {renders.filter((r) => r.status === "succeeded").length}
                  本の動画が正常に生成されました
                </p>
              )}
              {renderError && (
                <p className="text-red-600 ml-14 mt-2">{renderError}</p>
              )}
            </div>

            {renders.filter((r) => r.status === "succeeded").length > 1 && (
              <button
                onClick={handleDownloadAll}
                className="flex items-center gap-2 bg-[#0093b4] hover:bg-[#007a92] text-white px-6 py-3 rounded-lg font-semibold shadow-sm transition-all"
              >
                <Download className="w-4 h-4" />
                すべてダウンロード
              </button>
            )}
          </div>
        </div>

        {/* Error State */}
        {(jobResult?.status === "error" || jobResult?.status === "failed") && (
          <div className="bg-white rounded-xl shadow-sm border border-red-200 p-12 text-center mb-6">
            <div className="max-w-md mx-auto">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Video className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="text-lg font-semibold text-slate-800 mb-2">
                動画生成に失敗しました
              </h3>
              <p className="text-slate-500 text-sm mb-4">
                {jobResult?.error || "不明なエラーが発生しました"}
              </p>
              <button
                onClick={() => router.back()}
                className="flex items-center gap-2 bg-[#0093b4] hover:bg-[#007a92] text-white px-6 py-3 rounded-lg font-semibold shadow-sm transition-all mx-auto"
              >
                <ArrowLeft className="w-4 h-4" />
                設定に戻る
              </button>
            </div>
          </div>
        )}

        {/* Video Grid */}
        {renders.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {renders.map((render, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-md transition-shadow"
              >
                {/* Card Header */}
                <div className="p-4 border-b border-slate-100 bg-slate-50">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Video className="w-4 h-4 text-[#0093b4]" />
                      <span className="font-semibold text-slate-800">
                        パターン {index + 1}
                      </span>
                    </div>
                    <button
                      onClick={() => handleDownload(render.url || "", index)}
                      disabled={
                        render.status !== "done" &&
                        render.status !== "succeeded"
                      }
                      className="flex items-center gap-1.5 text-[#0093b4] hover:text-[#007a92] text-sm font-medium transition-colors disabled:text-slate-400 disabled:hover:text-slate-400 disabled:cursor-not-allowed"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>保存</span>
                    </button>
                  </div>
                </div>

                {/* Video Player */}
                {render.status === "succeeded" ? (
                  <div className="p-4 bg-slate-900">
                    <video
                      className="w-full aspect-[16/9] rounded-lg"
                      controls
                      preload="metadata"
                    >
                      <source src={render.url || ""} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  </div>
                ) : render.status === "pending" ||
                  render.status === "running" ||
                  render.status === "rendering" ||
                  render.status === "planned" ? (
                  <div className="relative w-full h-fit">
                    <Skeleton className="w-full aspect-[16/9] rounded-lg" />
                    <p className="absolute inset-0 flex items-center justify-center text-slate-500 text-sm">
                      動画を生成中です...
                    </p>
                  </div>
                ) : render.status === "error" || render.status === "failed" ? (
                  <div className="w-full aspect-[16/9] rounded-lg bg-red-100 flex items-center justify-center">
                    <p className="text-red-600 text-sm">
                      動画の生成に失敗しました。
                    </p>
                  </div>
                ) : null}
                {/* Card Footer */}
                <div className="p-4 bg-slate-50">
                  <a
                    href={render.url || ""}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-slate-500 hover:text-slate-700 underline truncate block"
                  >
                    リンクを開く
                  </a>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-12 text-center">
            <div className="max-w-md mx-auto">
              <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Video className="w-8 h-8 text-slate-400" />
              </div>
              <h3 className="text-lg font-semibold text-slate-800 mb-2">
                動画がありません
              </h3>
              <p className="text-slate-500 text-sm">
                動画の生成に失敗した可能性があります。
                <br />
                もう一度お試しください。
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GenerationPage;
