"use client";
import { Spinner } from "@/components/ui/spinner";
import callApi from "@/config/axios/axios";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect } from "react";

const PlanningSessionLayout = ({ children }: { children: React.ReactNode }) => {
  const { sessionId } = useParams();
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState(true);

  const getPage = async () => {
    setIsLoading(true);
    try {
      const { data } = await callApi.get(
        `/app-v2/planning/page?sessionId=${sessionId}`
      );

      router.replace(
        `/app-v2/planning/${sessionId}/${data.page.split("_")[0]}`
      );
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getPage();
  }, []);

  if (isLoading) {
    return (
      <div className="w-full h-screen flex items-center justify-center gap-2">
        <Spinner className="w-4 h-4" />
        Loading...
      </div>
    );
  }
  return <>{children}</>;
};

export default PlanningSessionLayout;
