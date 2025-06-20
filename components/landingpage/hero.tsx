"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export default function Hero() {
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
    <section
      ref={ref}
      className="pt-32 bg-gradient-to-br from-[#F0F9FF] via-[#FDF6F0] to-white min-h-screen h-screen flex flex-col items-center justify-center"
    >
      <div className=" mx-auto w-full flex flex-col items-center h-full">
        {/* Video Centered */}
        <div
          className={`relative transition-all duration-1000 delay-300 mb-11 w-full flex justify-center items-center ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="bg-white rounded-2xl shadow-2xl p-6 flex justify-center items-center w-2/3 max-w-5xl h-[400px]">
            <video
              src="/hooklp.mp4"
              controls
              muted
              autoPlay
              loop
              playsInline
              className="rounded-lg w-full h-full object-cover"
            />
          </div>
        </div>
        {/* Main Headline */}
        <h1
          className={`text-3xl md:text-3xl lg:text-4xl font-bold text-center text-[#17153B] mb-4 tracking-tight transition-all duration-1000 w-full ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          「ユーザーが反応する」ショート動画広告制作ツール
        </h1>
        {/* Subheadline */}
        <div className="flex flex-col items-center mb-5">
          <span className="inline-block text-[#433D8B] px-4 py-1 font-semibold text-4xl mb-2">
            『Hook Hack』
          </span>
        </div>
        {/* Button Centered */}
        <div className="flex justify-center mb-6">
          <a href="/app">
            <Button
              size="lg"
              className="bg-gradient-to-r from-[#25F4EE] to-[#FE2C55] hover:from-[#FE2C55] hover:to-[#25F4EE] text-white px-10 py-6 text-lg font-bold rounded-md shadow-lg transition-all"
            >
              無料トライアルを申し込む
            </Button>
          </a>
        </div>
        {/* Paragraph Section */}
        <div className="w-full bg-white/80 p-8 mt-12 flex flex-col items-center h-full">
          <h2 className="text-3xl font-bold text-[#433D8B] mb-3">
            Hook Hackとは
          </h2>
          <p className="text-lg text-gray-700 mb-2 text-center">
            離脱が多いショート動画広告の最初の3秒（Hook）を最適化（Hack）するツールです
          </p>
          <p className="text-lg text-gray-700 text-center">
            実際にユーザーがコメントしている内容を元にHookの言葉選びができるため、
            <br />
            企画案をまとめる際に上司・クライアントへの説得力を高めることができ、ユーザーにも自分事化されやすくなります
          </p>
        </div>
      </div>
    </section>
  );
}
