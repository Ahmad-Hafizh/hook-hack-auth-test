"use client";

import { Card, CardContent } from "@/components/ui/card";
import { BarChart3, TrendingUp, Users } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export default function Features() {
  const [isVisible, setIsVisible] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setIsVisible(true);
          setHasAnimated(true);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [hasAnimated]);

  const featureCards = [
    {
      icon: <BarChart3 className="w-8 h-8 text-[#25F4EE]" />,
      title: "ディスプレイ広告の需要増加",
      points: [
        "Webでの顧客接点において、能動層は検索エンジンからAI（LLM）に置き換わり、SEOからLLM対策としてのLLMOへのシフトが一部発生するが、広告主が取れる面（インプレッション）は減少していく見込みです",
        "Webマーケティングにおける受動層へのアプローチの重要性が相対的に高まることが想定されます",
      ],
      color: "#25F4EE",
    },
    {
      icon: <TrendingUp className="w-8 h-8 text-[#FE2C55]" />,
      title: "ディスプレイ広告のクリエイティブのセンターピンであるhook",
      points: [
        "Discover trending hashtags, sounds, and content formats to stay ahead of the curve.",
        "Analyze which hooks drive the most engagement.",
      ],
      color: "#FE2C55",
    },
    {
      icon: <Users className="w-8 h-8 text-[#25F4EE]" />,
      title: "国内Webマーケティングの市場構造｜生成AIの現在地点",
      points: [
        "Understand your audience demographics, behavior patterns, and optimal posting times.",
        "Leverage AI insights to optimize your marketing strategy.",
      ],
      color: "#25F4EE",
    },
  ];

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
            Comprehensive tools to track performance, understand trends, and
            optimize your TikTok strategy
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8 w-full">
          {featureCards.map((card, index) => (
            <Card
              key={card.title}
              className={`border-0 shadow-lg hover:shadow-xl transition-all duration-700 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
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
                <h3 className="text-xl font-semibold text-gray-900 mb-4 mt-3">
                  {card.title}
                </h3>
                <ul className="mt-7 space-y-1">
                  {card.points.map((point, idx) => (
                    <li
                      key={idx}
                      className="text-gray-600 text-sm leading-relaxed text-left mb-5"
                    >
                      - {point}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
