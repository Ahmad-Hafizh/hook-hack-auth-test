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
import TrialDialog from "@/components/landingpage/TrialDialog";

export default function Hero() {
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
      className=" py-40 bg-gradient-to-b from-black via-[#272727] to-black min-h-screen h-screen flex flex-col items-center justify-center"
    >
      <div className="mx-auto w-full flex flex-col items-center h-full my-36">
        {/* Video Centered */}
        <div
          className={`relative transition-all duration-1000 delay-300 mb-11 w-full flex justify-center items-center ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          {/* Overlayed Text */}
          <div className="absolute inset-0 flex flex-col items-center justify-center z-10 px-2 sm:px-6">
            <h1 className="text-2xl sm:text-3xl md:text-3xl lg:text-5xl font-bold text-center p-1 rounded-lg bg-black text-white tracking-tight drop-shadow-lg md:mb-12 mb-6">
              ​動画​広告「を」LPら​5分で​制作｜HookHack
            </h1>

            {/* <span className="inline-block text-white px-4 py-1 font-semibold text-4xl sm:text-6xl my-6 md:my-10 md:mb-10 drop-shadow-lg">
              『Hook Hack』
            </span> */}
            {/* Button Centered */}
            <TrialDialog
              trigger={
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-[#fe2858] to-[#ff5e81] hover:from-[#c55064] hover:to-[rgb(215,73,97)] text-white px-6 sm:px-10 py-4 sm:py-6 text-base sm:text-lg font-bold rounded-md shadow-lg transition-all  "
                >
                  1週間​無料トライアルで​今すぐ​制作
                </Button>
              }
            />
          </div>
          {/* Video */}
          <div className=" shadow-2xl flex justify-center items-center w-full h-[40vh] sm:h-[65vh] my-3">
            <img src="/main-hero.gif" className="w-full h-full object-cover" />
          </div>
        </div>
        {/* Main Headline */}
      </div>
      {/* Arrow Down and Learn More */}
      <div className="absolute left-1/2 bottom-10 transform -translate-x-1/2 flex flex-col items-center px-10 w-full">
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
