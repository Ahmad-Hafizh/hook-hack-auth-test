"use client";

import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { GenerationTable, RenderStatus } from "./components/GenerationTable";
import { VideoPreviewPanel } from "./components/VideoPreviewPanel";
import callAppV2Api from "@/config/axios/axiosAppV2";
import callApi from "@/config/axios/axios";
import { useQuery } from "@tanstack/react-query";
import { LoadingOverlay } from "@/components/ui/loading-overlay";
import { errorToastCaller } from "../../components/toastCaller";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { connectYoutube } from "@/app/dashboard/settings/action/connect/connectYoutube";

const GenerationPage = ({ onPrev }: { onPrev: () => void }) => {
  const { sessionId } = useParams();
  const [dataRows, setDataRows] = useState<any[]>([]);
  const [duration, setDuration] = useState<15 | 30>(15);
  const [orientation, setOrientation] = useState<"horizontal" | "vertical">(
    "horizontal",
  );

  // Render status tracking
  const [renderStatuses, setRenderStatuses] = useState<RenderStatus[]>([]);
  const [jobId, setJobId] = useState<string>("");
  const [submitting, setSubmitting] = useState(false);
  const [renderError, setRenderError] = useState<string | null>(null);
  const router = useRouter();
  // Selection state
  const [selectedRowIndex, setSelectedRowIndex] = useState<number | null>(null);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [connectingToYoutube, setConnectingToYoutube] = useState(false);

  // Summary stats
  const succeededCount = renderStatuses.filter(
    (r) => r.status === "succeeded",
  ).length;
  const failedCount = renderStatuses.filter(
    (r) => r.status === "failed",
  ).length;
  const totalCount = renderStatuses.length;
  const allDone = totalCount > 0 && succeededCount + failedCount === totalCount;

  const onRegenerate = async () => {
    try {
      const { data } = await callApi.post("/app-v3/planning/generation/fetch", {
        sessionId,
      });

      if (data) {
        if (data.data_row_finalized) {
          setDataRows(data.data_row_finalized);

          // Initialize statuses: use rendered_videos from DB if available, otherwise "planned"
          if (data.rendered_videos && data.rendered_videos.length > 0) {
            const updatedStatuses: RenderStatus[] = data.rendered_videos.map(
              (v: any, i: number) => ({
                index: i,
                status: v.status as RenderStatus["status"],
                url: v.url,
                render_id: v.render_id,
              }),
            );

            setRenderStatuses(updatedStatuses);
            if (updatedStatuses.length > 0) setSelectedRowIndex(0);
          } else {
            // No rendered videos yet — initialize all as "planned"
            const initialStatuses: RenderStatus[] = data.data_row_finalized.map(
              (_: any, i: number) => ({
                index: i,
                status: "planned" as const,
              }),
            );
            setRenderStatuses(initialStatuses);
            if (initialStatuses.length > 0) setSelectedRowIndex(0);
          }
        }
        if (data.orientation) {
          setOrientation(data.orientation);
        }
        if (data.duration) {
          setDuration(data.duration);
        }
      }
    } catch (error) {
      errorToastCaller(error);
    }
  };

  // Fetch job ID from sessionStorage or API
  const onGetJobId = async () => {
    try {
      setSubmitting(true);
      const { data } = await callApi.post(
        "/app-v3/planning/generation/job-id",
        {
          sessionId,
        },
      );

      if (data.jobId) {
        setJobId(data.jobId);
      }
    } catch (error) {
      errorToastCaller(error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleConnectYoutube = () => {
    try {
      setIsDialogOpen(true);
      setConnectingToYoutube(true);

      connectYoutube(`/app-v3/${sessionId}/planning`, (url) =>
        router.push(url),
      );
    } catch (error) {
      errorToastCaller(error);
    } finally {
      setConnectingToYoutube(false);
      setIsDialogOpen(false);
    }
  };

  useEffect(() => {
    onRegenerate();
    onGetJobId();
  }, []);

  // Fetch job result via callAppV2Api (same as generations.tsx)
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

  // React Query polling
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
    queryKey: ["generation-status", "renders", jobId],
    queryFn: getJobResult,
    enabled: !!jobId && !submitting,
    retry: 2,
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

  // Handle job result changes - update renderStatuses from polling data
  useEffect(() => {
    if (!jobResult) return;

    if (
      jobResult.status === "running" ||
      jobResult.status === "rendering" ||
      jobResult.status === "planned"
    ) {
      setRenderError(null);
      if (jobResult.renders) {
        // Map renders to RenderStatus format for the table
        setRenderStatuses((prev) => {
          const updated = [...prev];
          jobResult.renders!.forEach((r) => {
            const idx =
              r.index !== undefined ? r.index : jobResult.renders!.indexOf(r);
            if (idx >= 0 && idx < updated.length) {
              updated[idx] = {
                index: idx,
                status:
                  (r.status as RenderStatus["status"]) || updated[idx].status,
                url: r.url || updated[idx].url,
              };
            }
          });
          return updated;
        });
      }
    } else if (
      jobResult.status === "done" ||
      jobResult.status === "succeeded"
    ) {
      setRenderError(null);
      if (jobResult.renders) {
        setRenderStatuses((prev) => {
          const updated = [...prev];
          jobResult.renders!.forEach((r) => {
            const idx =
              r.index !== undefined ? r.index : jobResult.renders!.indexOf(r);
            if (idx >= 0 && idx < updated.length) {
              updated[idx] = {
                index: idx,
                status: (r.status as RenderStatus["status"]) || "succeeded",
                url: r.url || updated[idx].url,
                render_id: r.render_id || updated[idx].render_id,
              };
            }
          });
          return updated;
        });
      }
    } else if (jobResult.status === "error" || jobResult.status === "failed") {
      console.error("Render job failed:", jobResult.error);
      setRenderError(
        `動画生成に失敗しました: ${jobResult.error || "不明なエラー"}`,
      );
    }
  }, [jobResult]);

  // Get selected row's video URL and status
  const selectedRenderStatus =
    selectedRowIndex !== null ? renderStatuses[selectedRowIndex] : undefined;

  if (submitting) {
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
    <div className="w-full h-full flex flex-col">
      {/* Header */}
      <div className="px-8 py-5 flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          className="text-slate-500 hover:text-slate-800"
          onClick={onPrev}
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div>
          <h1 className="text-2xl font-bold text-slate-800">プレビュー</h1>
          {totalCount > 0 && (
            <p className="text-sm text-slate-500 mt-1">
              {allDone
                ? `${succeededCount}/${totalCount} 本の動画が生成されました${failedCount > 0 ? ` (${failedCount} 失敗)` : ""}`
                : `${succeededCount}/${totalCount} 生成中...`}
            </p>
          )}
          {renderError && (
            <p className="text-sm text-red-500 mt-1">{renderError}</p>
          )}
        </div>
      </div>

      {/* Main Two-Panel Layout */}

      <div className="flex-1 flex gap-6 overflow-hidden px-8 pb-8">
        {/* Left Panel: Table */}
        <div className="flex-1 overflow-auto rounded-xl border border-slate-200 bg-white shadow-sm">
          <GenerationTable
            rows={dataRows}
            renderStatuses={renderStatuses}
            selectedRowIndex={selectedRowIndex}
            onRowSelect={setSelectedRowIndex}
            duration={duration as 15 | 30}
          />
        </div>

        {/* Right Panel: Video Preview */}
        <div className="w-[400px] flex-shrink-0 min-h-[280px] bg-slate-50 rounded-xl border border-slate-200 shadow-sm overflow-auto">
          <VideoPreviewPanel
            videoUrl={selectedRenderStatus?.url}
            orientation={orientation}
            rowIndex={selectedRowIndex}
            status={selectedRenderStatus?.status}
            sessionId={sessionId as string}
            onOpenConnectYoutubeDialog={() => setIsDialogOpen(true)}
            renderId={selectedRenderStatus?.render_id}
          />
        </div>
      </div>

      <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              You haven't connected your account to YouTube integration
            </AlertDialogTitle>
            <AlertDialogDescription>
              you can connect your account with the button below, or you can
              download the video and upload it manually to your YouTube channel.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={connectingToYoutube}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleConnectYoutube}
              disabled={connectingToYoutube}
            >
              {connectingToYoutube ? "Connecting..." : "Connect"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* <div className="flex-1 flex items-center justify-center">
          <div className="text-center py-10">
            <p className="text-slate-500">動画がありません</p>
            <p className="text-sm text-slate-400 mt-2">
              動画の生成に失敗した可能性があります。もう一度お試しください。
            </p>
            <Button variant="secondary" className="mt-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              戻る
            </Button>
          </div>
        </div>
      )} */}
    </div>
  );
};

export default GenerationPage;
