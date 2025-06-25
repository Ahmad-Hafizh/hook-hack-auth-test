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

  const TrialSchema = z.object({
    company: z.string().min(1, "会社名は必須です"),
    name: z.string().min(1, "お名前は必須です"),
    email: z.string().email("正しいメールアドレスを入力してください"),
    tiktok: z.string().url("正しいURLを入力してください"),
  });
  type TrialForm = z.infer<typeof TrialSchema>;

  const form = useForm<TrialForm>({
    resolver: zodResolver(TrialSchema),
    defaultValues: { company: "", name: "", email: "", tiktok: "" },
  });

  async function onSubmit(values: TrialForm) {
    await fetch("/api/trial", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });
    setOpen(false);
    form.reset();
    // Optionally show a toast or success message
  }

  // Reset form when dialog is opened
  useEffect(() => {
    if (open) {
      form.reset();
    }
  }, [open]);

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
      <div className="mx-auto w-full flex flex-col items-center h-full my-36">
        {/* Video Centered */}
        <div
          className={`relative transition-all duration-1000 delay-300 mb-11 w-full flex justify-center items-center ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          {/* Overlayed Text */}
          <div className="absolute inset-0 flex flex-col items-center justify-center z-10 ">
            <h1 className="text-3xl md:text-3xl lg:text-5xl font-bold text-center text-white tracking-tight drop-shadow-lg">
              「ユーザーが反応する」ショート動画広告制作ツール
            </h1>
            <span className="inline-block text-white px-4 py-1 font-semibold text-6xl my-6 drop-shadow-lg">
              『Hook Hack』
            </span>
            {/* Button Centered */}
            <TrialDialog
              trigger={
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-[#fe2858] to-[#ff5e81] hover:from-[#c55064] hover:to-[rgb(215,73,97)] text-white px-10 py-6 text-lg font-bold rounded-md shadow-lg transition-all  "
                >
                  無料トライアルを申し込む
                </Button>
              }
            />
          </div>
          {/* Video */}
          <div className=" rounded-2xl shadow-2xl flex justify-center items-center w-full h-[65vh] my-3">
            <video
              src="/wide.mp4"
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
