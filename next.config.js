/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  // BasePath je ime tvog repozitorijuma
  basePath: '/app', 
  // AssetPrefix osigurava da se CSS i slike učitaju sa ispravne putanje
  assetPrefix: '/app/', 
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
