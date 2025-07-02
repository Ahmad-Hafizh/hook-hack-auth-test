import { SignIn } from "@clerk/nextjs";
import Link from "next/link";
import Image from "next/image";

export default function SignInPage() {
  return (
    <div className="min-h-screen bg-[#121212] relative overflow-hidden flex items-center justify-center">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-[#fe2858] via-transparent to-transparent"></div>
      </div>
      {/* Centered group */}
      <div className="flex flex-col items-center w-full max-w-md z-10">
        <Link
          href="/"
          className="mb-8 block focus:outline-none focus:ring-2 focus:ring-[#fe2858] rounded-lg"
        >
          <Image
            src="/newlogo.svg"
            alt="Hook-Hack Logo"
            width={200}
            height={44}
            className="h-11 w-auto"
            priority
          />
        </Link>
        <SignIn
          fallbackRedirectUrl="/dashboard"
          appearance={{
            elements: {
              formButtonPrimary:
                "bg-[#fe2858] hover:bg-[#e0244f] text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl",
              card: "bg-white shadow-2xl rounded-2xl border-0 p-8",
              headerTitle: "text-2xl font-bold text-gray-900",
              headerSubtitle: "text-gray-600",
              formFieldLabel: "text-gray-700 font-medium",
              formFieldInput:
                "border-gray-300 focus:border-[#fe2858] focus:ring-[#fe2858] rounded-lg",
              footerActionLink:
                "text-[#fe2858] hover:text-[#e0244f] font-medium",
              dividerLine: "bg-gray-200",
              dividerText: "text-gray-500 bg-white px-4",
              socialButtonsBlockButton:
                "border-gray-300 hover:border-[#fe2858] hover:bg-gray-50",
              socialButtonsBlockButtonText: "text-gray-700 font-medium",
              formFieldInputShowPasswordButton:
                "text-gray-500 hover:text-[#fe2858]",
            },
            variables: {
              colorPrimary: "#fe2858",
              colorBackground: "#121212",
              colorText: "#1f2937",
              colorTextSecondary: "#6b7280",
            },
          }}
        />
        {/* Back to Landing Page link */}
        <Link
          href="/"
          className="mt-10 text-white hover:text-[#fe2858] font-medium transition-colors duration-200 flex items-center gap-2 group"
        >
          <span className="transform group-hover:-translate-x-1 transition-transform duration-200">
            ←
          </span>
          <span>Back to Landing Page</span>
        </Link>
      </div>
    </div>
  );
}
