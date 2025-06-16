"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Brain, Sparkles, Target } from "lucide-react"
import { useEffect, useRef, useState } from "react"

export default function AIFeatures() {
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

  const aiFeatures = [
    {
      icon: <Brain className="w-6 h-6 text-[#25F4EE]" />,
      title: "Content Optimization",
      description: "AI analyzes your best-performing content and suggests improvements for future videos.",
      color: "#25F4EE",
    },
    {
      icon: <Sparkles className="w-6 h-6 text-[#FE2C55]" />,
      title: "Trend Prediction",
      description: "Predict upcoming trends and viral content opportunities before they peak.",
      color: "#FE2C55",
    },
    {
      icon: <Target className="w-6 h-6 text-[#25F4EE]" />,
      title: "Smart Recommendations",
      description: "Get personalized recommendations for hashtags, posting times, and content formats.",
      color: "#25F4EE",
    },
  ]

  return (
    <section ref={ref} className="px-4 py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div
          className={`text-center mb-16 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">AI-powered insights</h2>
          <p className="text-xl text-gray-600">Leverage artificial intelligence to optimize your TikTok strategy</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {aiFeatures.map((feature, index) => (
            <Card
              key={feature.title}
              className={`border-0 shadow-lg transition-all duration-700 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
              style={{ transitionDelay: `${index * 200}ms` }}
            >
              <CardContent className="p-8">
                <div
                  className={`w-12 h-12 rounded-lg flex items-center justify-center mb-6`}
                  style={{ backgroundColor: `${feature.color}10` }}
                >
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
