"use client";

import React, { useEffect, useState } from "react";
import { Plus, Search, FileText, MoreHorizontal } from "lucide-react";
import ActionMenu from "@/components/admin/ActionMenu";
import Link from "next/link";
import { adminService } from "@/lib/services/admin.service";
import { BlogPost } from "@/types/blog";
import Button from "@/components/ui/Button";

export default function BlogListPage() {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadBlogs();
  }, []);

  const loadBlogs = async () => {
    setIsLoading(true);
    const data = await adminService.getBlogs();
    setBlogs(data);
    setIsLoading(false);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this blog post?")) {
      await adminService.deleteBlog(id);
      loadBlogs();
    }
  };

  const filteredBlogs = blogs.filter(blog => 
    blog.title.toLowerCase().includes(search.toLowerCase()) ||
    blog.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black text-black font-outfit tracking-tight">Manage Blogs</h1>
          <p className="text-gray-500 mt-2 font-medium">Create, edit, and manage your blog articles.</p>
        </div>
        <Link href="/admin/dashboard/blog/new">
          <Button variant="primary" className="bg-secondary text-white hover:bg-secondary/90 px-8  rounded-xl font-bold shadow-xl shadow-secondary/20 transition-all active:scale-95">
            + New Post
          </Button>
        </Link>
      </div>
<div className="bg-[#F8F9FA] p-6 min-h-screen">
      <div className="max-w-7xl mx-auto bg-white rounded-xl border border-gray-100 shadow-sm">
        
        {/* Search Bar Section */}
        <div className="p-6 border-b border-gray-50">
          <div className="relative">
            <input
              type="text"
              placeholder="Search by title or category..."
              className="w-full pl-5 pr-12 py-3 bg-white border border-gray-200 rounded-xl text-gray-600 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-100 transition-all"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <Search className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          </div>
        </div>

        {/* Table Section */}
        <div className="overflow-x-auto min-h-[450px]">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50/50 text-[11px] font-bold text-gray-500 uppercase tracking-wider">
                <th className="px-6 py-4">Title</th>
                <th className="px-6 py-4">Tag</th>
                <th className="px-6 py-4">Author</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4">Category</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {isLoading ? (
                // Loading Skeleton
                Array(3).fill(0).map((_, i) => (
                  <tr key={i} className="animate-pulse">
                    <td colSpan={6} className="px-6 py-10 bg-gray-50/20" />
                  </tr>
                ))
              ) : filteredBlogs.length > 0 ? (
                filteredBlogs.map((blog) => (
                  <tr key={blog.id} className="hover:bg-gray-50/50 transition-colors group">
                    {/* Title with Thumbnail */}
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg overflow-hidden flex-shrink-0 bg-gray-100 border border-gray-200">
                          <img src={blog.image} alt={blog.title} className="w-full h-full object-cover" />
                        </div>
                        <span className="font-semibold text-gray-700 text-sm">{blog.title}</span>
                      </div>
                    </td>

                    {/* Tag Column */}
                    <td className="px-6 py-5">
                      <span className="text-gray-500 text-sm font-medium">
                        {blog.slug || `/how-ai-changed...`}
                      </span>
                    </td>

                    {/* Author Column */}
                    <td className="px-6 py-5">
                      <div className="flex flex-col">
                        <span className="text-sm font-bold text-gray-700">{blog.author.name}</span>
                        <span className="text-[11px] text-gray-400">{blog.author.role}</span>
                      </div>
                    </td>

                    {/* Date Column */}
                    <td className="px-6 py-5">
                      <span className="text-sm text-gray-600 font-medium">
                        {new Date(blog.date).toLocaleDateString('en-GB')}
                      </span>
                    </td>

                    {/* Category Column */}
                    <td className="px-6 py-5">
                      <div className="inline-flex items-center gap-2 bg-[#F1F3F5] px-3 py-1 rounded-full border border-gray-200/50">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#7B8A9E]" />
                        <span className="text-[11px] font-bold text-gray-600">
                          {blog.category}
                        </span>
                      </div>
                    </td>

                    {/* Actions Column */}
                    <td className="px-6 py-5 text-right">
                       <ActionMenu 
                          editUrl={`/admin/dashboard/blog/${blog.id}/edit`}
                          onDelete={() => handleDelete(blog.id)}
                       />
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="px-6 py-20 text-center">
                    <div className="flex flex-col items-center text-gray-400">
                      <FileText size={40} strokeWidth={1.5} />
                      <p className="mt-2 text-sm font-medium">No posts found</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
    </div>
  );
}
