"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { MoveRight } from "lucide-react";
import { BlogPost } from "@/types/blog";

interface Props {
  post: BlogPost;
}

export default function BlogCard({ post }: Props) {
  return (
    <div className="bg-white rounded-2xl p-4 overflow-hidden duration-300 flex flex-col h-full border border-[#FABFD3]/30">
      <div className="relative h-64 w-full mb-6">
        <Image
          src={post.image}
          alt={post.title}
          fill
          className="object-cover rounded-sm"
        />
      </div>
      
      <div className=" flex flex-col flex-grow">
        <div className="mb-3">
          <span className="bg-[#FABFD3]/40 text-[#DB2777] text-[10px] md:text-[11px] font-bold px-2 py-1 rounded uppercase tracking-wider">
            {post.category}
          </span>
        </div>
        
        <h3 className="text-[#121212] mb-3">
          {post.title}
        </h3>
        
        <p className="text-[#4B5563] mb-6 flex-grow">
          {post.description}
        </p>
        
        <Link 
          href={`/blog/${post.slug}`} 
          className="flex items-center gap-2 text-[#DB2777] font-semibold text-sm group"
        >
          Read Story 
          <MoveRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </div>
  );
}
