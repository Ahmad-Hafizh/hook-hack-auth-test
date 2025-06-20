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
    bio: "東京生まれ、東京育ち。多くのマーケティング施策に立ち会い、前職のAIベンチャーではPMを担当。",
  },
];

export default function MemberShowcase() {
  return (
    <section className="py-20 bg-white" id="about">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-[#17153B] mb-12">
          メンバー紹介
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {members.map((member) => (
            <div
              key={member.name}
              className="bg-white rounded-xl shadow-lg flex flex-col items-center p-6 border border-gray-100 hover:shadow-xl transition-all"
            >
              <div className="w-56 h-56 mb-4 rounded-lg overflow-hidden">
                <Image
                  src={member.photo}
                  alt={member.name}
                  width={112}
                  height={112}
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="text-lg font-semibold text-[#17153B] mb-1">
                {member.name}
              </div>
              <div className="text-sm text-gray-500 mb-4">{member.job}</div>
              <div className="text-xs text-gray-600 text-center whitespace-pre-line min-h-[3.5em]">
                {member.bio}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
