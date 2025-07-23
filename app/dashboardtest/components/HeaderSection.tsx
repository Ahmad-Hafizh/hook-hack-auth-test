import { useUser } from "@clerk/nextjs";
import processPayment from "../lib/stripe";

interface HeaderSectionProps {
  dbUser: any;
  onGoToApp: () => void;
}

export default function HeaderSection({
  dbUser,
  onGoToApp,
}: HeaderSectionProps) {
  const { user } = useUser();
  //HANDLE PAYMENT
  const handlepayment = async () => {
    await processPayment("price_1Rl1JbPn03NUFuvTGt6smBJp");
  };

  return (
    <div className="flex justify-between items-center w-full mb-8">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">
          Welcome to HookHack
          {user?.firstName ? `, ${user.firstName}` : ""}
        </h1>
        <p className="text-gray-300">
          Your TikTok analytics and insights dashboard
        </p>
      </div>

      {/* ===== ACTION BUTTONS ===== */}
      <div className="grid grid-cols-2 gap-6 items-stretch w-fit ml-auto">
        {/* Create New Project Button - Disabled when no credit */}
        <button
          onClick={onGoToApp}
          className="bg-[#fe2858] w-full hover:bg-[#e0244f] text-white px-5 py-2 text-base font-bold rounded-md shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center -mb-5"
          disabled={!dbUser || dbUser.credit <= 0}
        >
          Create new project
        </button>

        {/* Buy Credit Button */}
        <button
          onClick={handlepayment}
          className="bg-[#2af0ea] w-full hover:bg-[#288784] text-black px-5 py-2 text-base font-bold rounded-md shadow-lg transition-all duration-300 border border-[#2af0ea] flex items-center justify-center -mb-5"
          style={{ minWidth: 120 }}
        >
          Buy Credit
        </button>

        {/* Credit Error Message */}
        {(!dbUser || dbUser.credit <= 0) && (
          <div className="col-span-2 text-red-400 text-sm mt-2 w-full text-center">
            {!dbUser
              ? "Loading user data..."
              : "You do not have enough credit to create a new project. Please buy more credit."}
          </div>
        )}
      </div>
    </div>
  );
}
