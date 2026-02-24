import Image from "next/image";
import TrialDialog from "@/components/landingpage/TrialDialog";

export default function CompanyFooter() {
  return (
    <footer className="w-full bg-white py-12 md:py-32 mt-5 px-10 md:px-0">
      <div className="max-w-6xl mx-auto px-2 sm:px-4 md:px-8 flex flex-col md:flex-row items-start md:items-center gap-8 md:gap-16">
        <div className="flex-1 min-w-[200px]">
          <h3 className="text-2xl md:text-4xl font-bold mb-6 md:mb-8 text-[#fe2858]">
            会社概要
          </h3>
          <div className="w-full">
            <div className="grid grid-cols-12 gap-y-2 md:gap-y-4 gap-x-2 text-gray-800 text-sm md:text-base">
              <div className="col-span-4 md:col-span-3 font-semibold text-base md:text-xl text-[#fe2858]">
                名称
              </div>
              <div className="col-span-8 md:col-span-9">
                サムライスタイル株式会社
                <br />
                <span className="text-xs md:text-sm text-[black]">
                  (Samurai Style Co., Ltd.)
                </span>
              </div>

              <div className="col-span-4 md:col-span-3 font-semibold text-base md:text-xl text-[#fe2858]">
                代表取締役
              </div>
              <div className="col-span-8 md:col-span-9">
                橋本 圭司（
                <a href="#" className="text-[black] underline">
                  プロフィール
                </a>
                ）
              </div>

              <div className="col-span-4 md:col-span-3 font-semibold text-base md:text-xl text-[#fe2858]">
                住所
              </div>
              <div className="col-span-8 md:col-span-9">
                〒150-0043
                <br />
                東京都渋谷区道玄坂1-10-8 渋谷道玄坂東急ビル2F
              </div>

              <div className="col-span-4 md:col-span-3 font-semibold text-base md:text-xl text-[#fe2858]">
                コーポレート
              </div>
              <div className="col-span-8 md:col-span-9">
                <a
                  href="https://samurai-style.tokyo/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[black] underline"
                >
                  https://samurai-style.tokyo/
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="flex-1 flex justify-center items-center mt-8 md:mt-0">
          <div className="rounded-lg overflow-hidden shadow-lg w-full md:max-w-xs h-full md:w-[350px] md:h-[500px] bg-[#c2a3ff]">
            <Image
              src="/building.png"
              alt="Company Building"
              width={240}
              height={340}
              className="object-cover hidden md:inline w-full h-full"
            />
          </div>
        </div>
      </div>
    </footer>
  );
}
