import type React from "react";
import "@/app/globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Noto_Sans_JP } from "next/font/google";
import { Toaster } from "@/components/ui/toaster";

const noto = Noto_Sans_JP({ subsets: ["latin"], variable: "--font-jp" });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <title>Hook-hack | Hook Generator Tools</title>
        <meta
          name="description"
          content="Advanced TikTok video analytics and insights for creators and brands"
        />
        <link rel="icon" href="/tiktok-favicon.svg" type="image/svg+xml" />
      </head>
      <body className={noto.className}>
        <ThemeProvider defaultTheme="light">
          <Toaster />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
