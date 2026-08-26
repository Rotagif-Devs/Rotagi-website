export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  description: string;
  tldr?: string;
  content: string;
  image: string;
  date: string;
  category: "Success Story" | "Resource" | "News";
  status: "draft" | "published";
  author: {
    name: string;
    role: string;
    image?: string;
  };
}
