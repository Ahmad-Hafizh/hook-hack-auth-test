import React from "react";

const priceTiers = [
  {
    name: "",
    desc: "",
    price: "",
    count: "",
    highlight: false,
  },
  {
    name: "レギュラー",
    desc: "何回でも使い放題のプラン",
    price: "¥3,500",
    count: " 使用回数 ∞ 回",
    highlight: true,
  },
  {
    name: "",
    desc: "",
    price: "",
    count: "",
    highlight: false,
  },
];

export default function Price() {
  return (
    <section
      className="bg-black pb-32 pt-20 md:pb-56 md:pt-36 flex flex-col items-center md:px-0 px-10"
      id="price"
    >
      <div className="max-w-7xl w-full mx-auto px-2 sm:px-4 md:px-8">
        <div className="flex flex-col md:flex-row gap-8 justify-center items-stretch w-full">
          {/* Title column */}
          <div className="flex flex-row md:flex-col items-center md:items-start justify-center md:justify-start w-full md:w-1/4 min-w-[120px] mt-5 mb-6 md:mb-0">
            <h2 className="text-3xl md:text-4xl font-semibold text-white mb-2 whitespace-nowrap">
              料金体制
            </h2>
          </div>
          {/* Price tiers */}
          {priceTiers.map((tier, idx) => (
            <div
              key={idx}
              className="relative w-full lg:w-1/4 flex flex-col items-center mb-6 md:mb-0"
            >
              {/* {tier.highlight && (
                <div className="absolute -top-7 left-1/2 -translate-x-1/2 z-20">
                  <span className="bg-white text-[#fe2858] border-2 border-[#fe2858] px-4 py-1 rounded-full text-sm font-bold shadow-lg">
                    一番人気
                  </span>
                </div>
              )} */}
              <div
                className={`flex flex-col items-center rounded-[2.5rem] p-6 md:p-10 lg:py-12 lg:px-5 shadow-lg w-full h-full transition-all duration-300 ${
                  tier.highlight
                    ? "bg-[#fe2858] text-white scale-105 border-4 border-[#fe2858] border-solid"
                    : "text-black bg-gray-200 hidden lg:inline"
                }`}
              >
                <div
                  className={`text-lg md:text-xl font-bold mb-2 ${
                    tier.highlight ? "text-white" : "text-black"
                  }`}
                >
                  {tier.name}
                </div>
                <div
                  className={`text-xs md:text-sm mb-4 ${
                    tier.highlight ? "text-white" : "text-gray-500"
                  }`}
                >
                  {tier.desc}
                </div>
                <div className="text-3xl md:text-4xl font-bold mb-4">
                  {tier.price}
                </div>
                <div
                  className={`text-sm md:text-base mb-2 ${
                    tier.highlight ? "text-white" : "text-black"
                  }`}
                >
                  <span className="text-xl md:text-2xl font-bold">
                    {tier.count}
                  </span>{" "}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
