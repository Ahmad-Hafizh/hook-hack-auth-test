interface StatsCardsProps {
  dbUser: any;
}

export default function StatsCards({ dbUser }: StatsCardsProps) {
  const statsCards = [
    {
      label: "Credits Available",
      value: dbUser ? dbUser.credit : 0,
      icon: <span className="text-white font-bold">C</span>,
      bg: "bg-[#fe2858]",
    },
    {
      label: "Analytics Generated",
      value: 0, // Replace with real value if available
      icon: <span className="text-white font-bold">A</span>,
      bg: "bg-green-600",
    },
    {
      label: "Reports Created",
      value: 0, // Replace with real value if available
      icon: <span className="text-white font-bold">R</span>,
      bg: "bg-purple-600",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      {statsCards.map((card, idx) => (
        <div
          key={idx}
          className="bg-[#232323] overflow-hidden shadow rounded-lg"
        >
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div
                  className={`w-8 h-8 ${card.bg} rounded-md flex items-center justify-center`}
                >
                  {card.icon}
                </div>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-400 truncate">
                    {card.label}
                  </dt>
                  <dd className="text-lg font-medium text-white">
                    {card.value}
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
