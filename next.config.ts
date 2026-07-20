// Simplified next.config — remove experimental/transpile options that might interfere
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  compress: true,
  poweredByHeader: false,
  reactStrictMode: true,
};

export default nextConfig;
