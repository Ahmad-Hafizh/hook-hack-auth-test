"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import TrialDialogLp from "@/components/landingpage/TrialDialog-lp";

export default function HeroLp() {
  const [isVisible, setIsVisible] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);

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
      id="hero"
      ref={ref}
      className="relative bg-gradient-to-b from-black via-[#272727] to-black min-h-screen h-screen flex flex-col items-center justify-center overflow-hidden pt-20 md:pt-24"
    >
      {/* Video Fullscreen */}
      <div
        className={`absolute inset-0 w-full h-full transition-all duration-1000 delay-300 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <img
          src="/lphero169.gif"
          className="w-full h-full object-contain object-center"
          alt="Hero video"
        />
      </div>

      {/* Dark Overlay */}
      <div className="absolute inset-0 w-full h-full bg-black bg-opacity-40 z-[5]"></div>

      {/* Overlayed Text */}
      <div className="relative z-10 flex flex-col items-center px-2 sm:px-6 w-full h-full pb-32">
        {/* Headline and CTA - Absolute Middle */}
        <div className="absolute top-[45%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center w-full px-2 sm:px-6">
          <h1 className="text-2xl sm:text-3xl md:text-3xl lg:text-5xl font-bold text-center p-1 rounded-lg bg-black text-white tracking-tight drop-shadow-lg md:mb-12 mb-6">
            動画広告をLPから5分で制作｜HookHack
          </h1>
          {/* Button Centered */}
          <TrialDialogLp
            trigger={
              <Button
                size="default"
                className="bg-gradient-to-r from-[#fe2858] to-[#ff5e81] hover:from-[#c55064] hover:to-[rgb(215,73,97)] text-white px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base font-bold rounded-md shadow-lg transition-all"
              >
                1週間​無料｜今すぐ​制作する
              </Button>
            }
          />
        </div>
        {/* Title from Explain section */}
        <div className="absolute top-[calc(50%+180px)] sm:top-[calc(50%+200px)] md:top-[calc(50%+220px)] lg:top-[calc(50%+150px)] flex flex-col items-center text-center px-4">
          <h2 className="text-xl sm:text-2xl md:text-2xl lg:text-3xl font-bold text-center p-1 rounded-lg bg-black text-white tracking-tight drop-shadow-lg mb-4">
            制作だけでなく、​制作後の​検証から​成果改善まで
          </h2>
          <h2 className="text-xl sm:text-2xl md:text-2xl lg:text-3xl font-bold text-center p-1 rounded-lg bg-black text-white tracking-tight drop-shadow-lg">
            動画​広告の​PDCAに​必要な​機能を​１ツールで​網羅
          </h2>
        </div>
      </div>
      {/* Arrow Down and Learn More */}
      <div className="absolute left-1/2 bottom-0 transform -translate-x-1/2 flex flex-col items-center justify-center px-10 w-full z-20 bg-black h-20 py-16">
        <a
          href="#explain"
          onClick={(e) => {
            e.preventDefault();
            const el = document.querySelector("#explain");
            if (el) el.scrollIntoView({ behavior: "smooth" });
          }}
          className="flex flex-col items-center group cursor-pointer"
        >
          <span className="text-white text-base sm:text-lg mb-2">
            もっと詳しく
          </span>
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
