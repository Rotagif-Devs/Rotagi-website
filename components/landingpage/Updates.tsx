import Image from "next/image";
import Link from "next/link";
import { publicService } from "@/lib/services/public.service";
import { ArrowRight } from "lucide-react";
import UpdatesClient from "./UpdatesClient";
import Button from "../ui/Button";

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
    console.warn("Failed to fetch latest blog", err);
  }

  try {
    const latestEvents = await publicService.getEvents({ limit: 1 });
    latestEvent = latestEvents?.[0] || null;
  } catch (err) {
    console.warn("Failed to fetch latest event", err);
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
      category: "CONFERENCE",
      title: "SHE Empower 2026 Highlights",
      desc: "Recap of our annual conference featuring workshops, mentorship sessions, and inspiring talks.",
      image: "/img-5.png",
      linkText: "View Event",
      href: "/sheempower",
    },
  ];
  return (
    <section
      className="py-8 lg:py-16 px-6 lg:px-8 flex justify-center"
      id="updates"
    >
      <div className="flex w-full max-w-11/12 flex-col gap-6">
        {/* Title + description area */}
        <div className="flex flex-col gap-6 items-start">
          <h2 className="text-black font-cal-sans font-normal text-4xl md:text-5xl leading-tight uppercase">
            Updates from the Work That Matters
          </h2>
          <p className="text-gray-600 font-dm-sans font-normal text-base leading-relaxed max-w-[572px]">
            From program highlights to impact milestones, see how we’re
            advancing opportunity and digital empowerment.
          </p>
        </div>

        {/* Cards section (Desktop Grid + Mobile Slider) */}
        <UpdatesClient updates={updates} />

        <div className="flex justify-center md:justify-start lg:hidden mt-1">
          <Button href="/blog" variant="primary" className="">
            View All
          </Button>
        </div>
      </div>
    </section>
  );
}
