export function HeroSection() {
  return (
    <section className="relative bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-12 lg:py-36">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          <div>
            <h1 className="text-3xl md:text-4xl lg:text-[45px] font-bold leading-tight text-[#00c8c8] mb-12">
              動画広告をLPから5分で制作
            </h1>

            <button className="bg-[#00c8c8] hover:bg-[#00b0b0] text-white px-8 py-4 rounded-full text-md font-bold transition-colors mb-6 shadow-lg">
              1週間無料 | 今すぐ制作する
            </button>

            <p className="text-md text-red-600 mb-6">
              ※ご希望者には30分の製品説明会を実施します
            </p>

            <p className="text-[#666] text-md mb-2">
              競合分析を元に簡単操作・省工数で顧客が反応する
            </p>
            <p className="text-[#666] text-md">
              動画を制作出稿データから成果につながる訴求を発掘
            </p>
          </div>

          <div className="relative flex justify-center lg:justify-end">
            <div className="w-full max-w-lg">
              <img
                src="https://placehold.co/800x600/cccccc/ffffff.gif?text=Laptop+Placeholder"
                alt="Laptop placeholder"
                className="w-full h-auto rounded-lg"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
