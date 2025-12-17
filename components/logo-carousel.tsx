export function LogoCarousel() {
  const logos = [
    "ANA",
    "ANAGRAMS",
    "ALSOK",
    "NHK出版",
    "opt",
    "北の達人",
    "KING JIM",
    "glico",
    "GROOVE X",
    "KOKUYO",
    "GMO",
    "SOLDOUT",
    "BULK HOMME",
    "PIALA",
    "Befco",
    "BELTA",
    "MicroAd",
    "UNI",
    "RIZAP",
    "LINE",
    "ロゼット",
    "LOHACO",
    "onestar",
    "SHARP",
    "Gaba",
  ]

  return (
    <section className="bg-[#00c8c8] py-4">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="flex items-center justify-center gap-4 flex-wrap md:flex-nowrap">
          <p className="text-white font-bold whitespace-nowrap flex items-center gap-2">
            <span className="text-[#ffd93d]">✨</span>
            誰でも15分で! 動画/静止画制作
            <span className="text-[#ffd93d]">✨</span>
          </p>
          <button className="bg-white text-[#00c8c8] px-6 py-2 rounded-full font-bold hover:bg-gray-100 transition-colors">
            資料ダウンロードする
          </button>
        </div>
      </div>
      <div className="mt-6 bg-white py-8 overflow-hidden">
        <p className="text-center text-sm text-[#666] mb-6">ブランドから代理店まで、幅広い企業に選ばれています</p>
        <div className="relative">
          <div className="flex animate-marquee">
            {[...logos, ...logos].map((logo, index) => (
              <div
                key={index}
                className="flex-shrink-0 mx-6 grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all"
              >
                <div className="h-8 flex items-center justify-center min-w-[100px]">
                  <span className="text-lg font-bold text-[#333]">{logo}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
