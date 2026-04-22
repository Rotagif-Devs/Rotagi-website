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
    ageRange: "10-12 years",
    tagline:
      "Building foundational AI awareness, digital literacy, and life skills for African girls through free, hands-on projects.",
    headline: "Where Curiosity Begins",
    description:
      "She Ignite introduces young African girls to the exciting world of AI, digital, and life skills through free courses. Participants discover how AI works in everyday life, develop digital confidence, and build life skills that will serve them throughout their educational journey.",
    duration: "Self-paced",
    format: "Virtual",
    schedule: "Available when the ROTAGI learning platform launches",
    detailImage: "/program-detail-image.png",
    image: "/program-3.png",
    outcomes: {
      title: "Key Outcomes",
      items: [
        "Discover AI awareness, digital safety, and confidence",
        "Explore how AI shows up in everyday digital life",
        "Build life skills and digital confidence",
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
        "Discover AI awareness, digital safety, and confidence",
        "Explore how AI shows up in everyday digital life",
        "Build life skills and digital confidence",
        "Build life skills creatively",
        "Complete first free AI and digital projects",
      ],
    },
    benefits: {
      title: "What You'll Get",
      items: [
        "Certificate of completion",
        "Digital toolkit with learning resources",
        "Access to She Ignite community",
        "Pathway to She Blossom programme",
        "Mentorship from AI tech role models",
      ],
    },
  },
  {
    id: "she-blossom",
    name: "She Blossom",
    slug: "she-blossom",
    ageRange: "13-15 years",
    level: "Intermediate",
    tagline:
      "Developing digital, AI, and life skills through critical thinking, responsible technology use, and problem-solving.",
    headline: "Growing into Responsibility",
    description:
      "She Blossom builds on foundational knowledge to help teenage girls grow through practical AI, digital, and life skills courses. Through free, hands-on projects, participants explore responsible technology use, design digital solutions, and develop the confidence to lead.",
    duration: "Self-paced",
    format: "Virtual",
    schedule: "Available when the ROTAGI learning platform launches",
    detailImage: "/program-detail-image.png",
    image: "/program-2.png",
    outcomes: {
      title: "Outcomes",
      items: [
        "Build digital and AI skills confidently",
        "Develop responsible digital habits",
        "Build life skills and confidence",
      ],
    },
    prerequisites: {
      title: "Prerequisites",
      items: [
        "Completion of She Ignite and African girls aged 13–15 enrol directly",
        "No prior computer skills required",
        "Age 13-15 years",
        "Commitment to attend all sessions",
      ],
    },
    achievements: {
      title: "What You'll Achieve",
      items: [
        "Build digital and AI skills confidently",
        "Develop responsible digital habits",
        "Build life skills and confidence",
        "Apply life skills and digital thinking",
        "Lead collaborative AI-driven projects",
      ],
    },
    benefits: {
      title: "What You'll Get",
      items: [
        "Certificate of completion with portfolio showcase",
        "AI development toolkit and resources",
        "Personal mentorship from and ROTAGI AI and Tech community",
        "Portfolio of 3 to 5 completed projects",
        "Pathway to the Blaze advanced programme",
        "Access to alumni network and events",
      ],
    },
  },
  {
    id: "she-blaze",
    name: "She Blaze",
    slug: "she-blaze",
    ageRange: "16-18 years",
    level: "Advanced",
    headline: "From Skills to Independence",
    tagline:
      "Advanced AI learning, digital skills, and life skills for young women ready to lead in technology.",
    description:
      "She Blaze prepares young women for technology and AI careers through free, advanced training in AI, digital, and life skills. Participants build job ready solutions, explore income pathways, and develop leadership skills for success in the AI and tech sector.",
    duration: "Self-paced",
    format: "Virtual",
    schedule: "Available when the ROTAGI learning platform launches",
    detailImage: "/program-detail-image.png",
    image: "/program-1.png",
    outcomes: {
      title: "Outcomes",
      items: [
        "Build job-ready AI skills",
        "Explore income pathways through digital entrepreneurship",
        "Build leadership and career readiness skills",
      ],
    },
    prerequisites: {
      title: "Prerequisites",
      items: [
        "Completion of She Blossom or demonstrated intermediate programming skills",
        "Portfolio of previous tech projects",
        "16 to 18 years",
        "Strong commitment (15-20 hours per week)",
      ],
    },
    achievements: {
      title: "What You'll Achieve",
      items: [
        "Build job-ready AI skills",
        "Explore income pathways through digital entrepreneurship",
        "Build leadership and career readiness skills",
        "Understand AI ethics and responsible technology use",
        "Showcase digital and entrepreneurship projects confidently",
      ],
    },
    benefits: {
      title: "What You'll Get",
      items: [
        "Professional certificate recognized by tech companies",
        "Industry standard portfolio with 5+ advanced projects",
        "One on one mentorship from senior engineers",
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
    ageRange: "18-40 years",
    level: "Professional",
    headline: "AI & Tech Careers Empowerment",
    tagline:
      "A professional programme supporting women in AI, digital skills, freelancing, and entrepreneurship careers.",
    description:
      "She Ascend supports African women transitioning into AI and technology careers through free AI, digital, and life skills training. Through mentorship and industry connections, participants gain skills to succeed in the rapidly evolving tech landscape and build a professional network.",
    duration: "Self-paced",
    format: "Virtual",
    schedule: "Available when the ROTAGI learning platform launches",
    detailImage: "/program-detail-image.png",
    image: "/program-4.png",
    outcomes: {
      title: "Key Outcomes",
      items: [
        "Master AI, digital, and freelancing skills confidently",
        "Build a professional portfolio of industry-ready work",
        "Access pathways to careers, leadership, and entrepreneurship",
      ],
    },
    prerequisites: {
      title: "Prerequisites",
      items: [
        "Basic computer literacy and digital skills",
        "No formal qualifications needed — just eagerness to learn and grow.",
        "Commitment to career transition or advancement",
        "Age 18-40 years",
      ],
    },
    achievements: {
      title: "What You'll Achieve",
      items: [
        "Master AI, digital, and freelancing skills confidently",
        "Build a professional portfolio of industry-ready work",
        "Access pathways to careers, leadership, and entrepreneurship",
        "Develop life skills, confidence, and entrepreneurship readiness",
        "Join a supportive community of women in AI and Tech",
      ],
    },
    benefits: {
      title: "What You'll Get",
      items: [
        "Professional certificate in AI Development",
        "Portfolio of 7+ production ready projects",
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
