"use client";
import { Home, Folder, CreditCard, List, Settings } from "lucide-react";
import { TestboardLayout } from "../components/layout";

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
  return (
    <TestboardLayout navMain={navMain} documentsTitle="Buy Credits">
      <div className="flex flex-col gap-4 py-8 md:gap-6 md:py-10 px-7">
        {/* Header */}
        <div className="px-4 lg:px-6">
          <div className="flex flex-col gap-2">
            <h1 className="text-3xl font-bold tracking-tight">Buy Credits</h1>
            <p className="text-muted-foreground">
              Purchase credits for video analysis
            </p>
          </div>
        </div>

        {/* Credits Content */}
        <div className="px-4 lg:px-6">
          <div className="p-6 border rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Credit Packages</h2>
            <p className="text-muted-foreground">
              Credit purchase functionality coming soon...
            </p>
          </div>
        </div>
      </div>
    </TestboardLayout>
  );
}
