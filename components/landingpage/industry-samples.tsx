"use client";

export default function IndustrySamples() {
  const samples = [
    {
      category: "通販",
      subtitle: "(ECの生活雑貨・ガジェット・小物)",
      video: "/EC video.m4v",
    },
    {
      category: "教育",
      subtitle: "(語学・資格・オンラインスクール)",
      video: "/",
    },
    {
      category: "BtoB SaaS",
      subtitle: "(予約管理・CRM・業務効率化ツール)",
      video: "/B2B Saas.m4v",
    },
    {
      category: "不動産",
      subtitle: "(分譲マンション、戸建てオープンハウス)",
      video: "/Real estate.m4v",
    },
  ];

  return (
    <section
      className="w-full py-16 md:py-24 px-10 md:px-24 bg-black"
      id="videos"
    >
      <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-12">
        業界別サンプル動画
      </h2>
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {samples.map((sample, index) => (
            <div key={index} className="flex flex-col items-center space-y-4">
              {/* Video Player */}
              <div className="w-full aspect-[9/16] rounded-lg overflow-hidden shadow-lg relative bg-black">
                <video
                  className="w-full h-full object-cover"
                  controls
                  playsInline
                  preload="metadata"
                >
                  <source src={sample.video} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
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
