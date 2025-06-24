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
      icon: <BarChart3 className="w-8 h-8 text-white" />,
      title: "ディスプレイ広告の需要増加",
      points: [
        "Webでの顧客接点において、能動層は検索エンジンからAI（LLM）に置き換わり、SEOからLLM対策としてのLLMOへのシフトが一部発生するが、広告主が取れる面（インプレッション）は減少していく見込みです",
        "Webマーケティングにおける受動層へのアプローチの重要性が相対的に高まることが想定されます",
      ],
      color: "#4000B3",
    },
    {
      icon: <TrendingUp className="w-8 h-8 text-white" />,
      title: "ディスプレイ広告のクリエイティブのセンターピンであるhook",
      points: [
        "ディスプレイ広告の質を高めるためには、脳のシステム2（時間はかかるが論理的で正確な判断）の前に働くシステム1（直感的で10歳児レベルの判断力）を突破するため、ユーザーにとって自分事化できるhookが重要です",
        "広告で伝えたい商品・サービスの必要性をユーザーの文脈に合わせた上で、hookを制作していくことが望ましいです（hookがずれるとただの煩わしい「広告」になる懸念があります）",
      ],
      color: "#6D01D7",
    },
    {
      icon: <Users className="w-8 h-8 text-white" />,
      title: "国内Webマーケティングの市場構造｜生成AIの現在地点",
      points: [
        "現状は生成AIがクリエイティブ領域にも活用が進み始めていますが、クオリティはプロンプトを投げるディレクター・クリエイターの力量に依るところが大きく、プロンプトが一般的な場合、LLMの性質上、最大公約数的になる傾向が強い課題があります",
        "ショート動画のクリエイター市場は2000年代から歴史のあるSEM市場（SEO・リスティング広告）と比較して若手の方々が多い特徴がありますが、クライアントの事業理解やユーザーの解像度に課題を抱えている場合、上司・クライアントに企画を通すことや、成果を向上することのハードルが高いケースがあります",
      ],
      color: "#c2a3ff",
    },
  ];

  return (
    <section id="features" ref={ref} className="px-10 py-32 bg-black">
      <div className="max-w-7xl mx-auto">
        <div
          className={`text-center mb-16 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <h2 className="text-3xl lg:text-3xl font-bold text-[#fe2858] mb-4">
            今後、ますますショート動画広告、特にHookの重要性が高まることが想定されます
          </h2>
          <h2
            className="text-3xl lg:text-3xl font-bold text-white my-12"
            style={{ textShadow: "0 0 8px #2af0ea55" }}
          >
            市場構造
          </h2>
        </div>
        <div className="flex flex-col gap-8 w-full">
          {featureCards.map((card, index) => (
            <Card
              key={card.title}
              className={`shadow-lg hover:shadow-xl transition-all duration-700 bg-[#18181b] border border-[#2af0ea22] ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
              style={{ transitionDelay: `${index * 200}ms` }}
            >
              <CardContent className="p-8 text-center">
                <div
                  className={`w-16 h-16 bg-black rounded-full flex items-center justify-center mx-auto mb-6 border-2 text-white border-[#fe2858] shadow-[0_0_12px_#2af0ea33]`}
                >
                  {card.icon}
                </div>
                <h3 className="text-2xl font-semibold text-white mb-4 mt-3">
                  {card.title}
                </h3>
                <ul className="mt-7 space-y-1">
                  {card.points.map((point, idx) => (
                    <li
                      key={idx}
                      className="text-[#e5e5e5] text-sm leading-relaxed text-left mb-5 px-24 py-2 border-l-4 border-[#fe2858] bg-[#18181b] bg-opacity-80 shadow-[0_0_8px_#2af0ea22]"
                    >
                      - {point}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="mt-20">
          <h2
            className="text-2xl font-semibold text-white mb-4 text-center"
            style={{ textShadow: "0 0 8px #2af0ea55" }}
          >
            上記のような市場構造において、今後のWeb市場のセンターピンであるhookの精度を高めるため、ユーザーの生の声としてオーガニック投稿のコメントを抽出し企画案の出力まで行います
          </h2>
        </div>
      </div>
    </section>
  );
}
