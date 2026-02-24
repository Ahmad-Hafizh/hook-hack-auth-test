"use client"

import Image from "next/image"
import { Star } from "lucide-react"
import { useEffect, useRef, useState } from "react"

export default function Testimonial() {
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
    <section ref={ref} className="px-4 py-16 bg-gradient-to-r from-[#25F4EE] to-[#25F4EE]/80">
      <div
        className={`max-w-4xl mx-auto text-center text-white transition-all duration-1000 ${
          isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
        }`}
      >
        <div className="flex justify-center mb-6">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="w-6 h-6 fill-current" />
          ))}
        </div>
        <blockquote className="text-2xl lg:text-3xl font-medium mb-8 leading-relaxed">
          "Clip-Studio transformed how we analyze our TikTok performance. The insights helped us increase our engagement
          by 300% in just two months."
        </blockquote>
        <div className="flex items-center justify-center space-x-4">
          <Image
            src="/placeholder.svg?height=60&width=60"
            alt="Sarah Johnson"
            width={60}
            height={60}
            className="rounded-full"
          />
          <div className="text-left">
            <div className="font-semibold">Sarah Johnson</div>
            <div className="opacity-90">Content Creator, 2M followers</div>
          </div>
        </div>
      </div>
    </section>
  )
}
