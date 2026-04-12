"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { adminService } from "@/lib/services/admin.service";
import BlogForm from "@/components/admin/BlogForm";
import { BlogPost } from "@/types/blog";
import { ChevronLeft, Loader2 } from "lucide-react";
import Link from "next/link";

export default function EditBlogPage() {
  const router = useRouter();
  const { id } = useParams();
  const [blog, setBlog] = useState<BlogPost | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const fetchBlog = async () => {
      const data = await adminService.getBlogById(id as string);
      if (data) {
        setBlog(data);
      } else {
        alert("Blog post not found");
        router.push("/admin/dashboard/blog");
      }
      setIsLoading(false);
    };
    fetchBlog();
  }, [id, router]);

  const handleSubmit = async (data: BlogPost) => {
    setIsSaving(true);
    try {
      await adminService.saveBlog(data);
      router.push("/admin/dashboard/blog");
    } catch (error) {
      console.error("Failed to update blog:", error);
      alert("Error updating blog post");
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
          href="/admin/dashboard/blog" 
          className="inline-flex items-center text-sm text-gray-500 hover:text-black transition-colors mb-4"
        >
          <ChevronLeft size={16} className="mr-1" />
          Back to Blogs
        </Link>
        <h1 className="text-3xl font-cal-sans text-black">Edit Blog Post</h1>
        <p className="text-gray-500 mt-1">Update the details of your blog article.</p>
      </div>

      {blog && (
        <BlogForm 
          initialData={blog} 
          onSubmit={handleSubmit} 
          onCancel={() => router.push("/admin/dashboard/blog")}
          isLoading={isSaving}
        />
      )}
    </div>
  );
}
