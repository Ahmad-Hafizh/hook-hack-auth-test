"use client"

import { useEffect, useRef, useState } from "react"

export default function TrustedBy() {
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

  const companies = ["Creator Co.", "Brand Studio", "Media House", "Influence Inc.", "Content Lab", "Viral Agency"]

  return (
    <section ref={ref} className="px-4 py-12 bg-white">
      <div className="max-w-7xl mx-auto text-center">
        <p className="text-gray-500 mb-8">Trusted by leading creators and brands</p>
        <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
          {companies.map((company, index) => (
            <div
              key={company}
              className={`text-gray-400 font-semibold text-lg transition-all duration-700 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              {company}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
