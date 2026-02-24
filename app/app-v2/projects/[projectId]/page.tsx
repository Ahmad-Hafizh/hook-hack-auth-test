"use client";

import React, { useEffect } from "react";
import { PDCATable } from "@/components/lp-analyzer/pdca-cycle/PDCATable";
import { ChevronLeft, ChevronRight, Plus, PlusCircle } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import callApi from "@/config/axios/axios";
import { Spinner } from "@/components/ui/spinner";

interface PDCASession {
  id: string;
  status: "in_progress" | "running" | "completed" | "cancelled";
  hypothesis: string;
  memo: string;
}

const PDCACycle: React.FC = () => {
  const { projectId } = useParams();
  const router = useRouter();
  const [loading, setLoading] = React.useState(false);
  const [submitLoading, setSubmitLoading] = React.useState(false);
  const [pdcaSessions, setPDCASessions] = React.useState<PDCASession[]>([]);

  const getLocalStorageKey = () => `pdca_sessions_${projectId}`;

  const onClickCycle = (cycleID: string) => {
    router.push(`/app-v2/planning/${cycleID}`);
  };

  const saveToLocalStorage = (sessions: PDCASession[]) => {
    try {
      localStorage.setItem(getLocalStorageKey(), JSON.stringify(sessions));
    } catch (e) {
      console.error("Failed to save to localStorage:", e);
    }
  };

  const loadFromLocalStorage = (): PDCASession[] => {
    try {
      const saved = localStorage.getItem(getLocalStorageKey());
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      console.error("Failed to load from localStorage:", e);
      return [];
    }
  };

  const createPDCASession = async () => {
    try {
      setSubmitLoading(true);

      // Always create and save to localStorage first
      const newSession: PDCASession = {
        id: `session_${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        status: "in_progress",
        hypothesis: "",
        memo: "",
      };
      const currentSessions = loadFromLocalStorage();
      const updatedSessions = [newSession, ...currentSessions];
      saveToLocalStorage(updatedSessions);

      // Try to sync with DB in background (optional)
      try {
        await callApi.post("/app-v2/projects/session/create", { projectId });
      } catch (apiError) {
        console.log("DB sync failed, using localStorage only:", apiError);
      }

      router.push(`/app-v2/planning/${newSession.id}`);
    } catch (error) {
      console.error("Failed to create session:", error);
    } finally {
      setSubmitLoading(false);
    }
  };

  const getPDCASessions = async () => {
    try {
      setLoading(true);

      // Always read from localStorage first
      const localSessions = loadFromLocalStorage();
      setPDCASessions(localSessions);

      // Try to sync with DB in background (optional)
      try {
        const { data } = await callApi.post("/app-v2/projects/session", {
          projectId,
        });

        // Merge API sessions with local sessions (local takes priority)
        const apiSessions: PDCASession[] = data.pdcaSessions || [];
        const localIds = new Set(localSessions.map((s) => s.id));
        const mergedSessions = [
          ...localSessions,
          ...apiSessions.filter((s) => !localIds.has(s.id)),
        ];

        setPDCASessions(mergedSessions);
        saveToLocalStorage(mergedSessions);
      } catch (apiError) {
        console.log("DB sync failed, using localStorage only:", apiError);
      }
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
    <main className="flex-1 w-full max-w-6xl mx-auto px-4 py-12 md:px-8 flex flex-col justify-start">
      {/* Header */}
      <div className="mb-8 animate-fade-in-up flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-slate-800">
          PDCAサイクル
        </h1>
        <button
          onClick={createPDCASession}
          className="bg-[#0093b4] hover:bg-[#007a92] text-white font-bold py-2.5 px-6 rounded-lg shadow-sm transition-all duration-200 flex items-center gap-2 group"
          disabled={submitLoading}
        >
          {submitLoading ? (
            <>
              <Spinner className="w-5 h-5 text-white" />
              <span>読み込み中...</span>
            </>
          ) : (
            <>
              <Plus className="w-5 h-5 text-white group-hover:rotate-90 transition-transform" />
              <span>新しいサイクルを作成</span>
            </>
          )}
        </button>
      </div>

      {/* Main Card */}
      <div className="w-full bg-white rounded-xl shadow-sm border border-slate-200 animate-fade-in-up overflow-hidden flex flex-col relative z-0">
        {/* Table */}
        <PDCATable
          cycles={pdcaSessions}
          loading={loading}
          onClick={onClickCycle}
        />

        {/* Pagination */}
        <div className="p-4 border-t border-slate-200 bg-slate-50/20 flex items-center justify-between text-xs text-slate-500">
          <div>全 {pdcaSessions.length} 件中 1–5 件を表示 </div>
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
  );
};

export default PDCACycle;
