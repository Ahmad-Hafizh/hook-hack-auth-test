"use client";

import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState, useCallback, useRef } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { usePlannningContext } from "@/app/app-v2/plannningContext";
import { IDataRowFinalized } from "../how/hooks/useDataContext";
import { GenerationTable, RenderStatus } from "./GenerationTable";
import { VideoPreviewPanel } from "./VideoPreviewPanel";

const POLL_INTERVAL = 3000; // 3 seconds
const MAX_POLLS = 200; // ~10 minutes max

const Step5 = () => {
  const { sessionId } = useParams();
  const router = useRouter();
  const { onChangePageAndStep } = usePlannningContext();

  // Data from localStorage
  const [selectedFinalizedRows, setSelectedFinalizedRows] = useState<
    IDataRowFinalized[]
  >([]);
  const [duration, setDuration] = useState<15 | 30>(15);
  const [orientation, setOrientation] = useState<"horizontal" | "vertical">(
    "horizontal",
  );

  // Render status tracking
  const [renderStatuses, setRenderStatuses] = useState<RenderStatus[]>([]);
  const [jobId, setJobId] = useState<string | null>(null);
  const [isPolling, setIsPolling] = useState(false);
  const pollingRef = useRef(false);

  // Selection state
  const [selectedRowIndex, setSelectedRowIndex] = useState<number | null>(null);

  // Summary stats
  const succeededCount = renderStatuses.filter(
    (r) => r.status === "succeeded",
  ).length;
  const failedCount = renderStatuses.filter(
    (r) => r.status === "failed",
  ).length;
  const totalCount = renderStatuses.length;
  const allDone = totalCount > 0 && succeededCount + failedCount === totalCount;

  const handleBack = () => {
    onChangePageAndStep("how", 4);
    router.push(`/app-v2/planning/${sessionId}/how`);
  };

  // Load data from localStorage on mount
  useEffect(() => {
    // Load finalized rows and settings from planning_how_data
    try {
      const saved = localStorage.getItem("planning_how_data");
      if (saved) {
        const d = JSON.parse(saved);
        if (d.selectedFinalizedRows && Array.isArray(d.selectedFinalizedRows)) {
          setSelectedFinalizedRows(d.selectedFinalizedRows);
        }
        if (d.duration) setDuration(d.duration);
        if (d.orientation) setOrientation(d.orientation);
      }
    } catch (e) {
      console.error("Error loading planning_how_data:", e);
    }

    // Load video settings as fallback
    try {
      const videoSettings = localStorage.getItem("videoSettings");
      if (videoSettings) {
        const settings = JSON.parse(videoSettings);
        if (settings.orientation) setOrientation(settings.orientation);
        if (settings.duration) setDuration(settings.duration);
      }
    } catch (e) {
      console.error("Error loading videoSettings:", e);
    }

    // Load render job ID
    const storedJobId = localStorage.getItem("renderJobId");
    if (storedJobId) {
      setJobId(storedJobId);
    }
  }, []);

  // Initialize render statuses when rows are loaded
  useEffect(() => {
    if (selectedFinalizedRows.length === 0) return;

    // Check for backward compatibility: if renderedVideoUrls exists and no jobId
    const storedJobId = localStorage.getItem("renderJobId");
    const storedUrls = localStorage.getItem("renderedVideoUrls");

    if (!storedJobId && storedUrls) {
      // Old flow: all renders are already done
      try {
        const urls = JSON.parse(storedUrls);
        if (Array.isArray(urls)) {
          const statuses: RenderStatus[] = selectedFinalizedRows.map(
            (_, i) => ({
              index: i,
              status: "succeeded" as const,
              url: urls[i] || undefined,
            }),
          );
          setRenderStatuses(statuses);
          if (statuses.length > 0) setSelectedRowIndex(0);
          return;
        }
      } catch (e) {
        console.error("Error parsing renderedVideoUrls:", e);
      }
    }

    // New flow: initialize all as "planned"
    const initialStatuses: RenderStatus[] = selectedFinalizedRows.map(
      (_, i) => ({
        index: i,
        status: "planned" as const,
      }),
    );
    setRenderStatuses(initialStatuses);
    if (initialStatuses.length > 0) setSelectedRowIndex(0);
  }, [selectedFinalizedRows]);

  // Poll for render statuses
  const pollJobStatus = useCallback(async (currentJobId: string) => {
    if (pollingRef.current) return;
    pollingRef.current = true;
    setIsPolling(true);

    for (let i = 0; i < MAX_POLLS; i++) {
      if (!pollingRef.current) break;

      await new Promise((resolve) => setTimeout(resolve, POLL_INTERVAL));

      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_APP_V2_API_URL}/v1/creatomate/raw-renders/${currentJobId}`,
          {
            method: "GET",
            headers: {
              "X-User-ID": "cmldx4q5l0000p6qtx4l7yj0r",
              "X-PDCA-Session-ID":
                "139435da-c03c-41c4-9753-8f215b37be67_pdca-1",
            },
          },
        );

        if (!response.ok) {
          console.error("Poll error:", response.status);
          continue;
        }

        const data = await response.json();
        const renders = data.renders || [];

        // Update per-row statuses
        setRenderStatuses((prev) => {
          const updated = [...prev];
          renders.forEach((r: any) => {
            const idx = r.index !== undefined ? r.index : renders.indexOf(r);
            if (idx >= 0 && idx < updated.length) {
              updated[idx] = {
                index: idx,
                status: r.status || updated[idx].status,
                url: r.url || updated[idx].url,
              };
            }
          });
          return updated;
        });

        // Check if all done
        const succeeded = renders.filter(
          (r: any) => r.status === "succeeded",
        ).length;
        const failed = renders.filter((r: any) => r.status === "failed").length;
        const completed = succeeded + failed;
        const total = renders.length;

        if (completed >= total && total > 0) {
          // Store final URLs for backward compat
          const urls = renders
            .filter((r: any) => r.status === "succeeded" && r.url)
            .map((r: any) => r.url);
          localStorage.setItem("renderedVideoUrls", JSON.stringify(urls));
          if (urls[0]) localStorage.setItem("renderedVideoUrl", urls[0]);
          // Clear jobId since polling is done
          localStorage.removeItem("renderJobId");
          break;
        }

        // Check for overall job failure
        if (data.status === "failed") {
          console.error("Job failed:", data.error);
          break;
        }
      } catch (error) {
        console.error("Polling error:", error);
      }
    }

    pollingRef.current = false;
    setIsPolling(false);
  }, []);

  // Start polling when jobId is available and rows are loaded
  useEffect(() => {
    if (jobId && selectedFinalizedRows.length > 0 && !pollingRef.current) {
      pollJobStatus(jobId);
    }

    return () => {
      pollingRef.current = false;
    };
  }, [jobId, selectedFinalizedRows.length, pollJobStatus]);

  // Get selected row's video URL and status
  const selectedRenderStatus =
    selectedRowIndex !== null ? renderStatuses[selectedRowIndex] : undefined;

  return (
    <div className="w-full h-full flex flex-col">
      {/* Header */}
      <div className="px-8 py-5 flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={handleBack}
          className="text-slate-500 hover:text-slate-800"
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
        </div>
      </div>

      {/* Main Two-Panel Layout */}
      {selectedFinalizedRows.length > 0 ? (
        <div className="flex-1 flex gap-6 overflow-hidden px-8 pb-8">
          {/* Left Panel: Table */}
          <div className="flex-1 overflow-auto rounded-xl border border-slate-200 bg-white shadow-sm">
            <GenerationTable
              rows={selectedFinalizedRows}
              renderStatuses={renderStatuses}
              selectedRowIndex={selectedRowIndex}
              onRowSelect={setSelectedRowIndex}
              duration={duration}
            />
          </div>

          {/* Right Panel: Video Preview */}
          <div className="w-[400px] flex-shrink-0 bg-slate-50 rounded-xl border border-slate-200 shadow-sm overflow-auto">
            <VideoPreviewPanel
              videoUrl={selectedRenderStatus?.url}
              orientation={orientation}
              rowIndex={selectedRowIndex}
              status={selectedRenderStatus?.status}
            />
          </div>
        </div>
      ) : (
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center py-10">
            <p className="text-slate-500">動画がありません</p>
            <p className="text-sm text-slate-400 mt-2">
              動画の生成に失敗した可能性があります。もう一度お試しください。
            </p>
            <Button variant="secondary" className="mt-4" onClick={handleBack}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              戻る
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Step5;
