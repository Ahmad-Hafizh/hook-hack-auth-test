"use client";

import { motion } from "framer-motion";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Settings, Bell, Globe, Palette } from "lucide-react";
import VideoRow from "../VideoRow";
import { useState, useEffect } from "react";
import callApi from "@/config/axios/axios";
import axios from "axios";
import { Button } from "@/components/ui/button";

interface SampleProps {
  data: any;
  updateData: (data: any) => void;
  onAnalyzeStructure?: (video: any) => void;
  personaResult?: any;
}

export function Sample({
  data,
  updateData,
  onAnalyzeStructure,
  personaResult,
}: SampleProps) {
  const [loading, setLoading] = useState(true);
  const [dotCount, setDotCount] = useState(1);
  const [sampleData, setSampleData] = useState<any>([]);
  const [error, setError] = useState<string | null>(null);

  // console.log("INID DATA : ", data)

  const payload = {
    category: data.category,
    age: data.age,
    gender: data.gender,
  };

  const callingApi = async () => {
    setError(null);
    try {
      const response = await axios.post("/api/sample", data);
      console.log(response.data);
      setSampleData(response.data.results);
    } catch (err: any) {
      setError(
        "サンプルデータの読み込みに失敗しました。" +
          (err?.message || "Unknown error")
      );
    }
  };

  useEffect(() => {
    setLoading(true);
    setSampleData([]);
    setDotCount(1);
    setError(null);
    callingApi().finally(() => setLoading(false));
    const dotInterval = setInterval(() => {
      setDotCount((prev) => (prev % 3) + 1);
    }, 400);
    return () => {
      clearInterval(dotInterval);
    };
  }, [data]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[40vh]  rounded-2xl">
        <div className="flex flex-col items-center gap-4">
          {/* <div className="w-12 h-12 border-4 border-[#433D8B] border-t-transparent rounded-full animate-spin" /> */}
          <img src="/pedropedro.gif" className="w-20 h-20" />
          <div className="text-lg text-[#433D8B] font-semibold">
            サンプル動画を出力中🏋️
            {".".repeat(dotCount)}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[40vh] rounded-2xl">
        <div className="text-lg text-[#433D8B font-semibold mb-2">{error}</div>
        <Button onClick={callingApi} className="bg-[#2E236C] text-white mt-2">
          再試行
        </Button>
      </div>
    );
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="w-full flex flex-col gap-10 items-center justify-center py-8">
      {sampleData.map((video: any, idx: number) => (
        <VideoRow
          key={idx}
          likes={video.scraping_likes}
          cvr={video.scraping_cvr_top}
          shares={video.scraping_shares}
          comments={video.scraping_comments}
          summary={video.video_content_summary}
          thumbnail={video.thumbnail}
          videoUrl={video.video_url}
          onAnalyzeComplete={() => onAnalyzeStructure?.(video)}
        />
      ))}
    </div>
  );
}
