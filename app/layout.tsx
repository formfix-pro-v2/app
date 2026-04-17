import "./globals.css";
export const metadata = {
  title: "FormFix Pro",
  description: "AI fitness platform"
};
// app/layout.tsx
export const metadata = {
  title: 'FormFix Pro v2',
  description: 'Professional Tailored Fitness Plans',
  icons: {
    icon: 'https://cdn-icons-png.flaticon.com/512/2964/2964514.png', // Možeš zameniti link svojom ikonicom
  },
}
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
