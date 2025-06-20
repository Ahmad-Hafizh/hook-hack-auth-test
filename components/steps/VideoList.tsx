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
  {
    tiktok_url: "https://www.tiktok.com/@example/video/123",
    like: 2000,
    analyse:
      "東京の美容室で話題の眉毛ペンシルを紹介。石原さとみがアシスタントに列を作らせてまで買わせたというエピソードを交え、商品の特長を紹介。セールスポイントは、ウォータープルーフで汗にも強く、24時間落ちないこと。アイライン、ヘアライン、つけまつげにも使える。",
    storage_url:
      "https://res.cloudinary.com/dyyaw3qpo/video/upload/v1749447045/jqkzecy60srcf0whcxyw.mp4",
    id: "123",
  },
  {
    tiktok_url: "https://www.tiktok.com/@example/video/456",
    like: 225,
    analyse:
      "子供の肌の乾燥に悩む母親がアトピロンボディソープを試したところ、乾燥肌が改善された様子を紹介",
    storage_url:
      "https://res.cloudinary.com/dyyaw3qpo/video/upload/v1749447103/mq1t1ear2bdd7xkrgh8h.mp4",
    id: "456",
  },
  {
    tiktok_url: "https://www.tiktok.com/@example/video/789",
    like: 271,
    analyse:
      "眉毛ブリーチのやり方を説明する動画。眉毛ブリーチで眉を明るくすることで垢ぬけ感を出せることを伝えている。",
    storage_url:
      "https://res.cloudinary.com/dyyaw3qpo/video/upload/v1749447161/ggygrtwfbsulxwjhom0x.mp4",
    id: "789",
  },
  {
    tiktok_url: "https://www.tiktok.com/@example/video/101",
    like: 451,
    analyse:
      "Aurelie.のクレンジングオイルが、毛穴の角栓を溶かして、たまご肌になると訴求。MEGUMIさんもおすすめしており、通常8000円するところ、20分間限定で48%OFFになる。",
    storage_url:
      "https://res.cloudinary.com/dyyaw3qpo/video/upload/v1749447252/gszjzj8rm7gvnapvn9da.mp4",
    id: "101",
  },
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
      if (userInputData?.searchword) {
        try {
          const res = await fetchVideoList(userInputData.searchword, 10);
          if (res.success) {
            setVideoListData(res.data);
            setData(res.data);
          } else {
            console.log("API call was not successful. Using mock data.");
            setVideoListData(mockData);
            setData(mockData);
          }
        } catch (err) {
          console.log("ERROR : ", err);
          setVideoListData(mockData);
          setData(mockData);
        }
      }
    };
    getVideos();
  }, [userInputData?.searchword]);

  return (
    <div className="w-full flex flex-col items-center">
      <h2 className="text-xl font-semibold mb-6">
        参考にしたい動画を選択してください。
      </h2>
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-5 gap-y-5">
        {data.map((video, idx) => (
          <div
            key={video.tiktok_url}
            className="bg-white border rounded-lg shadow-md flex flex-col p-4 min-w-[250px] max-w-3xl mx-auto"
          >
            {/* Video Placeholder */}
            <div className="w-full h-96 bg-gray-200 flex items-center justify-center rounded mb-3">
              {video.storage_url ? (
                <video
                  src={video.storage_url}
                  controls
                  className="w-full h-full object-cover rounded"
                />
              ) : (
                <span className="text-gray-500">video</span>
              )}
            </div>
            {/* Likes */}
            <div className="flex items-center mb-2">
              <span className="text-pink-500 mr-1">❤</span>
              <span className="text-sm font-medium">
                {video.like?.toLocaleString()} いいね
              </span>
            </div>
            {/* About the video (what & who) */}
            <div className="bg-gray-100 rounded p-3 text-xs text-gray-700 mb-3 h-full">
              <h2 className="font-semibold mb-2">サマリー</h2>
              <h2>{video.analyse || "No description available."}</h2>
            </div>
            {/* Use Button */}
            <Button
              className="bg-[#E6E6FA] text-[#433D8B] px-4 py-1 rounded"
              onClick={() => onSelectVideo(video)}
            >
              選択
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};
