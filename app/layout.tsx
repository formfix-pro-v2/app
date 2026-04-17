import "./globals.css";
export const metadata = {
  title: "FormFix Pro",
  description: "AI fitness platform"
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
