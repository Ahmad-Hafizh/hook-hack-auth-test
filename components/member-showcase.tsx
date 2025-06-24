import Image from "next/image";

const members = [
  {
    name: "Keiji Hashimoto",
    job: "CEO",
    photo: "/2.png",
    bio: "大手通信会社の営業、事業企画、およびWebコンサル会社での経験を生かし、様々な業種・規模の企業でBizDev・マーケティングのコンサルとして事業を推進。",
  },
  {
    name: "So Hayashi",
    job: "PM/アートディレクター",
    photo: "/4.png",
    bio: "東京生まれ、イギリス育ち。映像ディレクターの経験もあり、弊社のメディア運営と動画制作事業を担う。",
  },
  {
    name: "Sean Nachigami",
    job: "PM/エンジニア",
    photo: "/3.png",
    bio: "東京生まれ、東京育ち。多くのマーケティング施策に立ち会い、前職のAIベンチャーではPMを担当。",
  },
  {
    name: "Satrio Buwono",
    job: "PM/エンジニア",
    photo: "/1.png",
    bio: "インドネシア生まれ、インドネシア育ち。SaaSを専門に構築を行う、複数のITベンチャーを立ち上げた。弊社のオフショア開発事業のエンジニア統括を担う。",
  },
];

export default function MemberShowcase() {
  return (
    <section className="py-20 bg-[#2a97f0]" id="about">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-white mb-12">
          メンバー紹介
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
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
              <div className="text-xs text-black text-center whitespace-pre-line min-h-[3.5em] px-5">
                {member.bio}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
