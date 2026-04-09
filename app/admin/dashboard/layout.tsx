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
  X
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

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/admin/login");
    }
  }, [isAuthenticated, isLoading, router]);

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
    <div className="min-h-screen bg-[#fafafa] flex font-outfit">
      {/* Glass Sidebar */}
      <aside 
        className={`${
          isSidebarOpen ? "w-72" : "w-24"
        } bg-[#0a0a0a] text-white transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] flex flex-col fixed inset-y-0 z-50 border-r border-white/5`}
      >
        <div className="p-8 flex items-center justify-between">
          <Link href="/admin/dashboard" className={`flex items-center gap-3 group ${!isSidebarOpen && "hidden"}`}>
            <div className="w-8 h-8 bg-secondary rounded-lg flex items-center justify-center font-bold text-black rotate-3 group-hover:rotate-0 transition-transform">R</div>
            <span className="font-cal-sans text-xl tracking-tight">ROTAGIF <span className="text-secondary">CMS</span></span>
          </Link>
          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className={`p-2 hover:bg-white/10 rounded-xl transition-all ${!isSidebarOpen && "mx-auto"}`}
          >
            {isSidebarOpen ? <X size={20} className="text-gray-400" /> : <Menu size={20} className="text-gray-400" />}
          </button>
        </div>

        <div className="flex-1 px-4 py-6 space-y-8 overflow-y-auto overflow-x-hidden">
          <div>
            <p className={`px-4 mb-4 text-[10px] font-bold text-gray-500 uppercase tracking-[0.2em] ${!isSidebarOpen && "text-center px-0 shrink-0"}`}>
              Main Navigation
            </p>
            <nav className="space-y-1.5">
              {navItems.map((item) => {
                const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all duration-300 group ${
                      isActive 
                        ? "bg-secondary text-black font-bold shadow-lg shadow-secondary/20" 
                        : "text-gray-400 hover:text-white hover:bg-white/[0.03]"
                    }`}
                  >
                    <item.icon size={20} className={`${isActive ? "text-black" : "group-hover:text-secondary transition-colors"}`} />
                    <span className={`${!isSidebarOpen && "hidden"} whitespace-nowrap text-sm tracking-wide`}>
                      {item.name}
                    </span>
                    {isActive && isSidebarOpen && (
                      <div className="ml-auto w-1.5 h-1.5 rounded-full bg-black/40" />
                    )}
                  </Link>
                );
              })}
            </nav>
          </div>

          <div>
             <p className={`px-4 mb-4 text-[10px] font-bold text-gray-500 uppercase tracking-[0.2em] ${!isSidebarOpen && "hidden"}`}>
              System Management
            </p>
            {/* Additional links can go here */}
          </div>
        </div>

        <div className="p-6 mt-auto">
          <div className="bg-white/[0.03] rounded-[2rem] p-4 border border-white/5">
            <div className={`flex items-center gap-4 ${!isSidebarOpen && "justify-center"}`}>
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-gray-800 to-gray-900 border border-white/10 flex items-center justify-center shrink-0 shadow-inner">
                <User size={24} className="text-gray-400" />
              </div>
              {isSidebarOpen && (
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-bold text-white truncate uppercase tracking-tighter">{user?.email?.split('@')[0]}</p>
                  <p className="text-[10px] text-gray-500 uppercase font-black tracking-widest mt-0.5">{user?.role}</p>
                </div>
              )}
            </div>
            
            <button
              onClick={logout}
              className={`mt-4 w-full flex items-center gap-4 px-4 py-3.5 rounded-xl text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-all group ${!isSidebarOpen && "justify-center p-0 h-10 w-10 mx-auto bg-transparent border-none"}`}
              title="Terminate Session"
            >
              <LogOut size={20} className="group-hover:rotate-12 transition-transform" />
              {isSidebarOpen && <span className="text-sm font-bold tracking-wide">Sign Out</span>}
            </button>
          </div>
        </div>
      </aside>

      <main className={`flex-1 transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] ${isSidebarOpen ? "ml-72" : "ml-24"}`}>
        <header className="h-20 bg-white border-b border-gray-100 flex items-center justify-between px-10 sticky top-0 z-40">
           <div className="flex items-center gap-4">
              <h2 className="text-sm font-bold text-gray-400 uppercase tracking-widest">
                {pathname === "/admin/dashboard" ? "Overview" : pathname.split('/').pop()?.replace('-', ' ')}
              </h2>
           </div>
           <div className="flex items-center gap-6">
              <div className="flex -space-x-2">
                {[1,2,3].map(i => (
                  <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-gray-100 overflow-hidden shadow-sm">
                    <img src={`https://i.pravatar.cc/150?u=${i}`} alt="" />
                  </div>
                ))}
              </div>
              <button className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors relative">
                <div className="absolute top-2.5 right-2.5 w-2 h-2 bg-secondary rounded-full border-2 border-white" />
                <Calendar size={18} className="text-gray-600" />
              </button>
           </div>
        </header>

        <div className="p-10 max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
