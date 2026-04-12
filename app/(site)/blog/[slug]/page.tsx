import { getPostBySlug, getAllPosts } from "@/lib/blog";
import { notFound } from "next/navigation";
import Link from "next/link";
import PTA from "@/components/globalComp/PTA";
import Image from "next/image";
import { MoveLeft } from "lucide-react";
import AdminEditButton from "@/components/admin/AdminEditButton";

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#FFF1F5]">
      <section className="px-6 md:px-15 py-10 max-w-7xl mx-auto">
        {/* Back Link */}
        <div className="mb-10">
          <Link 
            href="/blog" 
            className="flex items-center gap-2 text-[#121212] font-semibold text-sm group"
          >
            <MoveLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            Back to Blog Page
          </Link>
        </div>

        {/* Post Header */}
        <div className="mb-12">
            <h1 className="text-[#121212] mb-6 max-w-4xl">
                {post.title}
            </h1>
            <p className="text-[#4B5563]  max-w-3xl">
                {post.description}
            </p>
        </div>

        {/* Main Content Area */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-20">
            {/* Image Container */}
            <div className="lg:col-span-5">
                <div className="relative aspect-[4/5] w-full rounded-2xl overflow-hidden">
                    <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        className="object-cover"
                        priority
                    />
                </div>
            </div>

            {/* Content Container */}
            <div className="lg:col-span-7 flex flex-col gap-6 text-[#121212] text-sm md:text-base lg:text-lg leading-relaxed pt-4">
                <div 
                    className="prose prose-pink max-w-none"
                    dangerouslySetInnerHTML={{ __html: post.content }}
                />
            </div>
        </div>
      </section>

      {/* Admin Quick Edit */}
      <AdminEditButton editUrl={`/admin/dashboard/blog/${post.id}/edit`} />

      {/* CTA Section */}
      <section className="">
        <PTA />
      </section>
    </main>
  );
}
