import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
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
      }
    ],
  },
};

export default nextConfig;
