import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Nails Fever & Spa | Luxury Nail Artistry · City of Orange, NJ",
  description:
    "Experience premium nail services at Nails Fever & Spa — luxury manicures, pedicures, gel nails, acrylics and spa treatments in the heart of City of Orange, NJ. 168+ five-star reviews.",
  keywords:
    "nail salon Orange NJ, luxury nail spa Essex County, gel manicure pedicure NJ, nail art City of Orange, Nails Fever Spa",
  openGraph: {
    title: "Nails Fever & Spa | Luxury Nail Artistry",
    description:
      "Premium nail services in City of Orange, NJ. Manicures, pedicures, gel nails, acrylics, nail art. Call (973) 943-1404.",
    type: "website",
    locale: "en_US",
  },
  robots: { index: true, follow: true },
  authors: [{ name: "Nails Fever & Spa" }],
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0A0706",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
      </head>
      <body>
        {/* Film grain overlay */}
        <div className="grain-overlay" aria-hidden="true" />
        {children}
      </body>
    </html>
  );
}
