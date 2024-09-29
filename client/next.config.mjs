/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
      {
        protocol: "https",
        hostname: "icon-library.com",
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: "/:path*",
        destination: "http://localhost:6080/:path*",
      },
    ];
  },
};

export default nextConfig;
