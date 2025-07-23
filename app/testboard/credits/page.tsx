"use client";
import { Home, Folder, CreditCard, List, Settings } from "lucide-react";
import { TestboardLayout } from "../components/layout";
import { useState } from "react";

const navMain = [
  {
    title: "Overview",
    url: "/testboard",
    icon: Home,
    isActive: false,
  },
  {
    title: "Projects",
    url: "/testboard/projects",
    icon: Folder,
    isActive: false,
  },
  {
    title: "Buy Credit",
    url: "/testboard/credits",
    icon: CreditCard,
    isActive: true,
  },
  {
    title: "Transaction",
    url: "/testboard/transactions",
    icon: List,
    isActive: false,
  },
  {
    title: "User Setting",
    url: "/testboard/settings",
    icon: Settings,
    isActive: false,
  },
];

export default function CreditsPage() {
  // Replace with your actual Stripe Price ID
  const priceId =
    process.env.NEXT_PUBLIC_STRIPE_PRICE_ID || "price_1Rl1JbPn03NUFuvTGt6smBJp";
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleBuy = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/stripe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ priceId }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        setError("Failed to create Stripe session.");
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <TestboardLayout navMain={navMain} documentsTitle="Buy Credits">
      <div className="flex flex-col gap-4 py-8 md:gap-6 md:py-10 px-7 bg-[#0f0f0f] min-h-screen text-white">
        {/* Header */}
        <div className="px-4 lg:px-6">
          <div className="flex flex-col gap-2">
            <h1 className="text-3xl font-bold tracking-tight text-white">
              Buy Credits
            </h1>
            <p className="text-muted-foreground text-gray-400">
              Purchase credits for your account
            </p>
          </div>
        </div>

        {/* Credits Content */}
        <div className="px-4 lg:px-6">
          <div className="p-6 border border-[#361a20] rounded-lg bg-[#1a1a1a]">
            <h2 className="text-xl font-semibold mb-4 text-white">
              Credit Packages
            </h2>
            <p className="text-muted-foreground text-gray-400 mb-6">
              Credit purchase functionality coming soon...
            </p>
            <button
              className="mt-2 px-6 py-3 rounded-lg bg-[#fe2858] text-white font-semibold text-lg shadow hover:bg-[#e01e4d] transition-colors focus:outline-none focus:ring-2 focus:ring-[#fe2858] focus:ring-offset-2 focus:ring-offset-[#1a1a1a] disabled:opacity-60"
              onClick={handleBuy}
              disabled={loading}
            >
              {loading ? "Redirecting..." : "Buy Package"}
            </button>
            {error && <p className="mt-3 text-red-400">{error}</p>}
          </div>
        </div>
      </div>
    </TestboardLayout>
  );
}
