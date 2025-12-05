import { Play } from "lucide-react"

export function CaseStudiesSection() {
  const cases = [
    {
      company: "株式会社A社",
      industry: "化粧品メーカー",
      result: "広告CTR 2.5倍",
      description: "SNS広告の動画活用で効果を大幅改善",
      image: "cosmetics brand video ad case study thumbnail",
    },
    {
      company: "株式会社B社",
      industry: "人材サービス",
      result: "採用応募数 3倍",
      description: "採用動画の内製化でコスト削減と品質向上を実現",
      image: "HR recruitment video case study thumbnail",
    },
    {
      company: "株式会社C社",
      industry: "ECサイト運営",
      result: "CVR 1.8倍",
      description: "商品紹介動画で購入率を大幅アップ",
      image: "ecommerce product video case study thumbnail",
    },
  ]

  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 md:px-6 lg:px-8">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-4">導入事例紹介</h2>
        <div className="w-16 h-1 bg-[#00c8c8] mx-auto mb-12"></div>

        <div className="grid md:grid-cols-3 gap-8">
          {cases.map((caseStudy, index) => (
            <div key={index} className="bg-[#fafafa] rounded-2xl overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative">
                <img
                  src={`/.jpg?height=200&width=350&query=${caseStudy.image}`}
                  alt={caseStudy.company}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <button className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-colors">
                    <Play className="w-8 h-8 text-[#00c8c8] ml-1" />
                  </button>
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 mb-2">
                  <span className="bg-[#00c8c8] text-white text-xs px-2 py-1 rounded">{caseStudy.industry}</span>
                </div>
                <h3 className="font-bold mb-2">{caseStudy.company}</h3>
                <p className="text-[#00c8c8] font-bold text-lg mb-2">{caseStudy.result}</p>
                <p className="text-sm text-[#666]">{caseStudy.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-8">
          <button className="border-2 border-[#00c8c8] text-[#00c8c8] px-8 py-3 rounded-full font-bold hover:bg-[#00c8c8] hover:text-white transition-colors">
            導入事例をもっと見る
          </button>
        </div>
      </div>
    </section>
  )
}
