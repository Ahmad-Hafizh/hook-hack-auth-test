"use client"

import { Card, CardContent } from "@/components/ui/card"
import { BarChart3, TrendingUp, Users } from "lucide-react"
import { useEffect, useRef, useState } from "react"

export default function Features() {
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

  const featureCards = [
    {
      icon: <BarChart3 className="w-8 h-8 text-[#25F4EE]" />,
      title: "Performance Analytics",
      description:
        "Track views, likes, shares, and engagement rates across all your TikTok videos with detailed insights.",
      color: "#25F4EE",
    },
    {
      icon: <TrendingUp className="w-8 h-8 text-[#FE2C55]" />,
      title: "Trend Analysis",
      description: "Discover trending hashtags, sounds, and content formats to stay ahead of the curve.",
      color: "#FE2C55",
    },
    {
      icon: <Users className="w-8 h-8 text-[#25F4EE]" />,
      title: "Audience Insights",
      description: "Understand your audience demographics, behavior patterns, and optimal posting times.",
      color: "#25F4EE",
    },
  ]

  return (
    <section id="features" ref={ref} className="px-4 py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div
          className={`text-center mb-16 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Everything you need to analyze TikTok content
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive tools to track performance, understand trends, and optimize your TikTok strategy
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {featureCards.map((card, index) => (
            <Card
              key={card.title}
              className={`border-0 shadow-lg hover:shadow-xl transition-all duration-700 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
              style={{ transitionDelay: `${index * 200}ms` }}
            >
              <CardContent className="p-8 text-center">
                <div
                  className={`w-16 h-16 bg-[${card.color}]/10 rounded-full flex items-center justify-center mx-auto mb-6`}
                  style={{ backgroundColor: `${card.color}10` }}
                >
                  {card.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">{card.title}</h3>
                <p className="text-gray-600">{card.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
