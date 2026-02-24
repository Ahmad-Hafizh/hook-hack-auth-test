import Image from "next/image";

const members = [
  {
    name: "橋本 圭司",
    job: "代表取締役",
    photo: "/2.png",
    bio: "大手通信会社の営業、事業企画を経験後、Webコンサル会社へ転職。2018年にイラスト世界チャンピオンとともにDT合同会社を設立し、CMO着任。並行して事業会社・ベンダー双方での経験を生かし、様々な業種・規模の企業で事業企画・マーケティング・セールスまでのコンサルとして事業を推進。2024年にサムライスタイル株式会社を設立。",
  },
  {
    name: "林　壮",
    job: "PM/アートディレクター",
    photo: "/4.png",
    bio: "東京生まれ、イギリス・シンガポール育ち。映像ディレクターの経験を持ち、企画・撮影・編集を一貫して対応。現在は弊社のオフショア開発事業と動画制作事業に加え、採用担当も務める。",
  },
  {
    name: "Satrio Buwono",
    job: "PM",
    photo: "/satrio.png",
    bio: "インドネシア生まれ、グラズゴー大学卒業。11カ国を旅する。SaaSを専門に構築を行い、複数のITベンチャーを立ち上げ。オフショア開発事業のエンジニア統括を担う。",
  },
  {
    name: "Ahmad",
    job: "エンジニア",
    photo: "/ahmadnew.png",
    bio: "",
  },
  {
    name: "Jibran",
    job: "エンジニア",
    photo: "/jibrannew.png",
    bio: "",
  },
];

export default function MemberShowcase() {
  return (
    <section className="md:px-0 px-10 py-20 bg-[#016BFD]" id="about">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-white mb-12">
          メンバー紹介
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mb-9">
          {members.map((member) => (
            <div
              key={member.name}
              className="shadow-lg flex flex-col items-center p-6 hover:shadow-xl transition-all bg-white"
            >
              <div className="w-56 h-56 mb-4 overflow-hidden">
                <Image
                  src={member.photo}
                  alt={member.name}
                  width={112}
                  height={112}
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="text-lg font-semibold text-black mb-1">
                {member.name}
              </div>
              <div className="text-sm text-black mb-4">{member.job}</div>
              <div className="text-[10px] text-black text-center whitespace-pre-line min-h-[3.5em] px-5">
                {member.bio}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
