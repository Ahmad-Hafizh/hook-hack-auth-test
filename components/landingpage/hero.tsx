"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight } from "lucide-react"
import { useEffect, useRef, useState } from "react"

export default function Hero() {
  const [isVisible, setIsVisible] = useState(false)
  const [hasAnimated, setHasAnimated] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setIsVisible(true)
          setHasAnimated(true)
        }
      },
      { threshold: 0.1 },
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current)
      }
    }
  }, [hasAnimated])

  return (
    <section ref={ref} className="px-4 py-24 bg-gradient-to-br from-gray-50 to-white min-h-screen flex items-center">
      <div className="max-w-7xl mx-auto w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div
            className={`space-y-8 transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <div className="space-y-4">
              <Badge className="bg-[#25F4EE]/10 text-[#25F4EE] border-[#25F4EE]/20">TikTok Analytics Platform</Badge>
              <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Advanced TikTok Video Analysis
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                Unlock the power of your TikTok content with comprehensive analytics, trend insights, and performance
                optimization tools designed for creators and brands.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href="/app">
              <Button size="lg" className="bg-[#FE2C55] hover:bg-[#FE2C55]/90 text-white px-8">
                Analyze video now
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
              </a>
              {/* <Button
                size="lg"
                variant="outline"
                className="border-[#25F4EE] text-[#25F4EE] hover:bg-[#25F4EE] hover:text-white px-8"
              >
                Watch Demo
              </Button> */}
            </div>
          </div>
          <div
            className={`relative transition-all duration-1000 delay-300 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"
            }`}
          >
            <div className="bg-white rounded-2xl shadow-2xl p-6">
              <Image
                src="/placeholder.svg?height=400&width=600"
                alt="TikTok Analytics Dashboard"
                width={600}
                height={400}
                className="rounded-lg"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
