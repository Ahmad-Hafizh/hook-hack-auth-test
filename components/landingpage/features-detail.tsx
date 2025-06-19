"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export default function FeaturesDetail() {
  const [isVisibleSection1, setIsVisibleSection1] = useState(false);
  const [isVisibleSection2, setIsVisibleSection2] = useState(false);
  const [isVisibleSection3, setIsVisibleSection3] = useState(false);
  const [hasAnimatedSection1, setHasAnimatedSection1] = useState(false);
  const [hasAnimatedSection2, setHasAnimatedSection2] = useState(false);
  const [hasAnimatedSection3, setHasAnimatedSection3] = useState(false);
  const refSection1 = useRef<HTMLDivElement>(null);
  const refSection2 = useRef<HTMLDivElement>(null);
  const refSection3 = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observerSection1 = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimatedSection1) {
          setIsVisibleSection1(true);
          setHasAnimatedSection1(true);
        }
      },
      { threshold: 0.1 }
    );

    const observerSection2 = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimatedSection2) {
          setIsVisibleSection2(true);
          setHasAnimatedSection2(true);
        }
      },
      { threshold: 0.1 }
    );

    const observerSection3 = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimatedSection3) {
          setIsVisibleSection3(true);
          setHasAnimatedSection3(true);
        }
      },
      { threshold: 0.1 }
    );

    if (refSection1.current) {
      observerSection1.observe(refSection1.current);
    }

    if (refSection2.current) {
      observerSection2.observe(refSection2.current);
    }

    if (refSection3.current) {
      observerSection3.observe(refSection3.current);
    }

    return () => {
      if (refSection1.current) {
        observerSection1.unobserve(refSection1.current);
      }
      if (refSection2.current) {
        observerSection2.unobserve(refSection2.current);
      }
      if (refSection3.current) {
        observerSection3.unobserve(refSection3.current);
      }
    };
  }, [hasAnimatedSection1, hasAnimatedSection2, hasAnimatedSection3]);

  return (
    <section className="px-4 py-24 bg-white" id="benefit">
      <h2 className="text-3xl font-bold text-gray-900 text-center mb-20">
        主な機能
      </h2>
      <div className="max-w-7xl mx-auto space-y-24">
        <div
          ref={refSection1}
          className="grid lg:grid-cols-2 gap-12 items-center"
        >
          <div
            className={`space-y-6 transition-all duration-1000 max-w-2xl px-20 w-full mx-auto flex flex-col items-start gap-3 ${
              isVisibleSection1
                ? "opacity-100 translate-x-0"
                : "opacity-0 -translate-x-10"
            }`}
          >
            <h3 className="text-3xl font-bold text-gray-900">
              1. 人気動画・コメントの一覧表示
            </h3>
            <p className="text-lg text-gray-600">
              制作したい広告のジャンルを入力すると、対象ジャンルにおける人気動画を一覧で表示でき、
              動画を選択すると、対象動画へのコメントを一覧で見ることができます
            </p>
            {/* <ul className="space-y-3">
              <li className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-[#25F4EE] rounded-full"></div>
                <span className="text-gray-700">Live engagement tracking</span>
              </li>
              <li className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-[#25F4EE] rounded-full"></div>
                <span className="text-gray-700">
                  Audience retention analysis
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-[#25F4EE] rounded-full"></div>
                <span className="text-gray-700">Performance benchmarking</span>
              </li>
            </ul> */}
          </div>
          <div
            className={`bg-gray-50 rounded-2xl p-6 transition-all duration-1000${
              isVisibleSection1
                ? " opacity-100 translate-x-0 delay-200"
                : " opacity-0 translate-x-10"
            } w-[600px] h-[400px] flex items-center justify-center mx-auto`}
          >
            <Image
              src="/feature1.png"
              alt="Real-time Analytics"
              width={400}
              height={400}
              className="rounded-lg object-contain w-full h-full"
            />
          </div>
        </div>

        <div
          ref={refSection2}
          className="grid lg:grid-cols-2 gap-12 items-center"
        >
          <div
            className={`bg-gray-50 rounded-2xl p-6 order-2 lg:order-1 transition-all duration-1000${
              isVisibleSection2
                ? " opacity-100 translate-x-0 delay-200"
                : " opacity-0 -translate-x-10"
            } w-[600px] h-[400px] flex items-center justify-center mx-auto`}
          >
            <Image
              src="/feature2.png"
              alt="Competitor Analysis"
              width={400}
              height={400}
              className="rounded-lg object-contain w-full h-full"
            />
          </div>
          <div
            className={`space-y-6 order-1 lg:order-2 transition-all duration-1000 max-w-2xl px-20 w-full mx-auto flex flex-col items-start gap-3 ${
              isVisibleSection2
                ? "opacity-100 translate-x-0"
                : "opacity-0 translate-x-10"
            }`}
          >
            <h3 className="text-3xl font-bold text-gray-900">
              2. コメント分析
            </h3>
            <p className="text-lg text-gray-600">
              人気コメントについて、ポジティブ・ネガティブ・クエスチョンの3分類に分けて表示できます
              <br />
              実際に多くのユーザーが反応しているコメントの中から、悩み（ネガティブ）や願い（ポジティ
              ブ）に絞り込み、Hookに活用することができます
            </p>
            {/* <ul className="space-y-3">
              <li className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-[#FE2C55] rounded-full"></div>
                <span className="text-gray-700">Content strategy insights</span>
              </li>
              <li className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-[#FE2C55] rounded-full"></div>
                <span className="text-gray-700">
                  Hashtag performance comparison
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-[#FE2C55] rounded-full"></div>
                <span className="text-gray-700">Trending content alerts</span>
              </li>
            </ul> */}
          </div>
        </div>

        <div
          ref={refSection3}
          className="grid lg:grid-cols-2 gap-12 items-center"
        >
          <div
            className={`space-y-6 transition-all duration-1000 flex flex-col items-start gap-3 max-w-2xl px-20 w-full mx-auto ${
              isVisibleSection3
                ? "opacity-100 translate-x-0"
                : "opacity-0 -translate-x-10"
            }`}
          >
            <h3 className="text-3xl font-bold text-gray-900">3. 動画企画</h3>
            <p className="text-lg text-gray-600">
              実際にHookに選定したコメント（願い・悩みなど）と、入力する広告制作する商品・サービスの情報に基づき、自動で動画企画案を出力します
              コマ割りごとのテキスト・画像イメージまでを出力できるため、企画案制作の効率化が可能です
            </p>
            {/* <ul className="space-y-3">
              <li className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-[#25F4EE] rounded-full"></div>
                <span className="text-gray-700">Live engagement tracking</span>
              </li>
              <li className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-[#25F4EE] rounded-full"></div>
                <span className="text-gray-700">
                  Audience retention analysis
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-[#25F4EE] rounded-full"></div>
                <span className="text-gray-700">Performance benchmarking</span>
              </li>
            </ul> */}
          </div>
          <div
            className={`bg-gray-50 rounded-2xl p-6 transition-all duration-1000${
              isVisibleSection3
                ? " opacity-100 translate-x-0 delay-200"
                : " opacity-0 translate-x-10"
            } w-[600px] h-[400px] flex items-center justify-center mx-auto`}
          >
            <Image
              src="/feature3.png"
              alt="Real-time Analytics"
              width={400}
              height={400}
              className="rounded-lg object-contain w-full h-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
