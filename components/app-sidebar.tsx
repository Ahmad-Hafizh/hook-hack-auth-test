"use client";

import * as React from "react";
import {
  ArrowUpCircleIcon,
  BarChartIcon,
  CameraIcon,
  ClipboardListIcon,
  DatabaseIcon,
  FileCodeIcon,
  FileIcon,
  FileTextIcon,
  FolderIcon,
  HelpCircleIcon,
  LayoutDashboardIcon,
  ListIcon,
  SearchIcon,
  SettingsIcon,
  UsersIcon,
  Home,
  CreditCard,
} from "lucide-react";

import { NavDocuments } from "@/components/nav-documents";
import { NavMain } from "@/components/nav-main";
import { NavSecondary } from "@/components/nav-secondary";
import { NavUser } from "@/components/nav-user";

const defaultData = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Dashboard",
      url: "#",
      icon: LayoutDashboardIcon,
    },
    {
      title: "Lifecycle",
      url: "#",
      icon: ListIcon,
    },
    {
      title: "Analytics",
      url: "#",
      icon: BarChartIcon,
    },
    {
      title: "Projects",
      url: "#",
      icon: FolderIcon,
    },
    {
      title: "Team",
      url: "#",
      icon: UsersIcon,
    },
  ],
  navClouds: [
    {
      title: "Capture",
      icon: CameraIcon,
      isActive: true,
      url: "#",
      items: [
        {
          title: "Active Proposals",
          url: "#",
        },
        {
          title: "Archived",
          url: "#",
        },
      ],
    },
    {
      title: "Proposal",
      icon: FileTextIcon,
      url: "#",
      items: [
        {
          title: "Active Proposals",
          url: "#",
        },
        {
          title: "Archived",
          url: "#",
        },
      ],
    },
    {
      title: "Prompts",
      icon: FileCodeIcon,
      url: "#",
      items: [
        {
          title: "Active Proposals",
          url: "#",
        },
        {
          title: "Archived",
          url: "#",
        },
      ],
    },
  ],
  navSecondary: [], // Removed Settings, Get Help, Search
  documents: [], // Removed Data Library, Reports, Word Assistant
};

interface AppSidebarProps {
  navMain?: typeof defaultData.navMain;
  customWidth?: string;
  documentsTitle?: string;
}

export function AppSidebar({
  navMain,
  customWidth,
  documentsTitle,
}: AppSidebarProps) {
  const data = {
    ...defaultData,
    navMain: navMain || defaultData.navMain,
  };

  return (
    <div
      className={`${customWidth || "w-80"} flex-shrink-0 bg-[#060606] border-r border-[#361a20] flex flex-col h-full`}
    >
      <div className="px-3 py-4">
        <div className="flex items-center gap-2">
          <a
            href="#"
            className="flex items-center gap-2 text-sm font-semibold text-white hover:text-[#fe2858] transition-colors"
          >
            <img
              src="/newlogo.svg"
              alt="HookHack Logo"
              className="h-12 w-auto px-7 mt-3"
            />
          </a>
        </div>
      </div>
      <div className="px-1 py-2 flex-1">
        <NavMain items={data.navMain} />
        {data.documents.length > 0 && (
          <NavDocuments items={data.documents} title={documentsTitle} />
        )}
        {data.navSecondary.length > 0 && (
          <NavSecondary items={data.navSecondary} />
        )}
      </div>
      <div className="px-4 py-4 mt-auto">
        <NavUser />
      </div>
    </div>
  );
}
