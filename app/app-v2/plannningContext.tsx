"use client";
import { Spinner } from "@/components/ui/spinner";
import callApi from "@/config/axios/axios";

import { useParams, useRouter, usePathname } from "next/navigation";
import React from "react";
import { useState, useEffect } from "react";
import { IMatrix } from "./planning/[sessionId]/what/hooks/planningWhatDataContext";

type SelectedValue = {
  id: string;
  label: string;
  category: string;
  rationale: string;
};

type SelectedTobes = {
  id: string;
  value_id: string;
  value_label: string;
  desire: string;
  old_assumption: string;
  new_assumption: string;
  judgment: string;
  action: string;
};

const PlannningContext = React.createContext({
  step: 1,
  onStep: (step: number) => {},
  page: "",
  onChangePage: (page: string) => {},
  onChangePageAndStep: (page: string, step: number) => {},
  whatType: "" as "scratch" | "skip",
  onSetWhatType: (type: "scratch" | "skip") => {},
});

export default function PlannningContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pagesList = {
    what_scratch: 7,
    what_skip: 2,
    how: 4,
    generation: 0,
  };

  const [step, setStep] = useState(1);
  const [page, setPage] = useState("what_scratch");
  const { sessionId } = useParams();
  const pathname = usePathname();
  const [loading, setLoading] = useState(true);

  // Initialize whatType from localStorage or default to "scratch" (speed mode removed)
  const getInitialWhatType = (): "scratch" | "skip" => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem("planning_what_type");
      if (stored === "scratch" || stored === "skip") {
        return stored;
      }
      // If localStorage has "speed", migrate to "scratch"
      if (stored === "speed") {
        localStorage.setItem("planning_what_type", "scratch");
        return "scratch";
      }
    }
    return "scratch";
  };

  const [whatType, setWhatType] = useState<"scratch" | "skip">(
    getInitialWhatType,
  );

  const getPage = async () => {
    setLoading(true);
    try {
      // For local sessions (created from localStorage), don't auto-redirect - just set defaults
      const isLocalSession = String(sessionId).startsWith("local_") || String(sessionId).startsWith("session_");

      if (isLocalSession) {
        let savedWhatType = localStorage.getItem("planning_what_type") as "scratch" | "skip" | null;
        // Migrate speed to scratch
        if (savedWhatType === "speed" as string) {
          savedWhatType = "scratch";
          localStorage.setItem("planning_what_type", "scratch");
        }
        const type = savedWhatType || "scratch";
        // Map "what" to the proper page key based on whatType
        const savedPage = localStorage.getItem("planning_current_page") || "what_scratch";
        const mappedPage = savedPage === "what" ? `what_${type}` : savedPage;
        setPage(mappedPage);
        setWhatType(type);
        setLoading(false);
        return;
      }

      const { data } = await callApi.post("/app-v2/projects/session/page", {
        sessionId: sessionId,
      });

      setPage(data.page);

      // Speed mode removed - only scratch and skip
      if (data.isHavingCompetitorUrls) {
        setWhatType("skip");
      } else {
        setWhatType("scratch");
      }

      router.replace(`/app-v2/planning/${sessionId}/${data.page}`);
    } catch (error) {
      console.log(error);
      // Fallback for errors - don't redirect
      const savedPage = localStorage.getItem("planning_current_page") || "what_scratch";
      const mappedPage = savedPage === "what" ? "what_scratch" : savedPage;
      setPage(mappedPage);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (sessionId) {
      getPage();
    } else {
      setLoading(false);
    }
  }, [sessionId]);

  // Sync page state with URL path
  useEffect(() => {
    if (!pathname || loading) return;

    const effectiveWhatType = whatType || getInitialWhatType();

    if (pathname.includes("/how")) {
      if (page !== "how") {
        setPage("how");
      }
    } else if (pathname.includes("/generation")) {
      if (page !== "generation") {
        setPage("generation");
      }
    } else if (pathname.includes("/what")) {
      const expectedPage = `what_${effectiveWhatType}`;
      if (page !== expectedPage && page !== "what_scratch" && page !== "what_skip") {
        setPage(expectedPage);
      }
    }
  }, [pathname, loading]);

  // Track if we're doing a coordinated page+step change
  const [skipStepReset, setSkipStepReset] = useState(false);

  const onChangePage = (newPage: string) => {
    setPage(newPage);
    // Save to localStorage
    if (typeof window !== 'undefined') {
      localStorage.setItem("planning_current_page", newPage);
    }
  };

  // Function to change page and step together without auto-reset
  const onChangePageAndStep = (newPage: string, newStep: number) => {
    setSkipStepReset(true);
    setPage(newPage);
    setStep(newStep);
    // Save to localStorage
    if (typeof window !== 'undefined') {
      localStorage.setItem("planning_current_page", newPage);
      localStorage.setItem("planning_current_step", String(newStep));
    }
    // Reset the flag after state updates
    setTimeout(() => setSkipStepReset(false), 0);
  };

  // Reset to step 1 when page changes (unless skipStepReset is true)
  useEffect(() => {
    if (!skipStepReset) {
      setStep(1);
    }
  }, [page, skipStepReset]);

  // onStep with bounds checking
  const onStep = (newStep: number) => {
    const maxSteps = pagesList[page as keyof typeof pagesList] || 7;
    if (newStep >= 1 && newStep <= maxSteps) {
      setStep(newStep);
      // Save to localStorage
      if (typeof window !== 'undefined') {
        localStorage.setItem("planning_current_step", String(newStep));
      }
    }
  };

  const onSetWhatType = (type: "scratch" | "skip") => {
    setWhatType(type);
    // Save to localStorage so it persists across page navigations
    if (typeof window !== 'undefined') {
      localStorage.setItem("planning_what_type", type);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen gap-4">
        <Spinner />
        Loading...
      </div>
    );
  }

  return (
    <PlannningContext.Provider
      value={{
        step,
        onStep,
        page,
        onChangePage,
        onChangePageAndStep,
        whatType,
        onSetWhatType,
      }}
    >
      {children}
    </PlannningContext.Provider>
  );
}

export function usePlannningContext() {
  return React.useContext(PlannningContext);
}
