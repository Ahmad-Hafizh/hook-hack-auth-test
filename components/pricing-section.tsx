"use client";

import { useState } from "react";

type PricingTabType = "business" | "agency";

export function PricingSection() {
  const [activeTab, setActiveTab] = useState<PricingTabType>("business");

  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 md:px-6 lg:px-8">
        {/* Title */}
        <div className="text-center mb-12 text-[#041D22] flex items-center justify-center">
          <span className="text-yellow-400 text-6xl mb-3 mr-2">-</span>
          <h2 className="text-3xl md:text-4xl font-bold  relative inline-block">
            費用
            {/* <span className="absolute -bottom-1 left-0 right-0 h-1 bg-yellow-400"></span> */}
          </h2>
          <span className="text-yellow-400 text-6xl mb-3 ml-2">-</span>
        </div>

        {/* Tabs */}
        <div className="flex justify-center mb-12">
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

        {/* Business Pricing View (Default) */}
        {activeTab === "business" && (
          <>
            {/* Pricing Boxes */}
            <div className="flex flex-col md:flex-row justify-center items-stretch gap-6 md:gap-8 mb-12">
              {/* Tool Box */}
              <div className="flex-1 border border-gray-300 rounded-xl overflow-visible">
                <div className="bg-[#2C9FB8] text-white px-6 py-4 relative rounded-t-xl">
                  <h3 className="text-xl md:text-2xl font-bold">ツール</h3>
                  {/* Triangle pointing down */}
                  <div
                    className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full"
                    style={{
                      width: 0,
                      height: 0,
                      borderLeft: "18px solid transparent",
                      borderRight: "18px solid transparent",
                      borderTop: "18px solid #2C9FB8",
                    }}
                  ></div>
                </div>
                <div className="p-6 space-y-4 w-full py-14 px-10 rounded-b-xl">
                  <p className="text-base md:text-lg text-[#041D22]">
                    動画月100本まで​
                  </p>
                  <p className="text-2xl md:text-3xl font-bold text-[#041D22]">
                    月​額5万円​（税別）​
                  </p>
                  <p className="text-sm md:text-base text-[#041D22]">
                    月100本以上は10本単位で5千円（税別）
                  </p>
                  <p className="text-sm text-red-500 pt-14 text-right">
                    ※操作に​関する​サポートは​付帯しております
                  </p>
                </div>
              </div>

              {/* Support Box */}
              <div className="flex-1 border border-gray-300 rounded-xl overflow-visible">
                <div className="bg-[#2C9FB8] text-white px-6 py-4 relative rounded-t-xl">
                  <h3 className="text-xl md:text-2xl font-bold">サポート</h3>
                  {/* Triangle pointing down */}
                  <div
                    className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full"
                    style={{
                      width: 0,
                      height: 0,
                      borderLeft: "18px solid transparent",
                      borderRight: "18px solid transparent",
                      borderTop: "18px solid #2C9FB8",
                    }}
                  ></div>
                </div>
                <div className="p-6 space-y-4 py-14 px-10 rounded-b-xl">
                  <p className="text-2xl md:text-3xl font-bold text-[#041D22]">
                    月​額5万円​（税別）​
                  </p>
                  <div className="space-y-2 text-base md:text-lg text-[#041D22]">
                    <p>・広告レポート作成</p>
                    <p>・月次定例mtg（レポートを踏まえた改善提案）</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Additional Services - 2 Boxes with same design */}
            <div className="flex flex-col md:flex-row justify-center items-stretch gap-6 md:gap-8">
              {/* 動画カスタマイズ Box */}
              <div className="flex-1 border border-gray-300 rounded-xl overflow-visible">
                <div className="bg-[#2C9FB8] text-white px-6 py-4 relative rounded-t-xl">
                  <h3 className="text-xl md:text-2xl font-bold">動画カスタマイズ</h3>
                  {/* Triangle pointing down */}
                  <div
                    className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full"
                    style={{
                      width: 0,
                      height: 0,
                      borderLeft: "18px solid transparent",
                      borderRight: "18px solid transparent",
                      borderTop: "18px solid #2C9FB8",
                    }}
                  ></div>
                </div>
                <div className="p-6 space-y-4 w-full py-14 px-10 rounded-b-xl">
                  <p className="text-base md:text-lg text-[#041D22]">
                    字幕位置変更、要素追加・構成変更（Hookの後の課題訴求、強み4つ目など）は別途ご相談ください。
                  </p>
                  <p className="text-base md:text-lg text-[#041D22] font-bold">
                    動画カスタマイズ例：
                  </p>
                  <p className="text-base md:text-lg text-[#041D22]">
                    お持ちの静止画を動画に変換　5本で5000円
                  </p>
                  <p className="text-base md:text-lg text-[#041D22]">
                    画像生成　5枚で2500円
                  </p>
                </div>
              </div>

              {/* 撮影 Box */}
              <div className="flex-1 border border-gray-300 rounded-xl overflow-visible">
                <div className="bg-[#2C9FB8] text-white px-6 py-4 relative rounded-t-xl">
                  <h3 className="text-xl md:text-2xl font-bold">撮影</h3>
                  {/* Triangle pointing down */}
                  <div
                    className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full"
                    style={{
                      width: 0,
                      height: 0,
                      borderLeft: "18px solid transparent",
                      borderRight: "18px solid transparent",
                      borderTop: "18px solid #2C9FB8",
                    }}
                  ></div>
                </div>
                <div className="p-6 space-y-4 w-full py-14 px-10 rounded-b-xl">
                  <p className="text-2xl md:text-3xl font-bold text-[#041D22]">
                    半日：2万円（税別）〜
                  </p>
                  <p className="text-base md:text-lg text-[#041D22]">
                    交通費は全国実費で承っております。
                  </p>
                  <p className="text-base md:text-lg text-[#041D22]">
                    最短翌日対応しますので、ご相談ください。
                  </p>
                </div>
              </div>
            </div>
          </>
        )}

        {/* Agency Pricing View - Single Card */}
        {activeTab === "agency" && (
          <div className="flex justify-center mb-12">
            <div className="flex-1 max-w-md border border-gray-300 rounded-xl overflow-visible">
              <div className="bg-[#2C9FB8] text-white px-6 py-4 relative rounded-t-xl">
                <h3 className="text-xl md:text-2xl font-bold">ツール</h3>
                {/* Triangle pointing down */}
                <div
                  className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full"
                  style={{
                    width: 0,
                    height: 0,
                    borderLeft: "18px solid transparent",
                    borderRight: "18px solid transparent",
                    borderTop: "18px solid #2C9FB8",
                  }}
                ></div>
              </div>
              <div className="p-6 space-y-4 w-full py-14 px-10 rounded-b-xl">
                <p className="text-base md:text-lg text-[#041D22]">
                  月200本まで
                </p>
                <p className="text-2xl md:text-3xl font-bold text-[#041D22]">
                  月額10万円（税別）
                </p>
                <p className="text-sm md:text-base text-[#041D22]">
                  月200本以上は10本単位で5千円（税別）
                </p>
                <p className="text-sm text-red-500 pt-14 text-right">
                  ※操作に​関する​サポートは​付帯しております
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
