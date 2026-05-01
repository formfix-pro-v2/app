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
import DragScroll from "@/components/DragScroll";
import PageTransition from "@/components/PageTransition";

export const metadata: Metadata = {
  title: {
    default: "Veronica Method | The Complete Menopause Program",
    template: "%s | Veronica Method",
  },
  description:
    "The complete menopause program: personalized exercises, budget meal plans under €7/day, supplement guide and daily support for women after 40.",
  keywords: [
    "menopause program",
    "menopause exercises",
    "menopause meal plan",
    "menopause supplements",
    "women over 40 fitness",
    "hormone balance exercises",
    "hot flash relief",
    "sleep improvement menopause",
    "budget healthy eating menopause",
    "pelvic floor exercises",
  ],
  openGraph: {
    title: "Veronica Method | The Complete Menopause Program",
    description:
      "Personalized exercises, budget meal plans and supplement guidance for women navigating menopause.",
    type: "website",
    locale: "en_US",
    siteName: "Veronica Method",
  },
  twitter: {
    card: "summary_large_image",
    title: "Veronica Method | The Complete Menopause Program",
    description:
      "Personalized exercises, budget meals under €7/day, supplement guide. The complete menopause program for women after 40.",
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
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/icon-192.png" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="dns-prefetch" href="https://yxzttbqkamyrfabdhgau.supabase.co" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, viewport-fit=cover" />
        <meta name="theme-color" content="#d8a7b5" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Veronica Method" />
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
              name: "Veronica Method",
              description:
                "The complete menopause program: personalized exercises, budget meal plans and supplement guidance for women after 40.",
              url: "https://veronica-method.vercel.app",
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
        <div className="min-h-screen relative flex flex-col">
          {/* Subtle gradient background */}
          <div
            className="fixed inset-0 -z-20"
            style={{
              background:
                "linear-gradient(180deg, #f2e4e8 0%, #f0dde3 50%, #ede0df 100%)",
            }}
          />

          {/* Soft glow accents */}
          <div
            className="fixed inset-0 -z-10 opacity-60"
            style={{
              background:
                "radial-gradient(circle at 90% 5%, rgba(214,167,177,.18), transparent 15%), radial-gradient(circle at 5% 85%, rgba(185,143,161,.15), transparent 18%)",
            }}
          />

          {/* Decorative blur - smaller */}
          <div className="fixed top-10 -left-16 w-48 h-48 rounded-full bg-[#e4c5cf] blur-3xl opacity-25 -z-10" />
          <div className="fixed bottom-10 -right-16 w-56 h-56 rounded-full bg-[#dbb8c4] blur-3xl opacity-25 -z-10" />

          <Header />

          <main className="relative z-10 flex-1">
            <PageTransition>
              {children}
            </PageTransition>
          </main>

          <Footer />
          <BottomNav />
          <InstallPrompt />
          <ServiceWorkerRegister />
          <CookieConsent />
          <NotificationPrompt />
          <SplashScreen />
          <DragScroll />
        </div>
      </body>
    </html>
  );
}
