import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Velora | Menopause Wellness",
  description:
    "Elegant daily wellness programs for women navigating menopause. Movement, posture, hormones, confidence.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div className="min-h-screen">
          {/* soft background glow */}
          <div
            className="fixed inset-0 -z-10 opacity-70"
            style={{
              background:
                "radial-gradient(circle at top right, rgba(214,167,177,.20), transparent 28%), radial-gradient(circle at bottom left, rgba(185,143,161,.16), transparent 32%)",
            }}
          />

          {children}
        </div>
      </body>
    </html>
  );
}
