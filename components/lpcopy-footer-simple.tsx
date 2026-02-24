import Link from "next/link";
import { Play } from "lucide-react";

export function LPCopyFooterSimple() {
  return (
    <footer className=" bg-[#11434D] text-white px-10 sm:px-4 py-8 md:py-12">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 gap-8 mb-8">
          <div className="space-y-4 flex flex-col items-center w-full">
            <img
              src="/newlogothin.png"
              alt="Hook-Hack"
              className="w-32 md:w-56 py-2"
            />
            {/* 動画マーケティングの成功事例や機能詳細をまとめた資料を無料でダウンロードいただけます */}
          </div>
        </div>
        <div className="border-t border-white/20 pt-8 text-center text-white text-xs md:text-base">
          <p>&copy; 2025 Hook-Hack. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
