import type { Metadata } from "next";

import "./globals.css";
import Link from "next/link";
import { StoryProvider } from "./utils/StoryContext";

export const metadata: Metadata = {
  title: "Choose your own adventure",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <StoryProvider>
      <html lang="en">
        <body className="p-5">
          <nav className="flex gap-4 mb-4">
            <Link href="/">Home</Link>
            <Link href="/my-stories">My Stories</Link>
            <Link href="/browse">Browse</Link>
            <Link href="/new-story">New Story</Link>
            <Link href="/flow-test">Flow Test</Link>
          </nav>
          {children}
        </body>
      </html>
    </StoryProvider>
  );
}
