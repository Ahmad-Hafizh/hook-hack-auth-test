import type React from "react";
import type { Metadata, Viewport } from "next";
import { Noto_Sans_JP } from "next/font/google";

const notoSansJP = Noto_Sans_JP({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "700", "900"],
  variable: "--font-noto-sans-jp",
});

export const metadata: Metadata = {
  title: "HookHack",
  description:
    "企画・制作・成果振り返りまで一気通貫で支援するから、成果につながる動画マーケティングサービス",
  generator: "v0.app",
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
};

export default function LPCopyLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className={`${notoSansJP.className} ${notoSansJP.variable}`}>
      {children}
    </div>
  );
}
