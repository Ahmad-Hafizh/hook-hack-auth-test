import { SignIn } from "@clerk/nextjs";
import Link from "next/link";

export default function SignInPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <SignIn
        // afterSignInUrl="/dashboard"
        // redirectUrl="/dashboard"
        fallbackRedirectUrl="/dashboard"
        // forceRedirectUrl="/dashboard"
        appearance={{
          elements: {
            formButtonPrimary: "bg-blue-500 hover:bg-blue-600",
            card: "shadow-lg",
          },
        }}
      />
      <Link
        href="/"
        className="mt-6 text-blue-600 hover:text-blue-800 underline text-base font-medium transition-colors"
      >
        ← Back to Landing
      </Link>
    </div>
  );
}
