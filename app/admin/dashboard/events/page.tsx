"use client";

import React, { useEffect, useState } from "react";
import { Plus, Edit2, Trash2, Search, MapPin, Calendar as CalendarIcon } from "lucide-react";
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
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-cal-sans text-black">Manage Events</h1>
          <p className="text-gray-500 mt-1">Schedule and manage your organization's events.</p>
        </div>
        <Link href="/admin/dashboard/events/new">
          <Button variant="primary" className="bg-black hover:bg-gray-900 px-6 py-6 rounded-xl">
            <Plus size={20} className="mr-2" />
            New Event
          </Button>
        </Link>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-100 bg-gray-50/50">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="Search by title or location..."
              className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-black/5 focus:border-black transition-all"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50 text-gray-500 text-sm uppercase tracking-wider">
                <th className="px-6 py-4 font-semibold">Event</th>
                <th className="px-6 py-4 font-semibold">Date & Time</th>
                <th className="px-6 py-4 font-semibold">Location</th>
                <th className="px-6 py-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {isLoading ? (
                Array(3).fill(0).map((_, i) => (
                  <tr key={i} className="animate-pulse">
                    <td className="px-6 py-8"><div className="h-4 bg-gray-100 rounded w-48"></div></td>
                    <td className="px-6 py-8"><div className="h-4 bg-gray-100 rounded w-32"></div></td>
                    <td className="px-6 py-8"><div className="h-4 bg-gray-100 rounded w-24"></div></td>
                    <td className="px-6 py-8"></td>
                  </tr>
                ))
              ) : filteredEvents.length > 0 ? (
                filteredEvents.map((event) => (
                  <tr key={event.slug} className="hover:bg-gray-50/50 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-lg bg-gray-100 flex-shrink-0 overflow-hidden">
                          <img src={event.image} alt="" className="w-full h-full object-cover" />
                        </div>
                        <div>
                          <p className="font-semibold text-black leading-snug">{event.title}</p>
                          <p className="text-xs text-gray-400 mt-0.5">/{event.slug}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 text-sm text-gray-700">
                        <CalendarIcon size={14} className="text-gray-400" />
                        <span>{event.date}</span>
                      </div>
                      <p className="text-xs text-gray-500 ml-5 mt-0.5">{event.time}</p>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 text-sm text-gray-700">
                        <MapPin size={14} className="text-gray-400" />
                        <span>{event.location}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link 
                          href={`/admin/dashboard/events/${event.slug}/edit`}
                          className="p-2 text-gray-400 hover:text-black transition-colors"
                          title="Edit"
                        >
                          <Edit2 size={18} />
                        </Link>
                        <button 
                          onClick={() => handleDelete(event.slug)}
                          className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                          title="Delete"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="px-6 py-20 text-center">
                    <div className="max-w-xs mx-auto space-y-3">
                      <CalendarIcon className="mx-auto text-gray-200" size={48} />
                      <p className="text-gray-500 font-medium">No events found.</p>
                      <Link href="/admin/dashboard/events/new">
                        <Button variant="outline" className="mt-4 border-gray-200 bg-white">
                          Create your first event
                        </Button>
                      </Link>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
