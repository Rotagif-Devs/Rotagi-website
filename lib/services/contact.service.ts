import { apiFetch } from "../api";
import { ContactFormValues } from "@/types/contact";

export type ContactMessageResponse = {
  success: boolean;
  message?: string;
  data?: any;
};

export async function submitContactMessage(
  payload: ContactFormValues
): Promise<ContactMessageResponse> {
  const backendPayload = {
    fullName: payload.fullName,
    email: payload.email,
    message: payload.subject ? `[Subject: ${payload.subject}]\n\n${payload.message}` : payload.message,
  };

  return apiFetch<ContactMessageResponse>("/contact", {
    method: "POST",
    body: backendPayload,
    credentials: "omit",  // public endpoint — no auth cookies needed, avoids CORS preflight hang
  });
}
