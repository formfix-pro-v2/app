/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/app',
  // Uklonili smo assetPrefix jer .nojekyll radi posao za stilove
  // a prefix nekad blokira JS skripte
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
