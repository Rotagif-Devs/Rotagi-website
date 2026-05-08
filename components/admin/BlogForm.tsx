"use client";

import React, { useState, useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import { BlogPost } from "@/types/blog";
import Button from "@/components/ui/Button";
import { Save, X, Tag, Upload, User, Link as LinkIcon } from "lucide-react";
import { adminService } from "@/lib/services/admin.service";
const ReactQuill = dynamic(() => import("react-quill"), {
  ssr: false,
}) as any;

interface BlogFormProps {
  initialData?: BlogPost;
  onSubmit: (data: BlogPost) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

export default function BlogForm({
  initialData,
  onSubmit,
  onCancel,
  isLoading,
}: BlogFormProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const [formData, setFormData] = useState<BlogPost>({
    id: initialData?.id || "",
    slug: initialData?.slug || "",
    title: initialData?.title || "",
    description: initialData?.description || "",
    content: initialData?.content || "",
    image: initialData?.image || "",
    date:
      initialData?.date ||
      new Date().toISOString().split("T")[0],
    category: initialData?.category || "News",
    status: initialData?.status || "draft",
    author: initialData?.author || {
      name: "",
      role: "",
      image: "",
    },
  });

  // ✅ Handle input changes safely
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;

    if (name.startsWith("author.")) {
      const field = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        author: {
          ...prev.author,
          [field]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleContentChange = (content: string) => {
    setFormData((prev) => ({ ...prev, content }));
  };

  // ✅ Image upload fix
  const handleImageUpload = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];

    if (!file || !formData.id) {
      if (!formData.id) {
        alert("Save blog first before uploading image.");
      }
      return;
    }

    try {
      const updatedPost =
        await adminService.uploadBlogImage(formData.id, file);
      setFormData(updatedPost);
      alert("Image uploaded successfully");
    } catch (err) {
      console.error(err);
      alert("Upload failed");
    }
  };

  const handleSave = (status: "draft" | "published") => {
    const updated = { ...formData, status };
    setFormData(updated);
    onSubmit(updated);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  // ✅ ReactQuill toolbar fix
  const modules = {
    toolbar: {
      container: [
        [{ header: [1, 2, 3, false] }],
        ["bold", "italic", "underline", "strike"],
        [{ list: "ordered" }, { list: "bullet" }],
        ["link", "image"],
        ["clean"],
      ],
      handlers: {
        image: () => {
          alert("Use the upload section above for images");
        },
      },
    },
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-8 bg-white p-8 rounded-2xl border shadow-sm"
    >
      {/* TITLE */}
      <input
        type="text"
        name="title"
        value={formData.title}
        onChange={handleChange}
        placeholder="Blog title"
        className="w-full p-3 border rounded-lg"
      />

      {/* SLUG */}
      <input
        type="text"
        name="slug"
        value={formData.slug}
        onChange={handleChange}
        placeholder="slug"
        className="w-full p-3 border rounded-lg"
      />

      {/* IMAGE */}
      <div
        onClick={() => fileInputRef.current?.click()}
        className="h-40 border-dashed border flex items-center justify-center cursor-pointer"
      >
        {formData.image ? (
          <img
            src={formData.image}
            className="w-full h-full object-cover"
          />
        ) : (
          <Upload />
        )}
      </div>

      <input
        ref={fileInputRef}
        type="file"
        className="hidden"
        onChange={handleImageUpload}
      />

      {/* AUTHOR */}
      <input
        type="text"
        name="author.name"
        value={formData.author?.name || ""}
        onChange={handleChange}
        placeholder="Author name"
        className="w-full p-3 border rounded-lg"
      />

      {/* ✅ FIXED REACT QUILL */}
      <div className="border rounded-lg overflow-hidden">
        {mounted && (
          <ReactQuill
            value={formData.content}
            onChange={handleContentChange}
            modules={modules}
            theme="snow"
            className="h-96 [&_.ql-container]:h-80 [&_.ql-editor]:min-h-[200px]"
          />
        )}
      </div>

      {/* BUTTONS */}
      <div className="flex gap-4">
        <Button type="button" onClick={onCancel}>
          <X className="mr-2" /> Cancel
        </Button>

        <Button
          type="button"
          onClick={() => handleSave("draft")}
        >
          <Save className="mr-2" /> Draft
        </Button>

        <Button
          type="button"
          onClick={() => handleSave("published")}
        >
          Publish
        </Button>
      </div>
    </form>
  );
}