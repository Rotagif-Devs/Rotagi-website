"use client";

import React, { useEffect } from "react";
import { useAdmin } from "@/context/AdminContext";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import {
  LayoutDashboard,
  FileText,
  Calendar,
  LogOut,
  ChevronRight,
  User,
  Menu,
  X,
} from "lucide-react";
import Button from "@/components/ui/Button";

export default function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated, isLoading, logout, user } = useAdmin();
  const router = useRouter();
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(true);
  const [isMobile, setIsMobile] = React.useState(false);

  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);
      if (mobile) setIsSidebarOpen(false);
      else setIsSidebarOpen(true);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/admin/login");
    }
  }, [isAuthenticated, isLoading, router]);

  useEffect(() => {
    if (isMobile) {
      setIsSidebarOpen(false);
    }
  }, [pathname, isMobile]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-primary flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black"></div>
      </div>
    );
  }

  if (!isAuthenticated) return null;

  const navItems = [
    { name: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
    { name: "Blogs", href: "/admin/dashboard/blog", icon: FileText },
    { name: "Events", href: "/admin/dashboard/events", icon: Calendar },
  ];

  return (
    <div className="min-h-screen bg-[#fafafa] flex font-outfit relative">
      {isMobile && isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-opacity duration-300"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      <aside
        className={`${
          isSidebarOpen
            ? isMobile
              ? "translate-x-0 w-72"
              : "translate-x-0 w-72"
            : isMobile
              ? "-translate-x-full w-72"
              : "translate-x-0 w-24"
        } bg-[#050505] text-white transition-all duration-300 ease-in-out flex flex-col fixed inset-y-0 z-50 border-r border-white/5 lg:shadow-none`}
      >
        <div className="p-8 flex items-center justify-between">
          <Link
            href="/admin/dashboard"
            className={`flex items-center gap-3 group ${(isMobile ? false : !isSidebarOpen) && "hidden"}`}
          >
            <span className="font-cal-sans text-xl tracking-tight text-white">
              ROTAGI CMS
            </span>
          </Link>
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className={`p-2 hover:bg-white/10 rounded-xl transition-all ${(isMobile ? false : !isSidebarOpen) && "mx-auto"}`}
          >
            {isSidebarOpen ? (
              <X size={20} className="text-gray-500" />
            ) : (
              <Menu size={20} className="text-gray-500" />
            )}
          </button>
        </div>

        <div className="flex-1 px-4 py-6 space-y-8 overflow-y-auto overflow-x-hidden">
          <div>
            <p
              className={`px-4 mb-4 text-[12px]  text-white uppercase tracking-[0.2em] ${!isSidebarOpen && "text-center px-0 shrink-0"}`}
            >
              Main Navigation
            </p>
            <nav className="space-y-2">
              {navItems.map((item) => {
                const isActive =
                  pathname === item.href ||
                  (item.href !== "/admin/dashboard" &&
                    pathname.startsWith(`${item.href}/`)) ||
                  (item.href === "/admin/dashboard" &&
                    pathname === "/admin/dashboard");
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center gap-4 px-5 py-4 rounded-md transition-all duration-500 group relative overflow-hidden ${
                      isActive
                        ? "bg-secondary text-white"
                        : "hover:text-white hover:bg-white/4"
                    }`}
                  >
                    <item.icon
                      size={20}
                      className={`${isActive ? "text-white scale-110" : "group-hover:scale-110 transition-transform"}`}
                    />
                    <span
                      className={`${!isSidebarOpen && "hidden"} whitespace-nowrap text-sm font-outfit tracking-wide`}
                    >
                      {item.name}
                    </span>
                    {isActive && isSidebarOpen && (
                      <div className="ml-auto w-2 h-2 rounded-full bg-white opacity-40" />
                    )}
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>

        <div className="p-6 mt-auto">
          <div className="bg-white/4 rounded-4xl p-5 border border-white/10 shadow-inner">
            <div
              className={`flex items-center gap-4 ${!isSidebarOpen && "justify-center"}`}
            >
              <div className="w-11 h-11 rounded-full bg-secondary/10 border border-secondary/20 flex items-center justify-center shrink-0 overflow-hidden">
                {user?.role === "admin" ? (
                  <img
                    src="https://i.pravatar.cc/150?u=admin"
                    alt="Admin"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <User size={20} className="text-secondary" />
                )}
              </div>
              {isSidebarOpen && (
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-bold text-white truncate font-outfit">
                    ADMIN
                  </p>
                  <p className="text-[11px] text-gray-500 truncate lowercase font-medium">
                    {user?.email}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </aside>

      <main
        className={`flex-1 transition-all duration-300 ease-in-out ${
          isMobile ? "ml-0" : isSidebarOpen ? "ml-72" : "ml-24"
        }`}
      >
        <header className="h-20 bg-white border-b border-gray-100 flex items-center justify-between px-6 lg:px-10 sticky top-0 z-30">
          <div className="flex items-center gap-4 w-full justify-between">
            {isMobile && (
              <button
                onClick={() => setIsSidebarOpen(true)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <Menu size={20} className="text-gray-600" />
              </button>
            )}
            <h2 className="text-xs font-bold text-gray-400 uppercase tracking-widest truncate">
              {pathname === "/admin/dashboard"
                ? "Overview"
                : pathname.split("/").pop()?.replace("-", " ")}
            </h2>
          </div>
          <button
            onClick={logout}
            className={` w-40 flex items-center gap-4 px-4 py-3.5 rounded-xl text-gray-400 hover:bg-red-500/10 hover:text-red-500 transition-all group font-bold tracking-wide ${!isSidebarOpen && "justify-center p-0 h-10 w-10 mx-auto bg-transparent border-none"}`}
          >
            <LogOut
              size={18}
              className="group-hover:-translate-x-1 transition-transform text-[#FF6C6C]"
            />
            {isSidebarOpen && (
              <span className="text-sm text-[#FF6C6C]">Sign Out</span>
            )}
          </button>
        </header>

        <div className="p-6 lg:p-10 max-w-7xl mx-auto">{children}</div>
      </main>
    </div>
  );
}
