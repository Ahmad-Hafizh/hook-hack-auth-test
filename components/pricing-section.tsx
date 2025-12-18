export function PricingSection() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 md:px-6 lg:px-8">
        {/* Title */}
        <div className="text-center mb-12 text-[#041D22] flex items-center justify-center">
          <span className="text-yellow-400 text-6xl mb-3 mr-2">-</span>
          <h2 className="text-3xl md:text-4xl font-bold  relative inline-block">
            費用
            {/* <span className="absolute -bottom-1 left-0 right-0 h-1 bg-yellow-400"></span> */}
          </h2>
          <span className="text-yellow-400 text-6xl mb-3 ml-2">-</span>
        </div>

        {/* Pricing Boxes */}
        <div className="flex flex-col md:flex-row justify-center items-stretch gap-6 md:gap-8 mb-12">
          {/* Tool Box */}
          <div className="flex-1 border border-gray-300 rounded-xl overflow-visible">
            <div className="bg-[#2C9FB8] text-white px-6 py-4 relative rounded-t-xl">
              <h3 className="text-xl md:text-2xl font-bold">ツール</h3>
              {/* Triangle pointing down */}
              <div
                className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full"
                style={{
                  width: 0,
                  height: 0,
                  borderLeft: "30px solid transparent",
                  borderRight: "30px solid transparent",
                  borderTop: "30px solid #2C9FB8",
                }}
              ></div>
            </div>
            <div className="p-6 space-y-4 w-full py-14 px-10 rounded-b-xl">
              <p className="text-base md:text-lg text-[#041D22]">
                動画月100本まで​
              </p>
              <p className="text-2xl md:text-3xl font-bold text-[#041D22]">
                月​額5万円​（税別）​
              </p>
              <p className="text-sm md:text-base text-[#041D22]">
                月100本以上は​10本単位で​3千円​（税別）​
              </p>
              <p className="text-sm text-red-500 pt-14 text-right">
                ※操作に​関する​サポートは​付帯しております
              </p>
            </div>
          </div>

          {/* Support Box */}
          <div className="flex-1 border border-gray-300 rounded-xl overflow-visible">
            <div className="bg-[#2C9FB8] text-white px-6 py-4 relative rounded-t-xl">
              <h3 className="text-xl md:text-2xl font-bold">サポート</h3>
              {/* Triangle pointing down */}
              <div
                className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full"
                style={{
                  width: 0,
                  height: 0,
                  borderLeft: "30px solid transparent",
                  borderRight: "30px solid transparent",
                  borderTop: "30px solid #2C9FB8",
                }}
              ></div>
            </div>
            <div className="p-6 space-y-4 py-14 px-10 rounded-b-xl">
              <p className="text-2xl md:text-3xl font-bold text-[#041D22]">
                月​額5万円​（税別）​
              </p>
              <div className="space-y-2 text-base md:text-lg text-[#041D22]">
                <p>広告成果レポート作成、​成果を</p>
                <p>踏まえた​改善提案、​月1回の​定例mtg</p>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Services */}
        <div className="w-full mx-auto space-y-4">
          <div className="text-base md:text-lg text-[#041D22]">
            <p className="font-bold mb-2">・動画カスタマイズ</p>
            <p className="text-gray-700">
              字幕位置変更、​要素追加・構成変更​（Hookの​後の​課題訴求、​強み4つ目など）は​別途ご相談ください​
            </p>
          </div>
          <div className="text-base md:text-lg text-[#041D22]">
            <p className="font-bold mb-2">・撮影</p>
            <p className="text-gray-700">
              都内近郊でしたら​承っておりますので、​ご相談ください​
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
