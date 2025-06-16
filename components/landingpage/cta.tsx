"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { useEffect, useRef, useState } from "react"

export default function CTA() {
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
    <section ref={ref} className="px-4 py-16 bg-gradient-to-r from-[#FE2C55] to-[#FE2C55]/80">
      <div
        className={`max-w-4xl mx-auto text-center text-white transition-all duration-1000 ${
          isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
        }`}
      >
        <h2 className="text-3xl lg:text-4xl font-bold mb-6">Ready to supercharge your TikTok strategy?</h2>
        <p className="text-xl mb-8 opacity-90">
          Join thousands of creators and brands using Clip-Studio to grow their TikTok presence
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" className="bg-white text-[#FE2C55] hover:bg-gray-100 px-8">
            Start Free Trial
            <ArrowRight className="ml-2 w-4 h-4" />
          </Button>

        </div>
      </div>
    </section>
  )
}
