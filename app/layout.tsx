import "./globals.css";
import type { Metadata } from "next";
import Header from "@/components/header";
import Footer from "@/components/footer";
import BottomNav from "@/components/BottomNav";
import InstallPrompt from "@/components/InstallPrompt";
import ServiceWorkerRegister from "@/components/ServiceWorkerRegister";
import CookieConsent from "@/components/CookieConsent";
import NotificationPrompt from "@/components/NotificationPrompt";
import SplashScreen from "@/components/SplashScreen";

export const metadata: Metadata = {
  title: {
    default: "Velora | Wellness for Women 40+",
    template: "%s | Velora Wellness",
  },
  description:
    "Personalized menopause wellness programs: daily exercises, budget meal plans, sleep support and hormone balance. Join 1,200+ women transforming their health.",
  keywords: [
    "menopause wellness",
    "women over 40 fitness",
    "hormone balance exercises",
    "menopause meal plan",
    "hot flash relief",
    "sleep improvement program",
    "budget healthy eating",
    "pelvic floor exercises",
    "midlife wellness",
    "women health program",
  ],
  openGraph: {
    title: "Velora | Wellness for Women 40+",
    description:
      "Personalized exercise programs and budget meal plans for women navigating menopause. Sleep better, move better, feel amazing.",
    type: "website",
    locale: "en_US",
    siteName: "Velora Wellness",
  },
  twitter: {
    card: "summary_large_image",
    title: "Velora | Wellness for Women 40+",
    description:
      "Personalized menopause wellness: exercises, meals under €7/day, sleep support. Join 1,200+ women.",
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
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, viewport-fit=cover" />
        <meta name="theme-color" content="#d8a7b5" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Velora" />
        {/* Analytics - Plausible (privacy-friendly, no cookies needed) */}
        {process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN && (
          <script
            defer
            data-domain={process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN}
            src="https://plausible.io/js/script.js"
          />
        )}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              name: "Velora Wellness",
              description:
                "Personalized menopause wellness programs with daily exercises, budget meal plans and progress tracking for women over 40.",
              url: "https://velora-wellness.vercel.app",
              applicationCategory: "HealthApplication",
              offers: [
                {
                  "@type": "Offer",
                  name: "Glow Plan",
                  price: "29",
                  priceCurrency: "EUR",
                  description: "30-day menopause wellness program",
                },
                {
                  "@type": "Offer",
                  name: "Elite Plan",
                  price: "79",
                  priceCurrency: "EUR",
                  description: "90-day premium transformation program",
                },
              ],
            }),
          }}
        />
      </head>
      <body className="text-[#3d2b32]">
        <div className="min-h-screen relative overflow-x-hidden flex flex-col">
          {/* Subtle gradient background */}
          <div
            className="fixed inset-0 -z-20"
            style={{
              background:
                "linear-gradient(180deg, #fffaf8 0%, #fff5f7 50%, #fdf7f3 100%)",
            }}
          />

          {/* Soft glow accents - smaller and more subtle */}
          <div
            className="fixed inset-0 -z-10 opacity-70"
            style={{
              background:
                "radial-gradient(circle at 90% 5%, rgba(214,167,177,.15), transparent 15%), radial-gradient(circle at 5% 85%, rgba(185,143,161,.12), transparent 18%)",
            }}
          />

          {/* Decorative blur - smaller */}
          <div className="fixed top-10 -left-16 w-48 h-48 rounded-full bg-[#f1d5dc] blur-3xl opacity-25 -z-10" />
          <div className="fixed bottom-10 -right-16 w-56 h-56 rounded-full bg-[#e8c6d0] blur-3xl opacity-25 -z-10" />

          <Header />

          <main className="relative z-10 flex-1">
            {children}
          </main>

          <Footer />
          <BottomNav />
          <InstallPrompt />
          <ServiceWorkerRegister />
          <CookieConsent />
          <NotificationPrompt />
          <SplashScreen />
        </div>
      </body>
    </html>
  );
}
