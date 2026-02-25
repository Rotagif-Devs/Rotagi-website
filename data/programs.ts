import { ReactNode } from "react";

export interface Program {
  learnMoreUrl: string;
  extendedDescription: ReactNode;
  id: string;
  name: string;
  ages: string;
  description: string;
  color: string;
  accent: string;
  image: string;
}

export const programs: Program[] = [
  {
    id: "ignite",
    name: "She Ignite",
    ages: "Ages 10–12",
    description: "She Ignite introduces young girls to the exciting world of technology and artificial intelligence through interactive, age-appropriate activities. Participants explore basic coding concepts, learn about AI in everyday life, and develop critical thinking skills that will serve them throughout their educational journey.",
    color: "from-pink-400 to-rose-500",
    accent: "#f43f5e",
    image: "/img-1.png",
    learnMoreUrl: "",
    extendedDescription: undefined
  },
  {
    id: "blossom",
    name: "She Blossom",
    ages: "Ages 13–15",
    description: "She Ignite introduces young girls to the exciting world of technology and artificial intelligence through interactive, age-appropriate activities. Participants explore basic coding concepts, learn about AI in everyday life, and develop critical thinking skills that will serve them throughout their educational journey.",
    color: "from-fuchsia-500 to-pink-500",
    accent: "#d946ef",
    image: "/img-2.png",
    learnMoreUrl: "",
    extendedDescription: undefined
  },
  {
    id: "blaze",
    name: "She Blaze",
    ages: "Ages 16–18",
    description: "She Ignite introduces young girls to the exciting world of technology and artificial intelligence through interactive, age-appropriate activities. Participants explore basic coding concepts, learn about AI in everyday life, and develop critical thinking skills that will serve them throughout their educational journey.",
    color: "from-rose-500 to-pink-600",
    accent: "#e11d48",
    image: "/img-3.png",
    learnMoreUrl: "",
    extendedDescription: undefined
  },
  {
    id: "ascend",
    name: "She Ascend",
    ages: "Ages 18–40",
    description: "She Ignite introduces young girls to the exciting world of technology and artificial intelligence through interactive, age-appropriate activities. Participants explore basic coding concepts, learn about AI in everyday life, and develop critical thinking skills that will serve them throughout their educational journey.",
    color: "from-pink-600 to-fuchsia-700",
    accent: "#be185d",
    image: "/img-4.png",
    learnMoreUrl: "",
    extendedDescription: undefined
  },
];