
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
    desc: "Discover your inner strength and learn to believe in yourself through inspiring talks, empowering activities, and a community who are on the same journey with you. ",
    img: "/build.png",
  },
  {
    title: "Connect & Belong",
    desc: "Meet African girls and young women from across communities, share stories, build friendships, and realise you are not alone on this journey. ",
    img: "/connect.png",
  },
  {
    title: "Learn & Explore",
    desc:"Get a taste of technology, Artificial Intelligence, and digital opportunities through fun, interactive sessions that spark curiosity and open doors you did not know existed.",
    img: "/learn.png",
  },
  {
    title: "Be Inspired",
    desc: "Hear from African women who have overcome challenges and are making their mark and see yourself in their stories.",
    img: "/inspired.png",
  },
];

export const audience: audienceFeatures[] = [
  {
    title: "Ages 10–18",
    subtitle: "Young Innovators",
    items: [
      "Students and young African girls",
      "Future leaders building confidence and digital awarenes",
      "Girls curious about AI, creativity, and life skills ",
    ],
  },
  {
    title: "Ages 19–40",
    subtitle: "Emerging & Professional Women",
    items: [
      "University students and early career professionals ",
      "Women transitioning into tech or growing their careers",
      "Entrepreneurs, freelancers, and changemakers ",
    ],
  },
];

export const expectations: expectationFeatures[] = [
  {
    title: "Inspiring Speakers",
    desc: "Hear from powerful women in tech, business, and leadership sharing real stories, and life changing opportunities.",
    bg: "bg-[#FFD6E7]",
  },
  {
    title: "Hands On Workshops",
    desc: "Artificial Intelligence and digital skills sessions, career and entrepreneurship workshops, and leadership and confidence building activities practical and interactive.",
    bg: "bg-[#FFD8DC]",
  },
  {
    title: "Scholarship Announcements",
    desc: "One of the most celebrated moments of the day. ROTAGI announces scholarship recipients and celebrates their courage and commitment.",
    bg: "bg-[#ECD9FF]",
  },
  {
    title: "Games & Challenges",
    desc: "Tech challenges, creative competitions, and team activities that make learning fun and build connections that last beyond the room.",
    bg: "bg-[#C1DDFF]",
  },
  {
    title: "Food & Wellness",
    desc: "Yoga and wellness sessions, great food, and real community. Empowerment should be holistic we take care of the whole person. ",
    bg: "bg-[#BDF8D2]",
  },
  {
    title: "Recognition & Celebration",
    desc: "Every African girl and young woman is seen, celebrated, and recognised for her progress. Certificates, prizes, photos, and moments she will carry with her.",
    bg: "bg-[#FCD1E9]",
  },
];

export const values: SheEmpowerFeature[] = [
  {
    title: "Inclusive",
    desc: "Open to African girls and young women at all stages  no matter their background, experience, or location. ",
    img: "/inclusive.png",
  },
  {
    title: "Accessible",
    desc: "Low cost tickets with scholarship opportunities so that cost is never a barrier to attending.",
    img: "/accessible.png",
  },
  {
    title: "Community Driven",
    desc: "Focused on genuine connection, confidence, and long term growth within a supportive sisterhood. ",
    img: "/community1.png",
  },
  {
    title: "Not for Profit",
    desc: "Proceeds directly support African girls' education, scholarships, and future ROTAGI program. ",
    img: "/nonProfit.png",
  },
];
