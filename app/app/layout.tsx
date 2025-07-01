import type { Metadata } from "next";
import { Noto_Sans_JP } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import type React from "react";
import "@/app/globals.css";

const noto = Noto_Sans_JP({ subsets: ["latin"], variable: "--font-jp" });

export const metadata: Metadata = {
  title: "Hook-Hack | Hook Generator Tools",
  description:
    "Advanced TikTok video analytics and insights for creators and brands",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider defaultTheme="light" forcedTheme="light">
      <div className={noto.className}>
        <div className="h-16"></div>
        <style>{`html { scroll-behavior: smooth; }`}</style>
        {children}
      </div>
    </ThemeProvider>
  );
}
