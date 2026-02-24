export function IntroSection() {
  return (
    <section className="py-20 bg-[#fafafa]">
      <div className="max-w-4xl mx-auto px-4 md:px-6 lg:px-8 text-center">
        <div className="inline-block bg-white rounded-full px-6 py-3 shadow-md mb-8">
          <p className="text-[#666] flex items-center gap-2">
            <span className="text-2xl">🎬</span>
            <span className="text-[#f5a623] font-bold border-b-2 border-[#f5a623]">動画を作るだけで終わり</span>
            になっていませんか？
          </p>
        </div>

        <h2 className="text-2xl md:text-3xl font-bold mb-4">
          <span className="text-[#00c8c8]">LetroStudio</span>は
        </h2>
        <p className="text-xl md:text-2xl font-bold text-[#00c8c8] mb-2">
          動画を作るだけでなく、検証・改善まで支援する
        </p>
        <p className="text-xl md:text-2xl font-bold text-[#00c8c8] mb-8">動画マーケティングサービスです</p>

        <div className="grid md:grid-cols-2 gap-8 mt-12">
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <div className="bg-[#666] text-white rounded-full px-6 py-2 inline-block mb-4">従来の動画編集ツール</div>
            <p className="text-[#666] mb-4">
              作りたい動画を
              <br />
              作るための手段
            </p>
            <div className="relative h-48">
              <img
                src="/simple-circular-diagram-showing-just-video-product.jpg"
                alt="従来の動画編集ツール"
                className="w-full h-full object-contain"
              />
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border-2 border-[#00c8c8]">
            <div className="bg-[#00c8c8] text-white rounded-full px-6 py-2 inline-block mb-4">LetroStudio</div>
            <p className="text-[#666] mb-4">
              設計・企画 → 制作 → 検証・改善を迅速に行い
              <br />
              広告宣伝・営業販促の成果につなげる手段
            </p>
            <div className="relative h-48">
              <img
                src="/circular-diagram-showing-design-planning-productio.jpg"
                alt="LetroStudioのサイクル"
                className="w-full h-full object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
