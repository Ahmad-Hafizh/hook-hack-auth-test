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
    tiktok_url: "https://www.tiktok.com/@ddden49/video/7094935536153988353",
    like: 389000,
    analyse:
      "日焼け止めを20個試した女性が、顔に塗ると肌が白くなるビオレUVアクアリッチの魅力を伝えている。",
    storage_url:
      "https://res.cloudinary.com/dyyaw3qpo/video/upload/v1750152954/gietrjrzsvih01i2ckjy.mp4",
    id: "7094935536153988353",
  },
  {
    tiktok_url:
      "https://www.tiktok.com/@ayami_yamichan/video/6971361926592924929",
    like: 237400,
    analyse:
      "20〜30代女性へ、日焼け止めクリームの正しい塗り方を解説し、紫外線対策の重要性を訴求する短尺広告動画。",
    storage_url:
      "https://res.cloudinary.com/dyyaw3qpo/video/upload/v1750152967/ugz1acaqy9zbpo2xlxxk.mp4",
    id: "6971361926592924929",
  },
  {
    tiktok_url:
      "https://www.tiktok.com/@tantei_cosme/video/7255979521478823169",
    like: 122200,
    analyse:
      "ビオレUVアクアリッチが日焼け止めとして何回使えるのかを、実演形式で検証し、商品の魅力を伝える動画。",
    storage_url:
      "https://res.cloudinary.com/dyyaw3qpo/video/upload/v1750152985/hhwlo7alzmkgluo89pbh.mp4",
    id: "7255979521478823169",
  },
  {
    tiktok_url:
      "https://www.tiktok.com/@yokoyamaamane/video/7123899637299268865",
    like: 101100,
    analyse:
      "日焼け止めを塗るのが面倒なズボラ女子へ、ポンプ式の日焼け止めを薦め、持ち運び用と据え置き用で二個持ちを推奨。",
    storage_url:
      "https://res.cloudinary.com/dyyaw3qpo/video/upload/v1750153003/f4kdq9pm8wbqit56hu6o.mp4",
    id: "7123899637299268865",
  },
  {
    tiktok_url: "https://www.tiktok.com/@gimihpxgwnx/video/7399960692142525704",
    like: 66800,
    analyse:
      "韓国人が日本人に「肌が黒すぎる」と感じる理由と、韓国アイドルが使う美白サプリをイエベ日本人に紹介する動画。",
    storage_url:
      "https://res.cloudinary.com/dyyaw3qpo/video/upload/v1750153018/brct8ywptqwwv7sfb66h.mp4",
    id: "7399960692142525704",
  },
  {
    tiktok_url: "https://www.tiktok.com/@nazo111111/video/7233339925830044929",
    like: 57300,
    analyse:
      "日焼け止めを探す人に、大容量の日焼け止めがお得に購入できることを、リズミカルな音楽に乗せて伝えている。\n",
    storage_url:
      "https://res.cloudinary.com/dyyaw3qpo/video/upload/v1750153034/hfzaf4rvdiosbzpenrxt.mp4",
    id: "7233339925830044929",
  },
  {
    tiktok_url: "https://www.tiktok.com/@mote_cosme/video/7080858571398745346",
    like: 53000,
    analyse:
      "20代〜30代女性へ、アリィーのノーファンデUVの毛穴カバー力、色補正、UVカット効果を、実演を交えて紹介する動画。",
    storage_url:
      "https://res.cloudinary.com/dyyaw3qpo/video/upload/v1750153049/bniqze5zlff4emldlzud.mp4",
    id: "7080858571398745346",
  },
  {
    tiktok_url: "https://www.tiktok.com/@shushu_223_/video/7129087684571663618",
    like: 52800,
    analyse:
      "乾燥肌や敏感肌に悩む方へ向け、日焼け止めの使用感を正直レビュー、おすすめを紹介する動画。",
    storage_url:
      "https://res.cloudinary.com/dyyaw3qpo/video/upload/v1750153068/g4hkwclkhxadnxdtbm5c.mp4",
    id: "7129087684571663618",
  },
  {
    tiktok_url: "https://www.tiktok.com/@egachannel1/video/7096065068353293569",
    like: 48500,
    analyse:
      "10代〜20代男女へ、日焼け止め効果やテクスチャ、使用感を比較し、おすすめ商品を実演を交え紹介。",
    storage_url:
      "https://res.cloudinary.com/dyyaw3qpo/video/upload/v1750153096/uv1m0x0jr9dlty9lprst.mp4",
    id: "7096065068353293569",
  },
  {
    tiktok_url:
      "https://www.tiktok.com/@karen_beauty02/video/7504999841597099284",
    like: 48000,
    analyse:
      "美白になりたい女性へ、飲むだけで肌トーンが上がりシミやニキビ跡も消える、白玉美肌になるサプリメントを紹介。",
    storage_url:
      "https://res.cloudinary.com/dyyaw3qpo/video/upload/v1750153115/oiydnkqbjhvpgxt568ne.mp4",
    id: "7504999841597099284",
  },
  {
    tiktok_url: "https://www.tiktok.com/@1haud/video/7406597185027968264",
    like: 45500,
    analyse:
      "SNSで話題のコスメを紹介する動画で、10〜20代女性に向けて商品の使用感や使用後の効果をアピールしている。",
    storage_url:
      "https://res.cloudinary.com/dyyaw3qpo/video/upload/v1750153128/xdoxawbdesbhtieyglrh.mp4",
    id: "7406597185027968264",
  },
  {
    tiktok_url:
      "https://www.tiktok.com/@tsumiki_beauty/video/7099374295180184834",
    like: 43500,
    analyse:
      "20〜30代の女性へ向け、プチプラで高品質な体用日焼け止め3選として、NIVEA、スキンアクア、ビオレUVを紹介する動画。",
    storage_url:
      "https://res.cloudinary.com/dyyaw3qpo/video/upload/v1750153141/zqjdkuozyxjhco2a4xkr.mp4",
    id: "7099374295180184834",
  },
  {
    tiktok_url: "https://www.tiktok.com/@noponopisu2/video/7127214496791137538",
    like: 41900,
    analyse:
      "日焼けして困っている女性へ、塗るだけで肌の色を明るく見せるCandyDollの「ブライトクリーム」を紹介する商品紹介動画。",
    storage_url:
      "https://res.cloudinary.com/dyyaw3qpo/video/upload/v1750153157/gsyzu9gkvtbqwuegrmeq.mp4",
    id: "7127214496791137538",
  },
  {
    tiktok_url: "https://www.tiktok.com/@nao__belle/video/7377699725698534664",
    like: 41600,
    analyse:
      "日焼け止め選びに悩む女性へ、薬剤師が肌の状態やライフスタイルに合わせたおすすめ商品を紹介し、選び方の参考になる情報を提供。",
    storage_url:
      "https://res.cloudinary.com/dyyaw3qpo/video/upload/v1750153175/pprcfsotyexwmnkkuc4q.mp4",
    id: "7377699725698534664",
  },
  {
    tiktok_url:
      "https://www.tiktok.com/@kuraberu_cosme/video/7391460008157842706",
    like: 37100,
    analyse:
      "20代女性へ。人気日焼け止めの効果をUVチェックビーズで検証、効果がある商品をランキング形式で紹介し購入を促す。",
    storage_url:
      "https://res.cloudinary.com/dyyaw3qpo/video/upload/v1750153196/pxx9di8zq8tw9fyn1mww.mp4",
    id: "7391460008157842706",
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
