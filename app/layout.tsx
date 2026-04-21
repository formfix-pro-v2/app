import type { Metadata } from "next";
import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "VIORA | AI Wellness For Women 35+",
  description:
    "Personalized wellness plans for energy, posture, menopause support, pelvic floor and confidence.",
  keywords: [
    "women wellness app",
    "menopause fitness",
    "pelvic floor app",
    "women over 40 health",
    "AI fitness coach",
  ],
  openGraph: {
    title: "VIORA",
    description:
      "Luxury AI wellness platform for women 35+.",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans bg-[#09060f] text-white antialiased`}>
        {children}
      </body>
    </html>
  );
}
