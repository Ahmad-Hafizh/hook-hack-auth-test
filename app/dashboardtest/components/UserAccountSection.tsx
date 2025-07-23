interface UserAccountSectionProps {
  dbUser: any;
  dbUserLoading: boolean;
  dbUserError: string;
}

export default function UserAccountSection({
  dbUser,
  dbUserLoading,
  dbUserError,
}: UserAccountSectionProps) {
  return (
    <div className="mb-8">
      {dbUserLoading && (
        <div className="text-gray-400">Loading your data...</div>
      )}
      {dbUserError && (
        <div className="text-red-400 font-semibold">{dbUserError}</div>
      )}
      {dbUser && (
        <div className="bg-[#232323] rounded-lg p-6 text-white shadow mb-4">
          <div className="mb-2 font-bold text-lg">Your Account Info</div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2">
            <div>
              <span className="text-gray-400">Name:</span> {dbUser.firstName}{" "}
              {dbUser.lastName}
            </div>
            <div>
              <span className="text-gray-400">Email:</span> {dbUser.email}
            </div>
            <div>
              <span className="text-gray-400">Phone:</span>{" "}
              {dbUser.phoneNumber || (
                <span className="italic text-gray-500">N/A</span>
              )}
            </div>
            <div>
              <span className="text-gray-400">TikTok:</span>{" "}
              {dbUser.tiktokUsername || (
                <span className="italic text-gray-500">N/A</span>
              )}
            </div>
            <div>
              <span className="text-gray-400">Credits:</span> {dbUser.credit}
            </div>
            <div>
              <span className="text-gray-400">Joined:</span>{" "}
              {new Date(dbUser.createdAt).toLocaleDateString()}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
