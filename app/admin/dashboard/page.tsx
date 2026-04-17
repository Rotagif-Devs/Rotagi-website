"use client";

import React, { useEffect, useState } from "react";
import { 
  FileText, 
  Calendar, 
  Users, 
  ArrowUpRight, 
  TrendingUp, 
  Clock, 
  Edit2, 
  Eye,
  Plus,
  Activity,
  Zap,
  Folder,
  ArrowRight
} from "lucide-react";
import Link from "next/link";
import { adminService } from "@/lib/services/admin.service";
import { BlogPost } from "@/types/blog";
import { events as EventType } from "@/types/event";
import Button from "@/components/ui/Button";

export default function AdminDashboardPage() {
  const [analytics, setAnalytics] = useState<{
    contentVelocity: { count: number; deltaWeek: number };
    activeEngagement: { upcomingCount: number };
    uniqueReach: { count: number; growthPct: number | null };
  } | null>(null);
  const [recentBlogs, setRecentBlogs] = useState<BlogPost[]>([]);
  const [recentEvents, setRecentEvents] = useState<EventType[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadDashboardData = async () => {
      setIsLoading(true);
      try {
        const [blogs, events, stats] = await Promise.all([
          adminService.getBlogs({ limit: 5 }),
          adminService.getEvents({ limit: 5 }),
          adminService.getStats()
        ]);
        
        setRecentBlogs(blogs);
        setRecentEvents(events);
        setAnalytics(stats);
      } catch (error) {
        console.error("Failed to load dashboard data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    loadDashboardData();
  }, []);

  const cards = [
    { 
      name: "My Blogs", 
      value: analytics?.contentVelocity.count ?? 0, 
      subValue: `+${analytics?.contentVelocity.deltaWeek ?? 0} this week`, 
      icon: Folder, 
      color: "text-secondary bg-secondary/5", 
      href: "/admin/dashboard/blog" 
    },
    { 
      name: "My Events", 
      value: analytics?.activeEngagement.upcomingCount ?? 0, 
      subValue: `+2 this week`, 
      icon: Folder, 
      color: "text-secondary bg-secondary/5", 
      href: "/admin/dashboard/events" 
    },
  ];

  return (
    <div className="space-y-6 sm:space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-10">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-3xl sm:text-4xl font-cal-sans text-black tracking-tight leading-tight">Intelligence Overview</h1>
          <p className="text-gray-500 mt-1 sm:mt-2 font-medium tracking-wide text-sm sm:text-base">Syncing your digital ecosystem in real-time.</p>
        </div>
        <div className="flex flex-wrap gap-4">
          <Link href="/admin/dashboard/blog/new" className="flex-1 sm:flex-none">
            <Button variant="outline" className="w-full sm:w-auto rounded-xl border-gray-200 bg-white text-gray-700 hover:bg-gray-50 px-6 py-6 font-bold text-sm shadow-sm transition-all active:scale-95">
              + Add New Blog
            </Button>
          </Link>
          <Link href="/admin/dashboard/events/new" className="flex-1 sm:flex-none">
            <Button variant="primary" className="w-full sm:w-auto rounded-xl bg-secondary text-white hover:bg-secondary/90 border-none px-6 py-6 font-bold text-sm shadow-xl shadow-secondary/20 transition-all active:scale-95">
              + New Event
            </Button>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-10">
        {cards.map((card, idx) => (
          <div 
            key={card.name} 
            className="bg-white p-10 rounded-[2.5rem] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.03)] border border-gray-50 hover:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.06)] transition-all duration-700 group relative overflow-hidden flex flex-col justify-between min-h-[220px]"
          >
            {/* Pink Accent Line */}
            <div className="absolute left-0 top-12 bottom-12 w-1 bg-secondary rounded-r-full opacity-60" />

            <div className="relative z-10 flex flex-col gap-8 h-full">
              <div className={`w-14 h-14 rounded-2xl ${card.color} flex items-center justify-center shadow-lg shadow-secondary/5`}>
                  <card.icon size={28} />
              </div>
              
              <div>
                <h3 className="text-gray-400 text-sm font-bold font-outfit uppercase tracking-wider mb-2">{card.name}</h3>
                <div className="flex items-end gap-5">
                  <p className="text-6xl font-black text-black tracking-tighter leading-none">{card.value < 10 ? `0${card.value}` : card.value}</p>
                  <div className="mb-1">
                    <span className="text-[11px] font-black text-green-600 uppercase tracking-widest bg-[#E8F5E9] px-3 py-1.5 rounded-full border border-green-100/50">
                      {card.subValue}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between px-4 mb-4">
            <h2 className="text-2xl font-black text-black font-outfit">Recent Transmissions</h2>
            <Link href="/admin/dashboard/blog" className="text-xs font-black text-secondary uppercase tracking-widest flex items-center gap-2 group">
              View All <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
          
          <div className="bg-white rounded-[3rem] border border-gray-50 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.03)] overflow-hidden p-6 md:p-8">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-gray-50 text-[11px] font-black text-gray-400 uppercase tracking-[0.2em] bg-gray-50/30">
                    <th className="px-8 py-7">TITLE</th>
                    <th className="px-8 py-7">DATE</th>
                    <th className="px-8 py-7">CATEGORY</th>
                    <th className="px-8 py-7">STATUS</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {recentBlogs.map((blog) => (
                    <tr key={blog.id} className="hover:bg-gray-50/50 transition-colors group">
                      <td className="px-8 py-7">
                        <div className="flex items-center gap-5">
                          <div className="w-11 h-11 rounded-full bg-gray-100 overflow-hidden shrink-0 border-4 border-white shadow-xl shadow-black/5 transition-transform group-hover:scale-110">
                            <img src={blog.image} alt="" className="w-full h-full object-cover" />
                          </div>
                          <p className="font-bold text-gray-900 truncate text-[15px] tracking-tight">{blog.title}</p>
                        </div>
                      </td>
                      <td className="px-8 py-7 text-xs font-semibold text-gray-500 font-outfit">
                        {new Date(blog.date).toLocaleDateString('en-GB')}
                      </td>
                      <td className="px-8 py-7">
                        <div className="flex items-center gap-2 bg-gray-100/50 w-fit px-4 py-1.5 rounded-full border border-gray-200/50">
                          <div className="w-1.5 h-1.5 rounded-full bg-gray-400" />
                          <span className="text-[11px] font-black text-gray-600 uppercase tracking-widest">
                            {blog.category}
                          </span>
                        </div>
                      </td>
                      <td className="px-8 py-7">
                        <div className="flex items-center gap-2 bg-[#E8F5E9]/50 w-fit px-4 py-1.5 rounded-full border border-green-100">
                          <div className="w-1.5 h-1.5 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]" />
                          <span className="text-[11px] font-black text-green-700 uppercase tracking-widest">Published</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="flex items-center justify-between px-2">
            <h2 className="text-xl font-cal-sans text-black">Pulse</h2>
            <Activity size={18} className="text-secondary animate-pulse" />
          </div>

          <div className="bg-black rounded-[2.5rem] p-8 text-white relative overflow-hidden shadow-2xl shadow-secondary/10">

             <div className="relative z-10">
                <p className="text-[10px] font-black text-secondary uppercase tracking-[0.3em] mb-1">Service Health</p>
                <h3 className="text-2xl font-bold mb-6">Operations Nominal</h3>
                
                <div className="space-y-5">
                  {[
                    { label: "Content Delivery Network", status: "Optimal", active: true },
                    { label: "Database Persistence", status: "Connected", active: true },
                    { label: "Media Optimization", status: "Processing", active: true },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center justify-between bg-white/[0.05] p-4 rounded-2xl border border-white/5">
                      <span className="text-xs font-medium text-gray-400">{item.label}</span>
                      <span className="text-[10px] font-bold text-secondary uppercase tracking-widest">{item.status}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-8 pt-8 border-t border-white/10">
                   <div className="flex items-center justify-between mb-4">
                      <span className="text-xs text-gray-400">Memory Allocation</span>
                      <span className="text-xs font-bold">42%</span>
                   </div>
                   <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                      <div className="h-full bg-secondary w-[42%] rounded-full shadow-[0_0_12px_rgba(255,107,0,0.5)]" />
                   </div>
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}

