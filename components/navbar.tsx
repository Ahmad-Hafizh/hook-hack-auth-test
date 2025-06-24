"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Play } from "lucide-react";
import { useState, useEffect } from "react";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  function handleSmoothScroll(e: React.MouseEvent<HTMLAnchorElement>) {
    const href = e.currentTarget.getAttribute("href");
    if (href && href.startsWith("#")) {
      e.preventDefault();
      const el = document.querySelector(href);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 px-4 py-4 transition-all duration-300 ${
        isScrolled ? "bg-black shadow-md" : "bg-black"
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-2">
          {/* <span className="text-2xl font-bold text-white">Hook-Hack</span> */}
          <img src="/newlogo.svg" alt="Hook-Hack" className="w-32 py-3" />
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden p-2"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <div className="w-6 h-0.5 bg-white mb-1.5"></div>
          <div className="w-6 h-0.5 bg-white mb-1.5"></div>
          <div className="w-6 h-0.5 bg-white"></div>
        </button>

        {/* Desktop navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <a
            href="#benefit"
            className="text-white hover:text-[#fe2858]"
            onClick={handleSmoothScroll}
          >
            主な機能
          </a>
          <a
            href="#features"
            className="text-white hover:text-[#fe2858]"
            onClick={handleSmoothScroll}
          >
            市場構造
          </a>
          <a
            href="#about"
            className="text-white hover:text-[#fe2858]"
            onClick={handleSmoothScroll}
          >
            メンバー紹介
          </a>
          <a href="/app">
            <Button className="bg-gradient-to-r from-[#fe2858] to-[#2af0ea] hover:from-[#2af0ea] hover:to-[#fe2858] text-white border-2 border-[#2af0ea]">
              アプリへ移動
            </Button>
          </a>
        </nav>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-black shadow-lg p-4 flex flex-col space-y-4 animate-in slide-in-from-top duration-300">
          <a
            href="#benefit"
            className="text-white hover:text-[#fe2858] py-2"
            onClick={handleSmoothScroll}
          >
            主な機能
          </a>
          <a
            href="#features"
            className="text-white hover:text-[#fe2858] py-2"
            onClick={handleSmoothScroll}
          >
            市場構造
          </a>

          <a
            href="#about"
            className="text-white hover:text-[#fe2858] py-2"
            onClick={handleSmoothScroll}
          >
            メンバー紹介
          </a>
          <a href="/app">
            <Button className="bg-gradient-to-r from-[#fe2858] to-[#2af0ea] hover:from-[#2af0ea] hover:to-[#fe2858] text-white w-full border-2 border-[#2af0ea]">
              アプリへ移動
            </Button>
          </a>
        </div>
      )}
    </header>
  );
}
