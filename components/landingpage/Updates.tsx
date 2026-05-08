import Image from "next/image";
import Link from "next/link";
import { publicService } from "@/lib/services/public.service";
import { ArrowRight } from "lucide-react";

const extractText = (html: string) => {
  if (!html) return "";
  const text = html.replace(/<[^>]*>?/gm, "");
  return text.length > 120 ? text.substring(0, 120) + "..." : text;
};

export default async function Updates() {
  let latestBlog = null;
  let latestEvent = null;

  try {
    const latestBlogs = await publicService.getBlogPosts({ limit: 1 });
    latestBlog = latestBlogs?.[0] || null;
  } catch (err) {
    console.error("Failed to fetch latest blog", err);
  }

  try {
    const latestEvents = await publicService.getEvents({ limit: 1 });
    latestEvent = latestEvents?.[0] || null;
  } catch (err) {
    console.error("Failed to fetch latest event", err);
  }

  const blogDesc =
    latestBlog?.description ||
    extractText(latestBlog?.content || "") ||
    "Read the latest updates and insights from our team.";
  const blogImage =
    latestBlog?.image && latestBlog.image !== "/wh.jpg"
      ? latestBlog.image
      : "/img-5.png";

  const eventDesc =
    latestEvent?.description ||
    "Join us for our upcoming events and workshops designed to empower and inspire.";
  const eventImage =
    latestEvent?.image && latestEvent.image !== "/wh.jpg"
      ? latestEvent.image
      : "/img-5.png";

  const updates = [
    {
      category: latestBlog?.category?.toUpperCase() || "SUCCESS STORY",
      title: latestBlog?.title || "Latest Blog",
      desc: blogDesc,
      image: blogImage,
      linkText: "Read Story",
      href: `/blog/${latestBlog?.slug || ""}`,
    },
    {
      category: "EVENT",
      title: latestEvent?.title || "Latest Event",
      desc: eventDesc,
      image: eventImage,
      linkText: "View Event",
      href: "/events",
    },
    {
      category: "EVENT",
      title: "SHE Empower 2026 Highlights",
      desc: "Recap of our annual conference featuring workshops, mentorship sessions, and inspiring talks.",
      image: "/img-5.png",
      linkText: "View Event",
      href: "/events/she-empower",
    },
  ];
  return (
    <section
      className="py-16 lg:py-24 px-6 lg:px-8 flex justify-center"
      id="updates"
    >
      <div className="flex w-full max-w-7xl flex-col gap-14">
        {/* Title + description area */}
        <div className="flex flex-col gap-6 items-start">
          <h2 className="text-black font-cal-sans font-normal text-4xl md:text-5xl leading-tight">
            Updates from the Work That Matters
          </h2>
          <p className="text-gray-600 font-dm-sans font-normal text-base leading-relaxed max-w-[572px]">
            From program highlights to impact milestones, see how we’re
            advancing opportunity and digital empowerment.
          </p>
        </div>

        {/* Cards section */}
        <div className="grid md:grid-cols-3 gap-4">
          {updates.map((update) => (
            <div
              key={update.title}
              className="group flex flex-col overflow-hidden rounded-xl border border-gray-100 bg-white"
            >
              <div className="relative  overflow-hidden">
                <Image
                  width={400}
                  height={220}
                  src={update.image}
                  alt={update.title}
                  className=" m-auto object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>

              <div className="flex flex-col p-6 gap-4">
                <div className="flex flex-col gap-1.5">
                  <span className="text-red-500 text-xs font-semibold font-dm-sans tracking-wider uppercase">
                    {update.category}
                  </span>
                  <h3 className="text-black font-cal-sans text-xl capitalize leading-8">
                    {update.title}
                  </h3>
                  <p className="text-gray-600 font-dm-sans text-base leading-relaxed line-clamp-2">
                    {update.desc}
                  </p>
                </div>

                <Link
                  href={update.href}
                  className="flex items-center gap-4 text-secondary font-semibold font-dm-sans group-hover:gap-6 transition-all"
                >
                  {update.linkText}
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
