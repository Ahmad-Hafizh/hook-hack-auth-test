"use client";

import { useState } from "react";

type TabType = "PLAN" | "DO" | "CHECK" | "ACTION";

interface TabContent {
  video: string;
  description: string;
}

const tabContents: Record<TabType, TabContent> = {
  PLAN: {
    video: "https://placehold.co/800x600/cccccc/ffffff.gif?text=PLAN+Video",
    description: "複数LPから案を発散",
  },
  DO: {
    video: "https://placehold.co/800x600/cccccc/ffffff.gif?text=DO+Video",
    description: "案を元に複数の動画を制作",
  },
  CHECK: {
    video: "https://placehold.co/800x600/cccccc/ffffff.gif?text=CHECK+Video",
    description: "顧客が反応した要素を数値で分析",
  },
  ACTION: {
    video: "https://placehold.co/800x600/cccccc/ffffff.gif?text=ACTION+Video",
    description: "反応の得られたインサイトをLPに反映",
  },
};

export function HighlightFeatureProcess() {
  const [activeTab, setActiveTab] = useState<TabType>("PLAN");
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [hoveredTab, setHoveredTab] = useState<TabType | null>(null);

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
    <section className="py-20 bg-[#e8fafa]">
      <div className="max-w-6xl mx-auto px-4 md:px-6 lg:px-8">
        {/* Title */}
        <h2 className="text-3xl md:text-4xl font-bold text-center text-[#00c8c8] mb-12">
          <span className="relative inline-block">
            HookHack
            <span className="absolute -bottom-4 left-5 w-full h-1 bg-yellow-400"></span>
          </span>
          とは
        </h2>

        {/* Description Text */}
        <div className="text-center mb-12 space-y-2">
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
        </div>

        {/* Video Container */}
        <div className="mb-8">
          <div
            className={`bg-white border p-4 md:p-6 shadow-sm overflow-hidden transition-all duration-300 ease-in-out ${
              isHovering
                ? "rounded-2xl border-[#00c8c8] bg-[#f0fdfd]"
                : "rounded-xl border-gray-200"
            }`}
          >
            <div
              key={activeTab}
              className={`relative w-full aspect-video transition-all duration-500 ease-in-out ${
                isTransitioning ? "opacity-0 scale-95" : "opacity-100 scale-100"
              }`}
            >
              <img
                src={currentContent.video}
                alt={`${activeTab} video`}
                className="w-full h-full object-contain rounded-lg"
              />
            </div>
          </div>
        </div>

        {/* Tab Menu */}
        <div className="flex flex-wrap justify-center gap-4 md:gap-3 lg:gap-12 mb-4">
          {(["PLAN", "DO", "CHECK", "ACTION"] as TabType[]).map((tab) => {
            const isActive = activeTab === tab;
            return (
              <button
                key={tab}
                onClick={() => handleTabChange(tab)}
                onMouseEnter={() => setHoveredTab(tab)}
                onMouseLeave={() => setHoveredTab(null)}
                className={`
                  relative px-5 py-2 md:px-12 md:py-2 rounded-full font-medium text-xs md:text-sm lg:text-base lg:mb-5
                  transition-all duration-300 ease-in-out transform hover:rounded-xl 
                  ${
                    isActive
                      ? "bg-gray-700 text-white shadow-lg scale-105"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }
                `}
              >
                {tab}
              </button>
            );
          })}
        </div>

        {/* Description Below Tabs */}
        <div className="text-center">
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
        </div>
      </div>
    </section>
  );
}
