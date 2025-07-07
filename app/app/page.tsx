"use client";
import { MultiStepForm } from "@/components/multi-step-form";
import { useUser, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const { isSignedIn, isLoaded } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      router.replace("/sign-in");
    }
  }, [isLoaded, isSignedIn, router]);

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

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Black Navbar with Logo */}
      <header className="fixed top-0 left-0 right-0 z-50 px-4 py-7 bg-black shadow-md">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <a href="/">
              <img src="/newlogo.svg" alt="logo" className="h-9 w-auto" />
            </a>
          </div>
          <div className="flex items-center gap-6">
            <Link
              href="/"
              className="text-white hover:text-purple-300 transition-colors font-semibold"
            >
              Home
            </Link>
            <Link
              href="/dashboard"
              className="text-white hover:text-purple-300 transition-colors font-semibold"
            >
              Dashboard
            </Link>

            {isLoaded && isSignedIn && <UserButton afterSignOutUrl="/" />}
          </div>
        </div>
      </header>
      <div className="h-16"></div>
      <div className="flex-1 flex items-center justify-center px-2 sm:px-6 md:px-12 lg:px-24">
        <div className="w-full max-w-5xl mx-auto">
          <MultiStepForm />
        </div>
      </div>
    </div>
  );
}
