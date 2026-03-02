import { BlogPost } from "@/types/blog";

export const blogPosts: BlogPost[] = [
  {
    id: "how-ai-changed-my-career-path",
    slug: "how-ai-changed-my-career-path",
    title: "How AI Changed My Career Path",
    description: "Meet Amina, a She Ascend graduate who transitioned from teaching to AI product management.",
    category: "Success Story",
    date: "March 2026",
    image: "/blog-1.jpg",
    author: {
      name: "Amina",
      role: "She Ascend Graduate"
    },
    content: `
      <p>Amina joined ROTAGI's She Ascend program searching for clarity about her future. With a background in teaching and a growing curiosity about technology, she wanted to explore new opportunities but didn't know where to begin.</p>
      <p>Through guided learning sessions, mentorship, and collaborative projects, Amina gained confidence in AI concepts and digital problem-solving. The program exposed her to real-world tools and helped her understand how technology could shape meaningful solutions within her community.</p>
      <p>By the end of the cohort, Amina had transitioned into an entry-level product role, combining her education experience with her new digital skills. Today, she continues to mentor younger participants while building a career rooted in innovation and impact.</p>
    `
  },
  {
    id: "beginners-guide-to-ai-literacy",
    slug: "beginners-guide-to-ai-literacy",
    title: "Beginner's Guide To AI Literacy",
    description: "A free downloadable toolkit for parents and educators introducing AI concepts to young learners.",
    category: "Resource",
    date: "February 2026",
    image: "/blog-2.jpg",
    author: {
      name: "ROTAGI Team",
      role: "Education Dept"
    },
    content: `
      <p>Artificial Intelligence is no longer a futuristic concept—it's part of our daily lives. For parents and educators, understanding AI literacy is the first step in preparing the next generation for a digital future.</p>
      <p>This guide breaks down complex AI concepts into simple, relatable terms. From understanding algorithms to recognizing AI in social media, we provide practical activities that can be done at home or in the classroom.</p>
      <p>Download our toolkit today and start the journey of digital discovery with your children or students.</p>
    `
  },
  {
    id: "she-empower-2026-highlights",
    slug: "she-empower-2026-highlights",
    title: "SHE Empower 2026 Highlights",
    description: "Recap of our annual conference featuring workshops, mentorship sessions, and inspiring talks.",
    category: "Event",
    date: "January 2026",
    image: "/blog-2.jpg",
    author: {
      name: "Event Team",
      role: "Operations"
    },
    content: `
      <p>SHE Empower 2026 was a celebration of innovation, resilience, and community. Over three days, we brought together hundreds of young women, tech leaders, and educators to explore the future of AI in Africa.</p>
      <p>The event featured hands-on workshops on machine learning, panel discussions on ethics in AI, and one-on-one mentorship sessions that sparked new career paths. Seeing the energy and passion of our participants was a reminder of why we do what we do.</p>
      <p>Relive the magic with our highlight video and check out the key takeaways from our keynote speakers.</p>
    `
  },
  {
    id: "digital-futures-reshaping-education",
    slug: "digital-futures-reshaping-education",
    title: "How Inclusive Digital Futures Are Reshaping Education",
    description: "Exploring how technology is breaking down barriers and creating new opportunities for learners across Africa.",
    category: "News",
    date: "April 2026",
    image: "/blog-1.jpg",
    author: {
      name: "ROTAGI Editorial",
      role: "Editorial"
    },
    content: `
      <p>The landscape of education is undergoing a radical shift. Digital tools are not just supplements to learning; they are becoming the foundation of how knowledge is shared and acquired.</p>
      <p>In this article, we look at the various ways inclusive technology is helping to bridge the gap in educational access. From mobile learning platforms to AI-driven personalized tutoring, the potential for impact is enormous.</p>
      <p>Join us as we interview experts and educators who are at the forefront of this digital revolution.</p>
    `
  }
];

export const getAllPosts = (): BlogPost[] => {
  return blogPosts;
};

export const getPostBySlug = (slug: string): BlogPost | undefined => {
  return blogPosts.find((post) => post.slug === slug);
};

export const getLatestPosts = (limit: number = 3): BlogPost[] => {
  return [...blogPosts]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, limit);
};
