"use client";
import { Spinner } from "@/components/ui/spinner";
import callApi from "@/config/axios/axios";

import { useParams, useRouter } from "next/navigation";
import React from "react";
import { useState, useEffect } from "react";

const PlannningContext = React.createContext({
  step: 1,
  onStep: (step: number) => {},
  page: "",
  onChangePage: (page: string) => {},
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
  const [loading, setLoading] = useState(true);

  const getPage = async () => {
    setLoading(true);
    try {
      const { data } = await callApi.get(
        `/app-v2/planning/what?sessionId=${sessionId}`
      );

      if (data.page.startsWith("what")) {
        setPage(data.page);
        router.replace(
          `/app-v2/planning/${sessionId}/${data.page.split("_")[0]}`
        );
      } else {
        setPage(data.page);
        router.replace(`/app-v2/planning/${sessionId}/${data.page}`);
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

  const onChangePage = (newPage: string) => {
    setPage(newPage);
  };

  // Reset to step 1 when page changes
  useEffect(() => {
    setStep(1);
  }, [page]);

  // onStep with bounds checking
  const onStep = (newStep: number) => {
    if (newStep >= 1 && newStep <= pagesList[page as keyof typeof pagesList]) {
      setStep(newStep);
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
    <PlannningContext.Provider value={{ step, onStep, page, onChangePage }}>
      {children}
    </PlannningContext.Provider>
  );
}

export function usePlannningContext() {
  return React.useContext(PlannningContext);
}
