import { Users, BarChart3, Lightbulb, RefreshCw } from "lucide-react"

export function PlatformSection() {
  const features = [
    {
      icon: Users,
      title: "顧客理解",
      description: "SNSの顧客発話を分析し\n動画訴求を企画",
    },
    {
      icon: BarChart3,
      title: "クリエイティブ分析",
      description: "SNS広告データを分析し\n改善提案",
    },
    {
      icon: Lightbulb,
      title: "動画企画支援",
      description: "データに基づいた\n勝てる企画をご提案",
    },
    {
      icon: RefreshCw,
      title: "高速PDCA",
      description: "内製化×データで\n高速にPDCAを回す",
    },
  ]

  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-4">
          動画マーケティングを成功につなげるプラットフォーム
        </h2>
        <div className="w-16 h-1 bg-[#00c8c8] mx-auto mb-12"></div>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <span className="bg-[#00c8c8] text-white w-8 h-8 rounded-full flex items-center justify-center text-sm">
                01
              </span>
              SNSマーケティングの
              <br />
              複雑な要素を丸ごと提供する
              <br />
              <span className="text-[#00c8c8]">1in1のサクセス支援</span>
            </h3>
            <p className="text-[#666] leading-relaxed">
              動画制作ツール単体の提供ではなく、動画マーケティングの成果に必要な要素をまるごとサポートします。
            </p>
          </div>
          <div className="bg-[#fafafa] rounded-2xl p-6">
            <img src="/diagram-showing-sns-marketing-success-support-with.jpg" alt="1in1のサクセス支援" className="w-full" />
          </div>
        </div>

        <div className="grid md:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div key={index} className="bg-[#f8f8f8] rounded-xl p-6 text-center hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-[#00c8c8] rounded-full flex items-center justify-center mx-auto mb-4">
                <feature.icon className="w-6 h-6 text-white" />
              </div>
              <h4 className="font-bold mb-2">{feature.title}</h4>
              <p className="text-sm text-[#666] whitespace-pre-line">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
