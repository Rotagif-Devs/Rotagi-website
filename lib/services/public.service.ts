import { apiFetch, API_BASE_URL } from "../api";
import { BlogPost } from "@/types/blog";
import { events as EventType } from "@/types/event";
import { ApiResponse } from "./auth.service";

const ensureImageUrl = (url: string | undefined): string => {
  if (!url) return "";
  if (url.startsWith("http") || url.startsWith("data:")) return url;
  if (url.startsWith("/uploads/") || url.startsWith("uploads/")) {
    const cleanUrl = url.startsWith("/") ? url.slice(1) : url;
    return `${API_BASE_URL}/${cleanUrl}`;
  }
  if (url.startsWith("/")) return url;
  return `${API_BASE_URL}/${url}`;
};

const fixContentImages = (html: string): string => {
  if (!html) return "";
  // Find all <img src="..."> and fix the src if it's relative
  return html.replace(/<img[^>]+src="([^">]+)"/g, (match, src) => {
    if (src.startsWith("http") || src.startsWith("data:") || src.startsWith("/")) {
      return match;
    }
    return match.replace(src, `${API_BASE_URL}/${src}`);
  });
};

const normalizeEvent = (event: any): EventType | undefined => {
  if (!event) return undefined;
  const title = event.title || event.name || event.heading;
  if (!title) return undefined;
  
  return {
    ...event,
    title,
    image: ensureImageUrl(event.imageUrl || event.image || event.coverImage || event.thumbnail || event.banner),
  };
};

const parseContent = (content: any): string => {
  let html = "";
  if (typeof content === 'string') {
    html = content;
  } else if (content && typeof content === 'object') {
    // Basic extraction for Tiptap style objects
    if (content.type === 'doc' && Array.isArray(content.content)) {
      html = content.content
        .map((node: any) => {
          if (node.type === 'paragraph' && node.content) {
            return `<p>${node.content.map((c: any) => c.text).join('')}</p>`;
          }
          if (node.type === 'heading' && node.content) {
            const level = node.attrs?.level || 2;
            return `<h${level}>${node.content.map((c: any) => c.text).join('')}</h${level}>`;
          }
          return '';
        })
        .join('');
    } else {
      try {
        html = JSON.stringify(content);
      } catch {
        html = "";
      }
    }
  }
  return fixContentImages(html);
};

const formatDate = (dateStr: string) => {
  if (!dateStr) return "March 15, 2026";
  try {
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  } catch {
    return dateStr;
  }
};

const normalizeBlog = (post: any): BlogPost | undefined => {
  if (!post) return undefined;
  
  const title = post.title || post.name || post.heading || "Untitled Post";
  const slug = post.slug || post.id || post._id || "";
  
  if (!title && !slug) return undefined;

  // Extract category from tags if available
  let category: any = "News";
  if (post.category) {
    category = post.category;
  } else if (Array.isArray(post.tags) && post.tags.length > 0) {
    category = post.tags[0];
  }

  return {
    ...post,
    id: post._id || post.id,
    title,
    slug,
    image: ensureImageUrl(post.coverImageUrl || post.imageUrl || post.image || post.thumbnail || post.cover),
    description: post.excerpt || post.description || "",
    content: parseContent(post.content),
    date: formatDate(post.publishedAt || post.createdAt || post.date),
    category: category,
    status: post.status || "published",
    author: {
      name: post.author?.name || post.authorName || "ROTAGIF Team",
      role: post.author?.role || post.authorRole || "Editorial",
      image: ensureImageUrl(post.author?.image || post.authorImage)
    }
  };
};

const ensureArray = (data: any): any[] => {
  if (Array.isArray(data)) return data;
  if (data && typeof data === 'object') {
    const commonKeys = ['posts', 'events', 'items', 'content', 'results', 'data'];
    for (const k of commonKeys) {
      if (Array.isArray(data[k])) return data[k];
    }
  }
  return [];
};

const ensureObject = (data: any): any => {
  if (!data) return undefined;
  if (data.data && typeof data.data === 'object') {
    // If it's a wrapper, look one level deeper for common single keys
    const wrapper = data.data;
    if (wrapper.post && typeof wrapper.post === 'object') return wrapper.post;
    if (wrapper.event && typeof wrapper.event === 'object') return wrapper.event;
    return wrapper;
  }
  if (data.post && typeof data.post === 'object') return data.post;
  if (data.event && typeof data.event === 'object') return data.event;
  return data;
};

export const publicService = {
  // Event operations
  getEvents: async (params?: { upcoming?: boolean; limit?: number; offset?: number }): Promise<EventType[]> => {
    const query = new URLSearchParams(params as any).toString();
    const res = await apiFetch<any>(`/events${query ? `?${query}` : ""}`);
    const data = ensureArray(res?.data || res);
    return data.map(normalizeEvent).filter((e): e is EventType => !!e);
  },

  getEventBySlug: async (slug: string): Promise<EventType | undefined> => {
    try {
      const res = await apiFetch<any>(`/events/${slug}`);
      const data = ensureObject(res);
      return normalizeEvent(data);
    } catch (error) {
      console.warn(`[publicService] Failed to fetch event by slug ${slug}:`, error);
      const events = await publicService.getEvents();
      return events.find(e => e.slug === slug || (e as any).id === slug || (e as any)._id === slug);
    }
  },

  // Blog operations
  getBlogPosts: async (params?: { tag?: string; q?: string; limit?: number; offset?: number }): Promise<BlogPost[]> => {
    const query = new URLSearchParams(params as any).toString();
    const res = await apiFetch<any>(`/blog/posts${query ? `?${query}` : ""}`);
    const data = ensureArray(res?.data || res);
    return data.map(normalizeBlog).filter((p): p is BlogPost => !!p);
  },

  getBlogPostBySlug: async (slug: string): Promise<BlogPost | undefined> => {
    try {
      console.log(`[publicService] Fetching blog post by slug: ${slug}`);
      const res = await apiFetch<any>(`/blog/posts/${slug}`);
      const data = ensureObject(res);
      
      console.log(`[publicService] API response for ${slug}:`, JSON.stringify(data).substring(0, 200));
      const post = data ? normalizeBlog(data) : undefined;
      console.log(`[publicService] Normalized post:`, post ? post.title : 'undefined');
      return post;
    } catch (error) {
      console.warn(`[publicService] Failed to fetch post by slug ${slug}:`, error);
      const posts = await publicService.getBlogPosts();
      console.log(`[publicService] Fallback: searching in ${posts.length} posts`);
      const post = posts.find(p => p.slug === slug || (p as any).id === slug || (p as any)._id === slug);
      console.log(`[publicService] Fallback result:`, post ? post.title : 'not found');
      return post;
    }
  },
};
