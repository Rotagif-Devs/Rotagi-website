import { publicService } from "@/lib/services/public.service";
import BlogHero from "@/components/blogComps/BlogHero";
import BlogList from "@/components/blogComps/BlogList";
import PTA from "@/components/globalComp/PTA";

import { BlogPost } from "@/types/blog";

export default async function BlogPage() {
  let posts: BlogPost[] = [];
  try {
    console.log("Fetching blog posts on server...");
    posts = await publicService.getBlogPosts({ limit: 50 });
    console.log("Fetched blogs count:", posts.length);
  } catch (error) {
    console.error("Failed to fetch blog posts:", error);
  }

  // Handle empty state
  if (posts.length === 0) {
    return (
      <main className="min-h-screen bg-[#FFF1F5]">
        <BlogHero title="ROTAGIF Blog" category="ROTAGI BLOGS" />
        <section className="py-20 px-6 md:px-15 text-center">
          <p className="text-gray-500">No blog posts found yet. Check back soon!</p>
        </section>
        <div className="pb-20"><PTA /></div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#FFF1F5]">
      <BlogHero 
        title="ROTAGI Blog" 
        category="ROTAGI BLOGS" 
      />
      
      <BlogList posts={posts} />
      
      <div className="pb-20">
        <PTA />
      </div>
    </main>
  );
}
