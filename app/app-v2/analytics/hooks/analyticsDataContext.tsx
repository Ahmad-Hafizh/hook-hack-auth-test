"use client";
import { createContext, useContext, useState } from "react";

export interface IAds {
  ad_id: string;
  ad_name: string;
  ad_type: string;
  status: string;
  final_urls: [];
  video_id: string;
  ad_group: {
    id: string;
    name: string;
  };
  campaign: {
    id: string;
    name: string;
  };
  metrics: {
    impressions: number;
    clicks: number;
    cost: number;
    conversions: number;
    video_views: number;
  };
}

const AnalyticsDataContext = createContext({
  ads: [] as IAds[],
  onSetAds: (ads: IAds[]) => {},
});

export default function analyticsDataContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [ads, setAds] = useState<IAds[]>([]);
  const onSetAds = (ads: IAds[]) => {
    setAds(ads);
  };

  return (
    <AnalyticsDataContext.Provider value={{ ads, onSetAds }}>
      {children}
    </AnalyticsDataContext.Provider>
  );
}

export function useAnalyticsDataContext() {
  return useContext(AnalyticsDataContext);
}
