import { apiFetch } from "../api";

export type DonationInitPayload = {
  email: string;
  amount: number;
  currency?: string;
  name?: string;
  metadata?: Record<string, unknown>;
};

export type DonationInitResponse = {
  success: boolean;
  message?: string;
  data?: {
    reference: string;
    authorizationUrl: string;
    currency: string;
  };
};

export type DonationVerifyResponse = {
  success: boolean;
  message?: string;
  data?: {
    reference: string;
    status: string;
    donation: {
      _id: string;
      email: string;
      amount: number;
      currency: string;
      status: string;
      paidAt: string;
    };
    paystack: {
      status: string;
      reference: string;
      amount: number;
      channel: string;
    };
  };
};

export async function initDonation(payload: DonationInitPayload) {
  return apiFetch<DonationInitResponse>("/donations/init", {
    method: "POST",
    body: payload,
  });
}

export async function verifyDonation(reference: string) {
  return apiFetch<DonationVerifyResponse>(`/donations/verify/${reference}`);
}
