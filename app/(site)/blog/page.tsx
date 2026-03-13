import { getAllPosts } from "@/lib/blog";
import BlogHero from "@/components/blogComps/BlogHero";
import BlogList from "@/components/blogComps/BlogList";
import PTA from "@/components/globalComp/PTA";

export default function BlogPage() {
  const posts = getAllPosts();
  
  // For the hero, we use the first post as the "featured" one
  const featuredPost = posts[0];

  return (
    <main className="min-h-screen bg-[#FFF1F5]">
      <BlogHero 
        title={featuredPost.title} 
        category="ROTAGI BLOGS" 
      />
      
      <BlogList posts={posts} />
      
      <div className="pb-20">
        <PTA />
      </div>
    </main>
  );
}
