/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "images.unsplash.com",
      "img.icons8.com",
      "via.placeholder.com",
      "image.icons8.com",
      "user-images.githubusercontent.com",
      "filecenter.bestforagents.com",
      "filecenter2.bestforagents.com",
      "www.abt.bank",
      "icons.iconarchive.com",
      "localhost",
      "backend-real-estate-m1zm.onrender.com",
    ],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  experimental: {
    missingSuspenseWithCSRBailout: false,
  },
};

export default nextConfig;
