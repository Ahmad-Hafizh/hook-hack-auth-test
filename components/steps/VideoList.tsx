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
      <div className="overflow-x-auto w-full">
        <table className="min-w-full border-separate border-spacing-y-3">
          <thead>
            <tr>
              <th className="px-2 py-1 border">番号</th>
              <th className="px-2 py-1 border">いいね数</th>
              <th className="px-2 py-1 border">リンク</th>
              <th className="px-2 py-1 border">Who</th>
              <th className="px-2 py-1 border">What</th>
              <th className="px-2 py-1 border">How</th>
              <th className="px-2 py-1 border">Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((video, idx) => (
              <tr key={video.url}>
                <td className="px-2 py-1 border">#{video.number}</td>
                <td className="px-2 py-1 border">{video.like}</td>
                <td className="px-2 py-1 border">
                  <a href={video.url} target="_blank" rel="noopener noreferrer">
                    www.tiktok
                  </a>
                </td>
                <td className="px-2 py-1 border">
                  {/* who info here if available */}
                </td>
                <td className="px-2 py-1 border">
                  {/* what info here if available */}
                </td>
                <td className="px-2 py-1 border">
                  {/* how info here if available */}
                </td>
                <td className="px-2 py-1 border">
                  <Button
                    className="bg-[#E6E6FA] text-[#433D8B] px-4 py-1 rounded-full"
                    onClick={() => onSelectVideo(video)}
                  >
                    Use
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
