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
    isActive: false,
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
    isActive: true,
  },
];

export default function SettingsPage() {
  return (
    <TestboardLayout navMain={navMain} documentsTitle="User Settings">
      <div className="flex flex-col gap-4 py-8 md:gap-6 md:py-10 px-7">
        {/* Header */}
        <div className="px-4 lg:px-6">
          <div className="flex flex-col gap-2">
            <h1 className="text-3xl font-bold tracking-tight">User Settings</h1>
            <p className="text-muted-foreground">
              Manage your account settings
            </p>
          </div>
        </div>

        {/* Settings Content */}
        <div className="px-4 lg:px-6">
          <div className="p-6 border rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Account Settings</h2>
            <p className="text-muted-foreground">
              Settings functionality coming soon...
            </p>
          </div>
        </div>
      </div>
    </TestboardLayout>
  );
}
