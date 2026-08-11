"use client";
import React from "react";
import BlogCard from "./BlogCard";
import { BlogPost } from "@/types/blog";
import { motion } from "framer-motion";

interface Props {
  posts: BlogPost[];
}

export default function BlogList({ posts }: Props) {
  return (
    <section className="lg:px-8 pb-10 pt-0 px-4 max-w-7xl mx-auto">
      <h4 className="py-6 font-cal-sans text-3xl md:text-4xl text-black">Latest Articles</h4>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post, index) => (
          <motion.div
            key={post.id || index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
          >
            <BlogCard post={post} />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
