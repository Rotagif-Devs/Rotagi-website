import type { Metadata } from "next";
import { DM_Sans, Cal_Sans, Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/globalComp/Header";
import Footer from "@/components/globalComp/Footer";
import Providers from "./Provider";
import CookieConsent from "@/components/globalComp/CookieConsent";

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
  metadataBase: new URL("https://rotagif.org"),
  title: "ROTAGIF Empowering African Girl Innovators",
  description:
    "Equipping African girls and women with AI literacy, digital skills, and leadership confidence.",
  openGraph: {
    title: "ROTAGIF Empowering African Girl Innovators",
    description: "Equipping African girls and women with AI literacy, digital skills, and leadership confidence.",
    url: "https://rotagif.org",
    siteName: "ROTAGIF",
    images: [
      {
        url: "/hero-new.jpg",
        width: 1200,
        height: 630,
        alt: "ROTAGIF Empowering African Girl Innovators",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ROTAGIF Empowering African Girl Innovators",
    description: "Equipping African girls and women with AI literacy, digital skills, and leadership confidence.",
    images: ["/hero-new.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" data-scroll-behavior="smooth" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${dmSans.variable} ${calSans.variable} antialiased bg-primary text-gray-900`}
      >
        <Providers>
          {children}
          <CookieConsent />
        </Providers>
      </body>
    </html>
  );
}