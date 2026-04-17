/** @type {import('next').NextConfig} */
const nextConfig = {
  // 1. Omogućava statički export (pravi 'out' folder koji GitHub Pages traži)
  output: 'export',

  // 2. Putanja na GitHubu: pošto ti je repo 'app', link je /app/
  // VAŽNO: Ako ikada promeniš ime repozitorijuma, moraš i ovo promeniti
  basePath: '/app',

  // 3. Isključuje optimizaciju slika jer GitHub Pages nema server za to
  images: {
    unoptimized: true,
  },

  // 4. (Opciono) Sprečava greške sa koso crtom na kraju URL-a
  trailingSlash: true,
};

export default nextConfig;
