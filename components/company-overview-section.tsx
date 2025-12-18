import Image from "next/image";

export function CompanyOverviewSection() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 md:px-6 lg:px-8">
        {/* Title */}
        <div className="mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[#041D22] relative inline-block">
            会社概要
            {/* <span className="absolute -bottom-1 left-0 right-0 h-1 bg-yellow-400"></span> */}
          </h2>
        </div>

        {/* Content Layout */}
        <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-start mb-12">
          {/* Left Section - Company Information */}
          <div className="flex-1 space-y-6">
            <div className="space-y-1">
              <span className="text-base md:text-lg font-semibold text-[#2C9FB8]">
                名称
              </span>
              <div className="text-base md:text-lg text-[#041D22]">
                サムライスタイル株式会社
                <br />
                <span className="text-sm md:text-base text-gray-600">
                  (Samurai Style Co., Ltd.)
                </span>
              </div>
            </div>

            <div className="space-y-1">
              <span className="text-base md:text-lg font-semibold text-[#2C9FB8]">
                代表取締役
              </span>
              <div className="text-base md:text-lg text-[#041D22]">
                橋本 圭司（
                <a
                  href="#"
                  className="text-[#041D22] underline hover:text-[#00c8c8] transition-colors"
                >
                  プロフィール
                </a>
                ）
              </div>
            </div>

            <div className="space-y-1">
              <span className="text-base md:text-lg font-semibold text-[#2C9FB8]">
                住所
              </span>
              <div className="text-base md:text-lg text-[#041D22]">
                〒150-0043
                <br />
                東京都渋谷区道玄坂1-10-8 渋谷道玄坂東急ビル2F
              </div>
            </div>

            <div className="space-y-1">
              <span className="text-base md:text-lg font-semibold text-[#2C9FB8]">
                コーポレート
              </span>
              <div className="text-base md:text-lg text-[#041D22]">
                <a
                  href="https://samurai-style.tokyo/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#041D22] underline hover:text-[#00c8c8] transition-colors"
                >
                  https://samurai-style.tokyo/
                </a>
              </div>
            </div>
          </div>

          {/* Right Section - Image */}
          <div className="flex-1 flex justify-center items-center">
            <div className="w-full max-w-md h-[500px] rounded-lg overflow-hidden shadow-lg">
              <Image
                src="/building.png"
                alt="Company Building"
                width={400}
                height={500}
                className="object-cover w-full h-full"
              />
            </div>
          </div>
        </div>

        {/* CTA Button */}
        <div className="flex justify-center">
          <button className="px-12 md:px-16 py-2 md:py-3 bg-gradient-to-r from-[#0093c8] to-[#1deec8] hover:from-[#0099a8] hover:to-[#00b399] text-white font-bold text-lg rounded-full transition-all shadow-lg">
            1週間無料トライアルで今すぐ制作
          </button>
        </div>
      </div>
    </section>
  );
}
