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
        <div className="mb-8">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-[#D81B7E] font-semibold text-sm group w-fit hover:opacity-80 transition-opacity"
          >
            <MoveLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            Back to Blog
          </Link>
        </div>

        {/* Post Header */}
        <div className="mb-8 max-w-4xl">
          <h1 className="text-[#121212] mb-4 text-3xl md:text-5xl lg:text-6xl font-bold font-cal-sans leading-tight">
            {post.title}
          </h1>

          {/* Author + Date row */}
          <div className="flex flex-wrap items-center gap-4 text-gray-500 text-sm mb-4">
            {authorName && (
              <span className="flex items-center gap-1.5">
                <User size={14} className="text-[#D81B7E]" />
                {authorName}
              </span>
            )}
            {formattedDate && (
              <span className="flex items-center gap-1.5">
                <Calendar size={14} className="text-[#D81B7E]" />
                {formattedDate}
              </span>
            )}
          </div>

          {post.description && (
            <p className="text-[#4B5563] text-base md:text-lg leading-relaxed border-l-4 border-[#D81B7E] pl-4 italic">
              {post.description}
            </p>
          )}
        </div>

        {/* Layout: Cover image top, content below */}
        <div className="flex flex-col gap-12 mb-20">
          {/* Featured Image */}
          {post.image && (
            <div className="w-full">
              <div className="relative w-full aspect-video md:aspect-[21/9] rounded-2xl overflow-hidden shadow-sm bg-white">
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
          <div>
            <div
              className="prose prose-pink prose-base lg:prose-lg max-w-none w-full break-words
                prose-headings:font-cal-sans prose-headings:text-[#121212]
                prose-p:mb-5 prose-p:text-gray-700 prose-p:leading-relaxed
                prose-strong:text-[#D81B7E]
                prose-img:rounded-2xl prose-img:shadow-md
                prose-a:text-[#D81B7E] prose-a:font-semibold prose-a:no-underline hover:prose-a:underline
                prose-ul:list-disc prose-ol:list-decimal
                prose-li:text-gray-700"
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
