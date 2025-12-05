export function SolutionsSection() {
  const businessCompanyChallenges = [
    "今あるLP・画像素材を活かして手軽に動画を作りたい",
    "顧客に響く訴求を見つけたい",
    "代理店が忙しくて深い企画を作れていない",
    "動画のPDCAを自社で回したい",
    "P-MAXを運用しているが動画を作っていない",
  ];

  const agencyChallenges = [
    "クライアントから動画制作を求められるが、リソースが足りない",
    "動画改善提案を入れたいが、制作コストと利益が合わない",
    "P-MAXの自動生成動画ではブランドイメージが合わない",
    "競合分析や訴求抽出を高速化し、提案の質を上げたい",
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 md:px-6 lg:px-8">
        {/* Title */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[#00c8c8] relative inline-block mb-12">
            こんな課題を解決します
            <span className="absolute -bottom-5 left-0 right-0 h-1 bg-yellow-400"></span>
          </h2>
        </div>

        {/* Two Columns */}
        <div className="grid md:grid-cols-2 gap-8 md:gap-12">
          {/* Left Column: 事業会社様向け */}
          <div>
            <h3 className="text-xl md:text-2xl font-bold text-[#00c8c8] mb-6 text-center">
              事業会社様向け
            </h3>
            <div className="space-y-3">
              {businessCompanyChallenges.map((challenge, index) => (
                <div
                  key={index}
                  className="bg-white border border-gray-200 rounded-xl px-4 py-3 text-[#333] text-sm md:text-base hover:shadow-sm transition-shadow"
                >
                  {challenge}
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: 広告代理店様向け */}
          <div>
            <h3 className="text-xl md:text-2xl font-bold text-[#00c8c8] mb-6 text-center">
              広告代理店様向け
            </h3>
            <div className="space-y-3">
              {agencyChallenges.map((challenge, index) => (
                <div
                  key={index}
                  className="bg-white border border-gray-200 rounded-xl px-4 py-3 text-[#333] text-sm md:text-base hover:shadow-sm transition-shadow"
                >
                  {challenge}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
