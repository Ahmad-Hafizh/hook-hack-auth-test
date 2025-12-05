import { Download } from "lucide-react"

export function CTASection() {
  return (
    <section className="py-20 bg-gradient-to-r from-[#00c8c8] to-[#00a0a0]">
      <div className="max-w-4xl mx-auto px-4 md:px-6 lg:px-8 text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">LetroStudioをもっと詳しく知る</h2>
        <p className="text-white/80 mb-8">
          動画マーケティングの成功事例や機能詳細をまとめた資料を無料でダウンロードいただけます
        </p>
        <button className="bg-[#f5a623] hover:bg-[#e09000] text-white px-10 py-4 rounded-full text-lg font-bold transition-colors inline-flex items-center gap-2 shadow-lg">
          資料ダウンロードする（無料）
          <Download className="w-5 h-5" />
        </button>
      </div>
    </section>
  )
}
