/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/app',
  assetPrefix: '/app',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
