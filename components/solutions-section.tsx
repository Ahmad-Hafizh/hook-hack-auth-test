"use client";

import { useState, useEffect, useRef } from "react";

type TabType = "business" | "agency";

export function SolutionsSection() {
  const [activeTab, setActiveTab] = useState<TabType>("business");
  const [videoOpacity, setVideoOpacity] = useState(0);
  const [isBgChanged, setIsBgChanged] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const sectionHeight = rect.height;

      // Calculate scroll percentage (same as scroll-color-section)
      const visibleFromTop = windowHeight - rect.top;
      const scrollPercentage = (visibleFromTop / sectionHeight) * 100;

      // Track if bg color has changed (happens at 55%)
      setIsBgChanged(scrollPercentage >= 55);

      // Video only appears AFTER bg color change (which happens at 50-55%)
      // Start fading in at 55%, fully visible at 65%
      let opacity = 0;
      if (scrollPercentage >= 55 && scrollPercentage <= 65) {
        opacity = ((scrollPercentage - 55) / 10) * 0.5; // Smooth fade to 50%
      } else if (scrollPercentage > 65) {
        opacity = 0.5; // Max 50% opacity
      }

      setVideoOpacity(opacity);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const businessItems = [
    "今あるLP・画像素材を活かして手軽に動画を作りたい",
    "コンバージョンに繋がる訴求を見つけたい",
    "代理店が忙しくて深い企画を作れていない",
    // "動画のPDCAを自社で回したい",
    "P-MAXを運用しているが動画を作っていない",
  ];

  const agencyItems = [
    "クライアントから動画制作を求められるが、リソースが足りない",
    "動画広告も出稿したいが、制作コストと利益が合わない",
    "P-MAXの自動生成動画ではブランドイメージに合わない",
    "競合分析や訴求抽出を高速化し、 提案の質を上げたい",
  ];

  const currentItems = activeTab === "business" ? businessItems : agencyItems;

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-transparent h-[40vw] py-20 flex items-center justify-center"
    >
      {/* Video Background with gradient mask */}
      <video
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        className="absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-500"
        style={{
          opacity: videoOpacity,
          maskImage:
            "linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)",
        }}
      >
        <source src="/challenges.mp4" type="video/mp4" />
      </video>
      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        {/* Title */}
        <div className="text-center mb-12">
          <h2
            className={`text-3xl md:text-5xl font-bold mb-12 flex items-center justify-center gap-3 transition-all duration-700 ease-in-out ${isBgChanged ? "text-white" : "text-[#4a4a4a]"}`}
          >
            <div className="relative w-12 h-12 md:w-14 md:h-14 -mr-3 -mt-5 rotate-[20deg]">
              <img
                src="/spring.png"
                alt=""
                className={`absolute inset-0 w-full h-full transition-opacity duration-700 ease-in-out ${isBgChanged ? "opacity-0" : "opacity-100"}`}
              />
              <img
                src="/spring-white.png"
                alt=""
                className={`absolute inset-0 w-full h-full transition-opacity duration-700 ease-in-out ${isBgChanged ? "opacity-100" : "opacity-0"}`}
              />
            </div>
            <span className="relative inline-block">
              こんな課題を抱えていませんか？
              <span
                className={`absolute -bottom-5 left-40 right-40 h-1 ${!isBgChanged ? "bg-yellow-400" : "bg-yellow-400"} w-1/2 text-center`}
              ></span>
            </span>
          </h2>
        </div>

        {/* Tabs */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex flex-row rounded-full border border-gray-200 p-1 bg-gray-50">
            <button
              onClick={() => setActiveTab("business")}
              className={`px-4 md:px-6 py-2 md:py-3 text-sm md:text-xl font-bold rounded-full transition-all duration-200 whitespace-nowrap ${
                activeTab === "business"
                  ? "bg-[#2C9FB8] text-white shadow-md"
                  : "text-[#2C9FB8] hover:bg-gray-100"
              }`}
            >
              事業会社様向け
            </button>
            <button
              onClick={() => setActiveTab("agency")}
              className={`px-4 md:px-6 py-2 md:py-3 text-sm md:text-xl font-bold rounded-full transition-all duration-200 whitespace-nowrap ${
                activeTab === "agency"
                  ? "bg-[#2C9FB8] text-white shadow-md"
                  : "text-[#2C9FB8] hover:bg-gray-100"
              }`}
            >
              広告代理店様向け
            </button>
          </div>
        </div>

        {/* Content - Grid Layout */}
        <div className="flex justify-center w-full">
          <div
            className={`grid grid-cols-1 md:grid-cols-2 gap-4 w-full ${activeTab === "agency" ? "md:grid-rows-2" : "md:grid-rows-3"}`}
          >
            {currentItems.map((item, index) => (
              <div
                key={index}
                className="bg-white border border-gray-200 rounded-xl px-3 py-2 text-[#333] text-lg md:text-xl lg:text-xl font-medium hover:shadow-sm transition-shadow flex items-center gap-4"
              >
                <img
                  src="/checkbox.png"
                  alt=""
                  className="w-7 h-7 md:w-8 md:h-8 flex-shrink-0"
                />
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
