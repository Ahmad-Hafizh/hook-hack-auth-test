import { Download } from "lucide-react";

export function CTASection() {
  return (
    <section className="py-20 bg-gradient-to-r from-[#1e5757] to-[#006262]">
      <div className="max-w-4xl mx-auto px-4 md:px-6 lg:px-8 text-center">
        <div className="mb-4 flex justify-center">
          <img
            src="/logonew.png"
            alt="HookHack Logo"
            className="h-12 md:h-16 w-auto"
          />
        </div>
        <p className="text-white/80 mb-8">
          動画マーケティングの成功事例や機能詳細をまとめた資料を無料でダウンロードいただけます
        </p>
        {/* <button className="bg-gradient-to-r from-[#0093c8] to-[#1deec8] hover:from-[#0099a8] hover:to-[#00b399] text-white px-10 py-4 rounded-full text-lg font-bold transition-all inline-flex items-center gap-2 shadow-lg">
          資料ダウンロードする（無料）
          <Download className="w-5 h-5" />
        </button> */}
      </div>
    </section>
  );
}
