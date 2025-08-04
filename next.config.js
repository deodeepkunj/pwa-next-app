/** @type {import('next').NextConfig} */

const withPWA = require("next-pwa")({
  dest: "public",
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === "development",
  workboxOptions: {
    runtimeCaching: [
      {
        urlPattern: /^https:\/\/your-api-domain\.com\/.*$/,
        handler: "NetworkFirst",
        options: {
          cacheName: "api-cache",
          expiration: {
            maxEntries: 50,
            maxAgeSeconds: 300,
          },
        },
      },
    ],
  },
  runtimeCaching: [
    // Your runtimeCaching array
    {
      urlPattern: /^https:\/\/.*\.(png|jpg|jpeg|gif|webp|svg)$/i,
      handler: "CacheFirst",
      options: {
        cacheName: "image-cache",
        expiration: {
          maxEntries: 60,
          maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Days
        },
      },
    },
    // ... inside the runtimeCaching array
    {
      // This rule targets your weather API endpoint.
      urlPattern: ({ url }) => url.pathname.startsWith("/api/weather/current"),

      // We use Stale-While-Revalidate for a fast UI and fresh data.
      handler: "StaleWhileRevalidate",

      options: {
        // A specific cache is created for this data.
        cacheName: "weather-api-cache",

        // The cache is configured to be short-lived.
        expiration: {
          maxEntries: 10,
          maxAgeSeconds: 5 * 60, // 5 minutes
        },

        // We only want to cache valid, successful responses.
        cacheableResponse: {
          statuses: [0, 200],
        },
      },
    },
  ],
});

const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
};

module.exports = withPWA(nextConfig);
