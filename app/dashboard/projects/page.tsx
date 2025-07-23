"use client";
import { Home, Folder, CreditCard, List, Settings } from "lucide-react";
import { TestboardLayout } from "../components/layout";
import ProjectsPage from "../components/pages/projects";

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

export default function ProjectsRoutePage() {
  return (
    <TestboardLayout navMain={navMain} documentsTitle="Projects">
      <ProjectsPage />
    </TestboardLayout>
  );
}
