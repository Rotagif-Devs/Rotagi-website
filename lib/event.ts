export type EventData = {
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  image: string;
  link: string;
  schedule?: Array<{
    content: string;
    image: string;
  }>;
}
  export const events: EventData[] = [
    {
      title: "AI Futures Summit 2026",
      description:
        "A full-day conference exploring the future of AI in Africa, featuring industry leaders, hands-on sessions, and networking opportunities.",
      date: "March 15, 2026",
      time: "9:00 AM - 5:00 PM",
      location: "Abuja Convention Center, Nigeria",
      image: "/wh.jpg",
      link: "https://example.com/ai-futures-summit-2026",
      schedule: [
        {
          content: "March 15, 2026",
          image: "/date.png",
        },
        {
          content: "9:00 AM - 5:00 PM WAT",
          image: "/clock.png",
        },
        {
          content: "Abuja Convention Center, Nigeria",
          image: "/location.png",
        },
      ],
    },
  ];