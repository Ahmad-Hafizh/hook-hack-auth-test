import { Sparkles, Clock, Palette, LayoutGrid } from "lucide-react"

export function FeaturesSection() {
  const features = [
    { icon: "📊", label: "SNS広告" },
    { icon: "📱", label: "Webサイト" },
    { icon: "📧", label: "メルマガ" },
    { icon: "🛒", label: "EC" },
    { icon: "📺", label: "YouTube" },
    { icon: "📸", label: "Instagram" },
    { icon: "🎵", label: "TikTok" },
    { icon: "💼", label: "営業資料" },
    { icon: "🎓", label: "研修" },
    { icon: "📋", label: "マニュアル" },
    { icon: "🏪", label: "店頭POP" },
    { icon: "📡", label: "デジタルサイネージ" },
  ]

  return (
    <section className="py-20 bg-[#e8fafa]">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-start mb-16">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="bg-[#00c8c8] text-white w-8 h-8 rounded-full flex items-center justify-center text-sm">
                02
              </span>
              <span className="text-[#666]">LetroStudioのクリエイティブ支援</span>
            </div>
            <h3 className="text-xl md:text-2xl font-bold mb-6">
              <span className="text-[#00c8c8]">1つの動画の工数を大幅削減。</span>
              <br />
              高速な編集機能で
              <br />
              カスタマイズも自由自在
            </h3>

            <div className="bg-white rounded-2xl p-6 mb-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="text-4xl font-bold text-[#00c8c8]">85%</div>
                <p className="text-sm text-[#666]">
                  LetroStudio
                  <br />
                  制作工数削減率
                </p>
              </div>
              <img src="/bar-chart-showing-video-production-time-reduction-.jpg" alt="工数削減グラフ" className="w-full" />
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <img src="/video-editing-interface-showing-template-customiza.jpg" alt="編集機能の画面" className="w-full rounded-lg" />
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          <div className="bg-white rounded-xl p-4 flex items-center gap-3">
            <Sparkles className="w-8 h-8 text-[#00c8c8]" />
            <div>
              <p className="font-bold text-sm">テンプレート編集</p>
              <p className="text-xs text-[#666]">豊富なテンプレートから選択</p>
            </div>
          </div>
          <div className="bg-white rounded-xl p-4 flex items-center gap-3">
            <Clock className="w-8 h-8 text-[#00c8c8]" />
            <div>
              <p className="font-bold text-sm">スピード編集</p>
              <p className="text-xs text-[#666]">15分で動画完成</p>
            </div>
          </div>
          <div className="bg-white rounded-xl p-4 flex items-center gap-3">
            <Palette className="w-8 h-8 text-[#00c8c8]" />
            <div>
              <p className="font-bold text-sm">ブランドカラー</p>
              <p className="text-xs text-[#666]">自社カラーに簡単変更</p>
            </div>
          </div>
          <div className="bg-white rounded-xl p-4 flex items-center gap-3">
            <LayoutGrid className="w-8 h-8 text-[#00c8c8]" />
            <div>
              <p className="font-bold text-sm">マルチフォーマット</p>
              <p className="text-xs text-[#666]">縦横自由に出力</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-8">
          <h4 className="text-center font-bold mb-6">
            あらゆるフォーマットに対応した
            <br />
            多彩なテンプレート機能
          </h4>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
            {features.map((feature, index) => (
              <div key={index} className="text-center">
                <div className="w-12 h-12 bg-[#f0fafa] rounded-full flex items-center justify-center mx-auto mb-2 text-2xl">
                  {feature.icon}
                </div>
                <p className="text-xs text-[#666]">{feature.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
