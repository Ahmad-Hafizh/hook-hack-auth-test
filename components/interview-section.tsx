export function InterviewSection() {
  const interviews = [
    {
      company: "東京学芸",
      stats: "4倍以上投稿",
      title: "制作スピード",
      subtitle: "7倍以上!!",
      quote: "動画を作るだけでなく・検証・改善まで支援する1/3デデ完成!",
      image: "japanese business professional interview portrait 1",
    },
    {
      company: "メーカー企業",
      stats: "工数削減",
      title: "制作コスト",
      subtitle: "1/3で完成!",
      quote: "動画を作るだけでなく・検証・改善まで支援する1/3デデ完成!",
      image: "japanese business professional interview portrait 2",
    },
  ]

  return (
    <section className="py-20 bg-[#f5f5f5]">
      <div className="max-w-6xl mx-auto px-4 md:px-6 lg:px-8">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-4">導入事例インタビュー</h2>
        <div className="w-16 h-1 bg-[#00c8c8] mx-auto mb-12"></div>

        <div className="grid md:grid-cols-2 gap-8">
          {interviews.map((interview, index) => (
            <div key={index} className="bg-white rounded-2xl overflow-hidden shadow-sm">
              <div className="grid grid-cols-2">
                <div className="p-6 bg-[#00c8c8] text-white">
                  <p className="text-sm mb-2">{interview.company}</p>
                  <p className="text-3xl font-bold mb-1">{interview.stats}</p>
                  <p className="text-sm">{interview.title}</p>
                  <p className="text-2xl font-bold text-[#ffd93d]">{interview.subtitle}</p>
                </div>
                <div className="relative">
                  <img
                    src={`/.jpg?height=200&width=200&query=${interview.image}`}
                    alt={interview.company}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div className="p-6">
                <p className="text-sm text-[#666] italic">"{interview.quote}"</p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-8">
          <button className="bg-gradient-to-r from-[#0093c8] to-[#1deec8] hover:from-[#0099a8] hover:to-[#00b399] text-white px-8 py-3 rounded-full font-bold transition-all">
            インタビューをもっと見る
          </button>
        </div>
      </div>
    </section>
  )
}
