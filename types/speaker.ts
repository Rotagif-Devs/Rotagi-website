export type Speaker = {
  id: string;
  name: string;
  role: string;
  description: string;
  image: string;
  topics: string[];
};

export const speakers: Speaker[] = [
  {
    id: "amina-okoye",
    name: "Dr. Amina Okoye",
    role: "AI Research Lead, TechBridge Africa",
    description:
      "Leading researcher in natural language processing for African languages with 15+ years of experience in AI development.",
    image: "/speaker1.png",
    topics: ["AI Research Lead", "TechBridge Africa"],
  },
  {
    id: "fatima-adisa",
    name: "Dr. Fatima Adisa",
    role: "Machine Learning Engineer, DeepMind Africa",
    description:
      "Specialist in large-scale machine learning systems and ethical AI development across emerging markets.",
    image: "/speaker2.png",
     topics: ["AI Research Lead", "TechBridge Africa"],
  },
  {
    id: "linda-cole",
    name: "Dr. Linda Cole",
    role: "Data Scientist, OpenAI Research",
    description:
      "Focused on AI interpretability and human-centered machine learning for real-world applications.",
    image: "/speaker3.png",
    topics: ["AI Research Lead", "TechBridge Africa"],
  },
  {
    id: "maria-gonzalez",
    name: "Dr. Maria Gonzalez",
    role: "AI Policy Advisor, Global AI Council",
    description:
      "Expert in AI governance, policy frameworks, and responsible deployment of artificial intelligence.",
    image: "/speaker4.png",
    topics: ["AI Research Lead", "TechBridge Africa"],
  },
];