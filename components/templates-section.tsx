export function TemplatesSection() {
  const templates = [
    { category: "SNS広告", count: 120, image: "social media advertisement video template collection" },
    { category: "EC・LP", count: 85, image: "ecommerce landing page video templates" },
    { category: "採用・HR", count: 45, image: "recruitment HR video templates" },
    { category: "店頭・POP", count: 60, image: "retail store POP display video templates" },
    { category: "YouTube", count: 90, image: "youtube intro outro video templates" },
    { category: "Instagram", count: 110, image: "instagram reels stories video templates" },
  ]

  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 md:px-6 lg:px-8">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-4">
          あらゆるフォーマットに対応した
          <br />
          多彩なテンプレート機能
        </h2>
        <div className="w-16 h-1 bg-[#00c8c8] mx-auto mb-12"></div>

        <div className="grid md:grid-cols-3 gap-6">
          {templates.map((template, index) => (
            <div key={index} className="group cursor-pointer">
              <div className="relative overflow-hidden rounded-xl mb-3">
                <img
                  src={`/.jpg?height=200&width=350&query=${template.image}`}
                  alt={template.category}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
                  <div className="text-white">
                    <p className="font-bold">{template.category}</p>
                    <p className="text-sm opacity-80">{template.count}+ テンプレート</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
