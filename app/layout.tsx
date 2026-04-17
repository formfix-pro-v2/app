// app/layout.tsx
import "./globals.css";
import type { Metadata } from "next";

// SAMO JEDAN metadata objekat sme da postoji
export const metadata: Metadata = {
  title: "FormFix Pro v2",
  description: "Professional Tailored Fitness Plans",
  icons: {
    icon: "/favicon.ico", // proveri da li imaš ovaj fajl u /public folderu
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
