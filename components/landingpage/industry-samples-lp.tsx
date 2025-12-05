"use client";

export default function IndustrySamplesLp() {
  const samples = [
    {
      category: "通販",
      subtitle: "(ECの生活雑貨・ガジェット・小物)",
      video: "/EC video.m4v",
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {samples.map((sample, index) => (
            <div key={index} className="flex flex-col items-center space-y-4">
              {/* Video Player */}
              <div className="w-full max-w-[280px] aspect-[9/16] rounded-lg overflow-hidden shadow-lg relative bg-black mx-auto mt-14">
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
        {/* Inquiry Section */}
        <div className="mt-16 flex flex-col items-center space-y-6">
          <p className="text-xl md:text-2xl font-bold text-white text-center">
            上記業界以外でも、​どのような​動画が​成果に​繋がるか​お応えします
          </p>
          <button className="bg-[#2af0ea] text-black hover:bg-[#288784] hover:text-white transition-all duration-300 border-2 border-[#2af0ea] rounded-lg px-8 py-3 font-bold text-lg">
            問い​合わせ
          </button>
        </div>
      </div>
    </section>
  );
}
