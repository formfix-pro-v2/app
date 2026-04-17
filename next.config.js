/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // Obavezno za GitHub Pages
  images: {
    unoptimized: true, // Obavezno da bi slike radile besplatno
  },
  // Ako ti je ime repozitorijuma "app", dodaj ovo:
  basePath: '/app', 
  assetPrefix: '/app',
};

export default nextConfig;
