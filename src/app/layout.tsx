import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ETF Observatory — TW & HK Markets",
  description: "Taiwan & Hong Kong ETF market analytics dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="noise-overlay">{children}</body>
    </html>
  );
}
