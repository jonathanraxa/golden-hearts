import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Golden Hearts - Volunteer Together",
  description: "Connect with volunteering opportunities and build meaningful relationships in your community. A platform designed for older adults to make a difference.",
  keywords: "volunteering, community service, older adults, senior volunteers, community building",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} font-sans antialiased bg-gray-50`}
      >
        <Navigation />
        <main className="min-h-screen pt-16">
          {children}
        </main>
      </body>
    </html>
  );
}
