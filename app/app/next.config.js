/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  // Mora biti /app jer se tvoj repo tako zove
  basePath: '/app', 
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
