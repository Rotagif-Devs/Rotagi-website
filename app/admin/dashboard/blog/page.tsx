"use client";

import React, { useEffect, useState } from "react";
import { Plus, Edit2, Trash2, Search, ExternalLink, FileText } from "lucide-react";
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
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-cal-sans text-black">Manage Blogs</h1>
          <p className="text-gray-500 mt-1">Create, edit, and manage your blog articles.</p>
        </div>
        <Link href="/admin/dashboard/blog/new">
          <Button variant="primary" className="bg-black hover:bg-gray-900 px-6 py-6 rounded-xl">
            <Plus size={20} className="mr-2" />
            New Post
          </Button>
        </Link>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-100 bg-gray-50/50 flex items-center gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="Search by title or category..."
              className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-black/5 focus:border-black transition-all"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50 text-gray-500 text-sm uppercase tracking-wider">
                <th className="px-6 py-4 font-semibold">Post Details</th>
                <th className="px-6 py-4 font-semibold">Category</th>
                <th className="px-6 py-4 font-semibold">Author</th>
                <th className="px-6 py-4 font-semibold">Date</th>
                <th className="px-6 py-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {isLoading ? (
                Array(3).fill(0).map((_, i) => (
                  <tr key={i} className="animate-pulse">
                    <td className="px-6 py-8"><div className="h-4 bg-gray-100 rounded w-48"></div></td>
                    <td className="px-6 py-8"><div className="h-4 bg-gray-100 rounded w-24"></div></td>
                    <td className="px-6 py-8"><div className="h-4 bg-gray-100 rounded w-32"></div></td>
                    <td className="px-6 py-8"><div className="h-4 bg-gray-100 rounded w-20"></div></td>
                    <td className="px-6 py-8"></td>
                  </tr>
                ))
              ) : filteredBlogs.length > 0 ? (
                filteredBlogs.map((blog) => (
                  <tr key={blog.id} className="hover:bg-gray-50/50 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-lg bg-gray-100 flex-shrink-0 overflow-hidden">
                          <img src={blog.image} alt="" className="w-full h-full object-cover" />
                        </div>
                        <div>
                          <p className="font-semibold text-black leading-snug">{blog.title}</p>
                          <p className="text-xs text-gray-400 mt-0.5">/{blog.slug}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                        {blog.category}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm font-medium">{blog.author.name}</p>
                      <p className="text-xs text-gray-500">{blog.author.role}</p>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {new Date(blog.date).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link 
                          href={`/blog/${blog.slug}`} 
                          target="_blank"
                          className="p-2 text-gray-400 hover:text-blue-600 transition-colors"
                          title="View Live"
                        >
                          <ExternalLink size={18} />
                        </Link>
                        <Link 
                          href={`/admin/dashboard/blog/${blog.id}/edit`}
                          className="p-2 text-gray-400 hover:text-black transition-colors"
                          title="Edit"
                        >
                          <Edit2 size={18} />
                        </Link>
                        <button 
                          onClick={() => handleDelete(blog.id)}
                          className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                          title="Delete"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="px-6 py-20 text-center">
                    <div className="max-w-xs mx-auto space-y-3">
                      <FileText className="mx-auto text-gray-200" size={48} />
                      <p className="text-gray-500 font-medium">No blog posts found.</p>
                      <Link href="/admin/dashboard/blog/new">
                        <Button variant="outline" className="mt-4 border-gray-200 bg-white">
                          Create your first post
                        </Button>
                      </Link>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
