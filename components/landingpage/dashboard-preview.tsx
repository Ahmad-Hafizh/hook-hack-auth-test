"use client"

import Image from "next/image"
import { useEffect, useRef, useState } from "react"

export default function DashboardPreview() {
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

  const stats = [
    { value: "10M+", label: "Videos Analyzed", color: "#FE2C55" },
    { value: "50K+", label: "Active Users", color: "#25F4EE" },
    { value: "99.9%", label: "Uptime", color: "#FE2C55" },
  ]

  return (
    <section ref={ref} className="px-4 py-16 bg-white">
      <div className="max-w-7xl mx-auto">
        <div
          className={`text-center mb-16 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Powerful dashboard and visualization</h2>
          <p className="text-xl text-gray-600">Get actionable insights with our intuitive analytics dashboard</p>
        </div>
        <div
          className={`bg-gray-50 rounded-2xl p-8 transition-all duration-1000 ${
            isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
          }`}
        >
          <Image
            src="/placeholder.svg?height=600&width=1200"
            alt="Analytics Dashboard"
            width={1200}
            height={600}
            className="rounded-lg shadow-lg mx-auto"
          />
        </div>
        <div className="grid md:grid-cols-3 gap-8 mt-12">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className={`text-center transition-all duration-700 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
              style={{ transitionDelay: `${(index + 1) * 200}ms` }}
            >
              <div className="text-3xl font-bold mb-2" style={{ color: stat.color }}>
                {stat.value}
              </div>
              <p className="text-gray-600">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
