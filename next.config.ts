import type { NextConfig } from "next";

const BACKEND_URL = process.env.BACKEND_INTERNAL_URL || "http://127.0.0.1:5000";

const nextConfig: NextConfig = {
  // Allow local mobile testing without HMR cross-origin blocks
  allowedDevOrigins: ["192.168.18.139", "localhost:3000", "127.0.0.1:3000"],
  images: {
    dangerouslyAllowSVG: true,
    remotePatterns: [
      {
        protocol: "http",
        hostname: "127.0.0.1",
        port: "5000",
        pathname: "/static/**",
      },
      {
        protocol: "https",
        hostname: "hassaan431.pythonanywhere.com",
        pathname: "/static/**",
      },
      {
        protocol: "http",
        hostname: "hassaan431.pythonanywhere.com",
        pathname: "/static/**",
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: "/static/:path*",
        destination: `${BACKEND_URL}/static/:path*`,
      },
      {
        source: "/api/public/:path*",
        destination: `${BACKEND_URL}/api/public/:path*`,
      },
    ];
  },
};

export default nextConfig;
