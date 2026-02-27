"use client";
import React, { useState, useCallback, useEffect, useRef } from "react";
import { useParams } from "next/navigation";
import { ServiceTable } from "./components/ServiceTable";
import { SelectionCounter } from "./components/SelectionCounter";
import { Button } from "@/components/ui/button";
import { ArrowRight, Plus } from "lucide-react";
import LoadingOverlay from "@/components/ui/loading-overlay";
import { usePlanningWhatDataContext } from "../../context/planningWhatDataContext";
import callApi from "@/config/axios/axios";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { errorToastCaller } from "../../components/toastCaller";

interface ServiceListPageProps {
  onBack?: () => void;
  onNext?: () => void;
}

const WebsiteSelectionPage = ({
  onPrev,
  onNext,
}: {
  onNext: () => void;
  onPrev?: () => void;
}) => {
  const [submitting, setSubmitting] = useState(false);
  const [regenerating, setRegenerating] = useState(false);
  const { sessionId } = useParams();
  const [selectedIds, setSelectedIds] = useState<string[]>([]); // stores _uid values
  const { onSetCompetitiveMatrix, candidates, onSetCandidates } =
    usePlanningWhatDataContext();
  const [showDialog, setShowDialog] = useState(false);
  const serviceNameRef = React.useRef<HTMLInputElement>(null);
  const serviceUrlRef = React.useRef<HTMLInputElement>(null);
  const [addingCompetitor, setAddingCompetitor] = useState(false);
  const uidCounter = useRef(0);

  // Assign a unique _uid to each candidate that doesn't already have one
  const assignUids = (items: any[]) =>
    items.map((c: any) => ({
      ...c,
      _uid: c._uid || `uid-${++uidCounter.current}`,
    }));

  const handleSelectionChange = useCallback((newSelection: string[]) => {
    setSelectedIds(newSelection);
  }, []);

  const onSubmit = async () => {
    try {
      setSubmitting(true);
      // Map _uid selections back to URLs for the backend
      const selectedUrls = selectedIds
        .map((uid) => candidates.find((c) => c._uid === uid)?.url)
        .filter(Boolean);
      // Strip _uid before sending to backend
      const cleanCandidates = candidates.map(({ _uid, ...rest }) => rest);
      const { data } = await callApi.post("/app-v3/planning/what/step2", {
        sessionId,
        selectedIds: selectedUrls,
        candidates: cleanCandidates,
        step: 4,
      });

      if (data && data.key_message) {
        onSetCompetitiveMatrix(data.key_message);
        onNext();
      }
    } catch (error: any) {
      errorToastCaller(error);
    } finally {
      setSubmitting(false);
    }
  };

  const onRegenerate = async () => {
    try {
      setRegenerating(true);
      const { data } = await callApi.post("/app-v3/planning/what/step2/fetch", {
        sessionId,
      });

      if (data) {
        const loadedCandidates = data.candidates || [];
        if (loadedCandidates.length > 0) {
          const withUids = assignUids(loadedCandidates);
          onSetCandidates(withUids);

          // Convert backend URL selections to _uid selections
          // Match each selected URL to one candidate (first unused match)
          if (data.selected_competitor_candidates?.length > 0) {
            const usedUids = new Set<string>();
            const uidSelections: string[] = [];
            for (const url of data.selected_competitor_candidates) {
              const match = withUids.find(
                (c: any) => c.url === url && !usedUids.has(c._uid),
              );
              if (match?._uid) {
                uidSelections.push(match._uid);
                usedUids.add(match._uid);
              }
            }
            setSelectedIds(uidSelections);
          }
        }
      }
    } catch (error: any) {
      errorToastCaller(error);
    } finally {
      setRegenerating(false);
    }
  };

  const onAddCompetitor = async () => {
    const newUrl = serviceUrlRef.current?.value?.trim() || "";
    const newName = serviceNameRef.current?.value?.trim() || "";

    setAddingCompetitor(true);
    const newCandidate = {
      company_name: newName || "New Competitor",
      head_company: newName || "New Competitor",
      hero_text: {
        headline: "",
        subhead: "",
        cta: "",
      },
      name: newName || "New Competitor",
      reason: "",
      service_name: newName || "New Competitor",
      source: "web_search",
      title: "",
      url: newUrl || "https://example.com",
      _uid: `uid-${++uidCounter.current}`,
    };

    try {
      // Fire API call to persist — strip _uid before sending
      const { _uid, ...cleanCandidate } = newCandidate;
      await callApi.post("/app-v3/planning/what/step2/add", {
        sessionId,
        newCandidate: cleanCandidate,
      });

      // Prepend new candidate to existing list — keeps all existing _uids intact
      onSetCandidates([newCandidate, ...candidates]);
    } catch (error) {
      errorToastCaller(error);
    } finally {
      setAddingCompetitor(false);
      serviceNameRef.current!.value = "";
      serviceUrlRef.current!.value = "";
      setShowDialog(false);
    }
  };

  useEffect(() => {
    onRegenerate();
  }, []);

  if (regenerating) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center">
        <LoadingOverlay
          isVisible={regenerating}
          message={"データを再生成中..."}
          showProgress={false}
        />
      </div>
    );
  }

  return (
    <>
      {/* Loading Overlay with SSE Progress */}
      <LoadingOverlay
        isVisible={submitting || addingCompetitor}
        message={"データを分析中..."}
        showProgress={false}
      />

      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="pb-4 mb-4 border-b">
              新しい競争相手を追加する
            </DialogTitle>
            <DialogDescription className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <Label htmlFor="service-name" className="text-xs font-sm">
                  サービス名
                </Label>
                <Input
                  id="service-name"
                  placeholder="Apple"
                  ref={serviceNameRef}
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="service-url" className="text-xs font-sm">
                  サービスURL
                </Label>
                <Input
                  id="service-url"
                  placeholder="https://www.apple.com"
                  ref={serviceUrlRef}
                />
              </div>
              <Button
                className=""
                variant={"default"}
                onClick={onAddCompetitor}
                disabled={addingCompetitor}
              >
                追加
              </Button>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>

      <div className="flex-1 w-full max-w-[1400px] mx-auto px-6 py-4 flex flex-col">
        <div className="mb-4 animate-fade-in-up flex justify-between items-end">
          <div className="">
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight mb-2 text-slate-800">
              4. ベンチマーク選択
            </h1>
            <p className="text-black text-lg">
              参考に​したい​ベンチマークを​選択してください
            </p>
          </div>

          <div className="flex flex-row items-end gap-2">
            <Button
              variant={"default"}
              onClick={() => setShowDialog((prev) => !prev)}
            >
              <Plus className="w-4 h-4" />
              新しい競争相手を追加する
            </Button>
            <SelectionCounter
              selectedCount={selectedIds.length}
              totalCount={3}
              className="text-sm py-2"
            />
          </div>
        </div>

        <ServiceTable
          data={candidates}
          selectedIds={selectedIds}
          onSelectionChange={handleSelectionChange}
          className="min-h-[460px] max-h-[calc(100vh-320px)]"
        />

        <div className="flex justify-end mt-10 pt-6 border-t border-slate-100 gap-4">
          <Button
            variant={"secondary"}
            className="px-6 py-2.5 rounded-lg text-slate-500 font-semibold hover:text-slate-800 hover:bg-slate-100"
            onClick={onPrev}
            // disabled={submitting}
          >
            戻る
          </Button>
          <Button
            className="bg-[#0093b4] hover:bg-[#007a92] px-8 py-2.5 rounded-lg font-semibold shadow-sm"
            disabled={submitting}
            onClick={onSubmit}
          >
            次に進む <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </>
  );
};

export default WebsiteSelectionPage;
