import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    NEXT_PUBLIC_API_BASE_URL:
      process.env.NEXT_PUBLIC_API_BASE_URL || process.env.APP_BASE_URL || "",
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "example.com",
      },
      {
        protocol: "https",
        hostname: "rotagif-backend-codebase-1.onrender.com",
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
      {
        protocol: "https",
        hostname: "placehold.co",
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
      "script-src 'self' 'unsafe-eval' 'unsafe-inline' https://js.paystack.co https://www.google.com https://www.gstatic.com https://cdn.jsdelivr.net",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://cdn.jsdelivr.net",
      "font-src 'self' data: https://fonts.gstatic.com https://cdn.jsdelivr.net",
      "img-src 'self' blob: data: https://paystack.com https://flagcdn.com https://i.pravatar.cc https://example.com https://rotagif-backend-codebase-1.onrender.com https://rot-backend-c3a8.onrender.com https://placehold.co https://res.cloudinary.com https://cdn.jsdelivr.net",
      "connect-src 'self' https://rotagif-backend-codebase-1.onrender.com https://rot-backend-c3a8.onrender.com https://checkout.paystack.com https://v6.exchangerate-api.com https://open.er-api.com https://www.google.com https://cdn.jsdelivr.net",
      "object-src 'none'",
      "base-uri 'self'",
      "form-action 'self'",
      "frame-src 'self' https://www.google.com https://recaptcha.google.com",
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
