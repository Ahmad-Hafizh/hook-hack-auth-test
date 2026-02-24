export function PMaxSection() {
  return (
    <section className="relative py-20 overflow-hidden">
      {/* Top Gradient Overlay - fades from white to transparent */}
      <div
        className="absolute top-0 left-0 right-0 h-40 md:h-56 z-[5] pointer-events-none"
        style={{
          background:
            "linear-gradient(to bottom, rgba(255,255,255,1) 0%, rgba(255,255,255,0.8) 30%, rgba(255,255,255,0) 100%)",
        }}
      ></div>

      {/* Bottom Gradient Overlay - fades from white to transparent */}
      <div
        className="absolute bottom-0 left-0 right-0 h-40 md:h-56 z-[5] pointer-events-none"
        style={{
          background:
            "linear-gradient(to top, rgba(255,255,255,1) 0%, rgba(255,255,255,0.8) 30%, rgba(255,255,255,0) 100%)",
        }}
      ></div>

      <video
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        className="absolute inset-0 w-full h-full object-cover object-center z-0"
      >
        <source src="/p-max.mp4" type="video/mp4" />
      </video>
      <div className="relative z-10 max-w-6xl mx-auto px-4 md:px-6 lg:px-8">
        {/* Heading */}
        <div className="mb-12">
          <h2
            className="text-3xl md:text-4xl lg:text-4xl font-bold text-[#2C9FB8] text-center"
            style={{ lineHeight: "1.5" }}
          >
            P-MAXは、​動画入稿が​なくても
            <br />
            Googleが​自動で​簡易動画を​生成する
            <br />
            ​ことを​ご存じですか？
            <span className="relative inline-block w-full ">
              <span className="absolute -bottom-0 left-1/2 -translate-x-1/2 w-24 h-1 bg-yellow-400 -mt-10"></span>
            </span>
          </h2>
        </div>

        {/* Text Box */}
        <div className="bg-white border border-gray-300 rounded-lg p-8 md:p-10 max-w-4xl mx-auto mb-12">
          <div className="space-y-6 text-base md:text-lg text-[#041D22] leading-relaxed text-center">
            <p>
              自動生成動画は、​CTR・CVRに​大きく​影響する​一方、​意図しない​デザイン・​コピーで
              <br />
              配信されているケースが多くあります。
            </p>
            <p>
              HookHackなら、​LPから​5分で​最適な​動画を​自動生成。​P-MAXの​成果を​左右する
              <br />
              “動画の​質”を、​自社で​コントロールできます。
            </p>
          </div>
        </div>

        {/* CTA Button */}
        <div className="flex flex-col items-center">
          <button className="px-12 md:px-16 py-2 md:py-3 bg-gradient-to-r from-[#0093c8] to-[#1deec8] hover:from-[#0099a8] hover:to-[#00b399] text-white font-bold text-lg rounded-full transition-all shadow-lg">
            最短5分｜無料で5本制作
          </button>
          <p className="mt-4 text-sm md:text-base text-red-500 text-left">
            ※ご希望者には​30分の​製品説明会を​実施します
          </p>
        </div>
      </div>
    </section>
  );
}
