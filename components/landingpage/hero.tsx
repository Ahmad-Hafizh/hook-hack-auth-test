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
      className="py-40 bg-gradient-to-b from-black via-[#272727] to-black min-h-screen h-screen flex flex-col items-center justify-center "
    >
      <div className="mx-auto w-full flex flex-col items-center h-full my-40">
        {/* Video Centered */}
        <h1
          className={`text-3xl md:text-3xl lg:text-4xl font-bold text-center text-white my-10 tracking-tight transition-all duration-1000 w-full ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          「ユーザーが反応する」ショート動画広告制作ツール
        </h1>
        {/* Subheadline */}
        <div className="flex flex-col items-center mb-4">
          <span className="inline-block text-white px-4 py-1 font-semibold text-6xl my-2">
            『Hook Hack』
          </span>
        </div>

        <div
          className={`relative transition-all duration-1000 delay-300 mb-11 w-full flex justify-center items-center ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="bg-white rounded-2xl shadow-2xl p-6 flex justify-center items-center w-2/3 max-w-5xl h-[400px] my-3">
            <video
              src="/hooklp.mp4"
              controls
              muted
              autoPlay
              loop
              playsInline
              className="rounded-lg w-full h-full object-cover border-4 border-[#4000B3]"
            />
          </div>
        </div>
        {/* Main Headline */}

        {/* Button Centered */}
        <div className="flex justify-center mb-6">
          <a href="/app">
            <Button
              size="lg"
              className="bg-gradient-to-r from-[#fe2858] to-[#ff5e81] hover:from-[#c55064] hover:to-[rgb(215,73,97)] text-white px-10 py-6 text-lg font-bold rounded-md shadow-lg transition-all  "
            >
              無料トライアルを申し込む
            </Button>
          </a>
        </div>
      </div>
      {/* Arrow Down and Learn More */}
      <div className="absolute left-1/2 bottom-10 transform -translate-x-1/2 flex flex-col items-center">
        <a
          href="#explain"
          onClick={(e) => {
            e.preventDefault();
            const el = document.querySelector("#explain");
            if (el) el.scrollIntoView({ behavior: "smooth" });
          }}
          className="flex flex-col items-center group cursor-pointer"
        >
          <span className="text-white text-lg mb-2">もっと詳しく</span>
          <svg
            className="w-8 h-8 text-white animate-bounce group-hover:text-[#fe2858]"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
            id="explain"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </a>
      </div>
    </section>
  );
}
