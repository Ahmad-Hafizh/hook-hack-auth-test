import Image from "next/image";

export default function CompanyFooter() {
  return (
    <footer className="w-full bg-white py-32 mt-5">
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-start md:items-center gap-8 md:gap-16">
        <div className="flex-1 min-w-[250px]">
          <h3 className="text-4xl font-bold mb-8 text-[#17153B]">会社概要</h3>
          <div className="w-full">
            <div className="grid grid-cols-12 gap-y-4 gap-x-2 text-gray-800 text-base">
              <div className="col-span-3 font-semibold text-xl">名称</div>
              <div className="col-span-9">
                サムライスタイル株式会社
                <br />
                <span className="text-sm text-gray-500">
                  (Samurai Style Co., Ltd.)
                </span>
              </div>

              <div className="col-span-3 font-semibold text-xl">代表取締役</div>
              <div className="col-span-9">
                橋本 圭司（
                <a href="#" className="text-blue-600 underline">
                  プロフィール
                </a>
                ）
              </div>

              <div className="col-span-3 font-semibold text-xl">住所</div>
              <div className="col-span-9">
                〒150-0043
                <br />
                東京都渋谷区道玄坂1-10-8 渋谷道玄坂東急ビル2F
              </div>

              <div className="col-span-3 font-semibold text-xl">
                コーポレートサイト
              </div>
              <div className="col-span-9">
                <a
                  href="https://samurai-style.tokyo/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline"
                >
                  https://samurai-style.tokyo/
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="flex-1 flex justify-center items-center">
          <div className="rounded-lg overflow-hidden shadow-lg w-[350px] h-[500px] bg-gray-100">
            <Image
              src="https://images.unsplash.com/photo-1719336870427-c8409dea0be4?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Company Building"
              width={240}
              height={340}
              className="object-cover w-full h-full"
            />
          </div>
        </div>
      </div>
    </footer>
  );
}
