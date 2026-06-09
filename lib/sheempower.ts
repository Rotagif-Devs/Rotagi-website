
export interface SheEmpowerFeature {
    title: string;
    desc: string;
    img: string;
  }

  export interface audienceFeatures {
    title: string;
    subtitle: string;
    items: string[];
  }
  export interface expectationFeatures {
    title: string;
    desc: string;
    bg: string;
  }

  export const features: SheEmpowerFeature[] = [
    {
      title: "Build Confidence",
      desc: "Discover your inner strength and learn to believe in yourself through inspiring talks, empowering activities, and a community who are on the same journey with you.",
      img: "/so1.png",
    },
    {
      title: "Connect & Belong",
      desc: "Meet African girls and young women from across communities, share stories, build friendships, and realise you are not alone on this journey. ",
      img: "/so4.png",
    },
    {
      title: "Learn & Explore",
      desc: "Get a taste of technology, Artificial Intelligence, and digital opportunities through fun, interactive sessions that spark curiosity and open doors you did not know existed.",
      img: "/so2.png",
    },
    {
      title: "Be Inspired",
      desc: "Hear from African women who have overcome challenges and are making their mark and see yourself in their stories.",
      img: "/so3.png",
    },
  ];

  
export const audience: audienceFeatures[] = [
  {
    title: "Ages 10–18",
    subtitle: "Young Innovators",
    items: [
      "Exploring Artificial Intelligence and Technology",
      "Building Confidence & Leadership",
      "Discovering Creativity And Life Skills",
    ],
  },
  {
    title: "Ages 18–40",
    subtitle: "Emerging & Professional Women",
    items: [
      "Students Looking For Career Motivation",
      "Women Transitioning Into Tech",
      "Entrepreneurs And Changemakers",
    ],
  },
];

export const expectations: expectationFeatures[] = [
  {
    title: "Inspiring Speakers",
    desc: "Hear from African women leaders, innovators, and changemakers sharing their journeys.",
    bg: "bg-[#FFD6E7]",
  },
  {
    title: "Hands On Workshops",
    desc: "Practical sessions on AI, digital literacy, and life skills.",
    bg: "bg-[#E5E1FF]",
  },
  {
    title: "Scholarship Announcements",
    desc: "Opportunities and resources designed to support growth.",
    bg: "bg-[#DDEBFF]",
  },
  {
    title: "Games & Challenges",
    desc: "Interactive activities that encourage teamwork and creativity.",
    bg: "bg-[#DDF8DF]",
  },
  {
    title: "Food & Wellness",
    desc: "Nutritious meals, wellness activities, and moments to connect authentically.",
    bg: "bg-[#FFF1CC]",
  },
  {
    title: "Recognition & Celebration",
    desc: "Celebrating participation, growth, and the brilliance of every African girl.",
    bg: "bg-[#F9D7E8]",
  },
];

export const values: SheEmpowerFeature[] = [
  {
    title: "Inclusive",
    desc: "Welcoming girls of all backgrounds, abilities, and communities.",
    img: "/so8.png",
  },
  {
    title: "Accessible",
    desc: "Designed to be barrier-free, with scholarships, support, and safe spaces.",
    img: "/so10.png",
  },
  {
    title: "Community Driven",
    desc: "Built with local changemakers, mentors, and meaningful partnerships.",
    img: "/so7.png",
  },
  {
    title: "Not For Profit",
    desc: "Every resource goes back into empowering more African girls and creating lasting impact.",
    img: "/so6.png",
  },
];