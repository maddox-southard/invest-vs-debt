import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { FeedbackButton } from "@/components/FeedbackButton";
import { Analytics } from "@vercel/analytics/react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Invest vs. Debt",
  description: "A calculator to help you decide whether to invest or pay off debt.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className={inter.className}>
        {children}
        <FeedbackButton />
        <Analytics />
      </body>
    </html>
  );
}