import { BlogPost } from "@/types/blog";
import { events as EventType } from "@/types/event";
import { blogPosts } from "@/lib/blog";
import { events as initialEventsData } from "@/lib/event";

// Initial mock data from existing files or defaults
const initialBlogs: BlogPost[] = blogPosts;
const initialEvents: EventType[] = initialEventsData as unknown as EventType[];

// Helper for local storage persistence in prototype
const getStorageItem = <T>(key: string, defaultValue: T): T => {
  if (typeof window === "undefined") return defaultValue;
  const item = localStorage.getItem(key);
  return item ? JSON.parse(item) : defaultValue;
};

const setStorageItem = (key: string, value: any) => {
  if (typeof window !== "undefined") {
    localStorage.setItem(key, JSON.stringify(value));
  }
};

export const adminService = {
  // Blog operations
  getBlogs: async (): Promise<BlogPost[]> => {
    return getStorageItem("mockBlogs", initialBlogs);
  },
  
  getBlogById: async (id: string): Promise<BlogPost | undefined> => {
    const blogs = await adminService.getBlogs();
    return blogs.find(b => b.id === id);
  },

  saveBlog: async (blog: BlogPost): Promise<BlogPost> => {
    const blogs = await adminService.getBlogs();
    const index = blogs.findIndex(b => b.id === blog.id);
    let updatedBlogs;
    
    if (index >= 0) {
      updatedBlogs = [...blogs];
      updatedBlogs[index] = blog;
    } else {
      updatedBlogs = [...blogs, { ...blog, id: Math.random().toString(36).substr(2, 9) }];
    }
    
    setStorageItem("mockBlogs", updatedBlogs);
    return blog;
  },

  deleteBlog: async (id: string): Promise<void> => {
    const blogs = await adminService.getBlogs();
    const updatedBlogs = blogs.filter(b => b.id !== id);
    setStorageItem("mockBlogs", updatedBlogs);
  },

  // Event operations
  getEvents: async (): Promise<EventType[]> => {
    return getStorageItem("mockEvents", initialEvents);
  },

  getEventBySlug: async (slug: string): Promise<EventType | undefined> => {
    const events = await adminService.getEvents();
    return events.find(e => e.slug === slug);
  },

  saveEvent: async (event: EventType): Promise<EventType> => {
    const events = await adminService.getEvents();
    const index = events.findIndex(e => e.slug === event.slug);
    let updatedEvents;
    
    if (index >= 0) {
      updatedEvents = [...events];
      updatedEvents[index] = event;
    } else {
      updatedEvents = [...events, event];
    }
    
    setStorageItem("mockEvents", updatedEvents);
    return event;
  },

  deleteEvent: async (slug: string): Promise<void> => {
    const events = await adminService.getEvents();
    const updatedEvents = events.filter(e => e.slug !== slug);
    setStorageItem("mockEvents", updatedEvents);
  }
};
