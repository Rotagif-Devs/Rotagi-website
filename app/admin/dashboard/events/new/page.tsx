"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { adminService } from "@/lib/services/admin.service";
import EventForm from "@/components/admin/EventForm";
import { events as EventType } from "@/types/event";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";

export default function NewEventPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (data: EventType) => {
    setIsLoading(true);
    try {
      await adminService.saveEvent(data);
      router.push("/admin/dashboard/events");
    } catch (error) {
      console.error("Failed to save event:", error);
      alert("Error saving event");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <Link 
          href="/admin/dashboard/events" 
          className="inline-flex items-center text-sm text-gray-500 hover:text-black transition-colors mb-4"
        >
          <ChevronLeft size={16} className="mr-1" />
          Back to Events
        </Link>
        <h1 className="text-3xl font-cal-sans text-black">Create New Event</h1>
        <p className="text-gray-500 mt-1">Fill in the details below to schedule a new event.</p>
      </div>

      <EventForm 
        onSubmit={handleSubmit} 
        onCancel={() => router.push("/admin/dashboard/events")}
        isLoading={isLoading}
      />
    </div>
  );
}
