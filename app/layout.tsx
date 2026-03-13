import type { Metadata } from "next";
import { DM_Sans, Cal_Sans, Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/globalComp/Header";
import Footer from "@/components/globalComp/Footer";
import Providers from "./Provider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  weight: ["400", "500", "700"],
  display: "swap",
  
});

const calSans = Cal_Sans({
  subsets: ["latin"],
  variable: "--font-cal-sans",
  weight: "400",
  display: "swap",
  fallback: ["Inter", "sans-serif"],
});

export const metadata: Metadata = {
  title: "ROTAGIF - Empowering African Girl Innovators",
  description:
    "Equipping African girls and women with AI literacy, digital skills, and leadership confidence.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${dmSans.variable} ${calSans.variable} antialiased bg-primary text-gray-900`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}