import { apiFetch, API_BASE_URL } from "../api";
import { BlogPost } from "@/types/blog";
import { events as EventType } from "@/types/event";
import { ApiResponse } from "./auth.service";

export type AdminStats = {
  contentVelocity: { count: number; deltaWeek: number };
  activeEngagement: { upcomingCount: number };
  uniqueReach: { count: number; growthPct: number | null };
};

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

const normalizeBlog = (post: any): BlogPost => ({
  ...post,
  id: post._id || post.id,
  image: ensureImageUrl(post.coverImageUrl || post.imageUrl || post.image || post.thumbnail || post.cover),
  description: post.excerpt || post.description || "",
  status: post.status || "draft",
});

const normalizeEvent = (event: any): EventType => ({
  ...event,
  id: event._id || event.id,
  image: ensureImageUrl(event.imageUrl || event.image),
});

export type MentorApplication = {
  _id: string;
  fullName: string;
  email: string;
  phone: string;
  location: string;
  linkedInUrl: string;
  yearsExperience: number;
  expertise: string;
  motivation: string;
  cvUrl: string;
  status: "submitted" | "under_review" | "approved" | "rejected";
  adminNotes?: string;
  createdAt: string;
};

const ensureArray = (data: any): any[] => {
  if (Array.isArray(data)) return data;
  if (data && typeof data === 'object') {
    // Try common keys the backend might use to wrap arrays
    const commonKeys = ['posts', 'events', 'items', 'content', 'results', 'data'];
    for (const k of commonKeys) {
      if (Array.isArray(data[k])) return data[k];
    }
  }
  return [];
};

export const adminService = {
  // Blog operations
  getBlogs: async (params?: { status?: string; limit?: number; offset?: number }): Promise<BlogPost[]> => {
    const query = new URLSearchParams(params as any).toString();
    const res = await apiFetch<ApiResponse<any>>(`/admin/blog/posts${query ? `?${query}` : ""}`);
    const data = ensureArray(res.data);
    return data.map(normalizeBlog);
  },

  getBlogById: async (id: string): Promise<BlogPost | undefined> => {
    const blogs = await adminService.getBlogs();
    return blogs.find((b: any) => b.id === id);
  },

  saveBlog: async (blog: Partial<BlogPost> & { id?: string }): Promise<BlogPost> => {
    const { id, image, ...rest } = blog;
    const payload: any = { ...rest };

    if (image && (image.startsWith("http") || image.startsWith("data:"))) {
      payload.coverImageUrl = image;
    }
    
    if (payload.title) payload.title = payload.title.trim();
    if (payload.slug) payload.slug = payload.slug.trim();
    if (payload.description) payload.excerpt = payload.description.trim();

    if (id) {
      const res = await apiFetch<ApiResponse<any>>(`/admin/blog/posts/${id}`, {
        method: "PATCH",
        body: payload,
      });
      return normalizeBlog(res.data!);
    } else {
      const res = await apiFetch<ApiResponse<any>>("/admin/blog/posts", {
        method: "POST",
        body: payload,
      });
      return normalizeBlog(res.data!);
    }
  },

  deleteBlog: async (id: string): Promise<void> => {
    await apiFetch(`/admin/blog/posts/${id}`, { method: "DELETE" });
  },

  uploadBlogImage: async (id: string, file: File): Promise<BlogPost> => {
    const formData = new FormData();
    formData.append("file", file);
    const res = await apiFetch<ApiResponse<any>>(`/admin/blog/posts/${id}/image`, {
      method: "POST",
      body: formData,
    });
    return normalizeBlog(res.data!);
  },

  // Event operations
  getEvents: async (params?: { q?: string; limit?: number; offset?: number }): Promise<EventType[]> => {
    const query = new URLSearchParams(params as any).toString();
    const res = await apiFetch<ApiResponse<any>>(`/admin/events${query ? `?${query}` : ""}`);
    const data = ensureArray(res.data);
    return data.map(normalizeEvent);
  },

  getEventBySlug: async (slug: string): Promise<EventType | undefined> => {
    try {
      const res = await apiFetch<ApiResponse<any>>(`/admin/events/${slug}`);
      const event = res.data || res;
      return event ? normalizeEvent(event) : undefined;
    } catch (error) {
      const events = await adminService.getEvents();
      return events.find(
        (e: any) => e.slug === slug || e.id === slug || e._id === slug,
      );
    }
  },

  saveEvent: async (event: Partial<EventType> & { id?: string }): Promise<EventType> => {
    const id = event.id;
    if (id) {
      const res = await apiFetch<ApiResponse<any>>(`/admin/events/${id}`, {
        method: "PATCH",
        body: event,
      });
      return normalizeEvent(res.data!);
    } else {
      const res = await apiFetch<ApiResponse<any>>("/admin/events", {
        method: "POST",
        body: event,
      });
      return normalizeEvent(res.data!);
    }
  },

  deleteEvent: async (id: string): Promise<void> => {
    await apiFetch(`/admin/events/${id}`, { method: "DELETE" });
  },

  uploadEventImage: async (id: string, file: File): Promise<EventType> => {
    const formData = new FormData();
    formData.append("file", file);
    const res = await apiFetch<ApiResponse<any>>(`/admin/events/${id}/image`, {
      method: "POST",
      body: formData,
    });
    return normalizeEvent(res.data!);
  },

  // Mentor operations
  getMentorApplications: async (params?: { status?: string; q?: string; limit?: number; offset?: number }): Promise<MentorApplication[]> => {
    const query = new URLSearchParams(params as any).toString();
    const res = await apiFetch<ApiResponse<any>>(`/admin/mentors/applications${query ? `?${query}` : ""}`);
    return ensureArray(res.data);
  },

  updateMentorApplication: async (id: string, payload: { status: string; adminNotes?: string }): Promise<MentorApplication> => {
    const res = await apiFetch<ApiResponse<MentorApplication>>(`/admin/mentors/applications/${id}`, {
      method: "PATCH",
      body: payload,
    });
    return res.data!;
  },

  // Dashboard Stats
  getStats: async (): Promise<AdminStats> => {
    const res = await apiFetch<ApiResponse<AdminStats>>("/admin/cms/stats");
    return res.data!;
  },
};
