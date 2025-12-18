"use client";

import { useState, useEffect } from "react";

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 text-white transition-colors duration-300 ${isScrolled ? "bg-transparent" : ""}`}
    >
      <div className="max-w-3/4 mx-44 px-4 md:px-6 lg:py-3 py-3">
        <div className="bg-[#11434D] rounded-full px-12 py-1 shadow-lg backdrop-blur-sm flex items-center justify-between">
          {/* Left: Logo */}
          <a href="#hero" className="flex items-center">
            <img
              src="/newlogothin.png"
              alt="HookHack"
              className="h-16 w-auto"
            />
          </a>

          {/* Right: Menu and CTA Button */}
          <div className="flex items-center gap-6">
            <nav className="hidden lg:flex items-center gap-12 text-sm mr-8">
              <a
                href="#main-features"
                className="text-white hover:underline hover:underline-offset-4 transition-all decoration-[#00c8c8]"
              >
                主な機能
              </a>
              <a
                href="#sample-videos"
                className="text-white  hover:underline hover:underline-offset-4 transition-all decoration-[#00c8c8]"
              >
                業界別サンプル動画
              </a>
              <a
                href="#pricing"
                className="text-white hover:underline hover:underline-offset-4 transition-all decoration-[#00c8c8]"
              >
                費用
              </a>
              <a
                href="#team"
                className="text-white hover:underline hover:underline-offset-4 transition-all decoration-[#00c8c8]"
              >
                メンバー紹介
              </a>
              <a
                href="#company"
                className="text-white hover:underline hover:underline-offset-4 transition-all decoration-[#00c8c8]"
              >
                会社概要
              </a>
            </nav>
            <button className="bg-gradient-to-r from-[#0093c8] to-[#1deec8] hover:from-[#0099a8] hover:to-[#00b399] text-white px-4 py-2 rounded-full text-sm font-bold transition-all shadow-md">
              1週間無料トライアル
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
