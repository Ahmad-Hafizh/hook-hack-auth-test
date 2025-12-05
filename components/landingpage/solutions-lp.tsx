export default function SolutionsLp() {
  const businessCompanySolutions = [
    "今あるLP・画像素材を活かして手軽に動画を作りたい",
    "バナーデザインのパターンを広げたい",
    "代理店が忙しくて深い企画を作れていない",
    "動画のPDCAを自社で回したい",
    "P-MAXを運用しているが動画を作っていない",
  ];

  const agencySolutions = [
    "少額案件でも動画改善提案を可能にし、利益率を維持したい",
    "動画制作を外注しているが、内製化したい",
    "競合分析や訴求抽出を効率化し、提案の質を高めたい",
    "P-MAXの自動生成動画ではブランドイメージが合わない",
  ];

  return (
    <div className="w-full py-20 px-10 md:px-24 flex flex-col items-center bg-gray-100">
      <h2 className="text-3xl md:text-4xl font-bold text-black mb-12 text-center">
        このような課題を解決します
      </h2>
      <div className="w-full max-w-7xl grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Business Companies Column */}
        <div className="flex flex-col gap-6">
          <div className="bg-gray-800 rounded-lg px-6 py-4">
            <h3 className="text-2xl md:text-3xl font-bold text-white text-center">
              事業会社様
            </h3>
          </div>
          {businessCompanySolutions.map((solution, index) => (
            <div
              key={index}
              className="w-full bg-white rounded-lg px-8 py-6 shadow-sm"
            >
              <p className="text-lg md:text-xl text-black text-center">
                {solution}
              </p>
            </div>
          ))}
        </div>

        {/* Advertising Agencies Column */}
        <div className="flex flex-col gap-6">
          <div className="bg-gray-800 rounded-lg px-6 py-4">
            <h3 className="text-2xl md:text-3xl font-bold text-white text-center">
              広告代理店様
            </h3>
          </div>
          {agencySolutions.map((solution, index) => (
            <div
              key={index}
              className="w-full bg-white rounded-lg px-8 py-6 shadow-sm"
            >
              <p className="text-lg md:text-xl text-black text-center">
                {solution}
              </p>
            </div>
          ))}
          {/* Empty box to match left column */}
          <div className="w-full bg-white rounded-lg px-8 py-6 shadow-sm h-20">
            <p className="text-lg md:text-xl text-black text-center"></p>
          </div>
        </div>
      </div>
    </div>
  );
}
