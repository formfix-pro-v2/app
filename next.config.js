import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',      // Ovo pravi 'out' folder
  basePath: '/app',      // Putanja tvog sajta
  images: {
    unoptimized: true,   // Obavezno za GitHub Pages
  },
};

export default nextConfig;
