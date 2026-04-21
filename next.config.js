/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/app',
  assetPrefix: '/app',
  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig;
