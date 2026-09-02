/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "*.supabase.co" },
      { protocol: "https", hostname: "commons.wikimedia.org" },
      { protocol: "https", hostname: "upload.wikimedia.org" },
    ],
  },
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.externals = [...(config.externals || []), "@google/model-viewer"];
    }
    return config;
  },
};

module.exports = nextConfig;