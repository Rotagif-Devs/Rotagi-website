"use client";

import React, { useEffect, useState } from "react";
import { FileText, Calendar, Users, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { adminService } from "@/lib/services/admin.service";

export default function AdminDashboardPage() {
  const [stats, setStats] = useState({
    blogs: 0,
    events: 0,
    users: 0,
  });

  useEffect(() => {
    const loadStats = async () => {
      const blogs = await adminService.getBlogs();
      const events = await adminService.getEvents();
      setStats({
        blogs: blogs.length,
        events: events.length,
        users: 1, // Mock
      });
    };
    loadStats();
  }, []);

  const cards = [
    { name: "Total Blogs", value: stats.blogs, icon: FileText, color: "bg-blue-500", href: "/admin/dashboard/blog" },
    { name: "Upcoming Events", value: stats.events, icon: Calendar, color: "bg-purple-500", href: "/admin/dashboard/events" },
    { name: "Team Members", value: stats.users, icon: Users, color: "bg-green-500", href: "#" },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-cal-sans text-black">Dashboard Overview</h1>
        <p className="text-gray-500 mt-1">Welcome back! Here's what's happening with your content.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {cards.map((card) => (
          <div key={card.name} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow group">
            <div className="flex items-start justify-between">
              <div className={`p-3 rounded-xl ${card.color} text-white`}>
                <card.icon size={24} />
              </div>
              <Link href={card.href} className="text-gray-400 hover:text-black transition-colors">
                <ArrowUpRight size={20} />
              </Link>
            </div>
            <div className="mt-4">
              <h3 className="text-gray-500 text-sm font-medium">{card.name}</h3>
              <p className="text-3xl font-bold text-black mt-1">{card.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h2 className="text-xl font-cal-sans mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 gap-4">
            <Link 
              href="/admin/dashboard/blog/new" 
              className="p-4 bg-gray-50 rounded-xl hover:bg-black hover:text-white transition-all text-center"
            >
              <FileText className="mx-auto mb-2" />
              <span>New Blog Post</span>
            </Link>
            <Link 
              href="/admin/dashboard/events/new" 
              className="p-4 bg-gray-50 rounded-xl hover:bg-black hover:text-white transition-all text-center"
            >
              <Calendar className="mx-auto mb-2" />
              <span>New Event</span>
            </Link>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h2 className="text-xl font-cal-sans mb-4">System Status</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
              <span className="text-green-700 font-medium">API Connectivity</span>
              <span className="bg-green-500 w-2 h-2 rounded-full"></span>
            </div>
            <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
              <span className="text-blue-700 font-medium">Content Delivery</span>
              <span className="bg-blue-500 w-2 h-2 rounded-full"></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
