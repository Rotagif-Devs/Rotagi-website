"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { MoveRight } from "lucide-react";
import { BlogPost } from "@/types/blog";
import { formatDate, estimateReadMinutes } from "./formatDate";

interface Props {
  post: BlogPost;
}

export default function BlogCard({ post }: Props) {
  const authorName =
    typeof post.author === "object" && post.author?.name
      ? post.author.name
      : typeof post.author === "string"
        ? post.author
        : null;

  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 h-full"
    >
      <div className="relative overflow-hidden aspect-[16/10]">
        <Image
          src={post.image?.startsWith("http") ? post.image : post.image ? post.image : "/logo.png"}
          alt={post.title}
          width={640}
          height={400}
          sizes="(max-width: 768px) 100vw, 400px"
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <span className="absolute top-4 left-4 bg-white/95 backdrop-blur text-[#DB2777] text-[10px] md:text-[11px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider shadow-sm">
          {post.category}
        </span>
      </div>

      <div className="flex flex-col p-6 gap-3 flex-1">
        {(authorName || post.date) && (
          <div className="flex items-center gap-2 text-xs text-gray-400 font-dm-sans">
            {authorName && <span className="font-semibold text-gray-500">{authorName}</span>}
            {authorName && post.date && <span>&middot;</span>}
            {post.date && <span>{formatDate(post.date)}</span>}
            {post.content && (
              <>
                <span>&middot;</span>
                <span>{estimateReadMinutes(post.content)} min read</span>
              </>
            )}
          </div>
        )}

        <h3 className="text-black font-cal-sans text-xl capitalize leading-8 line-clamp-2">
          {post.title}
        </h3>

        <p className="text-gray-600 font-dm-sans text-sm leading-relaxed line-clamp-2">
          {post.description}
        </p>

        <span className="mt-auto pt-4 flex items-center gap-2 text-[#D62D88] font-semibold font-dm-sans group-hover:gap-4 transition-all">
          Read Story
          <MoveRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </span>
      </div>
    </Link>
  );
}
