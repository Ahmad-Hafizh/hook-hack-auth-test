import Image from "next/image";

const members = [
  {
    name: "Keiji Hashimoto",
    job: "CEO",
    photo: "/members/yamada.jpg",
  },
  {
    name: "So Hayashi",
    job: "Product Manager",
    photo: "/members/sato.jpg",
  },
  {
    name: "Sean Nachigami",
    job: "Backend Engineer",
    photo: "/members/suzuki.jpg",
  },
  {
    name: "Satrio Buwono",
    job: "Frontend Engineer",
    photo: "/members/takahashi.jpg",
  },
];

export default function MemberShowcase() {
  return (
    <section className="py-20 bg-white">
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
              <div className="w-56 h-56 mb-4 rounded-lg overflow-hidden border-2 border-[#25F4EE]">
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
              <div className="text-sm text-gray-500">{member.job}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
