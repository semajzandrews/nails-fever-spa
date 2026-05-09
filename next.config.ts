import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,

  // Prevents Three.js and GSAP from being bundled into the server bundle —
  // they reference browser globals (WebGL, requestAnimationFrame) at import time.
  serverExternalPackages: ["three", "gsap"],

  // Instrumentation hook is stable in Next.js 15 — no flag needed.
  // src/instrumentation.ts polyfills localStorage for Framer Motion v11 SSR.

  images: {
    remotePatterns: [],
    formats: ["image/webp", "image/avif"],
  },

  webpack(config, { isServer, dev }) {
    // Fix the webpack pack rename race on macOS in dev mode
    if (dev && !isServer) {
      config.cache = false;
    }
    return config;
  },
};

export default nextConfig;
