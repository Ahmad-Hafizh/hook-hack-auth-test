"use client";
import { useUser, UserButton, UserProfile } from "@clerk/nextjs";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const { user, isSignedIn, isLoaded } = useUser();
  const router = useRouter();
  const [loadingToApp, setLoadingToApp] = useState(false);
  const [dbUser, setDbUser] = useState<any>(null);
  const [dbUserLoading, setDbUserLoading] = useState(true);
  const [dbUserError, setDbUserError] = useState("");

  useEffect(() => {
    if (isLoaded && isSignedIn) {
      setDbUserLoading(true);
      setDbUserError("");
      fetch("/api/user")
        .then(async (res) => {
          if (!res.ok) {
            const err = await res.json();
            throw new Error(err.error || "Failed to fetch user");
          }
          return res.json();
        })
        .then((data) => {
          setDbUser(data.user);
          setDbUserLoading(false);
        })
        .catch((err) => {
          setDbUserError(err.message);
          setDbUserLoading(false);
        });
    }
  }, [isLoaded, isSignedIn]);

  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      router.replace("/sign-in");
    }
  }, [isLoaded, isSignedIn, router]);

  const handleGoToApp = () => {
    setLoadingToApp(true);
    setTimeout(() => {
      router.push("/app");
    }, 700);
  };

  if (!isLoaded)
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#272727]">
        <div className="flex flex-col items-center">
          <svg
            className="animate-spin h-12 w-12 text-[#fe2858] mb-6"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v8z"
            />
          </svg>
          <h2 className="text-2xl font-bold text-[#fe2858] mb-2">Loading...</h2>
          <p className="text-gray-300">
            Please wait while we prepare your workspace.
          </p>
        </div>
      </div>
    );
  if (!isSignedIn) return null; // Prevents flash
  if (loadingToApp) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#272727]">
        <div className="text-2xl font-bold text-white animate-pulse">
          Loading App...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#272727]">
      {/* Black Navbar with Logo */}
      <nav className="bg-[#181818] shadow-md border-b border-[#232323]">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-8 py-12 sm:px-12 sm:py-8 lg:px-16 lg:py-12 h-20">
          <div className="flex items-center space-x-2">
            <a href="/dashboard">
              <img src="/newlogo.svg" alt="logo" className="h-9 w-auto my-3" />
            </a>
          </div>
          <div className="flex items-center gap-6">
            <Link
              href="/"
              className="text-white hover:text-[#fe2858] transition-colors font-semibold"
            >
              Home
            </Link>
            <UserButton afterSignOutUrl="/" />
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-14 sm:px-6 lg:px-8">
        <div className="px-4 py-1 sm:px-0">
          {/* Go to App Button */}
          <div className="mb-8 flex justify-end">
            <button
              onClick={handleGoToApp}
              className="bg-[#fe2858] hover:bg-[#e0244f] text-white px-5 py-2 text-base sm:text-lg font-bold rounded-md shadow-lg transition-all"
            >
              Go to App
            </button>
          </div>

          {/* Welcome Section */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">
              Welcome to HookHack{user?.firstName ? `, ${user.firstName}` : ""}
            </h1>
            <p className="text-gray-300">
              Your TikTok analytics and insights dashboard
            </p>
          </div>

          {/* DB User Data Section */}
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
                    <span className="text-gray-400">Name:</span>{" "}
                    {dbUser.firstName} {dbUser.lastName}
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
                    <span className="text-gray-400">Credits:</span>{" "}
                    {dbUser.credit}
                  </div>
                  <div>
                    <span className="text-gray-400">Joined:</span>{" "}
                    {new Date(dbUser.createdAt).toLocaleDateString()}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-[#232323] overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-[#fe2858] rounded-md flex items-center justify-center">
                      <span className="text-white font-bold">C</span>
                    </div>
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-400 truncate">
                        Credits Available
                      </dt>
                      <dd className="text-lg font-medium text-white">
                        {dbUser ? dbUser.credit : 0}
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-[#232323] overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-green-600 rounded-md flex items-center justify-center">
                      <span className="text-white font-bold">A</span>
                    </div>
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-400 truncate">
                        Analytics Generated
                      </dt>
                      <dd className="text-lg font-medium text-white">0</dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-[#232323] overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-purple-600 rounded-md flex items-center justify-center">
                      <span className="text-white font-bold">R</span>
                    </div>
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-400 truncate">
                        Reports Created
                      </dt>
                      <dd className="text-lg font-medium text-white">0</dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
