export function MainBenefitSection() {
  const features = [
    {
      number: "01",
      title: "訴求軸に根拠を | 競合と比較して「成果につながる訴求」を提案",
      description:
        "LPのURLを入力すると、同じジャンルの競合LPを複数抽出。競合の訴求を元に自社ポジショニング候補を発散・収束し、自社ポジショニングを元にインサイト・Hook候補を発散・収束することで、反応が得られやすい訴求を発見します。",
    },
    {
      number: "02",
      title: "LP入力から5分で10パターン | 選択肢を選ぶだけで複数パターン生成",
      description:
        "自社のポジショニングに基づき、動画のインタラクション率に直結する要素（Hook（最初の3秒）、3つの訴求ポイント、CTA）を選択するだけで、15秒動画の複数パターンを生成。仮説検証に必要な複数の動画を一気に準備できます。",
    },
    {
      number: "03",
      title: "PDCAを1ツールで | 自動で成果を分析、改善案まで提案",
      description:
        "公開後、各パターンの視聴維持率、クリック数、CVRなどを自動分析し、次の改善案を提案。そのまま再生成も可能で、チーム内の運用ノウハウが少なくても、成果を高速に改善できます。",
    },
  ];

  return (
    <section className="py-20 bg-[#e8fafa]">
      <div className="max-w-6xl mx-auto px-4 md:px-6 lg:px-8">
        {/* Title */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[#00c8c8] relative inline-block">
            主な機能
            <span className="absolute -bottom-1 left-0 right-0 h-1 bg-yellow-400"></span>
          </h2>
        </div>

        {/* Features List */}
        <div className="space-y-12">
          {features.map((feature, index) => (
            <div key={index} className="flex flex-col md:flex-row gap-6 items-start">
              {/* Number Circle */}
              <div className="flex-shrink-0">
                <div className="w-16 h-16 bg-[#00c8c8] rounded-full flex items-center justify-center">
                  <span className="text-white text-xl md:text-2xl font-bold">
                    {feature.number}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="flex-1">
                <h3 className="text-lg md:text-xl font-bold text-[#333] mb-3">
                  {feature.title}
                </h3>
                <p className="text-[#666] text-sm md:text-base leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

