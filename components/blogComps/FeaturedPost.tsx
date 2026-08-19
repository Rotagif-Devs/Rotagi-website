import Image from "next/image";
import Link from "next/link";
import { MoveRight } from "lucide-react";
import { BlogPost } from "@/types/blog";
import { formatDate, estimateReadMinutes } from "./formatDate";

export default function FeaturedPost({ post }: { post: BlogPost }) {
  const authorName =
    typeof post.author === "object" && post.author?.name
      ? post.author.name
      : typeof post.author === "string"
        ? post.author
        : null;

  return (
    <section className="lg:px-8 px-4 max-w-7xl mx-auto mb-14">
      <Link
        href={`/blog/${post.slug}`}
        className="group grid grid-cols-1 lg:grid-cols-2 gap-0 rounded-3xl overflow-hidden border border-gray-100 bg-white shadow-sm hover:shadow-xl transition-shadow duration-300"
      >
        <div className="relative aspect-[16/10] lg:aspect-auto">
          <Image
            src={post.image?.startsWith("http") ? post.image : post.image || "/logo.png"}
            alt={post.title}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            priority
          />
        </div>

        <div className="flex flex-col justify-center p-8 md:p-12 gap-4">
          <div className="flex items-center gap-3">
            <span className="w-fit bg-[#FABFD3]/40 text-[#DB2777] text-[10px] md:text-[11px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
              {post.category}
            </span>
            <span className="text-xs font-bold text-secondary uppercase tracking-wider">Latest</span>
          </div>

          <h2 className="text-black font-cal-sans text-2xl md:text-3xl leading-tight">
            {post.title}
          </h2>

          <p className="text-gray-600 font-dm-sans text-sm md:text-base leading-relaxed line-clamp-3">
            {post.description}
          </p>

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

          <span className="mt-2 flex items-center gap-2 text-[#D62D88] font-semibold font-dm-sans group-hover:gap-4 transition-all">
            Read Story
            <MoveRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </span>
        </div>
      </Link>
    </section>
  );
}
