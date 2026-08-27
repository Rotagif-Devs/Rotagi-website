import { apiFetch, API_BASE_URL } from "../api";
import { BlogPost } from "@/types/blog";
import { events as EventType } from "@/types/event";
import { ApiResponse } from "./auth.service";

export type AdminStats = {
  myBlogs: { count: number; deltaWeek: number };
  myEvents: { count: number; deltaWeek: number; upcomingCount: number };
  allPosts?: { count: number };
  uniqueReach: { count: number; growthPct: number | null };
};

export type StaffRole = "content_manager" | "cohort_manager";

export type StaffUser = {
  _id: string;
  email: string;
  firstName: string;
  lastName: string;
  roles: string[];
  status: "active" | "disabled" | "pending";
  createdAt: string;
  lastLoginAt?: string;
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
  image: ensureImageUrl(event.coverImageUrl || event.imageUrl || event.image),
  link: event.externalLink || event.link || "",
  date: event.date ? event.date.slice(0, 10) : "",
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
  getBlogs: async (params?: { status?: string; limit?: number; offset?: number; scope?: "own" | "all" }): Promise<BlogPost[]> => {
    const query = new URLSearchParams(params as any).toString();
    const res = await apiFetch<ApiResponse<any>>(`/admin/blog/posts${query ? `?${query}` : ""}`);
    const data = ensureArray(res.data);
    return data.map(normalizeBlog);
  },

  // Same as getBlogs, but also returns the total count for pagination —
  // used by the dashboard's team-wide "Recent Transmissions" list.
  getBlogsPaged: async (
    params?: { status?: string; limit?: number; offset?: number; scope?: "own" | "all" },
  ): Promise<{ items: BlogPost[]; total: number }> => {
    const query = new URLSearchParams(params as any).toString();
    const res = await apiFetch<ApiResponse<any>>(`/admin/blog/posts${query ? `?${query}` : ""}`);
    const items = ensureArray(res.data).map(normalizeBlog);
    const total = typeof res.data?.total === "number" ? res.data.total : items.length;
    return { items, total };
  },

  getBlogById: async (id: string): Promise<BlogPost | undefined> => {
    const res = await apiFetch<ApiResponse<{ post: any }>>(`/admin/blog/posts/${id}`);
    return res.data?.post ? normalizeBlog(res.data.post) : undefined;
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
  getEvents: async (params?: { q?: string; limit?: number; offset?: number; scope?: "own" | "all" }): Promise<EventType[]> => {
    const query = new URLSearchParams(params as any).toString();
    const res = await apiFetch<ApiResponse<any>>(`/admin/events${query ? `?${query}` : ""}`);
    const data = ensureArray(res.data);
    return data.map(normalizeEvent);
  },

  // Same as getEvents, but also returns the total count for pagination —
  // used by the dashboard's team-wide "Recent Transmissions" list.
  getEventsPaged: async (
    params?: { q?: string; limit?: number; offset?: number; scope?: "own" | "all" },
  ): Promise<{ items: EventType[]; total: number }> => {
    const query = new URLSearchParams(params as any).toString();
    const res = await apiFetch<ApiResponse<any>>(`/admin/events${query ? `?${query}` : ""}`);
    const items = ensureArray(res.data).map(normalizeEvent);
    const total = typeof res.data?.total === "number" ? res.data.total : items.length;
    return { items, total };
  },

  getEventBySlug: async (slug: string): Promise<EventType | undefined> => {
    try {
      const res = await apiFetch<ApiResponse<any>>(`/admin/events/${slug}`);
      const event = res.data?.event || res.data || res;
      return event ? normalizeEvent(event) : undefined;
    } catch (error) {
      const events = await adminService.getEvents();
      return events.find(
        (e: any) => e.slug === slug || e.id === slug || e._id === slug,
      );
    }
  },

  saveEvent: async (event: Partial<EventType> & { id?: string }): Promise<EventType> => {
    const { id, image, link, ...rest } = event;
    const payload: any = { ...rest };
    
    if (image && (image.startsWith("http") || image.startsWith("data:"))) {
      payload.imageUrl = image;
      payload.coverImageUrl = image;
    }
    if (link !== undefined) {
      payload.externalLink = link;
    }

    if (id) {
      const res = await apiFetch<ApiResponse<any>>(`/admin/events/${id}`, {
        method: "PATCH",
        body: payload,
      });
      return normalizeEvent(res.data?.event || res.data!);
    } else {
      const res = await apiFetch<ApiResponse<any>>("/admin/events", {
        method: "POST",
        body: payload,
      });
      return normalizeEvent(res.data?.event || res.data!);
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

  // Dashboard Stats — org-wide, admin only.
  getStats: async (): Promise<AdminStats> => {
    const res = await apiFetch<ApiResponse<AdminStats>>("/admin/cms/stats");
    return res.data!;
  },

  // Same shape as getStats, but scoped to the caller's own posts/events —
  // what a Content Manager sees instead of org-wide numbers.
  getMyStats: async (): Promise<AdminStats> => {
    const res = await apiFetch<ApiResponse<AdminStats>>("/admin/cms/my-stats");
    return res.data!;
  },

  // Restricted staff accounts (Content Manager / Cohort Manager) — admin only.
  getStaff: async (): Promise<StaffUser[]> => {
    const res = await apiFetch<ApiResponse<{ users: StaffUser[] }>>("/admin/staff");
    return res.data?.users || [];
  },

  createStaff: async (payload: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    role: StaffRole;
  }): Promise<StaffUser> => {
    const res = await apiFetch<ApiResponse<{ user: StaffUser }>>("/admin/staff", {
      method: "POST",
      body: payload,
    });
    return res.data!.user;
  },

  updateStaff: async (
    id: string,
    payload: { role?: StaffRole; status?: "active" | "disabled" },
  ): Promise<StaffUser> => {
    const res = await apiFetch<ApiResponse<{ user: StaffUser }>>(`/admin/staff/${id}`, {
      method: "PATCH",
      body: payload,
    });
    return res.data!.user;
  },

  deleteStaff: async (id: string): Promise<void> => {
    await apiFetch<ApiResponse>(`/admin/staff/${id}`, { method: "DELETE" });
  },
};
