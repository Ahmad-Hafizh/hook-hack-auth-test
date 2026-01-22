"use client";

import { useState } from "react";
import { useGoogleAdsOAuth } from "@/hooks/use-google-ads-oauth";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

interface GoogleAdsConnectButtonProps {
  userId: string;
  onSuccess?: () => void;
  onError?: (error: string) => void;
}

export function GoogleAdsConnectButton({
  userId,
  onSuccess,
  onError,
}: GoogleAdsConnectButtonProps) {
  const { connectGoogleAds, isLoading, error } = useGoogleAdsOAuth();
  const [showError, setShowError] = useState(false);

  const handleConnect = async () => {
    const result = await connectGoogleAds(userId);

    if (result.success) {
      onSuccess?.();
    } else {
      setShowError(true);
      onError?.(result.error || "Failed to connect");
      // Auto-hide error after 5 seconds
      setTimeout(() => setShowError(false), 5000);
    }
  };

  return (
    <div className="space-y-2">
      <Button onClick={handleConnect} disabled={isLoading}>
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Connecting...
          </>
        ) : (
          "Connect Google Ads"
        )}
      </Button>

      {showError && error && (
        <div className="text-sm text-red-600 bg-red-50 p-3 rounded-md">
          {error}
        </div>
      )}
    </div>
  );
}
