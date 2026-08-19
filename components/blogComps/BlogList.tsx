"use client";
import React, { useMemo, useState } from "react";
import { Search } from "lucide-react";
import BlogCard from "./BlogCard";
import { BlogPost } from "@/types/blog";
import { motion } from "framer-motion";

interface Props {
  posts: BlogPost[];
}

export default function BlogList({ posts }: Props) {
  const categories = useMemo(() => {
    const set = new Set(posts.map((p) => p.category).filter(Boolean));
    return ["All", ...Array.from(set)];
  }, [posts]);

  const [activeCategory, setActiveCategory] = useState("All");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return posts.filter((post) => {
      const matchesCategory = activeCategory === "All" || post.category === activeCategory;
      const matchesQuery =
        !q ||
        post.title?.toLowerCase().includes(q) ||
        post.description?.toLowerCase().includes(q);
      return matchesCategory && matchesQuery;
    });
  }, [posts, activeCategory, query]);

  return (
    <section className="lg:px-8 pb-10 pt-0 px-4 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 py-6">
        <h4 className="font-cal-sans text-3xl md:text-4xl text-black">All Articles</h4>

        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search articles..."
            className="w-full pl-10 pr-4 py-2.5 rounded-full border border-gray-200 text-sm outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/10 transition-all bg-gray-50 focus:bg-white"
          />
        </div>
      </div>

      {categories.length > 1 && (
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 rounded-full text-xs md:text-sm font-semibold transition-colors ${
                activeCategory === category
                  ? "bg-secondary text-white"
                  : "bg-gray-50 text-gray-600 hover:bg-gray-100"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      )}

      {filtered.length === 0 ? (
        <div className="bg-white p-12 rounded-3xl text-center shadow-sm border border-pink-50">
          <p className="text-gray-500">No articles match your search.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((post, index) => (
            <motion.div
              key={post.id || index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              viewport={{ once: true }}
            >
              <BlogCard post={post} />
            </motion.div>
          ))}
        </div>
      )}
    </section>
  );
}
