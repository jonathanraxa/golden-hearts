import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";
import { AuthProvider } from "@/contexts/AuthContext";
import SupabaseStatus from "@/components/SupabaseStatus";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Golden Hearts - Volunteer Together",
  description: "Connect with volunteering opportunities and build meaningful relationships in your community. A platform designed for older adults to make a difference.",
  keywords: "volunteering, community service, older adults, senior volunteers, community building",
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} font-sans antialiased bg-gray-50 transition-colors duration-200`}
      >
        <AuthProvider>
          <Navigation />
          <main className="min-h-screen pt-16">
            {children}
          </main>
          <SupabaseStatus />
        </AuthProvider>
      </body>
    </html>
  );
}
