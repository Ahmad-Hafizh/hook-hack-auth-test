export function PromotionSection() {
  return (
    <section className="relative py-20 md:py-32 overflow-hidden">
      {/* Blurred Background Content */}
      <div className="absolute inset-0 opacity-30 blur-sm">
        <div className="w-full h-full bg-gradient-to-br from-gray-200 via-gray-100 to-gray-200"></div>
      </div>

      {/* Content Overlay */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 md:px-6 lg:px-8 text-center">
        <div className="bg-black/70 backdrop-blur-sm rounded-2xl p-8 md:p-12 mb-8">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-6">
            HookHackをもっと詳しく知る
          </h2>
        </div>

        {/* CTA Button */}
        <div className="space-y-4">
          <button className="w-full md:w-auto px-12 md:px-16 py-3 md:py-4 bg-gradient-to-r from-[#0093c8] to-[#1deec8] hover:from-[#0099a8] hover:to-[#00b399] text-white font-bold text-lg md:text-xl rounded-full transition-all shadow-lg">
            3分でわかる 資料をダウンロード
          </button>
          <div className="text-center">
            <a
              href="#"
              className="text-white text-base md:text-lg underline hover:text-[#00c8c8] transition-colors"
            >
              お問合せ
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}



