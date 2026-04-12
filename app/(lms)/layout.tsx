import type { Metadata } from "next";
import type { ReactNode } from "react";
import DashboardProvider from "@/components/dashboard/DashboardProvider";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Learning dashboard",
};

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({
  children,
}: DashboardLayoutProps) {
  return <DashboardProvider>{children}</DashboardProvider>;
}