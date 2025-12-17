"use client";
import { Home, Folder, CreditCard, List, Settings } from "lucide-react";
import { TestboardLayout } from "../components/layout";

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

const navMain = [
  {
    title: "Overview",
    url: "/dashboard",
    icon: Home,
    isActive: false,
  },
  {
    title: "Projects",
    url: "/dashboard/projects",
    icon: Folder,
    isActive: false,
  },
  {
    title: "Buy Credit",
    url: "/dashboard/credits",
    icon: CreditCard,
    isActive: false,
  },
  {
    title: "Transaction",
    url: "/dashboard/transactions",
    icon: List,
    isActive: false,
  },
];

export default function SettingsPage() {
  return (
    <TestboardLayout navMain={navMain} documentsTitle="User Settings">
      <div className="flex flex-col gap-4 py-8 md:gap-6 md:py-10 px-7 bg-[#0f0f0f] min-h-screen text-white">
        {/* Header */}
        <div className="px-4 lg:px-6">
          <div className="flex flex-col gap-2">
            <h1 className="text-3xl font-bold tracking-tight text-white">
              User Settings
            </h1>
            <p className="text-muted-foreground text-gray-400">
              Manage your account settings
            </p>
          </div>
        </div>

        {/* Settings Content */}
        <div className="px-4 lg:px-6">
          <div className="p-6 border border-[#361a20] rounded-lg bg-[#1a1a1a]">
            <h2 className="text-xl font-semibold mb-4 text-white">
              Account Settings
            </h2>
            <form className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-2 rounded bg-[#0f0f0f] border border-[#361a20] text-white focus:outline-none focus:ring-2 focus:ring-[#fe2858]"
                  value="John Doe"
                  disabled
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  className="w-full px-4 py-2 rounded bg-[#0f0f0f] border border-[#361a20] text-white focus:outline-none focus:ring-2 focus:ring-[#fe2858]"
                  value="user@example.com"
                  disabled
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Password
                </label>
                <input
                  type="password"
                  className="w-full px-4 py-2 rounded bg-[#0f0f0f] border border-[#361a20] text-white focus:outline-none focus:ring-2 focus:ring-[#fe2858]"
                  value="********"
                  disabled
                />
              </div>
              <button
                type="button"
                className="mt-2 px-6 py-3 rounded-lg bg-[#fe2858] text-white font-semibold text-lg shadow hover:bg-[#e01e4d] transition-colors focus:outline-none focus:ring-2 focus:ring-[#fe2858] focus:ring-offset-2 focus:ring-offset-[#1a1a1a] disabled:opacity-60"
                disabled
              >
                Save Changes
              </button>
            </form>
            <p className="text-xs text-gray-500 mt-4">
              Settings functionality coming soon...
            </p>
          </div>
        </div>
      </div>
    </TestboardLayout>
  );
}
