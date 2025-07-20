"use client";
import { Home, Folder, CreditCard, List, Settings } from "lucide-react";
import { TestboardLayout } from "../components/layout";
import ProjectsPage from "../components/pages/projects";

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
    isActive: true,
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

export default function ProjectsRoutePage() {
  return (
    <TestboardLayout navMain={navMain} documentsTitle="Projects">
      <ProjectsPage />
    </TestboardLayout>
  );
}
