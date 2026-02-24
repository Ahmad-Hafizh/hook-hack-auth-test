"use client";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import callApi from "@/config/axios/axios";
import { useQuery } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect } from "react";

const HandlerPage = () => {
  const searchParams = useSearchParams();
  const [statusPage, setStatusPage] = React.useState<
    "error" | "progress" | null
  >(null);
  const router = useRouter();
  const [progressEvent, setProgressEvent] = React.useState<string | null>(null);
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);

  useEffect(() => {
    const status = searchParams.get("status");
    if (status === "error") {
      setStatusPage("error");
      const message = searchParams.get("message");
      if (message) {
        setErrorMessage(message);
      }
    } else if (status === "progress") {
      setStatusPage("progress");
      const event = searchParams.get("event");
      if (event) {
        setProgressEvent(event);
      } else {
        setProgressEvent("Processing your authentication. Please wait...");
      }
    } else if (status === "success") {
      setStatusPage(null);
      router.push("/dashboard"); // Redirect to the desired page after successful authentication
    }
  }, [searchParams, router]);

  const getMCCLinkingStatus = async () => {
    const { data } = await callApi.get("/app-v3/auth/google-ads/mcc-status");
    return data;
  };

  const { data: jobResult } = useQuery<{
    detail: {
      status: string;
      message?: string;
      manager_customer_id?: string;
      client_customer_id?: string;
      error?: string;
    };
  }>({
    queryKey: ["mcc-linking-status"],
    queryFn: getMCCLinkingStatus,
    enabled: statusPage === "progress" && progressEvent === "linking-mcc",

    refetchInterval: (query) => {
      const status = query.state.data?.detail?.status;
      if (
        status === "pending" ||
        status === "running" ||
        status === "linking"
      ) {
        return 5000; // Refetch every 5 seconds if the job is still pending
      }
      return false; // Stop refetching if the job is completed or failed
    },
  });

  useEffect(() => {
    if (!jobResult) return;

    const status = jobResult.detail?.status;

    if (status === "completed" || status === "done") {
      router.push("/dashboard");
    } else if (status === "failed") {
      setStatusPage("error");
      setErrorMessage(
        jobResult.detail.error ||
          "An error occurred during MCC linking. Please try again.",
      );
    } else if (jobResult.detail?.error) {
      setStatusPage("error");
      setErrorMessage(
        jobResult.detail.message ||
          jobResult.detail.error ||
          "An error occurred during MCC linking. Please try again.",
      );
    }
  }, [jobResult, router]);

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center">
      {statusPage === "progress" ? (
        <div className="flex flex-col gap-4 items-center justify-center">
          <Spinner className="w-4 h-4" />
          <p>
            {progressEvent === "linking-mcc"
              ? "Linking your MCC account. Please wait..."
              : progressEvent ||
                "Processing your authentication. Please wait..."}
          </p>
        </div>
      ) : statusPage === "error" ? (
        <div className="flex flex-col items-center justify-center gap-4">
          <p>
            {errorMessage ||
              "An error occurred during authentication. Please try again."}
          </p>
          <Button onClick={() => router.push("/")} className="mt-4">
            Go Back to Home
          </Button>
        </div>
      ) : (
        <div>Redirecting...</div>
      )}
    </div>
  );
};

export default HandlerPage;
