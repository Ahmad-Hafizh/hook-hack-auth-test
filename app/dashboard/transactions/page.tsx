"use client";
import { Home, Folder, CreditCard, List, Settings } from "lucide-react";
import { TestboardLayout } from "../components/layout";
import { TransactionsTable } from "../components/transactions-table";

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

export default function TransactionsPage() {
  return (
    <TestboardLayout navMain={navMain} documentsTitle="Transactions">
      <div className="flex flex-col gap-4 py-8 md:gap-6 md:py-10 px-10 bg-[#0f0f0f] min-h-screen text-white">
        {/* Header */}
        <div className="px-4 lg:px-6">
          <div className="flex flex-col gap-2">
            <h1 className="text-3xl font-bold tracking-tight text-white">
              Transactions
            </h1>
            <p className="text-muted-foreground text-gray-400">
              View your transaction history
            </p>
          </div>
        </div>

        {/* Transactions Table */}
        <div className="px-5">
          <TransactionsTable />
        </div>
      </div>
    </TestboardLayout>
  );
}
