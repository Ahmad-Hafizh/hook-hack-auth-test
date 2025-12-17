"use client";

import { Play } from "lucide-react";
import { useState, useRef } from "react";

export function IndustrySampleVideosSection() {
  const [playingIndex, setPlayingIndex] = useState<number | null>(null);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const [playingHorizontalIndex, setPlayingHorizontalIndex] = useState<
    number | null
  >(null);
  const horizontalVideoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  const videos = [
    {
      title: "通販​",
      description: "（ECの​生活雑貨・ガジェット・​小物）​",
      videoUrl: "/EC_video.m4v",
    },
    {
      title: "BtoB SaaS",
      description: "（予約管理・CRM・業務効率化ツール）​",
      videoUrl: "/B2B_Saas.m4v",
    },
    {
      title: "不動産",
      description: "（分譲マンション、​戸建て​オープンハウス）​",
      videoUrl: "/Real_estate.m4v",
    },
  ];

  const handleVideoClick = (index: number) => {
    const video = videoRefs.current[index];
    if (!video) return;

    if (playingIndex === index) {
      // If this video is playing, pause it
      video.pause();
      setPlayingIndex(null);
    } else {
      // Pause any currently playing video
      if (playingIndex !== null) {
        const currentVideo = videoRefs.current[playingIndex];
        if (currentVideo) {
          currentVideo.pause();
        }
      }
      // Play the clicked video
      video.play();
      setPlayingIndex(index);
    }
  };

  const handleHorizontalVideoClick = (index: number) => {
    const video = horizontalVideoRefs.current[index];
    if (!video) return;

    if (playingHorizontalIndex === index) {
      // If this video is playing, pause it
      video.pause();
      setPlayingHorizontalIndex(null);
    } else {
      // Pause any currently playing horizontal video
      if (playingHorizontalIndex !== null) {
        const currentVideo =
          horizontalVideoRefs.current[playingHorizontalIndex];
        if (currentVideo) {
          currentVideo.pause();
        }
      }
      // Play the clicked video
      video.play();
      setPlayingHorizontalIndex(index);
    }
  };

  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 md:px-6 lg:px-8">
        {/* Title */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[#2C9FB8] relative inline-block">
            業界別サンプル動画
            <span className="absolute -bottom-5 left-0 right-0 h-1 bg-yellow-400"></span>
          </h2>
        </div>

        {/* Videos Grid */}
        <div className="flex flex-col md:flex-row justify-center items-center gap-8 md:gap-16 mb-12 mt-24">
          {videos.map((video, index) => (
            <div
              key={index}
              className="flex flex-col items-center w-full md:w-auto"
            >
              {/* Video Placeholder */}
              <div
                className="relative w-full max-w-[280px] aspect-[9/16] bg-white border border-gray-300 rounded-lg flex items-center justify-center mb-4 overflow-hidden group cursor-pointer"
                onClick={() => handleVideoClick(index)}
              >
                <video
                  ref={(el) => {
                    videoRefs.current[index] = el;
                  }}
                  className="w-full h-full object-cover"
                  src={video.videoUrl}
                  preload="metadata"
                  onEnded={() => setPlayingIndex(null)}
                />
                {playingIndex !== index && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/30 transition-colors">
                    <div className="w-16 h-16 bg-black/60 rounded-full flex items-center justify-center">
                      <Play className="w-8 h-8 text-white ml-1" fill="white" />
                    </div>
                  </div>
                )}
              </div>

              {/* Title and Description */}
              <div className="text-center">
                <h3 className="text-lg md:text-xl font-bold text-[#041D22] mb-1">
                  {video.title}
                </h3>
                <p className="text-sm md:text-base text-gray-600">
                  {video.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Horizontal Videos Section */}
        <div className="flex flex-col md:flex-row gap-4 md:gap-16 mb-12 w-full px-12 mt-10">
          {/* Horizontal Video 1 */}
          <div className="flex-1 flex flex-col items-center">
            <div
              className="relative w-full aspect-video bg-white border border-gray-300 rounded-lg flex items-center justify-center overflow-hidden group cursor-pointer mb-4"
              onClick={() => handleHorizontalVideoClick(0)}
            >
              <video
                ref={(el) => {
                  horizontalVideoRefs.current[0] = el;
                }}
                className="w-full h-full object-cover"
                src="/ESCLVIDEO.M4V"
                preload="metadata"
                onEnded={() => setPlayingHorizontalIndex(null)}
              />
              {playingHorizontalIndex !== 0 && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/30 transition-colors">
                  <div className="w-12 h-12 bg-black/60 rounded-full flex items-center justify-center">
                    <Play className="w-6 h-6 text-white ml-1" fill="white" />
                  </div>
                </div>
              )}
            </div>
            {/* Title and Description */}
            <div className="text-center">
              <h3 className="text-lg md:text-xl font-bold text-[#041D22] mb-1">
                教育
              </h3>
              <p className="text-sm md:text-base text-gray-600">
                （オンライン教室、資格アプリ）
              </p>
            </div>
          </div>

          {/* Horizontal Video 2 */}
          <div className="flex-1 flex flex-col items-center">
            <div
              className="relative w-full aspect-video bg-white border border-gray-300 rounded-lg flex items-center justify-center overflow-hidden group cursor-pointer mb-4"
              onClick={() => handleHorizontalVideoClick(1)}
            >
              <video
                ref={(el) => {
                  horizontalVideoRefs.current[1] = el;
                }}
                className="w-full h-full object-cover"
                src="/ESCLVIDEO.M4V"
                preload="metadata"
                onEnded={() => setPlayingHorizontalIndex(null)}
              />
              {playingHorizontalIndex !== 1 && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/30 transition-colors">
                  <div className="w-12 h-12 bg-black/60 rounded-full flex items-center justify-center">
                    <Play className="w-6 h-6 text-white ml-1" fill="white" />
                  </div>
                </div>
              )}
            </div>
            {/* Title and Description */}
            <div className="text-center">
              <h3 className="text-lg md:text-xl font-bold text-[#041D22] mb-1">
                教育
              </h3>
              <p className="text-sm md:text-base text-gray-600">
                （オンライン教室、資格アプリ）
              </p>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center space-y-6">
          <p className="text-base md:text-lg text-gray-700">
            上記業界以外でも、どのような動画が成果に繋がるかお応えします
          </p>
          <button className="px-24 py-2 bg-gradient-to-r from-[#0093c8] to-[#1deec8] hover:from-[#0099a8] hover:to-[#00b399] text-white font-semibold rounded-full transition-all">
            問い合わせ
          </button>
        </div>
      </div>
    </section>
  );
}
