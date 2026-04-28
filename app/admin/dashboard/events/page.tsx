"use client";

import React, { useEffect, useState } from "react";
import { Plus, Search, MapPin, Calendar as CalendarIcon } from "lucide-react";
import ActionMenu from "@/components/admin/ActionMenu";
import Link from "next/link";
import { adminService } from "@/lib/services/admin.service";
import { events as EventType } from "@/types/event";
import Button from "@/components/ui/Button";

export default function EventListPage() {
  const [events, setEvents] = useState<EventType[]>([]);
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadEvents();
  }, []);

  const loadEvents = async () => {
    setIsLoading(true);
    const data = await adminService.getEvents();
    setEvents(data);
    setIsLoading(false);
  };

  const handleDelete = async (slug: string) => {
    if (confirm("Are you sure you want to delete this event?")) {
      await adminService.deleteEvent(slug);
      loadEvents();
    }
  };

  const filteredEvents = events.filter(event => 
    event.title.toLowerCase().includes(search.toLowerCase()) ||
    event.location.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black text-black font-outfit tracking-tight">Manage Events</h1>
          <p className="text-gray-500 mt-2 font-medium">Schedule and manage your organization's events.</p>
        </div>
        <Link href="/admin/dashboard/events/new">
          <Button variant="primary" className="bg-secondary text-white hover:bg-secondary/90 px-8 py-7 rounded-2xl font-bold shadow-2xl shadow-secondary/30 transition-all active:scale-95">
            + New Event
          </Button>
        </Link>
      </div>

      <div className="bg-[#F8F9FA] p-6 min-h-screen">
      <div className="max-w-7xl mx-auto bg-white rounded-xl border border-gray-100 shadow-sm">
        
        {/* Search Bar Section */}
        <div className="p-6 border-b border-gray-50">
          <div className="relative">
            <input
              type="text"
              placeholder="Search by title or location..."
              className="w-full pl-5 pr-12 py-3 bg-white border border-gray-200 rounded-xl text-gray-600 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-100 transition-all"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <Search className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          </div>
        </div>

        {/* Table Section */}
        <div className="overflow-x-auto min-h-[450px]">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50/50 text-[11px] font-bold text-gray-500 uppercase tracking-wider">
                <th className="px-6 py-4">Event</th>
                <th className="px-6 py-4">Tag/Slug</th>
                <th className="px-6 py-4">Time</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4">Location</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {isLoading ? (
                // Loading Skeleton
                Array(3).fill(0).map((_, i) => (
                  <tr key={i} className="animate-pulse">
                    <td colSpan={6} className="px-6 py-10 bg-gray-50/20" />
                  </tr>
                ))
              ) : filteredEvents.length > 0 ? (
                filteredEvents.map((event) => (
                  <tr key={event.slug} className="hover:bg-gray-50/50 transition-colors group">
                    {/* Event with Image */}
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-3">
                        <span className="font-semibold text-gray-700 text-sm">{event.title}</span>
                      </div>
                    </td>

                    {/* Tag/Slug Column */}
                    <td className="px-6 py-5">
                      <span className="text-gray-500 text-sm font-medium">
                        {event.slug}
                      </span>
                    </td>

                    {/* Time Column */}
                    <td className="px-6 py-5">
                      <span className="text-sm font-bold text-gray-700 uppercase">{event.time}</span>
                    </td>

                    {/* Date Column */}
                    <td className="px-6 py-5">
                      <span className="text-sm text-gray-600 font-medium">
                        {event.date}
                      </span>
                    </td>

                    {/* Location Column */}
                    <td className="px-6 py-5">
                      <div className="inline-flex items-center gap-2 bg-[#F1F3F5] px-3 py-1 rounded-full border border-gray-200/50">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#7B8A9E]" />
                        <span className="text-[11px] font-bold text-gray-600 uppercase tracking-widest">
                          {event.location}
                        </span>
                      </div>
                    </td>

                    {/* Actions Column */}
                    <td className="px-6 py-5 text-right">
                       <ActionMenu 
                          editUrl={`/admin/dashboard/events/${event.id ?? event.slug}/edit`}
                          onDelete={() => handleDelete(event.id ?? event.slug)}
                       />
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="px-6 py-20 text-center">
                    <div className="flex flex-col items-center text-gray-400">
                      <CalendarIcon size={40} strokeWidth={1.5} />
                      <p className="mt-2 text-sm font-medium">No events found</p>
                    </div>
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

