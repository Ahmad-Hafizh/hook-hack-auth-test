"use client"

import Image from "next/image"
import { useEffect, useRef, useState } from "react"

export default function FeaturesDetail() {
  const [isVisibleSection1, setIsVisibleSection1] = useState(false)
  const [isVisibleSection2, setIsVisibleSection2] = useState(false)
  const [hasAnimatedSection1, setHasAnimatedSection1] = useState(false)
  const [hasAnimatedSection2, setHasAnimatedSection2] = useState(false)
  const refSection1 = useRef<HTMLDivElement>(null)
  const refSection2 = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observerSection1 = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimatedSection1) {
          setIsVisibleSection1(true)
          setHasAnimatedSection1(true)
        }
      },
      { threshold: 0.1 },
    )

    const observerSection2 = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimatedSection2) {
          setIsVisibleSection2(true)
          setHasAnimatedSection2(true)
        }
      },
      { threshold: 0.1 },
    )

    if (refSection1.current) {
      observerSection1.observe(refSection1.current)
    }

    if (refSection2.current) {
      observerSection2.observe(refSection2.current)
    }

    return () => {
      if (refSection1.current) {
        observerSection1.unobserve(refSection1.current)
      }
      if (refSection2.current) {
        observerSection2.unobserve(refSection2.current)
      }
    }
  }, [hasAnimatedSection1, hasAnimatedSection2])

  return (
    <section className="px-4 py-16 bg-white" id="benefit">
      <div className="max-w-7xl mx-auto space-y-24">
        <div ref={refSection1} className="grid lg:grid-cols-2 gap-12 items-center">
          <div
            className={`space-y-6 transition-all duration-1000 ${
              isVisibleSection1 ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"
            }`}
          >
            <h3 className="text-3xl font-bold text-gray-900">Real-time performance tracking</h3>
            <p className="text-lg text-gray-600">
              Monitor your TikTok videos' performance in real-time with detailed metrics including views, engagement
              rates, and audience retention graphs.
            </p>
            <ul className="space-y-3">
              <li className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-[#25F4EE] rounded-full"></div>
                <span className="text-gray-700">Live engagement tracking</span>
              </li>
              <li className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-[#25F4EE] rounded-full"></div>
                <span className="text-gray-700">Audience retention analysis</span>
              </li>
              <li className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-[#25F4EE] rounded-full"></div>
                <span className="text-gray-700">Performance benchmarking</span>
              </li>
            </ul>
          </div>
          <div
            className={`bg-gray-50 rounded-2xl p-6 transition-all duration-1000 ${
              isVisibleSection1 ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"
            }`}
          >
            <Image
              src="/placeholder.svg?height=400&width=500"
              alt="Real-time Analytics"
              width={500}
              height={400}
              className="rounded-lg"
            />
          </div>
        </div>

        <div ref={refSection2} className="grid lg:grid-cols-2 gap-12 items-center">
          <div
            className={`bg-gray-50 rounded-2xl p-6 order-2 lg:order-1 transition-all duration-1000 ${
              isVisibleSection2 ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"
            }`}
          >
            <Image
              src="/placeholder.svg?height=400&width=500"
              alt="Competitor Analysis"
              width={500}
              height={400}
              className="rounded-lg"
            />
          </div>
          <div
            className={`space-y-6 order-1 lg:order-2 transition-all duration-1000 ${
              isVisibleSection2 ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"
            }`}
          >
            <h3 className="text-3xl font-bold text-gray-900">Competitor analysis</h3>
            <p className="text-lg text-gray-600">
              Stay ahead of the competition by analyzing their content strategy, engagement patterns, and trending
              content.
            </p>
            <ul className="space-y-3">
              <li className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-[#FE2C55] rounded-full"></div>
                <span className="text-gray-700">Content strategy insights</span>
              </li>
              <li className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-[#FE2C55] rounded-full"></div>
                <span className="text-gray-700">Hashtag performance comparison</span>
              </li>
              <li className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-[#FE2C55] rounded-full"></div>
                <span className="text-gray-700">Trending content alerts</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
