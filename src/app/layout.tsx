import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SessionWrapper } from "./ui/session-wrapper";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "IoT-TestBench",
  description: "Iot TestBench web-app",
};

export default function RootLayout({
  children,
  params: { session, ...params}
}: Readonly<{
  children: React.ReactNode;
  params: any
}>) {
  return (
    <SessionWrapper session={session}>
      <html lang="en">
        <body className={inter.className}>{children}</body>
      </html>
    </SessionWrapper>
  );
}
