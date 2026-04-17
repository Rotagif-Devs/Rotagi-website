"use client";

import React, { useEffect, useState } from "react";
import { Plus, Search, FileText } from "lucide-react";
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
          <Button variant="primary" className="bg-secondary text-white hover:bg-secondary/90 px-8 py-7 rounded-xl font-bold shadow-xl shadow-secondary/20 transition-all active:scale-95">
            + New Post
          </Button>
        </Link>
      </div>

      <div className="bg-white rounded-[3rem] border border-gray-50 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.03)] overflow-hidden">
        <div className="p-10 border-b border-gray-50 flex items-center gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-300 font-bold" size={24} />
            <input 
              type="text" 
              placeholder="Search by title or category..."
              className="w-full pl-14 pr-8 py-5 bg-gray-50/50 border border-gray-100 rounded-[2rem] focus:ring-8 focus:ring-secondary/5 focus:border-secondary/20 focus:bg-white transition-all font-medium text-gray-700 outline-none text-lg"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-gray-50 text-[11px] font-black text-gray-400 uppercase tracking-[0.15em]">
                <th className="px-8 py-6">POST DETAILS</th>
                <th className="px-8 py-6">CATEGORY</th>
                <th className="px-8 py-6">AUTHOR</th>
                <th className="px-8 py-6">DATE</th>
                <th className="px-8 py-6 text-right">ACTIONS</th>
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
                  <tr key={blog.id} className="hover:bg-gray-50/50 transition-colors group text-sm font-medium text-gray-700">
                    <td className="px-10 py-8">
                      <div className="flex items-center gap-5">
                        <div className="w-12 h-12 rounded-full bg-gray-100 flex-shrink-0 overflow-hidden border-4 border-white shadow-xl shadow-black/5 group-hover:scale-110 transition-transform">
                          <img src={blog.image} alt="" className="w-full h-full object-cover" />
                        </div>
                        <p className="font-bold text-gray-900 tracking-tight text-[15px]">{blog.title}</p>
                      </div>
                    </td>
                    <td className="px-10 py-8">
                      <div className="flex items-center gap-2 bg-gray-100/50 w-fit px-4 py-1.5 rounded-full border border-gray-200/50">
                        <div className="w-1.5 h-1.5 rounded-full bg-gray-400" />
                        <span className="text-[11px] font-black text-gray-500 uppercase tracking-widest">{blog.category}</span>
                      </div>
                    </td>
                    <td className="px-10 py-8">
                      <p className="font-bold text-black text-xs uppercase">{blog.author.name}</p>
                      <p className="text-[10px] text-gray-400 uppercase mt-0.5 tracking-tighter">{blog.author.role}</p>
                    </td>
                    <td className="px-10 py-8 text-sm font-semibold text-gray-500 font-outfit uppercase">
                      {new Date(blog.date).toLocaleDateString('en-GB')}
                    </td>
                    <td className="px-10 py-8 text-right">
                       <ActionMenu 
                          editUrl={`/admin/dashboard/blog/${blog.id}/edit`}
                          onDelete={() => handleDelete(blog.id)}
                       />
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
