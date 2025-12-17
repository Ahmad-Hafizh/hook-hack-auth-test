"use client";
import { MultiStepForm } from "@/components/multi-step-form";
// Temporarily disabled Clerk to fix build
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";

export const dynamic = 'force-dynamic';

// Main component wrapped in Suspense to handle useSearchParams
function AppPageContent() {
  // Temporarily disabled Clerk - using mock values
  // const { isSignedIn, isLoaded } = useUser();
  const isSignedIn = true;
  const isLoaded = true;
  const router = useRouter();
  const searchParams = useSearchParams();

  // Resume-related state
  const [resumeData, setResumeData] = useState<any>(null);
  const [initialStep, setInitialStep] = useState(1);
  const [isLoadingResume, setIsLoadingResume] = useState(false);
  const [resumeError, setResumeError] = useState<string | null>(null);

  // Check for resume parameters
  const isResuming = searchParams.get("resume") === "true";
  const projectId = searchParams.get("projectId");

  console.log("🔍 App Page - URL params:", { isResuming, projectId });

  // Authentication effect
  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      router.replace("/sign-in");
    }
  }, [isLoaded, isSignedIn, router]);

  // Resume detection effect
  useEffect(() => {
    const fetchProjectForResume = async () => {
      if (!isSignedIn || !isResuming || !projectId) {
        console.log("🔍 App Page - Skipping resume fetch:", {
          isSignedIn,
          isResuming,
          projectId: !!projectId,
        });
        return;
      }

      console.log(
        "🚀 App Page - Starting resume fetch for project:",
        projectId
      );
      setIsLoadingResume(true);
      setResumeError(null);

      try {
        console.log("📡 App Page - Calling resume API...");
        const response = await fetch(`/api/project/${projectId}/resume`);

        console.log(
          "📡 App Page - Resume API response status:",
          response.status
        );

        if (response.status === 401) {
          console.log("❌ App Page - Unauthorized, redirecting to sign-in");
          router.replace("/sign-in");
          return;
        }

        if (response.status === 404) {
          console.log("❌ App Page - Project not found or access denied");
          setResumeError(
            "Project not found or you don't have permission to access it."
          );
          return;
        }

        if (!response.ok) {
          console.log("❌ App Page - Resume API error:", response.status);
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }

        const result = await response.json();
        console.log("✅ App Page - Resume API success:", result);

        if (result.success && result.data) {
          setResumeData(result.data);
          setInitialStep(result.data.resumeStep);
          console.log("✅ App Page - Resume data set:", {
            projectId: result.data.id,
            resumeStep: result.data.resumeStep,
            hasData: {
              userinput: !!result.data.userinput,
              comment: !!result.data.comment,
              hook: !!result.data.hook,
              content: !!result.data.content,
            },
          });
        } else {
          throw new Error(result.error || "Failed to fetch project data");
        }
      } catch (error: any) {
        console.error("❌ App Page - Resume fetch error:", error);
        setResumeError(
          error.message || "Failed to load project. Please try again."
        );
      } finally {
        setIsLoadingResume(false);
      }
    };

    // Only fetch if user is loaded and signed in
    if (isLoaded && isSignedIn) {
      fetchProjectForResume();
    }
  }, [isLoaded, isSignedIn, isResuming, projectId, router]);

  // Loading state for authentication
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

  // Prevent flash when not signed in
  if (!isSignedIn) return null;

  // Loading state for resume data
  if (isLoadingResume) {
    return (
      <div className="min-h-screen bg-white flex flex-col">
        {/* Navigation Header */}
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
              {/* Temporarily disabled Clerk UserButton */}
              {isLoaded && isSignedIn && (
                <Link href="/sign-in" className="text-white hover:text-purple-300 transition-colors font-semibold">
                  Account
                </Link>
              )}
            </div>
          </div>
        </header>
        <div className="h-16"></div>

        {/* Loading Content */}
        <div className="flex-1 flex items-center justify-center">
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
            <h2 className="text-2xl font-bold text-[#fe2858] mb-2">
              Loading Project...
            </h2>
            <p className="text-gray-600">
              Preparing your project data for resuming.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Error state for resume
  if (resumeError) {
    return (
      <div className="min-h-screen bg-white flex flex-col">
        {/* Navigation Header */}
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
              {/* Temporarily disabled Clerk UserButton */}
              {isLoaded && isSignedIn && (
                <Link href="/sign-in" className="text-white hover:text-purple-300 transition-colors font-semibold">
                  Account
                </Link>
              )}
            </div>
          </div>
        </header>
        <div className="h-16"></div>

        {/* Error Content */}
        <div className="flex-1 flex items-center justify-center px-4">
          <div className="text-center max-w-md">
            <div className="text-6xl mb-4">⚠️</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Unable to Load Project
            </h2>
            <p className="text-gray-600 mb-6">{resumeError}</p>
            <div className="space-y-3">
              <button
                onClick={() => router.push("/dashboard")}
                className="w-full bg-[#fe2858] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#d91f4a] transition-colors"
              >
                Back to Dashboard
              </button>
              <button
                onClick={() => {
                  // Clear query params and start fresh
                  router.push("/app");
                }}
                className="w-full bg-gray-100 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-colors"
              >
                Start New Project
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Main app content
  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Navigation Header */}
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
            {/* Temporarily disabled Clerk UserButton */}
            {isLoaded && isSignedIn && (
              <Link href="/sign-in" className="text-white hover:text-purple-300 transition-colors font-semibold">
                Account
              </Link>
            )}
          </div>
        </div>
      </header>
      <div className="h-16"></div>

      {/* Resume Banner (if resuming) */}
      {isResuming && resumeData && (
        <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mx-4 mt-4 rounded">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <svg
                className="h-5 w-5 text-blue-400"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-blue-700">
                <strong>Resuming Project:</strong> You're continuing from where
                you left off (Step {initialStep}).
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center px-2 sm:px-6 md:px-12 lg:px-24">
        <div className="w-full max-w-5xl mx-auto">
          <MultiStepForm resumeData={resumeData} initialStep={initialStep} />
        </div>
      </div>
    </div>
  );
}

// Export with Suspense wrapper
export default function Home() {
  return (
    <Suspense
      fallback={
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
            <h2 className="text-2xl font-bold text-[#fe2858] mb-2">
              Loading...
            </h2>
            <p className="text-gray-300">
              Please wait while we prepare your workspace.
            </p>
          </div>
        </div>
      }
    >
      <AppPageContent />
    </Suspense>
  );
}
