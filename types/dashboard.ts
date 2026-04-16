export interface LearningCardItem {
  id: number;
  title: string;
  description: string;
  bg: string;
  panel: string;
  image: string;
}

export const learningCards: LearningCardItem[] = [
  {
    id: 1,
    title: "Artificial Intelligence (AI)",
    description:
      "Master AI concepts, machine learning, and build intelligent systems",
    bg: "bg-[#fff0e9]",
    panel: "bg-[#cc6534]",
    image:
      "/r1.png",
  },
  {
    id: 2,
    title: "Digital Literacy",
    description:
      "Develop essential digital skills for the modern workplace",
    bg: "bg-[#f7ebff]",
    panel: "bg-[#A03AF6]",
    image:
      "/r2.png",
  },
  {
    id: 3,
    title: "Life Skills",
    description:
      "Build critical thinking, communication and personal development",
    bg: "bg-[#ffe9f4]",
    panel: "bg-[#ea2388]",
    image:
      "/r3.png",
  },
];