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
    ],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  webpack: (config, { isServer }) => {
    // Ignore test files
    config.module.rules.push({
      test: /\.test\.js$/,
      use: "ignore-loader",
    });

    if (isServer) {
      // Optionally, ignore the __tests__ directory
      config.externals.push(function ({ request }, callback) {
        if (/__tests__/.test(request)) {
          return callback(null, "commonjs " + request);
        }
        callback();
      });
    }

    return config;
  },
};

export default nextConfig;
