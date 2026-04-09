"use client";

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { BlogPost } from "@/types/blog";
import Button from "@/components/ui/Button";
import { Save, X, Image as ImageIcon, User, Tag } from "lucide-react";
import "react-quill-new/dist/quill.snow.css";

// Dynamic import for React Quill to avoid SSR issues
const ReactQuill = dynamic(() => import("react-quill-new"), {
  ssr: false,
  loading: () => <div className="h-64 bg-gray-100 animate-pulse rounded-lg" />,
});

interface BlogFormProps {
  initialData?: BlogPost;
  onSubmit: (data: BlogPost) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

export default function BlogForm({ initialData, onSubmit, onCancel, isLoading }: BlogFormProps) {
  const [formData, setFormData] = useState<BlogPost>(
    initialData || {
      id: "",
      slug: "",
      title: "",
      description: "",
      content: "",
      image: "",
      date: new Date().toISOString().split("T")[0],
      category: "News",
      author: { name: "", role: "", image: "" },
    }
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (name.startsWith("author.")) {
      const authorField = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        author: { ...prev.author, [authorField]: value },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleContentChange = (content: string) => {
    setFormData((prev) => ({ ...prev, content }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ["bold", "italic", "underline", "strike"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "image"],
      ["clean"],
    ],
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left Column: Basic Info */}
        <div className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700">Blog Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter post title"
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
              placeholder="how-to-start-ai"
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
              placeholder="Short excerpt for the card..."
              rows={3}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-black/5 focus:border-black transition-all resize-none"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">Category</label>
              <div className="relative">
                <Tag size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-black/5 focus:border-black transition-all appearance-none"
                >
                  <option value="Success Story">Success Story</option>
                  <option value="Resource">Resource</option>
                  <option value="Event">Event</option>
                  <option value="News">News</option>
                </select>
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">Date</label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-black/5 focus:border-black transition-all"
                required
              />
            </div>
          </div>
        </div>

        {/* Right Column: Meta & Author */}
        <div className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700">Cover Image URL</label>
            <div className="relative">
              <ImageIcon size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                name="image"
                value={formData.image}
                onChange={handleChange}
                placeholder="/blog/cover.jpg"
                className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-black/5 focus:border-black transition-all"
                required
              />
            </div>
          </div>

          <div className="bg-gray-50 p-6 rounded-2xl space-y-4">
            <h4 className="text-sm font-bold text-gray-900 border-b pb-2">Author Details</h4>
            <div className="space-y-3">
              <div className="relative">
                <User size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  name="author.name"
                  value={formData.author.name}
                  onChange={handleChange}
                  placeholder="Author Name"
                  className="w-full pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-black/5 focus:border-black transition-all"
                  required
                />
              </div>
              <input
                type="text"
                name="author.role"
                value={formData.author.role || ""}
                onChange={handleChange}
                placeholder="Author Role (e.g. Editor)"
                className="w-full px-4 py-2 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-black/5 focus:border-black transition-all"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Content Editor */}
      <div className="space-y-2">
        <label className="text-sm font-semibold text-gray-700">Article Content</label>
        <div className="bg-white rounded-xl overflow-hidden border border-gray-200">
          <ReactQuill
            value={formData.content}
            onChange={handleContentChange}
            modules={modules}
            className="h-96"
            theme="snow"
          />
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
          {isLoading ? "Saving..." : "Save Blog Post"}
        </Button>
      </div>
    </form>
  );
}
