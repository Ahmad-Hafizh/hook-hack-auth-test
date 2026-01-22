"use client";
import { createContext } from "react";

interface IAds {
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

const analyticsDataContext = createContext({
  ads: [],
});

export const analyticsDataContextProvider = () => {};
