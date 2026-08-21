import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { BlogPost } from "@/types/blog";

interface Props {
  title: string;
  description: string;
  category: BlogPost["category"];
  posts: BlogPost[];
}

/** A themed shelf of posts within one category — shown alongside, not instead
 *  of, the main filterable grid below it (posts can appear in both). */
export default function CuratedSection({ title, description, category, posts }: Props) {
  const matches = posts.filter((p) => p.category === category).slice(0, 4);
  if (matches.length < 2) return null;

  return (
    <section className="lg:px-8 px-4 max-w-7xl mx-auto mb-14">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-3 mb-6">
        <div>
          <h2 className="font-cal-sans text-2xl md:text-3xl text-black mb-2">{title}</h2>
          <p className="text-gray-500 text-sm md:text-base max-w-xl">{description}</p>
        </div>
        <Link
          href="#all-articles"
          className="shrink-0 flex items-center gap-1.5 text-sm font-semibold text-[#D62D88] hover:gap-2.5 transition-all"
        >
          View All <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        {matches.map((post) => (
          <Link
            key={post.id || post.slug}
            href={`/blog/${post.slug}`}
            className="group flex flex-col gap-3"
          >
            <div className="relative overflow-hidden rounded-xl aspect-square">
              <Image
                src={post.image?.startsWith("http") ? post.image : post.image || "/logo.png"}
                alt={post.title}
                fill
                sizes="(max-width: 768px) 50vw, 25vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
            <h3 className="text-sm md:text-base font-cal-sans text-gray-900 leading-snug line-clamp-2 group-hover:text-[#D62D88] transition-colors">
              {post.title}
            </h3>
          </Link>
        ))}
      </div>
    </section>
  );
}
