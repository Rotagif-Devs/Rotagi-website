import { publicService } from "@/lib/services/public.service";
import { notFound } from "next/navigation";
import Link from "next/link";
import PTA from "@/components/globalComp/PTA";
import Image from "next/image";
import { MoveLeft } from "lucide-react";

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

  return (
    <main className="min-h-screen bg-[#FFF1F5] overflow-x-hidden">
      <section className="px-6 md:px-10 lg:px-16 py-10 pt-24 lg:pt-32 max-w-7xl mx-auto w-full">
        {/* Back Link */}
        <div className="mb-10">
          <Link 
            href="/blog" 
            className="flex items-center gap-2 text-[#121212] font-semibold text-sm group w-fit"
          >
            <MoveLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            Back to Blog Page
          </Link>
        </div>

        {/* Post Header */}
        <div className="mb-12 w-full">
            <h1 className="text-[#121212] mb-6 max-w-4xl text-4xl md:text-5xl lg:text-6xl font-bold font-cal-sans leading-tight">
                {post.title}
            </h1>
            <p className="text-[#4B5563] text-lg md:text-xl max-w-3xl leading-relaxed">
                {post.description}
            </p>
        </div>

        {/* Main Content Area */}
        <div className="max-w-4xl mx-auto mb-20 w-full">
            {/* Content Container */}
            <div className="flex flex-col gap-6 text-[#121212] w-full">
                <div 
                    className="prose prose-pink prose-lg lg:prose-xl max-w-none w-full break-words
                      prose-headings:font-cal-sans prose-headings:text-[#121212]
                      prose-p:mb-6 prose-p:text-gray-700 prose-p:leading-relaxed
                      prose-strong:text-[#DB2777] prose-img:rounded-2xl prose-img:shadow-lg
                      prose-a:text-[#DB2777] prose-a:font-semibold"
                    dangerouslySetInnerHTML={{ __html: post.content || "" }}
                />
            </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="mt-auto bg-white border-t border-gray-100">
        <PTA />
      </section>
    </main>
  );
}
