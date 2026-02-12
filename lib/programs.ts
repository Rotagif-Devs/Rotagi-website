export interface Program {
  id: string;
  name: string;
  slug: string; 
  ageRange: string;
  level: string;
  headline: string;
  tagline: string;
  description: string;
  duration: string;
  format: string;
  schedule: string;
  detailImage: string;
  image: string;
  outcomes: {
    title: string;
    items: string[];
  };
  prerequisites: {
    title: string;
    items: string[];
  };
  achievements: {
    title: string;
    items: string[];
  };
  benefits: {
    title: string;
    items: string[];
  };
}

export const programs: Program[] = [
  {
    id: "she-ignite",
    name: "She Ignite",
    slug: "she-ignite",
    level: "Beginner",
    ageRange: "Ages 10-12",
    tagline:
      "Building foundational AI awareness and digital literacy for young girls through interactive learning and hands-on projects.",
    headline:
      "An introductory program designed to spark curiosity and build foundational digital literacy in young girls.",
    description:
      "She Ignite introduces young girls to the exciting world of technology and artificial intelligence through interactive, age-appropriate activities. Participants explore basic coding concepts, learn about AI in everyday life, and develop critical thinking skills that will serve them throughout their educational journey.",
    duration: "8 weeks",
    format: "Virtual",
    schedule: "Rolling admissions - Next cohort starts March 2026",
    detailImage: "/program-detail-image.png",
    image: "/program-3.png",
    outcomes: {
      title: "Key Outcomes",
      items: [
        "Understand basic coding concepts and computational thinking",
        "Recognize AI in everyday life and how it works",
        "Develop confidence using digital tools safely",
      ],
    },
    prerequisites: {
      title: "Prerequisites",
      items: [
        "No prior experience required",
        "Access to a computer or tablet",
        "Parental consent and support",
        "Enthusiasm and curiosity about technology",
      ],
    },
    achievements: {
      title: "What You'll Achieve",
      items: [
        "Understand basic coding concepts and computational thinking",
        "Recognize AI in everyday life and how it works",
        "Develop confidence using digital tools safely",
        "Build creative problem-solving skills",
        "Create first technology projects with peers",
      ],
    },
    benefits: {
      title: "What You'll Get",
      items: [
        "Certificate of completion",
        "Digital toolkit with learning resources",
        "Access to She Ignite community",
        "Pathway to She Blossom program",
        "Mentorship from tech role models",
      ],
    },
  },
  {
    id: "she-blossom",
    name: "She Blossom",
    slug: "she-blossom",
    ageRange: "Ages 13-15",
    level: "Intermediate",
    tagline:
      "Developing deeper technical skills and critical thinking through AI applications, coding basics, and problem-solving.",
    headline:
      "An intermediate program that builds practical AI and programming skills through hands-on projects.",
    description:
      "She Blossom builds on foundational knowledge to help teenage girls develop practical AI and programming skills. Through hands-on projects, participants learn to create AI applications, design digital solutions, and understand the ethical implications of technology in society.",
    duration: "12 weeks",
    format: "Hybrid",
    schedule: "Cohorts start January, May, and September",
    detailImage: "/program-detail-image.png",
    image: "/program-2.png",
    outcomes: {
      title: "Outcomes",
      items: [
        "Build AI-powered applications and web projects",
        "Understand machine learning fundamentals",
        "Design user-friendly digital solutions",
      ],
    },
    prerequisites: {
      title: "Prerequisites",
      items: [
        "Completion of She Ignite or equivalent basic tech exposure",
        "Basic computer skills and digital literacy",
        "Age 13-15 years",
        "Commitment to attend all sessions",
      ],
    },
    achievements: {
      title: "What You'll Achieve",
      items: [
        "Build AI-powered applications and web projects",
        "Understand machine learning fundamentals",
        "Design user-friendly digital solutions",
        "Work confidently with data and visualizations",
        "Lead collaborative technology projects",
      ],
    },
    benefits: {
      title: "What You'll Get",
      items: [
        "Certificate of completion with portfolio showcase",
        "AI development toolkit and resources",
        "Personal mentorship from tech professionals",
        "Portfolio of 3-5 completed projects",
        "Pathway to the Blaze advanced program",
        "Access to alumni network and events",
      ],
    },
  },
  {
    id: "she-blaze",
    name: "She Blaze",
    slug: "she-blaze",
    ageRange: "Ages 16-18",
    level: "Advanced",
    headline:
      "An advanced program preparing young women for tech careers through industry-standard tools and mentorship.",
    tagline:
      "Advanced AI learning, leadership development, and career preparation for young women ready to lead in technology.",
    description:
      "She Blaze prepares young women for careers in technology and AI through advanced training, mentorship, and real-world project experience. Participants work on complex AI solutions, learn industry-standard tools, and develop leadership skills essential for success in the tech sector.",
    duration: "16 weeks",
    format: "Hybrid",
    schedule: "Cohorts start February and August",
    detailImage: "/program-detail-image.png",
    image: "/program-1.png",
    outcomes: {
      title: "Outcomes",
      items: [
        "Build professional-grade AI applications",
        "Master full-stack development and cloud deployment",
        "Lead technical teams and manage complex projects",
      ],
    },
    prerequisites: {
      title: "Prerequisites",
      items: [
        "Completion of She Blossom or demonstrated intermediate programming skills",
        "Portfolio of previous tech projects",
        "16-18 years",
        "Strong commitment (15-20 hours per week)",
      ],
    },
    achievements: {
      title: "What You'll Achieve",
      items: [
        "Build professional-grade AI applications",
        "Master full-stack development and cloud deployment",
        "Lead technical teams and manage projects",
        "Understand AI ethics, bias, and responsible innovation",
        "Present technical work to industry professionals",
      ],
    },
    benefits: {
      title: "What You'll Get",
      items: [
        "Professional certificate recognized by tech companies",
        "Industry-standard portfolio with 5+ advanced projects",
        "One-on-one mentorship from senior engineers",
        "Letter of recommendation for university applications",
        "Access to scholarship opportunities",
        "Job shadowing and internship connections",
        "Lifetime access to ROTAGI alumni network",
      ],
    },
  },
  {
    id: "she-ascend",
    name: "She Ascend",
    slug: "she-ascend",
    ageRange: "Ages 18-40",
    level: "Intermediate",
    headline:
      "Professional AI skills training, entrepreneurship support, and career advancement for African women in tech.",
    tagline:
      "A professional program supporting women entering or transitioning into AI and technology careers.",
    description:
      "She Ascend supports women entering or transitioning into AI and technology careers. Through intensive training, mentorship, and industry connections, participants gain the tech-related job needed to succeed in the rapidly evolving tech landscape while building a supportive professional network.",
    duration: "20 weeks (part-time) or 12 weeks (intensive)",
    format: "Hybrid",
    schedule: "Rolling admissions - New cohorts monthly",
    detailImage: "/program-detail-image.png",
    image: "/program-4.png",
    outcomes: {
      title: "Key Outcomes",
      items: [
        "Master industry-standard AI development tools and practices",
        "Build a professional portfolio of production-ready projects",
        "Network with hiring managers and tech recruiters",
      ],
    },
    prerequisites: {
      title: "Prerequisites",
      items: [
        "Basic computer literacy and digital skills",
        "Bachelor's degree or equivalent work experience (preferred)",
        "Commitment to career transition or advancement",
        "Age 18-40 years",
      ],
    },
    achievements: {
      title: "What You'll Achieve",
      items: [
        "Master industry-standard AI development tools and practices",
        "Build a professional portfolio of production-ready projects",
        "Network with hiring managers and tech recruiters",
        "Develop job search strategies and interview skills",
        "Join a supportive community of women in tech",
      ],
    },
    benefits: {
      title: "What You'll Get",
      items: [
        "Professional certificate in AI Development",
        "Portfolio of 7+ production-ready projects",
        "Personal career coach and technical mentor",
        "Access to job placement support",
        "Introduction to hiring partners",
        "Resume review and interview preparation",
        "Lifetime access to alumni network and resources",
        "Continued learning through workshops and events",
      ],
    },
  },
];

export const getProgramBySlug = (slug: string): Program | undefined => {
  return programs.find((program) => program.slug === slug);
};

export const getProgramById = (id: string): Program | undefined => {
  return programs.find((program) => program.id === id);
};

export const getAllPrograms = (): Program[] => {
  return programs;
};

export const getProgramsByAgeRange = (
  minAge: number,
  maxAge: number,
): Program[] => {
  return programs.filter((program) => {
    const ageRange = program.ageRange.match(/\d+/g);
    if (!ageRange) return false;
    const [min, max] = ageRange.map(Number);
    return (minAge >= min && minAge <= max) || (maxAge >= min && maxAge <= max);
  });
};
