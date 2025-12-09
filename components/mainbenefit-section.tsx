export function MainBenefitSection() {
  return (
    <section className="py-20 bg-[#e8fafa]">
      <div className="max-w-6xl mx-auto px-4 md:px-6 lg:px-8">
        {/* Title */}
        <div className="text-center mb-24">
          <div className="flex w-full justify-center items-center">
            <img src="/5.png" alt="" className="h-6 md:h-9 w-auto mt-1 mr-2" />
            <h2 className="text-3xl md:text-4xl font-bold text-[#2C9FB8] relative inline-block">
              主な機能
              {/* <span className="absolute -bottom-5 left-0 right-0 h-1 bg-yellow-400"></span> */}
            </h2>
            <img src="/6.png" alt="" className="h-6 md:h-9 w-auto mt-1 ml-2" />
            {/* <span className="text-yellow-400 text-6xl  mb-3 ml-2">-</span> */}
          </div>
        </div>

        {/* Features List */}
        <div className="space-y-12">
          {/* Feature 01 */}
          <div className="flex flex-col md:flex-row gap-8 items-start">
            {/* Left Side: Number Circle and Content */}
            <div className="flex flex-col md:flex-row gap-6 items-start flex-1">
              {/* Number Circle */}
              <div className="flex-shrink-0">
                <div className="w-16 h-16 bg-[#2C9FB8] rounded-full flex items-center justify-center">
                  <span className="text-white text-xl md:text-2xl font-bold">
                    01
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 mr-12">
                <h3 className="text-lg md:text-xl font-bold text-[#333] mb-3">
                  訴求軸に​根拠を​｜競合と​比較して <br />
                  ​「成果に​つながる​訴求」を​提案
                </h3>
                <p className="text-[#666] text-sm md:text-lg leading-relaxed">
                  LPの​URLを​入力すると、​同一ジャンルの​他社LPを
                  <br />
                  ​複数抽出。他社訴求を​元に​自社ポジショニング候補を​発散→収束し、​自社ポジショニングを​元に
                  <br />
                  ​インサイトと​Hook候補を発散→収束する​プロセスを​経て、​反応を​得やすい​訴求を​発掘していきます。​
                </p>
              </div>
            </div>

            {/* Right Side: Image */}
            <div className="flex-shrink-0 w-full md:w-auto">
              <img
                src="/feature1.png"
                alt="Feature 1"
                className="w-full md:w-[500px] h-72 rounded-lg object-cover shadow-md"
              />
            </div>
          </div>

          {/* Feature 02 */}
          <div className="flex flex-col md:flex-row gap-8 items-start">
            {/* Left Side: Number Circle and Content */}
            <div className="flex flex-col md:flex-row gap-6 items-start flex-1">
              {/* Number Circle */}
              <div className="flex-shrink-0">
                <div className="w-16 h-16 bg-[#2C9FB8] rounded-full flex items-center justify-center">
                  <span className="text-white text-xl md:text-2xl font-bold">
                    02
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 mr-12">
                <h3 className="text-lg md:text-xl font-bold text-[#333] mb-3">
                  LP入力から​5分で​10パターン｜
                  <br />
                  選択肢を​選ぶだけで​複数パターン生成
                </h3>
                <p className="text-[#666] text-sm md:text-lg leading-relaxed">
                  自社の​ポジショニングを​元に​Hook​（最初の​3秒）​・​3つの​ポイント・CTAなど、​動画の​インタラクション率に​直結する​要素を​選択すると、​15秒の​動画を​複数パターン生成。仮説検証に​必要な​複数の​動画を​一度に​用意できます。
                </p>
              </div>
            </div>

            {/* Right Side: Image */}
            <div className="flex-shrink-0 w-full md:w-auto">
              <img
                src="/feature2.png"
                alt="Feature 2"
                className="w-full md:w-[500px] h-72 rounded-lg object-cover shadow-md"
              />
            </div>
          </div>

          {/* Feature 03 */}
          <div className="flex flex-col md:flex-row gap-8 items-start">
            {/* Left Side: Number Circle and Content */}
            <div className="flex flex-col md:flex-row gap-6 items-start flex-1">
              {/* Number Circle */}
              <div className="flex-shrink-0">
                <div className="w-16 h-16 bg-[#2C9FB8] rounded-full flex items-center justify-center">
                  <span className="text-white text-xl md:text-2xl font-bold">
                    03
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 mr-12">
                <h3 className="text-lg md:text-xl font-bold text-[#333] mb-3">
                  PDCAを​1ツールで​｜自動で​成果を​分析、
                  <br />
                  ​改善案まで​提案
                </h3>
                <p className="text-[#666] text-sm md:text-lg leading-relaxed">
                  出稿後、​各パターンの​視聴維持率・クリック・CVRなどを​自動で​解析し、​次の​改善案を​提示。​
                  <br />
                  そのまま​再生成も​可能です。​チームに​運用ノウハウが​少なくても、​高速に​成果を​改善できます。​
                </p>
              </div>
            </div>

            {/* Right Side: Image */}
            <div className="flex-shrink-0 w-full md:w-auto">
              <img
                src="/feature3.png"
                alt="Feature 3"
                className="w-full md:w-[500px] h-72 rounded-lg object-cover shadow-md"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
