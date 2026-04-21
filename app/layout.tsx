import type { Metadata } from "next";
import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "FormFix Pro | AI Posture & Pain Relief",
  description:
    "Fix posture, reduce pain and move better with personalized AI mobility programs.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-[#09060f] text-white`}>
        {children}
      </body>
    </html>
  );
}
