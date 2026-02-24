"use client";

import { useState, useRef, useEffect } from "react";

type TabType = "PLAN" | "DO" | "CHECK" | "ACTION";

interface TabContent {
  video: string;
  description: string;
}

const tabContents: Record<TabType, TabContent> = {
  PLAN: {
    video: "/videoplan.gif",
    description: "複数LPから案を発散",
  },
  DO: {
    video: "/videoplan.gif",
    description: "案を元に複数の動画を制作",
  },
  CHECK: {
    video: "/videoplan.gif",
    description: "顧客が反応した要素を数値で分析",
  },
  ACTION: {
    video: "/videoplan.gif",
    description: "反応の得られたインサイトをLPに反映",
  },
};

export function HighlightFeatureProcess() {
  const [activeTab, setActiveTab] = useState<TabType>("PLAN");
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [hoveredTab, setHoveredTab] = useState<TabType | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 1.5;
    }
  }, []);

  const handleTabChange = (tab: TabType) => {
    if (tab === activeTab) return;

    setIsTransitioning(true);
    setTimeout(() => {
      setActiveTab(tab);
      setTimeout(() => {
        setIsTransitioning(false);
      }, 50);
    }, 200);
  };

  const currentContent = tabContents[activeTab];
  const isHovering = hoveredTab !== null;

  return (
    <section className="pb-0 pt-10 bg-white max-h-fit">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        {/* Title */}
        <h2
          className="text-3xl md:text-4xl font-bold text-center text-[#2C9FB8] mb-3"
          style={{ lineHeight: "1.6" }}
        >
          <span className="relative inline-block">
            {/* <img src="/5.png" alt="" className="h-6 md:h-9 w-auto mt-1" /> */}
            HookHackとは
            {/* <img src="/6.png" alt="" className="h-6 md:h-9 w-auto mt-1" /> */}
            <span className="absolute -bottom-2 left-0 right-0 h-1 bg-yellow-400"></span>
          </span>
        </h2>

        {/* <h3 className="text-center text-lg md:text-xl lg:text-lg text-[#333] my-10 font-medium">
          自社と他社のLPを元に<span className="text-[#2C9FB8] bg-[#F1F6FF] ">ターゲット顧客</span>のインサイト案を発散
          <br />
          絞り込んだ訴求で複数の動画を制作して
          <br />
          <span className="text-[#2C9FB8] bg-[#F1F6FF] ">顧客が反応する</span>訴求を発掘する動画マーケティングツールです
          <br />
          動画から得られたインサイトは<span className="text-[#2C9FB8] bg-[#F1F6FF] ">LP改修</span>にも活かせます
          <br />
        </h3> */}
        <h3 className="text-center text-[24px] text-[#333] my-10 font-medium" style={{ lineHeight: "1.8" }}>
          自社と他社のLPを比較して訴求案を発散
          <br />
          Hook（冒頭3秒）＋Body（特徴）＋CTA（LP誘導）の構成で
          <br />
          <span className="font-bold text-[#2C9FB8] bg-[#F1F6FF] ">
            同時に最大20パターンの動画を制作
          </span>
          <br />
          <br />
          <span className="font-bold text-[#2C9FB8] bg-[#F1F6FF] ">
            「コンバージョンに繋がる訴求」を発掘していく動画マーケティングツールです
          </span>
          <br />
        </h3>

        {/* Video Container */}
        <div className="  max-w-full mx-auto my-10">
          <div
            className={` overflow-hidden transition-all duration-300 ease-in-out ${
              isHovering
                ? "rounded-2xl border-[#2C9FB8] bg-[#f0fdfd]"
                : "rounded-xl border-gray-200"
            }`}
          >
            <div
              key={activeTab}
              className={`relative w-full transition-all duration-500 ease-in-out ${
                isTransitioning ? "opacity-0 scale-95" : "opacity-100 scale-100"
              }`}
            >
              <video
                ref={videoRef}
                src="/hero.mp4"
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-auto object-contain"
              />
            </div>
          </div>
        </div>

        {/* Description Text */}
        {/* <div className="text-center mb-12 space-y-2">
          <p className="text-[#333] text-base md:text-lg">
            自社と他社のLPを元にターゲット顧客のインサイト案を発散
          </p>
          <p className="text-[#333] text-base md:text-lg">
            絞り込んだ訴求で複数の動画を制作して顧客が反応する訴求を発掘する
          </p>
          <p className="text-[#333] text-base md:text-lg font-semibold">
            動画マーケティングツールです
          </p>
          <p className="text-[#333] text-base md:text-lg">
            動画から得られたインサイトはLP改修にも活かせます
          </p>
        </div> */}

        {/* Tab Menu */}
        {/* <div className="flex flex-wrap justify-center gap-4 md:gap-3 lg:gap-12 mb-4">
          {(["PLAN", "DO", "CHECK", "ACTION"] as TabType[]).map((tab) => {
            const isActive = activeTab === tab;
            const hoverColors: Record<TabType, string> = {
              PLAN: "hover:bg-blue-500 hover:text-white",
              DO: "hover:bg-green-500 hover:text-white",
              CHECK: "hover:bg-yellow-500 hover:text-white",
              ACTION: "hover:bg-purple-500 hover:text-white",
            };
            return (
              <button
                key={tab}
                onClick={() => handleTabChange(tab)}
                onMouseEnter={() => setHoveredTab(tab)}
                onMouseLeave={() => setHoveredTab(null)}
                className={`
                  relative px-5 py-2 md:px-12 md:py-2 rounded-full font-medium text-xs md:text-sm lg:text-base lg:mb-5
                  transition-all duration-200 ease-in-out transform hover:rounded-xl ${hoverColors[tab]}
                  ${
                    isActive
                      ? "bg-gray-700 text-white shadow-lg scale-105"
                      : "bg-gray-200 text-gray-700"
                  }
                `}
              >
                {tab}
              </button>
            );
          })}
        </div> */}

        {/* Description Below Tabs */}
        {/* <div className="text-center">
          <p
            key={activeTab}
            className={`text-[#333] text-sm md:text-base lg:text-xl transition-all duration-500 ease-in-out inline-block ${
              isTransitioning
                ? "opacity-0 translate-y-4"
                : "opacity-100 translate-y-0"
            }`}
          >
            {currentContent.description}
          </p>
        </div> */}
      </div>
    </section>
  );
}
