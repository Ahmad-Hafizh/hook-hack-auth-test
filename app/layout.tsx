import type React from "react";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Noto_Sans_JP, Kiwi_Maru } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import ReactQueryProvider from "./ReactQueryProvider";
import { Suspense } from "react";
// import AuthSessionProvider from './AuthSession';

const noto = Noto_Sans_JP({
  subsets: ["latin"],
  weight: ["400", "500", "700", "900"],
  variable: "--font-jp",
});

const kiwiMaru = Kiwi_Maru({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-kiwi-maru",
});

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
      <Suspense fallback={null}>
        <body className={`${noto.className} ${kiwiMaru.variable}`}>
          <ReactQueryProvider>
            <ThemeProvider defaultTheme="light">
              <Toaster />
              {children}
            </ThemeProvider>
          </ReactQueryProvider>
        </body>
      </Suspense>
    </html>
  );
}
