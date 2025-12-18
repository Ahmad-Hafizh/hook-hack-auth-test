import { useState, useCallback } from "react";
import callAppV2Api from "@/config/axios/axiosAppV2";

interface GoogleAdsOAuthResult {
  success: boolean;
  error?: string;
  customerIds?: string[];
}

export function useGoogleAdsOAuth() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const connectGoogleAds = useCallback(
    async (userId: string): Promise<GoogleAdsOAuthResult> => {
      setIsLoading(true);
      setError(null);

      try {
        // Get OAuth URL from backend
        const { data } = await callAppV2Api.get("/v1/google-ads/oauth-url", {
          params: {
            "X-User-id": userId,
          },
        });

        if (!data.url) {
          throw new Error("Failed to get OAuth URL");
        }

        // Open OAuth in popup window
        const width = 600;
        const height = 700;
        const left = window.screenX + (window.outerWidth - width) / 2;
        const top = window.screenY + (window.outerHeight - height) / 2;

        const popup = window.open(
          data.url,
          "Google Ads OAuth",
          `width=${width},height=${height},left=${left},top=${top},toolbar=no,menubar=no,location=no`
        );

        if (!popup) {
          throw new Error("Popup blocked. Please allow popups for this site.");
        }

        // Listen for postMessage from popup
        return new Promise<GoogleAdsOAuthResult>((resolve) => {
          const handleMessage = (event: MessageEvent) => {
            // Verify message is from OAuth flow
            if (event.data?.type === "google-ads-oauth") {
              // Clean up
              window.removeEventListener("message", handleMessage);
              popup.close();
              setIsLoading(false);

              if (event.data.status === "success") {
                resolve({
                  success: true,
                  customerIds: event.data.customerIds,
                });
              } else {
                const errorMsg = event.data.error || "Unknown error";
                setError(errorMsg);
                resolve({
                  success: false,
                  error: errorMsg,
                });
              }
            }
          };

          window.addEventListener("message", handleMessage);

          // Check if popup was closed manually
          const checkClosed = setInterval(() => {
            if (popup.closed) {
              clearInterval(checkClosed);
              window.removeEventListener("message", handleMessage);
              setIsLoading(false);
              setError("OAuth cancelled by user");
              resolve({
                success: false,
                error: "OAuth cancelled by user",
              });
            }
          }, 500);
        });
      } catch (err) {
        const errorMsg =
          err instanceof Error ? err.message : "Failed to connect Google Ads";
        setError(errorMsg);
        setIsLoading(false);
        return {
          success: false,
          error: errorMsg,
        };
      }
    },
    []
  );

  return {
    connectGoogleAds,
    isLoading,
    error,
  };
}
