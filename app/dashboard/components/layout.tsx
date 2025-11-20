"use client";
import { AppSidebar } from "../../../components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Home, Folder, CreditCard, List, Settings } from "lucide-react";
import { ThemeProvider } from "@/components/theme-provider";
import { ReactNode } from "react";

interface TestboardLayoutProps {
  children: ReactNode;
  navMain?: Array<{
    title: string;
    url: string;
    icon: any;
    isActive?: boolean;
  }>;
  customWidth?: string;
  documentsTitle?: string;
}

const defaultNavMain = [
  {
    title: "Overview",
    url: "/dashboard",
    icon: Home,
  },
  {
    title: "Projects",
    url: "/dashboard/projects",
    icon: Folder,
  },
  {
    title: "Buy Credit",
    url: "/dashboard/credits",
    icon: CreditCard,
  },
  {
    title: "Transaction",
    url: "/dashboard/transactions",
    icon: List,
  },
];

export function TestboardLayout({
  children,
  navMain = defaultNavMain,
  customWidth = "w-72",
  documentsTitle,
}: TestboardLayoutProps) {
  return (
    <ThemeProvider forcedTheme="dark">
      <SidebarProvider>
        <div className="flex h-screen w-full overflow-hidden">
          <AppSidebar
            navMain={navMain}
            customWidth={customWidth}
            documentsTitle={documentsTitle}
          />
          <main className="flex-1 flex flex-col min-w-0 bg-background">
            <SiteHeader title={documentsTitle} />
            <div className="flex-1 flex flex-col overflow-auto">
              <div className="@container/main flex flex-1 flex-col gap-2">
                {children}
              </div>
            </div>
          </main>
        </div>
      </SidebarProvider>
    </ThemeProvider>
  );
}

export default TestboardLayout;
