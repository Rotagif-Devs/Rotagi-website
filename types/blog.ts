export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  description: string;
  content: string;
  image: string;
  date: string;
  category: "Success Story" | "Resource" | "Event" | "News";
  author: {
    name: string;
    role: string;
    image?: string;
  };
}
