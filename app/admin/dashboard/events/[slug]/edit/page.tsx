"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { adminService } from "@/lib/services/admin.service";
import EventForm from "@/components/admin/EventForm";
import { events as EventType } from "@/types/event";
import { ChevronLeft, Loader2 } from "lucide-react";
import Link from "next/link";

export default function EditEventPage() {
  const router = useRouter();
  const { slug } = useParams();
  const [event, setEvent] = useState<EventType | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const fetchEvent = async () => {
      const data = await adminService.getEventBySlug(slug as string);
      if (data) {
        setEvent(data);
      } else {
        alert("Event not found");
        router.push("/admin/dashboard/events");
      }
      setIsLoading(false);
    };
    fetchEvent();
  }, [slug, router]);

  const handleSubmit = async (data: EventType) => {
    setIsSaving(true);
    try {
      await adminService.saveEvent(data);
      router.push("/admin/dashboard/events");
    } catch (error) {
      console.error("Failed to update event:", error);
      alert("Error updating event");
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-[400px] flex items-center justify-center">
        <Loader2 className="animate-spin text-gray-400" size={40} />
      </div>
    );
  }

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
        <h1 className="text-3xl font-cal-sans text-black">Edit Event</h1>
        <p className="text-gray-500 mt-1">Update the schedule or details of your event.</p>
      </div>

      {event && (
        <EventForm 
          initialData={event} 
          onSubmit={handleSubmit} 
          onCancel={() => router.push("/admin/dashboard/events")}
          isLoading={isSaving}
        />
      )}
    </div>
  );
}
