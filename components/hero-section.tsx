import { Download, ArrowUp } from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative bg-gradient-to-br from-white via-white to-[#e8fafa] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 py-12 lg:py-20">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          <div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight text-[#333] mb-6">
              <span className="text-[#00c8c8]">作るだけで終わらない</span>
              <br />
              動画制作ツールの決定版
            </h1>
            <p className="text-[#666] text-lg mb-8">
              企画・制作・成果振り返りまで
              <br />
              一気通貫で支援するから、成果につながる
            </p>

            <div className="flex flex-wrap gap-8 mb-8">
              <div className="flex items-center gap-2">
                <span className="text-sm text-[#666]">広告CVR*1</span>
                <span className="text-3xl font-bold text-[#00c8c8]">3.5</span>
                <span className="text-[#00c8c8]">倍</span>
                <ArrowUp className="w-4 h-4 text-[#f5a623]" />
              </div>
              <div className="flex items-center gap-2 border-l border-[#ddd] pl-8">
                <span className="text-sm text-[#666]">サイト流入数*2</span>
                <span className="text-3xl font-bold text-[#00c8c8]">2</span>
                <span className="text-[#00c8c8]">倍</span>
                <ArrowUp className="w-4 h-4 text-[#f5a623]" />
              </div>
              <div className="flex items-center gap-2 border-l border-[#ddd] pl-8">
                <span className="text-sm text-[#666]">サイト滞在時間*3</span>
                <span className="text-3xl font-bold text-[#00c8c8]">1.28</span>
                <span className="text-[#00c8c8]">倍</span>
                <ArrowUp className="w-4 h-4 text-[#f5a623]" />
              </div>
            </div>

            <button className="bg-[#00c8c8] hover:bg-[#00b0b0] text-white px-8 py-4 rounded-full text-lg font-bold transition-colors flex items-center gap-2 shadow-lg">
              資料ダウンロードする（無料）
              <Download className="w-5 h-5" />
            </button>

            <p className="text-xs text-[#999] mt-4 leading-relaxed">
              ※1株式会社ワンスター株式会社様：「静止画広告」と「LetroStudioで制作した動画広告」の成果を比較した結果（平均値）
              <br />
              ※2新日本カレンダー株式会社様：「LetroStudioで制作した動画」でストーリーズ投稿を始める前後1ヶ月のInstagram経由サイトセッション数を比較した結果
              <br />
              ※3株式会社アイダ設計様：「LetroStudioで制作した動画」を視聴する前後の物件ページ滞在時間を比較した結果（最大値）
            </p>
          </div>

          <div className="relative">
            <div className="bg-white rounded-2xl shadow-2xl p-4 transform lg:rotate-[-2deg]">
              <img src="/laptop-showing-video-editing-software-interface-wi.jpg" alt="LetroStudio インターフェース" className="w-full rounded-lg" />
            </div>
            <div className="absolute -right-4 top-1/4 w-20 h-32">
              <img src="/smartphone-showing-social-media-video-content.jpg" alt="モバイル表示" className="w-full rounded-lg shadow-lg" />
            </div>
            <div className="absolute -bottom-4 -right-8 hidden lg:block">
              <img src="/friendly-asian-businesswoman-smiling-cutout.jpg" alt="サポートスタッフ" className="w-36" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
