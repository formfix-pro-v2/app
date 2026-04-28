import "./globals.css";
import type { Metadata } from "next";
import Header from "@/components/header";
import Footer from "@/components/footer";

export const metadata: Metadata = {
  title: "Velora | Luxury Women Wellness",
  description:
    "Premium feminine wellness experience for women navigating menopause. Daily movement, nutrition, confidence and elegance.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#d8a7b5" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Velora" />
      </head>
      <body className="text-[#3d2b32]">
        <div className="min-h-screen relative overflow-x-hidden flex flex-col">
          {/* luxury layered background */}
          <div
            className="fixed inset-0 -z-20"
            style={{
              background:
                "linear-gradient(180deg, #fffaf8 0%, #fff5f7 38%, #fdf7f3 100%)",
            }}
          />

          {/* top glow */}
          <div
            className="fixed inset-0 -z-10 opacity-90"
            style={{
              background:
                "radial-gradient(circle at 85% 10%, rgba(214,167,177,.22), transparent 18%), radial-gradient(circle at 10% 90%, rgba(185,143,161,.18), transparent 22%), radial-gradient(circle at 50% 30%, rgba(255,255,255,.65), transparent 25%)",
            }}
          />

          {/* elegant mesh overlay */}
          <div
            className="fixed inset-0 -z-10 opacity-[0.18]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,.35) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.35) 1px, transparent 1px)",
              backgroundSize: "42px 42px",
            }}
          />

          {/* side decorative blur */}
          <div className="fixed top-20 -left-24 w-72 h-72 rounded-full bg-[#f1d5dc] blur-3xl opacity-40 -z-10" />
          <div className="fixed bottom-10 -right-20 w-80 h-80 rounded-full bg-[#e8c6d0] blur-3xl opacity-40 -z-10" />

          <Header />

          <main className="relative z-10 flex-1">
            {children}
          </main>

          <Footer />
        </div>
      </body>
    </html>
  );
}
