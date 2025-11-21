"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import TrialDialog from "./TrialDialog";

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
    <section className="px-10 py-[70px] md:py-[128px] bg-white" id="benefit">
      <h2 className="text-3xl font-bold text-[#fe2858] text-center mb-20">
        主な機能
      </h2>
      <div className="max-w-7xl mx-auto space-y-16 md:space-y-24">
        <div
          ref={refSection1}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center"
        >
          <div
            className={`space-y-4 md:space-y-6 transition-all duration-1000 max-w-2xl px-2 md:px-10 lg:px-14 w-full mx-auto flex flex-col items-start gap-3 ${
              isVisibleSection1
                ? "opacity-100 translate-x-0"
                : "opacity-0 -translate-x-10"
            }`}
          >
            <h3 className="text-xl md:text-3xl font-bold text-black">
              1. 訴求軸に根拠を | 競合と比較して
              <br />
              「売れる訴求」を提案
            </h3>
            <div className="text-base md:text-lg text-black space-y-2">
              <p>LPの​URLを​入力すると、​同一ジャンルの​他社LPを​複数抽出。</p>
              <p>参考に​したい​LPを​3つ選ぶと、​他社LPを​踏まえて</p>
              <p>貴社で​打ち出すべき訴求要素を​提案します。</p>
              <p>提案内容を​元に​動画の​骨子に​活かすことができます。</p>
            </div>
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
            className={`bg-gray-100 rounded-2xl p-4 md:p-6 transition-all duration-1000${
              isVisibleSection1
                ? " opacity-100 translate-x-0 delay-200"
                : " opacity-0 translate-x-10"
            } w-full max-w-lg h-[220px] md:h-[400px] flex items-center justify-center mx-auto`}
          >
            {/* <Image
              src="/feature1.png"
              alt="Real-time Analytics"
              width={320}
              height={320}
              className="rounded-lg object-contain w-full h-full"
            /> */}
          </div>
        </div>

        <div
          ref={refSection2}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center"
        >
          <div
            className={`space-y-4 md:space-y-6 transition-all duration-1000 max-w-2xl px-2 md:px-10 lg:px-20 w-full mx-auto flex flex-col items-start gap-3 ${
              isVisibleSection2
                ? "opacity-100 translate-x-0"
                : "opacity-0 -translate-x-10"
            }`}
          >
            <h3 className="text-xl md:text-3xl font-bold text-black">
              2. LP入力から5分 | 成果に直結する
              <br />
              要素で動画を複数パターン生成
            </h3>
            <div className="text-base md:text-lg text-black space-y-2">
              <p>Hook​（最初の​3秒）​・​3つの​ポイント・CTAなど、</p>
              <p>動画の​インタラクション率に​直結する​要素を​</p>
              <p>選択すると、​15秒の​動画を​複数パターン生成。</p>
              <p>仮説検証に​必要な​複数の​動画を​一度に​用意できます。​</p>
            </div>
          </div>
          <div
            className={`bg-gray-100 rounded-2xl p-4 md:p-6 transition-all duration-1000${
              isVisibleSection2
                ? " opacity-100 translate-x-0 delay-200"
                : " opacity-0 translate-x-10"
            } w-full max-w-lg h-[220px] md:h-[400px] flex items-center justify-center mx-auto`}
          >
            {/* <Image
              src="/feature2.png"
              alt="Competitor Analysis"
              width={320}
              height={320}
              className="rounded-lg object-contain w-full h-full"
            /> */}
          </div>
        </div>

        <div
          ref={refSection3}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center"
        >
          <div
            className={`space-y-4 md:space-y-6 transition-all duration-1000 flex flex-col items-start gap-3 max-w-2xl px-2 md:px-10 lg:px-20 w-full mx-auto ${
              isVisibleSection3
                ? "opacity-100 translate-x-0"
                : "opacity-0 -translate-x-10"
            }`}
          >
            <h3 className="text-xl md:text-3xl font-bold text-black">
              3. PDCAを1ツールで | 自動で成果を分析、
              <br />
              改善案まで提案
            </h3>
            <div className="text-base md:text-lg text-black space-y-2">
              <p>出稿後、​各パターンの​視聴維持率、​クリック、</p>
              <p>CVRなどを​自動で​解析し、​次の​改善案を​提示。</p>
              <p>そのまま​再生成も​可能です。</p>
              <p>チームに​運用ノウハウが​少なくても、​高速に​成果を</p>
              <p>改善できます。</p>
            </div>
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
            className={`bg-gray-100 rounded-2xl p-4 md:p-6 transition-all duration-1000${
              isVisibleSection3
                ? " opacity-100 translate-x-0 delay-200"
                : " opacity-0 translate-x-10"
            } w-full max-w-lg h-[220px] md:h-[400px] flex items-center justify-center mx-auto`}
          >
            {/* <Image
              src="/feature3new.png"
              alt="Real-time Analytics"
              width={320}
              height={320}
              className="rounded-lg object-contain w-full h-full"
            /> */}
          </div>
        </div>

        <div className="mt-6 w-full flex justify-center items-center my-20">
          <TrialDialog
            trigger={
              <button className="bg-[#2af0ea] text-black hover:bg-[#288784] hover:text-white transition-all duration-300 border-2 border-[#2af0ea] rounded-lg px-8 py-3 font-bold text-lg">
                無料トライアルを申し込む
              </button>
            }
          />
        </div>
      </div>
    </section>
  );
}
