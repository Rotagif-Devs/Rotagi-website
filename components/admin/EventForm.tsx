"use client";

import React, { useState } from "react";
import { events as EventType } from "@/types/event";
import Button from "@/components/ui/Button";
import { Save, X, Calendar, MapPin, Clock, Image as ImageIcon, Link as LinkIcon, Upload } from "lucide-react";
import { adminService } from "@/lib/services/admin.service";

interface EventFormProps {
  initialData?: EventType;
  onSubmit: (data: EventType) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

export default function EventForm({ initialData, onSubmit, onCancel, isLoading }: EventFormProps) {
  const [formData, setFormData] = useState<EventType>(
    initialData || {
      slug: "",
      title: "",
      description: "",
      date: "",
      time: "",
      location: "",
      image: "",
      link: "",
    }
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert("Please upload a valid image file");
      return;
    }

    try {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({ ...prev, image: reader.result as string }));
      };
      reader.readAsDataURL(file);
    } catch (err) {
      console.error("Failed to read image", err);
      alert("Failed to process image");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Add schedule if not present, for compatibility with UI
    const finalData = {
      ...formData,
      schedule: [
        { content: formData.date, image: "/date.png" },
        { content: formData.time, image: "/clock.png" },
        { content: formData.location, image: "/location.png" },
      ]
    };
    onSubmit(finalData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left Column */}
        <div className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700">Event Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g. AI Futures Summit"
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-black/5 focus:border-black transition-all"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700">Slug</label>
            <input
              type="text"
              name="slug"
              value={formData.slug}
              onChange={handleChange}
              placeholder="ai-summit-2026"
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-black/5 focus:border-black transition-all"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Describe the event..."
              rows={5}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-black/5 focus:border-black transition-all resize-none"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700">External Link (Optional)</label>
            <div className="relative">
              <LinkIcon size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                name="link"
                value={formData.link || ""}
                onChange={handleChange}
                placeholder="https://registration-link.com"
                className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-black/5 focus:border-black transition-all"
              />
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700">Date</label>
            <div className="relative">
              <Calendar size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-black/5 focus:border-black transition-all appearance-none"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700">Time</label>
            <div className="relative">
              <Clock size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="time"
                name="time"
                value={formData.time}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-black/5 focus:border-black transition-all appearance-none"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700">Location</label>
            <div className="relative">
              <MapPin size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="Abuja, Nigeria"
                className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-black/5 focus:border-black transition-all"
                required
              />
            </div>
          </div>

          <div className="space-y-4">
            <label className="text-sm font-semibold text-gray-700">Event Image</label>
            <div className="space-y-4">
              {/* Clickable Image Preview */}
              <div 
                onClick={() => document.getElementById('event-image-upload')?.click()}
                className="relative aspect-video w-full rounded-2xl bg-gray-50 overflow-hidden border-2 border-dashed border-gray-100 flex items-center justify-center cursor-pointer transition-all hover:bg-gray-100 group shadow-inner"
              >
                {formData.image ? (
                  <div className="relative w-full h-full">
                    <img src={formData.image} alt="Preview" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center">
                      <ImageIcon className="text-white mb-1" size={24} />
                      <p className="text-white text-[10px] font-bold uppercase">Change Image</p>
                    </div>
                  </div>
                ) : (
                  <div className="text-center p-6">
                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
                      <Upload size={24} className="text-secondary" />
                    </div>
                    <p className="text-sm font-bold text-gray-900">Click to upload image</p>
                    <p className="text-xs text-gray-500 mt-1">PNG, JPG, or SVG up to 10MB</p>
                  </div>
                )}
              </div>

              {/* URL Input with Icon */}
              <div className="relative">
                <LinkIcon size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  name="image"
                  value={formData.image}
                  onChange={handleChange}
                  placeholder="...or paste image URL link"
                  className="w-full pl-11 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-secondary/5 focus:border-secondary transition-all text-xs font-medium"
                />
              </div>

              <input
                id="event-image-upload"
                type="file"
                className="hidden"
                accept="image/*"
                onChange={handleImageUpload}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-4 pt-8 border-t">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          className="px-8 border-gray-200 hover:bg-gray-50 bg-white text-black"
        >
          <X size={18} className="mr-2" />
          Cancel
        </Button>
        <Button
          type="submit"
          variant="primary"
          disabled={isLoading}
          className="px-8 bg-black hover:bg-gray-900"
        >
          <Save size={18} className="mr-2" />
          {isLoading ? "Saving..." : "Save Event"}
        </Button>
      </div>
    </form>
  );
}
