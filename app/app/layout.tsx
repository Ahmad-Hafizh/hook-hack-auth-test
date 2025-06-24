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
    <html lang="en" suppressHydrationWarning>
      <head>
        <title>Hook-Hack | Hook Generator Tools</title>
        <meta
          name="description"
          content="Advanced TikTok video analytics and insights for creators and brands"
        />
        <link rel="icon" href="/tiktok-favicon.svg" type="image/svg+xml" />
      </head>
      <body className={`${noto.className}`}>
        {/* Navbar */}
        <header className="fixed top-0 left-0 right-0 z-50 px-4 py-4 transition-all duration-300 bg-black shadow-md">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <a href="/">
                <img
                  src="/newlogo.svg"
                  alt="logo"
                  className="h-9 w-auto my-3"
                />
              </a>
            </div>
            <div className="flex items-center gap-6">
              {/* <a href="#dashboard" className="text-gray-700 hover:text-purple-700 transition-colors">Dashboard</a>
              <a href="#analytics" className="text-gray-700 hover:text-purple-700 transition-colors">Analytics</a>
              <a href="#settings" className="text-gray-700 hover:text-purple-700 transition-colors">Settings</a>
              <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-gray-400 font-bold">A</div> */}
            </div>
          </div>
        </header>
        <div className="h-16"></div>
        <style>{`html { scroll-behavior: smooth; }`}</style>
        <ThemeProvider defaultTheme="light" forcedTheme="light">
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
