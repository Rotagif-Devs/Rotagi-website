import type { Metadata } from "next";
import type { ReactNode } from "react";
import DashboardProvider from "@/components/dashboard/DashboardProvider";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Learning dashboard",
};

interface DashboardLayoutProps {
  children: ReactNode;
  params: Promise<{ slug: string }>;
}

export default async function DashboardLayout({
  children,
  params
}: DashboardLayoutProps) {
  // We can pass the slug to the provider if needed in the future
  const { slug } = await params;
  
  return <DashboardProvider>{children}</DashboardProvider>;
}
