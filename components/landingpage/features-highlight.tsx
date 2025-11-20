"use client";

import { Timer, Target, Wrench } from "lucide-react";
import TrialDialog from "./TrialDialog";

export default function FeaturesHighlight() {
  const features = [
    {
      icon: Timer,
      text: "15秒で「悩み共感 → 特徴3点 → CTA」を整理できる",
    },
    {
      icon: Target,
      text: "商材の価値が明確で顧客に伝えやすい",
    },
    {
      icon: Wrench,
      text: "世界観より「課題解決」や「利便性」が重視される",
    },
  ];

  return (
    <section
      className="w-full py-16 md:py-24 px-10 md:px-24 bg-black"
      id="features-highlight"
    >
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-12 md:mb-16">
          特徴
        </h2>

        <div className="space-y-8 md:space-y-10 mb-12 md:mb-16">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <div key={index} className="flex items-start gap-6 md:gap-8">
                {/* Icon */}
                <div className="flex-shrink-0 w-16 h-16 md:w-20 md:h-20 rounded-full bg-black flex items-center justify-center -mt-1">
                  <IconComponent className="w-8 h-8 md:w-10 md:h-10 text-white" />
                </div>
                {/* Text */}
                <p className="text-lg md:text-xl text-white flex-1">
                  {feature.text}
                </p>
              </div>
            );
          })}
        </div>

        {/* CTA Button */}
        <div className="flex justify-center">
          <TrialDialog
            trigger={
              <button className="bg-[#2af0ea] text-black hover:bg-[#288784] hover:text-white transition-all duration-300 rounded-lg px-8 py-3 md:px-10 md:py-4 font-bold text-base md:text-lg">
                1週間無料トライアルで今すぐ制作
              </button>
            }
          />
        </div>
      </div>
    </section>
  );
}
