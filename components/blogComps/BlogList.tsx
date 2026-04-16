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
    <section className="py-20 px-6 md:px-15">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-[#121212] mb-12">
          Latest Articles
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
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
      </div>
    </section>
  );
}
