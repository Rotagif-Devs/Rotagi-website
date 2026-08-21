import { publicService } from "@/lib/services/public.service";
import BlogHero from "@/components/blogComps/BlogHero";
import FeaturedPost from "@/components/blogComps/FeaturedPost";
import CuratedSection from "@/components/blogComps/CuratedSection";
import BlogList from "@/components/blogComps/BlogList";
import PTA from "@/components/globalComp/PTA";

import { BlogPost } from "@/types/blog";

export const dynamic = "force-dynamic";

export default async function BlogPage() {
  let posts: BlogPost[] = [];
  try {
    posts = await publicService.getBlogPosts({ limit: 50 });
  } catch (error) {
    console.error("Failed to fetch blog posts:", error);
  }

  // Handle empty state
  if (posts.length === 0) {
    return (
      <main className="min-h-screen md:p-4 p-3">
        <BlogHero />
        <section className="lg:px-8 pb-10 pt-0 px-4 max-w-7xl mx-auto">
          <h4 className="py-6 font-cal-sans text-3xl md:text-4xl text-black">Latest Articles</h4>
          <div className="bg-white p-12 rounded-3xl text-center shadow-sm border border-pink-50">
            <p className="text-gray-500">No blog posts found yet. Check back soon!</p>
          </div>
        </section>
        <PTA />
      </main>
    );
  }

  const sorted = [...posts].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );
  const [featured, ...rest] = sorted;

  return (
    <main className="min-h-screen md:p-4 p-3">
      <BlogHero />
      <FeaturedPost post={featured} />
      <CuratedSection
        title="Success Stories"
        description="Real journeys from the girls and women ROTAGI has worked with."
        category="Success Story"
        posts={sorted}
      />
      <BlogList posts={rest} />
      <PTA />
    </main>
  );
}
