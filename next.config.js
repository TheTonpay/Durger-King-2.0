/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === "production";

const nextConfig = {
  reactStrictMode: true,
  assetPrefix: isProd ? "/Durger-King-2.0/" : "",
  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig;
