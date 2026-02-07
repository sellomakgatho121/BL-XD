import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Production optimizations
  compress: true,
  poweredByHeader: false,
  
  // Image optimization
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },

  // React strict mode for better development experience
  reactStrictMode: true,

  // Turbopack configuration (Next.js 16 default)
  turbopack: {
    // Module resolution rules
    resolveExtensions: ['.tsx', '.ts', '.jsx', '.js', '.json'],
  },

  // Experimental features for performance
  experimental: {
    // Optimize package imports for common libraries
    optimizePackageImports: ['lucide-react', 'framer-motion'],
    // Enable optimistic client cache
    optimisticClientCache: true,
  },

  // Output configuration (for static export if needed)
  // output: 'standalone', // Uncomment if deploying to Docker/VPS
};

export default nextConfig;
