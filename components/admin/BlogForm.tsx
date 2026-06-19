"use client";

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { BlogPost } from "@/types/blog";
import Button from "@/components/ui/Button";
import { Save, X, Image as ImageIcon, User, Tag, Upload, Link as LinkIcon } from "lucide-react";
import { adminService } from "@/lib/services/admin.service";
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
      status: "draft",
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

  const handleSave = (status: "draft" | "published") => {
    const updatedData = { ...formData, status };
    setFormData(updatedData);
    onSubmit(updatedData);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Default to current status if triggered by Enter key
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
    <form onSubmit={handleSubmit} className="space-y-8 bg-white p-8 rounded-2xl border border-gray-100 shadow-sm relative overflow-hidden">
      {/* Status indicator pill overlay */}
      <div className={`absolute top-0 right-0 px-6 py-2 text-[10px] font-black uppercase tracking-[0.2em] rounded-bl-2xl ${
        formData.status === 'published' ? 'bg-green-100 text-green-600' : 'bg-amber-100 text-amber-600'
      }`}>
        {formData.status}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
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
          <div className="space-y-4">
            <label className="text-sm font-semibold text-gray-700">Cover Image</label>
            <div className="space-y-4">
              {/* Clickable Image Preview */}
              <div 
                onClick={() => document.getElementById('blog-image-upload')?.click()}
                className="relative aspect-video w-full rounded-2xl bg-gray-50 overflow-hidden border-2 border-dashed border-gray-100 flex items-center justify-center cursor-pointer transition-all hover:bg-gray-100 group shadow-inner"
              >
                {formData.image ? (
                  <img src={formData.image} alt="Preview" className="w-full h-full object-cover" />
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
                id="blog-image-upload"
                type="file"
                className="hidden"
                accept="image/*"
                onChange={handleImageUpload}
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

      <div className="flex flex-col md:flex-row justify-end gap-4 pt-8 border-t">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          className="px-8 border-gray-200 hover:bg-gray-50 bg-white text-black order-3 md:order-1"
        >
          <X size={18} className="mr-2" />
          Cancel
        </Button>
        
        <div className="flex gap-4 order-1 md:order-2 grow md:grow-0">
          <Button
            type="button"
            variant="outline"
            disabled={isLoading}
            onClick={() => handleSave("draft")}
            className={`flex-1 md:flex-none px-6 border-amber-200 text-amber-700 hover:bg-amber-50 bg-white ${formData.status === 'draft' ? 'ring-2 ring-amber-500/20' : ''}`}
          >
            <Save size={18} className="mr-2" />
            {formData.status === 'published' ? 'Revert to Draft' : 'Save as Draft'}
          </Button>
          
          <Button
            type="button"
            variant="primary"
            disabled={isLoading}
            onClick={() => handleSave("published")}
            className="flex-1 md:flex-none px-10 bg-secondary text-white hover:bg-secondary/90 shadow-xl shadow-secondary/20"
          >
            {formData.status === 'published' ? "Update Post" : "Publish Now"}
          </Button>
        </div>
      </div>
    </form>
  );
}
