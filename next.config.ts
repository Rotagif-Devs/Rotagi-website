import type { NextConfig } from "next";

const cspHeader = `
    default-src 'self';
    script-src 'self' 'unsafe-eval' 'unsafe-inline' https://js.paystack.co;
    style-src 'self' 'unsafe-inline';
    img-src 'self' blob: data: https://paystack.com;
    font-src 'self' data:;
    connect-src 'self' https://rot-backend-c3a8.onrender.com https://checkout.paystack.com;
    object-src 'none';
    base-uri 'self';
    form-action 'self';
    frame-ancestors 'none';
    block-all-mixed-content;
    upgrade-insecure-requests;
`;

const nextConfig: NextConfig = {
  env: {
    // Ensure the frontend uses the correct backend base URL.
    // If you set APP_BASE_URL in Render, it will be exposed as NEXT_PUBLIC_API_BASE_URL.
    NEXT_PUBLIC_API_BASE_URL:
      process.env.NEXT_PUBLIC_API_BASE_URL || process.env.APP_BASE_URL || "http://localhost:4000",
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Content-Security-Policy",
            value: cspHeader.replace(/\s{2,}/g, " ").trim(),
          },
        ],
      },
    ];
  },
};

export default nextConfig;
