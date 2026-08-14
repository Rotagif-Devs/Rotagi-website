import { apiFetch, API_BASE_URL } from "../api";
import { getAccessToken } from "../token.service";
import { ApiResponse } from "./auth.service";

/**
 * Cohort portal service — every program (product-design, ai-video-creation,
 * vibe-coding) has its own portal: own PIN, own settings, own attendance/
 * certificate data. Every call takes a `program` slug as the first arg.
 *
 * Learner endpoints live under `/api/cohort/:program/*` and are gated by a
 * program-scoped "cohort access token" (separate from the admin JWT, and
 * rejected if used against a different program). Kept in sessionStorage per
 * program so it dies with the tab.
 *
 * Admin endpoints live under `/api/admin/cohort/:program/*` and use the
 * normal admin JWT, which apiFetch attaches automatically from localStorage.
 */

export const COHORT_PROGRAMS = [
  { slug: "product-design", title: "Product Design (UI/UX)" },
  { slug: "ai-video-creation", title: "AI Video Creation" },
  { slug: "vibe-coding", title: "VIBE Coding" },
] as const;

export type CohortProgramSlug = (typeof COHORT_PROGRAMS)[number]["slug"];

const cohortTokenKey = (program: string) => `cohort_token_${program}`;

export const getCohortToken = (program: string): string | null => {
  if (typeof window === "undefined") return null;
  return sessionStorage.getItem(cohortTokenKey(program));
};

export const setCohortToken = (program: string, token: string) => {
  sessionStorage.setItem(cohortTokenKey(program), token);
};

export const clearCohortToken = (program: string) => {
  sessionStorage.removeItem(cohortTokenKey(program));
};

export type AssignmentStatusType = "pending" | "submitted" | "feedback";

export type CohortAssignment = {
  id: string;
  title: string;
  statusLabel: string;
  statusType: AssignmentStatusType;
  actionLabel: string;
  actionUrl: string;
  order?: number;
};

export type CohortDashboard = {
  program: string;
  cohortName: string;
  cohortNumber: string;
  trackCode: string;
  trackName: string;
  trackMode: string;
  totalWeeks: number;
  currentWeek: number;
  liveClassLink: string;
  liveClassSchedule: string;
  missedClassLink: string;
  courseMaterialsLink: string;
  assignmentsClassroomLink: string;
  communityChatLink: string;
  attendanceFormLink: string;
  certificateFolderLink: string;
  certificatesEnabled: boolean;
  assignments: CohortAssignment[];
};

export type AttendanceRecord = {
  date: string;
  status: "present" | "absent";
};

export type AttendanceSummary = {
  email: string;
  totalPresent: number;
  totalAbsent: number;
  records: AttendanceRecord[];
};

export type AttendanceWindowStatus = {
  open: boolean;
  date: string | null;
};

export type AttendanceWindowAdminStatus = AttendanceWindowStatus & {
  tickedCount: number;
};

export type CertificateRecord = {
  email: string;
  fullName: string;
  /** A `data:image/png;base64,...` data URL — the composited certificate, rendered on demand. */
  certificateImage: string;
  /** A `data:application/pdf;base64,...` data URL of the same certificate, for learners who want a PDF. */
  certificatePdf: string;
};

export type CertificateTemplateConfig = {
  imageUrl: string;
  nameX: number;
  nameY: number;
  fontSize: number;
  fontColor: string;
  fontFamily: string;
};

export type CertificateTemplateStatus = {
  template: CertificateTemplateConfig | null;
  certificatesEnabled: boolean;
  eligibleLearnerCount: number;
};

export type AdminCohortSettings = {
  hasPinSet: boolean;
  cohortName: string;
  cohortNumber: string;
  trackCode: string;
  trackName: string;
  trackMode: string;
  totalWeeks: number;
  currentWeek: number;
  liveClassLink: string;
  liveClassSchedule: string;
  missedClassLink: string;
  courseMaterialsLink: string;
  assignmentsClassroomLink: string;
  communityChatLink: string;
  attendanceFormLink: string;
  certificateFolderLink: string;
};

export type AdminProgramSummary = {
  slug: string;
  title: string;
  configured: boolean;
};

