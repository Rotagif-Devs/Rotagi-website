"use client";

import React, { useEffect, useState } from "react";
import { Folder, ArrowRight } from "lucide-react";
import Link from "next/link";
import { adminService, AdminStats } from "@/lib/services/admin.service";
import { BlogPost } from "@/types/blog";
import { events as EventType } from "@/types/event";
import Button from "@/components/ui/Button";
import { ChevronRight } from "lucide-react";
import ActionMenu from "@/components/admin/ActionMenu";
import { useAdmin } from "@/context/AdminContext";
export default function AdminDashboardPage() {
  const { user } = useAdmin();
  const isFullAdmin = (user?.roles || []).includes("admin");
  const [analytics, setAnalytics] = useState<AdminStats | null>(null);
  const [recentBlogs, setRecentBlogs] = useState<BlogPost[]>([]);
  const [recentEvents, setRecentEvents] = useState<EventType[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadDashboardData = async () => {
    setIsLoading(true);
    try {
      // A Content Manager's list/edit calls already come back scoped to
      // their own posts (the backend filters by authorId/createdBy for
      // that role), so this table naturally shows only their work too —
      // the only thing that needs a different endpoint is the stats card,
      // since /admin/cms/stats is org-wide and 403s a non-admin.
      const [blogs, events, stats] = await Promise.all([
        adminService.getBlogs({ limit: 5 }),
        adminService.getEvents({ limit: 5 }),
        isFullAdmin ? adminService.getStats() : adminService.getMyStats(),
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

  useEffect(() => {
    loadDashboardData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFullAdmin]);

  const handleDeleteBlog = async (id: string) => {
    if (confirm("Are you sure you want to delete this blog post?")) {
      await adminService.deleteBlog(id);
      loadDashboardData();
    }
  };

  const handleDeleteEvent = async (id: string) => {
    if (confirm("Are you sure you want to delete this event?")) {
      await adminService.deleteEvent(id);
      loadDashboardData();
    }
  };

  type Transmission = {
    id: string;
    title: string;
    date: string;
    category: string;
    status: string;
    editUrl: string;
    onDelete: () => void;
  };

  const recentTransmissions: Transmission[] = [
    ...recentBlogs.map((item) => ({
      id: item.id,
      title: item.title,
      date: item.date,
      category: item.category,
      status: item.status,
      editUrl: `/admin/dashboard/blog/${item.id}/edit`,
      onDelete: () => handleDeleteBlog(item.id),
    })),
    ...recentEvents.map((item) => ({
      id: item.id || item.slug,
      title: item.title,
      date: item.date,
      category: "Event",
      status: "published",
      editUrl: `/admin/dashboard/events/${item.slug}/edit`,
      onDelete: () => handleDeleteEvent(item.id || item.slug),
    })),
  ]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 8);

  const cards = [
    {
      name: "My Blogs",
      value: analytics?.myBlogs.count ?? 0,
      subValue: `+${analytics?.myBlogs.deltaWeek ?? 0} this week`,
      icon: Folder,
      color: "text-secondary bg-secondary/5",
      href: "/admin/dashboard/blog",
    },
    {
      name: "My Events",
      value: analytics?.myEvents.count ?? 0,
      subValue: `+${analytics?.myEvents.deltaWeek ?? 0} this week`,
      icon: Folder,
      color: "text-secondary bg-secondary/5",
      href: "/admin/dashboard/events",
    },
  ];

  return (
    <div className="space-y-6 sm:space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-10">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-3xl sm:text-4xl font-cal-sans text-black tracking-tight leading-tight">
            {isFullAdmin ? "Intelligence Overview" : "My Dashboard"}
          </h1>
          <p className="text-gray-500 mt-1 sm:mt-2 font-medium tracking-wide text-sm sm:text-base">
            {isFullAdmin
              ? "Syncing your digital ecosystem in real-time."
              : "Your own posts and events, at a glance."}
          </p>
        </div>
        <div className="flex flex-wrap gap-4">
          <Link
            href="/admin/dashboard/blog/new"
            className="flex-1 sm:flex-none"
          >
            <Button
              variant="outline"
              className="w-full sm:w-auto rounded-xl border-gray-200 bg-white text-gray-700 hover:bg-gray-50 px-6  font-bold text-sm shadow-sm transition-all active:scale-95"
            >
              + Add New Blog
            </Button>
          </Link>
          <Link
            href="/admin/dashboard/events/new"
            className="flex-1 sm:flex-none"
          >
            <Button
              variant="primary"
              className="w-full sm:w-auto rounded-xl bg-secondary text-white hover:bg-secondary/90 border-none px-6  font-bold text-sm shadow-xl shadow-secondary/20 transition-all active:scale-95"
            >
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
              <div
                className={`w-14 h-14 rounded-2xl ${card.color} flex items-center justify-center shadow-lg shadow-secondary/5`}
              >
                <card.icon size={28} />
              </div>

              <div>
                <h3 className="text-gray-400 text-sm font-bold font-outfit uppercase tracking-wider mb-2">
                  {card.name}
                </h3>
                <div className="flex items-end gap-5">
                  <p className="text-6xl font-black text-black tracking-tighter leading-none">
                    {card.value < 10 ? `0${card.value}` : card.value}
                  </p>
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

      <div className="max-w-5xl mx-auto p-6 bg-gray-50 min-h-screen">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          {/* Header Section */}
          <div className="flex items-center justify-between px-8 py-6">
            <h2 className="text-xl text-gray-900">Recent Transmissions</h2>
            <Link
              href="/admin/dashboard/blog"
              className="text-xs font-black text-secondary uppercase tracking-widest flex items-center gap-2 group"
            >
              View All{" "}
              <ArrowRight
                size={14}
                className="group-hover:translate-x-1 transition-transform"
              />
            </Link>
          </div>

          {/* Table Section */}
          <div className="overflow-x-auto px-4 pb-4 min-h-[400px]">
            <table className="w-full text-left border-separate border-spacing-y-0">
              <thead>
                <tr className="bg-gray-50/50">
                  <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider rounded-l-lg">
                    Title
                  </th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider rounded-r-lg text-right">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {recentTransmissions.length > 0 ? (
                  recentTransmissions.map((item, index) => (
                    <tr
                      key={item.id || index}
                      className="group hover:bg-gray-50/50 transition-colors"
                    >
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-3">
                          <span className="font-medium text-gray-700 line-clamp-1">
                            {item.title}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-5 text-sm text-gray-600">
                        {new Date(item.date).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-5">
                        <span className="inline-flex items-center px-3 py-1 rounded-full bg-slate-100 text-slate-600 text-xs font-medium">
                          <span className="w-1.5 h-1.5 rounded-full bg-slate-400 mr-2"></span>
                          {item.category}
                        </span>
                      </td>
                      <td className="px-6 py-5">
                        <span
                          className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold ${
                            item.status === "published"
                              ? "bg-emerald-50 text-emerald-600"
                              : "bg-amber-50 text-amber-600"
                          }`}
                        >
                          <span
                            className={`w-1.5 h-1.5 rounded-full mr-2 ${
                              item.status === "published"
                                ? "bg-emerald-500"
                                : "bg-amber-500"
                            }`}
                          ></span>
                          {item.status.charAt(0).toUpperCase() +
                            item.status.slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-5 text-right">
                        <ActionMenu
                          editUrl={item.editUrl}
                          onDelete={item.onDelete}
                        />
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={5}
                      className="px-6 py-10 text-center text-gray-400 italic"
                    >
                      No recent transmissions found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
