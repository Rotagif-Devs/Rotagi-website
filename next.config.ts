import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    // Ensure the frontend uses the correct backend base URL.
    // If you set APP_BASE_URL in Render, it will be exposed as NEXT_PUBLIC_API_BASE_URL.
    NEXT_PUBLIC_API_BASE_URL:
      process.env.NEXT_PUBLIC_API_BASE_URL || process.env.APP_BASE_URL || "http://localhost:4000",
  },
};

export default nextConfig;
