"use client";
import LoadingOverlay from "@/components/ui/loading-overlay";
import callApi from "@/config/axios/axios";
import { useParams } from "next/navigation";
import React from "react";
import { useState, useEffect } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircleIcon } from "lucide-react";

const PlannningContext = React.createContext({
  step: 1,
  whatType: "" as "scratch" | "skip" | "speed",
  onSetWhatType: (type: "scratch" | "skip" | "speed") => {},
  onDbStep: (newStep: number, sessionId: string) => {},
});

export default function PlannningContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [step, setStep] = useState(1);
  const { sessionId } = useParams();
  const [loading, setLoading] = useState(true);
  const [whatType, setWhatType] = useState<"scratch" | "skip" | "speed">(
    "scratch",
  );

  const totalList = whatType === "scratch" ? 13 : whatType === "skip" ? 12 : 0;

  const getPage = async () => {
    setLoading(true);
    try {
      const { data } = await callApi.post("/app-v2/projects/session/page", {
        sessionId: sessionId,
      });

      setStep(data.step);

      if (data.isChoosingSpeed) {
        setWhatType("speed");
      } else if (data.isHavingCompetitorUrls) {
        setWhatType("skip");
      } else {
        setWhatType("scratch");
      }
    } catch (error) {
      console.log(error);
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

  const onDbStep = async (newStep: number, sessionId: string) => {
    if (newStep < 1 || newStep > totalList) {
      setStep(1);
    }
    try {
      setLoading(true);
      await callApi.post("/app-v2/projects/session/step", {
        sessionId: sessionId,
        step: newStep,
      });
      setStep(newStep);
    } catch (error) {
      console.log("Failed to update step in DB:", error);
    } finally {
      setLoading(false);
    }
  };

  const onSetWhatType = (type: "scratch" | "skip" | "speed") => {
    setWhatType(type);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen gap-4">
        <LoadingOverlay
          isVisible={true}
          message="セッション情報を読み込んでいます"
          showProgress={false}
        />
      </div>
    );
  }

  return (
    <PlannningContext.Provider
      value={{
        step,
        whatType,
        onSetWhatType,
        onDbStep,
      }}
    >
      {children}
    </PlannningContext.Provider>
  );
}

export function usePlannningContext() {
  return React.useContext(PlannningContext);
}
