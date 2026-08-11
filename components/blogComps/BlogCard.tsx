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
    <div className="group flex flex-col overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm hover:shadow-md transition-shadow duration-300 h-full">
      <div className="relative overflow-hidden aspect-[474/593]">
        <Image
          src={post.image?.startsWith("http") ? post.image : post.image ? post.image : "/logo.png"}
          alt={post.title}
          width={474}
          height={593}
          sizes="(max-width: 768px) 100vw, 400px"
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
      </div>

      <div className="flex flex-col p-6 gap-4 flex-1">
        <span className="w-fit bg-[#FABFD3]/40 text-[#DB2777] text-[10px] md:text-[11px] font-bold px-2 py-1 rounded uppercase tracking-wider">
          {post.category}
        </span>

        <h3 className="text-black font-cal-sans text-xl capitalize leading-8 line-clamp-2">
          {post.title}
        </h3>

        <p className="text-gray-600 font-dm-sans text-sm leading-relaxed line-clamp-2">
          {post.description}
        </p>

        <Link
          href={`/blog/${post.slug}`}
          className="mt-auto pt-4 flex items-center gap-4 text-[#D62D88] font-semibold font-dm-sans group-hover:gap-6 transition-all"
        >
          Read Story
          <MoveRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </div>
  );
}
