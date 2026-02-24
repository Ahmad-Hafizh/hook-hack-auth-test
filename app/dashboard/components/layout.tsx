"use client";
import { AppSidebar } from "../../../components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { SidebarProvider } from "@/components/ui/sidebar";
import { ThemeProvider } from "@/components/theme-provider";
import { ReactNode } from "react";

interface TestboardLayoutProps {
  children: ReactNode;
  documentsTitle?: string;
}

export function TestboardLayout({
  children,
}: TestboardLayoutProps) {
  return (
    <ThemeProvider forcedTheme="dark">
      <SidebarProvider>
        <div className="flex h-screen w-full overflow-hidden">
          <AppSidebar />
          <main className="flex-1 flex flex-col min-w-0 bg-background">
            <SiteHeader />
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
