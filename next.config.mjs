/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable bundle analyzer in development
  ...(process.env.ANALYZE === "true" && {
    webpack: (config) => {
      config.plugins.push(
        new (require("@next/bundle-analyzer"))({
          enabled: true,
        })
      );
      return config;
    },
  }),

  // Optimize images
  images: {
    formats: ["image/webp", "image/avif"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },

  // Experimental features for better performance
  experimental: {
    optimizePackageImports: ["@fortawesome/react-fontawesome", "three"],
  },

  // Compiler optimizations
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },

  // Performance optimizations
  poweredByHeader: false,
  compress: true,
  generateEtags: false,

  // Webpack optimizations
  webpack: (config, { dev, isServer }) => {
    // Optimize bundle splitting for production
    if (!dev && !isServer) {
      config.optimization.splitChunks = {
        chunks: "all",
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: "vendors",
            chunks: "all",
            priority: 5,
          },
          three: {
            test: /[\\/]node_modules[\\/]three[\\/]/,
            name: "three",
            chunks: "all",
            priority: 10,
          },
          fontawesome: {
            test: /[\\/]node_modules[\\/]@fortawesome[\\/]/,
            name: "fontawesome",
            chunks: "all",
            priority: 10,
          },
        },
      };
    }

    // Enable side effects optimization
    config.optimization.sideEffects = false;

    return config;
  },
};

export default nextConfig;
