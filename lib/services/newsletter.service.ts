import { apiFetch } from "../api";

export type NewsletterResponse = {
  success: boolean;
  message?: string;
  data?: any;
};

export async function subscribeNewsletter(email: string): Promise<NewsletterResponse> {
  return apiFetch<NewsletterResponse>("/newsletter/subscribe", {
    method: "POST",
    body: { email },
  });
}
