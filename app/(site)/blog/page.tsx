"use client";

import { useEffect, useState } from "react";
import { publicService } from "@/lib/services/public.service";
import { BlogPost } from "@/types/blog";
import BlogHero from "@/components/blogComps/BlogHero";
import BlogList from "@/components/blogComps/BlogList";
import PTA from "@/components/globalComp/PTA";

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        console.log("Fetching blog posts...");
        const data = await publicService.getBlogPosts({ limit: 50 });
        console.log("Fetched blogs count:", data.length);
        console.log("Blogs data:", data);
        setPosts(data);
      } catch (error) {
        console.error("Failed to fetch blog posts:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  if (loading) {
    return (
      <main className="min-h-screen bg-[#FFF1F5] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#D62D88]"></div>
      </main>
    );
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
        title="ROTAGIF Blog" 
        category="ROTAGI BLOGS" 
      />
      
      <BlogList posts={posts} />
      
      <div className="pb-20">
        <PTA />
      </div>
    </main>
  );
}
