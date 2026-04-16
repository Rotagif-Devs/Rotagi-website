import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    NEXT_PUBLIC_API_BASE_URL:
      process.env.NEXT_PUBLIC_API_BASE_URL || process.env.APP_BASE_URL || "http://localhost:4000",
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "example.com",
      },
      {
        protocol: "https",
        hostname: "rot-backend-c3a8.onrender.com",
      },
      {
        protocol: "https",
        hostname: "*.onrender.com",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
      {
        protocol: "https",
        hostname: "i.pravatar.cc",
      },
    ],
  },
  async headers() {
    // Restoring unsafe-eval globally for debugging development issues.
    // The user's Turbopack runtime is being blocked.
    const isDev = process.env.NODE_ENV !== "production";
    
    // We are temporarily always including 'unsafe-eval' to resolve the immediate block.
    const csp = [
      "default-src 'self'",
      "script-src 'self' 'unsafe-eval' 'unsafe-inline' https://js.paystack.co",
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' blob: data: https://paystack.com https://flagcdn.com https://i.pravatar.cc https://example.com https://rot-backend-c3a8.onrender.com",
      "font-src 'self' data:",
      "connect-src 'self' https://rot-backend-c3a8.onrender.com https://checkout.paystack.com https://open.er-api.com",
      "object-src 'none'",
      "base-uri 'self'",
      "form-action 'self'",
      "frame-ancestors 'none'",
      "block-all-mixed-content",
      "upgrade-insecure-requests",
    ].join("; ");

    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Content-Security-Policy",
            value: csp,
          },
        ],
      },
    ];
  },
};

export default nextConfig;
