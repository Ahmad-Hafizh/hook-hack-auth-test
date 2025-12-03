import TrialDialog from "@/components/landingpage/TrialDialog";

export default function PMaxSectionLp() {
  return (
    <section className="w-full py-16 md:py-24 px-10 md:px-24 bg-gray-800">
      <div className="max-w-5xl mx-auto flex flex-col items-center space-y-8">
        {/* Main Headline */}
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white text-center">
          P-MAXは、動画入稿がなくてもGoogleが自動で簡易動画を <br />
          生成することをご存じですか?
        </h2>

        {/* First Paragraph */}
        <p className="text-lg md:text-xl lg:text-3xl text-white text-left pt-10">
          自動生成動画は、CTR・CVRに大きく影響する一方、
          <br />
          意図しないデザイン・コピーで配信されているケースが多くあります。
        </p>

        {/* Second Paragraph */}
        <p className="text-lg md:text-xl lg:text-3xl text-white text-left">
          HookHackなら、LPから5分で最適な動画を自動生成。
          <br />
          P-MAXの成果を左右する"動画の質"を、自社でコントロールできます。
        </p>

        {/* CTA Button */}
        <div className="mt-8">
          <TrialDialog
            trigger={
              <button className="bg-[#2af0ea] text-black hover:bg-[#288784] transition-all duration-300 border-2 border-[#2af0ea] rounded-lg px-8 py-3 font-bold text-lg">
                1週間無料|今すぐ制作する
              </button>
            }
          />
        </div>
      </div>
    </section>
  );
}
