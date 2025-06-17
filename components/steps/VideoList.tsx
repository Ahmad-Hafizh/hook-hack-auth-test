"use client";
import React, { useEffect, useState } from "react";
import callApi from "@/config/axios/axios";
import { Button } from "@/components/ui/button";

interface VideoListProps {
  userInputData: any;
  setVideoListData: (data: any[]) => void;
  onSelectVideo: (video: any) => void;
}

const fetchVideoList = async (searchword: string, amount: number = 10) => {
  console.log("calling api");
  const payload = {
    input: {
      demo: true,
      searchword,
      amount,
    },
  };
  const response = await callApi.post("/scrape-list", payload);
  console.log("INI RESPONSE DATA:", response);
  return response.data;
};

const mockData = [
  { url: "https://www.tiktok.com/@example/video/123", like: 389000, number: 1 },
  { url: "https://www.tiktok.com/@example/video/456", like: 12000, number: 2 },
  { url: "https://www.tiktok.com/@example/video/789", like: 5400, number: 3 },
  { url: "https://www.tiktok.com/@example/video/101", like: 3200, number: 4 },
  { url: "https://www.tiktok.com/@example/video/102", like: 2100, number: 5 },
];

export const VideoList: React.FC<VideoListProps> = ({
  userInputData,
  setVideoListData,
  onSelectVideo,
}) => {
  const [data, setData] = useState<any[]>([]);
  useEffect(() => {
    console.log("userInputData", userInputData);
    const getVideos = async () => {
      if (userInputData) {
        try {
          const res = await fetchVideoList(userInputData, 10);
          if (res.success) {
            setVideoListData(res.data);
            setData(res.data);
          }
        } catch (err) {
          console.log("ERROR : ", err);
          setVideoListData(mockData);
          setData(mockData);
        }
      }
    };
    getVideos();
  }, [userInputData.searchword]);

  return (
    <div className="w-full flex flex-col items-center">
      <h2 className="text-xl font-semibold mb-6">List of Videos</h2>
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-5 gap-y-5">
        {data.map((video, idx) => (
          <div
            key={video.url}
            className="bg-white border rounded-lg shadow-md flex flex-col p-4 min-w-[250px] max-w-3xl mx-auto"
          >
            {/* Video Placeholder */}
            <div className="w-full h-80 bg-gray-200 flex items-center justify-center rounded mb-3">
              <span className="text-gray-500">video</span>
            </div>
            {/* Likes */}
            <div className="flex items-center mb-2">
              <span className="text-pink-500 mr-1">❤</span>
              <span className="text-sm font-medium">
                {video.like.toLocaleString()} Likes
              </span>
            </div>
            {/* About the video (what & who) */}
            <div className="bg-gray-100 rounded p-3 text-xs text-gray-700 mb-3">
              <h2 className="font-semibold mb-2">About the video</h2>
              <h2>
                This is the sample text for the description, the what, and the
                who of the video.
              </h2>
            </div>
            {/* Use Button */}
            <Button
              className="bg-[#E6E6FA] text-[#433D8B] px-4 py-1 rounded"
              onClick={() => onSelectVideo(video)}
            >
              Use
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};
