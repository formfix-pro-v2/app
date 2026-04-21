/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/app',
  assetPrefix: '/app',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