export const cohortService = {
  // --- Learner ---

  /** Validate the shared per-program access PIN. Stores + returns the cohort access token. */
  validateAccessPin: async (program: string, pin: string): Promise<string> => {
    const res = await apiFetch<{ success: boolean; token?: string; message?: string }>(
      `/api/cohort/${program}/access`,
      { method: "POST", body: { pin }, accessToken: null as unknown as string },
    );
    if (!res.token) {
      throw new Error(res.message || "Invalid Access PIN");
    }
    setCohortToken(program, res.token);
    return res.token;
  },

  /** Everything the dashboard page needs, in one call. */
  getDashboard: async (program: string): Promise<CohortDashboard> => {
    const res = await apiFetch<ApiResponse<CohortDashboard>>(`/api/cohort/${program}/dashboard`, {
      accessToken: getCohortToken(program) ?? undefined,
    });
    return res.data as CohortDashboard;
  },

  /**
   * Look up a learner's attendance by email.
   * Returns null when the admin hasn't uploaded records for that email (404).
   */
  getAttendanceRecord: async (program: string, email: string): Promise<AttendanceSummary | null> => {
    try {
      const res = await apiFetch<ApiResponse<AttendanceSummary>>(
        `/api/cohort/${program}/attendance/record?email=${encodeURIComponent(email)}`,
        { accessToken: getCohortToken(program) ?? undefined },
      );
      return res.data ?? null;
    } catch (err: any) {
      if (typeof err?.message === "string" && /not been uploaded|not found/i.test(err.message)) {
        return null;
      }
      throw err;
    }
  },

  /** Whether today's self-tick attendance window is currently open. */
  getAttendanceWindow: async (program: string): Promise<AttendanceWindowStatus> => {
    const res = await apiFetch<ApiResponse<AttendanceWindowStatus>>(`/api/cohort/${program}/attendance/window`, {
      accessToken: getCohortToken(program) ?? undefined,
    });
    return res.data ?? { open: false, date: null };
  },

  /** Marks the learner present for today. Throws (with a real message) if the window isn't open. */
  markAttendance: async (program: string, email: string): Promise<{ date: string }> => {
    const res = await apiFetch<ApiResponse<{ date: string }>>(`/api/cohort/${program}/attendance/mark`, {
      method: "POST",
      body: { email },
      accessToken: getCohortToken(program) ?? undefined,
    });
    return res.data!;
  },

  /**
   * Look up + render a learner's certificate by name and email.
   * Returns null when there's no matching eligible learner (404) — a wrong
   * name/email combo and an email that was never uploaded look identical here
   * on purpose. Other errors (e.g. certificates not yet turned on, no
   * template configured) are thrown so the UI can show a real explanation.
   */
  getCertificateRecord: async (
    program: string,
    email: string,
    fullName: string,
  ): Promise<CertificateRecord | null> => {
    try {
      const res = await apiFetch<ApiResponse<CertificateRecord>>(
        `/api/cohort/${program}/certificate/record?email=${encodeURIComponent(email)}&fullName=${encodeURIComponent(fullName)}`,
        { accessToken: getCohortToken(program) ?? undefined },
      );
      return res.data ?? null;
    } catch (err: any) {
      if (typeof err?.message === "string" && /no certificate found/i.test(err.message)) {
        return null;
      }
      throw err;
    }
  },

  // --- Admin (uses admin JWT from localStorage automatically) ---

  /** The 3 programs with a portal, plus whether each has been configured (PIN set) yet. */
  getPrograms: async (): Promise<AdminProgramSummary[]> => {
    const res = await apiFetch<ApiResponse<AdminProgramSummary[]>>("/api/admin/cohort/programs");
    return res.data ?? [];
  },

  getSettings: async (program: string): Promise<AdminCohortSettings> => {
    const res = await apiFetch<ApiResponse<AdminCohortSettings>>(`/api/admin/cohort/${program}/settings`);
    return (
      res.data ?? {
        hasPinSet: false,
        cohortName: "",
        cohortNumber: "",
        trackCode: "",
        trackName: "",
        trackMode: "",
        totalWeeks: 4,
        currentWeek: 1,
        liveClassLink: "",
        liveClassSchedule: "",
        missedClassLink: "",
        courseMaterialsLink: "",
        assignmentsClassroomLink: "",
        communityChatLink: "",
        attendanceFormLink: "",
        certificateFolderLink: "",
      }
    );
  },

  /** `accessPin` omitted keeps the currently-set PIN unchanged. */
  updateSettings: async (
    program: string,
    payload: Partial<AdminCohortSettings> & { accessPin?: string },
  ): Promise<void> => {
    await apiFetch(`/api/admin/cohort/${program}/settings`, { method: "PUT", body: payload });
  },

  getAssignments: async (program: string): Promise<CohortAssignment[]> => {
    const res = await apiFetch<ApiResponse<CohortAssignment[]>>(`/api/admin/cohort/${program}/assignments`);
    return res.data ?? [];
  },

  createAssignment: async (
    program: string,
    payload: {
      title: string;
      statusLabel: string;
      statusType: AssignmentStatusType;
      actionLabel: string;
      actionUrl: string;
    },
  ): Promise<CohortAssignment> => {
    const res = await apiFetch<ApiResponse<CohortAssignment>>(`/api/admin/cohort/${program}/assignments`, {
      method: "POST",
      body: payload,
    });
    return res.data!;
  },

  deleteAssignment: async (program: string, id: string): Promise<void> => {
    await apiFetch(`/api/admin/cohort/${program}/assignments/${id}`, { method: "DELETE" });
  },

  uploadAttendance: async (program: string, file: File): Promise<string> => {
    const formData = new FormData();
    formData.append("file", file);
    const res = await apiFetch<{ success: boolean; message?: string }>(
      `/api/admin/cohort/${program}/attendance/upload`,
      { method: "POST", body: formData },
    );
    return res.message || "Attendance records processed and updated.";
  },

  getAttendanceWindowStatus: async (program: string): Promise<AttendanceWindowAdminStatus> => {
    const res = await apiFetch<ApiResponse<AttendanceWindowAdminStatus>>(
      `/api/admin/cohort/${program}/attendance/window`,
    );
    return res.data ?? { open: false, date: null, tickedCount: 0 };
  },

  toggleAttendanceWindow: async (program: string, open: boolean): Promise<void> => {
    await apiFetch(`/api/admin/cohort/${program}/attendance/window`, { method: "PUT", body: { open } });
  },

  /** Downloads the full attendance workbook (a per-learner Summary sheet, plus one sheet per date) straight to the browser. */
  exportAttendance: async (program: string): Promise<void> => {
    const token = getAccessToken();
    const res = await fetch(`${API_BASE_URL}/api/admin/cohort/${program}/attendance/export`, {
      headers: token ? { Authorization: `Bearer ${token}` } : undefined,
      credentials: "include",
    });
    if (!res.ok) {
      throw new Error(`Failed to export attendance (${res.status})`);
    }
    const blob = await res.blob();
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${program}-attendance.xlsx`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  },

  uploadCertificates: async (program: string, file: File): Promise<string> => {
    const formData = new FormData();
    formData.append("file", file);
    const res = await apiFetch<{ success: boolean; message?: string }>(
      `/api/admin/cohort/${program}/certificates/upload`,
      { method: "POST", body: formData },
    );
    return res.message || "Certificate records processed and updated.";
  },

  getCertificateTemplate: async (program: string): Promise<CertificateTemplateStatus> => {
    const res = await apiFetch<ApiResponse<CertificateTemplateStatus>>(
      `/api/admin/cohort/${program}/certificates/template`,
    );
    return res.data ?? { template: null, certificatesEnabled: false, eligibleLearnerCount: 0 };
  },

  /** `file` is null when only repositioning/restyling an already-saved template. */
  saveCertificateTemplate: async (
    program: string,
    payload: {
      file: File | null;
      nameX: number;
      nameY: number;
      fontSize: number;
      fontColor: string;
      fontFamily: string;
    },
  ): Promise<CertificateTemplateConfig> => {
    const formData = new FormData();
    if (payload.file) formData.append("file", payload.file);
    formData.append("nameX", String(payload.nameX));
    formData.append("nameY", String(payload.nameY));
    formData.append("fontSize", String(payload.fontSize));
    formData.append("fontColor", payload.fontColor);
    formData.append("fontFamily", payload.fontFamily);

    const res = await apiFetch<ApiResponse<CertificateTemplateConfig>>(
      `/api/admin/cohort/${program}/certificates/template`,
      { method: "POST", body: formData },
    );
    return res.data!;
  },

  /** Also turns certificates off for learners — a dangling "ON" with no template would just 404. */
  deleteCertificateTemplate: async (program: string): Promise<void> => {
    await apiFetch(`/api/admin/cohort/${program}/certificates/template`, { method: "DELETE" });
  },

  toggleCertificates: async (program: string, enabled: boolean): Promise<void> => {
    await apiFetch(`/api/admin/cohort/${program}/certificates/toggle`, {
      method: "PUT",
      body: { enabled },
    });
  },
};
