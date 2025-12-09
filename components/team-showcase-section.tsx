import Image from "next/image";

const members = [
  {
    name: "Hashimoto Keiji",
    position: "CEO",
    description: "Description",
    photo: "/2.png",
  },
  {
    name: "So Hayashi",
    position: "Manager",
    description: "Description",
    photo: "/4.png",
  },
  {
    name: "Satrio",
    position: "Engineer",
    description: "Description",
    photo: "/1.png",
  },
  {
    name: "Ahmad",
    position: "Engineer",
    description: "Description",
    photo: "/placeholder-user.jpg",
  },
  {
    name: "Jibran",
    position: "Engineer",
    description: "Description",
    photo: "/placeholder-user.jpg",
  },
];

export function TeamShowcaseSection() {
  return (
    <section className="py-20 bg-gray-100">
      <div className="max-w-6xl mx-auto px-4 md:px-6 lg:px-8">
        {/* Title */}
        <div className="text-center mb-12 ">
          <h2 className="text-3xl md:text-4xl font-bold text-[#041D22] relative inline-block">
            メンバー紹介
            {/* <span className="absolute -bottom-1 left-0 right-0 h-1 bg-yellow-400"></span> */}
          </h2>
          {/* <span className="absolute -bottom-5 left-0 right-0 h-1 bg-yellow-400"></span> */}
        </div>

        {/* Members Grid - 3-2 Formation */}
        <div className="flex flex-col items-center gap-8 md:gap-2">
          {/* Top Row - 3 Members */}
          <div className="flex flex-col md:flex-row justify-center items-start gap-6 md:gap-2 w-full">
            {members.slice(0, 3).map((member, index) => (
              <div
                key={index}
                className="flex-1 flex flex-col items-center text-center max-w-sm mx-auto"
              >
                {/* Photo Placeholder */}
                <div className="w-40 h-40 md:w-48 md:h-48 rounded-full overflow-hidden mb-4 bg-gray-200 border-4 border-[#2C9FB8]">
                  <Image
                    src={member.photo}
                    alt={member.name}
                    width={192}
                    height={192}
                    className="object-cover w-full h-full"
                  />
                </div>
                {/* Name */}
                <h3 className="text-xl md:text-2xl font-bold text-[#041D22] mb-2">
                  {member.name}
                </h3>
                {/* Position */}
                <p className="text-base md:text-lg text-[#2C9FB8] font-semibold mb-3">
                  {member.position}
                </p>
                {/* Description */}
                <p className="text-sm md:text-base text-gray-700 leading-relaxed">
                  {member.description}
                </p>
              </div>
            ))}
          </div>

          {/* Bottom Row - 2 Members */}
          <div className="flex flex-col md:flex-row justify-center items-start gap-6 md:gap-2 w-full max-w-4xl">
            {members.slice(3, 5).map((member, index) => (
              <div
                key={index + 3}
                className="flex-1 flex flex-col items-center text-center max-w-sm mx-auto"
              >
                {/* Photo Placeholder */}
                <div className="w-40 h-40 md:w-48 md:h-48 rounded-full overflow-hidden mb-4 bg-gray-200 border-4 border-[#2C9FB8]">
                  <Image
                    src={member.photo}
                    alt={member.name}
                    width={192}
                    height={192}
                    className="object-cover w-full h-full"
                  />
                </div>
                {/* Name */}
                <h3 className="text-xl md:text-2xl font-bold text-[#041D22] mb-2">
                  {member.name}
                </h3>
                {/* Position */}
                <p className="text-base md:text-lg text-[#2C9FB8] font-semibold mb-3">
                  {member.position}
                </p>
                {/* Description */}
                <p className="text-sm md:text-base text-gray-700 leading-relaxed">
                  {member.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
