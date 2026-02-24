export function MainBenefitSection() {
  return (
    <section className="relative pt-40 pb-32 bg-[#e8fafa] overflow-x-clip">
      <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-12">
        {/* Title */}
        <div className="text-center mb-40">
          <div className="flex w-full justify-center items-center">
            <h2 className="text-3xl md:text-4xl font-bold text-[#2C9FB8] relative inline-block">
              主な機能
            </h2>
          </div>
        </div>

        {/* Features List */}
        <div className="space-y-32 md:space-y-44">
          {/* Feature 01 */}
          <div className="flex flex-col md:flex-row gap-16 md:gap-24 items-start">
            {/* Left Side: Content */}
            <div className="flex flex-col items-start flex-1">
              {/* Benefit Label */}
              <div className="mb-6">
                <span className="text-xs md:text-sm font-medium text-[#2C9FB8] tracking-wider uppercase">
                  benefit 1
                </span>
                <div className="w-[60px] h-[2px] bg-[#2C9FB8] mt-2"></div>
              </div>

              {/* Content */}
              <div className="flex-1">
                <h3
                  className="text-xl md:text-3xl text-[#333] mb-8 whitespace-nowrap"
                  style={{ lineHeight: 2.0 }}
                >
                  <span className="font-bold border-b-2 border-yellow-400 pb-1">
                    クリエイティブに根拠を
                  </span>
                  <br />
                  <span className="font-normal">
                    競合比較から「成果に繋がる訴求」を提案
                  </span>
                </h3>
                <p
                  className="text-[#666] text-base md:text-lg"
                  style={{ lineHeight: 2.5 }}
                >
                  LPを入力すると、同一ジャンルの他社LPを複数抽出。他社訴求を元に自社ポジショニングを整理し、自社ポジショニングを元に
                  Hook候補を発散→収束するプロセスを経て、コンバージョンに繋がる訴求を発掘していきます。
                  <br />
                  <span className="whitespace-nowrap">
                    動画広告でのクリエイティブテストをLP改修に活かすことも可能です。
                  </span>
                </p>
              </div>
            </div>

            {/* Right Side: Image */}
            <div className="flex-shrink-0 w-fit md:w-auto mt-10">
              <img
                src="/mainbenefit1.png"
                alt="Feature 1"
                className="w-full md:w-[500px] h-auto -mt-10"
              />
            </div>
          </div>

          {/* Feature 02 */}
          <div className="flex flex-col md:flex-row gap-16 md:gap-24 items-start">
            {/* Left Side: Image */}
            <div className="flex-shrink-0 w-fit md:w-auto order-2 md:order-1 mt-10">
              <img
                src="/mainbenefit2.png"
                alt="Feature 2"
                className="w-full md:w-[500px] h-auto -mt-10"
              />
            </div>

            {/* Right Side: Content */}
            <div className="flex flex-col items-start flex-1 order-1 md:order-2">
              {/* Benefit Label */}
              <div className="mb-6">
                <span className="text-xs md:text-sm font-medium text-[#2C9FB8] tracking-wider uppercase">
                  benefit 2
                </span>
                <div className="w-[60px] h-[2px] bg-[#2C9FB8] mt-2"></div>
              </div>

              {/* Content */}
              <div className="flex-1">
                <h3
                  className="text-xl md:text-3xl text-[#333] mb-8 whitespace-nowrap"
                  style={{ lineHeight: 2.0 }}
                >
                  <span className="font-bold border-b-2 border-yellow-400 pb-1">
                    LP入力から最短5分で10本
                  </span>
                  <br />
                  <span className="font-normal">
                    選択肢を選ぶだけで複数パターン生成
                  </span>
                </h3>
                <p
                  className="text-[#666] text-base md:text-lg"
                  style={{ lineHeight: 2.5 }}
                >
                  自社のポジショニングを元にHook（最初の3秒）・3つのポイント・CTAなど、動画のインタラクション率に直結する要素を選択すると、15-30秒の動画を複数パターン生成。仮説検証に必要な複数の動画を一度に用意できます。
                </p>
              </div>
            </div>
          </div>

          {/* Feature 03 */}
          <div className="flex flex-col md:flex-row gap-16 md:gap-24 items-start">
            {/* Left Side: Content */}
            <div className="flex flex-col items-start flex-1">
              {/* Benefit Label */}
              <div className="mb-6">
                <span className="text-xs md:text-sm font-medium text-[#2C9FB8] tracking-wider uppercase">
                  benefit 3
                </span>
                <div className="w-[60px] h-[2px] bg-[#2C9FB8] mt-2"></div>
              </div>

              {/* Content */}
              <div className="flex-1">
                <h3
                  className="text-xl md:text-3xl text-[#333] mb-8 whitespace-nowrap"
                  style={{ lineHeight: 2.0 }}
                >
                  <span className="font-bold border-b-2 border-yellow-400 pb-1">
                    PDCAを1ツールで完結
                  </span>
                  <br />
                  <span className="font-normal">
                    Google広告と連携して、改善案まで提案
                  </span>
                </h3>
                <p
                  className="text-[#666] text-base md:text-lg"
                  style={{ lineHeight: 2.5 }}
                >
                  出稿後、各パターンの視聴維持率・クリック・CVRなどを自動で解析し、次の改善案を提示。そのまま再生成も可能です。チームに運用ノウハウが少なくても、動画マーケティングのPDCAを実行できます。
                </p>
              </div>
            </div>

            {/* Right Side: Image */}
            <div className="flex-shrink-0 w-full md:w-auto mt-10">
              <img
                src="/mainbenefit3.png"
                alt="Feature 3"
                className="w-full md:w-[500px] h-auto -mt-10"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Half Circle Divider at Bottom - curves downward */}
      <div className="absolute -bottom-10 md:-bottom-16 lg:-bottom-5 left-0 right-0 h-12 md:h-20 lg:h-24 overflow-visible">
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 bg-[#e8fafa]"
          style={{
            width: "150%",
            height: "100%",
            borderRadius: "0 0 50% 50% / 0 0 100% 100%",
          }}
        ></div>
      </div>
    </section>
  );
}
