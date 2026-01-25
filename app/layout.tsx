import type { Metadata } from "next";
import { Outfit, DM_Sans, Cal_Sans, Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
  weight: ["400", "500", "600", "700"], // add more weights if needed
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
    <html lang="en" className="scroll-smooth">
      <body
        className={`${inter.variable} ${outfit.variable} ${dmSans.variable} ${calSans.variable} font-sans antialiased bg-[#F8E0ED] text-gray-900`}
      >
        {children}
      </body>
    </html>
  );
}
