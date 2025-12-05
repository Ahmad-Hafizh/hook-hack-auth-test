import { Type, Scissors, Wand2, Music } from "lucide-react"

export function PickupSection() {
  const pickups = [
    {
      icon: Type,
      title: "テキスト挿入/編集機能",
      description: "フォント、カラー、アニメーションを自由にカスタマイズ。プロ品質のテキスト演出が簡単に。",
      image: "text editing interface with font styling options",
    },
    {
      icon: Scissors,
      title: "トリミング・背景消去機能",
      description: "AI機能で人物や商品の背景を自動削除。ワンクリックで切り抜き完了。",
      image: "background removal tool interface showing before after",
    },
    {
      icon: Wand2,
      title: "AIナレーション機能",
      description: "テキストを入力するだけで自然な音声を生成。多言語対応で海外展開も可能。",
      image: "AI voice narration interface with text input and waveform",
    },
    {
      icon: Music,
      title: "BGM・効果音ライブラリ",
      description: "10,000点以上のロイヤリティフリー素材から最適なBGMを選択できます。",
      image: "music library interface with audio tracks and categories",
    },
  ]

  return (
    <section className="py-20 bg-[#fafafa]">
      <div className="max-w-6xl mx-auto px-4 md:px-6 lg:px-8">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-4">ピックアップ機能</h2>
        <div className="w-16 h-1 bg-[#00c8c8] mx-auto mb-12"></div>

        <div className="grid md:grid-cols-2 gap-8">
          {pickups.map((pickup, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow"
            >
              <div className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-[#00c8c8] rounded-lg flex items-center justify-center">
                    <pickup.icon className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="font-bold">{pickup.title}</h3>
                </div>
                <p className="text-sm text-[#666] mb-4">{pickup.description}</p>
              </div>
              <img
                src={`/.jpg?height=200&width=400&query=${pickup.image}`}
                alt={pickup.title}
                className="w-full h-48 object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
