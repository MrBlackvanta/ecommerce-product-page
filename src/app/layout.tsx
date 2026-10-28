import { CartProvider } from "@/components/cart";
import { Signature, SiteHeader } from "@/components/layout";
import { SITE_NAME, SITE_URL } from "@/data";
import type { Metadata, Viewport } from "next";
import { Kumbh_Sans } from "next/font/google";
import "./globals.css";

const kumbhSans = Kumbh_Sans({
  variable: "--font-kumbh-sans",
  subsets: ["latin"],
  display: "swap",
});

const title = `${SITE_NAME} | Fall Limited Edition Sneakers`;
const description =
  "Low-profile casual sneakers with a durable rubber outer sole, built for any weather. The Fall Limited Edition is now half price at $125.00.";

const shareImage = {
  url: "/opengraph-image.jpg",
  width: 1200,
  height: 630,
  alt: "sneakers: the Fall Limited Edition product page, its photo gallery beside the price and add-to-cart controls.",
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title,
  description,
  alternates: { canonical: "/" },
  openGraph: {
    title,
    description,
    url: "/",
    siteName: SITE_NAME,
    locale: "en_US",
    type: "website",
    images: [shareImage],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [shareImage],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${kumbhSans.variable} antialiased`}>
      <body className="relative min-h-dvh text-ink">
        <CartProvider>
          <SiteHeader />
          {children}
        </CartProvider>
        <Signature />
      </body>
    </html>
  );
}
