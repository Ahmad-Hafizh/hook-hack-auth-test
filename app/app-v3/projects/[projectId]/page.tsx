"use client";

import React, { useEffect, useMemo } from "react";
import { PDCATable } from "./components/PDCATable";
import { ArrowLeft, ChevronLeft, ChevronRight, Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import callApi from "@/config/axios/axios";
import LoadingOverlay from "@/components/ui/loading-overlay";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "sonner";

export interface PDCASession {
  id: string;
  status: "in_progress" | "running" | "completed" | "deleted";
  hypotesis: {
    part?: string;
    patterns?: number;
  };
  memo: string;
  step?: number;
  isChoosingSpeed?: boolean;
  isHavingCompetitorUrls?: boolean;
}

const getGenerationStep = (session: PDCASession): number => {
  if (session.isChoosingSpeed) return 6;
  if (session.isHavingCompetitorUrls) return 12;
  return 13;
};

const PDCACycle: React.FC = () => {
  const { projectId } = useParams();
  const router = useRouter();
  const [loading, setLoading] = React.useState(false);
  const [submitLoading, setSubmitLoading] = React.useState(false);
  const [pdcaSessions, setPDCASessions] = React.useState<PDCASession[]>([]);
  const [openModal, setOpenModal] = React.useState(false);
  const [modalSessionId, setModalSessionId] = React.useState<string | null>(
    null,
  );
  const [modal, setModal] = React.useState<"delete" | null>(null);

  const isAddDisabled = useMemo(() => {
    if (pdcaSessions.length === 0) return false;
    const latestSession = pdcaSessions[0];
    if (!latestSession || latestSession.step === undefined) return false;
    const generationStep = getGenerationStep(latestSession);
    return latestSession.step < generationStep;
  }, [pdcaSessions]);

  const onClickCycle = (cycleID: string, status: string) => {
    if (status !== "deleted") {
      router.push(`/app-v3/planning/${cycleID}`);
    } else {
      toast.error("このサイクルは削除されているため、アクセスできません");
    }
  };

  const createPDCASession = async () => {
    try {
      setSubmitLoading(true);
      const { data } = await callApi.post("/app-v3/projects/session/create", {
        projectId,
      });

      if (data) {
        if (data.pdcaSession) {
          setPDCASessions((prev) => [data.pdcaSession, ...prev]);
        }
        toast.success("新しいPDCAサイクルが作成されました");
      }
    } catch (error) {
      console.error("Failed to create session:", error);
    } finally {
      setSubmitLoading(false);
    }
  };

  const deletePDCASession = async (sessionId: string) => {
    try {
      const { status } = await callApi.delete(
        "/app-v3/projects/session/delete",
        {
          data: { sessionId },
        },
      );

      if (status === 200) {
        toast.success("PDCAサイクルが削除されました");
      }
    } catch (error) {
      console.log(error);
      toast.error("PDCAサイクルの削除に失敗しました");
    }
  };

  const getPDCASessions = async () => {
    try {
      setLoading(true);
      const { data } = await callApi.post("/app-v3/projects/session", {
        projectId,
      });

      setPDCASessions(data.pdcaSessions);
    } catch (error) {
      console.error("Error loading sessions:", error);
      setPDCASessions([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getPDCASessions();
  }, []);

  return (
    <>
      <LoadingOverlay
        isVisible={loading || submitLoading}
        message="サイクルを読み込んでいます..."
        showProgress={false}
      />

      <Dialog open={openModal} onOpenChange={setOpenModal}>
        <DialogContent>
          {modal === "delete" && (
            <DialogHeader className="flex flex-col gap-4">
              <DialogTitle>
                PDCAサイクルを削除してもよろしいですか？
              </DialogTitle>
              <DialogDescription className="flex justify-center gap-4">
                <Button
                  variant={"secondary"}
                  type="button"
                  className=""
                  onClick={() => {
                    setModalSessionId(null);
                    setModal(null);
                    setOpenModal(false);
                  }}
                >
                  取り消す
                </Button>
                <Button
                  variant={"destructive"}
                  type="button"
                  className=""
                  onClick={() => deletePDCASession(modalSessionId!)}
                >
                  消去
                </Button>
              </DialogDescription>
            </DialogHeader>
          )}
        </DialogContent>
      </Dialog>

      <main className="flex-1 w-full max-w-6xl mx-auto px-4 py-12 md:px-8 flex flex-col justify-start">
        {/* Header */}
        <div className="mb-8 animate-fade-in-up flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-3">
            <Button
              onClick={() => router.back()}
              variant={"ghost"}
              className="p-0 hover:bg-transparent"
            >
              <ArrowLeft className="w-8 h-8 mt-1" />
            </Button>
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-slate-800">
              PDCAサイクル
            </h1>
          </div>
          <Button
            onClick={createPDCASession}
            className="bg-[#0093b4] hover:bg-[#007a92] text-white font-bold rounded-lg shadow-sm transition-all duration-200 flex items-center gap-2 group disabled:opacity-50"
            disabled={submitLoading || isAddDisabled}
            size={"lg"}
            title={
              isAddDisabled
                ? "前のサイクルが生成ステップに達していません"
                : undefined
            }
          >
            <Plus className="w-5 h-5 text-white group-hover:rotate-90 transition-transform" />
            <span>新しいサイクルを作成</span>
          </Button>
        </div>

        {/* Main Card */}
        <div className="w-full bg-white rounded-xl shadow-sm border border-slate-200 animate-fade-in-up overflow-hidden flex flex-col relative z-0">
          {/* Table */}
          <PDCATable
            cycles={pdcaSessions}
            loading={loading}
            onClick={onClickCycle}
            onHandleDelete={(cycle) => {
              setModal("delete");
              setModalSessionId(cycle.id);
              setOpenModal(true);
            }}
          />

          {/* Pagination */}
          <div className="p-4 border-t border-slate-200 bg-slate-50/20 flex items-center justify-between text-xs text-slate-500">
            <div>全 {pdcaSessions.length} サイクルを表示中</div>
            <div className="flex gap-1">
              <button
                className="px-2 py-1 rounded border border-slate-200 bg-white hover:bg-slate-50 disabled:opacity-50"
                disabled
              >
                <ChevronLeft className="text-[16px] leading-none" />
              </button>
              <button
                className="px-2 py-1 rounded border border-slate-200 bg-white hover:bg-slate-50 disabled:opacity-50"
                disabled
              >
                <ChevronRight className="text-[16px] leading-none" />
              </button>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default PDCACycle;
