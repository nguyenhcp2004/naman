import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  turbopack: {
    root: "../..",
  },
  transpilePackages: ["@workspace/ui"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
}

export default nextConfig
