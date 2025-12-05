"use client";

import { useEffect, useRef, useState } from "react";

export default function PriceNewLp() {
  const [isVisible, setIsVisible] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setIsVisible(true);
          setHasAnimated(true);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [hasAnimated]);

  return (
    <section className="w-full py-16 md:py-24 px-10 md:px-24 bg-black">
      <div className="max-w-6xl mx-auto">
        {/* Title */}
        <div className="flex justify-start mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white">費用</h2>
        </div>

        <div
          ref={ref}
          className={`flex flex-col gap-12 md:gap-16 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          {/* Basic Plan */}
          <div className="flex flex-col">
            <div className="flex items-start gap-3 mb-6">
              <div className="w-4 h-8 bg-red-500 mt-1 flex-shrink-0"></div>
              <h3 className="text-xl md:text-2xl font-bold text-white">
                基本プラン (ツール)
              </h3>
            </div>
            <div className="ml-7">
              <p className="text-2xl md:text-3xl font-bold text-white mb-6">
                月額5万円
              </p>
              <p className="text-lg text-white mb-4">動画月100本まで</p>
              <p className="text-sm text-red-500">
                ※100本を超える場合は、10本単位で+3,000円
              </p>
            </div>
          </div>

          {/* Support */}
          <div className="flex flex-col">
            <div className="flex items-start gap-3 mb-6">
              <div className="w-4 h-8 bg-[#2af0ea] mt-1 flex-shrink-0"></div>
              <h3 className="text-xl md:text-2xl font-bold text-white">
                サポート
              </h3>
            </div>
            <div className="ml-7">
              <p className="text-2xl md:text-3xl font-bold text-white mb-6">
                月額5万円
              </p>
              <ul className="space-y-3 text-white text-lg">
                <li>• 広告成果レポートの作成</li>
                <li>• 成果データに基づいた改善提案</li>
                <li>• 月1回の定例ミーティング</li>
              </ul>
            </div>
          </div>

          {/* Options */}
          <div className="flex flex-col">
            <div className="flex items-start gap-3 mb-6">
              <div className="w-4 h-8 bg-red-500 mt-1 flex-shrink-0"></div>
              <h3 className="text-xl md:text-2xl font-bold text-white">
                オプション
              </h3>
            </div>
            <div className="ml-7 space-y-6">
              <div>
                <p className="text-lg text-white mb-3">• 動画カスタマイズ</p>
                <p className="text-sm text-white">
                  字幕位置変更、要素追加・構成変更
                  (Hookの後の課題訴求、強み4つ目など)は別途ご相談ください
                </p>
              </div>
              <div>
                <p className="text-lg text-white mb-3">• 撮影</p>
                <p className="text-sm text-white">
                  都内近郊でしたら承っておりますので、ご相談ください
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
