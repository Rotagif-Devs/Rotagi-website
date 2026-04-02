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
  return apiFetch<ContactMessageResponse>("/contact/message", {
    method: "POST",
    body: payload,
  });
}
