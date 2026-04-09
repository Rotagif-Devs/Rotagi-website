"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { adminService } from "@/lib/services/admin.service";
import BlogForm from "@/components/admin/BlogForm";
import { BlogPost } from "@/types/blog";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";

export default function NewBlogPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (data: BlogPost) => {
    setIsLoading(true);
    try {
      await adminService.saveBlog(data);
      router.push("/admin/dashboard/blog");
    } catch (error) {
      console.error("Failed to save blog:", error);
      alert("Error saving blog post");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <Link 
          href="/admin/dashboard/blog" 
          className="inline-flex items-center text-sm text-gray-500 hover:text-black transition-colors mb-4"
        >
          <ChevronLeft size={16} className="mr-1" />
          Back to Blogs
        </Link>
        <h1 className="text-3xl font-cal-sans text-black">Create New Blog Post</h1>
        <p className="text-gray-500 mt-1">Fill in the details below to publish a new article.</p>
      </div>

      <BlogForm 
        onSubmit={handleSubmit} 
        onCancel={() => router.push("/admin/dashboard/blog")}
        isLoading={isLoading}
      />
    </div>
  );
}
