import { publicService } from "@/lib/services/public.service";
import { notFound } from "next/navigation";
import Link from "next/link";
import PTA from "@/components/globalComp/PTA";
import Image from "next/image";
import { MoveLeft, Calendar, User, Clock } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  console.log(`[BlogPostPage] Rendering for slug: ${slug}`);
  const post = await publicService.getBlogPostBySlug(slug);

  if (!post) {
    console.error(`[BlogPostPage] Post not found or invalid for slug: ${slug}`);
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#FDF2F8] font-dm-sans">
      {/* Editorial Header Section */}
      <section className="pt-24 lg:pt-32 pb-16 px-6 md:px-15 max-w-[1260px] mx-auto">
        {/* Back Link */}
        <div className="mb-12">
          <Link
            href="/blog"
            className="flex items-center gap-2 text-[#DB2777] font-semibold text-sm group w-fit"
          >
            <MoveLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            Back to Articles
          </Link>
        </div>

        {/* Category Tag */}
        <div className="mb-8">
          <span className="bg-[#FABFD3]/40 text-[#DB2777] text-[10px] md:text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-widest bg-white shadow-sm border border-pink-100">
            {post.category || "Inspiration"}
          </span>
        </div>

        <h1 className="text-4xl md:text-6xl lg:text-7xl font-normal text-[#1A1A1A] mb-8 font-cal-sans leading-[1.1] tracking-tight max-w-5xl">
          {post.title || "Untitled Post"}
        </h1>

        <div className="flex flex-wrap items-center gap-6 text-gray-500 text-sm md:text-base border-b border-pink-100 pb-10">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-pink-100 flex items-center justify-center text-pink-600">
              <User size={18} />
            </div>
            <span className="font-medium text-[#1A1A1A] uppercase tracking-wider text-[11px] md:text-sm">
              {post.author?.name || "ROTAGIF Team"}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar size={16} className="text-pink-400" />
            <span className="text-[11px] md:text-sm">{post.date || "March 15, 2026"}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock size={16} className="text-pink-400" />
            <span className="text-[11px] md:text-sm">6 min read</span>
          </div>
        </div>
      </section>

      {/* Hero Banner Image */}
      <section className="max-w-[1260px] mx-auto px-5 md:px-10 mb-20 md:mb-32">
        <div className="relative aspect-[16/9] md:aspect-[21/9] rounded-[40px] md:rounded-[60px] overflow-hidden border-[12px] border-white shadow-[0_20px_50px_rgba(255,182,193,0.2)]">
          <Image
            src={post.image || "/wh.jpg"}
            alt={post.title}
            fill
            className="object-cover"
            priority
          />
        </div>
      </section>

      {/* Main Content Area */}
      <section className="px-6 md:px-15 pb-32">
        <div className="max-w-3xl mx-auto">
          {post.description && (
            <div className="mb-12">
              <p className="text-xl md:text-2xl text-[#3D1A2A] leading-relaxed opacity-90 font-medium italic border-l-4 border-pink-400 pl-6 py-2">
                {post.description}
              </p>
            </div>
          )}

          <div 
            className="prose prose-pink prose-lg md:prose-xl max-w-none text-[#1A1A1A] leading-[1.8] font-light
              prose-headings:font-cal-sans prose-headings:font-normal prose-headings:text-[#1A1A1A]
              prose-p:mb-8 prose-p:opacity-90
              prose-strong:font-bold prose-strong:text-[#DB2777]
              prose-img:rounded-3xl prose-img:shadow-xl
              prose-blockquote:border-pink-500 prose-blockquote:bg-pink-50 prose-blockquote:py-2 prose-blockquote:px-8 prose-blockquote:rounded-r-2xl prose-blockquote:not-italic"
            dangerouslySetInnerHTML={{ __html: post.content || "" }}
          />
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-white">
        <PTA />
      </section>
    </main>
  );
}
