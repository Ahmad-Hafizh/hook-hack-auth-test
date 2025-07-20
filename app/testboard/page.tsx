"use client";
import { Home, Folder, CreditCard, List, Settings } from "lucide-react";
import { TestboardLayout } from "./components/layout";
import OverviewPage from "./components/pages/overview";

const navMain = [
  {
    title: "Overview",
    url: "/testboard",
    icon: Home,
    isActive: true,
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
    isActive: false,
  },
];

export default function TestboardPage() {
  return (
    <TestboardLayout navMain={navMain} documentsTitle="Overview">
      <OverviewPage />
    </TestboardLayout>
  );
}
