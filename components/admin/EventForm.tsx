"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";
import { events as EventType } from "@/types/event";
import Button from "@/components/ui/Button";
import { Save, X, Calendar, MapPin, Clock, Image as ImageIcon, Link as LinkIcon, Upload, Code } from "lucide-react";
import { adminService } from "@/lib/services/admin.service";
import "react-quill-new/dist/quill.snow.css";

// Dynamic import for React Quill to avoid SSR issues — same pattern as BlogForm.
const ReactQuill = dynamic(() => import("react-quill-new"), {
  ssr: false,
  loading: () => <div className="h-64 bg-gray-100 animate-pulse rounded-lg" />,
});

const quillModules = {
  toolbar: [
    [{ header: [1, 2, 3, false] }],
    ["bold", "italic", "underline", "strike"],
    [{ list: "ordered" }, { list: "bullet" }],
    ["link", "image"],
    ["clean"],
  ],
};

interface EventFormProps {
  initialData?: EventType;
  onSubmit: (data: EventType, imageFile?: File | null) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

export default function EventForm({ initialData, onSubmit, onCancel, isLoading }: EventFormProps) {
  const [showHtmlSource, setShowHtmlSource] = useState(false);
  // A picked file is kept separate from formData.image (which stays a plain
  // URL) and uploaded via its own endpoint after the event is saved — see
  // handleImageUpload for why this can't just write into formData.image.
  const [pendingImageFile, setPendingImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");
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

  const handleDescriptionChange = (description: string) => {
    setFormData((prev) => ({ ...prev, description }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert("Please upload a valid image file");
      return;
    }

    // readAsDataURL here is only ever for this local <img> preview, never
    // sent to the server — the real file goes to onSubmit and gets
    // uploaded through its own endpoint once the event exists. Embedding
    // the data: URI itself into imageUrl/coverImageUrl (the old behavior)
    // was what ballooned every event to megabytes of base64 text.
    const reader = new FileReader();
    reader.onloadend = () => setImagePreview(reader.result as string);
    reader.readAsDataURL(file);
    setPendingImageFile(file);
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
    onSubmit(finalData, pendingImageFile);
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
            <div className="flex items-center justify-between">
              <label className="text-sm font-semibold text-gray-700">Description</label>
              <button
                type="button"
                onClick={() => setShowHtmlSource((prev) => !prev)}
                className="flex items-center gap-1.5 text-xs font-semibold text-gray-500 hover:text-black transition-colors"
              >
                <Code size={14} />
                {showHtmlSource ? "Back to Visual Editor" : "Paste HTML Source"}
              </button>
            </div>
            {showHtmlSource ? (
              <textarea
                value={formData.description}
                onChange={(e) => handleDescriptionChange(e.target.value)}
                placeholder="<p>Paste raw HTML here...</p>"
                rows={8}
                className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl font-mono text-xs focus:ring-2 focus:ring-black/5 focus:border-black transition-all resize-none"
                spellCheck={false}
              />
            ) : (
              <div className="event-content-editor bg-white rounded-xl border border-gray-200">
                <ReactQuill
                  value={formData.description}
                  onChange={handleDescriptionChange}
                  modules={quillModules}
                  className="h-64"
                  theme="snow"
                />
              </div>
            )}
          </div>

          <style jsx global>{`
            .event-content-editor .ql-toolbar.ql-snow {
              position: sticky;
              top: 5rem;
              z-index: 20;
              background: #fff;
              border-top-left-radius: 0.75rem;
              border-top-right-radius: 0.75rem;
            }
            .event-content-editor .ql-container.ql-snow {
              border-bottom-left-radius: 0.75rem;
              border-bottom-right-radius: 0.75rem;
              overflow: hidden;
            }
          `}</style>

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
                {imagePreview || formData.image ? (
                  <div className="relative w-full h-full">
                    <img src={imagePreview || formData.image} alt="Preview" className="w-full h-full object-cover" />
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
                    <p className="text-xs text-gray-500 mt-1">PNG, JPG (Recommended: 1920x1080px, 16:9) up to 10MB</p>
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
                  onChange={(e) => {
                    // Typing a URL means "use this instead of the picked
                    // file" — clear the pending upload so it doesn't win.
                    setPendingImageFile(null);
                    setImagePreview("");
                    handleChange(e);
                  }}
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
