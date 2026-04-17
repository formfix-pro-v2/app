import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "FormFix Pro v2",
  description: "Professional Tailored Fitness Plans",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased bg-black">
        {children}
      </body>
    </html>
  );
}
