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
  Zap
} from "lucide-react";
import Link from "next/link";
import { adminService } from "@/lib/services/admin.service";
import { BlogPost } from "@/types/blog";
import { events as EventType } from "@/types/event";
import Button from "@/components/ui/Button";

export default function AdminDashboardPage() {
  const [stats, setStats] = useState({
    blogs: 0,
    events: 0,
    users: 12,
    visits: "2.4k",
  });
  const [recentBlogs, setRecentBlogs] = useState<BlogPost[]>([]);
  const [recentEvents, setRecentEvents] = useState<EventType[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadDashboardData = async () => {
      setIsLoading(true);
      const blogs = await adminService.getBlogs();
      const events = await adminService.getEvents();
      
      setStats({
        blogs: blogs.length,
        events: events.length,
        users: 12,
        visits: "2.4k",
      });
      
      setRecentBlogs(blogs.slice(0, 3));
      setRecentEvents(events.slice(0, 3));
      setIsLoading(false);
    };
    loadDashboardData();
  }, []);

  const cards = [
    { name: "Content Velocity", value: stats.blogs, subValue: "+2 this week", icon: Zap, color: "bg-orange-500", href: "/admin/dashboard/blog" },
    { name: "Active Engagements", value: stats.events, subValue: "4 upcoming", icon: Activity, color: "bg-secondary", href: "/admin/dashboard/events" },
    { name: "Unique Reach", value: stats.visits, subValue: "+12% growth", icon: TrendingUp, color: "bg-blue-500", href: "#" },
  ];

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-4xl font-cal-sans text-black tracking-tight">Intelligence Overview</h1>
          <p className="text-gray-500 mt-2 font-medium tracking-wide">Syncing your digital ecosystem in real-time.</p>
        </div>
        <div className="flex gap-3">
          <Link href="/admin/dashboard/blog/new">
            <Button variant="outline" className="rounded-2xl border-gray-200 bg-white text-black hover:bg-gray-50 px-6 py-6 font-bold text-sm">
              <Plus size={18} className="mr-2" />
              Manifest Blog
            </Button>
          </Link>
          <Link href="/admin/dashboard/events/new">
            <Button variant="primary" className="rounded-2xl bg-black text-white hover:bg-gray-900 border-none px-6 py-6 font-bold text-sm shadow-xl shadow-black/10">
              <Calendar size={18} className="mr-2" />
              Schedule Event
            </Button>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {cards.map((card, idx) => (
          <div 
            key={card.name} 
            className="bg-white p-8 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.02)] border border-gray-100 hover:shadow-[0_20px_50px_rgba(0,0,0,0.05)] hover:-translate-y-1 transition-all duration-500 group relative overflow-hidden"
          >

            <div className="flex items-start justify-between relative z-10">
              <div className={`p-4 rounded-2xl ${card.color} text-white shadow-lg shadow-current/20`}>
                <card.icon size={24} />
              </div>
              <Link href={card.href} className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 hover:text-black hover:bg-gray-100 transition-all">
                <ArrowUpRight size={20} />
              </Link>
            </div>
            <div className="mt-8 relative z-10">
              <h3 className="text-gray-400 text-xs font-black uppercase tracking-[0.15em]">{card.name}</h3>
              <div className="flex items-baseline gap-3 mt-2">
                <p className="text-4xl font-bold text-black tracking-tighter">{card.value}</p>
                <span className="text-[10px] font-black text-secondary uppercase tracking-widest bg-secondary/10 px-2 py-1 rounded-full">{card.subValue}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between px-2">
            <h2 className="text-xl font-cal-sans text-black">Recent Transmissions</h2>
            <Link href="/admin/dashboard/blog" className="text-xs font-bold text-secondary uppercase tracking-widest hover:underline">View All Terminal</Link>
          </div>
          
          <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-[0_20px_50px_rgba(0,0,0,0.02)] overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-gray-50/50 border-b border-gray-100 text-[10px] font-black text-gray-400 uppercase tracking-widest">
                    <th className="px-8 py-5">Content Entity</th>
                    <th className="px-8 py-5">Category</th>
                    <th className="px-8 py-5">Status</th>
                    <th className="px-8 py-5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {recentBlogs.map((blog) => (
                    <tr key={blog.id} className="hover:bg-gray-50/30 transition-colors group">
                      <td className="px-8 py-5">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-2xl bg-gray-100 overflow-hidden shrink-0 border border-gray-100 group-hover:scale-105 transition-transform">
                            <img src={blog.image} alt="" className="w-full h-full object-cover" />
                          </div>
                          <div className="min-w-0">
                            <p className="font-bold text-gray-900 truncate text-sm">{blog.title}</p>
                            <div className="flex items-center gap-2 mt-1">
                                <Clock size={12} className="text-gray-400" />
                                <span className="text-[10px] text-gray-400 font-medium">{new Date(blog.date).toLocaleDateString()}</span>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-8 py-5">
                        <span className="text-[10px] font-black text-gray-500 bg-gray-100 px-3 py-1.5 rounded-full uppercase tracking-widest font-outfit">
                          {blog.category}
                        </span>
                      </td>
                      <td className="px-8 py-5">
                        <div className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]" />
                          <span className="text-[10px] font-bold text-gray-700 uppercase tracking-widest">Published</span>
                        </div>
                      </td>
                      <td className="px-8 py-5 text-right">
                        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Link 
                            href={`/admin/dashboard/blog/${blog.id}/edit`}
                            className="p-2.5 bg-gray-50 rounded-xl text-gray-600 hover:bg-secondary hover:text-black transition-all"
                            title="Edit Content"
                          >
                            <Edit2 size={16} />
                          </Link>
                          <Link 
                            href={`/blog/${blog.slug}`}
                            target="_blank"
                            className="p-2.5 bg-gray-50 rounded-xl text-gray-600 hover:bg-black hover:text-white transition-all"
                            title="Preview Public"
                          >
                            <Eye size={16} />
                          </Link>
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

