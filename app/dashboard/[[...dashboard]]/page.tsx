"use client";
import { Home, Folder, CreditCard, List, Settings } from "lucide-react";
import { TestboardLayout } from "../components/layout";
import OverviewPage from "../components/pages/overview";
import React from "react";

const navMain = [
  {
    title: "Overview",
    url: "/dashboard",
    icon: Home,
    isActive: true,
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

export default function TestboardPage() {
  return (
    <TestboardLayout navMain={navMain} documentsTitle="Overview">
      <OverviewPage />
    </TestboardLayout>
  );
}
