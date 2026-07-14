import { apiFetch } from "../api";

export type DonationInitPayload = {
  email: string;
  amount: number;
  currency?: string;
  name?: string;
  metadata?: Record<string, unknown>;
  callback_url?: string;
  provider?: "paystack" | "paypal" | "flutterwave";
};

export type DonationInitResponse = {
  success: boolean;
  message?: string;
  data?: {
    reference: string;
    authorizationUrl?: string;
    approvalUrl?: string;
    paypalOrderId?: string;
    flutterwaveTransactionId?: string;
    provider: string;
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
  const isNewBackendProvider = payload.provider === "paypal" || payload.provider === "flutterwave";
  return apiFetch<DonationInitResponse>("/donations/init", {
    method: "POST",
    body: payload,
    credentials: "omit",
    baseUrl: isNewBackendProvider ? "https://rot-backend-c3a8.onrender.com" : undefined,
  });
}

export async function verifyDonation(reference: string) {
  return apiFetch<DonationVerifyResponse>(`/donations/verify/${reference}`);
}

export async function capturePayPalOrder(reference: string) {
  return apiFetch<DonationVerifyResponse>("/donations/paypal/capture", {
    method: "POST",
    body: { reference },
    credentials: "omit",
    baseUrl: "https://rot-backend-c3a8.onrender.com",
  });
}
