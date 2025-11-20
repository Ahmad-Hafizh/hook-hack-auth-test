"use client";

export default function IndustrySamples() {
  const samples = [
    {
      category: "通販",
      subtitle: "(ECの生活雑貨・ガジェット・小物)",
    },
    {
      category: "教育",
      subtitle: "(語学・資格・オンラインスクール)",
    },
    {
      category: "BtoB SaaS",
      subtitle: "(予約管理・CRM・業務効率化ツール)",
    },
    {
      category: "不動産",
      subtitle: "(分譲マンション、戸建てオープンハウス)",
    },
  ];

  return (
    <section className="w-full py-16 md:py-24 px-10 md:px-24 bg-black">
      <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-12">
        業界別サンプル動画
      </h2>
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {samples.map((sample, index) => (
            <div key={index} className="flex flex-col items-center space-y-4">
              {/* Video Placeholder */}
              <div className="w-full aspect-[9/16] bg-white rounded-lg flex items-center justify-center shadow-lg">
                {/* Play Button Icon */}
                <div className="w-16 h-16 md:w-20 md:h-20 flex items-center justify-center">
                  <svg
                    className="w-full h-full text-black"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </div>
              {/* Category Title */}
              <h3 className="text-xl md:text-2xl font-bold text-white text-center">
                {sample.category}
              </h3>
              {/* Category Subtitle */}
              <p className="text-sm md:text-base text-white text-center">
                {sample.subtitle}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
