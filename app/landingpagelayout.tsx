import type React from "react"
import "@/app/globals.css"
import { ThemeProvider } from "@/components/theme-provider"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <title>Clip-Studio | TikTok Video Analysis Tool</title>
        <meta name="description" content="Advanced TikTok video analytics and insights for creators and brands" />
        <link rel="icon" href="/tiktok-favicon.svg" type="image/svg+xml" />
      </head>
      <body>
        <ThemeProvider defaultTheme="light">
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
