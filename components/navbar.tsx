"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Play } from "lucide-react"
import { useState, useEffect } from "react"

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  function handleSmoothScroll(e: React.MouseEvent<HTMLAnchorElement>) {
    const href = e.currentTarget.getAttribute('href');
    if (href && href.startsWith('#')) {
      e.preventDefault();
      const el = document.querySelector(href);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 px-4 py-4 transition-all duration-300 ${
        isScrolled ? "bg-white shadow-md" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-2">
          {/* <div className="w-8 h-8 bg-gradient-to-r from-[#25F4EE] to-[#FE2C55] rounded-lg flex items-center justify-center">
            <Play className="w-4 h-4 text-white" />
          </div>
          <span className="text-xl font-bold text-gray-900">Clip-Studio</span> */}
        <img src="/clipstudio.svg" className="h-9 w-auto my-3"/>
        </div>


        {/* Mobile menu button */}
        <button className="md:hidden p-2" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          <div className="w-6 h-0.5 bg-gray-900 mb-1.5"></div>
          <div className="w-6 h-0.5 bg-gray-900 mb-1.5"></div>
          <div className="w-6 h-0.5 bg-gray-900"></div>
        </button>

        {/* Desktop navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <a href="#features" className="text-gray-600 hover:text-gray-900" onClick={handleSmoothScroll}>
            Features
          </a>
          <a href="#benefit" className="text-gray-600 hover:text-gray-900" onClick={handleSmoothScroll}>
           Benefit
          </a>
          <a href="#about" className="text-gray-600 hover:text-gray-900" onClick={handleSmoothScroll}>
            About
          </a>
         <a href="/app"> <Button className="bg-[#FE2C55] hover:bg-[#FE2C55]/90 text-white">Get Started</Button></a>
        </nav>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white shadow-lg p-4 flex flex-col space-y-4 animate-in slide-in-from-top duration-300">
          <a href="#features" className="text-gray-600 hover:text-gray-900 py-2" onClick={handleSmoothScroll}>
            Features
          </a>
          <a href="#benefit" className="text-gray-600 hover:text-gray-900 py-2" onClick={handleSmoothScroll}>
            Benefit
          </a>
          <a href="#about" className="text-gray-600 hover:text-gray-900 py-2" onClick={handleSmoothScroll}>
            About
          </a>
          <a href="/app"><Button className="bg-[#FE2C55] hover:bg-[#FE2C55]/90 text-white w-full">Get Started</Button></a>
        </div>
      )}
    </header>
  )
}
