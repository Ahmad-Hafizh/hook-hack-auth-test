"use client";
import { useUser, UserButton, UserProfile } from "@clerk/nextjs";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const { user, isSignedIn, isLoaded } = useUser();
  const router = useRouter();
  const [loadingToApp, setLoadingToApp] = useState(false);

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
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-purple-200 via-white to-blue-200">
        <div className="flex flex-col items-center">
          <svg
            className="animate-spin h-12 w-12 text-purple-600 mb-6"
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
          <h2 className="text-2xl font-bold text-purple-700 mb-2">
            Loading...
          </h2>
          <p className="text-gray-500">
            Please wait while we prepare your workspace.
          </p>
        </div>
      </div>
    );
  if (!isSignedIn) return null; // Prevents flash
  if (loadingToApp) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-2xl font-bold text-gray-700 animate-pulse">
          Loading App...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Black Navbar with Logo */}
      <nav className="bg-black shadow-md border-b">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-8 py-12 sm:px-12 sm:py-8 lg:px-16 lg:py-12 h-20">
          <div className="flex items-center space-x-2">
            <a href="/dashboard">
              <img src="/newlogo.svg" alt="logo" className="h-9 w-auto my-3" />
            </a>
          </div>
          <div className="flex items-center gap-6">
            <Link
              href="/"
              className="text-white hover:text-purple-300 transition-colors font-semibold"
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
              className="bg-gradient-to-r from-[#fe2858] to-[#ff5e81] hover:from-[#c55064] hover:to-[rgb(215,73,97)] text-white px-5 py-2 text-base sm:text-lg font-bold rounded-md shadow-lg transition-all  "
            >
              Go to App
            </button>
          </div>

          {/* Welcome Section */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Welcome to HookHack{user?.firstName ? `, ${user.firstName}` : ""}
            </h1>
            <p className="text-gray-600">
              Your TikTok analytics and insights dashboard
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-blue-500 rounded-md flex items-center justify-center">
                      <span className="text-white font-bold">C</span>
                    </div>
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        Credits Available
                      </dt>
                      <dd className="text-lg font-medium text-gray-900">0</dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-green-500 rounded-md flex items-center justify-center">
                      <span className="text-white font-bold">A</span>
                    </div>
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        Analytics Generated
                      </dt>
                      <dd className="text-lg font-medium text-gray-900">0</dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-purple-500 rounded-md flex items-center justify-center">
                      <span className="text-white font-bold">R</span>
                    </div>
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        Reports Created
                      </dt>
                      <dd className="text-lg font-medium text-gray-900">0</dd>
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
