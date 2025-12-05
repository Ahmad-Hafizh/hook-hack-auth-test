import type React from 'react';
import '@/app/globals.css';
import { ThemeProvider } from '@/components/theme-provider';
import { Noto_Sans_JP } from 'next/font/google';
import { Toaster } from '@/components/ui/toaster';
// import { ClerkProvider } from '@clerk/nextjs';
import ReactQueryProvider from './ReactQueryProvider';

const noto = Noto_Sans_JP({ subsets: ['latin'], variable: '--font-jp' });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    // <ClerkProvider>
    <html lang="en" suppressHydrationWarning>
      <head>
        <title>Hook-hack | Hook Generator Tools</title>
        <meta name="description" content="Advanced TikTok video analytics and insights for creators and brands" />
        <link rel="icon" href="/tiktok-favicon.svg" type="image/svg+xml" />
      </head>
      <body className={noto.className}>
        <ReactQueryProvider>
          <ThemeProvider defaultTheme="light">
            <Toaster />
            {children}
          </ThemeProvider>
        </ReactQueryProvider>
      </body>
    </html>
    // {/* </ClerkProvider> */}
  );
}
