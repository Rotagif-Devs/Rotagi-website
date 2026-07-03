import { publicService } from "@/lib/services/public.service";
import { notFound } from "next/navigation";
import Link from "next/link";
import PTA from "@/components/globalComp/PTA";
import Image from "next/image";
import { MoveLeft, Calendar, User } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await publicService.getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const formattedDate = post.date
    ? new Date(post.date).toLocaleDateString("en-GB", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : null;

  const authorName =
    typeof post.author === "object" && post.author?.name
      ? post.author.name
      : typeof post.author === "string"
      ? post.author
      : null;

  return (
    <main className="min-h-screen bg-[#FFF1F5] overflow-x-hidden">
      <article className="px-6 md:px-10 lg:px-16 py-10 pt-24 lg:pt-32 max-w-7xl mx-auto w-full">
        {/* Back Link */}
        <div className="mb-12">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-[#D81B7E] font-semibold text-sm group w-fit hover:opacity-80 transition-opacity"
          >
            <MoveLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            Back to Blog
          </Link>
        </div>

        {/* Post Header */}
        <div className="mb-12 max-w-4xl mx-auto text-center flex flex-col items-center">
          {post.category && (
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-pink-50 border border-pink-100 text-pink-600 rounded-full text-xs font-bold uppercase tracking-wider mb-6">
              {post.category}
            </div>
          )}
          
          <h1 className="text-[#1A1A1A] mb-8 text-4xl md:text-5xl lg:text-[56px] font-bold font-cal-sans leading-[1.1] tracking-tight">
            {post.title}
          </h1>

          {/* Author + Date row */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-gray-600 text-sm mb-8 font-medium">
            {authorName && (
              <span className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-pink-100 border border-pink-200 flex items-center justify-center text-pink-700 shadow-sm">
                  <User size={18} />
                </div>
                <span className="text-base text-gray-900">{authorName}</span>
              </span>
            )}
            
            {authorName && formattedDate && (
              <div className="w-1.5 h-1.5 rounded-full bg-gray-300 hidden md:block" />
            )}

            {formattedDate && (
              <span className="flex items-center gap-2 text-base">
                <Calendar size={18} className="text-[#D81B7E]" />
                {formattedDate}
              </span>
            )}
          </div>

          {post.description && (
            <p className="text-gray-600 text-xl leading-relaxed md:text-2xl font-light italic max-w-3xl mx-auto">
              "{post.description}"
            </p>
          )}
        </div>

        {/* Layout: Cover image top, content below */}
        <div className="flex flex-col gap-16 mb-24">
          {/* Featured Image */}
          {post.image && (
            <div className="w-full max-w-5xl mx-auto">
              <div className="relative w-full aspect-video md:aspect-[21/9] rounded-[32px] overflow-hidden border-[8px] border-white shadow-[0_20px_50px_rgba(216,27,126,0.15)] bg-white">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  sizes="100vw"
                  className="object-contain"
                  priority
                />
              </div>
            </div>
          )}

          {/* Prose Content */}
          <div className="max-w-3xl mx-auto w-full">
            <div
              className="prose prose-pink prose-base lg:prose-lg max-w-none w-full break-words
                prose-headings:font-cal-sans prose-headings:text-[#1A1A1A]
                prose-p:mb-6 prose-p:text-gray-700 prose-p:leading-[1.8]
                prose-strong:text-[#D81B7E]
                prose-img:rounded-3xl prose-img:shadow-xl prose-img:border prose-img:border-gray-100
                prose-a:text-[#D81B7E] prose-a:font-semibold prose-a:no-underline hover:prose-a:underline
                prose-ul:list-disc prose-ol:list-decimal
                prose-li:text-gray-700 prose-blockquote:border-[#D81B7E] prose-blockquote:bg-pink-50 prose-blockquote:px-6 prose-blockquote:py-2 prose-blockquote:rounded-r-2xl prose-blockquote:italic"
              dangerouslySetInnerHTML={{ __html: post.content || "" }}
            />
          </div>
        </div>
      </article>

      {/* CTA Section */}
      <section className="mt-auto bg-white border-t border-gray-100">
        <PTA />
      </section>
    </main>
  );
}
