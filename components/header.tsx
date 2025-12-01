import { ChevronDown, Phone } from "lucide-react"

export function Header() {
  return (
    <header className="sticky top-0 z-50 bg-[#2d3436] text-white">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <a href="/" className="text-xl font-bold tracking-wide">
            <span className="text-[#00c8c8]">Letro</span>Studio
          </a>
          <nav className="hidden lg:flex items-center gap-6 text-sm">
            <a href="#" className="hover:text-[#00c8c8] transition-colors">
              機能
            </a>
            <a href="#" className="hover:text-[#00c8c8] transition-colors flex items-center gap-1">
              活用方法 <ChevronDown className="w-4 h-4" />
            </a>
            <a href="#" className="hover:text-[#00c8c8] transition-colors">
              料金プラン
            </a>
            <a href="#" className="hover:text-[#00c8c8] transition-colors">
              導入事例
            </a>
            <a href="#" className="hover:text-[#00c8c8] transition-colors">
              動画テンプレート
            </a>
            <a href="#" className="hover:text-[#00c8c8] transition-colors">
              ブログ
            </a>
            <a href="#" className="hover:text-[#00c8c8] transition-colors">
              セミナー
            </a>
            <a href="#" className="hover:text-[#00c8c8] transition-colors">
              お役立ち資料
            </a>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-2 text-sm">
            <Phone className="w-4 h-4" />
            <div>
              <p className="font-bold">050-1790-7052</p>
              <p className="text-xs text-gray-400">受付時間 / 平日10:00〜18:00</p>
            </div>
          </div>
          <button className="bg-[#f5a623] hover:bg-[#e09000] text-white px-4 py-2 rounded-full text-sm font-bold transition-colors">
            資料請求
          </button>
        </div>
      </div>
    </header>
  )
}
