"use client";

import { useState, useEffect, useCallback } from "react";
import {
  SubscriptionState,
  EMPTY_SUBSCRIPTION,
} from "@/lib/stripe/subscription";

export function useSubscription() {
  const [subscription, setSubscription] =
    useState<SubscriptionState>(EMPTY_SUBSCRIPTION);
  const [isLoading, setIsLoading] = useState(true);

  const fetchSubscription = useCallback(async () => {
    try {
      setIsLoading(true);
      const res = await fetch("/api/stripe/subscription", { credentials: "include" });
      if (!res.ok) throw new Error("Failed to fetch subscription");
      const data: SubscriptionState = await res.json();
      setSubscription(data);
    } catch (error) {
      console.error("Error fetching subscription:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSubscription();
  }, [fetchSubscription]);

  return { subscription, isLoading, refresh: fetchSubscription };
}
