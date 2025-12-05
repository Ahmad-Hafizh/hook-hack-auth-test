export function Header() {
  return (
    <header className="sticky top-0 z-50 bg-[#2d3436] text-white">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:py-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-8 w-full">
          <div className="flex items-center justify-between w-full">
            <a href="/" className="text-xl font-bold tracking-wide">
              <span className="text-[#00c8c8] text-2xl">Hook</span>
              <span className="text-white text-2xl">Hack</span>
            </a>
            <nav className="hidden lg:flex items-center gap-6 text-sm">
              <a
                href="#"
                className="text-white hover:underline hover:underline-offset-4 transition-all decoration-[#00c8c8]"
              >
                主な機能
              </a>
              <a
                href="#"
                className="text-white  hover:underline hover:underline-offset-4 transition-all decoration-[#00c8c8]"
              >
                業界別サンプル動画
              </a>
              <a
                href="#"
                className="text-white hover:underline hover:underline-offset-4 transition-all decoration-[#00c8c8]"
              >
                費用
              </a>
              <a
                href="#"
                className="text-white hover:underline hover:underline-offset-4 transition-all decoration-[#00c8c8]"
              >
                メンバー紹介
              </a>
              <a
                href="#"
                className="text-white hover:underline hover:underline-offset-4 transition-all decoration-[#00c8c8]"
              >
                会社概要
              </a>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
}
